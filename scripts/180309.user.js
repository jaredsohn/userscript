// ==UserScript==
// @name        MusicBrainz Unicode Release Editor
// @namespace   http://userscripts.org
// @description A script to add copyable unicode characters to the bottom of the release editor.
// @include     http://musicbrainz.org/release/*
// @include     http://*.musicbrainz.org/release/*
// @include     https://musicbrainz.org/release/*
// @include     https://*.musicbrainz.org/release/*
// @version     2
// @grant       none
// ==/UserScript==

function click_select(element){
    if (document.body.createTextRange) { // ms
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) { // moz, opera, webkit
        var selection = window.getSelection();            
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

element = document.getElementsByClassName("details")[0];

var unicode_elements = ['\u00AB','\u00BB','\u2018','\u2019','\u201A','\u201B','\u201C','\u201D','\u201E','\u201F','\u2026'];

var row = document.createElement("div");
row.style.fontSize = '1em';
row.style.fontFamily = 'Arial';
row.style.cssFloat = 'left';
row.style.padding = '5px 10px 5px 7px';
row.style.fontWeight = 'bold';
row.style.lineHeight = '17px';
row.style.margin = '0px 7px 0px 0px';

for(var k = 0; k != unicode_elements.length; k++){
    var box = document.createElement("div");
    box.style.width = '2em';
    box.style.textAlign = 'center';
    box.style.cssFloat = 'left';
    box.style.border = '1px solid rgb(170, 170, 170)';

    var text = document.createTextNode(unicode_elements[k]);

    box.appendChild(text);
    row.appendChild(box);
}

var mediums = document.getElementsByClassName('advanced-disc');
for(var i = 0; i != mediums.length; i++){
    for(var j = 0; j != mediums[i].childNodes.length; j++){
        if(mediums[i].childNodes[j].className === 'buttons'){
            element = mediums[i].childNodes[j].appendChild(row.cloneNode(true));
            element.onclick = function(e){
                click_select(e.target);
            }
        }
    }
}
