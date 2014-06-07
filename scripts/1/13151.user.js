// ==UserScript==
// @name           StudiVZ Status der Gruppenbenachrichtigung in der Übersicht
// @namespace      Woems
// @include        http://www.studivz.net/groups.php*
// @description    Zeigt den Status der Gruppenbenachrichtigung in der Übersicht an
// ==/UserScript==

Userscript_Version='0.1';

function autoUpdateFromUserscriptsDotOrg(URL,Version) {
  try {
    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.
    var now = new Date().getTime();
    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < ONE_DAY) return 2;
    GM_setValue('LAST_CHECKED', now.toString());
    GM_xmlhttpRequest({
      method: 'GET',
      url: URL + '?source', // don't increase the 'installed' count just for update checks
      onload: function(result) {
        if (!result.responseText.match(/Userscript_Version[\s='"]+([\d.]+)[\s='";]+/)) return 3;     // did not find a suitable version header
        var theOtherVersion = RegExp.$1;
        if (parseFloat(theOtherVersion) <= parseFloat(Version)) return 4;      // no updates or older version on userscripts.org site
        if (!result.responseText.match(/@name\s+(.+)/)) return 5;     // did not find a suitable
        userscript_Name=RegExp.$1;
        if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + userscript_Name + '" is available.\nYour installed version is ' + Version + ' .\n\nUpdate now?\n')) {
          GM_openInTab(URL);   // better than location.replace as doing so might lose unsaved data
        }
      }
    });
  } catch (ex) {
  }
}
autoUpdateFromUserscriptsDotOrg('http://userscripts.org/scripts/source/13151.user.js',Userscript_Version);


function $(id) {
  return document.getElementById(id);
}

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function get(url, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText); }
  });
}

//------------------------------------------------------------------------------
$x("id('friendtables')/div[*]/table/tbody/tr").forEach(function (line) {
  //GM_log('\line.innerHTML: '+line.innerHTML);
  //GM_log('\nLink.innerHTML: '+$x('./td[2]//tr[1]/td[2]/a',line)[0].innerHTML);
  //GM_log('\nLink.href: '+$x('./td[2]//tr[1]/td[2]/a',line)[0].href);
  //GM_log('\nGruppe: '+$x('./td[4]',line)[0].innerHTML);
  var Gruppenname=$x('./td[2]//tr[1]/td[2]/a',line)[0].innerHTML;
  var link=$x('./td[2]//tr[1]/td[2]/a',line)[0].href;
  var GruppenID=link.replace(/.*ids=(.*)/,'$1');
    get('http://www.studivz.net/groupopts.php?ids='+GruppenID, function (text) {
      dummyDiv = document.createElement('div');
      dummyDiv.innerHTML = text;
      $x(".//input[@name='get_emails'][@checked]",dummyDiv).forEach(function (text) {
//GM_log('\nGruppenID: '+GruppenID+'\nlink: '+link+'\nGruppe: '+Gruppenname+'\nInput:\nName: '+text.name+'\nValue: '+text.value+'\nChecked: '+text.checked);
        //link.innerHTML+=' ('+(text.value!=0?'Mail ':'nothing ')+text.value+')';
        //$x('./td[4]',line)[0].appendChild(document.createTextNode((text.value!=0?'Mail ':'nothing ')+text.value));
          /*
          var newlink = document.createElement('a');
          newlink.href = 'http://www.studivz.net/groupopts.php?ids='+GruppenID;
          newlink.innerHTML = 'no Mails!';
          $x('./td[4]',line)[0].appendChild(newlink);
          //GM_log($x('./td[4]/a[text()="no Mails!"]',line)[0].href);
          */
          var tr = document.createElement('tr');
          var td1 = document.createElement('td');
          var td2 = document.createElement('td');
          tr.appendChild(td1);
          tr.appendChild(td2);
          td1.innerHTML = 'Benachrichtigung:';
          td1.className='label2';
          td2.innerHTML=(text.value==0?'<font color=green>keine</font>':text.value==1?'<font color=orange>einmalig</font>':'<font color=red>immer</font>');//+text.value;
          $x('./td[2]/table/tbody',line)[0].appendChild(tr);
       //'http://www.studivz.net/groupopts.php?checkcode='+$x(".//input[@id='checkcode']",dummyDiv)[0].value+'&get_emails=0&ids='+GruppenID+'&save=1&vis_to_all=1';
      });
    });
  /*
  get(link, function (text) {
    //GM_log('\ntext: '+text);
    dummyDiv = document.createElement('div');
    dummyDiv.innerHTML = text;
    //GM_log('\ndummyDiv.innerHTML: '+dummyDiv.innerHTML);
    //GM_log('\n$x: '+$x(".//a[text()='Mitgliedschafts-Einstellungen']",dummyDiv)[0].href); //
    var link2=$x(".//a[text()='Mitgliedschafts-Einstellungen']",dummyDiv)[0].href;
    get(link2, function (text) {
      dummyDiv = document.createElement('div');
      dummyDiv.innerHTML = text;
      $x(".//input[@name='get_emails'][@checked]",dummyDiv).forEach(function (text) {
        GM_log('\nGruppenID: '+GruppenID+'\nlink: '+link+'\nlink2: '+link2+'\nGruppe: '+Gruppenname+'\nInput:\nName: '+text.name+'\nValue: '+text.value+'\nChecked: '+text.checked);
        link.innerHTML+=' ('+(text.value!=0?'Mail ':'nothing ')+text.value+')';
        $x('./td[4]',line)[0].appendChild(document.createTextNode((text.value!=0?'Mail ':'nothing ')+text.value));
      });
    });
  });
  */
});

//http://www.studivz.net/groupopts.php?checkcode=8b1aec95610d20623a23cd6d8d5bd873&get_emails=0&ids=1d4b092c75ad83a3&save=1&vis_to_all=1
//http://www.studivz.net/groupopts.php?checkcode=0afcfd4a9131dab8e9709d658eed5bdc&get_emails=0&ids=1d4b092c75ad83a3&save=1&vis_to_all=1
