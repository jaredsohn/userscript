// ==UserScript==
// @name Trac Timeline Color Modifier
// @namespace http://k11i.biz/
// @include *
// ==/UserScript==

(
    function() {
        var changeTicketsBackgroundColor = function(ticketName, color) {
            var i = null, j = null;

            var elements = document.getElementsByClassName(ticketName);
            var elem = null;
            var children = null;
            var child = null;
            
            for (i = 0; i < elements.length; i++) {
                elem = elements[i];
                if (elem.tagName.toLowerCase() !== "dt") {
                    continue;
                }

                elem.style.backgroundColor = color;
            }
        };

        changeTicketsBackgroundColor('newticket', "#FAAFBA");
        changeTicketsBackgroundColor('closedticket', "#B0E0E6");
        changeTicketsBackgroundColor('editedticket', "#F5DEB3");
    }
)();
