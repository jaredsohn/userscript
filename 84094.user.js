// ==UserScript==
// @name           Google Imagenes Pro-Plus! 
// @namespace      http://userscripts.org/users/JuampiMix
// @author         Juampi_Mix
// @version        4.0.5
// @icon           http://s3.amazonaws.com/uso_ss/icon/84094/large.png?1282336651
// @description    Agrega vista previa mejorada de las imagenes. Click Central del raton abre la imagen real, Click normal sobre la imagen, inicia la visualizacion con GreaseLigthbox.
// @url            http://userscripts.org/scripts/show/84094
// @include        http*://*google.com.*/*
// @history        4.0.5 Añadido codigo para desactivar SafeSearch. 
// @history        4.0.4 Añadido antiredirector de google, para que muestre los enlaces directos en los resultados de las busquedas. 
// @history        4.0.3 Retoque para que funcione solo en Google.com 
// @history        4.0.2 Pequeño retoque (me acorde de realizarlos luego que acutalice a la version 4.0.1)
// @date           28/06/2013
// @svc:version    [4.0.5]
// @uso:script     SCRIPT-ID
// ==/UserScript==


/////////////////////////////////////////////////////////////////////
/////////////// Volver todo al viejo Google imagenes ////////////////
/////////////////////////////////////////////////////////////////////

(function () {

if ((/q=/).test(document.location.href)) {
	if (!(/&sout=1/).test(document.location.href)) {
		window.location = window.location + "&safe=off" +"&sout=1";
	}
}
})();
/////////////////////////////////////////////////////////////////////
//////////////////////// IMAGENES PLUS /////////////////////////////
///////////////////////////////////////////////////////////////////
function getLeftPosn(object) {
   var leftPos = object.offsetLeft;

   while (object.offsetParent !== null) {
      object = object.offsetParent;
      leftPos += object.offsetLeft;
   }

   return leftPos;
}

function removeBigImage(event) {
   var bigImage, parentSpan;

   bigImage = event.currentTarget;
   parentSpan = bigImage.parentNode;

   bigImage.removeEventListener('error', removeBigImage, false);

   parentSpan.removeChild(bigImage);
   parentSpan.parentNode.removeChild(parentSpan);
}


var ENLARGER_ENABLED = GM_getValue('ENLARGER_TOGGLE', 'true'); 
var LEFT_RIGHT_MARGIN = 8;
var TOP_BOTTOM_MARGIN = 3;
var LITTLE_IMG_BORDER = 1;
var BIG_IMG_BORDER = 2;
var SPAN_BORDER = 3;

var allLinks, thisLink;
var ii;
var regExpMatches, imageURI;
var newSpan, bigImage;
var href;
var maxWidth, maxHeight;
var newWidth, newHeight, ratio;
var littleImage;
var spaceLeft, spaceRight, rightPosn, spanWidth;


GM_addStyle('a.thumbnail span {visibility:hidden; position:fixed; z-index:10000; border:'+SPAN_BORDER+'px solid #3B5998};');
GM_addStyle('a.thumbnail:hover span {visibility:visible;};');
GM_addStyle('a.thumbnail img {border:'+BIG_IMG_BORDER+'px solid white; vertical-align:bottom};');

allLinks = document.evaluate('//A[contains(@href,"/imgres?imgurl=")][contains(@href,"&imgrefurl=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

maxHeight = window.innerHeight - 2*(TOP_BOTTOM_MARGIN + SPAN_BORDER + BIG_IMG_BORDER);

enlarger_gim (allLinks);

function enlarger_gim(enl_allLinks) {
	for (ii = 0; ii < enl_allLinks.snapshotLength; ii++) {
	   thisLink = enl_allLinks.snapshotItem(ii);
	   thisLink.className = 'thumbnail ' + thisLink.className;

	   href = thisLink.href;
	   regExpMatches = href.match(/\&w\=(.*?)\&sz\=/);
	   newWidth = parseInt(regExpMatches[1]);
	   regExpMatches = href.match(/\&h=(.*?)\&w\=/);
	   newHeight = parseInt(regExpMatches[1]);

	   newSpan = document.createElement('SPAN');
	   thisLink.appendChild(newSpan);

	   littleImage = thisLink.getElementsByTagName("IMG")[0];
	   spaceLeft = getLeftPosn(littleImage);
	   rightPosn = spaceLeft + littleImage.width + (2*LITTLE_IMG_BORDER);
	   spaceRight = document.body.clientWidth - rightPosn;
	   maxWidth = Math.max(spaceLeft, spaceRight);
	   maxWidth = maxWidth - 2*(LEFT_RIGHT_MARGIN + SPAN_BORDER + BIG_IMG_BORDER);

	   if (newWidth > maxWidth) {
		 ratio = (maxWidth/newWidth);
		 newWidth *= ratio;
		 newHeight *= ratio;
	   }
	   if (newHeight > maxHeight) {
		 ratio = (maxHeight/newHeight);
		 newWidth *= ratio;
		 newHeight *= ratio;
	   }

	   spanWidth = newWidth + 2*(BIG_IMG_BORDER + SPAN_BORDER);
	   if (spaceRight >= spaceLeft) {
		 newSpan.style.right = (spaceRight - spanWidth + LEFT_RIGHT_MARGIN) + 'px';
	   }
	   else {
		 newSpan.style.left = (spaceLeft - spanWidth - LEFT_RIGHT_MARGIN) + 'px';
	   }

	   newSpan.style.bottom = ((maxHeight - newHeight)/2) + TOP_BOTTOM_MARGIN + 'px';

	   regExpMatches = href.match(/\/imgres\?imgurl\=(.*?)\&imgrefurl\=/);
	   imageURI = decodeURI(regExpMatches[1]);

	   bigImage = document.createElement('IMG');
	   bigImage.width = newWidth;
	   bigImage.height = newHeight;
	   bigImage.src = imageURI;
	   newSpan.appendChild(bigImage);

	   bigImage.addEventListener('error', removeBigImage, false);
	}

}





(function()

{


function pointLinksToImages()

{

            ImgElements = document.body.getElementsByTagName("a");

            if(ImgElements)

            {

                        for(i=0;i<ImgElements.length;i++)

                        {

                                   if(ImgElements[i].href.indexOf("/imgres?imgurl=") != -1 &&

                                      ImgElements[i].href.indexOf("&imgrefurl=") != -1)

                                      {

                                  

                                                           /*var gmatch = null;

                                                           var target = ImgElements[i].getAttribute("target");

                                                           if (!target) {

                                                                       target = "";

                                                           }*/

                                                                      

                                                           var originPage = null;

                                                           gmatch = ImgElements[i].href.match(/\&imgrefurl\=(.*?)\&/);

                                                           if (gmatch) {

                                                                       originPage = unescape(gmatch[1]);

                                                           }

                                                           var originImage = null;

                       

                                                           gmatch = ImgElements[i].href.match( /\/imgres\?imgurl\=(.*?)\&imgrefurl\=/ );

                                                           if (gmatch)

                                                           {

                                                                       originImage = unescape(gmatch[1]);

                                                                       ImgElements[i].href = originImage;

                                              

                                                               var div = document.createElement('div');

                                                                       var s = '<span style="font-family:\'Trebuchet MS\', sans-serif; font-size:12px;">';

                                                                                  if (originPage) {
                                                                                 
                                                                                  s += '<a style="color:blue;" href="'+originPage+'" target="_blank" alt=" Ver '+originPage+' " title=" Ver '+originPage+' ">' + '<b>' + "Pagina completa"  +'</a>'+ '</b>';

                                                                       }

                                                                       

                                                                      

                                                               div.innerHTML = s;

 

                                                                       ImgElements[i].parentNode.appendChild(div);

                                                           }

                                               }

                        }

            }

}

pointLinksToImages();

 

}

)();

///////////////////////////////////////////////////////////////
///////////////////// GreaseLigthbox /////////////////////////
/////////////////////////////////////////////////////////////
var greasedLightbox = {

	
	aspectRatio : null,
	timer : null,
	slideTime : 2,
	currentAddress : null,
	allImageLinks : [],	
	currentImagePosition : 0,
	lastMove : 1,
	isShowing : false,
	isSlideShow : false,
	/*	
	name					= self-explanitory, must be unuque (used for internal references)
	includeRegExp			= regular expression that window.location.href needs to match
	linkRegExp				= regular expression that link must match
	excludeLinkRegExp		= regular expression that link must not match
	findImageRegExp			= regular expression that image must match for replaceString
	replaceString			= replace string used with findRegExp (required with findImageRegExp, optional with linkRegExp)
	showFunction			= function that is called when link is clicked
	*/
	searchDefs : [
		{
			name				: 'wikipedia',
			includeRegExp		: /^https?:\/\/(.*?\.)?wikipedia\.org/i,
			linkRegExp			: /.*?\/(Fi(le?|xter|txategi|gura|n?ch(ier|eiro))|Fa(il|sciculus)|Dat(oteka|ei)|Delwedd|Dosiero|Be(stand|rkas)|Billede|Skeudenn|Soubor|Slika|Pilt|Archivo|Mynd|Vaizdas|Tiedosto|Larawan|Resim):.*\.(jpe?g|gif|png)$/i,
			findImageRegExp		: /(.+?)\/thumb\/(.+?)\.(jpe?g|gif|png).*$/i,
			replaceString		: '$1/$2.$3',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'wikipedia'); return false; }
		}, // 

		{
			name				: 'nettby',
			includeRegExp		: /./, // used on every page
			linkRegExp			: /^(https?:\/\/)(.*?\.)?nettby\.no\/(view|thumbs)\/(.*?\.(jpe?g|gif|png))$/i,
			replaceString		: '$1content.nettby.no/users/',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'imagesocket'); return false; }
		}, // 
		
		{
			name				: 'imagesocket',
			includeRegExp		: /./, // used on every page
			linkRegExp			: /^(https?:\/\/)(.*?\.)?imagesocket\.com\/(view|thumbs)\/(.*?\.(jpe?g|gif|png))$/i,
			replaceString		: '$1content.imagesocket.com/images/$4',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'imagesocket'); return false; }
		}, // 
		
		{
			name				: 'imagesocketSite',
			includeRegExp		: /^https?:\/\/(.*?\.)?imagesocket\.com/i,
			linkRegExp			: /^\/view\/(.*?\.(jpe?g|gif|png))$/i,
			replaceString		: 'http://content.imagesocket.com/images/$1',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'imagesocketSite'); return false; }
		}, // 
		
		{
			name				: 'blogger',
			includeRegExp		: /^https?:\/\/(.*?\.)?blog(ger|spot)\.com/i,
			linkRegExp			: /^(https?:\/\/.*?\.blogger\.com\/.*?\/.*?\/.*?\/.*?)\/.*?-h(\/.*?\.(jpe?g|gif|png))$/i,
			replaceString		: '$1$2',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'blogger'); return false; }
		}, // 
	
		{
			name				: 'show',
			includeRegExp		: /./, // used on every page
			linkRegExp			: /.*?\.(jpe?g|gif|png)$/i,
			excludeLinkRegExp	: /\?/i,
			showFunction		: function(event) { greasedLightbox.show(event); return false; }
		}, // 
		
		// 
		/* 
		{
			name				: 'picasa',
			includeRegExp		: /./, // used on every page
			linkRegExp			: /^http(s)?:\/\/picasaweb.google.com\/.+/i,
			findImageRegExp		: /^(http(s)?:\/\/(.*?)\.google.com\/(.*?)\/(.*?)\/(.*?)\/(.*?)\/)(.*?)\/(.*?)\.jpg$/i,
			replaceString		: '$1$9.jpg?imgmax=1024',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'picasa'); return false; }
		},
		*/
		
	{
			name				: 'search',
			includeRegExp		: /^https?:\/\/(.*?\.)?(google\..*|search\.yahoo\.com|blingo\.com\/images)/i, 
			linkRegExp			: /.*?(im(age|g)(ur(i|l)|src))=(http(s?):\/\/)?(.*?)&.*/i,
			replaceString		: 'http$6://$7',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'search'); return false; }
		}, // 
		
		// 
		{
			name				: 'flickr',
			includeRegExp		: /^https?:\/\/(.*?\.)?flickr\.com/i,
			linkRegExp			: /\/photos\/[^\/]+\/[0-9]+/i,
			findImageRegExp		: /_[tsm]\.jpg/i,
			replaceString		: '.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'flickr'); return false; }
		}, // 
		
		
		/* 
		{
			name				: 'facebook',
			includeRegExp		: /^https?:\/\/(.*?\.)?facebook\.com/i,
			linkRegExp			: /photo\.php\?pid=[0-9]+/i,
			findImageRegExp		: /[st]([0-9]+.*?)\.jpg/i,
			replaceString		: 'n$1.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'facebook'); return false; }
		}, 
		*/
		
		// 
		{
			name				: 'myspace1',
			includeRegExp		: /^https?:\/\/(.*?\.)?myspace\.com/i,
			linkRegExp			: /imageID=[0-9]+/i,
			findImageRegExp		: /m_(.+)\.jpg/i,
			replaceString		: 'l_$1.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'myspace1'); return false; }
		},  
		
		// 
		{
			name				: 'myspace2',
			includeRegExp		: /^https?:\/\/(.*?\.)?myspace\.com/i,
			linkRegExp			: /imageID/i,
			findImageRegExp		: /_m/i,
			replaceString		: '_l',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'myspace2'); return false; }
		},  
		
		// 
		{
			name				: 'deviantart',
			includeRegExp		: /^https?:\/\/(.*?\.)?deviantart\.com/i,
			linkRegExp			: /deviantart\.com\/(deviation|print|art)\/.+/i,
			findImageRegExp		: /^http(s)?:\/\/.*?\.deviantart\.com\/([^\/]*)\/[^\/]*\/(.*?)\.(jpe?g|gif|png)$/i,
			replaceString		: 'http$1://fc01.deviantart.com/$2/$3.$4',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'deviantart'); return false; }
		}, // 
		
		// 
		{
			name				: 'subvariance',
			includeRegExp		: /^https?:\/\/(.*?\.)?subvariance\.com/i,
			linkRegExp			: /\/view\/[0-9]+/i,
			findImageRegExp		: /\/items\/thumbs\/(.*?)\.jpg/i,
			replaceString		: '/items/$1.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'subvariance'); return false; }
		}, // 
		
		// 
		{
			name				: 'gmail',
			includeRegExp		: /^https?:\/\/mail\.google\..*/i,
			linkRegExp			: /^(\/mail\/\?view=att&(amp;)?disp=)inline/i,
			replaceString		: 'http://' + window.location.host + '$1emb',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'gmail'); return false; }
		}, // 
		
		// 
		{
			name				: 'imagefap',
			includeRegExp		: /^https?:\/\/(.*?\.)?imagefap\.com/i,
			linkRegExp			: /(image.php\?id=|gallery\/)[0-9]+/i,
			findImageRegExp		: /\/images\/(thumb|mini)\/([0-9]+)\/([0-9]+)\/([0-9]+)\.jpg/i,
			replaceString		: '/full/$2/$3/$4.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'imagefap'); return false; }
		},
		
		// 
		{
			name				: 'ffffound',
			includeRegExp		: /^https?:\/\/(.*?\.)?ffffound\.com/i,
			linkRegExp			: /\/image\/[\w]+$/i,
			findImageRegExp		: /img(-thumb)?\.ffffound\.com\/static-data\/assets\/([\w\/]+?)_[\w]+\.(jpe?g|gif|png)$/i,
			replaceString		: 'img.ffffound.com/static-data/assets/$2.$3',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'ffffound'); return false; }
		},
		
		// 
		/* 
		{
			name				: 'textamerica',
			includeRegExp		: /^http(s)?:\/\/(.*?\.)?textamerica\.com/i,
			linkRegExp			: /\?r=[0-9]+$/i,
			findImageRegExp		: /user\.images\.x\/(.*?\/.*?)\/(.*?)\/(.*?)\.jpg(.*)$/i,
			replaceString		: 'user.images.x/$1\/$3.jpg',
			showFunction		: function(event) { greasedLightbox.showFrom(event, 'textamerica'); return false; }
		} //
		*/
			], // searchDefs[]

	useLinkForShow : function(searchDef) {
		if (searchDef.findImageRegExp)
			return false;
		else
			return true;
	},

	showFrom : function(event, showName) {
		var link;
		if (event.currentTarget)
			link							= event.currentTarget;
		else
			link							= event;
		
		var address							= unescape(unescape(greasedLightbox.getAddress(link)));
		var img								= greasedLightbox.getImageToShow(link, address, showName);
		
		greasedLightbox.show(event, img, address);
	}, 
	getImageToShow : function(link, address, showName) {
		var searchDef						= greasedLightbox.getRegExpObj(greasedLightbox.searchDefs, showName);
		
		if (greasedLightbox.useLinkForShow(searchDef)) {
			address							= unescape(unescape(address));
			if (searchDef['replaceString'])
				var img						= address.replace(searchDef['linkRegExp'], searchDef['replaceString']);
			else
				var img						= address.match(searchDef['linkRegExp'])[0];
		} else {
			var img							= greasedLightbox.containsThumb(link, greasedLightbox.getRegExpObj(greasedLightbox.searchDefs, showName), true);
		}
		
		return img;
	}, 
        
	getRegExpObj : function(regExpObject, showName) {
		var rExObj;
		
		for (var i = 0; i < regExpObject.length; i++) {
			rExObj							= regExpObject[i];
			if (rExObj['name'] == showName)
				return rExObj;
		}
	}, 
	containsThumb : function(elem, rExObj, verbose) {
		var images, image, src;
		images = document.evaluate('descendant::img[@src]', elem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var i = 0; i < images.snapshotLength; i++) {
			thisImage	= images.snapshotItem(i);
			src			= thisImage.getAttribute('src');
			if(rExObj['findImageRegExp'].test(src)) {
				if(!verbose) return true;
					return src.replace(rExObj['findImageRegExp'], rExObj['replaceString']);
			}
		}
		
		return false;
	}, 
	getAddress : function(linkObj) {
        var address                            = linkObj.getAttribute('href');

        if(/Safari/.test(navigator.userAgent)) {
            linkObj.onclick = function() { return false; };
        }
        return address;
    }, 
	getPageScroll : function() {
		var xScroll, yScroll;

		if (self.pageYOffset) {
			yScroll 						= self.pageYOffset;
		} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
			yScroll 						= document.documentElement.scrollTop;
		} else if (document.body) {// all other Explorers
			yScroll 						= document.body.scrollTop;
		}
		
		if (self.pageXOffset) {
			xScroll 						= self.pageXOffset;
		} else if (document.documentElement && document.documentElement.scrollLeft){	 // Explorer 6 Strict
			xScroll 						= document.documentElement.scrollLeft;
		} else if (document.body) {// all other Explorers
			xScroll 						= document.body.scrollLeft;
		}
	
		arrayPageScroll 					= new Array(xScroll,yScroll) 
		return arrayPageScroll;
	}, 
	getPageSize : function() {
		var xScroll, yScroll;
		
		if (window.innerHeight && window.scrollMaxY) {	
			xScroll							= document.body.scrollWidth;
			yScroll							= window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
			xScroll							= document.body.scrollWidth;
			yScroll							= document.body.scrollHeight;
		} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
			xScroll							= document.body.offsetWidth;
			yScroll							= document.body.offsetHeight;
		}
		
		var windowWidth, windowHeight;
		if (self.innerHeight) {	// all except Explorer
			windowWidth						= self.innerWidth;
			windowHeight					= self.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
			windowWidth						= document.documentElement.clientWidth;
			windowHeight					= document.documentElement.clientHeight;
		} else if (document.body) { // other Explorers
			windowWidth						= document.body.clientWidth;
			windowHeight					= document.body.clientHeight;
		}	
		
		if(yScroll < windowHeight){
			pageHeight						= windowHeight;
		} else { 
			pageHeight						= yScroll;
		}

		if(xScroll < windowWidth){	
			pageWidth						= windowWidth;
		} else {
			pageWidth						= xScroll;
		}
	
		arrayPageSize						= new Array(pageWidth,pageHeight,windowWidth,windowHeight);
		return arrayPageSize;
	},
	center : function(objToCenter, arrayPageScroll, arrayPageSize) {
		var oldDisplay					= new Array(objToCenter.style.visibility, objToCenter.style.display);
		
		objToCenter.style.display		= 'none';
		
		var arrayPageScroll				= (arrayPageScroll) ? arrayPageScroll : greasedLightbox.getPageScroll();
		var arrayPageSize				= (arrayPageSize) ? arrayPageSize : greasedLightbox.getPageSize();

		objToCenter.style.visibility	= 'hidden';
		objToCenter.style.display		= 'block';
		
		var objTop						= arrayPageScroll[1] + ((arrayPageSize[3] + 35 - objToCenter.offsetHeight) / 2);
		var objLeft						= (arrayPageSize[0] - objToCenter.offsetWidth) / 2;
		
		objToCenter.style.top			= (objTop < 0) ? "0px" : objTop + "px";
		objToCenter.style.left			= (objLeft < 0) ? "0px" : objLeft + "px";
		
		objToCenter.style.visibility	= oldDisplay[0];
		objToCenter.style.display		= oldDisplay[1];
	}, 
	centerItAll : function() {
		var objLightbox					= document.getElementById('greasedLightbox');
		var objLoading					= document.getElementById('greasedLightboxLoading');
		var arrayPageSize				= greasedLightbox.getPageSize();
		var arrayPageScroll 			= greasedLightbox.getPageScroll();
		
		greasedLightbox.center(objLightbox, arrayPageScroll, arrayPageSize);
		greasedLightbox.center(objLoading, arrayPageScroll, arrayPageSize);
	}, 
	show : function(event, img, context) {

		if ((event.shiftKey || event.ctrlKey) && !(event.shiftKey && event.ctrlKey)) return true;

		if (event.currentTarget) {
			var link						= event.currentTarget;
			greasedLightbox.stopEvents(event);
		} else {
			var link						= event;
		}
		
		if (img == null || img == '') img	= link.getAttribute('href');
		greasedLightbox.currentAddress		= unescape(unescape(greasedLightbox.getAddress(link)));
		
		// make ctrl+shift+click follow link without lightbox
		if (event.shiftKey && event.ctrlKey) {
			window.location.href			= greasedLightbox.currentAddress;
			return true;
		}
		
		if (greasedLightbox.isShowing != true)
			window.addEventListener('resize', greasedLightbox.centerItAll, true);
		
		greasedLightbox.isShowing			= true;
		
		capt								= link.getAttribute('title');
		
		if (capt == null || capt == '') {
			try {
				var imgObj					= link.firstChild;
				capt						= imgObj.getAttribute('title');
			} catch (e) { }
		}
		if (capt == null || capt == '') {
			try {
				var imgObj					= link.firstChild;
				capt						= imgObj.getAttribute('alt');
			} catch (e) { }
		}
		
		// prep objects
		var objOverlay						= document.getElementById('greasedLightboxOverlay');
		var objMenu							= document.getElementById('greasedLightboxMenu');
		var objLightbox						= document.getElementById('greasedLightbox');
		var objCaption						= document.getElementById('greasedLightboxCaption');
		var imgPreload						= document.getElementById('greasedLightboxPreload');
		var objImage						= document.getElementById('greasedLightboxImage');
		var objLoading						= document.getElementById('greasedLightboxLoading');
		objOverlay.style.display			= 'none'; // This will ensure that we have a correct reading of the page size
		var arrayPageSize					= greasedLightbox.getPageSize();
		var arrayPageScroll 				= greasedLightbox.getPageScroll();
		objOverlay.style.height				= (arrayPageSize[1] + 'px');
		objOverlay.style.display			= 'block';
		objMenu.style.display				= 'block';
		objLoading.style.visibility			= 'hidden';
		objLoading.style.display			= 'block';
		greasedLightbox.center(objLoading, arrayPageScroll, arrayPageSize);
		objLoading.style.visibility			= 'visible';
				var imgPreload						= document.getElementById('greasedLightboxPreload');

		preloaderDone = function() {
			loaderDone	= function() {
				objImage.removeAttribute('width');
				objImage.removeAttribute('height');
				greasedLightbox.aspectRatio		= null;
				
				if (capt) {
					objCaption.innerHTML		= capt;
				} else {
					objCaption.innerHTML		= img;
				}
				// objCaption.innerHTML			= objCaption.innerHTML + '<br/><br/>(width: ' + objImage.width + 'px; height: ' + objImage.height + 'px;)';
				if (context) objCaption.innerHTML	= objCaption.innerHTML + '<br/><br/><a href="' + context + '">' + greasedLanguage[greasedLanguage.language][0].context + '</a>';
				//objLightbox.style.visibility	= 'hidden';
				objLightbox.style.display		= 'block';
				
				greasedLightbox.aspectRatio		= objImage.height / objImage.width;
				if (objImage.height > arrayPageSize[3] - 70) {
						var newHeight			= arrayPageSize[3] - 70;
						var newWidth			= (objImage.width / objImage.height) * newHeight;
						objImage.height			= newHeight;
						objImage.width			= newWidth;
				}
				if (objImage.width > arrayPageSize[2] - 70) {
						var newWidth			= arrayPageSize[2] - 70;
						var newHeight			= greasedLightbox.aspectRatio * newWidth;
						objImage.height			= newHeight;
						objImage.width			= newWidth;
				}
				
				greasedLightbox.center(objLightbox, arrayPageScroll, arrayPageSize);
				if (objLightbox.offsetHeight > objOverlay.offsetHeight) objOverlay.style.height		= objLightbox.offsetHeight + 'px';
				if (objLightbox.offsetWidth > objOverlay.offsetwidth) objOverlay.style.width		= objLightbox.offsetWidth + 'px';
				
				greasedLightbox.center(objLightbox, arrayPageScroll, arrayPageSize);
				
				objLoading.style.display		= 'none';
				objCaption.style.display		= 'block';
				objLightbox.style.visibility	= 'visible';
				objImage.removeEventListener('load', loaderDone, false);
				imgPreload.removeEventListener('load', preloaderDone, false);
				imgPreload.removeEventListener('error', greasedLightbox.noImage, false);
				imgPreload.src					= '';
				
				if (greasedLightbox.isSlideShow)
					greasedLightbox.timer = setTimeout(function(event) { greasedLightbox.moveSlide(event, 1) }, greasedLightbox.slideTime * 1000);
				
				return false;
			} 
			
			objImage.addEventListener('load', loaderDone, false);
			objImage.src					= img;
			
			return false;
		} 
		
		
		if (imgPreload.src != img) {
			imgPreload.addEventListener('load', preloaderDone, false);
			imgPreload.addEventListener('error', greasedLightbox.noImage, false);
			imgPreload.src					= img;
		} else {
			preloaderDone();
		}
		var obtrusives, thisObtrusive;
		obtrusives	= document.evaluate('//object|//embed|//iframe', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var i = 0; i < obtrusives.snapshotLength; i++) {
			thisObtrusive					= obtrusives.snapshotItem(i);
			thisObtrusive.style.visibility	= 'hidden';
		}
		
		if (greasedLightbox.allImageLinks.length > 1) {
			// initialize slideshow
			// set currentImagePosition
			findCurrentPosition : for(var i = 0; i < greasedLightbox.allImageLinks.length; i++) {
				if (greasedLightbox.allImageLinks[i]['link'] == link) {
					greasedLightbox.currentImagePosition	= i;
					break findCurrentPosition;
				}
			}
			if (!window.opera) { // for some reason this pre-fetching breaks lightbox in opera
				var imgPrefetch			= document.getElementById('greasedLightboxPrefetch');
				
				var nextImagePosition	= (greasedLightbox.currentImagePosition + greasedLightbox.lastMove) % greasedLightbox.allImageLinks.length;
				if (nextImagePosition < 0) nextImagePosition = greasedLightbox.allImageLinks.length - 1;
				
				var nextImage			= greasedLightbox.allImageLinks[nextImagePosition];
				var nextImageSrc		= greasedLightbox.getImageToShow(nextImage['link'], greasedLightbox.getAddress(nextImage['link']), nextImage['name']);
				imgPrefetch.src			= nextImageSrc;
			}
		}
		
	},
	slideShow: function(cmd) {
		var objMenuButtonShow = document.getElementById('greasedLightboxButtonSlide');
		if (cmd != 'stop') { // Iniciar presentacion
			greasedLightbox.isSlideShow	= true;
			greasedLightbox.moveSlide(null, 1);
			objMenuButtonShow.removeEventListener('click', greasedLightbox.slideShow, false);
			objMenuButtonShow.innerHTML	= '\u2169';
			objMenuButtonShow.addEventListener('click', function(event) { greasedLightbox.slideShow('stop') }, false);
		}
		else { // Detener presentacion
			clearTimeout(greasedLightbox.timer);
			greasedLightbox.isSlideShow	= false;
			objMenuButtonShow.removeEventListener('click', function(event) { greasedLightbox.slideShow('stop') }, false);
			objMenuButtonShow.innerHTML	= '\u21BB';
			objMenuButtonShow.addEventListener('click', greasedLightbox.slideShow, false);
		}
	},
	hide : function(event) {
		greasedLightbox.stopEvents(event);

		greasedLightbox.isShowing			= false;
		window.removeEventListener('resize', greasedLightbox.centerItAll, true);
		
		var objPreloader					= document.getElementById('greasedLightboxPreload');
		var objLoading						= document.getElementById('greasedLightboxLoading');
		var objError						= document.getElementById('greasedLightboxError');
		var objOverlay						= document.getElementById('greasedLightboxOverlay');
		var objLightbox						= document.getElementById('greasedLightbox');
		var objMenu							= document.getElementById('greasedLightboxMenu');
		var imgPreload						= document.getElementById('greasedLightboxPreload');

		objPreloader.removeEventListener('load', preloaderDone, false);
		imgPreload.removeEventListener('error', greasedLightbox.noImage, false);
		//imgPreload.src					= '';

		var obtrusives, thisObtrusive;
		obtrusives	= document.evaluate('//object|//embed|//iframe', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var i = 0; i < obtrusives.snapshotLength; i++) {
			thisObtrusive					= obtrusives.snapshotItem(i);
			thisObtrusive.style.visibility	= 'visible';
		}
		
		// hide everything
		objLoading.style.display			= 'none';
		objError.style.display				= 'none';
		objOverlay.style.display			= 'none';
		objLightbox.style.display			= 'none';
		objMenu.style.display				= 'none';
		
	},
	halt : function() {
		greasedLightbox.slideShow('stop');
		greasedLightbox.hide();
	},

	stopEvents : function(event) {
		if (event) {
			if (event.stopPropagation) event.stopPropagation();
			if (event.preventDefault) event.preventDefault();
		}
	},

	resize : function(event, resizeByAmount) {
		greasedLightbox.stopEvents(event);

		greasedLightbox.slideShow('stop');

		var objImage						= document.getElementById('greasedLightboxImage');
		var imgPreload						= document.getElementById('greasedLightboxPreload');
                
		if (resizeByAmount == 0) {
			objImage.removeAttribute('width');
			objImage.removeAttribute('height');
		} else {
			var newWidth					= objImage.width + (objImage.width * (resizeByAmount/100));
			var newHeight					= this.aspectRatio * newWidth;
			if (newWidth > 30 || newHeight > 30) {
				objImage.width				= newWidth;
				objImage.height				= newHeight;
			}
		}

		var objLightbox						= document.getElementById('greasedLightbox');
		greasedLightbox.center(objLightbox);
	},
	noImage : function(event) {
		var objLoading						= document.getElementById('greasedLightboxLoading');
		var objError						= document.getElementById('greasedLightboxError');
		var objErrorContext					= document.getElementById('greasedLightboxErrorContext');
		
		objError.style.visibility			= 'hidden';
		objError.style.display				= 'block';
		
		objErrorContext.innerHTML			= '<a href="' + greasedLightbox.currentAddress + '">' + greasedLanguage[greasedLanguage.language][0].context + '</a>';
		
		greasedLightbox.center(objError);
		
		objLoading.style.display			= 'none';
		objError.style.visibility			= 'visible';
		
		if (greasedLightbox.isSlideShow)
			greasedLightbox.timer = setTimeout(function(event) { greasedLightbox.moveSlide(event, 1) }, 500);
	},
	handleKey : function(event) {
		if (greasedLightbox.isShowing) {
			var keycode							= event.which;
			var key								= String.fromCharCode(keycode).toLowerCase();
			
			switch(key) {
				case 'x':
					greasedLightbox.halt(event);
					break;
				case '+':
					greasedLightbox.resize(event, 13);
					break;
				case '-':
					greasedLightbox.resize(event, -13);
					break;
				case '0':
					greasedLightbox.resize(event, 0);
					break;
				/* @todo
				case 'v':
					
					break;
				*/
				default:
					switch(event.keyCode) {
						
						case 27:
							greasedLightbox.halt(event);
							break;
						case 37:		
						case 63234:		
							greasedLightbox.slideShow('stop');
							greasedLightbox.moveSlide(event, -1);
							break;
						case 39:		
						case 63235:		
							greasedLightbox.slideShow('stop');
							greasedLightbox.moveSlide(event, 1);
							break;
							
					} // switch(event.keyCode)
					break;
			} 
		} // if
	},
	moveSlide : function(event, moveByAmount) {
		if (greasedLightbox.allImageLinks.length > 1) {
			if (greasedLightbox.currentImagePosition + moveByAmount == -1) greasedLightbox.currentImagePosition = greasedLightbox.allImageLinks.length;

			var newSlidePosition				= (greasedLightbox.currentImagePosition + moveByAmount) % greasedLightbox.allImageLinks.length;
			var slideToLoad						= greasedLightbox.allImageLinks[newSlidePosition];
			
			greasedLightbox.hide(event);
			slideToLoad['showFunction'](slideToLoad['link']);
			greasedLightbox.lastMove			= moveByAmount;
		} // if
	},
	lightBulbOnIcon :"url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKgSURBVDjLlZLrS1NxGMd90ZvovdEfEBEUEhZIb0xMjdyLIuyGkiHGUFKydFKKJiRegjIyFJRwojMxzfJSaVOYeTfxtpSNuZ1tXnY2z27nsss5334uWloG9uLD7%2FA7z%2FfzPPx4IgBE7ISl3qWyelUvu9JIueZqeOdUmcCMFDgcQ3fntjSK0j%2Frwx%2BcsesIZ3jbL1j6EbCPIej5DpE3QRIoBJ3LEFb74BjIxkbXVYNdrTixS8Ca3h%2Fy6pSTfloD0UcRjCS8BJGbRdA7QRgjd1pIfhruyeewKOMdm%2BrCw2GBV1tXKZh7SIEVoqAjpwVS0AlIvhBSkCGyeQRcPYDogO1DNixvrveFBa6ZCkuAmSe1OtJpFVLATkJboWCIAE3%2BGYngI6ENgnUK%2BhcxfFiw9fWRT%2BRWEWTHEeRmyPhaMvYCgu5ZEpgkbzCCgPszBNsr8NY8iF4Ky5WnpLDArs41%2BzYnSPdF8OYi0qEcTHc6mF45mJ4M2Ftl4C1lYPU34KerwFNTWKmO%2Fj2BfbiwghmvJuPawZsUsNVHgTPlEx6ANcjJeR9r5QfhWUqEJOlhbc%2BFoV42FBY4R0sPbPbKlz2LLeQB9aCbYkJhzpIFlkoDZ8zDRk0kRHYYrm8d0JYeEyyduUd37QH9pTBqvSOV9iy0wtmZ%2BVNAOm%2BHOeM92JtlYDQN0JYcD1BtmTf%2FWqRtbJ%2FyTxtUt9fXGhPBq5MhriVBtMYhoLkMQ1Ek5sqi3eb2O4l7buIvhlRPkmsfZ%2Fibax%2BiruosnpacQUFOOq7Fn5TUypJz%2F1zlnRQr5JSypRVKZRvq6htR%2FewlriTH03vV7ilQ5NwaHRgchM1GY3p6Bq%2BbmpEii9XtWzCgqkhLuXSBTUg4L8XFxUoXk2K57obirH0L%2FocfNQ8V8wE%2BuE0AAAAASUVORK5CYII%3D')",

	init : function() {
		greasedLanguage.init();

		var currentURL, searchDefsToUse;
		currentURL			= window.location.href;
		searchDefsToUse		= new Array();
		
		
		for(var i = 0; i < greasedLightbox.searchDefs.length; i++) {
			if(greasedLightbox.searchDefs[i]['includeRegExp'].test(currentURL)) searchDefsToUse.push(greasedLightbox.searchDefs[i]);
		}
		
		if(!searchDefsToUse.length) return;

		var links, thisLink, href, lightboxedLinksTotal = 0;
		links 			= document.evaluate('//a[@href]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		
		for(var i = 0; i < links.snapshotLength; i++) {
			thisLink	= links.snapshotItem(i);
			href		= unescape(thisLink.getAttribute('href'));
			checkLink : for (var ii = 0; ii < searchDefsToUse.length; ii++) {

				if (!searchDefsToUse[ii]['findImageRegExp']) {
					if(searchDefsToUse[ii]['linkRegExp'].test(href)) {
						if (!searchDefsToUse[ii]['excludeLinkRegExp'] || !searchDefsToUse[ii]['excludeLinkRegExp'].test(href)) {
							if (!(thisLink.getAttribute('rel') && thisLink.getAttribute('rel').toLowerCase().match('lightbox'))) // prevents doubling lightboxes
								thisLink.addEventListener('click', searchDefsToUse[ii]['showFunction'], true);
							this.allImageLinks[lightboxedLinksTotal]						= new Array(3);
							this.allImageLinks[lightboxedLinksTotal]['name']				= searchDefsToUse[ii]['name'];
							this.allImageLinks[lightboxedLinksTotal]['showFunction']		= searchDefsToUse[ii]['showFunction'];
							this.allImageLinks[lightboxedLinksTotal]['link']				= thisLink;
							lightboxedLinksTotal++;
							break checkLink;
						}
					}
				} else if (searchDefsToUse[ii]['findImageRegExp']) {
					if(this.containsThumb(thisLink, searchDefsToUse[ii], false)) {
						if(searchDefsToUse[ii]['linkRegExp'].test(href)) {
							if (!searchDefsToUse[ii]['excludeLinkRegExp'] || !searchDefsToUse[ii]['excludeLinkRegExp'].test(href)) {
								if (!(thisLink.getAttribute('rel') && thisLink.getAttribute('rel').toLowerCase().match('lightbox'))) // prevents doubling lightboxes
									thisLink.addEventListener('click', searchDefsToUse[ii]['showFunction'], true);
								/*for (ii = 0; ii < lightboxedLinksTotal; ii++) {
									if(greasedLightbox.allImageLinks[ii]['link'] == links[i]) break checkLink;
								}*/
								this.allImageLinks[lightboxedLinksTotal]					= new Array(3);
								this.allImageLinks[lightboxedLinksTotal]['name']			= searchDefsToUse[ii]['name'];
								this.allImageLinks[lightboxedLinksTotal]['showFunction']	= searchDefsToUse[ii]['showFunction'];
								this.allImageLinks[lightboxedLinksTotal]['link']			= thisLink;
								lightboxedLinksTotal++;
								break checkLink;
							}
						}
					}
				}
			} // checkLink : for()

		} // for()
		
		if (lightboxedLinksTotal == 0) return;
		
		window.addEventListener('unload', this.unload, false);
		
		var objBody							= document.getElementsByTagName("body").item(0);
		
		var pngOverlay						= "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAPSURBVHjaYmJgYDgDEGAAANsAz1TKIeAAAAAASUVORK5CYII%3D')";
											   
		var lightbulbOffIcon				= "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJOSURBVDjLlZLdTxJQGMa96K4%2FoPUHdFfrpntyZrXsoq25tlbroi6qi7ZuYsuZ0UXRWiv72NS0gjIgDQ1LS0wkwU%2FUVEREUkEIBBFE%2BV48ve%2FZICza7OLZOTt739%2FznHPeEgAlhZpyB8%2BMLa58HHL63H2zy4muycVku8UZahl2TNJ688%2F6wsbd31yBLps3BNdqFCvrMYRjSURIvOdzzdAcmozWhTaLc%2B8WADXvHHb6RhYCEdEU2kiIJu%2FaBtwEywE3k2lQKjz8NB7Sjs7vygPMDu9ddogmUliNxsWaSGfwM5sViqcy%2BBHeFCl4r6YkzwzTnXlA9%2FSSh924md25qFDszMnmfGuga4pEd3QjiTxAN%2F49xY0c10MgjsuOuSssBdfh8IdBSUG1AibTDmbzAHrhZab6IzHQq6N3xo3%2BLyqY%2B1phMmig%2F9AISolm8yyMdo9IcKtt6HcC%2Bh653uoScTsJ0K65jw5yYrWOOISrol6Kht4pcUV%2Bg0efJwx5ADXtUA3a7aMLflHQoa0VzfTSoHMBUClqwL9EM4Lrb01JOt%2BzZQ7ob%2Fc%2FN1qDDGEHBugKxO6mOS%2BqWswZRb%2Ft9F%2BDxCLHAzQovsfdEyAYXn6d4cHBa7r7NXU%2FbrwbiCpNtsNFJzEnaqp4KjufblDU4XbtJVTJL%2BBqjQynyvZl6e8P%2FnOUC1UtvehWNr%2BBUqlGXX0T7j14gpMVZcFitUUB0ivnBvQ9PQgEgrBYxvBC8QqVxyXz2wboVfKzlSeOxsrLD2VLSyXZY0ck8feN1Ze3Dfgf%2FQJBCig%2B4GhFlwAAAABJRU5ErkJggg%3D%3D')";
		
		// CSS
		var head, styleSheet, cssStr, cssText;
		head = document.getElementsByTagName('head')[0];
		styleSheet						= document.createElement('style');
		styleSheet.setAttribute('id','greasedLightboxCSS');
		styleSheet.setAttribute('type','text/css');
		head.appendChild(styleSheet);
		
		cssStr							= ''+
		'#greasedLightboxOverlay { position: absolute; top: 0; left: 0; z-index: 10000000; width: 100%; background-image: ' + pngOverlay + '; background-repeat: repeat; cursor: pointer; }'+
		
		'#greasedLightboxMenu { position: fixed; top: 0; left: 0; width: 100%; z-index: 10000100; background: #000; font-family: "Terbuchet MS", Tahoma, Arial, Verdana, sans-serif; font-size: 14px; font-weight: bold; height: 35px; line-height: 35px; opacity: .5; }'+
		'#greasedLightboxMenu:hover { opacity: 1; }'+
		'a#greasedLightboxTitleLink { position: absolute; top: 0; left: 0; display: block; height: 35px; line-height: 35px; margin: 0 5px; padding: 0 5px 0 27px; background-image: ' + lightbulbOffIcon + '; background-repeat: no-repeat; background-position: 5px 55%; color: #aaa; background-color: #000; text-decoration: none; cursor: pointer; z-index: 10000450; }'+
		'a#greasedLightboxTitleLink:hover { color: #fff; background-color: #333; }'+
		'#greasedLightboxButtons { position: absolute; top: 0; left: 0; height: 35px; width: 100%; line-height: 35px; margin: 0; padding: 0; z-index: 10000400; }'+
		'#greasedLightboxButtons a { display: block; width: 33px; height: 33px; border: 1px solid #000; background: #000; cursor: pointer; float: right; text-align: center; color: #aaa; z-index: 10000450; }'+
		'#greasedLightboxButtons a:hover { border-color: lightblue; background-color: #333; color: #fff; }'+
		'#greasedLightboxLoading { position: absolute; z-index: 10000050; color: #fff; font-weight: bold; font-family: "Trebuchet MS", Tahoma, Arial, Verdana, sans-serif; text-align: center; line-height: 2em; }'+
		'p#greasedLightboxLoadingText { margin: 0; padding: 25px 0 5px 0; font-size: 30px; color: #fff; font-weight: bold; font-family: "Trebuchet MS", Tahoma, Arial, Verdana, sans-serif; line-height: 1em; text-align: center; }'+
		'p#greasedLightboxLoadingHelp { margin: 0; padding: 5px 0; font-weight: normal; font-size: 11px; color: #fff; font-family: "Trebuchet MS", Tahoma, Arial, Verdana, sans-serif; line-height: 1em; text-align: center; }'+
		'#greasedLightboxError { position: absolute; z-index: 10000050; text-align: center; background: #000; color: #aaa; padding: 10px; border: 1px solid #444; -moz-border-radius: 10px; font-family: verdana, sans-serif; font-size: 11px; }'+
		'p#greasedLightboxErrorMessage { color: #fff; font-size: 30px; font-weight: bold; margin: 10px 20px; font-family: "Trebuchet MS", Tahoma, Arial, Verdana, sans-serif; text-decoration: none; border: none; text-align: center; }'+
		'#greasedLightboxError a, #greasedLightbox a { color: #aaa; text-decoration: none; border-bottom: 1px solid #777; }'+
		'p#greasedLightboxErrorContext { margin: 0; padding: 5px 0; font-weight: normal; font-size: 11px; color: #fff; font-family: "Trebuchet MS", Tahoma, Arial, Verdana, sans-serif; line-height: 1em; text-align: center; }'+
		'#greasedLightbox { position: absolute; z-index: 10000050; text-align: center; background: #000; color: #aaa; padding: 10px; border: 1px solid #444; -moz-border-radius: 10px; font-family: verdana, sans-serif; font-size: 17px; }'+
		'img#greasedLightboxImage { border: none; cursor: pointer; }'+
		'img#greasedLightboxImage, img#greasedLightboxPreload, img#greasedLightboxPrefetch {  max-height: none; max-width: none; }'+
		'#greasedLightbox, #greasedLightboxMenu, #greasedLightboxOverlay, #greasedLightboxError, #greasedLightboxLoading, img#greasedLightboxPreload, img#greasedLightboxPrefetch { display: none; }'+
		'#greasedLightboxCaption { color: #aaa; padding: 10px 0; }';
		
		cssText							= document.createTextNode(cssStr);
		styleSheet.appendChild(cssText);

		var objOverlay						= document.createElement("div");
		objOverlay.addEventListener('click', greasedLightbox.halt, false);
		objOverlay.setAttribute('id','greasedLightboxOverlay');
		objBody.appendChild(objOverlay);
		var objMenu							= document.createElement("div");
		objMenu.setAttribute('id', 'greasedLightboxMenu');
		objBody.appendChild(objMenu);
		var objMenuLink						= document.createElement("a");
		objMenuLink.setAttribute('id', 'greasedLightboxTitleLink');
		objMenuLink.setAttribute('href', 'http://userscripts.org/users/99372/scripts');
		objMenuLink.innerHTML					= 'Mis otros Script';
		objMenu.appendChild(objMenuLink);
		var objMenuButtons					= document.createElement("div");
		objMenuButtons.setAttribute('id', 'greasedLightboxButtons');
		objMenu.appendChild(objMenuButtons);
		var objMenuButtonRight				= document.createElement("a");
		objMenuButtonRight.setAttribute('id', 'greasedLightboxButtonRight');
		objMenuButtonRight.setAttribute('title', greasedLanguage[greasedLanguage.language][0].next);
		objMenuButtonRight.innerHTML		= '\u2192';
		objMenuButtonRight.addEventListener('click', function(event) { greasedLightbox.slideShow('stop'); greasedLightbox.moveSlide(event, 1); }, false);
		objMenuButtons.appendChild(objMenuButtonRight);
		var objMenuButtonLeft				= document.createElement("a");
		objMenuButtonLeft.setAttribute('id', 'greasedLightboxButtonLeft');
		objMenuButtonLeft.setAttribute('title', greasedLanguage[greasedLanguage.language][0].previous);
		objMenuButtonLeft.innerHTML			= '\u2190';
		objMenuButtonLeft.addEventListener('click', function(event) { greasedLightbox.slideShow('stop'); greasedLightbox.moveSlide(event, -1); }, false);
		objMenuButtons.appendChild(objMenuButtonLeft);
		var objMenuButtonPlus				= document.createElement("a");
		objMenuButtonPlus.setAttribute('id', 'greasedLightboxButtonPlus');
		objMenuButtonPlus.setAttribute('title', greasedLanguage[greasedLanguage.language][0].magnify);
		objMenuButtonPlus.innerHTML		= '+';
		objMenuButtonPlus.addEventListener('click', function(event) { greasedLightbox.slideShow('stop'); greasedLightbox.resize(event, 13); }, false);
		objMenuButtons.appendChild(objMenuButtonPlus);
		var objMenuButtonOriginal				= document.createElement("a");
		objMenuButtonOriginal.setAttribute('id', 'greasedLightboxButtonOriginal');
		objMenuButtonOriginal.setAttribute('title', greasedLanguage[greasedLanguage.language][0].original);
		objMenuButtonOriginal.innerHTML		= 'o';
		objMenuButtonOriginal.addEventListener('click', function(event) { greasedLightbox.slideShow('stop'); greasedLightbox.resize(event, 0); }, false);
		objMenuButtons.appendChild(objMenuButtonOriginal);
		var objMenuButtonMinus				= document.createElement("a");
		objMenuButtonMinus.setAttribute('id', 'greasedLightboxButtonMinus');
		objMenuButtonMinus.setAttribute('title', greasedLanguage[greasedLanguage.language][0].shrink);
		objMenuButtonMinus.innerHTML		= '-';
		objMenuButtonMinus.addEventListener('click', function(event) { greasedLightbox.slideShow('stop'); greasedLightbox.resize(event, -13); }, false);
		objMenuButtons.appendChild(objMenuButtonMinus);
		var objMenuButtonShow				= document.createElement('a');
		objMenuButtonShow.setAttribute('id', 'greasedLightboxButtonSlide');
		objMenuButtonShow.setAttribute('title', greasedLanguage[greasedLanguage.language][0].slideshow);
		objMenuButtonShow.innerHTML			= '\u21BB';
		objMenuButtonShow.addEventListener('click', greasedLightbox.slideShow, false);
		objMenuButtons.appendChild(objMenuButtonShow);
		var objLoading						= document.createElement("div");
		objLoading.setAttribute('id','greasedLightboxLoading');
		objLoading.addEventListener('click', greasedLightbox.halt, false);
		objBody.appendChild(objLoading);
		
		var loadingGif = document.createElement('img');
		loadingGif.src = "data:image/gif,GIF89a%80%00%80%00%A2%00%00%FF%FF%FF%DD%DD%DD%BB%BB%BB%99%99%99%00%00%FF%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2."+
		"0%03%01%00%00%00!%F9%04%05%05%00%04%00%2C%02%00%02%00%7C%00%7C%00%00%03%FFH%BA%DC%FE0%CA%06*%988%EB%CD%BB_%96%F5%8Ddibax%AEl%AB%A5%A2%2B%CF.%5C%D1x%"+
		"3E%DA%97%EE%FF%12%1EpHT%08%8B%C8G%60%190%1DI%83%E8%20%F9a2K%CF%8FTJ%E5X%AD%A4lg%BB%EDj%BE%D7%9D%0DJ%8E%9A3%E8%B4G%BCis%DF%93%B8%9CC%CF%D8%EFx%12zMsk"+
		"%1E%7FS%81%18%83%850%87%7F%8Apz%8D)%8Fv%91%92q%1D%7D%12%88%98%99%9A%1B%9C%10%88%89%9Fy%93%A2%86%1A%9E%A7%8B%8C%2F%AB%18%A5%AE%A0_%AA%8E%AC%90%B5%B6%"+
		"60%19%A3%0D%AD%BC%AF%A1(%B2%9D%BB%C3%C4h%BF%C7%A4%C9%CA%A8%A9A%CE%0E%B4%D1%BD%7B%10%C0%0A%C2%D8%D2%C5%DB%D5%0C%D7%DF%CB%B7%13%B9%C8%97x%02%EE%02%2B%"+
		"B0%D47%13%DEln%1E%EF%EF'%F2%2B%F6Zd%3A%E8%1Bhb%9A%3Fv%F7%DAp%18%C8%90%84%C1%13%D0%C6%94%CB%C0%B0%E2%08f2%14%02%2Ce%8A%FFb%C5%86U%B4%B5(%B3%91%A3%C0%"+
		"8F%20%CD%CD%E2%08h!%CA%94*%AD%B1l%99%EF%25%C1%98%0Bf%D2%1Ca%F3fL%9D%F8X%F4%D4g%0EhG%17C%F7%0D3%EA%23%A9%3B%5EL%818u%054%C9P%AA%2C%DF%D8%C4%FA%8F%CAK"+
		"%AE%08%15Y%AC%15%F6%13%D1%A5%3Bq%AA%5D%CB%B6%AD%DB%B7p%E3%CA%9DK%B7%AE%DD%BBx%F3B4%DA%F5%1B_a%7F'%16%0D%0C%89%B0%E0h%86%13%F3%FD%A9%B8qV%95%8E%23%F7"+
		"%85*%D9Me%B5%97%BB9f%1BY%AF%E7%CF%A0C%8B%1EM%BA%B4%E9%D3%A8S%AB%C6A%92r%D0Se1%C5~s8P%ED%24%26a%DF%1E2%13%EC%E4%1CUu%F7%06%12%D5wn%E0%C1%5D%0F%9FQ%1C"+
		"q%F2%83%3A1%3FO%F8Xzt%EA%C7%DB6%AFs%5D%EE%F4%95%D5%25%BEv%D1Z%7Cv%F0%BB%EB%05%CC%B8%DERz%99%BF%D5kd%11%91%C3y%F9%F3G%D4%2F%B1%DF~%FF%08%BC%F9%E9%F7_"+
		"I%EDaW%12t%01%3EP%DE3%B3%B9g%DB%80%9A-%A8%20%84%8CAha%7C%90Q%A8!%85~a%B8!%87%CE5%18%8C%88%E4%80%88%16%89%25%26%C8%A0%8A%19%A2%98%93%8B%11%B2%D8!%8C1"+
		"J%08%A0%89%9F%BC%97b%81%F8%C9x%A2%8F%F0%F1%D8%A3%8D%CA%E8%B8%23%91%2B%02)%9C%92%232y%24%92%C6%A55%E4x~%E0H%9B%95%04%60%89%A1%22%5B%06%09%E5%8D4%9Aa%"+
		"A4%97RNY%26%97X%D6x%E6%3ANv%91%A6%9ATr%D7%26%15of%19%26%99q%E6(%A4%7Fs%929%E3Q%EE%7D%89%1Eiu%AAVhj%87%A2%96%E8i%8B%9A%D6%A8%A3%7B%AE%C6'%A0%AE%24%00"+
		"%00!%F9%04%05%05%00%04%00%2C%0A%00%02%00W%000%00%00%03%FFH%BA%DC%FE0%BE%40%83%BC8%EB%3D%2B%E5%60(J%9E7%9E(WVi%EBv%EB%2B%BF%EB7%DFgm%E1%3C%A8%F7%23%8"+
		"1P%90%FA%A1%00H%40k8D%19G%C9%24%8A%C9%CC%D5N%D1%E8%89%DA%1C%3DCYi%90%2B%F4%5EEa%B1%88%DC%F5%9DAi%F5%9A-%FAn%E2%CA%14%9B%E8%8E%C1%E3.%7B!v%19x%2F%82*"+
		"o%1A%86%87%88%1A%84%12xy%8Dd%89~%8B%803%7B%7C%19%90%10%928%8E%18%9E%0F%8C%A1t%9D%8A%91%99%3C%A2%24%AA%11%A6%AD%A8%17%A4%0C%B2%B3%B4%11%B6%0A%A0%40%0"+
		"A%AE0%25%18%B8%3D%9B%B5%B0%0D%BE%BF%C0%BA%10%97%B1%AC%10%03%D4%03%81%CE%C2%C4%D2%0F%D5%D5K%D8G%DB%0D%DD%E4z%952%E2%E3%E4%E5c%5C3%E9%0C%EB%F2%EDm%E8Y"+
		"%18%F2%F3se%3CZ%19%F9%FA%98%09%04%18P%E0%2F%82%EB%0C2C%C8N!%10%86%DD%1C%1E%84HMb%0F%8A%15-%F2%C0%A8%F1%13%22%C3%8E%0F%09%82%0C%99o%E4%C4%86%26IZK%A9"+
		"!%01%00!%F9%04%05%05%00%04%00%2C%1F%00%02%00W%000%00%00%03%FFH%BA%DC%FEKH%01%AB%BD8%EB6%E7%FE%60%A8u%9Dh%9E%22%E9%A1l%5B%A9%92%2B%CF%04L%D1%F8i%E7%7"+
		"C%B8%F7%A2%81p%C0%FA%9D%02%C8%40k8D%19E%C9%24%8A%C9%D4%C1%8EQ%A9%89%DA4%3DAYm%90%2B%F4%5E%A1a%E4%89%DC%05%7D5i%F1%98%9C%3A%83%E3K%B6%CF%BE%89%2B%F3t"+
		"n%7Cpx.lD%1Fo%17~3%87%88%23%83%8B%8C%8Dz%1B%8A%15%93%94%95%19%97%0F~%7F4%87%96%91%98%859%A2%9C%A4%9E%A6%A7%9B%17%9D%0D%99%3C%A8%AF%AA%B1%AC%B3%B4%2F"+
		"%B6%0B%9F%40%0B%BA%10%B0%0A%B2%40%8E%B5*%92%B8%C6%AE%C2%24%18%C5%BF%04%C1%0F%25%CAa.%00%DA%00%18%D4(%D1!%DB%DB%DD%812%CB%20%E2%E9%17%CD%2C%E7%1A%E9%"+
		"F0%E4U8%D8%22%F0%F7%19%F39Q%26%F7%F8%D2%D2%FC%FD%03%D8C%E0%40%828%0C%C6C%C8C%A1%3A%86%09%1D%8E%83HC%E2D%8A3%2Cj%C3X%D1%14%22%C7%88%0A%3F%E6%08)r%A4%"+
		"C0%92%05%17%A2L%B9%D1D%02%00!%F9%04%05%05%00%04%00%2C%3C%00%02%00B%00B%00%00%03%FEH4%3C%FA0%CAI%AB%9D%AD%DD%CD%7B%CD%99'%8E%16%A8%91hj2i%3B%AE%8E%2B"+
		"o%F0l%7F%EB%ADG%B5%2B%FC%82%DD%A3%97%02%02%85%8B%5C%D1x%DC%11I%CC%A6%EE)%8AJo%D4%8E%F5j%CBr%B6A%A1%F7%02F%26M%D0%ADy%5C)%AF%95Z7%92%3D%91%CF%E1%1Bp%"+
		"F8%8D%8E%5B%CDCx%16v%7C%20~Q%80%81%7Ddj%89%0At%0Az%8E%8F%82u%8D%93%90%92%93%94!%8C%7F%9B%8A1%83%97.%01%A6%01%3B%84(%A7%A7%3A%A4%AB%AC%AC7%AF%22%B1%B"+
		"6%AEL)%B6%BB%A9%5C%1E%BB%BC%A0%1B%C0%C1%C2%15%C4%C5%C6%12%C8%B7%CA%14%CC%B1%CE%13%D0%B2%D2%11%D4%AD%D6%D7%D8%A8%DA%10%DC%DE%CB%D0%E1%D3%C8%E4%CF%C4%"+
		"E7%C7%CD%EA%EB%A6%ED%F0%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FA%00%FD%FE%FF%00%03%024%26%B0%A0%C1%7F%A0%0E*4%B8i%A1%C3%81%93%1EJ%04%D0p%A2%C3%84%16%0F%12%C"+
		"C(%03PA%02%00!%F9%04%05%05%00%04%00%2CN%00%0A%000%00W%00%00%03%ECH%BA%BC%F3%A3%C9I%2B%85%D0%EA%7Dq%E6%E0%E6%7Da)%8D%A4%A9%A2%A9Z%B2%91%BB%B2%B2%0B%D"+
		"7%E6%8D%87p%BCs%BA%9F((%B4%10%8B%1D%14r%A8%5CV%8ENF%2F%9A%1CQ'%D3k%03z%E5%AA%04%60%81%91%B6%0B%87%9F%CD%9Ay%5D%C5%A8%D7%EC%B6%CF%04%AF%8F%1F%B2%BA%9"+
		"D%AA%DF%3B%FB~H%80p%7C%83fQ%86%87%7F%89%60%85%8C%8E%86Z%89Z%0A%83%94%0B%80%97%0C%81%9A%95g%9D%A0%A1%A2%A3%A4%A5%A6%A7%A8%A9%AA*%01%AD%AE%AF%B0%B1%B0"+
		"5%B2%B5%B6%AF.%B7%BA%B6%AC%BB%BE%B8%26%BF%C2%01%BD%C3%BB%B9%C6%B7%B4%C9%B2%AB%CE%CF%D0%D1%D2%D3%D4%D52%00%D8%00%A5%D9%DC%A2%DC%DF%DA%9D%E0%DF%E2%E3%"+
		"E4%94%E6%E3%E8%E9%E0Z%EC%ED%EE%EF%DD%F1%F2%D8%F4%F5%EB%F5%E1W%FA%FB%FC%F8%F9%D8%95K%17%8A%A0%B7s%A3%E6QH%00%00!%F9%04%05%05%00%04%00%2CN%00%1F%000%0"+
		"0W%00%00%03%E9H%BA%DC%FEn%C8%01%AB%BDmN%CC%3B%D1%A0'F%608%8Eez%8A%A9%BAb%AD%FBV%B1%3C%93%B5v%D3%B9%BE%E3%3D%CA%2F%13%94%0C%81%BD%231%A8D%B6%9A%8F%1C"+
		"%14R%9B%F2L%D6%AB0%CB%EDz%BF%E0%B0xL.%9B%CF%5C%81z%CDn%BB%DB%B3%B7%7C%CE%5E%D1%EF%F3%13~%0F%1F%F1%FF%02z%80%7Bv%83tq%86oh%8B%8C%8D%8E%8F%90%91%92%93"+
		"%0A%01%96%01f%97%9Ac%9A%9D%98%60%9E%9D%A0%A1%A2%5D%A4%A1%A6%A7%9E%5C%AA%AB%AC%AD%9B%AF%B0%96%B2%B3%A9%B3%9FY%B8%B9%10%00%BE%00%2F%B8%15%BF%BF%C1%B0%"+
		"BD%C4%C5%C6%A7%C8%C9%C07%CC%0F%CE%CA%D0%A5%D2%D3%CF%3B%B1%C3%D8b%D8%BE%DE%DDa%DF%D9_%DFc%E7%E3%E2%EA%D3%E1%EB%E6%EF%5E%E4%EE%CE%E8%F1%5D%E9%EC%F5%FA"+
		"%FB%60%F9%FE%ED%E8%11%23%D3%CF%1E%B8)%09%00%00!%F9%04%05%05%00%04%00%2C%3C%00%3C%00B%00B%00%00%03%F9H%BA%DC%FEP%8DI%AB%BD6%EA%1D%B1%FF%15'r%60%F9%8D"+
		"%E8c%AEY%EAJl%FC%BE%B1%3C%BB%B5y%CF%F9%B9%FF%C0%A0pH%2C%1A%8F%C8%A4r%C9l%3A%9F%D0%A8tJ%10X%05%D4%D7u%9B%1Dm%BF%D8%AE%06%FC%15G%C8%60%B3%03MV3%D8mw%1"+
		"5%5E%96%CF%E9W%FB%1D%1Fv%F3%F3v%7FVz%82F%01%87%017%7FD%88%88%8AxC%8D%8D%3Bt%91%92%87%40l%96%97%89%99u%11%00%A1%00%1C%9C%98A%5C%1A%A2%A2%A4%A5O%AA%AA"+
		"%1B%A5%A6L%AF%AB%B1%ADM%B5%A1%AC%B8K%BA%A3%BC%97%B9%BA%23%B2%B4%C4%22%C6%BE%C8%C9%BDH%BF(%B2%9D%CF%CC%CD%9CJ%D0%D1%CAG%D9%DA%D7%D4%B5%2F%DBE%DD%DE%C"+
		"2%DC%D5%E6%92%E8%E1%E2%E3B%E5)%EFA%F1%F2%DFD%F5%EA%8E%E4%E9.%E7%FC%EDvLb%F7J%8F%83%7Cv%10%CAQ%E8%86%A1%1A%87%0F%0B%1A%7C%00kb%83%04%00!%F9%04%05%05%"+
		"00%04%00%2C%1F%00N%00W%000%00%00%03%FFH%BA%DC%FE0%CA7%EA%988%EB%CD%89%FD%5D(%8E%CDg%5Ed%AAJ%A7%B9%BE%B0%D7%BAq%1D%CE%AD%ADkx%BE%FF%90%DE%09Ht%08i%C5"+
		"%E4%11%94%2C.-M%E5%13%15%05N5%80%2C%E0'%E8%0AFO%8CV%AB%F3z%C1%C7%C9x%5C3%9BIB%F5%3A%DBvwU8%C9%9C%1C%B3%9F%F1H%10%7Bt%13%01%86%01%18~w%2BL%11%83%5B%8"+
		"5%87%86%89%8AQ%8F%90%11%92%92%13%8A%8BE%8F%18%9A%87%94~I%97%A1%A2%88%9C%9D%9F%83%19%A9%AA%AB%A5%40%A0%AF%A9%1A%AC%3F%B5%A8%A2%B8%95%3B%BB%BC%9A%1B%B"+
		"95%A7%1A%B0%C4%C50%C1%C2%9B%CA%B3%CC%CD%91%BD%D0%D1%2B%D3%D4%C3%1C%CB)%D9%DA%CF%DC%BF*%DF%12%C9%1D%DD%22%E5%E6%B7!%E9%1C%C7%1D%E7%E8%EFX%AE%22%F3%F4"+
		"%D7%1D%F7%F8%ED%22%E3B%F4%0B%91O%9F%1BokR%144%E8%89%04%1B%85%FFF%BC%A9%E2l%14%C5(%0B%2F%FE%C8%A8Q%13%07%C7%8E5%3E%82%84!r%E4%8Bj%26%89%84K%A9%20%01%"+
		"00!%F9%04%05%05%00%04%00%2C%0A%00N%00W%000%00%00%03%FFH%BA%DC%0E%10%B8I%AB%BD8%B7%C8%B5%FF%E0%C7%8DRh%9E!9%A2lK%A9%A4%2B%B7%B0%3A%DF%60m%E3%3C%A6%C7"+
		"%BD%E0%E4%B7%12%1A%17%C4%CEq%99%8C%2C%8FM%C8%13%DA%9CR%89%A7%806%20%1Cx%07%99dv%AB%ED%7D%BF%3E%1D%8AL%C6%9D%CF%97Z%8B%BDu%BF%BDi%25%8B%5E%BF%DD%D1qN"+
		".%7Ce%17%02%87%02%18%7FxV%04%84%5C%86%88%87%8A%8BV%8F%90%15%92%92%17%8B%8CK%8F%18%9A%88%94%7FO%97%A1%A2%89%9C%9D%9F%84%19%A9%AA%AB%A5F%A0%AF%A9%1A%A"+
		"CB%B5%A8%A2%B8%95A%BB%BC%9A%1E%B98%A7%1A%B0%C4%C53%C1%C2%9B%CA%B3%CC%CD%91%BD%D0%D1%83%AE%1F%C9%1F%CB%7B%D9%DA%B7%20%DDc%7C!%DB%DC%BF%DE%E5%E6%E1%E2"+
		"%E9%26%C7%20%E7%E8%EF%20%D3%C8%ED%EE%D7%F6%EB%26%F3%FAo%D6%F4cW%CDD%3D~mP%FC%03%E8I%60!%85%F9%0C%02jDm%18E%2B%0B%2F%0A%C9%A8%B1%12%07%C7%8E8%3E%82%9"+
		"C!r%A4%8C%82%26%8D%3C%E3%91%00%00!%F9%04%05%05%00%04%00%2C%02%00%3C%00B%00B%00%00%03%F5H%04%DC%FE%F0%A9I%AB%BD%98%C6%CD%5D%FE%E0%D5%8D%5Ch%82d*%9D%A"+
		"C%A5%BE%40%2BO%B0%3A%DF%F5x%EF%F9%B6%FF%C0%A0pH%2C%1A%8F%C8%A4r%C9l%3A%9F%D0%A8tJ%3D%05%AE%81%AA%0C%CB%D5%9A%B8%E0%AC7%13%06%8F%2F%E5%F0%99%92.%AF%0"+
		"9m%F7%3A%AE%3E%D3%CD%F6%3B%F6%AD%DF%E7%FB%7C%80%81w%3B%02%86%02Fz%85%87%86Et%3F%8C%8CDmA%91%87%8Ex%40%96%97%98WC%9B%8D%20%03%A3%03R%A0%88%A2%A4%A3P%"+
		"A7%A8%19%AA%AAO%A7!%B0%A4N%AD%B4%B5%A5M%B3%B9%B5%BC%A0'%BA%BBK%BD%BE%B0L%C6%C7%B1J%B8%C2%BA%C5%C1%2C%C3%CD%CA%CB%B6I%D6%D7%ABH%DA%DB%C4F%DE%A9%BFG%E"+
		"2%E3%C8%E1%E6%1F%D4%E9%9B%3B%ECE%D27%F0D%F23%F4%F5%91%40%F8%F9%A1%3F%FCo%26%00%0CH%60%60%40%83o%10%AEQx%86aCt%0410K%00%00!%F9%04%05%05%00%04%00%2C%0"+
		"2%00%1F%000%00W%00%00%03%E7H%BA%0C%0E%2C%CAIk%7B%CE%EAM%B1%E7%E0%E6%8Da)%8D%A8%A9%A2%A9Z%B2%AD%CB%C1%B1%AC%D1%A4%7D%E3%98.%F2%0F%DF%0E%08%11v%88E%E3"+
		"%04%A9%AC%00%9B%16%1C4%0A%9B%0E%7B%D6_%26%CB%EDz%BF%E0%B0xL.%9B%CF%A1%80z%CDn%BB%DB%B6%B7%7C%CEv%D1%EFs%15~%0F7%F1%FF%01z%80%7Bv%83tq%86oh%8B%8C%8D%"+
		"8E%8F%90%91%92%93h%02%96%02f%97%9Ac%9A%9D%98%60%9E%9D_%A1%9E%5D%A4%A1Y%A7%A8V%AA%A5S%AD%A2%AF%B0%97%A9%B3%96%AC%B6%9F%B2%B3%5C%B62%03%C0%03%16%BC.%C"+
		"1%C1%15%AD6%C6%C6%14%A7%3E%CB%C7%CD%B1%3A%D0%D1%D2%B7B%D5%C0b%DA%C2a%DD%DE%60%DD%DC%E3%DF%DA%E4%D5c%E5%E2%E7%E6%ED%EC%E9%EE%F1%F0%D0%E8%F5%F6%CB%F8%"+
		"CC%F2%F7%F4%F9%FA%DB%D4%CD%D3wf%9F%86%04%00!%F9%04%09%05%00%04%00%2C%02%00%02%00%7C%00%7C%00%00%03%FFH%BA%DC%FE0%CAI%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh"+
		"%AA%AEl%EB%BEp%2C%CFt%0A%DC%40%AD%938%BE%FF%9E%5E%0FH%CC%08%7D%C5%24%E5%88T%3A%1D%CC%E6sJ%88%E6%A8X%2B%96%AA%DDN%BB%5E%A5%F5%1AN%82%CB%C41%DA%1C%5D%"+
		"B3%99%EEt%3B%0E%3C%D3i%EA%BB%CE%AE%8F%E5%FB3%7C%80%12%01%85%01!%82%83%0E%86%86%20%89%8A%0B%8C%92%1Fs%90%10%92%98%1D%95%96%8B%98%99%1BG%9C%11%9E%9E%1"+
		"CC%A2%A3%A4%9F%A8%26%AA%A5%AC%AD%AE%93%B0%24%B2%B3%B4%23%B6%8C%B8%B5%BA%85%BC%22%BE%BF%C0!%C2%C4%C1%B6%C7%B9%AE%CA%CB%A4%CD%BD%B7%D0%CE%87%D3%D6%D7%"+
		"D8%D9%DA%DB%DC%DD%DE%DF%E0%E1%C0%02%E4%E5%E6%E7%E8%E7%DC%E9%EC%ED%E6%DA%EE%F1%ED%D9%F2%F5%EA%D8%F6%F9%02%F4%FA%F5%F0%FD%EE%D6%01L'%AE%A0%C1%83%08%13"+
		"*%5C%C8%B0%A1%C3%87h%06H%1C%00q%C1%C4%8B%10%2Fj%A4%D8pP%A3F%86%1E7*%0C%E9%11!%C9%92%07O%8A4%A8%F2%23%CB%96%13M%C2%94%98r%26%C7%970%13%CE%5C%98%93%E7"+
		"I%87%24%2B%AE%ACH%00%23%D1%A3H%93*%5D%CA%B4%A9%D3%A7P%A3J%9DJ%B5%AA%D5%ABX%B3j%DD%CA%B5%AB%D7%AF%60%C3%16I%00%00%3B";
		loadingGif.style.border					= 'none';
		
		objLoading.appendChild(loadingGif);
		var objLoadingText					= document.createElement("p");
		objLoadingText.setAttribute('id','greasedLightboxLoadingText');
		objLoadingText.innerHTML			= greasedLanguage[greasedLanguage.language][0].loading;
		objLoading.appendChild(objLoadingText);
		var objLoadingHelp					= document.createElement("p");
		objLoadingHelp.setAttribute('id','greasedLightboxLoadingHelp');
		objLoadingHelp.innerHTML			= greasedLanguage[greasedLanguage.language][0].loadingSub;
		objLoading.appendChild(objLoadingHelp);
		var objErrorBox						= document.createElement("div");
		objErrorBox.setAttribute('id','greasedLightboxError');
		objBody.appendChild(objErrorBox);
		var objError						= document.createElement("p");
		objError.setAttribute('id','greasedLightboxErrorMessage');
		objError.innerHTML					= greasedLanguage[greasedLanguage.language][0].error +
			'<p id="greasedLightboxErrorContext"></p>';
		objErrorBox.appendChild(objError);
		var objLightbox						= document.createElement("div");
		objLightbox.setAttribute('id','greasedLightbox');
		objOverlay.appendChild(objLightbox);
		var objImage						= document.createElement("img");
		objImage.addEventListener('click', greasedLightbox.halt, false);
		objImage.setAttribute('id','greasedLightboxImage');
		objLightbox.appendChild(objImage);
		var objPreload						= document.createElement("img");
		objPreload.setAttribute('id','greasedLightboxPreload');
		objBody.appendChild(objPreload);
		var objPrefetch						= document.createElement("img");
		objPrefetch.setAttribute('id','greasedLightboxPrefetch');
		objPrefetch.addEventListener('error', function() { return false; }, false);
		objBody.appendChild(objPrefetch);
		var objCaption						= document.createElement("div");
		objCaption.setAttribute('id','greasedLightboxCaption');
		objLightbox.appendChild(objCaption);
		
		document.addEventListener('keypress', greasedLightbox.handleKey, true);
		
		// Auto-Chequear actualizaciones (quedo en desuso, a eliminar parte del codigo en fituras versiones)
		try {
			var lastChecked					= GM_getValue('lastChecked', null);
			var latestVersion				= GM_getValue('latestVersion', null);
			
			var now							= new Date();
			now								= now.getTime();
			
			var oneDay						= 1000 * 60 * 60 * 24; // miliseconds * seconds * minutes * hours
			
			if (!lastChecked || (now - lastChecked) > oneDay) {
				GM_setValue('lastChecked', now.toString());
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://userscripts.org/scripts/show/58174',
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Google Imagenes Plus 3/'+googleimagenesplus3.version,
						'Accept': 'text/plain'
					},
					onload: function(responseDetails) {
						var latestVersion	= responseDetails.responseText;
						GM_setValue('latestVersion', latestVersion);
						
						if (latestVersion > greasedLightbox.version) greasedLightbox.showUpdate(latestVersion);
					}
				});
				
			} else if (latestVersion > greasedLightbox.version) {
				greasedLightbox.showUpdate(latestVersion);
			} // if
		} catch (e) { }
		
	}, 
	unload : function () {
		var objOverlay			= document.getElementById('greasedLightboxOverlay');
		objOverlay.removeEventListener('click', greasedLightbox.halt, false);
		
		var objMenuButtonRight	= document.getElementById('greasedLightboxButtonRight');
		objMenuButtonRight.removeEventListener('click', function(event) { greasedLightbox.moveSlide(event, 1); }, false);
		
		var objMenuButtonLeft	= document.getElementById('greasedLightboxButtonLeft');
		objMenuButtonLeft.removeEventListener('click', function(event) { greasedLightbox.moveSlide(event, -1); }, false);
		
		var objMenuButtonPlus	= document.getElementById('greasedLightboxButtonPlus');
		objMenuButtonPlus.removeEventListener('click', function(event) { greasedLightbox.resize(event, 13); }, false);
		
		var objMenuButtonMinus	= document.getElementById('greasedLightboxButtonMinus');
		objMenuButtonMinus.removeEventListener('click', function(event) { greasedLightbox.resize(event, -13); }, false);
				
		var objMenuButtonOriginal	= document.getElementById('greasedLightboxButtonOriginal');
		objMenuButtonOriginal.removeEventListener('click', function(event) { greasedLightbox.resize(event, 0); }, false);
		
		var objLoading			= document.getElementById('greasedLightboxLoading');
		objLoading.removeEventListener('click', greasedLightbox.halt, false);
		
		var objError			= document.getElementById('greasedLightboxErrorMessage');
		objError.removeEventListener('click', greasedLightbox.halt, false);
		
		var objImage			= document.getElementById('greasedLightboxImage');
		objImage.removeEventListener('click', greasedLightbox.halt, false);
		
		var objPrefetch			= document.getElementById('greasedLightboxPrefetch');
		objPrefetch.removeEventListener('error', function() { return false; }, false);
		
		document.removeEventListener('keypress', greasedLightbox.handleKey, true);
		
	} 
} 

var greasedLanguage = {

	es : [
		{
			loading			: 'Cargando la imagen... Ufffff como pesa!',
			loadingSub		: 'Clickea en cualquier lugar para cancelar.',
			context			: 'Click "Central" del raton. Para ver la imagen en una pagina separada.',
			error			: 'La imagen no puede ser cargada',
			next			: 'Imagen Siguiente (tecla derecha)',
			previous		: 'Imagen Anterior (tecla izquierda)',
                        original		: 'Restablecer tamaÃƒÂ±o (tecla 0)',
			magnify			: 'Aumentar (tecla +)',
			shrink			: 'Reducir (tecla -)',
			update			: 'Hay una nueva actualizacion disponible',
			slideshow		: 'Iniciar / Detener Presentacion'
		}
	], 
	/* language template
	// 
	 : [
		{
		  	loading			: '',
			loadingSub		: '',
			context			: '',
			error			: '',
			next			: '',
			previous		: '',
			magnify			: '',
			shrink			: '',
			update			: '',
			slideshow		: ''
		}
	], 
	*/
	language : null,
	init : function() {
		this.language		= this[navigator.language.substring(0,2)] ? navigator.language.substring(0,2) : 'es';
	} 
}; 

if (document.body) greasedLightbox.init();
(function()

{


function pointLinksToImages()

{

            ImgElements = document.body.getElementsByTagName("a");

            if(ImgElements)

            {

                        for(i=0;i<ImgElements.length;i++)

                        {

                                   if(ImgElements[i].href.indexOf("/imgres?imgurl=") != -1 &&

                                      ImgElements[i].href.indexOf("&imgrefurl=") != -1)

                                      {

                                  

                                                           /*var gmatch = null;

                                                           var target = ImgElements[i].getAttribute("target");

                                                           if (!target) {

                                                                       target = "";

                                                           }*/

                                                                      

                                                           var originPage = null;

                                                           gmatch = ImgElements[i].href.match(/\&imgrefurl\=(.*?)\&/);

                                                           if (gmatch) {

                                                                       originPage = unescape(gmatch[1]);

                                                           }

                                                           var originImage = null;

                       

                                                           gmatch = ImgElements[i].href.match( /\/imgres\?imgurl\=(.*?)\&imgrefurl\=/ );

                                                           if (gmatch)

                                                           {

                                                                       originImage = unescape(gmatch[1]);

                                                                       ImgElements[i].href = originImage;

                                              

                                                               var div = document.createElement('div');

                                                                       var s = '<span style="font-family:\'Trebuchet MS\', sans-serif; font-size:12px;">';

                                                                                  if (originPage) {
                                                                                 
                                                                                  s += '<a style="color:blue;" href="'+originPage+'" target="_blank" alt=" Ver '+originPage+' " title=" Ver '+originPage+' ">' + '<b>' + "Pagina completa"  +'</a>'+ '</b>';

                                                                       }

                                                                       

                                                                      

                                                               div.innerHTML = s;

 

                                                                       ImgElements[i].parentNode.appendChild(div);

                                                           }

                                               }

                        }

            }

}

pointLinksToImages();

 

}

)();

/////////////////////////////////////////////////////////////////////
///////////// Cambiar Fondo de Google Imagenes /////////////////////
///////////////////////////////////////////////////////////////////

var setprefs = function() {

if(GM_getValue("page_colour")==="undefined")
{
GM_setValue("page_colour", "#FFFFFF");
}

var setcolour = prompt("Escriba el codigo de color para esta pagina:", GM_getValue("page_colour"));
GM_setValue("page_colour", setcolour);

if(confirm("Establecer color para esta pagina?"))
{
GM_setValue("page_colour_boolean", "true")
} else
{
GM_setValue("page_colour_boolean", "false");
}

document.body.style.background = setcolour;
}

if(GM_getValue("page_colour_boolean")==="true")
{
document.body.style.background = GM_getValue("page_colour");
}


GM_registerMenuCommand("Google Imagenes Pro-Plus! - Cambiar color de fondo", setprefs); 



/////////////////////////////////////////////////////////////////////
////////////////// Actualizador  Automatico ////////////////////////
/////////////////      Actulizador Manual  ////////////////////////
//////////////////////////////////////////////////////////////////

var SVC = {
	currentVersion: "4.0.5", 
	scriptName: "Google Imagenes Pro-Plus!", 
	scriptNum: 84094, 

	currentDate: null, userRequestCheck: null, timer: null,
	
	init: function () {
		SVC.currentDate = new Date();
		var cv = parseInt(/[1-9][\d]*/.exec(SVC.currentVersion.replace(/\D/g, "")));

		
		if (!GM_getValue("latest")) GM_setValue("latest", cv );
		if (!GM_getValue("notified")) GM_setValue("notified", false);
		if (!GM_getValue("lastChecked")) GM_setValue("lastChecked", (SVC.currentDate.getTime() - 1000*60*60*25) + "");
		
		
		if (GM_getValue("latest") < cv) {
			GM_setValue("latest", cv);
			GM_setValue("notified", false);
			GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
		}
	},
	verify: function () {
		SVC.userRequestCheck = false;
		var sp = SVC.currentDate.getTime() - parseInt(GM_getValue("lastChecked"));
		

		if (GM_getValue("notified") && (sp / (1000*60*60*24) > 14)) SVC.getInfo();
			

		if (!GM_getValue("notified") && ( sp / (1000*60*60*24) > 1 )) SVC.getInfo();
	},
	getInfo: function () {	
		var uso = 'http://userscripts.org';
		function retrieve(url, re, count) {
			SVC.xhr.get(url, function (status, text) {
				window.clearTimeout(SVC.timer);
				if (status == 404 && SVC.userRequestCheck) SVC.manualErrorMsg();
				if (status == 200) {
					if (re.test(text)) var uv = re.exec(text)[1];
					if (uv) SVC.compare(uv);
					if (!uv && count == 1) {
						retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
					} else if (!uv && SVC.userRequestCheck) {
						SVC.manualErrorMsg();
					}
				}
			});
			SVC.timer = setTimeout(function () { 
				if (count == 1) retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
				if (count == 2) SVC.manualErrorMsg();
			}, 2000);
		};
		retrieve(uso + '/scripts/source/' + SVC.scriptNum + '.meta.js', /@svc:version[\s]*\[(.+)\]/, 1);
	},
	xhr: {
		get: function (url, process) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				onload: function (res) { process(res.status, res.responseText); },
			});
		},
	},
	compare: function (version) {
			
			var updatedVersionInt = parseInt(/[1-9][\d]*/.exec(version.replace(/\D/g, "")));
			
			if (updatedVersionInt <= GM_getValue("latest")) {
				if (SVC.userRequestCheck) alert('Comprobacion Automatica Finalizada!\n\n\nUsted esta¡ utilizando la version mas reciente del script \n\n~ ' + SVC.scriptName + ' ~ Version  instalada ' + SVC.currentVersion + '.\n\n  ');
				return;
			}
			
			GM_setValue("notified", true);
			GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
			
			if (SVC.userRequestCheck) {
			
				var reply = confirm('Comprobacion Automatica Finalizada!\n\n\nEl Script ~ ' + SVC.scriptName + ' ~ Actualizo su codigo a la version ' + version + '  \n\nSu version actualmente instalada es ' + SVC.currentVersion + '.\nQuieres Instalar esta nueva version? \n\n  ');
				
				if (reply) self.location.href= ("http://userscripts.org/scripts/source/" + SVC.scriptNum+'.user.js');
				
			} else {
			
				var reply = confirm('Atencion!!! Buenas, Nuevas, sobre el Script \n\n ~ ' + SVC.scriptName + ' ~ \n\nEste Script actualizo su codigo a la version ' + version + ' \n\nSu version actualmente instalada es ' + SVC.currentVersion + '.\nQuieres Instalar esta nueva version? \n\n  ');
				
				if (reply) self.location.href= ("http://userscripts.org/scripts/source/" + SVC.scriptNum+'.user.js');
			
			}
		},
	versionInfo: {
		autoChecking: function () {
			SVC.init();
			SVC.verify();
		},
		manualChecking: function () {
			SVC.userRequestCheck = true;
			SVC.getInfo();
		},
	},
	manualErrorMsg: function () {
		var reply = confirm('Alerta!\n\n\nLa busqueda de actualizacion para ~ ' + SVC.scriptName + ' ~ no tubo exito .\n\nIntentelo nuevamente mas tarde,  o visite ahora la pagina del script para comprobar si hay actualizaciones disponibles. /nPara su informacion, la version actualmente instalada es ' + SVC.currentVersion + '. \n\nQuieres visitar ahora la pagina del Script para comprobar alguna actualizacion?\n\n  ');
		if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
	},
};

GM_registerMenuCommand("Google Imagenes Pro-Plus! - Buscar Actualizacion", SVC.versionInfo.manualChecking);
SVC.versionInfo.autoChecking();


