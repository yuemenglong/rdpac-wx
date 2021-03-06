import State = require("../../common/state/state");
import store = require("../../reducer/store");
import ActionCreator = require("../../reducer/action-creator");
import _ = require("../../libs/lodash/index");
import wxx = require("../../kit/wxx");

/**
 * Created by <yuemenglong@126.com> on 2017/7/27
 */

class StudyResultData {
    succ: number;
    fail: number;
}

class StudyResultClass {
    bindAnswer() {
        let quizId = store.getState().user.study.id;
        store.dispatch(ActionCreator.putQuiz(quizId, {mode: "study", idx: 0}, () => {
            wxx.redirectTo(`./study-answer`)
        }));
    }

    bindRedo() {
        let quizId = store.getState().user.study.id;
        store.dispatch(ActionCreator.putQuiz(quizId, {mode: "redo", idx: 0}, () => {
            wxx.redirectTo(`./study-redo`)
        }));
    }

    bindFinish() {
        store.dispatch(ActionCreator.deleteQuiz(store.getState().user.study, () => {
            wxx.navigateBack()
        }));
    }

    //noinspection JSUnusedGlobalSymbols
    onShow() {
        store.connect(this, (state: State) => {
            // quiz是直接从store里拼接的
            let data = new StudyResultData;
            let quiz = state.user.study;
            if (quiz) {
                data.succ = quiz.questions.filter(q => q.correct).length;
                data.fail = quiz.questions.filter(q => !q.correct).length;
            }
            return _.merge({}, data);
        });
    }

    //noinspection JSUnusedGlobalSymbols,JSMethodCanBeStatic
    onLoad() {

    }
}

Page(new StudyResultClass());

