// ==UserScript==
// @name EasyNews Simple Nav Script
// @description  Simple floating navigation for easy news global search. TaeBoX gmail com
// @include http*://*easynews.com/global*
// ==/UserScript==
(function(){
addElement();

function addElement() {
	startHidden = false;
	if (!document.getElementById('nextP') && !document.getElementById('prevP'))
		{ 
			startHidden=true;
		}
	var nextAnchor = document.getElementById('nextP');
	var prevAnchor = document.getElementById('prevP');
	var nextLink = (nextAnchor ? nextAnchor.href : false);
	var prevLink = (prevAnchor ? prevAnchor.href : false);
	var divId = "easynewsnavdiv";
	var parent = document.getElementsByTagName('body')[0];
	var newdiv = document.createElement('div');
	var hiddendiv = document.createElement('div');
	var hiddenId = "easynewsnavshowdiv";
	newdiv.setAttribute('id', divId);
	newdiv.setAttribute('style', 'position:fixed; margin:0px auto; bottom:0; left:0; right:0; background-color:#aaa; opacity:.8;display:block;white-space:nowrap;text-align:center;'); 
	newdiv.innerHTML= (prevLink ? '<a href='+prevLink+'>&lt;&lt; Previous Page</a>' : '');
	newdiv.innerHTML+='&nbsp;<input type="button" name="on" value="Check All" onClick="checkAll(document.zip)">&nbsp;<input type="button" name="off" value="Uncheck All" onClick="uncheckAll(document.zip)">&nbsp;<input type="button" name="range" value="Ranges" onClick="checkRanges(document.zip)">&nbsp;<input type="button" name="ZIP" value="ZIP" onClick="document.forms[\'zip\'].submit()">&nbsp;';
	newdiv.innerHTML+=(nextLink ? '<a href='+nextLink+'>Next Page &gt;&gt;</a>' : '');
	hiddendiv.innerHTML = '<a href="#" title="Hide Easynews Navigation" onClick="javascript:document.getElementById(\''+divId+'\').style.visibility=\'hidden\';return false;">Hide</a>&nbsp;-&nbsp;<a href="#" onClick="javascript:document.getElementById(\''+divId+'\').style.visibility=\'visible\';return false;" title="Show Easynews Navigation">Show</a>';
	hiddendiv.setAttribute('id', hiddenId);
	hiddendiv.setAttribute('style', 'position:fixed;top:0px;left:0px;background-color:#bbb;');
	parent.appendChild(newdiv);
	parent.appendChild(hiddendiv);
	newdiv.style.visibility = (startHidden ? 'hidden' : 'visible');
}
}) ();