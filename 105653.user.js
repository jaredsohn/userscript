// ==UserScript==
// @name           4chan Image Filter
// @namespace      bleh
// @description    Adds a button next to images on 4chan to filter them by md5.  Will also filter their replies.
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// @version        1.3
// @delay          2
// ==/UserScript==

var container = document.querySelector('form[name="delform"]'),
    filterImageClass = 'filter-image',
    storageKey = 'imageHashes',
    filtered = getObj(storageKey) || [],
    postQuotes = {},
    filteredPosts = [];

function processPost(post){
    var image = getImageFromPost(post);
    postQuotes[post.id.substring(2)] = getQuotedPostIds(post);

    if (isReplyToFiltered(post) || (image && isImageFiltered(image))) {
        hidePost(post);
    } else {
        addImageFilterButton(post);
    }
}

function isReplyToFiltered(post){
    quotes =  postQuotes[post.id.substring(2)], i = 0;

    for (; i < filteredPosts.length; i++) {
        if (quotes && quotes.indexOf(filteredPosts[i].id.substring(2)) >= 0) {
            hidePost(post); 
        }
    }
}

function addImageFilterButton(post){
    var fileInfo = post.querySelector('.fileInfo');

    if (fileInfo) {
        var span = document.createElement('span');
        var a = document.createElement('a');

        a.href = '#';
        a.innerHTML = '[Filter]';
        a.className = filterImageClass;
        span.appendChild(a);
        span.innerHTML += ' ';

        fileInfo.insertBefore(span, fileInfo.childNodes[0]);
    }
}

function getImageFromPost(post){
    var fileThumb = post.querySelector('.fileThumb');
    return fileThumb ? fileThumb.querySelector('img') : false;
}

function isImageFiltered(image){
    var md5 = image.getAttribute('data-md5');
    return (filtered.indexOf(md5) >= 0);
}

function filterImage(image){ 
    var md5 = image.getAttribute('data-md5');

    if (filtered.indexOf(md5) < 0) {
        filtered.push(md5);
        setObj(storageKey, filtered);
    }
}

function hidePost(post) {
    if (post.style.display != 'none') {
        var id = post.id.substring(2);
        post.style.display = 'none';
        filteredPosts.push(post);
        filterCount.update();
    }
}

function hideReplies(post){
    var id = post.id.substring(2), reply;

    for(replyId in postQuotes){
        if(postQuotes[replyId] && postQuotes[replyId].indexOf(id) >= 0){
            if (reply = container.querySelector('#pc' + replyId)){
                hidePost(reply);
                hideReplies(reply);
            }
        }
    }
}

function getQuotedPostIds(post){
    var blockquote = post.querySelector('blockquote'),
        match, ids = [];

    [].forEach.call(blockquote.querySelectorAll('.quotelink'), function(el){
        ids.push((el.getAttribute('href').split('#p')[1]));        
    });

    return ids;
}   

//mimics jQuery.parents() poorly
function parents(el, fn){
    while (el.nodeType == 1){
        if (fn.call(el)) return el;
        el = el.parentNode;
    }
    return null;
}

var config = function(){
    var navbot = document.querySelector('#navbotr');

    var a = document.createElement('a');
    a.href = '#';
    a.innerHTML = 'Image Filter';
    a.id = 'show-image-filter-config';

    navbot.insertBefore(document.createTextNode(']'), navbot.childNodes[0]);
    navbot.insertBefore(a, navbot.childNodes[0]);
    navbot.insertBefore(document.createTextNode('['), navbot.childNodes[0]);

    var config = document.createElement('div');
    config.id = 'image-filter-config';
    config.innerHTML = '<form><textarea style="width:250px; height:100px;"></textarea><input type="submit" value="save" /></form>';
    config.style.display = 'none';
    config.style.float = "right";

    navbot.insertBefore(config, navbot.childNodes[0])

    config.querySelector('input[type="submit"]').onclick =  function(event){

    }
}();

var filterCount = function(){
    var div = document.createElement('div');
    div.id = 'image-filter-count-container';
    div.innerHTML = '<span id="image-filter-count">' + filteredPosts.length + '</span> posts have been filtered';
    document.body.appendChild(div);

    return {
        update: function(){
            document.querySelector('#image-filter-count').innerHTML = filteredPosts.length;
        }
    }
}();

function setObj(key, obj) {
    return localStorage.setItem(key, JSON.stringify(obj))
}

function getObj(key) {
    return JSON.parse(localStorage.getItem(key))
}

container.addEventListener('DOMNodeInserted', function(event){
    var node = event.target;
    if (node.className == 'postContainer replyContainer') {
        processPost(node);
    }
});

container.addEventListener('click', function(e){
    var node = e.target, post = null, image = null;

    if (node.className == filterImageClass) {
        e.preventDefault();
        e.stopPropagation();

        if ((post = parents(node, function(){ return this.className == 'postContainer replyContainer' })) &&
                (image = getImageFromPost(post))) {
            filterImage(image);
            hidePost(post);
            hideReplies(post);
        }
    }
});

document.querySelector('#show-image-filter-config').addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();

    var config = document.querySelector('#image-filter-config');

    if (config.style.display == 'none') {
        config.style.display = '';
        config.querySelector('textarea').value = filtered.join('\n');
    } else {
        config.style.display = 'none';
    }
});

document.querySelector('#image-filter-config input[type="submit"]').addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();

    var md5s = e.target.parentNode.querySelector('textarea').value.split('\n');
    setObj(storageKey, md5s);
    document.querySelector('#image-filter-config').style.display = 'none';

    alert('settings saved');
});

[].forEach.call(container.querySelectorAll('.replyContainer'), function(el){
    processPost(el);
});