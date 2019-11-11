<?php
/**
 * Plugin Name: wp-gutenberg-epfl
 * Description: EPFL Gutenberg Blocks
 * Author: WordPress EPFL Team
 * Version: 1.1.3
 */

namespace EPFL\Plugins\Gutenberg;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'frontend/init.php';

// load .mo file for translation
function epfl_gutenberg_load_textdomain() {

	//load_plugin_textdomain( 'epflgutenberg', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	load_plugin_textdomain( 'wp-gutenberg-epfl', FALSE, basename( dirname( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded',  __NAMESPACE__ . '\epfl_gutenberg_load_textdomain' );

# allow to fetch rest api with the lang parameter
function polylang_json_api_init() {
    global $polylang;

    $default = pll_default_language();
    $langs = pll_languages_list();

    if (isset($_GET['lang'])) {
        $cur_lang = $_GET['lang'];
        if (!in_array($cur_lang, $langs)) {
            $cur_lang = $default;
        }
        $polylang->curlang = $polylang->model->get_language($cur_lang);
        $GLOBALS['text_direction'] = $polylang->curlang->is_rtl ? 'rtl' : 'ltr';
    }
}

function polylang_json_api_languages() {
    return pll_languages_list();
}

// fix polylang language segmentation
add_action( 'rest_api_init' , __NAMESPACE__ . '\polylang_json_api_init' );

/**
 * Shortcodes
 */
require_once plugin_dir_path( __FILE__ ).'shortcodes/epfl-faq/epfl-faq.php';
require_once plugin_dir_path( __FILE__ ).'shortcodes/epfl-labs-search/epfl-labs-search.php';
require_once plugin_dir_path( __FILE__ ).'shortcodes/epfl-magistrale/epfl-magistrale.php';
require_once plugin_dir_path( __FILE__ ).'shortcodes/epfl-polylex-search/epfl-polylex-search.php';
require_once plugin_dir_path( __FILE__ ).'shortcodes/epfl-servicenow-search/epfl-servicenow-search.php';
require_once plugin_dir_path( __FILE__ ).'shortcodes/epfl_share/epfl-share.php';
require_once plugin_dir_path( __FILE__ ).'shortcodes/epfl-study-plan/epfl-study-plan.php';
