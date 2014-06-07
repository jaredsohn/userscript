//
// UserScript and loader function for GmailTeX
// written by Kristi Tsukida <kristi.tsukida[at]gmail.com>
// GmailTex written by (C) Valery Alexeev <va.email.tex@gmail.com>
// August 26, 2010
//
// Verified in Firefox 3.6.8 with Greasemonkey 0.8.20100408.6
// Verified in Chrome 6.0.495.0 (Official Build 56152) dev
//
// License: http://creativecommons.org/licenses/by-nc-sa/3.0/
// 
// ==UserScript==
// @name         GmailTeX UserScript
// @description	 GmailTeX is a plugin which adds (La)TeX capability to Gmail.
// @include      http://mail.google.com/*
// @include      https://mail.google.com/*
// @include      http://*.mail.google.com/*
// @include      https://*.mail.google.com/*
// @match      http://mail.google.com/*
// @match      https://mail.google.com/*
// @match      http://*.mail.google.com/*
// @match      https://*.mail.google.com/*
// ==/UserScript==

// Dummy wrapper function for gmailtex.js code
var gmailtexWrapper = function(){
/*************************************************************
 *  GmailTeX   gmailtex.js / emailtex.js 
 *  http://alexeev.org/gmailtex.html
 *
 *  Written by (C) Valery Alexeev <va.email.tex@gmail.com>
 *  Version 2.4 Aug 26, 2010
 *  License: http://creativecommons.org/licenses/by-nc-sa/3.0/
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 **************************************************************
 */
var path_to_mathjax = "http://www.mathjax.org/mathjax/MathJax.js"; 
if( !document.getElementById('GmailTeX') ){
var va_version = '2.4';
var va_pdr = /[\r]{0,1}\n[ \t]*[\r]{0,1}\n/;
function va_sc(){ 
    var tc, 
	fib = document.getElementsByName("body")[0], 
	fe = document.getElementsByClassName("ii gt")[0]; 
    if( fib ) tc = window.getComputedStyle( fib, null ).color;
    else{
	if( fe ) tc = window.getComputedStyle( fe, null ).color;
	else tc = "black";
    }
    var cst = 
	".MathJax .ms, .MathJax .mi,.MathJax .mn,.MathJax .mo { color:" + tc + " }";
    var cs = document.getElementById("cs"); 
    if( cs ) cs.innerHTML = cst;
    else{
	cs = document.createElement("style");
	cs.id = "cs";
	cs.innerHTML = cst;
	document.getElementsByTagName("head")[0].appendChild( cs );	
    }
}
function va_pe(){ 
    var es = document.getElementsByClassName('ii gt'); 
    for( var i = 0; i < es.length; i++ ){
	es[i] = va_fe( es[i] );
	es[i].className = 'va_ar ' + es[i].className;
    }
}
function va_lmj(){ 
    var cs  = 'MathJax.Hub.Config({config:["MathJax.js"]});'; 
    var co = 'va_pe(); MathJax.Hub.Startup.onload();' ; 
    var cq  = 
	'var va_q = MathJax.CallBack.Queue(MathJax.Hub.Register.StartupHook("End",{}));' + 
	'va_sc();' ;
    var ch   = 
	' MathJax.Hub.Register.StartupHook("End Config",function(){'+
	'MathJax.Hub.Config({'+
	' showProcessingMessages: true,'+
	'delayStartupUntil: "onload",'+
	'extensions: ["tex2jax.js", "TeX/noErrors.js", "TeX/noUndefined.js", "TeX/AMSmath.js", "TeX/AMSsymbols.js"],'+
	'tex2jax: {'+
	'  inlineMath: [ [\'$\',\'$\'], ["\\\\(","\\\\)"] ],' +
	'  processEscapes: false,'+
	'},'+
	'TeX: {'+
	'  noErrors: {'+
	'    inlineDelimiters: ["",""],'+
	'    multiLine: false,'+
	'    style: {'+
	'      "font-family": "serif",'+
	'      "font-size":   "100%",'+
	'      "color":       "red",'+
	'      "border":      ""'+ 
	'    }'+
	'  },'+
	'noUndefined: {'+  
	'  attributes: {'+
	'    mathcolor: "blue",'+
	'  }'+
	'}'+
	'}'+	
	'});'+
	'});';
    var s = document.createElement("script"); 
    s.type = "text/javascript";
    s.src = path_to_mathjax;
    var config = cs + co + ch + cq;
    if (window.opera) {s.innerHTML = config} else {s.text = config}
    document.getElementsByTagName('head')[0].appendChild(s);
}
va_lmj();
function va_fs(){ 
    var fs = document.createElement("style"); 
    fs.type = "text/css";
    fs.id = "va_fs";
    fstext = 
	'.MathJax { font-size: 125% !important; white-space: normal; }'+
	'.MathJax .mn { padding-top: 0 !important }'+
	'#va_pp { white-space: pre-wrap; word-spacing: 0; word-wrap: break-word; text-align: auto; } '+
	'#va_pp p { margin-top: 0 } '+
	'#va_cp td { font-size: 100%; padding: 3px; }'+
	'#va_cp .pU { font-size: 70%; padding-left: 8px; cursor: none; }'+
	'#va_cp a { cursor: pointer; }';
    fs.innerHTML = fstext;
    document.getElementsByTagName("head")[0].appendChild(fs);
}
va_fs();
var va_it = 
    '<table style="padding:0px 0px 0px 16px"><tbody>'+
    '<tr><td><a title="TeX the emails you are currently reading" onClick="va_tr()">TeX Received</a>'+ 
    '<tr><td><a title="TeX the email you are currently composing" onClick="va_tc()">TeX Composed</a>'+
    '<tr><td><a style="cursor:default">Mode: </a>'+
    '<a title="TeX when F8 is pressed" name="va_at"  onClick="va_sa(0)">F8 </a>'+
    '<a title="TeX on every keystroke" name="va_at"  onClick="va_sa(1)">auto </a>'+
    '</tbody></table>';
var va_cp = document.createElement('div'); 
va_cp.className = "nH pp T0";
va_cp.id = "va_cp";
va_cp.innerHTML = 
    '<div class="nH"><div class="nH pY"><div class="nH">'+
    '<div div id="va_cpencl" class="nH r pr" onClick="va_tt()">'+
    '<div class="py" idlink="" tabindex="0" role="link"><img role="button" class="pq" src="images/cleardot.gif" alt="Expand">'+
    '<h2 class="pw">GmailTeX</h2>'+
    '<div class="qn"></div></div></div><div id="va_cptble" style="display: none;" class="nH pt"><div class="nH"><div class="p2"><div class="p4">'+
    va_it +
    '</div></div>'+
    '<div id=":rb" class="pU" tabindex="0" role="link">'+
    '<a style="float:left;" title="Check for the current version" onClick="window.open(\'http://alexeev.org/gmailtex.html\')">v.' + va_version + '</a>' +
    '<a title="Powered by MathJax" onClick="window.open(\'http://www.mathjax.org\')">Powered by MathJax</a>' +
    '</div>'+
    '</div><div class="nH"><div style="display: none;" class="b8 UC p1"><div class="J-J5-Ji"><div class="UD"></div><div class="vh"></div><div class="UB"></div></div></div></div></div></div></div></div>';
if( document.getElementsByClassName('nH pp T0')[0] ){ 
    var va_cm = document.getElementsByClassName('nH pp T0')[0]; 
} else {
    var va_cm = document.getElementsByClassName('nH pp ps TZ')[0]; 
}
var va_lms = va_cm.parentNode; 
va_lms.appendChild( va_cp );
function va_tt(){ 
    if( va_st ){
	va_st = false;
	document.getElementById("va_cpencl").className = "nH r pr";
	document.getElementById("va_cptble").style.display = "none";
    } else {
	va_st = true;
	document.getElementById("va_cpencl").className = "nH r pv";
	document.getElementById("va_cptble").style.display = "block";
    }
}
// Startup minimized
var va_st = true; 
va_tt();
var va_at = 1; 
var va_ok = true, 
    va_ad = 0, 
    va_qir = false; 
var va_rq = []; 
function va_pq(){ 
    if( va_rq.length == 0 ){
	va_qir = false; 
	return;
    }
    if( va_ok ){
	var num, 
	    s, 
	    sq = va_rq.filter( function( x ){ return (x[0] == -1); } ); 
	if( sq.length ){
	    va_rq = []; 
	    va_ad = 0; 
	    num = -1;
	    s = sq[ sq.length - 1 ][1]; 
	    app = -1;
	}
	else{
	    var el = va_rq.shift();
	    num = el[0];
	    s = el[1];
	    app = el[2];
	    if( app != 0 ) va_ad--; 
	    if( app >=0 ){
		if( va_ad == 0 ){ 
		    var mq = va_rq.filter( function( x ){ return (x[0] == num); } ); 
		    if( mq.length ) s = mq[ mq.length -1 ][1]; 
		    va_rq = va_rq.filter( function( x ){ return (x[0] != num); } ); 
		}
	    }
	}
	va_pc( num, s, app );
    }
    setTimeout( function(){ va_pq() }, 100 );
}
function va_prip(){ 
    if( !va_qir ){
	va_qir = true;
	va_pq();
    }
}
function va_sa(num){ 
    var is = document.getElementsByName("va_at");
    for( var i=0; i<is.length; i++ ){
	if( i == num ) is[i].style.fontWeight = "bold";
	else is[i].style.fontWeight = "normal";
    }
    va_at = num;
}
va_sa( va_at );
function va_fy(obj) { 
    var curtop = 0;
    if (obj.offsetParent) {
	do {
	    curtop += obj.offsetTop;
	} while (obj = obj.offsetParent);
	return curtop;
    }
}
var va_d, 
    va_dd, 
    va_ib, 
    va_pp, 
    va_mc, 
    va_wd, 
    va_vd; 
function va_tc(){ 
    if( !document.getElementById('va_pp') ){
	va_ib = document.getElementsByName("body")[0];
	if( va_ib ){
	    va_pp = document.createElement('div');
	    va_pp.id = "va_pp";
	    va_pp.className = "As";
	    va_pp.style.padding = "4px 1px 4px 4px"; 
	    va_pp.style.border = "1px solid #979797"; 
	    va_pp.style.display = 'block';
	    va_pp.tabindex = "-1";
	    va_ib.offsetParent.appendChild(va_pp);
	    va_mc = document.createElement('div');
	    va_mc.id = 'va_mc';
	    va_mc.className = 'At';
	    va_mc.style.position = 'relative';
	    va_mc.tabindex = "-1";
	    va_pp.appendChild( va_mc );
	    va_wd = document.createElement('div');
	    va_wd.className = "Ak";
	    va_wd.style.position = "absolute";
	    va_wd.style.top = "0";
	    va_wd.style.left = "0";
	    va_wd.style.height = "100%";
	    va_wd.style.overflowX = "hidden";
	    va_wd.style.visibility = "hidden";
	    va_wd.tabindex = "-1";
	    va_mc.appendChild( va_wd );
	    va_vd = document.createElement('div');
	    va_vd.className = "Ak";
	    va_vd.style.position = "absolute";
	    va_vd.style.top = "0";
	    va_vd.style.left = "0";
	    va_vd.style.height = "100%";
	    va_vd.style.overflowX = "hidden";
	    va_vd.style.visibility = "visible";
	    va_vd.tabindex = "-1";
	    va_mc.appendChild( va_vd );
	    va_ok = true;
	    va_ad = 0; 
	    va_mmm( false );
	}
    }
    if( va_ib ){
	va_sc();
	var hw1 = (window.innerHeight / 2 - 27) + 'px';
	var hw2 = (window.innerHeight / 2 - 27) + 'px';
	va_ib.style.maxHeight = hw1;
	va_ib.style.height = hw1;
	va_mc.style.height = hw2;
	va_wd.style.height = hw2;
	va_vd.style.height = hw2;
	scrollTo( 0, va_fy( va_ib ) - 6 );
	va_ib.addEventListener( "keydown", function(){ 
		va_tpn = va_ib.value.split( va_pdr ).length;
		va_c = va_wtt( va_ib.selectionStart );
	    }, false );
	va_ib.addEventListener( "keyup", va_tin, false );
	va_rq.push( [ -1, va_ib.value, 0 ] );
	va_prip();
    }
}
function va_wtt( n ){ 
    var s = va_ib.value.substring( 0, n );
    var r = s.split( va_pdr ).length - 1;
    return r;
}
function va_tin(e){ 
    var k = (window.event) ? event.keyCode : e.keyCode; 
    if( k == 119 ){ 
	va_rq.push( [ -1, va_ib.value, 0 ] );
	va_prip();
	return;
    }
    if( va_at == 1 ){
	if( ( k <= 40 ) 
	    && ( k != 8 ) 
	    && ( k != 13 ) 
	    && ( k != 32 ) 
	    ) return;
	var tps = va_ib.value.split( va_pdr ),
	    tpn = tps.length,
	    c = va_wtt( va_ib.selectionStart );
	if( tpn == va_tpn ){
	    va_rq.push( [ c, tps[c], 0 ] );
	}
	if( tpn < va_tpn ){
	    var d = va_tpn - tpn; 
	    for( var j = c+d; j >= c+1; j-- ){
		va_rq.push( [ j, "", -1 ] );
		va_ad++;
	    }
	    va_rq.push( [ c, tps[c], 0 ] );
	}
	if( tpn > va_tpn ){
	    var d = tpn - va_tpn; 
	    va_rq.push( [ va_c, tps[va_c], 0 ] );
	    for( var j = va_c+1; j <= va_c+d; j++ ) {
		va_rq.push( [ j, tps[j], 1 ] );
		va_ad++;
	    }
	}
	va_prip();
    }
}
var va_c, 
    va_tps = [], 
    va_tpn; 
function va_ltgt( m ){ 
    if( m ){
	m = m.replace(/&/g,"&amp;");    	
	m = m.replace(/>/g,"&gt;");    	
	m = m.replace(/</g,"&lt;");    	
	return m;
    }
    else return "";
}
function va_pc( num, s, app ){ 
    if( !document.getElementsByName("body")[0] ) return; 
    va_ok = false;  
    if( num == -1 ){ 
	va_q.Push( function(){
		va_mmm( true );		
		va_wd.innerHTML = va_ltgt( s );
	    } );
	va_q.Push( [ "Typeset", MathJax.Hub, va_wd ] );
	va_q.Push( function(){ 
		var ms = va_wd.innerHTML.split( va_pdr ); 
		va_tps = [];
		var tpnnow = s.split( va_pdr ).length;
		va_vd.innerHTML = "";
		for( var i = 0; i < tpnnow; i++ ){
		    var p = document.createElement("p"); 
		    va_tps.push( p );
		    va_vd.appendChild( p );
		    if( ms[i].length ) p.innerHTML = ms[i];
		    else p.innerHTML = "&nbsp;";		    
		}
		va_mmm( false );
	    });
    }
    else {
	if( app == -1 ){ 
	    va_q.Push( function(){
		    if( typeof va_tps[num] != "undefined" ){
			va_vd.removeChild( va_tps[ num ] );
			va_tps.splice( num, 1 );	  
		    }
		    else alert( 'can not remove ' + num );
		} );
	}
	else { 
	    if( app == 0 )
		va_q.Push( function(){ var p = va_tps[ num ]; } ); 
	    if (app == 1) { 
		va_q.Push( function(){ 
			var p = document.createElement("p"); 
			if( va_tps[ num-1 ] ){
			    va_vd.insertBefore( p, va_tps[ num-1 ].nextSibling ); 
			    va_tps.splice( num, 0, p );
			} else alert( (num-1) + ' is undefined' );
		    } );
	    }
	    va_q.Push( function(){ 
		    va_wd.innerHTML = va_ltgt( s );
		} );
	    va_q.Push( [ "Typeset", MathJax.Hub, va_wd ] );
	    va_q.Push( function(){ 
		    var p = va_tps[ num ];
		    var m = va_wd.innerHTML;
		    if( m.length ) p.innerHTML = m;
		    else p.innerHTML = "&nbsp;";
		});
	}
    } 
    va_q.Push( function(){ va_ok = true } );    
} 
function va_mmm( a ) { 
    var m = document.getElementById( "MathJax_Message" );
    if( m ){
	if( a ) m.style.visibility = "visible";
	else m.style.visibility = "hidden";
    }
}
function va_tr(){ 
    va_mmm( true );
    var es = document.getElementsByClassName('ii gt'); 
    if( es.length > 0 ) va_sc();
    for( var i=0; i<es.length; i++ )
	if( ! es[i].className.match("va_ar") )
	    va_toe( es[i] );
}
function va_fe( e ){ 
    var t = e.innerHTML;
    t = t.replace( /(<div class="im">)([\s\S]*?)(<\/div>)/g, "$2");
    t = t.replace(/<[w]*br>/g,"\n");
    t = t.replace(/\n\n/g,"<br>");
    e.innerHTML = t;
    return e;
}
function va_toe( e ){ 
    e = va_fe( e );
    va_q.Push( ["Typeset",MathJax.Hub, e] );
    va_q.Push( function(){ 
	    e.className = 'va_ar ' + e.className;
	} );
}
GmailTeX = document.createElement('div');
GmailTeX.id = 'GmailTeX';
GmailTeX.style.display = 'none';
document.getElementsByTagName('head')[0].appendChild( GmailTeX );
} else { alert("GmailTeX is already running. If it is really not running, reload Gmail and try again.") }

}; // end gmailtexWrapper function

// Returns a string of the function content
function getFunctionContent(str){
var s = str;
s = s.replace(/^function *\(\) *{/, '');
s = s.replace(/}$/, '');
return s;
}
// Put the gmailtex code into a string
var gmailtexStr = getFunctionContent(new String(gmailtexWrapper));

//===========================================================
// Load code
//===========================================================

// Load code ideas borrowed from the following userscripts:
// Pimp.my.Gmail
//   http://userscripts.org/scripts/review/75047
// Gmail 'Mark all as read' button
//   http://userscripts.org/scripts/review/75047
//
 
var attempt = 0;
var waitGmailLoad = setInterval(function() {
    if (attempt++ > 100) {
        clearInterval(waitGmailLoad);
        console.log("gmailtexloader: give up loading");
        return;
    }
    var canvas = document.getElementById("canvas_frame");
    if(canvas && canvas.contentDocument) { 
        var gmail = canvas.contentDocument;
        var sidebar = gmail.getElementsByClassName('nH pp');
        
        if (sidebar.length > 0) {
            clearInterval(waitGmailLoad);
            console.log("gmailtexloader: loading");
            loadGmailTeX(gmail);
        }
    }
}, 400);

function loadGmailTeX(gmail) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    var t = document.createTextNode(gmailtexStr);
    s.appendChild(t);
    gmail.getElementsByTagName("head")[0].appendChild(s);
}
