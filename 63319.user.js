// ==UserScript==
// @name           Google Reader View Expander
// @namespace      http://userscripts.org/users/105016
// @author         darasion[at]gmail.com
// @version        1.0.1
// @description    Add toggle full-screen/normal view button for Google Reader. 给Google Reader加入全屏视图功能。
// @include        https://www.google.com/reader/view/*
// @include        http://www.google.com/reader/view/*
// ==/UserScript==

/**********************************************************************************************\
* Press Ctrl+Enter keys or click the Full Screen View/Normal View button to toggle the view.
* 按 Ctrl+Enter 或点击[全屏视图/正常视图]按钮切换视图。
\**********************************************************************************************/

function $(id){
	return document.getElementById(id);
}

function getTop(e){
	var offset = e.offsetTop;
	if(e.offsetParent != null) offset += getTop(e.offsetParent);
	return offset;
}

//i18n
var text = {};
if(window.navigator.language.indexOf('zh-CN') != -1){
	text['full-screen-view'] = '全屏视图';
	text['normal-view'] = '正常视图';
}else{
	text['full-screen-view'] = 'Full Screen View';
	text['normal-view'] = 'Normal View';
}

var buttonExpandHtml= '<div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-top-shadow"> </div><div class="goog-button-base-content"><div class="goog-button-body">'+text['full-screen-view']+'</div></div></div></div></div>';
var buttonRestoreHtml= '<div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-top-shadow"> </div><div class="goog-button-base-content"><div class="goog-button-body">'+text['normal-view']+'</div></div></div></div></div>';

var expanded= false;

function toggleView(){
	if(!expanded){
		button.innerHTML = buttonRestoreHtml;
		var gbhs = document.getElementsByClassName('gbh');
		for(var i=0,l=gbhs.length;i<l;i++){
			gbhs[i].style.display = 'none';
		}
		$('nav').style.display = 'none';
		$('chrome-lhn-toggle').style.display = 'none';
		$('gbar').style.display = 'none';
		$('logo-container').style.display = 'none';
		$('global-info').style.display = 'none';
		$('search').style.display = 'none';
		$('chrome-header').style.display = 'none';
		$('chrome').style.marginLeft = '0px';
		$('main').style.top = '0px';
		$('main').style.left = '0px';
		$('entries').style.height = (window.innerHeight-$('viewer-header').clientHeight-$('viewer-footer').clientHeight)+'px';
		expanded = true;
	}else{
		button.innerHTML = buttonExpandHtml;
		var gbhs = document.getElementsByClassName('gbh');
		for(var i=0,l=gbhs.length;i<l;i++){
			gbhs[i].style.display = '';
		}
		$('nav').style.display = '';
		$('chrome-lhn-toggle').style.display = '';
		$('gbar').style.display = '';
		$('logo-container').style.display = '';
		$('global-info').style.display = '';
		$('search').style.display = '';
		$('chrome-header').style.display = '';
		$('chrome').style.marginLeft = '';
		$('main').style.height = '';
		$('main').style.top = '';
		$('main').style.left = '';
		$('entries').style.height = (window.innerHeight-getTop($('chrome-viewer'))-$('viewer-header').clientHeight-$('viewer-footer').clientHeight)+'px';
		expanded = false;
	}
}

if(!button){
	var button = document.createElement('div');
	button.setAttribute('id','viewer-expand');
	button.className = 'goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-button-tight viewer-buttons';
	button.innerHTML = buttonExpandHtml;
	button.addEventListener('click', function(){toggleView();}, true);
	window.addEventListener('keydown', function(e){
		if(e.ctrlKey && e.keyCode == 13){
			toggleView();
		}
	}, true);

	$('viewer-top-controls').appendChild(button);
}
