// ==UserScript==
// @name        TwitterBar
// @namespace   http://twitter.com/ngengs
// @description More Menu In New Twitter
// @author      rizky Kharisma
// @icon	http://s3.amazonaws.com/uso_ss/icon/129525/large.ico?1333003949
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @match       http://twitter.com/*
// @match       https://twitter.com/*
// @run-at      document-end
// @version     2.4.4
// @require	http://sizzlemctwizzle.com/updater.php?id=129525
// ==/UserScript==

/* Global configuration object */
var GLOBAL = {}
GLOBAL.options = { 'widen':true, 'swap':true , 'swiden':false ,
                    'removed':true, 'justtl':false ,
                    'trans':true, 'name':false, 'fixd':false,
                    'foot':false, 'who':false,
                    'hopen':false, 'stat':false, 'trend':false,
                    'rts':true, 'fbs':true, 
                    'tco':true, 'ava':false, 'ment':false,
					'clr':false, 'thmb':false, 'normal':false, 'tbmenu':false,
					'rpl':false, 'rtwd':false, 'del':false, 'fav':false , 'scrol':false , 'autoscrol':false , 'time':true ,
					'show':true,
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
	var options = JSON.parse( localStorage.getItem( 'TwitterBar:Options' ) );
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
		GLOBAL.options.show= true && options.show;
		
		
	}
}

function saveData () {
	localStorage.setItem( 'TwitterBar:Options', JSON.stringify( GLOBAL.options ) );
}

/* Returns the <style> tag used by this script */
function getStyleTag () {
	var tag = document.getElementById( '-twitterbar--style-' );
	
	if ( !tag ) {
		tag = document.createElement( 'style' );
		tag.setAttribute( 'type', 'text/css' );
		tag.id = '-twitterbar--style-';
		
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
	menuButton.innerHTML = '&#x25B2;&nbsp;TBmenu';
	menuButton.setAttribute( 'title', 'Close TwitterBar menu' );
}

function hideMenu () {
	GLOBAL.menuVisible = false;
	var menuButton= document.getElementById('TBmenu');
	menuButton.innerHTML = '&#x25BC;&nbsp;TBmenu';
	menuButton.setAttribute( 'title', 'Open TwitterBar menu' );
}
function time(){
	if (window.top != window.self) return;

		var tbtime = document.createElement("div");
		tbtime.id = '-twitterbar--time-';
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
			weekday[0]="Sunday";
			weekday[1]="Monday";
			weekday[2]="Tuesday";
			weekday[3]="Wednesday";
			weekday[4]="Thursday";
			weekday[5]="Friday";
			weekday[6]="Saturday";
			var h = d.getHours();
			var m = d.getMinutes();
			var s =d.getSeconds();
	
			if (h < 10) h = "0" + h;
			if (m < 10) m = "0" + m;
			if (s < 10) s = "0" + s;
	
				if(GLOBAL.seconds == true){
					tbtime.innerHTML = h + ":" + m +":"+s+"<br/><h3>"+weekday[d.getDay()]+"</h3>";
				}
				if(GLOBAL.seconds == false){
					tbtime.innerHTML = h + ":" + m +"<br/><h3>"+weekday[d.getDay()]+"</h3>";
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
function toggleShow() {
	GLOBAL.options.show= !GLOBAL.options.show;
	if(GLOBAL.options.show == true){
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
		GLOBAL.options.show= false;
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
	menuButton.setAttribute( 'title', 'Open TwitterBar menu' );
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
	
	// Create the main menu
	var menuDiv = document.createElement( 'div' );
	menuDiv.id = '-twitterbar--menu-';
	menuDiv.setAttribute( 'class', 'module' );
	menuDiv.innerHTML =
        'TwitterBar Menu<br/>' +
        '<a href="http://userscripts.org/scripts/show/129525" title="check update" target="_blank"> check update here </a><br/>'+
		'<h1><input id="-twitterbar--swap-checkbox-" type="checkbox"> Change Position</h1>' +
		'<h1><input id="-twitterbar--widen-checkbox-" type="checkbox"> Widen Page to 960px</h1>' +
		'<h1><input id="-twitterbar--swiden-checkbox-" type="checkbox"> Super Widen Page to 95% Of Your Screen</h1>' +
        '<h1><input id="-twitterbar--trans-checkbox-" type="checkbox"> Transparant</h1>' +
        '<h1><input id="-twitterbar--clr-checkbox-" type="checkbox"> Hover/Focus Indicator</h1>' +
        '<h1><input id="-twitterbar--thmb-checkbox-" type="checkbox"> Bigger Avatar When Hover</h1>' +
		'<h1><input id="-twitterbar--name-checkbox-" type="checkbox"> Swap Fullname and Username</h1>' +
		'<h1><input id="-twitterbar--rts-checkbox-" type="checkbox"> Add Old RT </h1>' +
        '<h1><input id="-twitterbar--fbs-checkbox-" type="checkbox"> Add FB Share</h1>' +
        '<h1><input id="-twitterbar--show-checkbox-" type="checkbox"> Allways Show Action Button</h1>' +
        '<h1><input id="-twitterbar--fixd-checkbox-" type="checkbox"> Fix Left Dashboard (change position:off)</h1>' +
        '<h1><input id="-twitterbar--tco-checkbox-" type="checkbox"> Fix Link (remove t.co)</h1>' +
        '<h1><input id="-twitterbar--ment-checkbox-" type="checkbox"> Change Connect to Mention</h1>' +
        '<h1><input id="-twitterbar--scrol-checkbox-" type="checkbox"> Scrol To Last Tweet(need refresh)</h1>' +
        '<h1><input id="-twitterbar--autoscrol-checkbox-" type="checkbox"> Auto Scrol New Tweet(need refresh)</h1>' +
        '<h1><input id="-twitterbar--time-checkbox-" type="checkbox"> Show Date and Time</h1>' +
        '<h1><input id="-twitterbar--normal-checkbox-" type="checkbox"> Back To Normal Twitter (turn off all function)</h1>' +
        'TwitterBar Menu';
    
	if(!document.getElementById('fb-frame')){
	body.appendChild( menuDiv );
	}
	
	var menuDiv2 = document.createElement( 'div' );
	menuDiv2.id = '-twitterbar--menu2-';
	menuDiv2.setAttribute( 'class', 'module' );
	menuDiv2.innerHTML =
		'TwitterBar Remove Component' +
        '<h1><input id="-twitterbar--ava-checkbox-" type="checkbox"> Remove Avatar</h1>' +
		'<h1><input id="-twitterbar--removed-checkbox-" type="checkbox"> Remove text in symbol</h1>' +
        '<h1><input id="-twitterbar--rpl-checkbox-" type="checkbox"> Remove Reply Button</h1>' +
        '<h1><input id="-twitterbar--rtwd-checkbox-" type="checkbox"> Remove New Retweet Button</h1>' +
        '<h1><input id="-twitterbar--del-checkbox-" type="checkbox"> Remove Del Button</h1>' +
        '<h1><input id="-twitterbar--fav-checkbox-" type="checkbox"> Remove Fav Button</h1>' +
		'<h1><input id="-twitterbar--hopen-checkbox-" type="checkbox"> Remove Expand and Collapse Text</h1>' +
		'<h1><input id="-twitterbar--stat-checkbox-" type="checkbox"> Remove Statistic</h1>' +
        '<h1><input id="-twitterbar--who-checkbox-" type="checkbox"> Remove Who To Follow and Simmiliar</h1>' +
		'<h1><input id="-twitterbar--trend-checkbox-" type="checkbox"> Remove Trending Topic</h1>' +
        '<h1><input id="-twitterbar--foot-checkbox-" type="checkbox"> Remove Footer</h1>' +
        '<h1><input id="-twitterbar--justtl-checkbox-" type="checkbox"> Just Time Line</h1>' +
		'TwitterBar Remove Component';
    
	if(!document.getElementById('fb-frame')){
	body.appendChild( menuDiv2 );
	}
	
	var menuDiv3 = document.createElement( 'div' );
	menuDiv3.id = '-twitterbar--menu3-';
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


	
	document.getElementById( '-twitterbar--swap-checkbox-' ).addEventListener( 'change', function(ev){ toggleSwap(); } );
	document.getElementById( '-twitterbar--swiden-checkbox-' ).addEventListener( 'change', function(ev){ toggleSWiden(); } );
	document.getElementById( '-twitterbar--widen-checkbox-' ).addEventListener( 'change', function(ev){ toggleWiden(); } );
	document.getElementById( '-twitterbar--removed-checkbox-' ).addEventListener( 'change', function(ev){ toggleRemoved(); } );
	document.getElementById( '-twitterbar--justtl-checkbox-' ).addEventListener( 'change', function(ev){ toggleJusttl(); } );
	document.getElementById( '-twitterbar--trans-checkbox-' ).addEventListener( 'change', function(ev){ toggleTrans(); } );
	document.getElementById( '-twitterbar--name-checkbox-' ).addEventListener( 'change', function(ev){ toggleName(); } );
	document.getElementById( '-twitterbar--fixd-checkbox-' ).addEventListener( 'change', function(ev){ toggleFixd(); } );
	document.getElementById( '-twitterbar--foot-checkbox-' ).addEventListener( 'change', function(ev){ toggleFoot(); } );
	document.getElementById( '-twitterbar--who-checkbox-' ).addEventListener( 'change', function(ev){ toggleWho(); } );
	document.getElementById( '-twitterbar--hopen-checkbox-' ).addEventListener( 'change', function(ev){ toggleHopen(); } );
	document.getElementById( '-twitterbar--stat-checkbox-' ).addEventListener( 'change', function(ev){ toggleStat(); } );
	document.getElementById( '-twitterbar--trend-checkbox-' ).addEventListener( 'change', function(ev){ toggleTrend(); } );
	document.getElementById( '-twitterbar--rts-checkbox-' ).addEventListener( 'change', function(ev){ toggleRts(); } );
	document.getElementById( '-twitterbar--fbs-checkbox-' ).addEventListener( 'change', function(ev){ toggleFbs(); } );
	document.getElementById( '-twitterbar--tco-checkbox-' ).addEventListener( 'change', function(ev){ toggleTco(); } );
	document.getElementById( '-twitterbar--ava-checkbox-' ).addEventListener( 'change', function(ev){ toggleAva(); } );
	document.getElementById( '-twitterbar--ment-checkbox-' ).addEventListener( 'change', function(ev){ toggleMent(); } );
	document.getElementById( '-twitterbar--clr-checkbox-' ).addEventListener( 'change', function(ev){ toggleClr(); } );
	document.getElementById( '-twitterbar--thmb-checkbox-' ).addEventListener( 'change', function(ev){ toggleThmb(); } );
	document.getElementById( '-twitterbar--rpl-checkbox-' ).addEventListener( 'change', function(ev){ toggleRpl(); } );
	document.getElementById( '-twitterbar--rtwd-checkbox-' ).addEventListener( 'change', function(ev){ toggleRtwd(); } );
	document.getElementById( '-twitterbar--del-checkbox-' ).addEventListener( 'change', function(ev){ toggleDel(); } );
	document.getElementById( '-twitterbar--fav-checkbox-' ).addEventListener( 'change', function(ev){ toggleFav(); } );
	document.getElementById( '-twitterbar--normal-checkbox-' ).addEventListener( 'change', function(ev){ toggleNormal(); } );
	document.getElementById( '-twitterbar--scrol-checkbox-' ).addEventListener( 'change', function(ev){ toggleScrol(); } );
	document.getElementById( '-twitterbar--autoscrol-checkbox-' ).addEventListener( 'change', function(ev){ toggleAutoScrol(); } );
	document.getElementById( '-twitterbar--time-checkbox-' ).addEventListener( 'change', function(ev){ toggleTime(); } );
	document.getElementById( '-twitterbar--show-checkbox-' ).addEventListener( 'change', function(ev){ toggleShow(); } );
	
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
	var show = ( GLOBAL.options.show== true );
	var alt = ( GLOBAL.alt== true );
		
	// Start with an empty set of rules
	var rules = '';
	rules +='#TBmenu{display  :block; padding :10px 12px 15px ;color :#BBBBBB;font-weight : bold ; font-size   : 12px; height   : 12px; cursor   : pointer;}';
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
	      rules+= '.component[data-component-term="footer"] {display: none !important;}'
	   }
	   
	   //rules hide who to follow
	   if ( who ){
	      rules+= '.component[data-component-term="user_recommendations"],.component[data-component-term="similar_user_recommendations"] , .component[data-component-term="user_similarities_list"] {display: none !important;}'    
	    }
	    
	    //rules hide statistic data
	    if ( stat ){
	       rules+= '.js-mini-profile-stats {display: none !important;}' 
	       }

	     //rules show traditional RT
	     if ( !rts ){
	       rules+= '.yod-old-style-retweet {display: none !important;}'
	       }
	     
	     //rules show FB share
	     if ( !fbs ){
	       rules+= '.yod-fb {display: none !important;}'
	       }
	       
	    //rules hide trending topics
	    if ( trend ){
	       rules+='.component[data-component-term="trends"]{display: none !important;}'
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
		if(show){
			rules+= '.tweet-actions {opacity:1!important;}'
			+ '.recent-tweets .tweet .action-reply-container, .recent-tweets .tweet .action-fav-container, .recent-tweets .tweet .action-rt-container, .recent-tweets .tweet .action-open-container .separator, .recent-tweets .tweet .tweet-actions .open-tweet, .discover-item .tweet .tweet-actions .open-tweet{display:inline;}'
		}
		
		 //rules for show menu of twitterbar
		 if (tbmenu){
			rules+='#-twitterbar--menu2-:hover {top:44px;box-shadow: 0 0 8px #BBBBBB;}'
			   + '#-twitterbar--menu2- {position: fixed; top: -210px;	right:4px; padding: 5px 5px; background: #262626; color:white; font-size:12px;text-shadow: none;}' 
			   + '#-twitterbar--menu-{position: fixed; top: -321px;	left:4px; padding: 5px 5px; background: #262626; color:white; font-size:12px; text-shadow: none;}' 
			   + '#-twitterbar--menu- a{text-shadow:none;}'
			   + '#-twitterbar--menu2- h1 , #-twitterbar--menu- h1 {color:white; font-size:12px; text-shadow: none; font-weight: normal;}'
			   + '#-twitterbar--menu3- a {color:white; font-size:12px; text-shadow: none; font-weight: normal;}'
			   + '#-twitterbar--menu-:hover {top:44px;box-shadow: 0 0 8px #BBBBBB;}'
			   + '#-twitterbar--menu2- h1:hover , #-twitterbar--menu- h1:hover {color:blue;}'
			   + '#-twitterbar--menu3- a:hover {color:white; text-decoration:none; cursor:pointer;}'
			   + '#-twitterbar--menu3-:hover {right:1px;}'
			   + '#-twitterbar--menu3- {position: fixed; bottom: 0px;	margin-bottom: 0; right:-147px; padding: 5px 5px; background: #262626; color:white; font-size:12px;text-shadow: none;}' 
		 }
		 if (alt){
			rules += '#-twitterbar--menu3-:hover {right:1px;}'
			   + '#-twitterbar--menu3- a:hover {color:white; text-decoration:none; cursor:pointer;}'
			   + '#-twitterbar--menu3- a {color:white; font-size:12px; text-shadow: none; font-weight: normal;}'
			   + '#-twitterbar--menu3- {position: fixed; bottom: 0px;	margin-bottom: 0; right:-147px; padding: 5px 5px; background: #262626; color:white; font-size:12px;text-shadow: none;}' 
			   + '#-twitterbar--menu2-:hover {bottom:0px;box-shadow: 0 0 8px #BBBBBB;margin-bottom: 0;}'
			   + '#-twitterbar--menu2- {position: fixed; bottom: -260px;	left:200px; padding: 5px 5px; background: #262626; color:white; font-size:12px;text-shadow: none;}' 
			   + '#-twitterbar--menu-{position: fixed; bottom: -371px;	left:4px; padding: 5px 5px; background: #262626; color:white; font-size:12px; text-shadow: none;}' 
			   + '#-twitterbar--menu- a{text-shadow:none;}'
			   + '#-twitterbar--menu2- h1 , #-twitterbar--menu- h1 {color:white; font-size:12px; text-shadow: none; font-weight: normal;}'
			   + '#-twitterbar--menu-:hover {bottom:0px;box-shadow: 0 0 8px #BBBBBB;margin-bottom: 0;}'
			   + '#-twitterbar--menu2- h1:hover , #-twitterbar--menu- h1:hover {color:blue;}'
				
		 } 
		 if(!alt && !tbmenu){
			rules += '#-twitterbar--menu3- , #-twitterbar--menu2- , #-twitterbar--menu- {display:none !important;}'
		 }
		 
		 //rules for show time
		 if((alt && time) || (tbmenu && time)){
		 rules+= '#-twitterbar--time- {bottom: 27px; color:#a30004; font-family:sans-serif; font-size:15pt; right:4px; line-height:20px; position:fixed; text-align:center; z-index:999; border-radius:5px;background:#262626;padding:4px; opacity:0.8; align:center; cursor:default;}'
				+ '#-twitterbar--time-:hover {opacity:1;color:white;box-shadow: 0 0 8px #BBBBBB;}'
				+ '#-twitterbar--time- h3{color:#a30004; font-size:12px;}'
				+ '#-twitterbar--time-:hover h3{color:white;}'
		 }
		 else if(!alt && !tbmenu && time){
		 rules+= '#-twitterbar--time- {bottom: 4px; color:#a30004; font-family:sans-serif; font-size:15pt; right:4px; line-height:20px; position:fixed; text-align:center; z-index:999; border-radius:5px;background:#262626;padding:4px; opacity:0.8; align:center; cursor:default;}'
		 		+ '#-twitterbar--time-:hover {opacity:1; color:white;box-shadow: 0 0 8px #BBBBBB;}'
				+ '#-twitterbar--time- h3{color:#a30004; font-size:12px;}'
				+ '#-twitterbar--time-:hover h3{color:white;}'
		 }
		 else if(!time){
			rules+= '#-twitterbar--time-[title="Click To Change Time Format"] {display:none !important;}'
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
		 
		 //rules for hide del button
		 if(del){
			rules+= '.tweet .action-del-container {display:none !important;}'
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
					peopleElement.getElementsByTagName('a')[0].href = "http://twitter.com/mentions";
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
					peopleElement.getElementsByTagName('a')[0].href = "http://twitter.com/i/connect";
					peopleElement.getElementsByTagName('a')[0].innerHTML = '<span class="new-wrapper"><i class="nav-people"></i><i class="nav-new"></i></span>Connect';
					}
				}
			}
			
	    
	// Update the checkboxes
	document.getElementById( '-twitterbar--swap-checkbox-' ).checked = GLOBAL.options.swap;
	document.getElementById( '-twitterbar--widen-checkbox-' ).checked = GLOBAL.options.widen;
	document.getElementById( '-twitterbar--swiden-checkbox-' ).checked = GLOBAL.options.swiden;
	document.getElementById( '-twitterbar--removed-checkbox-' ).checked = GLOBAL.options.removed;
	document.getElementById( '-twitterbar--justtl-checkbox-' ).checked = GLOBAL.options.justtl;
	document.getElementById( '-twitterbar--trans-checkbox-' ).checked = GLOBAL.options.trans;
	document.getElementById( '-twitterbar--name-checkbox-' ).checked = GLOBAL.options.name;
	document.getElementById( '-twitterbar--fixd-checkbox-' ).checked = GLOBAL.options.fixd;
	document.getElementById( '-twitterbar--foot-checkbox-' ).checked = GLOBAL.options.foot;
	document.getElementById( '-twitterbar--who-checkbox-' ).checked = GLOBAL.options.who;
	document.getElementById( '-twitterbar--hopen-checkbox-' ).checked = GLOBAL.options.hopen;
	document.getElementById( '-twitterbar--stat-checkbox-' ).checked = GLOBAL.options.stat;
	document.getElementById( '-twitterbar--trend-checkbox-' ).checked = GLOBAL.options.trend;
	document.getElementById( '-twitterbar--rts-checkbox-' ).checked = GLOBAL.options.rts;
	document.getElementById( '-twitterbar--fbs-checkbox-' ).checked = GLOBAL.options.fbs;
	document.getElementById( '-twitterbar--tco-checkbox-' ).checked = GLOBAL.options.tco;
	document.getElementById( '-twitterbar--ava-checkbox-' ).checked = GLOBAL.options.ava;
	document.getElementById( '-twitterbar--ment-checkbox-' ).checked = GLOBAL.options.ment;
	document.getElementById( '-twitterbar--clr-checkbox-' ).checked = GLOBAL.options.clr;
	document.getElementById( '-twitterbar--thmb-checkbox-' ).checked = GLOBAL.options.thmb;
	document.getElementById( '-twitterbar--normal-checkbox-' ).checked = GLOBAL.options.normal;
	document.getElementById( '-twitterbar--rpl-checkbox-' ).checked = GLOBAL.options.rpl;
	document.getElementById( '-twitterbar--rtwd-checkbox-' ).checked = GLOBAL.options.rtwd;
	document.getElementById( '-twitterbar--del-checkbox-' ).checked = GLOBAL.options.del;
	document.getElementById( '-twitterbar--fav-checkbox-' ).checked = GLOBAL.options.fav;
	document.getElementById( '-twitterbar--scrol-checkbox-' ).checked = GLOBAL.options.scrol;
	document.getElementById( '-twitterbar--autoscrol-checkbox-' ).checked = GLOBAL.options.autoscrol;
	document.getElementById( '-twitterbar--time-checkbox-' ).checked = GLOBAL.options.time;
	document.getElementById( '-twitterbar--show-checkbox-' ).checked = GLOBAL.options.show;
	
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
  while (el=els.iterateNext())res.push(el);return res;
}

function setValue(key, value) {
  localStorage.setItem(key, value);
  return false;
}

function getValue(key) {
  var val = localStorage.getItem(key);
  return val;
}

// phpjs
function stripslashes (str) {
  return (str + '').replace(/\\(.?)/g, function (s, n1) {
    switch (n1) { case '\\': return '\\'; case '0': return '\u0000'; case '': return ''; default: return n1; }
  });
}

function addslashes (str, nostrip) {
  //return (nostrip ? str : stripslashes(str)).replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
  return str.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function ytrim(s) {
  var str = '';
  if (!(str = s.toString().trim())) return str;
  var lines = str.replace(/^\s+|\s+$/g, '').split(/\s*\n\s*/);
  str = lines.join(' ').replace(/[\s]{2,}/g, ' ');
  return str;
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

function yod_doRT(screen_name, content) {
  return function (e) {
    var gmbinder, s_gm = document.createElement('script');
    var s_gmbinder = 'yodgmbinder';
    var pattcontent = new RegExp("@" + my_screen_name, "gmi");
    content = addslashes(ytrim(content.replace(pattcontent, my_screen_name)));
    s_gm.type = 'text/javascript'; s_gm.id = s_gmbinder;
    s_gm.innerHTML = "yodShowTweetBox('" + addslashes(ytrim(screen_name)) + "','" + content + "%yod%', '" + valRT + "');";
    document.body.appendChild(s_gm);
    doyodRTFit140(true);
    setTimeout(function(){
      if (gmbinder = g(s_gmbinder)) {
        document.body.removeChild(gmbinder);
      }
    }, 1000);
  }
}

function inject_button(target, link) {
  var b = document.createTextNode(link._label);

  var span = document.createElement('span');
  span.appendChild(b); //label
  
  var a = document.createElement('a');
  a.setAttribute('href', '#'); a.setAttribute('title', link._title); a.className = "yodInjButt";
  if (link._class) a.className += " " + link._class;
  if (link._click) a.addEventListener('click', link._click, false);
  //a.appendChild(span);
  a.innerHTML=link._img;

  if (isnew) {
    var a2 = document.createElement('li');
    a2.appendChild(a);
    target.appendChild(a2);
  }
  else target.appendChild(a);
}

function translate_link(tt, shortlink) {
  yodRTDiv.innerHTML = tt.innerHTML;
  // collect links
  var links = c2(".//a[@data-expanded-url]", yodRTDiv);
  for (i=0; i<links.length; i++) {
    var link = links[i];
    if (longURL = link.getAttribute('data-expanded-url')) {
      var newLink = document.createTextNode(shortlink? link.href : longURL);
      link.parentNode.replaceChild(newLink, link);
    }
  }
  var content = yodRTDiv.innerHTML.replace(/<\/?[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/"/g, '').replace(/&nbsp;/g,' ');
  yodRTDiv.innerHTML = "";
  return content;
}

function yod_make_RT(entry) {
  // return if no Slave yodRTDiv
  if (!(yodRTDiv = c1('.//div[contains(@id,"yodRTDiv")]'))) return;

  // return if no Target
  var target;
  if (!(target = (
      c1('.//ul[contains(@class,"actions")]', entry) ||
      c1('.//span[contains(@class,"tweet-actions")]', entry)
    ))) return;

  // return if exist
  if (c1('.//a[contains(@class,"yod-old-style-retweet")]', entry)) return;

  // return if no tweet text
  var tt;
  if (!(tt = (
      c1('.//p[contains(@class,"js-tweet-text")]', entry) ||
      c1('.//div[contains(@class,"tweet-text")]', entry)
    ))) return;

  // screen name
  var hh, screen_name;
  if (multi_tweet = c1('.//div[contains(@class,"stream-item-content")]', entry)) {
    screen_name = multi_tweet.getAttribute('data-screen-name');
  } else { //tweet
    if (tweet = entry) {
      screen_name = tweet.getAttribute('data-screen-name');
    }
  }
  if (!screen_name) return;

  // add parsed class
  entry.className += " yodDone";

  // RT text
  var content = translate_link(tt);

  var link = {
    _class: 'yod-old-style-retweet',
    _click: yod_doRT(screen_name, content),
    _label: '[RT]',
	_title: 'Traditional ReTweet',
	_img: '<span class="tbRT">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp</span><b>RT</b>'
  };

  inject_button(target, link);

  // Re RT text
  var content = translate_link(tt, true);

  // FB Share
  var fbURL, fbTitle = 'Twitter @' + screen_name + ' ; ' + content;

  if (fbURL = (
    c1('.//a[contains(@class,"tweet-timestamp")]', entry) ||
    c1('.//a[contains(@class,"embed-link")]', entry) ||
    c1('.//a[contains(@class,"js-open-close-tweet")]', entry)
  )) {
    var fbURL1 = 'http://www.facebook.com/sharer.php?u=' + fbURL.href.replace(/\/#!/, '').replace(/\/embed$/, '');

    var link = {
    _class: 'yod-fb',
      _click: function(){window.open(fbURL1)},
      _label: '[FB]',
      _title: 'Facebook Share',
	_img: '<span class="tbFB">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><b>FB</b>'
    };

    inject_button(target, link);
  }
}


function doAdvTop() {
  if (logo = g("logo") || g("global-actions")) {
    div = document.createElement('div');
    insertAfter(div, logo);

    // Extract DM
    if (isnew) {
      if (dm = c1('.//a[contains(@class,"js-dm-dialog")]/span')) {
        var el = document.createElement('div');
        el.id = "yodmsg";
        el.innerHTML = dm.innerHTML;
        dm.addEventListener("DOMSubtreeModified", yod_extDM, true);
        insertAfter(el, div);
      }
    }
  }
}

var yod_runScript_RT = function() {
  yodGetTweetBox = function(){
    return document.getElementById("yod_TweetBox");
  }

  yodHailTweetBox = function(){
    var txa;
    if ((txa = yodGetTweetBox()) && (typeof jQuery !== 'undefined')) jQuery(txa).trigger("mouseup");
  }

  yodShowTweetBox = function(s,c,yodrt){
    new twttr.widget.TweetDialog({
      draggable:true,
      defaultContent:yodrt + " @"+s+": "+c,
      origin:"yod-Traditional-RT",
      template:{title:_("RT @"+s+" Tweet")}
    }).open().focus();
  }

  yodInsSmiley = function(text) {
    var txa;
    if (text && (txa = yodGetTweetBox())) {
      var txt = " " + text + " ";
      if (txa.selectionStart || txa.selectionStart == "0") {
        var startPos = txa.selectionStart; var endPos = txa.selectionEnd; var scrollTop = txa.scrollTop;
        txa.value = txa.value.substring(0, startPos) + txt + txa.value.substring(endPos, txa.value.length);
        txa.focus();
        txa.selectionStart = startPos + txt.length; txa.selectionEnd = startPos + txt.length;
        txa.scrollTop = scrollTop;
      }
      yodHailTweetBox();
    }
  }
}

function starter() {
  if (g("yod_RT_CSS")) return;

  doAdvTop();

  addCS("(" + yod_runScript_RT + ")();", "yodShowTweetBoxHeaderScript");

  const mycss = "\
.yodInjButt{margin-left: 5px!important;}\
.dm-dialog .twttr-dialog-inside, .dm-tweetbox {height:auto!important;}\
#yodRTEmo legend{margin:auto!important;line-height:inherit!important;font-size:12px!important;cursor:pointer!important;font-weight:bold!important;text-align: center!important; padding: 0 5px!important; width: auto!important;border:none !important;}\
#yodRTEmo fieldset{border:none;}\
#yodRTEmo .tablex{font-size:11px!important;margin: 5px auto; width: 98%;}\
#yodRTEmo .tablex ul {text-align: center;}\
#yodRTEmo ul:not(:last-child) {margin-bottom:10px!important;}\
#yodRTEmo .tablex li {display: inline-block;cursor:pointer!important;min-width:15%;padding: 2px 0;}\
#yodRTEmo .tablex li:hover {font-size: 20px;font-weight: bold;}\
.yodShow {display: block !important;}\
.yodHide {display: none !important;}\
.fShow {border-top:solid 1px #CCC !important;}\
.fHide {}\
#yodRTFit140Auto{margin-bottom: -5px;}\
#yodSpace{margin-top: 5px;}\
#yodSpace > div:not(:first-child) {margin-top:10px}\
#yodRTCopyLeft{font-size:11px; text-align: center;border-top: 1px solid #CCC;}\
#yodRTOption > div {display: inline-table; margin-right:5px}\
#yodRTOption .btn {padding:2px 5px!important}\
#yodRTOption * {cursor:pointer}\
#yodRTOption input {margin-right:10px; }\
#ip_yodRTOpt_RTTxt {box-shadow:none!important;-webkit-box-shadow:none!important;-moz-box-shadow:none!important;border:1px solid #CCC!important;width:50px!important;padding:0 5px!important}\
#yodRTTxt label{margin:0!important;}\
#yodRTDiv{display:hidden;overflow:hidden;}\
#yodmsg > span {\
font-weight: bold;float: right;min-width: 7px;padding: 0 9px;color: white;text-shadow: none;background-color: #58B3F0;\
margin:10px auto; background-repeat: repeat-x;\
background-image: -moz-linear-gradient(top,#3aa0ea 0,#58b3f0 100%);\
background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0%,#3aa0ea),color-stop(100%,#58b3f0));\
background-image: -webkit-linear-gradient(top,#3aa0ea 0,#58b3f0 100%);\
background-image: -ms-linear-gradient(top,#3aa0ea 0,#58b3f0 100%);\
background-image: -o-linear-gradient(top,#3aa0ea 0,#58b3f0 100%);\
-webkit-border-radius: 9px;-moz-border-radius: 9px;border-radius: 9px;\
}\
span.geo-text{width:auto!important;}\
.recent-tweets .tweet-actions{display:inline!important;}\
.tbRT{background:url('data:image/gif;base64,R0lGODlhDQANAMQdALe3t6urq/z8/GNjY5eXl4ODg7a2tomJicDAwPn5+YaGhpmZmfv7+6enp/39/aOjo+Tk5Lu7u/b29ry8vKmpqaamprCwsJubm6ysrPLy8u/v78HBwf///////wAAAAAAACH5BAEAAB0ALAAAAAANAA0AAAVmYCdqW3VVmyauEZZxcIZF6wTBOAxNnUbBDILFcjFwMBqEg6PgJGCCCyezCUgOhcEL9uM8GhLAYrPhkBcASePBxWUGhYMksHldBLBn04HQYDgGF0MEDFwqNjk4OywubjMrIyUnKSshADs=') no-repeat scroll 0 0 transparent;}\
.tbFB{background:url('data:image/gif;base64,R0lGODlhDQANANUAANna2+vu9Nvc3WF5rEVintrb3Onp6vv7+/T19c3T0t3e3/39/cbMzOPj5OHi49/g4eXl5vLy8sXMy+fn6PX29urr6+Pl5tfY2cXLy8fOzeXm5tbY2fPz9Pn5+v7+/ubn59ra29zd3vn5+efp6e7u7mB4q/n6+u/w8MbNzO/v8Pj4+MfNzfP09MbMy+rq67jAv+3t7r7ExOvs7N/g4MfNzO7v7+bn6OHi4vb3922EtLnAwP///ztZmP///wAAAAAAACH5BAEAAD0ALAAAAAANAA0AAAZQwJ5uSCzqhLukcrl76XYDnnTKG+yGOyqvlORdn9pA97vQZqVfDlUcCHiHKfP0+5Gjhw5Cbp/b7QkeQwBRWlUUQwIABQIPDRAGFTUsR0aVPUEAOw==') no-repeat scroll 0 0 transparent;}\
";

  addCS(mycss, "yod_RT_CSS", 1);

  //create Slave
  yodRTDiv = document.createElement('div');
  yodRTDiv.id = 'yodRTDiv';
  document.body.appendChild(yodRTDiv);
}

function yod_render() {
  els = c2('.//div[contains(@class,"js-actionable-tweet") and not(contains(@class,"yodDone"))]');
  for (a in els) {
    yod_make_RT(els[a])
  }
}

function yod_slideshow(e) {
  if (el = e.currentTarget) yod_make_RT(el.firstElementChild);
}

function yod_extDM(e) {
  var el, yodmsg;
  if (el = e.currentTarget) {
    if (yodmsg = g("yodmsg")) {
      yodmsg.innerHTML = "";
      yodmsg.appendChild(el.cloneNode(true));
    }
  }
}

function doyodGetBoolOpt(val) {
  return parseInt(getValue(val));
}

function doyodGetStrOpt(val, def) {
  var str = getValue(val);
  if (typeof str !== "string") str = "";
  str = str.trim();
  if (str.toString() === "?") return "";
  if (!str && def) str = def + "";
  return str.trim();
}

function GetTxtBox() {
  if (!isnew) return false;
  return g('yod_TweetBox');
}

function HailTxtBox() {
  var s_gm_counter = 'gm_counter';
  if (gm_counter = g(s_gm_counter)) {
    document.head.removeChild(gm_counter);
  }
  addCS('yodHailTweetBox();', s_gm_counter);
}

function doyodRTClean(all) {
  if (txt = GetTxtBox()) {
    if (all) txt.value = "";
    else txt.value = txt.value.trim().replace(/\s{2,}/g, " ");
    txt.focus();
    HailTxtBox();
  }
}

function doyodRTFit140(f) {
  if (txt = GetTxtBox()) {
    txt.value = txt.value.trim().replace(/\s{2,}/g, " ").replace(/%yod%/ig, "");
    if (doyodGetBoolOpt("yodRT_auto140")) f = false;
    if (!f && (txt.value.length > 140)) {
      txt.value = txt.value.substr(0, 138) + "..";
    }
    txt.focus();
    HailTxtBox();
  }
}

function toggleShow(el) {
  if (g(el)) {
    var sClass = 'Hide'; var state = 0;
    if (el.className.match(/yodHide/)) {
      sClass = 'Show'; state++;
    }
    setValue("yodRT_RTEmote", state);
    valEmote = doyodGetBoolOpt("yodRT_RTEmote");
    el.parentNode.className = 'f' + sClass;
    el.className = el.className.replace(/(yodHide|yodShow)/, 'yod' + sClass);
  }
}

function buildEmoTable(arr) {
  var i, em, str = '<ul>';
  for (i in arr) {
    if (em = arr[i].trim()) {
      str += '<li onclick="javascript:yodInsSmiley(\'' + addslashes(em) + '\');return false;">' + em + '</li>';
    }
  }
  str += '</ul>';
  return str;
}

function yod_goDiag(e) {
  var elx, target, txt;
  if (elx = e.currentTarget) {
    placed = g("yodRTOption");
    rep = c1('.//div[contains(@class,"twttr-dialog-reply-footer")]', elx);
    target = c1('.//div[contains(@class,"text-area")]', elx);
    var txt = c1('.//textarea', target);

    // Inject Copy Reply button
    if (target && placed && rep && !g('yodRTCopyReply')) {
      if (!txt) return false;
      if (el = c1('.//span', rep)) {
        var p = rep.cloneNode(true);
        var act = el.innerHTML.trim();
        if (el = c1('.//*[contains(@class,"js-tweet-text")]', p)) {
          var div2 = document.createElement("div");
          var links = c2('.//a[@data-expanded-url]', el);
          for (a in links) links[a].innerHTML = links[a].getAttribute('data-expanded-url');
          div2.id = "yodRTCopyReply";
          var a = document.createElement("a");
          a.className = 'btn'; a.innerHTML = 'Copy Reply';
          a.setAttribute('href', '#'); a.setAttribute('title', "Copy current text reply");
          a.addEventListener('click', function(){
            txt.value += " " + act + ": " + el.textContent.trim().replace(/@([^\s]+)/gm, "$1");
            if (doyodGetBoolOpt("yodRT_auto140")) doyodRTFit140();
            doyodRTClean();
          }, false);
          div2.appendChild(a);
          placed.appendChild(div2);
        }
      }
    }

    if (placed && !g('yod_TweetBox') && (txt2 = c1('.//textarea', placed.parentNode.parentNode))) {
      txt2.id="yod_TweetBox";
    }

    if (placed) return false;

    // Inject Our Space to Target
    if (target) {
      var div = document.createElement("div");
      div.id = "yodSpace";
      var div2 = document.createElement("div");
      div2.id = "yodRTOption";
      checked = doyodGetBoolOpt("yodRT_auto140") ? ' checked="checked"' : '';
      v_valRT = valRT ? valRT : "?";
      div2.innerHTML = '\
      <div id="yodRTTxt"><label>RT Text <input id="ip_yodRTOpt_RTTxt" name="ip_yodRTOpt_RTTxt" type="text" title="Opt RT Text ( \'?\' for no Prefix )" value="' + v_valRT + '"></label></div>\
      <div id="yodRTFit140Auto"><label><input id="cb_yodRTOpt_auto140" name="cb_yodRTOpt_auto140" type="checkbox" ' + checked + '>Auto140</label></div>\
      ';

      // Fit 140 - Cut Text to 140 char length
      var a = document.createElement("a");
      a.innerHTML = 'Fit 140'; a.className = 'btn'; a.id = "yodRTFit140";
      a.setAttribute('href', '#'); a.setAttribute('title', "Fit 140");
      a.addEventListener('click', function(){
        doyodRTFit140();
      }, false);
      var div3 = document.createElement("div");
      div3.appendChild(a); div2.appendChild(div3);

      // Clear TweetBox
      var a = document.createElement("a");
      a.innerHTML = 'Clear'; a.className = 'btn'; a.id = "yodRTClear";
      a.setAttribute('href', '#'); a.setAttribute('title', "Clear Tweet TextBox");
      a.addEventListener('click', function(){
        doyodRTClean(1);
      }, false);
      var div3 = document.createElement("div");
      div3.appendChild(a); div2.appendChild(div3);
      div.appendChild(div2);



      // Emoticons Table
      var div2 = document.createElement("div");
      div2.id = "yodRTEmo";
      v_valEmote = valEmote ? "Show" : "Hide";
      str = '<fieldset class="f' + v_valEmote + '"><legend align="center" title="Toggle Show-Hide">[ Emoticons ]</legend><div class="tablex yod' + v_valEmote + '">';
      str += buildEmoTable(symbols);
      str += buildEmoTable(symbols_utf);
      str += '</div></fieldset>';
      div2.innerHTML = str;
      div.appendChild(div2);

      // Footer Copyleft
      var div2 = document.createElement("div");
      div2.id = "yodRTCopyLeft";
      div2.innerHTML = ' ';
      div.appendChild(div2);

      insertAfter(div, target);

      // AutoCut 140 Events
      if (el = g("cb_yodRTOpt_auto140")) {
        el.addEventListener('click', function(){
          setValue("yodRT_auto140", this.checked ? 1 : 0);
          if (this.checked) doyodRTFit140();
        }, false);
      }

      // Custom RT Events
      if (el = g("ip_yodRTOpt_RTTxt")) {
        evts = ["blur","change","click","focus","input","keydown","keypress","keyup","mousdown","mouseup","paste"];
        for (a in evts) {
          el.addEventListener(evts[a], function(){
          setValue("yodRT_RTText", this.value ? this.value : "?");
          valRT = doyodGetStrOpt("yodRT_RTText");
          }, false);
        }
      }

      // Show/Hide Emote Table Events
      if (el = g("yodRTEmo")) {
        el2 = c1('.//legend', el);
        el2.addEventListener('click', function(){
          toggleShow(this.nextElementSibling);
        }, false);
      }
    }
  }
}

// GLOBAL Variable
var isnew, my_screen_name, logged, twp, yodRTDiv = false;
var valRT = doyodGetStrOpt("yodRT_RTText", "RT");
var valEmote = doyodGetBoolOpt("yodRT_RTEmote");
var symbols = ("\¬_¬ | \\m/ | d(^_^)b | (^_^) | \\(^_^)/ | v(^_^)v | (*-*) | (*_*) | (T_T) | (!__!) | m(_ _)m | (>_<) | (=_=) | (-.-)Zzz | (-_-*) | (^_~) | (._.) | (<.<) | (-__-) | (@_@) | (X_X) | ($_$)").split("|");
var symbols_utf = ("\u2665 | \u25ba | \u266b | <( \u203e\u25bf\u203e)-\u03c3 | \u2512(\u0283\u0283\u0283_-)\u250e").split("|");

function doExec() {

  // Detect Interface
  isnew = c1('.//div[contains(@class,"pull-right")]');

  // Go if User Logged
  if (logged = c1('.//a[contains(@id,"new-tweet")]') || c1('.//*[contains(@class,"global-new-tweet")]')) {

    // Do 1st Strike
    starter();

    var el;

    if (isnew) {
      el = c1('.//div/div[contains(@class,"js-mini-current-user")]');
      my_screen_name = el ? el.getAttribute('data-screen-name') : "";
      if (twp = c1('.//div[@class="twttr-dialog-wrapper"]')) {
        twp.addEventListener("DOMNodeInserted", yod_goDiag, true);
      }
    } else {
      el = c1('.//span/span[@id="screen-name"]');
      my_screen_name = el ? el.innerHTML.trim() : "";
    }

    document.addEventListener('DOMNodeInserted', function (event) {
      var cname, elmt = event.target;
      if (!(/DIV/.test(elmt.tagName))) return;
      if (cname = elmt.className) {
          if (
            (/stream-item/.test(cname)) ||
            (isnew && (/js-tweet-details-fixer/.test(cname))) ||
            (isnew && (/in-reply-to/.test(cname))) ||
            (/component/.test(cname)) ||
            (/recent-tweets/.test(cname))
          ) {
            yod_render();
          } else {
            // User Gallery
            setTimeout(function(){
              var tweet;
              if (tweet = c1('.//div[contains(@class,"media-slideshow-tweet")]'), elmt) {
                if (tweet !== null) tweet.addEventListener("DOMNodeInserted", yod_slideshow, true);
              }
            }, 1000);
          }
      }
    }, false);

    // Re-fired!
    setTimeout(yod_render, 5000);
  }
}

function doStuff() {
  doExec();
}

document.addEventListener("DOMContentLoaded", doStuff, true);
//end old RT and FB share    



	
	initialize();
	loadData();
	updateAll();
	time();
	


})();