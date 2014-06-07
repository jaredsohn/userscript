// ==UserScript==
// @name          Grepo2SpaltenStadtliste
// @namespace     
// @description   2spaltige Staedteliste
// @version       0.3
// @include       http://*.grepolis.*/*
// ==/UserScript==

// Tool

var scriptEl = document.createElement("script");
scriptEl.setAttribute('type','text/javascript');
scriptEl.setAttribute('id','gtio_reportcollector');
scriptEl.appendChild(document.createTextNode("\
	var origstyle;\
	function gt2c_reorganize()\
	{\
		if ($('#town_list').length==0)\
		{\
			window.setTimeout(gt2c_reorganize,500);\
			return;\
		}\
		\
		$('#town_list').css('width','553px');\
		$('#town_list_top').css('width','553px');\
		$('#town_list_bottom').css('width','553px');\
		$('#town_list ul li').css('text-align','left');\
		$('#town_list ul li a').css({'position':'relative', 'left':'30px'});\
		$('#town_list ul li div div.faarksGrepoTownListEnhancement_infoButton').css({'position':'relative', 'left':'-275px'});\
		$('#town_list ul li div a.faarksGrepoTownListEnhancement_gotoButton').css({'position':'relative', 'left':'-275px'});\
		N=$('#town_list ul li').length;\
		allA=$('#town_list ul li a[href~=index]');\
		allA=document.evaluate(\
			\"//div[@id='town_list']/ul/li/a\",\
			document,\
			null,\
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
			null);\
		allLI=document.evaluate(\
			\"//div[@id='town_list']/ul/li\",\
			document,\
			null,\
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
			null);\
		allFaarkDiv=document.evaluate(\
			\"//div[@id='town_list']/ul/li/div[@class='faarksGrepoTownListEnhancement_box']\",\
			document,\
			null,\
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
			null);\
		allLI=document.evaluate(\
			\"//div[@id='town_list']/ul/li\",\
			document,\
			null,\
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
			null);\
		for (i=0; i<Math.floor((N/2)); i++)\
		{\
			src=allA.snapshotItem(Math.ceil(N/2)+i);\
			dest=allLI.snapshotItem(i);\
			dest.appendChild(src);\
			src.setAttribute('style','position:absolute; left:308px');\
		}\
		if (allFaarkDiv.snapshotLength>0)\
		{\
			for (i=0; i<Math.floor((N/2)); i++)\
			{\
				src=allFaarkDiv.snapshotItem(Math.ceil(N/2)+i);\
				before=allA.snapshotItem(i);\
				dest=allLI.snapshotItem(i);\
				dest.insertBefore(src,before);\
				div=src.firstChild;\
				div.setAttribute('style','position:relative; left:2px');\
				div.nextSibling.setAttribute('style','position:relative; left:2px');\
			}\
		}\
	};\
	function gt2c_1col()\
	{\
		$('#town_list').css('width','');\
	};\
	(function(){\
		onclick=$('a.city_list')[0].getAttribute('onclick');\
		if (onclick=='Layout.toggleTownList();')\
		{\
			$('a.city_list')[0].setAttribute('onclick', onclick+'gt2c_reorganize();');\
			if ($('a.town_group_list'))\
				$('a.town_group_list')[0].setAttribute('onclick', $('a.town_group_list')[0].getAttribute('onclick')+'gt2c_1col()');\
		};\
	})();\
	"));
document.body.appendChild(scriptEl);
