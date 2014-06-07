// ==UserScript==
// @name           eCOLORepublik
// @author		   megalomaniac and UgoRaffaele
// @namespace      http://www.erepublik.com/*
// @include        http://www.erepublik.com/*
// ==/UserScript==

    var aid='';
	var cn='';
    var aryClassElements = getElementsByClassName( 'nameholder', document.body );
    for ( var i = 0; i < aryClassElements.length; i++ ) {
	    if (i>0) {
			aid=aryClassElements[i].href;
			aid=aid.replace('http://www.erepublik.com/en/citizen/profile/','')
			cn=aryClassElements[i].innerHTML;
			getPartyID(aid,cn);
		} 
    }

function getElementsByClassName( strClassName, obj ) {
    var ar = arguments[2] || new Array();
    var re = new RegExp("\\b" + strClassName + "\\b", "g");

    if ( re.test(obj.className) ) {
        ar.push( obj );
    }
    for ( var i = 0; i < obj.childNodes.length; i++ )
        getElementsByClassName( strClassName, obj.childNodes[i], ar );
    
    return ar;
}

function getPartyID (cid,nick) {
    var party;
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://api.erepublik.com/v1/feeds/citizens/' + cid + '.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom.getElementsByTagName('citizen');
			for (var i = 0; i < entries.length; i++) {
				party = entries[i].getElementsByTagName('party-id')[0].textContent;
			    
			    var aryClassElements = getElementsByClassName( 'nameholder', document.body );
				for ( var j = 0; j < aryClassElements.length; j++ ) {
				    if (aryClassElements[j].innerHTML==nick){
						if (party==872 || party==1152 || party==2540 ) {
						aryClassElements[j].innerHTML="<img src=http://img197.imageshack.us/img197/8304/commd.jpg title='WARNING: Communism inside!'></img>  " + aryClassElements[j].innerHTML;
						} 
                                                                        if (party==1062) {
						aryClassElements[j].innerHTML="<img src=http://img257.imageshack.us/img257/7131/cd89fef7ffdd490db800357.jpg title='WARNING: Fascism inside!'></img>  " + aryClassElements[j].innerHTML;
						} 

					}
				}
	
				
			}
		}
	});
}