// ==UserScript==
// @name           lol_emo_lite_eBy_iBuffalo
// @namespace      http://www.userscripts.org/
// @include        http://*lol*.com/forums.php?*
// @include        http://*lol*.com/comment.php?*
// @include        http://*lol*.com/markets.php?*
// @include        http://*lol*.com/sendmessage.php?*
// ==/UserScript==
// change from reply_emo
// edit by SpyBitX v1.2
// edit by iBuffalo v1.3

function insertAtCursor(myField, myValue) {
	var startPos = myField.selectionStart;
	var endPos = myField.selectionEnd;
	myField.value = myField.value.substring(0, startPos)
							+ myValue
							+ myField.value.substring(endPos, myField.value.length);
}

function setsmile(event){
      if(window.location.href.toLowerCase().match("comment.php?")){
		insertAtCursor(document.getElementsByName("text")[0],event.target.id);
		document.getElementsByName("text")[0].focus();

      }else if(window.location.href.toLowerCase().match("forums.php?") || window.location.href.toLowerCase().match("markets.php?")){
		insertAtCursor(document.getElementsByName("body")[0],event.target.id);
		document.getElementsByName("body")[0].focus();
      }else if(window.location.href.toLowerCase().match("sendmessage.php?")){
		insertAtCursor(document.getElementsByName("msg")[0],event.target.id);
		document.getElementsByName("msg")[0].focus();
      }
}

var logo = document.createElement("div");
var HTML = "";
var poo = eval("[['[img]http://www.computeradmin.net/images/red_crab/poo1.gif[/img]','poo1.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo2.gif[/img]','poo2.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo3.gif[/img]','poo3.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo4.gif[/img]','poo4.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo5.gif[/img]','poo5.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo6.gif[/img]','poo6.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo7.gif[/img]','poo7.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo8.gif[/img]','poo8.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo9.gif[/img]','poo9.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo10.gif[/img]','poo10.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo11.gif[/img]','poo11.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo12.gif[/img]','poo12.gif']]");
var HTML3 = "";
for (var i=0; i < poo.length ; i++) {

    var sug2 = "<img src='http://www.computeradmin.net/images/red_crab/"+poo[i][1]+"' id='"+poo[i][0]+"' />";
   
    if((i+1) % 12 ==0) sug2 += "<br>";
    HTML3 += sug2;
}

var poo2 = eval("[['[img]http://www.computeradmin.net/images/red_crab/poo13.gif[/img]','poo13.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo14.gif[/img]','poo14.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo15.gif[/img]','poo15.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo16.gif[/img]','poo16.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo17.gif[/img]','poo17.gif'],['[img]http://www.computeradmin.net/images/red_crab/poo18.gif[/img]','poo18.gif']]");
var HTML4 = "";
for (var i=0; i < poo2.length ; i++) {

    var sug3 = "<img src='http://www.computeradmin.net/images/red_crab/"+poo2[i][1]+"' id='"+poo2[i][0]+"' />";
   
    if((i+1) % 12 ==0) sug3 += "<br>";
    HTML4 += sug3;
}

var BB = "";

logo.innerHTML = "<div align='center'>" + HTML3 + "<br>" + HTML4 + "<br></div>";

if(window.location.href.toLowerCase().match("comment.php?")){
     toolb = document.getElementsByName("text")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}else if(window.location.href.toLowerCase().match("forums.php?") || window.location.href.toLowerCase().match("markets.php?")){
     toolb = document.getElementsByName("body")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}else if(window.location.href.toLowerCase().match("sendmessage.php?")){
     toolb = document.getElementsByName("msg")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}


for (var i=0; i < poo.length ; i++) {
    document.getElementById(poo[i][0]).addEventListener("click", setsmile, true);   
}

for (var i=0; i < poo2.length ; i++) {
    document.getElementById(poo2[i][0]).addEventListener("click", setsmile, true);   
}