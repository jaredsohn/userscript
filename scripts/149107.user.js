// ==UserScript==
// @name       9gag Gallery
// @namespace  NoHomepage
// @version    0.1
// @description  Makes 9gag look like a gallery
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @match      http://*9gag.com/
// @match      http://*9gag.com/hot
// @match      http://*9gag.com/trending
// @copyright  ArekXV
// ==/UserScript==

$('.side-dock').remove();
$('.feedback-button').remove();
$('#view-controller').remove();
$('#main').before('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js"></script><script type="text/javascript">setInterval(function () {$(\'#entry-list-ul li\').css({\'border\' : \'none\', \'float\' : \'left\'});$(\'.info\').remove();}, 500);</script>');
$('#entry-list-ul li').css({'border' : 'none', 'float' : 'left'});
$('.info').remove();
$('#main').width('100%');