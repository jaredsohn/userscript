// InvisionPreviews
//     By Zach Kanzler
//
//  Shows preview boxes of various text objects
//  like new posts, calendar events, and your inbox.
//
// ==UserScript==
// @name          InvisionPreviews
// @version		  0.2
// @namespace     http://y4kstudios.com/greasemonkey/
// @description   Shows a preview of the new post of a thread
// @include       http://*invisionfree.com/CheatSync_Forums/*
// ==/UserScript==

/* Client-side access to querystring name=value pairs
	Version 1.2.3
	22 Jun 2005
	Adam Vandenberg
*/
function Querystring(qs) { // optionally pass a querystring to parse
	this.params = new Object()
	this.get=Querystring_get
	
	if (qs == null)
		qs=location.search.substring(1,location.search.length)

	if (qs.length == 0) return

// Turn <plus> back to <space>
// See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
	qs = qs.replace(/\+/g, ' ')
	var args = qs.split('&') // parse out name/value pairs separated via &
	
// split out each name=value pair
	for (var i=0;i<args.length;i++) {
		var value;
		var pair = args[i].split('=')
		var name = unescape(pair[0])

		if (pair.length == 2)
			value = unescape(pair[1])
		else
			value = name
		
		this.params[name] = value
	}
}

function Querystring_get(key, default_) {
	// This silly looking line changes UNDEFINED to NULL
	if (default_ == null) default_ = null;
	
	var value=this.params[key]
	if (value==null) value=default_;
	
	return value
}

var allLinks, thisLink;
allLinks = unsafeWindow.document.evaluate('//a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var areq;
var today = new Date();

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
			calM = (thisLink.href.toUpperCase().indexOf('M=') != -1);
			cAllow = (thisLink.href.toUpperCase().indexOf('CALENDAR') != -1);
			if(cAllow){
				cAllow = !(thisLink.href.toUpperCase().indexOf('CODE') != -1);
				//console.log(cAllow);
			}
			if(thisLink.href.indexOf('getnewpost') != -1 || (thisLink.href.toUpperCase().indexOf('ACT=MSG') != -1 && thisLink.href.toUpperCase().indexOf('CODE=01') != -1) || cAllow){
				var popup = document.createElement('div');
				popup.style.border = "2px solid #000000;";
				popup.style.height = "90;";
				popup.style.width = "200";
				popup.style.display = "none";
				popup.style.backgroundColor = "#F4F4F4;";
				popup.style.position = "absolute;";
				popup.id = "popup" + i;
				popup.innerHTML = "<div id='popup" + i +"text'>Loading...<img src=\"data:image/gif,GIF89a%10%00%10%00%F4%00%00%F4%F4%F4%07b%C0%E6%EB%F0%87%B0%DB%D7%E2%EDH%89%CEx%A7%D8%07b%C0X%94%D1(v%C6%A7%C4%E2%B7%CE%E6%19m%C3%97%BA%DF%09c%BF8%80%CAg%9C%D4%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FE%1ACreated%20with%20ajaxload.info%00!%F9%04%00%0A%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00%2C%00%00%00%00%10%00%10%00%00%05w%20%20%02%02%09!%E5%A8%02DB%08%C7A%90%ABH%1C%89%E0%C8%C2%AC%12%B3%C1a%B0%03%A6D%82%C2%10%E6%40%20%5E%B6%14A%E9X%F8%90P%A4%40%F1%B8%22U%83%82%B3Q%23%09%CE%E1B%81%5C%3B%9F%CD%0B%C31%AA%12%0C%18%05o%CF%3A2%24%1Av%03%40%04%0A%24%7C%2C3%04%0F%0B%0A%0D%04%82_%23%02%08%06%00%0Dd%04%805%04%063%97%22%0Bs5%0B%0Be!%00!%F9%04%00%0A%00%01%00%2C%00%00%00%00%10%00%10%00%00%05v%20%20%02%02i%40e9%8EDA%08%C9A%10%8C%B2%8A%C4%F1%C0%0E%11%2F%AB%19%60ph%24%18%8DCa%25%40%20%05%8C%C7%E9pH%A9%08%08%9D%10%B0x%BDF%02%81%C2uS%89%14%10%83%01x%23%85%05%0D%04%04%C2.%BF%DD%84%86Y%14f%8E%11%04L%02_%22%03%05%0Ap%0A3B%83W%81%04%10%04%0B%88%5D%7CL%06%0D%5C6%92%7B%7Cz%9A8%9D7%5B7!%00!%F9%04%00%0A%00%02%00%2C%00%00%00%00%10%00%10%00%00%05x%20%20%02%02%D9%0Ce9%8E%04D%08E%22%08%8F%B2%8A%84%83%C02r%2C%AB%17%A0qP%C4%14%87%02%80%00%14%18j%B4%C2%60%F08%10%06%07%EB%12%C2%40%10%088b%16H%12%2C%20*%D1%E20%18-%A6%0D%F0mFW%18%EE%E49%BDLP%A4E3%2B%02%0A%10(%82%02B%22%0D%06%0Bf%8D%7B%88*BW_%2F%89%7F%02%0D%40_%24%89%82~Kr%817Ar7!%00!%F9%04%00%0A%00%03%00%2C%00%00%00%00%10%00%10%00%00%05v%20%20%02%02%D94e9%8E%84!%08H%F1%22%CB*%12%8F%1B%0B%D0Q%8F%2F%40%83%B1%88-%0E%10%12%814%80%10%04%05%C3%A9p%104%0E%8CR%2B%F7%BC-%12%07%9F%E8%B5p%AD%08%C8%A7%60%D1P(%966%08%83%E1%A0%9D%1A%F0U%2F%FC%20%09%08%0B*%2C%04%84)%04%03(%2B%2F%5D%22lO%85%2F%86*Ak%91%7F%93%8A%0BK%94%8C%8A%5DA~66%A06!%00!%F9%04%00%0A%00%04%00%2C%00%00%00%00%10%00%10%00%00%05l%20%20%02%02i%18e9%8E%04%22%08%C7%F1%1E%CB*%12%87%1B%0B%0C%BD%BE%00%03-%D680H%04%12%82%B1%80%3DN%3B%A1%0C%D0%CA%11T%84E%EC%D0%10%BD%16%AE%15%EEq%15%10%1A%E8%A4%ED%B1e%9E%0C%EAUoK2_WZ%F2%DD%8CV%89%B41jgW%04e%40tuH%2F%2Fw%60%3F%85%89f~%23%92%89%966%94%93%23!%00!%F9%04%00%0A%00%05%00%2C%00%00%00%00%10%00%10%00%00%05~%20%20%02%02%B9%2Ce9%8E%82%22%08%83%F1%1A%C4*%0A%86%3B%0CpR%B3%25%02%84%B0%230%06%A4%9A%60%A1%20%C0%1A'%C3c%99(%A4%16%03%94J%40%40%1C%1E%BF%17%C1%B5%12%14%1A%2F1%C1i%034%10%88%C2%60%BDV%AD%1A%89%04%03B%E2%BEV%04%0F%0Du%7D%84%22c%07%07%05aNi%2F%0C%07%5D%07%0C))%8D-%07%08%00Lel%7F%09%07%0Bmi%7D%00%04%07%0Dme%5B%2B!%00!%F9%04%00%0A%00%06%00%2C%00%00%00%00%10%00%10%00%00%05y%20%20%02%02I%10e9%8E%C2%22%08M%F36%C4*%C2%A8%227E%CD%96%84%81%40G((L%26%D4pqj%40Z%85%A7%89%F9%BA%11%20%0C%84%EF%25%40%AD%04%10%05w%ACZ)%20%10%84pl%03(%0A%8F%87%81%D4%AD%8E%08%08q%F5u*%13%16%07%07R%26c%06%10%09%07%60%07%0F))(%0C%07%03%07s%7F_J%90%04%88%3E_%5C%0E%07'%0EGm7%08%8C%24%2B!%00!%F9%04%00%0A%00%07%00%2C%00%00%00%00%10%00%10%00%00%05w%20%20%02%02I%10e9%8E%02*%2C%8B%20(%C4*%BE(%FCB5%5B%121%18%01%B2%20%A5Z%B2%D3Iah!%06G%97%AAex%18z%B2%ECJ0%88e%BF6%C0%C2%40V%7CU%AB%05%04%F14%BA%B6Dm%B2%85%25%24%0E%CD%9B%EBp%18%0C%0A%09%5C%07%05G%00%03x%09%09%0D%7D%00%40%2B%04%7C%04%0C%0C%02%0F%07%3D%2B%0A%071%93-%09Ea5%02l)%2B!%00!%F9%04%00%0A%00%08%00%2C%00%00%00%00%10%00%10%00%00%05y%20%20%02%02)%9C%E4%A8%9E'A%9CK%A9%92%AF%E0%DA%8D%2C%A2%B6%FD%0E%04%93%89E%5C(l%83%9C%A9%26%3B5%20%8D%E0%105%12D%89%C4%19%800%E8%1E%B33%82a%AC0-%12%8B%15%90%B5-%1C%0E%D1%1D%A1%C0%18%94%04%8E%C3%83pH4%14%10%05V%09%10%25%0Di%03%07%03%0F%0F%0Ap%5BR%22%7C%09%02%8C%02%08%0E%91%23%0A%99%02%09%0F6%05iZwcw*!%00!%F9%04%00%0A%00%09%00%2C%00%00%00%00%10%00%10%00%00%05y%20%20%02%02)%9C%E4%A8%9E%2CK%94*%F9%B6%C4%02%8B%A80%9F%0Ba%9A%3B%D7%8B%D0%B0%01Y8%81b%604%E9n%A4%1E%0B%C2%A8Bb%00%82b%BBx%1C%BE%05%2C%B1%C1%D4%11%19%BE%91%A0%B1%CB%16%BE%CD%13%E4%D1(%09%12%07%C8%BD%B0%1D%20%04%0B%08%06%25%0A%3E%03%07%0D%08%05%0B%0C%0A2*%04%07%0F%02%8A%02%06%0Fi*%0B%09%2F%05%05%3A%10%99%2B%24%03%03v*!%00!%F9%04%00%0A%00%0A%00%2C%00%00%00%00%10%00%10%00%00%05u%20%20%02%02)%9C%E4%A8%9El%5B%AA%24%E1%0A%B2J%10q%5B%A3%C2q%0C3%99%60Q%5B%F8%0E5%13%81%F8%3A%19%0E%8A%95%F0%04IX!0%C0rAD8%18%0CCv%AB%90%C9%14%05%DCHPfi%11%BE%E4i%00Q%94%04%8F%83AP%40p%1B%10C%06%0D%25D%00%0DP%06%10%04%0FQ46%0C%05%02%8A%02%0Dici%02%10%08Nj0w%0D%84)%23!%00!%F9%04%00%0A%00%0B%00%2C%00%00%00%00%10%00%10%00%00%05y%20%20%02%02)%9C%E4%A8.%0Cq%BE%A8%0A%2CG%02%0B%AEJ%10%00r(%AF%1CJ%908%0C%08%87C%F0%E4*%11%8A%87%86B%B4%2C%99%1A%8E%85%EA%26%18%3C%0A%85%81%8C%B4%DB%19%12h%B1%0CW~-%10%BC%91%60%D1%2C%09%0C%87%96%F5%A4%18%2C%EC%3E%03%02%10%06%3B%0A%0D8RN%3C%2C%0B%03%85%10%3C1T%0F%10%5D%06%02%0A%98c%04%91%97'%0Dqk%24%0A%40)%23!%00%3B%00%00%00%00%00%00%00%00%00\" /></div>";
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																														  
				document.body.insertBefore(popup, document.body.firstChild);
				
				if(thisLink.href.toUpperCase().indexOf('GETNEWPOST') != -1 || thisLink.href.toUpperCase().indexOf('GETLASTPOST') != -1){
				eval("thisLink.onmouseover = function(e){\n" +
									"var popup = document.getElementById('popup" + i + "');\n" +
									"var aFound = false;\n" +
									"if(document.getElementById('popup" + i + "text').innerHTML.indexOf('Loading...') != -1){\n" +
								    "	var areq" + i + " = new XMLHttpRequest();\n" +
								    "	areq" + i + ".open('GET', '" + thisLink.href + "',true);\n" +
									"	areq" + i + ".onreadystatechange = function(){\n" +
									"		if(areq" + i + ".readyState == 4){\n" +
									"			document.getElementById('popup" + i + "text').innerHTML = areq" + i + ".responseText;\n" +
									"			var post = document.getElementById('popup" + i + "text').getElementsByTagName('a');\n" +
									"			for(j=0; j < post.length; j++){\n" +
									"			if(post[j].name == 'last' && !aFound){" +
									"				document.getElementById('popup" + i + "text').innerHTML = '&nbsp;&nbsp;' + post[j].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes[1].childNodes[2].childNodes[3].childNodes[3].innerHTML.substr(0,150).replace('<BR>','').replace('<BR/>','') + '...';\n" +
									"				aFound = true;\n" +
									"				}\n" +
									"			}\n" +
									"		if(!aFound){\n" +
									"			for(j=0; j < post.length; j++){\n" +
									"				if(post[j].name.indexOf('entry') != -1) popup.innerHTML = '&nbsp;&nbsp;' + post[j].nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes[1].childNodes[2].childNodes[3].childNodes[3].innerHTML.substr(0,150).replace('<BR>','').replace('<BR/>','') + '...';\n" +
									"			}\n" +
									"			}\n" +
									"		}\n" +
									"	}\n" +
									"	areq" + i + ".send(null);\n" +
									"}\n" +
									
									"var tempX = e.pageX;\n" +
									"var tempY = e.pageY;\n" +
									
									"if (tempX < 0) tempX = 0;\n" +
									"if (tempY < 0) tempY = 0;\n" +
									"popup.style.left = tempX - 150;\n" +
									"popup.style.top = tempY + 24;\n" +
									"popup.style.display = 'block';\n" +
									"	};");
				}
				
				if(thisLink.href.toUpperCase().indexOf('ACT=MSG') != -1){
				eval("thisLink.onmouseover = function(e){\n" +
									"var popup = document.getElementById('popup" + i + "');\n" +
									"var popupText = document.getElementById('popup" + i + "text');\n" +
									"popup.style.paddingTop = 10;\n" +
									"var msgs = 0;\n" +
									"var msgsText = '';\n" +
									"if(popupText.innerHTML.indexOf('Loading...') != -1){\n" +
								    "	var areq" + i + " = new XMLHttpRequest();\n" +
								    "	areq" + i + ".open('GET', '" + thisLink.href + "',true);\n" +
									"	areq" + i + ".onreadystatechange = function(){\n" +
									"		if(areq" + i + ".readyState == 4){\n" +
									"			popupText.innerHTML = areq" + i + ".responseText;\n" +
									"			var post = document.getElementById('popup" + i + "text').getElementsByTagName('a');\n" +
									"			for(j=0; j < post.length; j++){\n" +
									"			if(post[j].href.toUpperCase().indexOf('MSID') != -1 && msgs < 3){" +
									"				msgsText += '<strong>&nbsp;' + post[j].parentNode.previousSibling.previousSibling.innerHTML + '&nbsp;' + post[j].innerHTML + '</strong><i><font size=\"-3\"> from ' + post[j].parentNode.nextSibling.nextSibling.firstChild.innerHTML + '</font></i>';\n" +
									"				if(msgs < 2) msgsText += '<hr />';\n" +
									"				msgs++;\n" +
									"				}\n" +
									"			}\n" +
									"			popupText.innerHTML = msgsText;\n" +
									"			if(msgs == 0){\n" +
									"				popupText.innerHTML = '<div align=\"center\"><strong>Empty</strong></div>';\n" +
									"				popupText.style.paddingTop = 30;\n" +
									"			}\n" +
									"		}\n" +
									"	}\n" +
									"	areq" + i + ".send(null);\n" +
									"}\n" +
									
									"var tempX = e.pageX;\n" +
									"var tempY = e.pageY;\n" +
									
									"if (tempX < 0) tempX = 0;\n" +
									"if (tempY < 0) tempY = 0;\n" +
									"popup.style.height = '80';\n" +
									"popup.style.left = tempX - 100;\n" +
									"popup.style.top = tempY + 24;\n" +
									"popup.style.display = 'block';\n" +
									"	};");
				}
				
				var cal = true;
				if(calM){
					var cal = new Querystring(thisLink.href);
					cal = cal.get('m', today.getMonth());
					if(cal == today.getMonth()) cal = true;
					else cal = false;
				}
				
								if(thisLink.href.indexOf('calendar') != -1 && cal){
				eval("thisLink.onmouseover = function(e){\n" +
									"var date = new Date();\n" +
									"var today = date.getDate();\n" +
									"var popup = document.getElementById('popup" + i + "');\n" +
									"var popupText = document.getElementById('popup" + i + "text');\n" +
									"if(popupText.innerHTML.indexOf('Loading...') != -1){\n" +
								    "	var areq" + i + " = new XMLHttpRequest();\n" +
								    "	areq" + i + ".open('GET', '" + thisLink.href + "',true);\n" +
									"	areq" + i + ".onreadystatechange = function(){\n" +
									"		if(areq" + i + ".readyState == 4){\n" +
									"			popupText.innerHTML = areq" + i + ".responseText;\n" +
									"			var post = document.getElementById('popup" + i + "text').getElementsByTagName('div');\n" +
									"			for(j=0; j < post.length; j++){\n" +
									"			if(post[j].className.toUpperCase() == 'CALDATE' && post[j].innerHTML == today){" +
									"				popupText.innerHTML = post[j].parentNode.innerHTML;\n" +
									"				}\n" +
									"			}\n" +
									"		}\n" +
									"	}\n" +
									"	areq" + i + ".send(null);\n" +
									"}\n" +
									
									"var tempX = e.pageX;\n" +
									"var tempY = e.pageY;\n" +
									
									"if (tempX < 0) tempX = 0;\n" +
									"if (tempY < 0) tempY = 0;\n" +
									"popup.style.height = '80';\n" +
									"popup.style.left = tempX - 180;\n" +
									"popup.style.top = tempY + 24;\n" +
									"popup.style.display = 'block';\n" +
									"	};");
				}
				
				thisLink.onmouseout = eval("function(){\n" +
						"document.getElementById('popup" + i + "').style.display = \"none;\";\n" +
						"};");
			thisLink.removeAttribute('title');
    }
}