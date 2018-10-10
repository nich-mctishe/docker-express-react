import _ from 'lodash'

import { IS_SETTINGS } from '../actions'

const INITIAL_STATE = {
  isSettings: false
}

const updateState = (state, newState) => {
  return _.assign({}, state, newState)
}

export default function settings (state, action) {
  if (typeof state === 'undefined') {
    return INITIAL_STATE
  }

  if (action.type === IS_SETTINGS) {
    return updateState(state, {
      isSettings: action.isSettings
    })
  }

  return state
}
