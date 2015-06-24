function initMap(cfg){
    var map = new google.maps.Map(document.getElementById(cfg['id']));
    var markers = getMarkers(cfg.markers, cfg.icon_img);
    var lines = getPolylines(cfg.polylines);

    if(cfg.options.center)
        cfg.options.center = new google.maps.LatLng(cfg.options.center[0], cfg.options.center[1]);
    else
        cfg.options.center = new google.maps.LatLng(cfg.markers[0][1], cfg.markers[0][2]);
    
    if(!cfg.options.zoom) 
        cfg.options.zoom = 8;

    map.setOptions(cfg.options);
    if(cfg.isFitBound)
        fitBound(map, cfg.markers);
    if(cfg.isCluster) {
        new MarkerClusterer(map, markers, {
            calculator: function(a, c){
                var f = 0;
                var title = "";
                var d = a.length.toString(); 
                var e = d;
                for(var i = 0, toi = a.length; i < toi; i++)
                    title += a[i].title + '\n';
                while(e !== 0){
                    e = parseInt(e/10, 10);
                    f++;
                }
                f = Math.min(f, c);
                return{text: d, index: f, title: title}
            },
            maxZoom: 18
        });
    } else {
        for(var i = 0, toi = markers.length; i < toi; i++)
            markers[i].setMap(map);
        for(var i = 0, toi = lines.length; i < toi; i++)
            lines[i].setMap(map);
    }
}

function getMarkers(points, icon){
    var markers = [];

    for (var i = 0, toi = points.length, marker, point; i < toi; i++){
        point = points[i];

        marker = point.label ? getMarkerWithLabel(point) : getSimpleMarker(point);

        prepareMarker(point, marker, icon);

        markers.push(marker);
    }

    return markers;
}

function getMarkerWithLabel(point){
    return new MarkerWithLabel({
            position: new google.maps.LatLng(point[1], point[2]),
            title: point[0],
            raiseOnDrag: true,
            labelContent: point.label,
            labelAnchor: new google.maps.LatLng(point[1],point[2]),
            labelClass: "labels",
            labelStyle: {opacity: 0.75},
        });
}

function getSimpleMarker(point){
    return new google.maps.Marker({
            position: new google.maps.LatLng(point[1], point[2]),
            title: point[0]
        });
}

function prepareMarker(point, marker, icon){
    if (point.color){
        var pinColor = point.color;
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
            new google.maps.Size(40, 37),
            new google.maps.Point(0, 0),
            new google.maps.Point(12, 35));

        marker.setIcon(pinImage);
        marker.setShadow(pinShadow);
    }

    if(icon)
        marker.setIcon(icon);
}

function fitBound(map, markers){
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++){
        markerLatLng = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(markerLatLng);
    }

    map.fitBounds(bounds);
}

function getPolylines(lines){
    var polylines = [];
    var lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
    };

    for (var i = 0, toi = lines.length, points, lineCoordinates, line; i < toi; i++) {
        points = lines[i].points;
        lineCoordinates = []
        for (var j = 0; j < points.length; j++)
            lineCoordinates[j] = new google.maps.LatLng(points[j][1], points[j][2]);

        line = new google.maps.Polyline({
            path: lineCoordinates,
            strokeColor: lines[i].color,
            icons: [{
                icon: lineSymbol,
                offset: '100%'
            }]
        });

        polylines.push(line);
    }

    return polylines;
}

function get_random_color() {
    return ((1<<24)*Math.random()|0).toString(16);
}