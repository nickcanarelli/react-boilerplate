const fs = require('fs')
const path = require('path')
const cssnano = require('cssnano')
const webpack = require('webpack')
const { whenProd } = require('@craco/craco')
const {
  compilerOptions: { paths },
} = require('./tsconfig.json')
const CircularDependencyPlugin = require('circular-dependency-plugin')

const environment = process.env.TARGET_ENV
require('dotenv').config({ path: `./env/.env.${environment}` })

const envVarKeys = fs
  .readFileSync(path.join(__dirname, `./env/.env.${environment}`), 'utf-8')
  .match(/^[A-Za-z0-9_]+/gm)

module.exports = () => {
  const envVars = {}
  for (const key in process.env) {
    if (envVarKeys.includes(key) || key === 'NODE_ENV' || key === 'TARGET_ENV') {
      envVars[key] = process.env[key]
    }
  }

  return {
    eslint: {
      mode: 'file',
    },
    webpack: {
      // Set alias's in the tsconfig.json
      alias: Object.keys(paths).reduce(
        (all, alias) => ({
          ...all,
          [alias.replace('/*', '')]: path.resolve(
            __dirname,
            'src',
            paths[alias][0].replace('/*', '')
          ),
        }),
        {}
      ),
      mode:
        environment === 'staging' || environment === 'production' ? 'production' : 'development',
      devtool:
        environment === 'staging' || environment === 'production'
          ? 'source-map'
          : 'cheap-module-source-map',
      devServer: environment === 'development' && {
        hot: true,
        open: true,
        historyApiFallback: true,
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(envVars),
        }),
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
        new CircularDependencyPlugin({
          // exclude detection of files based on a RegExp
          exclude: /a\.js|node_modules/,
          // add errors to webpack instead of warnings
          failOnError: true,
          // allow import cycles that include an asyncronous import,
          // e.g. via import(/* webpackMode: "weak" */ './file.js')
          allowAsyncCycles: false,
          // set the current working directory for displaying module paths
          cwd: process.cwd(),
        }),
      ],
      configure: {
        resolve: {
          fallback: {
            'react/jsx-runtime': 'react/jsx-runtime.js',
            'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
          },
        },
      },
    },
    style: {
      postcss: {
        plugins: (plugins) => whenProd(() => [...plugins, cssnano], []),
      },
    },
    jest: {
      configure: {
        moduleNameMapper: Object.keys(paths).reduce(
          (all, alias) => ({
            ...all,
            [alias.replace('/*', '/(.*)')]: path.join(
              '<rootDir>/src/',
              paths[alias][0].replace('/*', '/$1')
            ),
          }),
          {}
        ),
      },
    },
  }
}
