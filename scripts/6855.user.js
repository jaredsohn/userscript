// ==UserScript==
// @name          SMFWap2 enhancer
// @version       0.4.1
// @description   Improves wap2 version of SMF-based forums
// @namespace     http://www.s25.ru/dev/firefox/greasemonkey/
// @include http://foobar2000.ru/forum/*
// @include http://www.foobar2000.ru/forum/*
// @include http://www.operafan.net/*
// @include http://operafan.net/*
// @include http://forum.mirandaim.ru/*
// @include http://forum.ubuntu.ru/*
// ==/UserScript==

// @history       0.4.1: rewriten original userCSS style for better compatibility
// @history       0.4.01: version for GreaseMonkey Firefox2.
// @history       0.4: compatibility with mod_rewrite
// @history       0.4: add linkification.
// @history       0.3: joint with corresponding userCSS to improve interface wap2 version.
// @author        dizzy2 (since 0.4.01)
// @author        Kildor (concept and realization before 0.4.01 [for Opera])


(function(){
    r = location.href;
    String.prototype.rStrip = function(){
        var endval = "";
        var link = arguments[0];
        // try to deal with ampersands, quotes and similar in a nice fashion
        if (link.substr(-6).indexOf("&quot;") != -1) {
            endval = "&quot;"
            link = link.substring(0,link.length-6);
        } else if (link.substr(-4).indexOf("&gt;") != -1) {
            endval = "&gt;"
            link = link.substring(0,link.length-4);
        } else if (link.substr(-1).match(/[,.!?\)\']$/)) {
            endval = link.substr(-1);
            if (link.substr(-7,6).indexOf("&quot;") != -1) {
                endval = "&quot;"+endval;
                link = link.substring(0,link.length-7);
            } else if (link.substr(-5,4).indexOf("&gt;") != -1) {
                endval = "&gt;"+endval;
                link = link.substring(0,link.length-5);
            } else {
                link = link.substring(0,link.length-1);
            }
        }
        return "<a href=\""+link+"\">"+link+"</a>"+endval;
    }

    try {
        with(document.body) {
            className+=' wap2';
            id = 'smf2wap_enh';
        }
    } catch (e) {}
    
    function run(){
        if ( r.indexOf('autoSubmit=1')!=-1 ) {
            document.getElementsByTagName('form')[0].submit();
        } else if ( r.indexOf(';wap2')!=-1||r.indexOf('?wap2')!=-1||r.indexOf('wap2.html')!=-1 ) {
            var css = " * {margin: 0; padding: 0} "+
                      " #smf2wap_enh.wap2 {padding-top: 34px !important;} " +
                      " #smf2wap_enh.wap2 * {font-family: serif; font-size: 16px;} " +
                      " #smf2wap_enh.wap2 p.catbg { text-align: center;font-family: Tahoma, Verdana, Sans, sans-serif; padding: 5px 5%; font-size: 20px; position:fixed; top:0; width: 90%; z-index: 999; border-bottom:1px solid #8394b2;} " +
                      " #smf2wap_enh.wap2 p.titlebg {font-family: sans-serif !important; padding: 5px; font-weight: bold;border-bottom:1px solid #8394b2; font-size: 15px} " +
                      " #smf2wap_enh.wap2 p.titlebg a {font-family: sans-serif !important; font-size: 15px} " +
                      " #smf2wap_enh.wap2 p.windowbg {background-color: #e4eaee; padding: 5px} " +
                      " #smf2wap_enh.wap2 .windowbg2 {background-color: #e4eaee} " +
                      " #smf2wap_enh.wap2 .odd {background:#fff !important; padding: 5px} " +
                      " #smf2wap_enh.wap2 a#normal {position: fixed; z-index: 1000; top:0; right:0; width: 6px; overflow: hidden; background-color: #faa; padding: 5px; opacity: 0.8; -moz-border-radius-bottomleft: 9px; white-space: nowrap} " +
                      " #smf2wap_enh.wap2 a#normal:hover {width: 150px} " +
                      " #smf2wap_enh.wap2 div.navD {background-color: #e4eaee;position: fixed; width: 90%; height: 3px; top: 0px; left: 5%; overflow: hidden; z-index: 1004; border: 1px solid #666;} " +
                      " #smf2wap_enh.wap2 div.navD:hover {height: auto} " +
                      " #smf2wap_enh.wap2 div.navD p.titlebg {font-size: 14px !important; padding: 2px !important} " +
                      " #smf2wap_enh.wap2 div.navD p.windowbg {display: inline; padding: 2px !important; border: none !important;background-color: #e4eaee !important;} " +
                      " #smf2wap_enh.wap2 p[class*='windowbg'] b {color: #666666 !important;text-decoration:underline;cursor:pointer;position:relative;left: 4px;} " +
                      " #smf2wap_enh.wap2 p[class*='windowbg'] {border-bottom:1px solid #8394b2; position: relative}" +
                      " #smf2wap_enh.wap2>p.catbg+p.windowbg { border:0 ;font-size:12px; position:fixed; top: 0px; height: 25px; z-index: 1002}" +
                      " #smf2wap_enh.wap2 a.new {color: #f00 !important; background-color: transparent !important; font-size: 12px !important}" +
                      " #smf2wap_enh.wap2 form {clear:both;}" +
                      " #smf2wap_enh.wap2 form p {padding-left: 5px !important; }" +
                      " #smf2wap_enh.wap2 #answer {background:#75adef !important;}" +
                      " #smf2wap_enh.wap2 textarea {width:70%;height:10em; margin-left: 5px}" +
                      " #smf2wap_enh.wap2 input[type='text'] {width:60%;}" +
                      " #smf2wap_enh.wap2 input[type='submit'] {margin: 5px}" +
                      " #smf2wap_enh.wap2 div.navD p.windowbg, #smf2wap_enh.wap2 div.navD p.windowbg * {font-size: 13px !important}";
            function add_css_style(css) {
                if (typeof GM_addStyle != "undefined") {
                    GM_addStyle(css);
                } else if (typeof addStyle != "undefined") {
                    addStyle(css);
                } else {
                    var heads = document.getElementsByTagName("head");
                    if (heads.length > 0) {
                        var node = document.createElement("style");
                        node.type = "text/css";
                        node.innerHTML = css;
                        heads[0].appendChild(node); 
                    }
                }
            }
            add_css_style(css);
            if ( document.evaluate) {
                divs = document.evaluate(
                    '//p[@class="windowbg" or @class="windowbg2"]',
                    document.body,
                    null,
                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                    null);
                for (var i = 0; i < divs.snapshotLength; i++) {
                    thisOne = divs.snapshotItem(i);
                    if (thisOne.getElementsByTagName('a').length==0 &&thisOne.getElementsByTagName('input').length==0) {
                        var urlRegex = /(((https?|ftp|irc|telnet|nntp|gopher|file):\/\/|(mailto|news|data):)[^\s\"<>\{\}\'\(\)]*)/g;
                        thisOne.innerHTML = thisOne.innerHTML.replace(urlRegex,RegExp.$1.rStrip)
                    }
                }
            }
            try {
                var nav = document.evaluate('//body/p[@class="titlebg"]',document.body,null,     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                nav = nav.snapshotItem(nav.snapshotLength - 1);
                navP = nav.parentNode;
                navD = document.createElement('div');
                navD.className = 'navD'
                navP.insertBefore(navD,nav);
                navD.appendChild(nav);
                while (n = navD.nextSibling) {
                    if ( n.nodeType!=3&& n.className!='windowbg' ) {
                        break;
                    }
                    navD.appendChild(n)
                }
            } catch (e) { }
            
            if ( document.evaluate) {
                divs = document.evaluate(
                    '//p[@class="windowbg" or @class="windowbg2" or @class="titlebg"]',
                    document.body,
                    null,
                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                    null);
                var tmp = false, isOdd = false;

                for (var i = 0; i < divs.snapshotLength; i++) {
                    thisOne = divs.snapshotItem(i);
                    if (thisOne.className == 'titlebg') {
                        isOdd = false;
                    } else {
                        if (isOdd != false) {
                            thisOne.className += ' odd';
                        }
                        isOdd = (isOdd == true) ? false : true;
                    }
                }
            }
            if ( r.indexOf('action=post')==-1 && r.indexOf('board')!=-1 ) {
                var css = '#smf2wap_enh>p.catbg+p.titlebg+p.windowbg { border:0 ;font-size:12px; position:fixed; top: 0px; height: 25px; z-index: 1002}';
                add_css_style(css);
            }
            if ( r.indexOf('action=post')==-1 && (r.indexOf('topic')!=-1 ||r.indexOf('board')!=-1 )) {
                quote = null;
                div__ = document.createElement('div');
                div__.innerHTML = '     <form action="index.php?action=post2;autoSubmit=1;wap2" method="post">'+
                '           <p class="titlebg" id="answer">Answer</p>'+
                '           <p class="windowbg">'+
                '               Subject: <input type="text" name="subject" value="Re: '+document.getElementsByTagName('title')[0].innerHTML+'" maxlength="80" /><hr />'+
                '               &nbsp;Message: <br />'+
                '               <textarea name="message" id="textMessage"></textarea><br />'+
                '               <input type="submit" name="post" value="Post" />'+
                '               <input type="hidden" name="icon" value="wireless" />'+
                '               <input type="hidden" name="goback" value="1" />'+
                '               <input type="hidden" name="seqnum" value="1" />'+
                '               <input type="hidden" name="topic" value="'+r.replace(/^.+topic[=,](\d+).*$/, "$1")+'" />'+
                '           </p>'+
                '       </form>';
                document.body.appendChild(div__);
                
                if ( r.indexOf('board')==-1 ) {
                    b = document.getElementsByTagName('b');
                    for ( i=0,l=b.length ; i<l ;i++ ) {
                        b[i].addEventListener('click', function(){
                            document.getElementById('textMessage').focus();
                            document.getElementById('textMessage').value += '[b]' + this.innerHTML + ":[/b]\n ";
                        },false)
                    }
            
                    quote = document.createElement('input');
                    quote.type='button';
                    quote.value='Quote';
                    quote.style.marginLeft="5em"
                    quote.addEventListener('mouseover',
                        function  ( ) {
                            selection = document.getSelection().toString();
                            while (selection.indexOf("  ") !=-1) {selection = selection.replace(/  /gi,"");}
                        }
                        ,false);
                    quote.addEventListener('click',
                        function  ( ) {
                            if ( selection!='' ) {
                                document.getElementById('textMessage').focus();
                                document.getElementById('textMessage').value += '[quote]'+selection+'[/quote]';
                            }
                        }
                        ,false);
                    
                    document.getElementById('answer').appendChild(quote);
                    col = document.getElementsByTagName('b');
                    for ( i=0, co_=col.length ;i<co_ ; i++) {
                        col[i].parentNode.removeChild(col[i].nextSibling);
                    }
                    
                }
            }
        
            a__ =  document.createElement('a');
            a__.setAttribute('href', location.href.slice(0,location.href.indexOf('wap2')) );
            a__.innerHTML = "Normal view";
            a__.id = 'normal';
            document.body.appendChild(a__);
        }
    }
    
    run();
})();
