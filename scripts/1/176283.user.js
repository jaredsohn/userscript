// ==UserScript==
// @name github.com links to plan.tpondemand.com and srv5
// @namespace http://taucraft.com
// @version 0.1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @description Looks for branch name 'feature/\D+\d+' and adds links to branch build status on srv5 and to entity view on plan.tpondemand.com.
// @match https://github.com/TargetProcess/TP/tree/feature/*
// @copyright 2013+, Victor Homyakov
// ==/UserScript==

(function () {
    //http://srv5/Home/Branch?id=feature%2Fbug65592
    var linkToBuild = 'http://srv5/Home/Branch?id=';

    //http://plan.tpondemand.com/entity/66957
    var linkToPlan = 'http://plan.tpondemand.com/entity/';

    var linkStart = '<a class="pull-request-link" target="_blank" href="';

    function addLinks() {
        //<span class="minibutton select-menu-button js-menu-target" data-hotkey="w" data-master-branch="develop" data-ref="feature/bug51615">
        jQuery('span.select-menu-button[data-ref*="feature/"]').each(function(i, element) {
            var $element = jQuery(element), branchName = $element.data('ref'), entityNumber = branchName.replace(/^feature\/\D+/, '');
            //console.log('link', branchName, entityNumber, element);

            var links = [];
            links.push(linkStart + linkToBuild + branchName.replace('/', '%2F') + '" title="View build status on SRV5">SRV5</a> ');
            links.push(linkStart + linkToPlan + entityNumber + '" title="View entity #' + entityNumber + '">Plan</a> ');

            $element.parent().before(links.join(''));
        });
    }

    //setInterval(addLinks, 5000);
    addLinks();
})();
