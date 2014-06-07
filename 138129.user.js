// ==UserScript==
// @name         Fix Blackboard
// @namespace    http://twelve-60.com
// @version      0.1
// @description  Fixes everything.
// @match        https://blackboard.newcastle.edu.au/*
// @copyright    2012+, Twelve-60
// @require      http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

jQuery("#topTabActive, .appTabs .active a, .appTabs .active a:hover, .appTabs .active a:focus").css("background-image", "none");
jQuery("#topTab, .appTabs a").css("background-image", "none");

jQuery(function () {
    var module = jQuery(unsafeWindow.document.getElementById("module:_797_1"));
    if (module.length) {
        var container = module.find("ul.courseListing");
        var items = container.children("li");
        var pattern = /(.*)\(S([12]) (\d{4}) ?(.*)?\)/;
        items = items.sort(function (a, b) {
            
            var matchesA = jQuery(a).text().match(pattern);
            var matchesB = jQuery(b).text().match(pattern);
            
            if (matchesA && matchesB) {
                var nameA = matchesA[1];
                var semesterA = matchesA[2];
                var yearA = matchesA[3];
                var locationA = matchesA[4];
                
                var nameB = matchesB[1];
                var semesterB = matchesB[2];
                var yearB = matchesB[3];
                var locationB = matchesB[4];
                
                value = (yearA > yearB
                    ? -1
                    : (yearA < yearB
                        ? 1
                        : (semesterA > semesterB
                            ? -1
                            : (semesterA < semesterB
                                ? 1
                                : (nameA < nameB
                                    ? -1
                                    : (nameA > nameB
                                        ? 1
                                        : 0
                                    )
                                )
                            )
                        )
                    )
                );
                
                return value;
            }
            return 0;
            
        });
        items.each(function (i, item) {
            
            jQuery(item).appendTo(container);
            
        });
    }
});