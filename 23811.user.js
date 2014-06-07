// ==UserScript==
// @name           CentSports Friend Sorter
// @namespace      http://centsports.com
// @description    Adds the ability to sort your friends
// @include        http://*.centsports.com/*
// @exclude        http://*.centsports.com/forum/*
// ==/UserScript==


                                     
var actualTable = document.evaluate("/html/body/table[2]/tbody/tr/td/table[2]/tbody/tr[2]/td/table/tbody/tr/td/table[2]/tbody/tr/td/div/table",
              document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


var friendsTable = document.evaluate("/html/body/table[2]/tbody/tr/td[1]/table[2]/tbody/tr[2]/td/table/tbody/tr/td/table[2]/tbody/tr/td/div[@class='curve_green']/table/tbody/tr",
              document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
var footer = document.evaluate("/html/body/table[2]/tbody/tr/td[1]/table[2]/tbody/tr[2]/td/table/tbody/tr/td/table[2]/tbody/tr/td/div[@class='curve_green']/table/tbody/tr/td[@class='tiny']",
              document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var f = footer.snapshotItem(0)
var p = f.parentNode.parentNode
p.removeChild(f.parentNode)

actualTable.snapshotItem(0).className = 'sortable'



var html_doc = document.getElementsByTagName('head').item(0);
    var js = document.createElement('script');
    js.setAttribute('language', 'javascript');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', 'http://www.kryogenix.org/code/browser/sorttable/sorttable.js');
    html_doc.appendChild(js);
    
  
if( ! document.getElementById('poweredBy')) {
var poweredBy = document.createElement('div')
poweredBy.style.position = 'fixed'
poweredBy.id = 'poweredBy'
poweredBy.style.backgroundColor = 'transparent'
poweredBy.innerHTML = 'Powered By <a href="http://www.centsports.com/crony_invite_action.php?master_id=19322"> Puttzy </a>'

}
