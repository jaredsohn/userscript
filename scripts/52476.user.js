scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata// ==UserScript==
// @name           Konnektor: Buch
// @namespace      http://rokdd.de/*
// @version        0.3.2
// @include        *
// @description    Hilft Bücher aus Biliothkeken auszulesen und die Fälligkeit zu melden. Archiviert Bücher und sucht deren ISBN und andere Daten.
// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below



function isset(varname)  {
if(typeof( window[ varname ] ) != "undefined") return true;
else return false;
}

function melden(input) {
var newPopup = document.createElement('div');
newPopup.id='rokdd_alert';
newPopup.setAttribute('class','rokdd_alert');
newPopup.innerHTML="<img src='http://rokdd.de/laden.gif' height='20' width='20'>"+input;
document.body.insertBefore(newPopup, document.body.firstChild);
newPopup.addEventListener('click',function(){
this.parentNode.removeChild(this);
},false);
}


function intern_debug(reason)
  {
  GM_log('P'+GM_getValue('mngmt-session-profi','0') + '@'+ GM_getValue('mngmt-session-status')+' - '+reason);
  GM_setValue('mngmt-log',GM_getValue('mngmt-log','')+'#'+'P'+GM_getValue('mngmt-session-profi','0') + '@'+ GM_getValue('mngmt-session-status')+' - ' + reason);
  }

function addGlobalStyle(css) {
//this is from greasemonkey example page - thanks
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = '#rokdd_alert, .rokdd_alert { align:left;text-align:left;padding: 3px; cursor: pointer;display:block; position: absolute; z-index: 9999999999; top: 5px; right: 205px;height:100px;align:left;width:200px; background-color:white;font-family:Arial;font-size:9pt; color: rgb(255, 0, 0); }';;
head.appendChild(style);
}


function deserialize(name, def) {
 		var str = GM_getValue(name,'');
return JSON.parse(str);
}

function serialize(name, obj) {
  GM_setValue(name, JSON.stringify(obj));
}

var stil='#rokdd_alert, .rokdd_alert { align:left;text-align:left;padding: 3px; cursor: pointer;display:block; position: absolute; z-index: 9999999999999; top: 5px; right: 205px;height:100px;align:left;width:200px; background-color:white;font-family:Arial;font-size:9pt; color: rgb(255, 0, 0); }';

if(GM_getValue("1-userstring", "user")=="user" && GM_getValue("1-userpass", "pass")=="pass")
{ mn_set_data();}

GM_registerMenuCommand('Konnektor: Status / Options / Next Book?', mn_get_status);
GM_registerMenuCommand('Konnektor: Start crawling', mn_start);
GM_registerMenuCommand('Konnektor: Wartung', mn_wartung);
GM_registerMenuCommand('Konnektor: Reset service', mn_manual_abbrechen);
GM_registerMenuCommand('Konnektor: Export as csv', mn_export);
GM_registerMenuCommand('Konnektor: Beta', mn_beta);

function mn_manual_abbrechen()
   {
    abbrechen('Manueller Abbruch: '+prompt('Grund?'));
  }

function mn_export() 
  {
  newcontent='';
  alert('Some books and  librarys have no function to research the ISBN!');
  var arder=prompt('Reihenfolge der Daten für CSV:','ISBN,Titel');
  arder=arder.split(',');
  for (var i = 10; i >= 1; --i)
      {
      if(!((GM_getValue(i+'-userstring','sahsa')=='sahsa')))
        {
         var books=GM_getValue(i+'-liste','');
         var temparr = books.split('#');
          for(b=0;b<temparr.length;b++)
            {
            temparr[b]=temparr[b].replace(/"/gm,'');
            var arrNBook=temparr[b].split('|');
            //alert(arrNBook[0]);
            if(!((GM_getValue('book-'+i+'-'+arrNBook[0],'xct')=='xct')))
              {
              var arrBuch=deserialize('book-'+i+'-'+arrNBook[0]); 
              //alert(arrBuch);
              for (attrname in arrNBook) { arrBuch[attrname]=new Object();arrBuch[attrname][0] = arrNBook[attrname]; }
              for (c in arder)
                  {
                    for (f in arrBuch[arder[c]])
                        {
                        if(arrBuch[arder[c]][f].length>0)
                           {
                          newcontent+=arrBuch[arder[c]][f]+',';
                           }
                        else
                          {
                          newcontent+=',';
                          }
                        }
                  }
              
              newcontent+='<br>';
              }
        
            
            }
          }
       }
  document.body.innerHTML=''+newcontent+'';
  }
  
function mn_beta()
  {
  start_isbn(2,prompt('Barcode?'));     
  }

function mn_wartung()
  {
  for (var i = arr.length - 1; i >= 0; --i)
      {
      wartung(i);
      }
  set_next_book();
  }
  
function mn_start()
  {
  start_crawling(prompt(),'true');
  }
  
function wartung(profil)
   {
   //history kürzen?
   var old = GM_getValue('mngmt-log','');
   if(old.split("#").length-1 > 50)
      {
      //alert(old.split('#', 7));//.lastIndexOf(searchString,old.split("#").length-1)
      }
   
   //profile bereinigen wegen doppeleintragungen..
   var old = GM_getValue(profil + '-liste','undefined');
   if(!(old=='undefined'))
      {
       var arr = old.split('#');
       var curr=new Array();
       var neu = '';
       var alwas='###';
       for (var i = arr.length - 1; i >= 0; --i)
          {
          curr=arr[i].replace(/\"/gm,'');
          curr = curr.split("|");
          if(((curr[0].length>5))&&((alwas.indexOf('#'+curr[0]+'#'))<0))
            {       
            alwas='#' + curr[0] + alwas;
            //alert(curr[0]);
            neu=arr[i] + '#' + neu;
            }
          }
       GM_setValue(profil + '-liste','#' + neu);
      }
   intern_debug('Wartung für alle Profile abgeschlossen');
   }

function mn_get_status()
   {      
   var newPopup = document.createElement('div');
    newPopup.id='libmain';
    newPopup.setAttribute('class','libmain');
   
    document.body.insertBefore(newPopup, document.body.firstChild);
    newPopup.addEventListener('dblclick',function(){
    saveform();
    this.parentNode.removeChild(this);
    },false);
    
    GM_addStyle('th {background-color:black} #libmain, .libmain { font-family:Arial;text-align:left;align:left;font-size:9pt;color:black;padding: 3px; cursor: pointer;display:block; position: absolute; z-index: 999999; top: 95px; left: 0px;height:800px;align:left;width:100%; background-color: white; color: rgb(255, 0, 0); }  th.librokdd { color:red } td.librokdd { color::black;}');
    
   var baldverfallen=Number(GM_getValue('mngmt-next-book','0')); 
   var stralert;  
   stralert="<form><table class=\"librokdd\" width=100%><tr><th width=\"200\">Next books:</th><td>"; 
   if(baldverfallen==0)
        stralert+='No books';
   else
        stralert+='' + Math.floor((Number(baldverfallen)-Number(new Date()))/(60*60*24*1000))+ ' days ('+')';
   stralert+='</td></tr>';
   stralert+="<tr><th>Next Library:</th><td>"; 
   stralert+='' + GM_getValue(GM_getValue('mngmt-next-profil')+'-lcode','');
   stralert+='</td></tr>';
   var logi=GM_getValue('mngmt-log','');
   stralert+='<tr><th width="200">Status:</th><td><textarea style="height:200px;width:100%;">'+logi.replace(/#/gm,"\n")+'</textarea></td></tr>';
   stralert+='<tr><td colspan="2"><table class="librokdd" align="left" width=100%><tr><th>Profil</th><th>Bibliothek</th><th>Benutzername</th><th>Passwort</th><th>Fällig</th><th>Last run</th><th>Buchdaten(erl./mgl/ges)</th></tr>';
   var boolNew='false';
  for (var i = 10; i >= 1; --i)
      {
     if(!((GM_getValue(i+'-userstring','sahsa')=='sahsa')))
        {
         var books=GM_getValue(i+'-liste','');
         var temp = books.replace(/#/gm,'#<tr><td>');
         temp = temp.replace(/#/gm,'</td></tr>');
         temp = temp.replace(/\|\"/gm,'|<td>');
         temp = temp.replace(/\"\|/gm,'</td>');
         temp = temp.replace(/\"/gm,'');
          stralert+='<tr><td valign="top">P'+i+'</td><td><select name="'+i+'-lcode">';
         
          for(var ket in pat)
            {
            if(ket==GM_getValue(i+'-lcode'))
              stralert+='<option value="'+ket+'" selected>'+ket+'</option>';
            else
               stralert+='<option value="'+ket+'">'+ket+'</option>'; 
            }
          stralert+='<option value="loschen">loschen</option></select></td><td><input type="text" name="'+i+'-userstring" value="'+GM_getValue(i+'-userstring','')+'"></td><td><input type="text" name="'+i+'-userpass" value="'+GM_getValue(i+'-userpass','')+'"></td><td>';
          if(Number(GM_getValue(i+'-next-book','0'))==0)
              stralert+='niemals';
          else
              stralert+= Math.floor(((Number(GM_getValue(i+'-next-book','0')))-(Number(new Date())))/(60*60*24*1000))+' d';
          
          stralert+=' /'+'</td><td>' + Math.floor((Number(new Date())-(Number(GM_getValue(i+'-lrun','0'))))/(60*60*1000))+' h ago <a onclick="start_crawling(\''+i+'\',\'true\');">Manuell starten</a></td><td>';
 
      
          stralert+='n.a. / n.a. / n.a.</td></tr>';
         }
       else if(!(boolNew=='true'))
          {
          boolNew='true';
          stralert+='<tr><td></td><td valign="top"><select name="'+i+'-lcode">';
                
          for(var ket in pat)
            {
            stralert+='<option value="'+ket+'">'+ket+'</option>'; 
            }
          stralert+='<option value="loschen" selected>loschen</option></select></td><td><input type="text" name="'+i+'-userstring" value="'+'"></td><td><input type="text" name="'+i+'-userpass" value="'+'"></td><td>-</td><td>- h ago</</td></tr>';
     
          }
       }

   stralert+='</table></form></table></td></tr>';
   addGlobalStyle('stil');
   newPopup.innerHTML=stralert;
   }
   
function saveform()
  {
  var arrdata = document.evaluate("id('libmain')/form/table/tbody/tr/td/table/tbody/tr/td/input[@type='text']/@name | id('libmain')/form/table/tbody/tr/td/table/tbody/tr/td//select/@name",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

    for (var i = arrdata.snapshotLength - 1; i >= 0; --i)
          {   
          //nicht angelegt,aber eingegeben:
          if((!(GM_getValue(arrdata.snapshotItem(i).textContent)==document.getElementsByName(arrdata.snapshotItem(i).textContent)[0].value)))
            {
            GM_setValue(arrdata.snapshotItem(i).textContent,document.getElementsByName(arrdata.snapshotItem(i).textContent)[0].value);
            }    
          if(((document.getElementsByName(arrdata.snapshotItem(i).textContent)[0].value=='')||(document.getElementsByName(arrdata.snapshotItem(i).textContent)[0].value=='loschen'))&&(!(GM_getValue(arrdata.snapshotItem(i).textContent,'undefined')=='undefined')))
            {
              GM_setValue(arrdata.snapshotItem(i).textContent,'');
              GM_deleteValue(arrdata.snapshotItem(i).textContent);              
            }
          }
  }

function mn_set_data()
  {
  alert('Sorry but some data for Library script are not available. The wizard starts now...');
  var prof = prompt("Please type number of profil (1-10):");
  GM_setValue(prof+"-userstring", prompt("Please type your loginname:"));
  GM_setValue(prof+"-userpass", prompt("And the password"));
  GM_setValue(prof+"-lcode", prompt("Library: DD-SLUB or DD-HTW"));
  alert('Okay fine, all data are defined now!');
  }
  
function set_next_book()
  {
  var baldverfallen='9999999999999999999999999';
  var baldprofil = '';
  for (var i = 10; i >= 0; --i)
    {
    if((!(GM_getValue(i+'-next-book','xyz')=='xyz'))&&(GM_getValue(i+'-next-book')>0)&&((GM_getValue(i+'-next-book')<baldverfallen)))
      {
      baldverfallen=Number(GM_getValue(i+'-next-book'));
      baldprofil=i;
      }
    }
  if(!(baldverfallen==Number(GM_getValue('mngmt-next-book','9999999999999999999999999'))))
    {
    GM_setValue('mngmt-next-book',String(baldverfallen));    
      GM_setValue('mngmt-next-profil',String(baldprofil));    
    }
  }

//notfikation?
if(((Number(GM_getValue('mngmt-next-book','0'))-Number(new Date())<7*60*60*24*1000))&&(Number(new Date().getTime())-(Number(GM_getValue('mngmt-meldung','0')))>1000*60*60*24*1))
  {
  GM_setValue('mngmt-meldung',String(new Date().getTime()));
  alert("Bücher laufen ab\nBibliothekscode:"+GM_getValue(GM_getValue('mngmt-next-profil')+'-lcode','')+"\nFällig in :"+ Math.floor((Number(GM_getValue('mngmt-next-book','0'))-Number(new Date()))/(60*60*24*1000))+ ' days ('+')');
  melden("Bücher laufen ab\nBibliothekscode:"+GM_getValue(GM_getValue('mngmt-next-profil')+'-lcode','')+"\nFällig in :"+ Math.floor((Number(GM_getValue('mngmt-next-book','0'))-Number(new Date()))/(60*60*24*1000))+ ' days ('+')');
  }
  

var pat=new Array();
pat['DD-SLUB']=Array("//table[contains(@summary,'Ausgeliehene')]/tbody/tr/*[contains(@headers,'th')]",6,0,1,2,3,4,5,'Exemplarinformation',"//a[contains(@title,'LOGOUT')]/@href",'https://webopac.slub-dresden.de/libero/WebOpac.cls',"//a[contains(@title,'Benutzerkonto')]/@href",'usernum','password','btnLogin','https://webopac.slub-dresden.de/libero/',"id('memb_header')/div[1]/text()");
pat['DD-SLUB']['xpSuchseite']="id('searchMenu')/ul/li[2]/a/@href";
pat['DD-SLUB']['xpErstesErgebnis']="id('searchResults')/tbody/tr/td[2]/span[1]/a/@href";
pat['DD-SLUB']['xpTabBuchdetails']="id('right_column')/form/div[3]/div[2]/table/tbody/tr/*";

pat['DD-HTW']=Array("//table/tbody/tr/td[contains(@ID,'MemStatLoan')]",6,0,1,2,3,4,5,'Exemplarinformation',"//a[contains(@ID,'ExitButton')]/@href",'http://bsv9.bib.htw-dresden.de/libero/WebOpac.cls?LANG=DE&Login=Login+to+WebOPAC',"//a[contains(@href,'MEMBERSERV')]/@href",'usernum','password','login','http://bsv9.bib.htw-dresden.de/libero',"id('MemStatMembCapt')/text()");
pat['DD-HTW']['xpSuchseite']="//td['Menuitem']/a[contains(text(),'Erweiterte Suche')]/@href";
pat['DD-HTW']['xpErstesErgebnis']="id('ShortTNum')/a[1]/@href";
pat['DD-HTW']['xpTabBuchdetails']="//td[@id='BibFulldPrompt'] | //td[@id='BibFulldData']";

var ul=location.href;

if(ul.indexOf('about:blank'))
  {
  //mn_get_status();
  }


if((Number(new Date())-Number(GM_getValue('mngmt-session-start','0'))>60*1000*4)&&(GM_getValue('mngmt-session-status','0')>0))
  {
  abbrechen('timeout :-(');
  }

function abbrechen(reason)
  {
  GM_setValue('mngmt-session-profil','');
  GM_deleteValue('mngmt-session-profil');
  GM_setValue('mngmt-session-start','');
  GM_deleteValue('mngmt-session-start');
  intern_debug(reason);
  GM_setValue('mngmt-session-status','');
  GM_deleteValue('mngmt-session-status');
  GM_setValue('mngmt-session-art','');
  GM_deleteValue('mngmt-session-art');
  GM_setValue('mngmt-session-keyword','');
  GM_deleteValue('mngmt-session-keyword');
  }

function sizen(arr) {
var l = arr.length ? --arr.length : -1;
for (var k in arr) {
l++;
}
if(l<0)
  return 0
else
  return l;
}

if(GM_getValue('mngmt-session-art','0')>1)
  {
  //profil laden..
  var profil = GM_getValue('mngmt-session-profil','1');
  var lcode= GM_getValue(profil + '-lcode','');
  //debug
  if(GM_getValue('mngmt-debug-mode')=='true')
    alert('now');

  if(GM_getValue('mngmt-session-status')=='4')
    {
    var olp=new Object();
    var ck='';
    var daten = document.evaluate(pat[lcode]['xpTabBuchdetails'],document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    
    for (var i = 0; i < daten.snapshotLength; i++)
          {   
          //nicht angelegt,aber eingegeben:
          if((daten.snapshotItem(i).id.length>0)||(daten.snapshotItem(i).id=="BibFulldPrompt"))
            {
            ck=daten.snapshotItem(i).textContent.replace(/^[a-z]/gm);
            olp[ck]=new Object();
            }
          else if((daten.snapshotItem(i).textContent.length>0)&&(!(daten.snapshotItem(i).textContent=='undefined')))
            {
            olp[ck][sizen(olp[ck])]=daten.snapshotItem(i).textContent;  
            }
          }
    
    //Daten aufbereiten
    for (c in olp['ISBN'])
        {
        if(olp['ISBN'].indexOf('ISBN')>-1)
          olp['ISBN'][c]=olp['ISBN'][c].substring(5);     
        }
    
    //Daten speichern
    serialize('book-'+GM_getValue('mngmt-session-profil')+'-'+GM_getValue('mngmt-session-keyword'),olp);

    intern_debug("Serialized:"+'book-'+GM_getValue('mngmt-session-profil')+'-'+GM_getValue('mngmt-session-keyword'));
    
    //end session and tab
    intern_debug('Session ended');
    GM_setValue('mngmt-status',String(new Date().getTime()));
    GM_setValue(profil+'-lrun',String(new Date().getTime()));
    GM_setValue('mngmt-session-profi','');
    GM_deleteValue('mngmt-session-profi');
    GM_setValue('mngmt-session-start','');
    GM_deleteValue('mngmt-session-start');
    GM_setValue('mngmt-session-status','');
    GM_deleteValue('mngmt-session-status');
    window.open('', '_self', '');
    window.close();
    }
  if(GM_getValue('mngmt-session-status')=='3')
    {
    var link = document.evaluate(pat[lcode]['xpErstesErgebnis'],document,null,2,null).stringValue;
    if(link)
      {
      GM_setValue('mngmt-session-status','4');
      document.location=link;
      }
    }

  if(GM_getValue('mngmt-session-status')=='2')
      {
      intern_debug('Suche ausfüllen');
      if(lcode=='DD-SLUB')
        {
        window.setTimeout("document.getElementById('TERM_1').value = \""+GM_getValue('mngmt-session-keyword')+"\";", 1306);
        window.setTimeout("document.getElementById('USE_1').value = \"a\";", 1002);
        GM_setValue('mngmt-session-status','3');
        window.setTimeout("document.getElementById('btnSearch').click()",2301);
        }
      if(lcode=='DD-HTW')
        {
        window.setTimeout("document.getElementsByName('TERM_1')[0].value = \""+GM_getValue('mngmt-session-keyword')+"\";", 1306);
        window.setTimeout("document.getElementsByName('USE_1')[0].value = \"a\";", 1002);
        GM_setValue('mngmt-session-status','3');
        window.setTimeout("document.getElementsByName('ACTION')[0].click()",2301);
        }
      }
     if(GM_getValue('mngmt-session-status')=='1')
      {
      intern_debug('Suche aufrufen');
      var link = document.evaluate(pat[lcode]['xpSuchseite'],document,null,2,null).stringValue;

      if(link)
        {
        GM_setValue('mngmt-session-status','2');
        document.location=link;   
        }
      }
   } 
  

if((ul.indexOf('WebOpac')>-1)||(Number(new Date())-Number(GM_getValue('mngmt-session-start','0'))<60*60*24*5*1000))
  {
  var mode='automatic';
  if((ul.indexOf('WebOpac')>-1)&&(Number(new Date())-Number(GM_getValue('mngmt-session-profi','0'))==0))
    {
    //profil für seite ermitteln
   for (var i = 10; i >= 0; --i)
      {
      if((!(GM_getValue(i+'-lcode','xyz')=='xyz')))
        {
        if(ul.indexOf(pat[GM_getValue(i+'-lcode')][15])>-1)
          {
          var profil=i;
          var lcode=GM_getValue(profil+'-lcode');
          mode='manual';
          break;
          }
        }
      }
      }
  else
      {
      //profil laden..
      var profil = GM_getValue('mngmt-session-profil','1');
      var lcode= GM_getValue(profil + '-lcode','DD-SLUB');
      }

 if((ul.indexOf(pat[lcode][15])>-1)&&(GM_getValue('mngmt-session-art','0')<2))
 {
 if((GM_getValue('mngmt-session-status')=='4')&&(mode=='automatic'))
    {
    window.open('', '_self', '');
    window.close();
    var boolStatus='ended';  
    }
 if((GM_getValue('mngmt-session-status')=='3')||(mode=='manual'))
      {
      intern_debug('Angemeldet');
      var xc=0;
      if(pat[lcode][16]=='')
        {
        var nummer=GM_getValue(profil+"-userstring");
        intern_debug('Benutzername nicht überprüft');
        }
      else
        {
        var nummer = document.evaluate(pat[lcode][16],document,null,2,null).stringValue;
        var ok=new RegExp("\\D+", "g")
        nummer = nummer.replace(ok, '');
        }
      // wenn manuell profil prüfen:
      if(mode=='manual')
        {
       for (var i = 10; i >= 0; --i)
        {
        if(((GM_getValue(i+'-userstring','xyz')==nummer)))
          {
            var profil=i;
            var lcode=GM_getValue(profil+'-lcode');
            intern_debug('Manuell Profil '+ i);
            break;
          }
        }
        //wenn hier nicht angekommen dann echt doof..
        mode='abbrechen';
        intern_debug('Manuelle Aktualisierung abgebrochen: Kein Benutzername');
        bool_status='ended';
        }
      //ende prüfen
      if(((nummer==GM_getValue(profil+"-userstring"))||(pat[lcode][16].length<2))&&(!(mode=='abbrechen')))
        {
        GM_log(xc);xc=xc+1;
        var data = document.evaluate(pat[lcode][0],document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
        //finden des bald verfallenenen
        var booksold = GM_getValue(profil+'-'+'liste','');
        var baldverfallen = 99999999999999999;
        var books='#';
        if(data.snapshotLength>0)
          {
          for (var i = data.snapshotLength - 1; i >= 0; --i)
            {   
            if(((i-(pat[lcode][1]-pat[lcode][5])) % pat[lcode][1]) == 0)  //-3
              {
              //replacen :(
              var arrRep=new Array();
              arrRep['Okt']='Oct';
              arrRep['Dez']='Dec';
              arrRep['Mai']='May';
              for(t in arrRep)
                {
                data.snapshotItem(i).textContent=data.snapshotItem(i).textContent.replace(t,arrRep[t]);
                }
              data.snapshotItem(i).textContent=Date.parse(data.snapshotItem(i).textContent);
              if(baldverfallen>data.snapshotItem(i).textContent)
                {
                baldverfallen=data.snapshotItem(i).textContent;
                }
              }
          
            if(((i+(pat[lcode][1]-pat[lcode][3])) % pat[lcode][1]) == 0) //+5
              {
              var test=data.snapshotItem(i).textContent;
              if(test.indexOf(pat[lcode][8])>0)
                {
                data.snapshotItem(i).textContent=test.substring(0,test.indexOf(pat[lcode][8]));
                }
              }
            //data.snapshotItem(i).textContent=data.snapshotItem(i).textContent
            if(((i+(pat[lcode][1]-pat[lcode][7])) % pat[lcode][1]) == 0)  //+1
               {
               books='#'+books;
               }
            else
               books='"'+data.snapshotItem(i).textContent+ '"|'+ books;  
            }
          intern_debug('Bücher aktualisiert');
          GM_setValue(profil+'-'+'liste',booksold+'#'+books);  
          }
        else
          {
          baldverfallen=0;
          intern_debug('Keine Bücher erkannt');
          }
        GM_setValue(profil+'-next-book',String(baldverfallen));  
        set_next_book();
        GM_setValue('mngmt-session-status','4'); 
        wartung(profil);
        var link = document.evaluate(pat[lcode][9],document,null,2,null).stringValue;
        if ((!mode=='manual') && (link) && (!lcode=='DD-HTW'))
          {
          intern_debug('Abgemeldet mit Link');
          window.setTimeout("document.location='"+link+"'",1000);
          }
        else if((!(mode=='manual')))
          {
          intern_debug('Abgemeldet ohne Link');
          var boolStatus='ended';  
          }
        }
      else
        {
        intern_debug('Falscher Benutzername zu Profil');  
        bool_status='ended';    
        }
      }
 if(GM_getValue('mngmt-session-status')=='2')
      {
      //wait for login
      intern_debug('Login aufgerufen');
      if(lcode=='DD-SLUB')
        {
        window.setTimeout("document.getElementById('"+pat[lcode][12]+"').value = \""+GM_getValue(profil+"-userstring", "")+"\";", 1306);
        window.setTimeout("document.getElementById('"+pat[lcode][13]+"').value = \""+GM_getValue(profil+"-userpass", "")+"\";", 2002);
        GM_setValue('mngmt-session-status','3');
        window.setTimeout("document.getElementById('"+pat[lcode][14]+"').click()",5301);
        }
      if(lcode=='DD-HTW')
        {
        window.setTimeout("document.getElementsByName('"+pat[lcode][12]+"')[0].value = \""+GM_getValue(profil+"-userstring", "")+"\";", 1306);
        window.setTimeout("document.getElementsByName('"+pat[lcode][13]+"')[0].value = \""+GM_getValue(profil+"-userpass", "")+"\";", 2002);
        GM_setValue('mngmt-session-status','3');
        window.setTimeout("document.getElementsByName('"+pat[lcode][14]+"')[0].click()",5301);
        }
      }      
  if(GM_getValue('mngmt-session-status')=='1')
      {
      //find login
      var link = document.evaluate(pat[lcode][11],document,null,2,null).stringValue;
       if (link)
       {
        addGlobalStyle('stil');
        melden('Try to login');
        GM_setValue('mngmt-session-status','2');
        document.location=link;
        }
       else
       {
       abbrechen('No link');
       }
      }
 
  if(boolStatus=='ended')
    {
    intern_debug('Session ended');
    GM_setValue('mngmt-status',String(new Date().getTime()));
    GM_setValue(profil+'-lrun',String(new Date().getTime()));
    GM_setValue('mngmt-session-profil','');
    GM_deleteValue('mngmt-session-profil');
    GM_setValue('mngmt-session-start','');
    GM_deleteValue('mngmt-session-start');
    GM_setValue('mngmt-session-status','');
    GM_deleteValue('mngmt-session-status');
    if(!(mode=='manuell'))
      {
      window.open('', '_self', '');
      window.close();
      }
    else
      {
      intern_debug('No automatic');
      }
    }
    }
  else
    {
  //melden('Session aktiv');
  }
  }

if(Number(new Date())-Number(GM_getValue('mngmt-status','0'))>60*1000*5)
  {

  for (var i = 10; i >= 0; --i)
      {
      if((!(GM_getValue(i + '-lcode','')==''))&&(!(GM_getValue(i + '-userstring','')=='')))
        {
        if(start_crawling(i,'false'))
          {
          i=20;
          break;
          }
        }
      }
  if(i<10)
  {
  intern_debug('Time for ISBN yeah?');
  for (var i = 0; i < 10; i++)
    {
    if((!(GM_getValue(i + '-liste','bla')=='bla')))
      {
      //GM_log('Profil:'+i);
      var books=GM_getValue(i+'-liste','tz');
      if((!(books=='tz')))//&&(GM_getValue(i+'-lcode')=='DD-SLUB'))
        {
        GM_log('Profilliste:'+i);
        var buch=books.split('#');
        for (var k in buch)
            {
            var buchdaten=buch[k].split('|');
            buchdaten[0]=buchdaten[0].replace(/"/gm,'');
            //okay daten dazu?
            var extbuchdaten=GM_getValue('book-'+i+'-'+buchdaten[0],'tz');
            
            if((((extbuchdaten=='tz'))||((extbuchdaten=='undefined')))&&(buchdaten[0].length>3))
              {
              start_isbn(i,buchdaten[0]);
              //alert('book-'+i+'-'+buchdaten[0]);
              i=20;
              break;
              }
            }
        
        }
      }
    }
  }
  //okay jetz können wir auch mal eine ISBN schauen
  GM_setValue('mngmt-status',String(new Date().getTime()));
  }
  



//MeinFenster = window.open('http://rokdd.de', "Zweitfenster", "width=300,height=200,scrollbars=yes");

function start_isbn(profil,barcode)
  {
  GM_setValue('mngmt-status',String(new Date().getTime()));
  GM_setValue('mngmt-session-start',String(new Date().getTime()));
  GM_setValue('mngmt-session-status','1');
  GM_setValue('mngmt-session-art','2');
  GM_setValue('mngmt-session-keyword',barcode);
  GM_setValue('mngmt-session-profil',profil);
  intern_debug('ISBN Session gestartet');

  var lcode= GM_getValue(profil + '-lcode','');

  GM_openInTab(pat[lcode][10]);        
   
}

function start_crawling(profil,boolStart)
  {
  if((boolStart=='true')||((((Number(new Date())-Number(GM_getValue(profil+'-lrun','0'))>60*60*24*2*1000)&&((Number(new Date())-Number(GM_getValue(profil+'-next-book','0'))<60*60*24*7*1000)))||(Number(new Date())-Number(GM_getValue(profil+'-lrun','0'))>60*60*24*3*1000))&&(GM_getValue('mngmt-session-status','')=='')))
    {
    GM_setValue('mngmt-status',String(new Date().getTime()));
    GM_setValue('mngmt-session-start',String(new Date().getTime()));
    GM_setValue('mngmt-session-status','1');
    GM_setValue('mngmt-session-art','1');
    GM_setValue('mngmt-session-profil',profil);
    intern_debug('Session gestartet');
  
    var lcode= GM_getValue(profil + '-lcode','DD-SLUB');
    GM_openInTab(pat[lcode][10]);
    var alertstr='';
    var popUP=null;
    addGlobalStyle('stil');
    melden('Prüfen von Bibliothek startet..');
    return true;
    }
  else
    {
    return false;
    }
  }

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '52476', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match('Uh-oh! The page could not be found!')) || (this.xname[1] != this.name) ) GM_setValue('updated', 'off');
      return false;
    }
    if ( (this.xversion > this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion > this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    }
    }
};
if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();