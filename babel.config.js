module.exports = (api) => {
  api.cache(true)

  const presets = ['@babel/env', '@babel/react']
  const plugins = [
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
        ssr: false,
      },
    ],
  ]

  return {
    presets,
    plugins,
  }
}
