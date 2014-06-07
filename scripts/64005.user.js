// ==UserScript==
// @name           DS Truppen Transportrechner
// @namespace      http://www.norman-krey.de/cms/
// @description    Version 1.0.4 | Errechnet die maximale Transportmenge
// @include        http://de*.die-staemme.de/game.php?*
// ==/UserScript==

configSpy = true; //(true/false) Ein Späher den Truppen automatisch hinzufügen

if(((/screen=place/.test(location.href)) && (!/mode=/.test(location.href))) || ((/screen=place/.test(location.href)) && (/mode=command/.test(location.href)))) {

	if ((!/try=confirm/.test(location.href)) && (configSpy==true)) {
		(function main() {
			var spy_len = 1;
			
			if(document.getElementsByName("spy").length > 0) {
			  var searchSpy = document.getElementsByName("spy")[0].nextSibling.nextSibling.innerHTML.replace('(','').replace(')','');
			  if (searchSpy>0) document.getElementsByName("spy")[0].value = spy_len;
			}
		})();
	}

	var refresh ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kEExIXOHzq8uAAAAMPSURBVDjLPZPLa1xlHEDP77uPeWXyMuZpYiutQVqi1kfUSC0WQUGy6qJZif+AO3HhA9y4cyNuS3cKYhVbUAjiJrRSRXGhDYnatEmdTMxM0pl75965r+/notSzP2d35PCXi4w89Sb36a1fqHqyOU138zGJ949jc4fS4C3qx/4oyvM7q1+9FSy/IwC0fv4cuS82rl4VQ2uhVm++V/K2zpG2EFsgWEBRf4SMo2tBd+6D3FavzSy9mgL3AnfWronvN5c9p/1JyW/MuW4A4lsxvogYVDNVm5kiL5EkE+20GHs3SR64OHv6bCoA+9e/XHCd9pWy/+ec68SKqd5r20IEq9rfA38UvDpa5BL1jxzmdnzF1B5cldb1Lyoi/Qtlb2PFd3cVUxfyHoR3IIsABdsHfxhGnwQRLXJHcAZ/M76ccVWYciRY8dlGqKK9Bnq4DiIY42KzPqRdsNtInsPEIo6JoDh4gjCeNyLZUYcWYruqeQTBNgzMwvjTMLmE5gWE+1CdhNo0goDxLVmAhrfPuqh92CEALUBEGD2OuBVEPCjVYOgI8tASlEbAlFFjQEVQgbjzuOuYTCTtgsSo54C42CwjC+9StH9k4ORr2DwFNdgkxPhVxDhQRIjtG3dgaOcf7URot4O6gXZ2dqW9sU5n+4DphRlKs22KJCFobGHTLuOnXkGKTDWPBdUbroR//Y3tgVcTETRqHxA0D3DK0L7V5G7zM7A5laE6Uy8uI/4I2v9XyHqg+r2rwc2GYi6L6rJBmV5cIo9SwuZtKmPTuJ5HZWyc0ZPP49RnsFkXkrZQJBsi5ob8Djy6uvCMuJVvKA1PSX1Kw1ZAv7nF0ImX8MoDUB7GqkDWg2RPCBsx6f4bSHpJANJLww6j8+elMvYx3uCEGh/BWCqTolIGsUqRC3FTyIJINP1QxH7qLl6O/p8p+XbCMZNnnsMf/wjxTqMJmseITdEsgeQAimQdr/S+8Qe/c5/9OgKQ5IdTlF7+FQC9AvmxtweQ8iNqwxeId09IvOdo3Lkptr+m4mxSG+74S2sWIP/pdf4DTCx5/GzULnYAAAAASUVORK5CYII%3D';
	if (typeof document.getElementsByName('spear')[0]!='undefined') document.getElementsByName('spear')[0].setAttribute('onChange', 'rohstoffrechner()');
	if (typeof document.getElementsByName('sword')[0]!='undefined') document.getElementsByName('sword')[0].setAttribute('onChange', 'rohstoffrechner()');
	if (typeof document.getElementsByName('axe')[0]!='undefined') document.getElementsByName('axe')[0].setAttribute('onChange', 'rohstoffrechner()');
	if (typeof document.getElementsByName('archer')[0]!='undefined') document.getElementsByName('archer')[0].setAttribute('onChange', 'rohstoffrechner()');
	if (typeof document.getElementsByName('light')[0]!='undefined') document.getElementsByName('light')[0].setAttribute('onChange', 'rohstoffrechner()');
	if (typeof document.getElementsByName('marcher')[0]!='undefined') document.getElementsByName('marcher')[0].setAttribute('onChange', 'rohstoffrechner()');
	if (typeof document.getElementsByName('heavy')[0]!='undefined') document.getElementsByName('heavy')[0].setAttribute('onChange', 'rohstoffrechner()');
	if (typeof document.getElementsByName('knight')[0]!='undefined') document.getElementsByName('knight')[0].setAttribute('onChange', 'rohstoffrechner()');
	var trcCreateContent = function(node) {
		var content = document.createElement('p');
		content.setAttribute('style', 'font-weight:bold;color:#804000;padding: 0px 0px 10px 5px;');
		content.innerHTML='<script type=text/javascript>' + eval(function is_numeric( mixed_var ){return !isNaN(mixed_var * 1);}) + 
			eval(
				function rohstoffrechner(){ 
					var transport = 0;
					if ((typeof document.getElementsByName('spear')[0]!='undefined') && (is_numeric(parseInt(document.getElementsByName('spear')[0].value))==1)) transport=transport+(parseInt(document.getElementsByName('spear')[0].value)*25);  
					if ((typeof document.getElementsByName('sword')[0]!='undefined') && (is_numeric(parseInt(document.getElementsByName('sword')[0].value))==1)) transport=transport+(parseInt(document.getElementsByName('sword')[0].value)*15);
					if ((typeof document.getElementsByName('axe')[0]!='undefined') && (is_numeric(parseInt(document.getElementsByName('axe')[0].value))==1)) transport=transport+(parseInt(document.getElementsByName('axe')[0].value)*10);
					if ((typeof document.getElementsByName('archer')[0]!='undefined') && (is_numeric(parseInt(document.getElementsByName('archer')[0].value))==1)) transport=transport+(parseInt(document.getElementsByName('archer')[0].value)*10);
					if ((typeof document.getElementsByName('light')[0]!='undefined') && (is_numeric(parseInt(document.getElementsByName('light')[0].value))==1)) transport=transport+(parseInt(document.getElementsByName('light')[0].value)*80);
					if ((typeof document.getElementsByName('marcher')[0]!='undefined') && (is_numeric(parseInt(document.getElementsByName('marcher')[0].value))==1)) transport=transport+(parseInt(document.getElementsByName('marcher')[0].value)*50);
					if ((typeof document.getElementsByName('heavy')[0]!='undefined') && (is_numeric(parseInt(document.getElementsByName('heavy')[0].value))==1)) transport=transport+(parseInt(document.getElementsByName('heavy')[0].value)*50); 
					if ((typeof document.getElementsByName('knight')[0]!='undefined') && (is_numeric(parseInt(document.getElementsByName('knight')[0].value))==1)) transport=transport+(parseInt(document.getElementsByName('knight')[0].value)*100); 
					document.getElementById('trcSumme').innerHTML=transport;
				}
			) + '</script><span title="DS Truppen Transportrechner v1.0.3" style="float:left">Transportmenge: </span>';
		var trcSumme = document.createElement('span');
		trcSumme.setAttribute('style', 'margin-left:5px;float:left');
		trcSumme.id = 'trcSumme';
		trcSumme.innerHTML=0;
		var trcButton = document.createElement('img');
		trcButton.src = refresh;
		trcButton.alt = 'refresh';		
		trcButton.title = 'refresh';	
		trcButton.setAttribute('style', 'float:left;cursor:pointer;margin-left:5px');
		trcButton.setAttribute('onclick', 'rohstoffrechner()');
		content.appendChild(trcSumme);
		content.appendChild(trcButton);
		node.parentNode.insertBefore(content, node.nextSibling);
	};
	var nodes = document.getElementsByTagName('form');
	for(var i = 0; i < nodes.length; i++) {
		if(/units/.test(nodes[i].name)) {
			trcCreateContent(nodes[i]);
		}
	}
}