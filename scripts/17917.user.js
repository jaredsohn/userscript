// ==UserScript==
// @name Ogame : Show Fleet Composition
// @author Black Cat
// @description Ogame : Show Fleet Composition
// @include http://*/game/index.php?page=overview*
// @include http://*/game/index.php?page=phalanx*
// @exclude	
// ==/UserScript==

(function(){

	function html_entity_decode(str) {
		var ta=document.createElement("textarea");
		ta.innerHTML=str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
		return ta.value;
	}
	
	if (document.location.href.indexOf('overview') != -1) {
		/* Montrer les flottes a l'aller */
		GM_addStyle('body center table tr th span.flight a[title]:after {content:" ("attr(title)")"; color: #FF9900; font-size: 8px;}');
		GM_addStyle('body center table tr th span.federation a[title]:after {content:" ("attr(title)")"; color: #FF9900; font-size: 8px;}');
		GM_addStyle('body center table tr th span.attack a[title]:after {content:" ("attr(title)")"; color: #FF9900; font-size: 8px;}');

		/* Montrer les flottes en stationnement */
		GM_addStyle('body center table tr th span.holding a[title]:after {content:" ("attr(title)")"; color: #FFBB44; font-size: 8px;}');

		/* Montrer les flottes au retour */
		GM_addStyle('body center table tr th span.return a[title]:after {content:" ("attr(title)")"; color: #FFCC66; font-size: 8px;}');
	}
	
	if (document.location.href.indexOf('phalanx') != -1) {
		/* Montrer les flottes sous phalange */
		var expression = /\(["'](.*)["'].*\)/;
		var links = document.evaluate("//font/a[position()=1 and @onmouseover]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < links.snapshotLength; i++) {
			var thisLink = links.snapshotItem(i);
			var omo_attr = thisLink.getAttribute('onmouseover');
			expression.exec(omo_attr);
			var title = RegExp.$1;
			title = title.replace(/<br[^>]*>/g," ");
			title = title.replace(/<[^>]*>/g,"");
			title = html_entity_decode(title);
			var link_title = document.createElement("a");
			link_title.setAttribute('href','#');
			link_title.setAttribute('title',title);
			thisLink.parentNode.insertBefore(link_title, thisLink.nextSibling);
		}
		GM_addStyle('body table tr th font a[title]:after {content:" ("attr(title)")"; color: #FFA500; font-size: 8px;}');
	}
})();
