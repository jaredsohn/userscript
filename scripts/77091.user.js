// ==UserScript==
// @name            Spiderman&etc
// @include         http://www.plurk.com/*
// @description    	
// modified log:    
// author: mee

// ********** Main Script ***********
var smileData = [];

smileData.push([
	'auntmay',
	'http://pildid.gifmania.co.ee/19/985/1003/',
	[
	'aunt-may.gif'
    ]
]);

smileData.push([
'greengoblin',
	'http://pildid.gifmania.co.ee/19/985/991/',
	[
	'green-goblin4.gif','green-goblin1.gif','green-goblin2.gif','green-goblin3.gif','green-goblin5.gif'
    ]
]);

smileData.push([
'octopus',
	'http://pildid.gifmania.co.ee/19/985/998/',
	[
	'dr-octopus.gif'
    ]
]);

smileData.push([
'MJ',
	'http://pildid.gifmania.co.ee/19/985/996/',
	[
	'mary-jane-watson.gif'
    ]
]);

smileData.push([
'beetle',
	'http://pildid.gifmania.co.ee/19/985/986/',
	[
	'beetle.gif'
    ]
]);

smileData.push([
'kraven',
	'http://pildid.gifmania.co.ee/19/985/994/',
	[
	'kraven.gif'
    ]
]);

smileData.push([
'chameleon',
	'http://pildid.gifmania.co.ee/19/985/988/',
	[
	'chameleon.gif'
    ]
]);

smileData.push([
'jonah',
	'http://pildid.gifmania.co.ee/19/985/993/',
	[
	'jonah-jameson.gif'
    ]
]);

smileData.push([
'blackcat',
	'http://pildid.gifmania.co.ee/19/985/987/',
	[
	'black-cat.gif'
    ]
]);

smileData.push([
'blackspider',
	'http://pildid.gifmania.co.ee/19/985/1010/',
	[
	'black-spider-man.gif'
    ]
]);

smileData.push([
'peterparker',
	'http://pildid.gifmania.co.ee/19/985/999/',
	[
	'peter-parker.gif'
    ]
]);

smileData.push([
'peter',
	'http://pildid.gifmania.co.ee/19/985/999/',
	[
	'peter-parker1.gif'
    ]
]);

smileData.push([
'venom',
	'http://pildid.gifmania.co.ee/19/985/1004/',
	[
	'venom.gif','venom2.gif','venom3.gif','venom4.gif','venom5.gif','venom6.gif','venom7.gif'
    ]
]);

smileData.push([
'spidermanreal',
	'http://pildid.gifmania.co.ee/19/985/1009/',
	[
	'spider-man3.gif','spider-man13.gif','spider-man10.gif','spider-man8.gif','spider-man2.gif'
    ]
]);

smileData.push([
'spidey',
	'http://pildid.gifmania.co.ee/19/985/1006/'
	[
	'spider-man.gif','spider-man19.gif','spider-man17.gif','spider-man16.gif','spider-man14.gif','spider-man32.gif','spider-man34.gif','spider-man9.gif','spider-man10.gif','spider-man12.gif','spider-man2.gif','spider-man21.gif','spider-man30.gif','spider-man29.gif','spider-man37.gif','spider-man35.gif','spider-man1.gif','spider-man6.gif','spider-man26.gif'
    ]
]);

smileData.push([
'carnage',
	'http://pildid.gifmania.co.ee/19/985/989/',
	[
	'carnage.gif'
    ]
]);

smileData.push([
'spideymix',
	'http://pildid.gifmania.co.ee/19/985/1007/',
	[
	'spider-man3.gif','spider-man.gif'
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