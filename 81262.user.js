// ==UserScript==
// @name            PnC Remover
// @description     Hides Politics & Controversy forums from gamerswithjobs.com
// @version         1.0
// @author          Anodyne
// @include         http://www.gamerswithjobs.com/forum
// ==/UserScript==



var trs = document.getElementsByTagName("tr");
for (i = 0; i < trs.length; i++)
{
	var tr_contents = (trs[i].innerHTML);
	
	var the_thingy = tr_contents.match("Politics and Controversy");

	if (the_thingy != null)
	{
		trs[i].parentNode.removeChild(trs[i]);
		break;
	}
}
