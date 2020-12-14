/**
 * External dependencies
 */
import { omit } from 'lodash';

/**
 * Internal dependencies
 */
import {
	VIEWER_REMOVE_SUCCESS,
	VIEWERS_REQUEST,
	VIEWERS_REQUEST_FAILURE,
	VIEWERS_REQUEST_SUCCESS,
} from 'calypso/state/action-types';
import { combineReducers } from 'calypso/state/utils';

export const items = ( state = {}, action ) => {
	switch ( action.type ) {
		case VIEWERS_REQUEST_SUCCESS: {
			return Object.assign(
				{},
				state,
				action.data?.viewers.reduce( ( acc, viewer ) => {
					acc[ viewer.ID ] = viewer;
					return acc;
				}, {} )
			);
		}
		case VIEWER_REMOVE_SUCCESS: {
			return Object.assign( {}, omit( state, action.viewerId ) );
		}
	}
	return state;
};

export const queries = ( state = {}, action ) => {
	switch ( action.type ) {
		case VIEWERS_REQUEST_SUCCESS: {
			const { siteId, data } = action;
			const existingIds = state[ siteId ]?.ids ?? [];
			const ids = data?.viewers.map( ( viewer ) => viewer.ID );

			return {
				...state,
				[ siteId ]: {
					ids: [ ...new Set( existingIds.concat( ids ) ) ],
					found: action.data.found,
				},
			};
		}
		case VIEWER_REMOVE_SUCCESS: {
			const { siteId, viewerId } = action;
			return {
				...state,
				[ siteId ]: {
					ids: state[ siteId ].ids.filter( ( id ) => id !== viewerId ),
					found: state[ siteId ].found - 1,
				},
			};
		}
	}
	return state;
};

export const fetching = ( state = false, action ) => {
	switch ( action.type ) {
		case VIEWERS_REQUEST:
		case VIEWERS_REQUEST_SUCCESS:
		case VIEWERS_REQUEST_FAILURE: {
			return Object.assign( {}, state, {
				[ action.siteId ]: VIEWERS_REQUEST === action.type,
			} );
		}
	}
	return state;
};

export default combineReducers( { items, queries, fetching } );
