// ==UserScript==
// @name	GoogleToKarttapaikka
// @include	http://www.geocaching.com/seek/cache_details.aspx?*
// @include	http://www.geocaching.com/seek/cdpf.aspx?*
// @include	http://www.geocaching.com/geocache/*
// @version     1.3
// ==/UserScript==
// 1c
// http://userscripts.org/scripts/review/9696
// (c) Teemu 2013
//
/** SETTINGS **/
var mode = 'rasta'; //rasta tai orto
//var scale = 16000; //2000,4000,8000,16000...
/**************/

var largeMap_id = 'uxlrgMap';
var mapx = 600;
var mapy = 600;
var avail_res = [2000, 1000, 500, 200, 100, 50, 20, 10, 4, 2, 1, 0.5];
var min_res = 2;

var jq, lat, lng;

function GeogToUTM(clat, clon, zone) {
    //Convert Latitude and Longitude to UTM
    DatumEqRad = [6378137.0, 6378137.0, 6378137.0, 6378135.0, 6378160.0, 6378245.0, 6378206.4, 6378388.0, 6378388.0, 6378249.1, 6378206.4, 6377563.4, 6377397.2, 6377276.3];
    DatumFlat = [298.2572236, 298.2572236, 298.2572215, 298.2597208, 298.2497323, 298.2997381, 294.9786982, 296.9993621, 296.9993621, 293.4660167, 294.9786982, 299.3247788, 299.1527052, 300.8021499];
    Item = 0; //Default
    k0 = 0.9996; //scale on central meridian
    a = DatumEqRad[Item]; //equatorial radius, meters. 
    f = 1 / DatumFlat[Item]; //polar flattening.
    b = a * (1 - f); //polar axis.
    e = Math.sqrt(1 - b * b / a * a); //eccentricity
    drad = Math.PI / 180; //Convert degrees to radians)
    latd = 0; //latitude in degrees
    phi = 0; //latitude (north +, south -), but uses phi in reference
    e0 = e / Math.sqrt(1 - e * e); //e prime in reference
    N = a / Math.sqrt(1 - Math.pow(e * Math.sin(phi)), 2);
    T = Math.pow(Math.tan(phi), 2);
    C = Math.pow(e * Math.cos(phi), 2);
    lng = 0; //Longitude (e = +, w = -) - can't use long - reserved word
    lng0 = 0; //longitude of central meridian
    lngd = 0; //longitude in degrees
    M = 0; //M requires calculation
    x = 0; //x coordinate
    y = 0; //y coordinate
    k = 1; //local scale
    utmz = 30; //utm zone
    zcm = 0; //zone central meridian
    DigraphLetrsE = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    DigraphLetrsN = "ABCDEFGHJKLMNPQRSTUV";
    OOZok = false;

    k0 = 0.9996; //scale on central meridian
    b = a * (1 - f); //polar axis.
    //alert(a+"   "+b);
    //alert(1-(b/a)*(b/a));
    e = Math.sqrt(1 - (b / a) * (b / a)); //eccentricity
    //alert(e);
    //Input Geographic Coordinates
    //Decimal Degree Option
    latd = parseFloat(clat);
    lngd = parseFloat(clon);

    phi = latd * drad; //Convert latitude to radians
    lng = lngd * drad; //Convert longitude to radians
    utmz = zone;


    zcm = 3 + 6 * (utmz - 1) - 180; //Central meridian of zone
    //alert(utmz + "   " + zcm);
    //Calculate Intermediate Terms
    e0 = e / Math.sqrt(1 - e * e); //Called e prime in reference
    esq = (1 - (b / a) * (b / a)); //e squared for use in expansions
    e0sq = e * e / (1 - e * e); // e0 squared - always even powers
    //alert(esq+"   "+e0sq)
    N = a / Math.sqrt(1 - Math.pow(e * Math.sin(phi), 2));
    //alert(1-Math.pow(e*Math.sin(phi),2));
    //alert("N=  "+N);
    T = Math.pow(Math.tan(phi), 2);
    //alert("T=  "+T);
    C = e0sq * Math.pow(Math.cos(phi), 2);
    //alert("C=  "+C);
    A = (lngd - zcm) * drad * Math.cos(phi);
    //alert("A=  "+A);
    //Calculate M
    M = phi * (1 - esq * (1 / 4 + esq * (3 / 64 + 5 * esq / 256)));
    M = M - Math.sin(2 * phi) * (esq * (3 / 8 + esq * (3 / 32 + 45 * esq / 1024)));
    M = M + Math.sin(4 * phi) * (esq * esq * (15 / 256 + esq * 45 / 1024));
    M = M - Math.sin(6 * phi) * (esq * esq * esq * (35 / 3072));
    M = M * a; //Arc length along standard meridian
    //alert(a*(1 - esq*(1/4 + esq*(3/64 + 5*esq/256))));
    //alert(a*(esq*(3/8 + esq*(3/32 + 45*esq/1024))));
    //alert(a*(esq*esq*(15/256 + esq*45/1024)));
    //alert(a*esq*esq*esq*(35/3072));
    //alert(M);
    M0 = 0; //M0 is M for some origin latitude other than zero. Not needed for standard UTM
    //alert("M    ="+M);
    //Calculate UTM Values
    x = k0 * N * A * (1 + A * A * ((1 - T + C) / 6 + A * A * (5 - 18 * T + T * T + 72 * C - 58 * e0sq) / 120)); //Easting relative to CM
    x = x + 500000; //Easting standard 
    y = k0 * (M - M0 + N * Math.tan(phi) * (A * A * (1 / 2 + A * A * ((5 - T + 9 * C + 4 * C * C) / 24 + A * A * (61 - 58 * T + T * T + 600 * C - 330 * e0sq) / 720)))); //Northing from equator
    yg = y + 10000000; //yg = y global, from S. Pole
    if (y < 0) {
        y = 10000000 + y;
    }

    return [x, y];

}

function trim(str, charlist) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: mdsjack (http://www.mdsjack.bo.it)
    // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
    // +      input by: Erkekjetter
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: DxGx
    // +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // *     example 1: trim('    Kevin van Zonneveld    ');
    // *     returns 1: 'Kevin van Zonneveld'
    // *     example 2: trim('Hello World', 'Hdle');
    // *     returns 2: 'o Wor'
    // *     example 3: trim(16, 1);
    // *     returns 3: 6
    var whitespace, l = 0,
        i = 0;
    str += '';

    if (!charlist) {
        // default list
        whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
    } else {
        // preg_quote custom list
        charlist += '';
        whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
    }

    l = str.length;
    for (i = 0; i < l; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
    }

    l = str.length;
    for (i = l - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
    }

    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}


var colors = {
    'cache': '#FF00EE',
    'wpt': '#0000FF'
}

var getCoordinates = function (page) {
        if (page != 'wpt') {
            if (navigator.appName.indexOf('Opera') == -1) {
                lat = unsafeWindow.lat;
                lng = unsafeWindow.lng;
                jq = unsafeWindow.jQuery;
            } else {
                jq = jQuery;
            }
        }

        coords = [];

        coords.push({
            'type': 'cache',
            'lat': lat,
            'lon': lng,
            'txt': jq('#ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode').text()
        });

        if (page == 'cdpf') {
            coords[0]['txt'] = trim(jq('div[class="HalfRight AlignRight"] > h1').text());
        }

        switch (page) {
        case 'details':
            wpt_rows = jq('#ctl00_ContentBody_Waypoints').find('tbody > tr');
            break;
        case 'cdpf':
            wpt_rows = jq('#Waypoints').find('tbody > tr');
            break;
        default:
            wpt_rows = jq('#ctl00_ContentBody_Waypoints').find('tbody > tr');
            break;
        }

        var wptregexp = /N ([\d]{2,3})([\s\S]{2})([\d.]{6}) E ([\d]{2,3})([\s\S]{2})([\d.]{6})/;

        for (i = 0; i < wpt_rows.length; i = i + 2) {
            cols = jq(wpt_rows[i]).find('td');
            prcol = null;
            var z = 0;
            jq(cols).each(function (k, c) {
                if (jq(c).find('span[id*="awpt_"]').length != 0) {
                    return false;
                }
                z++;
            });

            txt = trim(jq(cols[z]).text()) + ' ' + trim(jq(cols[z + 1]).text());
            crds = trim(jq(cols[z + 3]).text());


            var cparts = wptregexp.exec(crds);
            if (cparts == null) continue;
            wptlat = parseInt(cparts[1], 10) + (parseFloat(cparts[3]) / 60);
            wptlon = parseInt(cparts[4], 10) + (parseFloat(cparts[6]) / 60);
            coords.push({
                'type': 'wpt',
                'lat': wptlat,
                'lon': wptlon,
                'txt': txt
            });


        }

        for (i in coords) {
            xy = GeogToUTM(coords[i]['lat'], coords[i]['lon'], 35);
            coords[i]['x'] = xy[0];
            coords[i]['y'] = xy[1];
        }
        return coords;
    }

var insertNLSmaps = function (page) {
        
        var coords = getCoordinates(page);
        var bounds = [null, null, null, null];

        for (i in coords) {
            if (coords[i]['x'] < bounds[0] || bounds[0] == null) bounds[0] = coords[i]['x'];
            if (coords[i]['y'] < bounds[1] || bounds[1] == null) bounds[1] = coords[i]['y'];
            if (coords[i]['x'] > bounds[2] || bounds[2] == null) bounds[2] = coords[i]['x'];
            if (coords[i]['y'] > bounds[3] || bounds[3] == null) bounds[3] = coords[i]['y'];
        }



        if (page == 'details' && jq("a:contains('Karttapaikka')").length < 1) return false;
        else if (page != 'details') {
            if (bounds[0] < 216441 || bounds[3] > 7782848 || bounds[2] > 756852 || bounds[1] < 6638997) return false;
        }

        xres = (bounds[2] - bounds[0]) / mapx;
        yres = (bounds[3] - bounds[1]) / mapy;

        if (xres < min_res && yres < min_res) res = min_res;
        else res = Math.max(xres, yres);

        nearest_res = [null, null];
        for (i in avail_res) {
            if (avail_res[i] - res < 0) continue;
            if (nearest_res[0] == null || Math.abs(avail_res[i] - res) < nearest_res[0]) nearest_res = [Math.abs(avail_res[i] - res), avail_res[i]];
            if (Math.abs(avail_res[i] - res) == 0) {
                nearest_res = [Math.abs(avail_res[i] - res), avail_res[i]];
                break;
            }
        }
        
        mapres = nearest_res[1];

        dx = parseInt(mapres) * parseInt(mapx) / 2;
        dy = parseInt(mapres) * parseInt(mapy) / 2;

        center = [parseInt(Math.round((bounds[0] + bounds[2]) / 2.0)), parseInt(Math.round((bounds[1] + bounds[3]) / 2.0))];
      
        if (page == 'details') {
          jq('#ctl00_ContentBody_MapLinks_MapLinks').append('<li><a href="http://www.paikkatietoikkuna.fi/web/fi/kartta?zoomLevel=9&coord=' + coords[0]['x'] + '_' + coords[0]['y'] + '&mapLayers=base_2+100+!default!&showMarker=true&forceCache=true">Paikkatietoikkuna.fi</a></li>');
        }
        ll = [center[0] - dx, center[1] - dy];
        ru = [center[0] + dx, center[1] + dy];

        scale = mapres * 4000;

        kpurl = 'http://kansalaisen.karttapaikka.fi/image?request=GetMap&bbox=' + ll[0] + ',' + ll[1] + ',' + ru[0] + ',' + ru[1] + '&scale=' + scale + '&width=' + mapx + '&height=' + mapy + '&srs=EPSG:3067&styles=normal&lang=fi&mode=' + mode;

        mdiv = jq('<div>').css({
            'width': mapx,
            'height': mapy,
            'border': '2px solid black'
        });

        jqwptlayer = jq('<img>').attr('width', mapx).attr('height', mapy).css({
            'z-index': 999,
            'position': 'absolute'
        });
        
        
        mdiv.append(jq('<div>').css('position', 'relative').append(jq('<img>').attr('src', kpurl).css({
            'position': 'absolute'
        })));
        mdiv.append(jq('<div>').css('position', 'relative').append(jq('<a href="' + jq('#ctl00_ContentBody_MapLinks_MapLinks a[href*="karttapaikka"]').attr('href') + '">').attr('target', '_blank').append(jqwptlayer)));
        
        
        
        if (page == 'details') jq('#' + largeMap_id).html(mdiv);
        else if (page == 'cdpf') jq('#map').parent().parent().html(mdiv);
        
        
        
        var canvas = jq('<canvas>').attr('width', mapx).attr('height', mapy).get(0);

        var context = canvas.getContext('2d');

        for (i = coords.length - 1; i >= 0; i--) {
            cx = coords[i]['x'];
            cy = coords[i]['y'];

            px = parseInt(Math.round((cx - ll[0]) / mapres));
            py = parseInt(Math.round(mapy - (cy - ll[1]) / mapres));

            context.strokeStyle = "#000000";
            context.lineWidth = 2;
            context.fillStyle = colors[coords[i]['type']];
            context.beginPath();
            context.arc(px, py - 2, 4, 0, Math.PI * 2, true);
            context.closePath();
            context.stroke();
            context.fill();

            meas = context.measureText(coords[i]['txt']);
            context.fillStyle = '#FFFFFF';
            context.fillRect(px + 6, py - 10, meas.width + 4, 12);

            context.fillStyle = '#000000';
            context.fillText(coords[i]['txt'], px + 8, py);


        }
        
        //alert(canvas.toDataURL());
        jqwptlayer.attr('src', canvas.toDataURL());

        //alert( + '\n' + (bounds[3]-bounds[1]));
    }


if (window.location.href.search('WID=') != -1) {
    window.addEventListener("load", function() {insertNLSmaps('wpt')});
} else if (window.location.href.search('cdpf') != -1) {
    window.addEventListener("load", function() {insertNLSmaps('cdpf')});
} else {
    window.addEventListener("load", function() {insertNLSmaps('details');});
}