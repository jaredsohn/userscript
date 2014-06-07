// ==UserScript==
// @name		AnkiWwebAdd
// @version		2014.04.06
// @description		Download videos from video sharing web sites.
// @author		sebaro
// @namespace		https://userscripts.org/users/ennio
// @downloadURL		http://userscripts.org/scripts/source/449486.user.js
// @icon		https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQWNh-oUuh-LfOEUAcicBrVuVWMRhyQdPTgmB0DR01ZcBz5p2LY
// @include		https://ankiweb.net/edit/
// @include		https://ankiweb.net/edit
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @grant		GM_xmlhttpRequest
// ==/UserScript==



(function() {

    console.log('0.0 beginning');
    // Don't run on frames or iframes
    if (window.top != window.self) return;
    //get element
	//$('.mitem3').text = 'sdfdf';
	var btnSave = $( ":button" );
    btnSave.text("Save(Alt+S)");
    btnSave.attr("accesskey","s");

})();
