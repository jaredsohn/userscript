// ==UserScript==

// @name           hood.de Bildervorschau

// @namespace      http://www.petoria.de

// @description    Zeigt in Trefferlisten die Bilder der Artikel an. Letztes Update: 2011-07-03

// @include        http://*.hood.de/*

// ==/UserScript==



var links = document.getElementsByTagName('a');



for ( var i = 0; i < links.length; i++ ) {

    if ( links[i].href.match(/javascript\:popupImage\(\'http\:\/\/www\.hood\.de\/img1\/thumbs\//) ) {

        var nr = links[i].href.split(",")[1].split(")")[0];

        var tmp = links[i].href.split("',")[0].split(".");

        var suffix = tmp[tmp.length - 1];

        links[i].firstChild.src = "http://www.hood.de/img1/full/"

                + nr.substring(0, nr.length - 4) + "/" + nr + "." + suffix;

        links[i].firstChild.removeAttribute("width");

        links[i].firstChild.removeAttribute("height");

        // javascript:newWindow('thumb.cfm?imageID=12418695','thumb','width=96,height=96')

        // http://www.hood.de/img/thumbs/1141/11418695.jpg

    }

}