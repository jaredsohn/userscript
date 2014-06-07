// ==UserScript==
// @name        SDMB Ignore List Plus
// @namespace   SDMB
// @description Advanced SDMB ignore list
// @include     http://boards.straightdope.com/*
// @version     1
// @grant       GM_addStyle
// ==/UserScript==

        //To add people to the ignore list, add their username to the list below.
        //Separate usernames with commas, and be sure to wrap them in quotes.
        var ignore_list = new Array("Poster1", "Poster2", "Poster3");


        //Delete posts by users on ignore list
        var node_list = document.getElementsByTagName('a');
        for (var i = 0; i < node_list.length; i++) {
            var node = node_list[i];
            var nodeClass = node.getAttribute('class');
            var nodePoster = node.innerHTML;
            try {
                if (nodeClass == 'bigusername' & ignore_list.indexOf(nodePoster) > -1) {
                    var postNode = findPostNode(node);
                    postNode.innerHTML = '';
                };
            }
            catch (err) {

            }
        }


        //Delete posts that quote users on ignore list
        var node_list = document.getElementsByTagName('div');
        for (var i = 0; i < node_list.length; i++) {
            var node = node_list[i];
            try {
                //Find quoted posts
                for (var j = 0; j < ignore_list.length; j++) {
                    var checkString = 'Originally Posted by <strong>';
                    checkString += ignore_list[j];
                    checkString += '</strong>';
                    if (node.innerHTML.indexOf(checkString) != -1) {
                        var postNode = findPostNode(node);
                        postNode.innerHTML = '';
                    };
                }
            }
            catch (err) {

            }

        }


        //Delete threads by users on ignore list
        var node_list = document.getElementsByTagName('span');
        for (var i = 0; i < node_list.length; i++) {
            var node = node_list[i];
            try {
                for (var j = 0; j < ignore_list.length; j++) {                 
                    if (node.parentNode.getAttribute('class') == 'smallfont' & node.innerHTML == ignore_list[j]) {
                        var threadNode = findThreadNode(node);
                        threadNode.innerHTML = '';
                    };
                }
            }
            catch (err) {

            }

        }

        //Function to find parent post node
        function findPostNode(el) {
            try {
                while (el.tagName != 'TABLE' || el.getAttribute('class') != 'tborder') {
                    el = el.parentNode;
                };
            }
            catch (err) {

            }
            return el;
        }

        //Function to find parent thread node
        function findThreadNode(el) {
            try {
                while (el.tagName != 'TD' || el.getAttribute('class') != 'alt1') {
                    el = el.parentNode;
                };
            }
            catch (err) {

            }
            return el.parentNode;
        }