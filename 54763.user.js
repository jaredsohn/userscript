// ==UserScript==
// @name           FancifiedGalleries
// @namespace      http://chofter.com/apps
// @description    Easily turns a simple HTML based slideshows into a far cooler Ajax-ified dynamic galleries.  This makes it much quicker and simpler to look through numerous images, without having to go through many HTML pages.
// @include        http://*
// ==/UserScript==

/*
  Include the Acme CSS selector library (http://dojotoolkit.org) to find anchor tags on the page amazingly fast
*/
(function(){acme={trim:function(g){g=g.replace(/^\s+/,"");for(var f=g.length-1;f>=0;f--){if(/\S/.test(g.charAt(f))){g=g.substring(0,f+1);break}}return g},forEach:function(f,k,h){if(!f||!f.length){return}for(var j=0,g=f.length;j<g;++j){k.call(h||window,f[j],j,f)}},byId:function(g,f){if(typeof g=="string"){return(f||document).getElementById(g)}else{return g}},isString:function(f){return(typeof f=="string")},doc:document,NodeList:Array};var e=navigator;var a=e.userAgent;var d=e.appVersion;var c=parseFloat(d);acme.isOpera=(a.indexOf("Opera")>=0)?c:undefined;acme.isKhtml=(d.indexOf("Konqueror")>=0)?c:undefined;acme.isWebKit=parseFloat(a.split("WebKit/")[1])||undefined;acme.isChrome=parseFloat(a.split("Chrome/")[1])||undefined;var b=Math.max(d.indexOf("WebKit"),d.indexOf("Safari"),0);if(b&&!acme.isChrome){acme.isSafari=parseFloat(d.split("Version/")[1]);if(!acme.isSafari||parseFloat(d.substr(b+7))<=419.3){acme.isSafari=2}}if(document.all&&!acme.isOpera){acme.isIE=parseFloat(d.split("MSIE ")[1])||undefined}Array._wrap=function(f){return f}})();(function(Y){var a=Y.trim;var U=Y.forEach;var M=Y._queryListCtor=Y.NodeList;var p=Y.isString;var Z=function(){return Y.doc};var V=(Y.isWebKit&&((Z().compatMode)=="BackCompat"));var J=!!Z().firstChild.children?"children":"childNodes";var R=">~+";var W=false;var G=function(){return true};var m=function(ah){if(R.indexOf(ah.slice(-1))>=0){ah+=" * "}else{ah+=" "}var ab=function(az,aA){return a(ah.slice(az,aA))};var am=[];var ai=-1,af=-1,ap=-1,ay=-1,d=-1,ae=-1,ao=-1,au="",at="",ag;var an=0,ac=ah.length,ad=null,ax=null;var al=function(){if(ao>=0){var az=(ao==an)?null:ab(ao,an);ad[(R.indexOf(az)<0)?"tag":"oper"]=az;ao=-1}};var aw=function(){if(ae>=0){ad.id=ab(ae,an).replace(/\\/g,"");ae=-1}};var ak=function(){if(d>=0){ad.classes.push(ab(d+1,an).replace(/\\/g,""));d=-1}};var aq=function(){aw();al();ak()};var ar=function(){aq();if(ay>=0){ad.pseudos.push({name:ab(ay+1,an)})}ad.loops=(ad.pseudos.length||ad.attrs.length||ad.classes.length);ad.oquery=ad.query=ab(ag,an);ad.otag=ad.tag=(ad.oper)?null:(ad.tag||"*");if(ad.tag){ad.tag=ad.tag.toUpperCase()}if(am.length&&(am[am.length-1].oper)){ad.infixOper=am.pop();ad.query=ad.infixOper.query+" "+ad.query}am.push(ad);ad=null};for(;au=at,at=ah.charAt(an),an<ac;an++){if(au=="\\"){continue}if(!ad){ag=an;ad={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){return(W)?this.otag:this.tag}};ao=an}if(ai>=0){if(at=="]"){if(!ax.attr){ax.attr=ab(ai+1,an)}else{ax.matchFor=ab((ap||ai+1),an)}var av=ax.matchFor;if(av){if((av.charAt(0)=='"')||(av.charAt(0)=="'")){ax.matchFor=av.slice(1,-1)}}ad.attrs.push(ax);ax=null;ai=ap=-1}else{if(at=="="){var aj=("|~^$*".indexOf(au)>=0)?au:"";ax.type=aj+at;ax.attr=ab(ai+1,an-aj.length);ap=an+1}}}else{if(af>=0){if(at==")"){if(ay>=0){ax.value=ab(af+1,an)}ay=af=-1}}else{if(at=="#"){aq();ae=an+1}else{if(at=="."){aq();d=an}else{if(at==":"){aq();ay=an}else{if(at=="["){aq();ai=an;ax={}}else{if(at=="("){if(ay>=0){ax={name:ab(ay+1,an),value:null};ad.pseudos.push(ax)}af=an}else{if((at==" ")&&(au!=at)){ar()}}}}}}}}}return am};var E=function(ab,d){if(!ab){return d}if(!d){return ab}return function(){return ab.apply(window,arguments)&&d.apply(window,arguments)}};var k=function(ab,d){var ac=d||[];if(ab){ac.push(ab)}return ac};var P=function(d){return(1==d.nodeType)};var s="";var t=function(ab,d){if(!ab){return s}if(d=="class"){return ab.className||s}if(d=="for"){return ab.htmlFor||s}if(d=="style"){return ab.style.cssText||s}return(W?ab.getAttribute(d):ab.getAttribute(d,2))||s};var n={"*=":function(d,ab){return function(ac){return(t(ac,d).indexOf(ab)>=0)}},"^=":function(d,ab){return function(ac){return(t(ac,d).indexOf(ab)==0)}},"$=":function(d,ac){var ab=" "+ac;return function(ae){var ad=" "+t(ae,d);return(ad.lastIndexOf(ac)==(ad.length-ac.length))}},"~=":function(d,ac){var ab=" "+ac+" ";return function(ae){var ad=" "+t(ae,d)+" ";return(ad.indexOf(ab)>=0)}},"|=":function(d,ac){var ab=" "+ac+"-";return function(ae){var ad=" "+t(ae,d);return((ad==ac)||(ad.indexOf(ab)==0))}},"=":function(d,ab){return function(ac){return(t(ac,d)==ab)}}};var f=(typeof Z().firstChild.nextElementSibling=="undefined");var X=!f?"nextElementSibling":"nextSibling";var q=!f?"previousElementSibling":"previousSibling";var e=(f?P:G);var l=function(d){while(d=d[q]){if(e(d)){return false}}return true};var B=function(d){while(d=d[X]){if(e(d)){return false}}return true};var x=function(af){var ac=af.parentNode;var ae=0,ag=ac[J],ad=(af._i||-1),ab=(ac._l||-1);if(!ag){return -1}var d=ag.length;if(ab==d&&ad>=0&&ab>=0){return ad}ac._l=d;ad=-1;for(var ah=ac.firstElementChild||ac.firstChild;ah;ah=ah[X]){if(e(ah)){ah._i=++ae;if(af===ah){ad=ae}}}return ad};var r=function(d){return !((x(d))%2)};var N=function(d){return((x(d))%2)};var aa={checked:function(d,ab){return function(ac){return !!Y.attr(ac,"checked")}},"first-child":function(){return l},"last-child":function(){return B},"only-child":function(d,ab){return function(ac){if(!l(ac)){return false}if(!B(ac)){return false}return true}},empty:function(d,ab){return function(af){var ag=af.childNodes;var ad=af.childNodes.length;for(var ac=ad-1;ac>=0;ac--){var ae=ag[ac].nodeType;if((ae===1)||(ae==3)){return false}}return true}},contains:function(d,ac){var ab=ac.charAt(0);if(ab=='"'||ab=="'"){ac=ac.slice(1,-1)}return function(ad){return(ad.innerHTML.indexOf(ac)>=0)}},not:function(d,ae){var ac=m(ae)[0];var ad={el:1};if(ac.tag!="*"){ad.tag=1}if(!ac.classes.length){ad.classes=1}var ab=H(ac,ad);return function(af){return(!ab(af))}},"nth-child":function(ab,ae){var ag=parseInt;if(ae=="odd"){return N}else{if(ae=="even"){return r}}if(ae.indexOf("n")!=-1){var ai=ae.split("n",2);var ac=ai[0]?((ai[0]=="-")?-1:ag(ai[0])):1;var ah=ai[1]?ag(ai[1]):0;var ad=0,d=-1;if(ac>0){if(ah<0){ah=(ah%ac)&&(ac+(ah%ac))}else{if(ah>0){if(ah>=ac){ad=ah-ah%ac}ah=ah%ac}}}else{if(ac<0){ac*=-1;if(ah>0){d=ah;ah=ah%ac}}}if(ac>0){return function(ak){var aj=x(ak);return(aj>=ad)&&(d<0||aj<=d)&&((aj%ac)==ah)}}else{ae=ah}}var af=ag(ae);return function(aj){return(x(aj)==af)}}};var T=(Y.isIE)?function(d){var ab=d.toLowerCase();if(ab=="class"){d="className"}return function(ac){return(W?ac.getAttribute(d):ac[d]||ac[ab])}}:function(d){return function(ab){return(ab&&ab.getAttribute&&ab.hasAttribute(d))}};var H=function(ab,ac){if(!ab){return G}ac=ac||{};var d=null;if(!("el" in ac)){d=E(d,P)}if(!("tag" in ac)){if(ab.tag!="*"){d=E(d,function(ad){return(ad&&(ad.tagName==ab.getTag()))})}}if(!("classes" in ac)){U(ab.classes,function(af,ae,ad){var ag=new RegExp("(?:^|\\s)"+af+"(?:\\s|$)");d=E(d,function(ah){return ag.test(ah.className)});d.count=ae})}if(!("pseudos" in ac)){U(ab.pseudos,function(ae){var ad=ae.name;if(aa[ad]){d=E(d,aa[ad](ad,ae.value))}})}if(!("attrs" in ac)){U(ab.attrs,function(ad){var af;var ae=ad.attr;if(ad.type&&n[ad.type]){af=n[ad.type](ae,ad.matchFor)}else{if(ae.length){af=T(ae)}}if(af){d=E(d,af)}})}if(!("id" in ac)){if(ab.id){d=E(d,function(ad){return(!!ad&&(ad.id==ab.id))})}}if(!d){if(!("default" in ac)){d=G}}return d};var i=function(d){return function(ad,ab,ac){while(ad=ad[X]){if(f&&(!P(ad))){continue}if((!ac||C(ad,ac))&&d(ad)){ab.push(ad)}break}return ab}};var L=function(d){return function(ab,ac,ad){var ae=ab[X];while(ae){if(e(ae)){if(ad&&!C(ae,ad)){break}if(d(ae)){ac.push(ae)}}ae=ae[X]}return ac}};var o=function(d){d=d||G;return function(ac,ad,ae){var ag,ab=0,af=ac[J];while(ag=af[ab++]){if(e(ag)&&(!ae||C(ag,ae))&&(d(ag,ab))){ad.push(ag)}}return ad}};var D=function(ac,d){var ab=ac.parentNode;while(ab){if(ab==d){break}ab=ab.parentNode}return !!ab};var v={};var F=function(ai){var ad=v[ai.query];if(ad){return ad}var ag=ai.infixOper;var ab=(ag?ag.oper:"");var af=H(ai,{el:1});var ah=ai.tag;var ac=("*"==ah);var ae=Z()["getElementsByClassName"];if(!ab){if(ai.id){af=(!ai.loops&&ac)?G:H(ai,{el:1,id:1});ad=function(al,ak){var am=Y.byId(ai.id,(al.ownerDocument||al));if(!am||!af(am)){return}if(9==al.nodeType){return k(am,ak)}else{if(D(am,al)){return k(am,ak)}}}}else{if(ae&&/\{\s*\[native code\]\s*\}/.test(String(ae))&&ai.classes.length&&!V){af=H(ai,{el:1,classes:1,id:1});var d=ai.classes.join(" ");ad=function(am,al){var an=k(0,al),ap,ak=0;var ao=am.getElementsByClassName(d);while((ap=ao[ak++])){if(af(ap,am)){an.push(ap)}}return an}}else{if(!ac&&!ai.loops){ad=function(am,al){var an=k(0,al),ap,ak=0;var ao=am.getElementsByTagName(ai.getTag());while((ap=ao[ak++])){an.push(ap)}return an}}else{af=H(ai,{el:1,tag:1,id:1});ad=function(am,al){var an=k(0,al),ap,ak=0;var ao=am.getElementsByTagName(ai.getTag());while((ap=ao[ak++])){if(af(ap,am)){an.push(ap)}}return an}}}}}else{var aj={el:1};if(ac){aj.tag=1}af=H(ai,aj);if("+"==ab){ad=i(af)}else{if("~"==ab){ad=L(af)}else{if(">"==ab){ad=o(af)}}}}return v[ai.query]=ad};var O=function(af,ak){var ad=k(af),ai,ag,ab,aj=ak.length,d,ae;for(var ac=0;ac<aj;ac++){ae=[];ai=ak[ac];ag=ad.length-1;if(ag>0){d={};ae.nozip=true}var ah=F(ai);while(ab=ad[ag--]){ah(ab,ae,d)}if(!ae.length){break}ad=ae}return ae};var S={},h={};var u=function(ab){var d=m(a(ab));if(d.length==1){var ac=F(d[0]);return function(ad){var ae=ac(ad,new M());if(ae){ae.nozip=true}return ae}}return function(ad){return O(ad,d)}};var c=navigator.userAgent;var b="WebKit/";var A=(Y.isWebKit&&(c.indexOf(b)>0)&&(parseFloat(c.split(b)[1])>528));var K=Y.isIE?"commentStrip":"nozip";var w="querySelectorAll";var j=(!!Z()[w]&&(!Y.isSafari||(Y.isSafari>3.1)||A));var I=function(ae,ai){if(j){var d=h[ae];if(d&&!ai){return d}}var ag=S[ae];if(ag){return ag}var ah=ae.charAt(0);var ad=(-1==ae.indexOf(" "));if((ae.indexOf("#")>=0)&&(ad)){ai=true}var ac=(j&&(!ai)&&(R.indexOf(ah)==-1)&&(!Y.isIE||(ae.indexOf(":")==-1))&&(!(V&&(ae.indexOf(".")>=0)))&&(ae.indexOf(":contains")==-1)&&(ae.indexOf("|=")==-1));if(ac){var af=(R.indexOf(ae.charAt(ae.length-1))>=0)?(ae+" *"):ae;return h[ae]=function(aj){try{if(!((9==aj.nodeType)||ad)){throw""}var ak=aj[w](af);ak[K]=true;return ak}catch(al){return I(ae,true)(aj)}}}else{var ab=ae.split(/\s*,\s*/);return S[ae]=((ab.length<2)?u(ae):function(aj){var al=0,ak=[],am;while((am=ab[al++])){ak=ak.concat(u(am)(aj))}return ak})}};var g=0;var Q=Y.isIE?function(d){if(W){return(d.getAttribute("_uid")||d.setAttribute("_uid",++g)||g)}else{return d.uniqueID}}:function(d){return(d._uid||(d._uid=++g))};var C=function(ab,d){if(!d){return 1}var ac=Q(ab);if(!d[ac]){return d[ac]=1}return 0};var z="_zipIdx";var y=function(ab){if(ab&&ab.nozip){return(M._wrap)?M._wrap(ab):ab}var ac=new M();if(!ab||!ab.length){return ac}if(ab[0]){ac.push(ab[0])}if(ab.length<2){return ac}g++;if(Y.isIE&&W){var ad=g+"";ab[0].setAttribute(z,ad);for(var d=1,af;af=ab[d];d++){if(ab[d].getAttribute(z)!=ad){ac.push(af)}af.setAttribute(z,ad)}}else{if(Y.isIE&&ab.commentStrip){try{for(var d=1,af;af=ab[d];d++){if(P(af)){ac.push(af)}}}catch(ae){}}else{if(ab[0]){ab[0][z]=g}for(var d=1,af;af=ab[d];d++){if(ab[d][z]!=g){ac.push(af)}af[z]=g}}}return ac};Y.query=function(ad,ab){M=Y._queryListCtor;if(!ad){return new M()}if(ad.constructor==M){return ad}if(!p(ad)){return new M(ad)}if(p(ab)){ab=Y.byId(ab);if(!ab){return new M()}}ab=ab||Z();var d=ab.ownerDocument||ab.documentElement;W=(ab.contentType&&ab.contentType=="application/xml")||(Y.isOpera&&(ab.doctype||d.toString()=="[object XMLDocument]"))||(!!d)&&(Y.isIE?d.xml:(ab.xmlVersion||d.xmlVersion));var ac=I(ad)(ab);if(ac&&ac.nozip&&!M._wrap){return ac}return y(ac)};Y.query.pseudos=aa;Y._filterQueryResult=function(ab,ac){var ae=new Y._queryListCtor();var ad=H(m(ac)[0]);for(var d=0,af;af=ab[d];d++){if(ad(af)){ae.push(af)}}return ae}})(this["queryPortability"]||this["acme"]||dojo);

function find(q, n) {
  return acme.query(q, n || unsafeWindow.document);
}

var dojoPath = "http://o.aolcdn.com/dojo/1.3";
var icon, timer, highlightedImg;
var destImg, clickHandlerAdded, tempPageContainer;

var linkNodes = [];
var storedNodes = {};

var cache = {};

var head = document.body.previousSibling;

while (head && head.tagName != "HEAD") {
  head = head.previousSibling;
}

function log(){
  if (!unsafeWindow.console){return;}

  var start = 'GM --->';
  var method = 'log';

  if (arguments.length == 5) {
      unsafeWindow.console[method](start,arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
  } else if (arguments.length == 4) {
      unsafeWindow.console[method](start,arguments[0], arguments[1], arguments[2], arguments[3]);
  } else if (arguments.length == 3) {
      unsafeWindow.console[method](start,arguments[0], arguments[1], arguments[2]);
  } else if (arguments.length == 2) {
      unsafeWindow.console[method](start,arguments[0], arguments[1]);
  } else if (arguments.length == 1) {
    unsafeWindow.console[method](start,arguments[0]);
  } else {
    unsafeWindow.console[method](start,arguments[0], arguments[1]);
  }
}


function appendScript(href, domNode) {
  var script = document.createElement("script");

  if (href) {
    script.setAttribute("src", href);
  }
  script.setAttribute("type", "text/javascript");
  (domNode || head).appendChild(script);
}


doConnect(unsafeWindow.document.body, "mouseover", function(event) {
  var t = event.target;

  if (t == destImg || (t.tagName == "IMG" && t.width > 150 && t.height > 150)) {
    showIcon(t);
  }

});

function unplaceImage(img) {
  img.width += 4;
  img.height += 4;
  img.style.borderWidth = "0px";
  img._isPlaced = false;
}

function setImgAttr(img, attr, val) {
  img[attr] = val + "px";
  img.setAttribute(attr, val + "px");
}

function fixImgSize(img, w1, w2, h1, h2){
  var min = 200;
  var w = img.width || img.getAttribute("width");
  var h = img.height || img.getAttribute("height");

  log("Got width ", w, " height ", h);
  setImgAttr(img, "width" , w || w1 || w2);

  // setImgAttr(img, "height", h || h1 || h2);
  //   if (img.height < min) {
  //    setImgAttr(img, "height" , Math.max(min, w1));
  //   }
  if(img.width < min) {
   setImgAttr(img, "width" , Math.max(min, h1));
  }

  log("Final width " + img.width, " height " + img.height, "h1 = " + h1);
}

function placeImage(img) {
  if (img._isPlaced) {
    return;
  }

  var w1 = destImg.width, w2 = destImg.offsetWidth;
  var h1 = destImg.height, h2 = destImg.offsetHeight;
  fixImgSize(img, w1, w2, h1, h2);


  doConnect(img, "load", function(){
    fixImgSize(img, w1, w2, h1, h2);
  });


  img.width -= 4;
  img.height -= 4;
  img.style.border = "2px solid red";
  img._isPlaced = true;

  if (img == destImg) {
    return;
  }

  destImg.parentNode.replaceChild(img, destImg);
  unplaceImage(destImg);
  destImg = img;
}


// Icon Code

function addElementsToPage(){
  if (icon){
    return;
  }

  var img = icon = document.createElement("img");
  img.setAttribute("src", "http://www.chofter.com/apps/DaftMonkey/enlarge.png");
  img.style.position = "absolute";
  img.style.left = "-1000px";
  img.style.zIndex = 1000;
  img.style.cursor = "pointer";
  unsafeWindow.document.body.appendChild(img);

  doConnect(img, "click", function(evt){
    if (destImg) {
      unplaceImage(destImg);

      for (var i = 0; i < linkNodes.length; i++) {
        linkNodes[i].style.display = "";
        linkNodes[i].href = linkNodes[i]._origHref;
      }

      destImg = null;
    } else {

      destImg = highlightedImg;
      placeImage(destImg);
      imgQuery = buildPath(destImg).query;
      initClickHandler();
    }
  }, true);

}

function initClickHandler() {
  if (clickHandlerAdded) {
    return;
  }
  clickHandlerAdded =  true;
  doConnect(document.body, "click", function(evt){
    if (!destImg) {
      return true;
    }
    log('click');
    var t = evt.target;
    if (t.tagName == "IMG" && t.parentNode.tagName == "A") {
      evt.preventDefault();
      evt.stopPropagation();
      doLoadImg(t);
    } else if (t.tagName == "A" &&
    	(t.innerHTML.toLowerCase().indexOf("next") > -1 ||
    	 t.innerHTML.toLowerCase().indexOf("prev") > -1
    	)) {
      evt.preventDefault();
      evt.stopPropagation();
      doLoadAnchor(t);
    }
  });
}

function buildPath(node) {

  var q = "";
  var origNode = node;
  while (node != document.body) {

    var token = node.tagName;

    if (node.id) {
      token += "[id='" + node.id + "']";
    } else if (node.className && node.className.length > 0) {
      token += "." + node.className.split(" ")[0];
    }

    q = token + " " + q;

    node = node.parentNode;
  }

  var nodes = find(q);
  var i;
  for (i = 0; i < nodes.length; i++) {
    if (nodes[i] == origNode) {
      break;
    }
  }

  return {
  	query: q,
  	index: i
  	};

  //imgQuery = q;
}

function doLoadImg(img) {

  if (img.alt && img.alt.toLowerCase().indexOf("next") || img.alt.toLowerCase().indexOf("prev")) {
    doLoadAnchor(img.parentNode);
    return;
  }

  var url = img.parentNode.href;

  if (cache[url]) {
    placeImage(cache[url]);
  } else {

    GM_xmlhttpRequest({
      url : url,
      method: "GET",
      onload: function(data){
        var html = data.responseText;

        var imgNode = getNodesFromHtml(html, imgQuery)[0];
        log('used imgQuery', imgQuery, ' and got ', imgNode);
        if (!imgNode) {
          imgNode = findLargestImg();
        }

        if (imgNode) {
          cache[url] = imgNode;
          placeImage(imgNode);
        }
      },
      onerror: function(){
        alert("failed to load image");
      }
    });
  }
}

function doLoadAnchor(anchorTag) {

  var url = anchorTag.href;
  var nodePath = buildPath(anchorTag);

  initAnchor(anchorTag);

  if (cache[url]) {
    placeImage(cache[url]);
  } else {
    GM_xmlhttpRequest({
      url : url,
      method: "GET",
      onload: function(data){
        var html = data.responseText;

        var imgNode = getNodesFromHtml(html, imgQuery)[0];

        log('used query ' + imgQuery +  ' and got ', imgNode.src);

        if (!imgNode) {
          imgNode = findLargestImg();
        }

        if (imgNode) {
          // hack for Wired.com
          if (imgNode.getAttribute('data-lazy-src')) {
            imgNode.setAttribute('src', imgNode.getAttribute('data-lazy-src'));
          }

          cache[url] = imgNode;
          placeImage(imgNode);
        }

        // Find the corresponding node.
        var anchorNodes = getNodesFromHtml(null, nodePath.query);

        for (var i = 0; i < anchorNodes.length; i++) {
          if (anchorNodes[i].innerHTML == anchorTag.innerHTML) {
            log("setting href", anchorNodes[i].href);
            setHref(anchorTag, anchorNodes[i].href);
            return;
          }
        }

        setHref(anchorTag, "");
        anchorTag.style.display = "none";
      },
      onerror: function(){
        alert("failed to load image");
      }
    });
  }
}

function initAnchor(anchorTag) {
  if (storedNodes[anchorTag.innerHTML]) {
    return;
  }
  storedNodes[anchorTag.innerHTML] = true;
  linkNodes.push(anchorTag);
  anchorTag._origHref = anchorTag.href;
}

function setHref(anchorTag, href) {
  initAnchor(anchorTag);
  anchorTag.href = href;
}

function findLargestImg() {
  var images = getNodesFromHtml(null, "img");

  var max = 0;
  var node;

  if (!images) {
    return null;
  }

  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    var size = img.width * img.height;

    if (size > max) {
      node = img;
      max = size;
    }
  }
  return node;


}

function showIcon(img) {
  if (!icon) {
    addElementsToPage();
  }
  clearTimer();
  var pos = abspos(img, true);

  icon.style.left = (pos.x - 4) + "px";
  icon.style.top = (pos.y -  4) + "px";
  highlightedImg = img;

  hideIcon(true);
}

function hideIcon(useTimer) {
  if (!icon) {
    return;
  }
  var fn = function(){
    icon.style.left = "-1000px";
  };
  if (useTimer) {
    timer = setTimeout(fn, 3000);
  } else {
    fn();
  }
}

// Event code

function doConnect(node, event, fn) {
  event = normalizeEventName(event);
  node.addEventListener(event, fixCallback(event, fn), false);
}

function fixCallback(name, fp){
  return name != "keypress" ? fp : function(e){ return fp.call(this, del._fixEvent(e, this)); };
}

function normalizeEventName(name){
  return name.slice(0,2) =="on" ? name.slice(2) : name;
}

// Add the event listener to the body element.



function clearTimer(){
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
}


// Positioning code


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

function abspos (node, includeScroll){
  //  summary:
  //    Gets the position of the passed element relative to
  //    the viewport (if includeScroll==false), or relative to the
  //    document root (if includeScroll==true).
  //
  //    Returns an object of the form:
  //      { x: 100, y: 300 }
  //    if includeScroll is passed, the x and y values will include any
  //    document offsets that may affect the position relative to the
  //    viewport.

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

// Dynamic page loading code.

function getBodyContent(html) {
  var bodyIdx = html.indexOf(">", html.indexOf("<body"));
  var endBodyIdx = html.indexOf("</body");

  var body = html.substring(bodyIdx + 1, endBodyIdx);

  return body;
}

function stripIframe(body, returnFrame) {
  var scriptIdx = body.indexOf("<iframe");
  var endScriptIdx;

  var iframe;

  if(scriptIdx > -1) {
    endScriptIdx = body.indexOf("</iframe", scriptIdx);

    if (endScriptIdx < 0) {
      endScriptIdx = body.indexOf("/>", scriptIdx);
    }
    endScriptIdx = body.indexOf(">", endScriptIdx) + 1;

    iframe = body.substring(scriptIdx, endScriptIdx);
    body = body.substring(0, scriptIdx) + body.substring(endScriptIdx);

  }

  return returnFrame ? iframe : body;
}

function stripScripts(html) {

  var idx = html.indexOf("<script");
  var endIdx;

  while (idx > -1) {
    endIdx = html.indexOf("</script", idx);

    html = html.substring(0, idx) + html.substring(html.indexOf(">", endIdx + 1));
    idx = html.indexOf("<script");
  }
  return html;
}

function getNodesFromHtml(html, query, initialQuery, initialIndex) {
  initTempPageContainer();
  if (html) {
    var text = getBodyContent(html);
    text = stripScripts(html);
    tempPageContainer.innerHTML = stripIframe(text);
  }
  var context = tempPageContainer;

  if (initialQuery) {
    context = find(initialQuery, tempPageContainer)[initialIndex || 0];
  }

  return find(query, context);
}

function initTempPageContainer() {
  if (tempPageContainer) {
    return;
  }

  var tpc = tempPageContainer = document.createElement("div");
  tpc.id = "tempPageContainer";
  document.body.appendChild(tpc);

  tpc.style.position = "absolute";
  tpc.style.left = "-10000px";
  tpc.style.top = "-10000px";
  tpc.style.width = "1px";
  tpc.style.height = "1px";
  tpc.style.visibility = "hidden";
}

