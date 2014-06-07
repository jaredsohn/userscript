// ==UserScript==
// @name			DF Link Checker
// @description			Automatically checks links from 250+ unique filehostings.
// @details			Customized W.A.R. Links Checker script, modified for efficiency. 
// @details			For Firefox, Chrome, Safari. 
// @version			3.0.0.0
// @license			GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @author			DF Dev Team
// @include			http://*
// @include			https://*
// @include			file:///*
// @grant			GM_setValue
// @grant			GM_getValue
// @grant			GM_xmlhttpRequest
// @grant			GM_log
// @grant			GM_addStyle
// @grant			GM_registerMenuCommand
// @grant			GM_getResourceText
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require			https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js
// @resource		jQueryUICSS https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/smoothness/jquery-ui.css
// ==/UserScript==

//separate alternative domains with "|" char (first name is considered being main)
var allHostNames = ["1fichier.com|dl4free.com","2download.de","2shared.com","4fastfile.com","4shared.com","adrive.com","bayfiles.com|bayfiles.net","bezvadata.cz","bitroad.net","bitshare.com","burnupload.com|burnupload.ihiphop.com","cobrashare.sk","coolshare.cz",
"cramit.in|cramitin.net","czshare.com","dataport.cz","datei.to|sharebase.to","daten-hoster.de|filehosting.org|xtraupload.de","demo.ovh.com","depositfiles.com|dfiles.eu|dfiles.ru","divshare.com", "dotavi.com","easy-share.com|crocko.com","easybytez.com","edisk.cz","enigmashare.com","erofly.cz","euroshare.eu","extabit.com",
"eyesfile.com","ezyfile.net","fastshare.cz","fiberupload.com|bulletupload.com","file-bit.net","file4sharing.com","filefactory.com","filefat.com","fileflyer.com","filerio.com|filerio.in|filekeen.com","filemashine.com","filemonster.net","files.mail.ru","files.to","filedino.com","fileduct.com","filepost.com|fp.io","filesend.net","fileserver.cc","filesflash.com",
"fileshare.in.ua","filesmonster.com","filestore.to","filevelocity.com","filezpro.com","freakshare.net", "videobull.com","free.fr","free-uploading.com","gamefront.com|filefront.com","getthebit.com","gettyfile.ru","gigapeta.com","gigasize.com","gigaup.fr","glumbo.com|glumbouploads.com",
"goldfile.eu","good.com","grupload.com","hellshare.com","hellspy.com","hipfile.com","hitfile.net","hostuje.net",
"hotfile.com","hulkshare.com","hyperfileshare.com","ifolder.ru","jumbofiles.com","k2files.com",
"leteckaposta.cz|sharegadget.com","letitbit.net","load.to","loombo.com","mediafire.com","megafileupload.com","megashare.com","megashares.com",
"mojedata.sk","mojofile.com","muchshare.net","multishare.cz","myupload.dk","narod.ru|narod.yandex.ru","netload.in","ok2upload.com",
"openfile.ru","partage-facile.com","plunder.com", "qshare.com","queenshare.com","quickshare.cz","rapidgator.net","rapidshare.com","rapidshare.ru", "daj.to",
"rapidupload.sk","rarefile.net","rayfile.com","rghost.net","sendmyway.com", "4savefile.com",
"sendspace.com","sharecash.org","share-links.biz","share-now.net","share-online.biz|egoshare.com",
"share-rapid.com|sharerapid.cz|rapids.cz|share-credit.cz|share-central.cz|share-ms.cz|share-net.cz|srapid.cz",
"shareflare.net","cloudnator.com|shragle.com","slingfile.com","sms4file.com","solidfiles.com","space4file.com","speedfile.cz",
"speedshare.org","stahovanizasms.cz","stahuj.to","storage.novoro.net","syfiles.com|sharerun.com","tufiles.ru","turbobit.net",
"turboupload.com","ugotfile.com","uloz.to|ulozto.cz|bagruj.cz|zachowajto.pl","ulozisko.sk","uloziste.com","unibytes.com","up-file.com",
"upload-il.net|przeslij.net","uploadbin.net","uploaded.to|ul.to","uploading.com","uploadmachine.com", "uploadjet.net",
"uploadspace.pl","upnito.sk","uptobox.com","usaupload.net", "videobb.com","videozer.com",
"vip-file.com","webshare.cz","xdisk.cz","yunfile.com|filemarkets.com","ziddu.com",
"zippyshare.com", "ryushare.com", "uploading4u.eu", "premiuns.org", "rodfile.com", "migahost.com", "wikiupload.com", "uploadstube.de",
"flyfiles.net", "nowdownload.eu", "dark-uploads.com", "asfile.com", "prefiles.com", "vidhog.com", "axifile.com", 
"upthe.net", "hackerbox.org", "sharefiles.co", "amonshare.com", "uploadorb.com", "data.hu", "filestay.com", "filegag.com", "hulkfile.com", "uptorch.com", "netkups.com", "edoc.com", "isavelink.com", "anonstream.com", "upfile.biz",
"uppit.com|up.ht", "shafiles.me", "peejeshare.com", "sharpfile.com", "ddlstorage.com", "downloadani.me", "batshare.com", "filesabc.com",
"sharebeast.com", "filemates.com", "verzend.be", "asixfiles.com", "zomgupload.com", "mlfat4arab.com",
"movreel.com", "4up.me", "extmatrix.com", "gigfiles.net", "i-filez.com", "sendfiles.nl", "yourfilestore.com", "filebig.net", "fileupup.com", "share76.com", "filebox.com", "4bytez.com", "nekaka.com", "file4safe.com", "freeuploads.fr|uploa.dk", "tusfiles.net",
"kupload.org", "bzlink.us", "1hostclick.com", "filemac.com", "files2k.eu", "coraldrive.net", "idup.in", "bitbonus.com", "aieshare.com",
"xfileshare.eu", "luckyshare.net", "uploadic.com", "fileswap.com", "potload.com", "clouds.to", "billionuploads.com", "rockdizfile.com",
"getzilla.net", "holderfile.com", "pigsonic.com", "brontofile.com", "cloudnxt.net", "fileking.co",
"filehost.ws", "fileupped.com", "filesbb.com", "maxshare.pl", "fileserving.com", "filesin.com", "novafile.com", "longfiles.com",
"fireuploads.net", "filetechnology.com", "filecosy.com", "lumfile.com", "toucansharing.com", "filesega.com", "uploadhero.com", "uploadbaz.com",
"unextfiles.com", "stahovadlo.cz", "warserver.cz", "247upload.com", "datafilehost.com", "fileprohost.com", "indowebster.com", "superload.cz", "filelaser.com", "sharefilehost.com", "mafiastorage.com", "filerose.com",
"ultramegabit.com", "limelinx.com", "ihostia.com", "uploadoz.com", "squillion.com", "shareupload.com", "ubuntuone.com", "uload.to", 
"henchfile.com", "minus.com", "filesmelt.com", "hellupload.com", "packupload.com", "uploadingit.com", "stiahni.si", "filefolks.com",
"filedefend.com", "sendspace.pl", "fastshare.org", "venusfile.com", "filesector.cc", "fileduct.net", "upgrand.com",
"filestrum.com", "fileuplo.de", "upaj.pl", "sinhro.net", "filedownloads.org", "egofiles.com", "filestore.com.ua", "uploadcore.com",
"upafile.com", "secureupload.eu", "divxden.com|vidxden.com|vidbux.com", "uploadc.com|zalaa.com", "veehd.com", "filenuke.com", "vidbull.com", "stagevu.com", "movdivx.com", "sharebees.com", "bitupload.com", "nosupload.com|nosvideo.com", "sharerepo.com", "videozed.net", "movshare.net", "sharesix.com", "allmyvideos.net", "nowvideo.eu|nowvideo.co|nowvideo.ch|nowvideo.sx","videopremium.net|videopremium.tv", "vureel.com", "donevideo.com", "hostingbulk.com", "flashx.tv", "played.to", "faststream.in", "novamov.com", "videoweed.es", "videobam.com", "clicktoview.org", "sockshare.com|sockshare.ws", "putlocker.com|firedrive.com", "movpod.in|movpod.net", "gorillavid.in|gorillavid.com", "youwatch.org", "limevideo.net", "daclips.in|daclips.com", "epicshare.net|uncapped-downloads.com", "uploadhero.co|uploadhero.com","project-free-upload.com", "vidstream.in","xvidstage.com", "ginbig.com", "flashstream.in", "mp4upload.com", "movzap.com", "hdplay.com", "muchupload.com", "bestreams.net", "mightyupload.com", "vidplay.net","lemuploads.com","megarelease.org", "pastebin.com", "mooshare.biz", "fleon.me|skylo.me","mega.co.nz", "vidspot.net", "v-vids.com","uploadnetwork.eu", "vshare.eu", "mojoload.com", "junocloud.me", "fileom.com", "box.com", "divxhosting.net", "dizzcloud.com", "filezy.net", "speedfiles.net", "dailymotion.com", "video.tt", "royalvids.eu", "megafiles.se", "expressleech.com", "divxpress.com", "zuzvideo.com", "filedap.com", "albafile.com", "180upload.com|180upload.nl", "cloudzer.net", "vidx.to", "kingfiles.net", "fileparadox.in", "vreer.com", "mixturecloud.com", "thefile.me", "videoslasher.com",  "hugefiles.net", "videopremium.me", "promptfile.com", "davvas.com", "nowdownload.ch", "divxstage.eu", "vidup.me|vidto.me", "veevr.com", "yourupload.com", "youtube.com", "veoh.com", "vodlocker.com", "sharexvid.com", "vidzbeez.com", "streamin.to", "uptobox.com", "vidzi.tv", "uploadsat.com", "thevideo.me", "cloudyvideos.com", "uploadable.ch"];

try
{
	//iframes excluded
	if (window.top != window.self)
	{
		return;
	}
	//allHostNames sites excluded
	if (window.location.href.match("https?:\/\/(www\.)?[\w\.-]*(?:" + 
						allHostNames.join("|").replace(/\./g, "\\.").replace(/-/g, "\\-") + 
																		")"))
	{
		return;
	}
}
catch (e)
{
	return;
}
//separate alternative domains with "|" char (first name is considered being main)
var allObsoleteNames = ["uloz.cz","storage.to","iskladka.cz","file-rack.com","fast-load.net","subory.sk","bigandfree.com",
"fileop.com","mujsoubor.cz","sendfile.to","superfastfile.com","quickyshare.com","duckload.com","uploadstore.net","meinupload.com",
"dualshare.com","2xupload.to|2xupload.de","oxedion.com","uploadline.com","dll.bz","movieshare.in","milledrive.com","quickupload.net",
"safelink.in","metadivx.com","divxlink.com","uploadrack.com","teradepot.com","dataup.to","upit.to","driveway.com","eatlime.com",
"a2zuploads.com","friendlyfiles.net","flyfile.us","speedyshare.com","uploadspace.eu","keepfile.com","piggyshare.com",
"filecrown.com","6giga.com","uploadjockey.com","bluehost.to","filegu.ru","filebase.to","up-file.com","ezyfile.net","xvideos.com",
"filebling.com","loaded.it","uploadcell.com","uploadshare.cz","mangoshare.com","filestab.com","crazyupload.com","gaiafile.com",
"sharejunky.com","fileho.com","bigandfree.com","bigfile.in","bigshare.eu","dahosting.org","digisofts.net","file4save.com",
"filechip.com","filescloud.com","saveqube.com","turboshare.de","z-upload.com","youshare.com","jiffyupload.com","gigeshare.com",
"datenklo.net","upload.dj","loadfiles.in","upit.to","dsfileshare.com","sharesimple.net","4files.net", 
"odsiebie.com","filenavi.com","3oof.com","meshwaar.com","maxupload.com","share.cx","atserver.eu",
"file2upload.net","filebling.com","turboshare.com","rarhost.com","isharehd.com","i741.com","dataup.de","fofly.com","shareonall.com",
"sexuploader.com","megaupload.com|megavideo.com|megaporn.com|megarotic.com","uploadhyper.com","filespawn.com","caizzii.com",
"volnyweb.cz","usershare.net","filescash.net","metahyper.com","combozip.com","x7.to","uploadbox.com","enterupload.com|flyupload.com",
"filepoint.de","mystream.to","x-fs.com","shareator.com","srapid.eu","sosame.cz","filesdump.com","2-klicks.de",
"silofiles.com","upfile.in","filehook.com","uploadking.com","uploadhere.com","kewlshare.com","rapidable.com",
"filesonic.com|sharingmatrix.com","fileserve.com","wupload.com", "skipfile.com", "smartuploader.com", "dualshare.com", "storeandserve.com",
"mountfile.com", "transitfiles.com", "uploadstation.com", "filejungle.com", "shareshared.com", "quickyshare.com", "save.am", "petandrive.com",
"file2box.com", "flyshare.cz", "yabadaba.ru", "cloudcache.cc", "yourfilehost.com", "jakfile.com", "kickload.com", "pyramidfiles.com",
"refile.net", "zshare.net", "ddlani.me|ddlanime.com", "ftp2share.com", "fooget.com", "rapidhide.com", "gotupload.com", "mooload.com",
"zupload.com", "mytempdir.com", "onionshare.com", "stahnu.to", "oron.com", "badongo.com","filereactor.com","filegaze.com","monsteruploads.eu", "glumbouploads.com", "streamvideo.me", "xvidstream.net", "sharebees.com", "zooupload.com","putlocker.ch","hdplay.org",  "monsteruploads.eu", "sharpfile.com",  "videobb.com", "fileza.net", "video.google.com","dwn.so", "ifile.it", "sharevid.co", "vidhuge.com", "vidshark.ws", "stormvid.co", "fileking.co", "ovfile.com","cyberlocker.ch", "uploadboost.com","videoslim.net"];

// GM_log(allHostNames.length);
// GM_log(allObsoleteNames.length);

var firstRun = GM_getValue("First_run", true);

allHostNames.sort();
allObsoleteNames.sort();

var RAND_STRING = "8QyvpOSsRG3QWq";
var DEBUG_MODE = false;

//settings for keyboard functions start
var CHECK_ALL_LINKS_KEY = "A";
var CONFIGURATION_KEY = "C";
var toggle_autocheck_key = "W";
var first_key_keycode = '17'; // 18=ALT 16=Shift 17=Ctrl 32=SPACE_BAR 9=TAB
var first_key_keycodename = 'CTRL';
var second_key_keycode = '18';
var second_key_keycodename = 'ALT';
var CHECK_ALL_LINKS_KEYCODE = CHECK_ALL_LINKS_KEY.charCodeAt(0);
var CONFIGURATION_KEYCODE = CONFIGURATION_KEY.charCodeAt(0);
var toggle_autocheck_keycode = toggle_autocheck_key.charCodeAt(0);
//settings for keyboard functions end
//global settings start
var Show_black_background_in_DL_links, Show_line_through_in_dead_links, Color_DL_links;
var Live_links_color, Dead_links_color, Temp_unavailable_links_color;
var Do_not_linkify_DL_links, Keyboard_functions, Autocheck;
var Obsolete_file_hosts;

var messageBox = document.createElement('b'); // top-left message box

var cLinksTotal = 0;
var cLinksDead = 0;
var cLinksAlive = 0;
var cLinksUnava = 0;
var cLinksProcessed = 0;

//global settings end
if (window.opera && !window.console)
{
	window.console = {};

	function fn()
	{
		opera.postError(arguments);
	};
	['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'].forEach(function (name)
	{
		window.console[name] = fn;
	});
}

//displays colored text in message box
function sendMessage(text, color)
{
	var msgDiv = document.createElement('div');
	msgDiv.style.color = color;
	msgDiv.innerHTML = text;
	messageBox.appendChild(msgDiv);
	setTimeout(function(){messageBox.removeChild(msgDiv)}, 3000);
}

//Optimized in v. 1.2.4.4 - Now a much simpler regex is used to find all links and those are individually matched against the huge regex. "host.com/" won't get linkified.
function linkify(totalourls)
{ // code from http://userscripts.org/scripts/review/2254  Linkify ting
	var ikkeTilladteTags;
	
	var allLinksRegex = "(?:http:\/\/.+?\\?)?(?:https?:\/\/)?"
		+ "[0-9A-Za-z]+(?:[\\.-][0-9A-Za-z]+)*\\.[A-Za-z]+/"   //instead of totalourls
		+ "[\\w\\–\\-\\.+$!*\\/()\\[\\]\',~%?:@#&=\\\\\\—;…×Ã\\_\\u0080-\\u03FF’‘" +    (Allow_spaces_in_DL_links ? "\\u0020" : "")    + "]*";
	allLinksRegex = new RegExp(allLinksRegex, "g");
	
	var regexy = "^(?:http:\/\/.+?\\?)?(?:https?:\/\/)?(?:www\\.)?(?:" + totalourls + ")";

	if (Do_not_linkify_DL_links)
		ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea', 'span']; //tags, hvor det der stAÎžâ€™Î’ÂĄr inden i ikke skal vAÎžâ€™Î’Â¦re links
	else
		ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea']; //tags, hvor det der stAÎžâ€™Î’ÂĄr inden i ikke skal vAÎžâ€™Î’Â¦re links

	var regex = new RegExp(regexy);
	var textNode, muligtLink;

	var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") + ") and contains(.,'/')]";
	var textNodes = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var i = textNodes.snapshotLength;
	
	while (i--)
	{
		textNode = textNodes.snapshotItem(i);

		muligtLink = textNode.nodeValue; //all links on page

		var myArray = null;
		var span = null;
		var lastLastIndex = 0;
		allLinksRegex.lastIndex = 0;
		
		while (myArray = allLinksRegex.exec(muligtLink)) //find all links
		{
			if (!regex.test(myArray[0]))  //this link is not recognized
			{
				//uncomment to reproduce original behavior ("somethinghotfile.com/"  =>  "hotfile.com/" will get linkified).
				//it's probably undesired and it also has a huge overhead - given "xyz.com/", all possibilities will be matched against the huge regex: "xyz.com/", "yz.com/", "z.com/"
				//allLinksRegex.lastIndex -= (myArray[0].length - 1); //start next match at the next character, not after the link
				continue;
			}
			
			if (!span) 
				span = document.createElement('span');

			var link = myArray[0];
			span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index))); //inds?t det der kommer for dette hit

			var $a = $("<a>" + link + "</a>")
			
			if (!link.match(/https?:\/\//))
			{
				link = 'http://' + link;
			}

			$a.attr("href", link.replace(/\[\/hide:\w+\]/,""))
				.addClass("processing_link")
				.appendTo(span);
			
			lastLastIndex = allLinksRegex.lastIndex;
		}
		
		if (span)
		{
			span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex))); //ins?t det der kommer efter sidste hit
			textNode.parentNode.replaceChild(span, textNode);
		}
	}
}

function add_WARLC_style()
{
	if (!(document.getElementsByTagName('WARLC')[0]))
	{
		var meta_not_to_add_more_style = document.createElement("WARLC");
		meta_not_to_add_more_style.setAttribute('content', 'war_links_checker');
		meta_not_to_add_more_style.setAttribute('name', 'description');
		document.getElementsByTagName('head')[0].appendChild(meta_not_to_add_more_style);
		processing_link_gif = 'data:image/gif;base64,' + // or temporary anavailable
		'R0lGODlhCgAKAJEDAMzMzP9mZv8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAADACwAAAAACgAKAAACF5wncgaAGgJzJ647cWua4sOBFEd62VEAACH5BAUAAAMALAEAAAAIAAMAAAIKnBM2IoMDAFMQFAAh+QQFAAADACwAAAAABgAGAAACDJwHMBGofKIRItJYAAAh+QQFAAADACwAAAEAAwAIAAACChxgOBPBvpYQYxYAIfkEBQAAAwAsAAAEAAYABgAAAgoEhmPJHOGgEGwWACH5BAUAAAMALAEABwAIAAMAAAIKBIYjYhOhRHqpAAAh+QQFAAADACwEAAQABgAGAAACDJwncqi7EQYAA0p6CgAh+QQJAAADACwHAAEAAwAIAAACCpRmoxoxvQAYchQAOw%3D%3D';

		var dead_color_css, live_color_css, unava_color_css, black_background_css;

		if (Color_DL_links)
		{
			dead_color_css = 'color:' + Dead_links_color + ' !important;';
			live_color_css = 'color:' + Live_links_color + ' !important;';
			unava_color_css = 'color:' + Temp_unavailable_links_color + ' !important;';
		}
		else
		{
			dead_color_css = live_color_css = unava_color_css = '';
		}

		if (Show_black_background_in_DL_links)
		{
			black_background_css = 'background-color: black !important;';
		}
		else
		{
			black_background_css = '';
		}

		if (Show_line_through_in_dead_links)
		{
			line_through_css = 'text-decoration: line-through !important;';
		}
		else
		{
			line_through_css = '';
		}

		GM_addStyle(".alive_link {background:transparent no-repeat scroll 100% 50%;padding-right:15px;" + live_color_css + black_background_css + "}");
		GM_addStyle(".adead_link {background:transparent no-repeat scroll 100% 50%;padding-right:15px;" + dead_color_css + black_background_css + line_through_css + "}");
		GM_addStyle(".unava_link {background:transparent no-repeat scroll 100% 50%;padding-right:15px;" + unava_color_css + black_background_css + "}");
		GM_addStyle(".processing_link {background:transparent url(" + processing_link_gif + ") no-repeat scroll 100% 50%;padding-right:15px;" + black_background_css + "}");
	}
}

	function setVariables()
	{
		if (firstRun)
		{
			GM_log('First run, applying default settings...');
			
			GM_setValue("Show_black_background_in_DL_links",false);
			GM_setValue("Show_line_through_in_dead_links",false);
			GM_setValue("Allow_spaces_in_DL_links",false);
			GM_setValue("Autocheck",true);
			GM_setValue("Do_not_linkify_DL_links",false);
			GM_setValue("Keyboard_functions",true);
			GM_setValue("Obsolete_file_hosts",false);
			GM_setValue("Color_DL_links",true);
			GM_setValue("Live_links_color","SpringGreen");
			GM_setValue("Dead_links_color","#FF3300");
			
			GM_setValue("First_run", false);		
		}
		//hidden settings
		GM_setValue("Debug_mode", DEBUG_MODE = GM_getValue("Debug_mode", false));
		//hidden settings end
		Show_black_background_in_DL_links = GM_getValue("Show_black_background_in_DL_links", false);
		Show_line_through_in_dead_links = GM_getValue("Show_line_through_in_dead_links", false);
		Allow_spaces_in_DL_links = GM_getValue("Allow_spaces_in_DL_links", false);
		Autocheck = GM_getValue("Autocheck", true);
		Do_not_linkify_DL_links = GM_getValue("Do_not_linkify_DL_links", false);
		Keyboard_functions = GM_getValue("Keyboard_functions", true);
		Obsolete_file_hosts = GM_getValue("Obsolete_file_hosts", false);
		Color_DL_links = GM_getValue("Color_DL_links", true);
		Live_links_color = GM_getValue("Live_links_color", "SpringGreen");
		Dead_links_color = GM_getValue("Dead_links_color", "#FF3300");
		Temp_unavailable_links_color = GM_getValue("Temp_unavailable_links_color", "#F7EF09");
	}


	// Delinkifies the links
	// links -> list of links or link components (note they should be sufficiently unique to identify the link on page,
	// e.g. 'uloz.to/xs68skxl8')
	function delinkifySnapshot(snapshot)
	{
		var n = snapshot.snapshotLength;

		while (n--)
		{
			thisLink = snapshot.snapshotItem(n);

			var spanElm = document.createElement("span");
			spanElm.className = thisLink.className;
			spanElm.innerHTML = thisLink.innerHTML;
			
			thisLink.parentNode.replaceChild(spanElm, thisLink);
		}
	}

	var bulkHosts = new Array();
	var bulkHostNames = new Array();
	
	function initBulkCheck()
	{
		// Inits filehost object

		function addHost(hostName, linkRegex, xpath, blockSize, corrMatch, corrReplWhat, corrReplWith, splitSeparator, 
							apiUrl, postData, resLinkRegex, resLiveRegex, resDeadRegex, resUnavaRegex, func)
		{
			var fileHost = new Object();

			fileHost.linkRegex = linkRegex;
			fileHost.linkRegexObject = new RegExp(linkRegex, "");
			fileHost.xpath = xpath;
			fileHost.cFound = 0; //found links counter
			fileHost.links = new Array(); //found links
			
			if (blockSize == null) 
			{ 
				fileHost.blockSize = 50;  
			}
			else
			{
				fileHost.blockSize = blockSize;
			}
			
			fileHost.corrMatch = corrMatch; 
			fileHost.corrReplWhat = corrReplWhat; 
			fileHost.corrReplWith = corrReplWith;
			
			if (splitSeparator == null) 
			{
				fileHost.splitSeparator = "\r\n"; 
			}
			else
			{
				fileHost.splitSeparator = splitSeparator;
			}
			
			fileHost.apiUrl = apiUrl;
			fileHost.postData = postData;
			fileHost.resLinkRegex = resLinkRegex;
			fileHost.resLiveRegex = resLiveRegex;
			fileHost.resDeadRegex = resDeadRegex;
			fileHost.resUnavaRegex = resUnavaRegex;
			
			if (func == null)
			{
				fileHost.func = genBulkCheck;
			}
			else
			{
				fileHost.func = func;
			}
			
			bulkHosts.push(fileHost);
			
			var names = hostName.split(',');
			var i = names.length;
			while(i--)
			{
				bulkHostNames[names[i]] = fileHost;			
			}
			
		}
		
var genType1 = [	"upthe.net",		"vidhog.com", 		"dark-uploads.com",	
							"migahost.com",		"rodfile.com",		"downloadani.me",
							"fileduct.com",		"mojofile.com",		
							"filezpro.com",		"eyesfile.com",			
							"ok2upload.com",	"rarefile.net",		
							"file-bit.net",		"gorillavid.in", "gorillavid.com",	"filevelocity.com",		"goldfile.eu",		"space4file.com",	
							"shafiles.me",		"ginbig.com",		"flashstream.in",
							"vreer.com",		"isavelink.com",	"uploadic.com",
							"ddlstorage.com", 	"filesabc.com",		"sharebeast.com",
							"180upload.com",	"verzend.be",
							"asixfiles.com",	"zomgupload.com",	"mlfat4arab.com",		
							"4up.me",			"gigfiles.net",		"fileupup.com",		"share76.com",
							"filebox.com",		"file4safe.com",	"upafile.com",
							"1hostclick.com",	"filemac.com",		
							"idup.in",			"aieshare.com",		"novafile.com",		"longfiles.com",
							"potload.com",		"rockdizfile.com", 	"cloudnxt.net",		"bitupload.com",
							"filehost.ws",		"filesbb.com",		"filecosy.com",
							"uploadbaz.com",	"mp4upload.com", "mojoload.com", "junocloud.me", "filezy.net", "billionuploads.com", "daclips.com", "daclips.in", "zuzvideo.com", "180upload.nl", "filenuke.com", "movpod.in", "uptobox.com", "vodlocker.com"];
						
		var genType2 = [	"filegag.com",		"prefiles.com",		"queenshare.com", 	"coraldrive.net",
							"fireuploads.net",	"filetechnology.com",	"lumfile.com",		"filesega.com",
							"filestay.com",		"4savefile.com", 	"daj.to",
							"upfile.biz",		"4bytez.com",		"kupload.org",		"bzlink.us",
							"uploadjet.net",	"clouds.to",		"247upload.com",
							"filezy.net", 		"fileprohost.com",	"filemates.com",	"sharefilehost.com",
							"filerose.com",		"tusfiles.net",		"ihostia.com",		"uploadoz.com",
							"squillion.com", 	"shareupload.com",	"amonshare.com",	"edoc.com",
							"uload.to",			"filefolks.com",	"filedefend.com",	"venusfile.com",
							"cyberlocker.ch",	"fileduct.net",		"upgrand.com",		"secureupload.eu",
							"uploading4u.eu",	"grupload.com",		"filestrum.com",	"fileuplo.de",
							"upaj.pl",			"sinhro.net",		"fileking.co",		"filedownloads.org",
							"uploadcore.com", "sharesix.com", "project-free-upload.com", "billionuploads.com", "vidspot.net", "fileom.com", "v-vids.com", "uploadnetwork.eu", "vshare.eu", "megafiles.se", "expressleech.com", "divxpress.com", "filedap.com","albafile.com", "180upload.com", "180upload.nl", "filenuke.com", "movpod.in", "movreel.com", "kingfiles.net", "fileparadox.in", "thefile.me", "videopremium.me", "vidzi.tv", "uploadsat.com"];
		//xfilesharing 1.0
		function addGenericType1()
		{
			var i = genType1.length;
			
			while(i--)
			{
				if (GM_getValue("Check_" + genType1[i].replace(/\./g, "_dot_").replace(/-/g, "_dash_") + "_links", false))
				{
					var regexSafe = genType1[i].replace(/\./g, "\\.").replace(/-/g, "\\-");
					
					addHost(
						genType1[i].match(/[\w-]+/)[0], //hostname
						regexSafe + "\/\\w+", //linkregex
						"//a[contains(@href,'" + genType1[i] + "/')]", //xpath
						null, //blocksize
						new RegExp("(http:\/\/(?:|www\\.)" + regexSafe + "\/\\w+)",""),//, //corrmatch
						null, //corrreplwhat
						null, //corrreplwith
						null, //separator
						"http://" + genType1[i] + "/checkfiles.html", //api url
						"op=checkfiles&process=Check+URLs&list=", //postdata
						new RegExp("(" + regexSafe + "\/\\w+)",""), //linkregex
						new RegExp("green'>http:\/\/(?:|www\.)" + regexSafe + "\/\\w+","g"), //liveregex
						new RegExp("red'>http:\/\/(?:|www\.)" + regexSafe + "\/\\w+","g"), //deadregex
						new RegExp("orange'>http:\/\/(?:|www\.)" + regexSafe + "\/\\w+","g"), //unavaregex
						null //function delegate
					)
				}
			}
		}
		//xfilesharing 2.0
		function addGenericType2()
		{
			var i = genType2.length;
			
			while(i--)
			{
				if (GM_getValue("Check_" + genType2[i].replace(/\./g, "_dot_").replace(/-/g, "_dash_") + "_links", false))
				{
					var regexSafe = genType2[i].replace(/\./g, "\\.").replace(/-/g, "\\-");
					
					addHost(
						genType2[i].match(/[\w-]+/)[0], //hostname
						regexSafe + "\/\\w+", //linkregex
						"//a[contains(@href,'" + genType2[i] + "/')]", //xpath
						null, //blocksize
						new RegExp("(http:\/\/(?:|www\\.)" + regexSafe + "\/\\w+)",""),//, //corrmatch
						null, //corrreplwhat
						null, //corrreplwith
						null, //separator
						"http://www." + genType2[i] + "/?op=checkfiles", //api url
						"op=checkfiles&process=Check+URLs&list=", //postdata
						new RegExp("(" + regexSafe + "\/\\w+)",""), //linkregex
						new RegExp(regexSafe + "\/\\w+.*?<\/td>\\s*<td style=\"color:green;\">","g"), //liveregex
						new RegExp(regexSafe + "\/\\w+.*?<\/td>\\s*<td style=\"color:red;\">","g"), //deadregex
						new RegExp(regexSafe + "\/\\w+.*?<\/td>\\s*<td style=\"color:orange;\">","g"), //unavaregex
						null //function delegate
					)
				}
			}
		}				

		addGenericType1();
		addGenericType2();
		
		if (GM_getValue("Check_i_dash_filez_dot_com_links", false))
		{	
			addHost(
				"i-filez", //hostname
				"i-filez\\.com\/downloads\/i\/\\d+\/f\/", //linkregex
				"//a[contains(@href,'i-filez.com/downloads')]", //xpath
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://i-filez.com/checkfiles", //api url
				"send=Check&files=", //postdata
				/(downloads\/i\/\d+)/, //linkregex
				/http:\/\/i-filez\.com\/downloads\/i\/\d+\/f\/[\w\(\)\.]+<\/td><td><span class='active/g, //liveregex
				/http:\/\/i-filez\.com\/downloads\/i\/\d+\/f\/[\w\(\)\.]+<\/td><td><span class='notfound/g, //deadregex
				null, //unavaregex
				null //function delegate
			)				
		}
		if (GM_getValue("Check_fileserving_dot_com_links", false))
		{	
			addHost(
				"fileserving", //hostname
				"fileserving\\.com\/files\/[\\w-]+", //linkregex
				"//a[contains(@href,'fileserving.com/files')]", //xpath
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://www.fileserving.com/Public/linkchecker#", //api url
				"links=", //postdata
				/fileserving\.com\/(files\/\w+)/, //linkregex
				/icon_file_check_valid"><\/span>\s*http:\/\/www\.fileserving\.com\/files\/[\w-]+/g, //liveregex
				/icon_file_check_(?:removed|notvalid)"><\/span>\s*http:\/\/www\.fileserving\.com\/files\/[\w-]+/g, //deadregex
				null, //unavaregex
				null //function delegate
			)				
		}
		if (GM_getValue("Check_sharpfile_dot_com_links", false))
		{	
			addHost(
				"sharpfile", //hostname
				"sharpfile\\.com\/\\w+", //linkregex
				"//a[contains(@href,'sharpfile.com/')]", //xpath
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://sharpfile.com/check-files.php", //api url
				"process=Check+URLs&url_list=", //postdata
				/sharpfile\.com\/(\w+)/, //linkregex
				/green'>http:\/\/(?:|www\.)sharpfile\.com\/\w+/g, //liveregex
				/red'>http:\/\/(?:|www\.)sharpfile\.com\/\w+/g, //deadregex
				/orange'>http:\/\/(?:|www\.)sharpfile\.com\/\w+/g, //unavaregex
				null //function delegate
			)				
		}
		if (GM_getValue("Check_henchfile_dot_com_links", false))
		{	
			addHost(
				"henchfile,HenchFile", //hostname
				"(?:henchfile|HenchFile)\\.com\/\\w+", //linkregex
				"//a[contains(@href,'henchfile.com/') or contains(@href,'HenchFile.com/')]", //xpath
				null, //blocksize
				/(http:\/\/(?:|www\.)henchfile\.com\/\w+)/i, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://www.henchfile.com/?op=checkfiles", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/henchfile\.com\/(\w+)/i, //linkregex
				/henchfile\.com\/\w+.*?<\/td><td style="color:green;">/g, //liveregex
				/henchfile\.com\/\w+.*?<\/td><td style="color:red;">/g, //deadregex
				/henchfile\.com\/\w+.*?<\/td><td style="color:orange;">/g, //unavaregex
				null //function delegate
			)				
		}		
		if (GM_getValue("Check_files2k_dot_eu_links", false))
		{	
			addHost(
				"files2k", //hostname
				"files2k\\.eu\/\\w+", //linkregex
				"//a[contains(@href,'files2k.eu/')]", //xpath
				null, //blocksize
				/(http:\/\/(?:|www\.)files2k\.eu\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://files2k.eu/?op=checkfiles", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/(files2k\.eu\/\w+)/, //linkregex
				/files2k\.eu\/\w+.*?<\/td><td style="color:green;">/g, //liveregex
				/files2k\.eu\/\w+.*?<\/td><td style="color:red;">/g, //deadregex
				/files2k\.eu\/\w+.*?<\/td><td style="color:orange;">/g, //unavaregex
				null //function delegate
			)				
		}			
		if (GM_getValue("Check_batshare_dot_com_links", false))
		{	
			addHost(
				"batshare", //hostname
				"batshare\\.com\/\\w+", //linkregex
				"//a[contains(@href,'batshare.com/')]", //xpath
				null, //blocksize
				/(http:\/\/(?:|www\.)batshare\.com\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://www.batshare.com/checkfiles.html", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/(batshare\.com\/\w+)/, //linkregex
				/green'><a target='_new' href='https?:\/\/(?:|www\.)batshare\.com\/\w+/g, //liveregex
				/red'>https?:\/\/(?:|www\.)batshare\.com\/\w+/g, //deadregex
				null, //unavaregex
				null //function delegate
			)				
		}		
		if (GM_getValue("Check_sharefiles_dot_co_links", false))
		{	
			addHost(
				"sharefiles", //hostname
				"sharefiles\\.co\/\\w+", //linkregex
				"//a[contains(@href,'sharefiles.co/')]", //xpath
				null, //blocksize
				/(https?:\/\/(?:|www\.)sharefiles\.co\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://sharefiles.co/?op=checkfiles", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/(sharefiles\.co\/\w+)/, //linkregex
				/green'>https?:\/\/(?:|www\.)sharefiles\.co\/\w+/g, //liveregex
				/red'>https?:\/\/(?:|www\.)sharefiles\.co\/\w+/g, //deadregex
				/orange'>https?:\/\/(?:|www\.)sharefiles\.co\/\w+/g, //unavaregex
				null //function delegate
			)				
		}		
		if (GM_getValue("Check_hackerbox_dot_org_links", false))
		{	
			addHost(
				"hackerbox", //hostname
				"host\\.hackerbox\\.org\/\\w+", //linkregex
				"//a[contains(@href,'host.hackerbox.org/')]", //xpath
				null, //blocksize
				/(http:\/\/host\.hackerbox\.org\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://host.hackerbox.org/checkfiles.html", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/(host\.hackerbox\.org\/\w+)/, //linkregex
				/green'>http:\/\/host\.hackerbox\.org\/\w+/g, //liveregex
				/red'>http:\/\/host\.hackerbox\.org\/\w+/g, //deadregex
				/orange'>http:\/\/host\.hackerbox\.org\/\w+/g, //unavaregex
				null //function delegate
			)				
		}			
		if (GM_getValue("Check_ryushare_dot_com_links", false))
		{	
			addHost(
				"ryushare", //hostname
				"ryushare\\.com\/\\w+", //linkregex
				"//a[contains(@href,'ryushare.com/')]", //xpath
				null, //blocksize
				/(http:\/\/(?:|www\.)ryushare\.com\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://ryushare.com/checkfiles.python", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/(ryushare\.com\/\w+)/, //linkregex
				/green'>http:\/\/(?:|www\.)ryushare\.com\/\w+/g, //liveregex
				/red'>http:\/\/(?:|www\.)ryushare\.com\/\w+/g, //deadregex
				/orange'>http:\/\/(?:|www\.)ryushare\.com\/\w+/g, //unavaregex
				null //function delegate
			)				
		}		
		if (GM_getValue("Check_hellshare_dot_com_links", false))
		{			
			addHost(
				"hellshare", //hostname
				"(?:|download\\.(?:cz\\.|en\\.|sk\\.|)|www\\.)hellshare\\.(?:com|sk|cz|pl|hu)\/[\\w-\\.]+\/(?:[\\w-\\.]+\/|)\\d{5,}", //linkregex
				"//a[contains(@href,'hellshare.')]", //xpath
				48, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				null, //api url
				null, //postdata
				null, //linkregex
				null, //liveregex
				null, //deadregex
				null, //unavaregex
				hellshareBulkCheck //function delegate
			)				
		}			
		if (GM_getValue("Check_ncrypt_dot_in_links", false))
		{			
			addHost(
				"ncrypt", //hostname
				"ncrypt\\.in\/folder\\-\\w+", //linkregex
				"//a[contains(@href,'ncrypt.in/folder')]", //xpath
				100000, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				null,
				null,
				null,
				null,
				null,
				null,
				ncryptBulkCheck //function delegate
			)			
		}		
		if (GM_getValue("Check_filepost_dot_com_links", false))
		{			
			addHost(
				"filepost,fp", //hostname
				"(?:filepost\\.com\/files|fp\\.io)\/\\w+", //linkregex
				"//a[contains(@href,'filepost.com/files/') or contains(@href,'fp.io/')]", //xpath
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				"\n", //separator
				'http://filepost.com/files/checker/?JsHttpRequest=0-xml',
				'urls=',
				/\\\/files\\\/(\w+)/,
				/>http:\\\/\\\/filepost\.com\\\/files\\\/\w+(?:[^>]+>){5}(?:\\n|\\t)+<span class=\\"v\\"/g,
				/>http:\\\/\\\/filepost\.com\\\/files\\\/\w+(?:[^>]+>){5}(?:\\n|\\t)+<span class=\\"x\\"/g,
				null,
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_syfiles_dot_com_links", false))
		{			
			addHost(
				"sharerun,syfiles", //hostname
				"(?:sharerun|syfiles)\\.com\/\\w+", //linkregex
				"//a[contains(@href,'sharerun.com/') or contains(@href,'syfiles.com/')]", //xpath
				null, //blocksize
				/(http:\/\/(?:|www\.)(?:sharerun|syfiles)\.com\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://syfiles.com/?op=checkfiles',
				'op=checkfiles&process=&list=',
				/((?:sharerun|syfiles)\.com\/\w+)/,
				/\/(?:sharerun|syfiles)\.com\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g, //liveregex
				/\/(?:sharerun|syfiles)\.com\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g, //deadregex
				/\/(?:sharerun|syfiles)\.com\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g, //unavaregex
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_fiberupload_dot_com_links", false))
		{			
			addHost(
				"bulletupload,fiberupload", //hostname
				"(?:bullet|fiber)upload\\.com\/\\w+", //linkregex
				"//a[contains(@href,'bulletupload.com') or contains(@href,'fiberupload.com')]", //xpath
				null, //blocksize
				/(http:\/\/(?:www\.)?(?:(?:bullet|fiber)upload)\.com\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://fiberupload.com/checkfiles.html',
				'op=checkfiles&list=',
				/((?:bullet|fiber)upload\.com\/\w+)/,
				/'green'>http:\/\/(?:www\.)?(?:bullet|fiber)upload\.com\/\w+/g,
				/'red'>http:\/\/(?:www\.)?(?:bullet|fiber)upload\.com\/\w+/g,
				/'orange'>http:\/\/(?:www\.)?(?:bullet|fiber)upload\.com\/\w+/g,
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_filesflash_dot_com_links", false))
		{			
			addHost(
				"filesflash", //hostname
				"filesflash\\.com\/\\w+", //linkregex
				"//a[contains(@href,'filesflash.com')]", //xpath
				null, //blocksize
				null, //corrmatch
				/http:\/\//, //corrreplwhat
				'', //corrreplwith
				null, //separator
				'http://filesflash.com/checklinks.php',
				'submit=Go&links=',
				/filesflash\.com\/(\w+)/,
				/<td>filesflash\.com\/\w+<\/td>\s*<td>Available/g,
				/<td>filesflash\.com\/\w+<\/td>\s*<td>(?:Invalid|Deleted|Expired|Banned)?<\/td>/g,
				null,
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_hitfile_dot_net_links", false))
		{			
			addHost(
				"hitfile", //hostname
				"hitfile\\.net\/\\w+", //linkregex
				"//a[contains(@href,'hitfile.net')]", //xpath
				null, //blocksize
				null, //corrmatch
				/edisk\.\w{2}\/(?:|\w{2}\/)stahni/, //corrreplwhat
				'edisk.cz/stahni', //corrreplwith
				"\n", //separator
				'http://hitfile.net/linkchecker/check',
				'links_to_check=',
				/^<td>(\w+)<\/td>/,
				/<td>\w+<\/td>\s*<td>[^<]*<\/td>\s*<td style[^<]+<img.*?title="Existent"/g,
				/<td>\w+<\/td>\s*<td>[^<]*<\/td>\s*<td style[^<]+<img.*?title="Deleted"/g,
				null,
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_jumbofiles_dot_com_links", false))
		{	
			addHost(
				"jumbofiles", //hostname
				"jumbofiles\\.com\/\\w+", //linkregex
				"//a[contains(@href,'jumbofiles.com/')]", //xpath
				null, //blocksize
				/(http:\/\/(?:|www\.)jumbofiles\.com\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://jumbofiles.com/checkfiles.html", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/(jumbofiles\.com\/\w+)/, //linkregex
				/blue'>http:\/\/(?:|www\.)jumbofiles\.com\/\w+/g, //liveregex
				/red'>http:\/\/(?:|www\.)jumbofiles\.com\/\w+/g, //deadregex
				/orange'>http:\/\/(?:|www\.)jumbofiles\.com\/\w+/g, //unavaregex
				null //function delegate
			)				
		}		
		if (GM_getValue("Check_edisk_dot_cz_links", false))
		{			
			addHost(
				"edisk", //hostname
				"(?:(?:muj|data)\\d*\\.|)edisk\\.(?:cz|sk|eu)\/(?:|(?:cz|sk|en|pl)\/)", //linkregex
				"//a[contains(@href,'edisk.')]", //xpath
				null, //blocksize
				null, //corrmatch
				/edisk\.\w{2}\/(?:|\w{2}\/)stahni/, //corrreplwhat
				'edisk.cz/stahni', //corrreplwith
				null, //separator
				'http://www.edisk.cz/zkontrolovat-odkazy',
				'submitBtn=Zkontrolovat&checkFiles=',
				/((?:download|stahn(?:i|out-soubor))\/\d+)/,
				/"ano"\/>\s*<\/td>\s*<td>\s*http:\/\/.+/g,
				/"ne"\/>\s*<\/td>\s*<td>\s*http:\/\/.+/g,
				null,
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_stahuj_dot_to_links", false))
		{			
			addHost(
				"stahuj", //hostname
				"stahuj\\.to\/\\w+", //linkregex
				"//a[contains(@href,'stahuj.to/')]", //xpath
				null, //blocksize
				/(http:\/\/(?:www\.|)stahuj\.to\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://stahuj.to/checkfiles.html',
				'op=checkfiles&process=Zkontrolovat+URL+adresy&list=',
				/(stahuj\.to\/\w+)/,
				/green'>http:\/\/(?:|www\.)stahuj\.to\/\w+/g,
				/red'>http:\/\/(?:|www\.)stahuj\.to\/\w+/g,
				/orange'>http:\/\/(?:|www\.)stahuj\.to\/\w+/g,
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_share_dash_rapid_dot_com_links", false))
		{			
			addHost(
				"sharerapid,share-rapid,rapids,share-credit,share-central,share-ms,share-net,srapid", //hostname
				"(?:share-?rapid|rapids|share-credit|share-central|share\\-ms|share\\-net|srapid)\.(?:com|cz|sk|biz|net|info|eu)\/stahuj\/\\w+", //linkregex
				"//a[contains(@href,'share-rapid.') or contains(@href,'sharerapid.') or contains(@href,'rapids.') or contains(@href,'share-ms.') or contains(@href,'share-credit.') or contains(@href,'share-central.') or contains(@href,'share-net.') or contains(@href,'srapid.')]", //xpath
				null, //blocksize
				null, //corrmatch
				/\?(?:(?:dealer_id|ddlr)=\d+|)/, //corrreplwhat
				"", //corrreplwith
				null, //separator
				null,
				null,
				null,
				null,
				null,
				null,
				sharerapidBulkCheck //function delegate
			)			
		}		
		if (GM_getValue("Check_bezvadata_dot_cz_links", false))
		{			
			GM_xmlhttpRequest( //age check skip
			{
				method: 'POST',
				url: 'http://bezvadata.cz/vyhledavani/souhlas-zavadny-obsah',
				headers: {
					'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
					'Content-type': 'application/x-www-form-urlencoded',
					'Referer': ""						
				}
			});
			
			addHost(
				"bezvadata", //hostname
				"(?:beta\\.|)bezvadata\.cz\/stahnout\/\\d+\\w+", //linkregex
				"//a[contains(@href,'bezvadata.cz')]", //xpath
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://bezvadata.cz/nastroje/kontrola-odkazu?do=kontrolaOdkazuForm-submit',
				'zkontrolovat=Zkontrolovat&odkazy=',
				/(bezvadata\.cz\/stahnout\/\d+)/,
				/bezvadata\.cz\/stahnout\/.+?<\/td>\s*<td style="background-color: #d9ffb2/g,
				/bezvadata\.cz\/stahnout\/.+?<\/td>\s*<td style="background-color: #ffb2b2/g,
				null,
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_glumbo_dot_com_links", false))
		{			
			addHost(
				"glumbo,glumbouploads", //hostname
				"(?:uploads\\.glumbo|glumbouploads)\\.com\/\\w+", //linkregex
				"//a[contains(@href,'uploads.glumbo.com') or contains(@href,'glumbouploads.com')]", //xpath
				null, //blocksize
				null, //corrmatch
				/glumbouploads/, //corrreplwhat
				'uploads.glumbo', //corrreplwith
				null, //separator
				'http://glumbouploads.com/?op=checkfiles',
				'op=checkfiles&process=Check+URLs&list=',
				/(com\/\w+)/,
				/com\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g,
				/com\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g,
				/com\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g,
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_megashare_dot_com_links", false))
		{			
			addHost(
				"megashare,MegaShare", //hostname
				"(?:megashare|MegaShare)\\.com\/\\d+", //linkregex
				"//a[contains(@href,'megashare.com') or contains(@href,'MegaShare.com')]", //xpath
				100000, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				null,
				null,
				null,
				null,
				null,
				null,
				megashareBulkCheck //function delegate
			)			
		}		
		if (GM_getValue("Check_depositfiles_dot_com_links", false))
		{			
			addHost(
				"depositfiles, ", //hostname
				"depositfiles\\.com\/(?:en\/|ru\/|de\/|es\/|pt\/|)files\/\\w+", //linkregex
				"//a[contains(@href,'depositfiles.com') and contains(@href,'files')]", //xpath
				100000, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				null,
				null,
				null,
				null,
				null,
				null,
				depositfilesBulkCheck //function delegate
			)						
		}		
		if (GM_getValue("Check_linkcrypt_dot_ws_links", false))
		{			
			addHost(
				"linkcrypt", //hostname
				"linkcrypt\\.ws\/dir\/\\w+", //linkregex
				"//a[contains(@href,'linkcrypt.ws/dir')]", //xpath
				100000, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				null,
				null,
				null,
				null,
				null,
				null,
				linkcryptBulkCheck //function delegate
			)			
		}		
		if (GM_getValue("Check_linksave_dot_in_links", false))
		{			
			addHost(
				"linksave", //hostname
				"linksave\\.in\/\\w+", //linkregex
				"//a[contains(@href,'linksave.in')]", //xpath
				100000, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				null,
				null,
				null,
				null,
				null,
				null,
				linksaveBulkCheck //function delegate
			)			
		}		
		if (GM_getValue("Check_file4sharing_dot_com_links", false))
		{			
			addHost(
				"file4sharing", //hostname
				"file4sharing\\.com\/\\w+", //linkregex
				"//a[contains(@href,'file4sharing.com')]", //xpath
				null, //blocksize
				/(http:\/\/(?:www\.|)file4sharing\.com\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://file4sharing.com/?op=checkfiles',
				'op=checkfiles&process=Check+URLs&list=',
				/(file4sharing\.com\/\w+)/,
				/file4sharing\.com\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g, //liveregex
				/file4sharing\.com\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g, //deadregex
				/file4sharing\.com\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g, //unavaregex
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_bitshare_dot_com_links", false))
		{				
			addHost(
				"bitshare", //hostname
				"bitshare\\.com\/(?:files\/|\\?f=)\\w+", //linkregex
				"//a[contains(@href,'bitshare.com')]", //xpath
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://bitshare.com/linkcheck.html',
				'submit=Check&links=',
				/(bitshare\.com\/(?:files\/|\?f=)\w+)/,
				/ru_2\.gif" \/>\s*<\/div>\s*<span style="font-size:14px;font-weight:bold;">.*?<\/span>\s*<\/p>\s*<p>\s*<a href="http:\/\/(?:www\.|)bitshare\.com\/(?:files\/|\?f=)\w+/g,
				/ru_3\.gif" \/>\s*<\/div>\s*<span style="font-size:14px;font-weight:bold;">.*?<\/span>\s*<\/p>\s*<p>\s*<a href="http:\/\/(?:www\.|)bitshare\.com\/(?:files\/|\?f=)\w+/g,
				/ru_1\.gif" \/>\s*<\/div>\s*<span style="font-size:14px;font-weight:bold;">.*?<\/span>\s*<\/p>\s*<p>\s*<a href="http:\/\/(?:www\.|)bitshare\.com\/(?:files\/|\?f=)\w+/g,
				null //function delegate
			)			
		}
		if (GM_getValue("Check_cramit_dot_in_links", false))
		{			
			addHost(
				"cramit,cramitin", //hostname
				"cramit(?:\\.in|in\\.net)\/", //linkregex
				"//a[contains(@href,'cramitin.net') or contains(@href,'cramit.in')]", //xpath
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://cramit.in/checkfiles.html',
				'op=checkfiles&process=CHECK+URL%27S&list=',
				/(cramit(?:\.in|in\.net)\/\w+)/,
				/green>http:\/\/(?:www\.|)cramit(?:\.in|in\.net)\/\w+/g,
				/red'>http:\/\/(?:www\.|)cramit(?:\.in|in\.net)\/\w+/g,
				/orange'>http:\/\/(?:www\.|)cramit(?:\.in|in\.net)\/\w+/g,
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_turbobit_dot_net_links", false))
		{			
			addHost(
				"turbobit", //hostname
				"turbobit\\.(?:net|pl)\/(?:\\w+\/|).+?\\.html", //linkregex
				"//a[contains(@href,'turbobit.')]", //xpath
				null, //blocksize
				/(turbobit\.(?:net|pl)\/(?:\w+\/|).+?\.html)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				"\n", //separator
				'http://turbobit.net/linkchecker/csv',
				'links_to_check=',
				/(turbobit\.(?:net|pl)\/\w+)/,
				/turbobit\.(?:net|pl)\/.*?, 1/g,
				/turbobit\.(?:net|pl)\/.*?, 0/g, 
				null,
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_unextfiles_dot_com_links", false))
		{			
			addHost(
				"unextfiles", //hostname
				"unextfiles\\.com\/(?:\\w+\/|).+?\\.html", //linkregex
				"//a[contains(@href,'unextfiles.com/')]", //xpath
				null, //blocksize
				/(unextfiles\.com\/(?:\w+\/|).+?\.html)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				"\n", //separator
				'http://unextfiles.com/linkchecker/csv',
				'links_to_check=',
				/(unextfiles\.com\/\w+)/,
				/unextfiles\.com\/.*?, 1/g,
				/unextfiles\.com\/.*?, 0/g, 
				null,
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_filerio_dot_com_links", false))
		{			
			addHost(
				"filekeen,filerio", //hostname
				"file(?:keen|rio)\\.(?:com|in)\/\\w+\/.", //linkregex
				"//a[contains(@href,'filekeen.com') or contains(@href,'filerio.')]", //xpath
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://filerio.in/checkfiles.html',
				'op=checkfiles&process=Check+URLs&list=',
				/(file(?:keen|rio)\.(?:com|in)\/\w+)/,
				/green'>http:\/\/(?:www\.|)file(?:keen|rio)\.(?:com|in)\/\w+/g,
				/red'>http:\/\/(?:www\.|)file(?:keen|rio)\.(?:com|in)\/\w+/g,
				/orange'>http:\/\/(?:www\.|)file(?:keen|rio)\.(?:com|in)\/\w+/g,
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_share_dash_online_dot_biz_links", false))
		{			
			addHost(
				"share-online,egoshare", //hostname
				"(?:share-online\\.biz|egoshare\\.com)\/(?:dl\/|download\\.php\\?id=)", //linkregex
				"//a[contains(@href,'share-online.biz') or contains(@href,'egoshare.com')]", //xpath
				null, //blocksize
				/http:\/\/(?:www\.)?(?:share-online\.biz|egoshare\.com)\/d(?:l\/|ownload\.php\?id=)(\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				"\n", //separator
				'http://api.share-online.biz/linkcheck.php',
				'links=',
				/(\w+);(?:OK|NOTFOUND|DELETED)/,
				/\w+;OK/g,
				/\w+;(?:NOTFOUND|DELETED)/g, 
				null,
				null //function delegate
			)			
		}				
		if (GM_getValue("Check_quickshare_dot_cz_links", false))
		{			
			addHost(
				"quickshare", //hostname
				"quickshare\\.cz\/stahnout-soubor\/\\d+", //linkregex
				"//a[contains(@href,'quickshare.cz')]", //xpath
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://www.quickshare.cz/nastroje/link-checker',
				'linky=',
				/quickshare\.cz\/stahnout-soubor\/(\d+(?::\w+)?)/,
				/quickshare\.cz\/stahnout-soubor\/\d+(?::[\w\-.+$!*\/()\[\]\',~%?:@#&=\\]+)?\s*<\/a><\/td><td><img src="\/img\/ok\.gif/g,
				/quickshare\.cz\/stahnout-soubor\/\d+(?::[\w\-.+$!*\/()\[\]\',~%?:@#&=\\]+)?\s*<\/td><td><img src="\/img\/nenalezeno\.gif/g, 
				null,
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_multishare_dot_cz_links", false))
		{			
			addHost(
				"multishare", //hostname
				"multishare\\.cz\/stahnout\/\\d+\/", //linkregex
				"//a[contains(@href,'multishare.cz')]", //xpath
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				"\n", //separator
				"http://www.multishare.cz/link-checker/", //api url
				"akce=Ov%C4%9B%C5%99it+odkazy&linky=", //postdata
				/(multishare\.cz\/stahnout\/\d+)/, //linkregex
				/lnkch-ok\">.*?\s*<\/p>/g, //liveregex
				/lnkch-del\">.*?\s*<\/p>/g, //deadregex
				null, //unavaregex
				null //function delegate
			)			
		}		
		if (GM_getValue("Check_netload_dot_in_links", false))
		{			
			addHost(
				"netload", //hostname
				"netload\\.in\/datei\\w{10}", //linkregex
				"//a[contains(@href,'netload.in')]", //xpath
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				"\n", //separator
				"http://api.netload.in/index.php?id=2", //api url
				"send=Absenden&links=", //postdata
				/(\w+);/, //linkregex
				/\w{10,};.+?;.+?;online/g, //liveregex
				/\w{10,};.+?;.+?;offline/g, //deadregex
				null, //unavaregex
				netloadBulkCheck //function delegate
			)			
		}						
		if (GM_getValue("Check_hotfile_dot_com_links", false))
		{			
			addHost(
				"hotfile", //hostname
				"hotfile\\.com\/dl\/\\d+\/", //linkregex
				"//a[contains(@href,'hotfile.com')]", //xpath
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				"\n", //separator
				"http://api.hotfile.com/?action=checklinks", //api url
				null, //postdata
				null, //linkregex
				null, //liveregex
				null, //deadregex
				null, //unavaregex
				hotfileBulkCheck //function delegate
			)			
		}		
		if (GM_getValue("Check_rapidshare_dot_com_links", false))
		{			
			addHost(
				"rapidshare", //hostname
				"(?:|rs\\w*\\.)rapidshare\\.com\/files\/\\d+\/", //linkregex
				"//a[contains(@href,'rapidshare.com/files')]", //xpath
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				"\n", //separator
				null, //api url
				null, //postdata
				null, //linkregex
				null, //liveregex
				null, //deadregex
				null, //unavaregex
				rapidshareBulkCheck //function delegate
			)			
		}		
		if (GM_getValue("Check_filefactory_dot_com_links", false))
		{			
			addHost(
				"filefactory", //hostname
				"filefactory\\.com\/+file\/[a-z0-9]", //linkregex
				"//a[contains(@href,'filefactory.com')]", //xpath
				null, //blocksize
				null, //corrmatch
				/(?:www\.|)filefactory\.com\/+file/, //corrreplwhat
				'www.filefactory.com/file', //corrreplwith
				"\n", //separator
				"http://www.filefactory.com/tool/links.php", //api url
				"func=links&links=", //postdata
				/filefactory\.com\/(file\/\w+)/, //linkregex
				/<p>http:\/\/www\.filefactory\.com\/file\/\w+.+?<\/p>\s*<p class="hidden size">/g, //liveregex
				/<p>http:\/\/www\.filefactory\.com\/file\/\w+.+?<\/p>\s*<p class="errorResponse">/g, //deadregex
				null, //unavaregex
				null //function delegate
			)			
		}
// Thanks  thecodingdude/WARBB //
		if (GM_getValue("Check_mega_dot_co_dot_nz_links", false))
    		{
      			addHost(
        		"mega",
        		"mega\\.co\\.nz\/#!\\w+",
        		"//a[contains(@href,'mega.co.nz/')]",
        		100000, //blocksize
        		null, //corrmatch
        		null, //corrreplwhat
        		null, //corrreplwith
        		null, //separator
        		null,
        		null,
        		null,
        		null,
        		null,
        		null,
        		megaBulkCheck //function delegate
      			)     
    		}				
		if (GM_getValue("Check_cloudzer_dot_net_links", false))
    		{
      			addHost(
        		"cloudzer,clz",
        		'(?:cloudzer\\.net\/(?:file|\\d+)|clz\\.to)\/\\w+',
        		"//a[contains(@href,'cloudzer.net/') or contains(@href,'clz.to/')]",
        		100000,
        		null,
        		null,
        		null,
       			null,
        		null,
        		null,
        		null,
        		null,
        		null,
        		null,
        		cloudzerBulkCheck
      			)
    		}
/////////////////////////////////////
		if (GM_getValue("Check_billionuploads_dot_com_links", false))
		{	
			addHost(
				"billionuploads,BillionUploads", //hostname
				"(?:billionuploads|BillionUploads)\\.com\/\\w+", //linkregex
				"//a[contains(@href,'billionuploads.com/') or contains(@href,'BillionUploads.com/')]", //xpath
				null, //blocksize
				/(http:\/\/(?:|www\.|(?:new|old)\.)billionuploads\.com\/\w+)/i, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://billionuploads.com/checkfiles.html", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/billionuploads\.com\/(\w+)/i, //linkregex
				/green'>http:\/\/(?:|www\.)billionuploads\.com\/\w+.*?<\/td><td style="color:green;">/g, //liveregex
				/red'>http:\/\/(?:|www\.)billionuploads\.com\/\w+.*?<\/td><td style="color:red;">/g, //deadregex
				/orange'>http:\/\/(?:|www\.)billionuploads\.com\/\w+.*?<\/td><td style="color:orange;">/g, //unavaregex
				null //function delegate
			)

			addHost(
				"billionuploads,BillionUploads", //hostname
				"(?:billionuploads|BillionUploads)\\.com\/\\w+", //linkregex
				"//a[contains(@href,'billionuploads.com/') or contains(@href,'BillionUploads.com/')]", //xpath
				null, //blocksize
				/(http:\/\/(?:|www\.|(?:new|old)\.)billionuploads\.com\/\w+)/i, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://billionuploads.com/checkfiles.html", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/billionuploads\.com\/(\w+)/i, //linkregex
				/green'>http:\/\/(?:|www\.)billionuploads\.com\/\w+/gi, //liveregex
				/red'>http:\/\/(?:|www\.)billionuploads\.com\/\w+/gi, //deadregex
				/orange'>http:\/\/(?:|www\.)billionuploads\.com\/\w+/gi, //unavaregex
				null //function delegate
			)				
		}		
		if (GM_getValue("Check_movreel_dot_com_links", false))
		{	
			addHost(
				"movreel", //hostname
				"movreel\\.com\/\\w+", //linkregex
				"//a[contains(@href,'movreel.com/')]", //xpath
				null, //blocksize
				/(http:\/\/(?:|www\.)movreel\.com\/\w+)/i, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://movreel.com/?op=checkfiles", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/movreel\.com\/(\w+)/i, //linkregex
				/movreel\.com\/\w+.*?<\/td><td style="color:green;">/gi, //liveregex
				/movreel\.com\/\w+.*?<\/td><td style="color:red;">/gi, //deadregex
				/movreel\.com\/\w+.*?<\/td><td style="color:orange;">/gi, //unavaregex
				null //function delegate
			)				
		}
		if (GM_getValue("Check_vidx_dot_to_links", false))
		{	
			addHost(
				"vidx", //hostname
				"vidx\\.to\/\\w+", //linkregex
				"//a[contains(@href,'vidx.to/')]", //xpath
				null, //blocksize
				/(http:\/\/(?:|www\.)vidx\.to\/\w+)/i, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://vidx.to/?op=checkfiles", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/vidx\.to\/(\w+)/i, //linkregex
				/green'>http:\/\/(?:|www\.)vidx\.to\/\w+/gi, //liveregex
				/red'>http:\/\/(?:|www\.)vidx\.to\/\w+/gi, //deadregex
				/orange'>http:\/\/(?:|www\.)vidx\.to\/\w+/gi, //unavaregex
				null //function delegate
			)				
		}
		/////////////////////////////
		// Common function delegate to send links to get checked by host linkchecker
		/////////////////////////////
		// If you define a new delegate, you may use following properties
		// this.links 			[array] array of strings (link blocks). The links in each block separated with host.splitSeparator.
		// this.apiUrl			[string] API or web linkchecker URL
		// this.postData		[string] POSTDATA for POST request
		// this.resLiveRegex 	[regex] matches live substrings in the request response
		// this.resDeadRegex 	[regex] matches dead substrings in the request response
		// this.resUnavaRegex 	[regex] matches unava substrings in the request response (the regex is often null!)
		// 
		// this.resLinkRegex 	[regex] matches links further passed to DisplayTheCheckedLinks
		//////////////////////////////
		function genBulkCheck()
		{
			var blockIdx = this.links.length;
			
			while (blockIdx--)
			{
				postRequest(this.apiUrl, this.postData, this.links[blockIdx], 
					this.resLinkRegex, this.resLiveRegex, this.resDeadRegex, this.resUnavaRegex);
				
			}
			
			function postRequest(api, postData, links, linkRegex, liveRegex, deadRegex, unavaRegex)
			{
				GM_xmlhttpRequest(
				{
					method: 'POST',
					url: api,
					headers: {
						'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
						'Content-type': 'application/x-www-form-urlencoded',
						'Referer': api,
						'X-Requested-With': 'XMLHttpRequest'						
					},
					data: postData + encodeURIComponent(links),
					onload: function (result)
					{
						var res = result.responseText;
						
						// GM_log(res);
						
						var i;

						var livelinks = res.match(liveRegex);
						var deadlinks = res.match(deadRegex);						
						
						// GM_log(livelinks);
						// GM_log(deadlinks);
						
						if (livelinks != null)
						{
							i = livelinks.length - 1;
							do
							{
								livelinks[i] = livelinks[i].match(linkRegex)[1];
							}
							while (i--);
							DisplayTheCheckedLinks(livelinks, 'alive_link');
						}

						if (deadlinks != null)
						{
							i = deadlinks.length - 1;
							do
							{
								deadlinks[i] = deadlinks[i].match(linkRegex)[1];
							}
							while (i--);
							DisplayTheCheckedLinks(deadlinks, 'adead_link');
						}

						if (unavaRegex != null)
						{
							var unavalinks = res.match(unavaRegex);
							if (unavalinks)
							{
								i = unavalinks.length - 1;
								do
								{
									unavalinks[i] = unavalinks[i].match(linkRegex)[1];
								}
								while (i--);
								DisplayTheCheckedLinks(unavalinks, 'unava_link');
							}
						}
					}
				});
				
			}
		}
		//specialized bulkchecking handlers follow
		function netloadBulkCheck()
		{
			var blockIdx = this.links.length;

			while (blockIdx--)
			{
				postRequest(this.apiUrl, this.postData, this.links[blockIdx], 
					this.resLinkRegex, this.resLiveRegex, this.resDeadRegex, this.unavaRegex);			
				
			}
			
			function postRequest(api, postData, links, linkRegex, liveRegex, deadRegex, unavaRegex)
			{
				GM_xmlhttpRequest(
				{
					method: 'POST',
					url: api,
					headers: {
						'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
						'Content-type': 'application/x-www-form-urlencoded',
						'Referer': ""						
					},
					data: postData + encodeURIComponent(links),
					onload: function (result)
					{
						var res = result.responseText;
						var i;
						var livelinks = res.match(liveRegex);
						var deadlinks = res.match(deadRegex);
						
						
						if (livelinks != null)
						{
							i = livelinks.length - 1;
							do
							{
								recheckLink(livelinks[i].match(linkRegex)[1]);
							}
							while(i--);
						}

						if (deadlinks != null)
						{
							i = deadlinks.length - 1;
							do
							{
								deadlinks[i] = deadlinks[i].match(linkRegex)[1];
							}
							while (i--);
							DisplayTheCheckedLinks(deadlinks, 'adead_link');
						}
					}
				});				
			}
			
			function recheckLink(link)
			{
				var link = link;
				
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://netload.in/datei' + link + '.htm',
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
						'Accept-Charset': 'windows-1250,utf-8;q=0.7,*;q=0.7',
						'Referer': ""
					},
					onload: function (result)
					{
						var res = result.responseText;

						if (res.match(/dl_first_file_download">|download_limit\.gif/))
						{
							DisplayTheCheckedLinks([link], 'alive_link');
							return;
						}

						if (res.match(/achtung\.jpg"/))
						{
							DisplayTheCheckedLinks([link], 'adead_link');
						}
					},
					onerror: function ()
					{
						displayTheCheckedLink(link, 'unava_link');
					}
				});
			}
		}
		
		function rapidshareBulkCheck()
		{
			var rsBlock = this.links.length - 1;

			do 
			{
				var LinksTodo = this.links[rsBlock].split("\n");

				if (LinksTodo.length < 1)
				{
					return false;
				}

				var fileids = "";
				var filenames = "";

				for (x in LinksTodo)
				{
					var eintrag = LinksTodo[x];
					var logregex = /files\/(\d{5,})\/(\S*)/;
					var teile = logregex.exec(eintrag);

					if ((null != teile) && (null != teile[1]) && (null != teile[2]) && (teile[1] != '') && (teile[2] != ''))
					{
						fileids += "," + teile[1];
						filenames += "," + teile[2];
					}
				}
				fileids = fileids.substr(1);
				filenames = filenames.substr(1);
				filenames = filenames.replace(/\&/g, '%26');
				
				var apirapidshareurl = "https://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=checkfiles&files=" + fileids + "&filenames=" + filenames + "&cbf=RSAPIDispatcher&cbid=3";
				
				GM_xmlhttpRequest(
				{
					method: "GET",
					url: apirapidshareurl,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Content-type': 'text/html',
						'Referer': ""						
					},
					onload: function (result)
					{
						var res = result.responseText;					
						res = res.replace(/\\n/g, "\n");
						var i;
						var rsRegex = /(fileid|\d{5,}),/;
						var livelinks = res.match(/\d{5,},.*?,\d+,\w*,(?:1|3|51),/g);
						var deadlinks = res.match(/\d{5,},.*?,\d+,\w*,(?:0|4|5|59),/g)

						if (deadlinks)
						{
							i = deadlinks.length - 1;
							do
							{
								deadlinks[i] = deadlinks[i].match(rsRegex)[1];
							}
							while (i--);

							DisplayTheCheckedLinks(deadlinks, 'adead_link');
						}
						if (livelinks)
						{
							i = livelinks.length - 1;
							do
							{
								livelinks[i] = livelinks[i].match(rsRegex)[1];
							}
							while (i--);
							DisplayTheCheckedLinks(livelinks, 'alive_link');
						}
					}
				});
			}
			while (rsBlock--);
		}
		
		function hotfileBulkCheck()
		{
			var blockIdx = this.links.length;
			
			while (blockIdx--)
			{
				var arr = this.links[blockIdx].split("\n");
				var i = arr.length;
				var tokens;
				var ids = new Array();
				var keys = new Array();
				
				while (i--)
				{
					tokens = arr[i].match(/hotfile\.com\/dl\/(\d+)\/(\w+)/);
					
					if (tokens)
					{
						ids.push(tokens[1]);
						keys.push(tokens[2]);
					}
				}
				//submit urlencoded links to get checked by linkchecking service
				GM_xmlhttpRequest(
				{
					method: 'POST',
					url: this.apiUrl,
					headers: {
						'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
						'Content-type': 'application/x-www-form-urlencoded',
						'Referer': ""
					},
					data: 'ids=' + ids.join(',') + '&keys=' + keys.join(','),
					onload: function (result)
					{
						var res = result.responseText;
						var i;
						var livelinks = res.match(/\d+,[12],/g);
						var deadlinks = res.match(/\d+,0,/g);

						if (livelinks != null)
						{
							i = livelinks.length - 1;
							do
							{
								livelinks[i] = livelinks[i].match(/\d+/);
							}
							while (i--);
							DisplayTheCheckedLinks(livelinks, 'alive_link');
						}

						if (deadlinks != null)
						{
							i = deadlinks.length - 1;
							do
							{
								deadlinks[i] = deadlinks[i].match(/\d+/);
							}
							while (i--);
							DisplayTheCheckedLinks(deadlinks, 'adead_link');
						}
					}
				});
			}
		}

		function linksaveBulkCheck()
		{
			var arr = this.links[0].split("\r\n");
			var i = arr.length;
			
			while(i--)
			{	
				postRequest(arr[i]);				
			}
			
			function postRequest(lsLink)
			{
				GM_xmlhttpRequest(
					{
						method: "GET",
						url: lsLink + '-t.jpg',
						headers: {
							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
							'Accept': 'text/xml',
							'Referer': ""
						},
						onload: function (result)
						{
							var imgLen = result.responseHeaders.match(/Content-Length: (\d+)/)[1];
							
							if (imgLen == 965) //online
							{
								DisplayTheCheckedLinks([lsLink], 'alive_link');
							}

							if (imgLen == 972) //offline
							{
								DisplayTheCheckedLinks([lsLink], 'adead_link');
							}
							
							if (imgLen == 978) //unava
							{
								DisplayTheCheckedLinks([lsLink], 'unava_link');
							}
						}
					});
			}

		}
		
		function linkcryptBulkCheck()
		{
			var arr = this.links[0].split("\r\n");
			var i = arr.length;
			
			while(i--)
			{	
				postRequest(arr[i]);				
			}
			
			function postRequest(lcLink)
			{
				GM_xmlhttpRequest(
				{
					method: "GET",
					url: 'http://linkcrypt.ws/api.html?api=status_V1&folderKey=' + lcLink.match(/dir\/(\w+)/)[1],
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'text/xml',
						'Referer': ""
					},
					onload: function (result)
					{
						var res = result.responseText;
						
						if (res.match(/<errorCode>1101|folderStatus>[23]/)) //Offline status
						{
							DisplayTheCheckedLinks([lcLink], 'adead_link');
							return;
						}
						
						if (res.match(/folderStatus>1/)) //Online status
						{
							DisplayTheCheckedLinks([lcLink], 'alive_link');
						}
						else
						{
							DisplayTheCheckedLinks([lcLink], 'unava_link');
						}
					}
				});
			}
		}
		
		function depositfilesBulkCheck()
		{
			var arr = this.links[0].split("\r\n");
			var i = arr.length;
			
			while(i--)
			{	
				postRequest(arr[i]);				
			}
			
			function postRequest(dfLink)
			{		
				var id = dfLink.match(/depositfiles\.com\/(?:en\/|ru\/|de\/|es\/|pt\/|)files\/(\w+)/)[1];
				
				GM_xmlhttpRequest(
				{
					method: "POST",
					url: 'http://depositfiles.com/api/get_download_info.php?id=' + id + "&format=json",
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Content-Type': 'application/x-www-form-urlencoded',
						'Referer': ""
					},
					onload: function (result)
					{
						var res = result.responseText;
						
						if (res.match(/"(?:no_file|file_ban)"/))
						{
							DisplayTheCheckedLinks(["files/" + id], 'adead_link');
							return;
						}

						if (res.match('"download_li(?:nk|mit)|password_check"'))
						{
							DisplayTheCheckedLinks(["files/" + id], 'alive_link');
						}
					}
				});
			}
		}
		function megashareBulkCheck()
		{
			var arr = this.links[0].split("\r\n");
			var i = arr.length;
			
			while(i--)
			{	
				postRequest(arr[i]);				
			}
			
			function postRequest(msLink)
			{
				GM_xmlhttpRequest(
				{
					method: "GET",
					url: msLink,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Content-Type': 'application/x-www-form-urlencoded',
						'Referer': ""
					},
					onload: function (result)
					{
						var prZVal = result.responseText.match(/name="(\d+prZVal)" value="(\d+)">/);
						var btn3Name = result.responseText.match(/src="images\/dwn-btn3\.gif" name="(.+?)"/);
						
						if ((prZVal == null) || (btn3Name == null))
						{
							return;
						}						
						
						GM_xmlhttpRequest(
						{
							method: "POST",
							url: msLink,
							headers: {
								'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
								'Content-Type': 'application/x-www-form-urlencoded',
								'Referer': ""
							},
							data: prZVal[1] + "=" + prZVal[2] + '&' + btn3Name[1] + '.x=1&' + btn3Name[1] + '.y=1',
							onload: function (result)
							{
								var res = result.responseText;							
							
								if (res.match(/<div id="err">/))
								{
									DisplayTheCheckedLinks([msLink.match(/\.com(\/\d+)/)[1]], 'adead_link');
								}
								else
								{
									DisplayTheCheckedLinks([msLink.match(/\.com(\/\d+)/)[1]], 'alive_link');
								}
							}
						});
					}
				});
			}
		}
		
		function sharerapidBulkCheck()
		{
			var blockIdx = this.links.length;
			while (blockIdx--)
			{
				processSharerapidBlock(this.links[blockIdx]);
			}

			function processSharerapidBlock(linksBlock)
			{
				//submit urlencoded links to get checked by linkchecking service
				GM_xmlhttpRequest(
				{
					method: 'POST',
					url: 'http://share-rapid.com/checkfiles.php',
					headers: {
						'User-agent': 'share-rapid downloader',
						'Content-type': 'multipart/form-data; boundary=--------102411171045063',
						'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
						'Referer': ""
					},
					data: '----------102411171045063\r\nContent-Disposition: form-data; name="files"\r\n\r\n' + linksBlock + '\r\n----------102411171045063--',
					onload: function (result)
					{
						var res = result.responseText.replace(/\\\//g, '/');
						var linksArray = linksBlock.split('\r\n');
						var liveRegex = /error":false}/;
						var deadRegex = /error":true,"msg":"Not/;
						var unavaRegex = /error":true,"msg":"Service/;
						var entryRegex = /{"error.+}/g;
						var livelinks = new Array();
						var deadlinks = new Array();
						var unavalinks = new Array();
						var entries = res.match(entryRegex);
						var entriesLen = entries.length;

						for(var entryIdx = 0; entryIdx < entriesLen; entryIdx++)
						{
							if (entries[entryIdx].match('error":false') != null)
							{
								livelinks.push(linksArray[entryIdx]);
								continue;
							}

							if (entries[entryIdx].match('error":true,"msg":"Not') != null)
							{
								deadlinks.push(linksArray[entryIdx]);
								continue;
							}

							if (entries[entryIdx].match('error":true,"msg":"Service') != null)
							{
								unavalinks.push(linksArray[entryIdx]);
							}
						}

						if (livelinks.length > 0)
						{
							DisplayTheCheckedLinks(livelinks, 'alive_link');
						}

						if (deadlinks.length > 0)
						{
							DisplayTheCheckedLinks(deadlinks, 'adead_link');
						}

						if (unavalinks.length > 0)
						{
							DisplayTheCheckedLinks(unavalinks, 'unava_link');
						}

					}
				});
			}
		}
		
		function ncryptBulkCheck()
		{
			var arr = this.links[0].split("\r\n");
			var i = arr.length;
			
			while(i--)
			{	
				postRequest(arr[i]);				
			}
			
			function postRequest(ncryptLink)
			{		
				GM_xmlhttpRequest(
				{
					method: "POST",
					url: 'http://ncrypt.in/api_status.php',
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Content-Type': 'application/x-www-form-urlencoded',
						'Referer': ""
					},
					data: 'link=' + encodeURI(ncryptLink),
					onload: function (result)
					{
						var foldStatus = result.responseText.match(/(?:offline|online);/);
												
						switch(foldStatus + ""){
						case "offline;": 	DisplayTheCheckedLinks([ncryptLink], 'adead_link'); break;
						case "online;": 	DisplayTheCheckedLinks([ncryptLink], 'alive_link'); break;
						default: 			DisplayTheCheckedLinks([ncryptLink], 'unava_link');
						}
					}
				});
			}
		}
		
		function hellshareBulkCheck()
		{
			var links = this.links;
			
			GM_xmlhttpRequest(
			{
				method: "GET",
				url: 'http://www.hellshare.com',
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'text/xml',
					'Referer': ""
				},
				onload: function (result)
				{
					var domain = result.responseText.match(/param_rau = "www\.hellshare\.(\w+)"/)[1];
					var loc = 'check=Zkontrolovat+dostupnost+soubor%C5%AF&links=';

					if (domain == 'sk')
						loc = 'check=Skontrolova%C5%A5&links=';
					if (domain == 'com')
						loc = 'check=Check+availability&links=';
					if (domain == 'hu')
						loc = 'check=Kontrol%C3%A1lj&links=';
					if (domain == 'pl')
						loc = 'check=Sprawd%C5%BC+dost%C4%99pno%C5%9B%C4%87+plik%C3%B3w&links=';

						
					genBulkCheck.call({ 	links:			links,
											apiUrl: 		'http://www.hellshare.' + domain + '/linkchecker?do=linkChecker-linkcheckerform-submit', 
											postData: 		loc, 
											resLinkRegex:	/hellshare\.(?:cz|com|sk|hu|pl)\/(?:[\w-\.]+\/|)([\w-\.]+\/\d{5,})/, 
											resLiveRegex:	/OK" style="width:21px;height:20px;margin-right:10px;" \/><a href="http:\/\/download\.hellshare\.(?:cz|com|sk|hu|pl)\/(?:[\w-\.]+\/|)[\w-\.]+\/\d{5,}/g, 
											resDeadRegex:	/<span style="color:gray">.*?<\/span> - <strong>/g, 
											resUnavaRegex: 	null
							});
				}
			});
		}
// Thanks  thecodingdude/WARBB //
		function megaBulkCheck()
    		{
      			var arr = this.links[0].split("\r\n");
      			var i = arr.length;
      			var seqno = Math.floor(Math.random()*1000000000);
      
      			while(i--)
      			{ 
        			postRequest(arr[i]);        
      			}
      
      			function postRequest(megaLink)
      			{   
        			var id = megaLink.match(/mega\.co\.nz\/#!(\w+)(?:!\w+)?/)[1];
    
        			GM_xmlhttpRequest(
        			{
          				method: "POST",
          				url: 'https://g.api.mega.co.nz/cs?id=' + seqno++,
          				data: '[{"a":"g","p":"' + id + '","ssl": "1"}]',
         				headers: {
            				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            				'Content-Type': 'application/xml',
            				'Referer': ""
          			},
          			onload: function (result)
          			{
            				var res = $.parseJSON(result.responseText.match(/\[(.+?)\]/)[1]);
            
            				if ((typeof res == "number" && (res == -9 || res == -16 || res == -6)) || res.d) {
              					DisplayTheCheckedLinks([id], 'adead_link');
           				} else if (res.at) {
              					DisplayTheCheckedLinks([id], 'alive_link');
            				} else if (res.e == "ETEMPUNAVAIL") {
              					DisplayTheCheckedLinks([id], 'unava_link');
            				} 
          				}
        			});
      			}
		}
		function cloudzerBulkCheck()
    		{
      			var arr = this.links[0].split("\r\n");
      			var data = "apikey=mai1EN4Zieghey1QueGie7fei4eeh5ne";
      
      			for (var i=0;i<arr.length;i++)
      			{
       				 try {
          				arr[i] = arr[i].match(/https?:\/\/(?:www\.)?(?:cloudzer\.net|clz\.to)\/(?:file\/)?(\w+)/)[1];
        		} catch(e) {
          			console.log("Error in checking Cloudzer: ", arr[i]);
        		}
        			data += "&id_"+i+"="+arr[i];
      			}
      
      			GM_xmlhttpRequest(
        		{
          			method: "POST",
          			url: "http://cloudzer.net/api/filemultiple",
          			data: data,
          			headers: {
            			'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
            			'Content-type': 'application/x-www-form-urlencoded',
            			'Referer': ""
          		},
          			onload: function (result)
          		{
            			var res = result.responseText;
            			//console.log(res);
            
            			var i;
            
            			var livelinks = res.match(/online,\w+,/g);
            			var deadlinks = res.match(/offline,\w+,/g);
            
            		if (livelinks)
            		{
              			var i = livelinks.length - 1;
              			do
              		{
                		livelinks[i] = livelinks[i].match(/,(\w+),/)[1];
              		}
              			while (i--);
              				DisplayTheCheckedLinks(livelinks, 'alive_link');
            		}
            
            		if (deadlinks)
            		{
              			var i = deadlinks.length - 1;
              			do
              		{
                		deadlinks[i] = deadlinks[i].match(/,(\w+),/)[1];
              		}
              			while (i--);
              			DisplayTheCheckedLinks(deadlinks, 'adead_link');
            			}
          		}
        		});
    		}	
/////////////////////////////////
		/**
		 * Displays check result
		 * @param {Array} Array of links or link fragments.
		 * @param {String} Check result status -> ['alive_link'|'adead_link'|'unava_link']
		 */
		function DisplayTheCheckedLinks(links, resultStatus)
		{
			//(a[href*=link_1], a[href*=link_2], ..., a[href*=link_n])
			var $links = $('a[href*="' + links.join('"], a[href*="') + '"]');
			
			if (Do_not_linkify_DL_links)
			{	//TODO into separate jQuery function
				$links.replaceWith(function(){
					return '<span href="' + this.href + '">' + $(this).text() + '</span>';
				});
				
				$links = $('span[href*="' + links.join('"], span[href*="') + '"]');
			}
			
			$links.removeClass().addClass(resultStatus);
			$links.each(function() {
				this.href = $(this).attr("href");
			});
			
			switch(resultStatus)
			{
				case "alive_link": 	cLinksAlive += $links.length; break;
				case "adead_link": 	cLinksDead += $links.length; break;
				case "unava_link": 	cLinksUnava += $links.length; break;
				default: 
			}		
			
			cLinksProcessed += $links.length;
		}
	}
	
	// starts bulkchecking
	// params
	// filterId 	[string] restricts link detection with passed id attribute
	function startBulkCheck(filterId)
	{
		var cHosts = bulkHosts.length;
		
		if (cHosts == 0) //no filehostings selected
			return;		
		
		// STEP 1 linkify the links
		var linkifyRegex = '';
		var hostIdx = cHosts;
		while(hostIdx--)
		{
			linkifyRegex += bulkHosts[hostIdx].linkRegex + "|";
		}
		linkifyRegex = linkifyRegex.replace(/\|$/, '');
		linkify(linkifyRegex);
		//		
		
		//STEP 2 detect link objects
		var xpathAll = '';
		
		var hostIdx = cHosts;
		while(hostIdx--)
		{
			xpathAll += bulkHosts[hostIdx].xpath + "|";
		}	
		
		xpathAll = xpathAll.replace(/\]\|\/\/a\[/g, " or ");
		xpathAll = xpathAll.replace(/\]\|/, ')]');
				
		if (filterId != null) //insert id restriction in the xpath
		{
			xpathAll = xpathAll.replace(/\[/, "[@class='" + filterId + "' and (");
		}			
		else
		{
			xpathAll = xpathAll.replace(/\[/, "[((not(@class)) or (@class!='alive_link' and @class!='adead_link' and @class!='unava_link')) and (");
		}
		
		// GM_log(filterId);
		// GM_log(xpathAll);
		
		var links = document.evaluate(xpathAll, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		if (filterId == null)
		{
			cLinksTotal += links.snapshotLength;
		}		
		//
		
		//STEP 3 bind links with hostings 
		var linkIdx = links.snapshotLength;
		var href = null;
		
		if (linkIdx == 0) // no links found
			return;
		
		var name;
		while (linkIdx--)
		{
			href = links.snapshotItem(linkIdx).href; 
			
			try // DO NOT REMOVE, filters crap that went through xpath detection
			{
				name = gimmeHostName(href);
				if (href.match(bulkHostNames[name].linkRegexObject) != null)
					bulkHostNames[name].links.push(href);
			}
			catch(e)
			{
				// GM_log(href);
				// GM_log(gimmeHostName(href));
				// GM_log(e.message);
			}
		}
		//
		
		
		//STEP 4 process the links for each filehosting
		var hostIdx = cHosts;
		var host;
		var m,n;
		var arr;
				
		while (hostIdx--)
		{
			host = bulkHosts[hostIdx];
			arr = host.links;
			
			if (arr.length == 0) //no links for this hosting, skip
			{
				continue;
			}
			
			//links match corrections
			if (host.corrMatch != null)
			{
				var idx = arr.length;
				while (idx--)
				{
					arr[idx] = arr[idx].match(host.corrMatch)[1];					
				}
			}
			
			//links replace corrections
			if ((host.corrReplWhat != null) && (host.corrReplWith != null))
			{
				var idx = arr.length;
				while (idx--)
				{
					arr[idx] = arr[idx].replace(host.corrReplWhat, host.corrReplWith);
				}
			}			
			
			m = arr.length;
			n = host.blockSize;
			if (m > n)
			{
				//insert block separators (RAND_STRING) into the array
				for(var i = n; i < m; i += n + 1)
				{
					arr.splice(i, 0, RAND_STRING);
				}
			}	
			
			// GM_log(arr.join(host.splitSeparator).split(RAND_STRING));
			// GM_log(host.func.toString());
			
			host.func.call({ 	links:			arr.join(host.splitSeparator).split(RAND_STRING),
								apiUrl: 		host.apiUrl, 
								postData: 		host.postData, 
								resLinkRegex:	host.resLinkRegex, 
								resLiveRegex:	host.resLiveRegex, 
								resDeadRegex:	host.resDeadRegex, 
								resUnavaRegex: 	host.resUnavaRegex
							});		
			
			
			//clean up
			arr.length = 0;							
		}		
		//	

		function gimmeHostName(link)
		{
			return link.replace(/https?:\/\/.*?http(s)?:\/\//, "http$1://").match(/https?:\/\/(?:www\.|[\w\.])*?([\w-]+)\.(?:co\.(?:uk|nz)|\w+)\//)[1];
		}
		
	}
	
	
	function checkLinks(filterId)
	{
		startBulkCheck(filterId);
		start(filterId);
	}

	function check_all_links()
	{
		add_WARLC_style();

		startBulkCheck(null);
		start(null);
		
	}

	function toggle_autocheck()
	{
		var currentState = GM_getValue("Autocheck", false);
		GM_setValue("Autocheck", !currentState);

		if (currentState == true)
		{
			sendMessage('Autocheck disabled', 'red');
		}
		else
		{
			sendMessage('Autocheck enabled', 'SpringGreen');
		}
	}

	function KeyDownHandler(event)
	{
		var kcode = (event.keyCode) ? event.keyCode : event.which;
		if (event.ctrlKey && event.altKey)
		{
			switch(kcode)
			{
				case 65 : check_all_links(); break;
				case 67 : configuration(); break;
				case 87 : toggle_autocheck(); break;			
			}
		}
	}

	//   SCRIPT EXECUTION START POINT
	
	// Safari specific GM_getResourceText override
	if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) 
	{
		GM_getResourceText = function(res) {
			var $cssText = GM_getValue("jquery_css", "");
			
			if ($cssText == "")
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css',
					onload: function (result)
					{
						GM_setValue("jquery_css", result.responseText);
						window.location.reload();
					}
				});
			}
			else
			{
				return $cssText;
			}	
		}
	}
	
	var jQueryUICSS = GM_getResourceText("jQueryUICSS");
	GM_addStyle(jQueryUICSS);
	
	//init the stuff
	setVariables();
	initBulkCheck();
	
	//init info boxes
	messageBox.style.position = 'fixed';
	messageBox.style.top = '20px';
	messageBox.style.left = '10px';
	messageBox.style.opacity = '0.85';
	messageBox.style.background = 'DimGray';
	messageBox.style.fontSize = '10px';
	document.body.appendChild(messageBox);

	//register GM menu commands & keyboard shortcut event handler
	if (Keyboard_functions)
	{
		$(document).keydown(KeyDownHandler);
		GM_registerMenuCommand("[DF Link Checker] Configuration  (" + first_key_keycodename + "+" + second_key_keycodename + "+" + String.fromCharCode(CONFIGURATION_KEYCODE) + ")", configuration);
		GM_registerMenuCommand("[DF Link Checker] Check The Links In This Page (" + first_key_keycodename + "+" + second_key_keycodename + "+" + String.fromCharCode(CHECK_ALL_LINKS_KEYCODE) + ")", check_all_links);
	}
	else
	{
		GM_registerMenuCommand("[DF Link Checker] Configuration", configuration);
		GM_registerMenuCommand("[DF Link Checker] Check The Links In This Page", check_all_links);
	}

	//start linkchecking
	if (Autocheck)
	{
		$(document).ready(check_all_links);
	}

	//   SCRIPT EXECUTION END POINT

	//shows configuration box
	function configuration()
	{
		//prevent multiple creating of config window
		if ($("#hideshow").length)
		{
			$("#hideshow").show();
			return;
		}

		var configcss = '\
		.popup_block .popup fieldset{\
		   padding: 1%;\
		   border-style: solid;\
		   border-width: 1px;\
		   border-color: gray;\
		   margin-bottom: 1px;\
		}\
		#h3hideshowtitle{\
		 font-size: 2em;\
		}\
		#h3hideshow{\
		 font-size: 1.5em;\
		}\
		#imghideshow {\
		 border: none;\
		}\
		#hideshow {\
		 position: fixed;\
		 width: 100%;\
		 height: 100%;\
		 top: 0;\
		 left: 0;\
		 font-size:12px;\
		 z-index:2147483645;\
		 text-align:left;\
		}\
		#fade {\
		 background: #000;\
		 position: fixed;\
		 width: 100%;\
		 height: 100%;\
		 opacity: .80;\
		 -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";\
		 left: 0;\
		 z-index: 10;\
		}\
		.popup_block {\
		 font-family:verdana;\
		 color:black;\
		 background: #ddd;\
		 padding: 10px 20px;\
		 border: 2px solid DarkOrange;\
		 float: left;\
		 width: 700px;\
		 position: absolute;\
		 top: 7%;\
		 left: 50%;\
		 bottom: 7%;\
		 margin: 0 0 0 -350px;\
		 -moz-border-radius:10px;\
		 z-index: 100;\
		\
		}\
		.popup_block .popup {\
		 float: left;\
		 width: 100%;\
		 background: #fff;\
		 margin: 10px 0;\
		 padding: 0px 0 0px;\
		 border-left: 1px solid #bbb;\
		 border-top: 1px solid #bbb;\
		 border-right: 1px solid #bbb;\
		}\
		#h3hideshow{\
		 margin: 1px 0 0px;\
		 padding: 1px 10px;\
		 border-bottom: 1px solid #bbb;\
		 font-size: 1.5em;\
		 font-weight: normal;\
		 cursor:pointer;\
		 background:#DDDDDD none repeat scroll 0 0;\
		}\
		#h3hideshow:hover{\
		background:#C0BEBE none repeat scroll 0 0;\
		}\
		#h3hideshowtitle{\
		 margin: 2px 0 0px;\
		 padding: 7px 10px;\
		 border-bottom: 1px solid #bbb;\
		 font-size: 1.5em;\
		 font-weight: normal;\
		}\
		.popup_block .popup a {\
		 color:DarkSkyBlue;\
		 text-decoration:none;\
		}\
		.popup p {\
		 padding: 1px 10px;\
		 margin: 0px 0;\
		 -x-system-font:none;\
		 font-family:verdana,geneva,lucida,"lucida grande",arial,helvetica,sans-serif;\
		 font-size:10pt;\
		 font-size-adjust:none;\
		 font-stretch:normal;\
		 font-style:normal;\
		 font-variant:normal;\
		 font-weight:normal;\
		 line-height:normal;\
		}\
		#sites {\
		 padding: 1px 10px;\
		 margin: 0px 0;display:inline-block;width:16em;\
		}\
		.popup img.cntrl {\
		 position: absolute;\
		 right: -15px;\
		 top: -15px;\
		}\
		#note {\
			font-size:7pt;\
			color:gray;\
			padding: 1px 10px;\
			margin: 0px 0;display:inline-block;\
			min-width:100px;\
		}\
		#configinfo {\
			font-size:8pt;\
			color:gray;\
			padding: 1px 10px;\
			margin: 0px 0;display:inline-block;width:60em;\
		}\
		#inputColorLive, #hostSearchBox, #inputColorDead, #inputColorTemp, #selectAllButton, #selectNoneButton, #invertButton {\
			color:black;\
			border-style: solid;\
			border-width: 1px;\
			border-color: gray;\
		}\
		#h3hideshowcontent {\
		min-height:220px;\
		max-height:220px;\
overflow:auto;\
		 display: none;\
		 padding: 10px 10px;\
		}\
		.warlc-ui-tab {\
		height:300px;\
		overflow:auto;\
		}\
		#warlcsitelist1 {\
		height:220px;\
		border-top: 1px solid #ddd;\
		padding-top: 5px;\
		overflow:auto;\
		}\
		input:hover+label {\
		background:#F1F77C;\
		font-size:110%;\
		}\
		';

		GM_addStyle(configcss);
		//close image and css taken from = http://www.sohtanaka.com/web-design/examples/css-popup    icon_close.png;
		var configurationinnerHTML = 
		'<div id="fade"></div>\
		<div class="popup_block">\
			<div class="popup">\
				<a href="#"><img id="imghideshow" title="Close" class="cntrl" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAfCAYAAAD0ma06AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAY1SURBVHjapFZbbFRVFN0zd6Yz08dMoUNf9EGxUItJK62I4AOJEYiQoqE+0OgHCiqG+PgQozH6ofyIJiYEMRqNJpggHySlrRM+hCAtajAUaGgEi9BBSilMO0PnfWeOa597bjt9AEVvsubOPWefs/br7H0sQgj6P4/FYrk9+WkSuoAHgCrgLvV9DLgMdID02rQZmfAmaAJaxS2edDr9s67rL7EB/9XCUuALoEl+pZJEvTAo8A9s6iVKxojKYWheAWxuIMr2GGKp1KHh4eF3vF4vW59me6ZD2Ajsle6LXify7SI68iNROIgtIKtpBvQEB5DI7iC6Zw3Rmi1EM0vlBsFg8OX8/PxvWQdFKm5E2KhiQ9R9iOjL17E6QFRUhAGQpFNjklYrhhT6YbndTtT8LtGjG+T0lStXNhcVFTGpnkE8jpAT4hdgNvm+Ivr+AyIHtM+Fu3Ss0RUZO8pqqos/NiDLblgcQO48/CzRpk/l9KlTp56oq6s7gL8JkzST0AespN9/Itq2Hu7xQnsbRFOcWSBKT50FVpMUHrBD/iKsXb+V6KmtFI/H/3Q6nZzdEZPU1PVFSXbtEoltz0Nzm2HRqleIvjsLa/9CoiSnBs99cwaym4lCYSRSHr4/REg64SBHTX9//2fqGNmVevJ5jn/0Xe+Rhd2SBVdGkInr3hizZI8fOibGg8fM5/EthgIJwxPJ7a/Jd05Ozn14uQEHGRGXsVtOIwHS2nbDlTOIYlHoMoUL9w0Q/GSA/0/KeXglFmEWsp/uIjp9FAbnzWttbV3H3ECWFWdnubTuSBulQ9AwDs2jcSPGby6evGn7sIGJzwuzDUViMekdAZ0jrXvlVGVl5RK8ctlKq6ZpHFSKdBzCwSVjQRILAzh3508TPe29dbl6ZibiB/lrQeWBGFmykGe/dcjpwsLCeuVWpw1ZWskFWO/rM45ZNGWkPXt0ZIR/iJbigHfeoOYuU9UsbmbtWI2x+i+acWSt8yShCiaJVFwq50zeZrsYmapAgz/KFCmzo2gqhk7WJ8SDCY+bomF2qdI2E3/cpKPwXKYs1qdAlozwnjlSJBaLcbVxyqRBlT8rB+fUkJuzGotEXB1TRvc02hfLKHk9btT6BCyPzJ0rpwcGBoLqHGpWVIMjsmLVPkTZhXgbMacUW3pGTB2z+4HA5fHjkE3EDELeYyaSJjx/qZzq6uq6pKJrsR4/flwSeh98mIbmVpET7khBU20qw+4GEbda1ndZyaTpLDLWOtnSchdZVj4pxw8fPuzPLOD2SCSylxvpr9u3C1GDylkClAM73xrrsnfiu4JErMCAqAIW0Nj8DsiWktBnGXJdr24QiURCTuXm5n4MnmZWmQm1EydOPMITg4ODom/VEiHKsGgOyQ14sSQvJhF2j8eoYhXGvPzGmqF7K0V3d7ckQ5XhHHkbeAyoNU9ODpqmvEp0dHSIQEOVsRhWjGSTuOq4OQJOMpQEWXS+RxzYs0cgGSUhCvgO7L+Jg6DKqLyHOGpra0tYgAV9Pp/oX1wnBLunXlnrgVXYfEAzEMzCmFsRLSIpG6opFa27d4twOCzJWlpa2Lr3lTsXAiUmIRcAN1z6Awuy7zs7O8WxjRtFvDDH2JhJG4ClCo1AtUGq59tEz9q1UlGTrK2t7QL2/ATYKJsDUTUwQzZgVAKrSrI89K+dxcXFzbiJUR/K3cmTJ2nWwYNUcfQoeS+cJcdwQGZeIjuHAmV30KWGBjq/YgUtWLiQqquryWazUXt7u3/16tX7IIYbF50D+vjWwUXGJLQYlxZZDdx+v//zsrKyZtnX0ONwcAnWUygUQhtMSELeGK2HCgoKqKSkhNDZ5fj+/fvPNTU1teDvBQW/IuMWEx29g6rkYSv5zlfu8Xgae3p6fGKaD1z4N0i/xtqPALR/WgssAuawK1XNto7eaZSVVhVPl6ruM9Baiuvr6+fBzRUul2sWxPKQWA5Yqg0NDekIwfXe3t4h3EfZ10PAVWXRIMBj16VlRvFLj7smTiB1qArPxPnKcrdqpE5VG0lVEC6EYdUIgsp9ITXGc0mzaU26CGeQampTp7I4W8GlXK/R2MUxoTaOZMAk0jNv4VNe9RXpRGK7IrIrD2QS6mrzpCKfSDRK8q8AAwCF/L1ktjcKFAAAAABJRU5ErkJggg%3D%3D"/></a>\
			<div id="h3hideshowtitle">&nbsp;DF Link Checker Configuration</div>\
			<div id="warlc-conf-tabs">\
				<ul>\
					<li><a href="#tabs-1">Filehostings</a></li>\
					<li><a href="#tabs-2">Settings</a></li>\
					<li><a href="#tabs-3">About</a></li>\
				</ul>\
				<div id="tabs-1" class="warlc-ui-tab">\
					<div class="warlc-ui-buttonset">\
						<input type="button" class="warlc-ui-select-all" value="Select All">\
						<input type="button" class="warlc-ui-select-none" value="Select None">\
						<input type="button" class="warlc-ui-select-invert" value="Invert">\
					</div><br>\
					<div>Search: <input type="textbox" id="hostSearchBox" value=""></div><br>\
					<div id="warlcsitelist1"><span>Empty</span></div>\
				</div>\
				<div id="tabs-2" class="warlc-ui-tab">\
					<div class="warlcsettings">\
					<fieldset>\
					<p><input type="checkbox" id="Keyboard_functions"> Enable keyboard shortcuts</p>\
					<div id="configinfo">' + first_key_keycodename + '+' + second_key_keycodename + '+' + CONFIGURATION_KEY + ' = Configuration <br/>' + first_key_keycodename + '+' + second_key_keycodename + '+' + CHECK_ALL_LINKS_KEY + ' = Check all the links' + '<br/>' + first_key_keycodename + '+' + second_key_keycodename + '+' + toggle_autocheck_key + ' = Autocheck ON/OFF' + '</div>\
					</fieldset>\
					<fieldset>\
					<p><input type="checkbox" id="Color_DL_links"> Color DL links</p>\
					<div id="sites"><label for="inputColorLive">Live links color</label><input type="text" id="inputColorLive" style="background:' + Live_links_color + ';" value="' + Live_links_color + '"></div>\
					<div id="sites"><label for="inputColorDead">Dead links color</label><input type="text" id="inputColorDead" style="background:' + Dead_links_color + ';" value="' + Dead_links_color + '"></div><br>\
					<div id="sites"><label for="inputColorTemp">Temp. unavailable</label><input type="text" id="inputColorTemp" style="background:' + Temp_unavailable_links_color + ';" value="' + Temp_unavailable_links_color + '"></div>\
					<br>\
					<div id="configinfo">For no color leave a field blank.<br>Standard HTML color names are supported. See <a href="http://www.w3schools.com/html/html_colornames.asp">w3schools.com</a> for more info.</div><br>\
					<p><input type="checkbox" id="Show_line_through_in_dead_links"> Show line through in dead links</p>\
					<p><input type="checkbox" id="Show_black_background_in_DL_links"> Show black background in links</p>\
					<p><input type="checkbox" id="Do_not_linkify_DL_links"> Do NOT linkify links</p>\
					<p><input type="checkbox" id="Allow_spaces_in_DL_links"> Allow spaces in links<br><div id="configinfo">Note: All links must end with a new line!</div></p>\
					<br>\
					</fieldset>\
					<fieldset>\
					<div id="sites"><input type="checkbox" id="Autocheck"> Autocheck</div><br><div id="configinfo">Script starts check automatically.</div><br>\
					</fieldset>\
					</div>\
				</div>\
				<div id="tabs-3" class="warlc-ui-tab">\
					<p><b>Author:</b><br>DF Dev Team</p>\
					<br />\
					<p><b>Currently supported:</b><br>\
					Filehostings: ' + allHostNames.length + '<br />\
					Obsolete sites: ' + allObsoleteNames.length + '<br /></p>\
					<br />\
					<p><b>Uses:</b><br></p>\
<p>dkitty\'s <a href="https://userscripts.org/scripts/show/101707">W.A.R. Links Checker</a>  (modified)</p>\
					<p>adam_3\'s <a href="http://userscripts.org/scripts/show/2254">Linkify ting</a> (modified)</p>\
					<p><a href="http://jquery.com/">jQuery</a> JavaScript Library</p>\
					<br />\
					<p><b>License: </b><br>GPL version 3 or any later version (<a href="http://www.gnu.org/copyleft/gpl.html">http://www.gnu.org/copyleft/gpl.html</a>)</p>\
				</div>\
			</div>\
		</div>\
		</div>';
		
		$('body').append('<div id="hideshow">' + configurationinnerHTML + '</div>');
		
		$("#warlc-conf-tabs").tabs({ fx: { opacity: 'toggle', duration: 'fast' } });
		
		$("#imghideshow").click(function(event){$("#hideshow").hide(); event.preventDefault();});
				
		var elmHostList = document.getElementById("warlcsitelist1");
		
		buildSettings();
		buildSitelist("", allHostNames, elmHostList);
			
		if (DEBUG_MODE)
		{
			//log all sites availability status
			diagSites();
		}
			
		//handler for checkbox state change
		function changeConfiguration(e)
		{
			var element = e.target;

			if (element.type == 'checkbox')
			{
				if (element.checked == 1)
				{
					GM_setValue(element.id, true);
				}
				else
				{
					GM_setValue(element.id, false);
				}

			}
			setVariables();
		}
		//Selects all filehosting checkboxes
		function selectAll()
		{
			$(":checkbox:visible:not(:checked)").prop("checked",true)
						 .each(function(index, element){GM_setValue(this.id, true)});
		}
		//Deselects all filehosting checkboxes
		function selectNone()
		{
			$(":checkbox:visible:checked").prop("checked",false)
						 .each(function(index, element){GM_setValue(this.id, false)});
		}
		//Inverts filehosting checkboxes selection
		function selectInvert()
		{
			var $checked = $(":checkbox:visible:checked");
			var $unchecked = $(":checkbox:visible:not(:checked)");
			
			$unchecked.prop("checked",true)
						 .each(function(index, element){GM_setValue(this.id, true)});
			$checked.prop("checked",false)
						 .each(function(index, element){GM_setValue(this.id, false)});
		}
		//Sets live links color
		function changeColorLive()
		{
			var inColorLive = document.getElementById("inputColorLive");
			inColorLive.style.background = inColorLive.value;
			GM_setValue("Live_links_color", inColorLive.value);
		}
		//Sets dead links color
		function changeColorDead()
		{
			var inColorDead = document.getElementById("inputColorDead");
			inColorDead.style.background = inColorDead.value;
			GM_setValue("Dead_links_color", inColorDead.value);
		}
		//Sets temp. unavailable links color
		function changeColorTemp()
		{
			var inColorTemp = document.getElementById("inputColorTemp");
			inColorTemp.style.background = inColorTemp.value;
			GM_setValue("Temp_unavailable_links_color", inColorTemp.value);
		}

		//Diagnose sites for availability
		function diagSites()
		{
			var boxes = document.getElementById("warlcsitelist1").getElementsByTagName("input");

			for (var i = 0, n = boxes.length - 1; i < n; i++)
			{
				if (boxes[i].type == "checkbox")
				{
					checkAvailability(boxes[i]);
				}
			}

			function checkAvailability(cbElm)
			{
				var cb = cbElm;				
				
				GM_xmlhttpRequest(
				{
					method: 'HEAD',
					url: 'http://' + cb.nextSibling.textContent.replace(' ', ''),
					headers: {
						'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
						'Accept': 'text/xml',
						'Referer': ""
					},
					onload: function (result)
					{
						if (result.status != 200)
						{
							GM_log(cb.nextSibling.textContent + ' --- status: [' + result.status + '] ' + result.statusText + ', final url: ' + result.finalUrl);
						}
					},
					onerror: function (result)
					{
						if (result.status != 200)
						{
							GM_log(cb.nextSibling.textContent + ' --- status: [' + result.status + '] ' + result.statusText + ', final url: ' + result.finalUrl);  
						}
					}
				});
			}
		}
		
		function buildSettings()
		{
			$(".warlcsettings :checkbox").each(function(){
				$(this).prop("checked", GM_getValue($(this).attr("id")))
					.click(function(e){
						GM_setValue($(this).attr("id"), $(this).prop("checked"));
						setVariables();
					});				
			})
		}
		//Dynamic build of host list
		//param search 		[string]	searches for hostnames matching search substring 
		//param siteNames 	[array]		array of site names
		//param targetNode 	[DOM Node]	where the list should be built
		//								first child node is replaced
		function buildSitelist(search, siteNames, targetNode)
		{
			var searchRegex = new RegExp("\\|?([\\w\\.-]*" + search.replace(/\./g,"\\.").replace(/-/g, "\\-") + "[\\w\\.-]*)\\|?", "i");
			
			var $targetNode = $(targetNode).empty();
			
			var searchedSite = "";
			$.each(siteNames, function(i, site){
				if (searchedSite = site.match(searchRegex))
				{
					var baseSite = site.replace(/\|.+/, ""); //filehosting main domain
					
					//ensuring backward compatibility with the rest of code, to be refactored later
					var oldRSLCvalue = "Check_" + baseSite.replace(/\|.+/, "").replace(/\./g,"_dot_").replace(/-/g, "_dash_") + "_links";
					//
										
					$targetNode.append('<input type="checkbox" id="' + oldRSLCvalue +'" />\
						<label for="' + oldRSLCvalue + '">' + searchedSite[1] + '</label>' +
						((searchedSite[1] != baseSite) ? ('<div id="note"> ( ~ ' + baseSite + ' )</div>') : (""))
						);
					
					$("#" + oldRSLCvalue).prop("checked", GM_getValue(oldRSLCvalue, false))
										.change(changeConfiguration);
										
					$targetNode.append('<br />');
				}
			});
			
			$targetNode.append("<hr>");
			
			//obsolete hosts checkbox
			$targetNode.append('<input type="checkbox" id="Obsolete_file_hosts" /><label for="Obsolete_file_hosts">Obsolete file hosts</label>');		
			$("#Obsolete_file_hosts").prop("checked", GM_getValue("Obsolete_file_hosts", false))
									.change(changeConfiguration);
			
			$targetNode.append('<br />');
			
			var foundName = "";
			$.each(allObsoleteNames, function(i, site){
				if (foundName = allObsoleteNames[i].match(searchRegex))
				{
					$targetNode.append('<div id="note">' + foundName[1] + '</div>');
				}
			})
		}
		
		var hostSearchBox = document.getElementById("hostSearchBox");
		hostSearchBox.addEventListener('keyup', function(){buildSitelist(hostSearchBox.value, allHostNames, elmHostList);}, false);		
				
		$(".warlc-ui-select-all").click(selectAll).button();
		$(".warlc-ui-select-none").click(selectNone).button();
		$(".warlc-ui-select-invert").click(selectInvert).button();
		$(".warlc-ui-buttonset").buttonset();
		
		var inColorLive = document.getElementById("inputColorLive");
		inColorLive.addEventListener('keyup', changeColorLive, false);
		var inColorDead = document.getElementById("inputColorDead");
		inColorDead.addEventListener('keyup', changeColorDead, false);
		var inColorTemp = document.getElementById("inputColorTemp");
		inColorTemp.addEventListener('keyup', changeColorTemp, false);
		
	}

//begin standard link checking algorithm
function start(filterId)
{
	var doNotLinkify = Do_not_linkify_DL_links;

	// USER SELECTED FILE HOSTS INITIALIZATION START
	var http_file_hosts = new Array(); //standard hostings
	var http_file_hosts_obsolete = new Array(); //dead hostings

	initFileHosts();
	// USER SELECTED FILE HOSTS INITIALIZATION END

	// LINKIFICATION START
	var totalxpath = '';
	var totalxpathobsolete = '';
	var totalourls = '';

	var filehostLen = http_file_hosts.length;
	var filehostObsoleteLen = http_file_hosts_obsolete.length;

	var filehostIdx = filehostLen;
	var filehostObsoleteIdx = filehostObsoleteLen;

	if ((filehostIdx == 0) && (filehostObsoleteIdx == 0))
		return;

	while (filehostIdx--)
	{
		totalourls += http_file_hosts[filehostIdx][0] + '|';
		totalxpath += http_file_hosts[filehostIdx][4] + '|';
	}

	while (filehostObsoleteIdx--)
	{
		totalourls += http_file_hosts_obsolete[filehostObsoleteIdx][0] + '|';
		totalxpathobsolete += http_file_hosts_obsolete[filehostObsoleteIdx][1] + '|';
	}

	totalourls = totalourls.replace(/\|$/g, "");
	
	//TODO: further refactoring needed
	
	totalxpath = totalxpath.replace(/\]\|\/\/a\[/g, " or ");
	totalxpath = totalxpath.replace(/\]\|/, ')]');
	totalxpathobsolete = totalxpathobsolete.replace(/\]\|\/\/a\[/g, " or ");
	totalxpathobsolete = totalxpathobsolete.replace(/\]\|/, ')]');

				
	if (filterId != null) //insert id restriction in the xpath
	{
		totalxpath = totalxpath.replace(/\[/g, "[@class='" + filterId + "' and (");
		totalxpathobsolete = totalxpathobsolete.replace(/\[/g, "[@class='" + filterId + "' and (");
	}
	else
	{
		totalxpath = totalxpath.replace(/\[/, "[((not(@class)) or (@class!='alive_link' and @class!='adead_link' and @class!='unava_link')) and (");
		totalxpathobsolete = totalxpathobsolete.replace(/\[/, "[((not(@class)) or (@class!='alive_link' and @class!='adead_link' and @class!='unava_link')) and (");
	}
	
	linkify(totalourls);
	//LINKIFICATION END

	//STANDARD LINKCHECKING START
	if (http_file_hosts.length > 0)
	{
		var lianks = document.evaluate(totalxpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		if (filterId == null)
		{
			cLinksTotal += lianks.snapshotLength;
		}

		if (lianks.snapshotLength > 0)
		{
			var link;

			var URL = "";
			var name = "";
			var isAliveRegex = "";
			var isDeadRegex = "";
			var isUnavaRegex = "";
			var tryLoop = false;

			var y = lianks.snapshotLength;

			while (y--)
			{
				link = lianks.snapshotItem(y);

				filehostIdx = filehostLen;
				while (filehostIdx--)
				{
					if (link.href.match(http_file_hosts[filehostIdx][0]))
					{
						link.href = link.href.replace(/http:\/\/.*?http:\/\//, 'http://'); //anonymizers
						isAliveRegex = http_file_hosts[filehostIdx][1];
						isDeadRegex = http_file_hosts[filehostIdx][2];
						isUnavaRegex = http_file_hosts[filehostIdx][3];
						tryLoop = http_file_hosts[filehostIdx][5];

						geturl(link, isAliveRegex, isDeadRegex, isUnavaRegex, tryLoop);

						break;
					}
				}
			}
		}	
	}
	//STANDARD LINKCHECKING END
	
	//OBSOLETE FILE HOSTS PROCESSING START
	if (filehostObsoleteLen > 0)
	{
		var obsoletelinks = document.evaluate(totalxpathobsolete, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		var obsoleteLink;

		//check links
		if (obsoletelinks.snapshotLength > 0)
		{
			var y = obsoletelinks.snapshotLength;

			if (filterId == null)
			{
				cLinksTotal += y;
			}

			while (y--)
			{
				obsoleteLink = obsoletelinks.snapshotItem(y);
				
				displayTheCheckedLink(obsoleteLink, 'adead_link');
			}
		}
	}
	//OBSOLETE FILE HOSTS PROCESSING END

	//finds the real url on the page, replaces link.href with it and calls geturl
	function decurl(link, reallinkreg, reallinkcorrection)
	{

		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: link.href,
			headers: {
				'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
				'Accept': 'text/xml',
				'Referer': ""
			},
			onload: function (result)
			{
				// cLinksProcessed++;

				var reallink = result.responseText.match(reallinkreg)[0];
				reallink = reallink.replace(new RegExp(reallinkcorrection, "g"), "");

				link.href = reallink;

				var i = http_file_hosts.length - 1;
				do
				{
					if ((reallink.match(http_file_hosts[i][0])))
					{
						link.href = link.href.replace(/http:\/\/.*?\?http:\/\//, 'http://');
						var isAliveRegex = http_file_hosts[i][1];
						var isDeadRegex = http_file_hosts[i][2];
						var isUnavaRegex = http_file_hosts[i][3];

						geturl(link, isAliveRegex, isDeadRegex, isUnavaRegex, 50);

						break;
					}
				}
				while (i--);
				}
		});
	}

	function randUA()
	{
		//TODO	
	}
	
	//Processes link
	// [string]		link			link URL
	// [string] 	isAliveRegex	alive link regex
	// [string] 	isDeadRegex		dead link regex
	// [string] 	isUnavaRegex	unavailable link regex
	// [boolean]	tryLoop			repeats request until succeeded	
	function geturl(link, isAliveRegex, isDeadRegex, isUnavaRegex, tryLoop)
	{
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: link.href,
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Charset': 'windows-1250,utf-8;q=0.7,*;q=0.7',
				'Referer': ""
			},
			onload: function (result)
			{
				var res = result.responseText;

				if (res.match(isAliveRegex))
				{
					displayTheCheckedLink(link, 'alive_link');
					return;
				}

				if (res.match(isDeadRegex))
				{
					displayTheCheckedLink(link, 'adead_link');
					return;
				}

				if (isUnavaRegex && res.match(isUnavaRegex))
				{
					displayTheCheckedLink(link, 'unava_link');
					return;
				}

				var resStatus = result.status;

				if (resStatus == 404)
				{
					displayTheCheckedLink(link, 'adead_link');
				}
				
				if (resStatus == 500 || resStatus == 503 || resStatus == 403) //not found/available/temp. unava
				{
					if (tryLoop)
					{
						//wait 1-5 seconds and repeat the request
						setTimeout(function(){geturl(link, isAliveRegex, isDeadRegex, isUnavaRegex, tryLoop)}, 1000 + (Math.random() * 4000));
					}
					else
					{
						displayTheCheckedLink(link, 'unava_link');
					}

					return;
				}
			},
			onerror: function ()
			{
				displayTheCheckedLink(link, 'unava_link');
			}
		});
	}

	function geturlHeader(link, isAliveRegex, isDeadRegex)
	{
		GM_xmlhttpRequest(
		{
			method: 'HEAD',
			url: link.href,
			headers: {
				'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Charset': 'windows-1250,utf-8;q=0.7,*;q=0.7',
				'Referer': ""
			},
			onload: function (result)
			{
				var resStatus = result.status;
				var resHeaders = "";
				
				if (resStatus == 403 || resStatus == 404 || resStatus == 500) //not found/available
				{
					displayTheCheckedLink(link, 'adead_link');
					return;
				}

				resHeaders = result.responseHeaders;

				if (resHeaders.match(isDeadRegex))
				{
					displayTheCheckedLink(link, 'adead_link');
					return;
				}

				if (resHeaders.match(isAliveRegex))
				{
					displayTheCheckedLink(link, 'alive_link');
					return;
				}
			},
			onerror: function ()
			{
				displayTheCheckedLink(link, 'unava_link');
			}
		});
	}
	//Delinkfifies the <a> element object
	function delinkifyLink(link)
	{
		var spanElm = document.createElement("span");
		spanElm.className = link.className;
		spanElm.innerHTML = link.innerHTML;
		
		link.parentNode.replaceChild(spanElm, link);
	}
	//Assigns result status to the <a> element object and calls delinkifying eventually
	//Possible result states: adead_link, alive_link, unava_link
	function displayTheCheckedLink(link, resultStatus)
	{
		link.className = resultStatus;
		
		if (doNotLinkify)
		{
			delinkifyLink(link);
		}
		
		cLinksProcessed++;

		if (resultStatus == "alive_link")
		{
			cLinksAlive++;
			return;
		}

		if (resultStatus == "adead_link")
		{
			cLinksDead++;
			return;
		}

		if (resultStatus == "unava_link")
		{
			cLinksUnava++;
		}
	}

	function initFileHosts()
	{
		function addObsoleteHost(linkRegex, xpathEx)
		{
			var host = new Array(2);
			host[0] = linkRegex;
			host[1] = xpathEx;
			http_file_hosts_obsolete.push(host);
		}
		//obsolete file hosts init start
		if (Obsolete_file_hosts)
		{
			addObsoleteHost("uloz\.cz\/show\/file","//a[contains(@href,'uloz.cz')]");
			addObsoleteHost("storage\\.to\/get","//a[contains(@href,'storage.to')]");
			addObsoleteHost("iskladka\\.cz\/download","//a[contains(@href,'iskladka.cz')]");
			addObsoleteHost("file-rack\\.com\/files","//a[contains(@href,'file-rack.com')]");
			addObsoleteHost("fast-load\\.net\/(\/)?index","//a[contains(@href,'fast-load.net')]");
			addObsoleteHost("subory\\.sk\/download","//a[contains(@href,'subory.sk')]");
			addObsoleteHost("bigandfree\\.com\/\\d+","//a[contains(@href,'bigandfree.com')]");
			addObsoleteHost("fileop\\.com\/\\w+","//a[contains(@href,'fileop.com')]");
			addObsoleteHost("mujsoubor\\.cz\/file\/","//a[contains(@href,'mujsoubor.cz')]");
			addObsoleteHost("sendfile\\.to\/\\w+","//a[contains(@href,'sendfile.to')]");
			addObsoleteHost("superfastfile\\.com\/\\w+","//a[contains(@href,'superfastfile.com')]");
			addObsoleteHost("quickyshare\\.com\/\\w+","//a[contains(@href,'quickyshare.com/')]");
			addObsoleteHost("duckload\\.com\/(?:d|play)","//a[contains(@href,'duckload.com')]");
			addObsoleteHost("uploadstore\\.net\/\\w+","//a[contains(@href,'uploadstore.net')]");
			addObsoleteHost("meinupload\\.com\/dl\/\\d+","//a[contains(@href,'meinupload.com/dl')]");
			addObsoleteHost("dualshare\\.com\/\\w+","//a[contains(@href,'dualshare.com')]");
			addObsoleteHost("2xupload\\.(?:to|de)\/file\/\\w+","//a[contains(@href,'2xupload.to') or contains(@href,'2xupload.de')]");
			addObsoleteHost("oxedion\\.com\/index\\.php\/download\/\\w+","//a[contains(@href,'oxedion.com/index')]");
			addObsoleteHost("uploadline\\.com\/\\d+","//a[contains(@href,'uploadline.com')]");
			addObsoleteHost("dll\\.bz\/file\/\\d+","//a[contains(@href,'dll.bz/file')]");
			addObsoleteHost("movieshare\\.in\/\\w+","//a[contains(@href,'movieshare.in')]");
			addObsoleteHost("milledrive\\.com\/files\/\\d+","//a[contains(@href,'milledrive.com')]");
			addObsoleteHost("quickupload\\.net\/\\w+","//a[contains(@href,'quickupload.net')]");
			addObsoleteHost("safelink\\.in\/\\w+","//a[contains(@href,'safelink.in')]");
			addObsoleteHost("pyramidfiles\\.com\/\\w+","//a[contains(@href,'pyramidfiles.com/')]");
			addObsoleteHost("metadivx\\.com\/\\w+\/","//a[contains(@href,'metadivx.com')]");
			addObsoleteHost("filegaze\\.com\/\\w+\/","//a[contains(@href,'filegaze.com/')]");
			addObsoleteHost("divxlink\\.com\/\\w+\/","//a[contains(@href,'divxlink.com')]");
			addObsoleteHost("restfile\\.com\/\\w+\/","//a[contains(@href,'restfile.com/')]");
			addObsoleteHost("uploadrack\\.com\/\\w+\/","//a[contains(@href,'uploadrack.com')]");
			addObsoleteHost("teradepot\\.com\/\\w+\/","//a[contains(@href,'teradepot.com')]");
			addObsoleteHost("dataup\\.to\/\\d+\/","//a[contains(@href,'dataup.to')]");
			addObsoleteHost("upit\\.to\/file:\\d+","//a[contains(@href,'upit.to/file')]");
			addObsoleteHost("badongo\\.(?:com|net)\/(?:\\w\\w\/|)(?:vid|cfile|file|pt)\/\\w+","//a[contains(@href,'badongo.com') or contains(@href,'badongo.net')]");
			addObsoleteHost("driveway\\.com\/\\w+","//a[contains(@href,'driveway.com')]");
			addObsoleteHost("eatlime\\.com\/download","//a[contains(@href,'eatlime.com/download')]");
			addObsoleteHost("a2zuploads\\.com\/id\\w+","//a[contains(@href,'a2zuploads.com/id')]");
			addObsoleteHost("friendlyfiles\\.net\/download\/\\w+\/","//a[contains(@href,'friendlyfiles.net/download')]");
			addObsoleteHost("flyfile\\.us\/\\w+","//a[contains(@href,'flyfile.us')]");
			addObsoleteHost("speedyshare\\.com\/\\d+","//a[contains(@href,'speedyshare.com')]");
			addObsoleteHost("uploadspace\\.eu\/\\w+","//a[contains(@href,'uploadspace.eu')]");
			addObsoleteHost("fooget\\.com\/\\w+","//a[contains(@href,'fooget.com/')]");
			addObsoleteHost("keepfile\\.com\/\\w+","//a[contains(@href,'keepfile.com')]");
			addObsoleteHost("piggyshare\\.com\/file\/\\w+","//a[contains(@href,'piggyshare.com')]");
			addObsoleteHost("filecrown\\.com\/\\w+","//a[contains(@href,'filecrown.com')]");
			addObsoleteHost("6giga\\.com\/\\w+","//a[contains(@href,'6giga.com')]");
			addObsoleteHost("uploadjockey\\.com\/download\/\\w+","//a[contains(@href,'uploadjockey.com/download')]");
			addObsoleteHost("bluehost\\.to\/dl=\\w+","//a[contains(@href,'bluehost.to')]");
			addObsoleteHost("filegu\\.ru\/f\/\\w+","//a[contains(@href,'filegu.ru/f')]");
			addObsoleteHost("filebase\\.to\/files\/\\d+\/","//a[contains(@href,'filebase.to/files')]");
			addObsoleteHost("kickload\\.com\/file\/","//a[contains(@href,'kickload.com/file')]");
			addObsoleteHost("up-file\\.com\/files\/download\/\\w+\/","//a[contains(@href,'up-file.com/download')]");
			addObsoleteHost("ezyfile\\.net\/\\w+","//a[contains(@href,'ezyfile.net/')]");
			addObsoleteHost("aiotool\\.net\/\\w+","//a[contains(@href,'aiotool.net/')]");
			addObsoleteHost("xvideos\\.com\/files\/\\d+\/\\w+","//a[contains(@href,'xvideos.com/files')]");
			addObsoleteHost("filebling\\.com\/dl\/\\d+\/\\d+\/\\w+","//a[contains(@href,'filebling.com/dl')]");
			addObsoleteHost("loaded\\.it\/divx\/\\w+","//a[contains(@href,'loaded.it/divx')]");
			addObsoleteHost("uploadcell\\.com\/\\w+\/\\w+","//a[contains(@href,'uploadcell.com')]");
			addObsoleteHost("jakfile\\.com\/\\w+","//a[contains(@href,'jakfile.com/')]");
			addObsoleteHost("uploadshare\\.cz\/download\/\\w+\/\\w+","//a[contains(@href,'uploadshare.cz/download')]");
			addObsoleteHost("mangoshare\\.com\/\\w+","//a[contains(@href,'mangoshare.com')]");
			addObsoleteHost("ugotfile\\.com\/file\/\\d+\/\\w+","//a[contains(@href,'ugotfile.com/file')]");
			addObsoleteHost("filestab\\.com\/\\w+","//a[contains(@href,'filestab.com')]");
			addObsoleteHost("crazyupload\\.com\/\\w+","//a[contains(@href,'crazyupload.com')]");
			addObsoleteHost("gaiafile\\.com\/\\w+","//a[contains(@href,'gaiafile.com')]");
			addObsoleteHost("sharejunky\\.com\/\\w+","//a[contains(@href,'sharejunky.com')]");
			addObsoleteHost("fileho\\.com\/download\/\\d+","//a[contains(@href,'fileho.com/download')]");
			addObsoleteHost("(?:bigandfree|BigAndFree)\\.com\/\\d+","//a[contains(@href,'bigandfree.com') or contains(@href,'BigAndFree.com')]");
			addObsoleteHost("bigfile\\.in\/\\w+","//a[contains(@href,'bigfile.in')]");
			addObsoleteHost("bigshare\\.eu\/download\\.php\\?id=","//a[contains(@href,'bigshare.eu/download.php')]");
			addObsoleteHost("dahosting\\.org\/dl\/\\w+","//a[contains(@href,'dahosting.org/dl')]");
			addObsoleteHost("digisofts\\.net\/\\w+","//a[contains(@href,'digisofts.net')]");
			addObsoleteHost("file4save\\.com\/\\w+\/\\w+","//a[contains(@href,'file4save.com')]");
			addObsoleteHost("filereactor\\.com\/\\w+","//a[contains(@href,'filereactor.com/')]");
			addObsoleteHost("filechip\\.com\/\\w+","//a[contains(@href,'filechip.com')]");
			addObsoleteHost("filescloud\\.com\/\\w+\/\\w+","//a[contains(@href,'filescloud.com')]");
			addObsoleteHost("saveqube\\.com\/getfile\/\\w+","//a[contains(@href,'saveqube.com/getfile')]");
			addObsoleteHost("www2\\.turboshare\\.de\/v\/\\d+","//a[contains(@href,'turboshare.de/v')]");
			addObsoleteHost("z-upload\\.com\/\\w+","//a[contains(@href,'z-upload.com')]");
			addObsoleteHost("youshare\\.com\/view\\.php","//a[contains(@href,'youshare.com/view')]");
			addObsoleteHost("jiffyupload\\.com\/\\w+","//a[contains(@href,'jiffyupload.com')]");
			addObsoleteHost("gigeshare\\.com\/preview\/\\w+","//a[contains(@href,'gigeshare.com')]");
			addObsoleteHost("datenklo\\.net\/dl","//a[contains(@href,'datenklo.net')]");
			addObsoleteHost("upload\\.dj\/download\\.php\\?id=\\w+","//a[contains(@href,'upload.dj/download.php')]");
			addObsoleteHost("loadfiles\\.in\/\\w+\/","//a[contains(@href,'loadfiles.in')]");
			addObsoleteHost("upit\\.to\/file:\\w+\/","//a[contains(@href,'upit.to/file')]");
			addObsoleteHost("zshare\\.net\/(?:download|video|audio)\/\\w+","//a[contains(@href,'zshare.net/')]");
			addObsoleteHost("refile\\.net\/f\/\\?\\w+","//a[contains(@href,'refile.net/f/')]");
			addObsoleteHost("dsfileshare\\.com\/download","//a[contains(@href,'dsfileshare.com/download')]");
			addObsoleteHost("sharesimple\\.net\/\\w{2}\/download","//a[contains(@href,'sharesimple.net')]");
			addObsoleteHost("(?:s\\d+\\.|)4files\\.net\/\\d+","//a[contains(@href,'4files.net')]");
			addObsoleteHost("odsiebie\\.com\/pokaz\/\\d+","//a[contains(@href,'odsiebie.com/pokaz')]");
			addObsoleteHost("filenavi\\.com\/direct\/\\w+","//a[contains(@href,'filenavi.com/direct')]");
			addObsoleteHost("3oof\\.com\/\\w+","//a[contains(@href,'3oof.com/')]");
			addObsoleteHost("meshwaar\\.com\/\\w+","//a[contains(@href,'meshwaar.com')]");
			addObsoleteHost("maxupload\\.com\/files\/\\w+","//a[contains(@href,'maxupload.com/files')]");
			addObsoleteHost("share\\.cx\/videos\/\\d+","//a[contains(@href,'share.cx/videos')]");
			addObsoleteHost("atserver\\.eu\/(?:\\w{2}\/|)download\/\\d+","//a[contains(@href,'atserver.eu')]");
			addObsoleteHost("file2upload\\.net\/download\/\\d+","//a[contains(@href,'file2upload.net/download')]");
			addObsoleteHost("filebling\\.com\/\\w+","//a[contains(@href,'filebling.com')]");
			addObsoleteHost("turboshare\\.(?:eu|com)\/files","//a[contains(@href,'turboshare.') and contains(@href,'/files')]");
			addObsoleteHost("rarhost\\.com\/download","//a[contains(@href,'rarhost.com/download')]");
			addObsoleteHost("isharehd\\.com\/\\w+","//a[contains(@href,'isharehd.com')]");
			addObsoleteHost("datenklo\\.net\/file\\.php\\?id=\\w+","//a[contains(@href,'datenklo.net/file.php')]");
			addObsoleteHost("file2share\\.biz\/download\\.php\\?id=\\w+","//a[contains(@href,'file2share.biz/download.php')]");
			addObsoleteHost("savefiles\\.net\/d\/\\w+\\.html","//a[contains(@href,'savefiles.net/d')]");
			addObsoleteHost("bestsharing\\.com\/files\/\\w+","//a[contains(@href,'bestsharing.com/files')]");
			addObsoleteHost("filecache\\.de\/\\d+","//a[contains(@href,'filecache.de/')]");
			addObsoleteHost("i741\\.com\/files\/\\w+","//a[contains(@href,'i741.com/files')]");
			addObsoleteHost("dataup\\.de\/\\d+","//a[contains(@href,'dataup.de')]");
			addObsoleteHost("fofly\\.com\/\\w+","//a[contains(@href,'fofly.com')]");
			addObsoleteHost("shareonall\\.com\/\\w+","//a[contains(@href,'shareonall.com')]");
			addObsoleteHost("sexuploader\\.com\/(?:|..\/)\\?[d|v]=\\w{8}","//a[contains(@href,'sexuploader.com')]");
			addObsoleteHost("mega(upload|video|rotic|porn)\\.com\/(?:|..\/)\\?[d|v|f]=\\w{8}","//a[contains(@href,'megaupload.com') or contains(@href,'megavideo.com') or contains(@href,'megaporn.com') or contains(@href,'megarotic.com')]");
			addObsoleteHost("uploadhyper\\.com\/file\/","//a[contains(@href,'uploadhyper.com')]");
			addObsoleteHost("filespawn\\.com\/file\/","//a[contains(@href,'filespawn.com')]");
			addObsoleteHost("caizzii\\.com\/(?:download|\\?file=)","//a[contains(@href,'caizzii.com')]");
			addObsoleteHost("volnyweb\\.cz\/files\/get\/[\\w-_]+","//a[contains(@href,'volnyweb.cz/files')]");
			addObsoleteHost("gotupload\\.com\/\\w+","//a[contains(@href,'gotupload.com/')]");
			addObsoleteHost("mooload\\.com\/new\/file\\.php\\?file=files\/\\d+\/\\d+","//a[contains(@href,'mooload.com/new/file')]");
			addObsoleteHost("z\\d+\\.zupload\\.com\/download\\.php\\?file=getfile&filepath=\\d+","//a[contains(@href,'zupload.com/download')]");
			addObsoleteHost("mytempdir\\.com\/\\d+","//a[contains(@href,'mytempdir.com/')]");
			addObsoleteHost("usershare\\.net\/\\w+","//a[contains(@href,'usershare.net/')]");
			addObsoleteHost("filescash\\.net\/file\/\\d+","//a[contains(@href,'filescash.net/file')]");
			addObsoleteHost("metahyper\\.com\/\\w+","//a[contains(@href,'metahyper.com/')]");
			addObsoleteHost("combozip\\.com\/\\w+","//a[contains(@href,'combozip.com/')]");
			addObsoleteHost("x7\\.to\/\\w+","//a[contains(@href,'x7.to/')]");
			addObsoleteHost("uploadbox\\.com\/files\/\\w+","//a[contains(@href,'uploadbox.com/files')]");
			addObsoleteHost("(?:flyupload\\.)?(?:enterupload|flyupload)\\.com\/[\\?\\w]+","//a[contains(@href,'enterupload.com/') or contains(@href,'flyupload.com/')]");
			addObsoleteHost("filepoint\\.de\/dl\/\\w+","//a[contains(@href,'filepoint.de/dl')]");
			addObsoleteHost("icushare\\.com\/\\w+","//a[contains(@href,'icushare.com/')]");
			addObsoleteHost("oron\\.com\/\\w+","//a[contains(@href,'oron.com/')]");
			addObsoleteHost("mystream\\.to\/file\\-\\d+","//a[contains(@href,'mystream.to/file')]");
			addObsoleteHost("x-fs\\.com\/download\\.php\\?id=\\w+","//a[contains(@href,'x-fs.com/download')]");
			addObsoleteHost("srapid\\.eu\/\\w+","//a[contains(@href,'srapid.eu/')]");
			addObsoleteHost("shareshared\\.com\/\\w+","//a[contains(@href,'shareshared.com/')]");
			addObsoleteHost("sosame\\.cz\/\\w+","//a[contains(@href,'sosame.cz/')]");
			addObsoleteHost("s\\d+\\.filesdump\\.com\/file\/\\w+","//a[contains(@href,'filesdump.com/file')]");
			addObsoleteHost("2-klicks\\.de\/\\?d=\\w+","//a[contains(@href,'2-klicks.de/?d=')]");
			addObsoleteHost("silofiles\\.com\/file\/\\d+","//a[contains(@href,'silofiles.com/file')]");
			addObsoleteHost("upfile\\.in\/\\w+","//a[contains(@href,'upfile.in/')]");
			addObsoleteHost("filehook\\.com\/\\w+","//a[contains(@href,'filehook.com/')]");
			addObsoleteHost("cloudcache\\.cc\/\\w+","//a[contains(@href,'cloudcache.cc/')]");
			addObsoleteHost("uploadking\\.com\/\\w+","//a[contains(@href,'uploadking.com/')]");
			addObsoleteHost("nahraj\\.cz\/(?:content|down)\/\\w+","//a[contains(@href,'nahraj.cz/')]");
			addObsoleteHost("megarapid\\.eu\/files\/\\d+","//a[contains(@href,'megarapid.eu/files')]");
			addObsoleteHost("(?:fileserve|uploadstation)\\.com\/(?:file|list)\/\\w+","//a[contains(@href,'fileserve.com/') or contains(@href,'uploadstation.com/')]");
			addObsoleteHost("uploadhere\\.com\/\\w+","//a[contains(@href,'uploadhere.com/')]");
			addObsoleteHost("dualshare\\.com\/\\w+","//a[contains(@href,'dualshare.com/')]");
			addObsoleteHost("yourfilehost\\.com\/media","//a[contains(@href,'yourfilehost.com/media')]");
			addObsoleteHost("ftp2share\\.com\/file\/\\w+","//a[contains(@href,'ftp2share.com/file')]");
			addObsoleteHost("storeandserve\\.com\/download\/\\d+","//a[contains(@href,'storeandserve.com/download')]");
			addObsoleteHost("mountfile\\.com\/file(?:\/\\w+){2}","//a[contains(@href,'mountfile.com/file')]");
			addObsoleteHost("save\\.am\/files\/\\w+","//a[contains(@href,'save.am/files')]");
			addObsoleteHost("transitfiles\\.com\/dl\/\\w+","//a[contains(@href,'transitfiles.com/dl')]");
			addObsoleteHost("smartuploader\\.com\/file\\.php\\?f=\\d+","//a[contains(@href,'smartuploader.com/file.php?=')]");
			addObsoleteHost("skipfile\\.com\/\\w+","//a[contains(@href,'skipfile.com/')]");
			addObsoleteHost("stahnu\\.to\/[\\w\\?]+","//a[contains(@href,'stahnu.to/')]");
			addObsoleteHost("flyshare\.cz\/(?:stahni\/|)\\d+","//a[contains(@href,'flyshare.cz/')]");
			addObsoleteHost("(?:ddlani\\.me|ddlanime\\.com)\/\\w+","//a[contains(@href,'ddlani.me/') or contains(@href,'ddlanime.com/')]");
			addObsoleteHost("loadly\\.com\/\\w+","//a[contains(@href,'loadly.com/')]");
			addObsoleteHost("groovefile\\.com\/\\w+","//a[contains(@href,'groovefile.com/')]");
			addObsoleteHost("filezlot\\.com\/\\w+","//a[contains(@href,'filezlot.com/')]");
			addObsoleteHost("shareator\\.(?:net|com)\/\\w+","//a[contains(@href,'shareator.')]");
			addObsoleteHost("yabadaba\\.ru\/files\/","//a[contains(@href,'yabadaba.ru/files/')]");
			addObsoleteHost("rapidhide\\.com\/download\\.php\\?file=\\w+","//a[contains(@href,'rapidhide.com/download.php')]");
			addObsoleteHost("filejungle\\.com\/[fl]\/\\w+","//a[contains(@href,'filejungle.com/')]");
			addObsoleteHost("kewlshare\\.com\/dl\/\\d+","//a[contains(@href,'kewlshare.com/dl')]");
			addObsoleteHost("petandrive\\.com\/file\/\\w+","//a[contains(@href,'petandrive.com/file')]");
			addObsoleteHost("onionshare\\.com\/\\w+","//a[contains(@href,'onionshare.com/')]");
			addObsoleteHost("rapidable\\.com\/\\w+\/download\\.php\\?id=","//a[contains(@href,'rapidable.com/')]");
			addObsoleteHost("filesdump\\.com\/file\/\\w+\/\\d+","//a[contains(@href,'filesdump.com/file')]");
			addObsoleteHost("file2box\\.(?:net|com)\/\\w+","//a[contains(@href,'file2box.')]");
			addObsoleteHost("(?:filesonic|sharingmatrix|wupload)(?:\\.\\w+){1,2}\/(?:file|folder)\/\\w+","//a[contains(@href,'filesonic.') or contains(@href,'sharingmatrix.com') or contains(@href,'wupload.')]");
			addObsoleteHost("glumbouploads\\.com\/\\w+","//a[contains(@href,'glumbouploads.com/')]");
			addObsoleteHost("sharebees\\.com\/\\w+","//a[contains(@href,'sharebees.com/')]");
			addObsoleteHost("streamvideo\\.me\/\\w+","//a[contains(@href,'streamvideo.me/')]");
			addObsoleteHost("xvidstream\\.net\/\\w+","//a[contains(@href,'xvidstream.net/')]");
			addObsoleteHost("zooupload\\.com\/\\w+","//a[contains(@href,'zooupload.com/')]");
			addObsoleteHost("putlocker\\.ch\/file\/\\w+","//a[contains(@href,'putlocker.ch/file')]");
			addObsoleteHost("videobb\\.com\/\\w+","//a[contains(@href,'videobb.com/')]");
			addObsoleteHost("monsteruploads\\.eu\/\\w+","//a[contains(@href,'monsteruploads.eu/')]");
			addObsoleteHost("sharpfile\\.com\/\\w+","//a[contains(@href,'sharpfile.com/')]");
			addObsoleteHost("royalvid\\.eu\/\\w+","//a[contains(@href,'royalvid.eu/')]");
			addObsoleteHost("fileza\\.net\/\\w+","//a[contains(@href,'fileza.net/')]");
			addObsoleteHost("video\\.google\\.com\/\\w+","//a[contains(@href,'video.google.com/')]");
			addObsoleteHost("dwn\\.so\/v\/\\w+","//a[contains(@href,'dwn.so/')]");
			addObsoleteHost("ifile\\.it\/\\w+","//a[contains(@href,'ifile.it/')]");
			addObsoleteHost("sharevid\\.co\/\\w+","//a[contains(@href,'sharevid.co/')]");
			addObsoleteHost("vidhuge\\.com\/\\w+","//a[contains(@href,'vidhuge.com/')]");
			addObsoleteHost("vidshark\\.com\/\\w+","//a[contains(@href,'vidshark.ws/')]");
			addObsoleteHost("stormvid\\.co\/\\w+","//a[contains(@href,'stormvid.co/')]");
			addObsoleteHost("fileking\\.co\/\\w+","//a[contains(@href,'fileking.co/')]");
			addObsoleteHost("ovfile\\.com\/\\w+","//a[contains(@href,'ovfile.com/')]");
			addObsoleteHost("cyberlocker\\.ch\/\\w+","//a[contains(@href,'cyberlocker.ch/')]");
			addObsoleteHost("uploadboost\\.com\/\\w+","//a[contains(@href,'uploadboost.com/')]");
			addObsoleteHost("videoslim\\.net\/\\w+","//a[contains(@href,'videoslim.net/')]");
		}
		//obsolete file hosts init end

		//start of FileHost
		function addFileHost(linkRegex, isAliveRegex, isDeadRegex, isUnavaRegex, xpathEx, tryLoop)
		{
			var host = new Array(6);
			host[0] = linkRegex;
			host[1] = isAliveRegex;
			host[2] = isDeadRegex;
			host[3] = isUnavaRegex;
			host[4] = xpathEx;
			tryLoop ? host[5] = true : host[5] = false;
			http_file_hosts.push(host);
		}
		if (GM_getValue("Check_megafileupload_dot_com_links", false))
		{
			addFileHost(
			"megafileupload\.com\/..\/file\/",
			'downloadbtn',
			'is not found',
			'optional--',
			"//a[contains(@href,'megafileupload.com')]");
		}
		if (GM_getValue("Check_demo_dot_ovh_dot_com_links", false))
		{
			addFileHost(
			"demo\\.ovh\\.com\/\\w+\/\\w+",
			'download\\.gif"',
			'p_point">',
			'optional--',
			"//a[contains(@href,'demo.ovh.com')]");
		}
		if (GM_getValue("Check_safelinking_dot_net_links", false))
		{
			addFileHost(
			"safelinking\\.net\/p\/\\w+",
			'color:green;"',
			'color:(?:red|orange);"',
			'color:(?:grey|brown);"',
			"//a[contains(@href,'safelinking.net/p/')]",
			true);
		}
		if (GM_getValue("Check_fastshare_dot_cz_links", false))
		{
			addFileHost(
			"fastshare\\.cz\/\\d+\/\\w*",
			'download_\\w{2}\\.png',
			'nebyla nalezena|nebola nájdená|nie została odnaleziona',
			'optional--',
			"//a[contains(@href,'fastshare.cz')]");
		}
		if (GM_getValue("Check_fastshare_dot_org_links", false))
		{
			addFileHost(
			"[fF]ast[sS]hare\\.org\/download",
			'Download ">',
			'Diese Datei wurde wegen|wurde kein Dateiname',
			'optional--',
			"//a[contains(@href,'fastshare.org/download') or contains(@href,'FastShare.org/download')]");
		}
		if (GM_getValue("Check_partage_dash_facile_dot_com_links", false))
		{
			addFileHost(
			"partage-facile\.com\/\\w+",
			'\/dl-view\.php"',
			'Erreur 404|equiv="refresh',
			'optional--',
			"//a[contains(@href,'partage-facile.com')]");
		}
		if (GM_getValue("Check_uploadorb_dot_com_links", false))
		{
			addFileHost(
			"uploadorb\\.com\/\\w+",
			'op" value="download',
			'class="err">|width:500px;text-align:left;">',
			'optional--',
			"//a[contains(@href,'uploadorb.com')]");
		}
		if (GM_getValue("Check_holderfile_dot_com_links", false))
		{
			addFileHost(
			"holderfile\\.com\/\\w+",
			'op" value="download',
			'class="err">|width:500px;text-align:left;">',
			'optional--',
			"//a[contains(@href,'holderfile.com/')]");
		}
		if (GM_getValue("Check_pigsonic_dot_com_links", false))
		{
			addFileHost(
			"pigsonic\\.com\/\\w+",
			'op" value="download',
			'>NOT BE FOUND<|HrL09\\.png"',
			'optional--',
			"//a[contains(@href,'pigsonic.com/')]");
		}
		if (GM_getValue("Check_brontofile_dot_com_links", false))
		{
			addFileHost(
			"brontofile\\.com\/download\\.php\\?id=",
			'verifyform"',
			'error">',
			'optional--',
			"//a[contains(@href,'brontofile.com/download.php')]");
		}	
		if (GM_getValue("Check_cloudnator_dot_com_links", false))
		{
			addFileHost(
			"(cloudnator|shragle)\\.com\/files\/\\w+",
			'id="download">',
			'class="error">',
			'optional--',
			"//a[contains(@href,'shragle.com/files') or contains(@href,'cloudnator.com/files')]"
			);
		}
		if (GM_getValue("Check_erofly_dot_cz_links", false))
		{
			addFileHost(
			"erofly\\.(?:cz|sk|pl)\/\\d+_\\w*",
			'down-button">',
			'dokument nebyl nalezen|nie został znaleziony|nebol nájdený',
			'optional--',
			"//a[contains(@href,'erofly.')]"
			);
		}
		if (GM_getValue("Check_relink_dot_us_links", false))
		{
			addFileHost(
			"relink\\.us\/(?:f\/\\w+|go\\.php\\?id=\\d+|view\\.php\\?id=\\d+)",
			'online_detail\\.png" alt="Status',
			'(?:offline|partially)_detail\\.png" alt="Status|File deleted',
			'unknown_detail\\.png" alt="Status',
			"//a[contains(@href,'relink.us/')]"
			);
		}
		if (GM_getValue("Check_uploadstube_dot_de_links", false))
		{
			addFileHost(
			"uploadstube\\.de\/download\\.php\\?file=\\d+",
			'div id="dl"',
			'Sie haben den Link falsch',
			'optional--',
			"//a[contains(@href,'uploadstube.de/download.php?file=')]"
			);
		}
		if (GM_getValue("Check_flyfiles_dot_net_links", false))
		{
			addFileHost(
			"flyfiles\\.net\/\\w+",
			'download_button"|"Download file"',
			'File not found!|Файл не найден',
			'optional--',
			"//a[contains(@href,'flyfiles.net/')]"
			);
		}
		if (GM_getValue("Check_wikiupload_dot_com_links", false))
		{
			addFileHost(
			"wikiupload\\.com\/\\w+",
			'download-button">',
			'Sorry, File not found',
			'optional--',
			"//a[contains(@href,'wikiupload.com/')]"
			);
		}
		if (GM_getValue("Check_bitbonus_dot_com_links", false))
		{
			addFileHost(
			"bitbonus\\.com\/download\/\\w+",
			'icon_download\\.gif"',
			'icon_redirect\\.gif"',
			'optional--',
			"//a[contains(@href,'bitbonus.com/download')]"
			);
		}
		if (GM_getValue("Check_hostuje_dot_net_links", false))
		{
			addFileHost(
			"hostuje\\.net\/file\\.php\\?id=\\w+",
			'file\\.php">',
			'Podany plik nie zosta',
			'optional--',
			"//a[contains(@href,'hostuje.net/file')]"
			);
		}
		if (GM_getValue("Check_gettyfile_dot_ru_links", false))
		{
			addFileHost(
			"gettyfile\\.ru\/\\d+",
			'download\\.gif border',
			'<center><font size="3">',
			'optional--',
			"//a[contains(@href,'gettyfile.ru/')]"
			);
		}
		if (GM_getValue("Check_4fastfile_dot_com_links", false))
		{
			addFileHost(
			"4fastfile\\.com\/abv-fs\/\\d+",
			'file-download">',
			'v><div id="block',
			'optional--',
			"//a[contains(@href,'4fastfile.com/abv')]"
			);
		}
		if (GM_getValue("Check_slingfile_dot_com_links", false))
		{
			addFileHost(
			"slingfile\\.com\/(?:dl|file|video)\/\\w+",
			'fileinfo">',
			'errorbox">',
			'optional--',
			"//a[contains(@href,'slingfile.com/')]"
			);
		}
		if (GM_getValue("Check_limelinx_dot_com_links", false))
		{
			addFileHost(
			"limelinx\\.com\/files\/\\w+",
			'FileDetails">',
			'File Not Found<',
			'optional--',
			"//a[contains(@href,'limelinx.com/files')]"
			);
		}
		if (GM_getValue("Check_tufiles_dot_ru_links", false))
		{
			addFileHost(
			"(?:tufiles|turbob1t|failoobmenik|filesmail|firebit|dlbit|files\\.china\\-gsm|3aka4aem|file\\.piratski|mnogofiles|links-free|turbo-bit|turbosfiles|turbobit)\\.\\w+\/\\w+",
			'download\\-file">',
			'col-1">\\s*<h1>|<h1>Please wait, searching file...',
			'optional--',
			"//a[contains(@href,'tufiles.ru/') or contains(@href,'turbob1t.ru/') or contains(@href,'filesmail.ru/') or contains(@href,'failoobmenik.ru/')"+
			" or contains(@href,'firebit.in/') or contains(@href,'dlbit.net/') or contains(@href,'files.china-gsm.ru/') or contains(@href,'3aka4aem.ru/')"+
			" or contains(@href,'file.piratski.ru/') or contains(@href,'mnogofiles.com/') or contains(@href,'links-free.ru/')"+
			" or contains(@href,'turbo-bit.ru/') or contains(@href,'turbosfiles.ru/') or contains(@href,'turbobit.net/')]"
			);
		}
		if (GM_getValue("Check_fileshare_dot_in_dot_ua_links", false))
		{
			addFileHost(
			"fileshare\\.in\\.ua\/\\w+",
			'"file_name ',
			'df_content">',
			'optional--',
			"//a[contains(@href,'fileshare.in.ua')]"
			);
		}
		if (GM_getValue("Check_data_dot_hu_links", false))
		{
			addFileHost(
			"data\\.hu\/get\/\\d+\/",
			'download_box_button',
			'missing\\.php',
			'optional--',
			"//a[contains(@href,'data.hu/get')]",
			true
			);
		}
		if (GM_getValue("Check_anonstream_dot_com_links", false))
		{
			addFileHost(
			"anonstream\\.com\/get_\\w+",
			'Downloading:<font',
			'keine Datei gefunden',
			'optional--',
			"//a[contains(@href,'anonstream.com/get_')]"
			);
		}
		if (GM_getValue("Check_filesmelt_dot_com_links", false))
		{
			addFileHost(
			"filesmelt\\.com\/dl\/\\w+",
			'Your download is ready',
			'Sorry, but your',
			'optional--',
			"//a[contains(@href,'filesmelt.com/dl')]"
			);
		}
		if (GM_getValue("Check_packupload_dot_com_links", false))
		{
			addFileHost(
			"packupload\\.com\/\\w+",
			'buttonDelay"',
			'bold; color: #ff0000',
			'optional--',
			"//a[contains(@href,'packupload.com/')]"
			);
		}
		if (GM_getValue("Check_minus_dot_com_links", false))
		{
			addFileHost(
			"minus\\.com\/\\w+",
			'btn-download no-counter"',
			'cloud picture"',
			'optional--',
			"//a[contains(@href,'minus.com/')]"
			);
		}
		if (GM_getValue("Check_indowebster_dot_com_links", false))
		{
			addFileHost(
			"(?:files\\.)?indowebster\\.com\/download\/\\w+\/",
			'premiumBtn"',
			'errorMessage"',
			'optional--',
			"//a[contains(@href,'indowebster.com/download')]"
			);
		}
		if (GM_getValue("Check_superload_dot_cz_links", false))
		{
			addFileHost(
			"superload\\.cz\/dl\/\\w+",
			'icon-download">',
			'soubor nebyl nalezen',
			'optional--',
			"//a[contains(@href,'superload.cz/dl')]"
			);
		}
				
		if (GM_getValue("Check_hulkfile_dot_com_links", false))
		{
			addFileHost(
			"w\\.hulkfile\\.com\/\\w+",
			'op" value="download',
			'class="err">|width:500px;text-align:left;">',
			'optional--',
			"//a[contains(@href,'w.hulkfile.com/')]"
			);
		}
		if (GM_getValue("Check_filesector_dot_cc_links", false))
		{
			addFileHost(
			"filesector\\.cc\/f\/\\w+",
			'script>\\s*<div style="width',
			'div>\\s*<div style="width',
			'optional--',
			"//a[contains(@href,'filesector.cc/f')]"
			);
		}
		if (GM_getValue("Check_easybytez_dot_com_links", false))
		{
			addFileHost(
			"easybytez\\.com\/\\w+",
			'op" value="download',
			'stop_error\\.gif',
			'optional--',
			"//a[contains(@href,'easybytez.com/')]"
			);
		}
		if (GM_getValue("Check_uptorch_dot_com_links", false))
		{
			addFileHost(
			"uptorch\\.com\/\\?d=\\w+",
			'downloadbtn"',
			'class="error">',
			'optional--',
			"//a[contains(@href,'uptorch.com/?d=')]"
			);
		}
		if (GM_getValue("Check_filestore_dot_com_dot_ua_links", false))
		{
			addFileHost(
			"filestore\\.com\\.ua\/\\?d=\\w+",
			'tdrow1>',
			'class=warn',
			'optional--',
			"//a[contains(@href,'filestore.com.ua/?d=')]"
			);
		}
		if (GM_getValue("Check_netkups_dot_com_links", false))
		{
			addFileHost(
			"netkups\\.com\/\\?d=\\w+",
			'submit">Continue',
			'page">File not found|deleted due to inactivity',
			'optional--',
			"//a[contains(@href,'netkups.com/?d=')]"
			);
		}
		if (GM_getValue("Check_openfile_dot_ru_links", false))
		{
			addFileHost(
			"openfile\\.ru\/(?:video\/|)\\d+",
			'videobox_left">',
			'blog_title">|not found on this server',
			'optional--',
			"//a[contains(@href,'openfile.ru/')]"
			);
		}
		if (GM_getValue("Check_sendmyway_dot_com_links", false))
		{
			addFileHost(
			"sendmyway\\.com\/\\w+",
			'file\\-info">',
			'text-align:left;"',
			'maintenance mode\\.',
			"//a[contains(@href,'sendmyway.com/')]"
			);
		}
		if (GM_getValue("Check_extmatrix_dot_com_links", false))
		{
			addFileHost(
			"extmatrix\\.com\/files\/\\w+",
			'div class="success"',
			'div class="error"',
			'optional--',
			"//a[contains(@href,'extmatrix.com/files')]"
			);
		}
		if (GM_getValue("Check_sendfiles_dot_nl_links", false))
		{
			addFileHost(
			"sendfiles\\.nl\/download.aspx\\?ID=\\w+",
			'content_lnkDownload',
			'error\\.aspx\\?',
			'optional--',
			"//a[contains(@href,'sendfiles.nl/download.aspx')]"
			);
		}
		if (GM_getValue("Check_freeuploads_dot_fr_links", false))
		{
			addFileHost(
			"(?:freeuploads\\.fr|uploa\\.dk)\/\\?d=\\d+",
			'freeuploads\\.fr\/download\/',
			'text-align:left;margin:10px;">',
			'optional--',
			"//a[contains(@href,'freeuploads.fr/?d=') or contains(@href,'uploa.dk/?d=')]"
			);
		}
		if (GM_getValue("Check_yourfilestore_dot_com_links", false))
		{
			addFileHost(
			"yourfilestore\\.com\/download\/\\d+\/",
			'download_data">',
			'may have been deleted|<h1>Sorry!<\/h1>',
			'optional--',
			"//a[contains(@href,'yourfilestore.com/download')]"
			);
		}
		if (GM_getValue("Check_nekaka_dot_com_links", false))
		{
			addFileHost(
			"nekaka\\.com\/d\/[\\w-]+",
			'downloadForm">',
			'invalid file link',
			'optional--',
			"//a[contains(@href,'nekaka.com/d')]"
			);
		}
		if (GM_getValue("Check_filebig_dot_net_links", false))
		{
			addFileHost(
			"filebig\\.net\/files\/\\w+",
			'downloadFile">',
			'<p>File not found<\/p>',
			'optional--',
			"//a[contains(@href,'filebig.net/files')]"
			);
		}
		if (GM_getValue("Check_gamefront_dot_com_links", false))
		{
			addFileHost(
			"files\\.filefront\\.com\/\/;\\d+;;",
			'downloadLink">',
			'File not found, you',
			'optional--',
			"//a[contains(@href,'files.filefront.com')]"
			);

			addFileHost(
			"gamefront\\.com\/files\/\\d+",
			'downloadLink">',
			'File not found, you',
			'optional--',
			"//a[contains(@href,'gamefront.com/files')]"
			);
		}
		if (GM_getValue("Check_hyperfileshare_dot_com_links", false))
		{
			addFileHost(
			"(?:download\\.|)hyperfileshare\\.com\/download\\.php\\?code=\\w+",
			'dnlLnk"',
			'already been deleted',
			'optional--',
			"//a[contains(@href,'hyperfileshare.com/download')]"
			);
		}
		if (GM_getValue("Check_qshare_dot_com_links", false))
		{
			addFileHost(
			"qshare\\.com\/get\/\\d+\/.",
			'file\\-name"',
			'error\\.gif"',
			'optional--',
			"//a[contains(@href,'qshare.com/get')]"
			);
		}
		if (GM_getValue("Check_premiuns_dot_org_links", false))
		{
			addFileHost(
			"premiuns\\.org\/\\w+",
			'op" value="download',
			'class="err">|width:500px;text-align:left;">',
			'optional--',
			"//a[contains(@href,'premiuns.org/')]"
			);
		}
		if (GM_getValue("Check_uploadcore_dot_com_links", false))
		{
			addFileHost(
			"uploadcore\\.com\/\\w+",
			'op" value="download',
			'class="err">|width:500px;text-align:left;">',
			'optional--',
			"//a[contains(@href,'uploadcore.com/')]"
			);
		}
		if (GM_getValue("Check_hellupload_dot_com_links", false))
		{
			addFileHost(
			"hellupload\\.com\/\\w+",
			'op" value="download',
			'class="err">|width:500px;text-align:left;">',
			'optional--',
			"//a[contains(@href,'hellupload.com/')]"
			);
		}
		if (GM_getValue("Check_free_dash_uploading_dot_com_links", false))
		{
			addFileHost(
			"free\\-uploading\\.com\/\\w+",
			'op" value="download',
			'class="err">|width:500px;text-align:left;">',
			'optional--',
			"//a[contains(@href,'free-uploading.com/')]"
			);
		}
		if (GM_getValue("Check_filelaser_dot_com_links", false))
		{
			addFileHost(
			"filelaser\\.com\/file\/\\w+",
			'btn btn\\-success',
			'File Not Found',
			'optional--',
			"//a[contains(@href,'filelaser.com/file')]"
			);
		}
		if (GM_getValue("Check_toucansharing_dot_com_links", false))
		{
			addFileHost(
			"toucansharing\\.com\/\\w+",
			'op" value="download',
			'class="err">|width:500px;text-align:left;">',
			'optional--',
			"//a[contains(@href,'toucansharing.com/')]"
			);
		}
		if (GM_getValue("Check_2download_dot_de_links", false))
		{
			addFileHost(
			"2download\\.de\/download\\-",
			'button_dl\\.png',
			'"error">',
			'optional--',
			"//a[contains(@href,'2download.de/download-')]"
			);
		}
		if (GM_getValue("Check_fileape_dot_com_links", false))
		{
			addFileHost(
			"fileape\\.com\/download\\-",
			'button_dl\\.png',
			'does not exist\\.',
			'optional--',
			"//a[contains(@href,'fileape.com/')]"
			);
		}
		if (GM_getValue("Check_uppit_dot_com_links", false))
		{
			addFileHost(
			"(?:uppit\\.com|up\\.ht)\/\\w+",
			'op" value="download',
			'class="err">|style="width:500px;text-align:left;"|fish-404\\.png"',
			'optional--',
			"//a[contains(@href,'up.ht/') or contains(@href,'uppit.com/')]",
			true
			);
		}
		if (GM_getValue("Check_fileupped_dot_com_links", false))
		{
			addFileHost(
			"fileupped\\.com\/download\\.php\\?id=\\w+",
			'="downloadtype"',
			'class=warn align=center>|="error">',
			'optional--',
			"//a[contains(@href,'fileupped.com/download.php')]",
			true
			);
		}
		if (GM_getValue("Check_maxshare_dot_pl_links", false))
		{
			addFileHost(
			"maxshare\\.pl\/download\\.php\\?dl=\\w+",
			'class="pobierz"',
			'class="wyszuskiwarkabg"',
			'optional--',
			"//a[contains(@href,'maxshare.pl/download.php')]",
			true
			);
		}
		if (GM_getValue("Check_filesin_dot_com_links", false))
		{
			addFileHost(
			"filesin\\.com\/\\w+\/download\\.html",
			'download_area">',
			'error_note">',
			'optional--',
			"//a[contains(@href,'filesin.com/')]",
			true
			);
		}
		if (GM_getValue("Check_nowdownload_dot_eu_links", false))
		{
			addFileHost(
			"nowdownload\\.eu\/dl\/\\w+",
			'alert-success"',
			'This file does not exist!',
			'The file is being transfered',
			"//a[contains(@href,'nowdownload.eu/dl')]"
			);
		}
		if (GM_getValue("Check_egofiles_dot_com_links", false))
		{
			addFileHost(
			"egofiles\\.com\/\\w+",
			'dwn-button"',
			'404 File not found',
			'optional--',
			"//a[contains(@href,'egofiles.com/')]"
			);
		}
		if (GM_getValue("Check_axifile_dot_com_links", false))
		{
			addFileHost(
			"axifile\\.com(?:\/\w(2))?\/\\??\\w+",
			'Dbutton_big"',
			'download\\-error\\.php',
			'optional--',
			"//a[contains(@href,'axifile.com/')]"
			);
		}
		if (GM_getValue("Check_asfile_dot_com_links", false))
		{
			addFileHost(
			"asfile\\.com\/file\/\\w+",
			'link_line">',
			'Page not found',
			'optional--',
			"//a[contains(@href,'asfile.com/file')]"
			);
		}
		if (GM_getValue("Check_k2files_dot_com_links", false))
		{
			addFileHost(
			"k2files\\.com\/files\/",
			'>POBIERZ PLIK<',
			'brak Pliku',
			'optional--',
			"//a[contains(@href,'k2files.com/files')]"
			);
		}
		if (GM_getValue("Check_hulkshare_dot_com_links", false))
		{
			addFileHost(
			"hulkshare\.com\/\\w+",
			'download\.sam\.png|This is a private file|id="filename',
			'File does not exist|fingerprint protected copyright',
			'optional--',
			"//a[contains(@href,'hulkshare.com')]"
			);
		}
		if (GM_getValue("Check_filedino_dot_com_links", false))
		{
			addFileHost(
			"filedino\\.com\\/\\w+",
			'runninggreen"',
			'width:500px;|File Not Found',
			'optional--',
			"//a[contains(@href,'filedino.com')]"
			);
		}
		if (GM_getValue("Check_filemashine_dot_com_links", false))
		{
			addFileHost(
			"filemashine\\.com\\/download\/\\w+",
			'content_text">\\s+<h',
			'content_text">\\s+<d',
			'optional--',
			"//a[contains(@href,'filemashine.com/download')]"
			);
		}
		if (GM_getValue("Check_mojedata_dot_sk_links", false))
		{
			addFileHost(
			"mojedata\\.sk\/\\w+",
			'download-button"',
			's.bor je fu.|404 Not Found',
			'optional--',
			"//a[contains(@href,'mojedata.sk')]"
			);
		}
		if (GM_getValue("Check_turbobit_dot_net_links", false))
		{
			addFileHost(
			"turbobit\\.(?:net|pl)\/download\/folder\/\\d+",
			'col-1">\\s*<s',
			'col-1">\\s*<h',
			'optional--',
			"//a[contains(@href,'turbobit.') and contains(@href,'download/folder')]"
			);
		}
		if (GM_getValue("Check_hitfile_dot_net_links", false))
		{
			addFileHost(
			"hitfile\\.net\/download\/folder\/\\d+",
			'content">\\s*<s',
			'content">\\s*<h',
			'optional--',
			"//a[contains(@href,'hitfile.net/download/folder')]"
			);
		}

		if (GM_getValue("Check_hotfile_dot_com_links", false))
		{
			addFileHost(
			"hotfile\\.com\/list\/\\d+\/\\w+",
			'padding-right: 10px;">',
			'>Empty Directory<',
			'optional--',
			"//a[contains(@href,'hotfile.com/list')]"
			);
		}
		if (GM_getValue("Check_netload_dot_in_links", false))
		{
			addFileHost(
			"netload\\.in\/folder\\.php\\?folder_id=\\w+",
			'images\/online\\.gif',
			'InPage_Error"',
			'optional--',
			"//a[contains(@href,'netload.in/folder.php')]"
			);
		}
		if (GM_getValue("Check_movshare_dot_net_links", false))
		{
			addFileHost(
			"movshare\\.net\\/video\\/\\w+",
			'optional--"',
			'no longer exists',
			'optional--',
			"//a[contains(@href,'movshare.net/video')]"
			);
		}
		if (GM_getValue("Check_plunder_dot_com_links", false))
		{
			addFileHost(
			"plunder\.com\/\\w+",
			'x\/download\\.gif',
			'404 - File or directory not found.',
			'optional--',
			"//a[contains(@href,'plunder.com')]"
			);
		}
		if (GM_getValue("Check_fileserver_dot_cc_links", false))
		{
			addFileHost(
			"fileserver\\.cc\/\\w+",
			'op" value="download',
			'class="err">|style="width:500px;text-align:left;"',
			'optional--',
			"//a[contains(@href,'fileserver.cc/')]"
			);
		}
		if (GM_getValue("Check_xfileshare_dot_eu_links", false))
		{
			addFileHost(
			"xfileshare\\.eu\/\\w+",
			'op" value="download',
			'class="err">|style="width:500px;text-align:left;"',
			'optional--',
			"//a[contains(@href,'xfileshare.eu/')]"
			);
		}
		if (GM_getValue("Check_mafiastorage_dot_com_links", false))
		{
			addFileHost(
			"mafiastorage\\.com\/\\w+",
			'op" value="download',
			'class="err">|style="width:500px;text-align:left;"',
			'optional--',
			"//a[contains(@href,'mafiastorage.com/')]"
			);
		}
		if (GM_getValue("Check_uploadspace_dot_pl_links", false))
		{
			addFileHost(
			"uploadspace\.pl\/plik\\w+",
			'Downloading .+? \\|',
			'Downloading a file',
			'optional--',
			"//a[contains(@href,'uploadspace.pl/plik')]"
			);
		}
		if (GM_getValue("Check_hipfile_dot_com_links", false))
		{
			addFileHost(
			"hipfile\\.com\/\\w+",
			'op" value="download',
			'File Not Found<',
			'optional--',
			"//a[contains(@href,'hipfile.com')]"
			);
		}
		if (GM_getValue("Check_uploadingit_dot_com_links", false))
		{
			addFileHost(
			"uploadingit\\.com\/file\/\\w+",
			'downloadTitle">',
			'deleteContent">',
			'optional--',
			"//a[contains(@href,'uploadingit.com/file')]"
			);
		}
		if (GM_getValue("Check_stiahni_dot_si_links", false))
		{
			addFileHost(
			"stiahni\\.si\/download\\.php\\?id=",
			'downloadfile',
			'exclamation\\.png',
			'optional--',
			"//a[contains(@href,'stiahni.si/download')]"
			);
		}
		if (GM_getValue("Check_rapidshare_dot_ru_links", false))
		{
			addFileHost(
			"rapidshare\\.ru\/\\d+",
			'Вы хотите скачать файл:',
			'Ошибка: Файл был',
			'optional--',
			"//a[contains(@href,'rapidshare.ru/')]"
			);
		}
		if (GM_getValue("Check_rghost_dot_net_links", false))
		{
			addFileHost(
			"rghost\.(?:net|ru)\/(?:|private\/)\\d+",
			'download_link|btn large download"',
			'file is restricted|File is deleted|503 Service Unavailable',
			'File was deleted',
			"//a[contains(@href,'rghost.')]"
			);
		}
		if (GM_getValue("Check_xdisk_dot_cz_links", false))
		{
			addFileHost(
			"xdisk\\.cz\/(?:..\/)?download\\.php\\?id=\\w+",
			'">Staženo:\\s*<\/span>',
			'Soubor, který hledáte nenalezen',
			'optional--',
			"//a[contains(@href,'xdisk.cz/')]"
			);
		}
		if (GM_getValue("Check_filerio_dot_com_links", false))
		{
			addFileHost(
			"filekeen\\.com\/\\w+$",
			'box-21">\\s+<h',
			'box-21">\\s+<d|File has been removed',
			'optional--',
			"//a[(contains(@href,'filekeen.com')) and (string-length(@href) = 32)]"
			);

			addFileHost(
			"filerio\\.(?:com|in)\/\\w+$",
			'download1">',
			'500px;text-align:left;">|File (?:has been removed|Not Found)',
			'optional--',
			"//a[(contains(@href,'filerio.')) and ((string-length(@href) = 31) or (string-length(@href) = 30))]"
			);
		}
		if (GM_getValue("Check_videozer_dot_com_links", false))
		{
			addFileHost(
			"videozer\\.com\/video\/\\w+",
			'video_player"',
			'error_404"',
			'optional--',
			"//a[contains(@href,'videozer.com/video')]"
			);
		}
		if (GM_getValue("Check_share_dash_now_dot_net_links", false))
		{
			addFileHost(
			"share-now\.net\/\/?files\/\\d+",
			'Download Now"',
			'upload_files',
			'optional--',
			"//a[contains(@href,'share-now.net')]"
			);
		}
		if (GM_getValue("Check_sms4file_dot_com_links", false))
		{
			addFileHost(
			"sms4file\\.com\/download(?:vip|)\/\\w+",
			'file-info">',
			'Requested file is not found|Запрашиваемый файл не найден',
			'optional--',
			"//a[contains(@href,'sms4file.com/download')]"
			);
		}
		if (GM_getValue("Check_peejeshare_dot_com_links", false))
		{
			addFileHost(
			"peeje(?:share)?\\.com\/files\/\\d+",
			'div id="download">',
			'red;">The file you requested',
			'red;">This file is password',
			"//a[contains(@href,'peejeshare.com/files') or contains(@href,'peeje.com/files')]"
			);
		}
		if (GM_getValue("Check_daten_dash_hoster_dot_de_links", false))
		{
			addFileHost(
			"(?:daten-hoster\\.de\/file\/\\w+|filehosting\\.org\/file\/\\w+|xtraupload\\.de\/\\?d=\\w+)",
			'Details zur Datei|Details page',
			'Jetzt hochladen|upload now',
			'optional--',
			"//a[contains(@href,'daten-hoster.de/file') or contains(@href,'filehosting.org/file') or contains(@href,'xtraupload.de')]"
			);
		}
		if (GM_getValue("Check_upload_dash_il_dot_net_links", false))
		{
			addFileHost(
			"(?:upload-il|przeslij)\.net\/(?:en|he|ar|ru|)\/?\\w+",
			'downloadbtn"',
			'DL_FileNotFound',
			'optional--',
			"//a[contains(@href,'upload-il.net') or contains(@href,'przeslij.net')]"
			);
		}
		if (GM_getValue("Check_fileflyer_dot_com_links", false))
		{
			addFileHost(
			"fileflyer\.com\/view\/\\w+",
			'(?:dwl|locked)btn"',
			'error.gif"|link">Removed|removedlink">',
			'optional--',
			"//a[contains(@href,'fileflyer.com')]"
			);
		}
		if (GM_getValue("Check_rapidupload_dot_sk_links", false))
		{
			addFileHost(
			"rapidupload\.sk\/file\/\\d+\/",
			'Názov súboru',
			'súbor sa nenašiel',
			'optional--',
			"//a[contains(@href,'rapidupload.sk/file')]"
			);
		}
		if (GM_getValue("Check_filestore_dot_to_links", false))
		{
			addFileHost(
			"filestore\.to\/\\?d=\\w+",
			'"downloading"',
			'Datei wurde nicht gefunden',
			'optional--',
			"//a[contains(@href,'filestore.to')]"
			);
		}
		if (GM_getValue("Check_easy_dash_share_dot_com_links", false))
		{
			addFileHost(
			"(?:w\\d*\.|)(?:crocko|easy-share)\\.com\/.",
			'fz24">Download',
			'msg-err"|the page you\'re looking for|1>400 Bad Request<',
			'optional--',
			"//a[contains(@href,'easy-share.com') or contains(@href,'crocko.com')]"
			);
		}
		if (GM_getValue("Check_burnupload_dot_com_links", false))
		{
			addFileHost(
			"burnupload\\.(?:com\/\\?d=|ihiphop\\.com\/download\\.php\\?id=)\\w+",
			'File size:',
			'file is not found',
			'optional--',
			"//a[contains(@href,'burnupload.com') or contains(@href,'burnupload.ihiphop.com')]"
			);
		}
		if (GM_getValue("Check_datei_dot_to_links", false))
		{
			addFileHost(
			"(?:datei|sharebase)\.to\/\\w+",
			'icon_downloaden\.png',
			'Datei wurde nicht gefunden',
			'optional--',
			"//a[contains(@href,'datei.to') or contains(@href,'sharebase.to')]"
			);
		}
		if (GM_getValue("Check_yunfile_dot_com_links", false))
		{
			addFileHost(
			"(?:yunfile|filemarkets)\\.com\/file\/\\w+",
			'title">.+?&nbsp;&nbsp;.+?<\/h2>',
			'title">.+?&nbsp;&nbsp;<\/h2>',
			'optional--',
			"//a[contains(@href,'yunfile.com/file') or contains(@href,'filemarkets.com/file')]"
			);
		}
		if (GM_getValue("Check_filefat_dot_com_links", false))
		{
			addFileHost(
			"filefat\\.com\/\\w+",
			'download_icon.jpg',
			'File Not Found|Datei nicht gefunden|Файл не найден|fichier non trouve|لم يتم إيجاد الملف|Dosya bulunamadД±|Nie znaleziono pliku|ไม่พบไฟล์ที่ต้องการ|Archive no Encontrado|File nem talГЎlhatГі|File tidak ditemukan',
			'optional--',
			"//a[contains(@href,'filefat.com')]"
			);
		}
		if (GM_getValue("Check_putlocker_dot_com_links", false))
		{
			addFileHost(
			"putlocker\\.com\/file\/\\w+|firedrive\\.com\/file\/\\w+",
			'Choose Method of Access|choose_speed">|Continue to file...|Putlocker is now Firedrive!',
			'Welcome to PutLocker|has been removed.|404: This file might have been moved, replaced or deleted.',
			'undergoing scheduled maintenance',
			"//a[contains(@href,'putlocker.com') or contains(@href,'firedrive.com')]"
			);
		}
		if (GM_getValue("Check_luckyshare_dot_net_links", false))
		{
			addFileHost(
			"luckyshare\\.net\/\\d+",
			'class=\'file_name\'>',
			'no such file available',
			'optional--',
			"//a[contains(@href,'luckyshare.net/')]"
			);
		}
		if (GM_getValue("Check_unibytes_dot_com_links", false))
		{
			addFileHost(
			"unibytes\\.com\/[\\w\.]+",
			'trying to download|пытаетесь загрузить файл|tes entrain de tlcharger',
			'File not found|Файл не найден|',
			'optional--',
			"//a[contains(@href,'unibytes.com')]"
			);
		}
		if (GM_getValue("Check_hellshare_dot_com_links", false))
		{
			addFileHost(
			"www\\.hellshare\\.com\/\\d+",
			'tab\\-details"',
			'list-purp-2"|not found on this server',
			'optional--',
			"//a[contains(@href,'www.hellshare.com')]"
			);
		}
		if (GM_getValue("Check_czshare_dot_com_links", false))
		{
			addFileHost(
			"czshare\\.com\/folders\/[\\w_]+\/\\w+",
			'"directory">',
			'header -->\\s+<div id="info\\-panel',
			'optional--',
			"//a[contains(@href,'czshare.com/folders')]"
			);
		}
		if (GM_getValue("Check_quickshare_dot_cz_links", false))
		{
			addFileHost(
			"quickshare\\.cz\/slozka-\\d+",
			'Počet souborů: <strong>[1-9]',
			'Počet souborů: <strong>0|Chyba! Taková složka neexistuje',
			'optional--',
			"//a[contains(@href,'quickshare.cz/slozka')]"
			);
		}
		if (GM_getValue("Check_multishare_dot_cz_links", false))
		{
			addFileHost(
			"multishare\\.cz\/slozka\/\\d+",
			'manager-linky">',
			'Požadovaná složka neexistuje.',
			'optional--',
			"//a[contains(@href,'multishare.cz/slozka/')]"
			);
		}
		if (GM_getValue("Check_netload_dot_in_links", false))
		{
			addFileHost(
			"netfolder\\.in\/\\w+",
			'list" value="http',
			'InPage_Error">|list" value=""',
			'optional--',
			"//a[contains(@href,'netfolder.in')]"
			);
		}
		if (GM_getValue("Check_share_dash_rapid_dot_com_links", false))
		{
			addFileHost(
			"(?:share-?rapid|rapids|share-credit|share-central|share\\-ms|share\\-net|srapid)\\.(?:com|cz|sk|biz|net|info|eu)\/slozka\/\\d+",
			'soubor" style',
			'error_div">|404 - Not Found',
			'optional--',
			"//a[(contains(@href,'share-rapid') or contains(@href,'sharerapid') or contains(@href,'rapids') or contains(@href,'share-ms') or contains(@href,'share-credit') or contains(@href,'share-central') or contains(@href,'share-net') or contains(@href,'srapid')) and contains(@href,'slozka/')]"
			);
		}
		if (GM_getValue("Check_load_dot_to_links", false))
		{
			addFileHost(
			'(?:www\\.|\/)load\\.to\/\\w{10}',
			'"download_table_left">Size',
			'Can\'t find file',
			'optional--',
			"//a[contains(@href,'/load.to/') or contains(@href,'www.load.to/')]"
			);
		}
		if (GM_getValue("Check_files_dot_to_links", false))
		{
			addFileHost(
			"files\.to\/get\/\\d+\/",
			'You requested the following',
			'requested file couldn',
			'optional--',
			"//a[contains(@href,'files.to/')]"
			);
		}
		if (GM_getValue("Check_freakshare_dot_net_links", false))
		{
			addFileHost(
			"freakshare\\.(?:net|com)\/files\/",
			'box_heading',
			'<div class="box" style',
			'optional--',
			"//a[(contains(@href,'freakshare.net') or contains(@href,'freakshare.com')) and contains(@href,'files')]",
			true
			);
			
			addFileHost(
			"freakshare\\.(?:net|com)\/folder\/",
			'Files: [1-9]',
			'Files: 0',
			'optional--',
			"//a[(contains(@href,'freakshare.net') or contains(@href,'freakshare.com')) and contains(@href,'folder')]",
			true
			);
		}
		if (GM_getValue("Check_bitshare_dot_com_links", false))
		{				
			addFileHost(
			"bitshare\\.com\/\\?d=\\w+",
			'">Total file size',
			'Folder can not be found|Folder does not contain any files',
			'optional--',
			"//a[contains(@href,'bitshare.com/?d=')]",
			true
			);
		}
		if (GM_getValue("Check_divshare_dot_com_links", false))
		{
			addFileHost(
			"divshare\\.com\/download\/",
			'download_new\.png',
			'have been removed',
			'optional--',
			"//a[contains(@href,'divshare.com')]"
			);
		}
		if (GM_getValue("Check_stahovadlo_dot_cz_links", false))
		{
			addFileHost(
			"stahovadlo\\.cz\/soubor\/\\d+\/[\\.\\w]+",
			'download" type="submit',
			'Neplatný nebo neúplný odkaz|Soubor již není dostupný',
			'optional--',
			"//a[contains(@href,'stahovadlo.cz/soubor')]",
			true
			);
		}
		if (GM_getValue("Check_warserver_dot_cz_links", false))
		{
			addFileHost(
			"(?:www\\d\\.)?warserver\\.cz\/stahnout\/\\d+",
			'freeDownload',
			'Soubor nenalezen<',
			'optional--',
			"//a[contains(@href,'warserver.cz/stahnout')]"
			);
			
			addFileHost(
			"(?:www\\d\\.)?warserver\\.cz\/slozka\/\\d+",
			'prvni"',
			'roh warning">',
			'optional--',
			"//a[contains(@href,'warserver.cz/slozka')]"
			);
		}
		if (GM_getValue("Check_euroshare_dot_eu_links", false))
		{
			addFileHost(
			"euroshare\\.eu\/file\/\\d+",
			'STIAHNUTIE<\/h1>\\s*<p>\\s*<span',
			'STIAHNUTIE<\/h1>\\s*<p>\\s*<strong',
			'optional--',
			"//a[contains(@href,'euroshare.eu/file')]"
			);
		}
		if (GM_getValue("Check_datafilehost_dot_com_links", false))
		{
			addFileHost(
			"datafilehost\\.com\/download-\\d+\\w+\\.html",
			'dldtable">',
			'does not exist\\.',
			'optional--',
			"//a[contains(@href,'datafilehost.com/download-')]"
			);
		}
		if (GM_getValue("Check_files_dot_mail_dot_ru_links", false))
		{
			addFileHost(
			'files\\.mail\\.ru/(?:\\w*)',
			'fileList',
			'errorMessage',
			'optional--',
			"//a[contains(@href,'files.mail.ru')]"
			);
		}
		if (GM_getValue("Check_megashares_dot_com_links", false))
		{
			addFileHost(
			"(?:d\\d+\.|)megashares\.com\/(?:dl|index\.php\\?d|\\?d\\d+=\\w+)",
			'Filesize',
			'Invalid|deleted|Could not download file',
			'slots|scheduled maintenance',
			"//a[contains(@href,'megashares.com/')]"
			);
		}
		if (GM_getValue("Check_narod_dot_ru_links", false))
		{
			addFileHost(
			'narod\\.(?:yandex\\.|)ru\/disk\/',
			'b-submit',
			'b-download-virus-note|headCode">404<',
			'Внутренняя ошибка сервиса',
			"//a[contains(@href,'narod.ru') or contains(@href,'narod.yandex.ru')]"
			);
		}
		if (GM_getValue("Check_rapidshare_dot_com_links", false))
		{
			addFileHost(
			"rapidshare\\.de\/files",
			'Choose download-type',
			'alert|not found',
			'optional--',
			"//a[contains(@href,'rapidshare.de/files/')]"
			);
		}
		if (GM_getValue("Check_rayfile_dot_com_links", false))
		{
			addFileHost(
			"rayfile\\.com\/",
			'FILEtitleTXT',
			'blueRow',
			'optional--',
			"//a[contains(@href,'rayfile.com/') and contains(@href,'files')]"
			);
		}
		if (GM_getValue("Check_filesmonster_dot_com_links", false))
		{
			addFileHost(
			"filesmonster\\.com\/download\\.php\\?id=\\w+",
			'button_green_body"',
			'error">',
			'optional--',
			"//a[contains(@href,'filesmonster.com/download')]"
			);
		}
		if (GM_getValue("Check_dotavi_dot_com_links", false))
		{
			addFileHost(
			"dotavi\\.com\/\\w+\/.",
			'download\\-file">',
			'col-1">\\s*<h1>',
			'optional--',
			"//a[contains(@href,'dotavi.com/')]"
			);
		}
		if (GM_getValue("Check_usaupload_dot_net_links", false))
		{
			addFileHost(
			'usaupload\\.net\/d\/(?:\w*)',
			'<strong>File size:</strong>',
			'is not available',
			'optional--',
			"//a[contains(@href,'usaupload.net/d/')]"
			);
		}
		if (GM_getValue("Check_sendspace_dot_com_links", false))
		{
			addFileHost(
			'sendspace\\.com\/file\/\\w+',
			'file_description',
			'msg error"',
			'optional--',
			"//a[contains(@href,'sendspace.com/file')]"
			);
		}
		if (GM_getValue("Check_sendspace_dot_pl_links", false))
		{
			addFileHost(
			'sendspace\\.pl\/file\/\\w+',
			'download_file"',
			'Podany plik nie',
			'optional--',
			"//a[contains(@href,'sendspace.pl/file')]"
			);
		}
		if (GM_getValue("Check_uploading_dot_com_links", false))
		{
			addFileHost(
			'uploading\\.com\/(?:\\w\\w\/|)files\/\\w+',
			'download_method">',
			'file_error">',
			'optional--',
			"//a[contains(@href,'uploading.com/') and contains(@href, 'files')]",
			true
			);
		}
		if (GM_getValue("Check_gigasize_dot_com_links", false))
		{
			addFileHost(
			'gigasize\\.com\/get\\.php\/\\d+',
			'fileId"',
			'error">',
			'optional--',
			"//a[contains(@href,'gigasize.com/get')]"
			);
		}
		if (GM_getValue("Check_bitroad_dot_net_links", false))
		{
			addFileHost(
			'bitroad\\.net\/download\/(?:.*?)/(?:.*?)\.html',
			'btn_2',
			'not found',
			'optional--',
			"//a[contains(@href,'bitroad.net/download')]"
			);
		}
		if (GM_getValue("Check_good_dot_com_links", false))
		{
			addFileHost(
			'good\\.net\/(?:_|dl)',
			'Free Download',
			'Not Found',
			'Forbidden',
			"//a[contains(@href,'good.net')]"
			);
		}
		if (GM_getValue("Check_2shared_dot_com_links", false))
		{
			addFileHost(
			'2shared\\.com\/(?:file|video)\/\\w*',
			'File size',
			'File not found|is not valid',
			'optional--',
			"//a[contains(@href,'2shared.com/file/') or contains (@href,'2shared.com/video/')]"
			);
		}
		if (GM_getValue("Check_ziddu_dot_com_links", false))
		{
			addFileHost(
			'ziddu\\.com\/download',
			'downloadfilelinkicon',
			'fontfamilyverdana error',
			'optional--',
			"//a[contains(@href,'ziddu.com/download')]"
			);
		}
		if (GM_getValue("Check_turboupload_dot_com_links", false))
		{
			addFileHost(
			'turboupload\\.com\/\\w*',
			'You have requested',
			'File Not Found',
			'optional--',
			"//a[contains(@href,'turboupload.com')]"
			);
		}
		if (GM_getValue("Check_up_dash_file_dot_com_links", false))
		{
			addFileHost(
			'up-file\\.com\/download\/\\w*',
			'Download the file',
			'is not found',
			'optional--',
			"//a[contains(@href,'up-file.com/download')]"
			);
		}
		if (GM_getValue("Check_gigapeta_dot_com_links", false))
		{
			addFileHost(
			'gigapeta\\.com\/dl\/',
			'Download file|Скачать файл| Herunterzuladen|Scarica il file|Cargar el fichero|Charger le fichier',
			'404|page_error',
			'optional--',
			"//a[contains(@href,'gigapeta.com/dl')]"
			);
		}
		if (GM_getValue("Check_getthebit_dot_com_links", false))
		{
			addFileHost(
			'getthebit\\.com/f/\\w*',
			'Вы выбрали файл',
			'не найден',
			'optional--',
			"//a[contains(@href,'getthebit.com')]"
			);
		}
		if (GM_getValue("Check_vip_dash_file_dot_com_links", false))
		{
			addFileHost(
			'vip-file\\.com\/download.*?\/(?:.*?)\/(?:.*?)\\.html',
			'fast_download_form">',
			'<p style="text-align:center">',
			'optional--',
			"//a[contains(@href,'vip-file.com/download')]"
			);
		}
		if (GM_getValue("Check_letitbit_dot_net_links", false))
		{
			addFileHost(
			'letitbit\\.net\/download\/\\w+',
			'download\\-pnl ',
			'color:#000">|Запрашиваемый файл не найден|страница не существует|File not found|',
			'optional--',
			"//a[contains(@href,'letitbit.net/download')]"
			);
		}
		if (GM_getValue("Check_ifolder_dot_ru_links", false))
		{
			addFileHost(
			'ifolder\.ru\/\\d+',
			'file-info',
			'ui-state-error',
			'optional--',
			"//a[contains(@href,'ifolder.ru')]"
			);
		}
		if (GM_getValue("Check_filesend_dot_net_links", false))
		{
			addFileHost(
			'filesend\.net\/download',
			'buttdl',
			'File removed',
			'Error',
			"//a[contains(@href,'filesend.net/download')]"
			);
		}
		if (GM_getValue("Check_enigmashare_dot_com_links", false))
		{
			addFileHost(
			'enigmashare\\.com\/\\w+',
			'tbl12',
			'width:500px;text-align:left',
			'optional--',
			"//a[contains(@href,'enigmashare.com/')]"
			);
		}
		if (GM_getValue("Check_fileswap_dot_com_links", false))
		{
			addFileHost(
			'fileswap\\.com\/dl\/\\w+',
			'bttnDownloadLink"',
			'rounded_block_error">',
			'is temporary unavailable|disponible en estos momentos|vorläufig unerreichbar|Файл временно недоступен',
			"//a[contains(@href,'fileswap.com/dl')]"
			);
		}
		if (GM_getValue("Check_getzilla_dot_net_links", false))
		{
			addFileHost(
			'getzilla\\.net\/files\/\\d+',
			'free_download_url',
			'caption orange">Файл не найден',
			'optional--',
			"//a[contains(@href,'getzilla.net/files')]"
			);
		}
		if (GM_getValue("Check_extabit_dot_com_links", false))
		{
			addFileHost(
			'(?:u\\d+\\.)?extabit\\.com\/(?:file|folder|go)\/\\w+',
			'download Extabit.com - file hosting</title>',
			'Extabit.com - file hosting</title>',
			'optional--',
			"//a[contains(@href,'extabit.com/')]",
			true
			);		
		}
		if (GM_getValue("Check_solidfiles_dot_com_links", false))
		{
			addFileHost(
			'solidfiles\\.com\/d\/\\w+',
			'id="download"',
			'>Not found<',
			'optional--',
			"//a[contains(@href,'solidfiles.com/d')]"
			);
		}
		if (GM_getValue("Check_shareflare_dot_net_links", false))
		{
			addFileHost(
			'shareflare\\.net\/download\/',
			'download-pnl',
			'File not found|ĐźĐľĐ¸ŃĐş Đ·ĐµŃ€ĐşĐ°Đ»Đ° Đ˝Đ° Ń„Đ°',
			'optional--',
			"//a[contains(@href,'shareflare.net/download')]"
			);
		}
		if (GM_getValue("Check_uploadmachine_dot_com_links", false))
		{
			addFileHost(
			"uploadmachine\.com\/file\/\\d+",
			'Downloading the file',
			'not found|404 Error',
			'optional--',
			"//a[contains(@href,'uploadmachine.com/file')]"
			);
		}
		if (GM_getValue("Check_uloz_dot_to_links", false))
		{		
			addFileHost(
			"(?:uloz|ulozto|bagruj|zachowajto)\\.(to|cz|sk|net|pl)\/\\w",
			'fileDownload">|fileSize">',
			'grayButton deletedFile">|Stránka nenalezena|upload-button"|jako soukromý.',
			'passwordProtectedFile">|frmaskAgeForm-disagree',
			"//a[contains(@href,'bagruj.cz') or contains(@href,'uloz.to') or contains(@href,'ulozto.') or contains(@href,'zachowajto.pl')]",
			true
			);
		}
		if (GM_getValue("Check_hellspy_dot_com_links", false))
		{
			addFileHost(
			"hellspy\.(?:com|cz|sk|hu|pl)\/\\w+",
			'file\\-list-orderby|section-filedetail">',
			'<\/span><\/h2>\\s*<p>|list-purp-2">|flash info sticky">',
			'optional--',
			"//a[contains(@href,'hellspy.')]"
			);
		}
		if (GM_getValue("Check_leteckaposta_dot_cz_links", false))
		{
			addFileHost(
			"(?:leteckaposta\\.cz|sharegadget\\.com)\/\\d+",
			'<body onload="">',
			'neexistuje|not exist',
			'optional--',
			"//a[contains(@href,'leteckaposta.cz') or contains(@href,'sharegadget.com')]"
			);
		}
		if (GM_getValue("Check_stahovanizasms_dot_cz_links", false))
		{
			addFileHost(
			"stahovanizasms\\.cz\/\\w+",
			'download\\.png>|font-size:11px><tr>',
			'smaz.n u.ivatelem|font-size:11px><\/table>',
			'optional--',
			"//a[contains(@href,'stahovanizasms.cz')]"
			);
		}
		if (GM_getValue("Check_share_dash_links_dot_biz_links", false))
		{
			addFileHost(
			"share-links\\.biz\/\\w*",
			'online\\.gif',
			'(?:offline|parts)\\.gif',
			'optional--',
			"//a[contains(@href,'share-links.biz')]"
			);
		}
		if (GM_getValue("Check_4shared_dot_com_links", false))
		{
			addFileHost(
			"4shared\\.com\/.+\/",
			'btnLink"|vlist">',
			'class="warn\"|big red"',
			'Service Unavailable',
			"//a[contains(@href,'4shared.com')]"
			);
		}
		if (GM_getValue("Check_zippyshare_dot_com_links", false))
		{
			addFileHost(
			"(?:www\\d+\.|)zippyshare\.com\/v\/\\d+\/file\.html",
			'download\.png|Download Now|dlbutton"',
			'not exist',
			'optional--',
			"//a[contains(@href,'zippyshare.com') and contains(@href,'file.html')]"
			);
		}
		if (GM_getValue("Check_speedshare_dot_org_links", false))
		{
			addFileHost(
			"speedshare\.org\/.+",
			'class=\"dbtn\"',
			'Error',
			'optional--',
			"//a[contains(@href,'speedshare.org')]"
			);
		}
		if (GM_getValue("Check_mediafire_dot_com_links", false))
		{
			addFileHost(
			"mediafire\.com\/",
			'Download',
			'error\\.php\\?|error_msg_title">',
			'set to private',
			"//a[contains(@href,'mediafire.com')]"
			);
		}
		if (GM_getValue("Check_uploaded_dot_to_links", false))
		{
			addFileHost(
			'(?:uploaded\\.(?:to|net)\/(?:.id|file|folder|410|404))|(?:ul\\.to\/)',
			'download" class="center|right:20px" class="file">',
			'box_red|Error: 404|Error: 410|fileList"><thead><tr><td colspan="2"><\/td><\/tr><\/thead><tbody>\\s*<tr>',
			'optional--',
			"//a[contains(@href,'uploaded.to/') or contains(@href,'uploaded.net/') or contains(@href,'ul.to/')]"
			);
		}
		if (GM_getValue("Check_webshare_dot_cz_links", false))
		{
			addFileHost(
			"webshare\.cz\/\\w+-.*",
			'download_big.gif',
			'not found|Soubor nenalezen.',
			'optional--',
			"//a[contains(@href,'webshare.cz')]"
			);
		}
		if (GM_getValue("Check_ulozisko_dot_sk_links", false))
		{
			addFileHost(
			"ulozisko\.sk\/",
			'Detaily',
			'neexistuje',
			'optional--',
			"//a[contains(@href,'ulozisko.sk')]"
			);
		}
		if (GM_getValue("Check_speedfile_dot_cz_links", false))
		{
			addFileHost(
			"speedfile\.cz\/(?:cs\/|en\/|sk\/|)\\d+\/",
			'Stáhnout|<span>Download',
			'error|soubor byl odst|This file was deleted',
			'optional--',
			"//a[contains(@href,'speedfile.cz')]"
			);
		}
		if (GM_getValue("Check_upnito_dot_sk_links", false))
		{
			addFileHost(
			"(?:dl.\\.|)upnito\\.sk\/(download|subor|file)",
			'download.php',
			'notfound|upload\\-suborov\\.php"',
			'optional--',
			"//a[contains(@href,'upnito.sk')]"
			);
		}
		if (GM_getValue("Check_cobrashare_dot_sk_links", false))
		{
			addFileHost(
			"cobrashare\\.(?:sk|net)\/downloadFile\\.php",
			'class=\"popis\"',
			'nenach.dza',
			'optional--',
			"//a[contains(@href,'cobrashare.') and contains(@href,'/downloadFile')]"
			);
		}
		if (GM_getValue("Check_dataport_dot_cz_links", false))
		{
			addFileHost(
			"dataport\.cz\/file\/",
			'premium_download">',
			'="error">',
			'optional--',
			"//a[contains(@href,'dataport.cz/file')]",
			true
			);
		}
		if (GM_getValue("Check_czshare_dot_com_links", false))
		{
			addFileHost(
			"czshare\\.com\/(?:\\d+\/\\w*|download_file\.php|files\/\\d+\/\\w*|error\\.php\\?co=\\d+)",
			'page-download',
			'Soubor nenalezen|byl smazán|identifikován jako warez|chybě při uploadu|Soubor expiroval|výpadek databáze',
			'optional--',
			"//a[contains(@href,'czshare.com/')]"
			);
		}
		if (GM_getValue("Check_coolshare_dot_cz_links", false))
		{
			addFileHost(
			"coolshare\\.cz\/stahnout\/\\w+",
			'<li>Velikost:',
			'Soubor nenalezen',
			'optional--',
			"//a[contains(@href,'coolshare.cz/stahnout/')]"
			);
		}
		if (GM_getValue("Check_gigaup_dot_fr_links", false))
		{
			addFileHost(
			"gigaup\\.fr\/\\?g=\\w+",
			'Taille de',
			'Vous ne pouvez|existe pas',
			'optional--',
			"//a[contains(@href,'gigaup.fr/')]"
			);
		}
		if (GM_getValue("Check_sharecash_dot_org_links", false))
		{
			addFileHost(
			"sharecash\\.org\/download\\.php\\?file=\\d+",
			'FILE DOWNLOAD<',
			'File Does Not Exist',
			'optional--',
			"//a[contains(@href,'sharecash.org/download.php')]"
			);
		}
		if (GM_getValue("Check_depositfiles_dot_com_links", false))
		{
			addFileHost(
			"depositfiles\\.com\/folders\/\\w+",
			'<div class="progressContainer">',
			'<div id="files" class="files">\\s*<\/div>',
			'optional--',
			"//a[contains(@href,'depositfiles.com/folders')]"
			);
		}
////////////////////////////////////////////////////////////////////////////
		if (GM_getValue("Check_divxden_dot_com_links", false))
                        {
                                  addFileHost(
                                  "(?:divxden|vidxden|vidbux)\.com\/\\w+",
                                  'Please help us fight abusers and automated views.',
                                  'No such file or the file has been removed',
                                  'maintenance mode',
                                  "//a[contains(@href,'divxden.com') or contains(@href,'vidxden.com') or contains(@href,'vidbux.com/')]",
				   true
			);
		}
		if (GM_getValue("Check_uploadc_dot_com_links", false))
                {
                            addFileHost(
                            "(?:uploadc|zalaa)\\.com\/\\w+",
                            'Slow access">|download2">',
                            'File Not Found|file has been removed',
                            'maintenance mode',
                            "//a[contains(@href,'uploadc.com/') or contains(@href,'zalaa.com/')]",
			    true
                            );
         	}
		if (GM_getValue("Check_veehd_dot_com_links", false))
		{
			addFileHost(
			'veehd\.com\/video\/.*?',
			'videoHolder">',
			'Featured Videos',
			'optional--',
			"//a[contains(@href,'veehd.com') and contains(@href,'video')]",
			true
			);
		}
		if (GM_getValue("Check_filenuke_dot_com_links", false))
          	{
                	 addFileHost(
                	 "filenuke\\.com\/\\w+",
                	 't_Download-file">',
                	 'File Not Found|file has been removed',
                	 'maintenance mode',
                	 "//a[contains(@href,'filenuke.com/')]",	
                	 true 
			);
          	}
		if (GM_getValue("Check_vidbull_dot_com_links", false))
            	{
                      addFileHost(
                      "vidbull\\.com\/\\w+",
                      'http://vidbull.com/\\w+\\.html</textarea>',
                      'http://vidbull.com/.html</textarea>',
                      'maintenance mode',
                      "//a[contains(@href,'vidbull.com/')]",
		      true
                      );
            	}
       		if (GM_getValue("Check_stagevu_dot_com_links", false))
       		{
            		addFileHost(
            		'stagevu\.com\/video\/.*?',
            		'vidbox">',
            		'Featured Videos',
            		'optional--',
            		"//a[contains(@href,'stagevu.com') and contains(@href,'video')]",
			true
            		);
        	}
        	if (GM_getValue("Check_movdivx_dot_com_links", false))
            	{
                      addFileHost(
                      "movdivx\\.com\/\\w+",
                      'download1">',
                      'File Not Found|file has been removed',
                      'maintenance mode',
                      "//a[contains(@href,'movdivx.com/')]",
		       true
                      );
            	}
		if (GM_getValue("Check_bitupload_dot_com_links", false))
            	{
                      addFileHost(
                      "bitupload\\.com\/\\w+",
                      'ol-limited-content">',
                      'File Not Found|file has been removed',
                      'maintenance mode',
                      "//a[contains(@href,'bitupload.com/')]",
		      true
                      );
            	}
		if (GM_getValue("Check_nosupload_dot_com_links", false))
		{
			addFileHost(
			"(?:nosupload|nosvideo)\\.com\/(?:\\?d=|\\?v=)?\\w+",
			'download1">',
			'File Not Found|file has been removed',
			'maintenance mode',
			"//a[contains(@href,'nosupload.com/') or contains(@href,'nosvideo.com/')]",
			true
			);
		}
		if (GM_getValue("Check_sharerepo_dot_com_links", false))
            	{
                      addFileHost(
                      "sharerepo\\.com\/\\w+",
                      'download1">',
                      'File Not Found|file has been removed',
                      'maintenance mode',
                      "//a[contains(@href,'sharerepo.com/')]",
		      true
                      );
            	}
		if (GM_getValue("Check_videozed_dot_net_links", false))
            	{
                      addFileHost(
                      "videozed\\.net\/\\w+",
                      'download1">|download2">',
                      '<Title>Download </Title>|File Not Found|file has been removed',
                      'maintenance mode',
                      "//a[contains(@href,'videozed.net/')]",
		      true
                      );
            	}
		if (GM_getValue("Check_movshare_dot_net_links", false))
		{
			addFileHost(
			"movshare\\.net\\/video\\/\\w+",
			'mediaspace">',
			'no longer exists|has been removed',
			'maintenance mode',
			"//a[contains(@href,'movshare.net/video')]",
			true
			);
		}
		if (GM_getValue("Check_allmyvideos_dot_net_links", false))
            	{
                      addFileHost(
                      "allmyvideos\\.net\/\\w+",
                      'div-download0">',
                      'err">|File Not Found|file has been removed',
                      'maintenance mode',
                      "//a[contains(@href,'allmyvideos.net/')]",
		      true
                      );
            	}
		if (GM_getValue("Check_nowvideo_dot_eu_links", false))
		{
			addFileHost(
			"nowvideo\\.(?:eu|co|ch|sx)\\/video\\/\\w+",
			'mediaspace">',
			'no longer exists|has been removed',
			'maintenance mode',
			"//a[contains(@href,'nowvideo.eu/video') or contains(@href,'nowvideo.co/video') or contains(@href,'nowvideo.ch/video') or contains(@href,'nowvideo.sx/video')]",
			true
			);
		}
		if (GM_getValue("Check_vureel_dot_com_links", false))
		{
			addFileHost(
			"vureel\\.com\\/video\\/\\w+",
			'videoPlayer">|flashvars"',
			'no longer exists|has been removed',
			'maintenance mode',
			"//a[contains(@href,'vureel.com/video')]",
			true
			);
		}
		if (GM_getValue("Check_donevideo_dot_com_links", false))
		{
			addFileHost(
			"donevideo\\.com\/\\w+",
			'download1">',
			'<h2>Watch Video</h2>|File Not Found|file was removed',
			'maintenance mode',
			"//a[contains(@href,'donevideo.com')]",
			true
			);
		}
		if (GM_getValue("Check_flashx_dot_tv_links", false))
		{
			addFileHost(
			"flashx\\.tv\\/video\\/\\w+",
			'normal_player_cont">',
			'cb_error">|Requested page not found',
			'maintenance mode',
			"//a[contains(@href,'flashx.tv')]",
			true
			);
		}
		if (GM_getValue("Check_played_dot_to_links", false))
		{
			addFileHost(
			"played\\.to\/\\w+",
			'download1">',
			'no longer exists|file was removed',
			'maintenance mode',
			"//a[contains(@href,'played.to')]",
			true
			);
		}
		if (GM_getValue("Check_faststream_dot_in_links", false))
		{
			addFileHost(
			"faststream\\.in\/\\w+",
			'download1">',
			'File Not Found|The file expired|The file was deleted',
			'maintenance mode',
			"//a[contains(@href,'faststream.in')]",
			true
			);
		}
		if (GM_getValue("Check_novamov_dot_com_links", false))
		{
			addFileHost(
			"novamov\\.com\\/(?:video\\/|player\\.php\\?v=)\\w+",
			'<title>Watch|mediaspace">',
			'<title>NovaMov|no longer exists|file was removed|not been watched',
			'maintenance mode',
			"//a[contains(@href,'novamov.com/')]",
			true
			);
		}
		if (GM_getValue("Check_videoweed_dot_es_links", false))
		{
			addFileHost(
			"videoweed\\.es\\/file\\/\\w+",
			'mediaspace">',
			'no longer exists|has been removed',
			'maintenance mode',
			"//a[contains(@href,'videoweed.es/file')]",
			true
			);
		}
		if (GM_getValue("Check_videobam_dot_com_links", false))
		{
			addFileHost(
			"videobam\\.com\/\\w+",
			'video-js-box">',
			'not found',
			'optional--',
			"//a[contains(@href,'videobam.com')]",
			true
			);
		}
		if (GM_getValue("Check_clicktoview_dot_org_links", false))
		{
			addFileHost(
			"clicktoview\\.org\/\\w+",
			'download1">',
			'File Not Found|file was removed',
			'maintenance mode',
			"//a[contains(@href,'clicktoview.org')]",
			true
			);
		}
		if (GM_getValue("Check_sockshare_dot_com_links", false))
		{
			addFileHost(
			"sockshare\\.(?:com|ws)\/file\/\\w+",
			'choose_speed">',
			'Welcome to SockShare|<!-- removed -->|Share Files Easily on SockShare',
			'optional--',
			"//a[contains(@href,'sockshare.com/file') or contains(@href,'sockshare.ws/file')]",
			true
			);
		}
		if (GM_getValue("Check_movpod_dot_in_links", false))
		{
			addFileHost(
			"movpod\\.(?:in|net)\/\\w+",
			'countdown_str">',
			'Not Found|file was removed',
			'optional--',
			"//a[contains(@href,'movpod.in') or contains(@href,'movpod.net')]",
			true
			);
		}
		if (GM_getValue("Check_youwatch_dot_org_links", false))
		{
			addFileHost(
			"youwatch\\.org\/\\w+",
			'download1">',
			'Not Found|file was removed',
			'maintenance mode',
			"//a[contains(@href,'youwatch.org/')]",
			true
			);
		}
		if (GM_getValue("Check_limevideo_dot_net_links", false))
		{
			addFileHost(
			"limevideo\\.net\/\\w+",
			'download1">',
			'Not Found|file was removed',
			'maintenance mode',
			"//a[contains(@href,'limevideo.net')]",
			true
			);
		}
		if (GM_getValue("Check_project-free-upload_dot_com_links", false))
		{
			addFileHost(
			"project-free-upload\\.com\/\\w+",
			'download1">',
			'File Not Found|file was removed',
			'maintenance mode',
			"//a[contains(@href,'project-free-upload.com/')]",
			true
			);
		}
		if (GM_getValue("Check_filebox_dot_com_links", false))
		{
			addFileHost(
			"filebox\\.com\/\\w+",
			'download2">',
			'Not Found|file was removed',
			'maintenance mode',
			"//a[contains(@href,'filebox.com/')]",
			true
			);
		}
		if (GM_getValue("Check_daclips_dot_in_links", false))
		{
			addFileHost(
			"daclips\\.(?:in|com)\/\\w+",
			'head_title">Please wait while we verify your request</span>',
			'head_title">404 - File Not Found</span>',
			'optional--',
			"//a[contains(@href,'daclips.in') or contains(@href,'daclips.com')]",
			true
			);
		}
		if (GM_getValue("Check_epicshare_dot_net_links", false))
		{
			addFileHost(
			"(?:epicshare|uncapped-downloads)\\.(?:net|com)\/\\w+",
			'download2">',
			'Not Found|file was removed',
			'maintenance mode',
			"//a[contains(@href,'epicshare.net/') or contains(@href,'uncapped-downloads.com/')]",
			true
			);
		}
		if (GM_getValue("Check_uploadhero_dot_com_links", false))
		{
			addFileHost(
			"uploadhero\\.(?:com|co)\/(?:v|dl)\/\\w*",
			'id="player">|Free user',
			'download is not available|file was removed',
			'optional--',
			"//a[contains(@href,'uploadhero.com/v/') or contains(@href,'uploadhero.com/dl/') or contains(@href,'uploadhero.co/v/') or contains(@href,'uploadhero.co/dl/')]",
			true
			);
		}
		if (GM_getValue("Check_vidstream_dot_in_links", false))
		{
			addFileHost(
			"vidstream\\.in\/\\w+",
			'download1">',
			'File Not Found|file was removed',
			'maintenance mode',
			"//a[contains(@href,'vidstream.in/')]",
			true
			);
		}
            	if (GM_getValue("Check_xvidstage_dot_com_links", false))
                {
                        addFileHost(
                        "xvidstage\\.com\/\\w+",
                        'file_slot"',
                        'File Not Found|Reason for deletion:',
                        'optional--',
                        "//a[contains(@href,'xvidstage.com/')]",
			true
                        );
                }
		if (GM_getValue("Check_mp4upload_dot_com_links", false))
		{
			addFileHost(
			"mp4upload\\.com/\\w+",
			'download2">',
			'File Not Found|file was removed',
			'maintenance mode',
			"//a[contains(@href,'mp4upload.com/')]",
			true
			);
		}
		if (GM_getValue("Check_movzap_dot_com_links", false))
		{
			addFileHost(
			"movzap\\.com/\\w+",
			'download2">',
			'File Not Found|file was removed|has been removed',
			'maintenance mode',
			"//a[contains(@href,'movzap.com/')]",
			true
			);
		}
		if (GM_getValue("Check_hdplay_dot_com_links", false))
		{
			addFileHost(
			"hdplay\\.com/\\w+",
			'Download</a>',
			'File Not Found|file was removed|has been removed|Hdplay. Store Share Enjoy!</title>',
			'maintenance mode',
			"//a[contains(@href,'hdplay.com/')]",
			true
			);
		}
		if (GM_getValue("Check_muchupload_dot_com_links", false))
		{
			addFileHost(
			"muchupload\\.com\/\\w+",
			'download1">',
			'Not Found|file was removed',
			'maintenance mode',
			"//a[contains(@href,'muchupload.com/')]",
			true
			);
		}
		if (GM_getValue("Check_bestreams_dot_net_links", false))
		{
			addFileHost(
			"bestreams\\.net\/\\w+",
			'download1">',
			'File Not Found|file was deleted',
			'maintenance mode',
			"//a[contains(@href,'bestreams.net')]",
			true
			);
		}
		if (GM_getValue("Check_mightyupload_dot_com_links", false))
		{
			addFileHost(
			"mightyupload\\.com\/\\w+",
			'download2">|btn_download|.(?:mp4|avi|mkv|flv)</h3>',
			'File Not Found|No such file with this filename',
			'maintenance mode',
			"//a[contains(@href,'mightyupload.com')]",
			true
			);
		}
		if (GM_getValue("Check_vidplay_dot_net_links", false))
		{
			addFileHost(
			"vidplay\\.net\/\\w+",
			'download2">',
			'File Not Found|file was deleted',
			'maintenance mode',
			"//a[contains(@href,'vidplay.net')]",
			true
			);
		}
		if (GM_getValue("Check_lemuploads_dot_com_links", false))
		{
			addFileHost(
			"lemuploads\\.com\/\\w+",
			'download2">',
			'File Not Found|file was deleted',
			'maintenance mode',
			"//a[contains(@href,'lemuploads.com')]",
			true
			);
		}
		if (GM_getValue("Check_megarelease_dot_org_links", false))
		{
			addFileHost(
			"megarelease\\.org\/\\w+",
			'download2">',
			'File Not Found|file was deleted',
			'maintenance mode',
			"//a[contains(@href,'megarelease.org')]",
			true
			);
		}
		if (GM_getValue("Check_pastebin_dot_com_links", false))
		{
			addFileHost(
			"pastebin\\.com\/\\w+",
			'- Pastebin.com</title>',
			'Pastebin.com Unknown Paste ID</title>',
			'optional--',
			"//a[contains(@href,'pastebin.com')]",
			true
			);
		}
		if (GM_getValue("Check_mooshare_dot_biz_links", false))
		{
			addFileHost(
			"mooshare\\.biz\/\\w+",
			'download1">|flvplayer|videopage|player_code">|flvplayer_wrapper">',
			"Video Not Found or Deleted|The file was deleted by administration",
			'optional--',
			"//a[contains(@href,'mooshare.biz')]",
			true
			);
		}
		if (GM_getValue("Check_sharesix_dot_com_links", false))
		{
			addFileHost(
			"sharesix\\.com\/\\w+",
			'download2">|btn_download|flvplayer|player_code">|flashvars',
			"Video Not Found or Deleted|The file was deleted by administration",
			'optional--',
			"//a[contains(@href,'sharesix.com')]",
			true
			);
		}
		if (GM_getValue("Check_fleon_dot_me_links", false))
		{
			addFileHost(
			"(?:fleon|skylo)\\.me\/\\w+",
			'head_title">|btn-box">',
			'404 File was removed|file was deleted',
			'maintenance mode',
			"//a[contains(@href,'fleon.me') or contains(@href,'skylo.me')]",
			true
			);
		}
		if (GM_getValue("Check_billionuploads_dot_com_links", false))
		{
			addFileHost(
			"billionuploads\\.com/\\w+|(?:new|old)\\.billionuploads\\.com",
			'download2">',
			'File Not Found|File Not found|File was removed|file was removed|The file was',
			'maintenance mode',
			"//a[contains(@href,'billionuploads.com/')]",
			true
			);
		}
		if (GM_getValue("Check_vidspot_dot_net_links", false))
		{
			addFileHost(
			"vidspot\\.net/\\w+",
			'download1">|(?:mp4|avi|flv|mkv)</Title>',
			'File Not Found|file expired|file was deleted|Reason for deletion:',
			'maintenance mode',
			"//a[contains(@href,'vidspot.net')]",
			true
			);
		}
		if (GM_getValue("Check_mojoload_dot_com_links", false))
		{
			addFileHost(
			"mojoload\\.com/\\w+",
			'<h3> Watch or|Download File </h3>|download1">',
			'<title>File Not Found|File Not Found',
			'maintenance mode',
			"//a[contains(@href,'mojoload.com')]",
			true
			);
		}
		if (GM_getValue("Check_junocloud_dot_me_links", false))
		{
			addFileHost(
			"junocloud\\.me/\\w+",
			'download1">',
			'File Not Found|file expired|file was deleted',
			'maintenance mode',
			"//a[contains(@href,'junocloud.me')]",
			true
			);
		}
		if (GM_getValue("Check_fileom_dot_com_links", false))
		{
			addFileHost(
			"fileom\\.com/\\w+",
			'download1">',
			'File Not Found|file expired|file was deleted',
			'maintenance mode',
			"//a[contains(@href,'fileom.com')]",
			true
			);
		}
		if (GM_getValue("Check_box_dot_com_links", false))
    		{
      			addFileHost(
      			"box\\.(?:com|net)\/(?:s|shared|public)\/\\w+",
      			'<div class="gallery"',
      			'This shared file or folder link has been removed|>404 File Not Found<',
      			'optional--',
      			"//a[(contains(@href,'box.com') or contains(@href,'box.net/')) and (contains(@href,'/s/') or contains(@href,'/shared/') or contains(@href,'/public/'))]"
      );
   		 }
		if (GM_getValue("Check_v-vids_dot_com_links", false))
		{
			addFileHost(
			"v-vids\\.com\\w+",
			'btn_download|download2">',
			'File Not Found|file expired|file was deleted',
			'optional--',
			"//a[contains(@href,'v-vids.com')]",
			true
			);
		}
		if (GM_getValue("Check_uploadnetwork_dot_eu_links", false))
		{
			addFileHost(
			"uploadnetwork\\.eu\\w+",
			'btn_download|download2">',
			'File Not Found|file expired|file was deleted',
			'optional--',
			"//a[contains(@href,'uploadnetwork.eu')]",
			true
			);
		}
		if (GM_getValue("Check_vshare_dot_eu_links", false))
		{
			addFileHost(
			"vshare\\.eu\\w+",
			'Videoname:</b>|download2">',
			'File is no longer available!|No such file or the file has been removed',
			'optional--',
			"//a[contains(@href,'vshare.eu')]",
			true
			);
		}
		if (GM_getValue("Check_divxhosting_dot_net_links", false))
		{
			addFileHost(
			"divxhosting\\.net\/watch-\\w+\\.html",
			'- DivX Hosting</title>|divx">|vlc">|download">',
			'<title>404 Error|video not found. It may have been deleted',
			'optional--',
			"//a[contains(@href,'divxhosting.net')]",
			true
			);
		}
		if (GM_getValue("Check_dizzcloud_dot_com_links", false))
		{
			addFileHost(
			"dizzcloud\\.com\/dl\/\\w+",
			'Choose your download method</h1>|FREE DOWNLOAD</a>|File:</div>',
			'File not found|404',
			'optional--',
			"//a[contains(@href,'dizzcloud.com/')]",
			true
			);
		}
		if (GM_getValue("Check_filezy_dot_net_links", false))
		{
			addFileHost(
			"filezy\\.net/\\w+",
			'download1">|Continue to video">|(?:rar|zip|mp4|avi|mkv|flv)</title>',
			'File Not Found|file expired|file was deleted',
			'optional--',
			"//a[contains(@href,'filezy.net')]",
			true
			);
		}
		if (GM_getValue("Check_speedfiles_dot_net_links", false))
		{
			addFileHost(
			"speedfiles\\.net/\\w+",
			'Free"|download1">',
			'File Not Found|file expired|file was deleted',
			'optional--',
			"//a[contains(@href,'speedfiles.net')]",
			true
			);
		}
		if (GM_getValue("Check_videopremium_dot_net_links", false))
		{
			addFileHost(
			"videopremium\\.(?:net|tv)\/\\w+",
			'download1">',
			'no longer exists|has been removed|The requested file is not available|Page not found',
			'optional--',
			"//a[contains(@href,'videopremium.net') or contains(@href,'videopremium.tv')]",
			true
			);
		}
		if (GM_getValue("Check_dailymotion_dot_com_links", false))
		{
			addFileHost(
			"dailymotion\\.com/video/\\w+|dailymotion\\.com/video\/\\w+\\?start=\\d+\\w+",
			'player_box span-8" id="player_box">',
			'<title>Dailymotion – 404 Not Found</title>|<title>Dailymotion - Watch, publish, share videos</title>|<title>Dailymotion – 410 Page Gone</title>|<div id="player_box">',
			'optional--',
			"//a[contains(@href,'dailymotion.com')]",
			true
			);
		}
		if (GM_getValue("Check_bayfiles_dot_com_links", false))
		{
			addFileHost(
			"bayfiles\\.(?:com|net)\/file\/\\w+\/\\w+",
			'download\\-header">|id="download-header">',
			'class="not-found">',
			'optional--',
			"//a[contains(@href,'bayfiles.com/file') or contains(@href,'bayfiles.net/file')]",
			true
			);
		}
		if (GM_getValue("Check_video_dot_tt_links", false))
		{
			addFileHost(
			"video\\.tt/watch_video.php?\\?v=\\w+|video\\.tt/video/\\w+",
			'videoPlayer">',
			'error_alert">',
			'optional--',
			"//a[contains(@href,'video.tt/')]",
			true
			);
		}
		if (GM_getValue("Check_royalvids_dot_eu_links", false))
		{
			addFileHost(
			"royalvids\\.eu/\\w+|royalvids\\.eu/tt/\\w+",
			'download2">',
			'File not found|The file expired|The file was deleted',
			'optional--',
			"//a[contains(@href,'royalvids.eu/')]",
			true
			);
		}
		if (GM_getValue("Check_180upload_dot_com_links", false))
		{
			addFileHost(
			"(?:180upload\\.com\/\\w+|180upload\\.com\/\\w+\/\\w+)|(?:180upload\\.nl\/\\w+|180upload\\.nl\/\\w+\/\\w+)",
			'download1">|download2">',
			'Not Found|file was removed',
			'maintenance mode',
			"//a[contains(@href,'180upload.com/') or contains(@href,'180upload.nl/')]",
			true
			);
		}
		if (GM_getValue("Check_cloudzer_dot_net_links", true))
		{
			addFileHost(
			"cloudzer\\.net\/file\/\\w+",
			'download-header free">',
			'<title>cloudzer.net</title>',
			'optional--',
			"//a[contains(@href,'cloudzer.net/')]"
			);
		}
		if (GM_getValue("Check_share-online_dot_biz_links", true))
		{
			addFileHost(
			"(?:share-online\\.biz|egoshare\\.com)\/(?:dl\/\\w+|download\\.php\\?id=\\w+)",
			'Please choose your download package</h1>',
			'Download impossible</h1>',
			'optional--',
			"//a[contains(@href,'share-online.biz') or contains(@href,'egoshare.com')]"
			);
		}
		if (GM_getValue("Check_depositfiles_dot_com_links", true))
		{
			addFileHost(
			"dfiles\\.(?:eu|ru|com)\/files\/\\w+",
			'<b>File Download</b>',
			'no_download_message">',
			'optional--',
			"//a[contains(@href,'dfiles.eu') or contains(@href,'dfiles.ru') or contains(@href,'dfiles.com')]"
			);
		}
		if (GM_getValue("Check_1fichier_dot_com_links", true))
		{
			addFileHost(
			"\\w{6}\\.(?:1fichier|dl4free)\\.com\/|1fichier.com\/en\/dir\/\\w+",
			'>File name :|>Nom du fichier :|Download the file" />|charger le fichier" />|Shared Folder',
			'<title>File not found</title>|<title>Fichier introuvable</title>|<title>Host your files !</title>|<br>Shared Folder Not Found',
			'optional--',
			"//a[contains(@href,'1fichier.com/') or contains(@href,'dl4free.com/')]"
			);
		}
		if (GM_getValue("Check_filefactory_dot_com_links", true))
		{
			addFileHost(
			"filefactory\\.com\/(:?f|file)\/\\w+",
			'folderFileList">|download_links">|container-fluid">',
			'table class="items"|Pointer" class="red">|alert_message">',
			'optional--',
			"//a[contains(@href,'filefactory.com/')]"
			);
		}
		if (GM_getValue("Check_muchshare_dot_net_links", true))
		{
			addFileHost(
			"muchshare\\.net\/\\w+",
			'download1">|Proceed to Video">',
			'File Not Found|file was|width: 500px; text-align: left;',
			'maintenance mode',
			"//a[contains(@href,'muchshare.net')]"
			);
		}
		if (GM_getValue("Check_ultramegabit_dot_com_links", true))
		{
			addFileHost(
			"ultramegabit\\.com\/file\/details\/[\\w+-]",
			'>Your download is ready<',
			'>File has been deleted.<',
			'btn-large btn-danger">',
			"//a[contains(@href,'ultramegabit.com/file')]"
			);
		}
		if (GM_getValue("Check_vreer_dot_com_links", true))
		{
			addFileHost(
			"vreer\\.com\/\\w+",
			'download1">|Proceed to Video',
			'File Not Found|file was',
			'maintenance mode',
			"//a[contains(@href,'vreer.com')]"
			);
		}
		if (GM_getValue("Check_mixturecloud_dot_com_links", true))
		{
			addFileHost(
			"mixturecloud\\.com\\/media\\/\\w+",
			'Download</a>',
			"you can't access to this file.",
			'optional--',
			"//a[contains(@href,'mixturecloud.com/media')]"
			);
		}
		if (GM_getValue("Check_thefile_dot_me_links", true))
		{
			addFileHost(
			"thefile\\.me\/\\w+\\#|thefile\\.me\/\\w+",
			'download1">|Proceed to Video',
			'File Not Found|file was',
			'maintenance mode',
			"//a[contains(@href,'thefile.me')]"
			);
		}
		if (GM_getValue("Check_videoslasher_dot_com_links", true))
		{
			addFileHost(
			"videoslasher\\.com\\/video\\/\\w+|videoslasher\\.com\\/embed\\/\\w+",
			'<title>VideoSlasher - |VideoSlasher.com</title>|embed_code_text_box',
			'File Not Found|does not exist or has been removed|404|Not found</title>',
			'maintenance mode',
			"//a[contains(@href,'videoslasher.com')]"
			);
		}
		if (GM_getValue("Check_hugefiles_dot_net_links", true))
		{
			addFileHost(
			"hugefiles\\.net\/\\w+",
			'download1">',
			'File Not Found|File Not Found</b>|file was removed',
			'maintenance mode',
			"//a[contains(@href,'hugefiles.net')]"
			);
		}
		if (GM_getValue("Check_gorillavid_dot_com_links", true))
		{
			addFileHost(
			"gorillavid\\.(?:com|in)\/\\w+",
			'<title>GorillaVid',
			'404 - Not Found</title>|File Not Found',
			'optional--',
			"//a[contains(@href,'gorillavid.com') or contains(@href,'gorillavid.in')]"
			);
		}
		if (GM_getValue("Check_hostingbulk_dot_com_links", true))
		{
			addFileHost(
			"hostingbulk\\.com\/\\w+",
			'download2" />|download2">',
			'File Not Found|no longer exists|has been removed',
			'maintenance mode',
			"//a[contains(@href,'hostingbulk.com')]"
			);
		}
		if (GM_getValue("Check_promptfile_dot_com_links", true))
		{
			addFileHost(
			"promptfile\\.com\\/l\\/\\w+",
			'Continue to File|Continue</button>',
			'does not exist or has been removed|File Not Found',
			'maintenance mode',
			"//a[contains(@href,'promptfile.com')]"
			);
		}
		if (GM_getValue("Check_davvas_dot_com_links", true))
		{
			addFileHost(
			"davvas\\.com\/\\w+",
			'download1">',
			'does not exist or has been removed|File Not Found',
			'maintenance mode',
			"//a[contains(@href,'davvas.com')]"
			);
		}
		if (GM_getValue("Check_nowdownload_dot_ch_links", true))
		{
			addFileHost(
			"nowdownload\\.ch\\/download\\.php\\?id=\\w+",
			'REGULAR DOWNLOAD">',
			'does not exist or has been removed|File Not Found',
			'maintenance mode',
			"//a[contains(@href,'nowdownload.ch')]"
			);
		}
		if (GM_getValue("Check_divxstage_dot_eu_links", true))
		{
			addFileHost(
			"divxstage\\.eu\\/video\\/\\w+|divxstage\\.eu\\/file\\/\\w+",
			'mediaspace">',
			'DivxStage - The stage is yours!</title>',
			'optional--',
			"//a[contains(@href,'divxstage.eu')]"
			);
		}
		if (GM_getValue("Check_vidup_dot_me_links", true))
                {
                            addFileHost(
                            "(?:vidup|vidto)\\.me\/\\w+",
                            'download1">|download-private">',
                            'could not be found|does not exist or has been removed|File Not Found',
                            'maintenance mode',
                            "//a[contains(@href,'vidup.me/') or contains(@href,'vidto.me/')]"		
                            );
         	}
		if (GM_getValue("Check_veevr_dot_com_links", true))
		{
			addFileHost(
			"veevr\\.com\\/videos\\/\\w+",
			'nothumb">',
			'Page not found on Veevr</title>',
			'optional--',
			"//a[contains(@href,'veevr.com')]"
			);
		}
		if (GM_getValue("Check_yourupload_dot_com_links", true))
		{
			addFileHost(
			"yourupload\\.com/watch/\\w+|yourupload\\.com/file/\\w+",
			'class="watch"|Download</a>',
			'File Not Found',
			'maintenance mode',
			"//a[contains(@href,'yourupload.com/')]"
			);
		}
		if (GM_getValue("Check_veoh_dot_com_links", true))
		{
			addFileHost(
			"veoh\\.com/watch/\\w+",
			'veoh-video-player">|content="video" >',
			'veoh-video-player-error veoh-video-player">|<title></title>',
			'optional--',
			"//a[contains(@href,'veoh.com')]"
			);
		}
		if (GM_getValue("Check_youtube_dot_com_links", true))
		{
			addFileHost(
			"youtube\\.com/watch\\?v=\\w+|youtube.com/watch\\?feature=player_embedded&v=\\w+",
			' - YouTube</title>',
			'<title>YouTube</title>|This video is unavailable.|This video is no longer available due to a copyright claim|Sorry about that.',
			'optional--',
			"//a[contains(@href,'youtube.com')]"
			);
		}
		if (GM_getValue("Check_rapidgator_dot_net_links", true))
		{
			addFileHost(
			"(?:rapidgator\\.net|rg\\.to)\/file\/\\w+",
			'<title>Download|Downloading:',
			'<title>File not found',
			'optional--',
			"//a[contains(@href,'rapidgator.net') or contains(@href,'rg.to')]"
			);
		}
		if (GM_getValue("Check_sharexvid_dot_com_links", true))
        	{
          		addFileHost(
            		"sharexvid\\.com\/\\w+",
            		'Download Link</h2>|download2">',
            		'The file expired|was deleted|File Not Found|removed|No such file',
            		'optional--',
            		"//a[contains(@href,'sharexvid.com/')]"
            		);
        	}
		if (GM_getValue("Check_vidzbeez_dot_com_links", true))
        	{
          		addFileHost(
            		"vidzbeez\\.com\/\\w+",
            		'btn_download|download2">',
            		'The file expired|was deleted|File Not Found|removed|No such file',
            		'optional--',
            		"//a[contains(@href,'vidzbeez.com/')]"
            		);
        	}
		if (GM_getValue("Check_streamin_dot_to_links", true))
        	{
          		addFileHost(
            		"streamin\\.to\/\\w+",
            		'download1">|btn_download">',
            		'The file expired|was deleted|File Not Found|removed|No such file',
            		'optional--',
            		"//a[contains(@href,'streamin.to')]"
            		);
        	}
		if (GM_getValue("Check_vodlocker_dot_com_links", true))
        	{
          		addFileHost(
            		"vodlocker\\.com\/\\w+",
            		'download1">|btn_download">',
            		'The file expired|was deleted|File Not Found|removed|No such file',
            		'optional--',
            		"//a[contains(@href,'vodlocker.com')]"
            		);
        	}
		if (GM_getValue("Check_uptobox_dot_com_links", true))
        	{
          		addFileHost(
            		"uptobox\\.com\/\\w+",
            		'download1">|Free Download">',
            		'The file expired|was deleted|File Not Found|removed|No such file',
            		'optional--',
            		"//a[contains(@href,'uptobox.com')]"
            		);
        	}
		if (GM_getValue("Check_vidzi_dot_tv_links", true))
        	{
          		addFileHost(
            		"vidzi\\.tv\/\\w+",
            		'download1">|countdown_str">|vplayer',
            		'The file expired|was deleted|File Not Found|removed|No such file',
            		'optional--',
            		"//a[contains(@href,'vidzi.tv')]"
            		);
        	}
		if (GM_getValue("Check_uploadsat_dot_com_links", true))
        	{
          		addFileHost(
            		"uploadsat\\.com\/\\w+",
            		'download1">|Free Download">',
            		'The file expired|was deleted|File Not Found|removed|No such file',
            		'optional--',
            		"//a[contains(@href,'uploadsat.com')]"
            		);
        	}
		if (GM_getValue("Check_thevideo_dot_me_links", true))
        	{
          		addFileHost(
            		"thevideo\\.me\/\\w+",
            		'download1">|btn_download">',
            		'The file expired|was deleted|File Not Found|removed|No such file',
            		'optional--',
            		"//a[contains(@href,'thevideo.me')]"
            		);
        	}
		if (GM_getValue("Check_cloudyvideos_dot_com_links", true))
        	{
          		addFileHost(
            		"cloudyvideos\\.com\/\\w+",
            		'download1">|btn_download">',
            		'The file expired|was deleted|File Not Found|removed|No such file',
            		'optional--',
            		"//a[contains(@href,'cloudyvideos.com')]"
            		);
        	}
		if (GM_getValue("Check_uploadable_dot_ch_links", true))
        	{
          		addFileHost(
            		"uploadable\\.ch\/file\/\\w+",
            		'download|Slow Download',
            		'The file expired|was deleted|File Not Found|removed|No such file',
            		'optional--',
            		"//a[contains(@href,'uploadable.ch')]"
            		);
        	}
	}
} //end of function start