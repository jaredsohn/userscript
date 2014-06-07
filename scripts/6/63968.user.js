// ==UserScript==
// @name           NeoGAF - Multi-Quote
// @description    This script adds the ability to multi-quote several posts in NeoGAF. Just check the posts you want, and click on the normal Reply or Quote links to see your quotes on the reply box.

// @author         hateradio
// @namespace      http://hateradio.co.cc/

// @include        http://*neogaf.com/forum/showthread.php*
// @include        http://*neogaf.net/forum/showthread.php*
// @include        http://*neogaf.com/forum/newreply.php*
// @include        http://*neogaf.net/forum/newreply.php*

// @version        1.1
// @date           19/02/2011
// @since          27/11/2009

// Copyright (c) 2009, hateradio
// ==/UserScript==

/* "MY 'THE CSS'" */

var imq = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAwCAYAAAAYX/pXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJGNDEzMDJBM0NCMzExRTA5NjAxQjA3REU1NjY1RDlGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJGNDEzMDJCM0NCMzExRTA5NjAxQjA3REU1NjY1RDlGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkY0MTMwMjgzQ0IzMTFFMDk2MDFCMDdERTU2NjVEOUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkY0MTMwMjkzQ0IzMTFFMDk2MDFCMDdERTU2NjVEOUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7fcddUAAAE30lEQVR42txWW0wcVRj+ZmZ3YWF2oaJQG7RUsogJbWIihERNVEwKGI2amFRiUosJRiySKAn0qX3wskh8MCpaJNb0RSMkShsqLBCrIC6UEG67hQAllEuhsOBu2e591v+c7nLrLmD6YjzJN2dmzvn/+eb7z3xzhGOftGQCKCGkI3JzE0yEth+qjl7fPqgivFNSmJX1hCEZwfDd4Ebn8fnlrpH5oobOiYfo8sz2BCLhEAsO0OyAAvgDgFcJwks3PH4FGrUK2RkpbO4jkeipwk8K0sFPgcFgkJ8rdFA4EwU7NZZAEATwycFQ0NjMiv6i+Vr6kt2lEzbeSHnd2PpiKM5JOM/AEni8XiVOF6fGilPhSZp7pgwv5KQlRNBFE9IlkXQ5Rbo8yjRo+b7NCsu0DUmyGvfrNFhYdcbvUZfDIpWmvm/85ulPG/ptq2se/DY4Bx9N2qyLX1EQoGAfZfNR7/UrW6oAStJFnWvw2jLOmaw+VvvtuoRFVejAIIlMHah5FUgcLXX3fddq9VL/HqGTdJFl0mU1pMufwxfRc/USHM5VYuhDTmYBTTN4xBATmdBPKCU249SfO99xlVWD63LF+gusi7/imSezUXrsXRx5PA2XJ+uwsFRzQ2DZIzVi9Rp19WfLn9WXf/EyXik8CuKNlx4rw2cdJZDo7X/8+YJbjLZAiEkDdQs9o4tYdixALcg8mLUP8uqQnnyEncZGTUAM2GvtJ13cNvuS1zLfDWPbCT5mNJ3A5M0h/qGJO6zSREIHIVsJBmrMQ93Q0MK9OFwLjaBC18DvbM5XUTXY3nJPHjAykQk6wi1CrfnL+SrBaDTu2Q8qKysj+0FBQUGWwWBAJDZer1e2WCxFXV1d0f2ABSvKnQWj8GUb4PD5fFCr1cjIyNjFD0JPZkHh83DC3VrID4T1AIbZ2Vm92WxOt9vtOjYWSqRUV1dH9gO/3x+n1WqxtrbGJ/f29hpycnISIuiiCemSSLqcIl3u+EFbWxump6chyzJ0Oh1WVlbi96jLYZFKUz8+Pn66sbHRxhgMDQ1t0SIcyJIQU37O+i1+QEm4H0xNTYHYhPxAWNckzGLztSiKG35A4nA/MJlM635AT5FjY2PhdDp5AImK7u5uOBwOziA3N5eF3u0HxIb7QXt7O6sG14UFDwwM8KDi4mJkZmaCjQ8ODkb3A2LF/aCsrExfUVGB/Px8SJLExyYmJvi/oKmpKfrXSEy4H4yNjcFmsyEmJobfHx0d5a/AqsH8QBUtATHgfkC6uKmsotVq1Wxmy6q1dz9QlJq+vr6w8jw4VMq9+0FeXt5dfpCamlol/Jv9AeE6eeVm2wNL8Pku+wPQfxD0H+z8H+wPCP/F/QFb7/e8P6B2b/sDarvuD1Zb6vB361m4ZsahSjkA/XNv0bQcj5T1/BsswT4C+3F8RJgkJC07XE/pKcHDD8iwm76F68pPyCosgqGoHMmJMVjsaYZqZqSTrcRoJV7fH5jfzMTTx09CO3kZmKO3TUjEsuog+k2dU6od1gjzgw9pf6CXlmcRu/8QUPj+xgI68yAkRUjbKcH6/uC4SrTfHmhOib9QCo9rAbfZ5+iQEJAwvyc/kPclfWP56w//DbcWDomEXREwMSewZVK7E4NZwquh8xHfLbd7eHr+bSkgHAxI4hx9MV/T/Y//EWAAn3mUjdb3zXQAAAAASUVORK5CYII='

var css = "/*multi-quote*/\ntable[id^=\"post\"] > tbody > tr > td[width=\"135\"] { height: 108px; }\n\
.qclick,.qclickn {cursor: pointer;background: url('"+imq+"') no-repeat 0px 0px;position: absolute;z-indez: 100;left: 7px;width: 16px;height: 16px;padding: 0px 2px;}\n\
.qclick:hover,.qclickn:hover {background-position: 0px -16px;}\n\
.qclickn { background-position: 0px -32px;}"

var head = document.getElementsByTagName("head")[0];
var s = document.createElement("style");
s.type = "text/css";
s.appendChild(document.createTextNode(css));
head.appendChild(s);


var quotes = ""; // "global" quotes storage

/* "MY 'THE START OF THE CLASS'" */

function multiquote(){
	
	this.link; // +/-
	this.nid; // number id
	this.ref; // href
	this.tmp; // temporary var
	this.posts; // string / array of post #'s
	this.post; // single
	this.textarea = document.getElementById('vB_Editor_001_textarea'); // when replying
	this.re; // regexp's
	this.r = new XMLHttpRequest(); // request
	this.userpost; // content
	this.username; // name
	this.quote; // formated BB code
	this.a = document.links;
	this.newr = /newreply/;
	
	this.replaces = new Array("<li>([^]+?)</li>","<b>([^]+?)<\/b>","<i>([^]+?)<\/i>","<strike>([^]+?)<\/strike>","<u>([^]+?)<\/u>",
		"<ul>([^]+?)<\/ul>",'<ol style\="list-style-type: decimal">([^]+?)<\/ol>',"<br \/>",
		'<img src\="images\/smilies\/laugh\.gif" border\="0" alt\="" title\="" class\="inlineimg" \/>|<IMG border\="0" class\="inlineimg" title\="" alt\="" src\="images\/smilies\/laugh\.gif"\/>',
		'<img src\="images\/smilies\/biggrin\.gif" border\="0" alt\="" title\="Big Grin" class\="inlineimg" \/>|<IMG border\="0" class\="inlineimg" title\="Big Grin" alt\="" src\="images\/smilies\/biggrin\.gif"\/>',
		'<img src\="([^]+?)" border\="0" alt\="" \/>',
		'<a href\="mailto:([^]+?)">([^]+?)<\/a>',
		'<a href\="([^]+?)" target="_blank">([^]+?)<\/a>',
		'<div style\="margin\:20px; margin-top\:5px; ">[^]+?<\/table>[^]+?<\/div>',
		'<div style\="margin\:20px; margin-top\:5px">[^]+?Code\:[^]+?<div dir\="ltr" style\="text-align\:left;">([^]+?)<\/div><\/pre>[^]+?<\/div>',
		'<blockquote>([^]+?)</blockquote>','[\\s]+$','^[\\s]+','<span style\="color\: #e21212">([^]+?)<\/span>','&quot;','<span class=spoiler>([^]+?)</span>',
		'<strike>([^]+?)</strike>','<span class="highlight">([^]+?)</span>','&gt;','&lt;'
	);
	this.by = new Array("[*]$1\n","[B]$1[/B]","[I]$1[/I]","[STRIKE]$1[/STRIKE]","[U]$1[/U]",
		"[LIST]$1[/LIST]\n","[LIST=1\"]$1[/LIST]\n", "",
		":lol",
		":D",
		'[IMG]$1[/IMG]',
		'[EMAIL="$1"]$2[/EMAIL]',
		'[URL="$1"]$2[/URL]',
		'', // strips quotes, like gaf does by default
		"[CODE]$1[/CODE]",
		'[INDENT]$1[/INDENT]',"","","$1",'"','[SPOILER]$1[/SPOILER]','[STRIKE]$1[/STRIKE]','[HIGHLIGHT]$1[/HIGHLIGHT]','>','<'
	);
	
	/* "MY 'THE STANDARD PAGE METHODS'" */
	
	this.quoter=function(){
		for(i = 0; i < this.a.length; i++){
			if (this.newr.test(this.a[i].href)){
				var q = new multiquote();
				with(q){
					q.ref = this.a[i].href;
					this.a[i].setAttribute('onclick','return false;');
					this.a[i].addEventListener('click', function(){ makelink(); }, false);
					if(this.a[i].href.indexOf('noquote') == -1 && this.a[i].parentNode.className == 'smallfont'){
						// this.a[i].parentNode.setAttribute('style','position:relative');
						q.nid = q.ref.match(/p\=(\d*)/im)[1];
						link = document.createElement('span');
						link.id = 'q_' + q.nid;
						link.title = 'To Reply Click On "Reply" or "Quote"';
						link.setAttribute('class','qclick');
						link.addEventListener('click', function(){ quote(); }, false);
						this.a[i].parentNode.insertBefore(link,this.a[i].nextSibling);
					}
				}
			}
		}
	}

	this.quote=function(){
		quotes.indexOf(this.nid) >= 0 ? this.unquote() : this.doquote();
	}
	
	this.doquote=function(){
		quotes = quotes + ":" + this.nid;
		document.getElementById('q_'+this.nid).className = 'qclickn';
	}
	
	this.unquote=function(){
		quotes = quotes.substr(0,quotes.indexOf(':'+this.nid)) + quotes.substr(quotes.lastIndexOf(":"+this.nid)+(':'+this.nid).length);
		document.getElementById('q_'+this.nid).setAttribute('class','qclick');
	}

	this.makelink=function(){
		tmp = this.ref;
		quotes.length > 0 ? tmp = this.ref + "&m=" + quotes.substr(1) : "";
		window.location = tmp;
	}

	/* "MY 'THE REPLYING METHODS'" */

	this.getquery=function(){
		this.posts = window.location.toString();
		if(this.posts.indexOf("m=") != -1){
			this.posts = this.posts.substring(this.posts.lastIndexOf("m=")+2);
			if(this.posts.indexOf(":") != -1){
				this.posts = this.posts.split(":")
			}
			this.generate();
		} else {
			this.posts = false;
		}
	}

	this.generate=function(){
		if(typeof(this.posts) == 'string'){
			this.post = this.posts;
			this.getpost();
		} else {
			for (var i=0; i < this.posts.length; i++){
				this.post = this.posts[i];
				this.getpost();
			}
		}
	}

	this.getpost=function(){
		this.r.open('GET', 'http://www.neogaf.com/forum/showpost.php?p='+this.post, false);
		this.r.send(null);
		this.output();
	}
	
	this.clean=function(){
		this.userpost = this.userpost.substring(0,this.userpost.lastIndexOf('</div>'));
		for (var i=0; i < this.replaces.length; i++){
			re = new RegExp(this.replaces[i], 'ig');
			this.userpost = this.userpost.replace(re, this.by[i]);
		}
		return this.userpost;
	}
	
	this.output=function(){
		if (this.r.status == 200){
			this.userpost = this.r.responseText.match(/<div id\="post_message_\d*?" class\="post">([^]+?)<\!-- \/ message -->/im)[1];
			this.username = this.r.responseText.match(/<a class\="bigusername" href\="member\.php\?u\=\d*?">(?:<span [^]+?">)?(.*?)(?:<\/span>)?<\/a>/i)[1];
			this.quote = "[quote="+this.username+"]"+this.clean()+"[/quote]\n";
			if(this.textarea.value != ""){
				this.textarea.value += "\n\n" + this.quote;
			} else {
				this.textarea.value = this.quote;
			}
		} else if (this.r.status == 500){
			alert('NeoGAF: 500 Error');
		}
	}
}

var init = new multiquote();
init.quoter();
init.getquery();