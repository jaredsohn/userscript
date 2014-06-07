//
// part_to_price.user.js
// Mark L. Chang mark.chang@gmail.com
//
// version 1.1.1 by:
// Brent J bjerols@gmail.com
//
// ==UserScript==
// @name           Part-to-Price
// @namespace      http://acmelab.org/part_to_price
// @include        http://www.realoem.com/bmw/showparts.do?*
// @include        http://bmwfans.info/parts/catalog/*
// @description    Links part numbers from car parts search engines to various vendor pricing pages
// @version        1.1.0
// ==/UserScript==
//
// CHANGELOG
// 1.1.1: Brent updated to fix links to dealers post trademotion upgrades
// 1.1.0: Brent updated to remove dead stores and add more choices
// 1.0.3: fixed ptp:// for firefox 3.6
// 1.0.2: added pelican oct-25-2009
// 1.0.1: added Bell
// 1.0.0: initial release

// realoem xpath to all part numbers
// /html/body/table/tbody/tr/td[1]/div[@id='div3']/table/tbody/tr/td[7]

// bmwfans xpath to all part numbers
// /html/body/div[@id='main_table']/div[@id='content_block']/div[@id='inner_content_block']/table[@id='parts_table']/tbody/tr/td[@id='select_1']/p/strong/a

// XPath helper
function $x() {
  var x='',          // default values
    node=document,
    type=0,
    fix=true,
    i=0,
    toAr=function(xp){      // XPathResult to array
    var final=[], next;
    while(next=xp.iterateNext())
      final.push(next);
    return final
  },
    cur;
    while (cur=arguments[i++])      // argument handler
      switch(typeof cur) {
      case "string":x+=(x=='') ? cur : " | " + cur;continue;
      case "number":type=cur;continue;
      case "object":node=cur;continue;
      case "boolean":fix=cur;continue;
      }
    if (fix) {      // array conversion logic
      if (type==6) type=4;
      if (type==7) type=5;
    }
    if (!/^\//.test(x)) x="//"+x;         	 // selection mistake helper
    if (node!=document && !/^\./.test(x)) x="."+x;  // context mistake helper
    var temp=document.evaluate(x,node,null,type,null); //evaluate!
    if (fix)
      switch(type) {                              // automatically return special type
      case 1:return temp.numberValue;
      case 2:return temp.stringValue;
      case 3:return temp.booleanValue;
      case 8:return temp.singleNodeValue;
      case 9:return temp.singleNodeValue;
      }
    return fix ? toAr(temp) : temp;
}


// generate form HTML for all target parts vendors
function generateForms(pn) {
  var formHTML;

 formHTML = '<form target="_blank" name="tischer' + pn + '" action="http://www.trademotion.com/parts/?action=oePartSearch&siteid=214672&make=&model=" method="post"><input type="hidden" name="searchText" value="' + pn + '"><input type="hidden" name="Make" value="BMW"><input type="hidden" name="siteid" value="214672"><input type="hidden" name="searchType" value="Part Number Search Results"><input type="hidden" name="oePartSearch" value="1"><a href="http://getbmwparts.com" onclick="tischer' + pn + '.submit(); return false;">Tischer</a></form>';
  formHTML = formHTML + '<form target="_blank" name="pelican' + pn + '" action="http://www.pelicanparts.com/cgi-bin/ksearch/pel_search.cgi" vmethod="POST"><input type="hidden" name="command" value="DWsearch"><input type="hidden" name="description" value="' + pn + '"><a href="http://pelicanparts.com" onclick="pelican' + pn + '.submit(); return false;">Pelican</a></form>';
  formHTML = formHTML + '<form target="_blank" name="ecs' + pn + '" action="http://www.ecstuning.com/Search/" method="POST"><input type="hidden" name="action2" value="search_form"><input type="hidden" name="q" value="' + pn + '"><a href="http://www.ecstuning.com/" onclick="ecs' + pn + '.submit(); return false;">ECS</a></form>';
  formHTML = formHTML + '<form target="_blank" name="turner' + pn + '" action="http://www.turnermotorsport.com/search.aspx?SearchTerm=" method="get"><input type="hidden" name="topsearchform" value=""><input type="hidden" name="SearchTerm" value="' + pn + '"><a href="http://www.turnermotorsport.com/" onclick="turner' + pn + '.submit(); return false;">Turner</a></form>';
  formHTML = formHTML + '<form target="_blank" name="morristown' + pn + '" action="http://www.trademotion.com/parts/?action=oePartSearch&siteid=214320&make=&model=" method="post"><input type="hidden" name="searchText" value="' + pn + '"><input type="hidden" name="Make" value="BMW"><input type="hidden" name="siteid" value="214320"><input type="hidden" name="searchType" value="Part Number Search Results"><input type="hidden" name="oePartSearch" value="1"><a href="http://www.trademotion.com/partlocator/index.cfm?siteid=214320" onclick="morristown' + pn + '.submit(); return false;">Morristown BMW</a></form>';
  formHTML = formHTML + '<form target="_blank" name="fop' + pn + '" action="http://auto-parts.fcpgroton.com/search/index?query=" method="get"><input type="hidden" name = "query" value="' + pn + '"><a href="http://auto-parts.fcpgroton.com/search/index" onclick="fop' + pn + '.submit(); return false;">FCPGroton</a></form>';
  formHTML = formHTML + '<form target="_blank" name="direct' + pn + '" action="http://www.bmwmercedesparts.com/parts/index.cfm?searchText=' + pn + '&make=BMW&action=oePartSearch&siteid=215771" method="post"><a href="http://www.bmwmercedesparts.com/parts/index.cfm?searchText="' + pn + '"&make=BMW&action=oePartSearch&siteid=215771" onclick="direct' + pn + '.submit(); return false;">BMWMercedesparts.com</a></form>';


  return formHTML;
}

// checking in realoem.com
if( window.location.href.match(/.*realoem.com\/bmw\/showparts.do/) ) {
  GM_log("Parsing RealOEM");
  realoem_parts = $x("/html/body/table/tbody/tr/td[1]/div[@id='div3']/table/tbody/tr/td[7]",
			 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  
  realoem_parts.forEach( function(part) {
      pn = part.innerHTML;
      part.innerHTML = pn + generateForms(pn);
    });
 }

// checking bmwfans.info
if( window.location.href.match(/.*bmwfans.info\/parts\/catalog/) ) {
  GM_log("Parsing BMWfans.info");
  var bmwfans_parts = $x("/html/body/div[@id='main_table']/div[@id='content_block']/div[@id='inner_content_block']/table[@id='parts_table']/tbody/tr/td[@id='select_1']/p/strong/a",
			 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);

  bmwfans_parts.forEach( function(part) {
      pn = part.innerHTML;
      formHTML = generateForms(pn)
      formHTML = formHTML.replace(/&nbsp;/gi,"");
      priceLinks = document.createElement('div');
      priceLinks.innerHTML = formHTML;
      part.parentNode.insertBefore(priceLinks, part.nextSibling);
    });
 }


