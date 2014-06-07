// ==UserScript==
// @name            Plurk lol 娘娘惡搞版！  v1.01
// @namespace       http://userscripts.org/
// @description     純屬惡搞 http://www.plurk.com/niter
// @include         http://www.plurk.com/*
// modified log:   
// ==/UserScript==


// ********** Main Script ***********
var smileData = [];

smileData.push([
	'W2原版',
	'http://niter.myweb.hinet.net/w2-o/',
	[
	'o01.gif','o02.gif','o03.gif','o04.gif','o05.gif','o06.gif','o07.gif','o08.gif','o09.gif','o10.gif',
	'o11.gif','o12.gif','o13.gif','o14.gif','o15.gif','o16.gif','o17.gif','o18.gif','o19.gif','o20.gif',
	'o21.gif','o22.gif','o23.gif','o24.gif','o25.gif','o26.gif','o27.gif','o28.gif','o29.gif','o30.gif',
	'o31.gif','o32.gif','o33.gif','o34.gif','o35.gif','o36.gif','o37.gif','o38.gif','o39.gif','o40.gif',
	'o41.gif','o42.gif','o43.gif','o44.gif','o45.gif','o46.gif','o47.gif','o48.gif','o49.gif','o50.gif'
        ]
]);


smileData.push([
	'W2大俠',
	'http://niter.myweb.hinet.net/w2-s/',
	[
	's01.gif','s02.gif','s03.gif','s04.gif','s05.gif','s06.gif','s07.gif','s08.gif','s09.gif','s10.gif',
	's11.gif','s12.gif','s13.gif','s14.gif','s15.gif','s16.gif','s17.gif','s18.gif','s19.gif','s20.gif',
	's21.gif','s22.gif','s23.gif','s24.gif','s25.gif','s26.gif','s27.gif','s28.gif','s29.gif','s30.gif',
	's31.gif','s32.gif','s33.gif','s34.gif','s35.gif','s36.gif','s37.gif','s38.gif','s39.gif','s40.gif',
	's41.gif','s42.gif','s43.gif','s44.gif','s45.gif','s46.gif','s47.gif','s48.gif','s49.gif','s50.gif'
        ]
]);


smileData.push([
	'W2小熊',
	'http://niter.myweb.hinet.net/w2-b/',
	[
	'b01.gif','b02.gif','b03.gif','b04.gif','b05.gif','b06.gif','b07.gif','b08.gif','b09.gif','b10.gif',
	'b11.gif','b12.gif','b13.gif','b14.gif','b15.gif','b16.gif','b17.gif','b18.gif','b19.gif','b20.gif',
	'b21.gif','b22.gif','b23.gif','b24.gif','b25.gif','b26.gif','b27.gif','b28.gif','b29.gif','b30.gif',
	'b31.gif','b32.gif','b33.gif','b34.gif','b35.gif','b36.gif','b37.gif','b38.gif','b39.gif','b40.gif',
	'b41.gif','b42.gif','b43.gif','b44.gif','b45.gif','b46.gif','b47.gif','b48.gif','b49.gif','b50.gif'
        ]
]);


smileData.push([
	'W2小猴',
	'http://niter.myweb.hinet.net/w2-m/',
	[
	'm01.gif','m02.gif','m03.gif','m04.gif','m05.gif','m06.gif','m07.gif','m08.gif','m09.gif','m10.gif',
	'm11.gif','m12.gif','m13.gif','m14.gif','m15.gif','m16.gif','m17.gif','m18.gif','m19.gif','m20.gif',
	'm21.gif','m22.gif','m23.gif','m24.gif','m25.gif','m26.gif','m27.gif','m28.gif','m29.gif','m30.gif',
	'm31.gif','m32.gif','m33.gif','m34.gif','m35.gif','m36.gif','m37.gif','m38.gif','m39.gif','m40.gif',
	'm41.gif','m42.gif','m43.gif','m44.gif','m45.gif','m46.gif','m47.gif','m48.gif','m49.gif','m50.gif'
        ]
]);


smileData.push([
	'W2小豬',
	'http://niter.myweb.hinet.net/w2-p/',
	[
	'p01.gif','p02.gif','p03.gif','p04.gif','p05.gif','p06.gif','p07.gif','p08.gif','p09.gif','p10.gif',
	'p11.gif','p12.gif','p13.gif','p14.gif','p15.gif','p16.gif','p17.gif','p18.gif','p19.gif','p20.gif',
	'p21.gif','p22.gif','p23.gif','p24.gif','p25.gif','p26.gif','p27.gif','p28.gif','p29.gif','p30.gif',
	'p31.gif','p32.gif','p33.gif','p34.gif','p35.gif','p36.gif','p37.gif','p38.gif','p39.gif','p40.gif',
	'p41.gif','p42.gif','p43.gif','p44.gif','p45.gif','p46.gif','p47.gif','p48.gif','p49.gif','p50.gif'
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