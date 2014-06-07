// ==UserScript==
// @name           Monkey Emoticon For Plurk
// @namespace      http://www.plurk.com/kazekagekhunz
// @description    Monkey Emoticon For Plurk
// @include        http://www.plurk.com/*
// by udarian modified by khunz
// ==/UserScript==

var smileData = [];


smileData.push([
	'monks',
	'http://www.laymark.com/i/m/',
	[
        'm207.gif','m159.gif','m155.gif','m171.gif','m173.gif','m054.gif','m121.gif','m146.gif','m011.gif','m131.gif','m145.gif','m052.gif','m136.gif','m059.gif','m009.gif','m073.gif','m182.gif','m139.gif','m148.gif','m151.gif','m153.gif','m154.gif','m204.gif','m175.gif','m082.gif','m170.gif','m021.gif','m015.gif','m042.gif','m012.gif','m013.gif','m111.gif','m024.gif','m057.gif','m010.gif','m105.gif','m101.gif','m130.gif','m026.gif','m049.gif','m208.gif','m189.gif','m032.gif','m023.gif','m167.gif','m033.gif','m109.gif'
	]
]);

smileData.push([
	'monks1',
	'http://www.laymark.com/i/m/',
	[
        'm006.gif','m025.gif','m068.gif','m099.gif','m162.gif','m100.gif','m112.gif','m187.gif','m196.gif','m192.gif','m181.gif','m067.gif','m029.gif','m133.gif','m194.gif','m185.gif','m179.gif','m088.gif','m035.gif','m197.gif','m003.gif','m079.gif','m074.gif','m040.gif','m095.gif','m152.gif','m071.gif','m014.gif','m097.gif','m048.gif','m107.gif','m031.gif','m178.gif','m123.gif','m038.gif','m118.gif','m058.gif','m187.gif','m034.gif,'m190.gif','m086.gif'
	]
]);

var isinit = false;
var currInput = null;
var rplreg = /\[(\d+) (\d+)\]/g;
var pageState = location.href.split('/')[3];

window.addEventListener('load', function()
{
    setTimeout(function()
    {
        var selImgs = document.getElementsByClassName('smily_holder');

        // bind key up event
        if(pageState == 'p')
            getById('input_permalink').addEventListener('keyup', replaceSmile, false);
        else
        {
             if (document.getElementById('input_big')) { getById('input_big').addEventListener('keyup', replaceSmile, false); }
            getById('input_small').addEventListener('keyup', replaceSmile, false);
        }

        // create tabs
        for(var i=0; i<selImgs.length; i++)
        {
            selImgs[i].setAttribute('ref', selImgs.length - i);
            selImgs[i].addEventListener('click', function()
            {
                isinit || setTimeout(init, 1000);
                currInput = pageState != 'p' ? this.getAttribute('ref') == 2 ? getById('input_big') : getById('input_small') : getById('input_permalink');
            }, false);
        }
    }, 2000);
}, false);


// init
function init()
{
    isinit = true;
    // init contents
    for(var i=0; i<smileData.length; i++)
    {
        addTab(i, smileData[i]);
    }
    // init css
    getById('emoticons_show').style.width  = '100%';
    getById('emoticons_show').style.height = '200px';
    getById('emoticons_show').style.overflow = 'auto';
}

function replaceSmile()
{
    if(rplreg.test(this.value))
        this.value = this.value.replace(rplreg, doReplace);
}

function doReplace(str, datid, smileid)
{
    arr = smileData[datid];
    if (typeof(arr) != 'undefined')
    {
        if(typeof(arr[2][smileid]) != 'undefined')
            str = ' ' + smileData[datid][1] + smileData[datid][2][smileid] + ' ';
    }
    return str;
}

function addTab(id, data)
{
    var myli = document.createElement('li');
    myli.className = 'emoticon_selecter';
    myli.innerHTML = '<a href="javascript:void 0;">'+data[0]+'</a>';
    myli.addEventListener('click', function()
    {
        addImages(this, id);
    }, false);

    getById('emoticons_tabs').getElementsByTagName('ul')[0].appendChild(myli);
}

function addImages(obj, ind)
{
    var showDiv = getById('emoticons_show');
    var lis = getById('emoticons_tabs').getElementsByTagName('li');
    for(var i=0; i<lis.length; i++)
        lis[i].className = 'emoticon_selecter';

    obj.className += ' current';

    var data = smileData[ind];
    var baseUrl = data[1];
    var str = '<div>';
    for(var i=0, dat = data[2], _url; i<dat.length; i++)
    {
        _url = baseUrl + dat[i];
        str += '<a href="javascript:void 0;"><img width="40" src="'+_url+'" alt="'+dat[i]+'" title="['+ind+' '+i+']" /></a>';

    }
    str += '</div>';
    showDiv.innerHTML = str;
    
    var imgs = showDiv.getElementsByTagName('img');
    for(var i=0; i<imgs.length; i++)
    {
        imgs[i].addEventListener('click', function()
        {
            currInput.value += ' ' + this.src + ' ';
            currInput.focus();
        }, false);
    }
}

function getById(oid)
{
    return document.getElementById(oid);
}