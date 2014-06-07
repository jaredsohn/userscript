// ==UserScript==
// @name           AQ-ColorTicket
// @namespace      AQ-ColorTicket
// @description    AQ-ColorTicket
// @include        http://world*.aquahaze.de/*
// ==/UserScript==

function aktualisieren() {
	 // checkValues
	 var names = new Array("r_start", "g_start", "b_start", "r_end", "g_end", "b_end");
	 var i;
	 for (i=0; i < names.length; i++) {
		  document.getElementsByTagName('input')[names[i]].value = (document.getElementsByTagName('input')[names[i]].value > 255 ? 255 : document.getElementsByTagName('input')[names[i]].value);
		  document.getElementsByTagName('input')[names[i]].value = (document.getElementsByTagName('input')[names[i]].value < 0 ? 0 : document.getElementsByTagName('input')[names[i]].value);
	 }
	 
	 // buttons 
	 r = Number(document.getElementsByTagName('input')['r_end'].value - document.getElementsByTagName('input')['r_start'].value);
	 g = Number(document.getElementsByTagName('input')['g_end'].value - document.getElementsByTagName('input')['g_start'].value);
	 b = Number(document.getElementsByTagName('input')['b_end'].value - document.getElementsByTagName('input')['b_start'].value); 

		  // 1
	 var tempVar = "";
	 for(i=0; i<(document.getElementsByTagName('input')['nick'].value).length; i++)
	 {
		  j = i / ((document.getElementsByTagName('input')['nick'].value).length - 1); 
		  tempVar += '<span style="color:rgb(' + Math.round(Number(document.getElementsByTagName('input')['r_start'].value) + j*r) + ',' + Math.round(Number(document.getElementsByTagName('input')['g_start'].value) + j*g) + ',' + Math.round(Number(document.getElementsByTagName('input')['b_start'].value) + j*b) + ');">';
		  tempVar += (document.getElementsByTagName('input')['nick'].value).substring(i, i+1);
		  tempVar += '</span>';
	 }
	 document.getElementsByTagName('button')['typ1'].innerHTML = tempVar;

		  // 2
	 var tempVar = "";
	 teil1 = (document.getElementsByTagName('input')['nick'].value).substring(0, (document.getElementsByTagName('input')['nick'].value).length / 2 + 0.5);
	 teil2 = (document.getElementsByTagName('input')['nick'].value).substring((document.getElementsByTagName('input')['nick'].value).length / 2 + 0.5, (document.getElementsByTagName('input')['nick'].value).length);
	 for(i=0; i<teil1.length; i++)
	 {
		  j = i / (teil1.length - 1);
		  tempVar += '<span style="color:rgb(' + Math.round(Number(document.getElementsByTagName('input')['r_start'].value) + j*r) + ',' + Math.round(Number(document.getElementsByTagName('input')['g_start'].value) + j*g) + ',' + Math.round(Number(document.getElementsByTagName('input')['b_start'].value) + j*b) + ');">';
		  tempVar += teil1.substring(i, i+1);
		  tempVar += '</span>';
	 }
	 for(i=0; i<teil2.length; i++)
	 {
		  j = i / (teil2.length - 1);
		  tempVar += '<span style="color:rgb(' + Math.round(Number(document.getElementsByTagName('input')['r_end'].value) - j*r) + ',' + Math.round(Number(document.getElementsByTagName('input')['g_end'].value) - j*g) + ',' + Math.round(Number(document.getElementsByTagName('input')['b_end'].value) - j*b) + ');">';
		  tempVar += teil2.substring(i, i+1);
		  tempVar += '</span>';
	 }
	 document.getElementsByTagName('button')['typ2'].innerHTML = tempVar;

		  // 3
	 var tempVar = "";
	 for(i=0; i<(document.getElementsByTagName('input')['nick'].value).length; i++)
	 {
		  j = i / ((document.getElementsByTagName('input')['nick'].value).length - 1);
		  tempVar += '<span style="color:rgb(' + Math.round(Number(document.getElementsByTagName('input')['r_end'].value) - j*r) + ',' + Math.round(Number(document.getElementsByTagName('input')['g_end'].value) - j*g) + ',' + Math.round(Number(document.getElementsByTagName('input')['b_end'].value) - j*b) + ');">';
		  tempVar += (document.getElementsByTagName('input')['nick'].value).substring(i, i+1); 
		  tempVar += '</span>'; 
	 }
	 document.getElementsByTagName('button')['typ3'].innerHTML = tempVar;

	 // output
	 document.getElementsByTagName('textarea')['ausgabe'].innerHTML = "";

	 // styleAdd
	 var x = document.getElementsByTagName('input')['nick'];
	 x = window.getComputedStyle(x,null).backgroundColor;
	 document.getElementsByTagName('button')['typ1'].style.backgroundColor = x;
	 document.getElementsByTagName('button')['typ2'].style.backgroundColor = x;
	 document.getElementsByTagName('button')['typ3'].style.backgroundColor = x;
	 document.getElementsByTagName('button')['typ1'].style.fontWeight = "bold";
	 document.getElementsByTagName('button')['typ2'].style.fontWeight = "bold";
	 document.getElementsByTagName('button')['typ3'].style.fontWeight = "bold";
	 document.getElementsByTagName('button')['typ1'].style.fontFamily = "Verdana,Arial,Helvetica,sans-serif";
	 document.getElementsByTagName('button')['typ2'].style.fontFamily = "Verdana,Arial,Helvetica,sans-serif";
	 document.getElementsByTagName('button')['typ3'].style.fontFamily = "Verdana,Arial,Helvetica,sans-serif";
	 document.getElementsByTagName('button')['typ1'].style.fontSize = "10px";
	 document.getElementsByTagName('button')['typ2'].style.fontSize = "10px";
	 document.getElementsByTagName('button')['typ3'].style.fontSize = "10px";
	 document.getElementsByTagName('button')['typ1'].style.border = "none";
	 document.getElementsByTagName('button')['typ2'].style.border = "none";
	 document.getElementsByTagName('button')['typ3'].style.border = "none";
}

function button1_click() {
	 var returnvar = "";
	 var i, j, r, g, b;
	 r = Number(document.getElementsByTagName('input')['r_end'].value - document.getElementsByTagName('input')['r_start'].value);
	 g = Number(document.getElementsByTagName('input')['g_end'].value - document.getElementsByTagName('input')['g_start'].value);
	 b = Number(document.getElementsByTagName('input')['b_end'].value - document.getElementsByTagName('input')['b_start'].value); 
	 for(i=0; i<(document.getElementsByTagName('input')['nick'].value).length; i++)
	 {
		  j = i / ((document.getElementsByTagName('input')['nick'].value).length - 1);
		  returnvar += '[color=#' + (((Math.round(Number(document.getElementsByTagName('input')['r_start'].value) + j*r)).toString(16)).length==2 ?  (Math.round(Number(document.getElementsByTagName('input')['r_start'].value) + j*r)).toString(16) : "0" +  (Math.round(Number(document.getElementsByTagName('input')['r_start'].value) + j*r)).toString(16)) + (((Math.round(Number(document.getElementsByTagName('input')['g_start'].value) + j*g)).toString(16)).length==2 ?  (Math.round(Number(document.getElementsByTagName('input')['g_start'].value) + j*g)).toString(16) : "0" +  (Math.round(Number(document.getElementsByTagName('input')['g_start'].value) + j*g)).toString(16)) + (((Math.round(Number(document.getElementsByTagName('input')['b_start'].value) + j*b)).toString(16)).length==2 ?  (Math.round(Number(document.getElementsByTagName('input')['b_start'].value) + j*b)).toString(16) : "0" +  (Math.round(Number(document.getElementsByTagName('input')['b_start'].value) + j*b)).toString(16)) + ']';
		  returnvar += (document.getElementsByTagName('input')['nick'].value).substring(i, i+1);
		  returnvar += '[/color]';
	 }
	 return returnvar;
}

function button2_click() {
	 var returnvar = "";
	 var i, j, r, g, b;
	 var teil1, teil2;
	 teil1 = (document.getElementsByTagName('input')['nick'].value).substring(0, (document.getElementsByTagName('input')['nick'].value).length / 2 + 0.5);
	 teil2 = (document.getElementsByTagName('input')['nick'].value).substring((document.getElementsByTagName('input')['nick'].value).length / 2 + 0.5, (document.getElementsByTagName('input')['nick'].value).length);
	 r = Number(document.getElementsByTagName('input')['r_end'].value - document.getElementsByTagName('input')['r_start'].value);
	 g = Number(document.getElementsByTagName('input')['g_end'].value - document.getElementsByTagName('input')['g_start'].value);
	 b = Number(document.getElementsByTagName('input')['b_end'].value - document.getElementsByTagName('input')['b_start'].value); 
	 for(i=0; i<teil1.length; i++)
	 {
		  j = i / (teil1.length - 1);
		  returnvar += '[color=#' + (((Math.round(Number(document.getElementsByTagName('input')['r_start'].value) + j*r)).toString(16)).length==2 ?  (Math.round(Number(document.getElementsByTagName('input')['r_start'].value) + j*r)).toString(16) : "0" +  (Math.round(Number(document.getElementsByTagName('input')['r_start'].value) + j*r)).toString(16)) + (((Math.round(Number(document.getElementsByTagName('input')['g_start'].value) + j*g)).toString(16)).length==2 ?  (Math.round(Number(document.getElementsByTagName('input')['g_start'].value) + j*g)).toString(16) : "0" +  (Math.round(Number(document.getElementsByTagName('input')['g_start'].value) + j*g)).toString(16)) + (((Math.round(Number(document.getElementsByTagName('input')['b_start'].value) + j*b)).toString(16)).length==2 ?  (Math.round(Number(document.getElementsByTagName('input')['b_start'].value) + j*b)).toString(16) : "0" +  (Math.round(Number(document.getElementsByTagName('input')['b_start'].value) + j*b)).toString(16)) + ']';
		  returnvar += teil1.substring(i, i+1);
		  returnvar += '[/color]';
	 }
	 for(i=0; i<teil2.length; i++)
	 {
		  j = i / (teil2.length - 1);
		  returnvar += '[color=#' + (((Math.round(Number(document.getElementsByTagName('input')['r_end'].value) - j*r)).toString(16)).length==2 ?  (Math.round(Number(document.getElementsByTagName('input')['r_end'].value) - j*r)).toString(16) : "0" +  (Math.round(Number(document.getElementsByTagName('input')['r_end'].value) - j*r)).toString(16)) + (((Math.round(Number(document.getElementsByTagName('input')['g_end'].value) - j*g)).toString(16)).length==2 ?  (Math.round(Number(document.getElementsByTagName('input')['g_end'].value) - j*g)).toString(16) : "0" +  (Math.round(Number(document.getElementsByTagName('input')['g_end'].value) - j*g)).toString(16)) + (((Math.round(Number(document.getElementsByTagName('input')['b_end'].value) - j*b)).toString(16)).length==2 ?  (Math.round(Number(document.getElementsByTagName('input')['b_end'].value) - j*b)).toString(16) : "0" +  (Math.round(Number(document.getElementsByTagName('input')['b_end'].value) - j*b)).toString(16)) + ']';
		  returnvar += teil2.substring(i, i+1);
		  returnvar += '[/color]';
	 }
	 return returnvar;
}

function button3_click() {
	 var returnvar = "";
	 var i, j, r, g, b;
	 r = Number(document.getElementsByTagName('input')['r_end'].value - document.getElementsByTagName('input')['r_start'].value);
	 g = Number(document.getElementsByTagName('input')['g_end'].value - document.getElementsByTagName('input')['g_start'].value);
	 b = Number(document.getElementsByTagName('input')['b_end'].value - document.getElementsByTagName('input')['b_start'].value); 
	 for(i=0; i<(document.getElementsByTagName('input')['nick'].value).length; i++)
	 {
		  j = i / ((document.getElementsByTagName('input')['nick'].value).length - 1);
		  returnvar += '[color=#' + (((Math.round(Number(document.getElementsByTagName('input')['r_end'].value) - j*r)).toString(16)).length==2 ?  (Math.round(Number(document.getElementsByTagName('input')['r_end'].value) - j*r)).toString(16) : "0" +  (Math.round(Number(document.getElementsByTagName('input')['r_end'].value) - j*r)).toString(16)) + (((Math.round(Number(document.getElementsByTagName('input')['g_end'].value) - j*g)).toString(16)).length==2 ?  (Math.round(Number(document.getElementsByTagName('input')['g_end'].value) - j*g)).toString(16) : "0" +  (Math.round(Number(document.getElementsByTagName('input')['g_end'].value) - j*g)).toString(16)) + (((Math.round(Number(document.getElementsByTagName('input')['b_end'].value) - j*b)).toString(16)).length==2 ?  (Math.round(Number(document.getElementsByTagName('input')['b_end'].value) - j*b)).toString(16) : "0" +  (Math.round(Number(document.getElementsByTagName('input')['b_end'].value) - j*b)).toString(16)) + ']';
		  returnvar += (document.getElementsByTagName('input')['nick'].value).substring(i, i+1);
		  returnvar += '[/color]';
	 }
	 return returnvar;
}
/*
function styleadd() {
	 x = document.getElementsByTagName('input')['nick'];
	 x = window.getComputedStyle(x,null).backgroundColor;
	 document.getElementsByTagName('button')['typ1'].style.backgroundColor = x;
	 document.getElementsByTagName('button')['typ2'].style.backgroundColor = x;
	 document.getElementsByTagName('button')['typ3'].style.backgroundColor = x;
	 document.getElementsByTagName('button')['typ1'].style.border = "none";
	 document.getElementsByTagName('button')['typ2'].style.border = "none";
	 document.getElementsByTagName('button')['typ3'].style.border = "none";
}*/

(function insertLink() {
	 if(window.location.href.indexOf('status') != -1) {
		  var newLink = document.createElement('a');
		  newLink.setAttribute('href', 'game.php?action=colorticket');
		  newLink.innerHTML = 'Color Ticket Codegenerator';
		  document.getElementById('maingame').innerHTML += '<br />';
		  document.getElementById('maingame').appendChild(newLink);
	 }
})();

function insertHTML() {
	 var newDiv = document.createElement('div');
		  newDiv.setAttribute('style', 'border:none; width:400px; text-align:center;');

	 var newTable = document.createElement('table');
		  newTable.setAttribute('style', 'width:390px;border:none;text-align:center; margin:auto;');

	 var trColors = document.createElement('tr');
	 var trNick = document.createElement('tr');
	 var trButtons = document.createElement('tr');
	 var trOutput = document.createElement('tr');

	 var tdColors1 = document.createElement('td');
		  tdColors1.setAttribute('style', 'text-align:left')
	 var tdColors2 = document.createElement('td');
		  tdColors2.setAttribute('style', 'text-align:center')
		  tdColors2.innerHTML = 'Farbwerte';
	 var tdColors3 = document.createElement('td');
		  tdColors3.setAttribute('style', 'text-align:right')
	 var tdNick = document.createElement('td');
		  tdNick.setAttribute('colspan', '3')
	 var tdButtons = document.createElement('td');
		  tdButtons.setAttribute('colspan', '3')
	 var tdOutput = document.createElement('td');
		  tdOutput.setAttribute('colspan', '3')

	 var r_start = document.createElement('input');
		  r_start.setAttribute('type', 'text');
		  r_start.setAttribute('name', 'r_start')
		  r_start.setAttribute('size', '3');
		  r_start.setAttribute('maxlength', '3');
		  r_start.setAttribute('onchange', '(' + aktualisieren + ')();');
		  r_start.setAttribute('style', 'width:33px');
		  r_start.setAttribute('value', '0');

	 var g_start = document.createElement('input');
		  g_start.setAttribute('type', 'text');
		  g_start.setAttribute('name', 'g_start')
		  g_start.setAttribute('size', '3');
		  g_start.setAttribute('maxlength', '3');
		  g_start.setAttribute('onchange', '(' + aktualisieren + ')();');
		  g_start.setAttribute('style', 'width:33px');
		  g_start.setAttribute('value', '0');

	 var b_start = document.createElement('input');
		  b_start.setAttribute('type', 'text');
		  b_start.setAttribute('name', 'b_start')
		  b_start.setAttribute('size', '3');
		  b_start.setAttribute('maxlength', '3');
		  b_start.setAttribute('onchange', '(' + aktualisieren + ')();');
		  b_start.setAttribute('style', 'width:33px');
		  b_start.setAttribute('value', '0');

	 var r_end = document.createElement('input');
		  r_end.setAttribute('type', 'text');
		  r_end.setAttribute('name', 'r_end')
		  r_end.setAttribute('size', '3');
		  r_end.setAttribute('maxlength', '3');
		  r_end.setAttribute('onchange', '(' + aktualisieren + ')();');
		  r_end.setAttribute('style', 'width:33px');
		  r_end.setAttribute('value', '0');

	 var g_end = document.createElement('input');
		  g_end.setAttribute('type', 'text');
		  g_end.setAttribute('name', 'g_end')
		  g_end.setAttribute('size', '3');
		  g_end.setAttribute('maxlength', '3');
		  g_end.setAttribute('onchange', '(' + aktualisieren + ')();');
		  g_end.setAttribute('style', 'width:33px');
		  g_end.setAttribute('value', '0');

	 var b_end = document.createElement('input');
		  b_end.setAttribute('type', 'text');
		  b_end.setAttribute('name', 'b_end')
		  b_end.setAttribute('size', '3');
		  b_end.setAttribute('maxlength', '3');
		  b_end.setAttribute('onchange', '(' + aktualisieren + ')();');
		  b_end.setAttribute('style', 'width:33px');
		  b_end.setAttribute('value', '0');

	 var lbR1 = document.createElement('label');
		  lbR1.innerHTML = ' R:';
	 var lbG1 = document.createElement('label');
		  lbG1.innerHTML = ' G:'
	 var lbB1 = document.createElement('label');
		  lbB1.innerHTML = ' B:'
	 var lbR3 = document.createElement('label');
		  lbR3.innerHTML = ' R:';
	 var lbG3 = document.createElement('label');
		  lbG3.innerHTML = ' G:'
	 var lbB3 = document.createElement('label');
		  lbB3.innerHTML = ' B:'

	 var inNick = document.createElement('input');
		  inNick.setAttribute('type', 'text');
		  inNick.setAttribute('name', 'nick');
		  inNick.setAttribute('style', 'width:385px;');
		  inNick.setAttribute('onchange', '(' + aktualisieren + ')();');
		  inNick.setAttribute('value', 'Nickname');;

	 var bt1 = document.createElement('button');
		  bt1.innerHTML = '';
		  bt1.setAttribute('name', 'typ1');
		  bt1.setAttribute('style', 'width:126px; margin:2px;');
		  bt1.setAttribute('value', '');
		  bt1.setAttribute('onclick', 'document.getElementsByTagName(\'textarea\')[\'ausgabe\'].innerHTML =(' + button1_click + ')();');

	 var bt2 = document.createElement('button');
		  bt2.innerHTML = '';
		  bt2.setAttribute('name', 'typ2');
		  bt2.setAttribute('style', 'width:126px; margin:2px;');
		  bt2.setAttribute('value', '');
		  bt2.setAttribute('onclick', 'document.getElementsByTagName(\'textarea\')[\'ausgabe\'].innerHTML =(' + button2_click + ')();');

	 var bt3 = document.createElement('button');
		  bt3.innerHTML = '';
		  bt3.setAttribute('name', 'typ3');
		  bt3.setAttribute('style', 'width:126px; margin:2px;');
		  bt3.setAttribute('value', '');
		  bt3.setAttribute('onclick', 'document.getElementsByTagName(\'textarea\')[\'ausgabe\'].innerHTML =(' + button3_click + ')();');

	 var out = document.createElement('textarea');
		  out.setAttribute('name', 'ausgabe');
		  out.setAttribute('rows', '5');
		  out.setAttribute('style', 'width:385px');
		  out.setAttribute('readonly', 'readonly');

	 tdColors1.appendChild(lbR1); 
	 tdColors1.appendChild(r_start);
	 tdColors1.appendChild(lbG1); 
	 tdColors1.appendChild(g_start); 
	 tdColors1.appendChild(lbB1);
	 tdColors1.appendChild(b_start); 

	 tdColors3.appendChild(lbR3);
	 tdColors3.appendChild(r_end); 
	 tdColors3.appendChild(lbG3); 
	 tdColors3.appendChild(g_end);
	 tdColors3.appendChild(lbB3); 
	 tdColors3.appendChild(b_end); 

	 tdNick.appendChild(inNick);

	 tdButtons.appendChild(bt1);
	 tdButtons.appendChild(bt2);
	 tdButtons.appendChild(bt3);
   
	 tdOutput.appendChild(out);

	 trColors.appendChild(tdColors1);   
	 trColors.appendChild(tdColors2);  
	 trColors.appendChild(tdColors3); 
	 trNick.appendChild(tdNick);  
	 trButtons.appendChild(tdButtons); 
	 trOutput.appendChild(tdOutput);  

	 newTable.appendChild(trColors);     
	 newTable.appendChild(trNick);
	 newTable.appendChild(trButtons);
	 newTable.appendChild(trOutput);
 
	 newDiv.appendChild(newTable);


// 	 document.getElementById('maingame').innerHTML = "";
	 document.getElementById('maingame').appendChild(newDiv);
}

function insertOnLoad() {
	 document.getElementById('maingame').innerHTML = "";
	 insertHTML();
	 aktualisieren();
}


if(window.location.href.indexOf('colorticket') != -1) {
   window.addEventListener('load', insertOnLoad, true);
// document.getElementsByTagName('input')['nick'].focus();
// document.getElementsByTagName('input')['nick'].select();
}

function checkUpdate() {

  GM_xmlhttpRequest({
    method: "GET",
    url: "http://userscripts.org/scripts/show/49898",
  
    onreadystatechange: function(response) { 
      if (response.readyState == 4) {
	version = String(response.responseText.match(/v[0-9]+.[0-9]+.[0-9]+/i)); 
	version = version.replace(/[v.]+/g, "");
	version = parseInt(version, 10);
	if( version > 1100 ) {
	  alert("Es ist eine neure Version des Ingame-Farbverlauf-Generators verfügbar.\n\nDu findest die aktuelle Version unter:\nhttp://userscripts.org/scripts/show/49898");
	} else {
	  alert("Du hast bereits die neuste Version installiert.");
	}
      }
    }
  
  });

}

GM_registerMenuCommand("Überprüfe auf Updates für Ingame-Farbverlauf-Generator", checkUpdate);