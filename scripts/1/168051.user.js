// ==UserScript==
// @name        JSTOR ToC to filenames
// @namespace   rinopo
// @description Prepare a list of file names from the ToC.
// @include     http://www.jstor.org/stable/*
// @version     1.0
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @grant          none

// ==/UserScript==
$(function(){
    if (!$('#toc').length) return;

    $('body').append('<table id="gmToc" style="border-collapse: separate; border-spacing: 10px;"></table>');

    $('#results .cite').each(function(i){

        var pdflink = $('a.pdflink', this).attr('href');
        var pdfResult = String(pdflink).replace(/.*\/(\d+\.pdf)$/, "$1");
        var pdfResult = '<a href="' + pdflink +'">' + pdfResult + '</a>';

        var num = i;
        if (num < 10) num = '0' + String(num);
        var numResult = String(num) + ' ';

        var author = $('.author', this).text();
        var authorResult = '';
        if (author) {
            author = author.replace(/\u00A0/g,' ');
            author = author.replace(/^by( )+/i, '');
            var authorArray = author.split(/,?\s+and\s+|,\s?/);
            for (var i=0; i < authorArray.length; i++) {
                if (authorArray[i] == '' || authorArray[i] == ' ') continue;
                var authorNameArray = authorArray[i].split(' ');
                authorResult = authorResult + authorNameArray[authorNameArray.length - 1];
                if (authorNameArray.length > 1) {
                    authorResult = authorResult + ',';
                    for (var j=0; j < authorNameArray.length - 1; j++) {
                        if (authorNameArray[j] != " ") { authorResult = authorResult + ' ' + authorNameArray[j];}
                    }
                }
                if (i != authorArray.length - 1) authorResult = authorResult + '; '
            }
            authorResult = authorResult + ' - ';
        }
    
        var title = $('a.title', this).children('br').replaceWith(' ').end().text();
        var titleResult = title.replace(/\s?:\s?/, ' -');
        var titleResult = titleResult.replace(/\//, '-');
    
        $('#gmToc').append('<tr><td>' + pdfResult + '</td><td>' + numResult + authorResult + titleResult + '.pdf</td></tr>');
    });

    $('.page').hide();
    $('body').css('background-image', 'none');
});
