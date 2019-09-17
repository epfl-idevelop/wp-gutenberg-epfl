
import googleFormsIcon from './google-forms-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.editor;

const {
    PanelBody,
    TextareaControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/google-forms', {
	title: __( 'Google Forms', 'wp-gutenberg-epfl'),
	description: 'v1.0.2',
	icon: googleFormsIcon,
	category: 'common',
	attributes: {
        data: {
			type: 'string',
        },
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props

        return (
            <Fragment>
                <div className={ className }>
                    <h2>EPFL GOOGLE FORMS</h2>
                        <TextareaControl
							label={ __('Google Forms <iframe> HTML code', 'wp-gutenberg-epfl')}
                            value={ attributes.data }
                            onChange={ data => setAttributes( { data } ) }
                            help={ __('You can paste the given HTML code containing <iframe>', 'wp-gutenberg-epfl') }
                        />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );
