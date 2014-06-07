// ==UserScript==
// @name           Plurk Smile (大俠整合 0.1 BETA  )
// @namespace      
// @description    噗浪表情圖案 & 引用噗
// @include        http://www.plurk.com/*
// ==/UserScript==

// ==About==
// author:         大俠 重整版 (原作者不詳 感謝所有的 ？？？)
// plurk: http://www.plurk.com/四人幫
//
//
//
// ********** Image Data ***********
var smileData = [];
var i;
var str;
var contentwhitebear=[];
var contentonion=[];
var contentonion1=[];
var contentonion2=[];
var contentmonkey=[];


for (i=1; i<=126; i++) { //圖檔最大流水號 缺091.gif 視情況修改
if (i<10) {
str='00' + i;
}
else if (i<100) {
str='0' + i;
}
else{
str=i
};
str=str + '.gif';
contentwhitebear[i-1]=str
};
smileData.push([
        '小白熊', //視情況修改
        'http://s653.photobucket.com/albums/uu253/white_bear4olympus/', //圖檔存放路徑 視情況修改
        contentwhitebear
]);


for (i=1; i<=129; i++) { //圖檔最大流水號 缺091.gif 視情況修改
if (i<10) {
str='00' + i;
}
else if (i<100) {
str='0' + i;
}
else{
str=i
};
str=str + '.gif';
contentonion[i-1]=str;
};
smileData.push([
        '洋蔥頭', //視情況修改
        'http://s675.photobucket.com/albums/vv116/onion4olympus/', //圖檔存放路徑 視情況修改
        contentonion
]);


for (i=1; i<=106; i++) { //圖檔最大流水號 缺 視情況修改
if (i<10) {
str='00' + i;
}
else if (i<100) {
str='0' + i;
}
else{
str=i
};
str=str + '.gif';
contentonion1[i-1]=str;
};
smileData.push([
        '新洋蔥1', //視情況修改
        'http://s571.photobucket.com/albums/ss155/onion14olympus/', //圖檔存放路徑 視情況修改
        contentonion1
]);


for (i=107; i<=209; i++) { //圖檔最大流水號 缺 視情況修改
if (i<10) {
str='00' + i;
}
else if (i<100) {
str='0' + i;
}
else{
str=i
};
str=str + '.gif';
contentonion2[i-107]=str;
};
smileData.push([
        '新洋蔥2', //視情況修改
        'http://s691.photobucket.com/albums/vv276/onion24olympus/', //圖檔存放路徑 視情況修改
        contentonion2
]);


for (i=1; i<=222; i++) { //圖檔最大流水號 缺 視情況修改
if (i<10) {
str='00' + i;
}
else if (i<100) {
str='0' + i;
}
else{
str=i
};
str='m' + str + '.gif';
contentmonkey[i-1]=str;
};
smileData.push([
        '悠嬉猴', //視情況修改
        'http://s712.photobucket.com/albums/ww122/monkey4olympus/', //圖檔存放路徑 視情況修改
        contentmonkey
]);



//Main Script

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
				var rp = $('<a href="#" id="RePlurk">RePlurk-轉貼此噗</a>').css('float','right').css('right-padding','3px').click(function(){
					doRePlurk(owner_id,raw,link);
				});

				pp.after(rp);
			}

		}
	}
}


function doRePlurk(owner_id,raw,link){
	var nick = uw.SiteState.getUserById(owner_id).nick_name;

	$('#input_big').val(link + ' ([ReP_原噗按此] ) ' + ((nick) ? ('@' + nick + ': ') : '') + raw);
	p._removeExpand();
	uw.MaxChar.updateBig();
}
