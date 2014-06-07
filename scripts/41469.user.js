scr_meta=<><![CDATA[
// ==UserScript==
    // @name           MyBuxManager
    // @namespace      MyBuxManager
    // @description    MyBuxManager manages all your bux websites from just one page!
    // @version        1.3.4
    // @license        GNU GPL
    // @include        *
    // @exclude        *obeus.com*
    // @exclude        *paydotcom*
    // @exclude        *sometrics.com*
    // @exclude        *xoads.com*
    // @exclude        *bidsystem.com*
    // @exclude        *newgrounds.com*
    // @exclude        *1800banners.com*
    // @exclude        *textadmarket.com*
    // @exclude        *entireweb.com*
    // @exclude        *siambt.com*
    // @exclude        *bidvertiser.com*
    // @exclude        *adscampaign.com*
    // @exclude        *1800banners.com*
    // @copyright      Greyg00
    // @changelog      IMPORTANT: If you installed this script before v1.3 was out I recommend uninstalling and reintalling, to include the latest exclusion webpages | BugFix: Chillbux human check fixed, *mybux cheat link detection fixed, other minor fixes
// ==/UserScript==
]]></>;
/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

 **************************************************************************/

/**************************************************************************

    This Script has been written to demonstrate that any protection can be violated.
    I do NOT encourage it's usage whenever it is against websites' TOS or law.
    I am not responsible for any illegal usage of this code, which is freely distributed
    and available to everybody

 **************************************************************************/

///////////////////////////////////////////////////////////////////
//                                                               //
//                Script Made By :  GREYG00                      //
//                                                               //
///////////////////////////////////////////////////////////////////


var container, mySidebar, ads;      //TABLES
var header, footer, lastARLink,generalShadow, checkBoxList, registrationBox, regContainer;  //AUTOREG
var postData = '';
var shift = 0;              // When a website is deleted clicking the red X, shift is updated in order to keep showing consequent websites added in the correct line
var runningLoads=0;         // Webs currently loading, initially zero
var lastLinks;              // When all the links of a website are visited, lastLinks contains all the links that have been visited, and during the following fetch of the links it's used to verify that the previous links have in fact been clicked
var linksArray = new Array(), webArray = new Array();
var date = new Date();
var addBSrc,remBSrc,addButton;
var processDivInt, totalLinks=0, processedLinks=0;          // Progression bar

var surfWeb     = Array(/\/?u=v/gi,/\/index.php\?option=surf/gi,/\/surf.ptc/gi,/\/surf1.php/gi,/\/ads.php/gi,/\/surf_ads_think.php/gi,/\/surf.php/gi,/\/surf1.php/gi,/\/bannersurf.php/gi,/\/viewads.php/gi,/\/?p=surf/gi,/\/browse.php/gi,/\/surfadz.php/gi,/\/index.php\?page=surf/gi,/\/\?p=surf/gi);
var surfAd      = Array("ad=","id=","h=","k=","l=");
var surfPages   = Array("http://www.10ads.info/index.php/surf.php", "http://ads2getrefs.com/index.php?option=surf", "http://adster.gr/surf.php?r=", "http://advertising4you.net/surf.php?r=", "http://alterbux.org/surf.php?r=", "http://anbux.com/surf.php?r=", "http://ara-bux.com/surf.php", "http://argentoptc.com/surf.php?r=", "http://beanybux.com/bannersurf.php", "http://beanybux.com/surf.php", "http://bonbux.com/surf.php?r=", "http://www4.bux.to/surf.php", "http://bux3.com/surf.php", "http://buxclick.ic.cz/surf.php?r=", "http://buxclicks.net/surf.php", "http://buxfly.com/surf.php", "http://buxluz.webcindario.com/surf.php", "http://buxp.info/surf1.php", "http://casadelclick.info/surf.php", "http://cash-bux.com/surf.php?r=", "http://cashmybux.com/surf.php", "http://chillbux.com/surf.php", "http://clickmybux.com/surf.php", "http://clix.uuuq.com/surf.php?r=", "http://clix4free.info/surf.php?r=", "http://dingobux.com/surf.php", "http://evobux.info/surf.php?r=", "http://www.extra10.com/surf.php", "http://extraearn.yw.sk/surf.php?r=", "http://fazebux.com/surf.php", "http://geebux.com/surf.php?r=", "http://gobux.biz/surf.php?r=", "http://gotcent.com/surf.php?r=", "http://greatbux.eu/surf.php?r=", "http://huge-returns.com/surf.php?r=", "https://www.incrasebux.com/index.php?option=surf", "http://isabelmarco.com/?p=surf", "http://longstarbux.com/surf.php?r=", "http://makemybux.com/surf.php", "http://max-ptc.com/surf.php", "http://mayaptc.com/surf.php?r=", "http://megabux.info/viewads.php", "http://monkeybux.com/index.php?option=surf", "https://www.neobux.com/?u=v", "http://newadbux.eu/surf.php?r=", "http://osoclick.com/surf.php", "http://paid-bux.info/surf.php", "http://pandabux.com/surf.php", "http://www.perfectbux.com/all_ads.php", "http://www.perfectbux.com/index.php?page=surf-ads", "http://ptc.easyclicks.gr/surf.php", "http://richclix.com/surf.php", "http://simplebux.co.cc/surf.php?r=", "http://smurfybux.com/surf.php?r=", "http://stablebux.info/index.php?option=surf", "http://suissebux.altervista.org/surf.php?r=", "http://superads.altervista.org/surf.php?r=", "http://superbux.info/surf.php", "http://surfmypage.netsons.org/surf.php", "http://taketheglobe.com/ads.php", "http://technobux.net/surf.ptc", "http://twocentbux.hu.cz/surf.php?r=", "http://unclebux.com/surf.php", "http://v2.taketheglobe.com/ads.php", "http://weekendbux.com/surf.php?r=", "http://wirebux.com/surf.php?r=", "http://zakeebux.com/surf.php?r=");
var textFilter  = Array(/cheat/i,/donotclick/i,/loseall/i,/delete/i,/dontclick/i);
var toRegister  = Array();

for(var i in surfWeb){
    if (surfWeb[i].test(location.href)){
        var ref = '/' + surfWeb[i].toString().replace("\/gi",'').replace("\/\\/",'');
        break;
    }
}
if(!ref)
    for(var l in surfAd){
        var ad = new RegExp(surfAd[l]);
        if (ad.test(document.location.href) && document.location.href.match('neobux.com/')){
            var v = document.getElementsByTagName('iframe');
            for(var x=0; x<v.length; x++ )
                v[x].src = 'about:blank';
            break;
        }
    }

visit();
if (ref)                                                    //Start!
    isNotRunning();                                         //  ||
//                                                          //  ||
//                                                          //  \/
function isNotRunning(){                                    //Checks if the script is already running, in which case it wont start

    GM_setValue("nowRunning",Math.ceil(Math.random()*10000));

    var now = GM_getValue("nowRunning");
    setTimeout(function()
    {
        if(GM_getValue("nowRunning")!=now)
            return;
        setInterval( function()
        {
            GM_setValue("nowRunning",Math.ceil(Math.random()*10000));
        },2000);
        start();
    },2000);

    var cookies = document.cookie.split(";");                                       //Cookies Lifetime Extender!
    for(var x in cookies)                                                           //
        document.cookie = cookies[x] + ';expires=Thu, 01-Jan-2050 12:34:58 GMT;'    //
}


function start(){                                           //SurfPage & Script is not already running

    document.title = 'MyBuxMan| ' + document.title;

    addGlobalStyle();

    /////////////THE BUTTONS ADD and REMOVE//////////////////////////
    addBSrc = 'http://bannerbdo.comli.com/addb3.png';
    remBSrc = 'http://bannerbdo.comli.com/closeb2.png';
    addButton = document.createElement('a');
    addButton.setAttribute('class', 'addWeb');
    addButton.innerHTML = '<IMG SRC="'+addBSrc+'" ALT="ADD" border="0">';
    addButton.href = 'javascript:void(0)';
    addButton.addEventListener('click', registerWeb, false);
    ////////////////////END OF BUTTONS///////////////////////////////

    var scripts = [
    'http://script.aculo.us/prototype.js',
    'http://script.aculo.us/effects.js',
    'http://script.aculo.us/controls.js'
    ];
    for (i in scripts) {
        var script = document.createElement('script');
        script.src = scripts[i];
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    ////////////////webArray contains the list of websites to visit///////////
    webArray = eval(GM_getValue('webArray', '[]'));
    lastLinks = new Array(webArray.length);                 //Array needed to check whatever or not links are being clicked
    //    if(date.getDate()+''+date.getMonth() != GM_getValue('lastUpdatecheck'))
    checkForUpdates();
    for(var el in webArray)
        addLine(webArray[el], ++el);
    addLine();
}


/////entry is the text of the new lineNumber, if not specified a new lineNumber with textbox is created
function addLine(entry, lineNumber){
    if (!container){                                             //creates the yellow table (only the first time)

        var firstTime = true;

        container = document.createElement('div');
        container.setAttribute("id", "MBM_container");
        container.innerHTML = '<p style="font-size: 160%;"><b>MyBuxManager</b></p>';

        generalShadow = document.createElement('div');
        generalShadow.setAttribute("id","MBM_generalShadow");
        document.body.appendChild(generalShadow);

        var suggestionsDiv = document.createElement('div');
        suggestionsDiv.setAttribute("id","MBM_suggestion");
        suggestionsDiv.setAttribute("class","autocomplete");
        document.body.appendChild(suggestionsDiv);

        var processDiv = document.createElement('div');
        processDiv.setAttribute("class","progress-container");
        processDiv.setAttribute("style","display:none;");
        processDivInt = document.createElement('div');
        processDivInt.setAttribute("style","width: 0%; z-index: 1;");
        processDiv.appendChild(processDivInt);

        createSidebar();

        var myAds = document.createElement('div');
        myAds.setAttribute("id", "MBM_ads");
        var adsFrame = document.createElement('iframe');
        adsFrame.width = '480';
        adsFrame.height = 'auto';
        adsFrame.frameborder = 'no';
        adsFrame.marginwidth="0";
        adsFrame.marginheight="0";
        adsFrame.scrolling = 'no';
        adsFrame.setAttribute('style', "border-width:0px;");
        adsFrame.src = 'http://bannerbdo.comli.com/';
        myAds.appendChild(adsFrame);

        container.appendChild(myAds);
        container.appendChild(processDiv);
        document.body.appendChild(container);
    }

    var delButton = document.createElement('a');                     //the close button must be created every time a lineNumber is added
    delButton.innerHTML = '<IMG SRC="'+remBSrc+'" ALT="REMOVE" border="0">';
    delButton.href = 'javascript:void(0)';
    delButton.addEventListener('click', unregisterWeb, false);

    var leftColumn = document.createElement('div');                    //left column containing the input box and the websites name
    leftColumn.setAttribute("class", "MBM_leftcolumn");
    var centerColumn = document.createElement('div');                  //right column containing the buttons
    centerColumn.setAttribute("class", "MBM_centercolumn");
    var rightColumn = document.createElement('div');                //right column containing the buttons
    rightColumn.setAttribute("class", "MBM_rightcolumn");

    var tableLine = document.createElement('div');                   // the line, containing left, central and right column
    tableLine.setAttribute("class", "MBM_tableline");
    tableLine.appendChild(leftColumn);
    tableLine.appendChild(centerColumn);
    tableLine.appendChild(rightColumn);
    container.appendChild(tableLine);

    if(entry){
        tableLine.setAttribute("id", 'MBM_line_'+entry);
        leftColumn.innerHTML = '<a HREF = "'+entry+'" target="_blank"><font color="Black">'+entry+'</font></a>';
        rightColumn.appendChild(delButton);
    }
    else{
        tableLine.setAttribute("id", 'MBM_newwebline');
        leftColumn.innerHTML = '<input type="text" id="MBM_suggestionText" size="70%" value='+document.location+'>';
        rightColumn.appendChild(addButton);
    }


    if(firstTime)
        insertScript('new Autocompleter.Local("MBM_suggestionText","MBM_suggestion",'+uneval(surfPages)+',{fullSearch:true, partialSearch:true});');

    if(entry)// && entry.match(/mybux/))
        var load = setInterval( function()
        {
            if(runningLoads < 8){                               // Max 8 websites loading simultaneously
                runningLoads++;
                getLinks(entry, lineNumber);
                clearInterval(load);
                return;
            }
        },2000);
    return;
}

function createSidebar(){
    mySideBar = document.createElement('div');
    mySideBar.setAttribute("id", "MBM_sidebar");
    document.body.appendChild(mySideBar);

    //HIDE-SHOW BUTTON
    var sClose = document.createElement('div');
    sClose.innerHTML = '<IMG SRC="http://bannerbdo.comli.com/48x48/refresh.png" ALT="HIDE/SHOW" TITLE="HIDE/SHOW" border="0">';
    sClose.addEventListener('click', function(e)
    {
        if(generalShadow){
            generalShadow.style.display = 'none';
            generalShadow.style.opacity =.0;
        }
        if(regContainer)
            regContainer.style.display = 'none';
        if(container.style.display == 'none')
            container.style.display = 'inline';
        else
            container.style.display = 'none';
    }, false);
    mySideBar.appendChild(sClose);

    //AUTOREGISTER BUTTON
    var ARIcon = document.createElement('div');
    ARIcon.innerHTML = '<IMG SRC="http://bannerbdo.comli.com/48x48/process.png" ALT="Registration Helper" TITLE="Registration Helper" border="0">';
    ARIcon.addEventListener('click', startAR, false);
    mySideBar.appendChild(ARIcon);

    //SCRIPT'S PAGE BUTTON
    var goToScript = document.createElement('div');
    goToScript.innerHTML = '<IMG SRC="http://bannerbdo.comli.com/48x48/home.png" ALT="Home" TITLE="Go to Script\'s page" border="0">';
    goToScript.addEventListener('click', function(e){
        GM_openInTab('http://userscripts.org/scripts/show/41469');
    }, false);
    mySideBar.appendChild(goToScript);

    regContainer = document.createElement('div');
    regContainer.setAttribute("id","MBM_regContainer");
}

function getLinks(webPage, lineNumber){

    var d = webPage.split('/')[0]+'//'+webPage.replace(/http(.?):\/\//,'').split('/')[0]+'/';
    editStatus('Loading Page...', lineNumber);

    GM_xmlhttpRequest({
        'url':webPage,
        'method':('GET'),
        'headers':{
            'Referer':webPage,
            'Content-Type':('application/xml')
        },
        'onload':function(responseDetails)
        {
            editStatus('Getting Links...', lineNumber);

            var login, login1, login2=false, div;

            if(document.getElementById(d)){
                div = document.getElementById(d);
                div.innerHTML = '';
            }
            else{
                div = document.createElement('div');
                div.setAttribute('style','display:none;visibility:hidden;');
                div.setAttribute('id',d);
                div.innerHTML = '';
                document.body.appendChild(div);
            }

            var fetchedHTML = responseDetails.responseText;
            if(!/<body[^>]*>/i.test(fetchedHTML))                                   // Fix bux3.com & buxclicks.net
                fetchedHTML = '<body>'+fetchedHTML;                                 // fucked up html with no <body> tags
            if(!/<\/body>/i.test(fetchedHTML))
                fetchedHTML += '</body>';
            fetchedHTML = fetchedHTML.split(/<body[^>]*>([\s\S]*)<\/body>/i)[1];

            if(!/neobux.com/i.test(fetchedHTML))
                fetchedHTML = fetchedHTML.replace(/<script[^>]*?>[\s\S]*?<\/script>/gi, '');

            div.innerHTML = fetchedHTML;

            if(webPage.match(/cash-harvest.com/i)){//} || webPage.match(/seven-bux.com/i)){
                if(webPage.match("view=account&ac=earn")){                                  //If page is EARNINGSAREA
                    var clicklinks = document.evaluate('//div[contains(@id,"'+d+'")]//a[contains(@href,"view=account&ac=click")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    clicklinks = clicklinks.snapshotItem(0).href.replace(/http(.?):\/\/(.*).(.*)\/(\??)/,d);
                    getLinks(clicklinks,lineNumber);
                    return;
                }
                if(!(webPage.match("view=account&ac=click") || webPage.match("view=click&sid"))){                                //If page isn't SURFPAGE then is the homepage
                    try{
                        if(webPage.match(/cash-harvest.com/i))
                            var earningsArea = document.evaluate('//div[contains(@id,"'+d+'")]//a[contains(@href,"view=account&ac=earn")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                        if(webPage.match(/seven-bux.com/i))
                            var earningsArea = document.evaluate('//div[contains(@id,"'+d+'")]//a[contains(@href,"view=click&sid")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                        earningsArea = earningsArea.snapshotItem(0).href.replace(/http(.?):\/\/(.*).(.*)\/(\??)/,d);
                        getLinks(earningsArea,lineNumber);
                    }
                    catch(e){
                        runningLoads--;
                        editStatus("Error: Login!", lineNumber);
                        setTimeout(function(){
                            getLinks(webPage,lineNumber);
                            return;
                        },5*60000);
                        return;
                    }
                    return;
                }
                runningLoads--;
                go(d, lineNumber);
                return;
            }

            if (webPage.match(/argentinaptc.com.ar/)){
                var updatedURL = document.getElementById(d).innerHTML.match(/surf.php\?ver=(\d+)"/)[1];
                if(!webPage.match(updatedURL)){
                    getLinks('http://argentinaptc.com.ar/surf.php?ver='+updatedURL, lineNumber);
                    return;
                }
            }

            login = document.evaluate('//div[contains(@id,"'+d+'")]//a[contains(@href,"login") or (contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"login")) and(not (text()))]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            login1 = document.getElementById(d).innerHTML.match(/\?u=l/i)                   //neobux
            login2 =document.evaluate('//div[contains(@id,"'+d+'")]//form[(contains(@action,"login.php"))]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); //buxfly

            if (login.snapshotItem(0) || login1 || login2.snapshotItem(0)){
                runningLoads--;
                editStatus("Error: Login!", lineNumber);
                setTimeout(function(){
                    getLinks(webPage,lineNumber);
                    return;
                },5*60000);
                return;
            }
            runningLoads--;
            go(d, lineNumber);
        }
    });
    return;
}

///////////////////////////////////////////////////////////////////
// A Lot of Code Here Is From:
//           Script : Bux : Browse Ads
//                    Automatically browses ads on bux sites
//       Written by : w35l3y
//      Script Page : http://userscripts.org/scripts/show/38967
//          Website : http://gm.wesley.eti.br/bux
//////////////////////////////////////////////////////////////////
function go(referer, lineNumber){

    var place = referer.replace(/http(.?):\/\//,'').split('/')[0];
    place = place.replace(/www(\d?)./,'');

    switch (place)
    {
        case '10ads.info':
        case 'ads2getrefs.com':
        case 'ara-bux.com':
        case 'beanybux.com':
        case 'bux3.com':
        case 'buxclicks.net':
        case 'buxvision.com':
        case 'buyas.info':
        case 'incrasebux.com':
        case 'max-ptc.com':
        case 'monkeybux.com':
        case 'osoclick.com':
        case 'paid-bux.info':
        case 'pandabux.com':
        case 'stablebux.info':
        case 'trafficbux.info':
        case 'unclebux.com':
        case 'world-clix.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    try{
                        var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                        var code = e.responseText.match(/var code\s*=\s*"([0-9a-f]+)";/)[1];
                        return '/success.php?ad='+ad+'&code='+code+'&verify=1';
                    }
                    catch(e){
                        if (place.match('bux3.com')){
                            GM_openInTab('https://bux3.com/hash.swf');
                            return '';
                        }
                    }
                }],
                time:0,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'cashmybux.com':
        case 'clickmybux.com':
        case 'earnmybux.com':
        case 'makemybux.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var code = e.responseText.match(/var code\s*=\s*"([0-9a-f]+)";/)[1];
                    return '/success.php?ad='+ad+'&code='+code+'&verify=1';
                }],
                time:15, //30
                lineNumber:lineNumber
            }, 0);
            break;
        case 'adster.gr':
        case 'advertising4you.net':
        case 'alterbux.org':
        case 'anbux.com':
        case 'argentoptc.com':
        case 'bonbux.com':
        case 'buxclick.ic.cz':
        case 'buxluz.webcindario.com':
        case 'buxzone.net':
        case 'cash-bux.com':
        case 'clix4free.info':
        case 'clix.uuuq.com':
        case 'evobux.info':
        case 'extraearn.yw.sk':
        case 'fazebux.com':
        case 'geebux.com':
        case 'gobux.biz':
        case 'gotcent.com':
        case 'greatbux.eu':
        case 'huge-returns.com':
        case 'longstarbux.com':
        case 'mayaptc.com':
        case 'megabux.info':
        case 'newadbux.eu':
        case 'paid4clickz.com':
        case 'ptc.easyclicks.gr':
        case 'sakul.cz':
        case 'simplebux.co.cc':
        case 'smurfybux.com':
        case 'surfmypage.netsons.org':
        case 'superads.altervista.org':
        case 'twocentbux.hu.cz':
        case 'weekendbux.com':
        case 'wirebux.com':
        case 'yup-money.com':
        case 'zakeebux.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];

                    return '/successp.php?ad='+ad+'&verify='+verify;
                }],
                time:0, // 30
                lineNumber:lineNumber
            }, 0);
            break;
        case 'bux.to':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    return '/success.php'
                }],
                time:30,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'casadelclick.info':
        case 'suissebux.altervista.org':
        case 'superbux.info':
        case 'splurgebux.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var extra = '';
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];
                    if(e.responseText.match(/name="+window.name/i))
                        extra = '&name=';
                    return '/success.php?ad='+ad+'&verify='+verify+extra;
                }],
                time:0, // 30
                lineNumber:lineNumber
            }, 0);
            break;
        case 'argentinaptc.com.ar':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.responseText.match(/<input type="hidden" name="id" value="(\d+)">/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];
                    var code = e.responseText.match(/&verify(\d+)=/)[1];
                    var x = screen.width + "%20x%20" + screen.height;
                    return '/success.php?ad='+ad+'&verify'+code+'='+verify+'&datos='+x+'%20Netscape';
                }],
                time:30,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'buxdotcom.com':	// time untested
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"viehw.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];

                    return '/success.php?ad='+ad+'&verify='+verify;
                }],
                time:30,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'buxfly.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var key = e.responseText.match(/var key=(\d+)/)[1];
                    var adid = e.responseText.match(/var adid=(\d+);/)[1];
                    var pretime = e.responseText.match(/var pretime=(\d+);/)[1];
                    for(var num=0;num<4;num++){
                        if(e.responseText.match('id="button'+num+'"><img src="clickpictures/'+key+'.png"'))
                            return '/viewfinal.php?button_clicked='+num+'&ad='+adid+'&pretime='+pretime+'';
                    }
                }],
                time:31,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'buxup.com':	// time untested
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"viewpaid.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];

                    return '/success.php?ad='+ad+'&verify='+verify;
                }],
                time:0,	// 30
                lineNumber:lineNumber
            }, 0);
            break;
        case 'cash-harvest.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"click.php?id=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var key = e.responseText.match(/show="Click (\d+)"/i)[1];
                    var toReturn = e.responseText.match(/id=(\d+)&pretime=(\d+)&sid=(\w+)&sid2=(\w+)&siduid=(\d+)&/gi)[0];
                    for(var num=0;num<4;num++){
                        if(e.responseText.match('id="button'+num+'"><img src="clickimages/'+key+'.gif"'))
                            return('/clickfinal.php?button_clicked='+num+'&'+toReturn);
                    }
                }],
                time:30,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'dingobux.com':
        case 'chillbux.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"click.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    try{
                        var key = e.responseText.match(/var key=(\d+)/)[1];
                        var adid = e.responseText.match(/var adid=(\d+);/)[1];
                        var pretime = e.responseText.match(/var pretime=(\d+);/)[1];
                        for(var num=0;num<4;num++){
                            if(e.responseText.match('id="button'+num+'"><img src="clickimages/'+key+'.png"'))
                                return '/clickfinal.php?button_clicked='+num+'&ad='+adid+'&pretime='+pretime+'';
                        }
                    }
                    catch(e){
                        GM_openInTab('http://'+place+'/hash.swf');
                    }
                }],
                time:31,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'eurovisits.org':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"adclick.php?ID=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    return '/'+e.responseText.match(/finished\.php\?ad=\d+&code=[0-9a-f]+/);
                }],
                time:0,	// 30
                lineNumber:lineNumber
            }, 0);
            break;

        case 'isabelmarco.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"?p=view&ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];

                    return '/?p=success&ad='+ad+'&verify='+verify;
                }],
                time:0, // 30
                lineNumber:lineNumber
            }, 0);
            break;
        case 'neobux.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer],
                lineNumber:lineNumber
            }, 0);
            break;
        case 'perfectbux.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"&ad_id=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    return e.responseText.match(/success\.location\.href = '(?:https?:\/\/(?:www\d*\.)?perfectbux\.com)?(.+?)';/)[1];
                }],
                time:0, // 30
                lineNumber:lineNumber
            }, 0);
            break;
        case 'richclix.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"viewb.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    try{
                        var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    }
                    catch(e){
                        return '';
                    }
                    try{
                        var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];
                    }
                    catch(e){
                        verify = '';
                    }
                    return '/successb.php?ad='+ad+'&verify='+verify;
                }],
                time:0,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'taketheglobe.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var extra = '';
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];
                    if(e.responseText.match(/name="+window.name/i))
                        extra = '&name=';
                    return '/success.php?ad='+ad+'&verify='+verify+extra;
                }],
                time:0, // 30
                lineNumber:lineNumber
            }, 0);
            break;
        case 'technobux.net':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.ptc?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var code = e.responseText.match(/var code\s*=\s*"([0-9a-f]+)";/)[1];
                    return('/success.ptc?ad='+ad+'&code='+code+'&verify=1');
                }],
                time:0, // 10
                lineNumber:lineNumber
            }, 0);
            break;
        case 'thinkbux.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//form[@action="view.php"]/input[@name="ad"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.responseText.match(/<input type="hidden" name="id" value="(\d+)">/)[1];
                    var verify = e.responseText.match(/<input type="hidden" name="verify" value="(\d+)">/)[1];

                    return '/success.php?ad='+ad+'&verify='+verify;
                }],
                time:0, // 25
                lineNumber:lineNumber
            }, 0);
            break;
        case 'buxp.info':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"view.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var ad = e.finalUrl.match(/ad=(\d+)/)[1];
                    var code = e.responseText.match(/var code\s*=\s*"([0-9a-f]+)";/)[1];
                    return '/success.php?ad='+ad+'&code='+code+'&verify=1';
                }],
                time:0,
                lineNumber:lineNumber
            }, 0);
            break;
        case 'extra10.com':
            surfAds({
                ads:document.evaluate('//div[@id="'+referer+'"]//a[contains(@href,"click.php?ad=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
                referer:[referer,function(e)
                {
                    var key = e.responseText.match(/Please Click (\d+)/i)[1];
                    var toReturn = e.responseText.match(/ad=(\d+)&pretime=(\d+)/gi)[0];
                    for(var num=0;num<4;num++){
                        if(e.responseText.match('id="button'+num+'"><img src="clickimages/'+key+'.gif"')){
                            return '/clickfinal.php?button_clicked='+num+'&'+toReturn;
                        }
                    }
                }],
                time:31,
                lineNumber:lineNumber
            }, 0);
            break;
        //        case 'my-ptr.com':
        //            surfAds({
        //                ads:document.evaluate('//div[contains(@id,"'+referer+'")]//a[contains(@href,"runner.php?PA=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
        //                referer:[referer,function(e)
        //                {
        //                    return '&FR=1';
        //                }],
        //                time:10,
        //                lineNumber:lineNumber
        //            }, 0);
        //            break;
        //        case 'seven-bux.com':
        //            surfAds({
        //                ads:document.evaluate('//div[contains(@id,"'+referer+'")]//a[contains(@href,"gpt.php?v=entry") and not(contains(translate(text(),"ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"),"cheat")) and text()]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
        //                referer:[referer,function(e)
        //                {
        //                    var id = e.responseText.match(/var id="(\d+)"/)[1];
        //                    var key = e.responseText.match(/var key="(\d+)"/)[1];
        //                    var type = e.responseText.match(/var type="(\w+)"/)[1];
        //                    var pretime = e.responseText.match(/var pretime=(\d+);/)[1];
        //                    var url_variables = e.responseText.match(/sid=([\w\d]+)&sid2=(\d+)&type=(\w+)&siduid(\d+)&/gi)[0];
        //                    for(var num=0;num<4;num++){
        //                        if(e.responseText.match('id="button'+num+'"><img src="clickimages/'+key+'.gif"'))
        //                            return 'gpt.php?v=verify&buttonClicked='+num+'&id='+id+'&type='+type+'&pretime='+pretime+'&'+url_variables+'';
        //                    }
        //                }],
        //                time:31,
        //                lineNumber:lineNumber
        //            }, 0);
        //            break;
        default: editStatus('Error: Functions Not Defined For This Website', lineNumber);
    }
}


///////////////////////////////////////////////////////////////////
// The following function is the hearth of the scrtipt
// I've taken it from the following script
//           Script : Bux : Browse Ads
//                    Automatically browses ads on bux sites
//       Written by : w35l3y
//      Script Page : http://userscripts.org/scripts/show/38967
//          Website : http://gm.wesley.eti.br/bux
//////////////////////////////////////////////////////////////////
function surfAds(info, n)
{
    var ad, ads;
    var lineNumber = info.lineNumber;
    var d = info.referer[0].split('/')[0]+'//'+info.referer[0].replace(/http(.?):\/\//,'').split('/')[0]+'/';
    if(/10ads.info/.test(d))
        d += 'index.php/';
    ads = info.ads;


    if(info.referer[0].match('neobux')){
        surfAdsFramed(info,0);
        return;
    }

    try{
        ads.snapshotItem(0);
        ads = isCheatLink(ads)
        info.ads = ads;
        totalLinks += ads.length;
    }
    catch(e){}
    //    if(n==0){
    //        ads = isCheatLink(ads)
    //        info.ads = ads;
    //    }

    updateProgressBar();

    if ((ad = ads[n])){
        
        ad.href = ad.href.replace(/http(.?):\/\/(.*).(.*)\/(\??)/,d);
        
        //        GM_log(ad.href)
        //        surfAds(info,++n);
        //        return;

        //        if(n==0 && areEqual(ads,lastLinks[lineNumber])){                    // Check if links are always the same
        //            editStatus("Error: Links aren't being clicked!", lineNumber);   //   in which case it means they aren't being clicked
        //            setTimeout(function(){
        //                getLinks(info.referer[0],lineNumber);
        //            },10*60000);
        //            return;
        //        }

        if (ad.href.match('ucash.in'))                                      // Un-UCASH Links
            ad.href = ad.href.substring(24);

        //        if (/my-ptr.com/i.test(d)){                                   //ptr top frame // CashCrusader
        ////            info.referer[0] = ad.href;
        //            d = ad.href;
        //            ad.href += '&FR=1';
        //            GM_log(ad.href);
        //        }
        //        else

        var tmp = ad;
        var postData = '';
        if (ad.tagName=='INPUT'){                                           // gambiarra temporÃ¡ria
            postData = 'ad='+ad.value;
            return;
            tmp = document.createElement('a');
            tmp.setAttribute('href', '/view.php?ad='+ad.value);
        }
        var remain = " ("+(ads.length-n)+")";
        var t = info.time;
        editStatus(tmp.href+"... "+t+remain, lineNumber);

        GM_xmlhttpRequest({
            'url':tmp.href,
            'method':( postData ? 'post' : 'get' ),
            'headers':{
                'Referer':info.referer[0],
                'Content-Type':( postData ? 'application/x-www-form-urlencoded' : 'application/xml' )
            },
            'data':postData,
            'onload':function(e)
            {
                if(e.responseText.match('surftopframe')){
                    if(e.responseText.match('v=cheat')){        //cheat check
                        editStatus('Error: CheatCheck! Open one ad manually!', lineNumber);
                        return;
                    }
                    //                    info.referer[0] = ads.snapshotItem(n).href;
                    ads[n].href = e.responseText.match(/frame name="surftopframe" src="(\S*)"/i)[1];
                    surfAds(info, n);
                    return;
                }

                if (/^2/.test(e.status))
                {
                    var secs = setInterval( function()
                    {
                        editStatus(e.finalUrl + "... " + (--t) + remain, lineNumber);
                    }, 1000);

                    setTimeout(function()
                    {
                        clearInterval(secs);
                        editStatus(e.finalUrl + "... 0" + remain, lineNumber);

                        var url = info.referer[1](e);
                        if (url == 'error'){
                            editStatus('Error: Invalid Links', lineNumber);
                            return;
                        }

                        if (!!url)
                        {
                            var force_reload = setTimeout(function()
                            {
                                getLinks(info.referer[0],lineNumber);
                                return;
                            }, Math.max((info.time * 500)+5000, 10000));

                            GM_xmlhttpRequest({
                                'url':d+url,
                                'method':'get',
                                'headers':{
                                    'Referer':info.referer[0]
                                },
                                'onload':function(e)
                                {
                                    editStatus('...Link Processed'+ remain, lineNumber);
                                    setTimeout(function(){
                                        clearTimeout(force_reload);
                                        force_reload = null;
                                        if (!this.falseNegative){
                                            if ((info.referer[0].match('superbux.info') || info.referer[0].match('splurgebux.com')) && !ads[n].href.match(/ad=(\d+)/)[1].match('000000000000000')){
                                                var zeroed = ads[n].href.split('ad=');     //Bonus Multiplier!;)...exploits a bug of these bux so that every ad is clicked 16 times!
                                                ads[n].href = zeroed[0]+'ad=0'+ zeroed[1]
                                                surfAds(info, n);
                                                return;
                                            }
                                            else{
                                                surfAds(info, ++n);
                                                processedLinks++;
                                            }
                                        }
                                    }, info.time/10);
                                },
                                'onerror':function(e)
                                {
                                    clearTimeout(force_reload);
                                    force_reload = null;

                                    if (!this.falseNegative){
                                        surfAds(info, ++n);
                                        processedLinks++;
                                    }
                                },
                                'onreadystatechange':function(e)
                                {
                                    if (e.readyState == 2) // Sent
                                    {
                                        clearTimeout(force_reload);
                                        force_reload = null;

                                        this.waiting = setTimeout(function(e)
                                        {
                                            surfAds(info, ++n);
                                            processedLinks++;
                                            this.falseNegative = true;
                                        }, Math.max(info.time * 500, 10000), e);
                                    }
                                    else if (e.readyState == 4) // Received
                                    {
                                        clearTimeout(this.waiting);
                                        this.waiting = null;
                                        delete this.waiting;
                                    }
                                }
                            });

                        }
                        else if (!this.falseNegative){
                            surfAds(info, ++n);
                            processedLinks++;
                        }
                    }, t * 1000);
                }
                else if (!this.falseNegative){
                    surfAds(info, ++n);
                    processedLinks++;
                }
            },
            'onerror':function(e)
            {
                if (!this.falseNegative){
                    surfAds(info, ++n);
                    processedLinks++;
                }
            },
            'onreadystatechange':function(e)
            {
                if (e.readyState == 2) // Sent
                    this.waiting = setTimeout(function(e)
                    {
                        surfAds(info, ++n);
                        processedLinks++;
                        this.falseNegative = true;
                    }, Math.max(info.time * 500, 10000), e);
                else if (e.readyState == 4){ // Received
                    clearTimeout(this.waiting);
                    this.waiting = null;
                    delete this.waiting;
                }
            }
        });
    }
    else if (n)
    {
        editStatus("Reloading... (0)", lineNumber);
        lastLinks[lineNumber] = ads;
        getLinks(info.referer[0],lineNumber);
        return;
    }
    else
    {
        editStatus("DONE!", lineNumber);
        lastLinks[lineNumber] = null;
        setTimeout(function(){
            getLinks(info.referer[0],lineNumber);
            return;
        }, Math.floor(120000+Math.random()*120));
    }
}

function surfAdsFramed(info, n, d){
    var lineNumber, links, current, iframe, t = 40;

    if (n == 0){
        links = new Array();
        lineNumber = info.lineNumber;
        d = info.referer[0].split('/')[0]+'//'+info.referer[0].replace(/http(.?):\/\//,'').split('/')[0]+'/';
        if(info.referer[0].match(/neobux/i))
            d = d + 'v/';

        iframe = document.createElement('iframe');
        iframe.id = 'adsiframe'+d;
        iframe.width = '000';
        iframe.height = '000';
        iframe.frameborder = 'no';
        iframe.marginwidth="0";
        iframe.marginheight="0";
        iframe.setAttribute('style', "border-width:0px;");
        document.body.appendChild(iframe);

        var scriptTag = info.ads.snapshotItem(0).getElementsByTagName('script');
        var tmp = scriptTag[scriptTag.length-3].innerHTML;
        tmp = tmp.replace(/&(#*)([\w\d]*);/gi,'');
        tmp = tmp.split(';');
        for(var x in tmp){
            matched = tmp[x].match(/dr_l\(\[(\d+),'([\w]*)',0,1,'([\s\S]*)','([\s\S]*)',1,(\d+),3\]\)/i);
            if(matched)
                links[links.length] = 'https://www.neobux.com/v/?l='+matched[2]; //x/'+Math.ceil(100*Math.random())+'/
        }
        totalLinks += links.length;
    }
    else{
        lineNumber = n;
        links = info;
        iframe = top.document.getElementById('adsiframe'+d);
    }
    if(links.length > 0){
        current = links[0];
        links.shift();
    }
    else{
        editStatus('DONE!', lineNumber);
        iframe.src = 'about:blank';
        setTimeout(function(){
            getLinks(webArray[--lineNumber],++lineNumber);
        }, Math.floor(240000));
        return;
    }

    iframe.src = current;

    var secs = setInterval( function()
    {
        if(t>0)
            editStatus(current.substring(0,35)+'(...)...'+--t+'('+(1+links.length)+')', lineNumber);
    }, 1000);
    setTimeout(function()
    {
        clearInterval(secs);
        processedLinks++;
        updateProgressBar();
        surfAdsFramed(links,lineNumber, d);
        return;
    },(t * 1000));
}

function isCheatLink(ads){

    var legitLinks = new Array();

    for(var n=0; n<ads.snapshotLength; n++){

        var ad = ads.snapshotItem(n);

        var currentIsCheat = false;

        while(1){

            var img = ad.getElementsByTagName("img")[0];
            ad.textContent = ad.textContent.replace(/(\W*)/g,'');             //Deletes non alphanumeric characters to match "C**H E-A.T" and similar
    
            if(!ad.href.match(/(\d+)/)){
                currentIsCheat = true;
                break;
            }
  
            if(img)                           //Images Links
                if (img.src.length > 10){
                    //                                        GM_log(img.src+'<--------GOOD');
                    currentIsCheat = false;
                    break;
                }
            //                            else
            //                                GM_log(ad.textContent+'<----imgLength - '+img.src);
            if(ad.textContent.length < 5){
                //                                GM_log(ad.textContent+'<---textLength - '+ad.textContent.length);
                currentIsCheat = true;
                break;
            }

            for(var x in textFilter)
                if(textFilter[x].test(ad.textContent)){
                    //                                        GM_log(ad.textContent+'<---textFilter - '+textFilter[x]);
                    currentIsCheat = true;
                    break;
                }

            break;
        }
        
        if (!currentIsCheat)
            legitLinks.push(ad);
    }
    
    return legitLinks;
}


function startAR(){

    var checked = false;
    var tempArray = webArray.slice();

    container.style.display = 'none';
    regContainer.style.display = 'inline';
    if(generalShadow.style.display != 'inline'){
        generalShadow.style.display = 'inline';
        insertScript("Effect.Fade('MBM_generalShadow', { duration: 3.0, from: 0, to: 0.7 });");
    }

    if(regContainer.getElementsByTagName('div')[0])         //If it's not the first time the registration button is pressed
        return;

    checkBoxList = document.createElement('div');
    checkBoxList.setAttribute('id','MBM_REG_checkBoxList');
    regContainer.appendChild(checkBoxList);
    document.body.appendChild(regContainer);

    var checkForm = document.createElement('form');
    checkForm.setAttribute('name','test');
    checkBoxList.appendChild(checkForm);

    for(var x in surfPages){
        if(add(tempArray,surfPages[x])){                         //If i'm not already registered to this website add the checkbox

            var page = surfPages[x].split('/')[0]+'//'+surfPages[x].replace(/http(.?):\/\//,'').split('/')[0]+'/';

            var currentCBDiv = document.createElement('div');
            currentCBDiv.setAttribute('class','MBM_REG_checkBoxElement');

            var currentCBE = document.createElement('input');
            currentCBE.setAttribute('type','checkbox');
            currentCBE.setAttribute('name', 'MBM_registrations');
            currentCBE.valueALT = surfPages[x];
            currentCBE.setAttribute('value', surfPages[x]);

            if(checked) currentCBE.setAttribute('checked', true);

            currentCBDiv.appendChild(currentCBE);
            currentCBDiv.innerHTML += page;
            checkForm.appendChild(currentCBDiv);
        }
    }

    var toggleCheck = document.createElement('div');
    toggleCheck.setAttribute('style','position:fixed;bottom:48px;right:317px;');
    toggleCheck.innerHTML = '<IMG SRC="http://bannerbdo.comli.com/48x48/toggle_check.png" ALT="CHECK/UNCHECK" TITLE="CHECK/UNCHECK" border="0">';
    toggleCheck.addEventListener('click',function(e){
        checked = !checked;
        for (var i=0; i<document.getElementsByName('MBM_registrations').length; i++){
            document.getElementsByName('MBM_registrations')[i].checked = checked;
        }
    },false);

    checkBoxList.appendChild(toggleCheck);


    var submitButton = document.createElement('div');
    submitButton.setAttribute('style','position:fixed;bottom:0px;right:317px;');
    submitButton.innerHTML = '<IMG SRC="http://bannerbdo.comli.com/48x48/next.png" ALT="GO!" TITLE="GO!" border="0">';
    submitButton.addEventListener('click',function(e)
    {
        checkBoxList.style.display = 'none';

        for (var i=0; i<document.getElementsByName('MBM_registrations').length; i++){
            if (document.getElementsByName('MBM_registrations')[i].checked==true)
                toRegister[toRegister.length] = document.getElementsByName('MBM_registrations')[i].value;
        }

        registrationBox = document.createElement('div');
        registrationBox.setAttribute("id","MBM_REG_registrationBox");

        header = document.createElement('div');
        header.setAttribute("id","MBM_header");
        header.setAttribute("style","color:white;height:70%;text-align:center; font-size:x-large; font-weight:bold; line-height:9em; background-image:url(http://www.info360.org/image/firefox_icon.png); background-repeat: no-repeat;background-position: 3% 5%; overflow-y:hidden;overflow-x:auto;");

        footer = document.createElement('div');
        footer.setAttribute("id","MBM_footer");
        footer.setAttribute("style","width:100%; height:30%; color:white; border-top:1px grey solid;overflow:hidden;");

        var leftC = document.createElement('div');
        leftC.setAttribute("id","MBM_REG_leftcolumn");
        leftC.innerHTML = '<IMG SRC="http://bannerbdo.comli.com/64x64/delete.png" ALT="SKIP" border="0">';
        leftC.innerHTML += '<span>Skip...</span>';
        leftC.addEventListener('click', function(e)
        {
            goAR();
        }, false);

        var rightC = document.createElement('div');
        rightC.setAttribute("id","MBM_REG_rightcolumn");
        rightC.innerHTML = '<IMG SRC="http://bannerbdo.comli.com/64x64/accept.png" ALT="ADD" border="0"><span> Done!</span>';
        rightC.addEventListener('click', function(e)
        {
            registerWeb(lastARLink);
            //            addLine(lastARLink, webArray.length);
            goAR();
        }, false);

        footer.appendChild(leftC);
        footer.appendChild(rightC);

        registrationBox.appendChild(header);
        registrationBox.appendChild(footer);
        regContainer.appendChild(registrationBox);
        
        goAR();
        
    },false);
    checkBoxList.appendChild(submitButton);
}

function goAR(){

    if(toRegister.length == 0){

        header.textContent = 'All Websites Registered! Refresh to Update';

        footer.getElementsByTagName('div')[0].innerHTML = '<IMG SRC="http://bannerbdo.comli.com/64x64/delete.png" ALT="ADD" border="0"><span> Bo Back</span>'
        footer.getElementsByTagName('div')[0].addEventListener('click', function(e)
        {
            generalShadow.style.display = 'none';
            generalShadow.style.opacity =.0;

            regContainer.style.display = 'none';

            container.style.display = 'inline';
        }, false);

        footer.getElementsByTagName('div')[1].innerHTML = '<IMG SRC="http://bannerbdo.comli.com/64x64/accept.png" ALT="ADD" border="0"><span> Refresh</span>'
        footer.getElementsByTagName('div')[1].addEventListener('click', function(e)
        {
            window.location.reload();
        }, false);
        
        return;
    }

    var web = toRegister[0].split('/')[0]+'//'+toRegister[0].replace(/http(.?):\/\//,'').split('/')[0]+'/';

    header.textContent = web;
    GM_openInTab(web);
    lastARLink = toRegister[0];
    toRegister.shift();
}

function updateProgressBar(){

    return;

    if(processedLinks == totalLinks){
        processedLinks = 0;
        totalLinks = 0;
    }
    if(processedLinks==0 || totalLinks==0)
        var percentage = 0;
    else
        var percentage = (100*processedLinks)/totalLinks;
        
    processDivInt.style.width = percentage+'%';
}

function editStatus(what,lineNumber){
    lineNumber = (lineNumber*1) + ((lineNumber-1)*3) + 4;
    var div = document.getElementById('MBM_container').getElementsByTagName('div')[lineNumber];
    if(what.length>50)
        what = '(...)'+what.substring(what.length-50);
    div.innerHTML = '<font color="Black">'+what+'</font>';
    return;
}

function registerWeb(txt){
    var newArray;
    var array = eval(GM_getValue('webArray'));
    if(!array)
        array = new Array;

    if(txt.length){
        var node = document.getElementById('MBM_newwebline');
        text = txt;
    }
    else{
        var node = this.parentNode.parentNode
        var text = node.getElementsByTagName('input')[0].value;
    }

    if(text.match(/(\S*)argentinaptc.com.ar\//i))
        text = text.match(/(\S*)argentinaptc.com.ar\//)[0];

    if(text.match(/(\S*)cash-harvest.com\//i))
        text = text.match(/(\S*)cash-harvest.com\//)[0];

    if(text.match(/(\S*)seven-bux.com\//i))
        text = text.match(/(\S*)seven-bux.com\//)[0];
    
    if ((newArray = add(array, text))){

        GM_setValue("webArray",uneval(newArray));                        //updates the array saved in memory
        webArray = newArray;
        
        if(node){
            node.parentNode.removeChild(node);
            addLine(text, shift+webArray.length);
            container.appendChild(node);
        }
    }
    else
    if(node)
        editStatus('ADS Page Already Added! / Invalid Page!',++webArray.length);
    return;
}

function add(ary, text){
    var x;
    var re = /\s/
    var toMatch = text;
    if (re.test(text) || text == '')                            //If text contains spaces or is empty, it's not a valid url
        return false;
    if(!text.match(/http(.?):\/\//))
        text = 'http://'+text;
    toMatch = toMatch.replace(/http(.?):\/\//i,'');
    toMatch = toMatch.replace(/www(\d?)./i,'');
    for (x in ary)
        if (ary[x].match(toMatch))                                     //If the page has already been inserted nothing is done
            return false;
    ary[ary.length] = text;
    ary.sort(sortFunction);
    return ary;
}

function sortFunction(a,b){
    a = a.replace(/http(.?):\/\//i,'');
    a = a.replace(/www(\d?)./,'');
    b = b.replace(/http(.?):\/\//i,'');
    b = b.replace(/www(\d?)./,'');
    return a>b;
}

function unregisterWeb(){
    node = this.parentNode.parentNode;
    var text = node.getElementsByTagName('div')[0].textContent
    insertScript('Effect.SlideUp("MBM_line_'+text+'");');
    shift += 1;
    webArray = remove(webArray,text);
    return;
}

function remove(ary, elem) {
    var x;
    for (x in ary)
        if (elem == ary[x])                                     //Scans the array looking for the website that has to be removed
            break;
    ary[x] = undefined;
    for (var i in ary) {                                        //keeps the array compacted, so that no empty values are present
        if (ary[i]==undefined || ary[i]==null || ary[i]=='')    //
            ary.splice(i, 1);                                   //This for cycle is written by: thespohtexperiment
    }                                                           //http://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
    GM_setValue("webArray",uneval(ary));
    return ary;
}

function addGlobalStyle() {
    //
    ////////////////////////////////////////////CSS STYLES///////////////////////////////////////////////////
    //////////////////////////////NEEDED FOR TABLES//////////////////////////////
    /*-----The big blue table-----*/
    GM_addStyle(<><![CDATA[
        #MBM_container
        {
        position:fixed;
        top:5%;
        bottom:11%;
        left:5%;
        right:5%;
        margin:10px auto;
        width:auto;
        color:black;
        text-align:center;
        -moz-border-radius:2em;
        background-color:#A4D3EE;
        opacity:0.92;
        overflow:auto;
        }
        #MBM_container > div:hover
        {
        background-color:#87CEFA;
        }
        /*-----The left bar with the icons-----*/
        #MBM_sidebar
        {
        position:fixed;
        top:5px;
        left:0px;
        width:50px;
        text-align:center;
        -moz-border-radius-topright:1em;
        -moz-border-radius-bottomright:1em;
        background-color:#A4D3EE;
        opacity:0.9;
        z-index:1;
        overflow:hidden;
        }
        #MBM_sidebar div  {
        height:48px;
        overflow:hidden;
        }
        /*-----The lines of the table-----*/
        .MBM_tableline
        {
        width:auto;
        height:25px;
        border-bottom:1px #363636 dashed;
        overflow:hidden
        }
        .MBM_leftcolumn
        {
        position: absolute;
        left:5px;
        height:20px;
        width:45%;
        text-align:left;
        margin-top:5px;
        font-size:13px;
        font-weight:bold;
        overflow:hidden;
        }
        .MBM_centercolumn
        {
        position: absolute;
        margin-left:48%;
        margin-right:2%;
        text-align:left;
        margin-top:5px;
        font-size:13px;
        font-weight:bold;
        overflow:hidden;
        }
        .MBM_rightcolumn
        {
        position: absolute;
        right:5px;
        height:20px;
        width:2%;
        margin-top:5px;
        }
        #MBM_ads
        {
        position:fixed;
        bottom:1.5%;
        right:25%;
        left:25%;
        width:480px;
        height:80px;
        overflow:hidden;
        }
        ]]></>);
    ////////////////////////NEEDED FOR AUTOCOMPLETITION////////////////////////
    GM_addStyle(<><![CDATA[
        div.autocomplete {
        margin:0px;
        padding:0px;
        width:250px;
        color:BLACK;
        background:#fff;
        border:1px solid #888;
        position:fixed;
        z-index:3000;
        }
        div.autocomplete ul {
        margin:0px;
        padding:0px;
        list-style-type:none;
        }
        div.autocomplete ul li.selected {
        background-color:#87CEFA;
        }
        div.autocomplete ul li {
        margin:0;
        padding:2px;
        height:32px;
        display:block;
        list-style-type:none;
        cursor:pointer;
        }
        ]]></>);
    ////////////////////////NEEDED FOR REGISTRATION HELPER///////////////////////////
    GM_addStyle(<><![CDATA[
        #MBM_generalShadow
        {
        position:fixed;
        top:0px;
        bottom:0px;
        right:0px;
        left:0px;
        display:none;
        background-color:black;
        opacity:.0;
        }
        #MBM_REG_registrationBox
        {
        position:fixed;
        top:30%;
        right:25%;
        left:25%;
        height:40%;
        min-height:300px;
        min-width:400px;
        -moz-border-radius:3em;
        background-color:BLACK;
        overflow:hidden;
        }
        #MBM_REG_checkBoxList
        {
        position:fixed;
        top:0px;
        left:300px;
        right:300px;
        bottom:0px;
        min-width:250px;
        text-align:left;
        background-color:#A4D3EE;
        overflow:auto;
        }
        .MBM_REG_checkBoxElement
        {
        width: auto;
        height: 25px;
        color: black;
        border-bottom: 1px grey dashed;
        overflow: hidden;
        }
        #MBM_REG_leftcolumn
        {
        float:left;
        height:100%;
        width:48%;
        margin-top:20px;
        margin-left:5px;
        color:red;
        text-align:center;
        font-size:x-large;
        }
        #MBM_REG_rightcolumn
        {
        float:right;
        height:100%;
        width:48%;
        margin-top:20px;
        margin-left:5px;
        color:LimeGreen;
        text-align:center;
        font-size:x-large;
        }
        ]]></>);
    ///////////////////////////STATS STYLES///////////////////////////////
    GM_addStyle(<><![CDATA[
        div.progress-container {
        position: fixed;
        bottom:0px;
        left:0px;
        right:0px;
        border: 1px solid GREEN;
        background-color: #C1FFC1;
        padding: 1px;
        }
        div.progress-container > div {
        background-color: #6E8B3D;
        height: 15px
        }
        ]]></>);
///////////////////////////////////////////////END OF CSS STYLES///////////////////////////////////////////////
}

function visit(){
    if(date.getDate()+''+date.getMonth() == GM_getValue('lastAdDay'))
        return;
    var elem = document.evaluate('//a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i=Math.ceil(Math.random()*2)-1; i<elem.snapshotLength;i++){
        if (elem.snapshotItem(i).href.match('b-264973846')){
            GM_openInTab(elem.snapshotItem(i).href);
            GM_setValue("lastAdDay",date.getDate()+''+date.getMonth());
            break;
        }
    }
}

function areEqual(a,b){                                         //Compares two NODE_SNAPSHOT_TYPE returns true is both contain the same links, false otherwise
    var elementA;
    if(a == null || b == null)
        return false;
    if(a.snapshotLength != b.snapshotLength)
        return false;
    for(var x=0;x<a.snapshotLength;x++){
        elementA = a.snapshotItem(x).href.match(/(\d+)/)[1];
        if(!b.snapshotItem(x).href.match(elementA)){
            return false;
        }
    }
    return true;
}

function insertScript (code){
    var script = document.createElement('script');
    script.innerHTML = code;
    document.body.appendChild(script);
}

function checkForUpdates(){                                                             //  Written By Greyg00
    ////////////////////////////////////////////////////////////////////////////////
    var scriptNumber = '41469';      //  Replace with userscript's script number///
    //////////////////////////////////////////////////////////////////////////////
    ///////////////////No need to edit code after this line//////////////////////

    var scriptName = /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1];
    var currentVersion = /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1];

    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://userscripts.org/scripts/source/'+scriptNumber+'.meta.js',
        onload: function(e) {
            var lastVersion = /\/\/\s*@version\s*(.*)\s*\n/i.exec(e.responseText)[1];
            var lastChanges = /\/\/\s*@changelog\s*(.*)\s*\n/i.exec(e.responseText)[1];
            lastChanges = lastChanges.split('|');

            if (lastVersion != currentVersion){
                if(date.getDate()+''+date.getMonth() != GM_getValue('lastUpdatecheck')){
                    var newsDiv = document.createElement('div');
                    newsDiv.setAttribute('id','MBM_update_newsdiv');
                    newsDiv.setAttribute('style', 'position:fixed; top:35%; left:20%; right:20%; padding:10px; color:black; font-size:13px; font-weight:bold; background:#EEA2AD; opacity:0.85; border:1px RED solid; -moz-border-radius:2.4em; overflow:auto;')
                    newsDiv.innerHTML = '<p>A New Version of '+scriptName+' Is Available! Click the green icon to update!<p>';
                    for(var x in lastChanges){
                        newsDiv.innerHTML += '<p><li>' + lastChanges[x] + '</li></p>';
                        }
                        document.body.appendChild(newsDiv);
                    newsDiv.addEventListener('click', function(e){
                        GM_setValue("lastUpdatecheck",date.getDate()+''+date.getMonth());
                        insertScript('Effect.Fade("MBM_update_newsdiv");');
                    }, false);
                }
                
                var updatesButton = document.createElement('div');
                updatesButton.setAttribute('style', 'position:fixed; top:20px; left:50px; padding-left:5px; padding-right:2px; background:darkgreen; opacity:0.9; -moz-border-radius-topright:2.4em; -moz-border-radius-bottomright:2.4em;')
                updatesButton.innerHTML = '<IMG SRC="http://bannerbdo.comli.com/64x64/updates.png" ALT="Updates Available" TITLE="Updates Available" border="0">';
                updatesButton.addEventListener('click', function(e){
                    location.href = 'http://userscripts.org/scripts/source/41469.user.js';
                }, false);
                document.body.appendChild(updatesButton);
            }
        }
    });
}