declare let require: (path: string) => any;
declare class module {
    static exports: any
}

declare let App: (opt: Object) => void;
declare let Page: (opt: Object) => void;
declare let getApp: () => any;

declare class wx {
    static getUserInfo(opt: Object)
}