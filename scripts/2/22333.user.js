// ==UserScript==
// @name           IMDB apsubs.com subtitles
// @namespace      http://
// @description    Searching for greek subtitles for movies listed on IMDB.com using the apsubs.com database
// @include        http://*.imdb.com/title/tt*
// @include        http://imdb.com/title/tt*
// ==/UserScript==

// version 200802061742
// version 200802061629
// update Ψάχνει μέσω του imdb ID
// version 200802051658
// update Ψάχνει για ακόμα ένα εναλλακτικό τίτλο σε περίπτωση που δεν βρει αποτελέσματα 

// some ads removal making it cleaner
var ads1 = document.getElementById('tn15adrhs');
if (ads1) {
    ads1.parentNode.removeChild(ads1);
    }
var ads2 = document.getElementById('tn15shopbox');
if (ads2) {
    ads2.parentNode.removeChild(ads2);
    }    

  
// thanks to imdb.com Cleaner http://userscripts.org/scripts/show/5149
 var patterns = new Array(
     "//div[contains(@id, 'lea')]",
     "//a[contains(@href, 'servedby.advertising.com')]",
     "//a[contains(@href, 'eyewonderlabs.com')]",
     "//iframe[contains(@src, 'servedby.advertising.com')]",
     "//iframe[@name = 'kanoodleAd']/ancestor::div[1]",
     "//map[@name = 'AtlasAltMap']/ancestor::div[1]",
     "//font[contains('ADVERTISMENT')]/ancestor::td[1]"
 );
 var results;
 for (var i = 0; i < patterns.length; i++) {
     results = document.evaluate(patterns[i], document, null,
         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
     for (var j = 0; j < results.snapshotLength; j++) {
         results.snapshotItem(j).style.display = "none";
     }
 }
	
//starting
	
  var regexImdbNum = /\/title\/tt(\d{7})\//;
  var arrImdbNum = regexImdbNum.exec(document.location);

 
function get_movie_name(){   
 // var regexTitle = /(?!".+")^(.+?) \(\d{4}(?:\/[IV]+)?\)/; // -- αυτο ψάχνει μόνο για ταινείες
  var regexTitle = /(.*) (?:\(\d{4}(?:\/[IV]+)?\))/;         // -- αυτο ψάχνει και για σήριαλ
  var strTitle = document.getElementsByTagName("title")[0].textContent;
  var arrResult = regexTitle.exec(strTitle);
  
  // Check if the film's title was found
  if (arrResult && arrResult.length == 2) {
  	
  	  	arrResult[1] = arrResult[1].replace(/(.*?)(?:, )(Les$|La$|Det$|Der$|Das$|Le$|El$|The$)/g,'$2 $1');
        arrResult[1] = arrResult[1].replace(/^"/g,'');
        arrResult[1] = arrResult[1].replace(/^The (.{4,})/g,'$1');
        arrResult[1] = arrResult[1].replace(/^ /g,'');
        arrResult[1] = arrResult[1].replace(/"/g,' ');
        arrResult[1] = arrResult[1].replace(/ $/g,'');
        arrResult[1] = arrResult[1].replace(/ /g,'%20');
        arrResult[1] = arrResult[1].replace(/(.{3,}):.*?$/g,'$1');
        arrResult[1] = arrResult[1].replace(/%20%20/g,'%20');
        real_movie_name = arrResult[1];
}
return real_movie_name;
}
  	

function addEventHandler(target, eventName, eventHandler)
{
	if (target.addEventListener)
		target.addEventListener(eventName, eventHandler, false);
	else if (target.attachEvent)
		target.attachEvent("on" + eventName, eventHandler);
}


function getresults_from_apusubs(movieID){

url = 'http://www.apsubs.com/my_hosts_imdb.php?query='+movieID;		

		GM_xmlhttpRequest({
		    method:'GET',
		    url:url,
			onload:function(responseDetails){
				  var foundresults = document.getElementById('apsub_results');
				  // convert string to XML object
			    var xmlobject = (new DOMParser()).parseFromString(responseDetails.responseText, "text/xml");
					var items = xmlobject.getElementsByTagName('result');
	//GM_log(url);				
	//GM_log(responseDetails.responseText);
      for (var i = 0 ; i < items.length ; i++) {
          var item = items[i];
	        var title = item.getElementsByTagName("title")[0].firstChild.nodeValue;
	        
	       if (title.match(/0 results/)){

	      get_movie_name();
	     	foundresults.innerHTML	+= '<span id="nr"><center>0 results for :</center><center style="font-family:monospace"><br> '+real_movie_name.replace(/%20/g,' ')+'</center></span>';
			    			

	        	}else{
	        var release = item.getElementsByTagName("release")[0].firstChild.nodeValue;

	        var file_id = item.getElementsByTagName("file_id")[0].firstChild.nodeValue;	

     	    var translated=item.getElementsByTagName("translator")[0];
     	    
if(translated.firstChild){translator = translated.firstChild.nodeValue;}else{ translator = "";}   


foundresults.innerHTML	+= "<span id='nr'>"+ (i+1) + "</span> <a href='http://www.apsubs.com/dload.php?action=file&file_id="+ file_id +">" + title + "</a> <small>" + release +" "+ translator + "</small><br>";
}   

      }
  
 
	   }
		});

 }

if (typeof GM_xmlhttpRequest != 'function') {
	// do nothing
} else {
	if (window == top) {

		
		var mybox = document.createElement("div");
		mybox.innerHTML = '<div id="apsub_box" style="margin: 0 auto 0 auto;' +
		    '-moz-border-radius-bottomleft:10px;-moz-border-radius-bottomright:10px;'+
        '-moz-border-radius-topleft:10px;-moz-border-radius-topright:10px;'+
		    'position:absolute; left:80%; top:108px; width:175px; opacity: .70; filter: alpha(opacity=75); z-index:100; ' +
		    'margin: 5px; padding: 5px; overflow: hidden; height: 12px; ' +
		    'font-size: 8pt; font-weight: bold; font-family: arial, sans-serif; background-color: #F3EEAD; ' +
		    'border: 1px solid GhostWhite'+
		    //'background:#FFFFCC url(/images/nb15/searchbg.gif) repeat-x scroll center bottom;'+
		    'color: #000000;" > ' +
		    //'Apsubs <a href="http://www.apsubs.com/my_hosts_int.php?query='+movieID+'"> Subtitles:</a> <br/> ' +
		    //'Apsubs <a href="http://www.apsubs.com/dload.php?search_keywords='+arrResult[1]+'&submit=+GO+&search_terms=all&search_terms=all&search_author=&cat_id=0&comments_search=NO&sort_method=file_time&sort_order=ASC&action=search"> Subtitles:</a> <br/> ' +
		    '<span id=aplogo STYLE="background-image:  url(http://apsubs.com/favicon.ico); position:inherit;">&nbsp; &nbsp; &nbsp;</span><center STYLE="cursor: pointer;">Apsubs Subtitles</center><br/> ' +
		    //'<span id=aplogo STYLE="background-image:  url(http://apsubs.com/favicon.ico)">Apsubs Subtitles</span> <br/> ' +
		    //<body STYLE="background-image:  url(http://apsubs.com/favicon.ico)">text</body>
		    '<p id="apsub_results"></p>' +
		    '</div>';

		addEventHandler(mybox, "click",
			function() {
				var box = document.getElementById('apsub_box');
				if (box.style.height.split('px')[0]<250 ) {
					box.style.height = 'auto';
				  box.style.overflow = 'auto';
				} else{
					box.style.height = 12 + 'px';
					box.style.overflow = 'hidden';
				}
			
			var gotitonce = document.getElementById('nr');
			if (!gotitonce){
				getresults_from_apusubs(arrImdbNum[1]);
				}
			
				

		  }
		, true);


   document.body.insertBefore(mybox, document.body.firstChild);
  }
}


