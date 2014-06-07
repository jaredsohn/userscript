// ==UserScript==
	// @name Anoma Dater
	// @description Приводит дату на Аноме к привычному виду
	// @include http://anoma.ch/*
	// ==/UserScript==
	
var arr = new Object();
arr={"01":'Янв',"02":'Фев',"03":'Мар',"04":'Апр',"05":'Май',"06":'Июнь',"07":'Июль',"08":'Авг',"09":'Сент',"10":'Окт',"11":'Ноя',"12":'Дек'};
var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
re=/([0-9]{4})\-([0-9]{2})\-([0-9]{2})( [0-9]{2}:[0-9]{2}:[0-9]{2})/;
	for (var i = 0; i < textnodes.snapshotLength; i++) { 
	node = textnodes.snapshotItem(i); 
	if (node.data.match(re)) {
	var tmp=re.exec(node.data);
	node.data=tmp[3]+" "+arr[tmp[2]]+" "+tmp[1]+" "+tmp[4];
	}
	}
	
	