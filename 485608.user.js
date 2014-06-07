// ==UserScript==
// @name       		Fetlife Photo's FancyBox
// @version    		0.1
// @description 	This userscript will change the behaviour of clicking foto's in the 'Recently added' section of a user's profile, the 'Browse all pictures' user page and the liked pictures in your home friends feed. Clicking the foto will no longer take you to the detail page (which takes forever to load), but will launch a lightbox that shows the highest resolution available for that picture. You can browse the album by clicking the picture or by using your arrow keys. Also, you can like the picture by clicking the heart under it.
// @match      		https://fetlife.com/users/*/pictures
// @match      		https://fetlife.com/users/*
// @match      		https://fetlife.com/home/*
// @copyright  		2014+, Mewmewmewmew

// @require			http://code.jquery.com/jquery-latest.js

// @require			file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\jquery.fancybox.pack.js
// @resource		fancyBoxCss               file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\jquery.fancybox.css
// @resource		fancybox_sprite.png       file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\fancybox_sprite.png
// @resource		fancybox_sprite@2x.png    file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\fancybox_sprite@2x.png
// @resource		fancybox_loading.gif      file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\fancybox_loading.gif
// @resource		fancybox_loading@2x.gif   file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\fancybox_loading@2x.gif
// @resource		fancybox_overlay.png      file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\fancybox_overlay.png
// @resource		blank.gif                 file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\blank.gif

// @grant			GM_addStyle
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_getResourceText
// @grant			GM_getResourceURL
// @grant			GM_xmlhttpRequest 
// ==/UserScript==


/*
 * 
 * Description:
 * -------------------
 * 
 * 	This userscript will change the behaviour of clicking foto's in the 'Recently added' section of a user's profile, the 'Browse all pictures' user page and 
 * 	the liked pictures in your home friends feed. 
 * 	Clicking the foto will no longer take you to the detail page (which takes forever to load), but will launch a lightbox that shows the highest resolution available 
 * 	for that picture. You can browse the album by clicking the picture or by using your arrow keys. Also, you can like the picture by clicking the heart under it.
 * 
 * 
 * 
 * Installation:
 * -------------------
 * 
 * 	Note that this script requires you to store a local version of the fancybox plugin. Download it here:
 * 
 * 	http://fancyapps.com/fancybox/
 * 
 * 	Download and extract the archieve. Copy the file path and change all file paths in the @require and @resource part of this script's headers:
 * 
 * 	For example:
 * 		Extract the plugin in C:\scripts\
 * 		Change these lines:
 *			@require			file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\jquery.fancybox.pack.js
 *			@resource		fancyBoxCss               file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\jquery.fancybox.css
 *			@resource		fancybox_sprite.png       file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\fancybox_sprite.png
 *			@resource		fancybox_sprite@2x.png    file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\fancybox_sprite@2x.png
 *			@resource		fancybox_loading.gif      file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\fancybox_loading.gif
 *			@resource		fancybox_loading@2x.gif   file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\fancybox_loading@2x.gif
 *			@resource		fancybox_overlay.png      file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\fancybox_overlay.png
 *			@resource		blank.gif                 file://C:\xampp\htdocs\tampermonkey\plugins\fancyapps-fancyBox\source\blank.gif
 *		Into:
 *			@require			file://C:\scripts\fancyapps-fancyBox\source\jquery.fancybox.pack.js
 *			@resource		fancyBoxCss               file://C:\scripts\fancyapps-fancyBox\source\jquery.fancybox.css
 *			@resource		fancybox_sprite.png       file://C:\scripts\fancyapps-fancyBox\source\fancybox_sprite.png
 *			@resource		fancybox_sprite@2x.png    file://C:\scripts\fancyapps-fancyBox\source\fancybox_sprite@2x.png
 *			@resource		fancybox_loading.gif      file://C:\scripts\fancyapps-fancyBox\source\fancybox_loading.gif
 *			@resource		fancybox_loading@2x.gif   file://C:\scripts\fancyapps-fancyBox\source\fancybox_loading@2x.gif
 *			@resource		fancybox_overlay.png      file://C:\scripts\fancyapps-fancyBox\source\fancybox_overlay.png
 *			@resource		blank.gif                 file://C:\scripts\fancyapps-fancyBox\source\blank.gif
 * 
 * 
 * 
 * 
 * 	Note:
 * 		This is a userscript. It requires either Greasemonkey (Firefox plugin) or TamperMonkey (Chrome extension) to run. 
 * 		It is best to first download the fancybox plugin and change the @require and @resource headers and then install the script.
 * 
 * 
 * 
 * 
 * 
 * 
 * 	For questions, contact me on Fetlife!
 * 		Mewmewmewmew
 * 
 * 
 * */


console.log("Starting Fetlife Photo's FancyBox");

var setupPlugins = function(){

	var setupFancybox = function(){
	
		var fetchCss = function(){
			
			var resources = [
				'fancybox_sprite.png',
				'fancybox_sprite@2x.png',
				'fancybox_loading.gif',
				'fancybox_loading@2x.gif',
				'fancybox_overlay.png',
				'blank.gif',
			];
			
			var css = GM_getResourceText ('fancyBoxCss');
			var i;
			for(i=0;i<resources.length;i++){
				var resourceName = resources[i];
				var resourceUrl = GM_getResourceURL(resourceName);
				css = css.replace( resourceName, resourceUrl);
			}
			return css;
		};
		
		// setup css
		GM_addStyle(fetchCss());
		GM_addStyle(".fancybox-nav{background-color:rgba(0,0,0,0) !important;}");
		GM_addStyle(".fancybox-close{background-color:rgba(0,0,0,0) !important;}");
	};
	
	
	setupFancybox();
};
setupPlugins();

// TODO: have these select methods check if we're on the right page
var selectPicturePageImages = function(){
    return $('#pictures').find('ul.page').find('li').find('img');
};
var selectProfilePageImages = function(){
    return $('h3.bottom').filter(function(){
        return $(this).html()==='Latest pictures '
    }).nextAll().find('img');
};
var selectFeedImages = function(){
    return $('table.af.mbl').find('.fl.mrs').find('img');
};
var selectMiniFeedImages = function(){
    return $('.mini_feed_picture_other_side,.mini_feed_picture').find('img');
};
var selectPictures = function(){
  	var selection = $('');
    selection = selection.add(selectPicturePageImages());
    selection = selection.add(selectProfilePageImages());
    selection = selection.add(selectFeedImages());
    selection = selection.add(selectMiniFeedImages());
    return selection;
};


var waiter = function(args){
    var checker = function(){
        if(args.checker()===true){
            args.onReady();
        }
        else{
            setTimeout(checker, 200);
        }
    };
    checker();
};
var watcher = function(args){

    var value = args.value();
	
    var watch = function(){
        
        var oldValue = value;
        var newValue = args.value();
        
        // console.log(oldValue + ', ' + newValue);
        
        if(oldValue !== newValue){
            args.onChange(newValue, oldValue);
        	value = newValue;
        }
        setTimeout(watch, args.delay);
        
    };
    if(args.runOnStart){
        args.onChange(args.value(), value);
    }
    
    watch();
};

var setupPictures = function(){

	var handleImg = function(){
		
		var src = this.src;
		src = src.replace(/_[0-9]+(\.[a-zA-Z]+)$/,'_958$1');
		
		var href = $(this).parents('a').first().attr('href');
		
		var oldPictureId = $(this).parent().data('pictureId');
		if(oldPictureId === undefined){
			var m = href.match(/[0-9]+/g);
			var pictureId = m[m.length-1];
			$(this).parent().data('pictureId', pictureId);
			$(this).parent().data('originalUrl', href);
			// console.log('pictureId=', pictureId);
		}
		
		$(this).parent()
		.attr('href', src)
		.attr('class', 'fancybox')
		.attr('title', '&nbsp;')
		.attr('rel', 'group');
		
		
		$(this).css({'cursor': 'pointer'});
		
	};

	var pictures = selectPictures();
	pictures.each(handleImg);



	$(".fancybox").fancybox({
		beforeLoad	: function(){
			
			var pictureId = this.element.data('pictureId');
			
			$.ajax({
				url			: 'https://fetlife.com/pictures/'+pictureId+'/likes',
				dataType	: "json",
				success		: function(element){return function(data) {
					element.data('likeData', data);
				};}(this.element)
			});
			
			
		},
		afterShow	: function() {
			
			// wait for this.element.data('likeData')
			waiter({
				checker	: function(element){return function(){
					return element.data('likeData')!==undefined;
				};}(this.element),
				onReady	: function(that){return function(){
					
					var likeData = that.element.data('likeData');
					// console.log('likeData=', likeData);
					
					if(likeData.user_can_like){
						var pictureId = that.element.data('pictureId');
						var originalUrl = that.element.data('originalUrl');
				
				
				
						var setLikeButtonContent = function(button, likeData){
							button.html('<span style="cursor:pointer;font-family: \'Pictos\', sans-serif;font-size:25px;'+(likeData.is_liked_by_user?'color:red;':'')+'">k</span> '+likeData.total);
						};
						var likeButton = $('<span></span>')
							.on('click', function(pictureId, likeData){return function(){
								var jqxhr = $.ajax({
									url			: '../../pictures/'+pictureId+'/likes/toggle',
									type		: "post"
								}).done(function(likeData){return function(data){
									if(likeData.is_liked_by_user){
										likeData.is_liked_by_user = false;
										likeData.total--
									}
									else{
										likeData.is_liked_by_user = true;
										likeData.total++;
									}
									
									setLikeButtonContent(likeButton, likeData);
									
								};}(likeData)).fail(function(){
									console.log('Ajax request failed: ', arguments);
								});
							};}(pictureId, likeData));
			
						setLikeButtonContent(likeButton, likeData);
						
						
						
						var counter = $('<span>'+(that.index+1)+' / '+that.group.length+'</span>');
						counter.css({
							'margin-left'	: '50px',
						});
						
						
						var originalPictureUrl = $('<a href="'+originalUrl+'">Original link</a>');
						originalPictureUrl.css({
							'margin-left'	: '50px',
						});
						
						$('div.fancybox-title').find('span.child').html('').append(likeButton).append(originalPictureUrl).append(counter);
					}
					
				};}(this),
			});
			
		} 
	});
    
};

watcher({
    value		: function(){
        return selectPictures().length;
    },
    onChange	: function(newValue, oldValue) {
    
        console.log('setupPictures');
        setupPictures();
        
        return newValue;
    },
    delay		: 500,
    runOnStart	: true,
});
