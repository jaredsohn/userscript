// ==UserScript==
// @name          Interface-aware version of dblpFigures
// @description   DBLP past publications for paper's first author
// @include       http://icwe2009.webengineering.org/Accepted.aspx
// @copyright      2009, Cristobal Arellano (http://www.onekin.org/)
// @contributor          Oscar Diaz         (http://www.onekin.org/)
// @contributor          Jon Iturrioz       (http://www.onekin.org/)
// ==/UserScript==
var doc=window.doc;

var conferenceName="icwe";
var STAR="data:image/gif;base64,R0lGODlhDQAMAPcAAM7Ot8nV2b66osK+sLa/r6x0G7yDJvjJWsqGFu6aELKWZ6qCRO+sMq2NWdCTLaKleKZ6Mq61nKR1KbmniP///9Dd6bV8IdrbyNeME5xpGqeti96RFMSod7uulb3Iv6NxI6x7Lqutg6Oogap/OrGJScbFv9Hg78rNzri6lvn59Z1uJOzs4rKzjOmXEaR+QeXm2fW6RfCkH8LNyvLy7LiheaZ7OK13IZ6gcJiaZsvJwOOUEeiZF6Z4L6F1L7mXX////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAADQAMAAAIagApCBzYYaBBgxVUlDh4cIIFBQwN8mjBI4DBEwpAgJBgAIYDCCNGkDhBYQKEDTEOHEiQoIWFCQNL1EDAYOWGAjANljDAMgEGHwwnYECQAUECCAwXWCBRQYGNDxUQZqAxcIDCiwsNBhggMCAAOw==";

function generateStars(num){
 var images = document.createElement('span');
 for(var i=0;i<num;i++){
  var image = document.createElement('img');
  image.src = STAR;
  image.align = 'left';
  image.style.display = 'block';
  image.style.position = 'inline';  
  images.appendChild(image);
 }
 return images;
}

function createDblpFiguresPanel(author,paper){
 var author_name_surname=author.replace('\u00e1','=aacute=').replace('\u00e9','=eacute=').replace('\u00ed','=iacute=').replace("\u00f3",'=oacute=').replace('\u00fa','=uacute=');//author.getElementsByTagName("name").item(0).nodeValue;
 var author_name=author_name_surname.match(/^((?:[^ ]* ?)*) (.*)$/)[1].replace(' ','_');
 var author_surname=author_name_surname.match(/^((?:[^ ]* ?)*) (.*)$/)[2];
 
 GM_xmlhttpRequest({
  method: 'GET',
  url: 'http://dblp.uni-trier.de/rec/pers/'+author_surname.charAt(0).toLowerCase()+'/'+author_surname+':'+author_name+'/xk',
   onload: function(responseDetails) {
    processDBLPEntries(paper,new DOMParser().parseFromString(responseDetails.responseText,'text/xml'));
   }
 });
}

function processDBLPEntries(paper,response){
 var publis=response.getElementsByTagName('dblpkey');

 var num=0; 
 for(var i=0;i<publis.length;i++){
  var publi=publis.item(i);
  if(publi.textContent.indexOf('conf/'+conferenceName+'/')==0){
   num++
  }
 }
 
 var htmlFragment=document.createElement('span');
 htmlFragment.innerHTML='<br/>'+conferenceName.toUpperCase()+' DBLP Pubs: '+num+' -- Total DBLP Pubs: '+publis.length;
 htmlFragment.setAttribute('style',"color:red;");
 
 if(publis.length>50){
   stars=generateStars(3);  
 }else if(publis.length>10){
    stars=generateStars(2);  
 }else{
   stars=generateStars(1);   
 }
 htmlFragment.appendChild(stars);
 injectPanel(paper,htmlFragment);
}

function loadPaper(loadPaperOcc){
 var paper=loadPaperOcc.currentTarget;
 var author=paper.getElementsByTagName("author").item(0).nodeValue;
 
 createDblpFiguresPanel(author,paper);
}

function injectPanel(paper,htmlFragment){
 var addPaperChildOcc = doc.createEvent("ProcessingEvents");   
 addPaperChildOcc.initProcessingEvent("addPaperChild",paper,htmlFragment,{});
 doc.dispatchEvent(addPaperChildOcc);
}

doc.addEventListener('loadPaper',loadPaper,true);