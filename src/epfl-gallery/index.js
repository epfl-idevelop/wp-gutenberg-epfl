

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    InnerBlocks,
} = wp.editor;

const {
    PanelBody,
    ToggleControl,
} = wp.components;

const { Fragment } = wp.element;

// Template to have only one nested block, a core/gallery. And we set the 'fixed layout' option to ensure correct display.
const TEMPLATE = [
	['core/gallery', { hasFixedLayout: true }, [] ]
]

const getAttributes = () => {
    let atts = {
        largeDisplay: {
            type: 'boolean',
            default: false,
        },
    };

    return atts;
}

registerBlockType( 'epfl/gallery', {
	title: __( 'EPFL Gallery', 'epfl'),
	description: 'v1.0.0',
	icon: 'format-gallery',
	category: 'common',
	attributes: getAttributes(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/en/it-services/web-services/wordpress-help/text-tools-en/gallery/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <PanelBody title={ __('Format', 'epfl') }>
                        <ToggleControl
                            label={ __('Large display', 'epfl') }
                            checked={ attributes.largeDisplay }
                            onChange={ largeDisplay => setAttributes( { largeDisplay } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
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
