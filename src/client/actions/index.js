/*
 * action types
 */

export const IS_BASE = 'IS_BASE'
export const IS_SETTINGS = 'IS_SETTINGS'

/*
 * action creators
 */
export function setIsBase (isBase) {
  return { type: IS_BASE, isBase }
}

export function setIsSettings (isSettings) {
  return { type: IS_SETTINGS, isSettings }
}
