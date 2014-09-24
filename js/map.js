
		function initMap(cfg)
		{
			var map = new google.maps.Map(document.getElementById(cfg['id']));

			if(typeof cfg['options']['center']!=='undefined')
			{
				cfg['options']['center']=new google.maps.LatLng(cfg['options']['center'][0],cfg['options']['center'][1]);
			}
			else
			{
				cfg['options']['center']=new google.maps.LatLng(cfg['markers'][0][1],cfg['markers'][0][2]);
			}
			
			if(typeof cfg['options']['zoom']==='undefined') cfg['options']['zoom']=8;
			map.setOptions(cfg['options']);

			if(cfg['isFitBound']) fitBound(map, cfg['markers']);

			setMarkers(map, cfg['markers'], cfg['icon_img']);
		}

		function fitBound(map, markers)
		{
			var bounds = new google.maps.LatLngBounds();

			for (var i = 0; i < markers.length; i++)
			{
				markerLatLng = new google.maps.LatLng(markers[i][1], markers[i][2]);
				bounds.extend(markerLatLng);
			}

			map.fitBounds(bounds);
		}

		function setMarkers(map, markers, icon_img)
		{
			for (var i = 0; i < markers.length; i++)
			{
				var markerLatLng = new google.maps.LatLng(markers[i][1], markers[i][2]);
				var marker = new google.maps.Marker({
					position: markerLatLng,
					map: map,
					title: markers[i][0]
				});
				if(icon_img!='') marker.setIcon(icon_img);
			}
		}