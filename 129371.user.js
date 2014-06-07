// ==UserScript==
// @name Habr Percentage Ring
// @version 0.81_2012-05-13
// @namespace spmbt.kodingen.com
// @author spmbt0
// @description Percentage Rings around numbers which show grades (for with userstyles)
// @icon http://habrahabr.ru/favicon.ico
// @update 0.6 подгонка  расположения эллипсов в Firefox в чистом скрипте и HabrAjax
// @include http://*.habrahabr.ru/*
// @include http://habrahabr.ru/*
// @exclude http://habrahabr.ru/api/*
// ==/UserScript==
// работает автономно или как модуль для HabrAjax
getPositionCenter = function(obj){
	var x=0, y=0, w2 = Math.floor(obj.offsetWidth /2), h2 = Math.floor(obj.offsetHeight /2);
	while(obj) { x += obj.offsetLeft; y += obj.offsetTop; obj = obj.offsetParent; }
	return {x: x, y: y, w2: w2, h2: h2};
};
writePercRound = function(aP, aM, oX){
	var aPM = Number(aP) + Number(aM);
	if(aPM ==0) return document.createElement('div');
	var c = document.createElement('canvas')
		, pi = Math.PI, r2 = 14, ell = 1-1/3.6;
	c.width
		= c.height = r2 *2;
	c.style.backgroundColor ='transparent';
	c.style.position ='absolute';
	c.style.left = (-r2 +12) +'px';
	c.style.top = (-r2 +1 +8) +'px';
	var q = c.getContext("2d")
		, log = Math.log(aPM)/1.6 +1;
	c.style.opacity = 0.25 + log *0.1;
	c.style.zIndex = 1;
	q.beginPath();
	q.lineWidth = log;
	q.strokeStyle ='#1b1';
	var perc = (0.5- aM/aPM)* pi
		, perc2 = (0.5+ aM/aPM)* pi;
	q.scale(1, ell);
	q.arc(r2, r2 /ell, r2 -1, perc, perc2 +2*(perc == perc2 && aP !=0)*pi, aP ==0 || aM !=0);
	q.stroke();
	q.beginPath();
	q.strokeStyle ='#a24';
	q.arc(r2, r2/ell, r2 -1, perc, perc2 +2*(perc == perc2 && aM !=0)*pi, !1);
	q.stroke();
	return c;
};
//.comments_list .comment_item .info .voting .mark
var win = typeof unsafeWindow !='undefined'? unsafeWindow: window;
(win.habrPercentageRing = function(blck){
var marks = blck && blck.childNodes && blck.querySelectorAll('.mark')
	, r2 =14
	, isC2 = / c2/.test(blck.className)
	, isQa = /\/qa\//.test(location.href);
if(!marks) return;
for(var i in marks){
	var o = marks[i]
		, oP = o.parentNode;
	if(!o || !o.attributes) continue;
	o.style.position ='relative';
	if(/\/users\//.test(location.href) ){
		oP.style.marginRight ='14px';
		oP.style.marginTop ='2px';}
	var oX = getPositionCenter(o)
		, oXS = o.querySelector('span');
	if(oXS && oXS.getAttribute('title')){
		var oXSt = oXS.getAttribute('title').match(/[\d\.]+/g);
		var oC = o.querySelector('canvas');
		if(oC) oC.parentNode.removeChild(oC);
		if(oXSt && oXSt.length && !o.querySelector('canvas')){
			var aP = oXSt[1], aM = oXSt[2]
				, c = writePercRound(aP, aM, oX)
				, oPM = oP.querySelector('.minus')
				, oPP = oP.querySelector('.plus')
				, oPPI = /infopanel/.test(oP.parentNode.className);
			if(oPM && (-aP - aM))
				oPM.style.left =(oPPI?46:26 +6*(Math.abs(aP - aM) >9))+'px';
			oXS.style.left ='-1px';
			if(oPPI){//new layout
				c.style.left = (Math.abs(aP - aM) >99 ? -r2 +17 : (aP == aM ? -r2 +3 : -r2 +11 -4*(Math.abs(aP - aM) <=9))) +'px';
				c.style.top ='-7px';
			}else if(oP.parentNode.parentNode.className =='entry-info vote_holder'){//old layout
				c.style.left = (Math.abs(aP - aM) >99 ? -r2 +56 : (aP == aM ? -r2 +43 : -r2 +46 +4*(Math.abs(aP - aM) >9))) +'px';
				c.style.top =isC2 ?'-6px':'-4px';
			}else{//comments
				c.style.left = (Math.abs(aP - aM) >99 ? -r2 +18 : (aP == aM ? -r2 +8 : -r2 +9 +4*(Math.abs(aP - aM) >9))) -(isC2 && !isQa ?3:0) +'px';
				oXS.style.top =0;
				oXS.style.left =(aP == aM ?5:-1)+'px';
				c.style.top =isC2 ?'-5px':'-2px';
			}
			oXS.style.position ='relative';
			o.insertBefore(c, oXS);
			if(oPPI && Math.abs(aP - aM) >99)
				o.style.left ='-9px';
			oXS.style.zIndex =2;
			(function(oP){
				var ff = function(){setTimeout(function(){
					win.habrPercentageRing(oP)},2999)};
				oPM && oPM.addEventListener('click',ff,!1);
				oPP && oPP.addEventListener('click',ff,!1);
			})(oP)
}}}
})(document);

win.addEventListener('chgDom', function(ev){ //проверить блок по событию от модулей (Fx6+, Chrome,Safari)
	win.habrPercentageRing(ev.detail);
},!1);

