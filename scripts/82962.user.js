//
// ==UserScript==
// @name           Pin Extension for Google Reader 
// @description    extend Google Reader with Pin (inspired by Livedoor Reader)
// @include        http://www.google.co.jp/reader/view/*
// @include        http://www.google.com/reader/view/*
// @include        https://www.google.co.jp/reader/view/*
// @include        https://www.google.com/reader/view/*
// ==/UserScript==
//
// 2010/08/04 version 0.6(2) added starred (informal)
// 2008/06/19 version 0.6    added https hosts
// 2008/01/16 version 0.5    added hatena bookmark entries feature
// 2007/06/18 version 0.4    support list view
// 2007/05/03 version 0.3    fix xpath to target link
// 2007/01/27 version 0.2    add .com
//                           work on Opera
// 2006/09/30 version 0.1    Initial version

(function(){
var pins = new Array();

document.addEventListener('keydown',
                          function(event) {
                              var ce = document.getElementById('current-entry');
                              if (ce) {
                                  var titles = ce.getElementsByTagName('h2');
                                  var title = null;
                                  if (titles.length == 1) {
                                      // expand view
                                      title = titles[0];
                                  } else if (titles.length == 2) {
                                      // list view
                                      title = titles[1];
                                  }
                                  if (event.keyCode == 73) { // i
                                      // current entry is selected and 'i' key down
                                      var addStar = document.createEvent("MouseEvents");
                                      addStar.initEvent("click", true, false);
                                      var href = title.getElementsByTagName('a')[0].href;
                                      if (pins[href] == undefined) {
                                          pins[href] = href;
                                          // insert pin icon
                                          var pinimg = document.createElement('img');
                                          pinimg.setAttribute('src', 'http://reader.livedoor.com/img/icon/pin.gif');
                                          pinimg.setAttribute('width', '16');
                                          pinimg.setAttribute('height', '16');
                                          pinimg.setAttribute('id', href);
                                          
                                          title.appendChild(pinimg);
                                          ce.getElementsByClassName("item-star")[0].dispatchEvent(addStar);
                                      } else {
                                          delete pins[href];
                                          // remove pin icon
                                          var e = document.getElementById(href);
                                          if (e) {
                                              e.parentNode.removeChild(e);
                                          }
                                          ce.getElementsByClassName("item-star-active")[0].dispatchEvent(addStar);
                                      }
                                  } else if (event.keyCode == 66) { // b
                                      var href = title.getElementsByTagName('a')[0].href;
                                      if (document.getElementById('hateb:' + href) != undefined) {
                                          // retrieved data already
                                          return;
                                      }
                                      var content = '<?xml version="1.0" encoding="UTF-8"?><methodCall><methodName>bookmark.getCount</methodName><params><param><value><string>' + href + '</string></value></param></params></methodCall>';
                                      GM_xmlhttpRequest({
                                          method: 'POST',
                                          url: 'http://b.hatena.ne.jp/xmlrpc',
                                          headers: {
                                              'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                                              'Accept': 'application/atom+xml,application/xml,text/xml',
                                              'Content-type': 'application/x-www-form-urlencoded',
                                          },
                                          data: content,
                                          onload: function(responseDetails) {
                                              var parser = new DOMParser();
                                              var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
                                              var entries = dom.getElementsByTagName('member');
                                              if (entries.length != 1) {
                                                  return;
                                              }
                                              count = entries[0].getElementsByTagName('int')[0].textContent;
                                              // hateb link
                                              var hatebLink = document.createElement('a');
                                              hatebLink.setAttribute('href', 'http://b.hatena.ne.jp/entry/' + href);
                                              hatebLink.setAttribute('target', '_blank');
                                              // hateb icon
                                              var hatebLinkA = hatebLink;
                                              var hatebImg = document.createElement('img');
                                              hatebImg.setAttribute('src', 'http://d.hatena.ne.jp/images/b_entry.gif');
                                              hatebImg.setAttribute('width', 16);
                                              hatebImg.setAttribute('height', 12);
                                              hatebImg.setAttribute('style', 'margin-left: 2px; border: none');
                                              hatebLinkA.appendChild(hatebImg);
                                              // hateb count
                                              var hatebLinkB = hatebLink;
                                              if (count == 0) {
                                                  // not bookmarked yet
                                              } else {
                                                  var hatebCount = document.createElement('img');
                                                  hatebCount.setAttribute('src', 'http://b.hatena.ne.jp/entry/image/' + href);
                                                  hatebCount.setAttribute('style', 'margin-left: 2px; border: none');
                                                  hatebLinkB.appendChild(hatebCount);
                                              }
                                              // hateb span
                                              var hatebBlock = document.createElement('span');
                                              hatebBlock.setAttribute('id', 'hateb:' + href);
                                              hatebBlock.appendChild(hatebLinkA);
                                              hatebBlock.appendChild(hatebLinkB);
                                              title.appendChild(hatebBlock);
                                          }
                                      });
                                  }
                              }
                              if (event.keyCode == 79 && !event.shiftKey) {
                                  // 'o' key down and pins exist
                                  for (var href in pins) {
                                      if (href == 'peek') {
                                          break; // for Opera's Array
                                      }
                                      window.open(href);
                                      delete pins[href];
                                      var e = document.getElementById(href);
                                      if (e) {
                                          e.parentNode.removeChild(e);
                                      }
                                  }
                              }
                          },
                          false);
})();
