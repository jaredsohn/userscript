// ==UserScript==
// @name Add G+ button for all pages
// @namespace http://nobuhito.posterous.com/1
// ==/UserScript==
(function() {

    // Google関係のページは黒いバーが出るので不要 FIXME
    if (/google/.test(location.host)) { return; }

    // iframe等での重複防止
    if (/Chrome/.test(navigator.userAgent)) { // for Chrome
        try { top.hasOwnProperty('window'); }
        catch(e) { return; }
    }
    else { if (window != unsafeWindow.top) { return; } } // for Firefox

    var src = '';
    // from http://www.google.com/webmasters/+1/button/index.html
    src += '<!-- Place this tag where you want the +1 button to render -->';
    src += '<g:plusone></g:plusone>';

    var outer_div = document.createElement('DIV');
    outer_div.id                    ='myGpButton_outer';
    outer_div.style.zIndex          = 10000;
    outer_div.style.position        = 'fixed';
    outer_div.style.left            = '5px';
    outer_div.style.top             = '5px';
    outer_div.style.opacity         = '0.90';
    outer_div.style.width           = '110px';
    outer_div.style.height          = '34px';
    outer_div.style.backgroundColor = '#F5F5F5';
    outer_div.style.borderRadius    = '5px';
    outer_div.style.border          = '1px solid #E5E5E5';

    document.body.appendChild(outer_div);

    var inner_div = document.createElement('DIV');
    inner_div.id                ='myGpButton_inner';
    inner_div.style.zIndex      = 10001;
    inner_div.style.position    = 'fixed';
    inner_div.style.left        = '12px';
    inner_div.style.top         = '12px';
    inner_div.style.fontSize    = '9pt';
    inner_div.style.fontFanmily = 'serif';
    inner_div.style.fontWeight  = 'normal';

    // 時々崩れるので画像等にしてましにしたい FIXME
    var close_div = document.createElement('DIV');
    close_div.id                    ='myGpButton_close';
    close_div.style.cssFloat        = 'left';
    close_div.style.float           = 'left';
    close_div.style.color           = '#FFFFFF';
    close_div.style.width           = '14px';
    close_div.style.height          = '14px';
    close_div.style.cursor          = 'pointer';
    close_div.style.fontWeight      = 'bold';
    close_div.innerHTML             = 'x';
    close_div.style.backgroundColor = '#D74937';
    close_div.style.borderRadius    = '7px';
    close_div.style.textAlign       = 'center';
    close_div.style.verticalAlign   = 'middle';
    close_div.style.marginRight     = '5px';


    inner_div.appendChild(close_div);
    inner_div.innerHTML += src;
    document.body.appendChild(inner_div);

    var elem = function(id) { return document.getElementById(id); };
    elem('myGpButton_close').addEventListener('click', function () {
        var outer = elem('myGpButton_outer').style.display = 'none';
        var outer = elem('myGpButton_inner').style.display = 'none';
    }, false);

    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    // 幾つかのページでg:plusoneを書き換えれない問題がある
    // var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    document.body.appendChild(po);

})();