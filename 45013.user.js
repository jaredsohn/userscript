// Greasemonkey script for result-page on finn.no
// Displays twitter search result based on your search keyword on site
// Inspired by a script written by Mark Carey, http://userscripts.org/scripts/show/43451
// Erlend Schei and Eyvind A. Larre, 2009, http://labs.finn.no
// Licensed under a Creative Commons License, http://creativecommons.org/licenses/by-nc-sa/1.0/

// ==UserScript==
// @name           Twitter Search Results on FINN.no
// @namespace      http://labs.finn.no
// @description    Shows results from Twitter on FINN.no search pages
// @include        http://www.finn.no/finn/*/result*
// @date           2009-03-22
// @version        1.0
// ==/UserScript==


GM_FTWEET = {
	keyword : "",
	init : function()
	{
	        var myInputTags = document.getElementsByTagName("input");
	        
	        for (var i in myInputTags) {
	        	if (myInputTags[i].name == "keyword") {
	                  	GM_FTWEET.keyword = myInputTags[i].value;
	                  	break;
	        	}	        		        	
	        }
	       
		if( GM_FTWEET.keyword != "" )
		{
			GM_xmlhttpRequest({
				method:"GET",
				url:"http://search.twitter.com/search.json?q="+GM_FTWEET.keyword,
				headers:{
					"User-Agent":"Mozilla/5.0",
					"Accept":"text/json"
				},
				onload:GM_FTWEET.handle
			});
		}
			
	},
	
	
	
	
	

handle : function(response)
   {
       var r = eval("("+response.responseText+")");

       if( r.results && r.results.length > 0 )
       {
           var results = document.getElementById("results");
           var ds = document.createElement("div");
           results.insertBefore(ds, results.firstChild);
           var query = unescape(GM_FTWEET.keyword).replace(/\+/g, ' ');
           var h3 = ds.appendChild(document.createElement("h3"));
           h3.innerHTML = "<a href='http://search.twitter.com/search?q="+ GM_FTWEET.keyword +"'>Twitter results for <em>"+ query +"</em></a>";
           var resultset = ds.appendChild(document.createElement("ol"));
           for( var i=0; i < 5; i++ ) {
               resultset.innerHTML +=
                   "<li><a href='http://twitter.com/"+r.results[i].from_user+"'>"+
                   r.results[i].from_user+"</a> <em>"+GM_FTWEET.tt(new Date(r.results[i].created_at))+"</em>:<br />"+
                   autolink(r.results[i].text)+"</li>";
           }
       }
   },
   
   
	tt : function(dt)
	{
		var nw = new Date(), df = nw - dt, dm = Math.floor(df/60000), dh = Math.floor(dm/60), at = new Date(dt);
		if( dm <= 0 )	{ return "a few seconds ago"; }
		if( dm < 60 )	{ return (dm == 1)?"1 minute ago":dm+" minutes ago"; }
		if( dh <= 1 )	{ return "about 1 hour ago"; }
		if( dh < 24 )	{ return "about " + dh + " hours ago"; }
		if( (nw.getDate() - dt.getDate()) == 1 )	{ return "yesterday"; }
		at.setDate(at.getDate() + 1);
		nw.setDate(nw.getDate() + 1);
		if( (nw.getDate() - at.getDate()) == 1 )	{ return "yesterday"; }
		var minutes = dt.getMinutes();
		if( minutes < 10 ) minutes = "0"+minutes;
		if( dt.getHours() == 0 ) nw = "12:"+minutes+" AM ";
		else if( dt.getHours() < 12 ) nw = dt.getHours()+":"+minutes+" AM ";
		else nw = (dt.getHours()-12)+":"+minutes+" PM ";
		return nw + ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][dt.getMonth()] + " " + dt.getDate();
	}

};

GM_FTWEET.init();

function autolink(s) 
{   
   var hlink = /\s(ht|f)tp:\/\/([^ \,\;\:\!\)\(\"\'\<\>\f\n\r\t\v])+/g;
   return (s.replace (hlink, function ($0,$1,$2) { s = $0.substring(1,$0.length); 
                                                   // remove trailing dots, if any
                                                   while (s.length>0 && s.charAt(s.length-1)=='.') 
                                                      s=s.substring(0,s.length-1);
                                                   // add hlink
                                                   return " " + s.link(s); 
                                                 }
                     ) 
           );
}





