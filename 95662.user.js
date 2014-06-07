// ==UserScript==
// @name        Rapidshare+Megaupload download helper
// @homepage    http://userscripts.org/scripts/show/95662
// @description Auto download RS&MU File
// @include     http://rapidshare.*/*
// @include     http://*.rapidshare.*/*
// @include     https://*rapidshare.com/#!download*                   
// @include	    http://www.megaupload.com/*d=*
// @include	    http://megaupload.com/*d=*
// @include	    http://*.megaupload.com/*d=*
// @copyright   Lijun
// @version     3.1.1
// @author      Lijun
// ==/UserScript==
if(location.href.indexOf("rapidshare")!==-1){

function createRSLink(rsl, u) {
if (rsl) {
	if (rsl.indexOf("ERROR")!=-1) {
		return "nothingtodo";
	}
	var rshost = rsl.split('DL:')[1].split(',')[0];
	var rsauth = rsl.split(',')[1];
	var rsid = u.split('fileid=')[1].split('&')[0];
	var rsfn = u.split('filename=')[1].split('&')[0];
	var rslink = "http://"+rshost+"/cgi-bin/rsapi.cgi?sub=download&fileid="+rsid+"&filename="+rsfn+"&dlauth="+rsauth;
	
	return rslink;
	
	}
}
var newRSpoof,newRSLink,FiledID,FileName;  
	if (document.location.href.indexOf("rapidshare.com/files/")!=-1) {
		newRSpoof = document.location.href.split("rapidshare.com/files/")[1];
		FiledID = newRSpoof.split("/")[0];
		FileName = newRSpoof.split("/")[1];
	} else if (document.location.href.indexOf("#!download")!=-1) {
		newRSpoof = document.location.href.split("#!download")[1];		
		newRSpoof = newRSpoof.split("|");		
		FiledID = newRSpoof[2];
		FileName = newRSpoof[3];
	} 
	
if (newRSpoof!=null&&newRSpoof!="") {
	newRSLink = "https://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=download&fileid="+FiledID+"&filename="+FileName;
}

GM_xmlhttpRequest({
  method: "GET",
  url: newRSLink ,
  headers: {
    "User-Agent": "Mozilla/5.0",   
    "Accept": "text/xml"           
  },
  onload: function(response) {
   
    var URLstring = new String(response.responseText);	
	var l = createRSLink(URLstring.toString(), newRSLink)	
	if(l!=="nothingtodo") document.location.href=l;
	
   
  }
});


}
else { 
       var btn=document.getElementById('dlbutton');
        if(btn)
                       window.location.href = document.getElementById('dlbutton').href;
                               


        
}

 
