<?php


namespace Drupal\taylor_module\Controller;


use Drupal\Core\Controller\ControllerBase;

class StationsMapBlockController extends ControllerBase
{
  public function content(){
    return array(
      '#theme' => 'taylor_module_block_template'
    );
  }
}
