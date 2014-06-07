// ==UserScript==
// @name           ffrecipe additional link
// @namespace      http://userscripts.org/users/134557
// @description    This script add some links to ffrecipe search results
// @license        MIT License
// @copyright      2010, chattama (http://twitter.com/chattama)
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.ffrecipe.com/*
// ==/UserScript==

//
// Escape Codec Library: ecl.js (Ver.041208)
//
// Copyright (C) http://nurucom-archives.hp.infoseek.co.jp/digital/
//
EscapeUTF8=function(str){
	return str.replace(/[^*+.-9A-Z_a-z-]/g,function(s){
		var c=s.charCodeAt(0);
		return (c<16?"%0"+c.toString(16):c<128?"%"+c.toString(16):c<2048?"%"+(c>>6|192).toString(16)+"%"+(c&63|128).toString(16):"%"+(c>>12|224).toString(16)+"%"+(c>>6&63|128).toString(16)+"%"+(c&63|128).toString(16)).toUpperCase()
	})
};
UnescapeUTF8=function(str){
	return str.replace(/%(E(0%[AB]|[1-CEF]%[89AB]|D%[89])[0-9A-F]|C[2-9A-F]|D[0-9A-F])%[89AB][0-9A-F]|%[0-7][0-9A-F]/ig,function(s){
		var c=parseInt(s.substring(1),16);
		return String.fromCharCode(c<128?c:c<224?(c&31)<<6|parseInt(s.substring(4),16)&63:((c&15)<<6|parseInt(s.substring(4),16)&63)<<6|parseInt(s.substring(7),16)&63)
	})
};


(function(){

var additionalLinks = {
	'ja.ffxiah.com': {
		'link': 'http://jp.ffxiah.com/item_search.php?search_q=',
		'disp': UnescapeUTF8('%e7%ab%b6'),
	},
	'wiki.ffo.jp': {
		'link': 'http://wiki.ffo.jp/search.cgi?CCC=%E6%84%9B&Command=Search&ffotype=title&type=title&qf=',
		'disp': UnescapeUTF8('%e8%aa%9e'),
	},
	'www.great-blue.jp': {
		'link': 'http://www.great-blue.jp/?fid=',
		'disp': UnescapeUTF8('%e9%87%a3'),
		'conv': { // iid: select value
			'4470': '032',
			'5476': '143',
			'5461': '118',
			'4316': '063',
			'4579': '042',
			'4290': '017',
			'4308': '058',
			'4469': '020',
			'4307': '050',
			'5465': '122',
			'4515': '007',
			'5464': '121',
			'5460': '117',
			'5474': '144',
			'4477': '052',
			'4528': '022',
			'4309': '064',
			'5471': '147',
			'4427': '040',
			'4291': '034',
			'5459': '116',
			'4472': '002',
			'4379': '011',
			'4463': '067',
			'5130': '048',
			'4428': '021',
			'5137': '099',
			'4319': '060',
			'4426': '015',
			'4354': '024',
			'4464': '019',
			'5470': '150',
			'5125': '083',
			'4313': '016',
			'5469': '151',
			'4429': '029',
			'5138': '100',
			'5139': '101',
			'5126': '004',
			'5462': '119',
			'4462': '035',
			'5463': '120',
			'5458': '115',
			'4315': '080',
			'5129': '068',
			'4402': '038',
			'4473': '045',
			'4401': '005',
			'4306': '033',
			'4289': '010',
			'5446': '154',
			'4454': '056',
			'4310': '124',
			'5455': '112',
			'4403': '008',
			'5453': '110',
			'5136': '098',
			'5456': '113',
			'5452': '109',
			'4481': '023',
			'5448': '105',
			'5140': '102',
			'5472': '145',
			'5132': '094',
			'4514': '009',
			'5475': '146',
			'4474': '055',
			'5451': '108',
			'5127': '061',
			'4480': '027',
			'4304': '054',
			'4500': '006',
			'4443': '001',
			'4580': '025',
			'5128': '030',
			'4383': '028',
			'4385': '031',
			'4484': '037',
			'4451': '049',
			'4475': '062',
			'4288': '046',
			'4483': '018',
			'5120': '059',
			'4476': '066',
			'5457': '114',
			'5447': '104',
			'5466': '148',
			'4317': '041',
			'4361': '014',
			'4482': '026',
			'4485': '044',
			'5449': '106',
			'4360': '003',
			'5473': '149',
			'4461': '053',
			'4318': '082',
			'4314': '081',
			'4384': '057',
			'4399': '039',
			'4471': '047',
			'5133': '095',
			'4479': '043',
			'5131': '036',
			'5468': '152',
			'5121': '013',
			'5467': '153',
			'5454': '111',
			'5134': '096',
			'5135': '097',
			'5450': '107',
			'4305': '065',
			'5141': '103',
			'4478': '051',
			'4501': '012',
			'688': '073',
			'13454': '069',
			'13456': '070',
			'1135': '084',
			'1624': '076',
			'624': '085',
			'16537': '072',
			'16451': '071',
			'1638': '077',
			'2216': '123',
			'1210': '089',
			'887': '075',
			'591': '087',
			'12522': '092',
			'14242': '091',
			'90': '088',
			'14117': '090',
			'16606': '078',
			'16655': '079',
			'12316': '074',
		},
	},
};

$('a.itemName').each(function(){
	var item = this;

	var span = $(document.createElement('span'));
	$(span).css('font-size', '8pt');

	$(item).after(span);
	
	$.each(additionalLinks, function(title, site){
		var q = undefined;

		if (title == 'www.great-blue.jp') {
			var iid = $(item).attr('href').split('?iid=');

			if (iid[1] == undefined)
				return;

			q = site['conv'][iid[1]];

			if (q == undefined)
				return;

		} else {
			q = EscapeUTF8($(item).text());
		}

		var a = $(document.createElement('a'));
		a.attr('href', site['link'] + q);
		a.attr('title', title);
		a.attr('target', '_blank');
		a.append(site['disp']);

		$(span).append(' ');
		$(span).append(a);
	});
});

}());
