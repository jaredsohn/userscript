// ==UserScript==
// @name           nasza-klasa ..::Anty-Crap::..
// @source         http://userscripts.org/scripts/show/75960
// @author         spolsh
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description    drugie wydanie: mozesz samemu ustawic, co co ma być chowane
// @version 0.4
// @include        *nk.pl/*
// ==/UserScript==

/******************************************************************************
*::::::::::::::::::::::::..  LICENSE NOTES  ..::::::::::::::::::::::::::::::::*
*   					                                      *
*  		       nasza-klasa ..::Anty-Crap::..  v 0.4                   *
*                                                                             *
*******************************************************************************
*                                                                             *
*    the lightweight script for the site Nasza-klasa.pl (C)                   *
*    Copyright (C) 2010 spolsh <desp01sh@gmail.com>                           *
*                                                                             *
*    This program is Free software: you can redistribute it and/or modify     *
*    it under the terms of the GNU General Public License as published by     *
*    the Free Software Foundation, either version 3 of the License, or        *
*    (at your option) any later version.                                      *
*                                                                             *
*    This program is distributed in the hope that it will be useful,          *
*    but WITHOUT ANY WARRANTY; without even the implied warranty of           *
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the             *
*    GNU General Public License for more details.                             *
*                                                                             *
*    You should have received a copy of the GNU General Public License        *
*    along with this program. If not, see <http://www.gnu.org/licenses/>.     *
*                                                                             *
******************************************************************************/

var AC = new Object();
AC.version = '0.4';
AC.usoL = 'http://userscripts.org/scripts/';
AC.usoNo = '75960';
AC.usourl = AC.usoL + 'source/' + AC.usoNo + '.user.js';

//update script (by Richard Gibson, changed by ms99)
function UpdateScript() {
  GM_xmlhttpRequest({
					method: 'GET',
					url: AC.usourl + '?source', //don't increase the 'installed' count; just checking
					onload: function(result) {
					  if (result.status != 200) return;
					  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
					  nv = RegExp.$1;
					  if (nv == AC.version) {
						alert('Używasz najnowszej wersji (v' + AC.version + ') !');
						return;
					  } else if (nv < AC.version) {
						alert('Prawdopodobnie używasz wersji beta (v' + AC.version + ') !');
						return;
					  } else if (window.confirm('Dostępna jest nowa wersja (v ' + nv + ') !\n\n' + 'Uaktualnić teraz?\n'))  window.open (AC.usoL+'show/'+AC.usoNo,"mywindowx");
					}});
};


function on_off_label(foo)
{ return (foo)? "włączone": "wyłączone";
}
function A_Join(Array1, Array2)
{	if (Array1[0]) return (Array1+','+Array2).split(',');
else return Array2;
}
////==== Tutaj znajduja sie glowne ustawienia 
//###############################################
//--- var for UltraPure
var HideUltraPure = GM_getValue("HideUltraPure", true);
var IdUltraPure = new Array('quick_menu',
							'main_anonymous_right_column',
							'school_mates_box');
var ClassUltraPure = new Array('polec_profil');

//--- vars for Contest
var HideContest = GM_getValue("HideContest", true);
var IdContest = new Array('contest_box'); 

//--- vars for Video
var HideVideo = GM_getValue("HideVideo", true);
var IdVideo = new Array('last_added_videos'); 

//--- vars for Crap
var HideCrap = GM_getValue("HideCrap", true);
var IdCrap = new Array ('last_photos_box_ajax',
						'last_photos_box_loading',
						'last_photos_box',
						'turn_on_nktalk',
						'content_banner',
						'ad_pgr1',
						'blog_promo_link'); 
var ClassCrap = new Array('invite_box',
						  'reklama zadedykuj_piosenke',
						  'reklama wyslij_kwiaty',
						  'flash_ad',
						  'reklama pepsi');

//--- vars for Sledz
var HideSledz = GM_getValue("HideSledz", true);
var IdSledz = new Array ('sledzik_box',
						 'sledzik_friends',
						 'quick_sledzik_toggle');
var ClassSledz = new Array ('shade shade_right',
							'mobile_link');
//--- vars for EuroGabki
var HideEG = GM_getValue("HideEG", true);
var IdEG = new Array ('last_gifts',
					  'main_gifts',
					  'cool_box_21 cool_box prezenty ');
//--- vars for Uslugi
var HideUslugi = GM_getValue("HideUslugi", true);
var ClassUslugi = new Array ('cool_box_21 cool_box services_status');
					  
////----------------------------
//---
var IdToDelete = [];
var ClassToDelete = [];


//--- UltraPure
function ToggleUltraPure() 
{	//HideUltraPure = GM_getValue("HideUltraPure");
	HideUltraPure = !HideUltraPure;
	GM_setValue("HideUltraPure", HideUltraPure);
	alert("Opcja UltraPure jest: " + on_off_label(HideUltraPure));
	location.reload();
}
//---

//--- Contest
function ToggleContest() 
{	//HideCrap = GM_getValue("HideCrap");
	HideContest = !HideContest;
	GM_setValue("HideContest", HideContest);
	alert("Ukrywanie konkursów: " + on_off_label(HideContest));
	location.reload();
}
//---

//--- Video
function ToggleVideo() 
{	//HideVideo = GM_getValue("HideVideo");
	HideVideo = !HideVideo;
	GM_setValue("HideVideo", HideVideo);
	alert("Ukrywanie ostatnio dadanych filmow: " + on_off_label(HideVideo));
	location.reload();
}
//---

//--- Crap
function ToggleCrap() 
{	//HideCrap = GM_getValue("HideCrap");
	HideCrap = !HideCrap;
	GM_setValue("HideCrap", HideCrap);
	alert("Ukrywanie crapu: " + on_off_label(HideCrap));
	location.reload();
}
//---

//--- Sledz
function ToggleSledz() 
{	//HideSledz = GM_getValue("HideSledz");
	HideSledz = !HideSledz;
	GM_setValue("HideSledz", HideSledz);
	alert("Ukrywanie Śledzia: " + on_off_label(HideSledz));
	location.reload();
}
//---

//--- EuroGabki
function ToggleEG() 
{	//HideEG = GM_getValue("HideEG");
	HideEG = !HideEG;
	GM_setValue("HideEG", HideEG);
	alert("UKrywanie eurogąbek: " + on_off_label(HideEG));
	location.reload();
}
//---

//--- Uslugi
function ToggleUslugi() 
{	//HideUslugi = GM_getValue("HideUslugi");
	HideUslugi = !HideUslugi;
	GM_setValue("HideUslugi", HideUslugi);
	alert("Ukrywanie usług: " + on_off_label(HideUslugi));
	location.reload();
}
//---

//--- Default
function SetDefault()// mozna ustawicwedlug wlasnego upodobania
{ GM_setValue("HideContest", true);
  GM_setValue("HideCrap", true);
  GM_setValue("HideVideo", true);
  GM_setValue("HideSledz", true);
  GM_setValue("HideEG", true);
  GM_setValue("HideUltraPure", false);
  GM_setValue("HideUslugi", true);
  alert("Wszystkie opcje włączone, oprócz UltraPure");
  location.reload();
  //Show_vals();
}
//---

GM_registerMenuCommand("Domyślne", SetDefault);
GM_registerMenuCommand("on/off Video", ToggleVideo);
GM_registerMenuCommand("on/off Sledź", ToggleSledz);
GM_registerMenuCommand("on/off Crap", ToggleCrap);
GM_registerMenuCommand("on/off EuroGąbki", ToggleEG);
GM_registerMenuCommand("on/off Konkursy", ToggleContest);
GM_registerMenuCommand("on/off Usługi", ToggleUslugi);
GM_registerMenuCommand("on/off UltraPure", ToggleUltraPure);
GM_registerMenuCommand("Aktualizacja skryptu", UpdateScript);
//Show_vals();

function Kill_em_all()
{ if (HideUltraPure)
  {	IdToDelete = A_Join(IdToDelete, IdUltraPure);
	ClassToDelete = A_Join(ClassToDelete, ClassUltraPure);
  }
  if (HideContest)
	IdToDelete = A_Join(IdToDelete, IdContest);
  if (HideVideo)
	IdToDelete = A_Join(IdToDelete, IdVideo);
  if (HideCrap)
	IdToDelete = A_Join(IdToDelete, IdCrap);
	ClassToDelete = A_Join(ClassToDelete, ClassCrap);
  if (HideSledz)
  {
	IdToDelete = A_Join(IdToDelete, IdSledz);
	ClassToDelete = A_Join(ClassToDelete, ClassSledz);
  }
  if (HideEG)
	IdToDelete = A_Join(IdToDelete, IdEG);
  if (HideUslugi)
	ClassToDelete = A_Join(ClassToDelete, ClassUslugi);
  
  //alert(IdToDelete.join());
  //alert(ClassToDelete.join());
  
  for(var i = 0; i < IdToDelete.length; i++)
  {
	try
	{	document.getElementById(IdToDelete[i]).parentNode.removeChild(document.getElementById(IdToDelete[i]));
	} 
	catch(error){/*alert (error);*/	}
  }
  //--- ClassToDelete:
  
  var allPageTags = new Array(); 
  var allPageTags = document.getElementsByTagName("*");
  for (var i=0; i<allPageTags.length; i++)
  {
	for (var j = 0; j < ClassToDelete.length; j++)
	{
	  if (allPageTags[i].className == ClassToDelete[j])
	  {
		allPageTags[i].style.display = 'none';
	  }
	}
  }
 IdToDelete = [];
 ClassToDelete = [];
}

Kill_em_all();