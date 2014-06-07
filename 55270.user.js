// ==UserScript==
// @name           TWIT.tv episode video links
// @namespace      userscripts.org
// @description    Adds ODTV.me video links to each TWIT.tv episode
// @include        http://twit.tv/
// @include        http://twit.tv/*
// @version       0.2
// ==/UserScript==


var shows = {
		'DGW':'http://feeds.feedburner.com/odtv-daily-giz-wiz/',
		'TWiT':'http://feeds.feedburner.com/odtv-twit/',
		'WW':'http://feeds.feedburner.com/odtv-windows-weekly/',
		'SN':'http://feeds.feedburner.com/odtv-security-now/',
		'FLOSS':'http://feeds.feedburner.com/odtv-floss-weekly/',
		'TWiF':'http://feeds.feedburner.com/odtv-twif/',
		'RozRows':'http://feeds.feedburner.com/odtv-roz-rows/',
		'FiB':'http://feeds.feedburner.com/odtv-futures-in-biotech/',
		'TWiL':'http://feeds.feedburner.com/odtv-twil/',
		'MBW':'http://feeds.feedburner.com/odtv-macbreak-weekly/',
		'NATN':'http://feeds.feedburner.com/odtv-net-at-night/'
	};

var mp3Link=document.evaluate("//a["+
	"starts-with(@href, 'http://www.podtrac.com/pts/redirect.mp3/aolradio.podcast.aol.com/twit/DGW') or "+
	"starts-with(@href, 'http://www.podtrac.com/pts/redirect.mp3/aolradio.podcast.aol.com/twit/TWiT') or "+
	"starts-with(@href, 'http://www.podtrac.com/pts/redirect.mp3/twit.cachefly.net/WW') or "+
	"starts-with(@href, 'http://www.podtrac.com/pts/redirect.mp3/aolradio.podcast.aol.com/sn/SN') or "+
	"starts-with(@href, 'http://www.podtrac.com/pts/redirect.mp3/twit.cachefly.net/TWiG') or "+
	"starts-with(@href, 'http://www.podtrac.com/pts/redirect.mp3/twit.cachefly.net/FLOSS') or "+
	"starts-with(@href, 'http://www.podtrac.com/pts/redirect.mp3/twit.cachefly.net/TWiF') or "+
	"starts-with(@href, 'http://www.podtrac.com/pts/redirect.mp3/twit.cachefly.net/RozRows') or "+
	"starts-with(@href, 'http://www.podtrac.com/pts/redirect.mp3/twit.cachefly.net/FiB') or "+
	"starts-with(@href, 'http://www.podtrac.com/pts/redirect.mp3/twit.cachefly.net/TWiL') or "+
	"starts-with(@href, 'http://www.podtrac.com/pts/redirect.mp3/twit.cachefly.net/MBW') or "+
	"starts-with(@href, 'http://www.podtrac.com/pts/redirect.mp3/aolradio.podcast.aol.com/insidethenet/NATN')]"
	, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;

if(mp3Link){	

	var mp3Href = mp3Link.href;
	var s = mp3Href.slice(mp3Href.lastIndexOf('/')+1, mp3Href.lastIndexOf('.'));
	var reg = new RegExp(/[0-9]|\-/);
	var sName = s.slice(0,s.search(reg));
	var sNum = s.slice(s.search(reg)+1).replace(/h/i,'');
	if(sNum.charAt(0)=='0'){
		sNum=sNum.slice(1);
	}	
	//var sNameNum = s.split(reg.exec(s));
	var newd = document.createElement('div');
	var newa = document.createElement('a');
	newa.href='#';
	newa.textContent='Checking...';	
	var newImg = document.createElement('img');
	newImg.src='data:image/gif;base64,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%3D%3D';
	newImg.setAttribute('style','margin-left:10px !important;position:absolute !important;width:15px !important;');
	newd.appendChild(newa);
	newd.appendChild(newImg);

	mp3Link.parentNode.insertBefore(newd, mp3Link.nextElementSibling);

	GM_xmlhttpRequest({
		method: "GET",
		url: shows[sName],
		headers: {
			"User-Agent": navigator.userAgent,
			"Accept": "text/xml"
		},
		onload: function(response){

			var idunnowhyresponsexmlisnotworking = new DOMParser().parseFromString(response.responseText, "text/xml");
			var tees = idunnowhyresponsexmlisnotworking.getElementsByTagName('item');
			newImg.setAttribute('style','display:none !important;');
			for(var i=0;i<tees.length;i++){
				var title = tees[i].getElementsByTagName('title')[0];
				var enclosure = tees[i].getElementsByTagName('enclosure')[0];
				var tC = title.textContent;
				var epNumber = tC.slice(tC.lastIndexOf(' ')+1);
				if(epNumber.charAt(0)=='0'){
					epNumber=epNumber.slice(1);
				}
				if(sName=='DGW'){
					var toSplit = tC.split(' to ');
					var epNumEnd = Number(toSplit[1]); 
					var epNumStart = Number(toSplit[0].slice(toSplit[0].lastIndexOf(' ')));
					if(Number(sNum)>=epNumStart && Number(sNum)<=epNumEnd){
						newa.href=enclosure.getAttribute("url");
						newa.textContent='Download video (MP4) file';
						break;						
					}
					else if((Number(sNum)<epNumStart || Number(sNum)>epNumEnd) && i==tees.length-1){
						newa.textContent='No Video Available :(';
						newa.setAttribute('style','opacity:0.5;');
					}					
				}
				else if(epNumber==sNum){
					newa.href=enclosure.getAttribute("url");
					newa.textContent='Download video (MP4) file';
					break;
				}				
				else if(epNumber!=sNum && i==tees.length-1){
					newa.textContent='No Video Available :(';
					newa.setAttribute('style','opacity:0.5;');
				}				


			}

	  },
	  onerror:function(e){
		newa.textContent='summin broke :(';
		newa.title='Error Message :'+e.textContent;
	  }
	});

}



