// ==UserScript==
// @name        _Stumbleupon, add direct link to content page
// @include     http://www.stumbleupon.com/su/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

$("#tb-like").before ( (<><![CDATA[
    <li id      = "gmDirectLinkDisp"
        class   = "tb-btn tb-hide-visitor"
        title   = "Click for the direct link to the target page, below."
    >
        <button>Direct link</button>
    </li>
]]></>).toString () );

$("#gmDirectLinkDisp button").click ( function () {
    var targURL = location.href.replace (
        /^.+stumbleupon\.com\/su\/\w+\/[^\/]+\/(.+?)\/?$/i
        , "http://$1"
    );
    window.prompt (
        "Press 'Ctrl+C' to copy to the clipboard; "
        + "then press `Enter` to close this dialog."
        , targURL
    );
} );

GM_addStyle ( (<><![CDATA[
    #gmDirectLinkDisp {
        float:              left;
    }
    #gmDirectLinkDisp button {
        padding:            0;
        margin-top:         10px;
    }
]]></>).toString () );