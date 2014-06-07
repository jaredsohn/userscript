// ==UserScript==
// @name          SMF Spam Post/Thread hider
// @author        Joshua Merrell
// @namespace     http://eggbertx.theoks.tk
// @description	  Hides spambot posts and threads in SMF forums
// @license		  Creative Commons Attribution License Attribution-NonCommercial-ShareAlike 3.0
// @version	      0.9
// @include		  *

// ==/UserScript==

(function(){
	var alert = window.alert; //for debugging, 
	String.prototype.getNumOfChar = function(str) {
		if(str.length>1) return -1;
		num = 0;
		s = this
		for(e=0;e<s.length;e++) { 
			if(s[e]==str)num++;
		}
		return num;
	}
	String.prototype.trim = function() {
		s = this
		var le = /\s*((\S+\s*)*)/g;
		var re = /((\s*\S+)*)\s*/g;
		s = s.replace(le, "$1").replace(re, "$1");
		return s
	}
	toArray = function(s) {
		a = [];
		for(i=0;i<s.length;i++) a.push(s[i]);
		return a
	}
	function getXML(url) {
		result = "";
		try {
			xmlhttp=new XMLHttpRequest();
			xmlhttp.open("GET",url.replace(window.location.protocol+"://"+window.location.hostname+"/",""),false);
			xmlhttp.send();
			result=xmlhttp.responseText;
			var parser=new DOMParser();
			var doc=parser.parseFromString(result,'text/xml');
		} catch(e) { doc=null }
		return doc;
	}
	if(document.getElementById("footerarea").innerHTML.indexOf("Powered by SMF")>-1 && document.location.href.indexOf("board=")>-1) {
		/******************
		*	  Threads     *
		*******************/
		function Thread(index, url,subject,creator) {
			this.index = index;
			this.url=url;
			this.subject=subject;
			this.creator=creator;
			this.creator_url = "";
			this.locked=false;
			this.stickied=false;
		}
		function isSpam(thread_obj) {
			if(thread_obj.subject.trim().getNumOfChar("?") > 5 && subject.length>3) return true;
			else if(thread_obj.creator_url==null) return true;
			else if(thread_obj.locked && !thread_obj.stickied) return true;
			else {
				creator_info_dom = getXML(thread_obj.creator_url).getElementsByClassName("windowbg")[1].getElementsByTagName("tr")
				posts=creator_info_dom[1].getElementsByTagName("td")[1].innerHTML
				posts=parseInt(posts.substring(0,posts.indexOf("(")-1));
				signature=creator_info_dom[22].getElementsByClassName("signature")[0].innerHTML
				if(posts==1 && signature.indexOf("http://")>-1) return true
			}
		}
		function hideThread(index) {
			threads_arr[0].parentNode.removeChild(threads_arr[index]);
		}
		var threads_raw = document.getElementsByClassName("bordercolor")[1].getElementsByTagName("tr");
		var threads_arr = toArray(threads_raw);
		threads_arr.shift();
		var threads = [];
		for(var i=1;i<threads_raw.length;i++) {
			var thread = threads_raw[i];
			var tds = thread.getElementsByTagName("td");
			var subject = tds[2];
			var url = subject.getElementsByTagName("a")[0].getAttribute("href");
			subject = subject.getElementsByTagName("a")[0].innerHTML;
			var creator_dom = tds[3];
			try {
				creator = creator_dom.getElementsByTagName("a")[0].innerHTML.trim();
				creator_url = creator_dom.getElementsByTagName("a")[0].getAttribute("href");
			} catch(e) { 
				creator = creator_dom.innerHTML.trim()
				creator_url = null;
			}
			var thread_obj = new Thread(i-1,url,subject,creator)
			thread_obj.locked = tds[2].innerHTML.indexOf("images/icons/quick_lock.gif")>-1
			thread_obj.stickied = tds[2].innerHTML.indexOf("images/icons/show_sticky.gif")>-1
			thread_obj.creator_url = creator_url;
			threads.push(thread_obj);
		}
		for(i=0;i<threads.length;i++) {
			thread = threads[i];
			if(isSpam(thread)) hideThread(i);
		}
	} else if(document.getElementById("footerarea").innerHTML.indexOf("Powered by SMF")>-1 && document.location.href.indexOf("topic=")>-1) {
		/******************
		*	   Posts      *
		*******************/
		function Post(index, user,subject,userposts,user_pm,user_sig) {
			this.index = index;
			this.user=user;
			this.subject=subject;
			this.userposts=userposts;
			this.user_pm=user_pm;
			this.signature=user_sig
		}
		var posts_raw = document.getElementsByClassName("bordercolor")[1].childNodes[0].childNodes;
		//alert(posts_raw.innerHTML)
		var posts_arr = toArray(posts_raw);
		for(var i=0;i<posts_raw.length;i++) {
			post = posts_raw[i];
			//try { alert(post.getElementsByTagName("td")[2].getElementsByTagName("b")[0].innerHTML);}
			//catch(e) { /* alert(i+"\n"+e);*/ }
		}
	}
})();