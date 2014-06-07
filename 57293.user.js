// ==UserScript==
// @name           yahoo Emote Plurk v.murezz 1
// @namespace      http://userscripts.org/scripts/show/39120
// @description    Easy to insert custom smiley (or emote) on Plurk.
// @include        http://www.plurk.com/*
// ==/UserScript==

// ==About Source==
// Originally from Emote Plurk v.murezz
// author: Muhammad Reza
// Email: murezz@gmail.com

// ********** Main Script ***********
var smileData = [];

smileData.push([
	'Yahoo!',
	'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/',
	[
	'3.gif',
	'5.gif',
	'6.gif',
	'7.gif',
	'13.gif',
	'18.gif',
	'25.gif',
	'27.gif',
	'101.gif',
	'100.gif',
	'102.gif',
	'104.gif',
	'105.gif',
	'30.gif',
	'32.gif',
	'35.gif',
	'40.gif',
	'42.gif',
	'45.gif',
	'47.gif',
	'109.gif',
	'110.gif',
	'111.gif',
	'112.gif',
	'113.gif',
	'114.gif',
	'69.gif',
	'106.gif',
	'107.gif',
	'51.gif',
	'53.gif',
	'57.gif',
	'59.gif',
	'61.gif',
	'63.gif',
	'65.gif',
	'67.gif',
	'68.gif',
	'71.gif',
	'76.gif',
	'78.gif'
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
            getById('input_big').addEventListener('keyup', replaceSmile, false);
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
    getById('emoticons_show').style.height = '150px';
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
	str += 'by <a href="http://www.artharry.com/" target"_blank">artharry.com</a>';
    str += '</div>';
    str += '<div>';
    for(var i=0, dat = data[2], _url; i<dat.length; i++)
    {
        _url = baseUrl + dat[i];
        str += '<a href="javascript:void 0;"><img src="'+_url+'" alt="'+dat[i]+'" title="['+ind+' '+i+']"/></a>';

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