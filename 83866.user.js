// ==UserScript==
// @name           Neopets : Games : Eliv Thade Helper
// @namespace      http://www.darkztar.com/
// @database       NeoCodex
// @include        http://www.neopets.com/games/play.phtml?game_id=230*
// ==/UserScript==
	function getBetween(v13, v14, v15, v16) {
	var v17 = v13.indexOf(v14, (v16 === undefined ? 0 : v16));
	var v18 = v13.indexOf(v15, v17);
	return v18 > v17 && v17 > -1 ? v13.substring(v17 + v14.length, v18) : "";
};
var layout = "<div class='rcModuleHeader'>\
<div class='rcModuleTopLeft'></div>\
<div class='rcModuleTopRight'></div>\
<div class='rcModuleHeaderBg'></div>\
<div class='rcModuleHeaderOuter'><div class='rcModuleHeaderContent'>Eliv Thade Helper</div></div></div>\
<div class='rcModuleContentOuter'>\
<div class='rcModuleContent'>\
<div class='rcModuleContentInner'>\
<div style='text-align:center;padding:5px;'>\
Need help solving an anagram? Post the scrambled words here and press solve.\
<br><br><input type='text' id='scrambledText' value=''>\
<br><input type='button' id='solveButton' value='Solve!' />\
<br><br><div id='answerBox' style='display:none;border:1px solid grey;background-color:#DEDEDE;padding:5px;'></div></div>\
</div></div></div>\
<div class='rcModuleBottom'>\
<div class='rcModuleBottomLeft'></div>\
<div class='rcModuleBottomRight'></div>\
</div>";
document.getElementsByClassName('rcModuleWrapper gamesRoomLiteModule youMayAlsoLike')[0].innerHTML = layout;

document.getElementById('solveButton').addEventListener('click', solvePuzzle, false);

function solvePuzzle()
	{
	var castlephrase = document.getElementById('scrambledText').value;
GM_xmlhttpRequest({
  method: "POST",
  url: "http://www.neocodex.us/forum/index.php?app=neologs&module=neodictionary",
  data: "castlephrase="+castlephrase+"&submit=Solve&k=880ea6a14ea49e853634fbdc5015a024&settingNewSkin=1",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  onload: function(response) {

			var result = getBetween(response.responseText, '</u></i></b></a></span>', '</div>');
			document.getElementById('answerBox').innerHTML = result;
			document.getElementById('answerBox').style.display = "";
  return;
  }
});
	}
