// ==UserScript==
// @name Dominion Card Preview
// @description Adds links to auto show card previews in online Dominion
// @include http://dominion.isotropic.org/play
// ==/UserScript==

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
}

function init(){
var gameLoadInterval, lobbyReturnInterval;

function createDialog(cardDetails, left, top){
    var dialogContent = "<div style=margin-left:3px; visibility:visible;padding-bottom:5px;' class='goog-tooltip'>";
    dialogContent += '<div class="ttcard">' + cardDetails.text + "</div></div>";
    return dialogContent;
};

function startGameLoad(){
    if(lobbyReturnInterval){
        clearInterval(lobbyReturnInterval);
    }
    gameLoadInterval = setInterval(function(){
        var elements = document.getElementsByClassName("cardname");
        //Only proceed once we have found card elements
        if(elements.length === 0){
            return;
        }
        clearInterval(gameLoadInterval);
        var cardDetailList = window.We,
            parentDialogElement = document.createElement("div");
        parentDialogElement.id = "customCardDialog";
        document.body.appendChild(parentDialogElement);

        var customStyling = document.createElement('style');
        customStyling.setAttribute('type', 'text/css');
        customStyling.textContent = "#customCardDialog {background-color: #C5C5C5; position:fixed; top:0; width:29ex; height:100%; overflow-y:scroll; white-space:nowrap}\n" + 
                                    "#customCardDialog .ttcard{width: 24ex;padding-bottom:0;}\n" +
                                    "#customCardDialog .itype{position:static;}\n" +
                                    "#customCardDialog .itext{white-space:normal;}\n" +
                                    "#game #supply{margin-left:200px;}\n" +
                                    "#game .right {margin-left:550px;}\n" +
                                    ".ititle, .icost, .itype {margin:1px;}\n" +
                                    "p.c, p.t {margin:0}\n";
        document.head.appendChild(customStyling);
        
        for(var i=0; i<elements.length; i++){
            var card = elements[i],
                childElements = card.childNodes,
                cardName = null;
            for(var j=0; j<childElements.length; j++){
                if(childElements[j].tagName && childElements[j].className !== 'extra'){
                    cardName = childElements[j].innerText;
                    break;
                }
            }
            if(cardName === null || !cardDetailList[cardName]){
                alert("It looks like the card list variable name changed again :(");
                return;
            }
            var cardInfo = cardDetailList[cardName],
                dialogHtml = createDialog(cardInfo);
            parentDialogElement.innerHTML += dialogHtml;
        }
        startLobbyInterval();
  }, 200);
}

function startLobbyInterval(){
    lobbyReturnInterval = setInterval(function(){
        var lobbyCheck = document.getElementsByClassName('lobby');
        if(lobbyCheck.length === 0){
            return;
        }
        var cardDialog = document.getElementById('customCardDialog');
        cardDialog.parentNode.removeChild(cardDialog);
        startGameLoad();
    }, 2000);
}
startGameLoad();
}
exec(init);