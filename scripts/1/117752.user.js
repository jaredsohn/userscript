// ==UserScript==
// @name           Get back retweet tab
// @namespace      https://twitter.com/hanyee
// @version        0.2
// @description    Get back retweet tab.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://*.twitter.com/*
// @include        https://*.twitter.com/*
// ==/UserScript==

var uls = document.getElementsByTagName('ul'),
        retweetItem = document.createElement('li'),
        streamTab;

for (n in uls) {
    if (uls[n].className && uls[n].className === 'stream-tabs') {
        streamTab = uls[n];
        break;
    }
}

var makeItem = function(href, title, content) {
    var item = document.createElement('li');
    item.className = 'stream-link';
    var innerContent = '<a href="/#!/' + href + '" title="' + title + '"><b class="item-name">' + content + '</b></a>';
    item.innerHTML = innerContent;
    return item;
};

var fav;

var retweets_by_others = makeItem('retweets_by_others', 'retweets by others', 'Retweets by others');
var retweets_by_you = makeItem('retweets', 'retweets by you', 'Retweets by you');
var mytweets_retweeted = makeItem('retweeted_of_mine', 'my tweets retweeted', 'My tweets retweeted');

try{
    fav = document.getElementById('screen-name').children[0].innerHTML.replace(/^\s+/g,"").replace(/\s+$/g,"");
}catch(e){
    fav = null;
}
if (fav == null) {
    try {
        fav = document.getElementById('screen-name').innerHTML.replace(/^\s+/g, "").replace(/\s+$/g, "");
    } catch(e) {
        fav = null;
    }
}

var retweetList = document.createElement('ul');
retweetList.className = 'drop-down';
retweetList.setAttribute('style','width:136px !important;visibility:hidden;');
retweetList.innerHTML = '';
retweetList.appendChild(retweets_by_others);
retweetList.appendChild(retweets_by_you);
retweetList.appendChild(mytweets_retweeted);

if(fav){
    var myfavs = makeItem(fav + '/favorites', 'my favorites', 'My favorites');
    retweetList.appendChild(myfavs);
}

retweetItem.innerHTML = '<a href="#" title="Retweets" class="tab-text">Retweets<i></i></a>';
retweetItem.appendChild(retweetList);
retweetItem.className = 'stream-tab';
var rtt = retweetItem.children[0];

var toggleRetweets = function() {
    if (retweetItem.classList.contains('open')) {
        retweetItem.classList.remove('open');
        retweetList.style.visibility = 'hidden';
    } else {
        retweetList.style.visibility = 'visible';
        retweetItem.classList.add('open');
    }
};
var hideRetweets = function(){
    if (retweetItem.classList.contains('open')) {
        retweetItem.classList.remove('open');
        retweetList.style.visibility = 'hidden';
    }
};
var rttClickCallback = function(e){
    if(e.target == rtt || e.target == rtt.children[0]){
        toggleRetweets();
    }
};
var bodyClickCallback = function(e){
    if(e.target != rtt && e.target != rtt.children[0]){
        hideRetweets();
    }
};
rtt.addEventListener('click',rttClickCallback ,false);
//document.body.removeEventListener('click',bodyClickCallback ,false);
document.body.addEventListener('click',bodyClickCallback ,false);
streamTab.appendChild(retweetItem);