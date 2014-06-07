// ==UserScript==
// @name           lol_emo_lite_eMIMEBy_Rockument_001
// @namespace      http://www.userscripts.org/
// @include        http://*lol*.com/forums.php?*
// @include        http://*lol*.com/comment.php?*
// @include        http://*lol*.com/markets.php?*
// @include        http://*lol*.com/sendmessage.php?*
// ==/UserScript==
// change from reply_emo
// edit by SpyBitX v1.2
// edit by iBuffalo v1.3
// edit by Rockument v0.0.1

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
var poo = eval("[['[img]http://www.ragemaker.net/images/thumbs/blonde_big%20smile.png[/img]','https://lh3.googleusercontent.com/-SrhtfoNHWAI/Tyos1YdX5sI/AAAAAAAABN4/C_EUI1zRShc/s50/blonde_big%2520smile.png'],['[img]http://www.ragemaker.net/images/thumbs/blonde_concentrated.png[/img]','https://lh3.googleusercontent.com/-a6oFRg6IZa0/Tyos1UGr0-I/AAAAAAAABN8/cwW50YX3cPQ/s50/blonde_concentrated.png'],['[img]http://www.ragemaker.net/images/thumbs/blonde_dazed.png[/img]','https://lh5.googleusercontent.com/-ucidVa6lm-s/Tyos1T7t5LI/AAAAAAAABOA/0xVk3Q61FOM/s50/blonde_dazed.png'],['[img]http://www.ragemaker.net/images/thumbs/blonde_determined.png[/img]','https://lh6.googleusercontent.com/-ixC1r5H_cv0/Tyos2IlbSII/AAAAAAAABOM/9UqIN3sSxJw/s50/blonde_determined.png'],['[img]http://www.ragemaker.net/images/thumbs/blonde_dude.png[/img]','https://lh6.googleusercontent.com/-kjv8U-rHV1U/Tyos2D9bL4I/AAAAAAAABOE/n9TcETF8t1g/s50/blonde_dude.png'],['[img]http://www.ragemaker.net/images/thumbs/blonde_excited%20tears.png[/img]','https://lh4.googleusercontent.com/-nItNp4jdzvk/Tyos2Sn4_sI/AAAAAAAABOI/ttd7QM-eWa4/s50/blonde_excited%2520tears.png'],['[img]http://www.ragemaker.net/images/thumbs/blonde_normal.png[/img]','https://lh6.googleusercontent.com/-ITu7Oa-jIyw/Tyos2sfNyUI/AAAAAAAABOQ/I1uSUmhZ1tg/s50/blonde_normal.png'],['[img]http://www.ragemaker.net/images/thumbs/blonde_pfft.png[/img]','https://lh4.googleusercontent.com/-u5UixdV8VPY/Tyos23FqOBI/AAAAAAAABOg/27D6JWyAg-w/s50/blonde_pfft.png'],['[img]http://www.ragemaker.net/images/thumbs/blonde_pokerface.png[/img]','https://lh5.googleusercontent.com/-wNfD_DvfZ-U/Tyos3I5usaI/AAAAAAAABOc/a5N2eC6qOJY/s50/blonde_pokerface.png'],['[img]http://www.ragemaker.net/images/thumbs/blonde_schlick.png[/img]','https://lh4.googleusercontent.com/-i32VHFRwdLo/Tyos5tR7iVI/AAAAAAAABO8/D7ikdOPXGZc/s50/blonde_schlick.png'],['[img]http://www.ragemaker.net/images/thumbs/blonde_sweet%20tears.png[/img]','https://lh3.googleusercontent.com/-8k2wu653x_0/Tyos3hyC4wI/AAAAAAAABO0/JhYMIpgd2D4/s50/blonde_sweet%2520tears.png'],['[img]http://www.ragemaker.net/images/thumbs/blonde_why.png[/img]','https://lh5.googleusercontent.com/-40U4aQm2LCo/Tyos31aXQ_I/AAAAAAAABOo/eaTM_4CtYec/s50/blonde_why.png']]");
var HTML3 = "";
for (var i=0; i < poo.length ; i++) {

    var sug2 = "<img src='"+poo[i][1]+"' id='"+poo[i][0]+"' />";
   
    if((i+1) % 12 ==0) sug2 += "<br>";
    HTML3 += sug2;
}

var BB = "";

logo.innerHTML = "<div align='center'>" + HTML3 + "<br></div>";

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