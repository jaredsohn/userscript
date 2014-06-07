// ==UserScript==
// @name           Les Blogs de Nofrag
// @namespace      http://blogs.nofrag.com/McChicken
// @include        http://blogs.nofrag.com/*
// ==/UserScript==

if(MC_isHome())
{
	MC_addShoutbox();
	MC_addHomeStyles();
	MC_addHomeHeaders();
}	
MC_addFavorites();

// Ajout de la tribune de Wefrag sur la home des blogs
function MC_addShoutbox()
{
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://www.wefrag.com/shouts/',
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
	        var parser = new DOMParser();
	        var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	        var shouts = dom.getElementById('body');
			// Correction des liens en ajoutant l'url de wefrag
			var regexp = new RegExp("=\"/", "gi");
			shouts.innerHTML = shouts.innerHTML.toString().replace(regexp, "=\"http://www.wefrag.com/");
			// Test de connexion a wefrag
			var loggedin_wefrag = new RegExp("class=\"msg\"");
			if(!loggedin_wefrag.test(shouts.innerHTML))
				shouts.innerHTML = "Vous devez être identifié sur <a href=\"http://www.wefrag.com\" target=\"_blank\">Wefrag</a> pour afficher la tribune ici.";
			// Ajout d'une div#rightcol contenant la tribune et la colonne "about"
			var main = document.getElementById("main");
			var about = document.getElementById("about");
			main.removeChild(about);
			main.innerHTML = "<div id=\"rightcol\"><div id=\"shoutbox\"><h4><a href=\"http://www.wefrag.com/forums\">Tribune</a></h4>" + shouts.innerHTML + "</div><div id=\"about\">" + about.innerHTML + "</div></div>" + main.innerHTML;
			// Ajout de styles correspondants
			var css = "#rightcol { float:right; width:325px; margin:0; padding:0; border:none; background:transparent; }";
			css += "#shoutbox, #about { background: #fff; border:1px solid #BBBBBB; padding:10px; margin: 0 0 10px 0; float:none; width:auto; }";
			css += "#shoutbox .title, #shoutbox h4 { margin:0 0 10px 0; }";
			css += "#shoutbox .title a, #shoutbox h4 a { color:#fff; }";
			css += "#shoutbox .title a:hover, #shoutbox h4 a:hover { color:#fff; text-decoration:none; }";
			//css += "#shoutbox input { margin:0 0 10px 0; width:280px; padding:2px 10px; }";
			css += "#fakeadbox { clear:both; }";
			MC_addStyles(css);
			document.getElementById("fakeadbox").style.display="block";
	    }
	});	
}

function MC_addFavorites()
{
	if(MC_isHome())
	{
		var latestarticles = document.getElementById("latestarticles");
		// Ajout de l'option favoris sur la table des derniers articles
		var latestarticles_table = latestarticles.getElementsByTagName("table")[0];
		var latestarticles_rows = latestarticles_table.getElementsByTagName("tr");
		latestarticles_rows[0].innerHTML = latestarticles_rows[0].innerHTML + "<th>Favoris</th>";
		for(i=1; i < latestarticles_rows.length; i++)
		{
			var username = latestarticles_rows[i].getElementsByTagName("td")[1].innerHTML;
			if(MC_isInFavorites(username))
			{
				latestarticles_rows[i].innerHTML = latestarticles_rows[i].innerHTML + "<td class=\"favoris\"><a href=\"./favorites/remove/" + username + "\">-</a></td>";	
				latestarticles_rows[i].className = latestarticles_rows[i].className + " favorites";
			}
			else
			{
				latestarticles_rows[i].innerHTML = latestarticles_rows[i].innerHTML + "<td class=\"favoris\"><a href=\"./favorites/add/" + username + "\">+</a></td>";
			}
		}	
		// Ajout de l'affichage des utilisateurs favoris dans les commentaires
		var latestcomments_table = latestarticles.getElementsByTagName("table")[1];
		var latestcomments_rows = latestcomments_table.getElementsByTagName("tr");
		for(i=1; i < latestcomments_rows.length; i++)
		{
			var username = latestcomments_rows[i].getElementsByTagName("td")[1].innerHTML;
			if(MC_isInFavorites(username))
			{
				latestcomments_rows[i].className = latestcomments_rows[i].className + " favorites";
			}
		}
		// Ajout de styles correspondants
		var css = "#latestarticles table td.favoris { text-align:center; }";
		css += "#latestarticles table tr.favorites td { background:#ddd; border-color:#ccc; }";
		MC_addStyles(css);
	}
	var path = window.location.pathname;
	if(path.indexOf("/favorites/") >= 0)
	{
		var username = path.substring(path.lastIndexOf("/")+1, path.length);
		if(path.indexOf("/favorites/add/") >= 0)
			MC_addToFavorites(username);
		else if(path.indexOf("/favorites/remove/") >= 0)
			MC_removeFromFavorites(username);
		window.location.href = window.location.href.substring(0, window.location.href.indexOf("/favorites/"));
	}
		
}

function MC_addToFavorites(username)
{
	var favorites = GM_getValue("MC_favorites");
	if(favorites)
	{
		var a = new Array(favorites);
		a.push(username);
		GM_setValue("MC_favorites", MC_unique(a).toString());
	}
	else
	{
		var a = new Array(username);
		GM_setValue("MC_favorites", a.toString());
	}
}

function MC_removeFromFavorites(username)
{
	var favorites = GM_getValue("MC_favorites");
	if(favorites)
	{
		var a = favorites.split(",");
		var b = new Array();
		for(j=0; j < a.length; j++)
			if(a[j] != username)
				b.push(a[j]);
		GM_setValue("MC_favorites", b.toString());
	}
}

function MC_isInFavorites(username)
{
	var favorites = GM_getValue("MC_favorites");
	if(favorites)
	{
		var a = favorites.split(",");
		for(j=0; j < a.length; j++)
			if(a[j] == username)
				return true;
	}
	return false;
}

function MC_addHomeStyles()
{
	// Ajout de styles persos
	var css = "#latestarticles { border:1px solid #BBBBBB; background:#fff; padding:0 10px 10px; }\n";
	css += "#latestarticles table { margin:0; width:100%; }\n";
	css += "#main { position:relative; background: #ddd; border:1px solid #BBBBBB; margin:10px; padding:10px; }\n";
	css += "#menu, #footer { background:#616161; color:#fff; }\n";
	css += "#menu a, #footer a { color:#fff; }\n";
	css += "#menu a:hover, #footer a:hover { color:#fff; }\n";
	css += "a { color:#CC3300; }\n";
	css += "h4, #shoutbox .title { background:#666; padding:2px 10px; color:#fff; font-weight:bold; font-size:1.2em; margin:10px 0;  }\n";
	// Suppression des styles inline par defaut
	document.getElementById("main").removeAttribute("style");
	var latestarticles_div = document.getElementById("latestarticles").getElementsByTagName("div");
	for(i=0; i<latestarticles_div.length; i++)
		latestarticles_div[i].removeAttribute("style");
	MC_addStyles(css);
}

function MC_addHomeHeaders()
{
	var latestarticles = document.getElementById("latestarticles");
	var latestarticles_div = latestarticles.getElementsByTagName("div");
	var latestarticles_table = latestarticles_div[0].getElementsByTagName("table")[0];
	var latestcomments_table = latestarticles_div[1].getElementsByTagName("table")[0];
	//MC_showRows(20, latestarticles_table);
	//MC_showRows(20, latestcomments_table);
	latestarticles.innerHTML = "<h4>Derniers articles</h4>" + latestarticles_div[0].innerHTML + "<h4>Derniers commentaires</h4>" + latestarticles_div[1].innerHTML;
}

function MC_showRows(n, table)
{
	var trs = table.getElementsByTagName("tr");
	if(trs.length < n) n = trs.length;
	for(i=0; i < n; i++)
		trs[i].style.display = "table-row";
	for(i=n; i < trs.length; i++)
		trs[i].style.display = "none";
}

function MC_addStyles(css)
{
	var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function MC_isHome()
{
	return (window.location.pathname == "/");
}

// http://www.netlobo.com/url_query_string_javascript.html
function MC_getURLParameter(name)
{
  	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);
	if( results == null )
		return "";
	else
		return results[1];
}

// unique(a) : Remove duplicates from Array 
// http://www.martienus.com/code/javascript-remove-duplicates-from-array.html
function MC_unique(a) {
   var r = new Array();
   o:for(var i = 0, n = a.length; i < n; i++) {
      for(var x = 0, y = r.length; x < y; x++)
         if(r[x]==a[i]) continue o;
      r[r.length] = a[i];
   }
   return r;
}