// ==UserScript==
// @name s/word/fail/g
// @version 2.0.0
// @description Replaces certain words with others to make your browsing experience more entertaining! :D
// @description NOW WEBSITE SPECIFIC!
// @Credit All credit goes to http://userscripts.org/users/stuart
// @match http://www.reddit.com/*
// @match https://www.reddit.com/*
// @updateURL http://userscripts.org/scripts/source/128782.meta.js
// @downloadURL http://userscripts.org/scripts/source/128782.user.js
// ==/UserScript==

function Universal1(str) {
  return str.replace(/failbook/g,"failbook")
    .replace(/Facebook/g,"Failbook")
    .replace(/FACEBOOK/g,"FAILBOOK")
    .replace(/f[Aa][Cc][Ee][Bb][Oo][Oo][Kk]/g,"failbook")
    .replace(/F[Aa][Cc][Ee][Bb][Oo][Oo][Kk]/g,"Failbook")
}
function Universal2(str){
  return str.replace(/god/g,"wizard")
    .replace(/God/g,"Wizard")
    .replace(/GOD/g,"WIZARD")
    .replace(/g[Oo][Dd]/g,"wizard")
    .replace(/G[Oo][Dd]/g,"Wizard")
   
}
function Universal3(str){
  return str.replace(/christian/g,"human")
    .replace(/Christian/g,"Human")
    .replace(/CHRISTIAN/g,"HUMAN")
    .replace(/c[Hh][Rr][Ii][Ss][Tt][Ii][Aa][Nn]/g,"human")
    .replace(/C[Hh][Rr][Ii][Ss][Tt][Ii][Aa][Nn]/g,"Human")
   
}
function Universal4(str){
  return str.replace(/jesus/g,"craig")
    .replace(/Jesus/g,"Craig")
    .replace(/JESUS/g,"CRAIG")
    .replace(/j[Ee][Ss][Uu][Ss]/g,"craig")
    .replace(/J[Ee][Ss][Uu][Ss]/g,"Craig")
   
}
function Universal5(str){
  return str.replace(/hell/g,"detroit")
    .replace(/Hell/g,"Detroit")
    .replace(/HELL/g,"DETROIT")
    .replace(/h[Ee][Ll][Ll]/g,"detroit")
    .replace(/H[Ee][Ll][Ll]/g,"Detroit")
   
}
function Universal6(str){
  return str.replace(/heaven/g,"cloud city")
    .replace(/Heaven/g,"Cloud City")
    .replace(/HEAVEN/g,"CLOUD CITY")
    .replace(/h[Ee][Aa][Vv][Ee][Nn]/g,"cloud city")
    .replace(/H[Ee][Aa][Vv][Ee][Nn]/g,"Cloud City")
}
function Universal7(str){
  return str.replace(/mormon/g,"crazy")
    .replace(/Mormon/g,"Crazy")
    .replace(/MORMON/g,"CRAZY")
    .replace(/m[Oo][Rr][Mm][Oo][Nn]/g,"crazy")
    .replace(/M[Oo][Rr][Mm][Oo][Nn]/g,"Crazy")
}
function lolreddit(str){
  return str.replace(/redditor/g,"idiot")
    .replace(/Redditor/g,"Idiot")
    .replace(/REDDITOR/g,"IDIOT")
    .replace(/r[Ee][Dd][Dd][Ii][Tt][Oo][Rr]/g,"idiot")
    .replace(/R[Ee][Dd][Dd][Ii][Tt][Oo][Rr]/g,"Idiot")
}

function replaceTextContent(node) {
  var length, childNodes
  if (node.nodeType == Node.TEXT_NODE) {
    node.textContent = Universal1(node.textContent)
    node.textContent = Universal2(node.textContent)
    node.textContent = Universal3(node.textContent)
    node.textContent = Universal4(node.textContent)
    node.textContent = Universal5(node.textContent)
    node.textContent = Universal6(node.textContent)
    node.textContent = Universal7(node.textContent)
    node.textContent = lolreddit(node.textContent)
  } else {
    childNodes = node.childNodes
    length = childNodes.length
    for(var i=0; i<length; ++i){
      replaceTextContent(childNodes[i])
    }
  }
}

replaceTextContent(document.body)
document.title = Universal1(document.title)
document.title = Universal2(document.title)
document.title = Universal3(document.title)
document.title = Universal4(document.title)
document.title = Universal5(document.title)
document.title = Universal6(document.title)
document.title = Universal7(document.title)
document.title = lolreddit(document.title)