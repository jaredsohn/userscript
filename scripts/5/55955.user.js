// ==UserScript==
// @name           Emote Plurk v.murezz 2.0
// @namespace      http://userscripts.org/scripts/show/39120
// @description    Easy to insert custom smiley (or emote) on Plurk. Nirvana's n newest emotiplurk added plus banana icon too. 
// @include        http://www.plurk.com/*
// ==/UserScript==

// ==About Source==
// Originally from Emote Plurk v.murezz
// author: Muhammad Reza
// Email: murezz@gmail.com
// Icon : thx to Artharry n friends in d world
// Update : newest plurk icon n banana



// ********** Main Script ***********
var smileData = [];

smileData.push([
	'High_karma',
	'http://i877.photobucket.com/albums/ab336/murezz/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif',
'9.gif','10.gif','11.gif','pentungikan.gif','muscle.gif','jogetpirates.gif',
'jogetkacamata.gif','bir.gif','mug.gif'


	]
]);

smileData.push([
	'Emot',
	'http://www.artharry.com/emoticons/',
	[
	'1.gif',
'2.gif',
'3.gif',
'4.gif',
'5.gif',
'6.gif',
'7.gif',
'8.gif',
'9.gif',
'10.gif',
'11.gif',
'12.gif',
'13.gif',
'14.gif',
'15.gif',
'16.gif',
'17.gif',
'18.gif',
'19.gif',
'20.gif',
'21.gif',
'22.gif',
'23.gif',
'24.gif',
'25.gif',
'26.gif',
'27.gif',
'28.gif',
'29.gif',
'30.gif',
'31.gif',
'32.gif',
'33.gif',
'34.gif',
'35.gif',
'36.gif',
'37.gif',
'38.gif',
'39.gif',
'40.gif',
'41.gif',
'42.gif',
'43.gif',
'44.gif',
'45.gif',
'46.gif',
'47.gif',
'48.gif',
'49.gif',
'50.gif',
'51.gif',
'52.gif',
'53.gif',
'54.gif',
'55.gif',
'56.gif',
'57.gif',
'58.gif',
'59.gif',
'60.gif',
'61.gif',
'62.gif',
'63.gif',
'64.gif',
'65.gif',
'66.gif',
'67.gif',
'68.gif',
'69.gif',
'70.gif',
'71.gif',
'72.gif',
'73.gif',
'74.gif',
'75.gif',
'76.gif',
'77.gif',
'78.gif',
'79.gif',
'80.gif',
'81.gif',
'82.gif',
'83.gif',
'84.gif',
'85.gif',
'86.gif',
'87.gif',
'88.gif',
'89.gif',
'90.gif',
'91.gif',
'92.gif',
'93.gif',
'94.gif',
'95.gif',
'96.gif',
'97.gif',
'98.gif',
'99.gif',
'100.gif',
'101.gif',
'102.gif',
'103.gif',
'104.gif',
'105.gif',
'106.gif',
'107.gif',
'108.gif',
'109.gif',
'110.gif',
'111.gif',
'112.gif',
'113.gif',
'114.gif',
'115.gif',
'116.gif',
'117.gif',
'118.gif',
'119.gif',
'120.gif',
'121.gif',
'122.gif',
'123.gif',
'124.gif',
'125.gif',
'126.gif',
'127.gif',
'128.gif',
'129.gif',
'130.gif',
'131.gif',
'132.gif',
'133.gif',
'134.gif',
'135.gif',
'136.gif',
'137.gif',
'138.gif',
'139.gif',
'140.gif',
'141.gif',
'142.gif',
'143.gif',
'144.gif',
'145.gif',
'146.gif',
'147.gif',
'148.gif',
'149.gif',
'150.gif',
'151.gif',
'152.gif',
'153.gif',
'154.gif',
'155.gif',
'156.gif',
'157.gif',
'158.gif',
'159.gif',
'160.gif',
'161.gif',
'162.gif',
'163.gif',
'164.gif',
'165.gif',
'166.gif',
'167.gif',
'168.gif',
'169.gif',
'170.gif'
	]
]);

smileData.push([
    'B_Smily',
    'http://www.addemoticons.com/emoticon/animated/',
    [
	'AddEmoticons04211.gif','AddEmoticons04212.gif','AddEmoticons04213.gif',
	'AddEmoticons04214.gif','AddEmoticons04215.gif','AddEmoticons04216.gif',
	'AddEmoticons04217.gif','AddEmoticons04218.gif','AddEmoticons04219.gif',        				'AddEmoticons04220.gif','AddEmoticons04221.gif','AddEmoticons04222.gif',
	'AddEmoticons04223.gif','AddEmoticons04224.gif','AddEmoticons04225.gif',       				'AddEmoticons04226.gif','AddEmoticons04227.gif','AddEmoticons04228.gif',
	'AddEmoticons04229.gif','AddEmoticons04230.gif','AddEmoticons04231.gif',
	'AddEmoticons04232.gif','AddEmoticons04233.gif','AddEmoticons04234.gif',        				'AddEmoticons04235.gif','AddEmoticons04236.gif','AddEmoticons04237.gif',
	'AddEmoticons04238.gif','AddEmoticons04239.gif','AddEmoticons04240.gif',
	'AddEmoticons04241.gif','AddEmoticons04242.gif','AddEmoticons04243.gif',        				'AddEmoticons04244.gif','AddEmoticons04245.gif','AddEmoticons04246.gif',
	'AddEmoticons04247.gif','AddEmoticons04248.gif','AddEmoticons04249.gif',
	'AddEmoticons04250.gif','AddEmoticons04251.gif','AddEmoticons04252.gif',
	'AddEmoticons04253.gif','AddEmoticons04254.gif','AddEmoticons04255.gif',
	'AddEmoticons04256.gif','AddEmoticons04257.gif','AddEmoticons04258.gif',
	'AddEmoticons04259.gif','AddEmoticons04260.gif','AddEmoticons04261.gif',
	'AddEmoticons04262.gif','AddEmoticons04263.gif','AddEmoticons04264.gif',
	'AddEmoticons04265.gif','AddEmoticons04266.gif','AddEmoticons04267.gif',
	'AddEmoticons04268.gif','AddEmoticons04269.gif','AddEmoticons04270.gif',
	'AddEmoticons04271.gif','AddEmoticons04272.gif','AddEmoticons04273.gif',
	'AddEmoticons04274.gif','AddEmoticons04275.gif','AddEmoticons04276.gif',
	'AddEmoticons04277.gif','AddEmoticons04278.gif','AddEmoticons04279.gif',
	'AddEmoticons04280.gif','AddEmoticons04281.gif','AddEmoticons04282.gif',
	'AddEmoticons04283.gif','AddEmoticons04284.gif','AddEmoticons04285.gif',
	'AddEmoticons04286.gif','AddEmoticons04287.gif',

    ]
]);


smileData.push([
	'Banana',
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
	'TinyPic',
	'http://s5.tinypic.com/',
	[
		'qrgg2v.jpg','et8kra.jpg','fdrci8.jpg','6rr7r5.jpg','2d0ckes.jpg','24azur8.jpg','2gwry1w.jpg'
	]
]);


smileData.push([
	'Monkey',
	'http://www.addemoticons.com/emoticon/monkey/AddEmoticons126',
	[
		'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif','71.gif','72.gif','73.gif','74.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif','81.gif','82.gif','83.gif','84.gif','85.gif','86.gif','87.gif','88.gif','89.gif','90.gif','91.gif','92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif','99.gif','100.gif','101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif','111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif','120.gif','121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif','128.gif','129.gif','130.gif','131.gif','132.gif','133.gif','134.gif','135.gif','136.gif','137.gif','138.gif','139.gif','140.gif','141.gif','142.gif','143.gif','144.gif','145.gif','146.gif','147.gif','148.gif','149.gif','150.gif','151.gif','152.gif','153.gif','154.gif','155.gif','156.gif','157.gif','158.gif','159.gif','160.gif','161.gif','162.gif','163.gif','164.gif'
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
	'Botak',  
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
	'Gede',
	'http://www.33smiley.com/smiley/emotions/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif'
	]
]);

smileData.push([
	'Yahoo',
	'http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
	'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
	'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
	'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',	
	'51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',
	'61.gif','62.gif','63.gif','64.gif'
]
]);

smileData.push([
	'Tuzki',
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
	'Random',
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