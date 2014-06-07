// ==UserScript==
// @name          add hint to password fields
// @namespace     http://tinkerbell.habrahabr.ru
// @description	  password hint
// @include       *
// ==/UserScript==
    
  
window.addEventListener("load", function(e) {
    
    var tr;
    var timeout = 1000;
    var hint_css = 'display: none; padding: 5px; position: absolute; top: 5px; left: 5px; background-color: white; color: black; border: 1px solid gray; font-family: Verdana, Arial, sans-serif; font-size: x-small;';
    
    var res = document.evaluate("//input[@type='password']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i<res.snapshotLength; i++) {
        var input = res.snapshotItem(i);
        var id = input.getAttribute('id');

        var s1 = document.createElement('span', '');
        s1.setAttribute('style', 'position: relative;');

        var s2 = document.createElement('span', '');

        var hint_id = 'd17ee262ebcf7b1ff0e132a0fa6ff55_' + Math.random();
        s2.setAttribute('id', hint_id);
        input.setAttribute('hint_id', hint_id);
        s2.setAttribute('style', hint_css);

        var input2 = input.cloneNode(true);
        s1.appendChild(s2);
        s1.appendChild(input2);

        input.parentNode.insertBefore(s1, input);
        input.parentNode.removeChild(input);

        input2.addEventListener("keypress", function(event) {
            t = document.getElementById(this.getAttribute('hint_id'));
            k = event.which;
            c = String.fromCharCode(k)
            if (k > 37 && !event.ctrlKey) {
                clearTimeout(tr);
                t.style.display = 'block';
                t.innerHTML = c;
                tr = setTimeout(function(){ t.innerHTML=''; t.style.display = 'none'; }, timeout);
            } else {
                clearTimeout(tr);
                t.style.display = 'none';
            }
        }, false);
    }
}, false);