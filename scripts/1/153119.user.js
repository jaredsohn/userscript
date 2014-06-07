// ==UserScript==
// @name        ao3 download buttons
// @description Adds download buttons to each work blurb on Ao3's works index pages.
// @namespace   ao3
// @include     http*://archiveofourown.org/*works*
// @include     http*://archiveofourown.org/series/*
// @include     http*://archiveofourown.org/users/*/bookmarks*
// @grant       unsafeWindow
// @version     1.1
// @downloadURL http://userscripts.org/scripts/source/153119.user.js
// ==/UserScript==

(function($) {

    var works = $('.work.index li.work, .bookmark.index li.bookmark');
    if (!works[0]) return;

    var exts = ['mobi', 'epub', 'pdf', 'html'],
        uriTemplate = '/downloads/{au}/{author}/{id}/{title}.',
        divProto = $('<div>').addClass('download actions').attr('aria-haspopup', 'true')
            .css({
                'position': 'absolute',
                'right': '7em',
                'top': '0.5em',
            }),
        linkProto = $('<a>').attr('title', 'Download').addClass('open').text('Download'),
        ulProto = (function() {
                var ul = $('<ul>').addClass('toggled secondary').css({
                        'position': 'absolute',
                        'right': '7em',
                        'top': '-0.5em',
                        'white-space': 'nowrap'
                    });
                    
                $.each(exts, function(i, ext) {
                    $('<li>')
                        .append($('<a>').addClass(ext)
                            .attr('href', ext)
                            .text(ext.toUpperCase())
                        )
                        .appendTo(ul);
                });
                
                ul.append($('<li>').append($('<a>').addClass('close')
                        .attr('title', 'Close Download Options')
                        .css({'cursor': 'pointer', 'display': 'inline'}).text('X')
                    )
                );
                
                return ul;
            })();
            
    works.each(function() {
        var work = $(this),
            author = work.find('a.login.author').first().text() || 'Anonymous',
            titleLink = work.find('.header.module .heading a').first(),
            id = (function() {
                var id = titleLink.attr('href');
                id = id.substring(id.indexOf('works/')+'works/'.length);
                return id;
            })(),
            title = encodeURIComponent(titleLink.text().split(',').join('')),
            uri = uriTemplate.replace('{author}', author)
                .replace('{au}', author.substring(0,2))
                .replace('{id}', id)
                .replace('{title}', title),
            link = linkProto.clone(),
            ul = ulProto.clone(),
            div = divProto.clone(),
            _toggle = function() {
                ul.toggle();
                link.toggleClass('open close');
            };
            
        ul.find('li a').each(function() {
            if ($(this).attr('href')) { 
                $(this).attr('href', uri +$(this).attr('href'));
            }
        });
        
        link.add(ul.find('li a').last()).click(_toggle);
        
        div.append(link, ul.hide())
            .appendTo(work);
    });

})(unsafeWindow.jQuery);