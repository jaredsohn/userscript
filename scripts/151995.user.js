// ==UserScript==
// @name           OCW-i PDFView
// @namespace      Tokoro ( http://tokor.org/ )
// @description    script to enable quick-view of PDF files in OCW-i
// @include        https://secure.ocw.titech.ac.jp/ocwi/index.php?module=Ocwi&action=KougiNote*
// @version        1.2.3
// ==/UserScript==

(function(){
	function $x(path,d){
		if(!d) d=document;
		return document.evaluate(path,d,null,7,null);
	}
	
	var pdfs=$x('/html/body/div/div/div/div/ul[2]/li'),container,item,html,div,li,i,j,defsrc="";
	
	for(i=0;i<pdfs.snapshotLength;i++){
		li=pdfs.snapshotItem(i);
		item=$x('a',li).snapshotItem(0);
		if(item.href.match(/\.pdf/)){
			html='&nbsp;&nbsp;<a href=\'javascript:(function(){document.getElementById("pdfviewer").data="'+item.href+'"; document.getElementById("pdfc").style.display="block"; location.hash="#pdftop";})();\'><img src="https://secure.ocw.titech.ac.jp/ocwi/images/btn_detail.gif"></a>';
			li.innerHTML+=html;
			defsrc=item.href;
		}
	}
	if(defsrc){
		var view=document.createElement('div'),ihtml=[],ct,container;
		view.id="pdfc";
		view.style.display="none";
		ihtml.push('<h2 class="ttlBlue" id="pdftop">PDF閲覧</h2>');
		ihtml.push('<p>PDF表示サイズ：<a href=\'javascript:(function(){document.getElementById("pdfviewer").height="300px";})();\'><img src="images_en/btn_charsize_s.gif"></a>');
		ihtml.push('<a href=\'javascript:(function(){document.getElementById("pdfviewer").height="400px";})();\'><img src="images_en/btn_charsize_m.gif"></a>');
		ihtml.push('<a href=\'javascript:(function(){document.getElementById("pdfviewer").height="600px";})();\'><img src="images_en/btn_charsize_l.gif"></a></p>');
		ihtml.push('<object data="'+defsrc+'" type="application/pdf" width="100%" height="400px" id="pdfviewer"></object>');
		ihtml.push('<p align="center"><a href=\'javascript:(function(){document.getElementById("pdfc").style.display="none";})();\'><img src="images/btn_close.gif" style="padding-bottom:10px;"></a></p>');
		view.innerHTML=ihtml.join("\n");
		ct=$x('/html/body/div/div/div[2]/div[1]');
		container=ct.snapshotItem(0);
		container.parentNode.insertBefore(view,container.nextSibling);
	}
})();