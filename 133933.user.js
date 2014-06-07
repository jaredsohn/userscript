// ==UserScript==
// @id          whatcd-mark-op
// @name        What.CD : Mark The OP
// @namespace   hateradio)))
// @description Marks the thread's [OP]
// @include     http*://*what.cd/forums.php*viewthread*
// @version     1.1.1
// @created     17 June 2012
// @grant       none
// ==/UserScript==

(function(){
	var mark = {
		id : 0,
		doc : document,
		findOP: function(){
			var a = document.querySelector('.breadcrumbs ~ .linkbox a:first-child'), xhr = new XMLHttpRequest();
			if(a && a.textContent === '<< First'){
				xhr.open('get', a.href, true);
				xhr.onload = this.xhr;
				xhr.send(null);
			}else{
				this.proc();
			}
		},
		xhr: function(){
			var d = document.implementation.createHTMLDocument('');
			d.documentElement.innerHTML = this.responseText;
			mark.doc = d;
			mark.proc();
		},
		proc : function(){
			this.grabID();
			if(this.id > 0){
				this.grabPosts();
				this.modPosts();
			}
		},
		grabID : function(){
			var u = this.doc.querySelector('table.forum_post a[href*="user.php"]');
			if(/(?:id=(\d+))/.test(u)){
				this.id = RegExp.lastParen;
			}
		},
		grabPosts : function(){
			this.posts = document.querySelectorAll('.forum_post a[href="user.php?id='+this.id+'"]');
		},
		modPosts : function(){
			var i = this.posts.length, a;
			while(i--){
				a = this.posts[i];
				a.parentNode.insertBefore(document.createTextNode('[OP] '), a);
			}
		}
	};
	mark.findOP();
}());