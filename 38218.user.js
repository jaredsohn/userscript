// ==UserScript==
// @name           PLK SML 0.1
// @namespace      http://phpz.org/
// @description    PLK SML
// @include        http://www.plurk.com/*
// ==/UserScript==


// ********** Main Script ***********
var smileData = [];

smileData.push([
	'洋蔥頭',
	'http://ipx6.cn/plotion/onion/',
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
	'洋蔥頭2',
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
	'http://ipx6.cn/plotion/monkey/',
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
	'悠嘻猴2',
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
		'000.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',
		'011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',
		'021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',
		'031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',
		'041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif',
		'051.gif','052.gif','053.gif','054.gif','055.gif','001.gif'
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
	'兔司機',
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

        /*悠嘻猴*/ '5SP.gif','11s.gif','4Jf.gif','4K2.gif','UP.gif','4U3.gif','4U5.gif',
                '4U7.gif','4U6.gif','4Ub.gif','5Wc.gif', //'4EZ.gif',
        /*張君雅*/ '2jL.gif','2jP.gif','2jF.gif',
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
	'QMSN',
	'http://i410.photobucket.com/albums/pp189/unget/YF/',
	[
        'M001.gif','M002.gif','M003.gif','M004.gif','M005.gif','M006.gif','M007.gif','M008.gif','M009.gif','M010.gif',
        'M011.gif','M012.gif','M013.gif','M014.gif','M015.gif','M016.gif','M017.gif','M018.gif','M019.gif',
        'M020.gif','M021.gif','M022.gif','M023.gif','M024.gif','M025.gif','M026.gif','M027.gif','M028.gif',
        'M029.gif','M030.gif','M031.gif','M032.gif','M033.gif','M034.gif','M035.gif','M036.gif','M037.gif',
        'M038.gif','M039.gif','M040.gif','M041.gif','M042.gif','M043.gif','M044.gif','M045.gif','M046.gif',
        'M047.gif','M049.gif','M050.gif','M051.gif','M052.gif','M053.gif','M054.gif','M055.gif',
        'M056.gif','M057.gif','M058.gif','M059.gif','M060.gif','M061.gif','M062.gif','M063.gif','M064.gif',
        'M065.gif','M066.gif','M067.gif','M068.gif','M069.gif','M070.gif','M071.gif','M072.gif','M073.gif',
        'M074.gif','M075.gif','M076.gif','M077.gif','M078.gif','M079.gif','M080.gif','M081.gif','M082.gif',
        'M083.gif','M084.gif','M085.gif','M086.gif','M087.gif','M088.gif'
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