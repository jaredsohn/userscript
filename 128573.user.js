// ==UserScript==
// @name           pixiv_bookmark_filter
// @include         http://www.pixiv.net/search.php*
// @include         http://www.pixiv.net/tags.php*
// @include         http://www.pixiv.net/member_illust.php?id=*
// @include         http://www.pixiv.net/member_illust.php?mode=medium*
// ==/UserScript==

(function(){

	var oStyle = document.createElement('style');
	oStyle.setAttribute('type','text/css');
	var css = 'li.image-item2 {display:inline-block;height:300px;margin:0 10px; overflow:auto;text-align:center;vertical-align:top;width:164px;}p.autopagerize_page_info{display:inline!important;}.autopagerize_page_separator,ul.images.autopagerize_page_element,.popular-introduction{display:none!important;}.works_display img{max-width:740px!important;margin:20px 0 0 0!important;}';
	oStyle.innerHTML = css;
	document.getElementsByTagName('head')[0].appendChild(oStyle);


	function filter(doc){
		var counts = document.getElementsByClassName("image-item");
		
		for(var i = counts.length - 1; i >= 0; --i) {
			var lElm = counts[i];
			var counts2 = lElm.getElementsByClassName("bookmark-count");

			var dlink = document.createElement('a');
			dlink.innerHTML='[★]';
			if(window.parent.location.href.search(/manga=1/)!=-1){
				dlink.href = lElm.getElementsByTagName("a")[0].href.replace("medium","manga");
			}else{
				dlink.href = lElm.getElementsByTagName("img")[0].src.replace(/(http:\/\/i\d\.pixiv\.net\/img\d{2,}\/img\/.+\/\d{1,})_s\.(jpg|png|gif)/,"$1.$2").replace(/(http:\/\/i\d\.pixiv\.net\/img-inf\/img\/\d{4,}\/\d{2,}\/\d{2,}\/\d{2,}\/\d{2,}\/\d{2,}\/)(\d{1,})_s\.(jpg|png|gif)/,"http:\/\/www\.pixiv\.net\/member_illust.php\?mode=medium&illust_id=$2");
			}
			lElm.appendChild(dlink);

			if(counts2.length==0) {
				lElm.parentNode.removeChild(lElm);
			}else if( parseInt(counts2[0].text) < 10 ){//ブクマ数の閾値
				lElm.parentNode.removeChild(lElm);
			}else{
				lElm.className="image-item2";
			}
		}
	}

	function linkplus(doc){
		
		var authorthumb = document.getElementsByClassName("user-link")[0].getElementsByTagName("img")[0].src.replace(/(http:\/\/i\d\.pixiv\.net\/img\d{2,}\/)profile(\/.+\/).+\.(jpg|png|gif)/,"$1img$2");
		
		var images = document.getElementsByTagName("img");
		
		for(var i = images.length - 1; i >= 0; --i) {
			var lElm = images[i];

			if(lElm.className!="ok"){
			var dlink = document.createElement('a');
			dlink.innerHTML='<BR>[★]';
			dlink.href = lElm.src.replace(/(http:\/\/i\d\.pixiv\.net\/img\d{2,}\/img\/.+\/\d{1,})_s\.(jpg|png|gif)/,"$1.$2").replace(/(http:\/\/i\d\.pixiv\.net\/img-inf\/img\/\d{4,}\/\d{2,}\/\d{2,}\/\d{2,}\/\d{2,}\/\d{2,}\/)(\d{1,})_s\.(jpg|png|gif)/,authorthumb+"$2.$3");
			lElm.parentNode.appendChild(dlink);
			lElm.className="ok";
			}
		}
	}

	function middleimg(doc){
		
		var imgurl = document.getElementsByClassName("works_display")[0].getElementsByTagName("img")[0].src.replace("_m","");
	
		var imgmiddle = document.getElementsByClassName("works_display")[0].getElementsByTagName("img")[0];

		imgmiddle.setAttribute("src",imgurl);
	
		document.getElementsByClassName("works_display")[0].appendChild(imgmiddle);
	
	}

	if(window.parent.location.href.slice(0,42)=="http://www.pixiv.net/member_illust.php?id="){
		linkplus();
		for(e in{AutoPagerize_DOMNodeInserted:0,'AutoPatchWork.DOMNodeInserted':0,AutoPagerAfterInsert:0}){
document.body.addEventListener(e,linkplus,false)
		}
	}else if(window.parent.location.href.slice(0,50)=="http://www.pixiv.net/member_illust.php?mode=medium"){
		middleimg();
	}else{
		filter();
		for(e in{AutoPagerize_DOMNodeInserted:0,'AutoPatchWork.DOMNodeInserted':0,AutoPagerAfterInsert:0}){
document.body.addEventListener(e,filter,false);
		}
	}


})();