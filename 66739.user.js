// ==UserScript==
// @name           Neopets : Quick View
// @namespace      http://www.gamingire.com/
// @author         Backslash
// @include        http://www.neopets.com/neoboards/boardlist.phtml*
// @require        http://userscripts.org/scripts/source/54389.user.js
// @require        http://userscripts.org/scripts/source/54987.user.js
// ==/UserScript==
    function GBA(sMain, sStart, sFinish) {
        var sSplit = sMain.split(sStart);
        var out = new Array(sSplit.length);
        for (i=1;i<sSplit.length;i++) {
            var temp = sSplit[i].split(sFinish);
            out[i-1] = temp[0];
        }
        return out;
    }
	
		function getBetween(target_str, start_str, end_str, start_pos, include_str) {
	if (!start_pos) 0;
	if (!include_str) false;

	var result_str = target_str.substr(start_pos);
	result_str = result_str.substr(result_str.indexOf(start_str) + start_str.length);
	result_str = result_str.substr(0, result_str.indexOf(end_str));

	if (include_str == true) {
		result_str = start_str + result_str + end_str
	}

	return result_str;
}

function removeEmptyElem(ary) {
    for (var i=ary.length;i>=0;i--) {
        if (ary[i] == undefined)  {
            ary.splice(i, 1);
        }       
    }
    return ary;
}
   
var theTable = getBetween(document.body.innerHTML, 'Anyone found to be breaking our', 'Pages: ');
var threads = GBA(theTable, '<td class="blistSmall"', '</td>');
threads = threads.join('\n');
var links = GBA(threads, '<a href="topic.phtml?', '" class="blistTopic">');
removeEmptyElem(links);
document.body.innerHTML = document.body.innerHTML.replace(/<a href="\/randomfriend.phtml?/g, '<quickview></quickview> | <a href="/randomfriend.phtml');

var e = document.getElementsByTagName('quickview');
var cNumber = 0;
for (a=0;a<e.length;a++)
{
quickView = '<a style="cursor: pointer;" id="topic_'+cNumber+'">Quick View</a>';
e[a].innerHTML = quickView;
cNumber = cNumber * 1 + 1;
}

document.getElementById('topic_0').addEventListener('click', function(){getFirstPost(links[0]);}, false);
document.getElementById('topic_1').addEventListener('click', function(){getFirstPost(links[1]);}, false);
document.getElementById('topic_2').addEventListener('click', function(){getFirstPost(links[2]);}, false);
document.getElementById('topic_3').addEventListener('click', function(){getFirstPost(links[3]);}, false);
document.getElementById('topic_4').addEventListener('click', function(){getFirstPost(links[4]);}, false);
document.getElementById('topic_5').addEventListener('click', function(){getFirstPost(links[5]);}, false);
document.getElementById('topic_6').addEventListener('click', function(){getFirstPost(links[6]);}, false);
document.getElementById('topic_7').addEventListener('click', function(){getFirstPost(links[7]);}, false);
document.getElementById('topic_8').addEventListener('click', function(){getFirstPost(links[8]);}, false);
document.getElementById('topic_9').addEventListener('click', function(){getFirstPost(links[9]);}, false);
document.getElementById('topic_10').addEventListener('click', function(){getFirstPost(links[10]);}, false);
document.getElementById('topic_11').addEventListener('click', function(){getFirstPost(links[11]);}, false);
document.getElementById('topic_12').addEventListener('click', function(){getFirstPost(links[12]);}, false);
document.getElementById('topic_13').addEventListener('click', function(){getFirstPost(links[13]);}, false);
document.getElementById('topic_14').addEventListener('click', function(){getFirstPost(links[14]);}, false);
document.getElementById('topic_15').addEventListener('click', function(){getFirstPost(links[15]);}, false);
document.getElementById('topic_16').addEventListener('click', function(){getFirstPost(links[16]);}, false);
document.getElementById('topic_17').addEventListener('click', function(){getFirstPost(links[17]);}, false);
document.getElementById('topic_18').addEventListener('click', function(){getFirstPost(links[18]);}, false);
document.getElementById('topic_19').addEventListener('click', function(){getFirstPost(links[19]);}, false);
document.getElementById('topic_20').addEventListener('click', function(){getFirstPost(links[20]);}, false);
document.getElementById('topic_21').addEventListener('click', function(){getFirstPost(links[21]);}, false);
document.getElementById('topic_22').addEventListener('click', function(){getFirstPost(links[22]);}, false);
document.getElementById('topic_23').addEventListener('click', function(){getFirstPost(links[23]);}, false);
document.getElementById('topic_24').addEventListener('click', function(){getFirstPost(links[24]);}, false);
document.getElementById('topic_25').addEventListener('click', function(){getFirstPost(links[25]);}, false);
document.getElementById('topic_26').addEventListener('click', function(){getFirstPost(links[26]);}, false);
document.getElementById('topic_27').addEventListener('click', function(){getFirstPost(links[27]);}, false);
document.getElementById('topic_28').addEventListener('click', function(){getFirstPost(links[28]);}, false);
document.getElementById('topic_29').addEventListener('click', function(){getFirstPost(links[29]);}, false);
document.getElementById('topic_30').addEventListener('click', function(){getFirstPost(links[30]);}, false);
document.getElementById('topic_31').addEventListener('click', function(){getFirstPost(links[31]);}, false);
document.getElementById('topic_32').addEventListener('click', function(){getFirstPost(links[32]);}, false);
document.getElementById('topic_33').addEventListener('click', function(){getFirstPost(links[33]);}, false);
document.getElementById('topic_34').addEventListener('click', function(){getFirstPost(links[34]);}, false);
document.getElementById('topic_35').addEventListener('click', function(){getFirstPost(links[35]);}, false);
document.getElementById('topic_36').addEventListener('click', function(){getFirstPost(links[36]);}, false);
document.getElementById('topic_37').addEventListener('click', function(){getFirstPost(links[37]);}, false);
document.getElementById('topic_38').addEventListener('click', function(){getFirstPost(links[38]);}, false);
document.getElementById('topic_39').addEventListener('click', function(){getFirstPost(links[39]);}, false);

function getFirstPost(lol)
{
GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.neopets.com/neoboards/topic.phtml?"+lol,
  onload: function(response) {
   var narrowed = getBetween(response.responseText, '<td height="*" valign="top" class="topic"><br>', '</td>');
     WinConfig.loadDefaultCss();
WinConfig.init({
	"type":"question",
	"title":"NeoBoards - Quick View",
	"size":["500px",0],
	"description":narrowed+"<hr>Do you want to go to the thread?",
	"positiveCallback":function(w,e)
	{
	w.FadeOut();
		location.href = "http://www.neopets.com/neoboards/topic.phtml?"+lol;
	},
		"negativeCallback":function(w,e)
	{
	w.FadeOut();
	}

}).Open().FadeIn();
  }
});
}














