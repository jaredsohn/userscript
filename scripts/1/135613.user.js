// ==UserScript==
// @name       Encyclopedia Dramatica Enhancements
// @namespace  none
// @version    2012.07.07
// @description  Useful tweaks for Encyclopedia Dramatica
// @match      http://encyclopediadramatica.se/*
// @copyright  none
// ==/UserScript==

console.log('= ED Enhancements Started =');

console.log('== Surfing ==');
console.log('* Making images link to their full-sized file in a new tab instead of the metadata page');
var images = document.getElementsByClassName('image');
for (var i in images) {
        if (images[i].firstChild) {
            images[i].href = images[i].firstChild.src.replace(/thumb\/([0-9a-f]\/[0-9a-f]{2}\/[^\/]+)\/.+/,"$1");
            images[i].target = '_blank';
        }
}

console.log('* Anonymizing outbound links');
var externals = document.getElementsByClassName('external');
for (var i in externals) { if (externals[i].href) externals[i].href = 'http://anonym.to/?' + externals[i].href; }

var can_edit = document.getElementById('ca-edit');
if (can_edit) {
    console.log('== Editing ==');
    var wpTextbox1 = document.getElementById('wpTextbox1');
    if (wpTextbox1) {
        var wpTextbox1Insert = function(text) {
            var wpTextbox1Scroll = wpTextbox1.scrollTop;
            var wpTextbox1Cursor = wpTextbox1.selectionStart;
            wpTextbox1.value = wpTextbox1.value.substring(0,wpTextbox1Cursor) + text + wpTextbox1.value.substring(wpTextbox1Cursor,wpTextbox1.value.length);
            wpTextbox1Cursor += text.length;
            wpTextbox1.selectionStart = wpTextbox1Cursor;
            wpTextbox1.selectionEnd = wpTextbox1Cursor;
            wpTextbox1.focus();
            wpTextbox1.scrollTop = wpTextbox1Scroll;
            return false;
        };
        console.log('* Adding template shortcuts');
        var linkTemplateUsername = function() {
            var username = prompt(this.title+' Username');
            return wpTextbox1Insert(username ? '{{'+this.rel+'|'+username+'}}' : '');
        }
        var templateCategories = {
            'formatting-templates':'Formatting shortcuts',
            'link-templates':'Link to an external user'
        }
        var templates = {
            'formatting-templates' : {
                'clear' : Array('{{clear}}','force-break',function(){return wpTextbox1Insert("\n{{clear}}\n\n");}),
            },
            'link-templates' : {
                'dauser' : Array('DeviantArt','<img src="//images.encyclopediadramatica.se/7/7b/DA.gif"/>',linkTemplateUsername),
                'fb' : Array('Facebook','<img src="//images.encyclopediadramatica.se/b/b8/Fb-favicon.png"/>',linkTemplateUsername),
                'flickr' : Array('Flickr','<img src="//images.encyclopediadramatica.se/6/61/Flickr_favicon.png"/>',linkTemplateUsername),
                'ljuser' : Array('LiveJournal','<img src="//images.encyclopediadramatica.se/f/fe/Lj-favicon.png"/>',linkTemplateUsername),
                'tumblr' : Array('Tumblr','<img src="//images.encyclopediadramatica.se/a/ad/Tumblricon.png"/>',linkTemplateUsername),
                'twitter' : Array('Twitter','<img src="//images.encyclopediadramatica.se/8/83/Twitter-favicon.png"/>',linkTemplateUsername),
                'wikifur' : Array('WikiFur','<img src="//images.encyclopediadramatica.se/5/58/Wikifur-favicon.png"/>',linkTemplateUsername),
                'ytuser' : Array('YouTube','<img src="//images.encyclopediadramatica.se/9/9b/Youtube-favicon.png"/>',linkTemplateUsername),
            }
        }
        for (var templateCategory in templates) {
            console.log('  * '+templateCategories[templateCategory]);
            var div = document.createElement('div');
            div.id = templateCategory;
            div.appendChild(document.createTextNode(templateCategories[templateCategory]+': '));
            for (var template in templates[templateCategory]) {
                console.log('    * '+template);
                var a = document.createElement('a');
                a.href = '#';
                a.style.marginLeft = '.5em';
                a.rel = template;
                a.title = templates[templateCategory][template][0];
                a.innerHTML = templates[templateCategory][template][1];
                a.onclick = templates[templateCategory][template][2];
                div.appendChild(a);
            }
            wpTextbox1.parentElement.insertBefore(div,wpTextbox1);
        }
    }
    else {
        console.log('* Adding an edit link for the main section (section 0)');
        document.getElementById('firstHeading').innerHTML += '<span class="editsection">[<a href="'+(can_edit.firstChild.href+'&section=0')+'">edit</a>]</span>';
    }
}

console.log('= ED Enhancements Finished =');