// ==UserScript==
// @name           Profile Stats
// @namespace      www.bungie.net
// @include        http://www.bungie.net/Account/Profile.asp*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js

// @require       http://central.gsmcms.com/js/jquery/jquery.flydom-3.1.1.js


// ==/UserScript==

/*//Adds stats link
var profile_links = document.getElementsByClassName('rtsUL').item(1);
profile_links.innerHTML += '<li class="rtsLI"><a class="rtsLink" id="Profile_stats"><span class="rtsOut"><span class="rtsIn"><span class="rtsTxt">Stats</span></span></span></a></li>';
var stat_link = document.getElementById('Profile_stats');


if(document.URL.search("page") >-1 || document.URL.search("msg") >-1){
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
	var gt = doc.getElementById('ctl00_mainContent_header_gamertagLinkFloat').textContent;
	GM_addStyle(".statboxes{list-style-type:none;} .bpro.littleright .bpro.box { margin-top: 274px; } div.sContent div.infopopup { margin-top: 0; } a.xbl_btn { display: block; height: 24px; width: 150px; background: transparent url(http://apx.comlu.com/uploads/greenbutton-left.gif) no-repeat left top; padding-left: 10px; line-height: 24px; color: #00FF00;} a.xbl_btn span { display: block; height: 24px; width: auto; background: transparent url(http://apx.comlu.com/uploads/greenbutton-right.gif) no-repeat right top; padding-right: 20px; cursor:pointer; } a.xbl_btn:hover { color: #00FF00; text-decoration: none; background-position: left bottom; } a.xbl_btn:hover span { background-position: right bottom;}");



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
	var gt = document.getElementById('ctl00_mainContent_header_gamertagLinkFloat').textContent;
	GM_addStyle(".statboxes{list-style-type:none;} .bpro.littleright .bpro.box { margin-top: 274px; } div.sContent div.infopopup { margin-top: 0; } a.xbl_btn { display: block; height: 24px; width: 150px; background: transparent url(http://apx.comlu.com/uploads/greenbutton-left.gif) no-repeat left top; padding-left: 10px; line-height: 24px; color: #00FF00;} a.xbl_btn span { display: block; height: 24px; width: auto; background: transparent url(http://apx.comlu.com/uploads/greenbutton-right.gif) no-repeat right top; padding-right: 20px; cursor:pointer; } a.xbl_btn:hover { color: #00FF00; text-decoration: none; background-position: left bottom; } a.xbl_btn:hover span { background-position: right bottom;}");


}





function Select_stats(){
	profile_links.innerHTML = profile_links.innerHTML.replace("rtsSelected", "");
	stat_link.class = "rtsSelected";
	var content_box = document.getElementsByClassName('content_matte').item(0);
	content_box.innerHTML = '<ul class="statboxes"><li><div class="boxD_outer"><div class="boxD_inner"><div class="boxD" style="width: 600px; padding-bottom:50px;">'+
'<h3>Profile Statistics </h3><div style="margin: 10px 5px 5px 15px;">'+
'<ul><li style="background: url(http://www.bungie.net/images/base_struct_images/forums/IconBungie.gif) no-repeat scroll left center; padding-left: 40px; margin-left: 12px;padding-bottom:10px;padding-top:5px;">Account Age: <span id="ctl00_mainContent_lblDaysApart">'+daysApart+' Days</span></li>'+
'<li style="margin-top: 39px; font-size: 14px; margin-left: -167px;"><strong>PPD:</strong></li><li style="margin-top: 35px; margin-left: -125px;"><div id="outboxPPD"><div align="center" id="PPD"></div></div></li></ul></div></div></div></div></li>'+
'<li><div style="background: #0E0F10 url(/images/base_struct_images/contentBg/boxD-back.jpg) repeat-x scroll center bottom; border: 1px solid #666666; float: left;"><div class="boxD_inner"><div class="boxD" style="width: 230px;"><h3>Xbox Live Info <a style="padding-left:70px;color: #00FF00;"id="addFRIEND" href="#">Add Friend</a></h3><div style="margin: 10px 5px 5px 15px; height: 220px;"><span style="font-size: 15px; padding-left: 5px; font-weight: normal;">Gamertag:</span> <a href="http://live.xbox.com/en-US/profile/profile.aspx?GamerTag='+gt+'">'+gt+'</a><br/><br/><iframe src="http://gamercard.xbox.com/'+gt+'.card" style="border: 0; width: 204px; height: 140px;" scrolling="no"></iframe><br/><br/><a class="xbl_btn" href="http://live.xbox.com/en-US/profile/MessageCenter/SendMessage.aspx?gt='+gt+'"><span>Send XBL Message</span></a><br/>'+
'</div></div></div></div></div></li></ul>';


	var t = 0;
	var xblgtava = document.getElementById('ctl00_mainContent_header_gtFloatLabel');
	if(xblgtava){
	var addfriendbutton = document.getElementById('addFRIEND');
	addfriendbutton.addEventListener("click", sendFR, true);
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
GM_addStyle("#outboxPPD{padding: 1px 1px 1px 1px; border-style:inset;border-width:1px; width:300px;height:20px;} #PPD{width:"+meter+"%;height:20px; background-color:#004F2C;} #PPD span {line-height: 20px;}");
    }
});


function sendFR(){
	var gt = document.getElementById('ctl00_mainContent_header_gamertagLinkFloat').innerHTML;
	if(t<1){
	var requesthref = "http://live.xbox.com/en-GB/profile/FriendsMgmt.aspx?ru=%252fen-GB%252fprofile%252fprofile.aspx%253fpp%253d0%2526GamerTag%253d"+gt+"&gt="+gt+"&act=Add"
  GM_xmlhttpRequest({
	method: "get",
    	url: requesthref,
    	onload: function(response)
    {
        var confirmation = response.responseText;

	if(confirmation.search("You have added") > -1){
	alert("You have successfully added "+gt+"!")
    }
	else{
	alert("Your request was unsuccessful. Your friends list may be full or "+gt+"\'s friends list is full")
    }
  }
  	});
}
	else{
	alert("Please wait...You have already tried adding "+gt+"!");
	}
	t++
	}

	}
	

	stat_link.addEventListener("click", Select_stats, true);








//wub &apx*/
