// ==UserScript==
// @name            Plurk Smile Billy Pan  v4.02
// @namespace       http://www.plurk.com/billypan
// @description     2009/03/10
// @include         http://www.plurk.com/*
// modified log:    
// author: Seven Yu (v 4.6，http://userscripts.org/scripts/show/32306)
// Changed : Billy Pan
// Blog:http://www.wretch.cc/blog/billypan101
// 這個版本整合進去了單鍵"Re-Plurk"功能!
// ==/UserScript==
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

        'a0119.gif','a0120.gif','a0121.gif',
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

	'AddEmoticons04286.gif','AddEmoticons04287.gif',
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
        'm218.gif','m219.gif','m220.gif','m221.gif','m222.gif',
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
	'米滷蛋+',
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


smileData.push([
	'洋蔥頭',
	'http://cichikung.myweb.hinet.net/plurk/onion/',
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
        '092.gif','093.gif','094.gif','095.gif','096.gif','097.gif','098.gif','099.gif','100.gif',
        '101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif',
        '111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif','120.gif',
        '121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif','128.gif','129.gif',
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
	'文字',
	'http://s466.photobucket.com/albums/rr23/billypan101/pan2/',
	[
		'tba.gif','1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','13.gif','14.gif','15.gif',
		'16.gif','17.gif','18.gif','19.gif','20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif',
		'30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif','42.gif','43.gif',
		'44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif','th2.gif','th3.gif',		
	]
]);

smileData.push([
	'文字2',
	'http://s466.photobucket.com/albums/rr23/billypan101/word2/',
	[
		'tba.gif','67.gif','68.gif','65.gif','1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','14.gif','15.gif',
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
	'炮炮兵',
	'http://s466.photobucket.com/albums/rr23/billypan101/soldier-v3/',
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
        '128.gif','129.gif','130.gif','131.gif','132.gif','133.gif','134.gif',
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
	'兔斯基+',
	'http://s466.photobucket.com/albums/rr23/billypan101/rabbit-kai/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif','31.gif','32.gif','33.gif',
        ]
]);

smileData.push([
	'藍香蕉',
	'http://s466.photobucket.com/albums/rr23/billypan101/blueb/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif',
        ]
]);

smileData.push([
	'鼻涕男',
	'http://s466.photobucket.com/albums/rr23/billypan101/nose/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif',
        ]
]);

smileData.push([
	'搞笑貓',
	'http://s466.photobucket.com/albums/rr23/billypan101/scat/',
	[
	'1.gif','2.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif',
 	]
]);


smileData.push([
	'小綠蛙',
	'http://itsgod.myweb.hinet.net/images/frog/',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','023.gif',
        '029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif',
	]
]);

smileData.push([
	'小黑貓',
	'http://s466.photobucket.com/albums/rr23/billypan101/bcat/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif',
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
                'sana%20(132).jpg','sana%20(133).jpg',
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
	'熊寶',
	'http://www.gamestar.com.tw/mini/leitmotif/051/',
	[
		'lei051001.gif','lei051002.gif','lei051003.gif','lei051004.gif','lei051005.gif','lei051006.gif',
		'lei051007.gif','lei051008.gif','lei051009.gif','lei051010.gif','lei051011.gif','lei051012.gif',
                'lei051013.gif','lei051014.gif','lei051015.gif','lei051016.gif','lei051017.gif','lei051018.gif',
                'lei051019.gif','lei051020.gif','lei051021.gif','lei051022.gif','lei051023.gif','lei051024.gif',
                'lei051025.gif','lei051027.gif','lei051028.gif','lei051029.gif','lei051030.gif',
                'lei051031.gif','lei051032.gif','lei051033.gif','lei051034.gif','lei051035.gif','lei051036.gif',
                'lei051037.gif','lei051038.gif','lei051039.gif','lei051040.gif',
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
	'小水滴',
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
                'cactus%20(54).gif',
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
                'doudou%20(30).gif','doudou%20(31).gif','doudou%20(32).gif',
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
	'小白貓',
	'http://s466.photobucket.com/albums/rr23/billypan101/wcat/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif',
        ]
]);

smileData.push([
	'方塊人',
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
	'好神公仔',
	'http://s466.photobucket.com/albums/rr23/billypan101/fgod/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',
        '20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif',
        '29.gif','30.gif',
	]
]);

smileData.push([
	'紅便便',
	'http://s466.photobucket.com/albums/rr23/billypan101/red-s/',
	[
        '01.gif','02.gif','03.gif','04.gif','05.gif','06.gif','07.gif','08.gif','09.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif',
	]
]);

smileData.push([
	'賤客3.5',
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
        '65.gif','66.gif','67.gif','68.gif','69.gif','70.gif','71.gif','72.gif','73.gif',
        '74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif','81.gif','82.gif',
        '83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif','91.gif',
        '92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','99.gif','100.gif',
        '101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif',
        '110.gif','111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif',
        '119.gif','120.gif','121.gif','122.gif','123.gif','124.gif',
	]
]);

smileData.push([
	'綠頭巾',
	'http://emote.rkasigi.net/green/11880',
	[
	'59487921.gif','60147366.gif','60031527.gif','60051834.gif','59622374.gif',
	'59908754.gif','60111624.gif','59540813.gif','60200610.gif','60368641.gif',
	'60812993.gif','59981737.gif','60325210.gif','59857425.gif','60634318.gif',
	'59832923.gif','60244341.gif','60471641.gif','60393263.gif','60747843.gif',
	'59235557.gif','60222269.gif','59359479.gif','59518967.gif','60493576.gif',
	'59389307.gif','59464961.gif','59879959.gif','60514973.gif','60574159.gif',
	'60443668.gif','60126928.gif','60295388.gif','60596490.gif','60080305.gif',
	'59332334.gif','60347617.gif','59303229.gif','60182952.gif','60528845.gif',
	'60411799.gif','59642205.gif','59662329.gif','60772571.gif','60269722.gif',
	'60164136.gif','59281127.gif','59429641.gif','60728449.gif','60795294.gif',
	'59760961.gif','59780307.gif','60547281.gif','60710494.gif'
	]
]);

smileData.push([
	'rkasigi',
	'http://emote.rkasigi.net/plurk/',
	[
	'2h.gif','2X.gif','2RP.gif','4x.gif','4B.gif','4s.gif','4A.gif','6c.gif',
	'ad.gif','ae.gif','b1.gif','Jv.gif','wH.gif','zX.gif','Jt.gif','ll.gif',
	'wJ.gif','JF.gif','j5.gif','rK.gif','Jl.gif','DR.gif','iT.gif','hF.gif',
	'sx.gif','8P.gif','GZ.gif','b2.gif','rq.gif','mv.gif','4E.gif','Jq.gif',
	'px.gif','Mf.gif','Jx.gif','zW.gif','K7.gif','6b.gif','Fv.gif','Jn.gif',
	'wP.gif','JG.gif','s9.gif','KK.gif','Md.gif','gS.gif','Jm.gif','nH.gif',
	'iA.gif','gQ.gif','a7.gif','devil.gif','nerd.gif','cozy.gif','tears.gif',
	'angry.gif','unsure.gif','annoyed.gif','icon_biggrin.gif','like_food.gif',
	'listening_music.gif','tongue.gif','broken_heart.gif','unsure_002.gif',
	'doh.gif','gym.gif','girl_kiss.gif','icon_sad.gif','metal.gif','yupi.gif',
	'party.gif','2.gif'
	]

]);

smileData.push([
	'Other',
	'http://',
	[
	'plurk.cainanunes.com/creu5.gif',
	'images.plurk.com/4036463_1a0d704448351e6c2a35750c576d03af.jpg',
	'attachpic.sogi.com.tw/upload/200909/20090907222358048.gif'
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
				var rp = $('<a href="#" id="RePlurk">RePlurk</a>').css('float','right').css('right-padding','3px').click(function(){doRePlurk(owner_id,raw,link);});
				pp.after(rp);
			}

		}
	}
}


function doRePlurk(owner_id,raw,link){
	var nick = uw.SiteState.getUserById(owner_id).nick_name;

	$('#input_big').val(link + ' ([轉自此噗]) ' + ' by ' + ((nick) ? ('@' + nick + ': ') : '') + raw);
	p._removeExpand();
	uw.MaxChar.updateBig();
}