// ==UserScript==
// @name       mrtzcmp3 bitrate
// @version    0.4
// @description  shows bitrate in resultslist
// @match      http://mrtzcmp3.net/*
// @copyright  2013, Hooddominator
// ==/UserScript==

var load,execute,loadAndExecute;
load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
loadAndExecute("//code.jquery.com/jquery-1.7.2.min.js", function() {
	// add bitratecheckbox if not exists
    if ($('input:checkbox').length < 1) {$("#q").after("<input type=\"checkbox\" name=\"bitrate\"  value=\"1\"/>");}
    // click bitratecheckbox
    $( "input:checkbox" ).attr("checked", true);
    // click each bitratebutton
	$( "span[id^=\"bitrate_\"] a:first-child" ).each(function( index ) {
		$(this).click();
	});
    
});