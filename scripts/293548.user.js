// ==UserScript==
// @name		My Fancy New Userscript
// @namespace	http://use.i.E.your.homepage/
// @version		0.1
// @description	enter something useful
// @match		https://www.facebook.com/settings
// @include		https://www.facebook.com/settings/*
// @include		http://www.facebook.com/settings/*
// @copyright	2012+, You
// ==/UserScript==


function addTable() {
    console.log("Entered addTable");
    if(!document.getElementsByClassName("myGroupSettings")[0]) {
        var myDownload = document.getElementsByClassName("mvm phm uiP fsm fcg")[0];
        var myDownload_copy = myDownload.cloneNode(true);
        myDownload_copy.style.paddingLeft = "20px";
        myDownload.parentNode.removeChild(myDownload);
        
        var myBottom = document.getElementById("bottomContent").cloneNode(true);        
        document.getElementById("bottomContent").parentNode.removeChild(document.getElementById("bottomContent"));
        
        var par = document.getElementById("contentCol");
        var myHeader = document.getElementById("headerArea").cloneNode(true);
        myHeader.setAttribute("class","myGroupSettings");
        par.appendChild(myHeader);
        
        var temp = document.getElementsByClassName("uiHeaderTitle");
        temp[temp.length-1].innerHTML = "Group Settings";
        
        myHeader.style.marginTop = "10px";
        
        var myContentArea = document.createElement("div");
        myContentArea.setAttribute("id","contentArea");
        myContentArea.setAttribute("role","main");
        par.appendChild(myContentArea);
        
        var mySettings_content = document.createElement("div");
        mySettings_content.setAttribute("id","SettingsPage_Content");
        myContentArea.appendChild(mySettings_content);
        
        var ul = document.createElement("ul");
        ul.setAttribute("class","uiList fbSettingsList _4kg _4ks");
        ul.setAttribute("id","myUlist");
        mySettings_content.appendChild(ul);
        
        var li = document.createElement("li");
        li.setAttribute("class","fbSettingsListItem clearfix _5b2_ fbSettingsListItemLabeled");
        li.setAttribute("id","myListEl");
        ul.appendChild(li);
        
        var ach = document.createElement("a");
        ach.setAttribute("class","pvm phs fbSettingsListLink clearfix");
        ach.style.height = "34px";
        ach.style.paddingTop = "0px";
        ach.style.paddingBottom = "0px";
        li.appendChild(ach);
        
        var h3 = document.createElement("h3");
        h3.setAttribute("class","pls fbSettingsListItemLabel");
        h3.innerHTML = "Group Name";
        h3.style.paddingTop = "9px";
        ach.appendChild(h3);
        
        var ip = document.createElement("input");
        ip.setAttribute("id","myPass");
        ip.setAttribute("Placeholder","Enter group name here.");
        ip.setAttribute("class","DOMControl_placeholder");
        ip.setAttribute("type","text");
        ip.setAttribute("style","outline:none;height:20px;border:1px #ddd solid;font:10pt Consolas;margin-top: 5px;width:250px;padding-left:9px");
        ach.appendChild(ip);
        
        var span1 = document.createElement("span");
        span1.style.paddingLeft="23px";
        span1.setAttribute("class","uiIconText fbSettingsListItemEdit");
        span1.innerHTML = "Generate Key";
        span1.style.paddingTop = "10px";
        span1.setAttribute("id","generate");
        ach.appendChild(span1);
        
        
        
        par.appendChild(myBottom);
        par.appendChild(myDownload_copy);
        
        
        
        span1.addEventListener("click",function() {
            
            var ul = document.getElementById("myUlist");
            var li = document.createElement("li");
            li.setAttribute("class","fbSettingsListItem clearfix _5b2_ fbSettingsListItemLabeled");
        
            var ach = document.createElement("a");
            ach.setAttribute("class","pvm phs fbSettingsListLink clearfix");
            li.appendChild(ach);
        
            var h3 = document.createElement("h3");
            
            h3.setAttribute("class","pls fbSettingsListItemLabel");
            h3.innerHTML = document.getElementById("myPass").value;
            ach.appendChild(h3);
        
            var span = document.createElement("span");
            span.style.paddingLeft="23px";
            span.setAttribute("class","uiIconText fbSettingsListItemEdit");
            span.innerHTML = "Delete";
            span.setAttribute("id","delButton");
            ach.appendChild(span);
            
            span.addEventListener("click",function(){
                var par = this.parentNode.parentNode.parentNode;
                par.removeChild(this.parentNode.parentNode);
                //alert();
            },false);
        
            var span2 = document.createElement("span");
            span2.setAttribute("class","fbSettingsListItemContent fcg");
            span2.innerHTML = "ASDGASDJhdhad785547658AShg==";
            ach.appendChild(span2);
            
            ul.appendChild(li);
        },false);        
        
    }
}


document.addEventListener("DOMContentLoaded", function(event) {
    addTable();
});