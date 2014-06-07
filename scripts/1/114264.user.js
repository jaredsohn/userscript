// ==UserScript==
// @name           Drag-scroll
// @namespace      internet
// @include        http://www.reddit.com/*
// @include        http://*stackoverflow.com/*
// @include        http://*stackexchange.com/*
// @include        http://*superuser.com/*
// @include        http://*askubuntu.com/*
// ==/UserScript==
var position, start, end, moved, info;
function show(el){
    var str = '';
    for(var i in el){
        //if(i != 'ctrlKey')continue;
        str += [i, el[i]].join(': ');
        str += '\n';
    }
    console.log(str);
}

function scrollTop() {
    return window.pageYOffset;
    // return filterResults(
        // window.pageYOffset ? window.pageYOffset : 0,
        // document.documentElement ? document.documentElement.scrollTop : 0,
        // document.body ? document.body.scrollTop : 0
    // );
}

function scrollLeft() {
    return window.pageXOffset;
    //return filterResults (
        // window.pageXOffset ? window.pageXOffset : 0,
        // document.documentElement ? document.documentElement.scrollLeft : 0,
        // document.body ? document.body.scrollLeft : 0
    //);
}

function filterResults(n_win, n_docel, n_body) {
    var n_result = n_win ? n_win : 0;
    if (n_docel && (!n_result || (n_result > n_docel)))
        n_result = n_docel;
    return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function mouseDown(e){
    if(e.ctrlKey && e.which === 1){
        document.addEventListener('mouseup', mouseUp, false);
        document.addEventListener('mousemove', mouseMove, false);
        position = {'left': e.pageX, 'top': e.pageY};
        start = {'top': scrollTop(), 'time': e.timeStamp};
        if(info && info.iid){
            clearInterval(info.iid);
            info = null;
        }
        //console.log(start);
        e.preventDefault();
        return false;
    }
}

function mouseUp(e){
    document.removeEventListener('mouseup', mouseUp);
    document.removeEventListener('mousemove', mouseMove);
    if(moved){
        end = {'top': scrollTop(), 'time': e.timeStamp || Date.now()};
        //console.log(end);
        var speed = Math.abs(end.top - start.top) / (end.time - start.time);
        if(speed > 0.1){
            scrollMore(speed);
        }
        moved = false;
        e.preventDefault();
        return false;
    }
}

function mouseMove(e){
    moved = true;
    //console.log(['scrollLeft', scrollLeft(), 'scrollTop', scrollTop(), 'e.pageY', e.pageY, 'position.top', position.top, 'e.pageX', e.pageX, 'position.left', position.left].join(' '));
    window.scrollTo(scrollLeft(), scrollTop() - e.pageY + position.top);
    position = {'left': e.pageX, 'top': e.pageY};
    e.preventDefault();
    return false;
}

function scrollMore(speed){
    function doScroll(){
        try{
            window.scrollTo(info.left, scrollTop() + parseInt(info.length / 10));
            info.runned++;
            if(info.runned == 10){
                if(Math.abs(info.length) <= 10){
                    clearInterval(info.iid);
                    info = null;
                    return;
                }
                info.length = parseInt(info.length / 2);
                info.runned = 0;
            }
            //console.log('runned');
        }
        catch(e){
            console.log(e);
        }
    }
    (function(){
        info = {'length': parseInt((end.top - start.top) * speed), 'iid': 0, 'left': scrollLeft(), 'runned': 0};
        info.iid = setInterval(function(){doScroll();}, 10);
        doScroll();
    })();
}

document.addEventListener('mousedown', mouseDown, false);