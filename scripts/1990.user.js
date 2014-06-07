/*

Boston.com NECN Video - Direct Link

DESCRIPTION:

I don't like using those popup browser windows with embedded plugins to
play media files on web sites. This script takes care of that annoyance
for NECN (New England Cable News) videos on Boston.com.

Install the script, and then when you view a Boston.com page, you can now
right-click on a video link, copy to clipboard, and then paste into
Windows Media Player.

*/

// ==UserScript==
// @name          boston-dot-com-necn-video--direct-link
// @namespace     http://dunck.us/code/greasemonkey/
// @description   Makes NECN (New England Cable News) video <a> tags point directly to media instead of javascript url
// @include       http://www.boston.com/*
// @include       http://boston.com/*
// ==/UserScript==

(function() {

    /* *** I snarfed and mangled these functions from a scrip that was included in the boston.com media pages: */

        function getUrlForObjId(objID) {
            var objElement = document.getElementById(objID);
    
            var strQuery = 'ClipID1=' + objElement.getAttribute('ClipID') + '&';
            strQuery += 'h1=' + escape(objElement.getAttribute('headline')) + '&';
            strQuery += 'vt1=' + objElement.getAttribute('videoType') + '&';
            strQuery += 'at1=' + escape(objElement.getAttribute('adTag')) + '&';
            strQuery += 'd1=' + (
                    objElement.getAttribute('duration')!=''?
                    objElement.getAttribute('duration'):
                    '0'
                ) + '&';
            strQuery += (
                    objElement.getAttribute('launchPageAdTag')!='' ?
                    'LaunchPageAdTag=' + objElement.getAttribute('launchPageAdTag'):
                    ''
                );	
            strQuery += '&activePane=info'; 
    
            var hostDomain = objElement.getAttribute('hostDomain')!='' ? objElement.getAttribute('hostDomain'): '';
    
            return getNativeUrl(strQuery, hostDomain);
        }
        function getNativeUrl(query, hostDomain) {
            return 'http://' + hostDomain + '/global/video/WorldNowASX.asp?playerType=native&' + query;
        }
    
    /* *** */

    // sample link we want to rewrite:
    //    javascript:playVideoClip('plV556598')

    var re = /^javascript:playVideoClip\('(.*)'\)$/;
    var anchors = document.getElementsByTagName("A");
    for(var i = 0; i < anchors.length; i++) {
        var anchor = anchors[i];
        var results = null;
        if(anchor.href) results = re.exec(anchor.href);
        if(results) {
            anchor.href = getUrlForObjId(results[1]);
        }
    }

})();
