// ==UserScript==
// @name            Pd Chat++
// @namespace       Taki
// @icon            http://static.pardus.at/various/logo/pardus_logo64_cap.png
// @description     Displays online members in AC
// @include         http://chat.pardus.at/chat.php*
// ==/UserScript==

// Features: Auto-update (each minute), own images (in source), links on names (popup)
//   for a pleasant experience with the Pardus Chat :)


// User variables, enable (true) or disbale (false) features you (don't) like. DEFAULT for ALL = true;
//
//-----------------------------------------------------------------------------------------------
var user_onlinelist = true;                                   //the onlinelist (why would you dissable that? :o )
//-----------------------------------------------------------------------------------------------
    var user_display_online_member_amount = true;             //the "(x members online)" text
        // alternatively, you can set it to a number, then it won't be shown if there are less
        // then X members online. Try 7 or 8, it's convenient;
//-----------------------------------------------------------------------------------------------
    var user_display_offline_members = true;                  //display offline users or not
//-----------------------------------------------------------------------------------------------


// STARTING HERE, DON'T CHANGE ANYTHING UNLESS YOU KNOW WHAT YOU'RE DOING

// v1.9.2 - adjusting feature improved.
// v1.9.1 - bugfixes 
//      *div back inside the td. yay dom-knowledge
//      *logging on somewhere else (= making current session void) doesn't cause crash
// v1.9 - integrating some user-variables
// v1.8 - more code changes (for the better, I think)
// v1.7 - code and performance-improvement
// v1.6 - removed delayed display, automated resizing no longer dependand on the chatWnd
// v1.5 - automatically resizing now to fit in line with the chatWnd
// APPROVAL SENT - APPROVED (11-05-18)
// v1.4 - caching alliancemembers now (= -1 XHR), other fixes
// v1.3 - caching character name now (= -1 htmlrequest), changed fed_on img a bit (more greenish, less blue)
// APPROVAL SENT - REJECTED. (too many htmlrequests)
// v1.2 - removed some includes, needed another (total 3) xmlhttprequest now.
// v1.1 - working even smoother
// v1.0 - everything working smoothly
// v0.2 - xmlhttprequests working, 
// v0.2 - new start
// RESTARTED SCRIPT DEVELOPMENT: 
//   the GM_xmlhttpRequest on messages_alliance.php did trigger the new-ALLY-message notification in the msgframe
//   this was seen as inacceptible and had been quickly circumvented. Seniors cannot be read anymore (except if you
//   would be a senior what defeats the purpose of highlighting them to get better(?) information)
// v0.1.3 - further cleanup ... frame should come next ^_^
// v0.1.2.1 - removed global http, keep giving the value further;
// v0.1.2 - reading/storing users working
// v0.1.1 - xmlhttprequest working
// v0.1 - general testing if it works as intended

function _memberData(){ //object to inject into _memberlist array
	this.on=false;
	this.name="";
	this.fac="";
}
var _image = [ // pictures as string 0=emp_on, 1=emp_off, 2=fed_on, 3=fed_off, 4=neu_on, 5=neu_off, 6=uni_on, 7=uni_off
//emp
"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0B%00%00%00%0D%08%03%00%00%00H%2Bd%09%00%00%00%7BPLTE%EF%00%01%DD%00%01%C5%00%01%B4%00%01%9A%00%01%95%00%01%88%00%01%7D%00%01%F9%00%00%F4%00%00%F4%01%00%EF%01%00%EE%00%00%DD%00%00%DD%01%00%CB%00%00%CB%01%00%C5%00%00%C5%01%00%BF%00%00%B4%00%00%B4%01%00%B3%00%00%9A%00%00%9A%01%00%99%00%00%95%00%00%88%00%00%88%01%00%7D%00%00%7D%01%00w%00%00v%00%00%FF%17%17%FF%18%18%FF--%FFpp%FFqq%FF%A3%A3%FF%FF%FF%FF%FF%FF%D1%8Fv%E3%00%00%00)tRNS%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%00R%F4%20%87%00%00%00wIDATx%DAT%8D%D1%0E%C2%20%14C%AB%E2%1C2D%C0%E1%B8%E8%04%99%C8%FF%7F%A1%98%18%8D%7D%3Ai%9A%1E%D4_%F0%CF1%D0%99.%F1%CDW%B6Y%2B%7D%F2%BB%8A%C8%AC%04%1F%A4%9Dn%08N%F6)%A7%FE0v%20%23%D2R%96%24%0C%C1%1Fy.%CF%92%F7j%02%E9%A1%F5%8F%BB%D0%F4%DD%CB1%20z%BB%12%1C%ED'%A2%CE%DE%19%A5%9D%9F%3F%5E%B6%ED%9A%F7%25%C0%00%C0~%0Ek%A4Y%8A%96%00%00%00%00IEND%AEB%60%82",
"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0B%00%00%00%0D%08%03%00%00%00H%2Bd%09%00%00%00%06PLTEf%00%00%00%00%00%7B%CAU%88%00%00%00%02tRNS%FF%00%E5%B70J%00%00%00%13IDATx%DAb%60D%00%06d%F6%20%00%00%01%06%00%0C%FC%00%17%ADx%93%E6%00%00%00%00IEND%AEB%60%82",
//fed
"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0B%00%00%00%0D%08%03%00%00%00H%2Bd%09%00%00%00%8APLTE%00%7C%F9%00x%F4%00y%F4%00v%EF%00w%EF%00v%EE%00m%DD%00n%DD%00d%CB%00e%CB%00a%C5%00b%C5%00_%BF%00Y%B4%00Z%B4%00Y%B3%00K%9A%00L%9A%00N%9A%00L%99%00J%95%00K%95%00B%88%00C%88%00E%88%00%3D%7D%00%3E%7D%00%3F%7D%00%3Bw%00%3Bv%17%8A%FF%18%8B%FF-%95%FFp%B7%FFq%B7%FF%A3%D1%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%23%D1%0D%11%00%00%00%26tRNS%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%00%A7z%81%BC%00%00%00vIDATx%DAT%8D%EB%0E%C2%20%18C%2Bl%227%99%F0)%9B%0Ac%22%EF%FF%8Abb4%F6%D7I%D3%F4%A0%FD%82%7FN%91NtIo%BE%FA%A3%96%DA%86%5BC%F2F%0Cl%14f%BA%23%3A%81%5C2%F6v%06)%9E%B7%BAe%AE%08%E1%C0J%7D%D6%B2%93%13H%8F%BD%7F%AC%5C%D3w%2FlD%0AFp6%F4%9F%84%B6%04%A7%A4va%F9x%FDy%EE%DE%97%00%03%001%99%0C%84A%FD%F1%81%00%00%00%00IEND%AEB%60%82",
"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0B%00%00%00%0D%08%03%00%00%00H%2Bd%09%00%00%00%06PLTE33f%00%00%00%DFE%A6E%00%00%00%02tRNS%FF%00%E5%B70J%00%00%00%13IDATx%DAb%60D%00%06d%F6%20%00%00%01%06%00%0C%FC%00%17%ADx%93%E6%00%00%00%00IEND%AEB%60%82",
//neu
"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0B%00%00%00%0D%08%03%00%00%00H%2Bd%09%00%00%00lPLTE%FF%FF%FF%D3%D3%D3%BB%BB%BB%9B%9B%9B%91%91%91%90%90%90%82%82%82%80%80%80~~~%7D%7D%7DuuullljjjgggbbbaaaUUUSSSMMMGGGDDD%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%2F%E3%EE%3C%00%00%00%16tRNS%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%00%01%D2%C0%E4%00%00%00_IDATx%DAT%8DI%0E%C0%20%0C%03%034%10%F6%00%E1%FF_-%B4%87R%9F%AC%915%86%F9%05%FE%5Dz%E3%D6e%F7%C1%25%C5TxL%10%CE%81%9C%0F%99%05z%0D%16%0D%DAP%3A%B4D%A8%95FJ%0D8%3A%A3%40%19%17yq%BF%F9%B5%F9%B9%7F%3D%F4x%96%BF.%7F%DD%FE%E3%F7%16%60%00%8E%9C%07%C8%8B%B1%7B%ED%00%00%00%00IEND%AEB%60%82",
"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0B%00%00%00%0D%08%03%00%00%00H%2Bd%09%00%00%00%06PLTE333%00%00%00%23%96Y%D5%00%00%00%02tRNS%FF%00%E5%B70J%00%00%00%13IDATx%DAb%60D%00%06d%F6%20%00%00%01%06%00%0C%FC%00%17%ADx%93%E6%00%00%00%00IEND%AEB%60%82",
//uni
"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0B%00%00%00%0D%08%03%00%00%00H%2Bd%09%00%00%00lPLTE%F9%A4%00%F4%A2%00%F4%A3%00%EF%9E%00%EF%9F%00%EE%9E%00%DD%93%00%CB%86%00%CB%87%00%C5%83%00%BF~%00%B4x%00%B3v%00%9Af%00%9Ag%00%99e%00%95b%00%95c%00%88%5B%00%88%5C%00%7DS%00%7DT%00wO%00%FF%B1%17%FF%B0%18%FF%B8-%FF%CEp%FF%CFq%B4v%00%9Ad%00%88Y%00%7DR%00vM%00%FF%DF%A3%FF%FF%FF%00%00%00%B4%0F%A0%A6%00%00%00%24tRNS%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%00X%2C%0D%0D%00%00%00sIDATx%DAT%8DQ%0E%C2%20%10D%07K%A9P%EC%0AZ%91*%ED%22%F7%BF%A3%DB%C4%A4q%BE%5E%5E%263hG%F0%CF%1C%C3%25%DCx%E7%7By%DB%C1%8E%B45pq%A6S%BDq%D3%03%D1%1B%A4%9C%60%C6%15%C1%EA%B4%D4%25i%1B%40g%95%EB%A7%E6%D30%89%EF%C5%BF%9E%BB%3F%FA%11L%CEh%D5%C9%0E%A3%CD%E4e%DF%D3%FC%FB-%D7U~%BF%02%0C%00%E4%A1%0B~%F1%F1*%D6%00%00%00%00IEND%AEB%60%82",
"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0B%00%00%00%0D%08%03%00%00%00H%2Bd%09%00%00%00%06PLTEff%00%00%00%00m%B8%D7e%00%00%00%02tRNS%FF%00%E5%B70J%00%00%00%13IDATx%DAb%60D%00%06d%F6%20%00%00%01%06%00%0C%FC%00%17%ADx%93%E6%00%00%00%00IEND%AEB%60%82",
//spacer
"data:image/gif,GIF89a%0B%00%01%00%80%00%00%00%00%00%00%00%00!%F9%04%01%00%00%00%00%2C%00%00%00%00%0B%00%01%00%00%02%03%84%8FP%00%3B"
];

var _memberlist = [];  // will have the members inserted
var _onlinelist = [];  // will have onlinelist inserted

var univ; // will be the universe e.g. "orion"
var chat; // will be the chat e.g. "ally"
var imagepacklocation; // will be the path where user gets his images from (to support imagepacks)
var user; // will have a combination of universe + charactername stored e.g. "orion:Baldur_"
var doitid = 0;
var doitruns = -1; // from -1 to 2 -> stores the amount of runs 
var version="1.9.2";

function cleanUp(){
    if (GM_getValue("Version:",0)!=version){
        var values = GM_listValues();
        for(i=0;i<values.length;i++){
            GM_deleteValue(values[i]);
        }
        GM_setValue("Version:",version);
    }
}

function checkLocation(){ // output [univ][chat][imagepacklocation], RETURN "chat"-name
    //get imagepack location
    var check = document.getElementsByTagName("body")[0].getAttribute("onload");
    imagepacklocation = check.slice(check.indexOf("preloadImages(")+14,check.indexOf("tab.png"));
    //get chatname
	check = document.getElementsByTagName("iframe")[0].getAttribute("src");
    chat = check.slice(check.indexOf("=")+1,check.indexOf("\&"));
    //get universe
    univ = check.slice(check.lastIndexOf("=")+1,check.length).toLowerCase();
    return chat;
}

function checkUser(){ // output [user] set/read "universe:nickname_"
	var allusers = GM_getValue("users",""); //something along "artemis:name_orion:name_pegasus:name_"
	var ohook = allusers.indexOf(univ+":");
	if(ohook>-1){
		ohook += univ.length+1;
		var chook = allusers.indexOf("_",ohook);
		user = allusers.slice(ohook,chook); //if there is a user stored for current universe
	}else{
		GM_xmlhttpRequest({ //overview_stats to get character name
			method: "GET",
			url: "http://"+univ+".pardus.at/overview_stats.php",
			onerror: function(resp0){
				GM_log("minor error occured @ 3");
			},
			onload: function(resp0){
				var resp = resp0.responseText;
				var respuser = resp.slice(resp.indexOf("<b>")+"<b>".length,resp.indexOf("</b>")); //extracts plain charactername
				allusers += univ+":"+respuser+"_";
				GM_setValue("users",allusers); //injects example "orion:baldur_"
				checkUser();
			}
		});
	}
}

function checkTime(time){ // output "date" RETURN[needtoupdate]
	var d = new Date();
    if (time == "day"){ // used to get new allylist
        var today = d.getUTCDate();
        var check = GM_getValue(univ+"day",-1);
        if(check==today)return false; //don't update
        else{
            GM_setValue(univ+"day",today);
            return true; //update members
        }
    }
    else if(time == "minute"){ // used to get new onlinelist
        var thisminute = d.getUTCMinutes();
        var check = GM_getValue(univ+"minute",-1);
        if(check==thisminute)return false; // don't update
        else{
            if(user_onlinelist){
                switch(doitruns){
                case 0: // full minute found, update-time to minute + 2 sec
                    var adjust = d.getUTCSeconds();
                    doitid = setInterval(doIt,getDifferenceSeconds(adjust,true));
                    doitruns++;
                    break;
                case 1: // updating at :02 now. adjusting to 60s.
                    clearInterval(doitid);
                    doitid = setInterval(doIt,60000);
                    doitruns++;
                    break;
                default: // do nothing
                    break;
                }
            }
            GM_setValue(univ+"minute",thisminute);
            return true; //update onlinelist
        }
    }
}

function getDifferenceSeconds(second,ms){
    var difference = 62-second;
    if(difference>59){
        difference -= 60;
    }
    if(difference<2){
        difference += 2;
    }
    if(ms){
        difference *=1000;
    }
    return difference
}

function createDisplay(){//create contentbox
		//thanks spoilerhead for your big help here
		//get needed hooks
		var iframe = document.getElementsByTagName("iframe")[0];
		var iconbar = iframe.nextSibling.nextSibling.nextSibling;
		var chatbar = iconbar.nextSibling.nextSibling;
		var title = iframe.previousSibling;
		var currentTD = iframe.parentNode;
		var currentTR = currentTD.parentNode;

		//create new content
		var newTD = document.createElement("td");
		newTD.setAttribute("style","width:130px;background:url(+"+imagepacklocation+"bgdark.gif)")
		newTD.setAttribute("name","Onlinelist");
		currentTD.parentNode.insertBefore(newTD, currentTD);

		//Move top stuff into own cell
		var newTRHeader = document.createElement("tr");
		var ins = document.createElement("td");
		ins.setAttribute("colspan","2");
		ins.appendChild(title);
		newTRHeader.appendChild(ins);
		currentTR.parentNode.insertBefore(newTRHeader, currentTR);

		//move bottom stuff into own cell
		var newTRbottom = document.createElement("tr");
		var ins = document.createElement("td");
		ins.setAttribute("colspan","2");
		ins.appendChild(iconbar);
		ins.appendChild(chatbar);
		newTRbottom.appendChild(ins);
		currentTR.parentNode.insertBefore(newTRbottom, currentTR.nextSibling);
        
        var newDIV = document.createElement("div");
        var myTD = document.getElementsByName("Onlinelist")[0];
		newDIV.setAttribute("style","height:"+getHeight()+"px;vertical-align:top;overflow-x:hidden;overflow-y:auto;");
        newDIV.setAttribute("name","Onlinelistcontent");
        myTD.appendChild(newDIV);
        
}

function getHeight(){
	var height = window.innerHeight - 220;
	if(height<0){
		height = 0;
	}
	return height;
}

function doIt(){ // XMLHttpRequest (2x, myalliance.php & statistics.php&display=onlinelist) calls most other functions
    doitruns++;
    var onlinelisturl = "http://"+univ+".pardus.at/statistics.php?display=onlinelist";
    var memberlisturl = "http://"+univ+".pardus.at/myalliance.php";
    
    if(checkTime("minute")){
	GM_xmlhttpRequest({
		method: "GET",
		url: onlinelisturl,
		onerror: function(resp1){
			GM_log("critical error @ 1");
		},
		onload: function(resp1){
            if(resp1.finalUrl==onlinelisturl){ // checking for active session.
                if(checkTime("day")){ // if need for update:
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: memberlisturl,
                        onerror: function(resp2){
                            GM_log(" critical error @ 2");
                        },
                        onload: function(resp2){
                            if(resp2.finalUrl==memberlisturl){
                                initialize(true,true,resp1.responseText,resp2.responseText); // update 
                            }
                        }
                    });
                }else{
                    initialize(true,false,resp1.responseText);
                }
            }
            else{
            clearInterval(doitid);
            var list = document.getElementsByName("Onlinelistcontent")[0];
            list.innerHTML = "reload page";
            }
		}
	});
    }else{
    initialize(false,false);
    }
}

function initialize(saveo,savem,resp1,resp2){ // void initialize([bool]updateOnlinelist,[bool]updateMemberlist,XHR1.responseText,XHR2.responseText);
	if(saveo){
        saveOnlineList(resp1);
    }
	if(savem){ //save == true
		saveMemberList(resp2,getFactionAlignment(resp2));
	}
    loadOnlineList();
    loadMemberList();
    compareLists();
    printList();
}

function saveMemberList(resp1,alignment){ //output [.name (.fac)]
	var ohook = resp1.lastIndexOf("Members</th>"); //could only mess with alliances leaders page this way.
	var chook;
	var hashindex;
	var max = resp1.lastIndexOf(">Number of members:");
	var save = "";
	var selffound=false;
	for(i=0;;i++){
		ohook = resp1.indexOf("(",ohook+1);
		chook = resp1.indexOf(")",ohook);
		if(!selffound){
			if(resp1.slice(ohook+2,chook-1)==user){
				selffound=true;
				if(resp1.indexOf("(",ohook+1)>max)break;
				continue;
			}
		}
		save += resp1.slice(ohook+2,chook-1)+","; //get .name
		if(alignment!="non"){ //get .fac
			save += alignment; //get .fac
		}else{ 
			hashindex = resp1.indexOf("#",ohook+1);
			if((hashindex>resp1.indexOf("(",ohook+1))||(hashindex>max)||(hashindex==-1)){
				save += "neu";
			}else{
				fac = resp1.charAt(hashindex+1);
				switch(fac){ //d = emp, c=uni, 4=fed
				case "d":
					fac="emp";
					break;
				case "4":
					fac="fed";
					break;
				case "c":
					fac="uni";
					break;
				}
				save += fac;
			}
		}
		if(resp1.indexOf("(",ohook+1)>max)break;
		save += ",";
	}
	GM_setValue("membersof"+univ,save);
}

function getFactionAlignment(resp1){ //output [.fac]
	var hook = resp1.indexOf("<i",resp1.indexOf("Faction alignment:"));
	var alignment = "";
	if(resp1.charAt(hook+2)==">"){
		alignment = "non";                                                    //no faction alignment <i">"None
	}else{
		alignment = resp1.slice(resp1.indexOf("_16x16.png",hook)-3,resp1.indexOf("_16x16.png",hook)); //get faction alignment <i"m"g src...
	}
	return alignment;
}
		
function loadMemberList(){// puts info from GM_ "membersof"+univ into _memberlist
	var load = GM_getValue("membersof"+univ);
	var ohook = 0;
	var chook = load.indexOf(",");
	var nextisname=true;
	for(i=0;;i++){
		switch(nextisname){
		case true:
			_memberlist[i] = new _memberData();
			_memberlist[i].name = load.slice(ohook,chook);
			nextisname = false;
			break;
		case false:
			i--;
			_memberlist[i].fac = load.slice(ohook,chook);
			nextisname = true;
			break;
		}
		if(chook==load.length){
			break;
		}
		ohook = load.indexOf(",",ohook)+1;
		chook = load.indexOf(",",ohook);
		if(chook==-1){
			chook=load.length;
		}
	}
}
		
function saveOnlineList(resp2){ //output [names of online players]
	var ohook = resp2.indexOf("<table class=\'messagestyle\'>");
	var chook;
	var max = resp2.lastIndexOf("<ta"); //searches last <ta(ble) in the response
    var save = "";
	for(i=0;;i++){
		ohook = resp2.indexOf("(",ohook+1);
		chook = resp2.indexOf(")",ohook);
		save += resp2.slice(ohook+2,chook-1);
		if(resp2.indexOf("(",ohook+1)>max){
            GM_setValue("onlinein"+univ,save);
            break;
        }
        save += ",";
	}
}

function loadOnlineList(){// puts info from GM_ "membersof"+univ into _memberlist
	var load = GM_getValue("onlinein"+univ);
	var ohook = 0;
	var chook = load.indexOf(",");
	for(i=0;;i++){
        _onlinelist[i] = load.slice(ohook,chook);
		if(chook==load.length){
			break;
		}
		ohook = load.indexOf(",",ohook)+1;
		chook = load.indexOf(",",ohook+1);
		if(chook==-1){
			chook=load.length;
		}
	}
}

function compareLists(){ // compares [.name] and [names of online players] output [.on]
	for(i=0;i<_memberlist.length;i++){
		for(j=0;j<_onlinelist.length;j++){
			if(_memberlist[i].name==_onlinelist[j]){
				_memberlist[i].on = true;
				break;
			}
		}
	}
}

function printList(){ // output SET[html/complete onlinelist] into sidebar
		var list = document.getElementsByName("Onlinelistcontent")[0];
		list.innerHTML = getListHtml();
}

function getListHtml(){ // output RETURN[html/complete onlinelist]
    var html = "";
	var change = html.length;
	var onlinehtml = getMemberHtml(true,user_display_online_member_amount); // add html from online members
    html += onlinehtml;
    if(user_display_offline_members){
        var offlinehtml = getMemberHtml(false); // add html from offline members
        if((onlinehtml.length>0)&&(offlinehtml.length>0)){
            html += "<br>"
        }
        html += offlinehtml;
    }
	return html;
}
		
function getMemberHtml(status,check){ //status= true "online" or false "offline", RETURN[html/img+title+user]
	var rhtml = "";
    var count = 0;
	for(i=0;i<_memberlist.length;i++){
		if(status==_memberlist[i].on){
			rhtml += getMemberImage(i)+"<a href=\"http://"+univ+".pardus.at/sendmsg.php?to="+_memberlist[i].name+"\" "
			+"onclick=\"window.open('http://"+univ+".pardus.at/sendmsg.php?to="+_memberlist[i].name+"',"
			+"'popup','width=540,height=424,scrollbars=no,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=0,top=0'); return false;\">"
			+_memberlist[i].name+"</a><br>";
            count++;
		}
	}
    if(status){
        switch(typeof check){
        case "number":
            if((count>=check)&&(check>0)){
                rhtml += "<div name=\"Onlinelistonlinemembercount\" style=\"color:#606060;font-size:10px;\"><img src=\""+_image[8]+"\"> (" + count + " online)</div>";
            }
            break;
        case "boolean":
            if((check)&&(count>0)){
                rhtml += "<div name=\"Onlinelistonlinemembercount\" style=\"color:#606060;font-size:10px;\"><img src=\""+_image[8]+"\"> (" + count + " online)</div>";
            }
            break;
        }
    }
	return rhtml;
}	
										
function getMemberImage(i){ // compares [.on] and [.fac], output RETURN[html/img+title]
	var j=0; // _image[j] j= 0=emp_on, 1=emp_off, 2=fed_on, 3=fed_off, 4=neu_on, 5=neu_off, 6=uni_on, 7=uni_off
	if(_memberlist[i].fac=="fed")j+=2;
	else if(_memberlist[i].fac=="neu")j+=4;
	else if(_memberlist[i].fac=="uni")j+=6;
	if(!_memberlist[i].on)j++;
	var imgcode = "<img src=\""+_image[j]+"\" border=\"0\" style=\"vertical-align:top;\" "+getImgTitle(i)+" alt=\""+_memberlist[i].fac+"_"+_memberlist[i].on+"\.png created by Takius Stargazer\"> ";
	return imgcode;
}
				
function getImgTitle(i){ // output RETURN[html/img title]
	if(_memberlist[i].on)return "title=\""+_memberlist[i].fac+"_on.png\"";
	else return "title=\""+_memberlist[i].fac+"_off.png\"";
}


// script starting here ^_^
cleanUp();	// run each version, deletes all GM_Values

checkLocation();
checkUser();
if((user_onlinelist)&&(chat=="ally")){
    document.getElementsByTagName("h1")[0].innerHTML += "++";
    createDisplay();
    doIt();
}


