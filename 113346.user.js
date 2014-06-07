// ==UserScript==
// @name Emoticons Input
// @namespace http://huynh-nhat-ha.blogspot.com
// @description Insert Emoticons and Links on Blogspot Popup Comments Form
// @include *blogger.com/comment.g*
// @include *blogger.com/comment.do
// @include *blogspot.com*
// ==/UserScript==
function $()
{
  for( var i = 0, node; i < arguments.length; i++ )
    if( node = document.getElementById( arguments[i] ) )
      return node;
}
function replaceText() {
	var txtArea = $('comment-body');
	var startPos = txtArea.selectionStart;
	var endPos = txtArea.selectionEnd;
	strSelect = txtArea.value.substring(startPos, endPos);
	switch(this.id) {
		case 'cm_bold':
			strSelect = "<b>"+strSelect+"</b>";
			txtArea.value = txtArea.value.substring(0, startPos) + strSelect + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cm_italic':
			strSelect = "<i>"+strSelect+"</i>";
			txtArea.value = txtArea.value.substring(0, startPos) + strSelect + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cm_href':
			var url = prompt("Enter the link", "http://");
			if (url!=null) {
				strSelect = "<a href=\""+url+"\">"+strSelect+"</a>";
			}
			txtArea.value = txtArea.value.substring(0, startPos) + strSelect + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cm_hehehe':
			txtArea.value = txtArea.value.substring(0, endPos) + ":1) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cm_honhon':
			txtArea.value = txtArea.value.substring(0, endPos) + ":2) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cm_uauaua':
			txtArea.value = txtArea.value.substring(0, endPos) + ":3) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cm_nhinne':
			txtArea.value = txtArea.value.substring(0, endPos) + ":4) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cm_votay':
			txtArea.value = txtArea.value.substring(0, endPos) + ":5) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cm_tatbop':
			txtArea.value = txtArea.value.substring(0, endPos) + ":6) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_roile':
			txtArea.value = txtArea.value.substring(0, endPos) + ":7) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_money':
			txtArea.value = txtArea.value.substring(0, endPos) + ":8) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_leuleu':
			txtArea.value = txtArea.value.substring(0, endPos) + ":9) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_lacdau':
			txtArea.value = txtArea.value.substring(0, endPos) + ":A) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_khocrong':
			txtArea.value = txtArea.value.substring(0, endPos) + ":B) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_idontknow':
			txtArea.value = txtArea.value.substring(0, endPos) + ":C) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_hihihi':
			txtArea.value = txtArea.value.substring(0, endPos) + ":D) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_damotphat':
			txtArea.value = txtArea.value.substring(0, endPos) + ":E) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_cuoilon':
			txtArea.value = txtArea.value.substring(0, endPos) + ":F) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_cungly':
			txtArea.value = txtArea.value.substring(0, endPos) + ":G) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_chemgio':
			txtArea.value = txtArea.value.substring(0, endPos) + ":H) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_battay':
			txtArea.value = txtArea.value.substring(0, endPos) + ":I) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_ananan':
			txtArea.value = txtArea.value.substring(0, endPos) + ":J) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_byyeee':
			txtArea.value = txtArea.value.substring(0, endPos) + ":K) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_nhoclinh':
			txtArea.value = txtArea.value.substring(0, endPos) + ":L) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_alo':
			txtArea.value = txtArea.value.substring(0, endPos) + ":M) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_shutup':
			txtArea.value = txtArea.value.substring(0, endPos) + ":N) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_yeulamdo':
			txtArea.value = txtArea.value.substring(0, endPos) + ":O) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_datbom':
			txtArea.value = txtArea.value.substring(0, endPos) + ":P) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;

	}
	txtArea.focus();
	txtArea.setSelectionRange(endPos+3,endPos+3);
}

function addSmiley(){
  var d = $('comments-block');
        d.innerHTML = d.innerHTML.replace(/\s:-*1\)/g, ' <img src="http://2.bp.blogspot.com/_XwhCottp9-E/TTmbVU_kkAI/AAAAAAAAAEk/i8I-QCsR-SU/s1600/49.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s;-*2\)/g, ' <img src="http://4.bp.blogspot.com/_XwhCottp9-E/TTmb0X8B7dI/AAAAAAAAAEo/kIL3qY4z64c/s1600/102.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*3\)/g, ' <img src="http://2.bp.blogspot.com/_XwhCottp9-E/TTmcTfeKNWI/AAAAAAAAAEs/diNANNZkMyQ/s1600/113.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*4\)/g, ' <img src="http://1.bp.blogspot.com/_XwhCottp9-E/TTmc01yNOUI/AAAAAAAAAEw/Zn6dL8OwwTo/s1600/93.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*5\)/g, ' <img src="http://3.bp.blogspot.com/_XwhCottp9-E/TTmdWcMGnWI/AAAAAAAAAE0/akbkAp24xLQ/s1600/61.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*6\)/g, '<img src="http://3.bp.blogspot.com/_XwhCottp9-E/TTmd6T7Xn4I/AAAAAAAAAE4/U0uh6Hoq_sI/s1600/134.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*7\)/g, '<img src="http://3.bp.blogspot.com/_XwhCottp9-E/TTmehTlZqII/AAAAAAAAAFA/l_mADXotyKQ/s1600/39.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*8\)/g, '<img src="http://3.bp.blogspot.com/_XwhCottp9-E/TTme6tBMcOI/AAAAAAAAAFE/DAolMctYPqw/s1600/106.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*9\)/g, '<img src="http://3.bp.blogspot.com/_XwhCottp9-E/TTmfX20J-yI/AAAAAAAAAFI/tII_6K4KRCQ/s1600/43.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*A\)/g, '<img src="http://3.bp.blogspot.com/_XwhCottp9-E/TTmf1ADx2fI/AAAAAAAAAFM/TKSlxW-3sck/s1600/111.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*B\)/g, '<img src="http://2.bp.blogspot.com/_XwhCottp9-E/TTmg0FnIr4I/AAAAAAAAAFQ/D7j1I62S9Qk/s1600/48.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*C\)/g, '<img src="http://2.bp.blogspot.com/_XwhCottp9-E/TTmhNLMIPgI/AAAAAAAAAFU/gDc0r27mvVE/s1600/54.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*D\)/g, '<img src="http://4.bp.blogspot.com/_XwhCottp9-E/TTmhqcoiABI/AAAAAAAAAFY/USDzcaOHCUA/s1600/63.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*E\)/g, '<img src="http://3.bp.blogspot.com/_XwhCottp9-E/TTmiEhF5zeI/AAAAAAAAAFc/jTXlR5srhac/s1600/100.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*F\)/g, '<img src="http://4.bp.blogspot.com/_XwhCottp9-E/TTmi8fWtW3I/AAAAAAAAAFg/whJrnaxVlMg/s1600/45.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*G\)/g, '<img src="http://1.bp.blogspot.com/_XwhCottp9-E/TTmjoGrMk2I/AAAAAAAAAFk/l6Qyx1zDYSw/s1600/77.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*H\)/g, '<img src="http://1.bp.blogspot.com/_XwhCottp9-E/TTmkKU7ogHI/AAAAAAAAAFo/Pz7Y8TFiuBY/s1600/86.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*I\)/g, '<img src="http://4.bp.blogspot.com/_XwhCottp9-E/TTmkoSLCwpI/AAAAAAAAAFs/yA9mJ4RIeig/s1600/94.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*J\)/g, '<img src="http://3.bp.blogspot.com/_XwhCottp9-E/TTmk8pAvkXI/AAAAAAAAAFw/_vZNhJpZWXk/s1600/83.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*K\)/g, '<img src="http://4.bp.blogspot.com/_XwhCottp9-E/TTmlWub0TUI/AAAAAAAAAF0/W9Rj1z_nx8U/s1600/59.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*L\)/g, '<img src="http://lh4.googleusercontent.com/-Jkm1_kmUV-o/TW3rxDgKE-I/AAAAAAAAAJ8/DPc2XyQXovg/s1600/soldierbaby.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*M\)/g, '<img src="http://lh4.googleusercontent.com/-JsBeD8OhIGA/TW3rqDDSGFI/AAAAAAAAAJw/IEVj5KX08c4/s1600/alo.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*N\)/g, '<img src="http://lh6.googleusercontent.com/-gIeSsZ94xUU/TW3ru9VpcFI/AAAAAAAAAJ4/H5esmIaOUBA/s1600/shutup.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*O\)/g, '<img src="http://lh6.googleusercontent.com/-fu3iaiaFn1Y/TW3ry-NJcrI/AAAAAAAAAKA/N_MUfucV_do/s1600/yeulam.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*P\)/g, '<img src="http://lh6.googleusercontent.com/-yLDJ0T3p65E/TW3rs-cFoAI/AAAAAAAAAJ0/aa8YOxeo3oc/s1600/datbomb.gif" id="new" /> ');

}

var qe=$('html-usage-msg');

var btnStyle=document.createElement('style');
btnStyle.type="text/css";
btnStyle.innerHTML=".btnstyle{border:1px solid whitesmoke;border-right:2px solid silver;border-bottom:2px solid silver;margin:3px;padding:3px 3px 0 3px;width:35px;height:35px;text-align:center;vertical-align:bottom;font-size:18px;float:left;cursor:pointer}.btnstyle:hover{border:1px solid whitesmoke;border-top:2px solid silver;border-left:2px solid silver;}";
insert=document.getElementsByTagName('head');
insert[0].appendChild(btnStyle);

qe.innerHTML="<div class=\"btnstyle\" id=\"cm_bold\"><b>b</b></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_italic\"><i>i</i></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_href\"><img src=\"http://www2.blogger.com/img/gl.link.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_hehehe\"><img src=\"http://2.bp.blogspot.com/_XwhCottp9-E/TTmbVU_kkAI/AAAAAAAAAEk/i8I-QCsR-SU/s1600/49.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_honhon\"><img src=\"http://4.bp.blogspot.com/_XwhCottp9-E/TTmb0X8B7dI/AAAAAAAAAEo/kIL3qY4z64c/s1600/102.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_uauaua\"><img src=\"http://2.bp.blogspot.com/_XwhCottp9-E/TTmcTfeKNWI/AAAAAAAAAEs/diNANNZkMyQ/s1600/113.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_nhinne\"><img src=\"http://1.bp.blogspot.com/_XwhCottp9-E/TTmc01yNOUI/AAAAAAAAAEw/Zn6dL8OwwTo/s1600/93.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_votay\"><img src=\"http://3.bp.blogspot.com/_XwhCottp9-E/TTmdWcMGnWI/AAAAAAAAAE0/akbkAp24xLQ/s1600/61.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_tatbop\"><img src=\"http://3.bp.blogspot.com/_XwhCottp9-E/TTmd6T7Xn4I/AAAAAAAAAE4/U0uh6Hoq_sI/s1600/134.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_roile\"><img src=\"http://3.bp.blogspot.com/_XwhCottp9-E/TTmehTlZqII/AAAAAAAAAFA/l_mADXotyKQ/s1600/39.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_money\"><img src=\"http://3.bp.blogspot.com/_XwhCottp9-E/TTme6tBMcOI/AAAAAAAAAFE/DAolMctYPqw/s1600/106.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_leuleu\"><img src=\"http://3.bp.blogspot.com/_XwhCottp9-E/TTmfX20J-yI/AAAAAAAAAFI/tII_6K4KRCQ/s1600/43.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_lacdau\"><img src=\"http://3.bp.blogspot.com/_XwhCottp9-E/TTmf1ADx2fI/AAAAAAAAAFM/TKSlxW-3sck/s1600/111.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_khocrong\"><img src=\"http://2.bp.blogspot.com/_XwhCottp9-E/TTmg0FnIr4I/AAAAAAAAAFQ/D7j1I62S9Qk/s1600/48.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_idontknow\"><img src=\"http://2.bp.blogspot.com/_XwhCottp9-E/TTmhNLMIPgI/AAAAAAAAAFU/gDc0r27mvVE/s1600/54.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_hihihi\"><img src=\"http://4.bp.blogspot.com/_XwhCottp9-E/TTmhqcoiABI/AAAAAAAAAFY/USDzcaOHCUA/s1600/63.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_damotphat\"><img src=\"http://3.bp.blogspot.com/_XwhCottp9-E/TTmiEhF5zeI/AAAAAAAAAFc/jTXlR5srhac/s1600/100.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_cuoilon\"><img src=\"http://4.bp.blogspot.com/_XwhCottp9-E/TTmi8fWtW3I/AAAAAAAAAFg/whJrnaxVlMg/s1600/45.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_cungly\"><img src=\"http://1.bp.blogspot.com/_XwhCottp9-E/TTmjoGrMk2I/AAAAAAAAAFk/l6Qyx1zDYSw/s1600/77.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_chemgio\"><img src=\"http://1.bp.blogspot.com/_XwhCottp9-E/TTmkKU7ogHI/AAAAAAAAAFo/Pz7Y8TFiuBY/s1600/86.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_battay\"><img src=\"http://4.bp.blogspot.com/_XwhCottp9-E/TTmkoSLCwpI/AAAAAAAAAFs/yA9mJ4RIeig/s1600/94.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_ananan\"><img src=\"http://3.bp.blogspot.com/_XwhCottp9-E/TTmk8pAvkXI/AAAAAAAAAFw/_vZNhJpZWXk/s1600/83.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_byyeee\"><img src=\"http://4.bp.blogspot.com/_XwhCottp9-E/TTmlWub0TUI/AAAAAAAAAF0/W9Rj1z_nx8U/s1600/59.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_nhoclinh\"><img src=\"http://lh4.googleusercontent.com/-Jkm1_kmUV-o/TW3rxDgKE-I/AAAAAAAAAJ8/DPc2XyQXovg/s1600/soldierbaby.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_alo\"><img src=\"http://lh4.googleusercontent.com/-JsBeD8OhIGA/TW3rqDDSGFI/AAAAAAAAAJw/IEVj5KX08c4/s1600/alo.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_shutup\"><img src=\"http://lh6.googleusercontent.com/-gIeSsZ94xUU/TW3ru9VpcFI/AAAAAAAAAJ4/H5esmIaOUBA/s1600/shutup.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_yeulamdo\"><img src=\"http://lh6.googleusercontent.com/-fu3iaiaFn1Y/TW3ry-NJcrI/AAAAAAAAAKA/N_MUfucV_do/s1600/yeulam.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_datbom\"><img src=\"http://lh6.googleusercontent.com/-yLDJ0T3p65E/TW3rs-cFoAI/AAAAAAAAAJ0/aa8YOxeo3oc/s1600/datbomb.gif\" /></div>";

var boldLink=$('cm_bold');
boldLink.addEventListener("click", replaceText, true);
var italicLink=$('cm_italic');
italicLink.addEventListener("click", replaceText, true);
var hrefLink=$('cm_href');
hrefLink.addEventListener("click", replaceText, true);
var smileLink=$('cm_hehehe');
smileLink.addEventListener("click", replaceText, true);
var kissLink=$('cm_honhon');
kissLink.addEventListener("click", replaceText, true);
var surpriseLink=$('cm_uauaua');
surpriseLink.addEventListener("click", replaceText, true);
var lookLink=$('cm_nhinne');
lookLink.addEventListener("click", replaceText, true);
var clapLink=$('cm_votay');
clapLink.addEventListener("click", replaceText, true);
var slapLink=$('cm_tatbop');
slapLink.addEventListener("click", replaceText, true);
var tearLink=$('cm_roile');
tearLink.addEventListener("click", replaceText, true);
var moneyLink=$('cm_money');
moneyLink.addEventListener("click", replaceText, true);
var leuLink=$('cm_leuleu');
leuLink.addEventListener("click", replaceText, true);
var lacdauLink=$('cm_lacdau');
lacdauLink.addEventListener("click", replaceText, true);
var cryLink=$('cm_khocrong');
cryLink.addEventListener("click", replaceText, true);
var kbietLink=$('cm_idontknow');
kbietLink.addEventListener("click", replaceText, true);
var hihiLink=$('cm_hihihi');
hihiLink.addEventListener("click", replaceText, true);
var kickLink=$('cm_damotphat');
kickLink.addEventListener("click", replaceText, true);
var laughLink=$('cm_cuoilon');
laughLink.addEventListener("click", replaceText, true);
var cunglyLink=$('cm_cungly');
cunglyLink.addEventListener("click", replaceText, true);
var chemgioLink=$('cm_chemgio');
chemgioLink.addEventListener("click", replaceText, true);
var battayLink=$('cm_battay');
battayLink.addEventListener("click", replaceText, true);
var eatLink=$('cm_ananan');
eatLink.addEventListener("click", replaceText, true);
var byeLink=$('cm_byyeee');
byeLink.addEventListener("click", replaceText, true);
var nhocLink=$('cm_nhoclinh');
nhocLink.addEventListener("click", replaceText, true);
var aloLink=$('cm_alo');
aloLink.addEventListener("click", replaceText, true);
var shutupLink=$('cm_shutup');
shutupLink.addEventListener("click", replaceText, true);
var loveLink=$('cm_yeulamdo');
loveLink.addEventListener("click", replaceText, true);
var datbomLink=$('cm_datbom');
datbomLink.addEventListener("click", replaceText, true);
window.addEventListener("load", addSmiley, true);
