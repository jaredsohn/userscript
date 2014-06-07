// ==UserScript==
// @name           FB Zoom 
// @description    Based on kuehlschrank’s Mouseover Popup Image Viewer. Shows larger version of photos and thumbnails in Facebook and other Sites.  Disabled menu and enabled Facebook images zoom. Kuehlschrank you rock!! If you like it it’s kuehlschrank, if you don’t I broke it ;-) 
// @version        1.0.4
// @author         John Doe 
// @include        http://*.google.tld/*
// @include        https://*.google.tld/*
// @include        http://*.facebook.com*
// @include        https://*.facebook.com*
// @include        http://www.pinterest.com/*
// @include        http://pinterest.com/*
// @include        http://www.deviantart.com/*
// @include        http://deviantart.com/*
// @include        http://www.instagram.com/*
// @include        http://instagram.com/*
// @include        http://www.flickr.com/*
// @include        http://flickr.com/*
// @howto_img_url  http://files.pc-gizmos.com/scripts/136527.png


// ==/UserScript==

var FBZ_Version2 = true;
var FBZ_AppName = "Facebook Zoom";
var FBZ_like_url = "http%3A%2F%2Fdownload.cnet.com%2FFacebook-Zoom%2F3000-12941_4-75744517.html";
if(FBZ_Version2)
{
	FBZ_AppName = "FB Photo Downloader";
	FBZ_like_url = "http%3A%2F%2Fwww.pc-gizmos.com%2Fgizmos%2Ffacebook-photo-downloader%2F";
}

//GM_log("FBZ script loaded !");

var FBZ_d = document, /*$ = function(id) { return FBZ_d.getElementById(id); }, */ FBZ_cur = {}, FBZ_hosts;

var cfg = {
	delay: GM_getValue('delay', 500),
	thumbsonly: GM_getValue('thumbsonly', true),
	context: GM_getValue('context', true),
	greedy: GM_getValue('greedy', false),
	img: GM_getValue('img', true),
	css: GM_getValue('css', ''),
	FBZ_hosts: GM_getValue('FBZ_hosts', '')
};
// added by John Doe
function FBZ_url_param(url,param){return unescape(FBZ_match(url,new RegExp(param+'=([^&]+)','i'))); }
function FBZ_match(str,regex,func){if(typeof str!="string"){return null;}var m=str.match(regex);if(m&&m.length){if(typeof func=="function"){for (var i=regex.global?0:1;i<m.length;i++){func(m[i]);}return m;}else{return m.length>1?m[regex.global?0:1]:null;}}return null;}
// added by John Doe

function loadHosts() {
	FBZ_hosts = [
		{r:/500px\.com\/photo\//, q:'#mainphoto'},
		{r:/abload\.de\/image/, q:'#image'},
		{r:/depic\.me\//, q:'#pic'},
		{r:/deviantart\.com\/art\//, q:['#gmi-ResViewSizer_img', 'img.smshadow']},
		{r:/fastpic\.ru\/view\//, q:'#image'},
		{r:/[fbcdn\.net|akamaihd\.net]\/(safe_image|www\/app_full_proxy)/, html:true, 
			s:function(m, node) // added by John Doe
			{ 
				//GM_log("m="+m+" node="+node.innerHTML); 
				if(node.innerHTML.indexOf("safe_image.php")!=-1)
				{
					//var matches = node.innerHTML.match(/src=["']([^"'].*?)["']/ig); 
					var matches = node.innerHTML.match(/safe_image.php([^"'].*?)["']/ig); 				
					if(!matches || matches.length < 1)
						return '';
					var first_match = matches[0].replace(/".*/ig,"");
					var url = FBZ_url_param(first_match,"url");
					//GM_log("first_match="+first_match + ",url="+url);
					return url;
				}
				else if (node.innerHTML.indexOf("app_full_proxy.php")!=-1)
				{
					var matches = node.innerHTML.match(/app_full_proxy.php([^"'].*?)["']/ig);
					if(!matches || matches.length < 1)
						return '';
					var first_match = matches[0].replace(/".*/ig,"");
					var src = FBZ_url_param(first_match,"src");
					//GM_log("first_match="+first_match + ",src="+src);
					return src;
				}
			}  // added by John Doe
		},
		//{r:/fbcdn\.net\/.+\.jpg($|\?)/, xhr:true}, // // changed by John Doe - blob empty?!?!
		// changed by John Doe "hovercard"
		{r:/(\/\/(fbcdn-[\w\.-]+akamaihd|[\w\.\-]+?fbcdn)\.net\/[\w\/\.\-]+?)_[a-z]\.jpg/, html:true, 
		s:function(m, node) 
			{ 
				//GM_log("m="+m+" node="+node.innerHTML+",url="+'http:' + m[1].replace(/\/[spc][\d\.x]+/g, '') + '_n.jpg'); 
				//if(node.outerHTML.indexOf('hovercard') > -1) 
				//	return ''; 
				return 'http:' + m[1].replace(/\/[spc][\d\.x]+/g, '') + '_n.jpg'; }
			},
		// changed by John Doe
		{r:/facebook\.com\/photo/, q:'#fbPhotoImage'},
		{r:/firepic\.org\/\?v=/, q:'.view img[src*="firepic.org"]'},
		{r:/flickr\.com\/photos\/([0-9]+@N[0-9]+|[a-z0-9_\-]+)\/([0-9]+)/, s:'http://www.flickr.com/photos/$1/$2/sizes/l/', q:'#allsizes-photo > img'},
		{r:/hotimg\.com\/image\/([a-z0-9]+)/i, s:'http://www.hotimg.com/direct/$1'},
		{r:/imagearn\.com\/image/, q:'#img', xhr:true},
		{r:/imagefap\.com\/(image|photo)/, q:'#gallery + noscript'},
		{r:/imagebam\.com\/image\//, q:'img[id]'},
		{r:/(imageban\.(ru|net)|imagerise\.com|imgnova\.com|cweb-pix\.com|sluhost\.com(\/1)?)\/show/, q:'#img_obj', xhr:true},
		{r:/imagebunk\.com\/image/, q:'#img_obj', xhr:true},
		{r:/imagehaven\.net\/img\.php/, q:'#image'},
		{r:/imagehyper\.com\/img\.php/, q:'img[src*="imagehyper.com/img"]', xhr:true},
		{r:/(imagekitty\.com|xoze\.in|imgbuck\.com)\/.+\/.+\.html/, q:'img.pic'},
		{r:/imageshack\.us\/((i|f|photo)\/|my\.php)/, q:['div.codes > div + div', '#main_image, #fullimg']},
		{r:/imageshost\.ru\/photo\//i, q:'#bphoto'},
		{r:/image(team|nice)\.org\/img/, q:'img[alt="image"]'},
		{r:/imagetwist\.com\/[a-z0-9]+\/?(.+\.html)?/, q:'img.pic', xhr:true},
		{r:/imageupper\.com\/i\//, q:'#img', xhr:true},
		{r:/imagepix\.org\/image\/(.+)\.html$/, s:'http://imagepix.org/full/$1.jpg', xhr:true},
		{r:/imageporter\.com\/i\//, xhr:true},
		{r:/imagevenue\.com\/img\.php/, q:'#thepic'},
		{r:/imagewaste\.com\/pictures\/(.+)/, s:'http://www.imagewaste.com/pictures/big/$1', xhr:true},
		{r:/imagezilla\.net\/show\//, q:'#photo', xhr:true},
		{r:/(http:\/\/[a-z]+\.media-imdb\.com\/images\/.+?\.jpg)/, html:true, s:function(m, node) { return m[1].replace(/V1\.?_.+?\./g, cfg.greedy?'':'V1._SY700_SX0_.'); }},
		{r:/imgbox\.com\/([a-z0-9]+)$/i, q:'#img', xhr:true},
		{r:/(imgchili|hoooster)\.com\/show/, q:'#show_image', xhr:true},
		{r:/imgdepot\.org\/show\/(.+\.jpg)/, s:'http://imgdepot.org/images/$1', xhr:true},
		{r:/imgtheif\.com\/image\//, q:'a > img[src*="/pictures/"]'},
		{r:/imgur\.com\/(gallery\/|r\/[a-z]+\/|[a-z0-9]+#)?([a-z0-9]{5,}[^\.]*$)/i, s:'http://i.imgur.com/$2.jpg'},
		{r:/instagr\.am\/p\/([a-z0-9_-]+)/i, s:'http://instagr.am/p/$1/media/?size=l'},
		{r:/itmages\.ru\/image\/view\//, q:'#image'},
		{r:/galleryhosted\.com\/[0-9A-Z]+\/(.+)/, s:'http://www.galleryhosted.com/media/images/original/$1'},
		{r:/(\/\/[a-z0-9]+\.googleusercontent\.com\/.+?)["'\)]/i, html:true, s:function(m, node) { if(node.outerHTML.match(/favicons\?|\b(Ol Rf Ep|Ol Zb ag|Zb HPb|Zb Gtb|Rf Pg)\b/)) return ''; return 'https:' + m[1].replace(/\/(s\d{2,}[ck-]*?|w\d+-h\d+(-p)?)\//g, cfg.greedy?'/s0/':'/s1000/'); }},
		{r:/googleusercontent\.com\/gadgets\/proxy.+?(http.+?)&/, html:true, s:function(m, node) { return decodeURIComponent(m[1]); }},
		{r:/hostingkartinok\.com\/show-image\.php.*/, q:'.image img'},
		{r:/kinopoisk\.ru\/picture\/.*/, q:'#image'},
		{r:/lazygirls\.info\/.+_.+?\/.+?(\?id=\d+)?$/, q:'img.photo'},
		{r:/ld-host\.de\/show/, q:'#image'},
		{r:/listal\.com\/(view)?image\/([0-9]+)/, s:'http://www.listal.com/image/$2/0full.jpg', html:true},
		{r:/lostpic\.net\/\?photo/, q:'.casem img'},
		{r:/memegenerator\.net\/instance\/([0-9]+)/, s:'http://images.memegenerator.net/instances/500x/$1.jpg'},
		{r:/palmebi\.com\/(img|image)\/.+?(v|file)=(.+?\.jpg)/, s:'http://palmebi.com/$1/images/$3'},
		{r:/(photos\.modelmayhem\.com\/photos\/[0-9a-z\/]+)_m\.jpg/, html:true, s:'http://$1.jpg'},
		{r:/(photos\.modelmayhem\.com\/avatars\/[0-9a-z\/]+)_t\.jpg/, html:true, s:'http://$1_m.jpg'},
		{r:/(min\.us|minus\.com)\/l([a-z0-9]+)$/i, s:'http://i.min.us/i$2.jpg'},
		{r:/mlnus\.com\/.+(gif|jpg|png)$/, q:'img'},
		{r:/myphoto\.to\/view\/(.+)/, s:'http://img.myphoto.to/$1'},
		{r:/(panoramio\.com\/.*?photo(\/|_id=)|google\.com\/mw-panoramio\/photos\/[a-z]+\/)(\d+)/, html:true, s:'http://static.panoramio.com/photos/original/$3.jpg'},
		{r:/(\d+\.photobucket\.com\/.+\/)(\?[a-z=&]+=)?(.+\.(jpe?g|png|gif))/, s:'http://i$1$3', xhr:window.location.hostname.indexOf('photobucket.com') == -1},
		{r:/(photosex\.biz|posteram\.ru)\/.+?id=/i, q:'img[src*="/pic_b/"]', xhr:true},
		{r:/(pic4all\.eu|piggy-farm\.com)\/(images\/|view\.php\?filename=)(.+)/, s:'http://$1/images/$3'},
		{r:/piccy\.info\/view3\/(.*)\//, s:'http://piccy.info/view3/$1/orig/', q:'#mainim'},
		{r:/(badimg\.com|fotoshare\.org|image\.imagepremium\.com|myadultimage\.com|picszone\.net|r70\.info|rupix\.org)\/viewer\.php\?file=(.+)/, s:'http://$1/images/$2', xhr:true},
		{r:/picshd\.com\/([a-z0-9]+)$/i, s:'http://i.picshd.com/$1.jpg'},
		{r:/picsee\.net\/([\d\-]+)\/(.+?)\.html/,s:'http://picsee.net/upload/$1/$2'},
		{r:/picturescream\.com\/\?v=/, q:'#imagen img'},
		{r:/(picxxx\.org\/)p[tm]-(\d+)/, s:'http://$1?di=$2'},
		{r:/pimpandhost\.com\/(image|guest)\//, q:'#image'},
		{r:/pixhost\.org\/show\//, q:'#show_image', xhr:true},
		{r:/pixhub\.eu\/images/, q:'.image-show img', xhr:true},
		{r:/pixroute\.com\/.+\.html$/, q:'img[id]', xhr:true},
		{r:/postimage\.org\/image\//, q:'center img'},
		{r:/(qkme\.me|quickmeme\.com\/meme)\/([a-z0-9]+)/i, s:'http://i.qkme.me/$2.jpg'},
		{r:/radikal\.ru\/.+\.html$/, q:'div > div > img'},
		{r:/screenlist\.ru\/details/, q:'#picture'},
		{r:/sharenxs\.com\/view\//, q:'#img1', xhr:true},
		{r:/skrinshot\.ru\/view\.php\?img=(\d+)/, s:'http://skrinshot.ru/files/$1.jpg'},
		{r:/image\.skins\.be\/[0-9]+\//, q:'#wallpaper_image'},
		{r:/stooorage\.com\/show\//, q:'#page_body div div img', xhr:true},
		{r:/swagirl\.com\/host\/view/, q:'img.img_full_screen'},
		{r:/turboimagehost\.com\/p\//, q:'#imageid', xhr:true},
		{r:/twitpic\.com(\/show\/[a-z]+)?\/([a-z0-9]+)($|#)/i, s:'http://twitpic.com/show/large/$2'},
		{r:/twitter\.com\/.+\/status\/.+\/photo\//, q:'img.large'},
		{r:/(upix\.me\/files\/.+\/)#(.+)/, s:'http://$1$2'},
		{r:/uppix\.net\/([0-9a-z\/]+)\.html$/i, s:'http://uppix.net/$1.jpg'},
		{r:/(upload\.wikimedia\.org\/wikipedia\/[a-z]+\/)thumb(\/[a-z0-9]+\/[a-z0-9]+\/.+?\.(jpe?g|gif|png|svg))/i, html:true, s:'http://$1$2'},
		{r:/winimg\.com\/view/, q:'#image_container img'},
		{r:/yfrog\.com\/(z\/)?[a-z0-9]+$/i, q:'#main_image, #the-image img'},
		// pinterest support
		//{r:/(\/\/media-cache[\w\.-]+\.pinterest\.com\/upload\/[\w\/\.\-]+?)_[a-z]\.jpg/, html:true, 
		{r:/\/\/media-cache[\w\.-]+\.pinterest\.com\/192x\/(.+)\.jpg/, html:true, 
			s:function(m, node) 
			{ 				
				//GM_log("(media-cache) m="+m+" node="+node.innerHTML);
				//GM_log("(m[0]="+m[0]);
				var new_pinterest_url = 'http:' + m[0].replace(/\".*/,"").replace("/192x/","/550x/");
				//GM_log(",new_pinterest_url="+new_pinterest_url);				
				return new_pinterest_url; 
			}
		},
		{r:/\/\/media-cache[\w\.-]+\.pinimg\.com\/192x\/(.+)\.jpg/, html:true, 
			s:function(m, node) 
			{ 				
				//GM_log("(media-cache) m="+m+" node="+node.innerHTML);
				//GM_log("(m[0]="+m[0]);
				var new_pinterest_url = 'http:' + m[0].replace(/\".*/,"").replace("/192x/","/550x/");
				//GM_log(",new_pinterest_url="+new_pinterest_url);				
				return new_pinterest_url; 
			}
		},
		{r:/(\/\/media-cache[\w\.-]+\.pinterest\.com\/upload\/[\w\/\.\-]+?)_[a-z]\.jpg/, html:true, 
			s:function(m, node) 
			{ 
				var new_pinterest_url = 'http:' + m[1] + '_c.jpg';
				//GM_log("(upload) m="+m+" node="+node.innerHTML);
				//GM_log(",url="+new_pinterest_url);				
				return new_pinterest_url; 
			}
		},
		{r:/(\/\/media-cache[\w\.-]+\.pinterest\.com\/)uploads\/cover_(.+)\.jpg/, html:true, 
			s:function(m, node) 
			{ 				
				if(!m||m.length<3)
					return "";
				var m_split=m[2].split("_");
				var new_pinterest_url = 'http:' + m[1] + "upload/" + m_split[1]+ "_" + m_split[2] + '_c.jpg';
				//GM_log("(uploads) m="+m+" node="+node.innerHTML);
				//GM_log(",url="+new_pinterest_url);				
				return new_pinterest_url; 
			}
		},
		
		{r:/\/\/[^\?:]+\.(jpe?g|gif|png|svg)($|\?)/i}
	];
	if(cfg.FBZ_hosts) {
		cfg.FBZ_hosts.split(/,?[\r\n\t]+/).forEach(function(s) {
			if(!s) return;
			try {
				var h = JSON.parse(s);
				if(!h || !h.r) throw 'property r missing';
				h.r = new RegExp(h.r, 'i');
				if(h.s && h.s.indexOf('return ') > -1) h.s = new Function('m', 'node', h.q);
				if(h.q && h.q.indexOf('return ') > -1) h.q = new Function('text', h.q);
				FBZ_hosts.splice(0, 0, h);
			} catch(ex) {
				GM_log('Invalid host: ' + s + '\nReason: ' + ex);
			}
		});
	}
}

function onMouseOver(e) 
{	
	var FBZ_ScriptEnable = GM_getValue("FBZ_ScriptEnable",true);
	if(!FBZ_ScriptEnable)
		return;

	if ( location.href.indexOf("facebook.com/photo.php") != -1 ) // dont work in albums - John Doe
		return;
		
	if(typeof e == 'object') 
	{

		if( !e.shiftKey && 
			!FBZ_cur.zoom && 
			!(window.getSelection(0).toString() && typeof FBZ_d.activeElement.selectionStart == 'undefined') && 
			activate(e.target)) 
		{
			FBZ_cur.cx = e.clientX;
			FBZ_cur.cy = e.clientY;
			FBZ_cur.timeout = window.setTimeout(onMouseOver, cfg.delay);
		}
		return;
	}
	setStatus(FBZ_cur.xhr ? 'xhr' : 'loading');
	placeStatus();
		
	// add download Link to Image
	if(FBZ_Version2)
	{
		var genericStreamStory = PCG_searchParentNodeClass(FBZ_cur.node,"genericStreamStory",10)
		if(genericStreamStory)
		{
			//GM_log("genericStreamStory="+genericStreamStory.innerHTML);
			var UIActionLinks_bottom = genericStreamStory.getElementsByClassName("UIActionLinks_bottom");
			if(UIActionLinks_bottom&&UIActionLinks_bottom.length>0)
			{
				//GM_log("UIActionLinks_bottom[0]="+UIActionLinks_bottom[0].innerHTML);
				if(UIActionLinks_bottom[0].innerHTML.indexOf("FBZ_DownloadImage")==-1)
				{
					var photoExt = PCG_getExt(FBZ_cur.url);
					UIActionLinks_bottom[0].innerHTML = UIActionLinks_bottom[0].innerHTML +
						" | <a class='FBZ_DownloadImage' href='"+ PCG_GetFileSaveAs(FBZ_cur.url,"photo",photoExt)+"' target=_blank >Download</a> | ";
				}
			}
		}	 
	}
	// add download Link to Image
	
	if(FBZ_cur.q) 
	{
		downloadPage(rel2abs(FBZ_cur.url, window.location.href), FBZ_cur.q, FBZ_cur.xhr);
	} 
	else 
	{
		if(FBZ_cur.xhr) 
		{
			downloadImage(FBZ_cur.url, FBZ_cur.url);
		} 
		else 
		{
			setPreview(FBZ_cur.url);
			checkProgress(true);
		}
	}
	//FBZ_addFooterBanner();
}

function onMouseMove(e) {
	if(e.shiftKey) return;
	FBZ_cur.cx = e.clientX;
	FBZ_cur.cy = e.clientY;
	var r = FBZ_cur.rect;
	if(r)
	{
		//GM_log("FBZ_cur.cx="+FBZ_cur.cx+",FBZ_cur.cy="+FBZ_cur.cy);
		if(!FBZ_cur.zoom && (FBZ_cur.cx > r.right + 1 || FBZ_cur.cx < r.left - 1 || FBZ_cur.cy > r.bottom + 1 || FBZ_cur.cy < r.top - 1)) 
			return deactivate();
	}
	placeStatus();
	if(FBZ_cur.zoom) 
		placePreview();
}

function onMouseDown(e) {
	if(e.which != 3 && !e.shiftKey) deactivate(true);
}

function onMouseOut(e) {
	if(!e.relatedTarget) deactivate();
}

function onMouseScroll(e) {
	if(FBZ_cur.zoom) {
		e.preventDefault();
		FBZ_cur.scale = FBZ_cur.scale * ((e.detail || -e.wheelDelta) > 0 ? 0.5 : 2);
		if(FBZ_cur.scale < FBZ_cur.minScale) return deactivate(true);
		placePreview();
	} else {
		deactivate();
	}
}

function onKeyUp(e) {
	switch(e.keyCode) {
		case 16: // SHIFT
			toggleZoom();
			break;
		case 27: // ESC
			if(e.shiftKey) {
				FBZ_d.body.removeEventListener('mouseover', onMouseOver, false);
				deactivate();
			} else {
				deactivate(true);
			}
			break;
		case 84:// t
			GM_openInTab(getPreview().src);
			break;
		default:
			deactivate(true);
	}
}

function onContext(e) {
	if(cfg.context && !e.shiftKey && getPreview() && !getStatus() && toggleZoom()) {
		e.preventDefault();
	} else {
		deactivate();
	}
}

function activate(node) {
	if(node.id == 'mpiv-preview') return false;
	var info = parseLink(node) || parseImage(node);

	if(!info.url || info.url == FBZ_cur.url || hasAcceptableSize(node, info.url)) 
		return false;
	deactivate();
	FBZ_cur = info;
	var largest = node, nodes = node.querySelectorAll('*');
	for(var i = nodes.length, n; i-- && (n = nodes[i]);) {
		if(!largest || n.clientHeight > largest.clientHeight)
			largest = n;
	}
	var quirks = FBZ_d.compatMode == 'BackCompat';
	FBZ_cur.node = node;
	FBZ_cur.rect = largest.getBoundingClientRect();
	FBZ_cur.cw = quirks ? FBZ_d.body.clientWidth  : FBZ_d.documentElement.clientWidth;
	FBZ_cur.ch = quirks ? FBZ_d.body.clientHeight : FBZ_d.documentElement.clientHeight;
	FBZ_d.addEventListener('mousemove', onMouseMove, false);
	FBZ_d.addEventListener('mousedown', onMouseDown, false);
	FBZ_d.addEventListener('contextmenu', onContext, false);
	FBZ_d.addEventListener('keyup', onKeyUp, false);
	FBZ_d.addEventListener('DOMMouseScroll', onMouseScroll, false);
	FBZ_d.addEventListener('mousewheel', onMouseScroll, false);
	FBZ_d.addEventListener('mouseout', onMouseOut, false);
	return true;
}

function deactivate(wait) {
	window.clearTimeout(FBZ_cur.timeout);
	if(FBZ_cur.req && typeof FBZ_cur.req.abort == 'function') FBZ_cur.req.abort();
	if(FBZ_cur.node) FBZ_cur.node.style.cursor = '';
	FBZ_cur = {};
	FBZ_d.removeEventListener('mousemove', onMouseMove, false);
	FBZ_d.removeEventListener('mousedown', onMouseDown, false);
	FBZ_d.removeEventListener('contextmenu', onContext, false);
	FBZ_d.removeEventListener('keyup', onKeyUp, false);
	FBZ_d.removeEventListener('DOMMouseScroll', onMouseScroll, false);
	FBZ_d.removeEventListener('mousewheel', onMouseScroll, false);
	FBZ_d.removeEventListener('mouseout', onMouseOut, false);
	setStatus(false);
	setPreview(false);
	if(wait) {
		FBZ_d.body.removeEventListener('mouseover', onMouseOver, false);
		window.setTimeout(function() { FBZ_d.body.addEventListener('mouseover', onMouseOver, false); }, 200);
	}
}

function parseLink(node) 
{
	//GM_log("parseLink:"+
	//	   "\n node.tagName="+node.tagName+
	//	   "\n node.parentNode.tagName="+node.parentNode.tagName+
	//	   "\n node.parentNode.parentNode.tagName="+node.parentNode.parentNode.tagName );
	// ugly hack for pinterest   
	if( location.href.indexOf("pinterest.com/") && node.getAttribute("data-componenttype")=="FLOWED_BOARD" )
	{
		var cover = node.parentNode.getElementsByTagName("img");
		if(cover&&cover.length>0)
			node=cover[0];
		//GM_log("img.src="+cover[0].src);
		//GM_log("nodeName="+cover[0].firstNode.childNodes[0].nodeName);
		//GM_log("nodeValue="+cover[0].firstNode.childNodes[i].childNodes[0].nodeValue);
	}
		   
	if(node.parentNode.tagName == 'A') 
		node = node.parentNode; 
	else if(node.parentNode.parentNode.tagName == 'A') 
		node = node.parentNode.parentNode;
	
	//if(node.tagName=='A')
	//	GM_log("parseLink (tagName=A):"+
	//	   "\n node.innerHTML=\n"+node.innerHTML+
	//	   "\n node.outerHTML=\n"+node.outerHTML );
	
	
	
	if(!(node.tagName == 'IMG' || node.tagName == 'A' && (!cfg.thumbsonly || node.querySelector('img, i') || hasBg(node) || hasBg(node.parentNode) || hasBg(node.firstElementChild)))) 
		return false;
	
	var urls = parseUrls(decodeURIComponent(node.href));
	
	//if(node.tagName=='A')
	//	GM_log("parseLink:"+
	//	   "\n GM_printObj(urls)="+GM_printObj(urls));
	
	var html = node.outerHTML;
	if(!FBZ_hosts) 
		loadHosts();
	for(var i = 0, len = FBZ_hosts.length, h, m; i < len && (h = FBZ_hosts[i]); i++) 
	{
		if(!(m = h.html ? h.r.exec(html) : arrayMatch(urls, h.r))) 
			continue;
		//GM_log("h.r="+h.r+",h.q="+h.q);
		return {
			url: h.hasOwnProperty('s') ? (typeof h.s == 'function' ? h.s(m, node) : replace(h.s, m)) : m.input,
			q: h.q,
			xhr: h.xhr
		};
	}
	return false;
}

function parseImage(node) {
	if((node.tagName == 'IMG' || node.tagName == 'A' && (node = node.querySelector('img')))) {
		return {
			url: node.src
		};
	}
	return false;
}

function downloadPage(url, q, xhr) {
	FBZ_cur.req = GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		ignoreCache: true,
		onload: function(req) {
			try {
				delete FBZ_cur.req;
				var iurl = parseHtml(req.responseText, q, url);
				if(!iurl) throw 'Image URL not found in node: ' + q;
				if(hasAcceptableSize(FBZ_cur.node, iurl)) {
					setStatus(false);
					return;
				}
				if(xhr) {
					downloadImage(iurl, url);
				} else {
					setPreview(iurl);
					checkProgress(true);
				}
			} catch(ex) {
				showError(ex);
			}
		},
		onerror:showError
	});
}

function downloadImage(url, referer) {
	FBZ_cur.req = GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		overrideMimeType:'text/plain; charset=x-user-defined',
		headers: {'Accept':'image/png,image/*;q=0.8,*/*;q=0.5','Referer':referer},
		onload: function(req) {
			try {
				delete FBZ_cur.req;
				var txt = req.responseText;
				var ui8 = new Uint8Array(txt.length);
				for(var i = txt.length; i--;) {
					ui8[i] = txt.charCodeAt(i);
				}
				var b = new (window.MozBlobBuilder || window.WebKitBlobBuilder)();
				b.append(ui8.buffer);
                setPreview((window.URL || window.webkitURL).createObjectURL(b.getBlob()));
				checkProgress(true);
			} catch(ex) {
				showError(ex);
			}
		},
		onerror:showError
	});
}

function parseHtml(html, q, url) {
	if(typeof q == 'function') return q(html);
	var doc, node, path;
	html = html.replace(/\s+href\s*=\s*/g, ' data-href=');
	try {
		doc = GM_safeHTMLParser(html);
	} catch(ex) {
		doc = FBZ_d.implementation.createHTMLDocument('MPIV');
		doc.documentElement.innerHTML = html;
	}
	if(typeof q == 'string') {
		node = doc.querySelector(q);
	} else {
		for(var i = 0, len = q.length; i < len; i++) {
			if(node = doc.querySelector(q[i])) break;
		}
	}
	if(!node) throw 'Node not found: ' + q;
	switch(node.tagName.toUpperCase()) {
		case 'IMG':
			path = node.getAttribute('src').trim();
			break;
		case 'A':
			path = node.getAttribute('data-href').trim();
			break;
		default:
			path = node.outerHTML.match(/https?:\/\/[.\/a-z0-9_+%-]+\.(jpe?g|gif|png|svg)/i)[0];
	}
	return rel2abs(path, html.match(/<base[^>]+href=["']([^>]+)["']/i) ? RegExp.$1 : url);
}

function checkProgress(start) {
	if(start === true) {
		window.clearInterval(checkProgress.interval);
		checkProgress.interval = window.setInterval(checkProgress, 150);
		return;
	}
	var img = getPreview();
	if(!img) return window.clearInterval(checkProgress.interval);
	if(img.naturalHeight) {
		setStatus(false);
		window.clearInterval(checkProgress.interval);
		img.style.display = '';
		placePreview();
		if(img.naturalWidth > img.clientWidth || img.naturalHeight > img.clientHeight) {
			img.style.cursor = 'all-scroll';
			FBZ_cur.node.style.cursor = 'all-scroll';
		}
	}
}

function placePreview() 
{
	var img = getPreview();
	if(!img) 
		return;
		
	if(typeof FBZ_cur.pw == 'undefined') {
		var s = window.getComputedStyle(img);
		FBZ_cur.pw = parseInt(s.getPropertyValue('padding-right'), 10) + parseInt(s.getPropertyValue('padding-left'), 10);
		FBZ_cur.bw = parseInt(s.getPropertyValue('border-right-width'), 10) + parseInt(s.getPropertyValue('border-left-width'), 10);
		FBZ_cur.ph = parseInt(s.getPropertyValue('padding-top'), 10) + parseInt(s.getPropertyValue('padding-bottom'), 10);
		FBZ_cur.bh = parseInt(s.getPropertyValue('border-top-width'), 10) + parseInt(s.getPropertyValue('border-bottom-width'), 10);
		FBZ_cur.mh = parseInt(s.getPropertyValue('margin-top'), 10) + parseInt(s.getPropertyValue('margin-bottom'), 10);
		FBZ_cur.mw = parseInt(s.getPropertyValue('margin-right'), 10) + parseInt(s.getPropertyValue('margin-left'), 10);
	}
	var cw = FBZ_cur.cw, ch = FBZ_cur.ch;

	if(FBZ_cur.zoom) 
	{
		var cx = FBZ_cur.cx, cy = FBZ_cur.cy, w = FBZ_cur.scale*img.naturalWidth, h = FBZ_cur.scale*img.naturalHeight, nw = w + FBZ_cur.pw + FBZ_cur.bw, nh = h + FBZ_cur.ph + FBZ_cur.bh;
		img.style.maxWidth  = 'none';
		img.style.maxHeight = 'none';
		img.style.width  = w + 'px';
		img.style.height = h + 'px';
		img.style.left = (cw > nw ? cw/2 - nw/2 : -1 * Math.min(1, Math.max(0, 5/3*(cx/cw-0.2))) * (nw - cw)) - FBZ_cur.mw/2 + 'px';
		img.style.top  = (ch > nh ? ch/2 - nh/2 : -1 * Math.min(1, Math.max(0, 5/3*(cy/ch-0.2))) * (nh - ch)) - FBZ_cur.mw/2 + 'px';
	} 
	else 
	{
		var r = FBZ_cur.rect, rx = (r.left + r.right) / 2, ry = (r.top + r.bottom) / 2;
		img.style.maxWidth  = cw - FBZ_cur.pw - FBZ_cur.bw - FBZ_cur.mw + 'px';
		img.style.maxHeight = ch - FBZ_cur.ph - FBZ_cur.bh - FBZ_cur.mh + 'px';				
		//John Doe		
		var nnn = FBZ_cur.node.naturalHeight, ccc = FBZ_cur.node.clientHeight;
			//GM_log("img.clientHeight="+img.clientHeight+",img.naturalHeight="+img.naturalHeight +",img.clientWidth="+ img.clientWidth +",img.naturalWidth="+ img.naturalWidth+",nnn="+nnn+",ccc="+ccc);
			//if(nnn*1.3<img.naturalHeight || ccc*1.3<img.naturalWidth || img.naturalHeight < 200 || img.clientWidth < 200)
		if( FBZ_cur.url.indexOf("ytimg.com") != -1 ) // make YouTube Images Bigger
		{
			//GM_log("special zoom");
			FBZ_cur.scale = FBZ_cur.minScale = img.naturalWidth > img.clientWidth || img.naturalHeight > img.clientHeight ? 1 : 2;
			var ww = FBZ_cur.scale*img.naturalWidth, hh = FBZ_cur.scale*img.naturalHeight;
			img.style.width  = ww + 'px';
			img.style.height = hh + 'px';
		}
		//John Doe		
		else
		{
			img.style.width  = 'auto';
			img.style.height = 'auto';
			//GM_log("img.style.width="+img.style.width+",img.clientWidth="+img.clientWidth);
		}
		var w = img.clientWidth, h = img.clientHeight;
		var x = Math.min(cw - w - FBZ_cur.bw - FBZ_cur.mw, Math.max(0, r.left + (w && rx > cw/2 ? -w -20 : r.width  + 20)));
		var y = Math.min(ch - h - FBZ_cur.bh - FBZ_cur.mh, Math.max(0, r.top  + (h && ry > ch/2 ? -h -20 : r.height + 20)));
		if(h < ch - 80 && (x > r.right || x + w < r.left)) {
			y = Math.min(Math.max(ry - h/2, 40), ch - h - 40);
		} else if(w < cw - 80 && (y > r.bottom || y + h < r.right)) {
			x = Math.min(Math.max(rx - w/2, 40), cw - w - 40);
		}
		// John Doe - align to right
		//img.style.left = x + 'px';
		//img.style.top  = y + 'px';
		img.style.right = '0px'; 
		img.style.top  = '0px';
		// John Doe
	}
}

function placeStatus() {
	var img = getStatus();
	if(img) {
		img.style.left = FBZ_cur.cx + 30 + 'px';
		img.style.top  = FBZ_cur.cy + 30 + 'px';
	}
}

function toggleZoom() {
	var img = getPreview();
	if(!img || !img.naturalHeight) return;
	img.style.cursor = '';
	FBZ_cur.node.style.cursor = '';
	FBZ_cur.zoom = !FBZ_cur.zoom;
	FBZ_cur.scale = FBZ_cur.minScale = img.naturalWidth > img.clientWidth || img.naturalHeight > img.clientHeight ? 1 : 2;
	placePreview();
	return FBZ_cur.zoom;
}

function showError(o) {
	setStatus('error');
	if(!o.responseText && !o.target) 
		GM_log(o);
}

function getStatus() 
{	
	//return $('mpiv-status');
	return FBZ_d.getElementById('mpiv-status');
}

function setStatus(status) {
	var img = getStatus();
	if(!img && !status) return;
	if(!img) {
		img = FBZ_d.createElement('img');
		img.id = 'mpiv-status';
		img.style.cssText = 'display:none;border:1px solid black;background-color:white;position:fixed;z-index:300000;margin:0';
		FBZ_d.body.appendChild(img);
	}
	if(status) {
		var srcs = {
			loading:'data:image/gif;base64,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',
			xhr:'data:image/gif;base64,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',
			error:'data:image/gif;base64,R0lGODlhKAAoAOYAANssLOyZmZkDA/oBAbUBAeVqavO2ttgZGffX1/xra+kAAMwzM7apqcYZGdZqavWiov3//+d5efh7e7sjI/hdXfrq6twBAdtAQPf+/qmmpsGcnMSzs65VVeywsOxTU/WLi3onJ9BdXYQtLfWUlHk0NOBGRuY6OpyWlssBAeuMjMC7u++lpe5KSuJbW/H29vTLy/TExOZNTdjLy8EAAOQrK/Cqqr65uc0PD6oTE6grK+xCQuSEhLIZGd08PKAVFbMREZIoKOMzM6KTk8whIfrDw4Q1NW41NawBAX1hYaQNDe3y8rSWlsm0tPf5+cUrK/r8/P719Y1oaJk5Oa1/f99LS+ozM94ICMCZmfn8/NQ1Nfv///JOTs0uLrF8fLwWFq0fH/75+ZV9fek9PeqHh6lhYbOamtE6OqEbG7ANDevv74h0dNk2NtQAANa7u8MhIaEAAPf//62CgrCFhc2vr81UVOhiYt5TU+7BwcIJCc0ICMtISItcXO83N8e/v+OgoP///yH5BAAAAAAALAAAAAAoACgAAAf/gH+Cg4SFhoeIiYqLjItKLo2GaZCRWAxRUX2RgnBXHBxzjVgnIHl4IgyRGF0/fDQ/V4sQJyJWAwp5qIxwrGIlHjqwEIhNJyQWAwYrVjeow4hYXTxVay8rOsFXz4TFJLYjgikWzQzbhBhTPEFcd2BgAVsswoQQDCDII00ICFA740DlCq3CQWNIByj7KoygsOVHG0JpkOQZMKLCCxgwXlSIwOYGQEJw0gFw46cCxowIRiSowgHLICVR8AyQgMCATZsIHKA4AHAYljhfAHgJUPOmgTsfEtAg43KQCiMTE9ypsYJqDSIOZvBkoEVO0B87iKyoWrVDBApicMgo9CQD1AF1/zoEmDvXQAgCB6TsyTEETQQDdOeuKEDBBA4m5gRBcDvRQ4AUYyKneECHwJAvQ5I4eBBZcoo6WwxvSEyI8YAYKSKoVv1BT5LMIT6sVr3DTmgfG2RlIJFHwYUIBYIHl2BGAB0JwoXrYWECd6PFJG4oWFOghXXrdezUuX7dzIUgziNBv2EBgB0q6NF7SE8lRowFPcCP3iQogwjyQ0r02M+/v5M18tE3SD1FNIBCA0EAoOCCCrrBRRY5MCFgIWoAcQBeB2So4QEN8KBDElNMOIgWQliIwgwEpHjEimj8wAMPXPTwhQakMfJEiQdYMAOKR7whwI9J4MDDBBNkkRaN9GEhhP8IOZ7I4xs+ChDkkBM4cYEOaCApihAgWKEAG04S0GOUUxLphBMlYKmlIk+Q4qUFYO4oJpQ+llnlAmYAk2WNg7TZ5QAWwBlmj17QgIYAQpqJ5wUesLAnIn7aokCgcaL4xg1D+ADAD0lQ6cSiJVDgqAZaGFLMnwpMKuiOR2AqRRg5CIWDot6VEEMCo5ZKiD3I3KJqnARgKoIKWpRxRhBuDPlprTF4kMAWaDw0SEQT+frriVYMIYINihkbhBN3MusBBRLw0dJLSMhkLaUoZFsEtwMu4cM6E4DaLLlLPTGgDUaomyqlVrhRhAqGaLHEGSZk4YS4CaS1FiFtGXGDr4Fa0cBbu4gY7IMYPSxwga0JiFajWxNPqkADJBCcCARL4OCLGaE2l1siJA8wgBcpM2JwEjqM25yEi+zmBQ85N7JzFTScATQjfagRxsORaMEEGWRA3YgL+k7YRBMidp1IIAA7'
		};
		img.src = srcs[status];
		img.setAttribute('status', status);
		img.style.display = '';
	} else {
		img.parentNode.removeChild(img);
	}
}

function getPreview() 
{	
	return FBZ_d.getElementById('mpiv-preview');
	//return $('mpiv-preview');
}

function setPreview(src) {
	var img = getPreview();
	if(!img && !src) return;
	if(!img) {
		img = FBZ_d.createElement('img');
		img.id = 'mpiv-preview';
		img.style.cssText = 'display:none;border:1px solid #CCCCCC;background-color:white;position:fixed;z-index:300000;margin:0;cursor:default;' + cfg.css;
		img.addEventListener('error', showError, false);
		FBZ_d.body.appendChild(img);
	}
	if(src) {
		img.src = src;
		img.style.display = 'none';
	} else {
		FBZ_cur.zoom = false;
		img.removeEventListener('error', showError, false);
		img.parentNode.removeChild(img);
		if(FBZ_cur.node) FBZ_cur.node.style.cursor = '';
	}
}

function parseUrls(url) {
	var end  = url.length - 1;
	var urls = [];
	if(url.charAt(end) == '#') return urls;
	while(true) {
		var pos = url.lastIndexOf('http', end);
		if(pos == 0 && urls.length == 0) {
			urls.push(url);
			break;
		}
		if(pos == -1) break;
		if(/https?:\/\/[^&]+/.exec(url.substring(pos, end + 1))) {
			urls.push(RegExp.lastMatch);
		}
		if(pos == 0) break;
		end = pos - 1;
	}
	return urls;
}

function arrayMatch(a, re) {
	for(var i = a.length; i--;) {
		var m = re.exec(a[i]);
		if(m) return m;
	}
	return false;
}

function rel2abs(rel, abs) {
	if(rel.indexOf('//') == 0) rel = 'http:' + rel;
	var re = /^([a-z]+:)?\/\//;
	if(re.test(rel))  return rel;
	if(!re.exec(abs)) return false;
	if(rel[0] == '/') return abs.substr(0, abs.indexOf('/', RegExp.lastMatch.length)) + rel;
	return abs.substr(0, abs.lastIndexOf('/')) + '/' + rel;
}

function replace(s, m) {
	for(var i = m.length; i--;) {
		s = s.replace('$'+i, m[i]);
	}
	return s;
}

function hasBg(node) {
	if(!node) return false;
	return window.getComputedStyle(node).getPropertyValue('background-image') != 'none';
}

function hasAcceptableSize(node, url) 
{
	if(!(node.tagName == 'IMG' || (node = node.querySelector('img')))) return false;
	var n = node.naturalHeight, c = node.clientHeight;
	// John Doe
	if(location.href.indexOf("facebook.com") != -1)
		return false;
	else
		return node.src == url && (c >= n || !cfg.img && n > c);	
	// John Doe
}

function setup() {
	//if($('mpiv-setup')) 
	if( FBZ_d.getElementById('mpiv-setup') )
		return;
	GM_addStyle('\
		#mpiv-setup { position:fixed;z-index:300001;top:40px;right:40px;padding:20px 30px;background:white;width:550px;border:1px solid black; }\
		#mpiv-setup * { color:black;text-align:left;line-height:normal;font-size:12px;font-family:sans-serif; }\
		#mpiv-setup a { color:black;text-decoration:underline; }\
		#mpiv-setup div { text-align:center;font-weight:bold;font-size:14px; }\
		#mpiv-setup ul { margin:15px 0 15px 0;padding:0;list-style:none;background:white;border:0; }\
		#mpiv-setup input { border:1px solid gray;padding:1px;background:none;position:relative;bottom:-2px; }\
		#mpiv-setup-context:not(:checked) + p { display:none; }\
		#mpiv-setup input[type=text] { width:50px; }\
		#mpiv-setup li { margin:0;padding:6px 0;vertical-align:middle;background:white;border:0 }\
		#mpiv-setup p { background:white;color:gray;padding:2px 0; margin:0; }\
		#mpiv-setup textarea { height:100px;width:100%;font-size:11px;font-family:monospace;background:none;border:1px solid gray;padding:1px; }\
		#mpiv-setup #mpiv-setup-css { height:30px; }\
		#mpiv-setup button { width:150px;margin:0 10px;text-align:center; }\
	');
	var div = FBZ_d.createElement('div');
	div.id = 'mpiv-setup';
	FBZ_d.body.appendChild(div);
	div.innerHTML = '<div>Mouseover Popup Image Viewer</div><ul><li>Popup delay: <input id="mpiv-setup-delay" type="text"/> ms</li><li><input type="checkbox" id="mpiv-setup-thumbsonly"> Allow popup over text-only links (e.g. headlines)</li><li><input type="checkbox" id="mpiv-setup-img"> Allow popup over images that have been scaled down in HTML</li><li><input type="checkbox" id="mpiv-setup-greedy"> Prefer medium-sized images (IMDb, Google user content)</li><li><input type="checkbox" id="mpiv-setup-context"> Use right mouse button to activate zoom (in addition to shift)<p>To open context menu: Right-click before popup is shown or hold down shift while right-clicking.</p></li><li>Custom CSS for preview image (units in px):<textarea id="mpiv-setup-css" spellcheck="false"></textarea></li><li>Write own host rules using regular expressions and CSS selectors:<p>Format: {"r":"urlpattern", "s":"urlsubstitution", "q":"selector", "xhr":true, "html":true}<br>One rule per line. No trailing commas. Escape backslashes. Omit unneeded properties.</p><textarea id="mpiv-setup-hosts" spellcheck="false"></textarea></li></ul><div><button id="mpiv-setup-ok">Save settings</button><button id="mpiv-setup-cancel">Cancel</button></div>';
	div = null;
	var close = function() 
	{ 		
		//var div = $('mpiv-setup'); 
		var div = FBZ_d.getElementById('mpiv-setup');
		div.parentNode.removeChild(div); 
	};


	//$('mpiv-setup-ok').addEventListener('click', function() {
	FBZ_d.getElementById('mpiv-setup-ok').addEventListener('click', function() {
		//var delay = parseInt($('mpiv-setup-delay').value, 10);
		var delay = parseInt(FBZ_d.getElementById('mpiv-setup-delay').value, 10);		
		if(!isNaN(delay) && delay >= 0) GM_setValue('delay', cfg.delay = delay);
		GM_setValue('thumbsonly', cfg.thumbsonly = !FBZ_d.getElementById('mpiv-setup-thumbsonly').checked);
		GM_setValue('greedy', cfg.greedy = !FBZ_d.getElementById('mpiv-setup-greedy').checked);
		GM_setValue('img', cfg.img = !!FBZ_d.getElementById('mpiv-setup-img').checked);
		GM_setValue('context', cfg.context = !!FBZ_d.getElementById('mpiv-setup-context').checked);
		GM_setValue('css', cfg.css = FBZ_d.getElementById('mpiv-setup-css').value.trim());
		GM_setValue('FBZ_hosts', cfg.FBZ_hosts = FBZ_d.getElementById('mpiv-setup-hosts').value.trim());
		loadHosts();
		close();
	}, false);
	FBZ_d.getElementById('mpiv-setup-cancel').addEventListener('click', close, false);
	FBZ_d.getElementById('mpiv-setup-delay').value = cfg.delay;
	FBZ_d.getElementById('mpiv-setup-thumbsonly').checked = !cfg.thumbsonly;
	FBZ_d.getElementById('mpiv-setup-greedy').checked = !cfg.greedy;
	FBZ_d.getElementById('mpiv-setup-img').checked = cfg.img;
	FBZ_d.getElementById('mpiv-setup-context').checked = cfg.context;
	FBZ_d.getElementById('mpiv-setup-css').value = cfg.css;
	FBZ_d.getElementById('mpiv-setup-hosts').value = cfg.FBZ_hosts;
}
FBZ_d.body.addEventListener('mouseover', onMouseOver, false);
//---------------------------------------------------------------------
// deleted by John Doe
//GM_registerMenuCommand('Set up Mouseover Popup Image Viewer', setup);
// deleted by John Doe
//---------------------------------------------------------------------
function FBZ_toggleScript()
{		
	var FBZ_ScriptEnable = GM_getValue("FBZ_ScriptEnable",true);
	FBZ_ScriptEnable = !FBZ_ScriptEnable;
	GM_setValue("FBZ_ScriptEnable",FBZ_ScriptEnable);
	window.location.reload();
}
function FBZ_toggleItemDisplay(item)
{
	if( ! item.style.display || item.style.display == "" )
	{				
		item.style.display = "none";					
	} 
	else
	{
		item.style.display = "";	
	}
}
//---------------------------------------------------------------------
function FBZ_addSideBarBanner()
{
	var FBZ_SideBarBanner = document.getElementById("FBZ_SideBarBanner");
	if(FBZ_SideBarBanner)
		return;
	var FBZ_ScriptEnable = GM_getValue("FBZ_ScriptEnable",true);
	if(FBZ_ScriptEnable)
		FBZ_ScriptEnable_str = "Disable";
	else
		FBZ_ScriptEnable_str = "Enable";
	//--------------------
	var FBZ_div = document.createElement("div");
	FBZ_div.id = "FBZ_SideBarBanner";
	FBZ_div.setAttribute("class","");
	//innerHTML_str	
	var	FBZ_like_button = '<iframe src="//www.facebook.com/plugins/like.php?href='+FBZ_like_url+'&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=243212289037659" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe>';
	var FBZ_menu_str = "<div id='FBZ_SideBarBanner_Menu' style='display:none'>"+
	"<BR>&nbsp;<a STYLE='text-decoration:underline' onClick='FBZ_toggleScript();'>"+FBZ_ScriptEnable_str+"&nbsp;"+FBZ_AppName+"</a> <BR>"+	
	"&nbsp;<a STYLE='text-decoration:underline' target='_blank' href='http://download.cnet.com/Facebook-Zoom/3000-12941_4-75744517.html#rateit'>Rate/Review</a><BR>"+
	"&nbsp;<a STYLE='text-decoration:underline' href='mailto:feedback@pc-gizmos.com?subject=Feedback%20on%20Facebook%20Zoom&body=I%20use%20Facebook%20Zoom%20and%20my%20Feedback%20is...'>Feedback</a><BR>"+
	"&nbsp;<a STYLE='text-decoration:underline' href='mailto:myfriend@example.com?subject=I%20really%20liked%20Facebook%20Zoom&body=Hi%20,%0D%0A%0AI%20am%20using%20Facebook%20Zoom,%20it%20changed%20my%20whole%20FB%20experience.%0D%0A%0A%20You%20can%20download%20it%20too%20at%20http%3A%2F%2Fdownload.cnet.com%2FFacebook-Zoom%2F3000-12941_4-75744517.html%20.'>Send to a friend</a><BR>"+
	"&nbsp;<a STYLE='text-decoration:underline' target='_blank' href='http://download.cnet.com/windows/pc-gizmos/3260-20_4-10209477.html'>Other Gizmos</a><BR>"+
	"&nbsp;<a STYLE='text-decoration:underline' target='_blank' href='http://download.cnet.com/windows/pc-gizmos/3260-20_4-10209477.html'>About</a><BR>"+
	"Tips:<BR>When the image is previewed/zoomed click 'SHIFT' to enlarge Zoomed photos even more and then mouse scroll.<BR>Press [t] to open the image in new tab.<BR>Press [p] to pause zoom on a specific photo.<BR><BR>"+"</div>" ;	
	var FBZ_innerHTML_str = "<BR><a onclick='FBZ_toggleItemDisplay(document.getElementById(\"FBZ_SideBarBanner_Menu\"));'>"+FBZ_AppName+" Menu</a>" + "<BR>" + FBZ_menu_str + FBZ_like_button;	
	FBZ_div.innerHTML = FBZ_innerHTML_str;
	//----
	/*
	var appsNav = document.getElementById("appsNav");
	if(appsNav)
	{
		appsNav.appendChild(FBZ_div);
	}*/
	//-----------------------
	var sideNav = document.getElementById("sideNav"); // facebook.com
	if(sideNav)
	{		
		sideNav.insertBefore(FBZ_div,sideNav.childNodes[0]);
	}
	//-----------------------
	if ( location.href.indexOf("pinterest.com") != -1 )
	{
		var Header = document.getElementById("Header");
		if(Header)
		{	
			var FBZ_div_pin = document.createElement("div");
			FBZ_div_pin.id = "FBZ_SideBarBanner";
			FBZ_div_pin.innerHTML = '<div style="color:#DF4952;"><BR><table><tr><td>&nbsp; Like Pinterest Zoom: &nbsp;</td><td><iframe scrolling="no" frameborder="0" src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fdownload.cnet.com%2FFacebook-Zoom%2F3000-12941_4-75744517.html&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=243212289037659" style="border:none; overflow:hidden; width:100px; height:21px;" allowtransparency="true">&lt;/span&gt;</iframe></td></tr></table></div>';
			Header.appendChild(FBZ_div_pin);
		}
		// add menu
		var Navigation = document.getElementById("Navigation");
		if(Navigation)
		{
			var menu = document.createElement("li");
			menu.innerHTML = '<a class="nav" href="">Zoom Menu<span></span></a> \
							<ul> \
								<li><a onClick="FBZ_toggleScript();" href="">'+FBZ_ScriptEnable_str+' Zoom</a></li> \
								<li class="divider"><a target="_blank"  href="http://download.cnet.com/Pinterest-Zoom/3000-12941_4-75813229.html#rateit">Rate/Review</a></li> \
								<li ><a target="_blank" href="mailto:feedback@pc-gizmos.com?subject=Feedback%20on%20Pinterest%20Zoom&body=I%20use%20Pinterest%20Zoom%20and%20my%20Feedback%20is...">Feedback</a></li> \
								<li ><a target="_blank" href="mailto:myfriend@example.com?subject=I%20really%20liked%20Pinterest%20Zoom&body=Hi%20,%0D%0A%0AI%20am%20using%20Pinterest%20Zoom,%20it%20changed%20my%20whole%20Pinterest%20experience.%0D%0A%0A%20You%20can%20download%20it%20too%20at%20http%3A%2F%2Fdownload.cnet.com%2FPinterest-Zoom%2F3000-12941_4-75813229.html%20.">Send to a friend</a></li> \
								<li class="divider"><a target="_blank" href="http://download.cnet.com/windows/pc-gizmos/3260-20_4-10209477.html">Other Gizmos</a></li> \
							</ul>'; // cnet.com%2FPinterest-Zoom%2F3000-12941_4-75813229.html
			Navigation.insertBefore(menu, Navigation.firstChild);	
		}
	}
	//-----------------------
	if ( location.href.indexOf(".google.") != -1 && location.href.indexOf("tbm=isch") != -1)
	{
		var ab_ctls = document.getElementById("ab_ctls");
		if(ab_ctls)
		{				
			var FBZ_div_google = document.createElement("li");
			FBZ_div_google.id = "FBZ_SideBarBanner";
			FBZ_div_google.setAttribute("class","ab_ctl"); //&nbsp;|&nbsp;
			var FBZ_like_button = '<div style="color:#222222;"><BR><table><tr><td style="color:#DD4B39;font-weight:bold">Like Google Zoom: &nbsp;</td><td><iframe scrolling="no" frameborder="0" src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fdownload.cnet.com%2FGoogle-Zoom%2F3000-2381_4-75813228.html&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=243212289037659" style="border:none; overflow:hidden; width:100px; height:21px;" allowtransparency="true">&lt;/span&gt;</iframe></td><td><a style="text-decoration: underline" onclick="FBZ_toggleItemDisplay(document.getElementById(\'FBZ_SideBarBanner_Menu\'));">Zoom Menu</a><td></tr></table></div>';
			var FBZ_menu_str = "<div id='FBZ_SideBarBanner_Menu' style='display:none'>"+
			"<BR>&nbsp;<a STYLE='text-decoration:underline' onClick='FBZ_toggleScript();'>"+FBZ_ScriptEnable_str+"&nbsp;Google Zoom</a> <BR>"+	
			"&nbsp;<a STYLE='text-decoration:underline' target='_blank' href='http://download.cnet.com/Google-Zoom/3000-2381_4-75813228.html#rateit'>Rate/Review</a><BR>"+
			"&nbsp;<a STYLE='text-decoration:underline' href='mailto:feedback@pc-gizmos.com?subject=Feedback%20on%20Google%20Zoom&body=I%20use%20Google%20Zoom%20and%20my%20Feedback%20is...'>Feedback</a><BR>"+
			"&nbsp;<a STYLE='text-decoration:underline' href='mailto:myfriend@example.com?subject=I%20really%20liked%20Google%20Zoom&body=Hi%20,%0D%0A%0AI%20am%20using%20Google%20Zoom,%20it%20changed%20my%20whole%20Google%20experience.%0D%0A%0A%20You%20can%20download%20it%20too%20at%20http%3A%2F%2Fdownload.cnet.com%2FGoogle-Zoom%2F3000-2381_4-75813228.html%20.'>Send to a friend</a><BR>"+
			"&nbsp;<a STYLE='text-decoration:underline' target='_blank' href='http://download.cnet.com/windows/pc-gizmos/3260-20_4-10209477.html'>Other Gizmos</a>";
			FBZ_div_google.innerHTML = FBZ_like_button + FBZ_menu_str;
			ab_ctls.insertBefore(FBZ_div_google,ab_ctls.firstChild);				
		}		
	}
	//-----------------------
}
//---------------------------------------------------------------------
/*
function FBZ_addFooterBanner()
{
	//--------------------
	var FBZ_FooterBanner = document.getElementById("FBZ_FooterBanner");
	if(FBZ_FooterBanner)
		return;
	var pageFooter = document.getElementById("pageFooter");
	if(pageFooter && pageFooter.innerHTML.indexOf("Facebook Zoom") != -1 )
		return;
	//--------------------	
	var FBZ_ScriptEnable = GM_getValue("FBZ_ScriptEnable",true);
	if(FBZ_ScriptEnable)
		FBZ_ScriptEnable_str = "Disable";
	else
		FBZ_ScriptEnable_str = "Enable";
	//--------------------
	var FBZ_div = document.createElement("div");
	FBZ_div.id = "FBZ_FooterBanner";
	var	FBZ_like_button = '<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fdownload.cnet.com%2FFacebook-Zoom%2F3000-12941_4-75744517.html&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=21&amp;appId=243212289037659" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe>';
	var FBZ_banner_str = 
	"<HR><BR><BR><div style='background-color:white; border:solid 1px; border-color:#A9B5D3'>&nbsp;Facebook Zoom - you'll never look at your friends in the same way again!<BR><BR>" +
	"&nbsp;When the image is previewed/zoomed click 'SHIFT' to enlarge Zoomed photos even more.<BR><BR>" +
	"&nbsp;<a STYLE='text-decoration:underline' onClick='FBZ_toggleScript();'>"+FBZ_ScriptEnable_str+"&nbsp;Facebook Zoom</a> <BR><BR>"+
	
	"<table><tr><td>Like Facebook Zoom :</td><td>&nbsp;&nbsp;"+FBZ_like_button+"</td><td>"+
	",&nbsp;<a STYLE='text-decoration:underline' href='mailto:feedback@pc-gizmos.com?subject=Feedback%20on%20Facebook%20Zoom&body=I%20use%20Facebook%20Zoom%20and%20my%20Feedback%20is...'>Feedback</a>"+
	"</td><td> or <a STYLE='text-decoration:underline' href='mailto:myfriend@example.com?subject=I%20really%20liked%20Facebook%20Zoom&body=Hi%20,%0D%0A%0AI%20am%20using%20Facebook%20Zoom,%20it%20changed%20my%20whole%20FB%20experience.%0D%0A%0A%20You%20can%20download%20it%20too%20at%20http%3A%2F%2Fdownload.cnet.com%2FFacebook-Zoom%2F3000-12941_4-75744517.html%20.'>Send to a friend</a>&nbsp;.</td></tr></table><BR>"+
	"</div><BR>";
	FBZ_div.innerHTML = FBZ_banner_str;
	FBZ_div.style.color = '#3B5998';
	FBZ_div.style.fontWeight = 'bold'
	//--------------------
	var pageFooter = document.getElementById("pageFooter");
	if(pageFooter)
	{
		pageFooter.appendChild(FBZ_div);
	}
	//--------------------		
}*/
//---------------------------------------------------------------------
FBZ_addSideBarBanner();
//FBZ_addFooterBanner();
//---------------------------------------------------------------------