// ==UserScript==
// @name            Plurk Smile Ver.Neuro 
// @include         http://www.plurk.com/*
// @description    	小鸚鵡大愛～～（Build 20091126）
// modified log:    
// author: Dravex


// ********** Main Script ***********
var smileData = [];

smileData.push([
	'Neuro',
	'http://i854.photobucket.com/albums/ab108/vvveeexxx/Neuro/',
	[
	'lift.gif','ninetail.gif','cupid.gif','kiss.gif','kiss2.gif','bite.gif','can.gif','can2.gif','push.gif','eye.gif',
	'teacher.gif','shu.gif','prince.gif','prince2.gif','clap1.gif','clap2.gif','mnicons2_ai.gif','mnicons2_akane.gif','mnicons2_asada131.gif','mnicons2_asada54.gif',
	'mnicons2_aya.gif','mnicons2_eishi.gif','mnicons2_godai.gif','mnicons2_hal_kawa.gif','mnicons2_haruka.gif','mnicons2_hayasaka.gif','mnicons2_hayasaka2.gif','mnicons2_higuchi.gif','mnicons2_histerrier.gif','mnicons2_honjo.gif',
	'mnicons2_ikeya.gif','mnicons2_jun.gif','mnicons2_kaede.gif','mnicons2_kanae.gif','mnicons2_kasai.gif','mnicons2_mochi.gif','mnicons2_mutsuki.gif','mnicons2_neuro.gif','mnicons2_neuro2.gif','mnicons2_rice.gif',
	'mnicons2_saotome.gif','mnicons2_setsuna.gif','mnicons2_shirota.gif','mnicons2_todoroki.gif','mnicons2_tsukushi.gif','mnicons2_usui.gif','mnicons2_xi.gif','mnicons2_yako.gif','mnicons2_yuka.gif','mnicons2_yuki.gif',
	'mnicons2_yuki2.gif','mnicons4_akane.gif','mnicons4_eishi.gif','mnicons4_evil_f.gif','mnicons4_godai.gif','mnicons4_kanae.gif','mnicons4_neuro.gif','mnicons4_yako.gif','mnicons5_akane.gif','mnicons5_eishi.gif',
	'mnicons5_evil_f.gif','mnicons5_godai.gif','mnicons5_kanae.gif','mnicons5_neuro.gif','mnicons5_sabre.gif','mnicons5_yako.gif','mnicons_ai.gif','mnicons_akane.gif','mnicons_are.gif','mnicons_asada.gif',
	'mnicons_aya.gif','mnicons_eishi.gif','mnicons_evil_f.gif','mnicons_godai.gif','mnicons_hal_kawa.gif','mnicons_haruka.gif','mnicons_hayasaka.gif','mnicons_hayasaka2.gif','mnicons_higuchi.gif','mnicons_histerrier.gif',
	'mnicons_ikeya.gif','mnicons_jun.gif','mnicons_kanae.gif','mnicons_kasai.gif','mnicons_mochi.gif','mnicons_mochi2.gif','mnicons_neuro.gif','mnicons_neuro2.gif','IMG_000171.gif','mnicons_neuro3.gif',
	'mnicons_neuro4.gif','mnicons_rice.gif','mnicons_saotome.gif','mnicons_setsuna.gif','mnicons_shirota.gif','mnicons_tsukushi.gif','mnicons_tsuyoku.gif','mnicons_usui.gif','mnicons_webclap.gif','mnicons_webclap2.gif',
	'mnicons_webclap3.gif','mnicons_xi.gif','mnicons_yako.gif','mnicons_yuka.gif','mnicons_yuki.gif','mnicons_yuki2.gif','mnicons3_tori.gif','zzz.gif','fox.gif','pandaeye.jpg',
	'neuroturn.gif','neuroturn2.gif','neuroturn3.gif','neuroturn4.gif','usui.gif','usui2.gif','usuio.gif','usuio2.gif','us_aisatsu.gif','us_aisatsu2.gif',
	'usuipakpak.gif','usuipakpak2.gif','uragiri01.gif','uragiri02.gif','step.jpg','shoes.gif','bc7c347c_kyouzame.gif','orz.gif','akane.gif',
	'yakane.gif','akane_yama.gif','akanemizugi.gif','akanemizugi2.gif','claw.gif','a2.gif','a2a.gif','a3.gif','a3a.gif','banner2.gif',
	'banner1.gif','nylove.gif','nylover.gif','nyteam.gif','birdbana2.gif','birdbana2b.gif','iconn.gif','rusky-boz.gif','neukan.gif','neukan3.gif',
	'canbanner.gif','count.gif','neuro_h.gif','yako.gif','mer_01.gif','mer_02.gif','mer_03.gif','mer_05.gif','n.gif',
	'y.gif','ball_smile.gif','onion_scare.jpg','userif.gif','userif1.gif','mn_mail.gif','bs.gif','magen2.gif','mnicons3_ezaki2.gif','mnicons3_marurobo.gif',
	'mnicons3_monaka.gif','mnicons3_neuro.gif','mnicons3_yako_candy.gif','mnicons3_tension.gif','mnicons3_dorei1.gif','mnicons3_dorei2.gif','hold1.gif','hold2.gif','hold3.gif','roll.gif',
	'roll2.gif','kill.gif','hit.gif','pole.gif','neurochair.gif','mnicons3_eat.gif','eat.gif','sasakuza.gif','mnicons3_penpen.gif','mnicons3_ai.gif',
	'mnicons3_yakopolice.gif','mnicons3_neuropolice.gif','mnicons3_police.gif','mnicons3_sign.gif','mnicons3_talk.gif','mnicons3_talk2.gif','mnicons3_yako_a.gif','mnicons3_yako_b.gif','mnicons3_yako_c.gif','mnicons3_yako_d.gif'
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