// ==UserScript==
// @name           blocket_visavar_tooltip
// @namespace      http://www.edholm.com/grease
// @description    Skapar postnummer (och ort) som tooltip på "Visa var"
// @include        http://www.blocket.se/*
// @version        2011-07-17 12:51
// ==/UserScript==

/*  =====================================================================

    Copyright 2010  Jan Edholm

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

    ===================================================================== */

// ---------------------------------------------------------
// Any problems with character encoding? Please report them!
// ---------------------------------------------------------

(function doIt() {
    var elm, url, where, postcode, city;

    if (window.top != window.self)  //don't run on frames or iframes
    {
        // GM_log('Script running in frame');
        return;
    }

    // Get "Visa var" <span> element having class: 'adparam_map_link'
    elm = document.getElementsByClassName('adparam_map_link');
    if (!elm || elm.length < 1) 
        return;

    elm = elm[0];           // Found at least one "Visa var" element, use first one!
    elm.id = "aDdCiTy";	    // Set object id for this element (for ajax call)
    // Span link can be:
    //   1: "SearchPlace.aspx...TextBoxWhere=" "[Address+][City+]Postcode[&...]"
    //   2: "SearchPlace.aspx...TextBoxWhere=" "Address[+City][&...]"
    //   3: "MapPage.aspx... coord ...&name="  "Address"
    // 
    url = unescape(decodeURI(elm.innerHTML.split('"')[1]));

    if (url.match(/TextBoxWhere=/)) {                           // Alt 1-2
        where = url.split("TextBoxWhere=")[1].split("&")[0];
        while (where.search(/\+/) > -1) {
            where = where.replace(/\+/," ");
        }
        postcode = parseInt(where.substr(where.length - 5));
        if (postcode >= 10000 && postcode <= 99999) {
            var details = {
                method: 'GET',
                url: 'http://www.postnummerservice.se/pnrguide/index.php?postnummer=' + postcode + '&search=1',
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Accept': 'text',
                },
                onreadystatechange: function onreadystatechangeCB(responseDetails) {
                    if (responseDetails.readyState==4 && responseDetails.status==200) {
                        if (responseDetails.responseText.length > 0) {
                            city = responseDetails.responseText.match(/\<td\ class=\"postort\"\>([^\<]*)\<\/td\>/);
                            city = city[1] ? city[1] : "";
                            document.getElementById("aDdCiTy").title = 
                                document.getElementById("aDdCiTy").title.replace(/\.\.\./, city);
                        } 
                    }
                }
            };
            GM_xmlhttpRequest(details);
        }
        elm.title = where + " ...";
    } else if (url.match(/&amp;name=/)) {                       // Alt 3
        elm.title = "Koordinat...";
        // Change map zoom level to 5 instead of 7...
        elm.innerHTML = elm.innerHTML.replace(/&amp;z=7/,"&amp;z=5");
    }
}());

