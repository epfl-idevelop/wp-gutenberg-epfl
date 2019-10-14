import quoteIcon from './quote-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	MediaUpload,
	InspectorControls,
} = wp.editor;

const {
    Placeholder,
    IconButton,
    TextareaControl,
    TextControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/quote', {
	title: __( 'EPFL Quote', 'wp-gutenberg-epfl'),
	description: 'v1.0.3',
	icon: quoteIcon,
	category: 'common',
	attributes: {
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
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {

		const { attributes, className, setAttributes } = props

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
				<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/quote-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
			</InspectorControls>
            <div className={ className }>
                <h2>EPFL QUOTE</h2>
                { ! attributes.imageId ? (
                    <MediaUpload
                        onSelect={ onImageSelect }
                        type="image"
                        value={ attributes.imageId }
                        render={ ( { open } ) => (
                            <Placeholder
                                icon="images-alt"
                                label={ __("Image", 'wp-gutenberg-epfl') }
                                instructions={ __('Please, select a square image', 'wp-gutenberg-epfl') }
                            >
                                <IconButton
                                    className="components-icon-button wp-block-image__upload-button button button-large"
                                    onClick={ open }
                                    icon="upload"
                                >
                                    { __('Upload', 'wp-gutenberg-epfl') }
                                </IconButton>
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

                        <IconButton
                            className="epfl-uploader-remove-image"
                            onClick={ onRemoveImage }
                            icon="dismiss"
                        >
                            { __('Remove image', 'wp-gutenberg-epfl') }
                        </IconButton>

                        ) }
                      </p>
                )}
                <TextareaControl
                    label={ __('Quote', 'wp-gutenberg-epfl') }
                    value={ attributes.quote }
                    onChange={ quote => setAttributes( { quote } ) }
                />
                <TextControl
                    label={ __('Author', 'wp-gutenberg-epfl') }
                    value={ attributes.author }
                    onChange={ author => setAttributes( { author } ) }
                />
                <TextControl
                    label={ __('Position', 'wp-gutenberg-epfl') }
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
