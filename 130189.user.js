// ==UserScript==
// @name           Trolololol
// @namespace      Vainqueur (William Bixler)
// @include        *
// @exclude        *nyan.cat*
// @exclude        https://dl-web.dropbox.com/get/Public/Trolololol/ChangeLog.html?w=a897dba2
// @exclude        http://userscripts.org/scripts/*/130189
// ==/UserScript==

execute();

function execute()
{

   updateHeaders();
   updateParagraphs();
   updateImgs();
   updateSwfs();
   updateLinks();

}

function updateHeaders()
{

   var h1 = document.getElementsByTagName('h1'), h2 = document.getElementsByTagName('h2'), h3 = document.getElementsByTagName('h3'), h4 = document.getElementsByTagName('h4'), h5 = document.getElementsByTagName('h5'), h6 = document.getElementsByTagName('h6');

   for(var i = 0; i < h1.length; i ++ )
   {
      h1[i].innerHTML = '<a href="http://www.nyan.cat/">TROLL</a>';
   }
   for(var i = 0; i < h2.length; i ++ )
   {
      h2[i].innerHTML = '<a href="http://www.nyan.cat/">TROLL</a>';
   }
   for(var i = 0; i < h3.length; i ++ )
   {
      h3[i].innerHTML = '<a href="http://www.nyan.cat/">TROLL</a>';
   }
   for(var i = 0; i < h4.length; i ++ )
   {
      h4[i].innerHTML = '<a href="http://www.nyan.cat/">TROLL</a>';
   }
   for(var i = 0; i < h5.length; i ++ )
   h5[i].innerHTML = '<a href="http://www.nyan.cat/">TROLL</a>';
   for(var i = 0; i < h6.length; i ++ )
   {
      h6[i].innerHTML = '<a href="http://www.nyan.cat/">TROLL</a>';
   }
}

function updateParagraphs()
{
    
    var y = document.getElementsByTagName('p')
    
    for(var i = 0; i < y.length; i++)
    {
        y[i].innerHTML = "<a href='http://www.nyan.cat/'>Usted es viejo y mohoso</a>";
    }
    
}

function updateImgs()
{

   var y = document.getElementsByTagName('img');

   var trollFace = ['http://dl.dropbox.com/u/23131218/Trolololol/me_gusta.png', 'http://dl.dropbox.com/u/23131218/Trolololol/troll-face-450x386.png', 'http://dl.dropbox.com/u/23131218/Trolololol/trollface.png'];

   for(var i = 0; i < y.length; i ++ )
   {
      if(i % 3 == 0)
      {
         y[i].setAttribute('src', trollFace[0]);
      }
      else if(i % 2 == 0)
      {
         y[i].setAttribute('src', trollFace[1]);
      }
      else
      {
         y[i].setAttribute('src', trollFace[2]);
      }
   }

}

function updateSwfs()
{

   var y = document.getElementsByTagName('embed');

   for(var i = 0; i < y.length; i ++ )
   {
      y[i].setAttribute('src', 'http://static.onemorelevel.com/games3/trollface-launch-2.swf')
   }

}

function updateLinks()
{

   var y = document.getElementsByTagName('a');

   for(var i = 0; i < y.length; i ++ )
   {
      y[i].setAttribute('href', 'http://nyan.cat')
   }

}