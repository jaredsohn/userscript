// ==UserScript==
// @name           Top 10 Twitter Search Results with Google search
// @namespace      tweetfeeds
// @description    Shows 10 results from Twitter on Google search pages
// @include        http://www.google.*/search?*q=*
// @include        http://www.google.*/*
// @date           2009-03-04
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
			var results = document.getElementById("res");
			var ds = document.createElement("ol");
			results.insertBefore(ds, results.firstChild);
					  
			var il, h;
			var query = unescape(GM_TUR.un).replace(/\+/g, ' ');
			h = ds.appendChild(document.createElement("li"));
			h.className = "g";
			var h3 = h.appendChild(document.createElement("h3"));
			h3.className = "r";
			h3.innerHTML = "<a href='http://search.twitter.com/search?q="+ GM_TUR.un +"'>Twitter results for <em>"+ query +"</em></a>";
			var t = h.appendChild(document.createElement("table"));
			t.className = "ts";
			var tb = t.appendChild(document.createElement("tbody"));
			var row = tb.appendChild(document.createElement("tr"));
			row.innerHTML = '<td style="padding-top: 5px; padding-right: 10px; font-size: 78%; line-height: normal; width: 43px; text-align: center;" valign="top"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAqCAIAAAClYzUyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+NJREFUeNrEWE2IFEcU/qZrup3enp1slnFwHCVZNWBgFYOK5BBvIbcENQSCBC+5evGci5d48JYguQSCkGsOogcPgZyMCCohBCUkMeIqu/6QnZ2dmZ7umled1zW6rtNtb9ea3hSPhu4Z6n313ldfvVelKIrwv45SKgIf+DPEEuE1gRmBqthABATcDHGhjX9CsF8JTDv4aBKH3A1BwO6v+/j2MeoWtlfgAF3g/gCLEic243C1eATs7/Q8LUtMWzEaBVj6+7KK0ZxpCbeAdFirX37x8WiACWCgIBVIP9lsBgHc8AuJQXl1CjqESC99jJz8hQjzsmAEsSe97hGIMQQq8bEYBKCQSFlPva7kicMjg9GbKBYBu5ISHYAZt0KQkBlKkIXpQXnsnRPRlwgUNlko6UiECkMqUJHGYzBEvPFCig0vJuLnNj0eIMgxabyNiWZr4oOaMOWBpn2CcjEsK34uSLLyrYwTd22OfpygUy3RdEReBLzQiECJ//OHuo0aEOROB0vI1gr+6OL0HM7tzCJwORnAKG26vkI3MJRboGLhQZ++e4TPGyKvHsSSkFBNW0CRsR5YevYS4W7PhAdESRpACbEOPaKnEaUgU0jWzoLSTCynZWfNLDCIoeLzTJjshUQW2PEA8Oz1ZKErOX10YEIYKFKUlu+eYrEWDMJIldsyZHF7v+l+WDeIASlFqWvtE/F0JeTajqN8vT6BT99wTzSEsSKptBnZ3qs7R7cIrt7ycLDqYJ8nckhiIgscAZWmsjy2T+JgreCzUW96lY4gPp8KKZnHVVkxe+00BIUdj+M8iFQcidQYbAQC6xnpUum9LKnwGmmTYCZSkgiRjs1fS6EuHgqr1nl1W+xYP0fn02qLdPn6+6K82aUCEfDY44mqI+TIZcI4BF/86t8P/2MEL/RMXJmdvOX/NDdI7Y0ifURNOeLYm5V9U3Ah1MurNG52Zz3hCEMEHOLz8+GZG52KnaV3Q4ky17EiS5X5x9ak89lM5XjTMeuduW06cqVzrx065VzinzHCYQz06C7vy91uXh7w8ASOv1VRzwqFDFtz8BqYUhfvDH6YJwMEHL1PGs6727x+T6vTqxnP7od0+aFvgACaRGffdnfUnV7wqiDi8564+VdmCHg0XXxz0GtNiZ6fvjNzmtLNeCm/Hqweu6vi+0O1vS3HD+KuLcJ6jLSDnVXL+Cbr+ZUW4au7/vnby50ebMsStoHUxD1ngF0NcelwrfryYrWU5zbvbx9f3+leXZAL7ZViXq3dOsKabYpz+2szmZc/pfz3iXwmXFkMf1vCE0kdSZQpFZ6Fd6bdjxvILtXNEBQ0/hVgANbdbXZbeZWHAAAAAElFTkSuQmCC" alt="" height="42" width="43"></td><td style="padding-top: 3px;" valign="top">';

			
			for( var i=0; i < 10; i++ )
			{
				il = "<div class='s'>"+
				"<a href='http://twitter.com/"+r.results[i].from_user+"' class='l'>"+
					r.results[i].from_user+"</a>: "+
					autolink(r.results[i].text)+' <span class="f">'+GM_TUR.tt(new Date(r.results[i].created_at))+'</span></div>';
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

