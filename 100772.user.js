// ==UserScript==
// @name          Happy Pets Hack -- Free Items and Cash
// @description   Happy Pets Hack -- Get As Much Money As You Want FREE
// @author        1nfected Updated/Edited by: Sonny Razzano srazzano@gmail.com
// @version       1.4
// @namespace     http://userscripts.org/scripts/show/98957
// @license       CC by-nc-sa http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include       http://userstyles.org/users/*
// @include       https://userstyles.org/users/*
// @include       http://userstyles.org/styles/browse*
// @include       https://userstyles.org/styles/browse*
// @include       http://userscripts.org/*
// @include       https://userscripts.org/*
// @require       http://www.betawarriors.com/bin/gm/57756user.js
// @history       1.1 Added throbber to indicate fetching metadata.
// @history       1.1 Added option to enable Stats-Keeper for all users. Disabled by default.
// @history       1.1 Changed summary info on userpage, is more detailed now & accounts for obsolete styles.
// @history       1.1 Fixed '+' Sign in Negative numbers.
// @history       1.2 Adapted for recent site change March 2010 by: Sonny Razzano
// @history       1.2 Added HideObsolete/OpenAll/CloseAll function labels/icons in "Name" header cell by: Sonny Razzano
// @history       1.2 Added Open/Close icons to each individual cell by: Sonny Razzano
// @history       1.2 Linkified author by: Sonny Razzano
// @history       1.3 Added button in summary table to hide/show daily install counts by: Sonny Razzano
// @history       1.4 Added timer to set the delay of resetting daily weekly totals: Sonny Razzano
// ==/UserScript==
(function() {
// ===================================================================== //
// ===================== USER CONFIGURABLE OPTIONS ===================== //
// ===================================================================== //
  var dataLines = 2; // Info data on 1 or 2 lines.
  var labelIcon = 2; // (HideObsolete - OpenAll - CloseAll) 1 for labels, 2 for icons.
  var timer = 7; // Set # of days to track running totals of new installs.
// ===================================================================== //
// ============================ END OPTIONS ============================ //
// ===================================================================== //
  var metadata = true, sortdir = 'desc', scriptID = '98957', version = '1.4';
  testGM();
  function testGM() {
    const STORAGE_PREFIX = 'ustoe-';
    const LOG_PREFIX = 'Userstyles.org Enhancer: ';
    const LOG = true; // Enable logging
    const DEBUG = false; // Set Debugging ON/OFF
    isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
    log = isGM ? function(msg) { if(LOG) GM_log(msg) } : window.opera ? function(msg) { if(LOG) opera.postError(LOG_PREFIX+msg); } : function(msg) { try { if(LOG) console.log(LOG_PREFIX+msg); } catch(e) {} }
    debug = function(msg) { if(LOG && DEBUG) log('** Debug: '+msg+' **') }
    addStyle = isGM ? GM_addStyle : function(css) { var head = $('head')[0]; if(!head) return; var style = $c('style',{type:'text/css',innerHTML:css}); head.appendChild(style); }
    setValue = isGM ? GM_setValue : function(name,value) { switch (typeof(value)) { case 'string': localStorage.setItem(STORAGE_PREFIX+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.') < 0) { localStorage.setItem(STORAGE_PREFIX+name,'N]'+value); } break; case 'boolean': localStorage.setItem(STORAGE_PREFIX+name,'B]'+value); break; } }
    getValue = isGM ? GM_getValue : function(name,defValue) { var value = localStorage.getItem(STORAGE_PREFIX+name); if(value == null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2) == 'true'; } } return value; }
    deleteValue = isGM ? GM_deleteValue : function(name) { localStorage.removeItem(STORAGE_PREFIX+name); }
    xhr = isGM ? GM_xmlhttpRequest : function(obj) {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState == 4 && obj.onload) { obj.onload(request); } }
	request.onerror = function() { if(obj.onerror) { obj.onerror(request); } }
	try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
	if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
	request.send(obj.data); return request;
    }
    jParse = (window.JSON && window.JSON.parse) ? window.JSON.parse : eval;
    jStringify = (window.JSON && window.JSON.stringify) ? window.JSON.stringify : uneval;
  }
  function $(q, root, single, context) {
    root = root || document;
    context = context || root;
    if(q[0] == '#') return root.getElementById(q.substr(1));
    if(q.match(/^[\/*]|^\.[\/\.]/)) {
	if(single) return root.evaluate(q, context, null, 9, null).singleNodeValue;
	var arr = []; var xpr = root.evaluate(q, context, null, 7, null);
	for(var i = 0, len = xpr.snapshotLength; i < len; i++) arr.push(xpr.snapshotItem(i));
	return arr;
    }
    if(q[0] == '.') {
	if(single) return root.getElementsByClassName(q.substr(1))[0];
	return root.getElementsByClassName(q.substr(1));
    }
    if(single) return root.getElementsByTagName(q)[0];
    return root.getElementsByTagName(q);
  }
  function $c(type, props, evls) {
    var node = document.createElement(type);
    if(props && typeof props == 'object') {
	for(prop in props) {
	  if(typeof node[prop] == 'undefined') node.setAttribute(prop, props[prop]);
	  else node[prop] = props[prop];
	}
    }
    if(evls instanceof Array) {
	for(var i = 0; i < evls.length; i++) {
	  var evl = evls[i];
	  if(typeof evl.type == 'string' && typeof evl.fn == 'function') node.addEventListener(evl.type, evl.fn, false);
	}
    }
    return node;
  }
  var today = new Date(), myDate = new Date(today.getTime() + 60*60*24*1000*timer);
  var nowDate = today.toDateString().substring(4, 10), resetAt = myDate.toDateString().substring(4, 10);
  if (timer != getValue('resetTimer') || daysLeft < 0) {
    setValue('presentDate', today.getTime().toString());
    setValue('presentDate2', nowDate);
    setValue('resetDate', myDate.valueOf().toString());
    setValue('resetDate2', resetAt);
    setValue('resetTimer', timer);
  }
  var diff = getValue('resetDate') - today.getTime(), daysLeft = parseInt(diff/(1000*60*60*24)+1);
  function createDiffSpan(diff) {
    if(diff > 0 ) return $c('span', {className: 'diffP diffspan', innerHTML:'+' + toCustStr(diff)});
    else return $c('span', {className: 'diffN diffspan', innerHTML:toCustStr(diff)});
  }
  function toCustStr(num) {
    return num.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g,',');
  }
  String.prototype.toCustNum = function() {
    return parseFloat(this.replace(',', ''));
  }
  String.prototype.trim = function() {
    var str = this.replace(/^\s\s*/, ''), ws = /\s/, i = str.length;
    while (ws.test(str.charAt(--i))) return str.slice(0, i + 1);
  }
  function ucfirst(str) {
    var firstLetter = str.slice(0, 1);
    return firstLetter.toUpperCase() + str.substring(1);
  }
  function getDateDiffString(dateNew, dateOld) {
    var dateDiff = new Date(dateNew.getTime() - dateOld.getTime());
    dateDiff.setUTCFullYear(dateDiff.getUTCFullYear() - 1970);
    var strDateDiff = '', timeunitValue = 0;
    var timeunitsHash = { year:'getUTCFullYear', month:'getUTCMonth', day:'getUTCDate', hour:'getUTCHours', minute:'getUTCMinutes', second:'getUTCSeconds', millisecond:'getUTCMilliseconds'};
    for (var timeunitName in timeunitsHash) {
	timeunitValue = dateDiff[timeunitsHash[timeunitName]]() - ((timeunitName == 'day') ? 1 : 0);
	if (timeunitValue !== 0) {
	  if ((timeunitName == 'millisecond') && (strDateDiff.length !== 0)) continue;
	  strDateDiff += ((strDateDiff.length === 0) ? '' : ', ') + toCustStr(timeunitValue) + ' ' + timeunitName + (timeunitValue>1?'s':'');
	}
    }
    return strDateDiff.replace(/,([^,]*)$/, ' and$1');
  }
  function insertAfter(newNode, refNode) {
    if(refNode.nextSibling) return refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
    else return refNode.parentNode.appendChild(newNode);
  }
  var url = window.location.href.toLowerCase();
  if(url.match(/^https?:\/\/userscripts\.org/)) {
    if(url.match(/^https?:\/\/userscripts\.org\/scripts\/[show|review|reviews|discuss|fans|issues]\/98957/)) return;
    update(); return;
  }
  if(getValue('upgradeComplete')) deleteValue('upgradeComplete');
  var onUserPage = url.match(/^https?:\/\/userstyles\.org\/users\/\d+/)
  var loggedIn = onUserPage && $('//a[@href="/logout"]', document, true);
  if(onUserPage) var user = $('h1')[0].textContent;
  var styleList = $('#style-list');
  if(!styleList) return;
  var styleArray = [], styles = $('li', styleList), styleCount = styles.length, DATA = {};
  var totalInstalls = 0, totalWeekly = 0, totalObsolete = 0;
  var obsoleteCount = $('.obsolete', styleList).length, ratingGood = $('.good-rating', styleList).length;
  var ratingOk = $('.ok-rating', styleList).length, ratingBad = $('.bad-rating', styleList).length;
  for(var i = 0; i < styleCount; i++) {
    var styleObj = {}, style = styles[i], link = style.children[0].href, linkParts = link.split('/');
    styleObj.id = linkParts[linkParts.length-2];
    styleObj.href = link;
    styleObj.name = style.children[0].textContent;
    styleObj.installs = style.getAttribute('total-install-count');
    styleObj.weekly = '';
    styleObj.rating = style.getAttribute('average-rating') || 0;
    styleObj.obsolete = style.className.indexOf('obsolete') != -1 ? true : false;
    if(styleObj.obsolete) totalObsolete += totalObsolete;
    styleObj.rated = style.className.indexOf('no-rating') != -1 ? false : true;
    styleArray.push(styleObj);
    if(onUserPage) {
	var id = styleObj.id;
	DATA[id] = {};
	DATA[id].installs = styleObj.installs;
	DATA[id].weekly = styleObj.weekly;
	totalInstalls += parseInt(styleObj.installs);
	totalWeekly += parseInt(styleObj.weekly);
    }
  }
  var styleTable = $c('table', {id:'style-table'});
  addStyle('#style-table .delete{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC5ElEQVR42m2T60/SYRTHv1w0xAqx0Fze07yARo1NU1dzWltRXvJFm2mv2tzqVS3dKnMz15rNN73oTX9AszmsCHQ4q+mmzRsgIngXE++ECIhy/fXAhhPn8+Y8v9855/Occ77PQ8OhFR4eziWmgMViyUQiEYiF3W6H2WyGVqv1+68T/7LL5VoM5tAOJRcQx4B//7blKZ48rgOdyYXH48b0tA5tbW2QdPYEY++QWPkBgPy4xmaz+6TfPoKiAEVPP5TKaSwaVsA5HYHKilLExcWAwaCDTqfjQe1zf06qv5IAgM/nU+2fPyAigkUckdDrJ9DRocCkbhYMphfpacm4mi9EQsI5eLxe7FhsqHlYHygg2AK1bpzAyVMx8MGN/X0H3M59WCwmmLc3YDL9A5cbReAsWK0W9PUN413rp1DA+9Z61D2qBTsyFj4vExTd7/LB63Fhb88Gq82K379+YfDPCHZ3HWj/0hUCeHOv8ubrlOQkCAQC3CjNQxjzBJxuD7Z3gJ+9Mqyvr5DT7ZidNWB1dRP6qYUWktd0oEJS0nmKx+MhlncWCYmJREIm3B4fGDQnNrfMWPq7ioV5I5kJjcAZ5HuNFiJjdvYFqqHhGSSSDmxsWIj+DoSFMWEwLBMpPYF9bi4fDoeNzMaOubmlUACfn0a9fFGP6GgeenoUEF7mY0IzjtExDbKyLkKt1kIoFEKnm8TamgkzM4ZQgECQTjU3NxF7CVKpBOLb5ZD+kECt0qKwKB/d3V2kglxMTenJxTIQqReOB+TkCCGXdaKsvAoq5QC+SxUoKSkmrUkCA9brdccD/C1UVVWiuroGcvlXVFT4AYMhAHLhMDo6BqNxk1RyBJCRkULFx8dDLL5F+lWhsfEVNONDAUBe3hUoFL2IijqDkREV3G435ueXQwHkbouJkfn3RYUi3C0rxtbWDoaH1cjMTMXQkBJOpxcajT7wKsk76A8BHALdJ6adBIDD4RDZHIETj77C4PoPmLlSIO/zMgEAAAAASUVORK5CYII=)}#style-table .edit{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABw0lEQVR42o2RTUtCQRSGX4UQateiAjdREQRu2rbLRb/AX9DCjzTFoJUogrhqoSiaGBgEUZS/IfxAgggKcqFEIcWtVPzu+wo2Z8iLty7WC8PMmTnvM3PmqADMeL3eG/whlqNl08PPfRU76Hk8HkVTr9eDz+eDy+WC3+8nyCzbvlUEdDodRUggEOAA0jdEazAYBIqTyaRKBqDkQTmdThmg3W7DZDLhIPyIt4txrCY0w19AJQSDQSnO5/OS2Z64xzPmMPQFDocDarUa3W6X33y4XYZ4psHabuW1g/lRVoJWArRaLdnNgzIajTiMPEI8H8XmUQNPL9NU/yI7uuQAt9vNAaFQiBvsdru0pmfvbwkQr8awcfyJ+tsEmefZ0bXUBQI0m03ZzbS2WCzY89zh424S6zu3eB9ZgE6no06oZG0kQL1eRyQSkQBmsxk2mw3RaBQuxwoa4hyPU6mUMqBWq8nqt1qtEGtpTExpuTkcDqNQKCCdTisDqtUqYrEY/7B4PE5JfFDcBxeLRWQyGWVApVL51YH+uj8TIJvNKgPK5fJQM4lKyOVyvwF6vR6iKA41kwRBQKlUkgPYWGYbJ/inWO4Sm0778RfZEDcwOpgfEwAAAABJRU5ErkJggg==)}#style-table .ratingbg{margin:0 auto;position:relative;width:48px;height:16px;background:url(data:image/png;base64,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)}#style-table .ratingfg{position:absolute;height:16px;background:url(data:image/png;base64,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)}#style-table .metalink-open{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyUlEQVR42mNkQAOa9U+EgJQnEDsCsQJU+AEQ7wfi7dcbZd4hq2dE0xwNpJYw4AcxQEOWYhgA1FwDpJoZiAO1QENa4AbgsnlukgSYTp73AqdLGKF+fotNxbpsKTAdNPUZLpcIMxLpb5zhATJgDsiVGDIWvAzhZrxgtu8knC6YCzJgD5DhjE12c54UIQP2UsUArF4g0oC5eAORCANicEZjd6AAg4YsF5i95shbhoXnfmIzQBhvQiIAIAkJxqMoKSMZQn5mQjKEpOwMAM+hXvuQH/fFAAAAAElFTkSuQmCC)}#style-table .metalink-close{cursor:pointer;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABBUlEQVR42mNkQAPfGBiEgJQnEDsCsQJU+AEQ7wfi7VwMDO+Q1TOiaY4GUksY8IMYoCFLMQwAaq4BUs0MxIFaoCEtcAOw2cwpBPTJxo0QTmgow/cXL7C6hBHq57fospy8vAwMJ09COObmDN8/f8bmEmFGXP7m5OSEMP7+ZWBgZmb4/v071vAAGTAHyEjGMKC0lIEhLQ3CUVNj+P7/PzYD5oIM2ANkOGMYALSV4cYNQgbsxWkACxCz3r5NlAHYvcDNzcBw4QJRXsAeiCxAN1y/Dmb/UVVl+M2AFcTgjsZlyxgYTE0hnClTGL5PnIjNAGGcCYkIAElIMB5FSRnJEPIzE5IhJGVnAHZBW0ul1QldAAAAAElFTkSuQmCC)}#style-table icon#openbtn{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAEGElEQVR42rWVbUxbVRjH/7e9faGjXUmhZQWm6cAJyjSD4BJ00Rjjpy1xmZkhy9BhYuKSaWLCCpkfjIt+MCZKsg9qJBlf/KCyDhITJZsaJpvtmFiKGVxagfJa+gKjoy3tvddzz+3a3LTDxeCTnPucl+ec3/Nyz71Mb2+viP9RGAnw3dBNxBICnaBPUYQgyFxRkPsMtWbkXaK8xhQeR5YEbG2lsa+6Akeff0oGcPMr4HYf3BGPfx8ew/piGN0n6mE1ZiOYDC7BvVWHK11HsRC5h7e/vLp92MRLRizM7BQ3R/W9lSg6j+8vBFz78Di++YXDV1f/VGyMhDaxyPmxGQrSscFaA3utAxUV+oLDtwXsqiqXDRbCuVT7RsahsThgeqwVKq1BrtPWJu5O/YZ0JIADhxrATc8pHCoAjAfmcT3hAFtaQg0y8QTVgVuTMNW/CL2tlo6/Pl1JdUfvMtXJlWmsTQyh1GaCmOJzgLvzQXSdOgjbbnUW8PcCfoztwUTPaZqiC/3DSKzzSG5qYX7ypW3rseYbAsOvkZbIzcUXF+A8+XQe4CURDIT2YOT9I/CE4njni58RuzMLa+upXFok6T9jp/rYxcXcnJSu0PAlGMp25SOYDaDr9RZUmlkZ8MedGQwu26Au0VEDPpFC6JYHj7x6Ibfp5CEjTrQYaf9Iz6Iiitlvz8OyvyE3XvW6cf6tF2AvL5EBoxMBuKb0YDQaubjpNGL+aQVAksGz9gcCKuoP5AE+D7o7ns0Dbvv8uOI3Yu5yJ63Buc8vIx7ZgPW5dkWKigFoiq5fgslSlgf8NYqujlZUVRhkwNiEHy7OBPfFdlqDMx98j4yohag1K4pcDCAVWZVeB6sRcnOhsRE43zyMGltpPoKBgBkCn6EGKjVL9UZ4jQKk1/STV8x4vMagANx/TU1WiyJlEuAcAez9N4D0cdtYjVFAsYuWDE2Tw6XLKT4cYLb/PVoDZ8+AYkNG0CARXUUqukDHOksVDBYrWDWPYlIAGPUF8MOqHTc+OkZrcPazn7a9XIxKBTEbbTFZ8txAZ3sLHq005gGDwTLslIS8t5UA/0oCGlsjVKwaKhVDUs/k/i1QybWANJ+dEnkBYoYnPyOBNiH76ZYUz/PYSiaxzxQHy2/KgB1zvVg6H9LuCZZlxzOZDLXXaDRpIntJd/m/ANSksUajsba5uflweXl5vV6vf2ZycrJFCj8LgMPhuEYgnmAw6HW73b8KghAiS5KB8ECA2WxWk8N0jY2Nbzidzk/JQTqXy4WZmRlwHEfqo6L1EUmy6+rq0NTUhLa2Nni93qXu7u7XIpGIOxqNppLJpFgU0NfXRzLBlmm12peJfpd42FBdXV1CvEMqlcL9CMg6DAYDHZMDYzqd7mY4HP6YgL3EmQ3iXC6KfwDUjDQrJCpXVwAAAABJRU5ErkJggg==)}#style-table icon#closebtn{background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAEHklEQVR42rWVbUxbVRjH/729pS3SUQKMFTqcZd3E0UGAMZMtuMWEfRIXXaIhxqkzM5mLmpiwQpxRZ/STiS7RRM34wBcTM7fCFhMxbGwsgEUQulZsm3ZAKS+lhc3B6Ou9nntu6U3TDheDT3Lvc+45zzm/5+Wce2QdHR08/keRCYCLvw5heY2jHfTN8+A4kctzYltGrWXiLF4ck2UuR4Y4RKMxVOiL0XyoWgS4Zxbgzq/dFI9/6x/Dvdkg2l+qxFZNMgKnbw7WqBFdbc3wh1Zx6rvejcMmXsr4zMy63NNUry4sofXY7kzAtXPH8EOfG9/3jqdN3Gr/HfNOF8Y5Ff2uZsLQGXdisaouY/ENAY+VFYkG/iDV8kQcMcuPePbuNE7d96CQi9L+EJODbzQV6NWWQ9n8Iia8s2kOZQBue2dwa80ANk9NDeIra1Srr17ER4FRHA4vijN7ekTd1ETVdVUxPiyswVTNAfCRRArw94wPba/WoiRfngTc8eOXZR0c59+gKfr0Uj+ecNuwf/wWzt6b2LAe5/IrcdNQi4lCQ6pvZdYP8ys1EsBGIugO6DBw9jkMB1bw7rfXUdp3FRZ/XyotVEZGRF0n5V5I11HdM7hT+bQUwZQXba81YJuWFQF//DWJK/MlkKuV1CCxFsHdoX4s+7qkxU+fBk6eFNt796ZFUbD9eWj2SNt80WbFB28dRmmRWgSMOLywuFSQKRTUgI/FsOq0pwMEsdkeCsg3NUgA+zDaTxyUAKN2D7o8GkxfbqU1OPPVZTzuGIBl7kZ6irIA1lPkq2qUAH+OoO3EAZQV54qAMYcHFvcWWL8+Tmvw9sc/YdeCG41To+lFzgIQity/ox6usidTfYGxAZjfbMT2kjwpgm6vFhzZ94Iwcpbqcns/PgmNidv0wgVg3740wPo29VUfSkuZADhDAOX/BlDwcegcg2hamcl60Hry9Jg3HUSMYR8NMHXpfVoD8/nutAm75l0IBxdgZ3LpdxX3AOpiHVylu7OejQzAiN2LnxdLMfjZC7QG73zZg41ExjDgk9Fmk7nhQbQeb8CObRoJcMVXgM2SgG00HeBZWIOixASGlYNhZORekaXuFjAQLxqhP9nFJzjw8QS5jDj6cMlft6ASiQSi4TAqtqyATTwQAZvmerZ0PqLdHpZlb8fjcWqvUChiRMpJc/6/AOTkYTUazc76+vrGoqKiSpVKtd/pdDYI4ScBMBgM1whk2Ofz2axW6w2O4wJkSDDgHgrQarVyspjSZDK9bjabvyALKS0WCyYnJ+F2u0l9GFofniTbaDSSn2odWlpayAG3zbW3t78cCoWsS0tLkXA4zGcFdHZ2kkywBTk5OUeIfo94+JRer1cT7xCJRLAeARlHbm4u/SYLLiuVyqFgMPg5AduIM/eJc6ko/gHoYSwrpQxnUQAAAABJRU5ErkJggg==)}#style-table icon#sortbtn{background:url(data:image/png;base64,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)}#style-table .loading{background:url(data:image/png;base64,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)center no-repeat}.subtitle,#open-close,#style-table td:nth-child(1),#style-table td:nth-child(3),#style-table td:nth-child(4){-moz-user-select:none;cursor:default}#summary{font-weight:bold}#summaryTable{text-align:center}#summaryTable *{margin:1px}#style-table{border-collapse:collapse;font-family:Ubuntu,\"Lucida Grande\",Verdana;font-size:10pt;margin:0;min-width:710px}#style-table th{-moz-user-select:none;background:#444;padding:2px;border:1px solid black;color:#fd0}#style-table th:hover{cursor:pointer}#style-table tr:hover td{background-color:rgba(0,0,0,.1)}#style-table th,#style-table td{padding:2px;text-align:center;border:1px solid}th span.diffP,td span.diffP{color:#0F0}th span.diffN,td span.diffN{color:#F00}span.diffP,span.diffN{margin-left:2px}#style-table>tr>td:nth-child(1){padding:0;width:28px}#style-table>tr>td:nth-child(2){text-align:left}#style-table a.submain{line-height:20px}#style-table a{text-decoration:none}#style-table a:hover{text-decoration:underline}#style-table .obsolete:not(:hover){opacity:.3}p.subtitle{color:gray;font-size:8pt;padding:2px 10px}#style-table .subtitle,#style-table .metainfo span{color:gray;font-size:100%}#style-table .subtitle{margin-right:15px}#style-table .metainfo .url{color:red;margin-right:5px}#style-table .delete,#style-table .edit,#style-table .metalink-open,#style-table .metalink-close,#style-table .metascreens{background-position:center;background-repeat:no-repeat;float:right;height:16px;width:16px}#style-table .delete,#style-table .edit{margin:2px 0 2px 0}#style-table .metalink-open,#style-table .metalink-close{margin-top:2px}#open-close{color:#999;float:right;height:16px;margin:-1px -1px 0 0;width:auto}#style-table .metalink-close{width:0}.subaffects,#style-table .sublastup{margin-right:4px} #style-table .metascreens{margin-left:4px}#style-table>tr:first-child{height:26px}button[disabled]{pointer-events:none;opacity:.4}');
if (dataLines == 1) {addStyle('#style-table td{padding:1px 2px}#style-table td#sumTable1,#style-table td#sumTable2{background:transparent;border:none;line-height:6px;text-align:left}#style-table .subs{background:transparent;margin:0 0 0 4px;position:relative;top:-7px}#sum1,#sum2,#sum3,#sum4{background:transparent;font-size:10px;line-height:6px}#sum2,#sum4{position:relative;top:5px}.metalink-open,.metalink-close{margin:3px 0;padding:0}span.metainfo .metascreens{margin:3px 2px}#style-table .edit,#style-table .delete{margin:3px 0}');}
if (labelIcon == 1) {addStyle('label#openbtn,label#sortbtn{margin-right:8px}label#closebtn{margin-right:4px}label#sortbtn:hover{color:yellow}label#openbtn:hover{color:#297FE4}label#closebtn:hover{color:red}');}
if (labelIcon == 2) {addStyle('icon#openbtn,icon#closebtn,icon#sortbtn{display:inline-block;height:24px;margin:-3px 0 0 0;width:24px;}icon#openbtn{margin-right:4px}icon#sortbtn{margin-right:16px;width:32px}');}
if (!loggedIn) {addStyle('#summary-weekly{opacity:.3}#summary-left{display:none}');}
  var styleTableHeaderRow = $c('tr'), theaders = ['#','Name','Installs','FTW','Rating'];
  for(var i = 0, l = theaders.length; i < l; i++) styleTableHeaderRow.appendChild($c('th',{textContent:theaders[i]}));
  styleTable.appendChild(styleTableHeaderRow);
  var div = $c('div',{id:'open-close'});
  if (labelIcon == 1) {
    div.appendChild($c('label', {id:'sortbtn', textContent:'HideObs', title:'Hide Obsolete Styles'}));
    div.appendChild($c('label', {id:'openbtn', textContent:'OpenAll', title:'Open All Non-Obsolete Cell Info'}));
    div.appendChild($c('label', {id:'closebtn', textContent:'CloseAll', title:'Close All Cell Info'}));
  }
  if (labelIcon == 2) {
    div.appendChild($c('icon', {id:'sortbtn', title:'Hide Obsolete Styles'}));
    div.appendChild($c('icon', {id:'openbtn', title:'Open All Non-Obsolete Cell Info'}));
    div.appendChild($c('icon', {id:'closebtn', title:'Close All Cell Info'}));
  }
  var cmd = styleTableHeaderRow.childNodes[1];
  cmd.appendChild(div);
  for(var i = 0, l = styleArray.length; i < l; i++) {
    var style = styleArray[i], row = $c('tr', {id:style.id});
    if(style.obsolete) row.className = 'obsolete';
    row.appendChild($c('td', {textContent:(i+1)}));
    var cellN = $c('td');
    cellN.appendChild($c('a', {className:'submain', href:style.href, textContent:style.name}));
    if(!loggedIn && metadata) {
	var infolinkopen = $c('div', {className:'metalink-open', title:'Fetch Style Information', styleid:style.id});
	var infolinkclose = $c('div', {className:'metalink-close', title:'Close Cell', styleid:style.id});
	cellN.appendChild(infolinkclose);
	cellN.appendChild(infolinkopen);
	infolinkopen.addEventListener('click', function(e) {
	  var src = e.target, bbb = src.getAttribute('styleid'), row = $('#' + bbb);
	  row.setAttribute("opened", "true");
	  var aRow = row.children[1]; 
	  aRow.childNodes[1].className += ' loading';
	  fetchMeta(src.getAttribute('styleid'));
	  aRow.childNodes[2].setAttribute('style', 'width: 0');
	  aRow.childNodes[1].setAttribute('style', 'width: 16px');
	}, false);
      if (dataLines == 1) {
	  infolinkclose.addEventListener('click', function(e) {
	    var src = e.target, bbb = src.getAttribute('styleid'), row = $('#' + bbb);
	    row.removeAttribute('opened');
	    var aRow = row.children[1]; 
	    aRow.removeChild(aRow.childNodes[5]);
	    aRow.removeChild(aRow.childNodes[4]);
	    aRow.removeChild(aRow.childNodes[3]);
          aRow.childNodes[2].setAttribute('style', 'width: 16px');
          aRow.childNodes[1].setAttribute('style', 'width: 0');
          $('#summaryTable').setAttribute("style", 'width: ' + (($('#style-table').clientWidth)) + 'px');
        }, false);
	}
      if (dataLines == 2) {
	  infolinkclose.addEventListener('click', function(e) {
	    var src = e.target, bbb = src.getAttribute('styleid'), row = $('#' + bbb);
	    row.removeAttribute('opened');
	    var aRow = row.children[1]; 
	    aRow.removeChild(aRow.childNodes[6]);
	    aRow.removeChild(aRow.childNodes[3]);
	    aRow.removeChild(aRow.childNodes[2]);
	    aRow.removeChild(aRow.childNodes[1]);
	    aRow.childNodes[2].setAttribute('style', 'width: 16px');
	    aRow.childNodes[1].setAttribute('style', 'width: 0');
          $('#summaryTable').setAttribute("style", 'width: ' + (($('#style-table').clientWidth)) + 'px');
	  }, false);
      }
    }
    if(loggedIn) {
	cellN.appendChild($c('a', {href:'/styles/delete' + style.id, innerHTML:'<div class="delete" title="Delete Style"></div>'}));
	cellN.appendChild($c('a', {href:'/styles/' + style.id + '/edit', innerHTML:'<div class="edit" title="Edit Style"></div>'}));
    }
    var cellI = $c('td', {textContent:toCustStr(style.installs)});
    var cellW = $c('td', {textContent:toCustStr(style.weekly)});
    var cellR = $c('td' ,{rating:style.rating, title:(style.rated ? 'Rated ' + style.rating :'Not Rated'), innerHTML:'<div class="ratingbg"><div class="ratingfg" style="width: ' + Math.round(style.rating/3*100) + '%"></div</div>'});
    row.appendChild(cellN);
    row.appendChild(cellI);
    row.appendChild(cellW);
    row.appendChild(cellR);
    styleTable.appendChild(row);
  }
  styleList.parentNode.replaceChild(styleTable, styleList);
  var th = $('th',styleTable);
  for(var i = 0, l = th.length; i < l; i++) {
    th[i].addEventListener('click', function(e) {if (!e.target.id) sortTable(e.target);}, false);
    $('#sortbtn').addEventListener('click', function() {hideObs();}, false);
  }
  var colIndex = 0;
  function sortTable(source) {
    var table = source;
    while(table.nodeName.toLowerCase() != 'table') table = table.parentNode;
    var newRows = [];
    for(var i = 0, l = table.rows.length-1; i < l; i++) newRows[i] = table.rows[i+1];
    if(colIndex == source.cellIndex) newRows.reverse();
    else {
	colIndex = source.cellIndex;
	var cell = table.rows[1].cells[colIndex].textContent;
	if(colIndex == '4') newRows.sort(sortR);
	else if(parseFloat(cell) || colIndex == '3') newRows.sort(sortF);
	else newRows.sort(sortT);
	if(sortdir == 'desc') newRows.reverse();
    }
    function sortR(a,b) { 
      return parseFloat(a.cells[colIndex].getAttribute('rating')) - parseFloat(b.cells[colIndex].getAttribute('rating')); 
    }
    function sortF(a,b) { 
      return a.cells[colIndex].textContent.toCustNum() - b.cells[colIndex].textContent.toCustNum(); 
    }
    function sortT(a,b) { 
	a = a.cells[colIndex].textContent.toLowerCase(); 
      b = b.cells[colIndex].textContent.toLowerCase(); 
      if(a<b) return -1; 
      if(a==b) return 0; 
	return 1; 
    }
    for(var i = 0; i < newRows.length; i++) table.appendChild(newRows[i]);
  }
  var sBtn = $('#sortbtn'), obs = $('.obsolete');
  if (obs.length == 0) sBtn.style.display = 'none';
  else sBtn.style.display = 'inline-block';
  function hideObs() {
    for(var i = 0; i < obs.length; i++) {
      if (obs[i].hasAttribute('hide')) {
	  obs[i].style.display = 'table-row';
	  obs[i].removeAttribute('hide');
	} else {
	  obs[i].style.display = 'none';
	  obs[i].setAttribute('hide', true);
	}
    }
    if (labelIcon == 1) {
      if (sBtn.textContent == 'HideObs') {
	  sBtn.textContent = 'ShowObs';
	  sBtn.title = 'Show Obsolete Styles';
      } else {
	  sBtn.textContent = 'HideObs';
	  sBtn.title = 'Hide Obsolete Styles';
      }
    }
    if (labelIcon == 2) {
      if (sBtn.title == 'Hide Obsolete Styles') {
	  sBtn.title = 'Show Obsolete Styles';
	  sBtn.style.backgroundPosition = '-32px 0';
      } else {
	  sBtn.title = 'Hide Obsolete Styles';
	  sBtn.style.backgroundPosition = '0 0';
      }
    }
  }
  if(onUserPage) {
    var summary = '<label id="summary">:: S U M M A R Y ::</label><br>';
    summary += '<label id="summary-styleCnt">Style Count: </label>'+
	'<b id="summary-cnt">'+toCustStr(styleCount)+'</b>'+
	'<label id="summary-obsolete"> Obsolete: </label>'+
	'<b id="summary-obsoleteCnt">'+toCustStr(obsoleteCount)+'</b><br>';
    summary += '<label id="summary-install">Total Installs: </label>'+
	'<b id="summary-installCnt">'+toCustStr(totalInstalls)+'</b><br>';
    summary += '<label id="summary-weekly">For The Week ('+getValue('presentDate2')+' - '+getValue('resetDate2')+') Days Left: </label>'+
      '<b id="summary-left">'+daysLeft+'</b><br>';
    summary += '<label id="summary-rate">Ratings: </label>'+
	'<label id="summary-good"> Good: </label>'+
	'<b id="summary-rateGood">'+toCustStr(ratingGood)+'</b>'+
	'<label id="summary-OK"> Ok: </label>'+
	'<b id="summary-rateOK">'+toCustStr(ratingOk)+'</b>'+
	'<label id="summary-bad"> Bad: </label>'+
	'<b id="summary-rateBad">'+toCustStr(ratingBad)+'</b><br>';
    summary += '<button id="daily-count">Hide Daily Counts</button><br>';
    if(getValue('lastDailyCheck-'+user)) summary += '<label id="lastCheck" class="subtitle">Last checked '+getDateDiffString(new Date(), new Date(parseInt(getValue("lastDailyCheck-"+user))))+' ago</label><br>';
    else summary += '<label id="firstCheck" class="subtitle">First visit, statistics recorded</label><br>';
    styleTable.parentNode.insertBefore($c('p', {id:'summaryTable', className:'subtitle', innerHTML:summary}), styleTable);
    $('#summaryTable').setAttribute("style", "width: " + (($('#style-table').clientWidth)) + "px");
    var dailycnt = $('#daily-count'), diffs = $('.diffspan');
    if (!loggedIn) dailycnt.disabled = true;
    dailycnt.addEventListener('click', function() {
	if(dailycnt.textContent == 'Hide Daily Counts') {
	  dailycnt.textContent = 'Show Daily Counts';
        for(var i = 0; i < diffs.length; i++) diffs[i].setAttribute('style', 'display:none');
	} else {
	  dailycnt.textContent = "Hide Daily Counts";
        for(var i = 0; i < diffs.length; i++) diffs[i].setAttribute('style', 'display:-moz-box');
      }
    },false);
    if (daysLeft < 0 || timer == 0) setValue('DATA-'+user, jStringify(DATA));
    var oldDATA = getValue('DATA-' + user);
    if(!oldDATA) { 
      setValue('DATA-'+user, jStringify(DATA)); 
    } else {
      oldDATA = jParse(oldDATA);
      var styleRows = $('tr', styleTable), rowCount = styleRows.length, diffWTotal = 0;
      for(var i = 1; i < rowCount; i++) {
	  var styleRow = styleRows[i], styleID = styleRow.id;
	  var name = styleRow.cells[1].children[0].textContent;
	  var installs = styleRow.cells[2].textContent.toCustNum();
	  if(loggedIn && oldDATA[styleID]) {
	    var diff_W = parseInt(installs) - parseInt(oldDATA[styleID].installs);
	    if(diff_W != 0) styleRow.cells[3].appendChild(createDiffSpan(diff_W));
	    diffWTotal += diff_W;
        }
        if(!loggedIn) styleRow.cells[3].style.display = 'none';
	}
      var styleHeaderRow = $('//tr[th]', document, true, styleTable);
      if(loggedIn && diffWTotal != 0) styleHeaderRow.cells[3].appendChild(createDiffSpan(diffWTotal));
      if(!loggedIn) styleHeaderRow.cells[3].style.display = 'none';
    }
    setValue('lastDailyCheck-'+user, new Date().getTime().toString());
  }
  var rows = $('tr', styleTable), openbtn = $('#openbtn'), closebtn = $('#closebtn');
  openbtn.addEventListener('click', function() {
    for(var a = 1; a < rows.length; a++) {
	if(!loggedIn && !rows[a].hasAttribute('opened') && !rows[a].hasAttribute('class')) 
	  rows[a].children[1].childNodes[1].className += ' loading';
	if (!rows[a].hasAttribute('opened') && !rows[a].hasAttribute('class')) {
	  fetchMeta(rows[a].id);
	  rows[a].setAttribute('opened', 'true');
	  rows[a].children[1].childNodes[2].setAttribute('style', 'width: 0');
	  rows[a].children[1].childNodes[1].setAttribute('style', 'width: 16px');
	}
    }
  },false);
  if (dataLines == 1) {
    closebtn.addEventListener('click', function() {
      for(var a = 1; a < rows.length; a++) {
	  if (rows[a].hasAttribute('opened')) {
          var aRow = rows[a].children[1]; 
	    aRow.removeChild(aRow.childNodes[5]);
	    aRow.removeChild(aRow.childNodes[4]);
	    aRow.removeChild(aRow.childNodes[3]);
          aRow.childNodes[2].setAttribute('style', 'width: 16px');
          aRow.childNodes[1].setAttribute('style', 'width: 0');
          rows[a].removeAttribute('opened');
        }
      }
      $('#summaryTable').setAttribute('style', 'width: ' + (($('#style-table').clientWidth)) + 'px');
    },false);
  }
  if (dataLines == 2) {
    closebtn.addEventListener('click', function() {
      for(var a = 1; a < rows.length; a++) {
	  if (rows[a].hasAttribute('opened')) {
          var aRow = rows[a].children[1]; 
          aRow.removeChild(aRow.childNodes[6]);
          aRow.removeChild(aRow.childNodes[3]);
          aRow.removeChild(aRow.childNodes[2]);
          aRow.removeChild(aRow.childNodes[1]);
          aRow.childNodes[2].setAttribute('style', 'width: 16px');
          aRow.childNodes[1].setAttribute('style', 'width: 0');
          rows[a].removeAttribute('opened');
        }
      }
      $('#summaryTable').setAttribute('style', 'width: ' + (($('#style-table').clientWidth)) + 'px');
    },false);
  }
  function fetchMeta(id) {
    xhr({
      method: 'GET', url: 'http://userstyles.org/styles/'+id, onload: function(responseDetails) {
	  if(responseDetails.status == 200) {
	    var page = $('h1')[0].textContent, aStr = responseDetails.responseText;
	    var body = aStr.split(/<body[^>]*>((?:.|\n|\r)*)<\/body>/i)[1];
	    body = body.replace(/<script((?:.|\n|\r)*?)>((?:.|\n|\r)*?)<\/script>/g, '');
	    var holder = $c('div', {innerHTML:body});
	    document.body.appendChild(holder);
	    holder.style.display = 'none';
	    var str = body.substring(body.indexOf('style-author') + 33, body.indexOf('style-author') + 200);
	    var author = str.substring(str.indexOf('">') + 2, str.indexOf('</a'));
	    var url = str.substring(0, str.indexOf('">'));
	    var bStr = body.substring(body.indexOf('"date-info"') + 13, body.indexOf('"date-info"') + 35);
	    var created = bStr.substring(0,bStr.length-6) + ', ' + bStr.substring(bStr.length-6, bStr.length);
	    var cStr = str.substring(str.indexOf(',') + 2, str.indexOf('.</div'));
	    var dStr = cStr.substring(0,cStr.length-5) + ', ' + cStr.substring(cStr.length-5, cStr.length); 
	    var lastup = ucfirst(dStr), sshot = body.indexOf('id="screenshots"');
	    if (body.indexOf('<li class="more">') != -1) {
            var getStr = body.substring(body.indexOf('<li class="more">') + 41, body.indexOf('<li class="more">') + 200);
	      var affects = getStr.substring(getStr.indexOf('">More') + 7, getStr.indexOf(' styles</a'));
	    } else {var affects = ' N/A '};
	    var row = $('#' + id);
	    if(!row) {log('Unable to find row.'); return;}
	    row = row.children[1]; // Name Cell
	    var loading = $('.loading', row, true);
	    if(loading) loading.setAttribute('class', 'metalink-close');
    	    if (dataLines == 1) {
            var cellX = $c('span', {id:'span1', className:'subs'}), sumX = '<a id="sum1">'+author+'</a><br>';
      	sumX += '<label id="sum2">'+affects+'</label>';
      	var cellY = $c('span',{id:'span2',className:'subs'}), sumY = '<label id="sum3">'+created+'</label><br>';
      	sumY += '<label id="sum4">'+lastup+'</label>';
      	cellX.appendChild($c('td', {id:'sumTable1', className:'subtr', innerHTML:sumX}));
      	cellY.appendChild($c('td', {id:'sumTable2', className:'subtr', innerHTML:sumY}));
      	row.appendChild(cellX);
      	row.appendChild(cellY);
		row.childNodes[3].childNodes[0].childNodes[0].setAttribute('href', url);
	      var span = $c('span', {className:'metainfo'});
	      if(sshot != -1 && row.parentNode.hasAttribute('opened')) 
		  span.appendChild($c('img', {className:'metascreens', title:'Screenshot Supplied'}));
	      row.appendChild(span);
          }
	    if (dataLines == 2) {
	      insertAfter($c('label', {className:'subaffects sonco', textContent:' ' + affects}), row.children[0]);
	      insertAfter($c('a', {className:'subauthor sonco', textContent:author, href:url}), row.children[0]);
	      insertAfter($c('label', {className:'subby sonco', textContent:' By '}), row.children[0]);
	      var div = $c('div', {className:'metainfo'});
	      div.appendChild($c('label', {className:'subcreated sonco', textContent:created}));
	      div.appendChild($c('label', {className:'sublastup sonco', textContent:lastup}));
	      if(sshot != -1 && row.parentNode.hasAttribute('opened')) 
		  div.appendChild($c('img', {className:'metascreens', title:'Screenshot Supplied'}));
	      row.appendChild(div);
	    }
          $('#summaryTable').setAttribute('style', 'width: ' + (($('#style-table').clientWidth)) + 'px');
	    holder.parentNode.removeChild(holder);
        }
      }
    });
  }
  function update() {
    if(typeof ScriptUpdater == 'object') ScriptUpdater.check(98957, version);
  }
  update();
})();