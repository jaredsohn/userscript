// ==UserScript==
// @name           Twitter Search Results on Bing
// @author         Billy DiStefano
// @include        http://www.bing.*/search?*q=*
// @include        http://www.bing.*/*
// ==/UserScript==

GM_TUR = {
	un : "",
	lang : "en",
	init : function()
	{
		var href = document.location.href;
		GM_TUR.un = href.match(/[&?]q=([^&]*)(?:&|$)/)[1];
		GM_TUR.lang = (href.match(/[&?]hl=([^&]*)(?:&|$)/)) ? href.match(/[&?]hl=([^&]*)(?:&|$)/)[1] : 'en';

		if( GM_TUR.un != "" )
		{
			GM_xmlhttpRequest({
				method:"GET",
				url:"http://search.twitter.com/search.json?q="+GM_TUR.un+"&lang="+GM_TUR.lang,
				headers:{
					"User-Agent":"Mozilla/5.0",
					"Accept":"text/json"
				},
				onload:GM_TUR.handle
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
			var h;
			var query = unescape(GM_TUR.un).replace(/\+/g, ' ');
			h = ds.appendChild(document.createElement("div"));
			h.className = "g";
			var h3 = h.appendChild(document.createElement("h3"));
			h3.className = "r";
			h3.innerHTML = "<a href='http://search.twitter.com/search?q="+ GM_TUR.un +"'>Twitter results for <b>"+ query +"</b></a>";
			var t = h.appendChild(document.createElement("table"));
			t.className = "ts";
			var tb = t.appendChild(document.createElement("tbody"));
			var row = tb.appendChild(document.createElement("tr"));
			row.innerHTML = '<td style="padding-top: 3px;" valign="top">';

			
			for( var i=0; i < 5; i++ )
			{
				il = "<div class='sb_tlst'>"+
				"<a href='http://twitter.com/"+r.results[i].from_user+"'><b>"+
					r.results[i].from_user+"</b></a>: "+
					autolink(r.results[i].text)+' <span class="f">'+GM_TUR.tt(new Date(r.results[i].created_at))+'</span></div>';
				row.innerHTML += il;
			}
			row.innerHTML += '</td><br />';
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
