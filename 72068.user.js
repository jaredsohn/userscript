// ==UserScript==
// @name           Profile Stats
// @namespace      www.bungie.net
// @include        http://www.bungie.net/Account/Profile.asp*
// @author         ApocalypeX
// @author         robby118
// @version        1.7
// ==/UserScript==
function getPostAmount(string,forum){
eval("var pattern=/("+forum+")/g;");
var count = string.match(pattern);
if(count == 0){
return 0.04;
}
else{
return (count.length+1)/25;
}
}

var sparkline = document.createElement('script');
sparkline.type = 'text/javascript';
sparkline.src = '/javascript/jquery.sparkline.js';
document.getElementsByTagName('head').item(0).appendChild(sparkline);
var $ = unsafeWindow.$telerik.$;

GM_addStyle(".statboxes{list-style-type:none;} .bpro.littleright div.sContent div.infopopup { margin-top: 0; } #outboxPPD{padding: 1px 1px 1px 1px; border-style:inset;border-width:1px; width:300px;height:20px;}  a.xbl_btn { display: block; height: 24px; width: 150px; background: transparent url(http://apx.comlu.com/uploads/greenbutton-left.gif) no-repeat left top; padding-left: 10px; line-height: 24px; color: #00FF00;} a.xbl_btn span { display: block; height: 24px; width: auto; background: transparent url(http://apx.comlu.com/uploads/greenbutton-right.gif) no-repeat right top; padding-right: 20px; cursor:pointer; } a.xbl_btn:hover { color: #00FF00; text-decoration: none; background-position: left bottom; } a.xbl_btn:hover span { background-position: right bottom;} .pie { margin-left: 60px; } div.pie a { background: url(/images/base_struct_images/linkBt/helpicon.gif) no-repeat; display: block; height: 22px; margin-top: 4px; width: 30px; position: absolute; } div.pie a:hover { background-position: left bottom; } div#forum_key { width: 123px; height: 123px; margin-top: 30px; display: none; } div#forum_key ul li { font-size: 27px; float: none; } div#forum_key ul li span { color: #bbb; font-size: 12px; }");

//Adds stats link
var profile_links = document.getElementsByClassName('rtsUL').item(1);
profile_links.innerHTML += '<li class="rtsLI"><a class="rtsLink" id="Profile_stats"><span class="rtsOut"><span class="rtsIn"><span class="rtsTxt">Stats</span></span></span></a></li>';
var stat_link = document.getElementById('Profile_stats');


if(document.URL.search("page") >-1 || document.URL.search("msg") >-1 || document.URL.search("/Forums/MyTopics.aspx") >-1){
	var links = document.getElementsByClassName('rtsLevel2').item(0);
	var overview = links.getElementsByTagName('a').item(0).href;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET",overview,false);
	xmlhttp.send(null);
	var doc = document.implementation.createDocument ("", "", null);
	var html = document.createElement ("html");
	html.innerHTML = xmlhttp.responseText;
	doc.appendChild (html);
//Account Age
	doc.getElementById('ctl00_mainContent_lblMemberSince2').innerHTML = doc.getElementById('ctl00_mainContent_lblMemberSince2').innerHTML.replace("." ,"/"); doc.getElementById('ctl00_mainContent_lblMemberSince2').innerHTML = doc.getElementById('ctl00_mainContent_lblMemberSince2').innerHTML.replace("." ,"/");
	var date1 = new Date(doc.getElementById('ctl00_mainContent_lblMemberSince2').lastChild.data);
  	var date2 = new Date();
  	date2day=date2.getDate();
  	date2month=date2.getMonth()+1;
  	date2year=date2.getFullYear();
  	date2= new Date(date2month +"/"+ date2day +"/"+ date2year);
  	var daysApart = Math.abs(Math.round((date2-date1)/86400000));
//XBL info
	var gt = doc.getElementById('ctl00_mainContent_header_gamertagLinkFloat');
if(gt==null){
gt="null";
}
}

else{
//Account Age
	document.getElementById('ctl00_mainContent_lblMemberSince2').innerHTML = document.getElementById('ctl00_mainContent_lblMemberSince2').innerHTML.replace("." ,"/"); document.getElementById('ctl00_mainContent_lblMemberSince2').innerHTML = document.getElementById('ctl00_mainContent_lblMemberSince2').innerHTML.replace("." ,"/");
	var date1 = new Date(document.getElementById('ctl00_mainContent_lblMemberSince2').lastChild.data);
  	var date2 = new Date();
  	date2day=date2.getDate();
  	date2month=date2.getMonth()+1;
  	date2year=date2.getFullYear();
  	date2= new Date(date2month +"/"+ date2day +"/"+ date2year);
  	var daysApart = Math.abs(Math.round((date2-date1)/86400000));

//XBL info
	var gt = document.getElementById('ctl00_mainContent_header_gamertagLinkFloat')
if(gt==null){
gt="null";
}
}

function Select_stats(){
	profile_links.innerHTML = profile_links.innerHTML.replace("rtsSelected", "");
	stat_link.class = "rtsSelected";
	var content_box = document.getElementsByClassName('content_matte').item(0);
	content_box.innerHTML = '<ul class="statboxes"><li><div class="boxD_outer"><div class="boxD_inner"><div class="boxD" style="width: 600px; padding-bottom:50px;">'+
'<h3>Profile Statistics </h3><div style="margin: 10px 5px 5px 15px;">'+
'<ul><li style="background: url(http://www.bungie.net/images/base_struct_images/forums/IconBungie.gif) no-repeat scroll left center; padding-left: 40px; margin-left: 12px;padding-bottom:10px;padding-top:5px;">Account Age: <span id="ctl00_mainContent_lblDaysApart">'+daysApart+' Days</span></li>'+
'<li style="margin-top: 39px; font-size: 14px; margin-left: -167px;"><strong>PPD:</strong></li><li style="margin-top: 35px; margin-left: -125px;"><div id="outboxPPD"><div align="center" id="PPD">\[...LOADING...\]</div></div></li><li><div class="pie"></div></li></ul></div></div></div></div></li>'+
'<li><div style="background: #0E0F10 url(/images/base_struct_images/contentBg/boxD-back.jpg) repeat-x scroll center bottom; border: 1px solid #666666; float: left;"><div class="boxD_inner"><div class="boxD" style="width: 230px;"><h3>Xbox Live Info <a style="padding-left:70px;color: #00FF00;"id="addFriend" href="javascript: void(0);">Add Friend</a></h3><div style="margin: 10px 5px 5px 15px; height: 220px;"><span style="font-size: 15px; padding-left: 5px; font-weight: normal;">Gamertag:</span> <a href="http://live.xbox.com/en-US/profile/profile.aspx?GamerTag='+gt.textContent+'">'+gt.textContent+'</a><br/><br/><iframe src="http://gamercard.xbox.com/'+gt.textContent+'.card" style="border: 0; width: 204px; height: 140px;" scrolling="no"></iframe><br/><br/><a class="xbl_btn" href="http://live.xbox.com/en-US/profile/MessageCenter/SendMessage.aspx?gt='+gt.textContent+'"><span>Send XBL Message</span></a><br/>'+
'</div></div></div></div></div></li></ul>';

	var t = 0;
	if(gt){
	var addfriendbutton = document.getElementById('addFriend');
	addfriendbutton.addEventListener("click", sendFR, true);
if(gt=="null"){
document.getElementsByClassName('boxD').item(1).innerHTML = "<h3>This user has not linked their Gamertag </h3>";
}
}

//PPD

var UserName = document.getElementById('ctl00_mainContent_header_lblUsername').innerHTML;
GM_xmlhttpRequest({
    method: "get",
    url: "http://www.bungie.net/Search/default.aspx?q=" + UserName + "&g=5&SR-p=12",
    onload: function(response)
    {
       var NowDate = new Date().getTime();
     
   var PastDate = response.responseText.match(/[0-9]+\/[0-9]+\/[0-9]+/g); 
if (PastDate == null) return; 
PastDate = new Date(PastDate.pop()).getTime();


        var DayCount = Math.ceil((NowDate - PastDate) / 864e5);
        
var PostCount = +response.responseText.match(/([0-9]+) results/)[1];

var AveragePostCount = Math.round(PostCount / DayCount * 100) / 100;

var meter = Math.round((AveragePostCount/40)*100);
document.getElementById('PPD').innerHTML = "<span>"+AveragePostCount+"</span>";
GM_addStyle("#PPD{width:"+meter+"%;height:20px; background-color:#004F2C;} #PPD span {line-height: 20px;}");


$('.pie').sparkline([getPostAmount(response.responseText,'Bungie.net Community'),getPostAmount(response.responseText,'Halo 3 Forum'),getPostAmount(response.responseText,'Halo 3: ODST Forum'),getPostAmount(response.responseText,'Halo: Reach Forum'),getPostAmount(response.responseText,'Off Topic: The Flood'),getPostAmount(response.responseText,'Optimatch'), getPostAmount(response.responseText,'Bungie Universe')], { type: 'pie', sliceColors: ['#71CAEF', '#3583ED', '#173457', '#E6890f', '#2CAA13', '#6E6BFF', '#613D80'], height: '135px', width: '135px', offset: '-180' });
$('.pie').append('<a href="javascript: void(0);"></a><div id="forum_key"><ul style="list-style-type: square;"><li style="color: #613D80;"><span>Bungie Universe</span></li><li style="color: #71CAEF;"><span>Community</span></li><li style="color: #2CAA13;"><span>The Flood</span></li><li style="color: #3583ED;"><span>Halo 3</span></li><li style="color: #173457;"><span>Halo 3: ODST</span></li><li style="color: #E6890f;"><span>Halo: Reach</span></li><li style="color: #6E6BFF;"><span>Optimatch</span></li></ul></div>');
$(".pie a").hover(function(e) {
$("#forum_key").show();
}, function(e) {
$("#forum_key").hide();
});

    }
});

$(document).ready(function() {
$('.pie').sparkline([.52,.52,.52,.52,.52,.52, .52], { type: 'pie', sliceColors: ['#71CAEF', '#3583ED', '#173457', '#E6890f', '#2CAA13', '#6E6BFF', '#613D80'], height: '135px', width: '135px', offset: '-180' });
});



            
function sendFR(){
	if(t<1){
	var requesthref = "http://live.xbox.com/en-GB/profile/FriendsMgmt.aspx?ru=%252fen-GB%252fprofile%252fprofile.aspx%253fpp%253d0%2526GamerTag%253d"+gt.textContent+"&gt="+gt.textContent+"&act=Add"
  GM_xmlhttpRequest({
	method: "get",
    	url: requesthref,
    	onload: function(response)
    {
        var confirmation = response.responseText;

	if(confirmation.search("You have added") > -1){
	alert("You have successfully added "+gt.textContent+"!")
    }
	else{
	alert("Your request was unsuccessful. Your friends list may be full or "+gt.textContent+"\'s friends list is full. Also be sure you are signed in on xbox.com.")
    }
  }
  	});
}
	else{
	alert("Please wait...You have already tried adding "+gt.textContent+"!");
	}
	t++
	}

	}
	stat_link.addEventListener("click", Select_stats, true);
//wub &apx