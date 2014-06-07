// ==UserScript==
// @name            Plurk Smile yessi modify
// @namespace       http://billypan.com
// @description     2009/07/01
// @include         http://www.plurk.com/*
// modified log:    
// author: Seven Yu (PlurkSmile V 4.6) and MaxChu (Replurk V 0.2)
// Changed : Billy Pan
// V4.0.1 [ReP_原噗按此]
// V4.0.2 修正他人頁面無法使用問題 ( by: James Chao http://www.plurk.com/xx3734)
// 這個版本整合進去了單鍵"Re-Plurk"功能!
// 讓我們一起換頭像，提醒世人3月10日是圖博抗暴50週年! 
// V5.0 修正破圖，加新表情和日曆回朔器(by rein)功能
// 紀念Michael Jackson，加入3個Michael Emoticon!
// V5.1 加入翻譯plurk為中文功能 (改自Plurk Translator V1.2 by Peteris Krumins)
// 加入大雜燴表情圖,如果不喜歡的類別,直接刪掉即可 by yessi)

// ********** Main Script ***********
var smileData = [];

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
	'悠嘻猴2',
	'http://www.addemoticons.com/emoticon/monkey/AddEmoticons126',
	[
		'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif','71.gif','72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif','81.gif','82.gif','83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif','91.gif','92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','99.gif','100.gif','101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif','111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif','120.gif','121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif','128.gif','129.gif','130.gif','131.gif','132.gif','133.gif','134.gif','135.gif','136.gif','137.gif','138.gif','139.gif','140.gif','141.gif','142.gif','143.gif','144.gif','145.gif','146.gif','147.gif','148.gif','149.gif','150.gif','151.gif','152.gif','153.gif','154.gif','155.gif','156.gif','157.gif','158.gif','159.gif','160.gif','161.gif','162.gif','163.gif','164.gif'
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
	'兔斯3',
	'http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',
	'021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',
	'031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',
	'041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif',
	'051.gif','052.gif'
	]
]);


smileData.push([
	'MSN',
	'http://i410.photobucket.com/albums/pp189/unget/msn/',
	[
	'MSN002.gif','MSN003.gif','MSN006.gif','MSN008.gif','MSN009.gif','MSN010.gif',

	'MSN015.gif','MSN017.gif','MSN022.gif','MSN023.gif','MSN024.gif','MSN025.gif',

        'MSN026.gif','MSN027.gif','MSN030.gif','MSN032.gif','MSN038.gif','MSN039.gif',

        'MSN040.gif','MSN042.gif','MSN050.gif','MSN051.gif','MSN052.gif','MSN056.gif',

        'MSN058.gif','MSN059.gif','MSN060.gif','MSN062.gif','MSN064.gif','MSN066.gif',

	'MSN067.gif','MSN069.gif','MSN070.gif','MSN072.gif','MSN073.gif','MSN074.gif',

        'MSN075.gif','MSN076.gif','MSN078.gif','MSN079.gif','MSN080.gif','MSN081.gif',

        'MSN082.gif','MSN083.gif',
	]
]);

smileData.push([
	'Yahoo!',
	'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/',
	[
	'3.gif','5.gif','6.gif','7.gif','13.gif','18.gif',
	'25.gif','27.gif','101.gif','100.gif','102.gif',
	'104.gif','105.gif','30.gif','32.gif','35.gif',
	'40.gif','42.gif','45.gif','47.gif','109.gif',
	'110.gif','111.gif','112.gif','113.gif','114.gif',
	'69.gif','106.gif','107.gif','51.gif','53.gif',
	'57.gif','59.gif','61.gif','63.gif','65.gif',
	'67.gif','68.gif','71.gif','76.gif','78.gif'
	]
]);

smileData.push([
	'MSN+2',
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
	'熊寶',
	'http://www.gamestar.com.tw/mini/leitmotif/051/',
	[
		'lei051001.gif','lei051002.gif','lei051003.gif','lei051004.gif','lei051005.gif','lei051006.gif',
		'lei051007.gif','lei051008.gif','lei051009.gif','lei051010.gif','lei051011.gif','lei051012.gif',
                'lei051013.gif','lei051014.gif','lei051015.gif','lei051016.gif','lei051017.gif','lei051018.gif',
                'lei051019.gif','lei051020.gif','lei051021.gif','lei051022.gif','lei051023.gif','lei051024.gif',
                'lei051025.gif','lei051027.gif','lei051028.gif','lei051029.gif','lei051030.gif',
                'lei051031.gif','lei051032.gif','lei051033.gif','lei051034.gif','lei051035.gif','lei051036.gif',
                'lei051037.gif','lei051038.gif','lei051039.gif','lei051040.gif'
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
	'綠巾',
	'http://emo.huhiho.com/set/greenscarf/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','13.gif','14.gif','15.gif',
		'16.gif','17.gif','18.gif','19.gif','20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif',
		'30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif','42.gif','43.gif',
		'44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',
        '51.gif','52.gif','53.gif','54.gif',
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
        'kuso',
        'http://s641.photobucket.com/albums/uu133/mark5468/kuso/',
        [
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',

        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',

        '021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',

        '031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',

        '041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif',

	'051.gif','052.gif','053.gif','054.gif','055.gif','056.gif','057.gif','058.gif','059.gif','060.gif',

        '061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif','069.gif','070.gif',
        
        '071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif','078.gif','079.gif','080.gif',
        
        '081.gif','082.gif','083.gif','084.gif','085.gif','086.gif','087.gif','088.gif','089.gif',
        
        '090.gif','091.gif','092.gif','093.gif','094.gif','095.gif','096.gif','097.gif',
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
	'柏夫',
	'http://emo.huhiho.com/set/bofu/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif','31.gif','32.gif','34.gif','35.gif','36.gif','37.gif','38.gif',
        '39.gif','40.gif','41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif',
        '48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif','56.gif',
        '57.gif','58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif','65.gif',
        '66.gif','67.gif','68.gif','69.gif','70.gif','71.gif','72.gif','73.gif','74.gif',
        '75.gif','77.gif','79.gif','80.gif','81.gif','82.gif','84.gif','85.gif','86.gif',
        '87.gif','88.gif','89.gif','90.gif','91.gif','92.gif','93.gif','94.gif','95.gif',
        '96.gif',
	]
]);

smileData.push([
	'UFO',
	'http://emo.huhiho.com/set/ufo/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif',
        '38.gif','39.gif','40.gif','41.gif','42.gif','43.gif','44.gif','45.gif','46.gif',
        '47.gif','48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif',
        '56.gif','57.gif','58.gif','59.gif','60.gif','61.gif',
	]
]);

smileData.push([
	'洋蔥頭',
	'http://plurksmile.googlecode.com/svn/trunk/images/onion/',
	[
		'ah.gif','ah2.gif','ah3.gif','angry.gif','angry2.gif','angry3.gif',
		'angry4.gif','angry5.gif','baby.gif','bath.gif','buddha.gif','bye.gif',
		'circle.gif','cold.gif','cold2.gif','cold3.gif','cold4.gif','comfortable.gif',
		'cool.gif','cry.gif','cry2.gif','cry3.gif','cry4.gif','dizzy.gif','faint.gif',
		'ghost.gif','glasses.gif','hand.gif','happiness.gif','hope.gif','idea.gif',
		'ill.gif','knife.gif','lol.gif','look.gif','love.gif','lovely.gif','music.gif',
		'nose.gif','oh2.gif','orz2.gif','pia.gif','question.gif','redcard.gif','runcry.gif',
		'shrug.gif','shy.gif','shy2.gif','shy3.gif','sleep.gif','smile.gif','smoke.gif',
		'soccer.gif','soccer2.gif','soccer3.gif','speed.gif','star.gif','sweat.gif',
		'sweatlove.gif','think.gif','vomit.gif','w.gif','wall.gif','wind.gif',
		'wind2.gif','wow.gif','xd.gif','yawn.gif','yellowcard.gif'
	]
]);

smileData.push([
    '兔子',
    'http://plurksmile.googlecode.com/svn/trunk/images/rabbit/',
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
	'悠嘻猴',
	'http://plurksmile.googlecode.com/svn/trunk/images/monkey/',
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
        'm83.gif','m84.gif','m85.gif','m86.gif','m87.gif','m88.gif','m89.gif','m90.gif','m91.gif',
        'm92.gif','m93.gif','m94.gif','m95.gif','m96.gif','m97.gif','m98.gif','m99.gif','m100.gif',
        'm101.gif','m102.gif','m103.gif','m104.gif','m105.gif','m106.gif','m107.gif','m108.gif','m109.gif',
        'm110.gif','m111.gif','m112.gif','m113.gif','m114.gif','m115.gif','m116.gif','m117.gif','m118.gif',
        'm119.gif','m120.gif','m121.gif','m122.gif','m123.gif','m124.gif','m125.gif','m126.gif','m127.gif',
        'm128.gif','m129.gif','m130.gif','m131.gif','m132.gif','m133.gif','m134.gif','m135.gif','m136.gif',
        'm137.gif','m138.gif','m139.gif','m140.gif','m141.gif','m142.gif','m143.gif','m144.gif','m145.gif',
        'm146.gif','m147.gif','m148.gif','m149.gif','m150.gif','m151.gif','m152.gif','m153.gif','m154.gif',
        'm155.gif','m156.gif','m157.gif','m158.gif','m159.gif','m160.gif','m161.gif','m162.gif','m163.gif',
        'm164.gif','m165.gif','m166.gif','m167.gif','m168.gif','m169.gif','m170.gif','m171.gif','m172.gif',
        'm173.gif','m174.gif','m175.gif','m176.gif','m177.gif','m178.gif','m179.gif'
	]
]);

smileData.push([
	'B&amp;T',
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
	'可愛兔',
	'http://emo.huhiho.com/set/cuterabbit/',
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
        '92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','99.gif',
        '100.gif','101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif',
        '109.gif','110.gif','111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif',
        '118.gif','119.gif','120.gif','121.gif','122.gif','123.gif','124.gif','125.gif','126.gif',
        '127.gif','128.gif','129.gif','130.gif','131.gif','132.gif','133.gif','134.gif','135.gif',
        '136.gif','137.gif','138.gif','139.gif',
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
	'01',
	'http://e.imagehost.org/',

		[
'0048/3TA.gif','0446/3W2.gif','0316/39q.gif','0493/5ec.gif','0796/5h7.gif','0195/5ns.gif',
'0097/5n3.gif','0005/5hw.gif','0399/5hx.gif','0802/5hs.gif', '0155/2I1.gif','0442/1ss.gif','0161/5dU.gif','0838/5eI.gif','0738/9AM.gif','0638/9AW.gif',
'0542/9B5.gif','0939/33H.gif','0342/gp.gif','0144/JE.gif','0815/Jp.gif',
'0023/39x.gif','0924/5gN.gif','0823/5mH.gif','0218/5gT.gif','0632/5nm.gif','0033/5hp.gif',
'0428/5mR.gif','0014/Hn.gif','0878/5gz.gif','0767/5mY.gif','0685/5g8.gif','0586/5hv.gif',
'0977/9AU.gif','0375/5ij.gif', '0950/bZ3.gif' ,'0960/ajv.gif','0983/84303rd.gif','0714/84305wt.gif',
'0624/79652rr.gif','0014/18927.gif','0422/18794.gif','0819/13389.gif','0615/13388.gif',
'0720/18620.gif','0065/bjk.gif','0257/74834wr.gif','0154/86.gif',
'0556/awz.gif','0800/bjy.gif','0626/cm.gif','0588/huh.gif'
	]


]);

smileData.push([
	'02',
	'http://e.imagehost.org/',
	[
		'0027/dnk.gif','0771/th_268.gif','0764/ch.gif','0429/pnt.gif',
'0895/a34.gif','0030/buu.gif',
'0390/3_17.gif',
'0291/4_11.gif','0681/4V0.gif','0545/fl.gif',
'0002/buh.gif','0930/sl.gif','0389/22_1.gif','0409/5hH.gif','0091/5px.gif','0390/9AP.gif',
'0798/ha.gif','0804/nham.gif','0499/hi.gif','0098/hel.gif','0712/cb.gif','0861/ih.gif','0761/bbb.gif',
'0562/nha.gif','0972/pato.gif','0865/5pq.gif','0271/5pr.gif',
'0167/5ia.gif','0346/5nh.gif','0806/5mP.gif','0333/bmq.gif','0706/9AX.gif','0504/sh.gif',
'0206/ok_7.gif','0308/hnf.gif',
'0010/zmb.gif','0865/o.gif','0412/t.gif',
'0814/gg.gif','0524/bb.gif','0632/bb.gif','0433/il.gif','0467/Jt.gif',
'0339/hi.gif','0165/guit.gif','0057/zzz.gif','0964/5ht.gif','0660/no.gif','0260/brb.gif',
'0266/pic.gif',
'0073/hm.gif','0745/5gd.gif'

	]
]);


smileData.push([
	'03',
	'http://a.imagehost.org/',
	[
		'0725/BJ.gif','0510/000.gif','0680/sh.gif','0448/5eJ.gif',
'0844/rad.gif','0749/af.gif',
'0150/dudu.gif',
'0056/esc.gif','0952/cof.gif','0856/th_pant.gif',
'0226/tel.gif','0979/antie3.gif','0063/ahn.gif','0062/ball.gif','0357/th.gif','0717/preso.gif',
'0664/koko.gif','0570/pint.gif',
'0459/pcof.gif','0262/cat.gif','0975/bts.gif','0651/ahh.gif','0163/nho.gif',
'0241/pz.gif','0628/no.gif','0040/nha.gif','0364/yes.gif',
'0738/who.gif',
'0565/hah.gif','0422/ppc.gif','0325/scd.gif','0114/hot.gif','0429/shower.gif',
'0726/drool.gif','0530/hi.gif',
'0325/fiu.gif','0140/hebad.gif',
'0284/hrt.gif',
'0293/pap.gif','0622/turt.gif','0325/cpt.gif','0021/tv.gif','0209/emo.gif',
'0928/esc.gif','0236/bee.gif','0130/mario.gif','0535/dudu.gif','0264/ask.gif','0167/vaka.gif',
'0565/hap1.gif',
'0968/grr.gif','0870/fome.gif'

	]
]);

smileData.push([
	'04',
	'http://a.imagehost.org/',
	[
		'0957/uu.gif','0985/022.gif','0391/0498emo-messbrasil.gif',
'0790/3191emo-messbrasil.gif',
'0686/alegre_imess_1.gif','0089/hud.png',
'0990/3027emo-messbrasil.png',
'0611/3085emo-messbrasil.gif','0012/693emo-messbrasil.gif',
'0291/ban.gif',
'0040/okk.gif','0620/brushteeth.gif','0022/em42.gif','0927/em40.gif',
'0371/em56.gif','0269/em46.gif',
'0676/3839emo-messbrasil.gif','0076/3855emo-messbrasil.gif',
'0973/3854emo-messbrasil.gif','0674/em53.gif','0083/unsbye.gif',
'0072/th_098.gif','0618/wootbye.gif',
'0925/th_umbrella.gif','0830/smile.png','0239/heartsplash2_sm.gif','0853/heart.gif',
'0370/bebye.gif',
'0775/hohbye.gif',


'0333/5pf.gif','0052/1vu.gif',
 '0941/JF.gif','0657/MZ.gif','0052/Jm.gif',
'0844/Jv.gif','0044/14p.gif','0352/Jt.gif',
'0460/Jq.gif','0671/Jn.gif',
'0579/oo.gif',
'0332/dent.gif','0135/hi.gif',
'0853/5nG.gif','0759/5hu.gif', '0255/5mU.gif','0650/5ph.gif','0862/5po.gif',
'0256/iT.gif','0427/6fr.gif','0602/5pp.gif',
'0658/yeah.gif','0068/no1.gif'

	]
]);


smileData.push([
	'05',
	'http://a.imagehost.org/',
	[
		'0722/5ed.gif','0926/4yu.gif','0334/5hC.gif','0229/cry.gif',
'0630/5ib.gif','0038/pisc.gif',
'0435/AK.gif',
'0235/5hy.gif','0846/5mL.gif','0563/49I.gif',
'0450/j9.gif','0352/5nF.gif','0761/iT.gif','0162/oh.gif','0067/5pv.gif','0469/5hL.gif',
'0655/bua.gif','0562/bah.gif',
'0855/cry.gif','0740/mimi.gif','0873/fura.gif','0272/anjo.gif','0171/ic.gif',
'0883/kir.gif','0793/chuv.gif','0499/bye.gif','0901/057.gif',
'0564/ih.gif',

'0804/tomara.gif','0334/5gH.gif','0607/hohoh.gif','0429/1a.gif','0457/1b.gif',
'0861/1c.gif','0754/1d.gif',
'0665/1f.gif','0977/1e.gif',
'0372/1g.gif',
'0768/1h.gif','0125/1j.gif','0748/1l.gif','0050/1m.gif','0951/1n.gif',
'0850/1o.gif','0749/1p.gif','0149/1q.gif','0049/1r.gif','0424/1s.gif','0366/1t.gif',
'0811/4E.gif',
'0932/5mS.png','0338/15w.gif'

	]
]);

smileData.push([
	'06',
	'http://',
	[
	'e.imagehost.org/0475/2_3.gif','e.imagehost.org/0382/64A.gif',
'e.imagehost.org/0285/bh.gif','e.imagehost.org/0691/bE3.gif','e.imagehost.org/0089/u7.gif',
		'e.imagehost.org/0293/u4.gif',
'e.imagehost.org/0513/bann_7.gif','e.imagehost.org/0373/u5.gif',
'plurk.cainanunes.com/creu1.gif',
		'plurk.cainanunes.com/creu2.gif',
'plurk.cainanunes.com/creu3.gif','plurk.cainanunes.com/creu4.gif',
'plurk.cainanunes.com/creu5.gif','plurk.cainanunes.com/Oo.gif',
'plurk.cainanunes.com/hohoho.gif',
	'plurk.cainanunes.com/nonono.gif ',
'plurk.cainanunes.com/apathetic.gif',
'plurk.cainanunes.com/coffee.gif','plurk.cainanunes.com/chimarrao.gif',
'plurk.cainanunes.com/beer.gif','plurk.cainanunes.com/draught_dark_beer.gif',
		'plurk.cainanunes.com/draught_beer.gif',
'plurk.cainanunes.com/white_wine.gif','plurk.cainanunes.com/blue_label.gif',
'plurk.cainanunes.com/green_label.gif','plurk.cainanunes.com/heart.gif',
'e.imagehost.org/0399/uhu.gif',
'e.imagehost.org/0212/pf.gif','e.imagehost.org/0606/bah1.gif',
'e.imagehost.org/0005/bua2.gif','e.imagehost.org/0119/u6.gif','e.imagehost.org/0191/bah.gif',
'e.imagehost.org/0091/pf.gif', 'e.imagehost.org/0483/xd_10.gif',
'e.imagehost.org/0902/hih.gif','e.imagehost.org/0598/lw.gif',
'e.imagehost.org/0234/lov.gif','e.imagehost.org/0532/huh1.gif','e.imagehost.org/0504/1rb.gif',
'a.imagehost.org/0902/174.gif','a.imagehost.org/0426/175.gif','a.imagehost.org/0820/17.gif',
'a.imagehost.org/0140/14_10.gif','a.imagehost.org/0234/11.gif','a.imagehost.org/0624/12.gif',
'a.imagehost.org/0936/13.gif','a.imagehost.org/0332/15.gif','a.imagehost.org/0727/16.gif',
'a.imagehost.org/0120/1_2.gif','a.imagehost.org/0059/179.gif',
'a.imagehost.org/0092/2_15.gif','a.imagehost.org/0496/3.gif'
	]
]);


smileData.push([
	'09',
	'http://www.ze-games.net/forum/images/smilies/',
	[
		'idea3.gif','search(2).gif','girl_cray.gif','spiteful.gif','mux3q0.gif','jester.gif',
 'kez_06.gif','party0020.gif','girl_cray3(2).gif','cheerful_h4h.gif',
 'angel.gif', 'licklips.gif','abejat2fs.gif',
		'mf_wave.gif','rasta.gif','unknw.gif','man_in_love.gif','banned2.gif',
		'clapping.gif','drink.gif','JC_golly.gif','rain.gif','slap2.gif','rofl.gif',
		'arrowhead.png','thumbsup_still.png','stun.gif','teens.gif',
'shy.gif','rm_shifty.gif',
		'surrender.gif','blind.gif','av-4.gif','oneeyed01.png','SHABLON_padonak_02.gif','bow_arrow.gif',
	            'sweatingbullets.gif','girl_crazy(2).gif','greedy.gif','spruce_up.gif','lock2.gif', 'bye2.gif','Mauridia_03.gif',
'no3.gif','babyandbear.gif','dontgetit.gif','on_the_quiet(2).gif','swhisper.gif',
'Laie_76Bmini.gif','help.gif','weird.gif','boxed2.gif'

	]
]);


smileData.push([
	'10',
	'http://www.ze-games.net/forum/images/smilies/',
	[
		'sarcastic_hand(2).gif','jamie.gif','mda(2).gif','to_keep_order.gif',
 'Laie_69.gif','i-m_so_happy(2).gif','girl_sigh(2).gif','tease(2).gif','hideingbhindcurtian.gif',
 'Laie_60Am.gif', 'crazy.gif','mf_witch.gif',
		'funce.gif','bad(2).gif','yes(2).gif','connie_08.gif','goku-s.gif','connie_32.gif',
		'cake.gif','shocking.gif','kiss(2).gif','loveletter.gif','wacko(4).gif','icon_cool.gif',
		'Vishenka_07.gif','bb(2).gif','read.gif','cryss.gif','v.gif','rofl2.gif',
		'sorry(2).gif','rubikt4ip.gif','icon_biggrin.gif','blum.gif','Just_Cuz_14.gif','lmfao.gif',
	            'lex_14.gif','lazy(2).gif','weirdo.gif','pleasantry(2).gif','helpsmilie.gif', 
'boxing.gif','resent.gif',
'shakehead.gif','yess(2).gif','heat(2).gif','mf_megaphone.gif','flautatvl7.gif','mama2287151iz.gif','Hyron_03.gif','beee.gif','uran_h4h.gif'

	]
]);

smileData.push([
	'11',
	'http://www.ze-games.net/forum/images/smilies/',
	[
		'Vishenka_26.gif','mf_apple.gif','cartman_h4h_sp.gif','smile1.gif',
 'shiftyeyes_anim.gif','sad(4).gif','snitch.png','superman2.gif','sharky.gif',
 'nono.gif', 'mf_type.gif','kilroy.gif',
		'sarcastic(2).gif','sad2.gif','mf_chieftain.gif','bomb2.gif','wink(3).gif','ireful2.gif',
		'mf_fez.gif','smartass.gif','afro2.gif','thmbup.gif','Vishenka_17.gif','winner_second_h4h.gif','alucard.gif','Vishenka_12.gif','Just_Cuz_08.gif','hmmph.gif','kez_09.gif','king.gif',
		'cry.gif','giggle.gif','icon_rolleyes.gif','pilot(2).gif','boat.gif','viannen_01.gif',
	            'to_take_umbrage.gif','girl_dance(2).gif','oneeyed02.png',
'Koshechka_08.gif','dance.gif', 'director.gif','snitch.gif',
'rtvs9.gif','timer.gif','give_heart.gif','stitchface.png','laugh2.gif','whistle3.gif','swoon2.gif',
'fruits_cherry.gif','drillsgt.gif'

	]
]);

smileData.push([
	'12',
	'http://www.ze-games.net/forum/images/smilies/',
	[
		'blush.gif','kez_11.gif','genial.gif','no7kw5.png.gif','kiss2.gif','tomato2.gif',
		'showoff.gif','english_en.gif','hooray.gif','mail2.gif','cool.png','yahoo.gif',
		'connie_rockingbaby.gif','blush02.gif','tender(2).gif','george.gif',
'obi-wan.gif','kez_01.gif',
		'snoozer_05.gif','secret.gif','63714.gif','yeah.gif','eat.gif','vishenka_20.gif',
		'kez_12.gif','bruce_h4h.gif',
'medicine.gif','ok.gif','yaisse.gif','mf_laughbounce.gif',
		'thank_you.gif','secret2.gif','beach(2).gif','icon9.gif','pacifierfight.gif',
'Vishenka_11.gif',
		'phone1.gif','music2(2).gif','sleeping_01.gif','pioneer_smoke.gif',
'duh.gif','console.gif',
		'Just_Cuz_29.gif','tooth.gif','peach.gif','catchfly.gif','whistle2.gif','gamer1.gif', 
		'girlchat.gif','beta.gif','tired.gif','Just_Cuz_32.gif'
	]
]);


smileData.push([
	'13',
	'http://www.ze-games.net/forum/images/smilies/',
	[
		'butterfly.gif','paratrooper.gif','icon3.gif','this(2).gif','dntknw.gif','spam.gif',
		'biker_h4h.gif','mf_charliechaplin.gif','Just_Cuz_30.gif','mf_leia.gif','popcorm1.gif','evo.gif',
		'lex_02.gif','sly.gif','kissing2.gif','trumpet.gif','sleeping_02.gif','cupcake.gif',
		'hang1.gif','girl_in_love(2).gif','umnik.gif','crying.gif','fear2.gif','capsmilie.gif',
		'spidey.gif','king2.gif','Just_Cuz_15.gif','tongue_tied_h4h.gif',
'kez_13.gif','crazyperson.gif',
		'close_tema.gif','livre.gif','sad3.gif',
'girl_impossible(2).gif','russian_roulette.gif','Just_Cuz_13.gif',
		'kez_02.gif','woodyfly1.gif','wink2.gif',
'princess_h4h.gif','bruce_h4h.gif','tommy.gif',
		'yu(2).gif','who-let-rip.png','lex_13.gif',
'Vishenka_09.gif','pogranichnik.gif','new_russian.gif',
		'mf_kamikaze.gif','wizard.gif','kez_16.gif',
'unknw(2).gif'
	]
]);


smileData.push([
	'14',
	'http://www.ze-games.net/forum/images/smilies/',
	[
                        'lac.gif','rohan.gif','girl_hide(2).gif','Laie_73.gif',
		'whaa.png','Sneaktongue.gif','ph34r.gif','basketball.gif','kez_10.gif','yikes.gif',
		'hmmph02.png','sneaky.gif','dopey_h4h.gif','thumbs_up.gif',
'superstition(2).gif','nea.gif',
		'alcoholic.gif','angel.png','Just_Cuz_26.gif',
'wacko2(2).gif','Vishenka_08.gif','hair.gif',
		'mf_bluesbrother.gif',
'ike_sp_h4h.gif','telephone.gif','walkman.gif','ph34r_anim.gif','Hyron_02.gif',
		'trampoline.gif','anakin.gif','JC_frankie.gif',
'girl_wacko(2).gif','kyle_h4h_sp.gif','garrison_h4h_sp.gif',
		'insane.gif','detective2.gif','pioneer.gif','fishing_h4h.gif','hockey1.gif',
'Laie_20.gif',
		'lilo_h4h.gif','pokerface.gif','big_boss.gif','kwasny.gif','mf_aussie.gif','confused02.png',
		'party.gif','mf_monkey.gif','Just_Cuz_35.gif','dance4(2).gif',
'mf_viking.gif','good(4).gif'
	]
]);


smileData.push([
    '15',
	'http://www.ze-games.net/forum/images/smilies/',
    [
        'rap.gif','oneeyed02.png','fool.gif','ireful1.gif','icon5.gif','upsidedown.gif',
'connie_girl_cleanglasses.gif','mr47_02.gif','grrr.gif',
        'axehead.png','chef.gif','medieval.gif','han-solo.gif','pray.gif','hat.gif','not_i.gif',
        'boredom(2).gif','yes3.gif','dontgetit.gif','drag.gif','sun_bespectacled.gif',
'stan_h4h_sp.gif','mf_medusa.gif','mwah1.gif',
        'baby.gif','patsak.gif','Just_Cuz_21.gif','evilguy.gif','kez_17.gif','superman.gif','cook.gif',
        'girl_prepare_fish(2).gif','girl_drink1.gif','blind.gif',
'Mauridia_02.gif','download.gif','to_become_senile.gif','cheff.gif',
        'ok(2).gif','angry2.gif',
'fever.gif','idea2.gif','smackhead.gif','neo.gif','tap3.gif',
'Just_Cuz_19.gif','wallace.gif','mamba.gif','connie_2.gif','Laie_16.gif',
'lex_04.gif','turned.gif'

    ]
]);


smileData.push([
    '16',
    'http://www.mysmiley.net/imgs/smile/',
    [
        'confused/confused0004.gif','indifferent/indifferent0019.gif','animals/animal0002.gif',
'happy/happy0023.gif','innocent/innocent0001.gif','winking/winking0067.gif',
'animated/anim_64.gif',
'love/love0025.gif','love/love0046.gif',
        'love/love0044.gif','love/love0078.gif','rolleye/rolleye0006.gif',
'rolleye/rolleye0015.gif','rolleye/rolleye0017.gif','rolleye/rolleye.gif','cool/cool0007.gif',
        'cool/cool0043.gif','sad/sad0020.gif','sad/sad0016.gif','sad/sad0043.gif','sad/sad0047.gif',
'sad/sad0056.gif','sad/sad0100.gif','sad/sad0078.gif',
        'sad/sad0148.gif','sad/sad0122.gif','sign/sign0067.gif','sign/sign0059.gif',
'sign/sign0107.gif','sign/sign0117.gif','sign/sign0118.gif',
        'sign/sign0127.gif','sign/sign0120.gif','sign/sign0180.gif','sign/sign0189.gif',
'indifferent/indifferent0018.gif','sign/sign0201.gif','sign/sign0196.gif',
        'happy/happy0040.gif','happy/happy0038.gif','happy/happy0058.gif',
'happy/happy0029.gif','happy/happy0089.gif','happy/happy0206.gif','happy/happy0187.gif',
'happy/happy0168.gif','animals/animal0060.gif','animals/animal0036.gif',
'winking/winking0016.gif','winking/winking0063.gif','winking/winking0070.gif','sick/sick0002.gif'

    ]
]);

smileData.push([
    '17',
    'http://www.mysmiley.net/imgs/smile/',
    [
        'love/love0004.gif','angel/angel04.gif','love/love0033.gif','mad/mad0050.gif','indifferent/indifferent0008.gif',
'mad/mad0215.gif','angel/jesus.gif',
'mad/mad0217.gif','angel/cupid.gif',
'angel/bow2.gif','mad/mad0235.gif','angel/angeldevil.gif','mad/mad0270.gif','angel/angel02.gif',
'angel/beeangel.gif','angel/whiteangel.gif',
'characters/character0029.gif','characters/character0017.gif','happy/happy0099.gif',
'animated/anim_37.gif','characters/character0147.gif',
'characters/character0144.gif', 'happy/happy0124.gif','happy/happy0159.gif',
'happy/happy0098.gif','characters/character0201.gif','characters/character0203.gif',
'characters/character0178.gif','characters/character0164.gif','characters/character0163.gif',
'happy/happy0120.gif', 'happy/happy0133.gif','characters/character0205.gif','characters/character0242.gif',
'happy/happy0207.gif','happy/happy0175.gif','happy/happy0171.gif','happy/happy0173.gif',
'happy/happy0191.gif','happy/happy0190.gif','animals/animal0009.gif','animals/animal0048.gif',
'animals/animal0070.gif','happy/happy0206.gif','animals/animal0045.gif',
'happy/happy0178.gif','animated/anim_40.gif','animated/anim_44.gif',
'animated/anim_35.gif','animated/anim_48.gif','party/party0009.gif','tongue/tongue0007.gif'

    ]
]);

smileData.push([
    '18',
    ' http://',
    [
        'mysmiley.net/imgs/smile/sign/sign0031.gif','mysmiley.net/imgs/smile/sign/sign0036.gif',
'mysmiley.net/imgs/smile/sign/sign0046.gif','mysmiley.net/imgs/smile/sign/sign0032.gif',
'mysmiley.net/imgs/smile/sign/sign0037.gif',
'mysmiley.net/imgs/smile/sign/sign0042.gif','mysmiley.net/imgs/smile/sign/sign0047.gif',
'mysmiley.net/imgs/smile/sign/sign0033.gif','mysmiley.net/imgs/smile/sign/sign0038.gif',
'mysmiley.net/imgs/smile/sign/sign0043.gif','mysmiley.net/imgs/smile/sign/sign0048.gif',
'mysmiley.net/imgs/smile/sign/sign0039.gif','mysmiley.net/imgs/smile/sign/sign0028.gif',
'mysmiley.net/imgs/smile/sign/sign0029.gif',
'mysmiley.net/imgs/smile/sign/sign0030.gif','mysmiley.net/imgs/smile/sign/sign0049.gif',
'mysmiley.net/imgs/smile/sign/sign0044.gif','mysmiley.net/imgs/smile/sign/sign0035.gif',
'mysmiley.net/imgs/smile/sign/sign0050.gif','mysmiley.net/imgs/smile/sign/sign0045.gif',
'mysmiley.net/imgs/smile/sign/sign0040.gif',
'mysmiley.net/imgs/smile/sign/sign0035.gif','mysmiley.net/imgs/smile/sign/sign.gif',
'mysmiley.net/imgs/smile/sign/sign0051.gif','a.imagehost.org/0829/BRB.gif',
'a.imagehost.org/0130/WTF.gif', 'mysmiley.net/imgs/smile/sign/sign0075.gif',
'mysmiley.net/imgs/smile/sign/sign0053.gif','mysmiley.net/imgs/smile/sign/sign0061.gif',
'mysmiley.net/imgs/smile/sign/sign0069.gif','mysmiley.net/imgs/smile/sign/sign0052.gif',
'mysmiley.net/imgs/smile/sign/sign0068.gif',
'mysmiley.net/imgs/smile/scared/scared0014.gif',
'mysmiley.net/imgs/smile/indifferent/indifferent0023.gif',
'mysmiley.net/imgs/smile/animated/anim_13.gif','mysmiley.net/imgs/smile/sign/sign0133.gif',
'mysmiley.net/imgs/smile/sign/sign0185.gif','mysmiley.net/imgs/smile/scared/scared0013.gif',
'mysmiley.net/imgs/smile/sign/sign0203.gif','mysmiley.net/imgs/smile/love/love0049.gif',
'mysmiley.net/imgs/smile/love/love0043.gif','mysmiley.net/imgs/smile/love/love0083.gif',
'mysmiley.net/imgs/smile/sad/sad0049.gif',
'mysmiley.net/imgs/smile/sad/sad0025.gif',
'mysmiley.net/imgs/smile/confused/confused0093.gif',
'mysmiley.net/imgs/smile/angel/angel05.gif',
'mysmiley.net/imgs/smile/confused/confused0085.gif',
'mysmiley.net/imgs/smile/confused/confused0081.gif',
'mysmiley.net/imgs/smile/sick/sick0012.gif',
'mysmiley.net/imgs/smile/sick/sick0001.gif','mysmiley.net/imgs/smile/party/party0037.gif',
'mysmiley.net/imgs/smile/party/party0052.gif'

    ]
]);


smileData.push([
	'19',
	'http://a.imagehost.org/',
	[
		'0080/hug.gif','0378/gnaw.gif','0285/luvbite.gif','0685/abra.gif',
'0096/flower.gif','0478/inluv.gif',
'0388/kiss2.gif','0792/squee.gif',
'0376/avoiding-eyecontact.gif','0611/heart.gif','0011/hugmeplz.gif','0406/loser.gif',
'0306/talktowall.gif','0215/manhug.gif','0619/luv.gif','0517/winknudge.gif',
'0154/badday.gif','0557/finger.gif','0471/luvpat.gif','0371/sheepish.gif','0765/bla.gif',
'0663/b54.gif','0465/b25.gif','0266/b18.gif',
'0270/th_juggle.gif','0551/wink.gif','0925/hi.gif',
'0323/kaku.gif','0736/kiss.gif','0647/yes.gif',
'0268/crau.gif','0011/gl2.gif','0606/gah.gif','0005/vei.gif','0406/tf.gif','0817/niver.gif',
'0221/bu.gif','0614/gaio.gif',
'0019/panic.gif','0732/nsei.gif','0965/sh.gif','0272/secret.gif','0664/pan1.gif','0569/crazy.gif',
'0959/byby.gif','0772/peru.gif','0988/th_mwahaha.gif','0687/gr.gif',
'0448/soap.gif','0493/sos.gif',
'0295/viol.gif','0081/musc.gif'

	]
]);

smileData.push([
	'20',
	'http://',
	[
		'a.imagehost.org/0885/verg.gif','a.imagehost.org/0677/th_bow-1.gif',
'a.imagehost.org/0292/dead.gif','a.imagehost.org/0665/fiu.gif',
'a.imagehost.org/0061/gr.gif','a.imagehost.org/0956/mr.gif',
'a.imagehost.org/0870/ok.gif','a.imagehost.org/0276/pam.gif',
'a.imagehost.org/0167/ui.gif','a.imagehost.org/0072/sorry.gif',
'www.mysmiley.net/imgs/smile/confused/confused0024.gif',
'mysmiley.net/imgs/smile/love/love0028.gif','mysmiley.net/imgs/smile/love/love0047.gif',
'mysmiley.net/imgs/smile/love/love0043.gif','mysmiley.net/imgs/smile/love/love0054.gif',
'mysmiley.net/imgs/smile/love/love0087.gif',
'mysmiley.net/imgs/smile/love/love0065.gif',
'mysmiley.net/imgs/smile/indifferent/indifferent0028.gif',
'a.imagehost.org/0248/blush.gif',
'a.imagehost.org/0783/th_adoration.gif','a.imagehost.org/0557/th_compassion.gif',
'a.imagehost.org/0950/th_glomp.gif','a.imagehost.org/0351/th_hungry.gif',
'a.imagehost.org/0257/th_handshake.gif',
'a.imagehost.org/0152/th_hump.gif','a.imagehost.org/0555/th_flirty.gif',
'a.imagehost.org/0956/th_happy-1.gif',
'a.imagehost.org/0527/th_lmao-1.gif',
'a.imagehost.org/0648/th_teevee.gif',
'a.imagehost.org/0552/th_reading.gif',
'a.imagehost.org/0452/th_sentimental.gif','a.imagehost.org/0351/th_slyfart.gif',
'a.imagehost.org/0160/th_strong.gif','a.imagehost.org/0564/th_cuddle.gif',
'a.imagehost.org/0963/th_sadness.gif','a.imagehost.org/0403/th_laughing-1.gif',
'a.imagehost.org/0190/th_drooling.gif','a.imagehost.org/0591/th_nod-1.gif',
'a.imagehost.org/0988/th_mwahaha.gif',
'a.imagehost.org/0398/th_licking.gif',
'a.imagehost.org/0793/th_helpful.gif',
'a.imagehost.org/0187/th_jealous.gif','a.imagehost.org/0597/th_typerhappy.gif',
'a.imagehost.org/0987/th_whisper.gif','a.imagehost.org/0822/th_wave.gif',
'a.imagehost.org/0610/th_meditate.gif','a.imagehost.org/0716/th_yawnstretch.gif',
'a.imagehost.org/0514/th_zeal.gif',
'a.imagehost.org/0414/th_omfg.gif','a.imagehost.org/0710/th_shakefist.gif',
'a.imagehost.org/0621/th_paranoid.gif','a.imagehost.org/0404/th_ohmygod.gif'

	]
]);


smileData.push([
	'21',
	'http://',
	[
		'a.imagehost.org/0086/th_date.gif','a.imagehost.org/0873/please.gif',
'a.imagehost.org/0886/th_aroused.gif','a.imagehost.org/0841/th_lick.gif',
'a.imagehost.org/0279/th_squee_by_Synfull.gif',
'a.imagehost.org/0911/0625emo-messbrasil.gif',
'a.imagehost.org/0576/fail.gif','a.imagehost.org/0171/th_heartbreaker.gif',
'a.imagehost.org/0490/Asdf.png',
'a.imagehost.org/0894/sarcasticclap.gif','a.imagehost.org/0239/8D.gif',
'a.imagehost.org/0178/loveing.gif','a.imagehost.org/0618/hatelove.gif',
'a.imagehost.org/0520/Pat_Emote_by_eStunt.gif',
'a.imagehost.org/0416/nutkick.gif','a.imagehost.org/0718/thanks.gif',
'a.imagehost.org/0119/lovepoke.gif','a.imagehost.org/0511/giggle.gif',
'a.imagehost.org/0896/facepalm_2.gif',
'a.imagehost.org/0454/gif.gif','a.imagehost.org/0364/D.gif',
'a.imagehost.org/0259/Dry.png',
'a.imagehost.org/0657/fluffy.gif','a.imagehost.org/0575/dunlookatmelikethat.gif',
'a.imagehost.org/0968/lovedup.png',
'a.imagehost.org/0857/nosepoke.gif',
'a.imagehost.org/0515/C_by_Caeser1993.gif','a.imagehost.org/0564/th_strip.gif',
'a.imagehost.org/0884/fear.gif','a.imagehost.org/0852/aww.gif',
'a.imagehost.org/0844/avoiding-eyecontact.gif',
'a.imagehost.org/0243/animesweat.gif','a.imagehost.org/0140/hatsoff.gif',
'a.imagehost.org/0950/grumpy.gif','a.imagehost.org/0346/cheerleader.gif',
'a.imagehost.org/0750/kiss.gif','a.imagehost.org/0656/O_o.gif',
'a.imagehost.org/0148/th_boing.gif',
'a.imagehost.org/0216/th_comfort.gif',
'a.imagehost.org/0103/th_faint.gif','a.imagehost.org/0020/th_sneeze.gif',
'a.imagehost.org/0414/th_slap-1.gif','a.imagehost.org/0323/th_shh.gif',
'a.imagehost.org/0617/th_tunes-1.gif','a.imagehost.org/0717/th_threaten.gif',
'a.imagehost.org/0997/th_clone.gif','a.imagehost.org/0107/th_bye.gif',
'a.imagehost.org/0011/th_bonk.gif',
'a.imagehost.org/0908/th_crying.gif','a.imagehost.org/0808/th_dizzy.gif',
'a.imagehost.org/0712/th_dohtwo.gif','a.imagehost.org/0348/bucktooth2.gif'
]
]);

smileData.push([
	'22',
	'http://',
	[
                                            'f.imagehost.org/0694/01_1.gif','f.imagehost.org/0573/02.gif',
'f.imagehost.org/0714/03_6.gif','f.imagehost.org/0332/04_9.gif',
'f.imagehost.org/0584/015.gif','f.imagehost.org/0742/character11.gif',
'f.imagehost.org/0289/cool0019.gif','f.imagehost.org/0034/tn_36445_d9a5eb5a5e069d29997f822a9373bd08.gif',
'f.imagehost.org/0422/fighting0057.gif','f.imagehost.org/0807/04ho6.gif',
'f.imagehost.org/0148/1225.gif','f.imagehost.org/0158/Mini-Hello022.gif',
'f.imagehost.org/0643/anim_26.gif','f.imagehost.org/0366/bandaid-amarelo.gif',
'f.imagehost.org/0899/BunnyLoveBench.gif','f.imagehost.org/0097/camera2.gif',
'f.imagehost.org/0330/char19.gif','f.imagehost.org/0195/dataehora.gif',
'f.imagehost.org/0255/e1.gif','f.imagehost.org/0608/emo10.gif',
'f.imagehost.org/0465/MiniGifSapo04.gif','f.imagehost.org/0454/mouse.gif',
'f.imagehost.org/0248/onpu26.gif','f.imagehost.org/0134/pixel144-1.gif',
'f.imagehost.org/0233/senpuki02.gif','f.imagehost.org/0954/tv-pink.gif',
'g.imagehost.org/0613/bj.gif','g.imagehost.org/0884/1aaa.gif',
'g.imagehost.org/0840/1b.gif','g.imagehost.org/0117/briga.gif',
'g.imagehost.org/0392/bua.gif','g.imagehost.org/0849/by.gif',
'g.imagehost.org/0049/cons.gif','g.imagehost.org/0555/esc.gif',
'g.imagehost.org/0543/fluffy.gif','g.imagehost.org/0712/grrr.gif',
'g.imagehost.org/0540/palm.gif','g.imagehost.org/0436/ri.gif',
'g.imagehost.org/0824/rs.gif','g.imagehost.org/0787/smil.gif',
'g.imagehost.org/0753/th_030.gif','g.imagehost.org/0631/th_typerhappy.gif',
'g.imagehost.org/0747/th_Writing_emoticon_by_eburt.gif','g.imagehost.org/0785/uhu.gif',
'g.imagehost.org/0901/uhuu.gif','f.imagehost.org/0359/ahn3.gif','g.imagehost.org/0863/dan.gif',
'f.imagehost.org/0213/pil.gif','f.imagehost.org/0202/s22.gif','g.imagehost.org/0794/nhas2.gif',
'f.imagehost.org/0471/morri.gif','f.imagehost.org/0566/limp.gif','f.imagehost.org/0578/ler.gif',
'g.imagehost.org/0653/grrrr.gif','g.imagehost.org/0619/grr.gif','g.imagehost.org/0478/gn3.gif',

]
]);



smileData.push([
	'23',
	'http://',
	[                      'g.imagehost.org/0076/c1.gif','f.imagehost.org/0921/c2.gif','f.imagehost.org/0590/c3_10.gif',
'f.imagehost.org/0255/c4.gif','f.imagehost.org/0228/c5.gif','f.imagehost.org/0164/c6.gif',
'f.imagehost.org/0172/c7.gif','g.imagehost.org/0665/c8.gif','g.imagehost.org/0393/c9.gif',
'g.imagehost.org/0427/leit.gif','g.imagehost.org/0575/MamegomaHappy.gif',
'f.imagehost.org/0912/MamegomaInLove.gif',
'f.imagehost.org/0997/MamegomaLaugh.gif','f.imagehost.org/0194/MamegomaShocked.gif',
'f.imagehost.org/0438/MamegomaSleep.gif',
'f.imagehost.org/0172/MamegomaWtf.gif','f.imagehost.org/0238/th_morri.gif',
'f.imagehost.org/0369/kao_blush.gif','g.imagehost.org/0958/kao_cheering.gif',
'f.imagehost.org/0908/kao_confused.gif','f.imagehost.org/0557/kao_cool.gif',
'f.imagehost.org/0707/kao_cry.gif','f.imagehost.org/0253/kao_kiss.gif',
'f.imagehost.org/0344/kao_laughing.gif','g.imagehost.org/0851/kao_love.gif',
'g.imagehost.org/0806/kao_mad.gif','f.imagehost.org/0999/kao_mouth_shut.gif',
'f.imagehost.org/0846/kao_sad.gif','f.imagehost.org/0901/kao_shocked.gif',
'f.imagehost.org/0392/kao_sweat.gif','g.imagehost.org/0178/kao_wink.gif',
'g.imagehost.org/0888/Ahh_1.png','g.imagehost.org/0038/amused.gif','f.imagehost.org/0036/bar.gif',
'g.imagehost.org/0582/imessenger_emo_banana_40.gif','g.imagehost.org/0027/iaa.gif',
'f.imagehost.org/0029/imessenger_emo_banana_41.gif','g.imagehost.org/0803/imessenger_emo_banana_44.gif',
'g.imagehost.org/0615/imessenger_emo_banana_74.gif','g.imagehost.org/0464/imessenger_emo_banana_79.gif',
'g.imagehost.org/0953/imessenger_emo_banana_82.gif','g.imagehost.org/0604/th_Good_night_by_viskot.gif',
'g.imagehost.org/0604/th_confused_by_Freesong.gif','f.imagehost.org/0877/th_yaay.gif',

]
]);

smileData.push([
	'24',
	'http://www.kittynpink.com/scripts/emoticons/',
	[  
'1.gif', '2.gif', '3.gif', '4.gif', '5.gif', '6.gif', '7.gif', '8.gif', '9.gif', '10.gif',
'11.gif', '12.gif', '13.gif', '14.gif', '15.gif', '16.gif', '17.gif', '18.gif', '19.gif', '20.gif',
'21.gif', '22.gif', '23.gif', '24.gif', '25.gif', '26.gif', '27.gif', '28.gif', '29.gif', '30.gif',
'31.gif', '32.gif', '33.gif', '34.gif', '35.gif', '36.gif', '37.gif', '38.gif', '39.gif', '40.gif',
'41.gif', '42.gif', '43.gif', '44.gif', '45.gif', '46.gif', '47.gif', '48.gif', '49.gif', '50.gif',
'51.gif', '52.gif', '53.gif', '54.gif', '55.gif', '56.gif', '57.gif', '58.gif', '59.gif', '60.gif',
'61.gif', '62.gif', '63.gif', '64.gif', '65.gif', '66.gif', '67.gif', '68.gif', '69.gif', '70.gif',
'71.gif', '72.gif', '73.gif', '74.gif', '75.gif', '76.gif', '77.gif', '78.gif', '79.gif', '80.gif',
'81.gif', '82.gif', '83.gif', '84.gif', '85.gif', '86.gif', '87.gif', '88.gif', '89.gif', '90.gif',
'91.gif', '92.gif', '93.gif', '94.gif', '95.gif', '96.gif', '97.gif', '98.gif', '99.gif', '100.gif',
'101.gif', '102.gif', '103.gif', '104.gif', '105.gif', '106.gif', '107.gif', '108.gif', '109.gif', '110.gif',
'111.gif', '112.gif', '113.gif', '114.gif', '115.gif', '116.gif', '117.gif', '118.gif', '119.gif', '120.gif',

]
]);
smileData.push([
	'TinyPic',
	'http://s5.tinypic.com/',
	[
		'qrgg2v.jpg','et8kra.jpg','fdrci8.jpg','6rr7r5.jpg','2d0ckes.jpg','24azur8.jpg','2gwry1w.jpg'
	]
]);
smileData.push([
	'亂拼',
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
    '兔包',
    'http://i727.photobucket.com/albums/ww272/cchien/',
    [
    '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif',
    '007.gif','008.gif','009.gif','010.gif','011.gif','012.gif','013.gif',
    'meetu-bye.gif','meetu-cr.gif','meetu-h.gif','meetu-lau.gif','meetu-piss.gif',
    'meetu-Q.gif','meetu-t.gif','tubao_2sad.gif','tubao_blue.gif','tubao_fan.gif',
    'tubao_mad.gif','tubao_mad2.gif','tubao_Q.gif','tubao_S.gif','tubao_shy.gif',
    'Dawan_01.gif','Dawan_02.gif','Dawan_03.gif','Dawan_04.gif','Dawan_04-1.gif',
    'Dawan_05.gif','Dawan_06.gif','Dawan_07.gif','Dawan_08.gif','Dawan_09.gif',
    'emoicon-aivan_01.gif','emoicon-aivan_02.gif','emoicon-aivan_03.gif',
    'emoicon-aivan_04.gif','emoicon-aivan_05.gif',
    'emoicon-aivan_06.gif','emoicon-aivan_07.gif','fat_01.gif','fat_02.gif','fat_03.gif',
    'Kuma_bye.gif','Kuma_exersice.gif','Kuma_hawaii.gif','Kuma_yes.gif','Kuma_05.gif',
    'Kuma_06.gif','Kuma_07.gif','Kuma_08.gif','Kuma_09.gif'
    ]
]);

smileData.push([
    '兔子',
    'http://plurksmile.googlecode.com/svn/trunk/images/rabbit/',
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
	'悠嘻猴',
	'http://plurksmile.googlecode.com/svn/trunk/images/monkey/',
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
        'm83.gif','m84.gif','m85.gif','m86.gif','m87.gif','m88.gif','m89.gif','m90.gif','m91.gif',
        'm92.gif','m93.gif','m94.gif','m95.gif','m96.gif','m97.gif','m98.gif','m99.gif','m100.gif',
        'm101.gif','m102.gif','m103.gif','m104.gif','m105.gif','m106.gif','m107.gif','m108.gif','m109.gif',
        'm110.gif','m111.gif','m112.gif','m113.gif','m114.gif','m115.gif','m116.gif','m117.gif','m118.gif',
        'm119.gif','m120.gif','m121.gif','m122.gif','m123.gif','m124.gif','m125.gif','m126.gif','m127.gif',
        'm128.gif','m129.gif','m130.gif','m131.gif','m132.gif','m133.gif','m134.gif','m135.gif','m136.gif',
        'm137.gif','m138.gif','m139.gif','m140.gif','m141.gif','m142.gif','m143.gif','m144.gif','m145.gif',
        'm146.gif','m147.gif','m148.gif','m149.gif','m150.gif','m151.gif','m152.gif','m153.gif','m154.gif',
        'm155.gif','m156.gif','m157.gif','m158.gif','m159.gif','m160.gif','m161.gif','m162.gif','m163.gif',
        'm164.gif','m165.gif','m166.gif','m167.gif','m168.gif','m169.gif','m170.gif','m171.gif','m172.gif',
        'm173.gif','m174.gif','m175.gif','m176.gif','m177.gif','m178.gif','m179.gif'
	]
]);

smileData.push([
	'BT',
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
				var rp = $('<a href="#" id="RePlurk">轉貼此噗</a>').css('float','right').css('right-padding','4px').click(function(){
					doRePlurk(owner_id,raw,link);


				});

				pp.after(rp);
			}

		}
	}
}


function doRePlurk(owner_id,raw,link){
	var nick = uw.SiteState.getUserById(owner_id).nick_name;

	$('#input_big').val(link + ' ([原噗]) ' + ((nick) ? ( ' by ' + '@' + nick + ': ') : '') + raw);
	p._removeExpand();
	uw.MaxChar.updateBig();
}









//== 日曆 ==//
(function (window) {
_time="23:59:59"
function buildCal(m, y, cM, cH, cDW, cD, brdr){
var mn=['January','February','March','April','May','June','July','August','September','October','November','December'];
var dim=[31,0,31,30,31,30,31,31,30,31,30,31];
var oD = new Date(y, m-1, 1); //DD replaced line to fix date bug when current day is 31st
oD.od=oD.getDay()+1; //DD replaced line to fix date bug when current day is 31st

var todaydate=new Date() //DD added
var tday=new Date(todaydate.getFullYear(),todaydate.getMonth(),todaydate.getDate());
todaytime=tday.getTime()/1000;

var scanfortoday=(y==todaydate.getFullYear() && m==todaydate.getMonth()+1)? todaydate.getDate() : 0 //DD added

dim[1]=(((oD.getFullYear()%100!=0)&&(oD.getFullYear()%4==0))||(oD.getFullYear()%400==0))?29:28;
var t='<div ><table class="'+cM+'" cols="7" cellpadding="0" border="'+brdr+'" cellspacing="0"><tr align="center">';
t+='<td colspan="7" align="center" class="'+cH+'">'+'<a class="prev" href="javascript:updateCalendar('+(m-1)+','+y+')">&nbsp;&nbsp;</a>'+mn[m-1]+' - '+y+'<a class="next" href="javascript:updateCalendar('+(m+1)+','+y+')">&nbsp;&nbsp;</a>'+'</td></tr><tr align="center">';
for(s=0;s<7;s++)t+='<td class="'+cDW+'">'+"SMTWTFS".substr(s,1)+'</td>';
t+='</tr><tr align="center">';
for(i=1;i<=42;i++){
var x=((i-oD.od>=0)&&(i-oD.od<dim[m-1]))? i-oD.od+1 : '&nbsp;';
ddd=x;

var beforetoday=new Date(y,m-1,ddd)
beforetime=beforetoday.getTime()/1000;

if(beforetime){
	//alert(ddd+":"+todaytime+"-"+beforetime);
	//alert(beforetoday.getTime());
	if(beforetime>todaytime){
	beforecheck=true;
	}else{
	beforecheck=false;
	}
}
if (x==scanfortoday) //DD added
x='<span id="today">'+x+'</span>' //DD added
if(ddd== '&nbsp;'||beforecheck){
t+='<td class="'+cD+'"><span id="future">'+x+'</span></td>';
}else{
//+','+m+','+ddd
t+='<td class="'+cD+'">'+'<a href="javascript:godate('+y+','+m+','+ddd+')" target="_top">'+x+'</a>'+'</td>';
}

if(((i)%7==0)&&(i<36))t+='</tr><tr align="center">';
}
return t+='</tr></table></div><div class="apmdiv"><a href="javascript:changeApm()" id="apm">PM</a></div>';
}


function showCalendar(gomonth)
	{
	
	//
	var showdate = document.createElement('script');
	showdate.setAttribute('language','JavaScript');
    showdate.setAttribute('src','http://rein.murmur.in/plurk/showcal_v2.js');  
	document.getElementsByTagName('head')[0].appendChild(showdate);    
	var style = document.createElement('link');
    style.setAttribute('href','http://rein.murmur.in/plurk/dark.css');
    style.setAttribute('rel','stylesheet');
    style.setAttribute('type','text/css');
    document.getElementsByTagName('head')[0].appendChild(style);

	var calbox = document.getElementById('dash-additional-info')
	var todaydate=new Date()
	var curmonth=todaydate.getMonth()+1+gomonth //get current month (1-12)
	var curyear=todaydate.getFullYear() //get current year
	var content=buildCal(curmonth ,curyear, "main", "month", "daysofweek", "days", 0);
	var element = document.createElement('div');
	element.setAttribute('id','calendar');
	element.setAttribute('class','night');
	element.innerHTML=content;
	//element.innerHTML+="<a href='javascript:updateCalendar("+(curmonth+1)+","+curyear+")'>next</a> /<a href='javascript:updateCalendar("+(curmonth-1)+","+curyear+")'>next</a> ";
	calbox.appendChild(element);	
	}

window.addEventListener("load", function(){
	setTimeout(function(){
	if(document.getElementById('plurk_form').style.display=='none'){}else{showCalendar(0);}
	},2000);

}, false);

})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);






// Plurk Translator                       v1.2    2009.03.21//


(function( ) {

function xpath(query) {
    var elems = document.evaluate(query, document, null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var ret = []
    for (var i = 0; i < elems.snapshotLength; i++) {
        ret.push(elems.snapshotItem(i));
    }
    return ret;
}

function xpath_map(query, fn) {
    var elements = xpath(query);
    for (var i = 0; i < elements.length; i++) {
        fn(elements[i]);
    }
}

function translate(str, lang, callback) {
    url = 'http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q=' +
          escape(str) + '&langpair=%7Czh-TW';
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            Referer: document.location
        },
        onload: function(response) {
            callback(eval('(' + response.responseText + ')'));
        }
    });
}

function translate_plurk(text_holder) {
    txt = text_holder.innerHTML;
    translate(txt, 'en', function (response) {
        text_holder.innerHTML = response.responseData.translatedText;
    });
}

function translate_responses() {
    xpath_map("//div[@class='list']//*//div[@class='text_holder']",
        function(text_holder) {
            translate_plurk(text_holder);
        });
}

function create_translate_link(text_holder) {
    var div = document.createElement('div');
    div.style.textAlign='right';
    div.className = 'translate';
    var a = document.createElement('a');
    a.innerHTML = "&#9658";
    a.addEventListener('click', function(evt) {
            translate_plurk(text_holder);
            translate_responses();
            evt.stopPropagation();
    }, false);
    div.appendChild(a);
    text_holder.parentNode.insertBefore(div, text_holder.nextSibling);
}

function has_parent(elem, name, cls) {
    while (elem.parentNode) {
        if (elem.parentNode.tagName == name.toUpperCase() &&
            elem.parentNode.className == cls)
        {
            return true;
        }
        elem = elem.parentNode;
    }
    return false;
}

setInterval(function () {
    xpath_map("//div[contains(@class, 'text_holder')]",
        function(text_holder) {
            if (text_holder.nextSibling &&
                text_holder.nextSibling.className == "translate")
            {
                return;
            }
            if (has_parent(text_holder, 'div', 'plurk_box')) {
                return;
            }
            
            create_translate_link(text_holder);
            
    });
}, 500);

})();

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


// Plurkmark This!//

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
			plurkmark.innerHTML = "BillyPan噗圖V51說明書";
			plurkmark.setAttribute('id','plurkmarkThis');
			plurkmark.setAttribute('href', "http://www.wretch.cc/blog/billypan101/14929937");
			plurkmark.setAttribute('target','_blank');
			plurkmark.setAttribute('style','position:absolute;left:4px;');
                        
                          
			permalink_container.singleNodeValue.appendChild(plurkmark);
		}
	},
	5000
);

// ==/UserScript==