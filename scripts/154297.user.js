// ==UserScript==
// @name           Remove Ads on Tetris Friends
// @description    This script removes ads on www.tetrisfriends.com.
// @namespace      http://userscripts.org/users/173064
// @include        http://www.tetrisfriends.com/*
// @license        GNU General Public License v3.0
// @version        1.0.130828.1826
// @grant          none
// @noframes
// ==/UserScript==

try {
(function () {
    function selectNode(xpathExpression) {
        return document.evaluate(xpathExpression, document, null,
                XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    function removeElementById(elementId) {
        var
            element;
        element = document.getElementById(elementId);
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }

    function removeElementByClass(elementClass) {
        var
            element;
        element = selectNode("//div[@class='" + elementClass + "']");
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }

    function hideElementByClass(elementClass) {
        var
            element;
        element = selectNode("//div[@class='" + elementClass + "']");
        if (element) {
            element.style.visibility = "hidden";
        }
    }

    function main() {
        var
            elementIds = [
                "rail_left",
                "rail_left_incentive",
                "rail_right",
                "rail_right_incentive",
                "sponsored_options"
            ],
            elementClasses = [
                "friends_ad_container",
                "gallery_ad_container",
                "game_ad_container",
                "gamesPage_ad_container",
                "home_ad_container",
                "home_ad_left_rail",
                "home_ad_right_rail",
                "home_custom_ad_container",
                "messages_ad_container",
                "mission_ad_container",
                "news_ad_container",
                "profile_ad_container",
                "tetris_house_ad_container",
                "tetris_house_ad_container margintop_5px",
                "tips_ad_space"
            ],
            elementClassesHide = [
                "leaderboard_ad_container"
            ],
            i,
            node;
        for (i = 0; i < elementIds.length; i += 1) {
            removeElementById(elementIds[i]);
        }
        for (i = 0; i < elementClasses.length; i += 1) {
            removeElementByClass(elementClasses[i]);
        }
        for (i = 0; i < elementClassesHide.length; i += 1) {
            hideElementByClass(elementClassesHide[i]);
        }
        if (document.location.href.indexOf("/game.php") > -1) {
            setTimeout("gamePrerollComplete();", 1000);
        }
    }

    return function () {
        main();
    };
}())();
} catch (e) {
    alert("Error in 'Remove Ads on Tetris Friends':\n" +
            e.toString() + "\n" + e.stack);
}
