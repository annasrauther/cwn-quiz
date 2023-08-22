<?php
/**
 * Plugin Name: CWN Multiple Choice Quiz
 * Description: A multiple choice quiz block for the Gutenberg editor.
 * Version: 1.0
 * Author: Al Annas Rauther
 * Author URI: https://annasrauther.com
 * License: GPL3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

class CWN_Quiz {
    /**
     * Initialize the plugin.
     */
    public function __construct() {
        // Add necessary hooks
        add_action('init', array($this, 'register_assets'));
    }

    /**
     * Register plugin assets.
     */
    public function register_assets() {
        // Register and enqueue styles
        wp_register_style(
            'cwn-multiple-choice-quiz-css',
            plugins_url('build/index.css', __FILE__)
        );
        wp_enqueue_style('cwn-multiple-choice-quiz-css');

        // Register and enqueue scripts
        wp_register_script(
            'cwn-multiple-choice-quiz-js',
            plugins_url('build/index.js', __FILE__),
            array('wp-blocks', 'wp-element', 'wp-editor')
        );
        wp_enqueue_script('cwn-multiple-choice-quiz-js');

        // Register the block
        register_block_type('cwn/multiple-choice-quiz', array(
            'editor_script' => 'cwn-multiple-choice-quiz-js',
            'editor_style' => 'cwn-multiple-choice-quiz-css',
            'render_callback' => array($this, 'render_quiz_block'),
        ));
    }

    /**
     * Render the quiz block.
     *
     * @param array $attributes Block attributes.
     * @return string HTML output for the block.
     */
    public function render_quiz_block($attributes) {
        ob_start();
        ?>
        <div class="cwn-multiple-choice-quiz-ui" data-wp-block-attrs="<?php echo wp_json_encode($attributes); ?>"></div>
        <?php
        return ob_get_clean();
    }
}

// Initialize the plugin
$cwn_quiz = new CWN_Quiz();
