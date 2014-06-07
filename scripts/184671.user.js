// ==UserScript==
// @name         Batoto MyFollows
// @include      http://www.batoto.net/*
// @include      http://www.mangaupdates.com/series.html?*
// @include      https://www.mangaupdates.com/series.html?*
// @updateURL    http://userscripts.org/scripts/source/184671.meta.js
// @installURL   http://userscripts.org/scripts/source/184671.user.js
// @downloadURL  http://userscripts.org/scripts/source/184671.user.js
// @version      14.04.22.01
// ==/UserScript==


var settings = {
    iconsInHomepage: true,
    iconsInSearch: true,
    followingIcon: 'http://www.batoto.net/forums/public/style_images/master/star.png',

    mangaupdatesLinkInComic: true,
    muIcon: 'http://www.batoto.net/forums/public/style_images/Sylo/search_icon.png',
    muIconBackground: '#5F9EA0',

    infoButtonMyFollows: true,
    showTotalFollows: true,
    textColor: '#20B2AA',

    redirectToOldFollows: false,

    linkToBatotoInMU: true,
    bIcon: 'http://www.batoto.net/forums/public/style_images/Sylo/search_icon.png',
    bIconBackground: '#708090'
};



//search matches between comics from the search and your follows

function matchFollows(table) {
    var followsList = JSON.parse(localStorage.follows_list),
        rows = [].slice.call(document.getElementsByClassName('ipb_table chapters_list')[table].getElementsByTagName('strong'), 0),
        matchedNow = 0;

    for (var comicName, e = 0; e < rows.length; e = e + 1) {
        comicName = rows[e].textContent.trim();
        if (followsList.indexOf(comicName) != -1) {
            matched.push(rows[e]);
            matchedNow = matchedNow + 1;
        }

    }
    if (document.getElementById('exclude_follows').checked) {
        matchedDisplay('hide');
    }
    if (settings.iconsInSearch) {
        addIconMatched(table, matchedNow);
    }
    page = page + 1;
    linkMatchFollowsFunction(table + 1);
}

//links matchFollows() to 'Search' or 'Show more' button

function linkMatchFollowsFunction(table) {
    if (table.type == 'click') { //if the function was called by the click event in 'Search' button
        page = 1;
        //calls the function when the new content is loaded (loading image disappears)
        var checking = setInterval(function() {
            if (document.getElementById('ajax_loading').style.display == 'none') {
                clearInterval(checking);
                matched = [];
                matchFollows(0);
            }
        }, 75);

    } else { //if table is an integer, links matchFollows(table) to 'show more' button
        try {
            document.getElementById('show_more_row').getElementsByTagName('input')[0].onclick = function() {
                update_comic_search('comic_search_form', true, page - 1);
                var checking = setInterval(function() {
                    if (document.getElementById('ajax_loading').style.display == 'none') {
                        clearInterval(checking);
                        matchFollows(table);
                    }
                }, 75);
            };
        } catch (error) {} //There aren't more results
    }
}

//hide or shows the comics matched with your follows

function matchedDisplay(mode) {
    if (mode.type == 'click') { //if the function was called by a click in the "Include Myfollows" button in advance search
        mode = this.value;
    }
    if (mode == 'hide') {
        for (var i = 0; i < matched.length; i++) {
            matched[i].parentNode.parentNode.hide();
            matched[i].parentNode.parentNode.nextSibling.nextSibling.hide(); //hides the comic info if it is displaying
        }
    } else if (mode == 'show') {
        for (var i = 0; i < matched.length; i++) {
            matched[i].parentNode.parentNode.show();
        }
    }
}

//sets the icon style for the comics you're following

function addIconMatched(table, matchedNow) {
    for (var i = matched.length - 1; i >= matched.length - matchedNow; i--) {
        matched[i].firstChild.insertBefore(icon.cloneNode(false), matched[i].firstChild.firstChild.nextSibling);
    }
}

function setFollowingIcon(table) {
    icon = document.createElement('img');
    icon.src = settings.followingIcon;
    icon.title = 'Following';
    icon.style.verticalAlign = 'top';
    icon.style.marginLeft = '1px';
}

//function used by Batoto to show the info of comics

function show_follow_info() {
    var that = this,
        divid = this.getAttribute('cId');
    if ($('cId_' + divid).visible()) {
        Effect.SlideUp('cId_' + divid, {
            duration: 0.2
        });
    } else if ($('cId_' + divid).innerHTML != '') {
        Effect.SlideDown('cId_' + divid, {
            duration: 0.2
        });
    } else {
        new Ajax.Updater('cId_' + divid, ipb.vars['home_url'] + '/comic_pop', {
            parameters: {
                id: divid
            },
            method: 'get',
            onSuccess: function() {
                if (blood) { //added to change the style according to the theme
                    setTimeout(function() {
                        if (that.parentNode.parentNode.getAttribute('class') == 'row1') {
                            $('cId_' + divid).firstChild.nextSibling.style.background = 'rgba(0,0,0,0.8)';
                        } else {
                            $('cId_' + divid).firstChild.nextSibling.style.background = 'white';
                        }
                    }, 30);
                }
                setTimeout(function() {
                    new Effect.SlideDown('cId_' + divid, {
                        duration: 0.2
                    });
                }, 50);
            }
        });
    }
}



if (document.location.host == 'www.batoto.net') {
    var path = document.location.pathname;

    if (settings.redirectToOldFollows) {
        if (path == '/myfollows') {
            document.location.href = '/follows_comics';
        } else if (path == '/') {
            document.getElementById('anonymous_element_7').parentNode.childNodes[5].firstChild.href = '/follows_comics';
        }
        document.getElementById('nav_menu_4_trigger').href = '/follows_comics';
    }

    if (path == '/follows_comics') {
        var comics = [].slice.call(document.getElementsByTagName('strong'), 0);
        comics.shift();
        comics.pop();
        comics.pop();
        comics.pop();

        var followsList = [],
            rows = [].slice.call(document.getElementsByTagName('tr'), 0),
            table = rows[0].parentNode;

        if (document.getElementsByClassName('wrapper').length == 2) {
            var blood = true;
        }

        var infoButton = document.createElement('a');
        infoButton.href = 'javascript:void(0)';
        infoButton.innerHTML = '<img src=\"/forums/public/style_images/master/information.png\"style=\"margin:-2px 4px 0px 0px\">';

        var infoRow = document.createElement('tr');
        infoRow.innerHTML = '<td colspan=\"2\" style=\"padding:0px;border-bottom:none\"><div style=\"display:none\"></div></td>';

        var comicId;
        comics.forEach(function(comic, index) {
            followsList.push(comic.textContent);
            if (settings.infoButtonMyFollows) {
                comic.parentNode.parentNode.previousSibling.previousSibling.setAttribute('rowspan', '3');

                comicId = comic.parentNode.href.substring(comic.parentNode.href.lastIndexOf('r') + 1);
                infoRow.firstChild.firstChild.id = 'cId_' + comicId;
                table.insertBefore(infoRow.cloneNode(true), rows[index * 2 + 1]);

                infoButton.setAttribute('cId', comicId);
                comic.parentNode.parentNode.insertBefore(infoButton.cloneNode(true), comic.parentNode);
                comic.parentNode.previousSibling.addEventListener('click', show_follow_info, false);
            }
        });

        localStorage.follows_list = JSON.stringify(followsList);

        if (settings.showTotalFollows) {
            var finishedMessage = document.createElement('strong');
            finishedMessage.textContent = 'You are following ' + followsList.length + ' comics!';
            finishedMessage.style.fontSize = '70%';
            finishedMessage.style.paddingLeft = '8px';
            finishedMessage.style.color = settings.textColor;
            document.getElementById('content').getElementsByClassName('maintitle')[0].appendChild(finishedMessage);
        }

    } else if (path == '/' && settings.iconsInHomepage) {
        var icon;
        setFollowingIcon();

        var followsList = JSON.parse(localStorage.follows_list),
            current = document.getElementById('loading_row_1'),
            index = 1;
        while (current) {
            if (followsList.indexOf(current.previousSibling.previousSibling.textContent) != -1) {
                current.parentNode.insertBefore(icon.cloneNode(false), current.parentNode.childNodes[2]);
            }

            index = index + 1;
            current = document.getElementById('loading_row_' + index.toString());
        }

    } else if (path == '/search') {
        var page = document.URL.indexOf('&p=');
        if (page != -1) {
            page = parseInt(document.URL.slice(page + 3), 10);
        } else {
            page = 1;
        }

        var icon;
        setFollowingIcon();

        var optionInput = document.createElement('tr');
        optionInput.innerHTML = '<td style=\"text-align: right; font-weight: bold;\">Include MyFollows:</td>' +
            '<td style=\"text-align: left; vertical-align: top; padding: 8px 0;\">' +
            '<label><input id=\"include_follows\" type=\"radio\" name=\"follows\" value=\"show\" checked=\"checked\"> Yes</label>' +
            '<label><input id=\"exclude_follows\" type=\"radio\" name=\"follows\" value=\"hide\" style=\"margin-left: 4px\"> No</label></td>';
        document.getElementById('advanced_options').childNodes[1].insertBefore(optionInput, document.getElementById('advanced_options').getElementsByTagName('tr')[6]);
        document.getElementById('include_follows').addEventListener('click', matchedDisplay, false);
        document.getElementById('exclude_follows').addEventListener('click', matchedDisplay, false);

        document.getElementsByName('dosubmit')[0].addEventListener('click', linkMatchFollowsFunction, false);
        document.getElementsByName('dosubmit2')[0].addEventListener('click', linkMatchFollowsFunction, false);

        var matched = [];
        matchFollows(0);

    } else if (path.indexOf('/comic/_/comics/') == 0 && settings.mangaupdatesLinkInComic) {
        var title = document.getElementsByClassName('ipsType_pagetitle')[0];
        var link = 'http://www.google.com/webhp?#q=' + title.textContent.trim().replace(/\W/g, '+') +
            '&sitesearch=mangaupdates.com/series.html?&btnI=I&nfpr=1';

        var button = document.createElement('a');
        var buttonIcon = document.createElement('img');
        button.href = link;
        buttonIcon.title = 'Search in MangaUpdates';
        buttonIcon.alt = '';
        buttonIcon.src = settings.muIcon;
        buttonIcon.style.backgroundColor = settings.muIconBackground;
        buttonIcon.style.padding = '4px';
        buttonIcon.style.verticalAlign = '0%';

        button.appendChild(buttonIcon);
        title.insertBefore(button, title.firstChild);
    }
}


// MangaUpdates: button to search comic in batoto
else if (settings.linkToBatotoInMU) {
    var comic = document.getElementById('listContainer').parentNode.getElementsByTagName('span')[0];
    if (comic.textContent.indexOf('(Novel)') == -1) {
        var button = document.createElement('a'),
            icon = document.createElement('img');

        button.href = 'http://www.google.com/webhp?#q=' + comic.textContent.replace(/\W/g, '+') + '&sitesearch=batoto.net/comic&btnI=I&nfpr=1';

        icon.src = settings.bIcon;
        icon.alt = '';
        icon.title = 'Search in Batoto';
        icon.style.backgroundColor = settings.bIconBackground;
        icon.style.padding = '3px';
        icon.style.marginRight = '3px';
        icon.style.verticalAlign = '0%';
        button.appendChild(icon);
        comic.parentNode.insertBefore(button, comic);
    }
}