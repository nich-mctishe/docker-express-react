import _ from 'lodash'

import { IS_BASE } from '../actions'

const INITIAL_STATE = {
  isBase: false
}

const updateState = (state, newState) => {
  return _.assign({}, state, newState)
}

export default function settings (state, action) {
  if (typeof state === 'undefined') {
    return INITIAL_STATE
  }

  if (action.type === IS_BASE) {
    return updateState(state, {
      isBase: action.isBase
    })
  }

  return state
}
