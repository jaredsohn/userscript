// ==UserScript==
// @name           compare
// @namespace      bcmpinc
// @version        v1.00
// @description    Compare your score with others.
// @include        http://projecteuler.net/index.php?section=profile
// @include        http://projecteuler.net/index.php?section=profile&profile=*
// @copyright      2010 Bauke Conijn
// @author         bcmpinc
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

////////////////////////
// Convenience methods.

// Get single element using xpath
$=function(expr,node){
	if (node===undefined) node=document;
	var res=document.evaluate(expr,node,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null);
	if (res.singleNodeValue===null) throw(new Error("Error: no result '"+expr+"'"));
	return res.singleNodeValue;
}

// Get list of elements using xpath
$$=function(expr,node){
	if (node===undefined) node=document;
	var res=document.evaluate(expr,node,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var a=new Array();
	for(var i=0;i<res.snapshotLength;i++)a[i]=res.snapshotItem(i);
	return a;
}

// Create and append a new element
add=function(nodetype,node,pars){
	var e=document.createElement(nodetype);
	if (nodetype=="a" && pars.href===undefined) pars.href="javascript:;";
	for (p in pars) {
		if(p=="html")e.innerHTML=pars[p];
		if(p=="class")e.className=pars[p];
		else if (p=="click") e.addEventListener("click",pars[p],false);
		else e[p]=pars[p];
	}
	node.appendChild(e);
	return e;
}

// Remove an element
remove=function(e){
	e.parentNode.removeChild(e);
}

//////////////////////////////////
// Insert stylesheet with images.

// The images are from the Boomy Icon Set.
// They have been designed by Milosz Wlazlo.
// Downloaded from: http://miloszwl.deviantart.com.

GM_addStyle('\
.compare_show, .compare_compare, .compare_remove {\
padding: 0em 6px;\
position: relative; width:16px; height:16px; border: 0;\
color: transparent !important;\
}\
hr{\
background-color: #bbb;\
height: 2px;\
border: none;\
}\
.compare_show {\
background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAACV0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVggMjAwNId2rM8AAAAUdEVYdENyZWF0aW9uIFRpbWUAOS80LzA0eV6j1QAAAtRJREFUeJylk12IVGUYx3/ve86ZM2fPzjQTTn7sImoZq40aKLbRSmuyrFhoIEWw0EUQRF1LSWaiqYhX9iEIRTdBlFfS5gdGq4Q3QasLgsu2y+6OtKPt7szOnJnzOee8XQQrLtpNz+XD//nxv3h+QinF/xn9Uct3hRCXuz/oUZ0dvRnTWJf3mhMFvzF44efTt5ZmxdIGXX0Hnl/X88KRTU937lv5ZIa/Q42JUpnyn+OeMTd7wUiSDy//cKj0SMDWgZNv7Hqt99tt24v2736aO/frhE6TFYaG7jaZHh5GlKZH9SDov3L+cOkhwOZXP+7asX/38Iu7e6xP7nhMzTnYQQPdd7GaNdboiuW6hjM2ivhr5iopbe8v3x30JcAeIcTqzRs+LW7ZaB0YrjBVaZLRYnQB/fE8HxXzNPyAufk5tGwGrHRf0vD2AkiAm11vFdc/u3bfxQWoVOvkYw8jCnEdl+IzK1i2LAdRhGhFKAnSbgPke4uAQnFjfyBTVmm+Tq7lY0YBSaXCgLqHJiWfXZ/AUhG6JiFlgmmSSNHzAJDNPPfHbB23VqMt8hHNBjvD+3z9djeFnE2r7pBuRUhNA8sCXQMwFv9Aj2M39poYbe3IJMGsVjn8+gZGfI3PL96kEAf/3tg2GDpJFKOieGKxgXCcobTnYhmClEroSAsKeZvT3//Gzqxix/qn8NtzxE/koRWTLNRBqR8fAOrV60atNmZGIVYuy4Jpc9cJOTfQzZ6+bYyIDHLlKqQmUTNl4rpT1kjOLQIuXT0zK6vVr8ypSVJJgljVwdm7Cd+UE06NB1TNdlJJiBgfpzVZQoStk78OHp9+yIXw9tiXuqZvMeKRd/S1axh189wq18gRY1crqMkp4pl7iDA4e23w6BePdaH3zeMHVZv9vshmOkmlUK4HtRp43m0RRUev/XTs/H/KBPDy/mOrFbwilHoJhYtKhqQX3hi6cmJ2afYfsSVEefBLX7AAAAAASUVORK5CYII=") top left no-repeat;\
}\
.compare_compare {\
background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAACV0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVggMjAwNId2rM8AAAAVdEVYdENyZWF0aW9uIFRpbWUAOS8xMi8wNBzzQrsAAAKvSURBVHicpZJJTBNhGIbffzqdttMFShGLqITFJVECihETUQJeNJGL3PRAlRBJjV4Ue8KLCXFL5GDiFo0cIEaDYoiJCDEaRcSFioBUFhEotQQKI22nZaYzvxeNbMaD7+27PHnyfi+hlOJ/ws4/SEWjjWhwVKtjjkCNZahhYSgWmW0AlS/Tukr/cgDy24Ccfr6BN3G1RRnWvNxVcZBVDXp8Ato9AwiMD3ap0txhWu9yLwsgrtaVnNHcUlWUmXV8uw1tXqDNK2I4JGNGUuDu7cTkly4/wkKe0nB2dD6AAQBI0pndadas8q023O+LodETRN9kGCPTQXjDIkyZm2CyJ9sZlq1cbMD88igtSI1H81cZr70iVChQQaFQCkZDYY7jYFmzFoyG3UXyndzSEuWIMSID7yeiEKJRyIoKQVIQoSp0Jh14iw5BjoWk6hRMpzFLDUTh08shH0SNFgJR8YOomOMAg02PhCQjiJbF7Hc/MBeeop8ro0sBiljd0duL4cAUqNUENskMy+p4JKRYQTk9vH0DmOwexUFDbfbDk+TU8m8srblhSkwsT9mcBVOyHZxeh1hUxLjnG3wv3NiX7cP5rDr0vxtBVIXz0AV6dQFAc6DKpHKGi1qerzBYzGC1LKZFFpicQMlGP6443sCevg2d95rg6RgUIwp2lNXQbjJ/ymSLg0NyUiFYNl9HIjm5zMf9O9fzcDnSYY3rQ4SNYC6YhpZb9ZgK0NvHrtOyBVOm7jsSgGZCiluYPWbr3oRXl1aELA7/kBaazFSIQju0vBGsgUcwFM79U+KiUNqkiq31gRzETkwEhM5nTz+g520/xBkzxjw+jI1GEZXxZEEHf0tVCVnHatmbBqOxwMhrEA6GEA5Jd2UVzuoHdOafAABwFROLTg8nKCmkwGNZptfOPaISAPwE36I3bVFFGGsAAAAASUVORK5CYII=") top left no-repeat;\
}\
.compare_remove {\
background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAACV0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVggMjAwNId2rM8AAAAVdEVYdENyZWF0aW9uIFRpbWUAOS8xMS8wNA5G7VUAAAMDSURBVHicfdNLaFxlGMbx/3cuc+bMmckkTUNo0pDUaquxtBhIikHS1isiCKlQFReuBFdiEWtdiBKyE9S6EERBlG4q3qigiEjRWtuahaZJUxLT6SQTM5NJZ3LmeuZcP1cpKDbP6l28/DbP+wopJZupnhrbVrdvvmDXGvfajvxZ6xz4dGTil4AtIjaB6KOHdwUxvvB79w55usXGtT9Znl34Ml+sPP/s5xuN2wHa5lAPnY+tkeeGYvccwqr8RsdAmiDwnqrYM4vAydsBCsDsi12DLav7AfWO3VA8CyvTsJ6lv78dLWGOf/CI2rYl0BRKZ9MNFcrTUFyBSICVREvECcIo3mhF5pZAZtG5Wi2ubsilBdBikE5D0qJWrlEP3NlXz8s1IYQihBD/CzzzY7X89/X86YVfp6FWBekT5nJMXZqT3rfl0lRP9+kL+wfXf+jalv9EiDNvC3HwXy38vkfsiBJ8UznQP2LssNBMKK3ZeN+tyuHRY6L7/rsQpQLNxSWyc1muzGRahSA6elLK75XLo0JxPCb6Hjs8MnbiXRKhQWUmh3FulaEDj4u+w3twFv6gfOkC9nqJDjVk1/Z03BDiwzeE0qs+uMF9XXvT7/W9dEJXz31GVz7LTj+Ou2LQc3AfteUb+E+/hrZvmOQT49RmZ/CWctQCmS6FUUZTJEfju+82/Ys/0Tw/RYSJU25SJYVYvo7jeHR2d5A6NIbMznHDroJpEnMluOGw4ursbOWKhBcvI0UcKSVaysCp2jTXbQItgRJ4RLl5pKbSceQIMcvEFwoS/lIfTaG2ipVjsZqLFdPQTZV4m05+rYHa3kNKCXHzKxTOfg2uC8tZCvMZ5u2G7fjecSGl5P20OG4gJtIxLdluahi6QsmJaDg6Q4P9pCyDSNfxXY9C0ebKapmSXX/lrcB759YzTRrKoKaIJ0Uk94eRGIiEqOuKlmlvSz60vc28U4/plOsOa3bjZstxJt/0/VO37uC/eVmItjy4Z6R0XxeiN5myxqVkNPD8q4HnfTUp5bXN3X8Andxs4jbgPBAAAAAASUVORK5CYII=") top left no-repeat;\
}\
.compare_ahead, .compare_missing {\
width: 16px; height: 16px; top: -2px;\
position: relative;\
}\
.compare_ahead img, .compare_missing img {\
visibility: hidden;\
}\
.compare_ahead {\
background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9oDExQrG51HKGEAAALRSURBVDjLlZNNaBRnGMd/M5v9yH5kNiZromkaNVJr8ZN+IS31YvEiRQ8BL7U5mIMGWkWEgkKL0kuhlFql2GNREHvoURQ/UlBXMX5EbYNpcJuYpG42md1JZnbe2Zl53x7EVVsP7R+eywPv7/nzf94HpRT/pfjxa+1lfU0pxfN649yhrFKqV9ej22Wgvet7IcK079VsMSBqkcPzRrsJSNW3XwE0PP941cVD61Z0dJ7buWRjriPejBl4TAiH8aq1+uTQ1dXTI2O9qeJYj9PWdQEIgGcOVp75ct07y1/P7+v+MHE6eMAdu0i1KnEdD+XAslgL1ybGmLk7jOd479VeWZpXffuV/nR6azZ3tn/ppsQ3/k3+UBVCT1IZHCNVrOGogHzp0ZMs2tvQ/OAUEAHQAZadPvhZT/eGhd9bg5RdFyECKlMWlzbv4vwHvYRhiJQhjh/SkEihJ1OdkeEH2+oATWvYnoilmHTmMR/P0XXd4yN7EUZjIwA7aotZH6aJKmiKxYmlDVQYrq2HKNFXjdjTuK5PdXiGI9v2vrCZz9/fzJXJAp/cvEBTtBERi2IFak3dQSC89IQ9h6j6pJe0cn66wHjFBMDyBJenCuStGVoTGYx4gogPSFmoA0LHn5x1PPSgAcuT7B69RNmxAbhfmabnxhl+nhyl21iApnSEWQZ4BlBO7WKlYrNYb6JDayITJiiGHnM1j4I7z5psO28t7CITTTBbKmGbJkj5S/0f5L76dH1LLndr7Ztv82p6ATUZYgtBRNMw4kky0RiO5zP450NuX7lKuVz+Tv3w0566g9KBI7dn/3p8bPT3EUzboSXayGvZHMuzbWRjSYrzNvnh3xjKX8Mql4eQ8ounAb9wC80H+o82G0b/os4ujEwGiFCZs5gaf0SpWMR13QGl1FZ1/IT1UgCAvvvjjelksi8ejW+RUhpVISwhxADwrTp+4lf+oX8B/q/+BntWjl0UiBrKAAAAAElFTkSuQmCC") top left no-repeat;\
}\
.compare_missing {\
background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAACV0RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgTVggMjAwNId2rM8AAAAUdEVYdENyZWF0aW9uIFRpbWUAOS80LzA0eV6j1QAAAt9JREFUeJylk11oW2UYx3/vOSc5SZqlTWIrYV1WZx21VtnAi1qLykQ66FxBELYrwRvFwS6mdIjodG5MEG8EBRE28EboZChTkXZYJnVjqKNr99Vhl6bZ0toktmmSk5yP97xeDALO6Y3P5cOfH//n4y+UUvyfMu7VFEKI448x2NbOM4TYsiqZX5J8+9a4mv6H9m4HXw+KbenHN7wbf6h/JBLrQFTzFLNzZBby9cUK31SUfnD0e2/xnoDxXeLFrcO7TqT7h1u8P34jd+UCVIqk4q3Ius3MtUVmS/J6wdGH3h6/A2kCTu4QPduHBy5273wpvDzxPucv3qKl6wl8M4FcmKI3VMY0Y1zOVbm06k/omr77wA9ewwBICCFOvxI7lOobDDs/vsHczTrdez7m0c0KqmUWg/upnR7FWrhER8ggHlDPZer+bmBMAxjtpi/Z9fBIIHeGxnKF3oERQqltlL47RPbEO9w+9yWbdr6OLe/sPW7qGEK9CqABdD7AkIEXdgoZpIJo5QZbNt9PKTnEmdsB4j1P45SySECEIkQCQQwYbJ5RD/GIVi1iax5Sgj8/y/pH2/mllOaFo19hrmeZG/sAFYwRjMTQqhJfEWgCHLBqa2tEQh7SFbhC4TUsntp7EC0zxfUvPsSOmkTaU5i6geWC7TPfHCFXZtI1ggTMNlzRSt0JUnY1Zs5PMP/TKbyoSaRjE61tCaTnk7dslGKs6eBmmbO5VedGMhjZarYlwLUxajV6B55HX0pTnzlFNJlCrzW4tlKmUHeXdMlnTQfHp1Xh96L1yexyFQgQS26kvauH+0q/skEWSbRvRLMcrmTzTK/8iefKY0emVPZvj7S3T2j9D4Y+74xFX+5JdRCPxxG+i+NJVisNruZXyBTXsF3308OTat+/ZuHYUPDNloj5WiIc7jQNg3XbpVStYTXsy57nHz5yVp38zzABvPdsIO1rYgdKPSmUbyH9Sdfh56PnVOFu7V8L90ztwUDtEQAAAABJRU5ErkJggg==") top left no-repeat;\
}\
.compare_template {\
background:url("") top left no-repeat;\
}\
');

//////////////////
// Actual script.

// Get username
user = $("//table[@class='bg_table']/tbody/tr[1]//table//td[1]").textContent;

// Get the solution table header + solved problems list.
solvedrow = $("//table[@class='bg_table']/tbody/tr[last()]");
linkbar = $("th",solvedrow);
solved_img = $$(".//img",solvedrow);
solved = new Array();
for (var i=0; i<solved_img.length; i++) {
	solved[i] = (solved_img[i].alt=="Solved")?1:0;
}
solved=solved.join("");

// Actions
add_user=function(e){
	remove(aue);
	GM_setValue("user."+user,solved);
	aue=add("a",linkbar,{html: "Remove "+user, click: remove_user, username: user});
}

remove_user=function(e){
	var name=e.target.title.split(" ")[1];
	if (!confirm("Do you really want to remove "+name+"?")) return;
	GM_deleteValue("user."+name);
	if (e.target==aue) {
		remove(aue);
		aue=add("a",linkbar,{html: "Add "+user, click: add_user});
	} else {
		remove(e.target.parentNode);
	}
}

var cmp_cls=["","compare_ahead","compare_missing",""];
var cmp_cur="";
compare_user=function(e){
	var name=e.target.title.split(" ")[2];
	if (cmp_cur==name) {
		var data=solved;
		cmp_cur="";
	} else {
		var data=GM_getValue("user."+name);
		cmp_cur=name;
	}
	//alert(data+"\n"+solved);
	for (var i=0; i<solved_img.length; i++) {
		var c = 1*solved[i]+2*data[i];
		solved_img[i].parentNode.className=cmp_cls[c];
	}
}

// Fill the sidebar
var missing=true;
var header=false;
var list=GM_listValues();
for (var val in list) {
	var param=list[val].split(".");
	if (param[0]!="user") continue;
	if (param[1]==user) {
		// Update data if current user.
		missing=false;
		GM_setValue("user."+user,solved);
		continue;
	}
	if (!header) {
		add("hr",linkbar);
		header=true;
	}
	// Add a link for each stored user.
	u=add("p",linkbar,{html: param[1]+": "});
	add("a",u,{html: "s", class: "compare_show",    title: "Show "+param[1]+"'s profile", href: "?section=profile&profile="+param[1]});
	add("a",u,{html: "c", class: "compare_compare", title: "Compare with "+param[1], click: compare_user});
	add("a",u,{html: "r", class: "compare_remove",  title: "Remove "+param[1], click: remove_user, username: param[1]});
}
add("hr",linkbar);
if(missing){
	// Add a link to add current user.
	aue=add("a",linkbar,{html: "Add "+user, click: add_user});
} else {
	// Add a link to remove current user.
	aue=add("a",linkbar,{html: "Remove "+user, click: remove_user, title: "Remove "+user});
}
