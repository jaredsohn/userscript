// ==UserScript==
// @name           Delicious Search Results on Google
// @namespace      gaillard
// @description    Shows results from Delicious on Google search pages
// @include        http://www.google.*/search?*q=*
// @include        http://www.google.*/*
// @date           2009-03-07
// @version        0.1
// @GM_version     0.8.20080609.0
// 
// 99% of the code for this user script comes form markcarey's userscript 'Twitter Search Results on Google' (http://userscripts.org/scripts/show/43451)
// ==/UserScript==


GM_DUR = {
	un : "",
	init : function()
	{
		var href = document.location.href;
		GM_DUR.un = href.match(/[&?]q=([^&]*)(?:&|$)/)[1];

		if( GM_DUR.un != "" )
		{
			GM_xmlhttpRequest({
				method:"GET",
				url:"http://feeds.delicious.com/v2/json/tag/"+GM_DUR.un,
				headers:{
					"User-Agent":"Mozilla/5.0",
					"Accept":"text/json"
				},
				onload:GM_DUR.handle
			});
		}
	},

	handle : function(response)
	{
		var results = eval("("+response.responseText+")");
		if( results.length > 0 )
		{
			var results_section = document.getElementById("res");
			var ds = document.createElement("ol");
			results_section.insertBefore(ds, results_section.firstChild);
					  
			var il, h;
			var query = unescape(GM_DUR.un).replace(/\+/g, ' ');
			h = ds.appendChild(document.createElement("li"));
			h.className = "g";
			var h3 = h.appendChild(document.createElement("h3"));
			h3.className = "r";
			h3.innerHTML = "<a href='http://delicious.com/search?p=" + GM_DUR.un +"'>Delicious results for <em>"+ query +"</em></a>";
			var t = h.appendChild(document.createElement("table"));
			t.className = "ts";
			var tb = t.appendChild(document.createElement("tbody"));
			var row = tb.appendChild(document.createElement("tr"));
			row.innerHTML = '<td style="padding-top: 5px; padding-right: 10px; font-size: 78%; line-height: normal; width: 43px; text-align: center;" valign="top"><img src="data:image/png;base64,AAABAAIAEBAAAAEAGABoAwAAJgAAABAQAAABACAAaAQAAI4DAAAoAAAAEAAAACAAAAABABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0tLT0tLT0tLT0tLT0tLT0tLT0tLT0tLT////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQy////////////////////////////////0HQy0HQy0HQy0HQy0HQy0HQy0HQy0HQyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP/S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9LS0/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP/S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9LS0/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP/S0tP/0tLT/9LS0//S0tP/0tLT/9LS0//S0tP/0tLT////////////////////////////////////////////0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv///////////////////////////////////////////9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL////////////////////////////////////////////QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy////////////////////////////////////////////0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv///////////////////////////////////////////9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL////////////////////////////////////////////QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy////////////////////////////////////////////0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv///////////////////////////////////////////9B0Mv/QdDL/0HQy/9B0Mv/QdDL/0HQy/9B0Mv/QdDL/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==" alt="" height="42" width="43"></td><td style="padding-top: 3px;" valign="top">';

			
			for( var i=0; i < 5; i++ )
			{
				il = "<div class='s'>"+
				"<a href='"+results[i].u+"' class='l'>"+
					results[i].d+"</a> "+
					' <span class="f">'+ results[i].t +'</span></div>';
				row.innerHTML += il;
			}
			row.innerHTML += '</td>';
		}
	},
};

GM_DUR.init();


