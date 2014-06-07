// ==UserScript==
// @name          Danbooru Ignore User Plugin
// @namespace     http://youngpup.net/userscripts
// @description	  Enables you to selectively ignore/hide all commments by certain users.
// @include       http://yukkuri.shii.org/*
// @include       http://danbooru.donmai.us/*
// @include       http://bronibooru.mlponies.com/*
// ==/UserScript==

// Written by WestisBlue @ westisblue.com
// Warning! Spaghetti code ahead!
   

 var numberhidden=0;

// alert(navigator.appName);
var stuff1= location.host+'-hidden1';
var stuff= location.host+'-hidden';

function toggleString(i)
{   
    if (navigator.userAgent.indexOf('Mozilla') != -1)  
         localStorage.setItem(stuff1, i);
     else
         localStorage[stuff1]=i;
}

function saveString(i)
{  
    if (navigator.userAgent.indexOf('Mozilla') != -1)  
         localStorage.setItem(stuff, i);
     else
         localStorage[stuff]=i;
}
 function getString()
 {
     var something;
     if (navigator.userAgent.indexOf('Mozilla') != -1)  
         something=localStorage.getItem(stuff);
     else
         something=localStorage[stuff];
     return something;
 }


 function toggle(i)
 {
 var hidinglinks= document.getElementsByClassName('hideme');
  if (document.getElementById('hidden').style.display=='block') {
       document.getElementById('hidden').style.display='none';
       i.innerHTML="[+]";
//       localStorage[location.host+'-hidden1']='hide';
        toggleString('hide');
       i.nextSibling.style.display='none';
       document.getElementById('hidden1').style.width='30px';
       for (m = 0; m <  hidinglinks.length; m++)
            hidinglinks[m].style.display='none';
       }
 else {
     document.getElementById('hidden').style.display='block';
     i.innerHTML="[-]";
    for (m = 0; m <  hidinglinks.length; m++)
        hidinglinks[m].style.display='inline';
//     localStorage[location.host+'-hidden1']='show';
    toggleString('show');
     document.getElementById('hidden1').style.width='300px';
     i.nextSibling.style.display='inline';
     }
 }
 function removeUser(i,y)
 {
  var test = new Array();
  for ( m =0; m < y.length; m++) {
        if (y[m].firstChild!=null) {
          if (y[m].firstChild.innerHTML===i)
              {
                    var temp=y[m].parentNode.parentNode.parentNode;
                      temp.removeChild(y[m].parentNode.parentNode);
                    numberhidden++;    
               }
          }
     }


 }
 function removeUserQuote(i,y)
 {
for (m=0; m < y.length; m++) {
    if (y[m]!=null)
        if (y[m].innerHTML.indexOf(i)!=-1) {
            y[m].innerHTML=i + " said: something.";
            }
        }
   }
 
  addMe = function(i) { 
      
      var newuser=i.parentNode.parentNode.parentNode.getElementsByTagName("h6")[0].firstChild.innerHTML;
      addingMe(newuser);
      users1.push(newuser);
      var users2=users1.toString();
//      localStorage[location.host+'-hidden']=users2;
      saveString(users2);
      removeUser(newuser,document.getElementsByTagName('h6'));
      removeUserQuote(newuser,document.getElementsByTagName('blockquote'));
      document.getElementById('numberhidden').innerHTML=numberhidden;
      return true;
  };
    addingMe= function (newuser) {
//      alert(newuser);
      var something= document.createElement('div');

      var hi=document.createTextNode(newuser);
      var hi1=document.createElement('a');
      hi1.setAttribute("class", "removeme");
       hi1.setAttribute("href", "#");
      hi1.innerHTML='[x].<br/>';
      hi1.addEventListener('click', function () { removeMe(this)}, false);
      something.appendChild(hi);
      something.appendChild(hi1);
      document.getElementById("hidden").appendChild(something);
      };
  removeMe = function(i) {
    var tempuser=i.parentNode.firstChild.data;
     for (m=0; m < users1.length; m++)
         if (users1[m]==tempuser)
             users1.splice(m,1);
     if (users1.length!=0)
//         localStorage[location.host+'-hidden']=users1.toString();
    saveString(users1.toString());
     else
//         localStorage[location.host+'-hidden']= '#######';
     saveString('#######');
    location.reload(true);
    return true;
      };




    GM_addStyle(".removeme{float:right; display:inline; } .hideme { } #hidden, #hidden1 { display:block; background-color:white; color:navy; position:fixed; top:10px; right:30px; width:300px;} #hidden {  top:25px; }");
    var element = document.createElement('div');
    element.id="hidden1";
    
    var showorhide=true;
      var nrg=document.createElement('a');
      nrg.setAttribute("href", "#");
      
     var check="";
     if (navigator.userAgent.indexOf('Mozilla') != -1)  
         check=localStorage.getItem(stuff1);
     else
         check=localStorage[stuff1];

    if (check==undefined || check=='show')
        nrg.innerHTML='[-]';
      else {
        nrg.innerHTML='[+]';
       showorhide=false;
      }
      
      nrg.addEventListener('click', function () { toggle(this); return false;}, false);
      element.appendChild(nrg);
     
       var blocked = document.createElement('div');

    
        blocked.appendChild(document.createTextNode
        ('Blocked Users'));
        var blocked1 = document.createElement('div');
        blocked1.setAttribute('class', 'removeme');
       
        var blocked2=document.createElement('span');
        blocked2.setAttribute('id', 'numberhidden');
        blocked1.appendChild(blocked2);
        blocked1.appendChild(document.createTextNode(' comments hidden'));
        blocked.appendChild(blocked1);
        if (showorhide) {
            blocked.style.display='inline';
            element.style.width='300px';
        }
       else {
            blocked.style.display='none';
            element.style.width='30px';
        }
        element.appendChild(blocked);

    
    
    var elemen = document.createElement('div');
    elemen.id="hidden";
    element.appendChild(elemen);
    
    
    
    document.body.appendChild(element);
    
    if (showorhide)
        document.getElementById('hidden').style.display='block';
    else
        document.getElementById('hidden').style.display='none';
 function addMe1(i) { addingMe(i) }

 var users1=new Array();
 var currentusers=document.getElementsByTagName('h6');
 var userquotes=document.getElementsByTagName('blockquote');
 var savedusers=getString();
 
  if (savedusers!=undefined && savedusers!= '#######') {
      users1= savedusers.split(",");
      for (var i = 0; i < users1.length; i++) {
          addMe1(users1[i]);
          removeUser(users1[i], currentusers);
         }
  }
  
 
  for (n=0; n < users1.length; n++)
          removeUserQuote(users1[n],userquotes);
    
    var deleteme = document.getElementsByClassName("footer");
    var element1 = document.createElement('a');
    var element3 = document.createElement('span');
    element1.href='#';
    element1.appendChild(document.createTextNode('Hide'));
   element3.setAttribute("class","hideme");
   element3.appendChild(document.createTextNode(" | "));
   element3.appendChild(element1);
    if (!showorhide)
        element3.style.display='none';
     
    for (y = 0; y < deleteme.length; y++)
       {
           deleteme[y].appendChild(element3.cloneNode(true));
           deleteme[y].lastChild.addEventListener('click', function () { addMe(this); return false;}, false);
           
       }
       
     document.getElementById('numberhidden').innerHTML='0';
     document.getElementById('numberhidden').innerHTML=numberhidden;





