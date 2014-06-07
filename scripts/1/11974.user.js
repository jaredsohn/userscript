// ==UserScript==
// @name           discover tako3
// @namespace      http://d.hatena.ne.jp/koyachi/
// @description    visit/subscribe relative urls when bookmarked(by del.icio.us, Hatena Bookmark).
// @include        http://del.icio.us/*
// @include        http://b.hatena.ne.jp/*
// @include        http://clip.livedoor.com/*
// ==/UserScript==
//
// 2007-09-14 t.koyachi
//   replace tako3.com api to 'likely'
//
// 2007-09-07 t.koyachi
//   add LivedoorClip
//
// 2007-09-05 t.koyachi
//   add HatenaBookmark
//
// 2007-09-04 t.koyachi
//

(function() {
  var subscribeButton = 'data:image/x-icon;base64,'+
    'AAABAAIAEBAAAAEACABoBQAAJgAAACAgAAABAAgAqAgAAI4FAAAoAAAAEAAAACAAAAABAAgAAAAA'+
    'AEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD/RxMA/0oUAP9NFQBAFQUA/1IVAP9WFwD/WhgA'+
    'QBYGAEAYBgD/XhkA/2IaAEAZBwD/ZhsA/2ocAEAaBwD/bh0A/3IfAEAdCAD/dx8A/3ogAP99IQD/'+
    'gCIA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAACAgICAgICAgICAgICAgADAwMDAwMDAwMDAwMDAwMDBAQEBAQE'+
    'BAQEBAQEBAQEBAYGBgYFBQUFBgYFBQUGBgYHBwcHAQEBAQcJAQEBBwcHCAgICAgBAQgIAQEICAgI'+
    'CAsLCwsLAQELCgEBCwsLCwsMDAwMDAEBDQEBDAwMDAwMDg4ODg4BAQEBARAODg4ODg8PDw8PAQEP'+
    'DwEBDw8PDw8REREREQEBEREBAREREREREhISEhMBARMTAQESEhISEhQUFBQBAQEBAQEUFBQUFBQV'+
    'FRUVFRUVFRUVFRUVFRUVFhYWFhYWFhYWFhYWFhYWFgAXFxcXFxcXFxcXFxcXFwCAAQAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAQAAKAAA'+
    'ACAAAABAAAAAAQAIAAAAAACABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A/wAAAP8CAQDXAgEA'+
    '/y8vAF9cXAD08/MA8fDwAP8FAQD/BgIA/QYCAP8NBQD/DgYA/2VgAP8LAAD/FAUA/yATAP0cCAD/'+
    'GwEA/xsEANcaBwD/HQAA/x8AAMMYAAD/IQEA/yUEAP9MMQD/ZlEA9ubkAPwlBAD/KwkA2icKAP8w'+
    'DwD/Mw8A/TMPAHUZCAD/PxwA5jgdAP9GJgD/UzcA/1k7AP9eQgD/ZUoA6mZRANgxEAD/OhMAyTER'+
    'AP8+FgD9PBYA1jMTAJ4mDgD/Xj0A/2JDAPSvoQD89/YARRQIAP9JHgD9SR4A7UQcANY9GgD/aUMA'+
    'HRUTAP9IGQDWRx4A/1UnAP9WKAD9VigA/VUoAG05KgBRQz8A/1okAP9kMgD8YzIAKhMMAFAyKQD/'+
    'VhwA+2MwAP9nMwD+cTwA/3RFAPTe1gD/cjwA/2YiAP1lIgD1YiEA/2kjANZZIAD/aScA/24sAP5w'+
    'MgD/dTgA/4BGAP+CSAD/hUwAAwEAAP+ESQD/hUoA/4pNAPeJVADTvbIA//38AP9wJQDbZSEA/3Un'+
    'AP92JwD9dCcA+XImAP91KQD/ey8A/340AP+GQQD/h0cA/4xPAOF8RgD/j1AA/5JTAP+RUwD/l1sA'+
    '/51lAP+RUQDMekYA/5lYAOWQXgDllWMA+q5+AP3PtAD+9O4A7+rnAP99KQD/mVEA/5VRAP+fXQDz'+
    'ml0A5ZpmAPyDKwD7gysA/4QsAPN/KgDacyYA7H0rAMNpJwD/jDkA/5JAAP+XSAD/mlAA/5tTAP+d'+
    'VQD/nlkA/6FeAP+mYgDNh1QAvX9QAOWfagDNpIYAaFxTAPXl2QD/iy4A/5U+AP+gVQD/rGYA86Rh'+
    'AOWkbQCxg14A872QAPzp2gD/kTAA2XspAMJxJQD/lDQA/6ZWAP+sZQDUm2YAw3IlAMFxJQD/mDIA'+
    'yoA6AMR9OgD/q1YA/6xZAP+zawDzq2YAimE6AP+4dQArIhkA/Pv6AP+fNADZhy0A/7pwAP+lNwD/'+
    'pj8A/7RbAOGgVgD/wHQA/8mIAP/hvgD/qjgA/609AP/FeAD/u10A/8NwAP/LfQD/sToA2ZcyAP+6'+
    'SAD/ynYA/8t7AP/04wD/tz0A/7k+AP+3PgD/xGEA/9GBAP+9PgDepjsA/8JJAP/OagD/wkAA/8NC'+
    'AP/JWADtxGsA/9eFAP/HQgD/yUcA/8tRAP/NVAD/0F0A/9RvAP/ciQD/3Y0A/+GXAP/02QD/+OcA'+
    '/9+JAP/figD/4YwA/+COAP/lnwD/6rAA//rrAP/bYgD/77kA/+2kAK+vrgD8/PwA9vb2APPz8wDe'+
    '3t4Az8/PAMjIyACMjIwAdXV1AG9vbwA8PDwADAwMAAAAAAAAAKywraioqKioqKioqKioqKioqKio'+
    'qKioqKiusawAAACMjIiJiYmJiYmJiY6PkJKTlZWVlZWUkZCOiYeKi40Ad2toaGhoaGhsbm9zdXV1'+
    'dXV1dXV1dXV1dXVzb2xqZ5dcVFNTU1NYW1xdXV1dXV1dXV1dXV1dXV1dXV1dXFpVV1BMTExHTlJS'+
    'UlJSUlJSUlJSUlJSUlJSUlJSUlJST01APT8/QkhISEhISEhISEhISEhISEhISEhISEhISEhISUA0'+
    'JUFCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkNEQDU5OTk5OTk/OTk5OTk5OTk5OTk6OzMkOEo8'+
    'OTk5Ojo8NTAwMDAwMCZfAAAAAAAAAC8wLjM+BvrzUTQwMDAwMTIpIiIiIiIiJ2UBAQEBAQEBKh8z'+
    '/PYBATcrIiIiIiIjICgfHx8fHx8fHygHAQEBLCEfIAYBAQFlDgwMDQ0NEBIVGxoaGhoUGhoaGggB'+
    'AQEmGhlLCAEBATYDCgoKCgoKCwQbEAkDAwMTGRkZCAEBASYWJPkBAQEdEQMDAwMDAwMDBAUCAgIC'+
    'Ag8XFxcIAQEBJhj6AQEBARwXFgICAgICAgIENC4uLi4uJUJCQggBAQFFRvQBAQF+REJCQiUuLi4u'+
    'Li1eVlZWVlZZYWFhCAEBAWSAAQEBgGNhYWFhYFlWVlZWV2JmZmZmZmxxcXEIAQEBNn5/AfTzSnJx'+
    'cXFxcGZmZmZXc2lpaWlpaXh0dAgBAQF7dHZRAQH3S3R0dHR0bWlpaWeDgYGBgYGBg3p6CAEBAXx6'+
    'en0BAQH5eXp6enqOgYGBZ5KJiYmJiYmChIQIAQEBhoSEhQEBAQGjhISEhI+JiYmLn52dnZ2dnZ+W'+
    'lggBAQGZlpaYAQEBAZqWlpaWnp2dnYuqpqampqamqqCgCAEBAaKgoZsBAQEBpKCgoKuppqamp7Ov'+
    'r6+vr6+ztZcIAQEBo7a4+AEBAbm3tLS0sq+vr6+nv7q6urq6usD+/fUBAQEG+/cBAQEBfry8vLy+'+
    'urq6uru/vb29vb29xgEBAQEBAQEBAc/Pw8LBwcHBx729vb29u8fExMTExMTIxsbGxsbGxsbGxsbG'+
    'xsbGxsjFxMTExMTLx8rKysrKys3JycnJycnJycnJycnJycnOzMrKysrKysvT0tDQ0NDR1NTU1NTU'+
    '1NTU1NTU1NTU1NvQ0NDQ0NDQy9jX1dXV1dfd3d3d3d3d3d3d3d3d3d3i1dXV1dXV1dXW5tjZ2dnZ'+
    '4eTk5OTk5OTk5OTk5OTk8NnZ2dnZ2dnZ2twA5ePg397w6+vr6+vr6+vr6+vr6vDe3t7e3t7e3+Hh'+
    'AAAA7ubq6fLx8fHx8fHx8fHx8fHy6enp6enp6ens7QAAwAAAA4AAAAEAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAcAAAAM=';

  var GLOBAL = unsafeWindow;
  GLOBAL._JSONP = {
      count: 0,
      callbacks: []
  };

  function JSONP(url, callback, fixedCallbackName) {
    var jsonp = GLOBAL._JSONP;
    if (!fixedCallbackName) {
      jsonp.callbacks[jsonp.count] = callback;
      url += '&callback=' + '_JSONP.callbacks[' + jsonp.count + ']';
      jsonp.count++;
    }
    else {
      // for tako3
      GLOBAL[fixedCallbackName] = callback;
    }
    var scriptObj = document.createElement('script');
    var soid = 'subscribe_relative_feed_whe_bookmark__jsonp__' + (new Date()).getTime();
    updateNodeAttributes(scriptObj, {
      'type': 'text/javascript',
      'charset': 'utf-8',
      'src': url,
      'id': soid
    });
    setTimeout(partial(function(soid) {
      var scriptObj = document.getElementById(soid);
      scriptObj.parentNode.removeChild(scriptObj);
    }, soid), 1000);
    setTimeout(function() {
      document.getElementsByTagName('head')[0].appendChild(scriptObj);
    }, 0);
  }

  function createElmLeadToTako3(url, msg) {
    var elmLink = document.createElement('a');
    updateNodeAttributes(elmLink, {
      'href': 'http://tako3.com/' + url,
      'target': '_blank',
      'title': msg
    });
    elmLink.appendChild(document.createTextNode(
      'Related site not found. Add this site to tako3?'));
    return elmLink;
  }

  var SBM = {
    Delicious: {
      pattern: /^http\:\/\/del\.icio\.us\/.+?\?url\=.*/
      ,
      getBookmarkUrl: function() {
        return document.getElementById('url').value;
      }
      ,
      insertDom: function(urls) {
        if (urls.length > 0) {
          var elmTako3 = this.createElmTako3Wrapper();
          var elmUrls = document.createElement('ul');
          urls.forEach(function(url){
            var elmSubscribeButton = new Image();
            updateNodeAttributes(elmSubscribeButton, {
              'src': subscribeButton,
              'border': '0px'
            });
            var elmSubscribe = document.createElement('a');
            updateNodeAttributes(elmSubscribe, {
              'href': 'http://reader.livedoor.com/subscribe/' + url,
              'target': '_blank'
            });
            elmSubscribe.appendChild(elmSubscribeButton);

            var elmLink = document.createElement('a');
            updateNodeAttributes(elmLink, {
              'href': url,
              'target': '_blank'
            });
            elmLink.appendChild(document.createTextNode(url));

            var elmList = document.createElement('li');
            updateNodeAttributes(elmList, {
              'style': {
                'marginLeft': '0px',
                'marginBottom': '0px'
              }
            });
            elmList.appendChild(elmSubscribe);
            elmList.appendChild(elmLink);

            elmUrls.appendChild(elmList);
          });
          elmTako3.appendChild(elmUrls);
          var recNode = document.getElementById('rec');
          recNode.parentNode.insertBefore(elmTako3, recNode.nextSibling);
        }
        else {
          this.insertElmLeadToTako3('@insertDom');
        }
      }
      ,
      insertElmLeadToTako3: function(msg) {
        //log('insertElmLeadToTako3: ' + msg);
        var elmTako3 = this.createElmTako3Wrapper();
        var elmPseudoUL = document.createElement('ul');
        var elmPseudoLI = document.createElement('li');
        updateNodeAttributes(elmPseudoLI, {
          'style': {
            'marginLeft': '0px',
            'margiBottom': '0px'
          }
        });
        var elmLeadToTako3 = createElmLeadToTako3(this.getBookmarkUrl(), msg);
        elmPseudoLI.appendChild(elmLeadToTako3);
        elmPseudoUL.appendChild(elmPseudoLI);
        elmTako3.appendChild(elmPseudoUL);
        var recNode = document.getElementById('rec');
        recNode.parentNode.insertBefore(elmTako3, recNode.nextSibling);
      }
      ,
      createElmTako3Wrapper: function() {
        var elmTako3 = document.createElement('li');
        updateNodeAttributes(elmTako3,{
          'class': 'bundle fold',
          'style': {
            'display': 'block'
          }
        });
        var elmCursor = document.createElement('div');
        updateNodeAttributes(elmCursor, {
          'class': 'label arrow',
          'style': {
            'cursor': 'pointer'
          }
        });
        var elmLabel = document.createElement('span');
        elmLabel.appendChild(document.createTextNode('tako3'));
        var elmCursorImage= new Image();
        updateNodeAttributes(elmCursorImage, {
          'src': '/static/img/arrow.d.gif',
          'width': '8px',
          'height': '8px'
        });

        elmCursor.appendChild(elmCursorImage);
        elmCursor.appendChild(elmLabel);
        elmTako3.appendChild(elmCursor);

        return elmTako3;
      }
    }
    ,
    HatenaBookmark: {
      pattern: /^http\:\/\/b\.hatena\.ne\.jp\/add\?mode\=confirm.+?\&url\=.*/
      ,
      getBookmarkUrl: function() {
        return unsafeWindow.document.add.url.value;
      }
      ,
      insertDom: function(urls) {
        if (urls.length > 0) {
          var elmTako3 = this.createElmTako3Wrapper();
          var elmUrls = document.createElement('ul');
          updateNodeAttributes(elmUrls, {
            'style': {
              'marginTop': '0px',
              'paddingLeft': '0px'
            }
          });
          urls.forEach(function(url){
            var elmSubscribeButton = new Image();
            updateNodeAttributes(elmSubscribeButton, {
              'src': subscribeButton,
              'border': '0px'
            });
            var elmSubscribe = document.createElement('a');
            updateNodeAttributes(elmSubscribe, {
              'href': 'http://reader.livedoor.com/subscribe/' + url,
              'target': '_blank'
            });
            elmSubscribe.appendChild(elmSubscribeButton);

            var elmLink = document.createElement('a');
            updateNodeAttributes(elmLink, {
              'href': url,
              'target': '_blank'
            });
            elmLink.appendChild(document.createTextNode(url));

            var elmList = document.createElement('li');
            updateNodeAttributes(elmList, {
              'style': {
                  'listStyleType': 'none'
              }
            });
            elmList.appendChild(elmSubscribe);
            elmList.appendChild(elmLink);

            elmUrls.appendChild(elmList);
          });
          elmTako3.appendChild(elmUrls);
          var recNode = document.getElementById('othertags_list');
          recNode.parentNode.insertBefore(elmTako3, recNode.nextSibling);
        }
        else {
          this.insertElmLeadToTako3('@insertDom');
        }
      }
      ,
      insertElmLeadToTako3: function(msg) {
        var elmTako3 = this.createElmTako3Wrapper();
        var elmPseudoUL = document.createElement('ul');
        updateNodeAttributes(elmPseudoUL, {
          'style': {
              'paddingLeft': '0px'
          }
        });
        var elmPseudoLI = document.createElement('li');
        updateNodeAttributes(elmPseudoUL, {
          'style': {
              'listStyleType': 'none'
          }
        });
        var elmLeadToTako3 = createElmLeadToTako3(this.getBookmarkUrl(), msg);
        elmPseudoLI.appendChild(elmLeadToTako3);
        elmPseudoUL.appendChild(elmPseudoLI);
        elmTako3.appendChild(elmPseudoUL);
        var recNode = document.getElementById('othertags_list');
        recNode.parentNode.insertBefore(elmTako3, recNode.nextSibling);
      }
      ,
      createElmTako3Wrapper: function() {
        var elmTako3 = document.createElement('div');
        updateNodeAttributes(elmTako3, {
          'style': {
            'width': '100%',
            'lineHeight': '140%',
            'marginTop': '10px'
          }
        });

        var elmLabel = document.createElement('div');
        updateNodeAttributes(elmLabel, {
          'style': {
            'fontSize': '10pt',
            'fontWeight': 'bold'
          }
        });
        elmLabel.appendChild(document.createTextNode('tako3'));
        elmTako3.appendChild(elmLabel);

        return elmTako3;
      }
    }
    ,
    LivedoorClip: {
      pattern: /^http\:\/\/clip\.livedoor\.com\/clip\/add\?link\=.*/
      ,
      getBookmarkUrl: function() {
        return unsafeWindow.document.clip.link.value;
      }
      ,
      insertDom: function(urls) {
        if (urls.length > 0) {
          var elmTako3 = this.createElmTako3Wrapper();
          var elmUrls = document.createElement('ul');
          updateNodeAttributes(elmUrls, {
            'style': {
              'marginTop': '0px',
              'padding': '10px'
            }
          });
          urls.forEach(function(url){
            var elmSubscribeButton = new Image();
            updateNodeAttributes(elmSubscribeButton, {
              'src': subscribeButton,
              'border': '0px'
            });
            var elmSubscribe = document.createElement('a');
            updateNodeAttributes(elmSubscribe, {
              'href': 'http://reader.livedoor.com/subscribe/' + url,
              'target': '_blank'
            });
            elmSubscribe.appendChild(elmSubscribeButton);

            var elmLink = document.createElement('a');
            updateNodeAttributes(elmLink, {
              'href': url,
              'target': '_blank'
            });
            elmLink.appendChild(document.createTextNode(url));

            var elmList = document.createElement('li');
            updateNodeAttributes(elmList, {
              'style': {
                'listStyleType': 'none',
                'textAlign': 'left'
              }
            });
            elmList.appendChild(elmSubscribe);
            elmList.appendChild(elmLink);
            elmUrls.appendChild(elmList);
          });
          elmTako3.appendChild(elmUrls);
          var recNode = document.getElementById('addclipcloudbox');
          recNode.parentNode.insertBefore(elmTako3, recNode);
        }
        else {
          this.insertElmLeadToTako3('@insertDom');
        }
      }
      ,
      insertElmLeadToTako3: function(msg) {
        var elmTako3 = this.createElmTako3Wrapper();
        var elmPseudoUL = document.createElement('ul');
        updateNodeAttributes(elmPseudoUL, {
          'style': {
            'marginTop': '0px',
            'padding': '10px'
          }
        });
        var elmPseudoLI = document.createElement('li');
        updateNodeAttributes(elmPseudoLI, {
          'style': {
            'listStyleType': 'none',
            'textAlign': 'left'
          }
        });
        var elmLeadToTako3 = createElmLeadToTako3(this.getBookmarkUrl(), msg);
        elmPseudoLI.appendChild(elmLeadToTako3);
        elmPseudoUL.appendChild(elmPseudoLI);
        elmTako3.appendChild(elmPseudoUL);
        var recNode = document.getElementById('addclipcloudbox');
        recNode.parentNode.insertBefore(elmTako3, recNode);
      }
      ,
      createElmTako3Wrapper: function() {
        var elmTako3 = document.createElement('div');
        updateNodeAttributes(elmTako3, {
          'style': {
            'marginTop': '20px',
            'marginLeft': '90px',
            'marginRight': '90px',
            'marginBottom': '30px'
          }
        });

        var elmLabel = document.createElement('h4');
        updateNodeAttributes(elmLabel, {
          'class': 'pxlarge'
        })
        elmLabel.appendChild(document.createTextNode('tako3'));
        elmTako3.appendChild(elmLabel);

        return elmTako3;
      }
    }
  };

  function guessFeedUrl(feedUrls, siteUrl) {
    var pathLevels = siteUrl.split('\/');
    level = 2;
    var path = 'http:\/\/' + pathLevels[level];
    var matched = [];
    function guess() {
      for (var i = 0; i < feedUrls.length; i++) {
        var url = feedUrls[i];
        if (url.match(path)) {
          matched.push(url);
        }
      }
    }
    var last;
    var count = 0;
    while (1) {
      guess();
      if (matched.length == 1) {
        return matched[0];
      }
      else if (matched.length > 1) {
        last = matched[0];
        matched = [];
        path += '\/' + pathLevels[++level];
      }
      else if (count == 5){
        // akirameta
        return last;
      }
      count++;
    }
  }

  var discoverAPI = 'http://rpc.reader.livedoor.com/feed/discover'
                  + '?format=json';

  function discoverTako3(sbm, discoverUrl, bookmarkUrl, endFlag) {
    JSONP(discoverUrl, function(feedInfos){
      feedInfos.sort(function(a, b) {
        return (b.subscribers_count - a.subscribers_count);
      });
      var urls = feedInfos.map(function(fi){return fi.link});
      var feedUrl = guessFeedUrl(urls, sbm.getBookmarkUrl());
      if (feedUrl) {
        if (feedUrl[feedUrl.length - 1] != '/') feedUrl += '/';
        var tako3url = 'http://tako3.com/json/likely/' + feedUrl;
        JSONP(tako3url, function(urls){
          if (urls.length > 0) {
            sbm.insertDom(urls);
          }
          else {
            sbm.insertElmLeadToTako3('@jsonp_tako3 not found');
          }
        }, 'tako3');
      }
      else {
        if (!endFlag) {
          discoverUrl = discoverAPI + '&url=' + bookmarkUrl;
          discoverTako3(sbm, discoverUrl, bookmarkUrl, 1);
        }
        else {
          sbm.insertElmLeadToTako3('@jsonp_ldr feed not found');
        }
      }
    });
  }

  var url = document.location.href;
  for (var k in SBM) {
    var sbm = SBM[k];
    if (url.match(sbm.pattern)) {
      var bookmarkUrl = encodeURIComponent(sbm.getBookmarkUrl());
      var discoverUrl = discoverAPI + '&links=' + bookmarkUrl;
      discoverTako3(sbm, discoverUrl, bookmarkUrl);
      break;
    }
  }

  // utils -----------------------------------------------------------

  // via Mochikit.Base
  function updatetree(self, obj/*, ...*/) {
    if (self === null) {
      self = {};
    }
    for (var i = 1; i < arguments.length; i++) {
      var o = arguments[i];
      if (typeof(o) != 'undefined' && o !== null) {
        for (var k in o) {
          var v = o[k];
          if (typeof(self[k]) == 'object' && typeof(v) == 'object') {
            arguments.callee(self[k], v);
          } else {
            self[k] = v;
          }
        }
      }
    }
    return self;
  }

  function updateNodeAttributes(node, attrs) {
    for (var k in attrs) {
      var v = attrs[k];
      if (typeof(v) == 'object' && typeof(node[k]) == 'object') {
        updatetree(node[k], v);
      } else if (k.substring(0, 2) == "on") {
        if (typeof(v) == "string") {
          v = new Function(v);
        }
        node[k] = v;
      } else {
        node.setAttribute(k, v);
      }
    }
  }

  function bind(obj, func) {
    func = (func instanceof Function)? func : obj[func];
    return function() {
      return func.apply(obj, arguments);
    }
  }

  function partial(func/*, arg1, arg2,..*/) {
    var preargs = Array.prototype.slice.apply(arguments, [1]);
    return function(){
      var args = Array.prototype.unshift.apply(arguments, preargs);
      return func.apply(this, arguments);
    }
  }

  function log(msg) {
    if (unsafeWindow && unsafeWindow.console) {
      unsafeWindow.console.log(msg);
    }
  }

  function inspect(msg) {
    if (unsafeWindow && unsafeWindow.console) {
      unsafeWindow.console.dir(msg);
    }
  }
})();
