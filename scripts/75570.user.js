// ==UserScript==
// @name           Enhance Facebook story icons
// @namespace      story_icon
// @description    Enhance story icons (Likes and relationships) on Facebook
// @author         http://www.facebook.com/doudou
// @include        http://*.facebook.com*    
// @exclude        http://upload.facebook.com/*
// @exclude        http://www.facebook.com/common/blank.html
// @exclude        http://*onnect.facebook.com/*
// @exclude        http://*acebook.com/connect*
// @exclude        http://www.facebook.com/plugins/*
// @exclude        http://*static*.facebook.com*
// @exclude        http://*channel*.facebook.com*
// ==/UserScript==

document.addEventListener('DOMNodeInserted', DOMNodeInserted, true);

var DOMNodeInsertedTimeout;
function DOMNodeInserted() {
    clearTimeout(DOMNodeInsertedTimeout);
    DOMNodeInsertedTimeout = setTimeout(checkPage, 100);
}

function checkPage() {
    d = document.getElementsByClassName('uiUnifiedStory');
    for (l in d) {
        elem = d[l];
        if (eval('('+elem.getAttribute('data-ft')+')').sty == 47) {   
            i = elem.getElementsByTagName('i')[0];
            i.style.backgroundPosition = '0 -702px';
            i.style.backgroundImage = "url('http://b.static.ak.fbcdn.net/rsrc.php/z2B5S/hash/696ouey0.png')";     
        }
        else if (eval('('+elem.getAttribute('data-ft')+')').sty == 283) {         
            i = elem.getElementsByTagName('i')[0];
            i.style.backgroundPosition = '2px -1623px';
            i.style.height = '13px';
            i.style.backgroundImage = "url('http://b.static.ak.fbcdn.net/rsrc.php/z2B5S/hash/696ouey0.png')";
        }
        else if (eval('('+elem.getAttribute('data-ft')+')').sty == 3) {         
            story = elem.getElementsByClassName('UIRecentActivity_Body')[0].innerHTML.replace(/<(.+)>/, '');
            single = false;
            /* Français */            
            if (/est célibataire\./.test(story)) single = true;
            if (/à .\s?célibataire\s?./.test(story)) single = true;
            if (/est plus .\s?en couple\s?./.test(story)) single = true;


            /* English */
            if (/is single/.test(story)) single = true;
            if (/. to .single\../.test(story)) single = true;
            if (/is no longer listed as .in a relationship\../.test(story)) single = true;

            if (single) {
                img = elem.getElementsByTagName('img')[0];
                if (img) {
                    if (/UIImageBlock clearfix/.test(img.parentNode.className)) {
                        div = img.nextSibling;
                        parent = img.parentNode;
                        parent.innerHTML = '<i class="UIImageBlock_Image UIImageBlock_ICON_Image img spritemap_7kw7oi sx_75c631" style="background-position: 0pt -239px; background-image: url(&quot;http://b.static.ak.fbcdn.net/rsrc.php/z2B5S/hash/696ouey0.png&quot;);"></i>';
                        parent.appendChild(div);
                    }
                }
            }
        }
    }
}
