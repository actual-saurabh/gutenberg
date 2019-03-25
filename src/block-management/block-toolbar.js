/**
 * @format
 * @flow
 */

/**
 * External dependencies
 */
import React, { Component } from 'react';
import { View, ScrollView, Keyboard } from 'react-native';

/**
 * WordPress dependencies
 */
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { BlockFormatControls, BlockControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import styles from './block-toolbar.scss';

type PropsType = {
	onInsertClick: void => void,
	showKeyboardHideButton: boolean,
	hasRedo: boolean,
	hasUndo: boolean,
	redo: void => void,
	undo: void => void,
};

export class BlockToolbar extends Component<PropsType> {
	onKeyboardHide = () => {
		Keyboard.dismiss();
	};

	render() {
		const {
			hasRedo,
			hasUndo,
			redo,
			undo,
			onInsertClick,
			showKeyboardHideButton,
		} = this.props;

		return (
			<View style={ styles.container } accessible={ false } accessibilityLabel="View Add block" >
				<ScrollView
					accessible={ false }
					accessibilityLabel="Scrollview Add block"
					horizontal={ true }
					showsHorizontalScrollIndicator={ false }
					keyboardShouldPersistTaps={ 'always' }
					alwaysBounceHorizontal={ false }
					contentContainerStyle={ styles.scrollableContent }
				>
					<Toolbar accessible={ false }
						accessibilityLabel={ 'Toolbar Add block' }>
						<ToolbarButton
							title={ __( 'Add block' ) }
							icon="insert"
							accessible={ false }
							accessibilityLabel={ __( 'Add block' ) }
							onClick={ onInsertClick }
						/>
						<ToolbarButton
							title={ __( 'Undo' ) }
							icon="undo"
							accessible={ false }
							accessibilityLabel={ __( 'Undo' ) }
							isDisabled={ ! hasUndo }
							onClick={ undo }
						/>
						<ToolbarButton
							title={ __( 'Redo' ) }
							icon="redo"
							accessible={ false }
							accessibilityLabel={ __( 'Redo' ) }
							isDisabled={ ! hasRedo }
							onClick={ redo }
						/>
					</Toolbar>
					<BlockControls.Slot />
					<BlockFormatControls.Slot />
				</ScrollView>
				{ showKeyboardHideButton &&
				( <Toolbar passedStyle={ styles.keyboardHideContainer }>
					<ToolbarButton
						icon="keyboard-hide"
						onClick={ this.onKeyboardHide }
					/>
				</Toolbar> ) }
			</View>
		);
	}
}

export default compose( [
	withSelect( ( select ) => ( {
		hasRedo: select( 'core/editor' ).hasEditorRedo(),
		hasUndo: select( 'core/editor' ).hasEditorUndo(),
	} ) ),
	withDispatch( ( dispatch ) => ( {
		redo: dispatch( 'core/editor' ).redo,
		undo: dispatch( 'core/editor' ).undo,
	} ) ),
] )( BlockToolbar );
