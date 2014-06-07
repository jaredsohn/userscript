// ==UserScript==
// @name           GTFO
// @namespace      http://geekminute.com/GTFO
// @description    GTFO
// @include        http://gtfo-ot.com/forums/misc.php?do=cchatbox
// ==/UserScript==


function ChangeSize(size) {
	var chat = document.getElementById('cybcb_messagearea');
	chat.setAttribute('style', 'overflow: auto; height: ' + size + 'px; width: 100%; background-color: rgb(225, 228, 242); font-size: 11px;');
}

function SizeComboChange(size) {
	Ccb_saveCookie("chatheight", size);
	ChangeSize(size);
}

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = ChangeSize;
document.body.appendChild(script);


var script2 = document.createElement("script");
script2.type = "application/javascript";
script2.textContent = SizeComboChange;
document.body.appendChild(script2);


var sponsors = document.evaluate("//td[@class='tcat']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


var script3 = document.createElement("span");
script3.style.cssFloat = "right";
script3.innerHTML = 'Nox Height:<select id="noxchatheight" name="noxchatheight" onchange="SizeComboChange(this.value)"> <option value="400"  selected="selected">400px</option>  <option value="500" >500px</option><option value="550" >550px</option>  <option value="600" >600px</option>  <option value="650" >650px</option><option value="700" >700px</option> <option value="750" >750px</option> <option value="800" >800px</option> <option value="850" >850px</option> <option value="900" >900px</option> <option value="950" >950px</option> <option value="1000" >1000px</option></select>';
sponsors.snapshotItem(0).appendChild(script3);

//sponsors.snapshotItem(0).innerHTML +='<span style="float:right">Nox Height: <select id="noxchatheight" name="noxchatheight" onchange="SizeComboChange(this.value)"> <option value="400"  selected="selected">400px</option>  <option value="500" >500px</option><option value="550" >550px</option>  <option value="600" >600px</option>  <option value="650" >650px</option><option value="700" >700px</option> <option value="750" >750px</option> <option value="800" >800px</option> <option value="850" >850px</option> <option value="900" >900px</option> <option value="950" >950px</option> <option value="1000" >1000px</option></select></span>';

//Load Previously saved value
chat_height = unsafeWindow.fetch_cookie('chatheight');
if (chat_height == null || chat_height == '')
{
	chat_height=400;
}

document.getElementById('noxchatheight').value=chat_height;

ChangeSize(chat_height);

