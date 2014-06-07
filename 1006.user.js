// Del.icio.us copy with tags 
// version 0.1
// 2005-05-02
// Copyright (c) 2005, Martin Sarsale - martin@malditainternet.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// ==UserScript==
// @name          Del.icio.us copy with tags 
// @namespace     http://www.n3rds.com.ar/greasemonkey
// @include       http://del.icio.us/*
// @exclude       
// @description	 Show a "copy with tags" 
// ==/UserScript==


(function(){

	if ( document.location.href.substr(0,22) == "http://del.icio.us/url"){
		is_url_page=true;
		postsX=document.evaluate("//div[@class='delMain']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).childNodes
			posts=new Array();
		for(i=0; i<postsX.length - 4 ; i++){
			if (postsX[i].nodeType == document.ELEMENT_NODE){
				posts[posts.length]=postsX[i];
			}
		}
	}else{
		is_url_page=false;
		postsX=document.evaluate("//div[@class='post']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
			posts=new Array();
		for(i=0; i<postsX.snapshotLength ; i++){
			posts[posts.length]=postsX.snapshotItem(i);
		}
	}
	for (i=0; i<posts.length; i++){
		post=posts[i];
		info=post.getElementsByTagName('div');
		info=info[info.length-1];
		if (info){
			tags=info.getElementsByTagName('a');
			if (tags.length){
				tags_url='';
				tags_list='';
				if (!is_url_page){
					if ( tags.length >= 2 && tags[tags.length-2].href.substr(0,22) != "http://del.icio.us/url"){ // the first user that has bookmarked this url
						del_tags=1;
					}else{
						del_tags=2;
					}
				}else{
					del_tags=3;
				}

				for (tagn=0; tagn<tags.length - del_tags; tagn++){
					tag=tags[tagn]	
						if (tags_url != ''){
							tags_url=tags_url+'+';
							tags_list=tags_list+' ';
						}
					tags_url=tags_url+tag.innerHTML;
					tags_list=tags_list+tag.innerHTML;
				}
				copy_with_tags=tags[tags.length-1]+'&tags='+tags_url;
				copy_with_tags_a=document.createElement("a");
				copy_with_tags_a.href=copy_with_tags;
				copy_with_tags_a.className='delNav';
				copy_with_tags_a.appendChild(document.createTextNode('Copy with tags'));
				info.appendChild(copy_with_tags_a);
			}
		}
	}
})();
