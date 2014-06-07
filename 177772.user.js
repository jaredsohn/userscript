// ==UserScript==
// @name		Suddenly, Stickies!
// @author		Shadow Thief
// @namespace	DutchSaint
// @version		0.1
// @description	Makes fluxBB stop sucking at informing users that there are stickies
// @include		http://nolinks.net/boards/viewforum.php*
// @include		http://www.nolinks.net/boards/viewforum.php*
// @grant		none
// ==/UserScript==

// Version History
// ---------------
// 0.1 - (14 Sep 2013) Initial Version

// Prepend image to document.getElementByClassName("stickytext")[*].innerHTML;
var stickynote = document.createElement('img');
stickynote.src='data:image/gif,GIF89a%0C%00%0C%00%E6%00%00%00%00%00%FF%FF%FF%' +
'FD%FB%EE%FE%FC%F0%FD%FB%EF%FD%FB%F0%FE%FD%F7%F9%ED%B2%F9%ED%B3%F9%ED%B4%F9%E' +
'E%BA%F2%D1B%F3%D2I%F2%D2H%F3%D4P%F3%D4Q%F3%D6Z%F3%D6%5B%F4%D9b%F4%D9d%F4%DAl' +
'%F4%DBl%F4%DBm%F5%DDv%F5%DDw%F5%DF~%F6%DF%7F%F6%DF%80%F7%E1%86%F7%E1%87%F7%E' +
'1%88%F7%E3%8F%F7%E3%90%F8%E5%95%F8%E5%96%F8%E7%9C%F8%E7%9D%F9%E8%A3%F8%E8%A2' +
'%F8%E9%A8%F9%EA%AA%FA%ED%B2%F9%ED%B7%FB%EE%BA%FB%EE%BB%FB%EF%BE%FB%F0%C0%FB%' +
'F0%C4%FB%F1%C8%FC%F6%DB%FD%F7%DD%FF%FE%FA%F9%E9%AC%FA%EA%AD%FC%F3%D1%FC%F3%D' +
'3%FD%F7%E1%FE%FB%F0%FE%FD%FA%F9%E6%B6%EB%BAN%F0%CAx%F8%E3%B4%EB%BBV%ED%BC%5B' +
'%ED%BE%60%F0%C6n%F0%C7r%FF%FD%F9%E9%AB%3B%EB%AFG%F1%D1%95%EE%C2%7D%E6%9F2%E8' +
'%A7K%EB%ADU%EB%AFZ%F0%C3%83%F4%D1%9E%FF%FD%FA%F9%D1%9C%FE%DF%B6%DFy%00%E2%7D' +
'%01%E0%7D%03%E3%81%08%E1%81%0A%E4%85%11%E3%83%12%E3%89%19%E5%8A%1A%E2%8C%1E%' +
'E2%8C%20%E4%8D%21%E8%8F%23%E9%94%2C%E6%955%EA%987%E7%9A%3E%EB%9E%40%E8%9EF%E' +
'D%A3J%EA%A3M%EE%A8S%EB%A7U%F0%AD%5D%EC%AC%5D%EB%AB%5D%EB%AD%5E%F0%B2e%F1%B6n' +
'%EE%B6q%F4%BAv%F4%BF~%F5%C2%85%F6%C6%8C%F4%C5%8C%F7%CA%92%F5%C8%93%F8%CD%97%' +
'F6%CC%97%FA%D2%A2%FD%DC%B2%F0%B9y%FF%FF%FF%00%00%00%00%00%00%00%00%00%21%F9%' +
'04%01%00%00%7C%00%2C%00%00%00%00%0C%00%0C%00%00%07%8F%80QyPwusrqpnmiz3%8F%8F' +
'%3AO%8FOgxD99%03%02%04%04%05%05%06ev8%28%25%24"%20%1E%1B%180ct2%26%24%21%1F%' +
'1D%1A%18%16%2Fa%7B1%23%B3%1C%19%17%16%13._oN%3DCBA%17%15%13%11-%5ElM76%29%40' +
'%14%12%10%0F%2BZjKF45%3F%D9%0E%0C%2AWk%3EIE%27%3C%10%0E%0D%0B%09Uh%3BGJLH%2C' +
'%0A%2A%08%07Sf%C8%88%01%B3%85K%97%2CX%ACP%91%12%08%00%3B';

var allStickies = document.getElementsByClassName("stickytext");
for (var notice = 0; notice < allStickies.length; notice++) {
	allStickies[notice].innerHTML = '<img src='+stickynote.src+' />   ' + allStickies[notice].innerHTML;
}