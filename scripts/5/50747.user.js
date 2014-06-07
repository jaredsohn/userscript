// ==UserScript==
// @name           Plurk Smile (低調 3.6.1)
// @namespace      
// @description    此腳本包含 噗浪外掛圖案(在他人河道亦可使用) [Re噗功能 by maxchu] [日曆回朔器 by rein 06/17 已移除 ]
// @include        http://www.plurk.com/*
// ==/UserScript==

// ==About==
// author:         低調王 蒐集製作 (特此感謝所有貢獻的噗友)
// plurk: http://www.plurk.com/yao200168
// ********** Main Script ***********
var smileData = [];

smileData.push([
        '香蕉人',
        'http://a5556.myweb.hinet.net/msn/crazyfruit/',
        [
        'cf (0).gif','cf (1).gif','cf (2).gif','cf (3).gif','cf (4).gif','cf (5).gif','cf (6).gif','cf (7).gif',

        'cf (8).gif','cf (9).gif','cf (10).gif','cf (11).gif','cf (12).gif','cf (13).gif','cf (14).gif','cf (15).gif',

        'cf (16).gif','cf (17).gif','cf (18).gif','cf (19).gif','cf (20).gif','cf (21).gif','cf (22).gif','cf (23).gif',

        'cf (24).gif','cf (25).gif','cf (26).gif','cf (27).gif','cf (28).gif','cf (29).gif','cf (30).gif','cf (31).gif',

        'cf (32).gif','cf (33).gif','cf (34).gif','cf (35).gif','cf (36).gif','cf (37).gif','cf (38).gif','cf (39).gif',

        'cf (40).gif','cf (41).gif','cf (42).gif','cf (43).gif','cf (44).gif','cf (45).gif','cf (46).gif','cf (47).gif',

        'cf (48).gif','cf (49).gif','cf (50).gif','cf (51).gif','cf (52).gif','cf (53).gif','cf (54).gif','cf (55).gif',

        'cf (56).gif','cf (57).gif','cf (58).gif','cf (59).gif','cf (60).gif','cf (61).gif','cf (62).gif','cf (63).gif',

        'cf (64).gif','cf (65).gif','cf (66).gif','cf (67).gif','cf (68).gif','cf (69).gif','cf (70).gif','cf (71).gif',

        'cf (72).gif','cf (73).gif','cf (74).gif','cf (75).gif','cf (76).gif','cf (77).gif','cf (78).gif','cf (79).gif',

        'cf (80).gif','cf (81).gif','cf (82).gif','cf (83).gif','cf (84).gif','cf (85).gif','cf (86).gif','cf (87).gif',

        'cf (88).gif','cf (89).gif','cf (90).gif','cf (91).gif','cf (92).gif','cf (93).gif','cf (94).gif','cf (95).gif',

        'cf (96).gif','cf (97).gif','cf (98).gif','cf (99).gif',

        'cf (100).gif','cf (101).gif','cf (102).gif','cf (103).gif','cf (104).gif','cf (105).gif','cf (106).gif',

        'cf (107).gif','cf (108).gif','cf (109).gif','cf (110).gif','cf (111).gif','cf (112).gif','cf (113).gif',

        'cf (114).gif','cf (115).gif','cf (116).gif','cf (117).gif','cf (118).gif','cf (119).gif','cf (120).gif',

        'cf (121).gif','cf (122).gif','cf (123).gif','cf (124).gif','cf (125).gif','cf (126).gif','cf (127).gif',

        'cf (128).gif','cf (129).gif','cf (130).gif','cf (131).gif','cf (132).gif','cf (133).gif','cf (134).gif',

        'cf (135).gif','cf (136).gif','cf (137).gif','cf (138).gif','cf (139).gif','cf (140).gif','cf (141).gif',

        'cf (142).gif','cf (143).gif','cf (144).gif','cf (145).gif','cf (146).gif','cf (147).gif','cf (148).gif',

        'cf (149).gif','cf (150).gif','cf (151).gif','cf (152).gif','cf (153).gif','cf (154).gif','cf (155).gif',

        'cf (156).gif','cf (157).gif','cf (158).gif','cf (159).gif','cf (160).gif','cf (161).gif','cf (162).gif',

        'cf (163).gif','cf (164).gif','cf (165).gif','cf (166).gif','cf (167).gif','cf (168).gif','cf (169).gif',

        'cf (170).gif','cf (171).gif','cf (172).gif','cf (173).gif','cf (174).gif','cf (175).gif','cf (167).gif',

        'cf (177).gif','cf (178).gif','cf (179).gif','cf (180).gif','cf (181).gif','cf (182).gif','cf (183).gif',

        'cf (184).gif','cf (185).gif','cf (186).gif','cf (187).gif','cf (188).gif','cf (189).gif','cf (190).gif',

        'cf (191).gif','cf (192).gif','cf (193).gif','cf (194).gif','cf (195).gif',
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
	'小橘',
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
        '小白熊',
        'http://s641.photobucket.com/albums/uu133/mark5468/wb/',
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
        
        '121.gif','122.gif','123.gif','124.gif','125.gif','126.gif',
        
        ]
]);



smileData.push([
	'就醬',
	'http://cichikung.myweb.hinet.net/plurk/jojan/',
	[
        'm001.gif','m002.gif','m003.gif','m004.gif','m005.gif','m006.gif','m007.gif','m008.gif','m009.gif','m010.gif',

        'm011.gif','m012.gif','m013.gif','m014.gif','m015.gif','m016.gif','m017.gif',
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

	'041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif',
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
	'MSN動態',
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
	'優喜猴',
	'http://i194.photobucket.com/albums/z4/uchari/my/',
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
        
        '161.gif','162.gif','163.gif','164.gif','165.gif','166.gif','167.gif','168.gif','169.gif','170.gif',

        '171.gif','172.gif','173.gif','174.gif','175.gif','176.gif','177.gif','178.gif','179.gif','180.gif',

        '181.gif'
	]
]);


smileData.push([
	'米魯蛋',
	'http://itsgod.myweb.hinet.net/images/egg/',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',

        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',

        '021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',

        '031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',

        '041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif',

        '051.gif','052.gif','053.gif','054.gif','055.gif','056.gif','057.gif','058.gif','059.gif','060.gif',

        '106.gif','107.gif','061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif',

        '069.gif','070.gif','071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif','078.gif',
        
        '079.gif','080.gif','081.gif','082.gif','083.gif','084.gif','085.gif','086.gif','087.gif','088.gif',

        '089.gif','090.gif','091.gif','092.gif','093.gif','094.gif','095.gif','096.gif','097.gif','098.gif',

        '099.gif','100.gif','101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif',

        '109.gif','110.gif','111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif',

        '119.gif','120.gif','121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif','128.gif',
        
        '129.gif','130.gif','131.gif',
	]
]);

smileData.push([
	'洋蔥頭',
	'http://s194.photobucket.com/albums/z4/uchari/ood/',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',

        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',

        '021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',

        '031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',

        '041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif',

        '051.gif','052.gif','053.gif','054.gif','055.gif','056.gif','057.gif','058.gif','059.gif','060.gif',

        '106.gif','107.gif','061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif',

        '069.gif','070.gif','071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif','078.gif',
        
        '079.gif','080.gif','081.gif','082.gif','083.gif','084.gif','085.gif','086.gif','087.gif','088.gif',

        '089.gif','090.gif','091.gif','092.gif','093.gif','094.gif','095.gif','096.gif','097.gif','098.gif',

        '099.gif','100.gif','101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif',

        '109.gif','110.gif','111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif',

        '119.gif','120.gif','121.gif',
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
	'戰鬥毛',
	'http://s637.photobucket.com/albums/uu92/taiwanryan1976/moo1/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif',
        
        '009.gif','010.gif','011.gif','012.gif','013.gif','014.gif','015.gif','016.gif',
        
        '017.gif','018.gif','019.gif','020.gif','021.gif','022.gif','023.gif','024.gif',
        
        '025.gif','026.gif','027.gif','028.gif','029.gif','030.gif','031.gif','032.gif',
        
        '033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',
        
        '041.gif','042.gif',
	]
]);

smileData.push([
	'綠頭巾',
	'http://s194.photobucket.com/albums/z4/uchari/gr/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',

        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',

        '021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',

        '031.gif','032.gif','033.gif','034.gif','035.gif',
   	]
]);

smileData.push([
	'波羅',
	'http://plum.cs.nccu.edu.tw/~s9515/plurk/polo/',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','007.gif','008.gif','009.gif','010.gif',

        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',

        '021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',

        '031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',

        '041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif',

        '051.gif','052.gif','053.gif','054.gif','055.gif','056.gif','057.gif','058.gif','059.gif','060.gif',

        '061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif','069.gif','070.gif',

        '071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','078.gif','079.gif','080.gif',

        '081.gif','082.gif','083.gif','084.gif','085.gif','086.gif','087.gif','088.gif','089.gif','090.gif',

        '091.gif','092.gif','093.gif','094.gif','095.gif','096.gif','097.gif','098.gif','099.gif','100.gif',

        '101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif',

        '111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif','120.gif',

        '121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif','128.gif','129.gif','130.gif',

    	'131.gif','132.gif','133.gif','134.gif','135.gif',
	]
]);

smileData.push([  
        '小豬豬',
	'http://s637.photobucket.com/albums/uu92/taiwanryan1976/pig/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',

        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',

        '29.gif','30.gif','31.gif','32.gif',
        ]
]);



smileData.push([
        '小螃蟹',
        'http://s641.photobucket.com/albums/uu133/mark5468/crab/',
        [
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',

        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',

        '021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',

        '031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',

        '041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif',

        '051.gif','052.gif','053.gif','054.gif','055.gif','056.gif','057.gif','058.gif','059.gif','060.gif',

        '061.gif','062.gif','063.gif','064.gif','065.gif','066.gif',
        ]
]);


smileData.push([
        '男孩女孩',
        'http://s641.photobucket.com/albums/uu133/mark5468/bg/',
        [
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',

        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',

        '021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',

        '031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',

        '041.gif',
        ]
]);


smileData.push([
        '豬頭',
        'http://s641.photobucket.com/albums/uu133/mark5468/pig/',
        [
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',

        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',

        '021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',

        '031.gif','032.gif','033.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',

        '041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif',

        '051.gif','052.gif','053.gif','054.gif','055.gif','056.gif','057.gif','058.gif','059.gif','060.gif',

        '061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif','069.gif','070.gif',

        '071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif','078.gif','079.gif','080.gif',

        '081.gif','082.gif','083.gif','084.gif','085.gif','086.gif','087.gif','088.gif','089.gif','090.gif',

        '091.gif','092.gif','093.gif','094.gif','095.gif','096.gif','097.gif','098.gif','099.gif','100.gif',

        '101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif',

        '111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif','120.gif',
        ]
]);

smileData.push([
        '包子頭',
        'http://s641.photobucket.com/albums/uu133/mark5468/bozto/',
        [
        'bo1.gif','bo2.gif','bo3.gif','bo4.gif','bo5.gif','bo6.gif','bo7.gif','bo8.gif','bo9.gif',

        'bo10.gif','bo11.gif','bo12.gif','bo13.gif','bo14.gif','bo15.gif','bo16.gif','bo17.gif',

        'bo18.gif','bo19.gif','bo20.gif','bo21.gif','bo22.gif','bo23.gif','bo24.gif','bo25.gif',

        'bo26.gif','bo27.gif','bo28.gif','bo29.gif','bo30.gif',
        ]
]);

smileData.push([
        '丸子公主',
        'http://s641.photobucket.com/albums/uu133/mark5468/qq/',
        [
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',

        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',

        '021.gif','022.gif','023.gif','024.gif','025.gif',
        ]
]);

smileData.push([
        '蛋蛋',
        'http://s641.photobucket.com/albums/uu133/mark5468/egg/',
        [
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',

        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',

        '021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',

        '031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif',
        ]
]);

smileData.push([
        '外星人',
        'http://s641.photobucket.com/albums/uu133/mark5468/et/',
        [
        'et1.gif','et2.gif','et3.gif','et4.gif','et5.gif','et6.gif','et7.gif','et8.gif','et9.gif',

        'et10.gif','et11.gif','et12.gif','et13.gif','et14.gif','et15.gif','et16.gif','et17.gif','et18.gif','et19.gif',

        'et20.gif','et21.gif','et22.gif','et23.gif','et24.gif','et25.gif','et26.gif','et27.gif','et28.gif','et29.gif',

        'et30.gif','et31.gif','et32.gif','et33.gif','et34.gif','et35.gif','et36.gif','et37.gif','et38.gif','et39.gif',

        'et40.gif','et41.gif','et42.gif','et43.gif','et44.gif','et45.gif','et46.gif','et47.gif','et48.gif','et49.gif',

        'et50.gif','et51.gif','et52.gif','et53.gif','et54.gif','et55.gif','et56.gif','et57.gif','et58.gif','et59.gif',

        'et60.gif','et61.gif','et62.gif','et63.gif','et64.gif','et65.gif','et66.gif','et67.gif','et68.gif','et69.gif',

        'et70.gif','et71.gif','et72.gif','et73.gif','et74.gif','et75.gif','et76.gif','et77.gif','et78.gif','et79.gif',

        'et80.gif','et81.gif','et82.gif','et83.gif','et84.gif','et85.gif','et86.gif','et87.gif','et88.gif','et89.gif',

        'et90.gif','et91.gif','et92.gif','et93.gif','et94.gif','et95.gif','et96.gif','et97.gif','et98.gif','et99.gif',

        'et110.gif','et111.gif','et112.gif','et113.gif','et114.gif','et115.gif','et116.gif','et117.gif','et118.gif','et119.gif',

        'et120.gif','et121.gif','et122.gif','et123.gif','et124.gif','et125.gif','et126.gif','et127.gif','et128.gif','et129.gif',

        'et130.gif','et131.gif','et132.gif','et133.gif','et134.gif','et135.gif','et136.gif','et137.gif','et138.gif','et139.gif',

        'et140.gif','et141.gif','et142.gif','et143.gif','et144.gif','et145.gif','et146.gif','et147.gif','et148.gif','et149.gif',

        'et150.gif','et151.gif','et152.gif','et153.gif','et154.gif','et155.gif','et156.gif','et157.gif','et158.gif',
        ]
]);

smileData.push([
        '怪咖',
        'http://s641.photobucket.com/albums/uu133/mark5468/zz/',
        [
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',

        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',

        '021.gif','022.gif','023.gif','024.gif',
        ]
]);

smileData.push([
        '哩哩貓',
        'http://s641.photobucket.com/albums/uu133/mark5468/cat/',
        [
        'bo1.gif','bo2.gif','bo3.gif','bo4.gif','bo5.gif','bo6.gif','bo7.gif','bo8.gif','bo9.gif',

        'bo10.gif','bo11.gif','bo12.gif','bo13.gif','bo14.gif','bo15.gif','bo16.gif','bo17.gif',

        'bo18.gif','bo19.gif','bo20.gif','bo21.gif','bo22.gif','bo23.gif','bo24.gif','bo25.gif',

        'bo26.gif','bo27.gif','bo28.gif','bo29.gif','bo30.gif','bo31.gif','bo32.gif','bo33.gif',
        
        'bo34.gif','bo35.gif','bo36.gif','bo37.gif','bo38.gif','bo39.gif','bo40.gif','bo41.gif',
        
        'bo42.gif','bo43.gif','bo44.gif','bo45.gif','bo46.gif','bo47.gif','bo48.gif','bo49.gif',
        
        'bo50.gif','bo51.gif','bo52.gif','bo53.gif','bo54.gif','bo55.gif','bo56.gif','bo57.gif',
        
        'bo58.gif','bo59.gif','bo60.gif','bo61.gif','bo62.gif','bo63.gif','bo64.gif','bo65.gif',
        
        'bo66.gif','bo67.gif','bo68.gif','bo69.gif','bo70.gif','bo71.gif','bo72.gif','bo73.gif',
        
        'bo74.gif','bo75.gif','bo76.gif','bo77.gif','bo78.gif','bo79.gif','bo80.gif','bo81.gif',
        
        'bo82.gif','bo83.gif','bo84.gif',
        ]
]);



smileData.push([
        '組圖1',
        'http://kulin-hsu.myweb.hinet.net/A18/002/',
        [
        '114.gif','115.gif','116.gif','117.gif','118.gif','119.gif','120.gif',

        '121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif','128.gif','129.gif','130.gif',

        '131.gif','132.gif','133.gif','134.gif','135.gif','136.gif','137.gif','138.gif','139.gif','140.gif',

        '141.gif','142.gif','143.gif','144.gif','145.gif','146.gif','147.gif','148.gif','149.gif','150.gif',

        '151.gif','152.gif','153.gif','154.gif','155.gif','156.gif','157.gif','158.gif','159.gif','160.gif',

        '161.gif','162.gif','163.gif','164.gif','165.gif','166.gif','167.gif','168.gif','169.gif','170.gif',

        '171.gif','172.gif','173.gif','174.gif','175.gif','176.gif','177.gif','178.gif','179.gif','180.gif',

        '181.gif','182.gif','183.gif','184.gif','185.gif','186.gif','187.gif','188.gif','189.gif','190.gif',

        '191.gif','193.gif','194.gif','195.gif','196.gif','197.gif','198.gif','199.gif','200.gif',

        '201.gif','202.gif','203.gif','204.gif','205.gif','206.gif','207.gif','208.gif','209.gif','210.gif',

        '211.gif','212.gif','213.gif','214.gif','215.gif','216.gif','217.gif','218.gif','219.gif','220.gif',

        '221.gif','222.gif','223.gif','224.gif','225.gif','226.gif','227.gif','228.gif','229.gif','230.gif',

        '231.gif','232.gif','233.gif','234.gif','235.gif','236.gif','237.gif','238.gif','239.gif','240.gif',

        '241.gif','242.gif','243.gif','244.gif',

        ]
]);

smileData.push([
        '組圖2',
        'http://kulin-hsu.myweb.hinet.net/A18/003/',
        [
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',

        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',

        '021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',

        '031.gif','032.gif','033.gif','034.gif','095.gif','096.gif','097.gif','098.gif','099.gif','100.gif',

        '101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif',

        '111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif','120.gif',

        '121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif','128.gif','129.gif','130.gif',

        '131.gif','132.gif','133.gif','134.gif','135.gif','136.gif','137.gif','138.gif','139.gif','140.gif',

        '172.gif','173.gif','174.gif','175.gif','176.gif','177.gif','178.gif','179.gif','180.gif',

        '181.gif','182.gif','183.gif','184.gif','185.gif','186.gif','187.gif','188.gif','189.gif','190.gif',

        '191.gif','192.gif','193.gif','194.gif','195.gif','196.gif','197.gif','198.gif','199.gif','200.gif',

        '201.gif','202.gif','203.gif','204.gif','205.gif','206.gif','207.gif','208.gif','209.gif','210.gif',

        '211.gif','212.gif','213.gif','214.gif','215.gif','216.gif','217.gif','218.gif','219.gif','220.gif',

        '221.gif','222.gif','223.gif','224.gif','225.gif','226.gif','227.gif','228.gif','229.gif','230.gif',

        '231.gif','232.gif','233.gif','234.gif','235.gif','236.gif','237.gif','238.gif','239.gif','240.gif',

        '241.gif','242.gif','243.gif','244.gif','245.gif','246.gif','247.gif','248.gif','249.gif','250.gif',

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
        'keroro',
        'http://a6677.myweb.hinet.net/msn/keroro/keroro',
        [
        ' (0).gif',' (1).gif',' (2).gif',' (3).gif',' (4).gif',' (5).gif',' (6).gif',' (7).gif',

        ' (8).gif',' (9).gif',' (10).gif',' (11).gif',' (12).gif',' (13).gif',' (14).gif',' (15).gif',

        ' (16).gif',' (17).gif',' (18).gif',' (19).gif',' (20).gif',' (21).gif',' (22).gif',' (23).gif',

        ' (24).gif',' (25).gif',' (26).gif',' (27).gif',' (28).gif',' (29).gif',
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
				var rp = $('<a href="#" id="RePlurk">轉貼此噗</a>').css('float','right').css('right-padding','3px').click(function(){
					doRePlurk(owner_id,raw,link);
				});

				pp.after(rp);
			}

		}
	}
}


function doRePlurk(owner_id,raw,link){
	var nick = uw.SiteState.getUserById(owner_id).nick_name;

	$('#input_big').val(link + ' ([Re此噗]) ' + ((nick) ? ( ' by ' + '@' + nick + ': ') : '') + raw);
	p._removeExpand();
	uw.MaxChar.updateBig();
}







