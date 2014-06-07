// ==UserScript==
// @name           ifs-javadom libraly
// @namespace    ifly2sky, http://userscripts.org/users/327281
// @version        0.1
// @description    This is a javascript library, it hasn't to be installed but imported from other scripts with the meta tag require
// ==/UserScript==


function de_iframe() {
//대개 iframe은 광고프레임으로 사용된다. 필요한 곳에서 이 함수를 사용해 제거한다.

	var xif = document.evaluate('//iframe', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	 for (var i=0; i< xif.snapshotLength; i++) {
		var tif = xif.snapshotItem(i);
		tif.parentNode.removeChild(tif);
	}
}


function deID(strID) {
//ID개체를 삭제한다
	if (document.getElementById(strID))
	{
		var obj = document.getElementById(strID);
		obj.parentNode.removeChild(obj);	
		return true;
	} else {return false;}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
//addGlobalStyle('body {font-size:14px ! important;}');


function getElementsByClassName(classname, node) {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
	if(re.test(els[i].className))a.push(els[i]);
	return a;
}
function del_class(strClass, opt) 
{
	var adiv = getElementsByClassName(strClass);
	for (var i = 0; i < adiv.length; i++) 
	{
		// 0 = delete, 1 = display:none
		if (opt == 0) {adiv[i].parentNode.removeChild(adiv[i]);} 
                else{ adiv[i].style.display = 'none';}
	}
}


//print all StyleSheets and cssRules
function get_ssall() 
{
    var ss = document.styleSheets;
	var s ='<hr><h1>StyleSheets :' +ss.length + '</h1><p>';

	for (var i = 0; i < ss.length; i++) 
	{
		var ts = ss[i];

		if(ts.href != null) {
			s += '<br><b><font color=red>StyleSheets' + i + ', File: ' + ts.href + '</font></b><br>';
		} else {
			s += '<b><font color=red>StyleSheets' + i + '</font></b><br>';
		}

		for (var j = 0; j < ts.cssRules.length; j++) 
		{
			var tr= ts.cssRules[j];
			s += tr.cssText + '<br>';    
		}
		s+= '<br>';
	}
	
	var ndiv = document.createElement('div');
	ndiv.id = 'newss';
	var b = document.getElementsByTagName('body')[0];
	b.insertBefore(ndiv, b.lastChild);
	ndiv.innerHTML = s;
	
}



