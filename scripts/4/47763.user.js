// ==UserScript==
// @name           Zombie Plague
// @namespace      http://www.ballpointbanana.com
// @description    Turns any mention of swine flu into a tale of the living dead.
// @exclude        http://userscripts.org/*
// ==/UserScript==

var bodytext;
var stufftoreplace = [/swine[\._\s]*flu/ig,
                      /swine[\._\s]*influenza/ig,
                      /influenza/ig,
                      /\bflu\b/ig,
                      /victim/ig,
                      /sufferer/ig,
                      /pig/ig,
                      /swine/ig,
                      ];
var replacements =  ["zombie plague",
                     "zombie plague", 
                     "walking death", 
                     "plague", 
                     "walking corpse", 
                     "shambling horror", 
                     "undead creature",
                     "voodoo",
                     ];
var taglist = ["body"];

function returnCase(c)
{
  var charcode = c.charCodeAt(0);
  var charcase = 0; //0 = not a character, 1 = uppercase, -1 = lowercase
  if (charcode >= 65 && charcode <= 90) {charcase = 1}
  else if (charcode >= 97 && charcode <= 122) {charcase = -1}
  return charcase;
} 

function replaceWithMatchedCase(inputstr, matchstr, replstr)
{
  var matches = inputstr.match(matchstr);
  if (matches == null) {return inputstr};
  for (var i = 0;i < matches.length;i++)
  {
    var this_match = matches[i];
    var matchcase = returnCase(this_match[0]);
    var replcase = returnCase(replstr[0]);
    
    //if (returnCase(this_match[this_match.length-1]) == 1) {replstr = replstr.toUpperCase()}
    if (matchcase > replcase) {replstr = replstr[0].toUpperCase() + replstr.slice(1)}
    else if (matchcase < replcase) {replstr = replstr[0].toLowerCase() + replstr.slice(1)}
    inputstr = inputstr.replace(this_match, replstr);
  }
  return inputstr;
}

for (var k = 0;k <= taglist.length;k++)
{  
  bodytext = document.getElementsByTagName(taglist[k]);
    
  for (var i = 0;i < bodytext.length; i++)
  {
    for (var j = 0;j <= stufftoreplace.length;j++)
    {
      bodytext[i].innerHTML = replaceWithMatchedCase(bodytext[i].innerHTML, stufftoreplace[j], replacements[j]);
      document.title = replaceWithMatchedCase(document.title, stufftoreplace[j], replacements[j]);
    }
  }
}