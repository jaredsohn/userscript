// ==UserScript==
// @name srv5 links to github.com and plan.tpondemand.com
// @namespace http://taucraft.com
// @version 0.1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @description Looks for branch titles with 'feature/\w+\d+' and adds link to github branch. Based on http://userscripts.org/scripts/review/176131
// @match http://srv5/*
// @copyright 2013+, Victor Homyakov
// ==/UserScript==

(function () {
    //<div class="branchNameBig">feature/bug66957</div>
    //<div class="branchName"><a href="/Home/Branch?id=feature%2Fbug66957">feature/bug66957</a></div>

    //https://github.com/TargetProcess/TP/tree/feature/bug66957
    //https://github.com/TargetProcess/TP/compare/feature;bug66957
    var linkToGitHubTree = 'https://github.com/TargetProcess/TP/tree/';
    var linkToGitHubCompare = 'https://github.com/TargetProcess/TP/compare/';

    //http://plan.tpondemand.com/entity/66957
    var linkToPlan = 'http://plan.tpondemand.com/entity/';

    var addLinks = function() {
        jQuery('.branchName,.branchNameBig').each(function(i, element) {
            var $element = jQuery(element), branchName = jQuery.trim($element.text());
            if (!branchName) {
                return;
            }

            var entityNumber = (branchName.match(/^.+\/\w+?(\d+)$/) || [])[1];
            //console.log(branchName, entityNumber, element);

            var links = [],
                linkStart = '<a' + ($element.hasClass('branchNameBig') ? ' class="forceBuild"' : ' class="buildPart ok" style="text-decoration:none;"') + ' target="_blank" href="';

            if (!$element.hasClass('linkToGitHub')) {
                $element.addClass('linkToGitHub');
                //http://github.global.ssl.fastly.net/images/modules/logos_page/GitHub-Mark.png
                //https://a248.e.akamai.net/assets.github.com/images/icons/emoji/octocat.png
                links.push(linkStart + linkToGitHubTree + branchName + '" title="View branch ' + branchName + ' on GitHub">GitHub</a>');
                if (branchName !== 'develop') {
                    links.push(linkStart + linkToGitHubCompare + branchName.replace('/', ';') + '" title="Compare and pull request on GitHub">Compare</a>');
                }
            }

            if (entityNumber && !$element.hasClass('linkToPlan')) {
                $element.addClass('linkToPlan');
                links.push(linkStart + linkToPlan + entityNumber + '" title="View entity #' + entityNumber + '">Plan</a>');
            }

            if (links.length) {
                if ($element.hasClass('branchNameBig')) {
                    $element.after(links.join(''));
                } else {
                    links = '<div style="background-color:#000;">' + links.join('&#160;') + '</div>';
                    $element.parent().append(links);
                }
            }
        });
    }

    //setInterval(addLinks, 5000);
    addLinks();
})();
