// ==UserScript==
// @name            Plurk Smile 
// @include         http://www.plurk.com/*
// @description    	
// modified log:    
// author: mee

// ********** Main Script ***********
var smileData = [];

smileData.push([
	'Bleach',
	'http://www.bleachexile.com/exec/images/emoticons/',
	[
	'th_ShunNanao2.gif','yumichikaiu7.gif','th_Hitsu2.gif','kuukakuef2.gif','ikkakubj0.gif','th_Zanbase1.gif','Yachiru.gif','th_EbilAi.gif','droypi2.gif','th_Mayuri1.gif','yuzukr9.gif','komamuraeo6.gif','komamuraeo6.gif','th_Hinamori2.gif','aizen2kw2.gif','ririn2dg2.gif','th_RenjiRukia1.gif','rabunf2.gif','th_ZangetsuAni.gif','chibi8.gif','roseuu3.gif','ibaxq6.gif','kenseiyx9.gif','th_Byakuya2.gif','th_Shunsui2.gif','th_Shuuhei69.gif','ichxrukia1ow.gif','th_HinaAi1.gif','orihimefc1.gif','th_RenjiNB.gif','hiyorinj0.gif','chibi18.gif','th_Byakuya1.gif','th_Kira1.gif','shuheiwa9.gif','th_RenjiWoo.gif','zarakilo9.gif','kaienge3.gif','th_Ukitake1.gif','th_Hina1.gif','th_Hina1.gif','th_Renji1.gif','th_Renji1.gif','hitsugayaid5.gif','chibi2.gif','th_ByakuRenji2.gif','th_KenYahchi.gif','soifonai2.gif','th_GinBoHaHa.gif','th_Rukia1.gif','yammyrn4.gif','izuruiu6.gif','th_Ulquiorra.gif','th_kon1.gif','hanatarosi7.gif','nakimzo3.gif','th_Ishida1.gif','ukitakelx1.gif','shawlongjm0.gif','urahara2eh8.gif','yamamotofw3.gif','smile-byakuya.gif'
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