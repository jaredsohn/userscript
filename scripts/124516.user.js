// ==UserScript==
// @name           lol_emo_lite_eBy_Rockument_0691
// @namespace      http://www.userscripts.org/
// @include        http://*lol*.com/forums.php?*
// @include        http://*lol*.com/comment.php?*
// @include        http://*lol*.com/markets.php?*
// @include        http://*lol*.com/sendmessage.php?*
// ==/UserScript==
// change from reply_emo
// edit by SpyBitX v1.2
// edit by iBuffalo v1.3
// edit by Rockument v0.69.1

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
var poo = eval("[['[img]http://www.ragemaker.net/images/thumbs/13.png[/img]','https://lh4.googleusercontent.com/-hK1b0ZcfgT8/TyZ6f5TCaBI/AAAAAAAAA4w/0zGrrUZFa6s/s50/13.png'],['[img]http://www.ragemaker.net/images/thumbs/09.png[/img]','https://lh5.googleusercontent.com/-JWRtGBwbyzg/TyZ6f33bviI/AAAAAAAAA44/uOxbsbvpWSM/s50/09.png'],['[img]http://www.ragemaker.net/images/thumbs/27.png[/img]','https://lh6.googleusercontent.com/-PgeQtvdE8D8/TyZ6gngtkfI/AAAAAAAAA48/bIZrCu2jD3E/s50/27.png'],['[img]http://www.ragemaker.net/images/thumbs/34.png[/img]','https://lh4.googleusercontent.com/-2HHU3o1EZO4/TyZ6gw0uP9I/AAAAAAAAA5E/1z8UC3UPnvc/s50/34.png'],['[img]http://www.ragemaker.net/images/thumbs/14.png[/img]','https://lh6.googleusercontent.com/-TNRIpi8wKDk/TyZ6f_ds86I/AAAAAAAAA40/ahKGNMTnrak/s50/14.png'],['[img]http://www.ragemaker.net/images/thumbs/GaspHand.png[/img]','https://lh4.googleusercontent.com/-M6PF8p8CkQY/TyZ6h4XmqHI/AAAAAAAAA5Y/GJdyFiSbHYE/s50/GaspHand.png'],['[img]http://www.ragemaker.net/images/thumbs/notbadobama.png[/img]','https://lh5.googleusercontent.com/-PcMj-6QaxZI/TyZ6h3cvt6I/AAAAAAAAA5s/9lgd4y5It_s/s50/notbadobama.png'],['[img]http://www.ragemaker.net/images/thumbs/32.png[/img]','https://lh4.googleusercontent.com/-fV5BGjfP2gc/TyZ6gm1PXuI/AAAAAAAAA5I/uM9VbCnkYow/s50/32.png'],['[img]http://www.ragemaker.net/images/thumbs/yuno.png[/img]','https://lh3.googleusercontent.com/-aBHMW_Flcvs/TyZ6i5DBRRI/AAAAAAAAA6E/cgZUKBDRJiQ/s50/yuno.png'],['[img]http://www.ragemaker.net/images/thumbs/rage%20extreme.png[/img]','https://lh6.googleusercontent.com/-sC1waY11RyM/TyZ6iYDSATI/AAAAAAAAA5k/KejSiv_kiGk/s50/rage%2520extreme.png'],['[img]http://www.ragemaker.net/images/thumbs/AreYouKiddingMe.png[/img]','https://lh6.googleusercontent.com/-NIT9N4Fmlmw/TyZ6hEMzImI/AAAAAAAAA5M/tKZhfmnt7r0/s50/AreYouKiddingMe.png'],['[img]http://www.ragemaker.net/images/thumbs/freddiesoclose.png[/img]','https://lh6.googleusercontent.com/-zzH1fojbsY8/TyZ6hiVVudI/AAAAAAAAA5U/tVupiSMY0aU/s50/freddiesoclose.png'],['[img]http://www.ragemaker.net/images/thumbs/poker%20face%20thick.png[/img]','https://lh3.googleusercontent.com/--4FV_-b-Bww/TyZ6iGtQRmI/AAAAAAAAA58/nRhQs5DW3NI/s50/poker%2520face%2520thick.png']]");
var HTML3 = "";
for (var i=0; i < poo.length ; i++) {

    var sug2 = "<img src='"+poo[i][1]+"' id='"+poo[i][0]+"' />";
   
    if((i+1) % 13 ==0) sug2 += "<br>";
    HTML3 += sug2;
}

var BB = "";

logo.innerHTML = "<div align='center'>" + HTML3 + "</div>";

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