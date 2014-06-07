// ==UserScript==
// @name        TweetDeck Fix 
// @namespace   http://twitter.com/myvahid
// @description TweetDeck RTL Optimization
// @include     https://web.tweetdeck.com/
// @version     1
// @grant       none
// ==/UserScript==

function getAttr( ele, attr ) {
	
	var attrs = ele.attributes,
		length = attrs.length,
		i = 0,
		result;
		
	result = (ele.getAttribute && ele.getAttribute(attr)) || null;
	
	if( !result ) {
		for( i ; i < length; i++ ){
			if(attrs[i].nodeName === attr){
				result = attrs[i].nodeValue;
			}
		}
	}
	return result;
}

function addStyle(css) {
	var head, style;
	
	head = document.getElementsByTagName('head')[0];
    if ( !head ) { 
        return false;
    }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function childLoop( node , parentNode ){
	
	var i = 0,
		childNodeList = parentNode.getElementsByClassName( node );
		
	if( childNodeList.length ){
				
		for ( i ; i < childNodeList.length; i++ ){
					
			parentNode.getElementsByClassName( node )[i].setAttribute( "dir", "ltr" );
					
		}

	}

}

function stripHtml( str ) {
	return str.replace(/(<([^>]+)>)/ig,"");
}
  
function isRTL( str ){

	var re = /^[A-Za-z0-9-_+={}`.,'"”“’|:;<>&#@%\~\*\^\!\?\$\(\)\/\\\[\] ]*$/,
		found = str.match(re);
	
	if( !found ){
		return true;
	}
	
}

function main(){


    var i = 0,
		nodeList = document.getElementsByClassName("js-tweet-text"),
		nodeClass;

    for ( i; i < nodeList.length; i++ ) {

        if( getAttr( nodeList[i] , "id" ) != "checked" ){
            
            if( isRTL( stripHtml( nodeList[i].innerHTML ) ) ){   
                
				nodeClass = getAttr( nodeList[i] , "class" );
                
                nodeList[i].setAttribute( "class", nodeClass + " tweet-text-rtl" );
                
				nodeList[i].setAttribute( "id", "checked" );
                console.log( getAttr( nodeList[i] , "class" ) );

                childLoop( "url-ext", nodeList[i] );
                childLoop( "hash", nodeList[i] );
                childLoop( "at", nodeList[i] );

            }
            
        }

    }

}

addStyle('.tweet-text-rtl, .js-compose-input { font-family:Tahoma !important; font-size:13px !important; direction:rtl; text-align:right; unicode-bidi:embed;}');

document.addEventListener("DOMNodeInserted", main, true);