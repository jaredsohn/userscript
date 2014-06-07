// ==UserScript==
// @name           Unfuddle Improver
// @namespace      http://mtrack.phpjack.com/lab/wiki.php/unfuddle
// @description    Adds features to unfuddle to make it easier to use
// @include        http://*.unfuddle.com/*
// @copyright      Richard Thomas
// @version        0.0.1
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// ==/UserScript==


user    =   'richard';
pass    =   'foolrun';
url     =   'http://phpjack.unfuddle.com';


path=window.location.pathname;
pathArray = path.split('/');
project = false;
tab = false;
id = false;
if (pathArray[2] != undefined) {
    project = pathArray[2];
}
if (pathArray[3] != undefined) {
    tab = pathArray[3];
}
if (pathArray[4] != undefined) {
    id = pathArray[4];
}
function addMenu() {
    var main, menu;
    main = document.getElementById('main');
    if (main) {
        menudiv = document.createElement('div');
        menudiv.style.width = '15%';
        menudiv.style.float = 'left';
        menudiv.style.position = 'relative';
        main.parentNode.insertBefore(menudiv, main);
        main.style.width = '85%';
        main.style.float = 'right';
        GM_xmlhttpRequest({
            method: "GET",
            url: url + '/api/v1/projects/' + project + '/notebooks.json',
            onload: function(xhr) {
                var data = eval(xhr.responseText);
                menu = '<ul>';
                for (x in data) {
                    menu = menu + '<li><a href="' + url + '/projects/' + project + '/notebooks/' + data[x].id + '">' + data[x].title + '</a></li>';
                }
                menu = menu + '</ul>';
                menudiv.innerHTML = menu;
            }  
        });
    }

}
switch (tab) {
    case 'notebooks':
        addMenu();
    break;
}
