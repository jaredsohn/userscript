// ==UserScript==
// @name           TorrentLeech Automatic Scroller
// @version        1.0
// @namespace      http://www.torrentleech.org
// @description    Automatically loads the next page when scrolling the bottom of a torrent list on TorrentLeech.
// @include        http://www.torrentleech.org/torrents/browse
// @include        http://www.torrentleech.org/torrents/browse/*
// ==/UserScript==

var loaderGif = "data:image/gif;base64,R0lGODlhgAAPAPIAAAIMDoWSkh4pKigzNGJvb4WSkgAAAAAAACH%2BGkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAgAAPAAAD5wiyC%2F6sPRfFpPGqfKv2HTeBowiZGLORq1lJqfuW7Gud9YzLud3zQNVOGCO2jDZaEHZk%2BnRFJ7R5i1apSuQ0OZT%2BnleuNetdhrfob1kLXrvPariZLGfPuz66Hr8f8%2F9%2BgVh4YoOChYhpd4eKdgwDkJEDE5KRlJWTD5iZDpuXlZ%2BSoZaamKOQp5wAm56loK6isKSdprKotqqttK%2B7sb2zq6y8wcO6xL7HwMbLtb%2B3zrnNycKp1bjW0NjT0cXSzMLK3uLd5Mjf5uPo5eDa5%2BHrz9vt6e%2FqosO%2FGvjJ%2Bsj5F%2FsC%2BuMHcCCoBAAh%2BQQACgABACwAAAAAgAAPAAAD%2Fwi0C%2F4ixgeloM5erDHonOWBFFlJoxiiTFtqWwa%2FJhx%2F86nKdc7vuJ6mxaABbUaUTvljBo%2B%2BpxO5nFQFxMY1aW12pV%2Bq9yYGk6NlW5bAPQuh7yl6Hg%2FTLeu2fssf7%2F19Zn9meYFpd3J1bnCMiY0RhYCSgoaIdoqDhxoFnJ0FFAOhogOgo6GlpqijqqKspw%2Bmrw6xpLCxrrWzsZ6duL62qcCrwq3EsgC0v7rBy8PNorycysi3xrnUzNjO2sXPx8nW07TRn%2BHm3tfg6OLV6%2Bfc37vR7Nnq8Ont9%2FTb9v3yvPu66Xvnr16%2BgvwO3gKIIdszDw65Qdz2sCFFiRYFVmQFIAEBACH5BAAKAAIALAAAAACAAA8AAAP%2FCLQL%2Fqw9J2qd1AoM9MYeF4KaWJKWmaJXxEyulI3zWa%2F39Xh6%2FvkT3q%2FDC%2FJiBFjMSCM2hUybUwrdFa3Pqw%2BpdEVxU3AViKVqwz30cKzmQpZl8ZlNn9uzeLPH7eCrv2l1eXKDgXd6Gn5%2BgoiEjYaFa4eOFopwZJh%2FcZCPkpGAnhoFo6QFE6WkEwOrrAOqrauvsLKttKy2sQ%2BwuQ67rrq7uAOoo6fEwsjAs8q1zLfOvAC%2Byb3B0MPHD8Sm19TS1tXL4c3jz%2BXR093X28ao3unnv%2FHv4N%2Fi9uT45vqr7NrZ89QFHMhPXkF69%2BAV9OeA4UGBDwkqnFiPYsJg7jBktMXhD165jvk%2BYvCoD%2BQ%2BkRwTAAAh%2BQQACgADACwAAAAAgAAPAAAD%2Fwi0C%2F6sPRfJdCLnC%2FS%2BnsCFo1dq5zeRoFlJ1Du91hOq3b3qNo%2F5OdZPGDT1QrSZDLIcGp2o47MYheJuImmVer0lmRVlWNslYndm4Jmctba5gm9sPI%2Bgp2v3fZuH78t4Xk0Kg3J%2BbH9vfYtqjWlIhZF0h3qIlpWYlJpYhp2DjI%2BBoXyOoqYaBamqBROrqq2urA8DtLUDE7a1uLm3s7y7ucC2wrq%2Bwca2sbIOyrCuxLTQvQ680wDV0tnIxdS%2F27TND%2BHMsdrdx%2BfD39bY6%2BbX3um14wD09O3y0e77%2Bezx8OgAqutnr5w4g%2F3e4RPIjaG%2BhPwc%2BstV8NlBixAzSlT4bxqhx46%2FMF5MxUGkPA4BT15IyRDlwG0uG55MAAAh%2BQQACgAEACwAAAAAgAAPAAAD%2Fwi0C%2F6sPRfJpPECwbnu3gUKH1h2ZziNKVlJWDW9FvSuI%2FnkusPjrF0OaBIGfTna7GaTNTPGIvK4GUZRV1WV%2BssKlE%2FG0hmDTqVbdPeMZWvX6XacAy6LwzAF092b9%2BGAVnxEcjx1emSIZop3g16Eb4J%2BkH%2BShnuMeYeHgVyWn56hakmYm6WYnaOihaCqrh0FsbIFE7Oytba0D7m6DgO%2FwAMTwcDDxMIPx8i%2Bx8bEzsHQwLy4ttWz17fJzdvP3dHfxeG%2F0uTjywDK1Lu52bHuvenczN704Pbi%2BOb66MrlA%2BscBAQwcKC%2Fc%2F8SIlzI71%2FBduysRcTGUF49i%2Fcw5tO4jytjv3keH0oUCJHkSI8KG1Y8qLIlypMm312ASZCiNA0X8eHMqPNCTo07iyUAACH5BAAKAAUALAAAAACAAA8AAAP%2FCLQL%2Fqw9F8mk8ap8hffaB3ZiWJKfmaJgJWHV5FqQK9uPuDr6yPeTniAIzBV%2FutktVmPCOE8GUTc9Ia0AYXWXPXaTuOhr4yRDzVIjVY3VsrnuK7ynbJ7rYlp%2B6%2Fu2vXF%2Bc2tyHnhoY4eKYYJ9gY%2BAkYSNAotllneMkJObf5ySIphpe3ajiHqUfENvjqCDniIFsrMFE7Sztre1D7q7Dr0TA8LDA8HEwsbHycTLw83ID8fCwLy6ubfXtNm40dLPxd3K4czjzuXQDtID1L%2FW1djv2vHc6d7n4PXi%2BeT75v3oANSxAzCwoLt28P7hC2hP4beH974ZTEjwYEWKA9VBdBixLSNHhRPlIRR5kWTGhgz1peS30l9LgBojUhzpa56GmSVr9tOgcueFni15styZAAAh%2BQQACgAGACwAAAAAgAAPAAAD%2Fwi0C%2F6sPRfJpPGqfKsWIPiFwhia4kWWKrl5UGXFMFa%2FnJ0Da%2Br0rF9vAiQOH0DZTMeYKJ0y6O2JPApXRmxVe3VtSVSmRLzENWm7MM%2B65ra93dNXHgep71H0mSzdFec%2Bb3SCgX91AnhTeXx6Y2aOhoRBkllwlICIi49liWmaapGhbKJuSZ%2BniqmeN6SWrYOvIAWztAUTtbS3uLYPu7wOvrq4EwPFxgPEx8XJyszHzsbQxcG9u8K117nVw9vYD8rL3%2BDSyOLN5s%2FoxtTA1t3a7dzx3vPwAODlDvjk%2FOrh%2BuDYARBI0F29WdkQ%2Bst3b9zCfgDPRTxWUN5AgxctVqTXUDNix3QToz0cGXIaxo32UCo8%2BOujyJIM95F0%2BY8mMov1NODMuPKdTo4hNXgMemGoS6HPEgAAIfkEAAoABwAsAAAAAIAADwAAA%2F8ItAv%2BrD0XyaTxqnyr9pcgitpIhmaZouMGYq%2FLwbPMTJVE34%2FZ9j7BJCgE%2BobBnAWSwzWZMaUz%2BnQQkUfjyhrEmqTQGnins5XH5iU3u94Crtpfe4SuV9NT8R0Nn5%2F8RYBedHuFVId6iDyCcX9vXY2Bjz52imeGiZmLk259nHKfjkSVmpeWanhhm56skIyABbGyBROzsrW2tA%2B5ug68uLbAsxMDxcYDxMfFycrMx87Gv7u5wrfTwdfD2da%2B1A%2FKy9%2Fg0OEO4MjiytLd2Oza7twA6%2FLe8LHk6Obj6c%2F8xvjzAtaj147gO4Px5p3Dx9BfOQDnBBaUeJBiwoELHeaDuE8uXzONFu9tE2mvF0KSJ00q7Mjxo8d%2BL%2F9pRKihILyaB29esEnzgkt%2FGn7GDPosAQAh%2BQQACgAIACwAAAAAgAAPAAAD%2Fwi0C%2F6sPRfJpPGqfKv2HTcJJKmV5oUKJ7qBGPyKMzNVUkzjFoSPK9YjKHQQgSve7eeTKZs7ps4GpRqDSNcQu01Kazlwbxp%2BksfipezY1V5X2ZI5XS1%2F5%2Fj7l%2F12A%2Fh%2FQXlOeoSGUYdWgXBtJXEpfXKFiJSKg5V2a1yRkIt%2BRJeWk6KJmZhogKmbniUFrq8FE7CvsrOxD7a3Drm1s72wv7QPA8TFAxPGxcjJx8PMvLi2wa7TugDQu9LRvtvAzsnL4N%2FG4cbY19rZ3Ore7MLu1N3v6OsAzM0O9%2BXK48Xn%2F%2BnotRM4D2C9c%2Fr6Edu3UOEAgwMhFgwoMR48awnzMWOIzyfeM4ogD4aMOHJivYwexWlUmZJcPXcaXhKMORDmBZkyWa5suE8DuAQAIfkEAAoACQAsAAAAAIAADwAAA%2F8ItAv%2BrD0XyaTxqnyr9h03gZNgmtqJXqqwka8YM2NlQXYN2ze254%2FWyiF0BYU8nSyJ%2BzmXQB8UViwJrS2mlNacerlbSbg3E5fJ1WMLq9KeleB3N%2B6uR%2BXEq1rFPtmfdHd%2FX2aDcWl5a3t%2Bgo2AhY6EZIZmiACWRZSTkYGPm55wlXqJfIsmBaipBROqqaytqw%2BwsQ6zr623qrmusrATA8DBA7%2FCwMTFtr24yrrMvLW%2Bzqi709K0AMkOxcYP28Pd29nY0dDL5c3nz%2BPm6%2Bjt6uLex8LzweL35O%2FV6fv61%2Fjs4m2rx01buHwA3SWEh7BhwHzywBUjOGBhP4v%2FHCrUyJAbXUSDEyXSY5dOA8l3Jt2VvHCypUoAIetpmJgAACH5BAAKAAoALAAAAACAAA8AAAP%2FCLQL%2Fqw9F8mk8ap8q%2FYdN4Gj%2BAgoqqVqJWHkFrsW5Jbzbee8yaaTH4qGMxF3Rh0s2WMUnUioQygICo9LqYzJ1WK3XiX4Na5Nhdbfdy1mN8nuLlxMTbPi4be5%2FJzr%2B3tfdSdXbYZ%2FUX5ygYeLdkCEao15jomMiFmKlFqDZz8FoKEFE6KhpKWjD6ipDqunpa%2BisaaqqLOgEwO6uwO5vLqutbDCssS0rbbGuMqsAMHIw9DFDr%2B6vr%2FPzsnSx9rR3tPg3dnk2%2BLL1NXXvOXf7eHv4%2Bbx6OfN1b0P%2BPTN%2FLf98wK6ExgO37pd%2Fpj9W6iwIbd6CdP9OmjtGzcNFsVhDHfxDELGjxw1Xpg4kheABAAh%2BQQACgALACwAAAAAgAAPAAAD%2Fwi0C%2F6sPRfJpPGqfKv2HTeBowiZjqCqG9malYS5sXXScYnvcP6swJqux2MMjTeiEjlbyl5MAHAlTEarzasv%2B8RCu9uvjTuWTgXedFhdBLfLbGf5jF7b30e3PA%2B%2F739ncVp4VnqDf2R8ioBTgoaPfYSJhZGIYhN0BZqbBROcm56fnQ%2Biow6loZ%2BpnKugpKKtmrGmAAO2twOor6q7rL2up7C%2FssO0usG8yL7KwLW4tscA0dPCzMTWxtXS2tTJ297P0Nzj3t3L3%2BfmzerX6M3hueTp8uv07ezZ5fa08Piz%2F8UAYhPo7t6%2BCfDcafDGbOG5hhcYKoz4cGIrh80cPAOQAAAh%2BQQACgAMACwAAAAAgAAPAAAD5wi0C%2F6sPRfJpPGqfKv2HTeBowiZGLORq1lJqfuW7Gud9YzLud3zQNVOGCO2jDZaEHZk%2BnRFJ7R5i1apSuQ0OZT%2BnleuNetdhrfob1kLXrvPariZLGfPuz66Hr8f8%2F9%2BgVh4YoOChYhpd4eKdgwFkJEFE5KRlJWTD5iZDpuXlZ%2BSoZaamKOQp5wAm56loK6isKSdprKotqqttK%2B7sb2zq6y8wcO6xL7HwMbLtb%2B3zrnNycKp1bjW0NjT0cXSzMLK3uLd5Mjf5uPo5eDa5%2BHrz9vt6e%2FqosO%2FGvjJ%2Bsj5F%2FsC%2BuMHcCCoBAA7AAAAAAAAAAAA";

// Remove the bottom paginator (we will use automagic AJAX for "next
// page" and if the user wants to go to a specific page, there is
// always the top paginator).
var bottomPagination = document.querySelector("#torrents ~ .pagination");
bottomPagination.parentNode.removeChild(bottomPagination);

// Regular expression for matching/replacing the pagination.
var paginationRE = /<p class="pagination">[\S\s]+?<\/p>/;

// Global variable (ew) ...or semaphore (nice comeback).
loading = false;

// Set up the loader image.  Insert it right before "#postResults"
// which indicates the end of the results.
var loader = document.createElement('img');
loader.id = 'gm-loader';
loader.src = loaderGif;
loader.style.margin = '20px auto';

var postResults = document.querySelector('#postResults');
postResults.parentNode.insertBefore(loader, postResults);

// Regular expression for matching the torrents body.
var tbodyRe = /<tbody>([\s\S]+)<\/tbody>/;

/**
 * Check if ELEMENT is in the viewport.  THRESHOLD states how long
 * "before" ELEMENT is actually in the viewport we should return true.
 */
function isElemReached(element, threshold) {
    var limit = document.documentElement.clientHeight + document.documentElement.scrollTop;
    return limit > element.offsetTop - threshold;
}

/**
 * The next page was loaded successfully.
 */
function loadSuccessCallback(response) {

    // If the response is not "OK", don't do anything
    if (response.status != 200)
        return;

    // Extract the TBODY.
    var result = tbodyRe.exec(response.responseText)

    // The result should be 2 elements, the entire text that matched
    // (incl. tbody tags), and the grouped match (rows).
    if (result.length == 2) {
        var rows = result[1];
        var tbody = document.querySelector("#torrenttable > tbody");
        // `insertAdjacentHTML' is not supported by Firefox yet
        tbody.innerHTML = tbody.innerHTML + rows;
    }

    // Replace the paginator.
    var newPag = paginationRE.exec(response.responseText)[0];
    document.body.innerHTML =
        document.body.innerHTML.replace(paginationRE, newPag);

    // Update `postResults', since it has probably moved after the
    // added table rows..
    loader = document.querySelector('#gm-loader');

    // Allow loading next page.
    loading = false;
}


/**
 * An error occurred!
 */
function loadErrorCallback(response) {
    GM_log("Error while loading page: " + response.responseText);
}

/**
 * Load the next page.
 */
function loadNext() {
    if (!loading) {
        loading = true;
        var link = document.querySelector(".pagination > strong + a");
        if (link) {
            GM_xmlhttpRequest({
                method: 'GET',
                url: link.href,
                onload: loadSuccessCallback,
                onerror: loadErrorCallback
            });
        }

        // Reached the last page.  Hide the loader.
        else {
            loader.style.display = 'none';
        }
    }
}

/**
 * Check if the end is reached and if so, load the next page.
 */
function checkEnd() {
    if (isElemReached(loader, 200)) { // threshold = 200
        loadNext();
    }
}

function oneLineSnatched(element) {
    var tds = element.querySelectorAll('tr td:nth-child(6)');
    for (var i = 0; i < tds.length; i++) {
        tds[i].innerHTML = tds[i].innerHTML.replace(/<br>times$/, '');
    }
}

document.addEventListener("scroll", checkEnd);
if (GM_getValue('checkEndOnLoad', true))
    checkEnd();

if (GM_getValue('oneLineSnatched', true))
    oneLineSnatched(document.body);


/***** Configuration *****/

// Commented since it seems to be buggy as fuck.

// var config = {
//     'checkEndOnLoad':
//     {
// 	'label': 'Check if end is reached on load',
//         'tooltip': "If this is checked, the script will check whether the end has been reached even on the first page load.  Uncheck this if you don't like the F5/Refresh behavior that comes with it.",
// 	'type': 'checkbox',
// 	'default': true
//     }
// };
// GM_config.init('Configure TorrentLeech Automatic Scroller', config);
// GM_registerMenuCommand('TL Auto Scroller: Configuration', GM_config.open);
