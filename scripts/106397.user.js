// ==UserScript==
// @name          SEO Blogger
// @namespace     http://panduan-info.blogspot.com
// @author        AgusHadi (http://userscripts.org/users/360823)
// @website       http://panduan-info.blogspot.com
// @include       http://www.blogger.com/publish-confirmation.g?*
// @description   All in one SEO Pack for Blogger
// @version       1.0
// @copyright     2011
// ==/UserScript==
function getParameter ( queryString, parameterName ) {
   var parameterName = parameterName + "=";
   if ( queryString.length > 0 ) {
      begin = queryString.indexOf ( parameterName );
      if ( begin != -1 ) {
         begin += parameterName.length;
         end = queryString.indexOf ( "&" , begin );
      if ( end == -1 ) {
         end = queryString.length
      }
      return unescape ( queryString.substring ( begin, end ) );
   }
   return "null";
   }
}


var queryString = window.top.location.search.substring(1);
var id = getParameter ( queryString, 'blogID');


var h2 = document.createElement('h2');
var heading = document.createTextNode("Search Engine Optimization"); 
h2.appendChild(heading);
var td1 = document.createElement('td');
var td2 = document.createElement('td');
var td3 = document.createElement('td');
var td4 = document.createElement('td');

var tr1 = document.createElement('tr');
var tr2 = document.createElement('tr');
var tr3 = document.createElement('tr');

var table = document.createElement('table');

var link = document.getElementsByTagName('h1')[2].children[0];
   var form = document.createElement('form');
   form.setAttribute('id', 'v2blogger');
   form.setAttribute('onSubmit', 'return false;');
   var keywords = document.createElement('input');
   var description = document.createElement('input');
   var submit = document.createElement('input');
    keywords.setAttribute('name', 'keywords');
    keywords.setAttribute('size', '65');
	description.setAttribute('name', 'description');
	description.setAttribute('size', '65');
	submit.setAttribute('type', 'submit');
	var DescriptionText = document.createTextNode("Description:"); 
	var KeywordsText = document.createTextNode("Keywords:"); 
	
	td1.appendChild(DescriptionText);
	td2.appendChild(description);
	tr1.appendChild(td1);
	tr1.appendChild(td2);
	
	td3.appendChild(KeywordsText);
	td4.appendChild(keywords);
	tr2.appendChild(td3);
	tr2.appendChild(td4);
	
	tr3.appendChild(submit);
	
	table.appendChild(tr1);
	table.appendChild(tr2);
	table.appendChild(tr3);
	
	form.appendChild(h2);
	form.appendChild(table);
	var whereto = document.getElementsByClassName('r')[1];
	whereto.parentNode.insertBefore(form, whereto.nextSibling);
	
	GM_xmlhttpRequest({
method: "GET",
url: "/html?action=download&blogID="+id,
onload: function(response) {
    if (!response.responseXML) {
      response.responseXML = new DOMParser()
        .parseFromString(response.responseText, "text/xml");
    }

	var hd = response.responseXML.getElementsByTagName("head")[0];
	var askld = hd.getElementsByTagName("b:if"); 
	for (var i = 0; i < askld.length; i++) {
	    var status = askld[i].getAttribute('cond');
	    if ( status == 'data:blog.url == "'+link+'"') {
			var needthat = askld[i];
			var thetag = needthat.getElementsByTagName('meta');
			for (var i = 0; i < thetag.length; i++)
			{
			var name = thetag[i].getAttribute('name');
			if(name == "description")
			     {
				 
				 description.setAttribute('value', thetag[i].getAttribute('content'));
			     }
		    if(name == "keywords")
			     {
				 keywords.setAttribute('value', thetag[i].getAttribute('content'));
			     }
			}
	    }
		}
  
}});
	
form.addEventListener('submit', function(){
   
 var newbif = document.createElement('b:if');
	newbif.setAttribute('cond', 'data:blog.url == "'+link+'"');

	var newkeywords = document.createElement('meta');
	newkeywords.setAttribute('name','keywords');
	
	var newdescription = document.createElement('meta');
	newdescription.setAttribute('name','description');
	newkeywords.setAttribute('content',keywords.value);
	
	newdescription.setAttribute('content',description.value);
	newbif.appendChild(newdescription);
	newbif.appendChild(newkeywords);
	
	
	

	
		GM_xmlhttpRequest({
method: "GET",
url: "/html?action=download&blogID="+id,
onload: function(response) {
    if (!response.responseXML) {
      response.responseXML = new DOMParser()
        .parseFromString(response.responseText, "text/xml");
    }

	var hd = response.responseXML.getElementsByTagName("head")[0];
	var askld = hd.getElementsByTagName("b:if"); 
	for (var i = 0; i < askld.length; i++) {
	    var status = askld[i].getAttribute('cond');
	    if ( status == 'data:blog.url == "'+link+'"') {
			var needthat = askld[i];
			
	    }
		}
		if(typeof (needthat) !== 'undefined')
			{
			hd.replaceChild(newbif,needthat);
			var well = hd.parentNode;
			}
			else
			{
			hd.appendChild(newbif);
			var well = hd.parentNode;
			}
  
   var html = response.responseXML.getElementsByTagName("html")[0];
	response.responseXML.replaceChild(well,html);
	
			var serializer = new XMLSerializer();
            var xml = serializer.serializeToString(response.responseXML);
			
			GM_xmlhttpRequest({
  method: "GET",
  url: "/html?blogID="+id,
  onload: function(response) {
  
  
 var myHTML = response.responseText;
var tempDiv = document.createElement('div');
tempDiv.innerHTML = myHTML.replace(/<script(.|\s)*?\/script>/g, '');

tempDiv.childNodes;

var security_token = tempDiv.getElementsByTagName('form')[2].getElementsByTagName('input')[0].value;
var securityToken = tempDiv.getElementsByTagName('form')[2].getElementsByTagName('input')[3].value;

  GM_xmlhttpRequest({
  method: "POST",
   url: "/html?blogID="+id,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  data: "action=save&withWidgets=true&security_token="+encodeURIComponent(security_token)+"&securityToken="+encodeURIComponent(securityToken)+"&templateText="+encodeURIComponent(xml),
  onload: function(response) {
    alert("Success!");
  }
});






  }
});


			
			
}});
	
	
	
	
	}, false);



