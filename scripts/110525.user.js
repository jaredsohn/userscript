// ==UserScript==
// @name           Google Images AGUXA direct link
// @namespace      http://userscripts.org/users/aguxa
// @description    Agrega enlaces directos a las imagenes de google
// @include        http://images.google.*/images*
// @include        http://www.google.*/images*
// @include        http://www.google.*/search?*
// @include        http://www.google.*/imgres*
// @version        1.0
// ==/UserScript==

 (function () {

if ((/q=/).test(document.location.href)) {
  if (!(/&sout=1/).test(document.location.href)) {
    window.location = window.location + "&sout=1";
  }
}
})()

var parseUrl = function (url) {
  var qstr = url.split('?')[1];
  var rawparams = qstr.split('&');
  var par = new Array();
  var i;
  for (i=0 ; i<rawparams.length ; i++){
    var p = rawparams[i].split("=");
    par[p[0]] = p[1];
  }
  return par;
}


if (parseUrl(window.location.href)["directLink"]){
  var imglnk = document.getElementsByTagName('a')[2];
  if (imglnk){
    window.location.replace(imglnk.href)
  }
}

var getImageLinks = function (url){
  var param = parseUrl(url);
  var links = new Object();
  links.toImgHref = decodeURIComponent(param["imgurl"]);
  if (param["imgurl"] == undefined){
     links.toImgHref = url+'&directLink=true';
  }
  links.toPageHref = decodeURIComponent(param["imgrefurl"]);
  return links;  
}

String.prototype.endsWith = function(str){
  return ( this.lastIndexOf(str) + str.length ) == this.length;
}

var imgTable = document.getElementById('imgtb');
if (imgTable) { // pagina heredada (para Opera)
  
  var rows = imgTable.getElementsByTagName('tr');
  for ( i=0 ; i < rows.length ; i+=2 ) {
      var imgCell = rows[i].getElementsByTagName('td');
      var descCell = rows[i+1].getElementsByTagName('td');
      for( j=0 ; j<imgCell.length ; j++ ) {
  var imageAnchor = imgCell[j].getElementsByTagName('a')[0];
  var domainText =  descCell[j].getElementsByTagName('cite')[0];
  
  var links = getImageLinks(imageAnchor.href);

  if ( !domainText.innerHTML.endsWith('...') ){
    domainText.innerHTML = '<a href="' + links.toPageHref + '">' + domainText.innerHTML + '/&hellip;<\a>';
  }
  else {
    domainText.innerHTML = '<a href="' + links.toPageHref + '">' + domainText.innerHTML + '<\a>';
  }
  imageAnchor.href = links.toImgHref;
      }
  }
}
else { // nueva pagina (para Firefox)

  var stopEvent = function(event){
    event.stopPropagation()
  }
  
  processing = false;
  var nodeHandler = function (event) {
      if(event.target.id != 'rg_hr' || processing) {
    return;
      }
      processing = true;
      //fname = document.getElementById('rg_ht').innerHTML;
      var domain = event.target.innerHTML;
      var imageAnchor = document.getElementById('rg_hl');
      var links = getImageLinks(imageAnchor.href);
      
      imageAnchor.href = links.toImgHref;
      imageAnchor.addEventListener("mousedown", stopEvent, false);
      event.target.innerHTML = '<a onmousedown="event.stopPropagation();" ' +
                  'style="color:green;" ' + 
                  'href="' + links.toPageHref + '">' + domain + '/&hellip;</a>';
      processing = false;
  }
  document.addEventListener("DOMSubtreeModified", nodeHandler, false);
}
