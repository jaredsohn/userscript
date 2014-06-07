// ==UserScript==
// @name           Get Picasaweb Image URL
// @namespace      http://phpz.org/
// @version        2.2
// @include        http://picasaweb.google.com/*
// ==/UserScript==

var __suj_picasaweb_isinit = false;
var __suj_parent_input;
var __suj_imgurl_input = [];
var __suj_sizes = [32,48,64,72,104,144,160,200,220,288,320,400,512,576,640,720,800,912,1024,1152,1280,1440,1600];
var __suj_default_size_id = 12;  // default 512px;
window.addEventListener('load', init, false);
function init()
{
    var imglinks = document.getElementsByClassName('goog-icon-list-icon-link');
    if(imglinks.length > 0)
    {
        for(var i=0, l=imglinks.length; i<l; i++)
        {
            imglinks[i].addEventListener(
                'mouseup', 
                function()
                {
                    setTimeout(bindEvent, 1500);
                }, false);
        }
    }
    else
        bindEvent();
}

function bindEvent()
{
    var ind, l;
    var buttons   = document.getElementsByClassName('goog-button');
    for(ind=0, l=buttons.length; ind<l; ind++)
    {
        buttons[ind].addEventListener(
            'click', 
            function()
            {
                var selecter = document.getElementById('lhid_snippet_size');
                __suj_default_size_id = selecter.options.length < 10 ? __suj_default_size_id : selecter.options.selectedIndex;
                setTimeout(rebuildSizeList, 1500);
            }, false);
    }
    var hakelinks = document.getElementsByClassName('gphoto-embedLinks-header');
    for(ind=0, l=hakelinks.length; ind<l; ind++)
        hakelinks[ind].addEventListener(
            'click',
            function()
            {
                !__suj_picasaweb_isinit && createUI();
            }, false);
}

function createUI()
{
    if(rebuildSizeList())
    {
        __suj_picasaweb_isinit = true;
        var appendin = document.getElementsByClassName('gphoto-embed-options')[0].parentNode;
        var mylabel  = document.createElement('label');
        __suj_imgurl_input.push(document.createElement('input'));
        __suj_imgurl_input.push(document.createElement('input'));
        __suj_imgurl_input.push(document.createElement('input'));

        mylabel.innerHTML = '图片地址';

        var myp = appendin.appendChild(document.createElement('p'));
        myp.appendChild(mylabel);
        for(var ind in __suj_imgurl_input)
        {
            __suj_imgurl_input[ind].className = 'gphoto-sidebar-inputbox';
            __suj_imgurl_input[ind].addEventListener('mouseover',  function(){getImageUrl();this.select();}, false);
            __suj_imgurl_input[ind].addEventListener('click',  function(){getImageUrl();this.select();}, false);
            myp.appendChild(document.createElement('br'));
            myp.appendChild(__suj_imgurl_input[ind]);
        }
        setTimeout(getImageUrl, 500);
    }
}

function rebuildSizeList()
{
    var selecter = document.getElementById('lhid_snippet_size');
    if(selecter)
    {
        __suj_parent_input = document.getElementById('lhid_snippet_embed');
        __suj_parent_input.value = __suj_parent_input.value.replace(/\/s\d+\//i, '/s' + __suj_sizes[__suj_default_size_id] + '/');
        selecter.options.length = 0;
        var op;
        for(var s in __suj_sizes)
        {
            op = new Option();
            op.text  = __suj_sizes[s] + 'px';
            op.value = __suj_sizes[s];
            selecter.options.add(op);
        }
        selecter.selectedIndex = __suj_default_size_id;
    }
    return selecter;
}

function getImageUrl()
{
    var str = __suj_parent_input.value;
    str.match(/<img\s+src\s*\=\s*\"([^\"]+?)\"/i);
    __suj_imgurl_input[0].value = RegExp['$1'];
    __suj_imgurl_input[1].value = '<img src="'+RegExp['$1']+'" />';
    __suj_imgurl_input[2].value = '[img]'+RegExp['$1']+'[/img]';
}