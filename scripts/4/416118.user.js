// ==UserScript==
// @name       2ch.hk politach counter
// @namespace  http://example.org/
// @version    0.1
// @description  Counts politach users
// @match      http://2ch.hk/po/res/*
// @copyright  2012+, anony-mouse
// ==/UserScript==

function getUserId(node) {
    return node.textContent;
}

function getUserFlag(node) {
    return node.lastChild.title;
}

function getUserAlignment(node) {
    var images = node.getElementsByTagName('img');
    if (images.length != 2)
        return "None";
    else
        return images[0].title;
}

function getAlignString(arr) {
    return Object.keys(arr).join('; ');
}


var nodes = document.getElementsByClassName("postername");
var data = {};
for (var i = 0; i < nodes.length; ++i) {
    var id = getUserId(nodes[i]);
    var align = getUserAlignment(nodes[i]);
    var flag = getUserFlag(nodes[i]);
    //console.log("item:" + id + ', ' + align + ', ' + flag);
    var key = id + ' (' + flag + ')';
    if (!(key in data))
    {
        data[key] = {'id':key, 'counter':0, 'aligns':{}};
    }
  	data[key].counter++;
    data[key].aligns[align]++;;
}

var sorted = {};
for (var key in data) {
	var cnt = data[key].counter;
    if (!(cnt in sorted))
        sorted[cnt] = new Array();
    sorted[cnt].push(data[key]);
}

var div = document.createElement('div');
document.body.appendChild(div);
for (var cnt in sorted) {
    var level = document.createElement('ul');
    div.appendChild(level);
    for (var i in sorted[cnt]) {
        var one = sorted[cnt][i];
	    var child = document.createElement('li');
    	child.textContent = one.id + ' --- count:' + one.counter + ', align:['+ getAlignString(one.aligns) + ']';
    	level.appendChild(child);
    }
}

console.log("counting /po/-posts");