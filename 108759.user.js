// ==UserScript==
// @name           BotD Auto-updater
// @namespace      arreloco
// @include        http://www.kongregate.com/forums/*
// ==/UserScript==
function getMyDay(date) {
	switch (date.getDay()) {
	case 0 :
		return "Sunday";
		break;
	case 1 :
		return "Monday";
		break;
	case 2 :
		return "Tuesday";
		break;
	case 3 :
		return "Wednesday";
		break;
	case 4 :
		return "Thursday";
		break;
	case 5 :
		return "Friday";
		break;
	case 6 :
		return "Saturday";
		break;
	}
}
function getMyMonth(date) {
	switch (date.getMonth()) {
	case 0 :
		return "January";
		break;
	case 1 :
		return "February";
		break;
	case 2 :
		return "March";
		break;
	case 3 :
		return "April";
		break;
	case 4 :
		return "May";
		break;
	case 5 :
		return "June";
		break;
	case 6 :
		return "July";
		break;
	case 7 :
		return "August";
		break;
	case 8 :
		return "September";
		break;
	case 9 :
		return "October";
		break;
	case 10 :
		return "November";
		break;
	case 11 :
		return "December";
		break;
	}
}

setInterval(function updV() {
	try {
		op = document.getElementsByClassName("post_creator")[0].innerHTML;
	} catch (ex) {
		return;
	}
	ar = document.getElementById("forums").innerHTML.split("button_or");
	if(ar.length<4 && op == "Vizuna"){
		btn = document.createElement("span");
		btn.setAttribute("class", "button_or");
		btn.innerHTML = "| ";
		updateBtn = document.createElement("a");
		updateBtn.setAttribute("href", "javascript:void(0);");
		updateBtn.addEventListener("click", function (event) {
			day = prompt("Please, enter the number of the BotD", "");
			if (day == null) {
				return;
			}
			xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", "http://www.kongregate.com/badges", false);
			xmlhttp.send();
			page = xmlhttp.responseText;
			page = page.split("botd_content")[1].split("What's Badge of the Day?")[0];
			badge = page.split('title="')[1].split(' width')[0];
			badge = badge.replace(" (to be earned)\"","");
			badge = badge.replace(" (completed)\"","");
			badge += " Badge";
			alert(badge);
			page = page.split('badge_details')[1];
			gLink = page.split('href="')[1].split(' class=')[0];
			description = page.split('<em class')[1].split("<a href")[0];
			patt1 = /easy/g;
			patt2 = /medium/g;
			patt3 = /hard/g;
			if (patt1.test(description)) {
				points = 5;
				val = "<i>(easy - 5 points)</i>";
			} else if (patt2.test(description)) {
				points = 15;
				val = "<i>(medium - 15 points)</i>";
			} else if (patt3.test(description)) {
				points = 30;
				val = "<i>(hard - 30 points)</i>";
			}
			game = page.split(gLink)[2].split("</a>")[0].replace(">", "");
			d = new Date();
			var r = document.getElementById("edit_post_body").innerHTML;
			patt4 = /&lt;/g;
			patt5 = /&gt;/g;
			r = r.replace(patt4,"<");
			r = r.replace(patt5,">");
			ar = r.split("<br");
			totalPoints = parseInt(r.split("bonus points: <b>")[1].split("</b>"));
			totalPoints += points;
			avgPoints = parseInt(totalPoints/parseInt(day)*10)/10;
			avgPoints += "</b>";
			totalPoints = "Total bonus points: <b>"+totalPoints.toString();
			new_badge = day+". "+getMyDay(d)+", "+getMyMonth(d)+" "+d.getDate()+", "+d.getFullYear()+"<br><a href='"+gLink.replace('"', "")+"'>"+game+"</a><br><ul><li><b>"+badge+"</b>"+val+"</li></ul><br\>";
			ar[ar.length-2] = ">Average bonus points per day: <b>"+avgPoints;
			ar[ar.length-3] = ">"+totalPoints+"</b>";
			ar[ar.length-4] = ">"+new_badge;
			new_pst = ar.join("<br");
			document.getElementById("edit_post_body").innerHTML = new_pst;
		}, false);
		updateBtn.innerHTML = "update";
		btn.appendChild(updateBtn);
		try{
			table = document.getElementById("edit").getElementsByTagName("tbody")[0].getElementsByTagName("td")[2];
		}catch(ex){
			return;
		}
		table.appendChild(btn);
	}
}, 1000);
