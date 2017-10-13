# AccountKit

[![npm](https://img.shields.io/npm/v/vue-facebook-account-kit.svg)](https://www.npmjs.com/package/vue-facebook-account-kit) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

> A Vue.js Plugin

## Installation

```bash
npm install --save vue-facebook-account-kit
```

## Usage

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'
import AccountKit from 'vue-facebook-account-kit'
Vue.use(AccountKit)
```

### Browser
> Recomended: Use the [facebook version](https://developers.facebook.com/docs/accountkit/webjs) directly instead. 
```html
<!-- Include after Vue -->
<!-- Local files -->
<script src="vue-facebook-account-kit/dist/vue-facebook-account-kit.js"></script>

<!-- From CDN -->
<script src="https://unpkg.com/vue-facebook-account-kit"></script>
```

## Development

### Launch visual tests

```bash
npm run dev
```

### Launch Karma with coverage

```bash
npm run dev:coverage
```

### Build

Bundle the js of to the `dist` folder:

```bash
npm run build
```


## Publishing

The `prepublish` hook will ensure dist files are created before publishing. This
way you don't need to commit them in your repository.

```bash
# Bump the version first
# It'll also commit it and create a tag
npm version
# Push the bumped package and tags
git push --follow-tags
# Ship it 🚀
npm publish
```

## License

[MIT](http://opensource.org/licenses/MIT)
