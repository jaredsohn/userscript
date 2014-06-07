// ==UserScript==
// @name          4chan all-in-one
// @namespace     http://*.4chan.org/
// @description   A collection of various enhancements for the 4chan image boards
// @version       0.0
// @author        Anonymous
// @author        aeosynth, tkirby (4chan wordfilter bypass)
// @author        Chris Done, Todd Kirby (4shadow)
// @include       http://orz.4chan.org/*.html*
// @include       http://zip.4chan.org/*.html*
// @include       http://img.4chan.org/*.html*
// @include       http://cgi.4chan.org/*.html*
// ==/UserScript==

// Released under the GNU General Public License
// http://www.gnu.org/copyleft/gpl.html


/*
 *  Current features:
 *  - your standard thread auto-updater + handles deleted posts (I'm aware of no other who does it)
 *  - one-click noko / sage
 *  - one-click blank name / blank post
 *  - configurable wordfilter bypass
 *  - page cosmetics (tab title, garbage removal, ...)
 *
 *  NOTE: some code may not make sense currently, it comes from prototype code that has not been released
 *
 *  TODO, in rough order of importance:
 *  - iframe posting and deleting (so that you never leave the thread -- prototype code is too buggy for release)
 *  - user-customizable predefined sequences of characters that can be inserted in fields (eg. reverse, nbsp etc)
 *  - auto-post every ... (eg. for auto-bump & auto-sage)
 *  - post filtering using regexes (auto-hide spam)
 *  - tooltips when hovering on >> links, for viewing contents of the linked post (or immediately seeing it's an out-of-thread link)
 *  - somehow highlight saged posts to make them stand out
 *  - expand images inline
 *  - suggestions welcome...
 */


//---------------------------------//
//---------- PREFERENCES ----------//
//---------------------------------//

// Updater frequency (in seconds)
const OPTION_UPDATER_FREQUENCY = 10;

// Auto-start updater
const OPTION_UPDATER_AUTOSTART = true;

// Default E-mail mode for new posts (defaults to 'noko' if invalid)
// Values: text / noko
const OPTION_EMAIL_MAINPAGE = 'noko';

// Default E-mail mode for threads (defaults to 'text' if invalid)
// Values: text / sage / noko
const OPTION_EMAIL_THREADPAGE = 'text';

// Default value for the wordfilter bypass option
const OPTION_BYPASSFILTER_ACTIVE = true;

// Words that should trigger the wordfilter bypass
// Separate with commas
const OPTION_BYPASSFILTER_WORDS = 'penis, vagina, buttsex, peanut, femanon, getprophet';


//--------------------------//
//---------- CODE ----------//
//--------------------------//
// Invisible character for 'blank' fields & wordfilter bypass
// Change that when (but ONLY if) this character gets filtered by gay admins
const charInvisible = '\u200B';

const imageServer = window.location.href.match(/^http:\/\/([a-z]+)\.4chan.org/)[1];
const dataServer = function() {
  switch (imageServer) {
    case 'orz': return 'tmp';
    case 'zip': return 'bin';
    case 'img': return 'dat';
    case 'cgi': return 'nov';
    default: return false;
  }}();
if (!dataServer)
  return;
const imageBoard = window.location.href.match(/^http:\/\/[a-z]+\.4chan.org\/([a-z0-9]+)\//)[1];
const isThread = !!window.location.href.match(/^http:\/\/[a-z]+\.4chan.org\/[a-z0-9]+\/res\/[0-9]+\.html/);
const threadID = !isThread ? '' : window.location.href.match(/^http:\/\/[a-z]+\.4chan.org\/[a-z0-9]+\/res\/([0-9]+)\.html/)[1]; 

var Dom = {
  id: function(id) { return document.getElementById(id); },

  new: function(type, attrs, text) {
    if (type=='#')
      type = 'span';
    var e = document.createElement(type);
    if (attrs)
      for (attr in attrs)
        e.setAttribute(attr, attrs[attr]);
    if (text)
      e.textContent = text;
    return e;
  },

  newText: function(text, attrs) { return Dom.new('#', attrs, text); },

  del: function(e) {
    if (e instanceof Array)
      for each (i in e)
        Dom.del(i);
    else if (e&&e.parentNode) e.parentNode.removeChild(e);
  },

  X: function(xpath, root) {
    var nodes = document.evaluate(xpath, root ? root : document.body, null, 0, null);
    var result = [];
    switch (nodes.resultType) {
      case nodes.STRING_TYPE: return nodes.stringValue;
      case nodes.NUMBER_TYPE: return nodes.numberValue;
      case nodes.BOOLEAN_TYPE: return nodes.booleanValue;
      default:
        while (node = nodes.iterateNext())
          result.push(node);
        return result;
    }
  }
};

function cleanupPage() {
  // Cosmetics & tracker scripts
  Dom.del(Dom.X("div[@class='postarea'][1]/form[@name='post'][1]//a[@href='http://www.4chan.org/japanese'][1]/ancestor::tbody[1]/tr[2]"));
  Dom.del(Dom.X("div[@class='postarea'][1]/form[@name='post'][1]//a[@href='http://www.4chan.org/japanese'][1]/parent::li"));
  Dom.del(Dom.X("id('navbotr')/following-sibling::*"));
  Dom.del(Dom.X("id('footer')/following-sibling::script"));
  Dom.del(Dom.X("id('footer')/following-sibling::noscript"));
  if (isThread) {
    document.title = '/'+imageBoard+'/ #'+threadID;

    var e = Dom.X("id('navtopr')/a[1]")[0];
    e.href = '../imgboard.html';
    e.textContent = '/'+imageBoard+'/';
    e.target = '_blank';

    var e = Dom.X("id('navbotr')/a[1]")[0];
    e.href = '../imgboard.html';
    e.textContent = '/'+imageBoard+'/';
    e.target = '_blank';

    var e = Dom.X("div[@class='logo'][1]/following-sibling::hr[2]")[0];
    for (i=0; i<3; ++i)
      Dom.del(e.nextSibling);

    var e = Dom.X("div[@class='logo'][1]/following-sibling::table[1]//font[1]")[0];
    e.textContent = 'Thread #'+threadID;
  }
  else {
    var boardPage = window.location.href.match(/^http:\/\/[a-z]+\.4chan.org\/[a-z09]+\/([0-9]+)\.html/);
    document.title = document.title+' ['+(boardPage ? boardPage[1] : '0')+']';
    Dom.del(Dom.id('navtopr'));
    Dom.del(Dom.id('navbotr'));
  };

  // Ads & related cosmetics
  Dom.del(Dom.X("div[@class='logo'][1]/child::img[1]"));
  Dom.del(Dom.X("div[@class='logo'][1]/child::br[1]"));
  Dom.del(Dom.X("id('header')/following-sibling::hr[1]"));
  Dom.del(Dom.X("div[@class='logo'][1]/following-sibling::div[1]"));
  Dom.del(Dom.X("div[@class='logo'][1]/following-sibling::div[1]"));
  Dom.del(Dom.X("div[@class='logo'][1]/following-sibling::hr[2]"));
  Dom.del(Dom.X("div[@class='logo'][1]/following-sibling::center[1]"));
  Dom.del(Dom.X("id('footer')/preceding-sibling::hr[1]"));
};

function postField(field) { return Dom.X("div[@class='postarea'][1]/form[@name='post'][1]//input[@name='"+field+"'][1]")[0]; };

function postOptions() {
  var e = postField('name');
  e.id = '4all_post_name';
  e.style.width = '300px';
  var anchor = e.parentNode;

  var e = Dom.new('input', {id: '4all_post_bname', type: 'checkbox'});
  e.addEventListener('click', (function() { Dom.id('4all_post_name').disabled = Dom.id('4all_post_bname').checked; }), false);
  anchor.appendChild(e);
  anchor.appendChild(Dom.new('label', {for: '4all_post_bname'}, 'Blank'));
  anchor.appendChild(Dom.newText(' '));

  var setting = isThread ? OPTION_EMAIL_THREADPAGE : OPTION_EMAIL_MAINPAGE;
  if (setting!='text')
    if (!isThread&&(setting!='noko'))
      setting = 'noko';
    else if (isThread&&(setting!='sage')&&(setting!='noko'))
      setting = 'text';

  var e = postField('email');
  e.id = '4all_post_email';
  e.style.width = '300px';
  var anchor = e.parentNode;

  var e = Dom.new('input', {id: '4all_post_email_text', type: 'radio', name: '4all_post_email'});
  e.checked = (setting=='text');
  e.addEventListener('click', (function() { eventEmailDisable(false); }), false);
  anchor.appendChild(e);
  anchor.appendChild(Dom.new('label', {for: '4all_post_email_text'}, 'Text'));
  anchor.appendChild(Dom.newText(' '));

  if (isThread) {
    var e = Dom.new('input', {id: '4all_post_email_sage', type: 'radio', name: '4all_post_email'});
    e.checked = (setting=='sage');
    e.addEventListener('click', (function() { eventEmailDisable(true); }), false);
    anchor.appendChild(e);
    anchor.appendChild(Dom.new('label', {for: '4all_post_email_sage'}, 'Sage'));
    anchor.appendChild(Dom.newText(' '));
  }

  var e = Dom.new('input', {id: '4all_post_email_noko', type: 'radio', name: '4all_post_email'});
  e.checked = (setting=='noko');
  e.addEventListener('click', (function() { eventEmailDisable(true); }), false);
  anchor.appendChild(e);
  anchor.appendChild(Dom.new('label', {for: '4all_post_email_noko'}, 'Noko'));

  eventEmailDisable(!Dom.id('4all_post_email_text').checked);

  Dom.del(Dom.X("div[@class='postarea'][1]/form[@name='post'][1]//input[@type='submit'][1]"));

  var e = postField('sub');
  e.id= '4all_post_sub';
  e.style.width = '300px';
  var anchor = e.parentNode;

  var e = Dom.X("div[@class='postarea'][1]/form[@name='post'][1]//textarea[@name='com'][1]")[0];
  e.id = '4all_post_com';
  e.style.width = '400px';
  e.rows = 7;
  var anchor = e.parentNode;

  anchor.innerHTML = '<table cellspacing="0" cellpadding="0"><tr><td id="4all_fix_com"></td><td>&nbsp;</td><td id="4all_fix_submit"></td></tr></table>';
  Dom.id('4all_fix_com').appendChild(e);
  var anchor = Dom.id('4all_fix_submit');

  var e = Dom.new('input', {type: 'button', value: 'Submit'});
  e.addEventListener('click', eventSubmitPost, false);
  anchor.appendChild(e);
  anchor.appendChild(Dom.new('br'));

  var e = Dom.new('input', {id: '4all_post_filt', type: 'checkbox'});
  e.checked = OPTION_BYPASSFILTER_ACTIVE;
  e.title = OPTION_BYPASSFILTER_WORDS;
  anchor.appendChild(e);
  var e = Dom.new('label', {for: '4all_post_filt'}, 'Bypass wordfilter');
  e.title = OPTION_BYPASSFILTER_WORDS;
  anchor.appendChild(e);
  anchor.appendChild(Dom.new('br'));

  if (isThread) {
    var e = Dom.new('input', {id: '4all_post_updater', type: 'checkbox'});
    e.checked = OPTION_UPDATER_AUTOSTART;
    e.addEventListener('click', (function() { Updater.syncControl(); }), false);
    anchor.appendChild(e);
    anchor.appendChild(Dom.new('label', {for: '4all_post_updater'}, 'Auto update'));
    anchor.appendChild(Dom.new('br'));
  }
  anchor.appendChild(Dom.new('br'));

  var e = Dom.new('input', {id: '4all_post_bcom', type: 'checkbox'});
  e.addEventListener('click', (function() { Dom.id('4all_post_com').disabled = Dom.id('4all_post_bcom').checked; }), false);
  anchor.appendChild(e);
  anchor.appendChild(Dom.new('label', {for: '4all_post_bcom'}, 'Blank'));

  var e = postField('upfile');
  e.size = '48';

  if (!isThread)
    Dom.X("div[@class='postarea'][1]/form[@name='post'][1]")[0].target = '_blank';
  else {
    document.body.appendChild(Dom.new('iframe', {id: '4all_update_frame', style: 'position: absolute; width: 0; height: 0; visibility: hidden'}));
  }
};

function eventEmailDisable(dis) { Dom.id('4all_post_email').disabled = dis; };

function eventSubmitPost() {
  // Setup fields
  var name = Dom.id('4all_post_name');
  var bname = Dom.id('4all_post_bname');
  var name_org = name.value;
  name.disabled = false;
  if (bname.checked)
    name.value = charInvisible;

  var email = Dom.id('4all_post_email');
  var email_text = Dom.id('4all_post_email_text');
  var email_org = email.value;
  email.disabled = false;
  if (Dom.id('4all_post_email_noko').checked)
    email.value = 'noko';
  else if (isThread&&Dom.id('4all_post_email_sage').checked)
    email.value = 'sage';

  var sub = Dom.id('4all_post_sub');
  var sub_org = sub.value;

  var com = Dom.id('4all_post_com');
  var bcom = Dom.id('4all_post_bcom');
  var com_org = com.value;
  com.disabled = false;
  if (bcom.checked)
    com.value = ':getprophet:';

  if (Dom.id('4all_post_filt').checked) {
    if (!bname.checked)
      name.value = processUnfilter(name.value);
    if (email_text.checked)
      email.value = processUnfilter(email.value);
    sub.value = processUnfilter(sub.value);
    if (!bcom.checked)
      com.value = processUnfilter(com.value);
  }

  Dom.X("div[@class='postarea'][1]/form[@name='post'][1]")[0].submit();

  // Restore fields
  name.value = name_org;
  name.disabled = bname.checked;
  email.value = email_org;
  email.disabled = !email_text.checked;
  sub.value = sub_org;
  com.value = com_org;
  com.disabled = bcom.checked;
};

function processUnfilter(text) {
  const re = /(\b[^,])([^,]*)/g
  while (filter = re(OPTION_BYPASSFILTER_WORDS)) {
    const reg = new RegExp('(' + filter[1] + ')(' + filter[2] + ')', 'ig');
    text = text.replace(reg, '$1'+charInvisible+'$2');
  }
  return text;
};

var Updater = {
  id: false,
  lastUpdate: new Date(document.lastModified),

  running: function() { return !!Updater.id; },

  start: function() {
    if (!Updater.running())
      Updater.id = window.setInterval((function() { Updater.pollServer(); }), OPTION_UPDATER_FREQUENCY*1000);
  },

  stop: function() {
    if (Updater.running()) {
      clearInterval(Updater.id);
      Updater.id = false;
    }
  },

  syncControl: function() {
    if (Dom.id('4all_post_updater').checked)
      Updater.start();
    else
      Updater.stop();
  },

  pollServer: function() {
    var ajax =  new XMLHttpRequest();
    ajax.onreadystatechange = (function() {
      if (ajax.readyState==4)
        switch (ajax.status) {
          case 200:
            var updated = new Date(ajax.getResponseHeader('Last-Modified'));
            if (updated > Updater.lastUpdate) {
              Updater.updatePage(ajax.responseText);
              Updater.lastUpdate = new Date(ajax.getResponseHeader('Last-Modified'));
            }
            Updater.start();
            break;
          case 404:
            Updater.threadDied();
            break;
          default:
            Updater.start();
            break;
        }
    });
    Updater.stop();
    try {
      ajax.open('GET', window.location.href.replace(/#.*/, ''), true);
      ajax.setRequestHeader('If-Modified-Since', Updater.lastUpdate.toUTCString());
      ajax.send(null);
    }
    catch (e) {
      Updater.start();
    }
  },

  updatePage: function(text) {
    var oldPosts = Dom.X("form[@name='delform'][1]//td[@class='reply' or @class='replyhl']");
    var newPosts = text.match(/<form [^>]*name=\"delform\".*?>[\s\S]*?<\/form>/)[0].match(/<tr>[\s\S]*?<\/tr>/gm);
    var pageUpdated = false;
    var newPostIndex = 0;
    for each (post in oldPosts) {
      if ((newPostIndex>=newPosts.length)||(post.id!=newPosts[newPostIndex].match(/<td id=\"([0-9]+)\"/)[1])) {
        post.className = '4all_deleted reply';
        post.appendChild(Dom.new('center', {style: 'color: #C00; font-weight: bold'}, '(POST HAS BEEN DELETED)'));
        Dom.del(Dom.X("input[@type='checkbox' and @value='delete'][1]", post));
        pageUpdated = true;
      }
      else
        ++newPostIndex;
    }
    if ((newPosts.length-newPostIndex)>0) {
      newPosts = newPosts.slice(newPostIndex);
      var add_post = (function(item) {
        var container = Dom.X("form[@name='delform'][1]")[0];
        var last_item = Dom.X("br[@clear='left'][1]", container)[0];
        container.insertBefore(Dom.new('a', {name: item.match(/<td id=\"([0-9]+)\"/)[1]}), last_item);
        var e = Dom.new('table');
        e.innerHTML = item;
        container.insertBefore(e, last_item);
      });
      newPosts.forEach(add_post);
      pageUpdated = true;
    }
    if (pageUpdated) {
      Dom.id('4all_update_frame').src = '';
      unsafeWindow.init();
    }
  },

  threadDied: function() {
    Dom.del(Dom.X("div[@class='postarea'][1]/form[@name='post'][1]"));
    Dom.del(Dom.X("id('footer')/preceding-sibling::table[1]/tbody[1]/tr[1]"));
    Dom.del(Dom.X("form[@name='delform'][1]//input[@type='checkbox' and @value='delete']"));
    Dom.X("div[@class='postarea'][1]")[0].appendChild(Dom.new('span', {style: 'font-size: 48px; color: #C00; font-weight: bold'}, "404'd"));
    document.title = '/'+imageBoard+"/ [404'd] #"+threadID;
    Dom.id('4all_update_frame').src = '';
  }
};

cleanupPage();
postOptions();
if (isThread)
  Updater.syncControl();