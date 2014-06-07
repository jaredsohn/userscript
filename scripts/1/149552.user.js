// ==UserScript==
// @name           Popmundo Yetenek Sayfası
// @namespace      http://www.popmundo.com
// @description    Yetenek sayfasında tümünü göster
// @include        http://www*.popmundo.com/common/*
// @include        http://www*.popmundo.com/Common/*
// @version        1.1
// ==/UserScript==

var version = 3.9;
var URLMYSKILL    = 'CharacterDetails.asp?action=MySkills';
var UPD_CHECK_URL = 'http://userscripts.org/scripts/review/149552?format=txt';
var LAST_SCRIPT_URL = 'http://userscripts.org/scripts/show/149552?versioncheck=';
var VERSION_CHECKED = 'update.checked';
var TIMEDIFF = 172800; // 60*60*24*2 = 2 gün

// Güncelleme Kontrolü
function getOnlineRevision() {
  GM_xmlhttpRequest({
    method:'GET',
    url:UPD_CHECK_URL,
    onload: function(resp) {
      var text = resp.responseText;
      if (resp.status == 200) {
        var tmp = text.match( /.*version\s+?(\d+.?\d+)/i);
        if (tmp) {
          var online_ver = tmp[1];
          GM_log(online_ver);
          if (online_ver > version) {
            var duh = confirm('Lucas Schneider Scriptin yeni bir sürümünü çıkarmıştır yüklemek ister misiniz?')
            if (duh) {
              GM_openInTab(LAST_SCRIPT_URL);
            }
          }
          var checktime = Math.round(new Date().getTime() / 1000);
          GM_log('checktime: ' + checktime)
          GM_setValue(VERSION_CHECKED, checktime);
        }
      }
    }
  });
}

if (location.href.indexOf(URLMYSKILL) > 0 || location.href.indexOf(URLMYSKILL2) > 0)
{
  var formElement;
  var formElements = document.getElementsByTagName("form");
  
  if(formElements[0])
  {
    formElement = formElements[0];
    var newdiv = document.createElement('div');
    newdiv.innerHTML = '<a href="javascript:void(0)" onclick=" ' +
    'var formElements = document.getElementsByTagName(\'form\'); ' +
    'if(formElements[0]){ ' +
    'formElement = formElements[0]; ' +
    'bElements = document.evaluate(\'//form//b//a\', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); ' +
    'for (var i = 0; i < bElements.snapshotLength; i++) {next = bElements.snapshotItem(i); next.style.display = \'none\';}' +
    'brElements = formElement.getElementsByTagName(\'br\'); ' +
    'divElements = formElement.getElementsByTagName(\'div\'); ' +
    'for (var i = 0; i < brElements.length; i++) { ' +
      'y=brElements[i].nextSibling; ' +
      ' while (y.nodeType!=1) {' +
      '  y=y.nextSibling;}' +
      ' if ( y.nodeName != \'TABLE\' ) {brElements[i].style.display = \'none\'; }}' +               
    'for (var j = 0; j < divElements.length; j++) { ' +
      'divElements[j].style.display = \'block\';' +
      'divElements[j].style.marginBottom = \'0px\'; divElements[j].style.marginTop = \'0px\'; ' + 
      '}mydiv = formElement.previousSibling; mydiv.style.display= \'none\';}return false;">' +
    '<font color=\'#333333\'><u>  Tümünü Göster</u></font></a><br/><br/>';
    formElement.parentNode.insertBefore(newdiv,formElement);
      
  }
}