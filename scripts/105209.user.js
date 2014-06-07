// ==UserScript==
// @name           Polard Watcher Beautifier
// @namespace      http://127.0.0.1/lamp/polardwatcher/polarwatcher.js
// @description    
//                 Améliore le rendu de polarwatcher :
//                    - utilisation de code HTML (au lieu de texte simple)
//                    - utilisation de CSS
// @include       http://polardwatcher.com/?s*
// ==/UserScript==

//======================= functions ==========================================

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

function trim (myString)
{
   return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
}

function splitLine(line)
{

   var border = new Array(7,19,44,53,71,87,100,130);
   var res = new Array();
   begin = 0;
   end=0;
   for(i=0;i<8;i++)
   {
      end = border[i];
      res.push(trim(line.substring(begin,end)));
      begin=end;
   }
   
   return res;
}

//======================= source ==============================================

//---------------------------- get URL parameters---------------------------- 
//  - server
var servertxt = getURLParameter('s');
var SERVER = 0;
switch(servertxt)
{
   case 'telesun' :
      SERVER = 1;
      break;
   case 'ensibm' :
      SERVER = 2;
      break;
   case 'ensisun' :
      SERVER = 3;
      break;
   default :
      SERVER = 0;
      break;
}

//  - archives
var archivetxt = getURLParameter('d');
var archive = false;
if(archivetxt.length >2)
   archive = true;

//get the content of the page
var body = document.getElementsByTagName("body")[0];

body.setAttribute('xmlns',"http://www.w3.org/1999/xhtml");

//get the data
var pre = document.getElementsByTagName("pre")[0];
var data = pre.innerHTML;

//remove the original display
body.removeChild(pre);

//---- change the CSS ----
var style = document.createElement('style');
style.innerHTML = "\
   body{\
      /*background : url(http://fc05.deviantart.net/fs45/f/2009/153/e/7/GM__Red_Spy_Wallpaper_by_Steffanic.jpg);*/\
   }\
   h1{\
      text-align:center;margin:10px;\
   }\
   table{\
      border-collapse:collapse;width:90%;margin:auto;\
   }\
   table th{\
      text-align:center;font-weight:bold;background:black;color:white;\
   }\
   table td{\
      border:1px solid black;text-align:center;\
   }\
   table td.odd{\
      background:#D4D4D4;\
   }\
   table td.even{\
      background:#E5E5E5;\
   }\
   table img{\
      text-align:center;margin:auto;max-height:150px;max-width:200px;\
   }\
";
body.appendChild(style);


//---------------------------- add a title node ---------------------------- 
var h1 = document.createElement('h1');
titre = "Polard Watcher";
titre += " "+SERVER+"A";
//if(archive)
//titre += " (archives)";
txt = document.createTextNode(titre);
h1.appendChild(txt);
body.appendChild(h1);

//---------------------------- add the facebook box ----------------------------
div = document.createElement('div');
div.setAttribute('style',"width:260px;height:60px;margin:auto;");

iframe = document.createElement('iframe');
iframe.setAttribute('src',"http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FPolardWatcher%2F103834143020532&amp;width=300&amp;colorscheme=light&amp;connections=30&amp;stream=false&amp;header=false&amp;height=587");
iframe.setAttribute('scrolling',"no");
iframe.setAttribute('frameborder',"0");
iframe.setAttribute('style',"border:none; overflow:hidden; width:300px; height:587px;");
iframe.setAttribute('allowTransparency',"true");

div.appendChild(iframe);

body.appendChild(div);

//if there isn't server error
if(data.search("Warning") == -1)
{
   //----------------------------  create the table---------------------------- 

   var table = document.createElement('table');

   //get the lines of the txt files
   var lines = data.split('\n');

   //get the header of the table
   header = splitLine(lines[1]);

   //include the header to the table
   var tr = document.createElement('tr');
   for(i in header)
   {
      td = document.createElement('th');
      txt = document.createTextNode(header[i]);
      td.appendChild(txt);
      tr.appendChild(td);
      
      if(i==1)
      {
         td = document.createElement('th');
         txt = document.createTextNode("photo");
         td.appendChild(txt);
         tr.appendChild(td);
      }
   }
   table.appendChild(tr);

   var even=0;
   for(k=3;k<lines.length-3;k++)
   {
      info = splitLine(lines[k]);
      var tr = document.createElement('tr');
      //if(even%2==0)
         tr.setAttribute('class','even');
      //else
      //   tr.setAttribute('class','odd');
      for(i in header)
      {
         td = document.createElement('td');
         txt = document.createTextNode(info[i]);
         td.appendChild(txt);
         tr.appendChild(td);
         
         if(i==1)
         {
            td = document.createElement('td');
            img = document.createElement('img');
            img.setAttribute('src','https://intranet.ensimag.fr/zenith/photos/'+info[i]+'.jpg');
            td.appendChild(img);
            tr.appendChild(td);
         }
      }
      //
      
      table.appendChild(tr);
      even++;
   }
   body.appendChild(table);
}
else
{
   error = document.createElement('p');
   error.setAttribute('id','error');
   txt = document.createTextNode("SERVER ERROR");
   error.appendChild(txt);
   body.appendChild(error);
}