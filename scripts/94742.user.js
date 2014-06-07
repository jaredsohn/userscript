// ==UserScript==
// @name Karte Drucken
// @description Passt Stxleshet der Kartenansicht zum Ausdrucken an
// @author Farbdose
// @namespace http://osor.de/
// @include http://de*.die-staemme.de/game.php*screen=map*
// ==/UserScript==


(function()
{
function insertafter(newchild, refchild) {
 refchild.parentNode.insertBefore(newchild,refchild.nextSibling);
}

document.getElementsByClassName = function(cl) {
var retnode = [];
var myclass = new RegExp('\\b'+cl+'\\b');
var elem = this.getElementsByTagName('*');
for (var i = 0; i < elem.length; i++) {
var classes = elem[i].className;
if (myclass.test(classes)) retnode.push(elem[i]);
}
return retnode;
};


var map=document.getElementById("mapOld");
  //ctx.drawImage(img, zeilen[i].getElementsByTagName("img").left, zeilen[i].getElementsByTagName("img").top); }

var zeilen =new Array();
var spalte =new Array();
zeilen=map.getElementsByTagName("tr");
var img=new Array();
var img2= new Array();

var canvas = document.createElement("canvas");
canvas.width = 31+zeilen.length*52;
canvas.height = 25+zeilen.length*38;

var ctx = canvas.getContext("2d");


for (var i=0;i<zeilen.length;i ++)
{
 spalte=zeilen[i].getElementsByTagName("td");
 img[i]= new Array();


 for (var i2=0;i2<spalte.length;i2 ++)
 {
  img[i,i2]=new Array();
  img2[i,i2]=new Array();
  img[i,i2,0]= "a";

  img[i,i2,0]=spalte[i2].style.backgroundColor;
  img[i,i2,1]= spalte[i2].getElementsByTagName("img")[spalte[i2].getElementsByTagName("img").length-1].src;

  if (img[i,i2,0]!="a")
  {
   ctx.fillStyle = img[i,i2,0];
   ctx.fillRect (52*i2+31, 38*i+3, 52*(i2+1), 38*(i+1)+3);
  }

  img2[i,i2,1]= new Image();
  img2[i,i2,1].src= img[i,i2,1];

  ctx.drawImage(img2[i,i2,1], 52*i2+31, 38*i+3);

  for (var i3=2; i3<spalte[i2].getElementsByTagName("img").length; i3++)
  {
   img[i,i2,i3]= spalte[i2].getElementsByTagName("img")[i3-1].src;
   img2[i,i2,i3]= new Image();
   img2[i,i2,i3].src= img[i,i2,i3];
   ctx.drawImage(img2[i,i2,i3], 52*i2+31+(i3-2)*18, 38*i+21);
  }
 }
}
//var mapcanvas=document.getElementById("map_canvas");
//alert(mapcanvas.width);
//var ctx2 = mapcanvas.toDataURL("image/png");
//ctx.drawImage(ctx2, 31, 21);

ctx.fillStyle = "rgb(241,235,221)";
ctx.fillRect (0, 0, 31, canvas.height);
ctx.fillRect (0, canvas.height-22, canvas.width, canvas.height);
ctx.fillRect (0, 0, canvas.width, 3);
ctx.fillRect (canvas.width-3, 0, canvas.width, canvas.height);

var mapcoordsy=document.getElementsByClassName("map_y_axis");
var mapcoordsx=document.getElementById("map_x_axis").getElementsByTagName("td");
ctx.fillStyle = "black";
ctx.font = "9pt Verdana,Arial";
ctx.fillText(mapcoordsy[0].getElementsByTagName("td")[0].innerHTML, -24, 26);
ctx.fillText(mapcoordsx[1].innerHTML, 42, 38*mapcoordsy.length+20)
for (var i3=1;i3<mapcoordsy.length;i3 ++)
{
 ctx.fillText(mapcoordsy[i3].getElementsByTagName("td")[0].innerHTML, -56, i3*38+26);
 ctx.fillText(mapcoordsx[i3+1].innerHTML, i3*52+42, 38*mapcoordsy.length+20);
}


var link = document.createElement('a');
link.href=canvas.toDataURL("image/png");
link.innerHTML = 'Karte als Bild';
link.target="_blank";
//document.getElementById('content_value').appendChild(link);
insertafter(link,document.getElementById('content_value').getElementsByTagName("h2")[0]);

}());