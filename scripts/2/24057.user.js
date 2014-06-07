// ==UserScript==
// @name Comment Buttons
// @namespace http://blogger-hacked.blogspot.com
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
		case 'cmtunderline':
			strSelect = "<u>"+strSelect+"</u>";
			txtArea.value = txtArea.value.substring(0, startPos) + strSelect + txtArea.value.substring(endPos, txtArea.value.length);
		break;

		case 'cmthref':
			var url = prompt("Enter the link", "http://");
			if (url!=null) {
				strSelect = "<a href=\""+url+"\">"+strSelect+"</a>";
			}
			txtArea.value = txtArea.value.substring(0, startPos) + strSelect + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtsmile':
			txtArea.value = txtArea.value.substring(0, endPos) + ":) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtsad':
			txtArea.value = txtArea.value.substring(0, endPos) + ":( " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmttongue':
			txtArea.value = txtArea.value.substring(0, endPos) + ":P " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtlol':
			txtArea.value = txtArea.value.substring(0, endPos) + ":D " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtoops':
			txtArea.value = txtArea.value.substring(0, endPos) + ":$ " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
		case 'cmtwink':
			txtArea.value = txtArea.value.substring(0, endPos) + ";) " + txtArea.value.substring(endPos, txtArea.value.length);
		break;
	}
	txtArea.focus();
	txtArea.setSelectionRange(endPos+3,endPos+3);
}

function addSmiley(){
  var d = $('comments-block');
        d.innerHTML = d.innerHTML.replace(/\s:-*\)/g, ' <img src="http://aditya.vm.googlepages.com/ksk-smile.png" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s;-*\)/g, ' <img src="http://aditya.vm.googlepages.com/ksk-blink.png" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*\$/g, ' <img src="http://aditya.vm.googlepages.com/ksk-oops.png" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*\(/g, ' <img src="http://aditya.vm.googlepages.com/ksk-sad.png" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*D/g, ' <img src="http://aditya.vm.googlepages.com/ksk-lol.png" id="new" /> ');
        d.innerHTML = d.innerHTML.replace(/\s:-*P/g, '<img src="http://aditya.vm.googlepages.com/ksk-tongue.png" id="new" /> ');
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
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtsmile\"><img src=\"http://aditya.vm.googlepages.com/ksk-smile.png\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtsad\"><img src=\"http://aditya.vm.googlepages.com/ksk-sad.png\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmttongue\"><img src=\"http://aditya.vm.googlepages.com/ksk-tongue.png\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtlol\"><img src=\"http://aditya.vm.googlepages.com/ksk-lol.png\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtoops\"><img src=\"http://aditya.vm.googlepages.com/ksk-oops.png\" /></div>";
qe.innerHTML=qe.innerHTML+"<div class=\"btnstyle\" id=\"cmtwink\"><img src=\"http://aditya.vm.googlepages.com/ksk-blink.png\" /></div>";

var boldLink=$('cmtbold');
boldLink.addEventListener("click", replaceText, true);
var italLink=$('cmtitalic');
italLink.addEventListener("click", replaceText, true);
var hrefLink=$('cmthref');
hrefLink.addEventListener("click", replaceText, true);
var smileLink=$('cmtsmile');
smileLink.addEventListener("click", replaceText, true);
var sadLink=$('cmtsad');
sadLink.addEventListener("click", replaceText, true);
var tongueLink=$('cmttongue');
tongueLink.addEventListener("click", replaceText, true);
var lolLink=$('cmtlol');
lolLink.addEventListener("click", replaceText, true);
var oopsLink=$('cmtoops');
oopsLink.addEventListener("click", replaceText, true);
var winkLink=$('cmtwink');
winkLink.addEventListener("click", replaceText, true);
window.addEventListener("load", addSmiley, true);