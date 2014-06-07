// ==UserScript==
// @name           Youtube HD Visualize
// @namespace      http://creazy.net/
// @description    Add Downloadable links that the highest quality format (HD or MP4) in Youtube Page
// @include        http://*youtube.com/*
// ==/UserScript==

(function() {

    var d = document;
    var w = unsafeWindow?unsafeWindow:window;
    var swfArgs = w.swfArgs;

    /**
     * create XmlHttpRequest
     */
    function createXHR() {
        if ( w.ActiveXObject ) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e2) {
                    return null;
                }
            }
        } else if ( w.XMLHttpRequest ) {
            return new XMLHttpRequest();
        } else {
            return null;
        }
    }

    /**
     * check URL
     */
    function checkURL(video_id) {
        var url
            = 'http://'+location.host+'/watch'
            + '?v='+video_id
            + '&fmt=22';
        var XHR = createXHR();
        XHR.open( 'GET', url, true );
        XHR.onreadystatechange = function() { 
            if (XHR.readyState==4) {
                if ( match = XHR.responseText.match(/var swfArgs = ({.*})/) ) {
                    json = eval('('+RegExp.$1+')');
                    var s = document.getElementsByTagName('strong');
                    for ( var i=0; i<s.length; i++ ) {
                        if ( !s[i].innerHTML && s[i].getAttribute('class') == json['video_id'] ) {
                            link = d.createElement('a');
                            link.style.color   = '#fff';
                            link.style.font    = 'bold 10px/10px Arial';
                            link.style.padding = '1px';
                            if ( json['fmt_map'] == '22/2000000/9/0/115' ) {
                                link.style.backgroundColor = '#f00';
                                link.href      = '/get_video?fmt=22&video_id='+json['video_id']+'&t='+json['t'];
                                link.innerHTML = 'HD';
                            } else {
                                link.style.backgroundColor = '#666';
                                link.href      = '/get_video?fmt=18&video_id='+json['video_id']+'&t='+json['t'];
                                link.innerHTML = 'MP4';
                            }
                            s[i].appendChild(link);
                        }
                    }
                }
            }
        }
        XHR.send('');
    }

    /**
     * main
     */
    function visualize() {
        var a = d.getElementsByTagName('a');
        for ( var i=0; i<a.length; i++ ) {
            match = '';
            if ( a[i].innerHTML.indexOf('<img') > 0 ) continue; // Skip Image Link
            if ( a[i].getAttribute('vid') )           continue; // Skip checked Link
            if ( a[i].href.match(/#$/) )              continue; // Skip functional Link
            if ( a[i].href.match(/watch\?v=([a-zA-Z0-9_-]*)/) ) {
                match = RegExp.$1;
                a[i].setAttribute('vid',1);
                strong = d.createElement('strong');
                strong.setAttribute('class',match);
                a[i].parentNode.insertBefore(strong, a[i]);
            }
        }
        
        var s = d.getElementsByTagName('strong');
        
        for ( var i=0; i<s.length; i++ ) {
            if ( !s[i].innerHTML ) {
                checkURL( s[i].getAttribute('class') );
            }
        }
    }
    
	// for Auto Pager
	var scrollHeight = d.documentElement.scrollHeight;
	d.addEventListener(
		"scroll",
		function(e){
			if(d.documentElement.scrollHeight - scrollHeight > 100){
				scrollHeight = d.documentElement.scrollHeight;
				visualize();
			}
		},
		false
	);

	visualize();

})();