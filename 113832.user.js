// ==UserScript==
// @name           Plurk hidden emoticons spongebob version
// @namespace      http://bad-cloudy.blogspot.com
// @description    Insert Spongebob for Plurk Emoticons. By Lin Yu Wei updated by badcloud
// @include        http://www.plurk.com/*
// ==/UserScript==



var smileData = [];





smileData.push(['Spongebob Emoticon', 'http://emos.plurk.com/', [
																 
'4f48b6df25f23d6e78012364a81b59c6_w48_h48.gif',
'6e0c6155d6d94668773d6c665c321dad_w47_h47.gif',
'4871684856efef9f8ccd08e5b0668967_w48_h48.gif',
'29d91bf738134ddeb59747236911d564_w48_h48.gif',
'ad9ad67efaa57bc1679d7c53394d4f38_w48_h48.gif',
'9d208fa45c06751393f66ab32b6927de_w48_h48.gif',
'190a98822c867590fe57e061efa229a6_w48_h48.gif',
'05ab8c7ed0cbb67b588e7c153fd0f600_w48_h48.gif',
'77da3002119e6bf2f7d60643521b9e72_w48_h48.gif',
'78c230df6e8513796404c3f49ed41280_w48_h48.gif',
'd7a49792a505aee45ca7bdd1e32f3cc8_w48_h48.gif',
'3b7edcd060f8de9329f451d95a946d8f_w48_h48.gif',
'1f5cfc72592ea2855a3cf277ca706b80_w48_h48.gif',
'e6c7eff60c7200ace86d1c5bd870e4a1_w48_h48.gif',
'e6c7eff60c7200ace86d1c5bd870e4a1_w48_h48.gif',
'f551d9f26682715a3f903bf7138d81ad_w48_h48.gif',
'ccb32d973909703642d453ae7b3dee86_w46_h46.gif',
'c79919faa77f5a4672bd94af7c307cea_w42_h44.gif',
'df1c796bf33cb004f2b73666e21796d5_w48_h48.gif',
'a38f7fa48dfd565a83e160b15c9d2203_w48_h48.gif',
'd004211bd57730cab3d71b22c605cf2c_w48_h48.gif',
'05ab8c7ed0cbb67b588e7c153fd0f600_w48_h48.gif',
'f0b2a74e2158ef594daeafc46349ef53_w48_h48.gif'


    ], [ 

'http://emos.plurk.com/4f48b6df25f23d6e78012364a81b59c6_w48_h48.gif',
'http://emos.plurk.com/6e0c6155d6d94668773d6c665c321dad_w47_h47.gif',
'http://emos.plurk.com/4871684856efef9f8ccd08e5b0668967_w48_h48.gif',
'http://emos.plurk.com/29d91bf738134ddeb59747236911d564_w48_h48.gif',
'http://emos.plurk.com/ad9ad67efaa57bc1679d7c53394d4f38_w48_h48.gif',
'http://emos.plurk.com/9d208fa45c06751393f66ab32b6927de_w48_h48.gif',
'http://emos.plurk.com/190a98822c867590fe57e061efa229a6_w48_h48.gif',
'http://emos.plurk.com/05ab8c7ed0cbb67b588e7c153fd0f600_w48_h48.gif',
'http://emos.plurk.com/77da3002119e6bf2f7d60643521b9e72_w48_h48.gif',
'http://emos.plurk.com/78c230df6e8513796404c3f49ed41280_w48_h48.gif',
'http://emos.plurk.com/d7a49792a505aee45ca7bdd1e32f3cc8_w48_h48.gif',
'http://emos.plurk.com/3b7edcd060f8de9329f451d95a946d8f_w48_h48.gif',
'http://emos.plurk.com/1f5cfc72592ea2855a3cf277ca706b80_w48_h48.gif',
'http://emos.plurk.com/e6c7eff60c7200ace86d1c5bd870e4a1_w48_h48.gif',
'http://emos.plurk.com/e6c7eff60c7200ace86d1c5bd870e4a1_w48_h48.gif',
'http://emos.plurk.com/f551d9f26682715a3f903bf7138d81ad_w48_h48.gif',
'http://emos.plurk.com/ccb32d973909703642d453ae7b3dee86_w46_h46.gif',
'http://emos.plurk.com/c79919faa77f5a4672bd94af7c307cea_w42_h44.gif',
'http://emos.plurk.com/df1c796bf33cb004f2b73666e21796d5_w48_h48.gif',
'http://emos.plurk.com/a38f7fa48dfd565a83e160b15c9d2203_w48_h48.gif',
'http://emos.plurk.com/d004211bd57730cab3d71b22c605cf2c_w48_h48.gif',
'http://emos.plurk.com/05ab8c7ed0cbb67b588e7c153fd0f600_w48_h48.gif',
'http://emos.plurk.com/f0b2a74e2158ef594daeafc46349ef53_w48_h48.gif'

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

    getById('emoticons_show').style.height = '100%';

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