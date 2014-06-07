// ==UserScript==
// @name           UDlister
// @author         jimflexx (http://userscripts.org/users/117383)
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/ 
// @description    Contact Lister for Urban Dead
// @include        http://*urbandead.com/contacts.cgi*
// ==/UserScript==

//**************************************************
/* ***** BEGIN INFO BLOCK *****
 *
 * This script produces text listings of contacts with profile URI's
 * in a separate window sorted by color key used. It is useful for 
 * listing groups of players in forums, emails and wikis. 
 *
 * Version 1.0
 * Original code by Jim Skinner (Jimflexx) on November 2009.
 *
 * ***** END INFO BLOCK ***** */

// trigger on click

function runLister() {

	var demLinks = document.getElementsByTagName('a');
	var colors = ['color','grey','red','orange','yellow','green','blue','purple','black','white'];
	var br ="</br>";
	var sepline = "--------------------------------";
	var sep = " - ";
	var liststr = "";
	var hit = false;
	
	listwindow = window.open("","listwindow","status=no,toolbar=no,menubar=no,scrollbars=yes,location=no,width=600,height=600");

	//loop through the colors

	for (var i=1; i< 10; i++) {

		liststr=sepline+br+colors[i]+br+sepline+br;
		hit= false;
		
		for (indx=0;indx<demLinks.length;indx++) {
			if (demLinks[indx].href.indexOf("profile")!=-1) {
				if (demLinks[indx].className == "con"+ i) {
					hit=true;
					liststr+=demLinks[indx].text;
					if (demLinks[indx].firstChild.tagName == "STRIKE") {
						liststr+= " (MIA)";
					}
					liststr+= sep;
					liststr+= demLinks[indx].href;
					liststr+= "</br>";
				}
			}
		}
		if (hit) {listwindow.document.write(liststr);}
	}
	listwindow.document.close();
}

var header= "<h1>Your Contacts List</h1>";
var newlink = '<p><a href="" id="lkr_newlink">Click for list of links</a></p>';
document.body.innerHTML = document.body.innerHTML.replace(header,header+newlink);
document.getElementById("lkr_newlink").addEventListener("click",runLister,false);