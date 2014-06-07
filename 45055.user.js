// ==UserScript==
// @name           Forum Deblocker
// @namespace      --------------
// @description    The "Forum Deblocker" userscript simulates the Googlebot so you may see the forum pages as google sees them
// @include        http://*/forum/*
// @include        http://*/forums/*
// @include        http://*showtopic*
// @include        http://*topic-t*
// @include        http://*viewtopic*
// @include        http://*showforum*
// @include        http://*showthread.php*
// @include        http://*/thread*
// @include        http://*-bb.com/*
// @include        http://*/topic/*
// @version        20100327
// ==/UserScript==


var divElement;

divElement = document.evaluate("//body",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;

xx = divElement.innerHTML;

var myregexp = new RegExp("(exceeded the maximum number of posts you can view)|(You do not have permission to view)|(πρέπει να είστε εγγεγραμμένο)|(L’administrateur du forum exige)|(Kedves látogató!)|(Nie możemy zweryfikować)|(您无权进行当前操)|(Log me on automatically)|(senha para entrar)|(errorwrap)|(el numero máximo)|(It appears that you're not a member)|(You must already have registered)|(Jen registrovaní uživatelé)|(abyste byli registrováni)|(Δεν έχετε εισέλθει)|(In order to login you must be registered.)|(all you need to do is sign up for a free account)|(Aparentemente has alcanzado el numero máximo de posts)|(You are not logged in)|(not have the required permissions)|(Lütfen aşağıdan giriş)|(Se non sei connesso al forum utilizza)|(prijaviti, moraš se registrirati)|(Registrace trvá jen pár vteřin)|(olmak için Tıklayınız)|(you to be registered and logged in)|(Você não está logado)|(are not logged in)|(Please login)|(aşağıdaki formu kullanarak giriş yapınız)|(The error returned was)");

if (xx.match(myregexp)) {

     GM_xmlhttpRequest({
     method: "get",
     url: location.href,
     overrideMimeType: 'text/html; charset=' + document.characterSet,
     headers:{'User-agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)'},
            // 'Content-type':'application/x-www-form-urlencoded'},       
     onload:function(result) 
	   {
     	if (result.responseText.match(myregexp)){
     		divElement.innerHTML += "<hr/>"+
     		"<div style='background:red;font-size:19px;'>Forum can't be deblocked by emulating Googlebot, trying get google cache</div><hr/>";
     		tryCache();
     		return;
			}else{
		    divElement.innerHTML += "<!-- starting --><hr/>"+
		    "<div style='background:red;font-size:19px;'>Forum deblocked</div><hr/>"+
		    result.responseText+"<!-- ending -->";     	
            }
     	
		}
	  });
}

function tryCache(){
	var googlequery = location.href.replace(/&/g,' inurl:');
	    googlequery = googlequery.replace(/^http:\/\//g,'inurl:');
	//http://www.google.com/search?num=1&hl=en&safe=off&q=inurl%3Aforum.downparadise.com%2Fviewtopic.php%3Ff%3D21+inurl%3At%3D225306&btnG=Search
	googlequery = 'http://www.google.com/search?num=1&hl=en&safe=off&q='+googlequery+'&btnG=Search';
    
     GM_xmlhttpRequest({
     method: "get",
     url: googlequery,      
     onload:function(result) 
	   {
								res = result.responseText;
								foundCache = res.match(/<a href="(http:\/\/\d.*)" on.*Cached<\/a>/);		  
		  if (foundCache) {
			 FfoundCache(foundCache[1]); 
			  }else{
divElement.innerHTML += "<!-- starting --><hr/>"+
		    "<div style='background:red;font-size:19px;'>Forum Deblocked</div><hr/>Could not find cached page<!-- ending -->";					  
				  }
		  
		   }});	
	
	}

function FfoundCache(Cache){
	
	 GM_xmlhttpRequest({
     method: "get",
     url: Cache,
	 onload:function(result) 
	   {
divElement.innerHTML += "<!-- starting --><hr/>"+
		    "<div style='background:red;font-size:19px;'>Forum deblocked</div><hr/>"+
		    result.responseText+"<!-- ending -->";		   
		   }});
	}
