// v3.0 
// Author: Patricia, LaZy allinace :)
// Script is absolutelly pasive and safe to use, (no extra queries to the ikariam server)

// ==UserScript==
// @name           CreaturesChat
// @namespace      CreaturesChat
// @description    CreaturesChat for C4A
// @include        http://s1.ikariam.*/index.php?view=diplomacyAdvisor*
// @include        http://s1.ikariam.*/index.php?action=Diplomacy*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

$(document).ready(function() {	

var source1 = "http://www5.shoutmix.com/?lazynation";
var source2 = "http://photomitic.com.122.seekdotnet.com/ikariam/getshout.aspx";

	/*--------- embed chat here ----------*/
	//clear:both;display:inline;float:left;margin:2px 0 0 18px;postion:relative;width:228px;
	var chatstring = '<div id="LaZyChat" class="dynamic" style="height:600px;"><iframe title="lazynation" src="' + 
                         source1 + 
                         '" width="100%" height="100%" frameborder="0" scrolling="auto">' +
  							 '</iframe></div>';
	$("#viewDiplomacyImperium").before(chatstring);   
        /*--------- embed chat here ----------*/
});
