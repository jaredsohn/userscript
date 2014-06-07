// ==UserScript==
// @name           Enhance Play Account Section
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/stratomatic/playoffs/boxscore.html*
// @include        http://fantasygames.sportingnews.com/stratomatic/league/boxscore.html*
// ==/UserScript==


//Example of using SNOpenWindow. See line 882
//'<a href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91233&year=2010\', \'_blank\', 650, 550, \'scrollbars=yes\');">J.Heyward</a>'
//
var thisURL = document.URL;


var first = 'data:image/gif,GIF89a%10%00%0E%00%F7%00%00\'x%10!y%10%20z%11%1Cr%0B%3Fw%20%81%97R%A8%A8w%AF%AF%80%AB%AA%7C%A3%A2qp%91F.v%14%1Du%0C!%7D%0E!w%0A%26y%0F%1F%7C%08%22%7C%0C%23v%0F%5B%91%3E%AC%C1%83%CD%C4%9D%CC%BD%9C%D2%C0%A2%D2%C0%A2%CD%BE%9C%C9%C1%99%9C%B6rC%86(%1Eu%09%25~%0A!%7B%07%1B%7F%04%20w%07u%9EM%CA%C3%9A%D1%BE%9F%CB%B9%9C%D3%BF%A0%AE%AF%82%B5%B2%87%CF%BE%A0%CB%B7%9B%D1%BE%A0%BD%BF%8DQ%8D0%1Aw%03%22%7F%08%20u%09l%9AF%CD%C1%99%D2%B6%9E%CD%B6%9D%D4%C1%A2%96%AAn6q%1B%40%7B%24%AD%B9%82%D1%BC%A0%CD%B6%9C%D6%B9%A0%BD%C0%87H%86%2B%1Fu%08%5B%8C%40%BF%C0%93%D3%B7%9F%CE%B4%9A%D7%C1%A3%8D%AAg%13m%06%0Fl%02%0Bj%009%80%1E%AF%BA%83%D9%BA%A3%CF%B4%9C%D2%C6%A9%AC%B3%83%3Ex%24%AA%B8%88%CE%BF%9E%CD%B7%99%D6%C4%A3%88%A5d%0Em%07%12o%02%1Au%02%17t%06%08i%003%7B%20%A5%BB%82%D3%B2%96%D8%8Bv%CE%C8%A7%88%ACj%A9%B1%82%CD%BE%9D%D3%BF%9D%8E%ACg%0Bl%04%0Eo%07%12n%06%14h%04%12j%04%10o%08%02j%01Cu%1F%F3-!%FF%00%00%E2dN%7D%ABd.o%19%9B%B1p%95%B5h%0Fg%05%0Fm%08%10q%08%0Ek%05%7D%BBUc%A7C%0Ae%01%01y%0BfE%06%FF%00%00%FC%02%01%F6%07%033e%0D%13m%04%1Fv%0Dk%B0K%3F%8A)%09d%00%15o%09%0Bl%03_%B2CP%A26%0Cf%03%10o%07%1Bf%06%D6(%10%FF%00%00%86%3B%05%10w%08%19s%0A%15o%08%23x%12q%B3P9%89%25%09e%00%11n%08%0Bh%01%0Bh%02%14o%08%13g%03M%A0%3Ac%9D%3DAT%03%10v%0A%17s%08%15s%09%1Bu%0D%14o%07%20u%10r%B6OA%8F*%07d%00%18p%09%14o%08%07e%00S%9D8%5D%A2%3D%15n%07%0Ew%0C%1Bs%09%17r%09%15r%07%16t%09%19u%0A%15n%06%1Cs%0Cu%B4ND%90*%08c%00%0Bf%00P%9B6W%A1%3A%0Dh%00%18r%08%1Ar%09%16s%08%14s%09%16s%08%17s%08%16s%08%18u%09%16p%07%1Ds%0Aq%AFLO%962a%A2%3F%60%A2%3D%17o%06%17r%07%19s%08%15s%07%13s%08%17s%08%19s%08%17s%08%17s%06%16s%06%1Bt%09%16o%07%1Cp%0C~%B8XV%9F%3C%13h%04%19s%09%18s%07%14s%06%15s%06%16s%07%18s%08%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%00%0E%00%00%08%FE%00%01%04%100%80%40%01%03%07%10%24P%B0%80A%03%07%0F%20D%900%81B%05%0B%170d%D0%B0%81C%07%0F%1F%40%84%101%82D%09%13\'P%A4P%B1%82E%0B%17%2F%60%C4%901%83F%0D%1B7p%E4%D0%B1%83G%0F%1F%3F%80%04%112%84H%11%23G%90%24Q%B2%84I%13\'O%A0D%912%85J%15%2BW%B0d%D1%B2%85K%17%2F_%C0%84%113%86L%193g%D0%A4Q%B3%86M%1B7o%E0%C4%913%87N%1D%3Bw%F0%E4%D1%B3%87O%1F%3F%7F%00%05%124%88P!C%87%10%25R%B4%88Q%23G%8F%20E%924%89R%25K%970e%D2%B4%89S\'O%9F%40%85%125%8AT)S%A7P%A5R%B5%8AU%2BW%AF%60%C5%925%8BV-%5B%B7p%E5%D2%B5%8BW%2F_%BF%80%05%136%8CX1c%C7%90%25S%B6%8CY3g%CF%A0E%936%8DZ5k%D7%B0e%D3%B6%8D%5B7o%DF%02%01%02%00%3B';

first =  '<img title="1  " src="' + first + '">';

var second = 'data:image/gif,GIF89a%10%00%0E%00%F7%00%00\'x%10%22y%10%20z%11%1Cs%0C%3Fx%1F%82%96S%A4%AAs%AC%BD%8B%A9%B8%89%A1%A2oq%91G3v%19%1Cw%0B!%7D%0E!w%0A%26y%0F%1F%7C%08%22%7C%0C%24v%0F%5B%92%3D%AD%C2%84%C7%C4%9A%C7%C7%A2%E6jW%E7jY%C3%CC%A0%BF%C7%94%98%B7pE%87)%1Ft%09%24%7F%0A!%7B%07%1A%7F%04%22w%07s%9FM%C7%C6%99%D1%BC%9E%C8%C5%A4%E7%5BM%FF%00%00%FF%00%00%E6YK%CB%C3%A5%D0%BD%9C%B9%C2%8AX%903%1Dw%03%22%7F%08%20u%09l%9BF%CB%C4%98%D2%B5%9F%D0%B4%9B%C8%CB%A5%E4%3D-%FF%00%00%FF%00%00%E9%400%CA%C7%A6%D0%B4%9A%D4%BA%A1%BC%C2%88H%87%2B%1Dt%06%5C%8B%40%BF%C0%93%D3%B6%9E%D0%B5%9B%D0%C3%9F%90%B3j7w%17%C0%1F%01%BD%1D%00D%81%23%AD%BA%83%D7%BB%A3%CE%B2%9A%D6%BC%A2%A9%B5%83%3Ey%25%A6%BE%8A%CC%C1%9F%CD%B6%99%D2%C7%A1%85%ACd%23r%0E%0Er%02%0Ex%01%0Dy%04%0Bo%019%7D%22%AE%B7%83%D6%BC%A1%CC%B5%99%CD%C1%A1%8C%ACj%9F%B7~%C9%C2%9A%CA%C2%95%89%AEe%18r%0D%0Eq%07%1At%09\'o%09%22o%0B%18t%0A%0En%086%7B%20%AE%B5z%CF%BE%9A%C5%C8%99~%A7%5E%3Dr!%96%B8m%97%B9g%22k%0D%14r%0A%14s%0A%20t%0D%8F%C4_k%A9F%0Fk%05%19v%0F%12k%07Az%20%B9%D0%85%7B%A4Q%2Co%13%20t%0B-%7C%13o%AFLF%90-%19l%08%19r%0B%1Ct%0Bg%B7IT%A57%17n%07%1Dq%0D%19l%09a%A3Bk%AAF\'s%0B%25w%0C%25z%10%24v%0C0%7B%16t%B5RB%8D*%12i%03%19t%0A%14k%04%18o%07!v%0F%15i%05W%9E%3Bk%ABG%25q%0B%25w%0D%23z%0D%23y%0F%26%7C%10%23w%0D%2F%7C%16v%B7OD%91%2B%11h%02!u%0D%1Br%09%1Al%06%5C%A3%3B%5C%A2%3D%22r%0B%26y%10%23%7C%0F%22z%0C%20z%0D%23%7C%0D%23%7C%0F%26v%0C.y%12w%B6OH%91%2B%12g%02%1Dm%0Ad%A6%3F%5D%A4%3C%1An%05%24%7B%0F%22%7B%0E!%7B%0E!%7B%0B!%7B%0C!%7B%0C!%7B%0B%22%7C%0D%23x%0D%2Bx%0Fq%AEKQ%964d%A4BX%9D8%20q%09%25%7B%0C!%7B%0B!%7B%0C!%7B%0C!%7B%0C!%7B%0B!%7B%0B!%7B%0A%20%7B%09\'%7C%0D%25u%0C*u%10%7D%B8W%5D%A0%3D%1Fo%0A%26y%0D%20y%0B!%7B%08!%7B%0A!%7B%0B!%7B%0C%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%00%0E%00%00%08%FE%00%01%04%100%80%40%01%03%07%10%24P%B0%80A%03%07%0F%20D%900%81B%05%0B%170d%D0%B0%81C%07%0F%1F%40%84%101%82D%09%13\'P%A4P%B1%82E%0B%17%2F%60%C4%901%83F%0D%1B7p%E4%D0%B1%83G%0F%1F%3F%80%04%112%84H%11%23G%90%24Q%B2%84I%13\'O%A0D%912%85J%15%2BW%B0d%D1%B2%85K%17%2F_%C0%84%113%86L%193g%D0%A4Q%B3%86M%1B7o%E0%C4%913%87N%1D%3Bw%F0%E4%D1%B3%87O%1F%3F%7F%00%05%124%88P!C%87%10%25R%B4%88Q%23G%8F%20E%924%89R%25K%970e%D2%B4%89S\'O%9F%40%85%125%8AT)S%A7P%A5R%B5%8AU%2BW%AF%60%C5%925%8BV-%5B%B7p%E5%D2%B5%8BW%2F_%BF%80%05%136%8CX1c%C7%90%25S%B6%8CY3g%CF%A0E%936%8DZ5k%D7%B0e%D3%B6%8D%5B7o%DF%02%01%02%00%3B';

second =  '<img title=" 2 " src="' + second + '">';

var third = 'data:image/gif,GIF89a%10%00%0E%00%F7%00%00%19q%0A%18s%0A%13t%0B%13n%085v%1B%81%97S%A8%A9w%B0%B0%80%AC%AA%7D%A2%A5rs%90G2v%19%1Ex%0C%20%7C%0E!w%0A%26y%10%16s%06%16u%08%17o%08%5D%94%3F%AD%C1%85%CD%C2%9D%CC%BF%9C%D2%C3%A2%D2%C2%A3%CD%BF%9D%C7%C3%99%98%B8pL%8B-!u%0A%23~%0A!z%06%11u%02%14q%03s%9DL%CB%C3%9B%D0%C0%A0%CD%BB%9D%CF%C0%A0%AC%AE%82%B4%B4%89%CE%C0%9F%CC%B8%9B%D2%C1%A1%BA%C1%8D%5C%914%1Fx%04!%7F%07%15n%04j%99E%CE%C2%99%D2%B7%9E%CE%B7%9C%D1%C5%A4%A0%AFu1o%18%40%7C%26%B0%BB%83%D2%BD%A0%D0%B6%9C%D4%BC%A0%BC%C3%8BL%88%2B%1Ct%07Z%8A%3E%C0%BF%93%CF%C4%A7%D1%B8%A0%D7%C2%A3%8E%ADh%1Eq%0C%0Fm%02%0Bj%005%7D%1D%B0%BB%85%D5%BD%A3%D0%B2%9A%D6%BF%A2%A8%B6%83Bz%26%AA%BD%8D%CD%C8%A4%DA%8Ey%D2%BA%98%83%AFi%14m%09%0Bl%00%15r%03%13q%04%0Ck%014%7C%1F%AF%B8%84%D7%BF%A2%CC%B7%9A%CE%C4%A3%8D%ACj%A3%B9%85%E1_L%FF%00%00%E6%2B%1A(k%0E%0Ar%06%12n%07%14j%04%1Bn%08%11q%0A%0Cl%076%7B%1F%AF%B5%7B%D0%BE%9C%C8%C9%9B%7C%A7%5D%3Df%16%F6%07%02%FC%02%01%FF%00%00kJ%09%01%7B%0A%1Co%09%84%C0Zj%A9G%0Ah%02%19w%10%11k%07Az%20%BA%D1%86z%A1R%1El%0D%0Et%07%86%3C%05%FF%00%00%D1%25%0D%1Be%05%12q%09%14n%07d%B6FO%A15%0Di%03%1Fr%0F%14h%05%60%A1%40j%AAF%18o%07%17r%06%16s%09%10v%0BD%5B%07o%A8H9%91%2B%0Bd%00%11o%08%0Ej%02%0Ej%03%18o%09%13h%03S%9C8g%A9F%18n%09%17p%07%1As%09%16s%09%1Bs%0C%0Dv%09%20x%11t%B4N%40%91*%06d%00%18p%09%15o%08%0Ef%01T%9E8X%A2%3C%15l%07%18q%09%19t%0A%18r%09%15r%07%16t%0A%1Bs%0A%15m%05%1Dt%0Cu%B5ND%8F*%0Ad%00%0Dh%02T%9E8W%A2%3A%0Eh%01%18s%08%19t%09%14s%0A%14s%09%16s%08%17s%08%16s%08%18t%09%16p%07%1Es%0Ar%AEKR%965%60%A3%40a%A2%3D%16m%06%17s%08%19s%08%14s%08%14s%08%17s%08%19s%08%17s%08%17s%06%16s%06%1Bs%09%16o%07%1Cp%0C%7C%B8VX%9E%3C%13i%04%19r%09%17s%07%15s%06%16s%06%15s%07%16s%08%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%00%0E%00%00%08%FE%00%01%04%100%80%40%01%03%07%10%24P%B0%80A%03%07%0F%20D%900%81B%05%0B%170d%D0%B0%81C%07%0F%1F%40%84%101%82D%09%13\'P%A4P%B1%82E%0B%17%2F%60%C4%901%83F%0D%1B7p%E4%D0%B1%83G%0F%1F%3F%80%04%112%84H%11%23G%90%24Q%B2%84I%13\'O%A0D%912%85J%15%2BW%B0d%D1%B2%85K%17%2F_%C0%84%113%86L%193g%D0%A4Q%B3%86M%1B7o%E0%C4%913%87N%1D%3Bw%F0%E4%D1%B3%87O%1F%3F%7F%00%05%124%88P!C%87%10%25R%B4%88Q%23G%8F%20E%924%89R%25K%970e%D2%B4%89S\'O%9F%40%85%125%8AT)S%A7P%A5R%B5%8AU%2BW%AF%60%C5%925%8BV-%5B%B7p%E5%D2%B5%8BW%2F_%BF%80%05%136%8CX1c%C7%90%25S%B6%8CY3g%CF%A0E%936%8DZ5k%D7%B0e%D3%B6%8D%5B7o%DF%02%01%02%00%3B';

third =  '<img title="  3" src="' + third + '">';

var first_second = 'data:image/gif,GIF89a%10%00%0E%00%F7%00%00\'x%10%22y%10%20z%11%1Es%0DD%7C!%82%95R%A4%B1%7C%B2%A8%7B%B0%A2w%9D%AExr%8FE6w%19%1Cv%0B!%7D%0E!w%0A%26y%0F%1F%7C%08%22%7C%0C%23v%0F%60%94A%AF%B9%82%C7%C3%9D%D1%A4%87%FC%18%16%FB%19%15%CE%A7%86%C3%C8%9A%99%B8oD%87(%20v%0A%24%7D%0A!%7B%07%1A%7F%04%22w%06t%9DM%CA%C3%9A%D4%B8%9E%C8%C2%A5%EF8.%FF%00%00%FE%00%00%F06.%CA%C5%A6%D0%BD%9C%B8%C3%8AT%8F1%1Av%03%22%7F%08%20u%09l%9BG%CD%C0%9B%D2%B6%9E%CF%B4%9C%CB%CA%A6%BCrH%F8%00%00%F8%00%00%C6vR%CC%C6%A5%D0%B2%9B%D5%BA%A0%BB%C3%86I%87%2B%1Dt%06%5C%8B%40%BF%BE%92%D4%B6%9F%CF%B5%9B%D1%C2%A0%92%ACj%24%81%18UT%04SS%023%8B\'%B1%B9%81%D8%BA%A2%CF%B4%9C%D3%C7%AA%AB%B5%83%3Dw%24%AA%B8%89%D0%BC%9E%CE%B5%9A%D4%C5%A2%87%A9c%18q%0B%16n%01%0Bz%01%09%7B%03%13k%018%7C%1F%A9%BD%87%D3%B3%96%D9%8Bw%CC%C9%A7%8C%ACl%A0%B6%81%CB%C0%9D%CF%BF%9A%8A%AFe%15o%0B%10r%08%18s%08%23m%08%24o%0B%17s%0B%0Bo%08Hx%23%F2-!%FF%00%00%E3bN%7F%ABc.o%19%97%B3m%99%B7i!l%0C%14q%0B%14t%0A%1Cr%0B%8A%C3%5Dn%AAH%12i%04%06%7D%0FkI%08%FF%00%00%FC%02%01%F6%07%02%3Dj%14%13m%04%1Fv%0Dl%B0KC%8C*%11i%04%1Cs%0D%17p%07c%B4FQ%A36%14l%06%1Br%0E*k%0D%D8%2B%13%FF%00%00%8E%40%08%1E%7D%0D%19s%0A%15o%08!w%11t%B3RB%8F*%11i%04%19s%09%13k%03%14m%04%1Br%0B%12e%01Q%A4%3Dh%A0%3FLZ%04%1E%7D%0F!y%0D%15s%09%1Au%0D%15o%07%20t%10r%B5NF%91%2C%11i%02%20u%0D%1Br%09%16j%05X%A1%3A%5D%A3%3B!r%0D%1C%7F%11%24y%0F%23%7B%0D%15r%07%16t%09%19u%0A%15n%06%1Dt%0Cu%B5OI%90%2B%11f%01%1Bm%08%5D%A2%3C%5E%A5%3D%1Cn%06%24z%0F%24y%0C!%7B%0F!%7B%0A%16s%08%17s%08%16s%08%18t%09%16p%07%1Ds%0Aq%AEKP%954c%A5Ac%A3%3F%22s%09%24y%0D!%7B%0B!%7B%0C!%7B%0C!%7B%0C%19s%08%17s%08%17s%06%16s%06%1Bs%09%16o%07%1Dq%0C%7D%B9X%5C%A0%3F!p%09%26y%0D%23y%0B!%7B%09!%7B%09!%7B%0C!%7B%0C%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%00%0E%00%00%08%FE%00%01%04%100%80%40%01%03%07%10%24P%B0%80A%03%07%0F%20D%900%81B%05%0B%170d%D0%B0%81C%07%0F%1F%40%84%101%82D%09%13\'P%A4P%B1%82E%0B%17%2F%60%C4%901%83F%0D%1B7p%E4%D0%B1%83G%0F%1F%3F%80%04%112%84H%11%23G%90%24Q%B2%84I%13\'O%A0D%912%85J%15%2BW%B0d%D1%B2%85K%17%2F_%C0%84%113%86L%193g%D0%A4Q%B3%86M%1B7o%E0%C4%913%87N%1D%3Bw%F0%E4%D1%B3%87O%1F%3F%7F%00%05%124%88P!C%87%10%25R%B4%88Q%23G%8F%20E%924%89R%25K%970e%D2%B4%89S\'O%9F%40%85%125%8AT)S%A7P%A5R%B5%8AU%2BW%AF%60%C5%925%8BV-%5B%B7p%E5%D2%B5%8BW%2F_%BF%80%05%136%8CX1c%C7%90%25S%B6%8CY3g%CF%A0E%936%8DZ5k%D7%B0e%D3%B6%8D%5B7o%DF%02%01%02%00%3B';

first_second =  '<img title="12 " src="' + first_second + '">';

var second_third = 'data:image/gif,GIF89a%10%00%0E%00%F7%00%00%19q%0A%18s%0A%13t%0B%13m%072t%1A%84%94U%A5%B2%7D%B3%A7%7B%AF%A2w%9E%ACws%8FG-v%16%12o%05%16s%0B%18q%08%18s%08%15s%06%15u%08%17o%08X%91%3B%B1%C0%87%CA%C5%9E%D4%A4%88%FB%18%16%FB%18%15%CF%A6%86%C5%C6%9C%98%B5pJ%89-%16o%05%16u%07%16s%06%13u%03%15q%03v%9CP%CD%C2%9C%D2%BB%9D%C8%C6%A5%F08.%FE%00%00%FF%00%00%EF6.%C8%C6%A6%D1%BD%9D%BF%C0%8FZ%915%14p%02%17u%05%0Ck%00_%96%3F%D2%C0%9B%D1%B5%9D%CF%B5%9C%CC%CA%A5%BCpI%F8%00%00%F8%00%00%CCvV%CE%C5%A5%CF%B5%9B%D4%BA%A1%BE%C2%8EG%87)%0Fn%02U%86%3B%C0%BD%92%D0%C1%A7%D1%B8%9F%D5%BF%A0%93%ACi%24%82%18WT%04SS%005%8B)%B7%B7%87%D7%BC%A5%CE%B2%9A%D4%C0%A0%A7%B7%82%3Cy%25%AA%C0%8F%CE%C4%A4%DA%8Cx%CF%BB%95%7F%B1f%1Ao%0B%14n%01%12~%01%0D%7C%05%10k%00%3B~%25%B3%B8%85%D6%C0%9F%CB%B7%99%CA%C5%A0%8E%ACj%A1%B8%86%E1_L%FF%00%00%E6%2C%1A*n%10%0Cs%06%17s%08%25m%08%24p%09%16t%0A%0Eo%088%7B!%AD%B7y%CC%C3%97%C5%C6%98~%A5%5D%3Ef%16%F6%07%02%FC%02%01%FF%00%00lK%08%02%7B%0A%20q%0B%8C%C3%5Dm%AAG%0Fk%05%19w%0F%14k%07L%7C%23%B7%D0%84y%A2Q%1El%0D%0Et%07%86%3B%05%FF%00%00%D0%24%0C%24h%09%1At%0C%18o%07c%B4FQ%A36%14l%06%1Dr%0E%1Dk%09g%A4Cj%AAG%1An%07%16r%06%16s%09%10v%0BEZ%07o%A7H%3D%95.%13f%03%1At%09%13k%04%15m%04%1Dq%0C%1Ak%05%5B%A1%3Cg%A8F%18n%08%16q%07%1As%09%16s%09%1Bs%0C%0Cv%09!w%11s%B4NF%92%2C%0Fh%02%22u%0D%1Ds%0A%19k%04e%A6AX%A1%3C%13l%05%18q%0B%19t%0B%18r%09%15r%07%16t%0A%1Bt%0A%15m%05%1Dt%0Cu%B5OI%91%2B%13f%02%1Bm%08%5C%A2%3CX%A1%3A%0Dh%00%18s%09%19t%0A%15s%08%14s%09%16s%08%17s%08%16s%08%18t%09%16p%07%1Ds%0Aq%AEKY%976e%A5A%60%A3%3E%17m%06%16r%08%19s%08%14s%07%14s%08%17s%08%19s%08%17s%08%17s%06%16s%06%19s%09%18o%07%1Dq%0C%7C%B9XW%9D%3B%13h%03%19s%0A%17s%07%15s%06%15s%06%16s%07%18s%08%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%00%0E%00%00%08%FE%00%01%04%100%80%40%01%03%07%10%24P%B0%80A%03%07%0F%20D%900%81B%05%0B%170d%D0%B0%81C%07%0F%1F%40%84%101%82D%09%13\'P%A4P%B1%82E%0B%17%2F%60%C4%901%83F%0D%1B7p%E4%D0%B1%83G%0F%1F%3F%80%04%112%84H%11%23G%90%24Q%B2%84I%13\'O%A0D%912%85J%15%2BW%B0d%D1%B2%85K%17%2F_%C0%84%113%86L%193g%D0%A4Q%B3%86M%1B7o%E0%C4%913%87N%1D%3Bw%F0%E4%D1%B3%87O%1F%3F%7F%00%05%124%88P!C%87%10%25R%B4%88Q%23G%8F%20E%924%89R%25K%970e%D2%B4%89S\'O%9F%40%85%125%8AT)S%A7P%A5R%B5%8AU%2BW%AF%60%C5%925%8BV-%5B%B7p%E5%D2%B5%8BW%2F_%BF%80%05%136%8CX1c%C7%90%25S%B6%8CY3g%CF%A0E%936%8DZ5k%D7%B0e%D3%B6%8D%5B7o%DF%02%01%02%00%3B';

second_third =  '<img title=" 23" src="' + second_third + '">';

var first_third = 'data:image/gif,GIF89a%10%00%0E%00%F7%00%00%19q%0A%18s%0A%13t%0B%12m%07%3Ey%1E%84%97U%A9%AAv%AF%B0%80%AD%AA%7C%A2%A6pk%90D%20r%0E%12o%05%16t%0B%17q%07%18s%08%16s%06%16t%08%17m%08%5E%95%3F%AE%BC%83%CD%C2%9A%CD%BE%9B%D5%C2%A2%D4%C2%A2%C9%C1%98%C6%C6%96%9C%B5s%3B%84%25%11m%04%19u%08%16s%05%11u%02%14p%04s%9DL%CD%C4%9A%D1%BE%A0%CE%B8%9C%CF%C3%9E%AC%AE%80%B4%B2%87%D1%BF%A0%CF%B8%9C%D3%BF%9E%BA%C3%8AG%8A%2B%0Fo%00%16u%06%15n%04j%9BD%D0%C4%99%D2%B8%9E%CF%B7%9C%D6%C4%A1%8D%AAi2n%18%40%7B%25%B0%B8%82%D3%BF%A0%D0%B6%9C%D6%BA%A0%BE%C1%87%40%83%26%12m%04Y%8A%3F%C1%C0%92%D6%B6%9C%D2%B4%9D%D5%C5%A2%88%AFc%13k%06%0Em%02%09h%002~%1D%B1%BC%83%DA%BB%A4%D2%B5%9B%D7%C7%AA%AC%B7%833t%1F%AD%B9%8B%CD%CA%A6%CB%C3%A3%D6%C9%A4%81%A9%60%10l%07%0Dl%01%17s%03%15q%04%07j%003z%1E%A3%BA%81%D6%B4%96%D9%8Bw%CE%C9%A6%86%ACh%9A%BB%82%E0_K%F74%2C%88%A1Z%0Ao%08%0Fn%06%11o%06%11h%03%12i%04%12o%08%01k%00%3Aq%1C%F3%2C%22%FF%00%00%E5%60N%7F%AAc%93%3D%11%FF%00%01%FF%00%00%C1%12%01%0Cr%09%12q%0A%08g%01v%B5Pe%A8D%0Ae%01%01x%0BgE%06%FF%00%00%FC%02%01%F6%06%023g%0DxB%04%FF%00%01%FF%00%01%CE%25%0C%08k%04%14n%09%0Ai%02%5B%B0BP%A26%0Bg%03%11m%07%1Ae%06%D5(%10%FF%00%00%86%3B%04%10w%08%08z%09%7DA%07%B4%26%04f%A4D1%8A%24%0Ae%00%12n%08%0Ah%02%0Ag%01%13o%07%11f%02L%A1%3Cd%9D%3BAT%03%10v%09%17s%08%18r%09%0Cz%0C%04y%09!x%11u%B6O%40%8F*%06d%00%16p%09%16o%08%06d%00T%9E8%5D%A3%3D%15n%07%0Ew%0C%1Bs%0A%17r%09%14r%07%19q%09%1Cr%0A%15m%05%1Es%0Cu%B4NC%90*%08c%00%0Af%00P%9B6W%A2%3B%0Dh%00%18s%08%1Ar%09%16s%08%14s%09%16s%08%17s%08%15s%08%18t%09%16p%07%1Ds%0Ar%AFKN%962%60%A3%3Fa%A3%3E%17m%05%17r%08%18t%08%14s%07%14s%08%17s%08%19s%08%17s%08%17s%06%16s%06%19t%09%18o%07%1Cp%0C%7B%B8U_%A1%40%18l%07%17r%09%18s%07%14s%06%15s%06%16s%07%18s%08%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%00%0E%00%00%08%FE%00%01%04%100%80%40%01%03%07%10%24P%B0%80A%03%07%0F%20D%900%81B%05%0B%170d%D0%B0%81C%07%0F%1F%40%84%101%82D%09%13\'P%A4P%B1%82E%0B%17%2F%60%C4%901%83F%0D%1B7p%E4%D0%B1%83G%0F%1F%3F%80%04%112%84H%11%23G%90%24Q%B2%84I%13\'O%A0D%912%85J%15%2BW%B0d%D1%B2%85K%17%2F_%C0%84%113%86L%193g%D0%A4Q%B3%86M%1B7o%E0%C4%913%87N%1D%3Bw%F0%E4%D1%B3%87O%1F%3F%7F%00%05%124%88P!C%87%10%25R%B4%88Q%23G%8F%20E%924%89R%25K%970e%D2%B4%89S\'O%9F%40%85%125%8AT)S%A7P%A5R%B5%8AU%2BW%AF%60%C5%925%8BV-%5B%B7p%E5%D2%B5%8BW%2F_%BF%80%05%136%8CX1c%C7%90%25S%B6%8CY3g%CF%A0E%936%8DZ5k%D7%B0e%D3%B6%8D%5B7o%DF%02%01%02%00%3B';

first_third =  '<img title="1 3" src="' + first_third + '">';

var first_second_third = 'data:image/gif,GIF89a%10%00%0E%00%F7%00%00%19q%0A%18s%0A%14t%0B%0Fl%065v%1C%81%95R%A8%B2%81%C9Y%3C%C7T8%A1%AD%7Cs%8FG%2Cu%14%11o%05%16t%0B%17q%07%18s%08%16s%06%15u%08%18o%09U%92%3A%AC%BE%81%CC%CC%A6%E7aS%FF%00%00%FF%00%00%E8cS%C7%CA%A1%98%B4o%3C%85%25%13o%04%18u%08%16s%06%11u%02%14p%04s%9FK%C9%C7%98%D3%B8%9D%C8%C5%A3%EF%3C4%FF%00%00%FF%00%00%EF%3D3%C9%C2%A4%D4%BA%9D%BF%BE%8DZ%8F6%10p%00%17t%05%15o%04j%99E%CE%BF%98%D2%B5%9B%CD%B4%98%D6%C1%A5%94%9Fd%C0%15%00%CE%1D%05%AB%B0x%D2%BD%A1%CD%B3%98%D5%B6%9D%C6%C0%91B%83(%0En%03Z%89%3E%C2%BD%92%D0%BE%A7%CF%B7%9B%D9%BD%A1%91%AAh%18s%0B%16w%07%12u%058%83%22%B1%B8%83%D9%B9%A0%CB%BB%9F%D4%C1%A5%AD%B1%81%3Cz%25%A7%C0%8C%CD%C3%A4%D9%8Bw%D1%B6%95%85%ACi%19o%0A%16p%03%1Dv%01%1Au%04%11l%018%7D!%A4%BC%84%D9%95~%D1%A1%87%CF%CB%A9%95%A7k%A5%B9%85%E4%5EM%FF%00%00%E6%2B%1A)o%10%0Fu%09%1As%08%1Al%06%1Am%07%18t%0A%08t%09~P%15%FF%00%03%F7%11%0E%CB%B1%83%7B%AAb%3Ef%16%F6%07%02%FC%02%01%FF%00%00lK%09%07~%0E%15i%05x%B9Ri%A9E%11k%04%13x%0F%D9%13%02%FF%00%01%FF%00%00%B2%3E%18%17%7C%17%0Et%07%86%3B%05%FF%00%00%D0%24%0C%20f%07%19t%0C%14m%05a%B3ES%A58%16k%04%16v%0FdH%06%FF%00%01%E4%0E%023%60%04%11u%07%16s%09%10v%0BE%5B%08i%A5E5%8F(%15i%04%1At%09%13l%04%13m%04%1Br%0C%14h%03H%A2%3Aw%873(c%05%0Dx%0A%1Bq%08%16s%09%1Bs%0C%0Dv%09!x%11u%B4NE%91%2C%10i%02%20t%0C%1Ds%0B%11h%02S%9D8%5B%A0%3C%11t%0A%14t%0B%1Br%0A%16r%09%15r%07%16t%0A%1Bs%0A%15m%05%1Dt%0Ct%B5OI%90%2B%13g%02%16j%03U%9D8Y%A2%3B%0Ei%02%19r%09%19s%09%15s%08%14s%09%16s%08%17s%08%16s%08%18t%09%16p%07%1Ds%0Aq%AEKR%964c%A4Aa%A3%3E%17o%05%16r%07%18s%08%15s%07%13s%08%17s%08%19s%08%17s%08%17s%06%16s%06%19s%09%18o%07%1Eq%0C%7C%B8W%5E%A1%3F%18m%07%17q%09%18s%07%15s%06%16s%06%16s%07%17s%08%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%00%0E%00%00%08%FE%00%01%04%100%80%40%01%03%07%10%24P%B0%80A%03%07%0F%20D%900%81B%05%0B%170d%D0%B0%81C%07%0F%1F%40%84%101%82D%09%13\'P%A4P%B1%82E%0B%17%2F%60%C4%901%83F%0D%1B7p%E4%D0%B1%83G%0F%1F%3F%80%04%112%84H%11%23G%90%24Q%B2%84I%13\'O%A0D%912%85J%15%2BW%B0d%D1%B2%85K%17%2F_%C0%84%113%86L%193g%D0%A4Q%B3%86M%1B7o%E0%C4%913%87N%1D%3Bw%F0%E4%D1%B3%87O%1F%3F%7F%00%05%124%88P!C%87%10%25R%B4%88Q%23G%8F%20E%924%89R%25K%970e%D2%B4%89S\'O%9F%40%85%125%8AT)S%A7P%A5R%B5%8AU%2BW%AF%60%C5%925%8BV-%5B%B7p%E5%D2%B5%8BW%2F_%BF%80%05%136%8CX1c%C7%90%25S%B6%8CY3g%CF%A0E%936%8DZ5k%D7%B0e%D3%B6%8D%5B7o%DF%02%01%02%00%3B';

first_second_third =  '<img title="123" src="' + first_second_third + '">';

var BTT90sArray = new Array(
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3955&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Bonds</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3463&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Larkin</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3263&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Griffey Jr.</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3581&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bagwell</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3514&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Walker</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3176&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.McGwire</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=990&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Rodriguez</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=944&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Ramirez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=398&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Garciaparra</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3328&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Alomar</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3180&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Henderson</a>',
'C.Jones&nbsp;<a id="1R" title="s" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=583&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="1R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2148&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=910&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Piazza</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2902&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Thomas</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=40543&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Sandberg</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1141&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Thome</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3430&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Sosa</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2729&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Palmeiro</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3252&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Martinez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=565&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Jeter</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3693&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Alou</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3582&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Biggio</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=408&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Giambi</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=413&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Giles</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3011&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Belle</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3260&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Buhner</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3015&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Lofton</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3950&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Lankford</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3335&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Olerud</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39763&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Puckett</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3878&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Gwynn</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=598&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Kendall</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3651&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Mondesi</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3384&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.McGriff</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3291&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Rodriguez</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2870&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Salmon</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2903&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ventura</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1059&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Sheffield</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=41968&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Tettleton</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3421&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Grace</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=36653&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Kruk</a>',
'B.Anderson&nbsp;<a id="2R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2731&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="2R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2824&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3302&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Gonzalez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3090&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Knoblauch</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3946&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Gilkey</a>',
'M.Williams&nbsp;<a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3954&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="1R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3767&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>|<a id="E" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42969&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">3</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3504&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Galarraga</a>',
'B.Williams&nbsp;<a id="3L" title="s" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3142&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="4R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3858&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=328&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Edmonds</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42357&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Van Slyke</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=224&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Cirillo</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=442&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Green</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3124&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Boggs</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3948&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Jordan</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2730&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Ripken Jr.</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8310&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Mitchell</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31630&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Butler</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3388&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Justice</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3048&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Jaha</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=32780&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Daulton</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3303&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Greer</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=6417&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Davis</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=7629&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Mack</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3502&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">V.Castilla</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2811&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Vaughn</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3295&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Clark</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3877&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Finley</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3137&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.O\'Neill</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2815&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Canseco</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=5492&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Strawberry</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3200&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Joyner</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=287&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Delgado</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3387&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Grissom</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2721&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Hoiles</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3060&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Vaughn</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3780&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Dykstra</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2957&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Higginson</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3012&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Burnitz</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=179&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Cameron</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35664&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Hrbek</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3473&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Sanders</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1193&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Vizquel</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=41866&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Tartabull</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=605&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Kent</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3123&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Stanley</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1097&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Stairs</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3823&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bell</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=920&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Posada</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3734&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Bonilla</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3457&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Boone</a>',
'R.Thompson&nbsp;<a id="2L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42046&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3749&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3732&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Alfonzo</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1107&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Stewart</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3334&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Molitor</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3511&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Burks</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=429&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Gonzalez</a>',
'J.Valentin&nbsp;<a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2809&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="2R" title="s" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1172&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3551&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Conine</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2948&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Fryman</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3642&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Karros</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=34320&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Gibson</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2735&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hammonds</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3828&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.King</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=41149&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Slaught</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3377&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lopez</a>',
'J.Franco&nbsp;<a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=6282&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="1R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3714&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2862&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Snow</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2782&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Macfarlane</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2872&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Phillips</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3510&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Bichette</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3515&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Young</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3658&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Pratt</a>',
'M.Sweeney&nbsp;<a id="1R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1119&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="4R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1895&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="6R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=612&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Klesko</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=33721&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Fielder</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=37655&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Mattingly</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2910&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Raines</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3643&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Offerman</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1224&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.White</a>',
'<a id="4R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3730&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Hundley</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3696&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Kelly</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3540&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Johnson</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=40496&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Sabo</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3743&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Everett</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3301&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Palmer</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42817&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Whitaker</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3253&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Martinez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3940&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Zeile</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3784&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Jefferies</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=34467&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Gomez</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3873&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Roberts</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3866&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Caminiti</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=38058&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.McReynolds</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3692&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Lansing</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3465&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Morris</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=38293&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Milligan</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3128&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Fernandez</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1865&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Nevin</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=32900&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Deer</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3838&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Merced</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3449&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Santiago</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42546&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Wallach</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2998&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Alomar Jr.</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=227&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Clark</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3139&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Rivera</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3168&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Steinbach</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=38688&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Murray</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3045&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Nilsson</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3687&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Berry</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=37432&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Maldonado</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3056&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Hamilton</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3121&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Leyritz</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3735&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Brogna</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3585&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Magadan</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42174&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Trammell</a>',
'D.Bell&nbsp;<a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3590&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3002&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="3L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3772&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Hollins</a>',
'D.Martinez&nbsp;<a id="2R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2908&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=37591&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=960&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Renteria</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1965&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Santangelo</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2789&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Naehring</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39946&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Redus</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39300&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Pasqua</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3171&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Bordick</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=271&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Damon</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3958&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Hill</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3741&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Spiers</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3344&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.White</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=7798&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Ward</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3179&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Berroa</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3172&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Brosius</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35208&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Henderson</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2732&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Baines</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=368&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Floyd</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3211&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Hamelin</a>',
'L.Smith&nbsp;<a id="2L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=41253&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2843&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3415&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Wilkins</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2864&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Davis</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3208&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Gaetti</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=655&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Lieberthal</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31500&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Buechele</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3544&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Colbrunn</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39609&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Plantier</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2804&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Shumpert</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3214&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Randa</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=32850&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Dawson</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=41322&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Snyder</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2907&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Johnson</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3007&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Sorrento</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1868&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Simms</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3394&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Blauser</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3781&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Eisenreich</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3182&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Javier</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4273&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Jose</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35076&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Hatcher</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2970&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Samuel</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3419&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Dunston</a>',
'<a id="6R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35581&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Horn</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35975&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Johnson</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2774&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.O\'Leary</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3336&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Carter</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=325&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Easley</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3468&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Gant</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3064&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Curtis</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3832&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Young</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31260&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Bream</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3427&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.McRae</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31462&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Brunansky</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3740&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Segui</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3771&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Hayes</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3248&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Blowers</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3652&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Rodriguez</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2822&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Whiten</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31120&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Boston</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=493&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Hatteberg</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=6909&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Stevens</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4336&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Surhoff</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3833&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Brumfield</a>',
'E.Perez&nbsp;<a id="2R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3379&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2860&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2737&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Ochoa</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=36191&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Karkovice</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3639&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Deshields</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3224&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Nunnally</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3455&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Taubensee</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31830&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Carreon</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3860&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Ausmus</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3050&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Seitzer</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3474&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Walton</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2787&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Jefferson</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=43076&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Winfield</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1798&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Benard</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3546&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">Q.Veras</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=34638&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Greenwell</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3545&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Pendleton</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=20&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Anderson</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3304&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Nixon</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3053&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Vina</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=41262&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Smith</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=32096&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Clark</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4217&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Tucker</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=323&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Durham</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3422&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hernandez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39276&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Parrish</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=682&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Loretta</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3247&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Amaral</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3688&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Cordero</a>',
'J.Reed&nbsp;<a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39955&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="3R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3941&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=30494&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Barberie</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3296&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Frye</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3057&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Mieske</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3508&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Vander Wal</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3100&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Lawton</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42044&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Thompson</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3219&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Goodwin</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=34972&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Harper</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3870&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Livingstone</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3143&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Williams</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2723&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Zaun</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3001&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Baerga</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=36421&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Kingery</a>',
'<a id="5L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39389&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Pena</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3177&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Gallego</a>',
'J.Howell&nbsp;<a id="4R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=6245&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35649&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3874&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Williams</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3246&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Wilson</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2733&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Buford</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3596&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Mouton</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3136&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Mouton</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2786&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Alicea</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3097&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Cole</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3333&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.S. Gonzalez</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2518&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Garcia</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3461&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.R. Hunter</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1871&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Cangelosi</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3098&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Cordova</a>',
'<a id="6R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=7762&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ducey</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3096&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Becker</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8304&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Devereaux</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3459&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Greene</a>',
'D.Jackson&nbsp;<a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=7757&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="E" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35822&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3960&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Lewis</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3737&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Huskey</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3513&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">Q.McCracken</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2510&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Prince</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2738&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Smith</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=36110&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Jordan</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3389&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Kelly</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2739&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Voigt</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3595&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.L. Hunter</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=864&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Palmeiro</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=30594&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Bass</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=34096&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Gagne</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4214&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Mabry</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3472&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Sanders</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=34115&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Gallagher</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=37317&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Maas</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=30105&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Aldrete</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1721&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Hubbard</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35787&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Incaviglia</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39183&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Owen</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4321&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">V.Coleman</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3640&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Hansen</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3338&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Sprague</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3550&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Carr</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=7914&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Gonzales</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3837&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Martin</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35873&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.James</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39111&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Oquendo</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3699&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Tarasco</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3742&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Vizcaino</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3945&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Clayton</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3587&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Shipley</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3215&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Stynes</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3792&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Webster</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3245&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Widger</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3539&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Decker</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=38634&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Munoz</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3985&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Velarde</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=33842&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Fletcher</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2777&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Haselman</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39926&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ready</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=32&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Aurilia</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=30787&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Benzinger</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=37057&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lind</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3138&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Polonia</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=43310&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Young</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=30966&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Blankenship</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1729&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Cianfrocco</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3937&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Lampkin</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3385&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Mordecai</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1108&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Stinnett</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3638&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Coomer</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=38899&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Nokes</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3063&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Oliver</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=40056&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Reynolds</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=40718&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Schofield Jr.</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2816&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Chamberlain</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=7909&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Meulens</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=33669&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Felder</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=33674&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Felix</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2897&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Grebeck</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3130&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Kelly</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2728&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Manto</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3649&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Cedeno</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3578&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Eusebio</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4412&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Kreuter</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=5278&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.McGee</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3509&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Weiss</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2954&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Bautista</a>',
'<a id="3L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3183&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Sierra</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=32400&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Cooper</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35871&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.James</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39130&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Ortiz</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3905&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Pagnozzi</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=38259&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Miller</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39220&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Pagliarulo</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3819&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Parent</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3834&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Clark</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3682&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Fletcher</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3378&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.O\'Brien</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4227&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Diaz</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3773&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Morandini</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3178&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Paquette</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42339&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Valle</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3259&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Bragg</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=40916&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Sharperson</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31440&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Browne</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3952&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Scarsone</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3588&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Stankiewicz</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3127&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Elster</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=36848&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Lavalliere</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2909&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Newson</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3125&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Davis</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2359&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Lockhart</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=40601&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Sax</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3450&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Anthony</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3174&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Gates</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3584&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Gutierrez</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3089&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Hocking</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2857&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Hudler</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39444&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Perry</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3775&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Stocker</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3650&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Hollandsworth</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3697&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Pride</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3010&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Amaro Jr.</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=451&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Grudzielanek</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3470&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Howard</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=6400&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ordonez</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4182&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Cora</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3686&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Andrews</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3094&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Reboulet</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3579&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Servais</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=41206&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Smith</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3542&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Abbott</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2724&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Alexander</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3543&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Arias</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3648&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Ashley</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=30616&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Batiste</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3380&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Belliard</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3942&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Benjamin</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3453&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Berryhill</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3733&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Bogar</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3204&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Borders</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3635&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Bournigal</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3458&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Branson</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31354&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Brooks</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31396&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Brown</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31458&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Brumley</a>',
'<a id="3L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31756&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Candaele</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3728&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Castillo</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3637&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Castro</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31931&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Cedeno</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3331&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Cedeno</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=32242&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Coles</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3835&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Cummings</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8463&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Cuyler</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=32768&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Dascenzo</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=7891&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Diaz</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2854&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Disarcina</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3583&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Donnels</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=33156&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Dorsett</a>',
'<a id="3L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8482&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Duncan</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=33538&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Espinoza</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2849&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Fabregas</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=33691&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Fermin</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2945&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Flaherty</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3825&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Garcia</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3497&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Girardi</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=422&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Gomez</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2734&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Goodwin</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2898&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Guillen</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=34777&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Gwynn</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3088&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Hale</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3460&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Harris</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3633&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Hernandez</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3212&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Howard</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35715&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Hulett</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35717&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Hulse</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4105&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Huson</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3862&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Johnson</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3777&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Jordan</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3014&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Kirby</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3326&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Knorr</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=36912&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Lee</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8430&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Leius</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3383&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Lemke</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3000&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Levis</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3464&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Lewis</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3829&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Liriano</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=37094&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Listach</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3871&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Lopez</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1915&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Lovullo</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3939&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Manwaring</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2899&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Martin</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=37588&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Martinez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=6422&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Marzano</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3044&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Matheny</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4120&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.May</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3205&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Mayne</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=5648&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.McCarty</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=37781&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.McClendon</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=37973&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.McKnight</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3298&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.McLemore</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3092&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Meares</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=38119&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Melvin</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4221&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Merullo</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2850&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Myers</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3884&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Nieves</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3747&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Orsulak</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3466&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Owens</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39367&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Pecota</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39396&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Pena</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1918&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Ripken</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4483&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Rivera</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=40408&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Rowland</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3423&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Sanchez</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=40575&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Sasser</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=40942&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Sheaffer</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3258&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Sojo</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=6899&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Stillwell</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4411&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Strange</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1691&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Sveum</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1848&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Thurman</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42094&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Tingley</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42187&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Treadway</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42377&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Varsho</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3217&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Vitiello</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3086&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Walbeck</a>',
'<a id="3L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42697&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Webster</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3830&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Wehner</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=43063&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Wilson</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3831&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Womack</a>',//pitchers
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3669&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Martinez</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3363&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Maddux</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2753&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Clemens</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2743&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Brown</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3235&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Johnson</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3764&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Schilling</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2714&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Mussina</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3370&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Smoltz</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3726&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Saberhagen</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3362&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Glavine</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=33381&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Eckersley</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3185&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Appier</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=33696&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Fernandez</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3442&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Rijo</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3850&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Hoffman</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3112&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Key</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3621&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Martinez</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3324&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Cone</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2833&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Langston</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3117&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Rivera</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2986&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Hershiser</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42433&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Viola</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35226&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Henke</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=41585&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Stieb</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3522&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Harvey</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35759&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Hurst</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3356&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Avery</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3842&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Benes</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31113&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Bosio</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=41295&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">Z.Smith</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2913&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Dibble</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1062&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Wagner</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=6293&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Gooden</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3920&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Mulholland</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3284&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Rogers</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3403&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Morgan</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4430&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Nomo</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3561&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Drabek</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3342&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Darwin</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2839&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Percival</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39071&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Ojeda</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3715&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Harnisch</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3624&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Ho Park</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3065&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Aguilera</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3315&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Leiter</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=38522&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Morris</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3811&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Neagle</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3563&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Hampton</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3678&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">U.Urbina</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3576&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Swindell</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3676&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Shaw</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=40457&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Russell</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3848&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hamilton</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3446&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Smiley</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3840&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Ashby</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4527&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Belcher</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42596&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Ward</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3113&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.McDowell</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3610&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Candiotti</a>',
'<a id="6L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35645&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Howe</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3198&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Montgomery</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2713&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Moyer</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3076&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Radke</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3119&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Wetteland</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3192&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Gordon</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2744&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Jones</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=30922&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Black</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3529&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Nen</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2830&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Finley</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=30264&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Aquino</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35604&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Hough</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2881&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Fernandez</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3895&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Hill</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3664&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Fassero</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2875&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Alvarez</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=33998&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Freeman</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2772&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Hanson</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3494&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Swift</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3368&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Schmidt</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3667&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Henry</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3517&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Burkett</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3116&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Pettitte</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=33640&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Farr</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3812&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Plesac</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=41573&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Stewart</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3629&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Valdes</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2942&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Wells</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3612&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Daal</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35009&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.A. Harris</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3310&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Guzman</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=34734&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Gubicza</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2914&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Abbott</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4045&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Garces</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2718&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Rhodes</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3570&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Kile</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3288&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Tewksbury</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=32831&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Davis</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=32927&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Deleon</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3366&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Mercker</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2703&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Benitez</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=30197&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Andersen</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35312&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hesketh</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=37390&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Magrane</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=37769&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.McCaskill</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3365&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.McMichael</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39387&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Pena</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4500&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Wakefield</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35010&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Harris</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3082&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Tapani</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3312&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Hentgen</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2711&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.McDonald</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3804&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lieber</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2990&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Mesa</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2108&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Reed</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42772&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.West</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3672&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Rojas</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3806&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Maddux</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1857&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Wall</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3575&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Reynolds</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2984&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Embree</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3805&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Loaiza</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42726&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Welch</a>',
'T.Worrell&nbsp;<a id="3L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=43198&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="1R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3859&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2750&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Belinda</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3115&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Perez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3373&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Wohlers</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=6418&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Cordova</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=38448&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Moore</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3882&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Beck</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1749&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Corsi</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3409&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Trachsel</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8435&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Wilson</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35329&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Hibbard</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35547&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Honeycutt</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42153&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Torres</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=32979&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Deshaies</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42704&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Wegman</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31445&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Browning</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1737&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Hermanson</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2884&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Hernandez</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3433&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Brantley</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2995&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Shuey</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2979&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Assenmacher</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1906&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Olson</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42128&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Tomlin</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3725&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Remlinger</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42862&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Whitehurst</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3445&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Schourek</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2181&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Petkovsek</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35230&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Henneman</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3239&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Nelson</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3029&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Eldred</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2988&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Lopez</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3162&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Taylor</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39929&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Reardon</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3320&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Timlin</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3556&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Brocail</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2116&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Sullivan</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3680&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.White</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3625&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Osuna</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3922&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Portugal</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3668&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Heredia</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=33649&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Farrell</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3628&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Seanez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3609&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Astacio</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=36896&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Leary</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=34710&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Gross</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39895&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Rasmussen</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3067&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Erickson</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42337&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Valenzuela</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1811&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Trombley</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3323&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Williams</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3440&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.McElroy</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3111&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Kamieniecki</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3451&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Jackson</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3901&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Osborne</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3404&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Myers</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3879&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bautista</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=41986&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Thigpen</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2961&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Bohanon</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3405&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Navarro</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=40553&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Sanderson</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3796&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Christiansen</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2754&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Cormier</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3307&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Crabtree</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1759&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Wasdin</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2423&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Abbott</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3398&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Castillo</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=33144&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Dopson</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3482&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Holmes</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3070&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Guthrie</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35282&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">X.Hernandez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=41777&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Sutcliffe</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=34536&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Gott</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2981&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Clark</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=36929&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Lefferts</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3106&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Boehringer</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=34741&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Guetterman</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2741&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Orosco</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2985&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Grimsley</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2982&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Cook</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2992&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Ogea</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3397&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bullinger</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3520&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Gardner</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3159&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Reyes</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3537&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Witt</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=30708&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Bedrosian</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3274&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Helling</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3898&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Mathews</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3040&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Scanlan</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3716&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Henry</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3108&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Hitchcock</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3161&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Stottlemyre</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3531&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Rapp</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3490&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Reed</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42991&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Willis</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=30869&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Bielecki</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3673&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Rueter</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3535&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Weathers</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3069&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Guardado</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3718&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Jones</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2991&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Nagy</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2962&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Bottenfield</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3411&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Wendell</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8352&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Pall</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2079&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Batista</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3231&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Estes</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3723&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Person</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3120&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Wickman</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2706&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Eichhorn</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3521&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Hammond</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4325&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Fossas</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=38942&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Nunez</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3305&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.J. Castillo</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2877&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bere</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42987&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Williamson</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2799&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Adams</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=30290&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Armstrong</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3225&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Ayala</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2876&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Baldwin</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2923&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Bergman</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3844&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Blair</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31025&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Boever</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3025&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Bones</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2826&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Boskie</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3752&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Bottalico</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3887&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Burba</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4486&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Cadaret</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8313&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Carrasco</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3789&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Charlton</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3361&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Clontz</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=32552&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Crim</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=32762&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Darling</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=32841&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Davis</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3891&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Delucia</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3712&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Dipoto</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3614&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Dreifort</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3030&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Fetters</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=34016&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Frey</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1703&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Grahe</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2931&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Groom</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=34753&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Gullickson</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=34787&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Habyan</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3195&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Haney</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2708&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Haynes</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3439&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Jarvis</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3569&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Jones</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3033&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Karl</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=36643&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Krueger</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3961&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Leiter</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3483&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Leskanic</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2934&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lima</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3035&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Lloyd</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3196&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Magnante</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3072&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Mahomes</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=37854&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.McDowell</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3809&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Miceli</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2336&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Milacki</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2712&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Mills</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3722&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Mlicki</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3156&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Mohler</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3485&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Munoz</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=38677&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Murphy</a>',
'<a id="6L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3528&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Myers</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3487&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Olivares</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3281&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Oliver</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3488&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Painter</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39274&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Parrett</a>',
'<a id="7L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2838&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Patterson</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=39319&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Patterson</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3283&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Pavlik</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3530&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Perez</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3201&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Pichardo</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2993&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Plunk</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1580&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Powell</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3763&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Quantrill</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2888&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Radinsky</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2059&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Rekar</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3491&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Reynoso</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=40140&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Righetti</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3492&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Ritz</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2762&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Rodriguez</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3903&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Rodriguez</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3493&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Ruffin</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3854&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Sanders</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3675&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Scott</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2764&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Sele</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2113&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Service</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2842&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Simas</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3765&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Slocumb</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=41266&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Smith</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3534&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Spradlin</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2844&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Springer</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3371&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Stanton</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1631&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Suppan</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2997&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Tavarez</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=6465&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Telford</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3163&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Van Poppel</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3577&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Veres</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4390&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Villone</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3813&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Wagner</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3904&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Watson</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3243&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Wells</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3289&year=1690\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Whiteside</a>');
	
var the2010Array = new Array(
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=474&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hamilton</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1195&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Votto</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=924&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Pujols</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1354&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Gonzalez</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=182&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Cano</a>',
'M.Cabrera&nbsp;<a id="2R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=171&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="1R" title="s" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=170&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=66&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bautista</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1141&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Thome</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=792&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Morneau</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1219&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Werth</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=261&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Crawford</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1161&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Tulowitzki</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=81&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Beltre</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1377&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Longoria</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1275&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Zimmerman</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=617&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Konerko</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1335&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Choo</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=728&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Mauer</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1262&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Youkilis</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=881&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Pedroia</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91233&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Heyward</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=541&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Huff</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=998&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Rolen</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=527&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Holliday</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1003&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Ross</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1351&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Gardner</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=268&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Cruz</a>',
'<a id="4R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90868&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Torres</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=906&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Phillips</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90841&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.McCutchen</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1257&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Wright</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=491&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Hart</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=310&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Drew</a>',
'T.Hunter&nbsp;<a id="1R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=545&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="1R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91043&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=849&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Ortiz</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=990&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Rodriguez</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1116&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Suzuki</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1169&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Utley</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=360&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Fielder</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Betemit</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=734&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.McCann</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=706&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Markakis</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=863&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Pagan</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91257&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Posey</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1166&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Upton</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1326&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bruce</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=942&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Ramirez</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=921&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Prado</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=61&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Barton</a>',
'A.Ramirez&nbsp;<a id="1R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1394&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="2L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=938&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=320&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Dunn</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1009&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Ruiz</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1132&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Teixeira</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=161&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Butler</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=126&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Braun</a>',
'<a id="8R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91231&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Heisey</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=309&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Drew</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=344&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Ethier</a>',
'<a id="4L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1187&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Victorino</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1264&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Young</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91266&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Stanton</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1121&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Swisher</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=809&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Murphy</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90821&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Fowler</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=975&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Rios</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1356&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Hanigan</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1088&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Soto</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90852&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Rasmus</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90801&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Andrus</a>',
'<a id="4R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91263&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Santana</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1350&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Fukudome</a>',
'D.Young&nbsp;<a id="2L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1266&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="2L" title="s" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1433&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=285&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Dejesus</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91267&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Tabata</a>',
'<a id="4L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1378&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lowrie</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=889&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Pence</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1045&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Scott</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=174&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Cairo</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1341&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Denorfia</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91235&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Jackson</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=532&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Howard</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1218&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">V.Wells</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90862&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Stubbs</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90845&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Morse</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1164&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Uggla</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=611&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Kinsler</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=331&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Ellis</a>',
'<a id="5R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=789&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Morales</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91209&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Cain</a>',
'A.Jones&nbsp;<a id="3L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=581&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="3R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=580&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=918&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Polanco</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=117&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Bourn</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=513&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Hernandez</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1234&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Willingham</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91270&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Valencia</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=885&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Pena</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=206&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Castro</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=646&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Lee</a>',
'<a id="9R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1372&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Joyce</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=458&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Gutierrez</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=328&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Edmonds</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1277&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Zobrist</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1165&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Upton</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=928&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Repko</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=967&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Reyes</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=144&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Buck</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91219&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Davis</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=572&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Johnson</a>',
'<a id="7L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=847&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Ordonez</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1152&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Torrealba</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90843&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.McGehee</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Abreu</a>',
'J.McDonald&nbsp;<a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=740&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91063&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91237&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Jay</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=936&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Raburn</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=124&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Branyan</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91250&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Moreland</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1214&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Weeks</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=539&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Hudson</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=575&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Johnson</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91272&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Walker</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1321&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Blanco</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=192&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Carroll</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91236&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Jaso</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=597&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Kemp</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=594&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Kearns</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=417&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Gload</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=439&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Granderson</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=522&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Hinske</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=807&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Nix</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1026&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Sanchez</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=968&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Reynolds</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91262&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Sanchez</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1369&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Janish</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=550&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Infante</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=583&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Jones</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=912&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Pierre</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=786&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Mora</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=551&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Inge</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91200&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Alvarez</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=633&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Langerhans</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91215&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Colvin</a>',
'A.Laroche&nbsp;<a id="E" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=636&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="3L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=637&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=857&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Overbay</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=163&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Byrd</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=279&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Davis</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91251&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Morrison</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90813&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Conrad</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=688&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ludwick</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=674&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Loney</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1366&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Hundley</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=920&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Posada</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=467&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Hafner</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1357&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Headley</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1002&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Ross</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=843&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Olivo</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1106&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Stewart</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=51&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Barajas</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=270&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Cust</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=67&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bay</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91254&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Nunez</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1339&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Cunningham</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=944&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Ramirez</a>',
'A.Gonzalez&nbsp;<a id="2R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=425&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="2L" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=423&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a><a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1353&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">3</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91271&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Viciedo</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=820&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Napoli</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1269&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Young</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=607&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Keppinger</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1428&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Venable</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=60&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bartlett</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=269&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Cuddyer</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91225&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Espinosa</a>',
'<a id="4L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=263&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Crisp</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=98&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Blake</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=565&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Jeter</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=556&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Izturis</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=782&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Molina</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=470&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Hall</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1119&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Sweeney</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91259&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Rhymes</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1136&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Thames</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1120&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Sweeney</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91224&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Ellis</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90842&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.McDonald</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=156&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Burrell</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=547&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ibanez</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=387&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Furcal</a>',
'<a id="9L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=719&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">V.Martinez</a>',
'<a id="5R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=87&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Berkman</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=379&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Francoeur</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91228&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Freese</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=999&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Rollins</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1094&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Spilborghs</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=870&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Patterson</a>',
'<a id="8R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1040&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Schneider</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91238&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Johnson</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=486&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hardy</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90865&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Thole</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1037&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Schierholtz</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91249&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Morel</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=929&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Quentin</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=335&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Encarnacion</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1359&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Herrera</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91205&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Bourjos</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=784&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Montero</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1193&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Vizquel</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90870&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Whiteside</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=408&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Giambi</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=415&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Glaus</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=724&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Matsui</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1178&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Varitek</a>',
'J.Peralta&nbsp;<a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=891&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90449&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1402&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Rodriguez</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90811&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Cervelli</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1382&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Miller</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91240&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Kalish</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=983&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Roberts</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91229&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Gillespie</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1080&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Snyder</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90808&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Brignac</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=376&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Francisco</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90856&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Rosales</a>',
'B.Wilson&nbsp;<a id="4L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91275&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="2L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90786&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1236&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Willits</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1367&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Inglett</a>',
'<a id="8R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91223&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Dyson</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=917&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Podsednik</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1097&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Stairs</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=501&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Helton</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1370&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Johnson</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1416&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Snider</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1168&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Uribe</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=341&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Escobar</a>',
'<a id="8R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1368&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Ishikawa</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=781&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Molina</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=761&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Milledge</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91239&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Ka\'aihue</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1170&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Valdez</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=623&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Kouzmanoff</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=271&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Damon</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1084&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Soriano</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=714&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Martin</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1391&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Pennington</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=757&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Michaels</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90864&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Tatum</a>',
'<a id="7R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1423&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Tolbert</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=24&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ankiel</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=453&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">V.Guerrero</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1379&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Maier</a>',
'<a id="5L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1324&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Bonifacio</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=319&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Duncan</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90822&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Fox</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=599&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Kendrick</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=651&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Lewis</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=913&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Pierzynski</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90859&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Saunders</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=95&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Blanco</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=167&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Cabrera</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=305&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Doumit</a>',
'<a id="4R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1274&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Zaun</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91203&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Boesch</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91216&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Craig</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=911&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Pie</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90871&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Wieters</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=495&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Hawpe</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1046&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Scutaro</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1318&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Bernadina</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=179&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Cameron</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1411&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Sandoval</a>',
'<a id="6L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=80&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Beltran</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=584&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Jones</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1117&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Suzuki</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=500&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Helms</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91252&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Nava</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1421&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Teagarden</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=624&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Kubel</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=730&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Maybin</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1415&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Smith</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1308&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Aviles</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91214&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Castro</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=546&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Iannetta</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=658&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Lind</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91220&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Donald</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91227&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Francisco</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1131&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Teahen</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1409&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Salazar</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1431&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Wise</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=978&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Rivera</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1133&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Tejada</a>',
'R.Johnson&nbsp;<a id="4L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=577&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90831&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=197&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Casilla</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90805&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Blanks</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=876&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Paulino</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1063&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Shoppach</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=183&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Cantu</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=925&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Punto</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=421&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Gomez</a>',
'J.Baker&nbsp;<a id="8L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="5R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1312&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90833&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Kottaras</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91246&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Miranda</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90812&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Coghlan</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=431&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Gordon</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1032&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Santiago</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=456&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Guillen</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=420&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Gomes</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90834&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Laporta</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=638&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Larue</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=103&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Bloomquist</a>',
'<a id="6R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=104&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Blum</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=191&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Carroll</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=327&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Eckstein</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90836&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Marson</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90838&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Maxwell</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1396&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Ransom</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91244&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.McCoy</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1011&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Ryan</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1069&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Sizemore</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=371&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Fontenot</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=685&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Lowell</a>',
'<a id="6R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=99&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Blalock</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=993&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Rodriguez</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1227&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Wigginton</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91276&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Worth</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=468&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hairston Jr.</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=960&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Renteria</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91241&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lucroy</a>',
'<a id="4L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=52&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bard</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90802&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Avila</a>',
'<a id="4R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90814&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Crowe</a>',
'<a id="5R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1243&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Winn</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1315&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Barmes</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=622&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Kotsay</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=490&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Harris</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=712&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Marte</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90855&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Roberts</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=172&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Cabrera</a>',
'<a id="7L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1376&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Lillibridge</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1418&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Span</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=621&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Kotchman</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1159&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Treanor</a>',
'C.Lee&nbsp;<a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=644&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="3R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90311&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=598&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Kendall</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1044&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Schumaker</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=779&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Molina</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Aybar</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Betancourt</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=258&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Counsell</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90832&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Kelly</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90804&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Beckham</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=362&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Figgins</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91265&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Smoak</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=744&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.McLouth</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=347&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Everett</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=469&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Hairston</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90815&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Desmond</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1373&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Kapler</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=296&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Diaz</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90847&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Parra</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1426&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Valbuena</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1309&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Aybar</a>',
'<a id="7L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1352&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Gerut</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1390&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Patterson</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90848&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Pena</a>',
'J.Castro&nbsp;<a id="6R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91213&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=205&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91221&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Duda</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90825&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Getz</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=517&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Hill</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91230&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Hayes</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91245&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Miller</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=819&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">X.Nady</a>',
'A.Sanchez&nbsp;<a id="1R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91261&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90513&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1337&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Clement</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=601&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Kennedy</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90806&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Borbon</a>',
'<a id="7L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1420&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Tatis</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=177&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Callaspo</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91218&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Davis</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=455&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Guillen</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=677&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Lopez</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90851&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Powell</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1306&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Arias</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90826&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Gimenez</a>',
'J.Lopez&nbsp;<a id="2L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=679&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="6L" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90334&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91268&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Tejada</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1332&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Cash</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=516&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Hessman</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=100&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Blanco</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91232&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hester</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=557&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Jackson</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=123&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Bradley</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91206&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Brown</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1375&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Larish</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1388&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Nix</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1138&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Theriot</a>',
'J.Wilson&nbsp;<a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1240&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="2R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1241&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=932&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Quintero</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91201&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Barney</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90807&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Brantley</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91234&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Hughes</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91207&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Brown</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=465&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Gwynn Jr.</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=291&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Derosa</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=380&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Frandsen</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90857&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ryal</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=210&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Cedeno</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90818&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Escobar</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90853&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Reddick</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Abreu</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=14&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Alfonzo</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=20&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Anderson</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=31&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Atkins</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=33&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Ausmus</a>',
'<a id="3L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91202&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bell</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=78&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Belliard</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91204&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bourgeois</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1325&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bowker</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=145&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Buck</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91208&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Butera</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90809&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Cabrera</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91210&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Carson</a>',
'C.Carter&nbsp;<a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91211&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="6R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91212&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=202&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Castillo</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=215&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Chavez</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=222&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Church</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=244&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Cora</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=264&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Crosby</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91217&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Curtis</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1340&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Davis</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1342&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Dewitt</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1343&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Dickerson</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=301&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Dobbs</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90817&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Downs</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91222&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Durango</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=333&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Ellsbury</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91226&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Feliciano</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=357&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Feliz</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90827&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Greene</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=446&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Griffey Jr.</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=450&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Gross</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=451&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Grudzielanek</a>',
'<a id="4L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=461&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Guzman</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=489&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Harris</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=507&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hermida</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1358&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Hernandez</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=518&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Hill</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1360&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Hoffpauir</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=554&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Iwamura</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=555&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Izturis</a>',
'<a id="5L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90830&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Jaramillo</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=630&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Laird</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=689&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lugo</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91242&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Manzella</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1380&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Mather</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=723&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Mathis</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=725&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Matsui</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=727&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Matthews Jr.</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=759&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Miles</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91247&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Mitchell</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1383&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Montanez</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91248&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Moore</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=785&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Moore</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=790&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Morgan</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=822&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Navarro</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91253&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Navarro</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=827&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Nieves</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=840&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Ojeda</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91255&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">X.Paul</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90849&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Pena</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91256&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Plouffe</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=955&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Redmond</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90854&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Reimold</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1006&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Rowand</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1407&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ruiz</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91260&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Russo</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91264&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Sizemore</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1419&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Stavinoha</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1114&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Sullivan</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1155&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Towles</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1158&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Tracy</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1425&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Tuiasosopo</a>',
'<a id="4R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1427&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Velez</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91273&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Wallace</a>',
'B.Wood&nbsp;<a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1432&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91360&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90872&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Young Jr.</a>',//pitchers
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90250&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Hernandez</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91325&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Hudson</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90725&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Kershaw</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90430&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Oswalt</a>',
'J.Weaver&nbsp;<a id="2L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90623&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="3R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8543&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90613&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Wainwright</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90278&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">U.Jimenez</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91095&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Stauffer</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90604&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Verlander</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90721&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Johnson</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90314&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lester</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90684&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Buchholz</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8597&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Hudson</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90302&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Kuo</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=7711&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Halladay</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91050&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Latos</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90087&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Cain</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3117&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Rivera</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90041&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Benoit</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90507&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Sabathia</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91350&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Strasburg</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91098&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Thatcher</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90138&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Danks</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91318&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Garcia</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91016&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Cahill</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90727&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Kuroda</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90408&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Myers</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91084&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Price</a>',
'<a id="6L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90641&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Wilson</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90514&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Sanchez</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90553&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Soriano</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90517&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Santana</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91066&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Meek</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90611&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Wagner</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=5218&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Carpenter</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91034&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Gregerson</a>',
'<a id="7L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91028&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Feliz</a>',
'<a id="6R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90685&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Burnett</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90552&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Soria</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90713&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Happ</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91036&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Hanson</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90697&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Dickey</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91005&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Bailey</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90319&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Lilly</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91088&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Romero</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90248&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Hensley</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90231&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Hamels</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90225&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Guthrie</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90320&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Lincecum</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90220&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">Z.Greinke</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90315&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Lewis</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90498&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Rodriguez</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90723&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Kennedy</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91361&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Wood</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8149&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Dempster</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90708&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Gonzalez</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90596&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Valverde</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90353&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Marshall</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90044&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Billingsle</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90585&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Thornton</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90749&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.O\'Day</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90666&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Adams</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90349&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Marmol</a>',
'<a id="9L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90348&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Marcum</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90012&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Arroyo</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91003&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Anderson</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90097&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Carmona</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90203&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Garland</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91312&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Chacin</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90755&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Perez</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91317&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Frieri</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91308&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Bumgarner</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91303&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Axford</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91357&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Venters</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90731&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Liriano</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91006&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Bard</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90343&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Madson</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90059&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Braden</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90207&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Germano</a>',
'F.Rodriguez&nbsp;<a id="3R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90497&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="9R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91362&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91100&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Uehara</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90664&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Zumaya</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90569&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Street</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90461&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Pineiro</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90389&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Mitre</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90434&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">V.Padilla</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90766&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Romo</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90774&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Scherzer</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91091&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Sanches</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91322&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hellickson</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2713&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Moyer</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90340&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Lyon</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90444&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Peavy</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90160&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Downs</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90036&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Belisle</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91060&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Matusz</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90740&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.McClellan</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90516&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Santana</a>',
'<a id="9L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91027&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Duensing</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90267&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Hughes</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90000&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Aardsma</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90508&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Saito</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90037&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Bell</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2718&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Rhodes</a>',
'<a id="8L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91345&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Sanabia</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90466&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Putz</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90388&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Misch</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90665&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Acosta</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90660&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Zambrano</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90394&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Morrow</a>',
'<a id="7L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3116&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Pettitte</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90541&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Silva</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90683&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Breslow</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91331&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Lopez</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90663&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Zito</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90198&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Gallardo</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90190&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Franklin</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90694&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Crain</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90728&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.League</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91039&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Hernandez</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91020&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Clippard</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3237&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Lowe</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90101&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Casilla</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91065&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Medlen</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90240&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Haren</a>',
'<a id="7L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90192&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Fuentes</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90224&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Guerrier</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=6371&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Hernandez</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90628&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Westbrook</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90094&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Capps</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8187&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Pavano</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90317&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Lidge</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90361&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Matsuzaka</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90043&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Betancourt</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90745&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Mujica</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90759&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ramirez</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8108&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Chen</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91030&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Fister</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8672&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Wheeler</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90095&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Capuano</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91017&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Cecil</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91313&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Coleman</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91337&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Ogando</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91102&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Vargas</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90669&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Badenhop</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90185&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Floyd</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91083&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Porcello</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90435&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Papelbon</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90215&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Gorzelanny</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91349&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Storen</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90695&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Cueto</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90757&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Purcey</a>',
'<a id="8R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90703&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Figueroa</a>',
'<a id="7L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91082&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Perry</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90717&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Hochevar</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90152&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Dessens</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91073&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Niemann</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91105&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Wells</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8602&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Wolf</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90235&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hanrahan</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90358&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Masset</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91316&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Enright</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90147&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.De La Rosa</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91339&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Pauley</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90328&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Loe</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90671&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Balfour</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91351&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Takahashi</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91352&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Talbot</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90477&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Rauch</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90417&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.O\'Flaherty</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8558&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Farnsworth</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90729&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lewis</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91338&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Ondrusek</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90739&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Masterson</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90204&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Garza</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90304&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lackey</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90705&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Galarraga</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90020&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Bailey</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91355&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Tomlin</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90448&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Penny</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90688&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Carrasco</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90780&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Veras</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90272&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Jackson</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91336&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Nova</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2079&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Batista</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=7856&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Reyes</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90606&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Villanueva</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90191&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Frasor</a>',
'<a id="7L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90415&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Nunez</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90781&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Volstad</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90446&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Pelfrey</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91010&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Berken</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90747&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Nolasco</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2548&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Sweeney</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90778&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Troncoso</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91008&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Belisario</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90787&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Wood</a>',
'<a id="9L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91041&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Holland</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91046&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Jepsen</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91070&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Motte</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90764&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Richard</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90750&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ohlendorf</a>',
'<a id="9L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90784&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Walker</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90232&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hammel</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90579&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Tejeda</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90690&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Chamberlain</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90188&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Francis</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90544&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Slaten</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90189&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Francisco</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90275&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Jenks</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90074&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Buehrle</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90219&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Gregg</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90551&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Sonnanstine</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91075&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Norris</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91301&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Arrieta</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90674&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Bautista</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90091&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Camp</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90305&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Laffey</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3624&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Ho Park</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4500&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Wakefield</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=6866&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Wright</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91342&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Runzler</a>',
'<a id="8L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91346&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Santos</a>',
'J.Smith&nbsp;<a id="6R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90546&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="7R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91348&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90069&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Broxton</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91021&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Coke</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90124&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Contreras</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90424&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Olsen</a>',
'<a id="6L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3281&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Oliver</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90014&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Atchison</a>',
'<a id="6L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91071&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Narveson</a>',
'<a id="8L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90148&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Delcarmen</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91326&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Hughes</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91079&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Parnell</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90680&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Boggs</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90420&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Ohman</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90007&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Albers</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91305&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Berg</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=7677&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Millwood</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90545&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Slowey</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90128&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Cordero</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90478&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Ray</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91024&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Davis</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2937&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Miller</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90765&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Robertson</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91092&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Sipp</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90274&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Janssen</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91335&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Niese</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90496&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Rodney</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90501&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Romero</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90080&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Burres</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91358&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Walters</a>',
'<a id="7L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90244&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Heilman</a>',
'<a id="6L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90330&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Logan</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90051&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bonderman</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90345&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Maholm</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90454&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Perez</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91332&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Mejia</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8561&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Mota</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8201&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Dotel</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90306&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lannan</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90520&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Saunders</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90610&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Volquez</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91051&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Leblanc</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91359&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Webb</a>',
'<a id="8L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91306&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">Z.Braddock</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90715&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Harrison</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91068&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Mijares</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90447&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Pena</a>',
'<a id="9R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91356&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Valdes</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90681&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Boyer</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90140&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Davies</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91315&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Ely</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8161&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Garcia</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90395&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Moseley</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91009&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Bergesen</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91314&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Demel</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91031&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.French</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91324&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Herrmann</a>',
'<a id="7L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91347&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Simon</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91103&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Vasquez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91109&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Zimmermann</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91035&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Gutierrez</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90321&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Lindstrom</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91353&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Texeira</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90035&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Beimel</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91011&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Bonine</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91311&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Cashner</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90245&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Hendrickson</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90005&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Affeldt</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90082&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Bush</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90322&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Linebrink</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2403&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Moehler</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91032&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Fulchino</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90167&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Durbin</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91334&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Monasterios</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91076&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.O\'Sullivan</a>',
'<a id="7L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91300&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Ambriz</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91302&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Atilano</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90019&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Baez</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90021&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Baker</a>',
'<a id="8L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90025&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Bannister</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90033&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Beckett</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91304&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Bell</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90678&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Blackburn</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90049&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Blanton</a>',
'<a id="7L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90679&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Blevins</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91307&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Bullington</a>',
'A.Burnett&nbsp;<a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8661&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a>|<a id="3R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91309&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90084&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Byrdak</a>',
'<a id="8L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91310&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Carrasco</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2093&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Chacin</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91018&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Chavez</a>',
'<a id="9L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91019&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Choate</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90118&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Coffey</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90125&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Cook</a>',
'<a id="7L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90130&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Cormier</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90132&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Corpas</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90133&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Correia</a>',
'<a id="7L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90141&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Davis</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91025&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Detwiler</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2140&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Donnelly</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90165&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">Z.Duke</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90702&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Eveland</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90180&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Feldman</a>',
'<a id="6L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90181&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Feliciano</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90183&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Flores</a>',
'<a id="9L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90706&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Gallagher</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90205&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Gaudin</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91320&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Gomez</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91321&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Haeger</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90238&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Harang</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90714&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Harden</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91038&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Hawksworth</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91323&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Herndon</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3850&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Hoffman</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=7963&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Howry</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91042&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Huff</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91327&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Igarashi</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90286&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Jurrjens</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90722&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Karstens</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91047&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Kawakami</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90288&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Kazmir</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90290&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Kendrick</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91328&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Leake</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91329&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Lecure</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91330&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Lincoln</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90323&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Litsch</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90331&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Lohse</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90335&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Lopez</a>',
'<a id="8L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90344&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Mahay</a>',
'<a id="9L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90346&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Maine</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90351&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Marquis</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91056&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Martin</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91061&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">V.Mazzaro</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91062&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.McCutchen</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8055&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Meche</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90379&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Miller</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91333&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Minor</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90744&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Morton</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90398&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Moylan</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91074&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Nieve</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90413&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Nippert</a>',
'<a id="6L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90422&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Okajima</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90425&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Olson</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90426&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ortiz</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90433&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Owings</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91078&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Palmer</a>',
'<a id="6R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90753&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Parra</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91080&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Paulino</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90453&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Perez</a>',
'<a id="8R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90467&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Qualls</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90495&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Robertson</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91340&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Rogers</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91341&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Ross</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90503&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Rowland-Smith</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91343&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Russell</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91089&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Rzepczynski</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91344&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Salas</a>',
'<a id="9L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90511&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Sampson</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90535&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Sheets</a>',
'<a id="9L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90536&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Sherrill</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90537&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Shields</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90538&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Shields</a>',
'<a id="9L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90776&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Smith</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90549&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Snell</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90554&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Sosa</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91094&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Stammen</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1631&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Suppan</a>',
'<a id="9L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90573&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Tallet</a>',
'<a id="6L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91354&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Thomas</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91099&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Tillman</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8190&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Vazquez</a>',
'<a id="8R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90625&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Wellemeyer</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91107&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.White</a>',
'<a id="8L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90639&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Willis</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90788&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Wright</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90655&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Wuertz</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90791&year=2010\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Ziegler</a>');


var the2011Array = new Array('<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=597&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Kemp</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=66&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bautista</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=333&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Ellsbury</a>',
'A.Gonzalez&nbsp;<a id="4R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=423&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="2L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=425&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a> | <a id="3L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1353&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">3</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1161&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Tulowitzki</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=126&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Braun</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1195&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Votto</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=881&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Pedroia</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91434&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Parmelee</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=820&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Napoli</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1277&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Zobrist</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=906&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Phillips</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=431&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Gordon</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=182&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Cano</a>',
'<a id="4L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1187&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Victorino</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=924&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Pujols</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90841&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.McCutchen</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=889&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Pence</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=80&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Beltran</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=439&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Granderson</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=360&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Fielder</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90802&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Avila</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=527&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Holliday</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91415&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Lawrie</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91266&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Stanton</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=999&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Rollins</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1166&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Upton</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1354&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Gonzalez</a>',
'J.Reyes&nbsp;<a id="1R" title="s" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=967&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="1L" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90486&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91441&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Pill</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=281&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.De Aza</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=849&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Ortiz</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1377&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Longoria</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=611&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Kinsler</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=782&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Molina</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91411&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Jennings</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91426&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Morse</a>',
'<a id="4R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=35&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Aybar</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=117&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Bourn</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=81&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Beltre</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=87&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Berkman</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1326&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bruce</a>',
'M.Young&nbsp;<a id="2L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1269&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="3R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91463&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="4R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1411&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Sandoval</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91219&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Davis</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=501&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Helton</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=100&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Blanco</a>',
'A.Ramirez&nbsp;<a id="2R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=938&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="1R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1394&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=617&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Konerko</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=408&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Giambi</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=379&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Francoeur</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91437&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Perez</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1165&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Upton</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91425&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Montero</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91205&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Bourjos</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=341&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Escobar</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=486&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hardy</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=706&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Markakis</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=885&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Pena</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=491&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Hart</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=474&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hamilton</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91405&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Guzman</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=167&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Cabrera</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90817&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Downs</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=621&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Kotchman</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91365&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Alonso</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91399&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Freeman</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=599&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Kendrick</a>',
'<a id="4L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1132&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Teixeira</a>',
'M.Cabrera&nbsp;<a id="E" title="s" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=170&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="2R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=171&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1374&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Lahair</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90839&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Mayberry Jr.</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=730&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Maybin</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90801&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Andrus</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=719&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">V.Martinez</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=532&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Howard</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1372&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Joyce</a>',
'<a id="3L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1324&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Bonifacio</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1262&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Youkilis</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=480&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hannahan</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91221&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Duda</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90847&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Parra</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91216&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Craig</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1121&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Swisher</a>',
'T.Hunter&nbsp;<a id="2L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=545&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="5R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91043&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="6R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=784&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Montero</a>',
'A.Rodriguez&nbsp;<a id="2R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=990&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="3R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91524&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=161&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Butler</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=271&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Damon</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90822&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Fox</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91442&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Presley</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1003&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Ross</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1264&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Young</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91409&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Hosmer</a>',
'<a id="8L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90871&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Wieters</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91224&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Ellis</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1376&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Lillibridge</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1275&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Zimmerman</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1351&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Gardner</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=781&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Molina</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91402&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Goldschmidt</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=546&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Iannetta</a>',
'A.Jones&nbsp;<a id="4R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=580&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="2L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=581&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90863&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Sutton</a>',
'<a id="4L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91263&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Santana</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1234&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Willingham</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91262&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Sanchez</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91438&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Petersen</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=583&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Jones</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1011&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Ryan</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=269&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Cuddyer</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91274&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Wells</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=344&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Ethier</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1356&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Hanigan</a>',
'<a id="8L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91417&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Liddi</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1009&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Ruiz</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90855&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Roberts</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=925&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Punto</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=319&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Duncan</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1366&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Hundley</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=633&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Langerhans</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=734&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.McCann</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91258&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Ramos</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91272&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Walker</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=268&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Cruz</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90821&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Fowler</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90862&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Stubbs</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1169&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Utley</a>',
'<a id="4L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1357&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Headley</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91268&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Tejada</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1386&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Murphy</a>',
'M.Reynolds&nbsp;<a id="2R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=968&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="5R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91523&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90853&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Reddick</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1219&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Werth</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=556&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Izturis</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91376&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Carp</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91231&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Heisey</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1141&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Thome</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91228&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Freese</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91235&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Jackson</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90818&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Escobar</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1080&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Snyder</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=174&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Cairo</a>',
'<a id="5R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Betemit</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91370&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Belt</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=513&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Hernandez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1257&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Wright</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1002&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Ross</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=192&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Carroll</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90805&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Blanks</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=285&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.DeJesus</a>',
'<a id="4L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90830&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Jaramillo</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=790&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Morgan</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91381&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Constanza</a>',
'<a id="3L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91225&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Espinosa</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=674&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Loney</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=918&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Polanco</a>',
'E.Chavez&nbsp;<a id="1R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=214&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="E" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=215&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91460&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Trumbo</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91264&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Sizemore</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=177&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Callaspo</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91237&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Jay</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1428&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Venable</a>',
'J.Peralta&nbsp;<a id="2R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=891&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="9L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90449&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1037&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Schierholtz</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=310&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Drew</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=714&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Martin</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=550&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Infante</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91267&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Tabata</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1350&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Fukudome</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91257&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Posey</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91396&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Flowers</a>',
'<a id="6R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1120&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Sweeney</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=67&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bay</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90823&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Fuld</a>',
'C.Lee&nbsp;<a id="6L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=644&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="2L" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90311&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="3L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90813&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Conrad</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=421&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Gomez</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91363&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Ackley</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=646&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Lee</a>',
'<a id="8R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91373&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Bogusevic</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=468&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hairston Jr.</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91251&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Morrison</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1026&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Sanchez</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=305&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Doumit</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91461&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Turner</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1315&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Barmes</a>',
'<a id="8L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91419&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Martinez</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90833&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Kottaras</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91413&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Kipnis</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90807&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Brantley</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=728&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Mauer</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90854&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Reimold</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=376&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Francisco</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91450&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Sands</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1348&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Evans</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=261&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Crawford</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1402&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Rodriguez</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90834&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Laporta</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1046&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Scutaro</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1391&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Pennington</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1303&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Andino</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91398&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Frazier</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=929&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Quentin</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=539&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Hudson</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91220&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Donald</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1021&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Saltalamacchia</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1088&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Soto</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1335&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Choo</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91400&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Gentry</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91203&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Boesch</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91233&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Heyward</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=565&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Jeter</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1379&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Maier</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=263&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Crisp</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91241&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lucroy</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=467&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Hafner</a>',
'<a id="5R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91433&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Paredes</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91214&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Castro</a>',
'<a id="8R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91227&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Francisco</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=465&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Gwynn Jr.</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91230&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Hayes</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91391&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Descalso</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1178&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Varitek</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=807&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Nix</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=51&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Barajas</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=658&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Lind</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91449&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Rosario</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=624&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Kubel</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=98&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Blake</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91393&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Dirks</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1415&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Smith</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91265&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Smoak</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=517&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Hill</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1117&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Suzuki</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91462&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Weeks</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1218&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">V.Wells</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1341&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Denorfia</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1418&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Span</a>',
'<a id="6R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=584&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Jones</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1406&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Ruggiano</a>',
'<a id="6R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=522&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Hinske</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91204&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bourgeois</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1318&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Bernadina</a>',
'<a id="8R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=104&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Blum</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1152&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Torrealba</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1227&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Wigginton</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91250&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Moreland</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1116&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Suzuki</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91369&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Arencibia</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90815&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Desmond</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=744&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.McLouth</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90800&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Allen</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90836&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Marson</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=490&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Harris</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91254&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Nunez</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91452&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Seager</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=279&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Davis</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=335&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Encarnacion</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=913&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Pierzynski</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90826&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Gimenez</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1308&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Aviles</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=144&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Buck</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=942&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Ramirez</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=978&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Rivera</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=843&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Olivo</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90804&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Beckham</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91443&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Pridie</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91459&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Trout</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=622&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Kotsay</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=998&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Rolen</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=24&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ankiel</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91457&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Thames</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Abreu</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91427&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Moustakas</a>',
'<a id="8R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91255&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">X.Paul</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91201&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Barney</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91387&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Cruz</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90865&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Thole</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=912&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Pierre</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1159&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Treanor</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91270&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Valencia</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90811&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Cervelli</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=331&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Ellis</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=921&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Prado</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=163&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Byrd</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91247&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Mitchell</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1063&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Shoppach</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91394&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Dominguez</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91431&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Oeltjen</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=541&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Huff</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1336&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Christian</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1340&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Davis</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91246&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Miranda</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1138&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Theriot</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=469&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Hairston</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91432&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Pacheco</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91271&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Viciedo</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1266&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Young</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=206&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Castro</a>',
'<a id="8R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=920&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Posada</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91453&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Sellers</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1388&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Nix</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91456&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Stewart</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91273&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Wallace</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=61&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Barton</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=724&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Matsui</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90842&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.McDonald</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91454&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Shuck</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91379&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Chisenhall</a>',
'A.Sanchez&nbsp;<a id="2L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91261&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="3L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90513&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90852&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Rasmus</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90861&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Schafer</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1214&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Weeks</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=103&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Bloomquist</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1164&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Uggla</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91366&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Altuve</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91406&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Halman</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90832&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Kelly</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91445&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Revere</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90806&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Borbon</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91385&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Cowgill</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1032&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Santiago</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90870&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Whiteside</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=124&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Branyan</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=179&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Cameron</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=458&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Gutierrez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91249&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Morel</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91253&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Navarro</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=936&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Raburn</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90868&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Torres</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=792&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Morneau</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=876&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Paulino</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91375&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Campana</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=42&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Baker</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=547&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ibanez</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=870&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Patterson</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1006&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Rowand</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1170&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Valdez</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91408&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Harrison</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=371&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Fontenot</a>',
'J.McDonald&nbsp;<a id="1R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=740&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="4R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91063&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=557&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Jackson</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=630&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Laird</a>',
'A.Laroche&nbsp;<a id="3L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=637&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="1R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=636&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'B.Wood&nbsp;<a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1432&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91360&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91389&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Darnell</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=301&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Dobbs</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=759&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Miles</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1416&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Snider</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91451&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Sappelt</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=197&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Casilla</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=688&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ludwick</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=57&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Burroughs</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=309&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Drew</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=551&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Inge</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=857&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Overbay</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91395&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Field</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1359&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Herrera</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=607&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Keppinger</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=291&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Derosa</a>',
'R.Johnson&nbsp;<a id="4L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90831&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=577&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=244&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Cora</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=928&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Repko</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=156&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Burrell</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1343&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Dickerson</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91403&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Gordon</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91206&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Brown</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=420&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Gomes</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91418&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Marrero</a>',
'<a id="6R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91455&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Sogard</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91238&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Johnson</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91256&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Plouffe</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=387&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Furcal</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91410&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Hughes</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=932&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Quintero</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=993&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Rodriguez</a>',
'J.Wilson&nbsp;<a id="1R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1240&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1241&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=819&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">X.Nady</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91239&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Ka\'aihue</a>',
'<a id="3L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1378&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lowrie</a>',
'B.Wilson&nbsp;<a id="6L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91275&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="3L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90786&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=14&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Alfonzo</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=975&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Rios</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1045&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Scott</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1069&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Sizemore</a>',
'<a id="6R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=52&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bard</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91420&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Martinez</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91440&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Phillips</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91236&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Jaso</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91397&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Forsythe</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91378&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Chirinos</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=453&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">V.Guerrero</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=623&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Kouzmanoff</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91244&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.McCoy</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=60&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bartlett</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91412&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Johnson</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=601&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Kennedy</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1193&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Vizquel</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1339&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Cunningham</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1044&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Schumaker</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1133&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Tejada</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90848&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Pena</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=994&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Rodriguez</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91377&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Carrera</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91386&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Crawford</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91223&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Dyson</a>',
'J.Lopez&nbsp;<a id="2R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=679&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="7L" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90334&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90844&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Morales</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91423&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.McKenry</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1320&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Bixler</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1094&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Spilborghs</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91368&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Angle</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=347&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Everett</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1369&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Janish</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90843&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.McGehee</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1390&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Patterson</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90864&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Tatum</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91380&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Conger</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=822&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Navarro</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1168&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Uribe</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91421&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Martinez</a>',
'D.Murphy&nbsp;<a id="E" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=810&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="5R" title="l" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=809&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91458&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Tosoni</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=270&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Cust</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=575&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Johnson</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1380&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Mather</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=786&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Mora</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1084&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Soriano</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=365&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Flores</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91364&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Adams</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91200&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Alvarez</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91367&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Amarista</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=18&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Amezaga</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91202&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Bell</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91371&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Benson</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Betancourt</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91372&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Blackmon</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=95&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Blanco</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=123&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Bradley</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90808&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Brignac</a>',
'<a id="6R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=145&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Buck</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1327&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Burriss</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91208&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Butera</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=172&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Cabrera</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=183&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Cantu</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91211&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Carter</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=210&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Cedeno</a>',
'<a id="8R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90812&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Coghlan</a>',
'<a id="4R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91215&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Colvin</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91382&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Cooper</a>',
'<a id="2L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91383&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Corporan</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=258&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Counsell</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91384&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Cousins</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91388&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.D\'Arnaud</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91390&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Davis</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1342&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Dewitt</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=296&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Diaz</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91392&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Dinkelman</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=320&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Dunn</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=362&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Figgins</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90825&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Getz</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91401&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Giavotella</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=409&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Gibbons</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=417&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Gload</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90827&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Greene</a>',
'<a id="5R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=455&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Guillen</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91404&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Guyer</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=470&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Hall</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91407&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Hamilton</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=495&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Hawpe</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=500&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Helms</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=507&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hermida</a>',
'<a id="3R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=518&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Hill</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=572&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Johnson</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=594&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Kearns</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91416&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Lemahieu</a>',
'<a id="6R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=651&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Lewis</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=677&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Lopez</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=689&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lugo</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=723&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Mathis</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91424&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Mesoraco</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=757&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Michaels</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1383&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Montanez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91428&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Nelson</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91429&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Nickeas</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=827&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Nieves</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91430&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Nishioka</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=847&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Ordonez</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=848&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Orr</a>',
'<a id="E" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=863&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Pagan</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91435&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Parrino</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=879&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Pearce</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91436&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Peguero</a>',
'<a id="2R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90849&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Pena</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=888&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Mo Pena</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91439&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Phelps</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=911&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Pie</a>',
'<a id="1L" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90851&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Powell</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=960&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Renteria</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91259&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Rhymes</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91446&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Rivera</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91447&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Rizzo</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=983&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Roberts</a>',
'<a id="4R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91448&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Robinson</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90856&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Rosales</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90859&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Saunders</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1040&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Schneider</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1097&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Stairs</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1106&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Stewart</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1131&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Teahen</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1136&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Thames</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1423&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Tolbert</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1155&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Towles</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1426&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Valbuena</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=1431&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Wise</a>',
'<a id="1R" title="S" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90872&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Young Jr.</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90604&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Verlander</a>',//pitchers
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90725&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Kershaw</a>',
'J.Johnson&nbsp;<a id="5R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90721&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="3L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90720&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90087&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Cain</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91030&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Fister</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=7711&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Halladay</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90231&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Hamels</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90623&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Weaver</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90320&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Lincecum</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91088&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Romero</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90537&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Shields</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90641&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Wilson</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8597&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Hudson</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90723&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Kennedy</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90240&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Haren</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90708&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Gonzalez</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90695&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Cueto</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90348&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Marcum</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3117&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Rivera</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91308&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Bumgarner</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90666&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Adams</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91513&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Moscoso</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90766&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Romo</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90033&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Beckett</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91501&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Jansen</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91502&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Kimbrel</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90204&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Garza</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91499&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Holland</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90739&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Masterson</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91529&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Sanchez</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=5218&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Carpenter</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90198&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Gallardo</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91520&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Pineda</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2581&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Vogelsong</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90435&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Papelbon</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91020&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Clippard</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91500&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Humber</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91481&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Collmenter</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91344&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Salas</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91517&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Patton</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91337&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Ogando</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91357&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Venters</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91001&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Aceves</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90507&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Sabathia</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91504&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Luebke</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91084&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Price</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91346&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Santos</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90702&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Eveland</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91508&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Martinez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90364&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.McCarthy</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90043&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Betancourt</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90021&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Baker</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91303&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Axford</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91507&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Lynn</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91349&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Storen</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90466&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Putz</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90596&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Valverde</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90331&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Lohse</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90147&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.de la Rosa</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91100&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Uehara</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90101&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Casilla</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91109&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Zimmermann</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90160&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Downs</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90546&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Smith</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90185&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Floyd</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90235&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hanrahan</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90250&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Hernandez</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91528&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Sale</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8190&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Vazquez</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90220&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">Z.Greinke</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91322&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hellickson</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90417&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.O\'Flaherty</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90765&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Robertson</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90353&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Marshall</a>',
'<a id="9L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90180&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Feldman</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91465&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Alburquerque</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91006&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Bard</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91341&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Ross</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91493&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Estrada</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90343&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Madson</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91477&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Cishek</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90728&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.League</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90041&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Benoit</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91070&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Motte</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91469&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Beachy</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91039&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Hernandez</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91329&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Lecure</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91532&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Spence</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91336&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">I.Nova</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91325&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Hudson</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90606&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Villanueva</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91468&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Bastardo</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91486&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Delgado</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90314&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lester</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91355&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Tomlin</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90745&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Mujica</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91466&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Alvarez</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90221&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Grilli</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91050&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Latos</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90274&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Janssen</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91318&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Garcia</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90345&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Maholm</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8558&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Farnsworth</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91511&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Melancon</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90671&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Balfour</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3281&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Oliver</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91005&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Bailey</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90759&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ramirez</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91351&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Takahashi</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90037&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Bell</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90328&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Loe</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91497&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Guerra</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90715&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Harrison</a>',
'<a id="9L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91339&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Pauley</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90128&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Cordero</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90697&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Dickey</a>',
'<a id="7L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91543&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">V.Worley</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90034&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Bedard</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90074&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Buehrle</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90498&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Rodriguez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91478&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Cobb</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90319&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Lilly</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90756&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Perkins</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90782&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Wade</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90224&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Guerrier</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91542&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Wilhelmsen</a>',
'<a id="8R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90361&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Matsuzaka</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91097&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Swarzak</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91492&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Eovaldi</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90286&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Jurrjens</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90727&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Kuroda</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90444&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Peavy</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91519&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">V.Pestano</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91328&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Leake</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91036&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Hanson</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90755&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Perez</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90682&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Bray</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8602&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Wolf</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8201&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">O.Dotel</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91038&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Hawksworth</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90192&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Fuentes</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91467&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Bass</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91491&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Elbert</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91041&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Holland</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3071&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Hawkins</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91102&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Vargas</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91071&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Narveson</a>',
'<a id="7L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90005&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Affeldt</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90394&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Morrow</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90585&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Thornton</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90395&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Moseley</a>',
'<a id="5R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91003&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Anderson</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91312&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Chacin</a>',
'<a id="6L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91025&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Detwiler</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91509&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Mattheus</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90516&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Santana</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91028&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Feliz</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91075&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Norris</a>',
'F.Rodriguez&nbsp;<a id="6R" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90497&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="3L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91525&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90138&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Danks</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90774&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Scherzer</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8108&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Chen</a>',
'<a id="7L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90694&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Crain</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91090&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Samardzija</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91472&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">Z.Britton</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90408&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Myers</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90315&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Lewis</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90684&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Buchholz</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91092&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Sipp</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2079&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Batista</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90731&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Liriano</a>',
'<a id="9L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90248&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Hensley</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90321&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Lindstrom</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91514&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Nicasio</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90349&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Marmol</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90780&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Veras</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91474&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Cassevah</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90036&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Belisle</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91539&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Walden</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90722&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Karstens</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91083&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Porcello</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91473&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Brothers</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91359&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Webb</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90520&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Saunders</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91319&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Gee</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90323&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Litsch</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91095&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Stauffer</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90225&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Guthrie</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91521&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Ramos</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91535&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Tateyama</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90290&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Kendrick</a>',
'<a id="8R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90415&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Nunez</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8285&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Nathan</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91540&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Watson</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91091&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Sanches</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90740&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.McClellan</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90278&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">U.Jimenez</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90189&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Francisco</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90430&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Oswalt</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90020&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Bailey</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91537&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Thompson</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8561&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Mota</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90514&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Sanchez</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91034&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Gregerson</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91335&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Niese</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91338&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Ondrusek</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90094&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Capps</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91475&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Chapman</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91073&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Niemann</a>',
'<a id="6L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91021&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Coke</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90015&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Ayala</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91526&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Rodriguez</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8672&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Wheeler</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91042&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Huff</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90669&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Badenhop</a>',
'A.Burnett&nbsp;<a id="1L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91309&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">1</a> | <a id="2L" title="r" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8661&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">2</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91484&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.De Los Santos</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91490&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Dunn</a>',
'<a id="8L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90137&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Cruz</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=7677&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Millwood</a>',
'<a id="6L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91089&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Rzepczynski</a>',
'<a id="9L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91017&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Cecil</a>',
'<a id="8R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=7630&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Colon</a>',
'<a id="8R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90553&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Soriano</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90680&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Boggs</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91516&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Paterson</a>',
'<a id="8R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91310&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Carrasco</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=6866&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Wright</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91480&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Collins</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90454&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Perez</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91483&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.De La Rosa</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91495&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Gomes</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91534&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Stutes</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91079&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Parnell</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90787&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Wood</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91317&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Frieri</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90426&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ortiz</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90791&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Ziegler</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90665&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Acosta</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91331&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Lopez</a>',
'<a id="6L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91536&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Teaford</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90420&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Ohman</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90552&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Soria</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90272&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Jackson</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90330&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Logan</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90219&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Gregg</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90536&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Sherrill</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90734&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Lowe</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91479&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Coleman</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91016&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Cahill</a>',
'<a id="7L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90215&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Gorzelanny</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91505&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lueke</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91105&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Wells</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90685&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Burnett</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90118&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Coffey</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=3237&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Lowe</a>',
'<a id="8R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90467&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Qualls</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90044&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Billingsley</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90306&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lannan</a>',
'<a id="7L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91527&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Russell</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90569&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Street</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90667&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Arredondo</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91470&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Beato</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90683&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Breslow</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90271&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Isringhausen</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91503&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lindblom</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90391&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Morales</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8187&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Pavano</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91464&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Adcock</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90097&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Carmona</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90341&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Macdougal</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90747&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Nolasco</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91522&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Resop</a>',
'<a id="2R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91333&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Minor</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90478&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Ray</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91103&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Vasquez</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90617&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Wang</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90191&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Frasor</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8161&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Garcia</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90238&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Harang</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91471&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Beavan</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=6371&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Hernandez</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91506&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lyles</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90358&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Masset</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90477&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Rauch</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90660&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Zambrano</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90717&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Hochevar</a>',
'<a id="9L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90639&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Willis</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90095&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Capuano</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90389&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Mitre</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90764&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Richard</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90232&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Hammel</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90014&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Atchison</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91496&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Gray</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90446&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Pelfrey</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90757&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Purcey</a>',
'<a id="7L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90002&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Accardo</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90007&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Albers</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91301&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Arrieta</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90012&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Arroyo</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90019&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Baez</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90670&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Balester</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91304&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Bell</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91009&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Bergesen</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91010&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Berken</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90678&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">N.Blackburn</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90049&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Blanton</a>',

'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90082&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Bush</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90084&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Byrdak</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90091&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Camp</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90688&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Carrasco</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91476&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Chatwood</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91313&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Coleman</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90125&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Cook</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90133&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Correia</a>',
'<a id="8R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91482&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Crow</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90140&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Davies</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90141&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Davis</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91024&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Davis</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91485&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Del Rosario</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=8149&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Dempster</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91487&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Diamond</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91488&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Drabek</a>',
'<a id="9L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91027&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Duensing</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91489&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Duffy</a>',
'<a id="8L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90165&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">Z.Duke</a>',
'<a id="8L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90700&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Dumatrait</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90167&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Durbin</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91316&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Enright</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90188&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Francis</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91032&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Fulchino</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91494&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Furbush</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90705&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Galarraga</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90203&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Garland</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91320&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Gomez</a>',
'<a id="8L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90709&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Gonzalez</a>',
'<a id="2L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90217&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Grabow</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91498&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Hand</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90713&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Happ</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90714&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Harden</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90244&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Heilman</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91323&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Herndon</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91324&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Herrmann</a>',
'<a id="9L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90262&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Howell</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90267&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">P.Hughes</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91327&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Igarashi</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91045&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Jakubauskas</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90304&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Lackey</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90305&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Laffey</a>',
'<a id="7R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91051&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Leblanc</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91330&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Lincoln</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90322&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Linebrink</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90335&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Lopez</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90351&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Marquis</a>',
'<a id="1L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91060&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Matusz</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91510&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">Y.Maya</a>',
'<a id="6R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91062&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.McCutchen</a>',
'<a id="3L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91068&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Mijares</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91512&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">W.Miley</a>',
'<a id="1R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90379&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Miller</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91069&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Mortensen</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90744&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Morton</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91515&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Noesi</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91076&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.O\'Sullivan</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90750&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Ohlendorf</a>',
'<a id="6L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91077&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Outman</a>',
'<a id="7R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90433&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Owings</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91080&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Paulino</a>',
'<a id="6L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90448&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Penny</a>',
'<a id="5L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91518&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">L.Perez</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91082&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">R.Perry</a>',
'<a id="1R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90461&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Pineiro</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90465&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">S.Proctor</a>',
'<a id="9R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90762&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">G.Reynolds</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=2718&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Rhodes</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90496&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">F.Rodney</a>',
'<a id="2R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91340&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Rogers</a>',
'<a id="4L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91343&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Russell</a>',
'<a id="7L" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91530&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">D.Schlereth</a>',
'<a id="3L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91347&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Simon</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90545&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">K.Slowey</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90551&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.Sonnanstine</a>',
'<a id="4R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91531&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">H.Sosa</a>',
'<a id="1L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91533&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">Z.Stewart</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91352&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Talbot</a>',
'<a id="2L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91099&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Tillman</a>',
'<a id="E" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90610&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">E.Volquez</a>',
'<a id="5R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90781&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">C.Volstad</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=4500&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Wakefield</a>',
'<a id="4L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90628&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Westbrook</a>',
'<a id="3R" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91541&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">A.White</a>',
'<a id="8L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90635&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">J.Williams</a>',
'<a id="E" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=91361&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">T.Wood</a>',
'<a id="5L" title="R" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90655&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">M.Wuertz</a>',
'<a id="3R" title="L" href="javascript:SNOpenWindow(\'/stratomatic/league/player.html?player_id=90663&year=2011\', \'_blank\', 650, 880, \'scrollbars=yes\');">B.Zito</a>');





//Find Duplicates http://stackoverflow.com/questions/840781/easiest-way-to-find-duplicate-values-in-a-javascript-array

/*To use, uncomment this line:
 *
  myString = myString + '\'' + theLinkText + '\'' + ','+'\r\n';
 *
  in 'Player Links For Game Account' GM script and then run 'Player Links For Game Account'.
*/

var myString = '';

Array.prototype.unique = function () {
    var r = new Array();

    o:for(var i = 0, n = this.length; i < n; i++)
    {
        for(var x = 0, y = r.length; x < y; x++)
        {
		
                if(r[x]==this[i])
                {
                myString += this[i] + '\r\n';

                        continue o;
                }
        }
        r[r.length] = this[i];
    }
        //GM_log(myString);
    return r;
	
}

var arr = [1,2,2,3,3,4,5,6,2,3,7,8,5,9];



/*
2011 Season duplicates
M.Cabrera
A.Ramirez
A.Jones
D.Murphy
E.Chavez
A.Gonzalez
R.Johnson
A.Gonzalez
A.Laroche
D.Murphy
J.Wilson
M.Young
C.Lee
J.Peralta
A.Sanchez
J.Johnson
B.Wilson
F.Rodriguez
B.Wood
M.Reynolds
J.Lopez
T.Hunter
A.Burnett
J.McDonald
J.Reyes
A.Rodriguez
*/

/*
2010 Season duplicates
A.Gonzalez
A.Jones
A.Ramirez
D.Young
R.Johnson
M.Cabrera
J.Baker
C.Carter
J.Castro
A.Laroche
J.Wilson
J.Peralta
C.Lee
B.Wilson
A.Sanchez
T.Hunter
J.McDonald
J.Lopez
B.Wood
A.Burnett
F.Rodriguez
J.Smith
J.Weaver
*/


/*
BTT90's duplicates
R.Thompson
J.Valentin
C.Jones
E.Perez
D.Bell
J.Reed
M.Sweeney
D.Martinez
D.Jackson
J.Howell
L.Smith
J.Franco
T.Worrell
B.Anderson
B.Williams
M.Williams
*/

var scoringPosition;

var unique = arr.unique();

//Find Duplicates


var theTeams = document.evaluate("//div[@class='text11']/text()[2]|//div[@class='text11']/text()[4]",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var theTeam;
var theTeam2='';
var playerSet;


for (var i = 0; i < theTeams.snapshotLength; i++) {

	theTeam = theTeams.snapshotItem(i);

	if(i==1)
	{
		playerSet = theTeam.nodeValue;
		playerSet = trim(playerSet);

	}
	else
	{
		theTeam = theTeam.nodeValue;
		theTeam = trim(theTeam);
	}

	

	if(i + 1 == theTeams.snapshotLength){
		
		theTeam2 += theTeam;
	}
	else
	{
		
		theTeam2 += theTeam + "-";
	}



}

if(theTeam2.indexOf(',')!=-1){

	theTeam2=theTeam2.replace(/,/g,'');

}

var boxscore,story;
var blank;

var inning = 1; //default 1

var allElements, thisElement,thisElement2;
allElements = document.getElementsByTagName('pre');
    thisElement = allElements[1];
    thisElement2 = allElements[0];
boxscore = thisElement.innerHTML;


var boxscoreNoPlayAccount = boxscore.substring(0,boxscore.indexOf('*** TOP OF INNING 1 ***'));

var boxscoreLength = boxscore.length;

if(playerSet == 'Back to the \'90s'){

	var newboxscore ='<td class="odd"><b>Outs</b></td><td nowrap class="odd"><b>On Base</b></td><td class="odd"><b>Name</b></td><td class="odd"><b>Pitches</b></td><td class="odd"><b>Result</b></td><td class="odd"><b>Advances</b></td><td class="odd"><b>Chances</b></td><td class="odd"><b>Fatigue</b></td><td class="odd"><b>Pitcher</b></b></td></tr>';

}
else
{
	var newboxscore ='<td class="odd"><b>Outs</b></td><td nowrap class="odd"><b>On Base</b></td><td class="odd"><b>Name</b></td><td class="odd"><b>Roll</b></td><td class="odd"><b>Result</b></td><td class="odd"><b>Advances</b></td><td class="odd"><b>Chances</b></td><td class="odd"><b>Fatigue</b></td><td class="odd"><b>Pitcher</b></b></td></tr>';

}
story = thisElement2.innerHTML;

var visitor = story.substring(0,story.indexOf("."));
var home = story.substring( story.indexOf("\n") + 1,story.indexOf(".", story.indexOf("\n") + 1));

var visitorRoll = 0;
var visitorRollPitcher = 0;
var homeRoll = 0;
var homeRollPitcher = 0;

var visitorBPHR = '';
var visitorBPOUTS = '';

var homeBPHR = '';
var homeBPOUTS = '';

var visitorPitcher = boxscore.substring(boxscore.indexOf("PC    ERA") + 10,boxscore.indexOf("PC    ERA") + 35);
visitorPitcher = visitorPitcher.split(" ");
var homePitcher = boxscore.substring(boxscore.indexOf("PC    ERA",boxscore.indexOf("PC    ERA") + 37) + 10,boxscore.indexOf("PC    ERA",boxscore.indexOf("PC    ERA") + 37) + 35);
homePitcher = homePitcher.split(" ");

var howManyInningsIndex = boxscore.lastIndexOf("BOTTOM OF INNING ");
var howManyInnings = boxscore.substring(howManyInningsIndex + 17,howManyInningsIndex + 19);
howManyInnings = trim(howManyInnings);
howManyInnings = parseFloat(howManyInnings)+2;



var newLine;		
var oldLine;

var outs;
var onBase;
var playerName;
var diceRoll;
var pitchesThrown;
var theEndResult;
var advance;
var chance;
var fatigue;
var pitcher;


for ( var i = inning; i < howManyInnings; i++) 
{ 

	for (var m = 1; m < 3; m++){

		var m2 = m/2;

		if (m2 == m2.toFixed())
		{
			halfInning = "BOTTOM";
			halfInning2 = "BOT";
			patternString = halfInning + " OF INNING " + i + " ";


			patternString4 = halfInning2 + " OF " + i + " ";
			
			var pattern = new RegExp(patternString, "g");
			
			while((result = pattern.exec(boxscore)) != null){
				var iNew = i + 1;

				var fullLine = boxscore.substring(result.index-4,boxscore.indexOf("TOP OF INNING " +  iNew , result.index) - 4);
				var fullLine2 = boxscore.substring(result.index+22,boxscore.indexOf("TOP OF INNING " +  iNew , result.index) - 4);
			

				if (iNew >= 11){

					var fullLine2 = boxscore.substring(result.index+23,boxscore.indexOf("TOP OF INNING " +  iNew , result.index) - 4);
					
				}

				var topOfInning1 = boxscore.substring(result.index + 26,boxscore.indexOf("TOP OF INNING " +  iNew , result.index) - 4);
				

				topOfInning1 = ltrim(topOfInning1);
				
				
				if (boxscore.indexOf("TOP OF INNING " +  iNew , result.index) == -1){

					if (iNew >= 10){
						var topOfInning1 = boxscore.substring(result.index + 27,boxscoreLength - 4);
						topOfInning1 = ltrim(topOfInning1);
						var fullLine2 = boxscore.substring(result.index + 23,boxscoreLength);
						
					//count++;
						newboxscore += '<tr class="databox_header black"><td colspan="9" class="tcenter">*** ' + patternString + '***</td></tr>' + '\n';
					
					}
					else
					{
						var topOfInning1 = boxscore.substring(result.index + 26,boxscoreLength - 4);
						topOfInning1 = ltrim(topOfInning1);
						var fullLine2 = boxscore.substring(result.index + 20,boxscoreLength - 4);
						
						
						
						newboxscore += '<tr class="databox_header black"><td colspan="9" class="tcenter">*** ' + patternString + '***</td></tr>' + '\n';
					}


				}
				

				topOfInning1 = topOfInning1.replace(/&amp;/g,"&");
				

				var pattern2 = /\n/;
				var result2;
				result2 = pattern2.exec(topOfInning1);
				var cr = result2.index;

				var atBat1 = topOfInning1.substring(0,20);


				if (trim(atBat1) == ""){

					atBat1 = "&nbsp;";					

				}				

				if (atBat1.search(/\UBSTITUTE/) != -1){

					var result1 = topOfInning1.substring(0,41);//changed from 31 to 41 for longer names likeJonathan Papelbon


					if (result1.indexOf('\n') != -1){
						result1 = result1.substring(0,result1.indexOf('\n'));
					}

					atBat1 = "&nbsp;";

				}
				else
				{
					var result1 = topOfInning1.substring(25,56);

				}

				result1 = result1.replace(/&amp;/,"&");

				
				
				if (result1.match("SUBSTITUTE P ")){

					//visitorPitcher[0] = result1.substring(result1.indexOf("-") + 1);
					//visitorPitcher[0] = trim(visitorPitcher[0])
				}

				var pattern2New = /\n/g;
				var result2New;
				var result3New = 0;

				
				if(i+2 == howManyInnings){

					var count = 2;


				}
				else
				{
					var count = 1;
				}
				
				
				//GM_log(i + " " + howManyInnings);

				while((result2New = pattern2New.exec(fullLine2)) != null){

					newLine = fullLine2.substring(result3New,result2New.index); //+ "     " + visitorPitcher[0];
					//newLine = trim(newLine);
					

					if(newLine == '' || newLine == '*'){


						if(newboxscore.indexOf('*** ' + patternString + '***') == -1){
							newboxscore += '<tr class="databox_header black"><td colspan="9" class="tcenter">*** ' + patternString + '***</td></tr>' + '\n';
						}

					}

					count++;



					

					var m3 = count/2;


						if(newLine.indexOf('UBSTITUTE') == -1){

							if(newLine != ''){

								if(newLine.indexOf('Injured') == -1){

									oldLine = fullLine2.substring(result3New,result2New.index);
									oldLine = trim(oldLine);
									newLine = oldLine + "     " + visitorPitcher[0];

							

									outs = newLine.substring(0,1);
									onBase = newLine.substring(2,5);
									scoringPosition = false;

									if(onBase == '1  '){

										onBase = first;
										scoringPosition = false;

									}

									if(onBase == ' 2 '){

										onBase = second;
										scoringPosition = true;

									}

									if(onBase == '  3'){

										onBase = third;
										scoringPosition = true;

									}

									if(onBase == '12 '){

										onBase = first_second;
										scoringPosition = true;

									}

									if(onBase == ' 23'){

										onBase = second_third;
										scoringPosition = true;

									}

									if(onBase == '1 3'){

										onBase = first_third;
										scoringPosition = true;

									}

									if(onBase == '123'){

										onBase = first_second_third;
										scoringPosition = true;

									}									

									
									playerName = newLine.substring(6,26);
									playerName = trim(playerName);
									

									var tempString;
									var tempArray = new Array; 

									if(playerSet == 'Back to the \'90s'){

										tempArray = BTT90sArray;

									}
									else if(playerSet == '2010 season' || playerSet == '2010 season Unleashed')
									{
			
										tempArray = the2010Array;

									}
									else if(playerSet == '2011 season' || playerSet == '2011 season Unleashed')
									{
			
										tempArray = the2011Array;

									}									

									for (var k=0;k < tempArray.length;k++){	
		
										if(tempArray[k].indexOf('|') == -1)
										{
											tempString = tempArray[k].substring(tempArray[k].indexOf('>')+1,tempArray[k].indexOf('</a>'));
											
										
										}
										else
										{
											tempString = tempArray[k].substring(0,tempArray[k].indexOf('&nbsp;<a'));
										
											//GM_log(tempString);
										}
										

										
									
										if(playerName.indexOf(tempString) != -1){

											playerName = playerName.replace(tempString,tempArray[k]);

										}
										
									}

									var handed = playerName.substring(playerName.indexOf('title="')+7,playerName.indexOf('title="')+8);

									
								
									diceRoll = newLine.substring(26,31);

									if (diceRoll == "h&amp"){

										diceRoll = "h&r";
										theEndResult = newLine.substring(34,62);


									}
									else
									{
										
										theEndResult = newLine.substring(31,62);

									}

									
									if(outs == 2 && scoringPosition == true){

										//Darkorange 
										theEndResult = '<td><font color="#B26200">' + theEndResult + '</font></td>';										

									}
									else
									{

										theEndResult = '<td>' + theEndResult + '</td>';

									}
									
																		
									//pitchesThrown = newLine.substring(27,31);
									advance = newLine.substring(62,78);
									
									newLine = newLine.replace(/&amp;/g,"&");									
									chance = newLine.substring(78,88);
									fatigue = newLine.substring(88,90);

								
									pitcher = newLine.substring(95,newLine.length);
									pitcher = trim(pitcher);

									var firstDice = diceRoll.substring(0,diceRoll.indexOf('-'));


									

									visitorRoll++;

									if(parseFloat(firstDice) > 3){

										visitorRollPitcher++;

									}

									if(playerSet == 'Back to the \'90s'){

										tempArray = BTT90sArray;

									}
									else if(playerSet == '2010 season')
									{
			
										tempArray = the2010Array;

									}
									else if(playerSet == '2011 season')
									{
			
										tempArray = the2011Array;

									}									


									for (var k=0;k < tempArray.length;k++){	
		
										if(tempArray[k].indexOf('|') == -1)
										{
											tempString = tempArray[k].substring(tempArray[k].indexOf('>')+1,tempArray[k].indexOf('</a>'));
										
										}
										else
										{
											tempString = tempArray[k].substring(0,tempArray[k].indexOf('&nbsp;<a'));
											//GM_log(tempString);
										}
										

										
				
										if(pitcher.indexOf(tempString) != -1){

											pitcher = pitcher.replace(tempString,tempArray[k]);

										}

									}

									var handedP = pitcher.substring(pitcher.indexOf('title="')+7,pitcher.indexOf('title="')+8);									

								

									
									if(fatigue != 'F9'){

										fatigue = '<td class="tcenter"><font color="red"><b>' + fatigue + '</b></font></td>';

									}
									else
									{
									
										fatigue = '<td class="tcenter">' + fatigue + '</td>';

									}

									if (chance.match("bpHR") != null){

										if(parseFloat(firstDice) > 3){

											if (theEndResult.match("Home Run") != null){
												
												visitorBPHR  = visitorBPHR  + trim(pitcher) + ", ";

											}
											else
											{
												visitorBPOUTS = visitorBPOUTS + trim(pitcher) + ", ";

											}

										}
										else if(parseFloat(firstDice) < 4) 
										{
										
											if(theEndResult.match("Home Run") != null){

												homeBPHR = homeBPHR + trim(playerName) + ", ";
												
											}
											else
											{

												homeBPOUTS = homeBPOUTS + trim(playerName) + ", ";
					

											}											
										}
									}									

									if(handed == 'R'){
										
										playerName = '<td style="background-color: #FFEEEE;">' + playerName + '</td>';
										


									}
									else if(handed == 'L')
									{
										playerName = '<td style="background-color: #DDEEFF;">' + playerName + '</td>';										

									}
									else if(handed == 'S')
									{

										if(handedP == "R"){

											playerName = '<td style="background-color: #DDEEFF;">' + playerName + '</td>';

										}
										else
										{
											
											playerName = '<td style="background-color: #FFEEEE;">' + playerName + '</td>';

										}
									}									
									else
									{
										playerName = '<td>' + playerName + '</td>';

									}

									

									if(handedP == 'R'){

										pitcher = '<td style="background-color: #FFEEEE;">' + pitcher;


									}
									else if(handedP == 'L')
									{
										pitcher = '<td style="background-color: #DDEEFF;">' + pitcher;

									}
									else
									{
										pitcher = '<td>' + pitcher;

									}									


									
									newLine =  outs + '</td><td class="tcenter">' + onBase + '</td>' + playerName + '<td>' + diceRoll + '</td>' + theEndResult + '<td nowrap>' + advance + '</td><td>' + chance + '</td>' + fatigue + pitcher;

									
									
									

									/*
									if(m3 == m3.toFixed()){	

										newLine = '<tr class="even"><td>' + newLine + '</td></tr>';
									}
									else
									{
									
										newLine = '<tr class="odd"><td>' + newLine + '</td></tr>';

									}
									*/

									newLine = '<tr class="even"><td class="tcenter">' + newLine + '</td></tr>';
									
									newboxscore += newLine + '\n';

								}
								else
								{

									newLine = trim(newLine);
									//newLine = '                               ' + newLine;
									
									/*
									if(m3 == m3.toFixed()){	

										//newLine = '<tr class="even"><td colspan="8">'+newLine+'</td></tr>';
										newLine = '<tr class="even"><td></td><td></td><td></td><td></td><td nowrap>' + newLine + '</td><td></td><td></td><td></td><td></td></tr>';										
									}
									else
									{
									
										//newLine = '<tr class="odd"><td colspan="8">'+newLine+'</td></tr>';
										newLine = '<tr class="odd"><td></td><td></td><td></td><td></td><td nowrap>' + newLine + '</td><td></td><td></td><td></td><td></td></tr>';

									}
									*/

									newLine = '<tr class="even"><td></td><td></td><td></td><td></td><td nowrap>' + newLine + '</td><td></td><td></td><td></td><td></td></tr>';
																		
									newboxscore += newLine + '\n';								
								}

							}
						}
						else
						{
							
							if(newLine.indexOf('SUBSTITUTE P ') != -1){

								if(newLine.indexOf("(") == -1){

									visitorPitcher[0] = newLine.substring(newLine.indexOf("-") + 1);

								}
								else
								{
									if(newLine.indexOf("role") != -1){
										
										visitorPitcher[0] = newLine.substring(newLine.indexOf("-") + 1,newLine.lastIndexOf("("));
									}
									else
									{
										visitorPitcher[0] = newLine.substring(newLine.indexOf("-") + 1);
									}
									
								}

								visitorPitcher[0] = trim(visitorPitcher[0]);

								//for multi last names like Todd Van Poppel:
								//http://fantasygames.sportingnews.com/stratomatic/league/boxscore.html?group_id=138671&g_id=205
								//Chan Ho Park:
								//http://fantasygames.sportingnews.com/stratomatic/league/boxscore.html?group_id=134229&g_id=581
								var visitorPitcher2 = visitorPitcher[0].split(" ");

								var tempName = '';

								for ( var j = 1; j < visitorPitcher2.length; j++) 
								{

									tempName += visitorPitcher2[j] + " ";
								

								}
								

									visitorPitcher2[0] = visitorPitcher2[0].substring(0,1);
									visitorPitcher2[0] = visitorPitcher2[0] + '.' + tempName;
									visitorPitcher[0] = visitorPitcher2[0];																

												
							}	

							newLine = trim(newLine);
							//newLine = '                               ' + newLine;
							
							

								/*
								if(m3 == m3.toFixed()){	

								
									newLine = '<tr class="even"><td></td><td></td><td></td><td></td><td nowrap>' + newLine + '</td><td></td><td></td><td></td><td></td></tr>';									
								}
								else
								{
								
									
									newLine = '<tr class="odd"><td></td><td></td><td></td><td></td><td nowrap>' + newLine + '</td><td></td><td></td><td></td><td></td></tr>';									

								}
								*/

								newLine = '<tr class="even"><td></td><td></td><td></td><td></td><td nowrap>' + newLine + '</td><td></td><td></td><td></td><td></td></tr>';
								
							
							newboxscore += newLine + '\n';
							


						}
					
					
					
					result3New = result2New.index;

				}				
					

			}//while((result = pattern.exec(boxscore)) != null){

		}//if (m2 == m2.toFixed())
		else
		{
			halfInning = "TOP";
			halfInning2 = "TOP";
			patternString = halfInning + " OF INNING " + i + " ";


			patternString4 = halfInning2 + " OF " + i + " ";
			
			var pattern = new RegExp(patternString, "g");
			
			while((result = pattern.exec(boxscore)) != null){
				var iNew = i;

				var fullLine = boxscore.substring(result.index-4,boxscore.indexOf("BOTTOM OF INNING " +  iNew , result.index) - 4);
				var fullLine2 = boxscore.substring(result.index+19,boxscore.indexOf("BOTTOM OF INNING " +  iNew , result.index) - 4);

				if (iNew >= 10){

					var fullLine2 = boxscore.substring(result.index+20,boxscore.indexOf("BOTTOM OF INNING " +  iNew , result.index) - 4);

				}				
				
				var topOfInning1 = boxscore.substring(result.index + 26,boxscore.indexOf("BOTTOM OF INNING " +  iNew , result.index) - 4);
				

				topOfInning1 = ltrim(topOfInning1);

				

				if (boxscore.indexOf("BOTTOM OF INNING " +  iNew , result.index) == -1){

					if (iNew >= 10){
						var topOfInning1 = boxscore.substring(result.index + 27,boxscoreLength - 4);
						topOfInning1 = ltrim(topOfInning1);
						var fullLine2 = boxscore.substring(result.index + 22,boxscoreLength);
						//newboxscore += '*** ' + patternString + '***' + '\n';		
						newboxscore += '<tr class="databox_header black"><td colspan="9" class="tcenter">*** ' + patternString + '***</td></tr>' + '\n';
						
				
					}
					else
					{
						var topOfInning1 = boxscore.substring(result.index + 26,boxscoreLength - 4);
						topOfInning1 = ltrim(topOfInning1);
						var fullLine2 = boxscore.substring(result.index + 20,boxscoreLength);

						//newboxscore += '*** ' + patternString + '***' + '\n';
						newboxscore += '<tr class="databox_header black"><td colspan="9" class="tcenter">*** ' + patternString + '***</td></tr>' + '\n';						
						
					}


				}
				

				topOfInning1 = topOfInning1.replace(/&amp;/g,"&");
				

				var pattern2 = /\n/;
				var result2;
				result2 = pattern2.exec(topOfInning1);
				var cr = result2.index;

				var atBat1 = topOfInning1.substring(0,20);


				if (trim(atBat1) == ""){

					atBat1 = "&nbsp;";					

				}				

				if (atBat1.search(/\UBSTITUTE/) != -1){

					var result1 = topOfInning1.substring(0,41);//changed from 31 to 41 for longer names likeJonathan Papelbon


					if (result1.indexOf('\n') != -1){
						result1 = result1.substring(0,result1.indexOf('\n'));
					}

					atBat1 = "&nbsp;";

				}
				else
				{
					var result1 = topOfInning1.substring(25,56);

				}

				result1 = result1.replace(/&amp;/,"&");

				
				
				if (result1.match("SUBSTITUTE P ")){

					//homePitcher[0] = result1.substring(result1.indexOf("-") + 1);
					//homePitcher[0] = trim(visitorPitcher[0])
				}

				var pattern2 = /\n/g;
				var result2;
				var result3 = 0;
				var count = 1;
				
				

				while((result2 = pattern2.exec(fullLine2)) != null){

					newLine = fullLine2.substring(result3,result2.index); //+ "     " + visitorPitcher[0];


					if(newLine == '' || newLine == '*'){

						if(newboxscore.indexOf('*** ' + patternString + '***') == -1){

							//newboxscore += '*** ' + patternString + '***' + '\n';
							newboxscore += '<tr class="databox_header black"><td colspan="9" class="tcenter">*** ' + patternString + '***</td></tr>' + '\n';

						}
						

					}					

					
					count++;

					var m3 = count/2;




						if(newLine.indexOf('UBSTITUTE') == -1){



							if(newLine != ''){

								if(newLine.indexOf('Injured') == -1){		

									oldLine = fullLine2.substring(result3,result2.index);
									oldLine = trim(oldLine);
									newLine = oldLine + "     " + homePitcher[0];

									outs = newLine.substring(0,1);
									onBase = newLine.substring(2,5);

									scoringPosition = false;

									if(onBase == '1  '){

										onBase = first;
										scoringPosition = false;

									}

									if(onBase == ' 2 '){

										onBase = second;
										scoringPosition = true;

									}

									if(onBase == '  3'){

										onBase = third;
										scoringPosition = true;

									}

									if(onBase == '12 '){

										onBase = first_second;
										scoringPosition = true;

									}

									if(onBase == ' 23'){

										onBase = second_third;
										scoringPosition = true;

									}

									if(onBase == '1 3'){

										onBase = first_third;
										scoringPosition = true;

									}

									if(onBase == '123'){

										onBase = first_second_third;
										scoringPosition = true;

									}

									playerName = newLine.substring(6,26);
									playerName = trim(playerName);

									var tempString;
									var tempArray = new Array;

									if(playerSet == 'Back to the \'90s'){

										tempArray = BTT90sArray;

									}
									else if(playerSet == '2010 season')
									{
			
										tempArray = the2010Array;

									}
									else if(playerSet == '2011 season')
									{
			
										tempArray = the2011Array;

									}									

									for (var k=0;k < tempArray.length;k++){	
		
										if(tempArray[k].indexOf('|') == -1)
										{
											tempString = tempArray[k].substring(tempArray[k].indexOf('>')+1,tempArray[k].indexOf('</a>'));
										}
										else
										{
											tempString = tempArray[k].substring(0,tempArray[k].indexOf('&nbsp;<a'));
											//GM_log(tempString);
										}
										

										
				
										if(playerName.indexOf(tempString) != -1){

											playerName = playerName.replace(tempString,tempArray[k]);

										}

									}

									var handed = playerName.substring(playerName.indexOf('title="')+7,playerName.indexOf('title="')+8);
								
									diceRoll = newLine.substring(26,31);

									if (diceRoll == "h&amp"){

										diceRoll = "h&r";
										theEndResult = newLine.substring(34,62);


									}
									else
									{
										
										theEndResult = newLine.substring(31,62);

									}

									if(outs == 2 && scoringPosition == true){

										//Darkorange
										theEndResult = '<td><font color="#B26200">' + theEndResult + '</font></td>';										

									}
									else
									{

										theEndResult = '<td>' + theEndResult + '</td>';

									}									

									//pitchesThrown = newLine.substring(27,31);
									advance = newLine.substring(62,78);

									newLine = newLine.replace(/&amp;/g,"&");
						
									chance = newLine.substring(78,88);

									
									fatigue = newLine.substring(88,90);
									pitcher = newLine.substring(95,newLine.length);

									pitcher = trim(pitcher);

									var firstDice = diceRoll.substring(0,diceRoll.indexOf('-'));


									

									homeRoll++;

									if(parseFloat(firstDice) > 3){

										homeRollPitcher++;

									}

									if(playerSet == 'Back to the \'90s'){

										tempArray = BTT90sArray;

									}
									else if(playerSet == '2010 season')
									{
			
										tempArray = the2010Array;

									}
									else if(playerSet == '2011 season')
									{
			
										tempArray = the2011Array;

									}									

									for (var k=0;k < tempArray.length;k++){	
		
										if(tempArray[k].indexOf('|') == -1)
										{
											tempString = tempArray[k].substring(tempArray[k].indexOf('>')+1,tempArray[k].indexOf('</a>'));
										
										}
										else
										{
											tempString = tempArray[k].substring(0,tempArray[k].indexOf('&nbsp;<a'));
											//GM_log(tempString);
										}
										

										
				
										if(pitcher.indexOf(tempString) != -1){

											pitcher = pitcher.replace(tempString,tempArray[k]);

										}

									}

									var handedP = pitcher.substring(pitcher.indexOf('title="')+7,pitcher.indexOf('title="')+8);									

									
									if(fatigue != 'F9'){

										fatigue = '<td class="tcenter"><font color="red"><b>' + fatigue + '</b></font></td>';
									

									}
									else
									{
									
										fatigue = '<td class="tcenter">' + fatigue + '</td>';

									}

									if (chance.match("bpHR") != null){

										if(parseFloat(firstDice) > 3){

											if (theEndResult.match("Home Run") != null){
												
												homeBPHR  = homeBPHR  + trim(pitcher) + ", ";

											}
											else
											{
												homeBPOUTS = homeBPOUTS + trim(pitcher) + ", ";													

											}

										}
										else if(parseFloat(firstDice) < 4) 
										{
										
											if(theEndResult.match("Home Run") != null){

												visitorBPHR = visitorBPHR + trim(playerName) + ", ";
												
											}
											else
											{

												visitorBPOUTS = visitorBPOUTS + trim(playerName) + ", ";
												

											}											
										}
									}									


									if(handed == 'R'){

										playerName = '<td style="background-color: #FFEEEE;">' + playerName + '</td>';


									}
									else if(handed == 'L')
									{
										playerName = '<td style="background-color: #DDEEFF;">' + playerName + '</td>';

									}
									else if(handed == 'S')
									{
										
										if(handedP == "R"){

											playerName = '<td style="background-color: #DDEEFF;">' + playerName + '</td>';

										}
										else
										{
											
											playerName = '<td style="background-color: #FFEEEE;">' + playerName + '</td>';

										}

									}
									else
									{
										playerName = '<td>' + playerName + '</td>';

									}

									if(handedP == 'R'){

										pitcher = '<td style="background-color: #FFEEEE;">' + pitcher;


									}
									else if(handedP == 'L')
									{
										pitcher = '<td style="background-color: #DDEEFF;">' + pitcher;

									}
									else
									{
										pitcher = '<td>' + pitcher;

									}									


									
									newLine = outs + '</td><td class="tcenter">' + onBase + '</td>' + playerName + '<td>' + diceRoll + '</td>' + theEndResult + '<td nowrap>' + advance + '</td><td>' + chance + '</td>' + fatigue + pitcher;									

									/*
									if(m3 == m3.toFixed()){

				
										newLine = '<tr class="even"><td>' + newLine + '</td></tr>';
										
									
									}
									else
									{
																			
										newLine = '<tr class="odd"><td>' + newLine + '</td></tr>';
										
										

									}
									*/


									newLine = '<tr class="odd"><td class="tcenter">' + newLine + '</td></tr>';

									newboxscore += newLine + '\n';
									

								}
								else
								{
									newLine = trim(newLine);
									//newLine = '                               ' + newLine;			

									/*
									if(m3 == m3.toFixed()){
										//newLine = '<tr class="even"><td colspan="8">'+newLine+'</td></tr>';
										newLine = '<tr class="even"><td></td><td></td><td></td><td></td><td nowrap>' + newLine + '</td><td></td><td></td><td></td><td></td></tr>';
									}
									else
									{
										//newLine = '<tr class="odd"><td colspan="8">'+newLine+'</td></tr>';
										newLine = '<tr class="odd"><td></td><td></td><td></td><td></td><td nowrap>' + newLine + '</td><td></td><td></td><td></td><td></td></tr>';
									}
									*/

									newLine = '<tr class="odd"><td></td><td></td><td></td><td></td><td nowrap>' + newLine + '</td><td></td><td></td><td></td><td></td></tr>';

									newboxscore += newLine + '\n';	


								}						
						
							}
					
						}
						else
						{
							if(newLine.indexOf('SUBSTITUTE P ') != -1){

								if(newLine.indexOf("(") == -1){

									homePitcher[0] = newLine.substring(newLine.indexOf("-") + 1);

								}
								else
								{
									if(newLine.indexOf("role") != -1){
										
										homePitcher[0] = newLine.substring(newLine.indexOf("-") + 1,newLine.lastIndexOf("("));
									}
									else
									{

										homePitcher[0] = newLine.substring(newLine.indexOf("-") + 1);
									}
									
								}


								homePitcher[0] = trim(homePitcher[0]);
								var homePitcher2 = homePitcher[0].split(" ");

								var tempName = '';

								for ( var j = 1; j < homePitcher2.length; j++) 
								{

									tempName += homePitcher2[j] + " ";
								

								}
								

									homePitcher2[0] = homePitcher2[0].substring(0,1);
									homePitcher2[0] = homePitcher2[0] + '.' + tempName;
									homePitcher[0] = homePitcher2[0];
									
																		
							}		
							newLine = trim(newLine);
							//newLine = '                               ' + newLine;	
							/*						
							if(m3 == m3.toFixed()){	

								//newLine = '<tr class="even"><td colspan="8">'+newLine+'</td></tr>';
								newLine = '<tr class="even"><td></td><td></td><td></td><td></td><td nowrap>' + newLine + '</td><td></td><td></td><td></td><td></td></tr>';
							}
							else
							{
								//newLine = '<tr class="odd"><td colspan="8">'+newLine+'</td></tr>';
								newLine = '<tr class="odd"><td></td><td></td><td></td><td></td><td nowrap>' + newLine + '</td><td></td><td></td><td></td><td></td></tr>';

							}
							*/
							newLine = '<tr class="odd"><td></td><td></td><td></td><td></td><td nowrap>' + newLine + '</td><td></td><td></td><td></td><td></td></tr>';

							newboxscore += newLine + '\n';
						}
				
					
					result3 = result2.index;

				}				
					

			}//while((result = pattern.exec(boxscore)) != null){

		}
	}//for (var m = 1; m < 3; m++){
}//for ( var i = inning; i < howManyInnings; i++) 

//newboxscore is Play Account Section


var visitorRollPitcherPCT = visitorRollPitcher/visitorRoll;
visitorRollPitcherPCT = Math.round(visitorRollPitcherPCT*100) + '%';

var homeRollPitcherPCT = homeRollPitcher/homeRoll;
homeRollPitcherPCT = Math.round(homeRollPitcherPCT*100) + '%';
	
visitorBPHR = visitorBPHR.substring(0,visitorBPHR.length-2);
visitorBPOUTS = visitorBPOUTS.substring(0,visitorBPOUTS.length-2);

if(visitorBPHR == '')
{
	//visitorBPHR = 0;
}
else
{

	visitorBPHR = visitor + ': ' + '(' + visitorBPHR + ') ';

}

if(visitorBPOUTS == '')
{
	//visitorBPOUTS = 0;
}
else
{

	visitorBPOUTS = visitor + ': ' + '(' + visitorBPOUTS + ') ';

}

homeBPHR = homeBPHR.substring(0,homeBPHR.length-2);
homeBPOUTS = homeBPOUTS.substring(0,homeBPOUTS.length-2);

if(homeBPHR == '')
{
	//homeBPHR = 0;
}
else
{

	homeBPHR = home + ': ' + '(' + homeBPHR + ')';

}

if(homeBPOUTS == '')
{
	//homeBPOUTS = 0;
}
else
{

	homeBPOUTS = home + ': ' + '(' + homeBPOUTS + ')';

}

var newPlayAccountInnerHTML = newboxscore;


newboxscore = boxscoreNoPlayAccount;//  + newboxscore;

var newboxscorepre = document.createElement("pre");
newboxscorepre.setAttribute('name','newboxscorepre');
newboxscorepre.innerHTML = newboxscore;

var newPlayAccount = document.createElement("table");
newPlayAccount.setAttribute('class', 'datatab_nowidth cleft'); 
newPlayAccount.setAttribute('width', '95%'); 
newPlayAccount.setAttribute('cellspacing', '1'); 
newPlayAccount.setAttribute('cellpadding', '1'); 
newPlayAccount.setAttribute('border', '0'); 
newPlayAccount.setAttribute('align', 'center'); 

newPlayAccount.setAttribute('name','newboxscorepre');
newPlayAccount.innerHTML = newPlayAccountInnerHTML;

var fillerTable = document.createElement("table");
fillerTable.setAttribute('width', '95%'); 
fillerTable.setAttribute('align', 'center');

fillerTable.innerHTML = '<tbody><tr><td>&nbsp;</td></tr></tbody>';

var newPlayAccountRolls = document.createElement("table");
newPlayAccountRolls.setAttribute('class', 'datatab_nowidth cleft'); 
newPlayAccountRolls.setAttribute('width', '95%'); 
newPlayAccountRolls.setAttribute('cellspacing', '1'); 
newPlayAccountRolls.setAttribute('cellpadding', '1'); 
newPlayAccountRolls.setAttribute('border', '0'); 
newPlayAccountRolls.setAttribute('align', 'center'); 

newPlayAccountRolls.innerHTML = '<tbody><tr class="tcenter"><td colspan="2"><b>Dice Results</b></td></tr></tbody><tr class="odd"><td width="15%"><b>BPHR</b></td><td>'+ visitorBPHR + homeBPHR + '</td></tr><tr class="even"><td><b>BPOUTS</b></td><td>' + visitorBPOUTS + homeBPOUTS +'</td></tr><tr class="odd"><td><b>Pitcher Rolls</b></td><td>' + visitor + ': ' + visitorRollPitcherPCT + '&nbsp;' + home + ': ' + homeRollPitcherPCT + '</td></tr></tbody>';

var myPlayAccount = GM_getValue('ePlayAccount','true');



	if(myPlayAccount == 'true'){

		thisElement.parentNode.replaceChild(newboxscorepre, thisElement);
		
	}





	var myHelp = document.createElement("table");
	myHelp.id = 'help';
	myHelp.width = '95%';
	myHelp.border = '0';	
	myHelp.setAttribute('cellpadding','0');	
	myHelp.setAttribute('cellspacing','1');	
	myHelp.setAttribute('align','center');	



	if(myPlayAccount == 'true'){	

		myHelp.innerHTML= '<tr><td class="text10" align="right"><a href=' + thisURL + '>Disable Play Account Enhancer</a></td></tr><tr><td class="text10" align="right"></td></tr>';

	}
	else
	{
		myHelp.innerHTML= '<tr><td class="text10" align="right"><a href=' + thisURL + '>Enable Play Account Enhancer</a></td></tr><tr><td class="text10" align="right"></td></tr>';


	}

var tableLocation = document.evaluate("//table[@class='cleft'][1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

tableLocation = tableLocation.snapshotItem(0);


var explanation = document.evaluate("//table[@class='cleft'][2]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
explanation = explanation.snapshotItem(0);

var newExplanation = document.createElement("table");
	newExplanation.setAttribute('class', 'cleft')
	newExplanation.id = 'explanation';
	newExplanation.width = '95%';
	newExplanation.border = '0';	
	newExplanation.setAttribute('align','center');

newExplanation.innerHTML = '<tr><td class="text11">When Pitch Count Fatigue level gets below F9 the color changes to <font color="red"><b>red</b></font>.<br>When results are in "<font color="#B26200">dark orange</font>" it\'s a clutch situation.</td></tr>';



	tableLocation.parentNode.insertBefore(myHelp,tableLocation.nextSibling);

if(myPlayAccount == 'true'){

	if(playerSet != 'Back to the \'90s'){

		tableLocation.parentNode.insertBefore(newPlayAccountRolls,tableLocation.nextSibling);
		tableLocation.parentNode.insertBefore(fillerTable,tableLocation.nextSibling);

	}

	
	tableLocation.parentNode.insertBefore(newPlayAccount,tableLocation.nextSibling);
	explanation.parentNode.insertBefore(newExplanation,explanation.nextSibling);

}

document.addEventListener('click', function(event) {

	if(event.target.text == 'Disable Play Account Enhancer'){

		GM_setValue('ePlayAccount','false');
	}
	if(event.target.text == 'Enable Play Account Enhancer'){

		GM_setValue('ePlayAccount','true');
	}	

}, true);	


function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}

