// ==UserScript==
// @name        Dbria helper.
// @namespace   
// @version     0.1
// @description For my sharon, 
// @match       http://cteam.dbria.com/company_china/detail_main.asp*
// @copyright   2013+, Gavin
// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

unsafeWindow.loadAndExecute = loadAndExecute;
unsafeWindow.execute = execute;

function work() {
    console.log("hehe");
    function love1() {
        console.log("love1");
        $('#map').width(800);
    }
    love1();
    
    function love2() {
        var input_node = $('input[name="nm1"]');
        
        function createTagA(href, display) {
            return '<a target="_blank" href="' +
                href + '"><b>' + display + '</b></a>'
        }
        
        function createBaiduMapTagA(name) {
            return createTagA("http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D"
                              + name, "BAID");
        }
        
        function createGoogleMapTag(name) {
            return createTagA("https://maps.google.com/maps?hl=en&tab=wl&q="
                              + name, "GOOG");
        }
        
        // add Baidu map 
        input_node.parent().append(createBaiduMapTagA(input_node.val()));
        input_node.parent().append('&nbsp;');
        input_node.parent().append(createGoogleMapTag(input_node.val()));
        
        // auto copy to search
        var search_node = $('#searchTextField');
        search_node.val(search_node.val() + ' ' + input_node.val());
        
        // add translate
        $('input[name="nm6"]').parent().append(createTagA(
            'http://translate.google.co.kr/?hl=en#auto/en/' + input_node.val(),
                                               'Translate'
                                              ));
        
        // add Baidu map
        var part = $('input[name="cd_add"]').val();
        var addr_node = $('input[name="code_addr"]')
        addr_node.after(createGoogleMapTag(part + ' ' + addr_node.val()));
        addr_node.after('&nbsp;');
        addr_node.after(createBaiduMapTagA(part + ' ' + addr_node.val()));
        
        // uncheck
        $('input[name="xyz"]').attr('checked', false);
        
        // set select
        var s = $('select[name="mcnt"]');
        window.complete_work = s.val() == 3;
        s.val(3);
    }
    love2();
    
    
    
    function love3() {
        var city = "大连";
        console.log('love3');
        
        var lat = $('#lat');
        var lng = $('#lng');
        
        // add room for baidu
        var baidu_map = $('<div/>').attr('id', 'baidu_map')
        .width(500).height(500)
        .css('float', 'left');
        
        var baidu_result = $('<div/>').attr('id', 'baidu_result')
        .width(300).height(500)
        .css('overflow', 'hideen')
        .css('float', 'left');
        
        lat.parent().parent().after(
            $('<tr/>').append(
                $('<td/>').width(800).attr('colspan', 2)
                .append(baidu_map)
                .append(baidu_result)
            )
        );
        
        var bmap = new BMap.Map("baidu_map");
        bmap.addControl(new BMap.NavigationControl());
        bmap.centerAndZoom(new BMap.Point(116.404, 39.915), 10);
        bmap.enableScrollWheelZoom();
        window.bmap = bmap;
        
        var local = new BMap.LocalSearch(city, {
            renderOptions: {
                map: bmap,
                panel: "baidu_result",
                autoViewport: true,
                selectFirstResult: true
            },
            
            pageCapacity: 5,
            
            onSearchComplete: function(results){
                if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                    var s = [];
                    for (var i = 0; i < results.getCurrentNumPois(); i++) {
                        s.push(results.getPoi(i).title + ", xxx, " + results.getPoi(i).address);
                    }
                    //document.getElementById("log").innerHTML = s.join("<br />");
                    //console.log(results.getPoi(i));
                }
            },
            
            // Convert to Baidu -> Google.
            onInfoHtmlSet: function(poi) {
                var point = poi.point;
                var latdev = 1.0002012762190961772159526495686;
                var lngdev = 1.0000568461567492425578691530827;
                
                //map.setCenter(new google.maps.LatLng(point.lat, point.lng));
                console.log(poi);
                window.poi = poi;
                //console.log(html);
                
                // 1. get the 
                function BaiduToGoogle(p, callback) {
                    BMap.Convertor.translate(p, 2, callback);
                }
                
                function GuessGooglePoint(bPoint, guessed, callback) {
                    if (GuessGooglePoint.guessCount > 0) {
                        //console.log("Guess Processing... remain count " + GuessGooglePoint.guessCount);
                        BaiduToGoogle(guessed, function (result) {
                            //console.log("Retrived ...");
                            //console.log("original", bPoint);
                            //console.log("guessed", guessed);
                            //console.log("converted", result);
                            
                            var guess = new BMap.Point(
                                guessed.lng + bPoint.lng - result.lng,
                                guessed.lat + bPoint.lat - result.lat);
                            GuessGooglePoint.guessCount --;
                            GuessGooglePoint(bPoint, guess, callback);
                        });
                    }
                    else callback(guessed);
                }
                
                var baiduPoint = point;
                GuessGooglePoint.guessCount = 5;
                
                GuessGooglePoint(point, point, function (g) {
                    //console.log('Guess Completed!');
                    map.setCenter(new google.maps.LatLng(g.lat, g.lng));
                    map.setZoom(19);
                });
            }
        });
        
        // add baidu search
        var baiduSearchTag = $('<a/>')
        .attr('href', '#').attr('id', 'baiduSearchTagA').append('BAIDU');
        $('#searchTextField').after(baiduSearchTag);
        $('#baiduSearchTagA').live('click', function (e) {
            e.preventDefault();
            local.search($('#searchTextField').val());
            return false;
        });
        //$('#baiduSearchTagA').attr('onclick', 'console.log("hah")');
        
        // love4 is to automatic search the Google or Baidu Map.
        // 
        function love4() {};
        love4.searchName = $('input[name="cd_add"]').val() + ' ' + $('input[name="nm1"]').val();
        love4.google = function (next) {
            console.log("start love4 google");
            // 1. google
            // try the name of the company.
            // get the name.
            // google name = province + area + compayny name(without the quoat)
            // example.
            // company: KFC(xxxx road)
            // address: Guangdong Shenzhen Futian
            //          xxx road xxx xxx
            // google name = Guangdong Shenzhen Futian KFC.
            // search query 
            var service = new google.maps.places.AutocompleteService();
            var googleName = love4.searchName.replace(/\([^\)]*\)/g, "");
            service.getPredictions({input: googleName}, function (predictions, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK 
                    && predictions.length > 0
                    && predictions.length < 5) {
                    //console.log('Has predictions', predictions);
                    $('#searchTextField').val(googleName);
                    $('#searchTextField').focus();
                    // select first one.
                    
                    var pservice = new google.maps.places.PlacesService(map);
                    pservice.getDetails(predictions[0], function (place, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK) {
                            //console.log("Get detials", place);
                            if (place.geometry.viewport) {
                                map.fitBounds(place.geometry.viewport);
                            } else {
                                map.setCenter(place.geometry.location);
                                map.setZoom(18);
                            }
                        }
                    });
                } else {
                    next();
                }
            });
        };
        
        love4.baidu = function (next) {
            // 2. baidu
            console.log("start love4 baidu");
            local.search(love4.searchName);
            /*var autoSearch = new BMap.LocalSearch(city, {
            onSearchComplete: function(results) {
            // 
            if (autoSearch.getStatus() == BMAP_STATUS_SUCCESS) {
            const num = results.getNumPois();
            console.log("Auto search result number ", num);
            }
            }
            });
            */
            next();
        };
        
        love4.go = function () {
            love4.google(function () {
                love4.baidu(function () {});
            });
        };
        
        if (window.complete_work == false) {
            setTimeout(function () {
                love4.go();
            }, 1000);
        }
    }
    
    window.love3 = love3;
    window.loadAndExecute("http://developer.baidu.com/map/jsdemo/demo/convertor.js", function () {
        window.loadAndExecute("http://api.map.baidu.com/api?v=1.4&callback=love3", function () {
            
        });
    });
};

window.onload = loadAndExecute("https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js", work);
