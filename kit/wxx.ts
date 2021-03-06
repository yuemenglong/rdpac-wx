import WxUser = require("../common/entity/wx-user-info");
import debug = require("./debug");
import WxUserInfo = require("../common/entity/wx-user-info");

/**
 * Created by Administrator on 2017/7/27.
 */

class wxx {
    static getLocalStorage(name: string): string {
        try {
            return wx.getStorageSync(name);
        } catch (e) {
            return null
        }
    }

    static setLocalStorage(name: string, value: string) {
        try {
            return wx.setStorageSync(name, value);
        } catch (e) {
            return null
        }
    }

    static showLoading(title: string) {
        wx.showLoading({title, mast: true})
    }

    static hideLoading() {
        wx.hideLoading()
    }

    static getUserInfo(): Promise<WxUserInfo> {
        return new Promise(function (resolve, reject) {
            wx.getUserInfo({
                success: res => resolve(res.userInfo),
                error: err => reject(err),
            })
        })
    }

    static navigateTo(url: string) {
        debug("[Navigate] => ", url);
        wx.navigateTo({url})
    }

    static redirectTo(url) {
        debug("[Redirect] => ", url);
        wx.redirectTo({url})
    }

    static navigateBack(n: number = 1) {
        debug("[NavigateBack] => ", n);
        wx.navigateBack({delta: n});
    }

    static toastSucc(title: string, duration: number = 1500) {
        wx.showToast({title, duration})
    }


    static toastError(title: string, duration: number = 1500) {
        wx.showToast({title, image: "/image/error.256.png", duration})
    }

    static toastLoading(title: string, duration: number = 1500) {
        let icon = "loading";
        wx.showToast({title, duration, icon})
    }

    static showModal(title: string, content: string, confirmText: string = "确定",
                     cancelText: string = "取消"): Promise<boolean> {
        return new Promise<boolean>(function (resolve, reject) {
            wx.showModal({
                confirmText, cancelText, title, content, success: (res) => {
                    if (res.confirm) return resolve(true);
                    else if (res.cancel) return resolve(false);
                    else return reject(Error("Unreachable"))
                }
            })
        })
    }

    static showTip(title: string, content: string, confirmText: string = "确定"): Promise<boolean> {
        let showCancel = false;
        return new Promise<boolean>(function (resolve, reject) {
            wx.showModal({
                showCancel, confirmText, title, content, success: (res) => {
                    if (res.confirm) return resolve(true);
                    else if (res.cancel) return resolve(false);
                    else return reject(Error("Unreachable"))
                }
            })
        })
    }
}

module.exports = wxx;
export = wxx
