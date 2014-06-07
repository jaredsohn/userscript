// ==UserScript==
// @name        Linksbase
// @description	Скрипт установки заметок на страницах, показа посещённых страниц.
// @namespace   PSVScripts
// @version     2.0.2
// @grant	GM_registerMenuCommand
// @grant	GM_xmlhttpRequest
// @grant	GM_setValue
// @grant	GM_getValue
// @grant	GM_deleteValue
// @grant	GM_getResourceURL
// @resource	iconFav		http://userscripts.org/images/heart.png
// @resource	iconNote	http://ment-prav.narod.ru/images/note.png
// @resource	iconVisit	http://www.lboro.ac.uk/departments/sbe/images/icon-external-link.png
// ==/UserScript==


//fav: http://www.marinemegastore.com/images/category/favourite.gif

var IconFavCont = GM_getResourceURL('iconFav'); // '!\u2665';
var IconNoteCont = GM_getResourceURL('iconNote'); // '!\u270D'; // 
var IconNoteVisit = GM_getResourceURL('iconVisit'); // '!\u2713'; // 


var UrlParser = new RegExp("^(([^:/\\?#]+):)?(//(([^:/\\?#]*)(?::([^/\\?#]*))?))?([^\\?#]*)(\\?([^#]*))?(#(.*))?$");

var  DispList = document.createElement('div');
var locHref = PrepareHref(document.location.href);
DispList.style.cssText = 'width: auto; min-width:300px; max-width:700px; z-order: 1200; font-size: small; max-height: 12em; overflow-x: hidden; overflow-y: auto; padding: 7px; background-color: #FFC; display: block; border: 1px #339 solid; position: fixed; left: 20px; top: 100px;';


function CheckParentFor(aNode, ParNode)
{
 do{
   if (aNode == ParNode) return true;
   aNode = aNode.parentNode;
 }while (aNode != document.documentElement);
 return false;
}

if (window.Event)
  document.captureEvents(Event.MOUSEUP);
document.onmouseup = displaySel;

function displaySel(e)
{
  if (e.button == 2) return true;

  var sel = window.getSelection();
  if (sel.toString () != '')
  {
    // sel.getRangeAt(0);
    // if (NotePage(window.getSelection()))
    //  window.getSelection().removeAllRanges();
    //e.target.innerHTML = '@'+e.target.innerHTML;
  }
}

var visited = new Array();
var notes   = new Array();
var favorites = new Array();
var ShownLinks = null; 
Array.prototype.indexOf = IndexArray;
Array.prototype.Find = FindArray;

visited = JSON.parse(GM_getValue('visited', JSON.stringify(visited)));
notes = JSON.parse(GM_getValue('notes', JSON.stringify(notes)));
favorites = JSON.parse(GM_getValue('favorites', JSON.stringify(favorites)));

GM_registerMenuCommand('Заметка страницы', NotePage, 'n', 'alt', 'n');
GM_registerMenuCommand('Страницу в избранное', GM_Mark);
GM_registerMenuCommand('Показать заметки', GM_ShowNotes);
//GM_registerMenuCommand('Сбросить историю посещений', ClearHistory);
document.documentElement.addEventListener('keydown', OnKeyDown, false);

function ListToText(aList, listIcon, maxLen)
{
  var text = '', arow = '';
  var iconText = '';
  if (listIcon)
    iconText = '<img src="'+listIcon+'"/> ';

  if (aList)
  for (var n = 0; n< aList.length; n++)
  {
     if (typeof(aList[n]) == 'object')
     {
       if (aList[n].length == 3)
         arow = aList[n][1]+' ('+aList[n][2]+')';
       else
         arow = aList[n][1];

       if ((typeof(maxLen) == 'integer') &&(arow.length>maxLen))
         arow = arow.substr(1, maxLen)+'...';
       text += iconText +'<a href="' +aList[n][0] +'" target="_blank">'+arow+'</a><br/>';
     }
  }
  return text;
}

function ToggleList(aList, listIcon)
{
  ToggleText(ListToText(aList, listIcon));
}

function ToggleText(aText, force)
{
  if (force === true)
    document.documentElement.appendChild(DispList)
  else if (force === false)
    DispList.parentNode.removeChild(DispList)
  else
  if (DispList.parentNode)
    DispList.parentNode.removeChild(DispList)
  else
    document.documentElement.appendChild(DispList);
  DispList.innerHTML = '<div style="text-align: right; width: 100%"><a href="#" onclick="var d=this.parentNode.parentNode;d.parentNode.removeChild(d);return false;">закрыть заметку</a></div>'+aText;
}

function GM_ShowNotes()
{
  ToggleText(ListToText(notes, IconNoteCont) 
            +ListToText(favorites, IconFavCont) );
}

function OnKeyDown(e)
{
  if ((e.keyCode == 78) && (e.altKey) && (e.shiftKey)) // N
  {
    GM_ShowNotes();
    return false;
  }

  if ((e.keyCode == 78) && (e.altKey)) // N
  {
    NotePage();
    return false;
  }

  if ((e.keyCode == 67) && (e.altKey)) // C
  {
    DoCheck();
    return false;
  }

  if ((e.altKey) && (e.keyCode == 72)) // H
  {
    ClearHistory();
    return false;
  }

  if ((e.altKey) && (e.keyCode == 77)) // M
  {
    GM_Mark();
    return false;
  }

  if ((e.altKey) && ((e.keyCode == 191)||(e.keyCode == 190))) // ?
  {
    ToggleText('alt+shift+N - Показать заметки<br/>alt+N - Добавить заметку<br/>alt+M - Добавить в избранное');
    return false;
  }

//  if ((e.altKey) && (e.keyCode != 18))
//    alert(e.keyCode);
}

function GM_Mark()
{
  MarkAsFav(locHref);
}

function MarkAsFav(aurl)
{
  var aidx = favorites.Find(aurl, 0);
  if (aidx != -1)
    favorites.splice(aidx, 1)
  else
    favorites.push([aurl, 'Закладка : '+new Date().toLocaleString(), document.title]);
  GM_setValue('favorites', JSON.stringify(favorites));
 
  if (aidx == -1)
    alert('Помечено закладкой'+'\n'+aurl)
  else
    alert('Закладка снята'+'\n'+aurl);
}

function FavnsParse(adom)
{
  var Tables = adom.getElementsByTagName('table');
  var aTable = null;
  var acn = 0;
  var afavs = new Array();

  for (var n = 0; n < Tables.length; n++)
  if (Tables[n].className == 'forumline')
  {
    acn++;
    if (acn == 2) { aTable = Tables[n]; break; };
  }
  if (!aTable) return;
  var rows = aTable.getElementsByTagName('tr');
  for (n = 1; n < rows.length; n++)
  {
    var ah = rows[n].getElementsByTagName('td')[1].getElementsByTagName('a')[0];
    if (ah) afavs.push(ah.href);
  }
  MarkLinks(afavs, IconFavCont, true, 'Избранное');  
}

function onFavnLoadnext(cont)
{
  var dd = new DOMParser();
  var adom = dd.parseFromString(cont,"text/html"); 
  FavnsParse(adom);
}

function onFavnLoad(cont)
{ // id='hplLast'
  var dd = new DOMParser();
  var adom = dd.parseFromString(cont,"text/html"); 

  var totalpages = adom.getElementById('hplLast');
  for (n = 1; n<totalpages.textContent; n++)
  {
    getUrlContentDom('http://www.optolover.com/optolover/vera/Offers.aspx?&Favorite=1&page='+(n), onFavnLoadnext);
  }
  FavnsParse(adom);
}

function getUrlContentDom(url, onDone)
{
  setTimeout(function()
  {
    var text = GM_xmlhttpRequest({
      method : "GET",
      url : url,
      onload : function(x)
        {
           onDone(x.responseText);
        }
    });
  }, 0);
}

if (document.location.host == 'www.optolover.com')
  getUrlContentDom('http://www.optolover.com/optolover/vera/Offers.aspx?Favorite=1', onFavnLoad);

function ClearHistory()
{
  GM_deleteValue('visited');
  alert('История очищена');
  document.location.href = document.location.href;
}

function NotePage(newnote)
{
  var idx = notes.Find(locHref, 0);

  var note = '...';
  if (newnote)
    note = newnote
  else
  if (idx != -1) 
    note = notes[idx][1];

  var sel = window.getSelection();
  if (sel.toString () != '') note = sel.toString();

  note = prompt('Введите заметку о странице\n'+document.title, note);
  if (note === null) return false;
  if (note == '...') return false;
  if ((note === '') && (idx != -1))
  {
    notes.splice(idx,1);
    GM_setValue('notes', JSON.stringify(notes));
    return false;
  }
  if (idx == -1)
    notes.push([locHref, note, document.title])
  else
    notes[idx][1] = note;
  GM_setValue('notes', JSON.stringify(notes));
  return true;
}

function findQRY(qry, name)
{
  for (var n = 0; n<qry.length; n++)
  if (qry[n].split('=')[0] == name)
    return qry[n].split('=')[1];
  return null;
}

function PrepareHref(src)
{  

  if (src.indexOf('play.google')>0)
  {
    var url = UrlParser.exec(src);// parseUri(src);
    if ((url[5]) && (url[5].toLowerCase() == 'play.google.com') && (url[9]))
    {
      var qry1 = findQRY(url[9].toLowerCase().split('&'), 'id');
      if (qry1 != null)
        return url[1]+'//'+url[5]+url[7]+'?id='+qry1;
    }
  }

  if (src.indexOf('tpondemand.com')>0)
  {
    var url = UrlParser.exec(src);// parseUri(src);
    if ((url[5]) && (url[5].toLowerCase() == 'oxygen.tpondemand.com') && (url[11]))
    {
      var qry1 = url[11].split('/')[1];
      if (qry1 != null) //http://oxygen.tpondemand.com/View.aspx?id=3653
        return url[1]+'//'+url[5]+'/View.aspx?id='+qry1;
    }
  }

  return src; 
}

function IndexArray(sVal)
{
  for (var i = 0; i < this.length; i++)
  if (this[i] === sVal)
    return i;
  return -1;
}

function FindArray(sVal, idx, cb=null)
{
  for (var i = 0; i < this.length; i++)
  {
    if ((typeof(this[i]) == 'object') && (this[i][idx] === sVal))
      return i;
    if ((cb!=null) && (typeof(this[i]) == 'object') && cb(this[i][idx], sVal))
      return i;
    if (this[i] === sVal)
      return i;
  }
  return -1;
}

function encode_utf8( s )
{
  return unescape( encodeURIComponent( s ) );
}

var VisitIdx = visited.indexOf(locHref);
if (VisitIdx != -1)
  visited.splice(VisitIdx, 1);
visited.push([locHref, 'Посещено: '+ new Date().toUTCString()]);
GM_setValue('visited', JSON.stringify(visited));

function MarkLinks(list, icon, donew, ahint = 'Страница посещалась')
{
  var returnList = new Array();
  var allLinks = document.getElementsByTagName('a');

  for (var i = 0; i < allLinks.length; i++)
  if (allLinks[i].hasAttribute('href') && (!CheckParentFor(allLinks[i], DispList)))
  {
    var idx = list.Find(PrepareHref(allLinks[i].href), 0);
    if (idx != -1)
    {
      var imgtag = null;
      var imgstag = allLinks[i].firstChild;
      if ((imgstag) && ((imgstag.nodeName == 'IMG')||(imgstag.nodeName == 'SPAN')) && (imgstag.hasAttribute('psvextlnk')))
        imgtag = imgstag;

//      if ((imgstag) && (imgstag.nodeName == 'IMG') && (!imgtag) && (allLinks[i].childNodes.length == 1))
//        return ; // выходим, здесь надо как-то ембедить иконку

      if ((imgtag) && (imgtag.nodeName == 'SPAN') && (icon[0] != '!'))
      {
        imgtag.parentNode.removeChild(imgtag);
        imgtag = null;
      }

      if (!imgtag)
      {
        imgtag = document.createElement('img');
        // imgtag.setAttribute('height', 12);
        // imgtag.setAttribute('width', 12);
        imgtag.style.cssText = 'height: 12px !important; width: 12px !important; display: inline !important; ';
      }

      if (icon[0] == '!')
      {
        if (imgtag.parentNode)
          imgtag.parentNode.removeChild(imgtag);
        imgtag = document.createElement('span');
        imgtag.style.cssText = 'color: #36f; display: inline !important;';
        imgtag.innerHTML = icon.substr(1, icon.length);
      }

      imgtag.setAttribute('psvextlnk', '1');
      imgtag.setAttribute('src', icon);

      var hint = ahint;
      if (typeof(list[idx]) == 'object')
        hint = list[idx][1];
      imgtag.setAttribute('title', hint);

      allLinks[i].insertBefore(imgtag, allLinks[i].firstChild);//.firstChild

      if (!allLinks[i].hasAttribute('title')) 
        allLinks[i].setAttribute('title', hint);

      if (returnList.Find(list[idx][0], 0) == -1)
        returnList.push(list[idx]);
    }
  }
  return returnList;
}

function insertNewLinks(TargetList, SourceList)
{
 for (var i = 0; i < SourceList.length; i++)
 if (TargetList.Find(SourceList[i][0], 0) == -1)
   TargetList.push(SourceList[i]);
 return TargetList;
}

function FilterNewLinks(BigList, NewList)
{
 for (var i = NewList.length-1; i>=0; i--)
 if (BigList.Find(NewList[i][0], 0) != -1)
   NewList.pop(i);
 return NewList;
}

function DoCheck()
{
  Notes = JSON.parse(GM_getValue('notes', JSON.stringify(notes)));
  visited = JSON.parse(GM_getValue('visited', JSON.stringify(visited)));

  var hasLinksTxt = '';
  var HasLinks = new Array;
  var notesShow = false;
  var noteIdx = Notes.Find(locHref, 0);
  if ((noteIdx != -1) && (ShownLinks === null))
  {
    hasLinksTxt += '<img src="'+GM_getResourceURL('iconNote')+'"/> Заметка этой страницы:<br/>'+Notes[noteIdx][1];
    notesShow = true;
  }

  if (ShownLinks === null)
  {
    ShownLinks = new Array();
    ShownLinks.push([locHref]);
  }

  MarkLinks(visited, IconNoteVisit, false);

  HasLinks = MarkLinks(Notes, IconNoteCont, false);
  HasLinks = FilterNewLinks(ShownLinks, HasLinks);
  ShownLinks = insertNewLinks(ShownLinks, HasLinks);
  if (HasLinks.length > 0)
  {
    if (notesShow) hasLinksTxt += '<br/><br/>';
    hasLinksTxt += 'С этой страницы поставлены закладки в:<br/>'+ListToText(HasLinks, IconNoteCont, 90);
    notesShow = true;
  }

  HasLinks = MarkLinks(favorites, IconFavCont, true, 'Избранное');
  HasLinks = FilterNewLinks(ShownLinks, HasLinks);
  ShownLinks = insertNewLinks(ShownLinks, HasLinks);
  if (HasLinks.length > 0)
  {
    if (notesShow) hasLinksTxt += '<br/><br/>';
    hasLinksTxt += 'С этой страницы поставлены закладки в:<br/>'+ListToText(HasLinks, IconFavCont, 90);
    notesShow = true;
  }

  if (notesShow)
    ToggleText(hasLinksTxt, true);
}

DoCheck();
setInterval(DoCheck, 5500);