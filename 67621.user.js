// ==UserScript==
// @name            Plurk extra
// @namespace       Plurk extra
// @description     Plurk extra
// @include        http://www.plurk.com/*
// modified log:    
// author: noname
// Changed : 
// ==/UserScript==
// ********** Main Script ***********

var smileData = [];

smileData.push([
'emote.rkasig',
'http://emote.rkasigi.net/plurk/',
[
'6c.gif',
'drinking.gif',
'ad.gif',
'Jv.gif',
'wH.gif',
'wJ.gif',
'mv.gif',
'rq.gif',
'4A.gif',
'4E.gif',
'2.gif',
'gQ.gif',
'K7.gif',
'gS.gif',
'devil.gif',
'wP.gif',
'gym.gif',
]
]); 

smileData.push([
	'Google',
	'https://mail.google.com/mail/e/',
	[
        '001#.gif','002#.gif','003#.gif','004#.gif','005#.gif','006#.gif','007#.gif','008#.gif','009#.gif','010#.gif',
        '011#.gif','012#.gif','013#.gif','014#.gif','015#.gif','016#.gif','017#.gif','018#.gif','019#.gif','020#.gif',
        '021#.gif','022#.gif','023#.gif','024#.gif','025#.gif','026#.gif','027#.gif','028#.gif','029#.gif','030#.gif',
        '031#.gif','032#.gif','033#.gif','034#.gif','035#.gif','036#.gif','037#.gif','038#.gif','039#.gif','040#.gif',
        '041#.gif','042#.gif','043#.gif','044#.gif','045#.gif','046#.gif','047#.gif','048#.gif','049#.gif','050#.gif',
        '051#.gif','052#.gif','053#.gif','054#.gif','055#.gif','056#.gif','057#.gif','058#.gif','059#.gif','060#.gif',
        '061#.gif','062#.gif','063#.gif','064#.gif','065#.gif','066#.gif','067#.gif','068#.gif','069#.gif','070#.gif',
        '071#.gif','072#.gif','073#.gif','074#.gif','075#.gif','076#.gif','077#.gif','078#.gif','079#.gif','080#.gif',
        '081#.gif','082#.gif','083#.gif','084#.gif','085#.gif','086#.gif','087#.gif','088#.gif','089#.gif','090#.gif',
        '091#.gif','092#.gif','093#.gif','094#.gif','095#.gif','096#.gif','097#.gif','098#.gif','099#.gif','100#.gif',
        '101#.gif','102#.gif','103#.gif','104#.gif','105#.gif','106#.gif','107#.gif','108#.gif','109#.gif','110#.gif',
        '111#.gif','112#.gif','113#.gif','114#.gif','115#.gif','116#.gif','117#.gif','118#.gif','119#.gif','120#.gif',
        '121#.gif','122#.gif','123#.gif','124#.gif','125#.gif','126#.gif','127#.gif','128#.gif','129#.gif','130#.gif',
        '131#.gif','132#.gif','133#.gif','134#.gif','135#.gif','136#.gif','137#.gif','138#.gif','139#.gif','140#.gif',
        '141#.gif','142#.gif','143#.gif','144#.gif','145#.gif','146#.gif','147#.gif','148#.gif','149#.gif','150#.gif',
        '151#.gif','152#.gif','153#.gif','154#.gif','155#.gif','156#.gif','157#.gif','158#.gif','159#.gif','160#.gif',
        '161#.gif','162#.gif','163#.gif','164#.gif','165#.gif','166#.gif','167#.gif','168#.gif','169#.gif','170#.gif',
        '171#.gif','172#.gif','173#.gif','174#.gif','175#.gif','176#.gif','177#.gif','178#.gif','179#.gif','180#.gif',
        '181#.gif','182#.gif','183#.gif','184#.gif','185#.gif','186#.gif','187#.gif','188#.gif','189#.gif','190#.gif',
        '191#.gif','192#.gif','193#.gif','194#.gif','195#.gif','196#.gif','197#.gif','198#.gif','199#.gif','200#.gif',
        '201#.gif','202#.gif','203#.gif','204#.gif','205#.gif','206#.gif','207#.gif','208#.gif','209#.gif','210#.gif',
        '211#.gif','212#.gif','213#.gif','214#.gif','215#.gif','216#.gif','217#.gif','218#.gif','219#.gif','220#.gif',
        '221#.gif','222#.gif','223#.gif','224#.gif','225#.gif','226#.gif','227#.gif','228#.gif','229#.gif','230#.gif',
        '231#.gif','232#.gif','233#.gif','234#.gif','235#.gif','236#.gif','237#.gif','238#.gif','239#.gif','240#.gif',
        '241#.gif','242#.gif','243#.gif','244#.gif','245#.gif','246#.gif','247#.gif','248#.gif','249#.gif','250#.gif',
        '251#.gif','252#.gif','253#.gif','254#.gif','255#.gif','256#.gif','257#.gif','258#.gif','259#.gif','260#.gif',
        '261#.gif','262#.gif','263#.gif','264#.gif','265#.gif','266#.gif','267#.gif','268#.gif','269#.gif','270#.gif',
        '271#.gif','272#.gif','273#.gif','274#.gif','275#.gif','276#.gif','277#.gif','278#.gif','279#.gif','280#.gif',
        '281#.gif','282#.gif','283#.gif','284#.gif','285#.gif','286#.gif','287#.gif','288#.gif','289#.gif','290#.gif',
        '291#.gif','292#.gif','293#.gif','294#.gif','295#.gif','296#.gif','297#.gif','298#.gif','299#.gif','300#.gif',
        '301#.gif','302#.gif','303#.gif','304#.gif','305#.gif','306#.gif','307#.gif','308#.gif','309#.gif','310#.gif',
        '311#.gif','312#.gif','313#.gif','314#.gif','315#.gif','316#.gif','317#.gif','318#.gif','319#.gif','320#.gif',
        '321#.gif','322#.gif','323#.gif','324#.gif','325#.gif','326#.gif','327#.gif','328#.gif','329#.gif','330#.gif',
        '331#.gif','332#.gif','333#.gif','334#.gif','335#.gif','336#.gif','337#.gif','338#.gif','339#.gif','340#.gif',
        '341#.gif','342#.gif','343#.gif','344#.gif','345#.gif','346#.gif','347#.gif','348#.gif','349#.gif','350#.gif',
        '351#.gif','352#.gif','353#.gif','354#.gif','355#.gif','356#.gif','357#.gif','358#.gif','359#.gif','360#.gif',
        '361#.gif','362#.gif','363#.gif','364#.gif','365#.gif','366#.gif','367#.gif','368#.gif','369#.gif','500#.gif'
	]
]);

smileData.push([
	'Yahoo',
	'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
	'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
	'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
	'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',	
	'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',
	'61.gif','62.gif','63.gif','64.gif'
]
]);

smileData.push([
	'banana',
	'http://plurksmile.googlecode.com/svn/trunk/images/banana/',
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
