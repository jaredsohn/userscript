// ==UserScript==
// @name           GPX+AC
// @namespace      http://nick.everydayghosts.com/bookmarklets.php
// @description    Click every user you look at. 100% automatic. 
// @include        http://gpxplus.net/*
// ==/UserScript==

if (window.location.href.substring(0, 19) == "http://gpxplus.net/")
{
	if (window.location.pathname.substr(0,6) == "/user/")
	{
		// Automatically click
		var ver = "0.5.2";
		var n = 0;
		var di = 1000;
		var da = 1000;
		var achome = 'http://nick.everydayghosts.com/bookmarklets.php';
		var babel = new Array();
		var pkmn = new Array();
		var pkicon = new Array();
		var user = location.pathname.substr(location.pathname.lastIndexOf('/')+1).replace(/\+/g,' ');
		var babel = document.body.innerHTML.split(/http:\/\/gpxplus.net\/info\/(?=\w{6,}. title)/);

		var style = document.createElement('style');
		style.setAttribute('type', 'text/css');
		style.innerHTML = 'iframe.gpxpac{width:100%;height:100%}a.gpxpac{color:#ccc}a.gpxpac:hover{color:#fff;text-decoration:none}td.gpxpac{background-color:#363636;padding:5px;vertical-align:middle;align:center;text-align:center}';

		var functions = document.createElement('script');
		functions.setAttribute('type', 'text/javascript');
		functions.innerHTML = 'function extapse(s){if(s.style.height=="0px")s.style.height="200px";else s.style.height="0px";}\n\n' + 'function checkground(n){q=window.frames[\'gpxpac\'+n].document;r=q.body.innerHTML.search(/the only way to gain views is by posting your Pok(.)mon on other websites/);if(r>0){if(q.body.innerHTML.substr(r+71,141).replace(/(\\s)|(\\\/)/g,"")!=".<br><div><hr><h1class=\\\"header\\\">"){alert("(!)");return 1;}else{return 0;}}else{setTimeout("checkground("+n+")",'+da+');}}\n\n' + 'function aftermath(n){k=0;q=window.frames[\'gpxpac\'+n].document;if(checkground(n)){status="<span style=\\\"color:#0f0\\\">(!)</span>";k=1}else if(q.getElementsByTagName(\'h2\')[0].innerHTML.search(/(It devoured it)|(It happily eats it)|(You feel it slightly move)/)>0){status="SUCCESS";k=1;}else if(q.getElementsByTagName(\'h2\')[0].innerHTML.search(/(You know that)|(must be ready to hatch)/)>0){status="(OK)";k=1;}else if(q.body.innerHTML.search(/<h2>/)<0&&q.getElementById("copyright")!=null){status="(N/A)";k=1;}else{status=".....";}document.getElementById("gpxpac"+n+"_s").innerHTML=status;if(!k){setTimeout("aftermath("+n+")",'+da+');}}\n\n' + 'function interact(n){q=window.frames[\'gpxpac\'+n].document;p=window.frames[\'gpxpac\'+n];if(checkground(n)){aftermath(n);return 0;}if(q.forms[0].use_berry){if(q.body.innerHTML.indexOf(\'(Likes spicy food)\')>0){q.forms[0].BerryInput.value=p.Berries[1];}else if(q.body.innerHTML.indexOf(\'(Likes dry food)\')>0){q.forms[0].BerryInput.value=p.Berries[2];}else if(q.body.innerHTML.indexOf(\'(Likes sweet food)\')>0){q.forms[0].BerryInput.value=p.Berries[3];}else if(q.body.innerHTML.indexOf(\'(Likes bitter food)\')>0){q.forms[0].BerryInput.value=p.Berries[4];}else{q.forms[0].BerryInput.value=p.Berries[0];}q.forms[0].submit();}else{q.forms[0].elements[0].click();}setTimeout(\'window.frames[\"gpxpac\"+\'+n+\'].onload=aftermath(\'+n+\')\','+di+');}\n\n';

		var cushion = document.createElement('div');
		cushion.id = 'cushion';
		cushion.setAttribute('style', 'width:200px;padding:10px;background-color:#111;-moz-border-radius:20px;-webkit-border-radius:20px;z-index:9999;margin:15px;position:absolute;top:0px;left:0px;opacity:0.80');

		var head = document.createElement('div');
		head.setAttribute('align', 'center');
		head.setAttribute('style', 'background-color: #b00000; padding: 10px; margin-bottom: 5px; border: 3px solid #e20707; -moz-border-radius: 20px 20px 0 0; -webkit-border-top-left-radius: 20px; -webkit-border-top-right-radius: 20px');
		head.innerHTML = '<div style="font-size:large;letter-spacing:2px"><a class="gpxpac" href="'+achome+'" style="color:#000">GPX+AC</a></div>';

		var tail = document.createElement('div');
		tail.setAttribute('align', 'center');
		tail.setAttribute('style', 'background-color: #3a3a3a;padding:5px;padding-bottom:0px;;border:3px solid #eee;-moz-border-radius:0 0 20px 20px;-webkit-border-bottom-left-radius:20px;-webkit-border-bottom-right-radius:20px');

		var table = document.createElement('table');
		table.setAttribute('cellspacing', '6');

		for (var n in babel)
		{
			if (n>0)
			{
				pkmn[n] = babel[n].substr(0, babel[n].indexOf('\"'));
				pkicon[n] = babel[n].substring(babel[n].indexOf('http://gpxplus.net/files/img/'), babel[n].indexOf('image.png')+9);
				
				var row1 = document.createElement('tr');
				var col1 = document.createElement('td');
				col1.setAttribute('class', 'gpxpac');
				col1.setAttribute('style', 'width:50%');
				var col1a = document.createElement('a');
				col1a.setAttribute('class', 'gpxpac');
				col1a.setAttribute('href', 'http://gpxplus.net/info/'+pkmn[n]);
				var col1i = document.createElement('img');
				col1i.setAttribute('src', ''+pkicon[n]+'');
				col1i.setAttribute('alt', ''+pkmn[n]+'');
				col1i.setAttribute('border', '0');
				col1a.appendChild(col1i);
				col1.appendChild(col1a);
				var col2 = document.createElement('td');
				col2.setAttribute('class', 'gpxpac');
				col2.setAttribute('style', 'width:50%');
				col2.innerHTML = '<a class="gpxpac" href="#" onclick="extapse(getElementById(\'gpxpac'+n+'_fc\'));return false;" style="text-decoration:none;border-bottom:1px dashed #666"><span id="gpxpac'+n+'_s" style="width:80px;color:#fff;font-family:verdana;font-size:small">...</span></a>';
				row1.appendChild(col1);
				row1.appendChild(col2);
				table.appendChild(row1);
				var row2 = document.createElement('tr');
				var col3 = document.createElement('td');
				col3.setAttribute('class', 'gpxpac');
				col3.setAttribute('align', 'center');
				col3.setAttribute('colspan', '2');
				col3.setAttribute('style', 'padding:0');
				col3.innerHTML = '<div id="gpxpac'+n+'_fc" style="height:0px;overflow:hidden"><iframe class="gpxpac" id="gpxpac'+n+'" name="gpxpac'+n+'" src="http://gpxplus.net/info/'+pkmn[n]+'" frameborder="0" scrolling="yes" width="100%" height="196" onload="interact('+n+')"></iframe></div>';
				row2.appendChild(col3);
				table.appendChild(row2);
			}
		}

		if (babel.length <= 1) tail.innerText = 'Error: No Poke&eacute;mon';
		
		// <a href="'+location.href+'"><div align="middle" style="font-size: small; text-align:center">&laquo Back to User</div></a>
		var closebtn = document.createElement('a');
		closebtn.setAttribute('href', '#');
		closebtn.setAttribute('onclick', 'document.getElementById(\'cushion\').style.display=\'none\'');
		closebtn.setAttribute('style', 'position:absolute;left:20px;top:20px;color:#000');
		closebtn.innerHTML = 'X';

		document.body.appendChild(style);
		document.body.appendChild(functions);
		document.body.appendChild(cushion);
		document.getElementById('cushion').appendChild(head);
		tail.appendChild(table);
		tail.appendChild(closebtn);
		document.getElementById('cushion').appendChild(tail);
	}
}