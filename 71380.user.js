// ==UserScript==
// @name           DS SortFriends
// @namespace      c1b1.de
// @description    Die Stämme: Sortiert die Freundesliste alphabetisch.
// @version        1.0
// @author         Samuel Essig (http://c1b1.de)
// @homepage       http://c1b1.de
// @copyright      2010, Samuel Essig (http://c1b1.de)
// @license        CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include        http://*.die-staemme.de/*screen=mail*
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
    case 'MailPage':
      var text = node.getElementsByTagName('input')[0].value;
      // Remove trailing semicolon
      text = text.substring(0,text.length-1);
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
    case 'MailPage':
      var items = node.getElementsByTagName('tr');
      break;
    default:
      return;
    }

  var tmp = new Array();

  for(true, len = items.length; i < len; i++)
    {
    var str = extractText(items[i],type);
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

var igm_to = document.getElementById('igm_to');
if(igm_to)
  {
  igm_to.addEventListener('DOMSubtreeModified',sortFriends_MailPage,false);
  }



function sortFriends_MailPage(e)
  {
  var igm_to_content = document.getElementById('igm_to_content');
  var table = igm_to_content.getElementsByTagName('tbody')[0];
  if(!table)
    return;
  if(table.id == 'sortedTable')
    return;
  table.id = 'sortedTable';
  sortChilds(table,'MailPage');
  }
