// ==UserScript==
// @name            Plurk Smile Ver.OnionS 
// @include         http://www.plurk.com/*
// @description    	洋蔥頭（小圖） from 洋蔥酷樂部 http://blog.roodo.com/onion_club（Build 20091126）
// modified log:    
// author: Dravex


// ********** Main Script ***********
var smileData = [];

smileData.push([
	'OnionS',
	'http://i854.photobucket.com/albums/ab108/vvveeexxx/OnionS/',
	[
	'001_.gif','001_-v2.gif','002_.gif','003_.gif','004_.gif','005_.gif','005_x1.gif','005_x2.gif','006_.gif','007_.gif',
'008_.gif','008_x2.gif','009_.gif','009_v2.gif','010_.gif','011_.gif','012_a.gif','012_b.gif','013_a.gif','013_b.gif',
'014_.gif','015_.gif','015_v2.gif','015_x1.gif','016_.gif','016_x1.gif','016_x2.gif','017_.gif','018_.gif','019_.gif',
'020_.gif','021_.gif','021_x1.gif','021_x2.gif','021_x3.gif','021_x4.gif','022_a.gif','022_b.gif','023_.gif','024_.gif',
'025_.gif','026_.gif','027_.gif','027_x1.gif','028_.gif','029_.gif','030_.gif','031_.gif','032_.gif','033_.gif',
'034_.gif','035_.gif','036_.gif','037_.gif','038_.gif','039_.gif','039_x1.gif','039_x2.gif','040_.gif','041_.gif',
'042_.gif','043_.gif','044_.gif','045_.gif','046_.gif','047_.gif','048_.gif','049_.gif','050_.gif','051_.gif',
'052_.gif','053_.gif','054_.gif','055_.gif','056_.gif','057_.gif','058_.gif','058_x1.gif','059_.gif','060_.gif',
'061_.gif','062_.gif','063_.gif','064_.gif','064_x1.gif','065_.gif','066_.gif','067_.gif','068_.gif','069_.gif',
'070_.gif','071_.gif','072_.gif','073_.gif','074_.gif','075_.gif','076_.gif','077_.gif','078_.gif','079_.gif',
'080_.gif','081_.gif','082_.gif','082_-1.gif','083_.gif','083_v2.gif','084_.gif','084_x1.gif','084_x2.gif','084_x3.gif',
'084_x4.gif','085_.gif','086_.gif','087_.gif','088_.gif','089_01.gif','089_02.gif','090_.gif','091_.gif','091_-1.gif',
'091_-2.gif','091_-3.gif','091_v2.gif','092_.gif','093.gif','094_01.gif','094_02.gif','094_03.gif','094_04.gif','095_.gif',
'096_.gif','097_01.gif','097_02.gif','097_03.gif','097_04.gif','098_.gif','099_.gif','100_.gif','101_.gif','102_.gif',
'103_.gif','104_.gif','105_.gif','106_.gif','107_.gif','108_.gif','109_.gif','110_.gif','111_.gif','112_.gif',
'112_01.gif','112_02.gif','112_03.gif','112_-1.gif','113_.gif','114_.gif','115_.gif','116_.gif','117_.gif','118_.gif',
'c001_.gif','c002_.gif','c003_.gif','c004_.gif','c005_.gif','c006_.gif','c007_.gif','c008_.gif','c009_.gif','c010_.gif',
'c011_.gif','c012_.gif','c013_.gif','c014_.gif','c015_.gif','c016_.gif','c017_.gif','c018_.gif','c019_.gif','c020_.gif',
'c021_.gif','c022_.gif','c023_.gif','c024_.gif','c025_.gif','c026_.gif','c027_.gif','c028_.gif','c029_.gif','c030_.gif',
'c031_.gif','c032_.gif','c033_.gif','c034_.gif','c035_.gif','c036_.gif'
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
// ==/UserScript==