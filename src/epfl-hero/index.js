const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
    MediaUpload,
	InspectorControls,
} = wp.editor;

const {
    PanelBody,
    TextControl,
    TextareaControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/hero', {
	title: __( 'EPFL Hero', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: 'id',
	category: 'common',
	attributes: {
		title: {
			type: 'string',
        },
        text: {
			type: 'string',
        },
        imageUrl: {
            type: 'string',
        },
        imageId: {
            type: 'number',
        },
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

        return (
            <Fragment>

                <div className={ className }>
                        <h2>EPFL Hero</h2>
                        <TextControl
                            label={ __('Title','wp-gutenberg-epfl')}
                            value={ attributes.title }
                            onChange={ title => setAttributes( { title } ) }
                        />
                        <hr/>
                        <TextareaControl
                            label={ __('Text', 'wp-gutenberg-epfl')}
                            value={ attributes.text }
                            onChange={ text => setAttributes( { text } ) }
                        />
                        <hr/>
                        <MediaUpload
                            onSelect={onImageSelect}
                            type="image"
                            value={attributes.imageId}
                            render={({ open }) => (
                                <div class="components-base-control">
                                    <img style={ {maxHeight: '200px'} } src={ attributes.imageUrl } />
                                    <button onClick={open}>
                                    { __('Select Image', 'wp-gutenberg-epfl') }
                                    </button>
                                    <div style={ {marginTop: '5px'} }>{ __('Please, select an image. Recommended image size: 1920x1080', 'wp-gutenberg-epfl') }</div>
                                </div>
                            )}
                        />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );
