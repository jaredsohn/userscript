// ==UserScript==
// @name           Denshi Jisho "Common words only" checker
// @namespace      http://www.jisho.org
// @description		 Checks the "Common words only" checkbox by default, and also it removes the "kana to romaji" checkbox.
// @include        *jisho.org/words*
// ==/UserScript==
//

var checkBox = document.getElementById("common_check");

if (checkBox)
{
	checkBox.checked = true ;
}

var checkBoxTwo = document.getElementById("romaji_check");

if (checkBoxTwo)
{
	var temp = checkBoxTwo.parentNode;
	temp.removeChild(checkBoxTwo);
	temp.parentNode.removeChild(temp);
}
