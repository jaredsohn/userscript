// ==UserScript==
// @name       Github issue card view
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://tampermonkey.net/index.php?version=3.5.3630.66&ext=dhdg&updated=true
// @copyright  2012+, You
// @include http://*cardview*
// ==/UserScript==
function idealTextColor(bgColor) {

   var nThreshold = 105;
   var components = getRGBComponents(bgColor);
   var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);

   return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";   
}

function getRGBComponents(color) {       

    var r = color.substring(1, 3);
    var g = color.substring(3, 5);
    var b = color.substring(5, 7);

    return {
       R: parseInt(r, 16),
       G: parseInt(g, 16),
       B: parseInt(b, 16)
    };
}

$(['.discussion-bubble', '.site-footer', '.closed-banner', '.js-thread-subscription-status', '.discussion-bubble-avatar',
    '.tabnav', '.action-bubble', '.pull-head', '.header', '.repository-sidebar', '.pagehead', '.discussion-sidebar',
    '#js-users-participants', '.discussion-topic-author', '.js-comment-edit-button', '.discusion-topic-infobar', '.issue-head', '.flash-warn']).each(function(){jQuery(this.toString()).hide()});

var $story = $('.discussion-bubble:first-of-type');
$('.discussion-bubble-inner').css('min-height', '150px');
$story.show();

$title = $('.discussion-topic-title');
$title.css('font-size', '35px');
$title.css('padding', '20px 40px');

var $comment = $('.comment-content');
$comment.css('background', 'white');
$comment.css('font-size', '18px');


$comment.css('padding', '30px 40px');

$('.comment-content .comment-body').css('font-size', '18px');

var item = $('.discussion-labels li span').filter(function(){return $(this).text().match(/feature/)});

if( item.length != 0 ){
    item = $(item);
    color = $(item.attr('class').split(' ')).filter(function(){return this.toString().match(/labelstyle/)})[0].split('-')[1];

    $('.discussion-topic-header').css('background', '#' + color);
    $title.css('color', idealTextColor(color));
}