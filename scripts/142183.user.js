// ==UserScript==
// @name            TheGeiBot
// @namespace       http://w3.tbd.my/index.php
// @description     TheGeiBot
// @author          ???
// @include         http://w3.tbd.my/*
// @version         9.5
// ==/UserScript==
// 
function sendResp(url, respon) {

GM_xmlhttpRequest({
  method: "POST",
  url: url,
  data: "shout_data=" + respon + "&shout_key=" + unsafeWindow.my_post_key,
  headers: {
"Content-Type": "application/x-www-form-urlencoded"
  },
  
  onload: function(responseDetails) {
    var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          callback(doc);
    }
});
}


function getPostHash(threadid, messages, callback) {
GM_xmlhttpRequest({
  method: "GET",
  url: "http://w3.tbd.my/newreply.php?tid=" + threadid,
  
  onload: function(responseDetails) {
    var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          source = doc.documentElement.innerHTML;
          hash = source.split("posthash\" value=\"");
          hash = hash[1].split("\" type=\"hidden\"");
          callback(hash[0],threadid, messages, unsafeWindow.my_post_key);
    }
});

}

function sendPost(posthash,threadid, messages, postkey) {

boundary= "-----------------------------31337676334";

GM_xmlhttpRequest({
  method: "POST",
  url: "http://w3.tbd.my/newreply.php?tid=" + threadid + "&processed=1",
  data: "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"my_post_key\"\r\n"+"\r\n"+
        postkey+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"subject\"\r\n"+"\r\n"+
        "Autobot Reply\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"icon\"\r\n"+"\r\n"+
        "-1\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"message_new\"\r\n"+"\r\n"+
        messages+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"message\"\r\n"+"\r\n"+
        messages+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"postoptions[signature]\"\r\n"+"\r\n"+
        "1\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"postoptions[subscriptionmethod]\"\r\n"+"\r\n"+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"attachment\"; filename=\"\"\r\nContent-Type: application/octet-stream"+"\r\n"+"\r\n"+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"submit\"\r\n\r\nPost Reply\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"action\"\r\n"+"\r\n"+
        "do_newreply\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"replyto\""+"\r\n"+"\r\n"+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"posthash\""+"\r\n"+"\r\n"+
        posthash+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"attachmentaid\""+"\r\n"+"\r\n"+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"attachmentact\""+"\r\n"+"\r\n"+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"quoted_ids\""+"\r\n"+"\r\n"+"\r\n"+
        "--"+boundary+"\r\n"+
        "Content-Disposition: form-data; name=\"tid\""+"\r\n"+"\r\n"+
        +threadid+"\r\n"+
        "--"+boundary+"--\r\n",
  headers: {
"Content-Type": "multipart/form-data; boundary="+boundary
  }
});
}


function getPost(url, callback)
{
GM_xmlhttpRequest({
  method: "GET",
  url: url,
  onload: function(responseDetails) {
    var dt = document.implementation.createDocumentType("html", 
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          callback(doc);
    }
});
}

function shoutout(source){

    thejson = source.split("<br>");
    thejson = thejson[0].split("member.php?action=profile&amp;uid=");
    thejson = thejson[1].split("\">");
    userid = thejson[0];
        thejson = thejson[1].split(" - ");
    username = thejson[0];    
        thejson = thejson[1].split(" -- ");
    whatisthecase(thejson[1],username);
        
}

function whatisthecase(youshout,username){
   // For Time Variable Usages  
    var currentTime = new Date();
    var theTime = new Array();
    theTime['Hr']  = currentTime.getHours();
    theTime['Min']  = currentTime.getMinutes();
    theTime['Sec']  = currentTime.getSeconds();

   // Izham thread autoposts
   
    rexp = /^[Pp][Oo][Ss][Tt]/
    // Change your Username to rexp in below
    rexp2 = /^[J][e][j][a][k][a][ ][P][e][m][a][l][u]/
    rexp3 =/^[P][o][s][t][e][d]/
    if (rexp.test(String(youshout)) && rexp2.test(String(username)) && !(rexp3.test(String(youshout)))){
    	iwantToShout('Posted');
	youshout= youshout.split("mesg:");
    	tid=youshout[0].split(" ");
    	tid=tid[1];
    	mesg=youshout[1];
    	getPostHash(tid, mesg, function(posthash,threadid,messages, postkey) {  sendPost(posthash,threadid, messages, postkey) });
	return;
    //EOF Izham Thread autoposts
    
    } else {
	
    // For using cases statement it starts here
    	switch (youshout){
	    case("testing"):{
		shellvalue = "success";
		break;
	    }
	      default:{
		shellvalue = "";
		break;
	    }
	}
	
	if ( shellvalue != "" ){          
        	iwantToShout(shellvalue);
      // EOF Using case statements
      
      	}else{
       
      // You own Regular Expression
      		// Example of a salam being called
        	regexp = /^[Ss][Aa][Ll][Aa][Mm]/
        	if (regexp.test(String(youshout))){
        		iwantToShout("وَعَلَيْكُمْ السَّلاَمُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ");
        	} else if (  theTime['Hr'].toString() == '1' && theTime['Min'].toString() == '5' && theTime['Sec'].toString() == '10' ){
        	//Example of using time in your condition
        	iwantToShout("[bot]");

        	}
        }
        
      // EOF own regular expression
   }
}

function iwantToShout(theseWords){
	sendResp('http://w3.tbd.my/xmlhttp.php?action=add_shout', theseWords);
}

setInterval (function() {getPost('http://w3.tbd.my/xmlhttp.php?action=show_shouts', function(doc) {  shoutout(doc.documentElement.innerHTML) });}, 2000);