// ==UserScript==
// @name           LTMPV lite
// @namespace      caetla://ltm.mp.forum.preview
// @description    LTMPV lite version
// @include        http://leetm.mingpao.com/cfm/Forum3.cfm*
// @include        http://*.leetm.mingpao.com/cfm/Forum3.cfm*
// ==/UserScript==


var quoteIm = "data:image/gif;base64,R0lGODlhFQAUAJEDAP%2F%2FAAAAAP%2F%2F%2FwAAACH5BAEAAAMALAAAAAAVABQAAAJLnI%2Bpyz0BowwtiAuuyJcuy21aZn3dZAmlAo7umqSQGgCyYIa6irNaROv0YiLMa4iQWZa3nMsISz6LPAZKiVRofras4wD5VsTksqMAADs%3D" ;

var xstyle = '.showTxt {max-height:none; overflow:default; color:default;} .hideTxt {max-height:2.5em; overflow:hidden; color:#aaaaaa;}' ;

//if(PRO_addStyle) PRO_addStyle(xstyle) ;
if(GM_addStyle) GM_addStyle(xstyle) ;
//if(PRO_addStyle) PRO_addStyle('.showTxt {display:block;} .hideTxt {display:none}') ;

function addEvent( obj, type, fn ) { 
	if ( obj.attachEvent ) { 
		obj["e"+type+fn] = fn; 
		obj[type+fn] = function() { obj["e"+type+fn]( window.event ); } ; 
		obj.attachEvent( "on"+type, obj[type+fn] ); 
	} 
	else 
		obj.addEventListener( type, fn, false ); 
} ;

var inSide = function(e, a) {
    for(var i=a.length-1; i>=0; i--)
        if(a[i]==e) return true;
    return false;
} ;

var reMove = function(e, a) {
    for(var i=a.length-1; i>=0; i--)
        if(a[i]==e) {
            a[i] = a[a.length-1] ;
            a.pop() ;
            return true ;
        }
    return false;    
} ;


var nxtSib = function(start, tag) {
    var t = start ;
    while(t && t.tagName != tag) t = t.nextSibling ; 
    return t ;
} ;


var tenchu = GM_getValue('IGNORED', '<茄<林鍾源').split("<") ;
//if(tenchu.length < 1) tenchu  = ['', '茄', "林鍾源"] ; // 茄

var $x = function(tag, attr, context, cb) {
    context = context || document ;
    var array = new Array ;
    if(tag) {
        var list = context.getElementsByTagName(tag) ;
        var cnt = 0 ;
        for(var i = 0 ; i < list.length ; i++) {
            var e = list[i] ;
            if(attr) {
                if(e.getAttribute(attr))
                    array[cnt++] = e ;
            } else
                array[cnt++] = e ;
        }
    }
    if(array.length)
        for(var i in array)
            cb(array[i]) ;
} ;
var uriPrefix = window.location.href.replace(/&OpinionPage=\d+/gi,'').replace(/&OpinionID=\d+/gi,'').replace(/#\d+$/i,'') + '&OpinionID=' ;
$x("a","name", null, function(lnk) {
    var opId = lnk.getAttribute("name") ;
    lnk.appendChild(document.createTextNode(opId)) ;
    lnk.setAttribute("href", uriPrefix + opId + '#' + opId) ;
    lnk.setAttribute("style", "font-size:0.8em;text-decoration:none") ;

    var td = nxtSib(lnk.parentNode.nextSibling, 'TD') ;

    var re = /(^|[\s\n\r]|[^="\w\d])((ht|f)tps?:\/\/([^"<>\s]+))/gim;
    td.innerHTML = td.innerHTML.replace(re, '$1<a href="$2" title="$4" style="text-decoration:none">$4</a>') ;
    $x("a", null, td, function(ll) {
        var t = ll.innerHTML
        var l = t.length
        if(l > 60)
            ll.innerHTML = t.substring(0,28) + '..' + t.substring(l - 28, l) ;
	if(ll.href.match("\.(jpg|gif|png|JPG|GIF|PNG)$")) {
            var img = document.createElement("img");
            img.src = ll.href ;
            ll.appendChild(document.createElement("br")) ;
            ll.appendChild(img) ;
        } 

    }) ;
    
    var tx = nxtSib(lnk.nextSibling, 'FONT') ;
    if(tx && tx.firstChild)
        tx = nxtSib(tx.firstChild, 'B') ;
    if(tx) {

        addEvent(tx,'dblclick', function() {
            var poster = tx.innerHTML ;           
            var updated = false ;
            if(inSide(poster, tenchu)) {
                if(confirm("解除無視?\n\t" + poster)) {
                    while(reMove(poster, tenchu)) {} ;
                    updated = true ;
                }                   
            } else {
                if(confirm("加入無視?\n\t" + poster)) {
                    tenchu.push(poster) ;
                    updated = true ;
                }
            }
            
            if(updated) {
//		alert(tenchu.join(" | ")) ;
                GM_setValue('IGNORED', tenchu.join("<")) ;
                location.reload(false) ;
            }
            
        }) ;

        if(inSide(tx.innerHTML, tenchu)) {

        // ignored text

            tx.setAttribute("class", "hideTxt") ;
            var dv0 = document.createElement("div");
            var dv1 = document.createElement("div");
            dv0.appendChild(dv1) ;
            dv1.setAttribute("class", "hideTxt") ;
            dv1.setAttribute("id", "X" + opId) ;
            while(td.firstChild)
                dv1.appendChild(td.firstChild) ;

    	    var btn = document.createElement("img");
    	    btn.setAttribute("src", quoteIm) ;
    	    btn.setAttribute("style", "float:right") ;
    	    td.appendChild(btn) ; //＋－★
    	    td.appendChild(dv0) ;
    	    addEvent(btn,'click', function() {

                var dv = document.getElementById("X" + opId) ;
                if(dv) {
                    if(dv.getAttribute("class") == "hideTxt")
                        dv.setAttribute("class","showTxt") ;
                    else
                        dv.setAttribute("class","hideTxt") ;
                }
            }) ;
        } else {
            // not ignored text, anything to do?
        } 
    }    
    
    
}) ;

