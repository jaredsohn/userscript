// ==UserScript==
// @name       lf colour changer that's not retarded
// @namespace  http://leakcolorusdaaoihoaijf9pfy07cye/
// @version    0.1
// @description  a;iugysdfigdfui
// @include http://*leakforums.org*
// @copyright  2012+, You
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require https://googledrive.com/host/0B3djEhxHeikDNkR6MGM4Q3BLenc/cookie.js
// @run-at document-end
// ==/UserScript==
if (getCookie("rotcol") == null) { setCookie("rotcol", "85"); rotcol = 85; } else { rotcol = getCookie("rotcol"); }
jQuery(".dd_left li:last").append('<li><input class="colch" type="range" min="0" max="360" value="' + (rotcol | rotcol) + '"></li>');
jQuery("head").append("<style>.colch{outline:0;-webkit-appearance:none;background-color:silver;width: 179px; margin-left: -1px; margin-top: 1px;height:26px;border:1px solid #000;background:-moz-linear-gradient(left,red,orange,yellow,green,blue,indigo,violet,red);background:-webkit-gradient(linear,left center,right center,from(red),color-stop(14%,orange),color-stop(28%,yellow),color-stop(42%,green),color-stop(56%,blue),color-stop(70%,indigo), color-stop(90%, violet), to(red))}input[type='range']::-webkit-slider-thumb{-webkit-appearance:none;opacity:.5;width:8px;height:26px;border-left:1px solid #000;border-right:1px solid #000;cursor:move;background:#FFF}</style>");
css = function (r) {
    return "<style>/*Theme Changer*/#home .home,#forums .forums,#memberlist .memberlist,.dd_login_ .button,#message,#help .help,.toolbar_hover,.toolbar_dropdown_group_first.editor_dropdown_menu_open,.toolbar_dropdown_size.editor_dropdown_menu_open,.toolbar_dropdown_over,.shadetabs li a.selected,.thead,.pm_alert,.tfoot,.pagination .pagination_current,.sidebar_toggle,.large_icon,#header,#panel ul li a:hover,img[id*='mark_read_'],#footer,.menu .hovered a,#content img[src*='folder'],#lfus_s,#content form[name='input'] .button, form[action*='moderation.php'] .button,form[action*='managegroup.php'] .button,form[action*='report.php'] .button,form[action*='search.php'] .button[value='Search'],form[action*='memberlist.php'] .button,form[action*='usercp.php'] .button,.ptabl{-webkit-filter:hue-rotate(" + (parseInt(r)-85) + "deg)}.expcolimage:hover{background:rgba(0,0,0,.5)!important}.expcolimage{background:rgba(0,0,0,.4)!important}input.textbox:focus,textarea:focus,select:focus{border:1px solid #fff}</style>";
};
jQuery("head").append(css(rotcol));
jQuery('.colch').on('mousemove mousedown', function (e) {
    if (e.which == 1) {
        jQuery("style:contains('Theme Changer')").replaceWith(css(jQuery(this).val()));
    }
});
 
jQuery('.colch').on('mouseup', function (e) {
    setCookie("rotcol", jQuery(this).val());
});