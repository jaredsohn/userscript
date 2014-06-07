// ==UserScript==
// @name        scnsrc parser
// @namespace   scnsrcp
// @include     *.scnsrc.me/*
// @description parses posts to top of page
// @grant       none
// ==/UserScript==
$(document) .ready(function () {
    console.log('hello, world');
    var _target = {
        content: $('.content'),
        posts: $('.post', this.content),
        holder: $('<div class="mods"></div>'),
        nav: $('.wp-pagenavi') .clone(true)
    };
    if (_target.posts.length > 0) {
        $.each(_target.posts, function (i, element) {
            var postTitle = $('h2 a', element) .clone(),
            postText = postTitle.text(),
            thisColor = 'black',
            postHandle = $('<div></div>') .css('display', 'inline'),
            newUrl = $(element) .attr('id');
            if (postText.indexOf('R5') > 0) thisColor = 'Red';
            if (postText.indexOf('BluRay') > 0) thisColor = 'Blue';
            if (postText.indexOf('Rip') > 0) thisColor = 'Maroon';
            if (postText.indexOf('TV') > 0) thisColor = 'Green';
            if (postText.indexOf('720p') > 0) postHandle.attr('res', '720p');
            if (postText.indexOf('1080p') > 0) postHandle.attr('res', '1080p');
            postText = postText.replace(/(TV|R5|DVD|BluRay|BDRip|Rip|HDTV|[x|X]264-|720p|1080p)/g, '');
            postTitle.css('color', thisColor);
            postTitle.text(postText);
            postTitle.toggleClass('scrolltopost') .attr('href', '#' + newUrl);
            postHandle.append(postTitle);
            postHandle.append(' <a href="http://ixirc.com/?q=' + postText + '">XDCC</a>');
            postHandle.append(' <a href="https://thepiratebay.se/search/' + postText + '/0/7/0">TRNT</a>');
            if (i < _target.posts.length - 1) postHandle.append(' | ');
            _target.holder.append(postHandle);
        });
        _target.holder.css("margin","0px 0px 5px");
        _target.nav.css("margin","10px 0px 15px");
        _target.holder.prepend(_target.nav);
        _target.content.prepend(_target.holder);
    }
});
