// ==UserScript==
// @name            Plurk Smile Ver.Banana 
// @include         http://www.plurk.com/*
// @description    	圖片來自http://msn.o-pass.com/show.php?list=cf
// modified log:    
// author: Dravex


// ********** Main Script ***********
var smileData = [];

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
// ==/UserScript==