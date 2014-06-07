// ==UserScript==
// @name           iconify
// @namespace      userscripts.org
// @include        http*what.cd/*
// ==/UserScript==

// check if stylesheet is in use?
//if ((document.innerHTML).toString().indexOf("static/styles/minimal/style.css") != -1) {

  // element & pos
  var edit = [$x("//ul[@id='userinfo_username']/li/a")[1], '0 -322px'];
  var logout = [$x("//ul[@id='userinfo_username']/li/a")[2], '0 -679px'];
  var uploads = [$x("//ul[@id='userinfo_minor']/li/a")[1], '0 -918px'];
  var bookmarks = [$x("//ul[@id='userinfo_minor']/li/a")[2], '0 -872px'];
  var notifications = [$x("//ul[@id='userinfo_minor']/li/a")[3], '0 -83px'];
  var posts = [$x("//ul[@id='userinfo_minor']/li/a")[4], '0 -276px'];;
  var friends = [$x("//ul[@id='userinfo_minor']/li/a")[5], '0 -633px'];
  var invite = [$x("//ul[@id='userinfo_major']/li/strong/a")[1], '0 -230px'];
  var donate = [$x("//ul[@id='userinfo_major']/li/strong/a")[2], '0 -725px'];
  var all = [edit, logout, uploads, bookmarks, notifications, posts, friends, invite, donate], item, i, l;

  // iconify
  for (i=0, l=all.length; i<l; i++) {
    all[i][0].style.backgroundColor = 'transparent';
    all[i][0].style.backgroundRepeat = 'no-repeat';
    all[i][0].style.backgroundImage = 'url(http://dl.getdropbox.com/u/407115/minimal/images/sprite.png)';
    all[i][0].style.backgroundPosition = all[i][1];
  }
//}

function $x() {
	var x='',          // default values
	node=document,
	type=0,
	fix=true,
	i=0,
	toAr=function(xp){      // XPathResult to array
		var final=[], next;
		while(next=xp.iterateNext())
			final.push(next);
		return final
	},
	cur;
	while (cur=arguments[i++])      // argument handler
		switch(typeof cur) {
			case "string":x+=(x=='') ? cur : " | " + cur;continue;
			case "number":type=cur;continue;
			case "object":node=cur;continue;
			case "boolean":fix=cur;continue;
		}
	if (fix) {      // array conversion logic
		if (type==6) type=4;
		if (type==7) type=5;
	}
	if (!/^\//.test(x)) x="//"+x;         	 // selection mistake helper
	if (node!=document && !/^\./.test(x)) x="."+x;  // context mistake helper
	var temp=document.evaluate(x,node,null,type,null); //evaluate!
if (fix)
	switch(type) {                              // automatically return special type
		case 1:return temp.numberValue;
		case 2:return temp.stringValue;
		case 3:return temp.booleanValue;
		case 8:return temp.singleNodeValue;
		case 9:return temp.singleNodeValue;
	}
	return fix ? toAr(temp) : temp;
}