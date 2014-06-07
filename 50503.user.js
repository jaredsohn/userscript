// ==UserScript==
// @name          TW(NL) Dorpenaantal bij spelersinfo
// @namespace     c1b1.de
// @include       http://nl*.tribalwars.nl/game.php*screen=info_player*
// ==/UserScript==

// ds.countVillagesPlayerInfo.user.js

// Translated by BeNnOo.

// Version 1.0

// (c) C1B1SE / c1b1.de

var elist = findByInner(document,'Coordinaten')[0].parentNode.parentNode.getElementsByTagName('tr');
var villages = elist.length - 1;
elist[0].getElementsByTagName('th')[0].firstChild.appendData(' ('+villages+')');
for(var i = 1, len = elist.length, sum = 0; len > i; sum += parseInt(grabText(elist[i++].getElementsByTagName('td')[2],1)));
elist[0].getElementsByTagName('th')[2].setAttribute('title','Schnitt: '+Math.round(sum/villages,3));

function findByInner(obj,value)
    {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++)
      {
      if(obj.getElementsByTagName('*')[i].firstChild)
        {
        if(obj.getElementsByTagName('*')[i].firstChild.data)
          {
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1)
            {
            list[a] = obj.getElementsByTagName('*')[i];
            a++;
            }
          }
        }
      }
    list['length'] = a;
    return list;
    }

function grabText(node,maxDepth)
    {
    if(3 == node.nodeType)
      return node.nodeValue;
    else if((1 == node.nodeType) && (0 < maxDepth))
      {
      var result = '';
      for(var i = 0; i < node.childNodes.length; i++)
        {
        result += grabText(node.childNodes[i],maxDepth - 1);
        }
      return result;
      }
    return '';
    }