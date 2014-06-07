// ==UserScript==
// @name           Plurk Emoticons (v1.0)
// @based_on	   Emoplurk (http://beinghacked.com/)
// @namespace      Ana
// @description    Emoticons novos para o plurk.
// @include        http://www.plurk.com/*
// ==/UserScript==

// ==About==
// author: Uchari Mae
// Email: u-chari#hotmail.com
// blog: http://beinghacked.com/

// ********** Main Script ***********
var smileData = [];

smileData.push([
	'<IMG SRC="http://s194.photobucket.com/albums/z4/uchari/oo/043.gif" width=20 ALT="Onion">',
	'http://s194.photobucket.com/albums/z4/uchari/oo/',
	[
		'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif','059.gif','060.gif',
        '061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif','069.gif',
        '070.gif','071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif','078.gif',
        '079.gif','080.gif','081.gif','082.gif','083.gif','084.gif','085.gif','086.gif','087.gif',
        '088.gif','089.gif','090.gif','091.gif','092.gif','093.gif','094.gif','095.gif','096.gif',
        '097.gif','098.gif','099.gif','100.gif','101.gif','102.gif','103.gif','104.gif','105.gif',
        '106.gif','107.gif','108.gif','109.gif','110.gif',
        '111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif',
        '120.gif','121.gif'
	]
]);

smileData.push([
	'<IMG SRC="http://s194.photobucket.com/albums/z4/uchari/mk/009.gif" width=20 ALT="Monkey">',
	'http://s194.photobucket.com/albums/z4/uchari/mk/',
	[
		'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif','059.gif','060.gif',
        '061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif','069.gif',
        '070.gif','071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif','078.gif',
        '079.gif','080.gif','081.gif','082.gif','083.gif','084.gif','085.gif','086.gif','087.gif',
        '088.gif','089.gif','090.gif','091.gif','092.gif','093.gif','094.gif','095.gif','096.gif',
        '097.gif','098.gif','099.gif','100.gif','101.gif','102.gif','103.gif','104.gif','105.gif',
        '106.gif','107.gif','108.gif','109.gif','110.gif',
        '111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif',
        '120.gif','121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif','128.gif',
        '129.gif','130.gif','131.gif','132.gif','133.gif','134.gif','135.gif','136.gif','137.gif',
        '138.gif','139.gif','140.gif','141.gif','142.gif','143.gif','144.gif','145.gif','146.gif',
        '147.gif','148.gif','149.gif','150.gif','151.gif','152.gif','153.gif','154.gif','155.gif',
        '156.gif','157.gif','158.gif','159.gif','160.gif',
        '161.gif','162.gif','163.gif','164.gif','165.gif','166.gif','167.gif','168.gif','169.gif',
        '170.gif','171.gif','172.gif','173.gif','174.gif','175.gif','176.gif','177.gif','178.gif',
        '179.gif','180.gif','181.gif'
	]
]);

smileData.push([
	'<IMG SRC="http://s194.photobucket.com/albums/z4/uchari/co/024.gif" width=20 ALT="Bunny">',
	'http://s194.photobucket.com/albums/z4/uchari/co/',
	[
		'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif'
	]
]);


smileData.push([
	'<IMG SRC="http://s194.photobucket.com/albums/z4/uchari/rb/043.gif" width=20 ALT="Rabbit">',
	'http://s194.photobucket.com/albums/z4/uchari/rb/',
	[
		'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif','059.gif','060.gif',
        '061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif','069.gif',
        '070.gif','071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif','078.gif'
	]
]);

smileData.push([
    '<IMG SRC="http://s194.photobucket.com/albums/z4/uchari/tz/043.gif" width=20 ALT="Tuzky">',
    'http://s194.photobucket.com/albums/z4/uchari/tz/',
    [
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif','059.gif','060.gif',
        '061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif','069.gif',
        '070.gif','071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif','078.gif',
    '079.gif','080.gif','081.gif','082.gif','083.gif','084.gif'
    ]
]);

smileData.push([
   '<IMG SRC="http://s194.photobucket.com/albums/z4/uchari/lj/003.gif" width=20 ALT="Little Girl">',
   'http://s194.photobucket.com/albums/z4/uchari/lj/',
   [
       '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
       '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
       '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
       '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
       '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif'
   ]
]);

smileData.push([
   '<IMG SRC="http://s194.photobucket.com/albums/z4/uchari/kb/003.gif" width=20 ALT="KittyKat">',
   'http://s194.photobucket.com/albums/z4/uchari/kb/',
   [
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif','059.gif','060.gif',
        '061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif','069.gif',
        '070.gif','071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif','078.gif',
        '079.gif','080.gif','081.gif','082.gif','083.gif','084.gif','085.gif','086.gif','087.gif',
        '088.gif','089.gif','090.gif','091.gif','092.gif','093.gif','094.gif','095.gif','096.gif',
        '097.gif','098.gif','099.gif','100.gif','101.gif','102.gif','103.gif','104.gif','105.gif',
        '106.gif','107.gif','108.gif','109.gif','110.gif','111.gif','112.gif'
   ]
]);

smileData.push([

        '<IMG SRC="http://s194.photobucket.com/albums/z4/uchari/db/043.gif" width=20 ALT="Db">',

        'http://s194.photobucket.com/albums/z4/uchari/db/',

        [

                '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',

        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',

        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',

        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',

        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif'

        ]

]);

smileData.push([

        '<IMG SRC="http://s194.photobucket.com/albums/z4/uchari/fp/010.gif" width=20 ALT="Egg">',

        'http://s194.photobucket.com/albums/z4/uchari/fp/',

        [

                '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',

        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',

        '020.gif','021.gif','022.gif'

        ]

]);

smileData.push([

        '<IMG SRC="http://s194.photobucket.com/albums/z4/uchari/fr/010.gif" width=20 ALT="Fire">',

        'http://s194.photobucket.com/albums/z4/uchari/fr/',

        [

                '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',

        '011.gif','012.gif','013.gif'

        ]

]);
smileData.push([
	'<IMG SRC="http://s194.photobucket.com/albums/z4/uchari/bb/012.gif" width=20 ALT="Bebe">',
	'http://s194.photobucket.com/albums/z4/uchari/bb/',
	[
		'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif','059.gif','060.gif',
        '061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif','069.gif',
        '070.gif','071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif','078.gif',
        '079.gif','080.gif','081.gif','082.gif','083.gif','084.gif','085.gif','086.gif','087.gif',
        '088.gif','089.gif','090.gif','091.gif','092.gif','093.gif','094.gif','095.gif','096.gif',
        '097.gif','098.gif','099.gif','100.gif','101.gif','102.gif','103.gif','104.gif','105.gif',
        '106.gif','107.gif','108.gif','109.gif','110.gif'
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
        str += '<a href="javascript:void 0;"><img src="'+_url+'" alt="'+dat[i]+'" title="['+ind+' '+i+']" width=50 /></a>';

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
