// ==UserScript==
// @name          Technorati Multiple Word Tags for Blogger
// @description	  Changes the Edit Post Blogger form to include a tags field.
// @namespace     http://www.mamata.com.br/greasemonkey
// @include       http://blogger.com/*
// @include       http://www.blogger.com/*

//by Fabricio Zuardi (http://idomyownstunts.blogspot.com)
// Modified by Bryan Price (http://www.bytehead.org/) to make it conducive to being XHTML compliant
// Modified again by KRS (no homepage) to get multiple word tag support-tags separated by commas
// Ugh - Tweaked to work with Greasemonkey 0.6.4 and Firefox 1.5 (until something else breaks)  and added constant me-tags and user defined separators (Magical Sheep version) -KRS
// ==/UserScript==

(function() {
	var separator = ', ';
	if (GM_getValue( 'tag-separator')) {
            separator = GM_getValue( 'tag-separator');
		}
	var post_options = document.getElementById("postoptions");
	var tags_field = document.createElement("div");
	var tags_field_html = "";
	var theSplit=/\W?,\W?/g;
	tags_field_html += "<div style='background-color:rgb(245, 237, 227); width:710px; padding-top:5px; padding-bottom:5px'>Tags: <input type='text' name='tags' id='f-tags' class='text' size='48' /><input id='t-submit' value='Append tags' type='button' /> <input id='set-Constant' value='Set Me Tags' type='button' /> <br /><input id='set-Separator' style='margin-left:545px;' value='Set Separator' type='button' /></div>";
        tags_field.innerHTML = tags_field_html;
	post_options.parentNode.insertBefore(tags_field,post_options);
        var setTsubmit = document.getElementById('t-submit');
        setTsubmit.addEventListener('click', appendTags, true);
        var setMe = document.getElementById('set-Constant');
        setMe.addEventListener('click', meTags, true);
        var setSep = document.getElementById('set-Separator');
        setSep.addEventListener('click', seParator, true);


        function seParator() {
                 separator = prompt(' Set the displayed separator for tags-default is the comma. Do not hit cancel, click OK to keep current setting!',separator);
 
		 GM_setValue( 'tag-separator', separator );
                 }

        function meTags() {
                 var setMeTags = '';
                 if (GM_getValue( 'me-tags')){
                        setMeTags +=GM_getValue( 'me-tags');
			}
                 var constantTags = prompt( 'Tags on all blog posts (separate tags by comma):', setMeTags);
                 GM_setValue( 'me-tags', constantTags );
                 alert( 'These Tags will be added automatically with the Append Tags button: '+constantTags );
                  }

	function appendTags() {
		var tags_str = document.getElementById('f-tags').value;
                if (GM_getValue( 'me-tags')) {
			if (tags_str){
				tags_str += ', '+GM_getValue( 'me-tags');
				}
			else {
			      tags_str += GM_getValue( 'me-tags');
				}
			}
		var tags_arr = tags_str.split(theSplit)
		var tags_html = '<div class="tag_list">Tags: <span class="tags">'
		for(var i=0;i<tags_arr.length;i++){
			var checkplus=tags_arr[i].indexOf(' ');
			if(i > 0){tags_html+=separator;}
			if (checkplus=='-1'){
			tags_html += '<a href="http://technorati.com/tag/'+tags_arr[i]+'" rel="tag">'+tags_arr[i]+'</a>';
                           }
			
			else {
                        	var chat='';
				var plus=tags_arr[i].split(' ');
         				for(var q=0;q<plus.length;q++){
						chat+=plus[q];
						if (q<plus.length-1){
							chat+='+';
						}
					}
			tags_html += '<a href="http://technorati.com/tag/'+chat+'" rel="tag">'+tags_arr[i]+'</a>';
			
			}
		}
		tags_html += "</span></div>"
		var text_area = document.getElementById('textarea')
		var div_index = text_area.value.indexOf("<div class='tag_list'>");
		if(div_index > 0){
			text_area.value = text_area.value.substr(0,div_index)+tags_html;
		}else{
			text_area.value += tags_html;
		}
	}
	
})();
