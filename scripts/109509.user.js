// ==UserScript==
// @namespace http://www.staugler.net/
// @name The Tumblr Quite Big theme post controls.
// @description This script will put previous/next links for both posts and pages at the top left of the page in a fixed location. If you hit the boundary in any direction, it'll change pages for you too. This script detects the theme by looking for a link to http://www.tumblr.com/theme/9601, the theme's web site. Someone I know uses this theme and I wanted a better way of browsing his photos: http://andrewti.tumblr.com.
// @include http://*.tumblr.com/*
// @run-at document-end
// ==/UserScript==

// Check for the expected theme link.
if (
    document.evaluate(
        'count(//a[@href="http://www.tumblr.com/theme/9601"])',
        document,
        null,
        XPathResult.NUMBER_TYPE,
        null
    ).numberValue < 1
){
    return;
}

var
    posts = document.evaluate('//li[@class="post"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    , num_posts = posts.snapshotLength
    , pids = []
    , post_ii = null
;

function previous_page(){
    go('previous');
}

function next_page(){
    go('next');
}

function previous_post(){
    if (post_ii == null || post_ii == 0){
        go('previous');
    }
    else{
        post_ii--;
        scroll(post_ii);
    }
}

function next_post(){
    if (post_ii == null){
        post_ii = 0;
        scroll(post_ii);
    }
    else if(post_ii == num_posts - 1){
        go('next');
    }
    else{
        post_ii++;
        scroll(post_ii);
    }
}

function scroll(ii){
    var
        id = pids[ii]
        , el = document.getElementById(id).wrappedJSObject
        , y = find_element_offset_top(el)
    ;
    window.scrollTo(0, y);
}

function find_element_offset_top(el){
    var
        ot = 0
        , obj = el
    ;
    do {
        ot += obj.offsetTop;
    }
    while (obj = obj.offsetParent);

    return ot;
}

function mkcontrols(){
    var
        control_box = document.createElement('span')
        , page_previous = document.createElement('a')
        , page_next = document.createElement('a')
        , post_previous = document.createElement('a')
        , post_next = document.createElement('a')
    ;

    function style_control(el){
        el.style.fontSize = '50px';
        el.style.fontWeight = 'bold';
        el.style.cursor = 'pointer';
    }

    function style_box(el){
        el.className = 'Generated-by-the-I-like-Andrew-Ti-Greasemonkey-script';
        el.style.position = 'fixed';
        el.style.top = '0';
        el.style.left = '0';
        el.style.zIndex = '100';
        el.style.margin = '10px';
    }

    page_previous.addEventListener('click', previous_page, false);
    page_previous.innerHTML = '&lArr;';
    style_control(page_previous);

    page_next.addEventListener('click', next_page, false);
    page_next.innerHTML = '&rArr;';
    style_control(page_next);

    post_previous.addEventListener('click', previous_post, false);
    post_previous.innerHTML = '&larr;';
    style_control(post_previous);

    post_next.addEventListener('click', next_post, false);
    post_next.innerHTML = '&rarr;';
    style_control(post_next);

    control_box.appendChild(page_previous);
    control_box.appendChild(post_previous);
    control_box.appendChild(post_next);
    control_box.appendChild(page_next);
    style_box(control_box);

    return control_box;
}

function go(next_or_previous){
    var
        // The page says next and previous correctly, but the containing divs
        // are weird. Back is probably 'older' but the page number is higher.
        // Blogs have always had a funky relationship with pagingation.
        dir = next_or_previous == 'next' ? 'back' : 'forward'
        , nodes = document.evaluate('//div[@id="pagination"]//p[@class="'+dir+'"]/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
        , el = nodes.snapshotItem(0)
    ;
    document.location = el.href;
}


for (var ii = 0; ii < num_posts; ii++){
    pids.push(posts.snapshotItem(ii).id);
}

document.onKeypress = function(e){
    var
        h = 104
        , j = 106
        , k = 107
        , l = 108
        , key = e ? e.which : window.event.keyCode
    ;

    if (key == h){
        previous_page();
    }
    else if (key == j){
        next_post();
    }
    else if (key == k){
        previous_post();
    }
    else if (key == l){
        next_page();
    }
};

document.body.insertBefore(mkcontrols(), document.body.children[0]);
