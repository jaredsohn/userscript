// ==UserScript==
// @name          RS Forums Enhancer
// @namespace     http://www.xfire.com/profile/frostedfreeze/
// @description   A script that greatly enhances the RuneScape forums by adding a variety of new features.
// @include       http://services.runescape.com/m=forum/*
// @include       http://forum.runescape.com/*
// @include       http://services.runescape.com/m=forum_pt/*
// @include       http://services.runescape.com/m=forum_fr/*
// @include       http://services.runescape.com/m=forum_de/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// ==/UserScript==

// Declare global variables

function gVariables() {
  window.updatePeriod = 604800000; // 1 week
  window.timeout = 2500; // HTTP request timeout
}

// Load external scripts such as jQuery

function loadScript(url, callback) { // I am a genius
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: function(r) {
      if(r.finalUrl != url) return setTimeout(function() { loadScript(url, callback) }, timeout);
      var evaluate = this.eval || eval;
      evaluate(r.responseText); // Don't judge me
      callback();
    }
  });
}

// jQuery specific functions

function jQuery_functions() {
  $.fn.allContents = function() { return this.find('*').andSelf().contents(); }
  $.fn.slideAway = function() { this.slideUp('1000', function() { $(this).remove(); }); }
  $.fn.reverse = [].reverse;
}

// Resolve GM_ issues

function S_functions() {
  var sPrefix = 'RSFE_';
  if(typeof GM_deleteValue == 'undefined') { // Recreate GM_ functions with localStorage
    window.S_deleteValue = function(name) { return localStorage.removeItem(sPrefix + name); };
    window.S_getValue = function(name, defaultValue) {
      var val = localStorage.getItem(sPrefix + name);
      if(!val) return defaultValue;
      try {
        return JSON.parse(val);
      } catch(error) {
        S_deleteValue(name);
        return defaultValue;
      }
    };
    window.S_listValues = function() {
      var vals = [];
      for(var val in localStorage) if(val.substring(0, sPrefix.length) == sPrefix) vals.push(val.substring(sPrefix.length));
      return vals;
    };
    window.S_setValue = function(name, value) {
      var v;
      try { v = JSON.stringify(value); }
      catch(error) { return; }
      localStorage.setItem(sPrefix + name, v);
      return value;
    };
  } else { // Replace GM_ functions with limited datatype support
    window.S_deleteValue = GM_deleteValue;
    window.S_getValue = function(name, defaultValue) {
      var val = GM_getValue(name);
      if(!val) return defaultValue;
      try {
        return JSON.parse(val);
      } catch(error) {
        S_deleteValue(name);
        return defaultValue;
      }
    }
    window.S_listValues = GM_listValues;
    window.S_setValue = function(name, value) {
      var v;
      try { v = JSON.stringify(value); }
      catch(error) { return; }
      GM_setValue(name, v)
      return value;
    };
  }
  window.S_value = function(name, value) { return S_getValue(name) || S_setValue(name, value); }; // Ask for value; set if not available
}

// unsafeWindow

/*

window.unsafeWindow || (unsafeWindow = function() {
  var e = document.createElement('p');
  e.setAttribute('onclick', 'return window;');
  return e.onclick();
}());

*/

// Main functions

function gUser() { window.me = $('#UsernameDisplay h5 span:first-child').text(); }

function gPage() { // Chrome lets window.varName declaration proceed with varName == window.varName by default, but since Firefox wants to be a special snowflake all cases of varName must be referenced from window object
  var topURL = window.location.href.replace(/.+\//, '');
  window.session = (/(\w+=[^\/]+\/)?$/).exec($('#RuneScapeLogo a').attr('href'))[1] || ''; // Make this also work with the session the client gives when logging into site
  window.pageClip = $('img[src*="refresh.gif"]').parents('a').attr('href') || topURL;
  window.b = pageClip.replace(/(,goto,|,highlight,).+$/, ''); // Base URL
  window.p = '1';
  if((/,goto,\d+/).test(pageClip)) window.p = (/,goto,(\d+)/).exec(pageClip)[1];
  var e = $('#Trail').clone();
  $('a + span, a, span:not(:last-child)', e).remove();
  window.l = e.text().replace(/(^\s+|\s+$)/g, '');
  window.safeURL = pageClip;
  if(window.safeURL.indexOf('users.ws') > -1 && l.indexOf(':') > -1) window.safeURL = 'users.ws?searchname=' + l.split(': ')[1].replace(/\s/g, '%A0') + '&lookup=view';
  if(lastURL.indexOf(',thd,') > -1) window.safeURL = topURL;
  $('.GoodAttention .uname').first().each(function() { window.safeURL = b + ',&showuser=' + $(this).text().replace(/\s/g, '%A0'); });
  var setURL = window.safeURL;
  setURL = setURL.replace(/,goto,1$/, '');
  if($('.msghighlight').length > 0) setURL = topURL;
  window.safeURL = window.safeURL.replace(/,goto,1$/, '');
  if(b.indexOf('users.ws') > -1 && l.indexOf(':') > -1) b = 'users.ws?searchname=' + l.split(': ')[1].replace(/\s/g, '%A0') + '&lookup=view';
  history.replaceState('data', 'title', setURL);
}

function sVars() {
  window.lastURL = window.location.href;
  window.banned = false;
}

function gModule() {

  /*

  Module identification

  Jagex has multiple forum modules spread among its sites and each module contains a separate forum account tied to your Jagex account
  This means that your post count on one forum module will be different on another
  Each forum module has a separate set of forum moderators

  ''		- RuneScape English forum
  '_de'		- RuneScape German forum
  '_fr'		- RuneScape French forum
  '_pt'		- RuneScape Portuguese (Brazilian) forum
  '_fo'		- FunOrb/Stellar Dawn/War of Legends English forum
  '_fo_de'	- FunOrb/Stellar Dawn/War of Legends German forum
  '_fo_fr'	- FunOrb/Stellar Dawn/War of Legends French forum
  '_fo_pt'	- FunOrb/Stellar Dawn/War of Legends Portuguese (Brazilian) forum

  Currently this script supports all RuneScape forum modules
  If the other modules are updated with the new RuneScape forum template it will support those

  FunOrb contains the original forum template and Stellar Dawn contains the 2nd to newest revision, yet are both the same module
  This is useful for differentiating between the two and bringing old features removed into the new forum revision

  */

  window.forum = {};
  forum['module'] = (/\/m=(forum[^\/]*)\//).exec(window.location.href)[1];
  forum['suffix'] = forum['module'].replace(/forum(.*_)?/, ''); // Potential removal in favor of /l=#/
  var flag = $('#Footer img.SelectedLang');
  $('#Footer img.flag').each(function() {
    if($(this).attr('src') != flag.attr('src')) return;
    forum['language'] = $(this).attr('alt');
    var url = $(this).parent().attr('href');
    forum['sL'] = (/\/sl=(\d+)\//).exec(url)[1];
    var lRegex = (/\/m=forum[^\/]*?\/l=(\d+)\//).exec(url);
    forum['l'] = lRegex ? lRegex[1] : '0';
  });
  forum['uniqueID'] = '-' + forum['module'];
  forum['uniqueIDSL'] = '-' + forum['module'] + '-sl' + forum['sL'];
//  console.log(forum);
}

function bBan() {
  if($('#errorContent a[href*="logout"]').length == 0) return;
  banned = true;
  var url = removeSession(lastURL);
  refresh(url, '#MainContent');
}

function qRefresh() {
  $('img[src*="refresh.gif"]').parents('a').click(function(event) {
    if(event.ctrlKey) return;
    event.preventDefault();
    refresh(safeURL);
  });
}

function qF5() {
  $(document).bind("keydown", function(event) {
    if(event.keyCode != 116) return;
    event.preventDefault();
    refresh(safeURL);
  });
}

function qNav() {
  var cPg = p;
  var up = function() { if(cPg != p) $(window).scrollTop($('.headerBar').offset().top); };
  $('.PageControlAdvancedLeft > a, .PageControlAdvancedMiddle a, .PageControlAdvancedRight > a').click(function(event) {
    if(event.ctrlKey) return;
    event.preventDefault();
    refresh($(this).attr('href'), '', up);
  });
}

function qSubmit() {
  var up;
  if($('.pageInput').length > 0) {
    var cPg = p;
    up = function() { if(cPg != p) $(window).scrollTop($('.headerBar').offset().top); };
  }
  $('.headerBar form, .PageControlAdvanced form, #lookupuser form').submit(function(event) {
    event.preventDefault();
    if(page == 'userView') return refresh('users.ws?' + $(this).serialize());
    refresh(b + ',goto,' + $('input[name="start"]', this).attr('value'), '', up);
  });
}

function pInfo(d) { // Take a snapshot of the unmodified posts
  if(typeof pDetails === 'undefined') {
    window.pDetails = {};
    window.pSet = $();
  }
  $('div.message', d).each(function() {
    var n = $(this).prev('.msgplace').attr('name');
    var c = $(this).clone(true);
    pDetails[n] = c;
    pSet = pSet.add(c);
  });
  //$.map(pDetails, function(value) { pS = pS.add(value); });
}

function qEdit(e) { // ******
  $('.BubbleLinks a[href*="edit"]', e).click(function(event) {
    event.preventDefault();
    var post = $(this).parents('.rightpanel');
    var n = post.parents('div.message').prev('.msgplace').attr('name');
    var qE = $('#messageDetails').parents('form').clone().attr({'id': 'quickEdit' + n, 'action': $(this).attr('href')});
    $('#messageDetails', qE).removeAttr('id');
    $('#messageBubble', qE).removeAttr('id').attr('style', 'background: url("http://www.runescape.com/img/forum/messageDetailsBubble.png?1") top left transparent no-repeat; width: 644px; height: 300px; float: right; margin: 6px 23px 0 0; clear: right;');
    $('label', qE).attr({'for': 'quickEditTextarea' + n, 'style': 'float: left; font-family: KingthingsPetrockRegular,Times New Roman,serif; margin: 11px 0 0 34px; font-size: 19px;'});
    var textValue = getPostText(pDetails[n]);
    $('textarea', qE).attr({'id': 'quickEditTextarea' + n, 'style': 'height: 227px; margin-top: 10px; margin: 5px 0 0 33px; word-wrap: break-word; overflow-x: hidden; overflow-y: auto; resize: none; background-color: transparent; border-radius: 0; clear: both; float: left; padding: 4px; width: 587px; border: none; font-family: Verdana, Arial, FreeSans, sans-serif; line-height: 1.5em; font-size: 13px; color: #CCC;', 'value': textValue, 'maxlength': '2000'});
    $('#cancel', qE).attr('id', 'quickEditCancel' + n).click(function(event) {
      event.preventDefault();
      var n = $(this).attr('id').substring(15);
      var o = pDetails[n].clone(true);
      var r = $('.rightpanel', o);
      steps('_posts', 'init', o);
      $('#quickEdit' + n).replaceWith(r);
      steps('_posts', 'post', $('.msgplace[name="' + n + '"] + div.message'));
    });
    $('#qrHolder, .leftpanel, .charsLeft, #smileyButton', qE).remove();
    $('.countSmileyAndButtons', qE).css('min-height', '50px');
    $('.quickReplyButtons span input', qE).each(function(i) {
      var name = ['Preview Post', 'Update Message'][i]; // Language pack
      $(this).removeAttr('id').attr({'title': name, 'value': name});
      $('b', $(this).prev()).text(name);
      if(i != 1) return;
      $(this).attr({'id': 'quickEditSubmit' + n, 'name': 'edit'});
      $(this).click(function(event) {
        event.preventDefault();
        var a = $(this).parents('form').attr('action');
        var n = $(this).attr('id').substring(15);
        var t = $('#quickEditTextarea' + n).attr('value');
        var o = pDetails[n].clone(true);
        var r = $('.rightpanel', o);
        $('.msgcontents > table > tbody > tr > td, .msgcontents:empty', r).html(t.replace(/\n/g, '<br>'));
        $('.BubbleContainer:not(.Blue.Pending)', r).addClass('Blue pending');
        steps('_posts', 'init', o);
        $('#quickEdit' + n).replaceWith(r);
        steps('_posts', 'post', $('.msgplace[name="' + n + '"] + div.message'));
        refresh(a + '&contents=' + encode(t) + '&edit=true');
      });
    });
    post.replaceWith(qE);
  });
}

function pLink(e) {
  $('.rightpanel', e).each(function() {
    var bL = $('.BubbleLinks', this);
    bL.append($('.BubbleCreation + .BubbleCreation a[href*="goto"]', this).attr('class', 'CssMO'))
    $('.BubbleCreation + .BubbleCreation', this).remove();
    var link = $('a[href*="goto"]', bL);
    if(link.length == 0) link = $(document.createElement('a')).addClass('CssMO').appendTo(bL);
    var n = parseInt($(this).parents('div.message').prev('.msgplace').attr('name'), 10);
    var loc = b + ',goto,' + (Math.ceil((n + 1) / 10)) + '#' + n; // Improper way to reference posts; used since major forum overhaul
    $('a[href], a[onclick]', this).first().each(function() { // Check if information to create proper post references exists
      var m = ($(this).attr('href') || $(this).attr('onclick')).match(/(?:,|-)(\d+)(?:,|-)(\d+)(?:]|$)/);
      if(m) return loc = b + ',' + m[1] + ',highlight,' + m[2] + '#' + n; // The proper way to reference posts; once added a .msghighlight class but has since been removed
    });
    link.attr('href', loc).text('#' + (n + 1));
  });
}

function qButton(e) {
  $('.rightpanel', e).each(function() {
    var qB = $('.BubbleLinks a[onclick*="[/quote]"]', this).remove();
    $('.replyButton', this).removeAttr('href').attr('onclick', qB.attr('onclick')).find('b').text(qB.text());
  });
}

function dProfile(e) {
  $('.BubbleLinks a[href*="&lookup=view"]', e).remove();
}

function sPosts(e) {
  if($('.BubbleCreation a[href*="goto"]', e).length > 0) return;
  $('.BubbleLinks', e).each(function() {
    var u = $('a.author', $(this).parents('div.message')).text(); // *********
    if(!u) return;
    $(this).css({'position': 'absolute', 'right': '0px'}).append($(document.createElement('a')).addClass('CssMO').attr('href', b + ',&showuser=' + u).text('Posts')); // Language pack;
  });
}

function rHidden(e) {
  if(!e) e = $('div.message:not(.hid)');
  else if(e.hasClass('hid')) return;
  e.each(function() {
    var n = $(this).prev('.msgplace').attr('name');
    if($('.avatarlink', pDetails[n]).length == 0) $(this).addClass('hid');
  });
}

function rPosts(e) {
  var colors = S_value('v_postColor', {'Friends': [43, 15, 43]});
  var images = S_value('v_images', {'postBG': ''});
  if(!images['postBG']) images['postBG'] = {'Friends': [[], '']};
  var friends = S_getValue('v_friends', [0, []]);
  var parseImage = function(image) {
    images = S_value('v_images', images);
    if(!images['postBG']) images['postBG'] = {'Friends': [[], '']};
    images['postBG']['Friends'] = [colors['Friends'], image];
    S_setValue('v_images', images);
    apply();
  }
  var apply = function() {
    if(!e) e = $('div.message');
    e.each(function() {
      if(friends[1].indexOf($('*[data-displayname]', this).attr('data-displayname')) > -1) {
        if($(this).attr('class') == 'message' || $(this).attr('class') == 'message msghighlight') $('.Bubble, .BubbleHeader, .BubbleFooter', this).css('background-image', 'url(' + images['postBG']['Friends'][1] + ')');
        if($('div.modtype', this).length == 0) $('div.leftpanel .avatarlink', this).after($(document.createElement('div')).attr('class', 'modtype').append($(document.createElement('span')).text('Friend')));
      }
    });
  }
  var qual = function(c) { return c[0] > c[1] + 10; };
  var checkImage = function() {
    if(images['postBG']['Friends'][0].toString() != colors['Friends'].toString()) return recolorImage('http://www.runescape.com/img/forum/threadView/forumBubbleRed.jpg', colors['Friends'], [43, 15, 14], qual, parseImage);
    apply();
  }
  if(new Date().getTime() >= friends[0] + updatePeriod && me) return getFriends(function() { friends = S_value('v_friends', friends); checkImage(); });
  checkImage();
}

function cAvatar(e) {
  $('img[src*="cachebust"]', e).attr('src', function(i, val) {
    return val.replace(/\?cachebust=.+/, '');
  });
}

function getFriends(callback) {
  $.get('/m=adventurers-log/' + session, function(data) {
    var d = document.createElement('html');
    d.innerHTML = data;
    if($('#errorContent', d).length > 0) return setTimeout(function() { getFriends(callback); }, timeout); // Annoying glitch where the log doesn't generate
    var friends = [new Date().getTime(), []];
    $('.PlayerInfoOnline', d).each(function() { friends[1].push($(this).attr('data-displayname')); });
    S_setValue('v_friends', friends);
    if(callback) return callback();
  });
}

function recolorImage(url, colors, defaultColors, qual, callback) {
  var recolor = function(canvas, imageData) {
    for(var x = 0; x < imageData.width; x++) for(var y = 0; y < imageData.height; y++) recolorPixel(imageData, x, y, colors, defaultColors, qual);
    canvas.getContext('2d').putImageData(imageData, 0, 0);
    var newImage = canvas.toDataURL('image/png'); // jpeg doesn't work on older Firefox versions
    callback(newImage);
  }
  getImage(url, recolor);
}

function lPage() {
  $('.PageControlAdvancedRight .PageControlAdvancedLast.PageControlAdvancedDisabled').removeClass('PageControlAdvancedDisabled').each(function() {
    var img = $('img', this);
    var a = $(document.createElement('a')).attr('class', 'PageControlAdvancedLast HoverImgJs').append(img, img.clone().addClass('HoverImgJsFg'));
    $(this).parent().prepend(a);
    $(this).remove();
  });
  $('.PageControlAdvancedRight a.PageControlAdvancedLast').attr('href', b.replace(/\?\d+,\d+/, '$&,'));
  var action = function(u) {
    $('.PageControlAdvancedRight .PageControlAdvancedLast img').attr('src', u);
  }
  var image = S_getValue('v_images', {})['gNav'];
  if(image) return action(image);
  var qual = function(c) {
    if(c[0] + c[1] >= 255 && c[0] - c[2] > 100) return true;
    return false;
  }
  var funct = function(canvas, imageData) {
    var rgb = [68, 183, 68];
    for(var x = 0; x < imageData.width; x ++) for(var y = 0; y < imageData.height; y ++) recolorPixel(imageData, x, y, rgb, [244, 183, 68], qual);
    canvas.getContext('2d').putImageData(imageData, 0, 0);
    var nBG = canvas.toDataURL('image/png');
    var images = S_getValue('v_images', {});
    images['gNav'] = nBG;
    S_setValue('v_images', images);
    action(nBG);
  }
  getImage('http://www.runescape.com/img/global/page_control/advanced/Arrow_right.png', funct);
}

function rBump(e) {
  var bump = $('.BubbleLinks a[href*="bump"]', e);
  if(!bump.length > 0) return;
  bump.remove();
  if($('#info a[href*="bump"]').length > 0) return;
  var rF = $('img[src*="refresh.gif"]').parents('a');
  var bB = rF.clone();
  $('img', bB).attr('src', 'http://www.runescape.com/img/forum/cmdicons/bump_thread.gif');
  bB.attr({'href': bump.attr('href'), 'title': $('acronym', bump).attr('title')}); // Still using <acronym> for bump links and maxed threads
  $('b', bB).text(bump.first().text());
  bB.insertBefore(rF);
}

function hAuthor(e) {
  $('span.author', e).each(function() {
    var u = $(this).text().replace(/\s/g, ' ').split(' ');
    u.splice(0, 1);
    u = u.join(' ');
    var jMod = /^(Mod\s.+|Andrew|Avalani|Ian|Paul)$/;
    if(jMod.test(u)) $(this).css('color', '#F3B13F');
  });
}

function hThread() {
  if(!lastURL.match(/,thd,/)) return;
  var thd = b + lastURL.replace(/.+,thd/, '');
  var e = $('.dataRow a[href$="' + thd + '"]');
  if(e.length == 0) return;
  e.parents('.dataRow').css({'background': 'url("http://www.runescape.com/img/forum/dataRowBg.png") top left no-repeat, rgba(255, 255, 0, 0.5)', 'border-radius': '8px'});
  $(window).scrollTop(e.offset().top);
}

function lAuthor(e) {
  $('.nt span.username', e).each(function() {
    $(this).parents('.title').append($(document.createElement('a')).attr('href', 'users.ws?searchname=' + $(this).text().replace(/\s/g, '%A0') + '&lookup=view').css({'width': 'auto', 'height': 'auto', 'float': 'none', 'display': 'inline'}).attr('class', 'username author').text($(this).text()));
    $(this).remove();
  });
}

function rTime(e) {
  if(forum['l'] != '0') return; // English-only for now; to be updated
  $('.date, .lastPost a, .BubbleCreation span:nth-child(-n + 2), .hist table.stripeTable tr td:nth-child(4), #search_results table.stripeTable .last_updated', e).each(function() { // rootView, forumView, threadView, userView, searchThreads
    var n = $(this).contents()[0];
    n.data = parseTimestamp(n.data);
  });
}

function rTimeUS() { // Potential that this is uselessly changing the parse functions when rTime isn't even called
  parseDate = function(d) { return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear(); }
  parseTime = function(d) {
    var h = d.getHours();
    var ampm = h < 12 ? 'am' : 'pm';
    if(h == 0) h = 12;
    else if(h > 12) h -= 12;
    return pad(h) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + ' ' + ampm;
  }
}

function gInfo(e) {
  var players = [];
  $('a.author', e).each(function() { players.push((/.+=(.*?)&.+/).exec($(this).attr('href'))[1]); });
  players = removeDuplicates(players);
  GM_xmlhttpRequest({
    method: 'GET',
    url: '/m=website-data/l=' + forum['l'] + '/' + session + 'playerDetails.ws?names=' + JSON.stringify(players) + '&callback=jQuery000000000000000_0000000000',
    onload: function(r) {
      r = JSON.parse(r.responseText.replace(/(^.+\(|\);$)/gm, ''));
      for(var i = 0; i < r.length; i ++) {
        var e = $('.msgcreator a[href^="users.ws?searchname=' + r[i].name.replace(/\s/g, '%A0') + '"]').parents('.leftpanel:not(.reformatted)');
        e.each(function() {
          var c = $(this);
          $('.PlayerInfoTitle', c).text(r[i].title);
          if(!(/^[A-Z]/).test(r[i].title)) $('.usertitle', c).css({'margin-top': '-3px', 'margin-bottom': '3px'}).insertAfter($('.author', c));
          if(r[i].member && $('.usermember', c).length == 0) $('.avatarlink', c).after($(document.createElement('div')).addClass('usermember'));
          if(!(r[i].clan || r[i].world)) return;
          var extra = $(document.createElement('div')).addClass('extra').css({'width': '160px', 'text-align': 'center', 'line-height': '16px'});
          if(r[i].clan) extra.append($(document.createElement('a')).attr({'class': 'clan', 'href': '/m=clan-home/l=' + forum['l'] + '/' + session + 'clan/' + r[i].clan}).css({'font-family': 'KingthingsPetrockRegular,Times New Roman,serif', 'font-size': '14px'}).text(r[i].clan));
          if(r[i].world) extra.append($(document.createElement('div')).addClass('world').append($(document.createElement('span')).text(r[i].world)));
          c.append(extra);
          c.addClass('reformatted'); // Look into doing this without setting a flag on the DOM element
        });
      }
    }
  });
}

function parseQFC(tN, last) {
  var t = tN.nodeValue;
  var q = (/(?:\d{1,3}-){3}\d+/).exec(t);
  var qP = (/PAGE[^\d]{0,30}(\d+)/i).exec(t);
  var pP = (/POST[^\d]{0,30}(\d+)/i).exec(t);
  if(!last()[0]) last($('.message + #QuickFindCode').text().split(' ').pop());
  if(q ? (qP ? t.indexOf(q[0]) < t.indexOf(qP[0]) : true) : false && last) {
    last(q[0], 1);
    var r = insertLink(tN, q[0]);
    r[0].attr({'href': 'forums.ws?' + q[0].replace(/-/g, ','), 'rel': 'page', 'qfc': q[0]});
    return parseQFC(r[1], last);
  }
  if(last()[0] && qP) {
    last(last()[0], parseInt(qP[1], 10));
    var r = insertLink(tN, qP[0]);
    r[0].attr({'href': 'forums.ws?' + last()[0].replace(/-/g, ',') + ',goto,' + qP[1], 'rel': 'page'});
    return parseQFC(r[1], last);
  }
  if(last()[0] && pP) {
    var n = parseInt(pP[1], 10);
    var pg = last()[1];
    if(n > 0 && n < 11) n += ((last()[1] - 1) * 10);
    else pg = Math.floor(n / 10);
    n += -1;
    var r = insertLink(tN, pP[0]);
    r[0].attr({'href': 'forums.ws?' + last()[0].replace(/-/g, ',') + ',goto,' + pg + '#' + n, 'rel': 'page'});
    return parseQFC(r[1], last);
  }
}

function insertLink(tN, t) {
  var mTN = tN.splitText(tN.nodeValue.indexOf(t));
  var eTN = mTN.splitText(t.length);
  return [$(document.createElement('a')).append(mTN).insertBefore(eTN), eTN];
}

function pQFC(e) {
  $('.msgcontents', e).each(function() {
    var tN = $(this).allContents().filter(function() {
      if($(this).parent('style, script, ignore, a').length > 0) return false;
      if((/^\s*$/).test(this.textContent)) return false;
      return this.nodeType == 3;
    });
    var qFC = '';
    var page = 1;
    var last = function(n, pg) { return [qFC = n || qFC, page = pg || page]; };
    tN.each(function() { parseQFC(this, last); });
  });
}

function uQFC(e) { // Prevent this from loading current thread, prevent multiple requests
  if(typeof threadQFC === 'undefined') window.threadQFC = {};
  $('a[qfc]', e).each(function() {
    var a = $(this);
    var qFC = a.attr('qfc');
    if(threadQFC[qFC]) return a.text(threadQFC[qFC][0]).attr('title', qFC).prepend(threadQFC[qFC][1]);
    $.get($(this).attr('href'), function(data) {
      var d = document.createElement('html');
      d.innerHTML = data;
      var title = $('#Trail span:last-child span', d).text() || ($('#MainContent .Attention', d).length > 0 ? '[Nonexistent thread]' : '[Private thread]');
      var image = $('#threadQuickDetails img', d).css({'height': '10px', 'margin-right': '2px', 'margin-bottom': '2px', 'vertical-align': 'middle'});
      threadQFC[qFC] = [title, image];
      a.text(threadQFC[qFC][0]).attr('title', qFC).prepend(threadQFC[qFC][1].clone());
    });
  });
}

function tSmileys() {
  if(!me) return;
  var u = l.split(': ')[1];
  if(me != u) return;
  var on = $(document.createElement('form')).attr({'action': 'users.ws'});
  on.append($(document.createElement('input')).attr({'type': 'hidden', 'name': 'username', 'value': me}));
  on.append($(document.createElement('input')).attr({'type': 'hidden', 'name': 'showsmileys', 'value': 'show'}));
  var button = $('#lookupuser .Button').clone().css('float', 'none');
  var text = 'Switch on smileys';
  button.removeClass('goButton');
  $('b', button).text(text);
  $('span span input', button).attr({'class': 'buttonNewWide buttonlong', 'name': 'togglesmileys', 'title': text, 'value': text}); // 'id': 'togglesmileys_button'
  on.append(button);
  var off = on.clone();
  $('input + input', off).attr('value', 'dontshow');
  text = 'Switch off smileys';
  $('b', off).text(text);
  $('span span input', off).attr({'title': text, 'value': text});
  $('#contentmsg').prepend(on, off);
}

function lBookmarked(e) {
  var show = function() { $('.bookmark', this).show(); };
  var hide = function() { $('.bookmark.inactive', this).hide(); };
  var img = $(document.createElement('img')).attr({'alt': 'Toggle bookmark', 'title': 'Toggle bookmark', 'src': 'http://www.runescape.com/img/main/wiki/magGlass.png'}).css({'height': '15px', 'width': '15px'});
  var a = $(document.createElement('a')).css({'height': '15px', 'width': '15px'}).addClass('bookmark inactive').append(img).hide();
  a.click(function(event) {
    event.preventDefault();
    var bM = S_getValue('v_bookmarks' + forum['uniqueID'], []);
    var qFC = $(this).parents('a').attr('href').replace(/[^\d]+(\d+),(\d+),(\d+),(\d+)/, '$1-$2-$3-$4');
    var index = bM.indexOf(qFC);
    if(index > -1) {
      bM.splice(index, 1);
      $(this).attr('class', 'bookmark inactive');
      if($(this).parents('#bookmarks').length > 0) e.slideAway();
    } else {
      bM.push(qFC);
      $(this).attr('class', 'bookmark active');
    }
    S_setValue('v_bookmarks' + forum['uniqueID'], bM);
  });
  if(!e) e = $('.forumView .dataRow:not(.hidden)');
  $('.icon', e).append(a);
  e.hover(show, hide).each(function() {
    var qFC = $('a', this).attr('href').replace(/[^\d]+(\d+),(\d+),(\d+),(\d+)/, '$1-$2-$3-$4');
    var bM = S_getValue('v_bookmarks' + forum['uniqueID'], []);
    if(bM.indexOf(qFC) > -1) $('.bookmark', this).attr('class', 'bookmark active').show();
  });
}

function lBookmark() {
  var bM = S_getValue('v_bookmarks' + forum['uniqueID']);
  if(!bM ? true : bM.length == 0) return S_deleteValue('v_bookmarks' + forum['uniqueID']);
  var first = $('#MainContent .RaggedBox').first();
  var e = first.clone();
  e.addClass('forumView').attr('id', 'bookmarks');
  e.removeClass('RaggedBoxClosed');
  $('.RaggedBoxBg', e).removeAttr('style');
  $('.RaggedBoxTitle', e).text('Bookmarks'); // Language pack
  $('.dataRow, .RaggedBoxToggle', e).remove();
  $('.forumData', e).addClass('threads');
  $('.threads', e).text('');
  $('.icon', e).text('');
  e.insertBefore(first);
  for(var i = 0; i < bM.length; i ++) {
    var c = bM[i].replace(/-/g, ',');
    var url = 'forums.ws?' + c.replace(/^(.+?,.+?),/, '$1,thd,');
    var row = $(document.createElement('span')).addClass('dataRow').append($(document.createElement('a')).attr('href', 'forums.ws?' + c).append($(document.createElement('span')).addClass('icon'), $(document.createElement('span')).addClass('title').append($(document.createElement('h4')).text('Loading: ' + bM[i])).append($(document.createElement('a')).addClass('author'))));
    var page;
    $('#bookmarks .forumData').append(row);
    (function(c, url, q, row) {
      $.get(url, function(data) {
        var d = document.createElement('html');
        d.innerHTML = data;
        var dataRow = $('a[href$="' + c + '"]', d).parent();
        if(dataRow.length == 0) {
          $('.author', row).text('Click to remove bookmark').click(function(event) {
            event.preventDefault();
            var index = bM.indexOf(q);
            if(index > -1) bM.splice(bM.indexOf(q), 1);
            S_setValue('v_bookmarks' + forum['uniqueID'], bM);
            row.slideAway();
          });
          return $('h4', row).text($('#MainContent > .Attention', d).length > 0 ? 'Nonexistent thread: ' + q : 'Private thread: ' + q);
        }
        steps('_threads', 'init', dataRow);
        if(!page) page = (/([^\s]+)/).exec($('#threadQuickDetails', d).text())[1];
        var cPage = $('#threadQuickDetails input', d).first().attr('value');
        var ePage = $('span.nt', dataRow).clone().text(' (' + page + ' ' + cPage + ')');
        $('.title', dataRow).append(ePage);
        row.replaceWith(dataRow);
      });
    })(c, url, bM[i], row);
  }
}

function aLink() {
  var e = $('#Nav .Forum li:last-child').clone();
  $('a', e).attr('href', 'forums.ws?rsfe').text('RSFE Userscript');
  $('#Nav .Forum ul').append(e);
}

function rSession() {
  if(me || banned) return;
  $.get('/m=rswiki/', function(data) {
    var d = document.createElement('html');
    d.innerHTML = data;
    var s = $('#RuneScapeLogo a', d).attr('href').split('/')[3];
    if(!s) return;
    var u = lastURL.replace(/.+\/(\w+).ws/, '$1.ws');
    history.replaceState('data', 'title', '/m=' + forum['module'] + '/' + s + '/sl=' + forum['sL'] + '/' + u); // incorporate l=
    refresh(u, '#MainContentOuter');
  });
}

function fJump() {
  var f = S_getValue('v_jumpList' + forum['uniqueIDSL']);
  if(!f) return;
  var e = $(document.createElement('select')).attr({'class': 'a', 'name': 'forumpicker'}).css({'float': 'left', 'width': '291px', 'margin': '10px 7px 0px 0px'});
  for(var i = 0; i < f.length; i ++) e.append($(document.createElement('option')).attr('value', f[i][0]).text(f[i][1]));
  var n = $('#ForumNav .goButton ~ *');
  var a = $(document.createElement('img')).attr('src', 'http://www.runescape.com/img/main/community/prev-button.png');
  var h = $(document.createElement('a')).addClass('HoverImgJs').css({'width': '31px', 'float': 'right', 'margin-right': '8px'}).append(a, a.clone().addClass('HoverImgJsFg'));
  n.reverse().each(function() { $(this).css({'position': 'absolute', 'left': $(this).position().left}).hide(); });
  $('#uid').css('width', '209px');
  var g = $('#ForumNav .goButton');
  e = $(document.createElement('div')).attr('class', 'Dropdown w300').append(e).insertBefore(g);
  h.mouseenter(function() {
    $.each([this, e], function() { $(this).fadeOut('fast'); });
    g.hide();
    n.fadeIn('fast', function() { g.fadeIn('fast'); });
    $('ul.SelectRS li.Selected', e).click();
//    $('select', e).val('-1');
    $('#uid').animate({width: 92}, 'fast');
  });
  $('#ForumNav').css({'height': '50px', 'min-width': '665px'}).append(h).mouseleave(function() {
    $.each([h, g, e], function() { $(this).fadeIn('fast'); });
    n.fadeOut('fast');
    $('#uid').animate({width: 209}, 'fast');
  });
  loadScript("http://www.runescape.com/js/jagex/jagex_form-4.js", function() {
    JAGEX.form.pritify.run();
    e.css({'position': 'relative', 'top': '2px'});
  });
}

function fJumpUpdate() {
  var jTF = {
    '': 'Jump to forum...',
    'de': 'Schnellzugriff auf Forum:',
    'fr': 'Acc\u00E9der au forum...',
    'pt': 'Ir para o f\u00F3rum...'
  }[forum['suffix']];
  var f = [['-1', jTF]];
  $('.dataRow > a').each(function() { f.push([(/(\d+),/).exec($(this).attr('href'))[1], $('h4', this).text()]); });
  $('#srcfrm option ~ option').each(function() { f.push([$(this).attr('value'), $(this).text().replace(/\n/g, '')]); });
  S_setValue('v_jumpList' + forum['uniqueIDSL'], f);
}

function uHide() {
  var recreate = function(m, name) {
    var n = m.prev('.msgplace').attr('name');
    var r = pDetails[n].clone();
    var eName = name.replace(/\s/g, '%A0');
    var title = $(document.createElement('div')).addClass('usertitle').append($(document.createElement('span')).attr({'class': 'PlayerInfoTitle', 'data-displayname': eName}));
    var pLink = $(document.createElement('a')).attr({'href': 'users.ws?searchname=' + eName + '&lookup=view', 'class': 'author CssMO'}).text(name);
    $('.msgcreator', r).append(title, pLink);
    var aLogURL = '/m=adventurers-log/' + session + 'display_player_profile.ws?searchName=' + eName;
    var avatar = $(document.createElement('a')).attr({'href': aLogURL, 'class': 'avatarlink'}).append($(document.createElement('img')).attr({'src': '/m=avatar-rs/' + eName + '/chat.png', 'class': 'avatar'}));
    $('.leftpanel', r).append(avatar, $('a[href$="' + aLogURL + '"] + .usermember', pSet).first().clone(), $('a[href$="' + aLogURL + '"] ~ .modtype', pSet).first().clone()); // usermember before modtype because I said so and no example exists
    m.replaceWith(r);
    steps('_posts', null, r);
    r.addClass($('*[data-displayname="' + eName + '"]', pSet).first().parents('div.message').attr('class'));
  };
  var name = $('.GoodAttention .uname').text();
  if(!name) {
    var oP = $('.msgplace[name="0"] + div.message');
    var lP = $('.PageControlAdvancedRight .PageControlAdvancedDisabled').length > 0 ? $('a.msgplace:last-of-type + div.message') : $();
    if((oP.length > 0 && $('.avatarlink', oP).length == 0) || (lP.length > 0 && $('.avatarlink', lP).length == 0)) return getThreadDetails(function(t) {
      if(oP.length > 0 && $('.avatarlink', oP).length == 0) recreate(oP, t['oP']);
      if(lP.length > 0 && $('.avatarlink', lP).length == 0) {
        var n = lP.prev('.msgplace').attr('name');
        if(parseInt(n, 10) + 1 != t['posts']) return; // Check if new post was made
        recreate(lP, t['lP']);
      }
    });
  }
  $('div.message').each(function() {
    if($('.avatarlink', this).length > 0) return;
    if(name) return recreate($(this), name);
  });
}

function getThreadDetails(callback) {
  if(typeof thread === 'undefined') window.thread = {'state': 0, 'pending': [callback]}; // state 0: to be loaded, 1: loading, 2: loaded
  if(thread['state'] == '2') return callback(thread);
  else if(thread['state'] == 1) return thread['pending'].push(callback);
  thread['state'] = 1;
  var u = $('#Trail a[href*="thd"]').attr('href');
  $.get(u, function(data) {
    thread['state'] = 0; // In case of failure to load
    var d = document.createElement('html');
    d.innerHTML = data;
    var t = $('.dataRow a[href$="' + u.replace(',thd,', ',') + '"]', d).parents('.dataRow');
    if(!t) return; // Thread could not be found
    thread['state'] = 2;
    thread['posts'] = parseInt($('.posts', t).text(), 10);
    thread['oP'] = $('.username', t).text();
    var lP = $('span.author', t).text().replace(/\s/g, ' ').split(' ');
    lP.splice(0, 1);
    lP = lP.join(' ');
    thread['lP'] = lP;
    var feedback = {'oP': thread['oP'], 'lP': thread['lP'], 'posts': thread['posts']};
    for(var i = 0; i < thread['pending'].length; i ++) thread['pending'][i](feedback);
    thread['pending'] = [];
  });
}

function cP() {
//  if(b != 'forums.ws?rsfe') return steps(page, '#default');
  if($('#errorContent a[href*="logout"]').length > 0) {
    $('#MainContent').fadeTo('fast', 0.5);
    return $.get('/m=' + forum['module'] + '/forums.ws?rsfe', function(data) {
      var d = document.createElement('html');
      d.innerHTML = data;
      $('#MainContent').replaceWith($('#MainContent', d));
      cP();
    });
  }
  var d = $('.dataRow').first().clone(true);
  $('a', d).attr('href', '#');
  $('span:nth-child(n + 3)', d).remove();
  $('#MainContent .RaggedBox + .RaggedBox ~ *, #MainContent .headerBar > *:not(h3), .dataRow, .dataHeader, .RaggedBox + .RaggedBox .forumData').remove();
  $('#MainContent .headerBar h3 span:not(:has(*))').text('RS Forums Enhancer Control Panel');
  var button = $('.goButton').first().clone().addClass('headerButton icon').removeClass('goButton');
  var a = $(document.createElement('a')).attr({'class': button.attr('class'), 'href': 'http://userscripts.org/scripts/show/13002', 'target': '_blank'}).append(button.children());
  $('input', a).remove();
  $('b', a).text('Userscripts Page').parent().parent().prepend($(document.createElement('img')).attr('src', 'http://userscripts.org/images/script_icon.png'));
  $('#MainContent .headerBar').append(a);
  var e = $('#MainContent .RaggedBox');
  e.each(function(i) {
    $(this).attr('id', ['toggleFeatures', 'variables'][i]);
    $('.RaggedBoxTitle', this).text(['Toggle features', 'Manage variables'][i]);
    var listVars = function(row) {
      var values = S_listValues();
      var rBC = $('.RaggedBoxContent', row);
      rBC.empty();
      rBC.css('padding', '16px 48px 30px 48px');
      rBC.append($(document.createElement('p')).text('Here you can manually update or delete variables assigned by the script. A page refresh is required for certain changes to take effect.'));
      for(var v in values) {
        v = values[v];
        var value = S_getValue(v);
        var div = $(document.createElement('div'));
        div.append(
          $(document.createElement('div')).addClass('dataHeader').append(
            $(document.createElement('span')).addClass('title').text(v),
            $(document.createElement('span')).css('float', 'right').append(
              $(document.createElement('a')).attr({'href': '#', 'id': 'delete_' + v}).text('delete').click(function(event) {
                event.preventDefault();
                var c = $(this).attr('id').substring(7);
                S_deleteValue(c);
                listVars($('.RaggedBox + .RaggedBox'));
              })
            ),
            $(document.createElement('span')).css({'margin-right': '10px', 'float': 'right'}).append(
              $(document.createElement('a')).attr({'href': '#', 'id': 'update_' + v}).text('update').click(function(event) {
                event.preventDefault();
                var c = $(this).attr('id').substring(7);
                var cV = $('textarea#' + c).attr('value');
                try { cV = JSON.parse(cV); }
                catch(error) { return alert('Invalid input'); }
                S_setValue(c, cV);
                listVars($('.RaggedBox + .RaggedBox'));
              })
            )
          )
        );
        div.append($(document.createElement('textarea')).attr({'id': v, 'value': JSON.stringify(value)}).css('width', '100%'));
        rBC.append(div);
      }
      $('.RaggedBox + .RaggedBoxClosed h3').click();
    }
    if(i > 0) return listVars(this);
    var functions = [];
    for(var p in unmodifiedProcess) {
      p = unmodifiedProcess[p];
      for(var f in p) {
        for(var i = 0; i < p[f].length; i ++) {
          var c = p[f][i];
          if(functions.indexOf(c) > -1) continue;
          functions.push(c);
          var r = d.clone();
          $('h4', r).text(c.name);
          $('.title', r).css('width', 'auto');
          if(!features[c.name]) {
            $('.title span', r).text('This is a core function and can\'t be disabled.');
            $('.icon img', r).attr('src', 'http://www.runescape.com/img/forum/icons/suggestions_2.png');
            $('a', r).click(function(even) { event.preventDefault(); });
            $('.forumData', this).append(r);
            continue;
          }
          $('.title span', r).text(features[c.name][0]);
          var setImg = function(n, row) { $('.icon img', row).attr('src', ['http://www.runescape.com/img/forum/icons/green_cross.png', 'http://www.runescape.com/img/forum/icons/forum_feedback_2.png'][n]); }
          var toggle = function(row) {
            var feature = $('h4', row).text();
            var def = features[feature][1];
            var t = [1, 0][S_getValue('f_' + feature, def)];
            if(t == def) S_deleteValue('f_' + feature);
            else S_setValue('f_' + feature, t);
            listVars($('.RaggedBox + .RaggedBox'));
            setImg(t, row);
          }
          setImg(S_getValue('f_' + c.name, features[c.name][1]), r);
          $('a', r).attr('id', 'f_' + c.name).click(function(event) {
            event.preventDefault();
            toggle(this);
          });
          $('.forumData', this).prepend(r);
        }
      }
    }
  });
  $('.RaggedBoxClosed h3').click();
  $('#Trail').contents().filter(notBlankTextNode).slice(-1)[0].nodeValue = '\nRS Forums Enhancer Control Panel\n'; // ********************
  document.title = 'RSFE CP';
}

var features = {
  'bBan': ['Loads logged out forum content if banned.', 1],
  'cAvatar': ['Broken cachebust is disabled; cached avatars load faster but must be recached when updated (ctrl+F5).', 1],
  'dProfile': ['Removes the redundant profile link from posts.', 0],
  'fJump': ['Forum jump is returned. Reshuffles navigation bar to fit. fJumpupdate creates/updates the list.', 0],
  'fJumpUpdate': ['Updates the forum jump list when viewing the front page or searching threads.', 1],
  'gInfo': ['Adds user clan and world to posts, sorts suffix titles under names, and shows membership status.', 0],
  'hAuthor': ['Highlights Jagex Moderator usernames in the last posted by column.', 0],
  'hThread': ['A thread referenced in the URL is highlighted.', 0],
  'lAuthor': ['A profile link is given to the author of a thread.', 0],
  'lBookmark': ['Loads bookmarks on the front page of the forums.', 0],
  'lBookmarked': ['Adds a magnifying glass to toggle a bookmark.', 0],
  'lPage': ['Creates a link that always goes to the the last page of a thread, even if pages have been added.', 1],
  'pLink': ['Adds a link with identical functionality as the "show in thread" link.', 0],
  'pQFC': ['Quick-find-codes are made into links.', 0],
  'uQFC': ['QFC links are renamed to the title and sticky/locked images are added. This requires loading the thread.', 0],
  'qButton': ['Replaces the reply button with a quote button.', 0],
  'qEdit': ['Allows inline editing of posts.', 0],
  'qF5': ['Pressing F5 while focused refreshes content without a page reload.', 0],
  'qNav': ['Pressing page arrows loads content without a page reload.', 0],
  'qRefresh': ['Pressing the refresh button refreshes content without a page reload.', 0],
  'qSubmit': ['Various forms are automated, including user search and page navigation.', 0],
  'rBump': ['Returns the bump button and removes unnecessary bump links.', 0],
  'rHidden': ['Recolors hidden posts to red. Moderators already do this automatically.', 0],
  'rPosts': ['Recolors posts of friends, clanmates, and yourself. You can modify the post color by editing v_postColor in r,g,b format.', 1],
  'rSession': ['Restores your session if it is lost.', 1],
  'rTime': ['Timestamps are adjusted to local time.', 0],
  'rTimeUS': ['Reformats time to mm/dd/yyyy HH:MM:SS am/pm format. Requires rTime.', 1],
  'sPosts': ['Adds a link to show all posts by a user in a thread.', 0],
  'tSmileys': ['Buttons to turn on/off smileys are returned to the profile page.', 0],
  'uHide': ['Recreates the post author details if necessary information is available.', 0]
}

var loadProcess = {
  '_cP': {
    'init': [aLink, gModule, cP]
  },

  '_global': {
    'init': [sVars, aLink, gModule, rTimeUS],
    'load': [gUser, gPage, rSession, bBan, cAvatar]
  },

  '_threads': {
    'init': [hAuthor, rTime, lAuthor, lBookmarked]
  },

  '_posts': {
    'init': [pInfo, rHidden, qEdit, dProfile, sPosts, rBump, rTime, gInfo, pQFC, uQFC, rPosts, cAvatar, qButton],
    'post': [pLink]
  },

  '': {
    'load': [bBan]
  },

  // forums.ws
  'rootView': { // forums.ws
    'init': [fJumpUpdate, qF5, lBookmark],
    'load': [rTime]
  },

  'editCommunities': {},

  'editSublanguages': {},

  'forumEdit': {},

  // forummods.ws
  'forumMods': {},

  'forumRules': {}, // forums.ws?#,#,rules

  // forums.ws?#,#
  'forumView': {
    'init': [fJump, qF5, hThread],
    'load': [qRefresh, qNav, qSubmit, hAuthor, rTime, lAuthor, lBookmarked]
  },

  // forums.ws?#,#,#,#,add
  'messageAdd': {
    'init': [gInfo, pQFC, uQFC, rPosts]
  },

  // forums.ws?#,#,#,#,edit,#,#
  'messageEdit': {
    'init': [gInfo, pQFC, uQFC, rPosts]
  },

  'modcentreFAQ': {},

  'modcentreGuidelines': {},

  'modcentreTeam': {},

  'modcentreQuery': {},

  'pmod': {},

  // searchthreads.ws
  'searchThreads': {
    'init': [fJumpUpdate, rTime]
  },

  // codeofconduct.ws
  'theForumRules': {},

  // forums.ws?#,#,add
  'threadAdd': {
    'init': [gInfo, pQFC, uQFC]
  },

  // forums.ws?#,#,#,#,escalate,#,#
  'threadEscalate': {},

  'threadEdit': {},

  'threadDelete': {},

  // forums.ws?#,#,#,#
  'threadView': {
    'init': [fJump, qF5],
    'pre': [pInfo],
    'load': [lPage, qRefresh, qNav, qSubmit, rHidden, qEdit, dProfile, sPosts, pLink, rBump, rTime, gInfo, pQFC, uQFC, rPosts, uHide, qButton]
  },

  // userban.ws
  'userBan': {},

  'usergroupEdit': {},

  'userMessage': {},

  // users.ws
  'userView': {
    'init': [qF5],
    'load': [rTime, tSmileys, qSubmit]
  }
};

function toggleFunctions() {
  window.unmodifiedProcess = $.extend(true, {}, loadProcess);
  for(var p in loadProcess) {
    p = loadProcess[p];
    for(var f in p) for(var i = 0; i < p[f].length; i ++) {
      var c = p[f][i].name;
      if(!features[c]) continue;
      if(S_getValue('f_' + c, features[c][1]) == 1) {
        p[f].splice(i, 1);
        i -= 1;
      }
    }
  }
}

function initializer() {
  window.page = $('#MainContentOuter').attr('class');
  toggleFunctions();
  if((/\/forums\.ws\?rsfe$/).test(window.location.href)) return steps('_cP');
  steps('_global');
  steps(page);
}

function steps(p, f, a) {
  var p = loadProcess[p];
  if(!p) return;
  if(!f) { for(var f in p) if(f.charAt(0) != '#') for(var i = 0; i < p[f].length; i ++) p[f][i](a); }
  else if(p[f]) for(var i = 0; i < p[f].length; i ++) p[f][i](a);
/*  if(!f) { for(var f in p) if(f.charAt(0) != '#') for(var i = 0; i < p[f].length; i ++) { console.log(p[f][i].name); p[f][i](a); } }
  else if(p[f]) for(var i = 0; i < p[f].length; i ++) { console.log(p[f][i].name); p[f][i](a); }*/
}

// Tools

function removeSession(u, s) {
  if(s) s += '/';
  else s = '';
  var module = '/m=' + forum['module'] + '/' + s;
  u = u.replace(/\/(c|s|p)=.+?\//, '/' + s);
  if((/^[\w]+\.ws/).test(u)) u = module + u;
  u = u.replace(/^\?/, module + b.replace(/\?.+/, '?'));
  return u;
}

function removeDuplicates(a) {
  var o = {};
  for(var i = 0; i < a.length; i ++) o[a[i]] = 0;
  a = [];
  for(var i in o) a.push(i);
  return a;
}

function parseTimestamp(t) {
  if(typeof dst === 'undefined') gDST();
  var reg = {
    '0': /(\d+)-(\w+)-(\d+)\s(\d+):(\d+):(\d+)/
  }[forum['l']];
  var month = {
    '0': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }[forum['l']];
  var tD = reg.exec(t);
  if(!tD) return(t);
  var d = new Date(parseInt(tD[3], 10), month.indexOf(tD[2]), parseInt(tD[1], 10), parseInt(tD[4], 10), parseInt(tD[5], 10), parseInt(tD[6], 10));
  if(isNaN(d.getTime())) return t;
  if(d.getTime() > dst[0] && d.getTime() < dst[1]) d.setTime(d.getTime() - 3600000);
  d.setTime(d.getTime() - (d.getTimezoneOffset() * 60000));
  return parseDate(d, month) + ' ' + parseTime(d);
}

function parseDate(d, month) { return d.getDate() + '-' + month[d.getMonth()] + '-' + d.getFullYear(); }

function parseTime(d) { return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()); }

function pad(n) {
  var s = n.toString();
  if(s.length < 2) return '0' + s;
  return s;
}

function refresh(h, s, f) {
  lastURL = h;
  if(banned) h = removeSession(h);
  if(!s) s = '#MainContent';
  var preserve = ['#ForumNav', '#messageDetails', '#searchname'];
  var renew = [s, '#Trail'];
  if(page == 'rootView') {
    preserve = [];
    renew[0] = '#MainContent span.count span';
    $('.forumData:not(.threads)').each(function() { renew.push('#' + $(this).parents('.RaggedBox').attr('id') + ' .forumData'); });
  } else if(page == 'threadView') {
    $('.msgplace').each(function() {
      var s = '.msgplace[name="' + $(this).attr('name') + '"]';
      if($(s + ' + div.message > form[id^="quickEdit"]').length > 0) return preserve.push(s + ' + div.message');
      preserve.push(s + ' + div.message > .leftpanel');
    });
  }
  $.get(h, function(data) {
    var d = document.createElement('html');
    d.innerHTML = data;
    if(typeof thread !== 'undefined') thread['state'] = 0;
    if($('#ModalContain', d).length > 0) return window.location.href = h;
    page = $('#MainContentOuter', d).attr('class') || '';
    $('#MainContentOuter').attr('class', page);
    if($('#LoggedIn', d).length > 0) $('#Login').replaceWith($('#LoggedIn', d));
    if($('#Login', d).length > 0 && !banned) $('#LoggedIn').replaceWith($('#Login', d));
    steps(page, 'pre', d);
    for(var i = 0; i < preserve.length; i ++) if($(preserve[i], s).length > 0) $(preserve[i], d).replaceWith($(preserve[i], s));
    for(var i = 0; i < renew.length; i ++) $(renew[i]).replaceWith($(renew[i], d)).fadeTo('fast', 1); // Firefox error fixed in latest build
    steps('_global', 'load');
    steps(page, 'load');
    if($('link[href*="error"]').length == 0) $('link[href*="error"]', d).appendTo($('head')); // Load error page CSS
    if(f) f();
  }).fail(function() { for(var i = 0; i < renew.length; i ++) $(renew[i]).fadeTo('fast', 1); });
  for(var i = 0; i < renew.length; i ++) $(renew[i]).fadeTo('fast', 0.5);
}

function gDST() { // Period of Daylight Savings Time in British Summer Time
  var d = new Date();
  var s = new Date(d.getFullYear(), 2, 31);
  var e = new Date(d.getFullYear(), 9, 31);
  s.setDate(s.getDate() - s.getDay());
  e.setDate(e.getDate() - e.getDay());
  window.dst = [s.getTime(), e.getTime()];
}

function isTextNode() { return this.nodeType === 3; }

function notBlankTextNode() {
  if(this.nodeType != 3) return true;
  if((/^\s+$/).test(this.textContent)) return false;
  return true;
}

function stripHTML(e, t) { // *** Only used when Quote link unavailable -> logged out / lacking posting privileges; ie not used ATM
  $(e).each(function() {
    $(this).replaceWith(document.createTextNode(t || $(this).text()));
  });
}

function getPostText(e) {
  var quote = $('.BubbleLinks a[onclick]', e);
  if(quote.length > 0) {
    return $(document.createElement('p')).html(quote.attr('onclick').split('\',\'')[1].replace(/\\n/g, '\n').replace(/\\'/g, '\'')).text();
  }
  e = $(e).clone(true);
  $('.replyButton', e).remove();
  $('img[class^="sm"]', e).each(function() { stripHTML(this, $(this).attr('alt')); }); // Smileys
  stripHTML($('style, script, ignore, img', e), '\n'); // Jagex Moderator elements
  stripHTML($('br', e), '\r');
  stripHTML($('*', e));
  return e.text().replace(/(^\n+|\n+$)/g, '').replace(/\s\n/g, '\n');
}

function encode(s) {
  if(typeof uni === 'undefined') {
    window.uni = [];
    for(var i = 0; i < 256; i ++) {
      if(i < 128 || i > 159) uni.push(String.fromCharCode(i));
      else uni.push(['\u20AC', '\u0020', '\u201A', '\u0192', '\u201E', '\u2026', '\u2020', '\u2021', '\u02C6', '\u2030', '\u0160', '\u2039', '\u0152', '\u0020', '\u017D', '\u0020', '\u0020', '\u2018', '\u2019', '\u201C', '\u201D', '\u2022', '\u2013', '\u2014', '\u02DC', '\u2122', '\u0161', '\u203A', '\u0153', '\u0020', '\u017E', '\u0178'][i - 128]);
    }
  }
  return s.replace(/[^]/g, function(l) {
    var i = uni.indexOf(l);
    if(i > -1) return '%' + pad(i.toString(16));
    return encodeURI(l);
  });
}

function getImage(url, funct) { // Tim Smart - http://userscripts.org/topics/19963
  GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    overrideMimeType: 'text/plain; charset=x-user-defined',
    onload: function(xhr) {
      var data = '',
      image = new Image(),
      canvas = document.createElement('canvas'),
      imageData;
      for(var i = 0; i < xhr.responseText.length; i++) data += String.fromCharCode(xhr.responseText[i].charCodeAt(0) & 0xff);
      data = btoa(data);
      image.addEventListener('load', function() {
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);
        imageData = context.getImageData(0, 0, image.width, image.height);
        return funct(canvas, imageData);
      }, false);
      image.setAttribute('src', 'data:image/png;base64,' + data);
    }
  });
}

function recolorPixel(imageData, x, y, rgb, off, qual) {
  var i = (x + y * imageData.width) * 4;
  var iD = imageData.data;
  var c = [iD[i], iD[i + 1], iD[i + 2]];
  if(qual) if(!qual(c)) return;
  iD[i] = (rgb[0] + c[0] - off[0]);
  iD[i + 1] = (rgb[1] + c[1] - off[1]);
  iD[i + 2] = (rgb[2] + c[2] - off[2]);
//  iD[i + 3];
}

function upgradeVars() { // Courtesy upgrade
  var uG = {
    'v_bookmarks': 'v_bookmarks-forum',
    'v_bookmarks_de': 'v_bookmarks-forum_de',
    'v_bookmarks_fr': 'v_bookmarks-forum_fr',
    'v_bookmarks_pt': 'v_bookmarks-forum_pt',
    'v_bookmarks (forum)': 'v_bookmarks-forum',
    'v_bookmarks (forum_de)': 'v_bookmarks-forum_de',
    'v_bookmarks (forum_fr)': 'v_bookmarks-forum_fr',
    'v_bookmarks (forum_pt)': 'v_bookmarks-forum_pt',
    'v_jumpList (forum : sl=0)': 'v_jumpList-forum-sl0',
    'v_jumpList (forum : sl=1)': 'v_jumpList-forum-sl1',
    'v_jumpList (forum_de : sl=0)': 'v_jumpList-forum_de-sl0',
    'v_jumpList (forum_fr : sl=0)': 'v_jumpList-forum_fr-sl0',
    'v_jumpList (forum_pt : sl=0)': 'v_jumpList-forum_pt-sl0'
  }
  for(var i in uG) {
    var val = S_getValue(i, '');
    if(!val) continue;
    S_setValue(uG[i], val);
    S_deleteValue(i);
  }
}

function safe_jQuery() { // Wait for jQuery to run
  var f = arguments;
  var runAll = function() { for(var i = 0; i < f.length; i ++) f[i](); };
  if(typeof jQuery === 'undefined') loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js", runAll);
  else runAll();
}

function init() {
  gVariables();
  S_functions();
  upgradeVars();
  safe_jQuery(jQuery_functions, initializer);
}

init();