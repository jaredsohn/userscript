// ==UserScript==
// @name        MyColor
// @namespace	http://userscripts.org/users/516325
// @include		http://*/showthread.php*
// @include		http://*/newreply.php*
// @include		http://*/editpost.php*
// @include		http://*/newthread.php*
// @include		http://*/private.php*
// @version		6.5
// @grant 		none
// @description Made by Skyfall.
// ==/UserScript==
/*tùy chọn*/
//size = 2 là kích thước chữ mặc định
//color = black là mặc định. 
//Màu có thể ở dạng hex, ví dụ #0088FA, nhưng PHẢI ở trong ngoặc kép
var SIZE = 3;
var COLOR = "darkblue";
var ur = document.URL;
// giá trị 1 là bật, 0 là tắt.
var changeSize = 1;
var changeColor = 1;
var inDam = 0;
var inNghieng = 0;
var gachChan = 0;
/* hết tùy chọn */
var siteNormal = [ "vozforums" ];
var siteAjax = [ "forum.gamevn.com",
		"forum.xda-developers.com" ];
var type = 0;
var sizeDefault = false;
var colorDefault = false;
var imageRequire = [ "http://i.imgur.com/3FkEHBT.jpg",
		"http://i.imgur.com/g81xK2T.jpg",
		"http://i.imgur.com/31w35Kq.jpg",
		"http://i.imgur.com/cE3vo3J.jpg",
		"http://i.imgur.com/OXy2F7f.jpg",
		"http://i.imgur.com/PBEgXaB.jpg",
		"http://i.imgur.com/5D4tsc9.jpg",
		"http://i.imgur.com/OurXGE1.jpg",
		"http://i.imgur.com/Nwz0OLl.jpg",
		"http://i.imgur.com/Od2OP6C.jpg",
		"http://i.imgur.com/2Qe744A.jpg",
		"http://i.imgur.com/nJrpC3o.jpg",
		"http://i.imgur.com/baEfTsV.jpg",
		"http://i.imgur.com/JAf4UnP.jpg",
		"http://i.imgur.com/7jDKFdp.jpg",
		"http://i.imgur.com/qxa9nrl.jpg",
		"http://i.imgur.com/74jXzwF.jpg",
		"http://i.imgur.com/8HzCnLf.jpg",
		"http://i.imgur.com/maHnkmn.jpg",
		"http://i.imgur.com/iI9V2jm.jpg",
		"http://i.imgur.com/z7gwSUF.jpg",
		"http://i.imgur.com/x5vREGp.jpg",
		"http://i.imgur.com/A0lYTOn.jpg",
		"http://i.imgur.com/nl5Wkeo.jpg",
		"http://i.imgur.com/jyMrxp6.jpg",
		"http://i.imgur.com/AzWyumh.jpg",
		"http://i.imgur.com/k1qD4Pw.jpg",
		"http://i.imgur.com/hnvn68m.jpg",
		"http://i.imgur.com/7K6OAXE.jpg",
		"http://i.imgur.com/oC5rhVc.jpg",
		"http://i.imgur.com/kP7cAfa.jpg",
		"http://i.imgur.com/hK1Ynzi.jpg",
		"http://i.imgur.com/3PaHSqS.jpg",
		"http://i.imgur.com/qs7nQUH.jpg",
		"http://i.imgur.com/7AusZ68.jpg",
		"http://i.imgur.com/MAqmY7d.jpg",
		"http://i.imgur.com/vEuUIHh.jpg",
		"http://i.imgur.com/3WC8zcA.jpg",
		"http://i.imgur.com/FuffCWL.jpg",
		"http://i.imgur.com/zRO91nF.jpg",
		"http://i.imgur.com/I9PyGjL.jpg",
		"http://i.imgur.com/xe0Zsc2.jpg",
		"http://i.imgur.com/iJMdBsm.jpg",
		"http://i.imgur.com/QLf8Lg2.jpg",
		"http://i.imgur.com/nfv2kD9.jpg",
		"http://i.imgur.com/AI7CUxC.jpg",
		"http://i.imgur.com/VqE6xBF.jpg",
		"http://i.imgur.com/QZP1CCd.jpg",
		"http://i.imgur.com/fmM62vB.jpg",
		"http://i.imgur.com/eV4q7KQ.jpg",
		"http://i.imgur.com/FEdfd2H.jpg",
		"http://i.imgur.com/BqWt5J4.jpg",
		"http://i.imgur.com/1RgVs1f.jpg",
		"http://i.imgur.com/QAIootM.jpg",
		"http://i.imgur.com/41GNoim.jpg",
		"http://i.imgur.com/TkuM6fY.jpg",
		"http://i.imgur.com/iGWsbcB.jpg",
		"http://i.imgur.com/36BaRSP.jpg",
		"http://i.imgur.com/OEYgNwn.jpg",
		"http://i.imgur.com/TRpxZ9F.jpg",
		"http://i.imgur.com/hs7B9YA.jpg",
		"http://i.imgur.com/k6I443f.jpg",
		"http://i.imgur.com/Uztw3yW.jpg",
		"http://i.imgur.com/Nm7Jgo1.jpg",
		"http://i.imgur.com/4HixWYK.jpg",
		"http://i.imgur.com/lDUbRhE.jpg",
		"http://i.imgur.com/AIJQPBP.jpg",
		"http://i.imgur.com/KUL8Odg.jpg",
		"http://i.imgur.com/lZpJSMa.jpg",
		"http://i.imgur.com/eqSpd6b.jpg",
		"http://i.imgur.com/bA05SRR.jpg",
		"http://i.imgur.com/FWJHvSR.jpg",
		"http://i.imgur.com/FP2yfa7.jpg",
		"http://i.imgur.com/XY9hsZB.jpg",
		"http://i.imgur.com/hSXpF6c.jpg",
		"http://i.imgur.com/ZCPYzmV.jpg",
		"http://i.imgur.com/B5kj1f3.jpg",
		"http://i.imgur.com/Na9kW9D.jpg",
		"http://i.imgur.com/ldHooEv.jpg",
		"http://i.imgur.com/v6b4mjU.jpg",
		"http://i.imgur.com/XhmZvLM.jpg",
		"http://i.imgur.com/kP4AnsG.jpg",
		"http://i.imgur.com/3f1uGJk.jpg",
		"http://i.imgur.com/vny9SjO.jpg",
		"http://i.imgur.com/s4iYqwr.jpg",
		"http://i.imgur.com/Rs7seB2.jpg",
		"http://i.imgur.com/zCwDofE.jpg",
		"http://i.imgur.com/qDWe9pr.jpg",
		"http://i.imgur.com/Sv8feYO.jpg",
		"http://i.imgur.com/dzqMcLO.jpg",
		"http://i.imgur.com/ii3Ig7P.jpg",
		"http://i.imgur.com/eCmEoAM.jpg",
		"http://i.imgur.com/rZc3Z6M.jpg",
		"http://i.imgur.com/CSkqkHE.jpg",
		"http://i.imgur.com/mok65cX.jpg",
		"http://i.imgur.com/dHi59XJ.jpg",
		"http://i.imgur.com/Kze38qd.jpg",
		"http://i.imgur.com/lPzGTbO.jpg",
		"http://i.imgur.com/Mmp4Ipo.jpg",
		"http://i.imgur.com/2nxLYdC.jpg",
		"http://i.imgur.com/MPouUUi.jpg",
		"http://i.imgur.com/etMRXTc.jpg",
		"http://i.imgur.com/mmvP0B1.jpg",
		"http://i.imgur.com/dRBtBM7.jpg",
		"http://i.imgur.com/Hw0GJTo.jpg",
		"http://i.imgur.com/iQCwXm3.jpg",
		"http://i.imgur.com/whizmgn.jpg",
		"http://i.imgur.com/WP8HaTp.jpg",
		"http://i.imgur.com/1AGHiiD.jpg",
		"http://i.imgur.com/xruZJEp.jpg",
		"http://i.imgur.com/fXWHC2x.jpg",
		"http://i.imgur.com/aQI87L2.jpg",
		"http://i.imgur.com/yppHFAF.jpg",
		"http://i.imgur.com/bguTHHN.jpg",
		"http://i.imgur.com/02TZObD.jpg",
		"http://i.imgur.com/ohs7yku.jpg",
		"http://i.imgur.com/uIQIlO6.jpg",
		"http://i.imgur.com/UXqlV11.jpg",
		"http://i.imgur.com/cnPo7Tf.jpg",
		"http://i.imgur.com/XVuKYKz.jpg",
		"http://i.imgur.com/2riQvho.jpg",
		"http://i.imgur.com/fmu1HV1.jpg",
		"http://i.imgur.com/FHnOrVn.jpg",
		"http://i.imgur.com/6qgRXSF.jpg",
		"http://i.imgur.com/4BoxxWL.jpg",
		"http://i.imgur.com/xujxDbI.jpg",
		"http://i.imgur.com/VRDMWmc.jpg",
		"http://i.imgur.com/ybqpiXL.jpg",
		"http://i.imgur.com/kxojmYK.jpg",
		"http://i.imgur.com/t8Wb73o.jpg",
];
var imageSign = "==-==-==-==-==-==-==";
var choice = Math.random();
if (SIZE == 2)
	sizeDefault = true;
if (COLOR.toUpperCase() == "BLACK" || COLOR == "#000000")
	colorDefault = true;
// tắt bộ gõ tích hợp trên gvn
if (ur.indexOf("gamevn") >= 0)
	AVIMObj.setMethod(-1);
function siteType() {
	var i = 0;
	for (i = 0; i < siteAjax.length; i++)
		if (document.URL.indexOf(siteAjax[i]) >= 0)
			if (document.URL.indexOf("showthread.php?") >= 0)
				return 3;
			else return 2;
	for (i = 0; i < siteNormal.length; i++)
		if (document.URL.indexOf(siteNormal[i]) >= 0)
			return 1;
	return 0;
}
// xóa hết ký tự trắng ở đầu và cuối
function clearWhite(s) {
	while (/^(\s|<br>|&nbsp;)+/i.test(s))
		s = s.replace(/^(\s|<br>|&nbsp;)+/i, "");
	while (/(\s|<br>|&nbsp;)+$/i.test(s))
		s = s.replace(/(\s|<br>|&nbsp;)+$/i, "");
	return s;
}
function appendCode(s, editorType) {
	var bString = "";
	var eString = "";
	if (inDam == 1) {
		bString = "[b]" + bString;
		eString = eString + "[/B]";
	}
	if (inNghieng == 1) {
		bString = "[i]" + bString;
		eString = eString + "[/I]";
	}
	if (gachChan == 1) {
		bString = "[u]" + bString;
		eString = eString + "[/U]";
	}
	if (changeColor == 1 && !colorDefault) {
		bString = "[coloR=" + COLOR + "]" + bString;
		eString = eString + "[/coloR]";
	}
	if (changeSize == 1 && !sizeDefault) {
		bString = "[sizE=" + SIZE + "]" + bString;
		eString = eString + "[/sizE]";
	}
	s = clearWhite(s);
	re = /^(\[quote(.*?;\d*'?)?\][\s\S]*?\[\/quote\](\s|<br>|&nbsp;)*)+/i;
	var s1 = s.match(re);
	if (s1 != null) {
		s = s.replace(re, "");
		s1[0] = clearWhite(s1[0]);
	}
	re = /(\[quote(.*?;\d*'?)?\][\s\S]*?\[\/quote\](\s|<br>|&nbsp;)*)+$/i;
	var s2 = s.match(re);
	if (s2 != null) {
		s = s.replace(re, "");
		s2[0] = clearWhite(s2[0]);
	}
	s = clearWhite(s);
	re = new RegExp(eString.replace(/[\/\[\]]/g, "\\$&"), "g");
	s = s.replace(re, "");
	re = new RegExp(bString.replace(/[\/\[\]]/g, "\\$&"), "g");
	s = s.replace(re, "");
	s = bString + s + girl_xinh(s) + eString;
	var myNewline = "";
	if (editorType == "standard")
		myNewline = "\n";
	else myNewline = "<br>";
	if (s1 != null)
		s = s1[0] + myNewline + myNewline + s;
	if (s2 != null)
		s = s + myNewline + s2[0];
	return s;
}
function girl_xinh(s) {
	var s1 = "";
	var term = /From F17 With Love.*?Thread Girl/i;
	var check = /vozforums\.com/i.test(ur);
	if (check) {
		check = false;
		var formList = document.getElementsByClassName("navbar");
		// alert("List length = "+formList.length);
		for ( var i = 0; i < formList.length; i++)
			if (term.test(formList[i].innerHTML)) {
				check = true;
				// alert("Found: "+check);
				break;
			}
	}
	if (check) {
		var hasImage = /\[img\]http.+\[\/img\]/i.test(s);
		// alert(hasImage);
		if (!hasImage) {
			/*
			 * alert("Begin"); var result = GM_xmlhttpRequest({ method: "GET",
			 * url:
			 * "http://www.random.org/integers/?num=1&min=1&max="+imageRequire.length+"&col=1&base=10&format=plain&rnd=new",
			 * synchronous: true }); choice = parseInt(result.responseText)-1;
			 */
			choice = Math.floor(Math.random() * imageRequire.length);
			// alert("Choice: "+choice);
			s1 = "\n\n[center]" + imageSign + "\n[IMG]" + imageRequire[choice] + "[/IMG][/center]";
		}
	}
	return s1;
}
function form_submit() {
	var arText = document.getElementsByTagName('textarea');
	if (inDam == 1 || inNghieng == 1 || gachChan == 1 || (!sizeDefault && changeSize == 1) || (!colorDefault && changeColor == 1)) {
		arText[arText.length - 1].value = appendCode(arText[arText.length - 1].value, "standard");
	}
	form._submit();
}
function editMode(e) {
	if (e.target.id.match(/vb_editor_qe.+?save|qr_submit/i)) {
		var arText = document.getElementsByTagName("textarea");
		for ( var i = 0; i < arText.length; i++)
			if (arText[i].value.match(/^\s*$/) == null)
				arText[i].value = appendCode(arText[i].value, "standard");
	}
}
type = siteType();
if (type == 1 || type == 2)
	window.addEventListener('submit', form_submit, true);
if (type == 3)
	window.addEventListener('click', editMode, true);