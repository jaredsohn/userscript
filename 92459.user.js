// ==UserScript==
// @name           /mu/ + grooveshark
// @namespace      http://lucidchan.org
// @description    Adds a grooveshark playlist for the artist specified using the gsuser unofficial API which was created by James Hartig.
// @include        http://boards.4chan.org/mu/*
// @version        1.2.4
// ==/UserScript==



(function() {
    
    var input = document.createElement('input');
    input.setAttribute('name', 'grooveshark');
    input.setAttribute('size', '28');
    input.setAttribute('maxlength', '75');
    input.setAttribute('accesskey', 'g');
    input.setAttribute('type', 'text');

    var check = document.createElement('input');
    check.setAttribute('type', 'button');
    check.setAttribute('value', 'Check');
    check.setAttribute('align', 'left');
    check.addEventListener('click', getPreview, false);
    
    var insertTags = document.createElement('input');
    insertTags.setAttribute('type', 'button');
    insertTags.setAttribute('value', 'InsertTags');
    insertTags.setAttribute('align', 'left');
    insertTags.addEventListener('click', insert, false);
    
    var preview = document.evaluate(
        "//tbody",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);

    var textArea = document.evaluate(
        "//textarea[@class]",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
    
    var reply = document.evaluate(
        "//blockquote",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
    
    function insert() {
        
        var value = input.value;
        var text = textArea.snapshotItem(0);
        text.value += '[groove]' + value + '[/groove]';
    }
    function getPreview() {
        
        var groovePreview = document.getElementsByName('GroovePreview');
        
        if (preview.snapshotItem(0).childNodes.length > 1) {  //Check to see if in reply mode
            var postTable = preview.snapshotItem(0);
        } else {
            var postTable = preview.snapshotItem(1);
        }
        var value = input.value;
        var iframe = document.createElement('iframe');
                
        iframe.setAttribute('width', '410px');
        iframe.setAttribute('height', '410px');
        iframe.setAttribute('name', 'GroovePreview');
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('style', 'border:none;display:block;');
        iframe.setAttribute("src","http://gsuser.com/songsWidget/album/" + value + "/?format=js\\");
        
        var anchor = document.getElementById('anchor');
            
        if (groovePreview.length < 1) {
            anchor.appendChild(iframe);  //to the form tag
        } else {
            anchor.removeChild(groovePreview[0]);
            anchor.appendChild(iframe);
        }
        
    }
    function insertPreview(sibling) {
        if (sibling.snapshotItem(0) != null) {
            if (sibling.snapshotItem(0).childNodes.length > 1) {  //Check to see if in reply mode
                var postTable = sibling.snapshotItem(0);
            } else {
                var postTable = sibling.snapshotItem(1);
            }
        }
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td3 = document.createElement('td');
        td1.setAttribute('class', 'postblock');
        td1.setAttribute('align', 'left');
        td1.innerHTML = 'Grooveshark';
        var td2 = document.createElement('td');
        td2.setAttribute('id', 'anchor');
        td2.appendChild(input);
        td2.appendChild(check);
        td2.appendChild(insertTags)
        tr.appendChild(td3);
        tr.appendChild(td1);
        tr.appendChild(td2);
        postTable.appendChild(tr);
    }
    
    insertPreview(preview);
    
    function showHide(id) {
        return function() {
            var frame = document.getElementById(id);
            if (frame.style.display == 'none') {
                frame.style.display = 'block';
                frame.setAttribute("src","http://gsuser.com/songsWidget/album/" + frame.title + "/?format=js\\");
            } else {
                frame.style.display = 'none';
            }
        }
    }
    for (var i = 0; i < reply.snapshotLength; i++) {
        post = reply.snapshotItem(i).innerHTML;
        if ( post.search(/\[groove\]/) != -1) {
            var regex = /\[groove\](.*?)\[\/groove\]/;
            var artist = post.match(regex);
            reply.snapshotItem(i).innerHTML += '<br />';
            if (artist != null) {
                var artist = artist[1];
                reply.snapshotItem(i).innerHTML = reply.snapshotItem(i).innerHTML.replace(regex, 'Playlist: ' + artist);
                var iframe = document.createElement('iframe');
                var rand = Math.floor(Math.random()*10000)+1000;
                
                iframe.setAttribute('width', '410px');
                iframe.setAttribute('title', artist);
                iframe.setAttribute('height', '410px');
                iframe.setAttribute('id', artist + rand);
                iframe.setAttribute('name', artist + rand);
                iframe.setAttribute('scrolling', 'no');
                iframe.setAttribute('style', 'border:none;display:none');
                
                var a = document.createElement('a');
                a.setAttribute('href', "http://gsuser.com/songsWidget/album/" + artist + "/?format=js\\");
                a.setAttribute('target', (artist+rand));
                a.innerHTML += 'reload';
                
                iframe.appendChild(a);
                
                var id = artist+rand + "";
                var button = document.createElement('input');
                button.setAttribute('type', 'button');
                button.setAttribute('name', id);
                button.setAttribute('value', 'Hide/Show');
                button.addEventListener('click', showHide(id), false)
                
                reply.snapshotItem(i).appendChild(button);
                reply.snapshotItem(i).appendChild(a);
                reply.snapshotItem(i).appendChild(iframe);
            }
        }
    }
})();