// ==UserScript==
// @name           Paogray Smile Plurk
// @namespace      http://paogray.com/wp/
// @description    原作：Plurk Smile ++ 改變個人喜好表情
// @version        1.0
// @include        http://www.plurk.com/*
// ==/UserScript==

// ==About==
// author: Paogray
// Email: howbiggun#gmail.com
// blog: http://paogray.com/wp/

// ********** Main Script ***********
var smileData = [];

smileData.push([
	'兔斯基1~30',
	'http://i583.photobucket.com/albums/ss275/paogray3/',
	[
		'tusky1.gif','tusky2.gif','tusky3.gif','tusky4.gif','tusky5.gif','tusky6.gif',
	    'tusky7.gif','tusky8.gif','tusky9.gif','tusky10.gif','tusky11.gif','tusky12.gif',
	    'tusky13.gif','tusky14.gif','tusky15.gif','tusky16.gif','tusky17.gif','tusky18.gif',
	    'tusky19.gif','tusky20.gif','tusky21.gif','tusky22.gif','tusky23.gif','tusky24.gif',
	    'tusky25.gif','tusky26.gif','tusky27.gif','tusky28.gif','tusky29.gif','tusky30.gif'
	]
]);

smileData.push([
	'兔斯基31~60',
	'http://i583.photobucket.com/albums/ss275/paogray3/',
	[
		'tusky31.gif','tusky32.gif','tusky33.gif','tusky34.gif','tusky35.gif','tusky36.gif',
	    'tusky37.gif','tusky38.gif','tusky39.gif','tusky40.gif','tusky41.gif','tusky42.gif',
	    'tusky43.gif','tusky44.gif','tusky45.gif','tusky46.gif','tusky47.gif','tusky48.gif',
	    'tusky49.gif','tusky50.gif','tusky51.gif','tusky52.gif','tusky53.gif','tusky54.gif',
	    'tusky55.gif','tusky56.gif','tusky57.gif','tusky58.gif','tusky59.gif','tusky60.gif'
	]
]);

smileData.push([
	'兔斯基61~90',
	'http://i583.photobucket.com/albums/ss275/paogray3/',
	[
		'tusky61.gif','tusky62.gif','tusky63.gif','tusky64.gif','tusky65.gif','tusky66.gif',
	    'tusky67.gif','tusky68.gif','tusky69.gif','tusky70.gif','tusky71.gif','tusky72.gif',
	    'tusky73.gif','tusky74.gif','tusky75.gif','tusky76.gif','tusky77.gif','tusky78.gif',
	    'tusky79.gif','tusky80.gif','tusky81.gif','tusky82.gif','tusky83.gif','tusky84.gif',
	    'tusky85.gif','tusky86.gif','tusky87.gif','tusky88.gif','tusky89.gif','tusky90.gif'
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
            getById('input_big') && getById('input_big').addEventListener('keyup', replaceSmile, false);
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
    for(var i=0, dat = data[2], _url; i<dat.length; i++)
    {
        _url = baseUrl + dat[i];
        str += '<a href="javascript:void 0;"><img src="'+_url+'" alt="'+dat[i]+'" title="['+ind+' '+i+']" /></a>';

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