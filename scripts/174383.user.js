// ==UserScript==
// @name 超级赞插件
// @namespace http://www.douban.com/people/sandlong/
// @version 0.06
// @description 在某些非常规的豆瓣广播下面添加一个菜单，提供回应、赞和转播的功能。
// @exclude http://www.douban.com/people/*/status/*
// @exclude http://www.douban.com/people/*/
// @include http://www.douban.com/*
// ==/UserScript==

var allDivs,allDivsforurl,thisDiv,thisDivforurl,StatusID,PeopleLink;
allDivs = document.evaluate(
    "//div[@class='actions' and not(span[@class='created_at'])]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
allDivsforurl = document.evaluate(
    "//div[@class='status-item' and not(.//span[@class='created_at'])]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {    
    thisDiv = allDivs.snapshotItem(i);
    StatusID = allDivsforurl.snapshotItem(i).getAttribute("data-sid");
    PeopleLink = thisDiv.parentNode.parentNode.getElementsByTagName("a")[0].getAttribute("href");
    thisDivforurl = PeopleLink.concat("status/",StatusID);
    var MainMenu = document.createElement("div");
    MainMenu.className = 'actions';
    MainMenu.innerHTML ='<span class="created_at"><a href="'+thisDivforurl+'">超级赞插件</a></span>'+'<a href="'+thisDivforurl+'" class="btn btn-action-reply" data-action-type="showComments">回应</a>'+'&nbsp;&nbsp;<a href="'+thisDivforurl+'" class="btn btn-key-like btn-like" data-action-type="like">赞</a>'+'&nbsp;&nbsp;<a href="'+thisDivforurl+'" class="btn btn-key-like  btn-unlike" data-action-type="unlike">取消赞</a>'+'&nbsp;&nbsp;<a href="'+thisDivforurl+'" class="btn btn-key-reshare btn-reshare" data-action-type="reshare">转播</a>';
    thisDiv.parentNode.insertBefore(MainMenu,thisDiv);
}