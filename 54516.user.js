// ==UserScript==
// @name           NC Actionbar
// @namespace      kol.interface.unfinished
// @description    Retains the combat action bar (in a limited form) over non-combat adventures in KoL.
// @include        http://*.kingdomofloathing.com/choice.php*
// @include        http://*.kingdomofloathing.com/adventure.php?snarfblat=*
// @include        http://*.kingdomofloathing.com/account.php*
// @include        http://127.0.0.1:*/choice.php*
// @include        http://127.0.0.1:*/account.php*
// @include        http://127.0.0.1:*/adventure.php?snarfblat=*
// @version        1.1.7
// ==/UserScript==

// Version 1.1.7
// - incorporate Charon the Hand's code for a shared set of options
//   in the new account menu
// Version 1.1.6
// - minor aesthetic fix to make buttons highlight with a blue border 
//   when the mouse is hovering over them.
// Version 1.1.5
// - fix to make more robust when pages don't fully load
// Version 1.1.4
// - modified to accommodate lack of choice1 sometimes in a specific choice adv.
// Version 1.1.3
// - fix bug where scrollbars don't show up for very long non-combat text
// Version 1.1.2
// - increase buttons to 6 possible choices (wumpus has 6)
// Version 1.1.1
// - allow any of the 12 keys/buttons to be  set for aventure again
// Version 1.1
// - Added some configure options. These show up at the bottom of the
//   account page, and let you set
//    - if you want the action bar displayed during actual choice adventures
//    - which key/slot you want to 
// Version 1.0

// routine to add or modify the css
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// create the action bar if possible
function createAB() {
    // bail if the action bar is already there
    if (document.getElementById('topbar'))
        return;
    
    var key = Number(getBinding());

    var img = document.createElement('img');
    img.setAttribute('src','http://images.kingdomofloathing.com/itemimages/blank.gif');
    img.setAttribute('id','dragged');
//     var ddb = document.createElement('div');
//     ddb.setAttribute('id','debug');
    var dsm = document.createElement('div');
    dsm.setAttribute('id','skillmenu');
    dsm.setAttribute('class','contextmenu');
    var dim = document.createElement('div');
    dim.setAttribute('id','itemsmenu');
    dim.setAttribute('class','contextmenu');
    var dtb = document.createElement('div');
    dim.setAttribute('id','topbar');

    var numimages = ["data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%AE%A2%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%07%1A%10%26(%9E%2C%04%02%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%00xIDATH%C7%ED%96%B1%0D%C0%20%10%03%ED(C%D0%B1%17%0D%93!F%FBQ%3EU%8A%14Q%02%04%A1H%BE%92%E6%E4%17%E6%A1%BB%3B%16%B0a%11%12K%7C%C1%CCPJAJ%09!%04%90%04%C9.1%5B%EAt'%E9idS%E2%18%23r%CE%A8%B5%C2%CC%86F%CD%91%07%E4%9C%C0%F4%C4%AA%93%C4%12K%2C%F1%12%F6%9E%A5%F0t%FEfi%FC%23%F1%97_p%DDj%89%A7q%00%87%05%23%F6%24%3C%EA%CC%00%00%00%00IEND%AEB%60%82",
                     "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%AE%A2%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%07%1A%100%2C%85%D9u%CC%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%01OIDATH%C7%ED%961%8E%82P%10%86%7F%16B%08FkZ%08%91%0B%D8%7B%02NagbAGi%2C%D0%40%B8%87%C4D%0BceEmag%8C%07%D0%13%D0%40%C8%BF%1D%D5%C6%7D(%C1%DD%84%3Fy%DD%CC%FB%26%99%99%F7~%89%24%F1%01%7D%E1C%EA%C0%1D%B8%D2%F5zE%14Ep%5D%17%A6iB%D34%E8%BA%0E%DB%B61%99Lp%3E%9F%EB%91)(%00O%8F%2C%CB%8C%A2%88%C2%F7%89%06%0E%87Cz%9E%C7%EDv%CB%DB%ED%C6%2C%CB%98%E79%2F%97%0B%A7%D3iU%C0~%BFo%16%FC%9B%7C%DF'%00%8E%C7%E3v%C1%F7%FB%9D%00%D8%EF%F7%85%E2%1B%9B%EA%C1%60%00%00(%CB%B2%DDuJ%D3%14%00%E08N%B3S%FDLEQp4%1A%11%00%97%CBe%7B%3D%9E%CDf%04%40%CB%B2%98eY%3B%E0%D5jE%00%EC%F5z%3C%9DN%CD%EF%F1O%8A%E3%98%00%A8i%1A%8F%C7c%AD%5C%BC%0BUU%95%87%C3%A1v%FEK%E00%0C%09%80%8A%A2p%B7%DB%BDTxmp%10%04%15t%B3%D9%BC%DC%A6Z%E0%C5bQ%7D%08I%92%BC5%94%C2%E0%F9%7C%5EA%D7%EB%F5%DB%2B(%89%BALI%92%84_%B1%C7%E3%01%C30%FE%A6%03Qj%18%86%CE%ECu%E0%FF%01%FE%06%9F%B8%B0(-%A3r%9F%00%00%00%00IEND%AEB%60%82",
                     "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%AE%A2%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%07%1A%101%08%A0%C1%A0%5C%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%01%96IDATH%C7%ED%96!%AB%C2%60%18%85%CF%EE6%15gq%13%FC%0D%16%D1%B0b%B0%89%C1%A0UL%FE%0E%11%AB%22%08%82%BF%C0(h%D2f%11%B4%88%CD0L%DA%14%0C%0A%0A%A2N%CEm%17%EE%E5%E2%DD%60N%B8%EC%C0%D7%3E%CES%CEy%DFW%20I%BCA%1Fx%93%3C%B0%07%FE%A6%E5r%89Z%AD%86t%3A%0DM%D3%20%CB2%22%91%08%B2%D9%2Cz%BD%9E%3D2m%08%C0%D3W%2C%16%F9x%3C%ACy%D9%01'%12%096%1A%0D.%16%0B%9EN'%DEn7%AEV%2BV%ABU%CA%B2L%00l%B7%DB%CE%83%9F%A9%D3%E9%10%00%E3%F1%B8%A5%FF%82S%93%EBx%3C%22%1C%0E%23%10%08%E0r%B9%B8%97jI%92%00%00%3E%9F%CF%DD%3A%F5%FB%7D%00%40*%95r%3E%D5%3Fe%9A%26%D7%EB5%9B%CD%26%83%C1%20%FD~%3F%E7%F3%F9%EB%C2%F5%5B%95t%5D%E7l6%B3%EE%E1%14XQ%14%96J%25n6%9B%D7%D7%E9~%BFs%BB%DDr8%1C2%9F%CF%13%005M%A3a%18%EE%F5%98%24%2B%95%0A%010%97%CB%B9%D7c%008%1C%0EPU%15%8A%A2%E0%7C%3E%BB%B7%9DL%D3%04%00%88%A2%E8%EEZl%B5Z%00%00%5D%D7%9D%EBq2%99d%BD%5E%E7t%3A%E5n%B7%E3%F5z%FD%0A%D7h4b%A1P%20%00%0A%82%C0%F1x%EC%5C%B8%FEZ%89%00%18%0A%85%D8%EDv-%F9Iv%8E%80%C1%60%80%C9d%02%C30%B0%DF%EF!%8A%22TUE%2C%16C%26%93A%B9%5CF4%1A%B5%E4'xw%B5%07%FEw%E0O%09%EAL%5B%10%2FM%26%00%00%00%00IEND%AEB%60%82",
                     "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%AE%A2%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%07%1A%11%00%26%BB%88%C0%16%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%00%F6IDATH%C7%ED%961%8E%830%14D%C7%10!%24%24.%00%25%A2%E6%04%F4%88%03p%16Z%0AjnACI%C5%09h%A9%11-'%A0p%814iv%15E%C9j%1366%5Bx%0E%F0%9E%F5m%7D%8F%20I%9C%10%0B'%C5%88%8D%F8%C7%8C%E3%08%CB%B2%20%84%80%10%E2%7D%00%0Fd%DFw%26IB%CF%F3%08%80G0%87%C4M%D3%10%00%EB%BA%D6'%5E%D7%95%BE%EF3%8A%22J)%F5%89%8B%A2%20%00%F6%7D%CF%AF%AD%A7%5E%3C%0C%03%010%CF%F3%1B%40%B5XJ%C98%8E%E98%0E%E7y%D6'%AE%AA%8A%00X%96%E5%3D%40%A5xY%16%BA%AE%CB%20%08%B8m%9B%3Eq%96e%04%C0%B6m%1F%01%AA%C4%5D%D7%11%00%D34%7D%0EP%25%0E%C3%90%B6ms%9A%A6%8F%8A%C5o%0D%E4%C8%1E~%A5%D4%9C%F6%3B%5D%FEz%FA%EF%89%BC%5B%DDL%11%F8%3Fw%FC%89%17lFm%C4Zs%05Ns%B6%B0pv%A0w%00%00%00%00IEND%AEB%60%82",
                     "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%AE%A2%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%08%02%0A'%01%C3%C9c(%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%011IDATH%C7%ED%961%8A%83%00%10E%BF%EB6%92%14jeg-%92F%0B%0D%E4%04%1E'X%88%BD%ADW%C8%05%AC%AC%03%E9%AC%04%8F%60%236%A2%A4%89%86%10%F8%7B%82%EC%EA%22%C9n%F0%C3t3%3C%06%E6%7FF%20I%BC%40%1Fx%91%16%F0%FB%83%3F%C76%0A%82%F0c%CF%14%83%FC%FD%8D%7F%B3%D5r%5C%FF%13%EC8%0E%24I%C2j%B5%82i%9A%F0%7D%1Fu%5DO's%A4%00%3C%2CEQx%3A%9D8E%A3%C1%BB%DD%8E%87%C3%81eY%F2v%BB%B1%EB%3A%A6iJ%CB%B2%08%80%B2%2C%B3%AA%AA%F9%C1%8Ft%BD%5E%E98%0E%01p%BF%DF%3F%0FL%92%C7%E3%91%00h%18%C6%E8%19a%8EG%E0r%B9%60%BD%5EC%92%24%F4%7D%FF%7C%3B%8D%C9%F3Y%C1Y%96%01%00t%5D%7F%1Ex%18%06%84a%08%00%F0%3Co%5E%1F%DB%B6%CD8%8E%99%E79%CF%E73%EF%F7%3B%9B%A6a%92%24%DCl6%04%40UUY%D7%F5%BCW%FD%5Dx%00%A0%A6i%CC%B2l%FE%00)%8A%82A%10%D0u%5D%CA%B2LQ%14%A9(%0A%B7%DB-%A3(b%DB%B6%93-(%2C%7F%F5%02~%3B%F0%17%09%8C%FC%85N%08%B9x%00%00%00%00IEND%AEB%60%82",
                     "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%AE%A2%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%08%02%0A'%1EN%C1n%DD%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%01%C2IDATH%C7%ED%96%BD%AA%EA%40%1C%C4G%91%F8%19%D3%08%96%C1%20(%F8%02%A6%D4.%16V%82%A5%9FM%0A%1B%3B%1F%C0%CA7%10%5B%DF%C0N%2B%1B%C5J%2C%A3%22%88%8D%95%8D(%09%C8%DCJ%B9ps%B8%11%96s%E0%E0%C0%C2%B2%0C%FBcw%E7%BF%BB%3E%92%C4%0F%C8%8F%1F%D2%07%FC%01%FF%A3%EB%F5%8A%C1%60%80%7C%3E%8Fx%3C%0EI%92%A0i%1A%DA%ED6%16%8B%85%F7%89%F8%86%D6%EB5UU%25%80%2F%9BWyv%1E%8FG%26%12%09%02%A0a%18%9C%CDf%BC%5C.%B4m%9B%BB%DD%8E%C3%E1%90%BA%AE%8B%07%97J%25%02%60%A7%D3%A1%08%C1%EB%16%03%60*%95%A2m%DBB%C0%9E%C25%1E%8F%01%00%ADV%0B%92%24%7D_%AA%9Fi-%16%8B%98%CF%E70%0C%03%8A%A2%20%14%0A!%9DN%C34M%EC%F7%FB%F7%C8%5E%B6%25%99L%12%00%FB%FD%3E%FD~%BFk%9A%23%91%08'%93%89%D83%0E%06%83%04%C0%40%20%40%00l4%1A%B4%2C%8B%B6m%D3%B2%2C%D6j5%02%60%2C%16%E3%E1p%10%07%FE%7B%95%D5j%D5%D5S%A9T%DEJ%BD'%B0%2C%CB%2F%F0j%B5r%F5%2C%97K%02%606%9B%15%07%CEd2%2F%F0%FD~w%F5%DCn7%02%608%1C%16WN%B9%5C%CEsX%7D%3E%9F%B8r*%14%0A%AF%FEf%B3q%F5%3C%C7UU%15WN%E7%F3%F9%95%EC%FF%85%AB%DB%ED%8A%BD%AB%7B%BD%DE%EB%9C%9B%CD%26%B7%DB-%1D%C7%A1eY%AC%D7%EB%04%40EQx%3A%9D%C4%82%1D%C7a%B9%5C%FE%F29%94e%99%D3%E9T%FC%EBD%92%8F%C7%83%A3%D1%88%BA%AE3%1A%8DR%92%24j%9AF%D34%3D_%1CO%F9%3E%FF%EA%0F%F8%D7%81%FF%00-O%5B%BD%9Ec-%95%00%00%00%00IEND%AEB%60%82"];

    var numboldimages = ["data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%AE%A2%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%07%1A%105%0FZ%C9%F0%FB%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%00uIDATH%C7%ED%95%CD%09%C00%08%85%B5t%0FG%CBhY%C5ML%26%B1%B7Bsh%B1)H%C3%13%3C)%7C%F0%FCy%EC%EEN%09%B1QR%00%BC%3Ex%8F4%B7%D6HU%CF%EC%BD_%EA%91%03%E1%C891%F3m%3D%02%FE%C7%8CE%84J)Tk%253%9B%02%F3%CC%E7%1A%A5_Oj%80%01%06%18%E0%D7%B6%F8%E4N%91%17%0A%A9%3F3zl5%C0i%E0%03%91%A2-(%9F'%B8%F7%00%00%00%00IEND%AEB%60%82",
                         "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%AE%A2%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%07%1A%105%26%18%7Bh%97%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%01_IDATH%C7%ED%96%C1%AA%82%40%14%86%CF%5C%14%03%91P%83z%84%C0eO%11B%EB%F6%BD%85%BE%81%D0%B6U%84n%F2%19%04%C1e%D0%DA%AD%12%CD%A2%AD%C8%ACB%3Cww%B9R%D7%C6%98n%97%8B%3F%CC%E2%C0p%3Ef%E6%FC%3FC%10%11%E1%0D%FA%807%A9%07%FF%7F%B0%C4%BB1%CFs%88%E3%18%8E%C7%23%A4i%0A%A7%D3%09%8A%A2%80%BA%AEA%D7u%B0%2C%0B%E6%F39%ACV%2B0%0C%E3qC%E4%14%00p%AD%D1h%84Q%14%3D%EE'%1A%0C%00%A8(%0A%A6i*%0EL%08A%DB%B6q%BF%DF%23%A5%14%AB%AA%C2%CB%E5%82%EB%F5%1A%07%83A%03%BE%5C.%C5%80m%DBn%3D%C5v%BBm%80%C7%E3qk%3F%22*2%19c%A0i%DAW-%CB2%5C%AF%D7%D7%DB%891%D6%A8%87%C3%E1%EF%F8x%B7%DB5%EA%E9t*%C6NmJ%92%04%15Ei%BC%B1%EB%BAb%86%EB'%85ax3%D1%AA%AA%E2%F9%7C~%0D%B8%AEkt%1C%E7%AE%8F%83%20%10%17%20%DFU%96%25.%16%8B%BBP%CF%F3%F8r%A1%2B4%CB2%B4%2C%EBnZ%F9%BE%CF%DD%07%BA%0E%91i%9A7%D0%C9d%82%87%C3%A1%D3%01%B8%C1%9B%CD%06%25I%BA%81%CEf3%A4%94v~.%EE%E4%22%84t%F6v%5B%EB%FE%07%F2%D4%B5%F5%9F%BD%1E%FC%A7%C0%9Fi%ABl%7BRI%5ES%00%00%00%00IEND%AEB%60%82",
                         "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%AE%A2%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%07%1A%106%00%E1%5B%BE%A9%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%01%95IDATH%C7%ED%96%BD%8A%021%14%85O%96%11%94)%15E%87)E%F0%07%99B%AC%04%ED%15l%F4%01%EC%7D%03%5B_%C1G%10%2CE%B0%9CB%05_%40b)X%0C%FEt%D3%99a%B8V%2B%9B-%D6%2CD%05%F1%40%8A%0B%C9%FD%C8%CD%C9M%18%11%11%5E%A0%2F%BCH%1F%F0%FB%83%0D%D5%89%9CsL%A7S%ACV%2Bp%CEq%3C%1E!%84%80i%9A%B0m%1B%8E%E3%A0%D3%E9%A0%D5j%811v%3F!)%0A%80%D2h4%1A%E4%FB%FE%FD%7C%BA%C1%00%A8%DF%EF%EB%03%97%CBe%1A%0E%87%B4%5C.%E9%7C%3ES%10%04%E4%FB%3E%B9%AEK%D5jU%02%A7%D3%E9%BB%F9%98%8E%CE%E5y%1E%2C%CB%BA%C5%91H%04B%88%C7%BB%3A%0CC)%CE%E5r%FA%CC%F5%5Ba%18%D2%E9t%A2%D9lF%8E%E3H%A5%1E%8F%C7%FA%CEX%C5d%D9l%96%26%93%89R%1Em%0D%841%86b%B1%88J%A5%A2%B6%40%E7%8E%01P2%99%A4%FD~%AF%BF%D4%DF%12B%D0n%B7%A3%D1hD%89DB%82%F7z%BD%C7%81%7F%CAu%5D%09lY%D6s%EE%F1%E5rA4%1A%7D%FE%3D%5E%AF%D7R%1C%8F%C7%F5%BCN%85B%01%EDv%1B%B5Z%0D%F9%7C%1E%A9T%0A%86a%C0%F3%3C%CC%E7s%0C%06%03i~%BD%5E%D7%E3%EA%FF%3C%10%B1X%8C8%E7z%CC%A5%0A%B5m%9B%16%8B%85%92!%95J%BD%D9ln%9F%80%EDv%8B%C3%E1%80%20%08%60%9A%262%99%0CJ%A5%12%9A%CD%26%BA%DD%AEd%B2%3F%1B%CE%E7_%FD%01%BF%1D%F8%0A%EER%04%02z6%AF%3F%00%00%00%00IEND%AEB%60%82",
                         "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%AE%A2%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%07%1A%11%00%0D%1749V%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%00%E9IDATH%C7%ED%D61%0ED%40%14%06%E0y%93%15%8DD%ED%04%1A%BD%CA%01%94.%E1%12J%17P%3A%85%3B%A8%F4*%ADB%AF%14%09%FF6%BBo%B3A%96%DD%1D%9A%F9%93%A9%24%FF%97%3C%F2%0C%01%80%B8%20R%5C%14%0Dkx3EQ%08%22Z%9C%DD%C1%17%E9%FB%1E%8E%E3%40%08%B18%7B%F3%15%1C%C7%F1*%AA%14.%CB%12Dt.%3C%0C%03%5C%D7e%24%8A%A2s%E0%24I%18%B0m%1B%5D%D7%A9%87%EB%BA%86a%18%0C%E4y%8E%C7%9EW%07O%D3%04%DF%F7%B9%3C%08%02%CC%F3%AC%1E%CE%B2%8C%8BM%D3D%D34%AF%02Up%DB%B6%B0%2C%8B%8B%D34%7D%2FP%05%87a%C8%A5%9E%E7a%1C%C7s%E0g%A1%94%12UUm%3E%3F%0A%D3%A7%1B%C8%A1%FD%BB%5C%C7%FA%B7%C8%B9%FD2%AE%B5W%B1%F7%EE%A8G%FD%D7%2FW%8FZ%C3%97%E4%0E%2C%D8Jq%BD%FB%A4t%00%00%00%00IEND%AEB%60%82",
                         "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%AE%A2%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%08%02%0A'%0ESv~%B9%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%01%3EIDATH%C7%EDV1%AA%83%40%14%1C%F5%A3%04%14%2CSX%26%2C%24%A6%B3%B0%F0%06%166%01%CF%913HRZz%00%EF%10r%80%80W%D0N%E2%DAZ%08%AB%8D%C5%FE.%90%E6%BB%1F%96%04%82%03%5B%3C%98%7D%C3%CE%EE%2CO%E1%9Cs%7C%00*%3E%84E%F8%FB%85%7FD%89%8A%A2%087%15%09%CAb%B5T%3B%17%AB%A5%08%EFv%3B%18%86%01%D34%B1%DF%EFq%3A%9D%F0x%3C%FEuWB%000%BB%2C%CB%E2%B7%DBM%AC%9FLa%00%DC4M%5E%D7%F5l%3Fa%AB%0F%87%03%92%24%C1%FD~G%D7u%98%A6%09M%D3%E0r%B9%40%D7%F5'%8F1%864M%E5Y%FD%17%B2%2C%7B95!dv%8F%22c%10%E8%FB%1E%B6m%3F%EB%D5j%85q%1C%DF%1F'UU%DF%93%E3%3C%CF_%EA%CDf%23%E7%CB%24%84%20%0CC%04A%00%D7u%E18%0Et%5D%07%A5%14y%9E%E3%7C%3E%BF%F0%8F%C7%A3%9C%C7%25%1A%25%00%7C%BB%DDr%C6%98%9C%1C%8B%8A%FA%BE%CF)%A5BI%10%B2%BA%AA*%5C%AFW%14E%81%B2%2C%D1%B6-%86a%80a%18X%AF%D7%F0%3C%0Fq%1C%23%8A%22h%9A%266X%2Cs%F5%22%FCu%C2%BF%B8%B3%13%E0%EC%C4%F1%F9%00%00%00%00IEND%AEB%60%82",
                         "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%AE%A2%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%08%02%0A'.h%18%5Eq%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%01%C9IDATH%C7%EDV%BD%CA%E2%40%14%BD%9F%18%E3O!%98%26%E84j!%F8%03%82%DA%08y%05%7D%02k%AD%B5%B1%B0%B1%D4%07%D0%17H%E3%0BL%23%16v%A2%8D%8F%10%08%16%16Z%88%032%22g%AB%FD%D8%F9d%D7%2C%C9%F2%C1%E2%81)n8%DCC%CE%B97%93%0F%00%A0o%40%88%BE%09o%E1%B7%F0%13%B6%DB-%F5z%3D*%95J%94H%24(%1C%0E%93a%18%D4l6i8%1C%D2~%BF%F7%D6%08%1Eq%BD%5E%D1%E9t%40D%2F%8F%17xb%DDn7X%96%E5I4P%E1%C1%60%A046M%13%F3%F9%1C%8E%E3%40J%89%CB%E5%82%DDn%87%E9t%8Aj%B5%1A%8C%B0%EB%BA%D04M%11u%5D%17~%F1r%B8l%DB%A6%FB%FD%FEY%8FF%23b%8C%FD%FB%A9%5E%ADVJ%5D(%14%A8%DB%EDR.%97%23%5D%D7)%99LR%BD%5E%A7%F1xL%E7%F3%D9%BB%F2%2BK2%99%8C%92o%24%12%F9%EDP%99%A6%89%CDf%13L%C6%BF%E6%EB%E5%18%86%81%C3%E1%E0%3F%E3%AF%B7%26c%8C8%E7%24%84%20!%04q%CE%95%CCO%A7%13M%26%13%FFV%A7R)%E5%8D8%E7O%1C%CE%B9%C2%C9%E7%F3%FE%AD%AET*JS!%C4%13G%08%A1pt%5D%F7ou%ADV%FB%EBU%89%C7%E3%FE%D7%A9%D5j)%F5z%BD~%E2%7C%7DV.%97%FDg%2C%A5D6%9B%FD%B4%911%06%CE9%84%10%10B%80s%0E%C6%98b%F5l6%0B%E6%5B%BD%5C.%11%0A%85%3C%ADS%A3%D1%80%942%18a%00%B0m%1B%B1X%EC%8F%A2%96e%E1x%3C%06w%3B%FD%84%E38%E8%F7%FB(%16%8B%88F%A3%D04%0D%E9t%1A%EDv%1B%8B%C5%02%8F%C7%C3s%AF%8F%F7%7F%F5%5B%F8%BF%13%FE%01%C4%CF%95%A7%25%0D%05%BB%00%00%00%00IEND%AEB%60%82"];
    var blank = "http://images.kingdomofloathing.com/itemimages/blank.gif";

    // see if we have an adventure again and if so get the url
    var url = getAdvAgain();
    var buttons = [blank,blank,blank,blank,blank,blank,blank,blank,blank,blank,blank,blank];
    var nc = findMaxChoice(document.getElementsByName('whichchoice'));

    var dontshow = (nc>0 && !getChoiceToggle()) || (nc==0 && !url);
    if (!url) {
        var cnum = getChoice();
        if (!cnum) cnum = -1;
        else cnum = Number(cnum)-1;
        for (var i=0;i<nc && i<buttons.length && i<numimages.length;i++) {
            buttons[i] = (i==cnum) ? numboldimages[i] : numimages[i];
        }
        if (dontshow) {
            dtb.setAttribute('style','display:none;');
            dsm.setAttribute('style','display:none;');
            dim.setAttribute('style','display:none;');
            img.setAttribute('style','display:none;');
        }
    }

    var code = "<center><table class=actionbar cellpadding=0 cellspacing=1><tbody><tr class=label><td></td><td></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>0</td><td>&ndash;</td><td>=</td><td></td><td></td><td></td></tr><tr class=blueback><td><img src='http://images.kingdomofloathing.com/itemimages/book3.gif' id='skills'></td><td class=spacer></td>";
    for (var i=0;i<12;i++) {
        if (key==i && i>=nc)
            code += "<td><img src=\"http://images.kingdomofloathing.com/itemimages/" + ((url) ? "advagain.gif" : "repeat.gif") + "\" id='button"+(i+1)+"'></td>";
        else
            code += "<td><img src=\"" + buttons[i] + "\" id='button"+(i+1)+"'></td>";
    }

    code += "<td valign=center align=center class=page><a class=nounder href='javascript:pageup();'><img src='http://images.kingdomofloathing.com/otherimages/tinyup.gif' class=updown></a><br><span id='page_out'></span><br><a class=nounder href='javascript:pagedown();'><img src='http://images.kingdomofloathing.com/otherimages/tinydown.gif' class=updown></a></td><td class=spacer></td><td><img src='http://images.kingdomofloathing.com/itemimages/backpack.gif' id='items'></td></tr><tr class=label><td>skills</td><td></td><td id='qty1'></td><td id='qty2'></td><td id='qty3'></td><td id='qty4'></td><td id='qty5'></td><td id='qty6'></td><td id='qty7'></td><td id='qty8'></td><td id='qty9'></td><td id='qty10'></td><td id='qty11'></td><td id='qty12'></td><td></td><td></td><td>items</td></tr></tbody></table></center>";
    dtb.innerHTML = code;

    document.body.insertBefore(dtb,document.body.firstChild);
    document.body.insertBefore(dim,dtb);
    document.body.insertBefore(dsm,dim);
    //    document.body.insertBefore(ddb,dsm);
    //    document.body.insertBefore(img,ddb);
    document.body.insertBefore(img,dsm);

    if (!dontshow) 
        addGlobalStyle('.actionbar { border-spacing:2px 0; empty-cells:show; margin:0; padding:0; }\n'+
                   '#topbar { height:66px; left:0; overflow:hidden; position:absolute; text-align:center; top:0; width:100%; }\n'+
                   '.blurred { opacity:0.5 !important; }\n'+
                   '.blueback td { background-color:black; }\n'+
                   '.blueback td IMG:hover { border-color: blue; }\n'+
                   '.blueback td img { border:3px outset black; cursor:pointer; height:30px; margin:0; padding:0; width:30px; }\n'+
                   '.blueback td img.updown { border:0 solid black !important; height:9px !important; width:16px !important; }\n'+
                   '.spacer { background-color:white !important; width:18px !important; }\n'+
                   '.page { background-color:white !important; font-size:9px; }\n'+
                   '.contextmenu { border:1px solid black; display:none; max-height:75%; max-width:300px; overflow-x:hidden; overflow-y:auto; position:absolute; z-index:50; }\n'+
                   '.contextmenu a, .contextmenu p { background-color:white; border-bottom:1px solid black; display:block; min-height:34px; text-decoration:none; width:100%; }\n'+
                   '.contextmenu a img { border:0 none; height:30px; margin:2px; vertical-align:middle; width:30px; }\n'+
                   '.contextmenu a span { font-size:0.8em; }\n'+
                   '#skillmenu a img { float:left; }\n'+
                   '#skillmenu a span { display:block; }\n'+
//                    '#debug { background-color:#CCCCFF; display:block; font-size:10px; left:0; position:absolute; top:0; }\n'+
                   '#dragged { border:2px dotted green; cursor:pointer !important; display:none; height:30px; opacity:0.75 !important; position:absolute; width:30px; z-index:1000 !important; }\n'+
                   '.label td { font-size:10px; margin:0; padding:0; text-align:center; }'+
                   'body { border:0 none; height:100%; margin:0; max-height:100%; overflow:auto; padding:0; }' );

    var b12 = document.getElementById('button'+(key+1));
    if (b12 && key>=nc) {
        if (url) {
            b12.addEventListener('click',function(e) {window.location.href=url;},true);
            document.addEventListener('keyup',function(e) {if (e.keyCode==keys[getBinding()]) window.location.href=url;},true);
        } else {
            b12.addEventListener('click',doChoice,true);
            document.addEventListener('keyup',function(e) {if (e.keyCode==keys[getBinding()]) doChoice(null,key+1);},true);
        }
    }
    for (var i=1;i<=nc;i++) {
        var b = document.getElementById('button'+i);
        if (b)
            b.addEventListener('click',doChoice,true);
    }
    for (var i=1;i<=nc;i++) {
        // also add a listener to any existing choices
        var b = document.getElementsByName('choiceform'+i)[0];
        if (b)
            b.addEventListener('submit',recordChoice,true);
    }
}

// return adventure choice number if found
function choiceNum() {
    //<input type=hidden name=whichchoice value=182>
    var links = document.getElementsByName('whichchoice');
    if (links.length>0) 
        return links[0].getAttribute('value');
}

// handler from buttons to execute a choice, if possible
function doChoice(e,cc) {
    var c = ((cc) ? cc : this.getAttribute('id').replace(/[^\d]*/,''));
    var nosave = false;
    if (c==getBinding()+1) { // means we do last choice for this choiceadv
        c = getChoice();
        if (!c) {
            return;
        }
        nosave = true;
    }
    var cf = document.getElementsByName('choiceform'+c)[0];
    if (cf) {
        if (!nosave) saveChoice(c);
        cf.submit();
    }
}

// handler attached to existing choiceforms to record choice
// for future default behaviour
function recordChoice(e) {
    var c = this.getAttribute('name').replace(/[^\d]*/,'');
    saveChoice(c);
}

// get the adventure again url, if found
function getAdvAgain() {
    var links = document.getElementsByTagName('a');
    for (var i=0;i<links.length;i++) {
        var href = links[i].getAttribute('href');
        if (href && href.indexOf('adventure.php?')==0) {
            return href;
        }
    }
}

// save the current choice
function saveChoice(c) {
    var pn = getPlayerNameFromCharpane();
    var cnum = choiceNum();
    if (pn && cnum) {
        var map = getChoices();
        map[cnum] = c;
        saveChoices(map);
    }
}

// retrieve the global choice map
function getChoices() {
    var map = {};
    var pn = getPlayerNameFromCharpane();
    if (pn) {
        var s = GM_getValue(pn+'_ncactionbar_choices','');
        //GM_log('retrieved map: '+s);
        var cs = s.split(';');
        for (var i=0;i<cs.length;i++) {
            var csi = cs[i].split(':');
            if (csi.length==2) {
                map[csi[0]] = csi[1];
            }
        }
    }
    return map;
}

// save the global choice map
function saveChoices(map) {
    var pn = getPlayerNameFromCharpane();
    if (pn) {
        var s = '';
        for (var cnum in map) {
            s += cnum+':'+map[cnum]+';';
        }
        //GM_log('setting map to: '+s);
        GM_setValue(pn+'_ncactionbar_choices',s);
    }
}

// get the stored choice for the current adventure if any
function getChoice() {
    var map = getChoices();
    var cnum = choiceNum();
    if (cnum && map[cnum])
        return map[cnum];
}

function getPlayerNameFromCharpane() {
    var somef=window.parent.frames;
    var goo;
    for(var j=0;j<somef.length;j++) {
        if (somef[j].name=="charpane") {
            goo=somef[j];
            var username = goo.document.getElementsByTagName("b");
            if (!username || username.length < 1) break;
            username = username[0];
            if (!username) break;
            username = username.firstChild;
            if (!username) break;
            // in full mode the link is <a><b>Name</b></a>
            // in compact mode it's <b><a>Name</a></b>
            // so have to handle this, and also can use it to tell
            // whether it's in compact mode or not.
            var fullmode = true;
            while (username && username.nodeType == 1)
                {
                    username = username.firstChild;
                    fullmode = false;
                }
            if (!username) break;
            username = username.nodeValue;
            if (!username) break;
            username = username.toLowerCase();
            GM_setValue('playername',username);
            return username;
        }
    }
    return GM_getValue('playername','');
}

var keys=[49,50,51,52,53,54,55,56,57,48,45,61];

function buildPrefs() {
    if (!document.querySelector('#privacy'))
        return;
    if (!document.querySelector('#scripts')) {
        //scripts tab is not built, do it here
        var scripts = document.querySelector('ul').appendChild(document.createElement('li'));
        scripts.id = 'scripts';
        var a = scripts.appendChild(document.createElement('a'));
        a.href = '#';
        var img = a.appendChild(document.createElement('img'));
        img.src = 'http://images.kingdomofloathing.com/itemimages/cmonkey1.gif';
        img.align = 'absmiddle';
        img.border = '0';
        img.style.paddingRight = '10px';
        a.appendChild(document.createTextNode('Scripts'));
        a.addEventListener('click', function (e) {
                //make our new tab active when clicked, clear out the #guts div and add our settings to it
                e.stopPropagation();
                document.querySelector('.active').className = '';
                document.querySelector('#scripts').className = 'active';
                document.querySelector('#guts').innerHTML = '<div class="scaffold"></div>';
                document.querySelector('#guts').appendChild(getSettings());
            }, false);
    } else {
        //script tab already exists
         document.querySelector('#scripts').firstChild.addEventListener('click', function (e) {
                //some other script is doing the activation work, just add our settings
                e.stopPropagation();
                document.querySelector('#guts').appendChild(getSettings());
            }, false);
    }
}

function getSettings() {
    //build our settings and return them for appending
    var guts = document.body.appendChild(document.createElement('div'));
    guts.id = 'ncactionbarprefs';
    var subhead = guts.appendChild(document.createElement('div'));
    subhead.className = 'subhead';
    subhead.textContent = 'NC ActionBar';
    var section = guts.appendChild(document.createElement('div'));
    section.className = 'indent';
    //call function in main script to actually make the settings
    section.appendChild(buildSettings());
    return guts;
}

function buildSettings() {
    var ul = document.createElement('ul');
    var li = document.createElement('li');

    var curstate = getChoiceToggle();
    var ar = document.createElement('a');
    ar.setAttribute('href','javascript:void(0)');
    ar.setAttribute('id','ncactionbar_togglechoice');
    if (curstate) {
        ar.innerHTML = 'Action bar shown for choice adventures';
    } else {
        ar.innerHTML = 'Action bar not shown for choice adventures';
    }
    ar.addEventListener('click',toggleChoice,true);
    li.appendChild(ar);
    ul.appendChild(li);

    li = document.createElement('li');
    
    curstate = getBinding();
    ar = document.createElement('select');
    for (var i=0;i<keys.length;i++) {
        var option = document.createElement('option');
        option.setAttribute('value',String.fromCharCode(keys[i]));
        option.setAttribute('keyindex',i);
        option.appendChild(document.createTextNode(String.fromCharCode(keys[i])));
        ar.appendChild(option);
    }
    ar.selectedIndex = curstate;
    ar.addEventListener('change',selectKey,true);
    li.appendChild(document.createTextNode('Set adventure-again key: '));
    li.appendChild(ar);
    ul.appendChild(li);
    
    return ul;
}

function findMaxChoice(choices) {
    var nc = choices.length;
    for (var i=0;i<choices.length;i++) {
        var n = choices[i].parentNode.getAttribute('name');
        if (n) {
            n = Number(n.replace(/[^\d]/g,''));
            if (n>nc)
                nc = n;
        }
    }
    return nc;
}

function getBinding() {
    var pn = getPlayerNameFromCharpane();
    var curstate = 11;
    if (pn) {
        curstate = Number(GM_getValue(pn+'_ncactionbar_keybinding','11'));
    }
    return curstate;
}

// handler for select key dropdown
function selectKey(e) {
    var pn = getPlayerNameFromCharpane();
    var newkey = (this.options[this.selectedIndex]).getAttribute('keyindex');
    if (pn) {
        GM_setValue(pn+'_ncactionbar_keybinding',newkey);
    }
}

// check global state for choice display state
function getChoiceToggle() {
    var pn = getPlayerNameFromCharpane();
    var curstate = true;
    if (pn) {
        curstate = !!GM_getValue(pn+'_ncactionbar_togglechoice','true');
    }
    return curstate;
}

// handler for account menu toggle choice adventures
function toggleChoice(e) {
    var pn = getPlayerNameFromCharpane();
    var curstate = true;
    if (pn) {
        curstate = !!GM_getValue(pn+'_ncactionbar_togglechoice','true');
        curstate = !curstate;
        GM_setValue(pn+'_ncactionbar_togglechoice',(curstate ? 'true' : ''));
        var ar = document.getElementById('ncactionbar_togglechoice');
        if (ar) {
            if (curstate) {
                ar.innerHTML = 'Action bar shown for choice adventures';
            } else {
                ar.innerHTML = 'Action bar not shown for choice adventures';
            }
        }
    }
}

if(window.location.pathname.indexOf('/account.php')==0) {
    buildPrefs();
} else {
    createAB();
}
