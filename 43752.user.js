// ==UserScript==
// @name           YoutubeViewMySubscriptionsInNewTab
// @description    Youtube View My Subscriptions In New Tab
// @author         darkyndy
// @include        http://www.youtube.com/my_subscriptions*
// @include        http://*youtube.com/my_subscriptions*
// @version        1.0
// ==/UserScript==

var allImg = document.getElementsByTagName('img');
for(var i=1;i<allImg.length;i=i+1){
  imageSrc = allImg[i].getAttribute("src");
  var myRegExp = new RegExp("vi/([a-z0-9_-]+)/default.jpg", "gmi")
  if(imageSrc.match(myRegExp)){
    var rezReg = myRegExp.exec(imageSrc);
    var thisVideoLink = "http://www.youtube.com/watch?v="+rezReg[1];
    allImg[i].parentNode.setAttribute("href", thisVideoLink);
    allImg[i].parentNode.removeAttribute("onclick");
  }
}