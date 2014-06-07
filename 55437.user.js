// ==UserScript==
// @name          DS SortReportGroups
// @version       1.3
// @author        Samuel Essig (http://c1b1.de)
// @description   Die Stämme: Sortiert die Berichtegruppen in der Berichteübersicht alphabetisch.
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     2009-2010, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include       http://*.die-staemme.de/game.php*screen=report*
// ==/UserScript==

/*

############## Distribution Information ##############

All content by c1b1.de
Do not distribute this script without this logo.

######################## Logo ########################
           ___   __       ___             __
  _____   <  /  / /_     <  /        ____/ /  ___
 / ___/   / /  / __ \    / /        / __  /  / _ \
/ /__    / /  / /_/ /   / /   _    / /_/ /  /  __/
\___/   /_/  /_.___/   /_/   (_)   \__,_/   \___/

######################################################

If you have any questions, comments,
ideas, etc, feel free to contact me
and I will do my best to respond.

         mail:info@c1b1.de

         skype:c1b1_se

         http://c1b1.de

         twitter: http://twitter.com/c1b1se

####################### License ######################

Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode

English Summary of that license:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en

*/

//################### Description ####################

/*

Sortiert die Berichtegruppen in der Berichteübersicht alphabetisch.
Zahlen stehen vor Buchstaben.
Außerdem werden Zahlen ausgewertet d.h. 40 kommt nach 6.
Die Gruppe Neue Berichte (falls vorhanden) bleibt immer an erster Stelle zurück.

Version 1.2:
Das Auswahlfeld bzw. die Auswahlliste beim Verschieben von Berichten wird auch sortiert.

*/



//################ Common Functions ##################

String.prototype.trim = function()
  {
  this.replace(/^\s+/, '').replace(/\s+$/, '');
  return this;
  }
function isInt(x)
  {
  var y = parseInt(x);
  if(isNaN(y))
    return false;
  return x == y && x.toString() == y.toString();
 }


//################ Special Functions #################

function compare(a,b,p)
  {
  var str1 = a.str;
  var str2 = b.str;

  if(!p)
    p = 0;

  if(p == 0 && isInt(str1[0]) && isInt(str2[0]))
    {
    var num1 = parseInt(str1);
    var num2 = parseInt(str2);
    if(num1 > num2)
      return 1;
    else if(num1 < num2)
      return -1;
    return 0;
    }
  else if(p == 0 && isInt(str1[0]))
    {
    return -1;
    }
  else if(p == 0 && isInt(str1[1]))
    {
    return 1;
    }
  else if(!str1[p] && !str2[p])
    {
    return 0;
    }
  else if(!str1[p])
    {
    return -1;
    }
  else if(!str2[p])
    {
    return 1;
    }
  else if(str1.charCodeAt(p) > str2.charCodeAt(p))
    {
    return 1;
    }
  else if(str1.charCodeAt(p) < str2.charCodeAt(p))
    {
    return -1;
    }
  else if(str1.charCodeAt(p) == str2.charCodeAt(p))
    {
    return compare(a,b,++p);
    }
  else
    {
    return 0;
    }

  }

function extractText(node,ext,a)
  {
  if(ext && !a)
    {
    var textnode = node.firstChild;
    var text = textnode.nodeValue;
    }
  else if(ext && a)
    {
    var textnode = node.getElementsByTagName('*')[0].firstChild;
    var text = textnode.nodeValue.substring(2);
    }
  else
    {
    var textnode = node.firstChild;
    var text = textnode.nodeValue.substring(2,textnode.nodeValue.length-2);
    }
  text = text.toLowerCase();
  text.trim();

  return text;
  }

function sortChilds(node,tagname,ext,a)
  {
  var items = node.getElementsByTagName(tagname);

  var tmp = new Array();

  for(var i = 0, len = items.length; i < len; i++)
    {
    var str = extractText(items[i],ext,a);
    if(str != 'neue berichte')
    tmp.push(
      {
        'str' : str,
        'obj' : items[i],
        'toString' : function() { return '[object] { '+this.str+' }'; }
      });
    }
  items = tmp;
  items.sort(compare);

  for(var i = 0, len = items.length; i < len; i++)
    {
    if(ext && a)
      node.appendChild(items[i].obj.parentNode);
    else
      node.appendChild(items[i].obj);
    }

  }


//################# Procedural Code ##################

var scriptpage = false;

var table = document.getElementsByClassName('main')[0].getElementsByClassName('vis')[1];
try {
  if(table.getElementsByTagName('td')[1].getElementsByTagName('a')[0].firstChild.nodeValue.indexOf('Ordner erstellen') != -1 || table.getElementsByTagName('td')[1].getElementsByTagName('a')[0].firstChild.nodeValue.indexOf('Gruppe erstellen') != -1)
    {
    var scriptpage = true;
    }
  }
catch(e) {}

if(scriptpage)
  {
  sortChilds(table.getElementsByTagName('td')[0],'*');

  var select = document.getElementsByName('group_id')[0];
  if(select)
    sortChilds(select,'option',true);
  }
else if(document.location.href.indexOf('mode=move') != -1)
  {
  var tbody = document.getElementsByClassName('main')[0].getElementsByClassName('vis')[1].getElementsByTagName('tbody')[0];
  sortChilds(tbody,'td',true,true);

  }
