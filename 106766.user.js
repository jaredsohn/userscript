// ==UserScript==
// @name           Plurk No Code Emoticon
// @namespace      http://anakdewa.web.id
// @description    Plurk No Code Emoticon
// @include        http://www.plurk.com/*
// ==/UserScript==

var foo = {
  
  'http://emos.plurk.com/7d7a84db7136218b61c87f3055399d9b_w26_h17.png':
  'http://emos.plurk.com/7d7a84db7136218b61c87f3055399d9b_w26_h17.png',

  'http://emos.plurk.com/861fca82ab42a27c9d3d51f73e9fe4a2_w26_h17.png':
  'http://emos.plurk.com/861fca82ab42a27c9d3d51f73e9fe4a2_w26_h17.png',

  'http://emos.plurk.com/f61ee4d0a8c76308dde2f08815848774_w16_h16.png':
  'http://emos.plurk.com/f61ee4d0a8c76308dde2f08815848774_w16_h16.png',

  'http://emos.plurk.com/d386fee9d60c2afabeeaa87562c59747_w27_h12.png':
  'http://emos.plurk.com/d386fee9d60c2afabeeaa87562c59747_w27_h12.png',

  'http://emos.plurk.com/f9522f7c35738e8aad7f581f1aec36d3_w19_h19.gif':
  'http://emos.plurk.com/f9522f7c35738e8aad7f581f1aec36d3_w19_h19.gif',

  'http://emos.plurk.com/4a8042602eab8dffc29c30e85b608e59_w25_h22.gif':
  'http://emos.plurk.com/4a8042602eab8dffc29c30e85b608e59_w25_h22.gif',

  'http://emos.plurk.com/14e1ca83adfc3cd09e144a2988702881_w41_h27.gif':
  'http://emos.plurk.com/14e1ca83adfc3cd09e144a2988702881_w41_h27.gif',

  'http://emos.plurk.com/b4b8bd969c63fe7adffd6c42f651b795_w24_h24.gif':
  'http://emos.plurk.com/b4b8bd969c63fe7adffd6c42f651b795_w24_h24.gif',

  'http://emos.plurk.com/19257e373e262e26f4e06267ee4752ec_w24_h24.gif':
  'http://emos.plurk.com/19257e373e262e26f4e06267ee4752ec_w24_h24.gif',

  'http://emos.plurk.com/48f65db11bfbd25e5b6d8f1ad69876d5_w34_h18.gif':
  'http://emos.plurk.com/48f65db11bfbd25e5b6d8f1ad69876d5_w34_h18.gif',

  'http://emos.plurk.com/595b57b9899afc5aa42b6590227bfa0c_w22_h18.gif':
  'http://emos.plurk.com/595b57b9899afc5aa42b6590227bfa0c_w22_h18.gif',

  'http://emos.plurk.com/cf21e2fd3cbbbd1157faf60d491f36bb_w22_h18.gif':
  'http://emos.plurk.com/cf21e2fd3cbbbd1157faf60d491f36bb_w22_h18.gif',

  'http://emos.plurk.com/273ff7eb03b4f76f15c8113b4df47d6f_w19_h19.gif':
  'http://emos.plurk.com/273ff7eb03b4f76f15c8113b4df47d6f_w19_h19.gif',

  'http://emos.plurk.com/f83923c724cfc51c039c88dd32a084f7_w18_h18.gif':
  'http://emos.plurk.com/f83923c724cfc51c039c88dd32a084f7_w18_h18.gif',

  'http://emos.plurk.com/7ef4a33e7818e2040a902a808397a8a4_w18_h18.gif':
  'http://emos.plurk.com/7ef4a33e7818e2040a902a808397a8a4_w18_h18.gif',

  'http://emos.plurk.com/1bb4ad7a4537736909d4aae550d963f5_w18_h18.gif':
  'http://emos.plurk.com/1bb4ad7a4537736909d4aae550d963f5_w18_h18.gif',

  'http://emos.plurk.com/f8c9dd9ba3f9858e92bc32c5aa50f598_w18_h17.png':
  'http://emos.plurk.com/f8c9dd9ba3f9858e92bc32c5aa50f598_w18_h17.png',

  'http://emos.plurk.com/2f632ebc3dbf773ce16ed06781a8de31_w19_h19.gif':
  'http://emos.plurk.com/2f632ebc3dbf773ce16ed06781a8de31_w19_h19.gif',


  'http://emos.plurk.com/e4bc489e5d83193bc02ff346142e5d5a_w13_h12.gif':
  'http://emos.plurk.com/e4bc489e5d83193bc02ff346142e5d5a_w13_h12.gif',


  'http://emos.plurk.com/0773bc5952486007c6d0ab164c0d591a_w13_h12.gif':
  'http://emos.plurk.com/0773bc5952486007c6d0ab164c0d591a_w13_h12.gif',


  'http://emos.plurk.com/c002dec697a38c73203d20f938159a50_w13_h12.gif':
  'http://emos.plurk.com/c002dec697a38c73203d20f938159a50_w13_h12.gif',


  'http://emos.plurk.com/376728e58c750bab98fd825d7817259b_w33_h35.gif':
  'http://emos.plurk.com/376728e58c750bab98fd825d7817259b_w33_h35.gif',


  'http://emos.plurk.com/887e383335c5b8e3e4f9d2c66bcd2988_w20_h20.png':
  'http://emos.plurk.com/887e383335c5b8e3e4f9d2c66bcd2988_w20_h20.png',


  'http://emos.plurk.com/019246b26056da324088cda7dc07202f_w19_h19.gif':
  'http://emos.plurk.com/019246b26056da324088cda7dc07202f_w19_h19.gif',

  'http://emos.plurk.com/f4dc314c81bbc0e0291940e2be5ffb2e_w38_h20.gif':
  'http://emos.plurk.com/f4dc314c81bbc0e0291940e2be5ffb2e_w38_h20.gif',

  'http://emos.plurk.com/497ac1c1f4fdd904680ddf78f8ba4050_w60_h60.gif':
  'http://emos.plurk.com/497ac1c1f4fdd904680ddf78f8ba4050_w60_h60.gif',


  'http://emos.plurk.com/60aa887d9df35dfb283788df8d740fe1_w54_h16.png':
  'http://emos.plurk.com/60aa887d9df35dfb283788df8d740fe1_w54_h16.png',


  'http://emos.plurk.com/2c94cbe8feea39a47039826531a00fb3_w55_h16.png':
  'http://emos.plurk.com/2c94cbe8feea39a47039826531a00fb3_w55_h16.png',


  'http://emos.plurk.com/7d7a84db7136218b61c87f3055399d9b_w26_h17.png':
  'http://emos.plurk.com/7d7a84db7136218b61c87f3055399d9b_w26_h17.png'

                      
  


};

var bar = ['Hidden set', '', [], []]
for (i in foo) {
  bar[2].push(foo[i]);
  bar[3].push(i);
}


var smileData = [];
smileData.push(bar);


var isinit = false;
var currInput = null;
var rplreg = /\[(\d+) (\d+)\]/g;
var pageState = location.href.split('/')[3];

window.addEventListener('load', function() {
    setTimeout(function() {
        var selImgs = document.getElementsByClassName('smily_holder');

        // bind key up event
        if(pageState == 'p')
            getById('input_permalink').addEventListener('keyup', replaceSmile, false);
        else {
            getById('input_big').addEventListener('keyup', replaceSmile, false);
            getById('input_small').addEventListener('keyup', replaceSmile, false);
        }

        // create tabs
        for(var i=0; i<selImgs.length; i++) {
            selImgs[i].setAttribute('ref', selImgs.length - i);
            selImgs[i].addEventListener('click', function() {
                isinit || setTimeout(init, 1000);
                currInput = pageState != 'p' ? this.getAttribute('ref') == 2 ? getById('input_big') : getById('input_small') : getById('input_permalink');
            }, false);
        }
    }, 2000);
}, false);


// init
function init(){
    isinit = true;
    // init contents
    for(var i=0; i<smileData.length; i++) {
        addTab(i, smileData[i]);
    }
    // init css
    getById('emoticons_show').style.width  = '100%';
    getById('emoticons_show').style.height = '150px';
    getById('emoticons_show').style.overflow = 'auto';
}

function replaceSmile() {
    if(rplreg.test(this.value))
        this.value = this.value.replace(rplreg, doReplace);
}

function doReplace(str, datid, smileid) {
    arr = smileData[datid];
    if (typeof(arr) != 'undefined') {
        if(typeof(arr[2][smileid]) != 'undefined')
            str = ' ' + smileData[datid][1] + smileData[datid][2][smileid] + ' ';
    }
    return str;
}

function addTab(id, data) {
    var myli = document.createElement('li');
    myli.className = 'emoticon_selecter';
    myli.innerHTML = '<a href="javascript:void 0;">'+data[0]+'</a>';
    myli.addEventListener('click', function() {
        addImages(this, id);
    }, false);

    getById('emoticons_tabs').getElementsByTagName('ul')[0].appendChild(myli);
}

function addImages(obj, ind) {
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
    for(var i=0, dat = data[2], _url; i<dat.length; i++) {
        _url = baseUrl + dat[i];
        str += '<a href="javascript:void 0;"><img src="'+_url+'" alt="'+data[3][i]+'" title="'+data[3][i]+'"/></a>';

    }
    str += '</div>';
    showDiv.innerHTML = str;
    
    var imgs = showDiv.getElementsByTagName('img');
    for(var i=0; i<imgs.length; i++) {
        imgs[i].addEventListener('click', function() {
            currInput.value += ' ' + this.alt + ' ';
            currInput.focus();
        }, false);
    }
}

function getById(oid) {
    return document.getElementById(oid);
}