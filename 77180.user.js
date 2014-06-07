// ==UserScript==
// @name            superhero
// @include         http://www.plurk.com/*
// @description    	
// modified log:    
// author: mee

// ********** Main Script ***********
var smileData = [];

smileData.push([
	'superhero',
	'http://i322.photobucket.com/albums/nn413/T9Xkilla/Marvel Zombies/Marvel GIF/',
	[
	'SymbioteSpiderman.gif','38e3ad90.gif','229-venom-k.gif','622858c9.gif','america.gif','bane-magus81.gif','batman-2.gif','banev2.gif','batman.gif','BHdarkwalk.gif','b2202eca.gif','BHwin.gif','bishopv10.gif','Bizarro.gif','c98bad93.gif','Cable.gif','Cable-1.gif','captainamericastar.gif','CaptainMarvel.gif','carnage.gif','cartoon_93.gif','Colossus_game.gif','cyclops03animation.gif','d8c52d52.gif','daredevil.gif','DarkPhoenix.gif','ddoomgif.gif','doomsego.gif','Drdoom8.gif','dr_doomdesktop.gif','fantasy_193.gif','Forge.gif','gambit.gif','Ghost-Rider.gif','Hulk.gif','Hulk05.gif','ironman07.gif','ironman08.gif','IronMan_crouch.gif','JohnnyStorm.gif','juggernaut10.gif','magneto-1.gif','magneto-shockwave.gif','magneto.gif','Iceman2.gif','iceman-walkanimation.gif','Inviso.gif','IronMan.gif','ironman-chestbeam.gif','dead1.gif','rhino.gif','spiderman_hanging.gif','spiderman.gif','TheFlash.gif','thejokernew.gif','thsabertooth.gif','venom09.gif','venom18.gif','venom19.gif','Wolverine-1.gif','Mr.gif','nighcrawler.gif','spiderman23-1.gif','wolvie-bb.gif'
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