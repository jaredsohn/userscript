// ==UserScript==
// @name           Forestle Igoogle Search
// @namespace      MysticX
// @description    Replaces igoogle's search with Forestle's carbon 		   neutral search engine that supports rainforest 		   restoration.
// @include        http://www.google.com/ig*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.sw_logo { background: transparent url("http://forestle.org/_images/banner/button_en.gif") no-repeat scroll 0 -0px;height:110px;width:370px;margin: 10px 0 0 355px; }');
addGlobalStyle('.sw_b input { border:0 none;color:#333333;float:left;font-size:100%;height:1.2em;line-height:1.2em;margin:0 0.44em -0.8em 0.24em;padding:0.2em;width:24.0333em;}');
addGlobalStyle('.sw_b .sw_qbtn {background:transparent url("http://forestle.org/_images/banner/icon.gif") repeat scroll 0 0;cursor:pointer;height:16px;margin:0 0 -12px;overflow:hidden;padding:16px 0 0;width:16px;}');
addGlobalStyle('.sw_b {background:#FFFFFF none repeat scroll 0 0;border:1px solid #ACBABD;float:left;font-size:115.9%;margin:0 0 0 1px;padding:0.2em 0.2em 1em;}');

document.getElementById('gsea').innerHTML = '<div class="sw_sform"><table align="center" style="margin-top:0px; padding-right:65px;"><tr><td class="sw_logo"></td><td style="padding-top:40px"><form id="sb_form" class="sw_box" action="http://us.forestle.org/en/search.php"><div class="sw_b"><input type="text" value="" title="Enter your search term" name="q" id="sb_form_q" class="sw_qbox" autocomplete="off"/><input type="submit" value="" title="Search" tabindex="0" name="go" id="sb_form_go" class="sw_qbtn"/><input type="hidden" value="QBLH" name="form"/></div></form></td></tr></table></div>';