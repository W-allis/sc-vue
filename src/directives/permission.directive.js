const subs = ['1234']
const permission = {
  user: {
    create: {
      submit: false
    }
  }
}

import { redux } from '@/utils/tools'

export default {
  inserted(el, binding) {
    const keys = binding.value.split('.')
    console.log(keys)
    if (binding.modifiers.el) {
      !redux(keys, permission) && el.parentNode.removeChild(el)
    }
  }
}
