// ==UserScript==
// @name           dd24 no second-level domains
// @namespace      http://haykranen.nl
// @description    Add a button to the dd24 advanced search page to exclude all second level domain names
// @include        http://dd24.net/?page=domains_register
// ==/UserScript==

var search = document.querySelectorAll('#search > p')[2],
    checkboxes = document.querySelectorAll("input[type=checkbox]"),
    onlyFld = document.createElement('button');

onlyFld.innerHTML = 'only first level domain names';
onlyFld.addEventListener('click', function(e) {
    e.preventDefault();
    [].slice.call(checkboxes).forEach(function(checkbox) {
        checkbox.checked = checkbox.value.indexOf(".") === -1;
    });
}, false);

search.appendChild( onlyFld );