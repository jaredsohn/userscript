// ==UserScript==
// @name           h33tEmo
// @namespace      http://userscripts.org/scripts/show/39120
// @description    addemoticon by lenard
// @include        http://www.plurk.com/*
// ==/UserScript==

// ==About Source==
// Originally from 
// author: 
// Email: 
// blog: 
// blog: 

// ==Edited by==
// author: A
// Email: 
// blog: 
// blog: 
// plurk: 



// ********** Main Script ***********
var smileData = [];

smileData.push([
	'h33t',
	'http://www.h33t.com/images/smilies/',
	[
		'alcoholic.gif','alien.gif','angel.gif','angry.gif','arrow.gif','axe.gif',
		'baby.gif','band.gif','bandana.gif','beer.gif','beer1.gif','bike.gif',
		'box.gif','bounce.gif','book.gif','bmkid.gif','blush.gif','blink.gif',
		'boxing.gif','cake.gif','cap.gif','chair.gif','cheesy.gif','chef.gif','cigar.gif',
		'cool.gif','construction.gif','console.gif','confused.gif','clover.gif','closedeyes.gif',
		'cool1.gif','cool2.gif','cowboy.gif','crazy.gif','crockett.gif','cry.gif','deadhorse.gif',
		'evilmad.gif','evil.gif','embarrassed.gif','dumbells.gif','drunk.gif','dots.gif','devil.gif',
		'evo.gif','excl.gif','fez.gif','fish.gif','flowers.gif','fun.gif','gathering.gif',
		'hang.gif','guns.gif','group.gif','grin.gif','greedy.gif','geek.gif',
		'hannibal.gif','happy.gif','hbd.gif','hi.gif','hmm.gif','hooray.gif',
		'idea.gif','icecream.gif','hump.gif','huh.gif','horse.gif',
		'ike.gif','indian.gif','jacko.gif','judge.gif','king.gif','kiss.gif',
		'mario.gif','mama.gif','love.gif','look.gif','lipsrsealed.gif','luagh.gif',
		'medieval.gif','music.gif','ninja.gif','no.gif','noexpression.gif','nugget.gif',
		'party.gif','osama.gif','oops.gif','oldtimer.gif','ohmy.gif','offtopic.gif','nuke.gif',
		'pepsi.gif','pimp.gif','pirate.gif','pope.gif','punk.gif','question.gif',
		'sad.gif','rolleyes.gif','rock.gif','rip.gif','ras.gif','rant.gif','rambo.gif',
		'saddam.gif','santa.gif','sheep.gif','shifty.gif','shit.gif','shocked.gif','shutup.gif',
		'smartass.gif','esmart.gif','sly.gif','sleeping.gif','sleep.gif','sick.gif','shutup2.gif',
		'smile1.gif','smile2.gif','smiley.gif','smurf.gif','snap.gif','sneaky.gif',
		'strongbench.gif','spidey.gif','spank.gif','spam.gif','soldiers.gif','snorkle.gif',
		'stupid.gif','thankyou.gif','thumbsdown.gif','thumbsup.gif','tongue.gif'
		'weep.gif','weakbench.gif','wave.gif','wacko.gif','w00t.gif','unsure.gif','undecided.gif',
		'yes.gif','yay.gif','wub.gif','wolverine.gif','wizard.gif','wink.gif','whistle.gif',
		'yikes.gif','yoji.gif','yucky.gif','zorro.gif'
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