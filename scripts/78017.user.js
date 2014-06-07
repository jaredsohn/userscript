// ==UserScript==
// @name           eGreParties
// @author         TabloMaxos
// @original       megalomaniac
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
		url: 'http://api.erepublik.com/v2/feeds/citizens/' + cid + '.xml',
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
					
						if (party==2526) {
							aryClassElements[j].innerHTML="<img src=http://static.erepublik.com/uploads/avatars/Parties/2009/06/23/234833147b97bb6aed53a8f4f1c7a7d8_55x55.jpg height=20px width=20px title='EM'></img>  " + aryClassElements[j].innerHTML;
						} 
						else if (party==2678) {
							aryClassElements[j].innerHTML="<img src=http://static.erepublik.com/uploads/avatars/Parties/2009/09/18/94aef38441efa3380a3bed3faf1f9d5d_55x55.jpg height=20px width=20px title='LSP'></img>  " + aryClassElements[j].innerHTML;
						} 
						else if (party==2386) {
							aryClassElements[j].innerHTML="<img src=http://static.erepublik.com/uploads/avatars/Parties/2009/02/21/99f59c0842e83c808dd1813b48a37c6a_55x55.jpg height=20px width=20px title='KEE'></img>  " + aryClassElements[j].innerHTML;
						} 
						else if(party==2735) {
							aryClassElements[j].innerHTML="<img src=http://static.erepublik.com/uploads/avatars/Parties/2009/10/15/1d49780520898fe37f0cd6b41c5311bf_55x55.jpg height=20px width=20px title='EPD'></img>  " + aryClassElements[j].innerHTML;
						} 
						else if (party==2627) {
							aryClassElements[j].innerHTML="<img src=http://static.erepublik.com/uploads/avatars/Parties/2009/08/23/4de81d9105c85bca6e6e4666e6dd536a_55x55.jpg height=20px width=20px title='EDA'></img>  " + aryClassElements[j].innerHTML;
						} 
						else if (party==2949) {
							aryClassElements[j].innerHTML="<img src=http://static.erepublik.com/uploads/avatars/Parties/2010/02/08/e07bceab69529b0f0b43625953fbf2a0_55x55.jpg height=20px width=20px title='EEK'></img>  " + aryClassElements[j].innerHTML;
						} 
						else if (party==2820) {
							aryClassElements[j].innerHTML="<img src=http://static.erepublik.com/uploads/avatars/Parties/2009/12/01/aee92f16efd522b9326c25cc3237ac15_55x55.jpg height=20px width=20px title='21H></img>  " + aryClassElements[j].innerHTML;
						} 
						else if (party==2443) {
							aryClassElements[j].innerHTML="<img src=http://static.erepublik.com/uploads/avatars/Parties/2009/04/18/24e27b869b66e9e62724bd7725d5d9c1_55x55.jpg height=20px width=20px title='GIP'></img>  " + aryClassElements[j].innerHTML;
						} 
						else if (party==3106) {
							aryClassElements[j].innerHTML="<img src=http://static.erepublik.com/uploads/avatars/Parties/2010/04/26/4aec1b3435c52abbdf8334ea0e7141e0_55x55.jpg height=20px width=20px title='KOT'></img>  " + aryClassElements[j].innerHTML;
						} 
						else if (party==3015) {
							aryClassElements[j].innerHTML="<img src=http://static.erepublik.com/uploads/avatars/Parties/2010/03/14/51be2fed6c55f5aa0c16ff14c140b187_55x55.jpg height=20px width=20px title='OAK'></img>  " + aryClassElements[j].innerHTML;
						} 
						else if (party==2643) {
							aryClassElements[j].innerHTML="<img src=http://static.erepublik.com/uploads/avatars/Parties/2009/09/01/38181d991caac98be8fb2ecb8bd0f166_55x55.jpg height=20px width=20px title='DPG'></img>  " + aryClassElements[j].innerHTML;
						} 
						else if (party==3130) {
							aryClassElements[j].innerHTML="<img src=http://static.erepublik.com/uploads/avatars/Parties/2010/05/06/c922de9e01cba8a4684f6c3471130e4c_55x55.jpg height=20px width=20px title='SDU'></img>  " + aryClassElements[j].innerHTML;
						} 
						
						else{
							aryClassElements[j].innerHTML="<img src=http://www.erepublik.com/images/default_avatars/Parties/default.gif height=20px width=20px title='Other Party'></img>  " + aryClassElements[j].innerHTML;
						}
					}
				}
	
				
			}
		}
	});
}
