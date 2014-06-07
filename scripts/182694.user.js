// ==UserScript==
// @name            4chan AllImages
// @version         0.3
// @namespace       http://userscripts.org/scripts/show/182694
// @description     all images in a single new tab
// @include         *://boards.4chan.org/*
// @match           *://boards.4chan.org/*
// @grant           none
// @updateURL      https://userscripts.org/scripts/source/182694.meta.js
// @downloadURL    https://userscripts.org/scripts/source/182694.user.js
// ==/UserScript==
//
// --------------------------------------------------------------------
//

window.addEventListener("load", function(e) {
    add_button();
}, false);

function add_button() {

    var pic_button = document.getElementById('pic_button');
    if (pic_button === null) {

        pic_button = document.createElement('pic_button');
        pic_button.innerHTML += '<a id="pic_button" href="javascript:;" style="float:right;font-size:10px;text-decoration:none;">[ Open Pics ]</a>';

        var chanx_board = document.getElementById('board-list');
        if (chanx_board !== null) {
            chanx_board.appendChild(pic_button);
        } else {
            document.body.insertBefore(pic_button, document.body.firstChild);
        }

        add_button_listener();

    }

}

function add_button_listener(){

  var button = document.getElementById("pic_button");
  button.addEventListener('click',show_images,true);

}

function show_images(){

    var pic = document.links;
    var nWindow = window.open();

    var j = 0;
    for( var i=0, pics; pics=pic[i]; i++){
        console.log(pics);
        if(pics.href.indexOf("src")!=-1 && j%2){
            nWindow.document.write('<center>' + '<img src="' + pics + '" style="max-width: 80%;">' + '</center>' + '</br>');
        }
        j++;
    }
    var head = nWindow.document.getElementsByTagName('head').item(0);
    head.appendChild(create(
        'style', {
            'id'   : 'stf',
            'type' : 'text/css',
            'media': 'all',
            '#text': '#thread-watcher,#pic_button {display:none;}'
        }
    ));
    nWindow.document.close();

}

function create(tag, data) {

    var node = document.createElement(tag);
    if(typeof data !== 'undefined') {
        for(var i in data){
            if(data.hasOwnProperty(i)) {
                if(i === '#text')       { node.appendChild(document.createTextNode(data[i])); }
                else if(/^::/.test(i))  { node.appendChild(data[i]); }
                else if(i === '.html')  { node.innerHTML = data[i]; }
                else                    { node.setAttribute(i, data[i]); }
            }
        }
    }
    return node;

}