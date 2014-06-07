// contactsviaduc.user.js
// version 1.0
// 2006-11-8
// Copyright (c) 2006, Eric Mariacher
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name          Contacts Viaduc
// @namespace     http://mariacr.multimania.com/scripts
// @description	  Affiche sur une seule page tous mes contacts Viaduc
// @include       http://www.viaduc.com/contacts/contactsdirects/*
// @version	  1.0
// ==/UserScript==

 // Global variables
  var var_fifo_buffer;
  var var_fifo_temp;
  var var_fifo_sepchar;
  var var_fifo_errorstatus;
  var urlasked=0;
  var urlprocessed=0;



var resultpage=['','','','','','','','','','','','','','','','','','',''];

Initialize();


function evtRecupere() {
	if (window.confirm("Recupere mes contacts?")) {
		var btn = document.getElementById("recupere_mes_contacts");
		btn.setAttribute("value", "Stop");
		li_dbg('there');
		btn.removeEventListener('click', evtRecupere, true);
		btn.addEventListener('click', evtStop, true);
		getNumberOfContacts();
	}
}

function evtPub() {
	if (window.confirm("2 tabs ouverts")) {
		GM_openInTab('http://www.viaduc.com/contacts/invitationsimple/?from=adressbook&lastname=Mariacher&firstname=Eric&email=eric.mariacher@gmail.com&isMember=true');
		GM_openInTab('http://www.viaduc.com/recherche/profil/index.jsp?memberId=002rw1qp9bm4c75');
	}
}

function evtStop() {
	if (window.confirm("Finished")) {
		var btn = document.getElementById("recupere_mes_contacts");
		btn.setAttribute("value", "Stopped");
		for (var i = 0; i < resultpage.length; i++) {
			if(resultpage[i].length>4) {
				outputToTab('<html><head><title>Tous mes contacts Viaduc['+i+']</title></head><body>'+resultpage[i].replace(new RegExp('</table><table>', "g"),'')+'<body><html>');
			}
		}
		fifo_initialise();
		btn.removeEventListener('click', evtStop, true);
	}
}

function Initialize() {
	fifo_initialise();
	var ovl = document.createElement("input");
	ovl.setAttribute("id", "recupere_mes_contacts");
	ovl.setAttribute("type", "button");
	ovl.setAttribute("value", "Recupere");
	ovl.style.position = "absolute";
	ovl.style.top = "12px";
	ovl.style.right = "12px";
	ovl.style.backgroundColor = "lime";
	ovl.addEventListener('click', evtRecupere, true);
	document.getElementsByTagName("body")[0].appendChild(ovl);
	
	var ov2 = document.createElement("input");
	ov2.setAttribute("id", "pub");
	ov2.setAttribute("type", "button");
	ov2.setAttribute("value", "Connectez vous avec Eric Mariacher");
	ov2.style.position = "absolute";
	ov2.style.top = "50px";
	ov2.style.right = "12px";
	ov2.style.backgroundColor = "turquoise";
	ov2.addEventListener('click', evtPub, true);
	document.getElementsByTagName("body")[0].appendChild(ov2);
}

function outputToTab(str) {
	GM_openInTab("data:text/html;charset=UTF-8," + encodeURI(str));
}

function searchUrls(numofpage,mxresultpage) {
	li_dbg('sus '+numofpage);
	li_dbg('sus[' +mxresultpage+']');
	for (var i = 1; i < numofpage; i++) {
		fifo_push('http://www.viaduc.com/contacts/contactsdirects/index.jsp?pageNumber='+i);
	}
	searchUrl(fifo_pop(),mxresultpage);
}

function searchUrl(urlStr,mxresultpage) {
	var txt, output, maaxresultpage=mxresultpage;
	request = {
		method:'GET',
		url: urlStr,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/xml',
		},
		onreadystatechange: function(responseDetails){
			var  muxresultpage=maaxresultpage;
			// only if req is "loaded"
			if (responseDetails.readyState == 4) {
				// only if "OK"
				if (responseDetails.status == 200) {
					output=Math.floor(Math.random()*muxresultpage);
					li_dbg('[' +maaxresultpage+'/'+output+']');
					li_dbg(' searchUrl('+urlStr+' returned ' + responseDetails.status +
					' ' + responseDetails.statusText + ' ' + responseDetails.responseText.length);
					resultpage[output]=resultpage[output].concat(parseLinkedInResults(responseDetails.responseText));
					var btn = document.getElementById("recupere_mes_contacts");
					btn.setAttribute("value", "["+fifo_countelements()+"-"+urlasked+"-"+urlprocessed+"]");
					urlprocessed++;
					li_dbg('u9['+fifo_countelements()+'-'+urlasked+'-'+urlprocessed+']');
					if(fifo_countelements()!=0) {
						pausecomp(Math.random()*2000);
						searchUrl(fifo_pop(),mxresultpage);
					} else {
						for (var i = 0; i < resultpage.length; i++) {
							if(resultpage[i].length>4) {
								outputToTab('<html><head><title>Tous mes contacts Viaduc['+i+']</title></head><body>'+resultpage[i].replace(new RegExp('</table><table>', "g"),'')+'<body><html>');
							}
						}
					}
				}
			}
		}
	};
	urlasked++;
	GM_xmlhttpRequest(request);
}

function parseLinkedInResults(txt) {
	//li_dbg(txt.length);
	var indexa = txt.indexOf('index.jsp?index=A');
	var indexbt = txt.indexOf('<table class="recordset">',indexa);
	var indexet = txt.indexOf('</table>',indexbt);
	//li_dbg(indexbt+' '+indexet);
	var zetext = txt.substring(indexbt,indexet+8);
	zetext = zetext.replace(new RegExp(' class="\\w*"', "g"),'');
	zetext = zetext.replace(new RegExp('<a.*envoimessage.*</a>', "g"),'');
	zetext = zetext.replace(new RegExp('<a.*action=deleteContact.*</a>', "g"),'');
	zetext = zetext.replace(new RegExp('<img .*/>', "g"),'');
	zetext = zetext.replace(new RegExp('&nbsp;', "g"),'');
	zetext = zetext.replace(new RegExp('title="\\w*"', "g"),'');
	zetext = zetext.replace(new RegExp('valign="\\w*"', "g"),'');
	zetext = zetext.replace(new RegExp('</*div>', "g"),'');
	zetext = zetext.replace(new RegExp('<img style.*">', "g"),'');
	zetext = zetext.replace(new RegExp('<a [^>]*></a>', "g"),'');
	zetext = zetext.replace(new RegExp('<br>', "g"),'</td><td>');
	zetext = zetext.replace(new RegExp('<td>\\s*</td>', "g"),'');
	zetext = zetext.replace(new RegExp('/recherche', "g"),'http://www.viaduc.com/recherche');
	return zetext;
}

function remplace(txt, tin, tout) {
  var re = new RegExp(tin, "g");
  return txt.replace(tin,tout);
}

function getNumberOfContacts() {
	var txt, urlStr='http://www.viaduc.com/contacts/contactsdirects/index.jsp?pageNumber=1';
	request = {
		method:'GET',
		url: urlStr,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'text/xml',
		},
		onreadystatechange: function(responseDetails){
			// only if req is "loaded"
			if (responseDetails.readyState == 4) {
				// only if "OK"
				if (responseDetails.status == 200) {
					li_dbg(' searchUrl('+urlStr+' returned ' + responseDetails.status +
					' ' + responseDetails.statusText + ' ' + responseDetails.responseText.length);
					  var re = new RegExp('En contact direct avec \d* membres', "g");
					  var zob = 'En contact direct avec ';
					  var index1 = responseDetails.responseText.indexOf(zob);
					  var index2 = responseDetails.responseText.indexOf(' membres');
					  var numofcontacts = parseInt(responseDetails.responseText.substring(index1+zob.length,index2));
					  li_dbg(numofcontacts+ ' [' +responseDetails.responseText.substring(index1+zob.length,index2)+']');
					  var maxresultpage=Math.floor(numofcontacts/600)+1;
					  li_dbg('maxresultpage [' +maxresultpage+']');
					  searchUrls((numofcontacts/15)+2, maxresultpage);
				}
			}
		}
	};
	li_dbg("getNumberOFfContacts()");
	GM_xmlhttpRequest(request);
}

  // Call to initialise system
  function fifo_initialise(){
   var_fifo_buffer=""
   var_fifo_temp=""
   var_fifo_sepchar="~"
  }

  // Call to finalise system
  function fifo_finalise(){
  }

  // Push a new element into the buffer
  function fifo_push(newelement){
   output=true
   var_fifo_temp=newelement
   if (var_fifo_temp.length==0){
    fifo_seterror("there is nothing to push!")
    output=false
    } else {
     if (var_fifo_temp.indexOf(var_fifo_sepchar)>0){
      fifo_geterror("illegal character");
      } else {
      var_fifo_buffer=var_fifo_buffer+var_fifo_temp+var_fifo_sepchar
     }
    }
   return(output)
  }

  // Pop an element from the buffer
  function fifo_pop(){
   newlen=0
   var_fotjeff_temp=""
   if (var_fifo_buffer.length==0){
    fifo_geterror("there is nothing to pop!")
    } else {
     if (var_fifo_buffer.indexOf(var_fifo_sepchar)==-1){
      fifo_geterror("the "+var_fifo_sepchar+" character is illegal in the buffer")
      } else {
      var_fifo_temp=var_fifo_buffer.substr(0,(var_fifo_buffer.indexOf(var_fifo_sepchar)))
      newlen=var_fifo_buffer.length-(var_fifo_buffer.indexOf(var_fifo_sepchar))
      var_fifo_buffer=var_fifo_buffer.substr((var_fifo_buffer.indexOf(var_fifo_sepchar)+1),newlen)
     }
    }
    return(var_fifo_temp)
  }

  // Read the current buffer
  function fifo_readbuffer(){
   return(var_fifo_buffer)
  }

  // Set the current buffer
  function fifo_writebuffer(newvalue){
   var_fifo_buffer=newvalue
  }

  // Reset the current buffer
  function fifo_reset(){
   var_fifo_buffer=""
  }

  // Count the number of elements in the buffer
  function fifo_countelements(){
   var count=0;
   for (i=0; i<var_fifo_buffer.length; i++){
    if (var_fifo_buffer.substr(i,1)==var_fifo_sepchar){
    count=count+1;
    }
   }
	/*var arr0 = txt.match(new RegExp(var_fifo_sepchar,"g"));
	if(arr0) {
		count = arr0.length;
	}*/
   return(count)
  }

  // Set the error status flag
  function fifo_seterror(message){
   var_fifo_errorstatus=message
  }

  // Get the error status flag
  function fifo_geterror(message){
   return(var_fifo_errorstatus)
  } 


// www.sean.co.uk
function pausecomp(millis) {
	var date = new Date();
	var curDate = null;

	li_dbg('wait '+ millis +' milliseconds.');
	do { curDate = new Date(); }
	while(curDate-date < millis);
}

function trim(string) {
	return string.replace(/(^\s*)|(\s*$)/g,'');
}


function li_dbg(str) {
	var date = new Date();
	GM_log(date+':'+str);
}





