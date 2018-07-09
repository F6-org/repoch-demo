
export default (paths) => ({
    path: paths.share,
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const welcome = require('./index.js').default;
            cb(null, welcome)
        }, 'share')
    }
})
