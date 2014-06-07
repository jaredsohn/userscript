// ==UserScript==
// @name           Plurk hidden emoticons
// @namespace      http://anakdewa.web.id
// @description    Insert Hidden Plurk Emoticons. Original Script By Lin Yu Wei
// @include        http://www.plurk.com/*
// ==/UserScript==

var smileData = [];

smileData.push(['Hidden Emoticon', 'http://statics.plurk.com/', [
    'deda4d9f78ad528d725e3a6bfbf6352f.gif', // (Русский)
    '7256dae81d56d150120ccd0c96dd2197.gif', // (fireworks)
    '0efc4d55d28704f4370ef874ae906161.gif', // (code)
    '8855f56400a936db07f348d9290adaac.gif', // (code_okok)
    '71acd802cc931649dd9a371ccf70bad2.gif', // (hungry_okok)
    '74030f05f06547a3d26b02ccbf0bbac7.gif', // (music_okok)
    '3acbaf42504fff32c5eac4f12083ce56.gif', // (yarr_okok)
    'fcd28d7d78ec1f828c76930fa63270e6.gif', // (gym_okok)
    'bac8c8392f7ca8f5ac74612be4d08b74.gif', // (wave_okok)
    'a555399b40c379adca5b6f5bad5bf732.gif', // (dance_okok) 
    '6675254cd7449b1847a93b0024127eae.gif', // (angry_okok)
    '88fac5a4b99110a35d4e4794dad58ab4.gif', // (taser_okok) 
    'feb43dbbbf2763905571060be9a496d1.gif', // (no_dance)
    '5b51892d7d1f392d93ea7fe26e5100f4.gif', // (banana_gym)
    '47d20905d017c396d67b4a30c9ac9b10.png', // (goal)
    '129b757f2346a6e5ea782c79f0337ba9.png', // (bzzz)
    '4ad099fba019942f13058610ff3fc568.gif', // (dance_bzz)
    '4c40d16a0d369b895c08f2e33d062ec8.gif', // (yarr)
    '6de58c967f1c2797d250a713ba50eddd.gif', // (dance_yarr)
    'b3b9856e557fcc2700fd41c53f9d4910.gif' //  (droid_dance)
    ], [ 
    '(Русский)',
    '(fireworks)',
    '(code)',
    '(code_okok)',
    '(hungry_okok)',
    '(music_okok)',
    '(yarr_okok)',
    '(gym_okok)',
    '(wave_okok)',
    '(dance_okok)',
    '(angry_okok)', 
    '(taser_okok) ', 
    '(no_dance)',
    '(banana_gym)',
    '(goal)',
    '(bzzz)',
    '(dance_bzz)',
    '(yarr)',
    '(dance_yarr)', 
    '(xmas1)',
    '(xmas2)',
    '(xmas3)',
    '(xmas4)',
    '(droid_dance)'
]]);

smileData.push(['Hidden Emoticon', 'http://statics.plurk.com/', [
    'cfdd2accc1188f5fbc62e149074c7f29.png', // (fuu)
    '828b9819249db696701ae0987fba3638.png', // (gfuu)
    '1bd653e166492e40e214ef6ce4dd716f.png', // (yay)
    '3fe6cf919158597d7ec74f8d90f0cc9f.png', // (gyay)
    '9c5c54081547d2ad903648f178fcc595.png', // (bah)
    '2da76999ca3716fb4053f3332270e5c9.png', // (gbah)
    'f73b773aa689647cb09f57f67a83bb89.png', // (troll)
    '45beda260eddc28c82c0d27377e7bf42.png', // (gtroll)
    '8590888362ae83daed52e4ca73c296a6.png', // (aha)
    'c7551098438cc28ec3b54281d4b09cc3.png', // (gaha)
    'cfd84315ebceec0c4389c51cf69132bd.png', // (whatever)
    '0e0bf1ec2c2958799666f3995ef830ca.png', // (gwhatever)
    'e2998ca75f80c1c4a5508c549e3980a6.png', // (pokerface)
    'c6ad1c4f9e11f6859a1ba39c4341ef8b.png', // (gpokerface)
    '4a61085f1c6a639f028cd48ae97d07d0.png', // (yea)
    '53253ca60f5831f0812954213a2e9bb3.png', // (gyea)
    '6928f3117658cc38d94e70519a511005.png'  // (jazzhands)
    ], [ 
    '(fuu)',
    '(gfuu)', 
    '(yay)', 
    '(gyay)', 
    '(bah)', 
    '(gbah)', 
    '(troll)',
    '(gtroll)',
    '(aha)',
    '(gaha)',
    '(whatever)',
    '(gwhatever)',
    '(pokerface)',
    '(gpokerface)',
    '(yea)',
    '(gyea)',
    '(jazzhands)'
]]);

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
	str += 'by <a href="http://www.nova13.com/" target"_blank">nova13.com</a>';
    str += '</div>';
    str += '<div>';
    for(var i=0, dat = data[2], _url; i<dat.length; i++)
    {
        _url = baseUrl + dat[i];
        str += '<a href="javascript:void 0;"><img src="'+_url+'" alt="'+data[3][i]+'" title="'+data[3][i]+'"/></a>';

    }
    str += '</div>';
    showDiv.innerHTML = str;
    
    var imgs = showDiv.getElementsByTagName('img');
    for(var i=0; i<imgs.length; i++)
    {
        imgs[i].addEventListener('click', function()
        {
            currInput.value += ' ' + this.alt + ' ';
            currInput.focus();
        }, false);
    }
}

function getById(oid)
{
    return document.getElementById(oid);
}
