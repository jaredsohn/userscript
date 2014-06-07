// ==UserScript==
// @name           Smiles box
// @version        1.0
// @description    Julian's script for fanpage

// @author         Julian
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @match          http://www.facebook.com/*
// @match          https://www.facebook.com/*

// @exclude        http://*.facebook.com/login.php
// @exclude        http://*.facebook.com/sharer*
// @exclude        http://*.facebook.com/ajax/*
// @exclude        http://*.facebook.com/plugins/*
// @exclude        http://apps.facebook.com/*
// @exclude        http://*.facebook.com/apps/*
// ==/UserScript==

(function (unsafeWindow) {
 function smileys()
    {
        if (!document.getElementById('box')) {
        if (!document.getElementById('home_stream')) return false;
        if (col = document.getElementById('rightCol')) {
            var html;

            html = '<div id="pagelet_netego_requests"><div id="c4d59483d70e4f9690550299"><div class="mbl ego_column"><div class="ego_section"><div class="uiHeader uiHeaderTopAndBottomBorder mbs uiSideHeader"><div class="clearfix uiHeaderTop">'
                 + '<a class="uiHeaderActions rfloat" href="#">Pokaż wszystkie</a><div>'
                 + '<h4 class="uiHeaderTitle">Emotikony</h4></div></div></div>'
                 + '<div class="phs"><div class="ego_unit"><div><div class="ego_action request_link">'
                 + '<a class="uiIconLink" style="padding-left: 21px;" href="http://www.facebook.com/emotikony"><i class="img sp_a6qw52 sx_249078" style="top: -1px;"></i>Przejdź do strony</a></div></div></div></div></div></div></div></div>'

                  //'<div class="box clearfix mbs">'
                 //+ '<div style="float: left;" class="fcb all"><b>Emotikony</b>  &middot; <a href="http://www.facebook.com/emotikony">Przejdź</a></div>'
                //+ '<div style="float: left; margin-left: 53px;"> <iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Ffacebook.com%2Femotikony&amp;layout=button_count&amp;show_faces=false&amp;width=86&amp;action=like&amp;font=tahoma&amp;colorscheme=light&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:86px; height:21px;" allowTransparency="true"></iframe></div>'
               //+ '</div>';
                 
            var box = document.createElement('div');
            box.setAttribute('id', 'box');
            box.innerHTML = html;
            col.appendChild(box);
            delete col, html, box;
        }
    }
    return false;
}

function addStyle(css) {
    if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
    else if (head = document.getElementsByTagName('head')[0]) {
        var style = document.createElement('style');
        try { style.innerHTML = css; }
        catch(x) { style.innerText = css; }
        style.type = 'text/css';
        head.appendChild(style);
    }
    delete head, style, css;
    return false;
}

function cssStyles() {
    addStyle(
      ' img.emote_img {}'
    //+ ' #box { line-height: 21px; margin: 10px 0; }'
   // + ' .all { vertical-align: middle; height: 21px; }'
  //  + ' .connect_widget td.connect_widget_button_cell { vertical-align: middle; }'

    );
    return false;
}
var home_stream;

function starter() {
    home_stream = document.getElementById('content');
    cssStyles();
    smileys();
    if (home_stream) {
        setTimeout( function () {
            var t;
            home_stream.addEventListener("DOMNodeInserted", function () { clearTimeout( t ); t = setTimeout( smileys, 120 ) }, false);
        }, 300);
    }
    return false;
}
starter();
})(window);