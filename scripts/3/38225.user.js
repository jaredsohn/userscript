///////////////////////////////////////////
//
// ==UserScript==
// @name        IC Family Ties
// @author      Momentum
// @version     0.0.7
// @namespace   http://userscripts.org/scripts/show/38225
// @description Links and colors family numbers
// @include     http://www.imperialconflict.com*
// @exclude     http://www.imperialconflict.com/guide*
// @exclude     http://www.imperialconflict.com/*.html
// @exclude     http://www.imperialconflict.com/account.php
// @exclude     http://www.imperialconflict.com/myPlanets.php
// @require     http://sizzlemctwizzle.com/updater.php?id=38225
// ==/UserScript==
//
///////////////////////////////////////////

///////////////////////////////////////////
//
// Copyright (C) 2008 Momentum
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
///////////////////////////////////////////

(function() {try {

  UpdateFamilies = {
    days: 1,
    time: new Date().getTime().toString(),
    reload: false,
    getRelations: function() {
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.imperialconflict.com/relations.php',
        headers: {
          'User-agent': window.navigator.userAgent,
          'Accept': 'text/html',
        },
        onload: function(responseDetails) {
          if (!responseDetails.responseText.match(/<a href=account.php target=_top>Login<\/a>/gi)) {
            UpdateFamilies.parseRelations(responseDetails.responseText);
            UpdateFamilies.getFamilies();
            GM_setValue('familyUpdated', UpdateFamilies.time);
          }
        }
      });
    },
    parseRelations: function(pageSource) {
        var div, famList, numRegex = /\?fam=([\d]+)/gi

        famList = '';
        div = /<div class="blueboxfg"(?:.|[\r\n])*?>((?:.|[\r\n])*?)<\/div>/gim.exec(pageSource);
        if (div) {while (m=numRegex.exec(div[1])) {famList+=m[1]+',';} }
        GM_setValue('allies',famList);

        famList = '';
        div = /<div class="yellowboxfg"(?:.|[\r\n])*?>((?:.|[\r\n])*?)<\/div>/gim.exec(pageSource);
        if (div) {while (m=numRegex.exec(div[1])) {famList+=m[1]+',';} }
        GM_setValue('naps',famList);

        famList = '';
        div = /<div class="redboxfg"(?:.|[\r\n])*?>((?:.|[\r\n])*?)<\/div>/gim.exec(pageSource);
        if (div) {while (m=numRegex.exec(div[1])) {famList+=m[1]+',';} }
        GM_setValue('wars',famList);

    },
    getFamilies: function() {
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.imperialconflict.com/rankings.php',
        headers: {
          'User-agent': window.navigator.userAgent,
          'Accept': 'text/html',
        },
        onload: function(responseDetails) {
          var m, s='';
          GM_setValue('activeGalaxies','');
          while (m = /<a href=\?type=topfamilies_score&g=([\d]+)>/gi.exec(responseDetails.responseText)) {
            UpdateFamilies.loadRanks(m[1]);
          }
          UpdateFamilies.getMe();
        }
      });
    },
    getMe: function() {
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.imperialconflict.com/myFamily.php',
        headers: {
          'User-agent': window.navigator.userAgent,
          'Accept': 'text/html',
        },
        onload: function(responseDetails) {
          var me = /Members in family #([\d]+)/gi.exec(responseDetails.responseText)[1];
          GM_setValue('me',me);
          if (UpdateFamilies.reload==true) location.reload();
        }
      });
    },
    loadRanks: function(g) {
      GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.imperialconflict.com/rankings.php?type=topfamilies_score&g='+g,
        headers: {
          'User-agent': window.navigator.userAgent,
          'Accept': 'text/html',
        },
        onload: function(responseDetails) {
          UpdateFamilies.parseFamilies(responseDetails.responseText, g);
        }
      });
    },
    parseFamilies: function(pageSource, g) {

      var m, s='';
      while (m=/>[\s]*([^"\r\n]*?) \(([\d]+)\)/gi.exec(pageSource)) {
        if (s!='') s+='|';
        s+=m[2];
        GM_setValue('f'+m[2],m[1]);
      }
      GM_setValue('g'+g,s);
      if (s!='') {
        s = GM_getValue('activeGalaxies','');
        if (s.indexOf(g+',')==-1) s+=g+',';
        GM_setValue('activeGalaxies',s);
      }
    },
    check: function() {
      if ( (parseInt(UpdateFamilies.time) > (parseInt(GM_getValue('familyUpdated', 0)) + (1000*60*60*24*UpdateFamilies.days))) ) UpdateFamilies.getRelations();
      GM_registerMenuCommand("Update family numbers and relations", function(){GM_setValue('familyUpdated', new Date().getTime().toString());UpdateFamilies.reload=true;UpdateFamilies.getRelations();});
    }
  };

  UpdateFamilies.check();

  if(document.location.href.match(/relations.php/gi)) UpdateFamilies.parseRelations(document.body.innerHTML);

  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (head) {
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML  = '[relation="ally"] { text-decoration: none ! important; border-bottom: 1px solid #8888FF ! important; } ';
    style.innerHTML += '[relation="nap"]  { text-decoration: none ! important; border-bottom: 1px solid yellow  ! important; } ';
    style.innerHTML += '[relation="war"]  { text-decoration: none ! important; border-bottom: 1px solid red     ! important; } ';
    style.innerHTML += '[relation="me"]   { text-decoration: none ! important; border-bottom: 1px solid green   ! important; } ';
    head.appendChild(style);
  }

  var m, s, g, famRegex;

  s ='';
  g = GM_getValue('activeGalaxies','');

  while (m = /([\d]*),/gi.exec(g)) {
    if (s!='') s+='|';
    s+=GM_getValue('g'+m[1],'0000');
  }

  famRegex = new RegExp('([^,\\d\\w]|^)('+s+')([^,\\d\\w]|$)','gi');

  var index, offset, n, span, listElements, thisElement, href, text, newNode, f, r;
  var nonTextTag = ['head', 'noscript', 'option', 'script', 'style', 'title', 'textarea']
  var allies = GM_getValue('allies');
  var naps = GM_getValue('naps');
  var wars = GM_getValue('wars');
  var me = GM_getValue('me');

  listElements = document.evaluate("//a[@href]",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (index=0; thisElement = listElements.snapshotItem(index); index++) {
    href = thisElement.getAttribute('href');
    text = thisElement.textContent;
    if (href.match(/myFamily.php?/gi)) {
      thisElement.className = 'icFamilyLink';
      f = /fam=([\d]+)/i.exec(href)[1];
      thisElement.setAttribute('title', GM_getValue('f'+f,''));
      if (allies.indexOf(f+',')!=-1) {
        thisElement.setAttribute('relation','ally');
      } else if (naps.indexOf(f+',')!=-1) {
        thisElement.setAttribute('relation','nap');
      } else if (wars.indexOf(f+',')!=-1) {
        thisElement.setAttribute('relation','war');
      } else if (me==f) {
        thisElement.setAttribute('relation','me');
      }
    }
  }

  if(document.location.href.match(/rankings.php/gi)) return;

  listElements = document.evaluate(
    '//text()[not(ancestor::a) and not(ancestor::'+nonTextTag.join(') and not(ancestor::')+')]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
  for (index=0; thisElement = listElements.snapshotItem(index); index++) {
    text = thisElement.textContent;
    offset = 0; span = null;
    while (m = famRegex.exec(text)) {
      if (span == null) {span = document.createElement('span');}
      span.appendChild(document.createTextNode(text.substring(offset, m.index)));
      f = m[2];

      span.appendChild(document.createTextNode(m[1]));

      newNode = document.createElement('a');
      with (newNode) {
        className = 'icFamilyLink';
        appendChild(document.createTextNode(f));
        setAttribute('href',
          'http://www.imperialconflict.com/myFamily.php?fam='+f);
        setAttribute('title', GM_getValue('f'+f,''));
        if (allies.indexOf(f+',')!=-1) {
          setAttribute('relation','ally');
        } else if (naps.indexOf(f+',')!=-1) {
          setAttribute('relation','nap');
        } else if (wars.indexOf(f+',')!=-1) {
          setAttribute('relation','war');
        } else if (me==f) {
          setAttribute('relation','me');
        }
        span.appendChild(newNode);
      }

      span.appendChild(document.createTextNode(m[3]));

      offset = m.index+m[0].length;
      
    }
    if (span) {
      span.appendChild(document.createTextNode(text.substring(offset, text.length)));
      thisElement.parentNode.replaceChild(span, thisElement);
    }
  }
  
  listElements = document.evaluate(
    '//text()[ancestor::a and not(ancestor::'+nonTextTag.join(') and not(ancestor::')+')]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
  for (index=0; thisElement = listElements.snapshotItem(index); index++) {
    text = thisElement.textContent;
    offset = 0; span = null;
    while (m = famRegex.exec(text)) {
      f = m[2];
      if (allies.indexOf(f+',')!=-1) {
        r='ally';
      } else if (naps.indexOf(f+',')!=-1) {
        r='nap';
      } else if (wars.indexOf(f+',')!=-1) {
        r='war';
      } else if (me==f) {
        r='me';
      } else {
        continue;
      }
    
      if (span == null) {span = document.createElement('span');}
      span.appendChild(document.createTextNode(text.substring(offset, m.index)));

      span.appendChild(document.createTextNode(m[1]));

      newNode = document.createElement('span');
      with (newNode) {
        appendChild(document.createTextNode(f));
        setAttribute('relation',r);
        span.appendChild(newNode);
      }

      span.appendChild(document.createTextNode(m[3]));
      offset = m.index+m[0].length;
      
    }
    if (span) {
      span.appendChild(document.createTextNode(text.substring(offset, text.length)));
      thisElement.parentNode.replaceChild(span, thisElement);
    }
  }

} catch(e) {dump('IC Family Ties Error ('+e.lineNumber+'): '+e+'\n')} })();