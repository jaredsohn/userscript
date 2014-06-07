// ==UserScript==
// @name Android Developer Console - Hide Apps
// @namespace http://fsmv.co.cc
// @description Allows the user to hide unpublished apps in the Android Developer Console so they don't have to look at them anymore.
// @version 0.8
// @include https://play.google.com/apps/publish/*
// @include http://play.google.com/apps/publish/*
// @grant none
// ==/UserScript==

var _timer = setInterval(onPageReady, 500); 
var loaded = false;

/**
 * Initializer function called after a time delay. Required because Google does some fancy javascript loading and the script gets called twice 
 */ 
function onPageReady() {
    if (loaded || (document.getElementById('la-loadingBox') != null && document.getElementById('la-loadingBox').style.display == 'none')) {
        loaded = true;
        function getElementsById(id) {
           var a = document.getElementsByTagName("a");
           var arr = new Array();

           for (var i=0; i < a.length; i++) {
              if (a[i].id == id) {
                 arr[arr.length] = a[i];
              }
           }
           return arr;
        }
        
        /**
         * Toggles an app's hidden state
         * 
         * Called when the X button, or the ^ button on a hidden app, is pressed                           
         */                 
        
        function onCloseButtonClick(){
            var app = this.parentNode.parentNode;
            if(this.innerHTML == 'X'){
                document.getElementById("hiddenAppsContainer").appendChild(app);
                app.getElementsByTagName("a")[7].innerHTML = "^";
                var appName = app.getElementsByTagName("div")[0].getElementsByTagName("a")[0].innerHTML;
                setHidden(appName, true);
            }else if(this.innerHTML == '^'){
                document.getElementById("gwt-debug-applistingappList").appendChild(app);
                app.getElementsByTagName("a")[7].innerHTML = "X";
                var appName = app.getElementsByTagName("div")[0].getElementsByTagName("a")[0].innerHTML;
                setHidden(appName, false);
            }
        }
        
        /**
         * Toggles the visibility of the hidden apps and toggles the arrow orientation 
         *                 
         * Handler called when the div[@id=hiddenApps] is clicked
         */                 
        function onClickHideApps(){
            var hiddenDiv = document.getElementById("hiddenAppsContainer");
            if(hiddenDiv.getAttribute("style") == 'display:none;'){
                hiddenDiv.setAttribute("style", "display:block;");
                this.innerHTML = this.innerHTML.replace("&gt;", "V");
            }else{
                hiddenDiv.setAttribute("style", "display:none;");
                this.innerHTML = this.innerHTML.replace("V", "&gt;");
            }
        }
        
        /**
         * Reads saved data and hides the previously hidden apps.
         * 
         * Only run after creating all of the other elements                  
         */                 
        function hideApps(){
            var apps = document.getElementById('gwt-debug-applistingappList').childNodes;
            for(var i=0; i<apps.length; i++){
                var appName = apps[i].getElementsByTagName("div")[0].getElementsByTagName("a")[0].innerHTML;
                if(isHidden(appName)){
                    apps[i].getElementsByTagName("a")[7].innerHTML = "^";
                    document.getElementById("hiddenAppsContainer").appendChild(apps[i]);
                }
            }
        }
        
        srclinks = getElementsById('gwt-debug-statsLink');
        //Everything inside this conditional only gets called once and only after the page is fully loaded
        if(srclinks.length > 0){
            for (i = 0; i < srclinks.length; i++) {    
                clearInterval(_timer);
                var statlink = srclinks[i].href;
                var patt = /StatsPlace.p=(.+)/i;
                var pkg = statlink.match(patt)[1];
                var link = "https://play.google.com/store/apps/details?id=" + pkg;
                var a = document.createElement("a");
                a.href = link;
                a.innerHTML = "Market Link";
                tr = document.createElement("tr");
                listdiv = document.getElementById('gwt-debug-applistingappList');
                targettd = listdiv.childNodes[i].getElementsByTagName("table")[1].firstChild;
                tr.appendChild(a);
                targettd.appendChild(tr);
                
                var appHTML = listdiv.childNodes[i].innerHTML;
                if(appHTML.indexOf("Unpublished") != -1){
                    var closeButton = document.createElement('a');
                    closeButton.setAttribute("style", "display:block; color:#aaa; text-decoration:none;");
                    closeButton.setAttribute("href", "#");
                    closeButton.setAttribute("id", "closeButton"); 
                    closeButton.innerHTML = "X";
                    closeButton.addEventListener('click', onCloseButtonClick, false);
                    var targetDiv = listdiv.childNodes[i].getElementsByTagName("div")[12].firstChild;
                    targetDiv.parentNode.insertBefore(closeButton, targetDiv);
                }
            }
            
            var hideAppsDiv = document.createElement('div');
            hideAppsDiv.setAttribute("class", "listingRow");
            hideAppsDiv.innerHTML = "<div id=\"hiddenApps\">&gt; Hidden Apps</div><div id=\"hiddenAppsContainer\" style=\"display:none;\"></div>";
            var target = document.getElementById("gwt-debug-applistingappList");
            target.parentNode.insertBefore(hideAppsDiv, target.nextSibling);
            document.getElementById("hiddenApps").addEventListener('click', onClickHideApps, false);
            
            hideApps();
        }
    }
}

/**
 * Checks localStorage to see if an app should be hidden or not
 * 
 * @args String 
 * @return boolean: hidden status in the preferences  
 */ 
function isHidden(name){
    var result = localStorage.getItem(name);
    if(result){
        return strToBool(result);
    }else{
        localStorage.setItem(name, "0");
        return false;
    }
}

/**
 * Sets the localStorage preferences to whatever the arguments specify
 * @args String, bool 
 */ 
function setHidden(name, hidden){
    localStorage.setItem(name, boolToStr(hidden));
}

/**
 * Transforms a string encoded as a boolean to the actualy boolean type
 *  
 * @args String
 * @return boolean value of str  
 * @throws IllegalArgumentException if string is not equal to "0" or "1"   
 */ 
function strToBool(str){
    if(str == '0'){
        return false;
    }else if(str == '1'){
        return true;
    }else{
        throw "IllegalArgumentException: Argument is neither \"0\" nor \"1\": " + str;
    }
}
/**
 * Encodes a boolean value into a string
 *  
 * @args bool
 * @return a string with the value of "0" if false or "1" if true
 */ 
function boolToStr(bool){
    if(bool){
        return "1";
    }else{
        return "0";
    }
}