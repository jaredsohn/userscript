// ==UserScript==
// @name          </a><span style="text-decoration: line-through; color: #aaa;">TEM pwnz UMO</span> <a style="color:#f00; text-decoration: none;">deprecated
// @namespace     http://loucypher.cjb.net/
// @include       https://addons.mozilla.org/*
// @include       https://pfs.mozilla.org/plugins/*
// @exclude       https://addons.mozilla.org/plugins/
// @description	  The Extensions Mirror links and search form at Mozilla Update. See the screenshot: http://www.flickr.com/photos/zoolcar9/26540829/
// ==/UserScript==
// Changelog:
// 20050728
// - Added custom style

(function() {
  var head = document.getElementsByTagName('head')[0];

  //put the script
  var script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.innerHTML = 'function getSearchValue() {\n' +
        '  var search = document.getElementById("search");\n' +
        '  var sectionsearch = document.getElementById("sectionsearch");\n' +
        '  var searchTEM = document.getElementById("searchTEM");\n' +
        '  searchTEM.keywords.value = search.q.value;\n' +
        '  switch(sectionsearch.value) {\n' +
        '    case "A": searchTEM.forums.value = "all"; break;\n' +
        '    case "E": searchTEM.forums.value = "20"; break;\n' +
        '    case "T": searchTEM.forums.value = "23"; break;\n' +
        '  }\n' +
        '}\n';

  head.appendChild(script);

  //add style
  var style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.innerHTML = '#mozilla-org a:hover { background-position: 0 2px; }';

  head.appendChild(style);

  //put TEM search button
  var search = document.getElementById('search');
  var sectionsearch = document.getElementById('sectionsearch');
  var li = document.createElement('li');

  var searchTEM = document.createElement('form');
      searchTEM.setAttribute('action', 'http://www.extensionsmirror.nl/index.php?act=Search&CODE=01');
      searchTEM.setAttribute('id', 'searchTEM');
      searchTEM.setAttribute('name', 'searchTEM');
      searchTEM.setAttribute('method', 'post');
//    searchTEM.setAttribute('target', '_blank'); //will open in new window/tab (optional)
      searchTEM.innerHTML = '' +
        '<input type="hidden" name="keywords" value="">' +
        '<input type="hidden" name="exactname" value="1">' +
        '<input type="hidden" name="forums" value="">' +
        '<input type="hidden" name="searchsubs" value="1">' +
        '<input type="hidden" name="prune" value="0">' +
        '<input type="hidden" name="prune_type" value="newer">' +
        '<input type="hidden" name="sort_key" value="last_post">' +
        '<input type="hidden" name="sort_order" value="sort_desc">' +
        '<input type="hidden" name="search_in" value="titles">' +
        '<input type="hidden" name="result_type" value="topics">' +
        '<input type="submit" value="TEM" onclick="getSearchValue()"' +
        ' title="Search The Extensions Mirror" id="submit" style="float:left">';
  
  li.appendChild(searchTEM);
  search.parentNode.parentNode.appendChild(li);

  //put TEM banner
  var mofo = document.getElementById('mozilla-org');
  var temBanner = mofo.firstChild.cloneNode(true);
      temBanner.setAttribute('href', 'http://www.extensionsmirror.nl/');
//    temBanner.setAttribute('target', '_blank'); //will open in new window/tab (optional)
      temBanner.setAttribute('style',
        'background-image: url("data:image/gif;base64,R0lGODlhbgAZAPcAAAheCAxdDABpAAtsCwx4DAx%2BDBFoERF7ERN%2FExl%2BGSNrIyVsJSl%2BKTh7ODx9PAGHAQCLAACPAAiECA%2BCDw6HDg%2BNDwCRAACZAACaAACfAA2UDQudCxGAERGDEROCExSCFBaAFhSKFBKWEhaUFhOdEwChAAOlAwCpAACuAA6oDgCyAAOzAwC2AAC4AAC8ACCAICOFIyqBKiSXJDODMzGMMQDBAADCAADFAADGAADIAADLAADMAADPAALMAgXPAADRAADVAADaAADfAAjfARDLBRnWCh7bFADjAADkAADpAAHuAAXqABX3AB7zDxr4BR74DyTbHS7eJC73Hi7%2FGi79HjbzJDP%2FI0OMQ06WTlyLXF2PXViYWGWUZXWddXuce2mjaW%2Bvb3WjdXykfHmqeX%2Bzf0L%2FLVv%2FS2T%2FVXv%2FbYeFX4eGYIiGYYmIYouJY4yLZI6MZo%2BOaJCPZ5GPaZGQaJKRaJOSaZSSaZSTapaUbJeWbJiXb5qYb5yab5uZcJyacJ6ccqCfcqOhdKOhdqSidqakd6aleKimdqimeKimeqqpeaqoeqyqfa6sfbCtfLGwfrSyf4anhoSvhImsiZS4lJizmJ%2B3n5q%2FmrKvgLOxgLSygLSygra0gre1hLi2gri1hLq4hry6hr%2B8hr26iL68iaC6oKK7oqK%2BoqW6paW9pau%2Fq6TApKnCqa%2FEr7DOsLbLtrfNt77Uvq%2F%2FoMC9isC%2FicG%2FisPBjcTCjMbEjcvIj8TClcTDlsXEl8fFm8nHkMvJkMvJkszKkc3Lks7LkczKlM7NlcvJmMzKmdHOk9DOltLPlNLPl9PQmNTRmNXSmNXTm9bTmdbTmtbUmtnWmdjWmtjVnNrYndzand3bnt7bnt%2Fcnd7cns7NsdvZoN3aoN%2FcoNLRteDdnuHen%2BDeoOLfouLgoePhouTio%2BXipObkpejlpunnqOvoqezpqu7rrO%2FsrfDtrvHusNXUydnYztvb0d7e3srhys%2Fgz%2BLi2OHh4ePj4%2BTk5OXm5ufn5%2Bjo6Orq6uzs7CwAAAAAbgAZAEAI%2FgDhCRxIsKDBgwgTKlzIsKHDgusiSpwYMUUsNGemLBECJEgQJSpWrYMEi6IbUBEJEVoHys26Q34osnQp0ZabkzMj3vEkkZkbZj6ZoTPHjJDLk9XcEFvn51DQoEOL0pTpTxe5q1izevhRw8aHV1gnRcCAKqvZs2jNAlsza42jOpnWkFsLjC65uFfXZLorV2%2Fav4DJ6dr3r%2FA%2Ff%2F0SK17MuLHjx5AjS55MWbK%2Fwu4ya97MeUYUM2WsVMHghbNmWbLgHJJ17tAh06ZTo6YWGw7s25uXecPN27QxbuiCCx8u3JKKIzVctGCB4oSKEy08EJ9OnbotT9XQRfNEDF01Or%2Bq%2FosfT346N2P%2BvjnLxr69%2B%2Ffw48ufT7%2B%2B%2Ffv3nW3j966%2F%2F%2F8ABijggO90MwyBCCaoYH%2FoqLOgguxEKOGEEaZiiiqscEHEE1KEQMkqpVA44RujREhIHsgo8gY7n%2ByBTosSjvLGjNCww0gee5QoY4R%2FKMLOH5dA8wYjMkIjYzfjdMMOiejkMUqTowhJ5BtGvoGkkiKyo86WXHa5pQJkwEIDEEgAsQMOLiQHggQ4EODlJ8psecst6ijzyZbYfDIKNlza%2Bcmft3wyzjif9KLOKIKq88wnt4yTJzaPjhMonerAqY6knzyjzqORTupll%2FrkYs6opJYqgAxfjMCDCyVgkAEK%2Fi1gkEUDGQxQ6q245koqG24MYs4dbgBizjSJNINMIr0ccgsmm2ByDSaAOCsOJrcMco2u2GKbCz1VhePtt%2BAuwAECCHAQgLenANCBAamA6%2B678LrbSRrhGJJGKLikkUy%2BuPAbziP01ksHLnQYEk4aj8Sr8MLh6MJPYfd8s8vEFFds8cUYZ6zxxhx37DHH28ijTz8PlWzyySinXNCD74BRgQgkiEABDK0MiMjNNw9zs4I63%2BxJgNRowvJ%2FeiwyNIHtJK300kzDckURTDSxgRhMVw3HKEkX0kcfcDDSTjqCwNFHN0qPAofS3fwxitndwOF2Ot1wLUg60fTBCRx%2FpAM2%2Fhx51NKO2u0Qw7UidNuNt95h91110llSWAAUPuBgBBVJIDFECy5AUEnjb4hiIiHsiLIiITPOKKHozTRzDjvnyLFi6K%2BX%2FgYhzbyRuu3U4PGGH8gsKUrtzbCjEvDA575771l%2B%2BqkGLiTQgxNCBAGEDi7wcMIkYzzAgJdu3KnOIINU6oY60bjhiSeAcPlJr%2BAnlcn61chivjef3PHJIZ8s48Yy%2Bi%2FDiB%2Bf8EP6uqcOQPjBE26IRv%2F6978Apk95eougBCeYjki0IAk6wIENXKACFbiABS7wAAVHSMISmvCEKEwhBeNhjHO48IUwlEQ9zrEFFQSBBzu4AQuccwEMuOAA%2FjAMohCH%2BMI5sAEU58gEGwBxDm0M4hlEjKIUpyhEY8SjH7kohxa3yMUQ6CADOVhBDLpACi28oAUWcEU5HBAGLrrxjXDUojXWEIg4TGMNJypHMNYQjD3ygRabWEMigpEIOwTDDokoxxrssIk4OvKRuchHtxQ2AR60AAcmwIK37EEDFlyAFAwLJbh8oQZf0KENh8iEGsJBSl%2B0Mhyq9JYaMgHLVc5SlLhs2D78wQtsgOOXwAymMIdJzGIaM5ih4AM4hMEHaRyDD8d4ZjShCY5k%2FlIajeCDIaQBDj6E4pjgHCY2ePGwexRjPfhJpzrXyc52sscZxZhHPwzTD33g4574FcynPvfJz376858ADahAATqyfwQEAAA7")');
      temBanner.setAttribute('title', 'Get more extensions & themes');
      temBanner.firstChild.nodeValue = 'The Extensions Mirror';

  mofo.appendChild(temBanner);

  //search specified extension @ TEM
  var uri = location.href;

  if(uri.match(/\/extensions\/moreinfo\.php/)) {
    var mainContent = document.getElementById('mainContent');
    var cTitle = mainContent.getElementsByTagName('strong')[0];
    var extName = cTitle.firstChild.nodeValue;
    var installBox = mainContent.getElementsByTagName('div')[2];

    var tem = document.createElement('form');
    tem.setAttribute('action', 'http://www.extensionsmirror.nl/index.php?act=Search&CODE=01');
    tem.setAttribute('method', 'post');
    tem.setAttribute('name', 'sForm');
//  tem.setAttribute('target', '_blank'); //will open in new window/tab (optional)
    tem.setAttribute('style', 'float: right;');
    tem.innerHTML = '' +
      '<input type="hidden" name="keywords" value="' + extName + '">' +
      '<input type="hidden" name="exactname" value="1">' +
      '<input type="hidden" name="forums[]" value="20">' +
      '<input type="hidden" name="searchsubs" value="1">' +
      '<input type="hidden" name="prune" value="0">' +
      '<input type="hidden" name="prune_type" value="newer">' +
      '<input type="hidden" name="sort_key" value="last_post">' +
      '<input type="hidden" name="sort_order" value="sort_desc">' +
      '<input type="hidden" name="search_in" value="titles">' +
      '<input type="hidden" name="result_type" value="topics">' +
      '<input type="image" src="http://www.extensionsmirror.nl/logo/button1.jpg"' +
      ' value="Find in TEM"' +
      ' title="Find ' + extName + ' in The Extensions Mirror">';

    installBox.insertBefore(tem, installBox.firstChild);
  }

})();


