// ==UserScript==
// @name           HKGolden Plurk Smilies
// @namespace      http://forum.hkgolden.com
// @description    Adds HKGolden smilies to Plurk (version 0.1) Base on Emoplurk
// @include        http://www.plurk.com/*
// ==/UserScript==

// ==About==
// author: CopyLion
// Email: copylion#gmail.com
// blog: http://copylion.blogspot.com

// ********** Main Script ***********
var smileData = [];

smileData.push([
	'<img src="http://i594.photobucket.com/albums/tt26/hkg_p_smilies/normal/clown.gif" width=15>',
	'http://i594.photobucket.com/albums/tt26/hkg_p_smilies/normal/',
	[
		'angel.gif','dead.gif','smile.gif','clown.gif','frown.gif','cry.gif','wink.gif','angry.gif','devil.gif','biggrin.gif',
        'oh.gif','tongue.gif','kiss.gif','wonder.gif','agree.gif','donno.gif','hehe.gif','love.gif','surprise.gif','chicken.gif',
        'ass.gif','sosad.gif','good.gif','hoho.gif','kill.gif','bye.gif','z.gif','shocked.gif','adore.gif','wonder2.gif',
        'banghead.gif','bouncer.gif','bouncy.gif','offtopic.gif','censored.gif','flowerface.gif','shocking.gif','photo.gif','fire.gif','yipes.gif',
        '369.gif','bomb.gif','slick.gif','fuck.gif','no.gif','kill2.gif'
	]
]);

smileData.push([
	'<img src="http://i594.photobucket.com/albums/tt26/hkg_p_smilies/xmas/clown.gif" width=15>',
	'http://i594.photobucket.com/albums/tt26/hkg_p_smilies/xmas/',
	[
		'angel.gif','dead.gif','smile.gif','clown.gif','frown.gif','cry.gif','wink.gif','angry.gif','devil.gif','biggrin.gif',
        'oh.gif','tongue.gif','kiss.gif','wonder.gif','agree.gif','donno.gif','hehe.gif','love.gif','surprise.gif','chicken.gif',
        'chicken2.gif','ass.gif','sosad.gif','good.gif','hoho.gif','kill.gif','bye.gif','z.gif','@.gif','adore.gif',
        'adore2.gif','wonder2.gif','banghead.gif','bouncer.gif','bouncy.gif','bouncy2.gif','offtopic.gif','censored.gif','flowerface.gif','shocking.gif',
        'photo.gif','fire.gif','yipes.gif','yipes2.gif','yipes3.gif','369.gif','bomb.gif','slick.gif','no.gif','kill2.gif'
	]
]);

smileData.push([
	'<img src="http://i594.photobucket.com/albums/tt26/hkg_p_smilies/newyear/clown.gif" width=15>',
	'http://i594.photobucket.com/albums/tt26/hkg_p_smilies/newyear/',
	[
		'clown.gif','clown2.gif','clown3.gif','ass.gif','sosad.gif',
        'sosad2.gif','sosad3.gif','banghead.gif','bouncer.gif','offtopic.gif',
        'yipes.gif','369.gif'
	]
]);

smileData.push([
	'<img src="http://i594.photobucket.com/albums/tt26/hkg_p_smilies/ani-gif/clown-ani-A1a.gif" width=15>',
	'http://i594.photobucket.com/albums/tt26/hkg_p_smilies/ani-gif/',
	[
		'clown-ani-A1a.gif','gunfire-ani-A1a.gif','chickenrun2.gif','369-ani-B1.gif','clownhaha-ani1a.gif',
        'clown-cry-ani-A1a.gif','flowerface1a.gif','chickenfly-aniA2.gif','kiss-ani-A2.gif',
        'clownlei-ani-a2.gif','veryangry-ani-A2.gif','shockshine-ani-B2.gif','clown-sosad-ani2.gif','Love-ani-A2.gif',
        'angry-ani1a.gif','hehehe1a.gif','devil-ani1a.gif','op-ani1a.gif','sad1a.gif',
        'scar-ani-A2a.gif','censor1a.gif','MrX1a.gif','off-topic-ani-A2.gif','shock-ani-C2.gif','sleepy-ani-A2.gif','yeah-ani-b2.gif'
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
    getById('emoticons_show').style.width  = '620px';
    getById('emoticons_show').style.height = '280px';
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
        str += '<a href="javascript:void 0;"><img src="'+_url+'" title="['+ind+' '+i+']" width=32 /></a>';
 
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