// ==UserScript==
// @name       Jvcauto
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.pokebip.com/pokemon/index.php?phppage=membres/blogs/affichage-article&art=227058
// @copyright  2012+, You
// ==/UserScript==
//var params = prompt('params?')
var xhr = null;

// Fonction de creation de l'objet XMLHttpRequest qui resservira pour chaques fonctions AJAX
function getXhr()
{
    if(window.XMLHttpRequest) xhr = new XMLHttpRequest(); 
    else if(window.ActiveXObject)
    {  
        try
        {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    else 
    { 
        alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest, veuillez le mettre à jour"); 
        xhr = false; 
    } 
}
var sent = 0;
/*
if(location.href == 'http://www.pokebip.com/pokemon/index.php?phppage=membres/blogs/affichage-article&art=227058')
{
for(i=0;i<10000;i++)
{
getXhr();
xhr.onreadystatechange = function()
{
if(xhr.readyState == 4 && xhr.status == 200)
{
sent++;
}
}
xhr.open("POST",'index.php?phppage=membres/blogs/sauvegarde-commentaire',true);
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
xhr.send('art_id=227058&cmts_texte=floodz');
}
}
*/
for(i=0;i<1000;i++)
{
    getXhr();
    xhr.onreadystatechange = function()
        {
            if(xhr.readyState == 4 && xhr.status == 200)
            {
                sent++;
            }
        }
        xhr.open("POST",'index.php?phppage=membres/blogs/sauvegarde-commentaire',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send('art_id=227058&cmts_texte=floodz');
}