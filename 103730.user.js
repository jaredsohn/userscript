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
    '輔大猴',
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
    '91.gif','92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif'
    ]
]);


smileData.push([
    '魯瑪',
	'http://i1218.photobucket.com/albums/dd403/neko0910/emo/',
	[
	'a01.gif','a02.gif','a03.gif','a04.gif','a05.gif','a06.gif','a07.gif','a08.gif','a09.gif','a10.gif',
	'a11.gif','a12.gif','a13.gif','a14.gif','a15.gif','a16.gif','a17.gif','a18.gif','a19.gif','a20.gif',
	'a21.gif','a22.gif','a23.gif','a24.gif','a25.gif','a26.gif','a27.gif','a28.gif','a29.gif','a30.gif',
	'a31.gif'
    ]
]);


smileData.push([
    '饅頭',
	'http://i1218.photobucket.com/albums/dd403/neko0910/emo/',
	[
	'b01.gif','b02.gif','b03.gif','b04.gif','b05.gif','b06.gif','b07.gif','b08.gif','b09.gif','b10.gif',
	'b11.gif','b12.gif','b13.gif','b14.gif','b15.gif','b16.gif','b17.gif','b18.gif','b19.gif','b20.gif',
	'b21.gif','b22.gif','b23.gif','b24.gif','b25.gif','b26.gif','b27.gif','b28.gif','b29.gif','b30.gif'
	]
]);


smileData.push([
    '小饅頭',
	'http://i1218.photobucket.com/albums/dd403/neko0910/emo/',
	[
	'c01.gif','c02.gif','c03.gif','c04.gif','c05.gif','c06.gif','c07.gif','c08.gif','c09.gif','c10.gif',
	'c11.gif','c12.gif','c13.gif','c14.gif','c15.gif','c16.gif','c17.gif','c18.gif','c19.gif','c20.gif',
	'c21.gif','c22.gif','c23.gif'
	]
]);


smileData.push([
    '女孩',
	'http://i1218.photobucket.com/albums/dd403/neko0910/emo/',
	[
	'e01.gif','e02.gif','e03.gif','e04.gif','e05.gif','e06.gif','e07.gif','e08.gif','e09.gif','e10.gif',
	'e11.gif','e12.gif','e13.gif','e14.gif','e15.gif','e16.gif','e17.gif','e18.gif','e19.gif','e20.gif',
	'e21.gif'
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
    '兔包２',
	'http://i1218.photobucket.com/albums/dd403/neko0910/emo/',
	[
	'd01.gif','d02.gif','d03.gif','d04.gif','d05.gif','d06.gif','d07.gif','d08.gif','d09.gif','d10.gif',
	'd11.gif','d12.gif','d13.gif','d14.gif','d15.gif','d16.gif','d17.gif','d18.gif','d19.gif','d20.gif',
	'd21.gif','d22.gif','d23.gif','d24.gif','d25.gif'
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
	'OUCH',   //@jhihguan
	'http://plum.cs.nccu.edu.tw/~s9515/plurk/OUCHthis/',
	[
		'0.gif','1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','13.gif','14.gif',
		'15.gif','16.gif','17.gif','18.gif','19.gif','20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
		'29.gif','30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif','42.gif',
		'43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif','56.gif',
		'57.gif','58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif',
		'71.gif','72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif','81.gif','82.gif','83.gif','84.gif',
		'85.gif','86.gif','87.gif','88.gif','89.gif','90.gif','91.gif','92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif',
		'99.gif','100.gif','101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif',
		'111.gif','112.gif',
	]
]);

smileData.push([
	'公主桃',   //@jhihguan
	'http://i1006.photobucket.com/albums/af184/angebebe12/',
	[
		'42b40b29.gif','086f0b6e.gif','5ec286f5.gif','5bb912e1.gif','5bb912e1.gif','2f66fa67.gif',
		'6b5eee7b.gif','0de9ebf6.gif','sorry-1.gif','88-1.gif','be073931.gif','293c937a.gif','d7b5c2b3.gif',
		'a7f1c81d.gif','d84ffd6b.gif','e67d88e2.gif','e67d88e2.gif','c489bbe2.gif','bb32a324.gif',
		'036e945f.gif','2cb75e4e.gif','2cb75e4e.gif','b98c1df6.gif','c4b211e9.gif','sorry.gif',
		'b1cc079d.gif','ef1099c6.gif','776b4c50.gif','9724191e.gif','5d368c25.gif','544893f7.gif',
		'2.gif','1.gif','a016ee6c.gif','da5c6e00.gif','d5c98f87.gif','3.gif',
	]
]);


smileData.push([
    '桃子２',
	'http://i1218.photobucket.com/albums/dd403/neko0910/emo/',
	[
	'f01.gif','f02.gif','f03.gif','f04.gif','f05.gif','f06.gif','f07.gif','f08.gif','f09.gif','f10.gif',
	'f11.gif','f12.gif','f13.gif','f14.gif','f15.gif','f16.gif','f17.gif','f18.gif','f19.gif','f20.gif',
	'f21.gif','f22.gif','f23.gif','f24.gif','f25.gif','f26.gif','f27.gif','f28.gif','f29.gif','f30.gif',
	'f31.gif','f32.gif','f33.gif','f34.gif','f35.gif','f36.gif','f37.gif','f38.gif','f39.gif','f40.gif',
	'f41.gif','f42.gif','f43.gif','f44.gif','f45.gif','f46.gif','f47.gif','f48.gif','f49.gif','f50.gif',
	'f51.gif','f52.gif','f53.gif','f54.gif','f55.gif','f56.gif','f57.gif','f58.gif','f59.gif','f60.gif',
	'f61.gif','f62.gif','f63.gif','f64.gif','f65.gif','f66.gif','f67.gif','f68.gif','f69.gif','f70.gif',
	'f71.gif','f72.gif','f73.gif','f74.gif','f75.gif','f76.gif','f77.gif','f78.gif','f79.gif','f80.gif',
	'f81.gif','f82.gif','f83.gif','f84.gif','f85.gif','f86.gif','f87.gif','f88.gif','f89.gif','f90.gif',
	'f91.gif','f92.gif','f93.gif','f94.gif','f95.gif','f96.gif','f97.gif','f98.gif','f99.gif','f100.gif',
	'f101.gif','f102.gif','f103.gif','f104.gif','f105.gif','f106.gif','f107.gif','f108.gif','f109.gif','f110.gif',
	'f111.gif','f112.gif','f113.gif','f114.gif','f115.gif','f116.gif','f117.gif','f118.gif','f119.gif','f120.gif',
	'f121.gif','f122.gif','f123.gif','f124.gif','f125.gif','f126.gif','f127.gif','f128.gif','f129.gif','f130.gif',
	'f131.gif','f132.gif','f133.gif','f134.gif','f135.gif','f136.gif','f137.gif','f138.gif','f139.gif','f140.gif',
	'f141.gif','f142.gif','f143.gif','f144.gif','f145.gif','f146.gif','f147.gif','f148.gif','f149.gif','f150.gif',
	'f151.gif','f152.gif','f153.gif','f154.gif','f155.gif','f156.gif','f157.gif','f158.gif','f159.gif','f160.gif',
	'f161.gif','f162.gif','f163.gif','f164.gif','f165.gif','f166.gif','f167.gif','f168.gif','f169.gif','f170.gif',
	'f171.gif','f172.gif','f173.gif','f174.gif','f175.gif','f176.gif','f177.gif','f178.gif','f179.gif','f180.gif',
	'f181.gif','f182.gif','f183.gif','f184.gif','f185.gif','f186.gif','f187.gif','f188.gif'
	]
]);


smileData.push([
	'小貓',   //@jhihguan
	'http://i1006.photobucket.com/albums/af184/angebebe12/',
	[
		'walk_tora2.gif','walk_ame.gif','walk_mike.gif','walk_saba.gif','walk_siro.gif','walk_siro2.gif',
		'pori_ware.gif','pori_siro.gif','nekokan03.gif','nekokan02.gif','nekokan01.gif','hw_mike.gif',
		'hw_siro.gif','hw_kiji.gif','bat.gif','obake.gif','sanma.gif','karikari.gif','on08.gif',
		'on07.gif','on06.gif','on04.gif','on01.gif','d2_tora.gif','d2_sya.gif','d2_siro.gif','d2_mike.gif',
		'd2_kiji.gif','d2_ame.gif',
	]
]);

smileData.push([
	'桃子',   //@jhihguan
	'http://i1006.photobucket.com/albums/af184/angebebe12/',
	[
		'56.gif','07.gif','22.gif','21-1.gif','09.gif','08-1.gif','06.gif','03.gif','02.gif','01.gif',
		'11-1.gif','13-1.gif','12.gif','04.gif','26.gif','16.gif','58.gif','59.gif','57.gif','66.gif',
		'63.gif','10.gif','60.gif','61.gif','62.gif','42.gif','45.gif','64.gif','47.gif',
	]
]);

smileData.push([
	'小灰',   //@jhihguan
	'http://i1006.photobucket.com/albums/af184/angebebe12/',
	[
		'b8153f9a.gif','78201872.gif','6bb4d42b.gif','1e44870b.gif','5cf46f51.gif','03621eec.gif',
		'a4813109.gif','8aabb43b.gif','be4deb72.gif','3f9de721.gif','fbb18103.gif','c68bd237.gif',
		'5d319e76.gif','f30d2755.gif','229917c0.gif','ed8b90f1.gif','c62bcbaf.gif','17f075cb.gif',
	]
]);

smileData.push([
	'兔兔喵',   //@jhihguan
	'http://i1006.photobucket.com/albums/af184/angebebe12/',
	[
		'45-1.gif','46.gif','43.gif','42-1.gif','41.gif','30.gif','35.gif','28.gif','27.gif','26-1.gif',
		'44.gif','39-1.gif','38.gif','37.gif','36.gif','40.gif','34.gif','33.gif','32.gif','31.gif',
		'25.gif','29.gif','22-1.gif','21-2.gif','20.gif','24.gif','18.gif','17.gif','16-1.gif','15.gif',
		'19-2.gif','13-2.gif','12-1.gif','11-2.gif','10-1.gif','14.gif','08-2.gif','07-1.gif','06-1.gif',
		'05.gif','09-1.gif','01-1.gif','02-1.gif','03-1.gif','04-1.gif',
	]
]);

smileData.push([
	'全集',   //@jhihguan
	'http://i1006.photobucket.com/albums/af184/angebebe12/',
	[
		'1176698147jpg.gif','1176690084jpg.gif','1176690083jpg.gif','1176705164jpg.gif','1310263592jpg.gif',
		'1310273471jpg.gif','make94203.gif','51-1.gif','tatit29jpg.gif',
	]
]);

smileData.push([
	'熊貓',
	'http://shiehcho22.myweb.hinet.net/msn/bearcat/',
	[
        'bc (0).gif','bc (1).gif','bc (2).gif','bc (3).gif','bc (4).gif','bc (5).gif','bc (6).gif','bc (7).gif','bc (8).gif','bc (9).gif','bc (10).gif','bc (11).gif',
        'bc (12).gif','bc (13).gif','bc (14).gif','bc (15).gif','bc (16).gif','bc (17).gif','bc (18).gif','bc (19).gif','bc (20).gif','bc (21).gif',
        'bc (22).gif','bc (23).gif','bc (24).gif','bc (25).gif','bc (26).gif','bc (27).gif','bc (28).gif','bc (29).gif','bc (30).gif','bc (31).gif',
        'bc (32).gif','bc (33).gif','bc (34).gif','bc (35).gif','bc (36).gif','bc (37).gif','bc (38).gif','bc (39).gif','bc (40).gif','bc (41).gif',
        'bc (42).gif','bc (43).gif','bc (44).gif','bc (45).gif','bc (46).gif','bc (47).gif','bc (48).gif','bc (49).gif','bc (50).gif',
        'bc (51).gif','bc (52).gif','bc (53).gif','bc (54).gif','bc (55).gif','bc (56).gif','bc (57).gif','bc (58).gif','bc (59).gif',
        'bc (60).gif','bc (61).gif','bc (62).gif','bc (63).gif','bc (64).gif','bc (65).gif','bc (66).gif','bc (67).gif','bc (68).gif','bc (69).gif',
        'bc (70).gif','bc (71).gif','bc (72).gif','bc (73).gif','bc (74).gif','bc (75).gif','bc (76).gif','bc (77).gif','bc (78).gif','bc (79).gif',
        'bc (80).gif','bc (81).gif','bc (82).gif','bc (83).gif','bc (84).gif','bc (85).gif','bc (86).gif','bc (87).gif','bc (88).gif','bc (89).gif',
        'bc (90).gif','bc (91).gif','bc (92).gif','bc (93).gif','bc (94).gif','bc (95).gif','bc (96).gif','bc (97).gif','bc (98).gif',
        'bc (99).gif','bc (100).gif','bc (101).gif','bc (102).gif','bc (103).gif','bc (104).gif','bc (105).gif','bc (106).gif','109bc (107)gif','bc (108).gif',
        'bc (109).gif','bc (110).gif','bc (111).gif','bc (112).gif',
	]
]);

smileData.push([
	'爆炸熊',
	'http://fq866.myweb.hinet.net/msn/blowingpanda/',
	[
        'blowingpanda (1).gif','blowingpanda (2).gif','blowingpanda (3).gif','blowingpanda (4).gif',
        'blowingpanda (5).gif','blowingpanda (6).gif','blowingpanda (7).gif','blowingpanda (8).gif',
        'blowingpanda (9).gif','blowingpanda (10).gif','blowingpanda (11).gif','blowingpanda (12).gif',
        'blowingpanda (13).gif','blowingpanda (14).gif','blowingpanda (15).gif','blowingpanda (16).gif',
        'blowingpanda (17).gif','blowingpanda (18).gif','blowingpanda (19).gif','blowingpanda (20).gif',
        'blowingpanda (21).gif','blowingpanda (22).gif','blowingpanda (23).gif','blowingpanda (24).gif',
        'blowingpanda (25).gif','blowingpanda (26).gif','blowingpanda (27).gif','blowingpanda (28).gif',
        'blowingpanda (29).gif','blowingpanda (30).gif','blowingpanda (31).gif','blowingpanda (32).gif',
        'blowingpanda (33).gif','blowingpanda (34).gif','blowingpanda (35).gif','blowingpanda (36).gif',
        'blowingpanda (37).gif','blowingpanda (38).gif','blowingpanda (39).gif','blowingpanda (40).gif',
        'blowingpanda (41).gif','blowingpanda (42).gif','blowingpanda (43).gif','blowingpanda (44).gif',
        'blowingpanda (45).gif','blowingpanda (46).gif','blowingpanda (47).gif','blowingpanda (48).gif',
        'blowingpanda (49).gif','blowingpanda (50).gif','blowingpanda (51).gif','blowingpanda (52).gif',
        ]
]);


smileData.push([
	'迷你窩',
	'http://a6677.myweb.hinet.net/msn/miniworld/',
	[
	'miniworld (0).gif','miniworld (1).gif','miniworld (2).gif','miniworld (3).gif','miniworld (4).gif','miniworld (5).gif','miniworld (6).gif','miniworld (7).gif','miniworld (8).gif',
	'miniworld (9).gif','miniworld (10).gif','miniworld (11).gif','miniworld (12).gif','miniworld (13).gif','miniworld (14).gif','miniworld (15).gif','miniworld (16).gif','miniworld (17).gif',
	'miniworld (18).gif','miniworld (19).gif','miniworld (20).gif','miniworld (21).gif',
        ]
]);

smileData.push([
	'海膽君',
	'http://shiehcho22.myweb.hinet.net/msn/cbm/',
	[
        'cbm (0).gif','cbm (1).gif','cbm (2).gif','cbm (3).gif','cbm (4).gif','cbm (5).gif','cbm (6).gif',
        'cbm (7).gif','cbm (8).gif','cbm (9).gif','cbm (10).gif','cbm (11).gif','cbm (12).gif',
        'cbm (13).gif','cbm (14).gif','cbm (15).gif','cbm (16).gif','cbm (17).gif','cbm (18).gif',
        'cbm (19).gif','cbm (20).gif','cbm (21).gif','cbm (22).gif','cbm (23).gif','cbm (24).gif',
        'cbm (25).gif','cbm (26).gif','cbm (27).gif','cbm (28).gif','cbm (29).gif','cbm (30).gif',
        'cbm (31).gif','cbm (32).gif','cbm (33).gif','cbm (34).gif','cbm (35).gif','cbm (36).gif',
        'cbm (37).gif','cbm (38).gif','cbm (39).gif','cbm (40).gif','cbm (41).gif','cbm (42).gif',
        'cbm (43).gif','cbm (44).gif','cbm (45).gif','cbm (46).gif','cbm (47).gif','cbm (48).gif',
        'cbm (49).gif','cbm (50).gif','cbm (51).gif','cbm (52).gif','cbm (53).gif','cbm (54).gif',
        'cbm (55).gif','cbm (56).gif','cbm (57).gif','cbm (58).gif','cbm (59).gif','cbm (60).gif',
        'cbm (61).gif','cbm (62).gif','cbm (63).gif','cbm (64).gif','cbm (65).gif','cbm (66).gif',
        'cbm (67).gif','cbm (68).gif','cbm (69).gif','cbm (70).gif',
   	]
]);


smileData.push([
	'Pucca',
	'http://shiehcho22.myweb.hinet.net/msn/pucca/',
	[
        'pucca (0).gif','pucca (1).gif','pucca (3).gif','pucca (4).gif','pucca (5).gif','pucca (6).gif','pucca (7).gif','pucca (8).gif','pucca (9).gif',
		'pucca (10).gif','pucca (11).gif','pucca (12).gif','pucca (13).gif','pucca (14).gif','pucca (15).gif','pucca (16).gif','pucca (17).gif','pucca (18).gif',
		'pucca (19).gif','pucca (20).gif','pucca (21).gif','pucca (22).gif','pucca (23).gif','pucca (24).gif','pucca (25).gif','pucca (26).gif','pucca (27).gif',
		'pucca (28).gif','pucca (29).gif','pucca (30).gif','pucca (31).gif','pucca (32).gif','pucca (33).gif','pucca (34).gif','pucca (35).gif','pucca (36).gif',
		'pucca (37).gif','pucca (38).gif','pucca (39).gif','pucca (40).gif','pucca (41).gif','pucca (42).gif',
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