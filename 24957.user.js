// ==UserScript==
// @name           MetaFilter Hide Threads in "My Comments"
// @namespace      http://plutor.org/
// @description    Allows you to hide threads on your "My Comments" page
// @include        http://metafilter.com/contribute/mycomments.mefi
// @include        http://www.metafilter.com/contribute/mycomments.mefi
// @include        http://metafilter.com/contribute/activity/
// @include        http://www.metafilter.com/contribute/activity/
// ==/UserScript==

function init() {
    var xpath = "//div[@class='copy']";
    var candidates = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var thread = null, i = 0; (thread = candidates.snapshotItem(i)); i++) {
        var threadparent = thread.parentNode
        var threadchildren = thread.childNodes
        var threadtitle = threadchildren[1]
        var threadhref = threadtitle.firstChild.firstChild.href
        var threaddetails = threadchildren[3].childNodes[1].innerHTML

        // Make "this is hidden" div and put it before this div
        var hiddenmsg = document.createElement('div')
        hiddenmsg.appendChild(threadtitle.cloneNode(true))
        hiddenmsg.className = 'copy'
        hiddenmsg.style.clear = 'both'
        hiddenmsg.style.paddingTop = '10px'
        hiddenmsg.style.display = 'none'
        hiddenmsg.style.position = 'relative'
        hiddenmsg.firstChild.firstChild.style.display = "inline";
        hiddenmsg.id = threadhref + "_hidden"
        var hiddenmsgdetails = document.createElement('div')
        hiddenmsgdetails.innerHTML = threaddetails
        hiddenmsgdetails.className = 'smallcopy'
        hiddenmsg.appendChild(hiddenmsgdetails)
        // "Show" link in hidden div
        var showlink = document.createElement('div')
        showlink.innerHTML = "+"
        showlink.setAttribute('threadid', threadhref)
        showlink.className = 'smallcopy'
        showlink.style.position = 'absolute'
        showlink.style.left = '-30px'
        showlink.style.float = 'left'
        showlink.style.width = '1em'
        showlink.style.padding = '0 1px'
        showlink.style.textAlign = 'center'
        showlink.style.border = 'solid 1px #ccc'
        showlink.style.fontWeight = 'bold'
        showlink.style.cursor = 'default'
        showlink.title = 'Click to show recent comments'
        showlink.addEventListener("click", show_thread_event, false)
        hiddenmsg.insertBefore(showlink, hiddenmsg.firstChild)

        threadparent.insertBefore(hiddenmsg, thread)

        // Apply ID to this div
        thread.id = threadhref

        // Add "hide" link in thread div
        thread.style.position = 'relative'
        threadtitle.firstChild.style.marginTop = "0";
        var hidelink = document.createElement('div')
        hidelink.innerHTML = "&ndash;"
        hidelink.setAttribute('threadid', threadhref)
        hidelink.className = 'smallcopy'
        hidelink.style.position = 'absolute'
        hidelink.style.left = '-30px'
        hidelink.style.width = '1em'
        hidelink.style.padding = '0 1px'
        hidelink.style.textAlign = 'center'
        hidelink.style.border = 'solid 1px #ccc'
        hidelink.style.fontWeight = 'bold'
        hidelink.style.cursor = 'default'
        hidelink.title = 'Click to hide recent comments'
        hidelink.addEventListener("click", hide_thread_event, false)
        thread.insertBefore(hidelink, thread.firstChild)
    }

    load_hidden_threads()
    for (i in hidden_threads)
        hide_thread(hidden_threads[i], true)
}

function hide_thread_event(event) {
    hide_thread(event.target.getAttribute('threadid'), false)
}
function hide_thread(thread_id, ininit) {
    var thread = document.getElementById(thread_id)
    var thread_hidemsg = document.getElementById(thread_id + "_hidden")
    if (!thread || !thread_hidemsg) return

    // Hide
    thread.style.display = 'none'
    thread_hidemsg.style.display = 'block'

    // Add to array
    if (!ininit) {
        var found = 0
        for (i in hidden_threads) {
            if (hidden_threads[i] == thread_id)
                found = 1
        }
        if (!found) {
            hidden_threads.push(thread_id)
            save_hidden_threads()
        }
    }
}

function show_thread_event(event) {
    show_thread(event.target.getAttribute('threadid'))
}
function show_thread(thread_id) {
    var thread = document.getElementById(thread_id);
    var thread_hidemsg = document.getElementById(thread_id + "_hidden");
    if (!thread || !thread_hidemsg) return

    // Show
    thread.style.display = 'block';
    thread_hidemsg.style.display = 'none';

    // Remove from array
    var new_hidden_threads = new Array()
    for (i in hidden_threads) {
        if (hidden_threads[i] != thread_id)
            new_hidden_threads.push(hidden_threads[i])
    }

    if (hidden_threads.length != new_hidden_threads.length) {
        hidden_threads = new_hidden_threads
        save_hidden_threads()
    }
}

/*
 */
var hidden_threads = new Array()

function load_hidden_threads() {
    var value = GM_getValue("hidden_threads")
    if (value)
        hidden_threads = String(value).split(",")
}

function save_hidden_threads() {
    GM_setValue("hidden_threads", hidden_threads.join(","))
}

init()

