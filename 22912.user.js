// Thumbs2Links
// Copyright (c) 2007 TheDarkman
//
// This work is licensed under a Creative Commons License
// See http://creativecommons.org/licenses/by-nc-sa/2.5/
// 
// Update 1.9 (2007/09/08) - Added: livevideo.com, neufstream.com & ratehispanic.com
//                         - Fixed: youtube,dailymotion,tubehos,imagebeaver
//                         - Removed: bolt.com (site is dead)
//
// ==UserScript==
// @name         Thumbs2Links
// @version      1.9
// @namespace    http://tubemall.net/
// @description  Collect direct links to vids & pics from the thumbnails page
// @include      http://*dailymotion.*/*
// @include      http://*tinypic.com/*
// @include      http://*youtube.com/*
// @include      http://*tubehos.com/*
// @include      http://*mindpoop.com/*
// @include      http://*webshots.com/*
// @include      http://*neufstream.com/*
// @include      http://*photos.yahoo.com/*
// @include      http://*imagebeaver.com/*
// @include      http://*imagefap.com/*
// @include      http://*photobucket.com/*
// @include      http://*rude.com/*
// @include      http://*stickam.com/*
// @include      http://*myvideo.de/*
// @include      http://*break.com/*
// @include      http://*livevideo.com/*
// @include      http://*ratehispanic.com/*
// ==/UserScript==

var elements, vid;

    var gm_button=document.createElement('div');
        gm_button.setAttribute('id','t2l-button');
        gm_button.setAttribute('style','position:fixed;bottom:40px;right:10px;background-color:#FFFFFF;border:2px solid #000000;padding:5px;text-align:center;');

    var gm_paragraph=document.createElement('p');
        gm_paragraph.setAttribute('style','font:normal normal normal 12px Arial,Helvetica,sans-serif;color:#666198;text-decoration:none;margin:0;padding:0;');

    var t2l_span_1=document.createElement('span');
        t2l_span_1.setAttribute('id','t2l-span-1');
        t2l_span_1.setAttribute('style','color:#FF0000;cursor:pointer;');
    var t2l_span_1_text=document.createTextNode('Get direct links!');

    var gm_divider=document.createTextNode(' | ');

    var t2l_span_2=document.createElement('span');
        t2l_span_2.setAttribute('id','t2l-span-2');
        t2l_span_2.setAttribute('style','color:#777777;cursor:pointer;');
    var t2l_span_2_text=document.createTextNode('Close');

    document.getElementsByTagName('body')[0].appendChild(gm_button);
    gm_button.appendChild(gm_paragraph);
    gm_paragraph.appendChild(t2l_span_1);
    t2l_span_1.appendChild(t2l_span_1_text);
    gm_paragraph.appendChild(gm_divider);
    gm_paragraph.appendChild(t2l_span_2);
    t2l_span_2.appendChild(t2l_span_2_text);
    
    document.getElementById('t2l-span-1').addEventListener('click',findserver,false);
    document.getElementById('t2l-span-2').addEventListener('click',hidet2l,false);
    
function hidet2l()
{
  document.getElementById('t2l-button').setAttribute('style','display:none;');
}    

function findserver()
    {		
      addresults(); 
      if  (window.location.href.match(/webshots/i)!=null) getwebshotspics();
      if  (window.location.hostname.match(/tinypic/i)!=null) gettinylinks();
      if  (window.location.hostname.match(/youtube/i)!=null) gettubelinks();
      if  (window.location.href.match(/dailymotion/i)!=null) getdailylinks();
      if  (window.location.href.match(/neufstream/i)!=null) getdailylinks();
      if  (window.location.href.match(/mindpoop/i)!=null) gettoslinks();
      if  (window.location.href.match(/tubehos/i)!=null) gettubehoslinks();
      if  (window.location.href.match(/yahoo/i)!=null) getyahoopics();
      if  (window.location.href.match(/imagebeaver/i)!=null) getbeaverpics();
      if  (window.location.href.match(/imagefap/i)!=null) getfappics();
      if  (window.location.href.match(/photobucket/i)!=null) getbucketpics();
      if  (window.location.hostname.match(/rude/i)!=null) getrudelinks();
      if  (window.location.hostname.match(/stickam/i)!=null) getstickamlinks();
      if  (window.location.hostname.match(/myvideo/i)!=null) getmyvideolinks();
      if  (window.location.hostname.match(/break/i)!=null) getbreaklinks();
      if  (window.location.hostname.match(/livevideo/i)!=null) getlivevideolinks();
      if  (window.location.hostname.match(/ratehispanic/i)!=null) getratehispanicpics(); 
      if  (window.location.hostname.match(/amateurpile/i)!=null) getpilepics();    
}

function addresults()
    {
      var gm_results=document.createElement('div');
      gm_results.setAttribute('id','t2l-results');
      gm_results.setAttribute('style','background-color:#FFFFFF;border:2px solid #000000;padding:5px;text-align:left;'); 
      document.body.appendChild(gm_results);
      var gm_results_paragraph=document.createElement('p');
      gm_results_paragraph.setAttribute('style','font:normal normal normal 12px Arial,Helvetica,sans-serif;color:#777777;text-decoration:none;margin:0;padding:0;');
      var gm_results_span_1=document.createElement('span');
      gm_results_span_1.setAttribute('id','gm_results-span-1');
      var gm_results_span_1_text=document.createTextNode('-=[ Please wait while i load results... ]=-');
      gm_results.appendChild(gm_results_paragraph);
      gm_results_paragraph.appendChild(gm_results_span_1);
      gm_results_span_1.appendChild(gm_results_span_1_text);     
}

// Tinypic function
var gettinylinks = function() 
 {
  elements = document.getElementsByTagName('a');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if (elements[i].href.match(/player.php/i)!=null)  // if it's a link to a movie then grab the direct link	 	
    {
    	addlinka(elements[i].href.replace('player.php?v=',''));
     }     
   }      
}	                     

// Youtube function
var gettubelinks = function()  // if we are on a youtube thumbnails page
 {	
  elements = document.getElementsByTagName('a');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if ((elements[i].href.match(/watch/i)!=null) && (elements[i].innerHTML.match(/img/i)==null)) // if it's a link to a movie then download the page and grab the direct link	 	
    {
      GM_xmlhttpRequest({  //for each thumbnail we download the video page
        method:"GET",
        url:elements[i].href,
        onload:function(result)
          {            	
            title = result.responseText.match(/\<h1 id\=\"video\_title\"\>[^\<]+\</);
            if(title) 
              title = result.responseText.match(/\<h1 id\=\"video\_title\"\>[^\<]+\</)[0].match(/\>[^\<]+\</)[0].replace(/[\>\<]/g,"");	 
            else title = null;
	    lines = result.responseText.split("\n");  // Make an array out of the HTML
            for (var i = 0; i < lines.length; i++) {  // Loop through lines of the HTML		
			var line = lines[i];  		
			if (line.indexOf('/watch_fullscreen?') != -1) {  // This line contains a movie
				addlinka('http://www.youtube.com/get_video?'+ line.substring(line.indexOf('video_id'),line.indexOf('&fs=')-1),title);
				break;
			}		
	    }     
	  }
      });
     }     
   }     
}	                     

// Dailymotion function
var getdailylinks = function()  // if we are on a dailymotion thumbnails page
 {	
  elements = document.getElementsByTagName('a');	// collect all the links
  for (t = 0; t < elements.length; t++) {
    if ((elements[t].href.match(/video/i)!=null) && (elements[t].getAttribute("class") == 'video_title foreground2')) // if it's a link to a movie then download the page and grab the direct link	 	
    {
      GM_xmlhttpRequest({  //for each thumbnail we download the video page
        method:"GET",
        url:elements[t].href,
        onload:function(result)
          {            	
            title = result.responseText.match(/\<h1\>[^\<]+\</);
            if(title) 
              title = result.responseText.match(/\<h1\>[^\<]+\</)[0].match(/\>[^\<]+\</)[0].replace(/[\>\<]/g,"");	 
            else title = null;          	
	    lines = result.responseText.split("\n");  // Make an array out of the HTML
            for (var i = 0; i < lines.length; i++) {  // Loop through lines of the HTML		
			var line = lines[i];  		
			if (line.indexOf('320x240') != -1 && line.indexOf('.flv') != -1) {  // This line contains a movie
				addlinka(unescape(line.substring(line.indexOf('http'),line.indexOf(';')-2)),title);
				break;
			}		
	    }     
	  }	
      });  
    }     
  }      
}	

// Mindpoop function
var gettoslinks = function()  // if we are on a mindpoop thumbnails page
 {	
  elements = document.getElementsByTagName('a');	// collect all the links
  for (t = 0; t < elements.length; t++) {
    if ((elements[t].href.match(/tos.php/i)!=null) && (elements[t].innerHTML.match(/bucket/i)==null) && (elements[t].innerHTML.match(/tinypic/i)==null))// if it's a link to a movie then download the page and grab the direct link	 	
    {
      GM_xmlhttpRequest({  //for each thumbnail we download the video page
        method:"GET",
        url:elements[t].href,
        onload:function(result)
          {            	
	    lines = result.responseText.split("\n");  // Make an array out of the HTML
            for (var i = 0; i < lines.length; i++) {  // Loop through lines of the HTML		
			var line = lines[i];  		
			if (line.indexOf('llnw') != -1) {  // This line contains a movie
				addlinka(line.substring(line.indexOf('youtube-')-7,line.indexOf('.flv')+4));	
				break;
			}				
			if (line.indexOf('youtubeconverter') != -1) {  // This line contains a movie
				var line2 = line.split('value');
				addlinka(line2[1].substring(line2[1].indexOf('http'),line2[1].indexOf('input')-3));
				break;
			}		
			if (line.indexOf('flv_converter') != -1) {  // This line contains a movie
				addlinka(line.substring(line.indexOf('converter')+12,line.indexOf('target')-2));
				break;
			}		
	    }     
	  }	
      });  
    }     
  }
  elements = document.getElementsByTagName('img');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if (elements[i].src.match(/photobucket/i)!=null) //&& (elements[i].src.match('flv')==null)) // if it's a link to a pic page convert it to a direct link	 	
    {
	addlinka('http://' + elements[i].src.substring(elements[i].src.indexOf('bucket-')+7).replace(/-dot-/g,'.').replace(/-slash-/g,'/').replace('_th.jpg','').replace('.flv.jpg','.flv').replace(/-space-/g,' '));
    }
    if (elements[i].src.match('tinypic-')!=null) // if it's a link to a video page convert it to a direct link	 	
    {
	addlinka('http://video.tinypic.com/' + elements[i].src.substring(elements[i].src.indexOf('tinypic-')+8).replace('.jpg','').replace('_th',''));
	//addlinka('http://video.tinypic.com/' + elements[i].src.substring(elements[i].src.indexOf('tinypic-')+8).replace('.jpg','') + "_th");
    } 
    if (elements[i].src.match('video.tinypic')!=null) // if it's a link to a video page convert it to a direct link	 	
    {
	addlinka(elements[i].src);
	addlinka(elements[i].src.replace('_th',''));
    }        
  }  
}	

// Tubehos function
var gettubehoslinks = function()  // if we are on a tubehos thumbnails page
 {	
  elements = document.getElementsByTagName('img');	// collect all the links
  for (t = 0; t < elements.length; t++) {
    if (elements[t].src.indexOf('youtube') != -1) {	 
      vid = 'http://www.youtube.com/watch?v=' + elements[t].src.substring(26,37);
      GM_xmlhttpRequest({  //for each thumbnail we download the video page
        method:"GET",
        url:vid,
        onload:function(result)
          {         
            title = result.responseText.match(/\<h1 id\=\"video\_title\"\>[^\<]+\</);
            if(title) 
              title = result.responseText.match(/\<h1 id\=\"video\_title\"\>[^\<]+\</)[0].match(/\>[^\<]+\</)[0].replace(/[\>\<]/g,"");	 
            else title = null;          	   	
	    lines = result.responseText.split("\n");  // Make an array out of the HTML
            for (var i = 0; i < lines.length; i++) {  // Loop through lines of the HTML		
			var line = lines[i];  		
			if (line.indexOf('/watch_fullscreen?') != -1) {  // This line contains a movie
				addlinka('http://www.youtube.com/get_video?'+ line.substring(line.indexOf('video_id'),line.indexOf('&fs=')-1),title);
				break;
			}		
	    }     
	  }	
      }); 
    }      
  }      
}	

// Webshots function
var getwebshotspics = function()  // if we are on a webshots thumbnails page
 {   		
  elements = document.getElementsByTagName('a');	// collect all the links
  for (t = 0; t < elements.length; t++) {
    if ((elements[t].getAttribute("class") == 'thumb') && (elements[t].href.match(/photo/i)!=null)) // if it's a link to a pic then download the page and grab the direct link	 	
    {
      GM_xmlhttpRequest({  //for each thumbnail we download the pic page
        method:"GET",
        url:elements[t].href,
        onload:function(result)
          {            	
	    lines = result.responseText.split("\n");  // Make an array out of the HTML
            for (var i = 0; i < lines.length; i++) {  // Loop through lines of the HTML		
			var line = lines[i];  		
			if (line.indexOf('fullsize') != -1) {  // This line contains a pic
				addlinka(unescape(line.substring(line.indexOf('http'),line.indexOf('.jpg')+4)));
				break;
			}		
	    }     
	  }	
      });  
    }     
    if ((elements[t].getAttribute("class") == 'thumb') && (elements[t].href.match(/video/i)!=null)) // if it's a link to a vid then download the page and grab the direct link	 	
    {
      GM_xmlhttpRequest({  //for each video we download the html page
        method:"GET",
        url:elements[t].href,
        onload:function(result)
          {            	
	    lines = result.responseText.split("\n");  // Make an array out of the HTML
            for (var i = 0; i < lines.length; i++) {  // Loop through lines of the HTML		
			var line = lines[i];  		
			if (line.indexOf('writeFlashVideo') != -1) {  // This line contains a pic
				addlinka(unescape(line.substring(line.indexOf('http'),line.indexOf('.flv')+4)));
				break;
			}		
	    }     
	  }	
      });  
    }         
  }      
}	

// Yahoo function
var getyahoopics = function()  // if we are on a webshots thumbnails page
 {   		
  elements = document.getElementsByTagName('a');	// collect all the links
  for (t = 0; t < elements.length; t++) {
    if (elements[t].href.match(/photo/i)!=null) // if it's a link to a pic then download the page and grab the direct link	 	
    {
      GM_xmlhttpRequest({  //for each thumbnail we download the pic page
        method:"GET",
        url:elements[t].href,
        onload:function(result)
          {            	
	    lines = result.responseText.split("\n");  // Make an array out of the HTML
            for (var i = 0; i < lines.length; i++) {  // Loop through lines of the HTML		
			var line = lines[i];  		
			if (line.indexOf('__sr_') != -1) {  // This line contains a pic
				addlinka(unescape(line.substring(line.indexOf('http'),line.indexOf('&saveas'))));
				break;
			}
	    }
	  }
      });  
    }
  }
}

// Imagebeaver function
var getbeaverpics = function() 
 {
  elements = document.getElementsByTagName('img');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if (elements[i].src.match(/files/i)!=null)  // if it's a link to a pic page convert it to a direct link	 	
    {
	addlinka(elements[i].src.replace('/t/','/i/'));
    }
  }
}

// Imagefap function
var getfappics = function() 
 {
  elements = document.getElementsByTagName('img');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if (elements[i].src.match(/thumb/i)!=null)  // if it's a link to a pic page convert it to a direct link	 	
    {
	addlinka(elements[i].src.replace('thumb','full'));
    }
  }
}

// Photobucket function
var getbucketpics = function() 
 {
  elements = document.getElementsByTagName('input');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if (elements[i].name.match(/urlcode/i)!=null)  // if it's a link to a pic page convert it to a direct link	 	
    {
	addlinka(elements[i].value.replace('?action=view&current=',''));
    }
  }
}

// Rude.com function
var getrudelinks = function()  // if we are on a rude.com thumbnails page
 {	
  elements = document.getElementsByTagName('a');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if ((elements[i].href.indexOf('/v/') != -1) && (elements[i].innerHTML.match(/img/i)!=null)) // if it's a link to a movie then download the page and grab the direct link	 	
    {
      GM_xmlhttpRequest({  //for each thumbnail we download the video page
        method:"GET",
        url:elements[i].href + '/view_xml/',
        onload:function(result)
          {            	
	    lines = result.responseText.split("\n");  // Make an array out of the HTML
            for (var i = 0; i < lines.length; i++) {  // Loop through lines of the HTML		
			var line = lines[i];  		
			if (line.indexOf('.flv') != -1) {  // This line contains a movie
				title = lines[i - 6].replace('<![CDATA[','').replace(']]>','');
				addlinka(line.substring(line.indexOf('http'),line.indexOf('.flv')+4),title);
				break;
			}
	    }
	  }
      });
     }
   }
}

// Stickam function
var getstickamlinks = function() 
 {
  elements = document.getElementsByTagName('img');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if (elements[i].src.match(/converted/i)!=null)  // if it's a link to a video page convert it to a direct link	 	
    {
	addlinka(elements[i].src.replace('.jpg',''));
    }
  }
}

// Myvideo function
var getmyvideolinks = function() 
 { 
  elements = document.getElementsByTagName('img');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if (elements[i].src.match(/thumbs/i)!=null)  // if it's a link to a video page convert it to a direct link	 	
    {
	addlinka(elements[i].src.replace('_1.jpg','.flv').replace('/thumbs',''));
    }
  }
}

// Break function
var getbreaklinks = function() 
 { 
  elements = document.getElementsByTagName('img');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if (elements[i].src.match(/dnet/i)!=null)  // if it's a link to a video page convert it to a direct link	 	
    {
	addlinka(elements[i].src.replace('_Break_Thumb_100_1.jpeg','.flv').replace('.jpg','.flv').replace('.gif','.flv'));
    }
  }
}

// livevideo function
var getlivevideolinks = function()  // if we are on a livevideo page
 {	
  elements = document.getElementsByTagName('a');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if ((elements[i].href.match('/video/')!=null) && (elements[i].innerHTML.match(/img/i)==null)) // if it's a link to a movie then download the page and grab the direct link	 	
    {
     temp = elements[i].href.split('video/');
     temp1 = temp[1].split('/');
     if (temp1[0].length != 32) temp1[0] = temp1[1];
     GM_xmlhttpRequest({ 
       method:"GET",
       url:'http://www.livevideo.com/media/GetFlashVideo.ashx?cid='+temp1[0],
       onload:function(result)
          {            	
		addlinka(unescape(result.responseText.substring(result.responseText.indexOf('http'),result.responseText.indexOf('.flv')+4)));
	  }
      });
     }     
   }     
}

// Ratehispanic function
var getratehispanicpics = function() 
 {
  elements = document.getElementsByTagName('img');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if (elements[i].src.match(/_thumb/i)!=null)  // if it's a link to a pic page convert it to a direct link	 	
    {
	addlinka(elements[i].src.replace('_thumb',''));
    }
  }
}

// Amateurpile function
var getpilepics = function() 
 {
  elements = document.getElementsByTagName('a');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if (elements[i].href.match(/letmesee.aspx/i)!=null)  // if it's a link to a pic page convert it to a direct link	 	
    {
	addlinka('http://www.boxtheclown.com/PictureBox.aspx?' + elements[i].href.substring(elements[i].href.indexOf('Iid=')));
    }
  }
}

// this makes the file smaller
function addlinka(linka,titlename)
 {	
  var a = document.createElement('a');
  a.setAttribute('style','font:normal normal normal 12px Arial,Helvetica,sans-serif;color:#777777;text-decoration:none;margin:0;padding:0;');
  a.href = linka;	
  a.href = a.href.replace('&#37;3F','?').replace('&#37;3D','=').replace('mindpoop.com','v1.tinypic.com');
  if (titlename != null) a.innerHTML = titlename+'<br>';
  else a.innerHTML = a.href+'<br>';
  document.getElementById('t2l-results').appendChild(a);  // add a link to the video on the bottom of the page
}

// EXTRA = adds a download for embedded vids on livevideo.com and takes care of the mature content warning
if ((window.location.href.match(/livevideo/i)!=null) && (window.location.href.match('/video/')!=null)) // if we are on a video page
 {
  document.getElementById('divMatureWarning').parentNode.removeChild(document.getElementById('divMatureWarning'));
  document.getElementById('divMain').style.display = '';
  temp = window.location.href.split('video/');
  temp1 = temp[1].split('/');
  if (temp1[0].length != 32) temp1[0] = temp1[1];
  GM_xmlhttpRequest({ 
    method:"GET",
    url:'http://www.livevideo.com/media/GetFlashVideo.ashx?cid='+temp1[0],
    onload:function(result)
      {          
      elements = document.getElementsByTagName('a');	
      for (i = 0; i < elements.length; i++) {
        if (elements[i].href.match(/userLogin.aspx/i)!=null) // we found the 'login' link
        {
          elements[i].href=unescape(result.responseText.substring(result.responseText.indexOf('http'),result.responseText.indexOf('.flv')+4));
          elements[i].innerHTML = 'Download!';   // then we replace the link with the new 'Download!' 
        }
      }        		  	
    }
  });
}

// EXTRA = replace tinypic upload link with download link
if (window.location.href.match(/player.php/i)!=null) // if we are on a video page
 {
  elements = document.getElementsByTagName('a');	
  for (i = 0; i < elements.length; i++) {
    if (elements[i].href.match(/Random.php/i)!=null) // we found the 'Random' link
    {
      elements[i].href=window.location.href.replace('player.php?v=','')
      elements[i].innerHTML = 'Download!';   // then we replace the 'Random' link with the new 'Download!' 
    }
  }
}

// EXTRA - if we are on a webshots page lets take care of those annoying ads
if (window.location.host.match(/webshots/i)!=null) 
{
  document.getElementById('footer').parentNode.removeChild(document.getElementById('footer'));
  document.getElementById('madison_mpu').parentNode.removeChild(document.getElementById('madison_mpu')); 
  document.getElementById('text-rubics-ad').parentNode.removeChild(document.getElementById('text-rubics-ad'));
}