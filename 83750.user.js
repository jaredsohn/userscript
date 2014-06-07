// ==UserScript==
// @name           Weewar Reesize 1.2
// @description    Resize the human to weewar interface, to a proper width :D
// @author	   timonator (http://userscripts.org/users/93971)
// @namespace      http://userscripts.org/scripts/show/83750
// @include        http://weewar.com/*
// ==/UserScript==
//////////////////////////////////////////////////////////////////
// Settings //////////////////////////////////////////////////////
// Enable with (*), otherwise leave blank
var fixUglyUserLink = "*";
var eliminateFacebookLink = "";
var enableResizing ="*";
// Settings end //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Do not edit the code below, if you´r not sure, what you do ! //
//////////////////////////////////////////////////////////////////
	if (enableResizing == "*"){		
		var reesize1 = 0,
		  div,
		  div1 = document.getElementsByClassName("container_16");
		while (div = div1[reesize1++]){
		  div.style.width = "100%";
		}
		var reesize2 = 0,
		  div,
		  div2 = document.getElementsByClassName("grid_16");
		while (div = div2[reesize2++]){
		  div.style.width = "99%";
		}
		var reesize3 = 0,
		  div,
		  div3 = document.getElementsByClassName("grid_12");
		while (div = div3[reesize3++]){
		  div.style.width = "74%";
		}
		var reesize4 = 0,
		  div,
		  div4 = document.getElementsByClassName("grid_4");
		while (div = div4[reesize4++] ){
		  div.style.width = "20%";
		}
		var reesize5 = 0,
		  div,
		  div5 = document.getElementsByClassName("grid_12 alpha omega");
		while (div = div5[reesize5++]){
		  div.style.width = "100%";
		}
// Taken from http://userscripts.org/scripts/show/62262 please don´t beat me ;)
		document.getElementById('wrap').style.width = "99%";
		document.getElementById('wrap').style.marginLeft = "auto";
		document.getElementById('wrap').style.marginRight = "auto";

		if (document.getElementById('editor_controls')) {
    		document.getElementById('editor_controls').parentNode.attributes.removeNamedItem('class');
		}
		if (document.getElementById('playing_field_flash')) {
  			document.getElementById('playing_field_flash').style.width = "100%";
  			document.getElementById('playing_field_flash').style.marginLeft = "0px";
  			document.getElementById('playing_field_flash').style.marginRight = "0px";
		}
	}
	else {
		null;
	}
// Remove the Facebook link if not needed
	if (eliminateFacebookLink == "*"){
		var facebookLink = document.getElementById('facebookLink');
		facebookLink.parentNode.removeChild(facebookLink);
	}
// Ad space above and below the "user website link"
	if (fixUglyUserLink == "*"){
		document.getElementById('profile_url').style.padding = '20px 0px 40px 0px';
	}

// Clear all variables
	div = div1 = div2 = div3 = div4 = div5 = reesize1 = reesize2 = reesize3 = reesize4 = reesize5 = fixUglyUserLink = eliminateFacebookLink = facebookLink = null;