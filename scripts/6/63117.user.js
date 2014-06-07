// Gamekult Blog Editeur
// version 0.2
// This is a GreaseMonkey user file.
// It can only be used in the GreaseMonkey extension for Firefox.
// See http://greasemonkey.mozdev.org/ and http://mozilla.org
//
// This script is in public domain.
// Author: MacSIM, http://www.macsim.info
//
// ==UserScript==
// @name          Gamekult Blog Editeur
// @namespace     http://www.macsim.info/
// @description	  Modifie les options de l'editeur d'article pour les blogs de Gamekult
// @include       http://www.gamekult.com/communaute/blog/article.html*
// ==/UserScript==

(function () {

    function setAttributeOfElement(attributeName,attributeValue,ElementXpath)
    {
        var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (i=0; i<alltags.snapshotLength; i++)
            alltags.snapshotItem(i).setAttribute(attributeName, attributeValue)
    }    
           
	function ajoutCSS(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	function ajoutJS(js) {
		var head, script;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		script = document.createElement('script');
        script.setAttribute("language", 'Javascript');
		script.innerHTML = js;
		head.appendChild(script);
	}
		
	function youtube() {
		var url = prompt ("Lien de votre video Youtube (ex : http://www.youtube.com/watch?v=R6pheBS-xCk)");

		var reg = new RegExp("^http://www.youtube.com/watch","i");

		if (url == null || url == '' || !url.match(reg)) { return; }
		
		url = "http://www.youtube.com/v/" + url.substring(31,42);
		
		url = '<object width="560" height="340"><param name="movie" value="' + url + '"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="' + url + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="560" height="340"></embed></object>';

		document.getElementById('message').value = document.getElementById('message').value + url;
	}	
	 
    try
    {
		ajoutCSS('#editeur img { margin: 2px; width: 18px; height: 18px; }');		

		var navbar, newElement;
		navbar = document.evaluate (
			"//table[@width='70%']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null
		);

		if (navbar) {
			var edit = document.createElement("div");
			edit.setAttribute("id", "editeur");
			edit.innerHTML = '<img src="http://www.macsim.info/fichiers/icones/text_align_center.png" alt="align_center" title="align center" onclick="TAinsert(\'<div align=&quot;center&quot;>\',\'</div>\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/text_align_justify.png" alt="align_justify" title="align justify" onclick="TAinsert(\'<div align=&quot;justify&quot;>\',\'</div>\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/text_align_left.png" alt="align_left" title="align left" onclick="TAinsert(\'<div align=&quot;left&quot;>\',\'</div>\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/text_align_right.png" alt="align_right" title="align right" onclick="TAinsert(\'<div align=&quot;right&quot;>\',\'</div>\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/text_bold.png" alt="text_gras" title="text gras" onclick="TAinsert(\'[b]\',\'[/b]\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/text_italic.png" alt="align_italic" title="align italic" onclick="TAinsert(\'[i]\',\'[/i]\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/texte_souligne.png" alt="text_souligne" title="texte souligne" onclick="TAinsert(\'[s]\',\'[/s]\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/texte_barre.png" alt="text_barre" title="texte barre" onclick="TAinsert(\'<s>\',\'</s>\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/link.png" alt="lien" title="lien" onclick="TAinsert(\'[url=\',\']texte[/url]\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/texte_spoiler.png" alt="text_spoiler" title="texte spoiler" onclick="TAinsert(\'[spoiler]\',\'[/spoiler]\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/comment.png" alt="citation" title="citation" onclick="TAinsert(\'[quote]\',\'[/quote]\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/text_list_bullets.png" alt="puce" title="puce" onclick="TAinsert(\'[*]\',\'\');" />'
					//+ '<img src="http://www.macsim.info/fichiers/icones/text_dropcaps.png" alt="align_center" title="align center" onclick="TAinsert(\'[b]\',\'[/b]\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/highlighter.png" alt="surligner" title="surligner" onclick="TAinsert(\'<span style=&quot;background-color: yellow;&quot;>\',\'</span>\');" />'
					//+ '<img src="http://www.macsim.info/fichiers/icones/paintcan.png" alt="align_center" title="align center" onclick="TAinsert(\'[b]\',\'[/b]\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/picture.png" alt="image" title="image" onclick="TAinsert(\'[img]\',\'[/img]\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/text_h1.png" alt="H1" title="H1" onclick="TAinsert(\'<h1>\',\'</h1>\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/text_h2.png" alt="H2" title="H2" onclick="TAinsert(\'<h2>\',\'</h2>\');" />'
					+ '<img src="http://www.macsim.info/fichiers/icones/text_h3.png" alt="H3" title="H3" onclick="TAinsert(\'<h3>\',\'</h3>\');" />'
					+ '<img id="youtube" src="http://www.macsim.info/fichiers/icones/youtube.jpg" alt="youtube" title="youtube" style="width: 36px;" />'
					+ '<br />'
					+ '<script type="text/javascript" src="http://www.macsim.info/fichiers/jscolor/jscolor.js"></script><input class="color {pickerFaceColor:\'#01BABE\'}" value="ffffff" onchange="document.getElementById(\'message\').value = document.getElementById(\'message\').value + \'<span style=&quot;color: #\' + this.color + \'&quot;>Votre Texte</span>\'"'
					+ '<select name="selectfont" onchange="if (selectfont.value != \'null\') {TAinsert(\'[FONT=\' + selectfont.value + \']\', \'[/FONT]\');selectfont.value=\'null\'}"><option selected="" value="null">Police</option><option value="Arial">Arial</option><option value="Courier">Courier</option><option value="Courier New">Courier New</option><option value="Impact">Impact</option><option value="Tahoma">Tahoma</option><option value="Times New Roman">Times New Roman</option><option value="Verdana">Verdana</option></select>'
					+ '<select name="selecttaille" onchange="if (selecttaille.value != \'null\') {TAinsert(\'<span style=&quot;font-size:\' + selecttaille.value + \'px;&quot;>\', \'</span>\');selecttaille.value=\'null\'}"><option selected="" value="null">Taille</option><option value="8">8px</option><option value="10">10px</option><option value="12">12px</option><option value="14">14px</option><option value="16">16px</option><option value="18">18px</option><option value="22">22px</option></select>'
					+ '<a onclick="albumpopup=window.open(\'albumpopup.html\',\'News\',\'resizable=yes,scrollbars,width=550,height=400,left=50,top=30\',\'albumpopup\') ;albumpopup.focus();" style="cursor: pointer;"><b>Vos images (pop-up)</b></a>';

					
					
					
			navbar.snapshotItem(0).parentNode.insertBefore(edit, navbar.snapshotItem(0).nextSibling);

			navbar.snapshotItem(0).parentNode.removeChild(navbar.snapshotItem(0));
		}
		
		document.getElementById('youtube').addEventListener('click', youtube, false);
    }
        
    catch (e)
    {
        alert("UserScript exception:\n" + e);
    }

})();