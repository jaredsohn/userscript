// ==UserScript==
// @name        ShowPasswords
// @namespace  http://www.heiselman.com/
// @description Shows passwords in form controls on the page
// @include     *
// ==/UserScript==

// Credit goes to http://www.whatsmypass.com/?p=26 for the idea
// So my site doesn't contain this script

(function() {
    var F,j,f,i;

    F = document.forms;
    for(j=0; j<F.length; ++j) {
        f = F[j];
        for (i=0; i<f.length; ++i) {
            if (f[i].type.toLowerCase() == "password")
                f[i].type = "text";
        }
    }    
})();