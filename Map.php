<?php
/**
 * @copyright Copyright (c) 2014 Mizuwork
 * @link http://www.mizuwork.com
 * @license http://www.opensource.org/licenses/bsd-license.php New BSD License
 */
namespace yiqiang\googlemap;

use Yii;
use yii\base\Widget;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\web\JqueryAsset;

/**
 * Google Map
 *
 * Plugin to handle Google maps
 *
 * @author YiQiang <daiyqj@gmail.com>
 * @link http://www.mizuwork.com/
 * @link http://www.mizuwork.com/
 * @package yiqiang\googlemap
 */

class Map extends Widget{
	
	/**
     * Free API. See usage limit @ https://developers.google.com/maps/documentation/geocoding/#Limits
     */
	public $api="http://maps.googleapis.com/maps/api/geocode/json?address=";
	public $inline_style="";
	public $markers=[];
	public $options=[];
	public $address;
	public $markerIcon;
	public $container;
	public $id;
	public $style;
	public $fitBound;

	/**
     * Get Geolocation for a particular address
     */
	public function getGeo($address)
	{
		$json=file_get_contents($this->api.urlencode($address));

		$data=json_decode($json,TRUE);

		if($data['status']=="OK")
		{
			return array_merge(array($address),array_values($data['results'][0]['geometry']['location']));
		}

		return FALSE;

	}

	/**
     * Init Widget
     * Configure variables settings
     */
	public function init()
	{
		parent::init();

		if(empty($this->id)) $this->id="map-canvas";

		if(empty($this->container)) $this->container="div";

		if(empty($this->markerIcon)) $this->markerIcon="";

		if(empty($this->fitBound)) $this->fitBound=FALSE;

		if(!empty($this->style))
		{
			if(!is_array($this->style))
			{
				$this->inline_style=" style=\"".$this->style."\"";
			}
			else
			{
				$this->inline_style=" style=\"";
				foreach($this->style as $attribute=>$value)
				{
					$this->line_style .= $attribute.':'.$value.";";
				}
				$this->inline_style.="\"";
			}

		}

		if(!empty($this->address))
		{
			if(!is_array($this->address))
			{
				$address=$this->getGeo($this->address);
				if($address!=FALSE) array_push($this->markers, $address);
			}
			else
			{
				foreach($this->address as $adr)
				{
					$address=$this->getGeo($adr);
					if($address!=FALSE) array_push($this->markers, $address);
				}
			}
		}

	}

	/**
     * Run Widget
     */
	public function run()
	{
		$view=$this->getView();

		$config['markers']=$this->markers;
		$config['options']=$this->options;
		$config['icon_img']=$this->markerIcon;
		$config['id']=$this->id;
		$config['isFitBound']=$this->fitBound;

		$view->registerJsFile('https://maps.googleapis.com/maps/api/js?v=3.exp',['depends' => [JqueryAsset::className()]]);
		MapAsset::register($view);

		$js="
		var cfg=".json_encode($config).";
		google.maps.event.addDomListener(window, 'load', initMap(cfg));
		";
		$view->registerJs($js);

		echo "<".$this->container." id=\"".$this->id."\"".$this->inline_style."></".$this->container.">";
	}
}
?>
