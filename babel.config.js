module.exports = (api) => {
  api.cache(true)

  const presets = ['@babel/env', '@babel/react']

  return {
    presets
  }
}
