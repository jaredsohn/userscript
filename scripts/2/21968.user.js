// ==UserScript==
// @name           MySpace - Enhanced Photos
// @namespace      RunningBlind
// @description    Enhances MySpace photo album viewing. View full versions of images as well as corresponding captions and comments directly in album view. 
// @include        http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewAlbums*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version        2.0.2
// ==/UserScript==

//enables use of firebug's console
if (unsafeWindow.console) {
   var GM_log = unsafeWindow.console.log;
   var GM_time = unsafeWindow.console.time;
   var GM_timeEnd = unsafeWindow.console.timeEnd;
}

// define images on the ui
var imgs = {
    loaderCircle: 'http://x.myspace.com/modules/common/static/img/loadercircles.gif'
};

// gets picture comments from print photo page
function getComments(album, pic, callback) {
    if (!pic.comments) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://viewmorepics.myspace.com/index.cfm?fuseaction=photoPrintPreview&friendID=' + data.friendId + '&albumID=' + album.id + '&imageID=' + pic.id,
            headers: {'User-agent': navigator.userAgent},
            onload: function(responseDetails) {
                var commentsTable = responseDetails.responseText.match(/<table id="comment_tbl"[\s\S]+<\/table>/m);
                // pop the comments into the dom tree, parse them, add them to the picture data
                pic.comments = [];
                
                if (commentsTable) {
                    commentsTable = commentsTable[0];
                    $('#dump').empty().append(commentsTable);
                    $('#comment_tbl tbody tr:even:lt(100)').each(function() {
                        pic.comments.push({
                            user: {
                                name: $.trim($(this).find('.displayNameCell a span').text()),
                                pic: $(this).find('.displayNameCell img').attr('src'),
                                link: $(this).find('.displayNameCell a').attr('href')
                            },
                            date: $.trim($(this).find('.photoCommentCell > strong:first-child').text()),
                            body: $(this).find('.photoCommentCell').html().match(/<\/strong>\s+<br>\s+([\s\S]+)/m)[1]
                        });
                    });
                }
                
                callback(pic.comments);
            }
        });
    } else callback(pic.comments);
}

$(document).ready(function() {
    
    // create an array to store some important stuff
    data = {
        friendId: window.location.href.match(/friendID=(\d+)/i)[1],
        albums: {}
    };
    
    // hidy ugly stuff
    $('#photo_imagesContainer')
        .hide()
        .find('table td.album')
        // get album data from original table
            .each(function(key, cell) {
                data.albums[key] = {
                    name: $(this).find('.photo_title > a').text(),
                    id: ($(this).find('.photo_title a').attr('href').indexOf('viewPicture') > 0) ?
                        $(this).find('.photo_title a').attr('href').match(/albumID=(\d+)/i)[1] :
                        null,
                    total: $(this).find('.photo_title span').text().match(/^(\d+)/)[1]
                };
            });
    
    // create container
    $('<div id="gm_ep" class="clearfix"></div>')
    
        // create sidebar with album navigation
        .append('<div id="sidebar"><ul id="albums"></ul></div>')
        
        // create main viewing portion
        .append('<div id="main-col">\
            <div id="album-view" class="current"></div>\
            <div id="pic-view">\
                <h3>View Photo</h3>\
                <p class="caption"></p>\
                <img src="" alt="" />\
                <h4>Comments</h4>\
                <p><a href="" id="add-comment-link">Add Comment</a></p>\
                <ul class="comments"></ul>\
            </div>\
        </div>')
        
        // create hidden dump space to parse ajax responses into the dom tree
        .append('<div id="dump"></div>')
        
        .appendTo('#photo_wrap');
    
    // create sidebar album navigation
    $.each(data.albums, function(key) {
        if (this.id == null) {
            $('#sidebar').append('<div id="extra"><a href="http://viewmorepics.myspace.com/index.cfm?fuseaction=viewTaggedPhotos&friendID=' + data.friendId + '">Tagged Photos (' + this.total + ')</a></div>');
        } else {
            $('<li' + ((key == 0) ? ' class="current"' : '') + '><a></a></li>')
                .find('a')
                    .text(this.name + ' (' + this.total + ')')
                    .attr('href', 'http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewPicture&friendID=' + data.friendId + '&albumId=' + this.id)
                    .data('albumKey', key)
                    .click(function() {
                        // change the sidebar links and album view
                        $('#albums li.current, #pic-view, #album-view > div.current').removeClass('current');
                        $(this).parent().addClass('current');
                        $('#album' + $(this).data('albumKey') + ', #album-view').addClass('current');
                        
                        return false;
                    })
                .end()
                .appendTo('#albums');
        }
    });
    
    //GM_log(data);
    
    // apply stylesheet
    $('head').append('<style type="text/css">\
    #gm_ep {font-size: 12px; line-height: 18px; margin-bottom: 10px; min-height: 600px;}\
    #gm_ep a, #gm_ep a:hover {color: #07b}\
    #gm_ep p {padding: 0; margin: 0 0 1.5em}\
    #gm_ep > div {float: left;}\
    #sidebar {margin-right: 1%; width: 19%;}\
    #sidebar ul {list-style: none;}\
    #sidebar ul li.current {background: #def;}\
    #sidebar ul li a {display: block; margin-bottom: 1.5em; padding: 0 5px;}\
    #extra a {font-weight: normal; color: #666; padding: 0 5px;}\
    #main-col {width: 80%;}\
    #main-col > div {display: none;}\
    #main-col > div.current {display: block;}\
    #main-col h3 {border: 0 none; font-size: 1.5em; line-height: 1; margin-bottom: 1em; padding: 0; width: auto;}\
    #main-col h4 {color: #000; font-size: 1.2em; font-weight: normal; margin-bottom: 1.25em; padding: 0; text-align: left;}\
    #album-view > div {display: none;}\
    #album-view > div.current {display: block;}\
    .dta {display: none}\
    .pic-list {list-style: none;}\
    .pic-list li {display: inline-block; margin-bottom: 1.5em; text-align: center; vertical-align: middle; width: 25%;}\
    .pic-list li a {background: #ddd; border: 1px solid #ccc; display: inline-block; padding: 3px;}\
    .pic-list li img {max-height: 170px; max-width: 170px;}\
    #pic-view > img {background: #ddd; border: 1px solid #ccc; display: block; margin: 0 auto 1.5em auto; padding: 3px;}\
    .comments {list-style: none;}\
    .comments li {margin-bottom: 1.5em; overflow: hidden; padding-left: 100px;}\
    .comments li > a:first-child {float: left; margin-left: -100px;}\
    .comments li > a:first-child img {backround: #ddd; border: 1px solid #ccc; padding: 1px;}\
    .comments cite.author {font-style: normal;}\
    .comments cite.date {color: #666;}\
    .loading {\
        background: transparent url(' + imgs.loaderCircle + ') no-repeat scroll 0 center;\
        color: #666\
        margin-bottom: 0.75em !important; \
        padding: 0 0 0.75em 27px !important;\
    }\
    #dump {display: none;}\
    ');
    
    // get photos from xml (really fast, but at a cost of less information)
    $.each(data.albums, function(key, album) {
        if (album.id) {
            $('#album-view').append('<div id="album' + key + '"' + ((key == 0) ? ' class="current"' : '') + '>\
                <p class="loading">Loading...</p>\
                <h3>' + album.name + '</h3>\
                <ul class="pic-list clearfix"></ul>\
                <div class="dta"></div>\
            </div>');
            
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://www.myspace.com/services/media/photosXML.ashx?friendid=' + data.friendId + '&albumid=' + this.id,
                headers: {'User-agent': navigator.userAgent},
                onload: function(responseDetails) {
                    
                    var imgs = [];
                    var pics = new DOMParser().parseFromString(responseDetails.responseText, 'application/xml').getElementsByTagName('photo');
                    var picsLength = pics.length;
                    for (i = 0; i < picsLength; i++) {
                        var source = pics[i].getElementsByTagName('file')[0].textContent;
                        imgs.push({
                            src: {
                                s: source.replace('l_', 's_'),
                                m: source.replace('l_', 'm_'),
                                l: source
                            },
                            caption: ((pics[i].getElementsByTagName('caption')[0].textContent == '') ? '<span class="no-cap">[No Caption]</span>' : pics[i].getElementsByTagName('caption')[0].textContent.replace(/&lt;/g, '<').replace(/&gt;/g, '>')),
                            id: pics[i].getElementsByTagName('link')[0].textContent.match(/imageID=(\d+)/)[1]
                        });
                    };
                    album.pics = imgs;
                    
                    $('#album' + key + ' p.loading').hide('fast', function() {$(this).remove();});
                    
                    // create the photo table for this album
                    $.each(album.pics, function(picKey, pic) {
                        $('<li><a><img /></a></li>')
                            .find('a')
                                .attr('href', 'http://viewmorepics.myspace.com/index.cfm?fuseaction=viewImage&friendID=' + data.friendId + '&albumID=' + album.id + '&imageID=' + pic.id)
                                .data('key', picKey)
                                // assign action when picture is clicked
                                .click(function() {
                                    $('#album-view').removeClass('current');
                                    var pic = album.pics[$(this).data('key')];
                                    
                                    $('#pic-view')
                                        .addClass('current')
                                        // switch out caption & image, then clears old comments
                                        .find('.caption')
                                            .html(pic.caption)
                                        .end()
                                        .children('img')
                                            .attr('src', pic.src.l)
                                        .end()
                                        .find('.comments')
                                            .empty()
                                            .append('<li class="loading">Loading...</li>');
                                    $('#add-comment-link').attr('href', 'http://viewmorepics.myspace.com/index.cfm?fuseaction=viewImage&friendID=' + data.friendId + '&albumID=' + album.id + '&imageID=' + pic.id);
                                    
                                    // gets comments
                                    getComments(album, pic, function(comments) {
                                        $('#pic-view .comments .loading').hide('fast', function() {$(this).remove();});
                                        
                                        var commentsListItems = '';
                                        
                                        if (comments.length == 0) {
                                            commentsListItems += '<li>No Comments</li>';
                                        } else {
                                            
                                            $.each(comments, function() {
                                                commentsListItems += '<li>\
                                                    <a href="' + this.user.link + '"><img src="' + this.user.pic + '" alt="" /></a>\
                                                    <cite class="author"><a href="' + this.user.link + '">' + this.user.name + '</a></cite>\
                                                    <cite class="date">' + this.date + '</cite>\
                                                    <p>' + this.body + '</p>\
                                                </li>';
                                            });
                                            
                                        }
                                        $('#pic-view .comments').append(commentsListItems);
                                    });
                                    
                                    return false;
                                })
                                .find('img')
                                    .attr('src', this.src.m)
                                .end()
                            .end()
                            .appendTo('#album' + key + ' .pic-list');
                        
                        // add links for DownloadThemAll!
                        $('<a></a>').attr('href', this.src.l).text(this.caption).appendTo('#album' + key + ' .dta');
                    });
                    
                }
            });
        }
    });

});