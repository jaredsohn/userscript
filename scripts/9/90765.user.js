// ==UserScript==
// @name           GoogleMaps on GoogleCalendar
// @namespace      http://creazy.net/
// @include        https://www.google.com/calendar/*
// @version        1.0
// ==/UserScript==

(function () {

function _createMapPreview() {

    if ( document.getElementsByClassName && !document.getElementById('gm_map_preview') ) {
        var labels = document.getElementsByTagName('label');
        var addr   = '';
        for ( var i=0; i<labels.length; i++ ) {
            if ( labels[i].innerHTML == '場所' ) {
                addr = labels[i].parentNode.nextSibling.getElementsByTagName('input')[0].value;

                _AddEventListener(
                    labels[i].parentNode.nextSibling.getElementsByTagName('input')[0],
                    "blur",
                    function(e){
                        document.getElementById('gm_map_preview').src
                            = 'http://maps.google.co.jp/maps'
                            +'?q='+encodeURIComponent(this.value)
                            +'&iwloc=B&output=embed';
                    }
                );
                break;
            }
        }

        if ( addr ) {
            var obj = document.createElement('iframe');
            obj.id = 'gm_map_preview';
            obj.width = '250';
            obj.height = '250';
            obj.scrolling = 'no';
            obj.style.border = '0';
            obj.style.margin = '0';
            obj.src
                = 'http://maps.google.co.jp/maps'
                +'?q='+encodeURIComponent(addr)
                +'&iwloc=B&output=embed';

            document.getElementsByClassName('ep-gp')[0].insertBefore(
                obj,
                document.getElementsByClassName('ep-gp')[0].firstChild
            );
        }
    }

}

/* add eventLister for cross browser */
function _AddEventListener(e, type, fn) {
    if (e.addEventListener) {
        e.addEventListener(type, fn, false);
    }
    else {
        e.attachEvent('on' + type, function() {
            fn(window.event);
        });
    }
}

_AddEventListener(
    document.getElementById('calcontent'),
    "click",
    function(e){
            setTimeout(_createMapPreview,2000);
    }
);

}) ();