// ==UserScript==
// @name        Haxed deCunter
// @description  get rid of the cunts on Haxed by blocking their posts to you (by Simon the Scarfe)
// @include      http://www.haxed*
// @include      http://haxed*
// @include      *haxed*
// ==/UserScript==

// ChangeLog:
// v0.1 initial version - simply ignores one hardcoded person
// v0.2 implemented multiple person ignoring
// v0.3 fixed some major bugs - ie recent posts cell occasionally disappearing.
// v0.4 Hardcoding removed, used GM variables for persistent data
// v0.45 Upgraded to cookies for greater flexibility
// v0.5 implemented ignore button
// v0.6 added "cuntify" un-ignorer
// v0.7 added view ignored post link
// v0.75 ignored posts now identifiable by user.
// v0.8 bullshit fix put on bug which meant that someone could be ignored twice. Also cleaned up
//      cookie dupes. Again a fucking UGLY fix. But any better fix would involve a complete rewrite and planning. Yuk.

// Known Bugs:
//  - when viewing ignored post the post doesn't stretch as far on the screen as it might.
//    This is less of a bug, more of a cosmetic issue, and it's not like you really
//    care - you've ignored the bastard and this is probably a one-off thing.

var ignoredPeople = readCookie('ignoreL');
if(ignoredPeople == null)
  ignoredPeople = '';
var backUp = '';
var p, q;

function delDupes(inArray)
{
  for ( p = 0; p < inArray.length; p++ )
  {
      q = p + 1;
      while (q < inArray.length)
      {
        if(inArray[q] == inArray[p])
            inArray[q] = '';
        q++;
      }
  }
}


function generateCookieLink(value,days)
{
    if (days)
    {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    value = backUp + value + '|';
    return 'ignoreL='+value+expires+'; path=/';
}

function readCookie(name)
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++)
    {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function getUser(linkedStr)
{
  linkedStr = String(linkedStr);
  var present = linkedStr.indexOf('user=');
  return linkedStr.substr(present+5, linkedStr.length);
}

if(document.getElementsByTagName("td")[17].className == 'mainMenu')
  document.getElementsByTagName("td")[17].innerHTML += '| <span class="navCellOff" onmouseout="this.className=\'navCellOff\';" onmouseover="this.className=\'navCellOn\';"><a href="#" onClick="document.cookie = \'ignoreL=a; expires=Mon, 04 Jan 1994 02:30:14 GMT; path=/\';window.location.reload(true)" class="menu">CUNTIFY!</a></span>';


var allAs = document.getElementsByTagName('a');
var ignoredArray = new Array();
var i = 0;
var j;
var queried = '';
var toBeDel;
var plusRow;

var hasher = ignoredPeople.indexOf('|');

while ( hasher != -1 )
{
  ignoredArray[i++] = ignoredPeople.substring(0, hasher);
  ignoredPeople = ignoredPeople.substring(hasher+1, ignoredPeople.length);
  hasher = ignoredPeople.indexOf('|');
}

delDupes(ignoredArray);
for(p=0;p<ignoredArray.length;p++)
  if(ignoredArray[p] != '')
      backUp+=ignoredArray[p]+'|';

for (i = 0; i < allAs.length; i++)
  if (allAs[i].name.indexOf('msg')!=-1)
  {
      var user = getUser(allAs[i+1]);
      theLink = '\"' + generateCookieLink(user, 1000) + '\"';

      allAs[i].nextSibling.nextSibling.childNodes[1].firstChild.childNodes[1].childNodes[1].childNodes[1].firstChild.childNodes[1].innerHTML += "<br /><br /><font size=1><a href='#' onClick='document.cookie = " + theLink + ";window.location.reload(true)'>[Ignore this cunt]</a></font>";
  }

for (i = 0; i < allAs.length; i++)
{
  var currLink = allAs.item(i);

  for(j = 0; j < ignoredArray.length; j++)
  {
    if(ignoredArray[j] != '')
    {
    queried = 'user='+ignoredArray[j];

    if(currLink)
    if(String(currLink).indexOf(queried) != -1)
        if(allAs[i-1].name!='')
          if(allAs[i-1].parentNode.parentNode.nodeName == "TR")
          {
              toBeDel = allAs[i-1].parentNode.parentNode;
              toBeDel.style.display = 'none';
              plusRow = document.createElement('TR');
              newCell = document.createElement('TD');
              plusRow.bgColor = 'ffffff';
              plusRow.id = 'ignored'+i;
              plusRow.insertCell(newCell);
              plusRow.firstChild.style.padding = '5';
              plusRow.firstChild.style.paddingLeft = '30';
              plusRow.firstChild.innerHTML = '<a href="#ignored'+ i + '" onClick="this.parentNode.parentNode.style.display=\'none\';this.parentNode.parentNode.nextSibling.style.display = \'block\';this.parentNode.parentNode.nextSibling.style.display = \'block\' ">[+]</a> See what this cunt (' + ignoredArray[j] + ') has to say';
              i++;
              toBeDel.parentNode.insertBefore(plusRow, toBeDel);
          }
    }
  }
}