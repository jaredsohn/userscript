// ==UserScript==
// @name           Kaskus Emoticon For Plurk Complete
// @namespace      http://www.plurk.com/Hauuzzz
// @description    Kaskus Emoticon For Plurk Complete
// @include        http://www.plurk.com/*
// by phuad
// ==/UserScript==

var smileData = [];


smileData.push([
	'Kaskus Emot',
	'http://static.kaskus.us/images/smilies/',
	[
        'fd_2.gif','I-Luv-Indonesia.gif','s_sm_maho.gif','malu.gif','ngakak.gif','s_big_batamerah.gif','takut.gif','ngacir2.gif','bingung.gif','fd_1.gif','shakehand2.gif','sundul.gif','fd_4.gif','berduka.gif','capede.gif','fd_8.gif','fd_6.gif','cystg.gif','toastcendol.gif','hammer.gif','marah.gif','najis.gif','nosara.gif','s_sm_ilovekaskus.gif','cewek.gif','s_sm_repost1.gif','s_big_cendol.gif','cekpm.gif','peluk.gif','hoax.gif','fd_5.gif','fd_4.gif','fd_7.gif','fd_3.gif','recseller.gif','matabelo1.gif','mewek.gif','angel1.gif','jempol2.gif','jempol1.gif','selamat.gif','dp.gif','babygirl.gif','babyboy1.gif','babyboy.gif','request.gif','sorry.gif','kaskus_radio.gif','nohope.gif','traveller.gif'
	]
]);

smileData.push([
	'Kaskus Emot(Small)',
	'http://www.kaskus.us/images/smilies/',
	[
        's_sm_cendol.gif','s_sm_batamerah.gif','s_sm_smile.gif','s_sm_peace.gif','cendols.gif','batas.gif','iloveindonesias.gif','cekpms.gif','berdukas.gif','capedes.gif','bingungs.gif','mahos.gif','najiss.gif','malus.gif','iluvkaskuss.gif','kisss.gif','mads.gif','ngakaks.gif','sundulgans.gif','takuts.gif','hammers.gif','reposts.gif','tabrakan.gif','smileyfm329wj.gif','bolakbalik.gif','ngacir.gif'
	]
]);

smileData.push([
	'Standard Smiles Page 1',
	'http://www.kaskus.us/images/smilies/sumbangan/',
	[
        'woof.gif','01.gif','amazed.gif','e02.gif','41.gif','30.gif','007.gif','shit-3.gif','6.gif','smiley_couple.gif','52.gif','39.gif','28.gif','5.gif','q20.gif','14.gif','frog.gif','48.gif','37.gif','26.gif','004.gif','q03.gif','25.gif','q11.gif','1.gif','15.gif','fuck-8.gif','18.gif','34.gif','017.gif','3.gif','4.gif','fuck-4.gif','43.gif','32.gif','8.gif'
	]
]);

smileData.push([
	'Standard Smiles Page 2',
	'http://www.kaskus.us/images/smilies/sumbangan/',
	[
        '42.gif','31.gif','008.gif','vana-bum-vanaweb-dot-com.gif','05.gif','crazy.gif','60.gif','40.gif','29.gif','006.gif','rice.gif','13.gif','smiley_beer.gif','49.gif','38.gif','27.gif','005.gif','q17.gif','07.gif','kribo.gif','47.gif','36.gif','06.gif','hi.gif','020.gif','35.gif','24.gif','paw.gif','7.gif','fuck-6.gif','44.gif','33.gif','014.gif','12.gif','kaskuslove.gif','e03.gif'
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