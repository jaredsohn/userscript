// ==UserScript==
// @name           AutoPaginationAndFixedHeader4TF2Outpost
// @version        0.5  
// @description    here be notes...
// @include        *tf2outpost.com/*
// @require        http://code.jquery.com/jquery-1.8.3.min.js
// @downloadURL    https://userscripts.org/scripts/source/157679.user.js
// @updateURL      https://userscripts.org/scripts/source/157679.meta.js
// ==/UserScript==
GM_addStyle(".hov0:hover{opacity:1} .hov0{opacity: 0.4} .bsa_160x600 {z-index: 2 !important;}.bsa_120x90 {height: 41px !important;}");
$('#header').css({
    position: 'fixed',
    width: '100%',
    'z-index': '3'
});
$('.main').css({
    'padding-top': '48px'
});
$('#footer').css({
    position: 'fixed',
    left: '0px',
    margin: '0px 0 -18px',    
    bottom: '0px',
    width: '100%',
    background: '#161514',
    padding: '0px 5px 0px 10px',
    'z-index': '3'
});
$('.bar').css({
    height: '22px',
    width: '10px'
});
$('.fill').css({
    width: '10px'
});
$('.status').css({
    margin: '0 12px 0 0'
});
$('.menu').css({
    display: 'none'
});
$('.copyright').css({
    margin: '0'
});
$('#pagination').css({
    display: 'none'
});
$('#extra_bar').css({
    margin: '30px 20px 20px 0'
});

$('#more').prepend('<ul><li><span>Get more social!</span></li><li><a href="http://steamcommunity.com/groups/tf2outpost">Steam group</a></li><li><a href="http://twitch.tv/tf2outpost">Twitch</a></li><li><a href="http://twitter.com/tf2outpost">Twitter</a></li><li><a href="http://facebook.com/tf2outpost">Facebook</a></li></ul>');

$('#more ul').css({
    width: '200px'
});

$('.tools').each(function () {
    var profileLink = $(this).find('.profile').attr('href').split('/')[4];
    $(this).append('&#160;&#160;<a href="http://www.backpack.tf/id/' + profileLink + '" class="hov0" original-title><img alt="Backpack.tf" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAASGSURBVHjatJZLaCRVFIa/c289+lFd3UlmoiHjIPNSBx8wMBsRwYXiQlEQdaGCCxVxJ+51JbgSdKEbXQkudCMIguD7MYwTEcdxNOoMRJ1kJkmn00m60tX1uMdFdyaZKLiaC0VRl7r1n/Of8/+nRFW5mstwlddVB/AAnn78kduBECj/74CIXPGsim99u77RWZsZbKY4FVwp2GYXW+sPAUA+AJqAIsDusoz2rDXkeU7S6+FEEATARFGUxOPxS/41zdeXFrok6ylWd2SAiA8Eo5hABGNkFKGiTrHWkqYpyWafI0dvZmp6H34QcHF+ntkzp1vWRq8hmvuh92YtquG8BHQLQF2+M/0sG5CmKarQaDQwxjAYpPQHA+657wEO3XAT6krCsEIcN5k98yPqlCLTV+uNahY1grfXBqtkWmxRxOVoe70E6/vsP3gYEcOf5/+g1YzZ6PW45dhxjtx0lEGa4pxj8eIC83//hQ6TRpVKWeobhqLvSe1dcEMA1SEFa90uk9P7uevuexnfs4c/Zn/l919+oigqiDFcf+AQWZZhjOHUia/57psvqNUjqpXqkEpVUIKS4s2qmciVyfe9LWqyLGMjSTgYx7TGxnBlSZFnZFnOancd6wVEUQNByPOM8+d+pyhKrLX4vmWXYONSi7fAbYqq8tRjDy+tr2/sPX7HnRw6fCP1KAJgkKasdjooiud5jE/swVqLc4617ip5lvPNl5+xtrJEPYpQ53a1sHYuU+TUMb3vOiYmJ+knCapKtVZnbGJi1AdKv7+JqiIiTE3vw/N8fpg5SftSDs7xH7Yzvl0DYzl14lt6Gz2uP3AQay0ry4ucPfMTIkJQCbn1tmOElQrOOX44dZLVToeV9jJhGODUsfv71ngLlwFq9RqzP59GBA4cOoy1HktLi5z48hPq9ToqliM3HKVaq1EWBT9+P8PFC3PsnZwkDCuoul2K93JH8vwIwGHE0mhEBEE4EvKwsxpxTLMZM8jKnaep1qq0xsYIghDnyl3Ct3j++isFi++NAEaKVTfyhW2jUVW03MXvaN+VJc7tpEYBgx9UP2x35l7ubqxu6wCGlrBtRAII/X6fSuCjxkfkSlHq1l23zwRe8dvC8tlnv5/5bdBL+lt2PXpJhKIoQBXnSq6ZmmJqej+5E5zTK7NjZ9TDS8RLBkXvuV46uxBWM8LQGwJsReH7Hp2V9jB954ibLR594knuf+gRPM+jKAtEDBgzzFO36RUBNHkxKe1nxlisNajuGDjOOcIwZGXxEjMnv8UYg+/7xM0WrbFxEMUagwhYYxER3KhzrDWkaf7Oarv9qitzxA51VbptL/KHIBDHESe/+pyLF/7m2ul9iBg67SU2ewmffvwRQRCgCqudNmEYIjgGmZzurqUvtP/qUIl6qJmg5TvqYzoEEGwOZKqqxvq0mmNcmJtj7ty54dDwPaJanaX5+WHUCtVqFd8PLJjlzf7iM+J3l+O9GeoGgKGy1yIymgelrD24NTK3almLBRHLdhNsUIl2tlGCM/jqmpeMWT8bjZ+nMe79e8Re7d+WfwYAaQtgXc45WocAAAAASUVORK5CYII=" /></a>');
});
//$('#more hr').append('<li><a href="/advertise">Advertise</a></li>');
//$('#more').append('<div>This work is licensed under a <a href="http://creativecommons.org/licenses/by-nc-nd/3.0/deed.en_US" target="_blank">Creative Commons License</a>. Please don\'t steal from us, it\'s bad.</div>');

var $pagination = $('#pagination');
$(window).scroll(function (e) {
    if (($(window).innerHeight() + $(window).scrollTop()) >= $('.main').innerHeight() - 350) {
        var $nextPage = $pagination.find('.selected').next('a');
        if ($nextPage.length) {
            $pagination.find('a').removeClass('selected');
            alreadyloading = true;
            // $pagination.before('<div id="search" class="loadingContainer" style="padding:0;"><div class="bar" style="position:relative;width: 124px;height: 24px;" ><span id="loading" class="cream" style="position:relative; width:90px; display: none; left: 0px; top: 0px; background-position: initial initial; background-repeat: initial initial; ">Loading...  </span></div></div>');
            $('#loading').stop().fadeIn(300);
            var url = 'http://www.tf2outpost.com' + $nextPage.attr('href');
            GM_xmlhttpRequest({
                url: url,
                method: "GET",
                onload: function (data) {
                    $pagination.before('<hr/>');
                    $pagination.before($(data.responseText).find('.trade'));
                    alreadyloading = false;
                    $('#loading').stop().fadeOut(400);
                    $('.loadingContainer').remove();
                    $nextPage.addClass('selected');
                }
            });
        }
    }
});