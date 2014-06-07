// ==UserScript==
// @name		WOIM Instant get link
// @description	Instant get link download from WOIM for free member
// @include		http://www.woim.net/music/download/*
// @include		http://woim.net/music/download/*
// @version		0.11Test
// ==/UserScript==

var downloadc = 1;

var downloadt;



function get_link_handleResponse() {

	try {

		if((http.readyState == 4)&&(http.status == 200)){

			var response = http.responseText;

			//alert(response);

			document.getElementById("download_status").style.display = "none";

			document.getElementById("linkdown").innerHTML = response;

		}

  	}

	catch(e){}

	finally{}

}



function get_link() {

	ok = false;



	try{

		

		http.open('POST', base_url + 'music/get_link');

		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		http.onreadystatechange = get_link_handleResponse;

		http.send('act=get_link&id=19908&key=Pm2ofw');



	}

	catch(e){}

	finally{}



	return ok;

}



function timeDownCount()

{

	document.getElementById("timeclock").innerHTML = downloadc;

	downloadc=downloadc-1;

	if (downloadc <0) {

		get_link();

		//exit();

	} else {

		downloadt=setTimeout("timeDownCount()",1000);

	}

}

document.getElementById("download_status").style.display = "block";

timeDownCount();