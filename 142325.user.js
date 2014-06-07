// ==UserScript==
// @name           Advanced WZL
// @version        3.21
// @namespace      http://www.userscripts.org
// @creator        Efari+SaWey
// @description    Filter WZL fun page naar wens
// @include        http://*wzl.be/*
// @include        http://*wijfzonderlijf.be/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js

// ==/UserScript==

//halloween event
$(document).ready(function(){
  var ghost = document.createElement('img');
  ghost.src='http://dl.dropboxusercontent.com/u/7177974/ghost-clipart-13-left.png';
  ghost.style.position='fixed';
  var topg = '1%';
  ghost.style.top=topg;
  var leftg = '1%';
  var rightg = '-600';
  ghost.style.right=rightg;
  ghost.id='ghost';
  document.getElementsByTagName('body')[0].appendChild(ghost);
  var ghost2 = document.createElement('img');
  ghost2.src='http://dl.dropboxusercontent.com/u/7177974/ghost-clipart-13-right.png';
  ghost2.style.position='fixed';
  var topg = '1%';
  ghost2.style.top=topg;
  var leftg = '-600';
  ghost2.style.left=leftg;
  ghost2.id='ghost2';
  document.getElementsByTagName('body')[0].appendChild(ghost2);
  var bln = true;
function fnghost(){
    var breedte = $(window).width()+600;
    if(bln){
        $( '#ghost' ).animate({
        right: '+='+breedte,
      }, 5000, function() {
      });
		bln=false;
    } else {
        $( '#ghost2' ).animate({
        left: '+='+breedte,
      }, 5000, function() {
      });
        bln=true;
    }
}
function fnreset(){
    ghost.style.right=rightg;
    ghost2.style.left=leftg;  
}
function fnghost2(){
 fnghost();
 setTimeout(fnreset,5050);
}
    
var x=new Date();
var y=new Date();
x.setFullYear(2013,9,31);
x.setHours(17);
y.setFullYear(2013,10,1);
y.setHours(5);
var today = new Date();
    
if (today>=x && today<y){
	setInterval(fnghost2,10000);
}

});


//Browser detection

var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
         subString: "OmniWeb",
         versionSearch: "OmniWeb/",
         identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]
    
};
BrowserDetect.init();
//controleer op firefox nightly (18) of chrome
var is_ffnightly=false;
if(BrowserDetect.browser=="Firefox" && BrowserDetect.version==18){
	is_ffnightly=true;
}

//rest van script

if(/.*post\&.*/.test(window.location.href)){
    //dit enkel doen op een post
    
    //youtube vids resizer
    var fnresize = document.createElement("script");
    fnresize.type="text/javascript";
    fnresize.innerHTML="var embedddd = document.getElementsByTagName('embed');\n\
function resize(i,bln){\n\
if(bln){\n\
embedddd[i].setAttribute('width',embedddd[i].width*1.1);\n\
embedddd[i].setAttribute('height',embedddd[i].height*1.1);\n\
}else{\n\
embedddd[i].setAttribute('width',embedddd[i].width*0.9);\n\
embedddd[i].setAttribute('height',embedddd[i].height*0.9);\n\
}\n\
}";
    document.getElementsByTagName("head")[0].appendChild(fnresize);
    
    //maak dan youtube links embed, voor fullscreen te enablen
    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    if(is_chrome || is_ffnightly){
        var embedd = document.getElementsByTagName("embed");
        if(embedd!=null){
            for(i=0; i<embedd.length;i++){
                var embed = embedd[i];
                var src = embed.getAttribute("src");
                if (/.*youtu.?be.*/.test(src)){
                    var parent3 = embed.parentNode;
                    var srcv = src.split("/v/")[1].split("&")[0];
                    var vid = document.createElement("embed");
                    var srcw = embed.getAttribute("width");
                    var srch = embed.getAttribute("height");  
                    vid.setAttribute("src","http://www.youtube.com/embed/"+srcv);
                    vid.setAttribute("width",srcw);
                    vid.setAttribute("height",srch);
                    var br = document.createElement("br");
                    parent3.appendChild(br);
                    parent3.insertBefore(vid,embed);
                    parent3.removeChild(embed);
                    parent3.getElementsByTagName("a");
                }
            }
        }
    }
    
    //make resize button
    var jsresize = document.createElement("script");
    jsresize.type="text/javascript";
    jsresize.innerHTML='var embeddd = document.getElementsByTagName("embed");\n\
var j=0;\n\
if(embeddd!=null){\n\
var embed = embeddd[0];\n\
var parent3 = embed.parentNode\n\
var parent2=parent3;\n\
for(i=0;i<embeddd.length;i++){\n\
embed = embeddd[i];\n\
parent3 = embed.parentNode\n\
if(parent3!=parent2){\n\
j=0;}\n\
var parent2=parent3;\n\
var plus = document.createElement("span");\n\
var min = document.createElement("span");\n\
var br = document.createElement("br");\n\
plus.innerHTML = "+";\n\
plus.style.cursor = "pointer";\n\
if(window.location == window.parent.location){\n\
plus.setAttribute("onClick","resize("+i+",true)");\n\
min.setAttribute("onClick","resize("+i+",false)");\n\
}else{\n\
plus.setAttribute("onClick","resize("+(i-1)+",true)");\n\
min.setAttribute("onClick","resize("+(i-1)+",false)");}\n\
min.innerHTML = "-";\n\
min.style.cursor = "pointer";\n\
parent3.insertBefore(plus,parent3.getElementsByTagName("embed")[j]);\n\
parent3.insertBefore(br,parent3.getElementsByTagName("embed")[j]);\n\
parent3.insertBefore(min,parent3.getElementsByTagName("embed")[j]);\n\
parent3.insertBefore(br,parent3.getElementsByTagName("embed")[j]);\n\
j=j+1;\n\
}\n\
}';
    document.getElementsByTagName("head")[0].appendChild(jsresize);
    
  /*  if(is_chrome){
        //voor comments async te maken
        var center = document.getElementsByClassName("center")[0];
        var table1 = center.getElementsByTagName("table")[3];
        var table2 = center.getElementsByTagName("table")[4];
        var table3 = center.getElementsByTagName("table")[5];
        var br = document.createElement("span");
        br.innerHTML="\<br\>\n\
<a name=\"editor\"\>\<\/a\>";
        var content = table1+br+table2+table3;
        
        if(window.location == window.parent.location){
            //als we in de top pagina zitten
            var iframescript = document.createElement("script");
            iframescript.innerHTML="function alertsize(pixels,bln){\n\
if(bln){pixels+=35}\n\
document.getElementById('myiframe').style.height=pixels+\"px\";\n\
}";
            document.getElementsByTagName("head")[0].appendChild(iframescript);
            center.removeChild(table1);
            center.removeChild(table2);
            center.removeChild(table3);
            var iframe = document.createElement("iframe");
            iframe.src=window.location.href;
            iframe.width="100%";
            iframe.id="myiframe";
            iframe.frameBorder="0";
            center.appendChild(iframe);
            
            
        } else {
            //als we in de iframe zitten
            var html = document.getElementsByTagName("body")[0];
            html.innerHTML="";
            var iframescript = document.createElement("script");
            iframescript.innerHTML = "setTimeout(\"parent.alertsize(document.body.scrollHeight,true)\",100);setTimeout(\"parent.alertsize(document.body.scrollHeight,false)\",2000);setTimeout(\"parent.alertsize(document.body.scrollHeight,false)\",5000);setTimeout(\"parent.alertsize(document.body.scrollHeight,false)\",10000);";
            document.getElementsByTagName("head")[0].appendChild(iframescript);
            html.appendChild(table1);
            html.appendChild(br);
            html.appendChild(table2);
            table3.getElementsByTagName("form")[0].setAttribute("onsubmit","alertsize(document.body.scrollHeight)");
            html.appendChild(table3);
        }
    }*/
}


if(/.*post.*/.test(window.location.href)||/.*commentEdit.*/.test(window.location.href)||/.*replynew.*/.test(window.location.href)||/.*topic.*/.test(window.location.href)){
    //smart content
    function insertSC(){
        var textarea = document.getElementsByTagName("textarea")[0];
        var a = textarea
            var b = createlink(a);
        textarea.value = b;
    }
    
    function createlink(a){
        
        b = a.value.split("\n");
        var c="";
        for(i=0; i<b.length;i++){
            //voor elke regel in de post/comment
            if(/.*youtube\.com\/watch.*/.test(b[i])){
                //regel is een youtube-link
                c += "[movie=http://www.youtube.com/v/" + b[i].split("=")[1].split("&")[0] + " w=800 h=600]\n" ;
            } else if(/.*\.jpg/.test(b[i].toLowerCase()) || /.*\.png/.test(b[i].toLowerCase()) || /.*\.gif/.test(b[i].toLowerCase()) || /.*\.bmp/.test(b[i].toLowerCase())){
                //regel is een afbeelding
                if(!/.*\[image\=.*/.test(b[i])){
                    c+= "\[image="+ b[i] +"\]\n";
                } else {c +=b[i] + "\n"}
            } else if(/.*www\..*\..*/.test(b[i]) || /.*http\:\/\/.*\..*/.test(b[i])){
                //regel is een link
                if(!/.*http\:\/\/.*\..*/.test(b[i])){
                    b[i]="http://"+b[i];
                }
                if(!/.*\[link\=.*/.test(b[i]) && !/.*\[movie\=.*/.test(b[i])){
                    var text1 = b[i].split("http://")[0];
                    c+= text1 + "[link=http://";
                    if(/.*;.*/.test(b[i])){
                        var link = b[i].split("http://")[1].split(";")[0];
                        var linktext = b[i].split("http://")[1].split(";")[1];
                        var text2 = b[i].split(";;")[1];
                        c+= link +"]"+ linktext + "[/link]" + text2 + "\n";
                    } else {
                        var link = b[i].split("http://")[1].split(" ")[0];
                        var text2 = "";
                        if(b[i].split("http://")[1].split(link)[1]!=null){
                            var text2 = b[i].split("http://")[1].split(link)[1];
                        }
                        c+= link +"]"+ link + "[/link] " + text2 + "\n";
                    }
                } else {c +=b[i] + "\n"}
                
            } else {c +=b[i] + "\n"}
        }
        
        c=c.slice(0,[c.length - 1]);
        return c
            }
    
    //we gaan in de post-editor
    var parent_header = document.getElementsByClassName("editorcontrols")[0];
    
    if(parent_header != null){
        //als die class bestaat, voeg de knop toe
        var text = document.createElement("span");
        text.innerHTML = ' ';
        var imgSC = document.createElement("img");
        imgSC.title = "Smart Content";
        imgSC.src="http://wzl.be/imgs/tabs/balzak/balzak_bullet1.gif";
        imgSC.border = 0;
        imgSC.style.cursor = "pointer";
        imgSC.addEventListener('click', insertSC , true);
        parent_header.appendChild(text);
        parent_header.appendChild(imgSC);
    }
}


//zoekmachine
if(/.*f_search/.test(window.location.href)){
    var fnzoek = document.createElement("script");
    //fnzoek.type="text/javascript";
    fnzoek.innerHTML="  (function() {\n\
var cx = '013273470132854811226:r3brt_qi8k0';\n\
var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;\n\
gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +\n\
'//www.google.com/cse/cse.js?cx=' + cx;\n\
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);\n\
})();";
    document.getElementsByTagName("head")[0].appendChild(fnzoek);
    var parent_header = document.getElementsByTagName("form")[0];
    var parent2 = parent_header.parentNode;
    parent2.removeChild(parent_header);
    var gcse = document.createElement("span");
    gcse.innerHTML="<gcse:search></gcse:search>";
    parent2.appendChild(gcse);
}


if(!/.*post.*/.test(window.location.href) && !/.*music.*/.test(window.location.href) && !/.*freetime.*/.test(window.location.href) && !/.*sports.*/.test(window.location.href) ){
	//als we in fun, babe of stud tab zitten, dus niet in (nieuwe) post pagina, music tab, freetime tab of sportstab
	//blacklist opvragen aan GreaseMonkey
    
    
    var actief = GM_getValue("wzlBLA");
    
    function addToBlacklist(e){
		//waarde toevoegen aan blacklist
        var string = document.getElementById('blacklistMe').value;
        if(trim(string) == ""){
            alert("Gelieve een waarde in te vullen.");		
        }else{
            var str = GM_getValue("wzlBL");
            GM_setValue("wzlBL", str + "|" + string);
            var check = GM_getValue("wzlLijst");
            if(check == 0){
                blacklist();
            }else{
                whitelist();	
            }	
            document.getElementById("blacklistMe").value = "Toegevoegd";
            setTimeout("document.getElementById(\"blacklistMe\").value = \"\"",500);
        }
    }
    
    function blacklist(){
		//blacklist uitvoeren
        var str = GM_getValue("wzlBL");
        strArr = "";
        if(str !=null){
            strArr = str.split("|");
        }	
        var blacklist = new Array();
        for(n=0; n<strArr.length; n++){
            if(trim(strArr[n]) != ""){
				//in elke record van blacklist staat nu een opgeslagen waarde
                blacklist[n] = strArr[n];
            }
        }
        
        var parent_td = document.getElementsByClassName("center")[0]; //de middelste kolom op wzl
        var items = parent_td.getElementsByTagName("td");
        for(o=0; o<items.length; o++){
            for(p=0; p<blacklist.length; p++){
                if(items[o].innerHTML.match(blacklist[p]) && blacklist[p] != null){
                    items[o].parentNode.style.display = "none";					
                }
            }
        }
        
    }
    
    function showBL(e){//toon de blacklist rechts
        var str = GM_getValue("wzlBL");
        var strArr = "";
        if(str !=null){
            strArr = str.split("|");
        }	
        var blacklist = new Array();
        var bl = document.getElementById("blList");
        bl.innerHTML = "<br /> ";
        for(n=0; n<strArr.length; n++){
            if(trim(strArr[n]) != "" && trim(strArr[n]) != null){
                var imgv = document.createElement("img");
                imgv.title = "Verwijder uit lijst!";
                imgv.id = strArr[n];
                imgv.src = "http://www.wzl.be/imgs/common/hot2.gif";
                imgv.style.cursor = "pointer";
                imgv.addEventListener('click', verwVanBlacklist , true);
                var text = document.createElement("span");
                text.innerHTML = strArr[n] + "<br />";
                bl.appendChild(imgv);
                bl.appendChild(text);
            }
        }
    }
    
    
    function verwVanBlacklist(e){
        var str = GM_getValue("wzlBL");
        strArr = "";
        if(str !=null){
            strArr = str.split("|");
        }
        var blacklist = new Array();
        var blacklistStr = "";
        var bl = document.getElementById("blList");
        bl.innerHTML = " ";
        for(n=0; n<strArr.length; n++){
            if(strArr[n] != this.id && strArr[n] != ""){
                blacklistStr += "|" + strArr[n];
            }else{
                blacklistStr += "";
            }
        }
        GM_setValue("wzlBL", blacklistStr);
        window.location=window.location.href;
    }
    
    function whitelist(){
        var str = GM_getValue("wzlBL");
        strArr = "";
        if(str !=null){
            strArr = str.split("|");
        }	
        var whitelist = new Array();
        for(n=0; n<strArr.length; n++){
            if(trim(strArr[n]) != ""){
                whitelist[n] = strArr[n];
            }
        }
        var ko = 0;
        var temp = new Array();
        var parent_td = document.getElementsByClassName("center")[0];
        var items = parent_td.getElementsByTagName("td");
        for(o=0; o<items.length; o++){
            for(p=0; p<whitelist.length; p++){
                if(items[o].innerHTML.match(whitelist[p]) && whitelist[p] != null){
                    temp.push(o);
                    //items[o].parentNode.style.display = "";	
                }else{
                    items[o].parentNode.style.display = "none";	
                }
            }
        }
        for(o=0; o<temp.length; o++){
            items[temp[o]].parentNode.style.display = "";
        }
    }
    
    function trim(value) {//inputwaarde trimmen uiteraard
        value = value.replace(/^\s+/,''); 
        value = value.replace(/\s+$/,'');
        return value;
    }
    
    function activatewhitelist(e){
        GM_setValue("wzlLijst", 1);	
        whitelist();
        var img_white = document.getElementById("whitelisticon");
        img_white.style.display = "none";
        var img_black = document.getElementById("blacklisticon");
        img_black.style.display = "";
        var titel = document.getElementById("lijstTitel");
        titel.innerHTML = "Whitelist: ";
    }
    
    function activateBlacklist(e){
        GM_setValue("wzlLijst", 0);	
        window.location=window.location.href;
        var img_white = document.getElementById("whitelisticon");
        img_white.style.display = "";
        var img_black = document.getElementById("blacklisticon");
        img_black.style.display = "none";
        var titel = document.getElementById("lijstTitel");
        titel.innerHTML = "Blacklist: ";
    }
    
    function resetEntries(){//alles wissen
        GM_setValue("wzlBL", "");
    }
    
    function toggleActive(){
        if(actief){
            actief=false;
            GM_setValue("wzlBLA", false);
        }else{
            actief=true;
            GM_setValue("wzlBLA", true);
        }
        window.location.reload();
    }
    
    var lijst = 0;//blacklist by default
    
    if(GM_getValue("wzlLijst") != null){
        lijst = GM_getValue("wzlLijst");
    }
    if(actief){
        if(lijst == 0){
            blacklist();	
        }else{
            whitelist();	
        }
    }
    
    //extra filtermenu aanmaken
    
    
    var parent_header = document.getElementsByClassName("right")[0].getElementsByTagName("FORM");
    
    var br = document.createElement("BR");
    parent_header[0].appendChild(br);
    
    
    var box = document.createElement("input");//activatieknop
    box.type = "Checkbox";
    box.id = "enableBL";
    box.name ="enableBL";
    if(actief)
        box.checked = true;
    box.addEventListener('click',toggleActive, true);
    //////////////////////////////////////////////
    var title = document.createElement("H2");
    //////////////////////////////////////////////
    var imgf = document.createElement("img");//f-icoontje
    imgf.title = "Toon lijst";
    imgf.src = "http://www.wzl.be/imgs/tabs/fun/fun_icon.gif";
    imgf.border = 0;
    imgf.height = 9;
    imgf.width = 11;
    imgf.style.cursor = "pointer";
    imgf.addEventListener('click', showBL , true);
    //////////////////////////////////////////////
    var whitelisticon = document.createElement("img");//w-icoontje
    whitelisticon.id = "whitelisticon";
    whitelisticon.title = "Toggle whitelist";
    whitelisticon.src = "http://www.wzl.be/imgs/tabs/my/my_icon.gif";
    whitelisticon.border = 0;
    whitelisticon.height = 9;
    whitelisticon.width = 11;
    whitelisticon.style.cursor = "pointer";
    whitelisticon.addEventListener('click', activatewhitelist , true);
    //////////////////////////////////////////////
    var blacklisticon = document.createElement("img");//b-icoontje
    blacklisticon.id = "blacklisticon";
    blacklisticon.title = "Toggle blacklist";
    blacklisticon.src = "http://wzl.be/imgs/tabs/balzak/balzak_icon.gif";
    blacklisticon.border = 0;
    blacklisticon.height = 9;
    blacklisticon.width = 11;
    blacklisticon.style.cursor = "pointer";
    blacklisticon.addEventListener('click', activateBlacklist , true);
    //////////////////////////////////////////////
    if(lijst == 0){
        blacklisticon.style.display = "none";
        whitelisticon.style.display = "";
    }else{
        blacklisticon.style.display = "";
        whitelisticon.style.display = "none";	
    }
    
    
    var text = document.createElement("span");//tekst
    text.innerHTML = "&nbsp;&nbsp;ADV FILTER &nbsp;&nbsp;&nbsp;";
    
    parent_header[0].appendChild(title);
    title.appendChild(imgf);
    title.appendChild(text);
    title.appendChild(whitelisticon);
    title.appendChild(blacklisticon);
    
    
    var descr = document.createElement("B");
    descr.id = "lijstTitel";
    if(lijst == 0){
        descr.innerHTML = 'Blacklist: ';
    }else{
        descr.innerHTML = 'Whitelist: ';
    }
    parent_header[0].appendChild(box);
    parent_header[0].appendChild(descr);
    
    
    var input = document.createElement("input");//textinput
    input.type = "text";
    input.id = "blacklistMe";
    input.name = "blacklistMe";
    input.width = 130;
    parent_header[0].appendChild(input);
    
    var img = document.createElement("img");//filter-icoontje
    img.id = "blacklistMeImg";
    img.title = "Voeg toe aan lijst!";
    img.src = "http://wzl.be/imgs/common/filter.gif";
    img.style.cursor = "pointer";
    img.addEventListener('click', addToBlacklist , true);
    parent_header[0].appendChild(img);
    
    var bl = document.createElement("span");
    bl.id = "blList";
    bl.innerHTML = "";
    parent_header[0].appendChild(bl);
    
    
    
    //resetknop aanmaken
    var  parent_td = document.getElementsByClassName("footer")[0];
    var reset = document.createElement("a");
    reset.href="http://wzl.be";
    reset.style.cursor = "pointer";
    reset.innerHTML = " | Reset Wzl Adv Filter";
    reset.addEventListener('click', resetEntries , true);
    parent_td.appendChild(reset);
} else {
    
}