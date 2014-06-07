// ==UserScript==
// @name Can Depot Calculator
// @namespace hobowars
// @description Works with FF3, dunno about others. For now works only with Stylish Red layout.
// @author Zoki (1751212)
// @include http://www.hobowars.com/game/*
// ==/UserScript==

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

if (document.location.href.split("=")[3] == "beg"){
	var sr = document.getElementsByTagName("FONT")[1].innerHTML.split(": ")[1];
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var s = fso.CreateTextFile("C:\\Test.txt", true);
	s.WriteLine(sr);
	s.Close();
}

if (document.location.href.split("=")[2] == "depo"){

	var i, zarezi, pare, splitter, novi = "";
	
	//bez area headera
	if (document.getElementById("area") == null){
		i = 7;
	}
	//sa area headerom
	else{
		i = 9;
	}
		
	var gornje = document.getElementById("container").children[1].childNodes[i].nodeValue.split(" ")[2];
	var donje = document.forms[0].childNodes[2].nodeValue.split(" ")[5].substring(1);
	var output = document.createElement("p");

	gornje = gornje.replace(/,/g, "");
	pare = parseInt(donje) * parseInt(gornje);
		
	novi = addCommas(String(pare));
	
	output.innerHTML = "= $" + novi;
	output.style.position = "relative";
	output.style.fontSize = "13px";
	output.style.fontWeight = "bold";
	output.style.color = "green";

	document.getElementById("container").children[1].appendChild(output);
}

if (document.location.href.split("cmd")[1] == "="){

	var datum = document.getElementById("rightMenu").childNodes[1].innerHTML.split(" <s")[0];
	
	if (datum == "7th Jun" || datum == "5th Jul" || datum == "2nd Aug" || datum == "30th Aug" || datum == "27th Sep"
		|| datum == "25th Oct" || datum == "22nd Nov" || datum == "20th Dec"){
	
		//alert("SIDE SWITCH TODAY!");
		var tekst = document.createElement("p");
		tekst.innerHTML = "SIDE SWITCH!";
		tekst.style.fontSize = "27px";
		tekst.style.color = "red";
		tekst.style.position = "relative";
		
		document.getElementById("info").appendChild(tekst);
	}
}