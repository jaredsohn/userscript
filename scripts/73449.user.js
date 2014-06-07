// ==UserScript==
// @name           kingoterminaator
// @namespace      hkt
// @description    See skript eemaldab delfi kommentaariumist Harri Kingo kommentaarid
// @include        http://*.delfi.ee/*/article.php?*com=*
// ==/UserScript==

		
	var xpr = this.document.evaluate('//span[contains(translate(string(font),"KINGO","kingo"),"kingo")]/font[@class="comT"]', 
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
	for (var i = 0; item = xpr.snapshotItem(i); i++) {
		var lnk = document.createElement("a");
		lnk.href = 'javascript:void(0);';
					
		lnk.addEventListener('click', function (e) {
			if ( e.target.nextSibling.style.display == 'none' ) {
				e.target.nextSibling.style.display = 'block';
				e.target.innerHTML = '- peida Kingo kommentaar';
			} else {
				e.target.nextSibling.style.display = 'none';
				e.target.innerHTML = '+ näita Kingo kommentaari';						
			}
		}, false );
			
		lnk.innerHTML = '+ näita Kingo kommentaari';

		item.parentNode.parentNode.insertBefore(lnk,item.parentNode);
		item.parentNode.style.display = 'none';
	}
