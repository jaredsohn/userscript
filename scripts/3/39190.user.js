// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui (cuimingda(at)126(dot)com || http://cuimingda.com)
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Blogger Source Code Formatter
// @namespace       http://cuimingda.com
// @description     format source code in edit area
// @include         http://www.blogger.com/post-edit.g*
// @include         http://www.blogger.com/post-create.g*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require         http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.3/jquery-ui.js
// @resource        formatterImage http://cuimingda.googlecode.com/svn/trunk/scripts/39190/formatter.png
// ==/UserScript==
//
// 0.1 @ 2008/12/25 # Initial Release
//
// Some work is based on http://www.blogger.com/common/js/2296960907-richedit-bundle.js
// Tested on Firefox 3.05 and Greasemonkey 0.8
//
// Usage - Modify CSS Styles and add them into your Blogger template
//
// pre.source-code {
//     font-family       : Andale Mono, Lucida Console, Monaco, fixed, monospace;
//     color             : #000;
//     background-color  : #eee;
//     font-size         : 12px;
//     border            : 1px dashed #999999;
//     line-height       : 14px;
//     padding           : 5px;
//     overflow          : auto;
//     width             : 100%;
//     text-indent       : 0px;
// }
//
// --------------------------------------------------------------------------------

;(function() {
    $(document).ready(function() {
        if($(this).attr("title") === "") return;
        
        var image = "<img alt='格式化代码' border='0' src='" + GM_getResourceURL("formatterImage") + "' />";
        
        $("#htmlbar_Buttons")
            .append("<span id='htmlbar_formatter' title='格式化代码'>" + image + "</span>")
            .append("<div class='vertbar'><span class='g'>&nbsp;</span><span class='w'>&nbsp;</span></div>");
        
        $("#htmlbar_formatter")
            .mouseover(function()   { unsafeWindow.ButtonHoverOn(this); })
            .mouseout(function()    { unsafeWindow.ButtonHoverOff(this); })
            .click(function(event)  { Textbar.formatSourceCode(); });
    });
    
    var Textbar = {};
    
    Textbar.formatSourceCode = function() {
        var textarea = $("#textarea").get(0);

        var v = textarea.value;
        
        var selLength = textarea.textLength;
        var selStart = textarea.selectionStart;
        var selEnd = textarea.selectionEnd;
        var scroll = textarea.scrollTop;
        
        var s1 = (v).substring(0,selStart);
        var s2 = (v).substring(selStart, selEnd)
        var s3 = (v).substring(selEnd, selLength);
        
        s2 = s2.replace(/<code[^>]*>|<\/code>|<pre[^>]*>|<\/pre>/g, "");
        s2 = s2.replace(/</g, "&lt;");
        s2 = s2.replace(/>/g, "&gt;");
        
        var lft = "<pre class=\"source-code\"><code>";
        var gft = "</code></pre>";
        
        textarea.value = s1 + "<pre class=\"source-code\"><code>" + s2 + "</code></pre>" + s3;
        textarea.setSelectionRange(s1.length, s1.length + lft.length + s2.length + gft.length);
        textarea.scrollTop = scroll;
        textarea.focus();
    };
})();