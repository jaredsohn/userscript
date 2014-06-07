// ==UserScript==
// @name           Gtranslator
// @namespace      blog.h2ero.cn
// @version       2.0 
// @description  google 翻译及发音
// @include        *
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
var isen = 0;
$(function() {
   GM_addStyle("#G-translate{border: 1px solid #A7B3B8;display:none;z-index:10001;background:#fff;border-radius: 4px 4px 4px 4px;box-shadow: 1px 1px 6px #000;color:#0B9D96;position:absolute;text-shadow:0 0 1px #FFF;}"+
     "#translate,#speak,#G-res{float:left;clear:right;}"+
     ".G-highlight{ background: none repeat scroll 0 0 #48A6D2; color: #000000; display: inline; text-decoration: none;}"+
     "#G-res {background: -moz-linear-gradient(center top , #EBEBEB, #FFFFFF) repeat scroll 0 0 transparent;font-size: 12px; line-height: 16px; max-width: 300px; text-align: left; word-wrap: break-word; }"+
     ".Class{ color: #777777; font-weight: bold;}"+
     "#G-close { color: #FFFFFF; cursor: pointer; margin-left: 750px; text-shadow: 1px 1px 1px #000000; }"+
     " #G-translate a {text-shadow: 1px 1px 1px #CDCDCD;font-size: 14px; font-weight: bold;background: none repeat scroll 0 0 transparent; text-decoration: none; color: #000000; float: left; line-height: 17px; margin: 0 0 0 2px; text-align: left;cursor:pointer; }"+
     " #G-translate a:hover{-moz-transform: rotate(30deg);color:#005EAA;text-shadow: 1px 1px 1px #fff;}"+
     "#speak img{padding-left: 4px; padding-top: 2px;}"+
     "#G-note {z-index:9999;background:#fff;text-align:left; font-size:17px;margin: 0 auto; width: 100%;padding:50px 0px 200px 0px; }"+
     ".G-item { box-shadow: 4px 4px 7px #010101; margin: 15px auto; padding: 15px; width: 750px; }"+
     "#G-option{margin:0 auto;width: 750px;}"+
     ".G-item * { margin: 0px; padding: 0px; }"+
     ".G-item h2, .Gitem li { font-size: 17px; }"+
     ".G-item h2 { display: inline; width: 200px; }"+
     ".G-item span { float: right; font-size: 50px;cursor:pointer; line-height: 17px; color: red; }"+
     " .G-item li {list-style: square outside none; margin-left: 35px; }"+
     "#G-bar { background: -moz-linear-gradient(center top , #66A8D7 0%, #3E869D 100%) repeat scroll 0 0 transparent; border-radius: 4px 4px 0 0; height: 20px; padding: 0 5px; }"); 
     /*
      * Find and replace text 
      * http://james.padolsey.com/javascript/find-and-replace-text-with-javascript/
      */
    function findAndReplace(searchText, replacement, searchNode) {
        if(!searchText || typeof replacement === 'undefined') {
            // Throw error here if you want...
            return;
        }
        var regex = typeof searchText === 'string' ? new RegExp(searchText, 'g') : searchText, childNodes = (searchNode || document.body).childNodes, cnLength = childNodes.length, excludes = 'html,head,style,title,link,meta,script,object,iframe';
        while(cnLength--) {
            var currentNode = childNodes[cnLength];
            if(currentNode.nodeType === 1 && (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
                arguments.callee(searchText, replacement, currentNode);
            }
            if(currentNode.nodeType !== 3 || !regex.test(currentNode.data)) {
                continue;
            }
            var parent = currentNode.parentNode, frag = (function() {
                var html = currentNode.data.replace(regex, replacement), wrap = document.createElement('div'), frag = document.createDocumentFragment();
                wrap.innerHTML = html;
                while(wrap.firstChild) {
                    frag.appendChild(wrap.firstChild);
                }
                return frag;
            })();
            parent.insertBefore(frag, currentNode);
            parent.removeChild(currentNode);
        }
    }
    //loop find replace word
    for each(var val in GM_listValues()) {
        findAndReplace('\\b' + val + '\\b', '<a class="G-highlight"  title=' + GM_getValue(val) + '>' + val + '</a>');
    }
    //划词获取
    $('body').mouseup(function(event) {
        var word = window.getSelection();
        if(word != '') {
            if($('#G-translate').length == 0) {
                $('body').append('<div id="G-translate" style=""><div id="G-bar"><a id="translate">译</a><a id="speak">音</a><a id="addNew">+</a><a id="listNote">本</a><a id="G-swicth">切</a></div><span id="word" style="display:none;"></span><span id="G-res"></span></div>');
                //init event
                initEvent();
                //save the word
                $("#word").text(word.toString());
                $("#G-res").text('');
                var top = document.body.scrollTop || document.documentElement.scrollTop;
                $('#G-translate').show().css('left', 20 + event.clientX + 'px').css('top', 20 + event.clientY + top + 'px');
            } else {
                $("#word").text(word.toString());
                $("#G-res").text('');
                var top = document.body.scrollTop || document.documentElement.scrollTop;
                $('#G-translate').show().css('left', 20 + event.clientX + 'px').css('top', 20 + event.clientY + top + 'px');
            }
        } else {
            $('#G-translate').remove();
            // if(event.target.nodeName);
        }
    });
    function initEvent() {
        $("#G-swicth").mouseup(function() {
            isen = isen == 0 ? 1 : 0;
            var word = $('#word').text();
            translate(word, isen);
            return false;
        });
        $("#G-res").mouseup(function() {
            return false;
        });
        //show
        $("#translate").mouseup(function() {
            var word = $('#word').text();
            translate(word, isen);
            return false;
        });
        $("#speak").mouseup(function() {
            var word;
            if(isen == 0) {
                word = $('#word').text();
            } else {
                word = $('#G-res').text();
            }
            speak(word);
            return false;
        });
        //add new word
        $('#addNew').mouseup(function() {
            GM_setValue($('#word').text(), $('#G-res').text());
            alert('添加成功' + $('#word').text() + ":" + $('#G-res').text());
            return false;
        });
        //list note
        $('#listNote').mouseup(function() {
            $('#G-translate').remove();
            if($('#G-close').length == 0) {
                $('body').prepend('<div id="G-note"><div id="G-option"><a id="G-close" >X</a></div></div>');
                var vals = [];
                var Gitem = '';
                for each(var val in GM_listValues()) {
                    Gitem = '<div class="G-item"><h2>' + val + '</h2><span>-</span><ol>';
                    if(GM_getValue(val).indexOf('[')) {
                        var t = GM_getValue(val).split('[');
                        for(var i = 0; i <= t.length; i++) {
                            if(i == 0) {
                                Gitem += '<li>' + t[i] + '</li>';
                                t.shift();
                            } else
                                Gitem += '<li>[' + t[i - 1] + '</li>';
                        }
                    }
                    Gitem += '</ol></div>';
                    $('#G-note').append(Gitem);
                }
            } else {
                $('#G-note').slideDown();
            }
            //init event
            initEvent();
            return false;
        });
        //del word
        $(".G-item span").click(function() {
            //console.log($(this).parent().find('h2').text());
            GM_deleteValue($(this).parent().find('h2').text());
            $(this).parent().fadeOut();
        });
        //close note
        $('#G-close').live('click', function() {
            $('#G-note').slideUp();
            return false;
        });
    }

    //google translate
    function translate(word, isen) {
        var tl = isen ? "en" : "zh-CN";
        GM_xmlhttpRequest({
            method : "GET",
            url : "http://translate.google.cn/translate_a/t?client=t&hl=auto&sl=auto&tl=" + tl + "&text=" + word,
            onload : function(res) {
                var res = $.parseJSON(res.responseText);
                $("#word").html(word.toString());
                var result = '';
                for(var i = 0; i < res[0].length; i++) {
                    result += res[0][i][0];
                }
                if(res[1] != undefined) {
                    for(var i = 0; i < res[1].length; i++) {
                        //console.log(res[1][i].length);
                        result += "<br/><span class='Class'>[" + res[1][i][0] + "].</span></br>";
                        res[1][i].shift();
                        result += res[1][i];
                    }
                }
                $('#G-res').html(result);
            }
        });
    }

    function speak(word) {
        GM_xmlhttpRequest({
            method : "GET",
            url : "http://translate.google.com/translate_tts?ie=UTF-8&q=" + word + "&tl=en&prev=input",
            onload : function(res) {
                $("body").append('<div  style="bottom: 9px; box-shadow: 8px 5px 10px #828282; position: fixed; right: -306px;" ><embed height="40" width="347" src="http://site.douban.com/swf/mainplayer.swf?url=' + btoa('http://translate.google.com/translate_tts?ie=UTF-8&q=' + word + '&tl=en&prev=input') + '&amp;autoplay=1&amp;" type="application/x-shockwave-flash" wmode="transparent" allowscriptaccess="always"></div>');
            }
        });
    }

});
