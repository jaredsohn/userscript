// ==UserScript==
// @name         tieba bbCode
// @namespace    http://jixun.org/
// @version      1.0.3.1
// @description  贴吧帖子 bbCode 内容显示
// @include      *://tieba.baidu.com/*
// @include      *://tieba.com/*
// @copyright    2012+, Jixun
// @updateURL    http://userscripts.org/scripts/source/167106.meta.js
// @downloadURL  http://userscripts.org/scripts/source/167106.user.js
// @run-at       document-start
// ==/UserScript==

// tieba bbCode
// 贴吧帖子 bbCode 内容显示

// Useful functions
var $u = {
    encodeHTML: function (sHtmlCode) {
        var e = document.createElement ('div');
        e.textContent = sHtmlCode;
        return (e.innerHTML);
    }, decodeHTML: function (sHtmlCode) {
        var e = document.createElement ('div');
        e.innerHTML = sHtmlCode;
        return (e.textContent);
    }, encData: function (rawData) {
        return btoa ('15[JixunBBCode]' + escape(rawData));
    }, decData: function (rawData) {
        var srtingA = atob (rawData);
        return unescape(srtingA.substr(parseInt (srtingA)));
    }, quickInject: function (tagName, sContent) {
        var e = document.createElement (tagName);
        e.innerHTML = sContent;
        document.body.appendChild (e);
        return !!e;
    }, parseHTML: function (responseText) {
        // For Firefox
        var ret = (new DOMParser()).parseFromString(responseText, "text/html");
        
        // For Chrome
        if (ret == undefined) {
            var ret = document.implementation.createHTMLDocument("");
            ret.querySelector('html').innerHTML = responseText;
        }
        return ret;
    }, linkFinder: function (htmlA) {
        var sArg = htmlA;
        if (sArg.substr(0, 4) == '&lt;')
            sArg = $u.parseHTML ($u.decodeHTML(sArg)).querySelector('a').href;
        
        if (sArg.toLowerCase().indexOf ('javascript:') != -1)
            sArg = 'javascript: void(0);';
        
        return sArg;
    }, linkHTMLRemove: function (htmlA) {
        // 移除 HTML 化的链接文本
        var sArg = htmlA,
            arrMatchs = $u.decodeHTML(sArg).match (/<a(.+)\>(.+)<\/a/i);
        
        if (arrMatchs)
            sArg = arrMatchs[2];
        
        if (sArg.toLowerCase().indexOf ('javascript:') != -1)
            sArg = 'javascript: void(0);';
        
        return sArg;
    }, fixJSON: function (sJSON) {
        return sJSON
        .replace(/(\=|：|＝)/g, ':')
        .replace(/(\{|\,|:)([a-z])/gi, '$1"$2')
        .replace(/([a-z])(:|\}|,)/gi, '$1"$2');
    },
    sign: '#SIGN.tieba.bbCode'
};

var $tagConfig = {
    // 直接转换的标签, 无参数指定
    convertDirect: [
        'b', 'i', 'u', 's',
        // 'table', 'tr', 'td',
        'marquee', 'hid'
    ],
    
    convertWithChange: [
        {
            from: 'list',
            to  : 'ul'
        }, {
            from: 'fly',
            to  : 'marquee'
        }, {
            from: 'big',
            to  : 'g'
        }, {
            from: '\\*',
            to  : 'li'
        }/*,
		{
			from: 'quote',
			to  : 'blockquote'
		}*/
    ],
    
    convertWithFunc: [
        {
            tag:  'quote',
            func: function (sInput, sArg, thisTag) {
                return '<blockquote' + (sArg.toLowerCase()!='#inline'?(' class="qBlockJixun">引用' + (sArg?('自 @'+sArg):'内容') + ':<br />'):'>') + sInput + '</blockquote>';
            }
        }, {
            tag:  'code',
            func: function (sInput, sArg, thisTag) {
                var bShowInBlock = (sArg=='' || sArg.toLowerCase()!='#inline' || parseInt (sArg));
                return '<code'+(bShowInBlock?' class="qBlockJixun"':'')+'>' + sInput + '</code>';
            }
        }, {
            tag:  ['img', 'image'],
            func: function (sInput, sArg, thisTag) {
                return '<img src="' + $u.linkHTMLRemove(sInput) + '" alt="' + sArg + '" />';
            }
        }, {
            tag:  'highlight',
            func: function (sInput, sArg, thisTag) {
                return '<span style="background: #FFEB90;">' + sInput + '</span>';
            }
        }, {
            tag:  ['left', 'center', 'centre', 'right'],
            func: function (sInput, sArg, thisTag) {
                var arrMirror = {
                    centre: 'center',
                };
                return '<p style="text-align:' + (arrMirror[thisTag]||thisTag) + '">' + sInput + '</p>';
            }
        }, {
            tag:  'indent',
            func: function (sInput, sArg, thisTag) {
                var indentDeep = (parseInt(sArg)||1) * 20;
                return '<span style="padding-left:' + indentDeep + 'px;">' + sInput + '</span>';
            }
        }, {
            tag:  ['color', 'colour', 'size', 'font', 'fon'],
            func: function (sInput, sArg, thisTag) {
                var arrMirror = {
                    colour: 'color',
                    size: 'font-size',
                    font: 'font-family',
                    fon:  'font-family'
                };
                
                if (sArg.replace(/\d+/, '') == '')
                    sArg = sArg + 'px';
                
                return '<span style="' + (arrMirror[thisTag]||thisTag) + ': ' + sArg + '">' + sInput + '</span>';
            }
        }, {
            tag:  'url',
            func: function (sInput, sArg) {
                if (sArg == '')
                    sArg = sInput;
                
                sArg = $u.linkHTMLRemove (sArg);
                
                return '<a href="' + sArg + '">' + sInput + '</a>';
            }
        }, {
            tag:  'ol',
            func: function (sInput, sArg) {
                var arrTypeMirrors = {
                    '01': 'decimal-leading-zero',
                    'c': 'cjk-ideographic',
                    'C': 'circle',
                    's': 'square',
                    '1': 'decimal',
                    'i': 'lower-roman',
                    'I': 'upper-roman',
                    'g': 'lower-greek',
                    'h': 'hiragana',
                    'ki': 'hiragana-iroha',
                    'K': 'hiragana-iroha',
                    'k': 'katakana',
                    'ki': 'katakana-iroha',
                    'K': 'katakana-iroha',
                    'a': 'lower-alpha',
                    'A': 'upper-alpha'
                };
                return '<ol style="list-style-type:' + (arrTypeMirrors[sArg||'C']||sArg) + '">' + sInput.replace(/<br>/g, '') + '</ol>';
            }
        }, {
            tag:  'email',
            func: function (sInput, sArg) {
                if (sArg == '')
                    sArg = sInput;
                
                sArg = $u.linkFinder (sArg);
                
                return '<a href="mailto:' + sArg + '">' + sInput + '</a>';
            }
        }, {
            tag:  ['td', 'tr', 'th', 'table'],
            func: function (sInput, sArg, thisTag) {
                var attrList = '';
                
                // 移除所有度娘系统添加的换行, 如果需要换行请更换 [br] 或 \n
                if (thisTag.toLowerCase() == 'table')
                    sInput = sInput.replace(/\<br\>/gi, '');
                
                if (sArg) {
                    try {
                        var jsonAttr = JSON.parse($u.fixJSON(sArg));
                        console.log (jsonAttr);
                        for (item in jsonAttr) {
                            attrList += ' ' + item + '="' + jsonAttr [item] + '"';
                        }
                    } catch (e) {
                        console.error ('tieba bbCode :: Not standard attr list');
                        // Not Standard JSON
                    }
                }
                return '<' + thisTag + attrList + '>' + sInput + '</' + thisTag + '>';
            }
        }
    ]
};

function proc_bbCode (inputString) {
    var sOut = inputString;
    
    $tagConfig.convertDirect.forEach (function (tagName) {
        var regex = new RegExp ('\\[' + tagName + '\\](.+?)\\[\\/' + tagName + '\\]', 'gim');
        sOut = sOut.replace(regex, '<' + tagName + '>$1</' + tagName + '>');
    });
    
    $tagConfig.convertWithChange.forEach (function (tag) {
        var regex = new RegExp ('\\[' + tag.from + '\\](.+?)\\[\\/' + tag.from + '\\]', 'gim');
        sOut = sOut.replace(regex, '<' + tag.to + '>$1</' + tag.to + '>');
    });
    
    $tagConfig.convertWithFunc.forEach (function (obj) {
        var arrTags = obj.tag;
        if (typeof(arrTags) != 'object')
            arrTags = [arrTags];
        
        arrTags.forEach (function (thisTag) {
            var sReg = '\\[' + thisTag + '(=.+?|)\\](.+?)\\[\\/' + thisTag + '\\]',
                arrMatches = sOut.match (new RegExp (sReg, 'gim'));
            
            if (arrMatches) {
                arrMatches.forEach (function (sMatch) {
                    // 枚举所有匹配项
                    var arrSubMatches = sMatch.match (new RegExp (sReg, 'im'));
                    // console.log (arrSubMatches);
                    sBackup = sOut;
                    try {
                        sOut = sOut.replace(arrSubMatches[0], obj.func (arrSubMatches[2], proc_bbCode($u.encodeHTML(arrSubMatches[1].substr(1))), thisTag));
                    } catch (sError) {
                        sOut = sBackup;
                        console.error ('Error while converting the following bbCode:\n' + sMatch,
                                       '\n\nWith following error message:\n' + sError, '\n\n');
                    }
                });
            }
        });
    });
    
    return sOut.replace(/(\[br\]|\\n)/gi, '<br />');
}

function createEncBtn () {
    var btnEnc = document.createElement ('input'),
        ptSub  = document.querySelector ('.pt_submit'),
        btnSub = ptSub.querySelector ('*');
    btnEnc.value = '加密内容';
    btnEnc.className = 'subbtn_bg';
    btnEnc.type = 'button';
    btnEnc.style.float   = 'none';
    btnEnc.style.display = 'block';
    btnEnc.addEventListener ('click', function () {
        var editBox = document.querySelector ('.tb-editor-editarea');
        if (!editBox)
            return alert ('Unable to read content!');
        var toEncContent = $u.decodeHTML (editBox.innerHTML.replace(/<br>/g, '[br]'));
        editBox.innerHTML = $u.sign + '<br>[hid]该内容使用 tieba bbCode 脚本加密: http://userscripts.org/scripts/show/167106[/hid]<br>#START#' + $u.encData(toEncContent) + "#END#";
    }, false);
    ptSub.insertBefore (btnEnc, btnSub);
}

addEventListener ('DOMContentLoaded', function () {
    
    // Multi-thread
    // 加密
    setTimeout (createEncBtn, 1);
    
    $u.quickInject ('style', 'code, bq { margin:0 0 1em 0; padding:50px 50px 40px; background:#fefefe; -webkit-border-radius:5px; -moz-border-radius:5px; \
border-radius:5px; -ms-border-radius:5px; position:relative; border:1px solid #ccc; display: block; }\
code:before, bq:before, bq:after { content: \'"\';  line-height:40px; height:30px; position:absolute; color:#aaa; }\
bq:before, bq:after {font-style:italic; font-size:40px; font-weight:bold; width:30px; }\
bq:before {top:20px; left:20px;}\
code {font-family: monospace;} code:before {content: \'代码片段:\'; font-size: 12px; top: 10px; left: 20px;}\
bq:after  { text-align:left; line-height:60px; bottom:20px; right:20px; }\
.post table { width:100%; margin:0 0 1em 0; }\
.post td, .post th { border:1px solid #ccc; padding:15px; }\
.post th { background:#eee; font-weight:normal; }\
hid {display: none !important;}'.replace(/bq/g, 'blockquote.qBlockJixun')
    .replace(/code/g, 'code.qBlockJixun')
    .replace(/post/gi, 'd_post_content'));
    
    var arrPosts = document.querySelectorAll ('div.d_post_content, span.lzl_content_main');
    if (!arrPosts.length)
        return;
    
    for (var i=0; i<arrPosts.length; i++) {
        var thisPost = arrPosts[i].innerHTML;
        if (thisPost.indexOf ($u.sign) == 0) {
            var mat = thisPost.match(/#START#(.+?)#END#/ig)||[];
            mat.forEach (function (e) {
                thisPost = thisPost.replace(e, $u.decData (e.replace(/#(START|END)#/ig, '')));
            });
            if (mat)
                thisPost = thisPost.substr ($u.sign.length + 4);
        }
        arrPosts[i].innerHTML = proc_bbCode (thisPost);
    }
    
}, false);