// ==UserScript==
// @name          Re·Re·Tweet Tracer
// @namespace     http://werebear.tistory.com/
// @description   You can trace RT thread by clicking recycle symbol icon
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @author        gjwlstjr
// ==/UserScript==

window.setTimeout(function(e) {
    if (e == 1) {
        var timelines = document.getElementById('timeline').childNodes; 
        for (var i = 0; i < timelines.length; i++) {
            var spans = timelines[i].childNodes;
            for (var j = 0; j < spans.length; j++) {
                if (spans[j].className == 'status-body') {
                    var bodySpans = spans[j].childNodes;
                    for (var k = 0; k < bodySpans.length; k++) {
                        if (bodySpans[k].className == 'entry-content') {
                            var dirty = false;
                            var msg = ' ' + bodySpans[k].innerHTML;
                            if (/<strong>RT<\/strong>/.test(msg)) {
                                // skip
                            } else  if (/\sRT\s/.test(msg)) {
                                if (/\sRT\s@<[aA]\s/.test(msg) || /\sRT\s<[aA][^>]+?>@\w+/.test(msg)) {
                                    msg = msg.replace(/\sRT\s/,' <strong>RT</strong> <img src="http://cfs.tistory.com/custom/blog/1/18358/skin/images/RT.png" name="rtrace_' + timelines[i].id + '">');
                                    dirty = true;
                                } else if (/\sRT\s.*?\s@<[aA]\s/.test(msg)) {
                                    msg = msg.replace(/\sRT\s(.*?)\s(@?<[aA]\s)/,' <strong>RT</strong> $1 <img src="http://cfs.tistory.com/custom/blog/1/18358/skin/images/RT.png" name="rtrace_' + timelines[i].id + '">$2');
                                    dirty = true;
                                } else if (/\sRT\s.*?\s<[aA][^>]+?>@\w+/.test(msg)) {
                                    msg = msg.replace(/\sRT\s(.*?)\s(<[aA][^>]+?>@w+)/,' <strong>RT</strong> $1 <img src="http://cfs.tistory.com/custom/blog/1/18358/skin/images/RT.png" name="rtrace_' + timelines[i].id + '">$2');
                                    dirty = true;
                                }
                            }
                            if (dirty) {
                                bodySpans[k].innerHTML = msg.replace(/^ /,'');
                                document.getElementsByName('rtrace_' + timelines[i].id).item(0).addEventListener('click', arguments.callee, true);
                            }
                            break;
                        }
                    }
                    //break;
                } else if (spans[j].className == 'conv_chain') {
                    var chainSpans = spans[j].childNodes;
                    for (var k = 0; k < chainSpans.length; k++) {
                        if (chainSpans[k].className == 'entry-baloon') {
                            var baloonSpans = chainSpans[k].childNodes;
                            for (l = 0; l < baloonSpans.length; l++) {
                                if (/^entry-content /.test(baloonSpans[l].className)) {
                                    var dirty = false;
                                    var msg = ' ' + baloonSpans[l].innerHTML;
                                    if (/<strong>RT<\/strong>/.test(msg)) {
                                        // skip
                                    } else  if (/\sRT\s/.test(msg)) {
                                        if (/\sRT\s@<[aA]\s/.test(msg) || /\sRT\s<[aA][^>]+?>@\w+/.test(msg)) {
                                            msg = msg.replace(/\sRT\s/,' <strong>RT</strong> <img src="http://cfs.tistory.com/custom/blog/1/18358/skin/images/RT.png" name="rtrace_' + timelines[i].id + '">');
                                            dirty = true;
                                        } else if (/\sRT\s.*?\s@<[aA]\s/.test(msg)) {
                                            msg = msg.replace(/\sRT\s(.*?)\s(@?<[aA]\s)/,' <strong>RT</strong> $1 <img src="http://cfs.tistory.com/custom/blog/1/18358/skin/images/RT.png" name="rtrace_' + timelines[i].id + '">$2');
                                            dirty = true;
                                        } else if (/\sRT\s.*?\s<[aA][^>]+?>@\w+/.test(msg)) {
                                            msg = msg.replace(/\sRT\s(.*?)\s(<[aA][^>]+?>@w+)/,' <strong>RT</strong> $1 <img src="http://cfs.tistory.com/custom/blog/1/18358/skin/images/RT.png" name="rtrace_' + timelines[i].id + '">$2');
                                            dirty = true;
                                        }
                                    }
                                    if (dirty) {
                                        baloonSpans[l].innerHTML = msg.replace(/^ /,'');
                                        document.getElementsByName('rtrace_' + timelines[i].id).item(0).addEventListener('click', arguments.callee, true);
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    //break;
                }
            }
        }
    } else {
        var target_name = e.target.name;
        var stat_id = target_name.replace(/^rtrace_/,'');
        var timeline = document.getElementById(stat_id);
        var spans = timeline.childNodes;
        for (var j = 0; j < spans.length; j++) {
            if (spans[j].className == 'status-body') {
                var bodySpans = spans[j].childNodes;
                for (var k = 0; k < bodySpans.length; k++) {
                    if (bodySpans[k].className == 'entry-content') {
                        var entr = bodySpans[k];
                        var msg = entr.innerHTML.replace(/<strong>RT<\/strong>/,'<em>RT</em>');
                        var arr = /18358\/skin\/images\/RT\.png" name="rtrace_\w+?">@?<a .+?>@?(\w+)<\/a>:?(.*)/.exec(msg);
                        var who = arr[1];
                        var rt_msg = arr[2];
                        rt_msg = rt_msg.replace(/<.+?>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&');
                        var rt_msgs = rt_msg.split(/\s/);
                        var myURIbase = 'http://search.twitter.com/search.atom?from=' + who + '&q=';
                        var myURI = '';
                        var myURI2 = '';
                        var keywords = ' ';
                        var keywords2 = ' ';
                        for (var l = 0; l < rt_msgs.length; l++) {
                            var word = rt_msgs[l];
                            var enc;
                            if (word.length > 0) {
                                if (/^#\S+$/.test(word) || /^\w+:/.test(word)) {
                                    if (/\.{3}/.test(word)) {
                                    } else if (keywords.indexOf(' ' + word + ' ') < 0) {
                                        enc = encodeURIComponent(word);
                                        if (myURI.length + enc.length < 140) {
                                            keywords += word + ' ';
                                            if (myURI.length > 0) myURI += '+';
                                            myURI += enc;
                                        }
                                        if (myURI2.length + enc.length < 140) {
                                            keywords2 += word + ' ';
                                            if (myURI2.length > 0) myURI2 += '+';
                                            myURI2 += enc;
                                        }
                                    }
                                } else {
                                    if (/[\u3131-\u318e\uac00-\ud7a3\u4e00-\u9fa5\uf900-\ufa2d]{2,3}/.test(word)) {
                                        var han = /[\u3131-\u318e\uac00-\ud7a3\u4e00-\u9fa5\uf900-\ufa2d]{2,3}/.exec(word)[0];
                                        var han2 = '';
                                        var enc;
                                        if (han.length == 3) {
                                            han2 = han.charAt(1) + han.charAt(2);
                                            han = han.charAt(0) + han.charAt(1);
                                        }
                                        if (keywords.indexOf(' ' + han + ' ') < 0) {
                                            enc = encodeURIComponent(han);
                                            if (myURI.length + enc.length < 140) {
                                                keywords += han + ' ';
                                                if (myURI.length > 0) myURI += '+';
                                                myURI += enc;
                                            }
                                        }
                                        if (han2.length > 0 && keywords.indexOf(' ' + han2 + ' ') < 0) {
                                            enc = encodeURIComponent(han2);
                                            if (myURI.length + enc.length < 140) {
                                                keywords += han2 + ' ';
                                                if (myURI.length > 0) myURI += '+';
                                                myURI += enc;
                                            }
                                        }
                                    }
                                    if (/\w{3,}/.test(word) && (!/\.{3}/.test(word))) {
                                        var eng = /\w{3,}/.exec(word)[0];
                                        var enc;
                                        if (keywords.indexOf(' ' + eng + ' ') < 0) {
                                            enc = encodeURIComponent(eng);
                                            if (myURI.length + enc.length < 140) {
                                                keywords += eng + ' ';
                                                if (myURI.length > 0) myURI += '+';
                                                myURI += enc;
                                            }
                                        }
                                    }
                                    if (/^[\w\u3131-\u318e\uac00-\ud7a3\u4e00-\u9fa5\uf900-\ufa2d]+$/.test(word)) {
                                        var enc = encodeURIComponent(word);
                                        if (myURI2.length + enc.length < 140) {
                                            keywords2 += word + ' ';
                                            if (myURI2.length > 0) myURI2 += '+';
                                            myURI2 += enc;
                                        }
                                    }
                                }
                            }
                        }
//document.title= 'from:' + who + ' ' + decodeURI(myURI).replace(/\+/g, ' ');
//document.title= 'from:' + who + ' ' + decodeURI(myURI2).replace(/\+/g, ' ');

                        var the_callee = arguments.callee;
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: myURIbase + myURI,
                            headers: {
                                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                                'Accept': 'application/atom+xml,application/xml,text/xml',
                            },
                            onload: function(responseDetails) {
                                if (responseDetails.status == 200) {
                                    var resp = responseDetails.responseText;
                                    while (/<\/entry>\s*<entry>/.test(resp)) {
                                        resp = resp.replace(/<entry>[\s\S]*?<\/entry>/,'');
                                    }
                                    var entries = /<entry>([\s\S]*?)<\/entry>/.exec(resp);
                                    //resp = resp.replace(/[\s\S]*<entry>/,'').replace(/<\entry>[\s\S]*/,'');
                                    if (entries.index > 0) {
                                        var contents = /<content type="html">(.+?)<\/content>/.exec(entries[1]);
                                        var rt_id = /<id>tag:[\w\.]+,\d+:(\d+)<\/id>/.exec(entries[1])[1];
                                        var the_rt = contents[1].replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&amp;/g,'&');
                                        the_rt = the_rt.replace(/<\/?b>/g,'');

                                        msg = msg.replace(/<img src="http:\/\/cfs\.tistory\.com\/custom\/blog\/1\/18358\/skin\/images\/RT\.png" name="rtrace_\w+?">.*/, '') + '<a href="/' + who + '/status/' + rt_id + '"><img src="http://cfs.tistory.com/custom/blog/1/18358/skin/images/iconBlockquote.gif"></a>@<a href="/' + who + '">' + who + '</a>: ' + the_rt;
                                        document.getElementsByName(target_name).item(0).removeEventListener('click', the_callee, true);
                                        entr.innerHTML = msg;
                                    }
                                    else if (myURI2.length > 0) {
                                        myURI = myURI2;
                                        myURI2 = '';
                                        window.setTimeout(arguments.callee, 10, 0);
                                    }
                                }
                                else {
                                    alert(responseDetails.status);
                                }
                            }
                        });

                        break;
                    }
                }
                break;
            }
        }
    }
    window.setTimeout(arguments.callee, 4000, 1);
}, 2000, 1);
