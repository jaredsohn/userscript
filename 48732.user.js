// Ikariam missing resources
// version 1.0.3
// Copyright (c) 2009-2011, iknietjij
//
// Acknowledges
// Uses a thousands seperator script from http://chiragrdarji.blogspot.com/2007/05/thousand-separator-function-for-java.html
//
// ==UserScript==
// @name          Ikariam missing resources
// @namespace     http://ikariam.org/
// @description   Showing how many resources are still needed for upgrading a building
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @include       http://s*.ikariam.*/*
// @version       1.0.3
//
// @history	1.0.3	Changed the auto updater include a link to holyschmidts version instead
// @history	1.0.2	Fixed a bug with not showing required resources over a million correct
// @history	1.0.1	Updated to include an update checker and fix for new greasemonkey version. Saving of options works again.
// @history	1.0.0	Original Version
// ==/UserScript==

ScriptUpdater.check( 48732 );

GM_registerMenuCommand(
		"Ikariam missing resources: Check for update",
		function() { ScriptUpdater.forceNotice( 48732, '1.0.2' ) }
	);


// Get the server info for multi-server 
var host = top.location.host.split(".");
var domain = host[host.length -1];
var server = host[0];

// Load settings
var show_abundance = GM_getValue(domain + "." + server + ".imr_sa", 0);
var comma_seperate = GM_getValue(domain + "." + server + ".imr_cs", 0);

// Setup variables
var wood, wine, marble, crystal, sulfur;

// Get the resources you have in town
if (document.getElementById('value_wood')) { wood = document.getElementById('value_wood').textContent.replace(",",""); }
if (document.getElementById('value_wine')) { wine = document.getElementById('value_wine').textContent.replace(",",""); }
if (document.getElementById('value_marble')) { marble = document.getElementById('value_marble').textContent.replace(",",""); }
if (document.getElementById('value_crystal')) { crystal = document.getElementById('value_crystal').textContent.replace(",",""); }
if (document.getElementById('value_sulfur')) { sulfur = document.getElementById('value_sulfur').textContent.replace(",",""); }

// If it's a building upgrade page, show how much is needed
var liElement, liTextContent, requiredMaterial, materialShortage, htmlText, insertElement, elementText, gotMaterial;

var foundWood = false;
var foundWine = false;
var foundMarble = false;
var foundGlass = false;
var foundSulfur = false;
var foundElement = false;
var alternateClassName = false;

if (document.getElementById('buildingUpgrade')) {
  if (document.getElementById('buildingUpgrade').getElementsByTagName('div')[0]) {
    if (document.getElementById('buildingUpgrade').getElementsByTagName('div')[0].getElementsByTagName('ul')[0]) {
      upgradeElements = document.getElementById('buildingUpgrade').getElementsByTagName('div')[0].getElementsByTagName('ul')[0];
      var liElements = upgradeElements.getElementsByTagName('li');
      for (var i=0; i < liElements.length; i++) {
        liElement = liElements[i];
        foundElement = false;

        if ((liElement.className == 'wood' || liElement.className == 'wood alt') && !foundWood) {
          elementText = 'Building Material';
          gotMaterial = wood;
          foundWood = true;
          foundElement = true;
          newClassname = 'wood';
          if (alternateClassName) { newClassname += ' alt'; }
          alternateClassName = !alternateClassName;
        }
        if ((liElement.className == 'wine alt' || liElement.className == 'wine') && !foundWine) {
          elementText = 'Wine';
          gotMaterial = wine;
          foundWine = true;
          foundElement = true;
          newClassname = 'wine';
          if (alternateClassName) { newClassname += ' alt'; }
          alternateClassName = !alternateClassName;
        }
        if ((liElement.className == 'marble alt' || liElement.className == 'marble') && !foundMarble) {
          elementText = 'Marble';
          gotMaterial = marble;
          foundMarble = true;
          foundElement = true;
          newClassname = 'marble';
          if (alternateClassName) { newClassname += ' alt'; }
          alternateClassName = !alternateClassName;
        }
        if ((liElement.className == 'glass alt' || liElement.className == 'glass') && !foundGlass) {
          elementText = 'Crystal Glass';
          gotMaterial = crystal;
          foundGlass = true;
          foundElement = true;
          newClassname = 'glass';
          if (alternateClassName) { newClassname += ' alt'; }
          alternateClassName = !alternateClassName;
        }
        if ((liElement.className == 'sulfur alt' || liElement.className == 'sulfur') && !foundSulfur) {
          elementText = 'Sulphur';
          gotMaterial = sulfur;
          foundSulfur = true;
          foundElement = true;
          newClassname = 'sulfur';
          if (alternateClassName) { newClassname += ' alt'; }
          alternateClassName = !alternateClassName;
        }
        
        if (foundElement) {
          liTextContent = liElement.textContent;
          //Bugfix, next line doesn't work for 1mil+ resources required. Replaced by the two lines below
          //requiredMaterial = liTextContent.substr(liTextContent.indexOf(elementText) + elementText.length + 2).replace(",","");
          requiredMaterial = liTextContent.substr(liTextContent.indexOf(elementText) + elementText.length + 2)
          requiredMaterial = requiredMaterial.replace(/,/g,"")
          materialShortage = parseInt(gotMaterial) - parseInt(requiredMaterial)
          if (materialShortage < 0 || show_abundance == true) {
            var absMaterialShortage = Math.abs(materialShortage);
            
            if (comma_seperate) {
              absMaterialShortage = ThousandSeparator(',',absMaterialShortage)
            }
            
            if (materialShortage < 0) {
              htmlText = '<span class="textLabel">' + elementText + '</span><span style=\'color: red\'>-' + absMaterialShortage + '</span>';
            }
            else {
              htmlText = '<span class="textLabel">' + elementText + '</span><span style=\'color: green\'>+' + absMaterialShortage + '</span>';
            }
              
            insertElement = document.createElement('li');
            insertElement.className = newClassname;
            insertElement.title = 'Missing ' + elementText;
            insertElement.innerHTML = htmlText;
            liElement.parentNode.insertBefore(insertElement, liElement.nextSibbling);
          }
          else {
            if (materialShortage < 0 && show_abundance == false) {
              alternateClassName = !alternateClassName;
            }
          }
        }
      }
    }
    
    if (document.getElementById('buildingUpgrade').getElementsByTagName('div')[0].getElementsByTagName('ul')[1]) {
      var tradeElement = document.getElementById('buildingUpgrade').getElementsByTagName('div')[0].getElementsByTagName('div')[1];
      tradeElement.innerHTML = '<br/><br/>' + tradeElement.innerHTML;
    }
  }
}

// Add the options
var page = document.getElementsByTagName('body')[0].id;
if (page == 'options') {
var HTMLtext = '<div class="contentBox01h">' +
                    '<h3 class="header">Mising resources options</h3>' +
                    '<p>The missing resources script will add the amount of resources you\'re missing to the options.</p>' +
                    '<div class="content">' +
                        '<table cellpadding="0" cellspacing="0"><tbody>' +
                            '<tr>' +
                                '<th>Comma seperate values</th>' +
                                '<td><input class="textfield" id="i_mr_cs" name="i_mr_cs" type="checkbox"';
if (comma_seperate == true) {
  HTMLtext = HTMLtext + ' CHECKED';
}                                
HTMLtext = HTMLtext +                                 '></td>' +
                            '</tr>' +
                            '<tr>' +
                                '<th>Show resources in abundance</th>' +
                                '<td><input class="textfield" id="i_mr_sa" name="i_mr_sa" type="checkbox"';
if (show_abundance == true) {
  HTMLtext = HTMLtext + ' CHECKED';
}                                
HTMLtext = HTMLtext +                                 '></td>' +
                            '</tr>' +
                        '</tbody></table>' +
                        '<div class="centerButton">' + 
                            '<input id="show_missingresources_savesettings" onclick="saveMissingResourcesSettings()" value="Save settings" class="button" type="button">' + 
                       '</div>' +
                    '</div>' + 
                    '<div class="footer"></div>' +
                '</div>';

    var settingsDialog = document.createElement("div");
    settingsDialog.innerHTML = HTMLtext;
    document.getElementById("mainview").insertBefore(settingsDialog, document.getElementById("vacationMode"));

    // Save settings
    unsafeWindow.saveMissingResourcesSettings = function()  {
        setTimeout(function() {
        var showabundance = document.getElementById("i_mr_sa").checked;
        var comaseperate = document.getElementById("i_mr_cs").checked;
        GM_setValue(domain + "." + server + ".imr_sa", showabundance);
        GM_setValue(domain + "." + server + ".imr_cs", comaseperate);
        window.location.replace(window.location);
        }, 0);
      };
}

// Taken from: http://chiragrdarji.blogspot.com/2007/05/thousand-separator-function-for-java.html
function ThousandSeparator(decimalDigits,Value) {
  // Separator Length. Here this is thousand separator
  var separatorLength = 3;
  var OriginalValue=Value;
  var TempValue = "" + OriginalValue;
  var NewValue = "";
  // Store digits after decimal
  var pStr;
  // store digits before decimal
  var dStr;
  // Add decimal point if it is not there
  if (TempValue.indexOf(".")==-1){TempValue+="."}
  dStr=TempValue.substr(0,TempValue.indexOf("."));
  pStr=TempValue.substr(TempValue.indexOf("."))   
  // Add "0" for remaining digits after decimal point
  while (pStr.length-1< decimalDigits){pStr+="0"}
  if(pStr =='.') pStr ='';
  if(dStr.length > separatorLength)
  {
      // Logic of separation    
      while( dStr.length > separatorLength)
      {
          NewValue = "," + dStr.substr(dStr.length - separatorLength) + NewValue;
          dStr = dStr.substr(0,dStr.length - separatorLength);
      }
      NewValue = dStr + NewValue;
  }
  else
  {
      NewValue = dStr;
  }
  //  Add decimal part
  NewValue = NewValue + pStr;
  // Show Final value
  return NewValue;
}