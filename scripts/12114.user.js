// ==UserScript==
// @name           LandGrab foes and buddies marking
// @namespace      landgrab_mark_users
// @description    Marks Foes and Buddies on Home page
// @include        http://www.landgrab.net/landgrab/Home*
// @include        http://landgrab.net/landgrab/Home*
// @include        http://www.landgrab.net/landgrab/Foes*
// @include        http://landgrab.net/landgrab/Foes*
// @include        http://www.landgrab.net/landgrab/Buddies*
// @include        http://landgrab.net/landgrab/Buddies*
// ==/UserScript==

var Ext = /Foes/;
var ExtB = /Buddies/;
if(Ext.test(window.location.href)){
	var sIn = '';
	var oEl = document.getElementById('my_foes_sbox');
	for(var i=oEl.childNodes.length-1;i>0;i--){
		var oOp = oEl.childNodes[i];
		if(oOp.hasAttribute){
			if(oOp.hasAttribute("value"))
				sIn += oOp.value + "|";
		}
	}
	GM_setValue("FoeList", sIn);
}else if(ExtB.test(window.location.href)){
	var sIn = '';
	var oEl = document.getElementById('my_buddies_sbox');
	for(var i=oEl.childNodes.length-1;i>0;i--){
		var oOp = oEl.childNodes[i];
		if(oOp.hasAttribute){
			if(oOp.hasAttribute("value"))
				sIn += oOp.value + "|";
		}
	}
	GM_setValue("BuddyList", sIn);
}else{
	if(GM_getValue("FoeList", false) !== false || GM_getValue("BuddyList", false) !== false ){
		var aFoes = GM_getValue("FoeList", '').split("|");
		var aBuddies = GM_getValue("BuddyList", '').split("|");
		var aAs = document.getElementsByTagName("a");
		for(var i = aAs.length-1;i>=0;i--){
			var ext = /http:\/\/landgrab.net\/landgrab\/ViewStats\?u=(\d*)/;
			if(ar = ext.exec(aAs[i].href)){
				if(aFoes.length > 0 && IsFoe(aFoes, ar[1])){
					aAs[i].style.color = 'black';
					aAs[i].parentNode.insertBefore(ReturnSkull(), aAs[i]);
				}else if(aBuddies.length > 0 && IsBuddy(aBuddies, ar[1])){
					aAs[i].style.color = 'red';
					aAs[i].parentNode.insertBefore(ReturnHeart(), aAs[i]);
				}
			}
		}
	}
}

function IsFoe(aFoes, str){
	for(var i=aFoes.length;i>=0;i--){
		if(aFoes[i] == str)
			return(true);
	}
	return(false);
}

function IsBuddy(aBuddies, str){
	for(var i=aBuddies.length;i>=0;i--){
		if(aBuddies[i] == str)
			return(true);
	}
	return(false);
}

function ReturnSkull(){
	var oA = document.createElement("a");
	oA.href = "http://landgrab.net/landgrab/Foes";
	oA.style.verticalAlign = 'middle';
	var oSkull = document.createElement("img");
	oSkull.style.marginRight = '5px';
	oSkull.style.border = 'none';
	oSkull.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%14%08%06%00%00%00%8D%89%1D%0D%00%00%00%04gAMA%00%00%D6%D8%D4OX2%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%06bIDATx%DA%00Q%00%AE%FF%01%C1%AEy%00%05%07%06%40%04%07%07%5B%12%17%13%C1%93%99%B6%A4%91%94%B1%00%01%00%00-56-K%3D%3D28%1C%1C%12%18%F9%F9%F7%FD%DF%DF%E3%E8%CD%CD%DA%CE%D0%D0%DF%BA%FC%FC%FC%CDD%3F%2B%FE%86yS9%FC%FB%FFQ%08%11%0C%1E%F8%EF%F1%7F%02%00Q%00%AE%FF%04%00%FD%FA%01%F9%F4%FD%86%FF%FE%019%EC%DE%DEY%D6%CD%D5%D1%23%24%1F6%82%81i%7BDD9!%0D%0D%07%00%FF%FF%FF%00%01%01%04%00%F9%F9%F0%00%EB%EB%E6R%CA%CA%D2l%92%90%B0%9C%E3%E4%ED%BA%D3%C6%DB%B0%0A%04%06%12%1F4!%00%FA%F2%ED%CF%02%00Q%00%AE%FF%03bYBv%E1%CD%DE_%11%1B%11%01%E3%E9%ED%05%E3%E9%F7-%87%8Bp%6088%24%17%0D%0D)%00%05%05%1B%00%04%04%18%00%FE%FE%03%00%F6%F6%F2%00%FD%FD%F6%00%1F%1F%11%0C8%2C%13%3E%DE%D4%E3%3A%EB%FD%00%1C%FC%EF%F4%01%F1%DC%E6%00%0D%12%08%E9%02%00Q%00%AE%FF%03%40%22%1F%91%E4%D2%E4%1B%00%01%FD%00%D1%E6%F4%01%5BcV%1F%22!%0F%07%FC%FC%08%00%11%11%2F%00%02%02%08%00%FC%FC%F4%00%F1%F1%DB%00%F6%F6%EA%00%01%01%03%00%FD%00%02%00%FD%F2%E8%00%FD%E2%F4%14%AA%BC%D3%01%03%FD%FD%00%2F1%23%00%09%0F%11%BC%02%00Q%00%AE%FF%04%F0%E4%E7%BE%10%17%09%EC%A6%B0%C7%AC%1C2-i''%1C2%EF%EF%E5%00%FD%FC%EC%00%01%01%C1%00%FA%FA%F2%00%F4%F4%E4%00%02%01%04%00%FD%FF%FB%00%06%06%0B%00%F4%F2%E6%00%EB%D7%E5%00%D8%D9%ED%00%00%F6%FD%E2%DC%ED%EF%90%00%07%F9%EA%FA%EF%EA%B5%02%00Q%00%AE%FF%02%12%13%0A%7B%D0%E0%E9H%B6%D2%E0%9C%08%0B%FE%EC%F3%EA%D9%00%F1%EC%E2%00%F9%F8%F0%00%05%07%05%00%0A%0C%12%00%05%06%0B%00%02%04%04%00%10%11%1E%00%07%09%08%00%FC%F2%F0%00%EA%DF%F1%00%D9%E3%EE%00%1B%0E%0D%E0%D0%DA%E9%93%9C%AB%CA%A5%E1%E5%EE%F0%02%00Q%00%AE%FF%04%DA%E6%EE%FB%AD%CB%D9%00%00%00%00%0F%FF%FE%F8%07%EC%D8%D8%00%01%11%08%00%FB%F6%F9%00%CC%CC%AF%00%0E%0B%0B%00%0F'%13%00%09%0A%11%00%E2%C9%DC%00%DD%D4%D1%00%11%12%FB%00%12%1C%0B%00(%1D%13%00%D7%E5%EE%02%00%00%00%0B%C1%CE%E3%F1%C6%D2%E5%00%02%88%A5m%CDq%86%BF%FF%FE%81%0C%FC%F6%EA%F9%FBW%8C%40%97%EC%DBt%89a%DB%DE%5B%0C%D7o%BD%600V%14g%C8%8D%B2f%F8%F0%9B%81%A1m%C6v%86%5B%AF%3F2H%09%F11%D8%18%CA20%FDgd%F8%F8%F3%E7K%90%5E%90%01%BF%FF%FCc%00%08%20%16%A8a%60%FE%9D%DB%2F%AE%BFy%F4%96a%C6%92%93%0C%0F%DE%7C%06%0B%1E%06%C6%5E%25%D0P%60%080%5C%07%1A%06R%FD%F0%DD'%86%87%7B%AF2h%8A%8A0%BC%FF%F9%E3%3AH%2F%CC%10%80%00bb%40%02%CF%5E%7C~%C2%CC%CA%CA%10%11h%09J%D8%60%60%AE%2F%CFp%EB%CDW%86%1D%87%CE3%B8%99%A9%C1%D5j*I0%F8z%1A2%BC%FA%FC%F5%1E%B2%19%00%01%C4%82%C4fRW%15%D7%E5%91%14%60%08%8FPe%90%91Qgx%F7%F6%0E%83%AE%A6%08Cy%D7F%86%5B%F7_3%D4'%3A2%18%A9%893%3C%FE%FC%85%C1QW%81%E1%ED%F3%EF%0C%EC%2C%2C%A2%DF%7F%C3%1D%C8%00%10%40(%06%8A%09r%89%FC%7F%F9%89%E1%F9%85%17%0C%02%DFX%18%E4%E5%04%19n%DD%7D%016L%94%9F%8B%E1%D0%D1%DB%0C%82%3C%3C%0C%8E%C0%5Cq%F3%CC%0B%86%C3W%1E1%08pr%08%23%1B%08%10%40%CC%F22%22%0C%9F%BF%7C%07f%2F%86%7F7%1F%BC%BE%CE%CE%C4b%CF%FA%E9%BF%D8%FFo%BF%19dt%80%AEy%F2%96%81%89%95%9F!%26%CC%85%81%17%98%16%DF%BCy%CF%F0%EF%DB%3F%86s%B7_%FE%BD%F7%E9%E3%CEW_%BFM%F8%F7%FF%3F(b%18%14%E4%C4%18%00%02%00Q%00%AE%FF%01%B7%A5t%00%E2%E6%EF%00%E8%EF%F5%00%E8%EC%F2G%F1%E6%EC%A2%F8%F1%F1%16'%19%16%00Wa9%00%F6%F5%FE%00%07%0C%1A%00%E7%DA%DE%00%1A%1C%12%00%BC%AC%C3%00%B9%D3%E3%00%F0%02%FE%F6%CD%D1%DEI%00%00%00%C2%1F%1D%14%00%3E%3A)%00TR%3D%00%02%88%85%8F%97%93%C1%CCH%98%81%95%97%3Bm%F7%9A%E3%3D%AB%F7_%E6%15%15%E7%608%07%8C%5D%85%3D7%18x%80%E9%90W%00%18%E3%C0ty%ED%D2'%86C%97%1F1%7C%04z%E7%D7%DF%7F%5C%A6%06%8A%25Qa6%17L%0C%14%3F%89%8A%080%FC%01%FA%00%20%00%00Q%00%AE%FF%04%00%02%02%15%FA%FE%FE%83%DF%C8%D9g%D1%C1%D6%00%EF%F7%FA%E1D%2B!%0C%0B%04%0C%13%E8%E6%F4%00%E0%EB%E5%00%F7%FC%FD%00%1C%0F%0D%00%CC%D6%E2%00%CA%DC%E5%00%0E%15%0A%00%1E%16%0C%00%25%23%20MB%3F-%B7%03%05%02%8C%FA%FE%FF%BD%FE%01%FE%F2%02%00Q%00%AE%FF%04%F3%EA%F0u%DA%C4%DDg%E1%DA%EA%00%05%04%06%E6%F9%FE%FFr%08%0A%03%88DB!%13%EB%E0%F5%00%0B%CE%EA%00%D1%E3%ED%00%D3%D8%E6%00%F4%F5%F9%00%22%12%11%00%0A%10%04%001'%17%FA%EA%E9%F4%06%D4%BD%D6%3A%FA%F3%F5%AE%0E%19%13%D7%11%1D%16t%02%88%D9%D7L-%84GT%C4XJ%5D%8C%81%8D%81y%ED%8E%E3W%3A%1E%BF%F9%2Cn.%2Fj%C7%05L%03%FF%DE%FDe%E0%E7e%05%E6%A6%BF%0C%CC%DF%19%19%D4%C4%84%194%D5D%7F%EF%3C%FF%A0%D5DUIF%DBPM%98S%90%87%E1%E7%97o%A2_%DE~W%01%08%00Q%00%AE%FF%03G*%1D%DC%01%04%05I%0F%16%0E%12%16%1B%17%A6%DC%DE%E6%C6%CB%D7%E3%CF%E3%E6%F4%123'%183%1A%1A%0A%00%15%10%0B%00%0C%FA%05%00%FE%F7%FF%00%F8%FE%FC%00%B8%D7%DF%97%EA%F2%F6~YD3)%0C%0B%023%15%22%11%00%04%06%03%00%E7%D8%E9%DF%02%00Q%00%AE%FF%04%E8%DC%F1%D8%F7%F3%ECU%04%09%07A%1F*%1E%A0%19%12%10%00%00%00%00%EF%C3%D4%E1w%06%B0%03%FB9%1B%1A%3C%D5%D8%EC%EF%F4%F9%FA%FF%0E%0A%07%06%CC%E6%E7%BA%E1%EE%F0%93%22%18%13%FA%00%FC%00%8B%F1%EA%F3%D5%D9%C4%D9%10%F3%ED%F8%22%F9%F5%FC%A2%02%0C%00%5DE%A2U%BE%A4)0%00%00%00%00IEND%AEB%60%82";
	oA.appendChild(oSkull);
	return(oA);
}
function ReturnHeart(){
	var oA = document.createElement("a");
	oA.href = "http://landgrab.net/landgrab/Buddies";
	oA.style.verticalAlign = 'middle';
	var oHeart = document.createElement("img");
	oHeart.style.marginRight = '5px';
	oHeart.style.border = 'none';
	oHeart.src = "data:image/gif,GIF89a%14%00%14%00%F7%FF%00%81%00%0C%D6%00%14%AF%00%11%B5%00%11x%00%0B%CF%00%13%BE%00%12%BF%00%12%FB%2B%3F%FF%FF%FF%FC%0E%25%E0%00%15%FB%00%18%CB%00%13j%00%0A%E1O%5D%DA%00%15%AC%00%10%F4O%5E%FD%2FC%F2Ud%F9GX%F8%40Q%FE%DE%E1%FC%1D2%C6%00%13%D4%00%14%E8%00%16n%00%0B%7F%00%0Ct%00%0B%E9%00%16%F3%00%17n%00%0A~%00%0C%8A%00%0D%8D%00%0D%87%00%0D%E89I%EF%00%17%B8%00%11%9C%00%0F%86%00%0D%DF%00%15%F4.A%F8%248%FC%12(%B2%00%10%FA%19%2F%EEYg%83%00%0C%DD%16(%F2%DF%E1%FB%1F4%FB%1B0%F6%EA%EB%B1%00%11%E5%00%16%F7K%5B%E8%257%E14D%FD%01%19%9A%00%0Ek%00%0A%C5%00%12%FD%1F4%9E%00%0Fu%00%0B%E2%00%16%92%00%0E%CF%00%14%97%00%0E%DF%06%1B%F2%DC%DE%F0%05%1C%FE%E0%E3%FE%12(%EE%3FP%FF%FD%FE%E3am%E5%02%18%F5FW%F7%09%1F%E9%5Ek%FE%08%1F%FA7I%FC%C0%C6%B7%00%12%A2%04%13%EATb%D2%0C%1F%D0%1A%2B%F2%B5%BB%ED%1F2%C3%00%13%B2JT%E2%19%2C%EC%00%16%F6O_%E5%00%15%FD%DC%DF%FA%EC%ED%F85G%CD%00%13%CDt%7D%BA%00%11%FC%04%1C%FD%05%1D%D4%01%15%DC(9%FD%00%18%84%00%0D%F1%1F2%A3%00%0F%F8%C8%CD%EBXfz%00%0B%C4%00%13%C2%00%12%D9%40No%00%0B%FC%1F4%EF%10%25%DD%00%15%F5%00%17%E7%00%16%DC%00%15%89%00%0D%FACT%B5%1D%2B%BC%10!%FB%12(%C2MX%FE%14*%FE%16%2C%E3%5Bh%CE%0A%1C%E4_l%C6u%7D%FB%2C%40%DA%93%9A%EA%2C%3E%FA%0B%22%FE%0A!%FC%3AM%D34C%DB5E%DEJX%DAUb%DB%5Ch%DF_k%A9%00%10%F1M%5C%FE%01%19%FF%03%1B%E2Ta%E7Sa%CF(8%EB%5Ci%FB(%3C%F5%3AL%E6%40P%E5DS%FC-A%D7KX%EA%00%16%FE%07%1E%DDWd%F91D%ECIY%ECVd%FB%3CN%F6%15*%E2%00%15%D5%19%2B%FA9K%F0JZ%F7%00%17%F5%E7%E8%F0%00%17%A7%0E%1C%FD%D1%D5%FD%D2%D6%C0%00%12%EC3E%F7EV%E1am%FA5G%E6%5Ek%F5O_%FB%04%1C%A5%00%10%C7%7F%86s%00%0B%FB%EC%ED%EFXf%FE%EF%F0%FD.B%FC%3CN%F5%E5%E7%B1%3FJ%BA%00%12%FA%18-%C9%00%13%D1%00%14%FD%04%1C%F1Xf%F1Yg%D5%00%14%F3bp%F0Sb%FC%00%18%F8%B0%B7w%00%0B%A5AK%CA%00%13%F1%269%A0%00%0F%7D%00%0C%FD%227%EA%5Ek%F5Qa%F6Qa%F7O_%FAFW%D7%00%14%F6IY%F7IY%FA%3BM%C5%00%13%C3%00%12%DA%40N%E2%0D!%F8%3EO%F2%00%17%A7%00%10%FC%F8%F8%FC%10%26%FD%10%26%C6%00%12%F8%02%19%EE%10%25%B0%00%10%F6%00%17%F8%00%17%F4%00%17%EE%00%17%E6%00%16%E9KZ%E3%00%16%99%00%0F%8C%00%0D%DE(9%B9%00%11%91%00%0E%00%00%00!%F9%04%01%00%00%FF%00%2C%00%00%00%00%14%00%14%00%00%08%FF%00%FF%09L%F4D%97%A5J%02%FF%C5%A0%D0K%9C%053%09%FF%CD%F1%C4m%0A%AFC%A7(m%CA%22M%C28%0BU%16%D5%18%24%90%82%B3g%C3Tqz%40j%12%3EXQ%D2%EDB%90%C7%85%1A%3E%3A%BEy%EB%26%01S*Qw%CE%85j%02%0A%D5'%0C%ED%9A%D5%DB%00%08%5C%85%0A%B9%C4D3!)%12%0F%5C%2CZ%C0P%D0%03D%0E%08%90%8C%AD%22%F7%CA%8A%93F%FC%3A%B5%D9%01g%C9%05%06'Z%05h0aB%B1Q%08j%25%E8%02f%8B%2B0z.%90%F9%B0%87Y%86%03%DB%B6%05%C1%60C%19%ABx%E8%B4%20BRj%C3%02h%CB%0C%0C%C0a%A8%10%13w%0A%1CIQ%02%85M%06%0D%10%C2%15(%97L%C0%BA_%FF%1EQ1%B5%C6%17%3C%10%F7%02%DC%BAf%A4%81%9D%2B%11%E2%08%11%A8)%93%9Bi%0C%E6%CD%1A%A3%C1%C0%01s%9A%03a%D1w%24!%BDX%C4la%FB%B0%A0%40%BF%17%03%E41%7Bb%87%ACHDu%F6%C2PK%20%E7%C1%3B%01%B4%D0%1C%A3%F1%85%C4%BE%88%FF%FA%E4%5B1%83%8B%B02I%DC%20%0B0%23%94%A0%02~%FF%10%E1G%00%05%00!%08!%8AX%F3%06%00%22%88%00%00%82%FF%04p%86%17(%5C%E2%C3%1Ft%10%E0%C1%10%04%60(P%1DiD%90%02%09%1D%04%13B%08x%98%98%90%00%D9%F8%23C5%1C8%E0%80%8C%F8%8D%A0%8D%07%1C%FC%C0%23%82%1D%94hb%40%00%3B";
	oA.appendChild(oHeart);
	return(oA);
}