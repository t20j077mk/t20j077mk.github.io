
        //緯度,経度,ズーム
        var map = L.map('view_map').setView([34.694925577318706,133.92794107726027], 13);
        // OpenStreetMap から地図画像を読み込む
        L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '
        }).addTo(map);