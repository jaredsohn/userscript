// ==UserScript==
// @name           Streamed Video MU
// @namespace      http://streamedvideo.hebfree.org/
// @description    Lorsque qu'un fichier vidéo est sur le point d'être téléchargé,  il est automatiquement lu en streamming.
// @version       0.1
// @include        *megaupload.com/?d=*
// ==/UserScript==





  var x=document.getElementsByTagName("a");
  for (i=0;i<x.length;i++)
{
var y=x[i].getAttribute('href');
var patt1=new RegExp(".avi$|.divx$");
var ok=patt1.test(y)


if (ok == false) {
}
else if ( ok == true ) {
input_box=confirm("   Streamed Video :" + '\n' + '\n' + "Vous vous apprêtez à télécharger une vidéo, voulez-vous la lire en streamming ?");
if (input_box==true)

{ 

openTab(y);
}

else
{

}

}
} 

function openTab(args) {
    window.content.document.location.href = ('http://streamedvideo.123.fr/video.php?url=' + args);
}