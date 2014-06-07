// ==UserScript==
// @name        Facebook Chatbox Contact Sorter
// @description Sorts the Facebook Chatbox contacts alphabetically
// @namespace   http://forstinea.nl/fb/
// @include     http://www.facebook.com/*
// @include     https://www.facebook.com/*
// @match       http://www.facebook.com/*
// @match       https://www.facebook.com/*
// @exclude     http://apps.facebook.com/*
// @exclude     http://www.facebook.com/login.php*
// @version     1.26
// @author      Rene Uittenbogaard
// @copyright   Rene Uittenbogaard, Creative Commons CC-BY-NC-SA
// ==/UserScript==

/* Unfortunately, not all browsers support loading jQuery in Facebook.
 * Use "old-fashioned" Javascript instead.
 */

(function (d, q, r, csid, interval, att)
{
    /* Selector to find the 'Alphabetic Sort' link */
    var linkSelector = 'a[chat-sort-id="' + csid + '"]';
    /* Helper function to iterate over querySelectorAll() results.
     * The first time through, the chat box may not have been rendered
     * yet, so we may not be able to install ourselves directly.
     * We provide a retry option to keep trying the installation.
     */
    var nodeForAll = function (selector, callback, retry)
    {
        var nodes = d[r](selector);
        if (nodes.length)
        {
            for (var i = 0; i < nodes.length; i += 1) {
                callback(nodes[i], i);
            }
        } else if (retry) {
            /* Install failed. Try again in 500 ms. */
            setTimeout(function () {
                nodeForAll(selector, callback, retry);
            }, 500);
        }
    };
    /* Portable way to remove a class name */
    var removeClassName = function (node, cls)
    {
        if (node.classList) {
            node.classList.remove(cls);
        } else {
            /* MSIE8 does not support 'classList' */
            node.className = node.className.split(' ').filter(function (fragment) {
                return (fragment !== cls);
            }).join(' ');
        }
    };
    /* Portable way to add a class name */
    var addClassName = function (node, cls)
    {
        if (node.classList) {
            node.classList.add(cls);
        } else {
            node.className += cls;
        }
    };
    /* Portable way to install event listeners */
    var addEventListener = function (element, eventName, handler)
    {
        if (element.addEventListener) {
            element.addEventListener(eventName, handler, true);
        } else {
            element.attachEvent('on' + eventName, handler);
        }
    };
    /* Define a function for sorting the contacts in the chat list. */
    var contactSorter = function ()
    {
        /* Find the list of chat contacts. There may be more than one. */
        nodeForAll('ul.fbChatOrderedList', function (chatbox)
        {
            /* Find the contacts. Convert the nodelist to an array and sort it. */
            var chatterers = Array.prototype.filter.call(
                chatbox[r]('._42fz'),
                function () { return true; }
            ).sort(function (a, b)
            {
                /* Find the name and decide which goes first. Sorting by last name poses
                 * problems, as 'Barack Hussein Obama' and 'Maxima Zorreguieta Cerruti'
                 * need different interpretations. If you must, you could try:            */
                /* st.replace(/^(.+) (\S+)$/, function (m,f,s) { return s + ', ' + f; }); */
                var atext = a[q]('._55lr').innerHTML;
                var btext = b[q]('._55lr').innerHTML;
                return (atext < btext ? -1 : (atext > btext ? 1 : 0));
            });
            /* Iterate over the sorted list and sort the DOM accordingly. */
            for (var u = 0; u < chatterers.length; u += 1) {
                chatbox.appendChild(chatterers[u]);
            };
        });
        /* Hide the 'more friends' separator as it is now useless. */
        var more = d[q]('.moreOnlineFriends');
        if (more) {
            /* Remove it. Facebook code will add it again on the next reload */
            more.parentElement.removeChild(more);
        }
    };
    /* Toggle the interval timer that will sort the contacts.
     * If 'ev' is not an actual mouse click event, then the function was called
     * at install time, to turn sorting on. In that case, also keep retrying
     * should the initial call fail to find our menu item.
     */
    var toggleAutoSorting = function (ev)
    {
        var intId;
        var retry  = !ev;
        nodeForAll(linkSelector, function (linkNode, index)
        {
            var menuItem = linkNode.parentElement;
            /* Only on first pass: fetch existing interval timer id from the DOM. */
            if (index == 0)
            {
                intId = linkNode.getAttribute(att);
                /* Set the timer if there is none */
                if (!intId) {
                    intId = setInterval(contactSorter, interval);
                    /* Store the interval timer id in the DOM. */
                    linkNode.setAttribute(att, intId);
                    /* Place the check mark next to the menu item */
                    addClassName(menuItem, 'checked');
                    addClassName(menuItem, '_54nd');
                /* clear the timer, but only if triggered by user */
                } else if (ev) {
                    clearInterval(intId);
                    /* Remove the interval timer id from the DOM. */
                    linkNode.setAttribute(att, '');
                    /* Remove the check mark next to the menu item */
                    removeClassName(menuItem, 'checked');
                    removeClassName(menuItem, '_54nd');
                }
            }
        }, retry);
        /* Prevent following the link */
        return false;
    };
    /* Install the menu item */
    var installMenuItem = function ()
    {
        /* Don't install ourselves twice */
        if (!d[r](linkSelector).length)
        {
            var makeMenuItem = function ()
            {
                /* Create the new menu option element in a sandbox. */
                var sandbox = d.createElement('div');
                sandbox.innerHTML = '<li class="_54ni __MenuItem" aria-selected="false">' +
                    '<a class="_54nc" tabindex="0" role="menuitem" chat-sort-id="' + csid + '">' +
                    '<span class="_54nh">Alphabetic Sort</span></a></li>';
                /* Add listeners to the <li> and <a> */
                addEventListener(sandbox.firstChild.firstChild, 'click', toggleAutoSorting);
                addEventListener(sandbox.firstChild, 'mouseover', function () {
                    addClassName(this, '_54ne');
                    addClassName(this, 'selected');
                    this.setAttribute('aria-selected', 'true');
                });
                addEventListener(sandbox.firstChild, 'mouseout', function () {
                    removeClassName(this, '_54ne');
                    removeClassName(this, 'selected');
                    this.setAttribute('aria-selected', 'false');
                });
                sandbox.style.display = 'none';
                document.body.appendChild(sandbox);
                return sandbox.firstChild;
            };
            var menuItem = makeMenuItem();
            /* If one of the 'Options' buttons is clicked, make sure that there is a "sort" menu item. */
            nodeForAll('.fbChatSidebar a[aria-label="Options"], ' +
                '.fbChatSidebarDropdown a[aria-label="Options"], ' +
                '#BuddylistPagelet a[aria-label="Options"]', function (optionItem)
            {
                /* Add click listeners to the "Options" menu item */
                addEventListener(optionItem, 'click', function (ev) {
                    /* Give the chat menu a short time to render */
                    setTimeout(function () {
                        /* Try to find the chat menu */
                        nodeForAll('.uiContextualLayer ul', function (menu) {
                            /* Extend the current chat menu with the menu item for toggling the interval timer. */
                            if (!menu[q](linkSelector)) {
                                var placeEl = menu[q]('li[role="separator"]');
                                menu.insertBefore(menuItem, placeEl);
                            }
                        }, true);
                    }, 300);
                });
            });
        }
    };
    /* Give the sidebar some time to load */
    setTimeout(function () {
        /* Install menu item now */
        installMenuItem();
        /* Turn on now, if not already loaded, by using undefined as first argument */
        toggleAutoSorting();
    }, 500);
})(document, 'querySelector', 'querySelectorAll', 506, 800, 'data-sorter-timer-id');

/* vim: set et ts=4 sw=4 list: */

