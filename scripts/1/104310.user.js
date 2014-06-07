// coding: utf-8
// ==UserScript==
// @name		DantesJs2 v.1.0_dante
// @namespace	Dante
// @version	204
// @author		Dante Mod by J2S
// ==/UserScript==
function showrecentpostswiththumbs(json) {
	document.write('<ul class="recent_posts_with_thumbs">'); 
	for (var i = 0; i < numposts; i++) {
		var entry = json.feed.entry[i];
		var posttitle = entry.title.$t;
		var posturl;if (i == json.feed.entry.length) break;
		for (var k = 0; k < entry.link.length;k++){
			if(entry.link[k].rel=='replies'&&entry.link[k].type=='text/html'){
				var commenttext=entry.link[k].title;
				var commenturl=entry.link[k].href;
			}			
			if (entry.link[k].rel == 'alternate') {
				posturl = entry.link[k].href;break;
			}
		}
		if("content"in entry){
			var postcontent=entry.content.$t;
		}
		var vidid = postcontent.substring(postcontent.indexOf("http://www.youtube.com/watch?v=")+31,postcontent.indexOf("endofvid"));
		
		
		try {thumburl='http://i2.ytimg.com/vi/'+vidid+'/default.jpg';}catch (error){
			thumburl='http://1.bp.blogspot.com/_u4gySN2ZgqE/SmWGbEU9sgI/AAAAAAAAAhc/1C_WxeHhfoA/s800/noimagethumb.png';
		}
		var postdate = entry.published.$t;
		var cdyear = postdate.substring(0,4);
		var cdmonth = postdate.substring(5,7);
		var cdday = postdate.substring(8,10);
		var monthnames = new Array();
		monthnames[1] = "Jan";monthnames[2] = "Feb";monthnames[3] = "Mar";monthnames[4] = "Apr";monthnames[5] = "May";monthnames[6] = "Jun";monthnames[7] = "Jul";monthnames[8] = "Aug";monthnames[9] = "Sep";monthnames[10] = "Oct";monthnames[11] = "Nov";monthnames[12] = "Dec";
		document.write('<li class="clearfix">');


		if(showpostthumbnails==true) 
		document.write('<a href="'+ posturl + '"><img class="recent_thumb" src="'+thumburl+'"/></a>');
		document.write('<div class="recent_video_title"><a href="'+posturl+'" target ="_top">'+posttitle+'</a></div><br>');
		var textinside = postcontent.substring(postcontent.indexOf("[starttext]")+11,postcontent.indexOf("[endtext]"));
		var re = /<\S[^>]*>/g; 
		postcontent = textinside.replace(re, "");
		
		
		if (showpostsummary == true) {
		
		      if (postcontent.length < numchars) {
		          document.write('<div class="recent_video_desc">');
		         document.write(postcontent);
		          document.write('</div>');}
		      else {
		          document.write('<div class="recent_video_desc">');
		         postcontent = postcontent.substring(0, numchars);
		         var quoteEnd = postcontent.lastIndexOf(" ");
		         postcontent = postcontent.substring(0,quoteEnd);
		         document.write(postcontent + '...');
		          document.write('</div>');}
		}
		
		var towrite='';var flag=0;
		document.write('<br><div class="recent_video_footer">');
		
		if(showpostdate==true) {towrite=towrite+monthnames[parseInt(cdmonth,10)]+' '+cdday+' , '+cdyear;flag=1;}
		
		if(showcommentnum==true) 
		{
		if (flag==1) {towrite=towrite+' | ';}
		if(commenttext=='1 Comments') commenttext='1 Comment';
		if(commenttext=='0 Comments') commenttext='No Comments';
		commenttext = '<a href="'+commenturl+'" target ="_top">'+commenttext+'</a>';
		towrite=towrite+commenttext;
		flag=1;
		;
		}
		
			
		
		
		
		document.write(towrite);
		
		document.write('</div></li>');
		if(displayseparator==true) 
		if (i!=(numposts-1))
		document.write('<hr size=0.5>');

		}document.write('</ul>');



}