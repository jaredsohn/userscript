// ==UserScript==
// @name           message4manyLJ
// @include        http://www.livejournal.com/inbox/compose.bml*
// ==/UserScript==

try {
	window.addEventListener("load", windowOnLoad, false);
} catch (ex) {}


function sendm(){
var niks_a;
	var niks = document.getElementById('namemany').value;
	niks_a=niks.split('\n');
	//compose=document.getElementById("compose")
	for (var i=0;i<niks_a.length;i++) {
		setTimeout('javascript:var nik="'+niks_a[i]+'"; if (nik) { document.getElementById("msg_to").value=nik;compose=document.getElementById("compose");compose.target="sendto"+nik;input1=compose.getElementsByTagName("input");input1[4].click();/*console.log(input1[4]);*/}',i*1000);
	}
	//setTimeout("alert('Сообщения отправлены!')",i*1000);

}


function windowOnLoad () {
compose=document.getElementById("compose");
content = document.getElementById('Content');
if (compose&&content) {
content.innerHTML='Enter many nicks here (one nick on per line):<br><textarea id="namemany" name="namemany" rows=6 cols=30></textarea><br><input type="button" value="send message to many" id="sendmanybutton"><br></br>'+content.innerHTML;
document.getElementById('sendmanybutton').addEventListener("click",sendm,false);
}
};
