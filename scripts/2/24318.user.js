// ==UserScript==
// @name           Send Resources Distributer
// @namespace      travianERA
// @description    Distributes resources to reach a certain number when sending to another village.
//                 If village1's current resources are 1000 2000 3000 4000 and you enter 5000 into
//                 the box, it will automatically fill the text boxes with the values 4000 3000 2000 1000.
//                 Effectively giving village1 all the resources so they are all at 5000.
// @include        http://*.travian.*/build.php?*gid=17*
// @exclude        http://*.travian.*/build.php?*gid=17&*t=2
// ==/UserScript==

var scriptTag = document.createElement('script');
scriptTag.setAttribute('language', 'JavaScript');
scriptTag.setAttribute('type', 'text/javascript');
// Write the needed functions into a new script tag
scriptTag.innerHTML = 'var xmlhttp, xmlhttp2;\n\n' + 'setTimeout("addUIElements();", 100);\n\n' +
                      getBalancedResources   + '\n\n' + onResponse + '\n\n' + onResponse2 + '\n\n' +
                      getVillageLinkByCoords + '\n\n' + getVillageLinkByName + '\n\n' + addUIElements;
document.getElementsByTagName('body')[0].appendChild(scriptTag);

scriptTag = document.createElement('script');
scriptTag.setAttribute('language', 'JavaScript');
scriptTag.setAttribute('type', 'text/javascript');
scriptTag.setAttribute('src', 'http://code.jquery.com/jquery-latest.js');
document.getElementsByTagName('head')[0].appendChild(scriptTag);

function addUIElements()
{
   var sendForm = document.forms[0];
   var tmpTable = document.forms[0].childNodes[3];
   var newDiv   = document.createElement('div');
   newDiv.innerHTML = 'Balance: <input type="text" size="6" id="balanceAmount" tabindex="50" />' +
                      '<input type="button" id="btnBalance" value="Go" onClick="getBalancedResources();" tabindex="51"/>';
   sendForm.insertBefore(newDiv, tmpTable.nextSibling);
}

function getBalancedResources()
{
   document.getElementById('btnBalance').disabled = true;
   var villageLink = getVillageLinkByCoords(document.getElementsByName('x')[0].value,
                                            document.getElementsByName('y')[0].value);
   if(villageLink.length == 0)
   {
      villageLink = getVillageLinkByName(document.getElementsByName('dname')[0].value);
      if(villageLink.length == 0)
      {
         alert('You must enter either the village\'s coordinates or its name.');
         return;
      }
   }
   
   // Go to the other village's page and get it's resource counts
   xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = onResponse;
   xmlhttp.open("GET", villageLink, true);
   xmlhttp.send(null);
}

function onResponse2()
{
   if(xmlhttp2.readyState != 4) return;
   if(xmlhttp2.status != 200)
   {
      alert("Problem retrieving XML data");
      return;
   }
   
   document.getElementById('btnBalance').value = 'Ready';
   document.getElementById('btnBalance').disabled = false;
}

function onResponse()
{
   if(xmlhttp.readyState != 4) return;
   if(xmlhttp.status != 200)
   {
      alert("Problem retrieving XML data");
      return;
   }
   
   // Create a hidden DIV tag to store the remove resource table
   var secretDiv = document.createElement('div');
   secretDiv.id = 'secretDiv';
   secretDiv.style.display = 'none';
   document.getElementsByTagName('body')[0].appendChild(secretDiv);
   
   // Parse out the resource table HTML text
   var resTableText = xmlhttp.responseText + '';
   resTableText = resTableText.substr(resTableText.indexOf('<div id="lres0">'));
   resTableText = resTableText.substr(0, resTableText.indexOf('</div>'));
   resTableText = resTableText.substr(17);
   
   // Store the remove resource table in the hidden DIV
   secretDiv.innerHTML = resTableText;
   
   var locSendResTable = document.forms[0].childNodes[3].rows[0].childNodes[1].childNodes[1];
   
   var remResourceTable = secretDiv.childNodes[0];
   var locRes = document.getElementById('lres0').childNodes[1].rows[0];
   
   var remLumber, remClay, remIron, remCrop;
   var balanceAmount = parseInt(document.getElementById('balanceAmount').value);
   
   var txt;
   var result;
   
   txt = remResourceTable.rows[0].cells[1].firstChild.nodeValue; // get the whole string
   txt = txt.substring(0, txt.indexOf('/')); // get only the first number (before the '/')
   remLumber = parseInt(txt);
   result = balanceAmount - remLumber;
   document.getElementById('r1').value = (result > 0 ? result : '0');
   
   txt = remResourceTable.rows[0].cells[3].firstChild.nodeValue;
   txt = txt.substring(0, txt.indexOf('/'));
   remClay = parseInt(txt);
   result = balanceAmount - remClay;
   document.getElementById('r2').value = (result > 0 ? result : '0');
   
   txt = remResourceTable.rows[0].cells[5].firstChild.nodeValue;
   txt = txt.substring(0, txt.indexOf('/'));
   remIron= parseInt(txt);
   result = balanceAmount - remIron;
   document.getElementById('r3').value = (result > 0 ? result : '0');
   
   txt = remResourceTable.rows[0].cells[7].firstChild.nodeValue;
   txt = txt.substring(0, txt.indexOf('/'));
   remCrop = parseInt(txt);
   result = balanceAmount - remCrop;
   document.getElementById('r4').value = (result > 0 ? result : '0');
   
   // Reload this same page so everything is messed up in the server variables
   var curVillageLink = $('a.active_vl')[0].href;
   xmlhttp2 = new XMLHttpRequest();
   xmlhttp2.onreadystatechange = onResponse2;
   xmlhttp2.open("GET", curVillageLink, true);
   xmlhttp2.send(null);
}

function getVillageLinkByCoords(xCoord, yCoord)
{
   var vilTable = $('#lright1 table.f10')[0];
   var coordTable, row;
   var testXCoord, testYCoord;
   var temp, villageLink = '';
   
   // Search the village table for the one that matches the given coordinates and return the URL to that village
   for(var vilIndex=0; vilIndex<vilTable.rows.length; vilIndex++)
   {
      row = vilTable.rows[vilIndex];
      coordTable = row.cells[1].firstChild;
      testXCoord = coordTable.rows[0].cells[0].firstChild.nodeValue.substr(1);
      temp = coordTable.rows[0].cells[2].firstChild.nodeValue;
      testYCoord = temp.substr(0, temp.length - 1);
      
      if(xCoord == testXCoord && yCoord == testYCoord)
      {
         villageLink = row.cells[0].childNodes[2].href;
         break;
      }
   }
   
   return villageLink;
}

function getVillageLinkByName(vilName)
{
   var vilTable = $('#lright1 table.f10')[0];
   var row;
   var tmpVilName, villageLink = '';
   
   // Search the village table for the one that matches the given coordinates and return the URL to that village
   for(var vilIndex=0; vilIndex<vilTable.rows.length; vilIndex++)
   {
      row  = vilTable.rows[vilIndex];
      tmpVilName = row.firstChild.lastChild.firstChild.nodeValue;
      
      if(vilName == tmpVilName)
      {
         villageLink = row.cells[0].childNodes[2].href;
         break;
      }
   }
   
   return villageLink;
}