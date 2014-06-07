// ==UserScript==
// @name           kirl_tk
// @namespace      kirl_tk
// @description    tko scripts
// @include        http://connect.koramgame.com/?act=login.facebook&u=102026&u2=facebook&ref=http://u14.tk.koramgame.com
// @include        http://static.koramgame.com/sg/2.7.0/scripts/global/game.js?ver=201112081213112
// @require        http://static.koramgame.com/sg/2.7.0/scripts/global/core.js?ver=20111208121311
// @require        http://static.koramgame.com/sg/2.7.0/scripts/lang/en.js?ver=20111208121311
// @require        http://userscripts.org/scripts/source/29910.user.js 
// @require        http://userscripts.org/scripts/source/29910.user.js 
// @require        http://sizzlemctwizzle.com/updater.php?id=86674&days=1
// ==/UserScript== 


<div class="rightall">
<div class="info">
<div id="indexqueue"></div>
<div class="garrison" id="villagesoldierview"></div>
</div>
</div>
<div class="view_right" id="floatblockright"></div>
</div>
<!--右结构end-->
<div id="xmlLoading" onclick="MM_showHidden('xmlLoading', 'none');MM_showHidden('mask_alpha', 'none');"><img src="http://static.koramgame.com/sg/2.7.0/style/global/images/icon/loading.gif" width="16" height="16" align="absmiddle" valign="center"/></div>
<div id="mask_top" class="mask" onclick="if (!$('dialog')){location.href=location.href;return false;};"></div>
<div id="mask_bottom" class="mask"><iframe></iframe></div>
<div id="mask_alpha" class="mask"><iframe></iframe></div>
<div id="sinan" class="bg_gps"></div>
<div class="noviceguide" id="newer_wizard_layer">
<span id="newer_wizard_text"></span>
<a href="javascript:void(0);" class="redbutton_s" id="newer_wizard_nextstep">Next</a>
</div>
<div id="newer_wizard">
<div id="newer_wizard_content"><b class="b1"></b><b class="b2"></b><b class="b3"></b><b class="b4"></b><div id="newer_wizard_frame" class="b"></div><b class="b4b"></b><b class="b3b"></b><b class="b2b"></b><b class="b1b"></b></div>
<div class="arrow_up" id="newer_wizard_arrowup" style="display:none"></div>
<div class="arrow_down" id="newer_wizard_arrowdown" style="display:none"></div>
</div>
</div>
