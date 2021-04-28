<template>
  <va-dropdown
    class="notification-dropdown"
    offset="0, 16px"
    boundary-body
  >
    <va-icon-notification
      slot="anchor"
      class="notification-dropdown__icon"
      :class="{'notification-dropdown__icon--unread': !allRead}"
      :color="contextConfig.invertedColor ? $themes.gray : 'black'"
      v-bind:numberNotification="numberNotification"
    />
    <div class="notification-dropdown__content pl-3 pr-3 pt-2 pb-2">
      <div
        v-for="option in computedOptions"
        :key="option.id"
        class="notification-dropdown__item row pt-1 pb-1 mt-2 mb-2"
        :class="{'notification-dropdown__item--unread': option.unread}"
        @click="option.unread = false"
      >
        <span class="ellipsis" style="max-width: 100%;">
          {{option.name}}
        </span>
      </div>
    </div>
  </va-dropdown>
</template>

<script>
import VaIconNotification from '../../../../../iconset/VaIconNotification'
import { ColorThemeMixin } from '../../../../../services/vuestic-ui'
import axios from 'axios'
const URL = './abrageo'

export default {
  name: 'notification-dropdown',
  inject: ['contextConfig'],
  components: {
    VaIconNotification,
  },
  mixins: [ColorThemeMixin],
  data () {
    return {
      datanotification: [],
      notification: [],
      numberNotification: '',
    }
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    allRead () {
      return !this.computedOptions.filter(item => item.unread).length
    },
    computedOptions () {
      return this.notification
    },
  },
  mounted () {
    setInterval(() => {
      this.setNotifications()
    }, 60000)
  },
  created () {
    this.loadNotification()
    setTimeout(() => {
      this.setNotifications()
    }, 5000)
  },
  methods: {
    markAllAsRead () {
      this.computedOptions = this.computedOptions.map(item => ({
        ...item,
        unread: false,
      }))
    },
    setNotifications () {
      this.notification = []
      this.numberNotification = this.datanotification.length
      this.datanotification.forEach(element => {
        this.notification.push({
          id: element.id,
          name: `Nuevo Pedido Id: ${element.id}`,
          unread: true,
        })
      })
    },
    loadNotification () {
      const cryp = localStorage.getItem('ttid')
      const decryptedText = this.CryptoJS.AES.decrypt(cryp, '4893DED7BCCDB7CE81482573D1E50EDA7418AAC5C41DAD2E20E91F1494F7BBB9').toString(this.CryptoJS.enc.Utf8)
      const token = decryptedText
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }
      axios.get(`${URL}/pedidos/distri/notifications`, config).then(result => {
        this.datanotification = result.data.data
      })
    },
  },
}
</script>

<style lang="scss">

.notification-dropdown {
  cursor: pointer;

  .notification-dropdown__icon {
    position: relative;
    display: flex;
    align-items: center;

    &--unread::before {
      content: '';
      position: absolute;
      right: 0;
      left: 0;
      top: -0.5rem;
      background-color: $brand-danger;
      height: 0.375rem;
      width: 0.375rem;
      margin: 0 auto;
      border-radius: 0.187rem;
    }
  }

  &__content {
    background-color: $dropdown-background;
    box-shadow: $gray-box-shadow;
    border-radius: 0.5rem;
    max-width: 19rem;
  }

  &__item {
    cursor: pointer;
    margin-bottom: 0.75rem;
    color: $brand-secondary;
    flex-wrap: nowrap;
    position: relative;

    &--unread {
      color: $vue-darkest-blue;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        height: 0.375rem;
        width: 0.375rem;
        background-color: $brand-danger;
        margin: auto;
        border-radius: 0.187rem;
      }
    }

    &:hover {
      color: $vue-green;
    }

    &__avatar {
      border-radius: 50%;
      width: 1.5rem;
      height: 1.5rem;
      min-width: 1.5rem;
    }
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}
</style>
