// ==UserScript==
// @name           TEAMtalk cleaner
// @description    Removes most adverts from teamtalk.com
// @namespace      http://www.teamtalk.com
// @include        http://*teamtalk.com/*
// ==/UserScript==

(function() {

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\\\s)" + className + "(\\\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}

  function removeByClass (c) {
    var els = getElementsByClassName(c);
    if (els.length>=1)
      els[0].parentNode.removeChild(els[0]);
  }

  function removeByID (c) {
    var el = document.getElementById(c);
    if (el)
      el.parentNode.removeChild(el);
  }


  removeByClass('promo_betLinks');
  removeByClass('headerAd');
  removeByClass('sky');
  removeByID('sponsor');
  removeByID('topAd'); 
  removeByID('FLASH_AD');
  removeByID('teamPages');
//  document.getElementById('teamPagesBack').getElementsByTagName('div')[1].style.display = 'none';

  if (document.getElementById('subWrapper')) {
    document.getElementById('subWrapper').style.width = '700px';
    document.getElementById('contentStoryPage').style.width = '700px';
  }
  

  var els = document.getElementsByTagName('iframe');
  for (var i=els.length-1; i>=0; i--) {
    els[i].parentNode.removeChild(els[i]);
  }

  var els = document.getElementsByTagName('embed');
  for (var i=els.length-1; i>=0; i--) {
    els[i].parentNode.removeChild(els[i]);
  }

  var els = document.getElementsByTagName('div');
  var idLower;
  for (var i=els.length-1; i>=0; i--) {
    idLower = els[i].id.toLowerCase();
    if ( (idLower.indexOf('advert')!=-1) ||
         (idLower.indexOf('banner')!=-1) )
      els[i].parentNode.removeChild(els[i]);
  }

var els = getElementsByClassName('teamJump');
if ((els) && (els.length>0))
  els[0].parentNode.removeChild(els[0].nextSibling);


})();