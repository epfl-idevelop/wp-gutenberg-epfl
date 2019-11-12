import * as axios from 'axios';
import React from 'react';

const { __ } = wp.i18n
const { Component } = wp.element

const {
	InspectorControls,
} = wp.editor

const {
    PanelBody,
    SelectControl,
    RadioControl,
    TextControl,
    RangeControl,
} = wp.components

export default class InspectorControlsMemento extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mementos: null,
            categories: null,
        }
    }

    componentDidMount() {
        let apiRestUrl = 'https://memento.epfl.ch/api/v1/';

        let entryPointMementos = `${apiRestUrl}mementos/?format=json&limit=800`;
		axios.get(entryPointMementos)
			.then( response => response.data.results )
			.then( mementos => this.setState({ mementos }) )
            .catch( err => console.log(err))

        let entryPointCategories = `${apiRestUrl}categories/?format=json&limit=800`;
        axios.get(entryPointCategories)
            .then( response => response.data.results )
            .then( categories => this.setState({ categories }) )
            .catch( err => console.log(err))
	}

    render() {

        const { attributes, setAttributes } = this.props

        let content = "";

        if (this.state.mementos !== null && this.state.categories !== null) {

            let optionsMementosList = [];

            this.state.mementos.forEach(memento => {
                optionsMementosList.push({ label: memento.en_name, value: memento.id });
            });

            let optionsTemplatesList = [
                { value: 'slider_with_the_first_highlighted_event', label: __('Template slider with the first highlighted event', 'epfl')},
                { value: 'slider_without_the_first_highlighted_event', label: __('Template slider without the first highlighted event', 'epfl')},
                { value: 'listing_with_the_first_highlighted_event', label: __('Template listing with the first highlighted event', 'epfl')},
                { value: 'listing_without_the_first_highlighted_event', label: __('Template listing without the first highlighted event', 'epfl')},
            ];

            let optionsLanguagesList = [
                { value: 'fr', label: __('French', 'epfl') },
                { value: 'en', label: __('English', 'epfl') },
            ];

            let optionsPeriodsList = [
                { value: 'upcoming', label: __('Upcomings events', 'epfl') },
                { value: 'past', label: __('Past events', 'epfl') },
            ];

            let optionsCategoriesList = [
                { value: 0, label: __('No filter', 'epfl') },
            ];

            this.state.categories.forEach(category => {
                optionsCategoriesList.push({ label: category.en_label, value: category.id });
            });

            content = (
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/memento-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <PanelBody title={ __('Memento', 'capitainewp-gutenberg-blocks', 'epfl') }>
                        <SelectControl
                            label={ __("Select your memento", 'epfl') }
                            help={ __("The events come from the application memento.epfl.ch. If you don't have a memento, please send a request to 1234@epfl.ch", 'epfl') }
                            value={ attributes.memento }
                            options={ optionsMementosList }
                            onChange={ memento => {
                              memento = Number(memento);
                              setAttributes( { memento } );
                            }}
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Template', 'wp-gutenberg-epfl' ) }>
                        <RadioControl
                            label={ __("Select a template", 'epfl') }
                            help={ __("Do you need more information about templates? Read this documentation", 'epfl') }
                            selected={ attributes.template }
                            options={ optionsTemplatesList }
                            onChange={ template => setAttributes( { template } ) }
	                    />
                        <RangeControl
                            label={ __("Select the number of events", 'epfl') }
                            value={ attributes.nbEvents }
                            onChange={ nbEvents  => setAttributes( { nbEvents } ) }
                            min={ 0 }
                            max={ 20 }
                            beforeIcon="arrow-down"
                            afterIcon="arrow-up"
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Language', 'wp-gutenberg-epfl' ) }>
                        <RadioControl
                            label={ __("Select a language", 'epfl') }
                            help={ __("The language used to render news results", 'epfl') }
                            selected={ attributes.lang }
                            options={ optionsLanguagesList }
                            onChange={ lang => setAttributes( { lang } ) }
	                    />
                    </PanelBody>
                    <PanelBody title={ __('Period', 'epfl') }>
                        <RadioControl
                            label={ __("Select a period", 'epfl') }
                            help={ __("Do you want upcoming events or past events ?", 'epfl') }
                            selected={ attributes.period }
                            options={ optionsPeriodsList }
                            onChange={ period => setAttributes( { period } ) }
	                    />
                    </PanelBody>
                    <PanelBody title={ __( 'Category', 'wp-gutenberg-epfl' ) }>
                        <SelectControl
                            label={ __("Filter events by category", 'epfl') }
                            help={ __("Do you want filter events by category? Please select a category.", 'epfl') }
                            value={ attributes.categories }
                            options={ optionsCategoriesList }
                            onChange={ category => setAttributes( { category } ) }
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Keyword', 'wp-gutenberg-epfl' ) }>
                        <TextControl
                            label={ __("Filter events by keyword", 'epfl') }
                            help={ __("Do you want filter events by keyword? Please type a keyword.", 'epfl') }
                            value={ attributes.keyword }
                            onChange={ keyword => setAttributes( { keyword} )}
                        />
                    </PanelBody>

                </InspectorControls>
            )
        }
        return content;
    }
}