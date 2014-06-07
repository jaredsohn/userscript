// ==UserScript==
// @name           Facebook Recent Activity
// @namespace      sizzlemctwizzle
// @description    Automatically remove your recent activity stories
// @require        http://sizzlemctwizzle.com/updater.php?id=68225
// @include        http://*.facebook.com/*
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