// ==UserScript==
// @name			TheWarez - TheWarez Links Checker
// @description		Automatically checks for dead links from various file hosting services.
// @details			Based on popular W.A.R. Links Checker, this script automatically checks links from 1000+ unique filehostings. For Firefox, Chrome, Safari. 
// @version			2.3.4
// @license			Please do not modify yourself, contact authors with any problems
// @author			TWAdmin
// @include			*thewarez.org*
// @grant			GM_xmlhttpRequest
// @grant			GM_addStyle
// @grant			GM_registerMenuCommand
// @grant			GM_getResourceText
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @usoscript		153759
// ==/UserScript==

var WarBB_version = "2.3.4";

//separate alternative domains with "|" char (first name is considered being main)
var allHostNames = ["1fichier.com|dl4free.com", "2shared.com", "4fastfile.com", "adrive.com", "bezvadata.cz", "bitshare.com", "filebeam.com",
"burnupload.com|burnupload.ihiphop.com", "cramit.in|cramitin.net", "czshare.com", "dataport.cz", "datei.to", "daten-hoster.de|filehosting.org",
"divxden.com|vidbux.com", "easy-share.com|crocko.com", "easybytez.com", "edisk.cz", "euroshare.eu", "fastshare.cz", "fiberupload.net",
"filefactory.com", "eyesfile.net|eyesfile.com|eyesfile.co|eyesfile.org", "fileflyer.com", "filerio.com|filekeen.com", "filemonster.net",
"nosupload.com", "upsto.re", "box.com", "files.mail.ru", "files.to", "filepost.com|fp.io", "filesend.net", "filesflash.com", "upafile.com",
"secureupload.eu", "filesmonster.com", "filestore.to", "freakshare.net", "filedwon.com", "ukfilehost.com", "free.fr", "free-uploading.com",
"gigapeta.com", "gigasize.com", "gigaup.fr", "videopremium.net", "goldfile.eu", "hipfile.com", "hostuje.net", "vidup.me", "dizzcloud.com",
"filehost.ro", "gorillavid.in", "hulkshare.com|hu.lk", "ifolder.ru|rusfolder.com", "jumbofiles.com", "allmyvideos.net", "sharerepo.com",
"leteckaposta.cz|sharegadget.com", "load.to", "mediafire.com", "megafileupload.com", "megashares.com", "filemaze.ws", "movshare.net",
"myupload.dk", "narod.ru|narod.yandex.ru", "netload.in", "speedvid.tv", "partage-facile.com", "putlocker.com|firedrive.com", "fileim.com",
"ultramegabit.com", "limelinx.com", "sfshare.se", "filewe.com", "queenshare.com|10upload.com", "quickshare.cz", "rapidshare.com", "putcker.com",
"rapidshare.ru", "daj.to", "depositfiles.com|dfiles.eu", "rapidgator.net|rg.to", "rarefile.net", "rayfile.com", "rghost.net", "sendmyway.com",
"4savefile.com", "filebulk.com", "videozed.net", "sendspace.com", "share-online.biz|egoshare.com", "sharingmaster.com", "fileplaneta.com",
"midupload.com", "slingfile.com", "solidfiles.com", "speedfile.cz", "filenuke.com", "fileparadox.in", "creafile.net", "rapidstation.com",
"speedshare.org", "tufiles.ru", "zippyshare.com", "ryushare.com", "rodfile.com", "wikiupload.com", "uloz.to|ulozto.cz|bagruj.cz|zachowajto.pl",
"ulozisko.sk", "uloziste.com", "basicupload.com", "fileneo.com", "uploadbin.net", "uploaded.to|ul.to", "uploading.com", "uploadjet.net",
"rnbload.com", "swankshare.com", "uploadspace.pl", "upnito.sk", "uptobox.com", "usaupload.net", "veehd.com", "videobb.com", "filecloud.cc",
"videozer.com", "uploads.bizhat.com", "webshare.cz", "xdisk.cz", "yunfile.com|filemarkets.com|yfdisk.com", "nitrobits.com", "mega-myfile.com",
"divshare.com", "flyfiles.net", "nowdownload.eu", "asfile.com", "prefiles.com", "axifile.com", "zalil.ru", "ortofiles.com", "uploadc.com",
"sharefiles.co", "amonshare.com", "data.hu", "blitzfiles.com", "filesbowl.com", "freestorage.ro", "spaceforfiles.com", "zalaa.com", "turtleshare.com",
"netkups.com", "vreer.com", "upfile.biz", "file-speed.com", "hulkload.com", "speedshare.eu", "tusfiles.net", "uppit.com", "ddlstorage.com",
"downloadani.me", "filesabc.com", "share.az", "sockshare.com", "nekaka.com", "file4safe.com", "sharebeast.com", "180upload.com", "verzend.be",
"asixfiles.com", "zomgupload.com", "ravishare.com", "movreel.com", "4up.me|4upfiles.com", "extmatrix.com", "sendfiles.nl", "yourfilestore.com",
"filebig.net", "sharesix.com", "hulkfile.eu|duckfile.net", "luckyshare.net", "uploadic.com", "fileswap.com", "potload.com", "clouds.to",
"billionuploads.com", "rockdizfile.com", "exclusivefaile.com|exclusiveloader.com", "filesbb.com", "myvdrive.com", "filesin.com", "novafile.com",
"longfiles.com", "albafile.com", "host4files.com", "lumfile.com|terafile.co", "uploadhero.com|uploadhero.co", "uploadbaz.com", "expressleech.com",
"file-space.org", "stahovadlo.cz", "datafilehost.com", "bitupload.com", "bayfiles.net", "vshare.eu", "files.indowebster.com", "file4u.pl", "kie.nu",
"superload.cz", "mafiastorage.com", "fileband.com", "filesmall.com", "flashx.tv", "minus.com|min.us", "filesmelt.com", "hellupload.com",
"packupload.com", "uploadingit.com", "stiahni.si", "filefolks.com", "sendspace.pl", "fastshare.org", "divxstage.eu", "sinhro.net", "filestore.com.ua",
"filesbomb.com", "cepzo.com", "project-free-upload.com", "imzupload.com", "hostingbulk.com", "speedy-share.com", "100shared.com", "igetfile.com",
"xvidstage.com", "vidbull.com", "rapidfileshare.net", "filebox.ro|fbx.ro", "mixturecloud.com|mixturefile.com", "filefront.com|gamefront.com",
"yourupload.com", "file-upload.net", "restfile.ca|restfile.com|restfile.cc|restfile.org|restfile.net", "fliiby.com", "storagon.com", "dodane.pl",
"jumbofiles.org|jumbofilebox.com", "rapidapk.com", "upshared.com", "upload.ee", "putme.org", "hugefiles.net", "mega.co.nz", "thefile.me",
"unlimitshare.com", "share4web.com", "epicshare.net", "novamov.com", "filedropper.com|filesavr.com", "yourfiles.to", "skydrive.live.com",
"uploadboy.com", "city-upload.com", "mijnbestand.nl", "ultrashare.net", "dosya.tc", "exfile.ru", "fileshare.ro", "fshare.vn", "wikifortio.com",
"wyslijto.pl", "kiwi6.com", "localhostr.com|lh.rs|hostr.co", "remixshare.com", "hidemyass.com", "tinyupload.com", "gigabase.com", "trainbit.com",
"videobam.com", "hyperfileshare.com", "uploads.ws", "ge.tt", "donevideo.com", "mightyupload.com", "megafiles.se", "1st-files.com", "keep2share.cc|k2s.cc", 
"cloud-up.be", "fiberstorage.net", "uploadhunt.com", "junocloud.me", "karelia.pro", "boomupload.net", "bestreams.net", "1-clickshare.com", "flashdrive.it",
"fastupload.ro", "fujifile.me", "howfile.com", "failai.lt", "vidspot.net", "file4go.com", "hostinoo.com", "movdivx.com", "pandamemo.com", "youwatch.org",
"spicyfile.com", "m5zn.com", "upload-il.com", "sube.me", "files2upload.net", "vidto.me", "hyshare.com", "filezy.net", "arabloads.com", "davvas.com",
"filesline.com", "megacache.net", "sanshare.com", "sendfile.su", "akafile.com", "todayfile.com", "lafiles.com", "medofire.com", "mystore.to",
"anonfiles.com", "upitus.net", "medafire.net", "medoupload.com", "fastflv.com", "herosh.com", "girlshare.ro", "bin.ge", "nowvideo.eu", "video.tt",
"shareplace.com", "terafiles.net", "uploadmb.com", "exfilehost.com", "cometfiles.com", "filetug.com", "datafile.com", "shareswift.com", "ex-load.com",
"depfile.com", "uncapped-downloads.com", "isavelink.com", "filesear.com", "clicktoview.org", "promptfile.com", "zixshare.com", "maxisharing.com",
"katzfiles.com", "filebar.kz", "yourfilelink.com", "fileom.com", "1file.cc", "backin.net", "uploadscenter.com", "vidhog.com", "qshare.com", "guizmodl.net",
"1000shared.com", "gigfiles.net", "freakbit.net", "upload-novalayer.com", "filewist.com", "airupload.com", "dropbox.com", "uplds.com", "wikisend.com",
"wrzuc.to", "safecloud.so", "webfilehost.com", "myuplbox.com", "roshare.info", "demo.ovh.eu", "treefile.org|treefiles.com|treesfile.com", "megarelease.org",
"lemuploads.com", "filepup.net", "filedap.com", "divxpress.com", "dwn.so|dwnshare.pl", "sharephile.com", "upgiga.com", "koofile.com", "earnupload.eu",
"netkozmos.com", "maherfire.com", "droidbin.com", "d-h.st", "loadpot.net", "kingfiles.net", "shareblue.eu", "redload.net", "upfile.vn", "share4files.com",
"grifthost.com", "limevideo.net", "nirafile.com", "uploadinc.com", "batshare.com", "lunaticfiles.com", "wozupload.com", "kingsupload.com", "media1fire.com",
"usefile.com", "vidplay.net", "cyberlocker.ch", "mydisc.net", "med1fire.com", "stahuj.to", "upbooth.com", "anysend.com", "vodlocker.com", "uploadrocket.net",
"snoork.com", "vidx.to", "filecloud.io", "foxishare.com", "redbunker.net", "uploadnetwork.eu", "kookfile.com", "cloudstor.es", "uploadable.ch",
"cloudvidz.net", "maskfile.com", "hexupload.com", "moevideo.net", "dogupload.com|filesfrog.net", "sendfile.pl", "shareprofi.com", "rocketfile.net",
"salefiles.com", "anafile.com", "bonanzashare.com", "shared.com", "filetrip.net", "fileshareup.com", "imgjungle.com", "unlimitzone.com", "rapidu.net",
"filegrep.com", "wallobit.com", "filepi.com", "swatupload.com", "2downloadz.com", "qfpost.com", "rapidfiles.com", "rosharing.com", "storagely.com",
"uploadzeal.com", "wipfiles.net", "upsharez.com", "superupload.com", "tropicshare.com", "archive.org", "played.to", "streaming.to", "uploadcapital.com",
"filemoney.com", "filehoot.com", "qkup.net", "filecity.eu", "mxua.com", "uploadsat.com", "cloudyvideos.com", "filekom.com|filemac.com", "interfile.net",
"idup.in", "filedais.com", "fileforever.net", "rioupload.com", "migupload.com", "medofire.co", "filemonkey.in", "bluehaste.com", "up09.com", "nodaup.com",
"fcore.eu", "4downfiles.com", "1clickfiles.com", "berofile.com", "weshare.me", "filemup.com", "hottera.com", "lomafile.com", "tuxfile.com", "twojepliki.eu",
"hightail.com|yousendit.com"];

try {
	//iframes excluded
	if (window.top != window.self) {
		return;
	}
	
	//allHostNames sites excluded
	if (window.location.href.match("https?:\/\/(www\.)?[\w\.-]*(?:" + allHostNames.join("|").replace(/\./g, "\\.").replace(/-/g, "\\-") + ")")) {
		return;
	}
} catch (e) {
	return;
}

//separate alternative domains with "|" char (first name is considered being main)
var allContainerNames = ["safelinking.net"];

//separate alternative domains with "|" char (first name is considered being main)
var allObsoleteNames = ["uloz.cz", "storage.to", "iskladka.cz", "file-rack.com", "fast-load.net", "subory.sk", "bigandfree.com", "fileop.com",
"mujsoubor.cz", "sendfile.to", "superfastfile.com", "quickyshare.com", "duckload.com", "uploadstore.net", "meinupload.com", "dualshare.com",
"2xupload.to|2xupload.de", "oxedion.com", "uploadline.com", "dll.bz", "movieshare.in", "milledrive.com", "quickupload.net", "safelink.in",
"metadivx.com", "divxlink.com", "uploadrack.com", "teradepot.com", "dataup.to", "upit.to", "driveway.com", "eatlime.com", "a2zuploads.com",
"friendlyfiles.net", "flyfile.us", "uploadspace.eu", "keepfile.com", "piggyshare.com", "share.cx", "6giga.com", "filecrown.com", "bluehost.to",
"filegu.ru", "filebase.to", "up-file.com", "ezyfile.net", "aiotool.net", "xvideos.com", "filebling.com", "uploadcell.com", "uploadshare.cz",
"mangoshare.com", "filestab.com", "crazyupload.com|crazyupload.us", "gaiafile.com", "loaded.it", "sharejunky.com", "fileho.com", "bigfile.in",
"bigshare.eu", "dahosting.org", "digisofts.net", "file4save.com", "uploaddot.com", "filechip.com", "filescloud.com", "saveqube.com", "turboshare.de",
"youshare.com", "jiffyupload.com", "gigeshare.com", "datenklo.net", "z-upload.com", "upload.dj", "loadfiles.in", "dsfileshare.com", "sharesimple.net",
"4files.net", "odsiebie.com|odsiebie.pl", "filenavi.com", "3oof.com", "meshwaar.com", "maxupload.com", "atserver.eu", "uploadlab.com", "i741.com",
"savefiles.net", "file2upload.net", "filebling.com", "turboshare.com|turboshare.eu", "rarhost.com", "file2share.biz", "fofly.com", "filespawn.com",
"isharehd.com", "dataup.de", "shareonall.com", "sexuploader.com", "megaupload.com|megavideo.com|megaporn.com|megarotic.com", "caizzii.com",
"uploadhyper.com", "volnyweb.cz", "usershare.net", "filescash.net", "metahyper.com", "combozip.com", "x7.to", "hatlimit.pl", "filepoint.de",
"enterupload.com|flyupload.com", "mystream.to", "srapid.eu", "sosame.cz", "filesdump.com", "2-klicks.de", "noovashare.com", "bulletupload.com",
"shareator.com|shareator.net", "silofiles.com", "filehook.com", "uploadking.com", "uploadhere.com", "kewlshare.com", "mountfile.com", "transitfiles.com",
"filejungle.com", "shareshared.com", "quickyshare.com", "save.am", "petandrive.com", "filezlot.com", "filesonic.com|sharingmatrix.com|wupload.com",
"fileserve.com|uploadstation.com", "uploads.glumbo.com|glumbouploads.com|glumbouploads.net", "rapidable.com", "skipfile.com", "smartuploader.com",
"dualshare.com", "storeandserve.com", "file2box.com|file2box.net", "flyshare.cz","yabadaba.ru", "cloudcache.cc", "yourfilehost.com", "jakfile.com",
"kickload.com", "pyramidfiles.com", "gotupload.com", "mooload.com", "fooget.com", "refile.net", "zshare.net", "ddlani.me|ddlanime.com", "ftp2share.com",
"rapidhide.com", "zupload.com", "mytempdir.com", "onionshare.com", "stahnu.to", "oron.com", "badongo.com|badongo.net", "filereactor.com", "filegaze.com",
"megashare.com|MegaShare.com", "sharerun.com", "1hostclick.com", "4us.to", "dinnoz.com", "restfile.co|restfile.bz|restfile.ws|restfiles.com",
"missupload.com", "fileud.com", "up250.com", "miurl.es", "uploadspot.com", "upload.ae", "launchfile.com", "proddl.com", "fileape.com", "azushare.net",
"uploadsfiles.com", "cloudnxt.net", "maishare.net|maishare.com", "uploading4u.com|uploading4u.eu", "uploadboost.com", "filelaser.com", "filefat.com",
"filedino.com", "4bytez.com", "anonstream.com", "bitroad.net", "brontofile.com", "cloudnator.com|shragle.com", "coolshare.cz", "seeupload.com",
"wolfshare.com", "dark-uploads.com", "dotavi.com", "file-bit.net", "filecosy.com", "fileduct.com", "filemashine.com", "fileserver.cc", "filetechnology.com",
"fireuploads.net", "getzilla.net", "hellspy.com", "holderfile.com", "ihostia.com", "k2files.com", "migahost.com", "mlfat4arab.com", "loadly.com",
"mojofile.com", "ovfile.com", "plunder.com", "premiuns.org", "shafiles.me", "sharefilehost.com", "storage.novoro.net", "x-fs.com", "uploadstube.de",
"xfileshare.eu", "bzlink.us", "cing.be", "linksafe.me", "fileupped.com", "getthebit.com", "hackerbox.org", "afilez.com", "uploadmachine.com",
"uploadoz.com", "upthe.net", "paid4share.net|paid4share.com", "icefile.net|icefile.com", "smartsharing.net", "fxpag.com", "filebeep.com",
"smartupload.net", "timbshare.com", "iuploadfiles.com", "zizfile.com", "files-upload.com", "pointupload.com", "uploadarmy.com", "mydir.eu", 
"pctoworld.com", "direktload.org", "momupload.com", "yastorage.com", "sharedzilla.com", "simpleupload.net", "quicksharing.com", "buploads.com",
"uploadhut.com", "orbitfiles.com", "midload.com", "savefile.info", "cocoshare.cc", "sharebase.de", "filehost.to", "bit.vc", "fileholding.com",
"woofiles.com", "xuploading.com", "uploadchoice.com", "speedshare.us", "uploadville.com", "supasic.com", "uploadpalace.com", "uploadr.com",
"rapidfile.fr", "openupload.com", "miniuploads.com", "titanicshare.com", "sharelor.com", "keepmyfile.com", "sharebigfile.com", "share.am",
"sprintshare.com", "rapidupload.eu", "theonlinedatastorage.com", "ugotfile.com", "MegaFTP.com|megaftp.com", "filevelocity.com", "dopeshare.com",
"filethe.net", "6ybh-upload.com", "zetshare.net", "udic.co", "uploadables.com", "filevegas.com", "coolfilehost.com", "do32.com", "pcdesignfile.hi2.ro",
"kitwit.info", "filessharefg.3x.ro", "megafilesharing.com", "gfxheaven.co.uk", "seed-share.com", "linkrevenue.net", "neturl.info", "twinupload.com",
"mazzikatop.com", "saba.mehargroup.org", "themeyoou.com", "sharequickly.com", "downup.us.to", "gfxshare.net", "speeddsharing.info", "sharedl.com",
"filestrack.com", "emodownloads.com", "fileslinks.com", "themes.pickplus.net", "mruploads.com", "warmfile.com", "gptfile.com", "uploadfloor.com",
"bestsharing.com", "getfile.biz", "upload66.com", "fileshack.icraze.net", "mazupload.com", "halotemplate.free.fr", "desiload.com", "filegiant.net",
"shareupload.com", "hotelupload.com", "voodoom.com", "getupload.com", "url.file.am", "dago.to", "hamstershare.com", "cinshare.com", "supashare.net",
"sharepro.info", "momoshare.com", "sloveniandesigner.com", "multidesi.com", "clonefile.com", "uploadski.com", "speedie-host.com", "turboupload.com",
"weefile.com", "mykupload.freei.me", "savefile.com", "upload.ps", "share2u.net", "appscene.org", "filestock.net", "filestock.ru", "youmirror.biz",
"projectcamelot.org", "gigupload.com", "fairyshare.com", "divxcloud.com", "editandshare.com", "hostupload.net", "fileshaker.com", "youload.to",
"addat.hu", "filedeck.net|FileDeck.net", "eyvx.net", "filesnab.com", "filetitle.com", "ufliq.com", "sharebeats.com", "yotafile.com", "xxlupload.com",
"your-filehosting.com", "uploading.to", "mummyfile.com", "play-host.net", "namipam.com", "alldrives.ge|allshares.ge", "filestrum.com", "uploadace.com",
"7ups.net", "buckshare.com", "cokluupload.com", "filefaster.com", "divxme.com", "rapidmedia.net", "filerace.com", "mdj.com", "crocshare.com",
"movbay.org", "migafile.com", "dudupload.com", "fileuploadx.de", "fufox.net", "sharefiles4u.com", "fileor.com", "filedove.com", "wickedupload.com",
"freefilehosting.ws", "uploadby.us", "kisalt.me", "wizzupload.com", "squillion.com", "37v.net", "xshar.net", "filemsg.com", "datafile.us", "smallfile.in",
"space4upload.info", "nrgfile.com", "okah.com", "filemojo.com", "filerose.com", "mega.huevn.com", "ex.ua", "filespump.com", "byethost12.com",
"filezzz.com", "xazon.com", "uploadersite.com", "filegetty.com", "nfile.eu", "box4upload.com", "envirofile.org", "omxira.com", "evilshare.com",
"sharehoster.de", "rapidoyun.com", "monsteruploads.eu", "coraldrive.net", "files2k.eu", "kiwiload.com", "i-filez.com", "mylordweb.com", "edoc.com",
"mooshare.net", "uploadbox.com", "aieshare.com", "filegag.com", "sharpfile.com", "gbmeister.com", "db-rap.com", "venusfile.com", "sharesystems.de",
"flameupload.com", "upload.lu", "tm.gwn.ru", "syl.me", "fast-sharing.com", "ifilehosting.net", "filehost.ws", "bubblefiles.com", "upgrand.com", "gups.in",
"fileqube.com", "upshare.eu|upshare.net", "turbo-share.com", "uploadit.ws", "alexupload.com", "littleurl.net", "rlslog.in", "faramovie4.com",
"dude.ir|DUDE.ir", "dosyakaydet.com", "filescube.com", "down.uc.ae", "filebrella.com", "filerobo.com", "nnload.com", "jamber.info", "flameload.com",
"interupload.com|InterUpload.com", "peejeshare.com|peeje.com", "speed-download.com", "uploadtornado.com", "fastyurl.info", "wantload.com", "filevo.com",
"bgdox.com", "grupload.com", "sms4file.com", "solidfile.com", "20g.info", "purples.byethost3.com", "tvshack.net", "eufiles.net", "rs-layer.com",
"archiv.to", "share.gulli.com", "sharebees.com", "uptorch.com", "filedownloads.org", "file4sharing.com", "terabit.to", "downupload.com", "cobrashare.sk",
"kongsifile.com", "uload.to", "filesector.cc", "groovefile.com", "upfile.in", "uploadcore.com", "kewlfile.com", "przeklej.pl", "share2many.com",
"megarapid.eu", "farmupload.com", "exzip.com", "firerapid.net", "splitr.net", "loombo.com", "superupl.com", "xoomshare.com", "file2011.co.cc",
"unextfiles.com", "speedoshare.com", "neoupload.com", "adlee.ch", "shareupload.net", "tvchaty.com", "jumbodrop.com", "nukeshare.com", "filemates.com",
"putbit.com", "uploadbear.com", "upload.el3lam.com", "videoal3rab.com", "upzetta.com", "paid4download.com", "mintupload.com", "home4file.com",
"fullshare.net", "down.vg", "sharehoster.com", "wootly.com", "spreadmyfiles.com", "bayfiles.com", "smallfiles.org", "mojedata.sk", "premfile.com",
"rapidspread.com", "filesforshare.com", "servup.co.il", "mydownz.com", "mozillashare.com", "good.net", "lizshare.net", "xlfile.com", "xtraupload.de",
"nahraj.cz", "primeupload.com", "bravoshare.net", "infinitemb.com", "filenavi.com", "onefile.net", "freefolder.net", "allbox4.com", "share76.com",
"sharebase.to", "fshare.eu", "profitupload.com", "seedmoon.com", "xupad.com", "youshare.eu", "filecache.de", "icushare.com", "eroshare.in", "seedfile.com",
"filepanda.com", "downloadng.info", "share-rapid.com", "gator175.hostgator.com", "pigsonic.com", "maskshare.com", "wayfile.com", "daddyfile.com",
"filezup.com", "uploadhappy.com", "live-share.com", "mirrorvip.com", "freesofty.com", "fdcupload.com", "zhostia.com", "upmega.com", "ifpost.com",
"you-love.net", "uploo.net", "6lqh.com", "free-share.ru", "okay2upload.com", "space4file.com", "filedefend.com", "sharedbit.net", "fileuplo.de",
"megashareslink.com", "filedepot.info", "gbitfiles.com", "tsarfile.com", "hsupload.com", "videoveeb.com", "freeuploads.fr|uploa.dk", "filesony.com",
"uploking.com", "vidpe.com", "upload.th.la", "loadhero.net", "filesega.com", "netuploaded.com", "filecloud.ws", "w.hulkfile.eu|w.hulkfile.com",
"aimini.net", "4share.ws", "enigmashare.com", "kupload.org", "filedude.com", "zooupload.com", "2download.de", "fileshare.in.ua", "openfile.ru",
"hotuploading.com", "good.com", "sprezer.com", "qubefiles.com", "demo.ovh.com|demo.ovh.net|demo.ovh.co.uk|demo.ovh.nl", "fileopic.com", "almmyz.com",
"putme.org", "98file.com", "upaj.pl", "filexb.com", "fileza.net", "erofly.cz", "filezpro.com", "multifilestorage.com", "ok2upload.com", "uploadorb.com",
"cobrashare.net", "share-now.net", "upload.tc", "bitbonus.com", "fileupup.com", "drop.st", "maxshare.pl", "saarie.com", "toucansharing.com", "hotfiles.co",
"westfiles.com", "novaup.com", "ishare.bz", "putshare.com|putshare.net", "uploadur.com", "hostfil.es", "fileprohost.me|fileprohost.com", "ddl.mn",
"aavg.net|aa.vg|downdone.com", "bitsor.com", "data-loading.com", "teradisk.cz", "skyfile.co", "xvidstream.net", "earnupload.net", "ngsfile.com",
"asapload.com", "cloudnes.com", "megaload.it", "ddl.ultimate-war3z.com", "share.vid321.com", "henchfile.com|HenchFile.com", "datacloud.to", "brutalsha.re",
"gettyfile.ru", "allmyfiles.ca", "baxfile.com", "divxmov.net", "additin.com", "afilehosting.com", "hotlinkfiles.com", "1fhs.com", "all-upload.com",
"hostingfilefree.com", "filewinds.com", "fileupper.com", "uploaders.be", "filemo.com", "banashare.com", "useupload.com", "mihd.net", "uploaded.de",
"boost.am", "fileden.com", "hotfiles.ws", "q4share.com", "megaul.com", "uploadegg.com", "saryshare.com", "sendshack.com", "easy-dump.com", "zenload.com",
"filecrunch.com", "fileupyours.com", "x7files.com", "filesurf.ru", "lionfiles.com", "faststream.in", "zefile.com", "ultrafiles.com", "megabitshare.com",
"247upload.com", "clipshouse.com", "ginbig.com", "bitload.it", "uplly.com", "zedupload.com", "load.tc", "fileking.co", "rapidupload.sk", "centupload.com",
"ritafile.com", "hotfile.com", "enjoybox.in", "filenova.net", "nutfile.com|syfiles.com", "filestay.com", "filebox.com", "load2.me", "sharemole.com",
"fastsonic.net", "bigupload.com", "treefiles.org", "wooupload.com", "fileforth.com", "ulmt.in", "upkiller.com", "somefiles.net", "cloudzer.net|clz.to",
"easyfilesharing.info", "warserver.cz", "filedock.me", "soniclocker.com", "hi5upload.com", "ezzfile.co.nz", "ifile.ws", "filehosting.pw", "ufox.com",
"oteupload.com", "nazibunny.com", "files4up.com", "filebigz.com", "filesflush.com", "embedload.com", "extabit.com", "geturfile.com", "kenshare.eu"];

var wbbCensoredHosts = ["filevice.com", "egofiles.com", "mirrorafile.com", "vip-file.com", "ufile.eu", "hitfile.net", "dirrectmirror.com", "keeplinks.me",
"jheberg.net", "go4up.com", "exoshare.com", "digzip.com", "dl4.ru", "mirrorupload.net", "maxmirror.com", "uploadtubes.com", "uploadmirrors.com",
"uploadonall.com", "embedupload.com", "megaupper.com", "qooy.com", "multisiteupload.com", "multi-up.com", "multiupload.com|multiupload.nl", "multiload.cz",
"mirrorcreator.com|mir.cr", "sharebee.com", "linkcrypt.ws", "linksave.in", "ncrypt.in", "unibytes.com", "share-links.biz|s2l.biz", "sharecash.org",
"multishare.cz", "catshare.net", "4shared.com", "muchshare.net", "netfolder.in", "ziddu.com", "uploadblast.com", "uploadjockey.com", "shareflare.net",
"adf.ly", "hellshare.com", "turbobit.pl|turbobit.net", "letitbit.net", "speedy.sh|speedyshare.com", "2downloadz.com", "anafile.com", "cyberlocker.ch",
"gamefront.com", "ddlstorage.com", "fileneo.com", "queenshare.com", "filemaze.ws", "goo.gl", "tiny.cc", "bit.ly", "tinyurl.com", "is.gd", "vidxden.com",
"q.gs", "imxd.net", "unlimit.co.il", "multiup.org", "flashmirrors.com", "filemirrorupload.com", "lix.in", "toturl.us", "fff.re", "directmirror.com",
"uploadseeds.com", "uploadmagnet.com", "sflk.in", "adfoc.us", "urlz.so", "filetolink.com", "mtsafelinking.org", "up.ht"];

//start autoupdater
var update = {
	version: "",
	currentTime: new Date().valueOf(),
	
	init: function() {
		var timeDiff = update.currentTime - Last_Update_Check;
		if (timeDiff >= 3600000) update.check();
	},
	
	check: function() {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://warbb.pw/update",
			onload: function(result) {
				lsSetVal("general", "Last_Update_Check", new Date().valueOf());
				res = JSON.parse(result.responseText);
				if (res.version.replace(/\./g,"") > WarBB_version.replace(/\./g,"")) update.getUpdate(res.url, res.version);
				else sendMessage("Your version of WarBB (v" + WarBB_version + ") is up to date.");
			}
		});
	},
	
	getUpdate: function(updateUrl, version) {
		sendMessage("WarBB has checked for updates and found version " + version + ".");
		alert("WarBB - An update is available (v" + version + "). The update will be installed once you dismiss this popup.");
		if (chromeBrowser) window.open(updateUrl, '_blank');
		else window.location = updateUrl;
	}
};
//end autoupdater

String.prototype.contains = function(searchString) {
	if (searchString.constructor === RegExp) {
		if (searchString.test(this)) return true;
		else return false;

	} else if (searchString.constructor === String) {
		function replaceStr(string) {
			return string.replace(new RegExp(RAND_STRING, 'g'), '|');
		}

		searchString = searchString.replace(/\\\|/g, RAND_STRING);
		var searchArray = searchString.split('|');

		if (searchArray.length > 1) {
			var found = false;
			var i = searchArray.length;

			while (i--) {
				if (this.indexOf(replaceStr(searchArray[i])) > -1) {
					found = true;
					break;
				}
			}

			return found;

		} else {
			if (this.indexOf(replaceStr(searchString)) > -1) return true;
			else return false;
		}
	} else {
		throw new TypeError('String.contains: Input is not valid, string or regular expression required, ' + searchString.constructor.name + ' given.');
	}
}

var firstRun = JSON.parse(localStorage.getItem("WarBB_First_Run"));
if (firstRun == null) firstRun = true;

var chromeBrowser = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());

var preferences = JSON.parse(localStorage.getItem("WarBB_Preferences"));

allHostNames.sort();
allContainerNames.sort();
allObsoleteNames.sort();

var RAND_STRING = "8QyvpOSsRG3QWq";
var RAND_INT = Math.floor(Math.random()*10000);
var RAND_INT2 = Math.floor(Math.random()*10000);

var WBB_MODE = false;
if (window.location.host.contains('thewarez.org')) {
	WBB_MODE = true;
}

var ANONYMIZE_SERVICE;
var ANONYMIZERS = ['http://www.blankrefer.com/?', 'http://hidemyass.com/?', 'http://anonym.to/?', 'http://refhide.com/?', 'http://nullrefer.com/?', 'http://anonymz.com/?'];
var EB_LOGIN = ["dj.black.ninja@gmail.com", "~7&K^q^E8.*fHc#fKK5z"];

var TOOLTIP_MAXWIDTH = 600; //in pixels

//global settings start
var Do_not_linkify_DL_links, Display_tooltip_info, Last_Update_Check, Allow_spaces_in_DL_links, Display_full_links_in_link_containers, Show_Update_Notification;
var Processbox_Pos_X, Processbox_Pos_Y, Progressbox_Scaling;

var cLinksTotal = 0;
var cLinksDead = 0;
var cLinksAlive = 0;
var cLinksUnava = 0;
var cLinksUnknown = 0;
var cLinksProcessed = 0;

var filehostsAlive = "";
var filehostsDead = "";
var filehostsUnava = "";
var filehostsUnknown = "";

var intervalId; //for updateProgress()

//icon resources
var alive_link_png	= 'data:image/png;base64,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';
var adead_link_png	= 'data:image/png;base64,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';
var unava_link_png	= 'data:image/png;base64,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';
var unknown_link_png = 'data:img/png;base64,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';
var processing_link_gif = 'data:image/gif;base64,R0lGODlhEAALAPQAAP///wAAANra2tDQ0Orq6gYGBgAAAC4uLoKCgmBgYLq6uiIiIkpKSoqKimRkZL6+viYmJgQEBE5OTubm5tjY2PT09Dg4ONzc3PLy8ra2tqCgoMrKyu7u7gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA';
var WarBBLogo = "data:image/png;base64,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";

//initiate notification box
$("body").append("<b class='WarBBInfoBox' style='position: fixed; top: 2px; padding-left:30px; padding-right: 5px; display:none; background: white url(" + WarBBLogo + ") no-repeat 0% 50%; background-size:28px; font-size: 20px; border:1px solid #4DD9FF; z-index:3;'></b>");

//global settings end

function linkify(filterId) { //code from http://userscripts.org/scripts/review/2254 Linkify ting	
	if (!filterId) {
		var regexy = "", ikkeTilladteTags = [];

		if (Allow_spaces_in_DL_links) {
			regexy = "(?:http:\/\/.+?\\?)?(?:https?:\/\/)?(?:[\\w\\.\\-]*[\\w\\-]+\\.(?:com?\\.\\w{2}|in\\.ua|uk\\.com|\\w{2,4})(?::\\d{2,5})?\/|(?:www\\.)?\\w{6,}\\.1fichier\\.com)[\\w\\–\\-\\.+$!*\\/\\(\\)\\[\\]\',~%?:@#&=\\\\\\—;\\u0020…×Ã\\_\\u0080-\\u03FF’‘\\|]*";
		} else {
			regexy = "(?:http:\/\/.+?\\?)?(?:https?:\/\/)?(?:[\\w\\.\\-]*[\\w\\-]+\\.(?:com?\\.\\w{2}|in\\.ua|uk\\.com|\\w{2,4})(?::\\d{2,5})?\/|(?:www\\.)?\\w{6,}\\.1fichier\\.com)[\\w\\–\\-\\.+$!*\\/()\\[\\]\',~%?:@#&=\\\\\\—;…×Ã\\_\\u0080-\\u03FF’‘\\|]*";
		}

		if (Do_not_linkify_DL_links) {
			ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea', 'span']; //tags, hvor det der stAÎžâ€™Î’ÂĄr inden i ikke skal vAÎžâ€™Î’Â¦re links
		} else {
			ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea']; //tags, hvor det der stAÎžâ€™Î’ÂĄr inden i ikke skal vAÎžâ€™Î’Â¦re links
		}

		var regex = new RegExp(regexy, "g");
		var censors = [	"Multi hosts disallowed\\. Please post direct links only",
						"(?:Dis|Not\\s)Allowed",
						"Forbidden",
						"Spam Site",
						"~ Censored links, Post Direct Links! ~",
						"Folders are not allowed, please post direct links",
						"Folder links are not allowed",
						"Due To The Increase In Phishing,? We Now Disallow Protected URL'?s",
						"Not allowed Direct links only",
						"I Am A Porn Site Please Report Me To A Moderator",
						"Report Me- Direct Links Only",
						"Banned File Host!",
						"Folders are banned, report me",
						"Direct links only",
						"CENSORED SITE",
						"not allowed, please post direct links",
						"Link folders \\(directories\\) not allowed\\. Direct links only",
						"Spam",
						"If you are reading this report this SPAMMER to a moderator",
						"The shorten url or custom links are not allowed for this site",
						"3rd Party links are not allowed. Direct Links Only",
						"Direct links only - please report me",
						"Spyware",
						"\\s*Ad\\-fly\\s*links\\s*are\\s*fobidden\\.\\s*Direct\\s*links only\\s*",
						"Disallowed - Direct links only",
						"File Host Folders Are Not Allowed",
						"Multi hosts disallowed - Please post direct links only",
						"Survey Site - Report me!",
						"Custom domains are not allowed for this service",
						"Dead Site",
						"Protected links not allowed"];

		var censorRegex = new RegExp("(?:http:\/\/.+?\\?)?(?:https?:\/\/)?[\\w\\.\\-]*~\\s?(?:" + censors.join("|") +  ")\\.*\\s?~[\\w\\–\\-\\.+$!*\\/()\\[\\]\',~%?:@#&=\\\\\\—;…×Ã\\_\\u0080-\\u03FF’‘]*", "i");
		var ignoreImage = /(?:\.png|\.jpg|\.gif|\.jpeg|\.bmp)$/i, textNode, muligtLink;

		var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") + ") and contains(.,'/')]";
		var textNodes = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		var i = textNodes.snapshotLength;
	
		while (i--) {
			textNode = textNodes.snapshotItem(i);
			muligtLink = textNode.nodeValue; //all links on page

			var myArray = null;
			if (regex.test(muligtLink)) {
				var span = document.createElement('span'), lastLastIndex = 0, myArray = null;
				regex.lastIndex = 0;

				while (myArray = regex.exec(muligtLink)) {
					var link = $.trim(myArray[0]); //removes whitespace from beginning and end of link (can sometimes cause issues when spaces are still picked up by the regex even when Allow_spaces_in_DL_links is false)
				
					var hostName = gimmeHostName2(link);
					var hostNameSafe = hostName.replace(/\./g, "_dot_").replace(/\-/g, "_dash_").toLowerCase();
					if (hostName == gimmeHostName(window.location.hostname) || !hostsIDs[hostNameSafe] || ignoreImage.test(link.replace(/\[\/img\]$/, ""))) {
						continue;
					}
				
					span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index)));

					var $a = $("<a>" + link + "</a>")
				
					if (!link.match(/https?:\/\//)) {
						link = 'http://' + link;
					}

					$a.attr("href", link.replace(/\[\/hide:\w+\]/,"")).appendTo(span);
				
					lastLastIndex = regex.lastIndex;
				}

				span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex)));
				textNode.parentNode.replaceChild(span, textNode);
			} else if (censorRegex.test(muligtLink)) {
				if (textNode.parentNode.className == "obsolete_link") continue;
				var censoredLink = muligtLink.match(censorRegex)[0];
				if (ignoreImage.test(censoredLink)) continue;
				var span = document.createElement('span');
					span.innerHTML = censoredLink;
					span.className = "obsolete_link";
					span.warlc_error = "Cause of error: <b>Censored link.</b>";
					span.addEventListener("mouseover", displayTooltipError, false);
				if (filehostsDead.search("censored links") == -1) filehostsDead += "censored links,";	
				cLinksTotal++; cLinksProcessed++; cLinksDead++;
				textNode.parentNode.replaceChild(span, textNode);
			}
		}
	}
	
	var jQ;
	filterId ? jQ = "a." + filterId : jQ = "a";
	var as = $(jQ);
	var i = as.length;
	var currA, hostNameSafe, hostID;
	while(i--) {
		currA = as[i];
		if (currA.href && /^https?:\/\//.test(currA.href) && gimmeHostName2(currA.href) != -1 && gimmeHostName2(currA.href) != gimmeHostName(window.location.host) && (!currA.className || currA.className == "processing_link" || currA.className == filterId)) {
			hostNameSafe = gimmeHostName2(currA.href).replace(/\./g, "_dot_").replace(/\-/g, "_dash_").toLowerCase();
			if (!hostsIDs[hostNameSafe]) {
				if (filterId) cLinksTotal--; currA.className = '';
				continue;
			} else {
				var ix = hostsIDs[hostNameSafe].length;
				while(ix--) {
					if (new RegExp(hostsIDs[hostNameSafe][ix].linkRegex).test(currA.href)) {
						currA.className = "processing_link";
						hostID = hostsIDs[hostNameSafe][ix].hostID;
						hostsCheck[hostID].links.push(currA);
						foundMirrors[hostID.substr(0,2)].push(hostID);
					}
				}
			}
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

		GM_addStyle(
			".alive_link {background:transparent url(" + alive_link_png + ") no-repeat scroll 100% 50%;background-size:13px;padding-right:13px;color:green !important;}\
			.adead_link {background:transparent url(" + adead_link_png + ") no-repeat scroll 100% 50%;background-size:13px;padding-right:13px;color:red !important;}\
			.obsolete_link {background:transparent url(" + adead_link_png + ") no-repeat scroll 100% 50%;background-size:13px;padding-right:13px;color:red !important;}\
			.unava_link {background:transparent url(" + unava_link_png + ") no-repeat scroll 100% 50%;background-size:14px;padding-right:13px;color:#FF9900 !important;}\
			.unknown_link {background:transparent url(" + unknown_link_png + ") no-repeat scroll 100% 50%;padding-right:13px;background-size:13px;color:rgb(0, 150, 255) !important}\
			.processing_link {background:transparent url(" + processing_link_gif + ") no-repeat scroll 100% 50%;background-size:13px;padding-right:16px;color:grey !important;}\
			.container_link {background:transparent url(" + processing_link_gif + ") no-repeat scroll 100% 50%;background-size:13px;padding-right:16px;color:grey !important;}"
		);
	}
}

var warlcTooltip = null, mouseoverLink = null; //link href with mouse cursor over it

var lastX = 0, lastY = 0;

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
		if (link.href.contains('anysend.com') && link.name) href = link.name;
		href = href.replace(/quickshare\.cz\/.+/, "quickshare.cz/chyba");
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: href.replace(ANONYMIZE_SERVICE, ""),
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'text/xml,application/x-httpd-php',
				'Referer': ""
			},
			onload: function(result) {
				var res = result.responseText;
				//console.log(res);
				//TODO: errorRegexs - 
				var errorRegexs = 	[	//generic error messages follow
										/(empty directory)/i,
										/(soubor nebyl nalezen)/i,
										/((?:file|page|link|folder)(?:is|not|does|has been|was|has| ){1,}(?:found|available|blocked|exists?|deleted|removed|expired))/i,
																				
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
										/<span style="color:red;" class="result-form">(.+?)<\/span>/, //safelinking
										/(The file link that you requested is not valid.)/, //2shared
										/#FF0000"><big>(.+?\s+.+?)<\/big>/, //jumbofiles
										/error_msg_title">(.+?)<\/h3>/, //mediafire
										/<span class="bold">(?:<br \/>)+(.+?)<\/span>/, //filebox
										/err">(.+?)</, //speedy-share, will work for others
										/message warning" style=".+?">\s+((?:.+?\s+)+?)<\/div>/, //cloudzer	
										/<h2 class="error">(.+?)<\/h2>/, //gigasize.com	
										/<h1 class="filename" id="status">(.+?)<\/h1>/, //anysend.com
										/<title>(Removed download) \| AnySend<\/title>/, //anysend.com
										/<div class='message t_0'>(.+?)<\/div>/, //sockshare.com						
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
	if (this.href.contains(/(?:uloziste\.com|filemonster\.net|uploadbin\.net|adrive\.com|dropbox(?:usercontent)?\.com|karelia\.pro|archive\.org|demo\.ovh\.eu)/))
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
		if (link.href.contains('anysend.com')) href = link.name;
		href = href.replace(/.*rapidshare\.com\/files\/(\d+)\/(.+)/, 'http://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=checkfiles&cbf=rapidshare_com&cbid=1&files=$1&filenames=$2');
		href = href.replace(/.*rapidshare\.com\/#!download\|\w+\|(\d+)\|([^|]+).*/, 'http://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=checkfiles&cbf=rapidshare_com&cbid=1&files=$1&filenames=$2');
		href = href.replace(/.*(?:share-online\.biz|egoshare\.com)\/(?:dl\/|download\.php\?id=|\?d=)(\w+)/, 'http://api.share-online.biz/linkcheck.php?links=$1');
		href = href.replace(/.*(?:uploaded|ul)\.(?:to|net)\/(?:files?\/|\?(?:lang=\w{2}&)?id=|f(?:older)?\/)?(?!img|coupon)(\w+)/, 'http://uploaded.net/api/filemultiple?apikey=lhF2IeeprweDfu9ccWlxXVVypA5nA3EL&id_0=$1');
		href = href.replace(/.*(?:depositfiles\.(?:com|lt|org)|dfiles\.(?:eu|ru))\/(?:en\/|ru\/|de\/|es\/|pt\/|)files\/(\w+)/, 'http://depositfiles.com/api/get_download_info.php?id=$1&format=json')
		//href = href.replace(/.*(?:cloudzer\.net|clz\.to)\/(?:file\/)?(\w+)/, 'http://cloudzer.net/api/filemultiple?apikey=mai1EN4Zieghey1QueGie7fei4eeh5ne&id_0=$1');
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: href.replace(ANONYMIZE_SERVICE, ""),
			headers: {
				'Accept': 'text/xml,application/x-httpd-php',
				'Referer': ""
			},
			onload: function(result) {
					
				var res = result.responseText;
				//console.log(res);
				var nameRegexs = 	[	/File Name: (.+?)<\/p>/, //filesmall
										/(?:finfo|(?:file[-_]?)?name)(?:"|')?>\s*?(.+?)<\/?(?:h1|a|b|div|span style|td)/, //hellshare, uploaded.to, netload, badongo, 4fastfile, luckyshare
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
										/'file\-icon\d+ \w+'>(?:<\/span><span>)?(.+?)<\/span>/, //hitfile, turbobit
										/d0FileName =  "(.+?)";/, //letitbit
										/file(?:_name|-info)" title="">\w+: <span>(.+?)<\/span>/, //vip-file, shareflare
										/download_file_title" title="(.+?)">/, //mediafire
										/dl\-btn\-label"> (.+?) <\/div>/, //mediafire
										/rapidshare_com\(1,"\d+,([^,]+)/, //rapidshare
										/id="file_title">(.+?)<\/h1>/, //uploading.com
										/recent-comments"><h2>(.+) &nbsp;/, //xdisk
										/fname" value="(.+?)">/, //sharerun, syfiles, grupload, 
										/download\-header">\s*<h2>File:<\/h2>\s*<p title="(.+?)">/, //bayfiles
										/description">\s*<p><b>Soubor: (.+?)<\/b>/, //bezvadata
										/Complete name                            : (.+?)<br \/>/, //bezvadata
										/itemprop="name">(.+?)<\/span>/, //bezvadata
										/Downloading:\s*<\/strong>\s*<a href="">\s*(.+?)\s*<\/a>/, //rapidgator
										/(?:Downloading |Lade herunter |<h1>)(.+?) \- \d+/, //bitshare, nitrobits
										/Downloading:<\/strong> (.+?) <span>/, //hotfile
										/<h1 class="black xxl" style="letter-spacing: -1px" title="(.+?)">/, //megashares
										/(?:Filename|Dateiname):<\/b>(?:<\/td><td nowrap>)?(.+?)(?:<br>|<\/td>)/, //billionuploads
										/<span > (.+?) \(\d+.?\d+? \w+\)<\/span>/, //clipshouse
										/File Download Area<\/center><\/h1><center><h3>(.+?)<\/h3>/, //filebeam
										/<h2 class="float\-left">(.+?)<\/h2>/, //easyfilesharing
										/<h1 id="file_name" class=".+?" title="(.+?)">/, //box.com
										/file_info">\s+<h2><strong>(.+?)<\/strong>/, //fliiby
										/dateiname'>(.+?)<\/h1>/, //file-upload.net
										/Filename:<\/p>\s+<\/div>\s+<div class=".+?">\s+<p>\s+(.+?)\s+<\/p>/, //sharesix
										/File Name:<\/dt>\s+<dd>(.+?)<\/dd>/, //gamefront
										/<h2>Download File (.+?) <span id="span1">/, //jumbofiles.org
										/dir="ltr">(.+?) <\/td>/, //unlimitshare.com
										/nom_de_fichier">(.+?)<\/div>/, //uploadhero
										/OK;(.+?);\d+/, //share-online
										/File:\s*<span>(.+?)<\/span>/, //keep2share
										/Name:<\/font>\s*<font style=".+?">(.+?)<\/font>/, //zippyshare
										/online,\w+,\d+,\w+,(.+)/, //uploaded.net, cloudzer.net
										/\{"file_info":\{"size":"\d+","name":"(.+?)"\},"/, //depositfiles.com
										/File:<\/div>\s*\n*<div class="name">(.+?)<\/div>/, //dizzcloud.com
										/site-content">\s*\n*<h1>(.+?)<strong>/, //putlocker.com
										/<div class="external_title_left">(.+)<\/div>/, //putlocker.com
										/(?:File name|Nom du fichier) :<\/th><td>(.+?)<\/td>/, //1fichier.com
										/<div id="file_name" class="span8">\n\s+<h2>(.+?)<\/h2>/, //filefactory.com
										/<span class="bgbtn sprite fileIcon ext\w+"><\/span>\s+<strong title="(.+?)">/, //gigasize.com
										/<span class="label label-important">Downloading<\/span>\s<br>\s(.+?)\s[\d\.]+\s\w+\s<\/h4>/, //nowdownload.eu
										/<!-- File header informations  -->\n\s*<br\/>\n\s*<h1>(.+?)<\/h1>/, //mixturecloud.com
										/<span class="file-name">(.+?)<\/span>/, //anysend.com
										/<td class="dofir" title="(.+?)">/, //billionuploads.com
										/<title>ULTRAMEGABIT\.COM - (.+?)<\/title>/, //ultramegabit.com
										/<title>Download (.+?) \| myUpload\.dk<\/title>/, //myupload.dk
										/<td width="300px" align="left" valign="top">Downloaded \d{1,} times<br>\nFile: (.+?)<br>/, //datafilehost.com
										/<div id="download\-title">\n\s*<h2>(.+?)<\/h2>/, //solidfiles.com
										/<div class="content_m"><div class="download"><h1>(.+?)<\/h1>/, //mystore.to
										/<h4 class="dl_name w420" >\s*(.+?) <span/, //myvdrive.com
										/<div class='badge pull-right'>.+?<\/div>\s*<h1>Download (.+?)<\/h1>/, //filemonkey.in
										/<strong>File name:<\/strong> (.+?)<br \/>/, //netkups.com
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
				
				var preSizeRegex = '(?::|\\(|>|>, | - |\\[)';
				var postSizeRegex = '(?:\\))?';
				
				var sizeRegexs = 	[	 preSizeRegex + "\\s*(" + uniSizeRegex + ")\\s*" + postSizeRegex,
										'rapidshare_com\\(1,"\\d+,[^,]+,(\\d+)', //rapidshare
										'FileSize_master">(.+?)<\/strong>', //hellshare
										'Velikost: <strong>(.+?)<\/strong>', //warserver
										'File Size:(?:<\/b>) (.+?)<\/(?:p|td)>', //filesmall, unlimitzone
										'online,\\w+,(\\d+),', //uploaded.net
										'"file_info":{"size":"(\\d+)","name":', //depositfiles.com
										'(?:File size|Taille) :<\/th><td>(.+?)<\/td>', //1fichier.com
										';(\\d+)\n$', //share-online.biz
										'label-important">Downloading<\/span>.+?(' + uniSizeRegex + ') <\/h4>', //nowdownload.eu
										'<h5>Size : (' + uniSizeRegex + ')<\/h5>', //mixturecloud.com,
										'<td>\\n\\s*Total size:\\n\\s*</td>\\n\\s*<td>\\n\\s*(.+?)\\s*</td>', //anysend.com
										'<span class="size">(' + uniSizeRegex + ')</span>', //easybytez.com
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
						fileName = nameCandidate[1].replace(/&nbsp;/g," ").replace("<br>", "");
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
				
				// Safelinking package info
				if (href.contains('safelinking.net/p/'))
				{
					var linkStatus = res.match(/<span style="color:green;" class="result-form">(.+?)<\/span>/);
					var linkTitle = res.match(/link\-title">(.+?)<\/span>/);
					var linkDesc = res.match(/description" class="result-form">(.+?)<\/span>/);
					if (linkStatus) { tooltip = "<b>Link status:</b> " + linkStatus[1].replace(/<\/?strong>/,"").replace(/<br\/>/, " "); }
					if (linkTitle) { tooltip += "<br><b>Title:</b> " + linkTitle[1]; }
					if (linkDesc) { tooltip += "<br><b>Description:</b> " + linkDesc[1]; }
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

//function to return hostname + tld
function gimmeHostName(link) {
    if (link.contains(/([\w-]+\.(?:com?\.\w{2}|in\.ua|uk\.com|\w{2,4}))(?::\d+)?$/)) return link.match(/([\w-]+\.(?:com?\.\w{2}|in\.ua|uk\.com|\w{2,4}))(?::\d+)?$/)[1];
    else {
        console.warn("gimmeHostName error.", link);
        return -1;
    }
}
//Second gimmehostname function to match whole hostname
function gimmeHostName2(link) {
	link = link.replace(/http:\/\/.*?\?http:\/\//, 'http://'); //anonymizers
    if (link.contains(/(?:https?:\/\/)?(?:www\.|[\w\.])*?[\w-]+\.(?:com?\.\w{2}|in\.ua|uk\.com|\w{2,4})(?::\d+)?\//)) return link.match(/(?:https?:\/\/)?(?:www\.|[\w\.])*?([\w-]+\.(?:com?\.\w{2}|in\.ua|uk\.com|\w{2,4}))(?::\d+)?\//)[1];
    else if (link.contains(".1fichier.com")) {
		return "1fichier.com";
	} else {
        console.warn("gimmeHostName error.", link);
        return -1;
    }
}

function uniqArray(array) {
	var uniqueArray = [];
	$.each(array, function(i, el){
	    if($.inArray(el, uniqueArray) === -1) uniqueArray.push(el);
	});
	return uniqueArray;
}

function sendMessage(text)
{
	var msgDiv = "<div class='WarBBInfoMsg'>" + text + "</div>";
	$(".WarBBInfoBox").append(msgDiv).show();
	setTimeout(function(){$(".WarBBInfoBox").hide()}, 5000);
}

function genset(pref, def) {
	var val = preferences.general[pref];
	if (val == undefined) val = def;
	return val;
}

function lsSave() {
	localStorage.setItem("WarBB_Preferences", JSON.stringify(preferences));
}

function setVariables()
{	
	if (firstRun)
	{
		console.warn('First run, compiling preferences object...');
		preferences = {
			hosts: {},
			general: {}
		}
			
		lsSetVal("general", "Display_tooltip_info", true);
		lsSetVal("general", "Display_full_links_in_link_containers", true);
		lsSetVal("general", "Allow_spaces_in_DL_links", false);
		lsSetVal("general", "Do_not_linkify_DL_links", false);
		lsSetVal("general", "Extabit_API_Check", false);
		lsSetVal("general", "Filefactory_API_Check", false);
		lsSetVal("general", "Processbox_Pos_Y", 0);
		lsSetVal("general", "Processbox_Pos_X", 90);
		lsSetVal("general", "Progressbox_Scaling", 100);
		lsSetVal("general", "Last_Update_Check", new Date().valueOf());
		lsSetVal("general", "Ref_anonymize_service", ANONYMIZERS[0]);
		lsSetVal("general", "Show_Update_Notification", true);
			
		localStorage.setItem("WarBB_First_Run", false);	
		lsSave();
	}

	Display_tooltip_info = genset("Display_tooltip_info", true);
	Display_full_links_in_link_containers = genset("Display_full_links_in_link_containers", true);
	Allow_spaces_in_DL_links = genset("Allow_spaces_in_DL_links", false);
	Do_not_linkify_DL_links = genset("Do_not_linkify_DL_links", false);
	Processbox_Pos_Y = genset("Processbox_Pos_Y", 0);
	Processbox_Pos_X = genset("Processbox_Pos_X", 90);
	Progressbox_Scaling = genset("Progressbox_Scaling", 100);
	Last_Update_Check = genset("Last_Update_Check", 0);
	Show_Update_Notification = genset("Show_Update_Notification", true);
	ANONYMIZE_SERVICE = genset("Ref_anonymize_service", ANONYMIZERS[0]);
	ANONYMIZE_SERVICE = (ANONYMIZE_SERVICE != 'NoRed' ? ANONYMIZE_SERVICE : '');
}

function hostSet(key, def) { //will get the value of the key in pref object, if key is undefined -> opposite value of default returned (to keep the compatibility with old GM_getValue and the inversed default values in WarBB 2.0)
	var val = preferences.hosts[key];
	if (val == undefined) val = !def;
	return val;
}

function lsSetVal(section, key, value) { //replacement of GM_setValue, valid for both sections of preferences object
	preferences[section][key] = value;
	lsSave();
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
			case "obsolete_link": spanElm.addEventListener("mouseover", displayTooltipError, false); break;
			case "unava_link": //reserved
			default: 
			}
		}
			
		thisLink.parentNode.replaceChild(spanElm, thisLink);
	}
}
	
	
	function checkLinks(filterId)
	{
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
		var progressboxCss = "#warlc-progressbox  {position:fixed; background:white; bottom:" + Processbox_Pos_Y + "%; left:" + Processbox_Pos_X + "%; padding:5px; font-size:10px; font-weight:bold; font-family:Helvetica; width:130px; cursor:default; border:1px solid #4DD9FF; z-index:200;}\
					\
					#warlc-hostdetails  {position:fixed; background:white; bottom:" + (parseInt(Processbox_Pos_Y) + 9) + "%; left:" + Processbox_Pos_X + "%; padding:5px; font-size:10px; font-weight:bold; cursor:default; border:1px solid #4DD9FF; display:none; z-index:201;}\
					\
					.warlc-progressbox-contents {right: 5px;}\
					\
					.warlc-progressbar {text-align:left; background: lightGrey; height:3px; margin-bottom:5px; width:0px; border-radius:1.5px; }\
					\
					.warlc-progressitem { display: block; padding:2.5px 0px 2.5px 20px }\
					\
					.alive {color: rgb(133, 195, 49); background:transparent url(" + alive_link_png + ") no-repeat scroll 0% 50%;background-size:15px;}\
					\
					.adead {color: red; background:transparent url(" + adead_link_png + ") no-repeat scroll 0% 50%;background-size:15px;}\
					\
					.unava {color: #FF9900; background:transparent url(ToBeAddedLater) no-repeat scroll 0% 50%;background-size:15px;}\
					\
					.unknown {color: rgb(0, 150, 255); background:transparent url(" + unknown_link_png + ") no-repeat scroll 0% 50%;background-size:15px;}\
					\
					.processing {color: grey; background:transparent url(" + processing_link_gif + ") no-repeat scroll 0% 50%;}"
		
		if (Progressbox_Scaling != 100) {
			$.each(progressboxCss.match(/[\d\.]+px/g), function(i, el) { //dynamic rescaling of the progressbox according to user settings
				progressboxCss = progressboxCss.replace(new RegExp(el + "(?!" + RAND_STRING + ")"), parseFloat(el) * Progressbox_Scaling/100 + "px" + RAND_STRING); //RAND_STRING to prevent the same value replaced twice
			});
		}
		
		progressboxCss = progressboxCss.replace(new RegExp(RAND_STRING, "g"), "").replace("ToBeAddedLater", unava_link_png); //inserting the unava_link_png at the end because the function messes up its base64 string
		
		GM_addStyle(progressboxCss);
				
		$('body').append('	<div id="warlc-progressbox">\
								<div class="warlc-progressbox-contents">\
									<div class="warlc-progressbar" aria-valuenow=0></div>\
									<div class="warlc-progressitems">\
										<span class="warlc-progressitem alive"></span>\
										<span class="warlc-progressitem adead"></span>\
										<span class="warlc-progressitem unava"></span>\
										<span class="warlc-progressitem unknown"></span>\
										<span class="warlc-progressitem processing"></span>\
									</div>\
								</div>\
							</div>\
							<div id="warlc-hostdetails"></div>');	
		
		$('#warlc-progressbox').hide().click(function(){
												clearInterval(intervalId); 
												$(this).hide(); 
												return false;
											});
											
		$(".warlc-progressitem").hover(function() {
			showHostDetails(this);
		}, function() {
			showHostDetails("none");
		});
		
	}
	
	function showHostDetails(item) {
		var $div = $("#warlc-hostdetails");
		if (item == "none") {
			$div.hide().removeClass();
			if ($("#warlc-progressbox").css("display") != "none") intervalId = setInterval(function() { updateProgress(); }, 1000);	
		}
		else {
			var statusArr; 
			var divTxt = "The following hosts ";
			switch(item.className) {
			case "warlc-progressitem alive": divTxt += "have been found alive: "; statusArr = filehostsAlive; break;
			case "warlc-progressitem adead": divTxt += "have been found dead: "; statusArr = filehostsDead; break;
			case "warlc-progressitem unava": divTxt += "have been found unavailable: "; statusArr = filehostsUnava; break;
			case "warlc-progressitem unknown": divTxt += "are unknown: "; statusArr = filehostsUnknown; break;
			case "warlc-progressitem processing": divTxt += "are still processing: "; statusArr = getProcHosts(); break;
			}
			$div.addClass(item.className);
			$("#warlc-progressbox").append($div);
			if (statusArr == "") divTxt = divTxt.replace("The following", "No").replace(":", ".");
			$div.text(divTxt + statusArr.slice(0,statusArr.length-1).replace(/,/g, ", "));
			clearInterval(intervalId);
			$div.show();
		}
		
	}
	
	function getProcHosts() {
		var filehostsProc = "";
		var $links = $(".processing_link");
		if ($links.length > 0) {
			var i = $links.length;
			var hostname;
			while (i--)
			{
				hostname = gimmeHostName2($links[i].href);
				if (!filehostsProc.contains(hostname)) {
					filehostsProc += hostname + ",";
				}
			}
		}
		return filehostsProc;
	}
	
	function dismissProgressbar() {
		$(".warlc-progressbar").fadeOut();
		$(".warlc-progressitem.processing").fadeOut();
		clearInterval(intervalId); //stops refreshing the stats
	}
	
	/**
	 * Updates progress data in progress box
	 */
	var percAlive, percDead, percUnava, percProc;
	function updateProgress()
	{
		if (cLinksTotal) // some links were detected on page
		{
			var percProgress = Math.round(((100 / cLinksTotal) * cLinksProcessed));
			var $progressItems = $('.warlc-progressitems > .warlc-progressitem');
			
			$(".warlc-progressbar").css("width", percProgress + "%");
			$(".warlc-progressbar").attr("aria-valuenow", percProgress);
			
			percAlive = Math.round((cLinksAlive / cLinksTotal) * 100);
			percDead = 	Math.round((cLinksDead / cLinksTotal) * 100);
			percUnava = Math.round((cLinksUnava / cLinksTotal) * 100);
			percUnknown = Math.round((cLinksUnknown / cLinksTotal) * 100);
			percProc = Math.round(((cLinksTotal - cLinksProcessed) / cLinksTotal) * 100);
			
			$progressItems.first().text(cLinksAlive + " - " + percAlive + "% Alive")
							.next().text(cLinksDead + " - " + percDead + "% Dead")
							.next().text(cLinksUnava + " - " + percUnava + "% Unavailable")
							.next().text(cLinksUnknown + " - " + percUnknown + "% Unknown")
							.next().text(cLinksTotal - cLinksProcessed + " - " + percProc + "% Processing");
			if (percProgress > 0) $("#warlc-progressbox").show();
			if (percProgress == 100) dismissProgressbar();
		}	
	}
	
	

	function check_all_links()
	{
		add_WARLC_style();

		initProgressBox();			
		intervalId = setInterval(function(){updateProgress();}, 1000);

		start(null);
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
			}
		}
	}

	//
	//
	//   SCRIPT EXECUTION START POINT
	//
	//
	
	//init the stuff
	setVariables();
	if (RAND_INT == RAND_INT2) sendMessage(Array(16).join("wat" - 1) + " Batman!");

	//register GM menu commands & keyboard shortcut event handler
	$(document).keydown(KeyDownHandler);
	GM_registerMenuCommand("[WarBB - TheWarez Links Checker] Configuration  (CTRL + ALT + C)", configuration);
	GM_registerMenuCommand("[WarBB - TheWarez Links Checker] Check All Links (CTRL + ALT + A)", check_all_links);

	//start linkchecking
	$(document).ready(check_all_links);
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
		
		var settingsIcon = "data:image/png;base64,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";
	
		var configcss = '\
		.popup_block .popup fieldset{\
		   padding: 1%;\
		   border-style: none;\
		   border-width: 0;\
		   border-color: white;\
		   margin-bottom: 1px;\
		}\
		.popup_block .popup hr {\
			height: 1px;\
			border-color:black;\
		}\
		#WarBBTitle{\
		 font-size: 2em;\
		 width:100%;\
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
		 border: 2px solid #4DD9FF;\
		 float: left;\
		 width: 700px;\
		 position: absolute;\
		 top: 7%;\
		 left: 50%;\
		 bottom: 7%;\
		 margin: 0 0 0 -350px;\
		 -moz-border-radius:10px;\
		 z-index: 100;\
		}\
		.popup_block .popup {\
		 display: block;\
		 float: left;\
		 width: 100%;\
		 height: 95%;\
		 background: #fff;\
		 margin: 10px 0px;\
		 border: 1px solid #4DD9FF;\
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
		#WarBBTabs > input[type="button"], .WarBBButtons > input[type="button"] {\
			display: inline-block;\
			font-size: 12px;\
			font-weight: normal;\
			background-color: rgb(238, 238, 238);\
			background-position: 0px -178px;\
			background-repeat: repeat-x;\
			text-shadow: 0px 1px rgb(255, 255, 255);\
			padding: 4px 8px;\
			position: relative;\
			overflow: hidden;\
			color: rgb(51, 51, 51);\
			margin: 0 0;\
			border: 1px solid rgb(170, 170, 170);\
			border-radius: 0 0 0 0;\
			box-shadow: 0px 12px rgb(255, 255, 255) inset;\
			float: left;\
		}\
		#WarBBTabs > input[type="button"] {\
			border-bottom: none;\
		}\
		#WarBBSeparator {\
			border-bottom: 1px solid rgb(170, 170, 170);\
			margin-top: 24px;\
		}\
		#selectAllButton {\
			border-radius: 3px 0 0 3px;\
			border-right: none;\
		}\
		#invertButton {\
			border-radius: 0 3px 3px 0;\
			border-left: none;\
		}\
		#WarBBTabs > input[name="WarBBHosts"] {\
			border-radius: 3px 0 0 0;\
			border-right:none;\
			margin-left:10px;\
		}\
		#WarBBTabs > input[name="WarBBAbout"] {\
			border-radius: 0 3px 0 0;\
			border-left:none;\
		}\
		.WarBBButtons > input[type="button"]:hover {\
			padding: 5px 8px 3px;\
			box-shadow: 0 0 white;\
			background: none;\
		}\
		#WarBBTabs > input.activeTab {\
			padding: 5px 8px 3px;\
			box-shadow: 0 0 white;\
			background: none;\
		}\
		.WarBBTab {\
			display: none;\
		}\
		.WarBBButtons, #WarBBTabs, #warlcsitelist1 {\
			margin-left: 5px;\
		}\
		#warlcsitelist1 {\
			border-top: 1px solid grey;\
			padding-top: 5px;\
			overflow:auto;\
			margin-top:2px;\
		}\
		.WarBBTabContainer {\
			overflow:auto;\
		}\
		input:hover+label {\
			background:#F1F77C;\
			font-size:110%;\
		}\
		.popup_block .popup legend {\
			display:block;\
			width:100%;\
			padding:0;\
			margin-bottom:2px;\
			font-size:15px;\
			line-height:inherit;\
			color:#333;\
			border:0;\
			border-bottom:1px solid #e5e5e5\
		}\
		';

		GM_addStyle(configcss);
		
		var configurationinnerHTML = 
		'<div id="fade"></div>\
		<div class="popup_block">\
			<div class="popup">\
				<div id="WarBBTitle" style="height: 1.2em"><img src=' + settingsIcon + ' style="height:35px;margin-left:2px;vertical-align:middle;"></img>WarBB - Configuration</div><br>\
				<div id="WarBBTabs">\
					<input type="button" name="WarBBHosts" class="activeTab" value="Filehostings">\
					<input type="button" name="WarBBSettings" value="Settings">\
					<input type="button" name="WarBBAbout" value="About">\
				</div>\
				<div id="WarBBSeparator"></div>\
				<div id="WarBBHosts" class="WarBBTab">\
					<br><div class="WarBBButtons">\
						<input type="button" id="selectAllButton" value="Select All">\
						<input type="button" id="selectNoneButton" value="Select None">\
						<input type="button" id="invertButton" value="Invert">\
					</div><br><br>\
					<input style="margin-left:5px;" type="textbox" placeholder="Search filehost" id="hostSearchBox" value="">\
					<div id="warlcsitelist1"><span>Empty</span></div>\
				</div>\
				<div id="WarBBSettings" class="WarBBTab">\
					<br>\
					<div id="WarBBPreferences" class="WarBBTabContainer">\
						<fieldset>\
							<legend>General settings</legend>\
							<p><input type="checkbox" id="Do_not_linkify_DL_links"> Do NOT linkify DL links</p>\
							<p><input type="checkbox" id="Allow_spaces_in_DL_links"> Allow spaces in DL links<br><div id="configinfo">Note: All links must end with a new line!</div></p>\
							<p><input type="checkbox" id="Display_full_links_in_link_containers"> Display full links in link containers</p>\
							<p><input type="checkbox" id="Display_tooltip_info"> Display tooltip info<br><div id="configinfo">Note: File name, file size, error messages etc.</div></p>\
							<p><input type="checkbox" id="Show_Update_Notification">Show notification when WarBB is up to date</p>\
						</fieldset>\
						<fieldset>\
							<legend>Progressbox settings</legend>\
							<p>Horizontal positioning of the progressbox: <input type="text" id="Processbox_Pos_X"><br><div id="configinfo">Note: Define this value in percentages starting from the left of the screen.</div></p>\
							<p>Vertical positioning of the progressbox: <input type="text" id="Processbox_Pos_Y"><br><div id="configinfo">Note: Define this value in percentages starting from the bottom of the screen.</div></p>\
							<p>Scaling of the progressbox: <input type="text" id="Progressbox_Scaling"><br><div id="configinfo">Note: Resizes the progressbox. Define this value in percentages. 100% = full size, 200% = double size, etc</div></p>\
						</fieldset>\
						<fieldset>\
							<legend>Host options</legend>\
							<p>Anonymizer:\
							<select style="margin-left:5px;" id="redirector">\
								<option>Lorem ipsum dolorem</option>\
							</select></p>\
							<p><input type="checkbox" id="Extabit_API_Check"> Check Extabit.com links through API</p>\
							<p><input type="checkbox" id="Filefactory_API_Check"> Check Filefactory.com links through API</p>\
							<div id="configinfo">Note: We cannot guarantee this will work. If disabled, WarBB will use a website check instead.</div>\
						</fieldset>\
					</div>\
				</div>\
				<div id="WarBBAbout" class="WarBBTab">\
					<br>\
					<div class="WarBBTabContainer">\
					<fieldset>\
					<legend>WarBB - TheWarez Link Checker v' + WarBB_version + '</legend>\
					<p>Authors: iKickback (<a href="http://www.thewarez.org/profile.php?mode=viewprofile&u=2348347">TheWarez</a> | <a href="http://userscripts.org/users/476129">Userscripts</a>) & thecodingdude (<a href="http://www.thewarez.org/profile.php?mode=viewprofile&u=2089048">TheWarez</a> | <a href="http://userscripts.org/users/437232">Userscripts</a>)</p>\
					<p>Based on <a href="http://userscripts.org/scripts/show/125631">W.A.R. Links Checker - Dev</a></p>\
					<p>Original by <a href="http://userscripts.org/users/302353">dkitty</a></p>\
					<p>Graphics by LiabilityZero (<a href="http://www.thewarez.org/profile.php?mode=viewprofile&u=3229521">TheWarez</a> | <a href="http://liabilityzero.deviantart.com/">deviantART</a> | <a href="mailto:liabilityjeeru@gmail.com">Contact</a>)</p>\
					</fieldset>\
					<br />\
					<fieldset>\
					<legend>Currently supported</legend>\
					<p>Filehostings: ' + allHostNames.length + '<br />\
					Containers: ' + allContainerNames.length + '<br />\
					Obsolete sites: ' + allObsoleteNames.length + '<br /></p>\
					</fieldset>\
					<br />\
					<fieldset>\
					<legend>Uses</legend>\
					<p>adam_3\'s <a href="http://userscripts.org/scripts/show/2254">Linkify ting</a> (modified)</p>\
					<p><a href="http://jquery.com/">jQuery</a> JavaScript Library</p>\
					</fieldset>\
					<br />\
					<fieldset>\
					<legend>License</legend>\
					<p>GPL version 3 or any later version (<a href="http://www.gnu.org/copyleft/gpl.html">http://www.gnu.org/copyleft/gpl.html</a>)</p>\
					</fieldset>\
					</div>\
				</div>\
			</div>\
		</div>';
		
		$('body').append('<div id="hideshow">' + configurationinnerHTML + '</div>');
		$("#WarBBHosts").show();
		
		//sets height of warlcsitelist1
		var totalHeight = $(".popup").height();
		$("#warlcsitelist1").height(totalHeight - 155); $(".WarBBTabContainer").height(totalHeight - 90);
		$("#WarBBSeparator").css("margin-top", 9 + $(".activeTab").height() + "px"); //because the buttons have a different height on the different themes
		
		$("#WarBBTabs > input[type='button']").click(function() {
			var $target = $(this);
			var current = "#" + $(".activeTab").removeClass().attr("name"); $(current).hide();
			var targetTab = "#" + $target.addClass("activeTab").attr("name"); $(targetTab).show();
		});
		
		$("#fade").click(function(event) {
			$("#hideshow").hide(); event.preventDefault();
		});
				
		var elmHostList = document.getElementById("warlcsitelist1");
		
		buildSettings();
		buildSitelist("", allHostNames, elmHostList);
		appendObsolete("", allObsoleteNames, elmHostList);
			
		//handler for checkbox state change
		function changeConfiguration(e)
		{
			var element = e.target;

			if (element.type == 'checkbox')
			{
				if (element.checked == 1)
				{
					lsSetVal("hosts", element.id, true);
				}
				else
				{
					lsSetVal("hosts", element.id, false);
				}

			}
		}

		//Selects all filehosting checkboxes
		function selectAll()
		{
			$(":checkbox:visible:not(:checked)").prop("checked",true)
						 .each(function(index, element){lsSetVal("hosts", this.id, true)});
		}

		//Deselects all filehosting checkboxes
		function selectNone()
		{
			$(":checkbox:visible:checked").prop("checked",false)
						 .each(function(index, element){lsSetVal("hosts", this.id, false)});
		}

		//Inverts filehosting checkboxes selection
		function selectInvert()
		{
			var $checked = $(":checkbox:visible:checked");
			var $unchecked = $(":checkbox:visible:not(:checked)");
			
			$unchecked.prop("checked",true)
						 .each(function(index, element){lsSetVal("hosts", this.id, true)});
			$checked.prop("checked",false)
						 .each(function(index, element){lsSetVal("hosts", this.id, false)});
		}
		
		//Sets anonymizer setting
		function changeAnonymizer()
		{
			var val = $("#redirector").val();
			lsSetVal("general", "Ref_anonymize_service", (val == ANONYMIZERS.length ? '' : ANONYMIZERS[val]));
			$('#redirector option[value=' + val + ']').prop('selected', true);
		}
		
		//Sets selected redirector option
		var anonlist = "";
		$(ANONYMIZERS).each(function(index, value) {
			anonlist += '<option value=' + index  + (value == ANONYMIZE_SERVICE ? ' selected' : '') + '>' + gimmeHostName2(value) + '</option>';
		});
		anonlist += '<option value="' + ANONYMIZERS.length + '">No referer</option>';
		$('#redirector').html(anonlist);
		
		//Sets Processbox position setting
		function changeProgBox(event) {
			var setting;
			switch(event.data.set) {
				case "X": setting = "Processbox_Pos_X"; break;
				case "Y": setting = "Processbox_Pos_Y"; break;
				case "Scale": setting = "Progressbox_Scaling"; break;
			}
			
			var $setting = $("#" + setting);
			var newSet = $setting.val().replace("%", "");
			lsSetVal("general", setting, newSet);
		}
		
		//Sets value of Processbox position
		$("#Processbox_Pos_X").val(Processbox_Pos_X + "%");
		$("#Processbox_Pos_Y").val(Processbox_Pos_Y + "%");
		$("#Progressbox_Scaling").val(Progressbox_Scaling + "%");

		function buildSettings()
		{
			$("#WarBBPreferences :checkbox").each(function(){
				$(this).prop("checked", genset($(this).attr("id")))
					.click(function(e){
						lsSetVal("general", $(this).attr("id"), $(this).prop("checked"));
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
			
			$(targetNode).empty().append("<fieldset id='WarBBHosts1'><legend>Filehosts</legend></fieldset>");
			var $targetNode = $("#WarBBHosts1");
			
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
					
					$("#" + oldRSLCvalue).prop("checked", hostSet(oldRSLCvalue, false))
										.change(changeConfiguration);
										
					$targetNode.append('<br />');
				}
			});
			
			$(targetNode).append("<fieldset id='WarBBHosts2'><legend>Containers</legend></fieldset>");
			$targetNode = $("#WarBBHosts2");
			
			searchedSite = "";
			$.each(allContainerNames, function(i, site) {
				if (searchedSite = site.match(searchRegex)) {
				var oldRSLCvalue = "Check_" + searchedSite[1].replace(/\|.+/, "").replace(/\./g,"_dot_").replace(/-/g, "_dash_") + "_links";
				$targetNode.append('<input type="checkbox" id="' + oldRSLCvalue +'" />\
					<label for="' + oldRSLCvalue + '">' + searchedSite[1] + '</label>');
				$("#" + oldRSLCvalue).prop("checked", hostSet(oldRSLCvalue, false))
									.change(changeConfiguration);
				$targetNode.append('<br />');	
				}
			});
		}
		
		//obsolete hosts checkbox
		function appendObsolete(search, siteNames, targetNode) {
			var searchRegex = new RegExp("\\|?([\\w\\.-]*" + search.replace(/\./g,"\\.").replace(/-/g, "\\-") + "[\\w\\.-]*)\\|?", "i");
			$(targetNode).append('<fieldset id="WarBBHosts3"><legend>Obsolete hosts</legend><input type="checkbox" id="Obsolete_file_hosts" /><label for="Obsolete_file_hosts">Check obsolete file hosts</label><br /></fieldset>');		
			$("#Obsolete_file_hosts").prop("checked", hostSet("Obsolete_file_hosts", false))
									.change(changeConfiguration);
			
			var $targetNode = $("#WarBBHosts3");
			
			var foundName = "";
			$.each(siteNames, function(i, site){
				if (foundName = siteNames[i].match(searchRegex))
				{
					$targetNode.append('<div id="note">' + foundName[1] + '</div>');
				}
			})
		}
		
		//event listener binding
		$("#hostSearchBox").keyup(function() {
			buildSitelist($("#hostSearchBox").val(), allHostNames, elmHostList);
			appendObsolete($("#hostSearchBox").val(), allObsoleteNames, elmHostList);
		});
		$("#selectAllButton").click(selectAll);
		$("#selectNoneButton").click(selectNone);
		$("#invertButton").click(selectInvert);
		$("#redirector").change(changeAnonymizer);
		$("#Processbox_Pos_X").change({ set: "X" }, changeProgBox);
		$("#Processbox_Pos_Y").change({ set: "Y" }, changeProgBox);
		$("#Progressbox_Scaling").change({ set: "Scale" }, changeProgBox);
		
		//buttons and edit boxes init end
	}

//Objects for linkchecking
var hostsIDs = {}; //hosts IDs and link regexes
var hostsCheck = {}; //host status IDs and links
var foundMirrors = { //mirrors found on the page, listed by type of check
	BC: [],
	HC: [],
	OH: [],
	RH: [],
	WC: []
}

//begin standard link checking algorithm
function start(filterId)
{
	var doNotLinkify = Do_not_linkify_DL_links;
	var redirectorTypes = {	"HTTP_302": 0, 
							"INNER_LINK": 1};

	// USER SELECTED FILE HOSTS INITIALIZATION START
	if (!filterId) {
		initFileHosts();
		initBulkHosts();
		initRedirectors();
		initFileHostsHeadersOnly();
	}
	// USER SELECTED FILE HOSTS INITIALIZATION END

	// LINKIFICATION START		
	linkify(filterId);
	//LINKIFICATION END

	//
	//HANDLING REDIRECTORS START
	//
	var redirFunctions = {
		//HTTP_302
		HTTP_302_TRIES: 0,
		processRedirectorLink: function(links, redirectorId) {
			$.each(links, function(key, value) {
				$('[href="' + value + '"]').removeClass().addClass('container_link');
			});

			GM_xmlhttpRequest({
				method: 'POST',
				url: 'http://warbb.pw/decrypt',
				data: 'links=' + links.join(RAND_STRING),
				headers: {
					'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
					'Content-type': 'application/x-www-form-urlencoded',
					'Referer': 'http://warbb.pw',
					'X-Requested-With': 'XMLHttpRequest'						
				},
				onload: function(result) {
					if (result.status != 200) return;

					var links = JSON.parse(result.responseText);
					var deadlinks = [], failedlinks = [];

					$.each(links, function(key, value) {
						if (value.success) {
							hostsCheck[redirectorId].cProcessed++;
							link = $('[href="' + key + '"]').first();
							link.attr('href', value.link);
							if (Display_full_links_in_link_containers) link.html(value.link);

						} else if (value.error == 'ERROR: Not Found (HTTP_STATUS: 404)') {
							hostsCheck[redirectorId].cProcessed++;
							deadlinks.push(key);

						} else if (value.error.contains('ERROR: ')) {
							hostsCheck[redirectorId].cProcessed++;
							failedlinks.push(key);
							console.warn('Error in decrypting link.\r\nLink: ' + key + '\r\nError thrown: ' + value.error + '\r\nAdditional information:', value);
						}
					});
					
					if (failedlinks.length > 0) DisplayTheCheckedLinks(failedlinks, 'unknown_link');
					if (deadlinks.length > 0) DisplayTheCheckedLinks(deadlinks, 'adead_link');
					
					checkLinks('container_link');
				},
				onerror: function(result) {
					if (redirFunctions.HTTP_302_TRIES < 5) { //retry for max 10 times
						redirFunctions.HTTP_302_TRIES++;
						redirFunctions.processRedirectorLink(links, redirectorId);
					} else {
						DisplayTheCheckedLinks(links, 'unknown_link');
					}
				}
			});
		},
		
		//INNER_LINK (Hotfile.com/links/)
		processRedirectorLinkEx: function(link, redirectorId) {
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
					link.href = result.responseText.match(hostsCheck[redirectorId].innerLinkRegex)[1];
					
					hostsCheck[redirectorId].cProcessed++;
					
					if (hostsCheck[redirectorId].cProcessed >= hostsCheck[redirectorId].cTotal)
						checkLinks('container_link');
				}				
			});
		}
	}
	
	foundMirrors.RH = uniqArray(foundMirrors.RH);
	redirLength = foundMirrors.RH.length;
	if (redirLength > 0) {		
		//process redirector links
		var hostID, links, y;
		for(var redirIdx = 0; redirIdx < redirLength; redirIdx++)
		{
			hostID = foundMirrors.RH[redirIdx];
			links = uniqArray(hostsCheck[hostID].links)
			hostsCheck[hostID].cTotal = links.length;

			cLinksTotal += links.length;
			y = links.length;

			if (hostsCheck[hostID].type == redirectorTypes.HTTP_302) {
				var y = links.length;
				while(y--) {
					links[y] = links[y].href;
				}
				redirFunctions.processRedirectorLink(links, hostID);
			} else {
				while(y--) {
					switch(hostsCheck[hostID].type) {
						case redirectorTypes.INNER_LINK:		redirFunctions.processRedirectorLinkEx(links[y], hostID); break;
						default:
					}
				}	
			}
			
			hostsCheck[hostID].links = [];
		}
	}
	foundMirrors.RH = [];
	//
	//HANDLING REDIRECTORS END
	//

	//STANDARD LINKCHECKING START
	foundMirrors.WC = uniqArray(foundMirrors.WC);
	var WCLength = foundMirrors.WC.length;
	if (WCLength > 0) {
		var hostID, links, isAliveRegex, isDeadRegex, isUnavaRegex, tryLoop, y;
		while(WCLength--) {
			hostID = foundMirrors.WC[WCLength];
			links = uniqArray(hostsCheck[hostID].links);
		
			if (filterId == null)
			{
				cLinksTotal += links.length;
			}

			isAliveRegex = hostsCheck[hostID].liveRegex;
			isDeadRegex = hostsCheck[hostID].deadRegex;
			isUnavaRegex = hostsCheck[hostID].unavaRegex;
			tryLoop = hostsCheck[hostID].tryLoop;

			y = links.length;

			while (y--)
			{
				geturl(links[y], isAliveRegex, isDeadRegex, isUnavaRegex, tryLoop);
			}
			hostsCheck[hostID].links = [];
		}	
	}
	foundMirrors.WC = [];
	//STANDARD LINKCHECKING END
	
	//OBSOLETE FILE HOSTS PROCESSING START
	foundMirrors.OH = uniqArray(foundMirrors.OH);
	var OHLength = foundMirrors.OH.length;
	if (OHLength > 0) {
		var hostID, links, y;
		while(OHLength--) {
			hostID = foundMirrors.OH[OHLength];
			links = uniqArray(hostsCheck[hostID].links);
		
			if (filterId == null)
			{
				cLinksTotal += links.length;
			}

			y = links.length;

			while (y--)
			{
				links[y].warlc_error = 'Cause of error: <b>Obsolete filehosting.</b>';
				displayTheCheckedLink(links[y], "obsolete_link");
			}
			hostsCheck[hostID].links = [];
		}	
	}
	foundMirrors.OH = [];
	//OBSOLETE FILE HOSTS PROCESSING END

	//DIRECT LINKCHECKING START
	foundMirrors.HC = uniqArray(foundMirrors.HC);
	var HCLength = foundMirrors.HC.length;
	if (HCLength > 0) {
		var hostID, links, isAliveRegex, isDeadRegex, y;
		while(HCLength--) {
			hostID = foundMirrors.HC[HCLength];
			links = uniqArray(hostsCheck[hostID].links);
		
			if (filterId == null)
			{
				cLinksTotal += links.length;
			}

			isAliveRegex = hostsCheck[hostID].liveRegex;
			isDeadRegex = hostsCheck[hostID].deadRegex;

			y = links.length;

			while (y--)
			{
				geturlHeader(links[y], isAliveRegex, isDeadRegex);
			}
			hostsCheck[hostID].links = [];
		}	
	}
	foundMirrors.HC = [];
	//DIRECT LINKCHECKING END

	//Bulkcheck hosts controller
	foundMirrors.BC = uniqArray(foundMirrors.BC);
	var BCLength = foundMirrors.BC.length;
	if (BCLength > 0) {
		var hostID, links, y, corrLink, m, n;
		while(BCLength--) {
			hostID = foundMirrors.BC[BCLength];
			links = uniqArray(hostsCheck[hostID].links);
			if (filterId == null)
			{
				cLinksTotal += links.length;
			}
			
			//Replace anchors by href's, and processes link corrections
			y = links.length;
			while(y--) {
				corrLink = links[y].href;
				if (hostsCheck[hostID].corrMatch && hostsCheck[hostID].corrMatch.test(corrLink)) corrLink = corrLink.match(hostsCheck[hostID].corrMatch)[1]; //link match corrections
				if (hostsCheck[hostID].corrReplWhat && hostsCheck[hostID].corrReplWith) corrLink = corrLink.replace(hostsCheck[hostID].corrReplWhat, hostsCheck[hostID].corrReplWith); //link replace corrections
				links[y] = corrLink;
			}
			
			//Filter out dupe links
			links = uniqArray(links);
			
			m = links.length;
			n = hostsCheck[hostID].blockSize;
			if (m > n) {
				//insert block separators (RAND_STRING) into the array
				for(var i = n; i < (Math.floor(m/n)+1)*n; i += n + 1)
				{
					links.splice(i, 0, RAND_STRING);
				}
			}
			
			var sep = hostsCheck[hostID].splitSeparator; 
			
			hostsCheck[hostID].func.call({ 	links:			links.join(sep).replace(new RegExp(sep.replace(/\\/g, "\\") + RAND_STRING + sep.replace(/\\/g, "\\"), "g"), RAND_STRING).replace(new RegExp(RAND_STRING + "$"), "").split(RAND_STRING),
											apiUrl: 		hostsCheck[hostID].apiUrl, 
											postData: 		hostsCheck[hostID].postData, 
											resLinkRegex:	hostsCheck[hostID].resLinkRegex, 
											resLiveRegex:	hostsCheck[hostID].resLiveRegex, 
											resDeadRegex:	hostsCheck[hostID].resDeadRegex, 
											resUnavaRegex: 	hostsCheck[hostID].resUnavaRegex,
											separator: 		sep
										});
										
			hostsCheck[hostID].links.length = 0;
		}
	}
	foundMirrors.BC = [];
	
	//Processes link
	//
	// [string]		link			link URL
	// [string] 	isAliveRegex	alive link regex
	// [string] 	isDeadRegex		dead link regex
	// [string] 	isUnavaRegex	unavailable link regex
	// [boolean]	tryLoop			repeats request until succeeded	
	function geturl(link, isAliveRegex, isDeadRegex, isUnavaRegex, tryLoop)
	{
		if ((link.href.contains("yourfilelink.com/")) && (!link.href.contains("&dv=1"))) link.href += "&dv=1"; //to bypass yourfilelink wait times
		link.href = link.href.replace("shareplace.com/?", "shareplace.com/index1.php?a="); //to bypass shareplace iframe on shareplace.com/?{id} links
		
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

				//console.log(res);

				if (res.contains(isAliveRegex))
				{
					displayTheCheckedLink(link, 'alive_link');
					return;
				}

				if (res.contains(isDeadRegex))
				{
					displayTheCheckedLink(link, 'adead_link');
					return;
				}

				if (res.contains(isUnavaRegex))
				{
					displayTheCheckedLink(link, 'unava_link');
					return;
				}

				var resStatus = result.status;

				if (resStatus == 404)
				{
					displayTheCheckedLink(link, 'adead_link');
					return;
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
				
				displayTheCheckedLink(link, 'unknown_link');
				res = "";
			},
			onerror: function ()
			{
				displayTheCheckedLink(link, 'unknown_link');
			}
		});
	}

	function geturlHeader(link, isAliveRegex, isDeadRegex)
	{	
		if (link.href.contains("disk.karelia.pro/") && !link.href.contains(/karelia\.pro\/fast\/\w+\/.+?/)) {
			geturl(link, 'diskFile\"', '<div id="center">\n+<\/div>', 'optional--', false);
			return;
		}
		
		if (link.href.contains("demo.ovh.") && link.href.contains("/download/")) {
			specificOvhCheck(link);
			return;
		}
		
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
				
				if (resStatus == 509) //public traffic exhausted
				{
					displayTheCheckedLink(link, 'unava_link');
					return;
				}

				resHeaders = result.responseHeaders;
				//console.log(resHeaders);

				if (resHeaders.contains(isDeadRegex))
				{
					if (link.href.contains('archive.org/')) {
						specArchCheck(link);
						return;
					}
					displayTheCheckedLink(link, 'adead_link');
					return;
				}

				if (resHeaders.contains(isAliveRegex))
				{
					displayTheCheckedLink(link, 'alive_link');
					return;
				}
				
				displayTheCheckedLink(link, 'unknown_link');
			},
			onerror: function ()
			{
				displayTheCheckedLink(link, 'unknown_link');
			}
		});
	}
	
	function specArchCheck(link) {
		var alive = /<title>Index of/;
		var dead = /<h1>Item not available<\/h1>/;
		var unava = /optional--/;
		geturl(link, alive, dead, unava);
	}
	
	//Specific handler for demo.ovh.com/download/ direct link
	function specificOvhCheck(link) {
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
				var resHeaders = "";
				resHeaders = result.responseHeaders;
				if (resHeaders.contains('Content-Type: application/octet-stream'))
				{
					displayTheCheckedLink(link, 'alive_link');
					return;
				}
				
				if (resHeaders.contains('Content-Type: text/html'))
				{
					var liveRegex = 'download.gif"';
					var deadRegex = 'p_point">';
					var unavRegex = 'optional--';
					geturl(link, liveRegex, deadRegex, unavRegex);
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
		//console.log(link);
		link.className = resultStatus;
		var hostname = gimmeHostName2(link.href);
		link.href = ANONYMIZE_SERVICE + link.href;
		
		if (Display_tooltip_info)
		{
			switch (resultStatus){
			case "alive_link": link.addEventListener("mouseover", displayTooltipInfo, false); break; 
			case "adead_link": link.addEventListener("mouseover", displayTooltipError, false); break;
			case "obsolete_link": link.addEventListener("mouseover", displayTooltipError, false); break;
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
			if (!filehostsAlive.contains(hostname)) filehostsAlive += hostname + ",";
			return;
		}

		if (resultStatus == "adead_link")
		{
			cLinksDead++;
			if (!filehostsDead.contains(hostname)) filehostsDead += hostname + ",";
			return;
		}
		
		if (resultStatus == "obsolete_link")
		{
			cLinksDead++;
			if (!filehostsDead.contains(hostname)) filehostsDead += hostname + ",";
			return;
		}

		if (resultStatus == "unava_link")
		{
			if (!filehostsUnava.contains(hostname)) filehostsUnava += hostname + ",";
			cLinksUnava++;
		}
		
		if (resultStatus == "unknown_link")
		{
			if (!filehostsUnknown.contains(hostname)) filehostsUnknown += hostname + ",";
			cLinksUnknown++;
		}
	}
	
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
		var hostname = gimmeHostName2($links[0].href);
		$links.each(function() {
			if (!this.href.contains('mega.co.nz')) this.href = ANONYMIZE_SERVICE + $(this).attr("href");
		});
			
		switch(resultStatus)
		{
			case "alive_link":		cLinksAlive += $links.length; 
									if (Display_tooltip_info) $links.mouseover(displayTooltipInfo);
									if (!filehostsAlive.contains(hostname)) filehostsAlive += hostname + ",";
									break;
			case "adead_link": 		cLinksDead += $links.length; 
									if (Display_tooltip_info) $links.mouseover(displayTooltipError);
									if (!filehostsDead.contains(hostname)) filehostsDead += hostname + ",";
									break;
			case "obsolete_link":	cLinksDead += $links.length;
									if (Display_tooltip_info) $links.mouseover(displayTooltipError);
									if (!filehostsDead.contains(hostname)) filehostsDead += hostname + ",";
									break;
			case "unava_link": 		cLinksUnava += $links.length;
									if (!filehostsUnava.contains(hostname)) filehostsUnava += hostname + ",";
									break;
			case "unknown_link":	cLinksUnknown += $links.length;
									if (!filehostsUnknown.contains(hostname)) filehostsUnknown += hostname + ",";
									break;
			default: 
		}		
			
		cLinksProcessed += $links.length;
	}
	
	function initRedirectors()
	{
		var aRCount = 1;
		function addRedirector(hostName, linkRegex, redirType, innerLinkRegex)
		{
			hostName = hostName.split("|");
			var i = hostName.length;
			
			var hostID = "RH" + aRCount;
			
			while(i--) {
				var filehost = hostName[i].replace(/\./g, "_dot_").replace(/\-/g, "_dash_");
				if (!hostsIDs[filehost]) {
					hostsIDs[filehost] = [];
				}
				hostsIDs[filehost].push({
					hostID: hostID,
					linkRegex: linkRegex,
				});
			}
			var RHObj = {
				cProcessed: 0,
				cTotal: 0,
				type: redirType,
				innerLinkRegex: innerLinkRegex,
				links: []
			}
			
			hostsCheck[hostID] = RHObj;
			aRCount++;
		}

		if (hostSet("Check_safelinking_dot_net_links", false))
		{
			addRedirector(
			'safelinking.net',	
			'safelinking\\.net\/d\/\\w{10}',
			redirectorTypes.HTTP_302,
			null);
		}

	}
	
	function initBulkHosts()
	{
		var aHCount = 1;
		function addHost(hostName, linkRegex, blockSize, corrMatch, corrReplWhat, corrReplWith, splitSeparator, 
							apiUrl, postData, resLinkRegex, resLiveRegex, resDeadRegex, resUnavaRegex, func)
		{
			hostName = hostName.split("|");
			var i = hostName.length;
			
			var hostID = "BC" + aHCount;
			
			while(i--) {
				var filehost = hostName[i].replace(/\./g, "_dot_").replace(/\-/g, "_dash_");
				if (!hostsIDs[filehost]) {
					hostsIDs[filehost] = [];
				}
				hostsIDs[filehost].push({
					hostID: hostID,
					linkRegex: linkRegex,
				});
			}
			
			var BCObj = {
				blockSize: 50,
				corrMatch: corrMatch,
				corrReplWhat: corrReplWhat,
				corrReplWith: corrReplWith,
				splitSeparator: '\r\n',
				apiUrl: apiUrl,
				postData: postData,
				resLinkRegex: resLinkRegex,
				resLiveRegex: resLiveRegex,
				resDeadRegex: resDeadRegex,
				resUnavaRegex: resUnavaRegex,
				func: genBulkCheck,
				links: []
			}
			
			if (blockSize != null) { 
				BCObj.blockSize = blockSize;
			}
			if (splitSeparator != null) {
				BCObj.splitSeparator = splitSeparator;
			}
			if (func != null) {
				BCObj.func = func;
			}
			
			hostsCheck[hostID] = BCObj;
			aHCount++;
			
		}
		
		var genType1 = [	{	host: "rodfile.com",		apiurl: "default"									},
							{	host: "failai.lt",			apiurl: "default"									},
							{	host: "rarefile.net",		apiurl: "default"									},
							{	host: "goldfile.eu", 		apiurl: "http://goldfile.eu/checkfiles.html"		},
							{	host: "uploadic.com",		apiurl: "default"									},
							{	host: "ddlstorage.com",		apiurl: "default" 									},
							{	host: "filesabc.com",		apiurl: "http://filesabc.com/checkfiles.html"		},
							{	host: "sharebeast.com",		apiurl: "default" 									},
							{	host: "uploadbaz.com",		apiurl: "default"									},
							{	host: "180upload.com",		apiurl: "http://180upload.com/checkfiles.html"		},
							{	host: "180upload.nl",		apiurl: "http://180upload.com/checkfiles.html"		},
							{	host: "filesbb.com",		apiurl: "http://filesbb.com/checkfiles.html"		},
							{	host: "exfilehost.com",		apiurl: "http://exfilehost.com/checkfiles.html"		},
							{	host: "asixfiles.com",		apiurl: "default"									},
							{	host: "zomgupload.com",		apiurl: "default"									},
							{	host: "filemaze.ws",		apiurl: "default"									},
							{	host: "upafile.com",		apiurl: "http://upafile.com/checkfiles.html"		},
							{	host: "novafile.com",		apiurl: "http://novafile.com/checkfiles.html"		},
							{	host: "longfiles.com",		apiurl: "http://longfiles.com/checkfiles.html"		},
							{	host: "youwatch.org",		apiurl: "http://youwatch.org/checkfiles.html"		},
							{	host: "fileband.com",		apiurl: "http://fileband.com/checkfiles.html"		},
							{	host: "speedvid.tv",		apiurl: "http://speedvid.tv/checkfiles.html"		},
							{	host: "sharerepo.com",		apiurl: "http://sharerepo.com/checkfiles.html"		},
							{	host: "freestorage.ro",		apiurl: "http://freestorage.ro/checkfiles.html"		},
							{	host: "imzupload.com",		apiurl: "default"									},
							{	host: "allmyvideos.net",	apiurl: "http://allmyvideos.net/checkfiles.html"	},
							{	host: "movdivx.com",		apiurl: "default"									},
							{	host: "gorillavid.in",		apiurl: "http://gorillavid.in/checkfiles.html"		},
							{	host: "vidto.me",			apiurl: "http://vidto.me/checkfiles.html"			},
							{	host: "filesline.com",		apiurl: "default"									},
							{	host: "upitus.net",			apiurl: "default"									},
							{	host: "fastflv.com",		apiurl: "default"									},
							{	host: "swankshare.com",		apiurl: "default"									},
							{	host: "sharefiles.co",		apiurl: "http://sharefiles.co/?op=checkfiles"		},
							{	host: "ryushare.com",		apiurl: "http://ryushare.com/checkfiles.python"		},
							{	host: "vidhog.com",			apiurl: "http://www.vidhog.com/checkfiles.html"		},
							{	host: "file4safe.com",		apiurl: "http://www.file4safe.com/?op=checkfiles"	},
							{	host: "uplds.com",			apiurl: "http://uplds.com/checkfiles.html"			},
							{	host: "roshare.info",		apiurl: "http://roshare.info/?op=checkfiles"		},
							{	host: "netkozmos.com",		apiurl: "http://www.netkozmos.com/checkfiles.html"	},
							{	host: "loadpot.net",		apiurl: "http://www.loadpot.net/checkfiles.html"	},
							{	host: "vodlocker.com",		apiurl: "http://vodlocker.com/checkfiles.html"		},
							{	host: "vidx.to",			apiurl: "http://vidx.to/?op=checkfiles"				},
							{	host: "foxishare.com",		apiurl: "http://foxishare.com/checkfiles.html"		},
							{	host: "uploadzeal.com",		apiurl: "http://www.uploadzeal.com/checkfiles.html"	},
							{	host: "played.to",			apiurl: "http://played.to/?op=checkfiles"			},
							{	host: "streamin.to",		apiurl: "http://streamin.to/checkfiles.html"		},
							{	host: "vidspot.net",		apiurl: "http://vidspot.net/?op=checkfiles"			},
							{	host: "bestreams.net",		apiurl: "http://bestreams.net/?op=checkfiles"		},
							{	host: "treesfile.com",		apiurl: "http://treesfile.com/checkfiles.html"		},
							{	host: "treefiles.com",		apiurl: "http://treesfile.com/checkfiles.html"		}, //same host as treesfile.com
							{	host: "treefile.org",		apiurl: "http://treesfile.com/checkfiles.html"		}, //same host as treesfile.com
						];
		
						
		var genType2 = [	{	host: "donevideo.com",		apiurl: "http://www.donevideo.com/?op=checkfiles"	},
							{	host: "sanshare.com",		apiurl: "http://sanshare.com/?op=checkfiles"		},
							{	host: "mightyupload.com",	apiurl: "http://mightyupload.com/?op=checkfiles"	},
							{	host: "megafiles.se",		apiurl: "http://megafiles.se/?op=checkfiles"		},
							{	host: "rapidapk.com",		apiurl: "http://rapidapk.com/?op=checkfiles"		},
							{	host: "isavelink.com",		apiurl: "http://isavelink.com/?op=checkfiles"		},
							{	host: "fileom.com",			apiurl: "http://fileom.com/?op=checkfiles"			},
							{	host: "4savefile.com",		apiurl: "http://4savefile.com/?op=checkfiles"		},
							{	host: "daj.to",				apiurl: "http://daj.to/?op=checkfiles"				},
							{	host: "upfile.biz",			apiurl: "http://upfile.biz/?op=checkfiles"			},
							{	host: "cepzo.com",			apiurl: "http://cepzo.com/?op=checkfiles"			},
							{	host: "uploadjet.net",		apiurl: "http://uploadjet.net/?op=checkfiles"		},
							{	host: "vidup.me",			apiurl: "http://vidup.me/?op=checkfiles"			},
							{	host: "verzend.be",			apiurl: "http://verzend.be/?op=checkfiles"			},
							{	host: "arabloads.com",		apiurl: "http://www.arabloads.com/?op=checkfiles"	},
							{	host: "amonshare.com",		apiurl: "http://amonshare.com/?op=checkfiles"		},
							{	host: "filewe.com",			apiurl: "http://nornar.com/?op=checkfiles"			},
							{	host: "nornar.com",			apiurl: "http://nornar.com/?op=checkfiles"			}, //same host as filewe.com
							{	host: "medoupload.com",		apiurl: "http://medoupload.com/?op=checkfiles"		},
							{	host: "filefolks.com",		apiurl: "http://www.filefolks.com/?op=checkfiles"	},
							{	host: "file-speed.com",		apiurl: "http://file-speed.com/?op=checkfiles"		},
							{	host: "1st-files.com",		apiurl: "http://www.1st-files.com/?op=checkfiles"	},
							{	host: "katzfiles.com",		apiurl: "http://katzfiles.com/?op=checkfiles"		},
							{	host: "cyberlocker.ch",		apiurl: "http://cyberlocker.ch/?op=checkfiles"		},
							{	host: "secureupload.eu",	apiurl: "http://www.secureupload.eu/checklinks.html"},
							{	host: "cometfiles.com",		apiurl: "http://www.cometfiles.com/checkfiles.html"	},
							{	host: "rockdizfile.com",	apiurl: "http://rockdizfile.com/?op=checkfiles"		},
							{	host: "clicktoview.org",	apiurl: "http://clicktoview.org/?op=checkfiles"		},
							{	host: "sinhro.net",			apiurl: "http://sinhro.net/checkfiles.html"			},
							{	host: "ortofiles.com",		apiurl: "http://www.ortofiles.com/?op=checkfiles"	},
							{	host: "blitzfiles.com",		apiurl: "http://blitzfiles.com/?op=checkfiles"		},
							{	host: "hulkload.com",		apiurl: "http://www.hulkload.com/?op=checkfiles"	},
							{	host: "sharingmaster.com",	apiurl: "http://sharingmaster.com/?op=checkfiles"	},
							{	host: "albafile.com",		apiurl: "http://albafile.com/?op=checkfiles"		},
							{	host: "expressleech.com",	apiurl: "http://expressleech.com/?op=checkfiles"	},
							{	host: "upshared.com",		apiurl: "http://upshared.com/?op=checkfiles"		},
							{	host: "filetug.com",		apiurl: "http://www.filetug.com/checkfiles.html"	},
							{	host: "exclusivefaile.com",	apiurl: "http://exclusiveloader.com/?op=checkfiles"	},
							{	host: "exclusiveloader.com",apiurl: "http://exclusiveloader.com/?op=checkfiles"	}, //same host as exclusivefaile.com
							{	host: "videozed.net",		apiurl: "http://videozed.net/?op=checkfiles"		},
							{	host: "basicupload.com",	apiurl: "http://www.basicupload.com/?op=checkfiles"	},
							{	host: "sharesix.com",		apiurl: "http://sharesix.com/?op=checkfiles"		},
							{	host: "rapidfileshare.net",	apiurl: "http://www.rapidfileshare.net/?op=checkfiles"},
							{	host: "igetfile.com",		apiurl: "http://www.igetfile.com/?op=checkfiles"	},
							{	host: "project-free-upload.com", apiurl: "http://project-free-upload.com/?op=checkfiles"},
							{	host: "vidbull.com",		apiurl: "http://vidbull.com/checkfiles.html"		},
							{	host: "sendmyway.com",		apiurl: "http://www.sendmyway.com/?op=checkfiles"	},
							{	host: "creafile.net",		apiurl: "http://creafile.net/?op=checkfiles"		},
							{	host: "unlimitshare.com",	apiurl: "http://www.unlimitshare.com/?op=checkfiles"},
							{	host: "speedshare.eu",		apiurl: "http://speedshare.eu/?op=checkfiles"		},
							{	host: "uploadboy.com",		apiurl: "http://uploadboy.com/?op=checkfiles"		},
							{	host: "fiberstorage.net",	apiurl: "http://fiberstorage.net/?op=checkfiles"	},
							{	host: "uploadhunt.com",		apiurl: "http://www.uploadhunt.com/?op=checkfiles"	},
							{	host: "shareswift.com",		apiurl: "http://shareswift.com/?op=checkfiles"		},
							{	host: "epicshare.net",		apiurl: "http://epicshare.net/?op=checkfiles"		},
							{	host: "clouds.to",			apiurl: "http://clouds.to/?op=checkfiles"			},
							{	host: "boomupload.net",		apiurl: "http://boomupload.net/?op=checkfiles"		},
							{	host: "fujifile.me",		apiurl: "http://www.fujifile.me/?op=checkfiles"		},
							{	host: "uncapped-downloads.com", apiurl: "http://uncapped-downloads.com/?op=checkfiles"},
							{	host: "pandamemo.com",		apiurl: "http://www.pandamemo.com/checkfiles.html"	},
							{	host: "spicyfile.com",		apiurl: "http://spicyfile.com/checkfiles.html"		},
							{	host: "hugefiles.net",		apiurl: "http://www.hugefiles.net/?op=checkfiles"	},
							{	host: "hyshare.com",		apiurl: "http://hyshare.com/?op=checkfiles"			},
							{	host: "filezy.net",			apiurl: "http://filezy.net/?op=checkfiles"			},
							{	host: "filesear.com",		apiurl: "http://filesear.com/?op=checkfiles"		},
							{	host: "megacache.net",		apiurl: "http://megacache.net/?op=checkfiles"		},
							{	host: "lafiles.com",		apiurl: "http://lafiles.com/?op=checkfiles"			},
							{	host: "fileparadox.in",		apiurl: "http://fileparadox.in/?op=checkfiles"		},
							{	host: "rapidstation.com",	apiurl: "http://rapidstation.com/?op=checkfiles"	},
							{	host: "potload.com",		apiurl: "http://potload.com/?op=checkfiles"			},
							{	host: "sube.me",			apiurl: "http://sube.me/?op=checkfiles"				},
							{	host: "akafile.com",		apiurl: "http://akafile.com/?op=checkfiles"			},
							{	host: "files2upload.net",	apiurl: "http://files2upload.net/?op=checkfiles"	},
							{	host: "backin.net",			apiurl: "http://backin.net/?op=checkfiles"			},
							{	host: "uploadscenter.com",	apiurl: "http://www.uploadscenter.com/?op=checkfiles"},
							{	host: "guizmodl.net",		apiurl: "http://www.guizmodl.net/?op=checkfiles"	},
							{	host: "gigfiles.net",		apiurl: "http://gigfiles.net/?op=checkfiles"		},
							{	host: "upload-novalayer.com",apiurl: "http://upload-novalayer.com/?op=checkfiles"},
							{	host: "todayfile.com",		apiurl: "http://todayfile.com/?op=checkfiles"		},
							{	host: "sfshare.se",			apiurl: "http://sfshare.se/?op=checkfiles"			},
							{	host: "lemuploads.com",		apiurl: "http://lemuploads.com/?op=checkfiles"		},
							{	host: "megarelease.org",	apiurl: "http://megarelease.org/?op=checkfiles"		},
							{	host: "filedap.com",		apiurl: "http://filedap.com/?op=checkfiles"			},
							{	host: "divxpress.com",		apiurl: "http://divxpress.com/?op=checkfiles"		},
							{	host: "upgiga.com",			apiurl: "http://www.upgiga.com/?op=checkfiles"		},
							{	host: "koofile.com",		apiurl: "http://koofile.com/op/checkfiles"			},
							{	host: "earnupload.eu",		apiurl: "http://earnupload.eu/?op=checkfiles"		},
							{	host: "kingfiles.net",		apiurl: "http://www.kingfiles.net/?op=checkfiles"	},
							{	host: "shareblue.eu",		apiurl: "http://shareblue.eu/?op=checkfiles"		},
							{	host: "redload.net",		apiurl: "http://redload.net/?op=checkfiles"			},
							{	host: "grifthost.com",		apiurl: "http://grifthost.com/?op=checkfiles"		},
							{	host: "limevideo.net",		apiurl: "http://limevideo.net/?op=checkfiles"		},
							{	host: "nirafile.com",		apiurl: "http://www.nirafile.com/?op=checkfiles"	},
							{	host: "uploadinc.com",		apiurl: "http://uploadinc.com/?op=checkfiles"		},
							{	host: "lunaticfiles.com",	apiurl: "http://lunaticfiles.com/?op=checkfiles"	},
							{	host: "vozupload.com",		apiurl: "http://vozupload.com/?op=checkfiles"		},
							{	host: "kingsupload.com",	apiurl: "http://kingsupload.com/?op=checkfiles"		},
							{	host: "usefile.com",		apiurl: "http://usefile.com/?op=checkfiles"			},
							{	host: "vidplay.net",		apiurl: "http://vidplay.net/?op=checkfiles"			},
							{	host: "mydisc.net",			apiurl: "http://mydisc.net/checkfiles.html"			},
							{	host: "med1fire.com",		apiurl: "http://med1fire.com/?op=checkfiles"		},
							{	host: "stahuj.to",			apiurl: "http://stahuj.to/?op=checkfiles"			},
							{	host: "redbunker.net",		apiurl: "http://www.redbunker.net/?op=checkfiles"	},
							{	host: "uploadnetwork.eu",	apiurl: "http://uploadnetwork.eu/?op=checkfiles"	},
							{	host: "cloudvidz.net",		apiurl: "http://cloudvidz.net/?op=checkfiles"		},
							{	host: "hexupload.com",		apiurl: "http://hexupload.com/?op=checkfiles"		},
							{	host: "filesfrog.net",		apiurl: "http://www.filesfrog.net/?op=checkfiles"	},
							{	host: "dogupload.com",		apiurl: "http://www.filesfrog.net/?op=checkfiles"	}, //same host as filesfrog
							{	host: "shareprofi.com",		apiurl: "http://shareprofi.com/?op=checkfiles"		},
							{	host: "rocketfile.net",		apiurl: "http://www.rocketfile.net/?op=checkfiles"	},
							{	host: "salefiles.com",		apiurl: "http://salefiles.com/?op=checkfiles"		},
							{	host: "anafile.com",		apiurl: "http://www.anafile.com/?op=checkfiles"		},
							{	host: "bonanzashare.com",	apiurl: "http://bonanzashare.com/?op=checkfiles"	},
							{	host: "imgjungle.com",		apiurl: "http://imgjungle.com/?op=checkfiles"		},
							{	host: "unlimitzone.com",	apiurl: "http://unlimitzone.com/?op=checkfiles"		},
							{	host: "wallobit.com",		apiurl: "http://wallobit.com/?op=checkfiles"		},
							{	host: "swatupload.com",		apiurl: "http://swatupload.com/?op=checkfiles"		},
							{	host: "rosharing.com",		apiurl: "http://rosharing.com/?op=checkfiles"		},
							{	host: "storagely.com",		apiurl: "http://storagely.com/?op=checkfiles"		},
							{	host: "wipfiles.net",		apiurl: "http://wipfiles.net/?op=checkfiles"		},
							{	host: "uploadcapital.com",	apiurl: "http://www.uploadcapital.com/?op=checkfiles"},
							{	host: "filemoney.com",		apiurl: "http://filemoney.com/?op=checkfiles"		},
							{	host: "filehoot.com",		apiurl: "http://filehoot.com/?op=checkfiles"		},
							{	host: "qkup.net",			apiurl: "http://qkup.net/?op=checkfiles"			},
							{	host: "mxua.com",			apiurl: "http://www.mxua.com/?op=checkfiles"		},
							{	host: "uploadsat.com",		apiurl: "http://uploadsat.com/?op=checkfiles"		},
							{	host: "nodaup.com",			apiurl: "http://uploadsat.com/?op=checkfiles"		}, //same host as uploadsat
							{	host: "cloudyvideos.com",	apiurl: "http://cloudyvideos.com/?op=checkfiles"	},
							{	host: "idup.in",			apiurl: "http://idup.in/?op=checkfiles"				},
							{	host: "filedais.com",		apiurl: "http://www.filedais.com/?op=checkfiles"	},
							{	host: "fileforever.net",	apiurl: "http://fileforever.net/?op=checkfiles"		},
							{	host: "rioupload.com",		apiurl: "http://rioupload.com/?op=checkfiles"		},
							{	host: "migupload.com",		apiurl: "http://migupload.com/?op=checkfiles"		},
							{	host: "medofire.co",		apiurl: "http://medofire.co/?op=checkfiles"			},
							{	host: "vshare.eu",			apiurl: "http://vshare.eu/?op=checkfiles"			},
							{	host: "hellupload.com",		apiurl: "http://www.hellupload.com/checkfiles.html"	},
							{	host: "hostingbulk.com",	apiurl: "http://hostingbulk.com/?op=checkfiles"		},
							{	host: "movreel.com",		apiurl: "http://movreel.com/?op=checkfiles"			},
							{	host: "kookfile.com",		apiurl: "http://kookfile.com/?op=checkfiles"		},
							{	host: "thefile.me",			apiurl: "http://thefile.me/?op=checkfiles"			},
							{	host: "maxisharing.com",	apiurl: "http://maxisharing.com/?op=checkfiles"		},
							{	host: "spaceforfiles.com",	apiurl: "http://www.spaceforfiles.com/?op=checkfiles"},
							{	host: "city-upload.com",	apiurl: "http://city-upload.com/?op=checkfiles"		},
							{	host: "uploadrocket.net",	apiurl: "http://uploadrocket.net/?op=checkfiles"	},
							{	host: "bluehaste.com",		apiurl: "http://bluehaste.com/?op=checkfiles"		},
							{	host: "up09.com",			apiurl: "http://file.up09.com/?op=checkfiles"		},
							{	host: "1clickfiles.com",	apiurl: "http://1clickfiles.com/?op=checkfiles"		},
							{	host: "4downfiles.com",		apiurl: "http://4downfiles.com/?op=checkfiles"		},
							{	host: "berofile.com",		apiurl: "http://berofile.com/?op=checkfiles"		},
							{	host: "filemup.com",		apiurl: "http://www.filemup.com/?op=checkfiles"		},
							{	host: "hottera.com",		apiurl: "http://hottera.com/?op=checkfiles"			},
							{	host: "lomafile.com",		apiurl: "http://lomafile.com/?op=checkfiles"		},
							{	host: "tuxfile.com",		apiurl: "http://tuxfile.com/?op=checkfiles"			},
							{	host: "filecloud.cc",		apiurl: "http://filecloud.cc/?op=checkfiles"		},
						];
		
		//xfilesharing 1.0
		function addGenericType1()
		{
			var i = genType1.length;
			
			while(i--)
			{
				var host = genType1[i].host;
				var apiUrl = genType1[i].apiurl;
				
				if (apiUrl == "default") apiUrl = "http://www." + host + "/checkfiles.html";
				
				if (hostSet("Check_" + host.replace(/\./g, "_dot_").replace(/-/g, "_dash_") + "_links", false))
				{
					var regexSafe = host.replace(/\./g, "\\.").replace(/-/g, "\\-");
					
					addHost(
						host, //hostname
						regexSafe + "\/\\w+", //linkregex
						null, //blocksize
						new RegExp("(https?:\/\/(?:|www\\.)" + regexSafe + "\/\\w+)",""), //corrmatch
						null, //corrreplwhat
						null, //corrreplwith
						null, //separator
						apiUrl, //api url
						"op=checkfiles&process=Check+URLs&list=", //postdata
						new RegExp("(" + regexSafe + "\/\\w+)",""), //linkregex
						new RegExp("<font color='green'>https?:\/\/(?:|www\.)" + regexSafe + "\/\\w+","g"), //liveregex
						new RegExp("<font color='red'>https?:\/\/(?:|www\.)" + regexSafe + "\/\\w+","g"), //deadregex
						new RegExp("<font color='orange'>https?:\/\/(?:|www\.)" + regexSafe + "\/\\w+","g"), //unavaregex
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
				var host = genType2[i].host;
				var apiUrl = genType2[i].apiurl;
				
				if (hostSet("Check_" + host.replace(/\./g, "_dot_").replace(/-/g, "_dash_") + "_links", false))
				{
					var regexSafe = host.replace(/\./g, "\\.").replace(/-/g, "\\-");
					
					addHost(
						host, //hostname
						"https?:\/\/(?:www\\.|file\\.)?" + regexSafe + "\/\\w+", //linkregex
						null, //blocksize
						new RegExp("(https?:\/\/(?:|www\\.)" + regexSafe + "\/\\w+)",""), //corrmatch
						null, //corrreplwhat
						null, //corrreplwith
						null, //separator
						apiUrl, //api url
						"op=checkfiles&process=Check+URLs&list=", //postdata
						new RegExp("(" + regexSafe + "\/\\w+)",""), //linkregex
						new RegExp(regexSafe + "\/\\w+.*?\\s*<\/td>\\s*<td style=\"color:(?:green|#00f100);","g"), //liveregex
						new RegExp(regexSafe + "\/\\w+.*?\\s*<\/td>\\s*<td style=\"color:(?:red|#f10000);","g"), //deadregex
						new RegExp(regexSafe + "\/\\w+.*?\\s*<\/td>\\s*<td style=\"color:orange;","g"), //unavaregex
						null //function delegate
					)
				}
			}
		}
		
		// TEMPLATE
		// if (hostSet("Check__dot_com_links", false))
		// {			
			// addHost(
				// "", //hostname
				// "", //linkregex
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
		
		if (hostSet("Check_myvdrive_dot_com_links", false))
		{	
			addHost(
				"myvdrive.com|fileserving.com", //hostname
				"(?:fileserving|myvdrive)\\.com\/files\/[\\w-]+", //linkregex
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://www.myvdrive.com/Public/linkchecker", //api url
				"links=", //postdata
				/(?:fileserving|myvdrive)\.com\/(files\/[\w-]+)/, //linkregex
				/icon_file_check_valid"><\/span>\s*http:\/\/(?:www\.)?(?:fileserving|myvdrive)\.com\/files\/[\w-]+/g, //liveregex
				/icon_file_check_(?:removed|notvalid)"><\/span>\s*http:\/\/(?:www\.)?(?:fileserving|myvdrive)\.com\/files\/[\w-]+/g, //deadregex
				null, //unavaregex
				null //function delegate
			)				
		}
		
		/*if (hostSet("Check_billionuploads_dot_com_links", false))
		{	
			addHost(
				"billionuploads.com|BillionUploads.com", //hostname
				"(?:[bB]illion[uU]ploads)\\.com\/\\w+", //linkregex
				10, //blocksize
				/(http:\/\/(?:www\.|new\.)?billionuploads\.com\/\w+)/i, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://billionuploads.com/?op=checkfiles", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/billionuploads\.com\/(\w+)/i, //linkregex
				/green'>http:\/\/(?:new\.|www\.)?billionuploads\.com\/\w+/gi, //liveregex
				/red'>http:\/\/(?:new\.|www\.)?billionuploads\.com\/\w+/gi, //deadregex
				/orange'>http:\/\/(?:new\.|www\.)?billionuploads\.com\/\w+/gi, //unavaregex
				null //function delegate
			)				
		}*/

		if (hostSet("Check_filepost_dot_com_links", false))
		{			
			addHost(
				"filepost.com|fp.io", //hostname
				"(?:filepost\\.com\/files|fp\\.io)\/\\w+", //linkregex
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
		
		if (hostSet("Check_fiberupload_dot_net_links", false))
		{			
			addHost(
				"fiberupload.com|fiberupload.net", //hostname
				"fiberupload\\.(?:com|net)\/\\w+", //linkregex
				null, //blocksize
				/(http:\/\/(?:www\.|)fiberupload\.(?:com|net)\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://fiberupload.net/?op=checkfiles',
				'op=checkfiles&list=',
				/(fiberupload\.(?:com|net)\/\w+)/,
				/'green'>http:\/\/(?:www\.|)fiberupload\.(?:com|net)\/\w+/g,
				/'red'>http:\/\/(?:www\.|)fiberupload\.(?:com|net)\/\w+/g,
				/'orange'>http:\/\/(?:www\.|)fiberupload\.(?:com|net)\/\w+/g,
				null //function delegate
			)
		}
		
		if (hostSet("Check_edisk_dot_cz_links", false))
		{			
			addHost(
				"edisk.cz|edisk.sk|edisk.eu", //hostname
				"(?:(?:muj|data)\\d*\\.|)edisk\\.(?:cz|sk|eu)\/(?:|(?:cz|sk|en|pl)\/)", //linkregex
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
		
		if (hostSet("Check_bezvadata_dot_cz_links", false))
		{			
			addHost(
				"bezvadata.cz", //hostname
				"(?:beta\\.|)bezvadata\.cz\/stahnout\/\\d+\\w+", //linkregex
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
		
		if (hostSet("Check_depositfiles_dot_com_links", false))
		{			
			addHost(
				"depositfiles.com|dfiles.eu|dfiles.ru|depositfiles.org|depositfiles.lt", //hostname
				"(?:depositfiles\\.(?:com|lt|org)|dfiles\\.(?:eu|ru))\/(?:en\/|ru\/|de\/|es\/|pt\/|)files\/\\w+", //linkregex
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
		
		if (hostSet("Check_videobb_dot_com_links", false))
		{			
			addHost(
				"videobb.com", //hostname
				"videobb\\.com\/(?:video\/|watch_video\\.php\\?v=)\\w+", //linkregex
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://www.videobb.com/link_checker.php',
				'links=',
				/(videobb\.com\/(?:watch_video\.php\?v?=|video\/)\w+)/,
				/<td>http:\/\/(?:www\.|)videobb.com\/(?:watch_video\.php\?v?=|video\/)\w+<\/td>\s+<td>.+?<\/td>\s+<td>\d+:\d+<\/td>\s+<td>Available/g,
				/<td>http:\/\/(?:www\.|)videobb.com\/(?:watch_video\.php\?v?=|video\/)\w+<\/td>\s+<td>(?:|.+?)<\/td>\s+<td>N\/A<\/td>\s+<td>Not Available/g,
				null,
				null //function delegate
			)			
		}
		
		if (hostSet("Check_queenshare_dot_com_links", false))
		{
			addHost(
				"queenshare.com|10upload.com", //hostname
				"(?:queenshare|10upload)\\.com\/\\w+", //linkregex
				null, //blocksize
				/(http:\/\/(?:www\.|)(?:queenshare|10upload)\.com\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://www.queenshare.com/?op=checkfiles', //api url
				'op=checkfiles&process=Check+URLs&list=', //postdata
				/((?:queenshare|10upload)\.com\/\w+)/, //linkregex
				/(?:queenshare|10upload)\.com\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g, //liveregex
				/(?:queenshare|10upload)\.com\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g, //deadregex
				/(?:queenshare|10upload)\.com\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g, //unavaregex
				null //function delegate
			)
		}
		
		if (hostSet("Check_bitshare_dot_com_links", false))
		{				
			addHost(
				"bitshare.com", //hostname
				"bitshare\\.com\/(?:files\/|\\?[fi]=)\\w+", //linkregex
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://bitshare.com/linkcheck.html',
				'submit=Check&links=',
				/(bitshare\.com\/(?:files\/|\?[fi]=)\w+)/,
				/ru_2\.gif" \/>\s*<\/div>\s*<span style="font-size:14px;font-weight:bold;">.*?<\/span>\s*<\/p>\s*<p>\s*<a href="http:\/\/(?:www\.|)bitshare\.com\/(?:files\/|\?[fi]=)\w+/g,
				/ru_3\.gif" \/>\s*<\/div>\s*<span style="font-size:14px;font-weight:bold;">.*?<\/span>\s*<\/p>\s*<p>\s*<a href="http:\/\/(?:www\.|)bitshare\.com\/(?:files\/|\?[fi]=)\w+/g,
				/ru_1\.gif" \/>\s*<\/div>\s*<span style="font-size:14px;font-weight:bold;">.*?<\/span>\s*<\/p>\s*<p>\s*<a href="http:\/\/(?:www\.|)bitshare\.com\/(?:files\/|\?[fi]=)\w+/g,
				null //function delegate
			)			
		}

		if (hostSet("Check_cramit_dot_in_links", false))
		{			
			addHost(
				"cramit.in|cramitin.net|cramitin.eu|cramitin.us", //hostname
				"cramit(?:\\.in|in\\.(?:net|eu|us))\/", //linkregex
				null, //blocksize
				/(http:\/\/(?:www\.)?cramit(?:\.in|in\.(?:net|eu|us))\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://cramit.in/checkfiles.html',
				'op=checkfiles&process=CHECK+URL%27S&list=',
				/(cramit(?:\.in|in\.(?:net|eu|us))\/\w+)/,
				/green>http:\/\/(?:www\.|)cramit(?:\.in|in\.(?:net|eu|us))\/\w+/g,
				/red'>http:\/\/(?:www\.|)cramit(?:\.in|in\.(?:net|eu|us))\/\w+/g,
				/orange'>http:\/\/(?:www\.|)cramit(?:\.in|in\.(?:net|eu|us))\/\w+/g,
				null //function delegate
			)			
		}
		
		if (hostSet("Check_filerio_dot_com_links", false))
		{			
			addHost(
				"filekeen.com|filerio.in|filerio.com", //hostname
				"file(?:keen|rio)\\.(?:com|in)\/\\w+", //linkregex
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				"\n", //separator
				'http://filerio.in/checkfiles.html',
				'op=checkfiles&process=Check+URLs&list=',
				/(file(?:keen|rio)\.(?:com|in)\/\w+)/,
				/green'>http:\/\/(?:www\.|)file(?:keen|rio)\.(?:com|in)\/\w+/g,
				/red'>http:\/\/(?:www\.|)file(?:keen|rio)\.(?:com|in)\/\w+/g,
				/orange'>http:\/\/(?:www\.|)file(?:keen|rio)\.(?:com|in)\/\w+/g,
				null //function delegate
			)			
		}
		
		if (hostSet("Check_share_dash_online_dot_biz_links", false))
		{			
			addHost(
				"share-online.biz|egoshare.com", //hostname
				"(?:share-online\\.biz|egoshare\\.com)\/(?:dl\/|download\\.php\\?id=|\\?d=)\\w+", //linkregex
				100, //blocksize
				/http:\/\/(?:www\.|)(?:share-online\.biz|egoshare\.com)\/(?:d(?:l\/|ownload\.php\?id=)|\?d=)(?:\d{1}\/|)(\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				"\n", //separator
				'http://api.share-online.biz/linkcheck.php',
				'links=',
				/(\w+);(?:OK|NOTFOUND|DELETED)/,
				/(\w+);OK/g,
				/(\w+);(?:DELETED|NOTFOUND)/g, 
				null,
				null //function delegate
			)			
		}
				
		if (hostSet("Check_quickshare_dot_cz_links", false))
		{			
			addHost(
				"quickshare.cz", //hostname
				"quickshare\\.cz\/stahnout-soubor\/\\d+", //linkregex
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
		
		if (hostSet("Check_netload_dot_in_links", false))
		{			
			addHost(
				"netload.in", //hostname
				"netload\\.in\/datei\\w{10}", //linkregex
				100, //blocksize
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
		
		if (hostSet("Check_rapidshare_dot_com_links", false))
		{			
			addHost(
				"rapidshare.com|rapidshare.de", //hostname
				"(?:|rs\\w*\\.)rapidshare\\.(?:com|de)\/?(?:files\/\\d+\/|share\/\\w+|#!download\\|\\w+\\|\\d+\\|.+?\\|\\d+)", //linkregex
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
			);	
		}
		
		if (hostSet("Check_filefactory_dot_com_links", false) && genset("Filefactory_API_Check", false))
		{			
			addHost(
				"filefactory.com", //hostname
				"filefactory\\.com\/+file\/[a-z0-9]", //linkregex
				100, //blocksize
				null, //corrmatch
				/(?:www\.|)filefactory\.com\/+file/, //corrreplwhat
				'www.filefactory.com/file', //corrreplwith
				"\n", //separator
				"http://www.filefactory.com/account/tools/link-checker.php", //api url
				"Submit=Check+Links&links=", //postdata
				/filefactory\.com\/(file\/\w+)/, //linkregex
				/<i class="icon-ok.+\n.+\n.+http:\/\/(?:www\.)?filefactory\.com\/file\/\w+/g, //liveregex
				/<i class="icon-remove.+\n.+\n.+http:\/\/(?:www\.)?filefactory\.com\/file\/\w+/g, //deadregex
				/<i class="icon-wrench.+\n.+\n.+http:\/\/(?:www\.)?filefactory\.com\/file\/\w+/g, //unavaregex
				null //function delegate
			);			
		}
		
		if (hostSet("Check_videopremium_dot_net_links", false))
		{
			addHost(
				"videopremium.net|videopremium.tv|videopremium.me", //hostname
				"videopremium\\.(?:net|tv)\/\\w+", //linkregex
				null, //blocksize
				/(http:\/\/(?:www\.|)videopremium\.(?:net|tv|me)\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://videopremium.me/?op=checkfiles',
				'op=checkfiles&process=Check+URLs&list=',
				/(videopremium\.(?:net|tv|me)\/\w+)/,
				/videopremium\.(?:net|tv|me)\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g, //liveregex
				/videopremium\.(?:net|tv|me)\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g, //deadregex
				/videopremium\.(?:net|tv|me)\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g, //unavaregex
				null //function delegate
				
			)
		}
		
		if (hostSet("Check_eyesfile_dot_net_links", false))
		{			
			addHost(
				"eyesfile.net|eyesfile.com|eyesfile.co|eyesfile.org|eyesfile.ca", //hostname
				"eyesfile\\.(?:c\\w{1,2}|net|org)\/\\w+", //linkregex
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://www.eyesfile.ca/checkfiles.html',
				'op=checkfiles&process=Check+URLs&list=',
				/(eyesfile\.(?:c\w{1,2}|net|org)\/\w+)/,
				/green'>http:\/\/(?:www\.|)eyesfile\.(?:c\w{1,2}|net|org)\/\w+/g,
				/red'>http:\/\/(?:www\.|)eyesfile\.(?:c\w{1,2}|net|org)\/\w+/g,
				/orange'>http:\/\/(?:www\.|)eyesfile\.(?:c\w{1,2}|net|org)\/\w+/g,
				null //function delegate
			)			
		}
		
		if (hostSet("Check_nitrobits_dot_com_links", false))
		{
			addHost(
				"nitrobits.com",
				"nitrobits\\.com\/file\/\\w+",
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://nitrobits.com/linkchecker.php",
				"submit=Check+Links&links=",
				/(nitrobits\.com\/file\/\w+)/,
				/nitrobits\.com\/file\/\w+.*?\s*<\/td>\s*<\w+.*?>\s*<span class="available/g, //liveregex
				/nitrobits\.com\/file\/\w+.*?\s*<\/td>\s*<\w+.*?>\s*<span class="dead/g, //deadregex
				/nitrobits\.com\/file\/\w+.*?\s*<\/td>\s*<\w+.*?>\s*<span class="unavailable/g, //unavaregex
				null
			)
		}
			
		if (hostSet("Check_uploading_dot_com_links", false))
		{
			addHost(
				"uploading.com",
				"http:\/\/(?:www\\.|)uploading\\.com\/(?:files\/)?\\w+",
				500, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://uploading.com/filechecker?ajax",
				"urls=",
				/uploading\.com\\\/(\w+)/,
				/ok\\">\\n\\t\\t<span class=\\"num\\">\d+<\\\/span>\\n\\t\\t<i><\\\/i>\\n\\t\\t<div>\\n\\t\\t\\t<a href=\\"http:\\\/\\\/(?:www\.|)uploading\.com\\\/\w+/g,
				/failed\\">\\n\\t\\t<span class=\\"num\\">\d+<\\\/span>\\n\\t\\t<i><\\\/i>\\n\\t\\t<div>\\n\\t\\t\\t<a href=\\"http:\\\/\\\/(?:www\.|)uploading\.com\\\/\w+/g,
				null,
				uploadingBulkCheck
			)
		}
			
		/*if (hostSet("Check_extabit_dot_com_links", false) && genset("Extabit_API_Check", false))
		{
			addHost(
				"extabit.com",
				"(?:u\\d+\\.)?extabit\\.com\/file(?:\/|\_)\\w+",
				100, //blocksize
				null, //corrmatch
				/\?upld=1/, //corrreplwhat
				"", //corrreplwith
				null, //separator
				null,
				null,
				null,
				null,
				null,
				null,
				extabitBulkCheck
			)
		}*/
			
		if (hostSet("Check_megashares_dot_com_links", false))
		{
			addHost(
				"megashares.com",
				"(?:d\\d+\.|)megashares\.com\/(?:dl\/|(?:index\\.php\\?d\\d+|\\?d\\d+)=)\\w+",
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://d01.megashares.com/checkit.php",
				"submit_links=Check+Links&check_links=",
				/((?:d\d+\.|)megashares\.com\/(?:dl\/|(?:index\.php\?d\d+|\?d\d+)=)\w+)/,
				/(?:d\d+\.|)megashares\.com\/(?:dl\/|(?:index\.php\?d\d+|\?d\d+)=)\w+.*?\s*-\s*ok/g,
				/(?:d\d+\.|)megashares\.com\/(?:dl\/|(?:index\.php\?d\d+|\?d\d+)=)\w+.*?\s*-\s*invalid/g,
				null,
				null
			)
		}
			
		if (hostSet("Check_mega_dot_co_dot_nz_links", false))
		{
			addHost(
				"mega.co.nz",
				"mega\\.co\\.nz\/#!\\w+",
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
			
		if (hostSet("Check_4up_dot_me_links", false))
		{
			addHost(
				"4up.me|4up.im|4upfiles.com",
				"(?:4upfiles\\.com|4up\\.(?:me|im))\/\\w+",
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://4upfiles.com/?op=checkfiles", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/(4up(?:files)?\.(?:com|me|im)\/\w+)/, //linkregex
				/4up(?:files)?\.(?:com|me|im)\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g, //liveregex
				/4up(?:files)?\.(?:com|me|im)\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g, //deadregex
				/4up(?:files)?\.(?:com|me|im)\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g, //unavaregex
				null //function delegate
			)
		}
			
		if (hostSet("Check_uploaded_dot_to_links", false))
		{
			addHost(
				"uploaded.to|uploaded.net|ul.to",
				'(?:uploaded\\.(?:to|net)|ul\\.to)\/(?:files?\/|\\?(?:lang=\\w{2}&)?id=|folder\/)?(?!img|coupon)\\w{8}',
				1000,
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
				uploadedBulkCheck
			)
		}
				
		if (hostSet("Check_tusfiles_dot_net_links", false))
		{			
			addHost(
				"tusfiles.com|tusfiles.net", //hostname
				"tusfiles\\.(?:com|net)\/\\w+", //linkregex
				null, //blocksize
				/(http:\/\/(?:www\.|)tusfiles\.(?:com|net)\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://www.tusfiles.net/?op=checkfiles',
				'op=checkfiles&process=Check+URLs&list=',
				/(tusfiles\.(?:net|com)\/\w+)/,
				/tusfiles\.(?:net|com)\/\w+.*?<\/td>\s*<td style="color:green;">/g, //liveregex
				/tusfiles\.(?:net|com)\/\w+.*?<\/td>\s*<td style="color:red;">/g, //deadregex
				/tusfiles\.(?:net|com)\/\w+.*?<\/td>\s*<td style="color:orange;">/g, //unavaregex
				null //function delegate
			)			
		}
			
		if (hostSet("Check_junocloud_dot_me_links", false))
		{
			addHost(
				"junocloud.me",
				"junocloud\\.me\/\\w+",
				null,
				null,
				null,
				null,
				null,
				"http://junocloud.me/checkfiles.html",
				"op=checkfiles&process=Check+URLs&list=",
				/(junocloud\.me\/\w+)/,
				/junocloud\.me\/\w+.*?<span style="color: green;/g,
				/junocloud\.me\/\w+.*?<span style="color: red;/g,
				/junocloud\.me\/\w+.*?<span style="color: orange;/g,
				null //function delegate
			)
		}
			
		if (hostSet("Check_flashdrive_dot_it_links", false))
		{
			addHost(
				"flashdrive.it|flashdrive.uk.com",
				"flashdrive\\.(?:it|uk\\.com)\/\\w+",
				null,
				null,
				null,
				null,
				null,
				"http://flashdrive.uk.com/?op=checkfiles",
				"op=checkfiles&process=Check+URLs&list=",
				/(flashdrive\.(?:it|uk\.com)\/\w+)/,
				/flashdrive\.(?:it|uk\.com)\/\w+.*?<\/td><td style="color:green;">/g,
				/flashdrive\.(?:it|uk\.com)\/\w+.*?<\/td><td style="color:red;">/g,
				/flashdrive\.(?:it|uk\.com)\/\w+.*?<\/td><td style="color:orange;">/g,
				null //function delegate
			)
		}
			
		if (hostSet("Check_datei_dot_to_links", false))
		{
			addHost(
				"datei.to",
				"datei\\.to\/(?:datei\/|files\/|1,|\\?)\\w+",
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
				dateiToBulk
			)
		}
			
		if (hostSet("Check_medafire_dot_net_links", false))
		{
			addHost(
				"medafire.net",
				"medafire\\.net\/(?:up\/)?\\w+",
				null,
				null,
				null,
				null,
				null,
				"http://medafire.net/?op=checkfiles",
				"op=checkfiles&process=Check+URLs&list=",
				/(medafire\.net\/(?:up\/)?\w+)/,
				/medafire\.net\/(?:up\/)?\w+.*?<\/td><td style="color:green;">/g,
				/medafire\.net\/(?:up\/)?\w+.*?<\/td><td style="color:red;">/g,
				/medafire\.net\/(?:up\/)?\w+.*?<\/td><td style="color:orange;">/g,
				null //function delegate
			)
		}
			
		if (hostSet("Check_datafile_dot_com_links", false))
		{			
			addHost(
				"datafile.com", //hostname
				"datafile\\.com\/d\/\\w+", //linkregex
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://www.datafile.com/linkchecker.html', //api url
				'btn=&links=', //postdata
				/datafile\.com\\\/d\\(\/\w+)/, //linkregex
				/datafile\.com\\\/d\\\/\w+(?:\\\/)?.+?","status":1,/g, //liveregex
				/datafile\.com\\\/d\\\/\w+(?:\\\/)?.+?","status":0,/g, //deadregex
				null, //unavaregex
				null //function delegate
			)			
		}
			
		if (hostSet("Check_depfile_dot_com_links", false))
		{			
			addHost(
				"depfile.com", //hostname
				"depfile\\.com\/(?:downloads\/i\/\\d+\/f\/|\\w+)", //linkregex
				22, //blocksize //unsure if right number
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'https://depfile.com/checkfiles', //api url
				'send=Check&files=', //postdata
				/(depfile\.com\/(?:downloads\/i\/\d+|\w+))/, //linkregex
				/depfile\.com\/(?:downloads\/i\/\d+|\w+)[^<]*?<\/td><td><span class='active/g, //liveregex
				/depfile\.com\/(?:downloads\/i\/\d+|\w+)[^<]*?<\/td><td><span class='(?:notfound|badurl)/g, //deadregex
				null, //unavaregex
				null //function delegate
			)			
		}
			
		if (hostSet("Check_lumfile_dot_com_links", false))
		{			
			addHost(
				"lumfile.com|lumfile.eu|lumfile.se|terafile.co", //hostname
				"(?:lumfile\\.(?:com|eu|se)|terafile\\.co)\/\\w+", //linkregex
				null, //blocksize
				/(http:\/\/(?:www\.|)(?:lumfile\.(?:com|eu|se)|terafile\.co)\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://www.terafile.co/?op=checkfiles',
				'op=checkfiles&process=Check+URLs&list=',
				/((?:terafile\.co|lumfile\.(?:se|eu|com))\/\w+)/,
				/(?:terafile\.co|lumfile\.(?:se|eu|com))\/\w+.*?<\/td>\s*<td style="color:green;">/g, //liveregex
				/(?:terafile\.co|lumfile\.(?:se|eu|com))\/\w+.*?<\/td>\s*<td style="color:red;">/g, //deadregex
				/(?:terafile\.co|lumfile\.(?:se|eu|com))\/\w+.*?<\/td>\s*<td style="color:orange;">/g, //unavaregex
				null //function delegate
			)			
		}
			
		if (hostSet("Check_filedwon_dot_com_links", false))
		{
			addHost(
				"filedwon.com|filedwon.net|filedwon.info", //hostname
				"filedwon\\.(?:com|net|info)\/\\w+", //linkregex
				null, //blocksize
				/(http:\/\/(?:www\.|)filedwon\.(?:com|net|info)\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://filedwon.info/?op=checkfiles',
				'op=checkfiles&process=Check+URLs&list=',
				/(filedwon\.(?:com|net|info)\/\w+)/,
				/filedwon\.(?:com|net|info)\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g, //liveregex
				/filedwon\.(?:com|net|info)\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g, //deadregex
				/filedwon\.(?:com|net|info)\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g, //unavaregex
				null //function delegate
			)
		}
		
		if (hostSet("Check_ge_dot_tt_links", false))
		{			
			addHost(
				"ge.tt", //hostname
				"ge\\.tt\/(?:api\/1\/files\/)?\\w+", //linkregex
				1000000, //blocksize
				/ge\.tt\/(?:api\/1\/files\/)?(\w+.*)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'https://open.ge.tt/1/files/', //api url
				null, //postdata
				null, //linkregex
				null, //liveregex
				null, //deadregex
				null, //unavaregex
				gettBulkCheck //function delegate
			)			
		}
		
		if (hostSet("Check_filesbomb_dot_com_links", false))
		{
			addHost(
				"filesbomb.com|filesbomb.biz|filesbomb.in", //hostname
				"filesbomb\\.(?:com|biz|in)\/\\w+", //linkregex
				null, //blocksize
				/(http:\/\/(?:www\.|)filesbomb\.(?:com|biz|in)\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://filesbomb.in/?op=checkfiles',
				'op=checkfiles&process=Check+URLs&list=',
				/(filesbomb\.(?:com|biz|in)\/\w+)/,
				/filesbomb\.(?:com|biz|in)\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g, //liveregex
				/filesbomb\.(?:com|biz|in)\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g, //deadregex
				/filesbomb\.(?:com|biz|in)\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g, //unavaregex
				null //function delegate
			)
		}
		
		if (hostSet("Check_restfile_dot_ca_links", false))
		{	
			addHost(
				"restfile.ca|restfile.com|restfile.cc|restfile.org|restfile.net", //hostname
				"restfile\\.(?:c(?:a|c|om)|org|net)\/\\w+", //linkregex
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://www.restfile.ca/?op=checkfiles", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/(restfile\.\w{2,3}\/\w+)/, //linkregex
				/green'>http:\/\/(?:|www\.)restfile\.\w{2,3}\/\w+/g, //liveregex
				/red'>http:\/\/(?:|www\.)restfile\.\w{2,3}\/\w+/g, //deadregex
				/orange'>http:\/\/(?:|www\.)restfile\.\w{2,3}\/\w+/g, //unavaregex
				null //function delegate
			)				
		}
		
		if (hostSet("Check_filekom_dot_com_links", false))
		{	
			addHost(
				"filekom.com|filemac.com", //hostname
				"file(?:kom|mac)\\.com\/\\w+", //linkregex
				null, //blocksize
				/(http:\/\/(?:|www\.)file(?:kom|mac)\.com\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://filekom.com/checkfiles.html", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/(file(?:kom|mac)\.com\/\w+)/, //linkregex
				/green'>http:\/\/(?:|www\.)file(?:kom|mac)\.com\/\w+/g, //liveregex
				/red'>http:\/\/(?:|www\.)file(?:kom|mac)\.com\/\w+/g, //deadregex
				/orange'>http:\/\/(?:|www\.)file(?:kom|mac)\.com\/\w+/g, //unavaregex
				null //function delegate
			)				
		}	
		
		if (hostSet("Check_filepup_dot_net_links", false))
		{			
			addHost(
				"filepup.net", //hostname
				"filepup\\.net\/(?:files|get)\/\\w+", //linkregex
				null, //blocksize
				null, //corrmatch
				/\/get\/(\w+)\/.+/, //corrreplwhat
				"/files/$1.html", //corrreplwith
				null, //separator
				'http://www.filepup.net/link_checker.php', //api url
				'task=doCheck&submit=Check+Links&urls=', //postdata
				/filepup\.net\/files(\/\w+)/, //linkregex
				/green">http:\/\/(?:www\.)?filepup\.net\/files\/\w+/g, //liveregex
				/red">http:\/\/(?:www\.)?filepup\.net\/files\/\w+/g, //deadregex
				/orange">http:\/\/(?:www\.)?filepup\.net\/files\/\w+/g, //unavaregex
				null //function delegate
			)			
		}
		
		if (hostSet("Check_media1fire_dot_com_links", false))
		{	
			addHost(
				"media1fire.com", //hostname
				"up\\.media1fire\\.com\/\\w+", //linkregex
				null, //blocksize
				/(http:\/\/up\.media1fire\.com\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://up.media1fire.com/?op=checkfiles", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/(up\.media1fire\.com\/\w+)/, //linkregex
				/up\.media1fire\.com\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g, //liveregex
				/up\.media1fire\.com\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g, //deadregex
				/up\.media1fire\.com\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g, //unavaregex
				null //function delegate
			)				
		}
		
		if (hostSet("Check_freakshare_dot_net_links", false))
		{			
			addHost(
				"freakshare.net|freakshare.com", //hostname
				"freakshare\\.(?:com|net)\/files\/\\w+", //linkregex
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://freakshare.com/linkcheck.html', //api url
				'submit=Check&links=', //postdata
				/(freakshare\.(?:net|com)\/files\/\w+)/, //linkregex
				/\/ru_2\.gif" \/>\n\s*<\/div>\n\s*<span .+<\/span>\n\s*<\/p>\n\s*<p>\n\s*<a href="http:\/\/freakshare\.(?:net|com)\/files\/\w+.*?"/g, //liveregex
				/\/ru_3\.gif" \/>\n\s*<\/div>\n\s*<span .+<\/span>\n\s*<\/p>\n\s*<p>\n\s*<a href="http:\/\/freakshare\.(?:net|com)\/files\/\w+.*?"/g, //deadregex
				/\/ru_1\.gif" \/>\n\s*<\/div>\n\s*<span .+<\/span>\n\s*<\/p>\n\s*<p>\n\s*<a href="http:\/\/freakshare\.(?:net|com)\/files\/\w+.*?"/g, //unavaregex
				null //function delegate
			)			
		}
		
		if (hostSet("Check_snoork_dot_com_links", false))
		{	
			addHost(
				"snoork.com", //hostname
				"files\\.snoork\\.com\/\\w+", //linkregex
				null, //blocksize
				/(http:\/\/files\.snoork\.com\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://files.snoork.com/?op=checkfiles", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/(files\.snoork\.com\/\w+)/, //linkregex
				/files\.snoork\.com\/\w+.*?<\/td>\s*<td style=\"color:green;\">/g, //liveregex
				/files\.snoork\.com\/\w+.*?<\/td>\s*<td style=\"color:red;\">/g, //deadregex
				/files\.snoork\.com\/\w+.*?<\/td>\s*<td style=\"color:orange;\">/g, //unavaregex
				null //function delegate
			)				
		}
		
		if (hostSet("Check_filecloud_dot_io_links", false))
		{			
			addHost(
				"filecloud.io", //hostname
				"filecloud\\.io\/\\w{6,8}", //linkregex
				100000000, //blocksize
				/filecloud\.io\/(\w{6,8})/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				null, //api url
				null, //postdata
				null, //linkregex
				null, //liveregex
				null, //deadregex
				null, //unavaregex
				filecloudBulkCheck //function delegate
			)			
		}
		
		if (hostSet("Check_maskfile_dot_com_links", false))
		{			
			addHost(
				"maskfile.com", //hostname
				"[mM]ask[Ff]ile\\.com\/\\w+", //linkregex
				null, //blocksize
				/(https?:\/\/(?:www\.)?maskfile\.com\/\w+)/i, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'https://www.maskfile.com/?op=checkfiles', //api url
				'op=checkfiles&process=Check+URLs&list=', //postdata
				/maskfile\.com\/(\w+)/i, //linkregex
				/maskfile\.com\/\w+.*?<\/td>\s*<td style="color:green;">/gi, //liveregex
				/maskfile\.com\/\w+.*?<\/td>\s*<td style="color:red;">/gi, //deadregex
				/maskfile\.com\/\w+.*?<\/td>\s*<td style="color:orange;">/gi, //unavaregex
				null //function delegate
			)			
		}
		
		if (hostSet("Check_anysend_dot_com_links", false))
		{			
			addHost(
				"anysend.com", //hostname
				"anysend\\.com\/\\w{32}", //linkregex
				100000, //blocksize
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
				anysendBulkCheck //function delegate
			)			
		}
		
		if (hostSet("Check_batshare_dot_com_links", false))
		{			
			addHost(
				"batshare.com", //hostname
				"batshare\\.com\/\\w+", //linkregex
				null, //blocksize
				/(https?:\/\/(?:www\.)?batshare\.com\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://batshare.com/?op=checkfiles', //api url
				'op=checkfiles&process=Check+URLs&list=', //postdata
				/(batshare\.com\/\w+)/, //linkregex
				/<font color='green'><a target='_new' href='http:\/\/(?:www\.)?batshare\.com\/\w+(?:\/.*)?'>/g, //liveregex
				/<font color='red'>http:\/\/(?:www\.)?batshare\.com\/\w+(?:\/.*)?/g, //deadregex
				/<font color='orange'><a target='_new' href='http:\/\/(?:www\.)?batshare\.com\/\w+(?:\/.*)?'>/g, //unavaregex
				null //function delegate
			)			
		}
		
		if (hostSet("Check_webshare_dot_cz_links", false))
		{
			addHost(
				"webshare.cz", //hostname
				"webshare\\.cz\/(?:(?:#/)?file/\\w+|\\w+-.*)", //linkregex
				100000, //blocksize
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
				webshareBulkCheck //function delegate
			)			
		}
		
		if (hostSet("Check_uploadable_dot_ch_links", false))
		{			
			addHost(
				"uploadable.ch", //hostname
				"uploadable\\.ch\/file\/\\w+", //linkregex
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://www.uploadable.ch/check.php', //api url
				'urls=', //postdata
				/(uploadable\.ch\/file\/\w+)/, //linkregex
				/<div class="col1"><a href="">http:\/\/(?:www\.)?uploadable\.ch\/file\/\w+.*<\/a><\/div>\s+<div class="col2">.+<\/div>\s+<div class="col3">.+<\/div>\s+<div class="col4"><span class="[\w\s]+">&nbsp;<\/span>\s+<span class="left">Available<\/span>/g, //liveregex
				/<div class="col1"><a href="">http:\/\/(?:www\.)?uploadable\.ch\/file\/\w+.*<\/a><\/div>\s+<div class="col2">.+<\/div>\s+<div class="col3">.+<\/div>\s+<div class="col4"><span class="[\w\s]+">&nbsp;<\/span>\s+<span class="left">Not Available<\/span>/g, //deadregex
				null, //unavaregex
				null //function delegate
			)			
		}
		
		if (hostSet("Check_filecity_dot_eu_links", false))
		{			
			addHost(
				"filecity.eu|filecity.net", //hostname
				"filecity\\.(?:eu|net)\/\\w+", //linkregex
				null, //blocksize
				null, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				'http://filecity.net/?op=checkfiles', //api url
				'op=checkfiles&process=Check+URLs&list=', //postdata
				/(filecity\.(?:eu|net)\/\w+)/, //linkregex
				/filecity\.(?:eu|net)\/\w+.*<\/td>\s*<td style="color:green;">/g, //liveregex
				/filecity\.(?:eu|net)\/\w+.*<\/td>\s*<td style="color:red;">/g, //deadregex
				/filecity\.(?:eu|net)\/\w+.*<\/td>\s*<td style="color:orange;">/g, //unavaregex
				null //function delegate
			)			
		}

		if (hostSet("Check_storagon_dot_com_links", false))
		{	
			addHost(
				"storagon.com", //hostname
				"storagon\\.com\/\\w+", //linkregex
				null, //blocksize
				/(https?:\/\/(?:www\.)?storagon\.com\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"https://storagon.com/?op=checkfiles", //api url
				"op=checkfiles&process=Check+URLs&list=", //postdata
				/(storagon\.com\/\w+)/, //linkregex
				/storagon\.com\/\w+.*<\/td>\s*<td>Found/g, //liveregex
				/storagon\.com\/\w+.*<\/td>\s*<td>Not Found/g, //deadregex
				/storagon\.com\/\w+.*<\/td>\s*<td>Server down/g, //unavaregex
				null //function delegate
			)				
		}

		if (hostSet("Check_prefiles_dot_com_links", false))
		{	
			addHost(
				"prefiles.com", //hostname
				"prefiles\\.com\/\\w+", //linkregex
				null, //blocksize
				/(https?:\/\/(?:www\.)?prefiles\.com\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://prefiles.com/checker", //api url
				"op=checkfiles&list=", //postdata
				/(prefiles\.com\/\w+)/, //linkregex
				/prefiles\.com\/\w+.*<\/div>\s*<div class="copy" style="color:#6ab621;">/g, //liveregex
				/prefiles\.com\/\w+.*<\/div>\s*<div class="copy" style="color:#f10000;">/g, //deadregex
				null, //unavaregex
				null //function delegate
			)				
		}

		if (hostSet("Check_rapidu_dot_net_links", false))
		{	
			addHost(
				"rapidu.net", //hostname
				"rapidu\\.net\/\\d+", //linkregex
				1000000, //blocksize
				/rapidu\.net\/(\d+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://rapidu.net/api/getFileDetails/", //api url
				"id=", //postdata
				null, //linkregex
				null, //liveregex
				null, //deadregex
				null, //unavaregex
				rapiduBulkCheck //function delegate
			)				
		}

		if (hostSet("Check_uplea_dot_com_links", false))
		{	
			addHost(
				"uplea.com", //hostname
				"uplea\\.com\/dl\/\\w+", //linkregex
				1000000, //blocksize
				/(https?:\/\/(?:www\.)?uplea\.com\/dl\/\w+)/, //corrmatch
				null, //corrreplwhat
				null, //corrreplwith
				null, //separator
				"http://api.uplea.com/api/check-my-links", //api url
				null, //postdata
				null, //linkregex
				null, //liveregex
				null, //deadregex
				null, //unavaregex
				upleaBC //function delegate
			)				
		}
		
		function genBulkCheck()
		{
			var blockIdx = this.links.length;
			
			while (blockIdx--)
			{
				postRequest(this.apiUrl, this.postData, this.links[blockIdx], 
					this.resLinkRegex, this.resLiveRegex, this.resDeadRegex, this.resUnavaRegex, this.separator);			
				
			}
			
			function postRequest(api, postData, links, linkRegex, liveRegex, deadRegex, unavaRegex, sep)
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
						
						//console.log(res);
						
						if ((res.contains(">DDoS protection by CloudFlare") && res.contains(">Checking your browser before accessing<")) || res.contains('<iframe src="/_Incapsula_Resource?')) {
							DisplayTheCheckedLinks(links.split(sep), 'unknown_link');
							sendMessage('Some links require you to fill out a captcha! Please open them manually.')
						}
						
						var i;

						var livelinks = res.match(liveRegex);
						var deadlinks = res.match(deadRegex);
						
						//console.log(livelinks);
						//console.log(deadlinks);
						
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
					},
					onerror: function (e) {
						var linkArr = links.split(sep);
						DisplayTheCheckedLinks(linkArr, "unknown_link");
					}
				});
				
			}
		}
		
		//specialized bulkchecking handlers follow
		function upleaBC() {
			var json = {
				links: this.links[0].split('\r\n')
			};

			GM_xmlhttpRequest({
				method: 'POST',
				url: this.apiUrl,
				data: 'json=' + JSON.stringify(json),
				headers: {
					'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
					'Content-type': 'application/x-www-form-urlencoded',
					'Referer': 'http://uplea.com/checker',
					'X-Requested-With': 'XMLHttpRequest'						
				},
				onload: function(result) {
					var res = JSON.parse(result.responseText);
					if (res.error.length > 0) {
						var mes = 'Error in checking Uplea.com! Error message(s):';
						$.each(res.error, function(key, val) { mes += '\r\n' + val; });
						console.warn(mes); return;
					}

					var deadlinks = [], alivelinks = [], unavalinks = [];
					$.each(res.result, function(key, val) {
						if (val.status == 'OK') alivelinks.push(val.link);
						else if (val.status == 'DELETE') deadlinks.push(val.link);
						else unavalinks.push(val.link);
					});

					if (deadlinks.length > 0) DisplayTheCheckedLinks(deadlinks, 'adead_link');
					if (alivelinks.length > 0) DisplayTheCheckedLinks(alivelinks, 'alive_link');
					if (unavalinks.length > 0) DisplayTheCheckedLinks(unavalinks, 'unava_link');
				}
			});
		}

		function rapiduBulkCheck() {
			var arr = this.links[0].split('\r\n').join(',');
			GM_xmlhttpRequest({
				method: 'POST',
				url: this.apiUrl,
				data: this.postData + arr,
				headers: {
					'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
					'Content-type': 'application/x-www-form-urlencoded',
					'Referer': 'http://rapidu.net',
					'X-Requested-With': 'XMLHttpRequest'						
				},
				onload: function(result) {
					var res = JSON.parse(result.responseText);
					var deadlinks = [], alivelinks = [];
					$.each(res, function(key, value) {
						if (value.fileStatus && value.fileStatus == 1) {
							alivelinks.push(value.fileId);
						} else if (value.fileStatus && value.fileStatus == 0) {
							deadlinks.push(value.fileId);
						}
					});

					if (deadlinks.length > 0) DisplayTheCheckedLinks(deadlinks, 'adead_link');
					if (alivelinks.length > 0) DisplayTheCheckedLinks(alivelinks, 'alive_link');
				}
			});
		}

		function webshareBulkCheck()
		{
			var arr = this.links[0].split('\r\n');
			var i = arr.length;

			while(i--)
			{	
				postRequest(arr[i]);				
			}

			function postRequest(wsLink) {
				var id = wsLink.match(/webshare\.cz\/(?:(?:#\/)?file\/)?(\w+)/)[1];
				
				GM_xmlhttpRequest({
					method: 'POST',
					url: "http://webshare.cz/api/file_info/",
					headers: {
						'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
						'Content-type': 'application/x-www-form-urlencoded',
						'Referer': "",
					},
					data: "wst=&ident=" + id,
					onload: function (result) {
						var res = result.responseText;
				
						if (res.contains(/<name>.+?<\/name>/))
						{
							DisplayTheCheckedLinks([id], 'alive_link');
						}
						else
						{
							DisplayTheCheckedLinks([id], 'adead_link');
						}
					}
				});				
			}
		}
		
		function anysendBulkCheck() {
			var arr = this.links[0].split('\r\n');
			var blockIdx = arr.length;
			while (blockIdx--) {
				stepOne(arr[blockIdx]);
			}
			
			function stepOne(link) {
				GM_xmlhttpRequest({
					method: 'GET',
					url: link,
					headers: {
						'Referer': 'http://anysend.com'
					},
					onload: function(result) {
						if (result.responseText.contains('<title>Removed download \\| AnySend</title>')) {
							displayTheCheckedLink($('a:contains("' + link.match(/anysend\.com\/\w+/)[0] + '")')[0], 'adead_link');
							return;
						}
						stepTwo(result.responseText.match(/f\.src="(http:\/\/download\.anysend\.com\/download\/download\.php\?key=\w{32}(?:&aff=\w+)?&visid=)"/)[1], link);
					}
				});
			}
			
			function stepTwo(link, origLink) {
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://affiliates.anysend.com/scripts/track.php?accountId=default1&tracking=1&url=H_anysend.com%2F%2F' + origLink.match(/\.com\/(\w{32})/[1]) + '&referer=&getParams=&anchor=&isInIframe=false&cookies=',
					headers: {
						'Referer': origLink
					},
					onload: function(result) {
						var stuff = result.responseText.match(/setVisitor\('(\w+)'\)/);
						var visid = stuff ? stuff[1] : "";
						stepThree(link, visid, origLink);
					}
				});
			}
			
			function stepThree(link, visid, origLink) {
				link += visid;
				$('a:contains("' + origLink.match(/anysend\.com\/\w+/)[0] + '")').attr('name', link);
				GM_xmlhttpRequest({
					method: 'GET',
					url: link,
					headers: {
						'Referer': origLink,
						'Cookie': 'PAPVisitorId=' + visid
					},
					onload: function(result) {
						decideStatus(result.responseText, origLink);
					}
				})
			}
			
			function decideStatus(res, origLink) {
				if (res.contains('<div class="dl-file-des|<a href="javascript:void(0);" onclick="showDownloadPopupT12')) {
					displayTheCheckedLink($('a:contains("' + origLink.match(/anysend\.com\/\w+/)[0] + '")')[0], 'alive_link');
				} else if (res.contains('>Your download is no longer available')) {
					displayTheCheckedLink($('a:contains("' + origLink.match(/anysend\.com\/\w+/)[0] + '")')[0], 'adead_link');
				} else {
					displayTheCheckedLink($('a:contains("' + origLink.match(/anysend\.com\/\w+/)[0] + '")')[0], 'unknown_link');
				}
			}
		}
		
		function filecloudBulkCheck() {
			var arr = this.links[0].split(this.separator);
			var blockIdx = arr.length;
			while (blockIdx--) {
				check(arr[blockIdx]);
			}
			
			function check(ukey) {
				GM_xmlhttpRequest({
					method: 'POST',
					url: 'http://api.filecloud.io/api-check_file.api',
					headers: {
						'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
						'Content-type': 'application/x-www-form-urlencoded',
						'Referer': 'http://filecloud.io',
						'X-Requested-With': 'XMLHttpRequest'						
					},
					data: 'ukey=' + encodeURIComponent(ukey),
					onload: function(result) {
						var res = JSON.parse(result.responseText);
						if (res.status == 'ok' && res.message == 'fetched') {
							DisplayTheCheckedLinks([ukey], 'alive_link');
						} else if (res.status == 'error' && res.message == 'no such file') {
							DisplayTheCheckedLinks([ukey], 'adead_link');
						} else DisplayTheCheckedLinks([ukey], 'unknown_link');
					},
					onerror: function() {
						DisplayTheCheckedLinks([ukey], 'unknown_link');
					}
				});
			}
		}
		
		function gettBulkCheck() {
			var arr = this.links[0].split("\r\n");
			var i = arr.length;
			var params, sharename, fileid;
			while (i--) {
				params = arr[i].match(/(\w+)(?:\/v\/(\d+))?/);
				sharename = params[1], fileid = params[2] ? params[2] : 0;   
				GM_xmlhttpRequest({
					method:"GET",
					url: this.apiUrl + sharename + "/" + fileid,
					headers: {
						'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
						'Content-type': 'application/x-www-form-urlencoded',
						'Referer': this.apiUrl,
						'X-Requested-With': 'XMLHttpRequest'
					},
					onload: function(result) {
						var res = JSON.parse(result.responseText);
						if (res.readystate == "uploaded") {
							DisplayTheCheckedLinks([res.sharename], 'alive_link');
						} else if (res.readystate == "removed") {
							DisplayTheCheckedLinks([res.sharename], 'adead_link');
						} else {
							DisplayTheCheckedLinks([res.sharename], 'unknown_link');
						}
					}	
				});
			}
		}
		
		/*function extabitBulkCheck()
		{
			var blockIdx = this.links.length;
			
			while (blockIdx--)
			{
				postRequest(this.links[blockIdx]);			
				
			}
			function postRequest(links, sep)
			{
				GM_xmlhttpRequest(
				{
					method: 'POST',
					url: "http://extabit.com/linkchecker.jsp",
					headers: {
						'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
						'Content-type': 'application/x-www-form-urlencoded',
						'Referer': "http://extabit.com/linkchecker.jsp",
						'X-Requested-With': 'XMLHttpRequest'						
					},
					data: "url=" + encodeURIComponent(links),
					onload: function (result)
					{
						var res = result.responseText;
						
						if (res.contains('login_block">')) {
							GM_xmlhttpRequest({
								method: 'POST',
								url: 'http://extabit.com/login.jsp',
								headers: {
									'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
									'Content-type': 'application/x-www-form-urlencoded',
									'Referer': "http://extabit.com/linkchecker.jsp",
									'X-Requested-With': 'XMLHttpRequest'						
								},
								data: 'remember=1&email=' + encodeURIComponent(EB_LOGIN[0]) + '&pass=' + encodeURIComponent(EB_LOGIN[1]),
								onload: function (result) {
									postRequest(links, sep);
								}
							});
						} else {
							var i;

							var livelinks = res.match(/extabit.com\/(?:file\/|)\w+.*?">.*?<\/a><\/td>\s*<td class="status"><span class="status_green">OK<\/span>/g);
							var deadlinks = res.match(/extabit.com\/(?:file\/|)\w+.*?">.*?<\/a><\/td>\s*<td class="status"><span class="status_red">(?:Removed|Deleted|Hidden|Entfernt|Gelöscht|Versteckt)/g);
							var linkRegex = /extabit.com\/(?:file\/|)(\w+)/;
						
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

							var unavalinks = res.match(/extabit.com\/(?:file\/|)\w+.*?">.*?<\/a><\/td>\s*<td class="status"><span class="status_(?:red">(?:Unavailable|Unerreichbar)<\/span>|yellow">)/g)
							if (unavalinks)
							{
								i = unavalinks.length - 1;
								do
								{
									unavalinks[i] = unavalinks[i].match(linkRegex)[1];
								}
								while (i--);
								recheck(unavalinks);
								//DisplayTheCheckedLinks(unavalinks, 'unava_link');
							}
						}
					}
				});
				
			}
			
			function recheck(links) {
				var i = links.length;
				while (i--) {
					geturl(
					$("a:contains('extabit.com/file/" + links[i] + "')")[0],
					'<a class="btn-download-free"',
					'page_404_header|div id="mirr"',
					'is temporary unavailable|disponible en estos momentos|vorläufig unerreichbar|Файл временно недоступен',
					true);
				}
			}
		}*/
		
		function uploadingBulkCheck()
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

						var i;

						var livelinks = res.match(liveRegex);
						var deadlinks = res.match(deadRegex);
						var allLinks = links.split("\r\n");
						for(i=0;i<allLinks.length;i++) {
							allLinks[i] = allLinks[i].match(/uploading\.com\/(?:files\/|\w+\/\?get=)?(\w+)/)[1];
						}
						
						if (livelinks != null)
						{
							i = livelinks.length - 1;
							do
							{
								livelinks[i] = livelinks[i].match(linkRegex)[1].toLowerCase();
								livelinks.push(livelinks[i].toUpperCase());
								allLinks.splice($.inArray(livelinks[i], allLinks), 1);
							}
							while (i--);
							DisplayTheCheckedLinks(livelinks, 'alive_link');
						}

						if (deadlinks != null)
						{
							i = deadlinks.length - 1;
							do
							{
								deadlinks[i] = deadlinks[i].match(linkRegex)[1].toLowerCase();
								deadlinks.push(deadlinks[i].toUpperCase());
								allLinks.splice($.inArray(deadlinks[i], allLinks), 1);
							}
							while (i--);
							DisplayTheCheckedLinks(deadlinks, 'adead_link');
						}
						
						if (allLinks.length > 0)
						{
							i = allLinks.length - 1;
							do
							{
								websiteCheck(allLinks[i]);
							}
							while (i--);
						}
					}
				});
				
			}
			
			function websiteCheck(link) {
				var realLink = "http://uploading.com/files/" + link;
				GM_xmlhttpRequest({
					method: 'GET',
					url: realLink,
					headers: {
						'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
						'Content-type': 'application/x-www-form-urlencoded',
						'Referer': realLink,
						'X-Requested-With': 'XMLHttpRequest'						
					},
					onload: function (result) {
						if (result.status == 503) websiteCheck(link);
						res = result.responseText;
						if (res.contains('file_error">|error_404">')) {
							DisplayTheCheckedLinks([link], 'adead_link');
						}
						else if (res.contains('free_method">')) {
							DisplayTheCheckedLinks([link], 'alive_link');
						}
					}
				});
			}
		}
		
		function dateiToBulk()
		{
			var arr = this.links[0].split("\r\n");
			var data = "key=YYMHGBR9SFQA0ZWA&info=STATUS&datei=";
			var i = arr.length;
			
			while(i--)
			{
				var token = arr[i].match(/\.to\/(?:datei\/|files\/|1,|\?)(\w+)/)[1];
				postRequest(token);
			}
			
			function postRequest(token) {
				data += token;
				GM_xmlhttpRequest({
					method:"POST",
					url:"http://api.datei.to/",
					data:data,
					headers: {
						'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
						'Content-type': 'application/x-www-form-urlencoded',
						'Referer': ""
					},
					onload: function(result) {
						var res = result.responseText;
						if (res.contains('offline')) {
							DisplayTheCheckedLinks([token],'adead_link');
						}
						else if (res.contains('online')) {
							DisplayTheCheckedLinks([token], 'alive_link');
						}
					}
				});
			}
		}
		
		function uploadedBulkCheck()
		{
			var t = this.links.length;
			while (t--) {
				var arr = this.links[t].split("\r\n");
				var data = "apikey=lhF2IeeprweDfu9ccWlxXVVypA5nA3EL";
			
				for (var i=0;i<arr.length;i++)
				{
					try {
						arr[i] = arr[i].match(/(?:uploaded|ul)\.(?:to|net)\/(?:files?|\?(?:lang=\w{2}&)?id=|f\/|folder)?\/*(?!img\/|coupon\/)(\w{8})/)[1];
					} catch (e) {
						console.warn("Error in checking Uploaded: " + arr[i]);
						DisplayTheCheckedLinks([arr[i]], "unknown_link");
					}
					data += "&id_"+i+"="+arr[i]; 
				}
			
				GM_xmlhttpRequest(
					{
						method: "POST",
						url: "https://uploaded.net/api/filemultiple",
						data: data,
						headers: {
							'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)',
							'Content-type': 'application/x-www-form-urlencoded',
							'Referer': ""
						},
						onload: function (result)
						{
							var res = result.responseText;

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
		}
		
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
						'Referer': "https://mega.co.nz/"
					},
					onload: function (result)
					{
						var res = $.parseJSON(result.responseText.match(/\[(.+?)\]/)[1]);
						
						if ((typeof res == "number" && (res == -9 || res == -16 || res == -6)) || res.d) {
							DisplayTheCheckedLinks([id], 'adead_link');
						} else if (res.e == "ETEMPUNAVAIL") {
							DisplayTheCheckedLinks([id], 'unava_link');
						} else if (res.at) {
							DisplayTheCheckedLinks([id], 'alive_link');
						} else {
							console.warn("Error in checking Mega.co.nz! Please notify devs.\r\nError code: " + result.responseText);
						}
					}
				});
			}
		}
		
		
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
						
						//console.log(res);
						
						if (res.contains('<title>403 - Forbidden</title>')){
							postRequest(api, postData, links, linkRegex, liveRegex, deadRegex, unavaRegex);
						}
						
						var i;

						var livelinks = res.match(liveRegex);
						var deadlinks = res.match(deadRegex);
						
						//console.log(livelinks);
						//console.log(deadlinks);
						
						if (livelinks != null)
						{
							i = livelinks.length - 1;
							do
							{
								recheckLink(livelinks[i].match(linkRegex)[1]);
								//livelinks[i] = livelinks[i].match(linkRegex)[1];
							}
							while(i--);
							//DisplayTheCheckedLinks(livelinks, "alive_link");
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

						if (res.contains('dl_first_file_download">|download_limit.gif'))
						{
							DisplayTheCheckedLinks([link], 'alive_link');
							return;
						}

						if (res.contains('achtung.jpg"'))
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
				var x = LinksTodo.length;
				while (x--)
				{
					var eintrag = LinksTodo[x];
					var logregex;
					if (eintrag.contains('/share/')) {
						rapidshareShareLinkCheck(eintrag);
						continue;
					}
					else if (eintrag.contains('#!download')) {
						logregex = /#!download\|\w+\|(\d+)\|(.*?)\|/;
					} else {
						logregex = /files\/(\d{5,})\/(\S*)/;
					}
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
						var fileRegex = /\d{5,},(.*?),\d+/;

						var livelinks = res.match(/\d{5,},.*?,\d+,\w*,(?:1|3|51),/g);
						var deadlinks = res.match(/\d{5,},.*?,\d+,\w*,(?:0|4|5|59),/g)
						var invalidID = res.match(/ERROR: Files invalid\. \(1dd3841d\)/);
						
						if (invalidID)
						{
							var IDArray = fileids.split(",");
							var nameArray = filenames.split(",");
							
							if (IDArray.length == nameArray.length) {
								i = IDArray.length - 1;
								do
								{
									recheckLink(IDArray[i], nameArray[i]);
								}
								while (i--);
							}
						}
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
							var names = [];
							i = livelinks.length - 1;
							do
							{
								names[i] = livelinks[i].match(fileRegex)[1];
								livelinks[i] = livelinks[i].match(rsRegex)[1];
								recheckLink(livelinks[i], names[i]);
							}
							while (i--);
							
							//DisplayTheCheckedLinks(livelinks, 'alive_link');
						}
					}
				});
			}
			while (rsBlock--);
			
			function recheckLink(link, file)
			{
				url = "https://rapidshare.com/files/" + link + "/" + file;
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: url,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
						'Accept-Charset': 'windows-1250,utf-8;q=0.7,*;q=0.7',
						'Referer': ""
					},
					onload: function (result)
					{
						var res = result.responseText;

						if (res.contains(/ERROR: (?:Download permission denied by uploader\. \(0b67c2f5\)|This file can't be downloaded, because it has been deleted by the owner\. \(30e16ccf\)|File ID invalid\. \(1b3bfd9e\)|File not found\. \(e029a7af\))/))
						{
							DisplayTheCheckedLinks([link], 'adead_link');
							return;
						} else {
							DisplayTheCheckedLinks([link], 'alive_link');
						}
					},
					onerror: function ()
					{
						displayTheCheckedLink(link, 'unava_link');
					}
				});
			}
		}
		
		function rapidshareShareLinkCheck(sharelink) {
			var shareId = sharelink.match(/\/share\/(\w+)/)[1];
			postRequest(shareId);
			
			function postRequest(shareId) {
				var date = new Date();
				
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'https://api.rapidshare.com/cgi-bin/rsapi.cgi?rsource=web&sub=sharelinkcontent&share=' + shareId + '&cbid=1&cbf=rsapi.system.jsonp.callback&callt=' + date.getTime(),
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'text/xml',
						'Referer': ""
					},
					onload: function(result) {
						var res = result.responseText;
				
						if (res.contains(/\\nfile:/)) {
							$("a:contains('/share/" + shareId + "')").after("<p>This share link is a folder!</p>");
							DisplayTheCheckedLinks(["/share/" + shareId], "unknown_link");
							sendMessage("This topic contains a Rapidshare folder link!");
						} else if (res.contains('1,"NONE"') || res.contains('1,"ERROR: Share not found')) {
							DisplayTheCheckedLinks(["/share/" + shareId], "adead_link");
						} else {
							DisplayTheCheckedLinks(["/share/" + shareId], "alive_link"); //assume link is live as RS removes dead files from shares
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
				var id = dfLink.match(/(?:depositfiles\.(?:com|lt|org)|dfiles\.(?:eu|ru))\/(?:en\/|ru\/|de\/|es\/|pt\/|)files\/(\w+)/)[1];

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
						//console.log(res);
						
						if (res == "") {
							postRequest(dfLink);
						}
						
						if (res.contains('no_file'))
						{
							DisplayTheCheckedLinks(["files/" + id], 'adead_link');
							return;
						}
						
						if (res.contains('file_ban')) {
							DisplayTheCheckedLinks(["files/" + id], 'unknown_link');
							return;
						}

						if (res.contains(/download_li(?:nk|mit)|password_check|file_storage/))
						{
							DisplayTheCheckedLinks(["files/" + id], 'alive_link');
						}
					}
				});
			}
		}
	}

	function initFileHosts()
	{
		var aOHCount = "1";
		function addObsoleteHost(hostName, linkRegex)
		{
			hostName = hostName.split("|");
			var i = hostName.length;
			
			var hostID = "OH" + aOHCount;
			
			while(i--) {
				var filehost = gimmeHostName(hostName[i]).replace(/\./g, "_dot_").replace(/\-/g, "_dash_");
				if (!hostsIDs[filehost]) {
					hostsIDs[filehost] = [];
				}
				hostsIDs[filehost].push({
					hostID: hostID,
					linkRegex: linkRegex,
				});
			}
			
			var OHObj = {
				links: []
			}
			
			hostsCheck[hostID] = OHObj;
			aOHCount++;	
		}

		//obsolete file hosts init start
		if (hostSet("Obsolete_file_hosts", false))
		{
			addObsoleteHost("superfastfile.com", "superfastfile\\.com\/\\w+");
			addObsoleteHost("uploadlab.com", "files\\.uploadlab\\.com\/\\w+");
			addObsoleteHost("zupload.com", "z\\d+\\.zupload\\.com\/\\w+");
			addObsoleteHost("enterupload.com|flyupload.com", "(?:flyupload\\.)?(?:enterupload|flyupload)\\.com\/");
			addObsoleteHost("filesdump.com", "(?:s\\d+\\.|)filesdump\\.com\/file\/\\w+");
			addObsoleteHost("speedie-host.com", "uploads\\.speedie\\-host\\.com\/\\w+");
			addObsoleteHost("turboupload.com", "(?:d\\.|)turboupload\\.com\/\\w+");
			addObsoleteHost("share2u.net", "dl\\.share2u\\.net\/\\w+");
			addObsoleteHost("filestock.net|filestock.ru", "(?:download\\.)?filestock\\.(?:net|ru)\/\\w+");
			addObsoleteHost("ex.ua", "(?:fs\\d{1,2}\\.)?(?:www\\.|)ex\\.ua\/\\w+");
			addObsoleteHost("omxira.com", "(?:get\\.|)omxira\\.com\/\\w+");
			addObsoleteHost("uploadtornado.com", "(?:\\w{2}\\.)uploadtornado\\.com\/\\w+");
			addObsoleteHost("bgdox.com", "(?:turbo\\.)?bgdox\\.com\/\\w+");
			addObsoleteHost("fshare.eu", "www\\d?\\.fshare\\.eu\/\\w+");
			var i = allObsoleteNames.length;
			while(i--)
			{
				addObsoleteHost(
					allObsoleteNames[i],
					"https?:\/\/(?:[a-zA-Z0-9-]+\\.)?(?:" + allObsoleteNames[i].replace(/\./g, "\\.").replace(/\-/g, "\\-") + ")\/"
				);
			}

			if (WBB_MODE) {
				var x = wbbCensoredHosts.length;
				while (x--) {
					addObsoleteHost(
						wbbCensoredHosts[x],
						"https?:\/\/(?:[a-zA-Z0-9-]+\\.)?(?:" + wbbCensoredHosts[x].replace(/\./g, "\\.").replace(/\-/g, "\\-") + ")\/"
					);
				}
				addObsoleteHost("hellshare.com|hellshare.sk|hellshare.pl|hellshare.cz|hellshare.hu","(?:|download\\.(?:\\w{2}\\.|)|www\\.)hellshare\\.(?:\\w{2,3})\/[\\w-\\.]+");
			}
		}
		//obsolete file hosts init end
		var aFHCount = 1;
		function addFileHost(hostName, linkRegex, isAliveRegex, isDeadRegex, isUnavaRegex, tryLoop)
		{
			hostName = hostName.split("|");
			var i = hostName.length;
			
			var hostID = "WC" + aFHCount;
			
			while(i--) {
				var filehost = hostName[i].replace(/\./g, "_dot_").replace(/\-/g, "_dash_");

				if (!hostsIDs[filehost]) {
					hostsIDs[filehost] = [];
				}
				hostsIDs[filehost].push({
					hostID: hostID,
					linkRegex: linkRegex,
				});
			}
			
			var WCObj = {
				liveRegex: isAliveRegex,
				deadRegex: isDeadRegex,
				unavaRegex: isUnavaRegex,
				tryLoop: false,
				links: []
			}
			
			if (tryLoop) WCObj.tryLoop = true;
			
			hostsCheck[hostID] = WCObj;
			aFHCount++;
		}
		
		var genericWC = [	"filesbowl.com", "freakbit.net", "upfile.vn", "upbooth.com", "fileshareup.com", "rabidfiles.com", "upsharez.com", "host4files.com",
							"weshare.me"];
							
		var XFSPWC = 	[ 	"fileplanet.com.ua|fileplaneta.com", "hipfile.com", "xvidstage.com", "midupload.com", "ex-load.com", "davvas.com", "share.az",
							"interfile.net", "medofire.com", "downloadani.me", "uptobox.com", "uppit.com", "filenuke.com", "vreer.com", "billionuploads.com",
							"fcore.eu", "1000shared.com"];
		
		var gWC = genericWC.length;
		while(gWC--) {
			if (hostSet("Check_" + genericWC[gWC].replace(/\./g, "_dot_").replace(/\-/g, "_dash_") + "_links", false))
			{
				addFileHost(
					genericWC[gWC],	
					genericWC[gWC].replace(/\./g, "\\.").replace(/\-/g, "\\-") + "\/\\w+",
					/<div class="(?:download|captcha)PageTable"|<a class="link btn-free"/,
					/<li>File (?:has been removed|not found)|<div id="uploaderContainer"/,
					'optional--'
				);
			}
		}
		
		var xWC = XFSPWC.length;
		while (xWC--) {
			if (hostSet("Check_" + XFSPWC[xWC].match(/[\w\.\-]+/)[0].replace(/\./g, "_dot_").replace(/\-/g, "_dash_") + "_links", false))
			{
				addFileHost(
				XFSPWC[xWC],	
				"(?:" + XFSPWC[xWC].replace(/\./g, "\\.").replace(/\-/g, "\\-") + ")\/\\w+",
				'name="method_free"|id="btn_download"|value="Free Download"',
				/>(?:File not found|The file was removed by administrator|Datei nicht gefunden|No such file)\s*<|<div id="div_file" class="upload_block">/i,
				'>This server is in maintenance mode',
				true);
			}
		}

		if (hostSet("Check_megafileupload_dot_com_links", false))
		{
			addFileHost(
			"megafileupload.com",
			"megafileupload\.com\/..\/file\/",
			'downloadbtn',
			'is not found',
			'optional--');
		}

		if (hostSet("Check_safelinking_dot_net_links", false))
		{
			addFileHost(
			'safelinking.net',	
			"safelinking\\.net\/p\/\\w{10}",
			'color:green;"',
			'color:red;"|<p>This link does not exist.',
			'optional--',
			true);
		}

		if (hostSet("Check_ultramegabit_dot_com_links", false))
		{
			addFileHost(
			"ultramegabit.com",
			"ultramegabit\\.com\/file\/details\/[\\w+-]",
			'>Your download is ready<',
			/>File (?:not found|restricted|has been deleted(?:\.| in compliance with the DMCA))<|\/folder\/add/,
			'btn-large btn-danger">|Account limitation notice|>File not available.<|>This download server is overloaded<',
			true);
		}
		
		if (hostSet("Check_fastshare_dot_cz_links", false))
		{
			addFileHost(
			"fastshare.cz",
			"fastshare\\.cz\/\\d+\/\\w*",
			'dwntable">',
			'nebyla nalezena|nebola nájdená|nie została odnaleziona|color:red;font-weight:bold;border-style:dashed|<b>Requested page not found.',
			'optional--');
		}
		
		if (hostSet("Check_fastshare_dot_org_links", false))
		{
			addFileHost(
			"fastshare.org|FastShare.org",
			"[fF]ast[sS]hare\\.org\/download",
			'Download ">',
			'Diese Datei wurde wegen|wurde kein Dateiname',
			'optional--');
		}

		if (hostSet("Check_partage_dash_facile_dot_com_links", false))
		{
			addFileHost(
			"partage-facile.com",
			"partage-facile\.com\/\\w+",
			'/dl-view.php"',
			'Erreur 404|equiv="refresh',
			'optional--');
		}
		
		if (hostSet("Check_1fichier_dot_com_links", false))
		{
			addFileHost(
			"1fichier.com|dl4free.com",
			"\\w+\\.(?:1fichier|dl4free)\\.com\/?",
			'Download tag"|countdown">|class="form-button"',
			'errorDiv"|File not found|Fichier introuvable',
			'optional--');
		}
		
		/*if (hostSet("Check_rapidgator_dot_net_links", false))
		{
			addFileHost(
			"rapidgator.net|rg.to",
			"(?:rapidgator\\.net|rg.to)\/file\/\\w+",
			'btm" style="height: \\d+px;">\\s*<p',
			'btm" style="height: \\d+px;">\\s*<\/div',
			'optional--',
			true
			);
		}*/

		if (hostSet("Check_relink_dot_us_links", false))
		{
			addFileHost(
			"relink.us",
			"relink\\.us\/(?:f\/\\w+|go\\.php\\?id=\\d+|view\\.php\\?id=\\d+)",
			'online_detail.png" alt="Status',
			/(?:offline|partially)_detail\.png" alt="Status|File deleted/,
			'unknown_detail.png" alt="Status'
			);
		}
		
		if (hostSet("Check_flyfiles_dot_net_links", false))
		{
			addFileHost(
			"flyfiles.net",
			"flyfiles\\.net\/\\w+",
			'download_button"|"Download file"',
			'File not found!|Файл не найден',
			'optional--'
			);
		}
		
		if (hostSet("Check_wikiupload_dot_com_links", false))
		{
			addFileHost(
			"wikiupload.com",
			"wikiupload\\.com\/\\w+",
			'download-button">',
			'Sorry, File not found|theme-container">',
			'optional--'
			);
		}
		
		if (hostSet("Check_hostuje_dot_net_links", false))
		{
			addFileHost(
			"hostuje.net",	
			"hostuje\\.net\/file\\.php\\?id=\\w+",
			'file.php">|Pobierz Plik',
			'Podany plik zosta. skasowany z powodu naruszania praw autorskich...|Podany plik nie zosta. odnaleziony...',
			'optional--'
			);
		}
		
		if (hostSet("Check_4fastfile_dot_com_links", false))
		{
			addFileHost(
			"4fastfile.com",	
			"4fastfile\\.com\/abv-fs\/\\d+",
			'file-download">',
			'v><div id="block',
			'optional--'
			);
		}
		
		if (hostSet("Check_slingfile_dot_com_links", false))
		{
			addFileHost(
			"slingfile.com",	
			"slingfile\\.com\/(?:dl|file|video)\/\\w+",
			'fileinfo">',
			'errorbox">|<a id="ubutton" class="btn-guest',
			'optional--'
			);
		}

		if (hostSet("Check_tufiles_dot_ru_links", false))
		{
			addFileHost(
			"tufiles.ru|turbob1t.ru|filesmail.ru|failookmenik.ru|firebit.in|dlbit.net|china-gsm.ru|3aka4aem.ru|turbo-bit.ru|turbosfiles.ru|piratski.ru|mnogofiles.com|links-free.ru",	
			"(?:tufiles|turbob1t|failoobmenik|filesmail|firebit|dlbit|files\\.china\\-gsm|3aka4aem|file\\.piratski|mnogofiles|links-free|turbo-bit|turbosfiles)\\.\\w+\/\\w+",
			'download-file">',
			/col-1">\s*<h1>/,
			'optional--'
			);
		}

		if (hostSet("Check_data_dot_hu_links", false))
		{
			addFileHost(
			"data.hu",	
			"data\\.hu\/get\/\\d+\/",
			'download_box_button',
			'missing.php',
			'optional--',
			true
			);
		}
		
		if (hostSet("Check_filesmelt_dot_com_links", false))
		{
			addFileHost(
			"filesmelt.com",	
			"filesmelt\\.com\/dl\/\\w+",
			'ready">',
			'Sorry, but your',
			'optional--'
			);
		}
		
		if (hostSet("Check_packupload_dot_com_links", false))
		{
			addFileHost(
			"packupload.com",	
			"(?:\\w{2}\\.)?packupload\\.com\/\\w+",
			'buttonDelay"',
			'bold; color: #ff0000',
			'optional--'
			);
		}
		
		if (hostSet("Check_files_dot_indowebster_dot_com_links", false))
		{
			addFileHost(
			"indowebster.com",	
			"files\\.indowebster\\.com\/download\/\\w+\/",
			'premiumBtn"',
			'errorMessage"',
			'optional--'
			);
		}
		
		if (hostSet("Check_superload_dot_cz_links", false))
		{
			addFileHost(
			"superload.cz",	
			"superload\\.cz\/dl\/\\w+",
			'icon-download">',
			'soubor nebyl nalezen',
			'optional--'
			);
		}
		
		if (hostSet("Check_easybytez_dot_com_links", false))
		{
			addFileHost(
			"easybytez.com",	
			"easybytez\\.com\/\\w+",
			'op" value="download',
			'/stop_error.gif|#FF0000"><h3>Download not available',
			'optional--'
			);
		}
		
		if (hostSet("Check_filestore_dot_com_dot_ua_links", false))
		{
			addFileHost(
			"filestore.com",	
			"filestore\\.com\\.ua\/\\?d=\\w+",
			'tdrow1>',
			'class=warn',
			'optional--'
			);
		}
		
		if (hostSet("Check_netkups_dot_com_links", false))
		{
			addFileHost(
			"netkups.com",	
			"netkups\\.com\/\\?d=\\w+",
			'<form method="post"',
			'<div align="center">|>File not found',
			'optional--'
			);
		}

		if (hostSet("Check_extmatrix_dot_com_links", false))
		{
			addFileHost(
			"extmatrix.com",	
			"extmatrix\\.com\/files\/\\w+",
			'div class="success"',
			'div class="error"',
			'optional--'
			);
		}
		
		if (hostSet("Check_sendfiles_dot_nl_links", false))
		{
			addFileHost(
			"sendfiles.nl",	
			"sendfiles\\.nl\/download.aspx\\?ID=\\w+",
			'content_lnkDownload',
			'error.aspx?',
			'optional--'
			);
		}
		
		if (hostSet("Check_sockshare_dot_com_links", false))
		{
			addFileHost(
			"sockshare.com",	
			"sockshare\\.com\/file\/\\w+",
			'choose_speed">',
			'message t_0\'>|Welcome to SockShare</h1>',
			'optional--'
			);
		}
		
		if (hostSet("Check_yourfilestore_dot_com_links", false))
		{
			addFileHost(
			"yourfilestore.com",	
			"yourfilestore\\.com\/download\/\\d+\/",
			'download_data">',
			'may have been deleted|<h1>Sorry!</h1>',
			'optional--'
			);
		}
		
		if (hostSet("Check_nekaka_dot_com_links", false))
		{
			addFileHost(
			"nekaka.com",	
			"nekaka\\.com\/d\/[\\w-]+",
			'<b>Please Wait <span id="waittime">',
			/invalid file link|<p>\s*File has been blocked/,
			'optional--'
			);
		}
		
		if (hostSet("Check_filebig_dot_net_links", false))
		{
			addFileHost(
			"filebig.net",	
			"filebig\\.net\/files\/\\w+",
			'downloadFile">',
			'<p>File not found</p>',
			'optional--'
			);
		}

		if (hostSet("Check_filefront_dot_com_links", false))
		{
			addFileHost(
			"filefront.com|gamefront.com",	
			"(?:files\\.|\\w+\\.|)(?:file|game)front\\.com\/\\w+",
			'downloadLink">|class="downloadNow"|<strong>Download',
			/File not found, you|(?:File|Page) Not Found/,
			'unavailable at the moment'
			);
		}
		
		if (hostSet("Check_free_dash_uploading_dot_com_links", false))
		{
			addFileHost(
			"free-uploading.com",	
			"free\\-uploading\\.com\/\\w+",
			'op" value="download',
			'class="err">|width:500px;text-align:left;">',
			'optional--'
			);
		}
		
		if (hostSet("Check_filesin_dot_com_links", false))
		{
			addFileHost(
			"filesin.com",	
			"filesin\\.com\/\\w+",
			'download_area">',
			'error_note">',
			'optional--',
			true
			);
		}
		
		if (hostSet("Check_nowdownload_dot_eu_links", false))
		{
			addFileHost(
			"nowdownload.eu|nowdownload.ch|nowdownload.co",	
			"nowdownload\\.(?:eu|ch|co)\/dl\/\\w+",
			'alert-success"',
			'This file does not exist!',
			'The file is being transfered'
			);
		}
		
		if (hostSet("Check_axifile_dot_com_links", false))
		{
			addFileHost(
			"axfile.com",	
			"axifile\\.com(?:\/\w(2))?\/\\??\\w+",
			'Dbutton_big"',
			'download-error.php',
			'optional--'
			);
		}
		
		if (hostSet("Check_asfile_dot_com_links", false))
		{
			addFileHost(
			"asfile.com",	
			"asfile\\.com\/file\/\\w+",
			'link_line">',
			/Page not found|(?:deleted|is not exist|gelöscht)<\/strong>/,
			'optional--'
			);
		}
		
		//do not use checkfiles.html bulk check, not working properly for all links
		if (hostSet("Check_hulkshare_dot_com_links", false))
		{
			addFileHost(
			"hulkshare.com|hu.lk",	
			"(?:hulkshare\\.com|hu\\.lk)\/\\w+",
			'download.sam.png|bigDownloadBtn basicDownload|halfTop">',
			'File does not exist|fingerprint protected copyright|disabled for public access|File no longer available!|This is a private file',
			'optional--'
			);
		}
		
		if (hostSet("Check_hulkfile_dot_eu_links", false))
		{
			addFileHost(
			"hulkfile.eu|duckfile.net",	
			"(?:hulkfile\\.eu|duckfile\\.net)\/\\w+",
			'op" value="download',
			/class="err">|width:500px;text-align:left;">|window.location = "http:\/\/(?:hulkfile.eu|duckfile.net)\/\w+.html|>This file is not found/,
			'optional--'
			);
		}

		if (hostSet("Check_movshare_dot_net_links", false))
		{
			addFileHost(
			"movshare.net",	
			"movshare\\.net\/\\w+",
			'videoPlayer"',
			'no longer exists',
			'optional--'
			);
		}
		
		if (hostSet("Check_mafiastorage_dot_com_links", false))
		{
			addFileHost(
			"mafiastorage.com",	
			"mafiastorage\\.com\/\\w+",
			'op" value="download',
			'class="err">|style="width:500px;text-align:left;"',
			'optional--'
			);
		}

		if (hostSet("Check_uploadspace_dot_pl_links", false))
		{
			addFileHost(
			"uploadspace.pl",	
			"uploadspace\.pl\/plik\\w+",
			/Downloading .+? \|/,
			'Downloading a file',
			'optional--'
			);
		}
		
		if (hostSet("Check_uploadingit_dot_com_links", false))
		{
			addFileHost(
			"uploadingit.com",	
			"uploadingit\\.com\/(?:file|d)\/\\w+",
			'downloadTitle">',
			'deleteContent">',
			'optional--'
			);
		}
		
		if (hostSet("Check_stiahni_dot_si_links", false))
		{
			addFileHost(
			"stiahni.si",	
			"stiahni\\.si\/(?:download\\.php\\?id=|file\/)\\d+",
			'button-download-symbol">',
			'exclamation.png|The file not found">|file you are trying to download has been deleted',
			'optional--'
			);
		}

		if (hostSet("Check_rapidshare_dot_ru_links", false))
		{
			addFileHost(
			"rapidshare.ru",	
			"rapidshare\\.ru\/\\d+",
			'Вы хотите скачать файл:',
			'Ошибка: Файл был',
			'optional--'
			);
		}

		if (hostSet("Check_rghost_dot_net_links", false))
		{
			addFileHost(
			"rghost.net|rghost.ru",	
			"rghost\.(?:net|ru)\/(?:|private\/)\\d+",
			'download_link|btn large download"',
			'file is restricted|File is deleted|503 Service Unavailable',
			'File was deleted'
			);
		}

		if (hostSet("Check_xdisk_dot_cz_links", false))
		{
			addFileHost(
			"xdisk.cz",	
			"xdisk\\.cz\/(?:..\/)?download\\.php\\?id=\\w+",
			/">Staženo:\\s*<\/span>/,
			'Soubor, který hledáte nenalezen',
			'optional--'
			);
		}

		if (hostSet("Check_videozer_dot_com_links", false))
		{
			addFileHost(
			"videozer.com",	
			"videozer\\.com\/video\/\\w+",
			'video_player"',
			'error_404"',
			'optional--'
			);
		}

		if (hostSet("Check_divxden_dot_com_links", false))
		{
			addFileHost(
			"divxden.com|vidbux.com",	
			"(?:divxden|vidbux)\.com\/\\w+",
			'Continue to Video"',
			'No such file',
			'optional--'
			);
		}

		if (hostSet("Check_daten_dash_hoster_dot_de_links", false))
		{
			addFileHost(
			"daten-hoster.de|filehosting.org|filehosting.at",	
			"(?:daten-hoster\\.de|filehosting\\.(?:org|at))\/file\/\\w+",
			'<table class="table table-bordered',
			'<div class="alert alert-error',
			'optional--'
			);
		}

		if (hostSet("Check_fileflyer_dot_com_links", false))
		{
			addFileHost(
			"fileflyer.com",	
			"fileflyer\.com\/view\/\\w+",
			'dwlbtn"',
			'error.gif"|link">Removed|removedlink">|lockedbtn">|unlockdiv">',
			'optional--'
			);
		}

		if (hostSet("Check_filestore_dot_to_links", false))
		{
			addFileHost(
			"filestore.to",	
			"filestore\.to\/\\?d=\\w+",
			'"downloading"',
			'Datei wurde nicht gefunden',
			'optional--'
			);
		}

		if (hostSet("Check_easy_dash_share_dot_com_links", false))
		{
			addFileHost(
			"crocko.com|easy-share.com",	
			"(?:w\\d*\.|)(?:crocko|easy-share)\\.com\/\\w+",
			'fz24">Download|td class="first">',
			'msg-err"|the page you\'re looking for|1>400 Bad Request<|No files in this folder|search_result">|<span class="status">Searching for file',
			'optional--'
			);
		}

		if (hostSet("Check_burnupload_dot_com_links", false))
		{
			addFileHost(
			"burnupload.com|ihiphop.com",	
			"burnupload\\.(?:com\/\\?d=|ihiphop\\.com\/download\\.php\\?id=)\\w+",
			'File size:',
			'file is not found',
			'optional--'
			);
		}

		if (hostSet("Check_yunfile_dot_com_links", false))
		{
			addFileHost(
			"yunfile.com|filemarkets.com|yfdisk.com",	
			"(?:\\w+\\.)?(?:yunfile|filemarkets|yfdisk)\\.com\/f(?:ile|s)\/\\w+",
			/<h2 class="title">.+?&nbsp;&nbsp;.+?<\/h2>/,
			/<h2 class="title">.+?&nbsp;&nbsp;<\/h2>|Been deleted|> Access denied/,
			'optional--'
			);
		}
		
		if (hostSet("Check_putlocker_dot_com_links", false))
		{
			addFileHost(
			"putlocker.com|firedrive.com",	
			"(?:putlocker|firedrive)\\.com\/file\/\\w+",
			'<a class="continue" onclick="$(\'#confirm_form\').submit();|id=\'external_download\' title=\'Download This File\'>Download</a>|class="external_download_button"> Download</a>',
			'<title>File Does Not Exist|<div class="removed_file_image">|<div class="private_file_image">',
			'undergoing scheduled maintenance'
			);
		}
		
		if (hostSet("Check_luckyshare_dot_net_links", false))
		{
			addFileHost(
			"luckyshare.net",	
			"luckyshare\\.net\/\\d+",
			'class=\'file_name\'>',
			'no such file available',
			'optional--',
			true);
		}
		
		if (hostSet("Check_uploadhero_dot_com_links", false))
		{
			addFileHost(
			"uploadhero.com|uploadhero.co",	
			"uploadhero\\.com?\/dl\/\\w+",
			'content-dl">',
			'men_file_lost.jpg"',
			'optional--'
			);
		}

		if (hostSet("Check_load_dot_to_links", false))
		{
			addFileHost(
			"load.to",	
			'(?:www\\.|\/)load\\.to\/(?:|\\?d\\=)\\w+',
			'"download_table_left">Size|<input class="input-button" type="submit" value="Download"',
			'Can\'t find file',
			'optional--'
			);
		}

		if (hostSet("Check_files_dot_to_links", false))
		{
			addFileHost(
			"files.to",	
			"files\.to\/get\/\\d+\/",
			'You requested the following',
			'requested file couldn|This download link is invalide.',
			'optional--'
			);
		}

		if (hostSet("Check_divshare_dot_com_links", false))
		{
			addFileHost(
			"divshare.com",	
			"divshare\\.com\/download\/",
			'download_new.png',
			'have been removed',
			'optional--'
			);
		}
		
		if (hostSet("Check_stahovadlo_dot_cz_links", false))
		{
			addFileHost(
			"stahovadlo.cz",	
			"stahovadlo\\.cz\/soubor\/\\d+\/[\\.\\w]+",
			'download" type="submit',
			'Neplatný nebo neúplný odkaz|Soubor již není dostupný',
			'optional--',
			true
			);
		}
		
		if (hostSet("Check_euroshare_dot_eu_links", false))
		{
			addFileHost(
			"euroshare.eu|euroshare.pl|euroshare.sk|euroshare.cz|euroshare.hu",	
			"euroshare\\.(?:eu|pl|sk|cz|hu)\/file\/\\d+",
			'nazev-souboru">',
			/<div id="obsah">\\s*<h1>/,
			'optional--'
			);
		}
		
		if (hostSet("Check_datafilehost_dot_com_links", false))
		{
			addFileHost(
			"datafilehost.com",	
			"datafilehost\\.com\/(?:download-\\w+\\.html|d\/\\w+)",
			'dldtable">',
			'does not exist.',
			'optional--'
			);
		}

		if (hostSet("Check_files_dot_mail_dot_ru_links", false))
		{
			addFileHost(
			"mail.ru",	
			'files\\.mail\\.ru/(?:\\w*)',
			'fileList',
			'errorMessage|error">',
			'optional--'
			);
		}

		if (hostSet("Check_narod_dot_ru_links", false))
		{
			addFileHost(
			"narod.ru|yandex.ru",	
			'narod\\.(?:yandex\\.|)ru\/disk\/',
			'<a id="b-submit"',
			'<p class="b-download-virus-note"|headCode">404<',
			'Внутренняя ошибка сервиса'
			);
		}

		if (hostSet("Check_rayfile_dot_com_links", false))
		{
			addFileHost(
			"rayfile.com",	
			"rayfile\\.com\/",
			'FILEtitleTXT',
			'blueRow',
			'optional--'
			);
		}
		
		if (hostSet("Check_filesmonster_dot_com_links", false))
		{
			addFileHost(
			"filesmonster.com",	
			"filesmonster\\.com\/download\\.php\\?id=\\w+",
			'button_green_body"',
			'error">',
			'optional--'
			);
		}
		
		if (hostSet("Check_sendspace_dot_com_links", false))
		{
			addFileHost(
			"sendspace.com",	
			'sendspace\\.com\/file\/\\w+',
			'file_description',
			'msg error"',
			'optional--'
			);
		}
		
		if (hostSet("Check_sendspace_dot_pl_links", false))
		{
			addFileHost(
			"sendspace.pl",	
			'sendspace\\.pl\/file\/\\w+',
			'download_file"',
			'Podany plik nie',
			'optional--'
			);
		}

		if (hostSet("Check_gigasize_dot_com_links", false))
		{
			addFileHost(
			"gigasize.com",	
			'gigasize\\.com\/get(?:\\.php(?:\/[\\d-]+|\\?d=\\w+)|\/\\w+)',
			'fileId"',
			'error">',
			'optional--'
			);
		}
		
		if (hostSet("Check_2shared_dot_com_links", false))
		{
			addFileHost(
			"2shared.com",	
			'2shared\\.com\/(?:file|video|document)\/\\w*',
			'File size',
			/>\\s*var msg = 'VGhlIGZpbGUgbGluayB0aGF0IHlvdSByZ/,
			'optional--'
			);
		}
		
		if (hostSet("Check_gigapeta_dot_com_links", false))
		{
			addFileHost(
			"gigapeta.com",	
			'gigapeta\\.com\/dl\/',
			'Download file|Скачать файл| Herunterzuladen|Scarica il file|Cargar el fichero|Charger le fichier',
			'404|page_error',
			'optional--'
			);
		}
		
		if (hostSet("Check_veehd_dot_com_links", false))
		{
			addFileHost(
			"veehd.com",	
			'veehd\.com\/video\/.*?',
			'No sound|Download video',
			'Featured Videos',
			'optional--'
			);
		}
		
		if (hostSet("Check_ifolder_dot_ru_links", false))
		{
			addFileHost(
			"ifolder.ru|rusfolder.com|rusfolder.net",	
			'(?:ifolder\.ru|rusfolder\\.(?:com|net))\/\\d+',
			'file-info',
			'ui-state-error',
			'optional--'
			);
		}

		if (hostSet("Check_filesend_dot_net_links", false))
		{
			addFileHost(
			"filesend.net",	
			'filesend\.net\/download',
			'buttdl',
			'File removed|File not found.',
			'Error'
			);
		}

		if (hostSet("Check_fileswap_dot_com_links", false))
		{
			addFileHost(
			"fileswap.com",	
			'fileswap\\.com\/dl\/\\w+',
			'dlslowbutton"',
			'rounded_block_error">',
			'is temporary unavailable|disponible en estos momentos|vorläufig unerreichbar|Файл временно недоступен'
			);
		}
		
		if (hostSet("Check_solidfiles_dot_com_links", false))
		{
			addFileHost(
			"solidfiles.com",	
			'solidfiles\\.com\/d\/\\w+',
			'<a id="download-button"',
			/>(?:Not found|\\s*The file you are trying to download has been claimed)/,
			'optional--'
			);
		}
		
		if (hostSet("Check_uloz_dot_to_links", false))
		{		
			addFileHost(
			"uloz.to|ulozto.cz|bagruj.cz|zachowajto.pl",	
			"(?:uloz|ulozto|bagruj|zachowajto)\\.(to|cz|sk|net|pl)\/\\w",
			'fileDownload">|fileSize">|passwordProtectedFile">',
			'grayButton deletedFile">|Stránka nenalezena|upload-button"|jako soukromý.',
			'frmaskAgeForm-disagree',
			true
			);
		}
		
		if (hostSet("Check_leteckaposta_dot_cz_links", false))
		{
			addFileHost(
			"leteckaposta.cz|sharegadget.com",	
			"(?:leteckaposta\\.cz|sharegadget\\.com)\/\\d+",
			'<body onload="">',
			'neexistuje|not exist',
			'optional--'
			);
		}

		if (hostSet("Check_zippyshare_dot_com_links", false))
		{
			addFileHost(
			"zippyshare.com",	
			"(?:www\\d+\.|)zippyshare\.com\/(?:v\/\\d+\/file\.html|view\\.jsp\\?)",
			'download.png|Download Now|dlbutton"',
			'not exist',
			'optional--'
			);
		}

		if (hostSet("Check_speedshare_dot_org_links", false))
		{
			addFileHost(
			"speedshare.org",	
			"speedshare\.org\/.+",
			'id="downloadbtn"',
			'Error',
			'optional--'
			);
		}

		if (hostSet("Check_mediafire_dot_com_links", false))
		{
			addFileHost(
			"mediafire.com",	
			"mediafire\.com\/(?:\\?\\w+|download(?:\\.php|\/)|file|view)",
			'download_file_title"|<a class="btn alt download|<div class="filepreview|<div class="fileName">',
			'class="error_msg_title">|>Sign Up! It\'s free|<label for="create-file-name">|<div id="privateTitle">This file is currently set to private.</div>',
			'optional--'
			);
		}

		if (hostSet("Check_ulozisko_dot_sk_links", false))
		{
			addFileHost(
			"ulozisko.sk",	
			"ulozisko\.sk\/",
			'Detaily',
			'neexistuje',
			'optional--'
			);
		}

		if (hostSet("Check_speedfile_dot_cz_links", false))
		{
			addFileHost(
			"speedfile.cz",	
			"speedfile\.cz\/(?:cs\/|en\/|sk\/|)\\d+\/",
			'Stáhnout|<span>Download',
			'error|soubor byl odst|This file was deleted',
			'optional--'
			);
		}

		if (hostSet("Check_upnito_dot_sk_links", false))
		{
			addFileHost(
			"upnito.sk",	
			"(?:dl.\\.|)upnito\\.sk\/(download|subor|file)",
			'download.php',
			'notfound|upload-suborov.php"',
			'optional--'
			);
		}

		if (hostSet("Check_dataport_dot_cz_links", false))
		{
			addFileHost(
			"dataport.cz",	
			"dataport\.cz\/file\/",
			'premium_download">',
			'="error">',
			'optional--',
			true
			);
		}

		if (hostSet("Check_czshare_dot_com_links", false))
		{
			addFileHost(
			"czshare.com",	
			"czshare\\.com\/(?:\\d+\/\\w*|download_file\.php|files\/\\d+\/\\w*|error\\.php\\?co=\\d+)",
			'page-download',
			'Soubor nenalezen|byl smazán|identifikován jako warez|chybě při uploadu|Soubor expiroval|výpadek databáze',
			'optional--'
			);
		}

		if (hostSet("Check_gigaup_dot_fr_links", false))
		{
			addFileHost(
			"gigaup.fr",	
			"gigaup\\.fr\/\\?g=\\w+",
			'Taille de',
			'Vous ne pouvez|existe pas',
			'optional--'
			);
		}
		
		if (hostSet("Check_myupload_dot_dk_links", false))
		{
			addFileHost(
			"myupload.dk",	
			"myupload\\.dk\/showfile\/\\w+",
			'<td class="downloadTblRight"><a class="downloadLink"',
			'<div id="flash_upload_progress"|<td class="downloadTblRight">File has been removed',
			'optional--'
			);
		}
		
		if (hostSet("Check_filebeam_dot_com_links", false))
		{
			addFileHost(
			"filebeam.com|fbe.am",	
			"(?:filebeam\\.com|fbe\\.am)\/\\w+",
			'<center>File Download Area</center>',
			'<center>Error:</center>',
			'optional--'
			);
		}
		
		if (hostSet("Check_upsto_dot_re_links", false))
		{
			addFileHost(
			"upsto.re|upstore.net",	
			"(?:upsto\\.re|upstore.net)\/\\w+",
			'<ul class="features minus">|Download files from folder',
			'<span class="error">',
			'optional--'
			);
		}
		
		if (hostSet("Check_adrive_dot_com_links", false))
		{
			addFileHost(
			"adrive.com",	
			"adrive\\.com\/public\/\\w+",
			'download should start',
			'no longer available publicly',
			'optional--'
			);
		}
		
		if (hostSet("Check_filebulk_dot_com_links", false))
		{
			addFileHost(
			"filebulk.com",	
			"filebulk\\.com\/\\w+",
			'<span id="countdown_str"',
			'File Not Available',
			'You can download files up to 100 Mb only.'
			);
		}
		
		if (hostSet("Check_box_dot_com_links", false))
		{
			addFileHost(
			"box.com|box.net",	
			"https?:\/\/(?:www\\.|)box\\.(?:com|net)\/(?:s|shared|public)\/\\w+",
			'<div class="gallery"',
			'This shared file or folder link has been removed|>404 File Not Found<',
			'optional--'
			);
		}
		
		if (hostSet("Check_rnbload_dot_com_links", false))
		{
			addFileHost(
			"rnbload.com",	
			"rnbload\\.com\/(file\/\\d+\/|download\\.php\\?id=)",
			'<div id="cubeDiv"',
			'Your requested file is not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_ukfilehost_dot_com_links", false))
		{
			addFileHost(
			"ukfilehost.com",	
			"ukfilehost\\.com\/files\/get\/\\w+",
			'optional--',
			'The file you have requested cannot be found',
			'optional--'
			);
		}
		
		if (hostSet("Check_zalil_dot_ru_links", false))
		{
			addFileHost(
			"zalil.ru",	
			"zalil\\.ru\/\\d+",
			'optional--',
			'Файл не найден',
			'optional--'
			);
		}
		
		if (hostSet("Check_uploads_dot_bizhat_dot_com_links", false))
		{
			addFileHost(
			"bizhat.com",	
			"uploads\\.bizhat\\.com\/file\/\\d+",
			'div id="dl">',
			'File not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_mega_dash_myfile_dot_com_links", false))
		{
			addFileHost(
			"mega-myfile.com",	
			"mega\\-myfile\\.com\/file\/\\d+\/\\w+",
			'<b>File name:</b>',
			'Your requested file is not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_speedy_dash_share_dot_com_links", false))
		{
			addFileHost(
			"speedy-share.com",	
			"speedy\\-share\\.com\/\\w+",
			'File Download',
			'No such file',
			'optional--'
			);
		}
		
		if (hostSet("Check_filebox_dot_ro_links", false))
		{
			addFileHost(
			"filebox.ro|fbx.ro",	
			"(?:filebox|fbx)\\.ro\/(?:download\\.php\\?key\\=)?\\w+",
			'fisierul trebuie sa astepti',
			'downloadezi a expirat',
			'optional--'
			);
		}
		
		if (hostSet("Check_100shared_dot_com_links", false)) //checkfiles.html giving false positives
		{
			addFileHost(
			"100shared.com",	
			"100shared\\.com\/\\w+",
			'<h2>Download File',
			'No such file',
			'optional--'
			);
		}
		
		if (hostSet("Check_mixturecloud_dot_com_links", false))
		{
			addFileHost(
			"mixturecloud.com|mixturefile.com|mixturevideo.com",	
			"mixture(?:cloud|file|video)\\.com\/(?:download\\=|media\/(?:download\/)?)\\w+",
			/download_(?:free|unlimited)">|btn icon i_cloud_download gray|icon\-white"><\/i> Download/,
			'File not found|class="err"|msgerr alert alert-error text-center">',
			'optional--'
			);
		}
		
		if (hostSet("Check_yourupload_dot_com_links", false))
		{
			addFileHost(
			"yourupload.com",	
			"yourupload\\.com\/\\w+",
			'<label>Download',
			'404',
			'optional--'
			);
		}
		
		if (hostSet("Check_fileneo_dot_com_links", false))
		{
			addFileHost(
			"fileneo.com",	
			"fileneo\\.com\/\\w+",
			'Download File</h3>',
			'File not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_file_dash_upload_dot_net_links", false))
		{
			addFileHost(
			"file-upload.net",	
			"(?:en\\.|)file\\-upload\\.net\/download\\-\\d+\/\\w+",
			'downbutton.gif',
			'Datei existiert nicht!|File does not exist!',
			'optional--'
			);
		}
		
		if (hostSet("Check_fliiby_dot_com_links", false))
		{
			addFileHost(
			"fliiby.com",	
			"fliiby\\.com\/file\/\\d+\/\\w+",
			'file_panel">',
			'Not Found</span>|error_container">|<h1>Error 410 / Gone</h1>',
			'optional--'
			);
		}
		
		if (hostSet("Check_jumbofiles_dot_org_links", false))
		{
			addFileHost(
			'jumbofiles.org|jumbofilebox.com',	
			"(?:jumbofiles\\.org|jumbofilebox\\.com)\/.+",
			'<div class="downloadfree">',
			'div_file"',
			'optional--'
			);
		}
		
		if (hostSet("Check_filesmall_dot_com_links", false))
		{
			addFileHost(
			'filesmall.com',	
			"filesmall\\.com\/\\w+\/download\\.html",
			'value="Download"',
			'File Not Found',
			'optional--'
			);
		}
		
		if (hostSet("Check_upload_dot_ee_links", false))
		{
			addFileHost(
			'upload.ee',	
			"upload\\.ee\/files\/\\d+\/\\w+",
			'id="d_l"',
			'There is no such file',
			'optional--'
			);
		}
		
		if (hostSet("Check_share4web_dot_com_links", false))
		{
			addFileHost(
			'share4web.com',	
			"share4web\\.com\/get\/\\w+",
			'btn_red">',
			'Page Not Found|File not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_limelinx_dot_com_links", false))
		{
			addFileHost(
			'limelinx.com',	
			"limelinx\\.com\/\\w+",
			'icon-download-alt',
			'>Error - File Not Found<',
			'optional--'
			);
		}
		
		if (hostSet("Check_novamov_dot_com_links", false))
		{
			addFileHost(
			'novamov.com',	
			"novamov\\.com\/\\w+",
			'Download file|>Download this video<',
			'File not found|The video file was removed',
			'optional--'
			);
		}
		
		if (hostSet("Check_skydrive_dot_live_dot_com_links", false))
		{
			addFileHost(
			'live.com|sdrv.ms',	
			"(?:skydrive\\.live\\.com|sdrv\\.ms)\/\\w+",
			'Download file',
			'no longer available</h1>',
			'optional--'
			);
		}
		
		if (hostSet("Check_yourfiles_dot_to_links", false))
		{
			addFileHost(
			'yourfiles.to',	
			"yourfiles\\.to\/\\?d=\\w+",
			'Download-Link: </strong>',
			'Die angefragte Datei wurde nicht gefunden',
			'optional--'
			);
		}
		
		if (hostSet("Check_filedropper_dot_com_links", false))
		{
			addFileHost(
			'filedropper.com|filesavr.com',	
			"(?:filedropper|filesavr)\\.com\/\\w+",
			'download"',
			'steps.png',
			'optional--',
			true);
		}
		
		if (hostSet("Check_filehost_dot_ro_links", false))
		{
			addFileHost(
			'filehost.ro',	
			"filehost\\.ro\/\\d+",
			'Apasati aici pentru a porni download-ul"',
			'Acest fisier nu exista in baza de date',
			'optional--'
			);
		}
		
		if (hostSet("Check_mijnbestand_dot_nl_links", false))
		{
			addFileHost(
			'mijnbestand.nl',	
			"mijnbestand\\.nl\/Bestand\\-\\w+",
			'downloadfrm"',
			'stappen">',
			'optional--'
			);
		}
		
		if (hostSet("Check_ultrashare_dot_net_links", false))
		{
			addFileHost(
			'ultrashare.net',	
			"ultrashare\\.net\/hosting\/fl\/\\w+",
			'downloadbutton">',
			'error">',
			'optional--'
			);
		}
		
		if (hostSet("Check_dosya_dot_tc_links", false))
		{
			addFileHost(
			'dosya.tc',	
			"dosya\\.tc\/server\\d*\/\\w+",
			'id="dl"',
			'Dosya bulunamad',
			'optional--'
			);
		}
		
		if (hostSet("Check_exfile_dot_ru_links", false))
		{
			addFileHost(
			'exfile.ru',	
			"exfile\\.ru\/\\d+",
			'id="link"><a href="/download/',
			'class="align_left"><p class="red"',
			'optional--'
			);
		}
		
		if (hostSet("Check_fileshare_dot_ro_links", false))
		{
			addFileHost(
			'fileshare.ro',	
			"fileshare\\.ro\/\\w+",
			'DOWNLOAD NOW',
			'Acest fisier nu exista.',
			'optional--'
			);
		}
		
		if (hostSet("Check_fshare_dot_vn_links", false))
		{
			addFileHost(
			'fshare.vn',	
			"fshare\\.vn\/file\/\\w+",
			'optional--',
			'Liên kết bạn chọn không tồn tại trên hệ thống Fshare',
			'optional--'
			);
		}
		
		if (hostSet("Check_wikifortio_dot_com_links", false))
		{
			addFileHost(
			'wikifortio.com',	
			"wikifortio\\.com\/\\w+",
			'screenbutton">',
			"not found on node|doesn't exist or has expired and is no longer available",
			'optional--'
			);
		}
		
		if (hostSet("Check_wyslijto_dot_pl_links", false))
		{
			addFileHost(
			'wyslijto.pl',	
			"wyslijto\\.pl\/(?:files\/download|plik)\/\\w+",
			'optional--',
			/zosta. usuni.ty/,
			'optional--'
			);
		}
		
		if (hostSet("Check_kiwi6_dot_com_links", false))
		{
			addFileHost(
			'kiwi6.com',	
			"kiwi6\\.com\/file\/\\w+",
			'download-link"',
			'Upload not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_localhostr_dot_com_links", false))
		{
			addFileHost(
			'localhostr.com|lh.rs|hostr.co',	
			"(?:localhostr\\.com\/file|lh\\.rs|hostr\\.co\/download)\/\\w+",
			'download-button',
			'fourohfour">',
			'optional--'
			);
		}
		
		if (hostSet("Check_remixshare_dot_com_links", false))
		{
			addFileHost(
			'remixshare.com',	
			"remixshare\\.com\/(?:dl|download)\/\\w+",
			'linkContainerDiv"',
			'Sorry, die Datei konnte nicht gefunden werden.|Die angeforderte Datei steht nicht mehr zur Verfügung.',
			'optional--'
			);
		}
	
		if (hostSet("Check_hidemyass_dot_com_links", false))
		{
			addFileHost(
			'hidemyass.com',	
			"hidemyass\\.com\/files\/\\w+",
			'dlbutton"',
			'genericerrorbox">',
			'optional--'
			);
		}
		
		if (hostSet("Check_tinyupload_dot_com_links", false))
		{
			addFileHost(
			'tinyupload.com',	
			"s\\d+\\.tinyupload\\.com\/(?:index\\.php)?\\?file_id=\\d+",
			'Download file</h3>',
			'File was deleted from server.',
			'optional--'
			);
		}
		
		if (hostSet("Check_gigabase_dot_com_links", false))
		{
			addFileHost(
			'gigabase.com',	
			"gigabase\\.com\/getfile\/\\w+",
			'/img/but_dnld_regular.jpg|gigaBtn std">',
			/<div class="all" id="Page404"|(?:File|Page) Not Found/,
			'optional--'
			);
		}
		
		if (hostSet("Check_trainbit_dot_com_links", false))
		{
			addFileHost(
			'trainbit.com',	
			"trainbit\\.com\/files\/\\w+",
			'download"',
			'file not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_videobam_dot_com_links", false))
		{
			addFileHost(
			'videobam.com',	
			"videobam\\.com\/\\w+",
			'wrap-video"',
			'File not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_hyperfileshare_dot_com_links", false))
		{
			addFileHost(
			'hyperfileshare.com',	
			"hyperfileshare\\.com\/d\/\\w+",
			'/img/download_btm_site.gif',
			'Download URL is incorrect or your file has already been deleted!',
			'optional--'
			);
		}
		
		if (hostSet("Check_uploads_dot_ws_links", false))
		{
			addFileHost(
			'uploads.ws|upl.me',	
			"(?:uploads\\.ws|upl\\.me)\/\\w+",
			'downloadFile"',
			'download does not exist or has been removed',
			'optional--'
			);
		}
		
		if (hostSet("Check_keep2share_dot_cc_links", false))
		{
			addFileHost(
			'keep2share.cc|k2s.cc',	
			"(?:keep2share|k2s)\\.cc\/file\/\\w+",
			'<a class="various fancybox.ajax btn btn-primary" id="yw1"',
			'deleted</h5>',
			'optional--'
			);
		}
		
		if (hostSet("Check_cloud_dash_up_dot_be_links", false))
		{
			addFileHost(
			'cloud-up.be',	
			"(?:download\\.)?cloud\\-up\\.be\/download\\.php\\?file=\\w+",
			'download file',
			'This file does not exist!',
			'optional--'
			);
		}
		
		if (hostSet("Check_uploadc_dot_com_links", false)) //Do not use bulkcheck, false reports
		{
			addFileHost(
			'uploadc.com|zalaa.com',	
			"(?:uploadc|zalaa)\\.com\/\\w+",
			'Slow access"',
			'File Not Found|file has been removed',
			'optional--'
			);
		}
		
		if (hostSet("Check_1_dash_clickshare_dot_com_links", false))
		{
			addFileHost(
			'1-clickshare.com',	
			"1\\-clickshare\\.com\/(?:\\d+|download\\.php\\?file=\\w+)",
			'<div id="dl"',
			'File not found|Invalid download link',
			'optional--'
			);
		}
		
		if (hostSet("Check_fastupload_dot_ro_links", false))
		{
			addFileHost(
			'fastupload.ro|rol.ro',	
			"fastupload\\.(?:rol\\.)?ro\/\\w+",
			'isAliveRegex',
			'Fişierele nu mai sunt active!',
			'optional--'
			);
		}
		
		if (hostSet("Check_howfile_dot_com_links", false))
		{
			addFileHost(
			'howfile.com',	
			"howfile\\.com\/file\/\\w+",
			'btn1"',
			'File not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_free_dot_fr_links", false))
		{
			addFileHost(
			'free.fr',	
			"dl\\.free\\.fr\/(?:getfile\\.pl\\?file=\/?|)\\w+",
			'Valider et t&eacute;l&eacute;charger le fichier',
			'Fichier inexistant',
			'optional--'
			);
		}
		
		if (hostSet("Check_file4go_dot_com_links", false))
		{
			addFileHost(
			'file4go.com',	
			"file4go\\.com\/d\/\\w+",
			'gerarlinkdownload"',
			'<b>DMCA</b>|FILE REMOVED DMCA',
			'optional--'
			);
		}
		
		if (hostSet("Check_hostinoo_dot_com_links", false)) //checkfiles.html not working
		{
			addFileHost(
			'hostinoo.com',	
			"hostinoo\\.com\/\\w+",
			'btn_download',
			'File Not Found',
			'optional--'
			);
		}
		
		if (hostSet("Check_sendfile_dot_su_links", false))
		{
			addFileHost(
			'sendfile.su',	
			"sendfile\\.su\/\\w+",
			'download_click"',
			'Файл не найден',
			'optional--'
			);
		}
		
		if (hostSet("Check_usaupload_dot_net_links", false))
		{
			addFileHost(
			'usaupload.net',	
			"usaupload\\.net\/d\/\\w+",
			'Download">',
			'is not available',
			'In this moment you can`t download this file, please try again in few minutes, we working on this server, SORRY!'
			);
		}
		
		if (hostSet("Check_anonfiles_dot_com_links", false))
		{
			addFileHost(
			'anonfiles.com',	
			"anonfiles\\.com\/file\/\\w+",
			'download_button"',
			'File not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_divxstage_dot_eu_links", false))
		{
			addFileHost(
			'divxstage.eu|divxstage.net',	
			"divxstage\\.(?:eu|net)\/video\/\\w+",
			'>Download the video<',
			'File not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_herosh_dot_com_links", false))
		{
			addFileHost(
			'herosh.com',	
			"herosh\\.com\/download\/\\d+\/\\w+",
			'green">Download',
			'file not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_minus_dot_com_links", false))
		{
			addFileHost(
			'min.us|minus.com',	
			"(?:min\\.us|minus.com)\/\\w+",
			'btn-action btn-download no-counter',
			'File not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_m5zn_dot_com_links", false))
		{
			addFileHost(
			'm5zn.com',	
			"m5zn\\.com\/d\/\\?\\d+",
			'free_account">',
			'file not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_girlshare_dot_ro_links", false))
		{
			addFileHost(
			'girlshare.ro',	
			"girlshare\\.ro\/\\w+",
			'download-button.gif',
			'Acest fisier nu exista.',
			'optional--'
			);
		}
		
		if (hostSet("Check_bin_dot_ge_links", false))
		{
			addFileHost(
			'bin.ge',	
			"bin\\.ge\/dl\/\\w+",
			'captchacode">',
			'No file found',
			'optional--'
			);
		}
		
		if (hostSet("Check_nowvideo_dot_eu_links", false))
		{
			addFileHost(
			'nowvideo.eu',	
			"nowvideo\\.eu\/video\/\\w+",
			'>Download this video!<',
			'File not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_shareplace_dot_com_links", false))
		{
			addFileHost(
			'shareplace.com',	
			"shareplace\\.com\/(?:index1\\.php\\?a=|\\?)",
			'wait">',
			'Your requested file is not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_terafiles_dot_net_links", false))
		{
			addFileHost(
			'terafiles.net',	
			"terafiles\\.net\/v\\-\\d+",
			'download file',
			'Le fichier que vous souhaitez télécharger n\'est plus disponible sur nos serveurs.',
			'optional--'
			);
		}
		
		if (hostSet("Check_uploadmb_dot_com_links", false))
		{
			addFileHost(
			'uploadmb.com',	
			"uploadmb\\.com\/dw\\.php\\?id=\\w+",
			'wait">',
			'The file you are requesting to download is not available',
			'optional--'
			);
		}
		
		if (hostSet("Check_upload_dash_il_dot_com_links", false))
		{
			addFileHost(
			'upload-il.com|upload-il.net|uploadilcloud.com|filez.bz|przeslij.net|pir.co.il|directil.com',	
			"(?:upload\\-il\\.(?:com|net)|uploadilcloud\\.com|filez\\.bz|przeslij\\.net|pir\\.co\\.il|directil\\.com)\/(?:en|he|ar|ru|view|)\/?\\w+",
			'captchaUl">',
			/\\\u05E9\\u05D2\\\u05D9\\\u05D0\\\u05D4: \\\u05E7\\\u05D5\\\u05D1\\\u05E5 \\\u05D0\\\u05D5 \\\u05D3\\\u05E3 \\\u05DC\\\u05D0 \\\u05E0\\\u05DE\\\u05E6\\\u05D0|Your requested file is not found./,
			'optional--'
			);
		}
		
		if (hostSet("Check_bayfiles_dot_net_links", false))
		{
			addFileHost(
			'bayfiles.net',	
			"bayfiles\\.net\/file\/\\w+\/\\w+",
			'download-header">',
			'class="not-found">',
			'optional--'
			);
		}
		
		if (hostSet("Check_bitupload_dot_com_links", false))
		{
			addFileHost(
			'bitupload.com',	
			"bitupload\\.com\/\\w+",
			'limited">',
			'two-col">',
			'optional--'
			);
		}
		
		if (hostSet("Check_ravishare_dot_com_links", false))
		{
			addFileHost(
			'ravishare.com',	
			"ravishare\\.com\/\\w+",
			'Free Download">',
			'>File Not Found<',
			'optional--'
			);
		}
		
		if (hostSet("Check_zixshare_dot_com_links", false))
		{
			addFileHost(
			'zixshare.com',	
			"zixshare\\.com\/files\/\\w+",
			'download_caption">',
			'File not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_promptfile_dot_com_links", false))
		{
			addFileHost(
			'promptfile.com',	
			"promptfile\\.com\/l\/[a-zA-Z0-9-]",
			/<button type="submit" class="gray_btn">Continue to File<\/button>|<a href=".+" class="green_btn download_btn">Download File<\/a>/,
			/\s+<div id="not_found_msg"/,
			'optional--'
			);
		}
		
		if (hostSet("Check_filebar_dot_kz_links", false))
		{
			addFileHost(
			'filebar.kz',	
			"filebar\\.kz\/files\/\\d+",
			'I don\'t think this is a filehost tbh but meh...',
			'Ошибка 404. Страница не найдена!',
			'optional--'
			);
		}
		
		if (hostSet("Check_yourfilelink_dot_com_links", false))
		{
			addFileHost(
			'yourfilelink.com',	
			"yourfilelink\\.com\/get\\.php\\?fid=\\d+",
			'optional--',
			'File not found.</div>',
			'optional--'
			);
		}
		
		if (hostSet("Check_1file_dot_cc_links", false))
		{
			addFileHost(
			'1f.cc|1file.cc',	
			"1f(?:ile)?\\.cc\/\\w+",
			'download-btn">',
			'>File Not Found<',
			'optional--'
			);
		}
		
		if (hostSet("Check_qshare_dot_com_links", false))
		{
			addFileHost(
			'quickshare.com|qshare.com',	
			"(?:quickshare|qshare)\\.com\/get\/\\d+",
			'>Free<',
			'File not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_filewist_dot_com_links", false))
		{
			addFileHost(
			'filewist.com',	
			"filewist\\.com\/\\w+",
			'link btn-free"',
			'>File not found<',
			'optional--'
			);
		}
		
		if (hostSet("Check_airupload_dot_com_links", false))
		{
			addFileHost(
			'airupload.com',	
			"airupload\\.com\/file\/i\/\\w+",
			'download" value="Slow download',
			'<span class="glyph attention"></span>File was removed',
			'optional--'
			);
		}
		
		/*if (hostSet("Check_extabit_dot_com_links", false) && !genset("Extabit_API_Check", false))
		{
			addFileHost(
			'extabit.com',	
			'(?:u\\d+\\.)?extabit\\.com\/(?:file|folder|go)(?:\/|\_)\\w+',
			'<a class="btn-download-free"',
			'page_404_header|div id="mirr"',
			'is temporary unavailable|disponible en estos momentos|vorläufig unerreichbar|Файл временно недоступен',
			true); 
		}*/
		
		if (hostSet("Check_dropbox_dot_com_links", false)) //shared links
		{
			addFileHost(
			'dropbox.com',	
			"dropbox\\.com\/sh?\/\\w+",
			'default_content_download_button" class="freshbutton-blue">',
			'>Nothing Here<|>Error (404)<',
			'>Error \\(509\\)<'
			);
		}
		
		if (hostSet("Check_wikisend_dot_com_links", false))
		{
			addFileHost(
			'wikisend.com',	
			"wikisend\\.com\/download\/\\d+",
			'button_download.gif" alt="Download file',
			'File not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_webfilehost_dot_com_links", false))
		{
			addFileHost(
			'webfilehost.com',	
			"webfilehost\\.com\/\\?mode=viewupload&id=\\d+",
			'linkDownload">',
			'File not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_wrzuc_dot_to_links", false))
		{
			addFileHost(
			'wrzuc.to',	
			"wrzuc.to\/\\w+",
			'Download file">',
			'został usunięty przez użytkownika.',
			'optional--'
			);
		}
		
		if (hostSet("Check_safecloud_dot_so_links", false))
		{
			addFileHost(
			'safecloud.so',	
			"safecloud\\.so\/\\d+\/.+?",
			'download">',
			'>File not found<',
			'optional--'
			);
		}
		
		if (hostSet("Check_myuplbox_dot_com_links", false))
		{
			addFileHost(
			'myuplbox.com',	
			"myuplbox\\.com\/file\/download\/\\d+",
			'dwl_button corner-all">Click',
			'deleted_file">File Not Found',
			'optional--'
			);
		}
		
		if (hostSet("Check_filesflash_dot_com_links", false))
		{
			addFileHost(
			'filesflash.com|filesflash.net',	
			"filesflash\\.(?:com|net)\/\\w+",
			'freedownload.php">',
			/>That file (?:was deleted|is not available)/,
			'optional--'
			);
		}
		
		if (hostSet("Check_demo_dot_ovh_dot_eu_links", false))
		{
			addFileHost(
			'ovh.eu',	
			"demo\\.ovh\\.eu\/(?:en|de)\/\\w+",
			'download.gif"',
			'p_point">',
			'optional--'
			);
		}
		
		if (hostSet("Check_dwn_dot_so_links", false))
		{
			addFileHost(
			'dwn.so|dwnshare.pl',	
			"(?:dwn\\.so|dwnshare.pl)\/show\\-file\/\\w+",
			'$(\'.link_download\').click(function()',
			'<div id="main_container',
			'optional--'
			);
		}
		
		if (hostSet("Check_sharephile_dot_com_links", false))
		{
			addFileHost(
			'sharephile.com',	
			"sharephile\\.com\/\\w+",
			'<h1 class="download-file">',
			/>\\\u0424\\\u0430\\\u0439\\\u043B \\\u043D\\\u0435 \\\u043D\\\u0430\\\u0439\\\u0434\\\u0435\\\u043D./,
			'optional--'
			);
		}
		
		if (hostSet("Check_maherfile_dot_com_links", false))
		{
			addFileHost(
			'maherfire.com',	
			"maherfire\\.com\/\\?d=\\w+",
			'<input type="button" onclick="startDownload();"',
			'>Your requested file is not found',
			'optional--'
			);
		}
		
		if (hostSet("Check_droidbin_dot_com_links", false))
		{
			addFileHost(
			'droidbin.com|apkhosting.com',	
			"(?:droidbin\\.com|apkhosting.com)\/\\w+",
			'optional--',
			'>That\'s a 404<|<li>File has been removed by the site administrator.</li>',
			'optional--'
			);
		}
		
		if (hostSet("Check_d_dash_h_dot_st_links", false))
		{
			addFileHost(
			'd-h.st',	
			"d\\-h\\.st\/\\w+",
			'>File Information<\/h2>',
			'>File Not Found<',
			'optional--'
			);
		}
		
		if (hostSet("Check_share4files_dot_com_links", false))
		{
			addFileHost(
			'share4files.com',	
			"share4files\\.com\/files\/\\w+",
			'<input type="button" value="Free Download"',
			'>File not found<',
			'optional--'
			);
		}
		
		if (hostSet("Check_filefactory_dot_com_links", false) && !genset("Filefactory_API_Check", false))
		{
			addFileHost(
			'filefactory.com',
			"filefactory\\.com\/file\/\\w+",
			/<div id="download-(?:free|premium)/,
			/<h2>(?:File Removed|Invalid Download Link|File Unavailable|Server Failed)<\/h2>/,
			'<h2>Premium Account Required</h'
			);
		}
		
		if (hostSet("Check_jumbofiles_dot_com_links", false))
		{
			addFileHost(
			'jumbofiles.com',
			"jumbofiles\\.com\/\\w+",
			'<h3>Download File',
			/>File\n*\s*Not Found/,
			'optional--'
			);
		}
		
		if (hostSet("Check_cloudstor_dot_es_links", false))
		{
			addFileHost(
			'cloudstor.es',
			"cloudstor\\.es\/f\/\\w+",
			'<div id="btn_download"',
			'>File not found<',
			'optional--'
			);
		}
		
		if (hostSet("Check_moevideo_dot_net_links", false))
		{
			addFileHost(
			'moevideo.net',
			"moevideo\\.net\/video\/\\d+\\.\\w+",
			/>Download\s*video</,
			'>Video not found<',
			'optional--'
			);
		}
		
		if (hostSet("Check_dizzcloud_dot_com_links", false))
		{
			addFileHost(
			'dizzcloud.com',
			"dizzcloud\\.com\/(?:file|dl)?\/?\\w+",
			/<div\s+id="download-counter">/,
			'<div class="font-404-1">',
			'>File is temporary unavailable<'
			);
		}
		
		if (hostSet("Check_shared_dot_com_links", false))
		{
			addFileHost(
			'shared.com',
			"shared\\.com\/\\w+",
			/<div class="attachment\-icon">\n\s*<a href="https:\/\/dl\.shared\.com\/\w+/,
			'optional--',
			'optional--'
			);
		}
		
		if (hostSet("Check_filetrip_dot_net_links", false))
		{
			addFileHost(
			'filetrip.net',
			"filetrip\\.net\/dl\\?\\w+",
			'<input type="submit" name="download" value="Download"|<i>Your download will be ready in a second...</i>',
			'optional--',
			'optional--'
			);
		}
		
		if (hostSet("Check_filegrep_dot_com_links", false))
		{
			addFileHost(
			'filegrep.com',
			"filegrep\\.com\/dl\/\\w+",
			'<i class="glyphicon glyphicon-time"></i> Slow Download</button>',
			'<div class="alert alert-danger">File has been deleted by the uploader',
			'optional--'
			);
		}
		
		if (hostSet("Check_filepi_dot_com_links", false))
		{
			addFileHost(
			'filepi.com',
			"filepi\\.com\/\\w+",
			'<button class="submit" id="button_start"',
			'<div id="big_title">File not found or deleted :(',
			'optional--'
			);
		}
		
		if (hostSet("Check_2downloadz_dot_com_links", false))
		{
			addFileHost(
			'2downloadz.com',
			"2downloadz\\.com\/\\w+",
			'<div title="Slow Download"',
			'>File not found<',
			'optional--'
			);
		}
		
		if (hostSet("Check_qfpost_dot_com_links", false))
		{
			addFileHost(
			'qfpost.com',
			"qfpost\\.com\/file\/d\\?g=\\w+",
			'<input src="/i/download2.png"',
			'>File not found<',
			'optional--'
			);
		}
		
		if (hostSet("Check_superupload_dot_com_links", false))
		{
			addFileHost(
			'superupload.com',
			"superupload\\.com\/(?:\\?|files\/)\\w+",
			'<span id="regularspeed" class="speedt">',
			'>DUNNO<',
			'optional--'
			);
		}
		
		if (hostSet("Check_tropicshare_dot_com_links", false))
		{
			addFileHost(
			'tropicshare.com',
			"tropicshare\\.com\/files\/\\d+",
			'"free-download">FREE<br/>',
			'>FNF<',
			'optional--'
			);
		}
		
		if (hostSet("Check_filemonkey_dot_in_links", false))
		{
			addFileHost(
			'filemonkey.in',
			"filemonkey\\.in\/file\/\\w+",
			'<span class="waitseconds">30</span>',
			'>This file has not been found<',
			'optional--'
			);
		}
		
		if (hostSet("Check_mystore_dot_to_links", false))
		{
			addFileHost(
			'mystore.to',
			"mystore\\.to\/dl\/\\w+",
			/<button wert="\w+">Download File</,
			'>file not found<', //?
			'optional--'
			);
		}
		
		if (hostSet("Check_putcker_dot_com_links", false))
		{
			addFileHost(
			'putcker.com',	
			"putcker\\.com\/.+",
			'<div class="downloadfree">',
			'div_file"',
			'optional--'
			);
		}
		
		if (hostSet("Check_turtleshare_dot_com_links", false))
		{
			addFileHost(
			'turtleshare.com',
			"turtleshare\\.com\/download\/\\w+",
			/<div style=".+" id="download_link">Preparing Download/,
			'We do not know this file.',
			'optional--'
			);
		}
		
		if (hostSet("Check_flashx_dot_tv_links", false))
		{
			addFileHost(
			'flashx.tv',
			"flashx\\.tv\/video\/\\w+",
			/<iframe width="\d+" height="\d+" src="http:\/\/play\.flashx\.tv\/player\/embed\.php/,
			'>File not found<', //?
			'optional--'
			);
		}
		
		if (hostSet("Check_nosupload_dot_com_links", false))
		{
			addFileHost(
			"nosupload.com",	
			"nosupload\\.com\/(?:\\?d=)?\\w+",
			'op" value="download',
			/>(?:File Not Found|The file was removed by administrator)</,
			'optional--',
			true
			);
		}
		
		if (hostSet("Check_fileim_dot_com_links", false))
		{
			addFileHost(
			'fileim.com',
			"fileim\\.com\/file\/\\w+",
			'<a id="freedown"',
			'>Not Found<',
			'optional--'
			);
		}
		
		if (hostSet("Check_socifiles_dot_com_links", false))
		{
			addFileHost(
			'socifiles.com',
			"socifiles\\.com\/d\/\\w+",
			'<h1 class="file-link"',
			'something something darkside', //?
			'optional--'
			);
		}

		if (hostSet("Check_file4u_dot_pl_links", false))
		{
			addFileHost(
			'file4u.pl',
			'file4u\\.pl\/download\/\\d+',
			/>Zwyk.y U.ytkownik<\/button>/,
			/>\s*Plik kt.ry pr.bujesz pobra./,
			'optional--'
			);
		}

		if (hostSet("Check_kie_dot_nu_links", false))
		{
			addFileHost(
			'kie.nu',
			'kie\\.nu\/\\w+',
			'<input type="submit" value="download" id="submit-dl" />',
			'404 NOT FOUND',
			'optional--'
			);
		}

		if (hostSet("Check_dodane_dot_pl_links", false))
		{
			addFileHost(
			'dodane.pl',
			'dodane\\.pl\/file\/\\d+',
			'>Pobierz plik<',
			'<div class="error-page-title">Strona o podanym adresie nie istnieje <',
			'optional--'
			);
		}

		if (hostSet("Check_file-space_dot_org_links", false))
		{
			addFileHost(
			'file-space.org',
			'file\\-space\\.org\/files\/get\/[a-z0-9-]+',
			'<a href="#" onclick="javascript:gotofree();"',
			'nothingyet',
			'optional--'
			);
		}

		if (hostSet("Check_sendfile_dot_pl_links", false))
		{
			addFileHost(
			'sendfile.pl',
			'sendfile\\.pl\/\\d+',
			'<font color="#0000FF"><b><u>Pobierz</u>',
			'<div class="error">Plik nie istnieje!</div>',
			'optional--'
			);
		}

		if (hostSet("Check_uploadizer_dot_net_links", false))
		{
			addFileHost(
			'uploadizer.net',
			'uploadizer\\.net\/\\?d=\\d+',
			'<input type="button" onclick="startDownload();"',
			'optional--',
			'optional--'
			);
		}

		if (hostSet("Check_filesso_dot_com_links", false))
		{
			addFileHost(
			'filesso.com',
			'filesso\\.com\/file\/\\w+',
			'<input type="submit" value="Pobierz plik" />',
			'Plik nie został odnaleziony w bazie danych.',
			'optional--'
			);
		}

		if (hostSet("Check_twojepliki_dot_eu_links", false))
		{
			addFileHost(
			'twojepliki.eu',
			'twojepliki\\.eu\/\\w+',
			'<td><a class="free-btn-4 free-btn" href="/download/free',
			'<h1>File not found. Probably it was deleted.</h1>|<div class="code-404" style="display:none;">404</div>',
			'optional--'
			);
		}

		if (hostSet("Check_video_dot_tt_links", false))
		{
			addFileHost(
			'video.tt',
			'video\\.tt\/video\/\\w+',
			'<div class="video_player" id="videoPlayer">',
			'<font size="5">This video is no longer available</font>',
			'optional--'
			);
		}

		if (hostSet("Check_hightail_dot_com_links", false))
		{
			addFileHost(
			'hightail.com|yousendit.com',
			'(?:hightail|yousendit)\\.com\/download\/\\w+',
			'<a id="saveToDesktop" class="btn-save hightailWhite"',
			'deadregex',
			'optional--'
			);
		}
	}
	
	//hosts with direct download, so they must be requested for headers only
	function initFileHostsHeadersOnly()
	{
		var aFHHCOCount = 1;
		function addFileHostHeadersOnly(hostName, linkRegex, isAliveRegex, isDeadRegex)
		{
			hostName = hostName.split("|");
			var i = hostName.length;
			
			
			var hostID = "HC" + aFHHCOCount;
			
			while(i--) {
				var filehost = hostName[i].replace(/\./g, "_dot_").replace(/\-/g, "_dash_");

				if (!hostsIDs[filehost]) {
					hostsIDs[filehost] = [];
				}
				hostsIDs[filehost].push({
					hostID: hostID,
					linkRegex: linkRegex,
				});
			}
			
			var HCObj = {
				liveRegex: isAliveRegex,
				deadRegex: isDeadRegex,
				links: []
			}
			
			hostsCheck[hostID] = HCObj;
			aFHHCOCount++;
			
		}
	
		if (hostSet("Check_uloziste_dot_com_links", false))
		{
			addFileHostHeadersOnly(
			'uloziste.com',	
			"(?:|files\\.)uloziste\\.com\/\\w+\/\\w+",
			'Connection: Keep-Alive',
			'Content-Length: 3857'
			)
		}

		if (hostSet("Check_filemonster_dot_net_links", false))
		{
			addFileHostHeadersOnly(
			'folemonster.net',	
			"filemonster\\.net\/(?:..\/|)file\/\\w+",
			'filename="',
			'Content-Type: text/html'
			)
		}

		if (hostSet("Check_uploadbin_dot_net_links", false))
		{
			addFileHostHeadersOnly(
			'uploadbin.net',	
			"uploadbin\\.net\/\\w+\/\\w+",
			'filename=',
			'Connection: close'
			)
		}

		if (hostSet("Check_videozer_dot_com_links", false))
		{
			addFileHostHeadersOnly(
			'videozer.com',	
			"videozer\\.com\/embed\/\\w+",
			"Connection: keep-alive|Content-Type: application/x-shockwave-flash",
			"optional--"
			)
		}
		
		if (hostSet("Check_karelia_dot_pro_links", false))
		{
			addFileHostHeadersOnly(
			'karelia.pro',	
			"(?:disk|fast)\\.karelia\\.pro\/\\w+",
			"Content-Disposition: attachment; filename=",
			"Content-Type: text/html"
			)
		}
		
		if (hostSet("Check_dropbox_dot_com_links", false))
		{
			addFileHostHeadersOnly(
			'dropbox.com|dropboxusercontent.com',	
			"dl\\.dropbox(?:usercontent)?\\.com\/u\/\\d+\/.+?",
			/x-dropbox-request-id: \w+/,
			"optional--"
			)
		}
		
		if (hostSet("Check_demo_dot_ovh_dot_eu_links", false))
		{
			addFileHostHeadersOnly(
			'ovh.eu',	
			"demo\\.ovh\\.eu\/download\/\\w+",
			"optional--",
			"optional--"
			)
		}
		
		if (hostSet("Check_archive_dot_org_links", false))
		{
			addFileHostHeadersOnly(
			'archive.org',
			"\\w+\\.us\\.archive\\.org\/.+",
			/Content-Length: \d{6,}/,
			'Content-Type: text/html'
			);
		}
		
		if (hostSet("Check_rapidgator_dot_net_links", false))
		{
			addFileHostHeadersOnly(
			'rapidgator.net|rg.to',
			"(?:rapidgator\\.net|rg.to)\/file\/\\w+",
			'Content-Type: text/html',
			'fnriohi33-2=340'
			);
		}

		if (hostSet("Check_blueshare_dot_be_links", false))
		{
			addFileHostHeadersOnly(
			'blueshare.be',
			'blueshare\\.be\/file\/\\w+',
			'Content-Description: File Transfer',
			'optional--'
			);
		}
	}
}

update.init();
