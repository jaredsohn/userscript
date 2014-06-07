// ==UserScript==
// @name           lol_emo_lite_eLINEBy_Rockument_002
// @namespace      http://www.userscripts.org/
// @include        http://*lol*.com/forums.php?*
// @include        http://*lol*.com/comment.php?*
// @include        http://*lol*.com/markets.php?*
// @include        http://*lol*.com/sendmessage.php?*
// ==/UserScript==
// change from reply_emo
// edit by SpyBitX v1.2
// edit by iBuffalo v1.3
// edit by Rockument v0.0.2

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
var poo = eval("[['[img]https://lh3.googleusercontent.com/-cQUNbbLfYbk/TyninBI198I/AAAAAAAABHk/a2F6oujFkTc/s100/3.png[/img]','https://lh3.googleusercontent.com/-JRRenIuZTHs/TyaFv5FdghI/AAAAAAAAA6s/K1YcEZKcZfk/s50/3.gif'],['[img]https://lh4.googleusercontent.com/-GoHGdFA1-Do/TyninJXOT2I/AAAAAAAABHg/PP-dovskfrU/s100/4.png[/img]','https://lh6.googleusercontent.com/-LSQmzD4F7QM/TyaFv0g0rLI/AAAAAAAAA6w/7gS_0TFA9vs/s50/4.gif'],['[img]https://lh5.googleusercontent.com/-pg-S7z9YDro/TyninLrbS5I/AAAAAAAABHc/36UVEWv5v14/s100/5.png[/img]','https://lh3.googleusercontent.com/-_XsvHNvnzTI/TyaFv-Jxn6I/AAAAAAAAA6o/DTiE1JuGhZ8/s50/5.gif'],['[img]https://lh6.googleusercontent.com/-poAgCwovPFk/TyninwthfzI/AAAAAAAABHw/0apn_IIbIJw/s100/6.png[/img]','https://lh3.googleusercontent.com/-P9ZGTeCvZ-M/TyaFyPuoUgI/AAAAAAAAA7M/m2Lx4LCE_mQ/s50/6.gif'],['[img]https://lh3.googleusercontent.com/-Q3ftGS2XiIU/Tynin9vOuGI/AAAAAAAABHo/I8reX1HEi3o/s100/7.png[/img]','https://lh3.googleusercontent.com/-bVnnwcp4a_k/TyaFwonmDTI/AAAAAAAAA60/3N6gnTEEtT4/s50/7.gif'],['[img]https://lh5.googleusercontent.com/-P0qmDsUHKvI/TynioUbOSqI/AAAAAAAABH0/Ocd0-t0m3bY/s100/8.png[/img]','https://lh4.googleusercontent.com/-Qi9vDk3E8T4/TyaFzTgE06I/AAAAAAAAA70/QDeMOfHUtrk/s50/8.gif'],['[img]https://lh4.googleusercontent.com/-VMdGncOYROg/TyniolXc69I/AAAAAAAABH4/tPB6koVaZDE/s100/9.png[/img]','https://lh4.googleusercontent.com/-VEXT6LXkEyQ/TyaFwyXi6rI/AAAAAAAAA7A/ila4G4xtm78/s50/9.gif'],['[img]https://lh6.googleusercontent.com/-rsmGBy6gmWE/TynipLvoLWI/AAAAAAAABIA/Nenemob51jk/s100/10.png[/img]','https://lh6.googleusercontent.com/-sC_H7ZNICH4/TyaFxuiF4HI/AAAAAAAAA7I/rMMKi4k7E28/s50/10.gif'],['[img]https://lh4.googleusercontent.com/-TGBLV_pkyPQ/TynirV7RD-I/AAAAAAAABIg/N5wZ6kxjG8o/s100/13.png[/img]','https://lh4.googleusercontent.com/-ZOdt68xMt6s/TyaFyJRFdZI/AAAAAAAAA7c/HSuUyoEJTDM/s50/13.gif'],['[img]https://lh4.googleusercontent.com/-1pB0v1ZNBws/TynipQwN7iI/AAAAAAAABIU/GZdpF_OZclQ/s100/14.png[/img]','https://lh4.googleusercontent.com/-CwnGoE7WfSg/TyaFyv432BI/AAAAAAAAA7U/J67vMjxKnDs/s50/14.gif'],['[img]https://lh5.googleusercontent.com/-nkIV4kXYxZY/Tynis-68N3I/AAAAAAAABJA/Tin3lGVZOB8/s100/15.png[/img]','https://lh3.googleusercontent.com/-qSqhd94KwKo/TyaFzYkPZpI/AAAAAAAAA7g/YXaAsMxsAJk/s50/15.gif'],['[img]https://lh5.googleusercontent.com/-7nwa2wfFAGw/TynirMtvr-I/AAAAAAAABIc/BbEFKD6PQKM/s100/16.png[/img]','https://lh4.googleusercontent.com/-sEC028RWo1k/TyaFzubLFZI/AAAAAAAAA7o/vsEtQ8nZ994/s50/16.gif'],['[img]https://lh6.googleusercontent.com/--06bmut7BJ0/Tynir6Wt8aI/AAAAAAAABIk/w0CgSq9JLSA/s100/17.png[/img]','https://lh3.googleusercontent.com/-KYWph83Bzlg/TyaF0DlM1_I/AAAAAAAAA7s/KapEFYfHe_U/s50/17.gif'],['[img]https://lh6.googleusercontent.com/-qe98gKaqhKE/TynisUI3QlI/AAAAAAAABIw/loiyYu_BM_o/s100/21.png[/img]','https://lh3.googleusercontent.com/-5FoUz9ZSDso/TyaF6cEzpTI/AAAAAAAAA80/VF69WcteCCs/s50/21.gif'],['[img]https://lh5.googleusercontent.com/-dnd7lb-Z47U/Tynispbd7iI/AAAAAAAABI8/mqXQ5FR3yr0/s100/23.png[/img]','https://lh5.googleusercontent.com/-g_yHirwuNrI/TyaF09qHGvI/AAAAAAAAA74/bABkaH1s8p0/s50/23.gif'],['[img]https://lh5.googleusercontent.com/-9rHpsrqk5do/TynitAv_D1I/AAAAAAAABI4/tYspwiDGfoI/s100/24.png[/img]','https://lh5.googleusercontent.com/-gOXHFZF0rxs/TyaF1bSdxLI/AAAAAAAAA8E/rs2KW0BKxtU/s50/24.gif'],['[img]https://lh4.googleusercontent.com/-pK8ASF7pPr0/Tynit8pzf-I/AAAAAAAABJI/NLAwF4LXK58/s100/25.png[/img]','https://lh6.googleusercontent.com/-7F1uwYxj5oY/TyaF3hgNkfI/AAAAAAAAA8c/-vxXVAJilDM/s50/25.gif'],['[img]https://lh3.googleusercontent.com/-eyvFcbPFwKU/Tynit8aSU8I/AAAAAAAABJU/Qx3j4P659sU/s100/33.png[/img]','https://lh3.googleusercontent.com/-G7v3yCDjiN4/TyaF2VzflbI/AAAAAAAAA8I/6Zbrxj7vQyM/s50/33.gif'],['[img]https://lh5.googleusercontent.com/-OsEdxHf3k9A/Tynit3ew4oI/AAAAAAAABJM/oINNvBZ6_xQ/s100/39.png[/img]','https://lh6.googleusercontent.com/-31n-ioeV-YE/TyaF5PMHNtI/AAAAAAAAA8k/61WLCYKnhIc/s50/39.gif'],['[img]https://lh5.googleusercontent.com/-CO733eCAwVE/Tyniw8JgMMI/AAAAAAAABJ4/FcyE6h1dOyE/s100/100.png[/img]','https://lh4.googleusercontent.com/-r_SG3I674F0/TyaF5A9JxhI/AAAAAAAAA9A/4MAw9HibCTA/s50/100.gif'],['[img]https://lh4.googleusercontent.com/-j5uzpyUZ7hc/Tyniw4570qI/AAAAAAAABJ0/jb1BmKs05PU/s100/102.png[/img]','https://lh5.googleusercontent.com/-D0YqqyGlmwU/TyaF5pOMOhI/AAAAAAAAA8s/Tb4aALJuL5o/s50/102.gif'],['[img]https://lh4.googleusercontent.com/-r4w72Lmysxk/TynivPjeclI/AAAAAAAABJg/rifKNRgoYDs/s100/104.png[/img]','https://lh5.googleusercontent.com/-KnodaIB9a50/TyaF555nJmI/AAAAAAAAA8w/Pku3zgsh_5A/s50/104.gif'],['[img]https://lh3.googleusercontent.com/-oINR3X1XQqY/Tyniv89uAfI/AAAAAAAABJo/VKi6qtItFWM/s100/105.png[/img]','https://lh3.googleusercontent.com/-SXarAG7BpYc/TyaF6tr-6CI/AAAAAAAAA88/FzEZ6LXAQpM/s50/105.gif'],['[img]https://lh3.googleusercontent.com/-bmYyFOUylQQ/Tyniwufr23I/AAAAAAAABJ8/pq_2fEp_2IU/s100/106.png[/img]','https://lh6.googleusercontent.com/-lG2CNRSldFE/TyaF66fwavI/AAAAAAAAA9M/KdKcztTH9eQ/s50/106.gif'],['[img]https://lh6.googleusercontent.com/-q_XUc2bY3BQ/TynixqXeZaI/AAAAAAAABKQ/g_qNYmYBqT4/s100/109.png[/img]','https://lh4.googleusercontent.com/-8yrT3T5L6bo/TyaF7ZkA4_I/AAAAAAAAA9I/Q0JD9oDEfEs/s50/109.gif'],['[img]https://lh6.googleusercontent.com/-a6g1qFnLITg/Tynixo8yO9I/AAAAAAAABKA/MZ3O_gxYFQQ/s100/110.png[/img]','https://lh4.googleusercontent.com/-kgVsfg6grok/TyaF9RGEvWI/AAAAAAAAA9o/mxdBmR7deBQ/s50/110.gif'],['[img]https://lh4.googleusercontent.com/--H2m7LBT2g0/Tyniz-MXGfI/AAAAAAAABKo/QoaGeBJ2Sp0/s100/111.png[/img]','https://lh6.googleusercontent.com/-mWKbJ8FileM/TyaF71w8mSI/AAAAAAAAA9U/_xqFere4geg/s50/111.gif'],['[img]https://lh5.googleusercontent.com/-EH0C6ZAkF9o/Tyni0SvWXAI/AAAAAAAABKg/aRtbZWNhMKM/s100/112.png[/img]','https://lh4.googleusercontent.com/-mo6bve9pWow/TyaF7_DqkvI/AAAAAAAAA9Y/wb2wFICL3-E/s50/112.gif'],['[img]https://lh3.googleusercontent.com/-k6Ll0MFd5w0/TynizTdMnqI/AAAAAAAABKk/SO97JrjWu6c/s100/113.png[/img]','https://lh6.googleusercontent.com/-42gQLJk8CJc/TyaF_B3_u7I/AAAAAAAAA-Q/Lyvo7cGfN1M/s50/113.gif'],['[img]https://lh6.googleusercontent.com/-ic2krYHaqlM/Tyni1PdA2fI/AAAAAAAABKw/8C-c-QtjiKo/s100/114.png[/img]','https://lh6.googleusercontent.com/-59IOtHrUnJA/TyaF8miZQdI/AAAAAAAAA9s/YdLTjOlQK5o/s50/114.gif'],['[img]https://lh5.googleusercontent.com/-5HI6Xbxzj4M/Tyni19vE5hI/AAAAAAAABK0/UlFZ-viujNE/s100/118.png[/img]','https://lh6.googleusercontent.com/-K9-11HOhLWo/TyaF-qa9VdI/AAAAAAAAA9w/pzk7CcczuVg/s50/118.gif'],['[img]https://lh5.googleusercontent.com/-QGJ06K_6gd4/Tyni4FRLwPI/AAAAAAAABLU/HkdTvANf-9o/s100/163.png[/img]','https://lh3.googleusercontent.com/--PRQikiCDRQ/TyaF_GOADzI/AAAAAAAAA94/mmBIrI_FEKU/s50/163.gif'],['[img]https://lh5.googleusercontent.com/-0nqiJpcWJyg/Tyni2QXOFBI/AAAAAAAABLI/rsQmQP1OXZU/s100/165.png[/img]','https://lh3.googleusercontent.com/-OvYDClx573Q/TyaGBV1n6EI/AAAAAAAAA-U/bgzwFAWmR9E/s50/165.gif'],['[img]https://lh3.googleusercontent.com/--f5cYzgrQmk/Tyni2qdTzuI/AAAAAAAABK4/_RuOwUzLN2Q/s100/168.png[/img]','https://lh6.googleusercontent.com/-fQP-VGrv-iE/TyaF_ogZTtI/AAAAAAAAA-A/hqbTW2endrc/s50/168.gif'],['[img]https://lh5.googleusercontent.com/-BzLyNfBpAdo/Tyni3LpD2dI/AAAAAAAABLM/oG6ujhkQ9-I/s100/170.png[/img]','https://lh6.googleusercontent.com/-EsxknMwt6GE/TyaGGSDa7SI/AAAAAAAAA_U/XBBleXFLR6c/s50/170.gif'],['[img]https://lh4.googleusercontent.com/-6R8UuzWTWQE/Tyni4WW1wjI/AAAAAAAABLo/K0ujxUeKd2Q/s100/171.png[/img]','https://lh6.googleusercontent.com/-zj97S29MZQs/TyaGBZN6q4I/AAAAAAAAA-Y/DUlclRKNXlo/s50/171.gif'],['[img]https://lh3.googleusercontent.com/-B6ZREk_Cowg/Tyni4qWzjpI/AAAAAAAABLc/ovl_0rGiWGI/s100/172.png[/img]','https://lh6.googleusercontent.com/-c50_giO4Owg/TyaGB2N86vI/AAAAAAAAA-c/SEzXBv-g_Os/s50/172.gif'],['[img]https://lh5.googleusercontent.com/-rbUoCOefXAA/Tyni5AgHmdI/AAAAAAAABL0/G2NCalYOiho/s100/173.png[/img]','https://lh3.googleusercontent.com/-b4d7l42cs7o/TyaGCXcPR-I/AAAAAAAAA-w/sfDUYlKcGWY/s50/173.gif'],['[img]https://lh6.googleusercontent.com/-sb3qYFKvDsA/Tyni5Tg3E5I/AAAAAAAABLg/Dc26IEOTYwE/s100/174.png[/img]','https://lh3.googleusercontent.com/-Ji01MpJQ3Rc/TyaGCSCPFXI/AAAAAAAAA-k/3mNVGWqxU1w/s50/174.gif'],['[img]https://lh6.googleusercontent.com/-0H6QT81G1f4/Tyni51bdOgI/AAAAAAAABLs/BBKvV_XqahE/s100/175.png[/img]','https://lh6.googleusercontent.com/-UcXvoPRzDdo/TyaGDE_DEbI/AAAAAAAAA-0/Wxv44LtYO-E/s50/175.gif'],['[img]https://lh4.googleusercontent.com/-1WpgFzWdtjs/Tyni_Ic-QQI/AAAAAAAABMY/pAxIBT2PpM4/s100/176.png[/img]','https://lh6.googleusercontent.com/-nv72D8vt518/TyaGD3NscOI/AAAAAAAAA_E/WlK1D2WyzNk/s50/176.gif'],['[img]https://lh5.googleusercontent.com/-UqxpoIog6bk/Tyni6eFS5dI/AAAAAAAABL8/yc4csr-1_-A/s100/177.png[/img]','https://lh4.googleusercontent.com/-HYRzBe7-0Vc/TyaGETSUJCI/AAAAAAAAA_A/4KESJELf9EY/s50/177.gif'],['[img]https://lh6.googleusercontent.com/-rqXjn42uq0Q/Tyni6lZ-XgI/AAAAAAAABMA/iwng3ktLoLc/s100/179.png[/img]','https://lh3.googleusercontent.com/-tRFjmayCwS4/TyaGHfbf-cI/AAAAAAAAA_Q/5k9ve0w4Nfs/s50/179.gif']]");
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