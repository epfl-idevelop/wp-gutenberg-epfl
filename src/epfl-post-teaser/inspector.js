import React from 'react';
import Select from 'react-select';
import { getAllPagesOrPosts } from '../blocks';

const { __ } = wp.i18n
const { Component } = wp.element

const {
	InspectorControls,
} = wp.editor

const {
    PanelBody,
    ToggleControl,
    Spinner,
} = wp.components

export default class InspectorControlsPostTeaser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: null,
        }
    }

    componentDidMount() {
        const current_lang_code = document.querySelector( '[name=post_lang_choice]' ).value;
        getAllPagesOrPosts('posts', current_lang_code).then( (allPosts) => {
            this.setState({ posts: allPosts });
        });
    }

    render() {
		if ( ! this.state.posts ) {
			return (
				<p>
					<Spinner />
					{ __('Loading posts', 'epfl') }
				</p>
			)
        }

        const { attributes, setAttributes } = this.props
        const handlePost1Change = ( post1 ) => setAttributes( { post1: JSON.stringify( post1 ) } );
        const handlePost2Change = ( post2 ) => setAttributes( { post2: JSON.stringify( post2 ) } );
        const handlePost3Change = ( post3 ) => setAttributes( { post3: JSON.stringify( post3 ) } );

        let content = (
            <div>
                {__( 'No post found', 'epfl') }
            </div>
        )

        if (this.state.posts !== null) {

            let optionsPostsList = [];

            this.state.posts.forEach(post => {
                optionsPostsList.push({ label: post.title.rendered, value: post.id });
            });

            // add empty value at first, in case for an unselect
            optionsPostsList.unshift({ value: null, label: __('None', 'epfl') });

			{/*const divStyle = {
                height: '600px',
            };*/}

            const selectStyle = {
                marginBottom: '10px'
            }

            content = (
				<div>
                	<InspectorControls>
                        <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/post-teaser-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                        <PanelBody title={ __( 'Gray', 'wp-gutenberg-epfl' ) }>
                            <ToggleControl
                                label={ __('Change the background to gray', 'epfl') }
                                checked={ attributes.grayBackground }
                                onChange={ () => setAttributes( { grayBackground: ! attributes.grayBackground } ) }
                            />
                        </PanelBody>
					</InspectorControls>
                    <h4>{ __( 'Posts', 'epfl') }</h4>
                    <div style={selectStyle}>
                        <Select
                            id='epfl-page-teaser-post1'
                            name='epfl-page-teaser-post1'
                            value={ JSON.parse( attributes.post1 ) }
                            onChange={ handlePost1Change }
                            options={ optionsPostsList }
                            placeholder={ __('Select post', 'epfl') }
                        />
                    </div>
                    <div style={selectStyle}>
                        <Select
                            id='epfl-page-teaser-post2'
                            name='epfl-page-teaser-post2'
                            value={ JSON.parse( attributes.post2 ) }
                            onChange={ handlePost2Change }
                            options={ optionsPostsList }
                            placeholder={ __('Select post', 'epfl') }
                        />
                    </div>
                        <Select
                            id='epfl-page-teaser-post3'
                            name='epfl-post-teaser-post3'
                            value={ JSON.parse( attributes.post3 ) }
                            onChange={ handlePost3Change }
                            options={ optionsPostsList }
                            placeholder={ __('Select post', 'epfl') }
						/>
				</div>
            )
        }
        return content;
    }
}
