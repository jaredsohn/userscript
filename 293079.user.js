// ==UserScript==
// @name           E-Hentai Automated Downloads
// @description    Automates downloads through the Doggie Bag Archiver
// @include        http://g.e-hentai.org/*
// @include        http://exhentai.org/*
// @include        http://*/*automatedEHDL=*
// @run-at         document-start
// @version        1.1.2
// ==/UserScript==

var automating = (window.location.href.indexOf('automatedEHDL') != -1);

var addMetadata = function(url,metadata) {
    return url +
        (url.indexOf('?') != -1 ? '&' : '?') + 'automatedEHDL=' + metadata.nonce +
        '&automatedTorrent=' + (metadata.isTorrent ? 1 : 0);
};
       
var getMetadata = function(url) {
    var metadata = url.match(/automatedEHDL=(\d+).*automatedTorrent=(\d)/);
    return { nonce: metadata[1], isTorrent: metadata[2] == '1' };
};

if (automating) {

    var clear = function() { for (var i=0;i<10;++i) clearTimeout(i); };
    var abort = function(reason) { parent.postMessage({ success: false, nonce: metadata.nonce, reason: reason },'*'); };

    var metadata = getMetadata(window.location.href), target;

    if (window.location.href.indexOf('archive') != -1)
        document.addEventListener('DOMSubtreeModified',clear,false);

    var onLoad = function() {

        for (var i=0;i<100;++i) clearTimeout(i);

        target = document.evaluate('.//a[starts-with(text(),"' + (metadata.isTorrent ? 'Torrent' : 'Archive') + ' Download")]',document,null,9,null).singleNodeValue;
        if (target !== null) {
            if (metadata.isTorrent && /\( 0 \)/.test(target.innerHTML)) abort('could not find any torrent');
            else {
                var url = target.getAttribute('onclick').match(/'(.+?)'/)[1];
                window.location.replace(addMetadata(url,metadata));
            }
            return;
        }

        // download confirmation popup
        target = document.evaluate('.//input[@value="Download Archive"]',document,null,9,null).singleNodeValue;
        if (target !== null) {
            target.parentNode.parentNode.action = addMetadata(target.parentNode.parentNode.action,metadata);
            target.click();
            return;
        }

        // server location popup
        target = document.evaluate('.//script[contains(text(),"gotonext")]',document,null,9,null).singleNodeValue;
        if (target !== null) {
            var url   = target.innerHTML.match(/document.location = "(.+?)"/)[1];
            var delay = target.innerHTML.match(/(\d+)\)/)[1];
            document.removeEventListener('DOMSubtreeModified',clear,false);
            setTimeout(function() { window.location.replace(addMetadata(url,metadata)); },parseInt(delay,10));
            return;
        }
        
        // download ready popup
        target = document.evaluate('.//a[text()="Click Here To Start Downloading"]',document,null,9,null).singleNodeValue;
        if (target !== null) {
            parent.postMessage({ success: true, nonce: metadata.nonce, url: target.href },'*');
            return;
        }

        // torrent page
        target = document.evaluate('.//input[@name="torrent_info"]',document,null,9,null).singleNodeValue;
        if (target != null) {
            var targets = Array.prototype.slice.call(document.querySelectorAll('[name="gtid"] + table'),0);
            targets = targets.map(function(x) {
                var link = x.querySelector('a').href;
                var data = x.textContent.match(/Seeds:\s*(\d+)(?:.|\n)*Peers:\s*(\d+)/);
                return { link: link, seeds: parseInt(data[1],10), peers: parseInt(data[2],10) };
            });
            targets = targets.sort(function(a,b) { return b.seeds - a.seeds; });
            if (targets.length == 0) abort('could not find any torrent');
            else if (targets[0].seeds == 0) abort('could not find any seeded torrent');
            else parent.postMessage({ success: true, nonce: metadata.nonce, url: targets[0].link },'*');
            return;
        }

        // we really shouldn't be here
        abort('No viable option found. Perhaps you're not logged in?\nCurrent URL: ' + window.location.href);

    };

    if (document.readyState == 'complete') onLoad();
    else window.addEventListener('load',onLoad,false);

} else {

    var targets = { };

    var loadingGIF =
        'R0lGODlhEgASAMQaAHl5d66urMXFw3l5dpSUk5WVlKOjoq+vrsbGw6Sko7u7uaWlpbm5t3h4doiIhtLSz4aGhJaWlsbGxNHRzrC' +
        'wr5SUkqKiobq6uNHRz4eHhf///wAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAaACwAAAAAEgASAAAFaq' +
        'AmjmRplstyrkmbrCNFaUZtaFF0HvyhWRZNYVgwBY4BEmFJOB1NlYpJoYBpHI7RZXtZZb4ZEbd7AodFDIYVAjFJJCYA4ISoI0hyu' +
        'UnAF2geDxoDgwMnfBoYiRgaDQ1WiIqPJBMTkpYaIQAAIfkEBQoAGgAsAQABABAAEAAABWSgJo4aRZEoeaxHOiqKFsyBtizopV9y' +
        'nfwJ0o43MhgNKAYjZbGQJBLXKBLRIK4IaWFbEHgFUoKYoPFKRZUK6fFIORwojBxDytgzpDkdANDc8SQTExp8fBoQEGcDiwNnJA0' +
        'NLiEAACH5BAUKABoALAEAAQAQABAAAAVloCaOmqKQKHmtVzpKksa2FIUiOKIxjHb8B5JgKCAFjgHUMHUkPR6u0WKhwVgx0YQ2cc' +
        'W6DGCDZjKJiiwWEgCQikRQ6zWpQC+QBviBxuHQEP4EKA0NGhmGGRoVFWaHiGYjEBAuIQAAIfkEBQoAGgAsAQABABAAEAAABWSgJ' +
        'o6aJJEoiaxIOj6PJsyCpigopmNyff0X0o43AgZJk0mKwSABAK4RhaJ5PqOH7GHAHUQD4ICm0YiKwCSHI7VYoDLwDClBT5Di8khE' +
        'Y+gbUBAQGgWEBRoWFmYEiwRmJBUVLiEAACH5BAUKABoALAEAAQAQABAAAAVloCaO2vOQKImtWDoCgMa2koTCsDZNGuIjpIFwQBI' +
        'YBahGI2UkORyukUKhyVgz0Yv2csW6thcNBBIVMRikSCRFoaAK8ALpQD+QCHiCZrHQBP4BKBUVGgmGCX6BUQaMBmUkFhYuIQAAIf' +
        'kEBQoAGgAsAQABABAAEAAABWagJo4aAJAoaZrp6DjaIA/a86BZnmlNo2FADEm3GwWFJAgkNZmQIpHWSCLRFK4FKWKLIHgJUoFYo' +
        'KlUpCIxabFIKRSohDxButgvJIPeoKFQNHd4JBYWGgeHBxoMDGgBjgFoJI4tIQAAIfkEBQoAGgAsAQABABAAEAAABWSgJo6a45Ao' +
        'ma1ZOkaRxrYAgBZ4oUGQVtckgpBAGhgHqEol1WiQFgvX6PHQJK4JKWaLMXgNWq7GYpGKJhMShZKSSFCH+IGEqCNIgXxAo1BoBIA' +
        'CKHkaF4YXf4JSh4hmIwwMLiEAACH5BAUKABoALAEAAQAQABAAAAVloCaOWhSRKFmsRToui0bMhOY4aKInWlVpmWCGZCgaSMIhyW' +
        'JJQSAkCsU1AgA0h+yBarUGvgHqYDzQfKmiRoOkUKQeD9RlfiFh7hgSvS6RaPB5JAwMGgiGCBoTE2gCjQJoJI0uIQAAOw==';

    var icons = {
        download : 'M8.037,11.166L14.5,22.359c0.825,1.43,2.175,1.43,3,0l6.463-11.194c0.826-1.429,0.15-2.598-' +
            '1.5-2.598H9.537C7.886,8.568,7.211,9.737,8.037,11.166z',
        torrent  : 'M22.404,13.585c0-5.319-4.313-9.631-9.632-9.631c-5.32,0-9.632,4.313-9.632,9.631c0,4.1,2.5' +
            '67,7.593,6.177,8.982l-1.818-8.45l-0.514-2.388L6.075,7.505L9.6,6.746l1.303,6.059c0.352,1.636,1.0' +
            '94,2.514,2.316,2.25c0.967-0.208,1.377-0.995,1.487-1.597c0.049-0.228,0.013-0.51-0.047-0.786l-1.4' +
            '43-6.705L16.74,5.21l1.646,7.651c0.662,3.077,2.454,3.548,2.454,3.548s-2.419,0.521-3.433,0.738c-1' +
            '.012,0.219-1.694-1.591-1.694-1.591l-0.07,0.015c-0.288,0.785-0.613,2.06-3.127,2.602c-0.184,0.039' +
            '-0.364,0.064-0.542,0.083l1.064,4.948C18.232,23.063,22.404,18.814,22.404,13.585z',
        picker   : 'M22.727,18.242L4.792,27.208l8.966-8.966l-4.483-4.484l17.933-8.966l-8.966,8.966L22.727,18.242z',
        done     : 'M2.379,14.729 5.208,11.899 12.958,19.648 25.877,6.733 28.707,9.561 12.958,25.308z'
    };

    var getIcon = function(name,color) {
        return 'url("data:image/svg+xml,<svg viewBox=\'0 0 30 30\' preserveAspectRatio=\'true\' xmlns=\'http' +
            '://www.w3.org/2000/svg\'><path fill=\'' + color + '\' d=\'' + icons[name] + '\'/></svg>")';
    };

    var createButton = function(data) {
        var result = document.createElement(data.hasOwnProperty('type') ? data.type : 'a');
        if (data.hasOwnProperty('class')) result.className = data.class;
        if (data.hasOwnProperty('title')) result.title = data.title;
        if (data.hasOwnProperty('onClick')) result.addEventListener('click',data.onClick,false);
        if (data.hasOwnProperty('parent')) data.parent.appendChild(result);
        if (data.hasOwnProperty('target')) result.setAttribute('target',data.target);
        if (data.hasOwnProperty('style'))
            result.style.cssText = Object.keys(data.style).map(function(x) { return x + ': ' + data.style[x] + 'px'; }).join('; ');
        return result;
    };

    var start = function() {

        // button generation (thumbnail list)
        var thumbnails = document.querySelectorAll('.id3 > a'), n = thumbnails.length;
        while (n --> 0) {
            var bottom = Math.max(0,parseInt(thumbnails[n].parentNode.style.height,10) - thumbnails[n].firstChild.height);
            var right  = Math.max(0,0.5 * (200 - thumbnails[n].firstChild.width));
            createButton({ class: 'automatedButton downloadLink', title: 'Automated download', target: thumbnails[n].href,
                style: { bottom: bottom, right: right }, onClick: requestDownload, parent: thumbnails[n] });
            createButton({ class: 'automatedButton torrentLink', title: 'Torrent download', target: thumbnails[n].href,
                style: { bottom: bottom, left: 1 }, onClick: requestDownload, parent: thumbnails[n] });
        }

        // button generation (gallery)
        var bigThumbnail = document.querySelector('#gd1 > img');
        if (bigThumbnail !== null) {
            var bottom = bigThumbnail.parentNode.parentNode.clientHeight - bigThumbnail.offsetTop - bigThumbnail.height - 1;
            var right  = bigThumbnail.parentNode.parentNode.clientWidth - bigThumbnail.offsetLeft - bigThumbnail.width - 2;
            var left   = bigThumbnail.offsetLeft + 1;
            createButton({ class: 'automatedButton downloadLink', title: 'Automated download', target: window.location.href,
                style: { bottom: bottom, right: right }, onClick: requestDownload, parent: bigThumbnail.parentNode });
            createButton({ class: 'automatedButton torrentLink', title: 'Torrent download', target: window.location.href,
                style: { bottom: bottom, left: left }, onClick: requestDownload, parent: bigThumbnail.parentNode });
        }

        // button generation (row list)
        var rows = document.querySelectorAll('.it5 > a'), n = rows.length;
        while (n --> 0) {
            var div = createButton({ type: 'div', class: 'automatedPicker', onClick: requestDownload, parent: rows[n].parentNode });
            var picker = createButton({ type: 'div', parent: div });
            createButton({ type: 'div', class: 'automatedInline torrentLink', title: 'Torrent download', 
                target: rows[n].href, parent: picker });
            createButton({ type: 'div', class: 'automatedInline downloadLink', title: 'Automated download',
                target: rows[n].href, parent: picker });
        }

        // message listener
        window.addEventListener('message',function(message) {
            var data = message.data;
            if (!targets.hasOwnProperty(data.nonce)) return;
            document.body.removeChild(targets[data.nonce][1]);
            if (data.success) targets[data.nonce][0].className = targets[data.nonce][0].className.replace(/working/,'requested');
            else targets[data.nonce][0].className = targets[data.nonce][0].className.replace(/\s?working/,'');
            if (data.success) window.location.replace(data.url);
            else alert('Something went wrong. Reason: ' + data.reason);
        },false);

        // document style
        var style = document.createElement('style');
        style.innerHTML =
            '.automatedButton { display: none; position: absolute; text-align: left; cursor: pointer; padding: 8px;' +
                'color: white; margin-right: 1px; font-size: 20px; line-height: 11px; }' +
            '.downloadLink  { background-image: ' + getIcon('download','rgb(0,0,0)') + '; background-color: rgba(98,220,151,1); }' +
            '.torrentLink  { background-image: ' + getIcon('torrent','rgb(0,0,0)') + '; background-color: rgba(98,182,210,1); }' +
            '.torrentLink:not(.requested) { background-position: 2px 2px; }' +
            '.requested  { background-image: ' + getIcon('done','rgb(0,0,0)') + '; }' +
            '.requested, .working { background-color: rgba(255,143,113,1); }' +
            '.automatedButton.downloadLink  { border-radius: 0 0 5px 0 !important; width: 12px; height: 12px; }' +
            '.automatedButton.torrentLink  { border-radius: 0 0 0 5px !important; width: 12px; height: 12px; }' +
            '#gd1 > .automatedButton { border-radius: 0 0 0 0 !important; }' +
            '.working { background-image: url(data:image/gif;base64,' + loadingGIF + ') !important; background-repeat: no-repeat; }' +
            '.automatedInline.working { background-position: 3px 3px; }' +
            '.automatedButton.working { width: 18px; height: 18px; font-size: 0px; background-position: 5px 5px; padding: 5px !important; }' +
            '.automatedPicker { background-image: ' + getIcon('picker','rgb(252,0,97)') + '; width: 16px;' + 
                'height: 16px; float: left; cursor: pointer; }' +
            '.automatedButton:hover, .automatedInline:hover { background-color: rgba(255,199,139,1) !important; color: black !important; }' +
            '*:hover > .automatedButton, .automatedButton.working, .automatedButton.requested { display: block !important; }' +
            '.EHADiframe { width: 0px !important; height: 0px !important; opacity: 0 !important; }' +
            '.automatedPicker > div { display: none; z-index: 2; position: absolute; top: -4px; text-align: center; }' +
            '.automatedPicker:hover > div, .automatedPicker > div:hover { display: block; }' +
            '.automatedInline { padding: 3px; border: 1px solid black; width: 17px; height: 17px; display: inline-block; }' +
            '.automatedInline:first-child { border-right: none !important; }';
        document.head.appendChild(style);

    };

    var requestDownload = function(e) {
        if (/working|requested/.test(e.target.className)) return; 
        e.preventDefault();
        e.target.className += ' working';
        var isTorrent = /torrentLink/.test(e.target.className);
        var gallery   = e.target.getAttribute('target');
        var nonce     = Math.floor(Math.random() * (1<<30));
        var iframe    = document.createElement('iframe');
        targets[nonce] = [e.target,iframe];
        document.body.appendChild(iframe);
        iframe.className = 'EHADiframe';
        iframe.src = addMetadata(gallery,{ nonce: nonce, isTorrent: isTorrent });
    };

    window.addEventListener('load',start,false);

}