<template>
  <div>
    <slot>
      <p>You're not supposed to render this component empty.</p>
    </slot>
  </div>
</template>
<script>
import VueTypes from 'vue-types'

/**
 * @see https://developers.facebook.com/docs/accountkit/webjs
 * to know how to use this
 */
export default {
  name: 'AccountKit',
  props: {
    appId: VueTypes.string.isRequired,
    debug: VueTypes.bool.def(true),
    version: VueTypes.string.isRequired,
    state: VueTypes.string.isRequired,
    fbAppEventsEnabled: VueTypes.bool.def(false),
    /** callback to login function */
    loginType: VueTypes.oneOf(['PHONE', 'EMAIL']).def('PHONE'),
    /** @see https://developers.facebook.com/docs/accountkit/languages */
    language: VueTypes.string.def('en_US'),
    autoInit: VueTypes.bool.def(true)
  },
  mounted () {
    if (!window.AccountKit && this.autoInit) {
      this.initAccountKit()
    }
  },

  methods: {
    initAccountKit () {
      const tag = document.createElement('script')
      tag.setAttribute(
        'src',
        `https://sdk.accountkit.com/${this.language}/sdk.js`
      )
      tag.setAttribute('id', 'account-kit')
      tag.setAttribute('type', 'text/javascript')
      tag.onload = () => {
        /* eslint-disable camelcase */
        window.AccountKit_OnInteractive = this.onLoad.bind(this)
        /* eslint-enable camelcase */
      }
      document.head.appendChild(tag)
    },

    /**
     * Implementation of AccountKit_OnInteractive
     * Initializes the facebook authentication kit calling the init function.
     * @see https://developers.facebook.com/docs/accountkit/webjs/reference
     */
    onLoad () {
      const { appId, state, version, fbAppEventsEnabled } = this.$props
      window.AccountKit.init({
        appId,
        state,
        version,
        fbAppEventsEnabled
      })
    },
    /** console.log
     * @param {*} loginParams @see https://developers.facebook.com/docs/accountkit/webjs/reference
     */
    login (loginParams, callback) {
      window.AccountKit.login(this.loginType, loginParams, callback)
    }
  }
}
</script>