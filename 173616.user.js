// ==UserScript==
// @name        QuickFlix IMDB Rotten Tomatoes
// @version    	0.7
// @description Based on http://userscripts.org/scripts/show/91809 by fileoffset
// @copyright   2013+, No Copyright    
// @include     http://www.quickflix.com.au/*
// ==/UserScript==

(function() { 															// Begin scoping function
    
var title = document.getElementById('TitlePage').childNodes[1];
var title1 = document.getElementsByTagName("head")[0].childNodes[2];
var year = document.getElementById('TitlePage').childNodes[1].childNodes[1];
var titlecode;
var ttchk = 0;


if (title)
    
    var yearno = year.innerHTML;
    var yearno = yearno.slice(1,5); 									//Remove brackets
    
    
    var title1text = title1.innerHTML.replace(/\s/g,'+');  
    var debugtxt = title1text;											//Figuring out strings on Quicklfix
    var title1text = title1text.replace('+on+Quickflix++++++','');
    var title1text = title1text.replace('+(Blu-ray)','');
    var title1text = title1text.replace('+(Blu-ray/Blu-ray+3D)','');
    var title1text = title1text.replace('+(Blu-ray/+Blu-ray+3D)','');
    var title1text = title1text.replace('+(Blu-ray+3D)','');
    var title1text = title1text.replace('+++++++','');					//Remove unwanted spaces
     
        
    var urlprm = title1text+"+("+yearno+")";
    var urlprmblu = urlprm+"+"+"Blu-ray";
    var urlgate = "http://www.omdbapi.com/?t="+title1text+"&y="+yearno+"&r=JSON&tomatoes=true"
    
    
    
    
    																	//Using OMDBAPI
      
	GM_xmlhttpRequest({
 		method: "GET",
  		url: urlgate,
  		headers: {
    			"User-Agent": "Mozilla/5.0",    		// If not specified, navigator.userAgent will be used.
    			"Accept": "text/xml"            		// If not specified, browser defaults will be used.
  				},
  		onload: function(response) {
    	var responseXML = null;
    
     					// Inject responseXML into existing Object (only appropriate for XML content)
      
      	titlecode = response.responseText;

      
    	if (!response.responseXML) {
      			responseXML = new DOMParser()
        		.parseFromString(response.responseText, "text/xml");
        	}

    GM_log([															//Logging OMDB Response for Console
      response.status,
      response.statusText,
      response.readyState,
      response.responseHeaders,
      response.responseText,
      response.finalUrl,
      responseXML
    ].join("\n"));
            
            
    if (titlecode[2]=="T")												//Checking if OMDB Search found the title
    
    	{
            
    	var imdbRTloc = titlecode.indexOf("imdbRating")+13;				//Extracting IMDB Rating
    	var imdbRTend = titlecode.indexOf("imdbVotes")-3;
    	var imdbrate = titlecode.slice(imdbRTloc,imdbRTend);
    
    	var imdbIDloc = titlecode.indexOf("imdbID")+9;					//Extracting IMDB Title ID from JSON Response
    	var imdblocend = titlecode.indexOf("Type")-3;
    	var imdbtitle = titlecode.slice(imdbIDloc,imdblocend);
            
    	var spacing1 = document.createElement('a');
    	spacing1.innerText = " - ";								   		//Spacing
    	spacing1.style.fontSize = "12px";
    	spacing1.style.fontFamily = "Verdana, Arial, Courier New";
    	spacing1.style.color = "#0000FF";
    	title.appendChild(spacing1);
            
    	var imdbratefmt = imdbrate+(" (IMDB)");
            
        
    	var imdbtt1 = document.createElement('a');
    	imdbtt1.href = 'http://www.imdb.com/title/'+imdbtitle;			
    	imdbtt1.innerText = imdbratefmt;								  //Inserting IMDB Response
    	imdbtt1.style.fontSize = "12px";
    	imdbtt1.style.fontFamily = "Verdana, Arial, Courier New";
    	imdbtt1.style.color = "#0000FF";
    	imdbtt1.target = "_new";
    	title.appendChild(imdbtt1);
            
    	var spacing2 = document.createElement('a');
    	spacing2.innerText = " - ";								   		//Spacing
    	spacing2.style.fontSize = "12px";
    	spacing2.style.fontFamily = "Verdana, Arial, Courier New";
    	spacing2.style.color = "#0000FF";
    	title.appendChild(spacing2);
            
    	var RTratingloc = titlecode.indexOf("tomatoMeter")+14;			//Extracting IMDB Title ID from JSON Response
    	var RTratingend = titlecode.indexOf("tomatoImage")-3;
    	var RTrating = titlecode.slice(RTratingloc,RTratingend);
    
    	var rtlink = document.createElement('a');						//Inserting Rotten Tomatoes rating
    	var rttext = RTrating+"% Fresh"
    	rtlink.href = 'http://www.rottentomatoes.com/search/?search='+ encodeURI(urlprm);
    	rtlink.innerText = rttext;
    	rtlink.style.fontSize = "12px";
    	rtlink.style.fontFamily = "Verdana, Arial, Courier New";
    	rtlink.style.color = "#0000EF";
    	rtlink.target = "_new";
    	title.appendChild(rtlink); 

        var spacing3 = document.createElement('a');
    	spacing3.innerText = " - ";								   			//Spacing
    	spacing3.style.fontSize = "12px";
    	spacing3.style.fontFamily = "Verdana, Arial, Courier New";
    	spacing3.style.color = "#0000FF";
    	title.appendChild(spacing3);
            
        }
            
        else
        
    	{
        
        var notfound = document.createElement('a');
    	notfound.innerText = " Unable to locate Imdb Info ";	//Error Msg for IMDB & Rottten Tomatoes
        notfound.href = 'http://www.imdb.com/find?q='+ encodeURI(urlprm);
    	notfound.style.fontSize = "12px";
    	notfound.style.fontFamily = "Verdana, Arial, Courier New";
    	notfound.style.color = "#0000FF";
        notfound.target = "_new";
    	title.appendChild(notfound);
            
        var spacing4 = document.createElement('a');
    	spacing4.innerText = "- ";								   			//Spacing
    	spacing4.style.fontSize = "12px";
    	spacing4.style.fontFamily = "Verdana, Arial, Courier New";
    	spacing4.style.color = "#0000FF";
    	title.appendChild(spacing4);    
        
        
        };
            
    var gglink = document.createElement('a');							//Google Search
    var ggtext = "Google"
    gglink.href = 'https://www.google.com.au/#safe=off&output=search&q='+ encodeURI(urlprm);
    gglink.innerText = ggtext;
    gglink.style.fontSize = "12px";
    gglink.style.fontFamily = "Verdana, Arial, Courier New";
    gglink.style.color = "#0000EF";
    gglink.target = "_new";
    title.appendChild(gglink);  
            
            
    var spacing5 = document.createElement('a');
    spacing5.innerText = " - ";								   				//Spacing
    spacing5.style.fontSize = "12px";
    spacing5.style.fontFamily = "Verdana, Arial, Courier New";
    spacing5.style.color = "#0000FF";
    title.appendChild(spacing5);
          
        
    var qfbrlink = document.createElement('a');							//Search Bluray Version on Quickflix
    qfbrlink.href = 'http://www.quickflix.com.au/Catalogue/Search?searchQuery='+ encodeURI(urlprmblu);
    qfbrlink.innerText = "Blu-ray";
    qfbrlink.style.fontSize = "12px";
    qfbrlink.style.fontFamily = "Verdana, Arial, Courier New";
    qfbrlink.style.color = "#0000FF";
    title.appendChild(qfbrlink);
            
//    var spacing6 = document.createElement('a'); 						//Ignore
//    writetxt = "   "+debugtxt;
//    spacing6.innerText = writetxt;								   	
//    spacing6.style.fontSize = "12px";
//    spacing6.style.fontFamily = "Verdana, Arial, Courier New";
//    spacing6.style.color = "#0000FF";
//    title.appendChild(spacing6);
            
      
        }
});																		//End Function GM_xmlhttpRequest
    
    })();         														// End scoping function