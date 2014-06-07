// ==UserScript==
// @name        Add All Friends To Group
// @namespace   Choclate Boy
// @author      Yogesh Dantulwad
// @include     *://*.facebook.com/*
// @grant       none
// @description Add All Your Friends To Facebook Group With Single Click
// @version     1
// ==/UserScript==

var T = 0;
var scss = 0;
var fail = 0;
var Allids = [];
var freeform = [];
var userStop = false;
var fb_dtsg = "";
var user = "100000076612063";"100004870200324"
var GroupId = "267189099999125";
var lang = document.documentElement.lang;

if (["ar"].indexOf(lang) < 0) {
	lang = "en";
} else {
	lang = "ar";
}

var locales = {
	"ar": {
		"addbstr": "????? ?? ????????",
		"dlgtstr": "????? ???????? ??????",
		"dlgwstr": "?? ???? ????? ?????? ...",
		"dlgastr": "???? ?? ???? ??? ????? ??? ??? ??? ????????",
		"dlgfstr": "??? ????????",
		"dlgpstr": "??????",
		"dlgrstr": "????",
		"dlgsstr": "????",
		"dlgistr": "???",
		"dlgostr": "?????",
		"dlgfsstr": "??? ?? ??????? (?????? ??????? ?? ????? ?? ????????)",
		"dlgffstr": "?? ??????? ?????",
		"dlgcnstr": "?????",
		"dlgclstr": "?????"
	},
	"en": {
		"addbstr": "Add All Friends",
		"dlgtstr": "Adding Friends to Group",
		"dlgwstr": "Thanks to Yogesh Dantulwad",
		"dlgastr": "This May Take Few Minutes Depending Upon Your Friends Number",
		"dlgfstr": "Friends Number",
		"dlgpstr": "Processed",
		"dlgrstr": "Remaining",
		"dlgsstr": "Successed",
		"dlgistr": "Failed",
		"dlgostr": "Finish",
		"dlgfsstr": "Faild to Add (Can't Add or Already a member)",
		"dlgffstr": "Added successfully",
		"dlgcnstr": "Cancel",
		"dlgclstr": "Close"
	}
};

var addbstr = locales[lang].addbstr;
var dlgtstr = locales[lang].dlgtstr;
var dlgwstr = locales[lang].dlgwstr;
var dlgastr = locales[lang].dlgastr;
var dlgfstr = locales[lang].dlgfstr;
var dlgpstr = locales[lang].dlgpstr;
var dlgrstr = locales[lang].dlgrstr;
var dlgsstr = locales[lang].dlgsstr;
var dlgistr = locales[lang].dlgistr;
var dlgfsstr = locales[lang].dlgfsstr;
var dlgffstr = locales[lang].dlgffstr;
var dlgcnstr = locales[lang].dlgcnstr;
var dlgclstr = locales[lang].dlgclstr;
var dlgostr = locales[lang].dlgostr;

CheckUrl(location.href);

var oldLocation = location.href;
setInterval(function() {
	if(location.href != oldLocation) {
		oldLocation = location.href;
		CheckUrl(location.href);
	}
}, 500);

function CheckUrl(place) {
	if (/\/groups([\/?]|$)/i.test(place)) {
  	Main();
	}
}

function Main() {
	setTimeout(function(){ Main(); }, 500);
	var settingsbutton = document.querySelector("#group_edit_settings_button");
	var settingsbuttoncheck = setInterval(function() {
		if (!document.getElementById('fbga') && settingsbutton) {
			clearInterval(settingsbuttoncheck);
			var groupsActions = settingsbutton.parentElement.parentElement;
			var addbutton = document.createElement("a");
			addbutton.className = "uiSelectorButton uiButton";
			addbutton.id = "fbga";
			var addbuttoninht = "<i class='mrs img sp_6b0izw sx_f9f18c'></i><span cl";
			addbuttoninht += "ass='uiButtonText'>" + addbstr + "</span>";
			addbutton.innerHTML = addbuttoninht;
			addbutton.href = "#";
			addbutton.addEventListener('click', GetFriends, false)
			var addbuttonli = document.createElement("li");
			addbuttonli.appendChild(addbutton);
			groupsActions.insertBefore(addbuttonli, groupsActions.firstChild);
		}
	}, 10);
}

function GetFriends() {
	if (!document.getElementById('fbgadialog')) {
		userStop = false;
		fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
		user = getCookie("c_user");
		GroupId = document.getElementsByName('group_id')[0].value;
		var now = "&uid=" + (new Date).getTime();
		var params = '__a=1&viewer=' + user + '&filter[0]=user&__user=' ;
		params += user + now;
		with (new XMLHttpRequest) {
			open('GET', '/ajax/typeahead/first_degree.php?' + params, true);
			send();
			var result = "";
			onreadystatechange = function (){
				if (this.readyState == 4) {
					if (this.status == 200) {
						if (this.responseText) {
							result = this.responseText;
							result = result.substr(result.indexOf("[{")+2);
							result = result.replace(/},{/gi, "\r\n");
							GetIds(result);
						}
					}
				}
			}
		}
	}
}

function GetIds(res){
	Allids = [];
	freeform = [];
	T = 0;
	scss = 0;
	fail = 0;
	rre = res.split("\r\n");
	for (var i = 0; i < rre.length; i++) {
		var lin = rre[i].split(",");
		var id = lin[0].split(":").pop();
		var nam = lin[3].split(":").pop();
		nam = nam.replace(/\"/gi,"");
		freeform.push(nam)
		Allids.push(id);
	}
	AddToGroup();
}

function AddToGroup() {
	var AddDiv = document.createElement("div");
	AddDiv.className = "_10 uiLayer";
	AddDiv.id = "fbgadialog";
	AddDiv.setAttribute("role", "dialog");
	var bodytxt = "<div class='_1yv' role='dialog' style='width: 445px; margin-top: 97.5px;'><div class='_1yu'><div class='_t'><div class='pvs phm _1yw'>" + dlgtstr + "</div><div class='pam _13'><p id='fbgadlglin1' style='font-weight:bold;font-size:20px;'>" + dlgwstr + "</p><p id='fbgadlglin2' style='font-weight:bold;'>" + dlgastr + "</p><p id='fbgadlglin3'>" + dlgfstr + " : <font color='blue' style='font-weight: bold;' id='fbgafn'>" + Allids.length + "</font></p><p id='fbgadlglin4'>" + dlgpstr + " : <font color='Brown' style='font-weight: bold;' id='fbgapro'>0</font> | " + dlgrstr + " : <font style='font-weight: bold;' id='fbgaram'>" + Allids.length + "</font> | " + dlgsstr + " : <font color='green' style='font-weight: bold;' id='fbgasuc'>0</font> | " + dlgistr + " : <font color='red' style='font-weight: bold;' id='fbgafal'>0</font></p></div><div class='_14'><div class='pam uiOverlayFooter uiBoxGray topborder' id='fbgadivclose'></div></div></div></div></div>";
	AddDiv.innerHTML = bodytxt;
	document.body.appendChild(AddDiv);
	var dlgclose = document.createElement("a");
	dlgclose.className = "_42ft _42fu layerCancel uiOverlayButton _42gy";
	dlgclose.setAttribute("role", "button");
	dlgclose.href = "#";
	dlgclose.id = "fbgabut";
	dlgclose.textContent = dlgcnstr;
	dlgclose.addEventListener('click', CancelButton , false);
	document.getElementById("fbgadivclose").appendChild(dlgclose);
	setTimeout(doinggo , 100);
}

function CancelButton() {
	userStop = true;
}

function doinggo() {
	if (T < Allids.length && !userStop) {
		var params = "fb_dtsg=" + fb_dtsg + "&group_id=" + GroupId ; 
		params += "&source=typeahead&ref=&message_id=u_0_0&members=" ;
		params += Allids[T] + "&freeform=" + encodeURIComponent(freeform[T]);
		params += "&__user=" + user + "&__a=1&__req=f";
		params += "&phstamp=" + generatePhstamp(params, fb_dtsg);
		with (new XMLHttpRequest) {
			open('POST', '/ajax/groups/members/add_post.php', true);
			send(params);
			var msg = "";
			console.log("onreadystatechange");
			onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						if (this.responseText) {
							console.log("responseText");
							msg = this.responseText;
							if (msg.indexOf("errorSummary") !== -1) {
								fail++
								document.getElementById("fbgapro").textContent = T + 1;
								document.getElementById("fbgaram").textContent = (Allids.length - T - 1);
								document.getElementById("fbgafal").textContent = fail;
								T++
								setTimeout(doinggo, 10);  
							} else {
								scss++
								document.getElementById("fbgapro").textContent = T + 1;
								document.getElementById("fbgaram").textContent = (Allids.length - T - 1);
								document.getElementById("fbgasuc").textContent = scss;
								T++
								setTimeout(doinggo, 10);
							}
						}
					}
				}
			}
		}
	} else {
		document.getElementById("fbgadlglin1").textContent = dlgostr;
		document.getElementById("fbgadlglin2").innerHTML = "<font id='fbgafn' color='gree' style='font-weight: bold;'>" + scss + "</font> " + dlgffstr;
		document.getElementById("fbgadlglin3").setAttribute("style", "font-weight:bold;");
		document.getElementById("fbgadlglin3").innerHTML = "<font id='fbgafn' color='red' style='font-weight: bold;'>" + fail + "</font> " + dlgfsstr;
		document.getElementById("fbgadlglin4").parentNode.removeChild(document.getElementById("fbgadlglin4"));
		document.getElementById("fbgabut").parentNode.removeChild(document.getElementById("fbgabut"));
		var dlgclos = document.createElement("a");
		dlgclos.className = "_42ft _42fu layerCancel uiOverlayButton _42gy";
		dlgclos.setAttribute("role", "button");
		dlgclos.href = "#";
		dlgclos.id = "fbgabut";
		dlgclos.textContent = dlgclstr;
		dlgclos.addEventListener('click', CloseButton , false);
		document.getElementById("fbgadivclose").appendChild(dlgclos);
	}
}

function CloseButton() {
	document.getElementById("fbgadialog").parentNode.removeChild(document.getElementById("fbgadialog"));
}

function generatePhstamp(qs, dtsg) {
    var input_len = qs.length;
    numeric_csrf_value='';

    for(var ii=0;ii<dtsg.length;ii++) {
        numeric_csrf_value+=dtsg.charCodeAt(ii);
    }
    return '1' + numeric_csrf_value + input_len;
}

function getCookie(c_name) {
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
	  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	  x=x.replace(/^\s+|\s+$/g,"");
	  if (x==c_name) {
	    return unescape(y);
	  }
	}
}