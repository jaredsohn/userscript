// ==UserScript==
// @name           eRepublik Monetary Market Reflash
// @namespace      eRepublikMMR
// @version        0.01
// @description    
// @include        http://www.erepublik.com/en/exchange
// @include        http://www.erepublik.com/en/exchange#buy_currencies=*;sell_currencies=*;page=*
// @include        http://www.erepublik.com/en/exchange?account_type=*#buy_currencies=*;sell_currencies=*;page=*
// @copyright      2011 Lighdark
// @license        
// ==/UserScript==
var code = String(InsertCode);
code = code.replace("function InsertCode() {", "");
var InsCode = code.substring(0, code.length - 1);
var script = document.createElement('script');
script.textContent = InsCode;
document.body.appendChild(script);
function InsertCode(){
$j(document).ready(function (){
	var a=window.location.href.split("#")[0];
	var b=$j("#buy_selector").attr("href").split("=");
	a=a+"#buy_currencies="+b[2].substring(0,b[2].indexOf(";"))+";sell_currencies="+b[1].substring(0,b[1].indexOf(";"))+";page=1";
	a="http://www.erepublik.com/en/exchange#buy_currencies=62;sell_currencies=35;page=1";
	a='<a href="javascript:Refresh();">Refresh</a>';
	$j('h1:contains("Monetary Market")').after(a);
});
function Refresh(){
	var page = window.location.href.split("page=");
	if (page.length == 1) page = "page=1"; else page = "page=" + page[1];
	populateOfferList(page);
}
}
