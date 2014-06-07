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
		
case 'cm_hihihi':
			txtArea.value = txtArea.value.substring(0, endPos) + ":1) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_votay':
			txtArea.value = txtArea.value.substring(0, endPos) + ":2) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_cuoilon':
			txtArea.value = txtArea.value.substring(0, endPos) + ":3) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_leluoi':
			txtArea.value = txtArea.value.substring(0, endPos) + ":4) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_khocrong':
			txtArea.value = txtArea.value.substring(0, endPos) + ":5) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_cuoivuive':
			txtArea.value = txtArea.value.substring(0, endPos) + ":6) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_roile':
			txtArea.value = txtArea.value.substring(0, endPos) + ":7) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_kohieutaisao':
			txtArea.value = txtArea.value.substring(0, endPos) + ":8) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_lacdaukhongbiet':
			txtArea.value = txtArea.value.substring(0, endPos) + ":9) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_tromatngacnhien':
			txtArea.value = txtArea.value.substring(0, endPos) + ":A) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_chemgio':
			txtArea.value = txtArea.value.substring(0, endPos) + ":B) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_runso':
			txtArea.value = txtArea.value.substring(0, endPos) + ":C) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_tatphatne':
			txtArea.value = txtArea.value.substring(0, endPos) + ":D) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_hoamat':
			txtArea.value = txtArea.value.substring(0, endPos) + ":E) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_cuoichaynuocmat':
			txtArea.value = txtArea.value.substring(0, endPos) + ":F) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_tientien':
			txtArea.value = txtArea.value.substring(0, endPos) + ":G) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_bangbothuongtich':
			txtArea.value = txtArea.value.substring(0, endPos) + ":H) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_daphatne':
			txtArea.value = txtArea.value.substring(0, endPos) + ":I) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_honchutchut':
			txtArea.value = txtArea.value.substring(0, endPos) + ":K) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_yeulamdo':
			txtArea.value = txtArea.value.substring(0, endPos) + ":L) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_datbom':
			txtArea.value = txtArea.value.substring(0, endPos) + ":M) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_chaynuocmui':
			txtArea.value = txtArea.value.substring(0, endPos) + ":N) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_hoathomqua':
			txtArea.value = txtArea.value.substring(0, endPos) + ":O) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_uongcafe':
			txtArea.value = txtArea.value.substring(0, endPos) + ":P) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_khoamom':
			txtArea.value = txtArea.value.substring(0, endPos) + ":Q) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
case 'cm_giangho':
			txtArea.value = txtArea.value.substring(0, endPos) + ":Z) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
	}
	txtArea.focus();
	txtArea.setSelectionRange(endPos+3,endPos+3);
}

function addSmiley(){
  var d = $('comments-block');
        d.innerHTML = d.innerHTML.replace(/\s:-*1\)/g, ' <img src="https://lh5.googleusercontent.com/-u32QHaw7X1w/TnVk_WpGjmI/AAAAAAAACOQ/Civ06r_MyQM/1.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s;-*2\)/g, ' <img src="https://lh4.googleusercontent.com/-PF8ay08j1n8/TnVk80X7CYI/AAAAAAAACN8/TdAJ7MudKrY/2.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*3\)/g, ' <img src="https://lh5.googleusercontent.com/-pXhRJIeLmng/TnVk8l7BytI/AAAAAAAACN4/Rxhcq69MJJQ/3.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*4\)/g, ' <img src="https://lh3.googleusercontent.com/-KNz6VFCVMXI/TnVk_uF_MlI/AAAAAAAACOU/AxtHVnRr6fc/4.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*5\)/g, ' <img src="https://lh6.googleusercontent.com/-mF6yxVMNyq4/TnVk9DJsvmI/AAAAAAAACOA/4jeRiVI2VmY/5.giff" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*6\)/g, '<img src="https://lh4.googleusercontent.com/-yjCbuLFFLck/TnVk-WTNwuI/AAAAAAAACOE/sonNPiL_0Q4/6.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*7\)/g, '<img src="https://lh5.googleusercontent.com/-GgZ-2HX0mHY/TnVk-94AFvI/AAAAAAAACOI/Cqu36ZVj84k/7.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*8\)/g, '<img src="https://lh4.googleusercontent.com/-KtyZ486-zS8/TnVk_dH9DyI/AAAAAAAACOM/tRNnsyrUdcI/8.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*9\)/g, '<img src="https://lh4.googleusercontent.com/-Aw5EEnJUemc/TnVk_zyn3tI/AAAAAAAACOY/J8GYjJj65u8/9.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*A\)/g, '<img src="https://lh5.googleusercontent.com/-cMKS8StxNTs/TnVlANDL5fI/AAAAAAAACOc/d8qOXYcgkiE/10.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*B\)/g, '<img src="https://lh3.googleusercontent.com/-NVXIP6kMaW8/TnVlAMD9muI/AAAAAAAACOg/-4dvKmRs19c/11.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*C\)/g, '<img src="https://lh5.googleusercontent.com/-cwX9dW6EO0U/TnVlAYPa1hI/AAAAAAAACOk/XPAVF-JQjaA/12.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*D\)/g, '<img src="https://lh4.googleusercontent.com/-B-p5IASdxrw/TnVlAlUEXzI/AAAAAAAACOo/nwpQsrSJzzw/13.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*E\)/g, '<img src="https://lh6.googleusercontent.com/-LTkpIj0Ut4c/TnVlBfWjDdI/AAAAAAAACOs/MKiE9P5JFvM/14.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*F\)/g, '<img src="https://lh3.googleusercontent.com/-CELsPe4_QDY/TnVlBieHH0I/AAAAAAAACO0/Ok6gwun6uys/15.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*G\)/g, '<img src="https://lh4.googleusercontent.com/-xWIhJ1bIz1M/TnVlBwC3HLI/AAAAAAAACO4/440YCTfQRMQ/16.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*H\)/g, '<img src="https://lh6.googleusercontent.com/-X2Rbtjqg_Hk/TnVlBmXSwYI/AAAAAAAACOw/_FOgtN0B5Io/17.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*I\)/g, '<img src="https://lh3.googleusercontent.com/-4D702tV9yPc/TnVpRg7fr1I/AAAAAAAACPw/d4Uxk-S7ubU/18.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*K\)/g, '<img src="https://lh6.googleusercontent.com/-2I2t46EhwXI/TnVlCq5-jpI/AAAAAAAACPA/9vnsBA156S0/19.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*L\)/g, '<img src="https://lh4.googleusercontent.com/-klP0Se9JAiA/TnVlCzmjjyI/AAAAAAAACPE/DEh-eA8knfE/20.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*M\)/g, '<img src="https://lh6.googleusercontent.com/-RnIrvpZ11_U/TnVlDzONXYI/AAAAAAAACPM/2S9q7z3JrNw/21.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*N\)/g, '<img src="https://lh6.googleusercontent.com/-6wY7po6m9pQ/TnVlDksKdRI/AAAAAAAACPI/YIo8V9qOzso/22.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*O\)/g, '<img src="https://lh3.googleusercontent.com/-sgpTYgsnb94/TnVlEU7ULLI/AAAAAAAACPY/Ieoi5qQJMSM/23.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*P\)/g, '<img src="https://lh3.googleusercontent.com/-Y1B6AjQLx1E/TnVlEHoppaI/AAAAAAAACPQ/0DNFwBtlLDE/24.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*Q\)/g, '<img src="https://lh6.googleusercontent.com/-QON6BDRJUmE/TnVlEQJ_VNI/AAAAAAAACPU/DY6dQQ9QcXE/25.gif" id="new" /> ');
	d.innerHTML = d.innerHTML.replace(/\s:-*Z\)/g, '<img src="https://lh4.googleusercontent.com/-z5KR5b_Bbl0/TnVlEp9QrdI/AAAAAAAACPc/sYgP6QBBQd0/26.gif" id="new" /> ');

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
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_hihihi\"><img src=\"https://lh5.googleusercontent.com/-u32QHaw7X1w/TnVk_WpGjmI/AAAAAAAACOQ/Civ06r_MyQM/1.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_votay\"><img src=\"https://lh4.googleusercontent.com/-PF8ay08j1n8/TnVk80X7CYI/AAAAAAAACN8/TdAJ7MudKrY/2.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_cuoilon\"><img src=\"https://lh5.googleusercontent.com/-pXhRJIeLmng/TnVk8l7BytI/AAAAAAAACN4/Rxhcq69MJJQ/3.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_leluoi\"><img src=\"https://lh3.googleusercontent.com/-KNz6VFCVMXI/TnVk_uF_MlI/AAAAAAAACOU/AxtHVnRr6fc/4.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_khocrong\"><img src=\"https://lh6.googleusercontent.com/-mF6yxVMNyq4/TnVk9DJsvmI/AAAAAAAACOA/4jeRiVI2VmY/5.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_cuoivuive\"><img src=\"https://lh4.googleusercontent.com/-yjCbuLFFLck/TnVk-WTNwuI/AAAAAAAACOE/sonNPiL_0Q4/6.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_roile\"><img src=\"https://lh5.googleusercontent.com/-GgZ-2HX0mHY/TnVk-94AFvI/AAAAAAAACOI/Cqu36ZVj84k/7.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_kohieutaisao\"><img src=\"https://lh4.googleusercontent.com/-KtyZ486-zS8/TnVk_dH9DyI/AAAAAAAACOM/tRNnsyrUdcI/8.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_lacdaukhongbiet\"><img src=\"https://lh4.googleusercontent.com/-Aw5EEnJUemc/TnVk_zyn3tI/AAAAAAAACOY/J8GYjJj65u8/9.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_tromatngacnhien\"><img src=\"https://lh5.googleusercontent.com/-cMKS8StxNTs/TnVlANDL5fI/AAAAAAAACOc/d8qOXYcgkiE/10.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_chemgio\"><img src=\"https://lh3.googleusercontent.com/-NVXIP6kMaW8/TnVlAMD9muI/AAAAAAAACOg/-4dvKmRs19c/11.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_runso\"><img src=\"https://lh5.googleusercontent.com/-cwX9dW6EO0U/TnVlAYPa1hI/AAAAAAAACOk/XPAVF-JQjaA/12.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_tatphatne\"><img src=\"https://lh4.googleusercontent.com/-B-p5IASdxrw/TnVlAlUEXzI/AAAAAAAACOo/nwpQsrSJzzw/13.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_hoamat\"><img src=\"https://lh6.googleusercontent.com/-LTkpIj0Ut4c/TnVlBfWjDdI/AAAAAAAACOs/MKiE9P5JFvM/14.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_cuoichaynuocmat\"><img src=\"https://lh3.googleusercontent.com/-CELsPe4_QDY/TnVlBieHH0I/AAAAAAAACO0/Ok6gwun6uys/15.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_tientien\"><img src=\"https://lh4.googleusercontent.com/-xWIhJ1bIz1M/TnVlBwC3HLI/AAAAAAAACO4/440YCTfQRMQ/16.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_bangbothuongtich\"><img src=\"https://lh6.googleusercontent.com/-X2Rbtjqg_Hk/TnVlBmXSwYI/AAAAAAAACOw/_FOgtN0B5Io/17.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_daphatne\"><img src=\"https://lh3.googleusercontent.com/-4D702tV9yPc/TnVpRg7fr1I/AAAAAAAACPw/d4Uxk-S7ubU/18.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_honchutchut\"><img src=\"https://lh6.googleusercontent.com/-2I2t46EhwXI/TnVlCq5-jpI/AAAAAAAACPA/9vnsBA156S0/19.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_yeulamdo\"><img src=\"https://lh4.googleusercontent.com/-klP0Se9JAiA/TnVlCzmjjyI/AAAAAAAACPE/DEh-eA8knfE/20.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_datbom\"><img src=\"https://lh6.googleusercontent.com/-RnIrvpZ11_U/TnVlDzONXYI/AAAAAAAACPM/2S9q7z3JrNw/21.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_chaynuocmui\"><img src=\"https://lh6.googleusercontent.com/-6wY7po6m9pQ/TnVlDksKdRI/AAAAAAAACPI/YIo8V9qOzso/22.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_hoathomqua\"><img src=\"https://lh3.googleusercontent.com/-sgpTYgsnb94/TnVlEU7ULLI/AAAAAAAACPY/Ieoi5qQJMSM/23.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_uongcafe\"><img src=\"https://lh3.googleusercontent.com/-Y1B6AjQLx1E/TnVlEHoppaI/AAAAAAAACPQ/0DNFwBtlLDE/24.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_khoamom\"><img src=\"https://lh6.googleusercontent.com/-QON6BDRJUmE/TnVlEQJ_VNI/AAAAAAAACPU/DY6dQQ9QcXE/25.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cm_giangho\"><img src=\"https://lh4.googleusercontent.com/-z5KR5b_Bbl0/TnVlEp9QrdI/AAAAAAAACPc/sYgP6QBBQd0/26.gif\" /></div>";

var boldLink=$('cm_bold');
boldLink.addEventListener("click", replaceText, true);
var italicLink=$('cm_italic');
italicLink.addEventListener("click", replaceText, true);
var hrefLink=$('cm_href');
hrefLink.addEventListener("click", replaceText, true);
var smileLink=$('cm_hihihi');
smileLink.addEventListener("click", replaceText, true);
var kissLink=$('cm_votay');
kissLink.addEventListener("click", replaceText, true);
var surpriseLink=$('cm_cuoilon');
surpriseLink.addEventListener("click", replaceText, true);
var lookLink=$('cm_leluoi');
lookLink.addEventListener("click", replaceText, true);
var clapLink=$('cm_khocrong');
clapLink.addEventListener("click", replaceText, true);
var slapLink=$('cm_cuoivuive');
slapLink.addEventListener("click", replaceText, true);
var tearLink=$('cm_roile');
tearLink.addEventListener("click", replaceText, true);
var moneyLink=$('cm_kohieutaisao');
moneyLink.addEventListener("click", replaceText, true);
var leuLink=$('cm_lacdaukhongbiet');
leuLink.addEventListener("click", replaceText, true);
var lacdauLink=$('cm_tromatngacnhien');
lacdauLink.addEventListener("click", replaceText, true);
var cryLink=$('cm_chemgio');
cryLink.addEventListener("click", replaceText, true);
var kbietLink=$('cm_runso');
kbietLink.addEventListener("click", replaceText, true);
var hihiLink=$('cm_tatphatne');
hihiLink.addEventListener("click", replaceText, true);
var kickLink=$('cm_hoamat');
kickLink.addEventListener("click", replaceText, true);
var laughLink=$('cm_cuoichaynuocmat');
laughLink.addEventListener("click", replaceText, true);
var cunglyLink=$('cm_tientien');
cunglyLink.addEventListener("click", replaceText, true);
var chemgioLink=$('cm_bangbothuongtich');
chemgioLink.addEventListener("click", replaceText, true);
var battayLink=$('cm_daphatne');
battayLink.addEventListener("click", replaceText, true);
var eatLink=$('cm_honchutchut');
eatLink.addEventListener("click", replaceText, true);
var byeLink=$('cm_yeulamdo');
byeLink.addEventListener("click", replaceText, true);
var nhocLink=$('cm_datbom');
nhocLink.addEventListener("click", replaceText, true);
var aloLink=$('cm_chaynuocmui');
aloLink.addEventListener("click", replaceText, true);
var shutupLink=$('cm_hoathomqua');
shutupLink.addEventListener("click", replaceText, true);
var loveLink=$('cm_uongcafe');
loveLink.addEventListener("click", replaceText, true);
var datbomLink=$('cm_khoamom');
datbomLink.addEventListener("click", replaceText, true);
var datbomLink=$('cm_giangho');
datbomLink.addEventListener("click", replaceText, true);
window.addEventListener("load", addSmiley, true);
