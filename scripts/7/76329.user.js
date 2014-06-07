// ==UserScript==
// @name           opcvm
// @namespace      http://www.boursorama.com/opcvm/
// @description    Récupérer les valeurs liquidatives sur www.boursorama.com d'opcvm et les importer dans un document GoogleDocs
// @include        http://www.boursorama.com/opcvm/
// @creator        Manu Cart
// @date           27/4/2010
// @version        0.0.1 version alpha
// @modified       27/4/2010

// ==/UserScript==

/* Utilisation du script de Michael Freeman (http://userscripts.org/scripts/show/27673)
** Utilisation du script de Eric de Google (http://gdatatips.blogspot.com/2009/07/create-new-google-docs-spreadsheet-from.html)
*/

// Variables à Modifier
    
    var email = 'e.mail@gmail.com';	//Email pour se connecter au service Google Documents
    var password = 'mot_de_passe';		//Mot de passe pour se connecter au service Google Documents
    var classname = 'Valeurs';		// Nom du fichier qui sera importé dans Google Documents
    // Symboles de l'Opcvm que l'on retrouve dans l'url de l'opcvm concern�e par exemple : http://www.boursorama.com/opcvm/opcvm.phtml?symbole=MP-123456
    
    var symboles = new Array ("MP-357096" , "MP-807405" , "MP-285922" , "MP-358614" , "MP-357673" , "MP-804450" , "MP-801339" , "MP-803095" , "MP-204944" , "MP-210179" , "MP-829227","MP-359345","MP-807406");
 



// Code source

var tmp = '';
var csv = ''; 
var xml;
var jointable="";



// Variables du tableau final
var newtableau= new Array();
for (var i = 0; i < (symboles.length+1); i++) {
newtableau[i] = new Array();
}

newtableau[0][0]="Date";
var ObjetDate = new Date();
var expdate = ObjetDate.getTime()


for (var d=366; d>0 ;d--)
  {
  ObjetDate.setTime(expdate)
  newtableau[0][d] = ObjetDate.getFullYear()+"-";
  if ((ObjetDate.getMonth()+1) < 10) newtableau[0][d] += "0";
  newtableau[0][d] += (ObjetDate.getMonth()+1)+"-";
  if (ObjetDate.getDate() < 10) newtableau[0][d] += "0";
  newtableau[0][d] += ObjetDate.getDate();
  expdate -= 24*3600*1000 //expires in 24 hours(milliseconds) 
  }

OK=0;

for (var y = 0; y < symboles.length; y++) {
Cours(symboles[y],y+1);}

setTimeout(ecr,10);

//Attend que toutes les requ�tes soit termin�es avant d'envoyer le fichier sur Google Documents
function ecr()
{
if (OK!=symboles.length)
{
GM_log ("\nEn attente... Récupéré " + OK + " valeur(s)");
setTimeout(ecr,10);
} else
{
GM_log ("\nRécupéré " + OK + " valeurs");
TabletoFile();
GM_log ('\n'+"Tableau construit");
GM_log ('\n'+ jointable);
csv= jointable;
SendtoGDocs();
}
}

//R�cup�ration des cours sur Boursorama au format semi-xml
function Cours(Code,Colonne) {
GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.boursorama.com/graphiques/data/data.phtml?symbole=" + Code + "&typeC=1&simple=1&typeCourbe=&startDate=&ac1271368500",
  onload: function(response) {if (response.status == 200) {Table(response.responseText,Colonne)}}
  })
}

//Transformation des cours au format xml en table
function Table(xml,col) {
xml=xml.replace(/\&/g,"And");
var xmlobject = (new DOMParser()).parseFromString(xml, "text/xml");

var data = xmlobject.getElementsByTagName('data')[1].childNodes[0].nodeValue;
var sicav= xmlobject.getElementsByTagName('title')[0].childNodes[0].nodeValue;

newtableau [col][0]=sicav

GM_log ('\nDésignation : ' + sicav + '\nColonne du symbole : '+col+' Nombres de symboles : '+symboles.length)+'\n';

// Rentre les valeurs sous forme d'une table temporaire
var value = data.split("\n");
for (var i = 0; i < value.length; i++) {
var tmp = value[i].split(";");
value[i] = new Array();
for (var j = 0; j < tmp.length; j++)
{value[i][j] = tmp[j];}
}

// Copie la table temporaire vers la table principale
for (var i = 0; i < value.length; i++) 
  {  
  for (var h = 1; h < 367; h++)
    {
    if (value[i][0]==newtableau[0][h])
      {
      newtableau[col][h]=value[i][2];
      }
    }
  }
OK++;
}

// Transforme la table principale en fichier
function TabletoFile()
{
for (var z = 0; z < newtableau[0].length; z++)
  {
  ligne="";splice=0;
  for (var y = 0; y < newtableau.length; y++)
    {
    if (newtableau[y][z]==undefined) {splice++}
    ligne +=  '\"'+newtableau[y][z] + '\"\,';
    }
    
    if (splice < symboles.length)
      {
      jointable += ligne;
      jointable = jointable.substring(0, jointable.length-1);
      jointable += '\n';
      }
  }
}


// login modified from http://userscripts.org/scripts/show/27673
// ajax modified from http://gdatatips.blogspot.com/2009/07/create-new-google-docs-spreadsheet-from.html
function SendtoGDocs()
{                   
var gauthURL = 'https://www.google.com/accounts/ClientLogin';    // using clientlogin method from google api
var gToken = '';     // where the string that lets us authenticate lives
var loginInfo = 'accountType=HOSTED_OR_GOOGLE&service=writely&source=bcc-to-gdocs-Francis-Schmidt';    // header stuff for xml
        
//These pieces form the xml that is sent to google docs
var atom = ["<?xml version='1.0' encoding='UTF-8'?>",
            '<entry xmlns="http://www.w3.org/2005/Atom">',
            '<category scheme="http://schemas.google.com/g/2005#kind"',
            ' term="http://schemas.google.com/docs/2007#spreadsheet"/>',
            '<title>'+ classname +'</title>',
            '</entry>'].join('');
             
var body = ['--END_OF_PART\r\n',
            'Content-Type: application/atom+xml;\r\n\r\n',
            atom, '\r\n',
            '--END_OF_PART\r\n',
            'Content-Type: text/csv\r\n\r\n',
            csv, '\r\n',
            '--END_OF_PART--\r\n'].join('');
           
//logininfo has the useremail and password added to the xml needed for authentication
loginInfo = loginInfo + '&Email=' + email;
loginInfo = loginInfo + '&Passwd=' + password;
     
GM_xmlhttpRequest({      // greasemonkey xml
  method: 'POST',
  url: gauthURL,
  headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded'},
  data: loginInfo,    // the authentication
  onload: function(responseDetails){
  
          if(responseDetails.status != 200) {alert('Whoa.  Did you log in? \n\n   Error: ' + responseDetails.status + ': ' + responseDetails.statusText);};  
          if (responseDetails.status == 200) {
                    tokenText = responseDetails.responseText;   // get the text
                    gToken = tokenText.match(/Auth=[a-z0-9_-]+/i);    // turn it into our token
                    
                    GM_xmlhttpRequest(
                      {
                      method: 'POST',
                      url: 'http://docs.google.com/feeds/documents/private/full',
                      headers: {'Authorization': 'GoogleLogin ' + gToken,
                                'Content-Type': 'multipart/related; boundary=END_OF_PART',
                                'Slug': classname+'.csv'},
                      
                      contentType: 'multipart/related; boundary=END_OF_PART',
                      data: body,  //the xml we made above, called body
                      dataType: 'xml',
                      onload: function(responseDetails)
                              { 
                              if (responseDetails.status == 201) {alert('Spreadsheet named ' + classname + '\n is now in ' + $("#name").val() + ' docs account')};
                              if(responseDetails.status != 201) {alert('Whoops! There was a problem \n\n   Error: ' + responseDetails.status + ': ' + responseDetails.statusText);};
                              }
                      });
                                              };
                                      }
                    });
};
