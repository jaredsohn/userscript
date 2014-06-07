// ==UserScript==
// @name           removead
// @namespace      removead
// @description    Remove unwanted elements
// ==/UserScript==

function removeElement(elem) {
  if (elem && elem.parentNode) {
    elem.parentNode.removeChild(elem);
  }
}

function removeElementsByTag(tagName) {
  var elems;
  var i;
  for (elems = document.getElementsByTagName(tagName), i = 0; i < elems.length; i++) {
    if (elems[i].parentNode) {
      removeElement(elems[i]);
    }
  }
}

function targetContainsOneOfTheseFragments(target, fragments) {
  var k;
  for (k = 0; k < fragments.length; k++) {
    if (target.indexOf(fragments[k]) >= 0) {
      return true;
    }
  }
  return false;
}

function removeElementsByTagAndClass(tagName, classNameArray) {
  var elem;
  var elems;
  var c;
  var i;
  var k;
  var removable = false;
  
  for (elems = document.getElementsByTagName(tagName), i = 0; i < elems.length; i++) {
    elem = elems[i];
    c = elem.getAttribute('class');
    for (k = 0; k < classNameArray.length; k++) {
      if (c == classNameArray[k]) {
        removeElement(elem);
      }
    }
  }
}

function removeElementsByIdNowAndLater(ids, timeout) {
  removeElementsById(ids);
	removeElementsByIdDelayed(ids, timeout);
}

function removeElementsById(ids) {
  var m;
  for (m = 0; m < ids.length; m++) {
    removeElement(document.getElementById(ids[m])); 
  }
}

function removeElementsByIdDelayed(ids, timeout) {
  var m;
  for (m = 0; m < ids.length; m++) {
    removeElementByIdDelayed(ids[m], timeout); 
  }
}

function removeElementByIdDelayed(id, timeout) {
  var removeSpecifiedElement = function() {
    var el=document.getElementById(id);
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  };
  setInterval(removeSpecifiedElement, timeout);
}

function removeElementByTagInsideId(tag, id) {
  var outer = document.getElementById(id);
  var innerElems;
  var k;
  if (outer) {
    innerElems = outer.getElementsByTagName(tag);
    for (var k = 0; k < innerElems.length; k++) {
      removeElement(innerElems[k]);
    }
  }
}

function removeElementByTagNameAndAttributes(tagName, attributeMap) {
  var elems, attributeName;
  var i, mismatchFound;
  for (elems = document.getElementsByTagName(tagName), i = 0; i < elems.length; i++) {
    mismatchFound = false;
    for (attributeName in attributeMap) {
      if (elems[i].getAttribute(attributeName) != attributeMap[attributeName]) {
        mismatchFound = true;
        break;
      }
      if (!mismatchFound && elems[i].parentNode) {
        removeElement(elems[i]);
      }
    }
  }
}

function removeElementByTagDirectlyContainingLinkToHref(tagName, href) {
  var elems, elem, i, anchors, k, ch;
  for (elems = document.getElementsByTagName(tagName), i = 0; i < elems.length; i++) {
    elem = elems[i];
    for (k = 0; k < elem.children.length; k++) {
      child = elem.children[k];
      if (child.tagName === 'A' && child.getAttribute('href') === href) {
        removeElement(elem);
        return;
      }
    }
  }
}

for (j = 0; j < 2; j++) {
  removeElementByTagNameAndAttributes('th', {'width':'170', 'valign':'top', 'align':'left', 'height':'100%'});
  removeElementByTagNameAndAttributes('a', {'href':'http://www.piratedate.com/zp/go.php?to=lobby'});
  removeElementByTagNameAndAttributes('a', {'href':'http://www.bytelove.com/tpb'});
  removeElementsByTagAndClass('div', ['advertise', 'ad', 'ad2', 'ad3', 'ads', 'adcolumn_wrapper', 'orangeArea blurb1', 'flag_box', 'UIStandardFrame_SidebarAds']);
  removeElementsByTagAndClass('th', ['flag_box']);  
  removeElementsByTagAndClass('td', ['bannerBorder']);
  removeElementsByIdNowAndLater([
      'header_b', 'pagelet_adbox', 'top_ad_wrapper', 'sky-right', 'a68d4628', 'home_sponsor_nile',
      'adnav', 'ctl00_pnSidebar', 'ctl00_Body_ctl00_PlatinumAd', 'im_popupFixed', 'siteNotice',
      'phmg_imBox', 'ctl00_Body_ctl00_PlatinumAd2', 'nav2', 'floatyContent', 
      'vidAdTop', 'vidAdBottom', 'ssponsor', 'adbrite-banner', 'ad_creative_1', 
      'search-pva', 'sidebar-ad', 'header-ad', 'ad-extra', 'ad-right', 'FFN_imBox_Container',
      'btjunkie_news', 'ad-btm', 'fbanners', 'open-software', 'noadbriteinline',
      'mytracer', '_adLayerBody', '_13', 'floatyContent', 'fp_container', 'ego'
  ], 2000);
  removeElementsByTag('blink');
  removeElementByTagInsideId('img', 'foot');
  removeElementByTagInsideId('iframe', 'foot');
  //removeElementByTagInsideId('iframe', 'details');
  removeElementByTagDirectlyContainingLinkToHref('div', 'http://vio.thepiratebay.org/');
}

