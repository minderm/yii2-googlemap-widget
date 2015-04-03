
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
            setPolylines(map, cfg['polylines'], cfg['icon_img']);
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
                var pinColor = markers[i].color;
                var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                    new google.maps.Size(21, 34),
                    new google.maps.Point(0,0),
                    new google.maps.Point(10, 34));
                var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                    new google.maps.Size(40, 37),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(12, 35));

                var markerLatLng = new google.maps.LatLng(markers[i][1], markers[i][2]);
				var marker = new google.maps.Marker({
					position: markerLatLng,
					map: map,
					title: markers[i][0],
                    icon: pinImage,
                    shadow: pinShadow
				});
				if(icon_img!='') marker.setIcon(icon_img);
			}
		}

        function setPolylines(map, lines, icon_img)
        {
            var lineSymbol = {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
            };

            for (var j = 0; j < lines.length; j++) {
                var markers = lines[j];
                var lineCoordinates = []
                for (var i = 0; i < markers.length; i++)
                {
                    lineCoordinates[i] = new google.maps.LatLng(markers[i][1], markers[i][2]);
                }

                var line = new google.maps.Polyline({
                    path: lineCoordinates,
                    icons: [{
                        icon: lineSymbol,
                        offset: '100%'
                    }],
                    map: map
                });
            }
        }

        function get_random_color() {
            return ((1<<24)*Math.random()|0).toString(16);
        }