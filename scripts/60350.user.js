// ==UserScript==
// @name           OnlineWingman Toolbar
// @namespace      onlinewingman.com
// @include        http://www.plentyoffish.com/*
// @include        http://www.match.com/*
// @require		   http://www.onlinewingman.com/dist/ddss.min.js
// @require		   http://www.onlinewingman.com/dist/json2.min.js
// @require		   http://www.onlinewingman.com/dist/jquery-132min.js
// ==/UserScript==

// Compiled On: Mon 09/28/2009 15:32:34.61 
var ddss={};try{if(top!=self&&top.location.href==self.location.href){}else{if(window.location.href.indexOf("http://www.match.com")==0){ddss=new DDSS("Match");
if(ddss.username&&!ddss.disabled){configMATCH();launchMATCH()}}else{if(window.location.href.indexOf("http://www.plentyoffish.com")==0){ddss=new DDSS("PoF");
if(ddss.username&&!ddss.disabled){configPOF();launchPOF()}}}}}catch(e){ddss.errorReport("JS Exception Trap",e)
}function configMATCH(){ddss.isAuthenticated=function(){return $(".navSignOut").length
};ddss.buildActionsSection=function(b){var a=this};ddss.parseProfile=function(j){var g=new Object();
g.id=this.getURLParam("uid");if(!g.id){g.id=this.getURLParam("UID")}if(!g.id){var d=$("#A1:first").attr("href");
g.id=this.getURLParam("uid",d)}if(!g.id){return}if(window.location.href.toLowerCase().indexOf("http://www.match.com/daily5/profile.aspx")==0){g.handle=this.getURLParam("Handle");
if(!g.handle){g.handle=$(".Current img").attr("alt")}var k=$(".SendEmail:contains('her')").length;
var c=$(".SendEmail:contains('him')").length;if(k==1&&c==0){g.gender="F"}else{if(k==0&&c==1){g.gender="M"
}}g.aPhotoURLs=unsafeWindow.aryImages;g.profilePhotoURL=$("#mainImage").attr("src");
var a={locStr:"Location:",age:"Age:",bodyType:"Body type:",height:"Height:",race:"Ethnicity:",religion:"Religion:",smokes:"Smokes:",drinks:"Drink:",relationships:"Relationships:",haveKids:"Have kids:",wantKids:"Want kids:",education:"Education:",occupation:"Occupation:",income:"Income:",politics:"Politics:"};
for(key in a){var d=this.trim($("td[class='detailLabel']:contains('"+a[key]+"'):first").next("td").text());
if(d&&d.length){g[key]=d}}g.essay=$("#LongEssay").text();g.mowForFun=this.parseStr("//div[@id='ctl00_workarea_myMatchPageView_ctl00_PickProfileTemplate_ctl00_mowForFun']/p",j);
g.mowJob=this.parseStr("//div[@id='ctl00_workarea_myMatchPageView_ctl00_PickProfileTemplate_ctl00_mowJob']/p",j);
g.mowFavHotSpots=this.parseStr("//div[@id='ctl00_workarea_myMatchPageView_ctl00_PickProfileTemplate_ctl00_mowFavHotSpots']/p",j);
g.mowFavThings=this.parseStr("//div[@id='ctl00_workarea_myMatchPageView_ctl00_PickProfileTemplate_ctl00_mowFavThings']/p",j);
g.mowLastRead=this.parseStr("//div[@id='ctl00_workarea_myMatchPageView_ctl00_PickProfileTemplate_ctl00_mowLastRead']/p",j);
g.mowEthnicity=this.parseStr("//div[@id='ctl00_workarea_myMatchPageView_ctl00_PickProfileTemplate_ctl00_mowEthnicity']/p",j);
g.mowReligion=this.parseStr("//div[@id='ctl00_workarea_myMatchPageView_ctl00_PickProfileTemplate_ctl00_mowReligion']/p",j);
g.mowEducation=this.parseStr("//div[@id='ctl00_workarea_myMatchPageView_ctl00_PickProfileTemplate_ctl00_mowEducation']/p",j);
var h={height:"Height:",bodyType:"Body type:",race:"Ethnicity:",religion:"Religion:",smokes:"Smoke:",drinks:"Drink:",relationships:"Relationships:",haveKids:"Have kids:",wantKids:"Want kids:"};
for(key in h){var d=this.trim($("#divAboutTheirMatch td:contains('"+a[key]+"')").next("td").text());
if(d){g["date_"+key]=d}}g.locStr=this.trim($("td[class='detailLabel']:contains('Location:')").next("td").text());
var b=g.locStr.split(",");g.city=this.trim(b[0]);g.state=this.trim(b[1]);alert(uneval(g))
}else{g.handle=this.parseStr("//div[@id='PortraitDetails']/h3",j);g.title=this.parseStr("//div[@id='PortraitDetails']/h4",j);
g.activityStr=this.parseStr("//div[@id='PortraitDetails']/p",j);g.ageStr=this.parseStr("//div[@id='portraitPreferences']/ul/li[1]",j);
g.location=this.parseStr("//div[@id='portraitPreferences']/ul/li[2]",j);g.seekStr=this.parseStr("//div[@id='portraitPreferences']/ul/li[3]",j);
g.seekLocStr=this.parseStr("//div[@id='portraitPreferences']/ul/li[4]",j);if(!g.ageStr&&!g.handle){return null
}var i=g.ageStr.indexOf("-year-old");g.age=this.trim(g.ageStr.substring(0,i));g.gender=this.trim(g.ageStr.substring(i+9));
var b=g.location.split(",");g.city=this.trim(b[0]);g.state=this.trim(b[1]);g.country=this.trim(b[2]);
g.aboutMe=this.parseStr("//div[@id='ctl00_workarea_showProfilePageView_ctl00_litTest']",j);
var a={race:"Ethnicity:",bodyType:"Body type:",height:"Height:",religion:"Religion:",smokes:"Smoke:",drinks:"Drink:",relationships:"Relationships:",haveKids:"Have kids:",wantKids:"Want kids:"};
for(key in a){var d=parseNode("//div[@id='MultiValueDisplayBySectionContectArea']/table/tbody/tr/td[@class='detailLabel' and text()='"+a[key]+"']",j);
if(d){g[key]=this.trim(d.nextSibling.nextSibling.textContent)}}var f={hair:"Hair:",eyes:"Eyes:",bestFeature:"Best Feature:",bodyArt:"Body Art:",exercise:"Sports and exercise:",exerciseHabits:"Exercise habits:",diet:"Daily diet:",interests:"Interests:",education:"Education:",occupation:"Occupation:",income:"Income:",speaks:"Languages:",politics:"Politics:",sign:"Sign:",myPlace:"My Place:",petIHave:"Pets I have:",petsILike:"Pets I like:"};
for(key in f){var d=parseNode("//div[@id='bottomRight']/table[1]/tbody/tr/td[@class='detailLabel' and text()='"+f[key]+"']",j);
if(d){g[key]=this.trim(d.nextSibling.nextSibling.innerHTML)}}var h={hair:"Hair:",eyes:"Eyes:",height:"Height:",bodyType:"Body type:",race:"Ethnicity:",faith:"Faith:",speaks:"Languages:",education:"Education:",job:"Job:",income:"Income:",smokes:"Smoke:",drinks:"Drink:",relationships:"Relationships:",haveKids:"Have kids:",wantKids:"Want kids:",turnOns:"Turn-ons:",turnOffs:"Turn-offs:"};
for(key in f){var d=parseNode("//div[@id='bottomRight']/table[2]/tbody/tr/td[@class='detailLabel' and text()='"+f[key]+"']",j);
if(d){g["date_"+key]=this.trim(d.nextSibling.nextSibling.innerHTML)}}g.mowForFun=this.parseStr("//div[@id='ctl00_workarea_showProfilePageView_ctl00_mowForFun']/p",j);
g.mowJob=this.parseStr("//div[@id='ctl00_workarea_showProfilePageView_ctl00_mowJob']/p",j);
g.mowFavHotSpots=this.parseStr("//div[@id='ctl00_workarea_showProfilePageView_ctl00_mowFavHotSpots']/p",j);
g.mowFavThings=this.parseStr("//div[@id='ctl00_workarea_showProfilePageView_ctl00_mowFavThings']/p",j);
g.mowLastRead=this.parseStr("//div[@id='ctl00_workarea_showProfilePageView_ctl00_mowLastRead']/p",j);
g.mowEthnicity=this.parseStr("//div[@id='ctl00_workarea_showProfilePageView_ctl00_mowEthnicity']/p",j);
g.mowReligion=this.parseStr("//div[@id='ctl00_workarea_showProfilePageView_ctl00_mowReligion']/p",j);
g.mowEducation=this.parseStr("//div[@id='ctl00_workarea_showProfilePageView_ctl00_mowEducation']/p",j);
g.getToKnowMe={};$('h4[class="personality"]').next().find("h3").each(function(){g.getToKnowMe[this.textContent]=$(this).next("p").text()
});g.aPhotoURLs=this.parseStrs("//div[@class='morePhotos']/div/ul/li/img/@src",j);
g.profilePhotoURL=this.parseStr("//img[@id='ctl00_workarea_showProfilePageView_ctl00_mainPhoto_ctl00_imgPrimary']/@src",j)
}return g};ddss.parseProfileLinks=function(){var a={length:0,stElements:{},stProfiles:{}};
var b=this;$(".searchResultContainer").each(function(){var c=$(this);var f=b.getURLParam("UID",c.find(".handle a").attr("href"));
if(f){f=decodeURIComponent(f);a.stElements[f]=c.find(".pic a").get(0);a.stProfiles[f]={};
a.length++;a.stProfiles[f].handle=b.trim(c.find(".handle a").text());a.stProfiles[f].userPic=b.trim(c.find(".pic > a >img").attr("src"));
a.stProfiles[f].userStats=b.trim(c.find(".agelocation").text());var d=a.stProfiles[f].userStats.split("-");
a.stProfiles[f].age=b.trim(d[0]);a.stProfiles[f].city=b.trim(d[1].split(",")[0]);
a.stProfiles[f].state=b.trim(d[1].split(",")[1]);a.stProfiles[f].photoCount=b.trim(c.find(".photos a").text());
a.stProfiles[f].lastVisit=b.trim(c.find(".activity, .status").text())}});$(".profileContainer, .DisabledprofileContainer").each(function(){var c=$(this);
var f=b.getURLParam("uid",c.find("#Username a").attr("href"));if(f){f=decodeURIComponent(f);
a.stElements[f]=c.find(".profileImageDiv").get(0);a.stProfiles[f]={};a.length++;a.stProfiles[f].handle=b.trim(c.find("#Username").text());
a.stProfiles[f].userPic=b.trim(c.find(".profileImageDiv > a >img").attr("src"));a.stProfiles[f].title=b.trim(c.find("#Headline").text());
a.stProfiles[f].userStats=b.trim(c.find("#Stats").text());var d=a.stProfiles[f].userStats.split(",");
a.stProfiles[f].age=b.trim(d[0]);a.stProfiles[f].city=b.trim(d[1]);a.stProfiles[f].state=b.trim(d[2]);
a.stProfiles[f].photoCount=b.trim(c.find("#MorePhotos").text())}});$(".class_13160_console_container").each(function(){var c=$(this);
var f=b.getURLParam("uid",c.find(".class_13160_console_handle a").attr("href"));if(f){f=decodeURIComponent(f);
a.stElements[f]=c.find(".class_13160_console_pic").get(0);a.stProfiles[f]={};a.length++;
a.stProfiles[f].handle=b.trim(c.find(".class_13160_console_handle").text());a.stProfiles[f].userPic=b.trim(c.find(".class_13160_console_pic > a >img").attr("src"));
a.stProfiles[f].title=b.trim(c.find(".class_13160_console_headline").text());a.stProfiles[f].userStats=b.trim(c.find(".class_13160_console_location").text());
var d=a.stProfiles[f].userStats.split(",");a.stProfiles[f].age=b.trim(d[0]);a.stProfiles[f].city=b.trim(d[1]);
a.stProfiles[f].state=b.trim(d[2]);a.stProfiles[f].photoCount=b.trim(c.find(".class_13160_console_photocount").text())
}});$(".searchGallery, .searchDetail").each(function(){var c=$(this);var d=b.getURLParam("uid",c.find(".userHandle > a").attr("href"));
if(d){a.stElements[d]=c.find(".userPic").get(0);a.stProfiles[d]={};a.length++;a.stProfiles[d].userStats=b.trim(c.find(".userStats").text());
a.stProfiles[d].userSeeks=b.trim(c.find(".userSeeks").text());a.stProfiles[d].title=b.trim(c.find(".userHdr").text());
a.stProfiles[d].isNew=b.trim(c.find(".new").text());a.stProfiles[d].matchPct=b.trim(c.find(".matchPercent").text());
a.stProfiles[d].userPic=c.find(".userPic > a > img").attr("src");a.stProfiles[d].handle=b.trim(c.find(".userHandle").text());
a.stProfiles[d].photoCount=b.trim(c.find(".userPhotoCount").text());a.stProfiles[d].lastVisit=b.trim(c.find(".lastActivity, .online").text())
}});$(".detail_wrapper").each(function(){var f=$(this);var d=f.find(".colLeft > a[href^='../profile/showprofile.aspx']").attr("href");
var h=b.getURLParam("uid",d);if(h){a.stElements[h]=f.find(".colLeft > a[href^='../profile/showprofile.aspx'] > img").get(0);
a.stProfiles[h]={};a.length++;a.stProfiles[h].handle=b.getURLParam("handle",d);a.stProfiles[h].title=f.find(".colRight > h4").text();
a.stProfiles[h].lastVisit=f.find(".activity").text();a.stProfiles[h].locStr=f.find(".content > p").text();
var g=a.stProfiles[h].locStr.split(",");var c=b.trim(g[0]);a.stProfiles[h].state=b.trim(g[1]);
var g=c.split("-");a.stProfiles[h].age=b.trim(g[0]);a.stProfiles[h].city=b.trim(g[1])
}});return a};ddss.fillEmailFormAction=function(c,a){var g=this.memberInfo;var b=$("#ctl00_workarea_myMatchPageView_ctl00_myMatchPageView_ctl00_dbEmailCompose_ctl00_txtSubject").get(0);
var d=$("#ctl00_workarea_myMatchPageView_ctl00_myMatchPageView_ctl00_dbEmailCompose_ctl00_txtMessage").get(0);
if(b&&d){if(!b.value||b.value=="Subject"){b.value=c}if(d.value.indexOf("Enter your message here")>=0){d.value=""
}if(this.memberInfo&&g.REALNAME&&d.value.indexOf(g.REALNAME)!=0){d.value=g.REALNAME+",\n"+d.value
}if(d.value.indexOf(a)==-1){d.value+=a+"\n"}}else{var f="http://www.match.com/doubleblind/emailform.aspx?uid="+encodeURIComponent(g.id);
f+="&handle="+g.handle;window.location.href=f+"&templateSubject="+encodeURIComponent(c)
}};ddss.harvestEmailLinksInbox=function(b){var a=0;var c={};$(".MessageCheckBox").each(function(g){var h=$(this);
var m=$(this.parentNode.parentNode);var n=h.attr("value");var l=m.find("span a[href ^= '/profile/showProfile']").attr("href");
var j=m.find("img[alt='Read']");var f=m.find("img[alt='Unread']");var k=m.find("td").eq(6).text();
if(n&&l){a++;c[n]={};c[n].subject=ddss.trim(m.find("span.subject").text());c[n].date=ddss.trim(m.find(".dateRec").text());
if(b=="inbox"){c[n].fromID=ddss.getURLParam("uid",l);c[n].fromHandle=ddss.getURLParam("handle",l)
}else{if(b=="outbox"){c[n].toID=ddss.getURLParam("uid",l);c[n].toHandle=ddss.getURLParam("handle",l)
}else{if(b=="trash"){c[n].toFromID=ddss.getURLParam("uid",l);c[n].toFromHandle=ddss.getURLParam("handle",l)
}}}if(j.length){c[n].read=1}else{if(f.length){c[n].read=0}else{if(k){c[n].read=k}}}}});
var d=[];return{count:a,stLinks:c,nextLinks:d}}}function configPOF(){ddss.isAuthenticated=function(){return $('a[href="abandon.aspx"]:contains("Log Out")').length
};ddss.buildActionsSection=function(b){var a=this};ddss.parseProfile=function(f){var h={};
h.handle=parseStr("//form[starts-with(@action, 'sendmessage.aspx')]/input[@name='sendto']/@value",f);
if(!h.handle){h.handle=parseStr("//input[@type='hidden' and @name='sendto']/@value",f)
}h.id=parseStr("//form[starts-with(@action, 'sendmessage.aspx')]/input[@name='p_id']/@value",f);
if(!h.id){h.id=window.location.href.replace(/\D/g,"")}h.title=$(".name > font").text();
if(!h.title){h.title=$("font[size='+2'] b:contains('"+h.handle+"')").parent().text()
}h.title=this.normalize(h.title.substring(h.title.indexOf(":")+1));var a={cityStr:"City",sign:"Sign",height:"Height",ageStr:"Age",sex:"Gender",raceStr:"Ethnicity",hair:"Hair Color",religion:"Religion",bodyType:"Body Type",seeking:"I am Seeking a",relationshipGoal:"For",smokes:"Smoker",drinks:"Do you drink",maritalStatus:"Marital Status",profession:"Profession",smarts:"Smarts",haveKids:"Do you have children?",wantKids:"Do you want children?",haveCar:"Do you have a car?",drugs:"Do you do drugs?"};
for(key in a){var c=this.trim($(".a:contains('"+a[key]+"')").nextAll(".b").text());
if(c&&c.length){h[key]=c}else{c=$("td b:contains('"+a[key]+"')").parent().next("td").text();
if(c&&c.length){h[key]=this.trim(c)}}}if(!h.sex&&h.ageStr){h.age=this.normalize(h.ageStr.split("year old")[0]);
h.sex=this.normalize(h.ageStr.split("year old")[1])}else{h.age=h.ageStr}if(!h.hair&&h.raceStr){h.race=this.normalize(h.raceStr.split("with")[0]);
h.hair=this.normalize(h.raceStr.split("with")[1])}else{h.race=h.raceStr}h.userID=parseStr("//input[@type='hidden' and @name='usersendto']/@value",f);
h.interestsHTML=$(".headings:contains('Interests')").next(".boxes").html();h.interestsText=$(".headings:contains('Interests')").next(".boxes").text();
h.aboutMe=$(".headings:contains('About Me')").next(".boxes").html();h.firstDate=$(".headings:contains('First Date')").next(".boxes").html();
h.mailSettings=$(".headings:contains('Mail Settings')").next(".boxes").html();if(!h.aboutMe){c=$("td[class='tbdr2']").each(function(){var i=$(this).parents("table:first");
if(i.find("b:contains('About Me')").length){h.aboutMe=i.find(".tbdr2").html()}else{if(i.find("b:contains('First Date')").length){h.firstDate=i.find(".tbdr2").html()
}}})}h.profilePhotoURL=$("img[name='MP']").attr("src");h.aPictureURLs=[];h.aPictureCaptions=[];
var g=document.evaluate("//img[@onmouseout='hidetrail();' and starts-with(@src,'http://pics.plentyoffish.com/thumbnails/')]",f,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var b=0;b<g.snapshotLength;b++){var d=g.snapshotItem(b);var c=d.getAttribute("onmouseover");
c=c.substring(c.indexOf("http"),c.indexOf(".jpg")+4);h.aPictureURLs[b]=c;c=d.parentNode.getAttribute("href");
c=c.substring(c.indexOf(".jpg")+6).replace(/\'/g,"");c=this.trim(c.replace(/\)/g,""));
if(c.length){h.aPictureCaptions[b]=c}}return h};ddss.fillEmailFormAction=function(c,a){var g=this.memberInfo;
var b=parseNode("//input[@name='subject']",document);var d=parseNode("//textarea[@name='message']",document);
if(b&&d){if(!b.value||b.value=="Your Subject Line here"){b.value=c}if(this.memberInfo&&g.REALNAME&&d.value.indexOf(g.REALNAME)!=0){d.value=g.REALNAME+",\n"+d.value
}if(d.value.indexOf(a)==-1){d.value+=a+"\n"}}else{var f="http://www.plentyoffish.com/sendmessage.aspx?SID=&usersendto="+g.userID;
f+="&sendto="+g.handle+"&p_id="+g.id+"&v=&submit=&dating";window.location.href=f+"&templateSubject="+encodeURIComponent(c)
}};ddss.parseProfileLinks=function(){var a={length:0,stElements:{},stProfiles:{}};
var b=this;$(".rc > .mi").each(function(){var f=$(this);var d=f.attr("href");var g=f.find("img").attr("src");
if(g&&g!="http://pics.plentyoffish.com/menu/b.gif"){return}var h=b.getURLParam("profile_id",d);
if(!h){h=d.replace(/\D/g,"")}if(h){a.stElements[h]=this;a.stProfiles[h]={};a.length++;
a.stProfiles[h].handle=f.text();var c=f.nextAll("center").text();a.stProfiles[h].lastVisit=c
}});$("img[src ^= 'http://pics.plentyoffish.com/thumbnails/']").each(function(){var c=this.parentNode.getAttribute("href");
if(c.indexOf("javascript:")!=-1){return}var f=b.getURLParam("profile_id",c);if(!f){f=c.replace(/\D/g,"")
}if(f){a.stElements[f]=this;a.stProfiles[f]={};a.length++;var d=$(this.parentNode.parentNode);
if(d.attr("class")=="rcb"){d.parent().prev("td[class='lc']").each(function(){a.stProfiles[f].handle=$(this).find("a").text();
a.stProfiles[f].location=$(this).find("p").get(0).firstChild.textContent;var g=$(this).find("p font").text();
if(g){a.stProfiles[f].lastVisit=g}})}else{if(d.attr("class")=="rc"){d.find('center font[color="green"]').each(function(){a.stProfiles[f].lastVisit=this.textContent
})}}}});return a};ddss.harvestEmailLinksInbox=function(){var b=0;var c={};$('a[href ^= "viewmessage.aspx"]').each(function(f){var g=$(this);
var j=$(this.parentNode.parentNode);var k=ddss.getURLParam("message_id",g.attr("href"));
var h=j.prev().find("a").attr("href");if(k&&h){b++;c[k]={};c[k].subject=g.text();
c[k].date=j.next().text();c[k].fromID=h.replace(/\D/g,"");c[k].read=j.next().next().text();
c[k].replied=j.next().next().next().text()}});var d=[];var a=$("a[href ^= 'inbox.aspx']").each(function(i,h){var g=ddss.getURLParam("page_id",this.href);
if(g){d.push(this.href)}});return{count:b,stLinks:c,nextLinks:d}};ddss.harvestEmailLinksSent=function(){var b={};
var a=0;$('a[href ^= "viewmessage.aspx"]').each(function(d){var g=$(this);var h=$(this.parentNode.parentNode);
var j=ddss.getURLParam("message_id",g.attr("href"));var f=h.prev().find("a").attr("href");
if(j){a++;b[j]={};b[j].subject=g.text();b[j].date=h.next().text();b[j].toID=f.replace(/\D/g,"");
b[j].read=h.next().next().text()}});var c;$("a[href ^= 'history.aspx']:contains('Next Page')").each(function(g,d){c=this.href
});return{count:a,stEmails:b,nextLinks:c}}}function launchMATCH(){if(window.location.href.toLowerCase().indexOf("profile/showprofile.aspx?")>0||window.location.href.toLowerCase().indexOf("http://www.match.com/daily5/profile.aspx")==0){ddss.viewProfileAction()
}else{if(window.location.href.toLowerCase().indexOf("http://www.match.com/doubleblind/viewmessage.aspx")==0){var o=ddss.getURLParam("MID");
var g=ddss.getURLParam("uid",$("#ctl00_workarea_myMatchPageView_ctl00_dbProfileData_ctl00_phl").attr("href"));
if(!o||!g){return}var h={};h[o]={subject:ddss.trim($("#messageView h3").text()),toFromID:g};
if($(".messageInfo strong:contains('From:')").length){h[o].fromID=g}else{h[o].toID=g
}var m=ddss.trim($(".emailBody").html());if(ddss.saveMsgs&&m){h[o].message=m}var f="json="+encodeURIComponent(JSON.stringify(h));
ddss.post(ddss.baseURL+"email.cfc?method=messages&site=match&type=email",f,ddss,"alertDebug")
}else{if(window.location.href.toLowerCase().indexOf("http://www.match.com/doubleblind/communicationslog.aspx")==0){var j;
var d=ddss.trim($("#header_title").text());if(!d||d.indexOf("Inbox")==0){d="inbox";
j=ddss.harvestEmailLinksInbox(d)}else{if(d.indexOf("Sent")==0){d="outbox";j=ddss.harvestEmailLinksInbox(d)
}else{if(d.indexOf("Trash")==0){d="trash";j=ddss.harvestEmailLinksInbox(d)}}}if(j&&j.count){ddss.post(ddss.baseURL+"email.cfc?method=messages&site=match&type=email&folder="+d,"json="+encodeURIComponent(JSON.stringify(j.stLinks)),ddss,"alertDebug")
}var a=ddss.getURLParam("owcaddtask",this.href);var p=ddss.getURLParam("owctid",this.href);
if(a&&a=="1"&&j.nextLinks&&isArray(j.nextLinks)){for(var k=0;k<j.nextLinks.length;
k++){ddss.addFetchTask(p,j.nextLinks[k]+"&owcaddtask="+a,"GET")}}}else{if(window.location.href.toLowerCase().indexOf("http://www.match.com/doubleblind/emailform.aspx")==0){var b=document.getElementById("aspnetForm");
if(b){var l=decodeURIComponent(ddss.getURLParam("templateSubject"));ddss.display();
var c=ddss.getURLParam("uid");var n=ddss.getURLParam("handle");ddss.get(ddss.baseURL+"profile.cfc?method=view&site=match&id="+c,function(i){ddss.load(i);
if(l){ddss.fillEmailFormAction(l,ddss.emailTemplates[l])}});b.addEventListener("submit",function(){var i="email.cfc?method=sent&site=match&id="+c;
ddss.get(ddss.baseURL+i,ddss,"alertDebug");return true},true)}}}}}if(top==self){ddss.decorateProfilesAction()
}}function launchPOF(){var h=document.getElementsByTagName("body")[0];h.setAttribute("onload","");
if(window.location.href.indexOf("http://www.plentyoffish.com/member")==0||window.location.href.indexOf("http://www.plentyoffish.com/viewprofile")==0){ddss.viewProfileAction();
var f=document.getElementById("peopleclosebydiv");f.id="xxxxx"}else{if(window.location.href.indexOf("http://www.plentyoffish.com/viewmessage.aspx")==0){var q={};
var c=ddss.getURLParam("message_id");q[c]={};q[c].subject=ddss.trim($("b:contains('Subject:')").parents("font").next("font").text());
q[c].date=$("b:contains('Sent Date: ')").nextAll().text();q[c].fromID=$("a:contains('(View Profile)')").attr("href");
if(q[c].fromID){q[c].fromID=q[c].fromID.replace(/\D/g,"");if(ddss.saveMsgs){var m=$("table[width='100%']").find("td[colspan=2]").eq(0).clone();
m.find("table").remove();if(m){q[c].message=ddss.trim(m.html())}}ddss.post(ddss.baseURL+"email.cfc?method=messages&site=pof&type=email","json="+encodeURIComponent(JSON.stringify(q)),ddss,"alertDebug")
}}else{if(window.location.href.indexOf("http://www.plentyoffish.com/sendmessage.aspx")==0){var b=parseNode("//form[@name='sendmessage']",document);
if(b){ddss.display();var n=parseStr("//input[@name='reciever']/@value",document);
ddss.get(ddss.baseURL+"profile.cfc?method=view&site=pof&id=&handle="+n,ddss,"load");
var l=decodeURIComponent(ddss.getURLParam("templateSubject"));if(l){ddss.fillEmailFormAction(l,ddss.emailTemplates[l])
}b.addEventListener("submit",function(){var r=this.elements.namedItem("reciever").value;
var i="email.cfc?method=sent&site=pof&id=&handle="+r;ddss.get(ddss.baseURL+i,ddss,"alertDebug");
return true},true)}}else{if(window.location.href.indexOf("http://www.plentyoffish.com/inbox.aspx")==0){var g=ddss.harvestEmailLinksInbox();
if(g&&g.count){ddss.post(ddss.baseURL+"email.cfc?method=messages&site=pof&type=email&folder=inbox","json="+JSON.stringify(g.stLinks),ddss,"alertDebug")
}var a=ddss.getURLParam("owcaddtask",this.href);var o=ddss.getURLParam("owctid",this.href);
if(a&&a=="1"&&g.nextLinks&&isArray(g.nextLinks)){for(var j=0;j<g.nextLinks.length;
j++){ddss.addFetchTask(o,g.nextLinks[j],"GET")}}}else{if(window.location.href.indexOf("http://www.plentyoffish.com/history.aspx")==0){var g=ddss.harvestEmailLinksSent();
if(g&&g.count){ddss.post(ddss.baseURL+"email.cfc?method=messages&site=pof&type=email&folder=outbox","json="+JSON.stringify(g.stEmails),ddss,"alertDebug")
}var a=ddss.getURLParam("owcaddtask",this.href);var o=ddss.getURLParam("owctid",this.href);
if(a&&a=="1"&&g.nextLinks&&!isArray(g.nextLinks)){ddss.addFetchTask(o,g.nextLinks+"&owcaddtask="+a,"GET")
}}else{if(window.location.href.indexOf("http://www.plentyoffish.com/firstcontacthistory.aspx")==0){profileLinks=ddss.parseProfileLinks();
var k="";for(var j in profileLinks.stProfiles){k+=j+","}if(k!=""){ddss.post(ddss.baseURL+"profile.cfc?method=bulkStatusUpdate&site=pof&status=emailed","idList="+k,ddss,"alertDebug")
}var p=[];var d=$("a[href ^= 'firstcontacthistory.aspx']").each(function(s,r){var i=ddss.getURLParam("page_id",this.href);
if(i){p.push(this.href)}});var a=ddss.getURLParam("owcaddtask",this.href);var o=ddss.getURLParam("owctid",this.href);
if(a&&a=="1"){for(var j=0;j<p.length;j++){ddss.addFetchTask(o,p[j]+"&owcaddtask="+a,"GET")
}}}}}}}}if(top==self){ddss.decorateProfilesAction()}};