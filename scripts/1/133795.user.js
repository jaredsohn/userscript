// ==UserScript==
// @id             gnome_shell_extension_downloader
// @name           GnomeShellExtensionDownloader
// @version        1.2
// @namespace      http://userscripts.org/users/Harv
// @author         Harv
// @description    Directly download extensions from extensions.gnome.org.
// @updateURL      https://userscripts.org/scripts/source/133795.meta.js
// @include        https://extensions.gnome.org/extension/*
// @run-at         document-end
// ==/UserScript==

(function() {
    let extension = document.querySelector('.extension');
    let datasvm = extension.getAttribute('data-svm');
    //alert(extension.getAttribute('data-svm'));

    if(datasvm) {
        let obj = eval('('+ datasvm +')');
        if(obj) {
            var author = document.querySelector('.author');
            var down = document.createElement('a');
            down.setAttribute('class', 'ExtDown');
            down.innerHTML = 'Download';
            author.appendChild(down);

            var div = document.createElement('div');
            div.setAttribute('class', 'ExtDownDiv');
            var pklist = getpklist(obj, sort(obj));
            for(var l in pklist) {
                var a = document.createElement('a');
                a.innerHTML = 'gnome-shell  ' + pklist[l];
                a.href = 'https://extensions.gnome.org/review/download/' + l + '.shell-extension.zip';
                div.appendChild(a);
            }
            down.appendChild(div);

            var style = document.createElement('style');
            style.innerHTML = (<><![CDATA[
.ExtDown {
    position: relative;
    margin-left: 2px;
    padding-left: 3px;
    padding-right: 3px;
    color: rgb(32, 74, 135) !important;
    cursor: pointer;
}
.ExtDown:hover {
    background-color: rgb(127, 167, 212);
    color: rgb(255, 255, 255) !important;
    border-radius: 3px 3px 0 0;
}
.ExtDown .ExtDownDiv {
    display: none;

    position: absolute;
    top: 18px;
    left: 0px;
    width: auto;
    white-space: nowrap;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(195, 217, 255);
    border-radius: 0 3px 3px 3px;
}
.ExtDown:hover .ExtDownDiv {
    display: block;
}
.ExtDown .ExtDownDiv a {
    display: block;

    color: rgb(32, 74, 135);
    padding-left: 5px;
    padding-right: 5px;
}
            ]]></>).toString();
            document.getElementsByTagName('head')[0].appendChild(style);
        }
    }

    function sort(obj) {
        var index = [];
        for(var i in obj) {
            index.push(i);
        }

        return index.sort();
    }

    function getpklist(obj, index) {
        var a = new Object();
        for(var i = index.length; i > 0; i--) {
            a[obj[index[i-1]]['pk']] = (obj[index[i-1]]['pk'] in a) ? (a[obj[index[i-1]]['pk']] + '/' + index[i-1]) : index[i-1];
        }

        return a;
    }

})();
