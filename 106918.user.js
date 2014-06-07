// ==UserScript==
// @name           CS2 ion Trail Time to Life Info
// @namespace      CS
// @description    adds Max TTL for Ion Trails, and detailed info in a popupbox on hovering it to the scan ion trail page.
// @include        http://*.chosenspace.com/index.php?go=scan_trails*
// ==/UserScript==
alltags=document.evaluate("//input[@value='Sector']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thistag=alltags.snapshotItem(0);
if(thistag){
	function striptonum(thisstring){
		thisstring+="";
		return thisstring.replace(/\D/g,'');
	}
	alltags=document.evaluate("//text()[contains(.,' CE')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	thistag=alltags.snapshotItem(0);
	var rece=/year\s.*\sce/i;
	var csoffsettime=1142530020;
	var cenow=(((striptonum(rece.exec(thistag.textContent)))*60)+csoffsettime)*1000;
	alltags=document.evaluate("//a[contains(@href,'view=sector')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	at=alltags.snapshotLength;
	var retime=/\d{1,}\.\d{2,2}\sce/i;
	var retrail=/\d*\./;
	var date=new Date();
	function checkTime(i){if(i<10)i="0"+i;return i;}
	var scaninfo={
		'0':{'n':"0.1",'t':90},
		'1':{'n':"0.2",'t':80},
		'2':{'n':"0.3",'t':70},
		'3':{'n':"0.4",'t':60},
		'4':{'n':"0.5",'t':50},
		'5':{'n':"0.6",'t':40},
		'6':{'n':"0.7",'t':30},
		'7':{'n':"0.8",'t':20},
		'8':{'n':"0.9",'t':10},
		'9':{'n':"1.0",'t':0}
	}
	var trailstart,trailduration,trailend,line,newdiv,newspan,trailcalcend,scann,scant;
	for(var i=0;i<at;i++){
		thistag=alltags.snapshotItem(i);
		line=thistag.parentNode.parentNode;
		trailstart=(((striptonum(retime.exec(line.children[0].textContent)))*60)+csoffsettime)*1000;
		trailduration=(striptonum(retrail.exec(line.children[4].textContent)))*4000;
		trailend=(trailstart+trailduration)-cenow;
		//main div creation
		newdiv=document.createElement('span');
		newdiv.setAttribute('style','position:relative;');
		newdiv.setAttribute('onmouseover',"var extinfo=document.getElementById('infobox"+i+"');extinfo.style.opacity=1;extinfo.style.zIndex=1;");
		newdiv.setAttribute('onmouseout',"var extinfo=document.getElementById('infobox"+i+"');extinfo.style.opacity=0;extinfo.style.zIndex=-1;");
		newdiv.appendChild(document.createTextNode('['));
		newspan=document.createElement('span');
		newspan.style.color='#00FAFF';
		trailcalcend=striptonum(Math.floor((trailend/1000)/60));
		newspan.appendChild(document.createTextNode(trailcalcend));
		newdiv.appendChild(newspan);
		newdiv.appendChild(document.createTextNode(']'));
		//create popupbox
		newspan=document.createElement('span');
		newspan.setAttribute('style','z-index:-1;opacity:0; position:absolute;float:left;width:19em;height:13em;background-color:#202020;overflow:hidden;padding:0.2em;border:1px solid #FF00F2;');
		newspan.setAttribute('id',"infobox"+i);
		newspan.setAttribute('class',"forms infobox");
		function newpit(text){
			var newput=document.createElement('input');
			newput.setAttribute('type',"text");
			newput.setAttribute('class',"forms info");
			newput.setAttribute('onfocus',"blur();");
			newput.setAttribute('style',"width:100%!important;border:none!important;padding:0!important;");
			newput.setAttribute('value',text);
			return newput;
		}
		for(var k=9;k>=0;k--){
			scann=scaninfo[k]['n'];
			scant=scaninfo[k]['t'];
			trailscanend=(trailstart+trailduration)-(scant*60000);
			date.setTime(trailscanend);
			if(k==9)newspan.appendChild(document.createTextNode(' [end '+(Math.floor(((trailscanend/1000)-csoffsettime)/60)/100)+' CE]'));
			newspan.appendChild(newpit(scann+'\u00A0Scanner:\u00A0'+(trailcalcend-scant)+'\u00A0min\u00A0@\u00A0'+checkTime(date.getDate())+'.'+checkTime(date.getMonth()+1)+'.'+checkTime(date.getFullYear())+'\u00A0'+checkTime(date.getHours())+':'+checkTime(date.getMinutes())));
		}
		newdiv.appendChild(newspan);
		//main div injection
		line.children[5].firstChild.style.display='none';
		line.children[5].appendChild(newdiv);
	}
}