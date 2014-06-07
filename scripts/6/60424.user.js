// ==UserScript==
// @name		Userscripts.org Forum Sticky Icon
// @author		Erik Vold
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated	2009-10-22
// @lastupdated	2009-10-23
// @namespace	usoFourmStickyIcon
// @include		http://userscripts.org/forums/*
// @version		0.1
// @homepageURL http://userscripts.org/scripts/show/60424
// @description	This userscript will indicate sticky fourm posts with an icon, replacing the default text.
// ==/UserScript==

(function(){
	var usoFourmStickyIcon={
		regex:/^\s*sticky:/i,
		stickyImg:'<img title="Sticky" style="vertical-align:middle;" src="http://www.softcom.com.ua/images/1/pin_red.png" />',
		init:function(){
			var topic,topics=document.evaluate("//td/strong/a[contains(@class,'entry-title') and contains(@rel,'bookmark')]",document,null,7,null);
			if(!topics.snapshotLength) return;
			for(var i=0;i<topics.snapshotLength;i++){
				topic=topics.snapshotItem(i).parentNode.parentNode;
				if(topic.innerHTML.match( this.regex )){
					topic.innerHTML=topic.innerHTML.replace(this.regex,this.stickyImg);
				}
				else break;
			}
		}
	}
	usoFourmStickyIcon.init();
})();