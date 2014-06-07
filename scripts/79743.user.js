// ==UserScript==
// @name          Maximum Plurk Smileys for Google Chrome
// @include         http://www.plurk.com/*
// @include         http://www.plurk.com/p/*
// @include         http://*.plurk.com/*
// @include         http://*.plurk.com/p/*
// @description      反正就是一堆表情符號就是了！大家一起來測試Chrome的極限吧！XD
// @version         3.0
// @namespace      http://userscripts.org/scripts/show/79743
// @modified log    最新修改日期：2010/07/14。
// ==/UserScript==



// ********** Main Script ***********
var smileData = [];


smileData.push([
	'R米滷蛋',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/egg/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
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
	'131.gif','132.gif','133.gif','134.gif','135.gif','136.gif','137.gif','138.gif','139.gif',	
    ]
]);


smileData.push([
	'R戰鬥毛',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/fightman/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
	'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
	'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
	'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif',	
    ]
]);


smileData.push([
	'R卡馬攻頂',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/karma100/',
	[
	'smileydance.gif','muscle.gif','fish_hit.gif','coffee.gif','beer.gif','banana_ninja.gif',
	'taser.gif','muhaha.gif',	
    ]
]);


smileData.push([
	'R輔大猴',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/monkey/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
	'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
	'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
	'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
	'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
	'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',
	'61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif',
	'71.gif','72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif',
	'81.gif','82.gif','83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif',
	'91.gif','92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','99.gif','100.gif',
	'101.gif',	
    ]
]);


smileData.push([
	'R四小折',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/off60/',
	[
	'1ad339f9.gif','1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
	'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
	'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
	'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
	'41.gif','42.gif','43.gif','44.gif','45.gif',	
    ]
]);


smileData.push([
	'R洋蔥',
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
	'R洋蔥XD',
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
	'R兔斯基',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/rabbit/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
	'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
	'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
	'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
	'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
	'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',
	'61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif',
	'71.gif','72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif',
	'81.gif','82.gif','83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif',
	'91.gif','92.gif','93.gif',
    ]
]);


smileData.push([
	'R彎彎',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/wanwan/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
	'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
	'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
	'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
	'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
	'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',
	'61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif',
    ]
]);


smileData.push([
	'R彎彎2',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/xx/wan/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
	'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
	'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
	'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
	'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
	'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif',
    ]
]);




smileData.push([
	'R悠嘻猴',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/youxi/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
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
	'121.gif','122.gif','123.gif','124.gif',
    ]
]);


smileData.push([
	'R悠嘻猴XD',
	'http://s726.photobucket.com/albums/ww267/RachelLin28/youxi_xd/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
	'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
	'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
	'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
	'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
	'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',
	'61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif',
    ]
]);




smileData.push([
	'萬事屋',
	'http://s942.photobucket.com/albums/ad268/44ok88/G1/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif','42.gif','43.gif',
	]
]);


smileData.push([
	'真選攘夷',
	'http://s942.photobucket.com/albums/ad268/44ok88/G2/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif',
'40.gif',
]
]);



smileData.push([
	'銀魂綜合',
	'http://s942.photobucket.com/albums/ad268/44ok88/G3/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.jpg','19.jpg',
        '20.jpg','21.jpg','22.jpg','23.jpg','24.jpg','25.jpg','26.jpg','27.gif','28.gif',
        '29.gif','30.gif',
	]
]);


smileData.push([
	'彎彎', 
	'http://s942.photobucket.com/albums/ad268/44ok88/11/',
	[
		'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif',


        ]
]);



smileData.push([
	'兔包',
	'http://s942.photobucket.com/albums/ad268/44ok88/TB/',
	[
'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif',


        ]
]);





smileData.push([
	'洋蔥頭',
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
	'糖果娃',
	'http://s942.photobucket.com/albums/ad268/44ok88/CD/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',

'20.gif','21.gif',

        ]
]);



smileData.push([
	'悠嘻猴',
	'http://s942.photobucket.com/albums/ad268/44ok88/MK/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
	]
]);






smileData.push([
	'APH',
	'http://s942.photobucket.com/albums/ad268/44ok88/AP/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',

'20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif','31.gif',

        ]
]);





smileData.push([
	'四小折',
	'http://s942.photobucket.com/albums/ad268/44ok88/4S/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif',


        ]
]);




smileData.push([
	'米滷蛋',
	'http://i854.photobucket.com/albums/ab108/vvveeexxx/Egg/',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
	'011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',
	'021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',
	'031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',
	'041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif',
	'051.gif','052.gif','053.gif','054.gif','055.gif','056.gif','057.gif','058.gif','059.gif','060.gif',
	'061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif','069.gif','070.gif',
	'071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif','078.gif','079.gif','080.gif',
	'081.gif','082.gif','083.gif','084.gif','085.gif','086.gif','087.gif','088.gif','089.gif','090.gif',
	'091.gif','092.gif','093.gif','094.gif','095.gif','096.gif','097.gif','098.gif','099.gif','100.gif',
	'101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif',
	'111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif','120.gif',
	'121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif','128.gif','129.gif','130.gif',
	'131.gif','132.gif','133.gif','134.gif','135.gif','136.gif','137.gif','138.gif','139.gif','140.gif',
	'141.gif','142.gif','143.gif','144.gif','145.gif','146.gif','147.gif','148.gif','149.gif','150.gif',
	'151.gif','152.gif','153.gif','154.gif','155.gif','156.gif','157.gif','158.gif','159.gif','160.gif',
	'161.gif','162.gif','163.gif','164.gif','165.gif'
    ]
]);






smileData.push([
	'兔斯基',
	'http://s942.photobucket.com/albums/ad268/44ok88/TS/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif',


        
        ]
]);






smileData.push([
	'日和',
	'http://s942.photobucket.com/albums/ad268/44ok88/GM/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif',


        ]
]);




smileData.push([
	'荒川',
	'http://s942.photobucket.com/albums/ad268/44ok88/UB/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif',
	]
]);







smileData.push([
	'DRRR',
	'http://s942.photobucket.com/albums/ad268/44ok88/DR/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.jpg','7.jpg','8.jpg','9.gif','10.gif',

        '11.jpg','12.jpg','13.jpg','14.jpg','15.jpg','16.jpg','17.jpg','18.jpg','19.jpg','20.jpg',
	]
]);


smileData.push([
	'王牌投手',
	'http://s942.photobucket.com/albums/ad268/44ok88/D2/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif',
	]
]);


smileData.push([
	'女僕',
	'http://s942.photobucket.com/albums/ad268/44ok88/MD/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif',
	]
]);



smileData.push([
	'綜合',
	'http://s942.photobucket.com/albums/ad268/44ok88/TT/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif','31.gif',
	]
]);





smileData.push([
	'動態字',
	'http://s942.photobucket.com/albums/ad268/44ok88/WD/',
	[
'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif',


        ]
]);






smileData.push([
	'呆熊',
	'http://s466.photobucket.com/albums/rr23/billypan101/bernardbear/',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif','059.gif','060.gif'
        ]
]);

smileData.push([
	'洋蔥',
	'http://i466.photobucket.com/albums/rr23/billypan101/onion/',
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
        '101.gif','102.gif','103.gif','104.gif','105.gif',  '106.gif','107.gif','108.gif',
	]
]);

smileData.push([
	'惡搞',
	'http://i466.photobucket.com/albums/rr23/billypan101/kuso-new/',
	[
        '058.gif','051.gif','001.gif','002.gif','003.gif','004.gif','005.gif',  '006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif',  '016.gif','017.gif','018.gif','019.gif','020.gif',
        '021.gif','022.gif','023.gif','024.gif','025.gif',  '026.gif','027.gif','028.gif','029.gif','030.gif',
        '031.gif','032.gif','033.gif','034.gif','035.gif',  '036.gif','037.gif','038.gif','039.gif','040.gif',
        '041.gif','042.gif','043.gif','044.gif','045.gif',  '046.gif','047.gif','048.gif','049.gif',
        '050.gif','052.gif','053.gif','054.gif','055.gif',  '056.gif','057.gif','059.gif','060.gif',
        '061.gif','062.gif','063.gif','064.gif','065.gif',  '066.gif','067.gif','068.gif','069.gif','070.gif',
        '071.gif','072.gif','073.gif','074.gif','075.gif',  '076.gif','077.gif','078.gif','079.gif','080.gif',
        '081.gif','082.gif','083.gif','084.gif','085.gif',  '086.gif','087.gif','088.gif','089.gif','090.gif',
        '092.gif','093.gif','094.gif','095.gif',  '096.gif','097.gif','098.gif','099.gif','100.gif',
        '101.gif','102.gif','103.gif','104.gif','105.gif',  '106.gif','107.gif','108.gif','109.gif','110.gif',
        '111.gif','112.gif','113.gif','114.gif','115.gif',  '116.gif','117.gif','118.gif','119.gif','120.gif',
        '121.gif','122.gif','123.gif','124.gif','125.gif',  '126.gif','127.gif','128.gif','129.gif','130.gif',
        '131.gif',
	]
]);

smileData.push([
	'芋頭',
	'http://i466.photobucket.com/albums/rr23/billypan101/yts/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif',  '006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif',  '016.gif','017.gif','018.gif','019.gif','020.gif',
        '021.gif','022.gif','023.gif','024.gif','025.gif',  '026.gif','027.gif','028.gif','029.gif','030.gif',
        '031.gif','032.gif','033.gif','034.gif','035.gif',  '036.gif','037.gif','038.gif','039.gif','040.gif',
        '041.gif','042.gif','043.gif',
	]
]);


smileData.push([
	'柑仔',
	'http://s.blog.xuite.net/_image/emotion/hastart/',
	[
	'm1.gif','m2.gif','m3.gif','m4.gif','m5.gif','m6.gif','m7.gif','m8.gif','m9.gif','m10.gif',
        'm11.gif','m12.gif','m13.gif','m14.gif','m15.gif','m16.gif','m17.gif','m18.gif','m19.gif',
        'm20.gif','m21.gif','m22.gif','m23.gif','m24.gif','m25.gif','m26.gif','m27.gif','m28.gif',
        'm29.gif','m30.gif','m31.gif','m32.gif','m33.gif','m34.gif','m35.gif','m36.gif','m37.gif',
        'm38.gif','m39.gif','m40.gif','m41.gif','m42.gif','m43.gif','m44.gif','m45.gif','m46.gif',
        'm47.gif','m48.gif','m49.gif','m50.gif','m51.gif','m52.gif','m53.gif','m54.gif','m55.gif',
        'm56.gif','m57.gif','m58.gif','m59.gif','m60.gif','m61.gif','m62.gif','m63.gif','m64.gif',
        'm65.gif','m66.gif','m67.gif','m68.gif','m69.gif','m70.gif','m71.gif','m72.gif','m73.gif',
        'm74.gif','m75.gif','m76.gif','m77.gif','m78.gif','m79.gif','m80.gif','m81.gif','m82.gif',
        'm83.gif','m84.gif','m85.gif','m86.gif','m87.gif','m88.gif','m89.gif','m90.gif',
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
	'波蘿',
	'http://s466.photobucket.com/albums/rr23/billypan101/pl/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif','059.gif','060.gif','061.gif','062.gif','063.gif','064.gif',
        '065.gif','066.gif','067.gif','068.gif','069.gif','070.gif','071.gif','072.gif','073.gif',
        '074.gif','075.gif','076.gif','077.gif','078.gif','079.gif','080.gif','081.gif','082.gif',
        '083.gif','084.gif','085.gif','086.gif','087.gif','088.gif','089.gif','090.gif','091.gif',
        '092.gif','093.gif','094.gif','095.gif','096.gif','097.gif','098.gif','099.gif','100.gif',
        '101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif',
        '110.gif','111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif',
        '119.gif','120.gif','121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif',
        '128.gif','129.gif','130.gif','131.gif','132.gif','133.gif','134.gif','135.gif','136.gif',
        '137.gif',
	]
]);


smileData.push([
	'布咕',
	'http://s466.photobucket.com/albums/rr23/billypan101/bg-chicken/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif','059.gif','060.gif','061.gif','062.gif','063.gif','064.gif',
        '065.gif','066.gif','067.gif','068.gif','069.gif','070.gif','071.gif','072.gif','073.gif',
        '074.gif','075.gif','076.gif','077.gif','078.gif','079.gif','080.gif','081.gif','082.gif',
        '083.gif','084.gif','085.gif','086.gif','087.gif','088.gif','089.gif','090.gif','091.gif',
        '092.gif','093.gif','094.gif','095.gif','096.gif','097.gif','098.gif','099.gif',
	]
]);

smileData.push([
	'長仔',
	'http://s466.photobucket.com/albums/rr23/billypan101/frank/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','016.gif',
	]
]);

smileData.push([
	'小英',
	'http://s466.photobucket.com/albums/rr23/billypan101/tsai/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','tn.gif',
        ]
]);

smileData.push([
	'潮語',
	'http://s466.photobucket.com/albums/rr23/billypan101/hk/',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif',
        ]
]);

smileData.push([
	'爭鮮',
	'http://s466.photobucket.com/albums/rr23/billypan101/susi/',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif','059.gif','060.gif','061.gif','062.gif','063.gif','064.gif',
        '065.gif','066.gif','067.gif','068.gif','069.gif',
        ]
]);

smileData.push([
	'Kitty',
	'http://s466.photobucket.com/albums/rr23/billypan101/kitty/',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif',
        ]
]);

smileData.push([
	'海賊王',
	'http://s466.photobucket.com/albums/rr23/billypan101/sea/',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif',
        ]
]);

smileData.push([
	'Q-mo',
	'http://s466.photobucket.com/albums/rr23/billypan101/q-mo/',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif',
        ]
]);

smileData.push([
	'奶茶',
	'http://s466.photobucket.com/albums/rr23/billypan101/milktea/',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif','059.gif','060.gif','061.gif','062.gif','063.gif','064.gif',
        '065.gif','066.gif','067.gif',
        ]
]);

smileData.push([
	'虎斑',
	'http://s466.photobucket.com/albums/rr23/billypan101/tcat/',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif',
        ]
]);

smileData.push([
	'黑貓',
	'http://s466.photobucket.com/albums/rr23/billypan101/bcat/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif',
        ]
]);

smileData.push([
	'光頭',
	'http://i466.photobucket.com/albums/rr23/billypan101/ball/',
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
        '101.gif','102.gif','103.gif',
	]
]);

smileData.push([
	'WZ熊',
	'http://s466.photobucket.com/albums/rr23/billypan101/wz bear/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif','059.gif','060.gif','061.gif','062.gif'
	]
]);

smileData.push([
	'87熊',
	'http://s466.photobucket.com/albums/rr23/billypan101/bzs/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif','059.gif','060.gif','061.gif','062.gif','063.gif','064.gif',
        '065.gif','066.gif','067.gif','068.gif','069.gif','070.gif','071.gif','072.gif','073.gif',
        '074.gif','075.gif','076.gif','077.gif','078.gif','079.gif','080.gif','081.gif','082.gif',
        '083.gif','084.gif','085.gif','086.gif','087.gif','088.gif','089.gif','090.gif','091.gif',
        '092.gif','093.gif','094.gif','095.gif','096.gif','097.gif','098.gif','099.gif','100.gif',
        '101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif',
        '110.gif','111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif',
        '119.gif','120.gif','121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif',
        '128.gif','129.gif','130.gif','131.gif','132.gif','133.gif','134.gif','135.gif','136.gif',
        '137.gif','138.gif','139.gif','140.gif',
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
	'http://s466.photobucket.com/albums/rr23/billypan101/ludan/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif',
        '38.gif','39.gif','40.gif','41.gif','42.gif','43.gif','44.gif','45.gif','46.gif',
        '47.gif','48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif',
        '56.gif','57.gif','58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif',
        '65.gif','66.gif','67.gif','68.gif','69.gif','70.gif','71.gif','72.gif','73.gif',
        '74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif','81.gif','82.gif',
        '83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif','91.gif',
        '92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','99.gif','100.gif',
        '101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif',
        '110.gif','111.gif','112.gif','113.gif','114.gif',
	]
]);

smileData.push([
	'企鵝',
	'http://s466.photobucket.com/albums/rr23/billypan101/penguin/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif',
	]
]);

smileData.push([
	'豬頭',
	'http://s466.photobucket.com/albums/rr23/billypan101/pig/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif',
	]
]);

smileData.push([
	'字1',
	'http://s466.photobucket.com/albums/rr23/billypan101/pan2/',
	[
		'tba.gif','mj1.gif','mj2.gif','mj3.gif','1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','13.gif','14.gif','15.gif',
		'16.gif','17.gif','18.gif','19.gif','20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif',
		'30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif','42.gif','43.gif',
		'44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif','th2.gif','th3.gif',
		
	]
]);

smileData.push([
	'字2',
	'http://s466.photobucket.com/albums/rr23/billypan101/word2/',
	[
		'tba.gif','65.gif','1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','14.gif','15.gif',
		'16.gif','17.gif','18.gif','19.gif','20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif',
		'30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif','42.gif','43.gif',
		'44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif',
		'58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif','66.gif',
		
	]
]);

smileData.push([
	'痞克狐',
	'http://s466.photobucket.com/albums/rr23/billypan101/pixfox/',
	[
		'tba-logo.gif','b01.gif','b02.gif','b03.gif','b04.gif','b05.gif','b06.gif','b07.gif','b08.gif','b09.gif',
        'b10.gif','b11.gif','b12.gif','b13.gif','b14.gif','b15.gif','b16.gif',
        ]
]);




smileData.push([
	'炮兵',
	'http://s466.photobucket.com/albums/rr23/billypan101/soldier-v3/',
	[
	'2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif',
        '38.gif','39.gif','40.gif','41.gif','42.gif','43.gif','44.gif','45.gif','46.gif',
        '47.gif','48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif',
        '56.gif','57.gif','58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif',
        '65.gif','66.gif','67.gif','68.gif','69.gif','70.gif','71.gif','72.gif','73.gif',
        '74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif','81.gif','82.gif',
        '83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif','91.gif',
        '92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','99.gif','100.gif',
        '101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif',
        '110.gif','111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif',
        '119.gif','120.gif','121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif',
        '128.gif',
        ]
]);

smileData.push([
	'星爺',
	'http://s466.photobucket.com/albums/rr23/billypan101/star/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.jpg',
        '11.gif',
        ]
]);

smileData.push([
	'兔斯基',
	'http://s466.photobucket.com/albums/rr23/billypan101/rabbit/',
	[
	'01.gif','02.gif','03.gif','04.gif','05.gif','06.gif','07.gif','08.gif','09.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif',
        '38.gif','39.gif','40.gif','41.gif','42.gif','43.gif','44.gif','45.gif','46.gif',
        '47.gif','48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif',
        '56.gif','57.gif','58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif',
        '65.gif','66.gif','67.gif','68.gif','69.gif','70.gif','71.gif','72.gif','73.gif',
        
        ]
]);

smileData.push([
	'兔斯+',
	'http://s466.photobucket.com/albums/rr23/billypan101/rabbit-kai/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif','31.gif','32.gif','33.gif',
        ]
]);

smileData.push([
	'MSN',
	'http://www.addemoticons.com/emoticon/animated/',
	[
	'AddEmoticons0421.gif','AddEmoticons0422.gif','AddEmoticons0423.gif','AddEmoticons0424.gif','AddEmoticons0425.gif',
	'AddEmoticons0426.gif','AddEmoticons0427.gif','AddEmoticons0428.gif','AddEmoticons0429.gif','AddEmoticons04210.gif',
	'AddEmoticons04211.gif','AddEmoticons04212.gif','AddEmoticons04213.gif','AddEmoticons04214.gif','AddEmoticons04215.gif',
	'AddEmoticons04216.gif','AddEmoticons04217.gif','AddEmoticons04218.gif','AddEmoticons04219.gif','AddEmoticons04220.gif',
	'AddEmoticons04221.gif','AddEmoticons04222.gif','AddEmoticons04223.gif','AddEmoticons04224.gif','AddEmoticons04225.gif',
	'AddEmoticons04226.gif','AddEmoticons04227.gif','AddEmoticons04228.gif','AddEmoticons04229.gif','AddEmoticons04230.gif',
	'AddEmoticons04231.gif','AddEmoticons04232.gif','AddEmoticons04233.gif','AddEmoticons04234.gif','AddEmoticons04235.gif',
	'AddEmoticons04236.gif','AddEmoticons04237.gif','AddEmoticons04238.gif','AddEmoticons04239.gif','AddEmoticons04240.gif',
	'AddEmoticons04241.gif','AddEmoticons04242.gif','AddEmoticons04243.gif','AddEmoticons04244.gif','AddEmoticons04245.gif',
	'AddEmoticons04246.gif','AddEmoticons04247.gif','AddEmoticons04248.gif','AddEmoticons04249.gif','AddEmoticons04250.gif',
	'AddEmoticons04251.gif','AddEmoticons04252.gif','AddEmoticons04253.gif','AddEmoticons04254.gif','AddEmoticons04255.gif',
	'AddEmoticons04256.gif','AddEmoticons04257.gif','AddEmoticons04258.gif','AddEmoticons04259.gif','AddEmoticons04260.gif',
	'AddEmoticons04261.gif','AddEmoticons04262.gif','AddEmoticons04263.gif','AddEmoticons04264.gif','AddEmoticons04265.gif',
	'AddEmoticons04266.gif','AddEmoticons04267.gif','AddEmoticons04268.gif','AddEmoticons04269.gif','AddEmoticons04270.gif',
	'AddEmoticons04271.gif','AddEmoticons04272.gif','AddEmoticons04273.gif','AddEmoticons04274.gif','AddEmoticons04275.gif',
	'AddEmoticons04276.gif','AddEmoticons04277.gif','AddEmoticons04278.gif','AddEmoticons04279.gif','AddEmoticons04280.gif',
	'AddEmoticons04281.gif','AddEmoticons04282.gif','AddEmoticons04283.gif','AddEmoticons04284.gif','AddEmoticons04285.gif',
	'AddEmoticons04286.gif','AddEmoticons04287.gif'
	]
]);

smileData.push([
	'君雅',
	'http://kevin357.myweb.hinet.net/2009/a01/',
	[
		'a0101.gif','a0102.gif','a0103.gif','a0104.gif','a0105.gif','a0106.gif',
		'a0107.gif','a0108.gif','a0109.gif','a0110.gif','a0111.gif','a0112.gif',
	        'a0113.gif','a0114.gif','a0115.gif','a0116.gif','a0117.gif','a0118.gif',
                'a0119.gif','a0120.gif','a0121.gif'
        ]
]);


smileData.push([
	'藍蕉',
	'http://s466.photobucket.com/albums/rr23/billypan101/blueb/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif',
        ]
]);



smileData.push([
	'鼻涕',
	'http://s466.photobucket.com/albums/rr23/billypan101/nose/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif',
        ]
]);


smileData.push([
	'笑貓',
	'http://s466.photobucket.com/albums/rr23/billypan101/scat/',
	[
	'1.gif','2.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif',
 ]
]);


smileData.push([
	'綠蛙',
	'http://itsgod.myweb.hinet.net/images/frog/',
	[
		'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','023.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif'
	]
]);





smileData.push([
	'SANA',
	'http://lanshinetweb.myweb.hinet.net/msn/sana/',
	[
		'sana%20(16).jpg','sana%20(17).jpg',
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
                'sana%20(78).jpg','sana%20(79).jpg','sana%20(121).jpg','sana%20(122).jpg','sana%20(123).jpg','sana%20(124).jpg','sana%20(125).jpg',
                'sana%20(126).jpg','sana%20(127).jpg','sana%20(128).jpg','sana%20(129).jpg','sana%20(130).jpg','sana%20(131).jpg',
                'sana%20(132).jpg','sana%20(133).jpg'
        ]
]);




smileData.push([
	'漫畫家',
	'http://s466.photobucket.com/albums/rr23/billypan101/comic/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif','31.gif',
	]
]);



smileData.push([
	'軍曹',
	'http://s466.photobucket.com/albums/rr23/billypan101/keroro/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','last.gif','10.gif',
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
		'051.gif','052.gif','053.gif','054.gif',
	]
]);

smileData.push([
	'圓臉',
	'http://s466.photobucket.com/albums/rr23/billypan101/rface/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif',
        '38.gif','39.gif','40.gif','41.gif','42.gif','43.gif','44.gif','45.gif','46.gif',
        '47.gif','48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif',
        '56.gif','57.gif','58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif',
        '65.gif','66.gif','67.gif','68.gif','69.gif','70.gif','71.gif','72.gif','73.gif',
        '74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif','81.gif','82.gif',
        '83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif','91.gif',
        '92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','99.gif','100.gif',
        '101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif',
        '110.gif','111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif',
        '119.gif','120.gif','121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif',
        '128.gif','129.gif','130.gif','131.gif','132.gif','133.gif','134.gif','135.gif','136.gif',
        '137.gif','138.gif','139.gif','140.gif','141.gif','142.gif','143.gif','144.gif','145.gif',
        '146.gif','147.gif','148.gif','149.gif','150.gif','151.gif','152.gif','153.gif','154.gif',
        '155.gif','156.gif','157.gif','158.gif','159.gif','160.gif','161.gif','162.gif','163.gif',
        '164.gif','165.gif','166.gif','167.gif','168.gif','169.gif','170.gif','171.gif','172.gif',
        '173.gif','174.gif','175.gif','176.gif','177.gif','178.gif','179.gif','180.gif','181.gif',
        '182.gif','183.gif','184.gif','185.gif','186.gif','187.gif','188.gif','189.gif','190.gif',
        '191.gif','192.gif','193.gif','194.gif','195.gif','196.gif','197.gif','198.gif','199.gif',
        '200.gif','201.gif','202.gif','203.gif','204.gif','205.gif','206.gif','207.gif','208.gif',
        '209.gif','210.gif','211.gif','212.gif','213.gif','214.gif','215.gif','216.gif','217.gif',
        '218.gif','219.gif','220.gif','221.gif','222.gif',
	]
]);

smileData.push([
	'水滴',
	'http://s466.photobucket.com/albums/rr23/billypan101/drop/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif',
        '38.gif','39.gif','40.gif','41.gif','42.gif','43.gif','44.gif','45.gif','46.gif',
        '47.gif','48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif',
        '56.gif','57.gif','58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif',
        '65.gif','66.gif','67.gif','68.gif','69.gif','70.gif','71.gif','72.gif','73.gif',
        '74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif','81.gif','82.gif',
        '83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif','91.gif',
        '92.gif','93.gif','94.gif','95.gif','96.gif',
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
	'乳牛',
	'http://i466.photobucket.com/albums/rr23/billypan101/cow/',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',
        '021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',
        '031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',
        
        ]
]);


smileData.push([
	'蛋頭',
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
	'貞子',
	'http://s466.photobucket.com/albums/rr23/billypan101/GG/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif',
        ]
]);




smileData.push([
	'白貓',
	'http://s466.photobucket.com/albums/rr23/billypan101/wcat/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif',
        ]
]);

smileData.push([
        '新蔥1',
        'http://i466.photobucket.com/albums/rr23/billypan101/onion1/',
        [
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',
        '021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',
        '031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','039.gif','040.gif',
        '041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif',
        '051.gif','052.gif','053.gif','054.gif','055.gif','056.gif','057.gif','058.gif','059.gif','060.gif',
        '061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif','069.gif','070.gif',
        '071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif','078.gif','079.gif','080.gif',
        '081.gif','082.gif','083.gif','084.gif','085.gif','086.gif','087.gif','088.gif','089.gif','090.gif',
        '091.gif','092.gif','093.gif','094.gif','095.gif','096.gif','098.gif','099.gif','100.gif',
        '101.gif','102.gif','103.gif','104.gif','105.gif','106.gif',
        ]
]);

smileData.push([
        '新蔥2',
        'http://i466.photobucket.com/albums/rr23/billypan101/onion2/',
        [
        '107.gif','108.gif','109.gif','110.gif','111.gif','112.gif','113.gif','114.gif','115.gif','116.gif',
        '117.gif','118.gif','119.gif','120.gif','121.gif','122.gif','123.gif','124.gif','125.gif','126.gif',
        '127.gif','128.gif','129.gif','130.gif','131.gif','132.gif','133.gif','134.gif','135.gif','136.gif',
        '137.gif','138.gif','139.gif','140.gif','141.gif','143.gif','144.gif','145.gif','146.gif',
        '147.gif','149.gif','150.gif','151.gif','152.gif','154.gif','155.gif','156.gif',
        '157.gif','159.gif','160.gif','161.gif','162.gif','164.gif','165.gif','166.gif',
        '167.gif','168.gif','169.gif','170.gif','171.gif','172.gif','173.gif','174.gif','175.gif','176.gif',
        '177.gif','178.gif','179.gif','180.gif','181.gif','182.gif','183.gif','184.gif','185.gif','186.gif',
        '187.gif','188.gif','189.gif','190.gif','191.gif','192.gif','193.gif','194.gif','195.gif','196.gif',
        '197.gif','198.gif','199.gif','200.gif','201.gif','202.gif','203.gif','204.gif','205.gif','206.gif',
        '207.gif','208.gif','209.gif',
        ]
]);



smileData.push([
	'方塊',
	'http://itsgod.myweb.hinet.net/images/pc/',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif','059.gif','060.gif','106.gif','107.gif',
        '061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif','069.gif',
        '070.gif','071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif','078.gif',
        '079.gif','080.gif','081.gif','082.gif','083.gif','084.gif','085.gif','086.gif','087.gif',
        '088.gif','089.gif','090.gif','091.gif','092.gif','093.gif','094.gif','095.gif','096.gif',
        '097.gif','098.gif','099.gif','100.gif','101.gif','102.gif','103.gif','104.gif','105.gif',
	]
]);


smileData.push([
	'好神',
	'http://s466.photobucket.com/albums/rr23/billypan101/fgod/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif',
	]
]);


smileData.push([
	'紅便',
	'http://s466.photobucket.com/albums/rr23/billypan101/red-s/',
	[
        '01.gif','02.gif','03.gif','04.gif','05.gif','06.gif','07.gif','08.gif','09.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif',
	]
]);


smileData.push([
	'賤客',
	'http://s466.photobucket.com/albums/rr23/billypan101/zk35/',
	[
		'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','13.gif','14.gif','15.gif',
		'16.gif','17.gif','18.gif','19.gif','20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif',
		'30.gif','33.gif','37.gif','38.gif','39.gif','40.gif',
		
	]
]);



smileData.push([
	'四小折',
	'http://s466.photobucket.com/albums/rr23/billypan101/4-small/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif',
        '38.gif','39.gif','40.gif','41.gif','42.gif','43.gif','44.gif','45.gif','46.gif',
        '47.gif','48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif',
        '56.gif','57.gif','58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif',
        '65.gif','66.gif','67.gif','68.gif','70.gif','71.gif','72.gif','73.gif',
        '74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif','81.gif','82.gif',
        '83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif','91.gif',
        '92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','99.gif','100.gif',
        '101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif',
        '110.gif','111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif',
        '119.gif','120.gif','121.gif','122.gif','123.gif','124.gif',
	]
]);


smileData.push([
	'白熊',
	'http://s466.photobucket.com/albums/rr23/billypan101/whitebear/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif',
        '020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif',
        '038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif','046.gif',
        '047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','058.gif','059.gif','060.gif','061.gif','062.gif','063.gif','064.gif',
        '065.gif','066.gif','067.gif','068.gif','069.gif','070.gif','071.gif','072.gif','073.gif',
        '074.gif','075.gif','076.gif','077.gif','078.gif','079.gif','080.gif','081.gif','082.gif',
        '083.gif','084.gif','085.gif','086.gif','087.gif','088.gif','089.gif','090.gif','091.gif',
        '092.gif','093.gif','094.gif','095.gif','096.gif','097.gif','098.gif','099.gif','100.gif',
        '101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif',
        '110.gif','111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif',
        '119.gif','120.gif','121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif',
        '128.gif','129.gif','130.gif','131.gif','132.gif','133.gif','134.gif','135.gif','136.gif',
        '137.gif','138.gif','139.gif','140.gif','141.gif','142.gif','143.gif','144.gif','145.gif','146.gif',
        '147.gif','148.gif','149.gif','150.gif','151.gif','152.gif','153.gif','154.gif','155.gif',
	]
]);


smileData.push([
        '小新',
        'http://shiehcho22.myweb.hinet.net/msn/shin/shin',
        [
        ' (0).gif',' (1).gif',' (2).gif',' (3).gif',' (4).gif',' (5).gif',' (6).gif',' (7).gif',

        ' (8).gif',' (9).gif',' (10).gif',' (11).gif',' (12).gif',' (13).gif',' (14).gif',' (15).gif',

        ' (16).gif',' (17).gif',' (18).gif',' (19).gif',' (20).gif',' (21).gif',' (22).gif',' (23).gif',

        ' (24).gif',' (25).gif',' (26).gif',' (27).gif',' (28).gif',' (29).gif',' (30).gif',' (31).gif',

        ' (32).gif',' (33).gif',' (34).gif',' (35).gif',' (36).gif',' (37).gif',' (38).gif',' (39).gif',

        ' (40).gif',' (41).gif',' (42).gif',' (43).gif',' (44).gif',' (45).gif',' (46).gif',' (47).gif',

        ' (48).gif',' (49).gif',' (50).gif',' (51).gif',' (52).gif',' (53).gif',' (54).gif',' (55).gif',

        ' (56).gif',' (57).gif',' (58).gif',' (59).gif',' (60).gif',' (61).gif',' (62).gif',' (63).gif',

        ' (64).gif',' (65).gif',' (66).gif',' (67).gif',' (68).gif',' (69).gif',' (70).gif',' (71).gif',

        ' (72).gif',' (73).gif',' (74).gif',' (75).gif',' (76).gif',' (77).gif',
        ]
]);


smileData.push([
	'瘋狂香蕉人',
	'http://a5556.myweb.hinet.net/msn/crazyfruit/',
	[
	'cf (0).gif','cf (1).gif','cf (2).gif','cf (3).gif','cf (4).gif','cf (5).gif','cf (6).gif','cf (7).gif','cf (8).gif','cf (9).gif',
	'cf (10).gif','cf (11).gif','cf (12).gif','cf (13).gif','cf (14).gif','cf (15).gif','cf (16).gif','cf (17).gif','cf (18).gif','cf (19).gif',
	'cf (20).gif','cf (21).gif','cf (22).gif','cf (23).gif','cf (24).gif','cf (25).gif','cf (26).gif','cf (27).gif','cf (28).gif','cf (29).gif',
	'cf (30).gif','cf (31).gif','cf (32).gif','cf (33).gif','cf (34).gif','cf (35).gif','cf (36).gif','cf (37).gif','cf (38).gif','cf (39).gif',
	'cf (40).gif','cf (41).gif','cf (42).gif','cf (43).gif','cf (44).gif','cf (45).gif','cf (46).gif','cf (47).gif','cf (48).gif','cf (49).gif',
	'cf (50).gif','cf (51).gif','cf (52).gif','cf (53).gif','cf (54).gif','cf (55).gif','cf (56).gif','cf (57).gif','cf (58).gif','cf (59).gif',
	'cf (60).gif','cf (61).gif','cf (62).gif','cf (63).gif','cf (64).gif','cf (65).gif','cf (66).gif','cf (67).gif','cf (68).gif','cf (69).gif',
	'cf (70).gif','cf (71).gif','cf (72).gif','cf (73).gif','cf (74).gif','cf (75).gif','cf (76).gif','cf (77).gif','cf (78).gif','cf (79).gif',
	'cf (80).gif','cf (81).gif','cf (82).gif','cf (83).gif','cf (84).gif','cf (85).gif','cf (86).gif','cf (87).gif','cf (88).gif','cf (89).gif',
	'cf (90).gif','cf (91).gif','cf (92).gif','cf (93).gif','cf (94).gif','cf (95).gif','cf (96).gif','cf (97).gif','cf (98).gif','cf (99).gif',
	'cf (100).gif','cf (101).gif','cf (102).gif','cf (103).gif','cf (104).gif','cf (105).gif','cf (106).gif','cf (107).gif','cf (108).gif','cf (109).gif',
	'cf (110).gif','cf (111).gif','cf (112).gif','cf (113).gif','cf (114).gif','cf (115).gif','cf (116).gif','cf (117).gif','cf (118).gif','cf (119).gif',
	'cf (120).gif','cf (121).gif','cf (122).gif','cf (123).gif','cf (124).gif','cf (125).gif','cf (126).gif','cf (127).gif','cf (128).gif','cf (129).gif',
	'cf (130).gif','cf (131).gif','cf (132).gif','cf (133).gif','cf (134).gif','cf (135).gif','cf (136).gif','cf (137).gif','cf (138).gif','cf (139).gif',
	'cf (140).gif','cf (141).gif','cf (142).gif','cf (143).gif','cf (144).gif','cf (145).gif','cf (146).gif','cf (147).gif','cf (148).gif','cf (149).gif',
	'cf (150).gif','cf (151).gif','cf (152).gif','cf (153).gif','cf (154).gif','cf (155).gif','cf (156).gif','cf (157).gif','cf (158).gif','cf (159).gif',
	'cf (160).gif','cf (161).gif','cf (162).gif','cf (163).gif','cf (164).gif','cf (165).gif','cf (166).gif','cf (167).gif','cf (168).gif','cf (169).gif',
	'cf (170).gif','cf (171).gif','cf (172).gif','cf (173).gif','cf (174).gif','cf (175).gif','cf (176).gif','cf (177).gif','cf (178).gif','cf (179).gif',
	'cf (180).gif','cf (181).gif','cf (182).gif','cf (183).gif','cf (184).gif','cf (185).gif','cf (186).gif','cf (187).gif','cf (188).gif','cf (189).gif',
	'cf (190).gif','cf (191).gif','cf (192).gif','cf (193).gif','cf (194).gif','cf (195).gif'
    ]
]);


smileData.push([
	'雜項',
	'http://www.freesmileys.org/emoticons/emoticon-char-',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',
	'021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',
	'031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',
	'041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif',
	'051.gif','052.gif','053.gif','054.gif'
	]
]);


smileData.push([
	'熊與火雞',
	'http://plurksmile.googlecode.com/svn/trunk/images/b_t/',
	[
		'01.gif','02.gif','03.gif','04.gif','05.gif','06.gif','07.gif','08.gif','09.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
        '21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
        '31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
        '41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
        '51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',
        '61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif',
        '71.gif','72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif',
        '81.gif','82.gif','83.gif','84.gif','85.gif'
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
	'旺旺狗',
	'http://www.foxqq.com/biaoqing/wangwang/',
	[
		'0D9CD8715D9AF3897EEB0AC2974CA605.GIF','0F93E004B4E74AE0409D15BF16E5C95A.GIF','1356C0C7F0454521EBD6998785B15BCC.gif','18084E5325CF5BC70C94E68DC42E764B.GIF',
'29B60A4E095B78BB84FA843BEEB85232.gif','32C8C3066F3A33C66DE43D562403823F.GIF','3DA3867491B67519871F4D414C98137B.gif','416886F8B3F43BDCBF32690F1CC0F21E.GIF',
'514ED66815E551ADFAE25510CC975C6F.GIF','53799B91891A27ED029E57281BD25EEF.GIF','5BA0F322CEEC6E580449940729B60992.GIF','63EA6DCDB3B18E17C82DA34B906816D5.GIF',
'91146BB20229C26B6F4AD3B186038C6A.GIF','8D7A5980FCE58112A12D792E8B104042.GIF','88B2F2AE5A975761322F0FAB799F7629.gif','83426C6E947B25973D27069E8C3A7AE9.gif',
'7017317FDCF560914862F2E195C5547D.GIF','6E5D52DFED6854E059856585237F059B.gif','6A2B378169783EB191EC386B77BAE760.GIF','63238905297E0FD78A54B842CD2B4E4F.GIF',
'9700FCEAD85630578FB7335AED30F959.gif','9E3AE0697FAF71E13C70B7B8712C95EF.GIF','AB8921AF9655617D63D8F0FAC3760B43.GIF','ACF60842CB6FD1C59A3209DCA320E4DE.GIF',
'AFAB2A7A5188017F86EA60F2B774D4A8.GIF','BA0C7A3E23A6AF7D923A7E0236FA568F.GIF','BCA5EDBD9F39089F60C6356184B75E66.GIF','C449CED0F918C2F7938574204D1E3100.GIF',
'C6056BFF13D7D919336036FEEBB6CE5C.GIF','C85046901B9E4322F42B4912D08CA3A4.GIF','C8C644657E02A94B82646D0D40675AB1.GIF','C94D28765948BD9585ACD9D2380D4CE4.GIF',
'CE02FCB1E731ED566F872809C3982D40.GIF','CF90BFFFCADD2CDA0D490CE207EE99A6.gif','D2254E87129228E53C2A1D5A1F844015.GIF','D86B3ABB9AA0E0D51783BBD103010718.GIF',
'DA1AD74630B336A234AF378C6A3A0232.GIF','E4CB0092A976563E25CA2D3D8548CEB1.GIF','E8F3BB25AD1B6C801233ECADB43E7702.GIF','EB4C104CBE8DF858D2EEFD4A1B007DE4.gif',
'ED6CB1A91E4FD63AAB81D6210E8B44E6.gif','EEFBF27696021F75AC7C9BE328CB205D.GIF','F867CD4F3FCEF287FBE39807926C3C41.gif','F56EDB31DE462478DD91854890F536E6.GIF',
'526F43BF439EB88B4D5C96C73C53228F.GIF','0F8425B9E3FD55EE64485A90055BD993.gif','34FF1DD24EC1DEB6251B4D118F091969.GIF','67192D0DC342B8374154141C9423357D.GIF',
'735083E25CBACE685CCEB3EC4A56172A.GIF','E3CF2B124CFE959EBA150003D31171BB.GIF','4CBE0EC21E8DACD8C1FBC7DFD126AA5B.GIF','1157B3C7C74C9592BF796B2A46C611B8.GIF',
'1E7D609D6AD73C715E1DC5AE2B91ED64.GIF','8807A83C7CB9521DA37ABD57BCF13A0F.GIF','1FB1DF086B8E9D6B3C2415AAD3F257B8.GIF','22B0AB2C811C8DD106B03C2006CDDCF9.GIF',
'28C09EAAA5A0FDAB04E91182C3506450.GIF','4AEFE7A4DF52B98156CF874A82AB9823.GIF','6B566DEBFEF028970BFC1944D0940E91.GIF','909D01CA236A65F7FB8AC9E7A860B2A9.GIF',
'9FCE9DCF989CC4752C20BD5378D3EDAF.GIF','AE1B52FADAC73BFF497BF3461C2197D3.GIF','EE29AB28BEFC10ADA25CD5A0316BC560.GIF','F62C567259855B26CBC872FFDA5FFD0B.GIF',
'C65A5916AC1821083DF19930C9B2BE73.GIF','726D21EA04008EFCEFE3397D1F26055F.GIF','758E32E88F4DA8142D8297E97ADB7714.GIF','802C66597CEF66CCCAAC7B47E380E77F.GIF',
'BFA63018661CF6ACA8EA46DBD532CEE8.GIF','C69CBEA51FD0DCCA2B720E527DFD657C.GIF','05242A7F96100EF3D3F3B4C5B790D186.GIF','30B76DD021319EF85E87242066B30AC8.GIF',
'52756125148A49F91AE8A9750190AFCA.gif','5E35526024545B7015AFC696B90B1463.GIF','65FB762D1B7F7A824E60C1C49C4670F7.GIF','04F9E2B4F2A85E4967A7772B8A9FA12E.GIF',
'0ADBD5DEBDBBBF8A08204AA3041B0B7D.GIF','0C6A5E2DD47B462D7B04D2377AD38B3A.gif','0DCD422BBBC2DA49C07CAFCE30C8DA6F.gif','0EB17CDAA72B2B00CBDF96128EAB13B0.gif',
'11FC1C097051D4BB9C14EC86BBF72EB5.gif','1325929FA2CF6C1B0A4D2CE3F39391F4.gif','13CF747748787D79A3A3BB6BF809ECBD.gif','1499230D766245012F1842FB2D0C3AB1.gif',
'14FB6CFFD1060A3BCAE6A4096045AC3F.GIF','1D42D2B1C46FC6D30A0FCBB1BC132741.gif','1D9E1D5305AC97AFC258BE3F7A99F93E.gif','1E77DD849C2FB18B1C098654A2213A7D.GIF',
'1FB4D86C4A48A00D0980DD004F4F6FB2.gif','1FC02028E0C890AFEC1AE67E3EAEB001.GIF','208DFB2EF6D625378D08921C0855F6F7.gif','20A214B15E25F6520A2FAA5C133675A2.gif',
'220B69731734B8FD65E5AE66E9D34C58.gif','253093CB08285DBBBED886467C6F3E7B.GIF','255F69AAA9F4E40761DD0E468A96F0DD.gif','260A6F9491C54603E47A5E4DF9FDEB23.GIF',
'27F5F1979DDCCE5F4841C02C57D284FF.gif','29B3313BACD976E42990E5CAEE57F78F.gif','2AD5CE3833BFD0E52CF7788314A15247.gif','2B8C44E967522C828EFE6A6AC1397160.GIF',
'2DF4ABCA69E7EE601FB237724B532F4A.gif','302191904603B21FB4181EDD92281DC4.gif','30D6AB0C700837F7D6D972EA74EDAB40.GIF','314E0F9BD1008B67EC949159013DC94E.gif',
'32803006FAAC7971C95553EA4C6F937C.gif','37AACC4808E77AFAF71520C7BDAED770.gif','3B37F84DE00AB2C3B546E7FEDC266E55.gif','3EB317673689F5DED00390DE474B3845.GIF',
'3F3D719FB39CB91862D5F740C59453DE.gif','4073B6CADC55FDEE22D1056C288A8E3A.gif','420F800CE61351559DEA2DE8ED55246D.gif','42BFA979E3565D0645FA16A90AE8755C.gif',
'4630747053ABC38B3C5DF602F045D80E.gif','49878FC72C0DE33413745D1419A8A50F.gif','4F7E27CFA7BAEB0523AB5877223B0F9D.gif','4FA3DF9B2C5E03389C33F7679FD1FB72.gif',
'51ED92C851BA08EBD6F6F1CE657D0818.gif','52578BAFCC33B8D4070B596984AA1185.gif','52C2C0B8B2ED8064FD48019495E3EEB7.gif','54414C025B5B972EB6131E8F9F5968FC.gif',
'55D89254D5EFA37A4652ABC13B82A8A9.GIF','589FCFDAC4A24D54324B8D8E7795020D.GIF','5AD83182E4A9D19C1E2FA86368013874.gif','5F7EE09D08EFBECF00E7523D0009A472.gif',
'5FA90B60903B6FBAF0E51CF4CFBFBB14.gif','62733AB031CB75AFA6AC3B5EAF8769BB.GIF','62CA457EC5CCB6088FA4AC51A721856F.gif','6383D86C270BBC500076E60B6D5B14B8.gif',
'63B34241405BABEAAA1E639D3A18EA9A.GIF','642749F85D43F0F780BE69F4BA230E85.gif','648D0E3EDC7A3557A3EF5718C144B8C9.gif','679B383CE2B4BBB93F9C1D890624AF5F.gif',
'68C5209BDA2A4E1A146EF656632FDE5E.gif','6B617A101D7D875C87C7937B62C40CC4.GIF','6CBB62F8D3C2472AD0F1AD480EBF86A0.GIF','6CDE9F271CBF3BFC2E88A9728E77EF50.gif',
'6D00AB09BA63A72FC687824384031C75.GIF','6E9022AA8448CED5EBC82993A0F8BE41.gif','6EC5D27B63A88BE3F4BEA7BEDC77E1B2.gif','6FD5D9C2BB0B742BEF759A7B40738FD6.GIF',
'7150D0604340F7BF68F2DB4FF0E94A3E.gif','725BEEF15E5BA51CCB8282725DAC1D66.gif','738BC342A9361E973C0E59ED7E2AA4B3.gif','74FB6555DD6F8BB6BC01B674C08B198F.gif',
'77BC137F71A3F1C7A879DE432D2168F1.GIF','786D3F728EF31E18BF735A8BE759E214.gif','7C94BC5EA5D8D0496569A925318D69D8.gif','7F784617DBC0B104E037A52E15C0BA38.GIF',
'7FCBCF4BF3561C37D08B402332CF4078.GIF','801354B080C61882879D736E94F9B65F.gif','80F2652DAA9BF3AFBF79D5E3B0D5D8BB.GIF','880F73C39C27CFA3E7FE7AA05BDD29F5.gif',
'89654FFAEEC21F5F6CC04B7FE785BCD1.gif','8BFF88FD3FB2B4B72362A7B63DC11829.GIF','8C181DCCC6D370F8490CF373E6DA876D.gif','8D97B253259F512BDD2CE24C5AD56659.gif',
'8E384418BF2B5A2DBC0832A2DBEDCB81.gif','8E74BE40C04D934499F78C9CA433FD19.GIF','91680080568DE9EAB3152BBB39A208DF.GIF','917C834874BA32E96B2E2BBCB1B8C2CF.GIF',
'946B1FF8AEDA77C61B3589DA4082BAA1.gif','9571B175FEE09AFED47F618ABC721F9E.gif','98C1B435DBC110548D37E51A7A4956B0.gif','9AC7A58C588592F5B141825B70FF53FA.gif',
'9BA38A99EB4FD553FED7E0F4596ADB8E.gif','9CFCBFE5E35994326106CAB94004C428.gif','9E0575C320C4A031EFC049F8D6E134F0.GIF','9E4E4E56957A798C9F626D73FE0D9844.gif',
'9F842A0CCCC3363CC3432127408F7CCE.gif','A1B6BC0C4E61D5D0BC1BA8A2C88D5D63.GIF','A224A4D60FA235E29E8A77CC47CCBD1C.GIF','A269DE433DF50B73753011E48968D7BD.GIF',
'A4AE8C6E7A3ADCFB56385D294055C1A0.gif','A4ECEA670B7E3C6FBEABF0B30524905D.gif','A5D7F8F250F06646E902990F2F8BCAF0.gif','A619DC1D44B4897A9A704909F3FDB516.gif',
'A64123ACF66F94CD28F45741DE2BD3EF.GIF','A75AC6BA247A183D71B87CCAD7141568.gif','A8D69F6A4B56E16BECD471867EB68599.GIF','AB7E80E91F5233B752F15952CA027F65.gif',
'AC51BBF956A983673402AE1F794F7553.GIF','AD438B7916F8DBCBA755CBB1C98C1F46.GIF','AD6B3E61FF190B69C8CFED137A9CB73A.gif','AD7163D24B37CF18C07B5CFA0166909F.gif',
'ADCA13031F4700CC7B2B9455EA631412.gif','AEA409DA12607BA7CE1387CE1718D192.gif','AFBF49DD8680F25FDE745DE8D5DC0772.gif','AFEBC811A90345DA0DB16A7E2A727092.gif',
'B25D3A7471F8750F09C6EE584C97C203.gif','B375F0292AD69153E320F9EEEBF50259.GIF','B6AC3B3B926EF05A87FE300E538A0EF3.gif','BA1B23F7FBE52165FF89514F89A338D0.GIF',
'BA52A51E797C2B4A656F43965296986E.gif','BCCDB9763D9FA01D5DA60B3B0E38D895.GIF','BF0C151C27BC9B5957262EC550E89937.gif','BF3EB05369FBE6AEE3E2FBD5CD45FC93.gif',
'BF59C29AD021E331D4C9CF859B0E71F7.gif','C32C75243FAF9B1F02A392E3CD7ABFCB.GIF','C55F38A2E06459240CAB145021EB6686.gif','D4823EF85F5250F372FD35FE242AFC5F.gif',
'C5E7B84A9AB207CAFEF15494DEAC209B.gif','C698013BEF96D963035FBECE1A8D3962.gif','C7FA5198AD8911E29B0EF7AF24953072.gif','C9284C0CC9B13B9FE7EDCB86CC04874B.gif',
'CF0E54B72D95EBDB8683B80DEBE44248.GIF','CF67ED9015F2C84A7F1ED78DB9C30184.gif','D0280688BF2383296941CDF5D4B848F9.gif','D0749AD1D0EADCA5A5B5BF5A09129960.gif',
'D69073979DB4C0C8F6CFF87250AF0E17.gif','D703F20E5F807A6112DF49ED14AEBC52.GIF','D846FFA9B31E041AA95E598F59F2F5D7.GIF','DD51BB8CE5C4B9A27A11653087DCB8B6.gif',
'DDEBFD9590F345364A0B81DB5FEF8952.gif','E0E4B4FB36D52CC4A826D3D126E3D165.gif','E2DD5B700A5D6758975718B7D35AACAB.gif','E583E69F249341A81C3E7EA70C41A2BC.gif',
'E663B3ED51C885B081A22745EA7AB043.GIF','E848875BC497ADA9DBFF949695D1623A.gif','E89A9432BA840BF47FE4C871DD9FC6BA.gif','EA35DA3ADDDFF7FE9561B64BB2F428F2.gif',
'EA9ECA1F0672ABC58DBC530EDFA0C30E.gif','EDF4A82C618DA4111F90C2E6AFEF25F1.gif','EE4EEDC5F50D6A5D85A97DF206553821.GIF','EE8F7B51A2F34282130A496B7ECABDE1.gif',
'F3C65289F06B12E1F247E09C5F4F220C.GIF','F683ADEF6FE516C6B2C1F5BFDB1F5DDC.gif','F74EE57E49205456A1A690CC98D76C2D.gif','F7F03BB697178F4FE8811D0C5771AA5F.GIF',
'FBC45DFBE71400004BA8F7872510E680.GIF','FDBA52A0818C2F71C76A02F47E421F92.GIF','FDD7D0BE7659A528F08C30CE77AC6587.gif','FE6A0B9E6333C30D288E9323EBAD87F4.GIF',
'F8A20C1C7FC2A0B1FBA7209B7E491E7A.GIF','D40CEF5D7779B09EF21186E2548BEA2C.GIF','D5C81E659A7233B5192BEC792E2F9F07.GIF','DD6951ADAB0FF966BFC1F2188E128CF3.gif',
'E27E71D03F5D9AE58FB07FAF8269428F.GIF','E4CB47C55773972C8D0DAA926048EF7F.GIF','400B52B6738F8CFFE081620FC9EBB851.GIF','787846984EDAA70E2C519000E073D4B1.GIF',
'7E9EF1AFFA72A001CBA14A33120B9F6F.GIF','90362A38EEABB941E25C59DF9C5BA1F9.GIF','42EDE77AE49542CB81CEA179A277B203.GIF','818B2805A66F4C46F19F616F36F9E863.GIF',
'C73155EC3BF0F2B153E977DFC1F61F87.GIF','63DB828E05177BFAAEE5502618441436.GIF','67C8FA83EA8393BEF54FF42037A662CB.GIF','05ED0EC24389843E8752817E9159888F.GIF',
'223940ECDF2C88BA3295679DAE4BCCE5.GIF','21C150A69F8BCC860629E4FD7194FDCF.GIF','4239B22BEBD821D6247B8E87FA3F2281.GIF','37E46469A571783F67E70920478923AA.GIF',
'B16C8A2383C29AFE7F230770DE9FFBA0.GIF','B34F704AED5A46FEFA459221A8EBAACF.GIF','62080D5C7414FB459658AD0C10D3A024.GIF','EBB27C553C76145FF3E8BC7A80E98F8F.gif',
'934C91C79E21AE5FB2381B1417DC30E3.gif','3D252605ECACFA9E44414D18DBFFAB2E.jpg','B95057CA66EBC8FEF9DB632664086303.gif','DC237E2BA93C232AC8E7C1084BF4AFBE.gif',
'9955749C467478555293F9A2E3486FD3.gif','A10C4708C17DC80445F0EA9770849974.gif','8C31195F942DD5C7A3F06E57CE5B08AA.gif','7A515840BC22AF50895548514677782B.gif',
'7337C551CE009A5FFD24DFC134A18C17.gif','03470537E9C08F584294EE02319584EA.gif','0F6820D2F298D489D30BFEFC50D1DC39.gif','124A8CC25CB8FDBF1F34129BFAA3998D.gif',
'40ADA0E4B2F8BB02ED47A478EF2112D3.gif','5B6BDF68A4F0A123359F7F0F12612389.gif','1C47E40C6D2F73EFF34DEA1DBFA52F3B.gif','29EE95CE48D6A24ACC741EA4176DD987.gif',
'2D22BCB9517D7A982860727A7FC0C7A0.gif','2FE0B6A301EB55D1A0A9689AF8E6299D.gif','B925019B2F94495B572D087D71C4231A.jpg','7FFB53B66721769632337E90F801F5EF.GIF',
'4CD4D0404F7250D4CDE91DA5AD8A2FA9.gif','728D59270C9AE0653FB15F4AC23058D1.GIF','66C2F9CE5A18741001571321F1063FE4.gif','A2584696FBB376C876D5D43986B9F49F.GIF'
        ]
]);


smileData.push([
	'達達兔',
	'http://www.foxqq.com/biaoqing/dave/',
	[
        'FA03C3AE1BA956A335AD7A7382E5BF7B.gif','F10B555B350A24F8FB1C62D25850E053.gif','F0D1AF2D889392DE5F8A9E0CC89D547F.gif','E7AC22186D896B072BEC80EE8559D7FA.gif',
'DB0671BE136C9DEF116C0FE76899A1A3.gif','C969134BF3219541EE16D38D39FDC0F3.gif','C7167A4EE4481AE8025286A0C8C30C7B.gif','B39CE80A1B94840FB82FE5CE1B23951A.gif',
'A49C5DBC79D86A36FE717D046B815FFC.gif','A9B6060DD814BC6CAEEA7AA1A2A1E6B9.gif','733966FC4609BF9BC8DD1B52C9C98844.gif','39010BD5E8C69633F2A263B0796BD218.gif',
'3547AE90273679725C14FE23053AC5F8.gif','1918F59E198038CF4F2687089AD96A3A.gif','598A1A79DDC4755CAEE8F4551BFB1C77.gif','497AC1C1F4FDD904680DDF78F8BA4050.gif',
'447C39621E089912CB5D2E9C4365FB92.gif','87B62493DDE7A86F92FD89D0AA12D607.gif','41C647DAAF94F3901DB534E81E7521F1.gif','16F7B6F4031E93E58FE507CFE42F52CB.gif',
'9ADD1265A4D16C12C13367D745F71603.gif','08F6AB56760D2A16C5F301FE83A7CD5C.gif','7B7AD72CB010749D6AAC386E00F47515.gif','2C1315CA08190522E7E08B4E577D9998.gif',
'2AE76D89BDC678E904ABCDE24E81B390.GIF'
   	]
]);


smileData.push([
	'喵喵',
	'http://www.foxqq.com/biaoqing/mumu/',

	[
'01BD36371378681DE358745B31182188.gif','05BEBD6DE6BAA8227AFECAD892A511B2.gif','213CD5E26D11CB27D2BB87115B7E45E2.gif',
'30748A3077916D785326E8397650F1C9.gif','3313A3DD711B226258FC89915C761863.gif','3CE61CF93D61C072D711132F0D79FC9F.gif',
'3E10E89154CB17FEFFAAA031C30079F0.gif','46879BE722002E0916E81F961737735F.gif','46B590926789D215BBCADB80F1A632E8.gif',
'48DC76B5D7659EBE28FF5F1E3CC48697.gif','4F35A476C61592B22B52B961C813A3E0.gif','505352360FF690E44CCF85F31CC374EB.gif',
'5952494160EF9E94002F8A424A00A3AA.gif','5DE484318CB0DB95A5345C10D0099F8C.gif','63447CA34D8810B0A88E84EB130757A9.gif',
'6A94AEDCB839F193F4747015EB2AFAEE.gif','6AD1CEADE8522C2CCA44E0998A6E40E9.gif','7745F9B66E098510AC42B0D361D90BE4.gif',
'795AC0BAE551C603B63EBF1DD6C64DF7.gif','7AC0BD5A9E7ABEC01061EB22D4C5238E.gif','8F5372BD34762A46E2DFF4A5AD5F7FD6.gif',
'A112013444A95A9953B398D20EA003F0.gif','A8F7EFF732DCC1029EFE26A4FCDA0CBF.gif','B3F82F70090932C8615B9143891036D2.gif',
'B995BBF0C022443BE5E1AB68CC0F35AF.gif','BF8D8A6488901448A0DF2834493D0884.gif','D01A7DE7E9785C50E020715989B52B43.gif',
'D4DBA5BBAEE98257F82B2F1618FCD5BF.gif','E1641AC9B7EF60F2923AFE9445F56CCF.gif','ED5D4C8AAC1422572A3285E033838FE5.gif',
'EE02C2F807A2C6D7730F38905B43C597.gif','F29D8D911EB8E324B12852C9B1A7ECCA.gif','F80D60ACA302371D36965DA5D41A9AB1.gif',
'F963C1F4896B5CC1C3841CF5D63F2EA7.gif','FAEF748FFFC912BB0F346B0CB3EE9927.gif','FE7F240A654C14952A8FAC18917CEF39.gif'
   	]
]);


smileData.push([
	'米粒',
	'http://a2233.myweb.hinet.net/msn/millieian/',
	[
		'millieian1%20(1).gif','millieian1%20(2).gif','millieian1%20(3).gif','millieian1%20(4).gif','millieian1%20(5).gif',
		'millieian1%20(6).gif','millieian1%20(7).gif','millieian1%20(8).gif','millieian1%20(9).gif','millieian1%20(10).gif','millieian1%20(11).gif',
                'millieian1%20(12).gif','millieian1%20(13).gif','millieian1%20(14).gif','millieian1%20(15).gif','millieian1%20(16).gif','millieian1%20(17).gif',
                'millieian1%20(18).gif','millieian1%20(19).gif','millieian1%20(20).gif','millieian1%20(21).gif','millieian1%20(22).gif','millieian1%20(23).gif',
                'millieian1%20(24).gif','millieian1%20(25).gif','millieian1%20(26).gif','millieian1%20(27).gif','millieian1%20(28).gif','millieian1%20(29).gif',
                'millieian1%20(30).gif','millieian1%20(31).gif','millieian1%20(32).gif','millieian1%20(33).gif','millieian1%20(34).gif'
        ]
]);


smileData.push([
	'三麗鷗',
	'http://www.hellokitty.fr/goodies_siteweb/emoticons/',
	[
'chococat_sanrio_19.gif','ck_angry_032007.gif','ck_blink_032007.gif','ck_close_032007.gif',
'ck_happy_032007.gif','ck_sad_032007.gif','ck_turneye_032007.gif','ck_verysad_032007.gif',
'cy_angry_200801.gif','cy_blink_200801.gif','cy_close_200801.gif','cy_happy_200801.gif',
'cy_normal_200801.gif','cy_sad_200801.gif','cy_turneye_200801.gif','cy_verysad_200801.gif',
'dd_angry.gif','dd_blink.gif','dd_close.gif','dd_happy.gif','dd_normal.gif','dd_sad.gif','dd_turneye.gif',
'dd_verysad.gif','hellokittyFR-30.gif','hellokittyFR-31.gif','hellokittyFR-32.gif','hellokittyFR-33.gif',
'hellokittyFR-34.gif','hellokittyFR-35.gif','hellokittyFR-36.gif','hellokittyFR-37.gif',
'hellokittyFR-38.gif','hellokittyFR-39.gif','hellokittyFR-40.gif','hellokittyFR-41.gif',
'hellokittyFR-42.gif','hellokittyFR-43.gif','hellokittyFR-44.gif','hellokittyFR-45.gif',
'hellokittyFR-46.gif','hellokittyFR-47.gif','hellokittyFR-48.gif','hellokittyFR-49.gif',
'hellokittyFR-50.gif','hellokittyFR-51.gif','hellokittyFR_01.gif','hellokittyFR_02.gif',
'hellokittyFR_03.gif','hellokittyFR_04.gif','hellokittyFR_05.gif','hellokittyFR_06.gif',
'hellokittyFR_07.gif','hellokittyFR_08.gif','hellokittyFR_09.gif','hellokittyFR_10.gif',
'hellokittyFR_11.gif','hellokittyFR_12.gif','hellokittyFR_13.gif','hellokittyFR_14.gif',
'hellokittyFR_15.gif','hellokittyFR_16.gif','hellokittyFR_17.gif','hellokittyFR_18.gif',
'hellokittyFR_19.gif','hellokittyFR_20.gif','hellokittyFR_21.gif','hellokittyFR_22.gif',
'hellokittyFR_23.gif','hellokittyFR_24.gif','hellokittyFR_25.gif','hellokittyFR_26.gif',
'hellokittyFR_27.gif','hellokittyFR_28.gif','hellokittyFR_29.gif','kk_angry.gif',
'kk_blink.gif','kk_close_200707.gif','kk_happy.gif','kk_normal.gif','kk_sad.gif','kk_twirl.gif',
'kk_verysad.gif','kr_angry.gif','kr_close.gif','kr_happy.gif','kr_normal.gif','kr_sad.gif',
'kr_shocked.gif','kr_turneye.gif','kr_verysad.gif','kt_angry_032007.gif','kt_angry_200801.gif',
'kt_blink_032007.gif','kt_blink_200801.gif','kt_close_032007.gif','kt_close_200801.gif',
'kt_happy_032007.gif','kt_happy_200801.gif','kt_normal_032007.gif','kt_normal_200801.gif',
'kt_sad_032007.gif','kt_sad_200801.gif','kt_turneye_032007.gif','kt_turneye_200801.gif',
'kt_verysad_032007.gif','kt_verysad_200801.gif','ts_kiki_angry.gif','ts_kiki_close.gif',
'ts_kiki_happy.gif','ts_kiki_normal.gif','ts_kiki_sad.gif','ts_kiki_shock.gif',
'ts_kiki_turneye.gif','ts_kiki_verysad.gif','ts_lala_angry.gif','ts_lala_close.gif',
'ts_lala_happy.gif','ts_lala_normal.gif','ts_lala_sad.gif','ts_lala_shock.gif','ts_lala_turneye.gif',
'ts_lala_verysad.gif','us_msn102007_angry.gif','us_msn102007_blink.gif','us_msn102007_close.gif',
'us_msn102007_happy.gif','us_msn102007_normal.gif','us_msn102007_sad.gif','us_msn102007_twirl.gif',
'us_msn102007_verysad.gif','xo_angry_200801.gif','xo_blink_200801.gif','xo_close_200801.gif',
'xo_happy_200801.gif','xo_normal_200801.gif','xo_sad_200801.gif','xo_twirleye_200801.gif',
'xo_verysad_200801.gif'
        ]
]);


smileData.push([
	'W2大俠',
	'http://niter.myweb.hinet.net/w2-s/',
	[
	's01.gif','s02.gif','s03.gif','s04.gif','s05.gif','s06.gif','s07.gif','s08.gif','s09.gif','s10.gif',
	's11.gif','s12.gif','s13.gif','s14.gif','s15.gif','s16.gif','s17.gif','s18.gif','s19.gif','s20.gif',
	's21.gif','s22.gif','s23.gif','s24.gif','s25.gif','s26.gif','s27.gif','s28.gif','s29.gif','s30.gif',
	's31.gif','s32.gif','s33.gif','s34.gif','s35.gif','s36.gif','s37.gif','s38.gif','s39.gif','s40.gif',
	's41.gif','s42.gif','s43.gif','s44.gif','s45.gif','s46.gif','s47.gif','s48.gif','s49.gif','s50.gif'
        ]
]);


smileData.push([
	'W2小熊',
	'http://niter.myweb.hinet.net/w2-b/',
	[
	'b01.gif','b02.gif','b03.gif','b04.gif','b05.gif','b06.gif','b07.gif','b08.gif','b09.gif','b10.gif',
	'b11.gif','b12.gif','b13.gif','b14.gif','b15.gif','b16.gif','b17.gif','b18.gif','b19.gif','b20.gif',
	'b21.gif','b22.gif','b23.gif','b24.gif','b25.gif','b26.gif','b27.gif','b28.gif','b29.gif','b30.gif',
	'b31.gif','b32.gif','b33.gif','b34.gif','b35.gif','b36.gif','b37.gif','b38.gif','b39.gif','b40.gif',
	'b41.gif','b42.gif','b43.gif','b44.gif','b45.gif','b46.gif','b47.gif','b48.gif','b49.gif','b50.gif'
        ]
]);


smileData.push([
	'W2小猴',
	'http://niter.myweb.hinet.net/w2-m/',
	[
	'm01.gif','m02.gif','m03.gif','m04.gif','m05.gif','m06.gif','m07.gif','m08.gif','m09.gif','m10.gif',
	'm11.gif','m12.gif','m13.gif','m14.gif','m15.gif','m16.gif','m17.gif','m18.gif','m19.gif','m20.gif',
	'm21.gif','m22.gif','m23.gif','m24.gif','m25.gif','m26.gif','m27.gif','m28.gif','m29.gif','m30.gif',
	'm31.gif','m32.gif','m33.gif','m34.gif','m35.gif','m36.gif','m37.gif','m38.gif','m39.gif','m40.gif',
	'm41.gif','m42.gif','m43.gif','m44.gif','m45.gif','m46.gif','m47.gif','m48.gif','m49.gif','m50.gif'
        ]
]);


smileData.push([
	'W2小豬',
	'http://niter.myweb.hinet.net/w2-p/',
	[
	'p01.gif','p02.gif','p03.gif','p04.gif','p05.gif','p06.gif','p07.gif','p08.gif','p09.gif','p10.gif',
	'p11.gif','p12.gif','p13.gif','p14.gif','p15.gif','p16.gif','p17.gif','p18.gif','p19.gif','p20.gif',
	'p21.gif','p22.gif','p23.gif','p24.gif','p25.gif','p26.gif','p27.gif','p28.gif','p29.gif','p30.gif',
	'p31.gif','p32.gif','p33.gif','p34.gif','p35.gif','p36.gif','p37.gif','p38.gif','p39.gif','p40.gif',
	'p41.gif','p42.gif','p43.gif','p44.gif','p45.gif','p46.gif','p47.gif','p48.gif','p49.gif','p50.gif'
        ]
]);


smileData.push([
	'Open將',
	'http://i38.photobucket.com/albums/e122/lisces/useie/Openchan/',
	[
		'01.gif','02.gif','03.gif','04.gif','05.gif','06.gif','07.gif','08.gif','09.gif','10.gif',
		'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
		'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
		'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
        ]
]);


smileData.push([
    '奶油獅',
    'http://s155.photobucket.com/albums/s308/tcboy_8/lionbaby/',
    [
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif'
    ]
]);


smileData.push([
    '奶瓶仔',
    'http://s155.photobucket.com/albums/s308/tcboy_8/bottlebaby/',
    [
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
        '21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
        '31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
        '41.gif','42.gif','43.gif','44.gif'
    ]
]);


smileData.push([
    '悠嘻猴Nu',
    'http://s155.photobucket.com/albums/s308/tcboy_8/yoyocici/',
    [
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
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
        '131.gif','132.gif','133.gif','134.gif','135.gif','136.gif','137.gif','138.gif','139.gif','140.gif',
        '141.gif','142.gif','143.gif','144.gif','145.gif','146.gif','147.gif','148.gif','149.gif','150.gif',
        '151.gif','152.gif','153.gif','154.gif','155.gif','156.gif','157.gif','158.gif','159.gif','160.gif',
        '161.gif','162.gif','163.gif','164.gif','165.gif'
    ]
]);


smileData.push([
    '柑仔＆粉紅豬',
    'http://s155.photobucket.com/albums/s308/tcboy_8/orangekid/',
    [
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
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
        '131.gif','132.gif','133.gif','134.gif','135.gif','136.gif','137.gif','138.gif','139.gif','140.gif',
        '141.gif','142.gif','143.gif','144.gif','145.gif','146.gif','147.gif','148.gif','149.gif','150.gif',
        '151.gif','152.gif','153.gif','154.gif','155.gif','156.gif','157.gif','158.gif','159.gif','160.gif',
        '161.gif','162.gif'
    ]
]);


smileData.push([
    '包子頭',
    'http://s155.photobucket.com/albums/s308/tcboy_8/pauhead/',
    [
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
        '21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif'
    ]
]);


smileData.push([
    '喜羊羊',
    'http://s155.photobucket.com/albums/s308/tcboy_8/smallgoat/',
    [
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
        '21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
        '31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif'
    ]
]);


smileData.push([
    '日奎獅',
    'http://s155.photobucket.com/albums/s308/tcboy_8/sunlion/',
    [
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
        '21.gif','22.gif','23.gif','24.gif','25.gif'
    ]
]);


smileData.push([
    '水餃',
    'http://s155.photobucket.com/albums/s308/tcboy_8/dumplin/',
    [
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
        '21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
        '31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
        '41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
        '51.gif','52.gif','53.gif'
    ]
]);


smileData.push([
    '烏拉龜',
    'http://s155.photobucket.com/albums/s308/tcboy_8/wulakura/',
    [
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
        '21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif'
    ]
]);


smileData.push([
    '小頑',
    'http://s155.photobucket.com/albums/s308/tcboy_8/ahwan/',
    [
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
        '21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif'
    ]
]);








smileData.push([
	'表符',
	'http://i.imgur.com/',
	[
        'ctjUu.gif','kn0Iu.gif','OY7rD.gif','VXbf7.gif','ByrjX.gif','HuIv0.gif','QZCst.gif','Mu2jx.gif','jntcL.gif',
	'usS87.gif','a1yIS.gif','LZvSc.gif','PouBO.gif','lfbRN.gif','wiJ0d.gif','RhiCd.gif','1nQDc.gif','rH4V1.gif',
	'yY4R3.gif','x3Er4.gif','johJe.gif','QnWX1.gif','LhJuc.gif','Orqnf.gif','ESnZT.gif','LDyi8.gif','TK8aj.gif',
	'j46Hr.gif','35jWt.gif','CHXF9.gif','ymSOI.gif','rFvRy.gif','W2Qf5.gif','PfKnA.gif',
	
	
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

