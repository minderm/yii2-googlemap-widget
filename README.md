Yii2-GoogleMap
==============

Googlemap plugin for Yii2

Common usage as follows:

```
<?php
    echo Map::widget([
        'id'=>'map',
        'container'=>'p',
        'address'=>'21 Lower Kent Ridge Rd, Singapore',
        'options'=>['zoom'=>15],
        'style'=>'height:500px;width:900px;',
    ]);
?>
```
