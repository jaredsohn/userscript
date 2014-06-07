// ==UserScript==
// @name           Clippy Eleven
// @namespace      kol.interface.unfinished
// @description    Provides advice on optimal 11 play during Crimbo in KoL.
// @include        http://*.kingdomofloathing.com/crimbo09.php*
// @include        http://127.0.0.1:*/crimbo09.php*
// ==/UserScript==

// Version 1.0
// - based on the table in http://kol.coldfront.net/thekolwiki/index.php/User:Poochy/Crimbo_11_Strategy

function findHit() {
    var ps = document.evaluate('//input[@value="Hit"]',document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if (ps.singleNodeValue) {
		return true;
	}
	return false;
}

function findCards() {
	var cards={you:[],dealer:[]};
    var ps = document.evaluate('//img',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i=ps.snapshotLength-1;i>=0;i--) {
        var p = ps.snapshotItem(i);
		var s = p.getAttribute('src');
		var c;
		if (s && (c=s.match(/^http:\/\/images\.kingdomofloathing\.com\/otherimages\/cards\/\/(..).gif/))) { 
			var cc = c[1].charAt(0);
			if (cc=='k') cc = '5';
			if (p.getAttribute('id') && p.getAttribute('id').indexOf('dealer_')>=0) {
				cards.dealer[cards.dealer.length] = cc;
				//GM_log('dealer card = '+cc);
			} else {
				cards.you[cards.you.length] = cc;
				//GM_log('your card = '+cc);
			}
		}
	}
	cards.you = cards.you.sort();
	return cards;
}

function getAction(cards) {
	if (cards.you.length==0)
		return;
	//var s = ''; for (var i=0;i<cards.you.length;i++) s+=cards.you[i]+' ';
	//GM_log('cards: '+s);
    var sum = 0;
	var aces = 0;
	for (var i=0;i<cards.you.length;i++) {
		if (cards.you[i]=='a')
			aces++;
		else
			sum += Number(cards.you[i]);
	}
	// check if soft
	if (aces>0 && (sum+(aces-1)+6)<=11) {
		// soft
		sum+=aces;
		//GM_log('soft '+sum);
		switch(sum) {
		case 2:
		case 3:
		case 4:
		case 7:
		case 8:
		case 9:
			return 'h';
		case 5:
		case 10:
			if (cards.dealer[0]=='a') {
				if (cards.you.length>=3)
					return 'h';
				return 's';
			}
		case 6:
		case 11:
			if (cards.you.length==4)
				return 'h';
			return 's';
		}
	} else {
		// hard
		sum += aces;
		//GM_log('hard '+sum);
		switch(sum) {
		case 4:
		case 7:
			return 'h';
		case 5:
			if (cards.dealer[0]=='5' || cards.dealer[0]=='a')
				return 'h';
			return 'd';
		case 6:
			if (cards.dealer[0]=='5' || cards.dealer[0]=='a')
				return 'h';
			if (cards.dealer[0]=='4') {
				if (cards.you.length==2 && cards.you[0]=='2' && cards.you[1]=='4')
					return 'd';
				return 'h';
			}
			return 'd';
		case 8:
			if (cards.dealer[0]=='4' || cards.dealer[0]=='5' || cards.dealer[0]=='a')
				return 'h';
			if (cards.you.length==2)
				return 'h';
			if (cards.dealer[0]=='2') {
				if (cards.you.length==3 && cards.you[0]=='2' && cards.you[1]=='2' && cards.you[2]=='4')
					return 's';
				if (cards.you.length==3 && cards.you[0]=='2' && cards.you[1]=='2' && cards.you[2]=='3')
					return 's';
				return 'h';
			}
			// if (cards.dealer[0]=='3')
			if (cards.you.length==4 && cards.you[0]=='3' && cards.you[1]=='3' && cards.you[2]=='a' && cards.you[3]=='a')
				return 's';
			if (cards.you.length==4 && cards.you[0]=='2' && cards.you[1]=='2' && cards.you[2]=='3' && cards.you[3]=='a')
				return 's';
			if (cards.you.length==4 && cards.you[0]=='2' && cards.you[1]=='3' && cards.you[2]=='5' && cards.you[3]=='a')
				return 's';
			if (cards.you.length==4 && cards.you[0]=='2' && cards.you[1]=='2' && cards.you[2]=='2' && cards.you[3]=='2')
				return 's';
			if (cards.you.length==3 && cards.you[0]=='2' && cards.you[1]=='2' && cards.you[2]=='4')
				return 's';
			if (cards.you.length==3 && cards.you[0]=='2' && cards.you[1]=='3' && cards.you[2]=='3')
				return 's';
			return 'h';
		case 9:
			if (cards.dealer[0]=='2' || cards.dealer[0]=='3' || cards.dealer[0]=='4')
				return 's';
			if (cards.dealer[0]=='5') {
				if (cards.you.length==4 && cards.you[0]=='2' && cards.you[1]=='5' && cards.you[2]=='a' && cards.you[3]=='a')
					return 's';
				if (cards.you.length==3 && cards.you[0]=='3' && cards.you[1]=='5' && cards.you[2]=='a')
					return 's';
				if (cards.you.length==3 && cards.you[0]=='2' && cards.you[1]=='2' && cards.you[2]=='5')
					return 's';
				if (cards.you.length==3 && cards.you[0]=='2' && cards.you[1]=='3' && cards.you[2]=='4')
					return 's';
				return 'h';
			}
			//if (cards.dealer[0]=='a') 
			if (cards.you.length==3 && cards.you[0]=='4' && cards.you[1]=='4' && cards.you[2]=='a')
				return 's';
			if (cards.you.length==3 && cards.you[0]=='2' && cards.you[1]=='2' && cards.you[2]=='5')
				return 's';
			if (cards.you.length==3 && cards.you[0]=='2' && cards.you[1]=='3' && cards.you[2]=='4')
				return 's';
			return 'h';
		case 10:
		case 11:
			return 's';
		}
	}
}


function insertKlippy(bval) {
    var ps = document.evaluate('//input[@value="'+bval+'"]',document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	var x = ps.singleNodeValue;
	if (x) {
		while (x && x.tagName!='TD')
			x = x.parentNode;
		if (x) {
			var prev = x.previousSibling;
			var count = 0;
			while (prev) {
				prev = prev.previousSibling;
				count++;
			}
			while (x && x.tagName!='TR')
				x = x.parentNode;
			if (x) x = x.parentNode;
			if (x) {
				var klip = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%23%00%00%00(%08%02%00%00%00%FB%7C%D4%CD%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D9%0C%12%17%00%1A%22%0E%D9%DD%00%00%05OIDATX%C3%ADWklSe%18%FE%CE%A5%E7%D2%9E%9E%5E%B6%AE%EB%D6%AD%94%ADl%91l%81M%C1dN%C0%25D%03%5E%00%2F%89%92%20%90%FD2%C6%7F%26%26%C6%F0%03%B2%A0%89%C4h%FCa%E2%1F%C1%081!%10%23F-%B71.%83%04Y%E72%3A%18%EB%D6%C1%D6%8E%F5%B4%3B%3D%EB%B9~%9F%3FN(s%9Bk%EB%FA%FE%3Ay%BF%F7%7B%9F%F3%5E%BE%F7%82!%84%C0%8A%84%10%02%00%C3%B0%C5%CC%C5%ACBD%16%23%84a%60%E8%EF!%0BE%0A%99%2C%06%F5M%9B7c%18V*%18%B6%B2M%A6%BA%DE%DE%2B%F3%8A%F1%D7P413%1B%08%06%7D.%DB%AB%2F%BFd%B3q%25%D9%84%17%B2%06%D3Tu%3C%FE0%3A%1A%AB%AF%F5u%3E%DF%8EA%E3%F6%DD%D8%9F%E7%2F%83%12%A9%B0%F7%86%EFF3%06%13%F0%3B%B7%BE%B0%99e%D9%89%89%F8h%22%7B1%1C~%E3%B5%1D%259%10%2F(%F1p%3A)%2B%C6%D6%CE%0E%A7%D3E%D3L(%14z%B6%A5q.%874M-)N%85%91%92%C2%3C%CF%E0%2CC%3F%C9C%E0%E6m%9C%B3rtt%B4lq2%F5N%26%04M%96%10%82f%D8%10B8%86%03%84%C6'%1E%953%23%00%003)%09%19%DA%C2%1C%01%00%CC%09%B3%B3%A2%BCZ%A4%7C%DE%9BJ%C7F%86%0D5%C70%CC%C2S%2C%F7xxhp%D9%5B%25%E4%9E%09%D0w%F5%DA%AD%81%D1%91%B1G%19I%FB%BDo%D0%C0%BE%7B%7B%D7%2B~%7F%1D%86a%00%A0%AC(%0C%DF%8F%7Dz%E4%9B%0A%9E%5E%DF%1C%EC%DA%B6%85%20-%2B%A7%E2%E2%97kJ%9F%3E%FB%EBoW%A2S%89%24%D0%15%86%26UM%D3uM%16S%C7z%3EY%B7%AE%F1%D0%E7%DF%8F'%E5%F4%9CH%10%A4%D5%C6%D9%18%DA%C3%C9G%3F%FB%08'%C8%15%C0%96%A9%11%82%20%9C%3C%F5%F3W_%7F%BBg%F7%EE%03%07%DE%B7s%1CD%D0%80Hx%FC%B8%B7%F7%12%00h8z%FF%FA%8D%5B%07%0F%1Elhl%10RB%26%2BM%3F%7CD%02%F9%BD%BD%7B%03%81%40%09%DE%B3%DB%EDU%9E%8Ay1%D5%D7%1B%FE%F0%83%EE*%8F%DB%E4%13%BAZ_%E7%8F%8E%8C%CCg%D3%83wn%3E%D7%F6%E5%86%0D%1Bu%5D%83%10%25%A6%13%97.%5E%F4%FB%FD%A5%C5%89%24%C9%600%D8%DD%DD%DD%D9%D9Y%5D%ED3%99%F1%D8%F8%99%B3g%F6%ED%DF_%EB%F7%D34%7D%F8%F0%11%9F%CFg%0Ak%AA%9A%9C%9Ar8x%82%20J%A8%B0%A6%A3u%5D%D7u%FD%DE%BD%7B%A7~%3A%99L%26w%EC%DC%C9%3B%F8%B6%B66%9E%E7!%84%B1X%EC%C7%13'tMkmi%B5%F3%BC%AA(kC%8DMMM%24%B9R%9C%00ZB%10%C2%FCwO%CF%D1%96%96%D6x%3C%AE%EBz%9Ei%18F8%1Cv%BA%AB~8~%1CA%A8(%8Ay%BA%F0%E2R%C2%97%CDr%F3%0C%00%D0%10ZW%DB%B8%81%B5r%04%8E%9B%1C%84%10%8E%E3%5E%AFw%E3%96%B7%DC%15%9E%E4L%D2BQ%04A%14%AC%B6%F8%7F5%0B%F3Z%85%CB%C1%F3%B6%CB%97%2F%BD%B4%E3%DDlV%CA%BF6%A7%CBe%B1PW%AF%DF%F8%F8%D0%17%9A%A2%80%A5%5D%B9%D4j%C4%F3%1CA%92%9A%A6%3A%2B%BD%18%FET%98%B7%DB9%8E%251%E0%F3%AFI%A7%852%D4%BD*%8F%C7js%20%84%2C%E4%BF%F2%CAf%E3(%0AC%08B%84dY)%03%92%B7%BA%DA%CAq%00%80D%22%81%20Z%90%9F%00%A99C%D7%1CN7%84%B0%0C%5D%83%A6%19%97%CB%89%E3%E4%CC%F4%A44%2F-%2C%8C%E2%5C%8A%B4XH%CAb6%94U!%99%1A%DDN%BB%A2%19%2CE%8E%3Dx%90%FF%7D%5D%D7!%84%2C%CB%22%04%24I*O%7Fb(RV5%8F%B7*%12%89%E4%91%12%89%84%C7%EB%AB%AC%A8TeY%14%B3%E5A%A2I%5C%94%E6%9B%9ABC%D11%F8%24T%FD%FD7%7D%FE%3Aw%85%5B%D35MS%CB%83DY0!%9D%5D%1B%A8%C9A2%25%08YI%9A%13%C5H4%A6%C9%D2%9A%40%00%03%18E%D1%E5%99%C2%1CVV%CC%C9%EF%BC%BE%7D*%F5%C7%A1%9Ec%3EoEJ%C8%D46%B6%AC%A1U%D6jE%08Q4U%1E%9Bj%7C%5E%0Bc%A5hf%E7%B6M%81%FA%3A%C5%20%7C5%FE%1A%1B%3C%B0o%2FA%90%B9%9C%C4%3Ei%FC%AB%B5)%14%0Aq%B6%3B%91H%E4%CD%3D%BB%3A%3A%3A%16%BE%01%5D%D7%C4L%9A.%0E%09%2F%B8hpv%1E%C7%60Z%CC%AA%AA%BA%E8H%10%04CSi%9A.%8F%F7%00%00%BC%95%CAd%15%B4d%06%8A%C7'%ED%0EGeeey6%00%00%80%C3J%0B%A2%04%8D%A7%C3%25%00%C00%8C%FB%B18%CF%B14%CD%14%1C%C1%8A%B5%A9%A9!%20%AB%F0%F6%C0%40%1E%5E%96%E5%DE%BEk%933b%95%83-%A6e%14%BB%A9%B5%B7%B7%FD%12%BEz%FA%DC%05%9C%A4%ED6%16%20461y%EA%F4%B9%E6g%9A%B7o%7B%B1%3C%9BZ~%B2%B8p%FE%C2%C0%83%E9%C8%E0%A0%A1%AA%10j4cm%DB%D8%DE%5C%EF%EE%EA%EA*r%B7%C1%8Aq%B1%A9%EBf%7F%7F%7Cz6-%CE%23%04%5Dv%A6%ADu%7DpmC%F1%2BT%B1H%CB%06%A3%A4M%AD(%A4%D5%AC%EC%FF%13i5%F4%0F%CA%11%00%BB%C4N%90K%00%00%00%00IEND%AEB%60%82";
				var row = document.createElement('tr');
				for (;count>0;count--) {
					row.appendChild(document.createElement('td'));
				}
				var elt = document.createElement('td');
				elt.setAttribute('style','text-align:center;');
				var kimg = document.createElement('img');
				kimg.setAttribute('src',klip);
				kimg.setAttribute('width','35');
				kimg.setAttribute('height','40');
				elt.appendChild(kimg);
				row.appendChild(elt);
				x.appendChild(row);
				return true;
			}
		}
	}
	return false;
}

if (findHit()) {
	var cards = findCards();
	var action = getAction(cards);
	//GM_log("action: "+action);
	if (action) {
		switch(action) {
		case 's':
			insertKlippy('Stand');
			break;
		case 'h':
			insertKlippy('Hit');
			break;
		case 'd':
			if (!insertKlippy('Double Down'))
				insertKlippy('Hit');
			break;
		}
	}
} 
