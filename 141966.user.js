// ==UserScript==
// @name        TUITmodif
// @namespace   http://twitter.com/riloaw
// @description More Menu In New Twitter
// @author      Rizal Loa Wanda
// @icon		http://1.bp.blogspot.com/-76hqN1rKblE/UHbRda8zHdI/AAAAAAAAA-I/sG3jPhb5I8o/s1600/burung.ico
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @match       http://twitter.com/*
// @match       https://twitter.com/*
// @run-at      document-end
// @version     4.0
// @grant       none
// ==/UserScript==

/* Global configuration object */
var GLOBAL = {}
GLOBAL.options = { 'widen':true, 'swap':false , 'swiden':false ,
                    'removed':true, 'justtl':false ,
                    'trans':true, 'name':false, 'fixd':false,
                    'foot':false, 'who':false,
                    'hopen':false, 'stat':false, 'trend':false,
                    'rts':true, 'fbs':false, 
                    'tco':true, 'ava':false, 'ment':false,
					'clr':false, 'thmb':false, 'normal':false, 'tbmenu':false,
					'rpl':false, 'rtwd':false, 'del':false, 'fav':false , 'scrol':false , 'autoscrol':false , 'time':true ,
					'showAB':true,
                    };
GLOBAL.menuVisible = false;
GLOBAL.alt = false;
GLOBAL.seconds = false;

function confirmRefresh() {
var okToRefresh = confirm("Refresh Twitter Page");
if (okToRefresh)
	{
			setTimeout("location.reload(true);",0000);
	}
}

function loadData () {
	var options = JSON.parse( localStorage.getItem( 'TUITmodif:Options' ) );
	if ( options != null ) {
		GLOBAL.options.widen = true && options.widen;
		GLOBAL.options.swiden = true && options.swiden;
		GLOBAL.options.swap  = true && options.swap;
		GLOBAL.options.removed  = true && options.removed;
		GLOBAL.options.justtl  = true && options.justtl;
		GLOBAL.options.trans  = true && options.trans;
		GLOBAL.options.name  = true && options.name;
		GLOBAL.options.fixd  = true && options.fixd;
		GLOBAL.options.foot  = true && options.foot;
		GLOBAL.options.who  = true && options.who;
		GLOBAL.options.hopen  = true && options.hopen;
		GLOBAL.options.stat  = true && options.stat;
		GLOBAL.options.trend  = true && options.trend;
		GLOBAL.options.rts = true && options.rts;
		GLOBAL.options.fbs  = true && options.fbs;
		GLOBAL.options.tco  = true && options.tco;
		GLOBAL.options.ava = true && options.ava;
		GLOBAL.options.ment = true && options.ment;
		GLOBAL.options.clr = true && options.clr;
		GLOBAL.options.thmb = true && options.thmb;
		GLOBAL.options.normal = true && options.normal;
		GLOBAL.options.rpl = true && options.rpl;
		GLOBAL.options.rtwd = true && options.rtwd;
		GLOBAL.options.del = true && options.del;
		GLOBAL.options.fav = true && options.fav;
		GLOBAL.options.scrol= true && options.scrol;
		GLOBAL.options.autoscrol= true && options.autoscrol;
		GLOBAL.options.time= true && options.time;
		GLOBAL.options.showAB= true && options.showAB;
		
		
	}
}

function saveData () {
	localStorage.setItem( 'TUITmodif:Options', JSON.stringify( GLOBAL.options ) );
}

/* Returns the <style> tag used by this script */
function getStyleTag () {
	var tag = document.getElementById( '-tuitmodif--style-' );
	
	if ( !tag ) {
		tag = document.createElement( 'style' );
		tag.setAttribute( 'type', 'text/css' );
		tag.id = '-tuitmodif--style-';
		
		document.getElementsByTagName( 'head' )[ 0 ].appendChild( tag );
	}
	
	return tag;
}

function toggleMenu () {
	if ( GLOBAL.menuVisible ) {
		hideMenu();
	} else {
		showMenu();
	}
	
	    toggleTbmenu();
}

function showMenu () {
	GLOBAL.menuVisible = true;
	
	var menuButton= document.getElementById('TBmenu');
	menuButton.innerHTML = '&#x25B2;&nbsp;Options';
	menuButton.setAttribute( 'title', 'Close TUITmodif menu' );
}

function hideMenu () {
	GLOBAL.menuVisible = false;
	var menuButton= document.getElementById('TBmenu');
	menuButton.innerHTML = '&#x25BC;&nbsp;Options';
	menuButton.setAttribute( 'title', 'Open TUITmodif menu' );
}
function time(){
	if (window.top != window.self) return;

		var tbtime = document.createElement("div");
		tbtime.id = '-tuitmodif--time-';
		if(!document.getElementById('fb-frame')){
			document.body.appendChild(tbtime);
			}
		tbtime.setAttribute( 'title', 'Click To Change Time Format' );
		tbtime.addEventListener( 'click', function(ev){
				GLOBAL.seconds = !GLOBAL.seconds;
			} );

		function tick(){
			var d = new Date();
			var weekday=new Array(7);
			weekday[0]="Minggu";
			weekday[1]="Senin";
			weekday[2]="Selasa";
			weekday[3]="Rabu";
			weekday[4]="Kamis";
			weekday[5]="Jumat";
			weekday[6]="Sabtu";
			var h = d.getHours();
			var m = d.getMinutes();
			var s =d.getSeconds();
	
			if (h < 10) h = "0" + h;
			if (m < 10) m = "0" + m;
			if (s < 10) s = "0" + s;
	
				if(GLOBAL.seconds == true){
					tbtime.innerHTML = h + ":" + m +" <h3>"+weekday[d.getDay()]+"</h3>";
				}
				if(GLOBAL.seconds == false){
					tbtime.innerHTML = h + ":" + m +":"+s+" <h3>"+weekday[d.getDay()]+"</h3>";
				}	
		}

	tick();
	setInterval(tick, 0);
}
function toggleSwap () {
	GLOBAL.options.swap = !GLOBAL.options.swap;
	if(GLOBAL.options.swap == true){
		GLOBAL.options.normal = false;
		GLOBAL.options.fixd = false;
	}
	updateAll();
	saveData();
}

function toggleWiden () {
	GLOBAL.options.widen = !GLOBAL.options.widen;
	if(GLOBAL.options.widen == true){
		GLOBAL.options.normal = false;
		GLOBAL.options.swiden = false;
	}
	updateAll();
	saveData();
}
function toggleSWiden () {
	GLOBAL.options.swiden = !GLOBAL.options.swiden;
	if(GLOBAL.options.swiden == true){
		GLOBAL.options.normal = false;
		GLOBAL.options.widen = false;
	}
	updateAll();
	saveData();
}
function toggleRemoved () {
	GLOBAL.options.removed = !GLOBAL.options.removed;
	if(GLOBAL.options.removed == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleShowAB() {
	GLOBAL.options.showAB= !GLOBAL.options.showAB;
	if(GLOBAL.options.showAB == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleJusttl () {
	GLOBAL.options.justtl = !GLOBAL.options.justtl;
	if(GLOBAL.options.justtl == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleTrans () {
	GLOBAL.options.trans = !GLOBAL.options.trans;
	if(GLOBAL.options.trans == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleName () {
	GLOBAL.options.name = !GLOBAL.options.name;
	if(GLOBAL.options.name == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleFixd() {
	GLOBAL.options.fixd = !GLOBAL.options.fixd;
	if (GLOBAL.options.fixd==true){
		GLOBAL.options.swap=false;
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleFoot() {
	GLOBAL.options.foot = !GLOBAL.options.foot;
	if(GLOBAL.options.foot == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleWho() {
	GLOBAL.options.who = !GLOBAL.options.who;
	if(GLOBAL.options.who== true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleHopen() {
	GLOBAL.options.hopen = !GLOBAL.options.hopen;
	if(GLOBAL.options.hopen == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleStat() {
	GLOBAL.options.stat = !GLOBAL.options.stat;
	if(GLOBAL.options.stat == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleTrend() {
	GLOBAL.options.trend = !GLOBAL.options.trend;
	if(GLOBAL.options.trend == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleRts() {
	GLOBAL.options.rts = !GLOBAL.options.rts;
	updateAll();
	saveData();
}
function toggleFbs() {
	GLOBAL.options.fbs = !GLOBAL.options.fbs;
	updateAll();
	saveData();
}
function toggleTco() {
	GLOBAL.options.tco = !GLOBAL.options.tco;
	if(GLOBAL.options.tco == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleAva() {
	GLOBAL.options.ava = !GLOBAL.options.ava;
	if(GLOBAL.options.ava == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleMent() {
	GLOBAL.options.ment = !GLOBAL.options.ment;
	if(GLOBAL.options.ment == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleClr() {
	GLOBAL.options.clr = !GLOBAL.options.clr;
	if(GLOBAL.options.clr == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleThmb() {
	GLOBAL.options.thmb = !GLOBAL.options.thmb;
	if(GLOBAL.options.thmb == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleFav() {
	GLOBAL.options.fav = !GLOBAL.options.fav;
	if(GLOBAL.options.fav == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleDel() {
	GLOBAL.options.del = !GLOBAL.options.del;
	if(GLOBAL.options.del == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleRtwd() {
	GLOBAL.options.rtwd = !GLOBAL.options.rtwd;
	if(GLOBAL.options.rtwd == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleRpl() {
	GLOBAL.options.rpl = !GLOBAL.options.rpl;
	if(GLOBAL.options.rpl == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleScrol() {
	GLOBAL.options.scrol = !GLOBAL.options.scrol;
	if(GLOBAL.options.scrol == true){
		GLOBAL.options.normal = false;
	}
	confirmRefresh();
	updateAll();
	saveData();
}
function toggleAutoScrol() {
	GLOBAL.options.autoscrol = !GLOBAL.options.autoscrol;
	if(GLOBAL.options.autoscrol == true){
		GLOBAL.options.normal = false;
	}
	confirmRefresh();
	updateAll();
	saveData();
}
function toggleTime() {
	GLOBAL.options.time = !GLOBAL.options.time;
	if(GLOBAL.options.time == true){
		GLOBAL.options.normal = false;
	}
	updateAll();
	saveData();
}
function toggleTbmenu() {
	if( GLOBAL.menuVisible == true){
	GLOBAL.options.tbmenu = true;
	}
	if(GLOBAL.menuVisible == false){
	GLOBAL.options.tbmenu = false;
	GLOBAL.alt = false;
	}
		
	updateAll();
}
function toggleAlt() {
	GLOBAL.alt = !GLOBAL.alt;
	if( GLOBAL.alt == true){
	GLOBAL.options.tbmenu = false;
	}
	else if(GLOBAL.alt == false){
	GLOBAL.options.tbmenu = true;
	}
	
	updateAll();
}
function toggleNormal() {
	GLOBAL.options.normal = !GLOBAL.options.normal;
	if(GLOBAL.options.normal == true){
		GLOBAL.options.widen = false;
		GLOBAL.options.swiden = false;
		GLOBAL.options.swap  = false;
		GLOBAL.options.removed  = false;
		GLOBAL.options.justtl  = false;
		GLOBAL.options.trans  = false;
		GLOBAL.options.name  = false;
		GLOBAL.options.fixd  = false;
		GLOBAL.options.foot  = false;
		GLOBAL.options.who  = false;
		GLOBAL.options.hopen  = false;
		GLOBAL.options.stat  = false;
		GLOBAL.options.trend  = false;
		GLOBAL.options.tco  = false;
		GLOBAL.options.ava = false;
		GLOBAL.options.ment = false;
		GLOBAL.options.clr = false;
		GLOBAL.options.thmb = false;
		GLOBAL.options.scrol = false;
		GLOBAL.options.autoscrol = false;
		GLOBAL.options.showAB= false;
		confirmRefresh();
	}
	updateAll();
	saveData();
}
function initialize () {
	var body = document.getElementsByTagName( 'body' )[ 0 ];
	var topnav= document.getElementById('global-actions');

	// Base button
	var menuButton = document.createElement( 'div' );
	menuButton.innerHTML = '&#x25BC;&nbsp;TBmenu';
	menuButton.id = 'TBmenu';
	menuButton.setAttribute( 'title', 'Open TUITmodif menu' );
	menuButton.addEventListener( 'click', function(ev){
		toggleMenu();
	} );
	
	var menuLi=document.createElement( 'li' );
	menuLi.id='TBnav';
	menuLi.setAttribute( 'style', 'position:relative; float:left;' );
	menuLi.appendChild(menuButton);
	

	
	if(!document.getElementById('fb-frame')){
	topnav.appendChild( menuLi );
	}
	
	var asd=document.createElement( 'div' );
	asd.id='asd';
	asd.setAttribute( 'style', 'position:fixed; float:left; bottom:100px;' );
	asd.innerHTML = '<input style="opacity:0.2;" id="-tuitmodif--del-checkbox-" type="checkbox">';
	if(!document.getElementById('ASd')){
	body.appendChild( asd );
	}
	
	// Create the main menu
	var menuDiv = document.createElement( 'div' );
	menuDiv.id = '-tuitmodif--menu-';
	menuDiv.setAttribute( 'class', 'module' );
	menuDiv.innerHTML =
        'TUITmodif<br/>' +
        '<a href="http://userscripts.org/scripts/show/141966" title="check update" target="_blank"> check update here </a><br/>'+
		'<h1><input id="-tuitmodif--swap-checkbox-" type="checkbox"> Change Position</h1>' +
		'<h1><input id="-tuitmodif--widen-checkbox-" type="checkbox"> Widen Page to 960px</h1>' +
		'<h1><input id="-tuitmodif--swiden-checkbox-" type="checkbox"> Super Widen Page to 95% Of Your Screen</h1>' +
        '<h1><input id="-tuitmodif--trans-checkbox-" type="checkbox"> Transparant</h1>' +
        '<h1><input id="-tuitmodif--clr-checkbox-" type="checkbox"> Hover/Focus Indicator</h1>' +
        '<h1><input id="-tuitmodif--thmb-checkbox-" type="checkbox"> Bigger Avatar When Hover</h1>' +
		'<h1><input id="-tuitmodif--name-checkbox-" type="checkbox"> Swap Fullname and Username</h1>' +
		'<h1><input id="-tuitmodif--rts-checkbox-" type="checkbox"> Add Old RT </h1>' +
        '<h1><input id="-tuitmodif--fbs-checkbox-" type="checkbox"> Change Font</h1>' +
        '<h1><input id="-tuitmodif--showAB-checkbox-" type="checkbox"> Allways Show Action Button</h1>' +
        '<h1><input id="-tuitmodif--fixd-checkbox-" type="checkbox"> Fix Left Dashboard (change position:off)</h1>' +
        '<h1><input id="-tuitmodif--tco-checkbox-" type="checkbox"> Fix Link (remove t.co)</h1>' +
        '<h1><input id="-tuitmodif--ment-checkbox-" type="checkbox"> Change Connect to Mention</h1>' +
        '<h1><input id="-tuitmodif--scrol-checkbox-" type="checkbox"> Scrol To Last Tweet(need refresh)</h1>' +
        '<h1><input id="-tuitmodif--autoscrol-checkbox-" type="checkbox"> Auto Scrol New Tweet(need refresh)</h1>' +
        '<h1><input id="-tuitmodif--time-checkbox-" type="checkbox"> Show Date and Time</h1>' +
        '<h1><input id="-tuitmodif--normal-checkbox-" type="checkbox"> Back To Normal Twitter (turn off all function)</h1>' +
        '<br /><right><font size="-2" color="#CCC">(c) Rizal Loa Wanda</font></right>';
    
	if(!document.getElementById('fb-frame')){
	body.appendChild( menuDiv );
	}
	
	var menuDiv2 = document.createElement( 'div' );
	menuDiv2.id = '-tuitmodif--menu2-';
	menuDiv2.setAttribute( 'class', 'module' );
	menuDiv2.innerHTML =
		'TUITmodif Remove Component' +
        '<h1><input id="-tuitmodif--ava-checkbox-" type="checkbox"> Remove Avatar</h1>' +
		'<h1><input id="-tuitmodif--removed-checkbox-" type="checkbox"> Remove text in symbol</h1>' +
        '<h1><input id="-tuitmodif--rpl-checkbox-" type="checkbox"> Remove Reply Button</h1>' +
        '<h1><input id="-tuitmodif--rtwd-checkbox-" type="checkbox"> Remove New Retweet Button</h1>' +
        '<h1><input id="-tuitmodif--del-checkbox-" type="checkbox"> Hide Timeline</h1>' +
        '<h1><input id="-tuitmodif--fav-checkbox-" type="checkbox"> Remove Fav Button</h1>' +
		'<h1><input id="-tuitmodif--hopen-checkbox-" type="checkbox"> Remove Expand and Collapse Text</h1>' +
		'<h1><input id="-tuitmodif--stat-checkbox-" type="checkbox"> Remove Statistic</h1>' +
        '<h1><input id="-tuitmodif--who-checkbox-" type="checkbox"> Remove Who To Follow and Simmiliar</h1>' +
		'<h1><input id="-tuitmodif--trend-checkbox-" type="checkbox"> Remove Trending Topic</h1>' +
        '<h1><input id="-tuitmodif--foot-checkbox-" type="checkbox"> Remove Footer</h1>' +
        '<h1><input id="-tuitmodif--justtl-checkbox-" type="checkbox"> Just Time Line</h1>' +
		'TUITmodif Remove Component';
    
	if(!document.getElementById('fb-frame')){
	body.appendChild( menuDiv2 );
	}
	
	var menuDiv3 = document.createElement( 'div' );
	menuDiv3.id = '-tuitmodif--menu3-';
	menuDiv3.setAttribute( 'class', 'module' );
    
var menuChange = document.createElement( 'a' );
	menuChange.innerHTML = 'Click To Change Menu Position';
	menuChange.addEventListener( 'click', function(ev){
		toggleAlt();
	} );
	menuDiv3.appendChild( menuChange );
	if(!document.getElementById('fb-frame')){
	body.appendChild( menuDiv3 );
	}


	
	document.getElementById( '-tuitmodif--swap-checkbox-' ).addEventListener( 'change', function(ev){ toggleSwap(); } );
	document.getElementById( '-tuitmodif--swiden-checkbox-' ).addEventListener( 'change', function(ev){ toggleSWiden(); } );
	document.getElementById( '-tuitmodif--widen-checkbox-' ).addEventListener( 'change', function(ev){ toggleWiden(); } );
	document.getElementById( '-tuitmodif--removed-checkbox-' ).addEventListener( 'change', function(ev){ toggleRemoved(); } );
	document.getElementById( '-tuitmodif--justtl-checkbox-' ).addEventListener( 'change', function(ev){ toggleJusttl(); } );
	document.getElementById( '-tuitmodif--trans-checkbox-' ).addEventListener( 'change', function(ev){ toggleTrans(); } );
	document.getElementById( '-tuitmodif--name-checkbox-' ).addEventListener( 'change', function(ev){ toggleName(); } );
	document.getElementById( '-tuitmodif--fixd-checkbox-' ).addEventListener( 'change', function(ev){ toggleFixd(); } );
	document.getElementById( '-tuitmodif--foot-checkbox-' ).addEventListener( 'change', function(ev){ toggleFoot(); } );
	document.getElementById( '-tuitmodif--who-checkbox-' ).addEventListener( 'change', function(ev){ toggleWho(); } );
	document.getElementById( '-tuitmodif--hopen-checkbox-' ).addEventListener( 'change', function(ev){ toggleHopen(); } );
	document.getElementById( '-tuitmodif--stat-checkbox-' ).addEventListener( 'change', function(ev){ toggleStat(); } );
	document.getElementById( '-tuitmodif--trend-checkbox-' ).addEventListener( 'change', function(ev){ toggleTrend(); } );
	document.getElementById( '-tuitmodif--rts-checkbox-' ).addEventListener( 'change', function(ev){ toggleRts(); } );
	document.getElementById( '-tuitmodif--fbs-checkbox-' ).addEventListener( 'change', function(ev){ toggleFbs(); } );
	document.getElementById( '-tuitmodif--tco-checkbox-' ).addEventListener( 'change', function(ev){ toggleTco(); } );
	document.getElementById( '-tuitmodif--ava-checkbox-' ).addEventListener( 'change', function(ev){ toggleAva(); } );
	document.getElementById( '-tuitmodif--ment-checkbox-' ).addEventListener( 'change', function(ev){ toggleMent(); } );
	document.getElementById( '-tuitmodif--clr-checkbox-' ).addEventListener( 'change', function(ev){ toggleClr(); } );
	document.getElementById( '-tuitmodif--thmb-checkbox-' ).addEventListener( 'change', function(ev){ toggleThmb(); } );
	document.getElementById( '-tuitmodif--rpl-checkbox-' ).addEventListener( 'change', function(ev){ toggleRpl(); } );
	document.getElementById( '-tuitmodif--rtwd-checkbox-' ).addEventListener( 'change', function(ev){ toggleRtwd(); } );
	document.getElementById( '-tuitmodif--del-checkbox-' ).addEventListener( 'change', function(ev){ toggleDel(); } );
	document.getElementById( '-tuitmodif--fav-checkbox-' ).addEventListener( 'change', function(ev){ toggleFav(); } );
	document.getElementById( '-tuitmodif--normal-checkbox-' ).addEventListener( 'change', function(ev){ toggleNormal(); } );
	document.getElementById( '-tuitmodif--scrol-checkbox-' ).addEventListener( 'change', function(ev){ toggleScrol(); } );
	document.getElementById( '-tuitmodif--autoscrol-checkbox-' ).addEventListener( 'change', function(ev){ toggleAutoScrol(); } );
	document.getElementById( '-tuitmodif--time-checkbox-' ).addEventListener( 'change', function(ev){ toggleTime(); } );
	document.getElementById( '-tuitmodif--showAB-checkbox-' ).addEventListener( 'change', function(ev){ toggleShowAB(); } );
	
	// Hide the menu
	hideMenu();
}

function updateAll () {
	var widen = ( GLOBAL.options.widen == true );
	var swiden = ( GLOBAL.options.swiden == true );
	var swap  = ( GLOBAL.options.swap == true );
	var removed  = ( GLOBAL.options.removed == true );
	var justtl  = ( GLOBAL.options.justtl == true );
	var trans  = ( GLOBAL.options.trans == true );
	var name  = ( GLOBAL.options.name == true );

	var fixd  = ( GLOBAL.options.fixd == true );
	var foot  = ( GLOBAL.options.foot == true );
	var who  = ( GLOBAL.options.who == true );
	var hopen  = ( GLOBAL.options.hopen == true );
	var stat  = ( GLOBAL.options.stat == true );
	var trend  = ( GLOBAL.options.trend == true );
	var rts  = ( GLOBAL.options.rts == true );
	var fbs  = ( GLOBAL.options.fbs == true );
	var tco  = ( GLOBAL.options.tco == true );
	var ava = ( GLOBAL.options.ava == true );
	var ment = ( GLOBAL.options.ment == true );
	var clr = ( GLOBAL.options.clr == true );
	var thmb = ( GLOBAL.options.thmb== true );
	var tbmenu = ( GLOBAL.options.tbmenu== true );
	var tbmenuA = ( GLOBAL.options.tbmenuA== true );
	var rpl = ( GLOBAL.options.rpl== true );
	var rtwd = ( GLOBAL.options.rtwd== true );
	var del = ( GLOBAL.options.del== true );
	var fav = ( GLOBAL.options.fav== true );
	var scrol = ( GLOBAL.options.scrol== true );
	var autoscrol = ( GLOBAL.options.autoscrol== true );
	var time = ( GLOBAL.options.time== true );
	var showAB = ( GLOBAL.options.showAB== true );
	var alt = ( GLOBAL.alt== true );
		
	// Start with an empty set of rules
	var rules = '';
	rules +='#TBmenu{display  :block; padding :10px 12px 15px ;color :#CCC; text-shadow: 1px -1px 1px rgba(0, 0, 0, 1); font-weight : bold ; font-size   : 12px; height   : 12px; cursor   : pointer;}';
	rules +='#TBmenu:hover{color:white}';
	rules +='::selection{background:#3396fe; color:white} ::-moz-selection{background:#3396fe; color:white}';
	
	
	// Rules to widen the page to 960px
	if ( widen ) {
		rules += '#page-container { width: 960px !important; }'
		       + '.content-main { width: 646px !important; }'
		       + '.global-nav-inner .container { width: 960px !important; }'
			   }
	
	// Rules to widen the page to 95% of your computer
	if ( swiden ) {
		rules += '#page-container { width: 95% !important; }'
		       + '.content-main { width: 73.85% !important; margin-right:0 !important;}'
		       + '.global-nav-inner .container { width: 92% !important; }'
			   }
	
	// Rules to swap the columns
	if ( swap ) {
		rules += '.dashboard { float: right !important; }'
			   + '.content-main { float:left; margin-right: 12px !important; }'
			   + '.module .list-link {text-align:right !important;}'
               + '.module .chev-right {left:12px !important; -moz-transform:scaleX(-1) !important; -webkit-transform:scaleX(-1) !important;  transform:scaleX(-1) !important; -ms-transform:scaleX(-1) !important; -o-transform:scaleX(-1) !important;}'
	}
	
	//rules remove text in reply button retweet and another
	if ( removed ) {
	   rules += 'li.action-reply-container * b, li.action-rt-container * b, li.action-del-container * b, li.action-fav-container * b{display:none !important;}'
					+ '.yod-old-style-retweet b{display:none !important}'
					+ '.yod-fb b{display:none !important}'
              }
    
    //rules hide open
    if ( hopen ){
        rules+= '.expand-action-wrapper {display:none !important;}'
				+ '.collapse-action-wrapper {display:none !important;}'
				+ '.simple-details-link {display:none !important;}'
	       }
	       
	//rules make just timeline
	if ( justtl ) {
	   rules += '.dashboard { display: none; }'
	           + '.content-main { width: 960px !important; }'
	           + '.global-nav-inner .container { width: 960px !important; }'
	           + '#page-container { width: 960px !important; }'
	           }
	 
	 //rules make transparant
	 if ( trans ) {
	     rules+= '.wrapper {background:none !important;}'
		 		+ '.global-nav { background:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAA8CAYAAAC0JpAOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjNCNkMzQTlFNTAxMTFFMTlGNzJBNjQzNTg2Mjk3QUQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjNCNkMzQUFFNTAxMTFFMTlGNzJBNjQzNTg2Mjk3QUQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2M0I2QzNBN0U1MDExMUUxOUY3MkE2NDM1ODYyOTdBRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2M0I2QzNBOEU1MDExMUUxOUY3MkE2NDM1ODYyOTdBRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhqxDFQAAACdSURBVHjavNRJCsUgEARQhxjB4HDXf/REJQ7Jzw26F4W1flSJiPJ9358gsvXeBYnu+6ZRrRWESik0uq6LRjlnUBMLnecJQqwbb62BmnBzOMR6mSzEmptzgubGGKC553lWNn0fBgYpwcgmpVyJlFIgpLUGoS8rkTFmJdr3fWWTtRbUhJsLIdAopUSjGCMIsc7kvafRcRw0cs6R6C/AAA/pXkeVYyjkAAAAAElFTkSuQmCC) top repeat #007fff; border-bottom:#0999f2 solid 4px;}'
				+ '.nav .active > a {border-radius: 0 32px; }'
				+ '.nav > li > a {color: #ccc; display: block; font-weight: bold; height: 12px; line-height: 1; padding: 13px 12px 15px; text-shadow: 1px -1px 1px rgba(0, 0, 0, 1); }'
				+ '.avatar { border-radius:90px;border:4px solid #d9d9d9;}'
	       }
	 
	 //rules swap name and username
	 if ( name ) {
	     rules+= '.content-main .username {font-size: 15px; color: #333; float: left; }'
                + '.content-main .username b { font-weight: bold; }'
                + '.content-main .username s { font-weight: bold; color: #333; }'
                + '.content-main .fullname { font-weight: normal; color: #999; font-size: 11px; margin-left: 5px; }'      
				+ '.recent-tweets .username {font-size: 12px; color: #333; float: left; }'
                + '.recent-tweets .username b { font-weight: bold; }'
                + '.recent-tweets .username s { font-weight: bold; color: #333; }'
                + '.recent-tweets .fullname { font-weight: normal; color: #999; font-size: 10px; margin-left: 5px; }' 		   
            }
      
      //rules make fixed dashboard
      if ( fixd && !swap) {
          rules+= '.dashboard { position:fixed; }'
	           }
	   
	   //rules hide footer
	   if ( foot ){
	      rules+= '.component[data-component-term="footer"], .site-footer {display: none !important;}'
	   }
	   
	   //rules hide who to follow
	   if ( who ){
	      rules+= '.component[data-component-term="user_recommendations"],.component[data-component-term="similar_user_recommendations"] , .component[data-component-term="user_similarities_list"], .wtf-module {display: none !important;}'    
	    }
	    
	    //rules hide statistic data
	    if ( stat ){
	       rules+= '.js-mini-profile-stats {display: none !important;}' 
	       }

	     //rules show traditional RT
	     if ( !rts ){
	       rules+= '.yod-old-style-retweet {display: none !important;}'
	       }
	     
	     //rules change font
	     if ( fbs ){
	       rules+= '.stream-item, .unfocusable-stream-item, body.ms-windows, body.ms-windows label, body.ms-windows input, body.ms-windows textarea, body.ms-windows select, body.ms-windows button { font-family:"Comic Sans MS", cursive; font-size:16px;}'
	       }
	       
	    //rules hide trending topics
	    if ( trend ){
	       rules+='.component[data-component-term="trends"], .trends {display: none !important;}'
	       }
		   
		 //rules give color to tweet hover (crazy code here -_- )
		 if ( clr ){
			rules+='.tweet:hover{background: -moz-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; background: -o-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; background: -ms-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; background: -webkit-linear-gradient(top, #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; background: linear-gradient(center top, #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; }'
			   + '.module .flex-module:hover {background: -moz-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; }'
			   + '.module .flex-module:hover {background: -o-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; }'
			   + '.module .flex-module:hover {background: -ms-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; }'
			   + '.module .flex-module:hover {background: linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; }'
			   + '.module .flex-module:hover {background: -webkit-linear-gradient(top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; }'
			   + '.component[data-component-term="mini_home_profile"]:hover {box-shadow: 0 0 8px #BBBBBB;} '
			   + '.component[data-component-term="profile_nav"]:hover , .component[data-component-term="connect_nav"]:hover , .component[data-component-term="similar_user_recommendations"]:hover {box-shadow: 0 0 8px #BBBBBB; border-radius: 5px;} '
			   + '.module .flex-module:hover .copyright {color:white;}'
			   + '.module .flex-module:hover h2 {text-shadow:none;}'
			   + '.module .flex-module:hover .tweet-button-container .tweet-counter {text-shadow:none; color:white;}'
			   + '.tweet:hover s , .tweet:hover b {color:black}'
			   + '.tweet:hover a:link {color:black}'
			   + '.tweet:hover .context .with-icn a:hover b {color:black;}'
			   + '.module .flex-module:hover .account-summary .account-group-inner:hover .fullname , .module .flex-module:hover .account-summary .account-group-inner:hover .username {color:white;}' 
			   + '.tweet:hover a:link b:hover , .tweet:hover a:hover b , .tweet:hover a:link s:hover , .tweet:hover a:hover s , .tweet:hover .stream-item-header a:hover s , .tweet:hover .stream-item-header a:hover b , .tweet:hover .stream-item-header a:hover .fullname {color:black}'
			   + '.module .flex-module:hover a , .module .flex-module:hover a :hover {color:white;}'
			   + '.module .flex-module:hover .metadata.social-context {color:white;}'
			   + '.module .flex-module:hover li:hover strong {color:white}'
			   + '.module .flex-module:hover .account-summary .account-group:hover b {color:black;}'
			   + '.module .flex-module:hover .profile-card-inner p {color:black;}'
			   + '.module .flex-module:hover .profile-card-inner p a:hover s , .module .flex-module:hover .profile-card-inner p a:hover b , .module .flex-module:hover .profile-card-inner p a , .module .flex-module:hover .profile-card-inner p s {color:white;}'
			   + '.module .flex-module:hover .username, .module .flex-module:hover .username s , .module .flex-module:hover .mini-profile .fullname ,  .module .flex-module:hover .account-summary .metadata , .module .flex-module:hover .account-summary .metadata:hover fullname {color:white;}'
			   + '.site-footer:hover a {color:white;}'
			   + '.module .list-link:hover a {color:white;}'
			   + '.module .tweet-box:hover .tweet-button-container .tweet-counter {text-shadow:none; color:white;}'
			   + '.module .tweet-box:hover {background: -moz-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none;}'
			   + '.module .tweet-box:hover {background: -o-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none;}'
			   + '.module .tweet-box:hover {background: -ms-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none;}'
			   + '.module .tweet-box:hover {background: -webkit-linear-gradient(top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none;}'
			   + '.module .tweet-box:hover {background: linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none;}'
			   + '.dashboard .stats:hover li:hover strong {color:white}' 
			   + '.dashboard .stats:hover a:hover {color:white}' 
			   + '.dashboard .stats:hover a  {color:black}' 
			   + '.profile-modal-header:hover {background: -moz-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; border-top-right-radius: 5px; border-top-left-radius: 5px;}'
			   + '.profile-modal-header:hover {background: -o-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; border-top-right-radius: 5px; border-top-left-radius: 5px;}'
			   + '.profile-modal-header:hover {background: -ms-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; border-top-right-radius: 5px; border-top-left-radius: 5px;}'
			   + '.profile-modal-header:hover {background: linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; border-top-right-radius: 5px; border-top-left-radius: 5px;}'
			   + '.profile-modal-header:hover {background: -webkit-linear-gradient(top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; border-top-right-radius: 5px; border-top-left-radius: 5px;}'
			   + '.profile-modal-extended:hover {background: -moz-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; }'
			   + '.profile-modal-extended:hover {background: -o-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; }'
			   + '.profile-modal-extended:hover {background: -ms-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; }'
			   + '.profile-modal-extended:hover {background: linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; }'
			   + '.profile-modal-extended:hover {background: -webkit-linear-gradient(top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; }'
			   + '.mini-profile-footer:hover {background: -moz-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; }'
			   + '.mini-profile-footer:hover {background: -o-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; }'
			   + '.mini-profile-footer:hover {background: -ms-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; }'
			   + '.mini-profile-footer:hover {background: linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; }'
			   + '.mini-profile-footer:hover {background: -webkit-linear-gradient(top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB; }'
			   + '.profile-modal-header:hover a , .profile-modal-header:hover .username a , .profile-modal-header:hover .username a s , .profile-modal-extended:hover a , .profile-modal-header:hover a:hover , .profile-modal-extended:hover p a b:hover , .profile-modal-extended:hover a:hover , .profile-modal-extended:hover s , .profile-modal-extended:hover p a:hover s , .profile-modal-extended:hover p a:hover b , .profile-modal-header:hover .username a:hover s , .profile-modal-header:hover .username a:hover {color:white;}'
			   + '.profile-modal-extended:hover p {color:black;}'
			   + '.mini-profile-footer:hover a {color:white; text-shadow:none;}'
			   + '.module .flex-module:hover .profile-card-actions .js-combo-btn-dropdown-options a , .module .flex-module:hover .profile-card-actions .js-combo-btn-dropdown-options a s , .mini-profile-footer:hover .follow-bar .js-combo-btn-dropdown-options a , .mini-profile-footer:hover .follow-bar .js-combo-btn-dropdown-options a s {color:black;}'
			   + '.module .flex-module:hover .profile-card-actions .js-combo-btn-dropdown-options a:hover , .module .flex-module:hover .profile-card-actions .js-combo-btn-dropdown-options a:hover s , .mini-profile-footer:hover .follow-bar .js-combo-btn-dropdown-options a:hover , .mini-profile-footer:hover .follow-bar .js-combo-btn-dropdown-options a:hover s {color:white;}'
			   + '.profile-modal .stats:hover li:hover strong {color:white}' 
			   + '.profile-modal .stats:hover {background: -moz-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB;}'
			   + '.profile-modal .stats:hover {background: -o-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB;}'
			   + '.profile-modal .stats:hover {background: -ms-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB;}'
			   + '.profile-modal .stats:hover {background: linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB;}'
			   + '.profile-modal .stats:hover {background: -webkit-linear-gradient(top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white; box-shadow: 0 0 8px #BBBBBB;}'
			   + '.profile-modal .stats:hover a:hover {color:white}' 
			   + '.profile-modal .stats:hover a  {color:black}' 
			   + '.content-main:hover{box-shadow: 0 0 8px #BBBBBB;}'
			   + '.topbar:hover{box-shadow: 0 0 8px #BBBBBB;}'
			   + '.new-tweets-bar:hover {background: -moz-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:black; text-shadow:none;}'
			   + '.new-tweets-bar:hover {background: -o-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:black; text-shadow:none;}'
			   + '.new-tweets-bar:hover {background: -ms-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:black; text-shadow:none;}'
			   + '.new-tweets-bar:hover {background: -webkit-linear-gradient(top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:black; text-shadow:none;}'
			   + '.new-tweets-bar:hover {background: linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:black; text-shadow:none;}'
			   + ' .scaled-image:hover element.style {height:90px;}'
			   + '.global-nav .search-input:hover {box-shadow: 0 0 8px #BBBBBB;}'
			   + '.dashboard .stats:hover {background: -moz-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white;}'
			   + '.dashboard .stats:hover {background: -o-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white;}'
			   + '.dashboard .stats:hover {background: -ms-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white;}'
			   + '.dashboard .stats:hover {background: linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white;}'
			   + '.dashboard .stats:hover {background: -webkit-linear-gradient(top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; font-color:white;}'
			   + '.module .list-link:hover {background: -moz-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; box-shadow: 0 0 8px #BBBBBB;}'
			   + '.module .list-link:hover {background: -o-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; box-shadow: 0 0 8px #BBBBBB;}'
			   + '.module .list-link:hover {background: -ms-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; box-shadow: 0 0 8px #BBBBBB;}'
			   + '.module .list-link:hover {background: linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none; box-shadow: 0 0 8px #BBBBBB;}'
			   + '.module .list-link:hover {background: -webkit-linear-gradient(top, #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; text-shadow:none;box-shadow: 0 0 8px #BBBBBB;}'
			   + '.route-login .page-canvas:hover p {color:black;}' 
			   + '.route-login .page-canvas:hover p a , .route-login .page-canvas:hover p a:hover {color:white;}'
			   + '.tweet:hover a{color:black !important;}'
			   + '.tweet:hover .simple-details-link{color:black !important;}'
			   + '.tweet:hover .expand-stream-item , .tweet:hover .expand-stream-item>span ,.tweet:hover .collapse-stream-item , .tweet:hover .with-icn , .tweet:hover .with-icn>a>b{color:black !important;}'
			   + '.route-login .page-canvas:hover .mobile, .route-resend-password .page-canvas:hover .mobile, .page-canvas:hover .contact-support {background:black;}'
			   + ' .tweet:hover .stream-item-header>a>.fullname{color:white!important}'
			   + '.trends:hover li:hover {background:#F5F5F5;border-radius:5px;}'
			   + '.trends:hover li:hover a{color:black!important;}'
			   + '.component[data-component-term="user_recommendations"] .account-summary:hover {background:#F5F5F5 !important;border-radius:5px;}'
			   + '.component[data-component-term="user_recommendations"] .account-summary:hover a{color:black!important}'
			   + '.component[data-component-term="user_recommendations"] .account-summary:hover a:hover{color:black!important}'
			   + '.component[data-component-term="user_recommendations"] .account-summary:hover .metadata {color:black!important}'
			   + '.component[data-component-term="user_recommendations"] .account-summary:hover .metadata a{color:black!important}'
			   + '.component[data-component-term="user_recommendations"] .account-summary:hover .metadata a:hover b {color:black!important}'
			   + '.component[data-component-term="user_recommendations"] .account-summary:hover .username{color:black!important}'
			   + '.component[data-component-term="user_recommendations"] .account-summary:hover .username .js-username:hover{color:black!important}'
			   + '.component[data-component-term="user_recommendations"] .account-summary:hover .username a:hover{color:black!important}'
			   + '.component[data-component-term="user_recommendations"] .account-summary:hover .username s{color:black!important}'
			   + '.component[data-component-term="user_recommendations"] .account-summary:hover .fullname:hover {color:black!important}'
			   + '.component[data-component-term="user_recommendations"] .account-summary:hover .account-group-inner:hover b{color:black!important}'
			   + '.component[data-component-term="similar_user_recommendations"]  .account-summary:hover {background:#F5F5F5 !important;border-radius:5px;}'
			   + '.component[data-component-term="similar_user_recommendations"] .account-summary:hover a{color:black!important}'
			   + '.component[data-component-term="similar_user_recommendations"] .account-summary:hover a:hover{color:black!important}'
			   + '.component[data-component-term="similar_user_recommendations"] .account-summary:hover .metadata {color:black!important}'
			   + '.component[data-component-term="similar_user_recommendations"] .account-summary:hover .metadata a{color:black!important}'
			   + '.component[data-component-term="similar_user_recommendations"] .account-summary:hover .metadata a:hover b {color:black!important}'
			   + '.component[data-component-term="similar_user_recommendations"] .account-summary:hover .username{color:black!important}'
			   + '.component[data-component-term="similar_user_recommendations"] .account-summary:hover .username .js-username:hover{color:black!important}'
			   + '.component[data-component-term="similar_user_recommendations"] .account-summary:hover .username a:hover{color:black!important}'
			   + '.component[data-component-term="similar_user_recommendations"] .account-summary:hover .username s{color:black!important}'
			   + '.component[data-component-term="similar_user_recommendations"] .account-summary:hover .fullname:hover {color:black!important}'
			   + '.component[data-component-term="similar_user_recommendations"] .account-summary:hover .account-group-inner:hover b{color:black!important}'
			   + '.stream-container .js-stream-item[data-item-type="user"]:hover  .content p{color:white;}'
			   + '.stream-container .js-stream-item[data-item-type="user"]:hover  .content p a{color:black;}'
			   + '.stream-container .js-stream-item[data-item-type="user"]:hover  .content p a s{color:black;}'
			   + '.stream-container .js-stream-item[data-item-type="user"]:hover  .content p a:hover{color:black;}'
			   + '.stream-container .js-stream-item[data-item-type="user"]:hover  .content p a:hover b{color:black;}'
			   + '.stream-container .js-stream-item[data-item-type="user"]:hover  .content .stream-item-header:hover{color:black;}'
			   + '.stream-container .js-stream-item[data-item-type="user"]:hover  .content .stream-item-header:hover a{color:black;}'
			   + '.stream-container .js-stream-item[data-item-type="user"]:hover  .content .stream-item-header:hover a .username{color:black;}'
			   + '.stream-container .js-stream-item[data-item-type="user"]:hover  .content .stream-item-header a .username{color:black;}'
			   + '.stream-container .js-stream-item[data-item-type="user"]:hover  .content .stream-item-header a .fullname{color:black;}'
			   + '.stream-container .js-stream-item[data-item-type="user"]:hover  .content .stream-item-header:hover a .fullname{color:black;}'
			   + '.stream-container .js-stream-item[data-item-type="user"]:hover {background: -moz-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; color:white; background: -o-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; background: -ms-linear-gradient(center top , #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; background: -webkit-linear-gradient(top, #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; background: linear-gradient(center top, #39a6f3 0%, #2372aa 100%) repeat scroll 0 0 transparent; }'
		 }

		 //rules hover avatar
		 if ( thmb ){
			rules+= '.tweet .avatar:hover , .profile-modal-header .avatar:hover {height:70px; width:70px;}'
			   + '.size128:hover {height:200px; width:200px; }'
			   + '.size32:hover {height:45px; width:45px;}'
			   + '.size24:hover {height:36px; width:36px;}'
			   + '.component[data-component-term="user_recommendations"] .avatar:hover {height:58px; width:58px;}'
			   + '.component[data-component-term="similar_user_recommendations"]  .avatar:hover {height:42px; width:42px; }'

	}	
		//rules for show action button
		if(showAB){
			rules+= '.tweet-actions {display:inline;}'
			+ '.recent-tweets .tweet .action-reply-container, .recent-tweets .tweet .action-fav-container, .recent-tweets .tweet .action-rt-container, .recent-tweets .tweet .action-open-container .separator, .recent-tweets .tweet .tweet-actions .open-tweet, .discover-item .tweet .tweet-actions .open-tweet{display:inline;}'
		}
		
		 //rules for show menu of tuitmodif
		 if (tbmenu){
			rules+='#-tuitmodif--menu2-:hover {opacity:0.95; top:44px;box-shadow: 0 0 8px #BBBBBB;}'
			   + '#-tuitmodif--menu2- {opacity:0.85; position: fixed; top: 44px;	right:4px; padding: 5px 5px; background: #F9F9F9; color:#333; font-size:12px;text-shadow: none;}' 
			   + '#-tuitmodif--menu-{opacity:0.85; position: fixed; top: 44px;	left:4px; padding: 5px 5px; background: #F9F9F9; color:#333; font-size:12px; text-shadow: none;}' 
			   + '#-tuitmodif--menu-:hover {opacity:0.95; top:44px;box-shadow: 0 0 8px #BBBBBB;}'
			   + '#-tuitmodif--menu- a{text-shadow:none;}'
			   + '#-tuitmodif--menu2- h1 , #-tuitmodif--menu- h1 {color:#444; font-size:12px; text-shadow: none; font-weight: normal;}'
			   + '#-tuitmodif--menu3- a {color:white; font-size:12px; text-shadow: none; font-weight: normal;}'
			   + '#-tuitmodif--menu-:hover {top:44px;box-shadow: 0 0 8px #BBBBBB;}'
			   + '#-tuitmodif--menu2- h1:hover , #-tuitmodif--menu- h1:hover {color:blue;}'
			   + '#-tuitmodif--menu3- a:hover {color:white; text-decoration:none; cursor:pointer;}'
			   + '#-tuitmodif--menu3-:hover {right:1px;}'
			   + '#-tuitmodif--menu3- {position: fixed; bottom: 0px;	margin-bottom: 0; right:-147px; padding: 5px 5px; background: #262626; color:white; font-size:12px;text-shadow: none;}' 
		 }
		 if (alt){
			rules += '#-tuitmodif--menu3-:hover {right:1px;}'
			   + '#-tuitmodif--menu3- a:hover {color:white; text-decoration:none; cursor:pointer;}'
			   + '#-tuitmodif--menu3- a {color:white; font-size:12px; text-shadow: none; font-weight: normal;}'
			   + '#-tuitmodif--menu3- {position: fixed; bottom: 0px;	margin-bottom: 0; right:-147px; padding: 5px 5px; background: #262626; color:white; font-size:12px;text-shadow: none;}' 
			   + '#-tuitmodif--menu2-:hover {bottom:0px;box-shadow: 0 0 8px #BBBBBB;margin-bottom: 0;}'
			   + '#-tuitmodif--menu2- {position: fixed; bottom: -260px;	left:200px; padding: 5px 5px; background: #262626; color:white; font-size:12px;text-shadow: none;}' 
			   + '#-tuitmodif--menu-{position: fixed; bottom: -371px;	left:4px; padding: 5px 5px; background: #262626; color:white; font-size:12px; text-shadow: none;}' 
			   + '#-tuitmodif--menu- a{text-shadow:none;}'
			   + '#-tuitmodif--menu2- h1 , #-tuitmodif--menu- h1 {color:white; font-size:12px; text-shadow: none; font-weight: normal;}'
			   + '#-tuitmodif--menu-:hover {bottom:0px;box-shadow: 0 0 8px #BBBBBB;margin-bottom: 0;}'
			   + '#-tuitmodif--menu2- h1:hover , #-tuitmodif--menu- h1:hover {color:blue;}'
				
		 } 
		 if(!alt && !tbmenu){
			rules += '#-tuitmodif--menu3- , #-tuitmodif--menu2- , #-tuitmodif--menu- {display:none !important;}'
		 }
		 
		 //rules for show time
		 if((alt && time) || (tbmenu && time)){
		 rules+= '#-tuitmodif--time- {bottom: 27px; color:#009dff; font-family:sans-serif; font-size:15pt; right:4px; line-height:20px; position:fixed; text-align:center; z-index:999; border-radius:5px;box-shadow: 0 0 8px #BBBBBB;padding:4px; opacity:0.7; align:center; cursor:default;text-shadow:1px 1px 1px #FFF;}'
				+ '#-tuitmodif--time-:hover {opacity:1;color:#888;box-shadow: 0 0 8px #BBBBBB;text-shadow:1px 1px 1px #FFF;}'
				+ '#-tuitmodif--time- h3{color:#009dff; font-size:12px;text-shadow:1px 1px 1px #FFF;}'
				+ '#-tuitmodif--time-:hover h3{color:#888;text-shadow:1px 1px 1px #FFF;}'
		 }
		 else if(!alt && !tbmenu && time){
		 rules+= '#-tuitmodif--time- {bottom: 4px; color:#888; font-family:sans-serif; font-size:15pt; right:4px; line-height:20px; position:fixed; text-align:center; z-index:999; border-radius:5px;box-shadow: 0 0 8px #BBBBBB;padding:4px; opacity:0.7; align:center; cursor:default;text-shadow:1px 1px 1px #FFF;}'
		 		+ '#-tuitmodif--time-:hover {opacity:1; color:#888;box-shadow: 0 0 8px #BBBBBB;background:#FFF;text-shadow:1px 1px 1px #FFF;}'
				+ '#-tuitmodif--time- h3{color:#888; font-size:12px;text-shadow:1px 1px 1px #FFF;}'
				+ '#-tuitmodif--time-:hover h3{color:#888;text-shadow:1px 1px 1px #FFF;}'
		 }
		 else if(!time){
			rules+= '#-tuitmodif--time-[title="Click To Change Time Format"] {display:none !important;}'
		 }
		 
		 //rules for hide reply button
		 if (rpl){
			rules+= '.tweet .action-reply-container  {display:none !important;}'
		 }
		 
		 //rules for hide retweed button
		 if(rtwd){
			rules+= '.tweet .action-rt-container  {display:none !important;}'
		 }
		 
		 //rules for hide fav button
		 if(fav){
			rules+= '.tweet .action-fav-container {display:none !important;}'
		 }
		 
		 //rules for hide timeline
		 if(del){
			rules+= '.stream-container {display:none !important;}'
                  + '.content-main {background:url(data:image/gif;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkM2QTNGOUZGRTlCNjExRTFBRUI0OTM4N0RBNDJENTYxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM2QTNGQTAwRTlCNjExRTFBRUI0OTM4N0RBNDJENTYxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QzZBM0Y5RkRFOUI2MTFFMUFFQjQ5Mzg3REE0MkQ1NjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QzZBM0Y5RkVFOUI2MTFFMUFFQjQ5Mzg3REE0MkQ1NjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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) no-repeat center #FFF; height:450px; width: 960px !important; box-shadow:inset 0 0 10px #000; border-radius:0 0 90px 90px;}'
			   + '.dashboard { display: none; }'
	           + '.global-nav-inner .container { display:none !important; }'
	           + '#page-container { width: 960px !important; }'
			   + '.header-inner {background:url(data:image/gif;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkUxRTZENUU4RTlDMjExRTE5MjgzRkU5QjRBQUNGRTE0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkUxRTZENUU5RTlDMjExRTE5MjgzRkU5QjRBQUNGRTE0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTFFNkQ1RTZFOUMyMTFFMTkyODNGRTlCNEFBQ0ZFMTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTFFNkQ1RTdFOUMyMTFFMTkyODNGRTlCNEFBQ0ZFMTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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) repeat-x #000; }'
			   + '.header-inner h2 {display:none;}'
		 }

	
	     
		//rules hide avatar
		if ( ava ){
		rules+= '.avatar {display:none !important; border-radius: 0 0 0 0;}'
	       + '.stream-item .content, .permalink-tweet .content { margin-left: 0px;}'
	       + '.account-summary-small .content {margin-left: 0px;}'
	       + '.account-summary .content {margin-left: 0px;}'
		  	 
		
		  }
		   
		if(scrol){
			var domChangeListener = function (event) {
  // the node holding stream items is not present immediately after page load, 
  // so need to check for it on DOMSubtreeModified events
			var streamNode = document.getElementById('stream-items-id');
			if (streamNode) {
				streamNode.addEventListener("DOMSubtreeModified", nodeInserted, false);
				}
			};

			var lastId = -1;
			var eventRemoved = false;
			var mainNode = document.getElementById("page-container");
			if (mainNode) {
				mainNode.addEventListener("DOMSubtreeModified", domChangeListener, false);
			}
			GM_addStyle(".last-new-tweet { border-bottom: 4px solid #2372aa ! important; }");

			function nodeInserted() {
			if (!eventRemoved) {
				mainNode.removeEventListener("DOMSubtreeModified", domChangeListener, false);
				eventRemoved = true;
			}
			var nodes = document.getElementsByClassName('last-new-tweet');
				if (nodes.length > 0) {
					var lastNewTweet = nodes[0];
					var itemId = lastNewTweet.getAttribute("data-item-id");
					if (itemId != lastId) {
						lastId = itemId;
						window.scroll(0,findPos(lastNewTweet));
					}
				}
			}

			function findPos(obj) {
				var curtop = 0;
				if (obj.offsetParent) {
					curtop = obj.offsetTop + obj.offsetParent.offsetTop + obj.clientHeight - window.innerHeight;
				}
			return curtop;
			}
		}
		
		if(autoscrol){
			var _window = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
				if (typeof _window.jQuery === 'undefined') {
				window.setTimeout(updateAll, 200);
				} else {
					var $ = jQuery = _window.jQuery,
					hasFocus = true,
					isEnqueued = false;
		
				function show(el) {
					el.click();
					isEnqueued = false;
				}
		
				rules+='.new-tweets-bar {display:none !important}';

				$(window).on({
					'blur': function() { hasFocus = false; },
					'focus': function() { hasFocus = true; }
				});
		
				$(document).on('DOMNodeInserted', function(event) {
					var el = $(event.target);
					if (el.hasClass('stream-item')) {
						bar = el.children('.new-tweets-bar');
					if (bar.length) {
							if (hasFocus) { show(bar); }
							else if (!isEnqueued) {
								$(window).one('focus', function() { show(bar); });
								isEnqueued = true;
						}
					}
				}
				});
			}
		}
		
	    //rules modified t.co
	    if (tco){
           function tcomodif() {
                 var start = Date.now();
                 var links = document.querySelectorAll("a.twitter-timeline-link:not([data-gm-url-expanded])");

                 var work = [];

                function fix(link, nurl) {
	               link.setAttribute("href", nurl);
	               link.setAttribute("data-gm-url-expanded", "true");
                }


                 for (var i=0;i<links.length;i++){

	             var link = links[i];	
	             var linkText = link.firstChild;

	             var nurl = null;

	             if (nurl = link.getAttribute("data-ultimate-url")) {
	                   fix(link, nurl);
	             } else if (nurl = link.getAttribute("data-expanded-url")) {
	                   fix(link, nurl);
	             }
                 }

            start = Date.now() - start;
            GM_log("processed " + links.length + " items in " + start + "ms:\n" + work.join("\n"));

            }

            setInterval(tcomodif, 0); 
            }
		
		//rules change connect to mention		
		if(ment){
				var globalActions = document.getElementById('global-actions');
				if (globalActions != null) {
					var peopleElements = globalActions.getElementsByClassName('people');
					if (peopleElements.length == 1) {
					var peopleElement = peopleElements[0];
					peopleElement.getElementsByTagName('a')[0].href = "https://twitter.com/mentions";
					peopleElement.getElementsByTagName('a')[0].innerHTML = '<span class="new-wrapper"><i class="nav-people"></i><i class="nav-new"></i></span>Mentions';
					}
				}
			}
			if(!ment){
				var globalActions = document.getElementById('global-actions');
				if (globalActions != null) {
					var peopleElements = globalActions.getElementsByClassName('people');
					if (peopleElements.length == 1) {
					var peopleElement = peopleElements[0];
					peopleElement.getElementsByTagName('a')[0].href = "https://twitter.com/i/connect";
					peopleElement.getElementsByTagName('a')[0].innerHTML = '<span class="new-wrapper"><i class="nav-people"></i><i class="nav-new"></i></span>Connect';
					}
				}
			}
			
	    
	// Update the checkboxes
	document.getElementById( '-tuitmodif--swap-checkbox-' ).checked = GLOBAL.options.swap;
	document.getElementById( '-tuitmodif--widen-checkbox-' ).checked = GLOBAL.options.widen;
	document.getElementById( '-tuitmodif--swiden-checkbox-' ).checked = GLOBAL.options.swiden;
	document.getElementById( '-tuitmodif--removed-checkbox-' ).checked = GLOBAL.options.removed;
	document.getElementById( '-tuitmodif--justtl-checkbox-' ).checked = GLOBAL.options.justtl;
	document.getElementById( '-tuitmodif--trans-checkbox-' ).checked = GLOBAL.options.trans;
	document.getElementById( '-tuitmodif--name-checkbox-' ).checked = GLOBAL.options.name;
	document.getElementById( '-tuitmodif--fixd-checkbox-' ).checked = GLOBAL.options.fixd;
	document.getElementById( '-tuitmodif--foot-checkbox-' ).checked = GLOBAL.options.foot;
	document.getElementById( '-tuitmodif--who-checkbox-' ).checked = GLOBAL.options.who;
	document.getElementById( '-tuitmodif--hopen-checkbox-' ).checked = GLOBAL.options.hopen;
	document.getElementById( '-tuitmodif--stat-checkbox-' ).checked = GLOBAL.options.stat;
	document.getElementById( '-tuitmodif--trend-checkbox-' ).checked = GLOBAL.options.trend;
	document.getElementById( '-tuitmodif--rts-checkbox-' ).checked = GLOBAL.options.rts;
	document.getElementById( '-tuitmodif--fbs-checkbox-' ).checked = GLOBAL.options.fbs;
	document.getElementById( '-tuitmodif--tco-checkbox-' ).checked = GLOBAL.options.tco;
	document.getElementById( '-tuitmodif--ava-checkbox-' ).checked = GLOBAL.options.ava;
	document.getElementById( '-tuitmodif--ment-checkbox-' ).checked = GLOBAL.options.ment;
	document.getElementById( '-tuitmodif--clr-checkbox-' ).checked = GLOBAL.options.clr;
	document.getElementById( '-tuitmodif--thmb-checkbox-' ).checked = GLOBAL.options.thmb;
	document.getElementById( '-tuitmodif--normal-checkbox-' ).checked = GLOBAL.options.normal;
	document.getElementById( '-tuitmodif--rpl-checkbox-' ).checked = GLOBAL.options.rpl;
	document.getElementById( '-tuitmodif--rtwd-checkbox-' ).checked = GLOBAL.options.rtwd;
	document.getElementById( '-tuitmodif--del-checkbox-' ).checked = GLOBAL.options.del;
	document.getElementById( '-tuitmodif--fav-checkbox-' ).checked = GLOBAL.options.fav;
	document.getElementById( '-tuitmodif--scrol-checkbox-' ).checked = GLOBAL.options.scrol;
	document.getElementById( '-tuitmodif--autoscrol-checkbox-' ).checked = GLOBAL.options.autoscrol;
	document.getElementById( '-tuitmodif--time-checkbox-' ).checked = GLOBAL.options.time;
	document.getElementById( '-tuitmodif--showAB-checkbox-' ).checked = GLOBAL.options.showAB;
	
	// Apply the rules!
	var elem = getStyleTag();
	elem.innerHTML = rules;
}

(function(){

/*
This Old retweet and fb share by krankestein
@cecekpawon Traditonal Twitter RT (re-mixed) FF + Chrome
respect for the author :D
*/	
function insertAfter(node,after){after.parentNode.insertBefore(node,after.nextSibling)}
function g(id){if(id && typeof id==='string'){id=document.getElementById(id);}return id||null;}
function c1(q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}
function c2(_q,_el){
  var res=[];var el,els=document.evaluate(_q,_el?_el:document,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
  while (el=els.iterateNext())res.push(el);if (res.length) return res; return false;
}

const yodUpdate = {
  script_id : 89405,
  script_version : '3.8',
  script_pipeId : '7015d15962d94b26823e801048aae95d',
}

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
}

function o_debug(str) {
  if (!debug) return;
  console.log(str);
}

function usoUpdate(el) {
  const s_CheckUpdate = 'YodCheckUpdate' + yodUpdate['script_id'];
  var md = parseInt(new Date().getDate());
  var CheckUpdate = parseInt(getValue(s_CheckUpdate));
  var NeedCheckUpdate = false;
  if (CheckUpdate !== md) {
    setValue(s_CheckUpdate, md);
    el = el ? el : document.body;
    if (el) {
      if (!document.getElementById(s_CheckUpdate)) {
        var s_gm = document.createElement('script');
        s_gm.id = s_CheckUpdate;
        s_gm.type = 'text/javascript';
        s_gm.innerHTML = 'function go' + s_CheckUpdate + '(itm){if(itm.value.items.length){return eval(unescape(itm.value.items[0].content).replace(/&lt;/g,\'<\').replace(/&gt;/g,\'>\').replace(/&amp;/g,\'&\'));}}';
        el.appendChild(s_gm);
      }
      var s_gm = document.createElement('script');
      s_gm.type = 'text/javascript';
      var sSrc = 'http://pipes.yahoo.com/pipes/pipe.run?_id=' + yodUpdate['script_pipeId'];
      sSrc += '&_render=json&_callback=go' + s_CheckUpdate;
      sSrc += '&id=' + yodUpdate['script_id'] + '&ver=' + yodUpdate['script_version'];
      //sSrc += '&redir=yes';
      s_gm.src = sSrc;
      el.appendChild(s_gm);

      NeedCheckUpdate = true;
    }
  }
  else {
    setValue(s_CheckUpdate, md);
  }

  return NeedCheckUpdate;
}

function addslashes(str) {
  return str.replace(/\\/g,'\\\\').replace(/\'/g,'\\\'').replace(/\"/g,'\\"').replace(/\0/g,'\\0');
}
function stripslashes(str) {
  return str.replace(/\\'/g,'\'').replace(/\\"/g,'"').replace(/\\0/g,'\0').replace(/\\\\/g,'\\');
}

function ytrim(s) {
  var str = '';
  if (!(str = s.toString().trim())) return str;
  var lines = str.replace(/^\s+|\s+$/g, '').split(/\s*\n\s*/);
  str = lines.join(' ').replace(/[\s]{2,}/g, ' ');
  return str;
}

function removeEmptyArrayElements(arr) {
   if (typeof arr !== "object") {
      return [];
   } else {
       return arr.filter( function(elem) { return elem !== null } ).map(
         removeEmptyArrayElements)
   }
}

function hasClass(el, cn) {
  try {cn2 = el.className;} catch (err) {return;}
  return (cn2 + " ").indexOf(cn) >= 0;
}

function yodFindParent(el, c, x) {
  var cc, is_class = (x.match(/class/i)) ? true : false;
  var par = el;
  try {cc = (is_class ? par.className : par.id).toString();}
  catch (err) {cc = "";}
  i = 10;
  var pattcontent = new RegExp(c, "gmi");
  while (i--) {
    try {
      if (cc.match(pattcontent)) {break;}
      par = par.parentNode;
      cc = (is_class ? par.className : par.id).toString();
    }
    catch (err) {continue;}
  }
  return par;
}

function addCS(str, id, css, link) {
  if (g(id)) return;
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0) {
    var node = document.createElement(css ? "style" : "script");
    if (id) node.id = id;
    node.type = css ? "text/css" : "text/javascript";
    if (link) node.src = str;
    else node.appendChild(document.createTextNode(str));
    heads[0].appendChild(node);
  }
}

function appendRunJS(fn) {
  var JSGlobal = "";
  var i = 0; do {
    JSGlobal += fn[i++].toString().replace(/^(function+)\s(\w+)(?=\W|\s)/i, '$2=$1') + "\n";
  }
  while (i < fn.length);
  addCS(JSGlobal, "yod_TradRT_Global");
}

function doyodGetBoolOpt(val, def) {
  var str = getValue(val);
  if (typeof str !== "string") {
    str = "";
    if (def) str = def;
    setValue(val, str);
  }
  return parseInt(str);
}

function doyodGetStrOpt(val, def) {
  var str = getValue(val);
  if (typeof str !== "string") str = "";
  str = str.trim();
  if (str.toString() === "?") return "";
  if (!str && def) str = def + "";
  return str.trim();
}

function yod_doRT(screen_name, content, id) {
  //return function (e) {
    var gmbinder, s_gm = document.createElement('script');
    var s_gmbinder = 'yodgmbinder';
    var pattcontent = new RegExp("@" + my_screen_name, "gmi");
    content = escape(ytrim(deEntity(unescape(content))).replace(pattcontent, my_screen_name));
    s_gm.type = 'text/javascript'; s_gm.id = s_gmbinder;
    s_gm.innerHTML = "if (e=$('#"+id+"').find('.cancel-action, .js-prompt-cancel')) e.click(); yodShowTweetBox('" + escape(ytrim(deEntity(unescape(screen_name)))) + "','" + content + "%yod%', '" + valRT + "');";
    document.body.appendChild(s_gm);
    doyodRTFit140(true);
    setTimeout(function(){
      if (gmbinder = g(s_gmbinder)) {
        document.body.removeChild(gmbinder);
      }
    }, 1000);
  //}
}
/*
function inject_button(target, link) {
  var target2 = c1('.//ul[contains(@class,"dropdown-menu")]', target.parentNode);
  var b = document.createTextNode(link._label);

  var span = document.createElement('span');
  span.appendChild(b); //label

  var a = document.createElement('a');
  a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', link._title); a.className = "yodInjButt";
  if (link._class) a.className += " " + link._class;
  if (link._click) a.addEventListener('click', link._click, false);
  a.appendChild(span);

  var a2 = document.createElement('li');
  a2.appendChild(a);

  if (!target2) {
      if (!(target2 = c1('.//ul[contains(@class,"yodRTUL")]', target.parentNode))) {
      var target2 = document.createElement('ul');
      target2.className = "yodRTUL";
      target.parentNode.appendChild(target2);
    }
  }

  if (target2) target2.appendChild(a2);
}
*/
function expand_link(el) {
  var links = c2('.//a[@data-expanded-url]', el);
  for (a in links) {
    var a1 = links[a].getAttribute('data-ultimate-url');
    var a2 = links[a].getAttribute('data-expanded-url');
    if (a1 || a2) links[a].innerHTML = a1 ? a1 : a2;
  }
}

function deEntity(str) {
  return str.replace(/<\/?[^>]+>/gi, '')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')/*
  .replace(/&#39;/gi, '\'')
  .replace(/"/gi, '')*/;
}

function translate_link(tt, shortlink) {
  var is_entity = tt.textContent.match(/(&lt|&gt|&amp|&quot|#[0-9]);/gi) ? true : false;
  yodRTDiv.innerHTML = tt.innerHTML;
  // collect links
  var links = c2(".//a[@data-expanded-url]", yodRTDiv);
  for (i=0; i<links.length; i++) {
    var link = links[i];
    var a1 = link.getAttribute('data-ultimate-url');
    var a2 = link.getAttribute('data-expanded-url');
    if (longURL = a1 || a2) {
      var newLink = document.createTextNode(shortlink? link.href : longURL);
      link.parentNode.replaceChild(newLink, link);
      link.href = longURL;
    }
  }

  var c = deEntity(unescape(yodRTDiv.innerHTML));
  yodRTDiv.innerHTML = "";
  if (is_entity) {
    tt.innerHTML = c;
    //o_debug(tt.textContent);
  }
  return c;
}

function translate_link2(tt) {
  if (hasClass(tt, "yodDone2")) return;
    tt.className += " yodDone2";
    // collect links
    var links = c2('.//a[@data-expanded-url and not(contains(@class,"yodDone3"))]', tt);
    for (var i in links) {
      var link = links[i];
        setTimeout(function(){
          if (hasClass(link, "yodDone3")) return;
          var a1 = link.getAttribute('data-ultimate-url');
          var a2 = link.getAttribute('data-expanded-url');
          //o_debug(a2+' -> '+a1);
          if (a2) link.className += " yodDone3";
          if (longURL = a1 || a2) {
            link.href = link.title = longURL;
          }
        }, 2000);
    }
}
/*
function facebookShare(url, txt, ava) {
  var title = summary = encodeURIComponent(txt.replace(/[\r\n]/, " ").replace(/\s{2,}/g, " "));
  var facebookLink = "http://www.facebook.com/sharer.php?s=100";
  var tl = '&p[title]='+title;
  var strUrl = '&p[url]='+encodeURIComponent(url);
  var strSummary = '&p[summary]='+summary;
  var stImage = "";
  if (ava) stImage = '&p[images][0]='+encodeURIComponent(ava);
  var shareUrl = facebookLink+tl+strUrl+strSummary+stImage;
  window.open(shareUrl);
}
*/
function compareDate(e) {
  key = "data_item_id";
  try {data_item_id = e.getAttribute('data-item-id');} catch (err) {data_item_id = 0;}
  if (!data_item_id) return;
  val = doyodGetBoolOpt(key, 1);
  if (data_item_id > val) {
    setValue(key, data_item_id);
    return true;
  }
}

function yod_make_RT2(e) {
  if (!(entry =
    c1('.//div[contains(@class,"js-stream-tweet")]', e)
    || c1('.//div[contains(@class,"twttr-dialog-content")]', e)
  )) return;

  if (!(yodRTDiv = c1('.//div[contains(@id,"yodRTDiv")]'))) return;

  var tt;
  if (!(tt = (
      c1('.//p[contains(@class,"js-tweet-text")]', entry) ||
      c1('.//div[contains(@class,"tweet-text")]', entry)
    ))) return;

  // screen name
  var screen_name;
  if (multi_tweet = c1('.//div[contains(@class,"stream-item-content")]', entry)) {
    screen_name = multi_tweet.getAttribute('data-screen-name');
  } else { //tweet
    if (tweet = entry) {
      screen_name = tweet.getAttribute('data-screen-name');
    }
  }

  if (!screen_name) {
    if (screen_name = c1('.//span[contains(@class,"twttr-reply-screenname")]', tt.parentNode))
      screen_name = screen_name.textContent;
  }

  // RT text
  var content = translate_link(tt);

  if (!screen_name || !content) return;

  return yod_doRT(screen_name, content, e.id);
}

function yod_make_RT(entry, newtweet) {
  if (!entry) return;
  if (hasClass(entry, "yodDone")) return;

  valMutedopt = doyodGetBoolOpt("yodMutedopt");

  if (valMutedopt) {
    if (c1('.//div[contains(@class,"mini-profile")]')) {
      if (newtweet) {
        if (str = entry.getAttribute('data-user-id')) {
          mutesx = valMuted.split(",");
          if (searchStringInArray(str, mutesx)) {
            entry.className += " yodHide";
          } else if (c = c1('.//*[contains(@class,"js-retweet-text")]/a', entry)) {
            if (str = c.getAttribute('data-user-id')) {
              mutesx = valMuted.split(",");
              if (searchStringInArray(str, mutesx)) {
                entry.className += " yodHide";
              }
            }
          }
        }
      }
    }
  }

  var img, ava;
  if (img = c1('.//img[contains(@class,"js-action-profile-avatar")]', entry)) {
    ava = img.src;
  }

  if (!hasClass(entry, "yodDone2")) {
    if (newtweet) newtweet = compareDate(entry);
    if (newtweet) {
      var data_mentions = entry.getAttribute('data-mentions') || "";
      //o_debug(data_mentions);

      var pattcontent = new RegExp("\s?" + my_screen_name + "\s?", "gm");
      if (data_mentions.match(pattcontent)) {
        els = c2('.//*[contains(@class,"forme")]');
        for (var a in els) {
          if (e = els[a])
            e.className = e.className.replace(/forme/gm, '');
        }
        playsound();
        valMarkMention = doyodGetBoolOpt("yodMarkMention");
        if (valMarkMention) entry.className += "forme";
      }
    }

    entry.addEventListener('DOMSubtreeModified', function () {
      translate_link2(entry);
    }, false);
  }

  // add parsed class
  entry.className += " yodDone";
/*
  // RT text
  var content = translate_link(tt);

  var link = {
    _class: 'yod-old-style-retweet',
    _click: yod_doRT(screen_name, content),
    _label: '#[RT]',
    _title: 'Traditional ReTweet'
  };

  inject_button(target, link);

  // Re RT text
  var content = translate_link(tt, true);

  // FB Share
  var fbURL, fbTitle = 'Twitter @' + screen_name + ' ; ' + content.trim();

  if (fbURL = (
    c1('.//a[contains(@class,"tweet-timestamp")]', entry) ||
    c1('.//a[contains(@class,"embed-link")]', entry) ||
    c1('.//a[contains(@class,"js-open-close-tweet")]', entry)
  )) {
    var fbURL1 = fbURL.href.replace(/\/#!/, '').replace(/\/embed$/, '');

    var link = {
      //_click: function(){window.open(fbURL1)},
      _click: function(){facebookShare(fbURL1, fbTitle, ava);return false;},
      _label: '#[FB]',
      _title: 'Facebook Share'
    };

    inject_button(target, link);
  }*/
}

function attachScroll(div, title, xchar, fn) {
  var el = document.createElement('div');
  el.textContent = xchar;
  el.setAttribute('style', 'height: 15px; width: 10px; float:left;');
  el.setAttribute('title', 'Scroll page to ' + title);
  el.addEventListener("click", fn, false);
  div.appendChild(el);
}

function doAdvTop() {
  if (logo = g("logo") || g("global-actions")) {
    div = document.createElement('div');
    div.id = 'yodAdvTop';
    var sClass = 'Hide';
    if (valAdvTop) {
      sClass = 'Show';
    }
    div.className = 'yod' + sClass;
    attachScroll(div, 'Top', '\u25B2', function(){scroll(0, 0);});
    attachScroll(div, 'Bottom', '\u25BC', function(){scroll(0, document.body.scrollHeight);});
    insertAfter(div, logo);

    // Extract DM
    if (dm = c1('.//a[contains(@class,"js-dm-dialog")]/span')) {
      var el = document.createElement('div');
      el.id = "yodmsg";
      el.innerHTML = dm.innerHTML;
      dm.addEventListener("DOMSubtreeModified", yod_extDM, true);
      insertAfter(el, div);
    }

    //checkDM();
  }
}

var yod_runScript_RT = function(u,hid) {
  //var $;

  if (typeof jQuery !== 'undefined') {
    $ = jQuery;
  } else {
    using("core/jquery", function(x){$=x});
  }

  var yodump = $('<div/>', {id: 'yodump', class: 'yodHide'}).appendTo('body');

  //var hh = my_screen_name;

  yodGetTweetBox = function() {
    return $("#yod_TweetBox");
  }

  yodcleanSpace = function(txt) {
    return txt.replace(/[\r\n]/, " ").replace(/\s{2,}/g, " ").trim();
  }

  yodHailTweetBox = function(txa, txt) {
    if (txa = $("#"+txa).parent()) {
      if (!(txa = txa.find('.rich-editor'))) return;
      txa.focus().change();
      if (txt) txa.html(yodcleanSpace(deEntity(unescape(txt))));
      txa.focus().change();
    }
  }

  yodShowTweetBox = function(s,c,yodrt) {
    var content = "@" + s + ": " + yodcleanSpace(deEntity(unescape(c))).replace(/%yod%/ig, "");
    try {
      if (typeof twttr !== 'undefined') {
        new twttr.widget.TweetDialog({
          draggable:true,
          defaultContent:content,
          origin:"yod-Traditional-RT",
          template:{title:_("ReTweet @"+s+" (Trad. ReTweet)")}
        }).open().focus().change();

        setTimeout(function() {
          if (txa = yodGetTweetBox()) {
            txa.val(yodrt + " " + txa.val());
            yodHailTweetBox();
          }
        }, 3);
        return;
      }
    } catch(err) {}

    if (nt = $("#global-new-tweet-button")) {
      nt.click();

      var txa = $("#global-tweet-dialog .tweet-box:visible, #tweet_dialog .twitter-anywhere-tweet-box-editor:visible");
      //var txa = yodGetTweetBox();
      //txa.val(yodrt + " " + content);
      txa.html(yodrt + " " + content).change();
      yodHailTweetBox();
/*
      setTimeout(function() {
        txa.get(0).setSelectionRange(0, 0);
      }, 3);*/
    }
  }

  yodInsSmiley = function(el, text) {
    var txa;
    if (!(txa = yodGetTweetBox())) txa = $("#"+el);
    if (!txa) return false;
    if (!(txb = txa.get(0))) return false;
    if (txb.tagName !== "TEXTAREA") return false;
    if (text && txa) {
      var txt = " " + deEntity(unescape(text)) + " ";/*
      if (txb.selectionStart || txb.selectionStart == "0") {
        var startPos = txb.selectionStart; var endPos = txb.selectionEnd; var scrollTop = txb.scrollTop;
        txb.value = txb.value.substring(0, startPos) + txt + txb.value.substring(endPos, txb.value.length);
        txa.focus().change();
        txb.selectionStart = startPos + txt.length; txb.selectionEnd = startPos + txt.length;
        txb.scrollTop = scrollTop;
        yodHailTweetBox(txb.id);
      }*/

      if (!(txa = checkWrap(txb))) return;//alert(txa.innerHTML);
      txa.focus();
      document.execCommand('insertText', false, txt);
      return false;
    }
  }

  expandNewTweet = function(text) {
    if (typeof $ !== 'undefined') {
      $(text).click();
    }
  }

  checkDM = function() {
    var m_last, m_u_readed, m_u_readed = 0;
    if (dm = $('a.js-dm-dialog span'))
      setInterval(function() {
        $.getJSON('/messages?since_id=0', function(data) {
          if (!data.html) return;
          m_readed = parseInt(localStorage.getItem("__DM__:lastReadMessageId"));
          m_u_readed = parseInt(localStorage.getItem(u + "lastReadMessageId"));
          if (m_readed > m_u_readed) m_u_readed = m_readed;
          localStorage.setItem(u+"lastReadMessageId", m_readed);
          if (yodump) {
            $(yodump).html(data.html);
            ff = $(yodump).find(".dm-thread");
            if (ff.length) {
              if (xlast = ff.first().attr('data-thread-id')) {
                $.getJSON('/messages/with/' + xlast, function(xdata) {
                  if (!xdata.html) return;
                  $(yodump).html(xdata.html);
                  ff = $(yodump).find(".received");
                  if (ff.length) {
                    l = ff.last();
                    if (d = l.attr('data-message-id')) {
                      m_last = parseInt(d);
                      localStorage.setItem(u+"lastReadMessageId", m_u_readed);
                      dm.html((m_last > m_u_readed) ? "DM*" : "");
                    }
                  }
                });
              }
            }
          }
        });
      }, 20000);
  }

  if(u && hid) checkDM();
}

function searchStringInArray(str, strArray) {
  x = 0; z = strArray;
  for (var j=0; j<strArray.length; j++) {
    s = strArray[j];
    if (s.match(str)) {
      x++; z.splice(z.indexOf(s), 1);
    }
  }
  if (x) {
    str = str.trim(); z.push(str); strArray = z;
    return str;
  }
  //return;
}

function checkMute(id, u, e, check) {
  valMuted = doyodGetStrOpt("yodMuted");
  mutesx = valMuted.split(",");
  a = []; b = mutesx;
  for (var i in mutesx) {
    s = "" + mutesx[i];
    //if (x = s.match(/[0-9]{8,}/)) a.push(x[0]);
    if (!s.match(/[0-9]{8,}/)) b.splice(mutesx.indexOf(s.trim()), 1);
  }
  //mutesx = a;
  //if (x = b.indexOf(id) > -1) {
  if (x = searchStringInArray(id, b)) {
    if (check) {
      e.innerHTML = "<strong>UM</strong>";
      e.title = "UN-Mute this user";
    } else {
      e.innerHTML = "<strong>M</strong>";
      e.title = "Mute this user";
      b.splice(b.indexOf(x), 1);
    }
  } else {
    if (check) {
      e.innerHTML = "<strong>M</strong>";
      e.title = "Mute this user";
    } else {
      e.innerHTML = "<strong>UM</strong>";
      e.title = "UN-Mute this user";
      if (!check) b.push(u);
    }
  }

  removeEmptyArrayElements(b);
  return b;
}

function starter() {
  if (g("yod_RT_CSS")) return;

  doAdvTop();

  appendRunJS([c1, checkWrap, deEntity]);
  addCS("(" + yod_runScript_RT + ")(\""+my_screen_name+"\",\""+avahash+"\");", "yodShowTweetBoxHeaderScript");

  var mycss = "\
.xavatar[src*=\".gif\"]{display:none!important}\
.yodInjButt{margin-left: 5px!important;}\
.dm-dialog .twttr-dialog-inside, .dm-tweetbox {height:auto!important;}\
.dm-dialog .dm-tweetbox .tweet-box {padding: 0!important;height:auto!important;}\
.yodLegend legend{margin:auto!important;line-height:inherit!important;font-size:12px!important;font-weight:bold!important;text-align: center!important; padding: 0 5px!important; width: auto!important;border:none !important;}\
.yodLegend fieldset{border:none;}\
.yodLegend .tablex{font-size:11px!important;margin: 5px auto; width: 98%;}\
.yodLegend .tablex ul {text-align: center;}\
.yodLegend ul:not(:last-child) {margin-bottom:10px!important;}\
.yodLegend .tablex li {display: inline-block;cursor:pointer!important;min-width:15%;padding: 2px 0;}\
.yodLegend .tablex li:hover {font-size: 20px;font-weight: bold;}\
.yodLegend .tablex > div {display: inline-table; margin-right:5px}\
.yodLegend input {margin-right:5px;}\
.yodLegend label{margin:0!important;}\
.yodShow {display: block !important;}\
.yodHide {display: none !important;}\
.fShow {border-top:solid 1px #CCC !important;}\
.fHide {}\
#yodRTFit140Auto{margin-bottom: -5px;}\
#yodSpace{padding: 10px 20px 20px;text-align: center}\
#yodSpace > div:not(:first-child) {margin-top:10px}\
#yodSpace * {cursor:pointer}\
#yodSpace .btn {padding:2px 5px!important}\
#yodRTCopyLeft{font-size:11px; text-align: center;border-top: 1px solid #CCC;}\
#yodRTOption > div {display: inline-table; margin-right:5px}\
#ip_yodRTOpt_RTTxt {border:1px solid #CCC!important;width:50px!important;padding:0 3px!important}\
#yodRTDiv{display:none;overflow:hidden;}\
#yodmsg{display:inline;}\
#yodmsg > span {\
font-weight: bold;float: right;min-width: 7px;padding: 0 9px;color: white;background-color: #58B3F0; margin:10px auto; border-radius: 9px;}\
span.geo-text{width:auto!important;}\
#yod_tw_id2 {background-color:black;color:white;padding:2px;}\
#yod_tw_id {color:red;}\
.yodSpace_ireply{padding: 5px 0 10px;}\
.yodSpace_ireply_wrapper{text-align: center;}\
.yodSpace_ireply_wrapper > div {display:inline-table;margin: 0 2px;}\
.forme {background-color: rgba(255,255,0,.3);}\
#yodAdvTop{color:#FFF;width: 10px; margin: 5px auto; padding-right: 5px; cursor: pointer; float: left;}\
.yodRTUL {float: left; margin-right: 10px;}\
.yodRTUL, .yodRTUL li {display: inline;}\
.permalink-tweet .yodRTUL {margin-top: 8px;}\
.btn.yod-rt{float:left!important;}\
.tx_muted{margin-top: 10px;}\
.tx_muted textarea{width: 475px;max-width: 475px;cursor:auto!important}\
.yodmute{cursor: pointer}\
";


  mutesx = valMuted.split(",");


  //home
  if (c1('.//div[contains(@class,"mini-profile")]')) {/**/
    if (valMutedopt) {
      for (var i in mutesx) {
        s = "" + mutesx[i];
        if (s = s.match(/[0-9]{8,}/))
          mycss += "*[data-user-id=\"" + s[0] + "\"]{display:none!important;}\r\n";
      }
    }
  } else {
    if (el = c1('.//ul[contains(@class,"js-mini-profile-stats")]')) {
      if (s = c1('.//div[contains(@class,"profile-card-inner")]')) {
        if (tw_id = s.getAttribute('data-user-id')) {
          if (debug && !(g('yod_tw_id'))) {
            p = document.createElement('div');
            p.id = 'yod_tw_id';
            p.innerHTML = tw_id;
            s.appendChild(p);
          }

          u = tw_id + " (" + s.getAttribute('data-screen-name') + ")";
          e_mute_w = document.createElement('li');
          var e_mute = document.createElement('a');
          mutesx = checkMute(tw_id, u, e_mute, 1);
          e_mute.className = "yodmute stats";
          //str = fid
          e_mute_w.appendChild(e_mute);

          e_mute.addEventListener('click', function(){
            mutesx = checkMute(tw_id, u, this);
            valMuted = mutesx.join(",");
            if (el = g('tx_yodMuted')) el.value = valMuted;
            setValue("yodMuted", valMuted);
            return false;
          }, false);
          el.appendChild(e_mute_w);
        }
      }
    }
  }

  addCS(mycss, "yod_RT_CSS", 1);

  //create Slave
  yodRTDiv = document.createElement('div');
  yodRTDiv.id = 'yodRTDiv';
  document.body.appendChild(yodRTDiv);

  setTimeout(function() {
    if (el = c1('.//div[contains(@class,"permalink-tweet-container")]')) {
      watchreply(el);
    }
    yod_render(1);
  }, 5000);
}

function yod_render(newtweet) {
  els = c2('.//div[contains(@class,"js-actionable-tweet") and not(contains(@class,"yodDone"))]');
  for (a in els) {
    yod_make_RT(els[a], newtweet);
  }
}

function yod_extDM(e) {
  var el, el2, yodmsg;
  if (el = e.currentTarget) {
    if (yodmsg = g("yodmsg")) {
      el2 = parseInt(el.textContent) || 0;
      yodmsg.innerHTML = "";
      yodmsg.appendChild(el.cloneNode(true));
      if (hasClass(yodmsg, "yodDone")) {
        yodmsg.className = "";
      }
      else {
        yodmsg.className += " yodDone";
        //if (el2 && (parseInt(countMsg) < el2)) playsound();
        //countMsg = el2;
        if (el.innerHTML) playsound();
      }
    }
  }
}

function GetTxtBox() {
  return g('yod_TweetBox') || c1('.//textarea[contains(@class,"tweet-box-")]');
}

function HailTxtBox(id, txt) {
  var s_gm_counter = 'gm_counter';
  if (gm_counter = g(s_gm_counter)) {
    document.head.removeChild(gm_counter);
  }
  if (!id) id = "";
  if (!txt) txt = "";
  addCS('yodHailTweetBox(\'' + id + '\', \'' + escape(txt) + '\');', s_gm_counter);
}

function doyodRTClean(all,txt) {
  var txt2 = "";
  if (!txt) txt = GetTxtBox();
  else txt2 = txt.id;
  if (txt.tagName === "TEXTAREA") {
    if (!(txt = checkWrap(txt))) return;
    if (all) txt.innerHTML = "";
    else txt.innerHTML = txt.textContent.trim().replace(/\s{2,}/g, " ");
    //txt.focus().change();
    HailTxtBox(txt2);
  }
}

function doyodRTFit140(f,txt) {
  var txt2 = "";
  if (!txt) txt = GetTxtBox();
  else txt2 = txt.id;
  if (txt.tagName === "TEXTAREA") {
    if (!(txt = checkWrap(txt))) return;
    txt.innerHTML = txt.textContent.trim().replace(/\s{2,}/g, " ").replace(/%yod%/ig, "");
    if (doyodGetBoolOpt("yodRT_auto140")) f = false;
    if (!f && (txt.textContent.length > 140)) {
      txt.textContent = txt.textContent.substr(0, 138) + "..";
    }
    HailTxtBox(txt2);
  }
  return false;
}

function toggleShow(el, id) {
  var sClass = 'Hide'; var state = 0;
  if (el.className.match(/yodHide/)) {
    sClass = 'Show'; state++;
  }
  setValue(id, state);
  el.parentNode.className = 'f' + sClass;
  el.className = el.className.replace(/(yodHide|yodShow)/, 'yod' + sClass);
}

function buildEmoTable(id, arr) {
  var i, em, str = '<ul>';
  for (i in arr) {
    if (em = arr[i].trim()) {
      str += '<li onclick="javascript:yodInsSmiley(\''+id+'\', \'' + escape(em) + '\');return false;">' + em + '</li>';
    }
  }
  str += '</ul>';
  return str;
}


function checkWrap(t) {
  if (!t) return;
  return c1('.//div[contains(@class,"rich-editor")]', t.parentNode);
}

function updateTxa(id, s) {/*
  var txai = g(id);
  var txt = txai.value.replace(/^(reply[^@]+)/i, "").trim();
  txt = txt + ": " + s.trim();
  HailTxtBox(id, txt);*/
  var txai = g(id);
  if (!(txai = checkWrap(txai))) return;
  txai.innerHTML = txai.textContent;
  var txt = txai.innerHTML.replace(/^(reply[^@]+)/i, "").trim();
  txt = txt + " " + s.trim();
  HailTxtBox(id, txt);
}

function watchreply(e) {
  var e = e.currentTarget || e;
  var e = e.parentNode;
  if (c1('.//div[contains(@class,"yodSpace_ireply")]', e)) return;
  if (!(txa = c1('.//*[contains(@id,"tweet-box-reply")]', e))) return;
  if (!(target = yodFindParent(txa, 'inline-reply', 'class'))) return;
  if (!(y = yodFindParent(target, 'expansion', 'class')))
    if (!(y = yodFindParent(target, 'permalink', 'class'))) return;

  var tmp, elwrs, elwr, p_t, p = y.cloneNode(true);
  if (!(elwrs = c2('.//*[contains(@class,"tweet-text")]', p))) return;

  for (i in elwrs) {
    if (!(
      hasClass(elwrs[i].parentNode, "opened-tweet") ||
      hasClass(elwrs[i].parentNode.parentNode, "opened-tweet"))
    ) continue;
    elwr = elwrs[i];
  }

  //if (elwr = c1('.//*[contains(@class,"js-tweet-text")]', p)) {
  if (elwr) {
    setTimeout(function(){
      if (txa = checkWrap(txa))
        txa.textContent += ":";
    }, 500);

    expand_link(elwr);

    var div = document.createElement("div");
    div.className = "yodSpace_ireply";
    var div2 = document.createElement("div");
    div2.className = "yodSpace_ireply_wrapper";

    // Fit 140 - Cut Text to 140 char length
    var a = document.createElement("a");
    a.setAttribute('data-target', txa.id);
    a.innerHTML = 'Fit 140'; a.className = 'btn'; a.id = "yodRTFit140";
    a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', "Fit 140");
    a.addEventListener('click', function(){
      doyodRTFit140(false, g(this.getAttribute('data-target')));
      return false;
    }, false);
    var div3 = document.createElement("div");
    div3.appendChild(a); div2.appendChild(div3);

    // Clean - freeup space
    var a = document.createElement("a");
    a.setAttribute('data-target', txa.id);
    a.innerHTML = 'Clean'; a.className = 'btn'; a.id = "yodRTClear";
    a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', "Free Space Tweet TextBox");
    a.addEventListener('click', function(){
      doyodRTClean(false, g(this.getAttribute('data-target')));
      return false;
    }, false);
    var div3 = document.createElement("div");
    div3.appendChild(a); div2.appendChild(div3);
    div.appendChild(div2);

    var a = document.createElement("a");
    a.className = 'btn'; a.innerHTML = 'Copy Reply';
    a.setAttribute('data-target', txa.id);
    a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', "Copy current text reply");
    a.addEventListener('click', function() {
      updateTxa(this.getAttribute('data-target'), elwr.textContent);
      return false;
    }, false);
    var div3 = document.createElement("div");
    div3.appendChild(a); div2.appendChild(div3);

    div.appendChild(div2);
    //p_t.parentNode.insertBefore(div, p_t);
    insertAfter(div, target);
  }
}

function yodInlineReply(e) {
  e.addEventListener("DOMNodeInserted", function(e){watchreply(e);} , true);
}

function yodFindReply(el, rep, txa) {
  if (!(par = yodFindParent(el, 'yodSpace', 'id'))) return;
  var act = "";/*
  if (el = c1('.//span[contains(@class,"name")]', rep)) {
    act = el.textContent.trim();
  }*/
  var p = rep.cloneNode(true);
  if (el = c1('.//*[contains(@class,"js-tweet-text")]', p)) {
    expand_link(el);
    //txa.value += " " + act + ": " + el.textContent.trim();
    if (txa = checkWrap(txa)) {
      txa.innerHTML += ": " + el.textContent.trim();
      if (doyodGetBoolOpt("yodRT_auto140")) doyodRTFit140();
      doyodRTClean();
    }
    return false;
  }
}

function yod_goDiag(e, re) {
  var elx, target, txt;
  elx = re || e.currentTarget;
  if (e2 = c1('.//div[contains(@id,"retweet-dialog")]', elx)) return yod_rtDiag(e, e2);
  if (elx.tagName) {
    if (!(txt = c1('.//textarea', elx))) return false;
    placed = g("yodRTOption");

    // new
    if (!(target = c1('.//div[contains(@class,"modal-body")]', elx)))
      // old
      if (!(target = c1('.//div[contains(@class,"tweet-box")]', elx)))
        return false;

    // new
    if (!(rep = c1('.//div[contains(@class,"modal-footer")]', elx)))
      // old
      rep = c1('.//div[contains(@class,"twttr-dialog-reply-footer")]', elx);

    var vis = "none";
    if (yodRTCopyReply = g("yodRTCopyReply")) {
      if (yodRTCopyReply && rep) {
        if (rep.innerHTML) vis = "inline-table";
      }
      yodRTCopyReply.setAttribute("style", "display:"+vis);
    }

    // Inject Copy Reply button
    if (target && placed && rep/**/ && !g('yodRTCopyReply')) {
      if (!txt) return false;
      var div2 = document.createElement("div");
      div2.id = "yodRTCopyReply";
      var a = document.createElement("a");
      a.className = 'btn'; a.innerHTML = 'Copy Reply';
      a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', "Copy current text reply");
      a.addEventListener('click', function(){
        yodFindReply(this, rep, txt);
        return false;
      }, false);
      div2.appendChild(a);
      placed.appendChild(div2);
    }

    if (placed && !g('yod_TweetBox')) {
      txt.id="yod_TweetBox";
    }

    if (placed) {
      if (el = g('tx_yodMuted')) el.value = doyodGetStrOpt("yodMuted");
      return false;
    }

    // Inject Our Space to Target
    if (target) {
      var div = document.createElement("div");
      div.id = "yodSpace";
      var div2 = document.createElement("div");
      div2.id = "yodRTOption";

      // Fit 140 - Cut Text to 140 char length
      var a = document.createElement("a");
      a.innerHTML = 'Fit 140'; a.className = 'btn'; a.id = "yodRTFit140";
      a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', "Fit 140");
      a.addEventListener('click', function(){
        doyodRTFit140();
        return false;
      }, false);
      var div3 = document.createElement("div");
      div3.appendChild(a); div2.appendChild(div3);

      // Clear TweetBox
      var a = document.createElement("a");
      a.innerHTML = 'x'; a.className = 'btn'; a.id = "yodRTClear";
      a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', "Clear Tweet TextBox");
      a.addEventListener('click', function(){
        doyodRTClean(1);
        return false;
      }, false);
      var div3 = document.createElement("div");
      div3.appendChild(a); div2.appendChild(div3);
      div.appendChild(div2);

      // Clean - freeup space
      var a = document.createElement("a");
      a.innerHTML = 'Clean'; a.className = 'btn'; a.id = "yodRTClean";
      a.setAttribute('href', 'javascript:void(0);'); a.setAttribute('title', "Free Space Tweet TextBox");
      a.addEventListener('click', function(){
        doyodRTClean();
        return false;
      }, false);
      var div3 = document.createElement("div");
      div3.appendChild(a); div2.appendChild(div3);
      div.appendChild(div2);

      // Emoticons Table
      var div2 = document.createElement("div");
      div2.id = "yodRTEmo";
      div2.className = "yodLegend";
      var state = doyodGetBoolOpt(div2.id);
      var v_valEmote = state ? "Show" : "Hide";
      str = '<fieldset class="f' + v_valEmote + '"><legend align="center" title="Toggle Show-Hide">[ Emoticons ]</legend><div class="tablex yod' + v_valEmote + '">';
      str += buildEmoTable(txt.id, symbols);
      str += buildEmoTable(txt.id, symbols_utf);
      str += '</div></fieldset>';
      div2.innerHTML = str;
      div.appendChild(div2);

      // OPTION Table
      var div2 = document.createElement("div");
      div2.id = "yodOPTION";
      div2.className = "yodLegend";
      var state = doyodGetBoolOpt(div2.id);
      var v_valOption = state ? "Show" : "Hide";
      str = '<fieldset class="f' + v_valOption + '"><legend align="center" title="Toggle Show-Hide">[ OPTIONS ]</legend><div class="tablex yod' + v_valOption + '">';

      v_valRT = valRT ? valRT : "?";
      str += '<div id="yodRTTxt"><label title="Opt RT Text ( \'?\' for no Prefix )">RT Text <input id="ip_yodRTOpt_RTTxt" name="ip_yodRTOpt_RTTxt" type="text" value="' + v_valRT + '"></label></div>';

      checked = doyodGetBoolOpt("yodRT_auto140") ? ' checked="checked"' : '';
      str += '<div><label title="Auto cut 140 char"><input id="cb_yodRTOpt_auto140" name="cb_yodRTOpt_auto140" type="checkbox" ' + checked + '>Auto140</label></div>';

      checked = doyodGetBoolOpt("yodAdvTop") ? ' checked="checked"' : '';
      str += '<div><label title="Top Nav Scroller"><input id="cb_yodAdvTop" name="cb_yodAdvTop" type="checkbox" ' + checked + '>Top Nav</label></div>';

      checked = doyodGetBoolOpt("yodPlaySound") ? ' checked="checked"' : '';
      str += '<div><label title="Play Sound on new mention"><input id="cb_yodPlaySound" name="cb_yodPlaySound" type="checkbox" ' + checked + '>Sound</label></div>';

      checked = doyodGetBoolOpt("yodMarkMention") ? ' checked="checked"' : '';
      str += '<div><label title="Colorize on new mention"><input id="cb_yodMarkMention" name="cb_yodMarkMention" type="checkbox" ' + checked + '>Mark @</label></div>';

      checked = doyodGetBoolOpt("yodMutedopt") ? ' checked="checked"' : '';
      str += '<div><label title="En/disable mute user noise"><input id="cb_yodMutedopt" name="cb_yodMutedopt" type="checkbox" ' + checked + '>Mute</label></div>';

      str += '';

      v_valMuted = valMuted ? valMuted : "";
      str += '<div class="tx_muted"><textarea id="tx_yodMuted" rows="4">' + v_valMuted + '</textarea></div></div></fieldset>';
      div2.innerHTML = str;
      div.appendChild(div2);

      // Footer Copyleft
      var div2 = document.createElement("div");
      div2.id = "yodRTCopyLeft";
      div2.innerHTML = '<span class="copyleft">\
      Done by <a href="http://blog.krakenstein.net" target="_blank" title="Dev Blog">Cecek Pawon 2010</a> \
      (<a href="http://twitter.com/cecekpawon" title="Dev Twitter">@cecekpawon</a>) \
      w/ <a href="http://userscripts.org/' + yodUpdate['script_id'] + '" target="_blank" title="Script Page">\
      Traditional ReTweet (v' + yodUpdate['script_version'] + ')</a>\
      </span>';
      div.appendChild(div2);

      insertAfter(div, target);

      // tx_yodMuted Events
      if (tx_yodMuted = g("tx_yodMuted")) {
        evts = ["blur","change","click","focus","input","keydown","keypress","keyup","mousedown","mouseup","paste"];
        for (a in evts) {
          tx_yodMuted.addEventListener(evts[a], function(){
            valMuted = this.value;
            setValue("yodMuted", valMuted);
            return false;
          }, false);
        }
      }

      // cb_yodMutedopt Events
      if (cb_yodMutedopt = g("cb_yodMutedopt")) {
        cb_yodMutedopt.addEventListener('click', function(){
          setValue("yodMutedopt", this.checked ? 1 : 0);
          return false;
        }, false);
      }

      // cb_yodPlaySound Events
      if (cb_yodPlaySound = g("cb_yodPlaySound")) {
        cb_yodPlaySound.addEventListener('click', function(){
          setValue("yodPlaySound", this.checked ? 1 : 0);
          return false;
        }, false);
      }

      // cb_yodMarkMention Events
      if (cb_yodMarkMention = g("cb_yodMarkMention")) {
        cb_yodMarkMention.addEventListener('click', function(){
          setValue("yodMarkMention", this.checked ? 1 : 0);
          return false;
        }, false);
      }

      // cb_yodAdvTop Events
      if (cb_yodAdvTop = g("cb_yodAdvTop")) {
        cb_yodAdvTop.addEventListener('click', function(){
          if (elyodAdvTop = g("yodAdvTop")) {
            setValue("yodAdvTop", this.checked ? 1 : 0);
            var sClass = 'Hide';
            if (this.checked) {
              sClass = 'Show';
            }
            elyodAdvTop.className = 'yod' + sClass;
          }
          return false;
        }, false);
      }

      // AutoCut 140 Events
      if (cb_yodRTOpt_auto140 = g("cb_yodRTOpt_auto140")) {
        cb_yodRTOpt_auto140.addEventListener('click', function(){
          setValue("yodRT_auto140", this.checked ? 1 : 0);
          if (this.checked) doyodRTFit140();
          return false;
        }, false);
      }

      // Custom RT Events
      if (ip_yodRTOpt_RTTxt = g("ip_yodRTOpt_RTTxt")) {
        evts = ["blur","change","click","focus","input","keydown","keypress","keyup","mousedown","mouseup","paste"];
        for (a in evts) {
          ip_yodRTOpt_RTTxt.addEventListener(evts[a], function(){
            setValue("yodRT_RTText", this.value ? this.value : "?");
            valRT = doyodGetStrOpt("yodRT_RTText");
          }, false);
        }
      }

      // Show/Hide Emote Table Events
      if (yodRTEmo = g("yodRTEmo")) {
        var el2yodRTEmo = c1('.//legend', yodRTEmo);
        el2yodRTEmo.addEventListener('click', function(){
          toggleShow(this.nextElementSibling, yodRTEmo.id);
          return false;
        }, false);
      }

      // Show/Hide OPTION Table Events
      if (yodOPTION = g("yodOPTION")) {
        var el2yodOPTION = c1('.//legend', yodOPTION);
        el2yodOPTION.addEventListener('click', function(){
          toggleShow(this.nextElementSibling, yodOPTION.id);
          return false;
        }, false);
      }
    }
  }
}

function playsound() {
  if (!yod_frun) return;
  if (!(valPlaySound = doyodGetBoolOpt("yodPlaySound"))) return;
  createSound(1);
}

function expandNewTweet() {
  var s_gm_counter = 'gm_expandNewTweet';
  if (gm_counter = g(s_gm_counter)) {
    document.head.removeChild(gm_counter);
  }
  addCS('expandNewTweet(".new-tweets-bar");', s_gm_counter);
}

function yod_rtDiag(e, e2) {
  var elx, target, txt;
  elx = e2 || e.currentTarget;

  if (c1('.//*[contains(@class,"yod-rt")]', elx)) return false;

  if (target =
    c1('.//button[contains(@class,"cancel-action")]', elx)
    || c1('.//div[contains(@class,"js-prompt-cancel")]', elx)
  ) {
    b = target.cloneNode(true); b.innerHTML = "RT"; b.className = "btn yod-rt";
    b.addEventListener('click', function(){
      yod_make_RT2(elx);
      //if (e2 && (elx = g('tweet_dialog'))) yod_goDiag(e, elx);
      return false;
    }, false);
    target.parentNode.appendChild(b);
  }
}


/*
function yod_slideshow(e) {
  if (el = e.currentTarget) yod_make_RT(el.firstElementChild);
}
*/

// GLOBAL Variable
var debug = 0;
var rtDiag, countMsg, my_screen_name, logged, twp, yodRTDiv = false;
var valRT = doyodGetStrOpt("yodRT_RTText", "RT");
var valEmote = doyodGetBoolOpt("yodRTEmo");
var valOption = doyodGetBoolOpt("yodOPTION");
var valAdvTop = doyodGetBoolOpt("yodAdvTop", 1);
var valPlaySound = doyodGetBoolOpt("yodPlaySound", 1);
var valMarkMention = doyodGetBoolOpt("yodMarkMention", 1);
var valMuted = doyodGetStrOpt("yodMuted");
var valMutedopt = doyodGetBoolOpt("yodMutedopt", 1);
var avahash, tw_id = 0;
var symbols = ("\\m/ ||| d(^_^)b ||| (^_^) ||| \\(^_^)/ ||| v(^_^)v ||| (*-*) ||| (*_*) ||| (T_T) ||| (!__!) ||| m(_ _)m ||| (>_<) ||| (=_=) ||| (-.-)Zzz ||| (-_-*) ||| (^_~) ||| (._.) ||| (<.<) ||| (-__-) ||| (@_@) ||| (X_X) ||| ($_$) ||| ( .__.)/||").split("|||");
var symbols_utf = ("\u2605 | \u00B1 | \u00bd | \u2122 | \u2260 | \u2190 | \u2191 | \u2192 | \u2193 | \u2194 | \u00ab | \u00bb | \u25ba | \u266b | <( \u203e\u25bf\u203e)-\u03c3 | \u2512(\u0283\u0283\u0283_-)\u250e").split("|");

function doExec() {
  // Go if User Logged
  if (logged = c1('.//a[contains(@id,"new-tweet")]') || c1('.//*[contains(@class,"global-new-tweet")]')) {

    var el = c1('.//div/div[contains(@class,"js-mini-current-user")]');
    my_screen_name = el ? el.getAttribute('data-screen-name') : "";
    avahash = "";
    if (el) {
      if (x = el.innerHTML.match(/profile\_images\/([0-9]+)\//i)) avahash = x[1];
    }
    //alert(x);

    // Do 1st Strike
    starter();
    //setTimeout(starter, 5000);

    // new wrapper
    if (rtDiag = c1('.//div[contains(@id,"retweet-tweet-dialog")]')) {
      rtDiag.addEventListener("DOMSubtreeModified", yod_rtDiag, true);
    }

    // new wrapper
    if (twp = c1('.//div[contains(@id,"global-tweet-dialog")]')) {
      twp.addEventListener("DOMNodeInserted", yod_goDiag, true);
    }

    // old wrapper
    else if (twp = c1('.//div[contains(@class, "twttr-dialog-wrapper")]')) {
      twp.addEventListener("DOMNodeInserted", yod_goDiag, true);
      //twp.addEventListener("DOMSubtreeModified", yod_rtDiag, true);
    }

    yod_render(1);

    document.addEventListener('DOMNodeInserted', function (event) {
      var cname, elmt = event.target;
      //if (!(/DIV/.test(elmt.tagName))) return;
      if (!(/(DIV|LI)/.test(elmt.tagName))) return;
      if (cname = elmt.className) {
        if (
          (/stream-item/.test(cname)) ||
          (/js-tweet-details-fixer/.test(cname)) ||
          (/component/.test(cname)) ||
          (/dashboard/.test(cname)) ||
          (/content-main/.test(cname))
        ) {
          if (el = c1('.//div[contains(@class, "new-tweets-bar")]')) {
            expandNewTweet();
          }
          yod_frun++;
          yod_render(1);
          //addCS('appx();', 'xxx');
        } else if (
          (/in-reply-to/.test(cname)) ||
          (/recent-tweets/.test(cname)) ||
          (/simple-tweet/.test(cname))
        ) {
          yod_frun++;
          yod_render();
        } else if (
          (/js-conversation-replies/.test(cname)) ||
          (/permalink/.test(cname))
        ) {
          yodInlineReply(elmt);
          yod_render();
        } /*else {
          // User Gallery
          setTimeout(function(){
            var tweet;
            if (tweet = c1('.//div[contains(@class,"media-slideshow-tweet")]'), elmt) {
              if (tweet !== null) tweet.addEventListener("DOMNodeInserted", yod_slideshow, true);
            }
          }, 1000);
        }*/
        //o_debug(cname);
      }

    }, false);

    // Re-fired!
    //setTimeout(starter, 5000);
  }
}

function createSound(play) {
  if (!(sound = g('yodnotify'))) {
  sound = new Audio("data:audio/ogg;base64,\
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");
  sound.id = 'yodnotify';
  sound.controls = false;
  sound.loop = false;
  sound.autoplay = false;
  sound.volume = 0.7; //0.0-1.0
  sound.setAttribute('style', 'position:absolute; left:-1000px; top:-1000px;')
  document.body.appendChild(sound);
  }
  if (sound && play) sound.play();
}

function doStuff() {
  usoUpdate();
  doExec();
}

var yod_frun = -1;
document.addEventListener("DOMContentLoaded", doStuff, true);



	
	initialize();
	loadData();
	updateAll();
	time();
	


})();