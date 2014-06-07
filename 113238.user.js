// ==UserScript==
// @name           Kraland - Forum - Schtroumpfozor
// @namespace      none
// @include        http://www.kraland.org/main.php*
// ==/UserScript==
Message = {
	check : function(item){
		return item.innerHTML.indexOf('chtroumpf') != -1;
	},
	filtrage: function(){
		if(posts = document.getElementsByClassName("post_container")){
			for ( i = 0 ; i < posts.length ; i++) {
				if (this.check(posts[i].getElementsByClassName("post_central")[0])) {
					this.change(posts[i]);
				} 
			}
		}
	},
	change: function(item){
		item.getElementsByTagName('p')[2].getElementsByTagName('img')[0].src='http://static.programme-tv.com/images/programmes/2010-04-30/mini/2764432/Les-Schtroumpfs.jpg';	}
}

Message.filtrage();
