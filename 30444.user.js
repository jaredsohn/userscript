// ==UserScript==
// @name           Download From Traileraddict.com
// @namespace      userscripts.org
// @description    Download From Traileraddict.com
// @include        http://www.traileraddict.com/trailer/*
// @include        http://www.iwatchstuff.com*
// @version      0.3
// ==/UserScript==

(function(){

	var trailer, vidNum, d = document;
	
	if(d.URL.match('traileraddict')){

		trailer = d.getElementById('trailerplayer');

		if(trailer){
		
			vidNum = trailer.firstChild.data.split('emb/')[1];
			
			GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://www.traileraddict.com/fvar.php?tid='+vidNum,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible)',
					},
					onload: function(responseDetails) {

						var resp = responseDetails.responseText;
						
						var flvURL = resp.split('fileurl=')[1].split('.flv&')[0]+'.flv';
						
						var newP = d.createElement('p');
						var newB = d.createElement('b');
						newB.innerHTML = 'Download :  ';
						var newA = d.createElement('a');
						newA.innerHTML = flvURL;
						newA.href = flvURL;
						newP.appendChild(newB);
						newP.appendChild(newA);
						
						var nS = trailer.parentNode.nextSibling;
						
						nS.parentNode.insertBefore(newP, nS);

					
					}
					
			});
			
		}
		
	}
	else if(d.URL.match('iwatchstuff')){ //CBF making it more succinct

		trailer = d.getElementById('entrycontainer').getElementsByTagName('embed')[0];

		if(trailer){
		
      var spl = 'emb/';
      
      if(trailer.src.indexOf('emd/')>-1){
      
        spl = 'emd/';
      
      }
			vidNum = trailer.src.split(spl)[1];
			
			GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://www.traileraddict.com/fvar.php?tid='+vidNum,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible)',
					},
					onload: function(responseDetails) {

						var resp = responseDetails.responseText;

						var flvURL = resp.split('fileurl=')[1].split('.flv&')[0]+'.flv';
						
						var newP = d.createElement('p');
						var newB = d.createElement('b');
						newB.innerHTML = 'Download :  ';
						var newA = d.createElement('a');
						newA.innerHTML = flvURL;
						newA.href = flvURL;
						newP.appendChild(newB);
						newP.appendChild(newA);
						
						var nS = trailer.parentNode.parentNode;
						
						nS.parentNode.insertBefore(newP, nS.nextSibling);

					
					}
					
			});
			
		}	
		
	
	}

})();