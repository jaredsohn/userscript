// ==UserScript==
// @name           usualgirls
// @namespace      www.usualgirls.com
// @include        http://*usualgirls.com/*
// ==/UserScript==

//var urls = new Array;

if(window.location.pathname=="/nude-girl.php")
{
//alert("start");
  var D = createDiv();
  
  //makePic("http://bilder.zehn.de/girl-des-tages/images/image1.jpg");
  
  
  for(var i=1; i<30;i++)
  {
      var num = String(i);
      if(num.length==1)
        num = "00" + num;
      if(num.length==2)
        num="0"+num;
      var path = "/modelos/"+window.location.search.substr(5)+"/photo"+num+".jpg"
      //alert(path);
      makePic(path,D);    
  }
  

}
//var HtmlPage = document.body.parentNode;
//HtmlPage.removeChild(document.body);
//HtmlPage.appendChild(document.createElement)

function makePic (path, mydiv){
    var pic = document.createElement('img');
    pic.id = 'i' + i;
    //pic.width = '400';
    pic.height = '800';
    pic.src = path;
    mydiv.appendChild(pic);
}

function createDiv()
{
  var Div = document.createElement('div');
  Div.id = "Bilder";
  with(Div.style){
    background = 'pink';
    position = 'absolute';
    //z-index = '100';
    top = '1500px';
    left = '0px';
    diplay = 'block';
  }  
  document.body.appendChild(Div);
  return Div;
}