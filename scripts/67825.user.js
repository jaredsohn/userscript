// ==UserScript==
// @name            Plurk my emo
// @namespace       Plurk my emo
// @description     Plurk my emo
// @include        http://www.plurk.com/*
// modified log:    
// author: noname
// Changed : 
// ==/UserScript==
// ********** Main Script ***********

var smileData = [];

smileData.push([
	'myemo',
	'http://s6.tinypic.com/',
	[
'e7awc4.jpg',
'5n9cmd.jpg',
'2vtwmir.jpg',
'2hrh4qt.jpg',
'655u1g.jpg',
'3478ew5.jpg',
'50o65j.jpg',
'al0o5u.jpg',
'2zfpj0k.jpg',
'2j68swk.jpg',
'2z4czyd.jpg',
'2sbsv1t.jpg',
'5n5949.jpg',
'14me5ih.jpg',
'1z4j2hg.jpg',
'r89q9d.jpg',
'2cgfxnr.jpg',
'1xyyqt.jpg',
'ng7p11.jpg',
'vrd9it.jpg',
'2cqz3gk.jpg',
'xu3d.jpg',
'vpgkl0.jpg',
'rtkoph.jpg',
'20r8una.jpg',
'2u7x46x.jpg',
'vr7cj4.jpg',
'34hfmn6.jpg',
'jfx5pz.jpg',
'9h44t4.jpg',
'2qbeki8.jpg',
'2hiawb4.jpg',
'349cljd.jpg',
'2rdks3l.jpg',
'2wow0ua.jpg',
'vhz01x.jpg',
'21ca1ra.jpg',
'e1ao85.jpg',
'2uy5clk.jpg',
'erlifq.jpg',
'33m5toj.jpg',
'343mzv7.jpg',
'11ux0l5.jpg',
'2cznrm.jpg',
'25ev393.jpg',
'6ds9cl.jpg',
'se3n7o.jpg',
'71o5ub.jpg',
'2uojo9f.jpg',
'23w19mt.jpg',
'sxi16d.jpg',
'16jett0.jpg',
'25r2kgh.jpg',
'2vwxoxt.jpg',
'2ynf0q1.jpg',
'23uvnsl.jpg',
'xnvtix.jpg',
'wujwah.jpg',
'2a4z5l4.jpg',
'20u5nk3.jpg',
'2ni2x04.jpg',
'5wwex4.jpg',
'aew1eo.jpg',
'29lmij7.jpg',
'25jjwu9.jpg',
'15fi3pj.jpg',
'2vs4t8i.jpg',
'20nsck.jpg',
'3151qp1.jpg',
'21dlgtx.jpg',
'ifa3vo.jpg',
'wbuiwi.jpg',
'24wfzmt.jpg',
'308i4r7.jpg',
'2r6h84l.jpg',
'nffrbb.jpg',
'358qd6r.jpg',
'rbzm7p.jpg',
'1znbvr4.jpg',
'24ys9w0.jpg',
'11lufjn.jpg',
'x2rxhd.jpg',
'1zw0k5z.jpg',
'28204d4.jpg',
'av2yag.jpg',
'3d0ra.jpg',
'2u70kl3.jpg',
'cklzb.jpg',
'k1svmu.jpg',
'2krjud.jpg',
'rleucn.jpg',
'mc3c50.jpg',
'a4ot3d.jpg',
'2vwwn11.jpg',
'23k7l1h.jpg',
'104ri1g.jpg',
'4lnlzq.jpg',
'2ldhjxi.jpg',
's5v5fq.jpg',
'2lc1o2.jpg',
'fvw9z6.jpg',
'w7l8av.jpg',
'30agqoo.jpg',
'2zgtdlf.jpg',
'2ekpy5v.jpg',
'2r3gm6b.jpg'
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
