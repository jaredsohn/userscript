// ==UserScript==
// @name           TargetFinder
// @namespace      TargetFinder
// @include        http://bots4.net/fight*
// ==/UserScript==
// This will find easy bots to defeat. < 1.0 ratio

function GiveDec(Hex) { if(Hex == "A") { Value = 10; } else if(Hex == "B") { Value = 11; } else if(Hex == "C") { Value = 12; } else if(Hex == "D") { Value = 13; } else if(Hex == "E") { Value = 14; } else if(Hex == "F") { Value = 15; } else { Value = eval(Hex); } return Value; }

function HexToDec(i) { Input = i; if(Input[0] == '#') { Input = Input.substring(1,7); } Input = Input.toUpperCase(); a = GiveDec(Input.substring(0, 1)); b = GiveDec(Input.substring(1, 2)); c = GiveDec(Input.substring(2, 3)); d = GiveDec(Input.substring(3, 4)); e = GiveDec(Input.substring(4, 5)); f = GiveDec(Input.substring(5, 6)); x = (a * 16) + b; y = (c * 16) + d; z = (e * 16) + f; var total = parseInt(x+y+z); return total; }
function findLink(str) {
	str2 = str.split('#');
	str2 = str2[1].split(';');
	color = str2[0];
	
	str2 = str.split('href="');
	str2 = str2[1].split('">');
	href = str2[0];
	
	return [color,href];
}
var rows = document.querySelectorAll('table.tight')[0].rows;
var num_rows = rows.length;
for (var i = 1; i < num_rows; ++i) {
    var cells = rows[i].cells;
	energy = parseInt(cells[6].innerHTML.replace(',',''));
	er = cells[7].innerHTML;
	erCol = cells[6].colSpan;
	if(erCol==1) { 
		var temp = er.split('">x');
		var temp2 = temp[1].split('</');
		ratio = parseInt(temp2[0]*100);
		if(ratio<=100) {
			temp = cells[12].innerHTML.replace(/\s/g, '');
			if(temp.length>=1) {
				str = temp.split('<br');
				
				var link1 = findLink(str[0]);
				var link2 = findLink(str[1]);
				if(HexToDec(link1[0])>HexToDec(link2[0])) {
					window.location = 'http://bots4.net'+link1[1];
				} else {
					window.location = 'http://bots4.net'+link2[1];
				}
				//<a style="color: #671212;" href="/fight/79/13915/9106">Fight</a><br />
				//<a style="color: #ff8d97;" href="/fight/79/13915/18594">Fight</a><br />
 
			}
		}
	}
}