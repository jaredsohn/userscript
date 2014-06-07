// ==UserScript==

// @name            Maximize netvibes

// @description	    Hides netvibes top bar and bottom.

// @include         http://www.netvibes.com/*

// ==/UserScript==



//Name:            Maximize netvibes 

//Version:         0.3
//Author:          Joaquin Moran 

//Last update:	   15/11/2009



(function()

{

//

var magnifierplus = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02gIDAT8%CB%A5%92%EFK%13q%1C%C7%FD%0Bz%EA%C3%A4%07qV%88(uD)%04.V%DB%9A%3A%B7%A5nWS%8F%99%AB%96%24%23aKkz%A5%2Bm%86%8Em%FE%A4%F6%83%A6L%023%F16%D2%E9%CE%C5v%A3%C2%84%10%8B%22%AE%B8%87%3D%3E%3E%7D%BF1%A2%3A%0B%A1%07%2F8%8E%EF%E7%F5y%7F%3E%DFo%11%00%14%FD%0F%3F%3F%F8%B0%89%E4%23T%9C%8FX%C4%7C%B4M%E2%C3-Rv%C6%2Cn%8C%1B%E3%E91%1D%F9O%01%1F1%D3%F9%A8E%E0%C3%14%9F%9Dirf%26%8C%C4F%D0%40l%04%F4N.%60%E49%9FQX%F5%D6%D2%BB%0Apg%5C%9C%7B%DC%CC%E4%3F~%2BE4%20%EC%88%CB%08%0D%E2%40%CA%5B%CB%A4%BC%3A!9%A0%96%25)%CA%85%A9x.D%F1%E8%20%81%B8%84%E8F8%10%5D%88ND3%A2deH%CB'%06%D4%F1%5D%12%5C%14%B3%D3%8DNt%A8%1Eq%A3P%7C%BDP%8CSt%20j%12%8C%CA%99%1C%D0%882A%3E%D2%22e%C6%8D%B8%BB%ED%97%AE%3FF%B0%3E3%81e%DE%08%A6h%3D%2C%DFR%12%C9A%AD%24%1F!d%918%BF%1E%0B%AC%85%C2%AB%05Y%FB%859%03%847'%407%A9%82%E77%15D%82Q%CB%05%99%A9f%91%F35%E0%11%94%85%C2%8E%D6%A7%8D%40%C5%1A%C0%B1x%05%26_%8D%82m%B6%15j%3CUP%ED%C6%3B%FCC%90%F6%1B%D0%3D%EB%F1%12K%10%06%04%8D%23O%BD%F6A%20%3F%02%CC%BA%0B%1E%BC%BC%0B%9E%B4%1B%8Ev%97%CB%05%A9%91%3ArmT%2F%AC%0Ck%F15%EEG%9C%C2%915c%0A%A0%23%14x%B8~h%0A%EA%A0%D2Q%06e%F6R%98%B7%9Fl%94%3D%A4%17%F7%CE%D1%AB%C3%B5BrP%C3%B3%7Dg%9CK%3D%A7%89E%97%82%C0%91o%AF%BA%A0%A2%EB%08%7C%CA%FAag%ED%3E%B0n-%CC%B6%1F%2F%96%3De%B6%FF%2C%89%88%B3%8CZ%C4%CBb%FBT%12%8E%5C%DEy%18%0E%D9%0E%C2%97%CDG%F0u%2B%04%EF%96%7B!%D6V%25E%5B%8E%15%FF%26%F8%1B%F3%D7%AA%CD%2BC%E7%E1%FD%FA0%08o%A6%E1%03%F7%102A%0B%DCQ%12%DB%7B%12%60%E6%3AN%98%D9%BE%3A%D8Zp%C1%DB%85%1EHy%0D%10%B3%92%3B%7B%16%60%9E%D0dS%C8T%F9y%A9W%89F%20%B7CT%C5%3E%FC%FF%3B%2F%ED%B2%D6%ED%EC%A2%93%00%00%00%00IEND%AEB%60%82";

var magnifierminus = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02VIDAT8%CB%A5%92%EFkRQ%18%C7%FD%17%82%60%10A%A3%20noz%D1%A8K%3F!%98eM%D3m%EAm9%25M%D9%B2%1F%16%8D%D8%E2%EE%17%99%C3%B1%26%165%9C%8B%1C%CD%1Fd%E5%5E%B4lxusnSA%AF%2F%A2%0D**%0A%BA%D5%AD(6ZD%B7%A7s%E0%16%C5%B5%18%F4%E2%03%87%C3%F3%FD%3E%DF%E79G%06%00%B2%FF%E1%D7%81%0D5%92l%D8%14c%C3f%BE%14%B1%0Al%C8%22%14%86%8D%7Cn%88%8A%CD%5E%AD'%FFi%C0%86%8D%B6R%C4%CC%B1!%13%5B%18%3ED%E7%AFQD%CE%AF'r%83%3A%3A%3BH%B1%D9%01%8A%9B%F2jle%0Dpg%2C.%8E%18%5C%A5%17%0B%1B%10Z%84%03q%1C%A1B%AC%CDx5%AE%8C%B7%9EK%B9%95%92%24%B2b%C8%14%2B%06M%2C*%24%10G%11m%88%B3%88%16%C4i%84%01Q%99%EEW%B3I%B72V%26%C1a%BE%10h%A0QQ%1D%A2U%14%9F%11%C58%85%1DQ%9Dt%D5%D0)%B7%8A%97%18%94%C2%16!%3FD%E1%EE%C7~%EB%FAs%04%9C%A8%09%A7Ht%2B%88T%AFZ%90%8E%104%0BY%9F%8E%10%0B%B1%F0%A4h%D6%2C%DEY%11%D4%FD%0E9%91t)%A5%06%F9%EB%06%3E%3B%A0%C5%23(D%A1%FD%7Bk%0B%7Cs%9C%80%AFG%2C%B0%A4%D5%C3%A2%5C%01%9F6o%83%0F%EB7%82%C4%60%D6%A7G%EF%AC%C3K%ACD%E8%116%2C%FE%92%9B%80%A5%C98%7C%BEw%07%16%A3%23%B0%10%F0%C3%BBU%EB%A4%06%99K%B5%E4%F4%15%1D%97%F6%A8%F13%AEA%EC.%D7%19%8B%DF%AEX%0D%A3%8E%1D%0D%92%8F4%D9w%C06%E5%D1p%A9%5E%15%CB8%F7%D1%E3%9D%7B%88x%BB%9C%88%9F%AB%A6%D3%7Du%C2%DC%DD6xY%F0%C1%D3%E9%8B%C0%9CW%C3%AD%E6%AD%15%92%AF%CC%5C%D8O%22b%8CK%C9%E3e1%CE%1A!%DE%B1%F7c%A2%5B%09%8F'z%E0%F5%C3%1B%F0f%3E%08%8F%12%5D%10%B5%EE%14%22%96-%15%7F%18%FC%8D%D1S%BB%8C%E9%FE%83%F0l%C6%03%DC%83%00%3C%CF%5E%86%BC%DF%0C%3D%0A%E2%C9%B2%0C0%B7%ED%DB%8D%8C%B3%16%E6%C7%DAan%AC%132%5E%3DD%9B%C8%F7%CB6%C0%DC%B4%91%C6%60c%15%8Cw)%D0%08%E4%AB%A0i%D3J%7C%FF%03%91r%BF%A3R%D8%C9%E3%00%00%00%00IEND%AEB%60%82";

//Functions

function Toggle() {

	topstatus = document.getElementById('top');
	toplinksstatus = document.getElementById('topLinks');

	bottomstatus = document.getElementById('footer');

	magnifier = document.getElementById('magnifier');



	if (topstatus.style.display == 'none') {

		topstatus.style.display = "";
		toplinksstatus.style.display = "";

		bottomstatus.style.display = "";

		magnifier.src = magnifierminus;

	}

	else {

		topstatus.style.display = "none";
		toplinksstatus.style.display = "none";

		bottomstatus.style.display = "none";

		magnifier.src = magnifierplus;

	}

}



topstatus = document.getElementById('top');
toplinksstatus = document.getElementById('topLinks');

bottomstatus = document.getElementById('footer');

topstatus.style.display = "none";
toplinksstatus.style.display = "none";

bottomstatus.style.display = "none";

el = document.getElementById("divTabs");



dv = document.createElement("img");

dv.addEventListener("click", Toggle, true);

dv.style.cursor = "pointer";

dv.style.textDecoration = "none";

dv.style.paddingLeft = "2px";

dv.style.paddingTop = "8px";

dv.style.position = "absolute";

dv.style.right = "2px;";

dv.id = "magnifier";

dv.src = magnifierplus;



el.appendChild(dv);

})();
