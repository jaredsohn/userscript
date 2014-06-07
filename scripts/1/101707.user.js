// ==UserScript==
// @name			W.A.R. Links Checker
// @description		Automatically checks links from 250+ unique filehostings.
// @details			Based on popular Rapidshare Links Checker, this script automatically checks links from 250+ unique filehostings. For Firefox, Chrome, Safari. 
// @namespace		http://userscripts.org/scripts/show/101707
// @version			1.2.3.9
// @license			GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @author			<a href="http://userscripts.org/users/302353">dkitty</a> | <a href="http://userscripts.org/users/430723">shmoula</a>
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
// @usoscript		101707
// ==/UserScript==


//separate alternative domains with "|" char (first name is considered being main)
var allHostNames = ["1fichier.com|dl4free.com","2download.de","2shared.com","4fastfile.com","4shared.com","adrive.com",
"bayfiles.com","bezvadata.cz","bitroad.net","bitshare.com","burnupload.com|burnupload.ihiphop.com","cobrashare.sk","coolshare.cz",
"cramit.in|cramitin.net","czshare.com","dataport.cz","datei.to|sharebase.to","daten-hoster.de|filehosting.org|xtraupload.de","demo.ovh.com","depositfiles.com","divshare.com",
"divxden.com","dotavi.com","easy-share.com|crocko.com","easybytez.com","edisk.cz","enigmashare.com","erofly.cz","euroshare.eu","extabit.com",
"eyesfile.com","ezyfile.net","fastshare.cz","fiberupload.com|bulletupload.com","file-bit.net","file4sharing.com","filefactory.com",
"filefat.com","fileflyer.com","filerio.com|filekeen.com","filemashine.com","filemonster.net",
"files.mail.ru","files.to","filedino.com","fileduct.com","filepost.com|fp.io","filesend.net","fileserver.cc","filesflash.com",
"fileshare.in.ua","filesmonster.com","filestore.to","filevelocity.com","filezpro.com","freakshare.net",
"free.fr","free-uploading.com","gamefront.com|filefront.com","getthebit.com","gettyfile.ru","gigapeta.com","gigasize.com","gigaup.fr","glumbo.com|glumbouploads.com",
"goldfile.eu","good.com","grupload.com","hellshare.com","hellspy.com","hipfile.com","hitfile.net","hostuje.net",
"hotfile.com","hulkshare.com","hyperfileshare.com","filecloud.io|ifile.it","ifolder.ru","jumbofiles.com","k2files.com",
"leteckaposta.cz|sharegadget.com","letitbit.net","load.to","loombo.com","mediafire.com","megafileupload.com","megashare.com","megashares.com",
"mojedata.sk","mojofile.com","movshare.net","muchshare.net","multishare.cz","myupload.dk","narod.ru|narod.yandex.ru","netload.in","ok2upload.com",
"openfile.ru","ovfile.com","partage-facile.com","plunder.com","putlocker.com",
"qshare.com","queenshare.com","quickshare.cz","rapidgator.net","rapidshare.com","rapidshare.ru", "daj.to",
"rapidupload.sk","rarefile.net","rayfile.com","rghost.net","sendmyway.com", "4savefile.com",
"sendspace.com","sharecash.org","share-links.biz","share-now.net","share-online.biz|egoshare.com",
"share-rapid.com|sharerapid.cz|rapids.cz|share-credit.cz|share-central.cz|share-ms.cz|share-net.cz|srapid.cz",
"shareflare.net","cloudnator.com|shragle.com","slingfile.com","sms4file.com","solidfiles.com","space4file.com","speedfile.cz",
"speedshare.org","stahovanizasms.cz","stahuj.to","storage.novoro.net","syfiles.com|sharerun.com","tufiles.ru","turbobit.net",
"turboupload.com","ugotfile.com","uloz.to|ulozto.cz|bagruj.cz|zachowajto.pl","ulozisko.sk","uloziste.com","unibytes.com","up-file.com",
"upload-il.net|przeslij.net","uploadbin.net","uploaded.to|ul.to","uploading.com","uploadmachine.com", "uploadjet.net",
"uploadspace.pl","upnito.sk","uptobox.com","usaupload.net","veehd.com","videobb.com","videozer.com",
"vip-file.com","webshare.cz","xdisk.cz","yunfile.com|filemarkets.com","ziddu.com",
"zippyshare.com", "ryushare.com", "uploading4u.eu", "premiuns.org", "rodfile.com", "migahost.com", "wikiupload.com", "uploadstube.de",
"flyfiles.net", "nowdownload.eu", "dark-uploads.com", "asfile.com", "prefiles.com", "vidhog.com", "axifile.com", 
"upthe.net", "hackerbox.org", "sharefiles.co", "amonshare.com", "uploadorb.com", "data.hu", "filestay.com", "uploadboost.com",
"filegag.com", "hulkfile.com", "uptorch.com", "netkups.com", "vreer.com", "edoc.com", "isavelink.com", "anonstream.com", "upfile.biz",
"uppit.com|up.ht", "shafiles.me", "peejeshare.com", "sharpfile.com", "ddlstorage.com", "downloadani.me", "batshare.com", "filesabc.com",
"sharebeast.com", "sharebees.com", "filemates.com", "180upload.com", "verzend.be", "asixfiles.com", "zomgupload.com", "mlfat4arab.com",
"movreel.com", "4up.me", "extmatrix.com", "gigfiles.net", "i-filez.com", "sendfiles.nl", "yourfilestore.com", "filebig.net", "fileupup.com",
"sockshare.com", "share76.com", "filebox.com", "4bytez.com", "nekaka.com", "file4safe.com", "freeuploads.fr|uploa.dk", "tusfiles.net",
"kupload.org", "bzlink.us", "1hostclick.com", "filemac.com", "files2k.eu", "coraldrive.net", "idup.in", "bitbonus.com", "aieshare.com",
"xfileshare.eu", "luckyshare.net", "uploadic.com", "fileswap.com", "potload.com", "clouds.to", "billionuploads.com", "rockdizfile.com",
"getzilla.net", "holderfile.com", "pigsonic.com", "brontofile.com", "cloudnxt.net", "nosupload.com", "fileking.co",
"filehost.ws", "fileupped.com", "filesbb.com", "maxshare.pl", "fileserving.com", "filesin.com", "novafile.com", "longfiles.com",
"fireuploads.net", "filetechnology.com", "filecosy.com", "lumfile.com", "toucansharing.com", "filesega.com", "uploadhero.com", "uploadbaz.com",
"unextfiles.com", "stahovadlo.cz", "zooupload.com", "warserver.cz", "247upload.com", "datafilehost.com", "bitupload.com", "fileza.net",
"fileprohost.com", "indowebster.com", "superload.cz", "filelaser.com", "sharefilehost.com", "mafiastorage.com", "filerose.com",
"ultramegabit.com", "limelinx.com", "ihostia.com", "uploadoz.com", "squillion.com", "shareupload.com", "ubuntuone.com", "uload.to", 
"henchfile.com", "minus.com", "filesmelt.com", "hellupload.com", "packupload.com", "uploadingit.com", "stiahni.si", "filefolks.com",
"filedefend.com", "sendspace.pl", "fastshare.org", "venusfile.com", "cyberlocker.ch", "filesector.cc", "fileduct.net", "upgrand.com",
"filestrum.com", "fileuplo.de", "upaj.pl", "sinhro.net", "filedownloads.org", "egofiles.com", "filestore.com.ua", "uploadcore.com",
"upafile.com", "secureupload.eu"];

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
var allContainerNames = ["adf.ly","cing.be","linkcrypt.ws","linksafe.me","linksave.in","linkto.net","madlink.sk","multiload.cz",
"mirrorcreator.com","ncrypt.in","redi.re","relink.us","safelinking.net","theloo.katt.it","bit.ly"];

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
"zupload.com", "mytempdir.com", "onionshare.com", "stahnu.to", "oron.com", "badongo.com","filereactor.com","filegaze.com"];	

// GM_log(allHostNames.length);
// GM_log(allContainerNames.length);
// GM_log(allObsoleteNames.length);

var firstRun = GM_getValue("First_run", true);

allHostNames.sort();
allContainerNames.sort();
allObsoleteNames.sort();

var RAND_STRING = "8QyvpOSsRG3QWq";
var DEBUG_MODE = false;

var TOOLTIP_MAXWIDTH = 600; //in pixels
var TOOLTIP_THUMBWIDTH = 200;
		
var containers_processed = false;

//settings for keyboard functions start
var CHECK_ALL_LINKS_KEY = "A";
var CONFIGURATION_KEY = "C";
var copy_to_dead_key = "D";
var toggle_autocheck_key = "W";
var first_key_keycode = '17'; // 18=ALT 16=Shift 17=Ctrl 32=SPACE_BAR 9=TAB
var first_key_keycodename = 'CTRL';
var second_key_keycode = '18';
var second_key_keycodename = 'ALT';
var CHECK_ALL_LINKS_KEYCODE = CHECK_ALL_LINKS_KEY.charCodeAt(0);
var CONFIGURATION_KEYCODE = CONFIGURATION_KEY.charCodeAt(0);
var copy_to_dead_keycode = copy_to_dead_key.charCodeAt(0);
var toggle_autocheck_keycode = toggle_autocheck_key.charCodeAt(0);
//settings for keyboard functions end

//global settings start
var Show_black_background_in_DL_links, Show_line_through_in_dead_links, Color_DL_links;
var Live_links_color, Dead_links_color, Temp_unavailable_links_color, Ref_anonymize_service;
var Do_not_linkify_DL_links, Keyboard_functions, Autocheck;
var Show_progress_stats, Display_tooltip_info, Icon_set;
var Progress_box_pos_bottom, Progress_box_pos_right, Progress_box_opacity, Progress_box_background_color, Progress_box_item_color;
var Progress_box_refresh_rate;
var Obsolete_file_hosts;

var messageBox = document.createElement('b'); // top-left message box

var cLinksTotal = 0;
var cLinksDead = 0;
var cLinksAlive = 0;
var cLinksUnava = 0;
var cLinksProcessed = 0;

var intervalId; //for updateProgress()

//icon resources
var PAW_ICON_GREEN = 	'data:image/png;base64,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';
var PAW_ICON_RED = 		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIDSURBVHjabJLNaxNRFMXPe2/mzSSZznQ2xXxBQsykLVqp1VLQP8B0USy4cSG4KG4sUkpdiLhyIUjXClVcqwhKJS4EDQp+gIuiod3YotaUlpZaoeZrpnnXhaaNH2d5OL8L954r0CYBJM85zp3lnR2qEi0AgKfrpx0h+reU+oD/6YzdcZ96e+l5PK4A7Bs0zSu+59GnVIokY0dbOd7GsD5pDEApDJkmk4xNXnTdSZ1zhDmHAJJ/Qy4AKvl+FYyBMwbJ2Imc1B0AeFOvoUa0tAu5gh97kUh8mXLd4r3t7ZdzlQqKtSp+KDX7ulZnNaVw/dtWEcDnMGOHATCcsqy71NNDlMtRv2HcAHAJwGUA0Bib6hKiAGC0EIuVNzIZ8qQc1z4GQQXNJsA5hkwzP9dopAXQldL1k0tBMLPebE6PWtbTYduOgwhxIQ7y943Graubm/iuFOZ9f+2AlBML6dTKYjr98FkisRJm/PwRw+gD51j1fbyt10ut3YYjjN2OatqDjUyGyPOIslmi7m56FIvS8VAoeJdK0UgksgjAZm0nTz+Jx+bzVkcISu25nGOkXC49rlRmAMwCWN7tacAwruUj1h7Afs8jwoXOTq8F/FGuJ+UhCAHwX9bXIIBPBAiBqCYMAIP/vFCE8/Exx149a9vrWSlfMWA6qWmFMcdZ26/rNwGEW9mfAwA9h7IJU7NC2gAAAABJRU5ErkJggg==';
var PAW_ICON_YELLOW =	'data:image/png;base64,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';
		
var RSLC_ICON_GREEN = 	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hYFAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vyIKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSsL2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13ZpdyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaYehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQRj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk146BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noHXccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC';
var RSLC_ICON_RED = 	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQCY6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVksDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2NsLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmRQHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC';
var RSLC_ICON_YELLOW = 	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AQJDBgxYO68rwAAAZNJREFUeNptkr9LW1EcxT/3GhOTKIG8QTpm8B8IIoJTFkFwsXVyUaxFJHYoFzJYUVFHn4sKtoidCoKtIigWOtQOhRKowaFzJwcF0VeJ+fFe7nUwP57R7/S9nO+595z7PQJfGUgAsWqPaUBOC/yrHQI+QjKTXc7GQq4EhP+uKzdUcbtnelvhDzXQQHL2bCkbxhOA5GmZ24LUC73zPWE4lQYSmexynaCmjh5Nq9FdANER1uL9j7nfeUhIIFaVJNXEPrguKvPzgfD2G0iBGt8DkPG4CGiIyapZAWBvDUEoBOfnqPQxaANxC3v7Ze1hoQFpmsTbGwMQicLNNeTz2HaKYuO/4DnTauwLeC6i8wW4ZdSbA9rw/GtB6kaPmjyESATKZVZWUxAMQqnI9MTXOqdGcvRFoSw8o+0Pg1DxsD+PcFcJYH8aphSNsr71CkAH/17danAEQAGSa98zv7x4W9AIpGkRzap18cKU3vUv9lmQq6N5SH7cSZ8Uuqx205SI1rPL/6/HN1MW5GiKC84z2at6dixf9u4B/PqUtJuX27QAAAAASUVORK5CYII=';

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

function linkify(totalourls)
{ // code from http://userscripts.org/scripts/review/2254  Linkify ting
		
	var regexy = "";
	var ikkeTilladteTags = [];
	
	if (Allow_spaces_in_DL_links)
		regexy = "(?:http:\/\/.+?\\?)?(?:https?:\/\/)?(?:www\\.)?(?:" + totalourls + ")[\\w\\–\\-\\.+$!*\\/\\(\\)\\[\\]\',~%?:@#&=\\\\\\—;\\u0020…×Ã\\_\\u0080-\\u03FF’‘]*";
	else
		regexy = "(?:http:\/\/.+?\\?)?(?:https?:\/\/)?(?:www\\.)?(?:" + totalourls + ")[\\w\\–\\-\\.+$!*\\/()\\[\\]\',~%?:@#&=\\\\\\—;…×Ã\\_\\u0080-\\u03FF’‘]*";

	if (Do_not_linkify_DL_links)
		ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea', 'span']; //tags, hvor det der stAÎžâ€™Î’ÂĄr inden i ikke skal vAÎžâ€™Î’Â¦re links
	else
		ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea']; //tags, hvor det der stAÎžâ€™Î’ÂĄr inden i ikke skal vAÎžâ€™Î’Â¦re links

	var regex = new RegExp(regexy, "g");
	var textNode, muligtLink;

	var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") + ") and contains(.,'/')]";
	var textNodes = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var i = textNodes.snapshotLength;
	
	while (i--)
	{
		textNode = textNodes.snapshotItem(i);

		muligtLink = textNode.nodeValue; //all links on page

		var myArray = null;
		
		if (regex.test(muligtLink))
		{
			//til at holde det nye link, og teksten omkring det
			var span = document.createElement('span');
			var lastLastIndex = 0;
			regex.lastIndex = 0;
			var myArray = null;

			while (myArray = regex.exec(muligtLink))
			{
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
				
				
				lastLastIndex = regex.lastIndex;
			}

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
	
		alive_link_png = "";
		adead_link_png = "";
		unava_link_png = "";
		
		switch(Icon_set)
		{
		//no icons
		case 0:	break;
		
		// cat paws
		case 1:	alive_link_png = PAW_ICON_GREEN;
				adead_link_png = PAW_ICON_RED;
				unava_link_png = PAW_ICON_YELLOW;
				break;
		
		// classic RSLC look
		case 2: alive_link_png = RSLC_ICON_GREEN;
				adead_link_png = RSLC_ICON_RED;
				unava_link_png = RSLC_ICON_YELLOW;
				break;
		
		// cat paws
		default:alive_link_png = PAW_ICON_GREEN;
				adead_link_png = PAW_ICON_RED;
				unava_link_png = PAW_ICON_YELLOW;
				break;
		}
		
		processing_link_gif = 'data:image/gif;base64,' + // or temporary anavailable
		'R0lGODlhCgAKAJEDAMzMzP9mZv8AAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAADACwAAAAACgAKAAACF5wncgaAGgJzJ647cWua4sOBFEd62VEAACH5BAUAAAMALAEAAAAIAAMAAAIKnBM2IoMDAFMQFAAh+QQFAAADACwAAAAABgAGAAACDJwHMBGofKIRItJYAAAh+QQFAAADACwAAAEAAwAIAAACChxgOBPBvpYQYxYAIfkEBQAAAwAsAAAEAAYABgAAAgoEhmPJHOGgEGwWACH5BAUAAAMALAEABwAIAAMAAAIKBIYjYhOhRHqpAAAh+QQFAAADACwEAAQABgAGAAACDJwncqi7EQYAA0p6CgAh+QQJAAADACwHAAEAAwAIAAACCpRmoxoxvQAYchQAOw%3D%3D';

		var dead_color_css, live_color_css, unava_color_css, black_background_css;

		if (Color_DL_links)
		{
			dead_color_css = 'color:' + Dead_links_color + ' !important;';
			live_color_css = 'color:' + Live_links_color + ' !important;';
			unava_color_css = 'color:' + Temp_unavailable_links_color + ' !important;';
			container_color_css = 'color:' + Container_links_color + ' !important;';
		}
		else
		{
			dead_color_css = live_color_css = unava_color_css = container_color_css = '';
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

		GM_addStyle(".alive_link {background:transparent url(" + alive_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;" + live_color_css + black_background_css + "}");
		GM_addStyle(".adead_link {background:transparent url(" + adead_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;" + dead_color_css + black_background_css + line_through_css + "}");
		GM_addStyle(".unava_link {background:transparent url(" + unava_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;" + unava_color_css + black_background_css + "}");
		GM_addStyle(".processing_link {background:transparent url(" + processing_link_gif + ") no-repeat scroll 100% 50%;padding-right:15px;" + container_color_css + black_background_css + "}");
		GM_addStyle(".container_link {background:transparent url(" + processing_link_gif + ") no-repeat scroll 100% 50%;padding-right:15px;" + container_color_css + black_background_css + "}");
		GM_addStyle(".container_list {font-size:90%; list-style-type:square; padding: 0px 5% 0px; margin: 0px}");
	}
}

var warlcTooltip = null;
var mouseoverLink = null; //link href with mouse cursor over it

var lastX = 0;
var	lastY = 0;

$(document).ready(initTooltip);
	
//inits tooltip	
function initTooltip()
{	warlcTooltip = document.createElement("div");
	warlcTooltip.setAttribute("style", "background: #EAEAEA; box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);padding: 6px 6px 6px 6px; border-radius:2px; border:2px solid #6699CC; color:#000000;font-family:Verdana,sans-serif;font-size:11px;position:absolute;z-index:1000; max-width: " + TOOLTIP_MAXWIDTH + "px;");
	warlcTooltip.style.visibility = "hidden";
		
	document.body.appendChild(warlcTooltip);
}	

//"mousemove" event handler for all links
function moveTooltip(event)
{
	if ((Math.abs(lastX - event.clientX) + Math.abs(lastY - event.clientY)) < 6)
	{	//no need to reflow if the cursor moved just a little
		return;
	}
	else
	{
		lastX = event.clientX;
		lastY = event.clientY;
	}

	posX = event.clientX + window.pageXOffset + 10;
	posY = event.clientY + window.pageYOffset;
	
	var ttHeight = warlcTooltip.offsetHeight;
	var ttFreeSpace = window.innerHeight - event.clientY;
	
	if (ttHeight > ttFreeSpace)
	{	//prevents tooltip from getting out of the window
		posY -= (ttHeight - (ttFreeSpace)) + 10;
	}
	else
	{
		posY += 7;
	}
	
	warlcTooltip.style.top = posY + "px";
	warlcTooltip.style.left = posX + "px";	
}

//"mouseout" event handler for all links
function hideTooltip(){
	warlcTooltip.style.visibility = "hidden";
	mouseoverLink = null;
}	


//"mouseover" event handler for dead links
//displays tooltip error message on dead links 
function displayTooltipError()
{
	mouseoverLink = this.href;	
	
	this.addEventListener("mouseout", hideTooltip);
	this.addEventListener("mousemove", function(event) { moveTooltip(event); });
	
	warlcTooltip.innerHTML = '<b>LOADING...</b>';
	warlcTooltip.style.minWidth = 0;
	warlcTooltip.style.visibility = "visible";
	
	if (this.warlc_error) //an error message is already known and stored in warlc_error attribute
	{
		warlcTooltip.innerHTML = this.warlc_error;
	}
	else
	{
		loadErrorInfo(this);
	}
	
	function loadErrorInfo(link)
	{
		var href = link.href;
		
		href = href.replace(/quickshare\.cz\/.+/, "quickshare.cz/chyba");
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: href.replace(Ref_anonymize_service, ""),
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/xml',
				'Referer': ""
			},
			onload: function(result) {
				var res = result.responseText;
				
				//TODO: errorRegexs - 
				var errorRegexs = 	[	//generic error messages follow
										/(empty directory)/i,
										/(soubor nebyl nalezen)/i,
										/((?:file|page|link|folder)(?:is|not|does|has been|was| ){1,}(?:found|available|blocked|exists?|deleted|removed))/i,
																				
										//server specific error messages follow
										/msg error" style="cursor: default">(.+?)<\/div>/, //sendspace
										/color:red;font\-weight:bold;border\-style:dashed;font-size:12px;border\-width:2px;><tr><td align=center>(.+?)<\/td>/, //fastshare
										/errorIcon">\s*<p><strong>(.+?)<br \/>/, //filefactory
										/no_download_msg">\s*(.+?)<span/, //depositfiles
										/(Takový soubor neexistuje. Je možné, že byl již smazán.)/, //quickshare
										/file_info file_info_deleted">\s*<h1>(.+?)<\/h1>/, //filepost
										/<br \/>\s*<p style="color:#000">(.+?)<\/p>\s*<\/center>/, //letitbit
										/(?:error_div">|<\/h1><p>)<strong>(.+?)<\/strong>/, //share-rapid,quickshare
										/class="red">(.+?)<(?:span|br)>/, //czshare, megashares
										/class="wp640">\s*<h1 class="h1">(.+?)<\/h1>/, //uloz.to
										/download_file">\s*<tr>\s*<td>(.+?)<\/td>/, //hotfile
										/error\.gif" \/>\s*(.+?)\s*<\/div>/, //uploading.com
										/not-found">\s*<p>(.+?)<\/p>/, //bayfiles
										/(Your file could not be found. Please check the download link.)/, //stahnu.to
										/error_msg">\s*(<h3>.+?<\/h3><ul>(.+?)<\/ul>)/, //edisk
										/id="obsah">\s*<h2>(.+?)<\/h2>/, //euroshare
										/error">\s*(?:<[bp]>)?\s*(.+?)<\/[bp]>/, //filesmonster, shragle, gigapeta
										/center aC">\s*<h1>(.+?)<br \/>/, //uploaded.to
										/icon_err">\s*<h1>(.+?)<\/h1>/, //filejungle
										/Code: ER_NFF_\d+<\/h2>\s*(.+?)\s*<\/div>/, //netload
										/(File has been removed due to Copyright Claim)/, //filerio
										
									];
				var errorIdx = errorRegexs.length;
				
				var error = "Cause of error: <b>unknown</b>";
				var errorCandidate = "";
				while(errorIdx--)
				{
					var errorCandidate = res.match(errorRegexs[errorIdx]);
					if (errorCandidate != null)
					{
						error = "Cause of error: <b>" + errorCandidate[1].replace(/&nbsp;/g," ") + "</b>";
						break;
					}
				}
				
				//link attributes 
				link.warlc_error = error;				
				
				if (mouseoverLink == link.href) //mouse cursor is still over the link
				{
					warlcTooltip.innerHTML = error;
				}
			}
		});
	}
}

//"mouseover" event handler for alive links
//displays tooltip info (file size, file name,...) on alive links 
function displayTooltipInfo()
{
	mouseoverLink = this.href;
	
	//exclude direct download filehostings
	if (this.href.match(/(?:uloziste\.com|filemonster\.net|uploadbin\.net|loombo\.com|adrive\.com|myupload\.dk|storage\.novoro\.net|ubuntuone.com)/))
	{
		return;
	}
	
	this.addEventListener("mouseout", hideTooltip);
	this.addEventListener("mousemove", function(event) { moveTooltip(event); });
	
	warlcTooltip.innerHTML = '<b>LOADING...</b>';
	warlcTooltip.style.minWidth = 0;
	warlcTooltip.style.visibility = "visible";
	
	if (this.warlc_tooltipcache) //file size is already known and stored in warlc_filename and warlc_filesize attributes
	{
		warlcTooltip.innerHTML = this.warlc_tooltipcache;
	}
	else
	{
		loadInfo(this);		
	}
	
	function loadInfo(link)
	{
		var href = link.href;
		href = href.replace(/.*rapidshare\.com\/files\/(\d+)\/(.+)/, 'http://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=checkfiles&cbf=rapidshare_com&cbid=1&files=$1&filenames=$2');
		href = href.replace(/.*rapidshare\.com\/#!download\|\w+\|(\d+)\|([^|]+).*/, 'http://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=checkfiles&cbf=rapidshare_com&cbid=1&files=$1&filenames=$2');
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: href.replace(Ref_anonymize_service, ""),
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/xml',
				'Referer': ""
			},
			onload: function(result) {
					
				var res = result.responseText;
				
				var nameRegexs = 	[	/Filename: <b class="f_arial f_14px">(.+?)<\/b>/, //oron
										/(?:finfo|file[-_]?name)">\s*(.+?)<\/?(?:h1|a|div|span style|td)/, //hellshare, uploaded.to, netload, badongo, 4fastfile
										/fl" title="(.+?)">/, //edisk
										/Celý název: <a href="http:\/\/czshare.com\/\d+\/\w+\/">(.+?)<\/a>/, //czshare
										/<title>\s*(?:Download)?\s*(.+?)\s*(?::: DataPort|\| Ulož|- Share\-Rapid|- WEBSITENAME|download Extabit|- download now for free|\| refile)/, //dataport, uloz.to, share-rapid, shragle, extabit, filefactory, refile.net
										/<h3>Stahujete soubor: <\/h3>\s*<div class="textbox">(.+?)<\/div>/, //webshare
										/<h3><b><span style=color:black;>(.+?)<\/b><\/h3><br>/, //fastshare
										/title="download (.+?)">/, //sendspace
										/Stáhnout soubor: (.+?)<\/h1>/, //quickshare
										/fz24">Download:\s*<strong>(.+?)<\/strong>/, //crocko
										/\w+:<\/b> (.+?)<\/h2>/, //filevelocity
										/box_heading" style="text-align:center;">(.+?) - \d+/, //freakshare
										/\w+: <b title="(.+?)">/, //depositfiles
										/'file\-icon\d+ \w+'>(?:<\/span><span>)?(.+?)<\/span>/, //hitfile, turbobit
										/d0FileName =  "(.+?)";/, //letitbit
										/file(?:_name|-info)" title="">\w+: <span>(.+?)<\/span>/, //vip-file, shareflare
										/download_file_title">(.+?)<\/div>/, //mediafire
										/rapidshare_com\(1,"\d+,([^,]+)/, //rapidshare
										/Download File" title="Download File" \/>\s*<p>\s*(.+?)<span>/, //uploading.com
										/recent-comments"><h2>(.+) &nbsp;/, //xdisk
										/fname" value="(.+?)">/, //sharerun, syfiles, grupload, 
										/download\-header">\s*<h2>File:<\/h2>\s*<p title="(.+?)">/, //bayfiles
										/description">\s*<p><b>Soubor: (.+?)<\/b>/, //bezvadata
										/Complete name                            : (.+?)<br \/>/, //bezvadata
										/itemprop="name">(.+?)<\/span>/, //bezvadata
									];
				var nameIdx = nameRegexs.length;
				
				
				//      [sizeRegexs]
				//      /    \    \?
				//   prefix (size) postfix
				//           /   \
				//          val  quant
				
				var quantRegex = '(?:M|G|K)?i?(?:B)(?:[y|i]te?s?)?';		
				var valRegex = '\\d+(?:[\\., ]\\d+){0,2}'; 				// 111([., ]222)?([., ]333)?
								
				var uniSizeRegex = valRegex + '(?:\\s*|&nbsp;)' + quantRegex;
				
				var preSizeRegex = '(?::|\\(|>|>, | - )';
				var postSizeRegex = '(?:\\))?';
				
				var sizeRegexs = 	[	 preSizeRegex + "\\s*(" + uniSizeRegex + ")\\s*" + postSizeRegex,
										'rapidshare_com\\(1,"\\d+,[^,]+,(\\d+)', //rapidshare
										'FileSize_master">(.+?)<\/strong>', //hellshare
										'Velikost: <strong>(.+?)<\/strong>', //warserver
									];
				var sizeIdx = sizeRegexs.length;
				
				//
				//
				
				var tooltip = "File Name: <b>";
				
				var fileName = "unknown";
				var nameCandidate = "";
				while(nameIdx--)
				{
					var nameCandidate = res.match(nameRegexs[nameIdx]);
					if (nameCandidate != null)
					{
						fileName = nameCandidate[1].replace(/&nbsp;/g," ");
						break;
					}
				}
				
				tooltip += fileName + "</b><br>File Size:  <b>";
				
				var fileSize = "unknown";
				var sizeCandidate = "";
				while(sizeIdx--)
				{
					sizeCandidate = res.match(new RegExp(sizeRegexs[sizeIdx], "i"));
					if (sizeCandidate != null)
					{
						fileSize = sizeCandidate[1].replace(/&nbsp;/g," ");
						if (/^\d+$/.test(fileSize) && fileSize >= 1024)  //assume bytes
						{
							if(fileSize > (1<<30)) fileSize = Math.round(10 * fileSize / (1<<30)) / 10 + ' GB';
								else if(fileSize > (1<<20)) fileSize = Math.round(fileSize / (1<<20)) + ' MB';
									else fileSize = Math.round(fileSize / 1024) + ' KB';
						}
						break;
					}
				}
				
				tooltip += fileSize + "</b>";
				
				// PROTOTYPE 
				// video thumbnails
				if (href.match('hellshare')) 
				{
					var thumbs;
					thumbs = res.match(/http:\/\/static\d+\.helldata\.com\/thumbs(?:\/\d+){1,2}\/\d{1,2}"/g);
					
					if (thumbs)
					{
						tooltip += '<br>';
						
						var j = Math.min(thumbs.length, 9);
						for (var i = 0; i < j; i++)
						{
							tooltip += '<img src="' + thumbs[i].replace('"',"") + '" width="' + TOOLTIP_THUMBWIDTH + 'px">';
						}
						
						warlcTooltip.style.minWidth = TOOLTIP_MAXWIDTH;
					}						
				}
				
				if (href.match('czshare'))
				{
					var thumbs;
					thumbs = res.match(/src="http:\/\/www(\d+)\.czshare\.com\/images_velke\/\d+\.(\d+)\.jpeg/);
					
					if (thumbs)
					{
						var thumbsServer = thumbs[1];
						var thumbsId = thumbs[2];
						
						tooltip += '<br>';
						for (var i = 1; i < 9; i++)
						{
							tooltip += '<img src="http://www' + thumbsServer + '.czshare.com/images_velke/' + i + '.' + thumbsId + '.jpeg" width="' + TOOLTIP_THUMBWIDTH + 'px">';
						}
						
						warlcTooltip.style.minWidth = TOOLTIP_MAXWIDTH;
					}						
				}
				
				if (href.match('bezvadata'))
				{
					var thumbs;
					thumbs = res.match(/http:\/\/nahledy\.bezvadata\.cz\/nahledy\/\d+\/\d+\/\d+_\d+_\d+x\d+_\w.jpg/g);
					
					if (thumbs)
					{
						tooltip += '<br>';
						
						var j = Math.min(thumbs.length, 9);
						for (var i = 0; i < j; i++)
						{
							tooltip += '<img src="' + thumbs[i] + '" width="' + TOOLTIP_THUMBWIDTH + 'px">';
						}
						
						warlcTooltip.style.minWidth = TOOLTIP_MAXWIDTH;
					}						
				}
				
				
				link.warlc_tooltipcache = tooltip;
				
				if (mouseoverLink == link.href) //mouse cursor is still over the link
				{
					warlcTooltip.innerHTML = tooltip;
				}			
			}
		});
	}
}

	function setVariables()
	{
		if (firstRun)
		{
			GM_log('First run, applying default settings...');
			
			GM_setValue("Icon_set",1);
			GM_setValue("Display_tooltip_info",false);
			GM_setValue("Show_black_background_in_DL_links",false);
			GM_setValue("Show_line_through_in_dead_links",false);
			GM_setValue("Display_full_links_in_link_containers",false);
			GM_setValue("Allow_spaces_in_DL_links",false);
			GM_setValue("Autocheck",true);
			GM_setValue("Do_not_linkify_DL_links",false);
			GM_setValue("Show_progress_stats",true);
			GM_setValue("Keyboard_functions",true);
			GM_setValue("Obsolete_file_hosts",false);
			GM_setValue("Color_DL_links",true);
			GM_setValue("Live_links_color","SpringGreen");
			GM_setValue("Dead_links_color","#FF3300");
			GM_setValue("Temp_unavailable_links_color","#F7EF09");
			GM_setValue("Container_links_color","DarkKhaki");
			GM_setValue("Ref_anonymize_service","http://hiderefer.com/?");
			
			GM_setValue("First_run", false);		
		}
		
		//hidden settings
		GM_setValue("Progress_box_pos_bottom", Progress_box_pos_bottom = GM_getValue("Progress_box_pos_bottom", 20));
		GM_setValue("Progress_box_pos_right", Progress_box_pos_right = GM_getValue("Progress_box_pos_right", 10));
		GM_setValue("Progress_box_opacity", Progress_box_opacity = GM_getValue("Progress_box_opacity", 85));
		GM_setValue("Progress_box_background_color", Progress_box_background_color = GM_getValue("Progress_box_background_color", 'DimGray'));
		GM_setValue("Progress_box_item_color", Progress_box_item_color = GM_getValue("Progress_box_item_color", '#FFFFCC'));
		GM_setValue("Progress_box_refresh_rate", Progress_box_refresh_rate = GM_getValue("Progress_box_refresh_rate", 2000));
		GM_setValue("Debug_mode", DEBUG_MODE = GM_getValue("Debug_mode", false));
		//hidden settings end

		Icon_set = GM_getValue("Icon_set", 1); //0 - no icons, 1 - cat paws, 2 - old RSLC style
		Display_tooltip_info = GM_getValue("Display_tooltip_info", false);
		Show_black_background_in_DL_links = GM_getValue("Show_black_background_in_DL_links", false);
		Show_line_through_in_dead_links = GM_getValue("Show_line_through_in_dead_links", false);
		Display_full_links_in_link_containers = GM_getValue("Display_full_links_in_link_containers", false);
		Allow_spaces_in_DL_links = GM_getValue("Allow_spaces_in_DL_links", false);
		Autocheck = GM_getValue("Autocheck", true);
		Do_not_linkify_DL_links = GM_getValue("Do_not_linkify_DL_links", false);
		Show_progress_stats = GM_getValue("Show_progress_stats", true);
		Keyboard_functions = GM_getValue("Keyboard_functions", true);
		Obsolete_file_hosts = GM_getValue("Obsolete_file_hosts", false);
		Color_DL_links = GM_getValue("Color_DL_links", true);
		Live_links_color = GM_getValue("Live_links_color", "SpringGreen");
		Dead_links_color = GM_getValue("Dead_links_color", "#FF3300");
		Temp_unavailable_links_color = GM_getValue("Temp_unavailable_links_color", "#F7EF09");
		Container_links_color = GM_getValue("Container_links_color", "DarkKhaki");
		Ref_anonymize_service = GM_getValue("Ref_anonymize_service", "http://hiderefer.com/?");
	}


	// Delinkifies the links
	// params:
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

			if (Display_tooltip_info)
			{
				spanElm.href = thisLink.href;
						
				switch (thisLink.className){
				case "alive_link": spanElm.addEventListener("mouseover", displayTooltipInfo, false); break
				case "adead_link": spanElm.addEventListener("mouseover", displayTooltipError, false); break;
				case "unava_link": //reserved
				default: 
				}
			}
			
			thisLink.parentNode.replaceChild(spanElm, thisLink);
		}
	}

	function processContainers()
	{
		var redirectorTypes = {	"HTTP_302": 0, 
								"INNER_LINK": 1, 
								"THELOO_KATT_IT": 2,
								"CING_BE": 3,
								"ADF_LY": 4};
		
		var cMultiloadTotal = 0;
		var cMultiloadProcessed = 0;

		var cMirrorcreatorComTotal = 0;
		var cMirrorcreatorComProcessed = 0;

		var hostRestrictionRegex = "";
		var multiloadComRestriction = "";
		var multiloadComRestrictionRegex;

		//
		//HANDLING REDIRECTORS START
		//

		var redirectors = new Array();
		initRedirectors();

		var redirectorsCount = redirectors.length;

		if (redirectorsCount > 0)
		{
			var allRedirectorsRegex = "";

			//linkify redirector links
			for(var redirIdx = 0; redirIdx < redirectorsCount; redirIdx++)
			{
				allRedirectorsRegex += redirectors[redirIdx].linkRegex + "|";
			}
			allRedirectorsRegex = allRedirectorsRegex.replace(/\|$/, "");
			linkify(allRedirectorsRegex);
			//
			
			//process redirector links
			for(var redirIdx = 0; redirIdx < redirectorsCount; redirIdx++)
			{
				var redirectorsSnapshot = document.evaluate(redirectors[redirIdx].xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				redirectors[redirIdx].cTotal = redirectorsSnapshot.snapshotLength;

				cLinksTotal += redirectors[redirIdx].cTotal;
				var linkIdx = redirectors[redirIdx].cTotal;

				while(linkIdx--)
				{
					switch(redirectors[redirIdx].type)
					{
					case redirectorTypes.HTTP_302:			processRedirectorLink(redirectorsSnapshot.snapshotItem(linkIdx), redirIdx); break;
					case redirectorTypes.INNER_LINK:		processRedirectorLinkEx(redirectorsSnapshot.snapshotItem(linkIdx), redirIdx); break;
					case redirectorTypes.THELOO_KATT_IT:	processThelooKattItLink(redirectorsSnapshot.snapshotItem(linkIdx), redirIdx); break;
					case redirectorTypes.CING_BE:			processCingBeLink(redirectorsSnapshot.snapshotItem(linkIdx), redirIdx); break;
					case redirectorTypes.ADF_LY:			processAdfLyLink(redirectorsSnapshot.snapshotItem(linkIdx), redirIdx); break;
					default:
					}
				}
			}
			//
		}

		//HTTP_302
		function processRedirectorLink(link, redirectorId)
		{
			link.className = 'container_link';

			GM_xmlhttpRequest({
				method: 'HEAD',
				url: link.href,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'text/xml',
					'Referer': ""
				},
				onload: function(result) {
					if (result.finalUrl.replace("https", "http") == link.href) // service hasn't redirected anywhere
					{
						processRedirectorLink(link, redirectorId);
					}					
					else
					{
						redirectors[redirectorId].cProcessed++;
											
						link.href = result.finalUrl;
						
						if (redirectors[redirectorId].cProcessed >= redirectors[redirectorId].cTotal)
						checkLinks('container_link');
					}					
				},
				onerror: function(result) { //probably caused by unresponsive filehosting
					redirectors[redirectorId].cProcessed++;
					
					link.className = 'unava_link';
					cLinksProcessed++;
					
					if (redirectors[redirectorId].cProcessed >= redirectors[redirectorId].cTotal)
						checkLinks('container_link');
				}
			});
		}
		
		//INNER_LINK
		function processRedirectorLinkEx(link, redirectorId)
		{
			link.className = 'container_link';
					
			GM_xmlhttpRequest({
				method: 'GET',
				url: link.href,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'text/xml',
					'Referer': ""
				},
				onload: function(result) {
					link.href = result.responseText.match(redirectors[redirectorId].innerLinkRegex)[1];
					
					redirectors[redirectorId].cProcessed++;
					
					if (redirectors[redirectorId].cProcessed >= redirectors[redirectorId].cTotal)
						checkLinks('container_link');
				}				
			});
		}
		
		//theloo.katt.it (wrapped safelinking.net)
		function processThelooKattItLink(link, redirectorId)
		{
			link.className = 'container_link';
					
			GM_xmlhttpRequest({
				method: 'GET',
				url: link.href,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'text/xml',
					'Referer': ""
				},
				onload: function(result) {
					link.href = result.responseText.match(redirectors[redirectorId].innerLinkRegex)[1];
					
					redirectors[redirectorId].cProcessed++;
					
					
					//the inner links are safelinking.net links, so lets proceed with it
					if (GM_getValue("Check_safelinking_dot_net_links", false))
					{
						processRedirectorLink(link, 0);
					}
				}					
			});
		}
		
		//cing.be (application/x-www-form-urlencoded)
		function processCingBeLink(link, redirectorId)
		{
			link.className = 'container_link';
					
			GM_xmlhttpRequest({
				method: 'GET',
				url: link.href,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'text/xml',
					'Referer': ""
				},
				onload: function(result) {
					var f_s = result.responseText.match(/f_s" value="(\w+)">/);
					
					if (f_s != null)
					{
						GM_xmlhttpRequest({
							method: 'POST',
							url: link.href,
							headers: {
								'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
								'Accept': 'text/xml',
								'Content-Type': 'application/x-www-form-urlencoded',
								'Referer': ""
							},
							data: 'f_s=' + f_s[1],
							onload: function(result) {
								link.href = result.finalUrl;
								
								redirectors[redirectorId].cProcessed++;
					
								if (redirectors[redirectorId].cProcessed >= redirectors[redirectorId].cTotal)
									checkLinks('container_link');
							}					
						});					
					}
					else
					{
						redirectors[redirectorId].cProcessed++;
					
						if (redirectors[redirectorId].cProcessed >= redirectors[redirectorId].cTotal)
							checkLinks('container_link');
					}
				}
			});			
		}
		
		//adf.ly (adf.ly/go innerLink, locking mechanism)
		function processAdfLyLink(link, redirectorId)
		{
			link.className = 'container_link';
					
			GM_xmlhttpRequest({
				method: 'GET',
				url: link.href,
				headers: {
					'User-agent': 'Mozilla/4.0',
					'Accept': 'text/xml',
					'Referer': ""
				},
				onload: function(result) {
				
					if (result.finalUrl.match('/locked/'))
					{
						var delay = result.responseText.match(/countdown">(\d+)</)[1];
						// GM_log(result.finalUrl + 'is locked. Repeating the request in ' + delay + 's.');
						// setTimeout(function(){processAdfLyLink(link, redirectorId);}, delay * 1000);
					}
					else
					{
						// GM_log('Processing... ' + link.href);
						// GM_log('Found...' + result.responseText.match(/\/go\/(\w+\/\w+)/)[1]);
						
						var directLink = 'http://adf.ly' + result.responseText.match(/(\/go\/\w+\/\w+)/)[1];
						
						var logToken = result.responseText.match(/flashy_(\w+)/)[1];
						var users = result.responseText.match(/user=\d+&user2=\d+/);
						
						//confirm advert
						GM_xmlhttpRequest(
						{
						method: 'POST',
						url: 'http://adf.ly/l.php',
						headers: {
							'User-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0',
							'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
							'Referer': link.href
						},
						data: users + '&lt=' + logToken,
						onload: function(result) {
							
							//retrieve final url from .../go/... link
							GM_xmlhttpRequest({
							method: 'GET',
							url: directLink,
							headers: {
								'User-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0',
								'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
								'Referer': link.href
							},
							onload: function(result) {
							
								link.href = result.finalUrl;
								
								redirectors[redirectorId].cProcessed++;
							
								if (redirectors[redirectorId].cProcessed >= redirectors[redirectorId].cTotal)
									checkLinks('container_link');
							}
							});
						}					
						});						
					}
					
					// try
					// {
						// GM_log('Processing... ' + link.href);
						// GM_log('Found...' + result.responseText.match(/\/go\/(\w+\/\w+)/));
						
						// link.href += 'http://adf.ly/go/' + result.responseText.match(/\/go\/(\w+\/\w+)/)[2];
					
						// GM_xmlhttpRequest({
						// method: 'POST',
						// url: link.href,
						// headers: {
							// 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
							// 'Accept': 'text/xml',
							// 'Referer': ""
						// },
						// onload: function(result) {
						
							// link.href = result.finalUrl;
							
							// redirectors[redirectorId].cProcessed++;
						
							// if (redirectors[redirectorId].cProcessed >= redirectors[redirectorId].cTotal)
								// checkLinks('container_link');
						// }
						// });
					// }
					// catch(e)
					// {
						// GM_log(link.href + " is LOCKED");
						
						// the link is locked, repeat the request later
						// setTimeout(function(){processAdfLyLink(link, redirectorId);}, 15000);
					// }				
				}					
			});
			
			function proceedOK()
			{
			}
		}
		
		//MULTILOAD.CZ START
		if (GM_getValue("Check_multiload_dot_cz_links", false))
		{
			var mlRegex = 'multiload\\.cz\/stahnout\/\\d+\/';
			var mlXpath = "//a[contains(@href,'http://www.multiload.cz/stahnout')]";

			hostRestrictionRegex = 'Upload se nezdařil|limit exceeded|probíhá reupload|';

			if (GM_getValue("Check_rapidshare_dot_com_links", false))
				hostRestrictionRegex += 'rapidshare\\.com|';
			if (GM_getValue("Check_hellshare_dot_com_links", false))
				hostRestrictionRegex += 'hellshare|';
			if (GM_getValue("Check_share_dash_rapid_dot_com_links", false))
				hostRestrictionRegex += 'share-rapid\\.com|';
			if (GM_getValue("Check_quickshare_dot_cz_links", false))
				hostRestrictionRegex += 'quickshare\\.cz|';
			if (GM_getValue("Check_czshare_dot_com_links", false))
				hostRestrictionRegex += 'czshare\\.com|';
			if (GM_getValue("Check_uloz_dot_to_links", false))
				hostRestrictionRegex += 'uloz\\.to|';
			if (GM_getValue("Check_filefactory_dot_com_links", false))
				hostRestrictionRegex += 'filefactory\\.com|';
			if (GM_getValue("Check_hellspy_dot_com_links", false))
				hostRestrictionRegex += 'hellspy|';
			if (GM_getValue("Check_multishare_dot_cz_links", false))
				hostRestrictionRegex += 'multishare\\.cz|';

			hostRestrictionRegex = hostRestrictionRegex.replace(/\|$/, "");

			linkify(mlRegex);

			var mlSnapshot = document.evaluate(mlXpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var mlCount = mlSnapshot.snapshotLength;

			if (mlCount > 0)
			{
				cMultiloadTotal += mlCount;

				mlIdx = mlCount - 1;
				do
				{
					processMultiloadLink(mlSnapshot.snapshotItem(mlIdx));
				}
				while(mlIdx--)
			}
		}
		//MULTILOAD.CZ END



		function processMultiloadLink(mlLink)
		{
			GM_xmlhttpRequest({
				method: 'GET',
				url: mlLink.href,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'text/xml',
					'Referer': ""
				},
				onload: function(result) {
					var res = result.responseText;

					var innerBlockRegex = /<p class="manager-linky">(?:.|\s)+?<\/p>/g;
					var innerLinksRegex = /(?:Upload se nezdařil \((?:chyba serveru|chybné přihlašovací údaje)\)\. <|>https?:\/\/(?:.|\s)+?<|Právě probíhá reupload, buďte trpěliví\.\.\.<)/g;
					var innerLinkRegex = /((?:Upload se nezdařil.+|https?:\/\/(?:.|\s)+|Právě probíhá reupload, buďte trpěliví\.\.\.))</; 
					var mlRestrictionRegex = new RegExp(hostRestrictionRegex,"g"); //what links should be displayed

					var blocks; // blocks of links
					var blockIdx;

					mlLink.className = '';

					if (result.status == 503) //service temporarily unavailable, repeat request in one second
					{
						setTimeout(function(){ processMultiloadLink(mlLink); }, 1000);
						return;
					}

					blocks = res.match(innerBlockRegex);

					if (blocks == null) //no links found, cancel further processing
					{
						mlLink.parentNode.appendChild(document.createTextNode(' | Požadovaný soubor neexistuje.'));
						cMultiloadProcessed++;
						if (cMultiloadTotal <= cMultiloadProcessed)
						{
							startBulkCheck('container_link');
							start('container_link');
						}
						return;
					}

					blockIdx = blocks.length;

					if (Display_full_links_in_link_containers)
					{
						var ulElm = document.createElement('ul');
						ulElm.className = 'container_list'; //CSS smaller font, padding, margin, square style

						while(blockIdx--)
						{
							if (blocks[blockIdx].match(mlRestrictionRegex) == null)
							{
								continue;
							}

							var innerLinks = blocks[blockIdx].match(innerLinksRegex);

							var linkIdx = innerLinks.length;
							while (linkIdx--)
							{
								var innerLink = innerLinks[linkIdx].match(innerLinkRegex)[1];

								var liElm = document.createElement('li');

								if (innerLink.match(/Upload se nezdařil|limit exceeded|probíhá reupload/))
								{
									liElm.appendChild(document.createTextNode(innerLink));
								}
								else
								{
									var aElm = document.createElement('a');
									aElm.innerHTML = innerLink;
									aElm.href = innerLink;
									aElm.className = 'container_link';

									liElm.appendChild(aElm);
								}

								ulElm.appendChild(liElm);
								cLinksTotal++;
							}
						}

						mlLink.parentNode.appendChild(ulElm);
					}
					else //compact view
					{
						mlLink.parentNode.appendChild(document.createTextNode("|"));

						while(blockIdx--)
						{
							if (blocks[blockIdx].match(mlRestrictionRegex) == null)
							{
								continue;
							}

							var innerLinks = blocks[blockIdx].match(innerLinksRegex);

							var linkIdx = innerLinks.length;
							while (linkIdx--)
							{
								var innerLink = innerLinks[linkIdx].match(innerLinkRegex)[1];

								if (innerLink.match(/Upload se nezdařil|limit exceeded|probíhá reupload/))
								{
									mlLink.parentNode.appendChild(document.createTextNode("----"));
								}
								else
								{
									var aElm = document.createElement('a');

									var hostName = innerLink.match(/rapidshare|quickshare|hellshare|filefactory|uloz\.to|multishare|hellspy|share\-rapid|czshare/);

									//abbreviate host name
									switch(hostName + ""){

										case 'rapidshare': aElm.innerHTML = 'RS'; break;
										case 'quickshare': aElm.innerHTML = 'QS'; break;
										case 'hellshare': aElm.innerHTML = 'HS'; break;
										case 'filefactory': aElm.innerHTML = 'FF'; break;
										case 'uloz.to': aElm.innerHTML = 'UT'; break;
										case 'multishare': aElm.innerHTML = 'MS'; break;
										case 'hellspy': aElm.innerHTML = 'hs'; break;
										case 'share-rapid': aElm.innerHTML = 'SR'; break;
										case 'czshare': aElm.innerHTML = 'CS'; break;
										default: aElm.innerHTML = 'xx';

									}

									aElm.href = innerLink;
									aElm.className = 'container_link';

									mlLink.parentNode.appendChild(aElm);
									cLinksTotal++;
								}
							}

							mlLink.parentNode.appendChild(document.createTextNode("|")); //blocks delimiter

						}
					}

					cMultiloadProcessed++;
					if (cMultiloadTotal == cMultiloadProcessed) //start check when all ml links have been processed
					{
						if (Do_not_linkify_DL_links)
						{
							delinkifySnapshot(mlSnapshot);
						}
						
						startBulkCheck('container_link');
						start('container_link');
					}
				}
			});
		}


		if (GM_getValue("Check_mirrorcreator_dot_com_links", false))
		{
			var mcRegex = 'mirrorcreator\\.com/files/(\\w+)';
			var mcXpath = "//a[contains(@href,'mirrorcreator.com/files')]";
			
			var mcShortHostNames = 
				 '?? RS MU ES DF Zs FF ?? SS ?? Ba NL LT MF MS ZS UL 2S ZI HF ST UP GF ?? UB Fr IF fs X7 UG ?? TB FS EB LB EU ?? OR ?? ?? DL EY ?? FK FH US BS WU FP PL FJ CR JF SM Ms Ff GU';
				// 0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56
				//??????      depositfiles sendspace  load.to     ul.to       storage.to  uploadbox   x7.to       fileserve   ??????      duckload    filehook    filepost    jumbofiles  glumbouploads
				//   rapidshare  zshare      ??????      mediafire   2shared     uploading   freakshare  ugotfile    extabit     oron        eyvx       uploadstation putlocker  sendmyway
				//      megaupload  filefactory badongo     megashare   ziddu       gamefront   ifile       ??????      letitbit    ??????      ??????      bitshare    filejungle  megashares
				//         easy-share  ??????      netload     zippyshare  hotfile     ??????      filesonic   turbobit    enterupload ??????      filekeen    wupload     crocko      fileflyer

			linkify(mcRegex);

			var mcSnapshot = document.evaluate(mcXpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var mcCount = mcSnapshot.snapshotLength;

			cMirrorcreatorComTotal = mcCount;

			if (mcCount > 0)
			{
				mcShortHostNames = mcShortHostNames.split(' ');
				mcIdx = mcCount;
				while(mcIdx--)
					processMirrorcreatorLink(mcSnapshot.snapshotItem(mcIdx));
			}

		}
		//MIRRORCREATOR.CZ END


		//mirrorcreator.com checking works like this:
		//The base URL is http://www.mirrorcreator.com/files/XXXXXXXX/filename_links
		//the actual list of mirrors is at http://www.mirrorcreator.com/status.php?uid=XXXXXXXX
		//the list contains links in the form of (http://www.mirrorcreator.com)/redirect/XXXXXXXX/1
		//these redirector links are extracted with mcLinkBlockRegex and the pages loaded
		//they contain the actual filehost links, which are extracted with mcHostRegex and displayed in a container list
		function processMirrorcreatorLink(mcLink)
		{
			var mcURL = mcLink.href.match(mcRegex);
			if(!mcURL || !mcURL[1]) return;
			mcURL = 'http://www.mirrorcreator.com/status.php?uid=' + mcURL[1]; //link correction
			GM_xmlhttpRequest({
				method: 'GET',
				url: mcURL,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*'+'/*;q=0.8',
					'Referer': ""
				},
				onload: function(mcLinkResult) {
					var mcLinkRes = mcLinkResult.responseText;

					var mcLinkBlockRegex = /(\/redirect\/\w+\/(\d+))/gi;
					var mcHostRegex = /<div id="redirectlink">.*?<a href="([^"]+)"/;

					var mcRedirectors;
					var mcHostURLs = [], mcRedirectorIDs = [], mcHostsFound = 0, mcHostsRetrieved = 0, mcHostsToProcess = 0;
					
					var m = mcLinkRes.match(mcLinkBlockRegex);
					
					if (m)
						mcHostsFound = m.length;
					else
					{ //no files inside container
						processMirrorcreatorFoundHosts(mcLink, []);
						return;
					}

					var mcRedirectorURL, idx, timedOut = false;

					var gmxhrFunc = function(mcRedirectorURL){ //Tampermonkey doesn't know neither this.url or result.finalUrl
						GM_xmlhttpRequest({
							method: 'GET',
							url: mcRedirectorURL,
							headers: {
								'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
								'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*'+'/*;q=0.8',
								'Referer': ""
							},
							onload: function(mcHostResult) {
								if (timedOut) return; //too late, the list is already displayed
								var mcHostRes = mcHostResult.responseText;
								var mcHost = mcHostRes.match(mcHostRegex);
								idx = mcHostURLs.indexOf(mcRedirectorURL);
								if (mcHost && idx!=-1)
								{
									mcHostURLs[idx] = mcHost[1].replace(/^\s+|\s+$/g, '');
									mcHostsRetrieved++;
									mcHostsToProcess++;
									if (mcHostsFound == mcHostsRetrieved) //this is the last one!
									{
										processMirrorcreatorFoundHosts(mcLink, mcHostURLs, mcRedirectorIDs);
										mcHostsToProcess = 0;
									}
								}
							} //end of onload: function
						}); //end of GM_xmlhttpRequest call
					};//end of var gmxhrFunc

					while (mcRedirectors = mcLinkBlockRegex.exec(mcLinkRes))
					{  //load individual redirector pages
						mcRedirectorURL = 'http://www.mirrorcreator.com' + mcRedirectors[1];
						mcHostURLs.push(mcRedirectorURL);
						mcRedirectorIDs.push(mcRedirectors[2]);
						gmxhrFunc(mcRedirectorURL);
					} //end of while block

					setTimeout(function(){ //in case the last page fails to load and call the function
							timedOut = true;
							if (mcHostsToProcess)
								processMirrorcreatorFoundHosts(mcLink, mcHostURLs);
						}, 60000);

				} //end of onload function
			}); //end of GM_xmlhttpRequest call
		} //end of function processMirrorcreatorLink


		function processMirrorcreatorFoundHosts(mcLink, mcHostURLs, mcRedirectorIDs)
		{
			var aEl, liEl, docFrag;
			var hostName, mcRedirectorID, trimFilename = false;
			
			var i = mcHostURLs.length;
			if (i == 0)
			{
				trimFilename = true;
				mcLink.parentNode.insertBefore(document.createTextNode(' | No files inside container'), mcLink.nextSibling);
			}
			else
			{
				if (Display_full_links_in_link_containers)
				{ //full view
					var wrapperEl = document.createElement('span');
					wrapperEl.style.display = 'block';
					var ulistEl = document.createElement('ul');
					ulistEl.className = 'container_list';
					while (i--)
					{
						liEl = document.createElement('li');
						aEl = document.createElement('a');
						aEl.appendChild(document.createTextNode(mcHostURLs[i]));
						aEl.href = mcHostURLs[i];
						aEl.className = 'container_link';
						liEl.appendChild(aEl);
						ulistEl.appendChild(liEl);
					}
					wrapperEl.appendChild(ulistEl);
					mcLink.parentNode.replaceChild(wrapperEl, mcLink);
					wrapperEl.insertBefore(mcLink, wrapperEl.firstChild);
				}
				else 
				{ //compact view
					trimFilename = true;
					docFrag = document.createDocumentFragment();
					docFrag.appendChild(document.createTextNode(' |'));
					while (i--)
					{
						mcRedirectorID = mcRedirectorIDs[i];
						hostName = mcHostURLs[i];
						if (mcRedirectorID > mcShortHostNames.length-1 || mcShortHostNames[mcRedirectorID] == '??')
							hostName = hostName.replace(/https?:\/\/(?:www\.)?([-0-9a-z]+(?:\.[-0-9a-z]+)?)\.[a-z]+\/.*/i, '$1').toUpperCase();
						else
							hostName = mcShortHostNames[mcRedirectorID];
							
						aEl = document.createElement('a');
						aEl.href = mcHostURLs[i];
						aEl.className = 'container_link';
						aEl.appendChild(document.createTextNode(hostName));
						docFrag.appendChild(aEl);
						docFrag.appendChild(document.createTextNode('|'));
					}
					mcLink.parentNode.insertBefore(docFrag, mcLink.nextSibling);
				} //end of else block
			} //end of else block
			
			mcLink.className = '';
			if (trimFilename)
				mcLink.firstChild.nodeValue = mcLink.firstChild.nodeValue.replace(/(https?:\/\/[^\/]+\/files\/\w+\/).+/, '$1...');
			
			cMirrorcreatorComProcessed++;
			if (cMirrorcreatorComProcessed == cMirrorcreatorComTotal) //start check when all mc links have been processed
			{
				if (Do_not_linkify_DL_links)
					delinkifySnapshot(mcSnapshot);
				startBulkCheck('container_link');
				start('container_link');
			}
		} //end of function processMirrorcreatorFoundHosts

		containers_processed = true;


		function initRedirectors()
		{
			function addRedirector(linkRegex, xpathEx, redirType, innerLinkRegex)
			{
				var redirector = new Object();
				
				redirector.linkRegex = linkRegex;
				redirector.xpath = xpathEx; 				//xpath expression
				redirector.cProcessed = 0; 					//processed links count
				redirector.cTotal = 0; 						//total links count
				redirector.type = redirType;				//redirectorTypes enum
				redirector.innerLinkRegex = innerLinkRegex;	//innerLink, null if unused
				
				redirectors.push(redirector);
			}

			if (GM_getValue("Check_safelinking_dot_net_links", false))
			{
				addRedirector(
				'safelinking\\.net\/d\/\\w+',
				"//a[contains(@href,'safelinking.net/d/')]",
				redirectorTypes.HTTP_302,
				null);
			}

			if (GM_getValue("Check_linksafe_dot_me_links", false))
			{
				addRedirector(
				'linksafe\\.me\/d\/\\w+',
				"//a[contains(@href,'linksafe.me/d/')]",
				redirectorTypes.HTTP_302,
				null);
			}
			
			if (GM_getValue("Check_linkto_dot_net_links", false))
			{
				addRedirector(
				'linkto\\.net\/\\?\\w+\\.\\d+',
				"//a[contains(@href,'linkto.net/?')]",
				redirectorTypes.INNER_LINK,
				/<iframe id="iframe" name="iframe"  src="(.+?)\s*" frameborder="0"/);
			}
			
			if (GM_getValue("Check_theloo_dot_katt_dot_it_links", false))
			{
				addRedirector(
				'(?:the)?loo\\.katt\\.it\/\\w+',
				"//a[contains(@href,'loo.katt.it/')]",
				redirectorTypes.THELOO_KATT_IT,
				/Proceed to URL - <a href="(.+?)">/);
			}
			
			if (GM_getValue("Check_madlink_dot_sk_links", false))
			{
				addRedirector(
				'madlink\\.sk\/\\w+',
				"//a[contains(@href,'madlink.sk/')]",
				redirectorTypes.INNER_LINK,
				/name="url" value="(.+?)\s*"\/>/);
			}
			
			if (GM_getValue("Check_cing_dot_be_links", false))
			{
				addRedirector(
				'cing\\.be\/\\w+',
				"//a[contains(@href,'cing.be/')]",
				redirectorTypes.CING_BE,
				null);
			}
			
			if (GM_getValue("Check_adf_dot_ly_links", false))
			{
				addRedirector(
				'(?:adf\\.ly|[u9]\\.bb|[qj]\\.gs)\/\\w+',
				"//a[contains(@href,'adf.ly/') or contains(@href,'u.bb/') or contains(@href,'9.bb/') or contains(@href,'q.gs/') or contains(@href,'j.gs/')]",
				redirectorTypes.ADF_LY,
				null);
			}
			
			if (GM_getValue("Check_redi_dot_re_links", false))
			{
				addRedirector(
				'redi\\.re\/\\w+',
				"//a[contains(@href,'redi.re/')]",
				redirectorTypes.HTTP_302,
				null);
			}
			
			if (GM_getValue("Check_bit_dot_ly_links", false))
			{
				addRedirector(
				'bit\\.ly\/\\w+',
				"//a[contains(@href,'bit.ly/')]",
				redirectorTypes.HTTP_302,
				null);
			}
		}

	}

	var bulkHosts = new Array();
	var bulkHostNames = new Array();
	
	function initBulkCheck()
	{
			
		/////////////////////////////
		// Inits filehost object
		/////////////////////////////
		// params :
		// hostName 		-- 	[string]		host name (multiple domains separated with coma)
		// linkRegex		-- 	[string] 		link regex 
		// xpath 			-- 	[string] 		xpath expression to detect the link objects with evaluate
		// blockSize 		-- 	[integer]		max. number of links sent in one request, 50 if null
		// corrMatch		--	[regex]			link correction regex (match), applied prior to corrRepl
		// corrReplWhat		-- 	[regex]			link correction regex (replace)
		// corrReplWith		--  [string]		
		// splitSeparator	-- 	[string]		POSTDATA links separator, "\r\n" if null
		//						
		// apiUrl			-- 	[string]		web linkchecker or API URL
		// postData 		-- 	[string]		POSTDATA of xmlhttprequest
		// resLinkRegex		--	[regex]		
		// resLiveRegex		-- 	[regex]			matches substrings containing live links in the request response
		// resDeadRegex		-- 	[regex]			matches substrings containing dead links in the request response
		// resUnavaRegex	--	[regex]			matches substrings containing unava links in the request response
		// func				-- 	[function]		bulkcheck handler, genBulkCheck if null
		//
		//////////////////////////////
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
							"file-bit.net",		"ovfile.com",		"filevelocity.com",	
							"goldfile.eu",		"space4file.com",	
							"shafiles.me",		
							"vreer.com",		"isavelink.com",	"uploadic.com",
							"ddlstorage.com", 	"filesabc.com",		"sharebeast.com",
							"sharebees.com",	"180upload.com",	"verzend.be",
							"asixfiles.com",	"zomgupload.com",	"mlfat4arab.com",	"movreel.com",
							"4up.me",			"gigfiles.net",		"fileupup.com",		"share76.com",
							"filebox.com",		"file4safe.com",	"upafile.com",
							"1hostclick.com",	"filemac.com",		
							"idup.in",			"aieshare.com",		"novafile.com",		"longfiles.com",
							"potload.com",		"rockdizfile.com", 	"cloudnxt.net",		"bitupload.com",
							"filehost.ws",		"filesbb.com",		"filecosy.com",
							"uploadbaz.com"
						];
						
		var genType2 = [	"filegag.com",		"prefiles.com",		"queenshare.com", 	"coraldrive.net",
							"fireuploads.net",	"filetechnology.com",	"lumfile.com",		"filesega.com",
							"filestay.com",		"uploadboost.com",	"4savefile.com", 	"daj.to",
							"upfile.biz",		"4bytez.com",		"kupload.org",		"bzlink.us",
							"uploadjet.net",	"zooupload.com",	"clouds.to",		"247upload.com",
							"fileza.net", 		"fileprohost.com",	"filemates.com",	"sharefilehost.com",
							"filerose.com",		"tusfiles.net",		"ihostia.com",		"uploadoz.com",
							"squillion.com", 	"shareupload.com",	"amonshare.com",	"edoc.com",
							"uload.to",			"filefolks.com",	"filedefend.com",	"venusfile.com",
							"cyberlocker.ch",	"fileduct.net",		"upgrand.com",		"secureupload.eu",
							"uploading4u.eu",	"grupload.com",		"filestrum.com",	"fileuplo.de",
							"upaj.pl",			"sinhro.net",		"fileking.co",		"filedownloads.org",
							"uploadcore.com"];
		
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
		
		// TEMPLATE
		// if (GM_getValue("Check__dot_com_links", false))
		// {			
			// addHost(
				// "", //hostname
				// "", //linkregex
				// "//a[contains(@href,'.com/')]", //xpath
				// null, //blocksize
				// null, //corrmatch
				// null, //corrreplwhat
				// null, //corrreplwith
				// null, //separator
				// "", //api url
				// "", //postdata
				// /()/, //linkregex
				// //liveregex
				// //deadregex
				// //unavaregex
				// null //function delegate
			// )			
		// }	
		
		
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
		
		// if (GM_getValue("Check_restfile_dot_com_links", false))
		// {	
			// addHost(
				// "restfile", //hostname
				// "restfile\\.(?:com|net)\/(?:\\?d=)?\\w+", //linkregex
				// "//a[contains(@href,'restfile.com/') or contains(@href,'restfile.net/')]", //xpath
				// null, //blocksize
				// null, //corrmatch
				// /restfile\.com\//, //corrreplwhat
				// "restfile.net/", //corrreplwith
				// null, //separator
				// "http://www.restfile.net/?op=checkfiles", //api url
				// "op=checkfiles&process=Check+URLs&list=", //postdata
				// /restfile\.net\/(\w+)/, //linkregex
				// /green'>http:\/\/(?:|www\.)restfile\.net\/\w+/g, //liveregex
				// /red'>http:\/\/(?:|www\.)restfile\.net\/\w+/g, //deadregex
				// /orange'>http:\/\/(?:|www\.)restfile\.net\/\w+/g, //unavaregex
				// null //function delegate
			// )				
		// }
		
		// if (GM_getValue("Check_nosupload_dot_com_links", false))
		// {	
			// addHost(
				// "nosupload", //hostname
				// "nosupload\\.com\/(?:\\?d=)?\\w+", //linkregex
				// "//a[contains(@href,'nosupload.com/')]", //xpath
				// null, //blocksize
				// null, //corrmatch
				// /nosupload\.com\/(?:\?d=)?/, //corrreplwhat
				// "nosupload.com/", //corrreplwith
				// null, //separator
				// "http://nosupload.com/checkfiles.html", //api url
				// "op=checkfiles&process=Check+URLs&list=", //postdata
				// /nosupload\.com\/(\w+)/, //linkregex
				// /green'>http:\/\/(?:|www\.)nosupload\.com\/\w+/g, //liveregex
				// /red'>http:\/\/(?:|www\.)nosupload\.com\/\w+/g, //deadregex
				// /orange'>http:\/\/(?:|www\.)nosupload\.com\/\w+/g, //unavaregex
				// null //function delegate
			// )				
		// }
		
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
		
		if (GM_getValue("Check_billionuploads_dot_com_links", false))
		{	
			addHost(
				"billionuploads,BillionUploads", //hostname
				"(?:billionuploads|BillionUploads)\\.com\/\\w+", //linkregex
				"//a[contains(@href,'billionuploads.com/') or contains(@href,'BillionUploads.com/')]", //xpath
				null, //blocksize
				/(http:\/\/(?:|www\.)billionuploads\.com\/\w+)/i, //corrmatch
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

		// if (GM_getValue("Check_henchfile_dot_com_links", false))
		// {	
			// addHost(
				// "henchfile", //hostname
				// "henchfile\\.com\/\\w+", //linkregex
				// "//a[contains(@href,'henchfile.com/')]", //xpath
				// null, //blocksize
				// null, //corrmatch
				// null, //corrreplwhat
				// null, //corrreplwith
				// null, //separator
				// "http://www.henchfile.com/?op=checkfiles", //api url
				// "op=checkfiles&process=Check+URLs&list=", //postdata
				// /(henchfile\.com\/\w+)/, //linkregex
				// /henchfile\.com\/\w+.*?<\/td><td style="color:green;">/g, //liveregex
				// /henchfile\.com\/\w+.*?<\/td><td style="color:red;">/g, //deadregex
				// /henchfile\.com\/\w+.*?<\/td><td style="color:orange;">/g, //unavaregex
				// null //function delegate
			// )				
		// }		
		
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
				"depositfiles", //hostname
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
		
		if (GM_getValue("Check_videobb_dot_com_links", false))
		{			
			addHost(
				"videobb", //hostname
				"videobb\\.com\/(?:video\/|watch_video\\.php\\?v=)\\w+", //linkregex
				"//a[contains(@href,'videobb.com')]", //xpath
				null, //blocksize
				null, //corrmatch
				/watch_video\.php\?v=/, //corrreplwhat
				'video/', //corrreplwith
				null, //separator
				'http://www.videobb.com/link_checker.php',
				'links=',
				/videobb\.com\/video\/(\w+)/,
				/<td>http:\/\/(?:www\.|)videobb.com\/video\/\w+<\/td>\s+<td>.+?<\/td>\s+<td>\d+:\d+<\/td>\s+<td>Available/g,
				/<td>http:\/\/(?:www\.|)videobb.com\/video\/\w+<\/td>\s+<td><\/td>\s+<td>N\/A<\/td>\s+<td>Not Available/g,
				null,
				null //function delegate
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
		
		// if (GM_getValue("Check_euroshare_dot_eu_links", false))
		// {			
			// addHost(
				// "euroshare", //hostname
				// "euroshare\\.eu\/file\/\\d+\/", //linkregex
				// "//a[contains(@href,'euroshare.eu')]", //xpath
				// null, //blocksize
				// null, //corrmatch
				// /\?\w+$/, //corrreplwhat
				// "", //corrreplwith
				// null, //separator
				// "http://euroshare.eu/checker", //api url
				// 'data=',
				// /(euroshare\.(?:eu|sk)\/file\/\d+)/,
				// /http:\/\/euroshare\.eu\/file\/\d+.+?\s*<\/div>\s*<div class="state">\s*<img src="\/public\/images\/web\/icons\/ok/g,
				// /http:\/\/euroshare\.eu\/file\/\d+.+?\s*<\/div>\s*<div class="state">\s*<img src="\/public\/images\/web\/icons\/cancel/g, 
				// null,
				// null //function delegate
			// )			
		// }
		
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
		
		// if (GM_getValue("Check_uploading_dot_com_links", false))
		// {			
			// addHost(
				// "uploading", //hostname
				// "uploading\\.com\/(?:\\w\\w\/|)files\/\\w+", //linkregex
				// "//a[contains(@href,'uploading.com/') and contains(@href,'files')]", //xpath
				// null, //blocksize
				// null, //corrmatch
				// null, //corrreplwhat
				// null, //corrreplwith
				// null, //separator
				// "http://uploading.com/filechecker/?ajax", //api url
				// "urls=", //postdata
				// /files\\\/get\\\/(\w+)/g, //linkregex
				// null, //deadregex
				// null, //deadregex
				// null, //unavaregex
				// uploadingBulkCheck //function delegate
			// )			
		// }
						
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
		//
		// See the code below for standard bulkcheck handling reference.
		//////////////////////////////
		function genBulkCheck()
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
							var unavalinks = res.match(unavaRegex)
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
						
						// GM_log(livelinks);
						// GM_log(deadlinks);
						
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
			do //while(allLength--);
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
		
		// function bayfilesBulkCheck()
		// {
			// var bfBlock = this.links.length;
			// while(bfBlock--)
			// {
				// postRequest(this.links[bfBlock]);				
			// }
			
			// function postRequest(block)
			// {
				// GM_xmlhttpRequest(
				// {
					// method: "POST",
					// url: 'http://api.bayfiles.com/v1/file/info/' + block,
					// headers: {
						// "Content-type": "application/x-www-form-urlencoded",
						// 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
						
					// },
					// onload: function (result)
					// {						
						// var res = result.responseText;
						
						// var deadlinks = new Array();
						// var livelinks = new Array();
						
						// var linkIds = block.match(/\w+/g);
						// var len = linkIds.length;
						
						// for(var idIdx = 0; idIdx < len; idIdx = idIdx + 2 )
						// {
							// if (res.match(new RegExp(linkIds[idIdx])) == null)
							// {
								// deadlinks.push('bayfiles.com/file/' + linkIds[idIdx]);
							// }
							// else 
							// {
								// livelinks.push('bayfiles.com/file/' + linkIds[idIdx]);
							// }
						// }
						
						// if (deadlinks.length > 0)
						// {
							// DisplayTheCheckedLinks(deadlinks, 'adead_link');
						// }
						// if (livelinks.length > 0)
						// {
							// DisplayTheCheckedLinks(livelinks, 'alive_link');
						// }
					// }
				// });
			// }
		// }
		
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
				this.href = Ref_anonymize_service + $(this).attr("href");
			});
			
			switch(resultStatus)
			{
				case "alive_link": 	cLinksAlive += $links.length; 
									if (Display_tooltip_info) $links.mouseover(displayTooltipInfo);
									break;
				case "adead_link": 	cLinksDead += $links.length; 
									if (Display_tooltip_info) $links.mouseover(displayTooltipError);
									break;
				case "unava_link": 	cLinksUnava += $links.length; break;
				default: 
			}		
			
			cLinksProcessed += $links.length;
		}
	}
	
	// starts bulkchecking
	//
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
			return link.replace(/https?:\/\/.*?http(s)?:\/\//, "http$1://").match(/https?:\/\/(?:www\.|[\w\.])*?([\w-]+)\.(?:co\.uk|\w+)\//)[1];
		}
		
	}
	
	
	function checkLinks(filterId)
	{
		startBulkCheck(filterId);
		start(filterId);
	}

	/**
	 * Initialises progress box including event binding and CSS 
	 */
	function initProgressBox()
	{
		if ($("#warlc-progressbox").length > 0)
			return;
		
		//progressbox css
		GM_addStyle("#warlc-progressbox  {position:fixed; background:" + Progress_box_background_color +
					"; opacity:" + (Progress_box_opacity / 100) + 
					"; bottom:" + Progress_box_pos_bottom +
					"px; right:" + Progress_box_pos_right +
					"px; padding:5px; font-size:10px; font-weight:bold; cursor:default;}\
					\
					.warlc-progressbar {text-align:center; color: dimGrey; height:2px; margin-bottom:2px;}\
					\
					.warlc-progressitem {}\
					\
					.alive {color: " + Live_links_color + 
					"; background:transparent url(" + alive_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;} .dead {color:" + Dead_links_color +
					"; background:transparent url(" + adead_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;} .unava {color: " + Temp_unavailable_links_color + 
					"; background:transparent url(" + unava_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;} .processing {color: " + Container_links_color + 
					"; background:transparent url(" + processing_link_gif + ") no-repeat scroll 100% 50%;padding-right:15px;}"
					);
		//
				
		$('body').append('	<div id="warlc-progressbox">\
							<div class="warlc-progressbar"></div>\
							<span class="warlc-progressitem alive"></span> - \
							<span class="warlc-progressitem dead"></span> - \
							<span class="warlc-progressitem unava"></span> - \
							<span class="warlc-progressitem processing"></span>\
							</div>');	
		
		$('#warlc-progressbox').hide().click(function(){
												clearInterval(intervalId); 
												$(this).hide(); 
												return false;
											});
		
		$(".warlc-progressbar").progressbar({complete: function(){
												$(this).fadeOut();
												clearInterval(intervalId); //stop refreshing the stats
												} 
											})
								.one('progressbarchange', function(){$('#warlc-progressbox').show();});
		
	}
	
	/**
	 * Updates progress data in progress box
	 */
	function updateProgress()
	{
		if (cLinksTotal) // some links were detected on page
		{
			var percProgress = Math.round(((100 / cLinksTotal) * cLinksProcessed));
			var $progressItems = $('#warlc-progressbox > .warlc-progressitem');
			
			$(".warlc-progressbar").progressbar('option', 'value', percProgress);
				
			$progressItems.first().text(cLinksAlive)
							.next().text(cLinksDead)
							.next().text(cLinksUnava)
							.next().text(cLinksTotal - cLinksProcessed);			
		}	
	}
	
	

	function check_all_links()
	{
		add_WARLC_style();

		if (Show_progress_stats)
		{
			initProgressBox();			
			intervalId = setInterval(function(){updateProgress();}, Progress_box_refresh_rate);
		}

		startBulkCheck(null);
		start(null);

		if (!containers_processed)
		{
			processContainers();
		}
		
	}

	//Copies all found dead links to clipboard - right now for Scriptish only
	function copy_dead_to_clipboard()
	{
		initClipBoardTools();

		var deadlinksxpath = "//.[@class='adead_link']";

		var foundlinks = document.evaluate(deadlinksxpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var foundlinkstext = '';

		var foundlinkIdx = foundlinks.snapshotLength;

		while(foundlinkIdx--)
		{
			if (foundlinks.snapshotItem(foundlinkIdx).innerHTML != ' x')
				foundlinkstext += foundlinks.snapshotItem(foundlinkIdx).innerHTML.replace(/\[\/hide:\w+\]/,"") + '\n';
		}

		unsafeWindow.copyToClipboard(foundlinkstext);
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
				case 68 : copy_dead_to_clipboard(); break;
				case 87 : toggle_autocheck(); break;			
			}
		}
	}

	//
	//
	//   SCRIPT EXECUTION START POINT
	//
	//
	
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
		GM_registerMenuCommand("[W.A.R. Links Checker] Configuration  (" + first_key_keycodename + "+" + second_key_keycodename + "+" + String.fromCharCode(CONFIGURATION_KEYCODE) + ")", configuration);
		GM_registerMenuCommand("[W.A.R. Links Checker] Check The Links In This Page (" + first_key_keycodename + "+" + second_key_keycodename + "+" + String.fromCharCode(CHECK_ALL_LINKS_KEYCODE) + ")", check_all_links);
	}
	else
	{
		GM_registerMenuCommand("[W.A.R. Links Checker] Configuration", configuration);
		GM_registerMenuCommand("[W.A.R. Links Checker] Check The Links In This Page", check_all_links);
	}

	//start linkchecking
	if (Autocheck)
	{
		$(document).ready(check_all_links);
	}

	//
	//
	//   SCRIPT EXECUTION END POINT
	//
	//

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
		#plusimage{\
			display:inline;\
			}\
		#hideshow {\
		 position: fixed;\
		 width: 100%;\
		 height: 100%;\
		 top: 0;\
		 left: 0;\
		 font-size:12px;\
		 z-index:2147483647;\
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
		#dev_ver {\
		 color: #00FF00;\
		 background: Black;\
		 text-align: right;\
		}\
		#sites_suspended {\
		 padding: 1px 10px;\
		 margin: 0px 0;display:inline-block;width:16em;\
		 text-decoration: line-through;\
		}\
		.popup img.cntrl {\
		 position: absolute;\
		 right: -15px;\
		 top: -15px;\
		}\
		#bulk {\
			font-size:8pt;\
			color:orange;\
			padding: 1px 10px;\
			margin: 0px 0;\
			display:inline-block;\
			width:100px;\
		}\
		#note {\
			font-size:7pt;\
			color:gray;\
			padding: 1px 10px;\
			margin: 0px 0;display:inline-block;\
			min-width:100px;\
		}\
		#rednote {\
			font-size:7pt;\
			color:red;\
			padding: 1px 10px;\
			margin: 0px 0;display:inline-block;\
		}\
		#configinfo {\
			font-size:8pt;\
			color:gray;\
			padding: 1px 10px;\
			margin: 0px 0;display:inline-block;width:60em;\
		}\
		#refAnonymizer, #inputColorLive, #hostSearchBox2, #hostSearchBox, #inputColorDead, #inputColorTemp, #inputColorCont, #selectAllButton, #selectNoneButton, #invertButton, #selectAllButton2, #selectNoneButton2, #invertButton2 {\
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
		#specinfo{\
		font-size:14px;\
		}\
		.warlc-ui-tab {\
		height:300px;\
		overflow:auto;\
		}\
		#warlcsitelist2, #warlcsitelist1 {\
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
				<a href="#"><img id="imghideshow" title="Close" class="cntrl" src="data:image/png;base64,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%3D%3D"/></a>\
			<div id="h3hideshowtitle"><img style="height:1.2em;" src="data:image/png;base64,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"></img>&nbsp;W.A.R. Links Checker Configuration</div>\
			<div id="warlc-conf-tabs">\
				<ul>\
					<li><a href="#tabs-1">Filehostings</a></li>\
					<li><a href="#tabs-2">Containers</a></li>\
					<li><a href="#tabs-3">Settings</a></li>\
					<li><a href="#tabs-4">About</a></li>\
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
					<div class="warlc-ui-buttonset">\
						<input type="button" class="warlc-ui-select-all" value="Select All">\
						<input type="button" class="warlc-ui-select-none" value="Select None">\
						<input type="button" class="warlc-ui-select-invert" value="Invert">\
					</div><br>\
					<div>Search: <input type="textbox" id="hostSearchBox2" value=""></div><br>\
					<div id="warlcsitelist2"><span>Empty</span></div>\
				</div>\
				<div id="tabs-3" class="warlc-ui-tab">\
					<div id="warlcsettings">\
					<fieldset>\
					<p><input type="checkbox" id="Keyboard_functions"> Enable keyboard shortcuts</p>\
					<div id="configinfo">' + first_key_keycodename + '+' + second_key_keycodename + '+' + CONFIGURATION_KEY + ' = Configuration <br/>' + first_key_keycodename + '+' + second_key_keycodename + '+' + CHECK_ALL_LINKS_KEY + ' = Check all the links' + '<br/>' + first_key_keycodename + '+' + second_key_keycodename + '+' + copy_to_dead_key + ' = Copy found dead links to clipboard' + '<br/>' + first_key_keycodename + '+' + second_key_keycodename + '+' + toggle_autocheck_key + ' = Autocheck ON/OFF' + '</div>\
					</fieldset>\
					<fieldset>\
					<p><input type="checkbox" id="Color_DL_links"> Color DL links</p>\
					<div id="sites"><label for="inputColorLive">Live links color</label><input type="text" id="inputColorLive" style="background:' + Live_links_color + ';" value="' + Live_links_color + '"></div>\
					<div id="sites"><label for="inputColorDead">Dead links color</label><input type="text" id="inputColorDead" style="background:' + Dead_links_color + ';" value="' + Dead_links_color + '"></div><br>\
					<div id="sites"><label for="inputColorTemp">Temp. unavailable</label><input type="text" id="inputColorTemp" style="background:' + Temp_unavailable_links_color + ';" value="' + Temp_unavailable_links_color + '"></div>\
					<div id="sites"><label for="inputColorCont">Container links color</label><input type="text" id="inputColorCont" style="background:' + Container_links_color + ';" value="' + Container_links_color + '"></div><br>\
					<div id="configinfo">For no color leave a field blank.<br>Standard HTML color names are supported. See <a href="http://www.w3schools.com/html/html_colornames.asp">w3schools.com</a> for more info.</div><br>\
					<p><input type="checkbox" id="Show_line_through_in_dead_links"> Show line through in dead links</p>\
					<p><input type="checkbox" id="Show_black_background_in_DL_links"> Show black background in DL links</p>\
					<p><input type="checkbox" id="Do_not_linkify_DL_links"> Do NOT linkify DL links</p>\
					<p><input type="checkbox" id="Allow_spaces_in_DL_links"> Allow spaces in DL links<br><div id="configinfo">Note: All links must end with a new line!</div></p>\
					<p><input type="checkbox" id="Display_full_links_in_link_containers"> Display full links in link containers</p><br>\
					<fieldset>\
					<p><input type="radio" name="warlciconset" value="0"> No icons</p>\
					<p><input type="radio" name="warlciconset" value="1"> <img src=" ' + PAW_ICON_GREEN + '"> <img src=" ' + PAW_ICON_RED + '"> <img src=" ' + PAW_ICON_YELLOW + '"></p>\
					<p><input type="radio" name="warlciconset" value="2"> <img src=" ' + RSLC_ICON_GREEN + '"> <img src=" ' + RSLC_ICON_RED + '"> <img src=" ' + RSLC_ICON_YELLOW + '"></p>\
					</fieldset>\
					</fieldset>\
					<fieldset>\
					<div id="sites"><input type="checkbox" id="Autocheck"> Autocheck</div><br><div id="configinfo">Script starts check automatically.</div><br>\
					</fieldset>\
					<fieldset>\
					<div id="sites"><input type="checkbox" id="Show_progress_stats"> Show progress stats</div><br>\
					</fieldset>\
					<fieldset>\
					<div id="sites"><input type="checkbox" id="Display_tooltip_info"> Display tooltip info</div><div id="bulk">EXPERIMENTAL</div><br><div id="configinfo">Note: File name, file size, error messages etc.</div><br>\
					</fieldset>\
					<fieldset>\
					<div id="sites"><label for="refAnonymizer">Refererer anonymizing service</label><input type="text" id="refAnonymizer" value="' + Ref_anonymize_service + '"></div>\
					</fieldset>\
					</div>\
				</div>\
				<div id="tabs-4" class="warlc-ui-tab">\
					<p><b>Author:</b> <a href="http://userscripts.org/users/302353">dkitty</a></p>\
					<p><b>Contributors:</b> <a href="http://userscripts.org/users/430723">shmoula</a></p>\
					<p><b>Testing:</b> <a href="http://userscripts.org/users/251840">badboy.majkl</a></p>\
					<br />\
					<p><b>Currently supported:</b><br>\
					Filehostings: ' + allHostNames.length + '<br />\
					Containers: ' + allContainerNames.length + '<br />\
					Obsolete sites: ' + allObsoleteNames.length + '<br /></p>\
					<br />\
					<p><b>Based on:</b><br>\
					<a href="http://userscripts.org/scripts/show/9467">Rapidshare Links Checker</a> by <a href="http://userscripts.org/users/hosts">hosts</a>.</p>\
					<br />\
					<p><b>Uses:</b></p>\
					<p>adam_3\'s <a href="http://userscripts.org/scripts/show/2254">Linkify ting</a> (modified)</p>\
					<p><a href="http://jquery.com/">jQuery</a> JavaScript Library</p>\
					<br />\
					<p>License: GPL version 3 or any later version (<a href="http://www.gnu.org/copyleft/gpl.html">http://www.gnu.org/copyleft/gpl.html</a>)</p>\
				</div>\
			</div>\
		</div>\
		</div>';
		
		$('body').append('<div id="hideshow">' + configurationinnerHTML + '</div>');
		
		$("#warlc-conf-tabs").tabs({ fx: { opacity: 'toggle', duration: 'fast' } });
		
		$("#imghideshow").click(function(event){$("#hideshow").hide(); event.preventDefault();});
				
		var elmHostList = document.getElementById("warlcsitelist1");
		var elmContainerList = document.getElementById("warlcsitelist2");
		
		buildSettings();
		buildSitelist("", allHostNames, elmHostList);
		buildSitelist("", allContainerNames, elmContainerList);
			
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

		function changeRefAnonymizer(){
			GM_setValue("Ref_anonymize_service", $("#refAnonymizer").attr("value"));
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

		//Sets temp. unavailable links color
		function changeColorCont()
		{
			var inColorCont = document.getElementById("inputColorCont");
			inColorCont.style.background = inColorCont.value;
			GM_setValue("Container_links_color", inColorCont.value);
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

			boxes = document.getElementById("warlcsitelist2").getElementsByTagName("input");

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
			$("#warlcsettings :checkbox").each(function(){
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
			
			// if (elmSpan.children.length == 1) // no matches
			// {
				// elmSpan.innerHTML = "";
				// elmSpan.appendChild(document.createTextNode('No matches'));
			// }
		}
		
		var hostSearchBox = document.getElementById("hostSearchBox");
		hostSearchBox.addEventListener('keyup', function(){buildSitelist(hostSearchBox.value, allHostNames, elmHostList);}, false);		
		
		var hostSearchBox2 = document.getElementById("hostSearchBox2");
		hostSearchBox2.addEventListener('keyup', function(){buildSitelist(hostSearchBox2.value, allContainerNames, elmContainerList);}, false);		
				
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

		var inColorCont = document.getElementById("inputColorCont");
		inColorCont.addEventListener('keyup', changeColorCont, false);
		
		
		$("#refAnonymizer").change(changeRefAnonymizer);
		//buttons and edit boxes init end

		//icon sets radio buttons
		var radioButtons = document.getElementsByName("warlciconset");
		radioButtons[Icon_set].checked = "checked";

		radioButtons[0].addEventListener("change", updateIconSet);
		radioButtons[1].addEventListener("change", updateIconSet);
		radioButtons[2].addEventListener("change", updateIconSet);
		
		function updateIconSet()
		{
			GM_setValue("Icon_set", this.value * 1);
		}
		//		
	}

//begin standard link checking algorithm
function start(filterId)
{
	var doNotLinkify = Do_not_linkify_DL_links;

	// USER SELECTED FILE HOSTS INITIALIZATION START
	var http_file_hosts = new Array(); //standard hostings
	var http_file_hosts_coded = new Array(); //hostings which has to be decoded to obtain real checkable link
	var http_file_hosts_obsolete = new Array(); //dead hostings
	var http_file_hosts_headers_only = new Array(); //hostings with direct download, must be handled via headers only

	initFileHosts();
	initFileHostsCoded();
	initFileHostsHeadersOnly();
	// USER SELECTED FILE HOSTS INITIALIZATION END

	// LINKIFICATION START
	var totalxpath = '';
	var totalxpathcoded = '';
	var totalxpathobsolete = '';
	var totalxpathheadersonly = '';
	var totalourls = '';

	var filehostLen = http_file_hosts.length;
	var filehostCodedLen = http_file_hosts_coded.length;
	var filehostObsoleteLen = http_file_hosts_obsolete.length;
	var filehostHeadersOnlyLen = http_file_hosts_headers_only.length;

	var filehostIdx = filehostLen;
	var filehostCodedIdx = filehostCodedLen;
	var filehostObsoleteIdx = filehostObsoleteLen;
	var filehostHeadersOnlyIdx = filehostHeadersOnlyLen;

	if ((filehostIdx == 0) && (filehostCodedIdx == 0) && (filehostHeadersOnlyIdx == 0) && (filehostObsoleteIdx == 0))
		return;

	while (filehostIdx--)
	{
		totalourls += http_file_hosts[filehostIdx][0] + '|';
		totalxpath += http_file_hosts[filehostIdx][4] + '|';
	}

	while (filehostCodedIdx--)
	{
		totalourls += http_file_hosts_coded[filehostCodedIdx][0] + '|';
		totalxpathcoded += http_file_hosts_coded[filehostCodedIdx][3] + '|';
	}

	while (filehostObsoleteIdx--)
	{
		totalourls += http_file_hosts_obsolete[filehostObsoleteIdx][0] + '|';
		totalxpathobsolete += http_file_hosts_obsolete[filehostObsoleteIdx][1] + '|';
	}

	while (filehostHeadersOnlyIdx--)
	{
		totalourls += http_file_hosts_headers_only[filehostHeadersOnlyIdx][0] + '|';
		totalxpathheadersonly += http_file_hosts_headers_only[filehostHeadersOnlyIdx][3] + '|';
	}

	totalourls = totalourls.replace(/\|$/g, "");
	
	//TODO: further refactoring needed
	
	totalxpath = totalxpath.replace(/\]\|\/\/a\[/g, " or ");
	totalxpath = totalxpath.replace(/\]\|/, ')]');
	totalxpathcoded = totalxpathcoded.replace(/\]\|\/\/a\[/g, " or ");
	totalxpathcoded = totalxpathcoded.replace(/\]\|/, ')]');
	totalxpathobsolete = totalxpathobsolete.replace(/\]\|\/\/a\[/g, " or ");
	totalxpathobsolete = totalxpathobsolete.replace(/\]\|/, ')]');
	totalxpathheadersonly = totalxpathheadersonly.replace(/\]\|\/\/a\[/g, " or ");
	totalxpathheadersonly = totalxpathheadersonly.replace(/\]\|/, ')]');
				
	if (filterId != null) //insert id restriction in the xpath
	{
		totalxpath = totalxpath.replace(/\[/g, "[@class='" + filterId + "' and (");
		totalxpathcoded = totalxpathcoded.replace(/\[/g, "[@class='" + filterId + "' and (");
		totalxpathobsolete = totalxpathobsolete.replace(/\[/g, "[@class='" + filterId + "' and (");
		totalxpathheadersonly = totalxpathheadersonly.replace(/\[/g, "[@class='" + filterId + "' and (");
	}
	else
	{
		totalxpath = totalxpath.replace(/\[/, "[((not(@class)) or (@class!='alive_link' and @class!='adead_link' and @class!='unava_link')) and (");
		totalxpathcoded = totalxpathcoded.replace(/\[/, "[((not(@class)) or (@class!='alive_link' and @class!='adead_link' and @class!='unava_link')) and (");
		totalxpathobsolete = totalxpathobsolete.replace(/\[/, "[((not(@class)) or (@class!='alive_link' and @class!='adead_link' and @class!='unava_link')) and (");
		totalxpathheadersonly = totalxpathheadersonly.replace(/\[/, "[((not(@class)) or (@class!='alive_link' and @class!='adead_link' and @class!='unava_link')) and (");
	}
	
	linkify(totalourls);
	//LINKIFICATION END
	
	//ENCRYPTED LINKS PROCESSING START
	if (http_file_hosts_coded.length > 0)
	{
		var linksCoded = document.evaluate(totalxpathcoded, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		// decrypt coded links (redirects, link protectors etc.)
		if (linksCoded.snapshotLength > 0)
		{
			var link;
			var reallinkreg;
			var reallinkcorrection;

			if (filterId == null)
			{
				cLinksTotal += linksCoded.snapshotLength;
			}

			var y = linksCoded.snapshotLength - 1;
			do
			{
				// linksCoded.snapshotItem(y).id = 'processing_link';
				link = linksCoded.snapshotItem(y);
				
				filehostIdx = filehostCodedLen;
				while (filehostIdx--)
				{
					if (link.href.match(http_file_hosts_coded[filehostIdx][0]))
					{

						link.href = link.href.replace(/http:\/\/.*?(?:\?|=)http:\/\//, 'http://');
						reallinkreg = http_file_hosts_coded[filehostIdx][1];
						reallinkcorrection = http_file_hosts_coded[filehostIdx][2];

						decurl(link, reallinkreg, reallinkcorrection);
						break;
					}
				}
			}
			while (y--);
		}
	}
	//ENCRYPTED LINKS PROCESSING END

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

				if (Display_tooltip_info)
				{
					obsoleteLink.warlc_error = 'Cause of error: <b>Obsolete filehosting.</b>';
				}
				
				displayTheCheckedLink(obsoleteLink, 'adead_link');
			}
		}
	}
	//OBSOLETE FILE HOSTS PROCESSING END

	//DIRECT LINKCHECKING START
	if (http_file_hosts_headers_only.length > 0)
	{
		var links = document.evaluate(totalxpathheadersonly, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		//check links
		if (links.snapshotLength > 0)
		{
			var link;
			var isAliveRegex;
			var isDeadRegex;

			var y = links.snapshotLength;


			if (filterId == null)
			{
				cLinksTotal += y;
			}

			while (y--)
			{
				// links.snapshotItem(y).id = 'processing_link';
				link = links.snapshotItem(y);
				
				filehostIdx = filehostHeadersOnlyLen;
				while (filehostIdx--)
				{
					if (link.href.match(http_file_hosts_headers_only[filehostIdx][0]))
					{
						link.href = link.href.replace(/http:\/\/.*?(?:\?|=)http:\/\//, 'http://');
						isAliveRegex = http_file_hosts_headers_only[filehostIdx][1];
						isDeadRegex = http_file_hosts_headers_only[filehostIdx][2];

						geturlHeader(link, isAliveRegex, isDeadRegex);

						break;
					}
				}
			}

		}
	}
	//DIRECT LINKCHECKING END


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
	//
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

				if (res.match(isUnavaRegex))
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

		if (Display_tooltip_info)
		{
			spanElm.href = link.href;
			spanElm.warlc_error = link.warlc_error;
			
			switch (link.className){
			case "alive_link": spanElm.addEventListener("mouseover", displayTooltipInfo, false); break
			case "adead_link": spanElm.addEventListener("mouseover", displayTooltipError, false); break;
			case "unava_link": //reserved
			default: 
			}
		}
		
		link.parentNode.replaceChild(spanElm, link);
	}

	//Assigns result status to the <a> element object and calls delinkifying eventually
	//Possible result states: adead_link, alive_link, unava_link
	function displayTheCheckedLink(link, resultStatus)
	{
		link.className = resultStatus;
		link.href = Ref_anonymize_service + link.href;
		
		if (Display_tooltip_info)
		{
			switch (resultStatus){
			case "alive_link": link.addEventListener("mouseover", displayTooltipInfo, false); break
			case "adead_link": link.addEventListener("mouseover", displayTooltipError, false); break;
			case "unava_link": //reserved
			default: 
			}
		}
		
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
		}
		//obsolete file hosts init end

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

		if (GM_getValue("Check_ultramegabit_dot_com_links", false))
		{
			addFileHost(
			"ultramegabit\\.com\/file\/details\/[\\w+-]",
			'#download"',
			'>File not found<',
			'btn-large btn-danger">',
			"//a[contains(@href,'ultramegabit.com/file')]",
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

		if (GM_getValue("Check_1fichier_dot_com_links", false))
		{
			addFileHost(
			"\\w{6}\\.(?:1fichier|dl4free)\\.com\/",
			'Download tag"|countdown">',
			'errorDiv"',
			'optional--',
			"//a[contains(@href,'1fichier.com/') or contains(@href,'dl4free.com/')]"
			);
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
		
		if (GM_getValue("Check_rapidgator_dot_net_links", false))
		{
			addFileHost(
			"rapidgator\\.net\/file\/\\d+",
			'btm" style="height: \\d+px;">\\s*<p',
			'btm" style="height: \\d+px;">\\s*<\/div',
			'optional--',
			"//a[contains(@href,'rapidgator.net/file')]",
			true
			);
		}
		
		if (GM_getValue("Check_bayfiles_dot_com_links", false))
		{
			addFileHost(
			"bayfiles\\.com\/file\/\\w+\/\\w+",
			'download\\-header">',
			'class="not-found">',
			'optional--',
			"//a[contains(@href,'bayfiles.com/file')]"
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
			"(?:tufiles|turbob1t|failoobmenik|filesmail|firebit|dlbit|files\\.china\\-gsm|3aka4aem|file\\.piratski|mnogofiles|links-free|turbo-bit|turbosfiles)\\.\\w+\/\\w+",
			'download\\-file">',
			'col-1">\\s*<h1>',
			'optional--',
			"//a[contains(@href,'tufiles.ru/') or contains(@href,'turbob1t.ru/') or contains(@href,'filesmail.ru/') or contains(@href,'failoobmenik.ru/')"+
			" or contains(@href,'firebit.in/') or contains(@href,'dlbit.net/') or contains(@href,'files.china-gsm.ru/') or contains(@href,'3aka4aem.ru/')"+
			" or contains(@href,'file.piratski.ru/') or contains(@href,'mnogofiles.com/') or contains(@href,'links-free.ru/')"+
			" or contains(@href,'turbo-bit.ru/') or contains(@href,'turbosfiles.ru/')]"
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
		
		if (GM_getValue("Check_sockshare_dot_com_links", false))
		{
			addFileHost(
			"sockshare\\.com\/file\/\\w+",
			'choose_speed">',
			'message t_0\'>',
			'optional--',
			"//a[contains(@href,'sockshare.com/file')]"
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
		
		if (GM_getValue("Check_nosupload_dot_com_links", false))
		{
			addFileHost(
			"nosupload\\.com\/(?:\\?d=)?\\w+",
			'op" value="download',
			'>File Not Found<',
			'optional--',
			"//a[contains(@href,'nosupload.com')]",
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
		
		//do not use bulk check via http://egofiles.com/checker (false positives) 
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

		//do not use checkfiles.html bulk check, not working properly for all links
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

		if (GM_getValue("Check_turbobit_dot_net_links", false)) //folders
		{
			addFileHost(
			"turbobit\\.(?:net|pl)\/download\/folder\/\\d+",
			'col-1">\\s*<s',
			'col-1">\\s*<h',
			'optional--',
			"//a[contains(@href,'turbobit.') and contains(@href,'download/folder')]"
			);
		}
		
		if (GM_getValue("Check_hitfile_dot_net_links", false)) //folders
		{
			addFileHost(
			"hitfile\\.net\/download\/folder\/\\d+",
			'content">\\s*<s',
			'content">\\s*<h',
			'optional--',
			"//a[contains(@href,'hitfile.net/download/folder')]"
			);
		}

		if (GM_getValue("Check_hotfile_dot_com_links", false)) //folders
		{
			addFileHost(
			"hotfile\\.com\/list\/\\d+\/\\w+",
			'padding-right: 10px;">',
			'>Empty Directory<',
			'optional--',
			"//a[contains(@href,'hotfile.com/list')]"
			);
		}

		if (GM_getValue("Check_netload_dot_in_links", false)) //folders
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

		if (GM_getValue("Check_divxden_dot_com_links", false))
		{
			addFileHost(
			"(?:divxden|vidxden)\.com\/\\w+\/\\w+",
			'Continue to Video"',
			'No such file',
			'optional--',
			"//a[contains(@href,'divxden.com') or contains(@href,'vidxden.com')]"
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

		if (GM_getValue("Check_muchshare_dot_net_links", false))
		{
			addFileHost(
			"muchshare\\.net\/\\w+",
			'id="btn_download"',
			'File Not Found|width: 500px; text-align: left;',
			'optional--',
			"//a[contains(@href,'muchshare.net')]"
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
			"putlocker\\.com\/file\/\\w{16}",
			'as Free User',
			'Welcome to PutLocker',
			'undergoing scheduled maintenance',
			"//a[contains(@href,'putlocker.com/file')]"
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
		
		if (GM_getValue("Check_uploadhero_dot_com_links", false))
		{
			addFileHost(
			"uploadhero\\.com\/dl\/\\w+",
			'content-dl">',
			'men_file_lost\\.jpg"',
			'optional--',
			"//a[contains(@href,'uploadhero.com/dl')]"
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

		if (GM_getValue("Check_hellshare_dot_com_links", false)) //very old type of links
		{
			addFileHost(
			"www\\.hellshare\\.com\/\\d+",
			'tab\\-details"',
			'list-purp-2"|not found on this server',
			'optional--',
			"//a[contains(@href,'www.hellshare.com')]"
			);
		}

		if (GM_getValue("Check_czshare_dot_com_links", false)) //folders
		{
			addFileHost(
			"czshare\\.com\/folders\/[\\w_]+\/\\w+",
			'"directory">',
			'header -->\\s+<div id="info\\-panel',
			'optional--',
			"//a[contains(@href,'czshare.com/folders')]"
			);
		}

		if (GM_getValue("Check_quickshare_dot_cz_links", false)) //folders
		{
			addFileHost(
			"quickshare\\.cz\/slozka-\\d+",
			'Počet souborů: <strong>[1-9]',
			'Počet souborů: <strong>0|Chyba! Taková složka neexistuje',
			'optional--',
			"//a[contains(@href,'quickshare.cz/slozka')]"
			);
		}

		if (GM_getValue("Check_multishare_dot_cz_links", false)) //folders
		{
			addFileHost(
			"multishare\\.cz\/slozka\/\\d+",
			'manager-linky">',
			'Požadovaná složka neexistuje.',
			'optional--',
			"//a[contains(@href,'multishare.cz/slozka/')]"
			);
		}

		if (GM_getValue("Check_filefactory_dot_com_links", false)) //folders
		{
			addFileHost(
			"filefactory\\.com\/f\/\\w+",
			'folderFileList">',
			'table class="items"|Pointer" class="red">',
			'optional--',
			"//a[contains(@href,'filefactory.com/f/')]"
			);
		}

		if (GM_getValue("Check_netload_dot_in_links", false)) //folders
		{
			addFileHost(
			"netfolder\\.in\/\\w+",
			'list" value="http',
			'InPage_Error">|list" value=""',
			'optional--',
			"//a[contains(@href,'netfolder.in')]"
			);
		}

		if (GM_getValue("Check_share_dash_rapid_dot_com_links", false)) //folders
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
			
			//folders
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
			//folders
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
			
			addFileHost( //folders
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

		if (GM_getValue("Check_veehd_dot_com_links", false))
		{
			addFileHost(
			'veehd\.com\/video\/.*?',
			'No sound|Download video',
			'Featured Videos',
			'optional--',
			"//a[contains(@href,'veehd.com') and contains(@href,'video')]"
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
			'download\\-file-btn"',
			'page_404_header',
			'is temporary unavailable|disponible en estos momentos|vorläufig unerreichbar|Файл временно недоступен',
			"//a[contains(@href,'extabit.com/')]",
			true
			);		
		}

		if (GM_getValue("Check_filecloud_dot_io_links", false))
		{
			addFileHost(
			'(?:s\\d+\\.)?filecloud\\.io\/\\w+',
			'var __error         	=	0',
			'FILES__DOESNT_EXIST',
			'optional--',
			"//a[contains(@href,'filecloud.io/')]"
			);
			
			addFileHost(
			'ifile\\.it\/\\w+',
			'var __error         	=	0',
			'FILES__DOESNT_EXIST',
			'optional--',
			"//a[contains(@href,'ifile.it/')]"
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
			// GM_xmlhttpRequest( //age check skip
			// {
				// method: 'POST',
				// url: 'http://ulozto.cz/hledej/?do=askAgeForm-submit',
				// data: 'agree=Souhlas%C3%ADm',
				// headers: {
					// 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
					// 'Content-type': 'application/x-www-form-urlencoded',
					// 'Referer': ""						
				// }
			// });
		
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
			"mediafire\.com\/(?:\\?\\w+|download.php|file)",
			'download_file_title">',
			'error\\.php\\?',
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

		if (GM_getValue("Check_uptobox_dot_com_links", false))
		{
			addFileHost(
			"uptobox\\.com\/\\w+",
			'download1">',
			'500px;text-align:left;">',
			'Maintenance',
			"//a[contains(@href,'uptobox.com/')]"
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
		
		if (GM_getValue("Check_depositfiles_dot_com_links", false)) //folders
		{
			addFileHost(
			"depositfiles\\.com\/folders\/\\w+",
			'<div class="progressContainer">',
			'<div id="files" class="files">\\s*<\/div>',
			'optional--',
			"//a[contains(@href,'depositfiles.com/folders')]"
			);
		}
		
	}

	function initFileHostsCoded()
	{
		function addFileHostCoded(linkRegex, reallinkRegex, correctionRegex, xpathEx)
		{
			var host = new Array(4);
			host[0] = linkRegex;
			host[1] = reallinkRegex;
			host[2] = correctionRegex;
			host[3] = xpathEx;
			http_file_hosts_coded.push(host);
		}
		
		if (GM_getValue("Check_cobrashare_dot_sk_links", false))
		{
			addFileHostCoded(
			"cobrashare\\.(?:sk|net)\:38080\/(?:CobraShare|CS)",
			'http:\/\/www\.cobra.*\";',
			'\";',
			"//a[contains(@href,'cobrashare.') and (contains(@href,'download') or contains(@href,'CS/dw'))]"
			)
		}		
	}

	//hosts with direct download, so they must be requested for headers only
	function initFileHostsHeadersOnly()
	{
		function addFileHostHeadersOnly(linkRegex, isAliveRegex, isDeadRegex, xpathEx)
		{
			var host = new Array(4);
			host[0] = linkRegex;
			host[1] = isAliveRegex;
			host[2] = isDeadRegex;
			host[3] = xpathEx;
			http_file_hosts_headers_only.push(host);
		}
	
		if (GM_getValue("Check_uloziste_dot_com_links", false))
		{
			addFileHostHeadersOnly(
			"(?:|files\\.)uloziste\\.com\/\\w+\/\\w+",
			'Connection: Keep-Alive',
			'Content-Length: 3857',
			"//a[contains(@href,'uloziste.com')]"
			)
		}

		if (GM_getValue("Check_filemonster_dot_net_links", false))
		{
			addFileHostHeadersOnly(
			"filemonster\\.net\/(?:..\/|)file\/\\w+",
			'filename="',
			'Content\\-Type: text\/html',
			"//a[contains(@href,'filemonster.net')]"
			)
		}

		if (GM_getValue("Check_uploadbin_dot_net_links", false))
		{
			addFileHostHeadersOnly(
			"uploadbin\\.net\/\\w+\/\\w+",
			'filename=',
			'Connection: close',
			"//a[contains(@href,'uploadbin.net')]"
			)
		}

		if (GM_getValue("Check_loombo_dot_com_links", false))
		{
			addFileHostHeadersOnly(
			"loombo\\.com\/\\w+",
			'Connection: keep-alive',
			'Content-Length: 4816',
			"//a[contains(@href,'loombo.com')]"
			)
		}

		if (GM_getValue("Check_adrive_dot_com_links", false))
		{
			addFileHostHeadersOnly(
			"adrive\\.com\/public\/\\w+",
			'Connection: keep-alive',
			'orig_ref=deleted',
			"//a[contains(@href,'adrive.com')]"
			)
		}
		
		if (GM_getValue("Check_ubuntuone_dot_com_links", false))
		{
			addFileHostHeadersOnly(
			"ubuntuone\\.com\/\\w+",
			'; filename=',
			'Content-Length: 20',
			"//a[contains(@href,'ubuntuone.com/')]"
			)
		}

		if (GM_getValue("Check_myupload_dot_dk_links", false))
		{
			addFileHostHeadersOnly(
			"myupload\\.dk\/showfile\/\\w+",
			'Expires:',
			'squeeze1\\s+Vary',
			"//a[contains(@href,'myupload.dk/showfile')]"
			)
		}

		if (GM_getValue("Check_storage_dot_novoro_dot_net_links", false))
		{
			addFileHostHeadersOnly(
			"storage\\.novoro\\.net\/pub\/\\w*",
			'Etag:',
			'Expires:',
			"//a[contains(@href,'storage.novoro.net')]"
			)
		}
	}
}

function initClipBoardTools()
{
	unsafeWindow.copyToClipboard = function(text)
	{
		try
		{
			this.netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');

			var str = Components.classes["@mozilla.org/supports-string;1"].
			createInstance(Components.interfaces.nsISupportsString);
			if (!str) return false;

			str.data = text;

			var trans = Components.classes["@mozilla.org/widget/transferable;1"].
			createInstance(Components.interfaces.nsITransferable);
			if (!trans) return false;

			trans.addDataFlavor("text/unicode");
			trans.setTransferData("text/unicode", str, text.length * 2);

			var clipid = Components.interfaces.nsIClipboard;
			var clip = Components.classes["@mozilla.org/widget/clipboard;1"].getService(clipid);
			if (!clip) return false;

			clip.setData(trans, null, clipid.kGlobalClipboard);
		} catch (e) {
			GM_log("Error copyToClipboard : " + e);
			alert(e + "\n\nsigned.applets.codebase_principal_support must be set true in about:config")
        }
	}
}