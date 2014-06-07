// ==UserScript==
// @name       		MangaFox Chapter Marker
// @namespace  		http://mangafox.me/manga/
// @version			0.6
// @description 	mark chapter as read/unread
// @match			http://mangafox.me/manga/*
// @run-at			document-body
// @require			http://code.jquery.com/jquery-latest.min.js
// @copyright		2013+, GU
// ==/UserScript==

var connector = {};
var url = window.location.toString();
var mangaName = url.indexOf("manga/") == -1 ? "" : url.substr(url.indexOf("manga/") + "manga/".length);
mangaName = mangaName.substring(0, mangaName.indexOf("/"));
if(mangaName){
    var userName =  $("#corner>ul a").last().text() || "";
    if(userName && userName != "Login")
        localStorage.userName = userName;    
    retrieveStorage(function(){
        if(url.indexOf("html") == -1){
            setTimeout(function(){
                $("#warning_extra a").click();
            },1000);
            var mStorage = jQuery.parseJSON(localStorage[mangaName] || null) || {}; 
            if(mStorage){
                for(var key in mStorage){
                    var chapter = $(".tips[href*='" + key + "/']")[0];
                    var dateDiv = $(chapter).parent().parent().find(".date")[0];
                    dateDiv.innerHTML = "✓ " + dateDiv.innerHTML;
                    dateDiv.style.color = "#999";
                    dateDiv.title = "Read : " + stringDateTime(mStorage[key]);
                }
            }
            $("div>span.date").click(function(){
                connector.timeOffset = new Date();
                var href = $(this).parent().find(".tips")[0].href;
                if(this.innerHTML.indexOf("✓") != -1){
                    this.innerHTML = this.innerHTML.substr(2);
                    this.style.color = "#666";
                    delete this.title;
                    delete mStorage[getChapterKey(href)];
                    localStorage[mangaName] = JSON.stringify(mStorage);
                }else{
                    var dateTime = new Date().getTime();                
                    this.innerHTML = "✓ " + this.innerHTML;
                    this.style.color = "#999";
                    this.title = "Read : " + stringDateTime(dateTime);
                    mStorage[getChapterKey(href)] = dateTime;
                    localStorage[mangaName] = JSON.stringify(mStorage);
                }
                if(connector.interval == undefined)
                    connector.interval = setInterval(prepareAndStoreData, 500);
            }).hover(function(){ this.style.cursor = "pointer"; }, function(){ this.style.cursor = "default"; });
        }else{            
            mStorage = jQuery.parseJSON(localStorage[mangaName] || null) || {}; 
            mStorage[getChapterKey(url)] = new Date().getTime();
            localStorage[mangaName] = JSON.stringify(mStorage);
            saveStorage();
        }
    });
}

function prepareAndStoreData(){
    if(new Date() - connector.timeOffset > 3500){
        clearInterval(connector.interval);
        connector.interval = undefined;
        saveStorage();
    }
}

function getChapterKey(url){
    var _split = url.split("/");
    return _split[_split.length-2]; 
}

function stringDateTime(data){
    var mName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var currentdate = new Date(data); 
    return isNaN(data) ? data : mName[currentdate.getMonth()]  + " " // Jan = Month 0
    + currentdate.getDate() + ", "                
    + currentdate.getFullYear() + " @ "  
    + timeFormat(currentdate.getHours()) + ":"  
    + timeFormat(currentdate.getMinutes());
    //+ ":" + currentdate.getSeconds();
}

function timeFormat(time){
    return (time.toString().length < 2) ? "0" + time : time;
}

function saveStorage(callback){
    var userName = localStorage.userName;
    if(userName){
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://api.openkeyval.org/" + userName + "-" + mangaName + "-mangafox",
            data: "data=" + JSON.stringify(localStorage[mangaName]),
            headers: {  "Content-Type": "application/x-www-form-urlencoded" },
            onload: function(response) {
                if(response.status === 200){
                    notifyComplete();
                }else{
                    console.log("error", response);
                    alert("cannot save data :",response);
                }
            },onerror: function(response){
                console.log("error", response);
                alert("cannot save data :",response);
            }
        });
    }
    function notifyComplete(){
        $('<div style="position: fixed; top: 48%; left: 47%; font-size: 40px;">Saved</div>').appendTo(document.body).fadeOut(2000, function(){ 
            $(this).remove(); 
        });
    }
}
function retrieveStorage(callback){
    var userName = localStorage.userName;
    if(userName){
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://api.openkeyval.org/" + userName + "-" + mangaName + "-mangafox?nocache=" + new Date(),
            headers: {  "Content-Type": "application/javascript" },
            onload: function(response) {
                try{
                    if(response.status === 200){
                        var mStorage = jQuery.parseJSON(response.responseText);                        
                        // temp code             
                        var data = JSON.parse(mStorage);
                        for(var ch in data){
                            var p = data[ch];
                            if(isNaN(p)){
                                var index = p.indexOf(":");                      
                                data[ch] = new Date( p.substring(p.indexOf(",") + 2, p.indexOf("@") - 1) , 7 , p.substring(4, p.indexOf(",")) , parseInt(p.substring(index-2,index)) , parseInt(p.substring(index +1 ,index+3)) ).getTime();                                
                            }
                        }       
                        mStorage = JSON.stringify(data);
                        // temp code
                        console.log("mStorage :", mStorage);
                        localStorage[mangaName] = mStorage;                        
                    }else
                        console.log(response);
                    if(callback)
                        callback();
                }catch(err){
                    alert("retrieve data error : " , err);
                    console.log(err);
                }
            },onerror: function(response){
                console.log(response);
            }
        });
        //console.log("try to retrieve :" , "http://api.openkeyval.org/" + userName + "-" + mangaName + "-mangafox?nocache=" + new Date());
    }
}

/*
 * convert old pattern
 * 
 for(key in localStorage){
    var data = localStorage[key];
    try{
       var parseData = JSON.parse(data);
       if(typeof parseData == "object"){
           for(var ch in parseData){
                var p = parseData[ch];
                if(isNaN(p)){ //Sep 16, 2013 @ 09:55
                    var index = p.indexOf(":");                      
                    parseData[ch] = new Date(p.substring(p.indexOf(",") + 2, p.indexOf("@") - 1), 7 , p.substring(4, p.indexOf(",")), parseInt(p.substring(index-2,index)), parseInt(p.substring(index +1 ,index+3))).getTime();
                }
           }
       }
       localStorage[key] = JSON.stringify(parseData);
    }catch(e){}
}
 * *
 */