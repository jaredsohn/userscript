// ==UserScript==
// @name           Argonauta
// @author         Tei
// @namespace	   test
// @include        http://api.erepublik.com/v1/feeds/*
// ==/UserScript==


/*

Stuff:

These are the current correct feeds:
http://api.erepublik.com/v1/feeds/citizens/{USER_ID} 
http://api.erepublik.com/v1/feeds/citizens/{USER_NAME}?by_username=true
http://api.erepublik.com/v1/feeds/countries 
http://api.erepublik.com/v1/feeds/countries/{COUNTRY_ID} 
http://api.erepublik.com/v1/feeds/regions/{REGION_ID} 
http://api.erepublik.com/v1/feeds/companies/COMPANY_ID} 
http://api.erepublik.com/v1/feeds/market/{INDUSTRY}/{QUALITY}/{COUNTRY} 
http://api.erepublik.com/v1/feeds/exchange/{BUY}/{SELL}

adding .json you get a json file


*/

var xhtml = "http://www.w3.org/1999/xhtml";

function createHtml(tag){
  return document.createElementNS(xhtml,tag);
}

function isTag(tagname){
    var el = document.getElementsByTagName(tagname)
    return el.length>0;//converted to boolean?
}

var countrys2links = isTag("countries");

if ( countrys2links  ) { 
 var links = document.getElementsByTagName("country");
 for (var i=0; i < links.length; i++) {

    var subtree = links[i];
    var data = new Array();    
    
    while (subtree.firstChild) {
         try {
         var name = subtree.firstChild.tagName;
         var value = subtree.firstChild.textContent;
         if (name)    data[name]=value;
         } catch(e){};         

         subtree.removeChild(subtree.firstChild);
    }

    //the new container
    var div = document.createElementNS(xhtml,"div");
    div.setAttribute("style","border:0px solid gray");
    var a = createHtml("a");

    a.setAttribute("href","http://api.erepublik.com/v1/feeds/countries/"+data["id"]);
    a.innerHTML = " " + data["name"];

// + "no:"+ isTag("noexiste")+ ",ex:"+isTag("country")+",cies:"+isTag("countries");
    div.appendChild( a );
       
    subtree.appendChild( div );
 }
} else {

  


}
