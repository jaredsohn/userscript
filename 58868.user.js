// ==UserScript==
// @name           Newgrounds: TomFulp User
// @namespace      iamgrimreaper
// @description    Changes any instance of "TomFulp" in a page to the set variable "user". Feel free to change it.
// @include        *newgrounds.com*
// ==/UserScript==

user = "iamgrimreaper";

dbody = document.body.innerHTML;

while(dbody.indexOf("TomFulp") > -1){
if(dbody.indexOf("TomFulp")){
where = dbody.indexOf("TomFulp");
document.body.innerHTML = dbody.substring(0, where) + user + dbody.substring(where + 7);
}
}

while(dbody.indexOf("tomfulp") > -1){
if(dbody.indexOf("tomfulp")){
where = dbody.indexOf("tomfulp");
document.body.innerHTML = dbody.substring(0, where) + user + dbody.substring(where + 7);
}
}