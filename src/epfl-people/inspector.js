import React from 'react';

const { __ } = wp.i18n
const {
  Component,
  Fragment,
} = wp.element

const {
	InspectorControls,
} = wp.blockEditor

const {
    PanelBody,
    TextControl,
    RadioControl,
} = wp.components

export default class InspectorControlsPeople extends Component {

    render() {

        const { attributes, setAttributes } = this.props

        let optionsColumnsList = [
            { value: 'list', label: __('List', 'epfl')},
            { value: '1', label: __('Cards, one column', 'epfl')},
            { value: '3', label: __('Cards, multiple columns', 'epfl')},
        ];

        let optionsOrderList = [
          { value: 'alphabetical', label: __('Alphabetical order', 'epfl')},
          { value: 'hierarchical', label: __('Hierarchical order', 'epfl')},
          { value: 'hierarchical-with-title', label: __('Hierarchical order with title', 'epfl')},
        ]

        let structure;
        if (!!attributes.order && attributes.order.startsWith('hierarchical')) {
          structure = <Fragment>
            <strong>{__( 'Structure', 'epfl')}</strong>
            <TextControl
                value={ attributes.structure }
                className="field-with-no-margin-bottom"
                onChange={ structure => setAttributes( { structure } ) }
            />
            <p>{ __('You can enter the name of a custom structure.', 'epfl') } <a target="_blank" href="https://www.epfl.ch/campus/services/website/web-services/help-for-people-epfl-ch/tools-for-webmasters/">{ __('More information', 'epfl') }</a>. <a target="_blank" href="https://people.epfl.ch/cgi-bin/upldtmpl">{ __('List of existing structures', 'epfl') }</a></p>

          </Fragment>
        }

        let sortingPanelBody;
        if (!!attributes.units) {
            sortingPanelBody = <PanelBody title={ __( 'Sorting', 'epfl' ) }>
                    <RadioControl
                        selected={ attributes.order }
                        options={ optionsOrderList }
                        onChange={ order => setAttributes( { order } ) }
                    />
                    {structure}
                </PanelBody>
        }

        let content = "";

        content = (
            <InspectorControls>
                <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/people-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                <PanelBody title={ __( 'Select by', 'epfl') }>
                    <strong>{__( 'Units', 'epfl')}</strong>
                    <TextControl
                        value={ attributes.units }
                        help={ __('You can enter many units separated by commas', 'epfl') }
						onChange={ units => setAttributes( { units } ) }
					/>
                    <h2>{__( 'OR', 'epfl')}</h2>
                    <strong>{__( 'Groups', 'epfl')}</strong>
                    <TextControl
                        value={ attributes.groups }
                        help={ __('You can enter many groups separated by commas', 'epfl') }
						onChange={ groups => setAttributes( { groups } ) }
					/>
                    <h2>{__( 'OR', 'epfl')}</h2>
                    <strong>{__( 'Scipers', 'epfl')}</strong>
                    <TextControl
                        value={ attributes.scipers }
                        help={ __('You can enter many scipers separated by commas', 'epfl') }
						onChange={ scipers => setAttributes( { scipers } ) }
					/>
                    <h2>{__( 'OR', 'epfl')}</h2>
                    <strong>{__( 'Doctoral programs', 'epfl')}</strong>
                    <TextControl
                        value={ attributes.doctoralProgram }
                        help={ __('Example: EDAM') }
						onChange={ doctoralProgram => setAttributes( { doctoralProgram } ) }
					/>
                </PanelBody>
                { sortingPanelBody }
                <PanelBody title={ __( 'Function', 'epfl' ) }>
                    <TextControl
                        value={ attributes.fonction }
                        help={ __('You can enter a function to filter persons. The keyword must be in french. Example: professeur or enseignement') }
						onChange={ fonction => setAttributes( { fonction } ) }
					/>
                </PanelBody>
                <PanelBody title={ __( 'Columns', 'epfl' ) }>
                    <RadioControl
                        label={ __("Select a template", 'epfl') }
                        selected={ attributes.columns }
                        options={ optionsColumnsList }
                        onChange={ columns => setAttributes( { columns } ) }
                    />
                </PanelBody>
            </InspectorControls>
        )

        return content;
    }
}
