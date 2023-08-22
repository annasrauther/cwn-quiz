import Edit from './edit';
import Save from './save';
import block from '../block.json';

/**
 * Locks post saving if a block with undefined correctAnswer is present.
 */
(function () {
    let locked = false;

    // Subscribe to the blocks store and check for blocks with undefined correctAnswer.
    wp.data.subscribe(function () {
        const results = wp.data.select("core/block-editor").getBlocks().filter(function (blockItem) {
            return block.name === block.name && blockItem.attributes.correctAnswer === undefined;
        });

        // If there are blocks with undefined correctAnswer and the post isn't already locked, lock it.
        if (results.length && !locked) {
            locked = true;
            wp.data.dispatch("core/editor").lockPostSaving("noanswer");
        }

        // If there are no blocks with undefined correctAnswer and the post is locked, unlock it.
        if (!results.length && locked) {
            locked = false;
            wp.data.dispatch("core/editor").unlockPostSaving("noanswer");
        }
    });
})();

/**
 * Register the Multiple Choice Quiz block.
 *
 * @param {Object} block - The block configuration from block.json.
 * @param {Object} block.attributes - The attributes for the block.
 * @param {function} block.edit - The block's edit component.
 * @param {function} block.save - The block's save component.
 */
wp.blocks.registerBlockType(block, {
    edit: Edit,
    save: Save
});
