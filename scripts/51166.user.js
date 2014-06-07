// ==UserScript==
// @name           GameFAQs Enhancer
// @namespace      GFE
// @description    Add new functionality to GameFAQs
// @include        http://www.gamefaqs.com/console/*/home/*
// @include        http://www.gamefaqs.com/console/*/home/*
// ==/UserScript==

function AddAmazonLink()
{
   var lnk = document.createElement('a');
   lnk.setAttribute('id','mylink');
   
   var GT = document.title;
   
   
   if (GT.search('Xbox 360') != -1)
   {
		var newGT = GT.replace(' for Xbox 360 - GameFAQs','');
   }
   if (GT.search('PlayStation 3') != -1)
   {
		var newGT = GT.replace(' for PlayStation 3 - GameFAQs','');
   }
   if (GT.search('Wii') != -1)
   {
		var newGT = GT.replace(' for Wii - GameFAQs','');
   }
   if (GT.search('PlayStation -') != -1)
   {
		var newGT = GT.replace(' for PlayStation - GameFAQs','');
   }
   if (GT.search('Xbox -') != -1)
   {
		var newGT = GT.replace(' for Xbox - GameFAQs','');
   }
   if (GT.search('GameCube -') != -1)
   {
		var newGT = GT.replace(' for GameCube - GameFAQs','');
   }
   if (GT.search('PlayStation 2') != -1)
   {
		var newGT = GT.replace(' for PlayStation 2 - GameFAQs','');
   }
   
   lnk.setAttribute('href','http://www.amazon.co.uk/s/ref=nb_ss_w_h_?url=search-alias%3Dvideogames&field-keywords=' + newGT + '&x=0&y=0');

   txt=document.createTextNode('Get ' + newGT + ' on amazon');

   lnk.appendChild(txt);

   document.getElementById('quicknav').appendChild(lnk);
}

AddAmazonLink();