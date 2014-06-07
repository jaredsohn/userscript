// ==UserScript==
// @name                Plurk Smile (v4.6h_Beta) - 嗨團特製版
// @namespace       http://phpz.org/
// @description     Easy to insert custom smile - 此為嗨團修改D調版 (原作者為土豆王)
// @include             http://www.plurk.com/*
// ==/UserScript==

// ==About==
// author: Seven Yu
// Email: dofyyu#gmail.com
// blog: http://blog.dofy.net/
// blog: http://phpz.org/

// == Modified Log == 
// v4.6h:   2008/11 修改空間(@foxfair-私人空間 + @jhihguan-hinet) + 固定圖示大小(42)

// ********** Main Script ***********
var smileData = [];

smileData.push([
	'♂嗨',      //plurkpix
	'http://www.plurkpix.com/pix/',
	[ 
        'fy.gif','6q7.gif','oh.gif','3l5.gif','2LD.gif','iT.gif','aI2.gif',
        '6Tm.gif','6Wi.gif','6ZA.gif','5PW.gif','7tk.gif','9tS.gif',
        '7qx.gif','7s2.gif','7wS.gif','7x6.gif','axR.gif','9Kq.gif','9u1.gif',
        'aCm.gif','aCk.gif','7E9.gif','8g3.jpg','aHT.jpg','aHY.gif',
        '9K9.gif','aHZ.gif','aIb.gif','aIa.gif','3ad.png','aHV.jpg','9tQ.gif', 
        //大頭貼
        '6F6.jpg','aQN.jpg','aQd.jpg','aPH.jpg',
        '4ac.gif','aHX.gif','6uv.gif','aPB.gif','7p6.gif','aLT.gif','7lv.gif',
        '4E.gif','70k.gif','aHL.gif','8N.gif','70d.gif','70b.gif','7ge.gif',
        '55m.gif','6rV.gif','5Vi.gif','5Vm.gif',
        //藍藍路
        '2c3.gif','2lw.gif','2t6.gif','2t7.gif','2t9.gif','2yZ.gif',
        
 /*       //重複：'6Hm.gif','6uw.gif',
        '5Hs.gif','6q7.gif','fy.gif','4aa.gif','oh.gif','5hC.gif','DO.gif','iT.gif','2LD.gif','3l5.gif',
        '2UB.gif','6uv.gif','6op.gif','2YB.jpg','10U.gif','wP.gif','JK.gif','8H.gif','4E.gif',
        '5hI.gif','4kb.gif','6v9.gif','8N.gif','tk.gif','6uw.gif','3ad.png','6t4.gif','5YA.gif',
        //豬豬
        '55m.gif','5in.gif','4Lz.gif','6rV.gif','5Tz.gif',
        //其他
        '6t0.gif','2yZ.gif','4O8.gif','4O6.gif','3fZ.gif','5Vi.gif','5Vm.gif',
        //悠嘻猴 
        '5SP.gif','11s.gif','4Jf.gif','4K2.gif','UP.gif','4U3.gif','4U5.gif',
        '4U7.gif','4U6.gif','4Ub.gif','5Wc.gif', //'4EZ.gif',
        //藍藍路
        '2c3.gif','2lw.gif','2oj.gif','4PN.gif','2t5.gif','2t6.gif','2t7.gif',
        '2t8.gif','2t9.gif','2tb.gif',

        */
	]   
]);

smileData.push([
	'♀嗨',   // plurkpix
	'http://www.plurkpix.com/pix/',
	[
		'6v9.gif','tk.gif','6O7.gif','10U.gif','7qu.jpg',
        '9JF.gif','7qT.gif','9tJ.gif','9tZ.gif','9tH.gif','7Bt.gif',
        '7qV.gif','7qW.gif','7qS.gif','7r1.gif','7r2.gif','7qZ.gif',
        '7r3.gif','7r7.gif','7rb.gif','91M.gif','7si.gif','aI4.gif',
        '54Q.gif','and.gif','anc.gif','9wF.jpg','aI1.gif',
        'aI5.gif','aI8.gif','aKR.gif','aKS.gif','aI6.gif',
        'aI7.gif','7r9.gif',
        //大頭貼
        'aIc.jpg','aQl.jpg','aQW.gif','aI9.gif',
        
	]
]);

smileData.push([
	'蔥',     //@jiayun
	'http://jiayun.org/onion/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif',  '006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif',  '016.gif','017.gif','018.gif','019.gif','020.gif',
        '021.gif','022.gif','023.gif','024.gif','025.gif',  '026.gif','027.gif','028.gif','029.gif','030.gif',
        '031.gif','032.gif','033.gif','034.gif','035.gif',  '036.gif','037.gif','038.gif','039.gif','040.gif',
        '041.gif','042.gif','043.gif','044.gif','045.gif',  '046.gif','047.gif','048.gif','049.gif','050.gif',
        '051.gif','052.gif','053.gif','054.gif','055.gif',  '056.gif','057.gif','058.gif','059.gif','060.gif',
        '061.gif','062.gif','063.gif','064.gif','065.gif',  '066.gif','067.gif','068.gif','069.gif','070.gif',
        '071.gif','072.gif','073.gif','074.gif','075.gif',  '076.gif','077.gif','078.gif','079.gif','080.gif',
        '081.gif','082.gif','083.gif','084.gif','085.gif',  '086.gif','087.gif','088.gif','089.gif','090.gif',
        '091.gif','092.gif','093.gif','094.gif','095.gif',  '096.gif','097.gif','098.gif','099.gif','100.gif',
        '101.gif','102.gif','103.gif','104.gif','105.gif',  '106.gif','107.gif','108.gif','109.gif','110.gif',
        '111.gif','112.gif','113.gif','114.gif','115.gif',  '116.gif','117.gif','118.gif','119.gif','120.gif',
        '121.gif','122.gif','123.gif','124.gif','125.gif',  '126.gif','127.gif','128.gif','129.gif','130.gif',
	]
]);


smileData.push([
	'滷蛋',      //@jhihguan
	'http://adiewane.myweb.hinet.net/plurk/samwoo/',
	[
		'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','13.gif','14.gif','15.gif',
		'16.gif','17.gif','18.gif','19.gif','20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif',
		'30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif','42.gif','43.gif',
		'44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif',
		'58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif','71.gif',
		'72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif','81.gif','82.gif','83.gif','84.gif','85.gif',
		'86.gif','87.gif','88.gif','89.gif','90.gif','91.gif','92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','99.gif',
		'100.gif','101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif',
        '111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif','120.gif',
        '121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif','129.gif','130.gif',
        '131.gif','132.gif',
	]
]);

smileData.push([
	'雞',      //@jhihguan
	'http://adiewane.myweb.hinet.net/plurk/mie/',
	[
        '20071202_1.gif','20080114_1.gif','20080114_2.gif','20080211_1.gif','20080212_1.gif','20080218_1.gif','20080218_2.gif',
		'20080218_3.gif','20080218_4.gif','20080219_1.gif','20080228_1.gif','20080402_1.gif','20080419_1.gif','20080421_1.gif',
		'20080421_2.gif','20080421_3.gif','20080421_4.gif','20080427_1.gif','20080430_1.gif','20080501_1.gif','20080501_2.gif',
		'20080502_1.gif','20080514_1.gif','20080514_2.gif','20080514_3.gif','20080514_5.gif','20080529_1.gif',
		'20080529_2.gif','20080529_3.gif','20080529_4.gif','20080604_1.gif','20080604_2.gif','20080604_3.gif','20080604_4.gif',
		'20080630_1.gif','20080630_2.gif','20080728_1.gif','20080728_2.gif','20080807_1.gif','20080807_2.gif','20080902_1.gif',
		'20080902_2.gif','20080902_3.gif','200804274_1.gif','200804274_2.gif','bugu_1.gif','bugu_2.gif','bugu_3.gif','bugu_4.gif',
        'bugu_6.gif','bugu_8.gif','bugu_10.gif','bugu_11.gif','bugu_12.gif','bugu_14.gif','miemie_1.gif','miemie_2.gif',
        'bugu_16.gif','bugu_17.gif','bugu_18.gif',
	]
]);	

smileData.push([
	'彎',   // @foxfair
	'http://www.fomokka.net/~foxfair/wan/',
	[
		'000.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
		'011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',
		'021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',
		'031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',
		'041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif',
		'051.gif','053.gif','056.gif',
	]
]);


smileData.push([
	'猴',      // @foxfair
	'http://www.fomokka.net/~foxfair/monkey/',
	[
		'000.gif','002.gif','003.gif','006.gif','007.gif','009.gif','011.gif','151.gif',
		'012.gif','014.gif','015.gif','017.gif','018.gif','019.gif','021.gif','109.gif',
		'020.gif','022.gif','025.gif','027.gif','029.gif','030.gif','031.gif','108.gif',
		'034.gif','036.gif','040.gif','041.gif','042.gif','043.gif','044.gif','106.gif',
		'048.gif','049.gif','050.gif','052.gif','054.gif','056.gif','060.gif','089.gif',
		'062.gif','063.gif','064.gif','065.gif','067.gif','071.gif','072.gif','102.gif',
		'073.gif','074.gif','076.gif','079.gif','080.gif','082.gif','083.gif','112.gif',
		'085.gif','090.gif','091.gif','094.gif','096.gif','097.gif','099.gif','116.gif',
		'121.gif','130.gif','134.gif','135.gif','137.gif','140.gif','142.gif','147.gif',
		'153.gif'
	]
]);

smileData.push([
	'呆',
	'http://adiewane.myweb.hinet.net/plurk/other/',
	[
			'00.gif','01.gif','02.gif','03.gif','04.gif','05.gif','06.gif',
			'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif',
			'010.gif','011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
			'020.gif','021.gif','022.gif','smooth.gif','023.gif','024.gif','025.gif','026.gif','027.gif',
			'028.gif','029.gif','030.gif','031.gif','032.gif','033.jpg','034.gif','035.gif','036.png',
			'037.jpg','038.gif','039.gif','040.png',
   		
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
    getById('emoticons_show').style.margin = 0;
    getById('emoticons_show').style.padding = 0;

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
        str += '<a href="javascript:void 0;"><img src="'+_url+'" alt="'+dat[i]+'" title="['+ind+' '+i+']" width="42" /></a>';

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