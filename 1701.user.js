// ==UserScript==
// @name          mitbbs_digest
// @namespace	  sunyin
// @description	  compact display of mitbbs same topic view.
// @include       http://www.mitbbs.com/article_t*
// @include       http://mitbbs.com/mitbbs_article_t.php?board=*
// ==/UserScript==

// Shorthand
function newNode(type) {return document.createElement(type);}
function getNode(id) {return document.getElementById(id);}

//unsafeWindow = unsafeWindow ? unsafeWindow : window;

function pop2(id, contents){
   var div = newNode("span");
   
   var buttonNode = newNode("span");
   buttonNode.id = id;
   //GM_log(id);
   //   gIDs[id] = contents;
   buttonNode.innerHTML = "[show "+id+"]";
   //buttonNode.className = "PV_button lk";
  
   var b = newNode("span");
   b.innerHTML = contents;

   buttonNode.addEventListener("click",
                               function(event){
                                  var d =  b.style.display;
                                  var c = b.previousSibling;
                                  if(d == 'block'){
                                     c.innerHTML = "[show "+c.id+"]";
                                     b.style.display = 'none';
                                  } else {
                                     c.innerHTML = "[hide "+c.id+"]";
                                     b.style.display = 'block';
                                  }
                               },
                               true);

   b.style.display = "none";
   div.appendChild(buttonNode);
   div.appendChild(b);
   return div;
}


// keep author profile in popup, key: <td valign ="top" width="128">
// try xpath query, 3rd table 
// extract fancy id descriptions hide them
var alltd = document.getElementsByTagName('td');
for (var i = 0; i < alltd.length; i++) {
   var e = alltd[i];
   //new tmp version if ((e.width != '20%')) continue; works with mitbbs_article_t.php?board=*
   if ((e.width != 128)) continue; // works with version article_t1/*
   //if ((e.width != 130)) continue; // works with version bbstcon.php?board=Family&gid=208249	
   e.width = '19%'; //avoid re-evaluation
   //take out user id part
   str = e.innerHTML;
   var re = str.match(/>(.*)<\/a>/);
   var id = re[1];
   //GM_log(id+" "+str);

   e.innerHTML = '';
   e.appendChild(pop2(id,str));   
 } // end of for alltd
 
// take out message heading, reply and signature in popup window.
// new version var allElements = document.getElementsByTagName('span');
//var allElements = document.getElementsByTagName('font'); works with old version
var allElements = document.getElementsByTagName('td');
var replyHeader = ""
for (var i = 0; i < allElements.length; i++) {
   var dedazuozhongtidao = ""; //´ó×÷ÖÐÌáµ½
   var sig_sign = "--";
   var e = allElements[i];
   if (e.className == "jiahui-4") {
   	  replyHeader = e.innerHTML;
   	  e.innerHTML = ""
   	  continue
   }

   // new version if (e.className != "font1") continue; // ------------------------>
   //if (e.className != "content") continue; // ------------------------>
   if (e.className != "jiawenzhang-type") continue;
   // take out reply
   var lines = e.innerHTML.split("<br>");      
   if (lines.length < 4) continue; // --------------------------->
   //e.className = 'cxx1'; //chang to avoid re evaluating
   //GM_log ('found '+lines.length+' '+e.innerHTML);
   var id = "myheading"+i;
   var head = replyHeader+'<br>';
   // take out javacode, no use for javacode since 2009xxxx
   //head+=lines[0].split(/<\/script>/)[1]+"<br>";
   // take out header 
   for (var j = 1; j<4;j++)head+=lines[j]+"<br>";
   //   create_popup(id, head);
   e.innerHTML = '';
   var e1 = pop2(id, head); //e1.innerHTML="[H]";
   e.appendChild(e1);
   //var digest ="<a onclick=pop2(event,'"+id+"')>[H]</a>";
   
   var digest = ""; tail = null;

   var sig_idx = -1; var re_idx = -1;
   for (var j = 4; j<lines.length;j++) {
      var line = lines[j];
      if( line.indexOf("f006") > -1) { re_idx = j; break;} // -->
      //if( line.indexOf(dazuozhongtidao) > -1) { re_idx = j; break;} // -->
      //GM_log(j+":"+ line);
      if( line.indexOf(sig_sign)> -1){ sig_idx = j; break;} // --------------->
      if(line.length == 0)continue;
      digest = digest + line  + "<br>";
   }

   //GM_log('sig '+sig_idx+' re '+re_idx);
   var idx=(sig_idx>re_idx)?(sig_idx+1):(re_idx-1);
   //GM_log('idx '+idx);
   //todo: mark if there are images follow after signature 
   if(idx>-1) { 
      var str = '';
      for (var j=idx;j<lines.length;j++)str+=lines[j]+"<br>";
      var id = 'tail'+i;
      //create_popup(id,str);
      digest = digest.replace(/<br>$/,'');
      //      digest+= "<a onclick=pop2(event,'"+id+"')>[...]</a>" ;
      tail = pop2(id, str);
   }

   var sp = newNode('span');
   //sp.style.fontSize = "12px";
   sp.innerHTML = digest;
   e.appendChild(sp);
   if(tail){
      e.appendChild(tail);
   }
 } // end of for allfont elements


   //   window.addEventListener("onload", main, false);


/*
  0.8.1 20091114 change url match, remove classname replacement
  0.8 20091025 update with current url, hide reply header 
  0.7.1 include more addresses
  0.7 20060308 change base on article/* layout
  0.6 new layout, just hide the unnecessary, show them when clicked.
  0.5.2 fix create_popup function in 0.6.4 GM
  0.5.1 something better to avoid reevaluation
  0.5 half done for new mitbbs layout.
  0.4 add ff 1.4 unsafeWindow support
  0.3.1 change font.classname to avoid re-evaluation
  0.3: keep header, reply and signature in popup
  version: 0.2 place id info in a popup box.
  version: 0.1 take out \r\n split, use <br> split directly
*/