// ==UserScript==
// @name           Platinum Crew TH Advanced View
// @namespace      http://dttvb.com
// @description    Shows more info on info card page.
// @include        http://www.djmax.in.th/technika/infoCard.asp
// ==/UserScript==

var datas = [];
var matches = document.body.innerHTML.replace(/bold;"><b>([^<]*)/g, function(a, b) {
	datas.push (b);
});

var maxPoint = allnum(datas[0]);
var playCount = allnum(datas[4]);
var popularRank = allnum(datas[7]);
var technicalRank = allnum(datas[9]);
var expPoint = allnum(datas[10]);
var outHTML = '';

outHTML += '<div style="background:#daeaf2;padding:6px;-moz-border-radius:8px;margin:0 5px 10px">';

function g1(a, b) {
	return '<td style="color:#173F53"><b>' + a + '</b></td><td style="color:black;padding-left:10px;padding-right:40px;"><b>' + b + '</b></td>'
}
function g2(a) {
	return '<td style="color:#173F53;padding-right:10px;"><b>' + a + '</b></td>';
}
function g3(a) {
	return '<td style="color:#000;text-align:right;">' + a + '</td>';
}

var now = new Date();
var past = new Date();
var tmatch;
if (tmatch = datas[2].match(/(\d+)\/(\d+)\/(\d+)/)) {
	past.setFullYear(allnum(tmatch[3]));
	past.setMonth(allnum(tmatch[1]) - 1);
	past.setDate(allnum(tmatch[2]));
}
var dayCount = Math.max(1, Math.ceil((now.getTime() - past.getTime()) / 86400000));

outHTML += '<table>';
outHTML += '<tr>';
outHTML += g1('Play Count:', playCount);
outHTML += '</tr><tr>';
outHTML += g1('Exp:', expPoint);
outHTML += '</tr><tr>';
outHTML += g1('Days Since Registered:', dayCount);
outHTML += '</tr><tr>';
outHTML += g1('Exp Per Game:', expPoint / playCount);
outHTML += '</tr><tr>';
outHTML += g1('Exp Per Day:', expPoint / dayCount);
outHTML += '</tr>';
outHTML += '</table>';
outHTML += '<div style="margin-top:8px;background:#ffffff;padding:9px;-moz-border-radius:8px;">';

outHTML += '<table>';
outHTML += '<tr>' + g2('Level') + g2('ExpReq') + g2('ExpLeft') + g2('Games') + g2('MoneyB') + g2('Days') + '</tr>';
var lr = [
	0, 91, 241, 551, 1201, 2001, 3201, 4801, 7001, 9501,
	13001, 18001, 24001, 30001, 36001, 42001, 54001
];
for (var i = 0; i < lr.length; i ++) {
	var n = '00' + (i + 1);
	n = n.substr(n.length - 2);
	var c_point = lr[i];
	var c_left = lr[i] - expPoint;
	var c_games = Math.ceil(c_left * (playCount / expPoint));
	var c_days = Math.ceil(c_left * (dayCount / expPoint));
	var c_baht = Math.ceil(20 * c_left * (playCount / expPoint));
	outHTML += '<tr>';
	outHTML += g3('<img alt="" src="http://www.djmax.in.th/icon/technika/level/30/lev-' + n + '.png" />');
	outHTML += g3(c_point);
	outHTML += g3(c_left);
	outHTML += g3(c_games);
	outHTML += g3(c_baht);
	outHTML += g3(c_days);
}
outHTML += '</div>';
outHTML += '</div>';



var headerTable = ($x('//table[@width="602"]')[0]);
var newDIV = document.createElement('div');
newDIV.innerHTML = outHTML;
headerTable.parentNode.insertBefore (newDIV, headerTable.nextSibling && headerTable.nextSibling.nextSibling && headerTable.nextSibling.nextSibling.nextSibling);

function allnum(x) {
	return parseInt(x.replace(/[^0-9]/g, ''));
}

// XPath Helper
function $x() {
	var x='',          // default values
	node=document,
	type=0,
	fix=true,
	i=0,
	toAr=function(xp){      // XPathResult to array
		var final=[], next;
		while(next=xp.iterateNext())
			final.push(next);
		return final
	},
	cur;
	while (cur=arguments[i++])      // argument handler
		switch(typeof cur) {
			case "string":x+=(x=='') ? cur : " | " + cur;continue;
			case "number":type=cur;continue;
			case "object":node=cur;continue;
			case "boolean":fix=cur;continue;
		}
	if (fix) {      // array conversion logic
		if (type==6) type=4;
		if (type==7) type=5;
	}
	if (!/^\//.test(x)) x="//"+x;         	 // selection mistake helper
	if (node!=document && !/^\./.test(x)) x="."+x;  // context mistake helper
	var temp=document.evaluate(x,node,null,type,null); //evaluate!
if (fix)
	switch(type) {                              // automatically return special type
		case 1:return temp.numberValue;
		case 2:return temp.stringValue;
		case 3:return temp.booleanValue;
		case 8:return temp.singleNodeValue;
		case 9:return temp.singleNodeValue;
	}
	return fix ? toAr(temp) : temp;
}


