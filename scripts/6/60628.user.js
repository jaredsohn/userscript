// ==UserScript==
// @name          nar_add_color
// @namespace     http://d.hatena.ne.jp/arikui/
// @include       http://www2.keiba.go.jp/keibaWeb/PageFlows/HorseMarkInfo/HorseMarkInfoController.jpf?k_lineageLoginNo=*
// ==/UserScript==

(function(){

var ranks = {};
var max_lead = 0;

var dbtbl = $c("dbtbl", "td")[0];
var dbtbl_rows = dbtbl.getElementsByTagName("tr");

var all_race_num = dbtbl_rows.length - 2;

for(var i = 2; i < dbtbl_rows.length; i++){
	var tds = dbtbl_rows[i].getElementsByTagName("td");
	var elm = tds[12];
	var rank = elm.childNodes[1].textContent;

	if( isNaN(parseInt(rank)) ){
		all_race_num--;
		continue;
	}

	switch(rank){
		case "1":
			elm.style.backgroundColor = "#fcc";
			(ranks["1"])? ranks["1"]++ : ranks["1"] = 1;
			var lead = parseFloat(tds[14].textContent)
			if(lead > max_lead)
				max_lead = lead;
			break;
		case "2":
			elm.style.backgroundColor = "#ccf";
			(ranks["2"])? ranks["2"]++ : ranks["2"] = 1;
			break;
		case "3":
			elm.style.backgroundColor = "#cfc";
			(ranks["3"])? ranks["3"]++ : ranks["3"] = 1;
			break;
	}
}

try{
	console.log([
		Math.round(  ranks["1"]                        * 1000 / all_race_num) / 10,
		Math.round( (ranks["1"]+ranks["2"]           ) * 1000 / all_race_num) / 10,
		Math.round( (ranks["1"]+ranks["2"]+ranks["3"]) * 1000 / all_race_num) / 10,
		max_lead,
		(new Date() - Date.parse(dbtbl_rows[i-1].getElementsByTagName("td")[0].textContent)) / (1000 * 60 * 60 * 24 * 7)
	].join("\n"))
}
catch(e){}


function $c(className, tagName, parent){
	var cs = [];
	tagName = tagName || "*";
	parent = parent || document;

	var tags = parent.getElementsByTagName(tagName);
	for(var i = 0; i < tags.length; i++)
		if(tags[i].getAttribute("class") == className)
			cs.push(tags[i]);

	return cs;
}
})()
