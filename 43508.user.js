// ==UserScript==

// @name          Todayhumor anti IP

// @namespace     http://blog.naver.com/bluelenz

// @description   descript someIP to red

// @include       http://todayhumor.*

// @exclude       

// ==/UserScript==



// 강조할 IP 및 해당 IP 에 대한 설명


var IPs = ["147.43.74.227"];
var description = ["암흑군주 고정"];


// 본문 작성자 정보 중 IP 강조

var all_td;

all_td = document.getElementsByTagName('TD');

for(var i = 0; i<all_td.length; i++) {

	element = all_td[i];
	if( element.height == 10 && !element.innerHTML.match("td") )
	{
		for(var j = 0; j < IPs.length; j++){
			if( element.innerHTML.match( IPs[j] ) ){

				element.setAttribute("bgcolor", "red");
				element.innerHTML = "<b><font color=white>" + element.innerHTML + "_____" + description[j] + "</font></b>";
			}

		}
	}
}

// 리플 작성자 정보 중 IP 강조

var all_ip;

all_ip = document.getElementsByTagName('font');

for(var i = 0; i<all_ip.length; i++) {

	element = all_ip[i];
	if( element.color == "red" && !element.innerHTML.match("font") )
	{
		for(var j = 0; j < IPs.length; j++){
			if( element.innerHTML.match( IPs[j] ) ){
				element.color = 'white';

				element.innerHTML = "<b><span style='background-color:red'>" + element.innerHTML + "_" + description[j] + "</span></b>";
			}

		}
	}
}


// 본문 및 꼬릿말 내용 중 특정 단어 검출

var abuseWords = ["cizel", "coronakim"];

var where = ["본문", "꼬릿말"];

var all_table;
all_table = document.evaluate(
    "//table[@width='100%'][@bgcolor='#f6f6f6']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < all_table.snapshotLength; i++)
{
   	element = all_table.snapshotItem(i);
       
   	for(var j = 0; j < abuseWords.length; j++)
   	{
		if( element.innerHTML.match(abuseWords[j]) )
		{
			alert(where[i] + "에서 '" + abuseWords[j] + "'이(가) 발견되었습니다.");
		}
	}
}