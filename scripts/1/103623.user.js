// ==UserScript==
// @name           Kraland - Forum - Filter
// @namespace      none
// @include        http://www.kraland.org/main.php*
// ==/UserScript==
Message = {
	auteur : function(pseudo){
		return posts[i].getElementsByTagName('p')[0].innerHTML.indexOf('p1=' + pseudo + '"') != -1;
	},
	filtrage: function(){
		tab_like    = this.list_like.split(',');
		tab_warning = this.list_warning.split(',');
		tab_hide    = this.list_hide.split(',');
		if(posts = document.getElementsByClassName("post_container")){
// We assume here that an id appears only in one category
			for ( i = 0 ; i < posts.length ; i++) {
		                flag = true;
				for(j=0;j<tab_hide.length;j++){
					if (this.auteur(tab_hide[j])){
						this.hide(posts[i]);
						flag = false;
					}
				}
				for (j=0; j<tab_warning.length && flag; j++){
					if (this.auteur(tab_warning[j])){
						this.warning(posts[i]);
						flag = false;
					}
				}
				for (j=0; j < tab_like.length && flag; j++){
					if (this.auteur(tab_like[j])){
						this.like(posts[i]);
					}
				}
			}
		}
	},
	like: function(item){
		item.style.backgroundColor='#87E990';
	},
	hide: function(item){
		item.style.display='none';
	},
	warning: function(item){
		item.style.backgroundColor='#FF5E4D';
	}
}
Message.list_like = '23388,7160';
Message.list_warning = '68444';
Message.list_hide = '30817';
Message.filtrage();
