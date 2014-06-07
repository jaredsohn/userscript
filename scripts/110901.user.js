// ==UserScript==
// @name           foxyproxy protocol
// @namespace      ckiikc
// @include        http://www.samair.ru/proxy/*
// @include        http://www.proxy-list.org/*
// @include        http://proxy-list.org/*
// @include        http://atomintersoft.com/*
// @include        http://www.atomintersoft.com/*
// ==/UserScript==


//var fields = '';//store the results 
var thisSpan;
var s_xpath;
var s_regexp;
SelectXpathRegExp();

var tobj = document.evaluate(
	s_xpath,
	document,
	null, 
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	

for (var i = 0; i < tobj.snapshotLength; i++) {
    thisSpan = tobj.snapshotItem(i);
	
	var result = thisSpan.innerHTML;
	thisSpan.innerHTML = result.replace(s_regexp, '<a href="proxy://host=$1&port=$2&name=ProxyProtocol">$1:$2</a>');

}


function SelectXpathRegExp() {
var x=window.location.href;

switch (true)
	{
		case (x.indexOf("samair.ru")>-1):{s_xpath='/html/body/div/div[6]/div[2]/div/div[4]/table[2]/tbody/tr';s_regexp=/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)<script.*script>:([0-9]+)/; break;}
		case (x.indexOf("proxy-list.org")>-1):{s_xpath='/html/body/table/tbody/tr/td[2]/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr[12]/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr';s_regexp=/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+):([0-9]+)/; break;}
		case (x.indexOf("atomintersoft.com")>-1):{s_xpath='/html/body/div/div/div/div/div/div/div/div/div/fieldset/div/table/thead/tr';s_regexp=/([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+):([0-9]+)/; break;}
	}
}
