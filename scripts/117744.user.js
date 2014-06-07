// ==UserScript==
// @name           Retweeted
// @namespace      http://sofish.de
// @version        0.4
// @description    recovery the timeline of your friends' retweeted content.
// @include        http://twitter.com/
// @include        https://twitter.com/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @copyright      @sofish, http://sofish.de
// ==/UserScript==

var doc = document,
    trigger = doc.querySelectorAll('.stream-tabs li')[2],
    triggerChild = trigger.querySelector('a'),
    ddArr = doc.createElement('i'),
    ddUl = doc.createElement('ul'),
    ddMenu = '<li class="stream-link"><a href="/#!/activity" title="Activity"><span class="list-icon"></span><b class="item-name">Friends Activity</b></a></li><li class="stream-link"><a href="/#!/retweeted_of_mine" title="My Tweets, Retweeted"><span class="list-icon"></span><b class="item-name">My Tweets, Retweeted</b></a></li><li class="stream-link"><a href="/#!/retweets_by_others" title="Retweets By Others"><span class="list-icon"></span><b class="item-name">Retweets By Others</b></a></li>',
    targetItems,
    closeDD = function(b){
    
        ddUl.style.display = 'none';
        trigger.classList.remove('open');
        trigger.classList.remove('button-active');
        
        if(b)trigger.classList.add('active');
        
        
    };

if(window.Node && Node.prototype && !Node.prototype.contains){
	Node.prototype.contains = function (arg) {
		return !!(this.compareDocumentPosition(arg) & 16)
	}
};

ddUl.className = 'drop-down';
ddUl.setAttribute('style', 'left:0;top:31px;display:none;');
ddUl.innerHTML = ddMenu;

triggerChild.appendChild(ddArr);
triggerChild.setAttribute('href', '#');
trigger.appendChild(ddUl);
trigger.classList.add('dropdown-link');

targetItems = Array.prototype.slice.call(ddUl.querySelectorAll('a'));

doc.body.addEventListener('click', function(e){  
    e.target != triggerChild && closeDD();
}, false)

triggerChild.addEventListener('click', function(){   

    triggerChild.setAttribute('href', '#');
    trigger.classList.add('open');
    trigger.classList.add('button-active');
    ddUl.style.display = 'block'; 

}, false);

targetItems.forEach(function(i, index){
    i.addEventListener('click', function(){
        closeDD(true);
    });
})