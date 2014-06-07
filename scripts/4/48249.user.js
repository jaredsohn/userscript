// ==UserScript==
// @name            plurk smile
// @namespace       http://userscripts.org/
// @description     綜合版
// @include         http://www.plurk.com/*
// modified log:   
// ==/UserScript==


// ********** Main Script ***********
var smileData = [];

smileData.push([
	'麦咪和熊熊',
	'http://qqimg.knowsky.com/qqbiaoqing/maimi/',
	[
		'maimi%20(1).gif','maimi%20(2).gif','maimi%20(3).gif','maimi%20(4).gif','maimi%20(5).gif','maimi%20(6).gif','maimi%20(7).gif','maimi%20(8).gif','maimi%20(9).gif','maimi%20(10).gif',
		'maimi%20(11).gif','maimi%20(12).gif','maimi%20(13).gif','maimi%20(14).gif','maimi%20(15).gif','maimi%20(16).gif','maimi%20(17).gif','maimi%20(18).gif','maimi%20(19).gif','maimi%20(20).gif',
		'maimi%20(21).gif','maimi%20(22).gif','maimi%20(23).gif','maimi%20(24).gif','maimi%20(25).gif','maimi%20(26).gif','maimi%20(27).gif','maimi%20(28).gif','maimi%20(29).gif','maimi%20(30).gif',
		'maimi%20(31).gif','maimi%20(32).gif','maimi%20(33).gif','maimi%20(34).gif','maimi%20(35).gif','maimi%20(36).gif','maimi%20(37).gif','maimi%20(38).gif','maimi%20(39).gif','maimi%20(40).gif',
		'maimi%20(41).gif','maimi%20(42).gif','maimi%20(43).gif','maimi%20(44).gif','maimi%20(45).gif','maimi%20(46).gif','maimi%20(47).gif','maimi%20(48).gif','maimi%20(49).gif','maimi%20(50).gif',
		'maimi%20(51).gif','maimi%20(52).gif','maimi%20(53).gif','maimi%20(54).gif','maimi%20(55).gif','maimi%20(56).gif','maimi%20(57).gif','maimi%20(58).gif','maimi%20(59).gif','maimi%20(60).gif',
		'maimi%20(61).gif','maimi%20(62).gif','maimi%20(63).gif','maimi%20(64).gif','maimi%20(65).gif','maimi%20(66).gif','maimi%20(67).gif','maimi%20(68).gif','maimi%20(69).gif','maimi%20(70).gif',
		'maimi%20(71).gif','maimi%20(72).gif','maimi%20(73).gif','maimi%20(74).gif','maimi%20(75).gif','maimi%20(76).gif','maimi%20(77).gif','maimi%20(78).gif','maimi%20(79).gif','maimi%20(80).gif',
		'maimi%20(81).gif','maimi%20(82).gif','maimi%20(83).gif','maimi%20(84).gif','maimi%20(85).gif','maimi%20(86).gif','maimi%20(87).gif','maimi%20(88).gif','maimi%20(89).gif','maimi%20(90).gif',
		'maimi%20(91).gif','maimi%20(92).gif','maimi%20(93).gif','maimi%20(94).gif','maimi%20(95).gif','maimi%20(96).gif','maimi%20(97).gif','maimi%20(98).gif','maimi%20(99).gif','maimi%20(100).gif',
        ]
]);

smileData.push([
	'麦咪和熊熊2',
	'http://qqimg.knowsky.com/qqbiaoqing/maimi/',
	[
		'maimi%20(101).gif','maimi%20(102).gif','maimi%20(103).gif','maimi%20(104).gif','maimi%20(105).gif','maimi%20(106).gif','maimi%20(107).gif','maimi%20(108).gif','maimi%20(109).gif','maimi%20(110).gif',
		'maimi%20(111).gif','maimi%20(112).gif','maimi%20(113).gif','maimi%20(114).gif','maimi%20(115).gif','maimi%20(116).gif','maimi%20(117).gif','maimi%20(118).gif','maimi%20(119).gif','maimi%20(120).gif',
		'maimi%20(121).gif','maimi%20(122).gif','maimi%20(123).gif','maimi%20(124).gif','maimi%20(125).gif','maimi%20(126).gif','maimi%20(127).gif','maimi%20(128).gif','maimi%20(129).gif','maimi%20(130).gif',
		'maimi%20(131).gif','maimi%20(132).gif','maimi%20(133).gif','maimi%20(134).gif','maimi%20(135).gif','maimi%20(136).gif','maimi%20(137).gif','maimi%20(138).gif','maimi%20(139).gif','maimi%20(140).gif',
		'maimi%20(141).gif','maimi%20(142).gif','maimi%20(143).gif','maimi%20(144).gif','maimi%20(145).gif','maimi%20(146).gif','maimi%20(147).gif','maimi%20(148).gif','maimi%20(149).gif','maimi%20(150).gif',
		'maimi%20(151).gif','maimi%20(152).gif','maimi%20(153).gif','maimi%20(154).gif','maimi%20(155).gif','maimi%20(156).gif','maimi%20(157).gif','maimi%20(158).gif','maimi%20(159).gif','maimi%20(160).gif',
		'maimi%20(161).gif','maimi%20(162).gif','maimi%20(163).gif','maimi%20(164).gif','maimi%20(165).gif','maimi%20(166).gif','maimi%20(167).gif','maimi%20(168).gif','maimi%20(169).gif','maimi%20(170).gif',
		'maimi%20(171).gif','maimi%20(172).gif','maimi%20(173).gif','maimi%20(174).gif','maimi%20(175).gif','maimi%20(176).gif','maimi%20(177).gif','maimi%20(178).gif','maimi%20(179).gif','maimi%20(180).gif',
		'maimi%20(181).gif','maimi%20(182).gif','maimi%20(183).gif','maimi%20(184).gif','maimi%20(185).gif','maimi%20(186).gif','maimi%20(187).gif','maimi%20(188).gif','maimi%20(189).gif','maimi%20(190).gif',
		'maimi%20(191).gif','maimi%20(192).gif',		
        ]
]);

smileData.push([
	'炮炮兵',
	'http://qqimg.knowsky.com/qqbiaoqing/ltk/',
	[
		'ltk%20(1).gif','ltk%20(2).gif','ltk%20(3).gif','ltk%20(4).gif','ltk%20(5).gif','ltk%20(6).gif','ltk%20(7).gif','ltk%20(8).gif','ltk%20(9).gif','ltk%20(10).gif',
		'ltk%20(11).gif','ltk%20(12).gif','ltk%20(13).gif','ltk%20(14).gif','ltk%20(15).gif','ltk%20(16).gif','ltk%20(17).gif','ltk%20(18).gif','ltk%20(19).gif','ltk%20(20).gif',
		'ltk%20(21).gif','ltk%20(22).gif','ltk%20(23).gif','ltk%20(24).gif','ltk%20(25).gif','ltk%20(26).gif','ltk%20(27).gif','ltk%20(28).gif','ltk%20(29).gif','ltk%20(30).gif',
		'ltk%20(31).gif','ltk%20(32).gif','ltk%20(33).gif','ltk%20(34).gif','ltk%20(35).gif','ltk%20(36).gif','ltk%20(37).gif','ltk%20(38).gif','ltk%20(39).gif','ltk%20(40).gif',
		'ltk%20(41).gif','ltk%20(42).gif','ltk%20(43).gif','ltk%20(44).gif','ltk%20(45).gif','ltk%20(46).gif','ltk%20(47).gif','ltk%20(48).gif','ltk%20(49).gif','ltk%20(50).gif',
		'ltk%20(51).gif','ltk%20(52).gif','ltk%20(53).gif','ltk%20(54).gif','ltk%20(55).gif','ltk%20(56).gif','ltk%20(57).gif','ltk%20(58).gif','ltk%20(59).gif','ltk%20(60).gif',
		'ltk%20(61).gif','ltk%20(62).gif','ltk%20(63).gif','ltk%20(64).gif','ltk%20(65).gif','ltk%20(66).gif','ltk%20(67).gif','ltk%20(68).gif','ltk%20(69).gif','ltk%20(70).gif',
		'ltk%20(71).gif','ltk%20(72).gif','ltk%20(73).gif','ltk%20(74).gif','ltk%20(75).gif','ltk%20(76).gif','ltk%20(77).gif','ltk%20(78).gif','ltk%20(79).gif','ltk%20(80).gif',
		'ltk%20(81).gif','ltk%20(82).gif','ltk%20(83).gif','ltk%20(84).gif','ltk%20(85).gif','ltk%20(86).gif','ltk%20(87).gif','ltk%20(88).gif','ltk%20(89).gif','ltk%20(90).gif',
		'ltk%20(91).gif','ltk%20(92).gif','ltk%20(93).gif','ltk%20(94).gif','ltk%20(95).gif','ltk%20(96).gif','ltk%20(97).gif','ltk%20(98).gif','ltk%20(99).gif','ltk%20(100).gif',
		'ltk%20(101).gif','ltk%20(102).gif','ltk%20(103).gif','ltk%20(104).gif','ltk%20(105).gif','ltk%20(106).gif','ltk%20(107).gif','ltk%20(108).gif','ltk%20(109).gif','ltk%20(110).gif',
		'ltk%20(111).gif','ltk%20(112).gif','ltk%20(113).gif','ltk%20(114).gif','ltk%20(115).gif','ltk%20(116).gif','ltk%20(117).gif','ltk%20(118).gif','ltk%20(119).gif','ltk%20(120).gif',
		'ltk%20(121).gif','ltk%20(122).gif','ltk%20(123).gif','ltk%20(124).gif','ltk%20(125).gif','ltk%20(126).gif','ltk%20(127).gif','ltk%20(128).gif','ltk%20(129).gif','ltk%20(130).gif',
		'ltk%20(131).gif','ltk%20(132).gif','ltk%20(133).gif','ltk%20(134).gif','ltk%20(135).gif','ltk%20(136).gif','ltk%20(137).gif','ltk%20(138).gif','ltk%20(139).gif','ltk%20(140).gif',
		'ltk%20(141).gif','ltk%20(142).gif','ltk%20(143).gif','ltk%20(144).gif','ltk%20(145).gif','ltk%20(146).gif','ltk%20(147).gif','ltk%20(148).gif','ltk%20(149).gif','ltk%20(150).gif',
		'ltk%20(151).gif','ltk%20(152).gif','ltk%20(153).gif','ltk%20(154).gif','ltk%20(155).gif','ltk%20(156).gif','ltk%20(157).gif','ltk%20(158).gif','ltk%20(159).gif','ltk%20(160).gif',
		'ltk%20(161).gif','ltk%20(162).gif','ltk%20(163).gif','ltk%20(164).gif','ltk%20(165).gif','ltk%20(166).gif','ltk%20(167).gif','ltk%20(168).gif','ltk%20(169).gif','ltk%20(170).gif',
		'ltk%20(171).gif','ltk%20(172).gif','ltk%20(173).gif','ltk%20(174).gif','ltk%20(175).gif','ltk%20(176).gif','ltk%20(177).gif','ltk%20(178).gif','ltk%20(179).gif','ltk%20(180).gif',
		'ltk%20(181).gif','ltk%20(182).gif','ltk%20(183).gif','ltk%20(184).gif','ltk%20(185).gif','ltk%20(186).gif','ltk%20(187).gif','ltk%20(188).gif','ltk%20(189).gif','ltk%20(190).gif',
		'ltk%20(191).gif','ltk%20(192).gif','ltk%20(193).gif','ltk%20(194).gif','ltk%20(195).gif','ltk%20(196).gif','ltk%20(197).gif','ltk%20(198).gif','ltk%20(199).gif','ltk%20(200).gif',
                'ltk%20(201).gif','ltk%20(202).gif','ltk%20(203).gif','ltk%20(204).gif','ltk%20(205).gif','ltk%20(206).gif','ltk%20(207).gif','ltk%20(208).gif','ltk%20(209).gif','ltk%20(210).gif',
		'ltk%20(211).gif','ltk%20(212).gif','ltk%20(213).gif','ltk%20(214).gif','ltk%20(215).gif','ltk%20(216).gif',
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