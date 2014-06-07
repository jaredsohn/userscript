// ==UserScript==
// @name           POD Functions Sort
// @namespace      http://odyniec.net/
// @description    Allows you to alphabetically sort functions/methods in the table of contents section of Perl module documentation at CPAN and MetaCPAN
// @include        http://search.cpan.org/*.pm
// @include        http*://metacpan.org/module/*
// ==/UserScript==

(function () {
    var sortIconData = 'data:image/png;base64,' +
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAB3RJTUUH1wkdESsLkMq' +
        'GogAAAAlwSFlzAAAewQAAHsEBw2lUUwAAAARnQU1BAACxjwv8YQUAAAGJSURBVHjaY2' +
        'BAA+Xl5fsZSABMyJzS0tK2X79+2efk5GzBpylkygNdrAb8+fNHD4hv/PjxwzM8PNwQl' +
        'wFmKlzHMQzIzMxM+/nz5yag5vCvX7/++/bt2zRcBghwMnNjGADU7P7+/XtBoAE9X758' +
        'OQKkzYDAF5sB3379Qw2DuLi4BqCNr1hZWZcBDUoBhkPCx48f/wMNmorNgL9//8PZLNH' +
        'R0bpAJwd9//799rZt2x6DBA0MDGyA/MNAVzCIi4sXvHz5cgKyAb//MVAGmjc9hzuBiR' +
        'wDXn/88xzuBRABTDwHgNHHAPQ7KDAZgP5nAHoBjHfv3u2AbsCP30hhgCQ+YfLkyRtAD' +
        'D8/vwNAzTJKSkrHsbmAk4VREqfzgJrXu7q6vi8uLm7HpSZj3kPsYQDSDLTZQU9Pb0Zv' +
        'b28lNs2eDTeucbExMURPe3AVxQvEaAaBe9c/B//7z7Dow9tfcXidDWQHGBoaLsVmiHr' +
        '4aU0YmxFEADUfAFL6b9682QaTePDggTQoRoAp1IEBDwAAHITRwaTokN0AAAAASUVORK' +
        '5CYII=';

    function sortItems(ul) {
        var items = [];
        
        for (var i = 0; i < ul.childNodes.length; i++) {
            if (typeof ul.childNodes[i].tagName == 'undefined' ||
                    ul.childNodes[i].tagName.toLowerCase() != 'li')
                continue;
                
            items.push({ name: ul.childNodes[i].firstChild.text,
                item: ul.childNodes[i] });
        }

        items.sort(function (a, b) {
            return a.name > b.name ? 1 : -1;
        });

        for (var i = 0; i < items.length; i++) {
            ul.appendChild(items[i].item);
        }
    }

    function getItemNames(ul) {
        var names = [];
        
        for (var i = 0; i < ul.childNodes.length; i++) {
            if (typeof ul.childNodes[i].tagName == 'undefined' ||
                    ul.childNodes[i].tagName.toLowerCase() != 'li')
                continue;
                
            names.push(ul.childNodes[i].firstChild.text);
        }

        return names;
    }

    // Find all <ul>s in the POD table of contents
    // For CPAN: .toc ul
    // For MetaCPAN: .pod ul#index ul
    var uls = document.querySelectorAll('.toc ul, .pod ul#index ul');

    for (var i = 0; i < uls.length; i++) {
        var count = 0,          // Total number of list items
            fnCount = 0,        // Number of items that look like functions
            spaceCount = 0;     // Number of items with spaces

        for (var j = 0; j < uls[i].childNodes.length; j++) {
            var elem = uls[i].childNodes[j];

            // Check if this is an <li> element
            if (typeof elem.tagName == 'undefined' ||
                    elem.tagName.toLowerCase() != 'li')
                continue;
            
            if (typeof elem.firstChild.tagName != 'undefined' &&
                    elem.firstChild.tagName.toLowerCase() == 'a')
            {
                var text = elem.firstChild.firstChild.nodeValue;
                count++;

                // Does this look like a function name?
                if (text.match(/\S_\S|^[a-zA-Z0-9_]+$/))
                    fnCount++;
                // Are there any spaces?
                else if (text.match(/\s/))
                    spaceCount++;
            }
        }

        // If more than 90% of all items look like functions, and less than 10%
        // have spaces in names, assume this is a list of functions.
        if (count > 5 && fnCount/count > 0.9 && spaceCount/count < 0.1) {
            var names = getItemNames(uls[i]);

            // Check if the list is not already sorted
            if (names.join(' ') != names.sort().join(' ')) {
                // Create a sort icon
                var img = document.createElement('img');
                img.src = sortIconData;
                img.title = 'Sort alphabetically';
                img.style.marginLeft = '0.6em';
                img.style.cursor = 'pointer';
                img.onclick = function () { sortItems(this.nextSibling); };

                uls[i].parentNode.insertBefore(img, uls[i]);
            }
        }
    }
})();
