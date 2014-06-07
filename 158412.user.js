// ==UserScript==
// @name         Craigslist browser
// @namespace    http://noway.2ch.hk/
// @version      0.1.1
// @description  Very fast way to browse craigslist
// @match        http://*.craigslist.org/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @run-at       document-end
// @copyright    2012+, Noway
// ==/UserScript==



var lindex = 0, plinks = 0;

$('head').append(
    '<style type="text/css" id="craigslist-browser-stylesheet">'+
    '.craigslist-preview .content{background-color:#EEE;border:1px solid gray;padding:5px;display:none;margin-top: 5px;}'+
    '.craigslist-preview.showed .content{display:block;}'+
    '.row a.js{text-decoration:none;border-bottom:1px dashed #3381D5;color:#3381D5}'+
    '.row a.js:hover{text-decoration:none;border-bottom:1px dashed #66A7ED;color:#66A7ED}'+
    '.row a.js:visited,.row a.js.visited{text-decoration:none;border-bottom:1px dashed #934DC9;color:#934DC9}'+
    '.row a.js:visited:hover,.row a.js.visited:hover{text-decoration:none;border-bottom:1px dashed #A967DB;color:#A967DB}'+
    '.postinginfos p{display:inline;font-size:75%;margin-right:1.2em;}'+
    '#craigslist-browser-done{position:fixed;right:0;bottom:0;padding:20px;background-color:lightgray;border:1px solid gray;}'+
    '</style>'
);

$('#toc_rows p.row a').each(function(index, elem){
   	lindex++;
    var reg = /http\:\/\/(.*?)\.craigslist\.org\/(\w+?)\/(\w+?)\/(\d+?)\.html/im;
    var adId = elem.href.match(reg)[4];
    
    $.get(elem.href, function (data) {
        plinks++;
        
        
        var reg_email = /var\s?displayEmail\s?=\s?"(.*?)";/im;
        var reg_title = /var\s?postingTitle\s?=\s?"(.*?)";/im;
        var reg_userbody = /<section class="userbody">((.*?)<\/div>\s*<\/section>)\s*(<\/section>\s*<footer>\s*<ul class="clfooter">|<br>\s*<form action="\/flag\/" method="GET">)/im;

        var email = (email = data.match(reg_email)) == null ? null : email[1];

        try {
            data = data
            .split('\r\n').join('')
            .split('\n').join('');
            
            var userbody_matches = data.match(reg_userbody);
            var userbody = userbody_matches[2];
        } catch(e) {
            console.log(e);
            console.log(adId);
            console.log(userbody_matches);
            console.log(userbody);
            console.log(data);
        }
        var no_email = email === null ? '<span class="p">no email</span>' : '';
        $(
            '<a class="title js" href="'+elem.href+'#craigslist-browser-flush" onclick="$(\'#craigslist-preview-'+adId+'\').toggleClass(\'showed\');$(this).addClass(\'visited\');return false">expand</a> '+
            no_email+
            '<div class="craigslist-preview" id="craigslist-preview-'+adId+'">'+
            '<div class="content">'+userbody+'</div>'+
            '<input type="text" value="' + (email === null ? 'no email' : email) + '" size="40" onclick="this.select()">'+
            '</div>'
        ).insertAfter($(elem.parentNode).find('.itemcg'));
        
        if(plinks == lindex){
            $('body').append('<div id="craigslist-browser-done">all loaded</div>');
            setTimeout(function(){
                $('#craigslist-browser-done').fadeOut('slow');
            }, 3000);
        }
    });
});