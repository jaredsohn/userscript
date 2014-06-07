// ==UserScript==
// @name           Tumblr Text-Post Shrink
// @namespace      Stephen Davis
// @description    Shrinks text in Text Post.
// @include        http://www.tumblr.com/reblog/*
// @include        http://www.tumblr.com/new/*
// @include        http://www.tumblr.com/edit/*
// @include        http://www.tumblr.com/inbox
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

(function(){
    SHRINKBTNURL = 'http://static.tumblr.com/bebs6p5/d3xmghjoh/stephenrules.png';
    
    if (document.body.id=='tinymce')
        return;
    
    function shrinkPostText(v) {
        var post = $(v).contents().find('iframe').contents().find('#tinymce');
        var markup = $('<body>').append(post.html()); 
        $.merge(markup.find('p'), markup.find('li')).each(function(i,e) {
            if(!($(e).children().size() > 0) || $(e).children()[0].tagName != 'SMALL') {
                e.innerHTML = '<small>' + e.innerHTML + '</small>';
            }
		});
        post.html(markup.html());
	}
    
    function appendButton() {
        $('.mceEditor').each( function (i,v) {
            if ($(v).contents().find('a.post_shrink_text').size() == 0) {
                //forming the button, adding the handler...
                var button = $('<td style="position:relative;"><a class="mceButton mceButtonEnabled post_shrink_text" role="button" href="javascript:;" title="Shrink Post Text"><img src="'+SHRINKBTNURL+'" /></a></td>');
                button.find('a').on("click", function () { shrinkPostText(v); });
                //...and placing it!
                $($(v).contents().find('a.mce_strikethrough').parents('td')[0]).after(button);
            }
        });
        setTimeout(appendButton, 500);
        return false;
    }
    appendButton();
})();