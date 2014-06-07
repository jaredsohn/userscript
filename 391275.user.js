// ==UserScript==
// @name       Reddit Sidebar Hider
// @namespace  http://*/*
// @version    0.1
// @description  hides the reddit sidebar
// @match      http://*/*
// @copyright  none, i stole it off this guy http://www.reddit.com/r/Enhancement/comments/n2urj/remove_sidebar/c35vjze
// ==/UserScript==

(function(){if($('.side').attr('style')){if ($('.side').attr('style').match('none')){$('.side').css('display','block')}else{$('.side').css('display','none')};}else{$('.side').css('display','none');}})();