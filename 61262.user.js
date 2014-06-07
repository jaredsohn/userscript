// ==UserScript==
// @name           LUEtemplate
// @namespace      By Kalphak
// @description    Lets you set templates for types of links you add often
// @include        http://links.endoftheinter.net/add.php*
// @include        https://links.endoftheinter.net/add.php*
// ==/UserScript==

// VERSION 2
// Kalphak.
// ----------------------
// Please PM me with any bugs/requests etc.


var curTemps = GM_getValue('LUEtemps', '0');
if (curTemps != 0)
var temps = curTemps.split("[^]");
var cparent = document.getElementsByTagName("br")[12];
var cheese = document.createElement("div");
var editbox = document.createElement("div");
cparent.parentNode.insertBefore(editbox, cparent.nextSibling);
cparent.parentNode.insertBefore(cheese, cparent.nextSibling);
var txtArea = document.getElementsByTagName("textarea")[0];
cheese.style.width = txtArea.offsetWidth + "px";
editbox.style.width = txtArea.offsetWidth + "px";
cheese.appendChild(txtArea);
cheese.appendChild(document.getElementsByTagName("br")[13])
cheese.appendChild(document.getElementsByTagName("br")[14])
cheese.appendChild(document.getElementsByTagName("input")[31])
cheese.appendChild(document.getElementsByTagName("input")[32])

var buttonsHolder = document.createElement("div");
buttonsHolder.innerHTML = "<span><button id=\"add\">Save as link template</button></span> <span><button id=\"load\">Load link template</button></span>";
buttonsHolder.style.cssFloat = "right";
cheese.appendChild(buttonsHolder)
var el1 = document.getElementById("load");
el1.addEventListener("click", tLoad, false);
var el2 = document.getElementById("add");
el2.addEventListener("click", tAdd, false);
var cont = new Array();

var ids = new Array('c512','c1073741824','c32768','c2048','c2097152','c134217728','c8192','c4','c268435456','c1','c32','c8388608','c524288','c1048576','c128','c8','c262144','c2','c2147483648','c67108864','c131072','c16777216','c33554432','c4194304','c1024','c536870912','c16','c65536');
function tLoad() {
    var lspan = document.getElementsByTagName("span")[1];
    if (curTemps == 0) {
        lspan.innerHTML = "No templates to load. <a href=\"#\" id=\"examp\">Load example templates.</a>";
	var el15 = document.getElementById("examp");
        el15.addEventListener("click", example, false);
    } else {
        var build = "<select id=\"templates\">\n";
        build += "<option id=\"manage\" value=\"manage\">Manage...</option>\n";
        build += "<option selected=\"selected\" value=\"0\">======</option>\n";
        for (i = 1; temps.length > i; i++) {
            build += "<option id=\"o" + i + "\">" + temps[i].split("[¢]")[0] + "</option>\n";
        }
        build += "</select>";
        lspan.innerHTML = build;
  	var el3 = document.getElementById("templates");
        el3.addEventListener("change", changed, false);
    }
}
function changed(e){
	var val = this.options[this.selectedIndex].value;
	var vid = this.selectedIndex-1;
	if (vid == -1){
	manage();
	}else if(vid > 0){
	    document.getElementsByTagName('textarea')[0].value = temps[vid].split("[¢]")[1].replace(/<b.r>/gi,'\n').replace(/&quot;/gi, "\""); 
            document.getElementsByTagName('input')[0].value = temps[vid].split("[¢]")[2].replace(/&quot;/gi, "\"");
            document.getElementsByTagName('input')[1].value = temps[vid].split("[¢]")[3].replace(/&quot;/gi, "\"");
	    tcbs = temps[vid].split("[¢]")[4].split("|");
	    for (var i=0;i<ids.length;i++){
		document.getElementById(ids[i]).checked = (tcbs[i] == "1") ? true : false;
	    }
	}
}

// 0 = template name
// 1 = template text
// 2 = template title
// 3 = template categories

function tAdd() {
    var tName = prompt("New template name");
    var toAdd = txtArea.value;
    if ((tName == '') || (toAdd == '')){
        alert("Please enter some text")
    }else{
        toAdd = toAdd.replace(/\"/gi,"&quot;");
        toAdd = toAdd.replace(/\n/gi,"<b.r>");
        var toAddTitle = document.getElementsByTagName("input")[0].value;
        toAddTitle = toAddTitle.replace(/\"/gi,"&quot;");
        var toAddLink = document.getElementsByTagName("input")[1].value;
        toAddLink= toAddLink.replace(/\"/gi,"&quot;");
	var cbs = "";
	for (var i=0;i<ids.length;i++){
	cbs += (document.getElementById(ids[i]).checked==true) ? '1|' : '0|';
	}	
        curTemps += "[^]" + tName.replace(/\"/gi,"&quot;") + "[¢]" + toAdd + "[¢]" + toAddTitle + "[¢]" + toAddLink + "[¢]" + cbs.slice(0, -1);
        GM_setValue('LUEtemps', curTemps);
        alert("Added new template \"" + tName + "\"")
    }
}
function manage(){
    cheese.style.display="none";
    //document.getElementsByTagName("br")[13].style.display="none";
    //document.getElementsByTagName("br")[14].style.display="none";
    var boxbuild = "<table class=\"grid\"><tr><th>Template Name</th><th>Edit</th><th>Delete</th></tr></tr>";
        for (i = 1; temps.length > i; i++) {
            boxbuild += "<tr><td>" + temps[i].split("[¢]")[0].replace(/&quot;/gi,'\"') + "<small style=\"float:right\"><a href=\"#\" id=\"name" + i + "\">Edit Name</a></small></td><td><a href=\"#\" id=\"edit" + i + "\">Edit</a></td><td><a href=\"#\" id=\"d" + i + "\">Delete</a></td></th>";
            }
    boxbuild += "</table>";
    editbox.innerHTML = boxbuild;
editbox.innerHTML += "<br><button id=\"return\">Return to link composition</button>";
var el10 = document.getElementById("return");
el10.addEventListener("click", returnto, false);

var dlls = new Array();
var ells = new Array();
var nlls = new Array();

// I'm tired, and this is one way of doing it...deal with it.
for (i = 1; temps.length > i; i++) {
dlls[i] = document.getElementById("d"+i);
dlls[i].addEventListener("click", deltempl, false);
// LOL
ells[i] = document.getElementById("edit"+i);
ells[i].addEventListener("click", edittempl, false);
// this is just ridiculous
nlls[i] = document.getElementById("name"+i);
nlls[i].addEventListener("click", rename, false);
}
}
function returnto(){
editbox.style.display="none";
cheese.style.display="block";
}
function deltempl(){
var templ = this.id.substr(1);
var answer = confirm("Delete the template \"" + temps[templ].split("[¢]")[0].replace(/&quot;/gi, "\"") + "\"?")
	if (answer){
	temps.splice(templ,1);
	curTemps = temps.join("[^]");
        GM_setValue('LUEtemps', curTemps);
	manage();
	}
}
function edittempl(){
var templ = this.id.substr(4);
var answer = confirm("Edit the template \"" + temps[templ].split("[¢]")[0].replace(/&quot;/gi, "\"") + "\"?")
	if (answer){
	returnto();
	    document.getElementsByTagName('textarea')[0].value = temps[templ].split("[¢]")[1].replace(/<b.r>/gi,'\n').replace(/&quot;/gi, "\""); 
            document.getElementsByTagName('input')[0].value = temps[templ].split("[¢]")[2].replace(/&quot;/gi, "\"");
            document.getElementsByTagName('input')[1].value = temps[templ].split("[¢]")[3].replace(/&quot;/gi, "\"");
	    tcbs = temps[templ].split("[¢]")[4].split("|");
	    for (var i=0;i<ids.length;i++){
		document.getElementById(ids[i]).checked = (tcbs[i] == "1") ? true : false;
	    }
    	var lspan = document.getElementsByTagName("span")[1];
	lspan.innerHTML="<button name=\""+templ+"\" id=\"edittemp\">Save Template</button>";
	var el12 = document.getElementById("edittemp");
        el12.addEventListener("click", savetemp, false);
	}
}
function savetemp(){
 var toAdd = txtArea.value;
 if (toAdd == ''){
        alert("Please enter some text")
    }else{
        toAdd = toAdd.replace(/\"/gi,"&quot;");
        toAdd = toAdd.replace(/\n/gi,"<b.r>");
        var toAddTitle = document.getElementsByTagName("input")[0].value;
        toAddTitle = toAddTitle.replace(/\"/gi,"&quot;");
        var toAddLink = document.getElementsByTagName("input")[1].value;
        toAddLink= toAddLink.replace(/\"/gi,"&quot;");
	var cbs = "";
	for (var i=0;i<ids.length;i++){
	cbs += (document.getElementById(ids[i]).checked==true) ? '1|' : '0|';
	}
	
        tomake = temps[this.name].split("[¢]")[0] + "[¢]" + toAdd + "[¢]" + toAddTitle + "[¢]" + toAddLink + "[¢]" + cbs.slice(0, -1);
        temps[this.name] = tomake;
	curTemps = temps.join("[^]");
	GM_setValue('LUEtemps', curTemps);
        alert("Edited template!")
    }
}
function rename(){
var templ = this.id.substr(4);
var tName = prompt("Enter new name", temps[templ].split("[¢]")[0]);
if ((tName != null) && (tName != '')){
        tomake = tName.replace(/\"/gi,"&quot;") + "[¢]" + temps[templ].split("[¢]")[1] + "[¢]" + temps[templ].split("[¢]")[2] + "[¢]" + temps[templ].split("[¢]")[3] + "[¢]" + temps[templ].split("[¢]")[4];
        temps[templ] = tomake;
	curTemps = temps.join("[^]");
	GM_setValue('LUEtemps', curTemps);
        alert("Changed name!")
}
manage();
}
function example(){
var example = "[^]Mac App[¢]<product image><b.r><b.r><product text><b.r><b.r><b>Features:</b><b.r>* <features><b.r><b.r><b>Version:</b><b.r><b.r><b>More Info:</b> <product website><b.r><b.r><b>System Info:</b> Mac OS X 10.5 or later<b.r><b.r><b>Other App Info:</b> Universal Binary/Cracked<b.r><b.r><b>Screenshots:</b><b.r><spoiler><b.r></spoiler><b.r><b.r><b>Password:</b> luelinks[¢][MAC] <product> (UB/K)[¢][¢]0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|1|0|0|0|0|1|0|1[^]Music[¢]<cdcover><b.r><b.r><description><b.r><b.r>- [MP3/V0 (VBR)/CD)]<b.r>- Release Date: <release date><b.r>- Genre: <genre><b.r><b.r><b>Track List:</b><b.r>1.<b.r>2.<b.r>3.<b.r>4.<b.r>5.<b.r>6.<b.r>7.<b.r>8.<b.r>9.<b.r><b.r><b>Password:</b> luelinks[¢][MUSIC] Artist - Album Name (<year>)[¢][¢]0|0|0|0|0|0|0|0|0|0|0|0|1|0|0|0|0|0|0|0|0|0|0|0|0|1|0|0[^]TV Show[¢]<show image><b.r><b.r><b><u><showname>, Season <s> - Episode <e></u></b><b.r><b>Episode title:</b> &quot;<title>&quot;<b.r><b>Original U.S. airdate:</b> <airdate><b.r><b.r><spoiler caption=&quot;Episode Description&quot;> <description> </spoiler><b.r><b.r><spoiler caption=&quot;Screenshots&quot;> <screenshots> <spoiler><b.r><b.r><spoiler caption=&quot;File Info&quot;> <release info> </spoiler><b.r><b.r><b>Password:</b> luelinks[¢][TV] <showname> S<s>E<e> (<format>)[¢][¢]0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|1|0|1|0|0[^]Movie[¢]<cover><b.r><b.r><b>IMDB:</b><b.r><spoiler> imdb or wikipedia or something </spoiler><b.r><b.r><b>Plot:</b><b.r><spoiler> <dundundun> </spoiler><b.r><b.r><b>Technical Info:</b><b.r><spoiler> <specs> </spoiler><b.r><b.r><b>Preview Pics:</b><b.r><spoiler> <preivew pics> </spoiler><b.r><b.r><b>Password:</b> luelinks[¢][MOVIE] <moviename> (<year>/<format>)[¢][¢]0|0|0|0|0|0|0|0|0|0|0|1|0|0|0|0|0|0|0|0|0|0|0|0|0|1|0|0[^]Game[¢]<game image><b.r><b.r><description><b.r><b.r><b>IGN Review:</b> <ign review or wikipedia or something><b.r><b.r><b>Download Links:</b><b.r><links><b.r><b.r><b>Instructions:</b><b.r>* <instructions><b.r><b.r><b>Screenshots:</b><b.r><spoiler> <screenshots> </spoiler><b.r><b.r><b>Password:</b> luelinks[¢][<console>] <gamename> (<format/region if applicable>)[¢][¢]0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|1|0|0|0|0|1|0|0|0|0|1|0|0[^]News Article[¢]<title><b.r><b.r><screenshot of story>[¢]<story title>[¢][¢]0|0|0|0|1|0|0|0|0|0|0|0|0|1|0|0|0|0|0|0|0|0|0|0|1|0|0|0";
GM_setValue('LUEtemps', example);
temps = example.split("[^]");
manage();
alert("Added standard templates.")
}