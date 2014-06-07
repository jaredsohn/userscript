// ==UserScript==
// @name        HAYLoader
// @namespace   Ponychan.net
// @description An automatic page refresher for Ponychan
// @include     http://www.ponychan.net/chan/*/*
// @version     1.00
// @grant       metadata
// ==/UserScript==

var HAYmenuTitle = '<a id=\"haymenutitle\" class=\"adminbaritem\" >HAY ▼</a>';
document.getElementById('mainmenu').innerHTML = HAYmenuTitle + document.getElementById('mainmenu').innerHTML;
document.getElementById('haymenutitle').addEventListener('click', HAYmenuClick, false);
var HAYrefreshTime = parseInt(localStorage.HAYrefreshTime)>1?localStorage.HAYrefreshTime*1000:"15000";
var refreshTimer = setInterval(HAYcleanRefresh, HAYrefreshTime);
var HAYtimezone;
var HAYtwentyfourhour;
try{
    HAYtimezone = window.Ponychan.settings.get("time-zone");
    HAYtwentyfourhour = window.Ponychan.settings.get("twelve-hour");
}catch(e){
    HAYtimezone = localStorage.HAYtimezone?localStorage.HAYtimezone:"0";
    HAYtwentyfourhour = localStorage.HAYtwentyfourhour?localStorage.HAYtwentyfourhour:"false";
}
var HAYunread = 0;
var HAYpageTitle = document.title;
var HAYunfocused = false;

HAYcreateQuickReply();
document.getElementById("HAYQRmover").addEventListener("mousedown",HAYDownQuickReply, false);
document.getElementById("HAYQRmover").addEventListener("mouseup", HAYUpQuickReply, false);
document.addEventListener("mousemove", HAYdragQuickReply, false);
window.addEventListener("blur", function(){HAYunfocused=true;});
document.body.addEventListener("mouseout", function(){HAYunfocused=true;});
document.body.addEventListener("mouseover", function(){HAYunfocused=false; HAYunread = 0; document.title = HAYpageTitle;});
window.addEventListener("focus", function(){HAYunfocused=false; HAYunread = 0; document.title = HAYpageTitle;});
window.scrollTo(0, document.body.clientHeight);

//make the page refresh cleanly
function HAYcleanRefresh(){
    var req = new XMLHttpRequest();
    req.open("GET", location.href, true); 
    req.onreadystatechange=function(){
        if(req.readyState == 4 && (req.status == 200 || req.status == 302)){
            var res = req.responseText;
            var tabls = document.getElementById("firstpageinside").getElementsByTagName("TABLE");
            var lastKnownPost = tabls[tabls.length-1].children[0].children[0].children[1].id;
            var parser = new DOMParser();
            var doc;
            doc = parser.parseFromString(res, "text/html"); //my original FF implementation
            if(doc == null) { //chromium workaround
                doc = document.implementation.createHTMLDocument();
                doc.write(res);
            }
            var addedElements = new Array();
            var tabls2 = doc.getElementById("firstpageinside").getElementsByTagName("TABLE");
            var j = tabls2.length-1;
            var adopted = new Array();
            while(j>0 && tabls2[j].children[0].children[0].children[1].id!=lastKnownPost){
                adopted.push(document.importNode(tabls2[j], true));
                j--;
            } 
            while(adopted.length>0){
                var currentNode = adopted.pop();
                currentNode.getElementsByClassName("posttime")[0].innerHTML = correctTime(currentNode);
                HAYcollectReplies(currentNode);
                HAYgetPreviews(currentNode);
                HAYplayGIF(currentNode);
                HAYinsertLinks(currentNode);
                tabls[tabls.length-1].parentNode.insertBefore(currentNode,tabls[tabls.length-1].nextSibling);
                if(currentNode.getElementsByClassName("postername")[0].children[0]!=null){
                   if(currentNode.getElementsByClassName("postername")[0].children[0].innerHTML != document.getElementsByname("name")[0].value) HAYunread++;
                    //console.log("link: " + currentNode.getElementByClassName("postername")[0].children[0].innerHTML + ", " + document.getElementsByName("name")[0].value);
                }else{
                    if(currentNode.getElementsByClassName("postername")[0].innerHTML != document.getElementsByName("name")[0].value) HAYunread++;
                    //console.log("no link: " + currentNode.getElementsByClassName("postername")[0].innerHTML + ", " + document.getElementsByName("name")[0].value);
                }
            }
            if(HAYunread>0 && HAYunfocused == true){
                document.title = HAYpageTitle + " (" + HAYunread + ")";
                window.scrollTo(window.pageXOffset, document.body.scrollHeight);
            }
            document.getElementById("errorArea").innerHTML = "";
        }else if(req.readyState == 4 && !(req.status == 200 || req.status == 302)){
            document.getElementById("errorArea").innerHTML = "A recieving error has occurred: " + req.status;
        }
    }
    req.send();
}

//make the page send cleanly
function HAYcleanSend(){
    var req = new XMLHttpRequest();
    req.open("POST","http://www.ponychan.net/chan/board.php", true);
    req.onreadystatechange=function(){
        if(req.readyState == 4 && (req.status == 200 || req.status == 302)){
            document.getElementsByName("message")[0].value="";
            document.getElementsByName("imagefile")[0].value="";
            document.getElementById("quickmessage").value="";
            HAYcleanRefresh();
        }else if(req.readyState == 4 && !(req.status == 200 || req.status == 302)){
            document.getElementById("errorArea").innerHTML = "A sending error has occurred: " + req.status;
        }
        document.getElementById("quicksubmit").disabled = false;
        document.getElementById("quicksubmit").innerHTML = "Reply";
    }
    document.getElementById("quicksubmit").disabled = true;
    document.getElementById("quicksubmit").innerHTML = "Sending...";
    req.send(new FormData(document.getElementById("postform")));   
}

//runs HAYcollectReplies in a timed fashion
//watch it. If you screw up any function called by this function then they will all go wacky. 
var HAYlinkruns = 0;
var HAYlinkcomplete = document.getElementById("firstpageinside").getElementsByTagName("TABLE").length-1;
var HAYruninterval = setInterval(HAYtraverseLinks, 200);
function HAYtraverseLinks(){
    var tabls = document.getElementById("firstpageinside").getElementsByTagName("TABLE");
    var fromPageBottom = document.body.scrollHeight - window.pageYOffset;
    for(var i = 0;HAYlinkruns<HAYlinkcomplete && i<50; i++,HAYlinkruns++){
        HAYcollectReplies(tabls[HAYlinkcomplete - HAYlinkruns]);
        HAYplayGIF(tabls[HAYlinkcomplete - HAYlinkruns]);
        HAYinsertLinks(tabls[HAYlinkcomplete - HAYlinkruns]);
    }
    if(document.body.scrollHeight - fromPageBottom > 100) window.scrollTo(window.pageXOffset, document.body.scrollHeight - fromPageBottom);
    if(HAYlinkruns>=HAYlinkcomplete){
        clearInterval(HAYruninterval);
    }
}

//moves the quick reply box
var HAYxOffset = 0; 
var HAYyOffset = 0;
var QRdrag = false;
function HAYdragQuickReply(pos){
    if(QRdrag == true){
    var quickReply = document.getElementById("HAYquickReply");
        if(HAYxOffset == 0){ 
            HAYxOffset = pos.clientX - quickReply.style.left.substr(0, quickReply.style.left.length - 2);
            HAYyOffset = pos.clientY - quickReply.style.top.substr(0, quickReply.style.top.length - 2);
            //console.log("%i - %i = %i, %i - %i = %i", pos.clientX, quickReply.style.left, HAYxOffset, pos.clientY, quickReply.style.top, HAYyOffset);
        }else{
            quickReply.style.left = new String(pos.clientX - HAYxOffset).concat("px");
            quickReply.style.top = new String(pos.clientY - HAYyOffset).concat("px");
        }
        window.getSelection().removeAllRanges();
    }            
}
function HAYDownQuickReply(){
    QRdrag = true;
}
function HAYUpQuickReply(){
    QRdrag = false;
    HAYxOffset = 0;
    HAYyOffset = 0;
}

//will poll and make sure reply forms are the same
var matchReplies = "quickmessage"; //the reply box being used: message or quickmessage
setInterval(HAYmatchReplies, 200);
function HAYmatchReplies(){
    if(matchReplies == "message"){
        document.getElementById("quickmessage").value = document.forms.postform.message.value;
        document.getElementById("quickimagefile").value = document.forms.postform.imagefile.value.substring(document.forms.postform.imagefile.value.lastIndexOf("/")==-1?document.forms.postform.imagefile.value.lastIndexOf("\\"):document.forms.postform.imagefile.value.lastIndexOf("/"));
    }else if(matchReplies == "quickmessage"){
        document.forms.postform.message.value = document.getElementById("quickmessage").value;
        document.getElementById("quickimagefile").value = document.forms.postform.imagefile.value.substring(document.forms.postform.imagefile.value.lastIndexOf("/")==-1?document.forms.postform.imagefile.value.lastIndexOf("\\"):document.forms.postform.imagefile.value.lastIndexOf("/"));
    }
}

//creates the quick reply box
function HAYcreateQuickReply(){
    var quickReply = document.createElement("DIV");
    quickReply.id = "HAYquickReply";
    quickReply.setAttribute("class","postblock");
    quickReply.setAttribute("style","display:block;position:fixed;padding: 0px 2px 2px;");
    quickReply.style.left = new String(window.innerWdith*0.6>window.innerWidth - 530?window.innerWidth*0.6:window.innerWidth - 530).concat("px");
    quickReply.style.top = "50px";
    quickReply.innerHTML="<div id=\"HAYQRmover\" style=\"font-family:Sans-Serif;text-align:center;cursor:default\" class=\"postername\">HAYcreatequickreply</div><div id=\"errorArea\" style=\"font-weight:bold;color:#992222;\"></div><textarea id=\"quickmessage\" style=\"font-family:Serif;height:150px;width:484px\"></textarea><br \><textarea style=\"height:18px;width:344px;\" multiline=\"false\" id=\"quickimagefile\" disabled></textarea><button type=\"button\" style=\"width:70px;height:26px;vertical-align:top;\" id=\"quickimagefilebutton\">Browse</button><button type=\"button\" style=\"height:26px;width:70px;position:fixed;vertical-align:top\" id=\"quicksubmit\">Reply</button>";
    document.getElementById("firstpageinside").appendChild(quickReply);
    document.getElementById("quickmessage").addEventListener("focus", function(){matchReplies = "quickmessage"}, false);
    document.forms.postform.message.addEventListener("focus", function(){matchReplies = "message"}, false);
    document.getElementById("quickimagefile").addEventListener("click", function(){document.forms.postform.imagefile.click();matchReplies = "quickmessage"}, false);
    document.getElementById("quickimagefilebutton").addEventListener("click", function(){document.forms.postform.imagefile.click();matchReplies = "quickmessage"}, false);
    document.forms.postform.imagefile.addEventListener("focus", function(){matchReplies = "message"}, false);
    document.getElementById("quickmessage").addEventListener("blur", function(){matchReplies = "null"}, false);
    document.forms.postform.message.addEventListener("blur", function(){matchReplies = "null"}, false);
    document.forms.postform.imagefile.addEventListener("blur", function(){matchReplies = "null"}, false);
    document.getElementById("quicksubmit").addEventListener("click", HAYcleanSend, false);
}

//make the HAYmenu drop down
var menuClosed = true;
var HAYmenu = document.createElement('div');
HAYmenu.id = 'haymenu';
function HAYmenuClick(){
    var menuRect = document.getElementById('haymenutitle').getBoundingClientRect();
    var HAYmenuStyle = "position:fixed;top:" + menuRect.bottom + "px;left:" + menuRect.left + "px;display:block;padding:4px;";
    HAYmenu.setAttribute("style", HAYmenuStyle);
    HAYmenu.setAttribute('class', 'darkbar');
    var refreshTime = localStorage.HAYrefreshTime!=null?localStorage.HAYrefreshTime:"20";
    if(menuClosed == true){
        document.getElementById('verytopbar').insertBefore(HAYmenu,document.getElementById('homedropdown'));
        HAYmenu.innerHTML = "Refresh Time:<br><input type=\"text\" size=\"3\" value=\"" + refreshTime + "\" id=\"HAYrefreshTime\"></input>Seconds<br>"
        try{
            HAYmenu.innerHTML = HAYmenu.innerHTML + "24-hour time: <input type=\"checkbox\" " + (HAYtwentyfourhour=="true"?"checked":"") + " id=\"HAYtwentyfourhour\" /><br>Timezone:<input type=\"text\" value=\"" + HAYtimezone + "\" size=3 id=\"HAYtimezone\" /><br>";
        }catch(e){
            HAYmenu.innerHTML = HAYmenu.innerHTML + "24-hour time: <input type=\"checkbox\" id=\"HAYtwentyfourhour\" /><br>Timezone:<input type=\"text\" value=\"0\" size=3 id=\"HAYtimezone\" /><br>";
        }
        var apply = document.createElement("button");
        apply.type = "button";
        apply.innerHTML = "APPLY";
        HAYmenu.appendChild(apply);
        apply.addEventListener("click", function(){
           localStorage.HAYrefreshTime =  parseInt(document.getElementById("HAYrefreshTime").value);
           localStorage.HAYtimezone = parseInt(document.getElementById("HAYtimezone").value);
           localStorage.HAYtwentyfourhour = document.getElementById("HAYtwentyfourhour").checked;
           window.location.reload();
        });
        document.getElementById('haymenutitle').innerHTML='HAY ▲';
        menuClosed = false;
    }else{
        HAYmenu.parentNode.removeChild(HAYmenu);
        document.getElementById('haymenutitle').innerHTML='HAY ▼';
        menuClosed = true;
    }
}

//here is a function to correct the time on the posts
function correctTime(elem){
    var timezone;
    var twentyfourhour;
    try{
        timezone = window.Ponychan.settings.get("time-zone") + 8;
        twentyfourhour = window.Ponychan.settings.get("twelve-hour");
    }catch(e){  //fallback settings for dumb browsers
        timezone = HAYtimezone!=null && HAYtimezone!="NaN" && HAYtimezone < 12 && HAYtimezone >-12?parseInt(HAYtimezone) + 8:"8";
        twentyfourhour = HAYtwentyfourhour!=null?HAYtwentyfourhour:"false";
    }
    var postTime = elem.getElementsByClassName("posttime")[0].innerHTML.substring(5,26);
    var postDay = postTime.charAt(5)>='0' && postTime.charAt(5)<='9'?postTime.substring(4,6):postTime.substring(4,5);
    var postYear = postDay<10?postTime.substring(9,13):postTime.substring(10, 14);
    var postMonth = postTime.substring(0, 3);
    postMonth = postMonth=="Jan"?0:postMonth=="Feb"?1:postMonth=="Mar"?2:postMonth=="Apr"?3:postMonth=="May"?4:postMonth=="Jun"?5:postMonth=="Jul"?6:postMonth=="Aug"?7:postMonth=="Sep"?8:postMonth=="Oct"?9:postMonth=="Nov"?10:postMonth=="Dec"?11:postMonth;
    var postHour = postDay<10?postTime.substring(14,16):postTime.substring(15,17);
    var postMinute = postDay<10?postTime.substring(17,19):postTime.substring(18,20);
    var finalDate = new Date(new Date(postYear, postMonth, postDay, postHour, postMinute).getTime()+(3600000*timezone));
    var dateString = finalDate.toString().substring(0,3) + ", " + finalDate.toString().substring(4,10) + ", " + finalDate.getFullYear() + " ";
    //console.log(postTime + ", " + (postTime.charAt(6)>='0' && postTime.charAt(6)<='9') + " " + postYear + " " + postMonth + " " + postHour + " " + postMinute + " " + finalDate.toString() + " " + timezone);
    if(twentyfourhour==false){
        dateString = dateString + finalDate.toString().substring(16, 18) + ":" + finalDate.toString().substring(19,21);
    }else{
        dateString = dateString + (finalDate.getHours()>12?finalDate.getHours()-12:finalDate.toString().substring(16,18)) + ":" + finalDate.toString().substring(19,21) + " <span style=\"font-size:0.75em\">" + (finalDate.getHours()>12?"PM":"AM") + "</span>";
    }
    return dateString;
}

//this function will create links to any post that replies to this one. 
function HAYcollectReplies(elem){
    var links = elem.getElementsByTagName("a");
    var linklength = links.length;
    for(var i = 0; i<linklength; i++){
        if(links[i].innerHTML.trim().substr(0,8) == "&gt;&gt;"){
            if(links[i].innerHTML.trim().substr(8)<elem.children[0].children[0].children[1].id.trim().substr(5)){
                try{
                    var illink = document.createElement("a");
                    illink.href = window.location.href.substr(0, (window.location.href.lastIndexOf("#")>0?window.location.href.lastIndexOf("#"):window.location.href.length)) + "#" + elem.getElementsByClassName("reflink")[0].children[1].innerHTML;
                    illink.innerHTML = ">>" + elem.getElementsByClassName("reflink")[0].children[1].innerHTML;
                    illink.setAttribute("style", "font-size:9pt;color:rgb(0,16,176);");
                    illink.addEventListener("mouseover", HAYaddRefLinkPreview);
                    illink.addEventListener("mouseout", HAYdelRefLinkPreview);
                    document.getElementById("reply" + links[i].innerHTML.trim().substr(8)).children[2].appendChild(illink);
                }catch(e){
                }
            }
        }
    }
}  

//replaces the post links that insert links to the quickmessage box. Makes them work myway. 
function HAYinsertLinks(elem){
    var links = elem.getElementsByClassName("reflink")[0].getElementsByTagName("a");
    var linkslength = links.length;
    if(linkslength > 0){
        for(var i = 0; i<linkslength; i++){
            if(links[i].innerHTML.trim().substr(0,8)!="&gt;&gt;"){
                //console.log("fixing: " + links[i].innerHTML);
                var newlink = document.createElement("a");
                newlink.innerHTML = links[i].innerHTML;
                newlink.href = links[i].href;
                newlink.addEventListener("click", function(e){
                    e.preventDefault();
                    var n = document.getElementById("quickmessage");
                    var text = n.value;
                    var link = e.target.href.substring(e.target.href.lastIndexOf("#") + 1);
                    if(link.substr(0,1) == "i") link = link.substr(1);
                    text = text + ">>" + link + "\n";
                    n.value = text;
                    n.setSelectionRange(n.value.length, n.value.length);
                    n.focus();
                });
                links[i].parentNode.replaceChild(newlink, links[i]);
            }
        }
    }
}

//my function to add the previews when hovering postlinks. I've replaced the kubasa functions.
function HAYgetPreviews(elem){
    var links = elem.getElementsByTagName("a");
    var i = 0;
    while(i<links.length){
        if(links[i].innerHTML.trim().substring(0,8) == "&gt;&gt;"){
            try{
                links[i].addEventListener("mouseover", HAYaddRefLinkPreview);
                links[i].addEventListener("mouseout", HAYdelRefLinkPreview);
            }catch(e){
            }
        }
        i++;
    }
}    

//here is an addreflinkpreview, I didn't override because chrome get's a bit wacky so I'm rewriting myown. 
function HAYaddRefLinkPreview(e){
    HAYunfocused = false;
    var tab = document.createElement("div");
    tab.id = "HAYpreviewThingo";
    tab.innerHTML = document.getElementById("reply" + e.target.innerHTML.trim().substring(8)).innerHTML;
    var pos = e.target.getBoundingClientRect();
    tab.style.position = "fixed";
    tab.style.top = (pos.bottom + 14) + "px";
    tab.style.left = pos.right + "px";
    tab.className="reflinkpreview";
    tab.style.BoxShadow = "4px 4px 2px #888888";
    tab.getElementsByClassName("postfooter")[0].parentNode.removeChild(tab.getElementsByClassName("postfooter")[0]);
    tab.getElementsByClassName("reflink")[0].parentNode.removeChild(tab.getElementsByClassName("reflink")[0]);
    document.body.appendChild(tab);
}

//here is the delreflinkprewiew, no override again. writing it myself. 
function HAYdelRefLinkPreview(e){
    HAYunfocused = true;
    document.body.removeChild(document.getElementById("HAYpreviewThingo"));
}
        
//play the gifs using HAYtraverseLinks to go through them timingly
function HAYplayGIF(elem){
    pic = elem.getElementsByClassName("thumb")[0];
    if(pic!=null){
        if(pic.src.substr(pic.src.length - 3).toLowerCase() == "gif"){
            var rgif = document.createElement("img");
            rgif.style.height = "125px";
            rgif.style.width = "125px";
            rgif.src = pic.parentNode.parentNode.href;
            rgif.style.display = "none";
            rgif.setAttribute("class", "thumb");
            rgif.addEventListener("load", function(e){
                var g = 0;
                var rgif = e.target;
                var fromPageBottom = document.body.scrollHeight - window.pageYOffset;
                if(rgif.height > rgif.width){
                    g = rgif.height/125;
                }else{
                    g = rgif.width/125;
                }
                if(g>0){
                    rgif.setAttribute("style","height:" + rgif.height/g + "px;width:" + rgif.width/g + "px:float:left");
                }
                rgif.style.display="block";
                if(document.body.scrollHeight - fromPageBottom > 100) window.scrollTo(window.pageXOffset, document.body.scrollHeight - fromPageBottom);
            });
            pic.parentNode.replaceChild(rgif, pic);
        }
    }
}
