"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util__OmitObjProp = void 0;
function Util__OmitObjProp(key, obj) {
    const { [key]: omitted, ...rest } = obj;
    return rest;
}
exports.Util__OmitObjProp = Util__OmitObjProp;
