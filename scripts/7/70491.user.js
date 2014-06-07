// ==UserScript==
// @name           Buzz Search Results on Google
// @namespace      markcarey
// @description    Shows results from Buzz on Google search pages
// @include        http://www.google.*/search?*q=*
// @include        http://www.google.*/*
// @date           2010-03-04
// @version        1.0.1
// @GM_version     0.8.20080609.0
// ==/UserScript==


var GM_TUR = {
	un : "",
	lang : "en",
	init : function()
	{
console.log('starting');
		var href = document.location.href;
		GM_TUR.un = href.match(/[&?]q=([^&]*)(?:&|$)/)[1];
		GM_TUR.lang = (href.match(/[&?]hl=([^&]*)(?:&|$)/)) ? href.match(/[&?]hl=([^&]*)(?:&|$)/)[1] : 'en';

		if( GM_TUR.un != "" )
		{
		    var api_url = "http://buzzzy.com/api/search.json?q="+GM_TUR.un+"&source=Buzz&lang="+GM_TUR.lang;
		    // Send a request to fetch data from Twitter's API to the background page.
            // Specify that onText should be called with the result.
console.log('b4 typeof');
            if (typeof chrome != "undefined") {
console.log('b4 senreq');
                chrome.extension.sendRequest({'action' : 'fetchBuzzFeed', 'url' : api_url}, GM_TUR.handle);
console.log('after senreq');
            } else {
console.log('b4 GM_xml');
//		    var u = document.createElement('script');
//            u.setAttribute('type', 'text/javascript');
//            u.setAttribute('src', api_url);
//            document.getElementsByTagName('head')[0].appendChild(u);
    			GM_xmlhttpRequest({
    				method:"GET",
    				url: api_url,
    				headers:{
    					"User-Agent":"Mozilla/5.0",
    					"Accept":"text/json"
    				},
    				onload:GM_TUR.gm_handle
    			});
            }
		}
	},
	
	gm_handle : function(response)
	{
	    var r = eval("("+response.responseText+")");
	    GM_TUR.handle(r);
	},

	handle : function(r)
	{
//	    document.location.href = 'http://me.com';
//		var r = eval("("+response.responseText+")");
console.log('start handle callback');
		if( r.body && r.body.length > 0 )
		{
			var results = document.getElementById("res");
			var ds = document.createElement("ol");
			results.insertBefore(ds, results.firstChild);
					  
			var il, h;
			var query = unescape(GM_TUR.un).replace(/\+/g, ' ');
			h = ds.appendChild(document.createElement("li"));
			h.className = "g";
			var h3 = h.appendChild(document.createElement("h3"));
			h3.className = "r";
			h3.innerHTML = "<a href='http://buzzzy.com/search?q="+ GM_TUR.un +"'>Buzz results for <em>"+ query +"</em></a>";
			var t = h.appendChild(document.createElement("table"));
			t.className = "ts";
			var tb = t.appendChild(document.createElement("tbody"));
			var row = tb.appendChild(document.createElement("tr"));
			row.innerHTML = '<td style="padding-top: 5px; padding-right: 10px; font-size: 78%; line-height: normal; width: 43px; text-align: center;" valign="top"><img src="data:image/png;base64,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" alt="" height="42" width="42"></td><td style="padding-top: 3px;" valign="top">';

			
			for( var i=0; i < 5; i++ )
			{
			    var text_body = strip(r.body[i].update_body_html);
			    var last_char = 140;
			    if (text_body.length > 140) {
			        for( var j=141; j < text_body.length; j++) {
			            last_char = j;
			            var cur_char = text_body.charAt(j);
			            if (cur_char.match(/[\s\"\'\<\>]/)) break;
			        }
			    }
			    short_body = autolink(strip(r.body[i].update_body_html).substring(0,last_char));
			    more = '';
			    if ((strip(r.body[i].update_body_html).length > 140) || r.body[i].media ) more = " <a href='"+r.body[i].post_url+"'>More &raquo;</a>";
				il = "<div class='s'>"+
				"<a href='"+r.body[i].post_url+"' class='l' style='display: inline'>"+
					r.body[i].user_name+"</a>: "+
					short_body+more+' <span class="f">'+GM_TUR.tt(new Date(r.body[i].date_published_timestamp * 1000))+'</span></div>';
				row.innerHTML += il;
			}
			row.innerHTML += '</td>';
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

GM_TUR.init();

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

function autobold(s)
{
	// todo
}

function strip(html)
{
   html = html.replace(/<br \/>/g,' ');
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent||tmp.innerText;
}


