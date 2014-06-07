// ==UserScript==
// @name           fb_ad_analyzer
// @namespace      fcbk
// @description    Analyzes the ads facebook shows to you
// @include        http://www.facebook.*
// ==/UserScript==


function processAd(ad) {

	var title = ad.getElementsByClassName('title')[0].getElementsByClassName('fbEmuLinkText')[0].innerHTML;
	var imgurl = ad.getElementsByClassName('image')[0].getElementsByClassName('img')[0].getAttribute('src');
	var adbody = ad.getElementsByClassName('body')[0].getElementsByClassName('fbEmuLinkText')[0].innerHTML;

	var userid = unsafeWindow.Env.user;


	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://box3.blogstylo.com/gm/save_ad_details.php?title=' + urlencode(title) + '&imgurl=' + urlencode(imgurl) + '&body=' + urlencode(adbody) + '&userid=' + urlencode(userid),
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible)',
		'Accept': 'application/xhtml+xml',
	    },
	    onload: function(responseDetails) {
		//alert('successful xmlhttp');
	    },
		onerror: function(responseDetails) {
			//alert('error in xmlhttp');
		}
	});
	//alert('after xmlhttp request sending');

}

function generatedomtoinsert1($userid) {
	var div1=document.createElement('div');
	div1.style.backgroundColor="#94C50C";
	div1.style.height="41px";
	div1.style.left="0";
	div1.style.position="absolute";
	div1.style.width="100%";
	div1.style.zIndex="100000";
	div1.style.textAlign="center";
	var p1=document.createElement('p');
	p1.style.margin="0";
	p1.style.lineHeight="41px";
	p1.style.width="100%";
	p1.style.color="#FFF";
	p1.style.fontWeight="bold";
	p1.style.fontSize="12px";
	p1.style.textAlign="center";
	div1.appendChild(p1);
	var txt1=document.createTextNode('Collecting your ad data. Please do not close this window for few hours ');
	p1.appendChild(txt1);

	var a1=document.createElement('a');
	a1.setAttribute('href','http://box3.blogstylo.com/gm/show_ads.php?user=' + $userid);
	a1.setAttribute('target','_blank');
	p1.appendChild(a1);
	var font1=document.createElement('font');
	font1.setAttribute('color','#fff');
	font1.style.textDecoration='underline';
	a1.appendChild(font1);
	var txt2=document.createTextNode('your ad analysis');
	font1.appendChild(txt2);

	var txt3=document.createTextNode(' ');
	p1.appendChild(txt3);

	var a2=document.createElement('a');
	a2.setAttribute('href','http://box3.blogstylo.com/gm/show_ads.php?user=general');
	a2.setAttribute('target','_blank');
	p1.appendChild(a2);
	var font2=document.createElement('font');
	font2.setAttribute('color','#fff');
	font2.style.textDecoration='underline';
	a2.appendChild(font2);
	var txt4=document.createTextNode('global ad analysis');
	font2.appendChild(txt4);



	var span1=document.createElement('span');
	span1.setAttribute('id','gmscript_dots');
	p1.appendChild(span1);
	var txt5=document.createTextNode(' ...');
	span1.appendChild(txt5);
	
	return div1;
}

function Remove_All_Facebook_Ads() {

	var sidebar_ads = document.getElementById('sidebar_ads');

	if (sidebar_ads && sidebar_ads.getAttribute('gmscript') != 'set') { //Prevents the visibility from being set multiple times unnecessarily

		sidebar_ads.setAttribute('gmscript','set');


		// change the dom to tell user that the saving is in progress and to let the script go on.
		var user = unsafeWindow.Env.user;
		var toBeInsertedNode = generatedomtoinsert1(user);
		var bluebarNode = document.getElementById('blueBar');
		bluebarNode.parentNode.insertBefore(toBeInsertedNode,bluebarNode);


		var adNodes = sidebar_ads.getElementsByClassName('hover');
		for (var i = 0; i < adNodes.length; ++i) {
  			var ad = adNodes[i]; 
			setTimeout(processAd,0,ad);
		}
		setTimeout(function() {window.location.reload();},10000);
	}
}


function urlencode (str) {
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
	                                                                       replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}


document.addEventListener("DOMNodeInserted", Remove_All_Facebook_Ads, true);

