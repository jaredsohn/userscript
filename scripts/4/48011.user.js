// ==UserScript==
// @name           EasyCheckboxes
// @namespace      http://chofter.com/apps
// @description    Provides a very simple and useful method of checking, unchecking and toggling checkboxes on a page.  It provides a floating menu above all checkboxes that shows a number of options on how you want to select checkboxes on a page, and enables you to click and drag the mouse to select multiple checkboxes.
// @include        http://*
// @include        https://*
// @exclude        http://*google.com*
// ==/UserScript==


/* 
  Include the Acme CSS selector library (http://dojotoolkit.org) to find anchor tags on the page amazingly fast
*/
(function(){acme={trim:function(g){g=g.replace(/^\s+/,"");for(var f=g.length-1;f>=0;f--){if(/\S/.test(g.charAt(f))){g=g.substring(0,f+1);break}}return g},forEach:function(f,k,h){if(!f||!f.length){return}for(var j=0,g=f.length;j<g;++j){k.call(h||window,f[j],j,f)}},byId:function(g,f){if(typeof g=="string"){return(f||document).getElementById(g)}else{return g}},isString:function(f){return(typeof f=="string")},doc:document,NodeList:Array};var e=navigator;var a=e.userAgent;var d=e.appVersion;var c=parseFloat(d);acme.isOpera=(a.indexOf("Opera")>=0)?c:undefined;acme.isKhtml=(d.indexOf("Konqueror")>=0)?c:undefined;acme.isWebKit=parseFloat(a.split("WebKit/")[1])||undefined;acme.isChrome=parseFloat(a.split("Chrome/")[1])||undefined;var b=Math.max(d.indexOf("WebKit"),d.indexOf("Safari"),0);if(b&&!acme.isChrome){acme.isSafari=parseFloat(d.split("Version/")[1]);if(!acme.isSafari||parseFloat(d.substr(b+7))<=419.3){acme.isSafari=2}}if(document.all&&!acme.isOpera){acme.isIE=parseFloat(d.split("MSIE ")[1])||undefined}Array._wrap=function(f){return f}})();(function(Y){var a=Y.trim;var U=Y.forEach;var M=Y._queryListCtor=Y.NodeList;var p=Y.isString;var Z=function(){return Y.doc};var V=(Y.isWebKit&&((Z().compatMode)=="BackCompat"));var J=!!Z().firstChild.children?"children":"childNodes";var R=">~+";var W=false;var G=function(){return true};var m=function(ah){if(R.indexOf(ah.slice(-1))>=0){ah+=" * "}else{ah+=" "}var ab=function(az,aA){return a(ah.slice(az,aA))};var am=[];var ai=-1,af=-1,ap=-1,ay=-1,d=-1,ae=-1,ao=-1,au="",at="",ag;var an=0,ac=ah.length,ad=null,ax=null;var al=function(){if(ao>=0){var az=(ao==an)?null:ab(ao,an);ad[(R.indexOf(az)<0)?"tag":"oper"]=az;ao=-1}};var aw=function(){if(ae>=0){ad.id=ab(ae,an).replace(/\\/g,"");ae=-1}};var ak=function(){if(d>=0){ad.classes.push(ab(d+1,an).replace(/\\/g,""));d=-1}};var aq=function(){aw();al();ak()};var ar=function(){aq();if(ay>=0){ad.pseudos.push({name:ab(ay+1,an)})}ad.loops=(ad.pseudos.length||ad.attrs.length||ad.classes.length);ad.oquery=ad.query=ab(ag,an);ad.otag=ad.tag=(ad.oper)?null:(ad.tag||"*");if(ad.tag){ad.tag=ad.tag.toUpperCase()}if(am.length&&(am[am.length-1].oper)){ad.infixOper=am.pop();ad.query=ad.infixOper.query+" "+ad.query}am.push(ad);ad=null};for(;au=at,at=ah.charAt(an),an<ac;an++){if(au=="\\"){continue}if(!ad){ag=an;ad={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){return(W)?this.otag:this.tag}};ao=an}if(ai>=0){if(at=="]"){if(!ax.attr){ax.attr=ab(ai+1,an)}else{ax.matchFor=ab((ap||ai+1),an)}var av=ax.matchFor;if(av){if((av.charAt(0)=='"')||(av.charAt(0)=="'")){ax.matchFor=av.slice(1,-1)}}ad.attrs.push(ax);ax=null;ai=ap=-1}else{if(at=="="){var aj=("|~^$*".indexOf(au)>=0)?au:"";ax.type=aj+at;ax.attr=ab(ai+1,an-aj.length);ap=an+1}}}else{if(af>=0){if(at==")"){if(ay>=0){ax.value=ab(af+1,an)}ay=af=-1}}else{if(at=="#"){aq();ae=an+1}else{if(at=="."){aq();d=an}else{if(at==":"){aq();ay=an}else{if(at=="["){aq();ai=an;ax={}}else{if(at=="("){if(ay>=0){ax={name:ab(ay+1,an),value:null};ad.pseudos.push(ax)}af=an}else{if((at==" ")&&(au!=at)){ar()}}}}}}}}}return am};var E=function(ab,d){if(!ab){return d}if(!d){return ab}return function(){return ab.apply(window,arguments)&&d.apply(window,arguments)}};var k=function(ab,d){var ac=d||[];if(ab){ac.push(ab)}return ac};var P=function(d){return(1==d.nodeType)};var s="";var t=function(ab,d){if(!ab){return s}if(d=="class"){return ab.className||s}if(d=="for"){return ab.htmlFor||s}if(d=="style"){return ab.style.cssText||s}return(W?ab.getAttribute(d):ab.getAttribute(d,2))||s};var n={"*=":function(d,ab){return function(ac){return(t(ac,d).indexOf(ab)>=0)}},"^=":function(d,ab){return function(ac){return(t(ac,d).indexOf(ab)==0)}},"$=":function(d,ac){var ab=" "+ac;return function(ae){var ad=" "+t(ae,d);return(ad.lastIndexOf(ac)==(ad.length-ac.length))}},"~=":function(d,ac){var ab=" "+ac+" ";return function(ae){var ad=" "+t(ae,d)+" ";return(ad.indexOf(ab)>=0)}},"|=":function(d,ac){var ab=" "+ac+"-";return function(ae){var ad=" "+t(ae,d);return((ad==ac)||(ad.indexOf(ab)==0))}},"=":function(d,ab){return function(ac){return(t(ac,d)==ab)}}};var f=(typeof Z().firstChild.nextElementSibling=="undefined");var X=!f?"nextElementSibling":"nextSibling";var q=!f?"previousElementSibling":"previousSibling";var e=(f?P:G);var l=function(d){while(d=d[q]){if(e(d)){return false}}return true};var B=function(d){while(d=d[X]){if(e(d)){return false}}return true};var x=function(af){var ac=af.parentNode;var ae=0,ag=ac[J],ad=(af._i||-1),ab=(ac._l||-1);if(!ag){return -1}var d=ag.length;if(ab==d&&ad>=0&&ab>=0){return ad}ac._l=d;ad=-1;for(var ah=ac.firstElementChild||ac.firstChild;ah;ah=ah[X]){if(e(ah)){ah._i=++ae;if(af===ah){ad=ae}}}return ad};var r=function(d){return !((x(d))%2)};var N=function(d){return((x(d))%2)};var aa={checked:function(d,ab){return function(ac){return !!Y.attr(ac,"checked")}},"first-child":function(){return l},"last-child":function(){return B},"only-child":function(d,ab){return function(ac){if(!l(ac)){return false}if(!B(ac)){return false}return true}},empty:function(d,ab){return function(af){var ag=af.childNodes;var ad=af.childNodes.length;for(var ac=ad-1;ac>=0;ac--){var ae=ag[ac].nodeType;if((ae===1)||(ae==3)){return false}}return true}},contains:function(d,ac){var ab=ac.charAt(0);if(ab=='"'||ab=="'"){ac=ac.slice(1,-1)}return function(ad){return(ad.innerHTML.indexOf(ac)>=0)}},not:function(d,ae){var ac=m(ae)[0];var ad={el:1};if(ac.tag!="*"){ad.tag=1}if(!ac.classes.length){ad.classes=1}var ab=H(ac,ad);return function(af){return(!ab(af))}},"nth-child":function(ab,ae){var ag=parseInt;if(ae=="odd"){return N}else{if(ae=="even"){return r}}if(ae.indexOf("n")!=-1){var ai=ae.split("n",2);var ac=ai[0]?((ai[0]=="-")?-1:ag(ai[0])):1;var ah=ai[1]?ag(ai[1]):0;var ad=0,d=-1;if(ac>0){if(ah<0){ah=(ah%ac)&&(ac+(ah%ac))}else{if(ah>0){if(ah>=ac){ad=ah-ah%ac}ah=ah%ac}}}else{if(ac<0){ac*=-1;if(ah>0){d=ah;ah=ah%ac}}}if(ac>0){return function(ak){var aj=x(ak);return(aj>=ad)&&(d<0||aj<=d)&&((aj%ac)==ah)}}else{ae=ah}}var af=ag(ae);return function(aj){return(x(aj)==af)}}};var T=(Y.isIE)?function(d){var ab=d.toLowerCase();if(ab=="class"){d="className"}return function(ac){return(W?ac.getAttribute(d):ac[d]||ac[ab])}}:function(d){return function(ab){return(ab&&ab.getAttribute&&ab.hasAttribute(d))}};var H=function(ab,ac){if(!ab){return G}ac=ac||{};var d=null;if(!("el" in ac)){d=E(d,P)}if(!("tag" in ac)){if(ab.tag!="*"){d=E(d,function(ad){return(ad&&(ad.tagName==ab.getTag()))})}}if(!("classes" in ac)){U(ab.classes,function(af,ae,ad){var ag=new RegExp("(?:^|\\s)"+af+"(?:\\s|$)");d=E(d,function(ah){return ag.test(ah.className)});d.count=ae})}if(!("pseudos" in ac)){U(ab.pseudos,function(ae){var ad=ae.name;if(aa[ad]){d=E(d,aa[ad](ad,ae.value))}})}if(!("attrs" in ac)){U(ab.attrs,function(ad){var af;var ae=ad.attr;if(ad.type&&n[ad.type]){af=n[ad.type](ae,ad.matchFor)}else{if(ae.length){af=T(ae)}}if(af){d=E(d,af)}})}if(!("id" in ac)){if(ab.id){d=E(d,function(ad){return(!!ad&&(ad.id==ab.id))})}}if(!d){if(!("default" in ac)){d=G}}return d};var i=function(d){return function(ad,ab,ac){while(ad=ad[X]){if(f&&(!P(ad))){continue}if((!ac||C(ad,ac))&&d(ad)){ab.push(ad)}break}return ab}};var L=function(d){return function(ab,ac,ad){var ae=ab[X];while(ae){if(e(ae)){if(ad&&!C(ae,ad)){break}if(d(ae)){ac.push(ae)}}ae=ae[X]}return ac}};var o=function(d){d=d||G;return function(ac,ad,ae){var ag,ab=0,af=ac[J];while(ag=af[ab++]){if(e(ag)&&(!ae||C(ag,ae))&&(d(ag,ab))){ad.push(ag)}}return ad}};var D=function(ac,d){var ab=ac.parentNode;while(ab){if(ab==d){break}ab=ab.parentNode}return !!ab};var v={};var F=function(ai){var ad=v[ai.query];if(ad){return ad}var ag=ai.infixOper;var ab=(ag?ag.oper:"");var af=H(ai,{el:1});var ah=ai.tag;var ac=("*"==ah);var ae=Z()["getElementsByClassName"];if(!ab){if(ai.id){af=(!ai.loops&&ac)?G:H(ai,{el:1,id:1});ad=function(al,ak){var am=Y.byId(ai.id,(al.ownerDocument||al));if(!am||!af(am)){return}if(9==al.nodeType){return k(am,ak)}else{if(D(am,al)){return k(am,ak)}}}}else{if(ae&&/\{\s*\[native code\]\s*\}/.test(String(ae))&&ai.classes.length&&!V){af=H(ai,{el:1,classes:1,id:1});var d=ai.classes.join(" ");ad=function(am,al){var an=k(0,al),ap,ak=0;var ao=am.getElementsByClassName(d);while((ap=ao[ak++])){if(af(ap,am)){an.push(ap)}}return an}}else{if(!ac&&!ai.loops){ad=function(am,al){var an=k(0,al),ap,ak=0;var ao=am.getElementsByTagName(ai.getTag());while((ap=ao[ak++])){an.push(ap)}return an}}else{af=H(ai,{el:1,tag:1,id:1});ad=function(am,al){var an=k(0,al),ap,ak=0;var ao=am.getElementsByTagName(ai.getTag());while((ap=ao[ak++])){if(af(ap,am)){an.push(ap)}}return an}}}}}else{var aj={el:1};if(ac){aj.tag=1}af=H(ai,aj);if("+"==ab){ad=i(af)}else{if("~"==ab){ad=L(af)}else{if(">"==ab){ad=o(af)}}}}return v[ai.query]=ad};var O=function(af,ak){var ad=k(af),ai,ag,ab,aj=ak.length,d,ae;for(var ac=0;ac<aj;ac++){ae=[];ai=ak[ac];ag=ad.length-1;if(ag>0){d={};ae.nozip=true}var ah=F(ai);while(ab=ad[ag--]){ah(ab,ae,d)}if(!ae.length){break}ad=ae}return ae};var S={},h={};var u=function(ab){var d=m(a(ab));if(d.length==1){var ac=F(d[0]);return function(ad){var ae=ac(ad,new M());if(ae){ae.nozip=true}return ae}}return function(ad){return O(ad,d)}};var c=navigator.userAgent;var b="WebKit/";var A=(Y.isWebKit&&(c.indexOf(b)>0)&&(parseFloat(c.split(b)[1])>528));var K=Y.isIE?"commentStrip":"nozip";var w="querySelectorAll";var j=(!!Z()[w]&&(!Y.isSafari||(Y.isSafari>3.1)||A));var I=function(ae,ai){if(j){var d=h[ae];if(d&&!ai){return d}}var ag=S[ae];if(ag){return ag}var ah=ae.charAt(0);var ad=(-1==ae.indexOf(" "));if((ae.indexOf("#")>=0)&&(ad)){ai=true}var ac=(j&&(!ai)&&(R.indexOf(ah)==-1)&&(!Y.isIE||(ae.indexOf(":")==-1))&&(!(V&&(ae.indexOf(".")>=0)))&&(ae.indexOf(":contains")==-1)&&(ae.indexOf("|=")==-1));if(ac){var af=(R.indexOf(ae.charAt(ae.length-1))>=0)?(ae+" *"):ae;return h[ae]=function(aj){try{if(!((9==aj.nodeType)||ad)){throw""}var ak=aj[w](af);ak[K]=true;return ak}catch(al){return I(ae,true)(aj)}}}else{var ab=ae.split(/\s*,\s*/);return S[ae]=((ab.length<2)?u(ae):function(aj){var al=0,ak=[],am;while((am=ab[al++])){ak=ak.concat(u(am)(aj))}return ak})}};var g=0;var Q=Y.isIE?function(d){if(W){return(d.getAttribute("_uid")||d.setAttribute("_uid",++g)||g)}else{return d.uniqueID}}:function(d){return(d._uid||(d._uid=++g))};var C=function(ab,d){if(!d){return 1}var ac=Q(ab);if(!d[ac]){return d[ac]=1}return 0};var z="_zipIdx";var y=function(ab){if(ab&&ab.nozip){return(M._wrap)?M._wrap(ab):ab}var ac=new M();if(!ab||!ab.length){return ac}if(ab[0]){ac.push(ab[0])}if(ab.length<2){return ac}g++;if(Y.isIE&&W){var ad=g+"";ab[0].setAttribute(z,ad);for(var d=1,af;af=ab[d];d++){if(ab[d].getAttribute(z)!=ad){ac.push(af)}af.setAttribute(z,ad)}}else{if(Y.isIE&&ab.commentStrip){try{for(var d=1,af;af=ab[d];d++){if(P(af)){ac.push(af)}}}catch(ae){}}else{if(ab[0]){ab[0][z]=g}for(var d=1,af;af=ab[d];d++){if(ab[d][z]!=g){ac.push(af)}af[z]=g}}}return ac};Y.query=function(ad,ab){M=Y._queryListCtor;if(!ad){return new M()}if(ad.constructor==M){return ad}if(!p(ad)){return new M(ad)}if(p(ab)){ab=Y.byId(ab);if(!ab){return new M()}}ab=ab||Z();var d=ab.ownerDocument||ab.documentElement;W=(ab.contentType&&ab.contentType=="application/xml")||(Y.isOpera&&(ab.doctype||d.toString()=="[object XMLDocument]"))||(!!d)&&(Y.isIE?d.xml:(ab.xmlVersion||d.xmlVersion));var ac=I(ad)(ab);if(ac&&ac.nozip&&!M._wrap){return ac}return y(ac)};Y.query.pseudos=aa;Y._filterQueryResult=function(ab,ac){var ae=new Y._queryListCtor();var ad=H(m(ac)[0]);for(var d=0,af;af=ab[d];d++){if(ad(af)){ae.push(af)}}return ae}})(this["queryPortability"]||this["acme"]||dojo);

function find(q, n) {
  return acme.query(q, n || unsafeWindow.document);
}
/*
function log(a, b, c, d, e) {
  switch(arguments.length) {
    case 1: unsafeWindow.console.log(a);break;
    case 2: unsafeWindow.console.log(a, b);break;
    case 3: unsafeWindow.console.log(a, b, c);break;
    case 4: unsafeWindow.console.log(a, b, c, d);break;
    case 5: unsafeWindow.console.log(a, b, c, d, e);break;
  }
}
*/

var icon, menu, timer, selectedCheck;

var dragEnabled = false;
var dragValue;

function initChecks() {
  unsafeWindow.___loaded = true;
  
  document.addEventListener("mouseover", function(evt){
    if (evt.target.tagName == "INPUT" && evt.target.getAttribute("type") =="checkbox") {
      if (dragEnabled) {
        setCheckValue(evt.target, dragValue);
      } else {
        showIcon(evt);
      }
    }
  }, false);
  
  document.addEventListener("mouseout", function(evt){
    if (evt.target.tagName == "INPUT" && evt.target.getAttribute("type") =="checkbox") {
      if (dragEnabled) {
        setCheckValue(evt.target, dragValue);
      } else {
        hideIcon(true);
      }
    }
  }, false);
  
  document.addEventListener("mousedown", function(evt){
  
    if (evt.target.tagName == "INPUT" && evt.target.getAttribute("type") =="checkbox") {
      dragEnabled = true;
      dragValue = !evt.target.checked;
    }
    
    return true;
  }, false);
  
  document.addEventListener("mouseup", function(evt){
    dragEnabled = false
    return true;
  }, false);
}

function addElementsToPage(){
  if (icon){
    return;
  }
  var img = icon = document.createElement("img");
  img.setAttribute("src", "http://www.chofter.com/apps/EasyCheckboxes/tag_blue.png");
  img.style.position = "absolute";
  img.style.left = "-1000px";
  img.style.zIndex = 1000;
  unsafeWindow.document.body.appendChild(img);
  
  img.addEventListener("mouseover", function(){
     showMenu(abspos(icon, true));
     hideIcon(false);
   }, true);
  
  menu = document.createElement("table");
  menu.style.position = "absolute";
  menu.style.left = "-1000px";
  menu.style.backgroundColor = "#F7F7F7";
  menu.style.border = "1px solid #7EABCD";
  menu.style.margin = 0;
  menu.style.padding = 0;
  menu.style.zIndex = 1000;
  menu.setAttribute("cellpadding", 0);
  menu.setAttribute("cellspacing", 0);
  
  
  function makeRow(text, border) {
    return "<tr><td cellpadding='0' style='padding:1px;"+ (border ? "border-" + border + ": 1px solid #9B9B9B;" : "") 
      + "'><a style='color:black;font-weight:bold;text-decoration:none;font-size:11px;padding:2px;"
      + "font-family:arial; width:100%;' href='#'>" + text + "</a></td></tr>";
  }
  
  menu.innerHTML = "<tbody>"
    + makeRow("Select All")
    + makeRow("Deselect All")
    + makeRow("Toggle All", "bottom")
    + makeRow("Select Absolutely All")
    + makeRow("Deselect Absolutely All")
    + makeRow("Toggle Absolutely All")
    + "</tbody>";
  
  unsafeWindow.document.body.appendChild(menu);
  
  
  menu.addEventListener("click", function(evt){
    evt.stopPropagation();
    evt.preventDefault();

    var a = evt.target;
    if (a.tagName != "A") {
      return;
    }
    
    if (a.innerHTML == "Select All") {
      setCheckState(true);
    } else if (a.innerHTML == "Deselect All") {
      setCheckState(false);
    } else if (a.innerHTML == "Toggle All") {
      setCheckState("toggle");
    } else if (a.innerHTML == "Select Absolutely All") {
      setCheckState(true, true);
    } else if (a.innerHTML == "Deselect Absolutely All") {
      setCheckState(false, true);
    } else if (a.innerHTML == "Toggle Absolutely All") {
      setCheckState("toggle", true);
    } 
    
    hideMenu();
  }, true);
  
  menu.addEventListener("mouseout", function(evt){
    hideMenu(true);
  }, true);
  
  menu.addEventListener("mouseover", function(evt){
      clearTimer();
  }, true);
  
  unsafeWindow.document.addEventListener("click", function(){
    hideMenu();
  }, true);
}

function clearTimer(){
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}

function showIcon(evt) {
  if (!icon) {
    addElementsToPage();
  }
  clearTimer();
  hideMenu();
  var pos = abspos(evt.target, true);
  icon.style.left = (pos.x + 14) + "px";
  icon.style.top = (pos.y - evt.target.offsetHeight - 4) + "px";
  selectedCheck = evt.target;
  
}

function hideIcon(useTimer) {
  if (!icon) {
    return;
  }
  var fn = function(){
    icon.style.left = "-1000px";
  };
  if (useTimer) {
    timer = setTimeout(fn, 800);
  } else {
    fn();
  }
}

function showMenu(pos){
  if (!menu) {
    return;
  }

  var vp = getViewport();
  
  if (pos.x + menu.offsetWidth > vp.w) {
    pos.x -= (menu.offsetWidth + 15);
  }
  var scroll = docScroll();
  var yDiff = vp.h - (pos.y - scroll.y + menu.offsetHeight);
  if (yDiff < 0) {
    pos.y += (yDiff);
  }

  pos.y = Math.max(pos.y, 10 + scroll.y);
  menu.style.left = pos.x + "px";
  menu.style.top = (pos.y - 5) + "px";
}

function hideMenu(useTimer){
  if (!menu) {
    return;
  }
  var fn = function(){
    menu.style.left = "-1000px";
  };
  if (useTimer) {
    timer = setTimeout(fn, 500);
  } else {
    fn();
  }
}

function getViewport() {
	// summary:
	//		Returns the dimensions and scroll position of the viewable area of a browser window
  var d = unsafeWindow.document;
  var scrollRoot = (d.compatMode == 'BackCompat')? d.body : d.documentElement;

  // get scroll position
  var scroll = docScroll(); // scrollRoot.scrollTop/Left should work
  return { w: scrollRoot.clientWidth, h: scrollRoot.clientHeight, l: scroll.x, t: scroll.y };
}

function countNodesByLeft(nodes, left) {
  if (nodes.length == 1) {
    return 1;
  }
  var count = 0;
  for (var i = 0; i < nodes.length; i++) {
    if (abspos(nodes[i], true).x == left) {
      count ++;
    }
  }
  return count;
}

function setCheckState(check, ignorePos) {
  var n = selectedCheck.parentNode;
  
  var left = abspos(selectedCheck, true).x;
  
  var nodes = find("input[type='checkbox']", ignorePos ? null : n);
    
  while (!ignorePos && n && countNodesByLeft(nodes, left) < 2) {
    n = n.parentNode;
    nodes = find("input[type='checkbox']", n);
  }
  
  for (var i = 0; i < nodes.length; i++) {
    if (ignorePos || abspos(nodes[i], true).x == left) {
    
      setCheckValue(nodes[i], (check == "toggle") ? !nodes[i].checked : check);
    }
  }
}

function setCheckValue(node, value) {
  // Correctly handle the Dojo Ajax Toolkit checkbox widget
  if (node.className && node.className.indexOf("dijitCheckBoxInput") > -1 && unsafeWindow.dijit) {
    unsafeWindow.dijit.byId(node.id).attr("value", value);
  } else {
    node.checked = value;
  }

}

function docScroll (){
	var 
		_w = unsafeWindow,
		_b = _w.document.body,
		de = _w.document.documentElement;
	return {
		y: (_w.pageYOffset || de.scrollTop || _b.scrollTop || 0),
		x: (_w.pageXOffset || de.scrollLeft || _b.scrollLeft || 0)
	};
};

function gcs(node){
	return node instanceof HTMLElement ? 
		node.ownerDocument.defaultView.getComputedStyle(node, null) : {};
};

function px(element, value){
	// style values can be floats, client code may want
	// to round for integer pixels.
	return parseFloat(value) || 0; 
};

function abspos (/*DomNode*/node, /*Boolean?*/includeScroll){
	//	summary:
	//		Gets the position of the passed element relative to
	//		the viewport (if includeScroll==false), or relative to the
	//		document root (if includeScroll==true).
	//
	//		Returns an object of the form:
	//			{ x: 100, y: 300 }
	//		if includeScroll is passed, the x and y values will include any
	//		document offsets that may affect the position relative to the
	//		viewport.

	// targetBoxType == "border-box"
	var db = unsafeWindow.document.body, dh = db.parentNode, ret;
	
	// FF3+, super-modern WebKit, and Opera 9.6+ all take this branch
	var client = node.getBoundingClientRect();
	ret = { x: client.left, y: client.top };

	// in FF3 you have to subtract the document element margins
	var cs = gcs(dh);
	ret.x -= px(dh, cs.marginLeft) + px(dh, cs.borderLeftWidth);
	ret.y -= px(dh, cs.marginTop) + px(dh, cs.borderTopWidth);
		
	
	// account for document scrolling
	// if offsetParent is used, ret value already includes scroll position
	// so we may have to actually remove that value if !includeScroll
	if(includeScroll){
		var scroll = docScroll();
		ret.x += scroll.x;
		ret.y += scroll.y;
	}

	return ret; // Object
}

initChecks();