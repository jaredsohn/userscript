// ==UserScript==
// @name           Plurk Emote Series
// @description    Custom smiley & emote on Plurk.
// @include        http://www.plurk.com/*
// ==/UserScript==


// ********** Main Script ***********
var smileData = [];

smileData.push([
	'1','http://statics.plurk.com/', 
	[
	'deda4d9f78ad528d725e3a6bfbf6352f.gif', 
	'0efc4d55d28704f4370ef874ae906161.gif', 
	'8855f56400a936db07f348d9290adaac.gif', 
	'71acd802cc931649dd9a371ccf70bad2.gif', 
	'74030f05f06547a3d26b02ccbf0bbac7.gif', 
	'3acbaf42504fff32c5eac4f12083ce56.gif', 
	'fcd28d7d78ec1f828c76930fa63270e6.gif', 
	'bac8c8392f7ca8f5ac74612be4d08b74.gif', 
	'a555399b40c379adca5b6f5bad5bf732.gif', 
	'6675254cd7449b1847a93b0024127eae.gif', 
	'88fac5a4b99110a35d4e4794dad58ab4.gif', 
	'feb43dbbbf2763905571060be9a496d1.gif', 
	'5b51892d7d1f392d93ea7fe26e5100f4.gif', 
	'4ad099fba019942f13058610ff3fc568.gif', 
	'4c40d16a0d369b895c08f2e33d062ec8.gif', 
	'6de58c967f1c2797d250a713ba50eddd.gif', 
	'e476574723d5042f24658fa36866bd92.gif', 
	'b3b9856e557fcc2700fd41c53f9d4910.gif'	
	]
]);

smileData.push([
	'F','http://statics.plurk.com/', 
	[
	'cfdd2accc1188f5fbc62e149074c7f29.png', 
	'828b9819249db696701ae0987fba3638.png', 
	'1bd653e166492e40e214ef6ce4dd716f.png', 
	'3fe6cf919158597d7ec74f8d90f0cc9f.png', 
	'9c5c54081547d2ad903648f178fcc595.png', 
	'2da76999ca3716fb4053f3332270e5c9.png', 
	'f73b773aa689647cb09f57f67a83bb89.png', 
	'45beda260eddc28c82c0d27377e7bf42.png', 
	'8590888362ae83daed52e4ca73c296a6.png', 
	'c7551098438cc28ec3b54281d4b09cc3.png', 
	'cfd84315ebceec0c4389c51cf69132bd.png', 
	'0e0bf1ec2c2958799666f3995ef830ca.png', 
	'e2998ca75f80c1c4a5508c549e3980a6.png', 
	'c6ad1c4f9e11f6859a1ba39c4341ef8b.png', 
	'4a61085f1c6a639f028cd48ae97d07d0.png', 
	'53253ca60f5831f0812954213a2e9bb3.png', 
	'6928f3117658cc38d94e70519a511005.png' 
	]
]);

smileData.push([
	'H','http://i877.photobucket.com/albums/ab336/murezz/',
	[
	'2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif',
	'9.gif','10.gif','11.gif','pentungikan.gif','muscle.gif','jogetpirates.gif',
	'jogetkacamata.gif'
	]
]);

smileData.push([
	'T','http://s199.photobucket.com/albums/aa63/vrainz/Onion/',
	[
	'merah.gif','kuning.gif','ngeselin.gif','nongol.gif','takut.gif','wuek.gif','sembah.gif','semangat.gif','sebel.gif',
	'piss.gif','panik.gif','hot.gif','awas.gif','boong.gif',
	'listen.gif','cihuy.gif','ehem.gif',
	'onion-102.gif','onion-100.gif','onion-86.gif','onion-10.gif','onion-02.gif','onion-03.gif','onion-04.gif','onion-05.gif','onion-06.gif',
	'onion-08.gif','onion-09.gif','onion-42.gif','onion-11.gif','onion-93.gif','onion-12.gif','onion-90.gif','onion-13.gif','onion-14.gif','onion-28.gif',
	'onion-15.gif','onion-31.gif','onion-16.gif','onion-26.gif','onion-27.gif','onion-29.gif','onion-30.gif','onion-32.gif','onion-33.gif','onion-34.gif',
	'onion-35.gif','onion-36.gif','onion-37.gif','onion-38.gif','onion-39.gif','onion-40.gif','onion-41.gif','onion-43.gif','onion-44.gif','onion-45.gif',
	'onion-46.gif','onion-50.gif','onion-51.gif','onion-52.gif','onion-54.gif','onion-55.gif','onion-56.gif','onion-57.gif','onion-58.gif','onion-59.gif',
	'onion-60.gif','onion-61.gif','onion-62.gif','onion-63.gif','onion-64.gif','onion-65.gif','onion-66.gif','onion-67.gif','onion-68.gif','onion-69.gif',
	'onion-70.gif','onion-71.gif','onion-72.gif','onion-73.gif','onion-74.gif','onion-75.gif','onion-76.gif','onion-77.gif','onion-78.gif','onion-79.gif',
	'onion-80.gif','onion-81.gif','onion-82.gif','onion-83.gif','onion-84.gif','onion-85.gif','onion-87.gif','onion-88.gif','onion-89.gif','onion-91.gif',,'onion-92.gif','onion-94.gif','onion-95.gif',
	'onion-96.gif','onion-97.gif','onion-98.gif','onion-99.gif','onion-101.gif',
	'onion-103.gif','onion-104.gif','onion-105.gif','onion-106.gif'
	]
]);

smileData.push([
	'U','http://s199.photobucket.com/albums/aa63/vrainz/Bofu/',
	[
	'3.gif','15.gif','5.gif','62.gif','72.gif','58.gif','71.gif','50.gif','55.gif','60.gif','63.gif','69.gif','61.gif','56.gif',
	'65.gif','53.gif','67.gif','68.gif','36.gif','66.gif','38.gif','44.gif','6.gif','19.gif','22.gif','4.gif','1.gif','14.gif',
	'41.gif','42.gif','25.gif','8.gif','64.gif','35.gif','2.gif','49.gif','48.gif','2.gif','34.gif','30.gif','26.gif','45.gif',
	'9.gif','7.gif','46.gif','20.gif','70.gif','39.gif','32.gif','23.gif','17.gif','43.gif','10.gif','57.gif','59.gif','51.gif',
	'16.gif','28.gif'
	]
]);

smileData.push([
	'L','http://www.addemoticons.com/emoticon/animated/',
	[
	'AddEmoticons04211.gif','AddEmoticons04212.gif','AddEmoticons04213.gif',
	'AddEmoticons04214.gif','AddEmoticons04215.gif','AddEmoticons04216.gif',
	'AddEmoticons04217.gif','AddEmoticons04218.gif','AddEmoticons04219.gif',        				
	'AddEmoticons04220.gif','AddEmoticons04221.gif','AddEmoticons04222.gif',
	'AddEmoticons04223.gif','AddEmoticons04224.gif','AddEmoticons04225.gif',       				
	'AddEmoticons04226.gif','AddEmoticons04227.gif','AddEmoticons04228.gif',
	'AddEmoticons04229.gif','AddEmoticons04230.gif','AddEmoticons04231.gif',
	'AddEmoticons04232.gif','AddEmoticons04233.gif','AddEmoticons04234.gif',        				
	'AddEmoticons04235.gif','AddEmoticons04236.gif','AddEmoticons04237.gif',
	'AddEmoticons04238.gif','AddEmoticons04239.gif','AddEmoticons04240.gif',
	'AddEmoticons04241.gif','AddEmoticons04242.gif','AddEmoticons04243.gif',        				
	'AddEmoticons04244.gif','AddEmoticons04245.gif','AddEmoticons04246.gif',
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
	'1','http://www.addemoticons.com/emoticon/monkey/AddEmoticons126',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','11.gif','12.gif','13.gif','14.gif','15.gif',
	'16.gif','17.gif','18.gif','19.gif','20.gif','21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif',
	'30.gif','31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif','41.gif','42.gif','43.gif',
	'44.gif','45.gif','46.gif','47.gif','48.gif','49.gif','50.gif','51.gif','52.gif','53.gif','54.gif','55.gif','56.gif','57.gif',
	'58.gif','59.gif','60.gif','61.gif','62.gif','63.gif','64.gif','65.gif','66.gif','67.gif','68.gif','69.gif','70.gif','71.gif',
	'72.gif','73.gif','75.gif','76.gif','77.gif','78.gif','79.gif','80.gif','81.gif','82.gif','83.gif','84.gif','85.gif','99.gif',
	'86.gif','87.gif','88.gif','89.gif','90.gif','91.gif','92.gif','93.gif','94.gif','95.gif','96.gif','97.gif','98.gif',
	'100.gif','101.gif','102.gif','103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif','111.gif','112.gif',
	'113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif','120.gif','121.gif','122.gif','123.gif','124.gif','125.gif',
	'126.gif','127.gif','128.gif','129.gif','130.gif','131.gif','132.gif','133.gif','134.gif','135.gif','136.gif','137.gif','138.gif',
	'139.gif','140.gif','141.gif','142.gif','143.gif','144.gif','145.gif','146.gif','147.gif','148.gif','149.gif','150.gif','151.gif',
	'152.gif','153.gif','154.gif','155.gif','156.gif','157.gif','158.gif','159.gif','160.gif','161.gif','162.gif','163.gif','164.gif'
	]
]);

smileData.push([
	'.','http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif','64.gif',
	'11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif','20.gif',
	'21.gif','22.gif','23.gif','24.gif','25.gif','26.gif','27.gif','28.gif','29.gif','30.gif',
	'31.gif','32.gif','33.gif','34.gif','35.gif','36.gif','37.gif','38.gif','39.gif','40.gif',
	'41.gif','42.gif','43.gif','44.gif','45.gif','46.gif','47.gif','62.gif','63.gif'
	]
]);

smileData.push([
	'M','http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-',
	[
	'001.gif','002.gif','003.gif','004.gif','005.gif','007.gif',
	'013.gif','014.gif','015.gif','016.gif','017.gif','018.gif','019.gif','020.gif','021.gif','022.gif','023.gif',
	'024.gif','025.gif','026.gif','027.gif','028.gif','029.gif','030.gif','031.gif','032.gif','033.gif',
	'034.gif','035.gif','036.gif','037.gif','038.gif','039.gif','040.gif','041.gif','042.gif','043.gif',
	'044.gif','045.gif','046.gif','047.gif','048.gif','049.gif','050.gif','051.gif','052.gif','008.gif','009.gif','012.gif',
	'006.gif','010.gif','011.gif'
	]
]);

var isinit = false;
var currInput = null;
var rplreg = /\[(\d+) (\d+)\]/g;
var pageState = location.href.split('/')[3];

window.addEventListener('load', function(){
	setTimeout(function(){
		var selImgs = document.getElementsByClassName('smily_holder');

		// bind key up event
		if(pageState == 'p')
			getById('input_permalink').addEventListener('keyup', replaceSmile, false);
		else{
			getById('input_big').addEventListener('keyup', replaceSmile, false);
			getById('input_small').addEventListener('keyup', replaceSmile, false);
		}

		// create tabs
		for(var i=0; i<selImgs.length; i++){
			selImgs[i].setAttribute('ref', selImgs.length - i);
			selImgs[i].addEventListener('click', function(){
				isinit || setTimeout(init, 1000);
				currInput = pageState != 'p' ? this.getAttribute('ref') == 2 ? getById('input_big') : getById('input_small') : getById('input_permalink');
			}, false);
		}
	}, 2000);
}, false);

// init
function init(){
	isinit = true;
	// init contents
	for(var i=0; i<smileData.length; i++){
		addTab(i, smileData[i]);
	}
	// init css
	getById('emoticons_show').style.width  = '100%';
	getById('emoticons_show').style.height = '150px';
	getById('emoticons_show').style.overflow = 'auto';
}

function replaceSmile(){
	if(rplreg.test(this.value))
		this.value = this.value.replace(rplreg, doReplace);
}

function doReplace(str, datid, smileid){
	arr = smileData[datid];
	if (typeof(arr) != 'undefined'){
		if(typeof(arr[2][smileid]) != 'undefined')
		str = ' ' + smileData[datid][1] + smileData[datid][2][smileid] + ' ';
	}
	return str;
}

function addTab(id, data){
	var myli = document.createElement('li');
	myli.className = 'emoticon_selecter';
	myli.innerHTML = '<a href="javascript:void 0;">'+data[0]+'</a>';
	myli.addEventListener('click', function(){
		addImages(this, id);
	}, false);

	getById('emoticons_tabs').getElementsByTagName('ul')[0].appendChild(myli);
}

function addImages(obj, ind){
	var showDiv = getById('emoticons_show');
	var lis = getById('emoticons_tabs').getElementsByTagName('li');
	for(var i=0; i<lis.length; i++)
		lis[i].className = 'emoticon_selecter';

	obj.className += ' current';

	var data = smileData[ind];
	var baseUrl = data[1];
	var str = '<div>';
	for(var i=0, dat = data[2], _url; i<dat.length; i++){
		_url = baseUrl + dat[i];
		str += '<a href="javascript:void 0;"><img src="'+_url+'" alt="'+dat[i]+'" title="['+ind+' '+i+']" /></a>';
	}
	str += '</div>';
	showDiv.innerHTML = str;

	var imgs = showDiv.getElementsByTagName('img');
	for(var i=0; i<imgs.length; i++){
		imgs[i].addEventListener('click', function(){
			currInput.value += ' ' + this.src + ' ';
			currInput.focus();
		}, false);
	}
}

function getById(oid){
	return document.getElementById(oid);
}