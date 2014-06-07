// Shuffle Blockbuster Queue
// version 4
// 2008-09-04
// Copyright 2005-2008 Jason Diamond
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install and use it, you need to be
// using Firefox with the Greasemonkey extension.
//
// This script adds a "Shuffle Queue" button next to the "Update Queue" buttons
// to the pages on Blockbuster.com that display your queue.  Clicking "Shuffle
// Queue" will randomly rearrange the numbers in the order column.  You still
// have to click "Update Queue" to save the changes.

// If you click on any of the other buttons inside of the table listing your
// movies or drag a movie, the "Shuffle Queue" button will disappear.  You can
// just refresh the page to get the button back.  I'm sure this can be fixed,
// but I don't feel like figuring it out tonight.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Shuffle Blockbuster Queue
// @namespace     http://jason.diamond.name/userscripts
// @description   shuffles movies in your Blockbuster queue
// @include       *.blockbuster.com/online/queuemgmt/displayMyQueue
// @include       *.blockbuster.com/online/queuemgmt/manageFullQueue
// @include       *.blockbuster.com/browse/queuemgmt/fullQueue 
// ==/UserScript==

function clickListener(e) {
	var inputs = document.evaluate('//input[@class="bvr-pos"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nums = [];
	for (var i = 0; i < inputs.snapshotLength; ++i) {
		var input = inputs.snapshotItem(i);
		nums.push(input.value);
	}
	for (var i = 0; i < inputs.snapshotLength; ++i) {
		var input = inputs.snapshotItem(i);
		var n = Math.floor(Math.random() * nums.length)
		input.value = nums[n];
		nums.splice(n, 1);
	}
	e.preventDefault();
}

var firstUpdateButtonResult = document.evaluate('//input[@alt="Update Queue"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
if (firstUpdateButtonResult) {
	var firstUpdateButton = firstUpdateButtonResult.singleNodeValue;
	if (firstUpdateButton) {
		var space = document.createTextNode(' ');
		firstUpdateButton.parentNode.insertBefore(space, firstUpdateButton);
		var shuffleButton = document.createElement('input');
		shuffleButton.type = 'image';
		shuffleButton.src = "data:image/gif,GIF89a%60%00%14%00%F7%00%00%05%106%05%107%07%15%40%07%15A%08%18E%08%18F%08%19H%09%1AJ%09%1AL%0A%1BM%0A%1CN%0A%1CO%0B%1ER%16%1F%40%16%1FA%0C!W%0C!X%0C%22Y%0D%24%5C%0E%25%5D%0E%25%5E%0F%26_%17%22H%18!A%0F'%60%0F'a%0F(d%10(e%10*f%11*i%11%2Ci%12-k%12%2Cm%13%2Fr%120o%131q%141v%143u%154w%153z%166%7B%165%7D%178%7D%1D6q%3DCZ*E~bfveiy%18%3A%82%19%3C%84%1A%3D%88%1B%3F%8A%23%3F%80%1CA%8E%1DC%90%1ED%94%1FF%96%1FH%9A%20J%9C!K%9F%2FO%906O%86%3C%5B%9B%22M%A1%22N%A5%23P%A7%24Q%A7%25Q%A9%25S%AB%26T%AB*R%A0*W%AD-X%AB-Y%AE4X%A07%5E%AA%3Ac%B2BZ%8DC%5C%92E_%97Gc%9COf%99Qi%9D%40a%A5Bg%AFHe%A1Jh%A6Kk%ABOk%AALn%AFDl%BBEn%BBNp%B3Kr%BDKr%BETo%A7Ur%AB%5Dt%A4Wt%B0Ww%B4fv%9Di%7D%A8j%7F%ABm%84%B4o%88%BBt%83%A6v%87%AC%7C%85%A1q%86%B6u%86%B0w%89%B0s%88%B8x%8B%B3%7B%91%BEg%86%C5l%8D%CBn%8E%CBq%8D%C2%7C%93%C2%7D%95%C5%82%8F%AF%83%93%B4%84%95%B8%85%97%BB%87%99%BE%9C%9E%A7%94%9B%B2%93%A1%BE%88%9A%C1%89%9C%C5%8A%9E%C8%8A%A0%CB%94%A2%C1%97%A7%C9%98%A9%CC%99%AA%CF%9A%AE%D4%A2%AD%C5%A3%AF%C7%A4%B0%CA%A7%B6%D3%A8%B7%D6%A8%B8%D8%B4%BD%D1%B4%BE%D3%B5%C1%D7%B6%C2%D9%B7%C3%DB%B7%C4%DD%B8%C6%E1%C7%CD%DC%C7%CE%DD%C7%CF%DF%D4%D4%D5%D5%D6%D7%C8%D0%E0%C8%D1%E2%C9%D1%E3%C9%D2%E4%CA%D3%E6%CA%D4%E7%CB%D5%E8%DC%E0%E9%DC%E1%EA%DD%E1%EB%DD%E2%EC%DD%E2%ED%DD%E3%EE%DE%E4%EF%DE%E4%F0%DE%E5%F1%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%2C%00%00%00%00%60%00%14%00%00%08%FF%005%F9i%C3%E6%8D%C1%83%08%13*%5C%C8%B0%A1%C3%87%10%1D%B2i%E3G%D3%1A%2Cr%E8%CC%D9%C8%B1%A3%C7%8F%20C%8A%1CI%B2%E4H%3Ar%B0%AC%A1%C1%C4K%97-Zb%CA%9CI%B3%A6%CD%9B8s%EA%DCysK%17%2FLh%A4%18%92%E4H%11%22H%93*%5D%CA%B4%A9%D3%A7P%A3JuZ%E4H%92!)N%00%09%22%24%88%D7%AF%60%83%20%09K%B6%AC%D9%B3h%D3%AA5%DB%15%C8%09%12%3B~%C8%9DK%A5%92*U%88~T%0A5%B7%AF%DF%1Fu%EE%D6%D1%AB*%14%17U%5C%FE%FE%5DbWU%A5%25%8A%23K%9E%2Cw%07%89%109th%DE%0C%0A%D4%98%3Bwtt%DEL%BA%B4%8ET%8E4%DFI%95%C5H%96UYL%9B%EE%3ChP*P%B2s%EB%DE%AD9G%08%107p%08%1F%8E%EA%D0p%1C%9F%3E%D9%A1dG%B8%18A%CE%A1%0B*.F%0C%25T%D0%AF%AC%BA%22%1CM%23AS%8E%E3%FF%B0%83J%89%F3U%CD%05%89%11%AE%BE%FB%F7%F08%DA%C7_%8F%C3%3Bx%F1%C3o%80%E8P%C3%86%FF%FF%93%AC%12%C8%7F%9E%AC2I%80%03%06r%8A%7F%0A%DAP%A0'q%C4q%CA)%93%D8%60%C5*V%D8%C0%C8)%86Lr%0A%18%FF9%B8%E0%7F%14%DAp%CA%80%26%0E%B8a%87%1F%A6%E8%DF%89%1Ar%E8!%88!%FAWC%07%1B%C80%C3%8E%3C%CEP%C8%84_%CC%D0I'%3B%0E9%03%20%A7%EC%88%E4%0CU%ACRE%91D2%E9%A4%0F%AB%9CQ%A4%24%3D%1A%C9%A3%91%A7%00%B2c%97TZ)%24%96%5D~%09H%98W%F6%C8%A3%0C%1Bd%00C%0Cp%C6%09'%0F%9C%98%12%03'%9C%C0%89g%0C%7C%D8%C9%A7%9DP%AC%02%85%9Ey%C6%10(%14%81%9A%A2%A8)%91%C8Y%A7%9C%8C%C6%60%0A%1FpN%9A%E8%A2%8DNZ)%1F%97*%DA%A8%9Cp%C2%90%81%04(%A8%60%EA%A9%A7%9A%B1%CA%13%9Blbj%AB*%EC%FFQ%8A%A9%B2%AA%F0%C4%AA%AF%BAj%EB%AA%B7%86%81*%AAp%AC%22%85%A9R%ACb%86%0A%A5%ECaj%B2%BD%FE%9A%EC%B2%7B4%FB%EB%AF(H%F0%40%09%26d%AB-%24%8B%E8%81%09%26%26%7C%9B%AD%B8Q%ACB%88%1B%A4%90b%82%13%AB81.%B8%EB%AERF%B8%A4%B8%E1%86%1E%DAj%8B%09)z%10B%0A%BC%FB%96%B1%C8*%F8%EEk%2F%BE%F4%0AL0%BD%07%E7%9Bo%09%0F0%20%C2%08%14W%9C%C7%25%A3%3C%D2%C3%08%8A(Bq%C7%14%FFq%C9%25%8A%3C2B%0F%97l%CC%B1%C7%14%3F%F2%C7%08-%3C2r%1E%15W%1C%F3(8%B7%40q%13%23%2Br%89%1A0%CB%7C%09%CD%23%F0L%F2%CFA%CF%5Cs%CD%220%A0%80%07%1FD-%F5%D4TWm%F5%D5X_%BD%82%25%A2X%92H%D6%60%87%FD%81%07%0A%1C%A0%01%07h%A7%AD%F6%DAl%B7%ED%F6%DBp%93%81G%1Ap%D7m7%07%1A%1CP%00%05%15%60_%E0%F7%DF%80%07.%F8%E0%84%17n%F8%E1%88%23%5E%C1%04%04%0C%F0%00%04%11D.%F9%E4%94Wn%F9%E5%98g%AE%F9%E6%9BC%C0%80%05%0D%18%90%C0%02%A4%97n%FA%E9%A8%A7%AE%FA%EA%AC%B7%EE%BA%EB%08%08%F0B%1F%2C8%00%40%00%B8%E7%AE%FB%EE%BC%F7%EE%FB%EF%C0%07%2F%3C%F0%00%5C%E0B%26%01%01%00%3B";
		shuffleButton.addEventListener('click', clickListener, false);
		firstUpdateButton.parentNode.insertBefore(shuffleButton, firstUpdateButton);
		firstUpdateButton.parentNode.insertBefore(space, firstUpdateButton);
	}
}

// CHANGELOG:
//
// v1 - 2005-07-02 - initial release
// v2 - 2006-01-13 - updated to work with FF 1.5 and GM 0.6.4
// v3 - 2007-02-11 - completely rewrote to work with new Blockbuster Online
// v4 - 2008-09-04 - added new queue URL and updated button to match new style

