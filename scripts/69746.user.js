// ==UserScript==
// @name           Gixen Snipe From Ebay
// @namespace      http://userscripts.org/scripts/show/69746
// @description    Enter gixen snipes directly from ebay item pages.  You must be a Gixen mirror subscriber to use.
// @include        http://cgi.ebay.tld/*ViewItem*
// @include        https://cgi.ebay.tld/*ViewItem*
// @include        https://signin.ebay.tld/ws/ebayISAPI.dll?SignIn*
// @include        http://cgi.ebay.tld/*-/*
// @include        https://cgi.ebay.tld/*-/*
// @include        http://www.ebay.tld/itm/*
// @include        https://www.ebay.tld/itm/*
// @require        http://userscripts.org/scripts/version/44063/216712.user.js
// @version        1.02
// @history        1.02 Support newest version of ebay pages.  Updated where snipe is placed on page so it does not look weird.
// @history        1.01 Enabled advanced bidding options (bid group, snipe offsets, quantity).  To enable, choose the GreaseMonkey menu item to hide/show advanced options.
// ==/UserScript==


function GM_LOG(message) {
  if (unsafeWindow.console) {
    unsafeWindow.console.log(message);
  }
}

/** Ebay item number that we're viewing.  Extracted from document.location */
var itemNumber = null;

var NO_SNIPE_HTML = "<span>&lt;no snipe set&gt;</span>";

// Image from http://commons.wikimedia.org/wiki/File:Spinning_wheel_throbber_blue.gif.
// Encoded with http://software.hixie.ch/utilities/cgi/data/data
var WORKING_IMAGE_HTML = "<img src=\"data:image/gif,GIF89a%20%00%20%00%F6%00%00%FF%FF%FF%19%9E%E0%FA%FC%FD%D9%EE%F9%DD%F0%F9%FC%FD%FD%C0%E4%F5%8C%CE%EF%95%D2%F0%C6%E6%F6%F6%FA%FD%EA%F5%FB%93%D1%F0%8A%CD%EE%A9%DA%F2%E8%F4%FB%7D%C8%EDb%BC%E9%8E%CF%EF%E6%F4%FA%F3%F9%FC%88%CC%EE%AB%DB%F3%B5%DF%F4I%B2%E6M%B3%E6R%B6%E7x%C6%EC%DF%F1%F9%F4%FA%FC%86%CC%EE%AE%DC%F3%F8%FB%FD%CD%E9%F7O%B4%E7z%C6%EC%EB%F6%FB%A7%D9%F2%85%CB%EE%C4%E5%F6%D6%ED%F8G%B1%E6K%B3%E6%B4%DF%F4%CB%E8%F7%D0%EB%F8%EF%F7%FC%D8%EE%F9D%B0%E5%BB%E2%F5%C2%E5%F6%B0%DD%F3%F1%F8%FC%7C%C7%EC%9C%D5%F1%DB%EF%F9%E4%F3%FA%91%D0%EF)%A4%E2'%A4%E19%AB%E4%25%A3%E1B%AF%E5%A3%D8%F2%E2%F2%FA%E1%F1%FA%ED%F7%FB%B7%E0%F4%A5%D8%F2%A0%D6%F1q%C3%EB%99%D3%F0%9E%D5%F1X%B8%E8%5D%BA%E8a%BC%E9V%B7%E8%5B%B9%E8%9A%D4%F1%D2%EB%F8Y%B9%E8T%B6%E7%D4%EC%F8%C7%E7%F6_%BB%E9%A2%D7%F10%A7%E3%3D%AD%E4F%B0%E5%2C%A6%E2%2B%A5%E2%BE%E3%F5j%C0%EAd%BD%E9%AC%DB%F3%7F%C9%EDh%BF%EAm%C1%EBs%C3%EBk%C0%EAf%BE%EA7%AA%E45%AA%E34%A9%E3%3E%AD%E4%CF%EA%F7%C9%E8%F7v%C5%EC%BD%E2%F5t%C4%EC%40%AE%E5%B2%DE%F4.%A7%E2o%C2%EB2%A8%E3%81%C9%ED%83%CA%ED%B9%E1%F5%3B%AC%E4%90%CF%EFP%B5%E7%97%D2%F0%23%A2%E1%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%FE%1ACreated%20with%20ajaxload.info%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%0B964%93%82%0F%17!%83%055%3A%3B%12%99%0A%10%18%22%16%82%14%22%3B%3D5%9E%90%0B%11%19%18%19%0E%00%14%1A%AD%3F%82%0B7%40%02%8E%02%12%1A%19)%182%006%3C%3E(%00B(%D1.%8F%13%1B%1A*0%A3%00%04%1C%82%13%D1(%14%90%1C%23%1A%223%86B%2F(8%92%24%2B1%C1%86%1D%98%8F%0A%14%1D%05%8D%FA%8B%02%06%0C%12%24%94%10%97%A8%00%90%01%04%08%22%1Ap%A0A%05%0F%26X(%22%01%AE%5B%22%02%08%18hD%D0B%11%B4h%16%11%15H%E0%C0%C2%87%13%20%14%15%C0A%20%88%C2D%0A%14%A4%CC%D4%CFE%07D%14%5E%3A*%C0%01%C5%8Bi%85H%AC%03%12%E9%5B%B4%09%82%40%CC%C4%01N%E7%22%02%D1%5E%60%12%3A%E0%E6G%14%40%1D%3D%F0IB%10T%14D%01%F8%0A%22%EF%11%05%05%83nD%0B%02%8B%A6%20%A6(%10%BA%BA-%24%60%82%DC%B9x%F3%EA%DD%CBwR%20%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%87%0F%13%8F%8E%17*X%5B%93%8B%0A%11VY%5C%05%99%83%0B1-%83%1DL%9DQ%0A%A1%00%20%0DIJ3%82%14%A8ZQ%20%82%A0%8F%24FJLP%B2%0ATVZ%5D%A0%0B7%40%BA%8C%05GKMQLS%00UW%3C%5E%00B(%DB.%8F%0B%26KP%1A%08%82R%A5%00%13%DB(%14%93%40%1EKJ%17%86B%2F(8%A1B12%CB%84%1D4%93%20%3A%ACj%C4%2FQ%0B%22E%90%AC%18%88%A8%00%90%01%04%D8%25%A2%E0%20%A1%0D'R%14%91P%C7A%11%88!%16BZ%B8%A1H%DB%B6%8E%8A%80%240%20%E3%89%00E%05p%10%08%22q%91%80%82%AC%1A%BA%E8%80%88B%CDG%05%82%A0x%D1%AD%10%89z%402%3DP'%A9%15.%008%D4%FDd%C4a%DB%8B%7FG%07%F04%89%A2%A8%A3%A3%2FH%08%22%B0-)%00dA%5EN%128%E8%C6%B6%20%83%15p%86J%87BH%CE%86%0B%BC%DE%DD%CB%B7%AF%DF%BF%80%07%05%02%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%86%24N%3F%14%8F%8D%12%3Ce%0C%95%8B%1DK%3CfJ%20%9B%83B2(%834M%3CgL%0A%A3%00%20%08%60cC%82%1DT%ABP%A2%00%1D%95._ad%60%17%B0d%AB%5C%05%0A%123%40%05%8E%05Dbc%5D%5D%2C%00%3F%3Eh%1F%006b-(.%8F%24%0Cb%5C%11H%00%02!!%82US((%94%8F%13%08%D21%86%40%2F(8%A3.'S%CE%0Cu%A0%B1%09%C4.F%01%17%91%90%B1b%C5%94%83%87%0A%00%19%40%40%5E%22%16C.%AC%98%C1A%11%09x(%3A*zr%A2%E4%09~%89%84%80%14%99%88%C2%00%14%2F%9A)*%80%83%40%10%8B3_%3Ds%D1%EB%10%05%9C%CF%82%C0%0CW%88%84%3E%20%9B%16%80%9C%20%C8%A0%20%1C%20%81.%12%0A%93%A0%D1%01%BDT%C2%23%EA%C8%C5%80%17%24%04%11%80%87%14%C0%82%1BA%04%14%3Cx%83%EC%A0%84%3A%13%01L%80'%24n%C4%05%5C%ED%EA%DD%CB%B7%AF%DF%BD%81%00%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%86%24U%0E%14%8F%8D%08X%3EG%95%8B%0AcXn%5D%20%9B%83%057A%83%14dXhJ%0A%A3%82%2B_%10%5B%82%1D%5C%AB%11%A2%00%0F%1D%8F%056_%1B%1Bl%00%20F%ABF%05%0A%0Dn%118%8F%17%1E_km-%00%0E%19%18o%00HZ%3DpS%8F.%3F%1E%10b%0E%00%05-i%82m%3DeG4%95%0BD%E5'%86GXD%CF%9B%14!i%05%0C%09%00%22%AFR%01%01%8E%022%02%F1%82%C5%14%14%08%13%15%002%80%00%25E8%D6%85P%B3%40%11%09%14%209%2C%9A%00%12%A4%0BEBJ%8AT%24%00%C7%8D%1B%13%16%15%C0A%20%C8E%99%AF%12%BA%E8u%88%C2M_AP%BC8Y%88%C4%0B%14%406%7D%04%19%B3XD%1C%25%7F2%22)T%9E%D1%1B%BDR%9A%ACDa%C0%00%12%82%08%80L%0A%60%81%A9%88%8F%04%A0%BD1%96TNBT%10%85%BC%3DT%60%01%D1%B9x%F3%EA%DD%CBWo%20%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%86B%16C%1D%8F%8DHQ%22E%95%8B%0AkQ%19q%20%9B%84%20%0A%83%1Db%1A%19%60%A6%A3%00%0FDNj%82%9D%1A*c%A2%00%0B.%95%09%08%07%0D%09%00%20%10%1A%18%23%00%0A%12)J%1C%8FO6%0C%0D%1E(%003PQC%00UrY%3A%3F%8F%1D%17N9%1E%2B%00%05RO%82%23%DE%3A%17%95.%E39%2C%866p%3Ba%14%9B%1D(%2F%87%20%0C%BC%11%E2%AAQ%01%83%13n%DC%C0%B1%A8%00%90%01%04%F6)r%81%A2%22%0A%1A%8AHXt6%D1%E2EEB66%C4%A1p%C2H%02A%246%2Ch%D0%05%A5C%14T%3E*%10%C4%1F%AFB%24%5E%A0%00%B2IcE%93%C3%04%08%C2aQ%26%A3%09%15_%60%CCy%83R%C8%8A7%1D)%200%80%84%20%02%15y%EA%BA%01Dh%A5%02%07%05%DD%C8%3A(%2CK%00HQ%10%3C%5B%A8%00%89%A8l%08%E3%CA%9DK%B7%EE%A8%40%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%86.%2Bl%0A%8F%8D%25%11T3%95%8B%20%26%11M%23%02%9B%89%1Ds%9Fb%20%82%20%2F%0F%95Ol(%82%0At%11Pk%A2%0B_nQR%8E%13%5E%3FHi%00%02%0D%11It%00%0A_egrN%BE%2B%16EN%04%00u%60%11l%00%3Fv%CEVu%8E%20So%0E6%5B%00%05%2F%B1%02FfrpF%14%8F%14jo%25%BD%85G%F0F%24%9B%20A%82%1C%A2%F0%C6%82%90Q%8D%40P(%D0%88%04%01%02%13%16%15h%D1%82%40%87E%14PhDAC%11%89%8D%1C0n%E4%A8H%08HF%0Fn%DC%88%A8%A8%00%0E%02%40.2b%88%B0Q%01%172%0DQ%98%B7%A9%40%10%14%2F%5C%18%22%B1%0E%C8%A6%8F%1AY%82%10%05%00%C7F%9E%8E%1Eh%7C%D1%91%E8%8D%8B%265%0A%7D%04%82%C0%00%7F%00%08h4%0A%60%C1%0D%20L%2B%D1%04pc%EC%A0%B55%14%01L%D0x0%AE%A1%02%24%B6%DA%DD%CB%B7%AF%DF%BF%7D%03%01%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%86%05%03%03%8F%8El%23m2%94%8B%20%0Cmc%07%05%9A%89%0Aw%9E_%20%82%202C%14%8F%24(%0F%A9%9D%5Ct%02%00%24%1E)nG%8E%0Aj1%17%93%02Gm%5C%12%00%0A%150hvc%B6%8C%1D!%AB38%002%23F%99%0E)%CC%3C%3F%8F%1C%2C%06%2B!%00%057%93%05%23nve%1B%AD%8E%20%04%2C%5B%1C%86EWek%24%9A%05%24%0B%87(%5C%F8%E0BT%23%108%F81%22A%80%C0%84E%13%C0%D8%C9%60%60%91%82%17(2%D2P%84%E4%CC%15%1FmP%8D%C2%A8Q%11%016%09X%DC%60%B4%E0%C6%8D%87%8A%0A%E0%20%00D%81%C1%9B%88%0A%B8%E8%80%88%02%3CJ%05%82%A0xQ%B0%10%09%8C%404%BD%CA%08%13%C43%1C%19Q%FCl%F4%20%E3%8B%8DGo%F0%14%12%B5h%3C%027%14%12%C8%98%14%40K%20%CF%80%0E%BAAvP(%9C%82%11%26d%14%02%17%12%09%AFu%F3%EA%DD%CB%B7%AF%A8%40%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%87%20%02%8F%8EAE%3F%40%93%8C%1F%15_%1F%99%8A%02%3F%15%10%0C%92%00%02%09l%1D%8F%05B4%82%02D%A3%07%92BwQ%19H%8FAO!8%00%05%0E%155G%05%209x*)b%A6%8B%02%2F(-S%24%00!wt-%003%B8)X%0E%8F%40(R!7%82%13%98%05t%19)0_%AB%8E%20%1C%E2%0B%86D)%3E%10B%99%AD%AF%86%1Du%2B%5C%7Cj%04b%82%3EFB%08%10%98%B0hB%187%1Ad%2C%02%01%0D%05%8A~%88%F2%E8%D8%98D%81%22%8A%16%2F*%3A%D2%A3d%13%10%8B%16%DC%B8%C1P%D1%03%0FT%A8%84%18%08%AAY%A3%02.%DE%19%A2%40%E1S%81%20(%5E%08%2CD%02%1A%A6I%24B%B6%8C%24%08G%C8%9E%8F%1EX%7C%F1%AA%E8%8DUBB%0E%85G%E0%065%00%04%2C%1EU%09%A4%80%CFA7%C4%0E2Ks%D0%04%8B%07%0F%DB%16*%40b%AB%DC%BBx%F3%EA%DD%8B7%10%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%87%0Ai!%0A%91%8BSH%0C2%97%89%05C%9A%3F%05%82%02%2C2%1D%90%1D%96%00%02%17H96%02%00.G%11M%25%8F%13%2F%03B%00%05uHw%B8%20NTPL%10%B2%8C%057((%2F%14%00%2F%3F%08%2F%00C%5DML%1A3%8F%40%CE(%0F%82%24%E2%05%12%DAx%15%A8%8E%20%1C%CF.%86%5ELx%1E%F0%90%05.%D1%86%1D%5Bu4%9D%8C%40L%E8%C5H%08%01%02%13%16%3Dh%83%81%09%9BE%02%06%80%FB%97%C8%86%1C%2BV%94%80P%14q%A2%22%1BYBj%5Cd%F0FBE%0F%C4%88X%F2%10%E0%A1%02%14%949%C2%B7%CE%10%05%7D%F7%82%BC3D%E2%05%0A%20%91H%80%3B%09B%19%0Ep8%1B%3Dp%F6%E2_%CF%1B%A8%84%80%B3%C7%8E%C0%0D%12%82%088%03%0A%60%C1%0D%1C%A3%22%85%05%D0%EC%E7%A0%B1.'8%23%E8%B2P%01%12T%0A%DB%CA%9DK%B7%AE%DD%B9%81%00%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%88%24%0B%91%8C%1CC37%95%8A%2C%17%0EC%83%02%2Fj%0A%90%20%20%82%05%9D%25%1F%05%004Dmc%1F%8F%24%2F%03B%82i%17D%17%00%02%25F%5C%5D%0D%AE%8D%1C((%2F%14%00%40u%16%1C%00%06%B2%5DK%BE%8E8%C9(%0F%824%24%82Nc%5DT9%A5%8E%20%C8%2F4%86%17d%E4%EB%90%05.%CC%86%0A'%5B%F0%9B%8A%02%0FAB%C6%89%84%10%200a%11%90%1A%1AT%24%F9%92%CF%90%80%01%DA%1A%1A%BAc%A7%22%8F%2B2%12%15%80%98Lb!%04fB%9A%B1c%40%91%0B%027%0A*z%B0!%0A%13%26N%04%E83T%A0%83%CDG%F2%3A%20b1Dg%BC%20%CA%5C%18%22%91%E0K%1B%A1%B5%B4%A9%04!%13%406)%0EP%40z%90L%1D%00%5B7t%0A%D1%96%EB%11%08%94%DF%00%10H%06D%D0%82%1B8%00%E2%1Ct%83%EC%20%B5%FA%13%26%24%EB%3A%B3P%01%12H%EB%EA%DD%CB%B7%AF_%BE%81%00%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%88%20%02%91%8CBO%2C%24%95%8A%04i2%2C%83%05%1C%40%91%20%05%837i%062%82%1Do%1E%26-%8FB%2F7B%82%9D%5BS%00%05%2B%26%10k%0E%8F%1C((%2F%14%00B-%06%13%00j%15%C0b%5B%8F8%C5(%0F%82%0A4%82%0E_kFH%0A%8F%20%C4%2F%DB%85%5B%1Bq6%E7%8F%05.%C8%86%20%2C'%F1%9B%8A%02%0B%40%40%F6%88B%04%04%9A)%E20%87J%12%26bP%24%120%C0Z%BBC9R%A4%C0B%11%C2)D%04%1C*%BA%E3%A6cG%08%8A%5C%10%B8!0%11%0E%08J%94P%99C%E0%9E%A1%02%1Db%5Ed%F4%AE%C3!%10C%86%D8%84T%20%881%17%86%1Ch%D12%06%E8%23%12%D6%04N%12%94%06%8A%1E%1D1%20%3D(f%0E%00%89Z6%85%18%C0%A3%87%08%24%10%235%01%C8%88%82%14%80%052*%94t%87%AA%98Y%5E.%14%07M(v%2Bn%A1%02%24%8C%DA%DD%CB%B7%AF%DF%BF%9B%02%01%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%88%05%91%8D%147%04%0A%94%8A%1C((%1C%84%20%93%90%05%A2%00%04%9D%2F%82%0A%09D%17%99%8E477B%82%A7R%03%00%052G9%07(%8FA%A8%14%00B%03(.%00R6%0C%0D%0D%9F%8E8%9D(%0B%82%20%AFu%CC%26%5E%A5%8C%20%9C%2F%C3%85j%07t%0E%1D%91%05.%E1%85%20O!%E7%9A%8B%02%2488%EB%88.%04%04%13%8B%40%07cd%BA%40%C0%95%E8T'%1A%8A%8E0%89%C2P%83%07E%06Q%20L%94'%83E%8B%0F%13Q%20p%83%9F%A2%09%1E%C8%80%01S%E1Y%3CB%05%3Atx%D5(%1D%BCB%02b%C4x%E9%A8%40%B0%17%C8%0A1%B0%22%C7HNG%24%A4y%04!%40P%98%1DZ%AC%B0%81%F4%00%15B%12%2Fn%9CC%A2%03%A9%03H%208%92%A8%D5%09%08%00%05%0D%DC%88%F18j%D0%8D%AE%83%1E%14%3D%09%60B'Zl%0E%0B%15%20%F13%AE%DD%BBx%F3%EA%A5%14%08%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%0A%40%40%02%93%89%40((%0F%99%83%05%05%83%04%9C%1C%82%05%03S%04%90%1D77B%82%A4(A%82O3%0E%0E4%8F8%9C%2F%1D%00B%03%03%14%00A%2B%0EEU.%8F%13%9C(%0B%82%02%20%82%2C%16EGu%90%20%1C(%2F%C4%85RUy%17%0A%91%05.%DF%85%027%03%E5%9F%89%05B%0F%0F%BF%8A%14%04%04%13%8B%13y5mb%0DV%25%92%85BW%A2%1Fd%BAt%89%10!%87%22%82%06%11%15iB%91%E2%1D%7B%04n%E8S%F4%E0%8E%98%8F9h%BD%A3%A4%C0%5D%A3s%F5%D4m%D9%92%D2Q%81%20%DD%96%15%CA%C3%E3%CA%86%88%8DH8%DB%08%02%13%00%23V%CE%D81%00%E9A%2F%5D%24%5E%DC%F8U%C4JP%2F%DA2%92%88%C5%09%08%00%05%12%B0p1en%D0%8D%AA%83%16L%7B%D7%0C%05%AC%91%84%0A%90%90%89%B6%AD%DB%B7p%04%E36%0A%04%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%0A%408%02%93%898((%0F%99%83%05%05%83%04%9C%1C%83%24%1C%14%90%1D77B%82%A4(A%82%40%2C%06!%90%13%9C%2F%1D%00B%03%03%AA%24!2ul%98%8E%0F%9C(%0B%82%02%20%82%1C%C53%B8%8F%02%1C(%2F%AA%858u%1F%09%D0%90%05.%DB%868A%E1%9F%88%054%24%24%C8%89%14%04%04%13%8B%0BD%07%1E%26H%40%8A%B1(4%14%7D%D8%B0%A6%8DA%24%FE%96%05L%E4%60%CC%980%0Em(%92w%A3%9E%22%12G%BE%7C%99c%03%87%BAB%0A%14%A4c4%AE%97!%0Ao.%98%7CT%20H6%17%86%8E%B8%C12%E7%D5%23%12%CB%2C%82%08(%80%0B%0F4%3E%E8(x%A4%2C%5B%40%12%2F%BE%B0%01%80%84%07%8F%2BXN%3C%02A%E0%06%09X(%3C%90)%A0%E0K%99%A7%5E%22%89%12t%03%05%91%AD%00hx%C0%A2d%C0'%5D%17%14%88%80%E2p%F5S%01%12%0BF~%DC%CB%B7%AF%DF%BF%90%02%01%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%02%13%0B%05%93%898((%0B%99%83%98%83%04%9C%1C%83%14.%91%1D%047B%82%A3(A%82%13%2F(8%90%13%9C%2F%1D%00B%03%03%14%BC%9C-%2F%90%0B%9C%9D%82%02%20%B2(-j%40%90%05%1C(%2F%C0%85B-S(%A1%8F%05.%D6%86B%97%9F%8B%A7%1D%DC%88%14%04%04%13%8BB%2BEN6%1F%AD%89%AF(4%8A1%07%0D%15%15%1E%5B%14%DD%CB%97%E8%C2%97%83%07c(Rw%A3%9D%22!D%24%DC%B9%E3%00%159B%202vs%B1%CB%90%8B%15l%3Av%0BB%CD%22!%1B%19440%D9%88%C41%87OJ)%E0%82E%05%9E%03%22%19%3D%C8%95%0F%88%0A4%01%AB%F8%C0%82%01%8F%97G%20V%91%10%F4B%C5%8E1%05%40x%18%8Aa%84%80h%83Z%F8%D8A%06%93%10%08%3ER%FC%F8%F4%E2%8A%8E%22%A6%D8%84%FCD%E1H%95%9C%17%08%E3%CA%9DK%B7.%A4%40%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%05%24%24%93%8A8((%0B%98%88%04%9B%1C%83%1D%1D%91%0A%1C%04B%82%A0(A%82%13%2F%2F%97%8F%0F%9B%2F%A5B%03%03%14%00B%9B%AD%90%0B%BF%9D%00%02%20%AF%BF%AA%8F%05%1C(%2F%BC%85%BE(8%92%05.%D0%86%144%9E%8C%0A%14%C7%8B%14%04%04%13%8B%1DS%2B%1F%2BR%8B%AC(%DB%89%2CUEHH%3F%F0%9F%BF%F8%87S%0C%FE%0C6%5C(%12w%A3%DC%C07Hl%10a%C7%AD%90%00%05%02%96%B9(e%88F%0C%19%0A%22%15%08%E2L%60%A1%1FM%22%20%D8%C7%88%C4%AFr%02Z%B8%02!F%03%14*y(6%AA%E5l%5B%0E9X%0C%00p%20BC%12*%2B%1E%81%20p%E3%12%05%15%3A%E0%18)%00BB%CF%24%26%0A%40%92%0A%80%04%8C%A4a%A4%BA%F0%20%22%8A%05Om%92%FE%18D%C1%00FO%13%8E%FC%90%D9%B0%AD%DB%B7p%04%E3F%0A%04%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%05%24%24%93%8A%13((%0B%98%88%04%9B%1C%83%20%20%91%0A%1C%04B%82%A0(A%82%0F%2F%034%90%0F%9B%2F%1D%00B%037%14%B9%9B(8%90%0B%BF%9D%00%02%02%82%9A%9B%AA%8F%05%1C(%2F%BD%85B%9B%C1%91%05.%D2%86%14%B3%9E%8B%02%20%05%8C%14%04%04%13%DF%2Fj%09%2C%CC%89%AC(%DD%887uC%17%17'%8B%EF%F1%87R%16%FE%16%06%16Q%E0p%E3%9C%A2%0E%06f%BC%89q%C9%5B!%01%E2%9A%B9%C0e%88%86%0C5%A5%20%15%08%02%CD%85!%2Fc%DAT%D1%D6%88%C4%AFs%02%9E%00%01%00%E2K%04.q%AA(xT%0B%DA%2C%04%3CD%E0%FB%40%25%02%9881%1E%81%20p%E3%12%05%3CV%CAl(%00%22%8F%12%9F9%22%3A%8A(%04C%D26%E2h%DC%A1%D2%E5%8D%A7%11Vx%94%18%D4!%CD%94%99%98%26%D8p%80%D6%A1%DB%B7p%05%E3%CA%95%14%08%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%05%24B%93%8A%0F((%0B%98%88%04%9B%1C%83%20%05%91%0A%1C%04%97%00%A0(A%82%0F%2F7%1D%90%9A(%2F%B3B%037%14%00B%9B(%0F%90%0B%BF%9D%00%02%02%82%13%BF%AA%8E%05%1C%B6%BC%85B%2F(8%92%05.%D1%86%1D4%9E%8C%05%A5%8C%14%04%04%13%8B%05%40%03%03%40%C8%8A%AC(%DD%89%0FO-ii%D6%EE%BF%F1%88A2%FE2%AE%14Q%E0p%C3%9C%22%10-N%9C%90%02%C2%9B!p%90%B0%CD%DA%C6%E2I%C3%88APH%09a%E8%02%04%0F%1F%26%3Ar%B1%E9%C8%1Cc!P%18%3B%D0%A6%06%9D%0F%17%1Biz%83%C5%0B%00'%3E%F0%18%000%24N%9B%11s%12%3C%02%F1B%0C%03%01%14%92%D8%81a%C2X%950%3F%7F%40%12P%0C%07%16%3B%3E%DA%20%A3%E0%C4H%9B%18%98%16%A8%C0%AAU%90%82%8D1%23QPb%C7%CD%1D%87%85%10.%E0%A1%92%06n%A1%07%24%EC%EA%DD%CB%97P%20%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%05%24.%93%8A%0F((%24%98%88%04%9B%1C%83%02%05%91%0A%1C%04B%82%A0(A%82%0F%03%04%20%90%9A(%2F%1D%00B%037%14%B9%9B(%0B%90%0B%BF%C1%00%A4%82%13%BF%AA%8F%05%1C%B6%BD%85B%2F(8%92%05.%D0%86%1D4%9E%8C%A5%8D%14%04%04%13%8B%05%40%BB%D5%8B%AC(%DC%89%C3%BF%D9%9F%BF%ED%88%EF%9B%F1%87%14%1C7%E4%8A%05A%2F%06%A4%EBF%F0Z%10%01%86%40%A0%B8%81%10R%B3%22X~%18%92%C1%C0%C6%16%05%90%84%200%B3%03%82%B14%2F%8C9%A9p%E7%08%9B%86%8DfX%E9%01g%06%80%22%19%94%24%00%60%60%0E%C9%3C-%1E%A5%C9%E0%26%8F%80%0EKR%E0%B9c%CC%CB%1C%0F%12%D8%40%22%F1%40%10%09%26)D%7C)%D5%C1%82%89%3BR0%3D%8DZ%E3%9B%80%1B%AE0%B9h%92%22%83%09%82%85%3CD%7D%83%96%D0%82%12o%080%B6%9DK%B7%AE%A0%40%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%05B.%93%8A%0F((%24%98%88%04%9B%1C%83%05%92%0A%1C%04B%82%A0(A%82%0F%03%1C%02%90%9A(%2F%1D%00B%037%14%B8%9B(%A9%8F%0B%BE%0B%82%02%A4%00%13%BE%BC%8F%05%1C%B5%CB%84B%2F(8%92%05.%D0%85%1D4%9E%8C%C7%8C%14%04%04%13%8B%05%40%BA%C4%8B%AB(%DC%89%C2%9B%B6%EA%BE%ED%88B%BE%F1%8A%14%1C7%E4%8A%058%048%00%EBF%10H%09%19%B2%0A%09%08%82%E3%9B%A3%09Iz%C8)a(%84%83%15i%12%3A%AA%B2C%07%9C9%00%04%3C%B9!h%86%8D%12%1FZ%402%A1%23K%99%15%00%884%19%C3%02%80%1A%046%88%7Cx%F0%A8%85%86%14N%04t%18%13e%89%13%00%05%EA%E0%24%02%04%92%90tB%96D%A1r%80%14%88-%3F%0C%80%C0%145%8A%92%0A%DFny%A2A%C6%EB%1D%82%85%EEx%AD%83%96%10%89%0Fu%08%B6%B6%9DK%B7%AE%A0%40%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%05B.%93%8A%0F((%24%98%88%04%9B%1C%83%05%92%0A%1C%04B%82%A0(A%82%0B7A%02%90%9A(%2F%1D%00B%037%14%B8%9B(%A9%8F%0B%BE%0B%82%02%A4%00%13%BE%BC%8F%05%1C%B5%CB%84B%2F(8%92%05.%D0%85%1D4%9E%8C%C7%8C%14%04%04%13%8B%05%40%BA%9D%8B%AB(%DC%89%C2%9B%03%B2%8A%EB%ED%88B%BE%F1%8B%14%1C7%E4%8A%058%08p%A8%D7%AD%1B%0E%07'%E4%15%22q)%D2%04%25YxX0tC%06%8B%20%DF%1A%1D%81%23%A7L%05%00%05%5E%B4%02pb%C5%96)%23%1Dy%90c%C6%CD%10%00%5E%B8%D4x%02%40%8A%85%15l%D4%80x%F4%04%0A%9E%22%02%14%AC%E9b%A4%04%C8)%5EV%9C%D8%F9H%081%00.%C2t%89s%84%94%80%17%09%AAar%11%A7K%98%3C%19%BB%D1%10%E3%D5F%C1BG%BC%1A8%1B%ED%82%01%A6l%06%E3%CA%9D%0B%20%10%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%05B.%93%8A%0F((%24%98%88%04%9B%1C%83%05%92%0A%1C%04B%82%A0(A%82%0B7%40%A4%8F%9A(%2F%1D%00B%037%14%B8%9B(%BC%8F%0B%BE%0B%82%02%B2%13%BE%C0%8E%05%1C%B5%CA%83B%2F(8%92%05.%CF%84%1D4%9E%8C%B2%8C%14%04%04%13%8B%05%40%BA%A9%8B%AB(%DB%89%24%BE7%DE%88%03j%091%9D%89B%EF%F1%87-aM%26%B7%12%15%C0A%20%08%BBE%1D%84%EC%E3F%08%07%91!%20%0E%B9%B8%14)H%173n%1C%18%A2%15%EB%11%890e%AE%F8%90%00%A0%00%01j%00P%84%90%82%E2%C1%23%07!%DD%A8X%01%E0B%0D%09%03%00%049%B1%92%C0%23%09v%DC%A4%C8%23%40%81%895%26h%A6%E4)%CA%91%94%08Q%8A%DC%A2Qc%0D%1D%8D%25%81%00Q%00%C9%C58A4%20%AC%99C%84!!%0As%D6%7C%B1%60%96%90%03%B5j%0D%DA%0E%A2%20%83%85%00%B9x%F3%E6%0D%04%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%05B.%93%8A%0F((%24%98%88%04%9B%1C%83%05%92%0A%1C%04B%82%A0(A%82%0B7%40%A4%8F%9A(%2F%1D%00B%037%14%B8%9B(%BC%8F%0B%BE%0B%82%02%B2%13%BE%C0%8E%05%1C%B5%CA%83B%2F(8%92%05.%CF%84%1D4%9E%8C%B2%8C%B97%13%8B%05%40%BA%97%8AB%60J5%127%8A%24%BE%04%8B%24)%3D%3D%3B%1F%E8%F1%8C%17L)5%D8%0A%15%C0A%20H%C0C%1D%5Cx%E3fh%82%85%18%20%0E%B98%07%09%C8%18%1F*%F2%15%82%87%22%D6%23!m%7C%A4%10%91%07%009b%00%80%0C%7B%E4%04%C6H(u%00l%91P%A5%15G%14%A2%1A%81%E0%92%22C%14%07%05%400h%E0%E4%84%A0%09%D2%1E%3Cb%90A%83%93%88%14%244%C8%13S%10%05%8A%8D(%C88%A1%C0%EA%9D%06%08%860%24%04%22%0F%D8-c%09%198%E0%24gZ%93%1C%07%A8%BD%9DK%97n%20%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%05B.%93%8A%0F((%24%98%88%04%9B%1C%9E%00%0AA%04B%82%A0(A%82%24%04%40%05%90%9A(%2F%1D%00B%037%14%B7%9B(%BB%8F%0B%BD%0B%82%02%B1%00%13%BD%BF%8E%05%1C%B4%CA%83B%2F(8%92%05.%CF%84%1D4%91B%A8%8D%C6%8C%2B%180k%9D%89%05%40%B9%DB%8AB%18%3B%EFo%8A%24%BD%04%8B%24%19YYp3%EC%BD%A2%8BC%9A%88%98%83%ADP%01%1C%04%82%14%3C%A4%C0%05%B8Q%86%1E%CC0%00%E2%10%85%85%8Bp%B4%11%01%E5%82!%12%D2%60%3D%12%02%01%0F%13*UZ%5D%02%00D%D8%A3*%26%95p1%00%40%CD%8F!%C3%84%F4%02%E2%08D%1B%26M%BA%CC(%20%80H%91%19R%04%3Dx%F1%C2%5B%23'M%22%10%A9H%C3F%91%0F%2C%06uP%00%A9%C3%145%5C%01t(R%C4%8B%1A%88%84%04%7C(b%01%05ZB8%0D.%24X%F7V%D0%C3%BAx%F3%D6%0D%04%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%05B.%93%8A%0F((%24%98%88%04%9B%1C%9E%00%0AA%04B%82%A0(A%82%24%04%40%05%90%9A(%2F%1D%00B%037%14%B7%9B(%BB%8F%0B%BD%0B%82%02%B1%00%13%BD%BF%8E%05%1C%B4%CA%83B%2F(8%92%05.%CF%84%1D4%91.%A8%8D%C6%8CC%22%18%23%9D%89%05%40%03%04%D8%86BxVpp%17%8A%24%BD%A2%8ABQffeo%F8%F6%8CbtI%E2%81%1D%25%1C%04%82%184%A4%80%06%B8Q%86%16%5CH%20%E0%10%85%85%8A%26%CCQ%C2%85%8D!%12%D2%80%40rQ%81%0A%998%5E%04%D1P%20%08H%2Fo%8D%1C%2C!%13f%84%1A%00Rb%A4%D9%25%A4%D7%04G%20%E6%D0%5C%13%A3%80%80!C%D4P%03%F0%E0%C5%00%8C%86%88%84i%F3%A6b%87%19C%A6%DC%23%05%02R%87%10-%8C%81%B80%24%C1V%88%82X%0C91%0C%ED%20%057%0A~%BA%9DK%B7%AE%5DC%81%00%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%05B.%93%8A%0F((%24%98%88%04%9B%1C%9E%00%0AA%04B%82%A0(A%82%24%04%40%05%902-(%2F%1D%00B%037%14%B8%9B(%BC%8F9%10%B4%0B%82%02%B1%00%13%BE%C0%8E%40P_O%CC%83B%2F(8%928%0E%C5%87%1D4%8F%05.%24B%02%8D%C8%8A%24_%1A%19%22%1B%A8%89%05%40%03%04%B7%89%5Evv%3C%3Ce%0E%E7%BE%A2%893%DC%08%14%E8E%91%10_%AC%12%91%A0%D3%04%CA%92%06%97%DE%E1x%A5%60Q%25%12%11G!%22%C1%26%049C%14%A49Zp%20N%8D%04%86HT%03%02%89%06%828%1B%E8%D4%11%A4%00%84%20%20%BE%DC5zcd%C3%1C%09O%00%04y2%E0%D6%C1M%DB%18%09%90%B0%E1K%85%13%00%0A%B0%A0%C5%12%C0%03y%15%1D%CDp%CA%86%9C%005%B4%FE%018%06I%81%94%17%C8%0A%A4%A1%AA%B1%10%90'%2F%0DD%B6%A5%90%B5%AD%DD%BBx%F3*%0A%04%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%05B.%93%8A%0F((%24%98%83%1D%05%83%04%9B%1C%9E%00iM%3FB%82%A3(A%82%24%04%40%A1%8Fs%3D)%06%1D%00B%037%14%BB%9B(%BF%8F%12%3B%3DF%0F%82%02%B4%13%C1%C3%8E8I%3BeO%86B%2F(8%928%3Fl%B4%85%1D4%8F%054%96%02%8D%DF%89%2C%1BMLI_%9D%89%05%40%03%04%BA%88%20FX%FB00H%8A%24%82%BD%C2%B7!%83A%83%0E%14%09%09%06DQ%8B%0Dd%C8%8Ca%10%0FQ%01%1C%B2%40%2C%02!D%888S%89%5C%24x%92n%10%85g%8FH8%99s%A7%85!%12%D8%1A%3E%A2P%85%CE%81%3C%09%04%81%D0%08%00G%B0%8F%8D%D8%988%80%E0%C7%0D%000%07%E8Z%B8i%C1%23%22%07%18%20q%09%A0%95%CC%05%F5x6R%93%A7%88%9AP%05nl%1A%08%A0%40IF%13%92%89%DA%A4%0D%24!%5E%04%0D%14%B8-dv%AE%DD%BBx%F3%1E%0A%04%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%05B.%93%8A%0F((%24%98%83%14B%83%04%9B%1C%9E%00-M)E%82%A3(A%82%24%04%40%05%90%1EY%3AV%06%00B%037%14%BB%9B(%BF%8F%0CpZ%3B%12%82%02%B4%00%13%C1%C3%8E8Tpg%17%86B%2F(8%92%13%25%5B%CC%85%1D4%8F%054B4%E0%8A%E9%88isdK%11%1E%A1%89%05%40%03%04%1D%89%205QQ%1A%1Ax%88(%22%11%EC%15%22%01t%9A(T8C%91%90%60%40%14I1%D1%A6%CD%08%1B%F3%10%15%C0!%0B%C4%22%10.%5C%403u%88F%9A%1B%EB%04Q%18%E9%C8%85%85%3C%3Fn%18%22%91-%E2%23%10o%8ET%F9%80B%10%08%8F%00p%04%1B%E7%08%85%93*%5Eb%3C%00%40s%40%BE%87%9B%3A%15%ADb%E1%C2%00V%9Bl.%B8%07%B4%91%82%13ld%02(pc%93%C1%B1)%19%09%20%C4a%D3%02%92%85%0E(p%E0%D0%15%AE%DD%BBx%F3%EA%5D%14%08%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%05B.%93%8A%0F((%24%98%834B%83%04%9B%1C%9E%00-P%19U%82%A3(A%82%24%04%40%05%90%07fVe2%00B%037%14%BB%9B(%BF%8FG%3CgV9%82%02%B4%00%13%C1%C3%8E%13d%3Cvu%86B%2F(8%92%13%5E2%CC%85%1D4%8F%05%14.4%E0%8A%E9%88R%07baq9%E3%89%05%40%03%04%0A%89%02%15%5D%5D%11KK.(%22%11%0C%88%BE%3Bc%12%26%1C%A2HHAE%03%18%980%D1%C0%C1%3CD%05p%C8%02%B1H%00%05%1A%1DL)%EA%F0%C2%E0!%0A%D0%1EQ%88%E1%85%CD%03C%24%B2%99%7Ct%E2C%9D)%DB%00%80%E0%08%00%C7%B3G%24V%D49%F1d%5C%CC%01!%1Dn%BA%E4%C8%05%1B%19i%5E%02her%C1%8D%20%02%20%D9%EB%04%A0%C0%8DM%AF%04%AD%9B%14d%D3%02%91%85%14%04%990%16%AD%DB%B7p%05%E3%CAE%14%08%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%0F%17.%93%84%0B%13%84_MR%24%98%00SIx%25%82%14*JR%1C%A1%15nWnD%00%14%19d(A%82%24%04%40%05%8FN0nvh%06%00Nm7%14%00B(%CC%C9%8E%0Fa0h%3C%15%82%13%BD%00%13%CC(%CE%8E7%D1%3E%16%86B%2F(8%92%0F%1F%17%02%87%1D4%90%EE%14%D8%8B%F3%89%2FGs%10%10N%EF%89%05%40%03%08(H%24%20%CF%9A6m%C4%18a%A3%88%C46%20%FE%90%7C%998%91X%A2e%CC%20%26%E2P%05%01%02'%17%BA%1D*%80c%17%88E%02%3AP%18%18J%91%02%1CB%10Q%10%E9%08D%88%04O.%15%22QN%E3%A3%17S%9E%A0%D8%04%00%C4I%008%B6%D1t%19B%E8%8Bw%3C%07tP%B6Mg%A3%02%03P%BC%00%05%80%40FA%0Bn%E0%A8%C7H%C1%02%AB7%98%E1%12Dv%12%10f%0B%0FZ%1A%120%E1%9A%DC%BBx%F3%EA%DD%8B)%10%00!%F9%04%09%05%00%00%00%2C%00%00%00%00%20%00%20%00%00%07%FF%80%00%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%84%0BE3%0A%93%82B%17!%84t%3B%3AG%99%02%07%18%22%16%82%14x%3B%3D%26%994%5C%19)*%0E%00%14%1A%ACD%82%24%04%40%05%8F%0C%1A%19X%182%006%3CX(%00B(%CE%14%8F%13%1B%1A*0%12%82%04%0F%82%13%CE(%D0%8F%1C%23%1A%223%86B%2F(8%92%24%2B1%02%87%1D4%90%0A%14%1D%BF%8C%F7%8AB%169%12%12%25%DF%10%15%002%80%00%A6DC%1AT%F0%E0%C1D%02E%24%BA%01Q%14%83%81E%8B%2C%F4IT%E4%82%8D%03%07%1FNtPT%00G%2F%10%8C%14(%40%99i%91%00%17%23%0FQ%08%F8%A8%00%07%14%2F%5C%18%22%81n%22%24n%CE%26%08%02%C1%12G7%9A%8C%088%7B!%8F%E7%80%91%CD%9EA%02%82%93%046g%3E%17%DCP%07%A9%80%8B%83%00n8%0B2(_K%A3(%AC%B64%24%E0%81%DA%B5p%07%E3%CA%9DKWn%20%00%3B%00%00%00%00%00%00%00%00%00\"/>";

/**
 * Username/Password functions.
 */ 
var GIXEN_USERNAME = "Gixen_Username";
var GIXEN_PASSWORD = "Gixen_Password";
var GIXEN_ADVANCED_SETTINGS = "Gixen_Advanced_Settings";

function getGixenUsername() {
	return GM_getValue(GIXEN_USERNAME, "");
}

function getGixenPassword() {
	return GM_getValue(GIXEN_PASSWORD, "");
}

function setGixenUsername(value) {
	GM_setValue(GIXEN_USERNAME, value);
}

function setGixenPassword(value) {
	GM_setValue(GIXEN_PASSWORD, value);
}

function clearGixenPrivateData() {
	setGixenUsername("");
	setGixenPassword("");
}

function setUseAdvancedSettings(value) {
    GM_setValue(GIXEN_ADVANCED_SETTINGS, value);
}

function getUseAdvancedSettings() {
    return GM_getValue(GIXEN_ADVANCED_SETTINGS, false);
}

function toggleAdvancedBiddingOptions() {
    setUseAdvancedSettings(!getUseAdvancedSettings());
    document.location = document.location;
}

function setGixenPrivateData(username, password) {
	setGixenUsername(username);
	setGixenPassword(password);
}

function checkGixenUsernamePasswordAvailable() {
	return getGixenPassword() !== "" && getGixenUsername() !== "";
}

function getItemCurrencyRepresentation() {
	return getMaxbidNode().parentNode.parentNode.firstChild.firstChild.textContent;
}

function safeFunctionCall(toWrap) {
	return function() {
		try {
			var args = arguments;
			return toWrap.apply(this, args);
		} catch (err) {
			GM_LOG("Error: " + err);
			throw err;
		}
	};
}

function getMaxbidNode() {
	// Old-style
	var node = document.getElementById('maxbid');
	if (node !== null) {
		return node;
	}
	
	// New-style
	var elements = document.getElementsByName('maxbid');
	if (elements.length !== 1) {
	  return null;
	}
	return elements[0];
}

var gixenInfo = new Object;

function addGixenSubmitBidLink() {
	GM_addStyle(
		"a.GM_GixenButton {" + 
			"color: black ! important;" +
			"padding: 3px 10px;" + 
			"-moz-border-radius: 5px;" +
			"border-style: outset;" + 
			"border-width: 2px;" +
			"background: #999999;" +
			"border-color: #666666;" +
		"}" + 
		"a:visited.GM_GixenButton {" + 
			"color: black ! important;" +
		"}" +
		"a.GM_GixenButtonGo {" +
			"background: #99ff99;" +
			"border-color: #00aa00;" +
		"}" +
		"a:hover.GM_GixenButtonGo {" +
			"background: #77dd77;" +
			"border-color: #004400" +
		"}" +
		"a.GM_GixenButtonStop {" +
			"background: #ff9999;" +
			"border-color: #aa0000;" +
		"}" +
		"a:hover.GM_GixenButtonStop {" +
			"background: #e67d7d;" +
			"border-color: #440000;" +
		"}" +
		"a.GM_GixenButtonDisabled {" +
			"background: #999999;" +
			"border-color: #666666;" +
		"}" +
		"a:link.GM_GixenButton, a:visited.GM_GixenButton, a:active.GM_GixenButton, a:hover.GM_GixenButton {" +
			"color: black ! important;" +
			"text-decoration: none;" +
		"}" +
		"#GM_Gixen_Current_Snipe_Outer {" +
			"min-height: 32px;" + 
			"line-height: 32px;" + 
			"vertical-align: middle;" +
		"}" +
		"#GM_Gixen_Buttons_Div {" + 
			"padding: 5px 0px;" +
		"}" + 
		".GM_Gixen_Error {" +
			"font-weight: bold;" + 
			"color: red; " +
		"}"
	);
	
	GM_LOG("Performing gixen bid node add");
	
	var maxBidNode = document.getElementById("DetailsActionMaxBid");
	var addAfterNode;
	
	// Old style ebay pages
	if (maxBidNode !== null) {
	  addAfterNode = maxBidNode.parentNode.parentNode.parentNode;
	} else {
		// New style ebay pages
	  maxBidNode = getMaxbidNode();
	  if (maxBidNode === null) {
	    // Buy it now item
	    GM_LOG("Item is buy it now only");
	    return;
	  }
	  addAfterNode = maxBidNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling;
	}
	
	var hasPrivateData = checkGixenUsernamePasswordAvailable();
	
	var gixenRow = document.createElement("tr");
	gixenRow.setAttribute("id", "GM_Gixen_Top_Row");
	gixenRow.setAttribute("class", "vi-is1-solidBg");
	
	var labelTd = document.createElement("td");
	//labelTd.setAttribute("valign", "top");
	labelTd.setAttribute("class", "vi-is1-lblp");
	labelTd.innerHTML= "Gixen:";
	
	var gixenBidTd = document.createElement("td");
	gixenBidTd.setAttribute("class", "vi-is1-solid");
	gixenBidTd.setAttribute("colspan", "3");
	
	if (hasPrivateData) {
		GM_registerMenuCommand("Gixen snipe from Ebay: Clear username/password", clearGixenPrivateData);
		GM_registerMenuCommand("Gixen snipe from Ebay: Show/hide advanced bidding options", toggleAdvancedBiddingOptions);
		gixenBidTd.innerHTML = 
			"<table id='GM_Gixen_Main' class='' cellspacing='0' cellpadding='0'><tbody>" + 
				"<tr>" + 
					"<td style='vertical-align:middle'>" + 
						"<div id='GM_Gixen_Current_Snipe_Outer'>" +
							"<div id='GM_Gixen_Current_Snipe'>" +
								WORKING_IMAGE_HTML + 
							"</div>" +
						"</div>" +
					"</td>" +
					"<td>" + 				
					"</td>" +
				"</tr>" +
				"<tr style='display:" +(getUseAdvancedSettings() ? "block" : "none") + "'>" + 
				    "<td>" +
				        "Bid Group: " + 
				        "<select id='GM_Gixen_BidGroup'>" +
				            "<option value='0' selected='selected'>-</option>" + 
				            "<option value='1'>1</option>" +
				            "<option value='2'>2</option>" +
				            "<option value='3'>3</option>" +
				            "<option value='4'>4</option>" +
				            "<option value='5'>5</option>" +
				            "<option value='6'>6</option>" +
				            "<option value='7'>7</option>" +
				            "<option value='8'>8</option>" +
				            "<option value='9'>9</option>" +
				        "</select>" +
				    "</td>" +
				"</tr>" +
				"<tr style='display:" +(getUseAdvancedSettings() ? "block" : "none") + "'>" + 
				    "<td>" +
				        "Main offset: " +
				        "<select id='GM_Gixen_SnipeOffsetMain'>" + 
				            "<option value='3'>3</option>" + 
				            "<option value='6' selected='selected'>6</option>" + 
				            "<option value='8'>8</option>" + 
				            "<option value='10'>10</option>" + 
				            "<option value='12'>12</option>" + 
				            "<option value='15'>15</option>" + 
				        "</select>" + 
				    "</td>" +
				"</tr>" +
				"<tr style='display:" +(getUseAdvancedSettings() ? "block" : "none") + "'>" + 
				    "<td>" +
				        "Mirror offset: " +
				        "<select id='GM_Gixen_SnipeOffsetMirror'>" + 
				            "<option value='3'>3</option>" + 
				            "<option value='6' selected='selected'>6</option>" + 
				            "<option value='8'>8</option>" + 
				            "<option value='10'>10</option>" + 
				            "<option value='12'>12</option>" + 
				            "<option value='15'>15</option>" + 
				        "</select>" + 
				    "</td>" +
				"</tr>" +
				"<tr style='display:" +(getUseAdvancedSettings() ? "block" : "none") + "'>" + 
				    "<td>" +
				        "Quantity: " +
				        "<input id='GM_Gixen_Quantity' type='text' value='1' size='3'/>" +
				    "</td>" +
				"</tr>" +
				"<tr>" + 
					"<td>" + 
						"<div id='GM_Gixen_Buttons_Div'>" + 
							"<a id='GM_Gixen_Place_Snipe' class='GM_GixenButton'>" +
								"<span>Place Snipe</span>" +
							"</a> " +
							"<a id='GM_Gixen_Cancel_Snipe' class='GM_GixenButton'>" + 
								"<span>Cancel Snipe</span>" +
							"</a>" + 
						"</div>" + 
					"</td>" +
					"<td>" + 				
					"</td>" +
				"</tr>" +
			"</table>";
	} else {
		gixenBidTd.innerHTML = 
			"<div id='GM_Gixen_Buttons_Div'>" + 
				"<a id='GM_GixenButtonEnable' href='javascript:'>" + 
					"<span>Enable Gixen Support</span>" + 
				"</a>" + 
			"</div>";
	}
	
	gixenRow.appendChild(labelTd);
	gixenRow.appendChild(gixenBidTd);

	addAfterNode.parentNode.insertBefore(gixenRow, addAfterNode.nextSibling);
	
	if (hasPrivateData) {
		getGixenBids(updateGixenBids, gixenFailureHandler);
	} else {
		addSignInClickHandler("GM_GixenButtonEnable");
	}
	
	var spacingRow = document.createElement("tr");
	var spacingTd = document.createElement("td");
	spacingRow.setAttribute("class", "vi-is1-solidBg");
	spacingTd.setAttribute("height", "10");
	spacingTd.setAttribute("colspan", "4");
	spacingRow.appendChild(spacingTd);
	addAfterNode.parentNode.insertBefore(spacingRow, addAfterNode.nextSibling);
}

function addSignInClickHandler(id) {
	var linkNode = document.getElementById(id);
	linkNode.addEventListener("click", safeFunctionCall(doSignInRedirect), false);
}

function gixenFailureHandler(message) {
	GM_LOG("Gixen error message: '" + message + "'");
	var html = "<span class='GM_Gixen_Error'>Error: " + message + "</span> ";
	if (message == "COULD NOT LOG IN") {
		updateGixenVisibleSnipe(html + "<a id='GM_GixenButtonSignIn' href='javascript:'><span>Sign In</span></a>");
		clearGixenPrivateData();
		addSignInClickHandler("GM_GixenButtonSignIn");
	} else if (message == "NON SUBSCRIBER") {
		updateGixenVisibleSnipe(html + " <span><a href='https://www.gixen.com/index.php'>Signup for gixen mirror!</a></span>");
	} else  {
		updateGixenVisibleSnipe(html);
	}
	disableGixenCancelSnipeButton();
	disableGixenPlaceSnipeButton();
}

function getGixenError(gixenHtml) {
	var regex = /<body>ERROR.*:\s*(.*)/g;
	if (gixenHtml.match(regex)) {
		return regex.exec(gixenHtml)[1];
	} else {
		return "Unknown error";
	}
}

function doSignInRedirect() {
	// Make background request to signin page.  This signs the user out (if they are signed in).
	// When that finishes, direct the browser to the signin page.
	// TODO: handle TLD correctly
	GM_xmlhttpRequest({
		method : "GET",
		url : "https://signin.ebay.com/ws/eBayISAPI.dll?SignIn",
		onload : safeFunctionCall(function(response) {
			window.location.href = "https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&ru=" + encodeURIComponent(window.location.href);
		})
	});
}

function cancelGixenBidInternal(successCallback, errorCallback) {
	GM_xmlhttpRequest({
		method : "POST",
		url : getGixenApiUrl({ditemid: itemNumber}),
		onload : safeFunctionCall(function(response) {
			if (response.responseText.match(/OK.*DELETED/g)) {
				gixenInfo.mainInfo = null;
				gixenInfo.mirrorInfo = null;
				successCallback();
			} else {
				GM_LOG("Gixen response: " + response.responseText);
				errorCallback(getGixenError(response.responseText));
			}
		})
	});
}

function cancelGixenBid() {	
	updateGixenVisibleSnipe(WORKING_IMAGE_HTML);
	
	disableGixenPlaceSnipeButton();
	disableGixenCancelSnipeButton();
	
	cancelGixenBidInternal(function() {
		updateGixenVisibleSnipe(NO_SNIPE_HTML);
		enableGixenPlaceSnipeButton();
		disableGixenCancelSnipeButton();
	}, gixenFailureHandler);
}

function safeCancelGixenBid() {
	return safeFunctionCall(cancelGixenBid)();
}

function placeGixenBidInternal(maxbid, bidGroup, mainOffset, mirrorOffset, quantity, successCallback, errorCallback) {
	GM_xmlhttpRequest({
		method : "POST",
		url : getGixenApiUrl({itemid:itemNumber, maxbid:maxbid, snipegroup:bidGroup, quantity:quantity, bidoffset:mainOffset, bidoffsetmirror:mirrorOffset }),
		onload : safeFunctionCall(function(response) {
			if (response.responseText.match(/OK.*ADDED/g)) {
				gixenInfo.mainInfo = { 
					itemNumber: itemNumber,
					maxbid: maxbid,
					group: bidGroup,
					quantity: quantity,
					offset: mainOffset,
				};
				gixenInfo.mirrorInfo = { 
					itemNumber: itemNumber,
					maxbid: maxbid,
					group: bidGroup,
					quantity: quantity,
					offset: mirrorOffset,
				};
				successCallback();
			} else {
				GM_LOG("Gixen response: " + response.responseText);
				errorCallback(getGixenError(response.responseText));
			}
		})
	});
}

function placeGixenBid() {
	var maxbid = getMaxbidNode().value;
	GM_LOG("maxbid: " + maxbid);
	if (!maxbid.match(/(\d+)([.,]\d{0,2})?/g)) {
		alert("Invalid snipe amount");
		return;
	}
	var mainOffsetNode = document.getElementById("GM_Gixen_SnipeOffsetMain");
	var mainOffset = mainOffsetNode.options[mainOffsetNode.selectedIndex].value;
	GM_LOG("mainOffset: " + mainOffset);
	
	var mirrorOffsetNode = document.getElementById("GM_Gixen_SnipeOffsetMirror");
	var mirrorOffset = mirrorOffsetNode.options[mirrorOffsetNode.selectedIndex].value;
	GM_LOG("mirrorOffset: " + mirrorOffset);
	
	var groupNode = document.getElementById("GM_Gixen_BidGroup");
	var group = groupNode.options[groupNode.selectedIndex].value;
	GM_LOG("bidGroup: " + group);
	
	var quantity = document.getElementById("GM_Gixen_Quantity").value;
	GM_LOG("quantity: " + quantity);
	if (!quantity.match(/\d+/g)) {
	    alert("Invalid quantity");
	}
	
	updateGixenVisibleSnipe(WORKING_IMAGE_HTML);
	disableGixenPlaceSnipeButton();
	disableGixenCancelSnipeButton();
	
	cancelGixenBidInternal(function() {
		placeGixenBidInternal(maxbid, group, mainOffset, mirrorOffset, quantity, function() {
			enableGixenCancelSnipeButton();
			updateGixenVisibleSnipeAmount(maxbid);
			enableGixenCancelSnipeButton();
			enableGixenPlaceSnipeButton();
		}, gixenFailureHandler);
	}, gixenFailureHandler);
}

function safePlaceGixenBid() {
	return safeFunctionCall(placeGixenBid)();
}

function updateGixenVisibleSnipe(value) {
	var gixenSnipeNode = document.getElementById("GM_Gixen_Current_Snipe");
	gixenSnipeNode.innerHTML = "<nobr>" + value + "</nobr>";
}

function updateGixenVisibleSnipeAmount(maxbid, callback) {
	updateGixenVisibleSnipe("<span class='sectiontitle vi-is1-prcs'>" + getItemCurrencyRepresentation() + " " + maxbid + "</span>");
}

function updateSelect(selectNode, value) {
    for (var i = 0; i < selectNode.options.length; i++) {
        GM_LOG("Considering option value : " + selectNode.options[i].value + " against " + value);
        if (selectNode.options[i].value == value) {
            selectNode.selectedIndex = i;
            return;
        }
    }
}

function updateGixenSnipeGroup(group) {
    updateSelect(document.getElementById("GM_Gixen_BidGroup"), group);
} 

function updateGixenMainSnipeOffset(offset) {
    updateSelect(document.getElementById("GM_Gixen_SnipeOffsetMain"), offset);
} 

function updateGixenMirrorSnipeOffset(offset) {
    updateSelect(document.getElementById("GM_Gixen_SnipeOffsetMirror"), offset);
}

function updateGixenQuantity(offset) {
    document.getElementById("GM_Gixen_Quantity").value = offset;
}

function updateGixenBids(mainBids, mirrorBids) {
	GM_LOG("Updating gixen info on page:" + mainBids + ", " + mirrorBids);
	var gixenInfoMain = mainBids[itemNumber];
	GM_LOG("Gixen info main: ");
	GM_LOG(uneval(gixenInfoMain));
	var gixenInfoMirror = mirrorBids[itemNumber];
	GM_LOG("Gixen info mirror: ");
	GM_LOG(uneval(gixenInfoMirror));
	gixenInfo.mirrorInfo = gixenInfoMirror;
	gixenInfo.mainInfo = gixenInfoMain;
	if (gixenInfoMain) {
	    if (gixenInfoMain.group == 0) {
	        if (gixenInfoMain.maxbid != gixenInfoMirror.maxbid) {
			    alert("Gixen main (" + gixenInfoMain.maxbid + ") and mirror ("
				    + gixenInfoMirror.maxbid + ") bids do not match.  "
				    + "Please use gixen directly to fix this error.");
			    return;
			 }
			 if (gixenInfoMain.quantity != gixenInfoMirror.quantity) {
			    alert("Gixen main (" + gixenInfoMain.quantity + ") and mirror ("
			        + gixenInfoMirror.quantity + ") quantities do not match.  "
			        + "Please use gixen directly to fix this error.");
			    return;
			 }
		}
		updateGixenVisibleSnipeAmount(gixenInfoMain.maxbid);
		updateGixenSnipeGroup(gixenInfoMain.group);
		updateGixenMainSnipeOffset(gixenInfoMain.offset);
		if (gixenInfoMain.group == 0) {
		    updateGixenMirrorSnipeOffset(gixenInfoMirror.offset);
		}
		updateGixenQuantity(gixenInfoMain.quantity);
		enableGixenPlaceSnipeButton();
		enableGixenCancelSnipeButton();
	} else {
		updateGixenVisibleSnipe(NO_SNIPE_HTML);
		enableGixenPlaceSnipeButton();
		disableGixenCancelSnipeButton();
	}
	
}

function enableGixenPlaceSnipeButton() {
	var node = document.id("GM_Gixen_Place_Snipe");
	node.addClass("GM_GixenButtonGo");
	node.addEventListener("click", safePlaceGixenBid, false);
}

function disableGixenPlaceSnipeButton() {
	var node = document.id("GM_Gixen_Place_Snipe");
	node.removeClass("GM_GixenButtonGo");
	node.removeEventListener("click", safePlaceGixenBid, false);
}

function enableGixenCancelSnipeButton() {
	var node = document.id("GM_Gixen_Cancel_Snipe");
	node.addClass("GM_GixenButtonStop");
	node.addEventListener("click", safeCancelGixenBid, false);
}

function disableGixenCancelSnipeButton() {
	var node = document.id("GM_Gixen_Cancel_Snipe");
	node.removeClass("GM_GixenButtonStop");
	node.removeEventListener("click", safeCancelGixenBid, false);
}

function getGixenBids(successCallback, errorCallback) {
	var mainBids = null;
	var mirrorBids = null;
	
	var onload = function(response, site) {
		if (response.responseText.match(/OK.*LISTED/g)) {
			if (site === "main") {
				GM_LOG("Loaded main bids");
				mainBids = parseGixenBids(response.responseText);
			}
			if (site === "mirror") {
				GM_LOG("Loaded mirror bids");
				mirrorBids = parseGixenBids(response.responseText);
			}

			GM_LOG("mirrorBids: " + mirrorBids + " mainBids: " + mainBids);
			if (mirrorBids && mainBids) {
				successCallback(mainBids, mirrorBids);
			}
		} else {
			errorCallback(getGixenError(response.responseText));
		}
	};

	GM_xmlhttpRequest({
		method : "GET",
		url : getGixenApiUrl({listsnipesmirror: 1}),
		onload : safeFunctionCall(function(response) {
			onload(response, "mirror");
		})
	});
	GM_xmlhttpRequest({
		method : "GET",
		url : getGixenApiUrl({listsnipesmain: 1}),
		onload : safeFunctionCall(function(response) {
			onload(response, "main");
		})
	});
}
	
function parseGixenBids(responseText) {
	// tag, itemid, endtime (as unix timestamp), maxbid, status, message, title
	
	GM_LOG("Parsing Gixen bids: " + responseText);
	
	var gixenInfos = {};
	var regex = /<br \/>(.*\|.*)/g
	for (var match = regex.exec(responseText); match !== null; match = regex.exec(responseText)) {
		GM_LOG("Match: " + match[0]);
		var parts = match[1].split(/\|#!#\|/g);
		var itemNumber = parseInt(parts[1], 10);
		var maxbid = parts[3];
		var status = parts[4];
		var message = parts[5];
		var group = parts[7];
		var quantity = parts[8];
		var offset = parts[9];
		
		GM_LOG("itemNumber: " + itemNumber + " maxbid: " + maxbid + " status: " + status + " message: " + message + " group: " + group + " quantity: " + quantity + " offset: " + offset);
		
		var itemInfo = {
			itemNumber: itemNumber,
			maxbid: maxbid,
			status: status,
			message: message,
			group: group,
			quantity: quantity,
			offset: offset,
		};
		
		gixenInfos[itemNumber] = itemInfo;
	}
	GM_LOG("Returning bid info " + gixenInfos);
	return gixenInfos;
}
	
function getGixenApiUrl(callArgs) {
	var uri = "https://www.gixen.com/api.php?username=" + encodeURIComponent(getGixenUsername()) + "&password=" + encodeURIComponent(getGixenPassword()) ;
	for (property in callArgs) {
		uri = uri + "&" + property + "=" + encodeURIComponent(callArgs[property]);
	}
	GM_LOG("Gixen url: " + uri);
	return uri;
}

function addSignInFormListener() {
	var form = document.forms.namedItem('SignInForm');
	form.addEventListener('submit', 
		function(event) {
			GM_LOG("Form submit handler called");
			called = true;
			
			var username = form.elements.namedItem('userid').value;
			var password = form.elements.namedItem('pass').value;
			var oldUsername = getGixenUsername();
			var oldPassword = getGixenPassword();
			
			if (oldPassword != password || oldUsername != username) {
				setGixenPrivateData(username, password);
			}
		},
		true);
}

function determinePageAndExecute() {
	var sourceUrl = document.URL;
	var itemNumberRegex = /item=(\d+)/g;
	var itemNumberRegex2 = /\/.*-\/(\d+)\?/g;
	
	if (sourceUrl.match(/signin.ebay/i)) {
		GM_LOG("Installing sign-in form handler");
		addSignInFormListener();
	} else if (sourceUrl.match(/(cgi.ebay.*\/ws\/eBayISAPI.dll?.*ViewItem)|(cgi.ebay.*\/.*-\/)/g)) {
		GM_LOG("Handling myEbay view");
		if (isRunningInMainDocumentForItemPage()) {
		    var match = itemNumberRegex.exec(sourceUrl);
		    if (match) {
			    itemNumber = parseInt(match[1], 10);
			}
			match = itemNumberRegex2.exec(sourceUrl);
			if (match) {
			    itemNumber = parseInt(match[1], 10);
			}   
			GM_LOG("Item number is: " + itemNumber);
			addGixenSubmitBidLink();
		}
	} else if (sourceUrl.match(/(cgi.ebay.*|www.ebay.*)\/.*hash=item.*/g)) {
		GM_LOG("Handling generic item view");
		if (isRunningInMainDocumentForItemPage()) {
			itemNumberRegex  = /hash=item([0123456789abcdef]+)/g;
			itemNumber = parseInt(itemNumberRegex.exec(sourceUrl)[1], 16);
			GM_LOG("Item number is: " + itemNumber);
			addGixenSubmitBidLink();
		}
	}
}

// Designed to stop script executing on XML HTTP Request loaded resources
// This doesn't really do anything now (9/10/2009).
function isRunningInMainDocumentForItemPage() {
	return document.getElementById("DetailsTimeLeft") !== null ||
		document.getElementById("body") !== null;
}

var itemNumber = null;

GM_LOG("Running Gixen greasemonkey script on " + document.URL);
determinePageAndExecute();