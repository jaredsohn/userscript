// ==UserScript==
// @name          Eniro.se telephone number large type
// @namespace     http://henrik.nyh.se
// @description   Adds links to display telephone numbers in large type from Eniro.se, so you can read them from across the room. Inspired by a similar feature in the OS X Address Book. Click the number (with an eye icon) to display large type; click anywhere or press any key to hide.
// @include       http://*eniro.se/*
// ==/UserScript==

/* TODO
 + Enable for hitta.se
 + A general large type script (for highlighted text)?
*/


var xp_eniro = "//text()";
var re_phone_number = /(.*?)(0\d{1,3}(?:-| - )[\d ]{4,}\d)(.*)/;

// Icon from http://www.famfamfam.com/lab/icons/silk/
// data: URI by http://software.hixie.ch/utilities/cgi/data/data
var eye_icon = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%80IDAT8%CB%C5SKO%13Q%14%FE%EEt%3A%7DL!-%15%2C%E5%A1%40pc%81T%17FcT6%2CL4%B0%D3%F8%23%5C%18%A2%FE%096%1A6nt%EDF%E3%03%8D%2B%8D%02%1AD%12D%A4%F2n%A1%80%7DQ%DA%E9%DC%B93%F7z%5B%03!q%C9%C2%93%7C%8B%93%7B%BE%2F%DF%B9%E7%1C%22%84%C0QB%C1%11C%3D%9C%AC%AF%AF_t%F1%CA%7DR%C9%F5%C32%7C%84%DB%80%23%C1%1D%10%E2%A2%D0%C3S%3C%D8~%2F%1A%8D~%DC%E7%90%FD%16R%A9%D4%13We%E7%86B%B3%9A%A6%A8%60%96%89B%3E%0F%DB%B2%E0q%01%8Du%3A%1CFas%C9h%89%BFl%EA%8A%5D%3F%10%90%E4%B7%AE%C2%D2%80%06%86%D4%E6%26%92%E9%1CL%12%00%F3D%C0%1C%02%CB%E6%D0%EDmD%B1%89X%5B%18%8At%C4%A3%BD%B3%E1%9E%2B%BD%EA%DA%DA%DA%88fl%0Ch%BC%82%D9%C4*%B4%13%97a%E8%CD%60%D29e%02%A6%04e%1C%3B%96%14i%D5%90%DD%7B%05%BD%B4%82%C0%CADO%8Ax%1F%93%D4%E2%EC%16%C9'%8E%EF%8A%20%BA%E3%9706m%A0%60%F0%1Ay%F8V%1F%84%E0%18%1E%FD%26%858%BCn%82%BBC%0D%C8%CC%7F%06%FF%3E%86L%C9%B6U%96%5Bn%F2E%FA%D0%D1%D8R%FB%8B*%D1%A0%0E%A8t%208%AF%09%18%96%CC)%97%FD%FE%1DZ%B0%FB%2C%CA%FEz%B0%17%A3%AA%EAn%8Aq-%10r9%8E%03EQ%10%AE%03%92Y%07%A6%B4%7C%FB%C1%17PK%0AV%EC%9A%83%D3%ED~p)Z%ABmhE%A83%26%14Q%DC(%B2%E26l%DB%06c%0C%EDa%05%01%8D%A3l0%94%25%B1l2%94%24%8E%05%08%E2'%D5ZM%B5%96%A6%97%A0%146%98%C2%7D%E1%A7b%EB%07%AC%E4%0Ch1%83%B0%EE%E0%5C%97%82S%11%01UP%B8a!%DEFp%ED%8C%26%DB%94%13)%17A%17%3E%81%BD%7F%84%B4%E5%FDZ%1Bcbfr%DC%9F%9D%3B%EFS%09D%A8%23%0F%BD%D1%84%1E%B2%A0z%F8%FE%C2T%EB%C4%EF%15%2F_%9El%B6%92sX0%03i%23%F5%B3%E5%60%91%A6%3E%BC%7Bnm%25%AEF%C8%AE%1A%F0%7B%01O%3D%B8%DB%8F%EAsu%23%EDR%1E%D8%5E%C4j%A6%24%F6%82%9DS%F4%D7%C4%85%C1%91%D769%7CL%E3%A3w%3C%B9%DD%D2%20%A5tH%9A%E9%D7%08%02.8%92%EF%F0%8AiNK%3C%23%9C%8F%DD%7C%F8f%FE%9FU%FEo%D7%F8%07m%ADl%A8%60e%9AA%00%00%00%00IEND%AEB%60%82";

var tooltip = "Display this number in large type.";

GM_addStyle(
	".gmonkey_phone_number {background: url(\""+eye_icon+"\") no-repeat center right; padding-right:22px}" + 
	"#gmonkey_enlarged {font: 90px 'Lucida Grande',sans-serif; font-weight:bold; background:#000; color:#FFF; opacity:0.8; padding:20px; -moz-border-radius:20px; position:fixed; display:none;}"
);


/* Eniro */

with_each(xp_eniro, function(font) {
	if (!(match = font.nodeValue.match(re_phone_number))) return;

	font.parentNode.insertBefore(document.createTextNode(match[1]), font);

	var link = document.createElement("a");
	link.className = "gmonkey_phone_number";	
	link.href = 'javascript:void("' + tooltip + '")';
	link.title = tooltip;
	link.addEventListener("click", enlarge_me, false);
	link.appendChild(document.createTextNode(match[2]));
	font.parentNode.insertBefore(link, font);

	font.parentNode.insertBefore(document.createTextNode(match[3]), font);

	font.parentNode.removeChild(font);
});


/* OSD */

var enlarged = document.createElement("div");
enlarged.id = "gmonkey_enlarged";
document.body.appendChild(enlarged);

document.addEventListener("keypress", hide_enlarge, false);
document.addEventListener("click", hide_enlarge, false);

function enlarge_me(e) {
	enlarged.innerHTML = this.innerHTML;
	enlarged.style.display = 'block';
	
	var bs = getComputedStyle(document.body, '');
	var widthWithoutScrollbar = parseInt(bs.getPropertyValue("width"), 10) + parseInt(bs.getPropertyValue("margin-left"), 10) + parseInt(bs.getPropertyValue("margin-right"), 10);
	
	// Set the maximum font size that fits
	enlarged.style.fontSize = '30px';
	while (enlarged.clientWidth+40 <= widthWithoutScrollbar)
		enlarged.style.fontSize = (parseInt(enlarged.style.fontSize) + 3) + "px";
	
	enlarged.style.top = ((window.innerHeight - enlarged.clientHeight) / 2) + 'px';
	enlarged.style.left = ((widthWithoutScrollbar - enlarged.clientWidth) / 2) + 'px';
	
	// Don't bubble that divvle
	e.stopPropagation();
}

function hide_enlarge() {
	enlarged.style.display = 'none';
}


/* Utility functions */
	
function $x(xpath, root) {  // From Johan Sundström
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate(xpath, root||doc, null, null, null), result = [];
	while(next = got.iterateNext())
		result.push(next);
	return result;
}
function with_each(xpath, cb, root) {
	var results = $x(xpath, root);
	for (var i = 0, j = results.length; i < j; i++)
		cb(results[i]);
}