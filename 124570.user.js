// ==UserScript==
// @name           lol_emo_lite_emeekinhuaBy_Rockument_001
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
var poo = eval("[['[img]https://lh5.googleusercontent.com/-n9GJ7OvgFsQ/Tyel5LMZ5_I/AAAAAAAABGo/vu9ofu9S-cI/s75/14-40-18_0.24332.jpg[/img]','https://lh4.googleusercontent.com/-ImONHCDWjTs/TyelxbaPbaI/AAAAAAAABF4/d7qghP7W75c/s50/14-40-18_0.24332.jpg'],['[img]https://lh3.googleusercontent.com/-l_PoX_Jo_wE/Tyel5ADPYJI/AAAAAAAABGs/gG_PqL2gzZs/s75/14-40-18_0.244273.jpg[/img]','https://lh5.googleusercontent.com/-OpLwMy16mjk/TyelxfZsJxI/AAAAAAAABF0/QHZG8nt5Ke8/s50/14-40-18_0.244273.jpg'],['[img]https://lh5.googleusercontent.com/-_aS4SUFCHfo/Tyel5EKJMiI/AAAAAAAABGw/Jz-SZGEXzCk/s94/14-40-18_0.245348.jpg[/img]','https://lh5.googleusercontent.com/-ZpUrXHNQ3Mk/TyelxW1sPdI/AAAAAAAABGA/3W3UVOWEpcY/s50/14-40-18_0.245348.jpg'],['[img]https://lh6.googleusercontent.com/-ziJDK38GRdo/Tyel5njYRZI/AAAAAAAABG0/u6LTeK-2xkg/s109/14-43-24_0.190322.jpg[/img]','https://lh5.googleusercontent.com/-PmXTAP-odCY/TyelyHNlLKI/AAAAAAAABF8/LfF6pKW1iVQ/s50/14-43-24_0.190322.jpg'],['[img]https://lh3.googleusercontent.com/-nbiC5pgd3JM/Tyel6EXTc3I/AAAAAAAABHI/nZuR6hQWgr8/s118/14-43-24_0.191273.jpg[/img]','https://lh3.googleusercontent.com/-RFWnqnwoeSY/Tyelyf4i1FI/AAAAAAAABGM/vb8VhVtAmzI/s50/14-43-24_0.191273.jpg'],['[img]https://lh6.googleusercontent.com/-knF8_5EWmeg/Tynouj-eEyI/AAAAAAAABNM/ChGMXRC1tu4/s75/14-40-18_0.244877.jpg[/img]','https://lh5.googleusercontent.com/-8I--JOe7-xs/Tyno-IdjHCI/AAAAAAAABNc/b-wyTYuWsdI/s50/14-40-18_0.244877.png'],['[img]https://lh5.googleusercontent.com/-dWyPwmhj-co/TynouqaV2YI/AAAAAAAABNI/aStqb5S2OCw/s109/14-40-18_0.243906.jpg[/img]','https://lh3.googleusercontent.com/-Do-n5Fs1afw/Tyno-IU5NzI/AAAAAAAABNY/ajJ1k7GB5Qk/s50/14-40-18_0.243906.png']]");
var HTML3 = "";
for (var i=0; i < poo.length ; i++) {

    var sug2 = "<img src='"+poo[i][1]+"' id='"+poo[i][0]+"' />";
   
    if((i+1) % 12==0) sug2 += "<br>";
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