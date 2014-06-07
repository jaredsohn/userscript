// This is my first greasymonkey script:)
// --------------------------------------------------------------------
// Modify by MOH  at 2009.12.14 
// ==UserScript==
// @name          MyCat
// @namespace     http://sparkplug-moh.blogspot.com
// @description   Block some ad cheater.I know nothing about javascript,this script is based on dvbbskilluser.user.js and someothers,thanks evryone. 
// @include       http://*.kdnet.net/newbbs/list*
// ==/UserScript==

var allLinks, thisLink,theWho,theTr;
//在下面写上想要屏蔽的ID的名字,注意格式,并保存为utf8
var cheater= new Array("张三" , "李四" , "王二麻子", "Mike" , "Jack");
allLinks = document.evaluate(
    "//td[count(a)=1]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    theWho = thisLink.firstChild;
    for  (var j = 0; j < cheater.length;j++) {
      if (theWho.innerHTML == cheater[j]){
       theTr=theWho.parentNode.parentNode;
       theWho.parentNode.parentNode.parentNode.removeChild(theTr);
}
}
}
/*block the web element what I dont want to see,but I think that the firefox another extention Adblock Plus can do this better by add the two rules like below:
屏蔽掉一些不想看到的东西,其实用Adblock Plus这个扩展更好,方法是加入下面这两条规则
cat898.com#TR(id^=follow)
cat898.com#div(id$=coco)
*/
var cleanPath = "//div[@id] | //tr[@id]";
var allClean, thisClean;
allClean = document.evaluate(
         cleanPath,
	 document,
	 null,
         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	 null);
	 for (var x = 0; x<allClean.snapshotLength;x++) {
	 theClean = allClean.snapshotItem(x);
	 theClean.parentNode.removeChild(theClean);
	 }
/*center the web.Before do this ,must bloock something like above.
  修改一下页面显示,前提是做了上面的修改.
*/
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.tableborder1 { width: 1000px ; }');