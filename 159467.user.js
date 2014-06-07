// ==UserScript==
// @name           Bookmarkleter
// @description    Creates bookmarklet link on userscripts.org pages 
// @version        0.1a
// @namespace      http://userscripts.org/users/piotryx
// @include        http://userscripts.org/scripts/show/*
// @include        https://userscripts.org/scripts/show/*
// @require        http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==

var userjs_url = document.getElementById("install_script").getElementsByClassName("userjs")[0].href;
jQuery.get(userjs_url, function(userjs_text) {
	var GM_block_start;
	var GM_block_end;
	var GM_block;
	var GM_requires;
	var bookmarklet_link;
	
	GM_block_start = userjs_text.search(/\/\/ \=\=UserScript\=\=/);
	GM_block_end   = userjs_text.search(/\/\/ \=\=\/UserScript\=\=/);
	GM_block = userjs_text.substring(GM_block_start, GM_block_end);
	
	var re = /[\n\r]+\/\/ @require[ \t]+([^ \n\r\t]+)[\n\r]+/g; 
	GM_requires = GM_block.match(re);
	if(GM_requires)
		for(i=0 ; i < GM_requires.length ; i++)
			GM_requires[i] = re.exec(GM_requires)[1];
	
	
	bookmarklet_url="javascript:(function(){";	
	bookmarklet_url+="for(var i=-1;i<window.frames.length;i++){"; //-1 - main document, 0.. - frames
		bookmarklet_url+="try{";
			bookmarklet_url+="if(i==-1) doc_frame=document;";
			bookmarklet_url+="else doc_frame=window.frames[i].document;"; // access to document denied when frame is other domain
			if(GM_requires)
				for(var i = 0 ; i < GM_requires.length ; i++)
				{
					bookmarklet_url+="UserScript=doc_frame.createElement('script');";
					bookmarklet_url+="UserScript.src=\""+GM_requires[i]+"\";";
					bookmarklet_url+="doc_frame.body.appendChild(UserScript);"; 
				}
			bookmarklet_url+="UserScript=doc_frame.createElement('script');";
			bookmarklet_url+="UserScript.src=\""+userjs_url+"\";";
			bookmarklet_url+="doc_frame.body.appendChild(UserScript);"; 
		bookmarklet_url+="}";
		bookmarklet_url+="catch(ex){;}";
	bookmarklet_url+="}";
	bookmarklet_url+="})();";
	
	
	
	userjs_title = document.getElementById("details").getElementsByClassName("title")[0];
	
	bookmarklet_link = document.createElement("a");
	bookmarklet_link.href = bookmarklet_url;
	bookmarklet_link.textContent = userjs_title.textContent;
	userjs_title.textContent = "";
	userjs_title.appendChild(bookmarklet_link);
	
});
