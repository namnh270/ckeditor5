/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module typing/delete
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import DeleteCommand from './deletecommand';
import DeleteObserver from './deleteobserver';
import env from '@ckeditor/ckeditor5-utils/src/env';

import injectBeforeInputDeleteHandling from './utils/delete/injectbeforeinputdeletehandling';
import injectKeyEventsDeleteHandling from './utils/delete/injectkeyeventsdeletehandling.js';

/**
 * The delete and backspace feature. Handles the <kbd>Delete</kbd> and <kbd>Backspace</kbd> keys in the editor.
 *
 * @extends module:core/plugin~Plugin
 */
export default class Delete extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'Delete';
	}

	init() {
		const editor = this.editor;

		editor.commands.add( 'forwardDelete', new DeleteCommand( editor, 'forward' ) );
		editor.commands.add( 'delete', new DeleteCommand( editor, 'backward' ) );

		editor.editing.view.addObserver( DeleteObserver );

		// Although DeleteObserver always fires the #delete event on editing view document,
		// depending on whether the browser supports Input Events or not, the event must be
		// handled in a slightly different way (it carries slightly different information).
		if ( env.features.isInputEventsLevel1Supported ) {
			injectBeforeInputDeleteHandling( editor );
		} else {
			injectKeyEventsDeleteHandling( editor );
		}
	}
}
