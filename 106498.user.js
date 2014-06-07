// ==UserScript==
// @name           Video Grid
// @namespace      com.google.video
// @description    Add a link to show video results as a grid
// @include        http://www.google.*tbm=vid*
// ==/UserScript==
(function() {
    function gridify() {
        var ires = document.getElementById('ires');
        var rso  = document.getElementById('rso');

        var divs = document.getElementsByTagName('div');
        for (var i = 0; i < divs.length; ++i) {
            if (divs[i].className == 's') {
                var div   = divs[i];
                var table = div.getElementsByTagName('table')[0];
                var tbody = table.getElementsByTagName('tbody')[0];
                var tr    = tbody.getElementsByTagName('tr')[0];
                var td    = tr.getElementsByTagName('td')[0];
                var a     = td.getElementsByTagName('a')[0];
                var img   = a.getElementsByTagName('img')[0];

                a.innerHTML = '';
                a.appendChild(img);
                ires.appendChild(a);
            }
        }

        ires.removeChild(rso);
        ires.style.width = '1024px';
    }

    var link = document.createElement('a');
    link.innerHTML = 'View Grid :)';
    link.href = '#';
    link.style.position = 'fixed';
    link.style.top = '35px';
    link.style.right = '10px';
    link.addEventListener('click', gridify, false);
    document.body.appendChild(link);
})();
