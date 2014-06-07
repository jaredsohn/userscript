// ==UserScript==

// @name           Gezer auto refresh - bgu.ac.il

// @namespace      gezerscripts.com

// @description    a script for for bgu.ac.il test upload site "gezer" which refreshes the page every couple of minutes and plays a sound when a new test appears , just leave the page open !! 

// @include        http://gezer*.bgu.ac.il/*/crslist.php*

// ==/UserScript==



/*

Gezer auto refresh

Version 1.2

By Lior Kirsch

*/



/********************************************************************************

	carrot image

*********************************************************************************/

var gezerImage = "data:image/gif,GIF89aP%00%86%00%E7%FF%00%00%01%00%00%02%00%07%00%00%09%01%00%01%04%00%03%05%01%0A%03%01%0B%04%03%0D%06%04%11%07%00%08%0A%06%0F%09%07%10%0A%08%13%0A%00%14%0C%02%12%0C%0B%19%0C%05%0D%0F%0B%1C%0D%00%16%0F%06%14%0F%0E%1D%0F%01%18%11%09!%0F%04%11%13%10%1A%12%03%1E%11%04%1D%11%0C%24%12%00!%13%00%1A%14%0D%25%13%02%20%14%08%1F%14%0F%16%17%15%26%14%04)%15%00-%15%01%23%17%0E%2B%17%02%1A%1B%19%2F%17%05)%1A%04%26%1A%122%19%00!%1D%1C4%1A%04(%1C%14%2F%1B%0A%1E%1F%1D*%1D%10%2F%1C%116%1C%005%1C%068%1D%011%1E%14%3C%1D%03.%20%14%3A%1F%04%22%24!%40%1F%006!%0B4!%16B!%036%23%18%3A%24%09D%22%04G!%069%25%1AF%24%00-)(L%24%03%3A'%1C%3C'%17%40)%08P'%00%3F*%1A%2C.%2CR)%02H%2B%0DA%2C%1CU%2C%05I.%20%5C%2C%01E0%1FX.%00N0%0C%5E.%03564L1%23%60%2F%05c1%00b1%08P4%209%3B8f4%03T7%23X8%0E%5D7%10m4%07i6%05V9%25%3D%3F%3Cp7%02X%3B's9%04%5B%3D)e%3E%10%60%3D%2Bv%3C%06_%40'%5E%40%2C%7D%3C%02y%3E%00e%40)EGE%80%3E%04hC%2BnD%10%82%40%06kE.%84B%08wG%15%88D%01nH0yI%17%8AF%04%90F%07qK3%7DK%12tM0RTQ%93H%0A%95J%01%80O%16wP2VXU~P5%9AM%05%7BS6%A1M%0A%82S8%88U%15%9DP%09%A4P%01%A0R%00%A6Q%04%86W%3B%A8S%05%88X7_a%5E%88Y%3D%ABU%09%8BZ9%ADW%00%B0Y%02%8E%5E%3C%B6Y%06%9C%60%1B%92a%3Fhjg%BA%5B%0B%BC%5D%00%A1c%17%95cB%BF_%02%9DeE%C1a%05%99gEnpm%9BhA%C8a%0B%C3c%09%A2hC%CBc%00%A5kFtvs%CFg%05%D1h%08%A8nHxyw%D3j%0B%B8p%20%AApJ%DAj%00%D7l%00%AErM%DDl%03%B1uI%DFn%07%B1vP%E2p%0B%B5xL%C2y!%E5r%00%BCxO%B7zN%E7t%00%CBz%26%E9u%02%BA%7CP%EFt%08%EAv%04%BF%7BR%86%88%85%C1%7DT%F1v%0C%F4x%00%F3w%0F%8A%8C%89%C5%80V%8D%8F%8C%C8%83Y%CA%84T%DB%87%22%CD%86V%CF%89X%95%97%94%D2%8BZ%97%99%96%D4%8D%5C%D7%8F_%DE%8Fa%D9%91a%DC%93%5C%E2%92%5E%E1%92d%9F%A1%9E%E5%95%60%E7%97b%A3%A5%A2%EA%99d%EB%9Af%A7%A9%A6%ED%9Cg%EE%9Dh%EF%9Ei%F1%9Fj%F2%A0k%B2%B4%B1%B6%B8%B5%BC%BE%BB%C3%C5%C2%C8%CA%C7%CF%D1%CE%D3%D6%D2%D9%DB%D8%DC%DF%DB%E2%E4%E1%E8%EA%E7%ED%EF%EB%F1%F3%F0%F6%F8%F4%FA%FC%F8%FD%FF%FC%00%00%00!%F9%04%01%0A%00%FF%00%2C%00%00%00%00P%00%86%00%00%08%FE%00%FF%09%1CH%B0%A0%C1%83%08%A4%5Cs%07%EE%92%94%09%07%23J%9CH%B1%A2E%81D%BA%B9%DB%E8%0E%9D*%13%FF%180Ir%B1%A4%C9%93%04%0D%2C%5B%17%CE%5B%B8u%EE%DA%BDz%91%A9%DB%B5J%2FP%EA%DCy0%80%14%262d%CC%902%AC%1D%3Am%E8%DA-%13d!%00%CF%A7P%05%06%08%60AZ%CCn%60%0CX%D8%C0%20%AAW%94%2F%F0%C8qC%CD%DD972%0E%01%93F%CA%C7%D7%B7%15%03%90*W.%A9%D9W%D2%DA%B9S%A7%0B%89S%B8%25%A7%0E%C8%01%A6%8Ca0D%A6F%0C%B0%02%08%100%C86%B2%D3%EBM%8E%07%A9%80).%08A%E5%924t%E8%CAu%23v%8D%1D%3Br%B3%CA%98%40%20Q%C0%01%3C%E76%22%0Ba!Df%8A%06%80d%D2%B6%EE%5C5%5E%9C%F0%10ar%8B%A3%3Bv%DD%26%11ampA%1D%85%EE%D6uq%23%ED%1A%1E%DB%B7%0D2%10T%1A%5C%2B9%406%FE%04%90%D1%E8%1ALv%DA%B8%E9m%A7%AD%92%8F%BF%03%17%B4%D2%16%9B%5D5r%1B%D1%BD%22%92%9D%60%80I%E5xc%CA%0C%16%FC%13%00%02%89ps%DE5l%BC%90%08%3B%1C%AD%D3%CD%80%F0%FDc%C17%C6m%A4%0E)%8817%91b%3B%25A%0D%1F%0F%18%20%95%09%D4%E8%A5N3Y%18%E0S8%19%C6D%0E0%5DP0P%0E%AFp%03%A1YR%0C%F0%8F%00%15%1A%14%40%17r8%B5%D9%03%26%05%40%C5%0C%05m%17%137%93%F8%C8%00%1A%E5%C4%98%E10%60%20i%E0%0C%DCl%B4%CC%06%17!0L%2BS%F1qM%2Bu0%10dO%20%0E%D4E%2B%B3%A0s%0B%15%03%F1%01%A3%95%19%92c%8A%5B%06%0E%B3Q7o%A8!%C5e%13%01%D1%8D%20%01l%60%95%3B%E2%AC0Pn%1E%0E4U%90%16%00%D3%8E7n%80)%90%14%1A%E1%19%A3%7D%05%06%40%CCF%ED%90%23%DA%2C%20%F5%F4O%16%DF%F0%11%40%1D%FE%B1%B93%0BDJ%CE%C2%8D.hD%DA%A6%40%02%2C%82%0E0%8E%0ED%846%9Ez%FA%8D%1A%064%A2%97d%ED%ACSM%90%0B%20%E0T%17%DE%BC%B1%C0%2Cz%AD%23GHr%84%B3%DE%3A%D7%C0%B7%26%12%E0%90%92%AA%40%16Tc%25%3B%E8%14%EB%CE7Yv%B9Q%2B%AD%902%C9%02%F0Q%90%08%13%02%C9Q%8E%1CHt%1A%8E%14%01%A0%11k~%C3%AC9%10%02%9C%F0Q%E0%40%0Cp%B2%2CG%EDT%C3G%26%ED%16%2BM%08j%C0%E4%0E%1E%1E%C2G%C55%FC%FD%D3%88%3Ao%A0%9117I%84%D0%A9%3B%E5%A0%22%87%0C%0AK%05%82Ar%E0G17%87%AC%00%060%1E%7B%CA%0E%20%0E%E8%B2%916%E7%12%04%0892%84%84J%3B%8D%98%C2Q8j%CC%C2%11%3A%60%2C%60%E0%87%06%CD%B0%E8%5E%D7%94A%01%10%AF%24%C5%EE9%E4%A8%83%E792H%01%E3%3A%AD%84p%40%85%8B%B8%83%86%85F%AF%B3%A3%FE%86%CB%92%03%86%00%3B%E1%A1v%3B%DD4b%01%14%99%88%D3%CE7%C0d%A2%06%18%60%7C%1D%232%2B%F8B%EAR%5D%0DT%F75%2F%40Al%B1%CD%40%A1%E5I%16%18%CD%0E*P%CC0%89%E2%E4%A0%C2%C4%03%40%AE0%897%92q%B3%CC-%B1r%03F3%1B%9D%D3L3h%04%F0%02%03%0C%90%B2%115y%B9%AB%CE5%AA%1C%22%07%14%05%94dB7%EB4%B2%C0%0C%C4%C0%D4%0D%1A%0F%1F%A0%86y1-%E3%86%0F%2B%C8%A0%AE%3BX%F9%B9%CE'%26%84%B0%C2%90%86%03S%2C1%E7%1Bg%149%B7fQsA%40%5C%03%06%02%08h%84%DE%5E%F10%040%A1%19%EDB%8F%14%B4%16%92K%A8%0Dfr%20%857f%81(%03%05%E0%01%C3X%9A%A7%D4A%81K%F4%0E)%19j%07%C9%2Cb%81%2C%08D%06H!%85%87%D0%A03t%CC%E2%06%02a%00%15t11v%10%A3%19%DE%D0%05)%1E%F6%8F%05%94%25F%FE%EB%C8%D89%0A%20%08%2FE%2Cc%1C%F9%86%14%2C%02%1F5%9C%23%13%10%11%08%05%E4u%0EAh%AA%0B%A6%F0%C6%C4bT%99%F8%D4%8Fb%AD%98%04L%CAa%00A%40%A8%1A%13x%40%2B%96U%AAWh%EA%22%01%10%04*%DE(%80O%1C%07%19%5Dp%93%B7H%D5%0D%5D%7Cnjy4%10%02%AA%D1%0EuL%8C%1B%2F%B8%01~%9EE%05%0Cq%E3%3D%26%40%83%1C%E4%00%86%24%DC%2CI%26%C8%9C%40%98%E0%0D%FD%04%EB%1FL%E8%06%E1%26%01%06)X%60%01%600%0E%3A%3E%C1%00%01%24%01%2F%E8%90%06%10%2Cu%9CC%18%60%060%02F%00%7C%40%0Cr%5C%03%86Q%D9%95%C9%CA%C1%09%06%FE%C3%04%C4%E0%CB%0C%FE%B2%CBj%04%CD%17S%F1%81%CE%DC%A1%8B%00pr%2Fn%F8%C7%0A%BAq%0EUL%8A%09R%88%14O%82t%00%3E%F0!R%5Dh%06S%FC%C3%04%3C%24b%18j%AB%E6%04%8C%C6%91e%E0%EB%12%ED%FE%18ZH%D0%20%9C%82%EC%EF)%01%88%22AV%40%12%FF(f%003%E0%049%5E%11%80%2C%DCi%23%D70%C1%05%0F!%8DC%F4G%22k%0A%00%E0%FC)%A9%03Q%A1H%99%60%077Hq%8DrDT%20%07%20%DEE%03s%11%22%90H%17%DCX%C1%00B%00%059%18s%A5I%BA%08%18%B4%C1%07_%D0%09%A7%40%D5%A6%20%7C%E0%03q%06%F5-%93%9A%D4%00%92%EA%94%A4%1E%15%A0L%9D%CA%01%0E0%00%20EuRO%0DLR%0Fp%82%2B%8C%81%0Ci%60%84%24%EEP%84%14%24%20%00%15p%81%0B.P%00%ACf%95%22Iu%80%16%24Q%8Bc%40%E3%AE%CFx%064zQ%8BR%88%C2%15%B9%C8%85%2BB1%05%B7%BE%95M%02%20%81%22v%A1%0Ch%E4%F5%B1%90%8D%ECcq%F1%03a%1E%B6%A38%A8Ed%93Q%0BWx%F6%B3%B2%F8%85c!%0B%8DG%B4%F5%B2B%0A%80%030%E1Xh%1Cc%17%A2H%FEC%11%BEp%86%DA%D6%D6%09Q%B8%83%24p1%DAg%ACB%03%96%3D%ECT%8A%90%0Ca%C4v%09C%10%C2%180%11%8BZ8%D7%B9%A2(%C4%19~%60%83-%14%A2%16%C9%C8%85%0B%82%FB%D6%A9%5C%E1%14%3C%20A%1A4%11%8B%5E4V%B2z%3D%C6%2F0%F1%05%17p%C0%05_%80%00w%B3%3A%954%F4%C2%15%CA%40%AF~%1F%0B%8DX%8Ca%A9%FF%7C%EATB%B1%DF%02C6%16%D2%0ApP'%F5%0B%03%3BX%14%F3%A5o%00%24%D0%5B%07%EB7%0F%11%16p%00p%60a%03%0B!%C3G%9D%0A%87%3B%BC%DF%0F%2Bx%C1%01%B0%01%89K%0Cb%147%A0%C2%FC%85F2%92%A1%8C%1A%DB%F8%C6w51j%FD9%95%FC%F2w%17%AB%90%04%1Cx%90%82%14%9C%C0%06%3CHr%92I%60%83)%8C%A1%B2'F%B1f%F3%8A%8B%3D%2C%A1%08S%08%AB(%B6%5C%8B%5Ex%D9%CB%92%A0C%1B%B6%C0%01%C3%EE%D8%82%90x%06%FE%2B%F20%84)%40%C2%15%C2%80q%5E%A1%E1%8A%3C%F0%40%07N%90%04%26%E6%16e%9CN%85%0B%C2%D8%C2%09%E8%D0%0B%18CC%19%B18%83%13%E8%F0%03%034%40%09%1A%80%00%24%A2%D0b%A0Ne%04%AE%20%C4.%F4%8B%89%12%B4U%00%05%90V%03%82%00%5C%A7%9EYR%06%C8%03%5E%25%8B%8B2%0F%00%06b%E8%83%23%D6%F0%04%AA*A%0CaPA%9F%FD%1C%00%0E%9C%E1%0F0%DEEa3%A0%07%5B%18%23%18%D6%B0F0%9E0%00%2B%04%C2%13%86h%C0%A9%FD%23%80%01%14%A0%13%90%95%C5%11%0C%D0%03%3D%D8%C1%0A%20%D0%40%10%D6%60%87'%14%20%D4%0D%B0%40%F4%A6%DD%D1%00%EC%E1%B1%C2%98%82%01%C2%60%08%05%60%60%07s%98C%13P%20%82%08%04%00%0B%D903%BB%A7%F2%EE%BC%D6%22%05A%B0E%06%B00%8Ez%F0%83%1F%F9%90%C7%3B%2C%11%01x%E4%A3%09%95%D6%B0%22%1E%EB%8A%06%ACa%14%05H%85%3E%FE%F0%91%8D%7C%F8%C3%1F%FBH%C5%0E%EC%A1%0F%2Fd%3C%C4%01%98%F23bq%81%0E%88%A1%00X%98%83%19%14%00%0B~%F8%23%1F%830%03%3E%EE%D1%D6%5D%A3x%17%C2%D8E.D!%84%01HK%01%0A%98%8A%17%EE%E1%0FzD%40%04s%98%87%C0%A7%3D%95X%EC!%0A%5B%E0%C1%0F%A6%10%87%02x%01%E3%01%18%84%3E%FC%01%8FI%BD%A3%E8%EC6h-B%A1%89S%C8b%17%BF(%85%02%2Ca%86%00(%60%1A%FD%F0G%3A%A6%A2%80z%A0%3D%EE%1D%C5%84d%3B!%02sl%C3%0C%CCX%BB%3F%CC1%15D%E8c%0E%2FG1%0D%B0%0BYQ(%80%19'%0F%BD%3F%2C%81%82i%E8%E3%F2%DCE%40%05%0Ep%D9%A9%5C%20%14%BD%3D%06%02%2C%B1%0F%D1%F7%03%EB%F8%F89%16%2C%DBk8(%A2%E9%AD%17%00%1D*%AC%03%2C%D8C%F4%E9P%00-%02%7F%8F%A8%07%C9%00%3F%E8%C4.%24%C1%83%8DvW%00%85%A8p%1A%14%FE%90%8E%D0%EB%03%0B%3B%A8%C7%C9%DB%BE%2B%03%5Ca%13g%60%C1%09%B6%B0%84%A5vw%00%AC%FD%C5%1F%FEp%0CY%7C%C0%08%F1%D8%C7%3E%A2%A1%00%B5%EBc%1E%3B%B0%2B%01P%05%9D%80%03K%20%0A%BF%D0%0B%B9%80%09%2C%60t%C14%00w%F0%08%5C%D0%00%80%96%0C%91%C0%01-%00%0B%B0%D0%04%06%80%01%A0%60%09%18%60f%03P%0B%AB%A0%05%8A%20%09%8A%A0%05G%20%04%1C%D0%5D%BDvV%03p%06%C2%F0%0C%CA%80%09G%A0V6%90%06%2C%90%00.bj%FF%C0%02%BD%40%076%E0%02%5C%A0%01%D6%F7~%7B%20%0A%9B%C0%02%10%20%09%AD%D5%0B%B2%20%0B%B9p%0C%B1%F0%08%9EV%01n%15%00c%F0%0B%7B%C0%08%E5%C5%80%E2%A2a%C3%07%0D%8C%D0%00%03%80%03t%80%09%A1%10%0A%AB%C0%0A%92P%05%0D%90%00t%00%07m%12%00ivW%C2P%0B%A2%10%0AZ%80%03Ep%83%0E8N%01%D0%06%8E%B5%0B8%10%00%FE(%E0oS%01%40%01%10%82Z%F0%0B%0D%08%1F%07%B0%09%CFp%0C%A5%A0%05%AB%C7%01N%00%07%92%C0%0A%8A%10%88%3B1%15_%90_%B5p%88%E3%60%0E%D1%10%0D%CC%90%0A%B40%0D%83%D0%00%92p%0C%3D8%10%1A%E0%0A%CF%B0%0BQ%E0~%0B3%02%10%40_%0DP%0A%CF%90%0Ci0%00%D1%D0%0F%C6%D8%0F%FB%C0%0F%FD0%07)%E0%0A%B1%B0%2B%1C%10%0B%CF%80%0B%87%C8u%01%F0%07%06%C7%02M%10%0F%81wr%FC%C0%0C%07%90%06%D0P%08%D0(%8D%F1v%00%0D%C0%01%17%20%01%0807.%88%8Dy%D5%09%0D%D0%04%EF%A0%8C%FB0%0E%22%80%03%AC%00%0DGP%8EzU%0B%8A%A0%08%BF%80%0B%A2%E0%07QpV%12%26%09%FC%B5%07%0D%B0%03%AA%98%0A1p%02%AB%D0_%17%E0%8F%90%B5%0B%7B%40%06%7DhT%BC%C6%0A%90u%0C%92p%02%11pn)%40%60%CF%40%08%A7E%10)%20%0B%90U%0BZ%C0%910%B7%FE%0A%A4u%0C%8A%80%03%7B%20%09%A1%C0%08%1EI%07%C24%05%B9%F0%03N%90%02%25%20%01%3E%B2cS!%7D%83%25%09%7B%D0%06%2CP%00%1C0U%01%C0%03%92p%04%40R%10_%00%89%A0x%1B%22%16%05KP%05g%40%07w%B0%07ZP%5B%5Bp%06)%C0%02VE%10%12%B0X%0E%80xS%B1Z%80eWxXc%C2%A0%0C%B5%D0%09%12%B0%2B%1F%D0%09%8C%90%95%991)%09%20g%92%B5%09%0D%B0%2B%3C%E0%0AG%E0%96%22%26%98%A4%C5%93mb%00cP%0A-xf%01%90%008p%05%ED%17%00E%E0%60%CA%B0%05%A6%D6%00%8A%C0%90%94Y%04%9D%10Z%AE%80%85%1C%C0%98%8F%D5%99S%E1hSQ%01%A1p%05%A7%26%01%85%06%0D%A1P%04%00%26%8D%05%A6%0C%5C%20Uc%B0%07%1A%B0%05%A1%90%02%94%99%06y%F5%0B%DBeAq%A0W%C2%10%0B%B1%20%0B%CD%F5%0B%C2p%0C%C7%A0%05%8A%C1%02%A7%10%0A%B1%FEP%08%D2vf%24%E0X%A7P%01R%91b%A5%40%07dp%04%E8y%04K%F0%05%EC%F9%07%3A6%00%8F%B8%0B%89yj%06%C0%92%A2%20%01%E3y%00%2C%E0f%A2%C0%0A%A5%E0W%7C%B9%07%09%C0g%02%01%9A%90%00%93%F45%7C%C9%40i%16d%00%7B%60W%92uW%ABp%88%F0%81%00%09%10w%1CP%0A%D0%20%0B%E2iAG%D0%60%FA%D5%0B%DB%E5%97%17%25%006%20%0A%D0%40%08%859%15%25%20%93%FA%15%0B%2B%8Ax%051%004%E0%0A%BF%D0%068P%02%1D%A0%01%90%C0%98%9FH%A2~v%052%26%0C%BF%90%0B_0%063%88%5E'%90y%C2%C5Zs%26%094%20%094fcs%96%602%1A%11.p%0A%8F%B5%0B_%A0%01%B6u%06i%F0%07%8F%B0%09%00v%A5%07q%00w%F0c%7Fp%20c%F0%07%7B%A0hK%0A%A4A%D5%00%94%F8%0C%8F%40%07qF%08%1A%A0%05%B1%20%0C~z%07LzY%25%D0%60%FE%CA%D0%09.0%06%FB%D8%09%3C%C0%01Z%00%7B%92%10%A8%87u%02%0D%26%0At%00%09N%E0%02%9DP%7F%8F%E0%02G%C0W%90%FAV%AB%05%0D%868%06%AB%00%07)%10%05%7B%A0%83tP%5C%5Bg%A6%FFP%01%8Fp%0C%AC%20%04S%E0%0A%A2%F0%07G%80%00q0%83%BD%D0%AA%AE%9A%00S%10%0A%9D%B0%04%1F%A0%05mP%04%2C%B0i%D00%06%9F%DAz%0D%F0%03d%40f6%F0%05(%FA%0C%A7%D9%AC%A8%15%00%5C%95%8EHF%07%9A%A0%05%BA%E8%AA%1F2%15%8C%E0%0A%B5%B0%09W%80%03%04*%AE%E3%1A%00%BD%05%0D%920%8B%EC%8AQ%DA%DA%5B%CA%C0%AC%959%AF%8B1%15%3F%00Y%BF%00eN%20%A7%02Vf%010%05-Y%98%15%20%09G%A8%AF%FF%F0%01%9B0%15U%00Y%AEpi%8F%A0%01%0C%2B)%850%B1%01%10%05u%E9X%8F0)ku%B1%02%E1%02%B5%00%A3%13V%04y%D6%0B)0)%2Cp%FE%01%22%FB%0FH%DA%0B40%15%7F%00%07%2C0%02Ie%03.%7B%B1%05P%08%C1x%06SQ%0B%D0%F0%0B%2B%DBTt%B0%B3%0Ck%00%1B%07%0D~0%15%85%90%0Ce%A8%18%01%A0%A7%EC%1A%00%0D%20%01XX%00%8F%90W%92%B0Tc%20%09X%F8%17%03p%0A%0Dh%A1%BEJ_%06%40%03~%20%0A%CEY%08%3C%80m%CF%10%0A%85%C9%03h%A9TZ%20%0C%85%B0%07%A1%20%0Ap%F0%05N%90%00%09%B0no%25%01%3Fp%07%B1Pa%D0%80%0BI%0A%0Dy%C0g%AFy%06%AE%A0%9Ajv%04%DD%19T%15%A0%05%9B%90%0C%16F%98I%A5%08%92%0Bo%8A%C0%02%26%82S%0Dp%07Ija%AD%26%B5_%D0%0B%1D%96%0C%A2%80%9B8%C5%B1%2BF%86U%F9%0F%05%60%03m%40%08%7D%BAj%E8%05%0D%B5%F0%05%06%B0%B0p%11%00%9A%D0a%D0%20%0C%B90%AC%0B%3B%15%02%D0%00.%40%06%8A%D0%09%A5%10%0B%B8%E0c%ABR%B9%09'%D0%1F%01%B0i%91u%BC%BB%E0%0AjHw%85%F0%05%3F%E0%8EpU%99)%C0%03q%80%93J%A8%08iP%02%02%DB%13%CB%C5%0A%A2%A0%08p%90%06g%B0%04GP%03%09%60%036%C0%01%A3%BB%13%10P%02)%00%C0%40%85%8EX%0B%01%08%9AU%01%01%00%3B";



/***************************************************************************/

var testsCount = GM_getValue('testsCount');



var pars = document.forms[0].elements.namedItem('pars');

if(!pars){pars=" "  }

else {pars=pars.value};

var uname = document.forms[0].elements.namedItem('uname');

if(!uname){uname=" "  }

else {uname=uname.value};

var numdept = document.forms[0].elements.namedItem('numdept');	

if(!numdept){numdept=" "  }

else {numdept=numdept.value}; 

var start=new Date();

start=Date.parse(start)/1000;

var changeString = "";

var changeHapped = countChanged();

var changeHappenedBinary = "no" ;

if (changeHapped) {changeHappenedBinary ="yes"};



var audioPlug = '<embed src= "http://thesim.wordpress.com/wp-content/plugins/audio-player/player.swf" quality="high" width="300" height="32" allowScriptAccess="always" wmode="transparent"  type="application/x-shockwave-flash" flashvars="bg=0xf8f8f8&leftbg=0xCC6600&lefticon=0xFFFFFF&rightbg=0xFF9900&rightbghover=0x999999&righticon=0xFFFFFF&righticonhover=0xffffff&text=0x666666&border=0x666666&loader=0x9FFFB8&loop=yes&autostart=' + changeHappenedBinary + '&soundFile=http://sites.google.com/site/gezer1site/file/eliezer.mp3" pluginspage="http://www.macromedia.com/go/getflashplayer" bgcolor="ccccff"> </embed>';

var counts=500;



	

/********************************************************

	add the button and the sound

	if the countChanged() play the sound in a loop

*********************************************************/



var newElement;

newElement = document.createElement('div');

newElement.innerHTML = '<form id="refreshSubmit" action="crslist.php" method=POST> <input type="hidden" name="pars" value=' + pars + '> <img src=' + gezerImage + ' style="vertical-align:middle">  <input type="hidden" name="uname" value=' + uname + '> <input type="hidden" name="numdept" value=' + numdept + '> <input type=submit name="refresh" value="התחל" ><INPUT TYPE="text" id="clock" SIZE="3" VALUE="10">  ' + audioPlug + '</form> <hr> ' + changeString + '</hr>'  ;

document.body.insertBefore(newElement, document.body.firstChild);



/*************************************************

	if the number of tests has not changed try 

	to refresh every couple of minutes

**************************************************/



	

if (!changeHapped) {

	//var time = 100; //= 2.5minutes	

	window.setTimeout('countDown()',100);

	

};



/*************************************************

	display counter and count back

**************************************************/

unsafeWindow.countDown = function() {

		var now=new Date();

		now=Date.parse(now)/1000;

		var x=parseInt(counts-(now-start),10);

		document.getElementById('clock').value = x;

		if(x>0){

				timerID=setTimeout("countDown()", 100);

			}else{

				document.getElementById('refreshSubmit').submit();

			};

 		};



/*************************************************

	check the number of tests on site and the  

	the local variable on the computer

	returns false if the are not the same

**************************************************/





function countChanged()

{

	var changed = false;

	var count = 0;

	var images = document.getElementsByTagName("input"); 

	

	for (var i = 0; i < images.length; i++) { 

    		if(images[i].type == "submit") {count = count +1};//if(images[i].type == "image") {count = count +1};

    	 };

	if (testsCount != null) {

		if (testsCount != count) { 

		changed = true ;

		GM_setValue('changeHappend', true);	

		};

	};



	changeString = testsCount + "/" + count;

	GM_setValue('testsCount', count);

	return changed;

};
