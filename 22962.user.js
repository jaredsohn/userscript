// ==UserScript==
// @name           Flickr Next Page Prefetch
// @namespace      http://linekin.soup.io/
// @description    Prefetches the "Next" page on Flickr in an iframe so it loads faster. Based on "Flickr Photo Prefetch" on http://userscripts.org/scripts/show/6883
// @include        http://flickr.com/*
// @include        http://www.flickr.com/*
// ==/UserScript==


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
    var n_main = myif.contentDocument.getElementById('Main')
    if (!n_main) return;
    // GM_log('n_main found')
    var main = document.getElementById('Main') // TODO: check if 'Main' fully loaded?
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

function prefetch() {
    var links = search(document,"//a[@class='Next']")
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