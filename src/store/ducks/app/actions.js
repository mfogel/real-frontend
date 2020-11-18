import { createAction } from 'redux-actions'
import * as constants from 'store/ducks/app/constants'

/**
 * Application Runtime initializer, should be moved into /ducks/app perhaps ?!
 */
export const appReadyIdle = createAction(constants.APP_READY_IDLE)
export const appReadyRequest = createAction(constants.APP_READY_REQUEST)
export const appReadySuccess = createAction(constants.APP_READY_SUCCESS)
export const appReadyFailure = createAction(constants.APP_READY_FAILURE)