// ==UserScript==
// @name          Partyfans zentrieren
// @version       1.4
// @author        Samuel Essig (http://c1b1.de)
// @description   Zentriert die gesamte Partyfans Seite, Greasemonkey und Opera; Suchfunktion für Freundesliste
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     2009, Samuel Essig (http://c1b1.de)
// @license       CC Attribution-Noncommercial-Share Alike 3.0 Germany; http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode
// @include        http://www.partyfans.com/*
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


var sw = window.opera?window:unsafeWindow;

function $(id) { return document.getElementById(id); };
function tag(name, parent)
  {
  if(!parent)
    return document.getElementsByTagName(name);
  return parent.getElementsByTagName(name);
  };
function n(type,attrs,evt,html,args)
  {
  var e = document.createElement(type);
  if(attrs)
    for(var attr in attrs)
      if(attr == 'style' && typeof(attrs[attr]) == 'object')
        for(var property in attrs[attr])
          e.style[property] = attrs[attr][property];
      else
        e.setAttribute(attr,attrs[attr]);
  if(evt)
    e.addEventListener(evt[0],evt[1],evt[2]);
  if(html)
    e.innerHTML = html;
  if(html === false)
    for(var i = 4; i < arguments.length; i++)
      if(!arguments[i].nodeType)
        e.appendChild(document.createTextNode(arguments[i]));
      else
        e.appendChild(arguments[i]);
  return e;
  };
function getChilds(mother,tagname)
  {
  if(tagname)
    tagname = tagname.toUpperCase;
  var element = mother.firstChild;
  var childs = new Array();
  while(element)
    {
    if((tagname && element.tagName && element.tagName.toUpperCase == tagname) || (!tagname && element.tagName))
      childs.push(element);
    element = element.nextSibling;
    }
  return childs;
  };
function removeChilds(obj)
  {
  while(obj.firstChild)
    obj.removeChild(obj.firstChild);
  }


var bgArray = new Array();

var dest = 0;
var dest_match = document.location.href.match(/dest=(\d+)/);
if(dest_match)
 dest = dest_match[1]?parseInt(dest_match[1]):0;





// Center page:
if($('topFrame'))
  {
  var width = $('topFrame').clientWidth;
  var main = n('div',{'style' : 'margin-left:auto; margin-right:auto; width:'+width+'px' })
  var center_page = n('div',{'id':'partfans_center_page_script_center_page','style' : 'position:relative; left:0px; top:0px;' });

  var elist = getChilds(tag('body')[0]);
  for(var i = 0, len = elist.length; len > i; i++)
    {
    center_page.appendChild(elist[i]);
    };

  main.appendChild(center_page);
  tag('body')[0].appendChild(main);

  function x() {
  if($('stickyadbanner'))
    {
    $('stickyadbanner').style.position = 'absolute';
    }; };

  var id = window.setInterval(x,700);


  // Blitzgrüße
  if(window.opera)
    {
    function handler() {
      if(this.readyState == 4 && this.status == 200) {
        if(this.responseText) {
          eval(this.responseText);
          showBGTimeline();
          }
        }
      };
    var request = XMLHttpRequest();
    request.onreadystatechange = handler;
    request.open("GET", "http://www.partyfans.com/community/getBGs.php");
    request.send();
    }
  else
    {
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://www.partyfans.com/community/getBGs.php',
      onload: function(response) {
        eval(response.responseText);
        showBGTimeline();
        }
      });
    }

  };


var friendslist = [];
var originalTable = false;
if(dest == 314 && $('nametab')) // Freunde
  {
  // Add search field
  var input = document.createElement('input');
  input.type = 'text';
  input.value = 'Suchbegriff';
  input.id = 'search_friends';
  input.addEventListener('keyup',reorderFriends,false);
  input.addEventListener('click',function() { if(this.value == 'Suchbegriff') { this.value = ''; this.style.color = 'White'; }},false);
  input.setAttribute('style','margin-left:15px; background:Silver; border:none; color: #dddddd; font-weight: bold; font-family:Arial; ');
  document.getElementsByClassName('tabRight')[0].getElementsByTagName('td')[0].appendChild(input);


  if($('bildertab').style.display != 'none')  // Details tab ist active
    {
    var span = document.createElement('span');
    span.setAttribute('style','margin-left:15px; color:Crimson; font-weight: bold; font-family:Arial; ');
    span.appendChild(document.createTextNode('Funktioniert nur auf der "Nur Namen" Seite!'));
    document.getElementsByClassName('tabRight')[0].getElementsByTagName('td')[0].appendChild(span);

    $('oBild_link').addEventListener('click',function() { window.setTimeout(function() { document.location.href = 'http://www.partyfans.com/index.php?dest=314'; },1500); },false);

    input.disabled = true;

    }
  else     // "Nur Namen" tab is aktice
    {
    initOrderFriends();
    }
  }


function initOrderFriends()
  {
  // Collect Friends
  var table = $('nametab');
  originalTable = table.cloneNode(true);
  var tr = table.getElementsByTagName('tr');
  for(var i = 0; i < tr.length; i++)
    {
    var td = tr[i].getElementsByTagName('td');
    if(!td)
      continue;
    for(var x = 0; x < td.length; x++)
      {
      if(td[x].width == '1%')
        continue; // Skip icons
      var name = td[x].getElementsByTagName('a')[0].firstChild.nodeValue;
      friendslist.push({name:name.toLowerCase(),element: td[x].cloneNode(true)});
      }
    }
  }


function reorderFriends(ev)
  {
  if($('bildertab').style.display != 'none')
    {
    return;
    }

  this.value = this.value.replace('Suchbegriff','');

  if(! friendslist || ! originalTable)
    return;
  var term = this.value.toLowerCase();
  var table = $('nametab');

  if(term == '')
    {
    table.parentNode.replaceChild(originalTable,table);
    originalTable = originalTable.cloneNode(true);
    this.value = 'Suchbegriff';
    this.style.color = '#dddddd';
    return;
    }


  // Empty Table
  removeChilds(table);


  // Create New Table

  var tr = document.createElement('tr');
  var item = 0;
  for(var i in friendslist)
    {
    if(!!~ friendslist[i].name.indexOf(term))
      {
      if(item == 4)
        {
        table.appendChild(tr);
        var tr = document.createElement('tr');
        item = 0;
        }
      tr.appendChild(friendslist[i].element);
      item++
      }
    }
  table.appendChild(tr);
  }


function getPic(ar)
  {
  var img = n('img',{'alt':'Foto von '+ar[1],'style':'max-width:70px; max-height:70px; border:2px Solid Black;'});
  if (ar[4] == "1")
    {
    img.src = "http://static.partyfans.com/com/up/tn3/"+ar[2]+".jpg";
    }
  else if (ar[4]=="2")
    {
    img.src = "http://static.partyfans.com/pics/layout/sections/kein_foto/m3.gif";
    }
  else if (ar[4]=="3")
    {
    img.src = "http://static.partyfans.com/pics/layout/sections/kein_foto/w3.gif";
    }
  else
    {
    img.src = "http://static.partyfans.com/pics/layout/sections/tn3_keinfoto.gif";
    }
  return img;
  }

var int_id;
function showBGTimeline()
  {
  var holder = n('div',{'id':'partfans_center_page_script_BG_holder','style':'overflow:hidden; height:700px; background:#F4F4F4; position:absolute; left:-400px; width:350px; top:10px; border:2px solid Black; '});
  $('partfans_center_page_script_center_page').appendChild(holder);

  for(var i = 0; i < bgArray.length; i++)
    {
    if(!bgArray[i])
      continue;

    var img = getPic(bgArray[i]);
    var a = n('a',{'rel':bgArray[i][2],'href':'http://www.partyfans.com/community/details.php?detid='+bgArray[i][2],'style':'text-align:center; float:left; width:70px;'},['click',function(e) { e.preventDefault(); sw.openWind(this.rel); },false],false,img);

    var p = n('p',{'style':'float:left; margin-left:10px; margin-top:0px; max-width:250px; font-family:Arial; '});
    p.appendChild(n('b',false,false,false,bgArray[i][1]+' ('+bgArray[i][3]+')'));
    p.appendChild(n('br'));
    p.appendChild(document.createTextNode(bgArray[i][0]));

    var update = n('div',{'style':'margin-bottom:5px; '},false,false,a,p,n('br',{'style':'clear:left; '}));

    holder.appendChild(update);
    }

  int_id = setInterval(scrollBGTimeline,10);
  holder.addEventListener('click',function()
    {
    if(this.style.overflow == 'hidden')
      {
      var scrollTop = this.scrollTop;
      clearInterval(int_id);
      this.style.overflow = 'auto';
      this.scrollTop = scrollTop;
      }
    else
      {
      var scrollTop = this.scrollTop;
      clearInterval(int_id);
      this.style.overflow = 'hidden';
      int_id = setInterval(scrollBGTimeline,10);
      this.scrollTop = scrollTop;
      }


    } ,false);

  }

var direction = 1;
function scrollBGTimeline(x)
  {
  var element = $('partfans_center_page_script_BG_holder');;
  element.scrollTop += 1*direction;
  if(element.scrollTop >= element.scrollHeight-element.clientHeight-2 || element.scrollTop <= 0)
    direction *= -1;
  }
