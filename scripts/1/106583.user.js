// ==UserScript==
// @name           plurk smiles
// @namespace      
// @description    plurk smiles
// @include        http://www.plurk.com/*
// ==/UserScript==
// coding by Lin Yu Wei: http://userscripts.org/users/80455
// userscripts.org url:  http://userscripts.org/scripts/show/94162

var foo = {
  '(xmas1)':        'http://statics.plurk.com/1a5f23ed863e70e52f239b045a48e6fb.gif',
  '(xmas4)':        'http://statics.plurk.com/e476574723d5042f24658fa36866bd92.gif',
  '(dance_bzz)':    'http://statics.plurk.com/4ad099fba019942f13058610ff3fc568.gif',
  '(code)':         'http://statics.plurk.com/0efc4d55d28704f4370ef874ae906161.gif',
  '(code_okok)':    'http://statics.plurk.com/8855f56400a936db07f348d9290adaac.gif',
  '(gym_okok)':     'http://statics.plurk.com/fcd28d7d78ec1f828c76930fa63270e6.gif',
  '(hungry_okok)':  'http://statics.plurk.com/71acd802cc931649dd9a371ccf70bad2.gif',

  '(xmas2)':        'http://statics.plurk.com/f5dbd5fdf5f5df69cfb024d6be76a76b.gif',
  '(bzzz)':         'http://statics.plurk.com/129b757f2346a6e5ea782c79f0337ba9.png',
  '(fireworks)':    'http://statics.plurk.com/7256dae81d56d150120ccd0c96dd2197.gif',
  '(yar)':          'http://statics.plurk.com/4c40d16a0d369b895c08f2e33d062ec8.gif',
  '(yarr_okok)':    'http://statics.plurk.com/3acbaf42504fff32c5eac4f12083ce56.gif',
  '(dance_yarr)':   'http://statics.plurk.com/6de58c967f1c2797d250a713ba50eddd.gif',
  '(angry_okok)':   'http://statics.plurk.com/6675254cd7449b1847a93b0024127eae.gif',

  '(xmas3)':        'http://statics.plurk.com/e902170e97aee14836b5df6b0fe61ba2.gif',
  '(goal)':         'http://statics.plurk.com/47d20905d017c396d67b4a30c9ac9b10.png',
  '(???????)':      'http://statics.plurk.com/deda4d9f78ad528d725e3a6bfbf6352f.gif',
  '(no_dance)':     'http://statics.plurk.com/feb43dbbbf2763905571060be9a496d1.gif',
  '(dance_okok)':   'http://statics.plurk.com/a555399b40c379adca5b6f5bad5bf732.gif',
  '(music_okok)':   'http://statics.plurk.com/74030f05f06547a3d26b02ccbf0bbac7.gif',
  '(wave_okok)':    'http://statics.plurk.com/bac8c8392f7ca8f5ac74612be4d08b74.gif',

  '(fuu)':          'http://statics.plurk.com/cfdd2accc1188f5fbc62e149074c7f29.png',
  '(gfuu)':         'http://statics.plurk.com/828b9819249db696701ae0987fba3638.png',
  '(yay)':          'http://statics.plurk.com/1bd653e166492e40e214ef6ce4dd716f.png',
  '(gyay)':         'http://statics.plurk.com/3fe6cf919158597d7ec74f8d90f0cc9f.png',
  '(droid_dance)':  'http://statics.plurk.com/b3b9856e557fcc2700fd41c53f9d4910.gif',
  '(taser_okok)':   'http://statics.plurk.com/88fac5a4b99110a35d4e4794dad58ab4.gif',
  '(banana_gym)':   'http://statics.plurk.com/5b51892d7d1f392d93ea7fe26e5100f4.gif',

  '(bah)':          'http://statics.plurk.com/9c5c54081547d2ad903648f178fcc595.png',
  '(gbah)':         'http://statics.plurk.com/2da76999ca3716fb4053f3332270e5c9.png',
  '(troll)':        'http://statics.plurk.com/f73b773aa689647cb09f57f67a83bb89.png',
  '(gtroll)':       'http://statics.plurk.com/45beda260eddc28c82c0d27377e7bf42.png',
  '(jazzhands)':    'http://statics.plurk.com/6928f3117658cc38d94e70519a511005.png',
  '(pokerface)':    'http://statics.plurk.com/e2998ca75f80c1c4a5508c549e3980a6.png',
  '(gpokerface)':   'http://statics.plurk.com/c6ad1c4f9e11f6859a1ba39c4341ef8b.png',

  '(aha)':          'http://statics.plurk.com/8590888362ae83daed52e4ca73c296a6.png',
  '(gaha)':         'http://statics.plurk.com/c7551098438cc28ec3b54281d4b09cc3.png',
  '(yea)':          'http://statics.plurk.com/4a61085f1c6a639f028cd48ae97d07d0.png',
  '(gyea)':         'http://statics.plurk.com/53253ca60f5831f0812954213a2e9bb3.png',
  '(whatever)':     'http://statics.plurk.com/cfd84315ebceec0c4389c51cf69132bd.png',
  '(gwhatever)':    'http://statics.plurk.com/0e0bf1ec2c2958799666f3995ef830ca.png',
  /*'(v_perfume)':    'http://www.plurk.com/static/emoticons/valentine/perfume.png',*/

  '(flower)':       'http://www.plurk.com/static/emoticons/gold/flower.png',
  /*'(v_shy)':        'http://www.plurk.com/static/emoticons/valentine/lingerie.png',
  '(v_mail)':       'http://www.plurk.com/static/emoticons/valentine/envelope.png',
  '(v_love)':       'http://www.plurk.com/static/emoticons/valentine/heart-love.png',
  '(v_tiffany)':    'http://www.plurk.com/static/emoticons/valentine/tiffany-box.png',*/

  /*'(lantern_well)':     'http://statics.plurk.com/be11685ed0ee1740a4eb0f82edd004e8.png',
  '(lantern_happy)':    'http://statics.plurk.com/ae169c0471106ef466013a0ff790dd03.png',
  '(lantern_health)':   'http://statics.plurk.com/6883243bb1b5f01e22be8dae5d836667.png',

  '(lantern_love)':     'http://statics.plurk.com/2b4c6198cd357b90566fa368f6804032.png',
  '(lantern_peace)':    'http://statics.plurk.com/286b8ffcae6d8432036b442d709cb852.png',
  '(lantern_fortune)':  'http://statics.plurk.com/71ad7d11b6e857794a75e5098b2e9cd3.png',*/
  
  'http://emos.plurk.com/497ac1c1f4fdd904680ddf78f8ba4050_w60_h60.gif': 'http://emos.plurk.com/497ac1c1f4fdd904680ddf78f8ba4050_w60_h60.gif',
  'http://emos.plurk.com/376728e58c750bab98fd825d7817259b_w33_h35.gif': 'http://emos.plurk.com/376728e58c750bab98fd825d7817259b_w33_h35.gif',
  'http://emos.plurk.com/b4b8bd969c63fe7adffd6c42f651b795_w24_h24.gif': 'http://emos.plurk.com/b4b8bd969c63fe7adffd6c42f651b795_w24_h24.gif',
  'http://emos.plurk.com/f8c9dd9ba3f9858e92bc32c5aa50f598_w18_h17.png': 'http://emos.plurk.com/f8c9dd9ba3f9858e92bc32c5aa50f598_w18_h17.png',
  'http://emos.plurk.com/2f632ebc3dbf773ce16ed06781a8de31_w19_h19.gif': 'http://emos.plurk.com/2f632ebc3dbf773ce16ed06781a8de31_w19_h19.gif',
                                                                        
  'http://emos.plurk.com/f61ee4d0a8c76308dde2f08815848774_w16_h16.png': 'http://emos.plurk.com/f61ee4d0a8c76308dde2f08815848774_w16_h16.png',
  'http://emos.plurk.com/f83923c724cfc51c039c88dd32a084f7_w18_h18.gif': 'http://emos.plurk.com/f83923c724cfc51c039c88dd32a084f7_w18_h18.gif',
  'http://emos.plurk.com/273ff7eb03b4f76f15c8113b4df47d6f_w19_h19.gif': 'http://emos.plurk.com/273ff7eb03b4f76f15c8113b4df47d6f_w19_h19.gif',
  'http://emos.plurk.com/a4364cc0987a9aa4b29e928a8f86bb68_w16_h16.png': 'http://emos.plurk.com/a4364cc0987a9aa4b29e928a8f86bb68_w16_h16.png',
  'http://emos.plurk.com/dc9a97a13f03d61dac5c242cf54b909d_w16_h16.png': 'http://emos.plurk.com/dc9a97a13f03d61dac5c242cf54b909d_w16_h16.png',
                                                                        
  'http://emos.plurk.com/b6ebb0a088fa352ee03ed6f760fb319d_w16_h16.png': 'http://emos.plurk.com/b6ebb0a088fa352ee03ed6f760fb319d_w16_h16.png',
  'http://emos.plurk.com/964b77539edcdfe1c7ea0fee95eae2aa_w19_h19.gif': 'http://emos.plurk.com/964b77539edcdfe1c7ea0fee95eae2aa_w19_h19.gif',
  'http://emos.plurk.com/260ccf865098b923559c74f0170da734_w91_h98.png': 'http://emos.plurk.com/260ccf865098b923559c74f0170da734_w91_h98.png',
  'http://emos.plurk.com/2f9aceca81ef4edefb35e737ed7279ba_w41_h24.png': 'http://emos.plurk.com/2f9aceca81ef4edefb35e737ed7279ba_w41_h24.png',
  'http://emos.plurk.com/f9522f7c35738e8aad7f581f1aec36d3_w19_h19.gif': 'http://emos.plurk.com/f9522f7c35738e8aad7f581f1aec36d3_w19_h19.gif',
                                                                        
  'http://emos.plurk.com/c02504441e39444838a743e4b5bbde78_w20_h20.gif': 'http://emos.plurk.com/c02504441e39444838a743e4b5bbde78_w20_h20.gif',
  'http://emos.plurk.com/02f0ba226e329c63b0a082f44ffef9fc_w41_h27.gif': 'http://emos.plurk.com/02f0ba226e329c63b0a082f44ffef9fc_w41_h27.gif',
  'http://emos.plurk.com/78405deafd497948341867451b552bba_w18_h18.gif': 'http://emos.plurk.com/78405deafd497948341867451b552bba_w18_h18.gif',
  'http://emos.plurk.com/595b57b9899afc5aa42b6590227bfa0c_w22_h18.gif': 'http://emos.plurk.com/595b57b9899afc5aa42b6590227bfa0c_w22_h18.gif',
  'http://emos.plurk.com/48f65db11bfbd25e5b6d8f1ad69876d5_w34_h18.gif': 'http://emos.plurk.com/48f65db11bfbd25e5b6d8f1ad69876d5_w34_h18.gif',
                                                                        
  'http://emos.plurk.com/cf21e2fd3cbbbd1157faf60d491f36bb_w22_h18.gif': 'http://emos.plurk.com/cf21e2fd3cbbbd1157faf60d491f36bb_w22_h18.gif',
  'http://emos.plurk.com/1bb4ad7a4537736909d4aae550d963f5_w18_h18.gif': 'http://emos.plurk.com/1bb4ad7a4537736909d4aae550d963f5_w18_h18.gif',
  'http://emos.plurk.com/b1517d1e47c9acb61f589e56a56fc53f_w17_h15.gif': 'http://emos.plurk.com/b1517d1e47c9acb61f589e56a56fc53f_w17_h15.gif',
  'http://emos.plurk.com/7ef4a33e7818e2040a902a808397a8a4_w18_h18.gif': 'http://emos.plurk.com/7ef4a33e7818e2040a902a808397a8a4_w18_h18.gif',
  'http://emos.plurk.com/1ff4f9a530c38ed18dfe0c205c784a15_w18_h18.gif': 'http://emos.plurk.com/1ff4f9a530c38ed18dfe0c205c784a15_w18_h18.gif',
                                                                        
  'http://emos.plurk.com/514e1cfa8f84c79da4d96d8cb5e93aeb_w18_h18.gif': 'http://emos.plurk.com/514e1cfa8f84c79da4d96d8cb5e93aeb_w18_h18.gif',
  'http://emos.plurk.com/28afdbdbe4b3151467cdba83b46ad7eb_w20_h18.gif': 'http://emos.plurk.com/28afdbdbe4b3151467cdba83b46ad7eb_w20_h18.gif',
  'http://emos.plurk.com/7ef4a33e7818e2040a902a808397a8a4_w18_h18.gif': 'http://emos.plurk.com/7ef4a33e7818e2040a902a808397a8a4_w18_h18.gif',
  'http://emos.plurk.com/ec2a8f0ee25edc930992ec8251c785ba_w18_h18.gif': 'http://emos.plurk.com/ec2a8f0ee25edc930992ec8251c785ba_w18_h18.gif',
  'http://emos.plurk.com/e4bc489e5d83193bc02ff346142e5d5a_w13_h12.gif': 'http://emos.plurk.com/e4bc489e5d83193bc02ff346142e5d5a_w13_h12.gif',
                                                                        
  'http://emos.plurk.com/0773bc5952486007c6d0ab164c0d591a_w13_h12.gif': 'http://emos.plurk.com/0773bc5952486007c6d0ab164c0d591a_w13_h12.gif',
  'http://emos.plurk.com/c002dec697a38c73203d20f938159a50_w13_h12.gif': 'http://emos.plurk.com/c002dec697a38c73203d20f938159a50_w13_h12.gif',
  'http://emos.plurk.com/f61ee4d0a8c76308dde2f08815848774_w16_h16.png': 'http://emos.plurk.com/f61ee4d0a8c76308dde2f08815848774_w16_h16.png',
  'http://emos.plurk.com/2c94cbe8feea39a47039826531a00fb3_w55_h16.png': 'http://emos.plurk.com/2c94cbe8feea39a47039826531a00fb3_w55_h16.png',
  'http://emos.plurk.com/f47339923cbabe37535c74b160bb7c7a_w31_h15.png': 'http://emos.plurk.com/f47339923cbabe37535c74b160bb7c7a_w31_h15.png',
                                                                        
  'http://emos.plurk.com/e3aefc19d5acd778a7b73c17edfd47df_w19_h16.png': 'http://emos.plurk.com/e3aefc19d5acd778a7b73c17edfd47df_w19_h16.png',
  'http://emos.plurk.com/7c79f78937f5e25644ca7add62f14a8d_w41_h27.gif': 'http://emos.plurk.com/7c79f78937f5e25644ca7add62f14a8d_w41_h27.gif',
  'http://emos.plurk.com/60aa887d9df35dfb283788df8d740fe1_w54_h16.png': 'http://emos.plurk.com/60aa887d9df35dfb283788df8d740fe1_w54_h16.png',
  'http://emos.plurk.com/7d7a84db7136218b61c87f3055399d9b_w26_h17.png': 'http://emos.plurk.com/7d7a84db7136218b61c87f3055399d9b_w26_h17.png',
  'http://emos.plurk.com/861fca82ab42a27c9d3d51f73e9fe4a2_w26_h17.png': 'http://emos.plurk.com/861fca82ab42a27c9d3d51f73e9fe4a2_w26_h17.png',
                                                                        
  'http://emos.plurk.com/019246b26056da324088cda7dc07202f_w19_h19.gif': 'http://emos.plurk.com/019246b26056da324088cda7dc07202f_w19_h19.gif',
  'http://emos.plurk.com/14e1ca83adfc3cd09e144a2988702881_w41_h27.gif': 'http://emos.plurk.com/14e1ca83adfc3cd09e144a2988702881_w41_h27.gif',
  'http://emos.plurk.com/616a6487eec338d17e1e21c8edeff4f5_w52_h16.png': 'http://emos.plurk.com/616a6487eec338d17e1e21c8edeff4f5_w52_h16.png',
  'http://emos.plurk.com/debf0f0ad3ce1d244c82b5d823ba02ae_w45_h16.png': 'http://emos.plurk.com/debf0f0ad3ce1d244c82b5d823ba02ae_w45_h16.png',
  'http://emos.plurk.com/d386fee9d60c2afabeeaa87562c59747_w27_h12.png': 'http://emos.plurk.com/d386fee9d60c2afabeeaa87562c59747_w27_h12.png',
                                                                        
  'http://emos.plurk.com/f3efa5fb3f92da9d03ccec5bc24279e8_w33_h16.png': 'http://emos.plurk.com/f3efa5fb3f92da9d03ccec5bc24279e8_w33_h16.png',
  'http://emos.plurk.com/887e383335c5b8e3e4f9d2c66bcd2988_w20_h20.png': 'http://emos.plurk.com/887e383335c5b8e3e4f9d2c66bcd2988_w20_h20.png',
  'http://emos.plurk.com/f4dc314c81bbc0e0291940e2be5ffb2e_w38_h20.gif': 'http://emos.plurk.com/f4dc314c81bbc0e0291940e2be5ffb2e_w38_h20.gif'
  

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