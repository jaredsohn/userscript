// ==UserScript==
// @name           Shareapic leech
// @namespace      userscripts.org
// @description    Get all image links from every album listed on a userpage.
// @include        http://www.shareapic.net/*
// ==/UserScript==

var dUrl = document.URL;

if(dUrl.indexOf('http://www.shareapic.net')>-1 && dUrl.split('/').length<5){

	function workArr(){
	
		if(GM_getValue('sPicAlbums').length>1){

			var getsPicAlbum = GM_getValue('sPicAlbums').split('.html')[0]+'.html';
			
			var removeAlbum = GM_getValue('sPicAlbums').replace(getsPicAlbum,'');
			
			GM_setValue('sPicAlbums',removeAlbum);

			window.location = getsPicAlbum;
			
		}
		else{
			GM_addStyle('body>p{margin:0;padding:0;}');		
			
			var outputsrc = GM_getValue('sPicAlbumsSrcLinks').split('.jpg');

			var bod = document.getElementsByTagName('body')[0];
			
			for(var i = 0;i < outputsrc.length; i++){

				var newp = document.createElement('p');
				newp.textContent = outputsrc[i]+'.jpg';
				bod.appendChild(newp);
				
			}		
		
			GM_setValue('sPicAlbums','');
			GM_setValue('sPicAlbumsSrcLinks', '');
		
		}

	}


	if(dUrl.indexOf('http://www.shareapic.net/userfull.php')>-1){

		GM_setValue('sPicAlbums','');

		var canCElC = document.evaluate( '/html/body/table[5]/tbody/tr/td/table[2]/tbody/tr/td[2]/table/tbody/tr/td//a[contains(@href, ".html")]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

		for (var m = 0; m < canCElC.snapshotLength; m++){

			GM_setValue('sPicAlbums',GM_getValue('sPicAlbums')+canCElC.snapshotItem(m));

		}

		var a = document.createElement('a');
		a.textContent = 'Leech';
		a.href='#';
		
		
		document.evaluate( '/html/body/table[5]/tbody/tr/td/table[2]/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td/h1/..' ,
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue.appendChild(a);

		a.addEventListener('click', function(event) {
			
			workArr();
				
		}, false);
		
	}
	else if(dUrl.indexOf('.html')>-1){

		var mems = document.evaluate( '//img[contains(@src, "http://preview.shareapic.net")]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

		for (var l = 0; l < mems.snapshotLength; l++){
		
			var newSrc = mems.snapshotItem(l).src.replace("http://preview.shareapic.net/preview","http://images.shareapic.net/images");

			if(GM_getValue('sPicAlbumsSrcLinks') && GM_getValue('sPicAlbumsSrcLinks').length>2){
			
				GM_setValue('sPicAlbumsSrcLinks', GM_getValue('sPicAlbumsSrcLinks')+newSrc);			
			
			}
			else{
			
				GM_setValue('sPicAlbumsSrcLinks', newSrc);
			}

		}

		workArr();
		
	}
}