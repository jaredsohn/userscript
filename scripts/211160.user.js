// ==UserScript==
// @name          IMDB Add Age/Age Died
// @namespace     imdb_age_and_died
// @description   Adds Age/Age died of the person after their Date of Birth/Date of Death on IMDB.com
// @updateURL     https://userscripts.org/scripts/source/211160.meta.js
// @downloadURL   https://userscripts.org/scripts/source/211160.user.js
// @include       *www.imdb.com/name/*
// @author        JustRandomStuff
// @version       1.0
// ==/UserScript==

/* --------- Note ---------
  This script adds peoples current Age(or approximate age) or Age at the time they died after their Date of Birth or Date of Death on IMDB.com
  This script 'should' work on both new design and on 'reference' pages.
  'Reference' pages refers to how a persons page displays according to how the setting you have set in your profile.
  IMDB already adds the 'age died' to bio pages on the newer display method(non reference view).
  Also, if a person has only a birth year showing and not day/month, January 1st is used with the provided year, then 
  the age will be displayed as 'Approx. Age', see example below.

  Examples:
  Person who is currently alive:
  Julia Ormond (http://www.imdb.com/name/nm0000566/reference)
  Date of Birth: 4 January 1965(Age: 49), Epsom, Surrey, England, UK 
  
  Person who has died:
  Janis Joplin (http://www.imdb.com/name/nm0429767/reference)
  Date of Death: 4 October 1970(Age Died: 27), Hollywood, Los Angeles, California, USA
  
  Person alive but only birth year given:
  Jessica Gower (http://www.imdb.com/name/nm1017215/reference)
  Date of Birth: 1977(Approx. Age: 37), Melbourne, Victoria, Australia
  
  
  Credits: Some code borrowed from scripts by:
  Thomas Stewart  http://userscripts.org/scripts/show/1060
  erosman http://userscripts.org/scripts/show/186521
  
  This script can be completely used in whole or part as you see fit.
  I only made it because some users where requesting a script that showed the people's ages
  on IMDB.com on both the newer display method and on the older reference display method pages.
  I'm no javascript coder, so good luck with parsing this script or eevn making heads or tails out of it lol.

  --------- History ---------

  1.0 Initial release

*/
if (window.self !== window.top) { return; } // end execution if in a frame
var page = "new";
if(window.location.pathname.indexOf("reference")>0){
	page = "ref";
} else if (window.location.pathname.indexOf("bio")>0){
	page = "bio";
}
//alert(page);
if(page == "ref"){
	var el = document.getElementsByTagName('h5');
	var cls = document.getElementsByClassName('info');
} else if (page=="bio"){
	var el = document.getElementsByTagName('td');
	var cls = document.getElementsByTagName('td');
} else {
	var el = document.getElementsByTagName('time');
}

born = new Date();
died = new Date();
var birthdate = "01-01";
var age_display = "(Approx. Age: ";

var dead = false;
for (i=0; i<el.length; i++) {
	with (el[i]) {
		if(page=="new"){
			//alert(el[i].innerHTML)
			var attribs = el[i].attributes;
			if(attribs['itemprop'].value == "deathDate"){
				dead = true;
				return;
			} else if(attribs['itemprop'].value == "birthDate"){
				var dob = el[i].getAttribute('datetime').split('-');
				if (!dob[0]) { return; } // end execution if not found
				if ((dob[1]==0) || (dob[2]==0)){
					dob[1]="01";
					dob[2]="01";
				} else {
					age_display = "(Age: ";
				}
				var childGuest = document.createElement("span");
				childGuest.id = "added_age";
				el[i].parentNode.insertBefore(childGuest, el[i].nextSibling);
				//alert(dob);
			}
		} else {
			if (innerHTML.match(/Date of Death/gmi)){
				dead = true;
				var deadtd = el[i+1].innerHTML;
			}
		}
	}
}
//alert(dead);

if(page != "new"){
	for (i=0; i<cls.length; i++) {
		with (cls[i]) {
			if (innerHTML.match(/Date of Birth/gmi)){
				/* find the birth date */
				if(page=="ref"){
					var ahref = cls[i].getElementsByTagName('a');
				}else{
					var ahref = cls[i+1].getElementsByTagName('a');
				}
				for (i=0;i<ahref.length;i++) {
					if (ahref[i].href.indexOf("birth_monthday") >0) {
						var n1 = ahref[i].href.substr(ahref[i].href.indexOf("?"));
						if(page=="ref"){
							birthdate = n1.split("=")[1].replace(/\/$/, '');
						} else{
							birthdatetmp = n1.split("=")[1];
							birthdate = birthdatetmp.split('&')[0];
						}
						age_display = "(Age: ";
					}
					if (ahref[i].href.indexOf("birth_year") >0) {
						var n2 = ahref[i].href.substr(ahref[i].href.indexOf("?"));
						if(page=="ref"){
							var birthyeartmp = n2.split("=");
							var birthyear = birthyeartmp[1];
						} else{
							var birthyeartmp = n2.split("=")[1];
							var birthyear = birthyeartmp.split('&')[0];
						}
						if(dead==false){
							var childGuest = document.createElement("span");
							childGuest.id = "added_age";
							ahref[i].parentNode.insertBefore(childGuest, ahref[i].nextSibling);
						}
					}
				}
				var mnthday = birthdate.split("-");
				var dob=[birthyear,mnthday[0],mnthday[1]];
				born.setFullYear(birthyear);
				born.setMonth(mnthday[0] - 1);
				born.setDate(mnthday[1]);
			}
		}
	}
}
if(dead && page != "new"){
	for (w=0; w<cls.length; w++) {
		with (cls[w]) {
			if (innerHTML.match(/Date of Death/gmi)){
				if(page=="ref"){
					var ahref = cls[w].getElementsByTagName('a');
				}else{
					var ahref = cls[w+1].getElementsByTagName('a');
				}
				for (i=0;i<ahref.length;i++) {
					if(page=="ref"){
						if (ahref[i].href.indexOf("deaths") >0) {
							var n1 = ahref[i].href;
							var deathdate = n1.split("/")[4];
						}
					} else {
						if (ahref[i].href.indexOf("death_monthday") >0) {
							var n1 = ahref[i].href;
							var deathdatetmp = n1.split("=")[1];
							var deathdate = deathdatetmp.split("&")[0];
						}
					}
					if (ahref[i].href && ahref[i].href.indexOf("death_date") >0) {
						var n2 = ahref[i].href.substr(ahref[i].href.indexOf("?"));
						var deathyeartmp = n2.split("=");
						if(page=="ref"){
							var deathyear = n2.split("=")[1];
						}else{
							deathyeartmp = n2.split("=")[1];
							var deathyear = deathyeartmp.split('&')[0];
						}
						if(dead==true){
							var childGuest = document.createElement("span");
							childGuest.id = "age_died";
							ahref[i].parentNode.insertBefore(childGuest, ahref[i].nextSibling);
						}
					}
				}
				var dmnthday = deathdate.split("-");
				var dod=[deathyear,dmnthday[0],dmnthday[1]];
				died.setFullYear(deathyear);
				died.setMonth(dmnthday[0]-1);
				died.setDate(dmnthday[1]);
				break;
			}
		}
	}
}

if (!dead) {
	var age = getAge(dob[0],dob[1],dob[2]);
	//alert(age);
	document.getElementById("added_age").innerHTML = age_display + age + ")";
} else {
	var agedied = died.getTime() - born.getTime();
	agedied = Math.floor(agedied / (1000 * 60 * 60 * 24 * 365.242199));
	document.getElementById("age_died").innerHTML = "(Age Died: " + agedied + ")";
}

function getAge(year,month,day) {
	var today = new Date();
	var age = today.getFullYear() - year;
	var m = today.getMonth()+1 - month;
	if (m < 0 || (m === 0 && today.getDate() < day)) {
		age--;
	}
	return age;
}

