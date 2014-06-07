// ==UserScript==
// @name          	Plurk Smileys Extended
// @include         http://www.plurk.com/*
// @include         http://www.plurk.com/p/*
// @include         http://*.plurk.com/*
// @include         http://*.plurk.com/p/*
// @description     增加噗浪隱藏表情，可修改原始碼以自定表情
// @version         1.1.1
// @namespace      	http://userscripts.org/scripts/show/79743
// @modified log   	2011/02/24 v1.0 修改現有網路資源，增加顯示隱藏表情的功能
// @modified log   	2011/02/25 v1.1 增加米滷蛋、彎彎、輔大猴、戰鬥毛、四小折、海賊王、兔斯基、悠嘻猴、看樹狗、好人信...等表情圖片
// @modified log   	2011/03/01 v1.1.1 增加遺漏的(jazzhand)符號
// ==/UserScript==



// ********** Main Script ***********

var smileData = [];

smileData.push([
	'預留防錯誤用',
	'請勿刪除此段落否則會造成錯誤',
	[]
]);


//自定表情符號項目從這裡開始




smileData.push([
	'洋蔥頭',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/onion/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
	'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
	'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
	'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
	'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
	'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',
	'61.gif','62.gif','63.gif','64.gif',	
    ]
]);

smileData.push([
	'洋蔥頭XD',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/onion_xd/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
	'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
	'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
	'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
	'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
	'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif',
    ]
]);


smileData.push([
	'米滷蛋',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/egg/',
	['1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
			'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
			'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
			'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
			'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
			'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',
			'61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif',
			'71.gif','72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif',
			'81.gif','82.gif','83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif',
			'91.gif','92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','99.gif','100.gif',
			'101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif',
			'111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif','120.gif',
			'121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif','128.gif','129.gif','130.gif',
			'131.gif','132.gif','133.gif','134.gif','135.gif','136.gif','137.gif','138.gif','139.gif', 'chu.gif',
			'IRONEGG01.gif','IRONEGG02.gif','GP.gif','JN.gif','GPJN.gif','LGG.gif',
    ]
]);

smileData.push([
	'彎彎',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/xx/wan/',
	['1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
			'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
			'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
			'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
			'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
			'51.gif','52.gif','53.gif','54.gif','55.gif', '6-1.gif' , 'd579f819.gif', 'da4223b8.gif',
			'1034d6c9.gif',
    ]
]);

smileData.push([
	'輔大猴',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/monkey/',
	['1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
			'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
			'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
			'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
			'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
			'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',
			'61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif',
			'71.gif','72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif',
			'81.gif','82.gif','83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif',
			'91.gif','92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','85_-F.gif','87_-F.gif',
			'88_-F.gif','100_happynewyear-F.gif','99_xmas-F.gif','51_.gif',
    ]
]);

smileData.push([
	'兔斯基',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/rabbit/',
	['1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
			'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
			'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
			'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
			'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
			'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',
			'61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif',
			'71.gif','72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif',
			'81.gif','82.gif','83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif',
			'91.gif','92.gif','93.gif'
    ]
]);

smileData.push([
	'四小折',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/off60/',
	['1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
			'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
			'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
			'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
			'41.gif','42.gif','43.gif','44.gif','45.gif'
    ]
]);

smileData.push([
	'戰鬥毛',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/fightman/',
	['1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
			'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
			'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
			'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif'
    ]
]);

smileData.push([
	'悠嘻猴',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/youxi/',
	['1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
			'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
			'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
			'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
			'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
			'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',
			'61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif',
			'71.gif','72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif',
			'81.gif','82.gif','83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif',
			'91.gif','92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','99.gif','100.gif',
			'101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif',
			'111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif','120.gif',
			'121.gif','122.gif','123.gif',
    ]
]);

smileData.push([
	'悠嘻猴(XD)',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/youxi_xd/',
	['1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
			'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
			'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
			'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
			'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
			'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',
			'61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif'
    ]
]);

smileData.push([
	'看樹狗',
	'http://www.tovery.net/upload/files/watchtreedog/msn/msn/',
	['dog-nod.gif','dog-huhu.gif','dog-bath.gif','dog_donotgo.gif','dog_killbig.gif',
     'dog_frighte.gif','dog_hi.gif','dog_bye.gif','dog-lala.gif','watch-tree-dog-please.gif',
     'dog_give_me.gif','red_pocket.gif','consume.gif','watch-tree-dog-cry.gif',
     'watch-tree-dog-happy1.gif','watch-tree-dog-mad.gif','watch-tree-dog-nothing.gif',
     'watch-tree-dog-shy.gif','goodnight.gif',
    ]
]);

smileData.push([
	'好人信',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/xx/gg/',
	['1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
			'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
			'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
			'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
			'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
			'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',
			'61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif',
			'71.gif','72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif',
			'81.gif','82.gif','83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif',
			'91.gif','92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','99.gif','100.gif',
			'101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif',
    ]
]);

smileData.push([
	'海賊王',
	'http://i726.photobucket.com/albums/ww267/RachelLin28/OP/',
	['1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
	'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
	'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
	'31.gif','32.gif','33.gif','34.gif','35.gif',
    ]
]);


//內建隱藏表情專用，一般情況下請不要修改
var smileCode = [];


smileCode.push([
	'隱藏',
	'http://statics.plurk.com/',
	[
	'7256dae81d56d150120ccd0c96dd2197.gif','0efc4d55d28704f4370ef874ae906161.gif','4c40d16a0d369b895c08f2e33d062ec8.gif',
	'deda4d9f78ad528d725e3a6bfbf6352f.gif','7bd4d66256fc805da4dd178b9fdbe3ce.png','4ad099fba019942f13058610ff3fc568.gif',
	'47d20905d017c396d67b4a30c9ac9b10.png','71acd802cc931649dd9a371ccf70bad2.gif','3acbaf42504fff32c5eac4f12083ce56.gif',
	'74030f05f06547a3d26b02ccbf0bbac7.gif','fcd28d7d78ec1f828c76930fa63270e6.gif','bac8c8392f7ca8f5ac74612be4d08b74.gif',
	'a555399b40c379adca5b6f5bad5bf732.gif','feb43dbbbf2763905571060be9a496d1.gif','88fac5a4b99110a35d4e4794dad58ab4.gif',
	'6675254cd7449b1847a93b0024127eae.gif','8855f56400a936db07f348d9290adaac.gif','5b51892d7d1f392d93ea7fe26e5100f4.gif',
	'6de58c967f1c2797d250a713ba50eddd.gif','b3b9856e557fcc2700fd41c53f9d4910.gif','cfdd2accc1188f5fbc62e149074c7f29.png',
	'828b9819249db696701ae0987fba3638.png','1bd653e166492e40e214ef6ce4dd716f.png','3fe6cf919158597d7ec74f8d90f0cc9f.png',
	'8590888362ae83daed52e4ca73c296a6.png','c7551098438cc28ec3b54281d4b09cc3.png','cfd84315ebceec0c4389c51cf69132bd.png',
	'0e0bf1ec2c2958799666f3995ef830ca.png','e2998ca75f80c1c4a5508c549e3980a6.png','c6ad1c4f9e11f6859a1ba39c4341ef8b.png',
	'4a61085f1c6a639f028cd48ae97d07d0.png','53253ca60f5831f0812954213a2e9bb3.png','9c5c54081547d2ad903648f178fcc595.png',
	'f73b773aa689647cb09f57f67a83bb89.png','6928f3117658cc38d94e70519a511005.png',
	],
	[
	'(firework)','(code)','(yarr)',
	'(Русский)','(bzzz)','(dance_bzz)',
	'(goal)','(hungry_okok)','(yarr_okok)',
	'(music_okok)','(gym_okok)','(wave_okok)',
	'(dance_okok)','(no_dance)','(taser_okok)',
	'(angry_OKOK)','(code_okok)','(banana_gym)',
	'(dance_yarr)','(droid_dance)','(fuu)',
	'(gfuu)','(yay)','(gyay)',
	'(aha)','(gaha)','(whatever)',
	'(gwhatever)','(pokerface)','(gpokerface)',
	'(yea)','(gyea)','(bah)',
	'(troll)','(jazzhands)',
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
    for(var i=0;  i<smileCode.length; i++)
    {
 
        addTab(i, smileCode[i]);
    }
    
    
    for(var i=1;  i<smileData.length; i++)
    {
 
        addTab(i, smileData[i]);
    }
    
    // init css
    getById('emoticons_show').style.width  = '110%';
    getById('emoticons_show').style.height = '200px';
    getById('emoticons_show').style.overflow = 'auto';
    getById('emoticons_tabs').style.width = '110%';

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
    
    arr = smileCode[datid];
    if (typeof(arr) != 'undefined')
    {
        if(typeof(arr[2][smileid]) != 'undefined')
            str = ' ' + smileCode[datid][1] + smileCode[datid][2][smileid] + ' ';
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
        addCode(this, id);
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
    for(var i=0, dat = data[2], _url ; i<dat.length; i++)
    {
        _url = baseUrl + dat[i];
        str += '<a href="javascript:void 0;"><img  src="'+_url+'" alt="'+dat[i]+'" title="'+dat[i]+'"  /></a>';
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

function addCode(obj, ind)
{
    var showDiv = getById('emoticons_show');
    var lis = getById('emoticons_tabs').getElementsByTagName('li');
    for(var i=0; i<lis.length; i++)
        lis[i].className = 'emoticon_selecter';

    obj.className += ' current';

    var data = smileCode[ind];
    var baseUrl = data[1];

    var str = '<div>';
    for(var i=0, dat = data[2], code = data[3], _url; i<dat.length; i++)
    {
        _url = baseUrl + dat[i];
        str += '<a href="javascript:void 0;"><img  src="'+_url+'" alt="'+dat[i]+'" title="'+code[i]+'"  /></a>';
    }
    str += '</div>';
    showDiv.innerHTML = str;
    
    var imgs = showDiv.getElementsByTagName('img');
    for(var i=0; i<imgs.length; i++)
    {
        imgs[i].addEventListener('click', function()
        {	
            currInput.value += ' ' + this.title + ' ';
            currInput.focus();
        }, false);
    }
}


function getById(oid)
{
    return document.getElementById(oid);
}


// Plurker 2 _blank (fixed by Kiss K D)//

(function(blank) {
setTimeout(function() {
as = document.getElementsByTagName('a');
for (i = 0; i<as.length; i++) {
if (as[i].className == "name") as[i].setAttribute('target', '_blank');
}
setTimeout(arguments.callee, 1000);
}, 1000);
})();