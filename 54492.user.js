// ==UserScript==
// @name           zemo.in.th
// @namespace      http://www.userscripts.org/people/171
// @include        *:88/forums.php?action=*
// @include        *:88/markets.php?action=*
// ==/UserScript==
var emo_count=["27", "50"]
var emo_bb = [
						["[url=http://www.emoticon.in.th][img]http://www.emoticon.in.th/datas/emoticon/5/rabbit",".gif[/img][/url]"],
						["[url=http://www.emoticon.in.th][img]http://www.emoticon.in.th/datas/emoticon/1/onion",".gif[/img][/url]"]
					];

var emo_img=[
						["<img src='http://www.emoticon.in.th/datas/emoticon/5/rabbit",".gif' id='","'  width=25 height=25 border=0 />"],
						["<img src='http://www.emoticon.in.th/datas/emoticon/1/onion",".gif' id='","'  width=25 height=25 border=0 />"],
					];

function insertAtCursor(myField, myValue) {
	var startPos = myField.selectionStart;
	var endPos = myField.selectionEnd;
	myField.value = myField.value.substring(0, startPos)
							+ myValue
							+ myField.value.substring(endPos, myField.value.length);
}

function strpad(str,padString, length) {
    while (str.length < length)
        str = padString + str;
    return str;
}

function setbbcode(id){
	id2=id.split("|");
	return emo_bb[id2[1]][0]+id2[0]+emo_bb[id2[1]][1];
}

function setsmile(event){
	if(window.location.href.toLowerCase().match("forums.php?") || window.location.href.toLowerCase().match("markets.php?")){
		insertAtCursor(document.getElementsByName("body")[0], setbbcode(event.target.id));
		document.getElementsByName("body")[0].focus();
      }
}

var logo = document.createElement("div");
var HTML = "<div align='center'>";

for (var j=0; j <= emo_count.length ; j++) {
	HTML += "<div align='center' id=div_"+j+">";
	for (var i=0; i <= emo_count[j] ; i++) {

		var suggest = emo_img[j][0]+strpad(i.toString(),'0',3)+emo_img[j][1]+strpad(i.toString(),'0',3)+"|"+j+emo_img[j][2];
		
		if((i+1) % 20 ==0) suggest += "<br>";
		HTML += suggest;
	}
	HTML += "</div>";
}
HTML += "</div>";
logo.innerHTML = HTML;

if(window.location.href.toLowerCase().match("forums.php?") || window.location.href.toLowerCase().match("markets.php?")){
     toolb = document.getElementsByName("body")[0];
     toolb.parentNode.insertBefore(logo,toolb);
}

for (var j=0; j <= emo_count.length ; j++) {
	for (var i=0; i <= emo_count[j] ; i++) {
		document.getElementById(strpad(i.toString(),'0',3)+"|"+j).addEventListener("click", setsmile, true);	
	}
}