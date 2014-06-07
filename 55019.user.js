// ==UserScript==
// @name           ACF_tube
// @author         _Elwood_
// @include        http://boards.ign.com/*
// @include	       http://vnboards.ign.com/*
// ==/UserScript==


var links = document.getElementsByClassName("BoardRowBLink");

for (var i=0; i < links.length; i++) {
    	var item = links[i];
    	var url = item.getAttribute("href") + "";
	var url2 = url;
    	//GM_log("("+i+"):"+url);
    
    	var parts = url.split("?"); 
    	if (parts.length>0){ url = parts[0];   }    

	if ( url.indexOf("youtube.com/watch") >= 0 && item.parentNode.nodeName != "DIV") {
       		//GM_log("isYoutube:"+url);
  	   	var code = url2//var code = item.innerHTML;
      		code = code.replace("http://www.youtube.com/watch?v=","");
     		code = code.replace("http://youtube.com/watch?v=","");
      		code = code.replace("\"","");
      		code = code.replace("'","");
      		code = code.replace("(","");
      		code = code.replace("]","");
		//GM_log("YOUTUBE CODE IS:"+code);
      		var html = "<object width='425' height='344'><param name='movie' value='http://www.youtube.com/v/"+code+"&hl=es&fs=1&'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><embed src='http://www.youtube.com/v/"+code+"&hl=es&fs=1&' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='425' height='344'></embed></object>";

       		item.innerHTML = html;

    	} 
}