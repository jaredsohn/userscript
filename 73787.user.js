// ==UserScript==
// @name           IF/ZB  PM Popup
// @description    Pop up PMs from the toast.  Based on a feature from the info bar.
// @version        2.0
// @include        *zetaboards.com/*
// @include        http://if.invisionfree.com/*
// ==/UserScript==

$(function() {
$("<div id='pmpopup' style='margin:0 auto;position:fixed;right:220px;bottom:20px;display:none;border:1px solid;max-height:95%;width:45%;overflow-y:auto;'></div>").appendTo("body");

$("a#pmlink").each(function(){
if (!document.getElementById('pmlink').innerHTML.match(/You have \d+ new messages/))
	$(this).attr("href","javascript:pmpop('"+$(this).attr("href")+"')")
});
});

function pmpop(iurl) {
$.get(iurl,function(x) {
var idoc = document.createElement("DIV");
idoc.innerHTML = x;
var xc, mid, secure, msg;
xc = $('input[name=xc]',x).val(), mid = $('input[name=mid]',x).val(), secure = $('input[name=secure]',x).val();
msg =  iurl.split(/id=/)[1];
var pmuser = "<table><tr><td>";
pmuser += $(idoc).find("table#conversation").html();
pmuser += "</td></tr>";
if ($(idoc).find("#c_post").html() != null) {
pmuser += "<tr><td id='c_post'>";
pmuser += $(idoc).find("#c_post").html();
pmuser += "<button type='submit' id='sendreply'>Send Message</button><button id='pmpoppreview'>Preview Message</button></td></tr></table>";
}
$("#pmpopup").fadeIn("slow").html(pmuser);
$("#btn_preview").remove();
$("#pmclose").click(function(){$("#pmpopup").hide("slow")});
$("#pmpoppreview").click(function(){Preview()});
$("#sendreply").click(function(){
var post = $("#quickcompose").val();
$.post(main_url + 'msg/?c=3&sd=1', { msg: msg, mid:mid, xc:xc, secure:secure, post:post}, function(return_data) {
$("#sendreply").remove();
$("#pmpoppreview").remove();
$("#pmpopup").append("<button id='pmpopupclose' style='width: 100%'>PM sent.  Close the PM popup.</button>");
$("#pmpopupclose").click(function(){$("#pmclose").click();});
})
})
})
}