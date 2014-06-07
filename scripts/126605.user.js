// ==UserScript==
// @name           Think Statistical Thoughts
// @namespace      http://celestialmechanics.net/
// @include        http://www.furaffinity.net/stats/*
// ==/UserScript==

var x = document.getElementsByClassName("info");

var regex = /(<([^>]+)>)/ig;

for(i = 0; i < x.length; i++) {
	dl = x[i].firstChild.nextSibling;
	dt = dl.firstChild.nextSibling;
	views = dt.nextSibling.nextSibling;
	favorites = views.nextSibling.nextSibling;
	comments = favorites.nextSibling.nextSibling;
	
	views = views.innerHTML;
	favorites = favorites.innerHTML;
	comments = comments.innerHTML;
	
	
	views = views.replace(regex, "");
	views = views.substr(views.indexOf(" ") + 1);
	favorites = favorites.replace(regex, "");
	favorites = favorites.substr(favorites.indexOf(" ") + 1);
	comments = comments.replace(regex, "");
	comments = comments.substr(comments.indexOf(" ") + 1);
	
	mydate = dt.getElementsByClassName("popup_date")[0].title;
	mydated = mydate.substr(mydate.indexOf(" ") + 1);
	mydater = mydated.substr(mydated.indexOf(" ") + 1);
	mydated = parseInt(mydated.substr(0, mydated.indexOf(" ")));
	mydatem = mydate.substr(0, mydate.indexOf(" "));
	
	mydate = mydated + " " + mydatem + " " + mydater;
	
	mydate2 = new Date(Date.parse(mydate));
	
	age = (Date.now() - mydate2) / (3600 * 24 * 1000);
	
	favr = favorites / age;
	viewr = views / age;
	comr = comments / age;
	lover = favr / viewr;
	
	dl.innerHTML += "<dd><span>Age:</span>" + Math.round(age * 100) / 100 + " days</dd>";
	dl.innerHTML += "<dd><span>Fave Rate:</span>" + Math.round(favr * 100) / 100 + " favorites/day</dd>";
	dl.innerHTML += "<dd><span>View Rate:</span>" + Math.round(viewr * 100) / 100 + " views/day</dd>";
	dl.innerHTML += "<dd><span>Comm. Rate:</span>" + Math.round(comr * 100) / 100 + " comments/day</dd>";
	dl.innerHTML += "<dd><span>Love Rate:</span>" + Math.round(lover * 100) / 100 + " favorites/view</dd>";
}