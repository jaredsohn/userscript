// ==UserScript==
// @name Cruiser
// @namespace http://porncruiser.shacknet.nu
// @description High speed cruising through the gutters of the Internet.
// @include http://*
// ==/UserScript==
// Cruiser is a script to reformat picture galleries to a common format and provide very fast keyboard and
// mouse shortcuts for cruising galleries of pictures and galleries of sites linked by pictures.
// -----------** START OF CUSTOMIZATION SECTION **-----------------------------------------------------------
// ----------*** START OF CUSTOMIZATION SECTION ***----------------------------------------------------------
// -----------** START OF CUSTOMIZATION SECTION **-----------------------------------------------------------
// You can change values below to customize Cruiser behavior
// ----------------------------------------------------------------------------------------------------------

automatic_mode = true;                    // Set to true to automatically convert pages, false to show a tiny button to click on instead
show_pictures_actual_size = true;                          // true shows pictures actual size, false shows fit-to-screen
// ----------------------------------------------------------------------------------------------------------
// The document.bannedLinks list excludes pictures with *links* that contain these strings anywhere in the URL.
// Use this to stopdisplaying pictures from sites that you don't want to see.
// Note some lines are commented out right now but contain some samples of things the author doesn't want to see.

document.bannedLinks = new Array(
	'join', 'signup', 'track', 'counter','traffic','tour', // trackers and useless links
	'cx.php',   // these sites tend to ban you after a couple of launches... screw 'em
	'x-tops',   // just links to crap
	'xxx-ways', // just links to crap
	'rankem',   // just links to crap
	'hqtube',   // this site harbors malware
    'porntube', // viruses and trojans
    'young',    // attempt to filter out underage crap
    'loli',     // attempt to filter out underage crap
    'preteen',  // attempt to filter out underage crap
    'prepub',   // attempt to filter out underage crap
    'nubile',   // attempt to filter out underage crap
    'teendreams.com\/samples',       // always has that ugly woman
    'teendreams.com\/featured',      // always has that ugly woman
    'trinity',                       // too ugly for words
    'Trinity',                       // too ugly for words
    'milflessons',                   // more crap
//  'videos','movies',               // just don't care
//  'ronisparadise',                 // just don't care
//  'e-cathouse',                    // too many self referencial thumbnails
//  'realitykings',                  // yawn
//  'naughtyathome',                 // zzzzz
//  'nylonextreme',
//  'lady_sonia','ladysonia',        // like nuts in a vice
//  'ronisparadise','minnieandmary', // zzzzz
//  'redoptics',                     // zzzzz
//  'cuckoldrix',                    // cchhhipptt pthui!
//  'leggycash',                     // ultimate bone softeners
//  'naughtyamerica',                // rude
//  'onlymelanie','onlytease','tease-pics',  // actually very nice but infrequent updates
//  'lelupe', 'first-nude','mcnude',
//  'ftv','metart','met-art','lsg','femjoy', 'metmodel',
	'promo.','boy');
// ----------------------------------------------------------------------------------------------------------
// The document.bannedPictures list excludes pictures that contain these strings anywhere in the URL of the picture itself.
// Use this to exclude common filler pictures and commmon ad pictures.
document.bannedPictures = new Array('protectx','th_olga','th_penelope');
// ----------------------------------------------------------------------------------------------------------
// The document.immediateClose list closes windows immediately! Use this for sites that always suck.
// These items are automatically added to the document.bannedLinks list so you don't have to specify them twice.
// **Warning ** - Sites which contain strings in the following list will close immediately without confirmation.

document.immediateClose = new Array('AlisonAngel','Alison-Angel','seventeenplanet','emily18','e-cathouse',
                                    'shemale','trann','gay','blow','youporn',
                                    'naughtyathome','livejasmin',
                                    'femdom','torture','arielrebel','livejasmine','adultfriend','payserve');

document.closeContentImmediately = new Array('parking_form','parked_layouts','InitiateInputSearchSubmit','was not found on this server');
// ----------------------------------------------------------------------------------------------------------
// if a URL has a string listed in document.linksToHighlight, then the picture will have a dotted line around it.

document.linksToHighlight = new Array('anilos','officegirls','allover30');

// ----------------------------------------------------------------------------------------------------------
// document.closeVideoOnlySites, if set to true, closes pages that have only links to .mpg or .wmv files.
document.closeVideoOnlySites = false;

// ----------------------------------------------------------------------------------------------------------
// --- you probably will never need to change settings below this line ----
// ----------------------------------------------------------------------------------------------------------
// SITES_PER_LAUNCH sets # of sites that the launch button opens.  Not recommended to change, but you can
// try if you want to.

var SITES_PER_LAUNCH = 9;
// ----------------------------------------------------------------------------------------------------------
// SIZERATIO defines the maximum height to width or width to height ratio for pictures to be considered for
// display.  This is used to weed out things like background images and banner ads. Unlikely to need change.

var SIZERATIO = 2;

// --------** END OF CUSTOMIZATION **------------------------------------------------------------------------
// -------*** END OF CUSTOMIZATION ***-----------------------------------------------------------------------
// --------** END OF CUSTOMIZATION **------------------------------------------------------------------------

var a= document.location.href.indexOf("Cruiser=No");
if (a>-1) return;
for (b=0;b<document.immediateClose.length;b++) {
  if (location.href.toUpperCase().indexOf(document.immediateClose[b].toUpperCase())>-1)
        window.close();
   //  location.href='about:blank';
    document.bannedLinks[document.bannedLinks.length] = document.immediateClose[b];
}
var content=document.body.innerHTML.toUpperCase();
for (b=0;b<document.closeContentImmediately.length;b++) {
  if (content.indexOf(document.closeContentImmediately[b].toUpperCase())>-1)
        window.close();
}

//alert(document.bannedLinks.toString().replace(/,/g,">\n"));
function isJPG(str)
{
    var ret = str.toLowerCase().lastIndexOf('.jpg') == str.length-4;


    if (!ret)
        ret = ret |= str.toLowerCase().lastIndexOf('.jpeg') == str.length-5;
    ret &= str.indexOf('?') == -1;
    return  ret;
}

var hf = function(e)
{
    var bodydef = ';background-Image:url();background-Color:transparent;text-align:center;margin:0px;';

    xshow = function(n) {
        document.idx = 1-document.idx;
        show(n);
    }
    scrl = function() {
        for (var a = 1; a < 10; a++) {
            document.getElementById('fade'+a).style.top = (window.pageYOffset+4)+'px';
            document.getElementById('hfade'+a).style.top = (window.pageYOffset+4)+'px';
        }
        document.getElementById('sizerd').style.top = (window.pageYOffset+4)+'px';
        document.getElementById('hlx').style.top = (window.pageYOffset)+'px';
    }
    innerWheelHandler = function(e) {
        if (document.idx || (!actualSize) || (overPic && !document.idx)) {
            if (document.idx != null) {
                if (e.detail)
                    show(document.cpic+((e.detail < 0)?-1:1));
                else if (e.wheelDelta)
                        show(document.cpic+((e.wheelDelta > 0)?-1:1));
                if (e.preventDefault)
                    e.preventDefault();
                e.returnValue = false;
            }
        }
        document.getElementById('sizer').style.visibility = 'hidden';
    }
    show = function(n) {
        document.cpic = n;
        if (document.cpic >= f.length)
            document.cpic = 0;
        if (document.cpic < 0)
            document.cpic = f.length-1;
        var qm = document.compatMode == 'BackCompat';

        for (var a = 0; a < f.length; a++) {
            if (document.idx)
                if (f[a].getAttribute('ratio') > 1) {
                    f[a].setAttribute('width', 'auto');
                    f[a].setAttribute('height', (document.idx)?document.psize+'px':actualSize?'auto':(qm?'100%':(window.innerHeight+'px')));
                }
                else {
                    f[a].setAttribute('height', 'auto');
                    f[a].setAttribute('width', (document.idx)?document.psize+'px':actualSize?'auto':(qm?'100%':(window.innerWidth+'px')));
                }
            else
                if (a == document.cpic)
                    if (f[a].getAttribute('ratio') > window.innerHeight/window.innerWidth) {
                        f[a].setAttribute('width', 'auto');
						f[a].setAttribute('height', (document.idx)?document.psize+'px':actualSize?'auto':(qm?'100%':(window.innerHeight+'px')));
                    }
                    else {
                        f[a].setAttribute('height', 'auto');
						f[a].setAttribute('width', (document.idx)?document.psize+'px':actualSize?'auto':(qm?'100%':(window.innerWidth+'px')));
                    }
            bdr = (!document.idx)?'border:0px solid black':'margin:1px;border:3px '+((document.cpic == a)?'double #8D0':'double #000');
            f[a].setAttribute('style', bdr+';display:'+((a == document.cpic)?'inline':((document.idx)?'inline':'none')));
            f[a].setAttribute('onclick', 'xshow('+a+')');
            document.body.setAttribute('onfocus', 'overPic=1');
            f[a].setAttribute('onmouseover', 'overPic=1');
            f[a].setAttribute('onmouseout', 'overPic=0');
        }
        if (document.idx) {
            overPic = 1;
            document.body.style.overflow = 'auto';
            var tp = 0;
            var img = f[document.cpic];

            img.parentNode.style.top = '0px';
            for (pp = img; pp; pp = pp.offsetParent)
                tp += pp.offsetTop;
            if (tp+img.height > window.pageYOffset+window.innerHeight || tp < window.pageYOffset) {
                window.scrollTo(0, tp-3);
            }
            document.getElementById('sizer').style.visibility = 'hidden';
        }
        else {
            if (24 < f[document.cpic].height) {
                var y = window.innerHeight-f[document.cpic].height;

                y = Math.max(y/2, 0);
                f[document.cpic].parentNode.style.top = y+'px';
            }
            else
                f[document.cpic].parentNode.style.top = '0px';
        }
    }
    innerShowSizer = function() {
        if (!document.idx) {
            document.getElementById('sizer').style.visibility = 'visible';
            document.getElementById('sizer').style.opacity = '1';
            document.getElementById('sizer').value = actualSize?'Fit to screen':'Actual size';
        }
    }
    ;
    innerSwitchSize = function() {
        if (!document.idx) {
            actualSize = !actualSize;
            document.getElementById('sizer').value = actualSize?'Fit to screen':'Actual size';
            show(document.cpic);
        }
    }
    ss = function(e) {
        if (document.idx)
            document.getElementById('sizer').style.visibility = 'hidden';
        else {
            document.getElementById('sizer').style.visibility = 'visible';
            var i = parseInt(e.target.id.toString().substring(4));

            i = (9-i)/10;
            document.getElementById('sizer').value = actualSize?'Fit to screen':'Actual size';
            document.getElementById('sizer').style.opacity = i;
        }
    }
    hs = function(e) {
        var o = document.getElementById('hlx');

        o.style.left = parseInt((window.innerWidth-o.clientWidth)/2)+'px';
        o.style.top = Math.max(0, parseInt((window.innerHeight-o.clientHeight)/3))+'px';
        o.style.visibility = (o.style.visibility == 'visible')?'hidden':'visible';
        o.style.visibility = 'visible';
        var i = parseInt(e.target.id.toString().substring(5));

        i = (9-i)/8;
        document.getElementById('hlx').style.opacity = i;
    }
    hh = function(e) {
        document.getElementById('hlx').style.visibility = 'hidden';
        document.getElementById('sizer').style.visibility = 'hidden';
    }
    function innerScreenHelp() {
        var h = '';

        h += '<div id=hlx  style="display:block;position:absolute;top:0px;left:0x;width:auto;';
        h += 'background:transparent;visibility:hidden;text-align:center;z-index:8" >';
        h += '<div style="display:block;width:auto;position:relative:margin:18px;padding:2px;';
        h += '-moz-border-radius:10px;background:buttonhighlight;';
        h += '">';
        h += '<div style="display:block;width:auto;position:relative:margin:18px;padding:6px;';
        h += '-moz-border-radius:10px;text-align:left;font-family:verdana,helvetica;font-size:10pt;font-weight:200;';
        h += 'color:black;background:buttonface;';
        h += '">';
        h += '<table width=auto border=0 cellspacing=0 cellpadding=1 valign=top style="border:3px inset buttonface;background:white">';
        h += '<tr><td colspan=2 style="text-align:center;color:#015D86;background:#E5EFF5;font-size:12pt;';
        h += 'font-weight:bold;font-family:arial, helvetica">Cruiser Help';
        h += '<tr><td>Right<br>Space<br>Wheel down';
        h += '<td>Next picture';
        h += '<tr><td>Left<br>Wheel up';
        h += '<td>Previous picture';
        h += '<tr><td>Enter<br>Esc<br>Pad-0<br>Left click<br>Shift';
        h += '<td>Switch between index<br>and picture';
        h += '<tr><td>Up';
        h += '<td>Fit to screen';
        h += '<tr><td>Down';
        h += '<td>Actual size';
        h += '<tr><td>A, Shift';
        h += '<td>Toggle size';
        h += '<tr><td>Minus';
        h += '<td>Decrease pictures size';
        h += '<tr><td>Plus';
        h += '<td>Increase pictures size';
        h += '<tr><td>Pad-1<br>\\ (backslash)<br>Q';
        h += '<td>Close Window';
        h += '</table></div>';
        h += '</div>';
        h += '</div>';
        var s = '';

        s += '<div id="sizerd" style="background-color:transparent;z-index:19;position:absolute;';
        s += 'top:4px;right:4px"><input style="visibility:visible;opacity:0" type=button id="sizer" value="Actual size"></div>';
        for (var i = 1; i < 10; i++) {
            s += '<div id="fade';
            s += i;
            s += '" style="background-color:transparent;z-index:'+eval(19-i);
            s += ';position:absolute;top:0px;right:0px;width:';
            s += eval(90+i *7)+'px;height:'+eval(20+i *9)+'px;border:1px solid transparent">&nbsp;</div>';
            s += '<div id="hfade'+i+'" style="background-color:transparent;z-index:'+eval(19-i)+';position:absolute;top:0px;left:0px;width:';
            s += eval(50+i *7)+'px;height:'+eval(50+i *17)+'px;border:1px solid transparent">&nbsp;</div>';
        }
        return  s+h;
    }

    saveSize = function(img) {
                                        //alert('ratio:'+img.width/img.height);
        img.setAttribute('ratio', img.height/img.width);
    }
    if (document.idx == null) {
        overPic = 0;
        document.idx = 0;
        actualSize = _actualSize_;
        document.psize = 160;
        document.cpic = (e.keyCode != 39)?0:1;
        f = document.getElementsByTagName('img');
        s = new Array();
        for (a = 0; a < f.length; a++) {
            s[a] = f[a].getAttribute('srcx');
        }
        bd = document.body;
        while (document.body.firstChild)
            document.body.removeChild(bd.firstChild);
        sp = document.createElement('div');
        document.body.appendChild(sp);
        for (a = 0; a < s.length; a++) {
            p = document.createElement('img');
            p.setAttribute('alt', s[a]);
            p.setAttribute('ratio', 1.6);                  // set default for displays before load
            p.setAttribute('onload', 'saveSize(this)');
            p.setAttribute('src', s[a]);
            p.setAttribute('onclick', 'xshow('+a+')');
            p.setAttribute('style', 'display:none;border:6px double black');
            sp.setAttribute('style', 'font-size:6pt;color:white;font-family:arial,helvetica;position:relative');
            sp.appendChild(p);
        }
        document.body.innerHTML += innerScreenHelp();
        document.getElementById('sizerd').onmouseover = innerShowSizer;
        document.getElementById('sizer').onclick = innerSwitchSize;
        htd = document.getElementById('hlx').getElementsByTagName('td');
        for (a = 1; a < htd.length; a++) {
            htd[a].style.color = 'black';
            htd[a].style.fontFamily = 'arial,helvetica';
            htd[a].style.fontSize = '10pt';
            htd[a].style.padding = '0 1em 0 1em';
            htd[a].style.borderTop = '1px solid black';
            htd[a].style.verticalAlign = 'top';
            htd[a].style.whiteSpace = 'nowrap';
        }
        for (var i = 1; i < 10; i++) {
            document.getElementById('fade'+i).onmouseover = ss;
            document.getElementById('hfade'+i).onmouseover = hs;
            document.getElementById('fade'+i).onmouseout = ss;
            document.getElementById('hfade'+i).onmouseout = hh;
        }
        if (navigator.userAgent.indexOf('ecko/') > -1)
            window.addEventListener('DOMMouseScroll', innerWheelHandler, false);
        else
            document.onmousewheel = innerWheelHandler;
        window.addEventListener('scroll', scrl, false);
        document.body.setAttribute('style', 'overflow:auto'+bodydef);
        f = document.getElementsByTagName('img');
        show(document.cpic);
        return ;
    }
    f = document.getElementsByTagName('img');
    // alert(e.keyCode);
    e.preventDefault();
    e.returnValue = false;
    switch (e.keyCode) {
        case 32 :                                          // space
        case 39 :                                          // right
        case 37 :                                          // left
            show(document.cpic+((e.keyCode == 37)?-1:1));
            window.scrollBy(-1000, 0);
                                //window.scrollTo(0,0);
            break;
        case 38 :                                          // up
        case 40 :                                          // down
            if (!document.idx) {
                actualSize = (e.keyCode == 40)?1:0;
                show(document.cpic);
            }
            break;
        case 65 :                                          // A
        case 16 :                                          // Shift
            if (!document.idx) {
                actualSize = !actualSize;
                show(document.cpic);
            }
            break;
        case 106 :                                         // pad-*
            show(document.cpic);
            break;
        case 27 :                                          // esc
        case 45 :                                          // pad-0
        case 13 :                                          // enter
        case 16 :                                          // shift (for notebook)
            document.idx = 1-document.idx;
            show(document.cpic);
            break;
        case 68 :                                          // d - debug
            d = document.body.innerHTML.split('<');
            while (document.body.firstChild)
                document.body.removeChild(document.body.firstChild);
            p = document.createElement('p');
            for (a = 1; a < d.length; a++) {
                n = document.createTextNode('<'+d[a]);
                p.appendChild(n);
                p.appendChild(document.createElement('br'));
            }
            p.setAttribute('style', 'text-align:left;color:white;overflow:auto');
            document.body.appendChild(p);
            break;
        case 35 :                                          // pad-1
        case 81 :                                          // Q
        case 220 :
            window.close();
            break;
        case 72 :                                          // h
            if (document.getElementById('hlx').style.visibility != 'visible')
                hs();
            else
                document.getElementById('hlx').style.visibility = 'hidden';
            break;
        case 61 :                                          // plus
        case 109 :                                         // pad-minus
        case 107 :                                         // pad-plus
            if (document.idx) {
                document.psize = Math.min(window.innerHeight, document.psize+(e.keyCode == 109?-80:80));
                document.psize = Math.max(80, document.psize);
                f = document.body.getElementsByTagName('img');
                for (i = 0; i < f.length; i++)
                    f[i].style.height = document.psize+'px';
            }
            else {
                var i = document.body.getElementsByTagName('img')[document.cpic];
                var h = i.height *= (e.keyCode == 109?.8:(1/.8));

                h = Math.max(80, Math.min(h, 4000));
                i.setAttribute('height', h);
                var y = window.innerHeight-h;

                y = Math.max(y/2, 0);
                i.parentNode.style.top = y+'px';
            }
            show(document.cpic);
            break;
        case 82 :                                        //RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
            {
                if (document.location.href.indexOf('?') > -1)
                    document.location.href += '&Cruiser=No';
                else
                    document.location.href += '?Cruiser=No';
            }
            break;
    }
}

showScript = function(taRows,taCols)
{
    if (document.getElementById("cm").style.display == "table-row") {
        document.getElementById("cm").style.display = "none";
        document.getElementById("thumbs").scrollTop = 0;
    }
    else {
        document.getElementById("cm").style.display = "table-row";
        document.getElementById("ta1").setAttribute("rows", taRows);
        document.getElementById("ta1").setAttribute("cols", taCols+2);
        document.getElementById("ta1").select();
        document.getElementById("ta1").focus();
    }
}

showHelp = function()
{
    var o = document.getElementById('mhlx');
    var t = document.getElementById('mhlxtab');

    document.getElementById('tlinks').style.visibility = "hidden";
    ;
    o.style.width = t.clientWidth+16+'px';
    o.style.visibility = "hidden";
    ;
    o.style.height = t.clientHeight+16+'px';
    // alert(t.clientWidth+'x'+t.clientHeight+'\n'+o.clientWidth+'x'+o.clientHeight);
    o.style.visibility = 'hidden';
    o.style.zIndex = 98;
    o.style.left = parseInt((window.innerWidth-o.clientWidth)/2)+'px';
    o.style.visibility = 'visible';
}

showLinks = function()
{
    var o = document.getElementById('tlinks');

    document.getElementById('mhlx').style.visibility = "hidden";
    ;
    if (!document.linkstab) {
        var d = document.getElementById('tlinksdiv');
        var t = document.getElementById('tlinkstab');
        var to = document.getElementById('tlinksdivo');
        var mh = o.clientHeight;

        o.style.left = parseInt((window.innerWidth-o.clientWidth)/2)+'px';
        var x = Math.min(window.innerHeight-o.offsetTop-50, o.clientHeight);

        o.style.height = x+'px';
        to.style.height = x-45+'px';
        t.style.height = x-45+'px';
        document.linkstab = true;
    }
    o.style.visibility = 'visible';
}

resizeHandler = function()
{
    var o = document.getElementById('mhlx');


    if (o)
        o.style.left = parseInt((window.innerWidth-o.clientWidth)/2)+'px';
    o = document.getElementById('thumbs');
    if (o)
        o.style.height = window.innerHeight-parseInt(o.style.top);
}

;
launchf = function(pg,SITES_PER_LAUNCH)
{
    var k,links,b,t,tp,img;

    isJPG = function(str) {
        var ret = str.toLowerCase().lastIndexOf('.jpg') == str.length-4;

        if (!ret)
            ret = ret |= str.toLowerCase().lastIndexOf('.jpeg') == str.length-5;
        ret &= str.indexOf('?') == -1;
        return  ret;
    }

    document.getElementById('tlinks').style.visibility = 'hidden';
    if (null == document.lidx)
        document.lidx = 0;
    links = pg.split(',');
    t = 1;
    k = document.lidx+Math.abs(SITES_PER_LAUNCH);
    for (; document.lidx < k && document.lidx < links.length; document.lidx++) {
        setTimeout('window.open("'+links[document.lidx]+'")', (999/SITES_PER_LAUNCH)*(t++));
    }
    b = document.getElementById('bl');
    if (document.lidx < links.length)
        b.value = 'Launch '+eval(1+document.lidx)+'-'+Math.min(document.lidx+SITES_PER_LAUNCH, links.length)+' of '+links.length;
    else {
        b.value = 'Launches complete';
        b.disabled = true;
    }
    document.getElementById('mdiv1').style.color = '#F00';
    document.getElementById('mdiv1a').style.color = '#000';
    document.getElementById('span1a').style.color = '#000';
    document.getElementById('span1b').style.color = '#000';
    document.getElementById('span1c').style.color = '#000';
    document.getElementById('mdiv1').style.backgroundColor = '#FFC';
    document.getElementById('bm').disabled = (document.lidx == 0);
    document.getElementById('bp').disabled = (document.lidx >= links.length-1);
    document.getElementById('bl').disabled = (!(document.lidx >= 0 && document.lidx < links.length));
    assoc = new Array();
    as = document.getElementsByTagName('a');
    for (a = 0; a < as.length; a++) {
        k = as[a].href;
        if (!isJPG(k)) {
            img = as[a].getElementsByTagName('img')[0];
            if (img) {
                assoc[k] = img;
                img.style.border = '4px #F00 double';
                if (img.getAttribute('special'))
                    img.style.border = '4px #F00 dotted';
                //img.style.opacity = '0.5';
            }
        }
    }
    max = Math.min(links.length, document.lidx+Math.abs(SITES_PER_LAUNCH));
    for (b = document.lidx; b < max; b++) {
        img = assoc[links[b]];
        if (img)
            img.style.border = '4px #8D0 double';
        if (img.getAttribute('special'))
            img.style.border = '4px #8D0 dotted';
           //     img.style.opacity = '1.0';
    }
    var soff = document.getElementById('thumbs').scrollTop;
    var max = Math.min(links.length, document.lidx+Math.abs(SITES_PER_LAUNCH));
    var areah = window.innerHeight-42;
    var mbot = 0;
    var mtop = 999999;

    for (b = document.lidx; b < max; b++) {
        img = assoc[links[b].replace(/%2c/g, ',')];
        if (img) {
            img.style.border = '4px #8D0 double';
                            //img.style.opacity = '1.0';
            tp = 0;
            for (pp = img; pp; pp = pp.offsetParent)
                tp += pp.offsetTop;
            tp -= 42;
            mtop = Math.min(mtop, tp);
            mbot = Math.max(mbot, tp+img.height);
        }
    }
    if (mtop < soff)
        soff = (mbot-areah);
    else
        if (mbot > soff+areah)
            soff = mtop;
    if (mbot < areah)
        soff = 0;
    document.getElementById('thumbs').scrollTop = soff;
}

;
lplus = function(pg,SITES_PER_LAUNCH)
{
    var links,b,k,a,f,s,i,as,soff;

    isJPG = function(str) {
        var ret = str.toLowerCase().lastIndexOf('.jpg') == str.length-4;

        if (!ret)
            ret = ret |= str.toLowerCase().lastIndexOf('.jpeg') == str.length-5;
        ret &= str.indexOf('?') == -1;
        return  ret;
    }

    document.getElementById('tlinks').style.visibility = 'hidden';
    if (null == document.lidx)
        document.lidx = 0;
    soff = document.getElementById('thumbs').scrollTop;
    links = pg.split(',');
    document.lidx += SITES_PER_LAUNCH;
    if (document.lidx > links.length-1)
        document.lidx = links.length-1;
    if (document.lidx < 0)
        document.lidx = 0;
    b = document.getElementById('bl');
    b.value = 'Launch '+eval(1+document.lidx)+'-'+Math.min(document.lidx+Math.abs(SITES_PER_LAUNCH), links.length)+' of '+links.length;
   // b.focus();
    assoc = new Array();
    as = document.getElementsByTagName('a');
    for (a = 0; a < as.length; a++) {
        k = as[a].href;
        if (!isJPG(k)) {
            img = as[a].getElementsByTagName('img')[0];
            if (img) {
                assoc[k] = img;
                img.style.border = '4px #F00 double';
                if (img.getAttribute('special'))
                    img.style.border = '4px #F00 dotted';
            //    img.style.opacity = '0.5';
            }
        }
    }
    var max = Math.min(links.length, document.lidx+Math.abs(SITES_PER_LAUNCH));
    var areah = window.innerHeight-42;
    var mbot = 0;
    var mtop = 999999;

    for (b = document.lidx; b < max; b++) {
        img = assoc[links[b].replace(/%2c/g, ',')];
        if (img) {
            img.style.border = '4px #8D0 double';
            if (img.getAttribute('special'))
                img.style.border = '4px #8D0 dotted';
            //img.style.opacity = '1.0';
            tp = 0;
//          for (pp = img; pp; pp = pp.offsetParent)
//            tp += pp.offsetTop;
            tp = img.offsetTop;
            tp -= 42;
            mtop = Math.min(mtop, tp);
            mbot = Math.max(mbot, tp+img.height);
        }
    }
    if (mtop < soff)
        soff = (mbot-areah);
    else
        if (mbot > soff+areah)
            soff = mtop;
    if (mbot < areah)
        soff = 0;
    document.getElementById('bm').disabled = (document.lidx == 0);
    document.getElementById('bp').disabled = (document.lidx >= links.length-1);
    document.getElementById('bl').disabled = (!(document.lidx >= 0 && document.lidx < links.length));
    if (!document.getElementById('bl').disabled)
        document.getElementById('bl').focus();
    document.getElementById('thumbs').scrollTop = soff;
};
clickHandler = function()
{
        // dismiss text link window on click of mouse not over it
    if (document.getElementById("tlinks"))
        if (document.getElementById("tlinks").getAttribute('inList') != 1)
            if (document.getElementById("tlinks"))
                document.getElementById("tlinks").style.visibility = 'hidden';
    if (document.getElementById("mhlx"))
        if (document.getElementById("mhlx").getAttribute('inList') != 1)
            if (document.getElementById("mhlx"))
                document.getElementById("mhlx").style.visibility = "hidden";
}

firstFunction = function()
{
    z = 0;
    d64 = function(input) {
        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var output = '';
        var chr1,chr2,chr3,enc1,enc2,enc3,enc4,i = 0;

        input = input.replace(/[^A-Za-z0-9+ /= ]/g, "");
        do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2)|(enc2 >> 4);
            chr2 = ((enc2&15) << 4)|(enc3 >> 2);
            chr3 = ((enc3&3) << 6)|enc4;
            output = output+String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output+String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output+String.fromCharCode(chr3);
            }
        }  while (i < input.length);
        return  output;
    }
    ;

    getc = function(node) {
        var c;

        for (c = node; c.parentNode != null && c.nodeName != 'A'; c = c.parentNode)
            ;
        return  c.href?c.href:'#p';
    }
    ;

    isJPG = function(str) {
        var ret = str.toLowerCase().lastIndexOf('.jpg') == str.length-4;

        if (!ret)
            ret = ret |= str.toLowerCase().lastIndexOf('.jpeg') == str.length-5;
        ret &= str.indexOf('?') == -1;
        return  ret;
    }

    pl = new Array();
    used = new Array();
    usedlink = new Array();
    tlinkUsed = new Array();
    tlist = [];
    tlink = '<div id=tlinks ';
    tlink += ' onmouseover="this.setAttribute(\'inList\',1)" ';
    tlink += ' onmouseout="this.setAttribute(\'inList\',0)" ';
    tlink += 'style="position:absolute;left:1em;top:10%;z-Index:99;';
    tlink += 'display:block;background:buttonface; visibility:hidden;overflow:hidden;';
    tlink += '-moz-border-radius:10px;';
    tlink += '">';
    tlink += '<p ';
    tlink += 'style="text-align:center;color:#015D86;background:#E5EFF5;font-size:12pt;font-weight:bold;';
    tlink += '-moz-border-radius:7px;';
    tlink += 'border:1px solid navy;';
    tlink += 'margin:8px 8px 0 8px;color:#015D86">Text links found on this page</p>';
    tlink += '<div id=tlinksdivo style="position:relative;top:0px;left:0px;margin:8px;overflow:auto">';
    tlink += '<div id=tlinksdiv style="position:relative;top:0px;left:0px;margin:0px">';
    tlink +=
'<table id=tlinkstab cellpadding=2 cellspacing=0 style="font-size:9pt;border-bottom:1px solid #237;background:#F8F8FF;border-collapse:collapse">'
        ;
    tlcount = 999;
    if (document.childNodes.length == 1 && document.body.innerHTML.indexOf('<img ') == 0) {
      // alert('Image Only--No action');
        return ;
    }
    taRows = 0;
    taCols = 60;
    text = '<table border=0 style="position:absolute;left:10px;top:width:auto;background-color:#000">';
    text += '<tr id=ci><td width=20 style="border:0px solid blue;background:transparent;display:block;width:20px;cursor:pointer"';
    text += ' onclick="document.getElementById(\'cm\').style.display=\'table-row\';document.getElementById(\'ta1\').select();">';
    text += '<b style="display:block;width:16px">';
    text += '<b style="display:block; height:1px; background: #C5E0FF; overflow:hidden;margin:0 6px 0 7px"></b>';
    text += '<b style="display:block; height:1px; background: #C5E0FF; overflow:hidden;margin:0 5px 0 7px"></b>';
    text += '<b style="display:block; height:1px; background: #C5E0FF; overflow:hidden;margin:0 4px 0 7px"></b>';
    text += '<b style="display:block; height:1px; background: #C5E0FF; overflow:hidden;margin:0 3px 0 0px"></b>';
    text += '<b style="display:block; height:1px; background: #C5E0FF; overflow:hidden;margin:0 2px 0 0px"></b>';
    text += '<b style="display:block; height:1px; background: #C5E0FF; overflow:hidden;margin:0 1px 0 0px"></b>';
    text += '<b style="display:block; height:1px; background: #C5E0FF; overflow:hidden;margin:0 0px 0 0px"></b>';
    text += '<b style="display:block; height:1px; background: #C5E0FF; overflow:hidden;margin:0 2px 0 0px"></b>';
    text += '<b style="display:block; height:1px; background: #C5E0FF; overflow:hidden;margin:0 3px 0 0px"></b>';
    text += '<b style="display:block; height:1px; background: #C5E0FF; overflow:hidden;margin:0 4px 0 7px"></b>';
    text += '<b style="display:block; height:1px; background: #C5E0FF; overflow:hidden;margin:0 5px 0 7px"></b>';
    text += '<b style="display:block; height:1px; background: #C5E0FF; overflow:hidden;margin:0 6px 0 7px"></b>';
    text += '</b>';
    text += '</td><td style="color:white;font-family:helvetica;font-size:8pt"> ';
    text += '<span style="cursor:pointer;" onclick="document.getElementById(\'cm\').style.display=\'table-row\'">';
    text += 'Click here to generate a script to download all pictures</span>';
    if (navigator.userAgent.indexOf("X11") == -1)
        text +=
'<span style="color:turquoise;font-size:small;font-family:monospace">&nbsp;&nbsp;&nbsp;&nbsp;* requires the ported Unix command wget</span>'
            ;
    text += '<tr id=cm style="display:none"><td><td widht=100%><textarea rows=16 cols=999 readonly id=ta1 ';
    text +=
'style="font-size:8pt;white-space:nowrap;width:auto;height:auto;background:black;color:#FF8;font-family:monospace;padding:0 1em 0 1em;border-width:1px">'
        ;
    t = '';
    np = '';
    npcount = 0;
    pcount = 0;
    i = document.getElementsByTagName('a');
    done = 0;
    possibleSingleImage = 0;
//    if (false)
//        for (a = 0; a < i.length; a++) {
//            link = i[a].href;
//            b = link.indexOf("aHR0c");
//            if (b > -0) {
//                link = d64(link.substring(b).split(/[&]/)[0]);
//            }
//            ban = false;
//            for (b = 0; b < document.bannedLinks.length; b++)
//                ban |= (-1 < link.indexOf(document.bannedLinks[b]));
//            if (ban) {
//                i[a].style.color = "black";
//                i[a].style.backgroundColor = "#DDD";
//                i[a].style.fontWeight = "normal";
//                i[a].style.textDecoration = "none";
//                i[a].style.fontSize = "8pt";
//                i[a].setAttribute('href', "javascript:void(0)"); // remove actual link 'cause this site must suck and we never want to see it!
//                i[a].innerHTML = ' Banned ';
//            }
//        }
    var immopens = 0;

    for (a = 0; a < i.length; a++) {
        var img = i[a].getElementsByTagName('img');
        ban = false;
		for (b = 0; b < document.bannedLinks.length; b++) {
           ban |= (-1 < i[a].toString().indexOf(document.bannedLinks[b]));
	   }
	if (!ban)
        if (i[a].protocol == 'http:' && img.length > 0) {
            img = img[0];
            h = img.src;
            if (isJPG(h)) {
                h1 = h;
                if (img.width > 60 && img.height > 60)
                    if (img.width/img.height <= SIZERATIO && img.width/img.height >= 1/SIZERATIO) {
                        link = getc(img);
                        if ((img.width >= 600 || img.height >= 600) && -1 == img.src.toString().indexOf('?') && !ban) { // if probably a main image
                            link = img.src;                // convert to link to just the image
                            possibleSingleImage++;
                        }
                        b = link.indexOf("aHR0c");
                        if (b > -0) {
                            link = d64(link.substring(b).split(/[&]/)[0]);
                        }
                        for (b = 0; b < document.bannedLinks.length; b++)
                            ban |= (-1 < link.indexOf(document.bannedLinks[b]));
                        for (b = 0; b < document.bannedPictures.length; b++)
                            ban |= (-1 < h.indexOf(document.bannedPictures[b]));
                        if (ban)
                            continue;
                        if (isJPG(h) && -1 == h.indexOf('?'))
                            h = link;
                        if (true) {
                            link = unescape(link.substring(link.toLowerCase().lastIndexOf('http%3a')));
                            if (-1 < link.lastIndexOf('url=')) {
                                link = unescape(link);
                                link = link.substring(link.lastIndexOf('url=')+4);
                                if (link.substring(0, 7) != 'http://')
                                    link = 'http://'+link;
                            }
                            link = link.substring(link.lastIndexOf('http:'));
                            link = link.replace(/, .*/, '');
							link = link.replace(/&p=[0-9]*$/, '');
							if (!link.match(/CA=\d+-\d+/))
								link = link.replace(/([=&;])[0-9]{6}[0-9]*/, '$1'+'0000000');
                            link = link.replace(/ccbill[/][0-9]*/, 'ccbill/0');
				        	link = link.replace(/([?/&]nats=)/, '$1**');
							link = link.replace(/([?/&])(PA|pa|affid|affiliate|ccbill|ccid|coupon|campaignid)=[^&]*/, '$1');
							link = link.replace(/[A-Z][A-Z][A-Za-z0-9]*,0,0,0,/, '0');
                            link = link.replace(/[?]$/, '');
                            if (link.split('?')[0].indexOf('&') > -1)
                                link = link.substring(0, link.indexOf('&'));


                                if (link.split('?')[0]=='http://cz3.clickzs.com/tgp.php') {
									var u=link.split('&');
									link='http://'+u[u.length-1];
                            }
                        }
                        if (!usedlink[link]) {
                            ext = link.split(".");
							ext = (ext.length > 0 && (ext[ext.length-1].toLowerCase() == 'jpg' || ext[ext.length-1].toLowerCase() == 'jpeg'))?"aaa":"zzz";
                            segs = link.split('/');
                            if ((segs.length > 3 && segs[3] != '') || ext == 'aaa') {
                                usedlink[link] = 1;

								var fn=link.replace(/\.[^\.]*$/,''); // remove suffix and dot
								var fnp=fn.replace(/[0-9]*$/,''); // fnp=everything up to last numbers
								var fnn='00000000'+fn.substring(fnp.length);
								fnn=fnn.substring(fnn.length-8); // fn=right justified number only

                                cand = ext+fnp+fnn+'|'+escape(link)+'|'+h+'|'+h1;
                                if (!used[cand]) {
                                    used[cand] = 1;
                                    pl[pl.length] = cand;
                                }
                            }
                        }
                    }
            }
        }
        else {
			var innerText=i[a].innerHTML.replace(/<[^<]*?>/g,'');
            if (innerText != '') {
                var link = i[a].href;

                if (i[a].protocol != 'http:')
                    continue;
                if (innerText.length > 30)
                    innerText = innerText.substring(0, 30)+'...';
                var b = link.indexOf("aHR0c");

                if (b > -0) {
                    link = d64(link.substring(b).split(/[&]/)[0]);
                }
                var ban = false;

                for (b = 0; b < document.bannedLinks.length; b++)
                    ban |= (-1 < link.indexOf(document.bannedLinks[b]));
                if (ban)
                    continue;
                if (true) {
                    link = unescape(link.substring(link.toLowerCase().lastIndexOf('http%3a')));
                    link = link.substring(link.lastIndexOf('http:'));
                    link = link.replace(/, .*/, '');
					link = link.replace(/&p=[0-9]*$/, '');
					link = link.replace(/([=?&;])[0-9]{6}[0-9]*/, '$1'+'0000000');
                    link = link.replace(/ccbill[/][0-9]*/, 'ccbill/0');
				        	link = link.replace(/([?/&]nats=)/, '$1**');
					link = link.replace(/([?/&])(PA|pa|affid|affiliate|ccbill|ccid|coupon|campaignid)=[^&]*/, '$1');
					link = link.replace(/[A-Z][A-Z][A-Za-z0-9]*,0,0,0,/, '0');
                    link = link.replace(/[?]$/, '');
                    if (link.split('?')[0].indexOf('&') > -1)
                        link = link.substring(0, link.indexOf('&'));
                }
                if (!tlinkUsed[link]) {
					tlist[tlist.length]=innerText.replace(/\|/g,' ')+'|'+link;
					tlinkUsed[link]=1;

                }
            }
        }
    }
    tlist.sort();
    for (a = 0; a < tlist.length; a++) {
        if (++tlcount > 3) {
            tlcount = 1;
            tlink += '<tr>';
        }
        link = tlist[a].split(/\|/);
        tlink += "<td style='text-align:left;background:transparent;border:1px solid #79c;'>";
        tlink += "<a href=\""+link[1]+"\" target=_blank style='color:#015DF6;text-decoration:none;";
        tlink += "font-family:helvetica;font-weight:200;";
        tlink += "white-space:nowrap;font-size:10pt;text-align:left;padding:0 5px 0 10px'>"+link[0]+"</a>";
    }
    tlink += '</table>';
    tlink += '</div>';
    tlink += '</div>';
    tlink += '</div>';
    tlink = tlink.replace(/</g,'\n<');
    pl.sort();
    pg = new Array();
    if (pl.length > 1 || possibleSingleImage == 1) {
        rx1 = new RegExp('[\?].*([0-9]+)(\.jp[e]{0,1}g|\.[s]{0,1}html|\.php)$');
        rx2 = new RegExp('^([^/]*/){3,}');
        rx3 = new RegExp('([0-9]+)(\.jp[e]{0,1}g|\.[s]{0,1}html|\.php)$');
        rx4 = new RegExp('/[0-9]{1,2}$');
        wf = "";
        pct = 0;
        vidCount = 0;
        usedCount = 0;
        for (a = 0; a < pl.length; a++) {
            p = pl[a].split("|");
            p[1] = unescape(p[1]);
            taLine = '';
            if (navigator.userAgent.indexOf("Win") != -1)
                taLine += 'start /min "" ';
            taLine += 'wget --referer="http://'+document.location.host+'/" -O cruise';
            taLine += (Date.parse(new Date()).toString().substring(0, 10))+'_'+((1000+a).toString().substring(1))+'.jpg "'+p[2]+'"';
            taLine += '\n';
            taRows += 1;
            taCols = Math.max(taCols, taLine.length+1);
            text += taLine;
            if (!isJPG(p[1]))
                if (p[1] != '#p')
                    pg[pg.length] = p[1].replace(/,/g, '%2c');
                else
                    continue;
            done = 1;
            usedCount++;
            if (p[1].toLowerCase().lastIndexOf('.mpg') == p[1].length-4 ||
                p[1].toLowerCase().lastIndexOf('.wmv') == p[1].length-4 ||
                p[1].toLowerCase().lastIndexOf('.mpeg') == p[1].length-5)
                vidCount++;
            if ((!isJPG(p[1])) || -1 < p[1].indexOf('?')) {
                np += '<a target=_blank href="'+p[1]+'"><img src="'+p[3]+'" style="height:160px;border:4px ';
 //                   if (a==1)
 //       alert(p[1].toLowerCase().match(rx3)+"\n"+p[1]);
                np+=(p[1].toLowerCase().match(rx1)||p[1].toLowerCase().match(rx4)||
                (p[1].toLowerCase().match(rx2)&& p[1].toLowerCase().match(rx3)))?'#88F':'#F00';
              //  np+=' double;display:inline;margin:2px"></a>';
                var dot = false;

                for (var b = 0; b < document.linksToHighlight.length; b++)
                    if (-1 < p[1].indexOf(document.linksToHighlight[b]))
                        dot = true;
                np += dot?" dotted":" double";
                np += ';display:inline;margin:2px"';
                if (dot)
                    np += ' special=1';
                np += '></a>';
                npcount++;
            }
            else {
                t += '<a target=_blank href="'+p[1]+'"><img src="'+p[3]+
                    '" style="height:160px;border:4px #0CF double;display:inline;margin:2px"></a>';
                pcount++;
                if (isJPG(p[1])) {
                    wf += '<img style="display:none" srcx="'+p[1]+'"> ';
                    pct++;
                }
            }
        }
        if (vidCount >= usedCount-1 && document.closeVideoOnlySites && vidCount > 1)
            window.close();
        text += '</textarea></table></div>';
        if (done) {
            xl = "<div id=cruiser><div id=mdiv1 style='background-color:transparent;height:50px;position:absolute;width:100%;";
            xl += "z-Index:2 ;font-family:cursive;font-size:20pt;color:white;white-space:nowrap;left:0px'>";
            xl += "<div style='background-color:transparent; top:0px;height:100%;position:absolute;width:auto;white-space:nowrap;left:1em;";
            xl += "vertical-align:text-top'>";
            xl += "<i onclick=\"location.href='http://pcrusier.fortunecity.com'\" style=\"cursor:pointer\" onmouseover=\"this.style.color=\'cyan\'\" onmouseout=\"this.style.color=\'white\'\">Cruiser</i>";
            xl += "</div>";
            xl += "<div id=mdiv1a style='font-family:cursive;color:white;font-size:8pt;margin-left:4em;position:absolute;top:-3px;left:10%'>";
            xl += "http://"+location.hostname;
            xl += "</div>";
            xl += "<div style='background-color:transparent;font-family:cursive;";
            xl += "color:#CEEFFF;font-size:7pt;margin-right:4em;position:absolute;top:0px;right:10%'>";
            xl += "<span id=span1a style='text-decoration:underline;cursor:pointer' onclick='("+showHelp.toString();
            xl += ")()'>Show Cruiser Help (H)</span><br>";
            xl += "<span id=span1b style='text-decoration:underline;cursor:pointer' onclick='("+showLinks.toString();
            xl += ")()'>Show Text Links (L)</span><br>";
            xl += "<span id=span1c style='text-decoration:underline;cursor:pointer' onclick='("+showScript.toString();
            xl += ")("+taRows+","+taCols+")'>Generate Fetch Script (C)</span>";
            xl += "</div>";
            xl += "<div style='background-color:transparent; top:-3px;height:100%;position:absolute;width:auto;white-space:nowrap;right:1em;";
            xl += "vertical-align:text-top'>";
            xl += "<i onclick=\"location.href='http://pcrusier.fortunecity.com'\" style=\"cursor:pointer\" onmouseover=\"this.style.color=\'cyan\'\" onmouseout=\"this.style.color=\'white\'\">Cruiser</i>";
            xl += "</div>";
            xl += "</div>";
            xl += "<div id=mdiv2 style='background-color:transparent;height:40px;position:absolute;width:30%;";
            xl += "z-index:5;top:0px;left:35%;text-align:center;white-space:nowrap'>";
            btnStyle = "style='position:relative;top:1.5em;font-size:10pt'";
            if (pct > 0) {
                if (navigator.userAgent.indexOf('ecko/') > -1)
                    sf = hf.toString().replace(/\"/g,"'"); // ';
                else
                    sf = hf.toString().replace(/\"/g,"\\\'"); // ';
                sf = sf.replace(/_actualSize_/, show_pictures_actual_size);
                xl += "<input id=bx type=button onclick=\"javascript:document.body.innerHTML=unescape('"+escape(wf)+"');";
                xl += "hf="+sf+";window.addEventListener('keyup', hf,false);";
                xl += "hf="+sf+";window.addEventListener('keydown', function(e){if (39==e.keyCode)e.preventDefault();},false);";
                xl += "k=new Object();k.keyCode=0;hf(k)";
                xl += "\" value='Fetch "+pct+" pictures' "+btnStyle+">";
            }
            if (pcount < 10 || npcount > 1)
                if (pg.length > 0) {
                    n = Math.min(pg.length, SITES_PER_LAUNCH);
                 //   lf = lplus.toString().replace(/\"/g,"\\\'"); // ';
                    if (navigator.userAgent.indexOf('ecko/') > -1)
                        lf = lplus.toString().replace(/\"/g,"'"); // ';
                    else
                        lf = lplus.toString().replace(/\"/g,"\\\'"); // ';
                    xl += "&nbsp;<input id=bm type=button onclick=\"javascript:eval("+lf+"('"+pg.toString()+"',"+(-SITES_PER_LAUNCH)+
                        "));\" ";
                    xl += "value='&lt;' "+btnStyle+">";
                 //   lf = launchf.toString().replace(/\"/g,"\\\'"); // ';

                    if (navigator.userAgent.indexOf('ecko/')>-1)
                       lf = launchf.toString().replace(/\"/g,"'"); // ';
				    else
				       lf = launchf.toString().replace(/\"/g,"\\\'"); // ';


                    xl += "<input id=bl type=button onclick=\"javascript:eval("+lf+"('"+pg.toString()+"',"+SITES_PER_LAUNCH+"));\" ";
                    xl += "value='Launch 1-"+n+" of "+pg.length+"' "+btnStyle+">";

//                lf = lplus.toString().replace(/\"/g,"\\\'"); // ';
                    if (navigator.userAgent.indexOf('ecko/')>-1)
                      lf = lplus.toString().replace(/\"/g,"'"); // ';
                    else
                      lf = lplus.toString().replace(/\"/g,"\\\'"); // ';

                    xl += "<input id=bp type=button onclick=\"javascript:eval("+lf+"('"+pg.toString()+"',"+(SITES_PER_LAUNCH)+"));\" ";
                    xl += "value='&gt;' "+btnStyle+">";
                }
            var hn = window.innerHeight-42;

            xl += "</div><div id=thumbs style='position:absolute;top:42px;width:100%;overflow:auto;height:"+hn+"px'>";
            xl += "<hr style='background:#CC8;height:3px'>";
            if (pcount < 10 || npcount > 1)
                t += np;
            t = xl+t;
            t = t+"<hr style='background:#CC8;height:3px'>"+text+"</div>";
            t += mainScreenHelp(pct);
            t += '</div>';
            t += tlink;
            document.body.innerHTML = (t);
            document.body.style.backgroundImage = "url()";
            document.body.style.backgroundColor = "black";
            document.body.parentNode.style.backgroundColor = "black";
            document.body.parentNode.style.backgroundImage = "url()";
            document.body.style.overflow = "hidden";
            htd = document.getElementById("mhlx").getElementsByTagName('td');
            for (a = 1; a < htd.length; a++) {
                htd[a].style.color = 'black';
                htd[a].style.fontFamily = 'arial,helvetica';
                htd[a].style.fontSize = '9pt';
                htd[a].style.padding = '0 1em 0 1em';
                htd[a].style.borderTop = '1px solid buttonface';
                htd[a].style.verticalAlign = 'top';
                htd[a].style.textAlign = 'left';
                htd[a].style.whiteSpace = 'nowrap';
            }
            if (possibleSingleImage == 1 && pct==1) {
                document.getElementById('bx').click();
        }
        }
        window.addEventListener("keyup", firstKeyboardHandler, false);
        window.addEventListener("keydown", firstKeyDisabler, false);
        window.addEventListener("keyup", firstKeyDisabler, false);
        if (navigator.userAgent.indexOf('ecko/') > -1)
            window.addEventListener('DOMMouseScroll', firstWheelHandler, false);
        else
            document.onmousewheel = firstWheelHandler;
        window.addEventListener("resize", resizeHandler, false);
        document.body.addEventListener('mousedown', clickHandler, false);
    }
    else {
      // alert('No pictures found');
    }
};

function mainScreenHelp(pct)
{
    var h = '';


    h = '<div id=mhlx ';
    h += ' onmouseover="this.setAttribute(\'inList\',1)" ';
    h += ' onmouseout="this.setAttribute(\'inList\',0)" ';
    h += 'style="position:absolute;width:200px;top:10%;z-Index:-99;bottom:1em;';
    h += 'display:block;background:buttonface;visibility:hidden;';
    h += '-moz-border-radius:10px;';
    h += '">';
    h += '<table id=mhlxtab cellpadding=2 cellspacing=0 style="font-size:9pt;border-bottom:1px solid #237;background:white;';
    h += 'position:absolute;top:8px;bottom:8px;right:8px;left:8px;';
    h += '">';
    h += '<tr><td colspan=2 style="text-align:center;color:#015D86;background:#E5EFF5;font-size:12pt;';
    h += 'font-weight:bold;font-family:arial, helvetica">Cruiser Help';
    h += '<tr><td colspan=2 style="text-align:left;color:white;background:white;font-size:10pt;font-weight:100">';
    h += 'Cruiser is designed for fast keyboard or mouse<br> navigation of picture galleries.<br><br>';
    h += 'Move the pointer over upper left corner of the screen<br>to see help at anytime';
    h += '<tr><td colspan=2 style="text-align:center;background:#eee;font-size:8pt;font-weight:bold">Site Index Screen';
    if (pct > 0) {
        h += '<tr><td style="color:red">Right';
        if (pl.length > pct *2)
            h += '<font color=#808080>';
        h += '<br>Mouse Wheel';
        if (pl.length > pct *2)
            h += '</font>';
        h += '<td>Fetch '+pct+' pictures';
        h += '<tr><td>Left';
        h += '<td>Move Launch window down <font color=red>*</font>';
    }
    else {
        h += '<tr><td>Right';
        h += '<td>Move Launch window up <font color=red>*</font>';
        h += '<tr><td>Left/Right';
        h += '<td>Move Launch window down <font color=red>*</font>';
    }
    h += '<tr><td>Left mouse click';
    h += '<td>Open link in new tab <font color=red>*</font>';
    h += '<tr><td>Pad-1<br>\\ (backslash)<br>Q';
    h += '<td>Close Window <font color=red>*</font>';
    h += '<tr><td>L';
    h += '<td>Show/Hide text links';
    h += '<tr><td colspan=2 style="text-align:center;background:#eee;font-size:8pt;font-weight:bold">Fetched Photo Screens';
    h += '<tr><td>Right<br>Space<br>Mouse wheel down';
    h += '<td>Next picture';
    h += '<tr><td>Left<br>Mouse wheel up';
    h += '<td>Previous picture';
    h += '<tr><td>Left mouse click<br>Enter<br>Esc<br>Pad-0<br>Shift';
    h += '<td>Switch between index<br>and picture';
    h += '<tr><td>Up';
    h += '<td>Fit to screen';
    h += '<tr><td>Down';
    h += '<td>Actual size';
    h += '<tr><td>plus / minus';
    h += '<td>Make picture larger / smaller';
    h += '<tr><td>Pad-1<br>\\ (backslash)<br>Q';
    h += '<td colspan=2>Close Window <font color=red>*</font>';
    h += '<tr><td colspan=2 bgcolor="E5EFF5"><font color=red>*</font> Special setup:, type <font color="#015D86">';
    h += '<b>about:config</b></font> into your location bar';
    h += '<br>&nbsp;&nbsp;Open links in a new tab: <b>brower.link.open_newwindow=3</b>';
    h += '<br>&nbsp;&nbsp;Enable window close key: <b>dom.allow_scripts_to_close_windows=true</b>';
    h += '<br>&nbsp;&nbsp;Move close button to far right: <b>browser.tabs.closeButtons=3</b>';
    h += '<tr><td colspan=2 style="background:#E5EFF5"><center><strong style="color:blue;cursor:pointer" ';
    h += 'onclick="javascript:window.open(\'http://pcrusier.fortunecity.com\')">Online help</strong></center>';
    h += '</table></div>';
    h += '</div>';
    h += '<div id=hoverm style="background-color:transparent;z-index:9;border:1px dotted transparent;position:absolute;';
    h += 'top:0px;height:20px;left:0px;width:5em;text-align:center" ';
    h += "onmouseover='javascript:o=document.getElementById(\"mhlx\");o.style.visibility=\"visible\"; ";
    h += "o.style.left=parseInt((window.innerWidth-o.clientWidth)/2)+\"px\"' ";
    h += "onmouseout ='javascript:document.getElementById(\"mhlx\").style.visibility=\"hidden\" '";
    h += '></div>';
    return  h;
}

function kids(item,depth,noformat)
{
    var k = item.childNodes;
    var i,q,t,line,segment,w;
    var prefix = '\n';
    var unformats = ["PRE","SCRIPT"];

    for (wx = 0; wx < unformats.length; wx++)
        noformat |= (unformats[wx] == item.nodeName);
    for (q = depth; q > 0; q--)
        prefix += '   ';
    for (i = 0; i < k.length; i++) {
        if (k[i].nodeName) {
            if (k[i].nodeName == '#text') {
                if (noformat)
                    list += k[i].nodeValue;
                else {
                    line = '';
                    var words = k[i].nodeValue.replace(/\s/g, ' ').split(' ');

                    for (wx = 0; wx < words.length; wx++) {
                        if (line.length+words[wx].length > 101) {
                            list += line;
                            line = prefix;
                            for (q = item.nodeName.length; q > 0; q--)
                                line += ' ';
                        }
                        line += w+' ';
                    }
                    list += line.replace(/\s+$/, '');
                }
            }
            else {
                line = prefix;
                line += '<'+k[i].nodeName.toLowerCase()+' parent='+item.nodeName.toLowerCase();
                attrs = k[i].attributes;
                if (attrs) {
                    for (t = 0; t < attrs.length; t++) {
                        segment = " "+attrs[t].nodeName+"=\""+attrs[t].nodeValue+"\"";
                        if (line.length > 100) {
                            list += line;
                            line = prefix;
                            for (q = k[i].nodeName.length; q >= 0; q--)
                                line += ' ';
                            line += segment;
                        }
                        else
                            line += segment;
                    }
                }
                list += line;
                if (k[i].childNodes.length == 0)
                    list += '/>';
                else {
                    list += '>';
                    kids(k[i], depth+1, noformat);
                    if (k[i].childNodes.length > 1 || k[i].childNodes[0].nodeName != '#text') {
                        list += prefix;
                    }
                    list += "</"+k[i].nodeName.toLowerCase()+">";
                }
            }
        }
    }
}

firstKeyboardHandler = function(e)
{
    if (e.ctrlKey) {
        e.returnValue = true;
        return  false;
    }


    if (document.getElementById("mhlx") || document.getElementById("bx")) {
        e.preventDefault();
        e.returnValue = false;
        // alert(e.keyCode);
        switch (e.keyCode) {
            case 39 :                                      // right
                if (document.getElementById("bx"))
                    document.getElementById("bx").click();
                else
                    if (document.getElementById("bp"))
                        document.getElementById("bp").click();
                break;
            case 37 :                                      // left
                if (document.getElementById("bm"))
                    document.getElementById("bm").click();
                break;
            case 45 :                                      // pad-0
                if (document.getElementById("bx"))
                    document.getElementById("bx").click();
                break;
            case 220 :                                     // backslash \
            case 35 :                                      // pad-1
            case 81 :                                      // Q
                var msg = 'You have used the launch button on this screen';

                msg += '\nand may not have launched all sites.';
                msg += '\n\nAre you sure you want to close this site?';
                if (document.getElementById("mdiv1").style.backgroundColor != 'rgb(255, 255, 204)' || confirm(msg))
                    window.close();
                break;
            case 82 :                                      // R
                {
                    if (document.location.href.indexOf('?') > -1)
                        document.location.href += "&Cruiser=No";
                    else
                        document.location.href += "?Cruiser=No"
                }
                break;
            case 68 :
                list = '';
                kids(document, 0, false);
                document.body.setAttribute('style', 'color:white;background:black;overflow:auto;font-family:monospace;font-size:8pt');
                list = '<pre style="color:white;text-align:left">'+list.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/[\n]+/g,
                    '\n')+'</pre>';
                document.body.innerHTML = list;
                break;
            case 67 :                                      // C
                showScript(taRows, taCols);
                break;
            case 72 :
                if (document.getElementById("mhlx").style.visibility == 'visible')
                    document.getElementById("mhlx").style.visibility = 'hidden';
                else
                    showHelp();
                break;
            case 76 :
                if (document.getElementById("tlinks").style.visibility == 'visible')
                    document.getElementById("tlinks").style.visibility = 'hidden';
                else
                    showLinks();
                break;
            case 27 :
                if (document.getElementById("mhlx"))
                    document.getElementById("mhlx").style.display = "none";
                document.getElementById("tlinks").style.visibility = "hidden";
            default  :
                return ;
        }
    }
};

firstKeyDisabler = function(e)
{
    if (document.getElementById("mhlx") || document.getElementById("bx")) {
        switch (e.keyCode) {
            case 39 :
            case 37 :
            case 45 :
            case 220 :
            case 35 :
            case 81 :
            case 68 :
            case 27 :
                e.preventDefault();
                e.returnValue = false;
                break;
            default  :
                return ;
        }
    }
};

firstWheelHandler = function(e)
{
    var minset = !document.getElementById("bl");


    if (document.getElementById('cm').style.display != 'none')
        return ;
    if (!minset) {
        var k = document.getElementsByTagName('a');
        var extCount = 0;

        if (k) {
            for (var a = 0; a < k.length; a++) {
                if (k[a].getElementsByTagName('img').length > 0)
                    if (!isJPG(k[a].href)) {
                        extCount++;
                    }
            }
            minset = (extCount <= k.length/2) || extCount == k.length-1;
        }
    }
    if (document.getElementById("bx") && minset) {
        if (navigator.userAgent.indexOf('ecko/') > -1)
            window.removeEventListener('DOMMouseScroll', firstWheelHandler, false);
        else
            document.onmousewheel = null;
        document.getElementById("bx").click();
        e.preventDefault();
        e.returnValue = false;
    }
}


if ((!automatic_mode) && document.location.href.indexOf('Cruiser=Yes') == -1) {                                                          // ??
    var btn = document.createElement('div');
    // Use the 1st definition for a text button
    // var inner = "&nbsp;<input value=\"Load With Cruiser\" type=button onclick=\"document.location.href+=\'?Cruiser=Yes\'\">";
    // Use this 2nd definition for a tiny graphic to click
  	var inner="<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAIAAAD9iXMrAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAQUlEQVR42mP09fVlIAKwMDAw9HW34FdUVFrDhCl6+txVTEEs6kyNtIlSRw3zIGbgIhHqIGbgImnnPqqZx0hk/AIAGacf6bGFpioAAAAASUVORK5CYII%3D\" width=\"13\" height=\"13\"";
 	inner+=" onclick=\"document.location.href+=\'?Cruiser=Yes\'\">";


    btn.innerHTML = inner;
    btn.setAttribute('style', "position:absolute;top:.5em;right:.5em;z-index:30;background:tan;padding:0.3em;border:black solid 1px;-moz-border-radius:8px;white-space:nowrap;font-family:monospace;font:message-box");
    document.body.appendChild(btn);
}

//else if (false && (!automatic_mode) && document.location.href.indexOf('Cruiser=Yes') > -1) {                                                          // ??
//    var btn = document.createElement('div');
//    var inner = "&nbsp;<input value=\"Nix Cruiser\" type=button onclick=\"document.location.href=document.location.href.replace(/.Cruiser=Yes/g,\'\')\">";
//
//    btn.innerHTML = inner;
//    btn.setAttribute('style', "position:absolute;top:.5em;right:.5em;z-index:30;background:red;padding:0.3em;border:black solid 1px;-moz-border-radius:8px;white-space:nowrap;font-family:helvetica;font:message-box");
//    document.body.appendChild(btn);
//}
else
	if (automatic_mode || document.location.href.indexOf('Cruiser=Yes') > -1)                                          // ??
		window.addEventListener("load", firstFunction, false);