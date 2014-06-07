// ==UserScript==
// @name           Hunsa Gallery
// @namespace      Hunsa
// @description    View large image on hunsa.com

// @require        google.load("jquery", "1");
// @include        http://dara.hunsa.com/detail.php?id=*
// @version        0.0.1
// ==/UserScript==




$('#advenueINTEXT img').each(function(index, item) {
    var s = $(item).attr('src');
    s = s.replace('http://dara.hunsa.com/thumb.php?img=' ,"");	
	s = s.replace(/%2F/g ,"/");
	s = s.replace(/%3A/g ,":");
	s = s.replace(/%3D/g ,"=");
	s = s.replace(/%3F/g ,"?");
	s = s.replace(/%26/g ,"&");
	$(item).attr('src', s);
});

$(".caption").css('display', 'none');
$(".thumb").css('background', 'none');
$(".thumb").css('border', 'none');
$(".thumb").css('box-shadow', 'none');
$(".thumb").css('padding', '0');

$(".detail_thumb").css('width', '100%');
$(".detail_thumb").css('height', 'auto');
$(".detail_thumb").css('clear', 'both');

var pic = $(".detail_thumb img")
pic.removeAttr("width");
pic.removeAttr("height");

$('#advenueINTEXT center table tbody tr td').css('float', 'left');