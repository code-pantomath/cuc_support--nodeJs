//
interface statics__INTERFACE {
    api: {
        versions: {
            [version: string]: string;
        };
    };
}

const statics: statics__INTERFACE = {

    api: {
        versions: {
            v1: "/app/api/v1",
        },
    },

}
///

export default statics;