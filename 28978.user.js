// ==UserScript==
// @name           Forum Navbar
// @namespace      saintjimmy
// @description    Brings the forum link back to the Navigation header
// @include        http://*myspace.com/*
// ==/UserScript==

(function appendForums() {

	//main navigation bar
	var newli = document.createElement('li'); 
	newli.id = 'nav1000199';
	newli.className = 'dropDown';
	newli.innerHTML = '<a href="http://forums.myspace.com/">Forums&nbsp;<small>&#9660;</small></a>';
	/* old version
	   newli.innerHTML = '<a href="http://forums.myspace.com/" id="nav5" onmouseover="msglobalnav.toggle(\'5\',true);">Forums&nbsp;<small>&#9660;</small></a>'; // onmouseout="msglobalnav.toggle(\'5\',false);"
	*/
	document.getElementById('leftNav').appendChild(newli);

	//sub navigation bar
	var newul = document.createElement('ul');
	newul.className = 'subMenu';

	//http://x.myspacecdn.com/modules/common/static/js/myspacejs050.js
	//newul.id = 'subNav5';
	//newul.onmouseover = "msglobalnav.subToggle('5',true);";
	//newul.onmouseout = "msglobalnav.subToggle('5',false);msglobalnav.toggle(\'5\',false);"

	var subli1 = document.createElement('li');
	subli1.innerHTML = '<a href="http://forums.myspace.com/s/20.aspx?fuseaction=forums.viewsubforum">Automotive</a>'

	var subli2 = document.createElement('li');
	subli2.innerHTML = '<a href="http://forums.myspace.com/s/8.aspx?fuseaction=forums.viewsubforum">Business & Entrepreneurs</a>'

	var subli3 = document.createElement('li');
	subli3.innerHTML = '<a href="http://forums.myspace.com/s/12.aspx?fuseaction=forums.viewsubforum">Campus Life</a>'

	var subli4 = document.createElement('li');
	subli4.innerHTML = '<a href="http://forums.myspace.com/s/7.aspx?fuseaction=forums.viewsubforum">Career Center</a>'

	var subli5 = document.createElement('li');
	subli5.innerHTML = '<a href="http://forums.myspace.com/s/102.aspx?fuseaction=forums.viewsubforum">Comedy</a>'

	var subli6 = document.createElement('li');
	subli6.innerHTML = '<a href="http://forums.myspace.com/s/11.aspx?fuseaction=forums.viewsubforum">Computers & Technology</a>'

	var subli7 = document.createElement('li');
	subli7.innerHTML = '<a href="http://forums.myspace.com/s/9.aspx?fuseaction=forums.viewsubforum">Culture,Arts & Literature</a>'

	var subli8 = document.createElement('li');
	subli8.innerHTML = '<a href="http://forums.myspace.com/s/97.aspx?fuseaction=forums.viewsubforum">Filmmakers</a>'

	var subli9 = document.createElement('li');
	subli9.innerHTML = '<a href="http://forums.myspace.com/s/13.aspx?fuseaction=forums.viewsubforum">Food & Drink</a>'

	var subli10 = document.createElement('li');
	subli10.innerHTML = '<a href="http://forums.myspace.com/s/18.aspx?fuseaction=forums.viewsubforum">Games</a>'

	var subli11 = document.createElement('li');
	subli11.innerHTML = '<a href="http://forums.myspace.com/1.aspx?fuseaction=forums.viewforum">General Discussion</a>'

	var subli12 = document.createElement('li');
	subli12.innerHTML = '<a href="http://forums.myspace.com/s/17.aspx?fuseaction=forums.viewsubforum">Health & Fitness</a>'

	var subli13 = document.createElement('li');
	subli13.innerHTML = '<a href="http://forums.myspace.com/s/3.aspx?fuseaction=forums.viewsubforum">Love & Relationships</a>'

	var subli14 = document.createElement('li');
	subli14.innerHTML = '<a href="http://forums.myspace.com/s/5.aspx?fuseaction=forums.viewsubforum">Movies</a>'

	var subli15 = document.createElement('li');
	subli15.innerHTML = '<a href="http://forums.myspace.com/s/4.aspx?fuseaction=forums.viewsubforum">Music</a>'

	var subli16 = document.createElement('li');
	subli16.innerHTML = '<a href="http://forums.myspace.com/s/2.aspx?fuseaction=forums.viewsubforum">Myspace</a>'

	var subli17 = document.createElement('li');
	subli17.innerHTML = '<a href="http://forums.myspace.com/s/15.aspx?fuseaction=forums.viewsubforum">News & Politics</a>'

	var subli18 = document.createElement('li');
	subli18.innerHTML = '<a href="http://forums.myspace.com/s/16.aspx?fuseaction=forums.viewsubforum">Religion & Philosophy</a>'

	var subli19 = document.createElement('li');
	subli19.innerHTML = '<a href="http://forums.myspace.com/s/21.aspx?fuseaction=forums.viewsubforum">Science</a>'

	var subli20 = document.createElement('li');
	subli20.innerHTML = '<a href="http://forums.myspace.com/s/19.aspx?fuseaction=forums.viewsubforum">Sports</a>'

	var subli21 = document.createElement('li');
	subli21.innerHTML = '<a href="http://forums.myspace.com/s/6.aspx?fuseaction=forums.viewsubforum">Television</a>'

	var subli22 = document.createElement('li');
	subli22.className = 'last';
	subli22.innerHTML = '<a href="http://forums.myspace.com/s/10.aspx?fuseaction=forums.viewsubforum">Travel & Vacations</a>'

	var subli23 = document.createElement('li');
	subli23.className = 'last';
	subli23.innerHTML = '<a href="http://forums.myspace.com/s/1918.aspx?fuseaction=forums.viewsubforum">Fashion</a>'

	//var subli23 = document.createElement('li');
	//subli23.className = 'last';
	//subli23.innerHTML = '<a onclick="msglobalnav.toggle(\'5\',false);" href="#">[X]CLOSE</a>';
	//onmouseout="msglobalnav.toggle(\'5\',false);"

	newul.appendChild(subli1);
	newul.appendChild(subli2);
	newul.appendChild(subli3);
	newul.appendChild(subli4);
	newul.appendChild(subli5);
	newul.appendChild(subli6);
	newul.appendChild(subli7);
	newul.appendChild(subli23);
	newul.appendChild(subli8);
	newul.appendChild(subli9);
	newul.appendChild(subli10);
	newul.appendChild(subli11);
	newul.appendChild(subli12);
	newul.appendChild(subli13);
	newul.appendChild(subli14);
	newul.appendChild(subli15);
	newul.appendChild(subli16);
	newul.appendChild(subli17);
	newul.appendChild(subli18);
	newul.appendChild(subli19);
	newul.appendChild(subli20);
	newul.appendChild(subli21);
	newul.appendChild(subli22);
	//newul.appendChild(subli23);

	document.getElementById('nav1000199').appendChild(newul);

	//Groups Support
	//main navigation bar
	/*
	var newli2 = document.createElement('li');
	newli2.innerHTML = '<a href="http://groups.myspace.com/" id="nav6" onmouseover="msglobalnav.toggle(\'6\',true);">Groups&nbsp;<small>&#9660;</small></a>';

	document.getElementById('leftNav').appendChild(newli2);
	
	var groupUL = document.createElement('ul');
	groupUL.id = 'subNav6';
	groupUL.onmouseover = "msglobalnav.subToggle('6',true);";
	groupUL.onmouseout =  "msglobalnav.subToggle('6',false);msglobalnav.toggle('6',false);";

	var groupList = new Array();
	groupList[0] = document.createElement('a');
	groupList[0].setAttribute('href','http://groups.myspace.com');
	groupList[0].innerHTML = 'group name here';
	
	groupList[1] = document.createElement('a');
	groupList[1].setAttribute('href','http://groups.myspace.com');
	groupList[1].innerHTML = 'group name here 2';

	for(var i=0;i<groupList.length;i++){
		var groupLI = document.createElement('li');
		groupLI.innerHTML = groupList[i];
		groupUL.appendChild(groupLI);
	}

	document.getElementById('subnav').appendChild(groupUL);
	*/
})();