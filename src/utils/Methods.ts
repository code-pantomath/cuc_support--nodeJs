export function Util__OmitObjProp(key:string, obj:any) {
    const { [key]: omitted, ...rest } = obj;
    return rest;
}