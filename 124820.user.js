// ==UserScript==
// @name        Empornium Quick Thumbnail Preview
// @namespace   https://github.com/LenAnderson/
// @downloadURL https://github.com/LenAnderson/Empornium-Quick-Thumbnail-Preview/raw/master/empornium_quick_thumbnail_preview.user.js
// @version     0.9
// @include     http://torrents.empornium.me/torrents.php*
// @include     http://torrents.empornium.me/user.php*
// @include     http://torrents.empornium.me/collages.php?id*
// @include     http://pornbay.org/torrents.php*
// @include     http://pornbay.org/user.php*
// @include     http://torrents.empornium.me/top10.php*
// ==/UserScript==
(function() {
    var keepVisible = false;
    var visible = false;
    var pageX = 0;
    var pageY = 0;
    var cursorOffsetX = 10;
    var cursorOffsetY = 5;
    var container;
    var link;
    var id;
    var cache = [];
    var picNo = 0;
    var trigger;
    var blacklist = [
        'http://xxx.freeimage.us/image.php?id=AE7D_4F2C0321',
        'http://xxx.freeimage.us/image.php?id=F640_4F36C6E1&gif',
        'http://blackassfest.info/image-share/images/86448733429600273768.png',
        'http://blackassfest.info/image-share/images/26006961220243660207.png',
        'http://blackassfest.info/image-share/images/89009049707335146654.png',
        'http://blackassfest.info/image-share/images/48429454526199578795.png',
        'http://blackassfest.info/image-share/images/35849877455159463440.jpg',
        'http://ist1-2.filesor.com/pimpandhost.com/5/9/8/7/59874/X/D/S/g/XDSg/lordzilla_Sign%20Off%20Banner_3_Rounded.jpg',
        'http://hostingb.hotchyx.com/adult-image-hosting-th-07/3561cookie-monster-wtf-is-this.jpg',
        'http://ist1-4.filesor.com/pimpandhost.com/1/_/_/_/1/x/7/9/8/x798/ecg1.jpg',
        'http://xxx.freeimage.us/image.php?id=49D1_4F3DBD85',
        'http://i.imgur.com/HfgqI.jpg',
        'http://funkyimg.com/u2/1284/945/846226sig-EMP2.jpg',
        'http://xxx.freeimage.us/image.php?id=7183_4F2851AC&jpg'
    ];
    var imgCache = [];
    
    function updatePositions() {
        container.style.top = (pageY+container.img.offsetHeight<=window.innerHeight?
                               pageY+cursorOffsetY :
                              window.innerHeight-container.img.offsetHeight - 4)+"px";
        container.style.left = (pageX+cursorOffsetX)+"px";
        container.img.style.maxHeight = (window.innerHeight - 4) + "px";
        container.img.style.maxWidth = (window.innerWidth - 4 - (pageX+cursorOffsetX)) + "px";
    }
    
    function showContainer() {
        visible = true;
        container.className = '';
        trigger.className = 'eqtp_trigger';
    }
    
    function hideContainer() {
        visible = false;
        container.className = 'eqtp_hidden';
        trigger.className = '';
    }
    
    function loadPic() {
        container.img.className = 'eqtp_hidden';
        container.loading.className = '';
        updatePositions();
        if (cache[link]['imagesc'][picNo%cache[link]['images'].length] !== undefined) {
            container.replaceChild(cache[link]['imagesc'][picNo%cache[link]['images'].length], container.img);
            container.img = cache[link]['imagesc'][picNo%cache[link]['images'].length];
            showPic();
            updatePositions();
        } else {
            var img = container.img.cloneNode(true);
            img.addEventListener('load', loadListener, false);
            container.replaceChild(img, container.img);
            container.img = img;
            container.img.src = '';
            container.img.src = cache[link]['images'][picNo%cache[link]['images'].length];
            cache[link]['imagesc'][picNo%cache[link]['images'].length] = container.img;
        }
    }
    function showPic() {
        container.img.className = '';
        container.loading.className = 'eqtp_hidden';
    }
    
    function getId() {
        return link.replace(/^.+id=(\d+).*$/i, '$1');
    }
    
    function downloadTorrent() {
        if (GM_getValue('_EQTP_AUTO_THANKS') == null || GM_getValue('_EQTP_AUTO_THANKS')) {
            sendThanks();
        }
        if (GM_getValue('_EQTP_AUTO_COMMENT')) {
            sendComment();
        }
        //location.href = "http://torrents.empornium.me/download.php?torrent=" + id;
        window.open(dlink);
    }
    
    function loadContainer(that) {
        var ttrigger = that;
        container.img.className = 'eqtp_hidden';
        container.loading.className = '';
        picNo = 0;
        link = getNextSibling(getAncestor(that, 'td'), 'td').getElementsByTagName('a')[1].href;
        dlink = getNextSibling(getAncestor(that, 'td'), 'td').getElementsByTagName('a')[0].href;
        var tlink = link;
        id = getId();
        if (cache[tlink] !== null && cache[tlink] !== undefined) {
            loadPic();
            return null;
        }
        var req = new XMLHttpRequest();
        req.open('GET', tlink, true);
        req.onreadystatechange = function() {
            if (req.readyState != 4)
                return null;
            var div = document.createElement('div');
            div.innerHTML = req.responseText;
            var divs = div.getElementsByTagName('div');
            var desc;
            for (var i=0;i<divs.length;i++) {
                if (divs[i].id.toLowerCase() == 'descbox') {
                    desc = divs[i];
                }
            }
            cache[tlink] = [];
            cache[tlink]['description_raw'] = desc?desc.innerHTML:'';
            cache[tlink]['images'] = [];
            cache[tlink]['imagesc'] = [];
            cache[tlink]['imglinks'] = [];
            cache[tlink]['auth'] = div.querySelector('input[name="auth"]').value;
            if (desc) {
                var imgs = desc.getElementsByTagName('img');
                for (var i=0;i<imgs.length;i++) {
                    if (imgs[i].src.search(/^http:\/\/torrents.empornium.me\//i) == -1 && blacklist.indexOf(imgs[i].src) == -1 && cache[tlink]['images'].indexOf(imgs[i].src) == -1) {
                        cache[tlink]['images'].push(resolveImgURL(imgs[i].src));
                        cache[tlink]['imglinks'].push(resolveImgLink(imgs[i]));
                    }
                }
            }
            if (cache[tlink]['images'].length == 0) {
                cache[tlink]['images'].push('data:image/gif;base64,R0lGODlhQABAAPf/ADMzM////5mZmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAQABAAAAI/wADCBxIsKDBgwgTKlzIsKHDhwoFSJxIsaLFixgzaqxIUADEjyAPehw4MqTJjyUDpDzJcmHKlS1jGnwps6bIjjZzksSpMyfNnjZ/ApUpdGjLokZPIk0acilTlDyfmnQq1SHVqgyvYo0YdetDrV5v7gz7tStZl2bPJgTLEEBBt0HTfgQAV2BdonIhuq0Ll67fuxDZLuxrt/BAwGXHnuQbgPDhqXkf3qVruDJUxSYB9/2L2GpktV1hEuRMlm3nqqZHc/Zrl3Rj16sRpn5cubNjw5Nlf7bMGDfs0a3/6saMMHdt3sgbN9T6+/hr4c9ZR6csVqDopKeHW38aO/F20GiJgzefuRu8YLXnz6YvXR70+rDvvcbfOh9rfdTt0edXv5+9+PGhAbhWf/ARKF9HGyWo4IIZCeigTgEBADs=');
            }
            if (link == tlink) {
                loadPic();
            }
        };
        req.send(null);
    }
    
    function openDetails() {
        location.href = link;
    }
    
    function openPic() {
        //window.open(cache[link]['images'][picNo%cache[link]['images'].length]);
        window.open(cache[link]['imglinks'][picNo%cache[link]['images'].length]);
    }
    
    function sendThanks() {
        var auth = cache[link]['auth'];
        var req = new XMLHttpRequest();
        //req.open('POST', 'http://torrents.empornium.me/torrents.php?action=thank', true);
        req.open('POST', '/torrents.php?action=thank', true);
        req.onreadystatechange = function() {
            if (req.readyState != 4)
                return null;
            container.thanks.className = '';
            window.setTimeout(function() { container.thanks.className = 'eqtp_hidden'; }, 2000);
        };
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send('groupid='+id+'&action=thank&auth='+auth);
    }
    
    function sendComment() {
        var comments = GM_getValue('_EQTP_AUTO_COMMENT_MESSAGE').split('|');
        var comment = comments[Math.floor(Math.random()*comments.length)];
        var auth = cache[link]['auth'];
        var req = new XMLHttpRequest();
        req.open('POST', '/torrents.php?id='+id, true);
        req.onreadystatechange = function() {
            if (req.readyState != 4)
                return null;
            container.thanks.className = '';
            window.setTimeout(function() { container.thanks.className = 'eqtp_hidden'; }, 2000);
        };
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        req.send('action=reply&auth='+auth+'&groupid='+id+'&body='+encodeURIComponent(comment));
    }
    
    function nextPage() {
        console.info('1');
        if (location.href.search(/page=\d+/i) > -1) {
            var page = location.href.replace(/.+page=(\d+).*/i, '$1');
            page++;
            location.href = location.href.replace(/page=\d+/i, 'page=' + page);
        } else {
            location.href = location.href.replace(/torrents.php\??/i, 'torrents.php?page=2&');
        }
    }
    
    function prevPage() {
        if (location.href.search(/page=\d+/i) > -1) {
            var page = location.href.replace(/.+page=(\d+).*/i, '$1');
            page--;
            if (page >= 0)
                location.href = location.href.replace(/page=\d+/i, 'page=' + page);
        }
    }
    
    function markVisited(evt) {
        var tag = evt.target.tagName.toLowerCase();
        if (tag != 'input' && tag != 'textarea' && tag != 'select') {
            evt.preventDefault();
            var href = location.href;
            history.replaceState({},"",link);
            history.replaceState({},"",href);
        }
    }
    
    /* ##################################################################
     *      LISTENERS
     * ##################################################################
     */
    function mouseOverListener(evt) {
        if (keepVisible)
            return null;
        trigger = this;
        showContainer();
        loadContainer(this);
    }
    function mouseOutListener(evt) {
        if (keepVisible)
            return null;
        hideContainer();
    }
    function clickListener(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        keepVisible = !keepVisible;
    }
    
    function clickAnywhereListener(evt) {
        if (!keepVisible)
            return null;
        evt.preventDefault();
        evt.stopPropagation();
        keepVisible = false;
        hideContainer();
    }
    function doubleClickListener(evt) {
        openDetails();
    }
    
    function mouseMoveListener(evt) {
        if (keepVisible)
            return null;
        pageX = evt.pageX;
        pageY = evt.pageY - document.body.scrollTop;
        updatePositions();
    }
    
    function mouseScrollListener(evt) {
        if (!visible)
            return null;
        evt.preventDefault();
        if (evt.wheelDeltaY > 0)
            picNo++;
        if (evt.wheelDeltaY < 0 && picNo > 0)
            picNo--;
        loadPic();
    }
    
    function keyUpListener(evt) {
        if (evt.ctrlKey) {
            switch(evt.keyCode) {
                case 39:
                    nextPage();
                    break;
                case 37:
                    prevPage();
                    break;
            }
        }
        if (!visible)
            return null;
        switch(evt.keyCode) {
            case 39:
                if (picNo+1 < cache[link]['images'].length) {
                    picNo++;
                    loadPic();
                }
                break;
            case 37:
                if (picNo > 0) {
                    picNo--;
                    loadPic();
                }
                break;
            case 17:
                if (GM_getValue('_EQTP_MANUAL_THANKS') == null || GM_getValue('_EQTP_MANUAL_THANKS')) {
                	sendThanks();
                }
                break;
            case 16:
                openPic();
                break;
            case 46:
                downloadTorrent();
                break;
            case 86:
                markVisited(evt);
                break;
        }
    }
    
    function loadListener(evt) {
        showPic();
        updatePositions();
    }
    /* ##################################################################
     *      /LISTENERS
     * ##################################################################
     */
    
    
    /* ##################################################################
     *      IMG-HOSTS
     * ##################################################################
     */
    function buildImgProxyUrl(phost, purl, preferer) {
        return 'http://eqtp.cwsurf.de/imghost.php?host=' + phost + '&url=' + purl + '&referer=' + preferer;
    }
    function resolveImgURL(url) {
        var host = resolveImgHost(url);
        if (host === null)
            return url;
        return host(url);
    }
    function resolveImgLink(img) {
        var el = getAncestor(img, 'a');
        if (el === null) return img.src;
        return el.href;
    }
    function resolveImgHost(url) {
        if (url.search(/^http:\/\/xxx.freeimage.us\/thumb.php\?id=/i) == 0)
            return resolveFreeimage;
        if (url.search(/funkyimg\.com\/t\d+\//i) > -1)
            return resolveFunkyimg;
        //if (url.search(/t\d+\.imgchili\.com/i) > -1)
        //    return resolveImgchili;
        if (url.search(/yourfreeporn\.us.+\d+small\.jpg$/i) > -1)
            return resolveYourfreeporn;
        //if (url.search(/img\d+\.imagetwist\.com\/th\//i) > -1)
        //    return resolveImagetwist;
        if (url.search(/^http:\/\/s\d+\.bo\.lt\/.+asset:version=\d+\/thumb_.+\.jpg$/i) > -1)
            return resolveBolt;
        //if (url.search(/thumb\.dumparump\.com/i) > -1)
        //    return resolveDumparump;
        //if (url.search(/img\d+\.piclambo\.net.+_t\.jpg$/i) > -1)
        //    return resolvePiclambo;
        return null;
    }
    function resolveFreeimage(url) {
        return url.replace(/^(http:\/\/xxx.freeimage.us\/)thumb(.php\?id=.+)$/i, '$1image$2');
    }
    function resolveFunkyimg(url) {
        return url.replace(/\/t(\d+)\//i, '/u$1/');
    }
    function resolveImgchili(url) {
        var phost = url.replace(/^http:\/\/t(\d+)\..+$/i, 'i$1.imgchili.com');
        var purl = url.replace(/^http:\/\/t\d+\.imgchili\.com(\/.+)$/i, '$1');
        var preferer = 'http://imgchili.com/show' + purl;
        return buildImgProxyUrl(phost, purl, preferer);
    }
    function resolveYourfreeporn(url) {
        return url.replace(/(\d+)small\.jpg$/i, '$1.jpg');
    }
    function resolveImagetwist(url) {
        /*'http://img4.imagetwist.com/i/01013/2p6yl2cimykc.jpg'
"http://img4.imagetwist.com/i/01013/2p6yl2cimykc.jpg"
'http://imagetwist.com/2p6yl2cimykc/FAE73TE.jpg.html'
"http://imagetwist.com/2p6yl2cimykc/FAE73TE.jpg.html"
'http://img4.imagetwist.com/th/01013/2p6yl2cimykc.jpg'*/
        var phost = url.replace(/^http:\/\/(img\d+\.imagetwist\.com).+$/i, '$1');
        var purl = url.replace(/^http:\/\/img\d+\.imagetwist\.com\/th\/(.+)$/i, '/i/$1');
        var preferer = url.replace(/^http:\/\/img\d+\.imagetwist\.com\/th\/[^\/]+\/(.+)\.jpg$/i, 'http://imagetwist.com/$1/');
        return buildImgProxyUrl(phost, purl, preferer);
    }
    function resolveBolt(url) {
        return url.replace(/^(http:\/\/s\d+\.bo\.lt\/.+asset:version=\d+\/)thumb_(.+\.jpg)$/i, '$1$2');
    }
    function resolveDumparump(url) {
        var phost = 'image.dumparump.com';
        var purl = url.replace(/^http:\/\/thumb\.dumparump\.com/i, '');
        var preferer = url.replace(/thumb\.dumparump\.com\/\d+\/(.+)\.jpg$/i, 'www.dumparump.com/view.php?id=$1');
        return buildImgProxyUrl(phost, purl, preferer);
    }
    function resolvePiclambo(url) {
        var phost = url.replace(/http:\/\/(img\d+\.)piclambo\.net.+$/i, '$1imageporter.com');
        var purl = url.replace(/(img\d+\.)piclambo\.net(.+)_t\.jpg$/i, '$1imageporter.com$2.jpg');
        var preferer = url.replace(/img\d+\.piclambo\.net\/i\/\d+\/(.+)_t\.jpg/i, 'piclambo.net/$1/.html');
        return buildImgProxyUrl(phost, purl, preferer);
    }
    /* ##################################################################
     *      /IMG-HOSTS
     * ##################################################################
     */
    
    
    /* ##################################################################
     *      MENU-COMMANDS
     * ##################################################################
     */
    function toggleAutoThanks() {
        var temp = !GM_getValue('_EQTP_AUTO_THANKS');
        GM_setValue('_EQTP_AUTO_THANKS', temp);
        alert(temp?
              'You will now automatically thank the uploader when you download a torrent with Empornium Quick Thumbnail Preview.' :
              'You will no longer automatically thank the uploader when you download a torrent with Empornium Quick Thumbnail Preview.');
    }
    function toggleManualThanks() {
        var temp = GM_getValue('_EQTP_MANUAL_THANKS');
        if (temp == null) temp = false;
        else temp = !temp;
        GM_setValue('_EQTP_MANUAL_THANKS', temp);
        alert(temp?
              'You can now use your [CTRL] key to send thanks to the uploader.' :
              'You can no longer use your [CTRL] key to send thanks to the uploader.');
    }
    
    function toggleAutoComment() {
        var temp = !GM_getValue('_EQTP_AUTO_COMMENT');
        GM_setValue('_EQTP_AUTO_COMMENT', temp);
        var msg = temp?
              'You will now automatically leave a comment when you download a torrent with Empornium Quick Thumbnail Preview.' :
              'You will no longer automatically leave a comment when you download a torrent with Empornium Quick Thumbnail Preview.';
        if (!temp) {
            alert(msg);
            return null;
        }
        msg += "\n\n";
        var comments = GM_getValue('_EQTP_AUTO_COMMENT_MESSAGE');
        if (comments.trim() != "")
            comments = comments.split("|");
        else
            comments = array("Thank you!");
        if (comments.length == 1)
            msg += "Your comment will be:\n";
        else
            msg += "Your comment will be one of the following:\n";
        for (var i=0;i<comments.length;i++) {
            msg += "\t" + comments[i] + "\n";
        }
        alert(msg);
    }
    
    function editAutoComment() {
        var temp = GM_getValue('_EQTP_AUTO_COMMENT_MESSAGE');
        temp = prompt("Please enter your comment.\nYou can enter several comments to be posted randomly by seperating them with |", temp);
        GM_setValue('_EQTP_AUTO_COMMENT_MESSAGE', temp);
    }
    /* ##################################################################
     *      /MENU-COMMANDS
     * ##################################################################
     */
    
    
    /* ##################################################################
     *      HELPERS
     * ##################################################################
     */
    function getAncestor(node, tagName) {
        if (node === null || node === undefined)
            return null;
        var el = node.parentNode;
        while (el !== null && el !== undefined && (el.tagName === null || el.tagName === undefined ||
               el.tagName.toLowerCase() != tagName.toLowerCase()))
            el = el.parentNode;
        if (el === null || el === undefined)
            return null;
        else return el;
    }
    function getNextSibling(node, tagName) {
        if (node === null || node === undefined)
            return null;
        var el = node.nextSibling;
        while (el !== null && el !== undefined && (el.tagName === null || el.tagName === undefined ||
               el.tagName.toLowerCase() != tagName.toLowerCase()))
            el = el.nextSibling;
        if (el === null || el === undefined)
            return null;
        else return el;
    }
    /* ##################################################################
     *      /HELPERS
     * ##################################################################
     */
    
    
    /* ##################################################################
     *      INIT
     * ##################################################################
     */
    function initListeners() {
        var trs = document.getElementsByClassName('cats_col');
        for (var i=0;i<trs.length;i++) {
            var trigger = trs[i].getElementsByTagName('img')[0];
            if (!trigger) continue;
            trigger.addEventListener('mouseover', mouseOverListener, false);
            trigger.addEventListener('mouseout', mouseOutListener, false);
            trigger.addEventListener('click', clickListener, false);
            trigger.addEventListener('dblclick', doubleClickListener, false);
            getAncestor(trigger, 'div').title = '';
        }
        document.addEventListener('click', clickAnywhereListener, false);
        document.addEventListener('mousemove', mouseMoveListener, false);
        document.addEventListener('keyup', keyUpListener, false);
        //document.addEventListener('mousewheel', mouseScrollListener, false);
        container.img.addEventListener('load', loadListener, false);
    }
    
    function initMenuCommands() {
        GM_registerMenuCommand('[EQTP] Toggle auto-thanks', toggleAutoThanks);
        GM_registerMenuCommand('[EQTP] Toggle manual-thanks', toggleManualThanks);
        GM_registerMenuCommand('[EQTP] Toggle auto-comment', toggleAutoComment);
        GM_registerMenuCommand('[EQTP] Edit auto-comment', editAutoComment);
    }
    
    function initGUI() {
        container = document.createElement('div');
        container.id = 'eqtp_container';
        container.className = 'eqtp_hidden';
        document.body.appendChild(container);
        
        var img = document.createElement('img');
        container.img = img;
        container.appendChild(img);
        
        var thanks = document.createElement('p');
        thanks.innerHTML = 'Thanks for the thanks!';
        thanks.id = 'eqtp_thanks';
        thanks.className = 'eqtp_hidden';
        container.thanks = thanks;
        container.appendChild(thanks);
        
        var loading = document.createElement('span');
        loading.innerHTML = 'Loading...';
        loading.className = 'eqtp_hidden';
        container.loading = loading;
        container.appendChild(loading);
    }
    
    function initStyle() {
        var style = document.createElement('style');
        style.innerHTML = '\
#eqtp_container {\
position: fixed;\
border: 2px solid black;\
background: white;\
z-index: 1000;\
}\
\
.eqtp_hidden {\
display: none;\
}\
#eqtp_container > img {\
max-height: 100%;\
max-width: 100%;\
}\
\
#eqtp_thanks {\
font-size: 20px;\
font-weight: bold;\
color: silver;\
position: absolute;\
top: 0;\
left: 0;\
width: 100%;\
background: rgba(0,0,0,0.5);\
}\
\
.torrent_table a img.eqtp_trigger {\
border: 5px solid rgba(2, 97, 163, 1);\
width: 40px;\
height: 40px;\
}';
        document.body.appendChild(style);
    }
    
    function init() {
        initStyle();
        initGUI();
        initListeners();
        initMenuCommands();
        console.info(GM_getValue('_EQTP_AUTO_COMMENT'));
        console.info(GM_getValue('_EQTP_AUTO_COMMENT_MESSAGE'));
        console.info(GM_getValue('_EQTP_AUTO_THANKS'));
    }
    /* ##################################################################
     *      /INIT
     * ##################################################################
     */
    init();
})();