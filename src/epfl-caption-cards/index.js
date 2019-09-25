const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    MediaUpload
} = wp.editor;

const {
    TextControl,
    Placeholder,
    IconButton,
} = wp.components;

const { Fragment } = wp.element;

const maxCaptionCards = 10;

const getAttributes = () => {
    let atts = {};

    for (var i = 1; i <= maxCaptionCards; i++) {
        atts['title'+i] = {
			type: 'string',
        };
        atts['subtitle'+i] = {
			type: 'string',
        };
        atts['link'+i] = {
			type: 'string',
        };
        atts['imageId'+i] = {
			type: 'integer',
        };
        atts['imageUrl'+i] = {
            type: 'string',
            default: null
        };
    }

    return atts;
}

function CaptionCardPanel ( props ) {
    const { attributes, setAttributes, index } = props;

    const setIndexedAttributes = (field_name, value) => {
        setAttributes({[`${field_name}${index}`]: value});
    };

    const onImageSelect = (imageObject) => {
        setAttributes({
            [`imageUrl${index}`]: imageObject.sizes.full.url,
            [`imageId${index}`]: imageObject.id
        })
    };

    const onRemoveImage = () => {
        setAttributes({
            [`imageUrl${index}`]: null,
            [`imageId${index}`]: null,
        })
    }

    return (
        <div>
           <h3>{`Caption card ${index}`} </h3>
           <TextControl
                label={ __('Title', 'wp-gutenberg-epfl') }
                value={ attributes['title' + index] || ''}
                onChange={ value => setIndexedAttributes('title', value) }
            />
           <TextControl
                label={ __('Subtitle', 'wp-gutenberg-epfl') }
                value={ attributes['subtitle' + index] || ''}
                onChange={ value => setIndexedAttributes('subtitle', value) }
            />
           <TextControl
                label={ __('Link', 'wp-gutenberg-epfl') }
                value={ attributes['link' + index] || ''}
                onChange={ value => setIndexedAttributes('link', value) }
            />
            { ! attributes['imageId' + index] ? (
                <MediaUpload
                    onSelect={ onImageSelect }
                    type="image"
                    value={ attributes['imageId' + index] }
                    render={ ( { open } ) => (
                        <Placeholder
                            icon="images-alt"
                            label={ __("Image", 'wp-gutenberg-epfl') }
                            instructions={ __('Please, select a image', 'wp-gutenberg-epfl') }
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
                        src={ attributes['imageUrl' + index] }
                        alt={ attributes['imageUrl' + index] }
                        class="epfl-uploader-img"
                    />

                    { props.attributes['imageUrl' + index] && (
        
                    <IconButton
                        className={'epfl-uploader-remove-image'}
                        onClick={ onRemoveImage }
                        icon="dismiss"
                    >
                        { __('Remove image', 'wp-gutenberg-epfl') }
                    </IconButton>

                    ) }
                    </p>
                )}
        </div>
    );

}


registerBlockType( 'epfl/caption-cards', {
	title: __( 'EPFL Caption Cards', 'wp-gutenberg-epfl'),
	description: 'v1.0.2',
	icon: 'screenoptions',
	category: 'common',
	attributes: getAttributes(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props

        return (
            <Fragment>
                <InspectorControls>
                    <p><a class="wp-block-help" href={ __('https://www.epfl.ch/campus/services/caption-cards-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
                </InspectorControls>
                <div className={ className + ' wp-block-scroll' }>
                    {[...Array(maxCaptionCards)].map((x, i) =>
                        <CaptionCardPanel key={i+1} { ...{ attributes, setAttributes, index:i+1 } }  />
                    )}
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
});
