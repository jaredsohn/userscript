
// ==UserScript==
// @name           ban na rok
// @namespace      http://www.fotka.pl/profil/Bozar
// @include        http://www.fotka.pl/out/users_info.php*
// ==/UserScript==

var $ = unsafeWindow.$;
var uid = document.location.href.match(/user_id=(\d+)/)[1];  // powinno zawsze banglać
if(!uid) return;
$(".banuj").click(function(){
	var mod = $(this).attr("id").split("_")[1];
	if(mod == 9){
		var newItem = document.createElement("a");		
		newItem.setAttribute("onclick", "info_operacje("+uid+",9,'ban',8760);$('#info_ban_menu').hide();");
		newItem.innerHTML = "1 rok";
		newItem.href = "javascript:void(0);";
		newItem.id = "permban";
		$("#info_ban_menu > div").append(newItem);		
	}else{
		var link = $("#permban");
		if(link) link.remove();
	}
});
