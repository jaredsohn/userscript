// ==UserScript==
// @name            Plurk Funtion Ver.Dravex
// @include         http://www.plurk.com/*
// @description    	Plurk Funtion + Other Plurk Smile（Build 20091019）
// modified log:    
// author: // author: Plurk Translate（Peteris Krumins）、Plurker 2 _blank（kris7topher）、Plurk Productivity（Katharine Berry ）、Plurk Time Jumper（Wisely Song）、Plurk Rich Edit（maxchu）、PLURK小月曆（rein）、RE ＆ Plurk Smile（???）       
// Changed : Dravex



// ********** Main Script ***********
var smileData = [];

smileData.push([
	'Neuro',
	'http://i854.photobucket.com/albums/ab108/vvveeexxx/Neuro/',
	[
	'lift.gif','ninetail.gif','cupid.gif','kiss.gif','kiss2.gif','bite.gif','can.gif','can2.gif','push.gif','eye.gif',
	'teacher.gif','shu.gif','prince.gif','prince2.gif','clap1.gif','clap2.gif','mnicons2_ai.gif','mnicons2_akane.gif','mnicons2_asada131.gif','mnicons2_asada54.gif',
	'mnicons2_aya.gif','mnicons2_eishi.gif','mnicons2_godai.gif','mnicons2_hal_kawa.gif','mnicons2_haruka.gif','mnicons2_hayasaka.gif','mnicons2_hayasaka2.gif','mnicons2_higuchi.gif','mnicons2_histerrier.gif','mnicons2_honjo.gif',
	'mnicons2_ikeya.gif','mnicons2_jun.gif','mnicons2_kaede.gif','mnicons2_kanae.gif','mnicons2_kasai.gif','mnicons2_mochi.gif','mnicons2_mutsuki.gif','mnicons2_neuro.gif','mnicons2_neuro2.gif','mnicons2_rice.gif',
	'mnicons2_saotome.gif','mnicons2_setsuna.gif','mnicons2_shirota.gif','mnicons2_todoroki.gif','mnicons2_tsukushi.gif','mnicons2_usui.gif','mnicons2_xi.gif','mnicons2_yako.gif','mnicons2_yuka.gif','mnicons2_yuki.gif',
	'mnicons2_yuki2.gif','mnicons4_akane.gif','mnicons4_eishi.gif','mnicons4_evil_f.gif','mnicons4_godai.gif','mnicons4_kanae.gif','mnicons4_neuro.gif','mnicons4_yako.gif','mnicons5_akane.gif','mnicons5_eishi.gif',
	'mnicons5_evil_f.gif','mnicons5_godai.gif','mnicons5_kanae.gif','mnicons5_neuro.gif','mnicons5_sabre.gif','mnicons5_yako.gif','mnicons_ai.gif','mnicons_akane.gif','mnicons_are.gif','mnicons_asada.gif',
	'mnicons_aya.gif','mnicons_eishi.gif','mnicons_evil_f.gif','mnicons_godai.gif','mnicons_hal_kawa.gif','mnicons_haruka.gif','mnicons_hayasaka.gif','mnicons_hayasaka2.gif','mnicons_higuchi.gif','mnicons_histerrier.gif',
	'mnicons_ikeya.gif','mnicons_jun.gif','mnicons_kanae.gif','mnicons_kasai.gif','mnicons_mochi.gif','mnicons_mochi2.gif','mnicons_neuro.gif','mnicons_neuro2.gif','mnicons_neuro3.gif','mnicons_neuro4.gif',
	'mnicons_rice.gif','mnicons_saotome.gif','mnicons_setsuna.gif','mnicons_shirota.gif','mnicons_tsukushi.gif','mnicons_tsuyoku.gif','mnicons_usui.gif','mnicons_webclap.gif','mnicons_webclap2.gif','mnicons_webclap3.gif',
	'mnicons_xi.gif','mnicons_yako.gif','mnicons_yuka.gif','mnicons_yuki.gif','mnicons_yuki2.gif','mnicons3_tori.gif','zzz.gif','fox.gif','pandaeye.jpg','neuroturn.gif',
	'neuroturn2.gif','neuroturn3.gif','neuroturn4.gif','usui.gif','usui2.gif','usuio.gif','usuio2.gif','us_aisatsu.gif','us_aisatsu2.gif','usuipakpak.gif',
	'usuipakpak2.gif','uragiri01.gif','uragiri02.gif','step.jpg','orz.gif','akane.gif','yakane.gif','akane_yama.gif','akanemizugi.gif','akanemizugi2.gif',
	'claw.gif','iconn.gif','userif.gif','userif1.gif','mn_mail.gif','magen2.gif','mnicons3_ezaki2.gif','mnicons3_marurobo.gif','mnicons3_monaka.gif','mnicons3_neuro.gif',
	'mnicons3_yako_candy.gif','mnicons3_tension.gif','mnicons3_dorei1.gif','mnicons3_dorei2.gif','hold1.gif','hold2.gif','hold3.gif','roll.gif','roll2.gif','kill.gif',
	'hit.gif','pole.gif','neurochair.gif','mnicons3_eat.gif','eat.gif','sasakuza.gif','mnicons3_penpen.gif','mnicons3_ai.gif','mnicons3_yakopolice.gif','mnicons3_neuropolice.gif',
	'mnicons3_police.gif','mnicons3_sign.gif','mnicons3_talk.gif','mnicons3_talk2.gif','mnicons3_yako_a.gif','mnicons3_yako_b.gif','mnicons3_yako_c.gif','mnicons3_yako_d.gif'
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
	'顏の字',
	'http://i854.photobucket.com/albums/ab108/vvveeexxx/FaceWord/',
	[
	'wf0.gif','wf1.gif','wf2.gif','wf3.gif','wf4.gif','wf5.gif','wf6.gif','wf7.gif','wf8.gif','wf9.gif',
	'wf10.gif','wf11.gif','wf12.gif','wf13.gif','wf14.gif','wf15.gif','wf16.gif','wf17.gif','wf18.gif','wf19.gif',
	'wf20.gif','wf21.gif','wf22.gif','wf23.gif','wf24.gif','wf25.gif','wf26.gif','wf27.gif','wf28.gif','wf29.gif',
	'wf30.gif','wf31.gif','wf32.gif','wf33.gif','wf34.gif','wf35.gif','wf36.gif','wf37.gif','wf38.gif','wf39.gif',
	'wf40.gif','wf41.gif','wf42.gif','wf43.gif','wf44.gif','wf45.gif','wf46.gif','wf47.gif','wf48.gif','wf49.gif',
	'wf50.gif','wf51.gif','wf52.gif','wf53.gif','wf54.gif','wf55.gif','wf56.gif','wf57.gif','wf58.gif','wf59.gif',
	'wf60.gif','wf61.gif','wf62.gif','wf63.gif','wf64.gif','wf65.gif','wf66.gif','wf67.gif','wf68.gif','wf69.gif',
	'wf70.gif','wf71.gif','wf72.gif','wf73.gif','wf74.gif','wf75.gif','wf76.gif','wf77.gif','wf78.gif','wf79.gif',
	'wf80.gif','wf81.gif','wf82.gif','wf83.gif','wf84.gif','wf85.gif','wf86.gif','wf87.gif','wf88.gif','wf89.gif',
	'wf90.gif','wf91.gif','wf92.gif','wf93.gif','wf94.gif','wf95.gif','wf96.gif','wf97.gif','wf98.gif','wf99.gif',
	'wf100.gif','wf101.gif','wf102.gif','wf103.gif','wf104.gif','wf105.gif','wf106.gif','wf107.gif','wf108.gif','wf109.gif',
	'wf110.gif','wf111.gif','wf112.gif','wf113.gif','wf114.gif','wf115.gif','wf116.gif','wf117.gif','wf118.gif','wf119.gif',
	'wf120.gif','wf121.gif','wf122.gif','wf123.gif','wf124.gif','wf125.gif','wf126.gif','wf127.gif','wf128.gif','wf129.gif',
	'wf130.gif','wf131.gif','wf132.gif','wf133.gif','wf134.gif','wf135.gif','wf136.gif','wf137.gif','wf138.gif','wf139.gif',
	'wf140.gif','wf141.gif','wf142.gif','wf143.gif','wf144.gif','wf145.gif','wf146.gif','wf147.gif','wf148.gif','wf149.gif',
	'wf150.gif','wf151.gif','wf152.gif','wf153.gif','wf154.gif','wf155.gif','wf156.gif','wf157.gif','wf158.gif','wf159.gif',
	'wf160.gif','wf161.gif','wf162.gif','wf163.gif','wf164.gif','wf165.gif','wf166.gif','wf167.gif','wf168.gif','wf169.gif',
	'wf170.gif','wf171.gif','wf172.gif','wf173.gif','wf174.gif','wf175.gif','wf176.gif','wf177.gif','wf178.gif','wf179.gif'	
    ]
]);

smileData.push([
	'Egg',
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
	'BoBo',
	'http://s854.photobucket.com/albums/ab108/vvveeexxx/BoBo/',
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
	'091.gif','092.gif'
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
	'電腦',
	'http://itsgod.myweb.hinet.net/images/pc/',
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
        '111.gif','112.gif','113.gif', '114.gif','115.gif',
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





// == RE 單鍵轉噗== //
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		window.setTimeout(doRTE, 2000);
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










// Plurk Translator           翻譯            v1.2    2009.03.21//


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






// Plurker 2 _blank (fixed by Kiss K D) 點ID開新頁//

(function(blank) {
setTimeout(function() {
as = document.getElementsByTagName('a');
for (i = 0; i<as.length; i++) {
if (as[i].className == "name") as[i].setAttribute('target', '_blank');
}
setTimeout(arguments.callee, 1000);
}, 1000);
})();







// == Rich Edit == //

// == CONSTANTS == //

var CONTROL_BAR_ITEM_COMMAND = {
	ITALICIZE: 1,
	EMBOLDEN: 2,
	UNDERLINE: 3,
	LINK: 4,
	FLICKR: 5,
}

// == LIFECYCLE == //

var o_Plurks_editPlurk;
var o_Plurks__cancelOnClick;
var o_Plurks__saveOnClick;
var o_Plurks_removeExpand;

var o_Plurks_editPlurk_cb;

doRTE = function(){
	var taids = ["input_big", "input_permalink"];

	for(i=0;i<taids.length;i++) {
		var t = $("#" + taids[i])[0];
		if(t) {
			new ControlBar( true, true, true, true, true ).inject(t);
		}
	}

	var p = unsafeWindow.Plurks;

	if(p) {
		o_Plurks_editPlurk = p._editPlurk;
		o_Plurks__cancelOnClick = p.__cancelOnClick;
		p.__cancelOnClick = function() {
			if(o_Plurks_editPlurk_cb) o_Plurks_editPlurk_cb.empty();
			o_Plurks__cancelOnClick();
		};
		o_Plurks_removeExpand = p._removeExpand;

		p._removeExpand = function(D) {
			if(o_Plurks_editPlurk_cb) o_Plurks_editPlurk_cb.empty();
			o_Plurks_removeExpand(D);
		};

		$dp = unsafeWindow.$dp;

		$($dp.man).children('.action').each(function(){
			$(this).unbind('click',p._editPlurk);
			$(this).click(function() {
				o_Plurks_editPlurk();
				o_Plurks_editPlurk_cb = new ControlBar( true, true, true, true, true ).inject($dp.ta);
				p.repositonCurrent();
				return false;
			});
		});

		$($dp.saver).children('.cancel').each(function(){
			$(this).unbind('click', o_Plurks__cancelOnClick);
			$(this).click(p.__cancelOnClick);
		});

		if(p.poster) {
			new ControlBar( true, true, true, true, true ).inject(p.poster.input);
		}
	}
};

// == CLASSES == //

function ControlBar( showItalic, showBold, showUnderline, showLink, showFlickr)
{
	this.showItalic = showItalic;
	this.showBold = showBold;
	this.showUnderline = showUnderline;
	this.showLink = showLink;
	this.showFlickr = showFlickr;

	this.inject = function( targetTextArea )
	{
		var controlBar = $("<span></span>").css('padding','1px').css('margin-bottom','1px').css('font-size','11px').css('background','#000').css('opacity','0.75').css('-moz-border-radius','4px').css('display','table');

		if ( showItalic )
		{
			var item = new ControlBarItem( "<i>斜體</i>", CONTROL_BAR_ITEM_COMMAND.ITALICIZE, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showBold )
		{
			var item = new ControlBarItem( "<b>粗體</b>", CONTROL_BAR_ITEM_COMMAND.EMBOLDEN, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showUnderline )
		{
			var item = new ControlBarItem( "<u>底線</u>", CONTROL_BAR_ITEM_COMMAND.UNDERLINE, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showLink )
		{
			var item = new ControlBarItem( "連結", CONTROL_BAR_ITEM_COMMAND.LINK, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showFlickr )
		{
			var item = new ControlBarItem( "Flickr", CONTROL_BAR_ITEM_COMMAND.FLICKR, targetTextArea );

			controlBar.append( item.create() );
		}

		$(targetTextArea).before( controlBar);

		return controlBar;
	};
}

function ControlBarItem( label, editCommand, targetTextArea )
{
	this.label = label;
	this.editCommand = editCommand;
	this.targetTextArea = targetTextArea;

	this.create = function()
	{
		var link = document.createElement("a");
		link.href = "javascript:;";
		link.innerHTML = label;

		link.editCommand = this.editCommand;
		link.targetTextArea = this.targetTextArea;
		link.execute = this.execute;
		link.linkSelection = this.linkSelection;
		link.tagSelection = this.tagSelection;
		link.flickrSearch = this.flickrSearch;

		addEvent( link, "click", "execute" );

		return $(link).css('color','#fff').css('padding','4px').css('text-decoration','none');
	}

	this.execute = function(e)
	{
		switch( this.editCommand )
		{
			case CONTROL_BAR_ITEM_COMMAND.ITALICIZE:
				this.tagSelection( "*", "*" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.EMBOLDEN:
				this.tagSelection( "**", "**" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.UNDERLINE:
				this.tagSelection( "__", "__" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.LINK:
				this.linkSelection();
				break;
			case CONTROL_BAR_ITEM_COMMAND.FLICKR:
				this.flickrSearch();
				break;
			default:
				throw "Unknown command encountered";
		}

		this.blur();
	}

	this.linkSelection = function()
	{
		var url = prompt( "Enter the URL:", "" );

		if (url && url != '' )
		{
			// work around Mozilla Bug #190382
			if ( this.targetTextArea.selectionEnd > this.targetTextArea.value.length )
			{
				this.targetTextArea.selectionEnd = this.targetTextArea.value.length;
			}
			//We will restore the selection later, so record the current selection.
			var selectionStart = this.targetTextArea.selectionStart;
			var selectionEnd = this.targetTextArea.selectionEnd;
			var desc = '';
			if(selectionStart == selectionEnd) {
				desc = prompt( "Enter the Description:", "" );
			}
			if(!desc) desc = '';

			this.tagSelection( url + ' (', desc + ')' );
		}
	}

	this.flickrSearch = function()
	{
		showFlickrBox(targetTextArea);
	}

	this.tagSelection = function( tagOpen, tagClose )
	{
		if ( this.targetTextArea.selectionStart || this.targetTextArea.selectionStart == 0 ) //relies on this property.
		{
			//record scroll top to restore it later.
			var scrollTop = this.targetTextArea.scrollTop;

			// work around Mozilla Bug #190382
			if ( this.targetTextArea.selectionEnd > this.targetTextArea.value.length )
			{
				this.targetTextArea.selectionEnd = this.targetTextArea.value.length;
			}

			//We will restore the selection later, so record the current selection.
			var selectionStart = this.targetTextArea.selectionStart;
			var selectionEnd = this.targetTextArea.selectionEnd;

			this.targetTextArea.value =
				this.targetTextArea.value.substring( 0, selectionStart ) + //text leading up to the selection start
				tagOpen +
				this.targetTextArea.value.substring( selectionStart, selectionEnd ) + //selected text
				tagClose +
				this.targetTextArea.value.substring( selectionEnd ); //text after the selection end

			this.targetTextArea.selectionStart = selectionStart + tagOpen.length;
			this.targetTextArea.selectionEnd = selectionEnd + tagOpen.length;

			this.targetTextArea.scrollTop = scrollTop;

			this.targetTextArea.focus();
		}
	}
}

// == Flickr Serach == //

var frAPIKey = '17f5005ce502a30e727c558a87cb8470';

var frVarWidth = 150;
var frKeyNSID = 'fr_key_nsid';
var frKeyRememberMe = 'fr_key_member_me';

var frBox;
var frResult;
var frCellNum;
var frRowNum;

var frOptUsername;
var frOptKeyword;
var frOptSort;
var frOptRememberMe;

var frSearchURL;

function showFlickrBox(targetTextArea) {

	unsafeWindow.frTargetTA = targetTextArea;

	if(!frBox) {

		frCellNum = parseInt((window.innerWidth - 150) / frVarWidth);
		frRowNum = parseInt((window.innerHeight - 200) / frVarWidth);
		var frBoxWidth = (frCellNum * frVarWidth);

		frBox = $('<div></div>').attr('id','frBox').css('position','absolute').css('overflow','visible').css('width',frBoxWidth + 'px').css('top','20px').css('padding','0px').css('margin','15px').css('left',(1*document.body.clientWidth-frBoxWidth)/2 + 'px').css('display','none').css('border','3px solid #F7861B').css('background','#ffffff').css('zIndex','999999999').css('font-family','Arial,Helvetica,sans-serif').css('-moz-border-radius','8px').css('color','#000');
		$('body').append(frBox);

		// title
		var titlebar = $('<div><span style="color:#0063DC">Flick</span><span style="color:#FF0084">r</span> Search</div>').css('text-align','center').css('font-size','14px').css('font-weight','bold').css('letter-spacing','2px').css('padding','5px');
		frBox.append(titlebar);

		// option
		var optionbar = $('<div></div>').css('padding','5px').css('background','#fefefe').css('border-top','1px dashed #000');
		frBox.append(optionbar);

		// Flickr Username or Email
		var op1 = $('<span>NSID/Username/Email : </span>').css('padding','5px');
		op1.append(frOptUsername = $('<input type="text" size="20"/>'));
		optionbar.append(op1);

		// retrieves
		setTimeout(function(){
			var nsid = GM_getValue(frKeyNSID);
			if(nsid) {
				frOptUsername.attr('value',nsid);
			}
		},0);

		// remember me
		var op4 = $('<span>Remember Account </span>').css('padding','5px');
		op4.append(frOptRememberMe = $('<input type="checkbox"/>'));
		optionbar.append(op4);

		// retrieves
		setTimeout(function(){
			var rememberMe = GM_getValue(frKeyRememberMe);
			if(rememberMe) {
				frOptRememberMe.attr('checked',rememberMe);
			}
		},0);

		optionbar.append('<br>');

		// keyword
		var op2 = $('<span>Keyword : </span>').css('padding','5px');
		op2.append(frOptKeyword = $('<input type="text" size="20"/>'));
		optionbar.append(op2);

		// sort
		var op3 = $('<span>Sort : </span>').css('padding','5px');
		op3.append(frOptSort = $('<select id="frOptSort"></select>').html(
		'<option value="interestingness-desc">Interestingness Desc</option>' +
		'<option value="interestingness-asc">Interestingness Asc</option>' +
		'<option value="date-posted-asc">Date Posted Asc</option>' +
		'<option value="date-posted-desc">Date Posted Desc</option>' +
		'<option value="date-taken-asc">Date Taken Asc</option>' +
		'<option value="date-taken-desc">Date Taken Desc</option>' +
		'<option value="relevance">relevance</option>'
		));
		optionbar.append(op3);

		var searchbtn;
		optionbar.append(searchbtn = $('<input type="button"/>').attr('value','Go'));
		searchbtn.click(function() {
			doFlickrURLAndSearch();
		});

		// result
		frResult = $('<div></div>').css('padding','5px').css('border-top','1px dashed #000').css('text-align','center');
		frBox.append(frResult);

		// close
		var closebar = $('<div></div>').css('text-align','right').css('background','#F7861B');
		var close = $('<span>Close</span>').css('cursor','point').css('color','#fff').css('background','#F7861B').css('padding','2px').css('font-weight','bold');
		close.click(function() {
			frBox.fadeOut();
		});
		closebar.append(close);
		frBox.append(closebar);

	}

	frBox.fadeIn();

}

function getFlickrURI(method, param) {
	return 'http://api.flickr.com/services/rest/?method=' + method + '&format=json&jsoncallback=?&api_key=' + frAPIKey + '&' + param;
}

function doFlickrURLAndSearch() {

	if(frOptUsername.val() == '') {
		_doFlickrURLAndSearch('');
	}else {
		// by name
		$.getJSON(getFlickrURI('flickr.people.findByUsername','username=' + frOptUsername.val()), function(rsp){
			if(rsp.stat == 'ok') {
				_doFlickrURLAndSearch(rsp.user.nsid);
			}else {
				// by email
				$.getJSON(getFlickrURI('flickr.people.findByEmail','find_email=' + frOptUsername.val()), function(rsp) {
					if(rsp.stat == 'ok') {
						_doFlickrURLAndSearch(rsp.user.nsid);
					}else {
						_doFlickrURLAndSearch(frOptUsername.val());
					}
				});
			}
		});
	}

	// store
	setTimeout(function() {
		var frOptRememberMeisCheck = eval(frOptRememberMe.attr('checked'));
		if(frOptRememberMeisCheck) {
			GM_setValue(frKeyNSID, frOptUsername.attr('value'));
			GM_setValue(frKeyRememberMe, frOptRememberMeisCheck);
		}else {
			GM_setValue(frKeyNSID, '');
			GM_setValue(frKeyRememberMe, false);
		}
	},0);

}

function _doFlickrURLAndSearch(nsid) {

	frSearchURL = getFlickrURI(
		'flickr.photos.search',
		'privacy_filter=1' +
		'&per_page=' + (frCellNum * frRowNum) +
		'&sort=' + $('#frOptSort option:selected')[0].value +
		'&text=' + encodeURIComponent(frOptKeyword.val()) +
		((nsid == '') ? '' : ('&user_id=' + nsid))
		);

	doFlickrSearch();
}

function doFlickrSearch(page) {

	frResult.html('<img src="data:image/gif;base64,R0lGODlhKwALAPEAAP////eGG/rDj/eGGyH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAKwALAAACMoSOCMuW2diD88UKG95W88uF4DaGWFmhZid93pq+pwxnLUnXh8ou+sSz+T64oCAyTBUAACH5BAAKAAEALAAAAAArAAsAAAI9xI4IyyAPYWOxmoTHrHzzmGHe94xkmJifyqFKQ0pwLLgHa82xrekkDrIBZRQab1jyfY7KTtPimixiUsevAAAh+QQACgACACwAAAAAKwALAAACPYSOCMswD2FjqZpqW9xv4g8KE7d54XmMpNSgqLoOpgvC60xjNonnyc7p+VKamKw1zDCMR8rp8pksYlKorgAAIfkEAAoAAwAsAAAAACsACwAAAkCEjgjLltnYmJS6Bxt+sfq5ZUyoNJ9HHlEqdCfFrqn7DrE2m7Wdj/2y45FkQ13t5itKdshFExC8YCLOEBX6AhQAADsAAAAAAAAAAAA%3D">');

	setTimeout(function(){
		$.getJSON(frSearchURL + ((page) ? "&page=" + page : ""),function(rsp) {
			generateFlickrResult(rsp);
		});
	}, 500);

}

function generateFlickrResult(rsp) {

	frResult.html('');

	if (rsp.stat != "ok"){
		frResult.html('<b>' + rsp.message + '</b>');
		return;
	}

	if(rsp.photos.total == 0) {
		frResult.html('<b>No Match !</b>');
		return;
	}

	var photo = rsp.photos.photo;

	var table = $('<table></table>').css('width','100%');
	frResult.append(table);

	var tr;

	for(i in photo) {

		if(i % frCellNum == 0) {
			tr = $('<tr></tr>');
			table.append(tr);
		}

		var td = $('<td></td>').css('text-align','center').css('vertical-align','top').css('width',frVarWidth + 'px');
		tr.append(td);
		var p = photo[i];
		var imgUrl = 'http://farm' + p.farm + '.static.flickr.com/' + p.server + '/' + p.id + '_' + p.secret + '_t.jpg';

		var img = $('<img/>').attr('src',imgUrl).css('padding','5px');
		td.append(img);

		var title = $('<div>' + ((p.title.length > 30) ? (p.title.substr(0,30) + '...') : p.title) + '</div>');
		td.append(title);

		var imgLink = 'http://www.flickr.com/photos/' + p.owner + '/' + p.id + '/';
		var append = $('<span><a href="#" style="color:#fff;font-weight:bold;text-decoration:none;" onclick="javascript:frTargetTA.value += \'' + imgLink + ' \';return false;">+</a></span>').css('background','red').css('-moz-border-radius','2px').css('margin-right','5px').css('padding','0px 2px').css('cursor','pointer');
		title.prepend(append);

	}

	var pagebar = $('<div></div>').css('text-align','center').css('padding','5px').css('border-top','1px dashed #000');
	frResult.append(pagebar);

	var prev;
	if(rsp.photos.page > 1) {
		prev = $('<a/>').css('cursor','pointer').css('color','#0063DC');
		prev.click(function(e) {
			doFlickrSearch(rsp.photos.page-1);
		});
	}else {
		prev = $('<span></span>');
	}
	prev.html('&#9668; Prev');
	pagebar.append(prev);

	var pages = $('<span>&nbsp;&nbsp;&nbsp;<span style="color:#FF0084">' + rsp.photos.page + '</span> / ' + rsp.photos.pages + '&nbsp;&nbsp;&nbsp;</span>').css('color','#0063DC');
	pagebar.append(pages);

	var next;
	if(rsp.photos.page < rsp.photos.pages) {
		next = $('<a/>').css('cursor','pointer').css('color','#0063DC');
		next.click(function(e) {
			doFlickrSearch(rsp.photos.page+1);
		});
	}else {
		next = $('<span></span>');
	}
	next.html('Next &#9658;');
	pagebar.append(next);
}

//Delegated event wire-up utitlity. Using this allows you to use the "this" keyword in a delegated function.
function addEvent( target, eventName, handlerName )
{
	target.addEventListener(eventName, function(e){target[handlerName](e);}, false);
}









//==JumpTo  噗浪時光機==//

var to= "";

(function (window) {
    var date0 = new Date();

    if(!window.$('top_bar')) window.TopBar.init();
    var bar = window.document.getElementById('icon_friends').parentNode.parentNode;
    if(!bar) return;
    var element = window.TopBar.createItem('JumpTo', '[噗浪時光機]', function() {
        if(to=="")
            to= date0.getFullYear()+"/"+(date0.getMonth()+1)+"/"+date0.getDate()+" "+date0.getHours()+":"+date0.getMinutes()+":"+date0.getSeconds(); 
			to = prompt("跳躍至- 西元年份/月/日 時:分:秒 ", to);
        if(!to) return;
	var _date = to.split(' ')[0];
	var _time = to.split(' ')[1];
	var _year = _date.split('/')[0];
	//if no _month,get now Month .
	var _month= (_date.split('/')[1]) ? _date.split('/')[1] : date0.getMonth()+1;
	//if no _day, get now Date .
	var _day  = (_date.split('/')[2]) ? _date.split('/')[2] : date0.getDate();
	// if no _time,make _time=23:59:59 .
	to = _year+"/"+_month+"/"+_day+" "+((_time) ? _time : "23:59:59");
	// call Plurk TimeLine function.
	window.TimeLine.reset();
	window.TimeLine.offset = new Date(to);
	window.TimeLine.showLoading();
	window.TimeLine.getPlurks();
    });
    element.removeChild(element.firstChild);
    bar.appendChild(element);
	
})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);










// ==Plurk Productivity == //

(function () {
    var win = window;
	if(typeof(unsafeWindow) != 'undefined') win = unsafeWindow;
    
    if(isBlocked())
    {
        block(true);
        return;
    }
    if(!win.$('top_bar')) win.TopBar.init();
    var bar = win.document.getElementById('icon_friends').parentNode.parentNode;
    if(!bar) return;
    var element = win.TopBar.createItem('beproductive', '[封鎖計時器]', function() {
        var to = prompt("請問你想封鎖噗浪幾分鐘呢？\n\n（好讓工作保持專心）","10");
        if(!to) return;
        setBlock(to);
    });
    element.removeChild(element.firstChild); // Remove the image they added.
    bar.appendChild(element);
    
    function isBlocked()
    {
        var time = new Date();
        var until = blockedTo();
        if(time.getTime() > until || !until)
        {
            return false;
        }
        return true;
    }
    
    function blockedTo()
    {
        var cookies = win.document.cookie.split(';');
		for(var i = 0; i < cookies.length; ++i)
		{
			var cookie = cookies[i];
			while(cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
			if(cookie.indexOf("plurk_be_productive=") == 0) // We've got it.
			{
				var time = cookie.substring(20, cookie.length) || false;
                return time;
			}
		}
    }
    
    function setBlock(to)
    {
        to = to*1;
        if(to != to)
        {
            alert("Please enter a number.");
            return;
        }
        var date = new Date();
        to = date.getTime() + (to * 60000);
        date.setTime(to);
        win.document.cookie = 'plurk_be_productive='+to+'; expires='+date.toGMTString()+"; path=/";
        block();
    }
    
    function hidestuff()
    {
        var div = win.document.getElementById('hidden-stuff-node');
        if(!div)
        {
            var div = win.document.createElement('div');
            div.setAttribute('id','hidden-stuff-node');
            div.style.display = 'none';
            win.getBody().appendChild(div);
        }
        var node = win.getBody().firstChild;
        while(node) {
            var nextnode = node.nextSibling;
            if(node != div) div.appendChild(node);
            node = nextnode;
        }
    }
    
    function block(firstrun)
    {
        win.Users.updateTitle = function() {
            document.title = 'Be Productive - Plurk.com';
        }
        win.Users.updateTitle();
        hidestuff();
        win.Poll.showUpdates = function(G) { }; // Disable update notifications.
        if(win.fluid)
        {
            win.fluid.dockBadge = '';
            if(firstrun)
            {
                setTimeout(function() {
                    win.fluid.dockBadge = '';
                    win.Poll.showUpdates = function(G) { };
                }, 1000); // This is to protect against my notification script.
            }
        }
        var note = win.document.createElement('p');
        note.innerHTML = 'You have blocked yourself from Plurk in the name of productivity. Get some work done and come back later.';
        win.getBody().appendChild(note);
        
        // Hide the annoying arrows that won't go away.
        var link = win.document.createElement('link');
        link.setAttribute('href','data:text/css;base64,LmJyb3dzZV9idXR0b24ge3Zpc2liaWxpdHk6IGhpZGRlbiAhaW1wb3J0YW50O307');
        link.setAttribute('rel','stylesheet');
        link.setAttribute('type','text/css');
        win.document.getElementsByTagName('head')[0].appendChild(link);
    }
})();






// ==Plurk Calendar== //


(function (window) {
_time="23:59:59"



function showCalendar(gomonth)
	{
	
	//
	var showdate = document.createElement('script');
	showdate.setAttribute('language','JavaScript');
    showdate.setAttribute('src','http://rein.murmur.in/plurk/showcal_v2.1.js');  
	document.getElementsByTagName('head')[0].appendChild(showdate);    
	var style = document.createElement('link');
    style.setAttribute('href','http://rein.murmur.in/plurk/dark_.css');
    style.setAttribute('rel','stylesheet');
    style.setAttribute('type','text/css');
    document.getElementsByTagName('head')[0].appendChild(style);
	var ftb=document.getElementById('filter_tab')
	var element = document.createElement('li');
	element.setAttribute('id','calswitch');
	element.innerHTML="<a title='show Calendar' onclick='showCal()' href='#' class='off_tab'>Calendar</a>";
	ftb.appendChild(element);
	/*var calbox = document.getElementById('top_login')
	var todaydate=new Date()
	var curmonth=todaydate.getMonth()+1+gomonth //get current month (1-12)
	var curyear=todaydate.getFullYear() //get current year
	var content=buildCal(curmonth ,curyear, "main", "month", "daysofweek", "days", 0);
	var element2 = document.createElement('div');
	element2.setAttribute('id','calendar');
	element2.setAttribute('style','visibility:hidden');
	element2.setAttribute('class','cnight');
	element2.innerHTML=content;
	//element.innerHTML+="<a href='javascript:updateCalendar("+(curmonth+1)+","+curyear+")'>next</a> /<a href='javascript:updateCalendar("+(curmonth-1)+","+curyear+")'>next</a> ";
	calbox.appendChild(element2);*/	
	}

window.addEventListener("load", function(){
	setTimeout(function(){
	if(document.getElementById('filter_tab')!=null){showCalendar(0);}
	},2000);

}, false);

})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);

// ==/UserScript==