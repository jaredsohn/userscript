// ==UserScript==
// @name           TFL Jouney Planner - stop session timeout
// @namespace      http://userscripts.org/users/lorriman
// @description    Stops the infuriating and unnecessary  "Session has timed-out" message.
// @include        http://journeyplanner.tfl.gov.uk/user/XSLT_TRIP_REQUEST2*
// @match        http://journeyplanner.tfl.gov.uk/user/XSLT_TRIP_REQUEST2*
// @version .1a
// ==/UserScript==

function setup(){
window.setTimeout(fetchpage,60000);
}

//new_journey=document.getElementById('new-journey');
//href=new_journey.getElementsByTagName('a')[0].getAttribute('href');
try{
href='http:\/\/journeyplanner.tfl.gov.uk\/user\/XSLT_TRIP_REQUEST2?language=en';
}catch(err){
alert(err.message)
}
window.fetchpage = function(){
 
GM_xmlhttpRequest({
method: 'get',
url: href,
onload:function(){ setup();}
});
}
setup();