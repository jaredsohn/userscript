// ==UserScript==
// @name           Soulcalibur IV - Movelist
// @namespace      W4kk0
// @description    zeigt Icons statt text
// @include        http://cloonix.ath.cx/sc4/index.php
// ==/UserScript==

var btns = new Array(4);
btns[0] = 'data:image/gif,' +
		'GIF89a%0B%00%0B%00%E6%00%00%00%00%00%FF%FF%FFSvMSkOC%D6%278%B4%210%9A%1C%26y%16%' +
		'24s%15%23o%14O%FD%2FK%EE%2CI%EA%2BI%E9%2BD%D8%28C%D4%27%3B%BD%239%B6%228%B1%216%' +
		'AD%201%9D%1D1%9C%1D%2F%97%1C%28%81%18%27%7B%17I%E7%2CS%FC3V%FB6%3D%B2%27%2B%7E%1' +
		'CP%E64P%E53%3F%B8%29F%C6.W%EF%3AY%EE%3C0%81%212%82%231%80%22Q%D19P%D095%89%263%7' +
		'E%259%7E%2Cb%C6Oe%CBRR%A2BP%9EBn%CF%5B%5D%ACNe%B4Vb%AES%89%F1uf%B2X%8D%EFzh%AE%5' +
		'B%7E%CBo%84%D1v%80%C9rS%82J%89%CF%7C%A6%F9%96%AB%F8%9D%94%D4%88%97%D6%8B%A8%E0%9' +
		'D%C0%F0%B7%C3%F2%BA%D3%F5%CD%DB%FB%D5%D7%F6%D1%E0%FB%DB%E1%FB%DCV_TT_QTTT%FF%FF%' +
		'FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00' +
		'%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0' +
		'0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%' +
		'00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00' +
		'%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0' +
		'0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%21%F9%04%01%00%00L' +
		'%00%2C%00%00%00%00%0B%00%0B%00%00%07c%80L%82%82%25%2A%83%873%3FA%405%87L%3ADHEGF' +
		'%3C%2B%821B%3E7I0%3DC2%8286%1B%27K%3B%1A49%26%24%2C%23%0A%3B%27%3B%28%22-%29L%1C' +
		'%19%1F%03%3B%02.%0C%20%1DL%16%0F%2FJ%1E.J%21%14%83%13%04%0D%0B%0C%0E%12%08%83%09' +
		'%06%05%10%11%15%D5%8E%07%17%18%87%81%00%3B';
btns[1] = 'data:image/gif,' +
		'GIF89a%0B%00%0B%00%E6%00%00%00%00%00%FF%FF%FF_RQ%B4%28%21%9A%22%1Cy%1B%16%B2.%27' +
		'%EEE%3C%80%27%22%7E0%2C%ACSN%AEXS%EF%80z%D1%7Bv%82MJ%81NKvNL%E2%97%93vUS%F2%BD%B' +
		'A%F5%CF%CD%F6%D3%D1%FB%DD%DB%FB7.%D6%2F%27s%19%15o%18%14%FD8%2F%EE4%2C%EA3%2B%E9' +
		'3%2B%D8%2F%28%D4%2F%27%BD%2A%23%B6%28%22%B1%27%21%AD%26%20%9D%22%1D%9C%22%1D%97%' +
		'21%1C%81%1C%18%7B%1B%17%E74%2C%FB%3F6%7E%1F%1C%DD92%B8%2F%29%EFB%3A%81%25%21%82%' +
		'27%23%D1%3F9%89%2A%26%7E%28%25%C6TO%CBWR%A3GC%9FFB%B4ZV%F1zu%B2%5BX%CBso%C9vr%81' +
		'LJ%CF%7F%7C%D4%8B%88%D6%8E%8BvNM%E0%A0%9D%A1usvWV%F0%B9%B7%FB%D6%D5%FB%DD%DC_UU%' +
		'FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00' +
		'%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0' +
		'0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%' +
		'00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00' +
		'%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0' +
		'0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%' +
		'00%00%21%F9%04%01%00%00J%00%2C%00%00%00%00%0B%00%0B%00%00%07b%80J%82%8214%83%87%' +
		'0B%40CA%3B%87J%3D%14HG%16%15%3F%09%82%0AF%11I%12ED%139%82%3C%0C%2B%0E22%0F%3A%0D' +
		'%0805%07%1B%0EBB7%2F63J%06%2A%17%A62%3E%1D.%2CJ%27%20-%02B%108%1F%25%83%24%18%1E' +
		'%1C%1D%1F%23%19%83%1A%04%03%21%22%26%D4%8E%05%28%29%87%81%00%3B';
btns[2] = 'data:image/gif,' +
		'GIF89a%0B%00%0B%00%E6%00%00%00%00%00%FF%FF%FF%1CR%7E%25V%7EJi%82%7C%AA%CF%9D%C2%' +
		'E0%CD%E3%F5%D5%EA%FB%DC%ED%FB.%A1%FB%27%8A%D6%21t%B4%1Cc%9A%16Ny%15Js%14Go%2F%A4' +
		'%FF%2F%A3%FD%2C%99%EE%2B%96%EA%2B%96%E9%28%8B%D8%27%88%D4%23z%BD%22u%B6%21r%B1%2' +
		'0o%AD%1De%9D%1Dd%9C%1Ca%97%18S%81%17O%7B%2C%95%E76%A5%FB3%98%E6%27u%B24%98%E6%29' +
		'y%B8.%84%C67%99%E6%3A%A0%EF%3C%A0%EE%21W%81%23X%82%22W%809%8F%D1%26%5E%89%2CZ%7E' +
		'Q%A5%E6O%92%C6R%96%CBCy%A4Bx%A2Bv%9EN%83%ACV%8B%B4S%87%AEu%BB%F1X%8B%B2z%BC%EFHo' +
		'%8Do%A3%CBY%82%A2v%A9%D1r%A3%C9%88%B3%D4%8B%B5%D6v%8E%A1O_k%B7%D7%F0%AC%C8%DD%D1' +
		'%E6%F6QY_%DB%ED%FBX%5C_U%5B_%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%' +
		'00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00' +
		'%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0' +
		'0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%' +
		'00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00' +
		'%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0' +
		'0%00%00%21%F9%04%01%00%00M%00%2C%00%00%00%00%0B%00%0B%00%00%07b%80M%82%82%2C%03%' +
		'83%879B%06C%3B%87MA%07%09%08JH%050%827FDL1%3FKG8%82%3E%3C%224%3DE%28%3A%40-%2B2%' +
		'2A%12%11%04.%12%293%2FM%24%21%0A%A6E%23%14%26%02M%1E%176I%255I%27%1C%83%1B%0B%15' +
		'%13%14%16%1A%0F%83%10%0D%0C%18%19%1D%D4%8E%0E%1F%20%87%81%00%3B';
btns[3] = 'data:image/gif,' +
		'GIF89a%0B%00%0B%00%E6%00%00%00%00%00%FF%FF%FF%F5%FC.%F4%FB.%D0%D6%27%AF%B4%21%96' +
		'%9A%1Cps%15lo%14%F8%FF%2F%F6%FD%2F%EB%F2-%E7%EE%2C%E4%EA%2B%E3%E9%2B%D2%D8%28%CE' +
		'%D4%27%B8%BD%23%B1%B6%22%AC%B1%21%A8%AD%20%98%9C%1D%93%97%1C%7D%81%18%E1%E7%2C%F' +
		'4%FB6%E2%E84%D9%DF2%B3%B8%29%E9%EF%3A%E8%EE%3C%7F%82%23%7D%80%22%CC%D19%85%89%26' +
		'%CA%CF%3C%7B%7E%25%7B%7E%2C%E1%E6Q%AA%AE%40%C2%C6O%C7%CBR%A9%ACN%B1%B4V%AB%AES%E' +
		'D%F1u%AF%B2X%C8%CBo%CE%D1v%C6%C9r%80%82J%CC%CF%7CtvL%D3%D6%8B%DD%E0%9D%9F%A1v%EE' +
		'%F0%B7%DB%DD%AC%F3%F5%CD%FA%FB%DCvy%16%99%9D%1Dx%7B%17%AE%B2%27%7B%7E%1C%7E%81%2' +
		'1%A1%A4C%EC%EFz%A0%A2Y%D2%D4%88%FA%FB%D5%F5%F6%D1%FA%FB%DB__R__U__X%FF%FF%FF%00%' +
		'00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00' +
		'%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0' +
		'0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%' +
		'00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00' +
		'%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%0' +
		'0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%21%F9%04%01%00%00L%00%2C' +
		'%00%00%00%00%0B%00%0B%00%00%07b%80L%82%82%1F%24%83%87%2CE65.%87L1%3A%3BFHG3%25%8' +
		'2%2A87J%26DK9%2B%82%2FC%192%212%23-0%20A%28%1E%0A%1AIB%0A%1D%29%22L%3F%18%03%09%' +
		'A6%02%0D%1C%40L%16%10%0B%27I4%1B%0F%3D%83%14%04%0E%0C%0D%0F%13%07%83%08%06%05%11' +
		'%12%15%D4%8E%3C%17%3E%87%81%00%3B';


var keylist = new Array();

keylist[0] = new Object();
keylist[0]["A"] = btns[2];
keylist[0]["B"] = btns[3];
keylist[0]["K"] = btns[1];
keylist[0]["G"] = btns[0];
keylist[0]["a"] = btns[2];
keylist[0]["b"] = btns[3];
keylist[0]["k"] = btns[1];
keylist[0]["g"] = btns[0];
keylist[0]["1"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_up.gif';
keylist[0]["2"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_down.gif';
keylist[0]["3"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_left.gif';
keylist[0]["4"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_right.gif';
keylist[0]["5"] = 'n\/a';
keylist[0]["6"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_upright.gif';
keylist[0]["7"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_downright.gif';
keylist[0]["8"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_upleft.gif';
keylist[0]["9"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_downleft.gif';
keylist[0]["[1]"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_up_b.gif';
keylist[0]["[2]"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_down_b.gif';
keylist[0]["[3]"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_left_b.gif';
keylist[0]["[4]"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_right_b.gif';
keylist[0]["[5]"] = 'n\/a';
keylist[0]["[6]"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_upright_b.gif';
keylist[0]["[7]"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_downright_b.gif';
keylist[0]["[8]"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_upleft_b.gif';
keylist[0]["[9]"] = 'http://media.ignimgs.com/guides/guides/641054/images/vf5_downleft_b.gif';



// Set Element ID's to <TD>	
//
var nr = 1
var newtext = new Array();

var allElems = document.getElementsByTagName('*');
for (var i = 0; i < allElems.length; i++) {
	var thisElem = allElems[i];

	if (thisElem.className && thisElem.className == 'buttons') {
		thisElem.id = thisElem.className;
		var Ausrichtung = document.createAttribute("name");
		Ausrichtung.nodeValue = "buttons";	
		thisElem.setAttribute("name", thisElem.className);
		
		nr++;
			
}
}


var b = document.getElementsByName('buttons');
;var bVal = b[1].childNodes[0].nodeValue;

//generateArray();
doJob();

//generatebtns('move1',2,2);
//addtext('move1', 'text');
//generatebtns('move1',2,2);
//showBtnList();

function doJob(){
	for (w = 0; w < b.length; w++) {
	    addBtnList(b[w],'move' + w);
		generateArray(w);
			var test ='';
			for (i = 0; i < newtext[0].length; i++) {
				
				
			//alert(test);
		if (exist(newtext[0][i])){
			generatebtns('move' + w,newtext[0][i],w);
			//alert('Es klappt');
		} else {
		addtext('move' + w, newtext[0][i]);
		}
		}
	}
}

function generateArray(nmbr){
	var bVal = b[nmbr].childNodes[0].nodeValue;
	newtext[0] = new Array();
	var r = 0;
	var z=0;
	while (r != bVal.length) {
	  var key = bVal.substr(r,1);
	  newtext[0][z] = key;
	  if (key == '['){
		  var tmp = key;
		  while (key != ']') {
			  r++;
			  key = bVal.substr(r,1);
			  tmp = tmp + key;
		  }
		  //alert(tmp);
		  newtext[0][z] = tmp;
	  }
	  if (key == '('){
		  var tmp = key;
		  while (key != ')') {
			  r++;
			  key = bVal.substr(r,1);
			  tmp = tmp + key;
		  }
		  //alert(tmp);
		  newtext[0][z] = tmp;
	  }
	  r++;
	  z++;
      
	}

	}

function addBtnList(obj,IdNr){
		var div = document.createElement('div');
		div.id = IdNr;
		
		obj.appendChild(div);
	}

function addtext(obj, text) {
		var content = document.createTextNode(text);
		document.getElementById(obj).appendChild(content);
	}

function generatebtns (j,b,h){
		
		espan = document.createElement("img");
		espan.setAttribute("id",h);
					
		espan.setAttribute("src", keylist[0][b]);
		
		document.getElementById(j).appendChild(espan);
	}	
//alert(newtext[0][1] +' || '+ bVal +' || '+ b.length);
//--------------------
function showBtnList(){
		var bdiv = document.createElement('div');
		bdiv.setAttribute("id","keylist");
		var texter = '';
		for (var Eigenschaft in keylist[0]){
		  var texter = texter + Eigenschaft +'<br>';
		  bdiv.innerHTML = texter;
		}  
		document.body.appendChild(bdiv);
	}

	function exist(wert){
		for (var lwert in keylist[0]){
		  if (wert == lwert){
			return true;
		}
		}
	}