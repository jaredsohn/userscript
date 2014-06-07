// ==UserScript==
// @name           FR Tree Viewer
// @namespace      http://cynwoody.appspot.com/fr_tree_viewer.html
// @description    Brings together comments and their replies.
// @date           2009-06-04
// @include        http://*.freerepublic.com*/posts*
// @include        http://freerepublic.com*/posts*
// ==/UserScript==

const STYLE = '.a2 {clear:both}' +
              '.postBox {' +
                  'padding:3px;' +
                  'border:1px solid #888;' +
                  'margin-top:3px;' +
                  'margin-bottom:3px}' +
              '.quoteButton {color:#009;margin-left:3px;padding:0px}' +
              '.quoteBox {background:#ffc;padding:3px;border:1px solid #ccf}' +

              '#progressBox {position:fixed;left:2px;top:10px;' +
                  'background:#fc0;padding:3px;border:1px solid black}' +
              '#logBox {background:skyblue;padding:3px}' +
              '#scrollBox {position:fixed;top:0px;left:0px;z-index:1;' +
                     'border:1px solid #888;background:yellow}' +
              '#scrollButtons {padding:2px}' +
              '#scrollButtons input {padding:0px;margin:0px;color:blue}' +
              '#scrollClose, #scrollClose input {' +
                  'margin:0px;padding:0px;text-align:right;' +
                  'color:red;font-size:7px;font-weight:bold}';

const INDENT = 7;       // Indentation per reply level, in pixels
const MAX_INDENT = 0.7; // Maximum indent, as a fraction of window width
const BACKGROUNDS = ['#ccf', '#ffc', '#cfc', '#fcc', '#cff', '#fcf', '#ccc'];

const SCROLL = {
    method: "constantTime",     // Change to "jump" to eliminate animation
    constantSpeed: {
        pixelsPerInterval: 50,
        timeInterval: 10
    },
    constantTime: {
        intervalCount: 25,
        timeInterval: 20
    }
};

var posts;              // Maps postNumber to post (as HTML text)
var replies;            // Maps postNumber to a list of replying post numbers
var postCheck;          // Cross-check. Used to pick up deleted posts
var maxIndent;          // Maximum indent, in pixels
var indexingCanceled;   // Set when user cancels indexing of posts
var selection;          // Text selected when Quote button pressed

// Keystroke watcher. Implements keyboard shortcuts:
//    Ctrl-Alt-T => Tree View
//    Ctrl-Alt-R => Poster Report

function onKeyPress(event)
{
    if (event.ctrlKey && event.altKey) {
        switch (event.charCode) {
            case 116: // t
                onTreeViewClick(event, $('treeButton'));
                break;
            case 114: // r
                onPosterReportClick(event, $('posterReport'));
                break;
        }
    }
}

// Handles Tree View button click (or Ctrl-Alt-T).

function onTreeViewClick(event, button)
{
    button = button || this;
    if (button.disabled)
        return;
    var callback = /Tree/.test(button.value) ? makeTreeView : makeFlatView;
    disable(button, 'Waiting ...');
    disable('posterReport');
    indexThread(button, callback);
}

// Rearranges the posted comments into the tree view, assuming the
// thread has been indexed successfully (ok == true).

function makeTreeView(ok)
{
    if (!ok) {
        enable('treeButton', 'View as Tree');
        enable('posterReport');
        return;
    }
    var start = new Date();
    var div = deleteExistingPosts();
    maxIndent = window.innerWidth * MAX_INDENT;
    postCheck = {count:0};
    addReply(div, 1, 0);
    if (postCheck.count < posts.length-1)
        addDeletedPosts(div);
    if (postCheck.count != posts.length-1)
        alert('postCheck = ' + postCheck.count + ', but there are ' +
                      (posts.length-1) + ' posts.');
    doFixups();
    addScrollBox();
    enable('treeButton', 'Flat View');
    enable('posterReport');
    logTime(start, 'generate the tree view');
}
makeTreeView.title = 'tree view';

// Makes a second pass over the posts to pick up deleted posts and
// their replies.  These would otherwise be missed, because deleted
// posts have no To link.

function addDeletedPosts(container)
{
    for (var x=1, limit=posts.length; x<limit; ++x) {
        if (!postCheck[x])
            addReply(container, x, 0);
    }
}

// Adds a post to the display with the indentation indicated by
// depth. Then calls itself to add each reply at the next deeper
// indentation level.

function addReply(container, postNumber, depth)
{
    ++postCheck.count;
    postCheck[postNumber] = true;
    var div = document.createElement('div');
    div.className = 'postBox';
    var indent = depth * INDENT;
    if (indent > maxIndent)
        indent = maxIndent;
    div.style.marginLeft = indent + 'px';
    div.style.background = BACKGROUNDS[depth % BACKGROUNDS.length];
    div.innerHTML = posts[postNumber];
    var anchor = document.createElement('a');
    anchor.name = postNumber;
    container.appendChild(anchor);
    container.appendChild(div);
    var replyList = replies[postNumber];
    if (replyList) {
        ++depth;
        for (var x=0, limit=replyList.length; x<limit; ++x)
            addReply(container, replyList[x], depth);
    }
}

// Rearranges the posts into the chronological flat view, similar to
// FR's normal view, but always showing all the posts.

function makeFlatView(ok)
{
    if (!ok) {
        enable('treeButton', 'View as Tree');
        enable('posterReport');
        return;
    }
    var start = new Date();
    var div = deleteExistingPosts();
    var s = '';
    for (var postNumber=1, limit=posts.length; postNumber<limit; ++postNumber) {
        s += '<a name=' + postNumber + '></a>\n';
        s += posts[postNumber];
        s += '<hr size=1 noshade=noshade>\n';
    }
    div.innerHTML = s;
    removeScrollBox();
    doFixups();
    enable('treeButton', 'Tree View');
    enable('posterReport');
    logTime(start, 'generate the flat view');
}
makeTreeView.title = 'flat view';

// Performs fixups needed after view creation (tree or flat).

function doFixups()
{
    fixLinks(document.body);
    removeBlankLines(document.body);
    addQuoteButtons(document.body);
    localizeDates(document.body);
}

// Rewrites all the To-links in the node in such a was as to ensure
// they are valid in the new, single-page environment.

function fixLinks(node)
{
    var links = $x('.//a[contains(., "To ")]', node);
    for (var x=0, limit=links.snapshotLength; x<limit; ++x) {
        var link = links.snapshotItem(x);
        link.href = link.hash;
    }
}

// Removes the existing posts and replaces them with an empty div
// ready to receive the rearranged posts. Returns the empty div.

function deleteExistingPosts()
{
    var firstNode = findBeginningOfPosts();
    var lastNode = document.body.lastChild;
    do {
        lastNode = lastNode.previousSibling;
    } while (!/Disclaimer/.test(lastNode.innerHTML));
    var range = document.createRange();
    range.setStartAfter(firstNode);
    range.setEndBefore(lastNode);
    range.deleteContents();
    range.detach();
    var div = document.createElement('div');
    div.id = 'posts';
    document.body.insertBefore(div, lastNode);
    return div;
}

// Locates the node before the first post. If the user is signed in,
// we can use the 'comment' anchor. Otherwise, we have to find the
// actual first post and back up to the horizontal rule.

function findBeginningOfPosts()
{
    var firstNode = document.anchors.namedItem('comment');
    if (firstNode)
        return firstNode;
    var node = $xFirst('div[@class="b2"]');
    node = node || $xFirst('div[@id="posts"]');
    while (node) {
        node = node.previousSibling;
        if (node.tagName == 'HR')
            return node;
    }
    alert("Can't find posts!");
    return null;
}

// Parses all the posts in the thread and builds two tables (unless
// they already exist):
//    - posts, an array that maps a postNumber to the post's HTML
//      snippet.
//    - replies, a hash that links a postNumber to an array of
//      replying postNumbers.
// Calls the callback function when the indexing is complete (it will
// happen asynchronously if page fetches are required).

function indexThread(button, callback)
{
    if (replies)
        callback(true);
    else {
        var first = $xFirst('a[@class="fr_page_goto"][contains(., "first")]');
        if (first) {
            button.value = 'Waiting ...';
            indexWholeThread(first, callback);
        }
        else {
            var start = new Date();
            indexPosts(originalHTML);
            indexReplies();
            var now = new Date();
            logTime(start, 'index the thread');
            callback(true);
        }
    }
}

// Called by indexThread to index multipage threads. Fetches the entire
// thread in the background, adding the posts of each page to the posts
// index. Then indexes the replies and calls the callback function,
// indicating whether the operation completed or was canceled by the
// user.

function indexWholeThread(firstLink, callback)
{
    var start = new Date();
    var link = document.createElement('a');
    link.href = firstLink.href;
    link.hash = '';
    loadLink(link, loadNext);

    function loadNext(html)
    {
        if (indexingCanceled) {
            indexingCanceled = posts = replies = null;
            hideProgress();
            log('Loading and indexing canceled!');
            callback(false);
            return;
        }
        if (!html) {
            callback(false);
            return;
        }
        var r = html.match(/href="posts(\?[^"]*)" class="fr_page_goto"[^>]*>next</);
        if (r) {
            link.search = r[1];
            loadLink(link, loadNext);
        }
        else {
            showProgress('Generating ' + callback.title + ' ...');
            var postCount = posts.length - 1;
            indexReplies();
            var now = new Date();
            logTime(start, 'load and index');
            callback(true);
            hideProgress();
        }
    }
}

// Displays a message in floating box to let the user know how far a
// multipage indexing operation has proceeded. The box includes a Cancel
// button, in case the user decides to bail.

function showProgress(msg)
{
    var progress = $('progressMsg');
    if (!progress)
        progress = makeProgressBox();
    progress.innerHTML = msg;
    $('indexingCancel').disabled = false;
    $('progressBox').style.display = 'block';
}

function makeProgressBox()
{
    var div = document.createElement('div');
    div.id = 'progressBox';
    div.innerHTML = '<span id=progressMsg></span> ' +
              '<input id=indexingCancel type=button value=Cancel>';
    document.body.appendChild(div);
    $('indexingCancel').addEventListener('click', onProgressCancel, false);
    return $('progressMsg');
}

function hideProgress()
{
    var box = $('progressBox');
    if (box)
        box.style.display = 'none';
}

// Handles a progress box cancel click. Signals the indexing to stop.

function onProgressCancel()
{
    indexingCanceled = true;
    $('indexingCancel').disabled = true;
}

// Fetches a page in the background, indexes it, and calls the callback,
// passing the retrieved HTML.

function loadLink(link, callback)
{
    var req = new XMLHttpRequest();
    req.open('GET', link, true);
    req.onreadystatechange = handler;
    req.send(null);
    showProgress('Loading ' + link);

    function handler()
    {
        if (req.readyState == 4) {
            var html = req.responseText;
            if (req.status != 200) {
                var msg = "XHR received " + req.status + ' ' + req.statusText +
                        ' loading ' + link + '.';
                alert(msg);
                log(msg);
                html = null;
                indexingCanceled = true;
            }
            if (html)
                indexPosts(html);
            callback(html);
        }
    }
}

// Extracts the posts from a page of HTML text and adds them to the
// posts array, using postNumber as the subscript.

function indexPosts(html)
{
    var r = new RegExp('<a name="(\\d+)"></a>\\n([\\s\\S]+?' +
                       '(?:<div class="n2">[\\s\\S]+?</div>|' +
                       'Moderator</i></small><br[ /]*>))', 'gi');
    posts = posts || [];
    var match;
    while (match = r.exec(html))
        posts[match[1]] = match[2];
}

// Runs thru the posts array and builds the replies table. The replies
// table contains an array of replying post numbers for each post that
// has at least one reply.

function indexReplies()
{
    replies = {};
    for (var postNumber=1, limit=posts.length; postNumber<limit; ++postNumber) {
        var m = /<a .*?href=".*?#(\d+)">To \1</i.exec(posts[postNumber]);;
        if (m && m[1]) {
            var toNumber = m[1];
            var replyList = replies[toNumber];
            if (replyList)
                replyList.push(postNumber);
            else
                replies[toNumber] = [postNumber];
        }
    }
}

// Adds a draggable floating box which appears when the user clicks in
// in the white indentation space of the tree view. The box includes
// buttons to scroll up or down to the next post at or above the box's
// indent level.

function addScrollBox()
{
    var div = document.createElement('div');
    div.id = 'scrollBox';
    div.style.display = 'none';
    div.innerHTML = '<div id=scrollClose>' +
        '<input id=scrollCloseButton type=button value=x></div>' +
        '<div id=scrollButtons>' +
            '<input id=up type=button value=Up><br>' +
            '<input id=dn type=button value=Dn>' +
        '</div>';
    div.title = 'Scrolls up or down to next comment of same or outer color. ' +
                'Drag to change color.';
    document.body.appendChild(div);
    $('posts').addEventListener('click', onPostsClick, false);
    $('scrollCloseButton').addEventListener('click', onScrollClose, false);
    var list = $x('.//input', div);
    for (var x=0, limit=list.snapshotLength; x<limit; ++x) {
        var button = list.snapshotItem(x);
        button.addEventListener('mousedown', onScrollButtonMouseDown, false);
    }
    div.addEventListener('mousedown', onScrollBoxMouseDown, false);
    $('dn').addEventListener('click', onDnClick, false);
    $('up').addEventListener('click', onUpClick, false);
}

// Deletes the scroll box created by addScrollBox, if it exists.

function removeScrollBox()
{
    var scrollBox = $('scrollBox');
    if (scrollBox) {
        var posts = scrollBox.parentNode;
        posts.removeChild(scrollBox);
        posts.removeEventListener('click', onPostsClick, false);
    }
}

// Responds to a click in the tree view indentation white space by
// showing the scroll box at the spot clicked.

function onPostsClick(e)
{
    if (e.target.id != 'posts')
        return;
    var scrollBox = $('scrollBox');
    scrollBox.style.display = 'block';
    scrollBox.style.left = (e.clientX - scrollBox.offsetWidth/2) + 'px';
    scrollBox.style.top = e.clientY + 'px';
    colorScrollBox(scrollBox);
}

// Hides the scroll box when the user clicks its Close button.

function onScrollClose(e)
{
    $('scrollBox').style.display = 'none';
}

// Traps mousedowns on scroll box buttons, so they won't start a drag.

function onScrollButtonMouseDown(e)
{
    e.stopPropagation();
}

// Supports dragging the scroll box by its white space areas.

function onScrollBoxMouseDown(e)
{
    this.addEventListener('mousemove', onMouseMove, true);
    this.addEventListener('mouseup', onMouseUp, true);
    var mdx = e.clientX;
    var mdy = e.clientY;
    var mdLeft = parseInt(this.style.left);
    var mdTop = parseInt(this.style.top);
    e.stopPropagation();

    function onMouseMove(e)
    {
        var x = e.clientX - mdx;
        var y = e.clientY - mdy;
        this.style.left = mdLeft + x + 'px';
        this.style.top = mdTop + y + 'px';
        colorScrollBox(this);
        e.stopPropagation();
    }

    function onMouseUp(e)
    {
        this.removeEventListener('mousemove', onMouseMove, true);
        this.removeEventListener('mouseup', onMouseUp, true);
        e.stopPropagation();
    }
}

// Sets the scroll box's background color to correspond to its current
// indent level.

function colorScrollBox(scrollBox)
{
    var depth = scrollBoxDepth(scrollBox);
    scrollBox.style.background = BACKGROUNDS[depth % BACKGROUNDS.length];
}

// Computes the scroll box's indent level, based on its horizontal
// position.

function scrollBoxDepth(scrollBox)
{
    var offset = scrollBox.offsetLeft - $('posts').offsetLeft +
                   Math.floor(scrollBox.offsetWidth/2);
    return offset > 0 ? Math.floor(offset/INDENT) : 0;
}

// Scrolls up to the next post at or left of the scroll box's indent
// level.

function onUpClick(event)
{
    scrollPosts(event, findUp);

    function findUp(boxDepth, boxTop, divs)
    {
        for (var x=divs.snapshotLength-1; x>=0; --x) {
            var div = divs.snapshotItem(x);
            if (div.offsetTop >= boxTop)
                continue;
            var divDepth = parseInt(div.style.marginLeft) / INDENT;
            if (divDepth <= boxDepth)
                break;
        }
        return div;
    }
}

// Scrolls down to the next post at or left of the scroll box's indent
// level.

function onDnClick(event)
{
    scrollPosts(event, findDown);

    function findDown(boxDepth, boxTop, divs)
    {
        for (var x=0, limit=divs.snapshotLength; x<limit; ++x) {
            var div = divs.snapshotItem(x);
            if (div.offsetTop <= boxTop)
                continue;
            var divDepth = parseInt(div.style.marginLeft) / INDENT;
            if (divDepth <= boxDepth)
                break;
        }
        return div;
    }
}

// Scrolls the display so that the post found by the findDiv function
// is opposite the scroll box. Chooses between three different scroll
// methods, depending on the settings in the SCROLL constant. Available
// methods include two types of animation and a simple jump. If the
// control or shift key is down, it always uses the jump method.

function scrollPosts(event, findDiv)
{
    var box = $('scrollBox');
    var boxTop = box.offsetTop + window.pageYOffset;
    var boxDepth = scrollBoxDepth(box);
    var divs = $x('div', $('posts'));
    var div = findDiv(boxDepth, boxTop, divs);
    var scrollDistance = div.offsetTop - boxTop;

    if (/jump/i.test(SCROLL.method) || event.ctrlKey || event.shiftKey)
        jump();
    else if (/time/i.test(SCROLL.method))
        constantTime();
    else if (/speed/i.test(SCROLL.method))
        constantSpeed();
    else
        constantTime();

    // Non-animated, simple scroll.

    function jump()
    {
        window.scrollBy(0, scrollDistance);
    }

    var interval;

    // Animated scroll: Moves the display faster or slower depending
    // on the distance to scroll.

    function constantTime()
    {
        var parms = SCROLL.constantTime;
        var intervalCount = parms.intervalCount;
        interval = window.setInterval(scrollABit, parms.timeInterval);
        document.body.addEventListener('click', abort, true);

        function scrollABit()
        {
            if (intervalCount == 0) {
                abort();
                return;
            }
            var scrollInc = Math.round(scrollDistance / intervalCount--);
            window.scrollBy(0, scrollInc);
            scrollDistance -= scrollInc;
        }
    }

    // Animated scroll: Moves the display at a steady speed until the
    // distance is covered.

    function constantSpeed()
    {
        var parms = SCROLL.constantSpeed;
        var scrollInc = parms.pixelsPerInterval;
        if (scrollDistance < 0)
            scrollInc = -scrollInc;
        interval = window.setInterval(scrollABit,  parms.timeInterval);
        document.body.addEventListener('click', abort, true);

        function scrollABit()
        {
            if (scrollDistance == 0) {
                abort();
                return;
            }
            if (Math.abs(scrollInc) > Math.abs(scrollDistance))
                scrollInc = scrollDistance;
            window.scrollBy(0, scrollInc);
            scrollDistance -= scrollInc;
        }

    }

    // Terminates an animated scroll early if the user clicks.

    function abort()
    {
        window.clearInterval(interval);
        document.body.removeEventListener('click', arguments.callee, true);
    }
}

// -----------------------------------------------------------------------------

// Handles a mouse press on a Quote button. Installs a click handler for
// the button, allowing the click to be handled correctly while preserving
// any text selection the user may have made.

function onQuotePress()
{
    this.removeEventListener('click', onQuoteClick, false);
    this.addEventListener('click', onQuoteClick, false);
    var sel = window.getSelection();
    selection = sel.toString();
    sel.removeAllRanges();  // Deselect the text
}

// Handles a Quote / Unquote button click. If there is already a quoted
// post showing (the Unquote button case), we delete it. Otherwise (the
// Quote button case), we locate the post to be quoted and display it
// in a box above the current post (the one containing the Quote button).
// Unless a post number has been selected with the mouse, we quote the
// the post to which the current post is in reply.

// If the desired post is not in memory, we will load the page that
// contains it in the background, while showing the progress bar.

function onQuoteClick()
{
    var button = this;
    if (selection) {
        var postNumbers = selection.match(/\d+/g);
        if (postNumbers) {
            hideQuote(button);
            quoteSelectedPostNumbers(button, postNumbers);
            return;
        }
    }
    if (button.value == 'Unquote') {
        hideQuote(button);
        return;
    }
    var postNumber = button.previousSibling.hash.substr(1);
    findAndQuotePost(button, postNumber);
}

// Finds and quotes each of a list of posts

function quoteSelectedPostNumbers(button, postNumbers)
{
    for (var x=0; x<postNumbers.length; ++x)
        findAndQuotePost(button, postNumbers[x]);
}

// Finds and quotes a given post. Runs right away if the desired post
// is in memory. Otherwise, it loads the page containing the post in
// the background before continuing.

function findAndQuotePost(button, postNumber)
{
    if (findPost(postNumber))
        quotePost(button, postNumber);
    else {
        disable(button, 'Waiting ...');
        var l = window.location;
        var url = l.protocol + '//' + l.hostname + l.pathname +
                    '?page=' + postNumber + '#' + postNumber;
        loadLink(url, function() {
            quotePost(button, postNumber);
        });
        button.disabled = false;
    }
}

// Looks for the post in the posts index. If there is no posts index,
// we build one for the current page. Returns undefined if not found.

function findPost(postNumber)
{
    hideProgress();
    if (!posts)
        indexPosts(originalHTML);
    return posts[postNumber];
}

// Copies the post to be quoted into a box above the post containing
// the Quote button.

function quotePost(button, postNumber)
{
    var post = findPost(postNumber);
    post = post || '<b>Unable to retrieve post #' + postNumber + '.</b>';
    var div = button.ownerDocument.createElement('div');
    div.className = 'quoteBox';
    div.innerHTML = post;
    addQuoteButtons(div);
    removeBlankLines(div);
    fixToLink(div);
    localizeDates(div);
    var anchorDiv = findAnchorDiv(button);
    if (anchorDiv.className != 'postBox')
        anchorDiv.parentNode.insertBefore(div, anchorDiv);
    else
        anchorDiv.insertBefore(div, anchorDiv.firstChild);
    button.value = 'Unquote';
    window.scrollBy(0, div.offsetHeight);
}

// Ensures that a quoted post's To link will work in its possibly
// new context.

function fixToLink(div)
{
    var link = $xFirst('div[@class="n2"]/a[contains(., "To ")]', div);
    if (link) {
        var postNumber = link.hash.substr(1);
        if (document.anchors.namedItem(postNumber))
            return;
        link.href = 'posts?page=' + postNumber + '#' + postNumber;
    }
}

// Figures out where to put the quote box.

function findAnchorDiv(node)
{
    var p = node.parentNode;
    while (p.parentNode.tagName != 'BODY' && p.parentNode.id != 'posts')
        p = p.parentNode;
    do {
        p = p.previousSibling;
    } while (p && p.tagName != 'A');
    do {
        p = p.nextSibling;
    } while (p && p.tagName != 'DIV');
    return p;
}

// Hides a quoted post and scrolls the window to avoid disorienting
// the user.

function hideQuote(button)
{
    if (button.value != 'Unquote')
        return;
    var maxScroll = window.scrollMaxY - window.scrollY;
    var totalHeight = 0;
    button.value = 'Quote';
    var quotedPost = button;
    var gp = quotedPost.parentNode.parentNode;
    if (gp.tagName != 'DIV' || gp.className != 'quoteBox')
        quotedPost = quotedPost.parentNode;
    else
        quotedPost = gp;
    do {
        quotedPost = quotedPost.previousSibling;
    } while (quotedPost && quotedPost.className != 'quoteBox');
    do {
        totalHeight += quotedPost.offsetHeight;
        var sibling = quotedPost.previousSibling;
        quotedPost.parentNode.removeChild(quotedPost);
        quotedPost = sibling;
    } while (quotedPost && quotedPost.tagName == 'DIV');
    window.scrollBy(0, -(totalHeight<maxScroll ? totalHeight : maxScroll));
}

// Locates the quote button in a quote box.

function findQuoteButton(quoteDiv)
{
    return $xFirst('div[@class="n2"]/input[@class="quoteButton"]', quoteDiv);
}

// -----------------------------------------------------------------------------

// Constructs an object to keep track of the data about a poster in
// the thread (for the Poster Report).

function Poster(key, name, age, serial)
{
    this.key = key;                // To construct home page link
    this.name = name;              // Display name
    this.sortKey = name.toLowerCase();
    this.age = age >= 0 ? age : 0; // How long on FR?
    this.serial = serial;          // Order of first appearance on thread
    this.postCount = 0;
    this.replyCount = 0;
}

Poster.makeHeader = function(s)
{
    s += '<tr>';
    s += '<th class=numh>Rank</th>';
    s += '<th>Poster</th>';
    s += '<th class=numh>FR<br>Age</th>';
    s += '<th class=numh>Posts</th>';
    s += '<th class=numh>Replies</th>';
    s += '<th class=numh>Replies<br>per Post</th>';
    s += '</tr>\n';
    return s;
}

Poster.prototype.calcReplyRatio = function()
{
    this.replyRatio = this.replyCount / this.postCount;
    return this.replyRatio;
}

// Generates the HTML for a row of the Poster Report.

Poster.prototype.makeRow = function(s, n)
{
    s += '<tr><td class=num>' + n + '</td>';
    s += '<td><a href="http://www.freerepublic.com/~' + this.key + '/"' +
         ' target="_blank">';
    if (this.isOriginalPoster)
        s += '<b>';
    s += this.name;
    if (this.isOriginalPoster)
        s += '</b>';
    s += '</a></td>'
    s += '<td class=num>' + formatAge(this.age) + '</td>';
    s += '<td class=num>' + this.postCount + '</td>';
    s += '<td class=num>' + this.replyCount + '</td>';
    s += '<td class=num>' + (this.calcReplyRatio()).toFixed(1) + '</td>';
    s += '</tr>\n'
    return s;
}

function formatAge(age)
{
    age /= 86400000;
    if (age > 360)
        return (age/365.25).toFixed(1) + 'y';
    if (age > 60)
        return (age/30).toFixed(1) + 'm';
    if (age > 21)
        return (age/7).toFixed(1) + 'w';
    return age.toFixed() + 'd';
}

var posters;            // Table of Poster objects, accessed by name
var posterList;         // Sortable array (contents of posters)
var posterWindow;       // Window into which to write poster report
var removedPostCount;   // Count of admin-removed posts

// Handles a click on the Poster Report button (or Ctrl-Alt-R).

function onPosterReportClick(event, button)
{
    button = button || this;
    disable(button, 'Waiting ...');
    disable('treeButton');
    openPosterWindow();
    window.setTimeout(function() {indexThread(button, makePosterReport)}, 0);
}

// Opens the poster report window. Must run in response to the user
// click, not the multipage load completion, or else the popup will
// be blocked (unless the user has added FR to the exception list).

function openPosterWindow()
{
    if (!posterWindow || posterWindow.closed)
        posterWindow = window.open('about:blank', 'posterReport');
    if (posterWindow) {
        posterWindow.blur();
        window.focus();
    }
}

// Builds the table of posters. Runs thru the posts index and the
// replies and accumulates stats about each poster in his or her
// Poster object.

function makePosterReport(ok)
{
    if (!ok) {
        enableAfterPosterReport();
        return;
    }
    var startDate = new Date();
    var now = new Date().getTime();
    posters = {};
    removedPostCount = 0;
    var regexp = new RegExp('<a href="/(?:%7E|~)([^/]*)/" title="' +
                        'Since (\\d\\d\\d\\d-\\d\\d-\\d\\d)">([^<]*)</a>', 'i');
    var list = [];
    for (var postNumber in posts)
        list.push(postNumber);
    list.sort(function(a, b) {return a-b;});
    for (var x=0, limit=list.length; x<limit; ++x) {
        var postNumber = list[x];
        var r = regexp.exec(posts[postNumber]);
        if (!r) {
            ++removedPostCount;
            continue;
        }
        var name = r[3];
        var poster = posters[name];
        if (!poster) {
            var date = Date.parse(r[2].replace(/-/g, '/') + ' GMT');
            poster = new Poster(r[1], name, now - date, x);
            posters[name] = poster;
            poster.isOriginalPoster = postNumber == 1;
        }
        ++poster.postCount;
        var replyList = replies[postNumber];
        if (replyList)
            poster.replyCount += replyList.length;
    }
    sortPostersBy('serial', false);
    try {
        showPosters();
    }
    catch(e) {
        alert("Error: " + e);
    }
    logTime(startDate, 'show the poster report on ' +
                 posterList.length + ' posters');
    enableAfterPosterReport();
}

function enableAfterPosterReport()
{
    enable('posterReport', 'Poster Report');
    enable('treeButton');
}

makePosterReport.title = 'poster report';

// Displays the Poster Report in a popup window.

function showPosters()
{
    if (!posterWindow)
        return;
    var s = '<html><head><title>Poster Report</title>\n' +
            '<style>' +
            'table {border-collapse:collapse;' +
                   'border:1px solid #00f;}' +
            'td, th {border:1px inset #ccf;padding-left:3px;padding-right:3px}' +
            'th {cursor:pointer;background:#ffc;vertical-align:bottom}' +
            'h2 {color:darkred}' +

            '.numh {text-align:right}' +
            '.num {text-align:right;font:bold smaller monospace}\n' +
            '</style>\n' +
            '</head><body>\n' +
            '<h2>' + document.title + '</h2>\n' +
            '<h3>Poster Report</h3>\n';
    s += '<table>\n';
    s = Poster.makeHeader(s);
    var n = 0;
    var postCount = 0;
    for (var x=0, limit=posterList.length; x<limit; ++x) {
        var poster = posterList[x];
        s = poster.makeRow(s, ++n);
        postCount += poster.postCount;
    }
    s += '</table>\n';
    s += '<br>' + postCount + ' total posts, by ' + posterList.length +
            ' distinct posters. ' + (postCount/posterList.length).toFixed(1) +
            ' average posts per poster.\n';
    if (removedPostCount) {
        s += '<br>' + removedPostCount + ' post' +
             (removedPostCount == 1 ? ' was' : 's were') + ' removed.';
    }
    s += '<br>Average poster seniority: ' + formatAge(averageAge()) + '.';
    var div = posterWindow.document.createElement('div');
    div.innerHTML = s;
    var b = posterWindow.document.body;
    var oldDiv = b.firstChild;
    b.appendChild(div);
    if (oldDiv)
        b.removeChild(oldDiv);
    var xp = $x('.//th', posterWindow.document.body);
    for (var x=0, limit=xp.snapshotLength; x<limit; ++x)
        xp.snapshotItem(x).addEventListener('click', onHeaderClick, false);
    posterWindow.focus();
}

function averageAge()
{
    var total = 0;
    for (var x=0, limit=posterList.length; x<limit; ++x)
        total += posterList[x].age;
    return total / limit;
}

// Receives control when the user clicks on a table header in the Poster
// Report. Sorts the table by the selected column (or simply reverses it
// if it's already sorted by that column). Then redisplays the report.

function onHeaderClick()
{
    var text = this.innerHTML;
    var parm = ['serial', false];
    if (/Poster/.test(text))
        parm = ['sortKey', false];
    else if (/Age/.test(text))
        parm = ['age', true];
    else if (/Posts/.test(text))
        parm = ['postCount', true];
    else if (/Replies$/.test(text))
        parm = ['replyCount', true];
    else if (/per Post/.test(text))
        parm = ['replyRatio', true];
    if (parm[0] == posterList.property)
        posterList.reverse();
    else
        sortPostersBy(parm[0], parm[1]);
    showPosters();
}

// Sorts the posters by the indicated Poster object property, in
// ascending or descending order.

function sortPostersBy(property, backwards)
{
    posterList = [];
    posterList.property = property;
    for (name in posters)
        posterList.push(posters[name]);
    posterList.sort(comparator);

    function comparator(a, b) {
        var r;
        if (a[property] > b[property])
            r = 1;
        else if (a[property] < b[property])
            r = -1;
        else if (a.sortkey > b.sortKey)
            return 1;
        else if (a.sortKey < b.sortKey)
            return -1;
        else
            return 0;
        if (backwards)
            r = -r;
        return r;
    }
}

// -----------------------------------------------------------------------------

function $(id) {return document.getElementById(id);}

function $x(xpath, contextNode, resultType)
{
    contextNode = contextNode || document.body;
    resultType = resultType || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
    var doc = contextNode.ownerDocument; // FF3; can't just use document
    return doc.evaluate(xpath, contextNode, null, resultType, null);
}

function $xFirst(xpath, contextNode)
{
    var xpr = $x(xpath, contextNode, XPathResult.FIRST_ORDERED_NODE_TYPE);
    return xpr.singleNodeValue;
}

// Disables a button and sets its text to the supplied string.

function disable(button, msg)
{
    if (typeof button == 'string')
        button = $(button);
    if (msg)
        button.value = msg;
    button.disabled = true;
}

// Enables a button and sets its text to the supplied string.

function enable(button, msg)
{
    if (typeof button == 'string')
        button = $(button);
    if (msg)
        button.value = msg;
    button.disabled = false;
}

// Adds the style rules defined in the STYLE constant to the page.

function addStyles()
{
    var style = document.createElement('style');
    style.innerHTML = STYLE;
    document.getElementsByTagName('head')[0].appendChild(style);
}

// Makes the link to the article to be discussed go directly to the
// article without pausing and redirecting.

function fixArticleRedirect()
{
    var link = $xFirst('.//a[starts-with(@href, "/^")]');
    if (link)
        link.href = link.href.replace(/^.*?\%5E/, '');
}

// Removes those extra blank lines that seem to crop up at the end
// of certain posts.

function removeBlankLines(doc)
{
    var list = $x('.//br[@clear="all"]', doc);
    for (var x=0, limit=list.snapshotLength; x<limit; ++x) {
        var br = list.snapshotItem(x);
        br.parentNode.removeChild(br);
    }
}

// Converts posting date stamps from Pacific to local time.

function localizeDates(doc)
{
    var list = $x('.//span[@class="date"]', doc);
    for (var x=0, limit=list.snapshotLength; x<limit; ++x) {
        var date = list.snapshotItem(x);
        date.innerHTML = new Date(date.innerHTML).toLocaleString();
    }
}

// Adds a Quote button next to the To link in each post having one.

function addQuoteButtons(doc)
{
    var quoteButtonModel = document.createElement('input');
    quoteButtonModel.className = 'quoteButton';
    quoteButtonModel.type = 'button';
    quoteButtonModel.value = 'Quote';

    var xp = $x('.//div[@class="n2"]/a[contains(., "To ")]', doc);
    for (var x=0, limit=xp.snapshotLength; x<limit; ++x) {
        var link = xp.snapshotItem(x);
        if (/^To \d+$/.test(link.innerHTML)) {
            var quoteButton = quoteButtonModel.cloneNode(true);
            quoteButton.addEventListener('mousedown', onQuotePress, false);
            link.parentNode.insertBefore(quoteButton, link.nextSibling);
        }
    }
}

// Adds the Tree View and Poster Report buttons at the top of the page,
// next to the 'comments' link.

function addButtons()
{
    var node = $xFirst('//a[contains(@href, "#comment")]');
    node.innerHTML += '&nbsp;<input type=button value="View as Tree" ' +
                      'id=treeButton title="Ctrl-Alt-T">';
    var span = document.createElement('span');
    span.innerHTML = ' <input type=button value="Poster Report" ' +
                     'id=posterReport title="Ctrl-Alt-R">';
    node.parentNode.appendChild(span);

    $('treeButton').addEventListener('click', onTreeViewClick, false);
    $('posterReport').addEventListener('click', onPosterReportClick, false);
}

// Installs a keystroke event handler to catch the keyboard shortcuts
// for the Tree View and the Poster Report.

function addKeys()
{
    window.addEventListener('keypress', onKeyPress, false);
}

// Adds a blue box at the end of the page, in which to write debugging
// messages.

function addLogBox()
{
    var div = document.createElement('div');
    div.id = 'logBox';
    document.body.appendChild(div);
}

// Writes a log message into the log box at the bottom of the page.

function log(msg)
{
    var logBox = $('logBox');
    var html = logBox.innerHTML;
    if (html)
        html += '<br>\n';
    logBox.innerHTML = html + msg;
}

// Logs the time it took to perform a given task.

function logTime(startTime, task)
{
    var time = new Date() - startTime;
    var s = 'It took ' + time + ' ms to ' + task;
    if (posts) {
        var n = posts.length - 1;
        s += ' for ' + n + ' posts; ' + (time/n).toFixed(2) +
                    ' ms/post';
    }
    log(s + '.');
}

// Scrolls the window to the internal anchor indicated by the 'hash'.

function fixLocation()
{
    location.hash = location.hash;
}

// -----------------------------------------------------------------------------

// Main program ...

var startTime = new Date();

var originalHTML = document.body.innerHTML;

addStyles();
addLogBox();
fixArticleRedirect();
removeBlankLines(document.body);
addQuoteButtons(document.body);
addButtons();
addKeys();

logTime(startTime, 'prepare the page');

// Try to correct positioning error when going to internal anchors.
if (location.hash) {
    fixLocation();
    document.body.addEventListener('load', fixLocation, false);
    window.setTimeout(fixLocation, 500);
}
