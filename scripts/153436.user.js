// ==UserScript==
// @id             GoogleCLAd
// @name           Google Craigslist Ad
// @version        
// @namespace      nomonkeynodeal
// @author         
// @description    Does a quick google of the longest sentence in a CL ad to see where it's been previously posted.
// @include        *.craigslist.org/*m4m/*.html
// @include        *.craigslist.org/*w4w/*.html
// @include        *.craigslist.org/*w4m/*.html
// @include        *.craigslist.org/*m4w/*.html
// @include        *.craigslist.org/*cas/*.html
// @include        *.craigslist.org/*stp/*.html
// @include        *.craigslist.org/*msr/*.html
// @run-at         document-end
// ==/UserScript==

checkupdate();

//post got flagged down, exit
if(document.body.innerHTML.indexOf("This posting has been flagged for removal.")!=-1) throw("Post was flagged down.");

var element=document.getElementById("postingbody");
var post=element.innerHTML;

//mark where various punctuation is so we can put it back later.
post=post.replace(/\. /gi,"z010zy010y");
post=post.replace(/<br>/gi,"z020zy020y");
post=post.replace(/\! /gi,"z030zy030y");
post=post.replace(/\? /gi,"z040zy040y");

post=post.replace(/'/g,"\'");

sentences=post.split(/z0\d0z/g);

//finds longest sentence
var longestindex=sentences.indexOf(sentences.reduce(function(a,b){return a.replace(/y0\d0y/gi,"").length>b.replace(/y0\d0y/gi,"").length?a:b;}));

var subject="";

for(index in sentences){
//GM_log(sentences[index]);
 sentences[index]=sentences[index].replace(/^\s+|\s+$|^(?:&nbsp;)+|(?:&nbsp;)+$/g, "");
 
 //try to find required subject line for the lulz (only update if not already set)
 subject=subject.length<1?getsubject(sentences[index]):subject;
   
 var link="http://google.com/search?filter=0&pws=0&as_epq="+
    escape(sentences[index]
    .replace(/y0\d0y/gi,"")
    .replace(/\s+|&nbsp;/g,"+")
    .replace(/&amp;/g,"&")
    );
 
 //link text used for the post itself. The punctuation is actually before each sentence because of split().
 var linktext=sentences[index]
    .replace(/y010y/gi,". ")
    .replace(/y020y/gi,"<br>")
    .replace(/y030y/gi,"! ")
    .replace(/y040y/gi,"? ");   

 //this produces link text without punctuation for use in quoting the longest sentence.
 var linktextnopunctuation=sentences[index]
    .replace(/y0\d0y/gi,""); 
  
 sentences[index]="<a style='color:#000000;text-decoration:none;' href='"+link+"'>"+linktext+"</a>";

  if(index==longestindex){
    getgoogle(link.replace(/&#39;/g,"'"),subject);

    var longestlinkcolor=linktextnopunctuation.length>=44?"00AA00":"CC0000";
    var longestlink="<a style='color:#"+longestlinkcolor+";text-decoration:none;' href='"+link+"'>"+linktextnopunctuation+"</a>";
    var longestplainlink="<a href='"+link+"'>"+link+"</a>";
  }
} //for

element.innerHTML=sentences.join("")+"</a>";


function getsubject(str){
  try{
    var subjectline=str.match(/(?:include|put|reply with|type)(?: the word| the phrase)? ?([^\.]{3,60}?) (?:in|on|for|as) ?(?:the|your)? ?(?:email)? (?:subject|subline|header|title)/i)[1];
    //GM_log(subjectline);
    return "<br>Subject requested: [<font color='purple'>"+subjectline+"</font>]"; 
  }catch(e){
    try{//try alternate format
      var subjectline=str.match(/(?:include|put|reply with|type) (?:in|on|for|as) ?(?:the|your)? (?:subject|subline|header|title) ?(?:line)? ([^\.]{3,60}).*$/i)[1];
    //GM_log(subjectline);
      return "<br>Subject requested: [<font color='purple'>"+subjectline+"</font>]"; 
    }catch(e){
      return "";
    }
  }
  
}

function getgoogle(query){
//GM_log(query);
  GM_xmlhttpRequest({method:"GET",url:query,
    onload: function(responseDetails) {
    //GM_log(responseDetails.responseText);
      if(responseDetails.responseText.search(/<div id=\"?resultStats\"?>/i)!=-1){
        //scrape number of search results
        var results=responseDetails.responseText.match(/<div id=\"?resultStats\"?>.*?([\d|,]+?) result/i)[1];
        
        //dump bottom ads on google page before scraping domains
        var resp=responseDetails.responseText;
        var adstart=resp.search(/<div id="bottomads">/);
        if(adstart>0) resp=resp.substring(0,adstart); 
        
        //look for cite tags containing a domain; some rare ones do not have a domain in them.
        var sites=resp.match(/<cite>.*?(?:www.)?((?:_|-|\d|\w|\.)+?\.\w{2,4})\/.*?<\/cite>/g);
        
        for(index in sites){
         //pull out actual domain(s). This may result in several domains for certain listings, so don't regex out unwanted characters yet.
         var temparr=sites[index].match(/(?:www.)?(?:_|-|\d|\w|\.)+?\.\w{2,4}\//g);
         
         //pick the last domain in the list, and match out the domain without unwanted trailing slash.
         sites[index]=temparr[temparr.length-1].match(/(?:www.)?((?:_|-|\d|\w|\.)+?\.\w{2,4})\//)[1];
         
         //make craigslist domains blue.
         if(sites[index].indexOf("craigslist.org")!=-1) sites[index]="<font color=#0077BB>"+sites[index]+"</font>";
        }
        
        element.innerHTML=
         "<b>Google returned <font color='fuchsia'>"+results+"</font> result(s) for the longest sentence.</b> <small>("+
         longestlink+")<br>Sites: "+sites.join(", ")+subject+"</small><hr>"
         +element.innerHTML;
      }else{
        if(responseDetails.responseText
         .indexOf("Our systems have detected unusual traffic from your computer network.")==-1){ //check if we're on a google captcha page
          element.innerHTML=
         "<b>No result(s) for the longest sentence returned.</b> <small>("+
         longestlink+")"+subject+"</small><hr>"+element.innerHTML;
        }else{
         element.innerHTML=
         "Too many complex search requests have been issued so Google is blocking them.<br>"+
         "Try manually searching the sentence. You probably have to fill in a captcha. Click here: "+longestplainlink+subject+"<hr>"+element.innerHTML;
        }
      }
      
      //element.innerHTML+=endpost;
   }
  });
}

function checkupdate(){
//auto update
var SUC_script_num = 153436; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script '+script_name+'.\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for '+script_name+'.');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
}