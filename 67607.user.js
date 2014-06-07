// ==UserScript==
// @name            Plurk emoticon all in
// @namespace       Plurk emoticon all in
// @description     Plurk emoticon all in
// @include        http://www.plurk.com/*
// modified log:    
// author: noname
// Changed : 
// ==/UserScript==
// ********** Main Script ***********

var smileData = [];


smileData.push([
'karma 25',
'http://s6.tinypic.com/',
[
'55fjfl_th.jpg',
'2n9gb9k_th.jpg',
'15n7u9w_th.jpg',
'21dl92s_th.jpg',
'2d8nkzk_th.jpg',
'121bh9k_th.jpg',
'2lw9lac_th.jpg',
'i39oua_th.jpg',
'zwgpkp_th.jpg',
'2edm83m_th.jpg',
'24fldhz_th.jpg',
'263ai2t_th.jpg',
'24xpi5z_th.jpg',
'2uskgmp_th.jpg',
'2s6rhu8_th.jpg',
'27x1ys_th.jpg',
'2dhxy83_th.jpg',
'2mrcefs_th.jpg',
'2dm7f39_th.jpg'
]
]);

smileData.push([
'karma 50',
'http://s6.tinypic.com/',
[
'4uz5lu_th.jpg',
'x1zkmc_th.jpg',
'2qnwbgh_th.jpg',
'2hczqma_th.jpg',
'iddv29_th.jpg',
'29vi0zb_th.jpg',
'2ck3uf_th.jpg',
'4i2a1c_th.jpg',
'5tz4he_th.jpg',
'b7dez4_th.jpg',
'5b9v1t_th.jpg',
'10nyjxu_th.jpg',
'1hf5v_th.jpg',
'2eeamxj_th.jpg',
'2rhoako_th.jpg',
'20zwx7n_th.jpg',
'2hwjui8_th.jpg',
'2q1dlll_th.jpg',
'vq794y_th.jpg'
]
]);

smileData.push([
'karma 81',
'http://s6.tinypic.com/',
[
'350jfc0_th.jpg',
'wtt761_th.jpg',
'15qynh0_th.jpg',
'23wrw9f_th.jpg',
'2rp5szk_th.jpg',
'27xm3bd_th.jpg',
'30j1yjc_th.jpg',
'35cmlpx_th.jpg',
'2lwaae9_th.jpg'
]
]);

smileData.push([
'karma 100',
'http://s6.tinypic.com/',
[
'2iup0kx_th.jpg',
'14kft41_th.jpg',
'2h3rhgy_th.jpg',
'2w2eiit_th.jpg',
'16lb9ef_th.jpg',
'factiw_th.jpg',
'29kytdu_th.jpg',
'10wsbix_th.jpg'
]
]);

smileData.push([
'rekrut',
'http://s6.tinypic.com/',
[
'280pnvk_th.jpg',
'213nrrd_th.jpg',
'21lo491_th.jpg',
'1zz0x13_th.jpg',
'icutci_th.jpg',
'i6wmqc_th.jpg',
'2iw598m_th.jpg',
'2z7mx5h_th.jpg',
'fp40hs_th.jpg',
'52yiqd_th.jpg'
]
]);

smileData.push([
'bonus',
'http://statics.plurk.com/',
[
'1a5f23ed863e70e52f239b045a48e6fb.gif',
'f5dbd5fdf5f5df69cfb024d6be76a76b.gif',
'e902170e97aee14836b5df6b0fe61ba2.gif',
'4e47047589f0f26a534674502af4d4e1.gif',
'7256dae81d56d150120ccd0c96dd2197.gif'
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