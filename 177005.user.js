// ==UserScript==
// @name       LF 5.0 Tabify
// @namespace  LF 5.0 Tabify
// @version    1.01
// @description  LF 5.0 Tabify
// @include      http://leakforums.org/member.php?action=profile*
// @include      http://*.leakforums.org/member.php?action=profile*
// @match      http://leakforums.org/member.php?action=profile*
// @match      http://*.leakforums.org/member.php?action=profile*
// @copyright  2013+, Oscar Sanchez
// @icon http://www.leakforums.org/favicon.ico
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @run-at document-end
// ==/UserScript==

tabs = '<div id="bridge"><div class="wrap"><div class="menu"><ul><li><a class="info" href="javascript:void(0);"><img src="images/leakforums/user.png" class="icon"> Info</a></li><li><a class="contact" href="javascript:void(0);"><img class="icon" src="images/leakforums/toplinks/forums.png"> Contact</a></li><li><a class="signature" href="javascript:void(0);"><img class="icon" src="images/leakforums/toplinks/help.png"> Signature</a></li><li><a class="more" href="javascript:void(0);"><img class="icon" src="images/leakforums/toplinks/more.png"> More</a></li></ul></div></div></div>';
$("head").append("<style>.ptabl{background: rgb(48, 48, 48);color: rgb(255, 255, 255);text-decoration: none;} .ptab div[style*='max-width: 485px'] { max-width: 100% !important; max-height: 410px !important; }#content{min-height: 540px;}.ptab{display:none; position: absolute}.a_ptab{display:table} .left{position: absolute; left: 0; right: 0}</style>");
a = "#content>table td:nth-child(3):first";
$(a).prepend(tabs);
$(a).removeAttr("width");
$(a).css({"display":"block", "position": "relative","top": "-10px","left": "-26px", "width" : "calc(100% + 16px)"});
$(a+" table:first").css("position","relative");
$(a+" table:first table:not([cellpadding='0'])").addClass("ptab");
$(a+" table:first table:not([cellpadding='0'])").attr("cellpadding","6");
$(a+" table:first td:nth-child(3)").addClass("left");
$("#content #bridge .wrap").css("width", "100%");
$(".left a[href*='editlist']").remove();
$(a+" table:first td:nth-child(3)").removeAttr("width");
$(".info").addClass("ptabl");
$(a+" table:first table:first").addClass("a_ptab");
$(a+" table:first br").remove();
function act(){$(".a_ptab").removeClass("a_ptab");$(".ptabl").removeClass("ptabl");}
$(".info").click(function (){ act();$(this).addClass("ptabl");$(".ptab").eq(0).addClass("a_ptab"); });
$(".contact").click(function (){ act();$(this).addClass("ptabl");$(".ptab").eq(1).addClass("a_ptab"); });
$(".signature").click(function (){ act();$(this).addClass("ptabl");$(".ptab").eq(2).addClass("a_ptab"); });
$(".more").click(function (){ act();$(this).addClass("ptabl");$(".ptab").eq(3).addClass("a_ptab"); });