// ==UserScript==
// @name Ninite download helper
// @author mihau
// @version 0.4
// @description adds some crucial functionality to Ninite batch download page
// @include https://www.ninite.com/*
// @include http://www.ninite.com/*
// @include https://ninite.com/*
// @include http://ninite.com/*
// ==/UserScript==

function buildthedllink() {
if( location.hostname.indexOf('ninite.com') != -1 ) {

  uncheckAll(document.forms[0]);
  
  // javascript:alert();

 //  style="padding-top:5000px;"
  var newdiv;
  newdiv  = '<div><h1 style="color:#FF0000;size:20px;">...with Ninite download helper</h2><br /><h3>if you need all programs:<br /><button class="nextbutton" onclick="checkAll(document.forms[0]);document.forms[0].submit();">download all programs at once</button></h3>';
  newdiv += '<h3>if you need the majority of the programs:<br /><button class="nextbutton" onclick="checkAll(document.forms[0]);">check all programs but don\'t download them yet</button></h3>';
  newdiv += '<h3>if you only need some programs:<br /><button class="nextbutton" onclick="uncheckAll(document.forms[0]);">reset and pick your programs individually</button></h3></div>';

  // document.getElementsByTagName("div")[15].innerHTML = newdiv; // 203
  document.getElementsByClassName("grid_6")[2].innerHTML = newdiv; // 203
  // document.getElementsByTagName("div")[206].innerHTML = ''; // 206
  
  // javascript:alert(document.getElementsByTagName("div")[15].innerHTML)

  // window.scrollBy(0,10000);
  }
}

function checkAll(field)
{
for (i = 0; i < field.length; i++)
	field[i].checked = true ;
}

function uncheckAll(field) {
for (i = 0; i < field.length; i++)
	field[i].checked = false ;
}

   window.addEventListener('DOMContentLoaded', buildthedllink, false);