// ==UserScript==
// @name          b3ta Monkey
// @namespace     http://copperblue.f2o.org/
// @description   b3ta monkey
// @include       http://b3ta.com/talk/*
// @include       http://*.b3ta.com/talk/*
// @include       http://b3ta.com/board/*
// @include       http://*.b3ta.com/board/*
// @include       http://b3ta.com/links/*
// @include       http://*.b3ta.com/links/*
// ==/UserScript==
/*/
Version 0.5.3 - 16/02/06
assembled by boogs, using code by me,sargant and munkt0n.

Works with greasemonkey 0.3.5, 0.5.3 and 0.6.3 upwards
Firefox 1.0+ and Firefox 1.5+
Opera 8 userjs compatible as of 20/01 :)
/*/
var lowY,ulowY,highY,uhighY,u1,u2,d1,d2,lastPos;
var aEvt = (window.opera) ? false : true;
var curPage = new String(document.location.pathname).toLowerCase();
var isBoard = ((curPage.indexOf('/board/')==0 || curPage.indexOf('/talk/')==0 || curPage.indexOf('/links/')==0 )&& ((curPage.indexOf('/write.php') && curPage.indexOf('/edit.php') && curPage.indexOf('/delete.php')))) ? true : false;
var hnn = 'highestPostNumber';
if (curPage.indexOf('/talk/')==0) hnn = 'highestPostNumber_talk';
if (curPage.indexOf('/links/')==0) hnn = 'highestPostNumber_links';
	
var usePostNav=AM_getValue('usePostNav','1');
var useShowNew=AM_getValue('useShowNew','1');
var useNewTab=AM_getValue('AM_newtab','2');

var verCode,thisUID;
try {if (document.getElementById('topbar').getElementsByTagName('a')[3].getAttribute('href').indexOf('verify_code')!=-1) verCode=document.getElementById('topbar').getElementsByTagName('a')[3].getAttribute('href').match(/\d+$/)[0]; } catch(er) {verCode=-1;}
try {if (document.getElementById('topbar').getElementsByTagName('a')[1].getAttribute('href').indexOf('profile')!=-1) thisUID=document.getElementById('topbar').getElementsByTagName('a')[1].getAttribute('href').match(/\d+$/)[0];} catch(er) {thisUID=-1;}

function AM_getValue(cname,def) {
	var dc=document.cookie;
	var prefix=cname+'=';
	var begin=dc.indexOf('; '+prefix);
	if (begin==-1) {
		begin=dc.indexOf(prefix);
		if (begin!=0) return def; }
	else begin+=2;
	var end=document.cookie.indexOf(';', begin);
	if (end==-1) end=dc.length;
	return unescape(dc.substring(begin+prefix.length, end));
}
function AM_setValue(cname, cvalue) {
	var now=new Date();
	now.setTime(now.getTime()+365*24*60*60*1000);
  	var curCookie=cname+'='+escape(cvalue)+'; expires='+now+'; path=/';
	document.cookie=curCookie;
}
var registeredEventListeners=new Array();
function addEventListener(target,event,listener,capture){
    registeredEventListeners.push([target,event,listener,capture]);
    target.addEventListener(event,listener,capture);
}
function unregisterEventListeners(event) {
    for (var i=0;i<registeredEventListeners.length;i++) {
        var rel=registeredEventListeners[i];
        rel[0].removeEventListener(rel[1],rel[2],rel[3]);
    }
    window.removeEventListener('unload',unregisterEventListeners,false);
}
if (!window.opera) addEventListener(window,'unload',unregisterEventListeners,false);
function ischecked(cname,def) {return(AM_getValue(cname,def)!=0) ? 'checked' : '';}
function AM_replace(myString,pat,repl) { for (var i=0;i<pat.length;i++) myString=myString.replace(pat[i],repl[i]); return(myString); }
function AM_highlightNew_clicked(evt,button) {
	var el=evt.target;
	if (button) el=button;
	if (el.className.toString().indexOf('disabled')!=-1) return(false);
	evt.preventDefault(); evt.target.blur();
	var id = el.id.toString();	
	var arr = (id=='GM_yourFinder_upLink' || id=='GM_yourFinder_downLink') ? yourPostsArray : newPostArray;
  	var p=null;
  	if (id.indexOf('_upLink')!=-1) { //up
  		for (i=arr.length-1;i>=0;i--) { if (arr[i].y < window.pageYOffset) {p=arr[i].e; if (arr[i].e.previousSibling) {p=arr[i].e.previousSibling; if (arr[i].e.previousSibling.previousSibling) p=arr[i].e.previousSibling.previousSibling; } break; }}
	} else {  //down
  	  	for (i=0;i<arr.length;i++) { if (arr[i].y > (window.pageYOffset+window.innerHeight)) {p=arr[i].e; if (arr[i].e.previousSibling) {p=arr[i].e.previousSibling; if (arr[i].e.previousSibling.previousSibling) p=arr[i].e.previousSibling.previousSibling; } break;	}}
  	}
  	if (p) AM_scrollElementIntoView(p);
}
function changeClass(e,cname) {
	if (e.className != cname) {
		if (e.parentNode) e.parentNode.style.display='none';
		e.className=cname;
		if (e.parentNode) e.parentNode.style.display='';
	}
}
function AM_checkPosition() {
	if (window.pageYOffset==lastPos) return(true);
	lastPos=window.pageYOffset;
	//window.status='y:'+lastPos+' low:'+lowY+' hi:'+highY+' > '+(lastPos<=lowY);
 	if (newPostArray.length>0) {
  	  	if (lastPos<=lowY) changeClass(u1,'GM_b3ta_postFinderLinkDisabled_up');
  		else if (lastPos>lowY) changeClass(u1,'GM_b3ta_postFinderLink_up');
  		if (highY <=(lastPos+window.innerHeight)) changeClass(d1,'GM_b3ta_postFinderLinkDisabled_down');
  		else if (highY >(lastPos+window.innerHeight)) changeClass(d1,'GM_b3ta_postFinderLink_down');
	}
	if (yourPostsArray.length>0) {
  		if (lastPos<=ulowY) changeClass(u2,'GM_b3ta_postFinderLinkDisabled_up');
  		else if (lastPos>ulowY) changeClass(u2,'GM_b3ta_postFinderLink_up');
  		if (uhighY <=(lastPos+window.innerHeight)) changeClass(d2,'GM_b3ta_postFinderLinkDisabled_down');
  		else if (uhighY >(lastPos+window.innerHeight)) changeClass(d2,'GM_b3ta_postFinderLink_down');
  	}
}
function AM_scrollElementIntoView(element) {
	if (typeof element.offsetLeft != 'undefined') {
		var cy=0;
		while (element) {
			cy += element.offsetTop;
			element = element.offsetParent;
		}
		window.scrollTo(0, cy);
	}	
}
function ToggleSetting(setting) {
	if (AM_getValue(setting,1)==1) AM_setValue(setting, 0);
	else AM_setValue(setting, 1);
	switch (setting) {
	case 'usePostNav':
	case 'useShowNew':
	case 'AM_QR':
		location.hash='';
		location.reload();
		break;
	case 'AM_TopB':
		var b=document.getElementById('GM_postFinderFloatingBox');
		if (b) {
			b.style.display='none';
			b.className=(AM_getValue(setting,0)==1) ? 'GM_postFinderFloatingBoxTop' : 'GM_postFinderFloatingBoxBottom';
			b.style.display='';
		}
		break;
	default:
		break;
	}
}
function AM_b3taToggleSettings(event) {
	tbar.style.display=(tbar.style.display!='none') ? 'none' : 'block';
	if (event) event.preventDefault();
}

function AM_b3ta_autoLinks() {
	var msg = document.getElementById('qmsg').value;
	msg = AM_replace(msg,[/(\s|^)(www\.)([^.\s]([^\s])+)/gi,/(\s|^)(http:\/\/|https:\/\/)(([^\s])+)/gi],["$1<a href=\"http://$2$3\">$2$3</a>","$1<a href=\"$2$3\">$2$3</a>"]);
	document.getElementById('qmsg').value=msg;
}
function AM_b3ta_cleanBoxes() {
	var quickBox = document.getElementById('GM_b3ta_quickBox');
  	if(quickBox) quickBox.parentNode.removeChild(quickBox);
  	var hiddenBox = document.getElementById('GM_b3ta_quickBox_hiddenBox');
  	if(hiddenBox) {
		hiddenBox.style.display='block';
		hiddenBox.removeAttribute('id');
	}
}
function AM_b3ta_quickBox(clickedLink, boxType) {
	AM_b3ta_cleanBoxes();
  	var isLB=false;
	var parentStyle = clickedLink.parentNode.getAttribute('style');
  	var verifyString = verCode;
  	var parentID = clickedLink.getAttribute('href').match(/\d+$/);
  	var tpath = '/board/';
  	if (curPage.indexOf('/talk/')==0) tpath = '/talk/';
  	if (curPage.indexOf('/links/')==0) tpath = '/links/';
  	var taction = (boxType == 'edit') ? 'edit' : 'write';
  	if (tpath=='/links/' && taction=='edit' && parseInt(clickedLink.parentNode.style.paddingLeft) < 10) isLB=true;
  	var hname = (boxType == 'edit') ? 'id' : 'parent';
  	var bcap = (boxType == 'edit') ? 'quickEdit' : 'quickReply';
  	var ind = parseInt(clickedLink.parentNode.style.paddingLeft);
  	var replyBlock = document.createElement('div');
	replyBlock.setAttribute('class', 'post1');
	replyBlock.setAttribute('style', 'background: #bbb; margin-bottom: 0px; ' + parentStyle);
  	replyBlock.id = 'GM_b3ta_quickBox';
  	replyBlock.style.paddingLeft = (boxType=='edit') ? ind +'px' : (ind+35)+'px' ;
  	var r = '<form method="post" action="'+tpath+taction+'.php" name="newmsg" id="newmsg">';
  	r+='<input type="hidden" name="verify_code" value="'+verifyString+'"><input type="hidden" name="preview" value="0"><input type="hidden" name="done" value="1"><input type="hidden" name="'+hname+'" value="'+parentID+'">';
	if (isLB) {
		r+='<input id="qurl" type="text" size="82" maxlength="255" name="url" title="Enter the URL here"><br>'; 
	  	r+='<input id="qsubject" type="text" size="82" maxlength="255" name="subject" title="Enter link text here"><br>'; 
		r+='<textarea id="qmsg" name="message" cols="80" rows="5"></textarea><br>';  
		r+='Not safe for work ? <input id="qnsfw" type="checkbox" name="url_nsfw">&nbsp;&nbsp;&nbsp;I made this ! <input id="qimt" type="checkbox" name="url_imadethis"> <br><br>';
	  	var tNSFW = false;
  		var tIMT = false;
  		var tSPN = clickedLink.parentNode.getElementsByTagName('SPAN')[0];
  		if (tSPN) {
  			if (tSPN.className=='nsfw') tNSFW=true;
  			else tIMT=true;
  			if (!tIMT && tSPN.nextSibling.nextSibling.className=='imadethis') tIMT=true;
  		}
	} else {
  		r+='<input id="qsubject" type="text" size="82" name="subject"><br>'; 
  		r+='<textarea id="qmsg" name="message" cols="80" rows="5"></textarea><br>';  
  	}
  	r+='<input class="Butt" type="submit" name="submit" value="' + bcap + '"> <input class="Butt" id="qpreview" type="button" name="qpreview" value="autolinks"> ';
  	r+='<input class="Butt" type="button" name="orglink" value="use the old form" onclick="window.location='+"'"+clickedLink.getAttribute('href')+"'"+';"> <input id="qclose" class="Butt" type="button" name="qclose" value="close this box" title="close this box"> </form>';
  	replyBlock.innerHTML=r;	
  	clickedLink.parentNode.parentNode.insertBefore(replyBlock, clickedLink.parentNode.nextSibling);
	if (boxType == 'edit')  {
		clickedLink.parentNode.style.display='none';
		clickedLink.parentNode.id= 'GM_b3ta_quickBox_hiddenBox';
		clickedLink.parentNode.setAttribute('id','GM_b3ta_quickBox_hiddenBox');
		var subject = clickedLink.parentNode.getElementsByTagName('b')[0].innerHTML;
		if (isLB) {
			subject = clickedLink.parentNode.getElementsByTagName('b')[0].childNodes[0].innerHTML;
			var turl = clickedLink.parentNode.getElementsByTagName('b')[0].childNodes[0].href;
			document.getElementById('qurl').value = turl;
			document.getElementById('qnsfw').checked = tNSFW;
			document.getElementById('qimt').checked = tIMT;
		}
		subject = AM_replace(subject,[/&amp;/gi,/&gt;/gi,/&lt;/gi],["&",">","<"]);
		var frob = clickedLink.parentNode.innerHTML.replace('\r',' ');
		var messageStart = frob.toLowerCase().indexOf('<br');
		var messageEnd = frob.toLowerCase().lastIndexOf('(<');
		var message = frob.substring(messageStart, messageEnd - 0);
		message = AM_replace(message,[/\s+/g,/^<br *\/?> */ig, /( *<!--([^->]*([^-]|-[^-]|--[^>]))*--> *)?$/, /<br *\/?>/ig],[" ","","","\n"]);
		document.getElementById('qsubject').value = subject;
		document.getElementById('qmsg').value = message;
  	}
}
function processDiv(thisDiv,i) {
	if(isBoard && (useShowNew!=0 || usePostNav!=0)) {
		var postNumber = thisDiv.getElementsByTagName('a')[0].getAttribute('name').match(/\d+$/)[0];
		var bs=thisDiv.getElementsByTagName('b');
		var uID=(bs[bs.length-1].getElementsByTagName('a')[0].href.indexOf('appeal')!=-1) ? bs[bs.length-1].getElementsByTagName('a')[1].href.match(/\d+$/) : bs[bs.length-1].getElementsByTagName('a')[0].href.match(/\d+$/); //for ignore/highlight get userID
		var cy = 0;
		if (window.opera) {
			cy =thisDiv.offsetTop;
		} else {
			var element=thisDiv;
			while (element) {
				cy += element.offsetTop;
				element = element.offsetParent;
			}
		}
		if (uID==thisUID && usePostNav!=0) {
			if(ulowY==null) ulowY= cy;
			uhighY=cy;
			var newpost = {index:i, postid: postNumber, y: cy ,e:thisDiv};
			yourPostsArray[yourPostsArray.length] = newpost;
			thisDiv.setAttribute('class', 'GM_yourPost ' + thisDiv.getAttribute('class'));
			var pad=parseInt(thisDiv.style.paddingLeft)-5;
			thisDiv.style.paddingLeft = pad + 'px';
		} else if(postNumber > highestPostNumber && useShowNew!=0) {
			if(postNumber > highestPostNumberMemory) highestPostNumberMemory = postNumber;
			if(lowY==null) lowY=cy;
			highY=cy;
			var newpost = {index:i, postid: postNumber, y: cy, e:thisDiv};
			newPostArray[newPostArray.length] = newpost;
			thisDiv.setAttribute('class', 'GM_newPost ' + thisDiv.getAttribute('class'));
			var pad=parseInt(thisDiv.style.paddingLeft)-5;
			thisDiv.style.paddingLeft = pad + 'px';
		}
	}
}
function clickHandler(event) {
  	var eventCaptured = false;
	if (isBoard && AM_getValue('AM_QR',1)==1 && verCode!=-1) {
  		if(event.target.innerHTML == 'Reply' && (event.target.href.indexOf('b3ta.com/board/write.php')!=-1 || event.target.href.indexOf('b3ta.com/talk/write.php')!=-1 || event.target.href.indexOf('b3ta.com/links/write.php')!=-1)) { AM_b3ta_quickBox(event.target, 'reply'); eventCaptured = true;}
  		if(event.target.innerHTML == 'Edit' && (event.target.href.indexOf('b3ta.com/board/edit.php')!=-1 || event.target.href.indexOf('b3ta.com/talk/edit.php')!=-1 || event.target.href.indexOf('b3ta.com/links/edit.php')!=-1)) { AM_b3ta_quickBox(event.target, 'edit'); eventCaptured = true; } 
  	}
  	var tid=event.target.id;
  	if (tid=='settings') { AM_b3taToggleSettings(); eventCaptured = true;  	}
  	if (tid=='np') ToggleSetting('useShowNew'); 
  	if (tid=='yp') ToggleSetting('usePostNav');
  	if (tid=='topb') ToggleSetting('AM_TopB');
  	if (tid=='qr') ToggleSetting('AM_QR');
  	if (tid=='newtab') return(true);
  	if (tid=='qclose') {  AM_b3ta_cleanBoxes(); eventCaptured = true;  	}
  	if (tid=='qpreview') { AM_b3ta_autoLinks(); eventCaptured = true;  	}
 	if (tid=='GM_postFinder_upLink' || tid=='GM_postFinder_downLink' || tid=='GM_yourFinder_upLink' || tid=='GM_yourFinder_downLink') AM_highlightNew_clicked(event);
	if (event.target.target) {
		var thost=event.target.host.toString().toLowerCase();
		if (thost!='www.b3ta.com' && thost!='b3ta.com' && thost!='jelly.b3ta.com') {
			switch (useNewTab) {
			case '0':
				event.target.target='_self';
				break;
			case '1':
				event.stopPropagation();
				event.preventDefault();
				if (!window.opera) GM_openInTab(event.target.href);	
				break;
			case '2':
				event.target.target='_blank';
				break;
			}
		}
	}
	if(eventCaptured) {	event.stopPropagation(); event.preventDefault(); }
}
function selectHandler(event) {
  	var eventCaptured = false;
  	var tid=event.target.id;
  	if (tid=='newtab') {
  		useNewTab=event.target.value;
  		AM_setValue('AM_newtab',useNewTab);
  	}
	if(eventCaptured) {	event.stopPropagation(); event.preventDefault(); }
}
function capturekey(e){
	var key=e.keyCode;
	var up = (window.opera) ? 91 : 38;
	var down = (window.opera) ? 93 : 40;
	if(key==down && e.ctrlKey==true && newPostArray.length>0) AM_highlightNew_clicked(e,d1);
	if(key==up && e.ctrlKey==true && newPostArray.length>0) AM_highlightNew_clicked(e,u1);
	if(key==down && e.altKey==true && yourPostsArray.length>0) AM_highlightNew_clicked(e,d2);
	if(key==up && e.altKey==true && yourPostsArray.length>0) AM_highlightNew_clicked(e,u2);
}
// Start
// Append a style class for new posts
var newstyle=".GM_newPost {border-left :5px solid #9D9B9B;}\n" +
	".GM_yourPost {border-left :5px solid #222;}\n" +
	"label {color: #ffcc66; font-weight: bold; cursor:pointer}\n" + 
	"fieldset {float:left; } input[type=checkbox] { margin:0px}\n" + 
	".GM_postFinderNumber {color: #fff; font-weight: bold}\n" + 
	".GM_postFinderFloatingBoxTop {opacity:0.8;font-family:arial,helvetica; text-decoration:none; position: fixed; top: 0px; right: 0px; height: 1.5em;  padding: 2px 0px 0px 15px; background: #bbb; -moz-border-radius-bottomleft: 32px; color: #000; font-size: 10px}\n" +
	".GM_postFinderFloatingBoxTop > A,.GM_postFinderFloatingBoxBottom > A {text-decoration:none;}\n" +
	".GM_postFinderFloatingBoxBottom {opacity:0.8;font-family:arial,helvetica; text-decoration:none; position: fixed; bottom:0px; right:0px; height: 1.55em;  padding: 2px 0px 0px 15px; margin: -1.55em 0em 0em 0em; background: #bbb; -moz-border-radius-topleft: 32px; color: #000; font-size: 10px}\n" +	
	"a.GM_b3ta_postFinderLink_up {border: 1px solid #bbb; padding-left: 14px; margin: 0px 0px 0px 5px; color: #fff; background: no-repeat center left  url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAYAAADkZNYtAAAAB3RJTUUH1gEVAQsbOkehnwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAFlJREFUeNpjYMAC/gMBNnFGbAq/f/0KZnPx8DDiVIysEAaQNTDiU4iugZGQQmQNjN++fPnf2NwMFqivrUVRABPHCkA2gDTDcHl5OUqoMDGQAFiQOSB347MaAG5YPstZysdHAAAAAElFTkSuQmCC)}\n" + 
	"a.GM_b3ta_postFinderLink_down {border: 1px solid #bbb; padding-left: 14px; margin: 0px 0px 0px 5px; color: #fff; background: no-repeat center left  url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAYAAADkZNYtAAAAB3RJTUUH1gEVAQsd0yQEqgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAFtJREFUeNpjYEAC/9HAty9f/iPLszCgge9fv8LZjc3NKHJMDCQARpB1uEwGAU5ubrg4EyMQgBgwjM1ZFRUVDFw8PIxwQZBnsOHy8vL/2JzEQLRCdA0EFcIALoUAQhtnG7/Xfw4AAAAASUVORK5CYII%3D)}\n" + 
	"a.GM_b3ta_postFinderLink_up:hover {border-color: #ccc #666 #666 #ccc; padding-left: 14px; margin: 0px 0px 0px 5px;}\n" +
	"a.GM_b3ta_postFinderLink_down:hover {border-color: #ccc #666 #666 #ccc; padding-left: 14px; margin: 0px 0px 0px 5px;}\n" +
	"a.GM_b3ta_postFinderLinkDisabled_up,a.GM_b3ta_postFinderLinkDisabled_up:hover {border: 1px solid #bbb; padding-left: 14px; margin: 0px 0px 0px 5px; color: #000; background: no-repeat center left url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAYAAADkZNYtAAAAVElEQVR42pXOwQ2AQAgEwMVYCc1RCyVQC73Qir68cAQx7pPMAkATd7%2B6OXUwIgAAIkKvOMMnuUATrAX6grlAZrYgM2%2BgLhh%2Fjgio6jIHfuSsZ6ffb0yNNtUd1TY4AAAAAElFTkSuQmCC)}\n" +
	"a.GM_b3ta_postFinderLinkDisabled_down,a.GM_b3ta_postFinderLinkDisabled_down:hover {border: 1px solid #bbb; padding-left: 14px; margin: 0px 0px 0px 5px; color: #000; background: no-repeat center left url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAJCAYAAADkZNYtAAAAYElEQVR42pWOyw3AIAxDX6pOwnKMwAwZgVnYxavQEyiiUKnvlI%2Bd2Ai01nrsJZFzttHfLEja1gAXP7Dd60hKac4NoNbavy5Kwt1thj8ZhhDA4mI1ROFLHA2r8EgpZRvpAZHsM2%2BnM3z%2BAAAAAElFTkSuQmCC)}\n"+
	"#qsubject,#qmsg,#qurl {width:499px; font-family:arial,helvetica; font-size:10pt; background: #fff; border: 1px solid #aaa; margin-bottom: 5px; } \n"+
	".Butt {letter-spacing:1.8px; color: #000000; background: #d9d9d5; border:1px solid; border-top-color: #fff; border-right-color: #b6aeb3; border-bottom-color: #b6aeb3; border-left-color: #fff; font: 12px Arial, Helvetica, sans-serif; }\n " ;

var s = document.createElement('style');
s.type = 'text/css';
s.innerHTML = newstyle;
document.getElementsByTagName('head')[0].appendChild(s);

addEventListener(document.getElementsByTagName('body')[0],'click', function(event){ clickHandler(event);}, aEvt);
addEventListener(document,'keydown',capturekey,aEvt);

var highestPostNumber = parseInt(AM_getValue(hnn, 0));//-10; // Load the highest viewed post number from memory, and copy it to 2 variables
var highestPostNumberMemory = highestPostNumber;
var newPostArray = new Array;
var yourPostsArray = new Array;

lowY=null;
ulowY=null;
var floatingBox2 = document.createElement('div');
floatingBox2.id='GM_postFinderFloatingBox';
floatingBox2.className=(AM_getValue('AM_TopB',1)!=0) ? 'GM_postFinderFloatingBoxTop' : 'GM_postFinderFloatingBoxBottom';
floatingBox2.innerHTML='Loading....';
document.getElementsByTagName('body')[0].appendChild(floatingBox2);

if (!document.getElementById('settings')) {
	var tbar = document.createElement('div');
	tbar.style.display='none';
	var bc='<fieldset><legend>Highlight</legend><input type="checkbox" name="newposts" id="np" '+ischecked('useShowNew',1)+'> New Posts | <input type="checkbox" name="yourposts" id="yp" '+ischecked('usePostNav',1)+'> Your Posts</fieldset>';
		bc+='<fieldset><legend>Navigation</legend><input type="checkbox" name="topbar" id="topb" '+ischecked('AM_TopB',1)+'> Toolbar at Top</fieldset>';
		bc+='<fieldset><legend>Other</legend><input type="checkbox" name="topbar" id="qr" '+ischecked('AM_QR',1)+'> Quick Reply/Edit ';
		bc+='| Open Links In <select name="newtab" id="newtab"><option value="0" '+ (useNewTab=='0' ? 'SELECTED':'') + '>Existing Window</option>';
		if (!window.opera && GM_openInTab) bc+='<option value="1" '+ (useNewTab=='1' ? 'SELECTED':'') + '>New Tab</option>';
		bc+='<option value="2" '+ (useNewTab=='2' ? 'SELECTED':'') + '>New Window</option></select>';
		bc+='</fieldset><div style="clear:both;"></div>';
	tbar.innerHTML=bc;
	var tlink = document.createElement('a');
	var anc4=document.getElementsByTagName('div')[0];
	tlink.setAttribute('href','#');
	tlink.setAttribute('class','w');
	tlink.id='settings';
	tlink.innerHTML=' b3tamonkey settings';
	anc4.insertBefore(document.createTextNode('.  '),anc4.parentNode.getElementsByTagName('br')[0]);	
	anc4.insertBefore(tlink,anc4.parentNode.getElementsByTagName('br')[0]);	
	anc4.insertBefore(tbar,anc4.parentNode.nextSibling);
	addEventListener(document.getElementById('newtab'),'change', function(event){ selectHandler(event);}, aEvt);
}
var fb='<a href="#" onClick="window.scrollTo(0,0);return false;" class="GM_b3ta_postFinderLink_up">Top</A>';
floatingBox2.innerHTML = fb;
if(isBoard && (useShowNew!=0 || usePostNav!=0)) {
	//addEventListener(window, 'load', function() {
		var thisDiv;
		var divs=document.getElementsByTagName('div');
		for (var i = 0; (thisDiv=divs[i]); i++) if (thisDiv.className=='post1' || thisDiv.className=='post2') processDiv(thisDiv,i);
		if(isBoard && (newPostArray.length > 0 || yourPostsArray.length > 0)) { 
			fb+=' | ';
			if(yourPostsArray.length > 0) fb+='Your posts: <span class="GM_postFinderNumber">' + yourPostsArray.length + '</span><a href="#" id="GM_yourFinder_upLink" class="GM_b3ta_postFinderLinkDisabled_up">Up</a> <a href="#" id="GM_yourFinder_downLink" class="GM_b3ta_postFinderLink_down">Down</a>';
			if(newPostArray.length > 0 && yourPostsArray.length > 0) fb+=' | ';
			if(newPostArray.length > 0) fb+='New posts: <span class="GM_postFinderNumber">' + newPostArray.length + '</span><a href="#" id="GM_postFinder_upLink" class="GM_b3ta_postFinderLinkDisabled_up">Up</a> <a href="#"  id="GM_postFinder_downLink" class="GM_b3ta_postFinderLink_down">Down</a>';
			floatingBox2.innerHTML = fb + '&nbsp;&nbsp;';
			u1=document.getElementById('GM_postFinder_upLink');
			d1=document.getElementById('GM_postFinder_downLink');	
			u2=document.getElementById('GM_yourFinder_upLink');
			d2=document.getElementById('GM_yourFinder_downLink');
			if (window.opera) window.onscroll= AM_checkPosition; 	
			else window.setInterval(AM_checkPosition, 500);
		}
	//}, false);
}
if (isBoard) AM_setValue(hnn, highestPostNumberMemory); // put the new highest value into memory.
