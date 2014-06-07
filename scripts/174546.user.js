// ==UserScript==
// @name          BitcoinTalk++
// @version       0.2.86
// @author        jackjack-jj
// @description   Adds lot of features to bitcointalk.org, including a vote system
// @namespace     https://github.com/jackjack-jj
// @homepageURL   https://userscripts.org/scripts/show/174546
// @downloadURL   https://userscripts.org/scripts/source/174546.user.js
// @updateURL     https://userscripts.org/scripts/source/174546.meta.js
// @include       https://bitcointalk.org/*
// @include       https://discussbitcoin.org/*
// @include       http://jampa.eu/*
// @include       https://jampa.eu/*
// @include       http://btpp.jampa.eu/*
// @include       https://btpp.jampa.eu/*
// ==/UserScript==
var version='0.2.86';

var body = document.getElementsByTagName('body')[0];
var website='BT';
if(document.location.href.split('discussbitcoin.or').length>1){
    website='DB';
}

var websiteurls  = {'BT':'bitcointalk.org','DB':'discussbitcoin.org'};
var websiteurl   = websiteurls[website];
var websitenames = {'BT':'BitcoinTalk','DB':'DiscussBitcoin'};
var websitename  = websitenames[website];
var ownname      = website+'++';

var server     = 'http://btpp.jampa.eu/';
var notePage   = 'note.php';
var votePage   = 'vote.php';
var clientName = 'official_'+version;
var updatefile = server+'/btpp-chrome-update.php';
var BTCSS      = '<link rel="stylesheet" type="text/css" href="https://bitcointalk.org/Themes/custom1/style.css?fin11" />';
var BTPPtitle  = '<h1 style="position:relative;bottom:15px;">BitcoinTalk++ v'+version+'</h1>';

var already_running=(document.getElementById('btpp_running')!=undefined);
if(already_running){
    document.getElementById("btpp_settings").style.color='red';
    document.getElementById("infobox").style.backgroundColor='black';
    document.getElementById("infobox").style.fontWeight='bold';
    document.getElementById("infobox").style.padding='6px';
    changeTransp('infobox', 1.0);
    changeinnerHTML('infobox','<a id="twoinstancesofbtpp" href="https://bitcointalk.org/index.php?topic=264337.msg3044502#msg3044502">Two versions of BitcoinTalk++ detected<br />Please uninstall one</a>');
    document.getElementById("twoinstancesofbtpp").style.color='red';
    return;
}

function changeTransp(id, pct){
  document.getElementById(id).style.opacity=pct;
}

function changeinnerHTML(id,txt){
  document.getElementById(id).innerHTML=txt;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function gebi(a){
    return document.getElementById(a);
}

function gebcn(a){
    return document.getElementsByClassName(a);
}

defaultwidthchat='400px';
body.innerHTML+="<span id='btpp_running'></span>";
body.innerHTML+="<div style='display:none;z-index:10;position:fixed;border:solid 1px #aaaaaa;width:"+defaultwidthchat+";' id='bitcoinchat'></div>";

function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}

function addCSS(css) {
    head = document.getElementsByTagName('head')[0];
    if(!head){return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var BTPPCSS='\
    .fakelink:hover{text-decoration:underline;}\
    .fakelink{color:rgb(71, 108, 142);cursor:pointer;}\
    .navbarlink:hover{color:rgb(224, 224, 255);text-decoration:none;}\
    .white{color:white;}\
    .hidden{display:none;}\
';
addCSS(BTPPCSS);

var hasGMGV = !(typeof GM_getValue === "undefined" || GM_getValue("a", "b") === undefined);
var cachedSettings = null;
var xml;
if(!hasGMGV){
	GM_getValue = function(name, defaultValue){
		var value = (cachedSettings === null ?
		localStorage.getItem(name) :
		cachedSettings[name]);
		if(value === undefined || value === null){
			return defaultValue;
		}
		if(value==null){return value;}
		var type = value[0];
		value=value.substring(1);
		switch (type){
			case "b":
				return (value === "true");
			case "n":
				return Number(value);
			default:
				return value;
		}
	}
	 
	GM_setValue = function(name, value){
		value = (typeof value)[0] + value;
		if (cachedSettings === null){
			localStorage.setItem(name, value);
		}else{
			cachedSettings[name] = value;
			chrome.extension.sendRequest({type: "setpref", name: name, value: value});
		}
	}

    function Chrome_XMLHttpRequest(a){
    	var oReq = new XMLHttpRequest();
    
        oReq.open(a.method, a.url, true);
        oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        oReq.onload = function(r){a.onload(r.currentTarget);}
        oReq.onerror = a.onerror;
        oReq.send(a.data);
    }
    
    xml = Chrome_XMLHttpRequest;
}else{
    xml = GM_xmlhttpRequest;
};

var myPseudo   = GM_getValue('BT_username','');
var myPassword = '';
var myUID      = GM_getValue('BT_UID_'+myPseudo,'');

function cfl(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function GMGV(p,d,m){
    n=p.indexOf(m);
    return GM_getValue(p[n], d[n]);
}

if(GM_getValue('chatcoordtop',' ').slice(GM_getValue('chatcoordtop',' ').length-1)=='%'){GM_setValue('chatcoordtop','0px');}
if(GM_getValue('chatcoordright',' ').slice(GM_getValue('chatcoordright',' ').length-1)=='%'){GM_setValue('chatcoordright','0px');}

var params      = new Array('','popcornicon','hiddenthreads','additionalcss','displaytargetdomains','displaytogglechat','displayautorefresh','showopacitybar','chatrefresh','chatcoordmaxheight','chatcoordright','chatcoordtop','displaychat','displaydbppad1','displaybtppad3','displaybtppad2','displaybtppad1','unreadrepliesautoupdaterate','dbinbt','db-large','anonupload','uploadpicserv','gotolastreadpost','displaynoteformat','displaycustomtags','btcusdcurrency','btcusdsource','displaybtcusd','btcusdrefresh','buttonsinbold','newlineBS','formataddresses','formattx','presetpost','presetpm',"colorp1","colorm1","colorbpm","symbolp1","symbolm1");
var pdefaults   = new Array('','n','','','y','n','y','n','2','150px','0px','500px','y','n','n','n','n','600','n','n','y','imgur','y','note','y','usd','mtgox','y','60','n','n','n','n','','',"#bbbbbb","#bbbbbb","#dddddd","+","&minus;");
var butnames    = new Array('','show popcorn button','threads to hide (e.g. \'bt:42;bt:1337;etc\')','additional CSS (online file or text)','display target domain after every link','display toggle chat button','display auto-refresh button','Show opacity bar','refresh rate of the chat in seconds','max height of the chatbox','space between right border and chatbox','space between top border and chatbox','display the chat','At the top of the page of DiscussBitcoin','At the top of the page','Above the original BitcoinTalk ad','At the bottom of the screen','Auto-refresh time in seconds (0 for never)','put the DiscussBitcoin index in BitcoinTalk','expand the DB layout','anonymous image upload','server for uploaded pics','make thread titles link to the last read post','format of note display','display BT++ tags','currency for Bitcoin price','source for Bitcoin price','display Bitcoin price','Bitcoin price refresh in seconds','put [+-] in bold','newline before score','format addresses','format transactions','text automatically added in your posts','text automatically added in your PMs',"color of +1","color of -1","color of surrounding []","symbol of +1","symbol of -1");

var listsOfChoices={};
var YesNo={'y':'Yes','n':'No'};
listsOfChoices['gotolastreadpost']=YesNo;
listsOfChoices['displaycustomtags']=YesNo;
listsOfChoices['displaynoteformat']={'note':'Note: (+1s)-(-1s)','pctnote':'PctNote: (+1s)/total','pctplus':'Pct+1: Note/total'};
listsOfChoices['btcusdsource']={'mtgox':'MtGox','btcavg':'BitcoinAverage','btcavgnogox':'BitcoinAverage w/o MtGox','btce':'BTC-e','stamp':'Bitstamp','bitonic':'Bitonic'};
listsOfChoices['displaybtcusd']=YesNo;
listsOfChoices['buttonsinbold']=YesNo;
listsOfChoices['newlineBS']=YesNo;
listsOfChoices['formataddresses']=YesNo;
listsOfChoices['formattx']=YesNo;
listsOfChoices['uploadpicserv']={'imgur':'imgur.com'};
listsOfChoices['anonupload']=YesNo;
listsOfChoices['db-large']=YesNo;
listsOfChoices['displaybtppad1']=YesNo;
listsOfChoices['displaybtppad2']=YesNo;
listsOfChoices['displaybtppad3']=YesNo;
listsOfChoices['displaydbppad1']=YesNo;
listsOfChoices['displaychat']=YesNo;
listsOfChoices['showopacitybar']=YesNo;
listsOfChoices['displayautorefresh']=YesNo;
listsOfChoices['displaytogglechat']=YesNo;
listsOfChoices['displaytargetdomains']=YesNo;
listsOfChoices['popcornicon']=YesNo;

var settingsDisplay={
    'Votes': ['password','newlineBS','displaynoteformat','symbolp1','symbolm1','colorp1','colorm1','colorbpm','buttonsinbold'],
    'Ticker':['displaybtcusd','btcusdsource','btcusdcurrency','btcusdrefresh'],
    'Chat':['chatrefresh','displaychat','chatcoordmaxheight','chatcoordtop','chatcoordright','showopacitybar'],
    'Features': ['hiddenthreads','additionalcss','displaytargetdomains','gotolastreadpost','displaycustomtags','formataddresses','formattx','presetpost','presetpm','uploadpicserv','anonupload','displaytogglechat','displayautorefresh','unreadrepliesautoupdaterate','popcornicon'],
    'Ads': ['displaybtppad1','displaybtppad2','displaybtppad3','displaydbppad1'],
    'DiscussBitcoin': ['db-large','dbinbt'],
};

var colorPlusOne       = GMGV(params,pdefaults,'colorp1');
var colorMinusOne      = GMGV(params,pdefaults,'colorm1');
var colorBorderPM      = GMGV(params,pdefaults,'colorbpm');
var symbolPlusOne      = GMGV(params,pdefaults,'symbolp1');
var symbolMinusOne     = GMGV(params,pdefaults,'symbolm1');
var formatAddresses    = GMGV(params,pdefaults,'formataddresses');
var formatTransactions = GMGV(params,pdefaults,'formattx');
var presetPost         = GMGV(params,pdefaults,'presetpost');
var newlineBeforeScore = GMGV(params,pdefaults,'newlineBS');
var buttonsInBold      = GMGV(params,pdefaults,'buttonsinbold');
var BTCUSDrefresh      = GMGV(params,pdefaults,'btcusdrefresh');
var displayBTCUSD      = GMGV(params,pdefaults,'displaybtcusd');
var btcusdSource       = GMGV(params,pdefaults,'btcusdsource');
var btcusdCurrency     = GMGV(params,pdefaults,'btcusdcurrency').toUpperCase();
var displayCustomTags  = GMGV(params,pdefaults,'displaycustomtags');
var displayNoteFormat  = GMGV(params,pdefaults,'displaynoteformat');
var goToLastReadPost   = GMGV(params,pdefaults,'gotolastreadpost');
var presetPM           = GMGV(params,pdefaults,'presetpm');
var servImageUpload    = GMGV(params,pdefaults,'uploadpicserv');
var anonImageUpload    = GMGV(params,pdefaults,'anonupload');
var DBExtendLayout     = GMGV(params,pdefaults,'db-large');
var DBindexinBT        = GMGV(params,pdefaults,'dbinbt');
var TimeBetweenURAU    = GMGV(params,pdefaults,'unreadrepliesautoupdaterate');
var DisplayBTPPAd_1    = GMGV(params,pdefaults,'displaybtppad1');
var DisplayBTPPAd_2    = GMGV(params,pdefaults,'displaybtppad2');
var DisplayBTPPAd_3    = GMGV(params,pdefaults,'displaybtppad3');
var DisplayDBPPAd_1    = GMGV(params,pdefaults,'displaydbppad1');
var DisplayChat        = GMGV(params,pdefaults,'displaychat');
var ChatCoordTop       = GMGV(params,pdefaults,'chatcoordtop');
var ChatCoordRight     = GMGV(params,pdefaults,'chatcoordright');
var ChatCoordMaxHeight = GMGV(params,pdefaults,'chatcoordmaxheight');
var refreshChat        = GMGV(params,pdefaults,'chatrefresh');
var showopacitybar     = GMGV(params,pdefaults,'showopacitybar');
var displayAutoRefresh = GMGV(params,pdefaults,'displayautorefresh');
var displayToggleChat  = GMGV(params,pdefaults,'displaytogglechat');
var displayDomains     = GMGV(params,pdefaults,'displaytargetdomains');
var AdditionalCSS      = GMGV(params,pdefaults,'additionalcss');
var hiddenThreads      = GMGV(params,pdefaults,'hiddenthreads');
var showPopcornIcon    = GMGV(params,pdefaults,'popcornicon');

refreshChat=1000.0*Number(refreshChat);

function formatChoice(v,param){
    if(param in listsOfChoices){return listsOfChoices[param][v];}
    return v;
}

function noteNumber(n,v,p,m,type){
    var r=[0,'',''];
    if(type=='pctnote'){
        if(v>0){
            r[0]=Math.round(100.0*n/v);
        }
        r[2]='%';
    }else if(type=='pctplus'){
        if(v>0){
            r[0]=Math.round(100.0*p/v);
        }
        r[2]='%';
    }else{
        r[0]=n;
    }
    return r;
}

function formatNote(data,type){
    var bgc='#ddddff';
    var n=data['note'];
    var v=data['votes'];
    var p=(v+n)/2;
    var m=(v-n)/2;

    var vals=noteNumber(n,v,p,m,type);
    var val=vals[0];
    var before=vals[1];
    var after=vals[2];
    
    var ns='';
    if(val>0){ns+='+';}
    ns+=val;
    
    if(n>0){ns='<span style="font-weight:bold;color:#33bb33;">'+before+ns+after+'</span>';bgc='#d3f3d3';}
    if(n<0){ns='<span style="font-weight:bold;color:red;">'+before+ns+after+'</span>';bgc='#ffdddd';}
    if(n==0 && v>0){ns='<span style="font-weight:bold;color:#6262aa;">'+before+ns+after+'</span>';}
    
    return [ns+"<span style='font-size:50%;'>/"+v+"</span>",bgc];
}

function mapCN(f,cn,stop){
    var r=new Array();
    if(stop==0){stop=function(){return false;};}
    var rsls = document.getElementsByClassName(cn);
    for (i=0; i<rsls.length; i++)
    {
        rsl=rsls[i];
        if(stop(rsl)){return;}
        r.push(f(rsl));
    }
    return r;
}

function handleScoreAnswer(sa,classname){
    var data;
   	data=JSON.parse(sa);
    for (j=0; j<document.getElementsByClassName('score_'+classname).length; j++){
        var rfn=formatNote(data,displayNoteFormat);
        var ownvote=data['ownvote'];
        document.getElementsByClassName('score_'+classname)[j].innerHTML=rfn[0];
        document.getElementsByClassName('scoreAB_'+classname)[j].style.backgroundColor=rfn[1];
        document.getElementsByClassName('scoreABP_'+classname)[j].style.color='#bbbbbb';
        document.getElementsByClassName('scoreABM_'+classname)[j].style.color='#bbbbbb';
        if(ownvote!=0 && ownvote!=undefined){
            document.getElementsByClassName('scoreAB'+(ownvote>0?'P':'M')+'_'+classname)[j].style.color='#000000';
        }
    }
    if(displayCustomTags=='y'){
        for (j=0; j<document.getElementsByClassName('tag_'+classname).length; j++){
            document.getElementsByClassName('tag_'+classname)[j].innerHTML=(data['tag']!=''?'<br />':'')+'<span style="'+data['tag']['style']+'">'+data['tag']['name'].replace('\n','<br />')+'</span>';
        }
    }
}

function displayServerDependantFields(rr){
    if(rr){
        mapCN(
            function(rsl){rsl.style.display='inline';},'scoreandbuttons',
            function(rsl){return rsl.style.display!='none';}
        );
        mapCN(
            function(rsl){rsl.style.display='inline';},'addnote',
            0
        );
        mapCN(
            function(rsl){rsl.style.display='inline';},'togglesig',
            0
        );
        mapCN(
            function(rsl){rsl.style.display='inline';},'reportscammerlink',
            0
        );
    }
}

function writeScoresGetPage(uurl, classname, error) {
    error = error || function (){};
    callback=function(r){
        var rr=r.responseText;
        displayServerDependantFields(rr);
        handleScoreAnswer(rr,classname);
    }
    var arg = {
        method: 'GET',
        url: uurl,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: '',
        onload: callback,
        onerror: error
    };
    xml(arg);
};

function getPageWithData(uurl, callback, error, d, met) {
    error = error || function (){};
    var arg = {
        method: met,
        url: uurl,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        //synchronous: true, // FF will crash if the network is slow. 
        data: d,
        onload: callback,
        onerror: error
    };
    xml(arg);
}
function getPage(uurl, callback, error) {
    getPageWithData(uurl, callback, error, '', 'GET');
}

if(document.location.href.split('btpp.jampa.eu').length>1){
    var uidinput=gebi('btpp_getpw_uid');
    if(uidinput){
        getPage('https://bitcointalk.org/index.php?action=profile',function(r){
            var ok=0;
            var z=r.responseText.match(/;u=([0-9]*);/);
            if(z.length>1){gebi('btpp_getpw_uid').value=z[1];ok=1;}
            var y=r.responseText.match(/Hello <b>([^<]*)</);
            if(y.length>1 && gebi('btpp_getpw_uid_autofilled')){gebi('btpp_getpw_uid_autofilled').innerHTML='Autofilled for: '+y[1];}
            if(gebi('btpp_getpw_form') && ok){gebi('btpp_getpw_form').submit();}
        },0);
    }
}

if(AdditionalCSS!=''){
    if(AdditionalCSS.indexOf('://')<0){
        addCSS(AdditionalCSS);
    }else{
        getPage(AdditionalCSS, function(r){addCSS(r.responseText);}, 0);
    }
}

function saveSetting(param,v){
    return function(){
        if(v==undefined){v=document.getElementById(param).value;}
        GM_setValue(param, v);
        var current=document.getElementById('current_'+param);
        if(current){current.innerHTML=formatChoice(v,param);}
        v=undefined;
    }
}

function cfa(a){return '<span style="color:green;">'+a+'</span>';}
var translators=[
//    ['John','Chinese','1d4c5az42gr84fvre3qszd'],
];
if(document.location.href.split('/btppcontributors.ph').length>1){
    p=document.location.href.split('/btppcontributors.php?u=')[1];
    body.innerHTML='<title>BT++ Settings</title>'+BTCSS+BTPPtitle+'\
    <a href="https://bitcointalk.org/">Bitcoin Forum</a> > <a href="https://bitcointalk.org/btppconf.php?user='+p+'">BT++ Settings</a> > Contributors<br /><br /><br /><br />\
    <span style="position:relative;right:0px;">BitcoinTalk++ support address:</span> '+cfa('1Pxeccscj1ygseTdSV1qUqQCanp2B2NMM2')+'<br />\
    <span style="position:relative;right:0px;">Administrator, jackjack:</span> '+cfa('19QkqAza7BHFTuoz9N8UQkryP4E9jHo4N3')+'<br />\
    <span style="position:relative;right:0px;">Hosting, joesmoe2012:</span> '+cfa('182g6bDALmLxWnPAYSxfhczp7DoPXci2XT')+'<br />\
    <br />\
    ';
    for(i=0;i<translators.length;i++){
        if(!i){body.innerHTML+='<b style="position:relative;right:10px;">Translators</b><br />';}
        t=translators[i];
        body.innerHTML+=t[0]+', '+t[1]+': '+t[2]+'<br />';
    }
    return;
    
}

function saveSettingsServer(){
    var s={};
    for(pn in params){if(pn==0){continue;}p=params[pn];
        s[p]=GMGV(params,pdefaults,p);
    }
    getPageWithData(server+"/savesettings.php", function(r){
            changeinnerHTML('savesettingserror',r.responseText);
            setTimeout(function(){changeinnerHTML('savesettingserror','');},3000);
        }, 0, 
        'pos=0&pseudo='+pseudo+'&pass='+GM_getValue('password_'+pseudo,'BTPPJJNOTSET')+'&uid='+myUID+'&data='+encodeURIComponent(JSON.stringify(s))
    ,'POST');
}

function loadSettingsServer(){
    getPageWithData(server+"/loadsettings.php", function(r){
            var d;
            eval("d="+r.responseText+';');
            var err=d['error'];
            if(err=="none"){
                var dd=d['data'];
                for(p in dd){
                    var v=dd[p];
                    if(v!='BT++JJNOTSET'){saveSetting(p,v)();}
                }
                changeinnerHTML('loadsettingserror',' (done)');
                setTimeout(function(){changeinnerHTML('loadsettingserror','');},3000);
            }else{changeinnerHTML('loadsettingserror',err);}
            
        }, 0, 
        'pos=0&pseudo='+pseudo+'&pass='+GM_getValue('password_'+pseudo,'')+'&uid='+myUID
    ,'POST');
}

if(document.location.href.split('/btppconf.ph').length>1){ // btpp config page
    var pseudo=document.location.href.split('user=')[1].split('&')[0];
    pseudo=decodeURIComponent(pseudo);

    butnames[0]='password for '+pseudo;
    params[0]='password_'+pseudo;
    
    body.innerHTML='<title>BT++ Settings</title>'+BTCSS+BTPPtitle+'\
    <a href="https://'+websiteurl+'/">'+websitename+'</a> > '+ownname+' Settings<br /><br />\
    <b style="position:relative;right:10px;"><h2>Links</h2></b>\
    <a href="https://bitcointalk.org/index.php?topic=264337.new;topicseen#new">BitcoinTalk++ thread on BitcoinTalk</a><br />\
    <a href="'+server+'/getpassword.php">Get your password</a><br />\
    <a href="https://bitcointalk.org/btppcontributors.php?u='+pseudo+'">BT++ contributors</a><br />\
    <a href="https://bitcointalk.org/privatemessages.php">List of your PMs</a><br />\
    <a href="'+server+'/list/">Lists of all BT++ scores</a><br />\
    <a href="'+server+'/voteslist.php">Lists of all BT++ votes</a><br />\
    <a href="'+server+'/scamreports/">List of reported potential scammers</a><br />\
    <br />\
    <b style="position:relative;right:10px;"><h2>Settings</h2></b>\
    <span style="position:relative;bottom:10px;right:3px;"><span class="fakelink" id="savesettings" style="font-weight:bold;font-size:105%;">Save settings</span><span id="savesettingserror"></span></span><br />\
    <span style="position:relative;bottom:10px;right:3px;"><span class="fakelink" id="loadsettings" style="font-weight:bold;font-size:105%;">Load settings</span><span id="loadsettingserror"></span></span><br />\
    ';

    table='<table border=0 style="position:relative;bottom:10px;">';
    for(setting in settingsDisplay){
        paramz=settingsDisplay[setting];
        table+='<tr><td colspan=4 style="font-weight:bold;"><span style="position:relative;right:5px;top:5px;">'+setting+'</span></td></tr>';
        for(j=0;j<paramz.length;j++){
            if(paramz[j]=='password'){i=0;}
            else{i=params.indexOf(paramz[j]);}
            
            param   = params[i];
            butname = butnames[i];
            def     = pdefaults[i];
            type    = '';
            current = GMGV(params,pdefaults,param);
            pwbreaker='';
            if(i==0){type=' type="password" ';current='*hidden*';pwbreaker='no';}
            var cut_ht=(param=='hiddenthreads' && current.length>20);
            if(cut_ht){current='*hidden*';}
            input='<input '+type+' id="'+param+'" />';
            
            if(param in listsOfChoices){
                choices=listsOfChoices[param];
                input='<select id="'+param+'">';
                for(var l_value in choices){if(choices.hasOwnProperty(l_value)){
                        selected='';
                        if(current==l_value){selected='selected';}
                        l_name=choices[l_value];
                        input+='<option value="'+l_value+'" '+selected+'>'+l_name+'</option>';
                }}
                input+='</select>';
            }
            showbutton='';
            if(i==0){showbutton='<td><input id="show_password" type=button value="Show" /></td>';}
            if(cut_ht){showbutton='<td><input id="showhiddenthreads" type=button value="Show" /></td>';}
            table+='<tr><td>'+cfl(butname)+' <a href="" onclick="document.getElementById(\''+param+'\').value=\''+def+'\';return false;">(default='+def+')</span></td><td>Current: <span id="'+pwbreaker+'current_'+param+'">'+formatChoice(current,param)+'</span></td><td>'+input+'</td><td><input type=button id="'+param+'b" value="Change" /><span id="'+param+'done"></span></td>'+showbutton+'</tr>';
            
        }
    }
    table+='</table>';
    
    body.innerHTML+=table;

    el=document.getElementById('show_password');
    if(el){el.addEventListener('click',function(){alert(params[0]+': '+GM_getValue(params[0], 'None'));}, false);}
    el=document.getElementById('showhiddenthreads');
    if(el){el.addEventListener('click',function(){alert('Hidden threads'+': '+GM_getValue('hiddenthreads', 'None'));}, false);}
    for(i=0;i<params.length;i++){
        param=params[i];
        butname=butnames[i];
        el=document.getElementById(param+'b');
        if(el){el.addEventListener('click',saveSetting(param,undefined), false);}
    }
    
    el=document.getElementById('savesettings');
    if(el){el.addEventListener('click',saveSettingsServer, false);}
    el=document.getElementById('loadsettings');
    if(el){el.addEventListener('click',loadSettingsServer, false);}
    return;
}

BTCUSDrefresh=Number(BTCUSDrefresh);

var regexpPMS = new RegExp('\n\t\t<tr><td((.|\n)*?)</table>\n\t\t</td></tr>', "g");
var PMfaits=0;
var listPM='';


function callbackPMEnd(){
    body.innerHTML=BTCSS+BTPPtitle+'<a href="https://bitcointalk.org">Bitcoin Forum</a> > All your PMs\
        <br /><br />\
        <table cellpadding="4" cellspacing="0" border="0" width="100%" class="bordercolor">\
        '+listPM+'</table>';
}

function concatPM(r,i,max,c){
    var resp = r.responseText;
    result = regexpPMS.exec(resp);
    
    body.innerHTML=BTCSS+BTPPtitle+'<a href="https://bitcointalk.org">Bitcoin Forum</a> > All your PMs\
        <br /><br />Downloading PMs: '+i+'/'+max;
    
    while(result != null){
        PMfaits+=1;
        listPM+='<tr><td'+result[1]+'</table>\n\t\t</td></tr>';
        result = regexpPMS.exec(resp);
    }   
    
    if(i<maxpagePM){
        var pmpage='https://bitcointalk.org/index.php?action=pm;f=inbox;sort=date;start='+String(i+20);
        getPage(pmpage, function(r){concatPM(r,i+20,maxpagePM,c);}, 0);
    }else{
        c();
    }
}

function callbackPM(r){
    var reg = new RegExp('f=inbox;start=([0-9]{0,10})" method=');
    maxpagePM = reg.exec(r.responseText)[1];
    body.innerHTML=BTCSS+'Downloading PMs';
    getPage('https://bitcointalk.org/index.php?action=pm;f=inbox;sort=date;start=0', function(r){concatPM(r,0,maxpagePM,callbackPMEnd);}, 0);
}

if(document.location.href.split('/privatemessages.ph').length>1){
  body.innerHTML='';
  getPage('https://bitcointalk.org/index.php?action=pm', callbackPM, 0);
  return;
}


if(website=='BT'){
    var hellotext = document.getElementById('hellomember');
    if(hellotext){
        var reg = new RegExp('Hello <b>([^>]*)<\/b>', "g");
        var chaine = hellotext.innerHTML;
        if(myPseudo==''){
            myPseudo   = reg.exec(chaine)[1];
        }
        myPassword = GM_getValue("password_"+myPseudo, "");
        GM_setValue('BT_username',myPseudo);
        myUID = GM_getValue('BT_UID_'+myPseudo,'');
        if(myUID=='' && myPseudo!=''){
            getPage('https://bitcointalk.org/index.php?action=profile',function(r){uid=r.responseText.split('https://bitcointalk.org/index.php?action=profile;u=')[1].split(';')[0];myUID=uid;GM_setValue('BT_UID_'+myPseudo,uid);},0);
        }
    }
}
if(website=='DB'){
    var hellotext = document.getElementById('panel');
    if(hellotext){
        var reg = new RegExp('>([^>]*)</a></strong>. You last visited', "g");
        var chaine = hellotext.innerHTML;
        myPseudo = reg.exec(chaine)[1];
        myPassword=GM_getValue("password_"+myPseudo, "");
    }
    gebi('header').innerHTML=gebi('header').innerHTML.replace(
        /<div class="header_side"/g,
        '<div id="dbppadv1" style="position:relative;top:20px;width:728px;float:left;"></div>$&'
    );

    if(gebi('dbppadv1') && DisplayDBPPAd_1=='y'){
        var iframedb1 = document.createElement('iframe');
        iframedb1.frameBorder = 0;
        iframedb1.width = "728px";
        iframedb1.height = "90px";
        iframedb1.id = "iframedb1";
        iframedb1.setAttribute('data-aa','8955');
        iframedb1.src = 'https://ad.a-ads.com/8955?size=728x90';
        iframedb1.onload = function(){
    //        gebi('dbppadv1').style.display='table-cell';
        };
        gebi('dbppadv1').appendChild(iframedb1);
    }

}
var iamjj=(myPseudo=='jackjack');

if(website=='DB' && DBExtendLayout=='y'){
    var pqb = document.getElementsByClassName('mainwrap');
    for(i=0;i<pqb.length;i++){
        var p=pqb[i];
        p.style.width='90%';
    }
    var pqb = document.getElementsByClassName('header_main');
    for(i=0;i<pqb.length;i++){
        var p=pqb[i];
        p.style.width='100%';
    }
    document.getElementById('navbar').style.background='#f0f0f0';
    document.getElementById('navbar').style.width='100%';
    var pqb = document.getElementsByClassName('footer_main');
    for(i=0;i<pqb.length;i++){
        var p=pqb[i];
        p.style.background='none';
    }
}


threadview=(body.innerHTML.indexOf('">With a <i>Quick-Reply</i> you can use bulletin board code and smileys as you would in a normal post, but much more conveniently.')>-1);
var smileyspacer='&nbsp;&nbsp;';
smileys='<a href="javascript:void(0);" onclick="surroundText(\'[b]\', \'[/b]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/bold.gif" align="bottom" width="23" height="22" alt="Bold" title="Bold" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><a href="javascript:void(0);" onclick="surroundText(\'[i]\', \'[/i]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/italicize.gif" align="bottom" width="23" height="22" alt="Italicized" title="Italicized" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><a href="javascript:void(0);" onclick="surroundText(\'[u]\', \'[/u]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/underline.gif" align="bottom" width="23" height="22" alt="Underline" title="Underline" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><a href="javascript:void(0);" onclick="surroundText(\'[s]\', \'[/s]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/strike.gif" align="bottom" width="23" height="22" alt="Strikethrough" title="Strikethrough" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><img src="https://bitcointalk.org/Themes/custom1/images/bbc/divider.gif" alt="|" style="margin: 0 3px 0 3px;" /><a href="javascript:void(0);" onclick="replaceText(\'[btc]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/BTC.gif" align="bottom" width="23" height="22" alt="Insert Bitcoin symbol" title="Insert Bitcoin symbol" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><img src="https://bitcointalk.org/Themes/custom1/images/bbc/divider.gif" alt="|" style="margin: 0 3px 0 3px;" /><a href="javascript:void(0);" onclick="surroundText(\'[glow=red,2,300]\', \'[/glow]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/glow.gif" align="bottom" width="23" height="22" alt="Glow" title="Glow" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><a href="javascript:void(0);" onclick="surroundText(\'[shadow=red,left]\', \'[/shadow]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/shadow.gif" align="bottom" width="23" height="22" alt="Shadow" title="Shadow" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><img src="https://bitcointalk.org/Themes/custom1/images/bbc/divider.gif" alt="|" style="margin: 0 3px 0 3px;" /><a href="javascript:void(0);" onclick="surroundText(\'[pre]\', \'[/pre]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/pre.gif" align="bottom" width="23" height="22" alt="Preformatted Text" title="Preformatted Text" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><a href="javascript:void(0);" onclick="surroundText(\'[left]\', \'[/left]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/left.gif" align="bottom" width="23" height="22" alt="Left Align" title="Left Align" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><a href="javascript:void(0);" onclick="surroundText(\'[center]\', \'[/center]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/center.gif" align="bottom" width="23" height="22" alt="Centered" title="Centered" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><a href="javascript:void(0);" onclick="surroundText(\'[right]\', \'[/right]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/right.gif" align="bottom" width="23" height="22" alt="Right Align" title="Right Align" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><img src="https://bitcointalk.org/Themes/custom1/images/bbc/divider.gif" alt="|" style="margin: 0 3px 0 3px;" /><a href="javascript:void(0);" onclick="replaceText(\'[hr]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/hr.gif" align="bottom" width="23" height="22" alt="Horizontal Rule" title="Horizontal Rule" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><img src="https://bitcointalk.org/Themes/custom1/images/bbc/divider.gif" alt="|" style="margin: 0 3px 0 3px;" /><a href="javascript:void(0);" onclick="surroundText(\'[size=10pt]\', \'[/size]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/size.gif" align="bottom" width="23" height="22" alt="Font Size" title="Font Size" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><a href="javascript:void(0);" onclick="surroundText(\'[font=Verdana]\', \'[/font]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/face.gif" align="bottom" width="23" height="22" alt="Font Face" title="Font Face" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a>'+
'<br /><a href="javascript:void(0);" onclick="surroundText(\'[flash=200,200]\', \'[/flash]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/flash.gif" align="bottom" width="23" height="22" alt="Insert Flash" title="Insert Flash" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><a href="javascript:void(0);" onclick="surroundText(\'[img]\', \'[/img]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/img.gif" align="bottom" width="23" height="22" alt="Insert Image" title="Insert Image" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a>\
<a href="javascript:void(0);" onclick="surroundText(\'[url]\', \'[/url]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/url.gif" align="bottom" width="23" height="22" alt="Insert Hyperlink" title="Insert Hyperlink" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a>\
<a href="javascript:void(0);" onclick="surroundText(\'[email]\', \'[/email]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/email.gif" align="bottom" width="23" height="22" alt="Insert Email" title="Insert Email" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><a href="javascript:void(0);" onclick="surroundText(\'[ftp]\', \'[/ftp]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/ftp.gif" align="bottom" width="23" height="22" alt="Insert FTP Link" title="Insert FTP Link" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><img src="https://bitcointalk.org/Themes/custom1/images/bbc/divider.gif" alt="|" style="margin: 0 3px 0 3px;" /><a href="javascript:void(0);" onclick="surroundText(\'[table]\', \'[/table]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/table.gif" align="bottom" width="23" height="22" alt="Insert Table" title="Insert Table" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><a href="javascript:void(0);" onclick="surroundText(\'[tr]\', \'[/tr]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/tr.gif" align="bottom" width="23" height="22" alt="Insert Table Row" title="Insert Table Row" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><a href="javascript:void(0);" onclick="surroundText(\'[td]\', \'[/td]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/td.gif" align="bottom" width="23" height="22" alt="Insert Table Column" title="Insert Table Column" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><img src="https://bitcointalk.org/Themes/custom1/images/bbc/divider.gif" alt="|" style="margin: 0 3px 0 3px;" /><a href="javascript:void(0);" onclick="surroundText(\'[sup]\', \'[/sup]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/sup.gif" align="bottom" width="23" height="22" alt="Superscript" title="Superscript" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><a href="javascript:void(0);" onclick="surroundText(\'[sub]\', \'[/sub]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/sub.gif" align="bottom" width="23" height="22" alt="Subscript" title="Subscript" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><a href="javascript:void(0);" onclick="surroundText(\'[tt]\', \'[/tt]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/tele.gif" align="bottom" width="23" height="22" alt="Teletype" title="Teletype" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><img src="https://bitcointalk.org/Themes/custom1/images/bbc/divider.gif" alt="|" style="margin: 0 3px 0 3px;" /><a href="javascript:void(0);" onclick="surroundText(\'[code]\', \'[/code]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/code.gif" align="bottom" width="23" height="22" alt="Insert Code" title="Insert Code" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><a href="javascript:void(0);" onclick="surroundText(\'[quote]\', \'[/quote]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="https://bitcointalk.org/Themes/custom1/images/bbc/quote.gif" align="bottom" width="23" height="22" alt="Insert Quote" title="Insert Quote" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a><img src="https://bitcointalk.org/Themes/custom1/images/bbc/divider.gif" alt="|" style="margin: 0 3px 0 3px;" /><a href="javascript:void(0);" onclick="surroundText(\'[list]\\n[li]\', \'[/li]\\n[li][/li]\\n[/list]\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Themes/custom1/images/bbc/list.gif" align="bottom" width="23" height="22" alt="Insert List" title="Insert List" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a>'+
'<br /><a href="javascript:void(0);" onclick="replaceText(\' :)\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/smiley.gif" align="bottom" alt="Smiley" title="Smiley" /></a>'+
smileyspacer+'<a href="javascript:void(0);" onclick="replaceText(\' ;)\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/wink.gif" align="bottom" alt="Wink" title="Wink" /></a>'+
smileyspacer+'<a href="javascript:void(0);" onclick="replaceText(\' :D\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/cheesy.gif" align="bottom" alt="Cheesy" title="Cheesy" /></a>'+
smileyspacer+'<a href="javascript:void(0);" onclick="replaceText(\' ;D\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/grin.gif" align="bottom" alt="Grin" title="Grin" /></a>'+
smileyspacer+'<a href="javascript:void(0);" onclick="replaceText(\' >:(\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/angry.gif" align="bottom" alt="Angry" title="Angry" /></a>'+
smileyspacer+'<a href="javascript:void(0);" onclick="replaceText(\' :(\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/sad.gif" align="bottom" alt="Sad" title="Sad" /></a>'+
smileyspacer+'<a href="javascript:void(0);" onclick="replaceText(\' :o\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/shocked.gif" align="bottom" alt="Shocked" title="Shocked" /></a>'+
smileyspacer+'<a href="javascript:void(0);" onclick="replaceText(\' 8)\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/cool.gif" align="bottom" alt="Cool" title="Cool" /></a>'+
smileyspacer+'<a href="javascript:void(0);" onclick="replaceText(\' ???\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/huh.gif" align="bottom" alt="Huh" title="Huh" /></a>'+
smileyspacer+'<a href="javascript:void(0);" onclick="replaceText(\' ::)\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/rolleyes.gif" align="bottom" alt="Roll Eyes" title="Roll Eyes" /></a>'+
smileyspacer+'<a href="javascript:void(0);" onclick="replaceText(\' :P\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/tongue.gif" align="bottom" alt="Tongue" title="Tongue" /></a>'+
smileyspacer+'<a href="javascript:void(0);" onclick="replaceText(\' :-[\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/embarrassed.gif" align="bottom" alt="Embarrassed" title="Embarrassed" /></a>'+
smileyspacer+'<a href="javascript:void(0);" onclick="replaceText(\' :-X\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/lipsrsealed.gif" align="bottom" alt="Lips sealed" title="Lips sealed" /></a>'+
smileyspacer+'<a href="javascript:void(0);" onclick="replaceText(\' :-\\\\\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/undecided.gif" align="bottom" alt="Undecided" title="Undecided" /></a>'+
smileyspacer+'<a href="javascript:void(0);" onclick="replaceText(\' :-*\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/kiss.gif" align="bottom" alt="Kiss" title="Kiss" /></a>'+
smileyspacer+'<a href="javascript:void(0);" onclick="replaceText(\' :\\\\\'(\', document.forms.postmodify.message); return false;"><img src="https://bitcointalk.org/Smileys/default/cry.gif" align="bottom" alt="Cry" title="Cry" /></a>';


function resetPassword(){
    pass='';
    while(pass == ''){
      pass = window.prompt('BT++ password for '+myPseudo);
    }
    if(pass == null){
        if(GM_getValue("password_"+myPseudo, '')!=''){
            return;
        }
    }
    
    GM_setValue("password_"+myPseudo, pass);
}


var infobox='<div id="refreshcountdown" style="position:absolute;"></div><div id="infobox" style="\
  z-index:15;\
  background-color:#ddddff;\
  border:1px solid #bbbbdd;\
  max-width:500px;\
  position:fixed;\
  top:2px;\
  right:2px;\
  padding:2px 2px 2px 2px;\
  "></div>';
body.innerHTML+=infobox;
if(displayBTCUSD=='y'){
  body.innerHTML+='<div id="pricediv" style="position:fixed;top:0px;left:0px;right:0px;width:200px;margin-right:auto;margin-left:auto;background-color:#E5E5F3;text-align:center;border:solid 1px #333399;font-weight:bold;padding:2px;">Contacting ticker...</div>';
}

function changePriceDiv(a){
    document.getElementById('pricediv').innerHTML=a;
}

function currToSymbol(c){
    if(c=='EUR'){
        return Array('',' &euro;');
    }
    else if(c=='USD'){
        return Array('$','');
    }
    else{
        return Array('',' '+c);
    }
}

function callbackTicker(r){
    var c=btcusdCurrency;
    var s=btcusdSource;
    var symbol=currToSymbol(c);
    var data;
    
	eval("data="+r.responseText+';');
    if(s=='btcavg'){
        changePriceDiv('BTCaverage: '+symbol[0]+data[c]['averages']['last']+symbol[1]);
        document.getElementById('pricediv').style.width='180px';
    }else if(s=='btcavgnogox'){
        changePriceDiv('BTCaverage: '+symbol[0]+data[c]['last']+symbol[1]);
        document.getElementById('pricediv').style.width='180px';
    }else if(s=='btce'){
        changePriceDiv('BTC-e: '+symbol[0]+data['ticker']['last']+symbol[1]);
        document.getElementById('pricediv').style.width='150px';
    }else if(s=='stamp'){
        changePriceDiv('Bitstamp: '+symbol[0]+data['ask']+symbol[1]);
        document.getElementById('pricediv').style.width='130px';
    }else if(s=='bitonic'){
        changePriceDiv('Bitonic: '+symbol[0]+data['euros_formatted']+symbol[1]);
        document.getElementById('pricediv').style.width='130px';
    }else{
        if(data['result']=='error'){changePriceDiv('MtGox: Error');}
        changePriceDiv('MtGox: '+data['return']['last_all']['display']);
        document.getElementById('pricediv').style.width='130px';
    }
    if(website=='DB'){
      document.getElementById('pricediv').style.fontSize='80%';
      document.getElementById('pricediv').style.color='black';
    }

}

function priceSourceToURL(s, curr){
    if(s=='btcavg'){
        return 'http://api.bitcoinaverage.com/all';
    }else if(s=='btcavgnogox'){
        return 'http://api.bitcoinaverage.com/no-mtgox/ticker/all';
    }else if(s=='btce'){
        return 'https://btc-e.com/api/2/btc_'+curr.toLowerCase()+'/ticker';
    }else if(s=='stamp'){
        return 'https://www.bitstamp.net/api/ticker/';
    }else if(s=='bitonic'){
        return 'https://bitonic.nl/json/sell?part=offer&check=btc&btc=1';
    }else{
        return 'https://data.mtgox.com/api/1/BTC'+curr+'/ticker';
    }
}

if(displayBTCUSD=='y'){
    var ticker = priceSourceToURL(btcusdSource, btcusdCurrency);

    getPage(ticker, callbackTicker, 0);
    setInterval(
        function(){
            getPage(ticker, callbackTicker, 0);
        }
        ,BTCUSDrefresh*1000);
}


if(website=='DB'){
    gebi('nav').innerHTML=gebi('nav').innerHTML.replace(
      /<li><a href="https:\/\/discussbitcoin.org">Home<\/a><\/li>/g,
      '$&<li><a href="https://discussbitcoin.org/btppconf.php?user='+myPseudo+'">DB++ settings</a></li>'
    );
    return;
}

body.innerHTML=body.innerHTML.replace(
  /class="([^"]*)"([^>]*)>((?:.|\n|\r|\t){0,15})<div class\="signature sig([^"]*)">/g,
  'class="$1 sig_bar_$4"$2><div class="signature sig$4">'
);

body.innerHTML=body.innerHTML.replace(
  /<a([^<>]*) name="([^"]*)"><\/a>/g,
  '<span id="repairednew_$2">$&</span>'
);
if(document.location.href.split('#').length>1){
    var anchorname=document.location.href.split('#')[1];
    if(gebi('repairednew_'+anchorname)){setTimeout(function(){gebi('repairednew_'+anchorname).scrollIntoView(true);},200);}
}

body.innerHTML=body.innerHTML.replace(
//  /([0-9]*)"><([^>]*?)"View Profile" border="0" \/>/g,
  /([0-9]*)"><([^<]*)View Profile" border="0"(.{0,2})><\/a>/g,
  '$& <a href="https://bitcointalk.org/index.php?action=profile;u=$1;sa=showPosts"><img src="http://btpp.jampa.eu/images/viewposts.png" alt="View Posts" title="View Posts" /></a></a>'
);

//   Make address links
if(formatAddresses=='y' && document.location.href.split('sa=forumProfil').length==1){
    body.innerHTML=body.innerHTML.replace(
      /([^0-9a-zA-Z:\/>])(1[1-9A-HJ-Za-km-z]{25,33})([^0-9a-zA-Z"])/g,
      '$1<a href="https://blockchain.info/address/$2">$2</a>$3'
    );
}

if(formatTransactions=='y'){
    body.innerHTML=body.innerHTML.replace(
      /tx:([0-9a-fA-F]{64})/g,
      '<a href="https://blockchain.info/tx/$1">$1</a>'
    );
}


if(DisplayBTPPAd_2=='y'){
    body.innerHTML=body.innerHTML.replace(
        /<b>Advertisement: <\/b>/g,
        '<span id="btppadv2"></span><br />$&'
    );
}
if(DisplayBTPPAd_3=='y'){
    gebi('upshrinkHeader').innerHTML=gebi('upshrinkHeader').innerHTML.replace(
        /<\/tr>/g,
        '<td id="btppadv3" style="display:none;background-color:rgb(246, 246, 246);"></td>$&'
    );
}

body.innerHTML=body.innerHTML.replace(
  /action=ignore;u=([^;]*?);topic=(?:[^;]*?);msg=(?:[^;]*?);sesc=(?:[^;]*?)">Ignore<\/a>/g,
  '$&\
  <br /><span class="addnote fakelink hidden" style="" cible="$1">Add note</span>\
  <br /><span class="togglesig fakelink hidden" style="" cible="$1">Toggle signature</span>\
  <br /><span class="reportscammerlink fakelink hidden" style="position:relative;top:5px;" cible="$1" nomcible="">Report suspicious account<span class="postreportscammerlink" cible="$1"></span></span>\
  '
);


if(goToLastReadPost=='y'){
    body.innerHTML=body.innerHTML.replace(
      /<tr((?:.|\n)*?)<span id="msg_([0-9]*)"><a href="https:\/\/bitcointalk.org\/index.php\?topic=([0-9]*).0">/g,
      '<tr class="threadlink" tid="$3" id="threadrow_$3" $1<span id="msg_$2"><a href="https://bitcointalk.org/index.php?topic=$3.new;topicseen#new" threadid="$3">'
    );
    body.innerHTML=body.innerHTML.replace(
      /<a href="https:\/\/bitcointalk.org\/index.php\?topic=([0-9]{0,10}).0;topicseen">/g,
      '<a href="https://bitcointalk.org/index.php?topic=$1.new;topicseen#new">'
    );
}


var PMpage=(body.innerHTML.indexOf('Bcc:')>-1);
if(PMpage){
    if(document.getElementById('message')){
//        document.getElementById('message').innerHTML+=''+presetPM.replace(/\\n/g,'\n');
        if(presetPM!='')body.innerHTML=body.innerHTML.replace(
          /<tr>\n\t\t\t\t<td(?:.{0,30})td>\n\t\t\t\t<td>\n\t\t\t\t\t<textarea/g,
          '<tr><td align="right"></td><td valign="middle"><a href="javascript:void(0);" onclick="document.getElementById(\'message\').value+=\''+presetPM+'\';">Add your signature</tr>$&'
        );
    }
}

if(threadview){
    if(document.forms.postmodify){
        document.forms.postmodify.innerHTML=smileys+document.forms.postmodify.innerHTML;
        if(document.forms.postmodify.elements['message'].innerHTML==''){
            document.forms.postmodify.elements['message'].innerHTML=presetPost;
        }
    }
}

popcornicon='';
if(showPopcornIcon=='y'){popcornicon='<a href="javascript:void(0);" onclick="surroundText(\'[img]http://btpp.jampa.eu/images/popcorn.gif[/img]\', \'\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="http://btpp.jampa.eu/images/popcorn_icon.gif" align="bottom" width="23" height="22" alt="Insert popcorn image" title="Insert popcorn image" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a>';}
body.innerHTML=body.innerHTML.replace(
    /<a href="javascript:void\(0\);" onclick="surroundText\('\[url\]/g,
    '\
<a href="javascript:void(0);" onclick="surroundText(\'[url=http://lmgtfy.com/?q=\', \']LMGTFY[/url]\', document.forms.postmodify.message); return false;"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="http://btpp.jampa.eu/images/LMGTFY.png" align="bottom" width="23" height="22" alt="Insert LMGTFY link" title="Insert LMGTFY link" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a>\
<a href="javascript:void(0);" class="addBackedupTI"><img onmouseover="bbc_highlight(this, true);" onmouseout="if (window.bbc_highlight) bbc_highlight(this, false);" src="http://btpp.jampa.eu/images/DTR.png" align="bottom" width="23" height="22" alt="Insert resurrected message" title="Insert resurrected message" style="background-image: url(https://bitcointalk.org/Themes/custom1/images/bbc/bbc_bg.gif); margin: 1px 2px 1px 1px;" /></a>\
'+popcornicon+'$&'
);


body.innerHTML=body.innerHTML.replace(
        /<textarea class="editor" name="message"/g,
      'Upload image: <input name="uploadedfile" id="uploadedfile" type="file" />\
<input type="button" id="uploadimgsubmit" value="Upload" /><span id="listofuploadedpics"></span>\
</td></tr><tr><td valign="top" align="right"></td><td>$&');
body.innerHTML=body.innerHTML.replace(
        /<textarea cols=/g,
      '<br />Upload image: <input name="uploadedfile" id="uploadedfile" type="file" />\
<input type="button" id="uploadimgsubmit" value="Upload" /><span id="listofuploadedpics"></span>\
$&');

function renameEnableUploadButton(txt,enable){
    var uis=document.getElementById('uploadimgsubmit');
    uis.value=txt;
    if(enable==-1){uis.disabled='disabled';}
    else if(enable==1){uis.disabled=false;}
}

var uploadImage = function(e) {
    renameEnableUploadButton('Uploading...', -1);
    var f=document.getElementById('uploadedfile').files[0];
    if(f==undefined){return;}
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
          if(theFile.size>10000000){return;}
          var res=e.target.result;
          var filename=escape(theFile.name);
          var content=encodeURIComponent(res);  
            getPageWithData(server+'/uploadpic.php', 
                function(r){
                	if(r.responseText.length<5){renameEnableUploadButton('Image uploading broken', 1);return;}
                    var d;
                    d=JSON.parse(r.responseText);
                	var err=d['error'];
                	if(err=='none'){
                    	var txt='<a href="javascript:void(0);" onclick="replaceText(\'[img]'+d['link']+'[/img]\', document.forms.postmodify.message); return false;">Insert "'+filename+'"</a>';
                        document.getElementById("listofuploadedpics").innerHTML+='<br />'+txt;
                        renameEnableUploadButton('Upload', 1);
                    }else if(err=='badpw'){renameEnableUploadButton('Bad Password', -1);}
                    else{renameEnableUploadButton(err, d['disableButton']);}
                }
                ,0,'serv='+servImageUpload+'&anon='+anonImageUpload+'&pseudo='+myPseudo+'&pass='+myPassword+'&fname='+filename+'&v='+content, 'POST'
            );
        };
      })(f);
      reader.readAsDataURL(f);
}


body.innerHTML = 
body.innerHTML.replace(
    /<a href="https:\/\/bitcointalk.org\/index.php\?action=help">Help<\/a>/g,
    '<a href="https://bitcointalk.org/btppconf.php?user='+myPseudo+'"><span title="'+version+'" id="btpp_settings">BT++ settings</span></a><a href="https://bitcointalk.org/index.php?topic=264337.new;topicseen#new"><span id="needupdate" title="BT++ is not up-to-date">'+GM_getValue('lastversion','')+'</span></a>\
    </td><td valign="top" class="maintab_back">$&'
);

if(displayAutoRefresh=='y'){
    body.innerHTML = 
    body.innerHTML.replace(
        /<a href="https:\/\/bitcointalk.org\/index.php\?action=mlist">Members<\/a>/g,
        '$&</td><td valign="top" class="maintab_back"><span class="fakelink navbarlink white" id="toggleautorefresh">Toggle auto-refresh</span>'
    );
}

if(displayToggleChat=='y'){
    body.innerHTML = 
    body.innerHTML.replace(
        /<a href="https:\/\/bitcointalk.org\/index.php\?action=mlist">Members<\/a>/g,
        '$&</td><td valign="top" class="maintab_back"><span class="fakelink navbarlink white" id="togglechatbutton">Toggle chat</span>'
    );
}

var meanLVRefresh=5;
if(myPseudo=='jackjack' && version[version.length-1]=='b'){
    document.getElementById('needupdate').innerHTML='';
}else{
    if(Math.random()<1.0/meanLVRefresh || GM_getValue('myversion','')!=version){
/*        getPage(server+'/lastversion.php?v='+version, 
            function(r){
                if(r.responseText!=version){
                    GM_setValue('lastversion','*');
                }else{
                    GM_setValue('lastversion','');
                }
                document.getElementById('needupdate').innerHTML=GM_getValue('lastversion','');
            }*/
        getPage(updatefile, 
            function(r){
//                var lv=r.responseText.split("version='")[2].split("'")[0];
                var lv=r.responseText;
                if(lv!=version){
                    GM_setValue('lastversion','*');
                }else{
                    GM_setValue('lastversion','');
                }
                document.getElementById('needupdate').innerHTML=GM_getValue('lastversion','');
            }
            ,0
        );
    }
}
GM_setValue('myversion',version);

//   Add partial quote buttons
function pqbf(s){
    var u=s.getAttribute('user');
    var t=s.getAttribute('thread');
    var p=s.getAttribute('post');

    var start='[quote author='+u+' link=topic='+t+'.msg'+p+'#msg'+p+' date=0]';
    var end='[/quote]';
    if(document.forms.postmodify){document.forms.postmodify.elements['message'].value+=start+getSelectionHtml()+end+'\n';}
}

function makepqbf(s){
    return function(){pqbf(s);};
}

body.innerHTML=body.innerHTML.replace(
  /View the profile of ([^"]*?)"(?:(.|\n)*?)<a href="(?:.*?)quote=(.*?);topic=(.*?)\.(.*?)" (.*?)><(.*?)alt="Reply with quote"(.*?)><\/a>/g,
  '$&&nbsp;<a href="javascript:void(0);"><span class="partialquotebutton" user="$1" thread="$4" post="$3"><img src="http://btpp.jampa.eu/images/partialquote.png" /></span></a>'
);

var re = new RegExp('\n.*(<a.*Mark ALL messages as read<\/a>).*\n', "g");
var rexec = re.exec(body.innerHTML);
var markasread='';
var decalageMAR='0px';
if(rexec!=null){
    decalageMAR='20px';
    markasread='<span class="maintab_back" style="float:right;position:relative;bottom:'+decalageMAR+';">'+rexec[1]+'</span><br />';
}
body.innerHTML = body.innerHTML.replace(
  /<br.*\n\t<div class="tborder".*\n\t\t<div class="catbg"/g,
  '<span id="additionalforums" style="position:relative;bottom:'+decalageMAR+';"></span><span id="markasread"></span><br /><div class="tborder"><div class="catbg"'
);
if(gebi('additionalforums')){
    body.innerHTML = body.innerHTML.replace(/<a.*Mark ALL messages as read<\/a>/g,'');
    body.innerHTML = body.innerHTML.replace(/<img.*> New Posts\n.*No New Posts/g,'');
    gebi('markasread').innerHTML=markasread;
}

function votingURL(no,val,nom){
    var url=server+'/'+votePage+'?pseudo='+myPseudo+'&pass='+myPassword+'&cible='+no+'&nomcible='+nom+'&score='+val+'&uid='+myUID
    return url;
}

function bouton(text,color,val){
    var r="<a class='boutonvote scoreAB"+(val>0?'P':'M')+"_$1' nom='$2' val="+val+" no=$1 onClick='return;' style='cursor:pointer;color:#bbbbbb;'>"+text+"</a>";
    return r;
}

var boutonPlus=bouton(symbolPlusOne,colorPlusOne,1);
var boutonMoins=bouton(symbolMinusOne,colorMinusOne,-1);

var jjsep='JJ##SEP';
var listPseudos=new Array();
var listPseudosNos=new Array();
var headers = document.getElementsByTagName('td');
beforescore='';
if(newlineBeforeScore=='y'){
    beforescore='<br />';
}
fontweightbuttons='normal';
if(buttonsInBold=='y'){
    fontweightbuttons='bold';
}

var tl=GM_getValue('trustlist','').split('#');

var votebuttons='<span style="color:'+colorBorderPM+';">['+boutonPlus+'&nbsp;'+boutonMoins+']</span>';
votebuttons='<div class="divboutonvote" style="position:relative;top:2px;right:1px;margin-right:3px;display:inline-block;font-size:50%;font-weight:'+fontweightbuttons+';color:'+colorBorderPM+';">'+boutonPlus+'<br />'+boutonMoins+'</div>';

var notesspan='<span class="notesspan" userid="$1" username="$2" title="" style="display:none;"><img style="position:relative;bottom:4px;" src="http://btpp.jampa.eu/images/info.png" width=10 /></span>';
var scorespan='';//'<span style="font-weight:normal;">[</span><span class="score_$1"></span><span style="font-weight:normal;">]</span>';
var newscorespan='<span class="scoreAB_$1" style="white-space:nowrap;border-radius:2px;padding:0 2px 0 2px;font-weight:90%;background-color:#ddddff;">'+votebuttons+'<span class="score_$1"></span></span>';
scorespan=newscorespan;

for (i=0; i<headers.length; i++)
{
  var scoreandbuttons='<div class="scoreandbuttons" style="display:none;">&nbsp; '+scorespan+'</div>';
  var scoreandbuttonsnonbsp='<div class="scoreandbuttons" style="display:none;">'+scorespan+'</div>';
  var thismenu = headers[i].innerHTML;
  var tm = thismenu.replace(
    /<a href="https:\/\/bitcointalk.org\/index\.php\?action=profile;u=([^>]*)" title=[^>]*>([^<]*)<\/a><\/b>/g,
    jjsep+'$1'+jjsep+'$2'+jjsep+'<a class="accountnamelink" userid="$1" href="index.php?action=profile;u=$1" title="" username="$2">$2</a></b>'+notesspan+beforescore+scoreandbuttons+'<span class="tag_$1"></span>'
  );
  if(tm.indexOf(jjsep)==-1){
      tm = thismenu.replace(
        /<a href="https:\/\/bitcointalk.org\/index\.php\?action=profile;u=([^>]*)" title=[^>]*>([^<]*)<\/a>/g,
        jjsep+'$1'+jjsep+'$2'+jjsep+'<a class="accountnamelink" userid="$1" href="index.php?action=profile;u=$1" title="" username="$2">$2</a>'+notesspan+scoreandbuttons+''
      );
  }
  if(tm.indexOf(jjsep)==-1){
      tm = thismenu.replace(
        /<b><a href="https:\/\/bitcointalk.org\/index\.php\?action=trust;u=([^>]*)">Trust<\/a>:/g,
        jjsep+'$1'+jjsep+''+jjsep+'<b>BitcoinTalk++ trust:</b></td><td>'+scoreandbuttonsnonbsp.replace(/\$2/g,'UserID=$1')+'</td></tr><tr><td><b><a class="accountnamelink" username="" userid="$1" href="https://bitcointalk.org/index.php?action=trust;u=$1" title="">Trust</a>:'+''
      );
    }  
  
  if(tm.indexOf(jjsep)==-1){continue;}
  
  tm = tm.split(jjsep);

  var tm2 = tm[0];
  for (j=0; j<(tm.length-1)/3; j++){
    listPseudosNos.push(tm[3*j+1]);
    listPseudos.push(tm[3*j+2]);
    tm2 += tm[3*j+3];
  }

  headers[i].innerHTML=tm2;

}

var anl=document.getElementsByClassName('accountnamelink');
for(i=0;i<anl.length;i++){
    an=anl[i];
    un=an.getAttribute('username');
    if(tl.indexOf(un)>-1){
        an.innerHTML='<span title="User in your trust list">&#10004;&nbsp;&nbsp;'+an.innerHTML+'</span>';
    }
}

function makeFctDisplayTransp(i,dt,steps){
    return function (){
      changeTransp('infobox', 1.0-1.0*i/steps);
    }
}

function displayInfobox(tsec,dt){  //dt in ms
  changeTransp('infobox', 1.0);
  t=1000.0*tsec;
  steps=t/dt;
  for(i=1;i<=steps;i++){
    setTimeout(makeFctDisplayTransp(i,dt,steps),dt*i);
  }
}


function callbackVoted(r){
  if(r.responseText=='Error: Bad password'){
    changeinnerHTML('infobox',r.responseText);
    displayInfobox(20,50);
  }else{
    changeinnerHTML('infobox',r.responseText);
    displayInfobox(5,50);
  }
}

function makeCallbackChangenote(user,uid,ns){
    return function(){
        var oldnote='nothing';
        if(ns.title!=''){oldnote='"'+ns.title+'"';}
        var z=prompt('Type the new note for '+user+'.\nThe previous one was: '+oldnote+'.\nLeave blank to delete the note.');
        if(z==null){return;}
        var page=server+'/changenote.php?pseudo='+myPseudo+'&pass='+myPassword+'&t='+uid+'&nnote='+z+'&uid='+myUID;
        getPage(page, function(r){},0); 

        var notesspans = document.getElementsByClassName('notesspan');
        for (i=0; i<notesspans.length; i++)
        {
            ns=notesspans[i];
            var nsuid=ns.getAttribute('userid');
            if(nsuid==rsl.getAttribute('cible')){
                ns.title=z;
                if(z==''){ns.style.display='none';}
            }
        }
    }
}

function callbackToggleSig(r){
    var d={};
    try{
        d=JSON.parse(r.responseText);
    }catch(e){
        return;
    }
    if(d['error']!='none'){return;}
    if(d['badpw']==1){mapCN(function(r){r.style.display='none';},'divboutonvote',0);}
    var dd=d['data'];
    for(uid in dd){
        var show='inline';
        if(dd[uid]==1){show='none';}
        var rsls = document.getElementsByClassName('signature sig'+uid);
        var rsls_sb = document.getElementsByClassName('sig_bar_'+uid);
        for (i=0; i<rsls.length; i++)
        {
            rsl=rsls[i];
            sb=rsls_sb[i];
            rsl.style.display=show;
            sb.style.display=(show=='inline'?'block':'none');
        }
    }

    var dss = d['scamscores'];
    var rslp = document.getElementsByClassName('postreportscammerlink');
    for (i=0; i<rslp.length; i++)
    {
        rsl=rslp[i];
        var rslcible=rsl.getAttribute('cible');
        if(rslcible in dss){
            rsl.innerHTML=' (<span style="font-weight:bold;color:red;">'+dss[rslcible]+'</span>)';
        }else{
            rsl.innerHTML='';
        }
    }
    
    var dun = d['usernotes'];
    var notesspans = document.getElementsByClassName('notesspan');
    for (i=0; i<notesspans.length; i++)
    {
        ns=notesspans[i];
        var nsuid=ns.getAttribute('userid');
        var nsun=ns.getAttribute('username');
        var displayednote='nothing';
        ns.title='';
        if(nsuid in dun){
            ns.title=dun[nsuid];
            ns.style.display='inline';
            displayednote='"'+dun[nsuid]+'"'

            var rsls = document.getElementsByClassName('addnote');
            for (j=0; j<rsls.length; j++)
            {
                rs=rsls[j];
                if(nsuid==rs.getAttribute('cible')){rs.innerHTML=(dun[nsuid]=='')?'Add note':'Remove note';}
            }
        }
        ns.setAttribute('ready','yes');
        ns.addEventListener('click',makeCallbackChangenote(nsun,nsuid,ns), false);
    }
    if('scores' in d){
        for(uid in d['scores']){handleScoreAnswer(JSON.stringify(d['scores'][uid]),uid);displayServerDependantFields(1);}
    }

}

function makeFuncGP(noz,valz,nomz){
  return function(){ 
    getPage(votingURL(noz,valz,nomz), callbackVoted,0); 
    setTimeout(function(){
        var page=server+'/sigfilter.php?pseudo='+myPseudo+'&pass='+myPassword+'&cmd=query&usersinpage='+noz+'&uid='+myUID+'&client=official&clientversion='+version+'';
        getPage(page, callbackToggleSig,0); 
        /*writeScoresGetPage(
            server+'/'+notePage+'?json=1&client=official&clientversion='+version+'&pseudo='+nomz+'&no='+noz+'&p='+myPseudo+'&uid='+myUID,
            noz
        );*/
    },2000);
  }
}


changeTransp('infobox', 0.0);
changeinnerHTML('infobox','');


function makeFuncRSL(c){
  return function(){
    if(!confirm('Are you sure you want to report this user?')){return;}
    page=server+'/reportscammer.php?pseudo='+myPseudo+'&pass='+myPassword+'&cible='+c+'&nomcible='+'&uid='+myUID;
    getPage(page, callbackVoted,0); 
  }
}

var rsls = document.getElementsByClassName('reportscammerlink');
for (i=0; i<rsls.length; i++)
{
    rsl=rsls[i];
    rsl.addEventListener('click',makeFuncRSL(rsl.getAttribute('cible')), false);
}

function makeFuncHideSig(c){
  return function(){ 
    page=server+'/sigfilter.php?pseudo='+myPseudo+'&pass='+myPassword+'&t='+c+'&cmd=toggle'+'&uid='+myUID+'&client=official&clientversion='+version+'';
//    alert(page);
    getPage(page, callbackToggleSig,0); 
  }
}

var rsls = document.getElementsByClassName('togglesig');
for (i=0; i<rsls.length; i++)
{
    rsl=rsls[i];
    rsl.addEventListener('click',makeFuncHideSig(rsl.getAttribute('cible')), false);
}

function makeCallbackAddnote(rsl){
    return function(){
        var notesspans = document.getElementsByClassName('notesspan');
        for (i=0; i<notesspans.length; i++)
        {
            ns=notesspans[i];
            var nsuid=ns.getAttribute('userid');
            if(nsuid==rsl.getAttribute('cible')){
                var displayed=(ns.style.display!='none');
                if(ns.getAttribute('ready')!='yes'){alert('Server not connected yet');break;}
                ns.style.display=displayed?'none':'inline';
                var alreadyerased=0;
                if(displayed && !alreadyerased){
                    var page=server+'/changenote.php?pseudo='+myPseudo+'&pass='+myPassword+'&t='+nsuid+'&nnote=&uid='+myUID;
                    getPage(page, function(r){},0);
                    alreadyerased=1;
                }
            }
            var rsls = document.getElementsByClassName('addnote');
            for (j=0; j<rsls.length; j++)
            {
                rs=rsls[j];
                if(nsuid==rs.getAttribute('cible')){rs.innerHTML=displayed?'Add note':'Remove note';}
            }
        }
    }
}

var rsls = document.getElementsByClassName('addnote');
for (i=0; i<rsls.length; i++)
{
    rsl=rsls[i];
    rsl.addEventListener('click',makeCallbackAddnote(rsl), false);
}

var headers = document.getElementsByClassName('boutonvote');
for (i=0; i<headers.length; i++)
{
    var hi=headers[i];
    noz=hi.getAttribute('no');
    nomz=hi.getAttribute('nom');
    valz=hi.getAttribute('val');
    hi.addEventListener('click',makeFuncGP(noz,valz,nomz), false);
}

var pqb = document.getElementsByClassName('partialquotebutton');
for(i=0;i<pqb.length;i++){
    var p=pqb[i];
    p.addEventListener('click',makepqbf(p), false);
}

var serpseudonos='';

for (i=0; i<listPseudosNos.length; i++)
{
    pseudono=listPseudosNos[i];
    serpseudonos+=pseudono+'-';
/*    writeScoresGetPage(
        server+'/'+notePage+'?json=1&client=official&clientversion='+version+'&pseudo='+listPseudos[i]+'&no='+listPseudosNos[i]+'&p='+myPseudo,
        pseudono
    );
*/
}

var element = window.document.getElementById("uploadimgsubmit");
if(element && element.addEventListener){
    element.addEventListener("click", uploadImage, false);
}

getPage(server+'/sigfilter.php?pseudo='+myPseudo+'&pass='+myPassword+'&cmd=query&usersinpage='+serpseudonos+'&uid='+myUID+'&client=official&clientversion='+version+'', callbackToggleSig,0); 

function boardRow(boardname,boardlink,nposts,ntopics,lastposter,linkposter,lastpost,linktopic,lastpostdate,unreadposts,mods){
    var r='<tr><td class="windowbg" align="center" valign="top" width="6%">';
    if(unreadposts){
        r+='<img src="https://bitcointalk.org/Themes/custom1/images/on.gif" alt="New Posts" title="New Posts" />';
    }else{
        r+='<img src="https://bitcointalk.org/Themes/custom1/images/off.gif" alt="No New Posts" title="No New Posts" />';
    }
    r+='</td><td class="windowbg2"><b><a href="'+boardlink+'" name="b27">'+boardname+'</a></b>';
    if(mods!=''){
        r+='<br /><div style="padding-top: 1px;" class="smalltext"><i>Moderators: '+mods+'</i></div>';
    }
    r+='</td><td class="windowbg" valign="middle" align="center" style="width: 12ex;"><span class="smalltext">\
        '+nposts+' Posts <br />\
        '+ntopics+' Topics</span></td><td class="windowbg2" valign="middle" width="22%">';
    if(nposts!='0'){
        r+='<span class="smalltext"><b>Last post</b>  by \
            <a href="'+linkposter+'">'+lastposter+'</a><br />\
            in <a href="'+linktopic+'" title="'+lastpost+'">'+lastpost+'</a><br />\
            on '+lastpostdate+'</span>';
    }else{
        r+='<span class="smalltext">No post yet</span>';
    }
    r+='</td></tr>';
    return r;
}

function subforumTable(name,link,rows){
    var imgcol='https://bitcointalk.org/Themes/custom1/images/collapse.gif';
    var imgexp='https://bitcointalk.org/Themes/custom1/images/expand.gif';
    var gebibuttonsrc='document.getElementById(\'btpptable'+name+'collapsebutton\').src';
    var r='<div class="tborder" style="margin-top: 1ex;"><div class="catbg" style="padding: 5px 5px 5px 10px;">\
<span onclick="'+gebibuttonsrc+'=('+gebibuttonsrc+'==\''+imgcol+'\'?\''+imgexp+'\':\''+imgcol+'\');document.getElementById(\'btpptable'+name+'\').style.display=(document.getElementById(\'btpptable'+name+'\').style.display==\'table\'?\'none\':\'table\');">\
<img style="cursor:pointer;" id="btpptable'+name+'collapsebutton" src="'+imgcol+'" /></span> <a name="5" href="'+link+'">'+name+'</a></div>\
<table id="btpptable'+name+'" border="0" width="100%" cellspacing="1" cellpadding="5" class="bordercolor" style="display:table;margin-top: 1px;">'+rows+'</table>\
</div>';
    return r;
}

function parseDBinBT(i,d){
    if(i==0){return d.indexOf('ontains New Posts');}
    if(i==1){return d.split('a href="')[1].split('"')[0]+'\n'+d.split('a href="')[1].split('">')[1].split('<')[0];}
    if(i==2){return d.split('largetext">')[1].split('<')[0];}
    if(i==3){return d.split('largetext">')[1].split('<')[0];}
    if(i==4){
        if(d.split('a href="').length==1){return 'none';}
        var a=d.split('a href="')[1].split('"')[0];
        var b=d.split('<strong>')[1].split('<')[0];
        var c=d.split('<br />')[1].split('<')[0];
        var dd=d.split('a href="')[2].split('"')[0];
        var e=d.split('a href="')[2].split('>')[1].split('<')[0];
        return a+'\n'+b+'\n'+c+'\n'+dd+'\n'+e;
    }
}

function DBinBT(p){
    var re = new RegExp('<tbody((.|\n|\r)*?)</tbody>','g');
    var resp = p.responseText;
    result = re.exec(resp);
    var boards='';
    while(result != null){
        var sf=result[1];
        var re2 = new RegExp('<tr((.|\n|\r)*?)</tr>','g');
        result2 = re2.exec(sf);
        while(result2 != null){
            var d=result2[1];
            var re3 = new RegExp('<td((.|\n|\r)*?)</td>','g');
            var rezline={};
            var cpt=0;
            if(d.indexOf("trow")>-1){
                result3 = re3.exec(d);
                while(result3 != null){
                    rezline[cpt]=parseDBinBT(cpt,result3[1]);
                    cpt++;
                    result3 = re3.exec(d);
                }
            }
            if(rezline['1']!=undefined){
                var unreadposts=(rezline['0']>-1);
                var linkboard='https://discussbitcoin.org/'+rezline['1'].split('\n')[0];
                var nameboard=rezline['1'].split('\n')[1];
                var ntopics=rezline['2'];
                var nposts=rezline['3'];
                linkpost=title=date=posterlink=postername='';
                if(rezline['4']!='none'){
                    linkpost='https://discussbitcoin.org/'+rezline['4'].split('\n')[0];
                    title=rezline['4'].split('\n')[1];
                    date=rezline['4'].split('\n')[2];
                    posterlink=rezline['4'].split('\n')[3];
                    postername=rezline['4'].split('\n')[4];
                }
                boards+=boardRow(nameboard,linkboard,nposts,ntopics,postername,posterlink,title,linkpost,date,unreadposts,'');
            }
            result2 = re2.exec(sf);
        }
        result = re.exec(resp);
    }
    additionalsubforumrows=boards;
    additionalsubforum=subforumTable('DiscussBitcoin', 'https://discussbitcoin.org/',additionalsubforumrows);
    if(gebi('additionalforums')){
        gebi('additionalforums').innerHTML=additionalsubforum;
    }
}

if(DBindexinBT=='y'){
    getPage('https://discussbitcoin.org/', DBinBT,0);
}


timebeforerefresh=Number(TimeBetweenURAU);
if(GM_getValue('autorefresh_running','')==''){
    GM_setValue('autorefresh_running','n');
}

function getMousePosition(event,usescroll){
	var e = event || window.event;
	var scroll = new Array((document.documentElement && document.documentElement.scrollLeft) || window.pageXOffset || self.pageXOffset || document.body.scrollLeft,(document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || self.pageYOffset || document.body.scrollTop);
	var scrollX=usescroll?scroll[0]:0;
	var scrollY=usescroll?scroll[1]:0;
	return new Array(e.clientX + scrollX - document.body.clientLeft,e.clientY + scrollY - document.body.clientTop);
}

function togglerefresh(){
    if(GM_getValue('autorefresh_running','')=='y' || timebeforerefresh==0){
        GM_setValue('autorefresh_running','n');
        cdr.style.display='none';
    }else{
        GM_setValue('autorefresh_running','y');
        refreshcountdown();
        location.reload();
    }
}

function refreshcountdown(){
    if(timebeforerefresh>0){
        if(GM_getValue('autorefresh_running','')=='y'){
            changeinnerHTML('refreshcountdown',timebeforerefresh);
            setTimeout(refreshcountdown,1000);
        }else{changeinnerHTML('refreshcountdown','');}
    }else{
        changeinnerHTML('refreshcountdown','');
        location.reload();
    }
    timebeforerefresh-=1;
}

cdr=gebi('refreshcountdown');
cdr.style.left=(GM_getValue('lastmouseX',0)+10)+'px';
cdr.style.top=(GM_getValue('lastmouseY',0)+10)+'px';
if(GM_getValue('autorefresh_running','')=='y'){
    window.onkeypress = function(){
    	timebeforerefresh=Number(TimeBetweenURAU);
        changeinnerHTML('refreshcountdown',timebeforerefresh);
    }
    refreshcountdown();
}

window.onmousemove = function(event){
	var mpws = getMousePosition(event,true);
	var mpns = getMousePosition(event,false);
    chat_div=gebi('bitcoinchat');
    if(GM_getValue('autorefresh_running','')=='y'){
    	timebeforerefresh=Number(TimeBetweenURAU);
        changeinnerHTML('refreshcountdown',timebeforerefresh);
    	cdr.style.left=(mpws[0]+10)+'px';
        cdr.style.top=(mpws[1]+10)+'px';
        GM_setValue('lastmouseX',mpws[0]);
        GM_setValue('lastmouseY',mpws[1]);
    }
    if(movechatbox){
        chat_div.style.right=(getWidth()-mpns[0]-chatboxoldXR+oldrightcb)+'px';
        chat_div.style.top=(mpns[1]-chatboxoldY+oldtopcb)+'px';
        GM_setValue('chatcoordright',chat_div.style.right);
        GM_setValue('chatcoordtop',chat_div.style.top);
    }
};


tar=document.getElementById('toggleautorefresh');
if(tar){tar.addEventListener('click',togglerefresh,false);}

tc=document.getElementById('togglechatbutton');
if(tc){tc.addEventListener('click',function(){
    if(chat_div){
        if(chat_div.style.display!='none'){
            chat_div.style.display='none';
            chathidebutton.state='off';
            GM_setValue('displaychat','n');
        }else{
            GM_setValue('displaychat','y');
            if(!runchatlaunched){
                runChat();
            }else{
                chat_div.style.display='block';
                chathidebutton.state='on';
            }
        }
    }
},false);}


if(DisplayBTPPAd_1=='y'){
    var iframe = document.createElement('iframe');
    iframe.frameBorder = 0;
    iframe.width = "468px";
    iframe.height = "65px";
    iframe.id = "iframebitads";
//    iframe.src = "https://bitads.net/gimg.php?id=1048";
    iframe.setAttribute('data-aa','8891');
    iframe.src = 'https://ad.a-ads.com/8891?size=468x60';
    iframe.style = "z-index:10;position:fixed;border:solid 1px black;bottom:0px;left:0px;right:0px;width:468px;margin-right:auto;margin-left:auto;background-color:white;";
    body.appendChild(iframe);
}

if(DisplayBTPPAd_2=='y' && gebi('btppadv2')){
    var iframe2 = document.createElement('iframe');
    iframe2.frameBorder = 0;
    iframe2.width = "0px";
    iframe2.height = "0px";
    iframe2.id = "iframebitads2";
//    iframe2.src = "https://bitads.net/gimg.php?id=1050";
    iframe2.setAttribute('data-aa','8890');
    iframe2.src = 'https://ad.a-ads.com/8890?size=468x60';
    iframe2.onload = function(){
        iframe2.width = "468px";
        iframe2.height = "60px";
        gebi('btppadv2').innerHTML='<b>BT++ advertisement: </b>'+gebi('btppadv2').innerHTML;
    };
    gebi('btppadv2').appendChild(iframe2);
}

if(DisplayBTPPAd_3=='y' && gebi('btppadv3')){
    var iframe3 = document.createElement('iframe');
    iframe3.frameBorder = 0;
    iframe3.width = "729px";
    iframe3.height = "95px";
    iframe3.id = "iframebitads3";
//    iframe3.src = "https://bitads.net/gimg.php?id=1051";
    iframe3.setAttribute('data-aa','8889');
    iframe3.src = 'https://ad.a-ads.com/8889?size=728x90';
    iframe3.onload = function(){
        gebi('btppadv3').style.display='table-cell';
    };
    gebi('btppadv3').appendChild(iframe3);
}

function _myPseudo(){return myPseudo;}
function _myPassword(){return GM_getValue('password_'+_myPseudo(),'');}//myPassword;}
function _myUID(){return myUID;}

//  Start of chat functions
function tstodate(ts){
    var a = new Date(ts*1000);
    var now = new Date();
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();

    var time='';
    if(year!=now.getFullYear() || a.getMonth()!=now.getMonth() || date!=now.getDate()){
        time=date+' '+month+', ';
    }

    if(hour<10){hour='0'+hour;}
    if(min<10){min='0'+min;}
    if(sec<10){sec='0'+sec;}
    time += hour+':'+min+':'+sec ;
    return time;
}

function chattab(a,current){
    var color='#d8d8ee';
    if(a==current){color='#c4c4d8';}
    return '<span id="chattab_'+a+'" style="margin-top:5px;border-radius:2px;padding:1px;cursor:pointer;position:relative;top:3px;float:left;border:1px solid #aaaacc;margin-right:2px;font-size:70%;background-color:'+color+';">'+a+'</span>';
}

function chattabchange(c){
    return function(){chathisto.innerHTML='<br />Loading...<br /><br />';chatchan.value=c;callbackPostChat('tabchange')();}
}

var chatExternalHandle=function(d,l){};
var chaturlsuffix='';
var lastChatHash='';
function callbackPostChat(z){
  return function(){
    var urlf='';
    if(z=='button'){urlf='&text='+encodeURIComponent(chattext.value);chattext.value='';}
    var page=server+'bitcoinchat.php?rev=1&pass='+_myPassword()+'&uid='+_myUID()+'&chan='+encodeURIComponent(chatchan.value)+urlf+chaturlsuffix;
    if(chathidebutton.state!='off'){
        getPage(page, function(r){
            var chathistoLastST=chathisto.scrollTop;
            if(0){chathistoLastST=-1;}
            var d;
            d=JSON.parse(r.responseText);
            chatExternalHandle(d,'start');
            var dh=d['history'];
            chat_div.style.display='block';
            if(lastChatHash!=d['hash']){
                lastChatHash=d['hash'];
                chathisto.innerHTML='';
                var chadd='';
                for(n in dh){
                    dmsg=dh[n];
                    var uid=dmsg['uid'];
                    var un=dmsg['un'];
                    var ts=dmsg['ts'];
                    var txt=dmsg['txt'];
                    var strts=tstodate(parseInt(ts));
                    var sender='<a href="https://bitcointalk.org/index.php?action=profile;u='+uid+'">'+un+'</a>';
                    if(uid==0){sender=un;}
                    chadd+='<span style="font-size:80%;">'+strts+'</span>\
                                          '+sender+'\
                                          : '+txt+'<br />';
                }
                chathisto.innerHTML+=chadd;
            }
            dchans=d['chans'];
            cchan=d['cchan'];
            chattabs.innerHTML='';
            for(nchan in dchans){
                chattabs.innerHTML+=chattab(dchans[nchan],cchan);
            }
            for(nchan in dchans){
                if(gebi('chattab_'+dchans[nchan])){
                    gebi('chattab_'+dchans[nchan]).addEventListener('click',chattabchange(dchans[nchan]),false);
                }
            }
            
            chathisto.style.borderWidth='1px';
            if(/*z=='loop0' || */chathistoLastST==-1){chathistoLastST=chathisto.scrollHeight;}
            chathisto.scrollTop=chathistoLastST;
            chatExternalHandle(d,'end');
        }, 0);
    }
    if(z=='loop'){ setTimeout(callbackPostChat('loop'),refreshChat);}
    if(z=='loop0'){setTimeout(callbackPostChat('loop'),refreshChat);}
  }
}

function TabInChatbox(){

}

function CallbackOnKeyDown(event) {
	if(document.activeElement==chattext && event.keyCode==9){
	   TabInChatbox();
	}
}

function getWidth() {
    if(self.innerWidth){return self.innerWidth;}
    if(document.documentElement && document.documentElement.clientHeight){return document.documentElement.clientWidth;}
    if(document.body){return document.body.clientWidth;}
    return 0;
}

function runChat(){
    document.getElementsByTagName('body')[0].onkeydown=CallbackOnKeyDown;
    chat_div=gebi('bitcoinchat');
    chat_div.style.right=ChatCoordRight;
    chat_div.style.top=ChatCoordTop;
    chat_div.style.padding='5px';
    chat_div.style.backgroundColor='#e6e6f1';
    var hiddenornot='';
    var notloggedinmsg='';
    var opacitybar='';
    if(_myPseudo()==''){hiddenornot='display:none;';notloggedinmsg='You must be logged in to chat';}
    if(showopacitybar=='y'){opacitybar='Opacity: <input onchange="document.getElementById(\'bitcoinchat\').style.opacity=this.value;" type="range" min="0.05" max="1" step="0.01" value="100">';}
    chat_div.innerHTML='<span id="chathidebutton" style="cursor:pointer;border-radius:3px;padding:0px 3px 0px 3px;border:1px solid #444477;background-color:#8888bb;" onclick="\
            this.state=(this.state==\'off\'?\'on\':\'off\');\
            var willbeoff=(this.state==\'off\');\
            document.getElementById(\'chatcontent\').style.display=(willbeoff?\'none\':\'inline\');\
            document.getElementById(\'bitcoinchat\').style.width=(willbeoff?\'auto\':\''+defaultwidthchat+'\');\
            this.innerHTML=(willbeoff?\'Show\':\'Hide\');\
            var qcb=document.getElementsByClassName(\'quoteinbtppchatbutton\');for(i=0;i<qcb.length;i++){var b=qcb[i];b.style.display=(willbeoff?\'none\':\'inline\');}\
            \
        ">Hide</span>&nbsp;&nbsp;<span id="movechatboxbutton" style="cursor:pointer;border-radius:3px;padding:0px 3px 0px 3px;border:1px solid #444477;background-color:#8888bb;">Move</span>\
        &nbsp;&nbsp;&nbsp;<b>Chat</b>'+(_myPseudo()!=''?' - ':'')+_myPseudo()+'<span id="chatcontent" style="display:inline;"><br />\
        <span id="chattabs" style=""></span><br />\
        <form id="bitcoinchatform" action="" method="" style="position:relative;top:4px;">\
        <!--span style="'+hiddenornot+'">'+_myPseudo()+':<br /-->\
        <input id="chattext" style="width:333px;" />\
        <input type=button id="bitcoinchatbutton" value="Send" />\
        </form>\
        <div id="chathisto" style="margin-top:4px;margin-bottom:4px;max-height:'+ChatCoordMaxHeight+';overflow:auto;background-color:white;border:0px solid #cccccc;"></div>\
        </span><span id="notloggedinmsg">'+notloggedinmsg+'</span>\
        <span style="display:none;"><input id="bitcoinchatchan" /><br /></span>'+opacitybar+'\
        </span>';
    
    chathisto=gebi('chathisto');
    chattext=gebi('chattext');
    chatchan=gebi('bitcoinchatchan');
    chattabs=gebi('chattabs');
    chathidebutton=gebi('chathidebutton');
    movechatboxbutton=gebi('movechatboxbutton');
    chathisto.style.fontSize='70%';
    movechatboxbutton.addEventListener('click',function(e){this.style.cursor=this.style.cursor=='move'?'pointer':'move';movechatbox=!movechatbox;oldrightcb=Number(chat_div.style.right.slice(0,chat_div.style.right.length-2));oldtopcb=Number(chat_div.style.top.slice(0,chat_div.style.top.length-2));var mp=getMousePosition(e,false);chatboxoldXR=getWidth()-mp[0];chatboxoldY=mp[1];},false);
    gebi('bitcoinchatbutton').addEventListener('click',callbackPostChat('button'),false);
    gebi('bitcoinchatform').onsubmit=function(){callbackPostChat('button')();return false;};
    
    callbackPostChat('loop0')();
    if(typeof(afterRunChat)==typeof(Function)){afterRunChat();}
}
//  End of chat functions

runchatlaunched=false;
if(DisplayChat=='y'){
    runChat();
    runchatlaunched=true;
}

if(myPseudo!='' && (document.location.href.split('index.php?action=unreadreplie').length>1 || document.location.href.split('.').pop()=='php')){
    getPage('https://bitcointalk.org/index.php?action=trust', function(r){
        rr=r.responseText;
        if(rr.split('rust network')[1]==undefined){return;}
        rra=rr.split('rust network')[1].split('</div>')[0];
        rrb=rra.replace(/&nbsp;/g,'#');
        rrb=rrb.replace(/<br \/>/g,'');
        rrc=rrb.split('#').splice(1);
        rrc=rrc.filter(function(e){return e;});
        rrd=rrc.join('#');
        GM_setValue('trustlist',rrd);
    },0);
}

var movechatbox=false;

if(DisplayChat=='y' && document.location.href.split('bitcointalk.org/index.php?topic=').length>1){
    var posts=gebcn('subject');
    var threadno=document.location.href.split('bitcointalk.org/index.php?topic=')[1].split('.')[0];
    for(i=0;i<posts.length;i++){
        var p=posts[i];
        var postno=p.id.slice(8);
        p.innerHTML+='&nbsp;&nbsp;<span class="quoteinbtppchatbutton" onclick="if(document.getElementById(\'chattext\')){document.getElementById(\'chattext\').value+=\' btpost:'+threadno+'#'+postno+'\';}" style="cursor:pointer;background-color:#d8d8ee;font-size:70%;padding:2px;border:solid 1px #aaaacc;border-radius:4px;">Quote in BT++ chat</span>';
    }
}

if(displayDomains=='y'){
    var posts=gebcn("post");
    for(i=0;i<posts.length;i++){
        var p=posts[i];
        p.innerHTML=p.innerHTML.replace(
            /<a href="https?:\/\/([^/"]*)(.*?)">(.*?)<\/a>/g,
            '$&&nbsp;<b class="domainlinkdisplayer" domain="$1" style="color:#880000;">[Domain=$1]</b> '
        );
    }
    var posts=gebcn("personalmessage");
    for(i=0;i<posts.length;i++){
        var p=posts[i];
        p.innerHTML=p.innerHTML.replace(
            /<a href="https?:\/\/([^/"]*)(.*?)">(.*?)<\/a>/g,
            '$&&nbsp;<b class="domainlinkdisplayer" domain="$1" style="color:#880000;">[Domain=$1]</b> '
        );
    }
    mapCN(function(e){if(e.getAttribute('domain')=='bitcointalk.org'){e.style.display='none';}}, 'domainlinkdisplayer', 0);
}

var listThreadsToHide=[];
var hsp=hiddenThreads.split(';');
for(i=0;i<hsp.length;i++){
    var hi=hsp[i];
    var hisp=hi.split(':');
    if(hisp.length<2){continue;}
    var ws=hisp[0], threadno=hisp[1];
    if(ws=='bt'){
        listThreadsToHide.push(threadno);
    }
}

mapCN(function(r){if(listThreadsToHide.indexOf(r.getAttribute('tid'))>-1){ r.style.display='none';} },'threadlink',0);

function initMenu(event){
  var node = event.target;
  var item = document.querySelector("#btpp_hidethread_contextmenuitem menuitem");
  if(node.getAttribute('threadid')!=undefined){
    body.setAttribute("contextmenu", "btpp_hidethread_contextmenuitem");
    item.setAttribute("tid",node.getAttribute('threadid'));
  }else{
    body.removeAttribute("contextmenu");
    item.removeAttribute("tid");
  }
}

function addThreadToHiddenList(event){
  var threadid=event.target.getAttribute("tid");
  var ov=GM_getValue('hiddenthreads','')+';bt:'+threadid+';';
  GM_setValue('hiddenthreads', ov.replace(/;{1,5}/g,';'));
  gebi('threadrow_'+threadid).style.display='none';
}

if("contextMenu" in document.documentElement && "HTMLMenuItemElement" in window){
    body.addEventListener("contextmenu", initMenu, false);
    var menu = body.appendChild(document.createElement("menu"));
    menu.outerHTML = '<menu id="btpp_hidethread_contextmenuitem" type="context"><menuitem label="Hide this thread"></menuitem></menu>';
    document.querySelector("#btpp_hidethread_contextmenuitem menuitem").addEventListener("click", addThreadToHiddenList, false);
}


var bttextinput=gebcn('editor');
var getTextInputValue=function(){return '';};
var setTextInputValue=function(t){};
if(bttextinput.length==1){
    bttextinput=bttextinput[0];
    getTextInputValue=function(){return bttextinput.value;};
    setTextInputValue=function(t){bttextinput.value=t;};
}else if(document.forms.postmodify){
    bttextinput=document.forms.postmodify.message;
    if(bttextinput){
        getTextInputValue=function(){return bttextinput.value;};
        setTextInputValue=function(t){bttextinput.value=t;};
    }    
}

function backupTextInput(){
    var tiv=getTextInputValue();
    if(tiv!=''){GM_setValue('textvalue_input_bt',tiv);}
    setTimeout(backupTextInput,1000);
}
backupTextInput();

mapCN(function(e){e.addEventListener('click',function(r){
        var tiv=getTextInputValue();
        var z=GM_getValue('textvalue_input_bt','');
        if(z!='' && tiv!=z){setTextInputValue(((tiv!='')?tiv+'\n':'')+z);}
    },false);},'addBackedupTI',0);


var topdiv = body.appendChild(document.createElement("div"));
topdiv.innerHTML='<a href="javascript:void(0);" id="topbutton">Top</a>';
topdiv.style='position:fixed;bottom:0px;left:0px;border:1px solid #bbbb99;padding:2px;';
topdiv.addEventListener('click',function(){document.body.scrollTop=document.documentElement.scrollTop=0;},false);




