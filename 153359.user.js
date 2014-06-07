// ==UserScript==
// @name       mangafox ads removal
// @version    0.07
// @description  this script use simple and generic methods to clean up mangafox pages
// @match      *mangafox*
// ==/UserScript==

/*original code
var mgf_ad_r_ce=0;
function mgf_ad_r_main(){
//block until jQuery loaded
if(typeof $ === "undefined")setTimeout("mgf_ad_r_main();", 40);
else{
$("[id*=\"MarketGid\"], iframe").remove();
$("div:has(script:contains(google)), div:has(table:has([href*=\"mgid\"]))"+
", table").not(":has(#viewer), #viewer, :has([id*=\"chapter\"])"+
", :contains(\"Chapter Navig\"), :has(#tip), #tip"
).css("display", "none");
mgf_ad_r_ce++;
if(mgf_ad_r_ce<10)setTimeout("mgf_ad_r_main();", 500);
}
}
mgf_ad_r_main();
*/

var mgf_ad_r_injector=document.createElement("script");
mgf_ad_r_injector.setAttribute("type", "text/javascript");
mgf_ad_r_injector.textContent=
"\nvar mgf_ad_r_ce=0;\nfunction mgf_ad_r_main(){\n//block until jQuery loaded\nif(typeof $ === \"undefined\")setTimeout(\"mgf_ad_r_main();\", 40);\nelse{\n$(\"[id*=\\\"MarketGid\\\"], iframe\").remove();\n$(\"div:has(script:contains(google)), div:has(table:has([href*=\\\"mgid\\\"]))\"+\n\", table\").not(\":has(#viewer), #viewer, :has([id*=\\\"chapter\\\"])\"+\n\", :contains(\\\"Chapter Navig\\\"), :has(#tip), #tip\"\n).css(\"display\", \"none\");\nmgf_ad_r_ce++;\nif(mgf_ad_r_ce<10)setTimeout(\"mgf_ad_r_main();\", 500);\n}\n}\nmgf_ad_r_main();\n";
//code was compiled by http://coffeescript.org/ for injection purpose
if(/\/\/(?:[0-9a-z]+\.)?mangafox\.[0-9a-z]+\//i.test(document.location.href)) //fine-grained domain test
if(!!document.getElementById("viewer")) //load only on manga pages
document.getElementsByTagName("head")[0].appendChild(mgf_ad_r_injector);
