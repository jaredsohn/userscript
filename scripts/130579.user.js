// ==UserScript==
// @name          mercadia.de quick reply
// @namespace     -
// @description   Adds a quick reply option to the mercadia.de forums.
// @include       http://mercadia.de/home/page.php?site=inter/mpf/viewthread*
// ==/UserScript==

/*----- functions -----*/
var txtA;
function addText(obj){
	var positionA = txtA.selectionStart;
	txtA.value = txtA.value.substring(0,positionA) + "[" + obj.id + "]" + txtA.value.substring(positionA,txtA.value.length);
	txtA.focus();
    txtA.setSelectionRange(positionA+obj.id.length+2, positionA+obj.id.length+2);
	if(obj.id.substring(0,1) != "s"){
		if(obj.id.substring(0,1) != "/"){
		obj.style.display = "none";
		document.getElementById("/"+obj.id).style.display = "inline";
		} else {
		obj.style.display = "none";
		document.getElementById(obj.id.substring(1,obj.id.length)).style.display = "inline";
		}
	}
}

/*----- generate GUI -----*/
var insertNr = 0;
var loginMsg = document.createElement('tr');
var permission = true;
loginMsg.innerHTML = "<td colspan='2'><span style='font-size: 8pt;'>Eingeloggt.</span></td>";
for(i=document.getElementsByTagName("tr").length-1;insertNr != i+1;i--){
	if(document.getElementsByTagName("tr")[i].innerHTML.search("Antworten") != -1 || document.getElementsByTagName("tr")[i].innerHTML.search("Bearbeiten") != -1 || document.getElementsByTagName("tr")[i].innerHTML.search("du kannst hier keine Beiträge hinzufügen") != -1){
		insertNr=i;
		if(document.getElementsByTagName("tr")[i].innerHTML.search("du kannst hier keine Beiträge hinzufügen") != -1){
			permission = false;
		}
	}
}
for(i=document.getElementsByTagName("form").length-1;i > 0 && loginMsg.innerHTML == "<td colspan=\"2\"><span style=\"font-size: 8pt;\">Eingeloggt.</span></td>";i--){
	if(document.getElementsByTagName("form")[i].innerHTML.search("Username") != -1){loginMsg.innerHTML="<td colspan='2'><span style='font-size: 8pt; color:red;'><b>Achtung:</b></span><span style='font-size: 8pt;'> Nicht eingeloggt!</span></td>";}
}
var referenceNode = document.getElementsByTagName("tr")[insertNr];
var myNode = document.createElement('tr');
referenceNode.parentNode.insertBefore(myNode, referenceNode.nextSibling);
referenceNode.parentNode.insertBefore(loginMsg, referenceNode.nextSibling);
if(permission == true){
	var boardNr = referenceNode.innerHTML.substring(referenceNode.innerHTML.search("board")+6,referenceNode.innerHTML.length);
	if(boardNr.search("&") != -1){
		boardNr = boardNr.substring(0,boardNr.search("&"));
	}
	var threadNr = window.location.href.substring(window.location.href.search("id")+3,window.location.href.length);
	if(threadNr.search("&") != -1){
		threadNr = threadNr.substring(0,threadNr.search("&"));
	}

	myNode.innerHTML = 	"<td align='center' colspan='2'><form name='mpf' action='do/mpf/input.php' method='post'>"+
						"<input type='hidden' name='action' value='post'>"+
						"<input type='hidden' name='sys' value='f'>"+
						"<input type='hidden' name='board' value='"+boardNr+"'>"+
						"<input type='hidden' name='thread' value='"+threadNr+"'>"+ //fix
						"<input type='hidden' name='bp' value='1'>"+
						"<input type='hidden' name='p' value='0'>"+
						"<textarea id='txtArea' cols=60 rows=15 name='eingabe'></textarea>"+
						"<br><img id='s1' src='http://mercadia.de/home/grafik/smileys/s1.gif'/>"+
						"<img id='s5' src='http://mercadia.de/home/grafik/smileys/s5.gif'/>"+
						"<img id='s10' src='http://mercadia.de/home/grafik/smileys/s10.gif'/>"+
						"<img id='s15' src='http://mercadia.de/home/grafik/smileys/s15.gif'/>"+
						"<img id='s20' src='http://mercadia.de/home/grafik/smileys/s20.gif'/>"+
						"<img id='s23' src='http://mercadia.de/home/grafik/smileys/s23.gif'/>"+
						"<img id='s25' src='http://mercadia.de/home/grafik/smileys/s25.gif'/>"+
						"<img id='s32' src='http://mercadia.de/home/grafik/smileys/s32.gif'/>"+
						"<input id='b' type='button' value='b'/><input id='/b' style='display:none;' type='button' value='b'/>"+
						"<input id='i' type='button' value='i'/><input id='/i' style='display:none;' type='button' value='i'/>"+
						"<input id='image' type='button' value='image'/><input id='/image' style='display:none;' type='button' value='image'/>"+
						"<input id='url' type='button' value='url'/><input id='/url' style='display:none;' type='button' value='url'/>"+
						"<input id='card' type='button' value='card'/><input id='/card' style='display:none;' type='button' value='card'/>"+
						"<br><input type='submit' name='submitbtn' value='Absenden'/>"+
						"</form></td>";
	txtA = document.getElementById("txtArea");
	document.getElementById("s1").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("s5").addEventListener("click", function() {addText(this);}, false);		
	document.getElementById("s10").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("s15").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("s20").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("s23").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("s25").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("s32").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("b").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("/b").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("i").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("/i").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("image").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("/image").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("url").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("/url").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("card").addEventListener("click", function() {addText(this);}, false);
	document.getElementById("/card").addEventListener("click", function() {addText(this);}, false);
}else{
	myNode.innerHTML = "<td align='center' colspan='2'>Posten nicht möglich in diesem Thread.</td>";
}