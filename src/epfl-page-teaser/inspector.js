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

export default class InspectorControlsPageTeaser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pages: null,
        }
    }

    componentDidMount() {
        getAllPagesOrPosts('pages').then( (allPages) => {
            this.setState({ pages: allPages });
        });
    }

    render() {

        const { attributes, setAttributes } = this.props
        const handlePage1Change = ( page1 ) => setAttributes( { page1: JSON.stringify( page1 ) } );
        const handlePage2Change = ( page2 ) => setAttributes( { page2: JSON.stringify( page2 ) } );
        const handlePage3Change = ( page3 ) => setAttributes( { page3: JSON.stringify( page3 ) } );

        let content = "";

        if (this.state.pages !== null) {

            let optionsPagesList = [];

            this.state.pages.forEach(page => {
                optionsPagesList.push({ label: page.title.rendered, value: page.id });
            });

            // add empty value at first, in case for an unselect
            optionsPagesList.unshift({ value: null, label: __('None', 'wp-gutenberg-epfl') });

            {/*const divStyle = {
                height: '600px',
            };*/}

            const selectStyle = {
                marginBottom: '10px'
            }

            content = (
                <div >
	                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/page-teaser-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
                    <PanelBody title={ __( 'Gray', 'wp-gutenberg-epfl' ) }>
                        <ToggleControl
                            label={ __('Change the background to gray', 'wp-gutenberg-epfl') }
                            checked={ attributes.grayBackground }
                            onChange={ () => setAttributes( { grayBackground: ! attributes.grayBackground } ) }
                        />
                    </PanelBody>
                	</InspectorControls>

                    <h4>{ __( 'Pages', 'wp-gutenberg-epfl') }</h4>

					<div style={selectStyle}>
                    <Select
                        id='epfl-page-teaser-page1'
                        name='epfl-page-teaser-page1'
                        value={ JSON.parse( attributes.page1 ) }
                        onChange={ handlePage1Change }
                        options={ optionsPagesList }
                        placeholder={ __('Select page', 'wp-gutenberg-epfl') }
                    />
					</div>
					<div style={selectStyle}>
                    <Select
                        id='epfl-page-teaser-page2'
                        name='epfl-page-teaser-page2'
                        value={ JSON.parse( attributes.page2 ) }
                        onChange={ handlePage2Change }
                        options={ optionsPagesList }
                        placeholder={ __('Select page', 'wp-gutenberg-epfl') }
                    />
					</div>
                    <Select
                        id='epfl-page-teaser-page3'
                        name='epfl-page-teaser-page3'
                        value={ JSON.parse( attributes.page3 ) }
                        onChange={ handlePage3Change }
                        options={ optionsPagesList }
                        placeholder={ __('Select page', 'wp-gutenberg-epfl') }
                    />
                </div>
            )
        }
        return content;
    }
}
