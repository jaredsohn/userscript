(function () {
// ==UserScript==
// @name           Hit Recent
// @namespace      http://www.ruifujiwara.co.cc
// @author         Rui Fujiwara
// @description    Hit Recent Activities
// @version        1
// @include        http://*.facebook.com/*
// @match          http://*.facebook.com/*
// @exclude        http://apps.facebook.com/*
// @exclude        http://static.ak.facebook.com/*
// ==/UserScript==


function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);return res;
}
function s(id,s){el=g(id);if(el!==null){el.setAttribute('style',s);}}
function regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}

const yodUpdate = {
  script_id : 94857,
  script_version : '1.9',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
}

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
}

const load_img =
"data:image/gif;base64,R0lGODlhEAALAPQAAPLy8mVlZd3d3djY2OXl5WdnZ2VlZX19f\
aysrJmZmczMzHd3d42NjbGxsZycnM7Oznl5eWZmZo+Pj+Tk5Nzc3Ovr64ODg97e3urq6snJy\
b29vdTU1Ojo6AAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAALA\
AAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw0\
3ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQACwABACwAAAAAEAALAAAFJGBhGAVgnqhpH\
IeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQACwACACwAAAAAEAALAAAFNiAgjothL\
OOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQAC\
wADACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPz\
JFzOQQaeavWi7oqnVIhACH5BAALAAQALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSV\
UXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkEAAsABQAsAAAAABAACwAABTcgI\
I5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIA\
CH5BAALAAYALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSac\
YUc+l4tADQGQ1mvpBAAIfkEAAsABwAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0D\
eA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA";

const box_id = 'boxrecent_wrapper';
var boxGroupTarget;
const dom = "DOMNodeInserted";
const DEBUG = false;
const LOG_PREFIX = 'YOD Recent Activities: ';
var myGMConfig = {yod_recent_autoclean: false};
var autoclean, my_post_form_id, my_fb_dtsg, t, t2;

function log(m) {
  if (DEBUG && m) console.log(LOG_PREFIX + m.toString());
}

function usoUpdate(el) {
  const s_CheckUpdate = 'YodCheckUpdate' + yodUpdate['script_id'];
  var md = parseInt(new Date().getDate());
  var CheckUpdate = parseInt(getValue(s_CheckUpdate));
  if (CheckUpdate !== md) {
    setValue(s_CheckUpdate, md);
    el = el ? el : document.body;
    if (el) {
      if (!document.getElementById(s_CheckUpdate)) {
        var s_gm = document.createElement('script');
        s_gm.id = s_CheckUpdate;
        s_gm.type = 'text/javascript';
        s_gm.innerHTML = 'function go' + s_CheckUpdate + '(itm){if(itm.value.items.length){return eval(itm.value.items[0].content);}}';
        el.appendChild(s_gm);
      }
      var s_gm = document.createElement('script');
      s_gm.type = 'text/javascript';
      var sSrc = 'http://pipes.yahoo.com/pipes/pipe.run?_id=' + yodUpdate['script_pipeId'];
      sSrc += '&_render=json&_callback=go' + s_CheckUpdate;
      sSrc += '&id=' + yodUpdate['script_id'] + '&ver=' + yodUpdate['script_version'];
      s_gm.src = sSrc;
      el.appendChild(s_gm);
    }
  }
  else setValue(s_CheckUpdate, md);
}

function hide(id, m) {
  var el = g(id);
  if (el !== null && el.tagName !== 'STYLE') {
    switch (m) {
      case 1: el.style.display = 'none'; break;
      case 2: if (el.parentNode) el.parentNode.removeChild(el); else hide(id, 1); break;
      case 3: el.innerHTML = '<!--www.ruifujiwara.blogspot.com-->'; break;
      default: hide(id, 1); break;
    }
  }
}

function show(id, m) {
  var el = g(id);
  if (el !== null && el.tagName !== 'STYLE') {
    el.style.display = 'block';
  }
}

function loadSettings() {
  var conf, val, cb;

  for (conf in myGMConfig) {
    val = getValue(conf);
    myGMConfig[conf] = val ? (val.toString() == 'true' ? true : false) : false;
    if (cb = g(conf)) {
      cb.checked = myGMConfig[conf];
      cb.addEventListener("click", function () {
        saveSettings(this);
      }, false);
    }
  }
}

function saveSettings(cb) {
  setValue(cb.id, cb.checked);
  return false;
}

function xhr(params, el) {
  var u = "http://www.facebook.com/ajax/minifeed.php?__a=1";
  GM_xmlhttpRequest({
    method: "POST",
    url: u,
    data: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    onload: function(response) {
      log(response.responseText);
    }
  });
}

function trace(par){
  var attr = 'href', fbnew = false;

  if (!par) return true;

  var ar = c2('.//a[contains(@href,"/ajax/minifeed/remove_confirm.php")]', par);
  if (!ar.length) {
    // new FB BETA
    ar = c2('.//a[contains(@ajaxify,"/ajax/minifeed.php")]', par);
    // 11:56 AM 10/28/2010
    if (ar.length > 0) {
      fbnew = true;
      attr = 'ajaxify';
    } else {
      // 9:01 PM 12/6/2010
      ar = c2('.//a[contains(@ajaxify,"/ajax/feed/feed_menu_personal.php")]', par);
      if (ar.length > 0) {
        fbnew = true;
        attr = 'ajaxify';
      } else
        return true;
    }
  }

  for(i = 0; i < ar.length; i++) {

    url = unescape(ar[i].getAttribute(attr) + '&yod=1');

    if (!(ministory_key = regexx(url, /story_key=(\d+)&/))) continue;
    if (!(story_type = regexx(url, /story_type=(\d+)&/))) continue;

    if (fbnew) {
      if (!(profile_fbid = regexx(url, /profile_fbid=(\d+)&/))) continue;
      if (!(story_fbids = regexx(url, /story_fbids\[0\]=(.*?)&/))) continue;
      if (!(story_id = regexx(url, /story_id=(.*?)&/))) continue;
    } else {
      if (!(profile_fbid = regexx(url, /profile_id=(\d+)&/))) continue;
    }

    var params = "";
    params = "profile_fbid=" + profile_fbid;
    params += "&ministory_key=" + ministory_key;
    params += "&story_type=" + story_type;
    params += "&post_form_id=" + my_post_form_id;
    params += "&fb_dtsg=" + my_fb_dtsg;
    if (fbnew) {
      params += "&story_fbids[0]=" + story_fbids;
      params += "&story_id=" + story_id;
      params += "&nctr[_mod]=pagelet_tab_content&lsd=&feedback=1&dialog=1&action_key=remove_content&confirmed=1";
    } else {
      params += "&__d=1&post_form_id_source=AsyncRequest";
    }

    xhr(params, ar[i]);
    log(params);

  }

  // hide elements immediately
  if (i) hide(par, 2);

  return true;
}

function waitFor(c, fn, t) {
  if (x = c())
    fn(x);
  else {
    if (t2) clearTimeout(t2);
    t2 = setTimeout(function() {
      waitFor(c, fn, t);
    }, t);
  }
}

function startcleaner(el) {
  var strbody = document.body.innerHTML;

  if (!(my_post_form_id = regexx(strbody, /post_form_id".*?value="(.*?)"/))) return;
  if (!(my_fb_dtsg = regexx(strbody, /fb_dtsg".*?value="(.*?)"/))) return;

  return trace(el);
}

function recleaner(done) {
  toggle(done);
  cleaner();
}

function cleaner() {
  var els = get_boxgroup();

  if (els.length) {
    waitFor(
      function() {
        toggle();
        return startcleaner(els[0]);
      }, recleaner, 250);
  }
}

function toggle(done) {
  if (g(box_id)) {
    if (done) {
      var els = get_boxgroup();
      hide('boxrecentloading');
      if (els.length) { show('boxrecent'); hide('boxrecentdisabled'); }
      else { hide('boxrecent'); show('boxrecentdisabled'); }
    } else {
      show('boxrecentloading'); hide('boxrecent'); hide('boxrecentdisabled');
    }
  }
}

function createButton() {
  var target, str = '';

  if (!(target = is_ownprofile())) {
    hide(box_id);
    return false;
  } else {
    if (g(box_id)) {
      show(box_id);
      return true;
    }
  }

  box = document.createElement("div");
  box.id = box_id;
  box.className = 'gray_box';
  box.setAttribute('style',"text-align: center; color: gray; background-color: #333333; border: solid 1px #bfbfbf !important; border-radius: 3px !important; padding: 10px; margin: 10px 5px;");

  // boxrecent ; buttton Cleaner
  str += '<div id="boxrecent" style="display: none;">\
    <a id="yod_buttcleanrecent" \
    href="#" class="uiButton uiButtonDefault uiButtonMedium" style="padding: 5px 10px !important;">\
    <b>Hit Recent</b></a></div>';

  // boxrecentdisabled ; Throw No Recent at all
  str += '<div id="boxrecentdisabled"><b>No Recent</b></div>';

  // boxrecentloading ; Loading box
  str += '<div id="boxrecentloading" style="display: none;">\
    <img src="' + load_img + '" style="border: 0; padding-right: 20px" /><b>Texnolize...</b></div>';

  // boxrecentOption ; Option box
  str += '<div id="boxrecentOption" style="padding-top:10px;">\
    <fieldset style="border:solid 1px #bfbfbf !important; border-radius: 2px !important;">\
    <legend style="text-align: left; padding-left: 3px; padding-right: 3px;">Auto:</legend>\
    <span style="display:block; line-height:20px;"><label style="color: gray;"><input id="yod_recent_autoclean" name="yod_autoclean" type="checkbox" style="cursor: pointer; position: relative; top: 3px; margin-right: 5px;">Auto Hit</label></span>\
    </fieldset>\
    <br />-[ <a href="http://ruifujiwara.blogspot.com" target="_blank">Rui_Fujiwara</a> - <a href="http://userscripts.org/scripts/show/' + yodUpdate['script_id'] + '" target="_blank"> Script</a> ]-\
    </div>';

  box.innerHTML = str;

  target.parentNode.insertBefore(box, target);

  if (g(box_id)) {
    var myButton =  g('yod_buttcleanrecent');
    if (myButton) myButton.addEventListener("click", cleaner, false);

    loadSettings();

    autoclean = myGMConfig['yod_recent_autoclean'];
    if (autoclean) {
      cleaner();
    } else toggle(true);
  }

  return g(box_id);
}

function is_ownprofile() {
  boxGroupTarget = 'UIRecentActivity_Stream';
  if (c1('.//a[contains(@href,"/editprofile.php")]')) {
    var target = g('profile_blurb');
    var targetNew;
      if (g('pagelet_fbx_navigation')) {
        boxGroupTarget = 'uiStreamMinistoryGroup';
        targetNew = g('pagelet_relationships');
        if (
          targetNew &&
          c1('.//div[contains(@id,"pagelet_byline")]')
          ) {
            return targetNew;
        }
      }
      else if (
          target &&
          g('edit_profilepicture_icon') &&
          g('feedwall_with_composer')
        ) {
        return target;
      }
  }
}

function get_boxgroup() {
  return document.getElementsByClassName(boxGroupTarget);
}

function collect(ev) {
  if (/(DIV|LI)/g.test(ev.target.tagName)) {
    if (!createButton()) return false;
    if (ev.target.className.indexOf(boxGroupTarget) >= 0) {
      autoclean = myGMConfig['yod_recent_autoclean'];
      if (autoclean) cleaner();
      else toggle(true);
    }
  }
  return false;
}

function starter(myContent) {
  if (myContent) {
    createButton();
    myContent.addEventListener(dom, collect, false);
  }
}

function Boot() {
  waitFor(
    function() {
      if (g('profile_minifeed')) {
        var contentArea = g('contentArea');
        if (contentArea) return contentArea;
        else return g('content');
      }
    }, starter, 250);
}

Boot();
usoUpdate();
})();

