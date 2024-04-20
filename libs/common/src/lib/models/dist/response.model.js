"use strict";
exports.__esModule = true;
exports.ResponseModel = void 0;
var common_1 = require("@nestjs/common");
var ResponseModel = /** @class */ (function () {
    function ResponseModel(data, _a, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pipe) {
        var _b = _a === void 0 ? {
            status: common_1.HttpStatus.OK,
            success: true
        } : _a, totalCount = _b.totalCount, success = _b.success, message = _b.message, error = _b.error, status = _b.status;
        this.data = pipe ? pipe(data) : data;
        this.totalCount = totalCount;
        this.success = success;
        this.message = message;
        this.error = error;
        this.status = status;
    }
    return ResponseModel;
}());
exports.ResponseModel = ResponseModel;
