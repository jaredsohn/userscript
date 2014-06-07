// ==UserScript==
// @name          Grepo3SpaltenStadtliste
// @namespace     
// @description   3spaltige Staedteliste
// @version       0.4
// @include       http://*.grepolis.*/*
// ==/UserScript==

// Tool

var scriptEl = document.createElement("script");
scriptEl.setAttribute('type','text/javascript');
scriptEl.setAttribute('id','gtio_reportcollector');
scriptEl.appendChild(document.createTextNode("\
	var MAX_COLUMNS=3;\
	var SPLIT_AT=46;\
	\
	var origstyle;\
	function gt2c_reorganize()\
	{\
		if ($('#town_list').length==0)\
		{\
			window.setTimeout(gt2c_reorganize,500);\
			return;\
		}\
		\
		N=$('#town_list ul li').length;\
		if (N<SPLIT_AT)\
			return;\
		if (N>=SPLIT_AT)\
			NUM_COLUMNS=2;\
		if (N/2>=SPLIT_AT && MAX_COLUMNS==3)\
			NUM_COLUMNS=3;\
		if (NUM_COLUMNS==3)\
		{\
			$('#town_list').css('width','832px');\
			$('#town_list_top').css('width','832px');\
			$('#town_list_bottom').css('width','832px');\
			$('#town_list ul li').css('text-align','left');\
			$('#town_list ul li a').css({'position':'relative', 'left':'30px'});\
			$('#town_list ul li div div.faarksGrepoTownListEnhancement_infoButton').css({'position':'relative', 'left':'-552px'});\
			$('#town_list ul li div a.faarksGrepoTownListEnhancement_gotoButton').css({'position':'relative', 'left':'-552px'});\
		}\
		if (NUM_COLUMNS==2)\
		{\
			$('#town_list').css('width','553px');\
			$('#town_list_top').css('width','553px');\
			$('#town_list_bottom').css('width','553px');\
			$('#town_list ul li').css('text-align','left');\
			$('#town_list ul li a').css({'position':'relative', 'left':'30px'});\
			$('#town_list ul li div div.faarksGrepoTownListEnhancement_infoButton').css({'position':'relative', 'left':'-275px'});\
			$('#town_list ul li div a.faarksGrepoTownListEnhancement_gotoButton').css({'position':'relative', 'left':'-275px'});\
		}\
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
		if (NUM_COLUMNS==2)\
		{\
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
		}\
		if (NUM_COLUMNS==3)\
		{\
			maxi=Math.floor((N/3));\
			if (N%3 == 2)\
				maxi=Math.floor((N/3))+1;\
			for (i=0; i<maxi; i++)\
			{\
				src=allA.snapshotItem(Math.ceil(N/3)+i);\
				dest=allLI.snapshotItem(i);\
				dest.appendChild(src);\
				src.setAttribute('style','position:absolute; left:308px');\
			}\
			maxi2=Math.floor((N/3));\
			for (i=0; i<maxi2; i++)\
			{\
				src=allA.snapshotItem(Math.ceil(N/3)+i+maxi);\
				dest=allLI.snapshotItem(i);\
				dest.appendChild(src);\
				src.setAttribute('style','position:absolute; left:584px');\
			}\
			if (allFaarkDiv.snapshotLength>0)\
			{\
				maxi=Math.floor((N/3));\
				if (N%3 == 2)\
					maxi=Math.floor((N/3))+1;\
				for (i=0; i<maxi; i++)\
				{\
					src=allFaarkDiv.snapshotItem(Math.ceil(N/3)+i);\
					before=allA.snapshotItem(i);\
					dest=allLI.snapshotItem(i);\
					dest.insertBefore(src,before);\
					div=src.firstChild;\
					div.setAttribute('style','position:relative; left:-274px');\
					div.nextSibling.setAttribute('style','position:relative; left:-274px');\
				}\
				maxi2=Math.floor((N/3));\
				for (i=0; i<maxi2; i++)\
				{\
					src=allFaarkDiv.snapshotItem(Math.ceil(N/3)+i+maxi);\
					before=allA.snapshotItem(i);\
					dest=allLI.snapshotItem(i);\
					dest.insertBefore(src,before);\
					div=src.firstChild;\
					div.setAttribute('style','position:relative; left:2px');\
					div.nextSibling.setAttribute('style','position:relative; left:2px');\
				}\
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
