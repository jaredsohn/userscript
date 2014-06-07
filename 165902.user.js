// ==UserScript==
// @name       Meneame personal assistant
// @namespace  http://cuelgame.net
// @author     @dsmatilla
// @version    1.3.8
// @description  Menú con varias funcionalidades para mejorar la experiencia de usuario en meneame.net
// @include      http://*.meneame.net/*
// @copyright  2013 Este script está protegido por la GFYL 1.00
//	The Go Fuck Yourself Public License, version 1.00
//
//	Article 1
//	You can go fuck yourself.
//
//	END OF ALL TERMS AND CONDITIONS
// ==/UserScript==

function mhMenu() { // Build HTML structure
	// Set div attributes
	var button, div, html, chkd, x, i;


	
	// Menu title to open/close
	button = document.createElement("div");
	button.setAttribute("id", "mh_button");
	button.className = "mh_button";
	button.style.display = "block";
	button.style.border = "0";
	button.style.position = "absolute";
	button.style.top = "0";
	button.style.right = "300px";
	button.style.height = "17px";
	button.style.padding = "4px";
	html = "<a id='mh_close' style='color: white; text-decoration: none;'>MNM Personal Assistant</a>";
	button.innerHTML = html;
	document.getElementById('header-top').appendChild(button);
	document.getElementById("mh_close").addEventListener("click", mhSwitchVisibility, true);
	
	
	
	
	// Menu
	div = document.createElement("div");
	div.setAttribute("id", "mh_menu");
	div.className = "mh_menu";
	div.style.display = "block";
	div.style.border = "0";
	div.style.position = "fixed";
	div.style.top = "120px";
	div.style.right = "20px";

	// Create inner html
	html = "";
	html += "<fieldset>";
	html += "<label>MNM Personal Assistant</label>";
	html += "<form id='mhForm'>"; 

	// Switch position
	if(GM_getValue('mh_switchposition')) { chkd="checked"; } else { chkd=""; }
		html += "<br /><input type='checkbox' id='mh_switchposition' " + chkd + "/> Switch position"; 

	// Hide blank
	if(GM_getValue('mh_hideblank')) { chkd="checked"; } else { chkd=""; }
		html += "<br /><input type='checkbox' id='mh_hideblank' " + chkd + "/> Hide blank comments";

	// Fixed top bar
	if(GM_getValue('mh_fixedtopbar')) { chkd="checked"; } else { chkd=""; }
		html += "<br /><input type='checkbox' id='mh_fixedtopbar' " + chkd + "/> Fixed top bar";

	// Neutral mode
	if(GM_getValue('mh_neutralmode')) { chkd="checked"; } else { chkd=""; }
		html += "<br /><input type='checkbox' id='mh_neutralmode' " + chkd + "/> Neutral mode"; 
    
	// Disable rounded avatars
	if(GM_getValue('mh_roundedavatars')) { chkd="checked"; } else { chkd=""; }
		html += "<br /><input type='checkbox' id='mh_roundedavatars' " + chkd + "/> Disable rounded avatars"; 

	html += "</form>";
	html += "<br /><span style='float:right; font-size: 0.7em;'>Bugs & Suggestions - <a href='http://meneame.net/user/RickDeckard'>@RickDeckard</a></span>";
	html += "<br /><span style='float:right; font-size: 0.7em;'><a target='_blank' href='http://twitter.com/dsmatilla'>@dsmatilla</a></span>";    
	html += "</fieldset>";

	// Display div
	div.innerHTML = html;
	document.body.appendChild(div);
    
	// Add listener to each checkbox in mhForm
	x=document.getElementById("mhForm");
	for (i=0;i<x.length;i++) {
		x.elements[i].addEventListener("click", mhActions, true);
	}
   
   
   
	// Smiley bar
	/*html = ""; AUN EN DESARROLLO
	html += "<table>";
	html += "<tr>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/smiley.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/wink.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/cheesy.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/grin.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/angry.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/sad.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/shocked.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/cool.gif'></td>";  
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/huh.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/rolleyes.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/tongue.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/embarassed.gif'></td>";    // oops
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/lipsrsealed.gif'></td>"; // lipssealed
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/undecided.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/kiss.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/cry.gif'></td>";    
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/laugh.gif'></td>"; // lol
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/confused.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/blank.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/palm.gif'></td>";   
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/wow.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/shame.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/fu.gif'></td>"; // ffu
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/goat.gif'></td>";   // goatse
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/wall.gif'></td>";   
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/trollface2.gif'></td>"; // trollface
	html += "<td style='width: 60px; height: 30px; text-align: center;' colspan='2'><img src='http://mnmstatic.net/img/smileys/hug.gif'></td>";
	html += "<td style='width: 30px; height: 30px; text-align: center;'><img src='http://mnmstatic.net/img/smileys/shit.gif'></td>";    // shift
	html += "</tr>";
	html += "</table>"; 
	if(document.getElementById("comment")) 
		document.getElementById("comment").insertAdjacentHTML('beforebegin', html);*/


}

function mhActions() { // Perform actions
	var i, com, x;
    
	// Save form values
	x=document.getElementById('mhForm');
	for (i=0;i<x.length;i++) {
		GM_setValue(x.elements[i].id, x.elements[i].checked);
	}
    
	// Menu visibility
	document.getElementById('mh_menu').style.display = GM_getValue('mh_menu_display');

	// Switch menu position
	if(GM_getValue('mh_switchposition')) {
		com = document.getElementById("mh_menu");
		com.style.left = '';
		com.style.right = '20px';
	} else {
		com = document.getElementById("mh_menu");
		com.style.right = '';
		com.style.left = '20px';
	}
	
	// Hide blank
	if(GM_getValue('mh_hideblank')) {
		com = document.getElementsByClassName("hidden");
		for (i=0; i<com.length; i++) { com[i].style.display = 'none'; }     
	} else {
		com = document.getElementsByClassName("hidden");
		for (i=0; i<com.length; i++) { com[i].style.display = 'block'; }
	}
    
	// fixed top bar
	if(GM_getValue('mh_fixedtopbar')) {
		com = document.getElementById("header");
		com.style.position = 'fixed';
		com.style.zIndex = 10;
		com = document.getElementById("container");
		com.style.marginTop = '105px';
		document.getElementById("notifier").addEventListener("click", mhChangeNotifierPanel, true);
	} else {
		com = document.getElementById("header");
		com.style.position = null;
		com.style.zIndex = null;
		com = document.getElementById("container");
		com.style.marginTop = '0';
		document.getElementById("notifier").removeEventListener("click", mhChangeNotifierPanel, true);
	}
	
	// Neutral mode
	if(GM_getValue('mh_neutralmode')) {
		com = document.getElementsByClassName("comment-info");
		for (i=0; i<com.length; i++) { com[i].style.display = 'none'; }     
		com = document.getElementsByClassName("avatar");
		for (i=0; i<com.length; i++) { com[i].style.display = 'none'; }   
	} else {
		com = document.getElementsByClassName("comment-info");
		for (i=0; i<com.length; i++) { com[i].style.display = null; }
		com = document.getElementsByClassName("avatar");
		for (i=0; i<com.length; i++) { com[i].style.display = null; } 
	}
    
	// Disable rounded avatars
	if(GM_getValue('mh_roundedavatars')) {
		com = document.getElementsByClassName("avatar");
		for (i=0; i<com.length; i++) { com[i].style.borderRadius = '0em'; }   
		for (i=0; i<com.length; i++) { com[i].style.MozBorderRadius = '0em'; }
		for (i=0; i<com.length; i++) { com[i].style.WebkitBorderRadius = '0em'; }        
	} else {
		com = document.getElementsByClassName("avatar");
		for (i=0; i<com.length; i++) { com[i].style.borderRadius = '50%'; }   
		for (i=0; i<com.length; i++) { com[i].style.MozBorderRadius = '50%'; }
		for (i=0; i<com.length; i++) { com[i].style.WebkitBorderRadius = '50%'; }       		
	}
}


// Misc functions
function mhSwitchVisibility() {
	if(document.getElementById("mh_menu").style.display == 'none') {
		document.getElementById("mh_menu").style.display = 'block';
		GM_setValue("mh_menu_display", 'block');
	} else {
		document.getElementById('mh_menu').style.display = 'none';
		GM_setValue('mh_menu_display', 'none');
	}
}

function mhChangeNotifierPanel() {
	document.getElementById('notifier_panel').style.zIndex = 12;
	document.getElementById('notifier_panel').style.position = 'fixed';
}

// Display menu & others
mhMenu();

// Perform actions
mhActions();