import InspectorControlsPostTeaser from './inspector'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/post-teaser',
	{
		title: __( "EPFL Post Teaser", 'wp-gutenberg-epfl'),
		description: 'v1.0.1',
		category: 'common',
		keywords: [
            __( 'page' , 'wp-gutenberg-epfl'),
            __( 'teaser' , 'wp-gutenberg-epfl'),
		],
		attributes: {
			post1: {
				type: 'string',
				default: null,
            },
            post2: {
				type: 'string',
				default: null,
            },
            post3: {
				type: 'string',
				default: null,
            },
            grayBackground: {
                type: 'boolean',
            }
		},
		supports : {
			customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
		},

		edit: props => {
			const { attributes, className, setAttributes } = props
			return (
				<Fragment>
					<h2>EPFL Post Teaser</h2>
					<InspectorControlsPostTeaser { ...{ attributes, setAttributes } } />
				</Fragment>
			)
		},

		save: props => {
            return null
        },
	}
)
