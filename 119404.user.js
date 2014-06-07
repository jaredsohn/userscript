// ==UserScript==
// @name           Paypal Subscriptions Exporter
// @description		For paypal merchants to export their list of subscribers.
// @namespace      PaypalSubscriptions
// @include        https://www.paypal.com/*
// ==/UserScript==


// rptable
// document.getElementById('myAllTextSubmitID').name = 'next';document.getElementById('myAllTextSubmitID').value = 'Next';document.forms.history.submit();return false;
// https://www.paypal.com/au/cgi-bin/webscr?cmd=_merchant-hub

var nHtml={


FindByXPath:function(obj,xpath) {
	try {
		var q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(e) {
		if(GM_log)
		{
			GM_log('bad xpath:'+xpath);
		}
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
ClickWin:function(win,obj,evtName) {
	var evt = win.document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, win,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
},
Click:function(obj) {
	return this.ClickWin(window,obj,'click');
}
};

function AddTable(rptable) {
	var transactionsHtml=GM_getValue('transactions','');
	transactionsHtml+=rptable.tBodies[0].innerHTML;
	GM_setValue('transactions',transactionsHtml);
}
function DisplayTable(rptable) {
	var transactionsHtml=GM_getValue('transactions','');
	while(rptable.rows>0) {	
		rptable.deleteRow(0);
	}
	rptable.tBodies[0].innerHTML=transactionsHtml;
}

function AddNextPage(rptable) {
	AddTable(rptable);
	var nextbutton=nHtml.FindByXPath(document,".//input[@name='next']"); 

	var mess='Loading...';
	if(nextbutton) {
		nextbutton.click();
	} else {
		mess='Done';
		GM_deleteValue('transactionsStarted');
		DisplayTable(rptable);
	}
	rptable.parentNode.insertBefore(document.createTextNode(mess),rptable);
}

function FindTable() {
	var rptable=document.getElementById('rptable');
	if(!rptable) return null;
	return rptable;
}
function AddLink() {
	var rptable=FindTable();
	if(!rptable) return;
	var a=document.createElement('a');
	a.innerHTML='Get next pages';
	a.href='javascript:';
	
	rptable.parentNode.insertBefore(a,rptable);
	a.addEventListener('click',function() {
		GM_setValue('transactionsStarted','1');
		GM_setValue('transactions','');
		AddNextPage(rptable);
	},false);
}

window.addEventListener('load',function() {	
	var rptable=FindTable();
	if(rptable && GM_getValue('transactionsStarted')) {
		AddNextPage(rptable);
	} else {
		AddLink();
	}
});