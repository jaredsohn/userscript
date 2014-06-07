// ==UserScript==
// @name           360-PS3 Button Translation
// @namespace      http://maddenonline.blogspot.com/
// @include        *
// ==/UserScript==

var square1 = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%07tIME%07%DB%0A%0B%03%17%02%C0W%82%0F%00%00%00%09pHYs%00%00%0A%F0%00%00%0A%F0%01B%AC4%98%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%03MIDATx%DAUSMlTU%14%FE%EE%CF%FB%99ig%E8%0C%1D%A0%23%02%B5%05%8D%C1%B1%B4%FE%D4%C6%40P%C2O%8C%AE0%C6%10S%7F%12%17%12%17%C4%0D%89q%E3%82%0D%AE%0D%0B%8Cn%D4%18%12%93%A6qQ%ABH%17M%88%D8%89A%1C%A2)L%CA%80%C5%92%81%A9%9D%BE%CE%7B%F7%DD%7B%3D%EF%D5.%7C%C9%7D%E7%E6%DEs%EE%F9%CE%F7%9D%C3%F0%BF%CF%83W%18%82%B6%12%B6%B3%C8%A4%93%E1%AE%10%2Cd%0A*X%86%8DZ%0660%EB%BE%92%96%81%D8%08-%0F%1E%C0%7B%E7j%E8%AF%3C%0D%AB%EF%F1%FE%CA%F3(%EF%A9%98R%FFcfa%EE%82%E1%86Q%20%B3R%E4%B9%B1%9A1%E6X%B0%FF%C2%8F%BE%F11%AC%B5%E9%3Au%E6s%9E%20)%E1QwS%EE%C9%83%BD%85%A17%BB%8A%7B%C7%1Do%FB%B8%87%EC0%F8%04%20%1Eb%12%92'(X%F2%C0%A5%EB%F3%F0%3D%0Fg%CE%9E%13W~%AD%EA%C2%B6%DE%D1%5B%D7%1A%9F%B6%EF%AB%7D%3CV%D6%E86%83%8E%80%F8%81%A55%09kNR%D8mB%C4Yi%F7%18%9Ex%EE%1D%1Cx%B6%C8%F3%7D%05%D3%FC%BBy%F8%F2%C5%3F%26%F4%EF%0D%3Fk%84%E9D%8E%B1q%07%D0%0A%9A)~g%B9%C1%E7%DB%D5%3AC%EBE%02%5CO%11%5C%98%9Ea%C7%0F%ED%B7%B4-%BD%7B%F6%FC%2F%C5i%B3%E3%F4%D8%F1%F8%A7%ABU%E9%11H%1BF0%DA%22k%A5%DD%C5%2Bj%EC%FBW%DC%25%5C%99B%06G%13*%D1h%F9%E2%EB%99z%BC%F2O%FB%AD%1F'gw%BC%9E%7DJ%7Dq%F9%3B%E7%D4%D4iH%2FG%E8%89%7C%16!c%0C%9B%1C%FD%D2%ED%F6sf)%CA%1E%91%ABk%07%E5%DE%17%5E%C3%B5%FA3zj%B6%85%5E%FF%E2%B1%9B%7F.%C0%AD%0Cs%C5%08%9CK%B4e%3CD%8E%86%E1%1CR9X3%96%C4S%A4%9F%C7M%1C%1D%E2%B9%D2%23l%CB%EE%19%FB%F2%DB-%E7%E6%8D%85m%88V%60%02%CDLD%15%C5%C4%9DU%14%10!%D6D%03%FDB%13%22%B6tA%A2%92%C7vY%FF%AD%86%F0%9B%9FQ%FD(%A3%06%EF%F6-C)p%BA4%92%AEI(%22%9A%E0%0B%ACw%8F%00%D31%89%60%D2%26%22v%1E%F0%BB%B5%09%DB%1C%1D%10%3B%2F%3D%8C%B8%13%CC%26%EF2N%CA%C5%01!%08%10%AER%C6%80%F6%AB%01%09%B1LA*M%0D%D3I%1E%98MI%D4kK%D6%F5%0B%D8%DC%D3%F3Y%A3%D0%7D%B2%19%ACx%1F%8E%9C0%FB%82%01.%B8K*(%841%E5%EFX%94%C5%96%B8%1D%2FQ%AF%87%B5%AD(M2%3F%BF%07%5B%1F%1F%A1%2Cm%A1%7C%ABE%CC%3F%C0%9D%E6'%BBT%D1p%A9%8D%D2%9A%F47%E0%94%D5'%BB%D8n%CA%F9N%8D%BA*z%89r%FF%90V%B6%7F%FC%7Cj%B3%BDC%3C%1D%93%9E%9D%EFCl%0E%20%8B%16%5E%D1%A4Vl%A2%A2%DD%04%FCm%06vx%7D%08%A8%13%13%93%2B%0Fc%E5%AFjz%D47%F2%AAX%9C%FBVw9%DD%03%A15'%A8%DB%06%90(g%23B%11%CFu%89%ECW%91%5E%BD%DFI%98%22%26%D8%C64f%8B%83%D0z%8D%06%CA%C0%EF.%8B%7C%BE%A2%B5%0E%11%85%F7%D0%BC5M%FC%BB%1B%AE%CCRQ%1E%7C%E3%C2%C1%BF%86%A7%90%26%83%8C3%C3%00%00%00%00IEND%AEB%60%82";

square = '<img src="' + square1 + '" title="X" alt="X " id="X_SQ" style="cursor: pointer;">';



var cross1 = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%07tIME%07%DB%0A%0B%03%146%CA%CE%25y%00%00%00%09pHYs%00%00%0A%F0%00%00%0A%F0%01B%AC4%98%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%03%3FIDATx%DAUS%5Dh%1CU%14%FE%CE%B9%B3%B3%99%FD%99%CD%EE%BA%F9mb%24k%D2%08Z%12%8D%98%F8%DBb%91%0A%22*%94%16%8A%3E%88HA%EDK)%14%7C%10%ECC%05Q%F4I%14A%8A%3EI%1E%84b%C57%15%FFZ%CC%83T%93%26%0F%91%18%AB%D6%A41%D9l%B2%BB3%F7%1E%CFl(%C5af%EE%E5%BB%F7%DC%7B%CEw%BE%8F%F0%BF%C7%87%9F%1F%00%D8G%BC%7D%8D%98%89%05D%E2b%88k8%B1M%07%E8Ki%40%22%24s%BA%11%9A%CD%0F%A1%5E%FB%AD%3D%EF%EA%7D%CC%E4n%19w%CE%B5%04%22X%5E%F8%04%C9%A8g%91%B3u6%FE%88eo%10Q%FD%FCn%F0%DE%A9%87%10%E6r%08%3C%0FG%CF%BE%CB%09f%08i%93%0E%A7M%BAt%84%BD%F00%B1%19W%98w%23%3C%BEq%B1%A7%C7%A24p%07%E6%BF%FF%1A%C3%93%CF%F3%C2%85%94%ABtM%3D%BD%1D%DB3Q%B49F%D4%12'%8E%C4fE%A2%D6%8F.%AE%9D%24%F2%BF%D5%D4%8C%B8%96%E5%FE%89%FDx%E5%ECq%0C%8E%BF%C4%1D%F9%11%D79%BCz%0A%1D%85%99%C6%E6%D5%BD%60%11%EB%C8A%60%89%038%EB%EE%83I%7F%25h%1C%06E%8A%196%B5%3F%9704%3An%9E%7Cn%DAu%F5D%8F%AE%2C%5C%3E%B7%7C%BD%D7%F5%EC%3B*k%BF%CE%B0%EFe%99%60%B9%B5%F37%95%C7%5E%8F%23%9B%F2l%7D%EE%A0%12%3E%03%D9Y%83%1F%16%B1(B%17%95%A4%23%A7%DF%BCP%EC%BDG8s%7B4%F9%E2O%B2%E7%91%F7%94%B9P%BF%82%F4%3D%F0%BE%DCv%F0%1B!%7F%B0%C5%A9%92b%E9%B7%81%0C%CC%9D%8F%9F%A2%D9%BF%3Aev%DE%85%B3%E7%3F%7D%E3%EA%E2%7C%86%A8A%7F%5C%FA%98%FA'N%C0%C6%5D(%8C%3E%8C%20%3F%86%A5%2F%9F%02%25%9D%23C%84F%07%A4%F1%81%E7%B6%9B0%1B%B1%96%B4C%FF%2C%2F)%A9M%AD5%0B%C3%5B%98%9By%02%F7%BFz%05%B5%95k%F8%F9%A3%7D%F0%82%02%AC%15%25T%92%3EU%F4%17P%D8%7D%2F%05%F9%A2%10y%85%8D%B5%95%A5%E6%D6%BFE%24%BCGu%1A9%F0%16v%1A%EB%D8%96%3E%B8%EB%97%B1~%E5%0C8%5Dq.%B2%0C%A9%CFk%06w%F1%D6%FA%22%AA%CF~%01opr%C3%BA%CD%B9%A4%B7%CEZ7v%E8%1D%24%17%FD%FE%DDI%AC_%3C%8EL%CF~%84%D5%97%E1%9A5G%ACjD%7C%09%1CDm1%A42%DD%C6%CFv%C3%CF%F6%1F%03%87%D29z%22%1Az%F0%9C%EEJ%2Bi%7D%C2%5C%10%F6%CBR%9A%F8%CCrv%CA%EEj%D8%9Fn%07%17%86%0E%24%F5%20%1C%98%A6p%CF0LG%E9CJ%0F%AA%05%0A1%7B%95XK%8D%90%AADd%C2%98L%A7%25%AF%98%10p%BAm%02%F6U%91%94B%AE%7Cw%C2%07%0A%E5%B2%C2%3D%AA%8E%E056%A5%3A%8C%B6%8B%8B%0E%5CpD%A1%F2%14%AC%EA%86%17%BC%B6%A6%A9-%E7%B6%99%F4dE%8C%1A%C6i%8BXY%AE%3B%B8%E8V%5D8%04%A1%AA.h%DA%F6%17%90%FD%5C%B7%AFj%C6F!%7B%D3%C5%9A%05qN%C7%20%F9%88%FD%8A%A9%3C%F3%03%82%EA1%98%7C%15%AC%F65%BAf(%A3%86%F4%CC%CD%40%C6%7FT%09I%81%17%91X%00%00%00%00%00IEND%AEB%60%82";

cross = '<img src="' + cross1 + '" title="A" alt="A " id="A_X" style="cursor: pointer;">';

var triangle1 = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%0F%08%06%00%00%00%EDsO%2F%00%00%00%07tIME%07%DB%0A%0B%03%17%20%157%C3%EB%00%00%00%09pHYs%00%00%0A%F0%00%00%0A%F0%01B%AC4%98%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%03%2CIDATx%DAESk%88TU%1C%FF%9D%C7%3Ds%E7%ED%AEw%96Q%97%D5d%F3%91%C6%8A%86%3D%2C%13%89t%B7%96%20z*A%84%0A%EA%07%FD%10%84Xm%D4%97%08%3FFY_%A2%0F%DB%83%3E%08A%7D%B0(%22%844%C8%A6%1AH%B4U%97i%D7%C6%C6%D9%99u%EE%9D%7B%E7%9E%F3%EF%EC%5D%96%0E%9C%07%E7%9C%FF%FF%FC%7F%8F%23%60%1B%E3%0E%CAO%9E%84%3B%B8%01%D4%F5%B9w%F7%F3%8C2%86T%7F%09%A9%B8%1FJyp%D3e%16%EBP%90%09%09I%90%B4%83%5D%0A%A1%F0i%95%F0%C9%AF%11%B6%EEz%9A%1F%9Dx%97%15%CB%7B%C0%98Z%2FE%EE)!R%CFA%A4%1E%B4%B7SI%9CS%E4%0BS%92%04%02l%F7%FEc%E0%D2%C1%9F%D5%0A%AF5%A6%8D%08%FC%E1%B4(%BFat8%1E%C1)%18.%E1%B4j%3A%A6%DEE%E37%DF)%60%E4%8B%8E%BC%C6%E2%F8%DF%A4%92%24%D3%F0%F6gyJeM%B7%3D%BB%23%CE%E6%CE4n%06%A5%CE%95%ABT%3Au%DC%E4G%1F%C0%F4%C8c%DC%C9*%C4%BD6%8B%A2%D6%DB(%0E%9FpD%86%F5%EA%17Hlz%F8%09%D6%97iS%ECO%7B%1Bw%8E%7F%7D%AD%3A5%18%FC%7D%A5%E7n%5B%C7%FB%5E%1C%E7%ED%7FnpU%1E%40%E7%FB%1F%8C%C8z%84%D8%EC%A4%CE%F5)%E3%CFT%C0%5D%81%C9s%15%F1%D3%9C%8F%93%A7%3F~m%EC%A5W%89%A5%B7Dnj%03%AD%FD%E6%3B*%1D%7C%99Xj%25%0DV~%24g%F8%3ER%A9%95%B1%93%5DML%16~Y%AA%9E%EF%DF1%A2%EF-%A6q%A3%85%B1j%E5%3AD%D0%16%B9%7D%7B%20%95Bc%F2%0C%9C%08h%BD%F7%19%96%BDu%1Cq%E8sHf%09%96w%D8%D8B%92%20!%821%B7z%F1%AA%E7%D7%EB%A0%9CB%F9%E8%0B%98%9D8%05%EEw%C02%19%84%1F%7C%84%08!%C4%D8%A30%AD%A6%25_-J%B9%94%C0%B6%F0%E6%E5%EA%9C%3F%DF%847q%0C%C1l%1D%DDK58%DBF%80%B5%AB%805w%C2%9F%FC%12%EA%95%03%40%DE%03%E9.%5B%12R%0E%3DtP(7%AD%DB%B5%DF%CFRi%E0%1E%B9nH%B7%FA%1C%9E%FE%F0%04%A4%957%EAj%CB~%8C%B83%07%04%F3%86%DF5%24%F4%F9%BFjx%FD%91%DBx%F3%5B0U%5C%CF%B5%7F%CB%E8%5E%B0%AA%B4q%EF%CF%CD%99%A9%15%A4%1B%B1%85%25%604%23m%40d%3B%E7%06Qh%08%91%84%F6%8FX%E0%EF%5B%0B%8B%A4%90%FC%9A%DD%5C%A4%97%99%A8%3D%3DJ%A1%FE%5Cwn%E5%ED%01Y%A0d%0C%D9%998%B1%1EL%2F%60%D0%9D%D3%10%CF%1C%C6%F2%C7%C1%EA%FB%00w%C5Vd%06%EF%87%CC%AD%E6Lx%60%22%BF%85%3B%DEWLy!s%AC%EE%B2%DF0Q%20k%EDK%F6%D5C%D8d9G%96Y%17'J2%C8%E5%40%DCH%08q%076%F3n%FD%0F%B3%A81%DBn9%DEe%8B%C8%00%E67%BBw%D6%F6y%2B%01_%FCE%F8%DF%CA%E0%19%14%BDQK%D8%0C%C2%E02%97%AA%0C%1D5-%5E%7B%C7X%23%10%C7%02%25Z7%EC%BB%91%B1Q%0B%DF0%01%F9%1F%D8%A8RLD%EA%EBP%00%00%00%00IEND%AEB%60%82";

triangle = '<img src="' + triangle1 + '" title="Y" alt="Y " id="Y_TRI" style="cursor: pointer;">';

var circle1 = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%07tIME%07%DB%0A%0B%03%16%0DI%F3%AE%DF%00%00%00%09pHYs%00%00%0A%F0%00%00%0A%F0%01B%AC4%98%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%03%25IDATx%DAeSKh%9DE%14%FE%E6%CC%FC%8F%7Bonn%EE%23%976MkB%22%A4%22Q%A4%8A%8A%A1%A8%E8%CEM%0D%D8%EAR%BAq%D7U%BB%95%AE%5D%BA%12%DC%A8%0D%DA%95%A0%20R%04%09%22%F8%C0%2C%AAm%1A%D2%DA%A8y%F5%A6%F7%91%FB%FA%E7%9F%99%E3%DC%BFj%17%0E%FC3%C3%CF%F9%CE9s%BE%EF%03%FE%B7%E4%7F7!c%22URBV%94%A0%82%14%08%C4%E8%FF%91c%EF%FB%9D%1E%C4%3C%04%12%A2%F1i%7F%3AX%DD%A3%7C%F9Q%0C%DB%B7%1D%B3%85%E5%1A8%98%02%D4%04%D0Y%95%B0%F7%9D%0Fd%88%E0%DF%04%02%D3%B3KPA%8CNs%8B*%B5Gx%B8%FF%1D%F7%5B%DD9-%8B%8B%86%C38%B0%83F%E4%FA%3Fi%A09%101%198%CE%92%8CV%ADv%04%0B%0B%8F%A3%5C%AEg%7DE%24N%E4%C6g%3E%15%85%F9!%E29F8%E3%10%D5Y%A8%EA%BE%A2%E2%25%1F%A2r%C5e%E1%AB%8B%AC%03!%F2(U%8FR%2C%D9%25%83%C3%93T%5D%F8%FA%E0~k%FA5D%7C6%9F%E7%80%E1%FE%18j%F9A%B2%C77M%8F%22%D7%BD%9A%D8%FE9%0F%B5%D9%C4%C6KE%D1nns%B7%D7T%CF%BFz%EE%F3%BF%EE%99%C7.%93%D4%E7%CBU%F9ek%8F~%EC%B5I%12%89w%C3*%EF!I%7Fe%BB%1824%CBx5%EB%E0%F5w.%C8%99%85Y%DB%D8%BC%B3%DC%D0%D1%D5%A3%1F%7Dc%DE%3E%3E%ABN%AF%AFB%17B%90!8%93b%96R%AC%84%C7%DC%5Bz%8F6%5Dg%BB%9Cv%16%B37%3F%F5%F4%928%F9%C4%12%90%AB%BFx%F7%B7%5Bx%A3P%C2%E5%DD%0D%E88B%01%0A%8A%2Cr%81%C4%1D%26%7C%92%1C%D0y%CEy%16%C4%94%11%D1)5J%F0%ED%CA%0D%C8h%07%7F%B6v%F2%AD%AD%86g%23%C0F'%F1%2C%09%A4%BE23%C3X%9Bi%E4%06%0D%F1%24%88%91Jh)%ABY%82%B5%DF%D7%E1%A2%12l%E7%AE%E9%B5%DB%FE%5E%C1q%A9%B0%E1A%A3%00%ED%D9%F2%0D%20%D5%16'%5C%0CG%A3%E1%5B%04%96%BB%D9%13%CC%E1u%A6%EE%1A%22%BD%F5%83%0E%09Wz%07%B8X%AC%7B%C4%10%7D%C1%18%D5%1E8%07%25S%BC)%CB%FC%99%D3%1Eg%3B%8A%93%B5%8C%05k5z%F7n%22%E9%EE%DE%1E%2B%CF-%7F%DF%DB%AF%3Dg%8C%B9%90%9F%A2%86%EEA%A5%0E%A7%7C%DC%7B4%C9%D7l%3B%FDX4%A5r%EE%C3%3E%8D%5Dy%A0%03%8A%90%AB%CD%93%8C%03g%07%87%AF8%AD%BE%18v%BA%E1%99%7Ch%CF%88%22%D7%86%09%F6%94g%C0%F4%C5W%E8Kr%E6g%B8%FE%CB~%92%EDL%89QXA%1CU%11%AAI%19%C9%3AB*%BF%20%83%C9%EB%A0%8A%D7%FB%B8%83%9C%60%90%FF%D4%98S%88V%7C%FF5%95%B9%87%FEQ%A2%2Cbb%FE%19%B0M%D1%DF%B9E%AE%B7%3B%12z%1C%89%E0%A5T%04%CFZ%E7%8AR%B8%ED%98%CD5-%8A%BF%24%3E-a%E0mG%FC%D0%8D%E4%E5%1C%9D%86%E1%0E%12%B3I4%AA%98%19F%40%EBu%BF%87%99wHH%B2lF.%CC%DC%F47%1ANe%B2%FC%1EM%01%00%00%00%00IEND%AEB%60%82";

circle = '<img src="' + circle1 + '" title="B" alt="B " id="B_CIR" style="cursor: pointer;">';

var l21 = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%07tIME%07%DB%0A%0B%03%18%04%AE%AC%3B%F5%00%00%00%09pHYs%00%00%0A%F0%00%00%0A%F0%01B%AC4%98%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%02AIDATx%DA%A5S%BFk%1B1%18%7D'%DD%5D%9D%F4%CE%C4%3F%12%1A%87%DA.%5ELS%13%0C%1E%8B%3BdM%094CJ%C9Z2%95%403un%B6dJ%0D)%A4%18%82%3B%19%0F%A1%9BW%EFI%C0%93%ED%E6%0F%C8%E0%C1%8E%83%EB%F3YR%25%05%9F%3B%BB%3A%84%8EO%FA%DE%F7%BE%F7%24%C3%B2l%93%10%03%10%98o%18%861gf%90o%7C%91%93%0B!f%60%8A%CD%F4W%C6M%D3%04%A5%14%9Cs%10%83%80%0B%8E%89%EF%3F%A6%A7S%2F%98%CC%23%CB%F1e%8C%FD1%FA%BD%3E%A8I%83%96%14%A87%F60%FA3%0A%0AX%96%85%85%85%05%05.H%D8q%B8%EB%B8%EC%F2%D7%25%2B%95JLVb%CES%87-..2%C7q%18%25%94e%B3YvQ%B9%60W%D7W%FA%DC%E6%E6%26%938z%9F%F8%FE%C4%B4m%9B.--%D1H4B%09!t2%99P%09N%3D%CF%A3%8E%EB%D0%F3%1F%E7%B4P(%D0r%B9LW%9F%AD%D2%B3%EFg4%9DN%D3%E1p(%9B3%1E%FBd%8C%81MX%40%5BS%F7%3C%E4r9%24%93I%EC%7D%D8C%B5ZE%A7%D3A%E5g%05%F9%7C%1E%EDV%1Bf%A0%A6B%FA%C7%10%25%98%EAS%25%EC%BC%DB%C1%ED%EF%5B%AC%AC%AC%60kkK%EF%B7%DBm%D8O%EC%19%80%90%9F%02%99V%9F2Q%CCn%AEo%B4p%C7'%C7%D8%7D%BF%8B%A3%AFGh6%9Bp%5Dw%06%A0%ABJ%7B%7Ci%8F%D4A%B7%A5%ACS%00%E1p%18%A7%DFNQ%7CS%C4%C1%A7%03%D4j5%C4b1%CD%D2%9CVR%87%95%DF%91HDS%D3%1A%8C%3C%8C%C7c%9C%96dr%B1%88%FD%8F%FBh4%1A%C8d2%B8%BF%BF%87%14%1Bx%99%5D%17%B9%F5%9Ch%B5Z%CAV%D1%EF%F7%F5%94%E8%A2%5E%AF%8B%ED%B7%DB%3A.%81D%B7%DB%15%0F%83%07%BDw%F8%F9P%A4%9E%A7%84%B1%F1j%833%CE%10%8F%C7%11%8DF%B5%16jH%FF1%18%0Cpww%87D%22%81P(%04B%E5-d%5C%B3U%F1%5E%AF%07c-%B1%C6%D5%7DV%BDkJ3U%F5A%CB%B6t%1B%82%8B%00%5C-*nR%93%2B%B9_%FF%C7%5B%92%D6%91%F9_%A3%12%FA%2Fz%DC%0D%09%3FG%0FZ%00%00%00%00IEND%AEB%60%82";

l2 = '<img src="' + l21 + '" title="LB" alt="LB " id="LB_L2" style="cursor: pointer;">';

var r21 = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%07tIME%07%DB%0A%0B%03%181%F8%1F%FF%D6%00%00%00%09pHYs%00%00%0A%F0%00%00%0A%F0%01B%AC4%98%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%02qIDATx%DA%A5S%BFK%5BQ%14%FE%EE%CBKL%D4!%1AP%AB%C6J%A8%CF%AAA%08X%D0%60%0AV%BB%B5%3A%D8%C5%0EZ%8AK%1Cj%06%97.B%1D%D5%A1%26%B5%EARM%C7%88%CEu%92V%91B3T%EARE%07C%12%88%15%B4D%13%13%F3N%DF%3D%FE%F8%03%EC%B9%5C%B8%DCs%CE%3D%DF9%DFw%85Y5%AB%8A%A2%E0%CE%26%84%B8%7B%B2%CC7%F6%5BUUu%93%C9%04%222.%04%C8X%8AP%A0%93%8E%7C%3E%CFE%CCf3'%C8%18%89%F82%7F%89%82%AE%0BQw%BF%BE%20%88%94%DCE%8E%9Dr%DF%98%C5b%81%D5j%E5%07%CF%CE%CEP(%14%B8%80%B4%92%92%12%18EI%B5XT%BD%D3%DBIccc%5C%C5%18%09W8%3C%3CD(%18%C2%CE%AF%1DN%18%1A%1C%C2%E0%ABA%14%17%17c%E3%DB%06f%DE%CF%20%9B%C9%12j%9D%B5%14%0C%06I%DA%E2%A7E%9Ax7A%B3%1Ff)%97%CBQ2%99%A4%A6%C6%26%0A%04%02%EC_%5DY%A5%F9%B9y%3EG%22%11%AA%AF%AB'%95%87x%8Dz%EE%E3%1C%A2%D1(%F7_VV%86%81%97%03(w%94%C3%DB%E1%C5%EE%EF%5D%8C%BE%19%C5%C9%C9%09%DCn7%7C%3E%1FJKK%A1%CAd%A1%5C%F5%E5%1F%F1c%7F%7F%1F%0E%87%03%FD%2F%FA%19%FE%F1%9Fc%2C%CC%2F%F0%3C%A4y%3C%1E%B4%3Dj%C3%E6%E6%26%CE%CF%CF%01g%9D%93B%A1%10%C3%DA%DB%DD%A3T*%C5%E7%B5%2Fk%D4%EAn%A5%E6%87%CD%D4%D2%D4B%D5U%D5%D4%F7%BC%8F%DB%92%BB%BB%AB%9B%B4%07%1A)%12%C1%CD%E4G%FC%23%F0%B6%7B%B1%FDs%1B%BE%C7%3E4h%0DLc%26%93A%CF%D3%1E%2C%AF%2C%23%91H%A0%F7Y%2F%0E%0E%0E%98!%96%A0I1%F1%03%12z%3A%9D%C6%F8%F88l6%1B%26%A7%26%99%95%F6%8Ev%84%3F%87%11%FD%11%C5%F0%EBa%8E%AD%AC%AAdZ%15%C9%F1%D1%D1%11_%9E%FE%3D%85%DDng%04%D3S%D3p%B9%5C%D0%1A4t%3D%E9b%BF%D6%A8a%FD%EB%3A%B6%BEoa)%BC%C4%94%0Aws%8Bn%B5%DAPQQ%81x%3C~%CB%88T%A1%D3%E9d%C8%12%AA%F4%1B%8A%BD%15%99A3b%B1%18D%CD%BD%1A%DD0!%7B%E5I%8B%1B%8D%0Bd%2F%B2(%B2%14%19%92-%F0%2C%AE%B4%7C%ED7%983%7C%BA%0C%EF%FC%8F%BFD%B7%1A%B8%EBO%FE%07%09s%1B%7D%E3%AD7%03%00%00%00%00IEND%AEB%60%82";

r2 = '<img src="' + r21 + '" title="RB" alt="RB " id="RB_R2" style="cursor: pointer;">';



    var textNodes =  document.evaluate("//body//*[not(self::script or self::style)]/text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var node = null;
    var node2;
    var node3;
    var node4;  
    var node5;    
    var node6;
    var node7;

    var xSearch;
    var aSearch;
    var ySearch;
    var bSearch;
    var maddenSearch;

    var squareOff;
    var crossoff;
    var triangleOff;
    var circleOff;
    var l2Off;
    var r2Off;

var thisURL = document.URL;    

var myString;

for (var i = 0; i < textNodes.snapshotLength; i++) {

	node = textNodes.snapshotItem(i);
	node2 = node.data;


	
	if(node2.search(/\bX\b[^-]/g) != -1){

		xSearch = 1;

	}

	if(node2.search(/\bA\b[^-]/g) != -1){

		aSearch = 1;

	}

	if(node2.search(/[^~]\bY\b[^-]/g) != -1){

		ySearch = 1;

	}	

	if(node2.search(/\bB\b[^-]/g) != -1){

		bSearch = 1;

	}	

	if(node2.search(/Madden/g) != -1){

		maddenSearch = 1;

	}	
			
			
}

	var circleNew='';
	var squareNew = '';
	var l2New = '';
	var r2New = '';
	var crossNew = '';
	var triangleNew = '';
	var myCount = 0;

	var d = GM_getValue("ps3Buttons","");	

    for (var i = 0; i < textNodes.snapshotLength; i++) {
        
	var newText = document.createElement("text");
	

	node = textNodes.snapshotItem(i);
	node2 = node.data;

	if(xSearch == 1 && aSearch == 1 && ySearch == 1 && bSearch == 1 && maddenSearch ==1){
	
		

		if(node2.match(/\bB\b[^-]/g) != null){
			myCount = myCount + node2.match(/\bB\b[^-]/g).length;
			circleNew = circle.replace('>',' value="' + thisURL + '_' + i + '_' + myCount + '">');
			node2 = node2.replace(/\bB\b[^-]/g, circleNew);

			myString =  thisURL + '_' + i + '_' + myCount + '_f';

			if(d.indexOf(myString) != -1){

				circleOff = '<img src=" " title="B" alt="B " id="B_CIR_CLICKED" style="cursor: pointer;" value="' + thisURL + '_' + i + '_' + myCount + '_f' + '">';
				
				node2 = node2.replace(circleNew, circleOff);
				
			}			

		}
		if(node2.match(/\bX\b[^-]/g) != null){

			myCount = myCount + node2.match(/\bX\b[^-]/g).length;
			squareNew = square.replace('>',' value="' + thisURL + '_' + i + '_' + myCount + '">');
			node2 = node2.replace(/\bX\b[^-]/g, squareNew);

			myString =  thisURL + '_' + i + '_' + myCount + '_f';

			if(d.indexOf(myString) != -1){

				squareOff = '<img src=" " title="X" alt="X " id="X_SQ_CLICKED" style="cursor: pointer;" value="' + thisURL + '_' + i + '_' + myCount + '_f' + '">';
				
				node2 = node2.replace(squareNew, squareOff);
				
			}			
		}
		if(node2.match(/\bLB\b[^-]/g) != null){
			myCount = myCount + node2.match(/\bLB\b[^-]/g).length;
			l2New = l2.replace('>',' value="' + thisURL + '_' + i + '_' + myCount + '">');
			node2 = node2.replace(/\bLB\b[^-]/g, l2New);

			myString =  thisURL + '_' + i + '_' + myCount + '_f';

			if(d.indexOf(myString) != -1){

				l2Off = '<img src=" " title="LB" alt="LB " id="LB_L2_CLICKED" style="cursor: pointer;" value="' + thisURL + '_' + i + '_' + myCount + '_f' + '">';
				
				node2 = node2.replace(l2New, l2Off);
				
			}			
		}
		if(node2.match(/\bRB\b[^-]/g) != null){
			myCount = myCount + node2.match(/\bRB\b[^-]/g).length;
			r2New = r2.replace('>',' value="' + thisURL + '_' + i + '_' + myCount + '">');
			node2 = node2.replace(/\bRB\b[^-]/g, r2New);

			myString =  thisURL + '_' + i + '_' + myCount + '_f';	

			if(d.indexOf(myString) != -1){

				r2Off = '<img src=" " title="RB" alt="RB " id="RB_R2_CLICKED" style="cursor: pointer;" value="' + thisURL + '_' + i + '_' + myCount + '_f' + '">';
				
				node2 = node2.replace(r2New, r2Off);
				
			}			
		}
		if(node2.match(/\bA\b[^-]/g) != null){
			myCount = myCount + node2.match(/\bA\b[^-]/g).length;
			crossNew = cross.replace('>',' value="' + thisURL + '_' + i + '_' + myCount + '">');
			node2 = node2.replace(/\bA\b[^-]/g, crossNew);

			myString =  thisURL + '_' + i + '_' + myCount + '_f';	

			if(d.indexOf(myString) != -1){

				crossOff = '<img src=" " title="A" alt="A " id="A_X_CLICKED" style="cursor: pointer;" value="' + thisURL + '_' + i + '_' + myCount + '_f' + '">';
				
				node2 = node2.replace(crossNew, crossOff);
				
			}			
		}
		if(node2.match(/[^~]\bY\b[^-]/g) != null){
			myCount = myCount + node2.match(/[^~]\bY\b[^-]/g).length;
			triangleNew = triangle.replace('>',' value="' + thisURL + '_' + i + '_' + myCount + '">');
			node2 = node2.replace(/[^~]\bY\b[^-]/g, triangleNew);

			myString =  thisURL + '_' + i + '_' + myCount + '_f';	

			if(d.indexOf(myString) != -1){

				triangleOff = '<img src=" " title="Y" alt="Y " id="Y_TRI_CLICKED" style="cursor: pointer;" value="' + thisURL + '_' + i + '_' + myCount + '_f' + '">';
				
				node2 = node2.replace(triangleNew, triangleOff);
				
			}			
		}

		myString =  thisURL + '_' + i + '_' + myCount + '_f';
		
	
		newText.innerHTML = node2;


		node.parentNode.replaceChild(newText,node);

		

	}


	var circleNew='';
	var squareNew = '';
	var l2New = '';
	var r2New = '';
	var crossNew = '';
	var triangleNew = '';	
	
	
    }

var theHTML;
var theReplacement;
var theImage;
var pattern = /<[^<]+?>/g;
var result;
var theHTML2='';
var clickedValue;


document.addEventListener('click', function(event) {
	


	if (event.target.getAttribute('id')=='X_SQ'){

		var d = GM_getValue("ps3Buttons","");

		if(d !=''){	

			if(d.indexOf(event.target.getAttribute('value')) != -1){	


				d=d.replace(d.substring(d.indexOf(event.target.getAttribute('value')),d.indexOf(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),event.target.getAttribute('value') + "_f");

			}
			else
			{

				d = d + event.target.getAttribute('value') + "_f, ";

			}
		}
		else
		{
			d = d + event.target.getAttribute('value') + "_f, ";


		}	


		GM_setValue("ps3Buttons", d);

		
		event.target.setAttribute('src', '');
		event.target.setAttribute('alt', 'X ');
		event.target.setAttribute('id', 'X_SQ_CLICKED');
				

	}
	else if(event.target.getAttribute('id')=='X_SQ_CLICKED'){

		var d = GM_getValue("ps3Buttons","");		


		if(d !=''){

			if(d.indexOf(event.target.getAttribute('value')) != -1){

				clickedValue = event.target.getAttribute('value');
				clickedValue = clickedValue.substring(0,clickedValue.length - 2);

				d=d.replace(d.substring(d.indexOf(event.target.getAttribute('value')),d.indexOf(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),clickedValue + "_t, ");				
				
				
			}
			else
			{
			
				d = d + event.target.getAttribute('value') + "_t, ";


			}

		}
		else
		{

			d = d + event.target.getAttribute('value') + "_t, ";

		}

		GM_setValue("ps3Buttons", d);

		event.target.setAttribute('src', square1);
		event.target.setAttribute('alt', 'X ');
		event.target.setAttribute('id', 'X_SQ');
	}

	if (event.target.getAttribute('id')=='A_X'){	

		var d = GM_getValue("ps3Buttons","");

		if(d !=''){	

			if(d.indexOf(event.target.getAttribute('value')) != -1){	


				d=d.replace(d.substring(d.indexOf(event.target.getAttribute('value')),d.indexOf(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),event.target.getAttribute('value') + "_f");

			}
			else
			{

				d = d + event.target.getAttribute('value') + "_f, ";

			}
		}
		else
		{
			d = d + event.target.getAttribute('value') + "_f, ";


		}	


		GM_setValue("ps3Buttons", d);

		event.target.setAttribute('src', '');
		event.target.setAttribute('alt', 'A ');
		event.target.setAttribute('id', 'A_X_CLICKED');
	}
	else if(event.target.getAttribute('id')=='A_X_CLICKED'){

		var d = GM_getValue("ps3Buttons","");		


		if(d !=''){

			if(d.indexOf(event.target.getAttribute('value')) != -1){

				clickedValue = event.target.getAttribute('value');
				clickedValue = clickedValue.substring(0,clickedValue.length - 2);

				d=d.replace(d.substring(d.indexOf(event.target.getAttribute('value')),d.indexOf(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),clickedValue + "_t, ");				
				
				
			}
			else
			{
			
				d = d + event.target.getAttribute('value') + "_t, ";


			}

		}
		else
		{

			d = d + event.target.getAttribute('value') + "_t, ";

		}

		GM_setValue("ps3Buttons", d);
		
		event.target.setAttribute('src', cross1);
		event.target.setAttribute('alt', 'A ');
		event.target.setAttribute('id', 'A_X');
	}

	if (event.target.getAttribute('id')=='Y_TRI'){

		var d = GM_getValue("ps3Buttons","");

		if(d !=''){	

			if(d.indexOf(event.target.getAttribute('value')) != -1){	


				d=d.replace(d.substring(d.indexOf(event.target.getAttribute('value')),d.indexOf(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),event.target.getAttribute('value') + "_f");

			}
			else
			{

				d = d + event.target.getAttribute('value') + "_f, ";

			}
		}
		else
		{
			d = d + event.target.getAttribute('value') + "_f, ";


		}	


		GM_setValue("ps3Buttons", d);


		event.target.setAttribute('src', '');
		event.target.setAttribute('alt', 'Y ');
		event.target.setAttribute('id', 'Y_TRI_CLICKED');
	}
	else if(event.target.getAttribute('id')=='Y_TRI_CLICKED'){

		var d = GM_getValue("ps3Buttons","");		


		if(d !=''){

			if(d.indexOf(event.target.getAttribute('value')) != -1){

				clickedValue = event.target.getAttribute('value');
				clickedValue = clickedValue.substring(0,clickedValue.length - 2);

				d=d.replace(d.substring(d.indexOf(event.target.getAttribute('value')),d.indexOf(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),clickedValue + "_t, ");				
				
				
			}
			else
			{
			
				d = d + event.target.getAttribute('value') + "_t, ";


			}

		}
		else
		{

			d = d + event.target.getAttribute('value') + "_t, ";

		}

		GM_setValue("ps3Buttons", d);
		
		event.target.setAttribute('src', triangle1);
		event.target.setAttribute('alt', 'Y ');
		event.target.setAttribute('id', 'Y_TRI');
	}	

	if (event.target.getAttribute('id')=='B_CIR'){

		var d = GM_getValue("ps3Buttons","");

		if(d !=''){	

			if(d.indexOf(event.target.getAttribute('value')) != -1){	


				d=d.replace(d.substring(d.indexOf(event.target.getAttribute('value')),d.indexOf(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),event.target.getAttribute('value') + "_f");

			}
			else
			{

				d = d + event.target.getAttribute('value') + "_f, ";

			}
		}
		else
		{
			d = d + event.target.getAttribute('value') + "_f, ";


		}	


		GM_setValue("ps3Buttons", d);

		event.target.setAttribute('src', '');
		event.target.setAttribute('alt', 'B ');
		event.target.setAttribute('id', 'B_CIR_CLICKED');
	}
	else if(event.target.getAttribute('id')=='B_CIR_CLICKED'){

		var d = GM_getValue("ps3Buttons","");		


		if(d !=''){

			if(d.indexOf(event.target.getAttribute('value')) != -1){

				clickedValue = event.target.getAttribute('value');
				clickedValue = clickedValue.substring(0,clickedValue.length - 2);

				d=d.replace(d.substring(d.indexOf(event.target.getAttribute('value')),d.indexOf(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),clickedValue + "_t, ");				
				
				
			}
			else
			{
			
				d = d + event.target.getAttribute('value') + "_t, ";


			}

		}
		else
		{

			d = d + event.target.getAttribute('value') + "_t, ";

		}

		GM_setValue("ps3Buttons", d);
		
		event.target.setAttribute('src', circle1);
		event.target.setAttribute('alt', 'B ');
		event.target.setAttribute('id', 'B_CIR');
	}	

	if (event.target.getAttribute('id')=='LB_L2'){

		var d = GM_getValue("ps3Buttons","");

		if(d !=''){	

			if(d.indexOf(event.target.getAttribute('value')) != -1){	


				d=d.replace(d.substring(d.indexOf(event.target.getAttribute('value')),d.indexOf(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),event.target.getAttribute('value') + "_f");

			}
			else
			{

				d = d + event.target.getAttribute('value') + "_f, ";

			}
		}
		else
		{
			d = d + event.target.getAttribute('value') + "_f, ";


		}	


		GM_setValue("ps3Buttons", d);
		
		event.target.setAttribute('src', '');
		event.target.setAttribute('alt', 'LB ');
		event.target.setAttribute('id', 'LB_L2_CLICKED');
	}
	else if(event.target.getAttribute('id')=='LB_L2_CLICKED'){

		var d = GM_getValue("ps3Buttons","");		


		if(d !=''){

			if(d.indexOf(event.target.getAttribute('value')) != -1){

				clickedValue = event.target.getAttribute('value');
				clickedValue = clickedValue.substring(0,clickedValue.length - 2);

				d=d.replace(d.substring(d.indexOf(event.target.getAttribute('value')),d.indexOf(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),clickedValue + "_t, ");				
				
				
			}
			else
			{
			
				d = d + event.target.getAttribute('value') + "_t, ";


			}

		}
		else
		{

			d = d + event.target.getAttribute('value') + "_t, ";

		}

		GM_setValue("ps3Buttons", d);
		
		event.target.setAttribute('src', l21);
		event.target.setAttribute('alt', 'LB ');
		event.target.setAttribute('id', 'LB_L2');
	}	

	if (event.target.getAttribute('id')=='RB_R2'){

		var d = GM_getValue("ps3Buttons","");

		if(d !=''){	

			if(d.indexOf(event.target.getAttribute('value')) != -1){	


				d=d.replace(d.substring(d.indexOf(event.target.getAttribute('value')),d.indexOf(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),event.target.getAttribute('value') + "_f");

			}
			else
			{

				d = d + event.target.getAttribute('value') + "_f, ";

			}
		}
		else
		{
			d = d + event.target.getAttribute('value') + "_f, ";


		}	


		GM_setValue("ps3Buttons", d);
		
		event.target.setAttribute('src', '');
		event.target.setAttribute('alt', 'RB ');
		event.target.setAttribute('id', 'RB_R2_CLICKED');
	}
	else if(event.target.getAttribute('id')=='RB_R2_CLICKED'){

		var d = GM_getValue("ps3Buttons","");		


		if(d !=''){

			if(d.indexOf(event.target.getAttribute('value')) != -1){

				clickedValue = event.target.getAttribute('value');
				clickedValue = clickedValue.substring(0,clickedValue.length - 2);

				d=d.replace(d.substring(d.indexOf(event.target.getAttribute('value')),d.indexOf(event.target.getAttribute('value')) + event.target.getAttribute('value').length + 2),clickedValue + "_t, ");				
				
				
			}
			else
			{
			
				d = d + event.target.getAttribute('value') + "_t, ";


			}

		}
		else
		{

			d = d + event.target.getAttribute('value') + "_t, ";

		}

		GM_setValue("ps3Buttons", d);
		
		event.target.setAttribute('src', r21);
		event.target.setAttribute('alt', 'RB ');
		event.target.setAttribute('id', 'RB_R2');
	}	
	


}, true);


