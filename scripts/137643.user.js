// ==UserScript==
// @name        Mürtecinin Sözlük Arındırıcı Scripti
// @namespace   sevenkul
// @description İnteraktif sözlüklerdeki ergen işi şeyleri engeller.
// @include     http://www.eksisozluk.com/*
// @include     http://eksisozluk.com/*
// @include     http://beta.eksisozluk.com/*
// @include     http://www.uludagsozluk.com/*
// @include     http://uludagsozluk.com/*
// @include     http://www.itusozluk.com/*
// @include     http://itusozluk.com/*
// @include     http://www.ihlsozluk.com/*
// @include     http://ihlsozluk.com/*
// @include     http://www.murtecisozluk.com/*
// @include     http://murtecisozluk.com/*
// @version     1.0
// @author      cihan çobanoğlu
// ==/UserScript==

//Remove background advertisement or theme images.
function removeAdCss() {
	var linkElements = document.getElementsByTagName("link");
	for (i=0; i < linkElements.length; i++) {
		if (linkElements[i].getAttribute("type") == "text/css") {
			if (linkElements[i].href.indexOf("/adcss/") > -1) { //ekşi sözlük
				linkElements[i].href = "http://static.eksisozluk.com/sozluk.css"; break;
			}
			else if (linkElements[i].href.indexOf("/theme/") > -1) { //uludağ sözlük
				linkElements[i].href = "/theme/lokumgibi.css";
				if (window.location.href.indexOf("/ust.php") === -1) //if not ust.php
					document.body.removeAttribute("style"); //we don't need no style
					GM_addStyle("body { background-image: none !important;"); break;
				break;
			}
			else if (linkElements[i].href.indexOf("/custom/") > -1) { //itü sözlük
				linkElements[i].href = ""; break;
			}
			else if (linkElements[i].href.indexOf("images/") > -1) { //ihl sözlük veya mürteci sözlük
				GM_addStyle("body { background-image: none !important;"); break;
			}
		}
	}
}

//Sanitize elements defined with parameter.
function sanitizeLeftFrame(listElements) {
	function blacklister(el, words) {
        if (!el || !words) {
            return false;
		}
        else {
            var text = el.textContent;
            for (var i = 0, len = words.length; i < len; i++) {
                if (text.match(new RegExp(words[i], 'gi'))) {
					if (el.className.indexOf('black') == -1){
						//console.log(el);
						el.className += ' black';
						if (el.tagName == "TD") { //TD vs LI
							el.parentNode.className += ' black';
						}
					}
                }
            }
        }
    }
	
	//dahil denilen kelimeler %99 lüzumsuzun arasında feda edilenlerdir.
	//hariç denilenler akla gelmişken not edilenlerdir.
    var blacklist = [
		'(\\s)(adam|erkek|baba|anne|kadın|bayan|kız|mal|tip|modeli)(lar|ler)?(\\s\\([0-9]*\\))?[.\\s]*$', //bilmem ne bilmem ne kişi; beyinsiz adam dahil; kız, hatun ve sevgili aşağıda
		'orospu', 'fuck', '(^|\\s)amk(\\s|$)', 'pezevenk', '(^|\\s)piç', //küfürler
		'(^|\\s)sıç', '(^|\\s)sicma', '(^|\\s)osur', '(^|\\s)işemek', '(^|\\s)bok', //hela işleri; sicak, basic hariç; sıçan dahil
		'(^|\\s)göt(?!ür)', '(^|\\s)kıç', //götürmek hariç; mario götze dahil
		'(^|\\s)bira(\\s|$)', '(^|\\s)votka(\\s|$)', '(^|\\s)rakı(\\s|$)', //laubalilik garantili tanımlar; bırakıyor hariç
		'(^|\\s)alkol', 'pavyon', '(^|\\s)gay', //laubalilik garantili tanımlar 2; çok göze batarsa: 'lezbiyen'
		'sevgili', 'hatun', 'bakire', 'bekaret', '(^|\\s)zina', 'kadının', 'cinsel', 'ilişki', //laubali garantilik tanımlar 4; sevgili sözlük, arasındaki ilişki dahil
		'(^|\\s)kız(ı|ın|a|da|dan|la|lar|lık)+(\\s|$)', //mücerret kız hariç bunun türevleri; kızınca, kızarmak hariç
		'porno', 'otuzbir', 'mastürbasyon', 'orgazm', 'tecavüz', //edepsiz tanımlar
		'seks', 'sex', 'seviş', 'öpüş', //cinsellik eylemleri; çok göze batarsa: '\\bboşal'
		'(^|\\s)pipi', '(^|\\s)penis', '(^|\\s)yarr?a(k|ğ)', '(^|\\s)taşş?ak', '(^|\\s)sik', //erkek cinsellik uzuvları; olmayarak hariç
		'(^|\\s)meme', '(^|\\s)göğüs', '(^|\\s)göğsü', //kadın cinsellik uzuvları; memet, göğüs hastalıkları, tavuk göğsü(%50) dahil
		'(^|\\s)am(\\s|$)', '(^|\\s)am(c(?!a)|d|ı|l|s)', '(^|\\s)amina\\s', //laubaliliğin daniskası
		'(^|\\s)sperm', 'vajina', //jinekoloji terimleri
		'(^|\\s)mayo', 'sütyen', //kadın iç giysileri
		'(^|\\s)çekici', //kadın sıfatları; çekici tamir etmek dahil
		'\\(reklam\\)'];

    for (var i = 0, len = listElements.length; i < len; i++) {
        blacklister(listElements[i], blacklist);
    }
}

//Add a message to show it works.
function addCleansedMessageTo(paginationDiv) {
	var cleansedMessage = document.createElement('div');
	cleansedMessage.id = "cleansedMessage";
	cleansedMessage.innerHTML = "arındırıldı";
	cleansedMessage.setAttribute("class", "cleansedMessage");
	cleansedMessage.addEventListener("click", function() {
		var m = document.getElementById("cleansedMessage");
		if (m.innerHTML == "arındırıldı") {
			var blacks = document.getElementsByClassName("black");
			for (var i = blacks.length -1; i >= 0; --i) 
				blacks[i].className = blacks[i].className.replace('black', 'white');
			m.innerHTML = "arındırılmadı";
		}
		else {
			var whites = document.getElementsByClassName("white");
			for (var i = whites.length -1; i >=0 ; --i)
				whites[i].className = whites[i].className.replace('white', 'black');
			m.innerHTML = "arındırıldı";
		}
	}, false);
	paginationDiv.appendChild(cleansedMessage);
}

//Manage sanitizing events for recognized dictionaries.
function sanitize() {
	//Add styles to be used.
	GM_addStyle(".black { display: none !important; }");
	GM_addStyle(".white { text-decoration: underline; }");
	GM_addStyle(".cleansedMessage { margin: 0px 15px 0px 15px }");

	//Check if it is in the URL to recognize the dictionary.
	function loc(URLfraction) {
		if (window.location.href.indexOf(URLfraction) > -1) return true; else return false;
	}
	
	//Ekşi Sözlük
	if (loc("eksisozluk.com")) {
		if (loc("/index.asp")) { //frame
			sanitizeLeftFrame(document.getElementsByClassName('index')[0].childNodes);
			addCleansedMessageTo(document.getElementsByClassName('pagi')[0]);
		}
		else if (loc("/show.asp")) { //definitions
			document.getElementsByClassName("rel-vid")[0].style.display = "none"; //related videos
			document.getElementsByTagName("iframe")[0].style.display = "none"; //facebook thing
		}
		else if (loc("beta.")) { //beta
			//Beta needs some more style
			GM_addStyle(".cleansedMessage { font-family: Verdana; font-size: 12px; color: black; margin: 9px 0px 0px 0px; float: right; }");
			GM_addStyle("#aside { display: none; }"); //related videos and facebook thing
			
			//bugun and gundem pages have two lists while other have one.
			var topiclists = document.getElementsByClassName('topic-list')
			for (var i = 0; i < topiclists.length; i++) { sanitizeLeftFrame(topiclists[i].getElementsByTagName('li')); }
			addCleansedMessageTo(document.getElementById("partial-index").getElementsByTagName("h2")[0]);
			
			//Use MutationObserver to detect ajaxy refresh. FF14 and above
			if (window.MutationObserver) {
				var target = document.getElementById('partial-index');
				var observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						//console.log(mutation.type);
						if (mutation.addedNodes.length > 1) { //0 if deleted, 1 if loading text appeared
							var topiclists = document.getElementsByClassName('topic-list')
							for (var i = 0; i < topiclists.length; i++) { sanitizeLeftFrame(topiclists[i].getElementsByTagName('li')); }
							addCleansedMessageTo(document.getElementById("partial-index").getElementsByTagName("h2")[0]);
						}
					});
				});
				var config = { childList: true }
				observer.observe(target, config);
			}
			//Handle browsers which are not as modern as eksisozluk.
			else {
				function runSanitizer() {
					if (document.getElementById('cleansedMessage') == null) {
						var topiclists = document.getElementsByClassName('topic-list')
						for (var i = 0; i < topiclists.length; i++) { sanitizeLeftFrame(topiclists[i].getElementsByTagName('li')); }
						if (document.getElementById('cleansedMessage') == null) //check again
						addCleansedMessageTo(document.getElementById("partial-index").getElementsByTagName("h2")[0]);
					}
				}
				document.getElementById('partial-index').addEventListener ('DOMSubtreeModified', runSanitizer, false);
			}
		}
	}
	
	//Uludağ Sözlük
	else if (loc("uludagsozluk.com")) {
		if (loc("/liste.php")) { //frame
			sanitizeLeftFrame(document.getElementsByClassName('li'));
			addCleansedMessageTo(document.getElementsByTagName('select')[0].parentNode);
		}
		else if (loc("goster.php") || loc("/k/")) { //definitions
			sanitizeLeftFrame(document.getElementsByClassName('li'));
			addCleansedMessageTo(document.getElementsByTagName('input')[0].parentNode);
		}
	}
	
	//İtü Sözlük
	else if (loc("itusozluk.com")) {
		sanitizeLeftFrame(document.getElementById('solframe').childNodes);
		addCleansedMessageTo(document.getElementsByClassName('pg')[0]);
		
		//A function named ajaxloader fires when the left frame is refreshed.
		//So, inject sanitizeLeftFrame into ajaxloader function of page.
		unsafeWindow.sanitizeLeftFrameOnPage = function() {
			sanitizeLeftFrame(document.getElementById('solframe').childNodes);
			addCleansedMessageTo(document.getElementsByClassName('pg')[0]);
		};
		//http://stackoverflow.com/questions/1659219/add-to-a-javascript-function
		unsafeWindow.ajaxloader = (function (originalFn) {
			return function () {
				originalFn.apply(originalFn, arguments);
				unsafeWindow.sanitizeLeftFrameOnPage();
			};
		})(unsafeWindow.ajaxloader);
	
	//Nothing else.
	}
}

//Initialize.
function initialize() {
	try {
		removeAdCss();
		sanitize();
	}
	catch (err) {
		//console.log(err.message);
	}
};

initialize();