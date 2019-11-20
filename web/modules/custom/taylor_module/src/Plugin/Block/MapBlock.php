<?php


namespace Drupal\taylor_module\Plugin\Block;


use Drupal\Core\Block\BlockBase;

/**
 * Provides a "Taylor module' Block.
 *
 * @Block(
 *   id = "taylor_map_block",
 *   admin_label = @Translation("Taylor map block"),
 *   category = "Taylor
 * )
 *
 * Class MapBlock
 * @package Drupal\taylor_module\Plugin\Block
 */

class MapBlock extends BlockBase
{
  public function build() {
   return array(
     '#theme' => 'taylor_module_block_template',
     '#attached' => array (
       'library' => array(
         'taylor_module/mapael'
       )
     )
   );
  }
}
