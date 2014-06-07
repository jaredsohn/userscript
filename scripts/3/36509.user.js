// ==UserScript==
// @name           Les Blogs de Nofrag v2
// @namespace      http://blogs.nofrag.com/McChicken and http://blogs.nofrag.com/jye
// @include        http://blogs.nofrag.com/*
// ==/UserScript==

<script src="http://ajax.googleapis.com/ajax/libs/mootools/1.11/mootools-yui-compressed.js" type="text/javascript"></script>

// Some useful function
function $(id) {return document.getElementById(id)};

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

if(MC_isHavingATextArea()){
	MC_addWYSIWYGEditor();
}

if(MC_isHome())
{
	MC_addShoutbox();
	MC_addHomeStyles();
	MC_addHomeHeaders();
	MC_addFavorisBox();
}	

MC_addFavorites();
MC_addWeFragLink();

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
				latestarticles_rows[i].innerHTML = latestarticles_rows[i].innerHTML + "<td class=\"favoris\"><a href=\"?type=remove&username=" + username + "\">-</a></td>";	
				latestarticles_rows[i].className = latestarticles_rows[i].className + " favorites";
			}
			else
			{
				latestarticles_rows[i].innerHTML = latestarticles_rows[i].innerHTML + "<td class=\"favoris\"><a href=\"?type=add&username=" + username + "\">+</a></td>";
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
	
	/* Useless now
	var path = window.location.pathname;
	if(path.indexOf("/favorites/") >= 0)
	{
		var username = path.substring(path.lastIndexOf("/")+1, path.length);
		if(path.indexOf("/favorites/add/") >= 0)
			MC_addToFavorites(username);
		else if(path.indexOf("/favorites/remove/") >= 0)
			MC_removeFromFavorites(username);
		window.location.href = window.location.href.substring(0, window.location.href.indexOf("/favorites/"));
	}*/
	
	/* We check if we have those two parameters, if so we're dealing with favorites. */
	type = 	MC_getURLParameter('type');
	username = 	MC_getURLParameter('username');
	
	if((type == "add" || type == "remove") && username != "") {
		if(type == "add") {
			MC_addToFavorites(username);
			window.location.href = "http://blogs.nofrag.com/";
		} else {
			if(type == "remove") {
				MC_removeFromFavorites(username);
				window.location.href = "http://blogs.nofrag.com/";
			}
		}
	}
}


// Ajout de la tribune de Wefrag sur la home des blogs
function MC_addShoutbox()
{
	var authenticity_token = GM_getValue("MC_authenticity_token");
	
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://www.wefrag.com/',
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(responseDetails) {
	        var parser = new DOMParser();
	        var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	        var inputs = dom.getElementsByTagName("input");
			for (i=0;i<inputs.length;i++) {
				if(inputs[i].name == "authenticity_token") {
					authenticity_token = inputs[i].value;
					GM_setValue("MC_authenticity_token", authenticity_token);
				}
			}
	    }
	});
	
	authenticity_token = GM_getValue("MC_authenticity_token");
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://www.wefrag.com/shouts/',
	    onload: function(responseDetails) {
	        var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	        var shouts = dom.getElementById('body');
			
			// Correction des liens en ajoutant l'url de wefrag
			var regexp = new RegExp("=\"/", "gi");
			shouts.innerHTML = shouts.innerHTML.toString().replace(regexp, "=\"http://www.wefrag.com/");
			// Ajout input tribune
			scripts = '<form id="submitwefrag" onsubmit="return false;" method="POST" action="/">';
			shouts.innerHTML = scripts + '<input type="hidden" value="'+authenticity_token+'" name="authenticity_token"/><input type="text" size="30" name="shout[body]" id="shout_body" /></form>' + shouts.innerHTML;
			// Test de connexion a wefrag
			var loggedin_wefrag = new RegExp("class=\"msg\"");
			if(!loggedin_wefrag.test(shouts.innerHTML))
				shouts.innerHTML = "Vous devez �tre identifi� sur <a href=\"http://www.wefrag.com\" target=\"_blank\">Wefrag</a> pour afficher la tribune ici.";
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
			css += ".span-24, .pager { display:none; }";
			css += "#submitwefrag { padding-bottom:5px; }";
			MC_addStyles(css);
			document.getElementById("fakeadbox").style.display="block";
			
			//Add submit on input
			$('submitwefrag').addEventListener('submit', function(e) {MC_Shout()}, false);
	    }
	});	
}

function MC_Shout() {
	
	token = "authenticity_token="+encodeURIComponent(GM_getValue("MC_authenticity_token"));
	message = encodeURIComponent("shout[body]")+"="+encodeURIComponent($('shout_body').value);
	GM_xmlhttpRequest({
	    method: 'POST',
	    url: 'http://www.wefrag.com/shouts/',
	    headers: {
	        'Content-type': 'application/x-www-form-urlencoded',
	    },
		data: token+'&'+message,
	    onload: function(responseDetails) {
			window.location.href = window.location.href
	    }
	});
	
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
	css += ".favoris a {cursor:pointer;}\n";
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

function MC_addWeFragLink()
{
	var menu = document.getElementById("menu").innerHTML;
	document.getElementById("menu").innerHTML = "<a href=\"http://wefrag.com/\">Wefrag</a> | " + menu;
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

function MC_addScripts(new_script)
{
	var head, script;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = new_script;
    head.appendChild(script);

}

function MC_isHome()
{
	return (window.location.pathname == "/");
}

function MC_isHavingATextArea()
{
	return document.getElementsByTagName('textarea').length>0;
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

function MC_addFavorisBox() {
	var latestarticles = document.getElementById("latestarticles");
	var element = document.createElement('h4');
	element.innerHTML = "Mes Favoris";
	latestarticles.appendChild(element);
	
	var table = document.createElement('table');
	
	
	var favorites = GM_getValue("MC_favorites");
	table.innerHTML = '<tbody><tr><th class="author">Auteur</th><th class="title">Dernier Article</th><th class="date">Date</th><th class="favoris">Retirer</th></tr>';
	if(favorites)
	{
		var a = favorites.split(",");
		a= MC_unique(a);
		for(j=0; j < a.length; j++) {
			MC_getLatestPost(a[j]);
			table.innerHTML += '<tr class="linea"><td class="author">'+a[j]+'</td><td class="title"><a href="$'+a[j]+'_link$">$'+a[j]+'_title$</a></td><td class="date">$'+a[j]+'_date$</td><td class="favoris"><a href="?type=remove&username='+a[j]+'">-</a></td></tr>';
		}
	}
	latestarticles.appendChild(table);
}

function MC_getLatestPost(username) {
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://blogs.nofrag.com/'+username+'/blog.rss',
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
		onload: function(responseDetails) {
			var parser = new DOMParser();
	        var dom = parser.parseFromString(responseDetails.responseText, "text/xml");
			var newitem = dom.getElementsByTagName('item')[0];
			var title =	newitem.getElementsByTagName('title')[0].childNodes[0].nodeValue;
			var link = newitem.getElementsByTagName('link')[0].childNodes[0].nodeValue.replace('http://blogs.nofrag.com/jye/','');
			var date = newitem.getElementsByTagName('pubDate')[0].childNodes[0].nodeValue;
			
			var latestarticles = document.getElementById("latestarticles");
			
			latestarticles.innerHTML = latestarticles.innerHTML.replace('$'+username+'_title$',title);
			latestarticles.innerHTML = latestarticles.innerHTML.replace('$'+username+'_link$',link);
			latestarticles.innerHTML = latestarticles.innerHTML.replace('$'+username+'_date$',date);
	    }
	});
}

/** Wysiwyg **/
function MC_addWYSIWYGEditor() {
	css = '.markItUpHeader ul {float:left;padding:0px;margin:0px;}\n';
	css += '.markItUpHeader ul li {float:left;list-style-image:none;list-style-position:outside;list-style-type:none;position:relative;}\n';
	css += '.markItUp a:link, .markItUp a:visited {color:#000000;text-decoration:none;}\n';
	css += '.markItUpHeader ul a {background-repeat:no-repeat;display:block;margin:0;padding:3px;text-indent:-1000px;width:16px;}\n';
	css += '.markItUpButton1 a {background-image:url(http://wefrag.com/images/markitup/bold.png);}\n';
	css += '.markItUpButton2 a {background-image:url(http://wefrag.com/images/markitup/italic.png);}\n';
	css += '.markItUpButton3 a {background-image:url(http://wefrag.com/images/markitup/underline.png);}\n';
	css += '.markItUpButton4 a {background-image:url(http://wefrag.com/images/markitup/picture.png);}\n';
	css += '.markItUpButton5 a {background-image:url(http://wefrag.com/images/markitup/link.png);}\n';
	css += '.markItUpButton7 a {background-image:url(http://wefrag.com/images/markitup/quotes.png);}\n';
	css += '.markItUpHeader ul .markItUpSeparator {background-color:#CCCCCC;height:16px;margin:0 10px;overflow:hidden;width:1px;color:#CCCCCC;}\n';
	MC_addStyles(css);
	
	script = '\tfunction EditorAddTag(AName, ABeginTag, AEndTag) {\n';
	script +='\t\tvar lElem = document.getElementById(AName);\n';
	script +='\t\tif ((lElem.selectionStart) || (lElem.selectionStart == \'0\')) {\n';
	script +='\t\t\tlStart = lElem.selectionStart;\n';
	script +='\t\t\tlStop = lElem.selectionEnd;\n';
	script +='\t\t\tlText = lElem.value.substring(lStart, lStop);\n';
	script +='\t\t\tif((lStart == lStop) && ABeginTag == "[img]") { new_img = prompt("Url de l\'image :",""); } else { new_img = ""; }\n';
	script +='\t\t\tif((lStart == lStop) && ABeginTag == "[url=]") { new_value = prompt("Url du lien :",""); } else { new_value = ""; }\n';
	script +='\t\t\tif(new_value != null && new_value != "") { new_label = prompt("Titre du lien :",""); if(new_label != null && new_label != "") { lSubst = "[url=" + new_value + "]" + new_label + AEndTag; } else { lSubst = "[url=" + new_value + "]" + new_value + AEndTag; } }\n';
	script +='\t\t\telse { if(new_img!= "" && new_img != null) { lSubst = ABeginTag + new_img + AEndTag; } else { lSubst = ABeginTag + lText + AEndTag; } }\n';
	script +='\t\t\tlElem.value = lElem.value.substring(0, lStart) + lSubst + lElem.value.substring(lStop, lElem.value.length);\n';
	script +='\t\t\tlElem.focus();\n';

	script +='\t\t\tlStart += ABeginTag.length;\n';
	script +='\t\t\tif (lText.length > 0)\n';
	script +='\t\t\t\tlStart += lText.length + AEndTag.length;\n';
	script +='\t\t\tlElem.selectionStart = lStart;\n';
	script +='\t\t\tlElem.selectionEnd = lStart;\n';
	script +='\t\t}\n';
	script +='\t\telse\n';
	script +='\t\t{\n';
	script +='\t\t\tif(ABeginTag == "[url=]") { new_value = prompt("Url",""); } else { new_value = ""; }\n';
	script +='\t\t\tif(new_value != "") { new_label = prompt("Title",""); if(new_label != "") { lElem.value = lElem.value + "[url=" + new_value + "]" + new_label + AEndTag; lElem.focus(); } else { lElem.value = lElem.value + "[url=" + new_value + "]" + new_value + AEndTag; lElem.focus(); } }\n';
	script +='\t\t\telse { lElem.value = lElem.value + ABeginTag + AEndTag; lElem.focus(); }\n';
	script +='\t\t}\n';
	script +='\t}\n';
	MC_addScripts(script);
	
	div = document.createElement('div');
	div.style.width = "90%";
	div.style.marginTop = "10px";
	div.className = "markItUpHeader"
	div.innerHTML = '<ul><li class="markItUpButton markItUpButton1"><a title="Bold" href="javascript:;" onclick="EditorAddTag(\'message\', \'[b]\', \'[/b]\'); return false;">Bold</a></li><li class="markItUpButton markItUpButton2"><a title="Italic" href="javascript:;" onclick="EditorAddTag(\'message\', \'[i]\', \'[/i]\'); return false;">Italic</a></li><li class="markItUpButton markItUpButton3"><a title="Underline" href="javascript:;" onclick="EditorAddTag(\'message\', \'[u]\', \'[/u]\'); return false;">Underline</a></li><li class="markItUpSeparator">---------------</li><li class="markItUpButton markItUpButton4"><a title="Picture" href="javascript:;" onclick="EditorAddTag(\'message\', \'[img]\', \'[/img]\'); return false;">Picture</a></li><li class="markItUpButton markItUpButton5"><a title="Link" href="javascript:;" onclick="EditorAddTag(\'message\', \'[url=]\', \'[/url]\'); return false;">Link</a></li></ul>';
	//quotes
	/*<li class="markItUpSeparator">---------------</li><li class="markItUpButton markItUpButton7"><a title="Quotes"href="javascript:;" onclick="EditorAddTag(\'message\', \'[b]\', \'[/b]\'); return false;">Quotes</a></li>*/
	
	textarea = document.getElementsByTagName('textarea')[0];
	textarea.id = "message";
	label = textarea.parentNode;
	label.insertBefore(div, document.getElementsByTagName('textarea')[0]);
}