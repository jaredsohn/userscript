// ==UserScript==
// @name           Schneller Spenden
// @namespace      http://mes-lotzen.tagesnews.ch/
// @version        1.1
// @description    Spenden für SLSL und SG
// @include        http://*.schulterglatze.de/donation
// @include        http://*.schulterglatze.de/donation*
// @include        http://*.slick-sleeve.com/donation
// @include        http://*.slick-sleeve.com/donation*
// @copyright      2013, by muler
// ==/UserScript==

function removejscssfile(e,b){for(var a="js"==b?"src":"css"==b?"href":"none",d=document.getElementsByTagName("js"==b?"script":"css"==b?"link":"none"),c=d.length;0<=c;c--)d[c]&&(null!=d[c].getAttribute(a)&&-1!=d[c].getAttribute(a).indexOf(e))&&d[c].parentNode.removeChild(d[c])}removejscssfile("js/donation.js?","js");var timer=1E3;function GM_wait(){"undefined"==typeof unsafeWindow.jQuery?window.setTimeout(GM_wait,timer):($=unsafeWindow.jQuery,letsJQuery())}GM_wait(); function letsJQuery(){$(document).ready(function(){$.ajaxSetup({cache:!1});var e={"switch":"donation"},b;$.ajax({url:"/",type:"POST",data:"switch=captcha",dataType:"html",success:function(a){$("#sg-captcha").empty().append(a);$(".content-captcha-pattern-wrapper").addClass("donation-captcha-pattern-wrapper");form='<form action="/donation?'+(new Date).getTime()+'" method="post" id="captcha-form">';for(b in e)form+='<input type="hidden" name="'+b+'" value="'+e[b]+'" />';form+='<input type="hidden" id="captcha-master" name="captcha-master" value="0" />'; for(a=1;7>a;a++)form+='<div id="captcha-pattern-'+a+'" class="style-basic-float-left action-click-js" data-captcha-id="'+a+'"></div>';form+="</form>";$("#sg-captcha .content-captcha-pattern-wrapper").append(form);$("div.action-click-js").click(function(){$("#captcha-master").val($(this).attr("data-captcha-id"));$("#sg-captcha").hide();$(".ajax-loader").show();$("div.action-click-js").parent().submit()})}});if(0<$('div.submit-button:contains("Close window")').length||0<$('div.submit-button:contains("Fenster schlie\u00dfen")').length)parent.opener.location.reload(), 0<$('div.smallProfilSpenden:contains("14 von 15")',window.opener.document).length||0<$('div.smallProfilSpenden:contains("14 of 15")',window.opener.document).length?window.close():window.history.back()})};