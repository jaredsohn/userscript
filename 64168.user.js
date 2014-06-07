// ==UserScript==
// @name            Google Reader Optimized
// @namespace      http://userstyles.org
//@author           Jason Ng
// @homepage         http://www.kenengba.com
// @include        http://www.google.com/reader*
// @include        https://www.google.com/reader*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//css changed


addGlobalStyle('.friends-tree-notification-info {display:none;}');
addGlobalStyle('#main {position:absolute;top:26px;width:100%;}');
addGlobalStyle('#lhn-add-subscription {left:775px;top:2px;}');
addGlobalStyle('.loaded #search {display:block;left:9px;position:absolute;top:4px;}');
addGlobalStyle('#gbar, #guser,#global-info,.gbh,#logo,#logo-container,#chrome-header,#search-submit  {display:none;}');
addGlobalStyle('#search-restrict-input.label-input-label {-moz-background-clip:border;-moz-background-inline-policy:continuous;-moz-background-origin:padding;background:transparent none repeat scroll 0 0;border-width:0;width:107px;}');
addGlobalStyle('#search-input {border:1px solid #B2B2B2;margin:0;padding:3px 2px;width:105px;}');
addGlobalStyle('#chrome-viewer-container {border-collapse:collapse;border-spacing:0;position:inherit;table-layout:fixed;top:0;width:100%;}');
addGlobalStyle('#chrome-header {display:none}');
addGlobalStyle('#main {position:absolute;top:0;width:100%;background-color:#EBEFF9;}');
addGlobalStyle('#lhn-selectors,#sub-tree,#friends-tree-item-0-main ul,.scroll-tree li, #lhn-add-subscription-section   {background-color:#EBEFF9;}');
addGlobalStyle('.lhn-section-footer {background-color:#C2CFF1;}');
addGlobalStyle('.scroll-tree li a:hover, #lhn-selectors .selector:hover  {background-color:GhostWhite;}');
addGlobalStyle('#nav {float:left;position:absolute;top:0px;width:260px;}');

//favicon

(function(){
	var GOOGLE_READER_INFO = eval(GM_getValue('googleReaderInformation')) || {};
	var FAVICON = GOOGLE_READER_INFO.favicon || (GOOGLE_READER_INFO.favicon = {});
	var FAVICON_URL = ['https://www.google.com/s2/favicons?domain=', ''];
	var FAVICON_DEFAULT_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABdUExURa2z+H6CrWtwpnN5uWNopejp9Pf3/6+08Kes6G50uePm/qSr+MTG6ZSZzbW4593e93R4qs3R/JOWu5Oa8dbZ/ISJvJ6l9Ovs/sXJ+amszL3C9/P0/7W6+J+izP////fbRfQAAAEbSURBVHjaYpCTFYICOTAACCAGWT5pNml+QQkpPlGwAEAAMcgKCvKLy7FKsXMISAKBHEAAMchKychIyYjLSbAzioiI8EgCBBCDLIO4HJsMg7i0jCgbUKcsQAAxyMpIMAKBAAjIiUjIAgQQUIsoh7i0uAhQpywTm6AsQAABDRWVkhARl5OWYOBmkRORBQggBlkRUQYxMQYZaTkpMRZpVkmAAGLgZRcV45KTlhGTluZg4ZKWBAggBjleUTEZCS45GRk5KRZ+VkmAAGKQkxNlEBYWE5cWE+dnkuKRBAggkICEtLiwhJywCCsT0KUAAQQSEJSTE5YS55bgZwL6BSCAgAKMYlLsYsJAIAsSAAggoIAcMycnMzMQCYB8CxBgAB2IFJeOuyn5AAAAAElFTkSuQmCC';

// 	var COLORFUL_FLAG = GOOGLE_READER_INFO.colorfulViewFlag || false;
// 	var COLORFUL_BUTTON_TEXT = GOOGLE_READER_INFO.colorfulViewText || 'Colorful View On';
// 	var COLORFUL_BUTTON_CLASS_CONTENT = GOOGLE_READER_INFO.colorfulViewButtonContentClass || '';
// 	var COLORFUL_BUTTON_CLASS_POS = GOOGLE_READER_INFO.colorfulViewButtonPosClass || '';
// 	var COLORFUL_BUTTON_CLASS_TOP_SHADOW = GOOGLE_READER_INFO.colorfulViewButtonTopShadowClass || '';
// 	var COLORFUL_BUTTON_CLASS_INNER_BOX = GOOGLE_READER_INFO.colorfulViewButtonInnerBoxClass || '';

	var RSS = $X('id("sub-tree-item-0-main")/ul/li/ul/li').length;
	var FOLDER = $X('id("sub-tree-item-0-main")/ul/li').length;
	var RSS_NUMBERS = GOOGLE_READER_INFO.rssNumber || null;
	var FOLDER_NUMBERS = GOOGLE_READER_INFO.folderNumber || null;
			
 
	var googleReader = {
		init: function(){ 
			(RSS_NUMBERS === null || FOLDER_NUMBERS === null || RSS !== RSS_NUMBERS || FOLDER !== FOLDER_NUMBERS) ?
				this.noCacheAddFavicon(): this.addFavicon();

			this.addBaseCss();
			
// 			if(COLORFUL_FLAG == false) 
// 				this.addNoColorfulListViewCss();

			GM_registerMenuCommand('GoogleReaderFavicon++ - clear cache', clearCache); 
	   
			GOOGLE_READER_INFO.rssNumber = RSS;
			GOOGLE_READER_INFO.folderNumber = FOLDER;
			setValue();
		},
		noCacheAddFavicon: function(){
			var xhr = new XMLHttpRequest();
	   
			xhr.open('get', '/reader/subscriptions/export', true);

			xhr.onload = function(){
				var responseXML = xhr.responseXML;
				Array.forEach(responseXML.getElementsByTagName('outline'), function(outline){
					if (!outline.hasAttribute('htmlUrl')) return;
					var title = outline.getAttribute('title');
					var url = outline.getAttribute('htmlUrl');
					var favicon;
					url = url.split(/\/|\?/)[2];
					(title.length > 24) ? FAVICON[title.substr(0, 21) + '...'] = FAVICON_URL.join(url) : FAVICON[title] = FAVICON_URL.join(url);
				});	
					
				googleReader.addFavicon();
			
				setValue();	
			};

			xhr.send(null);		
		},
		addFavicon: function(){
			entryFaviconNoDOMNodeInserted();
// 			if(COLORFUL_FLAG == true)
// 				this.colorfulListView.setColor();
// 			this.colorfulListView.button();
			this.entryFavicon();		
			this.sideBarFavicon();
			
			
			function entryFaviconNoDOMNodeInserted(){
				$X('.//span[@class="entry-source-title"] | .//a[@class="entry-source-title"]').forEach(function(title){
					var match = title.textContent;
					if(match.length > 24) match = match.substr(0,21) + '...';
					var favicon = document.createElement('img');
					var s = favicon.style;
					favicon.width = '16';
					favicon.height= '16';
					if(title.parentNode.className === 'entry-source-title-parent'){
						s.marginRight = '10px';
						s.verticalAlign = 'middle';
					} 
					else {
						s.position = 'absolute';
						s.top = '3px';
						s.left = '1.6em';		 	
					}
					
// 					if(COLORFUL_FLAG == true){
// 						var target;
// 						(title.tagName === 'SPAN') ?
// 							target = title.parentNode.parentNode.parentNode:
// 							target = title.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
// 						if(target.getAttribute('color') === null)
// 							target.setAttribute('color',match.replace(/"/g,''));
// 					}	
					
					(FAVICON.hasOwnProperty(match)) ? favicon.src = FAVICON[match] : favicon.src = FAVICON_DEFAULT_IMG;
					title.parentNode.insertBefore(favicon,title);
					favicon.removeEventListener('error',revertFavicon,false);
					favicon.addEventListener('error',revertFavicon,false);
				});			
			};			
		},
		entryFavicon: function(){
			document.addEventListener('DOMNodeInserted', function(e){
				var target = e.target;
				entry(target);
				sideBar(target);
			}, false);		
			
			function entry(target){
				if(/^entry\s/i.test(target.className) && target.tagName === 'DIV'){
					var title;
					var favicon = document.createElement('img');
					var s = favicon.style;		
					s.width = '16px';
					s.height = '16px';
						
					if(target.firstChild.className === 'card card-common'){
						title = target.getElementsByClassName('entry-source-title')[0]; 
						s.marginRight = '5px';
						s.verticalAlign = 'middle';
					}
					else{
						if(target.firstChild.className === 'search-result'){ 
							title = target.getElementsByClassName('entry-source-title')[0];
							s.verticalAlign = 'middle';
							s.marginRight = '5px';
						}
						else
						if(target.firstChild.className === 'comment-entry'){ 
							title = target.getElementsByClassName('entry-source-title')[0];
							s.marginRight = '5px';
							s.verticalAlign = 'middle';						
							s.border = 'none';
						}
						else{
							title = target.getElementsByTagName('span')[0]; 
							s.position = 'absolute';	
							s.top = '3px';
							s.left = '1.6em';
						}
					}		
					
					var match = title.textContent;
					if(match.length > 24) match = match.substr(0,21) + '...';			
					
					if(target.getAttribute('color') === null)
						target.setAttribute('color',match.replace(/"/g,''));
						
					(FAVICON.hasOwnProperty(match)) ? favicon.src = FAVICON[match] : favicon.src = FAVICON_DEFAULT_IMG;
					title.parentNode.insertBefore(favicon, title);
					favicon.removeEventListener('error', revertFavicon, false);
					favicon.addEventListener('error', revertFavicon, false);			
				}				
			};
				
			function sideBar(target){
				if(target.nodeName.toLowerCase() === 'li' && target.className.match(/^folder/))
					googleReader.sideBarFavicon();						
			};
		
		},
		sideBarFavicon: function(){
			$X('id("sub-tree")//span[contains(@class,"sub-icon")]').forEach(function(e){
				if(e.parentNode.firstChild.nodeName.toLowerCase() === 'img') return;
				var title = e.nextSibling;
				var match = title.firstChild.textContent;
				if(match.length > 24) match = match.substr(0,21) + '...';
				title.style.paddingLeft = '7px';			
				var favicon = document.createElement('img');
				e.parentNode.insertBefore(favicon,e);
				e.parentNode.removeChild(e);
					
				(FAVICON.hasOwnProperty(match)) ? favicon.src = FAVICON[match] : favicon.src = FAVICON_DEFAULT_IMG;
		
				favicon.removeEventListener('error',revertFavicon,false);
				favicon.addEventListener('error',revertFavicon,false);
			});		
		},
		addBaseCss: function(){
			GM_addStyle(<><![CDATA[  
				#entries.list .collapsed .entry-main .entry-source-title {
					left: 3.25em !important; width:9em !important;
				}
				#sub-tree ul ul li a {padding-left:22px !important;}
				#sub-tree a img {width:16px; height:16px; border:none; vertical-align:middle;}
				#entries.list .collapsed .entry-secondary {margin: 0 8.5em 0 14em !important;}
				#entries.single-source .collapsed .entry-source-title {display:block !important;}
				.colorful-view-content {color: #EEEEEE !important;}
				.colorful-view-base-top-shadow {background-color:#999999 !important; border-bottom-color:#888888 !important;}
				.colorful-view-inner-box {background-color:#777777 !important; background:#F9F9F9 none repeat scroll 0 0 !important; border-color:#888888 !important;}
				.colorful-view-base-pos {background-color:#777777 !important; border-color:#888888 !important;}
			]]></>);		
		},
		addNoColorfulListViewCss: function(){
			GM_addStyle(<><![CDATA[
				#entries.list .read .collapsed {opacity:0.6;}
				#entries.list .entry .collapsed:hover {background:#C2CFF1;}
				#entries.list .read .collapsed:hover {opacity:1.0; background:#C2CFF1;}		
			]]></>);
		},
	};
 
	googleReader.init();
  

	function revertFavicon(event){
		this.src = FAVICON_DEFAULT_IMG;
	};
 
	function setValue(){
		GM_setValue('googleReaderInformation',uneval(GOOGLE_READER_INFO));
	};
 
	function clearCache(){
		GM_setValue('googleReaderInformation','');
	};
 
	function $X(exp, ctx){
		var xp = (ctx && ctx.ownerDocument || document).evaluate(exp, ctx || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
		r = [];
		for (var i = 0;i < xp.snapshotLength;++i) r.push(xp.snapshotItem(i));
		return r;
	};
	
})();