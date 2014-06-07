// ==UserScript==
// @name           Fanfou Search Results on Google
// @namespace      Damon
// @description    Shows results from Fanfou on Google search pages, copied from http://userscripts.org/scripts/show/43451
// @include        http://www.google.*/search?*q=*
// @include        http://www.google.*/*
// @exclude        http://www.google.*/cse?*
// @date           2009-03-05
// @version        1.0
// @GM_version     0.8.20080609.0
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
				url:"http://api.fanfou.com/search/public_timeline.json?q="+GM_TUR.un,
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
		if( r && r.length > 0 )
		{
			var results = document.getElementById("res");
			var ds = document.createElement("ol");
			results.insertBefore(ds, results.firstChild);
					  
			var il, h;
			var query = decodeURI(GM_TUR.un).replace(/\+/g, ' ');
			h = ds.appendChild(document.createElement("li"));
			h.className = "g";
			var h3 = h.appendChild(document.createElement("h3"));
			h3.className = "r";
			h3.innerHTML = "<a href='http://fanfou.com/q/"+ GM_TUR.un +"'>在饭否中搜索 <em>"+ query +"</em></a>";
			var t = h.appendChild(document.createElement("table"));
			t.className = "ts";
			var tb = t.appendChild(document.createElement("tbody"));
			var row = tb.appendChild(document.createElement("tr"));
			row.innerHTML = '<td style="padding-top: 5px; padding-right: 10px; font-size: 78%; line-height: normal; width: 43px; text-align: center;" valign="top"><img src="data:image/png;base64,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" alt="" height="42" width="43"></td><td style="padding-top: 3px;" valign="top">';

			
			for( var i=0; i < 5; i++ )
			{
				il = "<div class='s'>"+
				"<a href='http://fanfou.com/"+r[i].user.id+"' class='l'>"+
					r[i].user.name+"</a>: "+
					autolink(r[i].text)+' <span class="f">'+"<a href='http://fanfou.com/statuses/"+r[i].id+"'>"+GM_TUR.tt(new Date(r[i].created_at))+"</a>"+'</span></div>';
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

