// ==UserScript==
// @name            HF: Minimxl Theme
// @namespace       instxgram
// @description     Make HackForums look minimalistic!
// @include         http://www.hackforums.net/*
// @include         http://hackforums.net/*
// @include         http://www.nsfw.hackforums.net/*
// @include         http://nsfw.hackforums.net/*
// @version         0.1 (beta)
// ==/UserScript==
//CREDITS: +mK for base theme!


function add(CustomCSS) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = CustomCSS;
    head.appendChild(style)
}

var images = document.getElementsByTagName('img');
var x = 0;
while (x < images.length) {
    if (images[x].src == 'http://hackforums.net:8080/images/modern_pl/logo_pl.gif') {
        images[x].src = 'http://i.imgur.com/sAV8LkZ.png'
    }
    if (images[x].src == 'http://x.hackforums.net/images/modern_pl/groupimages/english/ub3r.png') {
        images[x].src = 'http://i.imgur.com/cCszqZF.jpg'
    }
    if (images[x].src == 'http://x.hackforums.net/images/modern_pl/groupimages/english/hf_l33t.png') {
        images[x].src = 'http://i.imgur.com/cwZHdq9.jpg'
    }
    if (images[x].src == 'http://x.hackforums.net/images/modern_pl/ratings.gif') {
        images[x].src = 'http://i.imgur.com/aqKl9U1.gif'
    }
    if (images[x].src == 'http://x.hackforums.net/images/modern_pl/minion.gif') {
        images[x].src = 'http://i.imgur.com/3Uma2If.gif'
    }
    if (images[x].src == 'http://x.hackforums.net/images/modern_pl/groupimages/english/mentor.png') {
        images[x].src = 'http://i.imgur.com/RHxAPvi.jpg'
    }
     }
    x = x + 1
}
add('.thead {background: url(http://i.imgur.com/SRMEIpU.png) repeat scroll right top #111111; height: 20px; !important}');
add('.tcat {background: url(http://i.imgur.com/SRMEIpU.png) repeat scroll 0 0 !important; }');
add('.tborder {background: #111111; border: 1px solid #1D1D1D; !important; }');
add('.bitButton {background-color: #1E1E1E; box-shadow: 0 1px 0 0 #505050 inset !important; }');
add('#panel {border: 1px solid #111111; !important; }');
add('.menu ul, .tfoot  {background: #111111 !important; }');
add('.pm_alert {border: 1px solid #0AFF00 !important; }');
add('body {background: #072948 url(http://i.imgur.com/uB7e5kw.png) fixed; !important; }');
add('.bottommenu {background: #111111; border: 1px solid #000000; !important; }');
add('.button {background-color: #1E1E1E; box-shadow: 0 1px 0 0 #505050 inset !important; }');
add('.shadetabs li a, .shadetabs li a.selected {background-color: #1E1E1E; color: #6D6D6D; box-shadow: 0 1px 0 0 #505050 inset !important; }');
add('.shadetabs li a.selected, .shadetabs li a:hover {background-color: #111111; box-shadow: 0 1px 0 0 #505050 inset !important; }');
add('.subforumicon.ajax_mark_read {background: #072948 url(http://i.imgur.com/Wfru130.gif) fixed; !important; }');
add('a:hover, a:active, .menu ul a:hover, .menu ul a:active {color: #cccccc; !important; }');
add('.shadetabs li a:hover {color: #fff; !important; }');
add('.shadetabs li a.selected {color: #fff; !important; }');
add('.pagination_current {background: #383737 !important; }');
add('.pagination a, .pagination a:hover {background-color: #181818; !important; }');
add('.navButton:hover {border-top: 1px solid #919191; background: #333333; !important; }');
add('.tcat a:hover, .tcat a:active, .tfoot a:hover, .tfoot a:active, .navigation a:hover, .navigation a:active {color: #949494; !important; }');
add('.pagination a:hover {color: #949494; !important; }');
add('textarea, input.textbox {border: 1px solid #000000; !important; }')