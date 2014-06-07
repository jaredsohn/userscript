// ==UserScript==
// @name           NG Copy Google BlogSearch links to Blog
// @namespace      http://www.ngtech.gr/blog/en/my-bpb
// @description    This extremely useful script enables instant copying of Google Blog Search Results links to your blog posts! Its a great way to quickly generate link lists of other blog posts related to your query and so to increase your trackbacks - pingbacks and your posts traffic.! 
// @include        http://blogsearch.google.com/blogsearch?*
// @author         Nick Georgakis <grease_monkey@ngtech.gr>
// @license        This software is licensed under the GNU GPL License <http://creativecommons.org/licenses/GPL/2.0/>
// @credit         Code Parts Generated using Platypus Firefox Extension
// @version        0.2// ==/UserScript==

var my_ver=0.1; 

function insertAfter(newNode, target) {
    var parent = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild != null)
parent.insertBefore(newNode, refChild);
    else
parent.appendChild(newNode);
};

function html_insert_it(doc, element, new_html, before, insert_as_block) {
  var new_element;
  if (insert_as_block) {
    new_element = doc.createElement ("DIV");
  } else {
    new_element = doc.createElement ("SPAN");
  };
  new_element.innerHTML = new_html;
  if (before) {
      element.parentNode.insertBefore(new_element, element);
  } else {
      insertAfter(new_element, element);
  };
};

var nodesSnapshot = document.evaluate("//a[starts-with(@id,'p-')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var new_html = '<div style="font-size: smaller;border-width:1px;border-style:solid;margin:12px 2px 4px 2px; padding:2px;background-color:lightYellow;"><div style="font-family: serif;font-style: italic;font-weight: lighter;font-size: smaller;line-height: 80%;text-align: center;display:block;margin:2px auto;"><a href="http://www.ngtech.gr/blog/en/my-greasemonkey-scripts" style="color:#F08C00">Copy links to Blog v'+my_ver+'!</a></div><div  id="the_links">';

for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
{
  new_html += '<a href="' + nodesSnapshot.snapshotItem(i).href + '" target="_blank">' + nodesSnapshot.snapshotItem(i).textContent + '</a></br>';
}

new_html += '</div></br><a href="javascript: var ttr = document.createRange();ttr.selectNodeContents(document.getElementById(\'the_links\'));window.getSelection().removeAllRanges();window.getSelection().addRange(ttr);">Select All</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:window.getSelection().removeAllRanges();">Clear</a>&nbsp;&nbsp;|<a href ="https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=paypal%40ngtech%2egr&item_name=Support%20plugin%2fGM%20script%20development%2e&item_number=000%2d002&buyer_credit_promo_code=&buyer_credit_product_category=&buyer_credit_shipping_method=&buyer_credit_user_address_change=&no_shipping=1&cn=Add%20comments%2fnotes%20%28Optional%29&tax=0&currency_code=USD&bn=PP%2dDonationsBF&charset=UTF%2d8"><img style="vertical-align:middle;height:9px;width:9px;border:0px;" align="middle" src="http://www.ngtech.gr/blog/img_src/donate_small.gif?&scr=gglblg&v='+my_ver+'" style="border: 0px none ; width: 10px;"/>Support</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="http://www.ngtech.gr/blog/en/my-greasemonkey-scripts" target="_blank">FeedBack!</a></div>';

html_insert_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[2]/DIV[2]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/FONT[1]/A[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,new_html,false,true);
