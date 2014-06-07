// ==UserScript==
// @name           Plurk Smile with Kolobok
// @namespace      http://ag.ru
// @description    Easy to insert custom smile (with Kolobok)
// @include        http://www.plurk.com/*
// ==/UserScript==

// ==About==
// author: Seven Yu
// Changed : Reterius
// Email: 
// ==/About==

// ********** Main Script ***********
var smileData = [];

smileData.push([
	'Onion',
	'http://ipx6.cn/plotion/onion/',
	[
		'ah.gif','ah2.gif','ah3.gif','angry.gif','angry2.gif','angry3.gif',
		'angry4.gif','angry5.gif','baby.gif','bath.gif','buddha.gif','bye.gif',
		'circle.gif','cold.gif','cold2.gif','cold3.gif','cold4.gif','comfortable.gif',
		'cool.gif','cry.gif','cry2.gif','cry3.gif','cry4.gif','dizzy.gif','faint.gif',
		'ghost.gif','glasses.gif','hand.gif','happiness.gif','hope.gif','idea.gif',
		'ill.gif','knife.gif','lol.gif','look.gif','love.gif','lovely.gif','music.gif',
		'nose.gif','oh2.gif','orz2.gif','pia.gif','question.gif','redcard.gif','runcry.gif',
		'shrug.gif','shy.gif','shy2.gif','shy3.gif','sleep.gif','smile.gif','smoke.gif',
		'soccer.gif','soccer2.gif','soccer3.gif','speed.gif','star.gif','sweat.gif',
		'sweatlove.gif','think.gif','vomit.gif','w.gif','wall.gif','wind.gif',
		'wind2.gif','wow.gif','xd.gif','yawn.gif','yellowcard.gif'
	]
]);

smileData.push([
    'Rabbit',
    'http://ipx6.cn/plotion/rabbit/',
    [
        'r1.gif','r2.gif','r3.gif','r4.gif','r5.gif','r6.gif','r7.gif','r8.gif','r9.gif',
        'r10.gif','r11.gif','r12.gif','r13.gif','r14.gif','r15.gif','r16.gif','r17.gif',
        'r18.gif','r19.gif','r20.gif','r21.gif','r22.gif','r23.gif','r24.gif','r25.gif',
        'r26.gif','r27.gif','r28.gif','r29.gif','r30.gif','r31.gif','r32.gif','r33.gif',
        'r34.gif','r35.gif','r36.gif','r37.gif','r38.gif','r39.gif','r40.gif','r41.gif',
        'r42.gif','r43.gif','r44.gif','r45.gif','r46.gif','r47.gif','r48.gif','r49.gif',
        'r50.gif','r51.gif','r52.gif','r53.gif','r54.gif','r55.gif','r56.gif','r57.gif',
        'r58.gif','r59.gif','r60.gif','r61.gif','r62.gif','r63.gif','r64.gif','r65.gif',
        'r66.gif','r67.gif','r68.gif','r69.gif','r70.gif','r71.gif','r72.gif','r73.gif',
        'r74.gif','r75.gif','r76.gif','r77.gif','r78.gif'
    ]
]);

smileData.push([
	'Banana',
	'http://ipx6.cn/plotion/Banana/',
	[
		'ba1.gif','ba2.gif','ba3.gif','ba4.gif','ba5.gif','ba6.gif','ba7.gif','ba8.gif','ba9.gif',
        'ba10.gif','ba11.gif','ba12.gif','ba13.gif','ba14.gif','ba15.gif','ba16.gif','ba17.gif',
        'ba18.gif','ba19.gif','ba20.gif','ba21.gif','ba22.gif','ba23.gif','ba24.gif','ba25.gif',
        'ba26.gif','ba27.gif','ba28.gif','ba29.gif','ba30.gif','ba31.gif','ba32.gif','ba33.gif',
        'ba34.gif','ba35.gif','ba36.gif','ba37.gif','ba38.gif','ba39.gif','ba40.gif','ba41.gif',
        'ba42.gif','ba43.gif','ba44.gif','ba45.gif','ba46.gif','ba47.gif','ba48.gif','ba49.gif',
        'ba50.gif','ba51.gif','ba52.gif','ba53.gif','ba54.gif','ba55.gif','ba56.gif','ba57.gif',
        'ba58.gif','ba59.gif','ba60.gif','ba61.gif','ba62.gif','ba63.gif','ba64.gif','ba65.gif',
        'ba66.gif','ba67.gif','ba68.gif','ba69.gif','ba70.gif','ba71.gif','ba72.gif','ba73.gif',
        'ba74.gif','ba75.gif','ba76.gif','ba77.gif','ba78.gif','ba79.gif','ba80.gif','ba81.gif',
        'ba82.gif','ba83.gif','ba84.gif','ba85.gif','ba86.gif','ba87.gif','ba88.gif','ba89.gif',
        'ba90.gif','ba91.gif','ba92.gif','ba93.gif','ba94.gif','ba95.gif','ba96.gif','ba97.gif',
        'ba98.gif','ba99.gif','ba100.gif','ba101.gif','ba102.gif','ba103.gif','ba104.gif','ba105.gif',
        'ba106.gif','ba107.gif','ba108.gif','ba109.gif','ba110.gif','ba111.gif','ba112.gif','ba113.gif',
        'ba114.gif','ba115.gif','ba116.gif','ba117.gif','ba118.gif','ba119.gif','ba120.gif','ba121.gif',
        'ba122.gif','ba123.gif','ba124.gif','ba125.gif','ba126.gif','ba127.gif','ba128.gif','ba129.gif',
        'ba130.gif','ba131.gif','ba132.gif','ba133.gif','ba134.gif','ba135.gif','ba136.gif','ba137.gif',
        'ba138.gif','ba139.gif','ba140.gif','ba141.gif','ba142.gif','ba143.gif','ba144.gif','ba145.gif',
        'ba146.gif','ba147.gif','ba148.gif','ba149.gif','ba150.gif','ba151.gif','ba152.gif','ba153.gif',
        'ba154.gif','ba155.gif','ba156.gif'
	]
]);

smileData.push([
	'Animated',
	'http://www.addemoticons.com/emoticon/animated/',
	[
	'AddEmoticons0421.gif','AddEmoticons0422.gif','AddEmoticons0423.gif','AddEmoticons0424.gif','AddEmoticons0425.gif',
	'AddEmoticons0426.gif','AddEmoticons0427.gif','AddEmoticons0428.gif','AddEmoticons0429.gif','AddEmoticons04210.gif',
	'AddEmoticons04211.gif','AddEmoticons04212.gif','AddEmoticons04213.gif','AddEmoticons04214.gif','AddEmoticons04215.gif',
	'AddEmoticons04216.gif','AddEmoticons04217.gif','AddEmoticons04218.gif','AddEmoticons04219.gif','AddEmoticons04220.gif',
	'AddEmoticons04221.gif','AddEmoticons04222.gif','AddEmoticons04223.gif','AddEmoticons04224.gif','AddEmoticons04225.gif',
	'AddEmoticons04226.gif','AddEmoticons04227.gif','AddEmoticons04228.gif','AddEmoticons04229.gif','AddEmoticons04230.gif',
	'AddEmoticons04231.gif','AddEmoticons04232.gif','AddEmoticons04233.gif','AddEmoticons04234.gif','AddEmoticons04235.gif',
	'AddEmoticons04236.gif','AddEmoticons04237.gif','AddEmoticons04238.gif','AddEmoticons04239.gif','AddEmoticons04240.gif',
	'AddEmoticons04241.gif','AddEmoticons04242.gif','AddEmoticons04243.gif','AddEmoticons04244.gif','AddEmoticons04245.gif',
	'AddEmoticons04246.gif','AddEmoticons04247.gif','AddEmoticons04248.gif','AddEmoticons04249.gif','AddEmoticons04250.gif',
	'AddEmoticons04251.gif','AddEmoticons04252.gif','AddEmoticons04253.gif','AddEmoticons04254.gif','AddEmoticons04255.gif',
	'AddEmoticons04256.gif','AddEmoticons04257.gif','AddEmoticons04258.gif','AddEmoticons04259.gif','AddEmoticons04260.gif',
	'AddEmoticons04261.gif','AddEmoticons04262.gif','AddEmoticons04263.gif','AddEmoticons04264.gif','AddEmoticons04265.gif',
	'AddEmoticons04266.gif','AddEmoticons04267.gif','AddEmoticons04268.gif','AddEmoticons04269.gif','AddEmoticons04270.gif',
	'AddEmoticons04271.gif','AddEmoticons04272.gif','AddEmoticons04273.gif','AddEmoticons04274.gif','AddEmoticons04275.gif',
	'AddEmoticons04276.gif','AddEmoticons04277.gif','AddEmoticons04278.gif','AddEmoticons04279.gif','AddEmoticons04280.gif',
	'AddEmoticons04281.gif','AddEmoticons04282.gif','AddEmoticons04283.gif','AddEmoticons04284.gif','AddEmoticons04285.gif',
	'AddEmoticons04286.gif','AddEmoticons04287.gif'
	]
]);

smileData.push([
	'KStandart',
	'http://www.kolobok.us/smiles/standart/',
	[
'acute.gif','aggressive.gif','agree.gif','air_kiss.gif','bad.gif','beee.gif','black_eye.gif','blum2.gif','blush2.gif','boast.gif','boredom.gif',
'clapping.gif','cray.gif','dance.gif','dance3.gif',
'dance4.gif','dirol.gif','dntknw.gif','don-t_mention.gif',
'drinks.gif','good.gif','heat.gif',
'help.gif','lazy2.gif','mda.gif',
'nea.gif','ok.gif','pardon.gif',
'pleasantry.gif','popcorm1.gif','rofl.gif',
'scare.gif','sad.gif','scratch_one-s_head.gif',
'search.gif','secret.gif','snooks.gif',
'shout.gif','stop.gif','thank_you2.gif',
'victory.gif','wink3.gif','yahoo.gif','yes3.gif'
	]
]);

smileData.push([
	'KCrazy',
	'http://www.kolobok.us/smiles/madhouse/',
	[
		'dash2.gif','dash3.gif','gamer1.gif','gamer3.gif','gamer4.gif','locomotive.gif','mail1.gif','preved.gif','man_in_love.gif','tease.gif','to_become_senile.gif','wacko2.gif'
	]
]);

smileData.push([
	'KOther',
	'http://www.kolobok.us/smiles/remake/',
	[
'shok.gif','crazy.gif','lol.gif','nyam.gif','wacko.gif','wink.gif'
	]
]);

smileData.push([
	'Crazy',
	'http://www.addemoticons.com/emoticon/crazy/',
	[
		'AddEmoticons0051.gif','AddEmoticons0052.gif','AddEmoticons0053.gif','AddEmoticons0054.gif','AddEmoticons0055.gif',
		'AddEmoticons0056.gif','AddEmoticons0057.gif','AddEmoticons0058.gif','AddEmoticons0059.gif','AddEmoticons00510.gif',
		'AddEmoticons00511.gif','AddEmoticons00512.gif','AddEmoticons00513.gif','AddEmoticons00514.gif','AddEmoticons00515.gif',
		'AddEmoticons00516.gif','AddEmoticons00517.gif','AddEmoticons00518.gif','AddEmoticons00519.gif','AddEmoticons00520.gif',
		'AddEmoticons00521.gif','AddEmoticons00522.gif','AddEmoticons00523.gif','AddEmoticons00524.gif','AddEmoticons00525.gif',
		'AddEmoticons00526.gif','AddEmoticons00527.gif','AddEmoticons00528.gif','AddEmoticons00529.gif','AddEmoticons00530.gif'
	]
]);

smileData.push([
	'Emotions',
	'http://www.33smiley.com/smiley/emotions/',
	[
		'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif',
		'12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif'
	]
]);

smileData.push([
	'Everyday',
	'http://www.33smiley.com/smiley/everyday/',
	[
		'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif',
		'12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif','21.gif',
		'22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif','31.gif',
		'32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif'
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