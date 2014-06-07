// Now shoosh!, v0.6.3
// Copyright (c) 2008-2010, Vitor Peres <dodecaphonic@gmail.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Updated: Thu May 28 20:11:26 2009
//
// ==UserScript==
// @name           Now shoosh!
// @namespace      http://userscripts.org/scripts/show/33629
// @description    A boon to twitter sanity, "Now shoosh!" allows you to mute people you don't really wanna read right now.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

(function(realWindow) {
   var jQuery = realWindow.jQuery,
   $ = jQuery;

   var nowShoosh = {
     shooshable: {},
     listCreated: false,
     tootCount: 0,
     checkEvery: 1, // x second s

     contactsInTimeline: function(timeline) {
       return timeline.map(function(i, toot) {
                             return nowShoosh.getAuthorName(toot);
                           });
     },
     getTimeline: function() {
       return $("#timeline > li");
     },
     shooshToot: function(_, toot) {
       toot.style.display = 'none';
     },
     onShooshContact: function(contact) {
       nowShoosh.shooshContact(contact);
       nowShoosh.sayNoMore(contact);
       nowShoosh.addContactToShooshedDisplayList(contact, nowShoosh.getContactImageURL(contact));
     },
     shooshContact: function(contact) {
       setTimeout(function() {
                    var users = nowShoosh.retrieveShooshedContacts();
                    users.push(contact);
                    nowShoosh.storeShooshedContacts(users);
                  }, 0);
     },
     sayNoMore: function(contact) {
       nowShoosh.filterTootsFromContact(contact).each(nowShoosh.shooshToot);
     },
     makeShooshable: function(order, toot) {
       if(!nowShoosh.shooshable[toot.id]) {
         var linkList = $("#" + toot.id + " > span:eq(1) > ul")[0];
         var shooshList = linkList.appendChild(document.createElement("li"));
         var container = shooshList.appendChild(document.createElement('span'));
         var shoosh = container.appendChild(document.createElement('a'));
         shoosh.href = 'javascript:;';
         shoosh.appendChild(document.createTextNode("Shoosh"));
         //shoosh.style.fontSize = 'small';
         shoosh.className = 'reply';
         shoosh.style.paddingLeft = '10px';
         $(shoosh).click((function(a) {
                            return function() {
                              nowShoosh.onShooshContact(a);
                              return false;
                            };
                          })(nowShoosh.getAuthorName(toot)));
         nowShoosh.shooshable[toot.id] = true;
       }
     },
     getAuthorName: function(toot) {
       var el = $("#" + toot.id + " > span:eq(1) > span:eq(0) > strong > a");
       if(el.length > 0) {
         return el[0].innerHTML;
       } else {
         el = $("#" + toot.id + " > span:eq(1) > strong > a");
         if(el.length > 0) {
           return el[0].innerHTML;
         } else {
           return "bogus"; // frankly, this shouldn't be here: it's a quick fix
           // for an ugly "undefined" situation
         }
       }
     },
     retrieveShooshedContacts: function() {
       var users = GM_getValue('shooshedContacts', null);
       return users ? users.split(';') : [];
     },
     storeShooshedContacts: function(contacts) {
       GM_setValue('shooshedContacts', contacts.join(';'));
     },
     isShooshed: function(contact) {
       var allShooshed = nowShoosh.retrieveShooshedContacts();
       return allShooshed.indexOf(contact) != -1;
     },
     findShooshedInTimeline: function(contacts) {
       var temp = [];
       // This is silly. There's some closure bug here that prevents
       // me from calling retrieveShooshedContacts from within the
       // iteration function. It always comes out as undefined, instead
       // of an array, as the function states. I don't want to deal
       // with it so badly right now, but I'll check it out later.,
       contacts.each(function(i, v) {
                       temp.push(v);
                     });
       return temp.filter(function(c) { return nowShoosh.isShooshed(c); });
     },
     addContactToShooshedDisplayList: function(contact, img_url) {
       var list = nowShoosh.getShooshedDisplayList();
       var tr   = list.appendChild(document.createElement('tr'));
       var imgcont = tr.appendChild(document.createElement('td'));
       imgcont.setAttribute('class', 'vcard');
       imgcont.setAttribute('valign', 'top');
       var link = imgcont.appendChild(document.createElement('a'));
       link.href = 'http://twitter.com/' + contact;
       var img = link.appendChild(document.createElement('img'));
       img.src = img_url;
       var name = tr.appendChild(document.createElement('td'));
       name.setAttribute('valign', 'top');
       name.appendChild(document.createTextNode(contact));
       var unmcont = tr.appendChild(document.createElement('td'));
       unmcont.setAttribute('valign', 'top');
       var unshoosh  = unmcont.appendChild(document.createElement('a'));
       unshoosh.setAttribute('class', 'section-links');
       unshoosh.href = 'javascript:;';
       unshoosh.addEventListener('click', function() {
                                   nowShoosh.onUnshooshContact(contact);
                                 }, false);
       unshoosh.appendChild(document.createTextNode('Unshoosh'));
     },
     onUnshooshContact: function(contact) {
       nowShoosh.filterTootsFromContact(contact).each(function OUC_showToot(i, t) {
                                              t.style.display = 'block';
                                            });
       nowShoosh.removeFromShooshedDisplayList(contact);
       nowShoosh.unshooshContact(contact);
     },
     unshooshContact: function(contact) {
       setTimeout(function() {
                    var contacts = nowShoosh.retrieveShooshedContacts();
                    var stillShooshed  = contacts.filter(function(c) {
                                                           return contact != c;
                                                         });
                    nowShoosh.storeShooshedContacts(stillShooshed);
                  }, 0);
     },
     removeFromShooshedDisplayList: function(contact) {
       var entries = $("#shooshed_list > tr");
       var entry   = entries.filter(function(i) {
                                      var row = entries[i];
                                      return row.childNodes[1].innerHTML == contact;
                                    })[0];
       nowShoosh.getShooshedDisplayList().removeChild(entry);
     },
     filterTootsFromContact: function(contact, toots) {
       toots = toots || nowShoosh.getTimeline();
       return toots.filter(function(i) {
                             return nowShoosh.getAuthorName(toots[i]) == contact;
                           });
     },
     getShooshedDisplayList: function() {
       var pane = $("#shooshed_pane")[0];
       if(pane) {
         return $("#shooshed_pane > #shooshed_list")[0];
       }
       else {
         return nowShoosh.createShooshedDisplayList();
       }
     },
     createShooshedDisplayList: function() {
       var sidePane = $('#side')[0];
       var pane = sidePane.appendChild(document.createElement('div'));
       pane.id = 'shooshed_pane';
       pane.setAttribute('class', 'section');
       var header = pane.appendChild(document.createElement('div'));
       header.setAttribute('class', 'section-header');
       var title  = header.appendChild(document.createElement('h1'));
       title.appendChild(document.createTextNode("People you've shooshed"));
       var list  = pane.appendChild(document.createElement('table'));
       list.id = 'shooshed_list';
       list.cellPadding = 0;
       list.cellSpacing = 2;
       list.style.width = "100%";
       return list;
     },
     getContactImageURL: function(contact, allToots) {
       var img = null;
       allToots = allToots || nowShoosh.getTimeline();
       var toots = nowShoosh.filterTootsFromContact(contact, allToots);

       if(toots.length > 0) {
         img = $("#" + toots[0].id + " > span:eq(0) > a:eq(0) > img")[0].src;
       }
       else {
         var base = 'http://twitter.com/users/show/';
         var req = new XMLHttpRequest();
         req.open('GET', base + contact + '.json', false);
         req.send(null);
         if(req.status == 200) {
           var details = eval("[" + req.responseText + "]")[0];
           img = details["profile_image_url"];
         }
       }
       img = img.replace(/_normal\./, '_mini.');

       return img;
     },
     showShooshedList: function(toots) {
       setTimeout(function() {
                    nowShoosh.retrieveShooshedContacts().forEach(function SMC_addToList(c) {
                      nowShoosh.addContactToShooshedDisplayList(c, nowShoosh.getContactImageURL(c));
                    });
                    nowShoosh.listCreated = true;
                  }, 0);
     },
     onUnshooshContactUserPage: function(contact) {
       nowShoosh.unshooshContact(contact);
       nowShoosh.makeContactPageShooshable(contact);
     },
     onShooshContactUserPage: function(contact) {
       nowShoosh.shooshContact(contact);
       nowShoosh.makeContactPageShooshable(contact);
     },
     makeContactPageShooshable: function(contact) {
       var doTheShooshing = $("#do-the-shooshing");
       if(doTheShooshing.length > 0) {
         doTheShooshing.empty().remove();
       }

       var text, fn;
       if(!nowShoosh.isShooshed(contact)) {
         text = "(Shoosh)";
         fn   = function() {
           nowShoosh.onShooshContactUserPage(contact);
         };
       } else {
         text = "(Unshoosh)";
         fn   = function() {
           nowShoosh.onUnshooshContactUserPage(contact);
         };
       }

       var isRelationship = $(".is-relationship");
       doTheShooshing = isRelationship[0].appendChild(document.createElement("a"));
       doTheShooshing.id = "do-the-shooshing";
       doTheShooshing.href = "javascript:;";
       doTheShooshing.addEventListener("click", fn, false);
       doTheShooshing.innerHTML = text;
     },

     // Where the magic happens
     shoosh: function() {
       var toots = nowShoosh.getTimeline();
       toots.each(nowShoosh.makeShooshable);
       var shooshed = nowShoosh.findShooshedInTimeline(nowShoosh.contactsInTimeline(toots));
       shooshed.forEach(function(contact) { nowShoosh.sayNoMore(contact); });
       if(!nowShoosh.listCreated) nowShoosh.showShooshedList(toots);
       nowShoosh.tootCount = toots.length;
     },
     monitor: function() {
       if(nowShoosh.tootCount != nowShoosh.getTimeline().length) {
         nowShoosh.shoosh();
       }
       setTimeout(nowShoosh.monitor, nowShoosh.checkEvery * 1000);
     },
     load: function() {
       var location = realWindow.document.location.href;
       if(!location.match(/http(s)?:\/\/twitter\.com\/(.+)/)) {
         nowShoosh.shoosh();
         setTimeout(nowShoosh.monitor, nowShoosh.checkEvery * 1000);
       } else {
         var subUrl = location.split(/http(s)?:\/\/twitter.com\//)[2];
         var parts  = subUrl.split("/");
         if(parts.length == 1) { // Ok, this is probably an user.
           var contact = parts[0];
           nowShoosh.makeContactPageShooshable(contact);
         }
       }
     }
   };

   nowShoosh.load();
 })(typeof jQuery == "undefined" ? unsafeWindow : window);
