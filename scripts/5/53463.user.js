// ==UserScript==
// @name           EzineArticles Search Results on Google
// @namespace      EzineArticles
// @description    Shows results from EzineArticles on Google search pages
// @include        http://www.google.*/search?*q=*
// @include        http://www.google.*/*
// @date           2009-07-01
// @version        1.0
// @GM_version     0.8.20080609.0
// ==/UserScript==



GM_TUR = {
	un : "",
	lang : "en",
	k : "1n38MfLTopLMP3CMuwtfFciWvgqKuy1",
	init : function()
	{
		var href = document.location.href;
        GM_TUR.un = href.match(/(#&?)q=([^&]*)(?:&|$)/)[1];

        if( GM_TUR.un != "" )
		{
			GM_xmlhttpRequest({
				method:"GET",
				url:"http://api.ezinearticles.com/api.php?search=articles&q="+GM_TUR.un+"&response_format=json&key="+GM_TUR.k+"&limit="+5,
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


		if( r.articles && r.articles.length > 0 )
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
			h3.innerHTML = "<a href='http://ezinearticles.com/search?q="+ GM_TUR.un +"'>EzineArticles results for <em>"+ query +"</em></a>";
			var t = h.appendChild(document.createElement("table"));
			t.className = "ts";
			var tb = t.appendChild(document.createElement("tbody"));
			var row = tb.appendChild(document.createElement("tr"));
			row.innerHTML = '<td style="padding-top: 5px; padding-right: 10px; font-size: 78%; line-height: normal; width: 102px; text-align: center;" valign="top"><img src="data:image/jpg;base64,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" alt="" height="50" width="102"></td><td style="padding-top: 3px;" valign="top">';


			for( var i=0; i < 5; i++ )
			{

                if(!r.articles[i]) continue;

			    if(r.articles[i].article.title == null || r.articles[i].article.summary == null) continue;

                var title = autoBold(r.articles[i].article.title,query);

	  		    var summary = autoBold(trim(r.articles[i].article.summary),query);

				il = "<div class='s'><a href='"+r.articles[i].article.url+"' class='r'>"+ title +"</a><br />"+ summary +"</div>";
				row.innerHTML += il;

			}

			row.innerHTML += '</td>';
		}
	},



};

GM_TUR.init();


function autoBold(s,r)
{

    var replace = ucwords(r);
    var q = s.replace(new RegExp(r, 'ig'), '<em>' + replace + '</em>');

    return q;
}

function trim(s){

    var sArray = s.split(" ");
    if(sArray.length > 21)
    {
        sArray = sArray.slice(0, 21);
        s = sArray.join(" ") + "...";
    }



    return s;
}


function ucwords(s){

    return s.toLowerCase().replace(/\w+/g, function(str){return str.charAt(0).toUpperCase() + str.substr(1);} );

}
