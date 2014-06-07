// ==UserScript==
// @name Univers Freebox Comments upgrade
// @namespace http://www.universfreebox.com
// @description a script that improves univers freebox comments
// @match http://www.universfreebox.com/article*
// @version  1.0
// ==/UserScript==

// Filter Setup
var filter=new Object();
filter.log=1;
filter.answerMe=0;
filter.me=1;
filter.showMode=1;
filter.nb=0;
filter.commenter=0;

// Comments global array
var comments=new Array();

// current logged user
var user="";

// UTILITIES METHOD
function getBody() {
        var tags=document.getElementsByTagName("body");
        return tags.item(0);
}
function getHead() {
        var tags=document.getElementsByTagName("head");
        return tags.item(0);
}


function getTxt(p) {
 var txt="";
 for( var y = 0; ( nodes = p.childNodes[ y ] ); y++ ) {
  if (nodes) {
   if ( nodes.nodeType === 3 || nodes.nodeType === Node.TEXT_NODE ) {
       txt=txt+nodes.nodeValue ;
   } else if (nodes.childNodes) {
         txt=txt+getTxt(nodes) ;
   }
  }
 }
 return txt;
}

function short(txt) {
  if (txt.length<=323) {
    return txt;
  }
  return txt.substr(0,320)+"...";
}



function showContent(e) {
  var target=e.target;
  if (!target) {
     target=e.srcElement;
  }
 
  var id=target.getAttribute("show");
  document.getElementById(id).style.display="";

  var id=target.getAttribute("hide");
  document.getElementById(id).style.display="none";
}

// Filtering Master
function applyFilter(c) {
  if (user && c.answer==user) {
     return 0;
  }
  if (user && c.name==user) {
     return 1-filter.me;
  }
  if (c.uLogged==0 && filter.log==1) {
     return 1;
  }
  if (filter.answerMe) {
     return 1;
  }
  return 0;
}


// update Commenter Link display
function updateCommenter() {

   if (filter.commenter) {
      document.getElementById("commenter").style.color="black";
      document.getElementById("commenter").style.fontWeight="bold";
      document.getElementById("editorDiv").style.display="";
      var editor=unsafeWindow.tinyMCE.getInstanceById("champ_article");
      editor.focus();
   } else {
      document.getElementById("commenter").style.color="#808080";
      document.getElementById("commenter").style.fontWeight="";
     document.getElementById("editorDiv").style.display="none";

   }
}


// Citation builder (with selection support)
function GM_citer(e) {
try {
 var target=e.target;
  if (!target) {
     target=e.srcElement;
  }
filter.commenter=1;
updateCommenter();
   var editor=unsafeWindow.tinyMCE.getInstanceById("champ_article");
   var txt="<blockquote";
   if (target.getAttribute("idUser")>0) {
      txt+=" id_membre='"+target.getAttribute("idUser")+"'";
   }
   txt+="><i><a>"+target.getAttribute("nameUser")+" a écrit</a></i><br/>\r\n<blockquote><i>";

   if (unsafeWindow.getSelection && unsafeWindow.getSelection() && unsafeWindow.getSelection()!="") {
	txt+= "[...]"+unsafeWindow.getSelection()+"[...]";
   } else {
      txt+=getTxt(document.getElementById(target.getAttribute("idComment")+"-txtFull"));
   }
   txt+="</i></blockquote></blockquote><br/>\n\r";
   editor.setContent(editor.getContent()+"\r\n"+txt);
   editor.focus();
} catch (exc) {
alert(exc);
}
}




// Comments Displayer
function rebuildComm(c) {
try {
  var parent=document.getElementById(c.id);

  if (applyFilter(c)) {
     parent.style.display="none";
     filter.nb++;
     return;
  } else {
     parent.style.display="";
  }

  while (parent.firstChild) {
         parent.removeChild(parent.firstChild);
  }

  parent.setAttribute("style","border:0px;border-top:1px solid black;border-left:1px solid black;background:white");

  var title=document.createElement("div");
  parent.appendChild(title);

  img=document.createElement("img");
  img.src=c.img;
  img.height=15;
  img.setAttribute("style","margin:1px 5px 1px 5px");
  title.appendChild(img);
  var color="#808080";
  if (c.uLogged==1 ) {
     color="#00A000";
  }
  if (filter.log==1  && (!user || c.answer!=user)) {
    color="black";
 
  }

  var bkg="url('modules/freezone/images/bg_info_comment.jpg') repeat-x scroll 0 0 transparent;";
  bkg="#E0E0E0";
  if (user && c.answer==user) {
    bkg="#FFC0C0";
  }
   if (c.name==user) {
    bkg="#C0C0FF";
 
  }
  title.setAttribute("style","color:"+color+";font-weight:bold;background: "+bkg);

  var cite=document.createElement("img");
  cite.setAttribute("src","modules/freezone/images/quote.gif");
  cite.setAttribute("style","cursor:pointer;float:right");
  cite.setAttribute("idComment",c.id);
  cite.setAttribute("idUser",c.uId?c.uId:"0");
  cite.setAttribute("nameUser",c.name);
  title.appendChild(cite);
  cite.addEventListener("click",GM_citer,false);

  var alerter=c.alerter;
  if (alerter) {
    alerter.setAttribute("style","cursor:pointer;float:right");
    title.appendChild(alerter);
  }


  t=document.createTextNode(c.date+" - ");
  if (c.uLogged==1) {
     var b=document.createElement("b");
     b.appendChild(t);
     t=b;
  }
  title.appendChild(t);
  var prof=document.createElement("a");
  prof.setAttribute("href",c.uProfil);
  prof.appendChild(document.createTextNode(c.name));
  prof.setAttribute("style","color:"+color);
  title.appendChild(prof);

  if (c.uVote) {

    title.appendChild(c.uVote);

  }


  var dispFull="";
  if (filter.showMode) {
  var resume=document.createElement("div");
  parent.appendChild(resume);
  resume.setAttribute("style","padding:20 px;background-color:white");
  var p=document.createElement("p");
  resume.appendChild(p);
  resume=p;
  if (c.answer) {
    var s=document.createElement("span");
    s.setAttribute("style","padding-left:30px;font-weight:bold");
    s.appendChild(document.createTextNode("=>  "+c.answer));
    resume.appendChild(s);
    resume.appendChild(document.createElement("br"));
  }


  var t=document.createTextNode(c.resume);
  var i=document.createElement("span");
  i.setAttribute("style","padding-left:10px;font-style:italic");

  i.appendChild(t);
  resume.appendChild(i);

  resume.setAttribute("id",c.id+"-txt");
  var img=document.createElement("img");
  img.src="/modules/freezone/images/bottom.png";
  img.setAttribute("style","float:right");
  img.setAttribute("hide",resume.id);
  img.setAttribute("show",resume.id+"Full");
  resume.insertBefore(img,resume.firstChild);

  resume.setAttribute("hide",resume.id);
  resume.setAttribute("show",resume.id+"Full");

  resume.addEventListener("click",showContent,true);
  img.addEventListener("click",showContent,true);
  dispFull="none";
}

  var full=document.createElement("div");
  parent.appendChild(full);
  full.setAttribute("id",c.id+"-txtFull");
  full.setAttribute("style","display:"+dispFull+";padding:20 px;background-color:white");

  full.innerHTML=c.txt;
if (filter.showMode) {
  var img=document.createElement("img");
  img.src="/modules/freezone/images/top.png";
  img.setAttribute("style","float:right");
  full.insertBefore(img,full.firstChild);  


  img.setAttribute("show",resume.id);
  img.setAttribute("hide",full.id);
  img.addEventListener("click",showContent,true);

  full.setAttribute("show",resume.id);
  full.setAttribute("hide",full.id);
  full.addEventListener("click",showContent,true);  
}
} catch (e) {
  alert(e);
}
}


// updating filter toolbar title

function updateFilterTitle() {
  var t=document.getElementById("filterTitle");
  while (t.firstChild) {
         t.removeChild(t.firstChild);
  }
  t.appendChild(document.createTextNode("Filtre ("+filter.nb+"/"+comments.length+")"));
}


// loop to redisplay all comments
function rebuildAllComm() {
   filter.nb="0";
   for (var i=0;(c=comments[i]);i++) {
      rebuildComm(c);
   }
   updateFilterTitle();

}


// Toggling filter actions
function changeFilterLogged() {
   filter.log=1-filter.log;
   rebuildAllComm();   
   if (filter.log) {
      document.getElementById("filterLogged").style.color="black";
      document.getElementById("filterLogged").style.fontWeight="bold";
   } else {
      document.getElementById("filterLogged").style.color="#808080";
      document.getElementById("filterLogged").style.fontWeight="";
   }
}

function changeFilterAnswerMe() {
   filter.answerMe=1-filter.answerMe;
   rebuildAllComm();   
   if (filter.answerMe) {
      document.getElementById("filterAnswerMe").style.color="black";
      document.getElementById("filterAnswerMe").style.fontWeight="bold";

   } else {
      document.getElementById("filterAnswerMe").style.color="#808080";
      document.getElementById("filterAnswerMe").style.fontWeight="";

   }
}
function changeFilterMe() {
   filter.me=1-filter.me;
   rebuildAllComm();   
   if (filter.me) {
      document.getElementById("filterMe").style.color="black";
      document.getElementById("filterMe").style.fontWeight="bold";

   } else {
      document.getElementById("filterMe").style.color="#808080";
      document.getElementById("filterMe").style.fontWeight="";

   }
}

// Toggle displayMode 
function changeShowMode() {
   filter.showMode=1-filter.showMode;
   rebuildAllComm();   
   if (filter.showMode) {
      document.getElementById("showMode").style.color="black";
      document.getElementById("showMode").style.fontWeight="bold";
   } else {
      document.getElementById("showMode").style.color="#808080";
      document.getElementById("showMode").style.fontWeight="";
   }
}

// toggle comment editor display
function changeCommenter() {
try {
   filter.commenter=1-filter.commenter;
   updateCommenter();
} catch(e) {
alert(e);
}
}


// close comment editor 
function closeCommenter() {
try {
   filter.commenter=0;
   updateCommenter();
} catch(e) {
alert(e);
}
return false;
}

// Comments extractor, init toolbar and triggers display
function extractComment() {
  var el=document.getElementById("commentaire").getElementsByClassName("comment");
  comments=new Array();


var u=document.getElementById("user-pseudo");
if (u) {
   user=getTxt(u);
}

for (var i=0;i<el.length;i++) {
try {
  var comment=new Object();
  var c=el[i];
  var n=document.getElementById(c.getAttribute("id")+"-user");

  // Identifiant de commentaire
  comment.id=c.getAttribute("id");

  // nom du commentateur + est-il loggué ?
  comment.uLogged=0;
  if (n) {
     comment.uLogged=1;
     if (n.getAttribute("href").match("^mailto")) {
        comment.uLogged=0;
     }
     comment.uProfil=n.getAttribute("href");
     comment.name=n.innerHTML;

     if (comment.uLogged) {
       //http://www.freezone.fr/envoyer_message_membre62003,
       var lnks=c.getElementsByTagName("a");
       for (var j=0;(node=lnks[j]) && !comment.uId;j++) {
            var rx=new RegExp("^.*envoyer_message_membre([0-9]+),.*","g");
            var str=node.getAttribute("href");

            if (str && str.match(rx)) {
              comment.uId=str.replace(rx,"$1");
            }
       }
     }
  }

  // Image du profil
  var img=c.getElementsByClassName("infos_user_comment");
  if (img) {
    var img=img[0].getElementsByTagName("img");
    comment.img=img[0].getAttribute("src");
  }

  // barre de vote
  comment.uVote=document.getElementById("user_comment_"+comment.id);
  comment.alerter=document.getElementById("alert-"+comment.id);

  // date du commentaire
  var dateTag=c.getElementsByClassName("date_comment");
  if (dateTag && dateTag[0]) {
     comment.date=dateTag[0].innerHTML.substr(9).replace(/20[0-9][0-9] ./," - ").replace(/ +$/,"");
  }

  // Contenu du commenaire
  var txtC=document.getElementById(c.getAttribute("id")+"-comment");
  comment.txt=txtC.innerHTML;

  // constitution du résumé
  var p=txtC.getElementsByTagName("p");
  comment.resume="";
  var n=0;
  while (short(comment.resume).length<300 && p[n]) {
    try {
     comment.resume=comment.resume+getTxt(p[n]);
    } catch (e) {
      comment.resume=comment.resume+"???";
    }
     n++;
  }
  comment.resume=short(comment.resume);

  // vérification s'il s'agit d'une réponse + extraction du membre à qui l'on répond..
  var answer=txtC.getElementsByTagName("blockquote");
  comment.answer="";
  if (answer) {
    n=0;
    while (answer[n] && !comment.answer)  {
      if (answer[n].getAttribute("id_membre")) {
         comment.idAnswer=answer[n].getAttribute("id_membre");
      }
         var t=answer[n].getElementsByTagName("a");
         if (t) {
              for(var j=0;(answerName=t[j]) && !comment.answer;j++) {
                 var txt=getTxt(answerName);
   		 if (txt.match("a écrit")) {
		     comment.answer=txt.substr(0,txt.length-" a écrit".length);
                 }
              }
        
      }
      n++;
    }
  }

  //alert(comment.name+" - "+comment.img+" - "+comment.date+"["+comment.resume+"] ->"+comment.answer+"("+comment.idAnswer+")");

  comments[comments.length]=comment;
  
} catch (e) {
alert(e);
}
}

 

var toolbar=document.getElementById("GM_toolbar");
if (!toolbar) {
   var parent=document.createElement("div");
   parent.id="GM_toolbar";
   getBody().appendChild(parent);
   parent.setAttribute("style","background:white;border:1px solid #D0D0D0;top:20px;left:0px;position:fixed");

   var title=document.createElement("a");
var bkg="url('modules/freezone/images/bg_info_comment.jpg') repeat-x scroll 0 0 transparent;";
   title.appendChild(document.createTextNode("Filtre ("+filter.nb+")"));
   title.setAttribute("style","display:block;color:white;text-align:center;padding:1px 3px 0px 3px;font-weight:bold;background:"+bkg);
   title.id="filterTitle";
   title.setAttribute("href","http://www.universfreebox.com");
   parent.appendChild(title);


   var order=document.createElement("a");
   order.appendChild(document.createTextNode("Connectés"));
   order.setAttribute("style","display:block;font-weight:bold;border:0px solid black;border-top-width:1px;padding:1px 3px 0px 3px;cursor:pointer");
   order.setAttribute("id","filterLogged");
   parent.appendChild(order);
   order.addEventListener("click",changeFilterLogged,true);

   var order=document.createElement("a");
   order.appendChild(document.createTextNode("Mes réponses"));
   order.setAttribute("style","color:#808080;display:block;border:0px solid black;border-top-width:1px;padding:1px 3px 0px 3px;cursor:pointer");
   order.setAttribute("id","filterAnswerMe");
   parent.appendChild(order);
   order.addEventListener("click",changeFilterAnswerMe,true);


   var order=document.createElement("a");
   order.appendChild(document.createTextNode("Mes commentaires"));
   order.setAttribute("style","color:black;font-weight:bold;display:block;border:0px solid black;border-top-width:1px;padding:1px 3px 0px 3px;cursor:pointer");
   order.setAttribute("id","filterMe");
   parent.appendChild(order);
   order.addEventListener("click",changeFilterMe,true);

   var order=document.createElement("a");
   order.appendChild(document.createTextNode("Affichage Résumé"));
   order.setAttribute("style","color:black;font-weight:bold;display:block;border:0px solid black;border-top:2px solid #D0D0D0;padding:1px 3px 0px 3px;cursor:pointer");
   order.setAttribute("id","showMode");
   parent.appendChild(order);
   order.addEventListener("click",changeShowMode,true);

 var order=document.createElement("a");
   order.appendChild(document.createTextNode("Commenter"));
   order.setAttribute("style","display:block;border:0px solid black;border-top:1px solid black;padding:1px 3px 0px 3px;cursor:pointer");
   order.setAttribute("id","commenter");
   parent.appendChild(order);
   order.addEventListener("click",changeCommenter,true);

 }


  rebuildAllComm();



}

// update Comments (after loading the comments left)
function updateCom(o) {
  var divCom=document.getElementById("load_commentaires");
  if (divCom && divCom.style.display=="") {
     window.setTimeout(function() {o.updateCom(o)},500);
  } else {
     extractComment();
  }
}

// initial transformation
extractComment();

// hook a new transformation on comment loading
var divCom=document.getElementById("load_commentaires");
if (divCom) {
   var o=new Object();
   o.updateCom=updateCom;
   //divCom.setAttribute("updater",o);
   divCom.addEventListener("click",function() {o.updateCom(o)},true);
}

// Comment editor installation
try {
var editorDiv=document.createElement("div");
editorDiv.id="editorDiv";

var close=document.createElement("a");
close.appendChild(document.createTextNode("X"));
close.setAttribute("style","right:3px;top:3px;position:relative;margin-left:5px;color:red;font-weight:bold;cursor:pointer");

close.addEventListener("click",closeCommenter,false);
editorDiv.appendChild(close);
var cForm=document.getElementById("formulaire");

editorDiv.setAttribute("style","display:none;border:1px solid black;position:fixed;bottom:0px;left:50px;background:white;text-align:left");

var consignes=cForm.getElementsByClassName("consigne");
consignes[0].setAttribute("style","position:fixed;right:0px;bottom:0px;width:400px;background:white");
editorDiv.appendChild(cForm);
editorDiv.appendChild(consignes[0]);

getBody().appendChild(editorDiv);

unsafeWindow.addComment=unsafeWindow.ajouter_commentaire;
unsafeWindow.ajouter_commentaire=function (a,b) {
   closeCommenter();
   return unsafeWindow.addComment(a,b);
};

} catch(e) {
alert(e);
}