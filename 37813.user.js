///////////////////////////////////////////
//
// ==UserScript==
// @name	IC Map Links
// @author	Momentum
// @version	0.1.6
// @namespace	http://userscripts.org/scripts/show/37813
// @description	0.1.6 - Converts textual planetary and system coordinates into links.
// @include	http://www.imperialconflict.com/*
// @exclude	http://www.imperialconflict.com/guide*
// @exclude	http://www.imperialconflict.com/*.html
// @exclude	http://www.imperialconflict.com/account.php
// @require     http://sizzlemctwizzle.com/updater.php?id=37813
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

  var index, offset, m, n, span, listElements, thisElement, href, text, inner, newNode;
  var nonTextTag = ['a', 'head', 'noscript', 'option', 'script', 'style', 'title', 'textarea']
  var coordRegex = /([1-2]{0,1}[\d]{1,2}\b)([,:;][\s]{0,1})([1-2]{0,1}[\d]{1,2}\b)([,:;][\s]{0,1})([\d]{1,2}\b)((?:(?:[\s]{0,1}[,+&][\s]{0,1}|[,+&]{0,1} and )[\d]{1,2}\b)*)|(planet[s]{0,1} )([\d]{1,2}\b)((?:(?:[\s]{0,1}[,+&][\s]{0,1}|[,+&]{0,1} and )[\d]{1,2}\b)*)( in the | at )(x[:=]|[]*)([1-2]{0,1}[\d]{1,2}\b)([\s,:]|[,:]{0,1}[\s]{0,1}y[:=])([1-2]{0,1}[\d]{1,2}\b)( system|[]*)/gi
  var pRegex = /([\s]{0,1}[,+&][\s]{0,1}|[,]{0,1} and )([\d]{1,2}\b)/gi

  listElements = document.evaluate("//a[@href]",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (index=0; thisElement = listElements.snapshotItem(index); index++) {
    href = thisElement.getAttribute('href');
    text = thisElement.textContent;
    if (href.match(/planet.php?/gi)) {
      if (text.match(coordRegex)) {
        span = document.createElement('span');
        span.innerHTML = thisElement.innerHTML;
        thisElement.parentNode.replaceChild(span, thisElement);
      } else {
        thisElement.className = 'icPlanetLink';
      }
    } else if (href.match(/system.php?/gi)) {
      thisElement.className = 'icSystemLink';
    }
  }

  listElements = document.evaluate(
    '//text()[not(ancestor::'+nonTextTag.join(') and not(ancestor::')+')]',
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
  for (index=0; thisElement = listElements.snapshotItem(index); index++) {
    text = thisElement.textContent;
    offset = 0; span = null;
    while (m = coordRegex.exec(text)) {
      if (m[1] && m[3] && m[5]) {

        //x:[1],y[3]:n[5]

        if (m[2].substr(0,1)==m[4].substr(0,1))
          continue;
          
        if (span == null) {span = document.createElement('span');}
        span.appendChild(document.createTextNode(text.substring(offset, m.index)));

        newNode = document.createElement('a');
        with (newNode) {
          className = 'icSystemLink';
          appendChild(document.createTextNode(m[1]+m[2]+m[3]));
          setAttribute('href',
            'http://www.imperialconflict.com/system.php?x='+m[1]+'&y='+m[3]);
          span.appendChild(newNode);
        }

        span.appendChild(document.createTextNode(m[4]));

        if (m[5] != "99") {
          newNode = document.createElement('a');
          with (newNode) {
            className = 'icPlanetLink';
            appendChild(document.createTextNode(m[5]));
            setAttribute('href',
              'http://www.imperialconflict.com/planet.php?x='+m[1]+'&y='+m[3]+'&number='+m[5]);
            span.appendChild(newNode);
          }
        } else {
          span.appendChild(document.createTextNode(m[5]));
        }

        if (m[6]) {
          while (n=pRegex.exec(m[6])) {
            span.appendChild(document.createTextNode(n[1]));

            if (n[2] != "99") {
              newNode = document.createElement('a');
              with (newNode) {
                className = 'icPlanetLink';
                appendChild(document.createTextNode(n[2]));
                setAttribute('href',
                  'http://www.imperialconflict.com/planet.php?x='+m[1]+'&y='+m[3]+'&number='+n[2]);
                span.appendChild(newNode);
              }
            } else {
              span.appendChild(document.createTextNode(n[2]));
            }
          }
        }

      } else if (m[8] && m[12]  && m[14]) {

        //planet n:[8] in the x=x:[12],y=y:[14] system
        
        if (span == null) {span = document.createElement('span');}
        span.appendChild(document.createTextNode(text.substring(offset, m.index)));

        if (m[9]) {

          span.appendChild(document.createTextNode(m[7]));

          newNode = document.createElement('a');
          with (newNode) {
            className = 'icPlanetLink';
            appendChild(document.createTextNode(m[8]));
            setAttribute('href',
              'http://www.imperialconflict.com/planet.php?x='+m[12]+'&y='+m[14]+'&number='+m[8]);
            span.appendChild(newNode);
          }

          while (n=pRegex.exec(m[9])) {
            span.appendChild(document.createTextNode(n[1]));

            if (n[2] != "99") {
              newNode = document.createElement('a');
              with (newNode) {
                className = 'icPlanetLink';
                appendChild(document.createTextNode(n[2]));
                setAttribute('href',
                  'http://www.imperialconflict.com/planet.php?x='+m[12]+'&y='+m[14]+'&number='+n[2]);
                span.appendChild(newNode);
              }
            } else {
              span.appendChild(document.createTextNode(n[2]));
            }
          }
        } else {
          newNode = document.createElement('a');
          with (newNode) {
            className = 'icPlanetLink';
            appendChild(document.createTextNode(m[7]+m[8]));
            setAttribute('href',
              'http://www.imperialconflict.com/planet.php?x='+m[12]+'&y='+m[14]+'&number='+m[8]);
            span.appendChild(newNode);
          }
        }

        span.appendChild(document.createTextNode(m[10]));

        newNode = document.createElement('a');
        with (newNode) {
          className = 'icSystemLink';
          appendChild(document.createTextNode(m[11]+m[12]+m[13]+m[14]+m[15]));
          setAttribute('href',
            'http://www.imperialconflict.com/system.php?x='+m[12]+'&y='+m[14]);
          span.appendChild(newNode);
        }

      }
      offset = m.index+m[0].length;
    }
    if (span) {
      span.appendChild(document.createTextNode(text.substring(offset, text.length)));
      thisElement.parentNode.replaceChild(span, thisElement);
    }
  }
  
} catch(e) {dump('IC Map Links Error ('+e.lineNumber+'): '+e+'\n')} })();