// ==UserScript==
// @name          YH Keyboard navs
// @namespace     http://jacobd.com
// @description	  add some keyboard navs
// @include       http://www.yayhooray.com*
// @include       http://yayhooray.com*
// @exclude       http://www.yayhooray.com/thread/*
// ==/UserScript==

threads = [];
current = 0;
pointer = '';

function make_pointer(){
    dv = document.createElement('DIV');
    dv.innerHTML = '<img src="data:image/jpeg;base64,R0lGODlhDgAOAPcIABkZGRISEgkJCR4eHhgYGBoaGv///wAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAgALAAAAAAOAA4AAAhMABEIHEgQwb+CBA0c/HcQocB/CiE6RKAwgICICCP+EyCAgEOGIA8aQBgSYsOHJVM+NMCypcuQEWMyjMlypk2TIGXiVLjSpc+GKVMGBAA7" width="14" height="14" alt="fbm ftw!" />';
    dv.style.fontSize='30px';
    dv.style.position='absolute';
    dv.style.left='227px';
    dv.style.top='-100px';
    dv.id = 'pointer';
    document.body.appendChild(dv);
}

function move_pointer(id){

    y = document.getElementById(id).offsetTop;
    document.getElementById('pointer').style.top = parseInt(y+6)+'px';
    ih = window.innerHeight; // browser height
    yo = window.pageYOffset; // how much is hidden
    if(y > ih+yo) window.scrollTo(window.pageXOffset,y-20);
    else if(y < yo) window.scrollTo(window.pageXOffset,y-200);
}

function set_focus(index){
    if(threads.length>index && index >= 0){
        current = index;
        move_pointer(threads[index]);
    }
}
function do_url(index){
    if(threads.length>index && index >= 0){
        ob = document.getElementById(threads[index]);
        if(typeof(ob.childNodes[1].childNodes[1].childNodes[0].href)!='undefined'){
            window.open(ob.childNodes[1].childNodes[1].childNodes[0].href,'_self');
        }
    }
}
function favorite(index){
    if(threads.length>index && index >= 0){
        id = threads[index].replace(/[^0-9]*/,'');
        unsafeWindow.fave_toggle(id);
    }
}
function do_key(e){
    k = (e.keyCode);
    newthread=current;
    switch(k){
        case 74: // j
            if(current+1<threads.length) newthread++;
            break;
        case 75: // k
            if(current-1>=0) newthread--;
            break;
        case 13: // enter
            do_url(current);
            break;
        case 83: // s
            favorite(current);
            break;
        }
    if(newthread!=current)
        set_focus(newthread);
}

( function () {
    if(typeof(document.getElementById('threadlisting')) !='undefined'){
        container = document.getElementById('threadlisting');
        for(child in container.childNodes){
            if(typeof(container.childNodes[child].id) != 'undefined' && container.childNodes[child].id.match(/thread[0-9]+/))
                threads.push(container.childNodes[child].id);
        }
        make_pointer();
        set_focus(0);
        unsafeWindow.onkeydown = do_key;
    }  
  })()