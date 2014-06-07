// MonkeyBarrel
// version 0.3 BETA!
// 2007-03-23
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "MonkeyBarrel", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          MonkeyBarrel Google
// @namespace     userscrips.org/alien_scum
// @description   Searches userscripts.org for scripts that apply to current domain
// @include       http://*
// @exclude       http://*.js*
// @exclude       http://userscripts.org/scripts/source/*
// @version       0.4
//
// ==/UserScript==
//
// Change-Log
// 0.1 Initial Re-release
// 0.2 better domain matching
// 0.3 auto-hiding monkey
// 0.4 added auto update
var version=0.4;

//side for monkey to display 'left' or 'right'
var side='left';

//use srhink animation 
//0: none 1:slowly over a week 2:after 5 seconds 3: both;
var shrink=3;
var minSize=25;
var minOpac=0.5;

var href = window.location.host;
var google = "http://www.google.com/search?q=%s+site%3Auserscripts.org%2Fscripts%2Fshow%2F";
var uso = "http://userscripts.org/scripts/search?q="
var img = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00(%00%00%00(%08%06%00%00%00%8C%FE%B8m%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AMiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSwX%93%F7%16%3E%DF%F7e%0FVB%D8%F0%B1%97l%81%00%22%23%AC%08%C8%10Y%A2%10%92%00a%84%10%12%40%C5%85%88%0AV%14%15%11%9CHU%C4%82%D5%0AH%9D%88%E2%A0(%B8gA%8A%88Z%8BU%5C8%EE%1F%DC%A7%B5%7Dz%EF%ED%ED%FB%D7%FB%BC%E7%9C%E7%FC%CEy%CF%0F%80%11%12%26%91%E6%A2j%009R%85%3C%3A%D8%1F%8FOH%C4%C9%BD%80%02%15H%E0%04%20%10%E6%CB%C2g%05%C5%00%00%F0%03yx~t%B0%3F%FC%01%AFo%00%02%00p%D5.%24%12%C7%E1%FF%83%BAP%26W%00%20%91%00%E0%22%12%E7%0B%01%90R%00%C8.T%C8%14%00%C8%18%00%B0S%B3d%0A%00%94%00%00ly%7CB%22%00%AA%0D%00%EC%F4I%3E%05%00%D8%A9%93%DC%17%00%D8%A2%1C%A9%08%00%8D%01%00%99(G%24%02%40%BB%00%60U%81R%2C%02%C0%C2%00%A0%AC%40%22.%04%C0%AE%01%80Y%B62G%02%80%BD%05%00v%8EX%90%0F%40%60%00%80%99B%2C%CC%00%208%02%00C%1E%13%CD%03%20L%03%A00%D2%BF%E0%A9_p%85%B8H%01%00%C0%CB%95%CD%97K%D23%14%B8%95%D0%1Aw%F2%F0%E0%E2!%E2%C2l%B1Ba%17)%10f%09%E4%22%9C%97%9B%23%13H%E7%03L%CE%0C%00%00%1A%F9%D1%C1%FE8%3F%90%E7%E6%E4%E1%E6f%E7l%EF%F4%C5%A2%FEk%F0o%22%3E!%F1%DF%FE%BC%8C%02%04%00%10N%CF%EF%DA_%E5%E5%D6%03p%C7%01%B0u%BFk%A9%5B%00%DAV%00h%DF%F9%5D3%DB%09%A0Z%0A%D0z%F9%8By8%FC%40%1E%9E%A1P%C8%3C%1D%1C%0A%0B%0B%ED%25b%A1%BD0%E3%8B%3E%FF3%E1o%E0%8B~%F6%FC%40%1E%FE%DBz%F0%00q%9A%40%99%AD%C0%A3%83%FDqanv%AER%8E%E7%CB%04B1n%F7%E7%23%FE%C7%85%7F%FD%8E)%D1%E24%B1%5C%2C%15%8A%F1X%89%B8P%22M%C7y%B9R%91D!%C9%95%E2%12%E9%7F2%F1%1F%96%FD%09%93w%0D%00%AC%86O%C0N%B6%07%B5%CBl%C0~%EE%01%02%8B%0EX%D2v%00%40~%F3-%8C%1A%0B%91%00%10g42y%F7%00%00%93%BF%F9%8F%40%2B%01%00%CD%97%A4%E3%00%00%BC%E8%18%5C%A8%94%17L%C6%08%00%00D%A0%81*%B0A%07%0C%C1%14%AC%C0%0E%9C%C1%1D%BC%C0%17%02a%06D%40%0C%24%C0%3C%10B%06%E4%80%1C%0A%A1%18%96A%19T%C0%3A%D8%04%B5%B0%03%1A%A0%11%9A%E1%10%B4%C118%0D%E7%E0%12%5C%81%EBp%17%06%60%18%9E%C2%18%BC%86%09%04A%C8%08%13a!%3A%88%11b%8E%D8%22%CE%08%17%99%8E%04%22aH4%92%80%A4%20%E9%88%14Q%22%C5%C8r%A4%02%A9Bj%91%5DH%23%F2-r%149%8D%5C%40%FA%90%DB%C8%202%8A%FC%8A%BCG1%94%81%B2Q%03%D4%02u%40%B9%A8%1F%1A%8A%C6%A0s%D1t4%0F%5D%80%96%A2k%D1%1A%B4%1E%3D%80%B6%A2%A7%D1K%E8ut%00%7D%8A%8Ec%80%D11%0Ef%8C%D9a%5C%8C%87E%60%89X%1A%26%C7%16c%E5X5V%8F5c%1DX7v%15%1B%C0%9Ea%EF%08%24%02%8B%80%13%EC%08%5E%84%10%C2l%82%90%90GXLXC%A8%25%EC%23%B4%12%BA%08W%09%83%841%C2'%22%93%A8O%B4%25z%12%F9%C4xb%3A%B1%90XF%AC%26%EE!%1E!%9E%25%5E'%0E%13_%93H%24%0E%C9%92%E4N%0A!%25%902I%0BIkH%DBH-%A4S%A4%3E%D2%10i%9CL%26%EB%90m%C9%DE%E4%08%B2%80%AC%20%97%91%B7%90%0F%90O%92%FB%C9%C3%E4%B7%14%3A%C5%88%E2L%09%A2%24R%A4%94%12J5e%3F%E5%04%A5%9F2B%99%A0%AAQ%CD%A9%9E%D4%08%AA%88%3A%9FZIm%A0vP%2FS%87%A9%134u%9A%25%CD%9B%16C%CB%A4-%A3%D5%D0%9Aigi%F7h%2F%E9t%BA%09%DD%83%1EE%97%D0%97%D2k%E8%07%E9%E7%E9%83%F4w%0C%0D%86%0D%83%C7Hb(%19k%19%7B%19%A7%18%B7%19%2F%99L%A6%05%D3%97%99%C8T0%D72%1B%99g%98%0F%98oUX*%F6*%7C%15%91%CA%12%95%3A%95V%95~%95%E7%AATUsU%3F%D5y%AA%0BT%ABU%0F%AB%5EV%7D%A6FU%B3P%E3%A9%09%D4%16%AB%D5%A9%1DU%BB%A96%AE%CERwR%8FP%CFQ_%A3%BE_%FD%82%FAc%0D%B2%86%85F%A0%86H%A3Tc%B7%C6%19%8D!%16%C62e%F1XB%D6rV%03%EB%2Ck%98Mb%5B%B2%F9%ECLv%05%FB%1Bv%2F%7BLSCs%AAf%ACf%91f%9D%E6q%CD%01%0E%C6%B1%E0%F09%D9%9CJ%CE!%CE%0D%CE%7B-%03-%3F-%B1%D6j%ADf%AD~%AD7%DAz%DA%BE%DAb%EDr%ED%16%ED%EB%DA%EFup%9D%40%9D%2C%9D%F5%3Am%3A%F7u%09%BA6%BAQ%BA%85%BA%DBu%CF%EA%3E%D3c%EBy%E9%09%F5%CA%F5%0E%E9%DD%D1G%F5m%F4%A3%F5%17%EA%EF%D6%EF%D1%1F704%086%90%19l18c%F0%CC%90c%E8k%98i%B8%D1%F0%84%E1%A8%11%CBh%BA%91%C4h%A3%D1I%A3'%B8%26%EE%87g%E35x%17%3Ef%ACo%1Cb%AC4%DEe%DCk%3Cabi2%DB%A4%C4%A4%C5%E4%BE)%CD%94k%9Af%BA%D1%B4%D3t%CC%CC%C8%2C%DC%AC%D8%AC%C9%EC%8E9%D5%9Ck%9Ea%BE%D9%BC%DB%FC%8D%85%A5E%9C%C5J%8B6%8B%C7%96%DA%96%7C%CB%05%96M%96%F7%AC%98V%3EVyV%F5V%D7%ACI%D6%5C%EB%2C%EBm%D6WlP%1BW%9B%0C%9B%3A%9B%CB%B6%A8%AD%9B%AD%C4v%9Bm%DF%14%E2%14%8F)%D2)%F5Sn%DA1%EC%FC%EC%0A%EC%9A%EC%06%ED9%F6a%F6%25%F6m%F6%CF%1D%CC%1C%12%1D%D6%3Bt%3B%7Crtu%CCvlp%BC%EB%A4%E14%C3%A9%C4%A9%C3%E9Wg%1Bg%A1s%9D%F35%17%A6K%90%CB%12%97v%97%17Sm%A7%8A%A7n%9Fz%CB%95%E5%1A%EE%BA%D2%B5%D3%F5%A3%9B%BB%9B%DC%AD%D9m%D4%DD%CC%3D%C5%7D%AB%FBM.%9B%1B%C9%5D%C3%3D%EFA%F4%F0%F7X%E2q%CC%E3%9D%A7%9B%A7%C2%F3%90%E7%2F%5Ev%5EY%5E%FB%BD%1EO%B3%9C%26%9E%D60m%C8%DB%C4%5B%E0%BD%CB%7B%60%3A%3E%3De%FA%CE%E9%03%3E%C6%3E%02%9Fz%9F%87%BE%A6%BE%22%DF%3D%BE%23~%D6~%99~%07%FC%9E%FB%3B%FA%CB%FD%8F%F8%BF%E1y%F2%16%F1N%05%60%01%C1%01%E5%01%BD%81%1A%81%B3%03k%03%1F%04%99%04%A5%075%05%8D%05%BB%06%2F%0C%3E%15B%0C%09%0DY%1Fr%93o%C0%17%F2%1B%F9c3%DCg%2C%9A%D1%15%CA%08%9D%15Z%1B%FA0%CC%26L%1E%D6%11%8E%86%CF%08%DF%10~o%A6%F9L%E9%CC%B6%08%88%E0Gl%88%B8%1Fi%19%99%17%F9%7D%14)*2%AA.%EAQ%B4Stqt%F7%2C%D6%AC%E4Y%FBg%BD%8E%F1%8F%A9%8C%B9%3B%DBj%B6rvg%ACjlRlc%EC%9B%B8%80%B8%AA%B8%81x%87%F8E%F1%97%12t%13%24%09%ED%89%E4%C4%D8%C4%3D%89%E3s%02%E7l%9A3%9C%E4%9AT%96tc%AE%E5%DC%A2%B9%17%E6%E9%CE%CB%9Ew%3CY5Y%90%7C8%85%98%12%97%B2%3F%E5%83%20BP%2F%18O%E5%A7nM%1D%13%F2%84%9B%85OE%BE%A2%8D%A2Q%B1%B7%B8J%3C%92%E6%9DV%95%F68%DD%3B%7DC%FAh%86OFu%C63%09OR%2By%91%19%92%B9%23%F3MVD%D6%DE%AC%CF%D9q%D9-9%94%9C%94%9C%A3R%0Di%96%B4%2B%D70%B7(%B7Of%2B%2B%93%0D%E4y%E6m%CA%1B%93%87%CA%F7%E4%23%F9s%F3%DB%15l%85L%D1%A3%B4R%AEP%0E%16L%2F%A8%2Bx%5B%18%5Bx%B8H%BDHZ%D43%DFf%FE%EA%F9%23%0B%82%16%7C%BD%90%B0P%B8%B0%B3%D8%B8xY%F1%E0%22%BFE%BB%16%23%8BS%17w.1%5DR%BAdxi%F0%D2%7D%CBh%CB%B2%96%FDP%E2XRU%F2jy%DC%F2%8ER%83%D2%A5%A5C%2B%82W4%95%A9%94%C9%CBn%AE%F4Z%B9c%15a%95dU%EFj%97%D5%5BV%7F*%17%95_%ACp%AC%A8%AE%F8%B0F%B8%E6%E2WN_%D5%7C%F5ym%DA%DA%DEJ%B7%CA%ED%EBH%EB%A4%EBn%AC%F7Y%BF%AFJ%BDjA%D5%D0%86%F0%0D%AD%1B%F1%8D%E5%1B_mJ%DEt%A1zj%F5%8E%CD%B4%CD%CA%CD%035a5%ED%5B%CC%B6%AC%DB%F2%A16%A3%F6z%9D%7F%5D%CBV%FD%AD%AB%B7%BE%D9%26%DA%D6%BF%DDw%7B%F3%0E%83%1D%15%3B%DE%EF%94%EC%BC%B5%2BxWk%BDE%7D%F5n%D2%EE%82%DD%8F%1Ab%1B%BA%BF%E6~%DD%B8GwO%C5%9E%8F%7B%A5%7B%07%F6E%EF%EBjtol%DC%AF%BF%BF%B2%09mR6%8D%1EH%3Ap%E5%9B%80o%DA%9B%ED%9Aw%B5pZ*%0E%C2A%E5%C1'%DF%A6%7C%7B%E3P%E8%A1%CE%C3%DC%C3%CD%DF%99%7F%B7%F5%08%EBHy%2B%D2%3A%BFu%AC-%A3m%A0%3D%A1%BD%EF%E8%8C%A3%9D%1D%5E%1DG%BE%B7%FF~%EF1%E3cu%C75%8FW%9E%A0%9D(%3D%F1%F9%E4%82%93%E3%A7d%A7%9E%9DN%3F%3D%D4%99%DCy%F7L%FC%99k%5DQ%5D%BDgC%CF%9E%3F%17t%EEL%B7_%F7%C9%F3%DE%E7%8F%5D%F0%BCp%F4%22%F7b%DB%25%B7K%AD%3D%AE%3DG~p%FD%E1H%AF%5Bo%EBe%F7%CB%EDW%3C%AEt%F4M%EB%3B%D1%EF%D3%7F%FAj%C0%D5s%D7%F8%D7.%5D%9Fy%BD%EF%C6%EC%1B%B7n%26%DD%1C%B8%25%BA%F5%F8v%F6%ED%17w%0A%EEL%DC%5Dz%8Fx%AF%FC%BE%DA%FD%EA%07%FA%0F%EA%7F%B4%FE%B1e%C0m%E0%F8%60%C0%60%CF%C3Y%0F%EF%0E%09%87%9E%FE%94%FF%D3%87%E1%D2G%CCG%D5%23F%23%8D%8F%9D%1F%1F%1B%0D%1A%BD%F2d%CE%93%E1%A7%B2%A7%13%CF%CA~V%FFy%EBs%AB%E7%DF%FD%E2%FBK%CFX%FC%D8%F0%0B%F9%8B%CF%BF%AEy%A9%F3r%EF%AB%A9%AF%3A%C7%23%C7%1F%BC%CEy%3D%F1%A6%FC%AD%CE%DB%7D%EF%B8%EF%BA%DF%C7%BD%1F%99(%FC%40%FEP%F3%D1%FAc%C7%A7%D0O%F7%3E%E7%7C%FE%FC%2F%F7%84%F3%FB%25%D2%9F3%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%0A%FCIDATx%DA%B4%98ypU%F5%15%C7%3F%BF%DF%5D%DE%92%97%97%E5A%16%08%81%10%F2%08%8B%A9E%01%81FP(.%B5%EDXQ%AC%D5i%B1%C5%8EN%B7%E9j%B1%8Bv%EC%A6%A5%8Bm%ED%B8%B5va%9C%D6%B6%D6%0A%B5%D6b%15*C%94%CD%40%81%84%25%81%04%C8B%C8%F2%92%B7%DD%FB%EE%ED%1F%BF%9B%E4%25%24%20%D4%FEf%EE%DC%99w%CF%BB%E7%7B%CF%FA%3DGlx%2F%17%7B%CA%81%A5%C0%12%20%0A%14%03~%20%0Dt%02%8D%C0v%E0U%E0%F0%C5*%D1%2F%E2%3F%15%C0%9D%C0j%A0j%1C%99j%A0%16%F88p%0Cx%0Ex%1C8p%A1%CA%E4%05%CA%AF%06%5E%00%BEv%0Ep%A3%CFT%E0s%C0F%E0%AE%FF'%C0u%C0o%809%17%E9%AD%E9%C0c%C0w%01%E3%9Dv%F1%7D%C0%83%AE%03%19%1B%5C%17%84%04MS%F7s%1D%C7%06'%03%08%90%1AH%8D%7B%01%13%F8%12%E0%BC%13%16%BC%CDu%B9%DFJ*E9%F9%85%E4%97N%26%18%CE%C7%C9%40%3A%01%EEh5B%7DH%3A%0E%9Aa%10..%25%3C%B1%18!%E5%A0%FC%E7%81%CF%BC%13%16%ACt%1D%BEm%A5%D0%8B%2Bk%A8%BA%F2V%26N%9D%83i%06I%25%FB%E9j9%40S%DD%F3%9C8P%87%90%A0%FB%00%17%AC8%18A%1FUK%3E%C8%D4y%D7%92%17%99%8C%EB%BA%9Cio%E2%F0%D6g8%5E%BF%05M%E7%1BR%E3%DF%C0%8Es%01%D0n%AA%1C%FF%A1%EB%F2-%2B%C5%CA%CA%85%D7%B3%F8c%0FQ%3Ck%09%FE%9C%02%8C%40.%FE%FCb%0A%2B.%A5%BCf9fN.%A7%9B%EB%B1%93il%1B%F2%8B%CBYt%FB%83%CC%5E%B9%96%DC%E2%E9%18%81%5C%CC%9C%02%F2%A6TS~%C9%D5%D8%C9%18%1DG%F6%06%A4%24_%08%FEr.W%9F%0B%60%8D%95%E4%87%A5%D1w%07%DE%B3%E6a%FCyE0%D0%0DvZ%F9%CFNC%3A%8E%F4%05(%9A%BD%84pA1-o%FD%8B%60%B8%90%A5w%FD%98%92%9A%E5%90%EC%87%E4%80%92%CFX%90%8A%23%039%94T%CD%E7%CC%F1z%BAO%B6Vj%06%AFy%A5%E8%C2%5C%ECd%B8%D1%F0%19%05sV%DC%89YP%0A%B1%AE1%A4%84%0A%C2%8C%CD%D4%05%1F%245%D0%8D%2F%98Gd%C6%02%25%EF%BA%20D%96%B8%80D%0C-%14a%D6%B2%3Bh%3B%B4%C3%EFd%AC%9B%A5%C6%96%F3%01%CC%07%D6%00%B3%80%3D%C0%9F3i%AE(%AE%AA%A6%24%BA%40Ya%DC%23%94u%92%FDDkoS%DE%8A%F7(p%E3%C9%A7%06(%AA%9CG%E1%94%99%B4%1F%DE%B7%D4%0C%10%04%E2%C0%7B%81%08P%074%0D%02%CC%03%9E%00Ve%17d%D7%25%3Aaj%0DzN%01%A4%E2%E7%C9%25%A1R%D9N%AB%2C%19%17%9Cw2%16zN%01%85Sf%D1vh_)p9%F0%01%E0S%80%0F8%E8%15%F7%97t%E0%8EQ%E0p%5D%AE%14%12r'%94%A9%E2%95%5DG%5C%17%0C%03%82A%E52%DB%86x%5C%FD%9E-%17%0C*9%5C%88'%20%9D%1Ev%B7%E3%80%A6%93%5BP%8A%90%04%80%F5%1E%C8%ECV%F9S%60%85%EE!%1F%95%BE%20%25%E8%BE%DC%B3%D2%1A%9F%0F%3B%9Df%E3%C6M%B4%B6%B7%F1%9Ey%F3%B8t%EE%5CH%26%87c.%10%A0%A1%B1%91W%EA%DE%20R%90%CF%0D%B5%B5%04C!%25%93%15%93%86%3F%84%14%E4%B8.%97g%87%AAw%AA%80%D5%3A0m%CC%12%03%B8%19k%E4%8F%86A%D2%B6%F9%CA%0F%D6%F3%B3g%9E%C1q%1C%A6%94%94%F0%D8%03%F7s%DD%D5WA%FF%00%04%83l%7B%F3M%D6%DCw%1F%8D%CD*9%3Fr%C3%FB%F8%F97%BFI%5E%20%00%965%A4%C1%C9%D8%9C'%18%96H%15%40%A3%22J%AA%AE%91%88uzP%87%DD%B6%A5%AE%8EG6l%C0q%94%3B%5B%DA%DAx%E8%89'%89%F7%F5A%20%80%95L%F2%F0S%BF%1C%02%07%B0a%E3%266m~%05%02%81%E1lv%5D%12%FD%5D8%99%91%89%3E%EA%84%24p%9CqL%D8%DB%DE%0CVJ%C5!%80%94%1C%3A~%B6%F8%D1%D6V%FA%CEt%83%DFO%3C%16%E3p%CB%D92%0DMM%0A%89%10%204%B0R%F4u%B4%9C%AF%D3%B5I%8F%3E%9D%9D%97%1At%B5%EC%25%D1%DD%06%86%D7%C32%19fUT%20G%7Drt%DA4%F2%22%11H%26%09%86%C3TWT%9C%F5%BE9U3%86%13I7It%B7%D3s%F2%00%9AvN%80%9B%24%F0k%8F%AB%8D%2C%90%06%F4%B6%B5p%AAq%BB%07%10%88%C7%A9%9D%3F%9F%2F%DE%B9%06%D3P%8C%A9r%CA%14%BEz%D7Z%02%A1%10%24%12%18%3E%1F%F7~%E2%13%CC%ADRtQ%D74%D6%AE%BA%89%EB%AF%BA%0A%12%09%F5%1E%D3G%FB%D1%1D%F4%B6%B7%A2%8DO%BC6%01%7F%15%1E%E5%9F%E8%B1%E4%D9%C0J%A0%04%14%1B%994k%1E%CB%EFy%1C%CD%0C%AA%AE%E1%F3%E1%DA6%2Fm%AF%E3Tg'%8Bj.%A1%3A%3A%13%92%89%E1%FA%17%0C%D2%DC%DC%CCk%3Bw%11%C9%0Bs%CD%A2E%18~%BF%CAb%C3%87%EB%3A%BC%FA%D8%DD4%EFy%1D_p%04%A8~%A0%03%D8%0A%DC%0F4%8BQ3I%0D%F0%0Fo%BEP%B5%D7%82%85%B7%7C%85%EAk%EF%81%FEn%95%3D%83uP%0AH%A5Uf%0E%D6E%80TJ%DD%7D%3E%05%3A%91U%07s%23%1C%7B%FD%F7l%7Dz%1DB%DA%A3%F9%E4%3E%E0%C3%DE%7D%CC%5E%BCj%10%9C%D7%8F%B1%12%B0%E3O%EB%09E%CA)%9B%7F%03%0C%F4(%D4%7D%7D%9E%BBL%9A%5B%5By%F1%F5mH)%B0l%9B%EAi%D3Xq%C5%15%0A%E8%A0U%85%80P!g%0E%EF%A0%EE%D9%EF%11%EF%B51%03*%D6us%E8%DB*%81%A2%F1%C8B%00X%8AP%2C%D8NC%A8%20%9F%A2%19%15%A4%13%16%7B%5Ex%04%2B%9D%60%CA%BB%96%A3%8B%AC%EE%A2i%B8B%F0%FD%A7%9E%E2%D8%A9S%00%FCl%DD%3AV%2C_%0E%B1%D8%108W3%E8%3C%B8%8D%5D%7F~%98%40%DE%24%26%CF%A9%25%93%B1%E8i%DDO%CF%89f%A4%0E%D2%20%80%CB%F5%C0%2Bc%01%2C%06%A6%BB%B6%D2%3D%B3%F6C%CC%5Cv%07%E1%09e%80%CB%99%13%87ho%AC%E3%CC%B1%BD%14U%5E%A6%CA%0F%402IE4%CA%9A%1Bo%E4%FEG%1Fe%D6%F4%E9%AC%BE%EEZ%E5%D2!%EBI%9Ct%9C%9E%96%FDT%2F%BB%8D%B2K%96%A1%FBB%80K%BC%B7%83%C6-%CF%F0%9F%97%7F%89cYH%9D(%A0%01%99%D1%00'%02a%3B%0D3%AF%5C%C5%C2%DB%1FD%E8%E6%10Q(%8A.%A0h%EA%5C%ACd%BFG%0A%B2%DA_%26%C3%AD%D7%5D%CBO6%FC%8E%9B%AFY%C9%84%B22%E8%ED%1D%C1%DD%A4%90D%17%AF%02%7FP%85%88%F7%8E%60%C1d.%BD%E9%5E%5C'C%FD%8BO%224%8A%84%20%07%E8%1B%3D%93%98v%1A%19%9A0%919%CB%3F%AA%C0%F5%7B%04%D5NC%22%06%B8%18%FE%D0%D9l%25%1E'Z%5E%CE%03w%DF%CD%CD%2BV%8C%B4%DE%10%15%F4T%25%FA%95%F5%9D%8C%D7%AE%FA%20cS%5D%FBa%F2K%CA%C8%A41%B2qe%5B0%EE%D8%D8%F9%93f%12%9A0Eq%C0%C1%AC%94Red29%C6%84%A4%D8%89%10%82O%DFz%EB%10%E0%B1%BB%93%A3%80%9B%A6%BA%5B%96%D2%91N%10%C8%2B%22oR%94%EE%93%ADq%C0%1Ak%AAks%E1%B4%E1%CFEHcd%F6%09%D8%B1%7B7%BD%FD%FD%A0%EB%E3%0E0%C8%F3%0C%89%1EU%EB%EA%EA%A2%3F%FB%5D%AE%D2%23%A5%01p%02H%8C%05%B0S%08%F6%A7b%9D8%E9%C4%B0%B2%60%90Ww%EE%E2c_%FF%3A%FB%9B%9B!%12Q%CF%C6%22%A5%99%CC9%C8%AA%AB%C8Bn.%DFz%FC%09%BE%FF%AB%A7%95W%84%00M%C7J%F4%D1%7F%E68BR%9F%3DDe%03%B45%9D%CD%DD'%1B%E8i%3F%02f%60%E8%8B%F764%F2%9F%C3G%F8%E2%FA%1F%B2%AB%AE%0E%C2a%C8%CF%07%BF_Ya%2C%3A%22%84%FA%10%D3%84P%08%0A%0AI%A4%D3%AC%FF%C5%2Fxd%C3%06%F6%1C%3C%A8%88%AB%14%E0%CF%A1%E3%E8n%BAO%1C%1E%D0%0C6%8F%3B%D5I%8D%B6d%2C%FD!%A9%93WV%B3%7C(%03%0B%C2%B9l%DD%B9%93%1D%FB%F6%F1%C7%17_%A4%AD%A3%1D%1DA%D8%EF%23%10%08%22%02%01%056%FB2M%10%92x%22%CE%E1%A6%26%FE%F2%D2K%7C%F9%E1%1F%F0%C4%B3%CF2%B1%A0%80%EF~%E1%F3%CC%A8%A8%00%3D%80%15%EB%E4%8Dg%BFC_%5B%CB%DFu%93%9Fd%5Bpt%AB%C3%B1%B9%0Fa%3C%B8%E0%E6%7B%89%AE%B8Se%9C%06%0DG%8F%F2%D0%93O%F1%DB%E7%9F%C7%B2m%00f%94%9737ZEE%E9%24J%22%11%C2%B9!%A4%94%24%13IN%F7%F4%D0%D2%D1%C1%C1%E6f%F6640%E0%11%85%F7-%5B%C6%BAO%DE%C5%E2%CB.%034%92%BD%9D%EC%FC%FDw8%B4%FD%85%A4%E1%E7%FDB%F0%CF%11%8E8k%3F((%B4S%BC%A0%19%E6%E2%D9W%AF%A1z%D9m%04%0A'%A9%D2i%5Bl%DB%BD%9B%3F%FD%E3e%5E%DE%B6%8D%BD%8D%8DookTV%C6%8A%C5%8BYu%CDJ%AE%9E%3F%1F-'%07%5C%9D%AE%86%ED%BC%F1%87%EF%D1~d%0F%86%8FG%84%E4%B3gE%CA%98%0BL%C1%C2%8C%C5sv%8A%D2%89%15%B3Xp%CB%3A%8Af%D7%82%9D%02C%25HOG%07%FB%9B%9A9%D8t%94%E3'N%D0%D9%DDM%3C%95%C2u%C1o%1AD%F2%F2(%9F4%99%E8%F4%0A%E6TTPTR%02%BA%06%96%03%BA%9F%AE%86%ED%FC%FB%E9%2Fs%FA%F81%FC%B9l%11%82%9B%80%D3o%0F%A0%3A%EFw%5D%1EO%C7)%09M(%A2%E6%FA%7B%98%B1%F0%03h%A1%7CU%B8%85%AB%12DJU%DF2%8E%0AzP%81%2F5%F5%CCqTv%3B%80f%E2%24%FA8%FA%E6%26%EA7%FE%9C%BE%D3'1%03%BC%09%DC%EEmd%2Fh%F5%D1(%04%BBu%93%CBS%03%03E'%F6%BEJWs%3D%C2u%F1%E7%E4a%F8%C2%20t%B0%07%C1%B9%E0%0Au9%0C_%AE%06%8EC%B2%A7%83%D6%B76%B3%EB%F9%1Fq%60%F3%AFH%0D%C40%03l%04%D6%9EkE%2C%DE%C6%8Ez%26%F0%80%EB%B0%DAJ%82f%40%5Ei%25%C5%95%97%11%99VCx%E2T%82%B9%11L%7F%10%E1%D1c7c%91N%C5I%C4%BA%E9%EB%3CF%D7%B1z%DA%8F%EC%A2%E7d%23v%1A%0C%1F%7DR%E7%A7%B8%3C4%D8s%FF%17%80x%EC%E2%16%60%AD%EB%B0%D4N%23%BD%D9%1B3%18%C0%1F%0Cc%F8s%91%DEh%E0X)%ACT%8C%D4%40%8Ct%3C%8Em%7Bs%B6%C9%80%90%FC%0Dx%D4%5B%AE%9F%F7%88%0B%DC%F2%07%81k%BCa%7F%91%EB0%D5q%F0%BB%8E%D7%A2%DD%E1M%88%90%EA%92%92%98%90%1C%04%5E%F3%06%B4%AD%23g%D9wv%CB%1F%F76%F6%CF%01%A5B2G%93%BC%DB%9Be%26x%A4%D7%F5f%8BS%C0%5B%40%3D%B0%1F%E8%BD%98%C5%F6%7F%07%00%A4%C7m%9A%BD%FAN%EA%00%00%00%00IEND%AEB%60%82";
var tokens = href.split('.');
n=tokens.length-2;
var query = (tokens[n].length<4 && tokens[n-1]!='www')? tokens[n-1]:tokens[n];
search_uri = google.replace('%s', query);
var notFound = /No results. Sorry!/

function getValue(query) {
  return eval(GM_getValue('cache','({})'))[query];
}

function setValue(query,value) {
  var values=eval(GM_getValue('cache','({})'));
  values[query]=value;
  GM_setValue('cache', uneval(values));
}

function xhr(uri,f) {GM_xmlhttpRequest({method: 'get',headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},url: uri,onload:function(res){f(res.responseText)}});}

function opac(s) {return (size-minSize)*(1-minOpac)/(40-minSize)+minOpac}

function createElement(type, attributes) {
  var element = document.createElement(type);
  if(attributes) for(var i = 0; i < attributes.length; i++) element.setAttribute(attributes[i][0], attributes[i][1]);
  return element;
}


function showmonkey() {
  rec=num-oldnum;
  size=(shrink&1)?Math.max(40-dif*2,minSize):40;
  var my_banner = createElement('div',[['style','position: fixed; top: 10px; '+side+': 10px;  margin-bottom: 10px; background-color: transparent; z-index: 99999;']]);
  trans=my_banner.appendChild(createElement('div',[['style','-moz-opacity: '+opac(size)+';']]));
  cntr=trans.appendChild(createElement('a',[['href',uso + query],['style','text-decoration: none;'],['title',num + ' Greasemonkey scripts are available for: '+query]])).appendChild(createElement('center'));
  monkeyhead=cntr.appendChild(createElement('img',[['border',0],['width',size],['src',img]]));
  if(rec) cntr.appendChild(createElement('div',[['style','color: darkorange; font-weight:normal; font-size:11px; line-height: 12px; background: #775544; padding: 3px; -moz-border-radius: 7px; margin-top:5px;']])).textContent=rec+' new';
  document.body.insertBefore(my_banner, null);
  if (!rec && shrink & 2) window.setTimeout(function (){inter=window.setInterval(function (){
    try {
      size--;
      trans.setAttribute('style','-moz-opacity: '+opac(size)+';');
      monkeyhead.width=size;
      if (size<minSize) window.clearInterval(inter);
    } catch(err)  {window.clearInterval(inter);}
  },200)},5000);
}

function check() {
  xhr(search_uri,function(res) {
      if (res.indexOf('did not match any documents.')==-1) {
        oldnum=num?num:0;
        num=parseInt(res.match(/of(?: about)?\s*<b>\s*([0-9,]+)\s*<\/b>/i)[1].replace(',',''));
        rec=num-oldnum;
        if(rec) {
          setValue(query+'-updated',new Date());
          dif=0;
        }
        setValue(query+'-num',num);
        setValue(query+'-checked',new Date());
        showmonkey()
      } else {
        setValue(query+'-num',0);
        setValue(query+'-checked',new Date());
     }
  });     
}

function cur(date) {return (date==undefined || (new Date()-date)/(1000*60*60*24)>10)}

if(window == window.top) {
  oldnum=num=getValue(query+'-num');
  date=getValue(query+'-checked');
  updt=getValue(query+'-updated');
  dif=(new Date()-updt)/(1000*60*60*24);
  if (cur(date)) check()
  else if (num>0) showmonkey();
}
if(cur(getValue('install_date'))) xhr('http://userscripts.org/scripts/source/8124',function(res){
 try {
  setValue('install_date',new Date());
  var v=parseFloat(res.match(/version=\s*(\d+\.?\d*)/)[1]);
  if (v>version) {
    alert('A new version of Monkey Barrel Google is available.'); 
    location.replace('http://userscripts.org/scripts/source/8124.user.js');
  }
 } catch(e){}
});
