// ==UserScript==
// @name        Meemi Curtain
// @namespace   d857cd2c5ad3c152497802df7262c1579d1abbfe
// @description Cover some specific memes until the user clicks over them.
// @identifier  37d09663-fe48-5708-9280-ba78720c6379
// @copyright   (c) 2010 by Marco Trulla aka Ragnarøkkr
// @license     MIT License
// @version     0.1.00
// @include     http://meemi.com/*
// ==/UserScript==

(function() {
    var memesTextArr = [];
    memesTextArr.push(document.getElementsByClassName('t'));
    memesTextArr.push(document.getElementsByClassName('c'));

    function removeCurtain(elem) {
        elem.style.display = 'none';    
    }

    function makeCurtain(parent, text) {
        var el = document.createElement('div');
        var p = document.createElement('p');
        var a = document.createElement('a');
        
        el.className = 'mini_header';
        el.style.width = parent.offsetWidth + 'px';
        el.style.height = parent.offsetHeight + 'px';
        el.style.backgroundColor = '#ffff7f';
        el.style.zIndex = '99999';
        el.style.float = 'left';
        el.style.position = 'absolute';  

        p.style.textAlign = 'center';
        p.style.margin = 'auto';
        p.style.lineHeight = parent.offsetHeight + 'px';
        
        a.title = 'clicca qui per rimuovere la tendina';
        a.href = 'javascript:void(0);';
        a.addEventListener('click', function(){removeCurtain(el);}, true);
        a.innerHTML = text.replace(/eval\(/ig);
        
        p.appendChild(a);    
        el.appendChild(p);
        return el;
    }
        
    for (var i in memesTextArr) {
        var ptr = memesTextArr[i];
        for (var j in ptr) {
            if (typeof ptr[j].innerHTML === 'string') {
                if (ptr[j].innerHTML.match(/#\*.+\*#/i)) {
                    var msg = ptr[j].innerHTML.match(/#\*(.+)\*#/i)[1];
                    if (typeof ptr[j].parentElement === 'object') {               
                        ptr[j].parentElement.insertBefore(
                            makeCurtain(ptr[j].parentElement, msg),
                            ptr[j].parentElement.firstChild
                        );
                    }
                    else if (typeof ptr[j].parentNode === 'object') {
                        ptr[j].parentNode.insertBefore(
                            makeCurtain(ptr[j].parentNode, msg),
                            ptr[j].parentNode.firstChild
                        );
                    }
                    break;
                }
            }
        }
    }
}());
