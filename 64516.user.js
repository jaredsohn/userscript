// ==UserScript==
// @name           QuickReply
// @namespace      misc
// @description    Add Quick Reply to News Feed
// @include        https://www.scriptlance.com/cgi-bin/freelancers/freelancers.cgi?manage=1
// ==/UserScript==

// Rajesh Soni  (rajeshgsoni@gmail.com)
// http://rajeshsoni.net

buyers = document.body.innerHTML.match(/reply=(.*)&amp\;id=(.*)&amp/gim);

for (i=0; i<buyers.length ; i++)
{
	msg = buyers[i];
	project = msg.match(/reply=(.*)&amp\;id/)[1];
	buyer = msg.match(/id=(.*)&/)[1];

	find = "<a href=\"forum.cgi?reply=" + project + "&amp;id=" + buyer + "&amp;red=m\">Reply";
	document.body.innerHTML = document.body.innerHTML.replace(find, find.replace("Reply"," Reply ") + "</a>  |  <a href='#' onclick=\"javascript:document.getElementById('msg').style.display=''; document.getElementById('private').value='" + buyer + "'; document.getElementById('reply2').value='" + project + "'; o = this; t = o.offsetTop; l = o.offsetLeft; while(o != document.body ){ o = o.offsetParent	;  l = l + parseInt(o.offsetLeft);  t = t + parseInt(o.offsetTop);  } document.getElementById('msg').style.left=l ; document.getElementById('msg').style.top=t ; document.getElementById('message').focus(); return false;\">Quick Reply");
}


document.body.innerHTML = document.body.innerHTML + "<div id='msg' style='position:absolute;display:none;background-color:white;'><form method=\"post\" target=\"_blank\" action=\"https://www.scriptlance.com/cgi-bin/freelancers/forum.cgi\"><input type='hidden' name=\"private\" id=\"private\"><input type='hidden' name=\"reply2\" id='reply2'><textarea rows=10 cols=30 id=\"message\"  name=\"message\" ></textarea><br/><input type=\"submit\" value=\"Submit\" name=\"submit\">    <input type=\"button\" value=\"Cancel\" onclick=\"document.getElementById('msg').style.display='none';\" ></form></div>";
