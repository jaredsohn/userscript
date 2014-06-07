// ==UserScript==
// @name           Avanturist.org.Collapse_PATCH
// @description    Avanturist.org forum collapse PATCH
// @version        0.1.5
// @include        http://avanturist.org*
// @include        http://www.avanturist.org*
// @include        https://avanturist.org*
// @include        https://www.avanturist.org*
// @grant          none
// ==/UserScript==

var i;
var w;
var e;
var c;
var xp, s;

xp='/html/body/div/div/div/div/table/tbody/tr';
e=document.evaluate(xp, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (i=0; i<e.snapshotLength; i++) {
	w=e.snapshotItem(i);//.childNodes[j];
	s=w.outerHTML;
	if (s!=undefined) {
		if (s.indexOf(c)>=0) {
			while (s.indexOf('<br>')>0) {	
				s=s.replace('<br>',';');
			};
			e.snapshotItem(i).outerHTML=s;
		};
	};
};

c='\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430'; // Статистика
xp='/html/body/div/div/div/div/table/tbody/tr[1]/td[2]';

e=document.evaluate(xp, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (i=0; i<e.snapshotLength; i++) {
	w=e.snapshotItem(i);//.childNodes[j];
	s=w.outerHTML;
	if (s!=undefined) {
		if (s.indexOf(c)>=0) {
			while (s.indexOf('<br>')>0) {	
				s=s.replace('<br>',';');
			};
			e.snapshotItem(i).outerHTML=s;
		};
	};
};

c='\u0421\u0435\u0439\u0447\u0430\u0441'; // Сейчас
xp='/html/body/div/div/div/div/table/tbody/tr[2]/td[2]';

e=document.evaluate(xp, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
for (i=0; i<e.snapshotLength; i++) {
	w=e.snapshotItem(i);//.childNodes[j];
	s=w.outerHTML;
	if (s!=undefined) {
		if (s.indexOf(c)>=0) {
			while (s.indexOf('<br>')>0) {	
				s=s.replace('<br>',';');
			};
			e.snapshotItem(i).outerHTML=s;
		};
	};
};


