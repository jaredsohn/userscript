// ==UserScript==
// @name			 My First Script 
// @description		Alerts Hello   
// @include			http://facebook.com/messages/
// @author			sarathonline (http://userscripts.org/users/****) 
// @license			GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @version			1.0
// ==/UserScript==

(function(d){
	var js, id = 'google-jquery', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = false;
	js.src = "//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"; 
	ref.parentNode.insertBefore(js, ref);
		loadJquery();
}(document));

$(function(){
	console.log('ready;');
});