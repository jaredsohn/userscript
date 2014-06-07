// ==UserScript==
// @name           Reddit: Modqueue autoban
// @namespace      tag:brainonfire.net,2010-07-31:reddit-modqueue-autoban
// @description    Allow a moderator to set a spammer as "autobanned". The script will then automatically confirm removal of all of their posts in the modqueue (upon every load) and hide these entries. The sidebar will be modified to contain a list of these users, and will allow their removal from the list.
// @include        http://www.reddit.com/r/*/about/modqueue*
// @include        http://www.reddit.com/r/*/about/spam*
// @include        http://www.reddit.com/r/*/about/reports*
// @license        GPL
// @version        3.1.7
// @changes        Since 3.1.6: Fix for detecting subreddit of links; activate on /r/___/about/unmoderated/
// ==/UserScript==

if(!/^http:\/\/www\.reddit\.com\/r\/[0-9a-z_]+\/about\/(spam|modqueue|reports|unmoderated)[\/.?#]?.*$/i.exec(document.location)) {
   return;
}

/** Run entire script inside page. From http://wiki.greasespot.net/Content_Scope_Runner */
if(typeof __PAGE_SCOPE_RUN__ == 'undefined') {
   (function page_scope_runner() {
      var script = document.createElement('script');
      script.setAttribute("type", "application/javascript");
      script.textContent = "(function() { var __PAGE_SCOPE_RUN__ = 'yes'; (" + page_scope_runner.caller.toString() + ")(); })();";
      document.documentElement.appendChild(script);
      document.documentElement.removeChild(script);
   })();
   return;
}

function partial(fn) {
   var baseArgs = Array.prototype.slice.call(arguments, 1);
   return function() {
      var plusArgs = Array.prototype.slice.call(arguments);
      return fn.apply(window, baseArgs.concat(plusArgs));
   };
};

/**
 * Call an asynchronous function once for each element of the list, then
 * continue with k. The provided function must have signature (el k & opt) where
 * el is an element of the list and k is called as a continuation. The function
 * will be passed any extra arguments that kEach and its continuations are called
 * with.
 * Returns undefined.
 */
function kEach(fn, list, k) {
   var index = 0;
   function trampoline() {
      index++;
      if(index < list.length) {
         fn.apply(this, [list[index], trampoline].concat([].slice.apply(arguments)));
      } else {
         if(k) k();
      }
   }
   fn.apply(this, [list[index], trampoline].concat([].slice.call(arguments, 3)));
}

/* From http://plugins.jquery.com/project/Cookie under GPL */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

var natnum_re = /^[0-9]+$/;
function isNaturalNumber(x) {
   // (isFinite(x) && x >= 0) still doesn't check for integrality
   return (typeof x == "number" || x instanceof Number) && natnum_re.exec(""+x) != null && x >= 0;
}

/*========*
 * CONFIG *
 *========*
 Configure the script according to the current environment. */

var srFilter = reddit.post_site || null;

const storeKey = 'autoban';
const storeVersion = 3; // must match script major version!

/*======*
 * DATA *
 *======*/

function makeEmptyStore() {
   return {'version':storeVersion, // Datastore compatibility version (matches script major version)
           'byreddit':{}, // hash of subreddits to username arrays (banned within subreddit)
           'sitewide':{} // hash of usernames to subreddit name arrays (banned globally, was local to those subreddits)
   };
}

function getStore() {
   var value, store;
   if(!(value = localStorage.getItem(storeKey)) || !(store = JSON.parse(value))) {
      store = makeEmptyStore();
   }
   if(store.version != storeVersion) {
      upgradeStore(store);
   }
   return store;
}

function setStore(store) {
   localStorage.setItem(storeKey, JSON.stringify(store));
}

/*=========*
 * UPGRADE *
 *=========*/

function testWebStorage() {
   var testKey = 'miuwaeikcuhkiwe';
   var testValue = '5abc';
   var e;
   try {
      window.localStorage; // even retrieving it throws an error if it is disabled
   } catch(e) {
      fail("Please re-enable HTML5 WebStorage (sometimes called DOMStorage) in your browser.");
   }
   if(!localStorage)
      fail("Your browser does not support HTML5 WebStorage! Downgrade to script v2 or upgrade your browser.");
   try {
      localStorage.setItem(testKey, testValue);
   } catch(e) {
      fail("HTML5 WebStorage full or forbidden.");
   }
   if(localStorage.getItem(testKey) !== testValue)
      fail("Failure during HTML5 WebStorage test.");
   localStorage.removeItem(testKey);
}

function setLegacyStores() {
   $.cookie(storeKey, JSON.stringify({version:storeVersion, msg:"We use HTML5 WebStorage as of v3, instead of cookies."}), {expires: 1000, path: '/', domain:'.reddit.com'});
}

function detectLegacyStore() {
   var cookie, store;
   if((cookie = $.cookie(storeKey)) && (store = JSON.parse(cookie)) && isNaturalNumber(store.version)) { // valid cookie
      if(store.version > 2) { // forwarding cookie -- 2 was the last version to use cookies
         return;
      }
      testWebStorage();
      if(uneval(makeEmptyStore()) != uneval(getStore())) { // Don't overwrite non-empty modern store!
         fail("You have both a cookie and a WebStorage version of autoban! Aborting upgrade.");
      }
      warn("Upgrading from cookie to HTML5 WebStorage. Just in case your browser fails at WebStorage, keep your data safe for at least one browser restart:", JSON.stringify(store));
      upgradeStore(store);
      setStore(store);
   }
   setLegacyStores(); // no legacy data, so leave a forwarding address
}

/** Perform in-place upgrade of store. */
function upgradeStore(store) {
   if(!isNaturalNumber(store.version)) {
      fail("Store's version field is not a natural number.");
   } else if(store.version > storeVersion) {
      fail("Upgrade the reddit-modqueue-autoban script. Stored data is of version "+store.version+", which is greater than the script's version.");
   }
   
   // I finally have a use for the fallthrough behavior of switch!
   switch(store.version) {
   case 0:
      store.version = 1;
   case 1:
      store.version = 2;
      store.sitewide = {};
   case 2:
      store.version = 3;
   }
}

/*=====*
 * OPS *
 *=====*
 Modify a valid store instance in-place. */

/** Adds a local ban (or adds to listing in any global ban.) */
function banUser(store, sr, uname) {
   if(store.sitewide[uname]) {
      store.sitewide[uname].push(sr);
      return;
   }
   var users = store.byreddit[sr];
   if(!users) {
      store.byreddit[sr] = [uname];
   } else if(users.indexOf(uname) < 0) {
      store.byreddit[sr].push(uname);
   }
}

/** Removes a local ban (or removes from listing in any global ban.) */
function unbanUser(store, sr, uname) {
   if(store.sitewide[uname]) {
      var subs = store.sitewide[uname];
      var pos = subs.indexOf(sr);
      if(pos >= 0) {
         subs.splice(pos, 1);
         return;
      }
   }
   var users = store.byreddit[sr];
   if(!users) {
      return;
   }
   var foundAt = users.indexOf(uname);
   if(foundAt < 0) {
      return;
   }
   users.splice(foundAt, 1);
   store.byreddit[sr] = users;
}

/**
 * Make this user banned site-wide.
 */
function promoteBan(store, uname) {
   var locals = [];
   for(var sr in store.byreddit) {
      var ul = store.byreddit[sr];
      var pos = ul.indexOf(uname);
      if(pos != -1) {
         locals.push(sr); // add to global
         ul.splice(pos, 1); // remove from local
      }
   }
   if(store.sitewide[uname]) {
      locals.concat(store.sitewide[uname]);
   }
   store.sitewide[uname] = locals;
}

/**
 * Convert a global ban into local ones.
 */
function demoteBan(store, uname) {
   if(!store.sitewide[uname]) {
      return;
   }
   var subs = store.sitewide[uname]; // copy and delete, or banUser will put them right back!
   delete store.sitewide[uname];
   subs.forEach(function(sr) {
      banUser(store, sr, uname);
   });
}

function isBanned(store, uname, sr) {
   return store.sitewide[uname] || store.byreddit[sr] && store.byreddit[sr].indexOf(uname) != -1;
}

/*=====*
 * GUI *
 *=====*
 Modify the DOM. */

var $killspinner = $('<img class="killspinner" src="data:image/gif;base64,R0lGODlhEAAQAPEAAP%2F%2F%2FwAAADY2NgAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAACLYSPacLtvkA7U64qGb2C6gtyXmeJHIl%2BWYeuY7SSLozV6WvK9pfqWv8IKoaIAgAh%2BQQJCgAAACwAAAAAEAAQAAACLYSPacLtvhY7DYhY5bV62xl9XvZJFCiGaReS1Xa5ICyP2jnS%2BM7drPgIKoaIAgAh%2BQQJCgAAACwAAAAAEAAQAAACLISPacLtvk6TE4jF6L3WZsyFlcd1pEZhKBixYOie8FiJ39nS97f39gNUCBEFACH5BAkKAAAALAAAAAAQABAAAAIshI9pwu2%2BxGmTrSqjBZlqfnnc1onmh44RxoIp5JpWN2b1Vdvn%2FZbPb1MIAQUAIfkECQoAAAAsAAAAABAAEAAAAi2Ej2nC7b7YaVPEamPOgOqtYd3SSeFYmul0rlcpnpyXgu4K0t6mq%2FwD5CiGgAIAIfkECQoAAAAsAAAAABAAEAAAAiyEj2nC7b7akSuKyXDE11ZvdWLmiQB1kiOZdifYailHvzBko5Kpq%2BHzUAgRBQA7AAAAAAAAAAAA"/>');

var $banlist;

function makeBanListing() {
   $('head').append('<style type="text/css"> \
                        .autobanlist { position: relative; } \
                        .autobanlist a.expand { position: absolute; top: -2px; right: 0; } \
                        .autobanlist u.listing { padding-left: 1em; text-indent: -1em; line-height: 1.5; font-size: .9em; } \
                     </style>');
   $('<div class="spacer"> \
         <div class="sidecontentbox autobanlist thing"> \
            <h1> \
               <a href="http://userscripts.org/scripts/show/82709" title="Go to userscript page">Autoban list'+
               (srFilter ? ' for /r/'+srFilter : '')+'</a> \
            </h1> \
            <div class="content entry"> \
               <div class="collapsed"> \
                  <a class="expand" onclick="return showcomment(this)" href="#">[+]</a> \
                  (collapsed) \
               </div> \
               <div class="noncollapsed"> \
                  <a class="expand" onclick="return hidecomment(this)" href="#">[-]</a> \
                  <ul class="listing"></ul> \
                  <p>Reminder: Never use this on users who sometimes post \
                     non-spam content -- it can mis-train the spamfilter.</p> \
               </div> \
            </div> \
         </div> \
      </div>')
      .insertAfter('body > .side > .spacer:first');
   var autoOpen = JSON.parse(localStorage.getItem("autoban-default-open")) || false;
   $(".autobanlist").find(autoOpen ? ".collapsed" : ".noncollapsed").css("display", "none");
}

function showCurrentBans(store) {
   if(srFilter) {
      var smaller = makeEmptyStore();
      smaller.byreddit[srFilter] = store.byreddit[srFilter];
      smaller.sitewide = store.sitewide;
      store = smaller;
   }
   var $banlist = $('.autobanlist ul.listing');
   $banlist.empty();
   for(var sr in store.byreddit) {
      var userlist = store.byreddit[sr];
      for(var unameDex in userlist) {
         var username = userlist[unameDex];
         showLocalBan(sr, username, $banlist);
      }
   };
   for(var uname in store.sitewide) {
      var srs = store.sitewide[uname];
      showGlobalBan(uname, srs, $banlist);
   }
}

function showLocalBan(sr, uname, listing) {
   $('<li class="local"><a href="/user/'+uname+'">'+uname+'</a> '+(srFilter ? '' : 'in <a href="/r/'+sr+'">'+sr+'</a> ')+'\
          [<a class="unban" href="javascript:void()" title="Remove user from autoban list">unban</a>] \
          [<a class="sitewide" href="javascript:void()" title="Make this a site-wide ban">global</a>]</li>')
      .appendTo(listing)
      .find('a.unban').bind('click', partial(askedUnban, sr, uname)).end()
      .find('a.sitewide').bind('click', partial(askedPromote, uname)).end();
}

function showGlobalBan(uname, srs, listing) {
   $('<li class="global"><a href="/user/'+uname+'">'+uname+'</a> <abbr title="Was banned in: '+srs.join(', ')+'">site-wide</abbr> \
          [<a class="unban" href="javascript:void()" title="Entirely remove user from autoban list">unban</a>] \
          [<a class="local" href="javascript:void()" title="Move back to local bans:">local</a>]</li>')
      .appendTo(listing)
      .find('a.local').bind('click', partial(askedDemote, uname)).end();
}

function fail(msg) {
   $('<div class="gmerror"></div>').text("autoban script error: "+msg).prependTo('body');
   throw msg;
}

function warn(msg, raw) {
   var $warn = $('<div class="gmwarn"></div>').text("autoban script warning: "+msg).prependTo('body');
   if(raw) {
      $("<pre></pre>").text(raw).appendTo($warn);
   }
}

/*======*
 * CORE *
 *======*/

// An array-backed queue whose start is marked by an index.
var removalQ = []; // [{el:element, sr:subreddit, uname:username, spam:boolean} ...]
var remQdex = 0; // if queue is empty, this is == removalQ.length

var remWorking = false; // a lock, protecting removal objects

/** Kill one doomed item and call the continuation k (or async-recurse).
 * This continuation-passing style allows iteration over a list without
 * blocking. */
function killNextItem(k) {
   if(remWorking) return; // squash any event "threads" that try to interleave with an older one
   
   var item = removalQ[remQdex];
   if(!item) {
      if(k) k();
      return;
   }
   var $el = $(item.el);
   $el.prepend($killspinner);
   
   remWorking = true;
   $.ajax({
      type: 'POST',
      url: '/api/remove',
      data: {
         id: $el.thing_id(),
         uh: reddit.modhash,
         r: item.sr,
         spam: item.spam,
         renderstyle: 'html'
      },
      success: partial(killSucceed, k),
      error: partial(killFail, k),
      timeout: 3000,
      dataType: 'json'
   });
}

function killSucceed(k, data, status, xhr) {
   remWorking = false;
   $(removalQ[remQdex].el).slideUp().queue(function() {
      $(this).remove().dequeue();
   });
   remQdex++;

   killNextItem(k);
}

function killFail(k, xhr, status, error) {
   remWorking = false;
   
   fail("Error removing "+$(removalQ[remQdex]).thing_id()+". status=["+xhr.status+"] status=["+status+"] error=["+error+"]");
}

/** Return subreddit string, or logical false. */
function subredditOfThing(el) {
   var $link = $();
   if($(el).hasClass('link')) {
      $link = $(el).find('.entry a.comments');
   } else if($(el).hasClass('comment')) {
      $link = $(el).find('.bylink');
   }
   var sr;
   if ($link.size() === 0) {
      $(el).addClass("autoban-error").addClass("autoban-error_nolink");
   } else {
      console.log(el);
      console.log(/\/r\/([^/]+)/.exec($link.attr('href')));
      sr = /\/r\/([^/]+)/.exec($link.attr('href'))[1];
   }
   if (!sr) {
      $(el).addClass("autoban-error").addClass("autoban-error_nosr");
   }
   return sr;
}

/** Judge a thing. If judged as autoban-eligible, add "autoban-doomed" class and
 * queue for removal. */
function judgeItem(store, i, el) {
   if($(el).find('.big-mod-buttons .neutral').size() == 0) return; // already removed
   var user = $(el).find('.author').eq(0).text();
   var subreddit = subredditOfThing(el);
   if(!subreddit) return;
   var asSpam = $(el).find('.big-mod-buttons .negative').size() == 1;
   if(isBanned(store, user, subreddit)) {
      $(el).addClass('autoban-doomed'); // just for visual effects
      removalQ.push({el:el, sr:subreddit, uname:user, spam:asSpam});
   }
}

/* 1) Judge all items, 2) remove all doomed, 3) call continuation function. */
function scanAndNuke(store, k) {
   if(remWorking) return; // don't stomp on existing "thread"
   $('#siteTable > .thing').each(partial(judgeItem, store));
   killNextItem(k);
}

function addBanLink(i, el) {
   var $buttons = $('.buttons', el);
   $('<li class="autoban"><a href="javascript:void(0)" title="Automatically remove this user\'s posts from this subreddit, always">autoban</a></li>')
      .find('a').bind('click', partial(askedAutoban, el)).end()
      .appendTo($buttons); // Would like .appendTo('.buttons', el), but... http://dev.jquery.com/ticket/6856
}

function innervateRemaining() {
   $('#siteTable > .thing').each(addBanLink);
}

/*========*
 * EVENTS *
 *========*
 Respond to page events. */

function askedAutoban(item) {
   var user = $('.author', item).text();
   var sr = srFilter || subredditOfThing(item);
   if(!sr) {
      window.alert("Could not determine subreddit of item. Aborting.");
      return;
   }
   if(!window.confirm('Autoban user '+user+' from '+sr+'?'))
      return;

   var store = getStore();
   banUser(store, sr, user);
   setStore(store);
   
   showCurrentBans(store);
   scanAndNuke(store);
   
   return false;
}

function askedUnban(sr, username) {
   var store = getStore();
   unbanUser(store, sr, username);
   setStore(store);
   
   showCurrentBans(store);
   
   return false;
}


function askedPromote(uname) {
   var store = getStore();
   promoteBan(store, uname);
   showCurrentBans(store);
   setStore(store);
   
   if(!srFilter) {
      scanAndNuke(store);
   }
   
   return false;
}

function askedDemote(uname) {
   var store = getStore();
   demoteBan(store, uname);
   showCurrentBans(store);
   setStore(store);
   
   return false;
}

/*=====*
 * API *
 *=====*
 Functions that are callable from the global namespace. */

/**
 * Called when a link has been auto-removed.
 */
function afterRemoved() {
   //TODO
}

window.autoban = {
   //events
   afterRemoved:afterRemoved,
   //data
   read:getStore,
   write:setStore,
   add:banUser,
   remove:unbanUser,
   promote:promoteBan,
   demote:demoteBan,
   //GUI
   refresh:showCurrentBans
};

/*======*
 * INIT *
 *======*/

function init() {
   $('head').append('<style type="text/css"> \
  .side .autobanlist p { margin: 1em; font-size: smaller; } \
  #siteTable .autoban-doomed { border: 4px dotted black; } \
  #siteTable .autoban-doomed .big-mod-buttons { opacity: .3; } \
  #siteTable .autoban-doomed .autoban { display: none; } \
  #siteTable img.killspinner { float: right; } \
  #siteTable .autoban-error { border: 4px dotted red; } \
  body > .gmerror { \
    color: red; border: 1px solid red; padding: .25em; font-size: 15px; } \
  body > .gmwarn { \
    background-color: black; color: yellow; border: 2px solid yellow; \
    padding: .25em; font-size: 15px; } \
  body > .gmwarn pre { border: 1px solid yellow; overflow: auto; \
    font-size: medium; padding: .4em; margin: .5em; } \
</style>');
   
   detectLegacyStore();
   makeBanListing();
   var initStore = getStore();
   showCurrentBans(initStore);
   scanAndNuke(initStore, innervateRemaining);
}

try {
   init();
} catch(e) {
   fail(e);
}

