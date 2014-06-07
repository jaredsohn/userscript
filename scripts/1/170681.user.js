// ==UserScript==
// @name          Wikipedia - Remove instruction templates
// @description   Removes all tables containing "please help", "may not follow Wikipedia's policies" or "improve this article" from wikipedia Article space.
// @version       1.0
// @include       http://en.wikipedia.org/wiki/*
// @include       https://en.wikipedia.org/wiki/*
// @exclude       http://en.wikipedia.org/wiki/Talk:*
// @exclude       https://en.wikipedia.org/wiki/Talk:*
// @exclude       http://en.wikipedia.org/wiki/index.php*
// @exclude       https://en.wikipedia.org/wiki/index.php*
// @exclude       http://en.wikipedia.org/wiki/Wikipedia:*
// @exclude       https://en.wikipedia.org/wiki/Wikipedia:*
// @namespace     wetgesgregshstrhvgdsccssfcgdsgdcdgs
// @downloadURL   https://userscripts.org/scripts/source/170681.user.js
// @updateURL     https://userscripts.org/scripts/source/170681.meta.js
// @homepageURL   http://userscripts.org/scripts/show/170681
// @icon          data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%08%03%00%00%00D%A4%8A%C6%00%00%018PLTE%FF%FF%FF%00%00%00%01%01%01%02%02%02%F9%F9%F9%0E%0E%0E%19%19%19%CC%CC%CC%F1%F1%F1%05%05%05%F5%F5%F5%B7%B7%B7%1A%1A%1A%EB%EB%EB%06%06%06%18%18%18YYYqqq%08%08%08%DC%DC%DC%DE%DE%DE!!!%3F%3F%3F%A6%A6%A6%F3%F3%F3%CF%CF%CF***%1B%1B%1B%CE%CE%CE%5E%5E%5E%15%15%15%1C%1C%1C%04%04%04%E9%E9%E9%D1%D1%D1%FD%FD%FD%13%13%13%89%89%89%E6%E6%E6%FB%FB%FB%86%86%86%C5%C5%C5%9B%9B%9B%94%94%94%BE%BE%BE%3A%3A%3A%C0%C0%C0%B0%B0%B0%98%98%98%1E%1E%1Ebbb%C3%C3%C3%D7%D7%D7%07%07%07%EF%EF%EF%9D%9D%9D%B4%B4%B4aaaooo%B5%B5%B5%A3%A3%A3%20%20%20XXX%03%03%03%7B%7B%7B%C1%C1%C1ppp%E2%E2%E2%25%25%25%16%16%16%2B%2B%2B%0B%0B%0Biii%09%09%09LLL%A8%A8%A8%BC%BC%BC%F7%F7%F7%AD%AD%AD%E0%E0%E0QQQ...777%97%97%97%D9%D9%D9%8F%8F%8Fggg%17%17%17%12%12%12%23%23%23%ED%ED%ED%10%10%10hhh%A2%A2%A2%3B%3B%3Bddduuusss%C7%C7%C7%0A%0A%0A%11%11%11OOO%9E%9E%9EIII%3Ei%9B%2B%00%00%00%09pHYs%00%01%CD%5E%00%01%CD%5E%01%B8r%93Z%00%00%01!IDATx%5E%DD%D1%C5%8E%1C1%14F%E1%FF%14433%0D333c%989y%FF7%88%AA%2C%D5%A6%7Bf%9F%7CK%FBX%BA%F2%D5%BFjt%5D%CF%9A%CE%F1R%CF%98%B7aBO%8A%94%C02%81%B3%F0%A2%EFzls%05%2B%1B2A%13%EB%93%CC%F1%D4%B8%2F%3B%93%82vU%26%D0M%9DhD%92%CA%0F%04%12%DE%9B%10%B3R%FC%ED%F2j%8A%5DI%1F%81%E2%A3%A7th%A6%0F1%EC%A8%C5%89%169%93%9260%17%F6Ud%02%C8h%09n%F3p%A45%02L%06AQJ%B0%A1%0E%5B%DA%1E%18%ECHu%9A%EAp%A5%C8%DE%A0%60_%07PN%C2%9D4ba%C0%F1%2B%C7%04%A7%D2%1BZ%3A%E7B%92%F2%19%02%D1%CB%98%CC%3F%5C%BB%8Dn%8E%7B%F9%0A%BDF%B8W%0D%C7_%A7!5e%02%0D9%EF%88%26e%BC%FF%E0%BAnMR%3C%01%9F%D3~%A0%2F%10%2CCi%00%7F%80%AF%16%98%20%D6%1EQ%E0%1B%60%C7%E4%F9%FEc%D0%BA%2B60%DC%95g%F4%A7%5DP%9F%1A%C0%2F%19C%EA%F7%DB%02%FE%E8%7F%F5%17l2%1EBm%D5%B9%92%00%00%00%00IEND%AEB%60%82
// ==/UserScript==

// get all tables

foo=document.getElementsByTagName('table');

// cycle though tables

for(counter=0;counter<foo.length;counter++){

// look inside the table if it is asking "please help" or "may not follow Wikipedia's policies" or if it says "improve this article".

if(foo[counter].innerHTML.indexOf('Please help') !=-1
||foo[counter].innerHTML.indexOf('may not follow Wikipedia\'s policies') !=-1
||foo[counter].innerHTML.indexOf('improve this article') !=-1
||foo[counter].innerHTML.indexOf('Please add references') !=-1){

// If it contains those words it is most likely not part of the article, so we hide it.

foo[counter].style = "display:none;";

} // end if
} // end for