// ==UserScript==
// @name			Twitter Follow Helper
// @author			Sylvain Comte
// @namespace		http://sylvain.comte.online.fr
// @description		Display several informations about the twitter profile your looking at to help you decide wether or not s/he's worth following
// @version			0.6.1
// @licence creative-commons by-nc-sa
// @include    http://twitter.com*
// @include    http://www.twitter.com*
// @include    https://twitter.com*
// @include    https://www.twitter.com*
// ==/UserScript==

/******* TFH **********/
// all infos about tfh are at bit.ly/scolProdTFH

// Styling
GM_addStyle(".showMoreWhen {display:block} .naturallyHidden {display:none} .showMoreWhen:hover .naturallyHidden {display:inline}");
GM_addStyle(".label {font-weight:bold}");
GM_addStyle("#TFH-propBy {margin:0;padding:0 0.25em;font-style:italic;text-align:right;font-size:0.75em; #TFH-propBy a {text-decoration:underline}");

/********** SCRIPT VERSION CONTROL 0.5 *************/
// Any help about this functions can be found at
// http://sylvain.comte.online.fr/AirCarnet/?post/GreaseMonkey-Script-Update-Control
/* parameters */
/* SET YOUR OWN SCRIPT VALUES */
var thisId=74862;		// your script userscript id
var thisVersion="0.6.1";		// the @version metadata value
var thisReleaseDate="20120530"; // release date of your script. Not mandatory, use this paramater
								// only if you want to be sharp on version control frequency.
/* script version control parameters */
var GMSUCtime=14;   // Delay before alert disapears (seconds)
                    // set to 0 if you don't want it to disapear (might be a bit intrusive!)
var GMSUCfreq=3;    // Update control frequency (days)

/* colorpalettes */
	// feel free to create your own. color in this order : back, highlight, front, light.
	var cpChrome=new colorPalette("#E1ECFE","#FD2","#4277CF","#FFF");	// but for Firefox ;-)
	var cpUserscript=new colorPalette("#000","#F80","#FFF","#EEE");		// javascrgeek only
	var cpFlickr=new colorPalette("#FFF","#FF0084","#0063DC","#FFF");	// pink my blue
// choose yours
var GMSUCPal=cpUserscript; 	// colorPalette you prefer
/* launching script version control  */
GM_scriptVersionControl();

// define launch function
function GM_scriptVersionControl() {
	if(self.location==top.location) { // avoid script execution in each frame of the page
		// test if script should be performed to control new release regarding frequency
		var GMSUCreleaseDate=new Date();
		GMSUCreleaseDate.setFullYear(eval(thisReleaseDate.substring(0,4)),eval(thisReleaseDate.substring(4,6))-1,eval(thisReleaseDate.substring(6,8)));
		var GMSUCtoday=new Date(); var GMSUCdif=Math.floor((GMSUCtoday-GMSUCreleaseDate)/1000/60/60/24);
		if (GMSUCdif%GMSUCfreq==0) {
			GMSUC_Control();
			}}}

// define control function
function GMSUC_Control() {
	var scriptId=thisId;var version=thisVersion;
	var scriptUrl="http://userscripts.org/scripts/source/"+scriptId+".meta.js";
	// go to script home page to get official release number and compare it to current one
	GM_xmlhttpRequest({
		method: 'GET',
		url: scriptUrl,
		headers: {
			 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			 'Accept': 'text/html,application/xml,text/xml',
			 },
		onload: function(responseDetails) {
			var textResp=responseDetails.responseText;
			var offRel=/\/\/\s*@version\s*(.*)\s*\n/i.exec(textResp)[1];
			var scriptName=/\/\/\s*@name\s*(.*)\s*\n/i.exec(textResp)[1];
			if(offRel!=version) {
				// Styling
				GM_addStyle("#GMSUC-alerte {position:absolute;top:5px;left:50%;margin:20px 0 0 -128px;padding:6px;width:250px;z-index:42;-moz-border-radius:6px;background:"+GMSUCPal.back+";border:"+GMSUCPal.light+" 1px solid;color:"+GMSUCPal.front+";font-size:1em;text-align:center} #GMSUC-alerte a {font-weight:bold;font-size:1em} #GMSUC-alerte * {color:"+GMSUCPal.front+";} #GMSUC-alerte table {width:100%;margin:0.5em 0 0 0} #GMSUC-alerte td {width:33%;text-align:center;border:solid 1px "+GMSUCPal.front+"} #GMSUC-alerte td:hover{background:"+GMSUCPal.high+"} #GMSUC-alerte td:hover a {color:"+GMSUCPal.front+"} #GMSUC-timer {font:2em bold;margin:0.5em 0 0 0} #GMSUC-info {text-align:right;font:0.5em serif;margin:1em 0 0 0} #GMSUC-info a {font:75% serif}  #GMSUC-info a:hover {background:"+GMSUCPal.front+";color:"+GMSUCPal.back+"}");
				// Lang detection and apply
				var Langues="en, fr";
				var lang=navigator.language;
				var reg=new RegExp(lang,"g");
				if(!Langues.match(lang)) lang="en";
				/* traductions / translations */
					var Txt=new Array();
					for(i=1;i<7;i++) {Txt[i]=new Array();} 
					// français
					Txt[1]["fr"]="Vous utilisez la version";
					Txt[2]["fr"]="du script";
					Txt[3]["fr"]="La version officielle est différente";
					Txt[4]["fr"]="installer";
					Txt[5]["fr"]="voir le code";
					Txt[6]["fr"]="propulsé par";
					// english
					Txt[1]["en"]="You're using";
					Txt[2]["en"]="version of";
					Txt[3]["en"]="script. Official release version is different";
					Txt[4]["en"]="install";
					Txt[5]["en"]="view code";
					Txt[6]["en"]="powered by";
				/* ------------------------------- */	
				var alerte=document.createElement('div');
				alerte.setAttribute('id','GMSUC-alerte');
				var GMSUCtextAlerte=Txt[1][lang]+" "+version+" "+Txt[2][lang]+" <i><b>"+scriptName+"</b></i>";
				GMSUCtextAlerte+=". "+Txt[3][lang]+" (<a href='http://userscripts.org/scripts/show/"+scriptId+"'>"+offRel+"</a>)";
				GMSUCtextAlerte+="";
				GMSUCtextAlerte+="<table><tr><td><a href='http://userscripts.org/scripts/show/"+scriptId+"'>v."+offRel+"</a></td><td><a href='http://userscripts.org/scripts/review/"+scriptId+"'>"+Txt[5][lang]+"</a></td><td><a  href='http://userscripts.org/scripts/source/"+scriptId+".user.js'>"+Txt[4][lang]+"</a></td></tr></table>"
				if(GMSUCtime>0) GMSUCtextAlerte+="<div id='GMSUC-timer'>"+GMSUCtime+" s</div>";
				GMSUCtextAlerte+="<div id='GMSUC-info'>"+Txt[6][lang]+" <a href='http://sylvain.comte.online.fr/AirCarnet/?post/GreaseMonkey-Script-Update-Control'>GM Script Update Control</a></div>";
				document.body.appendChild(alerte);
				document.getElementById('GMSUC-alerte').innerHTML=GMSUCtextAlerte;
				if(GMSUCtime>0) {
					function disparition() {
						if(GMSUCtime>0) {
							document.getElementById("GMSUC-timer").innerHTML=GMSUCtime+" s";
							GMSUCtime+=-1;
							setTimeout(disparition,1000)
							}
						else document.getElementById("GMSUC-alerte").setAttribute("style","display:none");
						}
					disparition();
					}
				}
			}
		});
	}
/* Color palette creator */	
function colorPalette(b,h,f,l) {this.back=b;this.high=h;this.front=f;this.light=l;}	
/******* END OF SCRIPT VERSION CONTROL **********/

// variables
var you=null; 			// who are you?	
var yFng,yFrs,yList;	// store some stats about you here. Add elsewhere with GM data storing?
var user;				// who is the user?
var Datas=new Array();	// a Data collector, in case you are a Data geek ;-)

// execution
giveMeInfos();

// functions
function giveMeInfos() {
	// let's wait for jQuery to load (Twitter does this) then launch 
    if(typeof unsafeWindow.jQuery=='undefined') window.setTimeout(giveMeInfos,10);
    else {
		jQ=unsafeWindow.jQuery;
		linkify();
		seekDatas();
		}
	}
	
function linkify() {
	if(typeof jQ('.js-action-profile')[0]=='undefined') window.setTimeout(linkify,42);
	else {
		jQ('a').bind('click',function () {
			if(jQ(this).hasClass('twitter-atreply')) {
				var id=jQ(this).attr('data-screen-name');
				window.location="https://twitter.com/"+id;
				}
			if(jQ(this).hasClass('js-action-profile')) {
				var id=jQ(this).attr('href').split("/#!/")[1];
				window.location="https://twitter.com/"+id;
				}	
			});
		}	
	}	

function seekDatas() {	
	// waiting for f... "new" twitter ajax ui to load
	if(typeof jQ('.screen-name')[0]=='undefined') window.setTimeout(seekDatas,10);
	else {
		user=jQ('.screen-name')[0].innerHTML.split('<s>@</s>')[1];
		Datas[user]=new Array();
		Datas[user][0]=user;
		// corrigé suite à mise à jour Twitter v0.5c
		var test;
		Datas[user][1]=jQ('.stats li strong')[0].innerHTML;Datas[user][1]=Datas[user][1].replace(/[, ]/g,"");
		Datas[user][2]=jQ('.stats li strong')[1].innerHTML;Datas[user][2]=Datas[user][2].replace(/[, ]/g,"");
		Datas[user][3]=jQ('.stats li strong')[2].innerHTML;Datas[user][3]=Datas[user][3].replace(/[, ]/g,"");
		var moreInfosConteneur=document.createElement("div");
			moreInfosConteneur.id="TFH-moreInfosConteneur";
			moreInfosConteneur.setAttribute("class","module component");
		var moreInfos=document.createElement("div");
			moreInfos.id="TFH-moreInfos";
			moreInfos.setAttribute("class","flex-module");
		var moreInfosList=document.createElement("ul");
			moreInfosList.id="TFH-moreInfosList-g";
		//	moreInfosList.setAttribute("class","TFH-moreInfosList");
		for(var i=0;i<5;i++) {
			var item=document.createElement("li");
			item.id="TFH-i-"+i;
			moreInfosList.appendChild(item);
			}
		moreInfos.appendChild(moreInfosList);
		moreInfosList=document.createElement("ul");
		moreInfosList.id="TFH-moreInfosList-d";
	//	moreInfosList.setAttribute("class","TFH-moreInfosList");
		for(var i=5;i<9;i++) {
			var item=document.createElement("li");
			item.id="TFH-i-"+i;
			moreInfosList.appendChild(item);
			}
		moreInfos.appendChild(moreInfosList);
		var propBy=document.createElement("div");
			propBy.id="TFH-propBy";
			propBy.setAttribute("class","flex-module");
			propBy.innerHTML="informations provided by <a href='http://twitter.com/sycom'>@sycom</a>'s <a href='http://sylvain.comte.online.fr/AirCarnet/?post/Twitter-Follow-Helper'>Twitter Follow Helper</a>";
		with(moreInfosConteneur) {
			appendChild(propBy);
			appendChild(moreInfos);
			}
			jQ('.module')[1].id="TFH-firstSpacer";
			jQ('#TFH-firstSpacer').after(moreInfosConteneur);
			// get your user name
			if(you==null && jQ(".js-mini-current-user")[0]) you=jQ(".js-mini-current-user")[0].getAttribute("data-screen-name");
			// data search
			followingYou(user,0);
			getSocialData(you,user,1);
			getRepliesAndFollowCost(user,2,4);
		//	getFavstarData(user,3); suspended for the moment
			getKloutScore(user,5)
			getSearchPop(user,6);
		//	getRtRank(user,7); not working now. Api key required...
			discoverMore(user,8);
		}
	}
	
// dispatching datas on the screen
function displayDatas(data,j) {
	var li=jQ('#TFH-i-'+j);
    li.html(data);
	}

function followingYou(username,k) {
	// following control. Have to change this. Might be very simpler...
	var htm="<span class='label'>Following you?</span> <span style='font-style:italic'>asking...</span>";
	displayDatas(htm,k);
	if(you==null) {
		htm="tell me <a href='login'>who you are</a> please";
		displayDatas(htm,k);
		}
	else {	
		if(you==user) {
			htm="<li><span class='label'>Following yourself</span> :-)</li>";
			displayDatas(htm,k);
			Datas[user][4]=1;
			}
		else {		
			var doesFollowUrl="http://www.doesfollow.com/"+username+"/"+you;
			GM_xmlhttpRequest({
				method: 'GET',
				url: doesFollowUrl,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible)',
					 'Accept': 'text/html,application/xml,text/xml',
					 },
				onload: function(responseDetails) {
					var textResp=responseDetails.responseText;
					var doesFollow=/>yup</.test(textResp);
					if(doesFollow==true) {
						htm="<span class='label'>Following you?</span>&nbsp;<a href='http://www.doesfollow.com/"+username+"/"+you+"'>Yes</a> <span style='font-size:1.5em'>&#9786;</span>";
						Datas[user][4]=1;
						}
					else {
						htm="<span class='label'>Following you?</span>&nbsp;<a href='http://www.doesfollow.com/"+username+"/"+you+"'>No</a> <span style='font-size:1.5em'>&#9785;</span>";
						Datas[user][4]=0;
						}
					displayDatas(htm,k);
					},
				onerror: function(responseDetails) {
					var htm="Can't tell you if  <a href='http://www.doesfollow.com/"+username+"/"+you+"' class='url'>"+username+" follows you</a>";
					displayDatas(htm,k);
					}
				});
			}
		}
	}		

function getRepliesAndFollowCost(username,k,l) {
// followCost from http://followcost.com and @replay %
	var htm="<span class='label'>@replies</span> <a href='http://followcost.com/" + username +"' class='url'><span style='font-style:italic'>loading...</span></a>";
	displayDatas(htm,k);
	htm="<span class='label'>Follow Cost</span> <span style='font-style:italic'>loading...</span>";
	displayDatas(htm,l);
	jQ.getJSON("http://followcost.com/"+username+".json?callback=?", function(json) {
		Datas[user][5]=json.at_reply_index;Datas[user][6]=json.milliscobles_recently;Datas[user][7]=json.milliscobles_all_time;Datas[user][8]=json.average_tweets_per_day_recently;
		
		if(json.at_reply_index==null) htm="unable to retrieve <span class='label'>@replies</span> rate";
		else htm="<span class='label'>@replies</span> <a href='http://followcost.com/" + username +"' class='url'>"+ json.at_reply_index +" %</a>";
		displayDatas(htm,k)

		if(json.milliscobles_recently==0) htm="<span class='label'>Follow Cost</span><br/>&nbsp;&nbsp;-&nbsp;<a href='http://followcost.com/" + username +"' class='url'>0 tweet a day </a>recently<br/>&nbsp;&nbsp;-&nbsp;<a href='http://followcost.com/" + username +"' class='url'>"+Math.round(json.milliscobles_recently)+" m&Sigma; ("+Math.round(json.milliscobles_all_time)+" all time)</a>";

		else htm="<span class='label'>Follow Cost</span><br/>&nbsp;&nbsp;-&nbsp;<a href='http://followcost.com/" + username +"' class='url'>"+Math.round(json.average_tweets_per_day_recently)+" tweets a day </a>recently<br/>&nbsp;&nbsp;-&nbsp;<a href='http://followcost.com/" + username +"' class='url'>"+Math.round(json.milliscobles_recently)+" m&Sigma; ("+Math.round(json.milliscobles_all_time)+" all time)</a>";

        displayDatas(htm,l);
		});
    }

function getSocialData(user0,user1,k) {
// common following / followers from http://twtrfrnd.com/
	if(user0!=null) {
		var htm="<span class='label'>Social graph</span> convergence <a href='http://twtrfrnd.com/"+user0+"/"+user1+"' class='url'><span style='font-style:italic'>loading...</span></a>";
		displayDatas(htm,k);
		if(user0!=user1) {
			var twtrfrndUrl="http://twtrfrnd.com/"+user0+"/"+user1;
			GM_xmlhttpRequest({
				method: 'GET',
				url: twtrfrndUrl,
				headers: {
					 'User-agent': 'Mozilla/4.0 (compatible)',
					 'Accept': 'text/html,application/xml,text/xml',
					 },
				onload: function(responseDetails) {
					var textResp=responseDetails.responseText;
					// get some usefull data for you
					yFng=/is following (\w+) (person|people)/.exec(textResp)[1];
					yFrs=/is followed by (\w+) (person|people)/.exec(textResp)[1];
					var cFollowers,cFriends,cIndic,convergence;
					if(/has protected their account/.test(textResp)) {
						var htm="no <span class='label'>Social graph</span> (protected account)";
						}
					else {
						var htm="";
						// apprentice : "Hey, what's this 'convergence'?"
						// me : "it's an indicator of common friends & followers"
						if(/There are no people that follow both users/.test(textResp)) {
							htm+="<br/>&nbsp;&nbsp;- no common followers";
							convergence=0;
							cFollowers=0;
							}
						else {
							cFollowers=/The (\w+) (person|people) that follow[s]{0,1} both users/.exec(textResp)[1];
							htm+="<br/>&nbsp;&nbsp;- <a href='http://twtrfrnd.com/"+user0+"/"+user1+"#groupFollowers' class='url'>"+cFollowers+" follower(s) in common</a>";						
							convergence=eval(Math.sqrt(cFollowers*cFollowers/yFrs/Datas[user][3]));
							}
						if(/There are no people that both users follow/.test(textResp)) {
							htm+="<br/>&nbsp;&nbsp;- no common friend";
							convergence=convergence/3;
							cFriends=0;
							}
						else {
							cFriends=/The (\w+) (person|people) that both users follow/.exec(textResp)[1];
							htm+="<br/>&nbsp;&nbsp;- <a href='http://twtrfrnd.com/"+user0+"/"+user1+"#groupFriends' class='url'>"+cFriends+" friend(s) in common</a>";
							convergence=(convergence+2*eval(Math.sqrt(cFriends*cFriends/yFng/Datas[user][2])))/3;
							}
						if(/There are no people @/.test(textResp)) {
							htm+="<br/>&nbsp;&nbsp;- no indicator";
							cIndic=0;
							}
						else {
							//var regIndic=new RegExp("The (\\w+) (person|people) @"+user0+" follows that follow @");
							cIndic=/The (\w+) (person|people) @/.exec(textResp)[1];
							htm+="<br/>&nbsp;&nbsp;- <a href='http://twtrfrnd.com/"+user0+"/"+user1+"#groupIndicators' class='url' alt='people you follow that follow "+user1+"'>"+cIndic+" indicators</a>";
							}
						convergence=Math.round(convergence*10000)/100;
						Datas[user][11]=convergence;Datas[user][12]=cFollowers;Datas[user][13]=cFriends;Datas[user][14]=cIndic;
						htm="<span class='label'>Social graph</span> convergence : "+convergence+"%"+htm;
						}	
					displayDatas(htm,k);
					},
				onerror: function(responseDetails) {
					var htm="unable to extract social graph data from <a href='http://twtrfrnd.com/'>twtrfrnd</a>";
					displayDatas(htm,k);
					}
				});
			}
		else {
			htm="<span class='label'>Social graph</span> convergence for yourself is 100% of course";
			displayDatas(htm,k);
			}
		}	
	}

function getKloutScore(username,k) {
	// klout score from http://klout.com you'll have to 
	// get YOUR OWN API key to perform this (http://developer.klout.com)
	// It's free so don't hurt mine please.
	var kId;
	var kKey="ed"+(9*9+1)+"vycfm"+3+"rb"+(7*9)+"yx"+3+"w4pay"+(7*9-1);
	var htm="<span class='label'>Klout Score</span> <a href='http://klout.com'><span style='font-style:italic'>loading...</span></a>";
	displayDatas(htm,k);
	// retrieving klout id
	var kloutUrl1="http://api.klout.com/v2/identity.json/twitter?screenName="+username+"&key="+kKey;
	GM_xmlhttpRequest({
		method: 'GET',
		url: kloutUrl1,
		headers: {
			 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			 'Accept': 'text/html,application/xml,text/xml',
			 },
		onload: function(responseDetails) {
			eval("var jsonResp=("+responseDetails.responseText+")");
			kId=jsonResp.id;
			var kloutUrl2="http://api.klout.com/v2/user.json/"+kId+"/score?key="+kKey;
			GM_xmlhttpRequest({
				method: 'GET',
				url: kloutUrl2,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
					'Accept': 'text/html,application/xml,text/xml',
					},
				onload: function(responseDetails) {
					eval("var jsonResp=("+responseDetails.responseText+")");
					var kloutScore=Math.round(jsonResp.score*10)/10;
					htm="<span class='label'>Klout Score</span> <a href='http://klout.com' class='url'>"+kloutScore+"</a>";
					displayDatas(htm,k);
					Datas[user][17]=kloutScore;
					},
				onerror: function(responseDetails) {
					var textResp=responseDetails;
					htm="<span class='label'>Klout Score</span> <a href='http://www.klout.com' class='url'> not retrieved</a>";
					displayDatas(htm,k);
					}
				});
			},
		onerror: function(responseDetails) {
			var textResp=responseDetails;
			htm="<span class='label'>Klout Score</span> <a href='http://www.klout.com' class='url'> not retrieved</a>";
			displayDatas(htm,k);
			}
		});
	}

function getSearchPop(username,k) {
	var htm="<span class='label'>Search score</span> <a href='http://twitter.com/#search?q=%40"+username+"'><span style='font-style:italic'>loading...</span></a>";
	displayDatas(htm,k);
	var searchUrl="http://search.twitter.com/search.json?callback=?&q=@"+username;
	jQ.getJSON(searchUrl,function(json) {
		var resp;
		if(json["results"].length>=14) {
			resp=json["results"][14].created_at;
			var timePost=new Date(resp);
			var elapsed=(new Date()-timePost)/1000/60/60;
			var mentions,score;
			if(elapsed!=0) {
				htm="<span class='label'>Search score</span>&nbsp;<a href='http://twitter.com/#search?q=%40"+username+"'>"+Math.round(14*24/elapsed)+" mentions a day</a>";
				Datas[user][16]=Math.round(14*24/elapsed);
				}
			else {
				htm="<span class='label'>Search score</span> <a href='http://twitter.com/#search?q=%40"+username+"'>no mention recently</a>";
				Datas[user][16]=0;
				}
			}
		else htm="<span class='label'>Search score</span> <a href='http://twitter.com/#search?q=%40"+username+"'>not enough mentioned</a>";
		displayDatas(htm,k);
		});	
	}

function discoverMore(username,k) {
	// get people this user is finding interessant via http://autoff.com
	var htm="<span class='label'>People s/he likes</span> <a href='http://autoff.com/'><span style='font-style:italic'>asking autoFF...</span></a>";
	displayDatas(htm,k);
	var discovUrl="http://autoff.com/api/"+username;
	// don't know why, but getJSON sending me an error. So let's hack.
	GM_xmlhttpRequest({
		method: 'GET',
		url: discovUrl,
		headers: {
			 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			 'Accept': 'text/html,application/xml,text/xml,text/json',
			 },
		onload: function(responseDetails) {
			json=eval("new Array("+responseDetails.responseText+")");
			if(json.length>0) {
				htm="<span class='showMoreWhen'><span class='label'>People s/he likes</span>";
				if(json[0]) {
					var jsonMax;
					if(json[0].length<3) jsonMx=json[0].length; else jsonMax=3;
					for(var i=0;i<jsonMax;i++) {
						userId=json[0][i].split("@")[1];
						htm+="<br/>&nbsp;&nbsp;-&nbsp;<a href='"+userId+"'>"+json[0][i]+"</a>";
						}
					htm+="<span class='naturallyHidden'>";
					for(var i=jsonMax;i<json[0].length;i++) {
						userId=json[0][i].split("@")[1];
						htm+="<br/>&nbsp;&nbsp;-&nbsp;<a href='"+userId+"'>"+json[0][i]+"</a>";
						}
					htm+="</span></span>";
					}
				else htm="unable to find <span class='label'>People s/he likes</span> with <a href='http://autoff.com/'>autoFF</a>";
				}
			else htm="unable to find <span class='label'>People s/he likes</span> with <a href='http://autoff.com/'>autoFF</a>";
			displayDatas(htm,k);
			},
		onerror: function(responseDetails) {
			htm="unable to find <span class='label'>People s/he likes</span> with <a href='http://autoff.com/'>autoFF</a>";
			displayDatas(htm,k);
			}
		});
	}
	
// support functions
function hasClass(element,classe) {
	return (' '+element.className+' ').indexOf(' '+classe+' ')>-1;
	}