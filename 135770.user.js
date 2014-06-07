// ==UserScript==
// @name          lol_emo_lite_miss_bone
// @namespace   http://userscripts.org/scripts/show/135770
// @include        http://*lol*.com/forums.php?*
// @include        http://*lol*.com/markets.php?*
// @source         http://userscripts.org/scripts/show/135770
// @identifier     http://userscripts.org/scripts/source/135770.user.js
// @version       1.1
// @date           2012-06-15
// ==/UserScript==
// change from reply_emo
// edit by SpyBitX v1.1 , 15-06-2012
// remove on comment and pm page , unuseable , site not support


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
      }
}

var logo = document.createElement("div");
var HTML = "";
var smileyarr = new Array();

smileyarr["1"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/00.gif";
smileyarr["2"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/01.gif";
smileyarr["3"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/02.gif";
smileyarr["4"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/03.gif";
smileyarr["5"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/04.gif";
smileyarr["6"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/05.gif";
smileyarr["7"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/06.gif";
smileyarr["8"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/07.gif";
smileyarr["9"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/08.gif";
smileyarr["10"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/09.gif";
smileyarr["11"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/10.gif";
smileyarr["12"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/11.gif";
smileyarr["13"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/12.gif";
smileyarr["14"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/13.gif";
smileyarr["15"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/14.gif";
smileyarr["16"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/15.gif";
smileyarr["17"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/16.gif";
smileyarr["18"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/17.gif";
smileyarr["19"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/18.gif";
smileyarr["20"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/19.gif";
smileyarr["21"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/20.gif";
smileyarr["22"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/21.gif";
smileyarr["23"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/22.gif";
smileyarr["24"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/23.gif";
smileyarr["25"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/24.gif";
smileyarr["26"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/25.gif";
smileyarr["27"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/26.gif";
smileyarr["28"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/27.gif";
smileyarr["29"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/28.gif";
smileyarr["30"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/29.gif";
smileyarr["31"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/30.gif";
smileyarr["32"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/31.gif";
smileyarr["33"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/32.gif";
smileyarr["34"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/33.gif";
smileyarr["35"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/34.gif";
smileyarr["36"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/35.gif";
smileyarr["37"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/36.gif";
smileyarr["38"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/37.gif";
smileyarr["39"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/38.gif";
smileyarr["40"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/39.gif";
smileyarr["41"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/40.gif";
smileyarr["42"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/41.gif";
smileyarr["43"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/42.gif";
smileyarr["44"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/43.gif";
smileyarr["45"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/44.gif";
smileyarr["46"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/45.gif";
smileyarr["47"]="http://rpongsapich.brinkster.net/ltph/emo/miss-bone/46.gif";

for (var i=1; i < smileyarr.length ; i++) {

    var suggest = "<img src='" + smileyarr[i] + "' id='[img]"+smileyarr[i]+"[/img]' />";
       if((i) % 10 ==0) suggest += "<br>";

    HTML += suggest;
}

logo.innerHTML = "<div align='center'>" + HTML + "<br></div>";

if(window.location.href.toLowerCase().match("comment.php?")){
	 toolb = document.getElementsByName("text")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}else if(window.location.href.toLowerCase().match("forums.php?") || window.location.href.toLowerCase().match("markets.php?")){
     toolb = document.getElementsByName("body")[0]
     toolb.parentNode.insertBefore(logo,toolb);
}

for (var i=1; i < smileyarr.length ; i++) {
    document.getElementById('[img]'+smileyarr[i]+'[/img]').addEventListener("click", setsmile, true);   
}

