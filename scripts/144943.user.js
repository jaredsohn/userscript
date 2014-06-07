// ==UserScript==
// @name       Collapse posts
// @version    0.2
// @match      http://www.4four.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

document.addEventListener("DOMNodeInserted", update);

function update() {
    $('.feed_message:not(.updated)').each(function() {
        var $replies = $(this).next();
        var $footer = $replies.next();
        var $content = $();
        
        if(!$footer.find('textarea').length) {
            return;
        }
        
        $(this).addClass('updated');
        
        var $avatar = $(this).find('.avatar');
        var $title = $(this).find('.title');
        var $content = $([$(this).find('.body'), $replies, $footer]);
        var $tags = $footer.find('.msgtags');
        
        $(this).css('margin-bottom', '10px');
        $content.each(function() { $(this).hide(); });
        $avatar.height(60);
        
        if($replies.find('.post').length) {
            $title.html($title.html() + ' <em>(has replies)</em>');
        }
        
        if($tags.length) {
            var $tagsClone = $tags.clone();
            $tagsClone.css({
                'position': 'absolute',
                'left': '167px',
                'top': '57px',
                'float': 'none',
                'zoom': '0.7',
                'fontSize': '16px'
            }).addClass('collapsed-tags');
            $(this).append($tagsClone);
        }        
    
        $title.css('cursor', 'pointer');
        $title.click(function() {
            $content.each(function() { $(this).toggle(); });
            $avatar.height(parseInt($avatar.height()) == 60 ? 120 : 60);
            if($tagsClone) {
                $tagsClone.toggle();
            }
        });
        
    });
}