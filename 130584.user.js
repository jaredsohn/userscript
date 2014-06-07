// ==UserScript==
// @name           dA_signature_visibility
// @namespace      dA_signature_visibility
// @description    alter appearance of signatures
// @include        *.deviantart.*
// @include        http://sta.sh/*
// @version        1.8
// ==/UserScript==

(function(){
var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;

function signat(){
	var coms = $(".text.text-ii:not(div[dA_sig_vis_finished])").each(function(index, value){
		var sig=$(this).find(".cc-signature");
		if(sig.length!=0){var sigt=sig.html();sig.remove();}else{$(this).addClass("dA_sig_vis_cont");return;}		
		$(this).html("<div class='dA_sig_vis_cont'>"+$(this).html()+"</div><div class='dA_sig_vis_sig'>"+sigt+"</div>");
		$(this).attr("dA_sig_vis_finished",true);
	})
}

function urlpruf(){
	setTimeout(urlpruf,500);
	if($(".text.text-ii:not(div[dA_sig_vis_finished])").length){signat();return true;}	
}
GM_addStyle(".ch-ctrl.cc-in{min-height:100px;} .ch-ctrl.cc-in{padding:0px;} .cc-meta{padding:8px 8px 0px 8px;} .dA_sig_vis_cont{padding:0px 8px 4px 8px;} .dA_sig_vis_sig{padding:8px;background-color:#c7d1c3;color:#777;} .dA_sig_vis_sig a{color:#777!important;}");
 urlpruf();
})();