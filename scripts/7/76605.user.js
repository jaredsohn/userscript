// ==UserScript==
// @name            TorrenTGui & HDChina Auto Thanks
// @namespace       http://xiangningliu.com/blog
// @author          1nm
// @description     浏览TorrenTGui & HDChina的资源详情页面时使用 AJAX 方式在后台自动感谢发布者。如果您觉得这不足以表达谢意，请使用奖励积分功能。本脚本适用于Chrome和Greasemonkey，代码部分借鉴于rainux，在此表示由衷感谢。
// @include http://*/details.php*
// @include https://*/details.php*
// ==/UserScript==


var thanksForm;

function showMessage(){
    for (var i = 0; i < thanksForm.elements.length; i++){
	if (thanksForm.elements[i].name == 'submit') {
	    thanksForm.elements[i].value = '已经自动感谢发布者，如果您觉得这不足以表达谢意，请使用奖励积分功能。';
	    thanksForm.elements[i].disabled = true;
	    break;
	}
    }
}

function getThanksForm(){
    //TTG & HDC
    thanksForm = document.getElementById('thanksForm');

    //NexusPHP
    if (!thanksForm){
	thanksForm = document.getElementById('saythanks');
    }

    //CCFBits
    //id not set, search by tag
    if (!thanksForm){
	var thanksForms = document.getElementsByTagName('form');
	if (thanksForms){
	    for (var i = 0; i < thanksForms.length; i++) {
		if (thanksForms[i].action == 'thanks.php') {
		    thanksForm = thanksForms[i];
		    break;
		}
	    }
	}
    }
}


function makeThanks(){
    getThanksForm();

    //thanks form not found
    if (!thanksForm){
	return;
    }

    //for NexusPHP based sites
    //actually thanksForm here is an input
    //just dispatch a click event
    if (thanksForm.id == 'saythanks'){
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
	thanksForm.dispatchEvent(evt);
	return;
    }

    else{
	var post_data = [];

	for (var i = 0; i < thanksForm.elements.length; i++) {
	    //already thanked
	    if ((thanksForm.elements[i].name == 'submit') &&
		(thanksForm.elements[i].disabled)) {
		return;
	    }
	    post_data.push(thanksForm.elements[i].name + '=' + thanksForm.elements[i].value);
	}

	post_data = encodeURI(post_data.join('&'));

	var method = "POST";
	var url = thanksForm.action;
	var xmlhttp = new XMLHttpRequest();
	var headers = {
	    'User-agent': 'Mozilla/4.0 (compatible)',
	    'Accept': 'text/html,application/xhtml+xml,application/xml',
	    'Content-type': 'application/x-www-form-urlencoded',
	};
	xmlhttp.open(method, url);
	for (var prop in headers) {
	    xmlhttp.setRequestHeader(prop, headers[prop]);
	}
	xmlhttp.send(post_data);
	showMessage();
	return;
    }
}

window.addEventListener('load', makeThanks(), false);
