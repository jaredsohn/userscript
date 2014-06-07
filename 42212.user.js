// ==UserScript==
// @name            Plurk lol 娘娘惡搞特仕版！  v1.02
// @namespace       http://userscripts.org/
// @description     純屬惡搞 http://www.plurk.com/niter
// @include         http://www.plurk.com/*
// modified log:   
// ==/UserScript==


// ********** Main Script ***********
var smileData = [];

smileData.push([
	'W2原版',
	'http://niter.myweb.hinet.net/w2-o/',
	[
	'o01.gif','o02.gif','o03.gif','o04.gif','o05.gif','o06.gif','o07.gif','o08.gif','o09.gif','o10.gif',
	'o11.gif','o12.gif','o13.gif','o14.gif','o15.gif','o16.gif','o17.gif','o18.gif','o19.gif','o20.gif',
	'o21.gif','o22.gif','o23.gif','o24.gif','o25.gif','o26.gif','o27.gif','o28.gif','o29.gif','o30.gif',
	'o31.gif','o32.gif','o33.gif','o34.gif','o35.gif','o36.gif','o37.gif','o38.gif','o39.gif','o40.gif',
	'o41.gif','o42.gif','o43.gif','o44.gif','o45.gif','o46.gif','o47.gif','o48.gif','o49.gif','o50.gif'
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
	'http://www.foxqq.com/biaoqing/tusiji/',
	[
'0400AE3B604115487546F49868421865.gif','058E9586E5EA8CCAE0FD3DBC33FC0461.gif','08762B05F7CB9980F1EBCEF48509DDE6.gif',
'0F19004D5FA17DBC6C6715EDC9547D48.gif','10546D52D672FE78317AC823C8EFCC19.gif','112E756E2359594B992CDD5DE616B9DB.gif',
'14B76014E60B8141FC5304F27EDB1CA9.gif','16E3ABCFBA2980A29FFE4CF53F87F171.gif','22FC2F7EEA1F198DBA882BA415812584.gif',
'237252805312708E636930D7ACEF6542.gif','2C0CFEE1B77BE903EAAC140D4B64E551.gif','2C8CAE4D1162E15BF5277958D218134B.gif',
'2EC6A4268AC158C502D629B669ED8541.gif','3118EE627540C23440FF4F91B9EFACB5.gif','31FD33A750D914EB5880614E53B0ACEA.gif',
'32814250195A2D0F56FB5F389681123F.gif','32B6684BF5096EA9F1C7516E32049DDC.gif','3522C19CAF5945CFFA1A8C158296273B.gif',
'356D30DE031F0C5CFAF4F585D57710C3.gif','361FD8F051384C5F145E7C2131E86B2E.gif','3F58F609EC06BFE59BC9EC7CADFE665A.gif',
'41362ABA80CD5BF6EE38E12438E7DEAF.gif','41D8199B96D9D3169B2F2509F0247CD0.GIF','47536C8C7174108D60AC4A0641ED5218.gif',
'4841531C687B8931DB81691B2D2FAE4E.gif','4A72239129A48408AE32FBF0AD9E0143.gif','4A7F9C5D3B425210D9EE4C53EF601103.gif',
'51F4CD28E9923B466180B69910D13A02.gif','5C89433BAB990C4F75E9E8D30F00AD2F.gif','5CAC4D714B0C4E3FAC317BB0492B3804.gif',
'5D293C0C2FB1D0BBF5C3EA9892D45887.gif','5D48938D873ED92BF5EA50A3C884226D.gif','5D7DD3E4D88F4B5B85C0E09BED271DBD.gif',
'5FCBA5F1AB1E0F3824372493E4CBA8BA.gif','61069ED812BE3FEC54E97DC2118474F1.gif','62058D0F7DAF9E590A0AD710BB0E370E.gif',
'64158403DD41ECE03CA4A34AE84F6F99.gif','649774422AE52A1200BFD7B24C260090.gif','682F58C5944F716E59BC009B5EA3B019.gif',
'6BC9845348575CC5593A6A1366185BB9.gif','6DB3819FA96FF0EEA86222C517BB75E9.gif','70D78EF4809C9D8E9B0C1A988866C854.gif',
'73795328E7ACC1F72282158BF2D3386F.gif','75EA7D499037559CD9CDF4B62CA2B5E4.gif','79634AB1F0FD33434557F765D984C1CC.gif',
'79D48371B9FEAE6F314D24CF0960982D.gif','7BBF0F8A7E04E72C30E1589C8D5DC279.gif','81F0D0BE98F4C24C0DB97718FEC1DD8E.gif',
'83942E1278F1B7C1BC018106CCD99B41.gif','8AE737B147B449A3736E02ECE5A85FD2.gif','8C7D6CE29F703F2F08E7583FBC1872CC.gif',
'9712E507BAAC990F4D6404EDF7C2E198.gif','979A5CB9F38BBD70A65C0575244352DC.gif','989A5FC0AA0AC16AE78AEB9A4CC90242.gif',
'99679C0D973DED74952ED2304D4A1AC3.gif','9B368AB4090BC4DE812ADD52D5E32342.gif','9E12995E8DEF6436CAEBAC530F9C9B18.gif',
'9F56B4E721145EB813EDCACB143286D5.gif','A2A7830E60F7B2A088BA51F17CB11B1E.gif','A769C31533C7687EE677BFB66D2F2E76.gif',
'A8C6D0C5F0A1FA610B69987951622AD6.gif','AB18E16F831437A25129C4BF912CC7EB.gif','B107F4A975ACBDD00B86E887D5BEDB04.gif',
'B1B7B2991F651DC399A1CEDF7C2C874B.gif','B202A3A5FC44F24A784B9FCAFBBD152F.gif','B2928B49FA408E1EF0BD3BBCD84864E4.gif',
'B37729DD3F34DCAFFF78A7F6668720C1.gif','B43D7DFE3C732844917320F0B2B26174.gif','B45866263702D6A1C79AAA369893E8BE.gif',
'B8883B034E25F2C91BA64035F177220F.gif','C5006BC9000E2549FD915446AE3055E1.gif','C500DC8F9D0940A8B271471A49C3DD36.gif',
'C5EBF1A9A161F549EF2BA2604768A81B.gif','CCCF9B69B9234918A503223369A2B9F5.gif','CD449D71D98ED356396FC07274202472.gif',
'CE2C05A418399FD3AA4A44835649D55D.gif','CFA95C62A1160F753072C56B55A803C0.gif','D0D9F9207861AE779B9388BFCF3FDCD2.gif',
'D4225EF38543BF459E342E0B5B82FCA2.gif','D7CB31B694803DCAD1C17B4E169E38A5.gif','D88BE0EFBE63EA9D58EB16C9FB0E56FC.gif',
'D9430BA410761FB911FF9BA651A5D7A2.gif','D98742B465D32C69A124EF4AE5311AEF.gif','DA204F282C6323873A63E13361AB7FB0.gif',
'E0B96CACD4B5F56D5FF93480A4BD4C02.gif','E1CECEE9EFA2D338C16B8B72C923B650.gif','E209FF0FBE9AE0A7FEF6B5848BB18749.gif',
'E2EF1DC810BE0BB0FCEDB95396D401CD.gif','E4F58F3090B1E3697CDD9A8E26C3207F.gif','F379D04DB4E6B861C3F2CC417DF07072.gif',
'F3C6AF71A82EE938BCE06DC3B8BF6C69.gif','F44E630A4F11FDAFCF34008F219EE8E2.gif','F61149B7024439B5BEE3454F7869A927.gif',
'F79C68F73B3C498091EF551C3C02DCB3.gif','F7C7AB6F9F8D29BE61A7A3B7BCA70D87.gif','F9A432DF33796E70A70659BB195FBDE7.gif'
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
	'柑仔',
	'http://www.foxqq.com/biaoqing/datougan/',
	[
'00A8B3C84001FF6C3156C86C7E2C4A4A.gif','1D1764C78BFEA3103111BB2F03F8311A.gif','4434AEFD19FB721BD7E67EE7609FFEFF.gif','6CC106E54DFE4FD66F1DE4A7255C148F.gif',
'527BA68D4B116509FCF75DDE282B3E2F.gif','5DBA552FF2D9F1612EF0586BE4BD1F01.gif','5F5E02C6CB0D828B9265FFA565FFCFF3.gif','F256F84AD69564C2BB97988D72E8DA7D.gif',
'2CCEAF0F34E5D323C0472F75CA8A6DE6.gif','666CA470BE4079D442699CDDB7AED492.gif','93329AB82314B2C9AE7E7EEB24E36CEB.gif','E15F73D7F67545FB35D73AB00A1CBB3C.gif',
'ADC8AA26F0A9A1FAC4C2FE8272439B97.gif','BDA406006D7E6C911CAF9025E0E404B8.gif','E500932A548EE02D65194D1575920D89.gif','5DEA2DF600A13C62D6780AA14E4F8927.gif',
'5AE429DB198B9108AA2411777B28B527.gif','3079FB8DE32F3BDB824446B91FC5BF10.gif','107511AB7E59D4ADE7317D8147E586B3.gif','11F7C14F1A88A9D8577A35FB73AA0E54.gif',
'15B07644B6B5FB5511307654B5900746.gif','1BEA15DD3BC7D419D62F53C4638C9CCD.gif','1FA2B284472098F5DCF11B61404807DA.gif','36D64AB85AF684BCF6420FECFD6CC6CD.gif',
'3D794F9C28AD88675BB58706542E754F.gif','4575E8D59D806B1FC3933548AEDFCD21.gif','44856814D95AFC2551108691B703A7DF.gif','52671E2B90A5E7D66D6A0A91D8708CB9.gif',
'5B5DE9832D90CD2B432E459781BF4605.gif','5C171B9D317E85147B56A02248F71B6E.gif','5D198DEEF757296DFAA89674A9F7A9AA.gif','6243C4206B7931A4B277D305044CC032.gif',
'768F037A4A32D69CC5FEF1B323A21A28.gif','7934E8F6E793DADC28FC73E5B9AA3AD5.gif','82976022DEEF9B92A19A5E47DB5F6336.gif','872D0974765C6342AE05CDBD403FAB60.gif',
'9158070019452B0BA2CEB0E219A547BD.gif','96836A70D9EFB86AF08D7EF81745007F.gif','9B0299F3F2F836BD007936A38C57120D.gif','A5FC5FA1A7E9F376A814F2316ACD2408.gif',
'C3EF2F06003222015CA77907A47CFBCE.gif','E81384349F811FDDAE9AC80AF9574781.gif','C4AC541D0B4B8E6B5DF30924CA568844.gif','CE42F4341F5C0ED6A0E758D7BF9831E5.gif',
'D88FCAA93E8200A0AD8888F5DC017A93.gif','DA51CDF8F58F1EAB4ED4BA6992E4D6AF.gif','DBCC12E6CD0881AC8B81D8D560A8F4FE.gif','DC50DE182959455E7A7FA4048378638C.gif',
'DE3D86275F8B7CA1D192E34C9E8019E9.gif','F3F2765EC93F0F48CC17B882822E0F15.gif','03A4EA6306EC56060E512E04572688EA.gif','111111554A05F02AF1FE3352C9DA27A8.gif',
'117BCCDFD03CA5046BCAD8EC53F4A059.gif','18D67598812EF0AE3A73F1CB64CDA4B9.GIF','1D7F5BF65A8F5B5C57FC65CCB7363954.gif','20A03915B589BCDABF63F7A782D0729C.gif',
'24EA8460AD6F490550EF8BBD3CFEAE0E.gif','2A12B971C9739325419D4A32A81C8424.gif','345C139CD1D814F6E263623E3B4B0949.gif','390BE2B7ADEC07128639BDA4658C91D4.gif',
'3B43724F2FE23F074D1E059CA3EDAD0D.gif','3CB9D8ACF6647DA3347CEB0DE4410CF8.gif','3E646D8A06F450E4501FCE20E22AE420.gif','49979251CB72C12E147C7A8AC382AEF6.gif',
'4A8F5868E6DFF4BCAF010D708DC9FEBC.gif','4CDC70F015A29583602DEE02016C1FFB.gif','55EED1D124671B020573F5720882546E.gif','5A59C5237EDFB5CB4DDE7972FDA72111.gif',
'5C801CED529A29204EA3569B7BC507D5.gif','6B43CF2929604D5FEEABBB060755D5E0.gif','6CB06AFBD4DB9CD419944C938D2055FC.gif','7E812CDB2B7B4B027B05BBD668CC6CD2.gif',
'81204177CDE974962DE4EBB4161AC455.gif','81D89887FA3ED532F569348C9B909092.gif','84B6337C378ED8504AD34DEE32304001.gif','8A29A855067D29AFA7C2ED28CF7A9188.gif',
'92D16A4F7312D57E810E7D24C28488E9.gif','9AE9F77C8949E8B45B0350BD59A4C1F6.gif','A8402A265EA83B0520FB581D3B738437.gif','ADC196702C6240C0196F644B2EE7A307.gif',
'AEB8DD26C7AC14D5C5277A90F43A7445.gif','BB2D3B2D5438C4311B58BAD4A907B881.gif','BBADD59E43974E5A96835F94C9F850A6.gif','C8D1651591AAD9897E75F7DD8F9BC9C1.gif',
'CC775C489C107A1C910E11490FD255CC.gif','D3B9C7A3C3648F5815E184A46104F6E9.gif','D527CA4AA673AF8671B7B97902F58B27.gif','E4D30B7BBD3353DFD528314B6782DF53.gif',
'EA28BBACEE1319E438356A4D3D6DA649.gif','EF363FE6D9A33E7728E31C7881518A4D.gif','F6589BB93DBDAD798A265A8D18C6052A.gif','F6B62C638EC809A03042F971B60C0BAB.gif',
'F960F9CA7AE7A99A7EA1B945654DDF38.gif','FF59E0CAFDCD8052600F94A2FE5DDC52.gif'
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