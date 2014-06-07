// ==UserScript==
// @name           Google Maps for Wikipedia
// @namespace      http://endflow.net/
// @description    Embed Google Maps to the sidebar section of Wikipedia
// @include        http://*.wikipedia.org/w*/*
// @include        https://secure.wikimedia.org/wikipedia/*/w*/*
// @version        0.1.0
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2011.10.12] 0.1.0 first version

(function(){

var trim = function(str){
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

var convert = function(deg, min, sec){
    return deg + (60.0 * min + sec) / 3600.0;
}

var FINDERS = [function(){
    // microformats (geo)
    var tag = $x('//*[@class="geo"]');
    if(tag && tag.length){
        var tokens = tag[0].innerHTML.split(';');
        return {lat: parseFloat(trim(tokens[0])), lng: parseFloat(trim(tokens[1]))};
    }

    // search
    var PAIR_RE = [/北緯(\d+)度(\d+)分([\d\.]+)秒 東経(\d+)度(\d+)分([\d\.]+)秒/, /([\d\.]+)°N ([\d\.]+)°E/];
    var LAT_RE = [/北緯(\d+)度(\d+)分([\d\.]+)秒/, /(\d+)°(\d+)′(\d+)″N/, /([\d\.]+)°N/];
    var LNG_RE = [/東経(\d+)度(\d+)分([\d\.]+)秒/, /(\d+)°(\d+)′(\d+)″E/, /([\d\.]+)°E/];
    var span = document.getElementById('coordinates');
    if(span){
        var text = span.innerHTML;

        // try to match pair
        while(PAIR_RE.length){
            var re = PAIR_RE.shift(),
                m = re.exec(text);
            if(m){
                if(m.length === 7){
                    return {lat: convert(parseInt(m[1]), parseInt(m[2]), parseFloat(m[3])),
                            lng: convert(parseInt(m[4]), parseInt(m[5]), parseFloat(m[6]))}
                }else if(m.length === 3){
                    return {lat: parseFloat(m[1]), lng: parseFloat(m[2])}
                }
            }
        }

        // try to match indivisuals
        while(LAT_RE.length && LNG_RE.length){
            var lat_re = LAT_RE.shift(),
                lat_m = lat_re.exec(text),
                lng_re = LNG_RE.shift(),
                lng_m = lng_re.exec(text);
            if(lat_m && lng_m){
                if(m.length === 4){
                    return {lat: convert(parseInt(lat_m[1]), parseInt(lat_m[2]), parseFloat(lat_m[3])),
                            lng: convert(parseInt(lng_m[1]), parseInt(lng_m[2]), parseFloat(lng_m[3]))}
                }else if(m.length === 2){
                    return {lat: parseFloat(lat_m[1]), lng: parseFloat(lng_m[1])}
                }
            }
        }
    }

    return null;
}];

var EMBEDDERS = [function(){
    // header
    var tbody = $x('//table[contains(concat(" ", @class, " "), " infobox ") or contains(concat(" ", @class, " "), " toccolours ")]/tbody')[0];
    if(!tbody){return false;}
    var header = document.createElement('tr');
    header.innerHTML = '<th id="gm4w_head" colspan="2" scope="col">Location</th>';
    tbody.appendChild(header);

    // map container
    var cont = document.createElement('tr');
    cont.innerHTML = '<td colspan="2"><div id="gm4w_map" style="height:200px;"></div></td>';
    tbody.appendChild(cont);

    return true;
}];

var STYLERS = [function(){
    // find styled header in table
    var headers = $x('//table[contains(concat(" ", @class, " "), " infobox " or contains(concat(" ", @class, " "), " toccolours "))]/tbody/tr/th[@style and @colspan="2"]');
    if(!headers.length){return false;}

    // header
    var head = document.getElementById('gm4w_head');
    head.setAttribute('style', headers.pop().getAttribute('style'));

    return true;
}];

var script = document.createElement('script');
script.setAttribute('id', 'gm4w_script');
script.setAttribute('src', 'http://maps.googleapis.com/maps/api/js?sensor=false&callback=init');
script.setAttribute('type', 'text/javascript');
document.head.appendChild(script);

unsafeWindow.init = function(){
    // find location data
    var loc = null;
    while(FINDERS.length){
        loc = FINDERS.shift()();
        if(loc){break;}
    }

    if(!loc){return;}

    // find place to insert
    var embedded = false;
    while(EMBEDDERS.length){
        embedded = EMBEDDERS.shift()();
        if(embedded === true){break;}
    }

    if(embedded !== true){return;}

    // apply style
    while(STYLERS.length){
        if(STYLERS.shift()() === true){break;}
    }

    // embed Google Maps
    var google = unsafeWindow.google;
    var latlng = new google.maps.LatLng(loc.lat, loc.lng);
    var params = {
        zoom: 14,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('gm4w_map'), params);
}

function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}

})();
