// ==UserScript==
// @name       	Motherless Better Layout and Images
// @namespace  	http://userscripts.org/users/522526
// @version    	1.0
// @description Makes Motherless.com full width and better full sized images.
// @match      	http://motherless.com/*
// @copyright	2013+, You
// @require		http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
var $a = $('#media-media a'), $img = $a.find('img'), autoWidthCss = {
    width: 'auto',
    height: 'auto'
};
if($a.is('a[href$="?full"]')){
    $img.data({
        big: true,
        width: $img.width(),
        height: $img.height()
    }).css({
        cursor: 'pointer'
    }).click(function(){
        var $this = $(this);
        if($this.data('big')){
            $this.css({
                width: $this.data('width'),
                height: $this.data('height')
            }).data('big',false);
        }else{
            $this.css(autoWidthCss).data('big',true);
        }
    });
}
$img.css(autoWidthCss);
$a.removeAttr('href');
GM_addStyle('\
#main {\
width: 100% !important;\
}\
');