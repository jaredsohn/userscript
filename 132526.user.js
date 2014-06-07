// ==UserScript==
// @name          Ali G's sahibinden.com quick search script
// @description   sahibinden.com quick search script
// @include       http://www.sahibinden.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
var popupPrefix = 'sqs_popup_';

var openPopup = function(event){
	if($(this).attr('class') == 'openPopSpan_root'){
		removeAll();
	}
	removeLower($(this).parent().parent().parent().attr('class'));
	var thisRef = this;
	$.ajax({url: $(thisRef).attr('alt'),
		success: function(data) {
			var items = $(data).find('ul.categoryList');
			if(items.size() > 0){
				showDiv(items[0], event);
			}
			else{
				var clItems = $(data).find('li.cl1,li.cl2,li.cl3,li.cl4,li.cl5');
				var found = false;
				$(clItems).each(function(i){
					if( !found && allSameClass($(this).parent()) ){
						found = true;
						showDiv($(this).parent(),event);
					}
				});
			}
		}
	});
};

var findDiv = function(){
	var i = 0;
	while($('.'+popupPrefix+i).size() > 0){
		i++;
	}
	return popupPrefix+i;
};

var showDiv = function(target_items, event){
var divClass = findDiv();
 $(target_items).each(function(i){
			$("body").append("<div class='"+divClass+"' style='position:absolute; background:yellow'><ul>"+$(this).html()+"</ul></div>");
			changeTooltipPosition(event, divClass);
			if($('.'+divClass).find('li').size() > 1){
				$('.'+divClass).find('li').each(function(){
					$(this).html($(this).html() + "<span alt='"+$(this).find('a').attr('href')+"' class='openPopSpan' onmouseover='this.style.cursor=\"pointer\"'> + </span>");
				});
				try{
					$('div.'+divClass).find('span.openPopSpan').bind('click', openPopup);
				}
				catch(e){
				}
			}
	});
};

var changeTooltipPosition = function(event, divClass) {
	var availPos = findAvailPos(divClass);
	var tooltipX = availPos == 0 ? event.pageX + 40 : availPos;
	var tooltipY = event.pageY;
	$('.'+divClass).css({top: tooltipY, left: tooltipX});
};

var removeLower = function(divClass) {
	if(!divClass){
		return;
	}
	var i = divClass.substring(divClass.length - 1);
	console.log(i);
	i++;
	while( $('.' + popupPrefix + i).size() > 0 ){
		$('.' + popupPrefix + i).remove();
		i++;
	}
};

var removeAll = function(divClass) {
	var i = 0;
	while( $('.' + popupPrefix + i).size() > 0 ){
		$('.' + popupPrefix + i).remove();
		i++;
	}
};

var allSameClass = function(root){
	var elements = $(root).find('li');
	var cls = '';
	var retVal = true;
	$(elements).each(function(i){
		if(cls == ''){
			cls = $(this).attr('class');
		}
		if($(this).attr('class') != cls){
			retVal = false;
		}
	});
	return retVal;
};

var findAvailPos = function(divClass){
	var i = divClass.substring(divClass.length - 1);
	if(i == 0){
		return 0;
	}
	else{
		return $('.' + popupPrefix +(i-1)).position().left + $('.' + popupPrefix + (i-1)).width();
	}
};

$('li.show').each(function(){
	if( $(this).html().indexOf('Motosiklet') > 0 ){
		$(this).html($(this).html() + "<span alt='search.php?b[product_condition]=0&c=3532' class='openPopSpan_root' onmouseover='this.style.cursor=\"pointer\"'> + </span>");
	}
	else{
		$(this).html($(this).html() + "<span alt='"+$(this).find('a').attr('href')+"' class='openPopSpan_root' onmouseover='this.style.cursor=\"pointer\"'> + </span>");
	}
});
$('li.show>span.openPopSpan_root').bind('click', openPopup);

var showImages = function(event){
	$('#image_gallery_outer').remove();
	var thisRef = this;
	$.ajax({url: $(thisRef).attr('alt'),
		success: function(data) {
			var elements = $(data).find('div.adThumbContainer>a>img')
			if(elements.size() > 0){
				createImageDiv(elements, event);
			}
		}
	});
};

var createImageDiv = function(elements, event){
	$("body").append('<div id="image_gallery_outer" style="position:absolute;background:white;"></div>');
	var imageDivStr = '<div id ="image_gallery" style="valign:bottom;">';
	$(elements).each(function(i){
		if(i == 0){
			firstImage = $(this).attr('src');
		}
		imageDivStr += '<span onmouseover="this.style.cursor=\'pointer\'" onclick="$(\'#image_gallery_show\').attr(\'src\',\''+$(this).attr('src')+'\')">' + $(this).parent().html() + '</span>';
	});
	imageDivStr += '</div></div>';
	$('#image_gallery_outer').append('<div onmouseover="this.style.cursor=\'pointer\'" style="valign:top;color:red;font-size:16px" onclick="$(\'#image_gallery_outer\').remove();">Kapat</div>');
	$('#image_gallery_outer').append('<img src="" id="image_gallery_show"></img>');
	$('#image_gallery_show').css("width","480px;");
	$('#image_gallery_show').css("height","360px;");
	$('#image_gallery_show').attr("src",firstImage);
	$('#image_gallery_outer').append(imageDivStr);
	$("#image_gallery_outer").css("top", (event.pageY - 200) + "px");
	$("#image_gallery_outer").css("left", "400px");
};

$('tr.searchResultsItem').each(function(){
	$("body").append("<div alt='"+$(this).find('td>a').attr('href')+"' class='"+'showImages'+"' style='left:"+ ($(this).position().left + $(this).width() + 20) +"px; top:"+($(this).position().top + 30)+"px; position:absolute' onmouseover='this.style.cursor=\"pointer\"'>Göster</div>");
});
$('div.showImages').bind('click', showImages);