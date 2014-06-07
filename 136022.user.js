// ==UserScript==
// @name         RunKeeperRaceSimpleMapTools
// @description  Add GPX import and clear buttons to edit race page
// @id           me.4ndrew.RunKeeperRaceMapTools
// @version      1.1
// @author       nopox
// @homepageURL  http://userscripts.org/scripts/show/136022
// @supportURL   http://userscripts.org/scripts/discuss/136022
// @updateURL    http://userscripts.org/scripts/source/136022.meta.js
// @include      http://runkeeper.com/edit/race*
// ==/UserScript==

(function() {
    var unsafeWin = (function(){
        var a;
        try {
            a = unsafeWindow === window ? false : unsafeWindow;
        } finally {
            return a || (function(){
                var e = document.createElement('p');
                e.setAttribute('onclick', 'return window;');
                return e.onclick();
            }());
        }
    }());

    var htmlButtons = [];
    htmlButtons.push('<div id="gpxTools">');
    if (window.File && window.FileReader /*&& window.FileList && window.Blob*/) {
        // Include FileReader support ...
        htmlButtons.push('<div class="inputContainer" style="width: 100%"><input id="gpxFileSelect" type="file"/></div>');
    }
    htmlButtons.push('<input id="gpxImport" type="button" value="GPX Input"/>');
    htmlButtons.push('<input id="gpxClear" type="button" value="Clear"/>');
    htmlButtons.push('</div>');
    htmlButtons = htmlButtons.join('\n');

    $ = unsafeWin.$;
    function parseGPX(gpxContentString) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(gpxContentString, 'text/xml');
        var trackPoints = xmlDoc.getElementsByTagName('trkpt');
        for (var i = 0; i < trackPoints.length; i++) {
            var el = trackPoints.item(i);
            var lat = el.attributes['lat'].value;
            var lon = el.attributes['lon'].value;
            var myFakeEvent = new Object();
            myFakeEvent.latLng = new unsafeWin.google.maps.LatLng(lat, lon);
            unsafeWin.mapController.addFixedPoint(myFakeEvent);
        }
    }


    if(unsafeWin.mapController) {
        $('#raceMapLabel').after(htmlButtons);
        $('.filename').width(10);
        $('.action').width(10);

        $('#gpxFileSelect').change(function(evt) {
            if (evt.target.files.length > 0) {
                var f = evt.target.files[0];
                var fileReader = new FileReader();
                fileReader.onloadend = function(frEvt) {
                    if (frEvt.target.readyState == FileReader.DONE) {
                        parseGPX(frEvt.target.result);
                    }
                };
                fileReader.readAsText(f);
                document.getElementById('gpxFileSelect').innerHTML =
                    document.getElementById('gpxFileSelect').innerHTML;
            }
        });

        $('#gpxImport').click(function() {
            var gpxContent = prompt('Paste GPX file content', '');
            if (gpxContent != null && gpxContent.length > 0) {
                parseGPX(gpxContent);
            }
        });
        
        $('#gpxClear').click(function() {
            if (confirm('Are you sure?')) {
                unsafeWin.mapController.model.initialPoints = [];
                unsafeWin.mapController.reset();
            }
        });
    }
})();