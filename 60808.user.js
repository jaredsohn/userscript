// ==UserScript==
// @name            Plurk Smile Ver.WSCat 
// @include         http://www.plurk.com/*
// @description    	猥瑣貓系列（Build 20091126）
// modified log:    
// author: Dravex


// ********** Main Script ***********
var smileData = [];

smileData.push([
	'WSCat',
	'http://i854.photobucket.com/albums/ab108/vvveeexxx/WSCat/',
	[
	'001.jpg','002.jpg','003.jpg','004.jpg','005.jpg','006.jpg','007.jpg','008.jpg','009.jpg','009_v2.gif',
	'010.jpg','011.jpg','012.jpg','013.jpg','014.jpg','015.jpg','016.jpg','017.jpg','018.jpg','019.jpg',
	'020.jpg','021.jpg','022.jpg','023.jpg','024.jpg','025.jpg','026.jpg','027.jpg','028.jpg','029.jpg',
	'030.jpg','031.jpg','032.jpg','033.jpg','034.jpg','035.jpg','036.jpg','037.jpg','038.jpg','039.jpg',
	'040.jpg','041.jpg','042.jpg','043.jpg','044.jpg','045.jpg','046.jpg','047.jpg','048.jpg','049.jpg',
	'050.jpg','051.jpg','052.jpg','053.jpg','054.jpg','055.jpg','056.gif','057.jpg','058.jpg','059.jpg',
	'060.jpg','061.jpg','062.jpg','063.jpg','064.jpg','065.jpg','066.jpg','067.jpg','068.jpg','069.jpg',
	'070.jpg','071.jpg','072.jpg','073.jpg','074.jpg','075.jpg','076.jpg','077.jpg','078.jpg','079.jpg',
	'080.jpg','081.jpg','082.jpg','083.jpg'
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