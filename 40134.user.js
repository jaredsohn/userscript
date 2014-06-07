// ==UserScript==
// @name            Plurk Smile 阿Vin呆呆版  v1.01
// @namespace       http://userscripts.org/
// @description     改版再進化~
// @include         http://www.plurk.com/*
// modified log:   
// ==/UserScript==


// ********** Main Script ***********
var smileData = [];

smileData.push([
	'洋蔥頭',
	'http://cichikung.myweb.hinet.net/plurk/onion/',
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
        '121.gif','122.gif','123.gif','124.gif','125.gif',  '126.gif','127.gif','128.gif','129.gif'
	]
]);

smileData.push([
    '兔子',
    'http://ipx6.cn/plotion/rabbit/',
    [
        'r1.gif','r2.gif','r3.gif','r4.gif','r5.gif','r6.gif','r7.gif','r8.gif','r9.gif',
        'r10.gif','r11.gif','r12.gif','r13.gif','r14.gif','r15.gif','r16.gif','r17.gif',
        'r18.gif','r19.gif','r20.gif','r21.gif','r22.gif','r23.gif','r24.gif','r25.gif',
        'r26.gif','r27.gif','r28.gif','r29.gif','r30.gif','r31.gif','r32.gif','r33.gif',
        'r34.gif','r35.gif','r36.gif','r37.gif','r38.gif','r39.gif','r40.gif','r41.gif',
        'r42.gif','r43.gif','r44.gif','r45.gif','r46.gif','r47.gif','r48.gif','r49.gif',
        'r50.gif','r51.gif','r52.gif','r53.gif','r54.gif','r55.gif','r56.gif','r57.gif',
        'r58.gif','r59.gif','r60.gif','r61.gif','r62.gif','r63.gif','r64.gif','r65.gif',
        'r66.gif','r67.gif','r68.gif','r69.gif','r70.gif','r71.gif','r72.gif','r73.gif',
        'r74.gif','r75.gif','r76.gif','r77.gif','r78.gif'
    ]
]);

smileData.push([
	'香蕉',
	'http://ipx6.cn/plotion/Banana/',
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
	'悠嘻猴',
	'http://cichikung.myweb.hinet.net/plurk/monkey/',
	[
        'm001.gif','m002.gif','m003.gif','m004.gif','m005.gif','m006.gif','m007.gif','m008.gif','m009.gif','m010.gif',
        'm011.gif','m012.gif','m013.gif','m014.gif','m015.gif','m016.gif','m017.gif','m018.gif','m019.gif',
        'm020.gif','m021.gif','m022.gif','m023.gif','m024.gif','m025.gif','m026.gif','m027.gif','m028.gif',
        'm029.gif','m030.gif','m031.gif','m032.gif','m033.gif','m034.gif','m035.gif','m036.gif','m037.gif',
        'm038.gif','m039.gif','m040.gif','m041.gif','m042.gif','m043.gif','m044.gif','m045.gif','m046.gif',
        'm047.gif','m048.gif','m049.gif','m050.gif','m051.gif','m052.gif','m053.gif','m054.gif','m055.gif',
        'm056.gif','m057.gif','m058.gif','m059.gif','m060.gif','m061.gif','m062.gif','m063.gif','m064.gif',
        'm065.gif','m066.gif','m067.gif','m068.gif','m069.gif','m070.gif','m071.gif','m072.gif','m073.gif',
        'm074.gif','m075.gif','m076.gif','m077.gif','m078.gif','m079.gif','m080.gif','m081.gif','m082.gif',
        'm083.gif','m084.gif','m085.gif','m086.gif','m087.gif','m088.gif','m089.gif','m090.gif','m091.gif',
        'm092.gif','m093.gif','m094.gif','m095.gif','m096.gif','m097.gif','m098.gif','m099.gif','m100.gif',
        'm101.gif','m102.gif','m103.gif','m104.gif','m105.gif','m106.gif','m107.gif','m108.gif','m109.gif',
        'm110.gif','m111.gif','m112.gif','m113.gif','m114.gif','m115.gif','m116.gif','m117.gif','m118.gif',
        'm119.gif','m120.gif','m121.gif','m122.gif','m123.gif','m124.gif','m125.gif','m126.gif','m127.gif',
        'm128.gif','m129.gif','m130.gif','m131.gif','m132.gif','m133.gif','m134.gif','m135.gif','m136.gif',
        'm137.gif','m138.gif','m139.gif','m140.gif','m141.gif','m142.gif','m143.gif','m144.gif','m145.gif',
        'm146.gif','m147.gif','m148.gif','m149.gif','m150.gif','m151.gif','m152.gif','m153.gif','m154.gif',
        'm155.gif','m156.gif','m157.gif','m158.gif','m159.gif','m160.gif','m161.gif','m162.gif','m163.gif',
        'm164.gif','m165.gif','m166.gif','m167.gif','m168.gif','m169.gif','m170.gif','m171.gif','m172.gif',
        'm173.gif','m174.gif','m175.gif','m176.gif','m177.gif','m178.gif','m179.gif','m180.gif','m181.gif',
        'm182.gif','m183.gif','m184.gif','m185.gif','m186.gif','m187.gif','m188.gif','m189.gif','m190.gif',
        'm191.gif','m192.gif','m193.gif','m194.gif','m195.gif','m196.gif','m197.gif','m198.gif','m199.gif',
        'm200.gif','m201.gif','m202.gif','m203.gif','m204.gif','m205.gif','m206.gif','m207.gif','m208.gif',
        'm209.gif','m210.gif','m211.gif','m212.gif','m213.gif','m214.gif','m215.gif','m216.gif','m217.gif',
        'm218.gif','m219.gif','m220.gif','m221.gif','m222.gif'
	]
]);

smileData.push([
	'就醬',
	'http://cichikung.myweb.hinet.net/plurk/jojan/',
	[
        'm001.gif','m002.gif','m003.gif','m004.gif','m005.gif','m006.gif','m007.gif','m008.gif','m009.gif','m010.gif',
        'm011.gif','m012.gif','m013.gif','m014.gif','m015.gif','m016.gif','m017.gif'
   	]
]);

smileData.push([
	'米滷蛋',
	'http://cichikung.myweb.hinet.net/plurk/samwoo/',
	[
		'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','13.gif','14.gif','15.gif',
		'16.gif','17.gif','18.gif','19.gif','20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif',
		'30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif','42.gif','43.gif',
		'44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif',
		'58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif','71.gif',
		'72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif','81.gif','82.gif','83.gif','84.gif','85.gif',
		'86.gif','87.gif','88.gif','89.gif','90.gif','91.gif','92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','99.gif',
		'100.gif','101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif'
	]
]);

smileData.push([
	'彎彎',
	'http://cichikung.myweb.hinet.net/plurk/wan/',
	[
		'000.gif','001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
		'011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',
		'021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',
		'031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',
		'041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif',
		'051.gif','052.gif','053.gif','054.gif','055.gif'
	]
]);


smileData.push([
	'布咕雞',
	'http://cichikung.myweb.hinet.net/plurk/mie/',
	[
		'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
		'011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',
		'021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',
		'031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',
		'041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif'
	]
]);	

smileData.push([
	'兔斯基',
	'http://cichikung.myweb.hinet.net/plurk/momo/',
	[
                '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
		'011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',
		'021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',
		'031.gif','032.gif','033.gif','034.gif'
	]
]);


smileData.push([
	'鹹起司',
	'http://www.plurkpix.com/pix/',
	[ 
        '6q7.gif','fy.gif','4aa.gif','oh.gif','5hC.gif','DO.gif','iT.gif','2LD.gif','3l5.gif','2UB.gif',
        '6uv.gif','6op.gif','2YB.jpg','10U.gif','wP.gif','JK.gif','8H.gif','4E.gif','5hI.gif','4kb.gif',
        '6v9.gif','8N.gif','tk.gif','6uw.gif','3ad.png','6t4.gif','5YA.gif',
        /*豬豬*/ '55m.gif','5in.gif','4Lz.gif','6rV.gif','5Tz.gif',
        /*其他*/ '6t0.gif','2yZ.gif','4O8.gif','4O6.gif','3fZ.gif','5Vi.gif','5Vm.gif',
        
        'oh.gif','QL.gif','mv.gif','tk.gif','RH.gif','WF.gif','JK.gif',
        '8N.gif','8H.gif','4z.gif','4E.gif','3W9.gif','3Wa.gif','3Wb.gif',
        '4aa.gif','4ac.gif','4au.gif',

        /*藍藍路*/ '2c3.gif','2lw.gif','2oj.gif','4PN.gif','2t5.gif','2t6.gif','2t7.gif',
                '2t8.gif','2t9.gif','2tb.gif',
        /*少用*/ '2Pu.gif','6iv.gif','1S1.gif','4ac.gif','5Hs.gif','5Lw.gif','px.gif'
        
	]   
]);

smileData.push([
	'四小折',
	'http://i410.photobucket.com/albums/pp189/unget/for/',
	[
		'FO001.gif','FO002.gif','FO003.gif','FO004.gif','FO005.gif','FO006.gif',
		'FO007.gif','FO008.gif','FO009.gif','FO010.gif','FO011.gif','FO012.gif',
		'FO013.gif','FO014.gif','FO015.gif','FO016.gif','FO017.gif','FO018.gif',
		'FO019.gif','FO020.gif','FO021.gif','FO022.gif','FO023.gif','FO024.gif',
		'FO025.gif','FO026.gif','FO027.gif','FO028.gif','FO029.gif','FO030.gif',
		'FO031.gif','FO032.gif','FO033.gif','FO034.gif','FO035.gif','FO036.gif',
		'FO037.gif','FO038.gif','FO039.gif','FO040.gif','FO041.gif','FO042.gif',
		'FO043.gif','FO044.gif','FO045.gif','FO046.gif','FO047.gif','FO048.gif',
		'FO049.gif','FO050.gif','FO051.gif','FO052.gif','FO053.gif','FO054.gif',
		'FO055.gif','FO056.gif','FO057.gif','FO058.gif','FO059.gif','FO060.gif',
		'FO061.gif','FO062.gif','FO063.gif','FO064.gif','FO065.gif','FO066.gif',
		'FO067.gif','FO068.gif','FO069.gif','FO070.gif','FO071.gif','FO072.gif',
		'FO073.gif','FO074.gif','FO075.gif','FO076.gif','FO077.gif','FO078.gif',
		'FO079.gif','FO080.gif','FO081.gif','FO082.gif','FO083.gif','FO084.gif',
		'FO085.gif','FO086.gif','FO087.gif','FO088.gif','FO089.gif','FO090.gif',
		'FO091.gif','FO092.gif','FO093.gif','FO094.gif','FO095.gif','FO096.gif',
		'FO097.gif','FO098.gif','FO099.gif','FO100.gif','FO101.gif','FO102.gif',
		'FO103.gif','FO104.gif','FO105.gif','FO106.gif','FO107.gif'
	]
]);

smileData.push([
	'LUNA',
	'http://luna.omg.com.tw/image/download/msn/',
	[
		'LUNA01.gif','LUNA02.gif','LUNA03.gif','LUNA04.gif','LUNA05.gif','LUNA06.gif',
		'LUNA07.gif','LUNA08.gif','LUNA09.gif','LUNA10.gif','LUNA11.gif','LUNA12.gif',
		'LUNA13.gif','LUNA14.gif','LUNA15.gif','LUNA16.gif','LUNA17.gif','LUNA18.gif'
	]
]);

smileData.push([
	'張君雅',
	'http://kevin357.myweb.hinet.net/2009/a01/',
	[
		'a0101.gif','a0102.gif','a0103.gif','a0104.gif','a0105.gif','a0106.gif',
		'a0107.gif','a0108.gif','a0109.gif','a0110.gif','a0111.gif','a0112.gif',
	        'a0113.gif','a0114.gif','a0115.gif','a0116.gif','a0117.gif','a0118.gif',
                'a0119.gif','a0120.gif','a0121.gif'
        ]
]);

smileData.push([
	'熊寶',
	'http://www.gamestar.com.tw/mini/leitmotif/051/',
	[
		'lei051001.gif','lei051002.gif','lei051003.gif','lei051004.gif','lei051005.gif','lei051006.gif',
		'lei051007.gif','lei051008.gif','lei051009.gif','lei051010.gif','lei051011.gif','lei051012.gif',
                'lei051013.gif','lei051014.gif','lei051015.gif','lei051016.gif','lei051017.gif','lei051018.gif',
                'lei051019.gif','lei051020.gif','lei051021.gif','lei051022.gif','lei051023.gif','lei051024.gif',
                'lei051025.gif','lei051026.gif','lei051027.gif','lei051028.gif','lei051029.gif','lei051030.gif',
                'lei051031.gif','lei051032.gif','lei051033.gif','lei051034.gif','lei051035.gif','lei051036.gif',
                'lei051037.gif','lei051038.gif','lei051039.gif','lei051040.gif'
        ]
]);

smileData.push([
	'奶油獅',
	'http://www.lionbaby.com.tw/download/',
	[
		'msn_1.gif','msn_2.gif','msn_3.gif','msn_4.gif','msn_5.gif','msn_6.gif',
		'msn_8.gif','msn_9.gif','msn_10.gif','msn_11.gif','msn_12.gif','msn_13.gif',
                'msn_14.gif','msn_15.gif','msn_16.gif','msn_17.gif'
        ]
]);

smileData.push([
	'MIMIO',
	'http://a2233.myweb.hinet.net/msn/mimio/',
	[
        'mimio%20(1).gif','mimio%20(2).gif','mimio%20(3).gif','mimio%20(4).gif','mimio%20(5).gif','mimio%20(6).gif',
        'mimio%20(7).gif','mimio%20(8).gif','mimio%20(9).gif','mimio%20(10).gif'
        ]
]);

smileData.push([
	'梨仔',
	'http://a2233.myweb.hinet.net/msn/cactus/',
	[
		'cactus%20(0).gif','cactus%20(1).gif','cactus%20(2).gif','cactus%20(3).gif','cactus%20(4).gif','cactus%20(5).gif',
		'cactus%20(6).gif','cactus%20(7).gif','cactus%20(8).gif','cactus%20(9).gif','cactus%20(10).gif','cactus%20(11).gif',
                'cactus%20(12).gif','cactus%20(13).gif','cactus%20(14).gif','cactus%20(15).gif','cactus%20(16).gif','cactus%20(17).gif',
                'cactus%20(18).gif','cactus%20(19).gif','cactus%20(20).gif','cactus%20(21).gif','cactus%20(22).gif','cactus%20(23).gif',
                'cactus%20(24).gif','cactus%20(25).gif','cactus%20(26).gif','cactus%20(27).gif','cactus%20(28).gif','cactus%20(29).gif',
                'cactus%20(30).gif','cactus%20(31).gif','cactus%20(32).gif','cactus%20(33).gif','cactus%20(34).gif','cactus%20(35).gif',
                'cactus%20(36).gif','cactus%20(37).gif','cactus%20(38).gif','cactus%20(39).gif','cactus%20(40).gif','cactus%20(41).gif',
                'cactus%20(42).gif','cactus%20(43).gif','cactus%20(44).gif','cactus%20(45).gif','cactus%20(46).gif','cactus%20(47).gif',
                'cactus%20(48).gif','cactus%20(49).gif','cactus%20(50).gif','cactus%20(51).gif','cactus%20(52).gif','cactus%20(53).gif',
                'cactus%20(54).gif'
        ]
]);


smileData.push([
	'茄子醬',
	'http://d.blog.xuite.net/d/e/d/6/13879225/blog_129243/txt/16613818/',
	[
		'0.gif','1.gif','2.gif','3.gif','4.gif','5.gif',
		'6.gif','7.gif','8.gif','9.gif','10.gif','11.gif',
                '12.gif','13.gif','14.gif','15.gif','16.gif','17.gif',
                '18.gif'
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