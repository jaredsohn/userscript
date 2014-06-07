// ==UserScript==
// @name           Libertarian Party Activity Script
// @namespace      eRepublik
// @description    This will allow you to see party updates at any time!
// @include        http://www.erepublik.com/*
// @version        1.2
// ==/UserScript==

TINY={};
 
function T$(id){return document.getElementById(id)}
 
TINY.ajax=function(){
    return{
        call:function(u,f,p){
            var x=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
            x.onreadystatechange=function(){
                if(x.readyState==4&&x.status==200){
                    if(f){
                        f(x);
                    }
                }
            };
            if(p){
                x.open('POST',u,true);
                x.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=UTF-8');
                x.send(p)
            }else{
                x.open('GET',u,true);
                x.send(null)
            }
        }
    };
}();

function updateArticleContent( x )
{
	var previewData = /<p class=\"preview\">\n(.*)<\/p>/g.exec( x.responseText );
	
	var header = document.getElementById( "menu" );
	
	header.innerHTML += "<div class=\"sholder\" id=\"filters_expanded\" style=\"width:96%;\"><br />" + previewData[1] + "<br /><br /></div>";
}

function loadLibertarianPartyNews()
{
	if( document.getElementById( "citizen_feed" ) )
	{
		TINY.ajax.call( 'http://www.erepublik.com/en/article/955448/1/20', updateArticleContent );
	}
}

loadLibertarianPartyNews();