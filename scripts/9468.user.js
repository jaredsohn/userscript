// ==UserScript==
// @name Comment Buttons
// @namespace http://
// @description Adds buttons for simple comment HTML replacement in Blogger.
// @include *blogger.com/comment.g*
// @include *blogger.com/comment.do
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
		case 'cmtbold':
			strSelect = "<b>"+strSelect+"</b>";
			txtArea.value = txtArea.value.substring(0, startPos) + strSelect + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtitalic':
			strSelect = "<i>"+strSelect+"</i>";
			txtArea.value = txtArea.value.substring(0, startPos) + strSelect + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmthref':
			var url = prompt("Enter the link", "http://");
			if (url!=null) {
				strSelect = "<a href=\""+url+"\">"+strSelect+"</a>";
			}
			txtArea.value = txtArea.value.substring(0, startPos) + strSelect + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtangry':
			txtArea.value = txtArea.value.substring(0, endPos) + ":@ " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtbiggrin':
			txtArea.value = txtArea.value.substring(0, endPos) + ":D " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtblink':
			txtArea.value = txtArea.value.substring(0, endPos) + ":blink: " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtblush':
			txtArea.value = txtArea.value.substring(0, endPos) + ":blush: " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtclosedeyes':
			txtArea.value = txtArea.value.substring(0, endPos) + "-_- " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtcool':
			txtArea.value = txtArea.value.substring(0, endPos) + ":cool: " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtdry':
			txtArea.value = txtArea.value.substring(0, endPos) + "<_< " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmthappy':
			txtArea.value = txtArea.value.substring(0, endPos) + "^-^ " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmthuh':
			txtArea.value = txtArea.value.substring(0, endPos) + ":huh: " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtlaugh':
			txtArea.value = txtArea.value.substring(0, endPos) + ":)) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtmad':
			txtArea.value = txtArea.value.substring(0, endPos) + ":mad: " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtmellow':
			txtArea.value = txtArea.value.substring(0, endPos) + ":mellow: " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtnowink':
			txtArea.value = txtArea.value.substring(0, endPos) + ":nowink: " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtohmy':
			txtArea.value = txtArea.value.substring(0, endPos) + ":omg: " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtph34r':
			txtArea.value = txtArea.value.substring(0, endPos) + ":freak: " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtrolleyes':
			txtArea.value = txtArea.value.substring(0, endPos) + ":rolleyes: " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtsad':
			txtArea.value = txtArea.value.substring(0, endPos) + ":( " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtsleep':
			txtArea.value = txtArea.value.substring(0, endPos) + ":o " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtsmile':
			txtArea.value = txtArea.value.substring(0, endPos) + ":) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmttongue':
			txtArea.value = txtArea.value.substring(0, endPos) + ":>p " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmttongue2':
			txtArea.value = txtArea.value.substring(0, endPos) + ":P " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtunsure':
			txtArea.value = txtArea.value.substring(0, endPos) + ":unsure: " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtwacko':
			txtArea.value = txtArea.value.substring(0, endPos) + ":wacko: " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtwink':
			txtArea.value = txtArea.value.substring(0, endPos) + ";) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtwub':
			txtArea.value = txtArea.value.substring(0, endPos) + ":wub: " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
	}
	txtArea.focus();
	txtArea.setSelectionRange(endPos+3,endPos+3);
}

function addSmiley(){
  var d = $('comments-block');
        d.innerHTML = d.innerHTML.replace(/\s:-*\@/g, ' <img src="http://ggnebok.googlepages.com/angry.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*\D/g, ' <img src="http://ggnebok.googlepages.com/biggrin.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:blink:/g, ' <img src="http://ggnebok.googlepages.com/blink.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:blush:/g, ' <img src="http://ggnebok.googlepages.com/blush.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s-_-/g, ' <img src="http://ggnebok.googlepages.com/closedeyes.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:cool:/g, '<img src="http://ggnebok.googlepages.com/cool.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s<_</g, '<img src="http://ggnebok.googlepages.com/dry.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s^-^/g, '<img src="http://ggnebok.googlepages.com/happy.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:huh:/g, '<img src="http://ggnebok.googlepages.com/huh.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*))/g, '<img src="http://ggnebok.googlepages.com/laugh.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:mad:/g, '<img src="http://ggnebok.googlepages.com/mad.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:mellow:/g, '<img src="http://ggnebok.googlepages.com/mellow.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:nowink:/g, '<img src="http://ggnebok.googlepages.com/nowink.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:omg:/g, '<img src="http://ggnebok.googlepages.com/ohmy.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:freak:/g, '<img src="http://ggnebok.googlepages.com/ph34r.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:rolleyes:/g, '<img src="http://ggnebok.googlepages.com/rolleyes.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*(/g, '<img src="http://ggnebok.googlepages.com/sad.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*o/g, '<img src="http://ggnebok.googlepages.com/sleep.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*)/g, '<img src="http://ggnebok.googlepages.com/smile.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*>P/g, '<img src="http://ggnebok.googlepages.com/tongue.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*P/g, '<img src="http://ggnebok.googlepages.com/tongue2.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:unsure:/g, '<img src="http://ggnebok.googlepages.com/unsure.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:wacko:/g, '<img src="http://ggnebok.googlepages.com/wacko.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s;-*)/g, '<img src="http://ggnebok.googlepages.com/wink.gif" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:wub:/g, '<img src="http://ggnebok.googlepages.com/wub.gif" id="new" /> ');
}

var qe=$('html-usage-msg');

var btnStyle=document.createElement('style');
btnStyle.type="text/css";
btnStyle.innerHTML=".btnstyle{border:1px solid whitesmoke;border-right:2px solid silver;border-bottom:2px solid silver;margin:3px;padding:3px 3px 0 3px;width:20px;height:20px;text-align:center;vertical-align:bottom;font-size:18px;float:left;cursor:pointer}.btnstyle:hover{border:1px solid whitesmoke;border-top:2px solid silver;border-left:2px solid silver;}";
insert=document.getElementsByTagName('head');
insert[0].appendChild(btnStyle);

qe.innerHTML="<div class=\"btnstyle\" id=\"cmtbold\"><b>b</b></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtitalic\"><i>i</i></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmthref\"><img src=\"http://www2.blogger.com/img/gl.link.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtangry\"><img src=\"http://ggnebok.googlepages.com/angry.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtbiggrin\"><img src=\"http://ggnebok.googlepages.com/biggrin.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtblink\"><img src=\"http://ggnebok.googlepages.com/blink.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtblush\"><img src=\"http://ggnebok.googlepages.com/blush.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtclosedeyes\"><img src=\"http://ggnebok.googlepages.com/closedeyes.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtcool\"><img src=\"http://ggnebok.googlepages.com/cool.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtdry\"><img src=\"http://ggnebok.googlepages.com/dry.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmthappy\"><img src=\"http://ggnebok.googlepages.com/happy.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmthuh\"><img src=\"http://ggnebok.googlepages.com/huh.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtlaugh\"><img src=\"http://ggnebok.googlepages.com/laugh.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtmad\"><img src=\"http://ggnebok.googlepages.com/mad.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtmellow\"><img src=\"http://ggnebok.googlepages.com/mellow.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtnowink\"><img src=\"http://ggnebok.googlepages.com/nowink.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtohmy\"><img src=\"http://ggnebok.googlepages.com/ohmy.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtph34r\"><img src=\"http://ggnebok.googlepages.com/ph34r.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtrolleyes\"><img src=\"http://ggnebok.googlepages.com/rolleyes.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtsad\"><img src=\"http://ggnebok.googlepages.com/sad.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtsleep\"><img src=\"http://ggnebok.googlepages.com/sleep.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtsmile\"><img src=\"http://ggnebok.googlepages.com/smile.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmttongue\"><img src=\"http://ggnebok.googlepages.com/tongue.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmttongue2\"><img src=\"http://ggnebok.googlepages.com/tongue2.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtunsure\"><img src=\"http://ggnebok.googlepages.com/unsure.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtwacko\"><img src=\"http://ggnebok.googlepages.com/wacko.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtwink\"><img src=\"http://ggnebok.googlepages.com/wink.gif\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtwub\"><img src=\"http://ggnebok.googlepages.com/wub.gif\" /></div>";

var boldLink=$('cmtbold');
boldLink.addEventListener("click", replaceText, true);
var italLink=$('cmtitalic');
italLink.addEventListener("click", replaceText, true);
var hrefLink=$('cmthref');
hrefLink.addEventListener("click", replaceText, true);
var angryLink=$('cmtangry');
angryLink.addEventListener("click", replaceText, true);
var biggrinLink=$('cmtbiggrin');
biggrinLink.addEventListener("click", replaceText, true);
var blinkLink=$('cmtblink');
blinkLink.addEventListener("click", replaceText, true);
var blushLink=$('cmtblush');
blushLink.addEventListener("click", replaceText, true);
var closedeyesLink=$('cmtclosedeyes');
closedeyesLink.addEventListener("click", replaceText, true);
var coolLink=$('cmtcool');
coolLink.addEventListener("click", replaceText, true);
var dryLink=$('cmtdry');
dryLink.addEventListener("click", replaceText, true);
var happyLink=$('cmthappy');
happyLink.addEventListener("click", replaceText, true);
var huhLink=$('cmthuh');
huhLink.addEventListener("click", replaceText, true);
var laughLink=$('cmtlaugh');
laughLink.addEventListener("click", replaceText, true);
var madLink=$('cmtmad');
madLink.addEventListener("click", replaceText, true);
var mellowLink=$('cmtmellow');
mellowLink.addEventListener("click", replaceText, true);
var nowinkLink=$('cmtnowink');
nowinkLink.addEventListener("click", replaceText, true);
var ohmyLink=$('cmtohmy');
ohmyLink.addEventListener("click", replaceText, true);
var ph34rLink=$('cmtph34r');
ph34rLink.addEventListener("click", replaceText, true);
var rolleyesLink=$('cmtrolleyes');
rolleyesLink.addEventListener("click", replaceText, true);
var sadLink=$('cmtsad');
sadLink.addEventListener("click", replaceText, true);
var sleepLink=$('cmtsleep');
sleepLink.addEventListener("click", replaceText, true);
var smileLink=$('cmtsmile');
smileLink.addEventListener("click", replaceText, true);
var tongueLink=$('cmttongue');
tongueLink.addEventListener("click", replaceText, true);
var tongue2Link=$('cmttongue2');
tongue2Link.addEventListener("click", replaceText, true);
var unsureLink=$('cmtunsure');
unsureLink.addEventListener("click", replaceText, true);
var wackoLink=$('cmtwacko');
wackoLink.addEventListener("click", replaceText, true);
var winkLink=$('cmtwink');
winkLink.addEventListener("click", replaceText, true);
var wubLink=$('cmtwub');
wubLink.addEventListener("click", replaceText, true);
window.addEventListener("load", addSmiley, true);