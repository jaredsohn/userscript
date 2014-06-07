// ==UserScript==
// @name           Ecosia Igoogle Search
// @namespace      MysticX
// @description    Replaces igoogle's search with Ecosia's carbon 		   neutral search engine that supports rainforest restoration.
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

addGlobalStyle('.sw_logo { background: transparent url("http://static.ecosia.org/img/logo_results_ie6.gif") no-repeat scroll 0  1em;height:80px;width:141px;}');

addGlobalStyle('.sw_b input { float:left;font-size:150%;height:2em;line-height:2em;margin:0 0.1em 0.1em 0.1em;padding:0.1em;width:24.0333em;}');

addGlobalStyle('.sw_b .sw_qbtn {background:transparent url("http://static.ecosia.org/img/favicon.ico") no-repeat scroll 0 0;height:36px;width:36px;background-size:36px 36px;border:none;}');

document.getElementById('gsea').innerHTML = '<div class="sw_sform"><table align="center" style="margin-top:0px; padding-right:65px;"><tr><td class="sw_logo"></td><td style="padding-top:15px"><form id="sb_form" class="sw_box" action="http://us.forestle.org/en/search.php"><div class="sw_b"><input type="text" value="" title="Enter your search term" name="q" id="sb_form_q" class="sw_qbox" autocomplete="off"/><input type="submit" value="" title="Search" tabindex="0" name="go" id="sb_form_go" class="sw_qbtn"/><input type="hidden" value="QBLH" name="form"/></div></form></td></tr></table></div>';