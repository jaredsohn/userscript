// ==UserScript==
// @name           Tapuz Photo Preview
// @description	   Show Tapuz Forums attackment images on mouse over
// @namespace      http://kobi
// @include        http://www.tapuz.co.il/Forums2008/*
// @include        http://www.tapuz.co.il/Communa/*
// ==/UserScript==

/*
if(!unsafeWindow) // Google Chrome Support
{
    var unsafeWindow = window;
}*/

var $ = unsafeWindow.jQuery;
var options = {
  showThumbnail: false,
  // other possible spinners: /*'/tapuzforum/images/Emo60.gif'  'http://upload.wikimedia.org/wikipedia/commons/f/f8/Ajax-loader%282%29.gif'*/
  loadingSpinner: 'http://i.imgur.com/aG64j.gif',
  extaTopMargin: 0, // more margin, for the fixed header forums have
  minPopupWidth: 200,
  minPopupHeight: 120
};

  
function relocateImageAccordingToScroll(img, parentTr, extraTopMargin){
	if(extraTopMargin == undefined) extraTopMargin = 8;
	var trTopPosition = parentTr.offset().top + extraTopMargin;
	var documentScrollPosition = unsafeWindow.scrollY + $(unsafeWindow).height() - img.height() - 10;
	img.css('top', 
	  Math.min(trTopPosition, documentScrollPosition) + 'px')
}

function getPhotoUrlFromOnclickAttribute(onClick){
	if(!onClick)
		return;
	// onclick:   goToMsgAtt('http://img2.timg.co.il/forums/1_158600793.jpg',158600793)
	var imgUrl = onClick.match(/http:\/\/[^']*/);
	if(imgUrl)
		return imgUrl[0]; // the first group
	// onClick:  goToMsgAtt(';1_158462131.jpg',158464688)   // I have seen one example of this one...
	var imgFileName = onClick.match(/\(["'];([\d_]+\.\w{2,5})/);
	if(imgFileName)
		// here I hardcode the url, which I prefer not to do, but I don't have much choice here...
		return 'http://img2.timg.co.il/forums/' + imgFileName[1];
	// else? will cause an error anyway.
}

function Token(){
	var thisToken = this;
	
	function hideSpinner(){
		options.spinner.hide(); //todo: confirm, maybe check position, or check the spinner isn't displayed elsewhere
	}
	
	function showSpinner(){
		options.spinner.show();
		relocateImageAccordingToScroll(options.spinner, thisToken.parentTr, 4);
	}
	
	function showPhotoByUrl(url){
		if(thisToken.popupImage){
			thisToken.popupImage.remove();
			delete thisToken.popupImage;
		}

		thisToken.popupImage =
			$('<img />')
			.css({position:'absolute','box-shadow':options.boxShadow,left: options.popupImgPositionLeft, 'z-index':1000})
			.hide().appendTo(thisToken.parentTr)
			.attr('src', url)
			.load(function(){
				if(!thisToken.popupIsVisible)
					return; //in case the image is loaded when the mouse is out.
				hideSpinner();
				relocateImageAccordingToScroll(thisToken.popupImage, thisToken.parentTr);
				thisToken.popupImage.show();
			});
	}
	
	thisToken.getImageUrl = function(width,height){
		// newToken.thumb = newToken.imageUrl.replace(/(http:\/\/[^\/]+)/,"$1/resimg.aspx?corner=0&pencolor=ffffff&pw=70&ph=22&image=");
		width = width || 200;
		height = height || width;
		return thisToken.imageUrl.replace(/(http:\/\/[^\/]+)/,"$1/resimg.aspx?corner=0&pencolor=ffffff&pw=" + width + "&ph=" + height + "&image=");
	};
	
	thisToken.hidePopup = function(){
		thisToken.popupIsVisible = false;
		hideSpinner();
		if(thisToken.popupImage) thisToken.popupImage.hide();
	};
	
	thisToken.getPreviewWidth = function(){
		var right = thisToken.parentLink.offset().left - 120; //postion of the img link - the rightest thing.
		var left = options.popupImgPositionLeftInt; //was: thisToken.parentTr.offset().left
		return Math.floor(right - left);
	};
	
	thisToken.showPhoto = function(){
		thisToken.popupIsVisible = true;
		//get size for image:
		var maxWidth = thisToken.getPreviewWidth();
		var maxHeight = $(unsafeWindow).height() - 20 - options.extaTopMargin;
		maxWidth = Math.max(maxWidth, options.minPopupWidth);
		maxHeight = Math.max(maxHeight, options.minPopupHeight);
		var url = thisToken.getImageUrl(maxWidth, maxHeight); 
		// sample: http://img2.tapuz.co.il/resimg.aspx?corner=0&pencolor=ffffff&pw=1090&ph=898&image=/forums/1_163034754.JPG

		if(thisToken.popupImage && thisToken.popupImage.attr('src') == url){
			relocateImageAccordingToScroll(thisToken.popupImage, thisToken.parentTr);
			thisToken.popupImage.show();
			return;
		}
		showSpinner();
		showPhotoByUrl(url);
	};
}

$(function(){
  var tokenDataKey = 'kobi_tapuz_image_preview_token';

  var tokens = [];
  options.tokens = tokens;

  // search for forum image links:
  // forums have these little tags with image attachments
  var imageTags = $('img[src*=Attch]')
					.filter(function (){
						return $(this).attr('src').match(/\bt_(?:jpg|gif|bmp|png)\.gif$/i);
					});
  // new forums use href for image links, instead of olschool onClick.
  var imageTagsLinkParents = imageTags.parent();
  options.isNewForum = imageTagsLinkParents.filter('[href]').length > 0 && imageTagsLinkParents.filter('[onClick]').length == 0;
  options.isOldForum = imageTagsLinkParents.filter('[href]').length == 0 && imageTagsLinkParents.filter('[onClick]').length > 0;
  imageTags.each(function(){
	try {
		var newToken = new Token();

		newToken.parentLink = $(this).parent();
		newToken.imageUrl = options.isNewForum ?
								newToken.parentLink.attr('href') :
								getPhotoUrlFromOnclickAttribute(newToken.parentLink.attr('onClick'));

		//newToken.thumb = newToken.getImageUrl(70, 22);
		//newToken.previewUrl = newToken.getImageUrl(230, 1000);
		// parent: div.msgContainer on old forums, div.msg-title on new forums
		newToken.parentTr = newToken.parentLink.parents('div.msgContainer, div.msg-title').eq(0);

		tokens.push(newToken);
	} catch(e) {}
  }); //each img

  
  // comunes have links
  var communeAttachments = $("a[href^='javascript:show_attch'] > font").filter(":contains('jpg'), :contains('png')");
  options.isCommune = communeAttachments.length > 0;
  communeAttachments.each(function(){
	try{
		var newToken = new Token();
		newToken.parentLink = $(this).parent();
		newToken.parentTr = newToken.parentLink.parents('tr').eq(2);
		
		var imgName = newToken.parentLink.attr('href').match(/\d+\.\w+/)[0];
		newToken.imageUrl = 'http://img2.tapuz.co.il/CommunaFiles/' + imgName; //the resize function needs something like this
		//newToken.thumb = newToken.getImageUrl(70, 22);
		//newToken.previewUrl = newToken.getImageUrl(230, 1000);
		tokens.push(newToken);
	} catch(e) {}
  });// each commune attachment
  
  
  //set options
  if(options.isOldForum){
	options.popupImgPositionLeft = '375px';
	options.thumbnailRightMargin = '0';
  } else if(options.isNewForum){
	options.popupImgPositionLeft = '420px';
	options.thumbnailRightMargin = '3px';
	imageTagsLinkParents.css('white-space','nowrap');
	imageTagsLinkParents.parent('.attachmentIndicator').css('width', 'auto');
	options.extaTopMargin = $('#pageHeader').height() || 0;
	} else if(options.isCommune){
	options.popupImgPositionLeft = '332px';
	options.thumbnailRightMargin = '2px';
} else return; // not old forum, new forum or commune
  
  options.popupImgPositionLeftInt = parseInt(options.popupImgPositionLeft,10);
  
  options.spinner =
	$('<img />')
    .css({position:'absolute',
		left: options.popupImgPositionLeft, /*'margin-top':'-20px',*/
        /*'box-shadow': boxShadow,*/ 'z-index':'1000'})
      .attr('src', options.loadingSpinner) //temp spinner
      .hide()
	  .appendTo('body');
  
  options.boxShadow = '0px 3px 5px 2px rgba(80,80,80,0.7)';
  
  $.each(tokens, function(i, token){
    try{
    //var link = $(this).parent(); //('a');
    //var imgUrl = link.attr('onClick').match(/http:\/\/[^']*/)[0];
    //var thumb = imgUrl.replace(/(http:\/\/[^\/]+)/,"$1/resimg.aspx?corner=0&pencolor=ffffff&pw=70&ph=22&image=")
    //var previewUrl = thumb.replace(/pw=\d+&ph=\d+/,"pw=230&ph=1000")
	
	var imgThumbnail = $('<img />')
						.css('margin-right', options.thumbnailRightMargin)
						.css('vertical-align', 'middle')
						.attr('alt', '[^]')
						//.attr('src', options.showThumbnail ? token.thumb : 'http://i.imgur.com/1uXBY.gif')
						.attr('src', 'http://i.imgur.com/1uXBY.gif')
						;
	//show the default icon first, and the thumbnail after they are loaded. Tapuz can be slow.
	if(options.showThumbnail)
		imgThumbnail.attr('src', token.getImageUrl(70, 22));
	
    token.parentLink.append(imgThumbnail);
	
	if(options.isNewForum){ //jquery 1.7 - we have .on()
		token.parentTr.on('mouseenter', '.msg-body', function(){
			token.hidePopup();
		})
    }
	
	token.parentTr.data(tokenDataKey, token)
	
    token.parentTr.hover(function(){
		if(token.parentTr.children('.msg-body:visible').length)
			return;
		token.showPhoto();
        }//hover-in
        ,function(){ //hover-out
			token.hidePopup();
		})
		.click(token.hidePopup)
		;

    //http://img2.timg.co.il/forums/1_137882815.jpg
    //http://img2.tapuz.co.il/resimg.aspx?corner=0&pencolor=ffffff&pw=50&image=/forums/1_137882784.jpg
    }
    catch(e){
    }
  });//each token
});//doc.ready
