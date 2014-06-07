// ==UserScript==
// @name           Popular topics section links
// @namespace      userscripts.org
// @description    Adds links to the forums sections on the popular topics page http://forums.whirlpool.net.au/forum-search-topviews.cfm
// @include        http://forums.whirlpool.net.au/*
// ==/UserScript==

var dURL = document.URL;

if(dURL == 'http://forums.whirlpool.net.au/' || dURL == 'http://forums.whirlpool.net.au/index.cfm' ){

	var sectionAs = document.evaluate( '//td[@class= "indexL2"]//a' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	if(!GM_getValue('forumsections4') || Number(GM_getValue('forumsectionsLength4')) != sectionAs.length){

		for (var s = 0; s < sectionAs.snapshotLength; s++){
			
			var ina = sectionAs.snapshotItem(s);

			if(!GM_getValue('forumsections4')){

				GM_setValue('forumsections4', ''+ina.textContent+','+ina.href+'');

			}
			else{
			
				GM_setValue("forumsections4", ""+GM_getValue('forumsections4')+","+ina.textContent+","+ina.href+"");				
			
			}
			
			GM_setValue('forumsectionsLength4', ''+sectionAs.snapshotLength+'');

		}

	}
	
}

if(dURL == 'http://forums.whirlpool.net.au/forum-search-topviews.cfm'){

	var sectArr = GM_getValue('forumsections4').split(',');

	var sectionTds = document.evaluate( '//td[@class="threadV3"][@bgcolor="#dddddd"]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for(var i = 0;i < sectionTds.snapshotLength; i++){
	
		var t = sectionTds.snapshotItem(i);

		for(var k = 0;k<sectArr.length;k++){
		
			if(t.textContent == sectArr[k]){

				t.innerHTML = '<a href="'+sectArr[k+1]+'">'+sectArr[k]+'</a>';
			
			}
		
		}
		
	}	

}