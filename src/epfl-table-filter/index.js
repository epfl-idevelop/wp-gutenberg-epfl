import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import tableFilterIcon from './table-filter-icon'

const version = "v1.1.3";

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    InnerBlocks,
} = wp.blockEditor;

const {
    PanelBody,
    ToggleControl,
    TextControl,
    SelectControl,
} = wp.components;

const { Fragment } = wp.element;

const TEMPLATE = [
	['core/table', {}, [] ]
]

const getAttributes = () => {
    let atts = {
        largeDisplay: {
            type: 'boolean',
            default: false,
        },
        placeHolder: {
            type: 'string',
        },
        tableHeaderOptions: {
            type: 'string',
        },
        filterOnlyOnCols: {
            type: 'string',
        },
        numericSortOnCols: {
            type: 'string',
        },
    };

    return atts;
}

let optionsHeader = [
    { value: '', label: __('No header', 'epfl') },
    { value: 'header,sort', label: __('Sortable header', 'epfl') },
];

registerBlockType( 'epfl/table-filter', {
	title: __( 'EPFL Table Filter', 'epfl'),
    description: __(
        'Create a table with search and sort options',
        'epfl'
    ),
	icon: tableFilterIcon,
    category: hasCommonCategory ? 'common' : 'text',
	attributes: getAttributes(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/table-filter-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                    <PanelBody title={ __('Format', 'epfl') }>
                        <ToggleControl
                            label={ __('Large display', 'epfl') }
                            checked={ attributes.largeDisplay }
                            onChange={ largeDisplay => setAttributes( { largeDisplay } ) }
                        />
                        <strong>{__( 'Placeholder', 'epfl')}</strong>
                        <TextControl
                            value={ attributes.placeHolder }
                            help={ __('Text to display in search box', 'epfl') }
                            onChange={ placeHolder => setAttributes( { placeHolder } ) }
                        />
                        <SelectControl
							label={ <h4> { __('Table header', 'epfl') } </h4> }
							value={ attributes.tableHeaderOptions }
							onChange={ tableHeaderOptions => setAttributes( { tableHeaderOptions } ) }
							options={ optionsHeader }
						/>
                    </PanelBody>
                    <PanelBody title={ __('Filter options', 'epfl') }>
                        <strong>{__( 'Filter only on column(s) no', 'epfl')}</strong>
                        <TextControl
                            value={ attributes.filterOnlyOnCols }
                            help={ __('If multiple columns, separate with comma', 'epfl') }
                            onChange={ filterOnlyOnCols => setAttributes( { filterOnlyOnCols } ) }
                        />
                    </PanelBody>
                    <PanelBody title={ __('Sort options', 'epfl') }>
                        <strong>{__( 'Apply numeric sort on column(s)', 'epfl')}</strong>
                        <TextControl
                            value={ attributes.numericSortOnCols }
                            help={ __('If multiple columns, separate with comma', 'epfl') }
                            onChange={ numericSortOnCols => setAttributes( { numericSortOnCols } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                        <h2 className="epfl-block-title">{ __('Table Filter', 'epfl') }</h2>
                        <InnerBlocks
                            template={ TEMPLATE }
                            templateLock="all"
                           />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return (
                <InnerBlocks.Content />

        );
	},
} );
