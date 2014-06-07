// ==UserScript==
// @name           SU Visual Editor Plus
// @namespace      thlayli.detrave.net
// @description    Enhances the appearance of the FCK editor on StumbleUpon.
// @include        http://*.stumbleupon.com/fckeditor/editor/fckeditor.html*
// @version        1.1
// ==/UserScript==

if(parent.document.title == 'FCKeditor'){
	iFrames = parent.parent.document.getElementsByTagName('iframe');
	for(i=0; i< iFrames.length; i++){
		if(iFrames[i].height == '208'){
			iFrames[i].height = '408';
			iFrames[i].width = '745';
		}
	}
	visualLabel = parent.parent.document.getElementById('toggleButtonsVisual');
	visualLabel.innerHTML = visualLabel.innerHTML.replace('Visual Editor<','Visual Editor Plus<');
	normalLabel = parent.parent.document.getElementById('toggleButtonsNormal');
	normalLabel.innerHTML = normalLabel.innerHTML.replace('Visual Editor<','Visual Editor Plus<');
	
	for(i=0; (a = parent.parent.document.getElementsByTagName('link')[i]); i++) {
		if(a.getAttribute('rel') == 'stylesheet' && a.getAttribute('href').indexOf('_0407.css') != -1){
			theme = a.getAttribute('href');
			themeId = eval(theme.replace(/http:\/\/www.stumbleupon.com\/css\/(\d+)_0407.css/,'$1'));
		}
	}
	switch(themeId){
		case 1:
			themeColor = '#3986CO';
			break
		case 3:
			themeColor = '#4896D0';
			break
		case 8:
			themeColor = '#4896D0';
			break
		case 10:
			themeColor = '#1D6195';
			break
		case 12:
			themeColor = '#00477D';
			break
		case 13:
			themeColor = '#206BA4';
			break
		case 19:
			themeColor = '#4A299A';
			break
		case 20:
			themeColor = '#1D6195';
			break
		default:
			themeColor = '#EED338';
	}
    var head = document.getElementsByTagName('head')[0];
	head.innerHTML = '<style>a {text-decoration: none !important; color: ' + themeColor + ' !important;} a:hover {text-decoration: underline !important; cursor: pointer !important;}   body {background-image: none !important; width: 740px !important; padding-top: 9px !important;} ul {padding-left: 3em !important;} ol {padding-left: 3.75em !important;}</style>';
    var style = document.createElement('link');
    style.type = 'text/css';
	style.rel = 'stylesheet';

	screenStyle = style.cloneNode(true);
	screenStyle.href = 'http://www.stumbleupon.com/css/screen.css';;
    head.appendChild(screenStyle);

	userStyle = style.cloneNode(true);
	userStyle.href = 'http://www.stumbleupon.com/css/user.css';;
    head.appendChild(userStyle);

	themeStyle = style.cloneNode(true);
	themeStyle.href = theme;
    head.appendChild(themeStyle);
}else{
	document.getElementById('xEditingArea').setAttribute('style','height: 100%; border: 0px !important');
}