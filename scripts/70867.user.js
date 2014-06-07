// ==UserScript==
// @name           DS SortMailGroups
// @namespace      c1b1.de
// @description    Die Stämme: Sortiert die Nachrichtengruppen alphabetisch.
// @version        1.3
// @author         Samuel Essig (http://c1b1.de)
// @homepage       http://c1b1.de
// @copyright      2010, Samuel Essig (http://c1b1.de)
// @license        CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include        http://*.die-staemme.de/game.php*screen=mail*
// ==/UserScript==


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

function extractText(node,type)
  {
  switch(type)
    {
    case 'maintable':
      var textnode = node;
      var text = textnode.textContent.substring(1,textnode.textContent.length-1);   // textContent cause of  "new mail" pictogram
      if(node.getElementsByTagName('IMG')[0])    // Remove Space cause of  "new mail" pictogram
        text = text.substring(1);
      break;
    case 'select':
      var textnode = node.firstChild;
      var text = textnode.nodeValue;
      break;
    case 'popup':
      var textnode = node.getElementsByTagName('a')[0].firstChild;
      var text = textnode.nodeValue;
      break;
    case 'panel':
      var input = node.getElementsByTagName('input')[0];
      var text = input.value;
      break;
    }
  text = text.toLowerCase();
  text.trim();
  return text;
  }

function sortChilds(node,type)
  {
  var i = 0;

  switch(type)
    {
    case 'maintable':
      var items = node.getElementsByTagName('*');
      break;
    case 'select':
      var items = node.getElementsByTagName('option');
      break;
    case 'popup':
      var items = node.getElementsByTagName('tr');
      break;
    case 'panel':
      var items = node.getElementsByTagName('tr');
      i = 1;
      break;
    default:
      return;
    }

  var tmp = new Array();

  for(true, len = items.length; i < len; i++)
    {
    GM_log(items[i].tagName);
    if(type == 'maintable' && items[i].tagName == 'IMG') // Sort out "new mail" pictogram
      continue;
    var str = extractText(items[i],type);
    if(str != 'posteingang')
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
    node.appendChild(items[i].obj);
    }

  }


//################# Procedural Code ##################

var maintablepage = false;
var table = false;

try {
  table = document.getElementsByClassName('main')[0].getElementsByClassName('vis')[1];
  if(document.getElementsByClassName('main')[0].getElementsByClassName('vis')[2].innerHTML.indexOf('Betreff') != -1)
    {
    maintablepage = true;
    }
  }
catch(e) {}

if(maintablepage)
  {
  // Maintable
  if(table)
    sortChilds(table.getElementsByTagName('td')[0],'maintable');

  // Select Field for Moving
  var select = document.getElementsByName('id_group')[0];
  if(select)
    sortChilds(select,'select');
  }
else if(document.location.href.indexOf('mode=view') != -1)
  {
  // Popup on message view
  var igm_groups = document.getElementById('igm_groups');
  if(igm_groups)
    sortChilds(igm_groups,'popup');
  }
else if(document.location.href.indexOf('mode=groups') != -1)
  {
  // Adminpanel of groups
  var groups = document.getElementById('content_value').getElementsByClassName('vis')[1];
  if(groups)
    sortChilds(groups,'panel');
  }