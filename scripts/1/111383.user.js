// ==UserScript==
// @name             absolute skill [GW]
// @namespace        s3kat0r.com
// @description      Приводит отрицательные умения к виду обычных.
// @include          http://www.ganjawars.ru/me/*
// @version          0.3
// @author           s3kat0r
// @source           http://www.ganjawars.ru/syndicate.php?id=8516
// ==/UserScript==



(function() {
var root      = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;


if (root.location.href.indexOf('http://www.ganjawars.ru/me/') == -1) {
	return false;
}

var expert  = false;
var bgcolor = '#ffeeee'; //цвет подсветки, если не нужна оставьте эту переменную пустой
var skills  = {
			'0'    :'0',
			'1'    :'4',
			'2'    :'8',
			'3'    :'13',
			'4'    :'23',
			'5'    :'36',
			'6'    :'56',
			'7'    :'84',
			'8'    :'123',
			'9'    :'176',
			'10'   :'248',
			'11'   :'344',
			'12'   :'471',
			'13'   :'637',
			'14'   :'852',
			'15'   :'1128',
			'16'   :'1480',
			'17'   :'1926',
			'18'   :'2489',
			'19'   :'3193',
			'20'   :'4070',
			'21'   :'5500',
			'22'   :'7140',
			'23'   :'9270',
			'24'   :'12050',
			'25'   :'15600',
			'26'   :'20000',
			'27'   :'26300',
			'28'   :'34200',
			'29'   :'45000',
			'30'   :'58000',
			};

	var table = root.document.getElementsByTagName('table');
	for(var i = table.length - 1, len = 0; i > len; i--){
		if(table[i].rows[0].cells[1] != null && table[i].rows[0].cells[1].innerHTML.indexOf('skill_combat_pistols.gif') != -1){
			var maint = table[i];
			break;
		}
	}
	if (maint == null) {
		return false;
	}
	for (var i = 0; i < 6; ++i) {
		var td = maint.rows[i].cells[1];

		if (i == 0) {
			var index = 3;
		} else {
			var index = 2;
		}
		var tag_level = td.childNodes[1].childNodes[index].firstChild;
		var tag_count = td.childNodes[1].childNodes[index].nextSibling;
		var tag_plus  = td.childNodes[1].childNodes[index + 2];

		var level = parseInt(tag_level.textContent);
		var count = parseFloat(tag_count.nodeValue.substring(2, tag_count.length -1));
		var plus  = parseFloat(tag_plus.textContent.substring(1));

		if (plus >= 0) {
			continue;
		}
		if (expert) {
			var all_count = count + Math.abs(plus);
		} else {
			var all_count = count;
		}

		for (levnd in skills) {
			if (skills[levnd] > all_count) {
				break;
			}
		}
		var real_level = levnd - 1;
		var real_count = all_count;
		var real_plus  = parseInt(skills[levnd]) - all_count;
		if (real_plus % 1 != 0) {
			real_plus = real_plus.toFixed(2);
			if (real_plus.substring(real_plus.length - 1) == 0) {
				real_plus = real_plus.substring(0, real_plus.length - 1);
			}
		}

		tag_level.textContent = deltaLevel(real_level);
		if (expert) {
			tag_count.nodeValue   = ' ('+real_count+')';
		} else {
			tag_count.nodeValue   = ' ('+count+')';
		}
		tag_plus.textContent  = '+'+real_plus;
		if (bgcolor != '0' && bgcolor != '') {
			maint.rows[i].setAttribute('bgcolor', bgcolor);
		}
		maint.rows[i].setAttribute('title', '['+level+'] ('+count+')+'+plus);

	}


	function deltaLevel(level) {
		if (level < 21) {
			return level;
		} else if (level == 30) {
			return '20/10';
		} else {
			return level+'/'+(level - 20);
		}
	}

})();