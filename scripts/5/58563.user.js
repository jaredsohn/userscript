// ==UserScript==
// @name          Twit·wit·ter Hangul Search
// @namespace     http://werebear.tistory.com/117
// @description   You can search Hangul in Twitter sidebar
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @author        gjwlstjr
// ==/UserScript==

var csobj = document.getElementById('custom_search');
if (csobj) {
csobj.innerHTML = '<form action="/timeline/search" class="search" id="sidebar_search_form" method="get">'
+ '<input id="o_sidebar_search_q" type="hidden" name="q" value=""/>'
+ '</form>'
+ '<form class="search" id="sidebar_search">'
+ '<input id="sidebar_search_q" type="text" name="q" accesskey="/" class="round-left" title="Search" value=""/>'
+ '<span id="sidebar_search_submit" class="submit round-right" title="Search">&nbsp;</span>'
+ '</form>';
}

var h2obj = document.getElementById('header2');
if (h2obj) {
    var inner = h2obj.innerHTML;
    if (/home_search/.test(inner)) {
        h2obj.innerHTML = inner.replace(' action="\/search" ', ' ') + '<form action="/search" class="search" id="home_search_form" method="post"><input id="o_home_search_q" type="hidden" name="q" /></form>';
    }
}

function ths_subst(keyword) {
    keyword = keyword.replace(/^\s*/,''); // trim leading white spaces
    var newword = '';
    while (keyword.length) {
        var myArray = /^\S*/.exec(keyword);
        var temp = myArray[0];
        var subword = '';
        var conj = ',';
        var isNeg = /^-/.test(temp);
        if (isNeg) {
            temp = temp.replace(/^-/,'');
            conj = ' OR -';
        }
        if (!(/^#/.test(temp))) // not hashtag
        {
            var sflag2 = false;
            while (temp.length > 0)
            {
                if (/^\w+:\S+/.test(temp)) break;

                var myar = /^[\u3131-\u318e\uac00-\ud7a3]\w+/.exec(temp); // 가123
                var sflag = false;
                if (myar)
                { 
                    sflag = true;
                    if (subword.length) subword += conj;
                    subword += myar[0];
                    temp = temp.replace(/^[\u3131-\u318e\uac00-\ud7a3]/,'');
                }
                else if (myvar = /^[\u3131-\u318e\uac00-\ud7a3]+/.exec(temp)) // 가나다라
                {
                    var hangul = myvar[0];
                    if (hangul.length > 2) // split with overraped 3 chars
                    {
                        for (var i = 0; i < hangul.length - 2; i++)
                        {
                            if (subword.length) subword += conj;
                            subword += hangul.charAt(i) + hangul.charAt(i+1) + hangul.charAt(i+1) + hangul.charAt(i+2);
                        }
                    }
                    else if (!sflag2)
                    {
                        if (subword.length) subword += conj;
                        subword += hangul;
                    }
                    temp = temp.replace(/^[\u3131-\u318e\uac00-\ud7a3]+/,'');
                }

                sflag2 = false;
                if (temp.length == 0) break;

                if (myvar = /^\w+[\u3131-\u318e\uac00-\ud7a3]{1,2}/.exec(temp)) // abc가나다
                {
                    sflag2 = true;
                    if (subword.length) subword += conj;
                    subword += myvar[0];
                    temp = temp.replace(/^\w+/,'');
                }
                else if (myvar = /^\w+/.exec(temp)) // abc
                {
                    if (!sflag)
                    {
                        if (subword.length) subword += conj;
                        subword += myvar[0];
                    }
                    temp = temp.replace(/^\w+/,'');
                }
                else if (myvar = /^@\w+/.exec(temp)) // @abc
                {
                    if (subword.length) subword += conj;
                    subword += myvar[0];
                    temp = temp.replace(/^@\w+/,'');
                }
                else if (myvar = /^[^A-Za-z0-9_\u3131-\u318e\uac00-\ud7a3]+/.exec(temp)) // non-word, non-hangul
                {
                    if (subword.length) subword += conj;
                    subword += myvar[0];               
                    temp = temp.replace(/^[^A-Za-z0-9_\u3131-\u318e\uac00-\ud7a3]+/,'');
                }
                else // abnormal
                {
                    if (subword.length) subword += conj;
                    subword += temp;
                    temp = '';
                }
            }
        }
        if (newword.length) newword += ' ';
        newword += myArray[0];
        
        if (subword.length && myArray[0] != subword)
        {
            if (isNeg)
                newword += ' -' + subword;
            else
                newword += ' OR ' + subword;
        }

        keyword = keyword.replace(/^\S*\s*/, '');
    }
    return newword;
}

function ths_submit(wh, e) {
    var keyword=document.getElementById(wh + '_search_q').value;
    document.getElementById('o_' + wh + '_search_q').value=ths_subst(keyword);
    document.getElementById(wh + '_search_form').submit();
}

var ssobj = document.getElementById('sidebar_search');
if (ssobj) {
ssobj.addEventListener('submit', function(e) { e.stopPropagation(); e.preventDefault(); ths_submit('sidebar', e); }, true);
}

var hsobj = document.getElementById('home_search');
if (hsobj) {
hsobj.addEventListener('submit', function(e) { e.stopPropagation(); e.preventDefault(); ths_submit('home', e); }, true);
}

