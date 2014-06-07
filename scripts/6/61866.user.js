// ==UserScript==
// @name          netkeiba past race
// @namespace     http://d.hatena.ne.jp/arikui/
// @include       http://race.netkeiba.com/?pid=race&id=*
// @require       http://gist.github.com/3238.txt
// ==/UserScript==

var pastRaceNum = 10;

// set label
var label = $X('//td[@class="race_shutuba"]/..')[0].appendChild(document.createElement("td"));

label.setAttribute("rowspan", "2");
label.setAttribute("colspan", pastRaceNum);
label.setAttribute("class",   "race_shutuba");
label.innerHTML = "\u904E\u53BB";

// request
var signs = $X('//table[@class="border2"][1]/tbody[1]/tr[2]/td[@class="race_shutuba"]').length;

$X('//tr[@class="bml1"]').forEach(function(horse, i, self){
	var url = horse.getElementsByTagName("td")[signs+2].getElementsByTagName("a")[0].href;
	GM_xmlhttpRequest({method : "GET", url : url, onload : getData(signs, self)});
});

function getData(signs, tr){
	return function(details){
		var lines = details.responseText.split("\n");
		var mutchLines = [];
		var horseId;

		for(j=0; j < lines.length; j++){
			if( lines[j].match(/horse\/pic\/\d{10}/) )
				horseId = lines[j].substr(20, 10);

			if( lines[j].match(/>\d{4}\/\d{2}\/\d{2}</) ){
				mutchLines.push(j);

				if(mutchLines.length == pastRaceNum)
					break;
			}
		}

		var td, m;

		for(var j = 0; j < tr.length; j++){
			td = tr[j].getElementsByTagName("td");
			m  = /horse\/(\d{10})/.exec(td[signs+2].getElementsByTagName("a")[0].href);

			if(m && horseId == m[1]){
				for(k = 0; k < mutchLines.length; k++)
					tr[j].innerHTML += lines[mutchLines[k]+13];
				break;
			}
		}
	};
}

document.styleSheets[0].insertRule( ".r1ml{background-color:#FFF080}", document.styleSheets[0].cssRules.length );
document.styleSheets[0].insertRule( ".r2ml{background-color:#CCDFFF}", document.styleSheets[0].cssRules.length );
document.styleSheets[0].insertRule( ".r3ml{background-color:#F0C8A0}", document.styleSheets[0].cssRules.length );
