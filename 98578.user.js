// ==UserScript==
// @name           MoFeatures
// @namespace      
// @author         Hacksore
// @description    Stuff for facepunch
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @include        http://*.facepunch.com*
// @include        http://*.facepunch.com/*



// ==/UserScript==

var urlraw = document.location.href;
var url = urlraw.substr(36);


var pageraw = document.getElementById("breadcrumb").innerHTML.substr(215);
var page = pageraw.substr(0,9);



var postbit = document.getElementsByTagName("div");
var nav = document.getElementById("navbarlinks");
nav.innerHTML="<div class=navbarlink><a href=http://www.facepunch.com/forums/383-Minecraft><img alt=Minecraft Forum src=http://mcskinsearch.com/ul/images/1299040160.png title=Minecraft Forum>Minecraft Forum </a></div>"+nav.innerHTML;

for(i=0;i<postbit.length;i++){
if (postbit[i].id=="userdata"){
var user = postbit[i].innerHTML;
user = user.split(' ');
var username = user[2].substr(7,user.length);
var idraw = postbit[i].innerHTML.substr(22);
var userid = idraw.substr(0,6)
var pm = "<a href=http://www.facepunch.com/private.php?do=newpm&u="+userid+"><img src='http://static.facepunch.com/fp/navbar/pm.png'  style='padding:5px;' onMouseOver='this.style.opacity=0.5;' onMouseOut='this.style.opacity=1;'  title='PM user'/></a>";
var posts = "<a href=http://www.facepunch.com/search.php?do=finduser&userid="+userid+"&contenttype=vBForum_Post&showposts=1"+"><img src='http://www.mcskinsearch.com/ul/images/1299511357.png' style='padding:5px;' onMouseOver='this.style.opacity=0.5;' onMouseOut='this.style.opacity=1;' title='Find all posts'/></a>";
var threads = "<a href=http://www.facepunch.com/search.php?do=finduser&userid="+userid+"&starteronly=1&contenttype=vBForum_Thread"+"><img src='http://www.mcskinsearch.com/ul/images/1299511255.png' style='padding:5px;' onMouseOver='this.style.opacity=0.5;' onMouseOut='this.style.opacity=1;'  title='Find all threads'/></a>";
if(username=="hacksore"){
	username="Hacksore";
}
if(username=="afromana"){
	username="Afromana";
}
var mcskin = "<br><img style='padding:5px;' onerror='this.src=http://www.mcskinsearch.com/img/no.png' src='http://hacksore.x10.mx/2d.php?username="+username+"'  /></a>";

postbit[i].innerHTML=postbit[i].innerHTML+"<br><br><br><br><br>"+pm+posts+threads+mcskin;	


}
}

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
"Artistic" : "Autistic",
"Dumb" : "Dirt",
"Funny" : "Notch",
"Winner" : "Diamond",
"Zing" : "Torch",
"Friendly" : "Oink",
"Useful" : "Tool",
"Optimistic" : "Coal",
///////////////////////////////////////////////////////
"":""};


if(page=="Minecraft" || url=="Minecraft" ){

String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}
}



var img = document.getElementsByTagName("img");


for(i=0;i<img.length;i++){
	if(img[i].src=="http://cdn.fpcontent.net/fp/ratings/tick.png"){
		img[i].src="";
		img[i].alt="";
	}
	if(img[i].src=="http://cdn.fpcontent.net/fp/ratings/cross.png"){
		img[i].src="";
		img[i].alt="";
	}
	if(img[i].src=="http://cdn.fpcontent.net/fp/ratings/funny2.png"){
		img[i].src="http://www.minecraftforum.net/images/smilies/mobnotch.png";
		img[i].title="Notch";
	}
	if(img[i].src=="http://cdn.fpcontent.net/fp/ratings/winner.png"){
		img[i].src="http://www.minecraftforum.net/images/smilies/diamond.png";
		img[i].title="Diamond";
	}
	if(img[i].src=="http://cdn.fpcontent.net/fp/ratings/box.png"){
		img[i].src="http://www.minecraftforum.net/images/smilies/dirt.png";
		img[i].title="Dirt";
	}

	if(img[i].src=="http://cdn.fpcontent.net/fp/ratings/wrench.png"){
		img[i].src="http://mcskinsearch.com/ul/images/1299547831.png";
		img[i].title="Tool";
	}

	if(img[i].src=="http://cdn.fpcontent.net/fp/ratings/zing.png"){
		img[i].src="http://www.minecraftforum.net/images/smilies/torch.png";
		img[i].title="Bright";
	}
	
	if(img[i].src=="http://cdn.fpcontent.net/fp/ratings/rainbow.png"){
		img[i].src="http://www.minecraftforum.net/images/smilies/coal.png";
		img[i].title="Coal";
	}
	
	if(img[i].src=="http://cdn.fpcontent.net/fp/ratings/palette.png"){
		img[i].src="http://mcskinsearch.com/ul/images/1299040160.png";
		img[i].title="Autistic";
	}
	if(img[i].src=="http://cdn.fpcontent.net/fp/ratings/heart.png"){
		img[i].src="http://www.minecraftforum.net/images/smilies/mobpig.png";
		img[i].title="Oink";
	}

	if(img[i].src=="http://cdn.fpcontent.net/fp/ratings/clock.png"){
		img[i].src="http://www.mcskinsearch.com/ul/images/1299547535.png";
		img[i].title="Late";
	}
	
	if(img[i].src=="http://cdn.fpcontent.net/fp/ratings/information.png"){
		img[i].src="http://www.mcskinsearch.com/ul/images/1299549351.png";
		img[i].title="Smart";
	}
	
	
}
	
}
