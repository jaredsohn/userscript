// ==UserScript==
// @name          eBay Hacks - Show only negative feedback
// @namespace     http://www.ebayhacks.com
// @description	  Adds two new tabs to eBay feedback profile pages that shows only the negative and neutral comments an eBay member has received & left for others
// @include       http://feedback.ebay*
// ==/UserScript==

// based on code by shii.org

allLinks = document.evaluate('//td//td//a[contains(@href, "ViewFeedbackMemberLeft")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,  null);
thisLink = allLinks.snapshotItem(0);
userid = getURLParam('userid');

if (thisLink) {
 do_insert_html(document, "TD", thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, '<table cellpadding="0" cellspacing="0" border="0"><tr><td colspan="2"><img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="1" height="1"></td></tr><tr><td rowspan="2" bgcolor="#cccccc"><img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="1" height="1"></td><td valign="top" colspan="2" height="1" bgcolor="#cccccc"><img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="1" height="1"></td><td background="http://pics.ebaystatic.com/aw/pics/myebay/sliver_off_1x10.gif" rowspan="2" valign="top" align="right"><img src="http://pics.ebaystatic.com/aw/pics/myebay/taboff_10x10.gif" align="top" alt=" " title=""></td></tr><tr><td bgcolor="#eeeef8">&nbsp;</td><td align="center" bgcolor="#eeeef8" nowrap><img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="1" height="2"><br><b><a href="http://toolhaus.org/cgi-bin/negs?Dirn=Received+by&User=' + userid +'">Complaints Received</a></b><img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="1" height="0"></td></tr></table>');
 do_insert_html(document, "TD", thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, '<img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="7" height="1">');

 do_insert_html(document, "TD", thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, '<table cellpadding="0" cellspacing="0" border="0"><tr><td colspan="2"><img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="1" height="1"></td></tr><tr><td rowspan="2" bgcolor="#cccccc"><img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="1" height="1"></td><td valign="top" colspan="2" height="1" bgcolor="#cccccc"><img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="1" height="1"></td><td background="http://pics.ebaystatic.com/aw/pics/myebay/sliver_off_1x10.gif" rowspan="2" valign="top" align="right"><img src="http://pics.ebaystatic.com/aw/pics/myebay/taboff_10x10.gif" align="top" alt=" " title=""></td></tr><tr><td bgcolor="#eeeef8">&nbsp;</td><td align="center" bgcolor="#eeeef8" nowrap><img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="1" height="2"><br><b><a href="http://toolhaus.org/cgi-bin/negs?Dirn=Left+by&User=' + userid +'">Complaints Left</a></b><img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="1" height="0"></td></tr></table>');
 do_insert_html(document, "TD", thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, '<img src="http://pics.ebaystatic.com/aw/pics/s.gif" width="7" height="1">');
}


function do_insert_html(doc, type, element, html) {
  var new_element = doc.createElement(type);
  new_element.innerHTML = html;
  element.parentNode.insertBefore(new_element, element.nextSibling);
};



function getURLParam(strParamName){
  var strReturn = "";
  var strHref = window.location.href;
 
  if ( strHref.indexOf("&") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?")+1).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
	if ( aQueryString[iParam].indexOf(strParamName + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return strReturn;
}

