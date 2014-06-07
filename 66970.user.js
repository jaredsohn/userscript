// ==UserScript==
// @name           COSMiQ - Thumbnails
// @namespace      http://userscripts.org/scripts/show/66970
// @description    Thumbnails in Linksammlung
// @version        20100123
// @include        http://www.cosmiq.de/lili/srch*
// @include        http://www.cosmiq.de/lili/my*
// ==/UserScript==

(function(d){
	function getElementsByXPath(obj, xPathString){
		if (obj.ownerDocument)  {
			xPathString = xPathString.replace(/^\/\//, '/descendant::')
		}
		var xPathSnapshot = (obj.ownerDocument || obj).evaluate(xPathString, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var xPathArray = [];
		for (var i = 0; i < xPathSnapshot.snapshotLength; i++) {
			xPathArray[i] = xPathSnapshot.snapshotItem(i);
		}
		return (xPathArray || []);
	}
	var addCss = function(cssOutput) {
		var style = d.createElement("style");
		style.setAttribute("type", "text/css");
		var cssText = d.createTextNode(cssOutput);
		style.appendChild(cssText);
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	
	var createPageThumbs = function() {
		var linkUrls = getElementsByXPath(d.body,'//li[@class="link"]//div[@class="headline"]/a[@target="blank"]');
		linkUrls.forEach(function(linkUrl) {
			var thumbLink = d.createElement('a');
			thumbLink.setAttribute('href',linkUrl.href);
			thumbLink.setAttribute('title',linkUrl.textContent);
			thumbLink.setAttribute('target','blank');
			thumbLink.setAttribute('class','page-thumb');
			thumbLink.style.display = 'block';
			thumbLink.style.cssFloat = 'right';
			thumbLink.style.margin = '4px 0 4px 0';
	 
			var thumbImg = d.createElement('img');
			thumbImg.setAttribute('src','http://open.thumbshots.org/image.pxf?url='+encodeURIComponent(linkUrl.href));
			thumbImg.setAttribute('border','0');
			thumbImg.setAttribute('width','80');
			thumbLink.appendChild(thumbImg);
			var linkWrapper = linkUrl.parentNode.parentNode;
			linkWrapper.parentNode.insertBefore(thumbLink, linkWrapper);
		});
	};
	var removePageThumbs = function() {
		var pageThumbsLinks = getElementsByXPath(d.body,'//a[@class="page-thumb"]');
		pageThumbsLinks.forEach(function(thumbLink) {
			thumbLink.parentNode.removeChild(thumbLink);
		});
	}

	var isShowPageThumbs =  (typeof GM_getValue('show_thumbnails') == 'undefined' && true ) || GM_getValue('show_thumbnails');
	GM_setValue('show_thumbnails', isShowPageThumbs);
	var sortBar = d.getElementById('sort');
	
	var thumbnailsBar = d.createElement('ul');
	thumbnailsBar.setAttribute('id','show_thumbnails');
	thumbnailsBar.style.cssFloat = 'left';
	thumbnailsBar.style.position = 'relative';
	thumbnailsBar.style.left = '200px';
	addCss('ul#show_thumbnails li a { color:#727272; background-color: #eee; padding: 2px; border: 1px solid #ddd; display:block; font-weight:bold; text-decoration:underline;');
	addCss('ul#show_thumbnails li.active a { color:#000000;text-decoration:none;}');
	addCss('ul#show_thumbnails li { float:left; padding:0 15px 0 0;}');
	thumbnailsBar.innerHTML = '<li class="'+((isShowPageThumbs) && 'active' || '')+'"><a href="#show_thumbs">anzeigen</a></li><li class="'+((!isShowPageThumbs) && 'active' || '')+'"><a href="#hide_thumbs">ausblenden</a></li>';
	sortBar.parentNode.insertBefore(thumbnailsBar, sortBar.nextSibling);
	thumbnailsBar.addEventListener('click',function(e) {
		var el = e.target;
		if (el.tagName == 'A') {
			var wrapper = el.parentNode.parentNode;
			var lis = wrapper.getElementsByTagName('li');
			for each(var li in lis) li.setAttribute('class','');
			el.parentNode.setAttribute('class','active');
			var action = (el.href || '').split('#')[1];
			var thumbnailsBarEl = d.getElementById('show_thumbnails');
			if (action=='hide_thumbs' && GM_getValue('show_thumbnails')) {
			 removePageThumbs(); GM_setValue('show_thumbnails', false); 
			} else if (action=='show_thumbs' && !GM_getValue('show_thumbnails')) {
			  createPageThumbs(); GM_setValue('show_thumbnails', true); 
			}
		}
	},true);
	if (isShowPageThumbs) {
		createPageThumbs();
	}

}(document));