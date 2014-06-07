// ==UserScript==
// @name		Google Search Optimization Hootoh
// @namespace	http://www.hootoh.my
// @description	Modifikasi Enjin Carian Google yang tersembunyi (hanya terdapat dalam teks) Fungsi untuk Cari asas: penapis Extention fail (video, dokumen teks pembentangan, datasheets, audio dan sebagainya), penapis laman web (video streaming, fail bahagian laman web, lain-lain yang memiliki streaming) dan fail berkongsi popular ciri link, kategori disesuaikan dan banyak lagi peningkatan dan amat memudahkan. Hubungi Hootoh Tudia untuk tips dan maklumat lanjut: http://www.hootoh.my  Hubungi: hootohblog@webname.com
// @version		1.0
// @include		http://www.google.*
// @include		https://www.google.*
// @exclude		http://www.google.*/imghp*
// @exclude		http://www.google.*/analytics*
// @exclude		http://www.google.*/search*
// @exclude		http://www.google.*/preferences*
// @exclude		http://www.google.*/advanced_search*
// @exclude		http://www.google.*/language_tools*
// @exclude		http://www.google.*/ig*
// @exclude		http://www.google.*/#*
// @exclude		http://www.google.com/#q=*
// @exclude		http://www.google.*/support*
// @exclude		https://www.google.*/imghp*
// @exclude		https://www.google.*/analytics*
// @exclude		https://www.google.*/search*
// @exclude		https://www.google.*/preferences*
// @exclude		https://www.google.*/advanced_search*
// @exclude		https://www.google.*/language_tools*
// @exclude		https://www.google.*/ig*
// @exclude		https://www.google.*/#*
// @exclude		https://www.google.com/#q=*
// @exclude		https://www.google.*/support*
// @grant		GM_log
// @grant		GM_addStyle
// @grant		GM_getValue
// @grant		GM_setValue
// ==/UserScript==

//(Multiple/redundant include because of browser Compatibility)
// AMARAN!
// - Mungkin isu-isu dengan skrip lain yang menambah kotak semak ke Laman Utama Google
// - Opera tidak dapat menangani .tld dalam termasuk/tidak termasuk jadi saya perlu menggunakan * tetapi berhati-hati, ini termasuk domain peringkat tinggi yang bukan sahaja!
// - Sila jangan gunakan skrip dan ciri Google segera ini bersama-sama

// Seting:
// - anda boleh menukar tidak https url 'termasuk' ke 'termasuk' jika anda ingin menggunakan skrip ini dengan sambungan dienkripsi, Walau bagaimanapun ini tidak digalakkan
// - Kategori lebih pada url/link/sambungan (hanya tanda komentar kategori - memadam / / - di Url/link/lanjutan pelbagai kategori dan fungsi-fungsi initUrls/initLinks/initExtensions
// - adat warna teks (menukar ' var useCustomFontColor = palsu ' untuk ' var useCustomFontColor = benar ', colorCode adalah dalam kod fon warna RGB)
// - nyahpepijat mod (menukar ' var debugMode = palsu ' untuk ' var debugMode = benar ', semak konsol ralat)
// - anda boleh mengedit kategori pada url/link/ext tatasusunan, hanya menghapuskan unsur-unsur '< url/link/ext >' apa yang anda tidak perlu dan menambah anda sendiri selepas, watak dalam format '< anda unsur >', sebelum akhir] ciri-ciri
// - menambah kategori tersuai anda sendiri

//Steps untuk menambah kategori adat:
// 1. Tambah url, pautan atau sambungan kategori apa yang anda mahu (sebagai contoh: Jika anda ingin membuat hello kitty url Kumpulan, awda patut menambah "var helloKittyUrl = ['hellokitty.com','hellokittyagain.com'];" baris tanpa tanda kutip selepas satu lagi kategori Url)
// 2. Menambah kategori kepada pelbagai pihak (dalam kes terdahulu, awda patut menambah di initUrls() talian ini: "urls.push (helloKittyUrl, 'Hello Kitty tapak', palsu);" tanpa tanda kutip)
// 3. Simpan dan anda selesai! (skrip akan menghasilkan teks dan kotak semak dan menguruskan segala-galanya ;))


var searchString = '';

//Url arrays (using 'site' filter)
var fileshareUrl = ['mediafire.com','rapidshare.com','4shared.com','zippyshare.com','gigasize.com','sendspace.com','filefactory.com','zshare.net','uploading.com','hotfile.com','depositfiles.com'];
var videostreamUrl = ['facebook.com/video','video.google.com', 'youtube.com', 'dailymotions.com','metacafe.com','hulu.com','veoh.com','vimeo.om','nbc.com','open-video.org','archives.org','tvduck.com','streetfire.net'];
var blogUrl = ['blogspot.com','blogster.com','wordpress.com','blogger.com','livejournal.com','blog.com','free-blog-it.com','greatestjournal.com','insanejournal.com','blogladder.com','tumblr.com','zoomshare.com','vox.com','blogsome.com','blogomonster.com','blogetery.com','bravejournal.com','blogdrive.com','blog.co.uk'];
var animestreamUrl = ['crunchyroll.com','kumby.com','animeratio.com','gelbooru.com','animeatom.com','watchanimeon.com','animecrave.com','hidden-anime.tv','animetip.com','animeseed.com','anilinkz.com','anime4f.com','anime-media.com','fullanime-free.com','animecrazy.net'];
var auctionUrl = ['ebay.com','amazon.com','craiglist.org','ebid.net','cqout.com','overstock.com','onlineauction.com','bid4assets.com','webidz.com','bidstart.com','webstore.com','epier.com','propertyroom.com','ubid.com','shopgoodwill.com','samsclub.com'];
var torrentUrl = ['thepiratebay.org','isohunt.com','extratorrent.com','torrentportal.com','btloft.org','torrentbit.net','torrentreactor.net','torrentz.eu','kat.ph','btjunkie.org','demonoid.me','torrentdownloads.net','torrentreactor.net','limetorrents.com'];
//var gwUrl = ['wiki.guildwars.com','guildwars.wikia.com','pvx.wikia.com','guildwiki.org','gwpvx.com/PvX_wiki'];
var xvideoUrl = ['badjojo.com','tube8.com','xhamster.com','xvideos.com','cliphunter.com','youporn.com','pornhub.com','redtube.com','tnaflix.com','keezmovies.com','timtube.com','yuvutu.com','xxxmsncam.com','homemadefuckvideos.com','pornerbros.com','stolenvideos.net','worldsex.com','xhamster.com','www.porned.com','pornflakez.com'];
var pcShopHuUrl = ['pcx.hu','edigital.hu','ipon.hu/?product_id=','aqua.hu','cellcom.hu','compker.hu','szamitogepalkatreszbolt.hu','iway.hu','landcomputer.hu','a4team.hu','pcmaster.hu','acomp.hu','qwerty.hu'];
var auctionHuUrl = ['teszvesz.hu','vatera.hu','apronet.hu','expressz.hu','zsibvasar.hu','jofogas.hu','hardverapro.hu','forum.hwsw.hu/forum/46-bolhapiac/','pcbonto.hu','aprod.hu'];
var blogHuUrl = ['blog.hu','blogter.hu','blogger.hu','wpress.hu','b13.hu','blogol.hu','freeblog.hu','nolblog.hu'];
var fileshareHuUrl = ['data.hu','addat.hu','toldacuccot.hu','send2u.hu'];
var jobHuUrl = ['jobline.hu','jobinfo.hu','topjob.hu','workania.hu','www.expressz.hu/allas-munka','profession.hu','cvonline.hu','jobpilot.hu','http://www.munka.org/allasajanlatok','allasok.monster.hu'];
var videoStreamHuUrl = ['http://videa.hu/','http://indavideo.hu/','http://www.pixter.hu/','http://www.mommo.hu/','http://www.freevlog.hu/']
//var newcategoryUrl = ['url1','url2', 'url3'];

//link arrays (exactly "<link>" search on all site)
var audioLink = ['mp3skull.com/mp3','www.fileserve.com/file/','zippyshare.com/','soundcloud.com','4shared.com/file','depositfiles.com/file'];
var fileshareLink = ['mediafire.com/?','rapidshare.com/files','4shared.com/file','zippyshare.com/','gigasize.com/get','sendspace.com/file','filefactory.com/file','zshare.net/download','uploading.com/files/','hotfile.com/dl','depositfiles.com/file'];
var flashgameLink = ['newgrounds.com/game','armorgames.com/play','addictinggames.com','kongregate.com/games','miniclip.com/games'];
//var newcategoryLink = ['link1','link2','link3'];

//extension arrays (using 'extension' filter)
var datasheetExt = ['xls','ods','xlsx','csv','slk','dbf'];
var documentExt = ['doc','docx','rtf','txt','odt','pdf'];
var presentationExt = ['ppt','pps','odp','otp','sxi','pot'];
var csharpSourceExt = ['cs'];
var javaSourceExt = ['java'];
var cppSourceExt = ['c','cpp','cc','cxx','h','hpp'];
var basicSourceExt = ['bas'];
var perlSourceExt = ['pl'];
var pythonSourceExt = ['py'];
var xmlExt = ['xml'];
//var newcategoryExt = ['ext1','ext2','ext3'];

//category arrays
var urls = new Array(0);
var links = new Array(0);
var extensions = new Array(0);

//option array
var options = new Array(urls,links,extensions);

//form variables
var textbox = document.getElementsByName('q')[0];
var buttons;
var body = document.getElementsByTagName('body')[0];
var form = document.getElementsByTagName('form')[0];
var checkboxes = new Array(3);
var cbSearchRemember;

//settings
var useCustomFontColor = false;
var colorCode = "#FFFFF0";
var rememberSearch = false;
var debugMode = true;
var defaultCheckRemember = false;
var defaultSearchRemember = false;
var enableHunCategories = false;

function getButtons()
{
    var node_list = document.getElementsByTagName('input');
    var buttons = [];
 
    for (var i = 0; i < node_list.length; i++) {
        var node = node_list[i];
 
if (node.getAttribute('type') == 'submit') {
            buttons.push(node);
        }
    } 
 
    return buttons;
}

function writeLog(text)
{
	if (debugMode)
	{
		GM_log(text);		
	}
}

function initUrls()
{
		urls.push(new Array(animestreamUrl,'Animestream',false));
		urls.push(new Array(auctionUrl,'Auction',false));
		urls.push(new Array(blogUrl,'Blog',false));
		urls.push(new Array(fileshareUrl, 'Fileshare', false));
		urls.push(new Array(videostreamUrl, 'Videostream', false));
		urls.push(new Array(torrentUrl,'Torrent',false));
		//urls.push(new Array(gwUrl,'Guild Wars wiki',false));
		urls.push(new Array(xvideoUrl,'Porn stream',false));
		if(enableHunCategories)
		{
			urls.push(new Array(pcShopHuUrl,'PC Shop (hu)',false));
			urls.push(new Array(auctionHuUrl,'Auction (hu)',false));
			urls.push(new Array(blogHuUrl,'Blog (hu)',false));
			urls.push(new Array(fileshareHuUrl,'Fileshare (hu)',false));
			urls.push(new Array(jobHuUrl,'Jobs (hu)',false));
                        urls.push(new Array(videoStreamHuUrl,'Videostream (hu)',false));
		}
		//urls.push(new Array(newcategoryUrl, 'new category label', false));
}

function initLinks()
{
		links.push(new Array(audioLink, 'Audio', false));
		links.push(new Array(fileshareLink, 'Fileshare link', false));
		links.push(new Array(flashgameLink,'Flashgame',false));
		//links.push(new Array(newcategoryLink,'new category label',false));
}

function initExtensions()
{
		extensions.push(new Array(datasheetExt, 'Datasheet', false));
		extensions.push(new Array(documentExt, 'Document', false));
		extensions.push(new Array(presentationExt, 'Presentation', false));
		extensions.push(new Array(csharpSourceExt, 'C#', false));
		extensions.push(new Array(javaSourceExt, 'Java', false));
		extensions.push(new Array(cppSourceExt, 'C++', false));
		extensions.push(new Array(basicSourceExt, 'Basic', false));
		extensions.push(new Array(perlSourceExt, 'Perl', false));
		extensions.push(new Array(pythonSourceExt, 'Python', false));
		extensions.push(new Array(xmlExt, 'XML', false));
		//extensions.push(new Array(newcategoryExt, 'new category label', false));
}

function initCheckboxArray()
{
	for(i = 0; i < checkboxes.length; i++)
	{
		checkboxes[i] = new Array(options[i].length);
	}
}

function appendCheckbox()
{
	writeLog('append start');
	var name;

	GM_addStyle("[id=upperDiv] { font-weight: bold; font-size:80% ! important; }");
	if(useCustomFontColor) {GM_addStyle("body { color: " + colorCode + " !important; }"); }
	
	var oDiv = document.createElement('div');
    oDiv.setAttribute('id', 'upperDiv');
    oDiv.setAttribute('name', 'upperDiv');
	oDiv.setAttribute('align', 'center');
	form.appendChild(document.createElement('BR'));
	form.appendChild(oDiv);
	oDiv.appendChild(document.createElement('BR'));
	var txt1 = document.createTextNode('Press DEL to clear the searchbox!');
	oDiv.appendChild(txt1);
	oDiv.appendChild(document.createElement('BR'));
	var txt3 = document.createTextNode('Remember last searchterm');
	oDiv.appendChild(txt3);
	cbSearchRemember = document.createElement('input');
	cbSearchRemember.type = 'checkbox';
	cbSearchRemember.id = '';
	cbSearchRemember.name = '';
	cbSearchRemember.value = '';
	cbSearchRemember.checked = defaultSearchRemember;
	oDiv.appendChild(cbSearchRemember);
	form.appendChild(document.createElement('BR'));
	
	var oDivOpt = document.createElement('div');
    oDivOpt.setAttribute('id', 'optionsDiv');
    oDivOpt.setAttribute('name', 'optionsDiv');
	oDivOpt.setAttribute('align', 'center');
	form.appendChild(oDivOpt);
	
	for(i = 0; i < options.length; i++)
	{
		writeLog('Checking ' + i + '. option...');
		for(j = 0; j < options[i].length; j++)
		{
			writeLog('Checking ' + j + '. item...');
			name = options[i][j][1];
			var cb = document.createElement('input');
			writeLog('checkbpx has created!');
			cb.type = 'checkbox';
			cb.id = 'cb' + i + j;
			cb.name = 'cb' + i + j;
			cb.value = 'cb';
			var text = document.createTextNode(name);
			oDivOpt.appendChild(cb);
			checkboxes[i][j] = cb;
			oDivOpt.appendChild(text);
		}
		oDivOpt.appendChild(document.createElement('BR'));
	}
	form.appendChild('div');
	
	writeLog('append end');
}

function searchButtonModify()
{
	for(i=0;i<buttons.length;i++)
	{
		buttons[i].addEventListener('click',function(e){writeLog('Button' + i + ' pressed!');processOptions();},false);
	}
	
	window.addEventListener('keydown', keyCheck, true);
}

function keyCheck(e)
{
	if(e.keyCode == 13)
	{
		processOptions();
	}
	else if(e.keyCode == 46)
	{
		textbox.value = '';
	}
	else
	{}
}

function init()
{
	writeLog('init start');
	
	initUrls();
	initLinks();
	initExtensions();
	initCheckboxArray();
	buttons = getButtons();
	searchButtonModify();
	appendCheckbox();
	
	if(GM_getValue("rememberSearch") == true) {textbox.value = GM_getValue("searchTerm",""); writeLog("Search loaded!");} else {textbox.value = "";}
	
	writeLog('init end');
}

function processOptions()
{
	writeLog('processOptions start');
	
	var first = true;
	searchString = textbox.value;
	
	if(cbSearchRemember.checked) {GM_setValue("rememberSearch",true); GM_setValue("searchTerm",textbox.value); writeLog("Search saved!");} else {GM_setValue("rememberSearch",false);}
	
	var i,j,k;
	
	for(i = 0; i < options.length; i++)
	{
			writeLog('Options start');
			writeLog('i: ' + i);
			if(options[i] == urls)
			{
				writeLog('Urls start');
				for(j = 0; j < options[i].length; j++)
				{
					writeLog('j: ' + j);					
					if(checkboxes[i][j].checked)
					{
						writeLog('checked');
						for(k = 0; k < options[i][j][0].length; k++)
						{
							writeLog('k: ' + k);	
							if (!first)
							{
								searchString += ' OR';
							}
							else{first = false;};
							searchString = searchString + ' site:' + options[i][j][0][k];
						}
					}
					else
					{
						writeLog('unchecked');
					}
				}
				writeLog('Urls end');
			}
			else if(options[i] == links)
			{
				writeLog('Links start');
				for(j = 0; j < options[i].length; j++)
				{
					writeLog('j: ' + j);
					if(checkboxes[i][j].checked)
					{
						writeLog('checked');
						for(k = 0; k < options[i][j][0].length; k++)
						{
							writeLog('k: ' + k);	
							if (!first)
							{
								searchString += ' OR';
							}
							else{first = false;};
							searchString = searchString + ' "' + options[i][j][0][k] + '"';
						}
					}
				}
				writeLog('Links end');
			}
			else if(options[i] == extensions)
			{
				writeLog('Extensions start');
				for(j = 0; j < options[i].length; j++)
				{
					writeLog('j: ' + j);
					if(checkboxes[i][j].checked)
					{
						writeLog('checked');
						for(k = 0; k < options[i][j][0].length; k++)
						{
							writeLog('k: ' + k);	
							if (!first)
							{
								searchString += ' OR';
							}
							else{first = false;};
							searchString = searchString + ' filetype:' + options[i][j][0][k];
						}
					}
				}
				writeLog('Extension end');
			}
	}
	writeLog('Options end');
	
	textbox.value = searchString;
	
	writeLog('processOptions end');
}

writeLog('Script start');
init();
writeLog('Script end');

Because it's your web
