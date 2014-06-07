// ==UserScript==
// @name           Last.fm forum user blocklist
// @namespace      http://www.google.com/search?q=brtkrbzhnv
// @description    Hide forum posts and shouts by silly people
// @include        http://www.last.fm/*
// ==/UserScript==
// 2009-05-03 update: fixed bug where subscribers' (and probably moderators' & staff's) shouts couldn't get blocked
// 2009-05-06 update: fixed bug with deleted users' shouts
k="lastfmignoreuserwithid=";
s="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAk1BMVEXQw8HKtrLAqqb1kYblh3n4e26yioX6bGCseG7TbF37X1TnY1b6VkymbGH7Sj/aUkSgYFP0OS6eUUHNPS+TRzj+JRurOinMLSCaNSL9FwrSIxWINirdHhHYGgDpFQDvEQCqJBH2DgCHLRz8DAHiFAHNGQvCGQDZDwCTIQ2BIQ6/EAGpEwCfFQGSFACCFgJ7FAD///91PAPPAAAAMXRSTlP///////////////////////////////////////////////////////////////8AH5pOIQAAAAlwSFlzAAALEgAACxIB0t1+/AAAACB0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVi7kSokAAAAFnRFWHRDcmVhdGlvbiBUaW1lADEwLzAyLzA1CBTb+gAAAMlJREFUeJw1j+FygjAQhC8iFIWggQOFCoKgSYrJ5f2fzpC2O3Mz++2fvQXnBRwfD0wgeH+cmsN+f2go/Q2+VRbHURTFmTpvAVf5sbFE1+wrV6kDsKJQJbgdnY65IAA+irF0jukqryoxJoC3mmDjoqJRdAjU1uT5Ulz0juqbD6aWmO5Ep5mjdkFAORt61k/PzM4Sga/TIueNHf7Ma+Jrl2mSxByU5i59reNmuUtDZNdhMGl43fRDUG/Of+Ps+9X3r/f/uDBfa+TBfwDTkR3R7CD2QwAAAABJRU5ErkJggg==";
main();
function main() {
	for (A=x("//UL[@class='commentUserDetails']"), i=0;a=A.snapshotItem(i++);)  {
		var wrapper = a.nextSibling.nextSibling;
		var avatar = a.childNodes[3];
		var span=a.getElementsByTagName("li")[0];
		var aa = a.getElementsByTagName("a")[0];
		var userid = aa ? ((href = aa.href).substring(href.indexOf('/user/')+6)) : "[deleted user]";
		var img = document.createElement("img");
		img.setAttribute("src",s);
		img.addEventListener("click",hideFunction(userid),false);
		wrapper.setAttribute("userid", userid);
		avatar.setAttribute("userid", userid);
		if (GM_getValue(k+userid)) hide(wrapper), hide(avatar);
		span.appendChild(img);
	}
	for (A=x("//STRONG[starts-with(@class,'author')]"), i=0;a=A.snapshotItem(i++);)  {
		var wrapper = a.nextSibling.nextSibling.nextSibling.nextSibling;
		var avatar = a.getElementsByTagName("span")[0];
		var span = a;
		var aa = a.getElementsByTagName("a")[0];
		var userid = aa ? ((href = aa.href).substring(href.indexOf('/user/')+6)) : "[deleted user]";
		var img = document.createElement("img");
		img.setAttribute("src",s);
		img.addEventListener("click",hideFunction(userid),false);
		wrapper.setAttribute("userid", userid);
		if(aa) avatar.setAttribute("userid", userid);
		if (GM_getValue(k+userid)) hide(wrapper), hide(avatar);
		span.appendChild(img);
	}
}
function x(q){
  return document.evaluate(q, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}
function hideFunction(i){
	return function(){ 
		// For forum posts:
		for (E=x("//div[@userid='"+i+"']"),ı=0;e=E.snapshotItem(ı++);) (e.style.display)=(e.style.display=="none")?(""):("none");
		for (E=x("//li[@userid='"+i+"']"),ı=0;e=E.snapshotItem(ı++);) GM_setValue(k+i, (e.style.display)=(e.style.display=="none")?(""):("none"));
		// For shouts:
		for (E=x("//span[@userid='"+i+"']"),ı=0;e=E.snapshotItem(ı++);) (e.style.display)=(e.style.display=="none")?(""):("none");
		for (E=x("//blockquote[@userid='"+i+"']"),ı=0;e=E.snapshotItem(ı++);) GM_setValue(k+i, (e.style.display)=(e.style.display=="none")?(""):("none"));
  };
} 

function hide(e){
	if(e) e.style.display="none";
}