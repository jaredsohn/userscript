// ==UserScript==
// @author		   jang
// @name           spoki plus
// @namespace      spoki|plus
// @description	   spoki.lv add block u.c.
// @include        http://www.spoki.lv/*
// @match		   http://www.spoki.lv/*
// @version		   0.1
// @releasedate	   100820111930
// ==/UserScript==
CurrentReleaseDate = "100820111930";

(
function() 
{
	$ = unsafeWindow.jQuery;

	$('param[value*="banners"]').parent().remove();
	$('img[value*="banners"]').parent().parent().remove();
	$('div[id*="rotate_imgs"]').parent().remove();
	$('a[href*="adclick"]').parent().remove();
	$("#mod_eshops_b").remove();
	$("#bbb").remove();
	$("#Advertisement").parent().remove();
	$('iframe[src*="banner"]').remove();	
	$('a[href*="banner"]').parent().remove();
	$('param[value*="adocean"]').parent().parent().remove();
	
	
	
	$(".commentImage").each(function(){
		$("img:eq(0)", this).each(function(){
			if( $(this).attr('src').search(/anonims/) == -1 )
			{
				var uid = $(this).attr("src").split("users/")[1];
				uid = uid.split("/av/")[0];
				//
				
				$(this).parent().prepend('<a title="Sekot spokam" onclick="make_friend('+uid+',\'add\'); return false;" href="javascript:;" target="_BLANK"  onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.45" style="display: block; opacity: 0.45; width: 16px; height: 16px; position: relative; top: -32px; left: 36px; background: url(data:image/gif;base64,R0lGODlhEAAQAPcQAHOqzhZxrtDi7iZ6s+/1+eDs9DWEuaLG3rHP5GSgyVSXw8HZ6YOz1EWNvgdoqf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABAALAAAAAAQABAAAAh4ACEIHEiwoMGCDhY8aHAQoUKGAgcwmEhxgIOEDxRchNCgwUUHCRY+GEmSAUePDhCMbECy5EkHDEiifLixo4OWKx8OtIlz4cedHkO2JBAAJtCLB0gSMHDRpECbFwGs/Oj0pUKcAIw+9djzAQKtHAGw7CmgQdWGBwMCADs%3D);"></a>');

				$(this).parent().prepend('<a href="http://www.spoki.lv/showMessages.php?receiver='+uid+'&new=true" title="V&#275;stule" target="_BLANK" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.45" style="display: block; opacity: 0.45; width: 16px; height: 16px; position: relative; top: -16px; left: 18px; background: url(data:image/gif;base64,R0lGODlhEAAQAPYAAD1stLbX/Ian3Ozx96jE6l2Jtt3n91aDtV2MyrLL6tbk+ZW04/X5/0J8wU98xM7a6+bu+W+V0J++6cPb+F98qkV1wfn8/02Iw9/s/vH3/pyz1uTv/ktxroSt3liKyL3e96rF7Xuc05S78P///93q/s3g+FqHtUmDw1CKx7vQ7FqFydbn/Ymt4uz0+Dtyu7zV9Ob3/4qo19nk8WWNzLjP7FOGxb/b/KbE7LDN8Zu+7T54voyv48Xf/DprvVCHv3GY0aG+6Z+23FuHugAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHACMALAAAAAAQABAAAAekgCOCg4SFhoeEGjE/MzMIjx4eNTUnNUIUQRYZFpydnhkDBSEZCwYZJKgkGxsMBh0yKBEWOKUZGKusECwiLSgzFiu0BgwwMBYQOzkBvSrAKyACEJwQAjk2Nr0OwCUJN6UGCzc3Ezy9FRYKNCUrLxISLyvcEwMoLgwpChj6qajcECgcWkDIQJCBwYMMBjwwQQGACx0NGpw4caFiRR8HKCDayLEjx0AAOw%3D%3D);"></a>');

				$(this).parent().prepend('<a href="http://www.spoki.lv/upload/users/'+uid+'/profileImage/profileImage.jpg" target="_BLANK" title="Bilde" onmouseover="this.style.opacity=1;" onmouseout="this.style.opacity=0.45" style="display: block; opacity: 0.45; width: 16px; height: 16px; position: relative; top: 0px; left: 0px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAISSURBVHjaYvz//z8DEDAiYSYkNkjyFwMeABBALEiKmd1KD9j//v036O/f/3ZAvhoQ33rz/scuIL3u2hKfI9gMAAggRqALQDYyuxTvT1CU5asPtJOXNlTmZ2BlYWS49Ogrw+pDTxjOX3p+99PHHw1AQ5agGwAQQCADGLRittjYmEiuyA/VkNaW5mb49OMfw9tvfxlef/3L8PLzH4YdJ58xnD3zCGRIArpLAAKICUoHBQBtBmn+8vMfw8dvfxiU3KcyXH30k0GIk5nBw1yKQUlZRBmkDt0FAAEEM8AJ5OxPQM3vv/5BUcDNxsTAycrEYG0gAVaHbgBAALFAaU2Qn98CnazkPg0umVQwH0zvX5HGICTABVaHbgBAAMEMuA4MMH1ubnaGeRMS4Zph7D//GBjeffgGVoduAEAAwbyw78jl1wyvvvxhUJNiYzBU4IArAPG///7HcP/xR7A6dAMAAgjmgnXbDj7wY+diV9ZSEmT48ec/2Nl/QTZ//wuNhcd3QerQDQAIIEZoSgRFZQwfP0eDjZmssqIsP9jPIGeDbD5y6vHdSWYrlG8/essQXbueCZpCwQAggOAGQA2xgUaVEzTArkOdvS6Rr+VwaoISw9ad30GGMML0AAQQA8gAIjFjV6b5//cnI/8vaQr4DxMHCCBSDABjdEMAAgjFC8SCvhzrN3q2gbEsQip7AAKILAOQAUCAAQCuwB4T7ujAJQAAAABJRU5ErkJggg%3D%3D);"></a>');
				$(this).css("margin-top","-32px");
			}		

		});
		$(this).css("height","156px");
	});
	
	$(".commentItem").each(function(){
		$(this).css("height", "161px");
	});

}
());

/*

http://www.spoki.lv/loadHeader.php
http://www.spoki.lv/profileLoad.php?user=ID&section=articles&page=1
http://www.spoki.lv/profileLoad.php?user=ID&section=comments&page=1
http://www.spoki.lv/profileLoad.php?user=ID&section=responses&page=1


*/