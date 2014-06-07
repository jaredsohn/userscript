// ==UserScript==
// @name           Amazon Cross Book Mod
// @namespace      http://alpha99.blog.fc2.com/
// @description    online used book store lookup from Amazon.
// @include        http://www.amazon.co.jp/*
// ==/UserScript==
var SITEINFO = [
	{
		label: 'BOOKOFF Online',
		url: 'http://www.bookoffonline.co.jp/display/L001,st=u,q=',
		regexp: /mainprice\">\uffe5([\d,]+)/,
		isbn13: true,
		//href: 'http://www.bookoffonline.co.jp/display/L001,st=u,q=',
		//disabled: true
	},
	{
		label: 'livedoor BOOKS',
		url: 'http://books.livedoor.com/search/?v=2&word=',
		afterISBN: '&type=isbn',
		regexp: /price\"><span>([\d,]+)/,
		//disabled: true
	},
	{
		label: 'NET OFF',
		url: 'http://www.netoff.co.jp/cmdtyallsearch/hdnAllSearchFlg/1/Ctgry/*/LRack/*/SetFlg/0?SetFlg=&hdnContinueCmdtyList=&hdnContinueCode=&hdnPage=0&hdnFormId=cmdtyalllist&hdnStartIndex=0&hdnEndIndex=500&hdnNarrowCtgry=&hdnAllSearchFlg=&hdnNarrowFlg=&actionNameTxt=&subtotal=&word=',
		//afterISBN: '&used=0&author=&genre=&size=&pricef=&pricet=&issuef=&issuet=&maker=&isbn=&sort=&desc=&used=0&pg=0&pagingData=&iStartPageNo=1&nowPageNo=1&hdnCmdtyCode0=0010046487',
		regexp: /color:#e00000;font-weight:bold;\">([\d,]+)/,
		isbn13: true,
		//disabled: true
	},
	/*
	{
		label: 'furu1online', //古本市場
		url: 'http://www.furu1online.net/SearchItem?CID=&FREE_WORD=',
		//regexp: /priceInfo\">[\s\S]*<del>[\s\S]*<\/del>[\s\S]*<strong>(.+)<\/strong>"/,
		regexp: /right\">[\s\S]*<del>[\s\S]*<\/del>[\s\S]*<strong>([\d,\s]+)[\s\S]*<\/strong>/,
		isbn13: true,
		//disabled: true
	},
	*/

]

//main
  if (!document.body.parentNode.innerHTML.match(/<li><b>ISBN\-13:<\/b>\s(\d{3})\-(\d{9}[\dX])<\/li>/))
    return;
  var isbn13 = RegExp.$1 + RegExp.$2;
  //alert(isbn13);

  var block = document.evaluate(
    "//div[@id='priceBlock']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (!block)
    return;
  
  for(i = 0, len = SITEINFO.length; i < len; i++){
    var siteinfo = SITEINFO[i];
    getValue(isbn13, siteinfo);
  }
  
  /*
  var siteinfo = SITEINFO[3];
  getValue(isbn13, siteinfo);
  */

function getValue(isbn13, siteinfo){
  GM_xmlhttpRequest({
    method : 'GET',
    url : siteinfo.url + isbn13, //'http://www.bookoffonline.co.jp/display/L001,st=u,q=' + isbn13,
    onload : function(resp) {
      var link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', siteinfo.url + isbn13); //'http://www.bookoffonline.co.jp/display/L001,st=u,q=' + isbn13);
      link.setAttribute('title', siteinfo.label); //'To BOOKOFF Online');
      link.innerHTML =
        '<br />' +
        '<span style=\"font-size:12px; color:#000099; background-color:#ffff66;\">' +
        '&raquo; [<b>' +
        (resp.responseText.match(siteinfo.regexp)  //(/mainprice\">\uffe5([\d,]+)/)
          ? '\u2605\u5728\u5eab\u3042\u308a ' + RegExp.$1 + ' \u2605' : '\u5728\u5eab\u306a\u3057...') +
        '</b>] ' +
        siteinfo.label + //'\u30d6\u30c3\u30af\u30aa\u30d5\u30aa\u30f3\u30e9\u30a4\u30f3\u3067\u4e2d\u53e4\u691c\u7d22' +
        '</span>';

      block.parentNode.insertBefore(link, block.nextSibling);
    }
  });
}

