// ==UserScript==
// @author	e1software 
// @name	Adicionador de Followers / Twitter one click friend adder by e1software (infohelp.org)
// @description Adiciona nuevos recursos a tu sitio de Twitter

// @include	http://twitter.com/*/followers*
// @include	http://twitter.com/*/friends*
// @include	http://twitter.com/friends*
// @include	https://twitter.com/*/followers*
// @include	https://twitter.com/friends*
// @include	https://twitter.com/*/friends*
// ==/UserScript==
var MAX_DUMP_DEPTH = 10;
function dumpObj(obj, name, indent, depth) {
       if (depth > MAX_DUMP_DEPTH) {
              return indent + name + ": <Maximum Depth Reached>\n";
       }
       if (typeof obj == "object") {
              var child = null;
              var output = indent + name + "\n";
              indent += "\t";
              for (var item in obj)
              {
                    try {
                           child = obj[item];
                    } catch (e) {
                           child = "<Unable to Evaluate>";
                    }
                    if (typeof child == "object") {
                           output += dumpObj(child, item, indent, depth + 1);
                    } else {
                           output += indent + item + ": " + child + "\n";
                    }
              }
              return output;
       } else {
              return obj;
       }
}
function pms_get( call_method, call_url, cb ) {
		GM_xmlhttpRequest({
      method: call_method,
      url:call_url,
      headers:{
        "User-Agent":navigator.userAgent
      },
      onload:cb,
      onerror:function(details)
          {
						 GM_log("Error contacting Server: "+details);
          }
    });
}
var MutualsShown = 0;
var Cancel_Ops = 0;
function ShowMutuals() {
	newwindow=window.open('http://www.infohelp.org/danilo-salles/twitter-adicione-todos-seguidores-com-um-clique','INFOHelp.org','height=500,width=1000,resizable=yes,scrollbars=yes,toolbar=yes,location=yes,status=yes,menubar=yes');
	if (window.focus) {newwindow.focus()}
}
function CancelAll() {
		GM_setValue("PMS_twfr_drop", 'not dropping');
	  GM_setValue("PMS_twfr_run", 'not running');
		Cancel_Ops = 1;
}
function DropAllNonMutuals() {
		GM_setValue("PMS_twfr_drop", 'dropping');
		DropNonMutuals(0);
}
function DropNonMutuals(i) {
	if (Cancel_Ops == 1) {
		GM_log("canceling");
		return;
	}
	var running = GM_getValue("PMS_twfr_drop", 'not dropping');
	if ( i == 0 && running == 'dropping' && MutualsShown == 0 ) {
			ShowMutuals();
			MutualsShown = 1;
			      window.setTimeout(function (){DropNonMutuals(i)},10000,false);
			return;
	}
	spans = document.getElementsByTagName('span');
	if (i >= spans.length) {
		if ( running == 'dropping' ) {
			 next = document.getElementById('pms_next');
			 if (next != null) {
			 		location.href = next.href;
			 }
		}
		return;
	}
		if ( /not_mutual-/.test(spans[i].id ) ) {
			 userid = spans[i].id.substr('non_mutual-'.length);
			 btnid = 'remove-btn'+userid;
			 button = document.getElementById(btnid);
 			 spans[i].parentNode.removeChild( spans[i] );
 			 evt=document.createEvent("MouseEvents");
 			 if(evt && evt.initMouseEvent) {
				evt.initMouseEvent("click",true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);
				button.dispatchEvent(evt);
 			 }
     window.setTimeout(function (){DropNonMutuals(i+1)},500,false);
		} else {
			DropNonMutuals(i+1);
		}
}
function friend_info( response ) {
	friend = response.finalUrl.substr( response.finalUrl.lastIndexOf('/')+1 );
	s1 = response.responseText.split('span id="following_count" class="stats_count numeric"');
	following_count = s1[1].substr(1, s1[1].indexOf("<")-1);
	s1 = response.responseText.split('span id="followers_count" class="stats_count numeric"');
	follower_count = s1[1].substr(1, s1[1].indexOf("<")-1);
	s1 = response.responseText.split('class="label">Updates</a> <span class="stats_count numeric"');
	updates = s1[1].substr(1, s1[1].indexOf("<")-1);
 spans = document.getElementsByTagName('a');
	 for (i=0; i < spans.length; i++) {
		 hr_friend = spans[i].href.substr( spans[i].href.lastIndexOf('/')+1);
		 if (spans[i].className == 'url uid' && spans[i].rel=='contact' && hr_friend == friend) {
				 				 nav = spans[i].parentNode.parentNode.parentNode;
				 divs = nav.getElementsByTagName('div');
				 for (k=0; k < divs.length; k++) {
						if (/control/.test(divs[k].id)  ) {
							 userid = divs[k].id.substr('control'.length);
							 button = document.getElementById('remove-btn'+userid);
							 break;
						}
				 }
 			sElement = document.createElement('span');
		 			sElement.innerHTML = '&nbsp;Following: '+following_count+' Followers: '+follower_count+' Updates: '+updates+'&nbsp;';
		 			sElement.id = 'following-'+userid;
					sElement.setAttribute("style","float:right");
     			divs[k].insertBefore(sElement, button.nextSibling);
					break;
			}
		}
 }
function followed_info( response ) {
	 friend = response.finalUrl.substr( response.finalUrl.indexOf('user_a=')+7 );
	 friend = friend.substr( 0, friend.indexOf('&user_b'));
	 spans = document.getElementsByTagName('a');
	 for (i=0; i < spans.length; i++) {
		 hr_friend = spans[i].href.substr( spans[i].href.lastIndexOf('/')+1);
		 if (spans[i].className == 'url uid' && spans[i].rel=='contact' && hr_friend == friend) {
				 nav = spans[i].parentNode.parentNode;
				 divs = nav.getElementsByTagName('div');
				 for (k=0; k < divs.length; k++) {
						if (/control/.test(divs[k].id)  ) {
							 userid = divs[k].id.substr('control'.length);
							 button = document.getElementById('remove-btn'+userid);
							 break;
						}
				 }
		 			sElement = document.createElement('span');
		 			if (response.responseText == 'true' ) {
		 				sElement.innerHTML = '&nbsp;Mutual&nbsp;';
		 			  sElement.id = 'mutual-'+userid;
					 	sElement.setAttribute("style","float:right");
		 			} else {
		 				sElement.innerHTML = '&nbsp;Not Mutual&nbsp;';
		 			  sElement.id = 'not_mutual-'+userid;
					  sElement.setAttribute("style","float:right; color:red");
		 			}
     			divs[k].insertBefore(sElement, button.nextSibling);
          pms_get( 'GET', 'http://twitter.com/'+friend, friend_info );
		 			break;
		 	}
	 }
}
var fp = document.getElementsByTagName("button");
function AddAllFollowers( j ) {
document.location =
'javascript:function confirm(message) {' +
'return 1;'+
'}';
document.location =
'javascript:function alert(message) {' +
'return 1;'+
'}';
	if (Cancel_Ops == 1) {
		GM_log("canceling");
		return;
	}
		GM_setValue("PMS_twfr_run", 'running');
		 if ( j == fp.length ) {
			nexttags = document.getElementsByTagName('a');
			for (i=0; i < nexttags.length; i++) {
				 if (nexttags[i].rel == 'me next') {
						break;
				 }
			}
			if (i < nexttags.length) {
				document.location = nexttags[i].href;
				return;
			}
		  GM_setValue("PMS_twfr_run", 'not running');
			return;
		 }
		 waitval = document.getElementById('pms_wait').value;
		 waitval = waitval * 1000;
		 if ( fp[j].innerHTML == 'follow' ) {
 			evt=document.createEvent("MouseEvents");
 			if(evt && evt.initMouseEvent) {
				evt.initMouseEvent("click",true,true,document.defaultView,1,0,0,0,0,false,false,false,false,0,null);
				fp[j].dispatchEvent(evt);
 			}
     window.setTimeout(function (){AddAllFollowers(j+1)},waitval,false);
		 } else {
         				AddAllFollowers(j+1);
		 }
		return;
}
var hr = window.location.href;
if ( /followers/.test(hr) || ( /friends/.test(hr) && !/twitter.com\/friends/.test(hr) ) ) {
ndivs = document.getElementsByTagName("h2");
if (ndivs.length > 0) {
		navdiv = ndivs[0];
    newElement = document.createElement('input');
		newElement.value = "Cancelar";
		newElement.type = "button";
   	newElement.setAttribute("style","float:right");
		newElement.addEventListener("click", function() { CancelAll() }, false );
    navdiv.parentNode.insertBefore(newElement, navdiv);
    newElement = document.createElement('input');
		newElement.value = "Adicione todos Followers";
		newElement.type = "button";
		newElement.addEventListener("click", function() { AddAllFollowers(0)	}, false );
    navdiv.parentNode.insertBefore(newElement, navdiv);
  newElement = document.createElement('input');
		newElement.value = "Powered by INFOHelp.org";
		newElement.type = "button";
   	newElement.setAttribute("style","float:right");
		newElement.addEventListener("click", function() { ShowMutuals() }, false );
    navdiv.parentNode.insertBefore(newElement, navdiv);
		waitElement = document.createElement('input');
		waitElement.value = "2";
		waitElement.type = 'text';
		waitElement.id = 'pms_wait';
		waitElement.size = 5;
    navdiv.parentNode.insertBefore(waitElement, navdiv);
		sElement = document.createElement('span');
		sElement.innerHTML = '&nbsp;Intervalo em segundos&nbsp;';
    waitElement.parentNode.insertBefore(sElement, waitElement);
}
	var running = GM_getValue("PMS_twfr_run", 'not running');
	if ( running == 'running' ) {
		AddAllFollowers(0);
	}
}
if ( /twitter.com\/friends/.test(window.location.href) ) {
document.location =
'javascript:function confirm(message) {' +
'return 1;'+
'}';
document.location =
'javascript:function alert(message) {' +
'return 1;'+
'}';
ndivs = document.getElementsByTagName("h2");
if (ndivs.length > 0) {
		navdiv = ndivs[0];
		nexts = document.getElementsByTagName('a');
		for (i=0; i < nexts.length; i++) {
			 if (nexts[i].rel == 'me next') {
    		newElement = document.createElement('a');
				newElement.id = 'pms_next';
				newElement.className = nexts[i].className;
				newElement.innerHTML = nexts[i].innerHTML;
				newElement.href = nexts[i].href;
   			newElement.setAttribute("style","float:right");
    		navdiv.parentNode.insertBefore(newElement, navdiv);
				break;
			 }
		}
  newElement = document.createElement('input');
		newElement.value = "Powered by INFOHelp.org";
		newElement.type = "button";
   	newElement.setAttribute("style","float:center");
		newElement.addEventListener("click", function() { ShowMutuals() }, false );
    navdiv.parentNode.insertBefore(newElement, navdiv);
  document.location = "javascript:function removeUser(user_id, screen_name, authenticity_token) {"+
"newElement = document.createElement('input');" +
"newElement.type = 'hidden';"+
"newElement.id = 'block'+user_id;" +
"document.body.insertBefore(newElement,document.body.firstChild);" +
" new Ajax.Request('/friendships/destroy/' + user_id + '?authenticity_token=' + authenticity_token, { "+
" asynchronous: true, " +
" evalScripts: true, " +
" onComplete: function(transport) { " +
" if (transport.responseText.match(/success/)) { " +
" new Ajax.Request('http://twitter.com/account/refresh_follow_control/'+user_id+'?action_taken=removed', {" +
" asynchronous: true, " +
" evalScripts: true, " +
" onComplete: null " +
" });" +
" } else { " +
" borked(); " +
" } " +
" } " +
" }); "+
"} ";
	var running = GM_getValue("PMS_twfr_drop", 'not dropping');
if ( running == 'dropping' ) {
    window.setTimeout(function (){DropNonMutuals(0)},2000,false);
	}
}
}



