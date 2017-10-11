import AccountKit from './AccountKit.vue'

function plugin (Vue) {
  Vue.component('facebook-account-kit', AccountKit)
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
  // warn('You should use the facebook provided script tag instead.')
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  AccountKit,
  version
}
