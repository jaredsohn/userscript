// ==UserScript==
// @name           TW Price 2 CNY
// @namespace      http://pto2k.blogspot.com
// @description    show price in CNY
// @include        http://www.tkec.com.tw/*
// ==/UserScript==
/* 用xpath查对象 返回全部*/
function xpath(query) {
	try{return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);}catch(e){logToConsole(e)}
}
var rate = GM_getValue('TWD2CNY','0.197')*1
t=document.body.innerHTML
t=t.replace(/\$/g,'￥')
document.body.innerHTML=t

dolarSigns = xpath('//span')
for(var i=0;i<dolarSigns.snapshotLength;i++){
	t = dolarSigns.snapshotItem(i).innerHTML
	if(t.replace(/\D/g,'')==t){
		dolarSigns.snapshotItem(i).innerHTML = Math.floor(t*rate)
		dolarSigns.snapshotItem(i).title = '$'+t
	}
}

function ChangeIt(){
	dolarSigns = xpath('//span')
	rate = rateBox.value
	GM_setValue('TWD2CNY',rate+"")
	for(var i=0;i<dolarSigns.snapshotLength;i++){
		t = dolarSigns.snapshotItem(i).innerHTML
		if(t.replace(/\D/g,'')==t){
			dolarSigns.snapshotItem(i).innerHTML = Math.floor(dolarSigns.snapshotItem(i).title.replace('$','')*rate)
		}
	}
}

rateBox = document.body.appendChild(document.createElement('input'))
rateBox.style['position']='fixed'
rateBox.style['right']='5px'
rateBox.style['top']='5px'
rateBox.style['width']='auto'
rateBox.style['height']='auto'
rateBox.id='rateBox'
rateBox.value = rate
rateBox.addEventListener('keyup',ChangeIt,false)
