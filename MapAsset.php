<?php
/**
 * @copyright Copyright (c) 2014 Mizuwork
 * @link http://www.mizuwork.com
 * @license http://www.opensource.org/licenses/bsd-license.php New BSD License
 */
namespace yiqiang\googlemap;

use yii\web\AssetBundle;

/**
 * Google Map Asset
 *
 * Plugin to handle Google maps
 *
 * @author YiQiang <daiyqj@gmail.com>
 * @link http://www.mizuwork.com/
 * @link http://www.mizuwork.com/
 * @package yiqiang\googlemap
 */

class MapAsset extends AssetBundle{
	public $sourcePath = '@vendor/yiqiang/yii2-googlemap/js/';

	public $js = [
		'map.js'
	];

    public $depends = [
		'yii\web\JqueryAsset',
    ];
}
?>
