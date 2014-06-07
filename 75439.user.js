// ==UserScript==
// @name           Mamba_Spam_Marker
// @namespace      Mamba_utils
// @include        http://mamba.ru/my/messages.phtml?rand=*
// @include        http://mamba.ru/my/messages.phtml?fid=*
// ==/UserScript==
 
function Spam_marker()
	{

		var strSpamHref = "http://mamba.ru/my/message.phtml?action=Blocked&markspam=1&oid=";
		var tdUsers = document.getElementById("SearchPage");
		var liUser = tdUsers.lastElementChild;
		var ulUser = liUser.getElementsByTagName("ul");
		
		for (var i = 0; i < ulUser[0].childElementCount; ++i) 
		{
			if (ulUser[0].children[i].children[0].children[0].children[0].children[0].children[0].childElementCount != 0) {
				var hrefUser = ulUser[0].children[i].children[0].children[0].children[0].children[2].children[0].children[0].children[0].children[0].href;
				var userOid = hrefUser.substring(hrefUser.indexOf("oid=") + 4);
				var tmpString = ulUser[0].children[i].children[0].children[0].children[0].children[3].innerHTML;
				ulUser[0].children[i].children[0].children[0].children[0].children[3].innerHTML = tmpString + '<div class="messages-vips"><a class="message-actions  new-msg" href="' + strSpamHref + userOid + '" target="complaint_' + userOid + '">Spam</a></div>';
				}
		}
	}
Spam_marker();