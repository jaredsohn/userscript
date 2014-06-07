// ==UserScript==
// @name           tv-seznam-csfd
// @namespace      tvs
// @include        http://tv.seznam.cz/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js

// @creator         TheTomCZ <thetom@char-t.com>
// ==/UserScript==

$(document).ready(function(){
	$("head").append("<style>.csfdLink{font-size:12px;color:darkred}</style>");
    initCSFD();
});

function initCSFD(){
    $(document).on("click","a[href^='/porad/']",function(){
		appendCSFD(0);
	});
}


function appendCSFD(counter){
	var header = $("#programme h1");
	if( counter==10 ){
		return;
	}
	if( !header.size() ){
		setTimeout(function(){appendCSFD(counter+1);},counter*100);
		return;
	}
	var name = header.text();
	var query = name.replace(/\ /g, "+");
	var query = query.replace(/\(/g, "+(");
	header.append(" <a target='_blank' class='csfdLink' href='http://www.csfd.cz/hledat/?q="+query+"'>csfd</a>");
}
