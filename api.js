require([
  "esri/Map",//モジュール読み込み1 (map)
  "esri/views/MapView",//モジュール読み込み2

  "esri/config",
  "esri/widgets/Locate",
  "esri/widgets/Track",
  "esri/Graphic",
  "esri/widgets/Search",

  "esri/layers/FeatureLayer", 
  "esri/widgets/Legend",
  //"esri/intl"

],function(
    Map,
    MapView,

    esriConfig,
    Locate,
    Track,
    Graphic,
    Search,

    FeatureLayer,
    Legend,
    //intl
    ){

    /*intl.setLocale("ja");
    const selfUrl = "https://www.arcgis.com/sharing/rest/portals/self";
    esriConfig.request.interceptors.push({
        urls: selfUrl,
        before: function(params) {
            if (params.requestOptions.query) {
                switch(intl.getLocale())
                {
                    case "ja":
                        params.requestOptions.query.culture="ja";
                        params.requestOptions.query.region="JP";
                        break;
                }
            }
       }
    });*/
    

    esriConfig.apiKey ="AAPKc33225c582f04d6da5dacc29a286b4a4R4PXu_BBYzLkz8Vtwog9SLc-lxwTaKqlVn-LpknH4TXwnEzDbgmDrFkYBHoiu74_";
    
    //new
    const referenceScale = 9244650;

        // Renders each weather station with three visual variables:
        // Rotation - indicates wind direction
        // Color - indicates air temperature
        // Size - indicates wind speed

        const renderer = {
          type: "simple", // autocasts as new SimpleRenderer()
          symbol: {
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            // Arrow marker
            path: "M14.5,29 23.5,0 14.5,9 5.5,0z",
            color: [250, 250, 250],
            outline: {
              color: [255, 255, 255, 0.5],
              width: 0.5
            },
            angle: 180,
            size: 15
          },
          visualVariables: [
            {
              type: "rotation",
              field: "WIND_DIRECT",
              rotationType: "geographic"
            },
            {
              type: "size",
              field: "WIND_SPEED",
              minDataValue: 0,
              maxDataValue: 60,
              minSize: {
                type: "size",
                valueExpression: "$view.scale",
                // adjust the min size by scale
                stops: [
                  { value: referenceScale, size: 8 },
                  { value: referenceScale*2, size: 6 },
                  { value: referenceScale*4, size: 4 },
                  { value: referenceScale*8, size: 2 }
                ]
              },
              maxSize: {
                type: "size",
                valueExpression: "$view.scale",
                // adjust the max size by scale
                stops: [
                  { value: referenceScale, size: 40 },
                  { value: referenceScale*2, size: 30 },
                  { value: referenceScale*4, size: 20 },
                  { value: referenceScale*8, size: 10 }
                ]
              }
            },
            {
              type: "color",
              field: "TEMP",
              stops: [
                { value: 20, color: "#2b83ba" },
                { value: 35, color: "#abdda4" },
                { value: 50, color: "#ffffbf" },
                { value: 65, color: "#fdae61" },
                { value: 80, color: "#d7191c" }
              ]
            }
          ]
        };

        // Set the renderer on the feature layer
        const layer = new FeatureLayer({
          portalItem: {
            id: "cb1886ff0a9d4156ba4d2fadd7e8a139"
          },
          title: "気象情報",
          renderer: renderer
        });

    const map = new Map({
    basemap: "streets",//背景表示のベースマップを定義
    //basemap: "arcgis-topographic",
    layers:[layer]
    });


    const view = new MapView({
    container: "viewDiv", //View を表示する DOM ノードを参照
    map: map, //mapを参照
    center: [18.9553, 69.6492], //Longitude, latitude
    });

    view.ui.add(new Legend({
      view: view
    }), "bottom-right");




    const track = new Track({// 位置情報
          view: view,
          graphic: new Graphic({
            symbol: {
              type: "simple-marker",
              size: "12px",
              color: "red",
              outline: {
                color: "#efefef",
                width: "1.5px"
              }
            }
          }),
          useHeadingEnabled: false
        });
        view.ui.add(track, "top-left");

  // 検索　js
    const searchWidget = new Search({
      view: view
    });
    
    view.ui.add(searchWidget, {
      position: "top-right",
      index: 2
    });

});
