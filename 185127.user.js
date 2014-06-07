// ==UserScript==
// @name        FimFiction Advanced
// @namespace   fimfiction
// @description Adds various improvements to FimFiction.net
// @icon        http://s3.amazonaws.com/uso_ss/icon/185127/large.png?1385835541
// @include     http://www.fimfiction.net/*
// @include     https://www.fimfiction.net/*
// @require     http://gsgd.co.uk/sandbox/jquery/easing/jquery.easing.1.3.js
// @require     http://flesler-plugins.googlecode.com/files/jquery.scrollTo-1.4.3.1-min.js
// @version     2.11
// @grant       none
// ==/UserScript==
//---------------------------------------------------------------------------------------------------
if (isJQuery())
//===================================================================================================
var logger = new Logger('FimFiction Advanced',1);
//===================================================================================================
try { try {
//---------------------------------------------------------------------------------------------------
/*\--------------------------------------------------------------------------------------------------
|*|  :: cookies.js ::
|*|  Syntaxes:
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
\*/ var docCookies={
getItem: function(sKey){return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(sKey).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1")) || null;},
setItem: function(sKey,sValue,vEnd,sPath,sDomain,bSecure){if(!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey))return false;var sExpires = "";if(vEnd){switch(vEnd.constructor){case Number: sExpires=vEnd === Infinity ?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+vEnd;break;case String: sExpires="; expires="+vEnd;break;case Date: sExpires="; expires="+vEnd.toUTCString();break;}}document.cookie=encodeURIComponent(sKey)+"="+encodeURIComponent(sValue)+sExpires+(sDomain ?"; domain="+sDomain:"")+(sPath ?"; path="+sPath:"")+(bSecure ?"; secure":"");return true;},
removeItem: function(sKey,sPath,sDomain){if(!sKey || !this.hasItem(sKey))return false;document.cookie=encodeURIComponent(sKey)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(sDomain ?"; domain="+sDomain:"")+(sPath ?"; path="+sPath:"");return true;},
hasItem: function(sKey){return(new RegExp("(?:^|;\\s*)"+encodeURIComponent(sKey).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=")).test(document.cookie);},
keys: function(){var aKeys=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/);for(var nIdx=0;nIdx<aKeys.length;nIdx++){aKeys[nIdx]=decodeURIComponent(aKeys[nIdx]);}return aKeys;}};

//----------------------------------------------------------------------------------------------------
logger.Log('Checkpoint 1: docCookies setup successfully');
//----------------------------------------------------------------------------------------------------
function reverse(me){return me != null ? me.split("").reverse().join() : me;}
function contains(me,it){return me != null ? me.indexOf(it)!=-1 : false;}
function startsWith(me,it){return me != null ? me.indexOf(it)==0 : false;}
function endsWith(me,it){return startsWith(reverse(me),reverse(it));}
function pickOne(arr,rare){
    if(rare != null && rare != undefined && Math.random() == 0.5)return rare[Math.floor(Math.random()*rare.length)];
    return arr[Math.floor(Math.random()*arr.length)];}
function pickNext(arr){return pickNextMin(arr,0);}
function pickNextMin(arr,min){return arr[Math.max((new Date()).getSeconds() % arr.length,min)];}
function normalize(me){
    if(me==null)return me;
    var result='';var space = true;
    for(var i=0;i<me.length;i++){result+=space?me[i].toUpperCase():me[i].toLowerCase();space=me[i]==' ';}
    return result;}
function replaceAll(find,replace,me){
    var escapeRegExp=function(str){return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");}
    return me.replace(new RegExp(escapeRegExp(find),'g'),replace);}
function urlSafe(me){return me.toLowerCase().replace(/[^a-z0-9_-]/gi,'-').replace(/--/,'-');}
//----------------------------------------------------------------------------------------------------
logger.Log('Checkpoint 2: string function setup successfully');
//----------------------------------------------------------------------------------------------------
var backgroundImages = [
    new BG("Light","url(http://fc02.deviantart.net/fs71/f/2013/342/4/3/cloth_by_comeha-d6x61vr.png)"),
    new BG("Dark","url(http://fc04.deviantart.net/fs71/f/2013/342/5/3/cloth_dark_by_comeha-d6x61vl.png)"),
    new BG("Rain","url(http://fc04.deviantart.net/fs70/f/2013/342/1/7/rain_by_comeha-d6x61uv.png)"),
    new BG("Wave","url(http://fc04.deviantart.net/fs70/f/2013/342/f/e/wave_by_comeha-d6x61um.png)"),
    new BG("Zecora","url(http://fc03.deviantart.net/fs70/f/2013/342/6/7/zecora_by_comeha-d6x61ta.png)"),
    new BG("Sunny Skies","url(http://fc05.deviantart.net/fs70/f/2013/342/8/b/sunny_days_by_comeha-d6x61up.png)"),
    new BG("Pinkie Pie","url(http://fc08.deviantart.net/fs71/f/2013/342/0/6/pinkie_0_by_comeha-d6x61v3.png) fixed right,url(http://fc08.deviantart.net/fs71/f/2013/342/0/6/pinkie_0_by_comeha-d6x61v3.png), url(http://fc09.deviantart.net/fs71/f/2013/342/a/2/pinkie_1_by_comeha-d6x61v0.png)"),
    new BG("Diary","url(http://fc03.deviantart.net/fs71/f/2013/342/d/1/book_0_by_comeha-d6x61t4.png) fixed bottom -150px right -50px no-repeat, url(http://fc08.deviantart.net/fs71/f/2013/342/e/0/star_by_comeha-d6x61us.png)"),
    new BG("School House","url(http://fc09.deviantart.net/fs70/f/2013/342/4/a/house_0_by_comeha-d6x61vh.png) fixed bottom left no-repeat, url(http://fc03.deviantart.net/fs71/f/2013/342/6/0/cloud_by_comeha-d6x61vj.png) fixed"),
    new BG("Sky","url(http://fc03.deviantart.net/fs71/f/2013/342/6/0/cloud_by_comeha-d6x61vj.png), url(http://fc08.deviantart.net/fs71/f/2013/342/e/0/star_by_comeha-d6x61us.png) fixed"),
    new BG("Twilight Sparkle", "url(http://fc06.deviantart.net/fs70/f/2013/344/b/c/twilight_1_by_comeha-d6xf5mk.png) fixed right,url(http://fc02.deviantart.net/fs71/f/2013/344/3/8/twilight_sparkle_by_comeha-d6xf54o.png),url(http://fc05.deviantart.net/fs71/f/2013/345/d/a/twilight_2_by_comeha-d6xja6o.png) fixed right"),
    new BG("Rarity", "url('http://fc03.deviantart.net/fs70/f/2013/351/4/c/rarity_1_by_comeha-d6yd7e2.png'),url('http://fc02.deviantart.net/fs71/f/2013/342/4/3/cloth_by_comeha-d6x61vr.png'),url('http://fc03.deviantart.net/fs71/f/2013/351/7/c/rarity_0_by_comeha-d6yd7dj.png')"),
    new BG("Cobble", "url('http://fc08.deviantart.net/fs70/f/2013/354/6/9/cobble_by_comeha-d6ymd5d.png')"),
    new BG("Glass", "url('http://fc01.deviantart.net/fs71/f/2013/354/1/6/glass_by_comeha-d6ymd58.png') top center"),
    new BG("Sonic Rainboom", "url('http://fc00.deviantart.net/fs70/f/2012/132/1/d/sonic_rainboom_by_knight33-d4zgfjy.jpg') fixed 100% center", "http://knight33.deviantart.com/art/Sonic-Rainboom-301417918"),
    new BG("Rainbow Dash", "url('http://fc01.deviantart.net/fs71/i/2013/269/9/8/rainbow_dash_by_up1ter-d6nz0tp.png') top left -500px no-repeat, url('http://fc09.deviantart.net/fs70/i/2012/067/2/0/rainbow_dash_by_up1ter-d4s3nbk.png') fixed bottom right -500px no-repeat, url('http://fc02.deviantart.net/fs70/i/2012/032/d/8/rainbow_dash_by_up1ter-d4obti3.png') fixed bottom left no-repeat", "http://up1ter.deviantart.com/"),
    new BG("PinkieScape", "url(http://fc02.deviantart.net/fs71/f/2014/021/b/1/land_by_comeha-d733yee.png) no-repeat fixed top 200px center / 100% auto, url(http://fc03.deviantart.net/fs71/f/2014/021/d/4/sky_by_comeha-d733ydu.png) local top left -300px / 100% auto"),
    new BG("Wool", "url(http://fc09.deviantart.net/fs71/f/2014/075/2/7/wool_by_comeha-d7aflw9.png)"),
    new BG("Lunar Nights", "url(http://fc02.deviantart.net/fs70/f/2014/075/f/8/lunar_nights_by_comeha-d7aflyd.png)"),
    new BG("Plain Denim", "url(http://fc02.deviantart.net/fs71/f/2014/093/c/b/feather_by_comeha-d7cvbmf.png),url(http://fc03.deviantart.net/fs71/f/2014/093/5/f/noise_by_comeha-d7cvbn9.png)"),
    new BG("Buy Some Apples", "url(http://fc02.deviantart.net/fs71/f/2014/093/c/b/feather_by_comeha-d7cvbmf.png),url(http://fc03.deviantart.net/fs71/i/2014/039/9/3/applejack_noms_an_apple_by_dasprid-d75nj5r.png) no-repeat fixed right / 100% auto,url(http://fc03.deviantart.net/fs71/f/2014/093/5/f/noise_by_comeha-d7cvbn9.png)", "http://benybing.deviantart.com/art/Applejack-noms-an-Apple-432759231")
];

var logos = [
    new BG("Default", "http://www.fimfiction-static.net/images/custom_banners/logo.png"),
    new BG("Rainbow Dash", "http://fc03.deviantart.net/fs71/f/2013/350/d/b/fimfic_rainbowdash_by_comeha-d6y58nl.png"),
    new BG("Twilight Sparkle", "http://fc07.deviantart.net/fs70/f/2013/350/9/3/fimfic_twilight_by_comeha-d6y58ng.png"),
    new BG("Pinkie Pie", "http://fc04.deviantart.net/fs71/f/2013/350/e/a/fimfic_pinkie_by_comeha-d6y5b8e.png"),
    new BG("Rarity", "http://fc06.deviantart.net/fs71/f/2013/351/b/7/fimfic_rarity_by_comeha-d6yauy1.png"),
    new BG("Applejack", "http://fc08.deviantart.net/fs70/f/2013/353/c/5/fimfic_apple_by_comeha-d6yisu2.png"),
    new BG("Fluttershy", "http://fc03.deviantart.net/fs71/f/2013/353/e/c/fimfic_fluttershy_by_comeha-d6yhsxx.png"),
    new BG("Lyra Heartstrings", "http://fc00.deviantart.net/fs71/f/2014/073/1/a/fimfic_lyra_by_comeha-d7a5mjk.png"),
    new BG(),
    new BG("Vinyl Scratch", "http://fc04.deviantart.net/fs70/f/2014/072/a/1/fimfic_vinyl_by_comeha-d7a0uto.png")
];
registerBanners([
    ["fluttershy_innocence", "http://fc03.deviantart.net/fs71/f/2013/357/e/3/fimfic_banner___innocence_by_comeha-d6z5pcf.png", "http://comeha.deviantart.com/art/Fimfic-Banner-Innocence-421849743", "rgb(255,197,84)"],
    ["sleeping_bath_bloom", "http://fc07.deviantart.net/fs71/f/2013/363/7/d/sleeping_bath_bloom_by_comeha-d6zwhn1.jpg", "http://junglepony.deviantart.com/art/Panties-and-Stockings-for-Apple-Bloom-357660193", "rgb(146,27,87)"],
    ["flutterby_dash", "http://fc04.deviantart.net/fs71/f/2013/364/d/7/flutterby_dash_by_comeha-d6zzy8w.jpg", "http://junglepony.deviantart.com/art/Cute-FlutterDash-355619590", "rgb(215,113,164)"],
    ["mommy_derp", "http://fc08.deviantart.net/fs71/f/2013/364/a/e/mommy_derp_by_comeha-d700c89.jpg", "http://junglepony.deviantart.com/art/Derpy-Mom-326785301", "rgb(239,237,150)"],
    ["flutter_bite", "http://fc07.deviantart.net/fs71/f/2014/016/3/d/flutterbite_by_comeha-d72ef26.jpg", "http://johnjoseco.deviantart.com/art/Just-One-Bite-422922104", "rgb(110,20,20)"],
    ["movie_night", "http://fc04.deviantart.net/fs71/f/2014/016/c/0/movie_night_by_comeha-d72eswd.png", "http://dracodile.deviantart.com/art/Movie-night-343553193", "rgb(112,69,130)"],
    ["anitpodes", "http://fc05.deviantart.net/fs71/f/2014/022/0/7/antipodes_by_comeha-d7383b9.jpg", "http://www.fimfiction.net/user/ToixStory", "rgb(236, 188, 106)"],
    ["steampunk", "http://fc07.deviantart.net/fs71/f/2014/026/0/b/steampunk_by_comeha-d73scy1.jpg", "http://hinoraito.deviantart.com/art/MLP-FIM-Commission-Steampunk-ponies-293033624", "rgb(118,77,23)"],
    ["flutter_bee", "http://fc09.deviantart.net/fs70/f/2014/072/b/6/flutterbee3_by_comeha-d7a0n4w.jpg", "http://atteez.deviantart.com/art/Flutterbee-437641542", "#92A43C"],
    ["cmc_roped", "http://fc06.deviantart.net/fs70/f/2014/072/6/d/cmc_roped_by_comeha-d7a0liy.jpg", "http://spittfireart.deviantart.com/art/Cutie-Mark-Crusaders-365513354", "#6485BE"]
]);
var defaultBG = $('body').css('background-image');
var defaultBGc = $('body').css('background-color');

var ColourNameMapping = {'#FFFFFF': 'White','#FFC0CB': 'Pink','#FFDAB9': 'PeachPuff','#DCDCDC': 'Gainsboro','#FFB6C1': 'LightPink','#FFE4B5': 'Moccasin','#FFDEAD': 'NavajoWhite','#F5DEB3': 'Wheat','#D3D3D3': 'LightGray','#AFEEEE': 'PaleTurquoise','#EEE8AA': 'PaleGoldenRod','#D8BFD8': 'Thistle','#B0E0E6': 'PowderBlue','#ADD8E6': 'LightBlue','#98FB98': 'PaleGreen','#B0C4DE': 'LightSteelBlue','#87CEFA': 'LightSkyBlue','#C0C0C0': 'Silver','#7FFFD4': 'Aquamarine','#90EE90': 'LightGreen','#DDA0DD': 'Plum','#F0E68C': 'Khaki','#FFA07A': 'LightSalmon','#87CEEB': 'SkyBlue','#EE82EE': 'Violet','#F08080': 'LightCoral','#FA8072': 'Salmon','#FF69B4': 'HotPink','#DEB887': 'BurlyWood','#E9967A': 'DarkSalmon','#D2B48C': 'Tan','#7B68EE': 'MediumSlateBlue','#F4A460': 'SandyBrown','#A9A9A9': 'DarkGray','#6495ED': 'CornFlowerBlue','#FF7F50': 'Coral','#DB7093': 'PaleVioletRed','#9370DB': 'MediumPurple','#BC8F8F': 'RosyBrown','#DA70D6': 'Orchid','#8FBC8B': 'DarkSeaGreen','#FF6347': 'Tomato','#66CDAA': 'MediumAquamarine','#ADFF2F': 'GreenYellow','#CD5C5C': 'IndianRed','#BA55D3': 'MediumOrchid','#BDB76B': 'DarkKhaki','#6A5ACD': 'SlateBlue','#4169E1': 'RoyalBlue','#40E0D0': 'Turquoise','#1E90FF': 'DodgerBlue','#48D1CC': 'MediumTurquoise','#FF1493': 'DeepPink','#778899': 'LightSlateGray','#8A2BE2': 'BlueViolet','#CD853F': 'Peru','#708090': 'SlateGray','#808080': 'Gray','#FF00FF': 'Magenta','#0000FF': 'Blue','#00BFFF': 'DeepSkyBlue','#5F9EA0': 'CadetBlue','#00FFFF': 'Cyan','#00FF7F': 'SpringGreen','#00FF00': 'Lime','#32CD32': 'LimeGreen','#7FFF00': 'Chartreuse','#9ACD32': 'YellowGreen','#FFFF00': 'Yellow','#FFD700': 'Gold','#FFA500': 'Orange','#FF8C00': 'DarkOrange','#FF4500': 'OrangeRed','#FF0000': 'Red','#9932CC': 'DarkOrchid','#7CFC00': 'LawnGreen','#4682B4': 'Steelblue','#00FA9A': 'MediumSpringGreen','#DAA520': 'GoldenRod','#DC143C': 'Crimson','#D2691E': 'Chocolate','#3CB371': 'MediumSeaGreen','#C71585': 'MediumVioletRed','#B22222': 'FireBrick','#9400D3': 'DarkViolet','#20B2AA': 'LightSeaGreen','#696969': 'DimGray','#00CED1': 'DarkTurquoise','#A52A2A': 'Brown','#0000CD': 'MediumBlue','#A0522D': 'Sienna','#483D8B': 'DarkSlateBlue','#B8860B': 'DarkGoldenRod','#2E8B57': 'SeaGreen','#6B8E23': 'OliveDrab','#228B22': 'ForestGreen','#8B4513': 'SaddleBrown','#556B2F': 'DarkOliveGreen','#8B008B': 'DarkMagenta','#00008B': 'DarkBlue','#008B8B': 'DarkCyan','#8B0000': 'DarkRed','#191970': 'MidnightBlue','#4B0082': 'Indigo','#800080': 'Purple','#000080': 'Navy','#008080': 'Teal','#008000': 'Green','#808000': 'Olive','#800000': 'Maroon','#2F4F4F': 'DarkSlateGray','#006400': 'DarkGreen','#000000': 'Black','#666666': 'Grey','#cccccc': 'Light Grey','#383838': 'Dark Grey','#be4343': 'Red','#be7a43': 'Orange','#afa426': 'Yellow','#7aaf26': 'Lime Green','#2caf26': 'Green','#26af6d': 'Turquoise','#26a4af': 'Light Blue','#265daf': 'Blue','#3c26af': 'Purple','#9426af': 'Violet','#af2673': 'Pink','#5f4432': 'Brown','#a66ebe': 'Twilight Sparkle','#5e51a3': 'Rarity','#e97135': 'Applejack','#ea80b0': 'Pinkie Pie','#6aaadd': 'Rainbow Dash','#e6b91f': 'Fluttershy'}
var ColorMappingKeys = (function() {
    var result = [];
    for (var i in ColourNameMapping) result.push(i);
    return result;})();
var ColourMappingNames = (function() {
    var result = [];
    for (var i in ColourNameMapping) result.push(ColourNameMapping[i]);
    return result;})();
var Spectrum = [0,75,72,70,67,109,60,105,24,114];
var Morecolors = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112];
var FimFiccolors = [113,114,115,116,117,118,119,120,121,122,123,124,125,126,127];
var Ponycolors = [128,129,130,131,132,133];

logger.Log('Checkpoint 3: BGs setup successfully');
//----------------------------------------------------------------------------------------------------
} catch (e) {logger.SevereException('unhandledException in Pre-init: {0}', e);}
//----------------------------------------------------------------------------------------------------
  
applyOneTime((document.location.href + ' ').split('fimfiction.net/')[1].trim());
logger.Log('Checkpoint 4: initial setup completed successfully');

if (!startsWith(document.location.href, 'http://www.fimfiction.net/manage_user/messages/')) {
    setInterval(loopUnspoiler, 500);
}

setInterval(function() {
    setup();
}, 1000);
logger.Log('Checkpoint 5: looping started successfully');

var nav_bar = $("div.nav_bar")[0].children[0];
logger.Log('Checkpoint 6: got nav_bar successfully');

if (nav_bar.children[3].children.length > 2) {
    var messageButton = nav_bar.children[3].children[2].children[1];
    if (messageButton.innerHTML == "") {
        var link = makeDropItem("Compose Message", "javascript:void();", "fa fa-envelope");
        $(link).attr("onclick", "compose_pm('','');");
        $(messageButton).append(link);
        link = makeDropItem("Inbox", "//www.fimfiction.net/messages/inbox", "fa fa-folder");
        $(messageButton).append(link);
        link = makeDropItem("Outbox", "//www.fimfiction.net/messages/sent", "fa fa-mail-forward");
        $(messageButton).append(link);
        link = makeDropItem("Deleted Items", "//www.fimfiction.net/messages/deleted", "fa fa-trash-o");
        $(messageButton).append(link);
    }
    
    var bellButton = nav_bar.children[5].children[2].children[1];
    changeLogo(bellButton, 0, "fa fa-comment");
    changeLogo(bellButton, 1, "fa fa-eye");
    changeLogo(bellButton, 2, "fa fa-check");
}

var second_nav = $('div.user_toolbar')[0];
second_nav = second_nav.children[second_nav.children.length - 1];

if (second_nav != null) {
    logger.Log('Checkpoint 7: got second_nav successfully');
    
    $(second_nav.children[0]).css("margin-left", "0px");
    $(second_nav.children[0]).css("border-left", "1px solid rgba(0, 0, 0, 0.2)");
    
    var but;
    if (second_nav.children.length > 4) {
        /*but = second_nav.children[4].children[1];
        
        changeLogo(but, 1, "fa fa-check", true);
        changeLogo(but, 2, "fa fa-rss", true);
        */
        but = second_nav.children[6].children[1];
    } else {
        but = second_nav.children[1].children[1];
    }
    
    if (but.children.length > 0) {
        for (var i = 0; i < but.children.length; i++) {
            if ($(but.children[i]).attr('href') == '/writing-guide') {
                changeLogo(but, i, "fa fa-book", true);
            }
        }
    }
}

$('.external_account').each(function() {
    var url = $(this.parentNode).attr('href');
    
    if (url != null) {
        var name = null;
        
        if (contains(url, '?')) {
            var params = url.split('?')[1].split('&');
            var nparams = [];
            for (var i = 0; i < params.length; i++) {
                var p = params[i].split('=');
                if (p[0] == 'DisplayNameFF') {
                    name = p[1];
                    break;
                } else {
                    nparams.push(params[i]);
                }
            }
            url = url.split('?')[0] + (nparams.length > 0 ? '?' + nparams.join('&') : '');
        }
        
        if (name == null) {
            var urlBackup = url;
            url = url.toLowerCase();
            try {
                if (startsWith(url, 'mailto:')) {
                    name = 'Email ' + $('.bio-content').parent().find('.user-box-level-1 a').text() + "\nat " + url.replace('mailto:','');
                    url = '';
                } else if (contains(url, '.deviantart.') || contains(url, '.tumblr.')) {
                    url = getSite(url);
                    name = url.split('.')[0];
                    url = url.substring(name.length + 1, url.length);
                } else if (contains(url, 'steamcommunity')) {
                    name = url.split('/id/')[1].split('/')[0]
                    url = getSite(url);
                } else if (contains(url, 'intensedebate.')) {
                    name = url.split('/people/')[1].split('/')[0]
                    url = getSite(url);
                } else if (contains(url, 'twitter.')) {
                    name = url.split('/').reverse()[0];
                    url = getSite(url);
                } else if (contains(url, '.fanfiction.')) {
                    name = url.split('~')[1];
                    url = getSite(url);
                } else if (contains(url, '.minecraftforum.')) {
                    name = url.split('/user/')[1];
                    name = name.substring((parseInt(name) + '-').length, name.length);
                    url = getSite(url);
                } else if (contains(url, 'tvtropes.')) {
                    name = url.split('/tropers/')[1];
                    url = getSite(url);
                } else if (contains(url, '/user/')) {
                    name = url.split('/user/')[1].split('/')[0];
                    url = getSite(url);
                }
            } catch (e) {
                name = null;
                url = urlBackup;
            }
        }
        
        if (name != null) {
            if (name.toLowerCase() == 'knighty' || name.toLowerCase() == 'knighty33' || name.toLowerCase() == 'knight33') {
                name = name.toLowerCase();
            } else {
                name = normalize(name);
            }
            $(this.parentNode).attr('title', name + (url == '' ? '' : '\non ' + getSite(url)));
        } else {
            $(this.parentNode).attr('title', url);
        }
        
        if ($(this).attr('src') == '//www.fimfiction-static.net/images/external_accounts/other.png') {
            $(this).attr('src', getFavicon(url));
            $(this).error(function() {
                $(this).attr('src', '//www.fimfiction-static.net/images/external_accounts/other.png');
            });
        }
    }
});

logger.Log('Checkpoint 7.5: set account logos successfully');

var swit = getElementByContent("a", "+ Switch to full view");
if (swit == null) {
    swit = getElementByContent("a", "- Switch to compact view");
}

if (swit != null) {
    logger.Log('Checkpoint 8: got swit successfully');
    
    var a = $("<a style=\"color:rgba(0,0,0,0.7);padding-left:10px\" href=\"javascript:void();\">+ List Names</a>");
    $(a).click(listNames);
    
    $(swit.parentNode).append(a);
    $(swit.parentNode.parentNode).css("width", "100%");
    
    makeStyle("\
                .listText {\
                    padding: 8px;\
                    color: rgb(68, 68, 68);\
                    width: 100%;\
                    border: 1px solid rgb(204, 204, 204);\
                    font-size: 1.1em;\
                    font-family: 'Segoe UI',Arial;\
                    -moz-box-sizing: border-box;\
                    outline: medium none;\
                    transition: border-color 0.25s ease 0s, background-color 0.25s ease 0s;\
                    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.07) inset;\
                    background-color: rgb(244, 244, 244);\
                    text-shadow: 1px 1px rgba(255, 255, 255, 0.8);\
                    vertical-align: middle;}\
                .listText:focus {\
                    background-color: rgb(232, 239, 246);\
                    border-color: rgba(0, 0, 0, 0.2);\
                    text-shadow: none;}");
}

if (isMyBlogPage()) {
    logger.Log('is_users_blog=true');
    var posts = getElementsByAttributeValue("div", "class", "content_box blog_post_content_box");
    logger.Log(posts.length + ' posts found');
    if (posts.length == 0) {
        logger.Log('creating notice..');
        var nopost = document.createElement("div");
        
        var page = $("div.page_list")[0];
        if (page != null) {
            $(page).before(nopost);
            
            $(nopost).attr("class", "content_box blog_post_content_box");
            $(nopost).css("margin-top", "0px");
            
            $(nopost).append("\
                <div class=\"content_box_header\">\
                    <h2>\
                        <span class=\"resize_text\" data-multiline=\"true\" data-minimum-size=\"0.6\" data-start-size=\"1.2\" data-max-height=\"80\" style=\"font-size: 1.2em;\">\
                            <a href=\"//www.fimfiction.net/manage_user/edit_blog_post\">Start a blog</a>\
                        <span/>\
                    </h2>\
                </div>");
            var message = $("<div class=\"main\"></div>");
            $(nopost).append(message);
            var messageInner = $("<div class=\"blog_post_content\" />");
            $(message).append(messageInner);
            messageInner.append("<p>You have no blog posts. </p><a href=\"//www.fimfiction.net/manage_user/edit_blog_post\">Click here to make your first blog post</a>");
        }
        logger.Log('Notice added');
    }
}
     
//-----------------------------------------------------------------------------------------------------------------------------------------
var belle;
if (getSweetieEnabled()) {
    logger.Log('sweetie_enable=true');
    setupSweetie();
}
logger.Log('Checkpoint 8.5: sweetie Scepter setup successfully');
//-----------------------------------------------------------------------------------------------------------------------------------------

logger.Log('Checkpoint 9: starting settings Tab setup');
//--------------------------------------------------------------------------------------------------
try {
//--------------------------------------------------------------------------------------------------

var color = getBGColor();
updateBackground(color);

if (getIsLoggedIn()) {
    var bkm = $('<a href="/manage_user/bookmarks" class="bkm_button button"><i class="fa fa-bookmark"></i><span class="bkm_number" /></a>');
    var button = $('<div class="user_drop_down_menu"><div class="menu_list" style="width:170px;"><a class="button" href="/manage_user/bookmarks"><i class="fa fa-bookmark" />View All Bookmarks</a></div></div>');
    button.prepend(bkm);
    bkm = $('<a class="button bkm_removeAll" href="javascript:void();"><i class="fa fa-trash-o" />Remove All</a>');
    bkm.click(function() {
        removeAllBookmarks();
        $('.bkm_button').removeClass('new');
        $('.bkm_number').text('Bookmarks');
    });
    button.find('.menu_list').append(bkm);
    
    $('.user_toolbar audio').before(button);
    
    var marks = getTotalBookmarks();
    if (marks > 0) {
        $('.bkm_button').addClass('new');
        $('.bkm_number').text(marks);
    } else {
        $('.bkm_number').text('Bookmarks');
    }
    
    var btab = makeSettingsTab('Bookmarks', 'bookmarks', 'fa fa-bookmark');
    if (btab.HasInit()) {
        $('#SettingsPage_Parent').css('min-height', '607px');
        getBookmarksGui(btab);
    }
}

var tab = makeSettingsTab("Advanced", "fimfiction_advanced", "fa fa-wrench");

tab.StartEndSection("General Settings");

var enableSws = tab.AddCheckBox("sb", "Show Sweetie Scepter");
if (enableSws != null) {
    enableSws.checked = getSweetieEnabled();
    $(enableSws).click(function() {
        setSweetieEnabled(this.checked);
        if (belle != null) {
            $(belle).css('display',this.checked ? "block" : "none");
        } else if (this.checked) {
            setupSweetie();
        }
    });
    logger.Log('setup enableSws');
}

var wideAT = tab.AddCheckBox("wat", "Wide Author's Notes");
if (wideAT != null) {
    wideAT.checked = getWideNotes();
    $(wideAT).click(function() {
        setWideNotes(this.checked);
    });
    logger.Log('setup wideAT');
}
    
var chapWid = tab.AddTextBox("cwt", "Chapter Width");
if (chapWid != null) {
    AppendPopup("Acceps values in three formats:em, px, and %<br />Eg. 80px, 5em, 100%<br />If no format is specified em will be used<br />Default: 46em", chapWid);
    chapWid.value = getStoryWidth();
    $(chapWid).change(function() {
        var val;
        var form = 'em';
        try {
            val = parseInt(this.value);
            if (endsWith(this.value, 'em')) {
                form = 'em';
            } else if (endsWith(this.value, 'px')) {
                form = 'px';
            } else if (endsWith(this.value, '%')) {
                form = '%';
            }
        } catch (e) {
            val = 46;
            form = 'em';
        }
        if (form == '%') {
            if (val > 100) val = 100;
        }
        if (val < 0) val = 0;
        setStoryWidth(val + form);
        this.value = getStoryWidth();
    });
}

var title = document.getElementById("title");

var enableHb = tab.AddCheckBox("hb", "Hide Banner");
if (enableHb != null) {
    enableHb.checked = getTitleHidden();
    enableHb.onclick = function() {
        setTitleHidden(this.checked);
        if (this.checked) {
            $(title).addClass("titleHidden");
        } else {
            $(title).removeClass("titleHidden");
        }
    };
    logger.Log('setup enableHb');
}

var isSliding = false;
var time = getTime(getSlide());
var fade = null;

if (title != null) {
    $(title.children[1]).prepend('<div id="fade_banner_image" style="width:100%;height:100%;left:-1px;" />');
    fade = $("#fade_banner_image");
    updateSlide();
    logger.Log('setup slideshow');
}

var slide = tab.AddDropDown("sl", "Banner Slide Show", ["Off", "One Minute", "Three Minutes", "Five Minutes", "Ten Minutes", "Fast"]);
if (slide != null) {
    slide.selectedIndex = getSlide();
    $(slide).change(function() {
        setSlide(this.selectedIndex);
        time = getTime(this.selectedIndex);
        if (!isSliding) {
            updateSlide();
        }
    });
    logger.Log('setup slide');
}

var shuffle = tab.AddCheckBox("shuf", "Shuffle Slide Show");
if (shuffle != null) {
    shuffle.checked = getShuffle();
    $(shuffle).click(function() {
        setShuffle(this.checked);
    });
}

var dec = (new Date()).getMonth() == 11;
var snower;
var snowing = getSnowing();
if (snowing < 2) {
    if (snowing == 0 || dec) {
        snower = new snowBG();
        snower.init();
    }
    logger.Log('setup Ultra Snow');
}

var enableUSnow = tab.AddDropDown("us", "Ultra Snow", ["Always On", "Default", "Always Off"]);
if (enableUSnow != null) {
    enableUSnow.selectedIndex = snowing;
    $(enableUSnow).change(function() {
        setSnowing(this.selectedIndex);
        if (this.selectedIndex > 1) {
            if (snower != null) {
                snower.stop();
            }
        } else {
            if (this.selectedIndex == 0 || dec) {
                if (snower == null) {
                    snower = new snowBG();
                    snower.init();
                } else {
                    snower.start();
                }
            }
        }
    });
    logger.Log('setup enableUSnow');
}

var pauseSnowBG = tab.AddCheckBox('pus', 'Pause Ultra Snow when lost focus');
if (pauseSnowBG != null) {
    pauseSnowBG.checked = getSaveFocus();
    $(pauseSnowBG).click(function() {
        setDocCookie('ultra_snow_save_focus', this.checked);
        if (snower != null) {
            snower.SetSaveFocus(this.checked);
        }
    });
}

tab.StartEndSection("Colours and Customization");

var logo = getOldLogo();
if (logo == -1) {
    var images = [];
    for (var i = 1; i < logos.length; i++) {
        images.push('url(' + logos[i].Css + ')');
    }
    $('body').append('<div style="width:0 !important;height:0 !important;background: ' + images.join(', ') + ' !important;" />');
}
updateLogo(logo);

var oldLogo = tab.AddDropDown("ologo", "Logo", getLogoNames());
if (oldLogo != null) {
    $(oldLogo.children[0]).after('<option value="-1">Random</option>');
    $(oldLogo).val(logo);
    $(oldLogo).change(function() {
        setOldLogo($(this).val());
        updateLogo($(this).val());
    });
    logger.Log('setup oldLogo');
}

var logoO = getLogoO();
updateLogoO(logoO);

var enableHo = tab.AddSlider("ho", "Logo Opacity", logoO, 10, 100);
if (enableHo != null) {
    $(enableHo).change(function() {
        setLogoO(this.value);
        updateLogoO(this.value);
    });
}

var backgroundImg = null;
var colorPick = tab.AddColorPick("bg", "Background Colour", color == defaultBGc ? '' : color, function(me) {
    updateBackground(me.value);
    if (backgroundImg != null) {
        for (var i = 0; i < backgroundImg.length - 1; i++) {
            $(backgroundImg[i].children[0]).css("background-color", me.value);
        }
    }
});

backgroundImg = tab.AddPresetSelect("bgI", "Background Image", backgroundImages.length + 1, true, 0);
if (backgroundImg != null) {
    for (var i = 0; i < backgroundImages.length; i++) {
        backgroundImages[i].Setup(backgroundImg[i + 1], color, i);
    }
    
    backgroundImg[0].children[1].innerHTML = 'Default';
    $(backgroundImg[0].children[0]).css("background-color", color);
    $(backgroundImg[0].children[0]).css("opacity", "0.8");
    $(backgroundImg[0]).css("background-image", defaultBG);
    $(backgroundImg[0]).click(function() {
        setBackgroundImg(-1);
        $('body').css('background','');
        colorPick.value = '';
        $(colorPick).change();
        setDocCookie("bgColor", defaultBGc);
    });
    
    logger.Log('setup backgroundImg');
}

var customBannerindex = -1;
var customBanner = getCustomBanner();

if (customBanner != null) {
    registerBanner("Custom", customBanner[0], "", customBanner[1], customBanner[2]);
    customBannerindex = safeGetThemeArray().length - 1;
}

try {
    $('.theme_selector_left > a')[0].onclick = function() {
        theme--;
        if (theme < 0) theme = safeGetThemeArray().length - 1;
        chooseTheme(theme, true);
    };
    $('.theme_selector_right > a')[0].onclick = function() {
        theme++;
        if (theme >= safeGetThemeArray().length) theme = 0;
        chooseTheme(theme, true);
    };
} catch (e) { }

finaliseThemes();

var cban = tab.AddPresetSelect("bannerCust", "Custom Banner", 1, false);
if (cban != null) {
    cban[0].children[1].innerHTML = '<i class="fa fa-pencil fa-5x" />';
    $(cban[0]).css("width", "700px");
    $(cban[0]).css("text-align", "center");
    $(cban[0].children[0]).css("color", "black");
    $(cban[0].children[0]).css('text-shadow', '1px 1px 0px rgba(255, 255, 255, 0.15)');
    $(cban[0]).css("background-size", "100%");
    if (customBanner != null) {
        $(cban[0].children[0]).append(customBanner[0].split('/').reverse()[0].split('.')[0]);
        $(cban[0].children[0]).css("background-color", customBanner[1]);
        $(cban[0]).css("background-image", 'url("' + customBanner[0] + '")');
    }
    $(cban).click(function() {
        var pop = makeGlobalPopup("Edit Custom Banner", "fa fa-pencil", 10);
        
        $(pop.parentNode).css('width', '700px');
        
        $(pop).append('<table class="properties"><tbody /></table>');
        
        $(pop).append('<div style="margin:5px;" id="add_banner_error" class="error-message hidden">Invalid Color</div>');
        
        var footer = $('<div class="drop-down-pop-up-footer" />');
        $(pop).append(footer);
        
        var done = $('<button class="styled_button"><i class="fa fa-save" />Save</button>');
        footer.append(done);
        
        var preview = $('<button class="styled_button styled_button_blue"><i class="fa fa-eye" />Preview</button>');
        footer.append(preview);
        
        var reset = $('<button class="styled_button styled_button_red"><i class="fa fa-trash-o" />Reset</button>');
        footer.append(reset);
        
        var row = document.createElement('tr');
        $(pop.children[0].children[0]).append(row);
        
        $(row).append('<td class="label">Image Url\n(1300x175px)</td>');
        $(row).append('<td><div /></td>');
        row = row.children[1].children[0];
        
        var input = $('<input type="url" placeholder="Banner Image" />');
        $(row).append(input);
        
        row = document.createElement('tr');
        $(pop.children[0].children[0]).append(row);
        
        $(row).append('<td class="label">Image Position</td>');
        $(row).append('<td><div /></td>');
        row = row.children[1].children[0];
                
        var alignVert = $('<select style="display:inline-block;width:25%;"><option>top</option><option>center</option><option>bottom</option></select>');
        $(row).append(alignVert);
        var posY = $('<input style="display:inline-block;width:25%;" type="text" placeholder="auto" />');
        $(row).append(posY);
        
        var alignHor = $('<select style="display:inline-block;width:25%;"><option>left</option><option>center</option><option>right</option></select>');
        $(row).append(alignHor);
        var posX = $('<input style="display:inline-block;width:25%;" type="text" placeholder="auto" />');
        $(row).append(posX);
        
        row = document.createElement('tr');
        $(pop.children[0].children[0]).append(row);
        
        $(row).append('<td class="label">Banner Colour</td>');
        $(row).append('<td><div /></td>');
        row = row.children[1].children[0];
        
        var RInput = $('<input type="text" placeholder="Red" />');
        $(row).append(RInput);
        AppendPopup("Red<br>Range: 0-255", RInput);
        
        var GInput = $('<input type="text" placeholder="Green" />');
        $(row).append(GInput);
        AppendPopup("Green<br>Range: 0-255", GInput);
        
        var BInput = $('<input type="text" placeholder="Blue" />');
        $(row).append(BInput);
        AppendPopup("Blue<br>Range: 0-255", BInput);
        
        var AInput = $('<input type="text" placeholder="Opacity" />');
        $(row).append(AInput);
        AppendPopup("Opacity<br>Range: 0.0-1.0", AInput);
        
        var GuessInput = $('<button class="styled_button styled_button_blue"><i class="fa fa-camera" />Guess from Current</button>');
        $(row).append(GuessInput);
        $(GuessInput).click(function() {
            var color = $('.user_toolbar').css('background-color');//themes[theme][3];
            if (color == '') {
                color = 'rgb(146,27,87)';
            }
            color = color.split('(')[1].split(')')[0];
            color = replaceAll(' ', '', color).split(',');
            
            $(RInput).val(color[0]);
            $(GInput).val(color[1]);
            $(BInput).val(color[2]);
            $(AInput).val(color.length == 4 ? color[3] : 1);
        });
                
        var ch = function(me) {
            if ($.isNumeric($(me).val())) {
                var val = parseInt($(me).val());
                if (val < 0) {
                    me.val(0);
                } else if (val > 255) {
                    me.val(255);
                }
                return true;
            }
            return false;
        }
        var a_ch = function(me) {
            if ($.isNumeric($(me).val())) {
                var val = parseFloat($(me).val());
                if (val < 0) {
                    me.val(0);
                } else if (val > 1) {
                    me.val(1);
                }
                return true;
            }
            return false;
        }
        
        
        var updateView = function(save) {
            if (ch(RInput) && ch(GInput) && ch(BInput) && a_ch(AInput)) {
                var url = input.val();
                var color = RInput.val() + ',' + GInput.val() + ',' + BInput.val();
                
                var vert = alignVert.val();
                var hor = alignHor.val();
                var x = 0;
                try {
                    if (posX.val() != '') {
                        x = parseInt(posX.val());
                    }
                } catch (e) {
                    x = 0;
                }
                
                var y = 0;
                try {
                    if (posY.val() != '') {
                        y = parseInt(posY.val());
                    }
                } catch (e) {
                    y = 0;
                }
                
                var pos = vert + (vert != 'center' ? ' ' + y + 'px' : '') + ' ' + hor + (hor != 'center' ? ' ' + x + 'px' : '');
                
                if (AInput.val() != '1' && AInput.val() != '') {
                    color = 'rgba(' + color + ',' + AInput.val();
                } else {
                    color = 'rgb(' + color;
                }
                color += ')';
                
                if (save) {
                    setCustomBanner(url, color, pos);
                
                    if (customBannerindex > -1) {
                        themes[customBannerindex] = ["Custom", url, "", color, pos];
                    } else {
                        themes.push(["Custom", url, "", color, pos]);
                        customBannerindex = themes.length - 1;
                    }
                }
                
                cban[0].children[0].innerHTML = url.split('/').reverse()[0].split('.')[0];
                $(cban[0].children[0]).css("background-color", themes[customBannerindex][3]);
                $(cban[0]).css("background-image", 'url("' + themes[customBannerindex][1] + '")');
                $(cban[0]).css("background-position", themes[customBannerindex][4]);
                
                if (save) {
                    chooseTheme(customBannerindex, save);
                } else {
                    finaliseThemes();
                }
                
                $('#add_banner_error').addClass('hidden');
                return true;
            }
            $('#add_banner_error').removeClass('hidden');
            return false;
        };
        
        var hasPre = false;
        $(preview).click(function() {
            hasPre = true;
            if (ch(RInput) && ch(GInput) && ch(BInput) && a_ch(AInput)) {
                var url = input.val();
                var color = RInput.val() + ',' + GInput.val() + ',' + BInput.val();
                
                var vert = alignVert.val();
                var hor = alignHor.val();
                var x = 0;
                try {
                    if (posX.val() != '') {
                        x = parseInt(posX.val());
                    }
                } catch (e) {
                    x = 0;
                }
                
                var y = 0;
                try {
                    if (posY.val() != '') {
                        y = parseInt(posY.val());
                    }
                } catch (e) {
                    y = 0;
                }
                
                var pos = vert + (vert != 'center' ? ' ' + y + 'px' : '') + ' ' + hor + (hor != 'center' ? ' ' + x + 'px' : '');
                                
                if (AInput.val() != '1' && AInput.val() != '') {
                    color = 'rgba(' + color + ',' + AInput.val();
                } else {
                    color = 'rgb(' + color;
                }
                color += ')';
                
                changeBanner(url, color, pos);
                $('#add_banner_error').addClass('hidden');
            } else {
                $('#add_banner_error').removeClass('hidden');
            }
        });
        $(reset).click(function() {
            unsetCustomBanner();
            if (customBannerindex > -1) {
                themes.splice(customBannerindex, 1);
                if (getCookie('selected_theme') == 'Custom') {
                    chooseTheme(0, true);
                }
                customBannerindex = -1;
            }
            
            cban[0].children[0].innerHTML = '';
            $(cban[0].children[0]).css("background-color", "#fff");
            $(cban[0]).css("background-image", 'none');
            finaliseThemes();
            $("#message_close_button").click();
        });
        $(done).click(function() {
            hasPre = false;
            if (updateView(true)) {
                $("#message_close_button").click();
            }
        });
        $("#message_close_button").mousedown(function() {
            if (hasPre) {
                finaliseThemes();
            }
        });
        
        customBanner = getCustomBanner();
        if (customBanner != null) {
            $(input).attr("value", customBanner[0]);
            
            var color = customBanner[1].split('(')[1].split(')')[0];
            color = replaceAll(' ', '', color).split(',');
            
            $(RInput).val(color[0]);
            $(GInput).val(color[1]);
            $(BInput).val(color[2]);
            $(AInput).val(color.length == 4 ? color[3] : 1);
            
            var poss = customBanner[2].split(' ');
            var i = 0;
            
            alignVert.val(poss[i]);
            if (poss[i] != 'center') {
                posY.val(poss[++i]);
            }
            alignHor.val(poss[++i]);
            if (poss[i] != 'center') {
                posX.val(poss[++i]);
            }

        }
        
        position(pop.parentNode.parentNode, 'center', 'center');
    });
    logger.Log('setup cban');
}

tab.StartEndSection("Signatures");

var sigText = tab.AddTextArea("sig", '', getSig());
if (sigText != null) {
    $(sigText).css("min-height", "150px");
    $(sigText).css("min-width", "100%");
    $(sigText).css("resize", "vertical");
    AppendPopup("<u>Magic Strings</u><br >\
        <div style='display:table;white-space:nowrap;'><div style='display:table-cell;padding-right:5px;'>%name% - the name of the current user<br />\
        %message% - posted comment<br />\
        %year% - The Year eg: 2014<br />\
        %MONTH% - Month of year<br />\
        %DAY% - Day of month</div>\
        <div style='display:table-cell;padding-right:5px;'>%month% - Name of month<br />\
        %day% - Day of Week<br />\
        %hour% - Current hour in 24 hour format<br />\
        %min% - Minute<br />\
        %sec% - Second</div></div>", sigText);
    var sigPrev = $('<div class="sigPreview" style="min-height:150px;min-width:100%;" />');
    $(sigText).after(sigPrev);
    $(sigText).change(function() {
        setSig(this.value);
    });
    $(tab.AppendResetButton(sigText)).click(function() {
        sigText.value = defSig();
        setSig(sigText.value);
    });
    
    var userTile = getUserCommentThumb(128);
    $(userTile).attr('style', 'float:right;background:none;border:none;');
    $($(sigText).parent().parent().parent().children()[0]).append(userTile);
    
    var previewButton = tab.AppendButton(sigText, 'Preview');
    $(previewButton).addClass('previewButton');
    $(previewButton).click(function() {
        if ($(sigText).hasClass('sigPreviewing')) {
            $(sigText).removeClass('sigPreviewing');
            $(sigPrev).html('');
            this.innerHTML = 'Preview';
            $(this).attr('class', 'styled_button styled_button_blue previewButton');
        } else {
            $(sigPrev).html(previewSig());
            $(sigText).addClass('sigPreviewing');
            this.innerHTML = 'Edit';
            $(this).attr('class', 'styled_button styled_button_green previewButton');
        }
    });
    logger.Log('setup sigText');
}

//--------------------------------------------------------------------------------------------------
} catch (e) {logger.SevereException('Unhandled Exception in Settings Tab: {0}', e); }
//--------------------------------------------------------------------------------------------------

logger.Log('Checkpoint 10: settings Tab setup completed Succesfully');
var styleSheet = "\
#pm_content {\
    resize: none;\
    height: 200px;}\
.bkm_button.new:not(hover) {\
    background-color: #AA9922;}\
.bkm_button.new:hover, .user_drop_down_menu:hover .bkm_button.new {\
    background-color: #9A8912 !important;}\
.bookmark_item {\
    border-bottom: solid 1px grey;\
    padding-top: 5px;}\
.bookmark_img {\
    max-height: 55px;\
    max-width: 100px;\
    margin-right: 10px;\
    border: solid gray 3px;\
    border-radius: 3px;}\
.bookmark_item .chapter {\
    font-size: 1.8em;\
    padding: 0px;\
    line-height: 1em;}\
.bookmark_item .subText, .bookmark_item .subText a {\
    color: #888;}\
#chapter_edit_form textarea {\
    width: 100% !important;\
    resize: y;}\
.bookmark_marker {\
    background-color: #B93838;\
    left: -10px;\
    top: 4px;\
    line-height: 2.5em;\
    color: #FFF;\
    margin-right: -8px;\
    float: left;\
    font-size: 0.85em;\
    font-weight: bold;\
    border: 1px solid rgba(0, 0, 0, 0.15);\
    box-shadow: -1px 2px 1px rgba(0, 0, 0, 0.2), 0px 0px 8px rgba(0, 0, 0, 0.2) inset;\
    position: relative;\
    text-shadow: -1px -1px rgba(0, 0, 0, 0.1);\
    font-family: Constantia,Serif;\
    width: 150px;\
    height: 32px;\
    cursor: pointer;\
    display: none;\
    margin-top: -16px;}\
.bookmark_marker:before {\
    content: ' ';\
    display: block;\
    width: 0px;\
    height: 0px;\
    border-right: 9px solid #7D1F1F;\
    border-bottom: 9px solid transparent;\
    position: absolute;\
    bottom: -10px;\
    left: -1px;}\
.bookmark_marker:after {\
    content: '';\
    font-family: 'FontAwesome';\
    transform: rotate(45deg);\
    float: right;\
    margin-right: 10px;\
    line-height: 30px;}\
#user_page_editing_toolbar img[src='//www.fimfiction-static.net/images/icons/watch_on.png'] {\
    display: none;}\
#user_page_editing_toolbar img[src='//www.fimfiction-static.net/images/icons/watch_on.png'] + span:before {\
    content: '';\
    font-family: 'FontAwesome';\
    line-height: 0px;\
    font-size: 16px;\
    margin-right: 3px;\
    color: rgb(90,90,90);\
    text-shadow: 0 2px 1px rgba(120,120,120,0.5);}\
@keyframes sceptre_down {\
    0% {transform: none;}\
    100% {transform: rotate(90deg);}}\
@keyframes sceptre_up {\
    0% {transform: rotate(90deg);}\
    100% {transform: none;}}\
@keyframes shake_shake {\
    0% {transform: none;}\
    25% {transform: rotate(-2deg);}\
    50% {transform: none;}\
    75% {transform: rotate(2deg);}\
    100% {transform: none;}}\
.wobbly_image {\
    animation: shake_shake 0.25s linear infinite;}\
.mark_all_holder {\
    display:inline;\
    cursor:pointer;\
    margin-right:5px;}\
.mark_all_holder:hover i {\
    color: rgb(82, 149, 29);}\
.all_chapters_hidden {\
    display: none;\
    text-align: center;}\
.chapters_compact .all_chapters_hidden {\
    display: block;}\
.chapter_highlighted {\
    background: rgb(48, 250, 255);\
    transition: background 0.5s ease !important;}\
.message:before {\
    content: '';}\
.global_popup input[type='text'], .global_popup input[type='url'] {\
    padding:8px;\
    width:100%;\
    border:1px solid rgb(204, 204, 204);\
    background:none repeat scroll 0% 0% rgb(248,248,248);\
    outline:medium none;\
    color:rgb(51,51,51);\
    box-shadow:0px 2px 4px rgba(0,0,0,0.1) inset;\
    border-radius:3px;\
    margin:5px 0px;}\
a:hover .bg_source_link {\
    opacity: 1;\
    color: rgba(255, 255, 255, 0.8);\
    text-decoration: none;}\
.bg_source_link {\
    margin: 3px 3px 3px;\
    position: absolute;\
    right: 0px;\
    bottom: 0px;\
    transition: opacity 0.25s ease;\
    opacity: 0;\
    line-height: 1em;\
    background-color: rgba(0, 0, 0, 0.7);\
    color: rgba(255, 255, 255, 0.8);\
    font-size: 0.7em;\
    padding: 5px 10px;\
    text-decoration: none;\
    border-radius: 3px;\
    border: 1px solid rgba(0, 0, 0, 0.3);\
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.2) inset;\
    font-family: 'Segoe UI';\
    text-shadow: 1px 1px rgba(0, 0, 0, 0.3);}\
.titleHidden {\
    height: 50px !important;}\
.titleHidden:hover {\
    height: 175px !important;}\
.collapsable.collapsed ~ * {\
    display: none;}\
.collapsable.collapsed:after {\
    content: '' !important;}\
.collapsable:after {\
    content: '';\
    float: right;\
    font-size: 20px;\
    font-family: 'FontAwesome';}\
.color_table_header {\
    border-bottom: 1px solid rgb(187, 187, 187);\
    margin: 0px;\
    margin-bottom: 7px;}\
.color_table_header h2 {\
    padding-left: 10px;\
    font-weight: bold;\
    font-size: 1.2em;\
    line-height: 50px;}\
.Xcolor {\
    display:inline-block;\
    zoom:1;\
    *display:inline;\
    text-decoration:none;\
    margin:4px 0px 4px -1px;\
    background-image:url('//www.fimfiction-static.net/images/edit_button_background_up.png') !important;\
    border:1px solid #CCC;\
    padding:7px 10px;\
    font-family:'Segoe UI', Arial;\
    font-size:0.95em;\
    color:#666;\
    vertical-align:middle;\
    text-shadow:1px 1px rgba(255,255,255,0.3);\
    z-index:0;\
    line-height:1.0em;}\
.Xcolor:hover {\
    border-color:#9aaec0;\
    background-image:url('//www.fimfiction-static.net/images/edit_button_background_down.png') !important;\
    color:#333;\
    z-index:10;\
    position:relative;}\
.subOption {\
    display: inline-block;\
    zoom: 1;\
    *display: inline;\
    text-decoration: none;\
    margin: 4px 0px 4px -1px;\
    padding: 7px 10px;\
    font-size: 0.95em;\
    color: #43464a;\
    vertical-align: middle;\
    text-shadow: 1px 1px rgba(255, 255, 255, 0.25);\
    z-index: 0;\
    line-height: 1.0em;\
    box-shadow: 0px 1px 0px #f2feff inset;\
    background: #c9d3dd;\
    background: -moz-linear-gradient(top, #dee9f4 0%, #b5bec7 100%);\
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #dee9f4), color-stop(100%, #b5bec7));\
    background: -webkit-linear-gradient(top, #dee9f4 0%, #b5bec7 100%);\
    background: -o-linear-gradient(top, #dee9f4 0%, #b5bec7 100%);\
    background: -ms-linear-gradient(top, #dee9f4 0%, #b5bec7 100%);\
    background: linear-gradient(to bottom, #dee9f4 0%, #b5bec7 100%);\
    border: 1px solid #8d949b;\
    border-top-color: #a1a9b1;\
    border-bottom-color: #797f85; }\
.subOption:hover {\
    background: #b4bdc6;\
    background: -moz-linear-gradient(top, #c7d1da 0%, #a2abb3 100%);\
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #c7d1da), color-stop(100%, #a2abb3));\
    background: -webkit-linear-gradient(top, #c7d1da 0%, #a2abb3 100%);\
    background: -o-linear-gradient(top, #c7d1da 0%, #a2abb3 100%);\
    background: -ms-linear-gradient(top, #c7d1da 0%, #a2abb3 100%);\
    background: linear-gradient(to bottom, #c7d1da 0%, #a2abb3 100%);\
    border: 1px solid #90989f;\
    color: #36393b;\
    box-shadow: 0px 1px 0px #d9e4ee inset;\
    text-decoration: none;\
    z-index: 10;\
    position: relative; }\
.subOption:active {\
    background: #c9c9c9;\
    background: -moz-linear-gradient(top, #b5b5b5 0%, #dedede 100%);\
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #b5b5b5), color-stop(100%, #dedede));\
    background: -webkit-linear-gradient(top, #b5b5b5 0%, #dedede 100%);\
    background: -o-linear-gradient(top, #b5b5b5 0%, #dedede 100%);\
    background: -ms-linear-gradient(top, #b5b5b5 0%, #dedede 100%);\
    background: linear-gradient(to bottom, #b5b5b5 0%, #dedede 100%);\
    border: 1px solid #a1a1a1;\
    color: #282828;\
    text-shadow: 1px 1px #d4d4d4;\
    z-index: 10;\
    position: relative;}\
.menu_list .button,.menu_list .user_drop_down_menu {\
    width: 100% !important;\
    min-width: 150px;}\
.chapter-read-all, .chapter-unread-all {\
    margin-right: 8px;\
    font-size: 14px;\
    font-family: 'FontAwesome';\
    font-style: normal;\
    color: rgb(80, 126, 44);}\
.compact_chapters {\
    display: none;}\
.chapters_expanded .compact_chapters {\
    display: inline !important;}\
.chapter-read-all:before {\
    content: '';}\
.chapter-unread-all:before {\
    content: '';}\
ul.chapters_compact .chapter_container {\
    display: none !important;}\
.sigPreview {\
    padding: 8px;\
    color: rgb(68, 68, 68);\
    width: 100%;\
    border: 1px solid rgb(204, 204, 204);\
    font-size: 1.1em;\
    font-family: 'Segoe UI',Arial;\
    -moz-box-sizing: border-box;\
    outline: medium none;\
    transition: border-color 0.25s ease 0s, background-color 0.25s ease 0s;\
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.07) inset;\
    background-color: rgb(255, 255, 250);\
    text-shadow: 1px 1px rgba(255, 255, 255, 0.8);\
    vertical-align: middle;\
    display: none;}\
.sigPreviewing {\
    display: none;}\
.sigPreviewing ~ .sigPreview {\
    display: inline-block;}\
.previewButton {\
    width: 100px !important;\
    text-align: center;}\
.comment .textarea_padding {\
    padding-left: 0px !important;\
    padding-right: 0px !important;}\
.comment textarea:focus {\
    background-color: rgb(232, 239, 246) !important;\
    border-color: rgba(0, 0, 0, 0.2) !important;\
    text-shadow: none !important;}\
.previous_message .user_image {\
    max-width: 100px;}\
.comment textarea {\
    padding: 8px;\
    color: rgb(68, 68, 68);\
    border: 1px solid rgb(204, 204, 204);\
    -moz-box-sizing: border-box;\
    outline: medium none;\
    transition: border-color 0.25s ease 0s, background-color 0.25s ease 0s;\
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.07) inset;\
    background-color: rgb(255, 255, 250);\
    text-shadow: 1px 1px rgba(244, 244, 244, 0.8);\
    vertical-align: middle;\
    min-height: 120px;\
    border-radius: 0px !important;\
    width: 100%;\
    resize: vertical;\
    left: 0px !important;}\
.chapter_content #chapter_container {\
    margin-left: auto !important;\
    margin-right: auto !important;\
    max-width: " + getStoryWidth() + ";}";
    
if(getWideNotes()) {
    styleSheet += "\
.chapter_content > .inner_margin {max-width: 100% !important;}\
.chapter_content .authors-note:before {\
    content: '';\
    font-family: FontAwesome;}";
}
    
makeStyle(styleSheet);
logger.Log('Checkpoint 11: style sheet added Succesfully');

setTimeout(function() {
    if (getTitleHidden()) {
        $(title).addClass("titleHidden");
    }
    $(title).css("overflow", "hidden");
    setTimeout(function() {
        $(title).css("transition", "height 0.5s ease");
    }, 30);
    logger.Log('Delayed Checkpoint: banner animations setup Succesfully');
}, 10);

logger.Log('Checkpoint 12: script completed Succesfully');

//--------------------------------------------------------------------------------------------------
} catch (e) {if (e != 'handled') { logger.SevereException('UnHandled Exception: {0}', e); }}
//--------------------------------------------------------------------------------------------------
//----------------------------------------FUNCTIONS-------------------------------------------------
//--------------------------------------------------------------------------------------------------

function applyOneTime(location) {
    logger.Log('one Time: start');
    addChapterButtonsExtras();
    if (startsWith(location, 'manage_user/avatar')) {
        $('.story_image').each(function() {
            $(this).attr('src', $(this).attr('src').split('?')[0]);
        });
        addGravatar();
    }
    applyBookmarks();
    startRandomizer();
    setup();
    
    logger.Log('one Time: end');
}

function getBookmarksGui(tab) {
    //-------Port Cookies to DOM
    var keys = docCookies.keys();
    for (var i = 0; i < keys.length; i++) {
        if (keys[i].indexOf('_bookmark_position') != -1) {
            setDocCookie(keys[i], docCookies.getItem(keys[i]));
            docCookies.removeItem(keys[i], '/', 'fimfiction.net');
        }
    }
    //-------Port Cookies to DOM
    
    keys = getDocKeys();
    var itemsArray = [];
    for (var i = 0; i < keys.length; i++) {
        if (keys[i].indexOf('bookmark_position') != -1) {
            var item = keys[i].replace('_bookmark_position', '');
            if ((item.indexOf('_') == -1 && item.indexOf(':') == -1) || parseInt(getDocCookie(keys[i])) < 0) {
                removeBookmark(item);
            } else {
                var entry = {};
                entry.raw = keys[i];
                entry.key = keys[i].replace('_bookmark_position', '');
                if (item.indexOf(':') != -1) {
                    entry.bookmark = ['published'].concat(item.split(':'));
                } else {
                    entry.bookmark = ['unpublished'].concat(item.split('_'));
                }
                
                itemsArray.push(entry);
            }
        }
    }
    
    var pager = tab.AddToolbar('bookmarks_pager', 4, 3);
    $(pager).find('img').remove();
    
    var max = Math.floor((itemsArray.length - 1) / 10);
    if (max < 0) max = 0;
    
    var pageNumber = 0;
    updatePageNumber();
    
    function updatePageNumber() {
        if (document.location.hash != '') {
            pageNumber = parseInt(document.location.hash.replace('#', '')) - 1;
            if (pageNumber < 0) {
                pageNumber = 0;
            } else if (pageNumber > max) {
                pageNumber = max;
            }
        }
    }
    
    $('.bkm_removeAll').click(function() {
        itemsArray = [];
        pageNumber = 0;
        renderPageWithHashChange();
    });
    
    $(window).on('hashchange', function() {
        updatePageNumber();
        renderPageWithHashChange();
    });
        
    var buttons = pager.children();
    var pending_loads = 0;
    
    for (var i = 0; i < 3; i++) {
       $(buttons[i % 2]).append('<i class="fa fa-chevron-left" />');
    }
    
    $(buttons[0]).append('First');
    $(buttons[0]).css('float', 'left');
    $(buttons[0]).click(function() {
        if (pageNumber > 0) {
            pageNumber = 0;
            renderPageWithHashChange();
        }
    });
    
    $(buttons[1]).append('Previous');
    $(buttons[1]).css('float', 'left');
    $(buttons[1]).click(function() {
        if (pageNumber > 0) {
            pageNumber--;
            renderPageWithHashChange();
        }
    });
    
    $(buttons[2]).append('Last');
    $(buttons[2]).css('float', 'right');
    $(buttons[2]).click(function() {
        if (pageNumber != max) {
            pageNumber = max;
            renderPageWithHashChange();
        }
    });
    
    $(buttons[3]).append('Next');
    $(buttons[3]).css('float', 'right');
    $(buttons[3]).click(function() {
        if (pageNumber < max) {
            pageNumber++;
            renderPageWithHashChange();
        }
    });
    
    for (var i = 2; i >= 0; i--) {
        $(buttons[(i % 2) + 2]).append('<i style="margin-left:4px;margin-right:0px;float:right" class="fa fa-chevron-right" />');
    }
    
    pager.css('text-align', 'center');
    pager.append('<div style="line-height:40px;"><span id="pageNumber" /> of <span id="pageMax">' + (max + 1) + '</span></div>');
    
    $('.content_box > .main').after('<div id="book_loader" style="pointer-events:none;margin-top:-30px;font-size:7em;display:none;width:100%;text-align:center;"><i class="fa fa-spinner fa-spin" /></div>');
    
    renderPage();
    function renderPage() {
        $('#pageNumber').text(pageNumber + 1);
        $('.bookmark_entry').remove();
        var start = pageNumber * 10;
        for (var i = start; i < start + 10 && i < itemsArray.length; i++) {
            var row;
            if (itemsArray[i].me == null || itemsArray[i].me.error != 'true') {
                row = $('<tr class="bookmark_entry" style="transition: opacity 0.25s ease-in-out;opacity:0;"><td class="label" style="width:120px;" /><td class="bookmark_item" /><td /></tr>');
                $('.content_box > .main').attr('data-pending-loads', ++pending_loads);
                $('#book_loader').css('display', 'block');
                tab.AddRaw(row);
            }
            
            if (itemsArray[i].me != null) {
                if (itemsArray[i].me.error != true) {
                    configureItem(row, itemsArray[i].me, i);
                }
            } else {
                 getData(row, i);
            }
        }
    }
    
    function renderPageWithHashChange() {
        document.location.hash = pageNumber + 1;
        renderPage();
    }
    
    function configureItem(row, me, i) {
        if (pending_loads > 0) pending_loads--
        if (pending_loads == 0) $('#book_loader').css('display', 'none');
        
        var image = $('<img class="bookmark_img" />');
        image.on('error', function() {
            var src = $(this).attr('src');
            if (endsWith(src, '.png')) {
                src = src.split('/').reverse();
                src[0] = src[0].split('.')[0] + '.jpg';
                $(this).attr('src', src.reverse().join('/'));
            }
        });
        image.attr('src', '//www.fimfiction-static.net/images/story_images/' + itemsArray[i].bookmark[1] + '_r.png');
                
        $(row.children()[0]).append(image);
        
        var titf = urlSafe(me.title);
        var chapf = urlSafe(me.chapTitle);
                
        var story = '//www.fimfiction.net/story/' + itemsArray[i].bookmark[1] + '/' + titf;
        
        var chap = '//www.fimfiction.net/' + (itemsArray[i].bookmark[0] == 'published' ? 'story/' + itemsArray[i].bookmark[1] + '/' : 'chapter/') + itemsArray[i].bookmark[2];
        chap += (itemsArray[i].bookmark[0] == 'published' ? '/' + titf + '/' + chapf : ''); 
        
        $(row.children()[1]).append('<div><span class="chapter">' + (i + 1) + '. </span><a class="chapter" href="' + chap + '">' + me.chapTitle + '</a></div>');
        $(row.children()[1]).append('<span class="subText"> in <a class="story_name" href="' + story + '">' + me.title + '</a></span>');
        
        var delBut = $('<a style="float:right;text-align:center;" title="Delete" class="styled_button styled_button_red"><i class="fa fa-trash-o" style="margin:0px;" /></a>');
        $(delBut).attr('cookieName', itemsArray[i].key);
        $(delBut).attr('data-item-index', i);
        $(delBut).click(function() {
            var ek = $(this).parent().parent();
            var index = parseInt($(this).attr('data-item-index'));
            itemsArray.splice(index, 1);
            max = Math.floor((itemsArray.length - 1) / 10);
            if (max < 0) max = 0;
            $('#pageMax').text(max + 1)
            ek.css('opacity', 0);
            setTimeout(function() {
                ek.remove();
                if (itemsArray.length > 0) {
                    if ($('.bookmark_entry').length == 0 && pageNumber > 0) pageNumber--;
                    renderPage();
                }
            }, 360);
            setDocCookie($(this).attr('cookieName'), -1);
            removeBookmark($(this).attr('cookieName'));
        });
        $(row.children()[2]).append(delBut);
        $(row).css('opacity', 1);
    }
    
    function getData(row, i) {
        var Key = itemsArray[i].key;
        var me = getBookmarkData(Key);
        
        if (me.error != false) {
            var page;
            if (itemsArray[i].bookmark[0] == 'published') {
                page = '//www.fimfiction.net/story/' + itemsArray[i].bookmark[1] + '/' + itemsArray[i].bookmark[2] + '/';
            } else {
                page = '//www.fimfiction.net/chapter/' + itemsArray[i].bookmark[2] + '/';
            }
            $.ajax({
                url: page,
                async: true,
                success: function(data) {
                    me.title = data.match(/<meta property="og:title" content="(.*?)" \/>/)[1];
                    me.chapTitle = data.match(/<title>(.*?) - (.*?) - FIMFiction.net<\/title>/);
                    for (var k = 1; k < me.chapTitle.length; k++) {
                        if (me.chapTitle[k] != me.title) {
                            me.chapTitle = me.chapTitle[k];
                            setBookmarkData(Key, me);
                            configureItem(row, me, i);
                            return;
                        }
                    }
                    me.chapTitle = me.chapTitle[1];
                    setBookmarkData(Key, me);
                    configureItem(row, me, i);
                },
                error: function(data) {
                    me.error = true;
                    if (pending_loads > 0) pending_loads--
                    if (pending_loads == 0) $('#book_loader').css('display', 'none');
                    row.remove();
                }
            });
        } else {
            configureItem(row, me, i);
        }
        itemsArray[i].me = me;
    }
}

function addChapterButtonsExtras() {
    var loggedIn = getIsLoggedIn();
    $('ul.chapters').each(function() {
        var me = this;
        var extra = $('<li class="bottom" style="overflow:hidden;" />');
        
        $(this).prepend('<div class="all_chapters_hidden"><li>All chapters hidden</li></div>');
        $(this).prepend(extra);
        
        if (loggedIn) {
            var read = $('<div class="mark_all_holder"><i class="chapter-read-all" /><span class="date">mark all Read</a></div>');
            extra.append(read);
            $(read).click(function() {
                $(me).find('i.chapter-read-icon:not(.chapter-read)').each(function() {
                    $(this).click();
                });
            });
            var unread = $('<div class="mark_all_holder"><i class="chapter-unread-all" /><span class="date">mark all Unread</a></div>');
            extra.append(unread);
            $(unread).click(function() {
                $(me).find('i.chapter-read-icon.chapter-read').each(function() {
                    $(this).click();
                });
            });
            
            var unreadChaps = $(me).find('i.chapter-read-icon:not(.chapter-read)');
            if (unreadChaps.length > 0) {
                unreadChaps = unreadChaps[0].parentNode;
                var unreadTit = $(unreadChaps).find('.chapter_link');
                var unreadDat = $(unreadChaps).find('.date').clone();
                unreadDat.find('*').remove();
                
                var gotoUnread = $('<a style="float:right;" >Goto Unread</a>');
                extra.append(gotoUnread);
                extra.append('<b class="date" style="float:right;margin-left:5px;margin-right:5px;">·</b>');
                
                $(gotoUnread).attr('href', unreadTit[0].href);
                $(gotoUnread).attr('title', unreadTit.text() + '\n' + unreadDat.text());
                $(unreadChaps).css('transition', 'background 0.5s ease 1s');
                
                $(gotoUnread).hover(function() {
                    $(unreadChaps).addClass('chapter_highlighted');
                }, function() {
                    $(unreadChaps).removeClass('chapter_highlighted');
                });
            }
        }
        
        var compact = $('<a style="float:right;" href="javascript:void();" >Minimize</a>');
        $(compact).click(function() {
            if ($(me).hasClass('chapters_compact')) {
                $(me).removeClass('chapters_compact');
                this.innerHTML = 'Minimize';
            } else {
                $(me).addClass('chapters_compact');
                this.innerHTML = 'Maximize';
            }
        });
        extra.append(compact);
        
        extra.append('<b class="compact_chapters date" style="float:right;margin-left:5px;margin-right:5px;">·</b>');
        
        var hide = $('<a class="compact_chapters" style="float:right;" href="javascript:void();" >Hide Chapters</a>');
        $(hide).click(function() {
            $(me).removeClass('chapters_expanded');
        });
        extra.append(hide);
    });
}

function startRandomizer() {
    setInterval(Randomize, 100);
    Randomize();
}

function SetupRandomize() {
    logger.Log('SetupRandomize: start');
    $('*:contains(":{random}:")').not('input').not('textarea').filter(function() {
        return $(this).clone().children().remove().end().text().indexOf(':{random}:') != -1 && this.tagName;
    }).each(function() {
        $(this).addClass('random_text_randomize_go');
        $(this).attr('randomizerSeed', decodeHTML(replaceAll(':{random}:', '', this.innerHTML)));
    });
    
    logger.Log('SetupRandomize: end');
}

function Randomize() {
    logger.Log('Randomize: start');
    var chars = 'abcdefghijklmnopqrstuvwxyz';
    var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var nums = '0123456789';
    
    $('.random_text_randomize_go').each(function() {
        var result = '';
        var text = $(this).attr('randomizerSeed');
        
        if (text == null || text == '') {
            $(this).attr('randomizerSeed', decodeHTML(replaceAll(':{random}:', '', this.innerHTML)));
            text = $(this).attr('randomizerSeed');
        }
        
        var tag = false;
        for (var i = 0; i < text.length; i++) {
            if (text[i] == '<') {
                tag = true;
            } else if (text[i] == '>') {
                tag = false;
            }
            
            if (!tag) {
                if (contains(chars, text[i])) {
                    result += pickOne(chars);
                } else if (contains(CHARS, text[i])) {
                    result += pickOne(CHARS);
                } else if (contains(nums, text[i])) {
                    result += pickOne(nums);
                } else {
                    result += text[i];
                }
            } else {
                result += text[i];
            }
        }
        this.innerHTML = result;
    });
    logger.Log('Randomize: end');
}

function makeList(element, ordered) {
    var start = element.selectionStart;
    var end = element.selectionEnd;
    var before = element.value.substring(0, start);
    var after = element.value.substring(end, element.value.length);
    var top = element.scrollTop;
    var selected = end - start > 0 ? element.value.substring(start, end) : '';
    
    selected = selected.split('\n');
    for (var i = 0; i < selected.length; i++) {
        if (ordered) {
            if (startsWith(selected[i], '\t[b]·[/b] ')) {
                selected[i] = selected[i].replace('\t[b]·[/b] ', '\t[b]' + (i + 1) + '.[/b] ');
            } else if (!startsWith(selected[i], '\t[b]' + (i + 1) + '.[/b] ')) {
                selected[i] = '\t[b]' + (i + 1) + '.[/b] ' + selected[i];
            }
        } else {
            if (startsWith(selected[i], '\t[b]' + (i + 1) + '.[/b] ')) {
                selected[i] = selected[i].replace('\t[b]' + (i + 1) + '.[/b] ', '\t[b]·[/b] ');
            } else if (!startsWith(selected[i], '\t[b]·[/b] ')) {
                selected[i] = '\t[b]·[/b] ' + selected[i];
            }
        }
    }
    selected = selected.join('\n');
    
    element.value = before + selected + after;
    element.selectionStart = start;
    element.selectionEnd = start + selected.length;
    element.scrollTop = top;
    $(element).focus();
}

function addGravatar() {
    logger.Log('addGravatar: start');
    var grav = $('<tr valign="top" />');
    var elem;
    $('form .properties tbody').append(grav);
    
    elem = $('<td />');
    grav.append(elem);
    
    elem.append('<input id="Grav_ok" type="hidden" value="0" />');
    elem.append('<h2><img src="http://en.gravatar.com/favicon.ico" style="padding:3px;" /><b>From Gravatar</b></h2>');
    elem.append('<label style="width:90%;">E-mail:<div><input id="grav_url" type="text" /></div></label>');
    
    elem = $('<td colspan="2"/>');
    grav.append(elem);
    
    elem.append('<label><div style="width:128px;height:128px;border:solid 3px rgb(204, 204, 204);border-radius:3px;"><img id="imgPreview" style="max-width:100%;max-height:100%;" src="http://www.gravatar.com/avatar/?s=128&fimficNull=true" /></div></label>');
    
    var reloadImg = function() {
        logger.Log('loadGravatar: start');
        var md = $(this).val();
        if (md != '') {
            $('#imgPreview').attr('src', 'http://www.gravatar.com/avatar/' + MD5($(this).val()) + '?s=128&d=404');
        } else {
            $('#imgPreview').attr('src', 'http://www.gravatar.com/avatar/?s=128&fimficNull=true');
        }
        logger.Log('loadGravatar: end');
    }
    
    $('#imgPreview').error(function() {
        $('#Grav_ok').val('0');
        $(this).attr('src', 'http://www.gravatar.com/avatar/?s=128&fimficNull=true');
    });
    $('#imgPreview').on('load', function() {
        if (contains($(this).attr('src'), 'fimficNull=true')) {
            $('#Grav_ok').val('0');
        } else {
            $('#Grav_ok').val('1');
        }
    });
    
    $('#grav_url').change(reloadImg);
    $('#grav_url').on('input', reloadImg);
    
    $('form .styled_button').on('mousedown', function() {
        if ($('#Grav_ok').val() == '1') {
            $('#image_url').val($('#imgPreview').attr('src').split('?') + '?s=512');
        }
    });
    logger.Log('addGravatar: end');
}

function applyBookmarks() {
    logger.Log('applyBookmarks: start');
    var pbkmark = $('#place_bookmark');

    if (pbkmark.length > 0) {
        var cl = $('<a style="" set="false" href="javascript:void(0);" id="place_bookmark" title="Place Bookmark"><i class="fa fa-bookmark"></i></a>');
        pbkmark.after(cl);
        pbkmark.remove();
        pbkmark = cl;
        $('.chapter_content').prepend(marker);
        
        var restorePos = $('<li style="display:none;"><a title="Restore Position" href="javascript:void(0);" ><i class="fa fa-bookmark" style="color:blue;" /></a></li>');
        $(restorePos.children()[0]).click(function() {
            logger.Log('Set scroll Position');
            var bookmark = getBookmark(storyNumber);
            if (bookmark != null) {
                $(document).scrollTo(bookmark, {axis: 'y', duration: 800, easing: 'easeInOutExpo'});
            }
        });
        $(pbkmark.parent()).after(restorePos);
        
        var marker = $('#chapter_bookmark');
        cl = $('<div style="top: 111px;" class="bookmark_marker" ></div>');
        marker.after(cl);
        marker.remove();
        marker = cl;
        
        var storyNumber = getStoryNumber();
        var bookmark = getBookmark(storyNumber);
        if (bookmark != null) {
            $(document).scrollTop(bookmark);
            logger.Log('Set scroll Position');
            pbkmark.attr('set', 'true');
            pbkmark.attr('title', 'Clear Bookmark');
            pbkmark.css('color', 'yellow');
            restorePos.css('display', '');
            
            bookmark = bookmark - $('.chapter_content').offset().top;
            if (bookmark > 0) {
                marker.css('top', bookmark + 'px');
                marker.css('display', 'block');
            }
        }
        
        pbkmark.click(function() {
            logger.Log('Bookmark Button: click');
            if ($(this).attr('set') == 'true') {
                removeBookmark(storyNumber);
                pbkmark.attr('set', 'false');
                pbkmark.attr('title', 'Place Bookmark');
                pbkmark.css('color', '');
                restorePos.css('display', 'none');
                marker.attr('style', '');
            } else {
                var position = $(document).scrollTop();
                setDocCookie(storyNumber + '_bookmark_position', position);
                pbkmark.attr('set', 'true');
                pbkmark.attr('title', 'Clear Bookmark');
                pbkmark.css('color', 'yellow');
                restorePos.css('display', '');
                setBookmark(storyNumber, position);
                position = position - $('.chapter_content').offset().top;
                if (position > 0) {
                    marker.css('top', position + 'px');
                    marker.css('display', 'block');
                } else {
                    marker.css('display', 'none');
                }
            }
        });
    }
    logger.Log('applyBookmarks: end');
}

function setup() {
    logger.Log('setup: start');
    $("a[title='Text Color']").each(function(index) {
        if ($(this).attr("fimfic_adv") != "true") {
            $(this).attr("fimfic_adv", "true");
            
            var t = this.getAttribute("href").split("'")[1];
            
            if (this.children[0].tagName == 'IMG') {
                logger.Log('setup: changing color button icon');
                $(this.parentNode).css('line-height', '');
                $(this).empty();
                $(this).append('<i class="fa fa-tint" />');
            }
            
            betterColors(this.parentNode, t);
            
            setUpMainButton(this.parentNode, t);
        }
    });
    $("a[title='Font Size']").each(function(index) {
        if ($(this).attr("fimfic_adv") != "true") {
            $(this).attr("fimfic_adv", "true");
            var t = this.getAttribute("href").split("'")[1];
            betterSizes(this.parentNode, t);
        }
    });
    $("a[title='Insert Image']").each(function(index) {
        if (this.children[0].tagName == 'IMG') {
            logger.Log('Changing Insert Image Logo');
            $(this).empty();
            $(this).append('<i class="fa fa-picture-o" />');
        }
    });
    
    setUpSpecialTitles();
    if (document.hasFocus()) {
        SetupRandomize();
    }
    
    logger.Log('setup: end');
}

function loopUnspoiler() {
    logger.Log('loopUnspoiler: loop_start');
    if (!getInit() && unspoilerImages()) {
        setUpSpecialTitles();
    }
}

function setUpSpecialTitles() {
    setSpecialTitle([138711, 10539, 27165],"FimFiction Modder");
    setSpecialTitle([129122],"Emote Contributor");
}

function setUpMainButton(toolbar, target) {
    logger.Log('setUpMainButton: start');
    var hasAdv = toolbar.parentNode.parentNode.children[2].children.length > 4;
    var options = makeButton(toolbar, "More Options", "fa fa-flag");
    
    options.setAttribute("textTarget", target);
    $(options).on("click", function() {
        if (this.children.length == 1) {
            var items=makePopup(this, "Options", "fa fa-flag");
            
            var text = this.getAttribute("textTarget");
            if (!hasAdv) {
                addOption(items, "Center(document.getElementById('" +  text + "'));", "Center Align");
            }
            addOption(items, "InsertBBCodeTag(document.getElementById('" + text + "'), 'right');", "Right Align");
            if (!hasAdv) {
                addOption(items, "Indent(document.getElementById('" + text + "'));", "Indent Paragraphs");
                addOption(items, "Outdent(document.getElementById('" + text + "'));", "Outdent Paragraphs");
                addOption(items, "InsertBBCodeTag(document.getElementById('" + text + "'), 'spoiler');", "Add Spoiler");
            }
            $(addOption(items, "void();", "Sign")).click(function() {
                sign(text);
            });
            $(addOption(items, "void();", "Insert Direct Image")).click(function() {
                makeImagePopup(text);
            });
            $(addOption(items, "void();", "Ordered List")).click(function() {
                makeList(document.getElementById(text), true);
            });
            $(addOption(items, "void();", "Unordered List")).click(function() {
                makeList(document.getElementById(text), false);
            });
            $(addOption(items, "void();", "Find/Replace Text")).click(function() {
                makeReplacePopup(document.getElementById(text));
            });
            setListItemWidth(items);
        }
    });
    logger.Log('setUpMainButton: end');
}

function makeDropItem(text, link, img) {
    var link = $('<a class="button" href="' + link + '" />');
    $(link).append(makeLogo(img) + text);
    return link;
}

function makeReplacePopup(target) {
    var pop = $(makeGlobalPopup('Find and Replace', 'fa fa-magic', false));
    
    pop.parent().css('width','350px');
    pop.append("<div style=\"padding:10px;\" />");
    pop = $(pop.children()[0]);
    
    pop.append('<input id="find" type="text" required="required" placeholder="Find" name="find" />');
    pop.append('<input id="replace" type="text" required="required" placeholder="Replace" name="replace" />');
    
    var finB = $('<button type="button" nextStart="0" class="styled_button">Find</button>');
    pop.append(finB);
    
    $('#find').change(function() {
        finB.attr('nextStart', 0);
    });
    
    finB.click(function() {
        var find = $('#find').val();
        var nextStart = parseInt($(this).attr('nextStart'));
        var text = target.value.substring(nextStart, target.value.length);
        if (find != '') {
            var start = text.indexOf(find);
            var end = 0;
            if (start == -1) {
                start = target.value.indexOf(find);
                nextStart = 0;
            }
            if (start != -1) {
                start += nextStart;
                end = start + find.length;
            }
            $(this).attr('nextStart', end);
            target.selectionStart = start;
            target.selectionEnd = end;
            $(target).focus();
        }
    });
    
    var replB = $('<button type="button" class="styled_button">Replace</button>');
    pop.append(replB);
    replB.click(function() {
        var find = $('#find').val();
        if (find != '') {
            var start = target.selectionStart;
            var end = target.selectionEnd;
            if (start != end) {
                if (start > end) {
                    var t = start;
                    start = end;
                    start = t;
                }
                var sel = target.value.substring(start, end);
                var replace = $('#replace').val();
                
                if (sel == find) {
                    target.value = target.value.substring(0, start) + replace + target.value.substring(start + sel.length, target.value.length);
                    target.selectionStart = start + replace.length;
                    target.selectionEnd = target.selectionStart;
                }
            } else {
                finB.click();
                if (target.selectionStart != target.selectionEnd) {
                    replB.click();
                }
            }
            $(target).focus();
        }
    });
    
    var replAB = $('<button type="button" class="styled_button">Replace All</button>');
    pop.append(replAB);
    replAB.click(function() {
        var find = $('#find').val();
        if (find != '') {
           $(target).val(replaceAll(find, $('#replace').val(), $(target).val()));
        }
    });
    position(pop.parent().parent().parent(), 'center', 'center');
    
}

function makeImagePopup(target) {
    var message = makeGlobalPopup("Add Direct Image", "fa fa-picture-o");
    
    $(message.parentNode).css('width','350px');
    
    $(message).append("<div style=\"padding:10px;\" />");
    message = message.children[0];
    $(message).append("<div class=\"pattern-checkerboard\" style=\"border:1px solid #ccc; width:100%; height:200px; box-shadow: 0px 0px 20px rgba(0,0,0,0.2) inset;\"><img id=\"bbcode_image_preview\" style=\"display:block; margin:auto; max-height:100%; max-width:100%;\" /></div>");
    
    var content = $("<form id=\"add_image\">");
    $(message).append(content);
    
    var valid = $('<input type="hidden" value="0" name="valid"></input>');
    $(content).append(valid);
    
    $("#bbcode_image_preview").on("load", function() {
        $(valid).attr("value", "1");
        $("#add_image_error").css("display", "none");
    });
    $("#bbcode_image_preview").on("error", function() {
        $(valid).attr("value", "0");
    });
    
    var input = $('<input id="bbcode_image" type="url" required="required" placeholder="Image URL" name="url" />');
    
    $(content).append(input);
        
    var check = function() {
        $("#bbcode_image_preview").attr("src", this.value);
    }
    
    $(input).on("input", check);
    $(input).change(check);
    
    var button = $('<button type="button" class="styled_button">Add Image</button>');
    $(button).click(function(e) {
        var url = $(input).attr("value");
        if (url != null && url != undefined && url != "" && $(valid).attr("value") == "1") {
            var s = url.split("?");
            if (s != null && s.length > 1) {
                s = url + "&isEmote=true";
            } else {
                s = url + "?isEmote=true";
            }
            InsertBBCodeTags(document.getElementById(target), "[img]" + s, "[/img]");
            $("#message_close_button").click();
        } else {
            $("#add_image_error").removeClass("hidden");
        }
    });
    
    $(content).append(button);
    
    $(content).append('<div id="add_image_error" class="error-message hidden">Invalid Image</div>');
    
    $(message.parentNode).append('<div class="drop-down-pop-up-footer">Please remember all images must be safe for work!<br />Try to avoid including enormous images (bigger than 1mb)</div>');    
    
    position(message.parentNode.parentNode.parentNode, "center", "center");
}

function insertColor(target) {
    var pop = makeGlobalPopup("Custom Colour", 'fa fa-tint');
    $(pop.parentNode).css('width','350px');
    
    $(pop).append('<div style="padding:10px;" />');
    pop = pop.children[0];
    
    $(pop).append('<div id="color_preview" style="overflow: hidden; padding: 15px; border:1px solid #ccc; width:100%; height:200px; box-shadow: 0px 0px 20px rgba(0,0,0,0.2) inset;" ><b><span style="font-size:30px">The quick brown fox jumped over the lazy rabbit.</span><span style="font-size:20px;">The quick brown fox jumped over the lazy rabbit.</span><span style="font-size:10px">The quick brown fox jumped over the lazy rabbit.</span><span style="font-size:5px">The quick brown fox jumped over the lazy rabbit.</span></b></div>');
    
    var valid = $('<input type="hidden" value="0" name="valid"></input>');
    $(pop).append(valid);
    
    var color = $('<input type="text" placeholder="Text Colour" />');
    $(pop).append(color);
    
    var ch = function() {
        checkColor(this, $("#color_preview"), valid);
    }
    
    $(color).on("input", ch);
    $(color).change(ch);
    
    var button = $('<button type="button" class="styled_button">Use Colour</button>');
    $(button).click(function(e) {
        var c = $(color).attr("value");
        if (c != null && c != undefined && c != "" && $(valid).attr("value") == "1") {
            
            if (!(function() {
                for (var i = 0; i < ColorMappingKeys.length; i++) {
                    if (ColorMappingKeys[i] == c) return true;
                }
                return false;}()) && !startsWith(c, "#")) {
                c = "#" + c;
            }
            addRecent(c);
            InsertBBCodeTags(document.getElementById(target), "[color=" + c + "]", "[/color]");
            $("#message_close_button").click();
        } else {
            $("#color_error").removeClass("hidden");
        }
    });
    
    $(pop).append(button);
    
    $(pop).append('<div id="color_error" class="error-message hidden">Invalid Hexidecimal Code</div>');
    
    $(pop.parentNode).append('<div class="drop-down-pop-up-footer">Be mindeful of the colours you use.<br />Try to avoid colours that are very close to the background as it is difficult to read. If hiding is intended, consider using \'[spoiler]text[/spoiler]\'</div>');    
    
    position(pop.parentNode.parentNode.parentNode, "center", "center");
}

function previewSig() {
    return fillBBCode(replaceAll('\n', '<br />', sign({}, pickOne([
        'Ermahgerd! I wub u so much!!!11111one11!exclamation!!mark1',
        'I feel ya bro',
        'Sink X Dash is OTP! ' + emoteHTM('rainbowderp'),
        'Fräulein ' + emoteHTM('ajsmug'),
        'Bro Hoof. ' + emoteHTM('rainbowlaugh'),
        'I\'ve seen better',
        'Sanity is overrated anyway.',
        'Tiny box Tim NOOOOOOOOOOOOOO!!!!!!!!!!!',
        'None more manly tears were ever shed',
        'Do you even goat brah?',
        'You Maud bro?',
        'I liek trains.',
        'Iets ryk soos kaas.',
        'I am best Pony!!!',
        'Your argument is invalid. <img class="user_image" alt="" src="http://fc01.deviantart.net/fs71/f/2014/013/d/b/cslyra_by_comeha-d7220ek.png"></img>',
        'U is bestest pone!'], [
            '[size=10][i]Don\'t trust the parasprite.[/i][/size]',
            '[center]<img width="100px" height="100px" src="http://fc00.deviantart.net/fs70/i/2012/200/b/e/sweepy_time__by_chubble_munch-d57scrc.png" /><br />Pweese?[/center]',
            '[url=http://dileak.deviantart.com/art/Meanwhile-at-the-super-awesome-WUB-base-310634590]Epic WUB Time is now[/url]'
            ]))));
}

function emoteHTM(name) {
    return '<img src="//www.fimfiction-static.net/images/emoticons/' + name + '.png" style="height:27px;" ></img>';
}

function getUserCommentThumb(size) {
    
    var hold = $('<div class="author" style="line-height:1.1em;" />');
    
    if (getIsLoggedIn()) {
        hold.append('<a class="name" href="/user/' + getUserNameEncoded() + '">' + getUserName() + '</a>');
        hold.append('<div class="avatar"><img style="margin:0px;" height="' + size + '" width="' + size + '" src="//www.fimfiction-static.net/images/avatars/' + logged_in_user.id + '_' + size + '.png" /></div>');
    } else {
        hold.append('<a class="name">Anon</a>');
        hold.append('<div class="avatar"><img style="margin:0px;" height="' + size + '" width="' + size + '" src="//www.fimfiction-static.net/images/avatars/none_64.png" /></div>');
    }
    
    var comm = $('<div class="comment" />');
    comm.append(hold);
    return comm;
}

function fillBBCode(text) {
    var codes = {
        '[u]': '<u>',
        '[/u]': '</u>',
        '[i]': '<i>',
        '[/i]': '</i>',
        '[b]': '<b>',
        '[/b]': '</b>',
        '[center]': '<center>',
        '[/center]': '</center>',
        '[img]': '<img src="',
        '[/img]': '" />',
        '[quote]': '<blockquote>',
        '[/quote]': '</blockquote>',
        '[s]': '<span style="text-decoration:line-through">',
        '[/s]': '</span>',
        '[spoiler]': '<span class="spoiler">',
        '[/spoiler]': '</span>'
    }
    for (var i in codes) {
        text = replaceAll(i, codes[i], text);
    }
    text = replaceTagWithOption(text, 'url', '<a href="{0}">', '</a>', '<a href="{0}">', '</a>');
    text = replaceTagWithOption(text, 'size', '<span style="font-size:{0}px; line-height:1.3em;">', '</span>');
    text = replaceTagWithOption(text, 'color', '<span style="color:{0};">', '</span>');
    text = replaceYouTube(text);
    return text;
}

function replaceYouTube(text) {
    var htm = '<div class="youtube_container"><iframe src="https://www.youtube.com/embed/{0}" /></div>';
        
    var passed = -1, url = -1;
    while ((url = text.indexOf('[youtube')) != -1 && url > passed) {
        url += '[youtube'.length;
        var link = '';
        for (; url < text.length; url++) {
            if (text[url] == ']') break;
            link += text[url];
        }
        if (link.indexOf('=') == 0) {
            link = link.replace('=', '');
        }
        if (link != '') {
            try {
                text = text.replace('[youtube=' + link + ']', htm.replace('{0}', link.split('watch?v=')[1].split('#')[0]));
            } catch (e) {
            }
        }
        passed = url;
    }
    return text;
}

function replaceTagWithOption(text, tag, withO, closeWith, without, closeOut) {
    var passed = -1, url = -1;
    while ((url = text.indexOf('[' + tag)) != -1 && url > passed) {
        url += tag.length + 1;
        var link = '';
        for (; url < text.length; url++) {
            if (text[url] == ']') break;
            link += text[url];
        }
        if (link.indexOf('=') == 0) {
            link = link.replace('=', '');
        }
        if (link != '') {
            text = text.replace('[' + tag + '=' + link + ']', replaceAll('{0}', link, withO));
            text = text.replace('[/' + tag + ']', replaceAll('{0}', link, closeWith));
        } else if (without != null) {
            for (url++; url < text.length; url++) {
                if (text[url] == '[') break;
                link += text[url];
            }
            if (link != '') {
                text = text.replace('[' + tag + ']', replaceAll('{0}', link, without));
                text = text.replace('[/' + tag + ']', replaceAll('{0}', link, closeOut));
            } else {
            }
        }
        passed = url;
    }
    return text;
}

function sign(target, text) {
    if (text == null || text == undefined) {
        target = document.getElementById(target);
        text = target.value;
    }
    
    var formatted = getSig();
    
    var t = new Date();
    var tags = {
        '%name%': getUserName(),
        '%year%': t.getFullYear(),
        '%MONTH%': t.getMonth() + 1,
        '%DAY%': t.getDate(),
        '%month%': (['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])[t.getMonth()],
        '%day%': (['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])[t.getDay()],
        '%hour%': t.getHours(),
        '%min%': t.getMinutes(),
        '%sec%': t.getSeconds()}
    
    for (var i in tags) {
        formatted = replaceAll(i, tags[i], formatted);
    }
    
    if (text == null || text == undefined) {
        text = target.value;
    }
    if (!hasSigned(text, formatted)) {
        if (contains(formatted, "%message%")) {
            formatted = formatted.replace("%message%", text);
            text = formatted;
        } else {
            text += formatted;
        }
    }
    target.value = text;
    $(target).focus();
    return text;
}

function hasSigned(value, format) {
    var regex = new RegExp(encodeURI(replaceAll("%message%", ".*", format)));
    return regex.test(encodeURI(value));
}

function betterSizes(size, target) {
    logger.Log('betterSizes: start');
    size.children[0].setAttribute("href", "javascript:void();");
    
    size.setAttribute("textTarget", target);
    size.onclick = function() {
        if (this.children.length == 1) {
            var items=makePopup(this, "Text Size", "fa fa-text-height");
            
            var text = this.getAttribute("textTarget");
            for (var i = 10; i < 20; i+=2) {
                for (var k = 0; k < 50; k+=10) {
                    var size = addOption(items, "InsertBBCodeTags(document.getElementById('" + text + "'), '[size=" + (i + k) + "]', '[/size]');", i + k, false);
                    size.style.display = "inline-block";
                    
                    $(size.parentNode).hover(function() {
                        var sz = this.children[0].innerHTML;
                        var pop = makeToolTip(this);
                        pop.parentNode.style.margin = "30px 0px 0px 0px";
                        pop.parentNode.style.padding = "0px 0px 0px 0px";
                        $(pop).append("<div style=\"font-size: " + sz + "px; line-height: 1; height: " + sz + "px;\">Ab</div>");
                    }, function() {
                        this.removeChild(this.children[1]);
                    });
                    
                }
                $(items).append("</br>");
            }
        }
    }
    logger.Log('betterSizes: end');
}

function betterColors(color, target) {
    logger.Log('betterColors: start');
    color.children[0].setAttribute("href", "javascript:void();");
    
    color.setAttribute("textTarget", target);
    $(color).on("click", function() {
        if (this.children.length == 1) {
            var text = this.getAttribute("textTarget");
            
            var items = makePopup(this, "Default Colours", "fa fa-tint");
            addColorTiles(text, items, FimFiccolors.concat([-1,-1,-1].concat(Ponycolors)), 6);
            
            var recent = getRecentColours(6);
            if (recent.length > 0) {
                var result = '';
                addColorSection(text, items, recent, 6, 'Recent');
            }
            $(items).append("</br>");
            
            var b = addOption(items, "javascript:void()", "More Colours");
            var me = this;
            b.style = "text-align: center;";
            $(b.parentNode).css('width', '243px');
            $(b.parentNode).click(function() {
                var posOverride = [];
                if ($('.color_picker').length != 0) {
                    posOverride.x = $('.color_picker').parent().parent().css('left');
                    posOverride.y = $('.color_picker').parent().parent().css('top');
                    $('.color_picker').parent().parent().remove();
                }
                var text = me.getAttribute('textTarget');
                var pop = makeGlobalPopup('All Colours', 'fa fa-tint', false);
                
                addColorSection(text, pop, Spectrum, 15, 'Standard Colours');
                addColorSection(text, pop, FimFiccolors, 15, 'FimFiction');
                addColorSection(text, pop, Ponycolors, 15, 'Mane Six');
                addCollapseColorSection(text, pop, Morecolors, 15, 'More Colours', true);
                
                var recent = getRecentColours(15);
                if (recent.length > 0) {
                    var recentSec = addColorSection(text, pop, recent, 15, 'Recent');
                    var reset = $('<a href="javascript:void();" style="float:right;" >Clear</a>');
                    $(recentSec).append(reset);
                    $(reset).click(function (){
                        clearRecentColours();
                        $(recentSec).parent().find('a').css('opacity', 0.3);
                        $(recentSec).parent().find('a').css('pointer-events', 'none');
                    });
                }
                
                $(pop).addClass("color_picker");
                
                if (posOverride.x != null) {
                    $(pop).parent().parent().css('left', posOverride.x);
                    $(pop).parent().parent().css('top', posOverride.y);
                }
            });
            
            b = addOption(items, "void();", "Custom Colour");
            b.style = "text-align: center;";
            $(b.parentNode).css('width', '243px');
            $(b.parentNode).click(function() {
                insertColor(text);
            });
            
        }
    });
    logger.Log('betterColors: end');
}

function addCollapseColorSection(text, panel, colors, cols, title, collapse) {
    var section = addColorSection(text, panel, colors, cols, title);
    $(section).css('cursor', 'pointer');
    $(section).addClass('collapsable');
    $(section).click(function() {
        if ($(this).hasClass('collapsed')) {
            $(this).removeClass('collapsed');
        } else {
            $(this).addClass('collapsed');
        }
    });
    if (collapse) {
        $(section).addClass('collapsed');
    }
}

function addColorSection(text, panel, colors, cols, title) {
    var colorGroup = $('<div><h1 style="border-radius:0px;">' + title + '</h1></div>');
    $(panel).append(colorGroup);
    addColorTiles(text, colorGroup, colors, cols);
    return colorGroup.children()[0];
}

function addColorTiles(text, panel, colors, cols) {
    for (var i = 0; i < colors.length; i++) {
        var code,name;
        if (typeof(colors[i]) == 'string') {
            code = colors[i];
            name = ColourNameMapping[code];
            if (name == null) name = code;
        } else {
            if (colors[i] < 0) {
                name = '';
                code = '';
            } else {
                code = ColorMappingKeys[colors[i]];
                name = ColourNameMapping[code];
                if (name == '') {
                    name = code;
                }
            }
        }
        
        var a = addOption(panel, "javascript:void();", "", (i + 1) % cols == 0);
        if (code != '') {
            $(a.parentNode).attr('code', code);
            $(a.parentNode).click(function() {
                var target = document.getElementById(text);
                var c = $(this).attr('code');
                InsertBBCodeTags(target, '[color=' + c + ']', '[/color]');
                addRecent(c);
                $(target).focus();
            });
            a.parentNode.setAttribute("title", name);
        }
        a.parentNode.setAttribute("class", "Xcolor subOption");
        a.parentNode.setAttribute("style", "cursor:pointer; padding: 18px; margin:2px; background-color:" + code + " !important; border:1px solid #333; border-radius:3px;");
        
        if (colors[i] < 0) {
            $(a.parentNode).css('opacity', '0');
            $(a.parentNode).css('pointer-events', 'none');
        }
    }
}

function mustUnspoiler(url) {
    var splitten = url.split("?");
    if (splitten != null && splitten.length == 2) {
        splitten = splitten[1].split('&');
        for (var i = 0; i < splitten.length; i++) {
            if (splitten[i] == 'isEmote=true') {
                return true;
            }
        }
    }
    return false;
}

function unspoilerImages() {
    logger.Log('unspoilerImages: start');
    var comments = $('.comment .data .comment_data');
    if (comments.length == 0) {
        logger.Log('unspoilerImages: end with false');
        return false;
    }
    
    unspoilerSiblings();
    for (var i = 0; i < comments.length; i++) {
        $(comments[i]).find('img[title=""]:not([alt=""])').each(function() {
            var tit = $(this).attr('alt');
            if ($(this).attr('title') != tit) {
                $(this).attr('title', tit);
            }
        });
    }
    
    logger.Log('unspoilerImages: end with true');
    return true;
}

function unspoilerSiblings() {
    $('.comment .data .user_image_link:not(.dontUnspoiler').each(function() {
        if (type.result > 0) {
            var url = $(this).attr('href');
            var img = $('<img />');
            
            $(img).css('max-width', '100%');
            
            $(img).attr('src', url);
            $(this).parent().attr('style', 'display: inline;');
            $(this).after(img);
            $(this).remove();
            logger.Log("unspoilerSiblings: " + url);
        } else {
            $(this).addClass('dontUnspoiler');
            $(this).parent().after('<br />');
        }
    });
}

function isSpoileredImg(item) {
    return item.tagName == 'DIV' && item.children[0] != undefined && item.children[0].tagName == 'A' && mustUnspoiler($(item.children[0]).attr('href'));
}

function getTextArea(button) {
    var elem = button.parentNode.parentNode.parentNode;
    elem = elem.children[1].children[0].children[0];
    
    if (elem != null && elem.tagName == "TEXTAREA") {
        return elem;
    }

    elem = button;
    for (var i = 0; i < 3; i++) {
        elem = elem.parentNode;
    }
    return elem.children[1].children[1].children[0].children[0];
}

function updateSlide() {
    if (time > 0 && fade != null) {
        isSliding = true;
        setTimeout(function() {
            $(fade).css("background-image", $(title.children[1]).css("background-image"));
            $(fade).css("background-position", $(title.children[1]).css("background-position"));
            $(fade).css("background-size", $(title.children[1]).css("background-size"));
            if (getShuffle()) {
                theme = Math.floor(Math.random() * themes.length);
            } else {
                theme++;
            }
            theme %= themes.length;
            chooseTheme(theme, true);
            
            $(fade).css("transition", "none");
            $(fade).css("opacity", "1");
            
            var imgUrl = $(title.children[1]).css('background-image');
            imgUrl = imgUrl.substring(4,imgUrl.length - 1);
            while (imgUrl.indexOf('"') > -1) {
                imgUrl = imgUrl.replace('"','');
            }
            
            $('<img>').attr('src',imgUrl).load(function() {
                $(fade).css("transition", "opacity 3s linear");
                $(fade).css("opacity", "0");
            });
            
            updateSlide();
        }, time);
    } else {
        isSliding = false;
    }
}

function getTime(v) {
    var slideTimes = [-1, 60000, 180000, 300000, 600000, 30000];
    if (v < 0 && v >= slideTime.length) v = 0;
    return slideTimes[v];
}

function getLogoNames() {
    var result = [];
    for (var i = 0; i < logos.length; i++) {
        result.push(logos[i].Able ? logos[i].Name : null);
    }
    return result;
}

function getValidLogoKeys() {
    var indexes = [];
    for (var i = 1; i < logos.length; i++) {
        if (logos[i].Able) {
            indexes.push(i);
        }
    }
    return indexes;
}

function getLogo(val) {
    if (val == -1) {
        return logos[pickNext(getValidLogoKeys())].Css;
    }
    if (val < 0 && val >= logos.length) {
        val = 0;
    }
    return logos[val].Css;
}

function updateLogo(val) {
    if (title != null) {
        $(title.children[1].children[(fade != null ? 1 : 0)].children[0]).attr("src", getLogo(val));
    }
}

function updateLogoO(o) {
    if (title != null) {
        $(title.children[1].children[(fade != null ? 1 : 0)].children[0]).css('opacity', o / 100);
    }
}

function checkColor(me, preview, valid) {
    var c = me.value;
    
    var va = InvalidHexColor(c);
    
    if (valid != null) {
        if (va == "true") {
            $(valid).attr("value", 0); 
        } else {
            $(valid).attr("value", 1);
        }
    }
    
    if (va == "true" || va == "false") {
        if (c == "" || c == null || c == undefined) {
            c = "#000";
        } else if (!startsWith(c, "#")) {
            c = "#" + c;
        }
    } else {
        c = ColorMappingKeys[va];
        me.value = ColourMappingNames[va];
    }
    
    if (preview != null) {
        $(preview).css("color", c);
    }
}

function listNames() {
    var start = getPageStartNumber();
    var result = "";
    var bbCode = "";
    var sfw = "";
    var sfwCode = "";
    
    var stories = $.grep(getElementsByAttributeValue("a", "class", "title"), function(item) {
            var s = item.getAttribute("href");
            return s != null && startsWith(s, "/story/");
        });
        
    if (stories.length == 0) {
        stories = getElementsByAttributeValue("a", "class", "story_name resize_text");
    }
    
    for (var i = 0; i < stories.length; i++) {
        var name = stories[i].innerHTML;
        var link = $(stories[i]).attr('href');
        
        
        if  (name != null && name != "") {
            result += "#" + (start + i + 1) + "  " + name + "\n";
            bbCode += "#" + (start + i + 1) + "  [url=http://www.fimfiction.net" + link + "]" + name + "[/url]\n";
            
            name = censorStory(stories[i], name)
            sfw += "#" + (start + i + 1) + "  " + name + "\n";
            sfwCode += "#" + (start + i + 1) + "  " + (name == "--hidden--" ? name : "[url=http://www.fimfiction.net" + link + "]" + name + "[/url]") + "\n";
        }
    }
    
    var pop = makeGlobalPopup("Items", "fa fa-bar-chart-o");
    $(pop).append('<textarea class="listText" style="width:600px;min-height:300px;" />');
    $(pop.children[0]).attr('bbCode', bbCode);
    $(pop.children[0]).attr('normal', result);
    $(pop.children[0]).attr('sfw', sfw);
    $(pop.children[0]).attr('sfwCode', sfwCode);
    pop.children[0].value = sfw;
    
    var toggle = $('<input type="checkbox" />');
    
    var div = $('<div class="drop-down-pop-up-footer" />');
    $(div).append(toggle);
    $(div).append('<span style="padding-left: 5px;">BBCode</span>');
    $(pop).append(div);
    
    var toggleSFW = $('<input type="checkbox" />');
    $(div).append(toggleSFW);
    $(div).append('<span style="padding-left: 5px;">Hide Mature Stories</span>');
    $(pop).append(div);
    
    
    var upd = function() {
        if (toggle[0].checked) {
            if (toggleSFW[0].checked) {
                pop.children[0].value = $(pop.children[0]).attr('sfwCode');
            } else {
                pop.children[0].value = $(pop.children[0]).attr('bbCode');
            }
        } else {
            if (toggleSFW[0].checked) {
                pop.children[0].value = $(pop.children[0]).attr('sfw');
            } else {
                pop.children[0].value = $(pop.children[0]).attr('normal');
            }
        }
    }
    
    $(toggle).attr('checked', false);
    $(toggle).click(upd);
    
    $(toggleSFW).attr('checked', true);
    $(toggleSFW).click(upd);
    
    position(pop.parentNode.parentNode, "center", "center");
}

function censorStory(element, name) {
    var storyEntry = element.parentNode.parentNode;
    var info;
    if ($(storyEntry).hasClass('story_data')) {
        info = storyEntry.children[1];
    } else {
        storyEntry = storyEntry.parentNode.parentNode;
        info = $(storyEntry).find('.chapters li.bottom');
        info = info[info.length - 1];
    }
    
    info = info.children;
    for (var i = 0; i < info.length; i++) {
        var t = info[i].innerHTML.toLowerCase();
        if (t == 'mature' || t == 'sex') {
            return '--hidden--';
        }
    }
    
    return name;
}

//--------------------------------------------------------------------------------------------------
//--------------------------------------API FUNCTIONS-----------------------------------------------
//--------------------------------------------------------------------------------------------------
    
//==API FUNCTION==//
var el;
function decodeHTML(txt) {
    txt = replaceAll('<', '[({', txt);
    txt = replaceAll('>', '})]', txt);
    
    if (el == null || el == undefined) {
        el = document.createElement('div');
    }
    
    el.innerHTML = txt;
    txt = el.textContent;
    el.textContent = '';
    
    txt = replaceAll('[({', '<', txt);
    txt = replaceAll('})]', '>', txt);
    
    return txt;
}

//==API FUNCTION==//
function ShowCustomError(title, message) {
    var originalTitle = error_window_title;
    error_window_title = [ title ];
    ShowErrorWindow(message);
    error_window_title = originalTitle;
}

//==API FUNCTION==//
function getFavicon(url) {
    if (contains(url, 'userscripts.org')) {
        return 'http://userscripts.org/images/script_icon.png';
    }
    return 'http://' + getSite(url) + '/favicon.ico';
}

//==API FUNCTION==//
function getSite(url) {
    if (contains(url, ':')) {
        url = url.split(':')[1];
    }
    while (startsWith(url, '/')) {
        url = url.substring(1, url.length);
    }
    url = url.split('/')[0];
    if (startsWith(url, 'www.')) url = url.substring(4, url.length);
    return url;
}

//==API FUNCTION==//
function chooseTheme(id, save) {
    if (save == true) {
        selectTheme(id);
    } else {
        $('#title a.home_link').css('background-image','url("' + safeGetThemeArray()[id][1] + '")');
        if (safeGetThemeArray()[id][2] == "") {
            $('#source_link').addClass('hidden');
        } else {
            $('#source_link').attr('href', themes[id][2]);
            $('#source_link').removeClass('hidden');
        }

        if (safeGetThemeArray()[id][3] != "") {
            $('.user_toolbar').css('background-color', safeGetThemeArray()[id][3]);
        }
    }
        
    if (safeGetThemeArray()[id].length > 4 && safeGetThemeArray()[id][4] != "") {
        $('#title a.home_link').css('background-size', '1300px');
        $('#title a.home_link').css('background-position', safeGetThemeArray()[id][4]);
    } else {
        $('#title a.home_link').css('background-size', '');
        $('#title a.home_link').css('background-position', '');
    }
    
    updateCheckColors(id);
}

//==API FUNCTION==//
function changeBanner(img, color, pos) {
    $('#title a.home_link').css('background-image','url("' + img + '")');
    $('.user_toolbar').css('background-color', color);
        
    if (pos != null && pos != undefined && pos != '') {
        $('#title a.home_link').css('background-size', '1300px');
        $('#title a.home_link').css('background-position', pos);
    } else {
        $('#title a.home_link').css('background-size', '');
        $('#title a.home_link').css('background-position', '');
    }
    
    changeCheckColors(color);
}

//==API FUNCTION==//
function gradient(obj, start, end) {
    if (start != null && start != undefined && start != '') {
        var prev = $(obj).css('box-shadow');
        $(obj).attr('data-box-saved', prev);
        var gradStart = 'inset 800px 0 200px -100px ' + start;
        var gradEnd = 'inset -800px 0 200px -100px ' + end;
        
        $(obj).css('box-shadow', (prev != '' ? prev + ',' : '') + gradStart + ',' + gradEnd);
    } else {
        var prev = $(obj).attr('data-box-saved');
        $(obj).css('box-shadow', (prev != null && prev != undefined) ? prev : '');
    }
}

//==API FUNCTION==//
function updateCheckColors(id) {
    if (themes[id][3] != "") {
        changeCheckColors(themes[id][3]);
    }
}

//==API FUNCTION==//
function changeCheckColors(color) {
    $('.styledCheckBoxPaddle').each(function(index) {
        $(this).css('background-color', color);
    })
}

//==API FUNCTION==//
function AppendPopup(message, field) {
    var box = document.createElement("div");
    $(box).attr("class", "tooltip_popup");
    $(box).attr("style", "display: none; opacity: 0; position: relative; transition: opacity 0.5s ease;");
    $(box).append("<div class=\"arrow\"><div /></div>");
    $(box).append("<div style=\"min-width: 40px\" class=\"tooltip_popup_tooltip\">" + message + "</div>");
    $(field).before(box);
    $(field).focus(function (e) {
        $(box).css("display", "block");
        setTimeout(function() {
        $(box).css("opacity", "");},1);
    });
    $(field).blur(function(e) {
        $(box).css("opacity", 0);
        setTimeout(function() {
        $(box).css("display", "none");},500);
    });
}

//==API FUNCTION==//
function supportsFancyControls() {
    var result = false;
    if (navigator.userAgent.toLowerCase().indexOf('windows nt') != -1) {
        logger.Log('Detected Windows');
        var ver = navigator.userAgent.toLowerCase().split('windows nt ');
        for (var i = ver.length - 1; i >= 0; i--) {
            var char = ver[i][0];
            var verf = parseFloat(ver[i].split(';')[0]);
            logger.Log('OSVersionNumber: ' + verf);
            if (char == '5' || char == '6') {
                result = verf <= 6.1;
                break;
            }
        }
    }
    logger.Log('supportsFancyControls: ' + result);
    return result;
}

//==API FUNCTION==//
function registerBanner(name, img, source, color, pos) {
    safeGetThemeArray().push([name, img, source, color, pos]);
}

//==API FUNCTION==//
function registerBanners(banners) {
    try {
        [].push.apply(safeGetThemeArray(), banners);
    } catch (e) {}
}

//==API FUNCTION==//
function preLoadImagesJ(images) {
    $('body').append('<div style="background:url(' + images.join('),url(') + ');position:absolute;top:-9999px;left:-9999px;width:0px;height:0px;" />');
}

//==API FUNCTION==//
function makeLogo(img, r) {return "<i class=\"" + img + '"' + (r == true ? '' : ' style="width:23px;float:left;"') + ' />';}

//==API FUNCTION==//
function isMyBlogPage() {
    if (getIsLoggedIn()) {
        if (startsWith(document.location.href, "http://www.fimfiction.net/user/" + getUserNameEncoded() + "/blog")) return true;
        return startsWith(document.location.href, "http://www.fimfiction.net/user/" + replaceAll(' ', '+', getUserName()) + "/blog");
    }
    return false;
}

//==API FUNCTION==//
function isMyPage() {
    if (document.location.href == ("http://www.fimfiction.net/user/" + getUserNameEncoded())) {
        return true;
    }
    return document.location.href == ("http://www.fimfiction.net/user/" + replaceAll(' ', '+', getUserName()));
}

//==API FUNCTION==//
function getIsLoggedIn() {
    try {
        return logged_in_user != null;
    } catch (e) {
    }
    return false;
}

//==API FUNCTION==//
function getUserNameEncoded() { return encodeURIComponent(getUserName()); }

//==API FUNCTION==//
function getUserName() {return getIsLoggedIn() ? getUserButton().getAttribute("href").split("/").reverse()[0] : 'Anon';}

//==API FUNCTION==//
function getUserButton() {
    return $(".user_toolbar div.user_drop_down_menu")[0].children[0];
}

//==API FUNCTION==//
function makeStyle(input, id) {
    while (contains(input, '  ')) {
        input = replaceAll('  ',' ', input);
    }
    var style = document.createElement('style');
    $(style).attr('type', 'text/css');
    $(style).append(input);
    if (id != undefined && id != null) {
        style.id = id;
    }
    $('head').append(style);
}

//==API FUNCTION==//
//Returns true if Extra emticos have already been initialized on this page
function getInit() {return $('div#extraemoticons_loaded').length > 0;}

//==API FUNCTION==//
function isCompactView() {return getElementByContent("a", "+ Switch to full view") != null;}

//==API FUNCTION==//
function setSpecialTitle(userIds, title) {
    for (var  i = 0; i < userIds.length; i++) {
        $(".author > .avatar > img[src^='//www.fimfiction-static.net/images/avatars/" + userIds[i] + "']").each(function(item) {
            var prev = this.parentNode.previousSibling;
            if (prev != null && prev != undefined && prev.innerHTML != title) {
                $(this.parentNode).before("<div class=\"author-badge\" >" + title + "</div>");
            }
        });
    }
}

//==API FUNCTION==//
function changeLogo(button, index, img, right) {
    logger.Log('changeLogo: start');
    try {
        if (button != null && button != undefined) {
            if (button.children[index].children[0].tagName == "IMG") {
                $(button.children[index].children[0]).remove();
                $(button.children[index]).prepend(makeLogo(img, right));
            } else {
                logger.Log('logo already changed! ' + index + ' ' + img);
            }
        } else {
            logger.Log('warning! button is null: ' + index + ', ' + img + ', ' + right);
        }
    } catch (e) {
        logger.Severe('error in changingLogo: ' + e);
        logger.Error('changeLogo: button=' + button);
        logger.Error('changeLogo: index=' + index);
        logger.Error('changeLogo: img=' + img);
        logger.Error('changeLogo: right=' + right + '(' + (right == true) + ')');
    }
    logger.Log('changeLogo: start');
}

//==API FUNCTION==//
function finaliseThemes() {
    var themeId = getCookie('selected_theme');
    if (themeId != null && themeId != undefined) {
        var t = safeGetThemeArray();
        for (var i = 0; i < t.length; i++) {
            if (safeGetThemeArray()[i][0] == themeId) {
                theme = i;
                $(".user_toolbar").css('transition', 'none');
                chooseTheme(i);
                $(".user_toolbar").css('transition', '');
                return;
            }
        }
    }
    
    themeId = Math.floor(Math.random() * safeGetThemeArray().length);
    
    $(".user_toolbar").css('transition', 'none');
    chooseTheme(themeId);
    $(".user_toolbar").css('transition', '');
    themeId = safeGetThemeArray()[themeId][0];
}

//==API FUNCTION==//
function safeGetThemeArray() {
    return getSafe('themes', []);
}

//==API FUNCTION==//
function getSafe(name, defaultValue) {
    try{if(window[name]===undefined)throw'E';}
    catch(E){window[name]=defaultValue;}
    return window[name];
}

//==API FUNCTION==//
function makeToolTip(button) {
    var popup = document.createElement("div");
    $(popup).attr("style", "z-index: 50; text-align: left; position: absolute; padding-top: 30px; margin-top: -30px;");
    $(popup).append("<div style=\"color: black; text-shadow: none; padding: 4px; border-radius: 5px;background-color:#FFF; border:1px solid silver; -webkit-box-shadow:1px 1px 5px #CCC;-moz-box-shadow:1px 1px 5px #CCC;box-shadow:1px 1px 5px #CCC;\"></div>");
    $(button).append(popup);
    $(popup).hover(function(e) { }, function(e) {
        $(this).remove();
    });
    return popup.children[0];
}

//==API FUNCTION==//
function makePopup(button, title, fafaText, img) {
    logger.Log('makePopup: start');
    var holder = document.createElement("div");
    $("body").append(holder);
    $(holder).addClass("drop-down-pop-up-container");
    $(holder).attr("style", "position: absolute;z-index:2237483647;");
    $(holder).hover(function(e) { }, function(e) {
        $(this).remove();
    });
    
    $(holder).css("left", $(button).offset().left + "px");
    $(holder).css("top", ($(button).offset().top + $(button).height()) + "px");
    
    var pop = $("<div class=\"drop-down-pop-up\" style=\"width: auto\" />");
    $(holder).append(pop);
    
    var head = document.createElement("h1");
    $(pop).append(head);
    if (fafaText != null) {
        $(head).append("<i class=\"" + fafaText + "\" /i>");
    } else if (img != null) {
        $(head).append("<img src=\"" + img + "\" style=\"width:18px;height:18px;margin-right:5px;\" /img>");
    }
    $(head).append(title);
    
    var content = document.createElement("div");
    $(content).addClass("drop-down-pop-up-content");
    $(pop).append(content);
    logger.Log('makePopup: end');
    return content;
}

//==API FUNCTION==//
function makeGlobalPopup(title, fafaText, darken, img) {
    logger.Log('makeGlobalPopup: start');
    var holder = document.createElement("div");
    $("body").append(holder);
    $(holder).addClass("drop-down-pop-up-container");
    $(holder).attr("style", "position: fixed;z-index:2147483647;left:10px;top:10px");
    $(holder).addClass('global_popup');
    
    var dark = $("<div style=\"position: fixed;left:0px;right:0px;top:0px;bottom:0px;background-color:rgba(0,0,0,0.4); z-index:100000;\" />");
    if (typeof(darken) == 'number') {
        dark.css('background-color', 'rgba(0,0,0,' + (darken/100) + ')');
        $("body").append(dark);
    } else if (darken == null || darken) {
        $("body").append(dark);
    }
    
    var pop = $("<div class=\"drop-down-pop-up\" style=\"width: auto\" />");
    $(holder).append(pop);
    
    var head = document.createElement("h1");
    $(head).css("cursor","move");
    $(pop).append(head);
    if (fafaText != null) {
        $(head).append("<i class=\"" + fafaText + "\" /i>");
    } else if (img != null) {
        $(head).append("<img src=\"" + img + "\" style=\"width:18px;height:18px;margin-right:5px;\" /img>");
    }
    $(head).append(title);
    
    head.onmousedown = function(event) {
        var x = event.clientX - parseInt(holder.style.left.split('px')[0]);
        var y = event.clientY - parseInt(holder.style.top.split('px')[0]);
        document.onmousemove = function(event) {
            position(holder, event.clientX - x, event.clientY - y, 30);
        };
        event.preventDefault();
    };
    head.onmouseup = function(e) {
        document.onmousemove = function(e) {};
    };
    
    var close = document.createElement("a");
    $(close).addClass("close_button");
    $(close).attr("id", "message_close_button");
    $(close).click(function(e) {
        $(dark).remove();
        $(holder).remove();
    });
    $(head).append(close);
    
    var content = document.createElement("div");
    $(content).addClass("drop-down-pop-up-content");
    $(pop).append(content);
    logger.Log('makeGlobalPopup: end');
    return content;
}

//==API FUNCTION==//
function InvalidHexColor(color) {
    for (var i = 0; i < ColourMappingNames.length; i++) {
        if (color.toLowerCase() == ColourMappingNames[i].toLowerCase()) {
            return i;
        }
    }

    if (startsWith(color, '#')) {
        color = color.substring(1, color.length);
    }
    
    if (color.length != 3 && color.length != 6) return "true";
    
    for (var i = 0; i < color.length; i++) {
        if (!isHexLetter(color[i])) {
            return "true";
        }
    }
    
    return "false";
}

//==API FUNCTION==//
function isHexLetter(letter) {
    var valid = "0123456789ABCDEF";
    for (var t = 0; t < valid.length; t++) {
        if (valid[t].toUpperCase() == letter.toUpperCase()) {
            return true;
        }
    }
    return false;
}

//==API FUNCTION==//
function makeButton(a, text,img){
    var b=document.createElement("li");
    $(b).append("<a href=\"javascript:void();\" title=\"" + text + "\"><i class=\"" + img + "\"></i></a>");
    $(a.parentNode).append(b);
    return b;
}

//==API FUNCTION==//
function addOption(list, func, title, breakline) {
    var a = document.createElement("a");
    a.setAttribute("href", "javascript:" + func);
    a.setAttribute("class", "subOption");
    a.innerHTML = "<div>" + title + "</div>";
    a.setAttribute("style", "border-radius: 4px; margin-left: 5px; margin-right: 5px;");
    $(list).append(a);
    if (breakline == null || breakline) {
        $(list).append("</br>");
    }
    return a.children[0];
}

//==API FUNCTION==//
function getListItemWidth(list) {
    var result = 0;
    for (var i = 0; i < list.children.length;i++) {
        var w = list.children[i].offsetWidth;
        if (w > result) result = w;
    }
    return result;
}

//==API FUNCTION==//
function setListItemWidth(list) {
    var w = getListItemWidth(list);
    for (var i = 0; i < list.children.length; i++) {
        list.children[i].style.width = w + "px";
    }
}

//==API FUNCTION==//
function getElementByContent(tag, content) {
    var all = document.getElementsByTagName(tag);
    for (var i = 0; i < all.length; i++) {
        if (all[i].innerHTML == content) {
            return all[i];
        }
    }
}

//==API FUNCTION==//
function getElementsByClass(tag, clas) {
    var elements = document.getElementsByTagName(tag);
    var results = [];
    for (var i = 0; i < elements.length; i++) {
        if ($(elements[i]).hasClass(clas)) {
            results.push(elements[i]);
        }
    }
    return results;
}

//==API FUNCTION==//
function getElementsByAttributeValue(tag, name, value) {
    var elements = document.getElementsByTagName(tag);
    var result = [];
    for (var i = 0; i < elements.length; i++) {
        if ($(elements[i]).attr(name) == value) result.push(elements[i]);
    }
    return result;
}

//==API FUNCTION==//
function rotateObject(obj, deg) {
    $(obj).css("transform", "rotate(" + deg + "deg)");
    if (deg % 360 == 0) {
        $(obj).css("transform", "");
    }
}

//==API FUNCTION==//
function position(obj, x, y, buff) {
    if (typeof x == "string" && x.toLowerCase() == "center") {
        x = ($(window).width() - $(obj).width()) / 2;
    }
    if (typeof y == "string" && y.toLowerCase() == "center") {
        y = ($(window).height() - $(obj).height()) / 2;
    }
    
    if (buff == null || buff == undefined) {
        buff = 0;
    }
    
    if (x < buff) x = buff;
    if (y < buff) y = buff;
    
    var maxX = $(window).width() - ($(obj).width() + buff);
    if (x > maxX) x = maxX;
    
    var maxY = $(window).height() - ($(obj).height() + buff);
    if (y > maxY) y = maxY;
    
    $(obj).css('top', y + "px");
    $(obj).css('left', x + "px");
}

//==API FUNCTION==//
function isChrome() {
    return window.navigator.vendor === "Google Inc.";
}

//==API FUNCTION==//
function isJQuery() {
    try {
        if ($ == undefined) {}
        return true;
    } catch (e) {}
    return false;
}

//==API FUNCTION==//
function BG(name, css, source) {
    this.Able = typeof(name) == 'string';
    this.Css = css;
    this.Name = name;
    
    this.Setup = function(blank, c, i) {
        blank.children[1].innerHTML = name;
        $(blank.children[0]).css("background-color", c);
        $(blank.children[0]).css("opacity", "0.8");
        $(blank).css("background", replaceAll(" fixed", "", this.Css));
        $(blank).attr("data-bg-index", i);
        $(blank).css("background-size", "cover");
        $(blank).click(function() {
            setBackgroundImg($(this).attr("data-bg-index"));
            updateBackground(getBGColor());
        });
        
        if (source != null) {
            $(blank).css('position', 'relative');
            $(blank).append('<a class="bg_source_link" href="' + source + '" >Source</a>');
        }
    }
}

//--------------------------------------------------------------------------------------------------
//-----------------------------------OPTION FUNCTIONS-----------------------------------------------
//--------------------------------------------------------------------------------------------------

//==API FUNCTION==//
function getRecentColours(num) {
    var recent = _getRecentColours();
    return recent.length > 0 ? ('#' + replaceAll(';',';#', recent)).split(';').reverse().splice(0, num) : [];
}

function _getRecentColours() {
    return hasDocCookie('colour_use_history') ? getDocCookie('colour_use_history') : '';
}

function clearRecentColours() {
    setDocCookie('colour_use_history', '');
    removeDocCookie('colour_use_history');
}

function addRecent(color) {
    var recent = _getRecentColours();
    recent = recent.length > 0 ? ('#' + replaceAll(';', ';#', recent)).split(';') : [];
    for (var i = recent.length - 1; i >= 0; i--) {
        if (recent[i] == color) recent.splice(i, 1);
    }
    recent.push(color);
    if (recent.length > 15) recent.splice(0,1);
    setDocCookie('colour_use_history', replaceAll('#', '', recent.join(';')));
}

//==API FUNCTION==//
function getBookmark(num) {
    num = hasDocCookie(num + '_bookmark_position') ? parseInt(getDocCookie(num + '_bookmark_position')) : null;
    return num != null && num >= 0 ? num : null;
}

//==API FUNCTION==//
function setBookmark(name, val) {
    setDocCookie(name + '_bookmark_position', val);
    setDocCookie(name + '_bookmark_d', $('.chapter_content_box span.author > a').text() + '\n' + $('#chapter_title').text());
}

//==API FUNCTION==//
function getTotalBookmarks() {
    var result = 0;
    var keys = getDocKeys();
    for (var i = 0; i < keys.length; i++) {
        if (keys[i].indexOf('bookmark_position') != -1) {
            result++;
        }
    }
    return result;
}

//==API FUNCTION==//
function removeBookmark(name) {
    setDocCookie(name + '_bookmark_position', -1);
    removeDocCookie(name + '_bookmark_position');
    removeDocCookie(name + '_bookmark_d');
}

//==API FUNCTION==//
function removeAllBookmarks() {
    var keys = getDocKeys();
    for (var i = 0; i < keys.length; i++) {
        if (keys[i].indexOf('bookmark_position') != -1) {
            removeBookmark(keys[i].replace('_bookmark_position', ''));
        }
    }
}

//==API FUNCTION==//
function getBookmarkData(name) {
    var result = {};
    if (hasDocCookie(name + '_bookmark_d')) {
        var data = getDocCookie(name + '_bookmark_d').split('\n');
        result.title = data[0];
        result.chapTitle = data[1];
        result.error = false;
    }
    return result;
}

//==API FUNCTION==//
function setBookmarkData(name, me) {
    setDocCookie(name + '_bookmark_d', me.title + '\n' + me.chapTitle);
}

function getStoryNumber() {
    var location = document.location.href;
    if (contains(location, 'story/')) {
        var storySuffex =  location.split('story/')[1].split('/');
        var storyNumber = storySuffex[0];
        var chapter = storySuffex[1];
        return storyNumber + ':' + chapter;
    }
    
    var story = $('.chapter_content_box').attr('id').split('_')[1];
    return story + '_' + location.split('chapter/')[1].split('/')[0];
}


//==API FUNCTION==//
function getSaveFocus() {
    return hasDocCookie("ultra_snow_save_focus") ? getDocCookie("ultra_snow_save_focus") == 'true' : true;
}

//==API FUNCTION==//
function getShuffle() {
    return hasDocCookie("shuffle_slideShow") && getDocCookie("shuffle_slideShow") == 'true';
}

function setShuffle(v) {setDocCookie("shuffle_slideShow", v);}

//==API FUNCTION==//
function getStoryWidth() {
    if (hasDocCookie("storyWidth")) {
        var result = getDocCookie("storyWidth");
        if (parseInt(result) > 0) {
            return result;
        }
    }
    return '46em';
}

function setStoryWidth(v) {setDocCookie("storyWidth", v);}

//==API FUNCTION==//
function getWideNotes() {
    return hasDocCookie("wideAuthorNotes") && getDocCookie("wideAuthorNotes") == 'true';
}

function setWideNotes(v) {setDocCookie("wideAuthorNotes", v);}

//==API FUNCTION==//
function getCustomBanner() {
    if (hasDocCookie("customBannerUrl") && hasDocCookie("customBannerColor") && hasDocCookie("customBannerPosition")) {
        var url = getDocCookie("customBannerUrl");
        var color = getDocCookie("customBannerColor");
        var pos = getDocCookie("customBannerPosition");
        
        if (url == '-none-' || color == '-none-' || pos == '-none-') {
            return null;
        }
        
        if (url == null || url == undefined) url = '';
        if (color == null || color == undefined) color = '';
        if (pos == null || pos == undefined) pos = '';
        
        return [url,color,pos];
    }
    return null;
}

function unsetCustomBanner() {
    setCustomBanner('-none-', '-none-', '-none-');
}

function setCustomBanner(url, color, pos) {
    setDocCookie("customBannerUrl", url);
    setDocCookie("customBannerColor", color);
    setDocCookie("customBannerPosition", pos);
}

//==API FUNCTION==//
function getLogoO() {
    return hasDocCookie('logo_opacity') ? parseInt(getDocCookie('logo_opacity')) : 100;
}

function setLogoO(v) {
    setDocCookie('logo_opacity', v);
}


//==API FUNCTION==//
function getOldLogo() {
    return hasDocCookie("oldLogo") ? parseInt(getDocCookie("oldLogo")) : 0;
}

function setOldLogo(v) {setDocCookie("oldLogo", v);}

//==API FUNCTION==//
function getSlide() {
    return hasDocCookie("slideShow") ? parseInt(getDocCookie("slideShow")) : 0;
}

function setSlide(v) {setDocCookie("slideShow", v);}

//==API FUNCTION==//
function getSig() {
    return hasDocCookie("user_sig") ? getDocCookie("user_sig") : defSig();
}

function defSig() {
    return "%message%\n\n--[i]%name%[/i]";
}

function setSig(v) {setDocCookie("user_sig", v);}

//==API FUNCTION==//
function getSnowing() {
    return hasDocCookie("snow_bg") ? parseInt(getDocCookie("snow_bg")) : 1;
}

function setSnowing(v) {setDocCookie("snow_bg", v);}

//==API FUNCTION==//
function getTitleHidden() {
    return hasDocCookie("titleHidden") ? getDocCookie("titleHidden") == "true" : false;
}

function setTitleHidden(v) {setDocCookie("titleHidden", v);}

function updateBackground(c) {
    var img = getBackgroundImg();
    if (img != '') {
        $('body').css("background", img + " " + c);
    } else {
        $('body').css("background-color", c);
    }
    setDocCookie("bgColor", c);
}

//==API FUNCTION==//
function getBGColor() {
    return hasDocCookie("bgColor") ? getDocCookie("bgColor") : "";
}

//==API FUNCTION==//
function getBackgroundImg() {
    var index = (hasDocCookie("bgImg") ? parseInt(getDocCookie("bgImg")) : -1);
    
    if (index < 0) return '';
    
    try {return backgroundImages[index].Css;
    } catch (e) {}
    
    return backgroundImages[0].Css;
}

function setBackgroundImg(v) {setDocCookie("bgImg", v);}

//==API FUNCTION==//
function getSweetieEnabled() {
    return hasDocCookie("sweetie_staff_enabled") ? getDocCookie("sweetie_staff_enabled") == "true" : false;
}

function setSweetieEnabled(val) {setDocCookie("sweetie_staff_enabled", val);}

//==-------------END-OPTIONS-------------==//

function getDocKeys() {
    var keys = [];
    for (var i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i));
    }
    return keys;
}

//==API FUNCTION==//
function setDocCookie(name, val) {
    logger.Log('setCookie: ' + name);
    //docCookies.setItem(name, val, Infinity, '/', 'fimfiction.net');
    localStorage[name] = val;
}

function getDocCookie(name) {
    logger.Log('getCookie: ' + name);
    return localStorage[name];
}

function hasDocCookie(name) {
    //-------Port Cookies to DOM
    if (docCookies.hasItem(name)) {
        localStorage[name] = docCookies.getItem(name);
        docCookies.removeItem(name, '/', 'fimfiction.net');
        return true;
    }
    //-------Port Cookies to DOM
    return localStorage[name] != null;
}


//==API FUNCTION==//
function removeDocCookie(name) {
    logger.Log('removeCookie: ' + name);
    localStorage.removeItem(name);
}

//==API FUNCTION==//
function getPageStartNumber() {
    var pageNumber = getParameter("page");
    if (pageNumber != null) {
        pageNumber = parseInt(pageNumber);
        var weight = isCompactView() ? 100 : 10;
        return (pageNumber - 1) * weight;
    }
    
    return 0;
}

//==API FUNCTION==//
function getParameter(name) {
    var params = document.location.href.split("?")[1].split("&");
    for (var i = 0; i < params.length; i++) {
        if (startsWith(params[i], name + "=")) {
            return params[i].split("=")[1];
        }
    }
}

//==API FUNCTION==//
function makeSettingsTab(title, name, img) {
    logger.Log('makeSettingsTab2: start');
    if ($('#settingsTabsRegister').length == 0) {
        $('body').append('<div style="display:none !important;" id="settingsTabsRegister" />');
    }
    var registered = [];
    if ($('#settingsTabsRegister').html() != '') {
        registered = $('#settingsTabsRegister').html().split('\n');
    }
    registered.push(name + ':' + img + ':' + title);
    
    var result = new SettingsTab();
    var page = document.location.href.split('/').reverse()[0];
    var tabs = $('.tabs');
    
    if (page.split('=')[0] == 'index.php?view') {
        if (page.split("=")[1] == 'local_settings' || (function() {
            for (var i = 0; i < registered.length; i++) {
                if (page.split("=")[1] == registered[i].split(':')[0]) return true;
            }
            return false;
        })()) {
            if (page.split("=")[1] == 'local_settings') {
                var form = $('.user_cp');
                form.css('display', 'table');
                form.find('form').attr("class", "content_box");
                form.find('form').attr("style", "display:table-cell;width:100%;");
                form.find('.content_box_header').remove();
            } else if (tabs.length == 0) {
                var area = $('.content_box');
                area.html('<div class="user_cp" style="display:table;"><div class="content_box" style="display:table-cell;width:100%;" /></div>');
            }
            
            if (tabs.length == 0) {
                tabs = $('<div class="tabs" />');
                $(tabs).append("<ul><li class=\"tab" + (page.split("=")[1] == "local_settings" ? " tab_selected" : "") + "\"><a href=\"/index.php?view=local_settings\" title=\"Local Settings\"><i class=\"fa fa-cog\" /><span>Local Settings</span></a></li></ul>");
                $('.user_cp').prepend(tabs);
            }
        }
    }
    
    if (tabs.length > 0) {
        for (var i = 0; i < registered.length; i++) {
            if ($('li[pageName="' + registered[i].split(':')[0] + '"]').length == 0) {
                var tab = $('<li class="tab" pageName=' + registered[i].split(':')[0] + '><a><i class="' + registered[i].split(':')[1] + '"></i><span>' + registered[i].split(':')[2] + '</span></a></li>');
                
                $(tabs).find('ul').append(tab);
                
                if (page.split('=')[0] == 'index.php?view') {
                    $(tab.children()[0]).attr("href", "/index.php?view=" + registered[i].split(':')[0]);
                } else {
                    $(tab.children()[0]).attr("href", "/manage_user/" + registered[i].split(':')[0]);
                }
            }
        }
        
        if (page.split('=')[0] == 'index.php?view') {
            page = page.split('=')[1].split('&')[0];
        }
        
        if (page.split('#')[0] == name) {
            logger.Log('makeSettingsTab: calling init');
            tab.addClass('tab_selected');
            tabs = tabs.parent().children()[1];
            result.init(tabs);
        }
    }
    
    
    $('#settingsTabsRegister').html(registered.join('\n'));
    return result;
}

//==API FUNCTION==//
function SettingsTab() {
    var context;
    var has_init = false;
    
    var tabl;
    var error;
    
    this.HasInit = function() {
        return has_init;
    }
    
    this.init = function(canvas) {
        logger.Log('settingsTab.init: start');
        $(canvas).append("<form></form>");
        context = canvas.children[0];
        has_init = true;
        
        error = document.createElement("div");
        error.setAttribute("id", "validation_error_message");
        error.setAttribute("class", "validation_error");
        error.style.display = "none";
        $(context).append(error);
        $(error).append("<div class=\"message\" style=\"margin-bottom:10px;\">There were errors in the settings you chose. Please correct the fields marked<img class=\"icon_16\" style=\"vertical-align:-3px;\" src=\"//www.fimfiction-static.net/images/icons/cross.png\"></img>. Hover over to see the error.</div>");
        
        tabl = document.createElement("table");
        tabl.setAttribute("class", "properties");
        var holder = $('<div id="SettingsPage_Parent" />');
        holder.append(tabl);
        $(context).append(holder);
        $(tabl).append("<tbody></tbody>");
        
        tabl = tabl.children[0];
        logger.Log('settingsTab.init: end');
    }
    
    this.ShowError = function() {
        error.style.display = "block";
    }
    
    this.HideError = function() {
        error.style.display = "none";
    }
    
    this.StartEndSection = function(title) {
        if (has_init) $(tabl).append("<tr><td class=\"section_header\" colspan=\"2\"><b>" + title + "</b></td></tr>");
    }
    
    this.getValue = function(id) {
        var fields = tabl.getElementsByTagName("input");
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].getAttribute("inputID") == id) {
                var field = fields[i];
                
                if (field.getAttribute("type") == "checkbox") {
                    return field.checked;
                }
                return field.value;
            }
        }
    }
    
    this.AddColorPick = function(id, name, selected, func) {
        if (has_init) {
            if ($('#settingsTab_colorPickerStyle').length == 0) {
                makeStyle("\
                    div.colour_pick_selected {\
                        outline: 2px solid rgb(221, 85, 0);\
                        position: relative;\
                        z-index: 1;}\
                    div.colour_picker_box {\
                        display: inline-block;\
                        vertical-align: middle;\
                        background-color: rgb(248, 248, 248);\
                        border: 1px solid rgb(187, 187, 187);\
                        margin-left: 10px;\
                        line-height: 0px;\
                        padding-bottom: 1px;}\
                    div.colour_pick {\
                        display: inline-block;\
                        width: 16px;\
                        height: 16px;\
                        margin: 1px 0px 0px 1px;\
                        border: 1px solid rgba(0, 0, 0, 0.2);\
                        vertical-align: middle;\
                        cursor: pointer;\
                        box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.2) inset;}", "settingsTab_colorPickerStyle");
            }
            var input = document.createElement("div");
            $(input).append("<input style=\"width: 100px;\" data-type=\"colour\" type=\"text\" />");
            
            var picker = $("<div class=\"colour_picker_box\" />");
            
            var colors = ["#d3926b","#d3b76b","#d3cf6b","#b4d36b","#88d36b","#6bd38d","#6bd3bc","#6bafd3","#6b81d3","#8b6bd3","#bc6bd3","#d36bab","#d36b77"];
            var grayScale = ["#000","#111","#333","#555","#777","#999","#aaa","#ccc","#ddd","#eee"];
            
            for (var i = 0; i < colors.length; i++) {
                $(picker).append('<div class="colour_pick' + (colors[i] == selected ? ' colour_pick_selected' : '') + '" data-colour="' + colors[i] + '" style="background-color:' + colors[i] + ';" />');
            }
            $(picker).append("<br />");
            for (var i = 0; i < grayScale.length; i++) {
                $(picker).append('<div class="colour_pick' + (grayScale[i] == selected ? ' colour_pick_selected' : '') + '" data-colour="' + grayScale[i] + '" style="background-color:' + grayScale[i] + ';" />');
            }
            for (var i = 0; i < picker.children().length; i++) {
                $(picker.children()[i]).on("click", function() {
                    input.children[0].value = this.getAttribute("data-colour");
                    for (var j = 0; j < picker.children().length; j++) {
                        $(picker.children()[j]).attr("class", "colour_pick");
                    }
                    this.setAttribute("class", "colour_pick colour_pick_selected");
                    $(input.children[0]).change();
                });
            }
            $(input).append(picker);
            
            this.AddOption(id, name, input);
            input.children[0].value = selected;
            $(input.children[0]).change(function(e) {
                for (var i = 0; i < picker.children().length; i++) {
                    var c = $(picker.children()[i]).attr("data-colour");
                    if (c != null) {
                        if (c == this.value) {
                            $(picker.children()[i]).attr("class", "colour_pick colour_pick_selected");
                        } else {
                            $(picker.children()[i]).attr("class", "colour_pick");
                        }
                    }
                }
                
                
                func(this, e);
            });
            
            return input.children[0];
        }
    }
        
    this.AddLabelCheckBox = function(id, name, label) {
        if (has_init) {
            var input = $("<label><input inputID=\"" + id + "\" type=\"checkbox\" />" + label + "</label>");
            this.AddOption(id, name, input);
            return input.children[0];
        }
    }
    
    this.AddCheckBox = function(id, name) {
        var check = addGenericInput(this, id, name, "checkbox");
        if (check != null) {
            $(check).attr('id', 'checkBox_' + id);
            $(check).addClass('styledCheckBox');
            
            
            var label = $('<label for="checkBox_' + id + '" ><div class="styledCheckBoxPaddle" /></label>');
            $(check.parentNode).append(label);
            
            $(label.children()[0]).on('mousedown', function(ev) {
                var me = this;
                document.onmousemove = function(e) {
                    var max = $(me).parent().width();
                    var left = (e.clientX - $(me).parent().offset().left) - ($(me).width() / 2);
                    if (left < 0) left = 0;
                    if (left > max) left = max;
                    $(me).css('left', left + 'px');
                    if ((left > (max / 2)) != $(me).parent().prev()[0].checked) {
                        $(me).parent().prev()[0].checked = (left > (max / 2));
                        $(me).parent().prev().click();
                        $(me).parent().prev()[0].checked = (left > (max / 2));
                    }
                };
                $(this).add(document).on('mouseup', function() {
                    document.onmousemove = function() {};
                    document.onmouseup = function() {};
                    $(me).css('left', '');
                });
                ev.preventDefault();
            });
            
            MakeCheckStyle();
        }
        
        return check;
    }
    
    this.AddSlider = function(id, name, val, min, max) {
        var sl = addGenericInput(this, id, name, "range");
        if (sl != null) {
            $(sl).attr('min', min);
            $(sl).attr('max', max);
            $(sl).css('max-width', '50%');
            $(sl).val(val);
        }
        return sl;
    }
    
    this.AddEmailBox = function(id, name) {return addGenericInput(this, id, name, "text", "email");}
    this.AddNameBox = function(id, name) {return addGenericInput(this, id, name, "text", "name");}
    this.AddTextBox = function(id, name) {return addGenericInput(this, id, name, "text");}
    this.AddPassword = function(id, name) {return addGenericInput(this, id, name, "password", "password");}
    
    this.AddDropDown = function(id, name, items) {
        if (has_init) {
            var input = document.createElement("select");
            $(input).attr("inputID", id);
            $(input).addClass('styledDropDown');
            for (var i in items) {
                if (items[i] != null) {
                   $(input).append("<option value=\"" + i + "\">" + items[i] + "</option>");
                }
            }
            
            this.AddOption(id, name, input);
            
            if (supportsFancyControls()) {
                $(input).after('<div class="styled_dropButton"><i class="fa fa-chevron-down" /></div>');
                
                MakeDropButtonStyle();
            }
            
            return input;
        }
    }
    
    this.AddPresetSelect = function(id, name, count, revert, defaultIndex) {
        if (has_init) {
            if ($('#settingsTab_presetStyle').length == 0) {
                makeStyle("\
                    a.premade_settings {\
                        display: inline-block;\
                        width: 100px;\
                        height: 100px;\
                        border: 1px solid rgba(0, 0, 0, 0.5);\
                        margin-right: 10px;\
                        cursor: pointer;\
                        transition: box-shadow 0.25s ease 0s;\
                        vertical-align: middle;\
                        text-decoration: none;}\
                    a.premade_settings:hover {\
                        box-shadow: 0px 0px 10px rgb(196, 111, 111);}\
                    a.premade_settings div.toolbar {\
                        height: 24px;\
                        border-bottom: 1px solid rgba(0, 0, 0, 0.5);\
                        box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.2) inset;}\
                    a.premade_settings span {\
                        display: block;\
                        font-weight: bold;\
                        font-size: 0.8em;\
                        color: rgb(51, 51, 51);\
                        padding: 8px;}", "settingsTab_presetStyle");
            }
            var div = document.createElement("div");
            for (var i = 0; i < count; i++) {
                $(div).append("<a class=\"premade_settings\" style=\"margin-bottom:10px\"><div class=\"toolbar\"></div><span>item " + i + "</span></a>");
            }
            if (revert == true) {
                $(this.AppendResetButton(div.children[0], defaultIndex)).click(function() {
                    div.children[defaultIndex].click();
                });
            }
            
            this.AddOption(id, name, div);
            return div.children;
        }
    }
        
    function addGenericInput(me, id, name, type, clas) {
        if (has_init) {
            var input = document.createElement("div");
            $(input).append("<input" + (clas != null ? " class=\"" + clas + "\"" : "") + " inputID=\"" + id + "\" type=\"" + type + "\" />");
            me.AddOption(id, name, input);
            return input.children[0];
        }
    }
    
    this.AddTextArea = function(id, name, defaul) {
        if (has_init) {
            var input = document.createElement("div");
            $(input).append("<textarea inputID=\"" + id + "\"></textarea>");
            if (defaul != null) {
                input.children[0].value = defaul;
            }
            this.AddOption(id, name, input);
            return input.children[0];
        }
    }
    
    this.AddOption = function(id, name, field) {
        logger.Log('settingsTab.AddOption: start');
        if (has_init) {
            var row = $("<tr />");
            $(row).append("<td id=\"" + id + "\" class=\"label\">" + name + "</td>");
            var data = document.createElement("td");
            $(data).append(field);
            $(row).append(data);
            $(tabl).append(row);
        }
        logger.Log('settingsTab.AddOption: end');
    }
    
    this.AddRaw = function(field) {
        if (has_init) {
            $(tabl).append(field);
        }
    }
    
    this.AddToolbar = function(id, buttonCount, span) {
        if (has_init) {
            var row = $("<tr />");
            var bar = $("<div class=\"type_selector\"></div>");
            $(row).append($("<td colspan=\"" + span + "\" id=\"" + id + "\" style=\"padding: 0px;\" />").append($("<div class=\"notifications\" />").append(bar)));
            $(tabl).append(row);
            
            if (buttonCount != null) {
                for (var i = 0; i < buttonCount; i++) {
                    $(bar).append("<a class=\"styled_button styled_button_grey\" href=\"javascript:void();\"><img src=\"//www.fimfiction-static.net/images/icons/post.png\" /></a>");
                }
            }
            
            return bar;
        }
    }
    
    this.AppendResetButton = function(control, defaultIndex) {
        $(control.parentNode).append("</br></br>");
        var rev = this.AppendButton(control, '<i class="fa fa-undo" />Revert to default');
        if (defaultIndex != null) {
            $(rev).attr("data-revert-index", defaultIndex);
        }
        return rev;
    }
    
    this.AppendButton = function(control, label) {
        var rev = $('<a class="styled_button styled_button_blue">' + label + '</a>');
        $(control.parentNode).append(rev);
        return rev;
    }
    
    this.AddButton = function(id, name, label) {
        if (has_init) {
            var input = $("<a inputID=\"" + id + "\" class=\"styled_button styled_button_blue\">" + label + "</a>");
            this.AddOption(id, name, input);
            return input;
        }
    }
    
    this.AddFinishButton = function(name, func) {
        if (has_init) {
            var me = this;
            var field = document.createElement("div");
            $(field).append("<a class=\"styled_button form_cubmitter\" href=\"javascript:void(0);\"><img src=\"//www.fimfiction-static.net/images/icons/white/save.png\"></img>Save</a>");
            $(field).append("<img class=\"submitting_spinner\" style=\"vertical-align:middle;display:none;\" src=\"//www.fimfiction-static.net/themes/poni2.0/images/loader_light_toolbar.gif\"></img>");
            field.children[0].onclick = function() {
                field.children[1].style.display = "block";
                var fails = func();
                if (fails.length > 0) {
                    me.showError(fails);
                }
                field.children[1].style.display = "none";
            };
            
            this.AddOption("captch", name, field);
        }
    }
}

//==API FUNCTION==//
function MakeCheckStyle() {
    if ($("#settingsTab_checkStyle").length == 0) {
        makeStyle("\
            .styledCheckBox {display: none;}\
            .styledCheckBox + label {\
                cursor: pointer;\
                width: 90px;\
                height: 30px;\
                border: 1px solid rgb(204, 204, 204);\
                outline: medium none;\
                transition: border-color 0.25s ease 0s, background-color 0.25s ease 0s;\
                box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.07) inset !important;\
                background-color: rgb(244, 244, 244) !important;\
                line-height: 19px !important;\
                position: relative;}\
            .styledCheckBox + label > div {\
                background-color: rgb(119, 126, 137);\
                box-shadow: 0px 1px rgba(255, 255, 255, 0.3) inset;\
                border: 1px solid rgba(0, 0, 0, 0.2) !important;\
                border-radius: 3px 0 0 3px;\
                position: absolute;\
                top: 0px;\
                left: 0px;\
                width: 20px;\
                height: 100%;\
                transition: left 0.15s linear, background-color 0.5s ease;}\
            .styledCheckBox + label:hover {\
                background-color: rgb(232, 239, 246) !important;\
                border-color: rgba(0, 0, 0, 0.2);}\
            .styledCheckBox:checked + label {background-color: #88d36b !important;}\
            .styledCheckBox:checked + label > div {\
                left: 70px;\
                border-radius: 0 5px 5px 0;}", "settingsTab_checkStyle");
    }
}

//==API FUNCTION==/
function MakeDropButtonStyle() {
    if ($('#settingsTab_dropButtonStyle').length == 0) {
        var sheet = '\
        .styledDropDown:hover + .styled_dropButton,.styledDropDown:focus + .styled_dropButton {\
            background-color: #eef !important;}\
        .styled_dropButton {\
            z-index:1;\
            position:absolute;\
            width:30px;\
            border: 1px solid rgb(204, 204, 204) !important;\
            border-left: none !important;\
            outline: medium none;\
            transition: border-color 0.25s ease 0s, background-color 0.25s ease 0s;\
            box-shadow: -10px 0px 12px 10px rgba(0, 0, 0, 0.07) inset;\
            text-align: center;\
            pointer-events: none;\
            background-color: white;\
            border-radius: 0 3px 3px 0;';
            
            if (isChrome()) {
                sheet += '\
                    right:12px;\
                    height:40px;\
                    line-height:40px;\
                    margin-top:-40px !important;}';
            } else {
                sheet += '\
                    right:13px;\
                    height:41px;\
                    line-height:41px;\
                    margin-top:-41px !important;}';
            }
            
            makeStyle(sheet, 'settingsTab_dropButtonStyle');
    }
}

//==API FUNCTION==//
function Logger(name,l) {
    var test=null;
    var minLevel=0;
    var line=0;
    var paused=false;
    if(typeof(l)=='number')minLevel=l;
    this.Start=function(level){
        if(typeof(level)=='number')minLevel=level;
        test=$('#debug-console')[0];        
        paused=false;
        if(test==null||test==undefined){
            test = $('<div id="debug-console" style="position:fixed;bottom:0px;left:0px;" />');
            $('body').append(test);
            $(test).click(function(){
                $(this).empty();
                this.style.bottom=this.style.left=line=0;});}
        Output('===Logging Enabled===',minLevel+1);}
    this.Stop=function(){
        if(test!=null){
            $(test).remove();
            test=null;}
        line=0;
        Output('===Logging Disabled===',minLevel+1);}
    this.Pause=function(){
        Output('===Logging Paused===',minLevel+1);
        paused=true;}
    this.Continue=function(){
        paused=false;
        Output('===Logging Continued===',minLevel+1);}
    this.Log=function(txt){Output(txt,0);}
    this.Error=function(txt){Output(txt,1);}
    this.SevereException=function(txt,excep){
        if(excep!='handled'){
            try{
                var stopped=false;
                if(test==null){
                    stopped=true;
                    this.Start();}
                SOut(txt.replace('{0}',excep),2);
                if(excep.stack!=undefined&&excep.stack!=null)SOut(excep.stack,2);
                if(stopped)this.Pause();
            }catch(e){
                alert('Error in displaying Severe: '+e);
                alert('Severe: '+txt);}
            throw'handled';}}
    this.Severe=function(txt){
        try{
            var stopped=false;
            if(test==null){
                stopped=true;
                this.Start();}
            SOut(txt,2);
            if(stopped)this.Pause();
        }catch(e){
            alert('Error in displaying Severe: '+e);
            alert('Severe: '+txt);}}
    function Output(txt,level){
        if(!paused)SOut(txt,level);}
    function SOut(txt, level) {
        if(level==null||level==undefined)level=0;
        if(test!=null&&level>=minLevel){
            if (line>50){
                line=0;
                $(test).empty();}
            $(test).append('<p style="background: rgba('+(line%2==0?'155,0':'0,155')+',0,0.3);">'+ ++line +'):'+name+') '+txt+'</p>');}}
}

var MD5 = function (string) {

   function RotateLeft(lValue, iShiftBits) {
           return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
   }

   function AddUnsigned(lX,lY) {
           var lX4,lY4,lX8,lY8,lResult;
           lX8 = (lX & 0x80000000);
           lY8 = (lY & 0x80000000);
           lX4 = (lX & 0x40000000);
           lY4 = (lY & 0x40000000);
           lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
           if (lX4 & lY4) {
                   return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
           }
           if (lX4 | lY4) {
                   if (lResult & 0x40000000) {
                           return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                   } else {
                           return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                   }
           } else {
                   return (lResult ^ lX8 ^ lY8);
           }
   }

   function F(x,y,z) { return (x & y) | ((~x) & z); }
   function G(x,y,z) { return (x & z) | (y & (~z)); }
   function H(x,y,z) { return (x ^ y ^ z); }
   function I(x,y,z) { return (y ^ (x | (~z))); }

   function FF(a,b,c,d,x,s,ac) {return AddUnsigned(RotateLeft(AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac)), s), b);};
   function GG(a,b,c,d,x,s,ac) {return AddUnsigned(RotateLeft(AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac)), s), b);};
   function HH(a,b,c,d,x,s,ac) {return AddUnsigned(RotateLeft(AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac)), s), b);};
   function II(a,b,c,d,x,s,ac) {return AddUnsigned(RotateLeft(AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac)), s), b);};

   function ConvertToWordArray(string) {
           var lWordCount;
           var lMessageLength = string.length;
           var lNumberOfWords_temp1=lMessageLength + 8;
           var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
           var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
           var lWordArray=Array(lNumberOfWords-1);
           var lBytePosition = 0;
           var lByteCount = 0;
           while ( lByteCount < lMessageLength ) {
                   lWordCount = (lByteCount-(lByteCount % 4))/4;
                   lBytePosition = (lByteCount % 4)*8;
                   lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                   lByteCount++;
           }
           lWordCount = (lByteCount-(lByteCount % 4))/4;
           lBytePosition = (lByteCount % 4)*8;
           lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
           lWordArray[lNumberOfWords-2] = lMessageLength<<3;
           lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
           return lWordArray;
   };

   function WordToHex(lValue) {
           var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
           for (lCount = 0;lCount<=3;lCount++) {
                   lByte = (lValue>>>(lCount*8)) & 255;
                   WordToHexValue_temp = "0" + lByte.toString(16);
                   WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
           }
           return WordToHexValue;
   };

   function Utf8Encode(string) {
           string = string.replace(/\r\n/g,"\n");
           var utftext = "";
           for (var n = 0; n < string.length; n++) {
                   var c = string.charCodeAt(n);
                   if (c < 128) {
                           utftext += String.fromCharCode(c);
                   } else if((c > 127) && (c < 2048)) {
                           utftext += String.fromCharCode((c >> 6) | 192);
                           utftext += String.fromCharCode((c & 63) | 128);
                   } else {
                           utftext += String.fromCharCode((c >> 12) | 224);
                           utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                           utftext += String.fromCharCode((c & 63) | 128);
                   }

           }

           return utftext;
   };

   var x=Array();
   var k,AA,BB,CC,DD,a,b,c,d;
   var S11=7, S12=12, S13=17, S14=22;
   var S21=5, S22=9 , S23=14, S24=20;
   var S31=4, S32=11, S33=16, S34=23;
   var S41=6, S42=10, S43=15, S44=21;
   string = Utf8Encode(string);
   x = ConvertToWordArray(string);
   a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
   for (k=0;k<x.length;k+=16) {
           AA=a; BB=b; CC=c; DD=d;
           a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
           d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
           c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
           b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
           a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
           d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
           c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
           b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
           a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
           d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
           c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
           b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
           a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
           d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
           c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
           b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
           a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
           d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
           c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
           b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
           a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
           d=GG(d,a,b,c,x[k+10],S22,0x2441453);
           c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
           b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
           a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
           d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
           c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
           b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
           a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
           d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
           c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
           b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
           a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
           d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
           c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
           b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
           a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
           d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
           c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
           b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
           a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
           d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
           c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
           b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
           a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
           d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
           c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
           b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
           a=II(a,b,c,d,x[k+0], S41,0xF4292244);
           d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
           c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
           b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
           a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
           d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
           c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
           b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
           a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
           d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
           c=II(c,d,a,b,x[k+6], S43,0xA3014314);
           b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
           a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
           d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
           c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
           b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
           a=AddUnsigned(a,AA);
           b=AddUnsigned(b,BB);
           c=AddUnsigned(c,CC);
           d=AddUnsigned(d,DD);}
        return (WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d)).toLowerCase();
};

//--------------------------------------------------------------------------------------------------
//---------------------------------------VIRTUALISATIONS--------------------------------------------
//--------------------------------------------------------------------------------------------------
function setupSweetie() {
    logger.Log('setupSweetie: start');
    var lastX = -1;
    var lastY = -1;
    
    var lastClientX = -1;
    var lastClientY = -1;
    
    var timestamp;
    
    var shaken = 0;
    var ticks = 4;
    
    var grabbedImage = null;
    
    var imgs = [
        "data:image/png;base64,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",
        "data:image/png;base64,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",
        "data:image/png;base64,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",
        "data:image/png;base64,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",
        "data:image/png;base64,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"
    ];
    
    belle = document.createElement("div");
    document.getElementsByTagName("body")[0].appendChild(belle);
    
    var canvas = document.createElement("canvas");
    
    var img = document.createElement("img");
    canvas.width = img.width = 131;
    canvas.height = img.height = 384;
    $(canvas).css("position", "fixed");
    
    $(belle).attr("style", "transform-origin: 85% 95%; z-index: 50; position: fixed; top: 0; left: 0; height: 384px; width: 131px; background-repeat: no-repeat; background-size: contain;");
    
    setupImg(hasDocCookie('sweetie_img_index') ? parseInt(getDocCookie('sweetie_img_index')) : 0);
    
    function setupImg(i) {
        $(belle).attr('selected_image_index', i);
        i = getImage(i);
        $(img).attr("src", i);
        canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
        $(belle).css('background-image', "url('" + i + "')");
    }
    
    if (hasDocCookie("sweetie_posX") && hasDocCookie("sweetie_posY")) {
        $(belle).css("left", getDocCookie("sweetie_posX"));
        $(belle).css("top", getDocCookie("sweetie_posY"));
    }
    
    belle.onmousedown = function(event) {
        $(belle).attr("dragging", "true");
        var x = event.clientX - parseInt(this.style.left.split('px')[0]);
        var y = event.clientY - parseInt(this.style.top.split('px')[0]);
        if (canvas.getContext("2d").getImageData(x, y, 1, 1).data[3] > 0) {
            document.onmousemove = function(event) {
                lastClientX = event.clientX;
                lastClientY = event.clientY;
                setPos(event.clientX - x, event.clientY - y);
                if (grabbedImage != null) {
                    $(grabbedImage).css("top", event.pageY + "px");
                    $(grabbedImage).css("left", event.pageX + "px");
                }
                if (lastX >= 0 && lastY >= 0) {
                    var mx = event.pageX;
                    var my = event.pageY;
                    var travel = Math.max(Math.abs(mx - lastX), Math.abs(my - lastY));
                    if (travel / (Date.now() - timestamp) > 30) {
                        shake();
                    }
                }
                
                lastX = event.pageX;
                lastY = event.pageY;
                timestamp = Date.now();
            };
            document.onmouseup = function(event) {
                $(belle).attr("dragging", "false");
                document.onmousemove = function() {};
                document.onmouseup = function() {};
                lastX = -1;
            };
            event.preventDefault();
        }
    };
    belle.onclick = function(event) {
        var x = event.clientX - parseInt(this.style.left.split('px')[0]);
        var y = event.clientY - parseInt(this.style.top.split('px')[0]);
        if (canvas.getContext("2d").getImageData(x, y, 1, 1).data[3] == 0) {
            $(this).css('display', 'none')
            var elem = document.elementFromPoint(event.clientX , event.clientY);
            $(this).css('display', 'block')
            quickDelegate(event, elem);
            logger.Log('Belle through (click): false');
        }
    };
    
    var no = false;
    document.onkeydown = function(event) {
        if (event.keyCode == 32) {
            if ($(belle).attr("dragging") == "true") {
                rotateObject(belle, 90);
                $(belle).css('animation', 'sceptre_down 0.07s linear 1');
                if (!no) {
                    no = true;
                    if (grabbedImage == null) {
                        var rand = Math.floor(Math.random() * 10);
                        
                        if (rand % 2 == 0) doImg();
                        
                        if (event.shiftKey) {
                            doWobble();
                        } else {
                            doGrab();
                        }
                    } else {
                        grabbedImage = null;
                    }
                }
                event.preventDefault();
            }
        }
    };
    
    document.onkeyup = function(event) {
        if (event.keyCode == 32) {
            rotateObject(belle, 0);
            $(belle).css('animation', 'sceptre_up 0.07s linear 1');
            no = false;
            if ($(belle).attr("dragging") == "true") { 
                event.preventDefault();
            }
        }
    }
    
    window.onresize = function(event) {
        var x = parseInt(belle.style.left.split('px')[0]);
        var y = parseInt(belle.style.top.split('px')[0]);
        setPos(x, y);
    }
    logger.Log('setupSweetie: end');
     
    function doWobble() {
        var x = $(belle).offset().left;
        var y = $(belle).offset().top;
        
        var oldX = belle.style.left;
        belle.style.left = "-1000px";
        var img = document.elementFromPoint(lastClientX , lastClientY);
        belle.style.left = oldX;
        if (img != null && img.tagName == "IMG") {
            if ($(img).hasClass('wobbly_image')) {
                $(img).removeClass('wobbly_image');
            } else {
                $(img).addClass('wobbly_image')
            }
        }
    }
     
    function doGrab() {
        grabbedImage = grabImage();
        registerDrop();
    }
    
    function quickDelegate(event, target) {
        if (target != null) {
            var eventCopy = document.createEvent("MouseEvents");
            eventCopy.initMouseEvent(event.type, event.bubbles, event.cancelable, event.view, event.detail,
                event.pageX || event.layerX, event.pageY || event.layerY, event.clientX, event.clientY, event.ctrlKey, event.altKey,
                event.shiftKey, event.metaKey, event.button, event.relatedTarget);
            target.dispatchEvent(eventCopy);
        }
    };
    
    function doImg() {
        var oldIndex = $(belle).attr('selected_image_index');
        var index = oldIndex;
        while (index == oldIndex) {
            index = Math.floor(Math.random() * imgs.length);
        }
        setupImg(index);
        setDocCookie('sweetie_img_index', index);
    }
    
    function registerDrop() {
        $(belle).click(function(event) {
            var x = event.clientX - parseInt(this.style.left.split('px')[0]);
            var y = event.clientY - parseInt(this.style.top.split('px')[0]);
            var data = canvas.getContext("2d").getImageData(x, y, 1, 1).data;
            if (data[3] == 0) {
                if (grabbedImage != null) {
                    grabbedImage = null;
                    $(belle).click(function() {});
                }
            }
        });
    }
    
    function shake() {
        if ((Math.floor(Math.random()*31)) == 5) {
            if (shaken == 0) {
                shaken++;
                setTimeout(function() {rot();}, 30);
            }
        }
    }
    
    function getImage(i) {
        if (i < 0) i = 0;
        if (i >= imgs.length) i = imgs.length - 1;
        return imgs[i];
    }
    
    function rot() {
        if (ticks > 0) {
            setTimeout(function() {
                var deg = ticks % 2 == 0 ? -1 : 1;
                $("body").css('animation', 'shake_shake 0.17s linear 3');
                rot();
            }, 30);
            ticks--;
        } else {
            ticks = 4;
            shaken = 0;
            $("body").css('animation', '');
        }
    }
    
    function setPos(x, y) {
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        
        var maxX = $(window).width() - ($(belle).width() * 0.75);
        if (x > maxX) x = maxX;
        
        var maxY = $(window).height() - ($(belle).height() * 0.75);
        if (y > maxY) y = maxY;
        
        x = x + "px";
        y = y + "px";
        belle.style.top = y;
        setDocCookie("sweetie_posY", y);
        belle.style.left = x;
        setDocCookie("sweetie_posX", x);
    }
    
    function grabImage() {
        var x = $(belle).offset().left;
        var y = $(belle).offset().top;
    
        var oldX = belle.style.left;
        belle.style.left = "-1000px";
        var img = document.elementFromPoint(lastClientX , lastClientY);
        belle.style.left = oldX;
        if (img != null && img.tagName == "IMG") {
            if (img.getAttribute("dragged") != "true") {
                var result = $(img).clone().attr("id","").attr("style", "z-index: 49; position: absolute; top: " + $(img).offset().top + "px; left: " + $(img).offset().left + "px;");
                $(result).appendTo("body");
                $(result).attr("dragged", "true");
                $(result).on("click", function() {
                    if (grabbedImage == this) {
                        grabbedImage = null;
                    } else {
                        grabbedImage = this;
                        registerDrop();
                    }
                });
                
                var childs = document.getElementsByTagName("body")[0].children;
                return childs[childs.length - 1];
            } else {
                $(img).remove();
            }
        }
        return null;
    }
}

function snowBG() {
    var SCREEN_WIDTH;
    var SCREEN_HEIGHT;
    
    var container;
    var particle;
    
    var camera;
    var scene;
    var renderer;
    
    var mouseX = 0;
    var mouseY = 0;
    
    var windowHalfX, windowHalfY;
    
    var particles = []; 
    var particleImage = new Image();
    particleImage.src = 'https://www.fimfiction-static.net/scripts/img/ParticleSmoke.png'; 
    
    this.init = function() {
    	SCREEN_WIDTH = $(window).width();
    	SCREEN_HEIGHT = $(window).height();
    
    	windowHalfX = SCREEN_WIDTH / 2;
    	windowHalfY = SCREEN_HEIGHT / 2;
    	
    	container = document.getElementsByTagName("body")[0];
    
    	camera = new THREE.PerspectiveCamera( 20, SCREEN_WIDTH/SCREEN_HEIGHT, 1, 10000 );
    	camera.position.z = 1000;
    
    	scene = new THREE.Scene();
    	scene.add(camera);
    
    	renderer = new THREE.CanvasRenderer();
    	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    	var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );
    
    	for (var i = 0; i < 140; i++) {
    		particle = new Particle3D( material);
    		particle.position.x = Math.random() * 2000 - 1000;
    		particle.position.y = Math.random() * 400 - 200;
    		particle.position.z = Math.random() * 2000 - 1000;
    		particle.scale.x = particle.scale.y =  1;
    		scene.add( particle );
    		particles.push(particle);
    	}
        
        renderer.domElement.onmousedown = function(event) {
            event.preventDefault();
        }
        
    	container.insertBefore(renderer.domElement, container.children[0]);
    	$(renderer.domElement).css("position", "fixed");
    	$(renderer.domElement).css("top", "0px");
    	$(renderer.domElement).css("left", "0px");
	    $(renderer.domElement).css("pointer-events", "none");
    
    	window.setInterval( loop, 1000 / 60 );
    }
    
    var run = true;
    var saveFocus = getSaveFocus();
    
    this.SetSaveFocus = function(v) {
        saveFocus = v;
    }
    
    this.start = function() {
        run = true;
        $(renderer.domElement).css("display", "block");
    }
    
    this.stop = function() {
        run = false;
        $(renderer.domElement).css("display", "none");
    }
    
    function loop() {
        if ((window_focused || !saveFocus) && run) {
        	for(var i = 0; i<particles.length; i++) {
        		var particle = particles[i]; 
        		particle.updatePhysics();
                
        		with(particle.position) {
        			if(y<-300) y+=550;
        			if(x>1000) x-=2000;
        			else if(x<-1000) x+=2000;
        			if(z>1000) z-=2000;
        			else if(z<-1000) z+=2000;
        		}
        	}
            
        	camera.position.x += ( mouseX - camera.position.x ) * 0.05;
        	camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
        	camera.lookAt(scene.position);
        	renderer.render( scene, camera );
        }
    }
}

logger.Log('Final: End of script reached');