// ==UserScript==
// @name           Facepunch inofficial ratings
// @namespace      drdaxxy
// @description    Inofficial script to bring back the ratings from the last version of Facepunch Studios
// @include        http://forums.facepunchstudios.com/group.php?do=discuss*
// ==/UserScript==

// DO NOT USE YOUR FACEPUNCHSTUDIOS DATA FOR THE FOLLOWING

username = "insert_your_username_here";
password = "insert_your_password_here";

// DO NOT EDIT BEYOND THIS LINE UNTIL YOU KNOW WHAT YOU'RE DOING

var postnodesarray = document.getElementById("message_list").childNodes;
var postids = new Array();

for (var i = 0; i < postnodesarray.length; i++) {
if(postnodesarray[i].nodeType == 1 && postnodesarray[i].getAttribute("id").substr(0,11) == "gmessage_qe") {
postids[i] = postnodesarray[i].getAttribute("id").substr(11);
}
}

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

postids.clean(undefined);

var postids_httppost = postids.join(".");

  GM_xmlhttpRequest({
    method: "POST",
    url: "http://ratings.nox-networks.org/get_ratings.php",
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI("username="+username+"&password="+password+"&postids="+postids_httppost),
    onload: function(xhr) { getratingsresponse = xhr.responseText; process_ratings_response(); }
  });
  
function Rateit(rating, postid)
{
document.getElementById( 'rate_iframe_xss_hack' ).src = "http://ratings.nox-networks.org/rate.php?username="+username+"&password="+password+"&postid="+postid+"&rating="+rating;

document.getElementById("ratings"+postid).innerHTML="";
switch (rating) {
  case "agree":
    i2 = 1;
	agreet = ".gif";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
    break;
  case "thanks":
    i2 = 2;
	agreet = ".png";
	thankst = ".gif";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
    break;
  case "funny":
    i2 = 3;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".gif";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
    break;
  case "friendly":
	i2 = 4;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".gif";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "informative":
	i2 = 5;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".gif";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "goldstar":
	i2 = 6;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".gif";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "goodidea":
	i2 = 7;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".gif";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "useful":
	i2 = 8;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".gif";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "zing":
	i2 = 9;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".gif";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "winner":
	i2 = 10;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".gif";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "disagree":
	i2 = 11;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".gif";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "unfriendly":
	i2 = 12;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".gif";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "dumb":
	i2 = 13;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".gif";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "awfulspelling":
	i2 = 14;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".gif";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "artistic":
	i2 = 15;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".gif";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "luahelper":
	i2 = 16;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".gif";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "luaking":
	i2 = 17;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".gif";
	mappingkingt = ".png";
	break;
  case "mappingking":
	i2 = 18;
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".gif";
	break;
}


for(var i=0;i < ratingdetails.length;i++) {
if(ratingdetails[i][0] == postid) {
ratingdetails[i][i2] = parseInt(ratingdetails[i][i2]) + 1;
document.getElementById("ratings"+postid).innerHTML += "<img style='display:inline;' src='http://ratings.nox-networks.org/agree" + agreet + "' alt='Agree' id='agree" + ratingdetails[i][0] + "' />x" + ratingdetails[i][1] + "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/thanks" + thankst + "' alt='thanks' id='thanks" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][2]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/funny" + funnyt + "' alt='Funny' id='Funny" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][3] +"&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/friendly" + friendlyt + "' alt='friendly' id='friendly" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][4] +"&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/informative" + informativet + "' alt='informative' id='informative" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][5] +"&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/goldstar" + goldstart + "' alt='goldstar' id='goldstar" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][6] +"&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/goodidea" + goodideat + "' alt='goodidea' id='goodidea" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][7] +"&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/useful" + usefult + "' alt='useful' id='useful" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][8] +"&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/zing" + zingt + "' alt='zing' id='zing" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][9] +"&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/winner" + winnert + "' alt='winner' id='winner" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][10] +"&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/disagree" + disagreet + "' alt='disagree' id='disagree" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][11] +"&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/unfriendly" + unfriendlyt + "' alt='unfriendly' id='unfriendly" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][12] +"&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/dumb" + dumbt + "' alt='dumb' id='dumb" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][13] +"&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/awfulspelling" + awfulspellingt + "' alt='awfulspelling' id='awfulspelling" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][14] +"&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/artistic" + artistict + "' alt='artistic' id='artistic" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][15] +"&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/luahelper" + luahelpert + "' alt='luahelper' id='luahelper" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][16] +"&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/luaking" + luakingt + "' alt='luaking' id='luaking" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][17] +"&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/mappingking" + mappingkingt + "' alt='mapping' id='mappingking" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][18] +"";
}
}
}

function process_ratings_response() {
if(getratingsresponse.substr(0,4) == "NODB") alert ("Ratings script couldn't connect to database");
else if(getratingsresponse == "NOLOGIN") alert("There is no activated user with the supplied user details (Ratings)");
else {

body = document.getElementsByTagName('body')[0];
frame = document.createElement('iframe');
frame.id ='rate_iframe_xss_hack';
frame.setAttribute('class','rate_button' );
frame.setAttribute('width','0px' );
frame.setAttribute('height','0px' );
body.appendChild(frame);


postlines = getratingsresponse.split("\n");
ratingdetails = new Array();
for(var i=0;i < postlines.length;i++) {
ratingdetails[i] = postlines[i].split(".");
if(ratingdetails[i][19] == "none") {
document.getElementById("gmessage" + ratingdetails[i][0]).getElementsByTagName("div")[0].innerHTML += "<span style='margin-top:-15px;float:left;font-size:10px;' id='ratings" + ratingdetails[i][0] + "'><a id='lagree" + ratingdetails[i][0] + "' href='javascript:void();' ><img style='display:inline;' src='http://ratings.nox-networks.org/agree.png' alt='Agree' id='agree" + ratingdetails[i][0] + "' /></a>x" + ratingdetails[i][1]+ "&nbsp;&nbsp;<a id='lthanks" + ratingdetails[i][0] + "' href='javascript:void();' ><img style='display:inline;' src='http://ratings.nox-networks.org/thanks.png' alt='thanks' id='thanks" + ratingdetails[i][0] + "' /></a>x" + ratingdetails[i][2]+ "&nbsp;&nbsp;<a id='lfunny" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/funny.png' alt='Funny' id='funny" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][3]+ "&nbsp;&nbsp;<a id='lfriendly" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/friendly.png' alt='friendly' id='friendly" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][4]+ "&nbsp;&nbsp;<a id='linformative" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/informative.png' alt='informative' id='informative" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][5]+ "&nbsp;&nbsp;<a id='lgoldstar" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/goldstar.png' alt='goldstar' id='goldstar" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][6]+ "&nbsp;&nbsp;<a id='lgoodidea" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/goodidea.png' alt='goodidea' id='goodidea" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][7]+ "&nbsp;&nbsp;<a id='luseful" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/useful.png' alt='useful' id='useful" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][8]+ "&nbsp;&nbsp;<a id='lzing" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/zing.png' alt='zing' id='zing" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][9]+ "&nbsp;&nbsp;<a id='lwinner" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/winner.png' alt='winner' id='winner" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][10]+ "&nbsp;&nbsp;<a id='ldisagree" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/disagree.png' alt='disagree' id='disagree" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][11]+ "&nbsp;&nbsp;<a id='lunfriendly" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/unfriendly.png' alt='unfriendly' id='unfriendly" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][12]+ "&nbsp;&nbsp;<a id='ldumb" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/dumb.png' alt='dumb' id='dumb" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][13]+ "&nbsp;&nbsp;<a id='lawfulspelling" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/awfulspelling.png' alt='awfulspelling' id='awfulspelling" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][14]+ "&nbsp;&nbsp;<a id='lartistic" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/artistic.png' alt='artistic' id='artistic" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][15]+ "&nbsp;&nbsp;<a id='lluahelper" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/luahelper.png' alt='luahelper' id='luahelper" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][16]+ "&nbsp;&nbsp;<a id='lluaking" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/luaking.png' alt='luaking' id='luaking" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][17]+ "&nbsp;&nbsp;<a id='lmappingking" + ratingdetails[i][0] + "' href='javascript:void();'><img style='display:inline;' src='http://ratings.nox-networks.org/mappingking.png' alt='mappingking' id='mappingking" + ratingdetails[i][0] + "' /></a>&nbsp;x" + ratingdetails[i][18]+ "</span>";
eval('document.getElementById("lagree"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("agree",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("lthanks"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("thanks",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("lfunny"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("funny",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("lfriendly"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("friendly",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("linformative"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("informative",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("lgoldstar"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("goldstar",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("lgoodidea"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("goodidea",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("luseful"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("useful",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("lzing"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("zing",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("lwinner"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("winner",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("ldisagree"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("disagree",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("lunfriendly"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("unfriendly",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("ldumb"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("dumb",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("lawfulspelling"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("awfulspelling",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("lartistic"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("artistic",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("lluahelper"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("luahelper",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("lluaking"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("luaking",ratingdetails['+i+'][0]);},false);');
eval('document.getElementById("lmappingking"+ratingdetails[i][0]).addEventListener("click",function () {Rateit("mappingking",ratingdetails['+i+'][0]);},false);');
}
else {
switch (ratingdetails[i][19]) {
  case "agree":
	agreet = ".gif";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
    break;
  case "thanks":
	agreet = ".png";
	thankst = ".gif";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
    break;
  case "funny":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".gif";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
    break;
  case "friendly":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".gif";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "informative":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".gif";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "goldstar":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".gif";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "goodidea":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".gif";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "useful":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".gif";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "zing":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".gif";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "winner":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".gif";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "disagree":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".gif";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "unfriendly":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".gif";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "dumb":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".gif";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "awfulspelling":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".gif";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "artistic":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".gif";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "luahelper":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".gif";
	luakingt = ".png";
	mappingkingt = ".png";
	break;
  case "luaking":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".gif";
	mappingkingt = ".png";
	break;
  case "mappingking":
	agreet = ".png";
	thankst = ".png";
	funnyt = ".png";
	friendlyt = ".png";
	informativet = ".png";
	goldstart = ".png";
	goodideat = ".png";
	usefult = ".png";
	zingt = ".png";
	winnert = ".png";
	disagreet = ".png";
	unfriendlyt = ".png";
	dumbt = ".png";
	awfulspellingt = ".png";
	artistict = ".png";
	luahelpert = ".png";
	luakingt = ".png";
	mappingkingt = ".gif";
	break;
}
document.getElementById("gmessage" + ratingdetails[i][0]).getElementsByTagName("div")[0].innerHTML += "<span style='margin-top:-15px;float:left;font-size:10px;' id='ratings" + ratingdetails[i][0] + "'><img style='display:inline;' src='http://ratings.nox-networks.org/agree" + agreet + "' alt='Agree' id='agree" + ratingdetails[i][0] + "' />x" + ratingdetails[i][1] + "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/thanks" + thankst + "' alt='thanks' id='thanks" + ratingdetails[i][0] + "' />x" + ratingdetails[i][2] + "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/funny" + funnyt + "' alt='Funny' id='Funny" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][3]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/friendly" + friendlyt + "' alt='friendly' id='friendly" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][4]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/informative" + informativet + "' alt='informative' id='informative" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][5]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/goldstar" + goldstart + "' alt='goldstar' id='goldstar" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][6]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/goodidea" + goodideat + "' alt='goodidea' id='goodidea" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][7]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/useful" + usefult + "' alt='useful' id='useful" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][8]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/zing" + zingt + "' alt='zing' id='zing" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][9]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/winner" + winnert + "' alt='winner' id='winner" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][10]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/disagree" + disagreet + "' alt='disagree' id='disagree" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][11]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/unfriendly" + unfriendlyt + "' alt='unfriendly' id='unfriendly" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][12]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/dumb" + dumbt + "' alt='dumb' id='dumb" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][13]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/awfulspelling" + awfulspellingt + "' alt='awfulspelling' id='awfulspelling" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][14]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/artistic" + artistict + "' alt='artistic' id='artistic" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][15]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/luahelper" + luahelpert + "' alt='luahelper' id='luahelper" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][16]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/luaking" + luakingt + "' alt='luaking' id='luaking" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][17]+ "&nbsp;&nbsp;<img style='display:inline;' src='http://ratings.nox-networks.org/mappingking" + mappingkingt + "' alt='mappingking' id='mappingking" + ratingdetails[i][0] + "' />&nbsp;x" + ratingdetails[i][18]+ "</span>";
}
}
}
}