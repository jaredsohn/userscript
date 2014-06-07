// ==UserScript==
// @name          Add Overdue Icon
// @namespace     http://code.chimericdream.com/gmscripts/
// @description   
// @version       0.7b 2009-06-19
// @include       http://www.rememberthemilk.com/*
// @include       https://www.rememberthemilk.com/*
// ==/UserScript==

var overdueIntervalId = '';
function checkOverdueTasks() {
    // taskoverdue
    var trNodes = document.getElementsByTagName('tr');
    for (var i = 0; i < trNodes.length; i++) {
        if ((
                trNodes[i].childNodes[3] &&
                trNodes[i].childNodes[3].childNodes[1]
            )
        ) {
            if (trNodes[i].childNodes[3].childNodes[1].className == 'xtd_task_name taskoverdue') {
                trNodes[i].childNodes[4].className = 'xtd xtd_date t_overdue';
            } else {
                trNodes[i].childNodes[4].className = 'xtd xtd_date';
            }
        }
    }
    if (overdueIntervalId == '') {
        setOverdueInterval();
    }
}

function setOverdueInterval() {
    overdueIntervalId = setInterval(checkOverdueTasks, 5000);
}

function addOverdueStyle() {
    css = "tr.xtr td.xtd_date {";
    css += "    padding-left: 19px !important;";
    css += "}";
    css += "tr.xtr td.t_overdue {";
    css += "    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJPSURBVDjLpZPLS5RhFMYfv9QJlelTQZwRb2OKlKuINuHGLlBEBEOLxAu46oL0F0QQFdWizUCrWnjBaDHgThCMoiKkhUONTqmjmDp2GZ0UnWbmfc/ztrC+GbM2dXbv4ZzfeQ7vefKMMfifyP89IbevNNCYdkN2kawkCZKfSPZTOGTf6Y/m1uflKlC3LvsNTWArr9BT2LAf+W73dn5jHclIBFZyfYWU3or7T4K7AJmbl/yG7EtX1BQXNTVCYgtgbAEAYHlqYHlrsTEVQWr63RZFuqsfDAcdQPrGRR/JF5nKGm9xUxMyr0YBAEXXHgIANq/3ADQobD2J9fAkNiMTMSFb9z8ambMAQER3JC1XttkYGGZXoyZEGyTHRuBuPgBTUu7VSnUAgAUAWutOV2MjZGkehgYUA6O5A0AlkAyRnotiX3MLlFKduYCqAtuGXpyH0XQmOj+TIURt51OzURTYZdBKV2UBSsOIcRp/TVTT4ewK6idECAihtUKOArWcjq/B8tQ6UkUR31+OYXP4sTOdisivrkMyHodWejlXwcC38Fvs8dY5xaIId89VlJy7ACpCNCFCuOp8+BJ6A631gANQSg1mVmOxxGQYRW2nHMha4B5WA3chsv22T5/B13AIicWZmNZ6cMchTXUe81Okzz54pLi0uQWp+TmkZqMwxsBV74Or3od4OISPr0e3SHa3PX0f3HXKofNH/UIG9pZ5PeUth+CyS2EMkEqs4fPEOBJLsyske48/+xD8oxcAYPzs4QaS7RR2kbLTTOTQieczfzfTv8QPldGvTGoF6/8AAAAASUVORK5CYII=') !important;";
    css += "    background-position: left 8px !important;";
    css += "    background-repeat: no-repeat !important;";
    css += "}";

    if (typeof GM_addStyle == 'function') {
        GM_addStyle(css);
    } else if ((head = document.getElementsByTagName('head')[0])) {
        var style = document.createElement('style');
        style.setAttribute('type', 'text/css');
	style.innerHTML = css;
        head.appendChild(style);
    }
}

window.addEventListener('load', addOverdueStyle, false);
window.addEventListener('load', checkOverdueTasks, false);