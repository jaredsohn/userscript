// ==UserScript==
// @name       Pixiv Tagtips
// @version    20130318
// @description  Mouse over a thumbnail to see its tags and metadata
// @match      http://www.pixiv.net/*
// ==/UserScript==
var moused = false;
var container = document.createElement("div");

function checkMouse(){
    setTimeout(function(){if(!moused){container.style.display = "none";}}, 1000);
}

container.setAttribute("style", "width: 100%; position: absolute; top: 0px; left: 0px; white-space: nowrap; text-align: center; background-color: #E4E7EE; display: none;");
container.addEventListener("mouseover", function(){moused=true;}, false);
container.addEventListener("mouseout", function(){moused=false; checkMouse(container);}, false);
document.body.appendChild(container);

var thumblinks = [];
var links = document.getElementsByTagName("a");
for(var i = 0; i < links.length; i++){
    if(links[i].hasAttribute("href") && /^\/member_illust.php\?mode=medium/i.test(links[i].getAttribute("href")))
    thumblinks.push(links[i]);
}

function showData(thumb){
    function generateAPIURL(mediumPageURL, mode, hide, dummy){
        //Reference - http://pixivapi.codeplex.com/
        var baseURL = "http://spapi.pixiv.net/iphone/illust.php?";
        var params = new Array();
        params.push(/PHPSESSID=[^;]*?(?=;|$)/.exec(document.cookie) || "");//Session ID
        params.push(/illust_id=[0-9]*$/.exec(mediumPageURL) || "");//Illust ID
        //Optional Paramaters
        params.push(typeof mode !== "undefined" ? ("mode="+mode) : "");//"day" or "week" or "month"
        params.push(typeof hide !== "undefined" ? ("hide="+hide) : "");//"0" or "1"
        params.push(typeof dummy !== "undefined" ? ("dummy="+dummy) : "");//"0" or "1"
        return baseURL + params.filter(function(x){return(x!=="");}).join("&");
    }
    function applyHTML(html){
        function findPos(obj){
            var curleft = 0, curtop = 0;
            if(obj.offsetParent){
                curleft = obj.offsetLeft;
                curtop = obj.offsetTop;
                while (obj = obj.offsetParent){
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;
                }
            }
            return [curleft,curtop];
        }
        var pos = findPos(thumb);
        container.innerHTML = html;
        container.style.display = "";
        container.style.top = pos[1] - container.clientHeight + "px";
    }
    function handleXHR(xhr){
        function parseAPIString(respTxt){
            function splitCSV(str, sep){
                for (var foo = str.split(sep = sep || ","), x = foo.length - 1, tl; x >= 0; x--) {
                    if (foo[x].replace(/"\s+$/, '"').charAt(foo[x].length - 1) == '"') {
                        if ((tl = foo[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
                            foo[x] = foo[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
                        } else if (x) {
                            foo.splice(x - 1, 2, [foo[x - 1], foo[x]].join(sep));
                        } else foo = foo.shift().split(sep).concat(foo);
                    } else foo[x].replace(/""/g, '"');
                } return foo;
            }
            var f = splitCSV(respTxt, ",");
            if (typeof f === "object" && f.length === 31){
                return{
                    "illustID":f[0],
                    "userID":f[1],
                    "illustExt":f[2],
                    "title":f[3],
                    "unknown1":f[4],
                    "userName":f[5],
                    "illust128URL":f[6],
                    "unused1":f[7],
                    "unused2":f[8],
                    "illust480URL":f[9],
                    "unused3":f[10],
                    "unused4":f[11],
                    "time":f[12],
                    "tags":f[13],
                    "software":f[14],
                    "ratings":f[15],
                    "points":f[16],
                    "views":f[17],
                    "description":f[18],
                    "pages":f[19],
                    "unused5":f[20],
                    "unused6":f[21],
                    "unknown2":f[22],
                    "unknown3":f[23],
                    "userLoginName":f[24],
                    "unused7":f[25],
                    "unknown4":f[26],
                    "unused8":f[27],
                    "unused9":f[28],
                    "userProfileImageURL":f[29],
                    "endMarker":f[30]};
            }
            else {
                console.error("Error: unrecognized pixiv mobile API format!");
                return parseAPIString(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
            }
        }
        if(xhr.readyState === 4){
            var html = "";
            var illustData = parseAPIString(xhr.responseText);
            html += "Pages: " + (illustData.pages || "1") + " Views: " + illustData.views + " Ratings: " + illustData.ratings + ((parseInt(illustData.ratings) > 0) ? (" Score: " + Math.round(parseInt(illustData.points)*10/parseInt(illustData.ratings)) + "%") : "") + "<br/>"; 
            for(var i = 0, t =  illustData.tags.split(" "); i < t.length; i++){
                html += ("| <a href='http://www.pixiv.net/search.php?s_mode=s_tag_full&word=" + t[i] + "'>" + t[i] + "</a> |");
            }
            thumb.setAttribute("pt_html", html);
            if(moused){
                applyHTML(html);
            }
        }
    }
    setTimeout(function(){
        if(moused){
            if(thumb.hasAttribute("pt_html")){
                applyHTML(thumb.getAttribute("pt_html"));
            }
            else{
                var xhr = new XMLHttpRequest();
                xhr.open("GET", generateAPIURL(thumb.getAttribute("href")), true);
                xhr.onreadystatechange = function(){handleXHR(xhr);};
                xhr.send();
                applyHTML("Loading...");
            }
        }
    } ,1000);
}

for(var i = 0; i < thumblinks.length; i++){
    thumblinks[i].addEventListener("mouseover", function(t){return function(){moused=true; showData(t);}}(thumblinks[i]), false);
    thumblinks[i].addEventListener("mouseout", function(t){return function(){moused=false; checkMouse(t);};}(thumblinks[i]), false);
}