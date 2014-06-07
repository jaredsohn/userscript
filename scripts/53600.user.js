// ==UserScript==
// @name		   dA premium member text removal
// @namespace	  eldris
// @include		http://*deviantart.com/*
// ==/UserScript==

//make it a function for var name encapsulation and neatness
function remove_premium() {

/*-----Profile pages-----*/

/*-login bar-*/
var temp = document.getElementById("logindock");

if(temp) {
	temp = document.getElementsByClassName("blend")[0];

	if(temp) {
		temp.innerHTML = temp.innerHTML.replace(/Premium Member/, "Deviant");
	}
}


/*-dev info-*/
temp = document.getElementById("gmi-GMFrame_BluesBar");
if(temp) {
	temp = document.getElementsByClassName("bb-with-sep")[1];

	if(temp) {
		temp.innerHTML = temp.innerHTML.replace(/Premium Membership/, "Subscription");
		temp.innerHTML = temp.innerHTML.replace(/Premium Member/, "Subscribed");
	}
}


/*-give menu-*/
temp = document.getElementById("give-give-give");

//all the ifs are in case dA's layout changes
if(temp) {
	temp = temp.children[0];
	if(temp) {
		temp = temp.children[0];
		if(temp) {
			temp = temp.children[0];
			if(temp) {
				temp.innerHTML = temp.innerHTML.replace(/Premium Membership/, "Subscription");
			}
		}
	}
}


/*-----submit deviation page-----*/

/*-ftp info box-*/
temp = document.getElementById("whichFileAltalt");

//lots of variations here because of different versions of the page's html
//Sticking to a narrow scope to edit to make sure things don't break
if(temp) {
	//new dev or new with items already in the upload area on page load
	var moreTemp = temp.children[9];
	if(moreTemp) {
		moreTemp = moreTemp.getElementsByTagName("strong")[0];
		if(moreTemp) {
			moreTemp.innerHTML = moreTemp.innerHTML.replace(/Premium Membership/, "Subscription");
		}
	}

	//editing a dev
	var moreTemp = temp.children[14];
	if(moreTemp) {
		moreTemp = moreTemp.getElementsByTagName("strong")[0];
		if(moreTemp) {
			moreTemp.innerHTML = moreTemp.innerHTML.replace(/Premium Membership/, "Subscription");
		}
	}

	//editing a dev with a preview
	var moreTemp = temp.children[16];
	if(moreTemp) {
		moreTemp = moreTemp.getElementsByTagName("strong")[0];
		if(moreTemp) {
			moreTemp.innerHTML = moreTemp.innerHTML.replace(/Premium Membership/, "Subscription");
		}
	}
}


/*-ftp more info "popup" box-*/
temp = document.getElementById("gb_ftp_box");
if(temp) {
	temp = temp.getElementsByClassName("agreement")[0];
	if(temp) {
	//	temp.innerHTML = temp.innerHTML.replace(/Premium Membership/, "Subscription");
	}
}


/*-critique info box-*/
temp = document.getElementById("devOptionsSection");
if(temp) {
	temp = temp.children[12];
	if(temp)
		temp.innerHTML = temp.innerHTML.replace(/Premium Membership/, "Subscription");
}


/*-----Journal submit page-----*/

/*-Journal text tab-*/
temp = document.getElementById("journal-tab-journaltext");
if(temp) {
	temp = temp.getElementsByClassName("subscription_pitch")[0];
	if(temp) {
		temp.innerHTML = temp.innerHTML.replace(/Premium Membership/, "Subscription");
	}
}

/*-Journal options tab-*/
temp = document.getElementById("journal-tab-options");
if(temp) {
	temp = temp.getElementsByClassName("subscription_pitch")[0];
	if(temp) {
		temp.innerHTML = temp.innerHTML.replace(/Premium Membership/, "Subscription");
	}
}



} //end function

remove_premium();