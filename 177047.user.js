// ==UserScript==
// @name       Easy Nav
// @namespace  http://use.i.E.your.homepage/
// @version    0.73
// @description  enter something useful
// @match      http*://*.rule34.xxx/*page=post*
// @match      http*://rule34.xxx/*page=post*
// @copyright  2013+, Anonymous540
// @require 	https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==


// console.debug($.fn.jquery);
// console.debug($('.content span.thumb'))


// CSS for navigation window
image_nav_background_css = 'width: 100%; height: 100%; z-index: 100; position: absolute; background: rgba(0, 0, 0, 0.75);margin:0;display:none';
image_nav_overlay_css = 'width: 100%; height: 100%;z-index: 101; position: absolute;margin:auto;display:none;text-align: center;pointer-events:none;';
image_nav_content_css = 'pointer-events:auto;max-width: 100%; max-height: 100%;';
image_nav_image_css = 'max-width:100%;max-height: 100%;vertical-align:middle;z-index:2';
image_thumb_image_css = 'vertical-align: middle;z-index: 9000;display: inline-block;height: 32px;background-image: url(\'\/\/i.imgur.com\/itWV7LD.gif\');width: 32px;position:absolute;top: 50%;left: 50%;';
arrow_style = 'height:100%; width:25px; background: rgba(0, 0, 0, 0.50); margin:0;color:white;display:inline-block;cursor:pointer; vertical-align: middle;position: absolute;';
right_arrow_style = arrow_style+';right:0;';
left_arrow_style = arrow_style+';left:0;';
arrow_style_text = 'vertical-align: middle;';
image_nav_text_overlay_css= 'position: absolute;bottom:0;width: 100%;text-align: center;right: 0px;background: rgba(255, 255, 255, 0.75);'


// Creates the navigation window
$('head').append('<style>'+
'.image_nav_content .image_nav_text_overlay{'+
'		display:none;'+
'	}'+
'	.image_nav_content:hover span.image_nav_text_overlay{'+
'		display:inline-block;'+
'	}'+
'</style>');

$('body').prepend('<div class="image_nav_background" style="'+image_nav_background_css+'"></div><div class="image_nav_overlay" style="'+image_nav_overlay_css+'"><span class="image_nav_content" style="'+image_nav_content_css+'"><div class="left_arrow arrow" style="'+left_arrow_style+'"><span style="'+arrow_style_text+'"><<</span></div><div class="right_arrow" style="'+right_arrow_style+'"><span style="'+arrow_style_text+'">>></span></div><span style="'+image_nav_text_overlay_css+'" class="image_nav_text_overlay">Testing123</span><a href=""><div src="" style="'+image_thumb_image_css+'" class="thumb_img"></div><img src="" style="'+image_nav_image_css+'" data-real-height="" data-real-width="" data=image-number="" class="main_img"></a></span></div>').



// Turn most of the elements into a value
$image_nav_background = $('.image_nav_background') // No clue why this doesn't work. I link to the element directly instead.
$image_nav_overlay = $('.image_nav_overlay')
$nav_content = $('.image_nav_content');
$nav_content_img = $('img.main_img', $nav_content);
$nav_thumb_img = $('div.thumb_img', $nav_content);
$left_arrow = $('.left_arrow', $nav_content);
$right_arrow = $('.right_arrow', $nav_content);
$text_overlay = $('.image_nav_text_overlay', $nav_content);

// Array which the images will be stored
var Loaded_Images = {};
var Loaded_Images_array = []; //Just the IDs for sorting
var Loaded_Images_array_current; // Will be the current image

// Processes a URL and returns the page number
function ProcessPagination(a){
	if(a != undefined){
		// console.debug(a.attr('href'));
		var urlPage = a.match(/pid\=[0-9]{1,}/)[0].replace('pid=','');
		return ( parseInt(urlPage)  /50 ) + 1;
	}else{
		return CurrentPage;
	}; 
}


// Some values which might change in the future
var CurrentPage = parseInt($('#paginator .pagination b').text());
var FirstPage = ProcessPagination($('#paginator .pagination [alt="first page"]').attr('href'));
var LastPage = ProcessPagination($('#paginator .pagination [alt="last page"]').attr('href'));
var ImagesPerPage = 50
var Navigation_Text = 'Easy Navigation'
var Enable_Loading_Icon = true;
var Setting_ImageLinkBegins = 'index.php?';


// Sorts the image IDs into an array and also labels their page number and image number on the list
function Sort_Object(SortObject){
	var Sorted = [];
	for(var key in SortObject)
	{
		Sorted.push(key);
	}
	return Sorted.sort(function(a, b) {

		// Sort by page
		var PageCount = Loaded_Images[a].page - Loaded_Images[b].page;
		if(PageCount) return PageCount;

		// If there is a tie, sort by image number
		var ImageCount = Loaded_Images[a].number - Loaded_Images[b].number;
		return ImageCount;
	});
}


// Pointless, I used this for debugging
function Sort_images(){
	Loaded_Images_array = Sort_Object(Loaded_Images)
	/*
	var counting = 0
	var count_info = '';
	$.each(Loaded_Images_array,function(index,value){
		count_info+= 'Number: '+index+' | Page: '+Loaded_Images[value].page+' | Image: '+Loaded_Images[value].number+'\n';
		counting++
	})
	console.debug(counting+' Images sorted\n'+count_info)
	*/
};

// The function that is called everytime a new image is selected, either through navigating left, right, or clicking a link.
function LoadImage(ImageID){
	Loaded_Images_array_current = Loaded_Images_array.indexOf(ImageID);
	// console.debug(Loaded_Images);
	
	var ImageThumb = Loaded_Images[ImageID].thumb
	var ImageMain = Loaded_Images[ImageID].main
	var LoadingImage = true;

	
	// Sets the link on the image to the image page
	$nav_content_img.parent().attr('href',Loaded_Images[ImageID].link)
	
	// Formats all the tags into a list of links
	var ImageTagsFormatted = [];
	var ImageTags = Loaded_Images[ImageID].tags.split(" ");
	$.each(ImageTags, function(index, value) {
		ImageTagsFormatted.push('<a href="http://rule34.xxx/index.php?page=post&s=list&tags='+value+'">'+value+'</a>');
	})
	
	$('.image_nav_background').show();
	$image_nav_overlay.show();
	$nav_thumb_img.show();
	$text_overlay.empty().append('<a href="'+Loaded_Images[ImageID].link+'" class="main_image_direct_link">'+Loaded_Images[ImageID].filename+'</a> | Page '+Loaded_Images[ImageID].page+' | Image '+Loaded_Images[ImageID].number+'<br>'+ImageTagsFormatted.join(' | '))
	
	$nav_content_img
	.data('ImageId',ImageID)
	
	var current_status = Loaded_Images[ImageID].status;
	
	// Loads the image if it's already been verified previously.
	if(current_status == 'loaded' || current_status == 'error'){
		$nav_content_img.attr('src',ImageMain)
		if(current_status != 'loading')$nav_thumb_img.hide();
		$('.main_image_direct_link',$text_overlay).attr('href',ImageMain)
		
		RepositionMainImage();
	
	// Checks each image extension until it finds a working one
	}else if(current_status == 'waiting'){
		Loaded_Images[ImageID].status = 'loading';
		GM_xmlhttpRequest({
			method: "GET",
			url: '/'+Loaded_Images[ImageID].link,
			onload: function(retour) {
				Loaded_Images[ImageID].verified = true
				var image;
				var ResponseHTML = $(retour.responseText);
				var ImageServer = $('div.content script:contains("image"):contains("domain"):contains("base_dir")',ResponseHTML).text();
				eval(ImageServer)
				var new_image_url = image.domain+"/"+image.base_dir+"/"+image.dir+"/"+image.img;
				Loaded_Images[ImageID].main = new_image_url
				$("<img/>")
					.attr("src", new_image_url)	
					.one('load',function(){
						Loaded_Images[ImageID].status = 'loaded';
					// Checks to make sure the successfully loading image actually is the one selected, since the load function for a previous image might be called after the user has switched to another.
						if($nav_content_img.data('ImageId') == ImageID){
							$nav_content_img.attr('src',new_image_url);
							$nav_thumb_img.hide();
							$('.main_image_direct_link',$text_overlay).attr('href',new_image_url)
							RepositionMainImage();
						}						
					})
					.one('error',function(){
						Loaded_Images[ImageID].status = 'error';
						if($nav_content_img.data('ImageId') == ImageID){
							$nav_content_img.attr('src','/images/404.gif').one('load',function(){RepositionMainImage();});
							$nav_thumb_img.hide();
							$('.main_image_direct_link',$text_overlay).attr('href',new_image_url)
						}
					});;
			}
		});
	}
	
	// Prevent left and right scrolling in background
	$('body').css({'overflow-x' : 'hidden', 'overflow-y': 'hidden'})
}



// Function to add an image to the Loaded_Images object
function AddImage(ImageID,ImageThumb,ImageMain,ImagePage,ImageNumber,ImageLink,ImageTags){
	Loaded_Images[ImageID] = {};
	Loaded_Images[ImageID]['status'] = 'waiting';
	Loaded_Images[ImageID]['id'] = ImageID
	Loaded_Images[ImageID]['thumb'] = ImageThumb
	Loaded_Images[ImageID]['main'] = ImageMain
	Loaded_Images[ImageID]['page'] = ImagePage
	Loaded_Images[ImageID]['number'] = ImageNumber
	Loaded_Images[ImageID]['link'] = ImageLink
	Loaded_Images[ImageID]['filename'] = ImageMain.match(/\/[0-9a-zA-Z]{1,}.[a-z]{3,4}\?/)[0].replace('/','').replace('?','')
	Loaded_Images[ImageID]['tags'] = ImageTags
}

// Checks if Loading icon is enabled
if(!Enable_Loading_Icon){
	$nav_thumb_img.css('background-image', '')
};

// This is called when wanting to go 1 image forward, or backward. Usually when using the arrow keys or clicking the arrow buttons.
function Next_Image(direction){
	// console.debug('Next Image clicked in '+direction+' direction')
	
	var NextCount = Loaded_Images_array_current;
	
	// Checks direction and adds or subtracts
	if(direction == 'right'){
		NextCount++
	}else if(direction == 'left'){
		NextCount--
	}else if(direction == 'up'){
		NextCount-=7
	}else if(direction == 'down'){
		NextCount+=7
	};
	
	// Checks to see if image exists. If not, loads the next page.
	var ImageID = Loaded_Images_array[NextCount];
	// console.debug(ImageID + 'loading')
	if(ImageID !== undefined){
		LoadImage(ImageID)
	}else{
		Load_Page(Loaded_Images[Loaded_Images_array[Loaded_Images_array_current]].id)
	}
	
	// console.debug(NextCount)

}


// Loads the images from the next page
 function Load_Page(CurrentImageID){
	
	
	var Image_Number = Loaded_Images[CurrentImageID].number;
	var Image_Page = Loaded_Images[CurrentImageID].page
	
	// Checks which page direction and if it's the end of the list.
	
	// Going towards the left
	var backPaging = (Image_Number <= 1 && Image_Page > 1)
	var FrontWall = (Image_Page == FirstPage)
	
	// Going towards the right
	var forwardPaging = (Image_Number >= ImagesPerPage && Image_Page >= 1)
	var RearWall = (Image_Number < ImagesPerPage && Image_Page == LastPage)
	if(backPaging && !FrontWall){
		var PageSelect = Image_Page-1
		// console.debug('backpaging')
	}else if(forwardPaging && !RearWall){
		var PageSelect = Image_Page+1
		// console.debug('forwardPaging')
	}else{
		// console.debug('wall')
		PageSelect = Image_Page
	};

	
	
	// Takes the requested page and converts into a URL string to load.
	if(backPaging || forwardPaging){
	$nav_thumb_img.show();
	PageSelect -= 1
	PageSelect = PageSelect*ImagesPerPage
	
	if(document.URL.indexOf('pid=') > -1){
		var requestURL = document.URL.replace(/pid\=[0-9]{1,}/,'pid='+PageSelect);
	}else{
		var requestURL = document.URL+'&pid='+PageSelect;
	};
	// console.debug(requestURL+' Loading...')
	GM_xmlhttpRequest({
		method: "GET",
		url: requestURL,
		onload: function(retour) {
			// console.debug(retour)
			$nav_thumb_img.hide();
			ResponseHTML = $(retour.responseText);
			var ImageNumber = 0
			$('.content span.thumb', ResponseHTML).each(function(){
			
				var $this_span = $(this)
				var ImageID = $this_span.attr('id');
				var ImageThumb = $('img.preview' ,$this_span).attr('src');
				var ImageTags = $('img.preview' ,$this_span).attr('alt');
				var ImagePage = parseInt($('#paginator .pagination b', ResponseHTML).text());
				var ImageMain = ImageThumb.replace('thumbnail_','').replace("/r34/thumbnails/",'//images/').replace("/rule34/thumbnails/",'/rule34//images/')
				var ImageLink = $('a[href^="'+Setting_ImageLinkBegins+'"]',$this_span).attr('href');
				
				// console.debug(ImageMain);
				// http://cdn.rule34.xxx/r34/thumbnails/1354/thumbnail_23a69eecacb1cd8c36045e45657800e8f257e950.jpg?1411722
			
				ImageNumber++
				
				AddImage(ImageID,ImageThumb,ImageMain,ImagePage,ImageNumber,ImageLink,ImageTags)
				
			});
			
			Sort_images();
			var Cur_Image_ID = $('.image_nav_content img.main_img').data('ImageId')
			var Image_Number2 = Loaded_Images_array.indexOf(Cur_Image_ID);
			if(backPaging){
				Image_Number2--
				// console.debug('backPaging')
			}else if(forwardPaging){
				Image_Number2++
				// console.debug('forwardPaging')
			}
			// console.debug(Cur_Image_ID+' ID, Number: '+Image_Number2)			
			New_Image = Loaded_Images_array[Image_Number2]
			// console.debug(New_Image)
			LoadImage(New_Image);
			
		}
	});
	};
       
}

//Sets the image margins upon resizing the window
function RepositionMainImage(){	
	
	$nav_content_img.css('margin', 'auto')
		
	var ImgWidth = $nav_content_img.width();
	var WindowWidth = parseInt(window.innerWidth);
	var HMargin = (WindowWidth-ImgWidth)/2;

	var ImgHeight = $nav_content_img.height();
	var WindowHeight = parseInt(window.innerHeight);
	var VMargin = (WindowHeight-ImgHeight)/2;

	// console.debug(VMargin+'px '+HMargin+'px')
	$nav_content_img.css('margin', VMargin+'px '+HMargin+'px')
	$text_overlay.css({'margin-bottom' : VMargin+'px'})
	
	
	
};

// Goes through each thumbnail on the page
var ImageNumber=0
$('.content span.thumb').each(function(){
	var $this_span = $(this)
	var ImageID = $this_span.attr('id');
	var ImageThumb = $('img.preview' ,$this_span).attr('src');
	var ImageTags = $('img.preview' ,$this_span).attr('alt');
	var ImagePage = CurrentPage;
	var ImageLink = $('a[href^="'+Setting_ImageLinkBegins+'"]',$this_span).attr('href');
	
	// Turns the thumbnail link into the primary image link.
	var ImageMain = ImageThumb.replace('thumbnail_','').replace("/r34/thumbnails/",'//images/').replace("/rule34/thumbnails/",'/rule34//images/')
	ImageNumber++
	// Add each image to the array
	AddImage(ImageID,ImageThumb,ImageMain,ImagePage,ImageNumber,ImageLink,ImageTags)
	
	// Creates a link under each thumbnail
	$this_span.append('<br><a href="#" class="image_nav_button" id="'+ImageID+'" data-image-id="'+ImageID+'">'+Navigation_Text+'</a>');
	
	var $image_button = $('a.image_nav_button', $this_span)
	
	// Makes that link open up the navigation window
	$image_button.click(function(){
		
		imageId_data = $image_button.data('imageId')
		LoadImage(imageId_data);
		window.scrollTo(0, 0);
		return false;
	});
	
	
});
delete ImageNumber;

// console.debug(Loaded_Images);

// Sort the images.
Sort_images();

// Keyboard arrow key navigation
document.onkeyup = function(evt){    
	if($image_nav_overlay.is(":visible")){
		if(evt.which == 37 || evt.which == 65){
			Next_Image('left');
		}else if(evt.which == 39 || evt.which == 68){
			Next_Image('right');
		}else if(evt.which == 38 || evt.which == 87){
			Next_Image('up');
		}else if(evt.which == 40 || evt.which == 83){
			Next_Image('down');
		};
	};
}

// Arrow button navigation
$left_arrow.click(function(){Next_Image('left')});
$right_arrow.click(function(){Next_Image('right')});

// Hide everything if black background is clicked.

$('.image_nav_background').click(function(){
	$('.image_nav_background').hide();
	$image_nav_overlay.hide();
	$nav_content_img.attr('src','');
	$('body').css({'overflow-x' : 'auto', 'overflow-y': 'auto'})
});

// Keeps the main image centered
$(window).resize(function() {
	if($nav_content_img.is(':visible')) {	
		RepositionMainImage();		
	}
});
// console.debug(Loaded_Images)