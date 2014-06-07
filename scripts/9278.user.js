// ==UserScript==
// @name           Facebook at-a-glance profiles
// @version        1.2: Added an indicator icon for present ICQ status, when available.
// @version        1.1: Fail silently when sex or age info was unavailable.
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Decorates facebook profile names with a trailing sex/age annotation. "(M29)", for instance, signifies a 29 year old male. Also shows present ICQ status with a little icon, when listed (next to the ICQ contact info).
// @include        http://www.facebook.com/profile.php?*
// @include        http://*.facebook.com/profile.php?*
// @xpath    name: //div[@class="profile_name"]/h2
// @xpath     sex: substring(//td[@class="data"]/div/a/text()[ancestor::td[1]/preceding-sibling::td[@class="label"][.="Sex:"]],1,1)
// @xpath     age: id("Birthday")/td[@class="data"]/div/a[contains(@href,"facebook.com/b.php")]
// @xpath?    icq: //td[@class="data"]/div[../preceding-sibling::td[@class="label"][.="ICQ:"]]
// ==/UserScript==

if( typeof xpath == "undefined" )
  xpath = {
    name: $X('//div[@class="profile_name"]/h2'),
     sex: $X('substring(//td[@class="data"]/div/a/text()[ancestor::td[1]/preceding-sibling::td[@class="label"][.="Sex:"]],1,1)'),
     age: $X('id("Birthday")/td[@class="data"]/div/a[contains(@href,"facebook.com/b.php")]'),
     icq: $X('//td[@class="data"]/div[../preceding-sibling::td[@class="label"][.="ICQ:"]]')
  };

function decorate( profile ) {
  if( profile.sex && profile.age && profile.name ) {
    profile.age = profile.age.search.match(/&y1=(\d+)/)[1];
    profile.name.innerHTML += [" (", profile.sex, profile.age, ")"].join("");
  }
  var icq = profile.icq;
  if( icq )
    icq.innerHTML = '<img style="top:1px;position:relative;" src="http://' +
      'api.oscar.aol.com/SOA/key=je1ZtapBUYJngcu0/presence/'+ icq.textContent +
      '" height="11" width="11"> '+ icq.innerHTML;
}

decorate( xpath );


function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
  switch( got.resultType ) {
    case got.STRING_TYPE:  return got.stringValue;
    case got.NUMBER_TYPE:  return got.numberValue;
    case got.BOOLEAN_TYPE: return got.booleanValue;
    default:
      while( next = got.iterateNext() )
	result.push( next );
      return result;
  }
}
