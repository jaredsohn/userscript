// ==UserScript==
// @name        HideTBPLComments
// @namespace   gfritzsche.userscripts
// @description Completely hide TBPL comments on bugzilla
// @include     https://bugzilla.mozilla.org/show_bug.cgi?*
// @version     2
// @grant       none
// @license     MPL
// ==/UserScript==


let showTbplComments = true;

let a = document.createElement('a');
a.id = 'showhide_tbplbot_comments';
a.innerHTML = 'Hide TinderboxPushlog Comments';
a.href = 'javascript:;';
a.onclick = 'return hideTbplComments(true)';

let li = document.createElement('li');
li.appendChild(a);

let list = document.getElementsByClassName('bz_collapse_expand_comments')[0];
list.appendChild(li);

a.addEventListener('click', function(event) {
    showTbplComments = !showTbplComments;
    document.getElementById('showhide_tbplbot_comments').innerHTML 
      = (showTbplComments ? 'Hide' : 'Show') + ' TinderboxPushlog Comments';
    
    let list = document.getElementsByClassName('email');
    for (let i=0; i<list.length; ++i) {
        if (list[i].href == 'mailto:tbplbot@gmail.com') {
            list[i].parentNode.parentNode.parentNode.parentNode.style.display 
              = showTbplComments ? 'block' : 'none';
        }
    }
});
