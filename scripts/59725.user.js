// ==UserScript==
// @name            Plurk Smile Ver.FaceWord 
// @include         http://www.plurk.com/*
// @description    	方便好用的動態顏文字＝v＝（Build 20091014）
// modified log:    
// author: Dravex


// ********** Main Script ***********
var smileData = [];

smileData.push([
	'顏の字',
	'http://i854.photobucket.com/albums/ab108/vvveeexxx/FaceWord/',
	[
	'wf0.gif','wf1.gif','wf2.gif','wf3.gif','wf4.gif','wf5.gif','wf6.gif','wf7.gif','wf8.gif','wf9.gif',
	'wf10.gif','wf11.gif','wf12.gif','wf13.gif','wf14.gif','wf15.gif','wf16.gif','wf17.gif','wf18.gif','wf19.gif',
	'wf20.gif','wf21.gif','wf22.gif','wf23.gif','wf24.gif','wf25.gif','wf26.gif','wf27.gif','wf28.gif','wf29.gif',
	'wf30.gif','wf31.gif','wf32.gif','wf33.gif','wf34.gif','wf35.gif','wf36.gif','wf37.gif','wf38.gif','wf39.gif',
	'wf40.gif','wf41.gif','wf42.gif','wf43.gif','wf44.gif','wf45.gif','wf46.gif','wf47.gif','wf48.gif','wf49.gif',
	'wf50.gif','wf51.gif','wf52.gif','wf53.gif','wf54.gif','wf55.gif','wf56.gif','wf57.gif','wf58.gif','wf59.gif',
	'wf60.gif','wf61.gif','wf62.gif','wf63.gif','wf64.gif','wf65.gif','wf66.gif','wf67.gif','wf68.gif','wf69.gif',
	'wf70.gif','wf71.gif','wf72.gif','wf73.gif','wf74.gif','wf75.gif','wf76.gif','wf77.gif','wf78.gif','wf79.gif',
	'wf80.gif','wf81.gif','wf82.gif','wf83.gif','wf84.gif','wf85.gif','wf86.gif','wf87.gif','wf88.gif','wf89.gif',
	'wf90.gif','wf91.gif','wf92.gif','wf93.gif','wf94.gif','wf95.gif','wf96.gif','wf97.gif','wf98.gif','wf99.gif',
	'wf100.gif','wf101.gif','wf102.gif','wf103.gif','wf104.gif','wf105.gif','wf106.gif','wf107.gif','wf108.gif','wf109.gif',
	'wf110.gif','wf111.gif','wf112.gif','wf113.gif','wf114.gif','wf115.gif','wf116.gif','wf117.gif','wf118.gif','wf119.gif',
	'wf120.gif','wf121.gif','wf122.gif','wf123.gif','wf124.gif','wf125.gif','wf126.gif','wf127.gif','wf128.gif','wf129.gif',
	'wf130.gif','wf131.gif','wf132.gif','wf133.gif','wf134.gif','wf135.gif','wf136.gif','wf137.gif','wf138.gif','wf139.gif',
	'wf140.gif','wf141.gif','wf142.gif','wf143.gif','wf144.gif','wf145.gif','wf146.gif','wf147.gif','wf148.gif','wf149.gif',
	'wf150.gif','wf151.gif','wf152.gif','wf153.gif','wf154.gif','wf155.gif','wf156.gif','wf157.gif','wf158.gif','wf159.gif',
	'wf160.gif','wf161.gif','wf162.gif','wf163.gif','wf164.gif','wf165.gif','wf166.gif','wf167.gif','wf168.gif','wf169.gif',
	'wf170.gif','wf171.gif','wf172.gif','wf173.gif','wf174.gif','wf175.gif','wf176.gif','wf177.gif','wf178.gif','wf179.gif'	
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