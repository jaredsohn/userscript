// ==UserScript==
// @name        MassContacts
// @namespace       http://iwitness.urbandead.info
// @description      allows mass modification of contacts in UrbanDead
// @include        http://*urbandead.com/contacts.cgi*
// @include        http://*ud-malton.info/r*
// ==/UserScript==
//**************************************************
/* ***** BEGIN LICENSE BLOCK *****
 *   Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is MassContacts.
 *
 * The Initial Developer of the Original Code is Sebastain Wiers.
 *
 * Portions created by the Initial Developer are Copyright (C) April 1, 2008
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s): "Kyle_The_Feared" (actual name unknown)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */



//START WEB SECTION  **********
if ( /ud\-malton\.info\/r/.test(window.location.href) ){
//START WEB SECTION  **********



demLinks = document.getElementsByTagName('a');
var massCons = '<h4><a href=http://wiki.urbandead.com/index.php/MassContacts>Masscontacts</a> formated version of all profile links on this page:</h4>';
for (var i=0, a; (a=demLinks[i]); i++){
  if (/urbandead.com\/profile\.cgi\?id=\d\d+/.test(a.href)) {
    var massCon = a.href.match(/\d\d+/)[0];
    massCons += a.innerHTML.replace(/ /g,'_') + '_#' + massCon + '{1}RevReq, ';
  }
}

br = document.createElement('br');
document.body.appendChild(br);
document.body.appendChild(br);
document.body.appendChild(br);
document.body.appendChild(br);
massShow = document.createElement('p');
massShow.innerHTML = massCons;
document.body.appendChild(massShow);

//END WEB SECTION  **********
}
//END WEB SECTION  **********








//START UD SECTION  **********
if (/urbandead\.com\/contacts\.cgi/.test(window.location.href)){
//START UD SECTION  **********


//  FUNCTIONS
function massClearFunc(){massBox.value = '';}

function massHelpFunc(){massBox.value = 'MassContacts List BOX:\r\n\r\nDocumentation:\r\nhttp://tinyurl.com/ywjlmw\r\n\r\nBOX list entry format:\r\n\Char_name#1234567890{1}commentary, \r\n\r\nIf this form overlaps your contacts list, you may need to disable Greasemonkey to edit contacts normally.\r\n\r\n';}

function massGrabFunc(){
  var ids = [];
  var names = [];
  var colors = [];
  var strikes = [];
  var lives = [];

  var as = document.getElementsByTagName('a');

  if (massGrabSelect.value == 'strike'){
    for (var i = 0, a; (a = as[i]); i++) {
      if (/<strike style=/.test(a.innerHTML)) {
        var textNode = a.firstChild; var conStrike = '';
        if (textNode.nodeType != 3) {
           textNode = textNode.firstChild; conStrike = 'MIA';
        }
        var life = 'live';
        if (/<td>Zombie/.test(a.parentNode.parentNode.innerHTML)){life = 'dead';}
        lives.push(life);
        names.push(textNode.nodeValue.replace(/ /g,'_'));
        ids.push(a.href.match(/id=(\d+)/)[1]);
        colors.push(a.className.match(/\d+/)[0]);
        strikes.push(conStrike)
     }
    }
  }

  if (/[1-9|10]/.test(massGrabSelect.value)){
    var grabSetting = 'con'+massGrabSelect.value
    for (var i = 0, a; (a = as[i]); i++) {
      if (a.className == grabSetting) {
        var textNode = a.firstChild; var conStrike = '';
        if (textNode.nodeType != 3) {
           textNode = textNode.firstChild; conStrike = 'MIA';
        }
        var life = 'live';
        if (/<td>Zombie/.test(a.parentNode.parentNode.innerHTML)){life = 'dead';}
        lives.push(life);
        names.push(textNode.nodeValue.replace(/ /g,'_'));
        ids.push(a.href.match(/id=(\d+)/)[1]);
        colors.push(a.className.match(/\d+/)[0]);
        strikes.push(conStrike)
     }
    }
  }

  if (massGrabSelect.value == 'mass') {
    for (var i = 0, a; (a = as[i]); i++) {
      if (/profile\.cgi\?id=\d+/.test(a.href)) {
        var textNode = a.firstChild; var conStrike = '';
        if (textNode.nodeType != 3) {
           textNode = textNode.firstChild; conStrike = 'MIA';
        }
        var life = 'live';
        if (/<td>Zombie/.test(a.parentNode.parentNode.innerHTML)){life = 'dead';}
        lives.push(life);
        names.push(textNode.nodeValue.replace(/ /g,'_'));
        ids.push(a.href.match(/id=(\d+)/)[1]);
        colors.push(a.className.match(/\d+/)[0]);
        strikes.push(conStrike)
     }
    }
  }

    if (massGrabSelect.value == 'group') {
    var groupTest = prompt('Enter Group Name you wish to grab contacts for')
    groupTest = '/'+groupTest+'/'
    for (var i = 0, a; (a = as[i]); i++) {
      if (a.parentNode.parentNode.innerHTML.match(groupTest)[0]) {
        var textNode = a.firstChild; var conStrike = '';
        if (textNode.nodeType != 3) {
           textNode = textNode.firstChild; conStrike = 'MIA';
        }
        var life = 'live';
        if (/<td>Zombie/.test(a.parentNode.parentNode.innerHTML)){life = 'dead';}
        lives.push(life);
        names.push(textNode.nodeValue.replace(/ /g,'_'));
        ids.push(a.href.match(/id=(\d+)/)[1]);
        colors.push(a.className.match(/\d+/)[0]);
        strikes.push(conStrike)
     }
    }
  }

  for (var i=0; i<ids.length; i++){
    massBox.value += names[i]+'_#'+ids[i]+'{'+colors[i]+'}' + strikes[i] + lives[i] + ', \r\n'  ;
  }

}


function massSetFunc(){
  if (massSetSelect.value != 'mass'){
    var webLoc = window.location.href.match(/http:\/\/(www.)?urbandead.com\/contacts.cgi/);
    var modString = '';
    var modIDs = massBox.value.match(/\d\d+(?=\{[\d\d?|d]\})/g);
    for (i=0; i<modIDs.length; i++){
      modString += 'c' + modIDs[i] + '=' + massSetSelect.value + '&';
    }
  }
  if (massSetSelect.value == 'mass'){
    var webLoc = window.location.href.match(/http:\/\/(www.)?urbandead.com\/contacts.cgi/);
    var modString = '';
    var modLists = massBox.value.match(/#\d\d+\{[\d\d?|d]\}/g);
    for (var i=0; modLists[i]; i++){
      var modIDs = modLists[i].match(/\d\d+(?=\{[\d\d?|d]\})/)[0];
      var modTypes = massBox.value.match(/[\d+|d](?=\})/)[0];
      modString += 'c' + modIDs + '=' + modTypes + '&';
    }
  }
  window.location = webLoc[0] + '?' + modString;
}

function massAddFunc(){
  var cookies = document.cookie.split(';').map(function(item) { var nameValue = item.split('='); return { name: nameValue[0], value: nameValue[1] }; });
  var yourName = cookies[0].value.match(/(.+)-[\d|a-f]{32}/)[1];
  GM_setValue(yourName, massBox.value);
  modIDs = massBox.value.match(/\d\d+(?=\{[\d\d?|d]\})/g);
  if (!modIDs) {alert('MassContacts could not find any properly formated profiles.  Use "Help" for more information.');}
  var webLoc = window.location.href.match(/http:\/\/(www.)?urbandead.com\/contacts.cgi/);
  var massAddWin = Math.random();
  var prepFunc = function(index) {
    return function() {
      window.open(webLoc[0] + '?add=' + modIDs[index], massAddWin, '');
    };
  }
  for (var i = 0; i < modIDs.length; i++){
    window.setTimeout(prepFunc(i), i*1000);
  }
}

function helloMass(){
  var cookies = document.cookie.split(';').map(function(item) { var nameValue = item.split('='); return { name: nameValue[0], value: nameValue[1] }; });
  var yourName = cookies[0].value.match(/(.+)-[\d|a-f]{32}/)[1];
  var message = 'BOX\r\n\r\nClick the help button for assistance.\r\n\r\nIf this form overlaps your contacts list, you may need to disable Greasemonkey to edit contacts normally.\r\n\r\n'
  massBox.value=GM_getValue(yourName, message);
}

function goodbyeMass(){
  var cookies = document.cookie.split(';').map(function(item) { var nameValue = item.split('='); return { name: nameValue[0], value: nameValue[1] }; });
  var yourName = cookies[0].value.match(/(.+)-[\d|a-f]{32}/)[1];
  GM_setValue(yourName, massBox.value);
  GM_setValue('gmConCols', massBox.cols);
  GM_setValue('gmConRows', massBox.rows);
}

function massConvertFunc(){massBox.value = massBox.value.replace(/(\d\d+)/g, '#$1{1}');}


// LAYOUT & DISPLAY
window.addEventListener('load', helloMass, false);
window.addEventListener('unload', goodbyeMass, false);

var cookies = document.cookie.split(';').map(function(item) { var nameValue = item.split('='); return { name: nameValue[0], value: nameValue[1] }; });
var yourName = cookies[0].value.match(/(.+)-[\d|a-f]{32}/)[1];
var header = document.getElementsByTagName('h1')[0];
header.innerHTML = '<div align="left">&nbsp;Contacts List for '+yourName+'</div>';
document.title = 'Urban Dead - Contacts List for '+yourName

var aContacts = document.getElementsByTagName('a');
for (var i=0; i<aContacts.length; i++){
  if (/contacts\.cgi\?sort\=name/.test(aContacts[i].href)){
    var checkCell = aContacts[i].parentNode.parentNode.insertBefore (document.createElement('td'), aContacts[i].parentNode.nextSibling);
    var headText = checkCell.appendChild(document.createElement('a')); headText.innerHTML='BOX'
  }
  if (/profile\.cgi\?id=\d+/.test(aContacts[i].href)){
    var checkCell = aContacts[i].parentNode.parentNode.insertBefore (document.createElement('td'), aContacts[i].parentNode.nextSibling);
    var contactLink = checkCell.appendChild(document.createElement('a')); contactLink.className = 'y';
    var contactCode = ''
    var contactName = aContacts[i].innerHTML.replace(/<\/?strike.*?>/g,'');
    var contactStrike = '';
    if (/<strike/.test(aContacts[i].innerHTML)){contactStrike = 'MIA';}
    var contactLive = 'live, ';
    if (/<td>Zombie/.test(aContacts[i].parentNode.parentNode.innerHTML)){contactLive = 'dead, ';}
    contactName = contactName.replace(/ /g,'_');
    contactName = contactName.replace(/'/g,'`');
    var contactNumber = aContacts[i].href.match(/\d\d+/)[0];
    var contactType = aContacts[i].className.match(/\d+/)[0]
    contactCode += contactName + '_#' + contactNumber + '{' + contactType +'}';
    contactLink.innerHTML = '<a href="javascript:void(massForm.massBox.value+=(' + "'" + contactCode + contactStrike + contactLive + "\\r\\n'));" + '">&rArr; BOX</a>'
  }

}

var massForm = document.createElement('form'); massForm.id = 'massForm';

var pageDiv = document.createElement('div'); pageDiv.align= 'left';
var pageTable = pageDiv.appendChild(document.createElement('table'));
var pageRow = pageTable.appendChild(document.createElement('tr'));
var pageLeft = pageRow.appendChild(document.createElement('td')); pageLeft.style.verticalAlign ='top';
var pageRight = pageRow.appendChild(document.createElement('td')); pageRight.style.verticalAlign ='top';

var contactForm = document.getElementsByTagName('form')[0];
contactForm.parentNode.insertBefore(document.createElement('p'), contactForm);
contactForm.parentNode.insertBefore(pageDiv, contactForm);
var showLeft = pageLeft.appendChild(massForm);
var showRight = pageRight.appendChild(contactForm);

var massDiv = massForm.appendChild(document.createElement('div')); massDiv.align = 'center';

var table = massDiv.appendChild(document.createElement('table')); table.className = 'con gt'; table.style.position = 'fixed'; table.style.right='35'; table.style.top='35'

var massField = table.insertRow(-1).insertCell(-1).appendChild(document.createElement('fieldset'));
var massLegend = massField.appendChild(document.createElement('legend'));
var massLegendText = massLegend.appendChild(document.createTextNode('MassContacts'));

var aTable = massField.appendChild(document.createElement('table'));
var aRow = aTable.appendChild(document.createElement('tr'));

var aCell = aRow.appendChild(document.createElement('td'));

var massBox = aCell.appendChild(document.createElement('textarea')); massBox.id='massBox';
massBox.cols =GM_getValue('gmConCols', '30'); massBox.rows = GM_getValue('gmConRows', '12');

aCell.appendChild(document.createElement('br'));

var massBoxWide = aCell.appendChild(document.createElement('a'));  massBoxWide.className='y';
massBoxWide.innerHTML= '<a href="javascript:void(massForm.massBox.cols++)">&nbsp;&larr;&nbsp;</a>';
var massBoxSkinny = aCell.appendChild(document.createElement('a'));  massBoxSkinny.className='y';
massBoxSkinny.innerHTML= '<a href="javascript:void(massForm.massBox.cols--)">&nbsp&rarr;&nbsp</a>';
var massBoxTall = aCell.appendChild(document.createElement('a'));  massBoxTall.className='y';
massBoxTall.innerHTML= '<a href="javascript:void(massForm.massBox.rows++)">&nbsp&darr;&nbsp</a>';
var massBoxShort = aCell.appendChild(document.createElement('a'));   massBoxShort.className='y';
massBoxShort.innerHTML= '<a href="javascript:void(massForm.massBox.rows--)">&nbsp;&uarr;&nbsp</a>';

aCell.appendChild(document.createElement('br')); aCell.appendChild(document.createElement('br'));

massAddButton = aCell.appendChild(document.createElement('input')); massAddButton.type='button'; massAddButton.value='add BOX list to contacts list'; massAddButton.className='m';
massAddButton.addEventListener('click', massAddFunc, false);

aCell.appendChild(document.createElement('br')); aCell.appendChild(document.createElement('br'));

massSetButton = aCell.appendChild(document.createElement('input')); massSetButton.type='button'; massSetButton.value='Change contacts in BOX to'; massSetButton.className='m';
massSetButton.addEventListener('click', massSetFunc, false);

aCell.appendChild(document.createElement('br'));

var massSetSelect = aCell.appendChild(document.createElement('select')); massSetSelect.className = 'cps';
  massOptionZ = massSetSelect.appendChild(document.createElement('option')); massOptionZ.className = 'cpn'; massOptionZ.value = 'mass'; massOptionZtext = massOptionZ.appendChild(document.createTextNode('Use BOX {settings}'));
  massOptionN = massSetSelect.appendChild(document.createElement('option')); massOptionN.className = 'cp1'; massOptionN.value = '1'; massOptionNtext = massOptionN.appendChild(document.createTextNode('grey {1}'));
  massOptionO = massSetSelect.appendChild(document.createElement('option')); massOptionO.className = 'cp2'; massOptionO.value = '2'; massOptionOtext = massOptionO.appendChild(document.createTextNode('red {2}'));
  massOptionP = massSetSelect.appendChild(document.createElement('option')); massOptionP.className = 'cp3'; massOptionP.value = '3'; massOptionPtext = massOptionP.appendChild(document.createTextNode('orange {3}'));
  massOptionQ = massSetSelect.appendChild(document.createElement('option')); massOptionQ.className = 'cp4'; massOptionQ.value = '4'; massOptionQtext = massOptionQ.appendChild(document.createTextNode('yellow {4}'));
  massOptionR = massSetSelect.appendChild(document.createElement('option')); massOptionR.className = 'cp5'; massOptionR.value = '5'; massOptionRtext = massOptionR.appendChild(document.createTextNode('green {5}'));
  massOptionS = massSetSelect.appendChild(document.createElement('option')); massOptionS.className = 'cp6'; massOptionS.value = '6'; massOptionStext = massOptionS.appendChild(document.createTextNode('blue {6}'));
  massOptionT = massSetSelect.appendChild(document.createElement('option')); massOptionT.className = 'cp7'; massOptionT.value = '7'; massOptionTtext = massOptionT.appendChild(document.createTextNode('purple {7}'));
  massOptionU = massSetSelect.appendChild(document.createElement('option')); massOptionU.className = 'cp8'; massOptionU.value = '8'; massOptionUtext = massOptionU.appendChild(document.createTextNode('black {8}'));
  massOptionV = massSetSelect.appendChild(document.createElement('option')); massOptionV.className = 'cp9'; massOptionV.value = '9'; massOptionVtext = massOptionV.appendChild(document.createTextNode('white {9}'));
  massOptionX = massSetSelect.appendChild(document.createElement('option')); massOptionX.className = 'cpn'; massOptionX.value = '10'; massOptionXtext = massOptionX.appendChild(document.createTextNode('ignore contacts {10}'));
  massOptionY = massSetSelect.appendChild(document.createElement('option')); massOptionY.className = 'cpn'; massOptionY.value = 'd'; massOptionYtext = massOptionY.appendChild(document.createTextNode('delete contacts {D}'));

aCell.appendChild(document.createElement('br')); aCell.appendChild(document.createElement('br'));

massGrabButton = aCell.appendChild(document.createElement('input')); massGrabButton.type='button'; massGrabButton.value='add more contacts to BOX'; massGrabButton.className='m';
massGrabButton.addEventListener('click', massGrabFunc, false);

aCell.appendChild(document.createElement('br'));

var massGrabSelect = aCell.appendChild(document.createElement('select')); massGrabSelect.className = 'cps';
  massOptionNN = massGrabSelect.appendChild(document.createElement('option')); massOptionNN.className = 'cpn'; massOptionNN.value = 'mass'; massOptionNNtext = massOptionNN.appendChild(document.createTextNode('all contacts'));
  massOptionOO = massGrabSelect.appendChild(document.createElement('option')); massOptionOO.className = 'cpn'; massOptionOO.value = 'strike'; massOptionOOtext = massOptionOO.appendChild(document.createTextNode('struck contacts'));
  massOptionAA = massGrabSelect.appendChild(document.createElement('option')); massOptionAA.className = 'cp1'; massOptionAA.value = '1'; massOptionAAtext = massOptionAA.appendChild(document.createTextNode('grey contacts {1}'));
  massOptionBB = massGrabSelect.appendChild(document.createElement('option')); massOptionBB.className = 'cp2'; massOptionBB.value = '2'; massOptionBBtext = massOptionBB.appendChild(document.createTextNode('red contacts {2}'));
  massOptionCC = massGrabSelect.appendChild(document.createElement('option')); massOptionCC.className = 'cp3'; massOptionCC.value = '3'; massOptionCCtext = massOptionCC.appendChild(document.createTextNode('orange contacts {3}'));
  massOptionDD = massGrabSelect.appendChild(document.createElement('option')); massOptionDD.className = 'cp4'; massOptionDD.value = '4'; massOptionDDtext = massOptionDD.appendChild(document.createTextNode('yellow contacts {4}'));
  massOptionEE = massGrabSelect.appendChild(document.createElement('option')); massOptionEE.className = 'cp5'; massOptionEE.value = '5'; massOptionEEtext = massOptionEE.appendChild(document.createTextNode('green contacts {5}'));
  massOptionFF = massGrabSelect.appendChild(document.createElement('option')); massOptionFF.className = 'cp6'; massOptionFF.value = '6'; massOptionFFtext = massOptionFF.appendChild(document.createTextNode('blue contacts {6}'));
  massOptionHH = massGrabSelect.appendChild(document.createElement('option')); massOptionHH.className = 'cp7'; massOptionHH.value = '7'; massOptionHHtext = massOptionHH.appendChild(document.createTextNode('purple contacts {7}'));
  massOptionII = massGrabSelect.appendChild(document.createElement('option')); massOptionII.className = 'cp8'; massOptionII.value = '8'; massOptionIItext = massOptionII.appendChild(document.createTextNode('black contacts {8}'));
  massOptionJJ = massGrabSelect.appendChild(document.createElement('option')); massOptionJJ.className = 'cp9'; massOptionJJ.value = '9'; massOptionJJtext = massOptionJJ.appendChild(document.createTextNode('white contacts {9}'));
  massOptionMM = massGrabSelect.appendChild(document.createElement('option')); massOptionMM.className = 'cpn'; massOptionMM.value = '10'; massOptionMMtext = massOptionMM.appendChild(document.createTextNode('ignored contacts {10}'));
  massOptionNN = massGrabSelect.appendChild(document.createElement('option')); massOptionNN.className = 'cpn'; massOptionNN.value = 'group'; massOptionNNtext = massOptionNN.appendChild(document.createTextNode('by group name {prompt}'));

aCell.appendChild(document.createElement('br')); aCell.appendChild(document.createElement('br'));

massConvertButton = aCell.appendChild(document.createElement('input')); massConvertButton.type='button'; massConvertButton.value="format possible ID's in BOX"; massConvertButton.className='m';
massConvertButton.addEventListener('click', massConvertFunc, false);

aCell.appendChild(document.createElement('br'));

massClearButton = aCell.appendChild(document.createElement('input')); massClearButton.type='button'; massClearButton.value='clear BOX'; massClearButton.className='m';
massClearButton.addEventListener('click', massClearFunc, false);
aCell.appendChild(document.createTextNode(' '));
massHelpButton = aCell.appendChild(document.createElement('input')); massHelpButton.type='button'; massHelpButton.value='Help'; massHelpButton.className='m';
massHelpButton.addEventListener('click', massHelpFunc, false);

//END UD SECTION  **********
}
//END UD SECTION  **********