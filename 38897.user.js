// ==UserScript==
// @name           Plurk Smile (version 4.7)
// @namespace      http://phpz.org/
// @description    Easy to insert custom smile.
// @include        http://www.plurk.com/*
// ==/UserScript==

// ==About==
// author: Seven Yu
// ExChanged : Capable
// Email: v3rdee@yahoo.com
// blog: http://www.siceper.com/

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
	'Monkey',
	'http://ipx6.cn/plotion/monkey/',
	[
		'm1.gif','m2.gif','m3.gif','m4.gif','m5.gif','m6.gif','m7.gif','m8.gif','m9.gif','m10.gif',
        'm11.gif','m12.gif','m13.gif','m14.gif','m15.gif','m16.gif','m17.gif','m18.gif','m19.gif',
        'm20.gif','m21.gif','m22.gif','m23.gif','m24.gif','m25.gif','m26.gif','m27.gif','m28.gif',
        'm29.gif','m30.gif','m31.gif','m32.gif','m33.gif','m34.gif','m35.gif','m36.gif','m37.gif',
        'm38.gif','m39.gif','m40.gif','m41.gif','m42.gif','m43.gif','m44.gif','m45.gif','m46.gif',
        'm47.gif','m48.gif','m49.gif','m50.gif','m51.gif','m52.gif','m53.gif','m54.gif','m55.gif',
        'm56.gif','m57.gif','m58.gif','m59.gif','m60.gif','m61.gif','m62.gif','m63.gif','m64.gif',
        'm65.gif','m66.gif','m67.gif','m68.gif','m69.gif','m70.gif','m71.gif','m72.gif','m73.gif',
        'm74.gif','m75.gif','m76.gif','m77.gif','m78.gif','m79.gif','m80.gif','m81.gif','m82.gif',
        'm83.gif','m84.gif','m85.gif','m86.gif','m87.gif','m88.gif','m89.gif','m90.gif','m91.gif',
        'm92.gif','m93.gif','m94.gif','m95.gif','m96.gif','m97.gif','m98.gif','m99.gif','m100.gif',
        'm101.gif','m102.gif','m103.gif','m104.gif','m105.gif','m106.gif','m107.gif','m108.gif','m109.gif',
        'm110.gif','m111.gif','m112.gif','m113.gif','m114.gif','m115.gif','m116.gif','m117.gif','m118.gif',
        'm119.gif','m120.gif','m121.gif','m122.gif','m123.gif','m124.gif','m125.gif','m126.gif','m127.gif',
        'm128.gif','m129.gif','m130.gif','m131.gif','m132.gif','m133.gif','m134.gif','m135.gif','m136.gif',
        'm137.gif','m138.gif','m139.gif','m140.gif','m141.gif','m142.gif','m143.gif','m144.gif','m145.gif',
        'm146.gif','m147.gif','m148.gif','m149.gif','m150.gif','m151.gif','m152.gif','m153.gif','m154.gif',
        'm155.gif','m156.gif','m157.gif','m158.gif','m159.gif','m160.gif','m161.gif','m162.gif','m163.gif',
        'm164.gif','m165.gif','m166.gif','m167.gif','m168.gif','m169.gif','m170.gif','m171.gif','m172.gif',
        'm173.gif','m174.gif','m175.gif','m176.gif','m177.gif','m178.gif','m179.gif'
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
	'Penguin',
	'http://www.addemoticons.com/emoticon/penguin2/',
	[
	'AddEmoticons0931.gif','AddEmoticons0932.gif','AddEmoticons0933.gif','AddEmoticons0934.gif',
	'AddEmoticons0935.gif','AddEmoticons0936.gif','AddEmoticons0937.gif','AddEmoticons0938.gif',
	'AddEmoticons0939.gif','AddEmoticons09310.gif','AddEmoticons09311.gif','AddEmoticons09312.gif',
	'AddEmoticons09313.gif','AddEmoticons09314.gif','AddEmoticons09315.gif','AddEmoticons09316.gif',
	'AddEmoticons09317.gif','AddEmoticons09318.gif','AddEmoticons09319.gif','AddEmoticons09320.gif',
	'AddEmoticons09321.gif','AddEmoticons09322.gif','AddEmoticons09323.gif','AddEmoticons09324.gif',
	'AddEmoticons09325.gif','AddEmoticons09326.gif','AddEmoticons09327.gif','AddEmoticons09328.gif',
	'AddEmoticons09329.gif','AddEmoticons09330.gif','AddEmoticons09331.gif','AddEmoticons09332.gif',
	'AddEmoticons09333.gif','AddEmoticons09334.gif','AddEmoticons09335.gif','AddEmoticons09336.gif',
	'AddEmoticons09337.gif'
	]
]);

smileData.push([
	'Panda',
	'http://www.addemoticons.com/emoticon/panda/',
	[
	'AddEmoticons0201.gif','AddEmoticons0202.gif','AddEmoticons0203.gif','AddEmoticons0204.gif',
	'AddEmoticons0205.gif','AddEmoticons0206.gif','AddEmoticons0207.gif','AddEmoticons0208.gif',
	'AddEmoticons0209.gif','AddEmoticons02010.gif','AddEmoticons02011.gif','AddEmoticons02012.gif',
	'AddEmoticons02013.gif','AddEmoticons02014.gif','AddEmoticons02015.gif','AddEmoticons02016.gif',
	'AddEmoticons02017.gif','AddEmoticons02018.gif','AddEmoticons02019.gif','AddEmoticons02020.gif',
	'AddEmoticons02021.gif','AddEmoticons02022.gif'
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