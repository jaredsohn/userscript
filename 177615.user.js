// ==UserScript==
// @name			Digg Reader badge for Fluidapp
// @description	Displays the total number of unread items as a badge in the os x dock
// @author               Ben D'Herville
// ==/UserScript==
window.fluid.dockBadge = '';
setTimeout(updateDockBadge, 1000);
setTimeout(updateDockBadge, 3000);
setInterval(updateDockBadge, 5000);

function updateDockBadge() {
    var newBadge = '';

    var totalCount = 0;

    var nofiticationEl = document.getElementById('nav-notif-label');
    if (nofiticationEl) {
        var notificationText = '' + nofiticationEl.innerText;
        if (notificationText) {
            var regex = new RegExp('\\s*(\\d*) new item.*\\s*');
            var result = regex.exec(notificationText);
            if (result && result.length > 1) {
                totalCount = totalCount + new Number(result[1]);
            }
        }
    }

    var unreadCountEls = document.getElementsByClassName('dr-unread-count');

    var labels = ['All'];

    for (label in labels) {

        for (var i = 0; i < unreadCountEls.length; i++) {
            var unreadCountEl = unreadCountEls[i];

            var previousElement = unreadCountEl.previousElementSibling;
            while (previousElement) {
                if (previousElement.title == labels[label]) {
                    totalCount = totalCount + new Number(unreadCountEl.innerText);
                    break;
                }

                previousElement = previousElement.previousElementSibling;
            }
        }
    }

    if (totalCount > 0) {
        newBadge = '' + totalCount;
    }


    window.fluid.dockBadge = newBadge;
}