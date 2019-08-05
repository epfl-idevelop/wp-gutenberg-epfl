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
} = wp.components

export default class InspectorControlsPostTeaser extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            posts: null,
        }
    }

    componentDidMount() {
        getAllPagesOrPosts('posts').then( (allPosts) => {
            this.setState({ posts: allPosts });
        });
    }

    render() {

        const { attributes, setAttributes } = this.props
        const handlePost1Change = ( post1 ) => setAttributes( { post1: JSON.stringify( post1 ) } );
        const handlePost2Change = ( post2 ) => setAttributes( { post2: JSON.stringify( post2 ) } );
        const handlePost3Change = ( post3 ) => setAttributes( { post3: JSON.stringify( post3 ) } );

        let content = "";
        
        if (this.state.posts !== null) {

            let optionsPostsList = [];

            this.state.posts.forEach(post => {
                optionsPostsList.push({ label: post.title.rendered, value: post.id });
            });

            const divStyle = {
                height: '600px',
            };

            const selectStyle = {
                marginBottom: '20px'
            }

            content = (
                <InspectorControls>
                    <div style={divStyle}>
                        <PanelBody title={ __( 'Gray', 'wp-gutenberg-epfl' ) }>
                            <ToggleControl
                                label={ __('Change the background to gray', 'wp-gutenberg-epfl') }
                                checked={ attributes.gray }
                                onChange={ () => setAttributes( { gray: ! attributes.gray } ) }
                            />
                        </PanelBody>
                        <PanelBody title={ __( 'Posts', 'wp-gutenberg-epfl') }>
                                <div style={selectStyle}>
                                    <Select
                                        id='epfl-page-teaser-post1'
                                        name='epfl-page-teaser-post1'
                                        value={ JSON.parse( attributes.post1 ) }
                                        onChange={ handlePost1Change }
                                        options={ optionsPostsList }
                                        placeholder={ __('Select post', 'wp-gutenberg-epfl') }
                                    />
                                </div>
                                <div style={selectStyle}>
                                    <Select
                                        id='epfl-page-teaser-post2'
                                        name='epfl-page-teaser-post2'
                                        value={ JSON.parse( attributes.post2 ) }
                                        onChange={ handlePost2Change }
                                        options={ optionsPostsList }   
                                        placeholder={ __('Select post', 'wp-gutenberg-epfl') }                             
                                    />      
                                </div>
                                <div style={selectStyle}>
                                    <Select
                                        id='epfl-page-teaser-post3'
                                        name='epfl-post-teaser-post3'
                                        value={ JSON.parse( attributes.post3 ) }
                                        onChange={ handlePost3Change }
                                        options={ optionsPostsList }
                                        placeholder={ __('Select post', 'wp-gutenberg-epfl') }
                                    />
                                </div>
                        </PanelBody> 
                    </div>
                </InspectorControls>
            )
        }
        return content;
    }
}