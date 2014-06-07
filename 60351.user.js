// ==UserScript==
// @name           [HFR] LiveLurker 
// @copyright      2009 - saSHOCK
// @version         0.7
// @namespace      http://forum.hardware.fr
// @description    Charge en direct les messages sur un topic ou ca flood
// @include        http://forum.hardware.fr/*
// ==/UserScript==
  GM_registerMenuCommand( 'Rafraichissement toutes les 20s', function() { set_interval(20000);} );
  GM_registerMenuCommand( 'Rafraichissement toutes les 10s', function() { set_interval(10000);} );
  GM_registerMenuCommand( 'Rafraichissement toutes les 5s', function() { set_interval(5000);} );
  GM_registerMenuCommand( 'Rafraichissement toutes les 3s',function() { set_interval(3000);});
var lastlink="";
var cur_url=document.URL;
var auto_scroll=true;
var page_changed=false;
var current_page=0;
var last_element=null;
var divbas= document.getElementById('goto');//  document.getElementById('goto')
var filt= document.getElementById('filter');// allDivs.snapshotItem(0);
var interval=10000;
if (divbas!=null && filt!=null)
{
  var toinsert='<span id=\'lurk_control\' style=\'\'>Live lurking : <span id=\'global_on\' style=\'cursor:pointer;\' onclick=\'innerHTML=(innerHTML==\"off\")?\"on\":\"off\";\'>off</span>&nbsp; auto-scroll : <span id=\'auto_scroll\' style=\'cursor:pointer;\' onclick=\'innerHTML=(innerHTML==\"off\")?\"on\":\"off\";\'>off</span></span>';
  divbas.innerHTML=toinsert+divbas.innerHTML;
}


function get_setting(nom)
{
  var elem=document.getElementById(nom);
  if (elem!=null)
  {
    return elem.innerHTML=='on';
  }
  
return false;
}

function update_messages(to_insert)
{
  var ligne=document.getElementById('div_lurkage');  
  for(var i=to_insert.length-1;i>=0;i--)
  {
    ligne.innerHTML+='<!--start-->'+to_insert[i]+'<!--end-->';
  }
}

function update_message_single(to_insert)
{
if (last_element==null)
  last_element=document.getElementById('div_lurkage');  
  elt= document.createElement('div');
   elt.innerHTML+='<!--start-->'+to_insert+'<!--end-->';
  last_element.parentNode.insertBefore(elt, last_element.nextSibling);
  last_element=elt;
 // ligne.innerHTML+='<!--start-->'+to_insert+'<!--end-->';
 

}

function set_interval(val)
{
//alert(val);
  GM_getValue('interval_refresh', val);
}

function traite(texte)
{
  texte=texte.replace(/\n/g,' ');
  texte=texte.replace(/\r/g,' ');
  texte=texte.replace(/\s/g,' ').replace(/  ,/g,',');  
return texte;
}
function message_from_number(texte,nummess)
{
  var mess=nummess;
  var reponse=texte;
  var pos=reponse.indexOf('<a name=\"'+mess+'\">');
  tmpreponse=reponse.substr(pos,reponse.length-pos);
  var pos2=tmpreponse.indexOf('<table cellspacing=\"0\" cellpadding=\"4\" width=\"100%\"');
  reponse=reponse.substr(pos-600,pos2+600);
  var deus=reponse.indexOf('<table cellspacing=\"0\" cellpadding=\"4\" width=\"100%\"');
  reponse=reponse.substr(deus,reponse.length-deus);
return reponse
}

function remind()
{
if (get_setting('global_on') )
    {
    var mylast="pastroved";
    var myurl=cur_url+'?='+Math.floor(Math.random()*12201);
	//    
    GM_xmlhttpRequest({
    method: 'GET',
    url: myurl,
    headers: {
       'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
       'Accept': 'application/atom+xml,application/xml,text/xml',
       'Cache-Control': 'no-cache'
    },
    onload: function(responseDetails) {
    var reponse=traite(responseDetails.responseText);
  
    var re = new RegExp("<a name=\"(t[0-9]+)\">",'g');
    var total="";
    var has_new=false;
    var new_msgs_numbers= Array();
    var to_insert=Array();
    var pattern=/\"(t[0-9]+)\"/g;
    var m = reponse.match(pattern);
    
    if (m != null) 
    {
      for (i = 0; i < m.length; i++) 
      {
       mylast = m[i];
	   
       if (parseInt(mylast.split("t")[1])>parseInt(lastlink.split("t")[1]))
	   {
	 //  update_message_single('<div><h4>new mess!</h4>'+mylast+'</div>');
		new_msgs_numbers.push(mylast);
	   }
      }
    }
    update_current_page(reponse);

 
    for (i = 0; i < new_msgs_numbers.length; i++)
    {
     current_number=new_msgs_numbers[i].replace(/\"/g,'');
     update_message_single(message_from_number(reponse,current_number)) ;
	 lastlink=current_number;
    }
    
    if (get_setting('auto_scroll'))
      {
      last_number=new_msgs_numbers[new_msgs_numbers.length-1]/*lastlink*/.replace(/\"/g,'');
      window.location.hash =last_number;
      }
// update_messages(to_insert);
if(new_msgs_numbers.length>0)	
    lastlink=new_msgs_numbers[new_msgs_numbers.length-1];

    
	
    if (page_changed)
    {
    page_changed=false;
   // alert('page changed '+current_page);
    update_message_single('<div><h4>Page '+current_page+'</h4></div>');
	remind();
    }
    reponse=null;
      
}
});
/*
*/
}
//
window.setTimeout(remind,interval);

}


function update_current_page(reponse)
{
  var reg=new RegExp('<(a)\\b[^>]*href=\"([^>]*_([0-9]+)\.htm)\"[^>]*\"x\"[^>]*>(.*?)</\\1>','im');
  var m = reg.exec(reponse);
  if (m!=null)
  {
    page_changed=true;
    cur_url='http://forum.hardware.fr/'+m[2];
    current_page=m[3];
  }
}
var reponse=traite(document.body.innerHTML );
var pattern=/\"(t[0-9]+)\"/g;
var m = reponse.match(pattern);
  if (m == null) 
    {
    
    } 
  else 
    {
      for (i = 0; i < m.length; i++) {
       lastlink = m[i];
    }
}

allDivs = document.evaluate(
"//table[@class='messagetable']",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
var t;
for(var o=0;o<allDivs.snapshotLength;o++)
{
t=allDivs.snapshotItem(o);   }
var newElement = document.createElement('div');
newElement.className='contain_lurkage';      newElement.id='div_lurkage';
t.parentNode.insertBefore(newElement, t.nextSibling);

remind();
