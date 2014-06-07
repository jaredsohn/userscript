// ==UserScript==
// @name            Plurk Smile 阿Vin呆呆版  v1.02
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
        '092.gif','093.gif','094.gif','095.gif',  '096.gif','097.gif','098.gif','099.gif','100.gif',
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
		'FO103.gif','FO104.gif','FO105.gif','FO106.gif'
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
	'薇薇兔',
	'http://a2233.myweb.hinet.net/msn/vivian9668/',
	[

'vivian9668%20(0).jpg','vivian9668%20(1).jpg','vivian9668%20(2).jpg','vivian9668%20(3).jpg','vivian9668%20(4).jpg','vivian9668%20(5).jpg',
		'vivian9668%20(6).jpg','vivian9668%20(7).jpg','vivian9668%20(8).jpg','vivian9668%20(9).jpg','vivian9668%20(10).jpg','vivian9668%20(11).jpg',
                'vivian9668%20(12).jpg','vivian9668%20(13).jpg','vivian9668%20(14).jpg','vivian9668%20(15).jpg','vivian9668%20(16).jpg','vivian9668%20(17).jpg',
                'vivian9668%20(18).jpg','vivian9668%20(19).jpg','vivian9668%20(20).jpg','vivian9668%20(21).jpg','vivian9668%20(22).jpg','vivian9668%20(23).jpg',
                'vivian9668%20(24).jpg','vivian9668%20(25).jpg','vivian9668%20(26).jpg','vivian9668%20(27).jpg','vivian9668%20(28).jpg','vivian9668%20(29).jpg',
                'vivian9668%20(30).jpg','vivian9668%20(31).jpg','vivian9668%20(32).jpg','vivian9668%20(33).jpg','vivian9668%20(34).jpg'             
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

smileData.push([
	'小熊貓',
	'http://www.bjcg.com/i/e/2006/04/27/',
	[
		'012543562.gif','012544579.gif','012544630.gif','01254434.gif','012544347.gif','012544403.gif',
		'012544404.gif','012544600.gif'
        ]
]);

smileData.push([
	'蛋頭君',
	'http://a2233.myweb.hinet.net/msn/doudou/',
	[
		'doudou%20(1).gif','doudou%20(2).gif','doudou%20(3).gif','doudou%20(4).gif','doudou%20(5).gif',
		'doudou%20(6).gif','doudou%20(7).gif','doudou%20(8).gif','doudou%20(9).gif','doudou%20(10).gif','doudou%20(11).gif',
                'doudou%20(12).gif','doudou%20(13).gif','doudou%20(14).gif','doudou%20(15).gif','doudou%20(16).gif','doudou%20(17).gif',
                'doudou%20(18).gif','doudou%20(19).gif','doudou%20(20).gif','doudou%20(21).gif','doudou%20(22).gif','doudou%20(23).gif',
                'doudou%20(24).gif','doudou%20(25).gif','doudou%20(26).gif','doudou%20(27).gif','doudou%20(28).gif','doudou%20(29).gif',
                'doudou%20(30).gif','doudou%20(31).gif','doudou%20(32).gif'             
        ]
]);

smileData.push([
	'房租婆',
	'http://www.foxqq.com/biaoqing/fangzupo/',
	[
        '02C574F7A545DDB61DC24FDC55039151.gif','064AC2568812FB17DBBF7D66820BE248.gif','0FD92F30170E6FD9E1A3880B158BA757.gif','1134FCEBDFDF48AFEFE8F0C1F4FDCBF0.gif','1369800F011C638FB9215EC01E8ABBCF.gif','1734B44ADB7AF86BC0118A594F112BB9.gif','190DD7B5A77F1519D3FD0DD9D178E68F.gif','1B9D23C31702B3C6EEBA1DE6B53D8728.gif','20048C8145447F157058DC4C2120C5E3.gif','22639A0E8DDA60ED5442C11B5B9C426C.gif',
        '24299C604981D761983043DF7AAC7880.gif','2549606F8D1BAF9EBB863479577C9972.gif','2B9CE1DCCADE754D9F8B7EBDC8240368.gif','35B7B815428C82DE9A47D4249B21C938.gif','37118CA0F9EA1DE3E5B259B4323F1D68.gif','386DCB73C6CC9B29843C3A1BAEF11A9E.gif','39F2801151ED7C0CECB1EE642CBF2B24.gif','3F318A21B09BD57AF2F19785EDF6F8ED.gif','4113CA2EEC897B3CC72123475EB31EA5.gif','429DE2400BD755FEB9DF4BB400B30277.gif',
        '43842B9541640BC15D9AFC5AAB79A5C7.gif','45D9E39165A20D61969804B8ED4DADA9.gif','4BE3270C81D05D30493E26693614D249.gif','4C029DE7F16B43624E29CF854AFD4CEF.gif','4C60452EE9CE784DEBF14D90C5AAB0A2.gif','5557889DAEBB0AD3B96776F4592DE280.gif','55DC4331D369DC0221CA10DA05A3DB36.gif','570868984FEB79C1D6490BDE26D50CB0.gif','571AA93F651E8E89C47FAF065F3AE543.gif','574341F2C11ED548E93070886BFB15ED.gif',
        '5C4ACBCEE6B6E6D7FE7B47BB431601EC.gif','5E2AB0A7E179DF5AC6EA62EB6CE36AD9.gif','624DBFAEB55D6B3EDC675DBDDE203E6D.gif','62C5BB0508A6CDA7E7EF78FB36957505.gif','6799F106A9844D10AD34635B5E352681.gif','6925B2E1F072AFE5167CD5DB18FE2281.gif','6AE75CF899F6FEA89CF7F974D7D7C782.gif','72B1C3B8B14274BE1E170C1D730E52EF.gif','740A1C71B40133BDE47FAEA43279F45B.gif','76A70472D45152EC3F12FD80016064CB.gif',
        '777BE21C0F13E50339B0AF8B3D26037A.gif','779B91F6ED9579735C064E7ED1C6748C.gif','7850C2B5C6AF9FD4FFBF91AAAA2EB193.gif','79C41E9AC04FAC5AE2808E85430EDEB1.gif','7D6A1EE49C90C786214A76254D07F47F.gif','7DD7F9E8EE3EC0D7E1E3056FBE6F155C.gif','7F9668C236BD0A956CBF9E814B2DB93D.gif','812B698BA70AAEDA73E5FA6E6A416433.gif','81B6B2BE68848B8A0FBB84037C8642D5.gif','829BEE242CAE66D90D81BA77A835C66F.gif',
        '83B29AF5046B5D87CF2E7D54DEE78AD8.gif','83DA0B02B330ADF2A89A466EE1C6CD1D.gif','870BCCD9B0A33AE1533B128FEAF31B73.gif','8A08EB9FB1E7FAC6F4897963D0AEF92A.gif','8AA4696FB5407A1A05D7BD5057C5EE46.gif','8D5BC31E42E5038FD54E4627A9574D24.gif','8F185A4563A160741F519A2174FE587B.gif','9055A21B60622003CAFABF7EF06ABBB2.gif','9078F29E872AEEC2DD67D9C13D6EB093.gif','954DB2A5C1F2378982FA4ED811631205.gif',
        '97A5AE93A26ED1FB61B5A5F644C7E0B7.gif','97D413C375B86EB4B4A2579456D36940.gif','9AFE325062D5DE06B87D6CA37AD28BC8.gif','9D25D4B35330ECCB3773818DF35D5664.gif','9DCA26195A3D06602E77715B6625033F.gif','9E0EB4ACC4F728AEACEF3BFD0FE72AA2.gif','A465D64EB696DADA0EF0104EFDE9336B.gif','A4A498469347ED1B284B2C4FA8D1DC40.gif','A7722347072F8B79D44E81F2C7C629A2.gif','A7C60962D717AC663CF90A4665231588.gif',
        'ABA0C64D5F40E65417FF73AA496937DE.gif','ABD4F3037FE6B56FC2D2359285594C5C.gif','AC9163D2265297462CD19F4B529A2C8F.gif','AD311A15C67BD6A45CEA7B44A8EA373D.gif','B74C6C678B396696F0057834633AE3D4.gif','BA98D65A56863D2A61F11E1755513846.gif','BB5D0A52DE9F0076D1D236F7544862B1.gif','BCAC448E497117E446503209FA723543.gif','BCB3C3A3908FB729DB208BE3764D5AE3.gif','C0713851F30B3AE40E5886C97157C789.gif',
        'C084EB2C9783A7881357C0375CE112C8.gif','C230072AD1ECBD41BC56C64A9505A0E4.gif','C3C3E617089F6BB7A86A3EE53607834F.gif','C99F9BBEFE3808AC2F793257882EECE1.gif','CE6499B3EF940B2E062A6689A35C0982.gif','CF61D295F8BD7814940FC4D7E91BA777.gif','D2E8775E939020797D35A76C75D6CBD1.gif','D67005806D92E748431C35BCEE19EDEB.gif','D9B6D1318CB43D1255D39E0D9A2DB941.gif','DEFD3B77A1DBD762348E66B67B484D4C.gif',
        'DF5A078A9A938361374F12F915B24B37.gif','E04D3F8EBA6C94EF003524E3C702C5AA.gif','E0835B18313F18FB51362E98346EAEF2.gif','E3949FF4FA5E6661682F8B04A1524F48.gif','EE1BC528A47335136EE994F50DF5E100.gif','EF71A6428D336A247FCBACE9671D3FEF.gif','EF8A600AED1700BA13C4DE634E43A373.gif','F129CAA3668E8ADCEB78C67DF26DB392.gif','F15A7DCBB56390482D65B68704D71621.gif','F16B32BA108F096898727431EB81EEBF.gif',
        'F455B8185D4DC05845EC36D34AD418F0.gif','F6EB08A78C129061C43A53B48B67B830.gif','F9D9A8E398EF8C81254CE77D1A46EC22.gif','F9D9A8E398EF8C81254CE77D1A46EC22.gif','FA3C84BC0D00444C3B8BCC5831CCA264.gif','230EE64F629339A56E95B1602269DF6E.gif','5F3336D2395836F201EE2641E7A981D2.GIF','9781CCD3AC562558F47980E6057FFC36.gif','BADB90075D97DDF33D2C4A5A3F592BDA.gif','BD046D2BDA92FC384A9F272D3A3D2722.gif',
        'CA4585C1B1A690242B08CC2FEBFE26C0.gif','14CDAECEB2D5D99FC89DDC8D54EEEB9D.gif','166966AA475CD72726ED8FAB199E462C.gif','221EEAF57387DACD0866EA8180A1CCE7.gif','23731C8EC57BDDCB158BF21469F5F678.gif','6383ECCB598421E09E52E889E0C9240D.gif','66A778B2F25E00C4AD2EA596E1CAEE79.gif','8CD1D68DC86407F628D8F012A80AA5A6.gif','8E7481DFCC3E5D5841D83D43E914A3FA.gif','8FB1D4D5C6512BDDE1C34308F752EBEE.gif',
        '9788D5A7936C05D12586A735D03C92D6.gif','A4BC7A846ECC7DA92DFC7A10E044AC7A.gif','CF40D782D511C2526A05897CC41D3A70.gif','F62F83AA886B0B137A3F79C28923E5B5.gif'
	]
]);

smileData.push([
	'SANA',
	'http://lanshinetweb.myweb.hinet.net/msn/sana/',
	[
		'sana%20(0).gif','sana%20(1).gif','sana%20(2).gif','sana%20(3).gif','sana%20(4).gif','sana%20(5).gif',
		'sana%20(6).gif','sana%20(7).gif','sana%20(8).gif','sana%20(9).gif','sana%20(10).gif','sana%20(11).gif',
                'sana%20(12).gif','sana%20(13).gif','sana%20(14).gif','sana%20(15).gif','sana%20(16).jpg','sana%20(17).jpg',
                'sana%20(18).jpg','sana%20(19).jpg','sana%20(20).jpg','sana%20(21).jpg','sana%20(22).jpg','sana%20(23).jpg',
                'sana%20(24).jpg','sana%20(25).jpg','sana%20(26).jpg','sana%20(27).jpg','sana%20(28).jpg','sana%20(29).jpg',
                'sana%20(30).jpg','sana%20(31).jpg','sana%20(32).jpg','sana%20(33).jpg','sana%20(34).jpg','sana%20(35).jpg',
                'sana%20(36).jpg','sana%20(37).jpg','sana%20(38).jpg','sana%20(39).jpg','sana%20(40).jpg','sana%20(41).jpg',
                'sana%20(42).jpg','sana%20(43).jpg','sana%20(44).jpg','sana%20(45).jpg','sana%20(46).jpg','sana%20(47).jpg',
                'sana%20(48).jpg','sana%20(49).jpg','sana%20(50).jpg','sana%20(51).jpg','sana%20(52).jpg','sana%20(53).jpg',
                'sana%20(54).jpg','sana%20(55).jpg','sana%20(56).jpg','sana%20(57).jpg','sana%20(58).jpg','sana%20(59).jpg',
		'sana%20(60).jpg','sana%20(61).jpg','sana%20(62).jpg','sana%20(63).jpg','sana%20(64).jpg','sana%20(65).jpg',
                'sana%20(66).jpg','sana%20(67).jpg','sana%20(68).jpg','sana%20(69).jpg','sana%20(70).jpg','sana%20(71).jpg',
                'sana%20(72).jpg','sana%20(73).jpg','sana%20(74).jpg','sana%20(75).jpg','sana%20(76).jpg','sana%20(77).jpg',
                'sana%20(78).jpg','sana%20(79).jpg','sana%20(80).jpg','sana%20(81).jpg','sana%20(82).jpg','sana%20(83).jpg',
                'sana%20(84).jpg','sana%20(85).jpg','sana%20(86).jpg','sana%20(87).jpg','sana%20(88).jpg','sana%20(89).jpg',
                'sana%20(90).jpg','sana%20(91).jpg','sana%20(92).jpg','sana%20(93).jpg','sana%20(94).jpg','sana%20(95).jpg',
                'sana%20(96).jpg','sana%20(97).jpg','sana%20(98).jpg','sana%20(99).jpg','sana%20(100).jpg','sana%20(101).jpg',
                'sana%20(102).jpg','sana%20(103).jpg','sana%20(104).jpg','sana%20(105).jpg','sana%20(106).jpg','sana%20(107).jpg',
                'sana%20(108).jpg','sana%20(109).jpg','sana%20(110).jpg','sana%20(111).jpg','sana%20(112).jpg','sana%20(113).jpg',
                'sana%20(114).jpg','sana%20(115).jpg','sana%20(116).jpg','sana%20(117).jpg','sana%20(118).jpg','sana%20(119).jpg',
                'sana%20(120).jpg','sana%20(121).jpg','sana%20(122).jpg','sana%20(123).jpg','sana%20(124).jpg','sana%20(125).jpg',
                'sana%20(126).jpg','sana%20(127).jpg','sana%20(128).jpg','sana%20(129).jpg','sana%20(130).jpg','sana%20(131).jpg',
                'sana%20(132).jpg','sana%20(133).jpg'
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