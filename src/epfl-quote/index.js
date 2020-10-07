import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import { image } from "@wordpress/icons";

import quoteIcon from './quote-icon'

const version = "v1.0.5";

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	MediaUpload,
	InspectorControls,
} = wp.blockEditor;

const {
    Placeholder,
    Button,
    TextareaControl,
    TextControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/quote', {
	title: __( 'EPFL Quote', 'epfl'),
	description: __(
		'Create a quote',
		'epfl'
	),
	icon: quoteIcon,
	category: hasCommonCategory ? 'common' : 'text',
	attributes: getTooltippedAttributes({
		imageId: {
			type: 'number',
        },
        imageUrl: {
            type: 'string',
        },
		quote : {
			type: 'string',
        },
        author : {
			type: 'string',
        },
        position : {
			type: 'string',
		}
	}),
	example: getTooltippedExample(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {

		const { attributes, className, setAttributes } = props

		if ( attributes.asToolTip ) {
			// render the tooltip
			return(
				<Fragment>
					<img src={ blockThumbnails.quote } />
				</Fragment>
			);
		}

		function onImageSelect(imageObject) {
			setAttributes({
                imageId: imageObject.id,
                imageUrl: imageObject.url
			})
        }

        function onRemoveImage() {
            props.setAttributes({
              imageId: null,
              imageUrl: null,
            })
        }

		return (
		<Fragment>
			<InspectorControls>
				<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/quote-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
				<p className="wp-block-help">{ version }</p>
			</InspectorControls>
            <div className={ className }>
                <h2 className="epfl-block-title">{ __('EPFL Quote', 'epfl') }</h2>
                { ! attributes.imageId ? (
                    <MediaUpload
                        onSelect={ onImageSelect }
                        type="image"
                        value={ attributes.imageId }
                        render={ ( { open } ) => (
                            <Placeholder
								icon={ image }
                                label={ __("Image", 'epfl') }
                                instructions={ __('Please, select a square image', 'epfl') }
                            >
                                <Button
                                    onClick={ open }
									isPrimary={ true }
                                >
                                    { __('Upload', 'epfl') }
                                </Button>
                            </Placeholder>
                        )}
                        />
                       ) : (
                        <p className="epfl-uploader-image-wrapper">
                        <img
                          src={ attributes.imageUrl }
                          alt={ attributes.imageUrl }
                          className="epfl-uploader-img"
                        />

                        { props.isSelected && (

                        <Button
                            className="epfl-uploader-remove-image"
                            onClick={ onRemoveImage }
                            icon="dismiss"
                        >
                            { __('Remove image', 'epfl') }
                        </Button>

                        ) }
                      </p>
                )}
                <TextareaControl
                    label={ __('Quote', 'epfl') }
                    value={ attributes.quote }
                    onChange={ quote => setAttributes( { quote } ) }
                />
                <TextControl
                    label={ __('Author', 'epfl') }
                    value={ attributes.author }
                    onChange={ author => setAttributes( { author } ) }
                />
                <TextControl
                    label={ __('Position', 'epfl') }
                    value={ attributes.position }
                    onChange={ position => setAttributes( { position } ) }
                />
			</div>
		</Fragment>
		)

	},
	save: ( props ) => {
		return null;
	},
} );
