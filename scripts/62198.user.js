// ==UserScript==
// @name          TLDR
// @namespace     Kafke
// @description   Summarizes long texts, Adds a TLDR to the end
// @include       *
// @exclude       *.google.*
// @exclude      *.yahoo.*
// @exclude      *.search.*
// ==/UserScript==

var remtags = 0;    //Remove tags
var iscenter = "0";    //Center TLDR
var fsize = 2;         //Font size of TLDR tag
var fcolor = "red"; //Font Color of TLDR tag
var reslength = 300; //Size required for a TLDR
var percent = .2; //Percent of Text
var TLDR = "TL;DR</font><table bgcolor=#eeeeee>"; //TLDR Start Message
var ENDTLDR = "</table>END TL;DR"; //TLDR End Message

ar = new Array();
ar.push("p", "td"); //Tags to include

var URL = "http://kafke.110mb.com/summ.php";    //URL to Summarizer


var response = "";
var block = new Array();
addtldr(ar);


function get(url, cb, num) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText, num); }
  });
}


function StripTags(strMod){
    if(arguments.length<3) strMod=strMod.replace(/<\/?(?!\!)[^>]*>/gi, '');
    else{
        var IsAllowed=arguments[1];
        var Specified=eval("["+arguments[2]+"]");
        if(IsAllowed){
            var strRegExp='</?(?!(' + Specified.join('|') + '))\b[^>]*>';
            strMod=strMod.replace(new RegExp(strRegExp, 'gi'), '');
        }else{
            var strRegExp='</?(' + Specified.join('|') + ')\b[^>]*>';
            strMod=strMod.replace(new RegExp(strRegExp, 'gi'), '');
        }
    }
    return strMod;
}



function post(text, num)
{
response = text;

if(remtags == 1)
{
response = response.replace(/<br>/g, ".");

response = StripTags(response);
}
response = response.replace(/\\/g, "");


if(response.length >= reslength)
{
block[num].innerHTML += "<font size="+fsize+" color="+fcolor+"><br><br><br><b>"+TLDR+"</b></font>" + response + "<font size="+fsize+" color="+fcolor+"><br><b>"+ENDTLDR+"</b><br></font>";
if(iscenter == "1")
{
block[num].innerHTML = "<center>"+block[num].innerHTML+"</center>";
}
}

}


function addtldr(tags)
{

for(i=0; i<tags.length; i+=1)
{
tag = tags[i];
tlist = document.getElementsByTagName(tag);
for(j=0; j<tlist.length; j+=1)
{
block.push(tlist.item(j));
}
}

for(var a=0; a<block.length; a+=1)
{
tURL = (URL + "?percent="+percent+"&text="+ block[a].innerHTML);
get(tURL, post, a);
}

}