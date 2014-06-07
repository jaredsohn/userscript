// ==UserScript==
// @name          DSPlus Dörfersucher2BBCodes
// @namespace     c1b1.de
// @include       http://de*.twplus.org/calculator/locator/*
// ==/UserScript==

// Version 1.0

// (c) C1B1SE

var table = document.getElementsByClassName('list full')[0];

var fieldset = table.parentNode.getElementsByTagName('fieldset')[1];

var input = document.createElement('input');
input.setAttribute('type','button');
input.setAttribute('value','BBCodes');
input.setAttribute('class','button');
input.addEventListener('click',getIt,false);
fieldset.appendChild(input);

function getIt() {
  var elist = table.getElementsByTagName('tr');
  var result = '';
  for(var i = 1, len = elist.length; len > i; i++)
    {
   var tmp = elist[i].getElementsByTagName('td');
    var name = '[village]' + tmp[1].getElementsByTagName('a')[0].firstChild.data.match(/(\(\d{1,3}\|\d{1,3}\))/)[0]+'[/village]';
    var points = tmp[2].firstChild.data;
    result += name + ' ' + points + '\n';
    }
  alert(result); }