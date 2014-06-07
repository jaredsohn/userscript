// ==UserScript==
// @name          Fake Nhanh NE-FF
// @description   Click vào link trong LinkBunch, không cần thao tác gì khác.
// @include       http://*.travian.com.vn/a2b.php*

// ==/UserScript==
//  t1:	 * Lê Dương		* Lính Chùy		* Linh Pha Lăng
//  t2:	 * Thị Vệ		* Lính Giáo		* Kiếm Sĩ
//  t3:	 * C.B.T.N		* Lính Rìu		* Do Thám Gauls
//  t4:	 * KB Do Tham		* Do Tham		* Ky Binh Sam Set
//  t5:	 * Ky Binh		* Hiep Si Paladin	* Tu Si
//  t6:	 * KB Tinh Nhue		* Ky Si Teutonic	* Ky Binh
//  t7:	 * Xe Cong Thanh	* Doi Cong Thanh	* May Nen
//  t8:	 * Máy Phóng Lửa	* Máy Bắn Đá		* Máy Bắn Đá
//  t9:	 * Nguyen Lao		* Thu Linh		* Tu Truong
//  t10: * Dan Khai Hoang	* Dan Khai Hoang	* Dan Khai Hoang
//  t11: * Lai Buon		* Lai Buon		* Lai Buon

var faketroop = "t2";

function updateText(textname, textvalue) {
	var result = document.evaluate("//input[@name='" + textname + "']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (result) { 
		result.value = textvalue;
	}

}
function checkRadio(radioname, radiovalue) {

	var result = document.evaluate("//input[@type='radio' and @value='" + radiovalue + "']",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 

	if (result) { 
		result.checked = true;
	}

}


function xpathToList(query, startNode) {
	if (!startNode) startNode = document;
        return document.evaluate(query, startNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathToFirstFound(query, startNode) {
	if (!startNode) startNode = document;
        return document.evaluate(query, startNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

if (document.URL.indexOf('a2b.php?z=') > -1 ) {
	updateText(faketroop,"1");
	checkRadio("c","3");
	setTimeout(document.getElementById("btn_ok").click(), 5000*Random());
}
setTimeout(document.getElementById("btn_ok").click(), 5000*Random());