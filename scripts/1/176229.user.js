// ==UserScript==
// @name plan.tpondemand.com links to srv5 and github.com
// @namespace http://taucraft.com
// @version 0.1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @description Looks for entity title '#\d+' and adds link to build status on srv5.
// @match http://plan.tpondemand.com/*
// @copyright 2013+, Victor Homyakov
// ==/UserScript==

(function () {
    //$('.ui-type-icon + .entity-id > .ui-link')
    //$('.ui-type-icon-bug + .entity-id > .ui-link')
    //$('.ui-type-icon-userstory + .entity-id > .ui-link')
    //<a class="ui-link" href="#page=bug/65614&amp;appConfig=eyJhY2lkIjoiNUE2ODU3NUVFN0M1MzA0QzM5QTA5MENERkU0MjVFQkUifQ==" data-target="new">#65614</a>

    //http://srv5/Home/Branch?id=feature%2Fbug65592
    var linkToBuild = 'http://srv5/Home/Branch?id=feature%2F';

    //https://github.com/TargetProcess/TP/tree/feature/bug66957
    var linkToGitHubTree = 'https://github.com/TargetProcess/TP/tree/';

    var linkStart = '<a style="color:#fff; text-decoration:none;" target="_blank" href="';

    function addLinks() {
        jQuery('.ui-type-icon + .entity-id > .ui-link').each(function(i, element) {
            var $element = jQuery(element), $type = $element.parent().prev('.ui-type-icon'), entityId = jQuery.trim($element.text()), entityNumber = (entityId.match(/^#(\d+)$/) || [])[1];
            //console.log(entityNumber, element, $type[0]);
            if (!entityNumber) {
                return;
            }

            var entityType = '';
            if ($type.hasClass('ui-type-icon-bug')) {
                entityType = 'bug';
            } else if ($type.hasClass('ui-type-icon-userstory')) {
                entityType = 'us';
            } else {
                return;
            }

            var links = [];

            if (!$element.hasClass('linkToBuild')) {
                $element.addClass('linkToBuild');
                links.push(linkStart + linkToBuild + entityType + entityNumber + '" title="Build status on SRV5">SRV5</a>');
            }

            if (!$element.hasClass('linkToGitHub')) {
                $element.addClass('linkToGitHub');
                var branchName = 'feature/' + entityType + entityNumber;
                links.push(linkStart + linkToGitHubTree + branchName + '" title="View branch ' + branchName + ' on GitHub">GitHub</a>');
                /*if (branchName !== 'develop') {
                    links.push(linkStart + linkToGitHubCompare + branchName.replace('/', ';') + '" title="Compare and pull request on GitHub">Compare</a>');
                }*/
            }

            if (links.length) {
                links = $('<span class="ui-type-icon">' + links.join('&#160;') + '</span>');
                $type.before(links);
            }
        });
    }

    setInterval(addLinks, 5000);
})();
