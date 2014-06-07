// ==UserScript==
// @name       'Seen It' Google Movies
// @namespace  http://use.i.E.your.homepage/
// @version    2.1
// @description  'Seen It' Buttons Script
// @match      http://www.google.ca/movies*
// @require    http://code.jquery.com/jquery-2.0.3.js
// @copyright  2012+, Alexander Teno
// ==/UserScript==

$('<style>.movie-check:hover{background: no-repeat url(//s.ytimg.com/yts/imgbin/www-refresh-vflQ3Ohpj.webp) -54px -284px;}.movie-check { margin: 0 6px; background: no-repeat url(//s.ytimg.com/yts/imgbin/www-refresh-vflQ3Ohpj.webp) -126px -168px; background-size: auto; display: inline-block; width: 12px; height: 9px; }.movie-seen{text-decoration: line-through;}.selected{background: no-repeat url(//s.ytimg.com/yts/imgbin/www-refresh-vflQ3Ohpj.webp) -54px -284px;}</style>').appendTo('body');
$('<style type="text/css">.ultra-button {	cursor: pointer; float: right; margin-right: 25px; -moz-box-shadow:inset 0px 1px 0px 0px #ffffff;	-webkit-box-shadow:inset 0px 1px 0px 0px #ffffff;	box-shadow:inset 0px 1px 0px 0px #ffffff;	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #ededed), color-stop(1, #dfdfdf) );	background:-moz-linear-gradient( center top, #ededed 5%, #dfdfdf 100% );	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ededed\', endColorstr=\'#dfdfdf\');	background-color:#ededed;	-webkit-border-top-left-radius:6px;	-moz-border-radius-topleft:6px;	border-top-left-radius:6px;	-webkit-border-top-right-radius:6px;	-moz-border-radius-topright:6px;	border-top-right-radius:6px;	-webkit-border-bottom-right-radius:6px;	-moz-border-radius-bottomright:6px;	border-bottom-right-radius:6px;	-webkit-border-bottom-left-radius:6px;	-moz-border-radius-bottomleft:6px;	border-bottom-left-radius:6px;	text-indent:0;	border:1px solid #dcdcdc;	display:inline-block;	color:#777777;	font-family:Arial;	font-size:12px;	font-weight:bold;	font-style:normal;	height:26px;	line-height:26px;	width:85px;	text-decoration:none;	text-align:center;	text-shadow:1px 1px 0px #ffffff;}.ultra-button:hover {	background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #dfdfdf), color-stop(1, #ededed) );	background:-moz-linear-gradient( center top, #dfdfdf 5%, #ededed 100% );	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#dfdfdf\', endColorstr=\'#ededed\');	background-color:#dfdfdf;}.ultra-button:active {	position:relative;	top:1px;}</style>').appendTo('body');

parseMovieTitle = function(movieTitle) {
    var truncations = new Array(" in 3D", " 3D", ": The IMAX Experience", " The IMAX Experience");
    for (var i = 0; i < truncations.length; i++)
    {
        movieTitle = movieTitle.replace(truncations[i], '');
    }
    return movieTitle;
};

$(document).ready(function () {
    
    var movieList = GM_getValue('movieList');
    var advancedOps = ($('.theater').length == 1);
    
    $('#movie_results').prepend('<div class="ultra-button" id="clear-movie-cache">Clear Cache</div>')
    
    $('.movie .name').append('<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="movie-check" alt="">');    
    if (advancedOps) {
        $('.theater').append('<div class="desc" id="seen-it"><h2 class="name">Seen Shows</h2><div class="showtimes"><div class="show_left"></div><div class="show_right"></div></div></div>');
    }
    
    $('#clear-movie-cache').on('click', function () {
        GM_deleteValue('movieList');
        location.reload();
    });
    
    $('.movie-check').on('click', function () {
        $(this).toggleClass('selected');
        var notFound = -1;
        var wasSeen = $(this).hasClass('selected');
        var movieTitle = $(this).closest('.name').find('a');
        var parsedMovieTitle = parseMovieTitle($(movieTitle).text());
        advancedOps = advancedOps = ($('.theater').length == 1);
        movieList = GM_getValue('movieList');
        if (movieList !== undefined) {
            movieList = movieList.split(',');
        } else {
            movieList = new Array();
        }   
        if (wasSeen) {
            $('a:contains("' + parsedMovieTitle + '")').each(function () {
                $(this).addClass('movie-seen');
                $(this).closest('.name').find('.movie-check').addClass('selected');
                if (advancedOps) {
                    if ($('#seen-it .showtimes .show_right .movie').length >= $('#seen-it .showtimes .show_left .movie').length)
                    {
                        $('#seen-it .showtimes .show_left').append($(this).closest('.movie'));
                    } else {
                        $('#seen-it .showtimes .show_right').append($(this).closest('.movie'));
                    }
                }
            });
            if ($.inArray(parsedMovieTitle,movieList) == notFound){
                movieList.push(parsedMovieTitle);
            } else {
                // Do Nothing
            }
            movieList.sort();
            GM_setValue('movieList', movieList.join(','));
        } else {
            $('a:contains("' + parsedMovieTitle + '")').each(function () {
                $(this).removeClass('movie-seen');
                $(this).closest('.name').find('.movie-check').removeClass('selected');
                if (advancedOps)
                {
                    if ($('.theater > .showtimes .show_right .movie').length >= $('.theater > .showtimes .show_left .movie').length)
                    {
                        $('.theater > .showtimes .show_left').append($(this).closest('.movie'));
                    } else {
                        $('.theater > .showtimes .show_right').append($(this).closest('.movie'));
                    }
                }
            });
            var indexOfMovie = $.inArray(parsedMovieTitle, movieList);
            if (indexOfMovie == notFound) {
                // Do Nothing
            } else {
                movieList.splice(indexOfMovie, 1);
            }
            if (movieList.length == 0) {
                GM_deleteValue('movieList');
            } else {
                movieList.sort();
                GM_setValue('movieList', movieList.join(','));
            }
        }
    })
    
    if (movieList === undefined || movieList.length == 0) {
        movieList = new Array();
    } else {
        movieList = movieList.split(',');
        var moveRight = false;
        $.each(movieList, function(index, value) {
            $('a:contains("' + value + '")').each(function () {
                $(this).addClass('movie-seen');
                $(this).closest('.name').find('.movie-check').addClass('selected');
                if (advancedOps) {
                    if (moveRight) {
                        $(this).closest('.movie').appendTo('#seen-it .showtimes .show_right');
                    } else {
                        $(this).closest('.movie').appendTo('#seen-it .showtimes .show_left');
                    }
                    moveRight = !moveRight;
                }
            });
        });
        if (advancedOps) {
            moveRight = false;
            var showTimes  = $('.theater > .showtimes');
            $('.name > a').not('.movie-seen').each(function () {
                if (moveRight) {
                    $(this).closest('.movie').appendTo($(showTimes).find('.show_right'));
                } else {
                    $(this).closest('.movie').appendTo($(showTimes).find('.show_left'));
                }
                moveRight = !moveRight;
            });
        }
    }
    
    var movies = $('.movie .name a').map(function () {
        var movie = $(this).text();
        movie = parseMovieTitle(movie)
    });
    
    movies.each(function (int, data) {
        movieList.push(data);
    });
    
});