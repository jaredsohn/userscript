// ==UserScript==
// @name           facebook-shs
// @namespace      IndigenousTweets.com
// @description    Translate Facebook into Secwepemctsín
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.2
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-09-18
// Translations:   Neskie Manuel, Gabe Archie, Carl Archie

/*
 *  Copyright 2012 Kevin Scannell
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
*/


var tags = new Array();
tags.push('h4');     // Sponsored, Ticker, ...
tags.push('h6');     // %a commented on %a.
tags.push('label');  // Comment
tags.push('a');      // many... (should do last for "context sensitive" stuff)

var divclasses = new Array();
divclasses.push('innerWrap');  // Write a comment... <textarea>
//divclasses.push('UIImageBlock_Content UIImageBlock_ICON_Content');  // 2 people like this
divclasses.push('_8m _8u'); // 2 people like this (etc.)
//divclasses.push('_29j _29k'); // 2 people like this (etc.)
//divclasses.push('-cx-PRIVATE-uiImageBlockDeprecated__iconContent -cx-PRIVATE-uiImageBlockDeprecated__content'); // 2 people like this (etc.)
//divclasses.push('-cx-PRIVATE-uiImageBlockDeprecated__iconContent _29j -cx-PRIVATE-uiImageBlockDeprecated__content _29k'); // 2 people like this (etc.)
//divclasses.push('commentActions fsm fwn fcg'); // time stamps on comments
//divclasses.push('fsm fwn fcg');  // By:
//divclasses.push('uiImageBlockContent uiImageBlockSmallContent');  // "near"

var spanclasses = new Array();
spanclasses.push('default_message');  // Like/Dislike
spanclasses.push('saving_message');   // Like/Dislike
spanclasses.push('uiStreamSource');   // %T near %a

// Replace the search string with the translated string
function r(dd, s, t) {
    if (s == t) {
        return (dd);
    } else {
        var RegExpr = new RegExp(s, "g");
        return (dd.replace(RegExpr, t));
    }
}

function translate(x) {
  d = x;
// Translations go here
  d = r(d, '(^|="|>)<span[^>]+>You and </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"ke ell "+"$2"+" lestés ye7éne");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+>, </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> and </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"$2"+", "+"$3"+" ell "+"$4"+" lestéses");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> and </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"$2"+" ell "+"$3"+" lestéses");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) and (<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ell "+"$3"+" milct.s "+"$4");
  d = r(d, '(^|="|>)About(?=($|"|<))', "$1"+"t̓ékwelc");
  d = r(d, '(^|="|>)about an hour ago(?=($|"|<))', "$1"+"le q̓7áses");
  d = r(d, '(^|="|>)Account Settings(?=($|"|<))', "$1"+"n7ek̓");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) commented on a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" tsunses re "+"$3");
  d = r(d, '(^|="|>)Activity Log(?=($|"|<))', "$1"+"tsúwet te stsq̓ey̓");
  d = r(d, '(^|="|>)Add Friend(?=($|"|<))', "$1"+"ma7 q̓atác te stemét");
  d = r(d, '(^|="|>)Add Photo / Video(?=($|"|<))', "$1"+"ma7 q̓atác te spiqw");
  d = r(d, '(^|="|>)a few seconds ago(?=($|"|<))', "$1"+"tsw7ay");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" lestéses te "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) likes a (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" lestéses "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> likes this\.</span>(?=($|"|<))', "$1"+"$2"+" lestéses ye7éne");
  d = r(d, '(^|="|>)(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> like this\.</span>(?=($|"|<))', "$1"+"$2"+" lestéses");
  d = r(d, '(^|>)a link(?=($|<))', "$1"+"yegímen");
  d = r(d, '(^|="|>)Apps and Games(?=($|"|<))', "$1"+"Séyse");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) shared (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" m-milct.s "+"$3");
  d = r(d, '(^|="|>)Ask Question(?=($|"|<))', "$1"+"Séwem");
  d = r(d, '(^|="|>)Born(?=($|"|<))', "$1"+"sitq̓t ne k̓últ-ucw");
  d = r(d, '(^|="|>)By:(?=($|"|<))', "$1"+"tel-");
  d = r(d, '(^|="|>)Close(?=($|"|<))', "$1"+"cálem");
  d = r(d, '(^|="|>)Close Friends(?=($|"|<))', "$1"+"k̓wséltkten");
  d = r(d, '(^|="|>)Comment(?=($|"|<))', "$1"+"me7 lexéxyen̓");
  d = r(d, '(^|="|>)English \\(US\\)(?=($|"|<))', "$1"+"Secwepemctsín");
  d = r(d, '(^|="|>)Enter a friend\'s name or email address(?=($|"|<))', "$1"+"Q’yentéke re skwest ne7ene");
  d = r(d, '(^|="|>)Events(?=($|"|<))', "$1"+"Kek̓tésq̓t");
  d = r(d, '(^|="|>)Family(?=($|"|<))', "$1"+"Nek̓w7úsem");
  d = r(d, '(^|="|>)FAVORITES(?=($|"|<))', "$1"+"sxwixwyém");
  d = r(d, '(^|="|>)Friends(?=($|"|<))', "$1"+"Kweselkten");
  d = r(d, '(^|="|>)FRIENDS(?=($|"|<))', "$1"+"KWESELKTEN");
  d = r(d, '(^|="|>)GROUPS(?=($|"|<))', "$1"+"Nek̓w7úsems");
  d = r(d, '(^|="|>)Help(?=($|"|<))', "$1"+"knúcwem");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Tsitcw");
  d = r(d, '(^|="|>)Like(?=($|"|<))', "$1"+"Xwexwisten");
  d = r(d, '(^|="|>)Likes(?=($|"|<))', "$1"+"Xwexwistens");
  d = r(d, '(^|="|>)Like This Page(?=($|"|<))', "$1"+"xwexwísten re stsq’eý");
  d = r(d, '(^|="|>)Map(?=($|"|<))', "$1"+"Tk’meqs");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"tsítslem te nekw7usem");
  d = r(d, '(^|="|>)News Feed(?=($|"|<))', "$1"+"Lexeyem");
  d = r(d, '(^|="|>)Not Now(?=($|"|<))', "$1"+"ta7ks pyin");
  d = r(d, '(^|="|>)Now(?=($|"|<))', "$1"+"pyin");
  d = r(d, '(^|="|>)Photo(?=($|"|<))', "$1"+"spiqw");
  d = r(d, '(^|="|>)Photos(?=($|"|<))', "$1"+"spipíqw");
  d = r(d, '(^|="|>)See All(?=($|"|<))', "$1"+"Wikts r Xwexweyt");
  d = r(d, '(^|="|>)Send(?=($|"|<))', "$1"+"Tektal̓menékstmens");
  d = r(d, '(^|="|>)Share(?=($|"|<))', "$1"+"Milct.s");
  d = r(d, '(^|="|>)Welcome(?=($|"|<))', "$1"+"Tsucwmíntlmen");
  d = r(d, '(^|="|>)What\'s on your mind\\?(?=($|"|<))', "$1"+"Stém̓i ke7 petínesme?");
  d = r(d, '(^|="|>)Yesterday(?=($|"|<))', "$1"+"Le pexwéyt");
  d = r(d, '(^|="|>)Yesterday at ([^<"]+)(?=($|"|<))', "$1"+"Le pexwéyt te");
  d = r(d, '(^|="|>)<span[^>]+>You like this\.</span>(?=($|"|<))', "$1"+"lestéts-ken");
  d = r(d, '(^|="|>)January(?=($|"|<))', "$1"+"pellkwet̓mín");
  d = r(d, '(^|="|>)February(?=($|"|<))', "$1"+"Pup");
  d = r(d, '(^|="|>)March(?=($|"|<))', "$1"+"pelltkélayiten");
  d = r(d, '(^|="|>)April(?=($|"|<))', "$1"+"pell-tsek̓úlecwten");
  d = r(d, '(^|="|>)October(?=($|"|<))', "$1"+"Pesllwélsten");
  d = r(d, '(^|="|>)Friday(?=($|"|<))', "$1"+"Stselkstésq̓t");
  d = r(d, '(^|="|>)Saturday(?=($|"|<))', "$1"+"Stekmekstesq̓t");
  d = r(d, '(^|>)photo(?=($|<))', "$1"+"spiqw");
  return d;
}

function translateOnInsert( node ) {

  //var logmsg = 'inserted a ' + node.nodeName + ' node; untranslated elements: ';
  for (n = 0; n < tags.length; n++) {
    var tagmatches = node.getElementsByTagName(tags[n]);
    for ( i = 0; i < tagmatches.length; i++ ) {
      // innerHTML often empty (never null)
      if (!tagmatches[i].hasAttribute('indigenous') &&
           tagmatches[i].innerHTML != '') {
        // logmsg = logmsg + tagmatches[i].nodeName + ' ';
        tagmatches[i].innerHTML = translate(tagmatches[i].innerHTML);
        tagmatches[i].setAttribute('indigenous', true);
      }
    }
  }

  var divs = node.getElementsByTagName('div');
  for (i = 0; i < divs.length; i++ ) {
    if (!divs[i].hasAttribute('indigenous')) {
      for (n = 0; n < divclasses.length; n++) {
        if (divs[i].className == divclasses[n]) {
          // logmsg = logmsg + 'DIV.' + divclasses[n] + ' ';
          divs[i].innerHTML = translate(divs[i].innerHTML);
          divs[i].setAttribute('indigenous', true);
          break;
        }
      }
    }
  }

  var spans = node.getElementsByTagName('span');
  for (i = 0; i < spans.length; i++ ) {
    if (!spans[i].hasAttribute('indigenous')) {
      for (n = 0; n < spanclasses.length; n++) {
        if (spans[i].className == spanclasses[n]) {
          // logmsg = logmsg + 'SPAN.' + spanclasses[n] + ' ';
          spans[i].innerHTML = translate(spans[i].innerHTML);
          spans[i].setAttribute('indigenous', true);
          break;
        }
      }
    }
  }
  // GM_log(logmsg);
}

// This was (only) needed to handle updates to time stamps
function listen_for_change(evt)
{
  var node = evt.target;
  //GM_log('in change node, data='+node.data+'; was='+evt.prevValue);
  document.body.removeEventListener( 'DOMCharacterDataModified', listen_for_change, false );
  node.data = translate(node.data);
  document.body.addEventListener( 'DOMCharacterDataModified', listen_for_change, false );
}

function listen_for_add(evt)
{
  var node = evt.target;
  if (node.nodeType == document.ELEMENT_NODE &&
      node.nodeName != 'SCRIPT' &&
      node.nodeName != 'INPUT') {
    document.body.removeEventListener( 'DOMNodeInserted', listen_for_add, false );
    translateOnInsert(node);
    document.body.addEventListener( 'DOMNodeInserted', listen_for_add, false );
  }
  else if (node.nodeType == document.TEXT_NODE) { // time stamps only
    document.body.removeEventListener( 'DOMNodeInserted', listen_for_add, false );
    node.data = translate(node.data);
    document.body.addEventListener( 'DOMNodeInserted', listen_for_add, false );
  }
}

function initme()
{
  document.body.addEventListener( 'DOMNodeInserted', listen_for_add, false );
  // document.body.addEventListener( 'DOMCharacterDataModified', listen_for_change, false );
  document.body.innerHTML = translate(document.body.innerHTML);
}

document.addEventListener( "DOMContentLoaded", initme, false);
