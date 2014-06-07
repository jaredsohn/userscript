// coding: utf-8
// ==UserScript==
// @name		DantesJs2
// @namespace	Dante
// @version	204
// @author		Dante Mod by J2S
// ==/UserScript==
function showgalleryvideo(json) {
	var showpostthumbnails_vid = true;
	var showpostsummary_vid = true;

	document.write('<ul>'); 
	for (var i = 0; i < numposts_vid; i++) {
		var entry_vid = json.feed.entry[i];
		var posttitle_vid = entry_vid.title.$t;
		var posturl_vid;if (i == json.feed.entry.length) break;
		for (var k = 0; k < entry_vid.link.length;k++){
			if (entry_vid.link[k].rel == 'alternate') {
				posturl_vid = entry_vid.link[k].href;break;
			}
		}
		if("content"in entry_vid){
			var postcontent_vid=entry_vid.content.$t;
		}
		var vidid_vid = postcontent_vid.substring(postcontent_vid.indexOf("http://www.youtube.com/watch?v=")+31,postcontent_vid.indexOf("endofvid"));
		
		
		try {thumburl_vid='http://i2.ytimg.com/vi/'+vidid_vid+'/0.jpg';}catch (error){
			thumburl_vid='http://1.bp.blogspot.com/_u4gySN2ZgqE/SmWGbEU9sgI/AAAAAAAAAhc/1C_WxeHhfoA/s800/noimagethumb.png';
		}
		document.write('<li><div id="slide-container"><span class="slide-desc"><h2 style="margin:10px 0px;">');
		document.write(posttitle_vid+'</h2>');
		
		var textinside_vid = postcontent_vid.substring(postcontent_vid.indexOf("[starttext]")+11,postcontent_vid.indexOf("[endtext]"));
		var re = /<\S[^>]*>/g; 
		postcontent_vid = textinside_vid.replace(re, "");
		
		
		if (showpostsummary_vid == true) {
		
		      if (postcontent_vid.length < numchars_vid) {		          
		         document.write(postcontent_vid);
		          document.write('</span>');}
		      else {
		          
		         postcontent_vid = postcontent_vid.substring(0, numchars_vid);
		         var quoteEnd_vid = postcontent_vid.lastIndexOf(" ");
		         postcontent_vid = postcontent_vid.substring(0,quoteEnd_vid);
		         document.write(postcontent_vid + '...');
		          document.write('</span>');}
		}
		 
		document.write('<a href="'+ posturl_vid + '"><img src="'+thumburl_vid+'"/></a></div>');		
		
		
		document.write('</li>');

		}document.write('</ul>');



}