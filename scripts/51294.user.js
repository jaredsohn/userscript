// ==UserScript==
// @name           Plurk Smile (modified from 低調王)
// @namespace      
// @description    此腳本包含 噗浪外掛圖案：北七熊、兔斯基、米滷蛋 & 香蕉人 (在他人河道亦可使用) [Re噗功能 by maxchu]
// @include        http://www.plurk.com/*
// ==/UserScript==

// ==About==
// author:  eeeric
// ********** Main Script ***********
var smileData = [];

smileData.push([
	'北七熊',
	'http://eeeric.byethost14.com/icons/bear/',
	[
	'043.gif','046.gif','012.gif','033.gif','041.gif','081.gif','090.gif','001.gif','002.gif', 
	'003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif','011.gif', 
    '013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif','021.gif',  
    '022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',  
    '031.gif','032.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',  
    '042.gif','044.gif','045.gif','047.gif','048.gif','049.gif','050.gif','051.gif','052.gif',  
    '053.gif','054.gif','055.gif','056.gif','057.gif','058.gif','059.gif','060.gif', '106.gif',  
    '107.gif','061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif',  
    '069.gif','070.gif','071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif',  
    '078.gif','079.gif','080.gif','082.gif','083.gif','084.gif','085.gif','086.gif','087.gif',  
    '088.gif','089.gif','091.gif','092.gif','093.gif','094.gif','095.gif','096.gif','097.gif',  
    '098.gif','099.gif','100.gif','101.gif','102.gif',
	]
]);

smileData.push([
	'米魯蛋',
	'http://eeeric.byethost14.com/icons/egg/',
	[
		'001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif','010.gif',  
        '011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif',  
        '021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif',  
        '031.gif','032.gif','033.gif','034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif',  
        '041.gif','042.gif','043.gif','044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif',  
        '051.gif','052.gif','053.gif','054.gif','055.gif','056.gif','057.gif','058.gif','059.gif','060.gif',  
        '061.gif','062.gif','063.gif','064.gif','065.gif','066.gif','067.gif','068.gif', '069.gif','070.gif',  
        '071.gif','072.gif','073.gif','074.gif','075.gif','076.gif','077.gif','078.gif', '079.gif','080.gif',  
        '081.gif','082.gif','083.gif','084.gif','085.gif','086.gif','087.gif','088.gif','089.gif','090.gif',  
        '091.gif','092.gif','093.gif','094.gif','095.gif','096.gif','097.gif','098.gif','099.gif','100.gif',  
        '101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif',  
        '111.gif','112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif','120.gif',  
        '121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif','128.gif','129.gif','130.gif',  
        '131.gif',
	]
]);

smileData.push([
	'兔斯基',
	'http://eeeric.byethost14.com/icons/rabbit/',
	[
		'01.gif','02.gif','03.gif','04.gif','05.gif','06.gif','07.gif','08.gif','09.gif','10.gif',  
        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',  
        '21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',  
        '31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',  
        '41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif',  
        '51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif','58.gif','59.gif','60.gif',  
        '106.gif','107.gif','61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif',  
        '69.gif','70.gif','71.gif','72.gif','73.gif',  
	]
]);

smileData.push([
        '香蕉人',
        'http://eeeric.byethost14.com/icons/banana/',
        [
        'bn (57).gif','bn (0).gif','bn (1).gif','bn (2).gif','bn (3).gif','bn (4).gif','bn (5).gif','bn (6).gif',  
        'bn (8).gif','bn (9).gif','bn (10).gif','bn (11).gif','bn (12).gif','bn (13).gif','bn (14).gif','bn (15).gif',  
        'bn (16).gif','bn (17).gif','bn (18).gif','bn (19).gif','bn (20).gif','bn (21).gif','bn (22).gif','bn (23).gif',  
        'bn (24).gif','bn (25).gif','bn (26).gif','bn (27).gif','bn (28).gif','bn (29).gif','bn (30).gif','bn (31).gif',  
        'bn (32).gif','bn (33).gif','bn (34).gif','bn (35).gif','bn (36).gif','bn (37).gif','bn (38).gif','bn (39).gif',  
        'bn (40).gif','bn (41).gif','bn (42).gif','bn (43).gif','bn (44).gif','bn (45).gif','bn (46).gif','bn (47).gif',  
        'bn (48).gif','bn (49).gif','bn (50).gif','bn (51).gif','bn (52).gif','bn (53).gif','bn (54).gif','bn (55).gif',  
        'bn (56).gif','bn (58).gif','bn (59).gif','bn (60).gif','bn (61).gif','bn (62).gif','bn (63).gif', 'bn (7).gif',
        'bn (64).gif','bn (65).gif','bn (66).gif','bn (67).gif','bn (68).gif','bn (69).gif','bn (70).gif','bn (71).gif',  
        'bn (72).gif','bn (73).gif','bn (74).gif','bn (75).gif','bn (76).gif','bn (77).gif','bn (78).gif','bn (79).gif',  
        'bn (80).gif','bn (81).gif','bn (82).gif','bn (83).gif','bn (84).gif','bn (85).gif','bn (86).gif','bn (87).gif',  
        'bn (88).gif','bn (89).gif','bn (90).gif','bn (91).gif','bn (92).gif','bn (93).gif','bn (94).gif','bn (95).gif',  
        'bn (96).gif','bn (97).gif','bn (98).gif','bn (99).gif','bn (100).gif','bn (101).gif','bn (102).gif','bn (103).gif',  
        'bn (104).gif','bn (105).gif','bn (106).gif','bn (107).gif','bn (108).gif','bn (109).gif','bn (110).gif','bn (111).gif',  
        'bn (112).gif','bn (113).gif','bn (114).gif','bn (115).gif','bn (116).gif','bn (117).gif','bn (118).gif','bn (119).gif',
        'bn (120).gif', 'bn (121).gif','bn (122).gif','bn (123).gif','bn (124).gif','bn (125).gif','bn (126).gif','bn (127).gif',  
        'bn (128).gif','bn (129).gif','bn (130).gif','bn (131).gif','bn (132).gif','bn (133).gif','bn (134).gif', 'bn (191).gif',  
        'bn (135).gif','bn (136).gif','bn (137).gif','bn (138).gif','bn (139).gif','bn (140).gif','bn (141).gif','bn (192).gif',  
        'bn (142).gif','bn (143).gif','bn (144).gif','bn (145).gif','bn (146).gif','bn (147).gif','bn (148).gif','bn (193).gif',  
        'bn (149).gif','bn (150).gif','bn (151).gif','bn (152).gif','bn (153).gif','bn (154).gif','bn (155).gif','bn (194).gif',  
        'bn (156).gif','bn (157).gif','bn (158).gif','bn (159).gif','bn (160).gif','bn (161).gif','bn (162).gif','bn (195).gif',  
        'bn (163).gif','bn (164).gif','bn (165).gif','bn (166).gif','bn (167).gif','bn (168).gif','bn (169).gif','bn (190).gif',  
        'bn (170).gif','bn (171).gif','bn (172).gif','bn (173).gif','bn (174).gif','bn (175).gif','bn (167).gif','bn (189).gif',  
        'bn (177).gif','bn (178).gif','bn (179).gif','bn (180).gif','bn (181).gif','bn (182).gif','bn (183).gif','bn (188).gif',  
        'bn (184).gif','bn (185).gif','bn (186).gif','bn (187).gif',  
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
				var rp = $('<a href="#" id="RePlurk">re-plurk</a>').css('float','right').css('right-padding','3px').click(function(){
					doRePlurk(owner_id,raw,link);
				});

				pp.after(rp);
			}

		}
	}
}

function doRePlurk(owner_id,raw,link){
	var nick = uw.SiteState.getUserById(owner_id).nick_name;

	//$('#input_big').val(link + ' ([Re]) ' + ((nick) ? ( ' by ' + '@' + nick + ': ') : '') + raw);
	$('#input_big').val(link + ' ([Fwd]) ' + ': ' + raw);
	p._removeExpand();
	uw.MaxChar.updateBig();
}
