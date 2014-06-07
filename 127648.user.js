// ==UserScript==
// @name           What.CD : Block User Posts
// @version        1.0
// @description    Hide posts from users.
// @namespace      hateradio)))
// @include        http*://*what.cd/forums.php?*
// ==/UserScript==

(function(){
	var disappear = {
		r:['UserName111', 'username22'], // Add names here. Case is important.
		u:document.querySelectorAll('.forum_post strong a[href^="user.php?id="]'),
		p:document.querySelectorAll('.forum_post'),
		d:function(){
			var i = this.u.length, u;
			while(i--){
				u = this.u[i];
				if(this.r.indexOf(u.innerHTML) !== -1){
					this.p[i].style.display = 'none';
				}
			}
		}
	};
	disappear.d();
}());