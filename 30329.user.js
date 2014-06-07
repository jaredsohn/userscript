// ==UserScript==
// @name           GoOverSalCap
// @namespace      *
// @include        http://*.*.fantasysports.yahoo.com/football/*/team_manager*
// @description    For Yahoo! fantasy football (soccer to americans), allows a team to go over the salary cap (though the team can not be saved when over cap).  Optionally adds the opponent next to the player and makes stats font size consistent
// ==/UserScript==


//FF3 has native getElementsByClassName.  For others, add it.  Xpath is much faster than regex
if (! document.getElementsByClassName){
	document.getElementsByClassName = function(needle) {
	  var xpathResult = document.evaluate('//*[@class = needle]', document, null, 0, null);
	  var outArray = [];
	  while ((outArray[outArray.length] = xpathResult.iterateNext())) {
	  }
	  return outArray;
	};
}

function addGlobalStyle(css) { // this function from diveintogreasemonkey.org
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}



// get money available
var avail=0;
var avail_row=document.getElementsByClassName("avail-funds")[0];
if(avail_row){
avail=avail_row.lastChild.innerHTML *1;
// your team number is needed to form the links
var teamnumber=document.location.pathname.split("/")[2];
var overpos=[]; // will hold positions that are full -- ie, if have 3 defenders in a 3-4-3.
var s=Array.filter( document.getElementsByClassName('player-action'), function(elem){return elem.nodeName == 'SPAN';}); //these guys dont have add button enabled
//alert("s ="+s.length + "s1 ="+s1.length)
var position, price, link,playerid,a,b,iteam,f,player_teams,overnote;
var j=s.length;
if(j){
	var i;
	for(i=0;i<j; i++){ //see what positions have issues. store in overpos
		position=s[i].nextSibling.nextSibling.nextSibling.innerHTML;
		price=s[i].parentNode.nextSibling.innerHTML;
	//	alert(price + position);
		if(price<=avail){
			if(overpos.indexOf(position)<0){overpos.push(position);}
		}
	}
	i=0;
	for(i=0;i<j; i++){
		position=s[i].nextSibling.nextSibling.nextSibling.innerHTML;
		price=s[i].parentNode.nextSibling.innerHTML;
		if(price<=avail){  // not a price issue, must be a position issue
			//alert()
			s[i].nextSibling.nextSibling.nextSibling.style.color="pink"; //this is almost definitely not the best way to indicate the issue
			s[i].title+=" as you have too many "+ position+"s";
			if(!overpos.indexOf(position)){overpos.push(position);}
		}
		else { //its likely a price issue.
			s[i].parentNode.nextSibling.style.color="pink"; //color price. this is almost definitely not the best way to indicate the issue
			if(overpos.indexOf(position)<0){  //also not a position issue. Add the links.
				s[i].style.background="transparent url(http://l.yimg.com/i/i/eu/sp/plusm1.png) no-repeat scroll left -44px";
				link=document.createElement("a");
				link.className="player-action buy-player";
				playerid=s[i].nextSibling.href.split("/")[5];
				link.href="/football/"+teamnumber+"/scratch_add_player?pid="+playerid;
				link.innerHTML="<span>You can buy this player, but you will be over your salary cap.</span>";
				s[i].title="You can buy this player, but you will be over your salary cap.";
				s[i].appendChild(link);
			}
			else{
				s[i].nextSibling.nextSibling.nextSibling.style.color="pink"; // color position. this is almost definitely not the best way to indicate the issue
				s[i].title+=" as you have too many "+ position+"s";
			}
		}
	}
}

f=Array.filter( document.getElementsByClassName('neg'), function(elem){return elem.nodeName == 'TD';});
if(f.length){
	b=Array.filter( document.getElementsByClassName('save-changes'), function(elem){return elem.nodeName == 'LI';});
	//i=0;
	j=b.length;
	for(i=0;i<j; i++){
		a=b[i].firstChild;
		a.href="javascript:alert('Your team is over its salary cap. Please adjust your roster to make your Available funds zero or more.')";
		a.className="valid-button";
		a.firstChild.innerHTML="Over Salary Cap";
	}

	overnote=Array.filter( document.getElementsByClassName('warning'), function(elem){return elem.nodeName == 'P';});
	if(overnote.length){
		overnote[0].innerHTML="Your team is over its salary cap. Please adjust your roster to make your Available funds zero or more.";
		overnote[0].style.color="orange"; //this is *definitely* not the color to choose.
	}
}
}



//put opponents next to player.  This will be optional

//GM_setValue('show_football_opponents',2); // uncomment to sim first time user
show=GM_getValue('show_football_opponents',2);
if(show==2 ){
	ask=confirm('Do you want opponents to show next to players? "Cancel" for no. "OK" for yes.  Can change this in Tools: GreaseMonkey: UserScript menu');
	if(ask){
		GM_setValue('show_football_opponents',true);
		alert('Your next refresh will show Opponents.')
	}
	else{
		GM_setValue('show_football_opponents',false);
	}
}
else{
	if(show){
		var sched={};
		var teams=[];
		var vs=document.getElementById('yspsub').getElementsByClassName('versus');
		j=vs.length;
		for(i=0;i<j; i++){
			a=vs[i].previousSibling.nodeValue;
			b=vs[i].nextSibling.nodeValue;
			a=a.replace(/^ /,"");
			b=b.replace(/^ /,"");
			a=a.replace(/ $/,"");
			b=b.replace(/ $/,"");
			if(! sched[a]){ sched[a]=[b];}
			else {sched[a].push(b); }
			if(!sched[b]){sched[b]=[a];}	
			else {sched[b]=[a];}
		}
		player_teams=Array.filter(document.getElementsByClassName('player-team'), function(elem){return elem.nodeName == 'SPAN';});
		var k=player_teams.length
		for (i=0; i< k; i++){
			iteam=player_teams[i].innerHTML;
			player_teams[i].innerHTML+=" (";
			for (j=0; j<sched[iteam].length; j++){
				player_teams[i].innerHTML+=sched[iteam][j];
			}
			player_teams[i].innerHTML+=")";
		}
	}
}

//put opponents next to player.  This will be optional

//GM_setValue('show_football_opponents',2); // uncomment to sim first time user
no_font_cloud=GM_getValue('no_font_cloud',2);
if(no_font_cloud==2 ){
	ask=confirm('Do you want to normalize the statistics fonts? "Cancel" for no. "OK" for yes.  Can change this in Tools: GreaseMonkey: UserScript menu');
	if(ask){
		GM_setValue('no_font_cloud',true);
		alert('Your next refresh will normalize fonts.')
	}
	else{
		GM_setValue('no_font_cloud',false);
	}
}
else{
//	alert(no_font_cloud);
	if(no_font_cloud){
		// original values:
		//table.score-details td.maj{font-size:138.5%}
		//table.score-details td.min{font-size:108%;}
		addGlobalStyle('table.score-details td.maj { font-size:108% ! important; }');
		addGlobalStyle('table.score-details td.min { font-size:108% ! important; }');
	}
	
}
function switchOpp(){
	show=GM_getValue('show_football_opponents');
	GM_setValue('show_football_opponents', show ? false : true );
	window.location.href = window.location.href; //refresh page
}

GM_registerMenuCommand((show ? 'Hide' : 'Show') + ' Fantasy Football Opponents', switchOpp);

function fonts(){
	fonts=GM_getValue('no_font_cloud');
	GM_setValue('no_font_cloud', fonts ? false : true );
	window.location.href = window.location.href; //refresh page
}

GM_registerMenuCommand((fonts ? 'Do Not' : '') + ' Normalize Fantasy Football Stat font size', fonts);