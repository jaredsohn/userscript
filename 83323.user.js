// ==UserScript==
// @name           POD
// @namespace      C3isCool
// @include        http://*.astroempires.com/board.aspx?folder=*
// ==/UserScript==

var images = document.evaluate("//img[@src[contains(.,'.jpg')]]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0, n = images.snapshotLength; i < n; i++) {
    var src = images.snapshotItem(i).src;

    var index = src.match(/\d+\.jpg/)
    if (index) {
        index = index[0].match(/\d+/);      
        console.log(index)  
        var click = document.createElement('img');
        click.id = "click" + i;
        click.src='http://hamovhotov.com/picturegallery/thumbs/672-XXX_Wallpaper__1_.jpg' 
        click.height='50'
        click.length = '50';
        click.title = index;
        console.log(click.index);
        click.name = src;
        images.snapshotItem(i).parentNode.insertBefore(click, images.snapshotItem(i).nextSibling);
        click.addEventListener('click', expand, true);
    }
}

function expand() {
    src = this.name
    var padze = this.title.length;
    var gallery = document.createElement('div');
    console.log(this.title);

    for (var x = +this.title +1, n = x + 11; x < n; x++) {
        gallery.innerHTML += "<img src='" + src.replace(/\d+\.jpg/, pad(x, padze) + ".jpg>");
    }
    console.log(gallery.innerHTML);
    this.title = +this.title + 11;
    this.parentNode.appendChild(gallery);
    this.parentNode.lastChild.appendChild(this);
}


function pad(num, digits) {
    num = "" + num;
    while (num.length < digits) {
        num = "0" + num;
    }
    return num
}