// ==UserScript==
// @name        SUBSCENE DirectDownload
// @namespace   jmkl
// @include     http://subscene.com/subtitles/*
// @include     http://subscene.com/subtitles/title.aspx?*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @version     1.51
// @grant       GM_xmlhttpRequest
// ==/UserScript==
// 13 = English
// 44 = Indonesia

/*
CHANGELOG#0C1021
1.51
===========
-fix error on tampermonkey(chrome)
===========
1.5
===========
-update something
===========
===========
1.4
===========
-add sub preview
===========
1.3
===========
-add imdb info => imdb API by omimdb.com
===========
1.2
===========
-fix bugs, return wrong page 

*/

//AWESOME ICON
$('body').append('<div style="color:#444;font-size:1.2em;background:white;position:absolute;padding:10px;box-shadow:0 0 4px #222;z-index:9999;display:none;" class="legenda" >'+
'<ul>'+
'<li>'+
'<span class="preview"> Preview</span></li><li>'+
'<span class="showpage"> View Page</span></li><li>'+
'<span class="donlot"> Download</span></li></ul>'+
'</div>');
$('head').append('<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">');
$('head').append('<style type="text/css">' +
    '.preview,.showpage,.donlot,.lagidonlot{ font-family: FontAwesome;}' +
    '   .preview:before{' +
    '       content: "\\f022";' +
    '   }' +
    '.lagidonlot:before{ content: "\\f021"; }'+
    '   .showpage:before{' +
    '       content: "\\f090";' +
    '   }' +
    '   .donlot:before{' +
    '       content: "\\f019";' +
    '   }' +
    '    .posterbaru{' +
    '       border:solid 5px #fff;' +
    '        float:left;' +
    '        height:300px;' +
    '        margin:10px;' +
    '    }' +
    '.posterbaru img{height:300px;}' +
    '</style>');

//ANU
$('span.l').css('width', '30px');
$('tr').hover(function() {
    $('.legenda').fadeIn('slow');
});

jarak = ($(window).width()-960)/2;

$(document).mousemove(function(event) {
        var mex = event.pageX;
        var mey = event.pageY;
        
        if(mex<jarak || mex>(960+jarak))
            $('.legenda').fadeOut('slow');

//        $('.legenda').css({
//            'top': mey+10,
//            'left': mex+10
//        });
});

function doLangIden() {
    var sp = $('span.l');
    $.each(sp, function(index, spanl) {
        if ($(spanl).text().match(/.?English.?/))
            $(spanl).text('EN');
        else if ($(spanl).text().match(/.?Indonesian.?/))
            $(spanl).text('ID');

    });

}

var me = document.location.pathname;
String.prototype.format = function() {
    var formatted = this;
    for (var arg in arguments) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};


if (me.indexOf('subtitles/title')>-1) {
    var subscene = "http://subscene.com/filter";

    function postToURL(returl, id1, id2) {
        var f = '<form id="tespost" method="POST" action="http://subscene.com/filter">' +
            '<input name="returnUrl" value="' + returl + '"/>' +
            '<input name="SelectedIds" value="' + id1 + '"/>' +
            '<input name="SelectedIds" value="' + id2 + '"/>' +
            '</form>';
        $('body').append(f);
        $('#tespost').submit();
    }
    var titslink = $('.title').find('a');
    titslink.attr('onclick', 'return false;');

    titslink.click(function() {
        var retURL = $(this).attr('href');
        postToURL(encodeURIComponent(retURL), 13, 44);
    });
} else {
    function getPoster(poster, urls) {
         GM_xmlhttpRequest({
                method: "GET",
                url: urls,
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Accept": "text/html"
                },
                onload: function(response) {
                $('.header').prepend('<div class="posterbaru"></div>');
                var res = response.responseText;
                var pstr = $(res).find('.box a img').attr('src');
                var img = poster.find('a img');
                img.attr('src', pstr);
                img.appendTo('.posterbaru');
                var posterbaru = $('.posterbaru').find('img');
                poster.remove();
                }
            });        
        
    }

    $(document).ready(function() {


        doLangIden();


        var pat = /http:\/\/(.*?)\/.+[0-9]/;
        var xl = location.href;
        if (xl.match(pat)) {
            if ($('.buttholesframe').length <= 0)
             {
                $('.details').prepend('<iframe style="width:590px;height:500px;" class="buttholesframe" src="http://mybutt.hol.es/subscene/?url=' + location.href + '"></iframe>');
                $('.buttholesframe').hide();
            }

            var prev = $('nav.comment-sub').find('ul li');
            $.each(prev, function(index, v) {
                if (($(v).text().replace(/\s/g, '')) == "Preview") {
                    $(this).attr('href', '');
                    $(this).attr('onclick', 'return false;');
                    $(this).click(function(event) {
                        if ($('.buttholesframe').length > 0) {
                            if ($('.buttholesframe').is(':visible')) {
                                $('.buttholesframe').hide('slow');
                            } else {
                                $('.buttholesframe').show('slow');
                            }
                        } else {
                            $('.details').prepend('<iframe style="width:590px;height:500px;" class="buttholesframe" src="http://mybutt.hol.es/subscene/?url=' + location.href + '"></iframe>');
                        }
                    });
                }
            });

        } else {

            var imdb = $('a.imdb');
            $('.header').html('');
            $('.header').css('width', '100%');
            var poster = $('.poster');
            getPoster(poster, poster.find('a').attr('href'));
            if ($('.bhframe').length >= 0)
            {
                $('.header').append('<div id="drag" style="box-shadow:0 2px 10px rgba(0,0,0,.6);border-radius:10px;position:fixed;top:0;left:0;cursor:pointer;background:#225B7B;padding:10px;padding-top:10px;width:500px;height:540px;"><div class="hidedrag" style="color:#fff;display:inline;height:40px;float:right;padding:5px;">hide</div><div class="bhframe"/></div>');
                $('#drag').hide();
                $("#drag").draggable();

                $('.hidedrag').click(function() {
                    $('#drag').fadeOut('slow');
                });
            }
            $.each(imdb, function(index, val) {
                var lnk = $(val).attr('href');
                var id = lnk.match(/tt[0-9].+[0-9]/);
                if (id.length > 0) {
                    var iid = id[0];
                    if (iid.length < 9)
                        iid = iid.replace('tt', 'tt0');



                    $.get('http://omdbapi.com/?i=' + iid + '&plot=full', function(data) {
                        var res = eval('(' + data + ')');
                        if (res.Response === "True") {
                            var str = '<h2><a href="http://www.imdb.com/title/' + iid + '"><b></b>{0}</h2></a><p style="margin:0;"><b>Year</b>: {1}</p><p style="margin:0;"><b>Released</b>: {2}</p><p style="margin:0;"><b>Runtime</b>: {3}</p><p style="margin:0;"><b>Genre</b>: {4}</p><p style="margin:0;"><b>Director</b>: {5}</p><p style="margin:0;"><b>Writer</b>: {6}</p><p style="margin:0;"><b>Actors</b>: {7}</p><p style="margin:0;"><b>Plot</b>: {8}</p><p style="font-size:1.4em;background:#235D7E;color:white;display:inline;padding:2px 12px;border-radius:14px;box-shadow:0 2px 4px rgba(0,9,9,.6);"><b>Rating</b>: {9}/{10} voters</p>'.format(
                                res.Title,
                                res.Year,
                                res.Released,
                                res.Runtime,
                                res.Genre,
                                res.Director,
                                res.Writer,
                                res.Actors,
                                res.Plot,
                                res.imdbRating,
                                res.imdbVotes);

                            $('.header').append($(str));


                        }
                    });
                }

            });
        }
    });


    var jdl = $('td.a1');
    var linkdiv = $('td.a1 a div');
    var lnk = 'http://subscene.com/'

        function getDLLink(obj, url) {
            var tbl = $(obj).attr('class','lagidonlot');
            $.get(url, function(response){
                    var lnks = $(response).find('.download a').attr('href');
                    tbl.removeAttr('disabled');
                    window.location.href = lnk + lnks;
                    tbl.attr('class','donlot');
            });           
        }

    $('td.a1 a').attr('onclick', 'return false;');
    var jdlxx = $("span:eq(1)", $(linkdiv)).text();

    $("span:eq(1)", $(linkdiv)).prepend('<button alt="Download subtitles as zip file" style="width:auto;" rel="nofollow" class="donlot" ></button>&nbsp;');
    $("span:eq(1)", $(linkdiv)).prepend('<button alt="Visit Subtitle page" style="width:auto;margin:2px 0px;" rel="nofollow" class="showpage" ></button>&nbsp;');
    $("span:eq(1)", $(linkdiv)).prepend('<button alt="Preview subtitle" style="width:auto;margin:2px 0px;" rel="nofollow" class="preview" ></button>&nbsp;');

    $('.preview').click(function() {
        var tbl = $(this).closest('a');
        tbl.attr('onclick', 'return false;');
        var hr = tbl.attr('href');

        if ($('#drag').is(':visible')==false)
            $('#drag').fadeIn('slow');

        $('.bhframe').replaceWith('<div class="bhframe"><iframe style="width:100%;height:450px;" class="buttholesframe" src="http://mybutt.hol.es/subscene/?url=http://subscene.com' + hr + '"></iframe></div>');

    });
    $('.showpage').click(function(event) {
        var tbl = $(this).closest('a');
        window.location.href = tbl.attr('href');
    });

    $('.donlot').click(function() {
        var tbl = $(this).closest('a');       
        $(this).attr('disabled', true);
        getDLLink($(this), lnk + tbl.attr('href'));


    });

}