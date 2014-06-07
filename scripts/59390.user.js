// ==UserScript==
// @name           Pistachio Scoop Streak Marker
// @description    Streakmarker v.9
// @include        http://*.forumwarz.com/klans/domination
// @include        http://forumwarz.com/klans/domination
// @include        http://*.forumwarz.com/bookmarks/by_type/forums
// @include        http://forumwarz.com/bookmarks/by_type/forums
// @include        http://*.forumwarz.com/bookmarks/community
// @include        http://forumwarz.com/bookmarks/community
// ==/UserScript==
    
    // Note: this is presumably one of Neona's wonder scripts 
    
    Ajax = unsafeWindow['Ajax'];
    $ = unsafeWindow['window'].$;
    $$ = unsafeWindow['window'].$$;
    
    var marker = document.createElement("img");
    marker.setAttribute("src","http://www.forumwarz.com/images/scoops/pistachio.png");
    
    
    function processStreak(text) {
    	var tables = $$('table.highlighting')
    	for (var table in tables) {
    		var forums = tables[table].getElementsByTagName('a');
    		var rtext = text.responseText.toLowerCase().replace(/[^a-z0-9]/g, " ");
    		for (var forum in forums) {
    			if(rtext.indexOf(forums[forum].innerHTML.toLowerCase().replace(/[^a-z0-9]/g, " ")) != -1) {
    				var tmp = marker.cloneNode(true);
    				//forums[forum].insertBefore(tmp);
    				forums[forum].appendChild(tmp);
    			}
    		}
    	}
    }
    function addMarkers() {
    	//new Ajax.Request('/bookmarks/streak', {asynchronous:true, evalScripts:false, onComplete:function(request) {processStreak(request)}});
    	GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.forumwarz.com/bookmarks/streak',
        onload: function(responseDetails) {
            processStreak(responseDetails);
        }
    	});
    }
    
    
    
    
    if (document.title.indexOf("Domination") != -1) {
    	window.addEventListener("load", function (e) {addMarkers();}, "false");
    } else {
    	addMarkers();
    }