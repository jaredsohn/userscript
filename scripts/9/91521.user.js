// ==UserScript==
// @name           Kill All On World(Fallensword)
// @namespace      Kill All On World(Fallensword)
// @include        http://*fallensword.com/*
// ==/UserScript==

function $(id) {
	return document.getElementById(id);
}

var fsKillEmAll = {
  attack   : {
    aLinkId        : 'aLink',
    maxKills       : 8,
    
    
    repairItemsLink : 'http://fallensword.com/index.php?cmd=blacksmith&subcmd=repairall&fromworld=1'
    
  },
  
  kill : function (index) {
    var attackLink = $(fsKillEmAll.attack.aLinkId+index).href;
    var xReq       = new XMLHttpRequest;
    xReq.open("GET", attackLink, true);
    xReq.onreadystatechange = function (){
                                if ( this.readyState == 4 ) {
                                  fsKillEmAll.displayCombatResults(index,this.responseText);
                                }
      
                              };
    xReq.send(null);
  },
  
  displayCombatResults : function (index, rT) {
    var scriptStart = rT.indexOf("// combat animator");
    var scriptEnd   = rT.indexOf("// image sequencing",scriptStart);
    var scriptStr   = rT.substr(scriptStart, scriptEnd-scriptStart);
    eval(scriptStr);
    var container = $(fsKillEmAll.attack.aLinkId+index).parentNode.parentNode;
    container.align="left";
    container.width="80%";
    container.parentNode.childNodes.item(2).width="15%";
    var tmpStr = (winner == 0) ? '<span style="color:green;font-size:12px;width:100px">' : '<span style="color:red">';
    container.innerHTML = tmpStr +
                          "<b>Gold</b> : " + goldStolen +
                          " / <b> XP</b> : " + xpGain  +
                          "/ <b>Stamina</b> : " + Math.round(combatStages/2)+"</span>";
    if (levelUp >0) container.innerHTML = container.innerHTML + "<br />Level UP";
    else if(levelUp < 0) container.innerHTML = container.innerHTML + "<br />Level DECREASED";
    
    if (itemId>0) {
      var lootedItemImage = "http://66.7.192.165/items/"+itemId+".gif";
      container.innerHTML = container.innerHTML +
                            '<br /><img src="'+lootedItemImage+'" />';
    }
    
  },
  
  killEmAll : function () {
    for(i=1;i<=fsKillEmAll.attack.maxKills;i++) {
      fsKillEmAll.kill(i);
      var x       = new XMLHttpRequest;
      x.open("GET", fsKillEmAll.attack.repairItemsLink, true);
      x.send(null);
    }

  }
}

fsKillEmAll.killEmAll();