// ==UserScript==
// @name        vCrawler
// @namespace   http://vobile.cn
// @include    http*
// @grant       none
// @version     1.0
// ==/UserScript==

  
var urlexp = new RegExp('(http|ftp|https)://[a-z0-9\-_]+(\.[a-z0-9\-_]+)+([a-z0-9\-\.,@\?^=%&;:/~\+#]*[a-z0-9\-@\?^=%&;/~\+#])?', 'ig');

var domainexp = /:\/\/(.[^/]+)/ ;

function cleanUrl(s) {
    s = s || "";
    return s.trim().replace(/[\u0080-\uFFFF]+/g, "").replace(/&amp;/ig, "&");
}
function urldecode(str) {
    return unescape(decodeURIComponent(escape(cleanUrl(str))));
}
function regexx(s, rg) {
    var rs;
    if (rs = s.match(rg)) {
        return rs[1] ? rs[1] : rs[0] || rs;
    }
}
function getDomain(url) {
    return regexx(url, domainexp)
}

window.showarea = function() {
    var con = document.getElementById("hostingSite_extrator_wrapper_area");
    con.style.display = "block";
}
window.offarea = function() { //dissappeared when mouse move out this div
    var con = document.getElementById("hostingSite_extrator_wrapper_area");
    con.style.display = "none";
}

window.stopEv = function (e){
 if (e && e.stopPropagation)
        e.stopPropagation()
    else
        window.event.cancelBubble=true;
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#hostingSite_extrator_wrapper { font-size: large ! important; float:right;background:none repeat scroll 0 0 #FFFFDD; z-index:100; border: 1px outset #DDDDCC; margin: 0 0 1em 1em; padding: 0.5em 0.5em; position: fixed; top:5%;left:86%;right:0px; cursor: pointer;}');

addGlobalStyle('#hostingSite_extrator_wrapper_area { position:fixed;top:10%;left:0px;right:0px;  margin: 0 auto;padding: 0;  padding: 0.5em 1em; z-index:150;overflow-x: hidden;}');
addGlobalStyle('#hostingSite_extrator_wrapper_area_tt {background:#ffffff;border-bottom-color:#ff6633;   border-bottom-width:1px;border-top-width:1px;border-left-width:1px;border-right-width:1px;   solid   #ff6633;   color:   #DD4B39;   FONT-SIZE:   9pt;   FONT-STYLE:   normal;   FONT-VARIANT:   normal;   FONT-WEIGHT:   normal;   HEIGHT:   18px;   LINE-HEIGHT:   normal} ');  

var Extra = {

    init: function() {

        Extra.doc = document.top || document;
        Extra.win = window.top || window;
        Extra.host = Extra.doc.location ? Extra.doc.location.hostname: '';
        Extra.pathname = Extra.doc.location ? Extra.doc.location.pathname: '';
        Extra.protocol = Extra.doc.location ? Extra.doc.location.protocol: '';
        Extra.href = Extra.doc.location ? urldecode(Extra.doc.location.href) : '';
        Extra.head = Extra.doc.head ? urldecode(Extra.doc.head.outerHTML).replace(/\\/g, '') : '';
        Extra.body = Extra.doc.body ? urldecode(Extra.doc.body.outerHTML).replace(/\\/g, '') : '';
        Extra.cdwn = 0;
        Extra.inval = 0;
        Extra.passed = 0;
        Extra.service = null;
        Extra.title = Extra.extractorPageTitle();

    },

    extractorPageTitle: function() {
        var titleexp = new RegExp("<title>(.*)</title>", "ig");
        var titleResult = titleexp.exec(Extra.head);
        if (titleResult != null) {
            return titleResult[1];
        }
        return '';
    },

    extractorUrl: function() {
        console.log(Extra.title);
        var body = Extra.body;
        var csvResult = new Array();
        var result;
        while ((result = urlexp.exec(body)) != null) {
            //console.log(result);
            csvResult.push(result[0]);
            //alert (csvResult);
        }
        return csvResult;
    },

    //show div result
    showResult: function(data) {
        var wrapperDIV = Extra.doc.createElement("div");
        wrapperDIV.innerHTML = '<div style="position: relative;"><button id="hostingSite_extrator_wrapper"  onClick="window.showarea();return false;" >Crawl</button></div>';
        Extra.doc.body.insertBefore(wrapperDIV, Extra.doc.body.firstChild);

        var dataArea = Extra.doc.createElement("div");
        dataArea.innerHTML = '<div style="width:100%;height:100%"  onClick="window.offarea();return false;"><div id="hostingSite_extrator_wrapper_area" style="display:none;" ><div style="margin-bottom:5px; cursor: pointer; "><span onclick="window.offarea()" ><h3 style="color:#FFFFDD;">close</h3></span></div><div><textarea rows="3" cols="20" readonly="readonly" id="hostingSite_extrator_wrapper_area_tt" onclick="window.stopEv(event);return false" style="width:550px;height:300px;">' + data + '</textarea></div></div></div>';
        Extra.doc.body.insertBefore(dataArea, Extra.doc.body.lastChild);
    },

    // extractor hosting site
    extractorHostingSite: function(data) {
        //console.log(data);
        var hostingSite = new Array();
        var i;
        var result = '';
        for (i in data) {
            var url = data[i];
            var domain = getDomain(url);
            console.log(domain);
            if (!domain) {
                continue;
            }
            for (i in Extra.services) {
                var doc, service = Extra.services[i];
                //console.log(service);
                var hosts = service.hosts.replace(/\s/g, "") || "";
                if (!hosts) continue;
                var pattern = new RegExp(".?(" + hosts + "+)$", "i");
                if (doc = regexx(domain, pattern)) {
                    hostingSite.push(url);
                }
            }
        }

        return hostingSite;
    },

    showData: function(arrayUrl) {
        var x;
        var result = '';
        for (x in arrayUrl) {
            result = result+ Extra.title + '\t'+ Extra.href + '\t'+ arrayUrl[x] + '\n';
        }
        return result;
    },

    services: {
        cyberlocker: {
            hosts: "rapidshare.com| bitshare.com| wupload.com|wupload.cn| ul.to|uploaded.net|cloudzer.net|hentaiupload.com| easy-share.com|crocko.com | depositfiles.com| turbobit.net| rapidshare.com|hotfile.com|megaupload.com|filesonic.com | fileserve.com|wupload.com|uploadstation.com|netload.in|bitshare.com|letitbit.net|sms4file.com|u.to| oron.com|uploading.com|uploaded.to|crocko.com|share-online.biz|uload.to | depositfiles.com|megashares.com|turbobit.net|filefactory.com|freakshare.com | x7.to | letitbit.net|extabit.com| mediafire.com|hulkshare.com|zippyshare.com|vip-file.com|ziddu.com | unibytes.com|4fastfile.com|furk.net|gigasize.com|hitfile.net| filepost.com|rapidgator.net|filesflash.com|fiberupload.com|shareflare.net | jumbofiles.com|filegag.com|ryushare.com|filevelocity.com|filemates.com| luckyshare.com|lumfile.com|uptobox.com|fileswap.com|filerio.in| sendspace.com|bayfiles.com|asfile.com|filehost.ws|cramit.in | dl.free.fr|fileshare.in.ua|gigapeta.com|sharpfile.com|unextfiles.com| queenshare.com|asixfiles.com|rarefile.net|fastshare.cz|filestore.com.ua | miroriii.com|u.115.com|yunfile.com|netfolder.in|albafile.com| fileking.co|fileserving.com|hipfile.com|sharefiles4u.com|squillion.com| uploadjet.net|downloadprovider.me|fileplaneta.com|kuai.xunlei.com|ctdisk.com|mega.co.nz | gxp.cc|99pan.com|howfile.com|pan.baidu.com|easybytez.com| 1fichier.com|billionuploads.com|czshare.com|data.hu|edisk.cz| filerose.com|muchshare.net|ncrypt.in| pigsonic.com|putshare.com|rayfile.com|relink.us|share4web.com | upload.com.ua|uploadbaz.com|vidxden.com|dbank.com|119g.com|upload.net|ul.to|lumfile.eu|upload.com|cloudzer.net|clz.to|lumfile.se|megafiles.se|vmall.com | jheberg.net|multi-up.com|4up.me|bitoman.ru|euroshare.eu|4upfiles.com| filesega.com|getitbit.net|go4up.com|xlget.com|filesmelt.com | filetobox.com|mydisk.ge|xrfiles.ru|rock-video.ifolder.ru|ultramegabit.com | uploadhero.com|freespace.by|exoshare.com|project-free-upload.com| uploadorb.com|upthe.net|zooupload.com | ntupload.to|zalaa.com | yousendit.com|przeklej.net|filecloud.io|rnbload.com|sendspace.pl|mybloop.com| odsiebie.com|uploadbox.com|firstload.com|speedyshare.com|ultrafiles.com|filejungle.com| gogobox.com.tw|vdisk.cn|qupan.cc|1000eb.com|alfaupload.com|uloz.to|bezvadata.cz | hellshare.com|sharebeast.com|fileflyer.com|filereactor.com|filelaser.com|filemates.com|azushare.net | i-filez.com|esnips.com|uptodown.net|filedino.com|filedropper.com|fileshare.ro|flameupload.com | brontofile.com|coolshare.cz|cosmobox.org|dataport.cz|file-bit.net|filedefend.com|filedude.com | multiupload.nl|sendmyway.com|usaupload.net|biggerupload.com|bitroad.net|divshare.com|banashare.com| fileover.net|file-upload.net|fileupup.com|getzilla.net|hulkfile.com|kupload.org|load.to | longfiles.com|mirrorcreator.com|mixturecloud.com|mojofile.com|multishare.cz|myupload.dk|novafile.com| edisk.eu|kickload.com|midupload.com|sharpfile.com|idownloadgalore.com|bebasupload.com|cobrashare.sk | ok2upload.com|onlinedisk.ru|partage-facile.com|peejeshare.com|pixroute.com|prefiles.com|repofile.com| docstoc.com|filer.net|files.fm|filesavr.com|filesend.net|filestore.to|freshmaza.com | restfile.com|rockdizfile.com|share-rapid.com|socifiles.com|temp-share.com|tunescoop.com | fsx.hu|gamefront.com|gigaup.fr|leteckaposta.cz|maknyos.com|multiload.cz | pimpandhost.com|plunder.com|qshare.com|quickshare.cz|remixshare.com|rghost.net|scribd.com | up.4share.vn|upload.ee|uploadboost.com|vidreel.com|xfilesharing.com|xtraupload.de|kuaipan.cn| sharebee.com|share-links.biz|sharephile.com|shareplace.com|slingfile.com|ulozisko.sk|upload-il.com| f.xunlei.com|weiyun.com|vips100.com|qjwm.com|vdisk.weibo.com|yunpan.360.cn|yun.io | everbox.com|u.xunzai.com|shvns.com|163disk.com|126disk.com|webdisk.mytaoyuan.com|kongsifile.com | uppit.com|webshare.cz|wikiupload.com|yourfiles.biz|downupload.com|filefat.com|grupload.com| rusfolder.net|gokuai.com|asuswebstorage.com|box.com|filego.org|subscene.com|ufile.eu| shafiles.me|uploadhere.com|tongbupan.com|yimuhe.com|edudisk.cn|sudupan.com|diskes.com | amonshare.com|hostingbulk.com|fileuplo.de|freeuploads.fr|nowdownload.eu|uploaz.com|uploo.net| venusfile.com|flashstream.in|adrive.com|filecloud.com|fshare.vn|przeklej.pl | uploadcore.com|secureupload.eu|oteupload.com|cyberlocker.ch|brutalsha.re|ezzfile.it|megaload.it | aavg.net|filegig.com|uploading.to|migaload.com|upafile.com|ginbig.com|katzfiles.com|gbmeister.com | filemsg.com|narod.ru|namba.kz|megafilegarden.com|rodfile.com|sharefiles.co|egofiles.com | exclusivefaile.com|sharebase.to|speedshare.org|uploadzeal.com|filesabc.com|datafilehost.com | filecargo.com|freefilehosting.net|webfilehost.com|yourfilelink.com|filevice.com|4share.vn | filecanyon.com|bitupload.com|okupload.com|useupload.com|qfer.net|wikisend.com | filenurse.com|wizupload.com|diskme.com|turbo-bit.in|keep2share.cc|soshareit.com | amshare.co|basicupload.com|bego.cc|bigupload.com|datei.to|dynaupload.com| eyesfile.net|fileband.com|[.]filedownloads.org|fileopic.com|fileprohost.com|filesave.me | goldfile.eu|herosh.com|hostuje.net|hyperfileshare.com|idup.in|nekaka.com| netkups.com|nutfile.com|opendrive.com|ravishare.com|tempfiles.net|uplds.com|uplly.com | altervideo.net|clicktoview.org|donevideo.com|movdivx.com|putme.org|sharerepo.com|sharesix.com | sharevid.co|speedvid.tv|stageflv.com|stagevu.com|thefile.me|veervid.com|videopremium.tv|vidhog.com| vreer.com|watchfreeinhd.com|wupfile.com|fleon.me|skylo.me|videozed.net| uploadingit.com|solidfiles.com|sube.me|hugefiles.net|ufox.com|batshare.com|ompldr.org | ge.tt|fileim.com|qtyfiles.com|smartfile.com|upafacil.com|uploadblast.com|filemov.net|drivehq.com|cloudsafe.com| file.karelia.ru|files.mail.ru|filesnack.com|creafile.net|gigabase.com|ifile.ws|henchfile.com| upfile.biz|rashare.com|sfshare.com|webget.in|datacloud.to|stiahni.si|metfiles.com|sfshare.se| dizzcloud.com|catshare.net|junocloud.me|sanshare.com|fileparadox.in | zefile.com|filezy.net|magnovideo.com| 1st-files.com|allmyfiles.ca|fiberstorage.net|expressleech.com|clipshouse.com| filesso.com|files2upload.net|hellupload.com|uploadboy.com|upshared.com|terafiles.net|stahovadlo.cz| skydrive| mightyupload.com|megabitshare.com|rosharing.com|davvas.com| kingfiles.net|uploadinc.com|fileom.com| depfile.com|epicshare.net|fastsonic.net"
        },
        ugc: {
            hosts: ""
        }
    }
    
};

(function main() {
    Extra.init();
    var result = Extra.extractorUrl();
    result = Extra.extractorHostingSite(result);
    var data = Extra.showData(result);
    Extra.showResult(data);
})();

