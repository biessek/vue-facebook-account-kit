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
  data () {
    return {
      isDisabled: this.disabled
    }
  },
  props: {
    appId: VueTypes.string.isRequired,
    debug: VueTypes.bool.def(true),
    version: VueTypes.string.isRequired,
    state: VueTypes.string.isRequired,
    fbAppEventsEnabled: VueTypes.bool.def(false),
    /** callback to login function */
    onResponse: VueTypes.instanceOf(Function).isRequired,
    loginType: VueTypes.oneOf(['PHONE', 'EMAIL']).def('PHONE'),
    /** @see https://developers.facebook.com/docs/accountkit/languages */
    language: VueTypes.string.def('en_US'),
    disabled: VueTypes.bool.def(false)
  },
  mounted () {
    if (!window.AccountKit) {
      const tag = document.createElement("script");
      tag.setAttribute(
        "src",
        `https://sdk.accountkit.com/${this.language}/sdk.js`
      );
      tag.setAttribute("id", "account-kit");
      tag.setAttribute("type", "text/javascript");
      tag.onload = () => {
        window.AccountKit_OnInteractive = this.onLoad.bind(this);
      };
      document.head.appendChild(tag);
    }
  },

  methods: {
    
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
      this.isDisabled = false
    },
    /**
     * @param {*} loginParams @see https://developers.facebook.com/docs/accountkit/webjs/reference
     */
    login (loginParams) {
      if (this.isDisabled) {
        return
      }
      const { onResponse } = this.props
      window.AccountKit.login(this.props.loginType, loginParams, onResponse)
    }
  }
}
</script>