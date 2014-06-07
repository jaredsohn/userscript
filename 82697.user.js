// ==UserScript==
// @name            EmotiPlurk Smile V0.2
// @namespace       http://plurk.com/CupCakeits
// @description     01/08/2010
// @include         http://www.plurk.com/*
// author: Seven Yu (PlurkSmile V 4.6) and MaxChu (Replurk V 0.2)
// changed : Juice Fruit~
// +V0.1 [RePlurk Beta 1]

// ********** Main Script ***********
var smileData = [];

smileData.push([
	'BoyBox',
	'http://i784.photobucket.com/albums/yy124/poucopop/emotiplurk/Caixa/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif',  '006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif',  '016.gif','017.gif','018.gif','019.gif','020.gif',
	]
]);

smileData.push([
	'Catti',
	'http://i784.photobucket.com/albums/yy124/poucopop/emotiplurk/Catti/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif',  '006.gif','007.gif',
	]
]);


smileData.push([
	'Dot~',
	'http://i784.photobucket.com/albums/yy124/poucopop/emotiplurk/Catti/Dotao/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif',
	]
]);

smileData.push([
	'CubeBoy',
	'http://i784.photobucket.com/albums/yy124/poucopop/emotiplurk/DOTcube/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
	]
]);

smileData.push([
	'Ecca',
	'http://i784.photobucket.com/albums/yy124/poucopop/emotiplurk/Ecca/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif',
	]
]);

smileData.push([
	'KOKO Bear~',
	'http://i784.photobucket.com/albums/yy124/poucopop/emotiplurk/KOKOBear/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif',  '006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif',  '016.gif','017.gif','018.gif','019.gif','020.gif',
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

//== RE ==//
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		setTimeout(GM_wait,100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
	}
}

GM_wait();

var uw = unsafeWindow;
var p = uw.Plurks;
var o_expand;

if(p) {
	o_expand = p.expand;
	p.expand = function(div) {
		o_expand(div);

		var ib = $('#input_big').get(0);

		if(ib) {

			var plurk = uw.getPD(div).obj;
			var link = 'http://plurk.com/p/' + (plurk.plurk_id).toString(36);
			var raw = plurk.content_raw;
			var owner_id = plurk.owner_id;

			var info_box = $(uw.$dp.info_box);
			var pp = info_box.children(".perma_link");

			if(info_box.children("#RePlurk").length == 0) {
				var rp = $('<a href="#" id="RePlurk">Re-Plurkar</a>').css('float','right').css('right-padding','4px').click(function(){
					doRePlurk(owner_id,raw,link);


				});

				pp.after(rp);
			}

		}
	}
}


function doRePlurk(owner_id,raw,link){
	var nick = uw.SiteState.getUserById(owner_id).nick_name;

	$('#input_big').val(link + ' ([ReP]) ' + ((nick) ? ( ' de ' + '@' + nick + ': ') : '') + raw);
	p._removeExpand();
	uw.MaxChar.updateBig();
}

// PlurkMark This!//

window.setInterval(
	function(){
		permalink_container = document.evaluate('//*[@class="perma_link"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		permalink = document.evaluate('//*[@class="perma_link"]/a[@href]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		plurkmarkthis = document.evaluate('//*[@id="plurkmarkThis"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		if(permalink != null && permalink_container != null){
			GM_log("Creating link");
			if(plurkmarkthis.singleNodeValue != null){
				permalink_container.singleNodeValue.removeChild(plurkmarkthis.singleNodeValue);
			}
			var plurkmark = document.createElement('a');
			plurkmark.innerHTML = "Juice Fruits~";
			plurkmark.setAttribute('id','plurkmarkThis');
			plurkmark.setAttribute('href', "http://www.plurk.com/CupCakeits");
			plurkmark.setAttribute('target','_blank');
			plurkmark.setAttribute('style','position:absolute;left:4px;');
                        
                          
			permalink_container.singleNodeValue.appendChild(plurkmark);
		}
	},
	5000
);

// ==/UserScript==