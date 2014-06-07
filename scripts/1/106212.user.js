// ==UserScript==
// @name	Grepolis Victim Finder Shortcut
// @namespace	http://userscripts.org/scripts/show/106212
// @description	This script show a shortcut on the left to the Grepolis Victim Finder page
// @include	*.grepolis.com/game/*
// @exclude	*.css
// @exclude	*.js
// ==/UserScript==


(function(){
    var ff = (typeof unsafeWindow !== 'undefined');
    var uW = ((ff) ? unsafeWindow : window), $ = uW.jQuery;

    var townId = parseInt(uW.Game.townId, 10);

    var url = "" + uW.location;
    var world = url.replace(/http:\/\/([^\.]*)\.grepolis.*/, "$1");

    var link = "http://drolez.com/software/grepolis/finder/"+world+"/index.php5?tid="+townId;
    var lielement = '<li><a target="_blank" href="' + link + '">* Victim Finder *</a></li>';
    $('#links ul').append(lielement);

})();
