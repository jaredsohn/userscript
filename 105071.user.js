// ==UserScript==
// @name           Drag-select_Dictionary
// @namespace      http://userscripts.org/scripts/show/105071
// @description    Get definition & pronunciation of any word on web page just by drag-selecting or double-clicking on the word.
// @version        1.0.6
// @author         redWoods
// @include        http://*
// @include        https://addons.mozilla.org/*
// @include        https://github.com/*
// @exclude        http://control.blog.sina.com.cn/*
// @exclude        http://qing.weibo.com/blog/controllers/*
// @exclude        http://*.12306.cn/*
// @exclude        http://*.10086.cn/*
// @exclude        http://*.10010.com/*
// @exclude        http://*.ct10000.com/*
// @exclude        http://*.weather.com.cn/*
// ==/UserScript==

/* true--enabled; false--disabled */
var DictCN_Enabled = true;    // http://dict.cn

if( DictCN_Enabled )
{
    void((function()
    {
        var element=document.createElement( 'script' );
        element.setAttribute( 'src', 'http://dict.cn/hc/' );
        document.body.appendChild( element );
    })())
}
