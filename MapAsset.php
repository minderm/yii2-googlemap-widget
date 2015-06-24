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
	public $sourcePath = '@vendor/minderm/yii2-googlemap-widget/js/';

    public $css = [
        'style.css'
    ];

	public $js = [
		'map.js',
        'markerclusterer_compiled.js',
        'markerwithlabel_packed.js'
	];

    public $depends = [
		'yii\web\JqueryAsset',
    ];
}
?>
