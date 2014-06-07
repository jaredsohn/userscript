// ==UserScript==
// @id             www.reddit.com-708d7719-4b06-c744-8f60-46ab3a3be84b@wp
// @name           f7u12 & AdviceAnimals opener
// @version        1.5
// @namespace      meh
// @author         
// @description    Open All image Links In Tabs
// @include        http://www.reddit.com/r/fffffffuuuuuuuuuuuu/
// @include        https://www.reddit.com/r/fffffffuuuuuuuuuuuu/
// @include        http://www.reddit.com/r/fffffffuuuuuuuuuuuu
// @include        https://www.reddit.com/r/fffffffuuuuuuuuuuuu
// @include        http://www.reddit.com/r/fffffffuuuuuuuuuuuu/?count*
// @include        https://www.reddit.com/r/fffffffuuuuuuuuuuuu/?count*
// @include        http://www.reddit.com/r/fffffffuuuuuuuuuuuu/top/?sort*
// @include        https://www.reddit.com/r/fffffffuuuuuuuuuuuu/top/?sort*
// @include        http://www.reddit.com/r/AdviceAnimals/
// @include        https://www.reddit.com/r/AdviceAnimals/
// @include        http://www.reddit.com/r/AdviceAnimals
// @include        https://www.reddit.com/r/AdviceAnimals
// @include        http://www.reddit.com/r/AdviceAnimals/?count*
// @include        https://www.reddit.com/r/AdviceAnimals/?count*
// @include        http://www.reddit.com/r/AdviceAnimals/top/?sort*
// @include        https://www.reddit.com/r/AdviceAnimals/top/?sort*
// @updateURL		http://userscripts.org/scripts/source/140396.user.js
// @run-at         document-end
// ==/UserScript==

var newB = document.createElement('button');
newB.textContent = 'Open All imgur Links In Tabs';
newB.setAttribute('style','    height: 30px;'+
    'left: 255px;'+
    'margin-bottom: -30px;'+
   ' position: relative;'+
    'top: 15px;'+
    'cursor: pointer;'+
    'z-index: 3;'
);

document.body.insertBefore(newB,document.querySelector('div.content'));

newB.addEventListener('mouseup',function(){
[].forEach.call(document.querySelectorAll('#siteTable .entry a.title'),function(item){
    GM_openInTab(item.href);
});
},false);