// ==UserScript==
// @name           Ikea Country Page Switcher
// @version        0.3
// @copyright      2010 Nicolai Ehemann (en@enlightened.de)
// @namespace      http://www.enlightened.de
// @description    Adds small links to Ikea pages to switch between different country pages
// @include        http://www.ikea.com/*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
//
// ChangeLog
// 0.3  2010-11-04  Load all languages hosted on ikea.com
// 0.2  2010-11-03  Load most languages from ikea.com and store in html5 storage
// 0.1  2010-05-24  Initial version
//
// ==/UserScript==

(function() {
  var STORAGEKEY = '_______userscriptsettings';
  var urlRE = /http:\/\/www.ikea.com\/([a-z][a-z]\/[a-z][a-z])\//;
  var urlRE1 = /http:\/\/www.ikea.com\/([a-z][a-z]\/[a-z][a-z])/;
  var urlRE2 = /http:\/\/www.ikea.com\/([a-z][a-z])/;
  var settings, once, load, loadstep = 0, fadeIn, opacity = 0;

  function checkSettings() {
    if ('undefined' == typeof localStorage) {
      // fall back to hardcoded settings
      settings = {};

      settings.languages = {
        'be/fr' : {'active' : true, 'name' : 'be (fr)'},
        'be/nl' : {'active' : true, 'name' : 'be (nl)'},
        'cz/cs' : {'active' : true, 'name' : 'cz'},
        'dk/da' : {'active' : true, 'name' : 'dk'},
        'de/de' : {'active' : true, 'name' : 'de'},
        'es/es' : {'active' : true, 'name' : 'es'},
        'fr/fr' : {'active' : true, 'name' : 'fr'},
        'ie/en' : {'active' : true, 'name' : 'ie'},
        'it/it' : {'active' : true, 'name' : 'it'},
        'hu/hu' : {'active' : true, 'name' : 'hu'},
        'nl/nl' : {'active' : true, 'name' : 'nl'},
        'no/no' : {'active' : true, 'name' : 'no'},
        'at/de' : {'active' : true, 'name' : 'at'},
        'ru/ru' : {'active' : true, 'name' : 'ru'},
        'pl/pl' : {'active' : true, 'name' : 'pl'},
        'pt/pt' : {'active' : true, 'name' : 'pt'},
        'ch/fr' : {'active' : true, 'name' : 'ch (fr)'},
        'ch/it' : {'active' : true, 'name' : 'ch (it)'},
        'ch/de' : {'active' : true, 'name' : 'ch (de)'},
        'sk/sk' : {'active' : true, 'name' : 'sk'},
        'fi/fi' : {'active' : true, 'name' : 'fi'},
        'se/sv' : {'active' : true, 'name' : 'se'},
        'gb/en' : {'active' : true, 'name' : 'gb'},
        'ca/fr' : {'active' : true, 'name' : 'ca (fr)'},
        'ca/en' : {'active' : true, 'name' : 'ca (en)'},
        'us/en' : {'active' : true, 'name' : 'us'},
        'au/en' : {'active' : true, 'name' : 'au'},
        'cn/zh' : {'active' : true, 'name' : 'cn (zh)'},
        'cn/en' : {'active' : true, 'name' : 'cn (en)'},
        'hk/en' : {'active' : true, 'name' : 'hk (en)'},
        'jp/ja' : {'active' : true, 'name' : 'jp (ja)'},
        'jp/en' : {'active' : true, 'name' : 'jp (en)'}
        };
      insertSwitches();
    } else {
      var curtime = (new Date()).getTime();

      settings = localStorage.getItem(STORAGEKEY);
      try {
        settings = JSON.parse(settings);
      } catch(e) {
      }

      if (null == settings) {
        settings = { lastupdate : 0, languages : {} };
      }

      if (settings.lastupdate + 24 * 60 * 60 * 1000 < curtime) {
        var R = new XMLHttpRequest();
        R.onreadystatechange = function() {
          if (R.readyState == 4) {
            var hrefs, hrefs2, i, j, parts;
            var d = document.createElement('div');
            var d2 = document.createElement('div');
            var R2 = new XMLHttpRequest();

            d.innerHTML = R.responseText;
            hrefs = d.getElementsByTagName('a');
            settings.languages = {};
            for (i = 0; i < hrefs.length; i++) {
              parts = hrefs[i].href.match(urlRE1);
              if (parts && 2 == parts.length) {
                if ('undefined' == typeof settings.languages[parts[1]]) {
                  settings.languages[parts[1]] = {'active' : true, 'name' : parts[1].split('/')[0]};
                }
              } else {
                parts = hrefs[i].href.match(urlRE2);
                if (parts && 2 == parts.length) {
                  R2.open("GET", hrefs[i].href, false);
                  R2.send(null);
                  d2.innerHTML = R2.responseText;
                  hrefs2 = Array.prototype.slice.call(d2.getElementsByClassName('languageLink')).concat(Array.prototype.slice.call(d2.getElementsByClassName('languageLinkActive')));
                  for (j = 0; j < hrefs2.length; j++) {
                    parts = hrefs2[j].href.match(urlRE1);
                    if (parts && 2 == parts.length && 'undefined' == typeof settings.languages[parts[1]]) {
                      settings.languages[parts[1]] = {'active': true, 'name' : parts[1].split('/')[0] + ' (' + parts[1].split('/')[1] + ')'};
                    }
                  }
                }
              }
            }
            settings.lastupdate = curtime;
            localStorage.setItem(STORAGEKEY, JSON.stringify(settings));
            insertSwitches();
          }
        };

        R.open('get', 'http://' + location.hostname, true);
        R.send(null);
      } else {
        insertSwitches();
      }
    }
  }
  
  function fadeIn() { fade(true); }
  function fadeOut() { fade(false); }
  
  function fade(inOut) {
    window.clearTimeout(once);
    if ('undefined' != typeof inOut) {
      fadeIn = inOut;
    }
    if (fadeIn) {
      opacity = opacity + 0.05;
      if (0.75 > opacity) {
        once = window.setTimeout(fade, 15);
      }
    } else {
      opacity = opacity - 0.05; 
      if (0 < opacity) {
        once = window.setTimeout(fade, 15);
      }
    }
    var div = document.getElementById(STORAGEKEY);
    div.style.backgroundColor = 'rgba(255,255,255,' + opacity + ')';
  }
  
  function insertSwitches() {
    var a, div, regex, country, lang, first, i, c;

    //uncomment line to get an updates static languages list for insertion above
    //opera.postError(JSON.stringify(settings.languages).replace(/,/g,', ').replace(/:/g,' : ').replace(/}, "/g,'}\,\n        "').replace(/"/g,"'"));
    window.clearTimeout(load);
    div = document.getElementById(STORAGEKEY);
    if (div.firstChild) {
      div.removeChild(div.firstChild);
    }
    country = window.location.href.match(urlRE);
    if (country && 2 == country.length) {
      country = country[1];
      regex = new RegExp('http://www.ikea.com/' + country + '/');
      first = true;
      for (c in settings.languages) {
        if (settings.languages[c].active || c == country) {
          if (c == country) {
            a = document.createElement('span');
          } else {
            a = document.createElement('a');
            a.href = window.location.href.replace(regex, 'http://www.ikea.com/' + c + '/');
          }
          if (!first) {
            div.appendChild(document.createTextNode(' | '));
          } else {
            first = false;
          }
          a.appendChild(document.createTextNode(settings.languages[c].name));
          div.appendChild(a);
        }
      }
    }
  }
  
  function loading() {
    var display = '|/-\\';
    var div = document.getElementById(STORAGEKEY);
    if (div.firstChild) {
      div.replaceChild(document.createTextNode(' ' + display.substr(loadstep, 1) + ' '), div.firstChild);
    } else {
      div.appendChild(document.createTextNode(' ' + display.substr(loadstep, 1) + ' '));
    }
    loadstep = ++loadstep%4
    load = window.setTimeout(loading, 125);
  }
  
  function insertControl() {
    var div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.left = '10px';
    div.style.top = '10px';
    div.style.zIndex = '1000';
    div.onmouseover = fadeIn;
    div.onmouseout = fadeOut;
    div.id = STORAGEKEY;
    document.getElementsByTagName('body')[0].appendChild(div);
    load = window.setTimeout(loading, 0);
  }
  
  insertControl();
  checkSettings();
})()
