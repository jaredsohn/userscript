// ==UserScript==
// @name           起点小说阅读器 qidian(cmfu)預抓下一頁_prefetch_qidian_page
// @namespace      http://jiichen/
// @include        http://*.qidian.com/*
// ==/UserScript==

// 起点小说阅读器 qidian(cmfu)預抓下一頁
// 修改自 Flickr Next Page Prefetch
// 預抓下一頁
// 關鍵 a[contains(.,'下一頁')]

function search(target,sel) {
   return target.evaluate(
    sel,
    target,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
}

function position(elmt){
  var x = 0;
  var y = 0;
              
  while(elmt != null){
    x += elmt.offsetLeft;
    y += elmt.offsetTop;
    elmt = elmt.offsetParent;
  }
                        		      
    return {'x':x,'y':y};
}

function scrollTo(elmt){
    var pos = position(elmt)
    //GM_log('x:'+pos.x+', y:'+pos.y)
    window.scrollTo(pos.x, pos.y);
}

var myif; var next; var nhref;

function clickNext(event) {
    //var n_main = myif.contentDocument.getElementById('Main')
    var mainDivId_1 = 'form1'
    
    var mainDivId = mainDivId_1;
    var n_main = myif.contentDocument.getElementById( mainDivId )
    if (!n_main) return;
    
    // GM_log('n_main found')
    var main = document.getElementById( mainDivId ) // TODO: check if 'main' fully loaded?
    
    if (!main) return;
    
    
    // GM_log('main found')
    main.innerHTML = n_main.innerHTML
    //main.parentNode.replaceChild(n_main,main)
    
    //GM_log(history.current)
    //history.current = nhref;
    scrollTo(main)

    // prefetch again   
    prefetch()    
      
    event.stopPropagation();
    if (event.cancelable && event.preventDefault)
    event.preventDefault();
}

function checkKey(event) { 
	
	//alert(event.keyCode)
	if (event.keyCode == 39) { clickNext(next) }		// right arrow
	if (event.keyCode == 78) { clickNext(next) }		// n
	if (event.keyCode == 96) { clickNext(next) }		// 0 in right area
	if (event.keyCode == 45) { clickNext(next) }		// Insert
	if (event.keyCode == 46) { clickNext(next) }		// Delete
	
}

function prefetch() {
    // var links = search(document,"//a[@class='Next']")
    //var links = search(document,"//a[contains(.,'下一章')]")
    var links = search(document,"//a[@id='NextLink']")
    
    
   	if (links.snapshotLength ==0) return;
    
   
    next = links.snapshotItem(0)

    nhref = next.getAttribute('href')
    if (myif) {myif.parentNode.removeChild(myif); myif=undefined}
    if (!myif) {
        myif = document.createElement('iframe')
        //myif.style.display='none'
        myif.style.visibility = 'hidden'
        myif.style.width='1px';
        myif.style.height='1px';
        
        /*
        myif.addEventListener('load',function(){
            //GM_log('iframe loaded')
            if (next) {
                next.style.color='#ff0084'
                next.addEventListener('click', clickNext ,true) 
            }
        },true) */        
        
        document.body.appendChild(myif)
        myif.contentWindow.addEventListener('DOMContentLoaded',function(){
            //GM_log('iframe content loaded')
            if (next) {
                next.style.color='#ff0084'
                next.addEventListener('click', clickNext ,true) 
                document.addEventListener('keydown', checkKey ,true) 

            }
        },false)
    }    
    
    myif.setAttribute('src', nhref)   
}

function onLoad() {   
    if (window != top) return  // avoid creating infinitely deep nested frames        
    
    prefetch()
}

window.addEventListener('load', onLoad, true)
