
// ==UserScript==
// @name          Facebook Autolike  fb.com/sajjad.mohammadi2
// @namespace     http://silverboy.ir
// @description   Facebook Autolike
// @version        1.5.2
// @include     /^https?://www\.facebook\.com/.*$/
// @require       http://code.jquery.com/jquery-1.8.0.min.js
// @grant       none
// ==/UserScript==
	jQuery.noConflict();
	var autolikeLiked = 0;
	var autolikeTimeout = false;
	var autolikeArray = Array(3000, 2000, 4000, 1500,3000, 2000, 4000, 1500,3000, 2000, 4000, 1500);
checkforpopup = function()
	{

		if(jQuery('div._n8').length > 0)
			{
				if(jQuery('div._n8').css('display') == 'none')
					return true;
				else
					return false;
			}
		else
			return true;
	}
	checkNotificationList = function(){
		if(jQuery('#fbNotificationsFlyout').css('display') == 'none')
			return true;
		else
			return false;
	}
	function autolikeFunc(){
		if(autolikeLiked == 60)
			return false;
		if(jQuery('span.UIActionLinks,a.UFILikeLink').length > 0 && jQuery('button[name="like"]').length == 0)
			{
			if(jQuery('span.UIActionLinks').length > 0)
			 var a = jQuery('span.UIActionLinks').find('a');
			else 
			 var a = jQuery('a.UFILikeLink');
			jQuery(a).each(function(){
			         if(jQuery(this).attr('title') == 'Like this comment')
			             return true;
					if(!checkforpopup() || !checkNotificationList())
						{
							if(autolikeTimeout != false)
								clearTimeout(autolikeTimeout);
							autolikeTimeout = setTimeout(autolikeFunc, 5000);
							return false;
						}
					if(jQuery(this).html() == 'Like')
						{
							jQuery(this).removeAttr('href');
							jQuery(this)[0].click();
							//jQuery(this).parent()[0].click();
							var num =  Math.floor((Math.random()*10)+1);
							clearTimeout(autolikeTimeout);
							var autolikeArray = Array(3000, 2000, 4000, 1500,3000, 2000, 4000, 1500,3000, 2000, 4000, 1500);
							setTimeout(autolikeFunc, autolikeArray[num])
							autolikeLiked++;
							return false;
						}
					else
						{
							if(autolikeTimeout != false)
								clearTimeout(autolikeTimeout);
							autolikeTimeout = setTimeout(autolikeFunc, 15000);
						}
				})
			}
		else {
			if(jQuery('button[name="like"]').length == 0)
			{
				if(autolikeTimeout != false)
					clearTimeout(autolikeTimeout);
				autolikeTimeout = setTimeout(autolikeFunc, 15000);
				return false;
			}
			jQuery('button[name="like"]').each(function(){
				if(!checkforpopup() || !checkNotificationList())
				{
					if(autolikeTimeout != false)
						clearTimeout(autolikeTimeout);
					autolikeTimeout = setTimeout(autolikeFunc, 5000);
					return false;
				}
				jQuery(this).click();
				var num =  Math.floor((Math.random()*10)+1);
				clearTimeout(autolikeTimeout);

				setTimeout(autolikeFunc, autolikeArray[num])
				autolikeLiked++;
				return false;
			})
		}
	}
	if(location.href == 'http://facebook.com' || location.href == 'https://facebook.com'
		|| location.href == 'http://www.facebook.com' || location.href == 'https://www.facebook.com'
		|| location.href == 'http://www.facebook.com/' || location.href == 'https://www.facebook.com/')
		autolikeFunc();
	else {
		var div = document.createElement('div');
		jQuery(div).html('Do you Want To Like All Post In This Page?').css({
			width : '290px',
			height : '16px',
			position : 'absolute',
			top : '0px',
			left : '600px',
			border : '1px dotted silver',
			padding : '15px 5px 5px',
			background : 'rgba(255, 255, 255, 0.6)',
			textAlign : 'center'
		}).appendTo('#blueBar');
		var yes = document.createElement('a');
		var no = document.createElement('a');
		jQuery(yes).html(' Yes ').attr('href', 'javascript:void(0)').appendTo(div).click(function(){
			autolikeFunc()
			jQuery(div).hide();
		}).addClass('uiButton').css('border-radius', '3px');
		jQuery(no).html(' No ').attr('href', 'javascript:void(0)').appendTo(div).click(function(){
			jQuery(div).hide();
		}).addClass('uiButton').css('border-radius', '3px');
	}
	//autolikeFunc();
