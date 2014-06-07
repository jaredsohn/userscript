// ==UserScript==
// @name			ROBLOX Backgrounds
// @version			3.3
// @description		Changes the ROBLOX Website background to something more beautiful.
// @include			*://*.roblox.com*
// @author		    celliott1997
// @namespace       http://www.roblox.com/user.aspx?username=glosgreen2
// @icon  http://s3.amazonaws.com/uso_ss/icon/172092/large.png
// ==/UserScript==

var bgs = new Array(
    Array("http://i.imgur.com/LQhwgrV.jpg", 47324),
    Array("http://i.imgur.com/tGQwZaq.png", 89112685),
    Array("http://i.imgur.com/4TehtXX.png", 46315274),
    Array("http://i.imgur.com/zPZ7S0k.png", 30592816),
    Array("http://i.imgur.com/XXpKly1.png", 49059562)
);

var chatCont = document.getElementById("ChatContainer");
var mastCont = document.getElementById("MasterContainer");
var repoBack = document.getElementById("RepositionBody");

function getBackground(){
    var rand = bgs[Math.floor(Math.random() * bgs.length)];
    setBackground(rand[0]);
    addPlayButton(rand[1]);
};

function setBackground(url){
    mastCont.style.background = "transparent";
    //chatCont.style.background = "#e6e6e6";
    repoBack.setAttribute("style",repoBack.style+";padding:0 10px 0 10px;margin-top:10px;");
    document.body.setAttribute("style",document.body.style+";background:#e6e6e6 url(\""+url+"\") no-repeat fixed;background-size:cover;");
};

function addPlayButton(placeId){
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id","gameLauncherButton");
    newDiv.setAttribute("style","background:rgba(0,0,0,.7);position:fixed;right:25px;bottom:25px;padding:4px;opacity:0.9;width:141px;height:86px;");
    var newImg = document.createElement("img");
    newImg.setAttribute("style","background:#FFF;border:0;cursor:pointer;width:100%;height:100%;");
    newImg.setAttribute("src","http://www.roblox.com/Thumbs/Asset.ashx?format=png&width=420&height=230&assetId="+placeId);
    var newTxt = document.createElement("a");
    newTxt.setAttribute("style","width:100%;position:absolute;height:10px;background:rgba(0,0,0,.7);padding:5px 0 10px 0;left:0;bottom:0;color:white;text-align:center;margin-bottom:1px;font-weight:bold;cursor:pointer;text-decoration:none;text-transform:lowercase;");
    newTxt.innerHTML = "Click to play";
    
    newDiv.appendChild(newTxt);
    newDiv.appendChild(newImg);
    
newImg.onclick = function(){
  Roblox.GenericConfirmation.open({titleText:"Play this game?", bodyContent:"Would you like to play the game being previewed in the background? <hr> Or view the game page <a href='/Item.aspx?id="+placeId+"' title='View game page'>here</a>.", footerText:"Any open games will be closed", acceptText:Roblox.GenericConfirmation.Resources.yes, declineText:Roblox.GenericConfirmation.Resources.No, acceptColor:Roblox.GenericConfirmation.blue, declineColor:Roblox.GenericConfirmation.gray, allowHtmlContentInBody: true, xToCancel: false, dismissable:false, imageUrl:newImg.getAttribute("src"),onAccept:function(){RobloxLaunch.RequestGame("PlaceLauncherStatusPanel", placeId)}});
};

//        if(confirm("Visit this game?")){
//             Roblox.Client.WaitForRoblox(function(){RobloxLaunch.RequestGame("PlaceLauncherStatusPanel", placeId)});
//        };
//    };
    
    document.body.appendChild(newDiv);
};

getBackground();