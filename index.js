function cookieDefaults(config = { prefix, path: '/' }) {
  return function setDefaults(req, res, next) {
    const { prefix = '', ...opts } = config
    const cookie = res.cookie
    res.cookie = function (...args) {
      const [name, value, options] = args
      cookie.apply(res, [
        `${prefix}${name}`,
        value,
        Object.assign(opts, config),
      ])
    }
    next()
  }
}

module.exports.cookieDefaults = cookieDefaults
