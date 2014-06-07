// ==UserScript==
// @name          VeeHD Download Link
// @version       1.1
// @description   Adds a direct download link (and bookmark link) next to VeeHD video page links.  Updated to use a lightbox prompt with video info and tags. 
// @include       http://*.veehd.com/*
// @include       http://veehd.com/*
// ==/UserScript==


//lightbox overlay image
var overlayPNG ="data:image/png;base64,"+
	"iVBORw0KGgoAAAANSUhEUgAAAGUAAABlCAYAAABUfC3PAAAABGdBTUEAAK/INwWK6QAAABl0"+
	"RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACpSURBVHja7NEBDQAACMOwg39P"+
	"WMMGCZ2EtZJMdKq2AIqgQBEUKIICRVAEBYqgQBEUKIIiKFAEBYqgQBEUQYEiKFAEBYqgCAoU"+
	"QYEiKFAERVCgCAoUQYEiKIICRVCgCAoUQREUKIICRVCgCIqgQBEUKIICRVAEBYqgQBEUKIIi"+
	"KFAEBYqgQBEUQYEiKFAEBYqgQLEAiqBAERQoggJFUAQFiqBAEZTHrQADAOi7AYkbZwBkAAAA"+
	"AElFTkSuQmCC";

//download image
var down_png = 'data:image/png;base64,'+
	'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
	'bWFnZVJlYWR5ccllPAAAAX9JREFUeNqMUj1Lw1AUPUlebSlUQRFB/KgK6uomtZOKgqg/wM2xg7OD'+
	'uPgDFNwcHPwHgsXOHZSCdrBLaaEitEKpUELV5qtJvPGZxLRSvHBf3iXnvHveeVfYu7HDYQkpAGuU'+
	'dfSPMcoS5TmjZVszcYb/xw7lAlMMjHT/iQ0Ay+OAIACNT+CBdITEAGSYUTermzgVAVJLfJ8nUrYK'+
	'REibbfPDKCyH2BNKB3jXeWdZAxzMD8ELpnZ6iS0iuco6Fid2R6BjNASYBCSXPf2OPNPmexfrdGf1'+
	'xptHPFofxdYsMBnzD9ucAVan6Z3IpMRFg0hcs6hpGtw8TldxmOUd3Ds5X8ec/VtA13UPKzqFm4Zh'+
	'4PquiJN7v2NTAQ4ybeSLz/iNZaqqBi7tSDnNlLERn0dyAli5UlCpVCBJUtAcvf0R+ms8di9fsDgX'+
	'R6nwSK8fhRm0doCh3Sx4peiPh1yTkauVeWEoPsX69vuJwTZz0FpJKhIQJLnvlNrmEK2vCA+mvwQY'+
	'AHgrobW973PlAAAAAElFTkSuQmCC';


//small loader image
var load_gif = 'data:image/gif;base64,'+
    'R0lGODlhEAAQAPIAACQkJJn//z9XV3rFxZn//2qpqVyOjlWAgCH/C05FVFNDQVBFMi4wAwEAAAAh'+
    '/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklr'+
    'E2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAA'+
    'EAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUk'+
    'KhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9'+
    'HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYum'+
    'CYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzII'+
    'unInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAA'+
    'ACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJ'+
    'ibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFG'+
    'xTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdce'+
    'CAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';

//lightbox loader image
var loadingImage = "data:image/gif;base64,"+
	"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";

GM_addStyle("#lightbox{ background-color:#eee; padding: 10px; border-bottom: 2px solid #666;" +
	"border-right: 2px solid #666;} #overlay{ background-image: url("+ overlayPNG +"); }");
	
GM_addStyle(".downLink img, a.downLink img { height:14px;width:14px;border:0px!important;}");

GM_addStyle(".videoPreview .downLink img{ margin-top:-1px!important;margin-left:-2px!important;}");

//GM_addStyle(".movieLinkVideoBlock {clear: none;display: block;} .movoieLinkVideoBlock img {display: inline;}");	

GM_addStyle(".bmLink img, a.bmLink img { border:0px!important; margin-bottom:-3px;}");
GM_addStyle(".bmText, a.bmText {font-size:10px;color:#fff;}");
GM_addStyle(".round5px {-moz-border-radius:5px;border-radius:5px;}");
GM_addStyle(".round10px {-moz-border-radius:10px;border-radius:10px;}");
GM_addStyle("#closeBtn {background-color:#990000;border:1px outset #990000;font-family:arial,helvetica,verdana;font-size:16px;text-align:center;font-weight:bold;height:12px;width:10px;position:absolute;z-index:200;margin:0px 5px 4px 5px;padding:2px;}");

var vhdLinks, clickEvent;

var ln = "\n";

var lb_header = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
	ln + '<html><head><title>Download</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>' +
	ln + '<link rel="stylesheet" type="text/css" href="http://s3.amazonaws.com/static.veehd.com/all.css"/>' +
	ln + '<style type="text/css">' +
	ln + 'body {background: #000000!important;width:100%;}h2 {margin-left: 0px}.contentColumn{width:470px;float:left;}.pageName{width: 465px!important;}' +
	ln + '.btn {background: url(data:image/gif;base64,R0lGODlhAQALALMAADY2NkdHRycnJxcXF05OTktLSy4uLh4eHkJCQjw8PA8PDwAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABAAsAAAQJkJSAEjDiDBUBADs%3D) top left repeat-x #000000;' +
	ln + 'font-size:14px;border:1px solid #E0E0E0;-moz-border-radius:5px;border-radius:5px;padding:3px 10px 3px 10px;}' +
	ln + '#prompt a {color:#E0E0E0!important;}.confirm {border: 2px solid #458EE4;}.contentColumn {left:50%;display:block;}' +
	ln + 'infoContentHolder h2 {display:inline;}' +
	ln + '</style>' +
	ln + '</head>' +
	ln + '<body>' +
	ln + '<div class="contentColumn">';

var lb_footer = ln + '		</div>' +
	ln + '	</div>' +
	ln + '</div>' +
	ln + '</body>' +
	ln + '</html>';


function init() {
	//initialize only if the user already appears logged in
	if (document.body.innerHTML.match('<a href="/login" class="login">Log In</a>') == null) {
		var lnk, downLink, bmLink;
		//scan links to video pages and attach download & bookmark links
		vhdLinks = document.evaluate(
			"//a[contains(@href, '/video/' )]",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		
		for (var i = 0; i < vhdLinks.snapshotLength; i++) {
			lnk = vhdLinks.snapshotItem(i);
			if (!lnk.href.match(/http(.*)http/gi) && lnk.href.indexOf("mailto:")+lnk.href.indexOf("javascript:")==-2) {
				
			
			
			//	create new node with linkage
			downLink = document.createElement('a');
			downLink.id = "dl_"+i;
			downLink.href = "#";
			downLink.width = "14";
			downLink.height = "14";
			downLink.style.paddingLeft = "1px";
		
			var downImg = document.createElement('img');
				downImg.src = down_png;
				downImg.height = "14";
				downImg.width = "14";
				downImg.align = "absmiddle";
				downImg.border = "none";
			downLink.className = "downLink";
			downLink.appendChild(downImg);
			downLink.addEventListener('click', onClickHandler, true);
		

			//add bookmark link 
			if ( document.location.href.indexOf('/bookmarks') == -1) {
				var actions="";
				bmLink = document.createElement('a');
				bmLink.id = "bm_"+i;
				bmLink.href="#";
				bmLink.style.border="none";
				bmLink.className = "bmLink";
				bmLink.style.verticalAlign="middle";
				bmLink.innerHTML +='<img id="_bm_'+i+'" src="http://static.veehd.com/icoBookmarks.gif" border=0 '+actions+'>';
				bmLink.addEventListener('click', onBookmarkHandler, true);
			}
			
			//	determine if innerHTML of link contains an image or text
			var title_text = stripWhiteSpace(stripHTMLTags(lnk.innerHTML));
			//	change links accordingly
			if (title_text.length>2) {	
				//	source contains text content
				downImg.title="Download: "+title_text;
				if (bmLink) bmLink.title = "Bookmark: "+title_text;
			} else {
				//	source contains no text; probably an image
				//downLink.style.position = "absolute";
				//downImg.style.position = "absolute";
				downImg.style.zIndex = (3100+i);
				downImg.style.position = "absolute";
			}
			if (lnk.title.indexOf("bookmarked") > 1) {
				//image within "Latest Bookmarks" section
				downImg.title="Download: "+lnk.title.substring(0, lnk.title.indexOf(", bookmarked"));
				downLink.style.marginLeft = "-2px";
				downLink.style.marginTop = "-1px";
				downImg.style.zIndex = (3100+i);
				downImg.style.position = "absolute";
				bmLink.firstChild.style.zIndex = (3000+i);
				bmLink.firstChild.style.position = "absolute";
				bmLink.firstChild.style.marginTop = "-3px";
			//	bmLink.firstChild.style.paddingLeft = "12px";
			//	if (bmLink) lnk.parentNode.insertBefore(bmLink, lnk);
				lnk.parentNode.insertBefore(downLink, lnk);
			} else if (title_text.length>2) {
				//inserts download link & bookmark link after text lnk
				
				if (lnk.className == "movieLinkVideoBlock") {
					var lnkDiv = document.createElement('div');
					lnkDiv.style.paddingTop = "2px";
					lnkDiv.className == "linksDiv";
					lnk.parentNode.insertBefore(lnkDiv, lnk);
					lnk.style.display = "inline";
					downLink.style.marginRight="2px";
					downLink.style.cssFloat="left";
					if (bmLink) {
						bmLink.style.cssFloat="left";
						bmLink.style.marginTop="-3px";
						bmLink.style.paddingBottom="3px";
						lnkDiv.appendChild(bmLink);
					}
					lnkDiv.appendChild(downLink);
					lnkDiv.appendChild(lnk);
					
				} else if (!lnk.parentNode.className.match(/[sliderImage|previewHolder]/) && !lnk.className.match(/[movieLink|previewHolder]/)) {
					lnk.parentNode.insertBefore(downLink, lnk.nextSibling);
					if (bmLink) lnk.parentNode.insertBefore(bmLink, lnk.nextSibling);
				}
			} else {				
				//inserts download link & bookmark link before image link
				downLink.style.position = "absolute";
				
				if (lnk.parentNode.className == "videoPreview") {
					var lnkDiv = document.createElement('div');
					lnk.parentNode.insertBefore(lnkDiv, lnk);
					//lnkDiv.style.position = "absolute";
					//lnk.style.display = "inline";
					downLink.style.marginRight="2px";
					downLink.style.cssFloat="left";
					lnkDiv.appendChild(downLink);
					//if (bmLink) lnkDiv.appendChild(bmLink);
					//lnkDiv.appendChild(lnk);
					//lnk.parentNode.insertBefore(bmLink, lnk);
				} else if (lnk.parentNode.className != "sliderImage"){	//
					lnk.parentNode.insertBefore(downLink, lnk);
					//if (bmLink) lnk.parentNode.insertBefore(bmLink, lnk);
				}
			}
		}
		}
		initLightbox();
	}
}





	function onClickHandler(event) {
		var target_id;
	
	    if (event.target.id.indexOf("dl_") > -1) {
			target_id = event.target.id;
		} else if (event.target.parentNode.id.indexOf("dl_") > -1) {
			target_id = event.target.parentNode.id;
		}
		if (target_id) {
	    	//prevent default click actions
		    event.stopPropagation();
		    event.preventDefault();
			//get the id of event target
	    	var item_id = target_id.substring(target_id.indexOf("_")+1);
	    	var item_id_num = parseInt(item_id,10);
			//load address from specified id 
		    loadVideoPage(item_id_num);
		}
	}

	function onBookmarkHandler(event) {
		var target_id;
		
		if (event.target.id.indexOf("bm_") > -1) {
	    	//prevent the default click action
		    event.stopPropagation();
		    event.preventDefault();
		    clickEvent = event;
		    //get the id of event target
	    	item_id = event.target.id.substring(event.target.id.indexOf("_")+1);
	    	if (event.target.id.indexOf("_bm_") > -1) item_id = event.target.parentNode.id.substring(event.target.parentNode.id.indexOf("_")+1);
	    	item_id_num = parseInt(item_id,10);
			//get page url of video
			var vid_href = vhdLinks.snapshotItem(item_id_num).href;
			vid_id = new RegExp(/video\/(.*?)_/gi).exec(vid_href)[1];

			//replace bookmark icon with loader image
			document.getElementById("bm_"+item_id).innerHTML = "";
			var logo = document.createElement('img');
			logo.src = load_gif;
			logo.border = "none";
			logo.align = "absmiddle";
			logo.style.border = "0px";
			document.getElementById("bm_"+item_id).appendChild(logo);

			//finally make the bookmark request
		    GM_xmlhttpRequest({
				method: 'GET',
				url: "http://veehd.com/xhr?t="+(new Date()).getTime()+"&h=bookmark."+vid_id+".0",
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
					'Accept': 'text/html,application/xhtml+xml,application/html',
				},
				onload: function(responseDetails) {
					
					var bmLink = document.getElementById("bm_"+item_id);
						
					//on success, responseText will include html to replace existing image
					var tmpNode = document.createElement('div');
						tmpNode.innerHTML = responseDetails.responseText;
					var resImage = tmpNode.firstChild;
					if (resImage) {
						/*resImage.border = "none";
						resImage.align = "absmiddle";*/
						bmLink.innerHTML = "<b> ✓ </b>";
					} else {
						//already bookmarked
						bmLink.innerHTML = "<b> :P </b>";
						bmLink.id = null;
						bmLink.className = "bmText";
						try {
							unsafeWindow.jQuery(bmLink).fadeOut(1500);
						} catch (e) {
							bmLink.style.display = "none";
						}
					}
				}
			});
		}
	}



function loadVideoPage (_id) {
	var originalHTML = document.getElementById("dl_"+_id).innerHTML;
	document.getElementById("dl_"+_id).innerHTML = "";	
	
	var loadImg = document.createElement('img');
		loadImg.src = load_gif;
		loadImg.style.height = "14px";
		loadImg.style.width = "14px";
		loadImg.border = "none";
		loadImg.align = "absmiddle";
		loadImg.style.border = "0px";

	document.getElementById("dl_"+_id).appendChild(loadImg);
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: vhdLinks.snapshotItem(_id).href,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'text/html,application/xhtml+xml,application/html',
		},
		onload: function(responseDetails) {
	
			var rspTxt = responseDetails.responseText;
			var xpath_url = new RegExp(/http:(.*?)[avi|mp4]&[a-z]=[0-9]+/gi);
			var xpath_title = new RegExp(/<title>(.*?) on Veehd/gi);
			var objLink = new Object();
				objLink.href="";
			var _url, _title, objInfo;
			
			//make sure user is already logged in
			if (rspTxt.match('<a href="/login" class="login">Log In</a>') != null ) {
				
				//user is not logged in, load login page
				GM_xmlhttpRequest({
					method: 'GET',
					url: '/login',
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
					},
					onload: function(rspDetails) {

						try {
							//format login page for lightbox iframe & open lightbox
							objInfo = rspDetails.responseText.substring(rspDetails.responseText.indexOf("Holder2")+8, rspDetails.responseText.indexOf("ul style")-2);
							objInfo = objInfo.substring(objInfo.indexOf("<form"), objInfo.indexOf("</form>")+7);
							objLink.content = getLightboxPage('login', vhdLinks.snapshotItem(_id).href, objInfo);
							showLightbox(objLink);
						} catch (err) {
							var goLogin = prompt("Error: You are not logged in. \n\nClick OK to go to the Login page");
							if (goLogin) {
								window.location.href="/login";
							}
						}
					}
				});
				document.getElementById("dl_"+_id).innerHTML = originalHTML;
			} else if (xpath_url) {
				try{
					_url = responseDetails.responseText.match(xpath_url)[0];
					_title = xpath_title.exec(responseDetails.responseText)[1];

					objInfo = rspTxt.substring(rspTxt.indexOf("<h2 id=\"videoInfo"), rspTxt.indexOf("<h2>other videos"));
					objLink.content=getLightboxPage(_title, _url, objInfo);

					showLightbox(objLink);
				} catch (e) {
					alert("Error: No direct download link detected.");
				}

				document.getElementById("dl_"+_id).innerHTML = originalHTML;
			} else {
				alert("No direct download link found. (You may not be logged in.)");
				document.getElementById("dl_"+_id).innerHTML = originalHTML;
			}
		}
	});
}


function stripHTMLTags(str){
 		var strInputCode = str;
 		/* 
  			This line is optional, it replaces escaped brackets with real ones, 
  			i.e. < is replaced with < and > is replaced with >
 		*/	
/* 	 	strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1){
 		 	return (p1 == "lt")? "<" : ">";
 		});*/
 		var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "").replace(/\t/g, "");
 		return strTagStrippedText;

}

function stripWhiteSpace(str) {
	
	var strTagStrippedText = str.replace(/([\t\n\r])+([ ])*/g, "");
 	return strTagStrippedText;
}


function getLightboxPage(_title, _url, _content){
	var content = _content;
	var page = lb_header;
	if (_title != 'login') {
		page += ln + '	<div class="pageName">' +
		ln + '		<img src="http://static.veehd.com/icoVideoAdded.gif"/>' +
		ln + '    	<h4>Download '+_title+'</h4>' +
		ln + '  </div>' +
		ln + '	<div id="prompt" style="text-align:right;padding-bottom:3px;">' +
		ln + '		<a href="about:blank" class="btn cancel" onclick="parent.hideLightbox();">Cancel</a> <a href="'+_url+'" class="btn confirm" onclick="parent.confirmDownload();">Okay</a>' +
		ln + '	</div>' +
		ln + '	<div class="infoContentHolder">' +
		ln + '		<div style="padding:0px 5px;background-color:#111111;margin-top:5px;border:1px solid #333333;" class="watchHD">';
		
		content = content.replace('<span id="more" style="display:none;">', '');
		content = content.replace('<b>...</b> <small><a href="#" onclick="expandCollapse(\'more\'); return false;">>></a></small>', '');
		content = content.replace('<h2>tags</h2>', '<h2 style="clear:left;margin-top:-20px">tags</h2>');
		content = content.replace('href="/', 'target="_parent" href="/');
		
	} else {
		page += ln + '	<div class="pageName">' +
		ln + '	<img src="http://static.veehd.com/icoFriendsGiant.gif"/>' +
		ln + '	<h1>Login</h1>' +
		ln + '</div>' +
		ln + '	<div class="infoContentHolder">' +
		ln + '		<div style="padding:0px 5px;background-color:#000000;margin-top:5px;border:1px solid #333333;" class="watchHD">';
		content = content.replace('name="ref" value=""', 'name="ref" value="'+window.location.href+'"');
		
	}
	page += content + ln+lb_footer;
	return page;
}


// Below code derived from Lightboxer (http://dezro.com/userscripts)


//
// initLightbox()
// Function runs on window load, going through link tags looking for rel="lightbox".
// These links receive onclick events that enable the lightbox display for their targets.
// The function also inserts html markup at the top of the page which will be used as a
// container for the overlay pattern and the inline image.
//
function initLightbox() {
	var objBody = document.getElementsByTagName("body").item(0);
	
	// create overlay div and hardcode some functional styles (aesthetic styles are in CSS file)
	var objOverlay = document.createElement("div");
	objOverlay.setAttribute('id','overlay');
	objOverlay.style.display = 'none';
	objOverlay.style.position = 'absolute';
	objOverlay.style.top = '0';
	objOverlay.style.left = '0';
	objOverlay.style.zIndex = '4090';
 	objOverlay.style.width = '100%';

	objBody.insertBefore(objOverlay, objBody.firstChild);
	
	var arrayPageSize = getPageSize();
	var arrayPageScroll = getPageScroll();
	
	// preload and create loader image
	var imgPreloader = document.createElement("img");
		imgPreloader.src = loadingImage;
		imgPreloader.style.border = "0px";
	
	// if loader image found, create link to hide lightbox and create loadingimage
	imgPreloader.addEventListener('load', function(){
		var objLoadingImageLink = document.createElement("a");
		objLoadingImageLink.setAttribute('href','#');
		objLoadingImageLink.addEventListener('click', closeLightbox, true);
		objOverlay.appendChild(objLoadingImageLink);
		
		var objLoadingImage = document.createElement("img");
		objLoadingImage.src = loadingImage;
		objLoadingImage.setAttribute('id','loadingImage');
		objLoadingImage.style.position = 'absolute';
		objLoadingImage.style.border = '0px';
		objLoadingImage.style.zIndex = '4150';
		objLoadingImageLink.appendChild(objLoadingImage);

		return false;
	}, true);


	// create lightbox div, same note about styles as above
	var objLightbox = document.createElement("div");
		objLightbox.setAttribute('id','lightbox');
		objLightbox.className = "round10px";
		objLightbox.style.display = 'none';
		objLightbox.style.position = 'absolute';
		objLightbox.style.zIndex = '4100';
	
	objBody.insertBefore(objLightbox, objOverlay.nextSibling);
	
	// create link
	var objLink = document.createElement("a");
		objLink.setAttribute('href','#');
		objLink.style.textDecoration='none';
		objLink.style.color='#ffffff';
		objLink.addEventListener('click', closeLightbox, true);
	
	// create image
	var objImage = document.createElement("iframe");
		objImage.setAttribute('id','lightboxImage');
		objImage.style.border='1px solid #000000';
		objImage.scrolling='auto';
		objLightbox.appendChild(objImage);
	
	// create close btn
	var objCloseBtn = document.createElement("div");
		objCloseBtn.setAttribute('id','closeBtn');
		objCloseBtn.className = "round5px";
		objCloseBtn.background = "#990000";
		objCloseBtn.innerHTML = "<span style='margin-top:-3px;display:block;'>X</span>";
		objCloseBtn.addEventListener('click', closeLightbox, true);
	
	objOverlay.addEventListener('click', closeLightbox, true);
	
	objLink.appendChild(objCloseBtn);
	objLightbox.appendChild(objLink);
}


//
// showLightbox()
// Preloads images. Pleaces new image in lightbox then centers and displays.
//
function showLightbox(objLink)
{
	// prep objects
	var objOverlay = document.getElementById('overlay');
	var objLightbox = document.getElementById('lightbox');
	var objCloseBtn = document.getElementById('closeBtn');
	var objImage = document.getElementById('lightboxImage');
	var objLoadingImage = document.getElementById('loadingImage');
	
	var arrayPageSize = getPageSize();
	var arrayPageScroll = getPageScroll();

	// center loadingImage if it exists
	if (objLoadingImage) {
		objLoadingImage.style.top = (arrayPageScroll[1] + ((arrayPageSize[3] - 35 - objLoadingImage.height) / 2) + 'px');
		objLoadingImage.style.left = (((arrayPageSize[0] - 20 - objLoadingImage.width) / 2) + 'px');
		objLoadingImage.style.display = 'block';
	}

	// set height of Overlay to take up whole page and show
	objOverlay.style.height = (arrayPageSize[1] + 'px');
	try {
		unsafeWindow.jQuery(objOverlay).fadeIn(500);
	} catch (e) {
		objOverlay.style.display = 'block';
	}

	// get our iframe
	var doc = objImage.contentDocument;
	if (doc == undefined || doc == null){
	    doc = objImage.contentWindow.document;
	}
	doc.open();
	doc.write(objLink.content);
	doc.close();
	
	var dwidth = 485;
	var dheight = 320;
       
	objImage.width = dwidth;
	objImage.height = dheight;

	objLightbox.width = dwidth;
	objLightbox.height = dheight;
       
	objCloseBtn.style.top = '0';
	objCloseBtn.style.left = dwidth+'px';
       
	// center lightbox
	objLightbox.style.top = (arrayPageScroll[1] + ((arrayPageSize[3] - 35 - objLightbox.height) / 2) + 'px');
	objLightbox.style.left = (((arrayPageSize[0] - 20 - objLightbox.width) / 2) + 'px');
	
	var dtop = arrayPageScroll[1] + ((arrayPageSize[3] - 25 - dheight) / 2);
	var dleft = ((arrayPageSize[0] - 40 - dwidth) / 2);
	dtop = Math.max(dtop, arrayPageScroll[1]);
	dleft = Math.max(dleft, 0);
	objLightbox.style.top = dtop + 'px';
       objLightbox.style.left = dleft + 'px';


	try {
		unsafeWindow.jQuery(objLightbox).fadeIn(1000);
	} catch (e) {
		objLightbox.style.display = 'block';
	}

	return false;

}


//
// hideLightbox()
//
function hideLightbox()
{
	// get objects
	objOverlay = document.getElementById('overlay');
	objLightbox = document.getElementById('lightbox');
	objImage = document.getElementById('lightboxImage');

	// hide lightbox and overlay
	objLightbox.style.display = 'none';
	try {
		unsafeWindow.jQuery(objOverlay).fadeOut(500);
	} catch (e) {
		objOverlay.style.display = 'none';
	}
	objImage.src = "about:blank";
}

unsafeWindow.hideLightbox = function (event)
{
	// get objects
	objOverlay = document.getElementById('overlay');
	objLightbox = document.getElementById('lightbox');
	objImage = document.getElementById('lightboxImage');

	// hide lightbox and overlay
	objLightbox.style.display = 'none';
	try {
		unsafeWindow.jQuery(objOverlay).fadeOut(1000);
	} catch (e) {
		objOverlay.style.display = 'none';
	}
	objImage.src = "about:blank";
};

unsafeWindow.confirmDownload = function (event)
{
	objImage = document.getElementById('lightboxImage');
	var doc = objImage.contentDocument;
    if (doc == undefined || doc == null){
        doc = objImage.contentWindow.document;
    }
	var prompt = doc.getElementById('prompt');
	var imgLoader = document.createElement("img");
		imgLoader.src = loadingImage;
	prompt.style.textAlign = "center";
	prompt.innerHTML = "<div>Please close this window once your download has started...</div>";
	prompt.appendChild(imgLoader);

	//     doc.open();
	//     doc.write(objLink.content);
	//     doc.close();
	// 
	// objImage.onload = function () {
	// 	alert("boo");
	// };
};

function closeLightbox(event) {
	hideLightbox();
    event.stopPropagation(); event.preventDefault(); return false;
}


// getPageScroll()
// Returns array with x,y page scroll values.
// Core code from - quirksmode.org
//
function getPageScroll(){
	var yScroll;
    yScroll = self.pageYOffset;
    arrayPageScroll = new Array('',yScroll);
	return arrayPageScroll;
}

//
// getPageSize()
// Returns array with page width, height and window width, height
// Core code from - quirksmode.org
//
function getPageSize(){
	var xScroll, yScroll;

    xScroll = document.body.scrollWidth;
    yScroll = window.innerHeight + window.scrollMaxY;
//    yScroll = document.body.scrollHeight;
	
	var windowWidth, windowHeight;
	windowWidth = self.innerWidth;
	windowHeight = self.innerHeight;	
	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}


	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight); 
	return arrayPageSize;
}


init();