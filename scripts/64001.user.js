// ==UserScript==
// @name           BasicTrtEPGCrawler
// @namespace      www.trt.net.tr
// @description    Crawling TRT EPG data to post server side.
// @include        http://www.trt.net.tr/TV/TvAkis*
// ==/UserScript==

var flow = document.getElementById("ctl00_tvIcerikAralik").childNodes[1].childNodes[6];
var fDay = document.getElementById("ctl00_tvIcerikAralik").childNodes[1].childNodes[3];
var kanal = document.getElementById("ctl00_tvIcerikAralik").childNodes[1].childNodes[1];
var hour="";
var program="";
var url="";
var channel = 1;
var day = 1;
var data = "";
var j = 0;


function getEPGDate(){
	var now = new Date();
	var topBar = fDay.childNodes[0].childNodes[0].childNodes;
	var msecsInADay = 86400000;
	for(var i=0; i<topBar.length;i++){
		tmp = (topBar[i].getAttribute("class")) ? topBar[i].getAttribute("class") : "secilme";
		if(tmp.indexOf('secilme') < 0){	
                       	var nextday = new Date(now.getFullYear(), now.getMonth(), now.getDate()+ (i/2));
			return nextday.getDate() + "."+ (nextday.getMonth() + 1) +"."+ nextday.getFullYear();
		}
	}
	return "error";
}

function getChannel(){
	var topBar = kanal.childNodes[0].childNodes[0].childNodes;
	for(var i=0; i<topBar.length;i++){
		tmp = (topBar[i].getAttribute("class")) ? topBar[i].getAttribute("class") : "secilme";
		if(tmp.indexOf('secilme') < 0){	
			return topBar[i].childNodes[0].innerHTML;
		}
	}
	return "error";
}

var addPrograms4TRT = function(){
	document.bgColor = "#B2ADA4";
	channel = getChannel();
	day = getEPGDate();
	data=" <h1>"+channel+" Kanalinin "+day+" Tarihli Yayin Akisi by eMbRYo</h1>"+
	"<form action='http://avatar/epg/trt_epg.ds' method='POST'><table id='tb' cellspacing='1' cellpadding='1' style='font-family:arial; font-size:10pt;     background-color:#808080;     width:500px;     border-style:solid;     border-color:black;     border-width:2px;' class='linklertext' border='1' syle=''><tr style='background-color:#73100A;'><td><h2>Sil</td><td><h2>Saat</td><td><h2>Program"+
"<input type='hidden' name='channel' value='" + channel + "' />"+
"<input type='hidden' name='day' value='" + day + "' />"+
"</td></tr>";

	for (var i=1; i<flow.rows.length; i++) {
		hour = flow.rows[i].cells[0].innerHTML;
		program = (flow.rows[i].cells[1].childNodes.length > 1) ? flow.rows[i].cells[1].childNodes[0].innerHTML : flow.rows[i].cells	[1].innerHTML;
		url = (flow.rows[i].cells[1].childNodes.length > 1) ? flow.rows[i].cells[1].childNodes[0].href : "";
		data += "<tr><td><INPUT TYPE='checkbox' NAME='c_"+i+"'></td>"+
			"<td style='background-color:#93148A;'>" + hour + "</td>"+
			"<td id='td_"+i+"'style='background-color:#93148A;'><textarea style='display: block;' cols='60' rows='1' name='p_"+i+"' id='p_"+i+"'>" + program + " </textarea>";
		data += "<input type='hidden' name='h_"+ i +"' value='" + hour + "' />" +
			"<input type='hidden' name='p_"+i+"' value='" + program + "' /></td></tr>";
		j++

	}
	data += "<tr><td colspan='4' align='center'><input type='hidden' name='rows' value='"+j+"'><input type='submit' value='Submit' on></td></tr></table></	form>";
};

addPrograms4TRT();
document.body.innerHTML = data;