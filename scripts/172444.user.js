// ==UserScript==
// @name        HT Spider Graph
// @description Spider graph showing habilities of Hattrick players
// @namespace   HT-Hacks
// @include     /^http://([^\.]*\.hattrick\.(org|ws|uol\.com\.br|interia\.pl))/Club/Players/Player.aspx\?/
// @include     /^http://([^\.]*\.hattrick\.(org|ws|uol\.com\.br|interia\.pl))/Club/Players/(Default\.aspx)?\?/
// @include     /^http://([^\.]*\.hattrick\.(org|ws|uol\.com\.br|interia\.pl))/World/Transfers/TransfersSearchResult.aspx/
// @grant       none
// @version     1.00
// ==/UserScript==

// DISCLAIMER: This script is provided 'as is'. No warranty. Use at your own risk.
// LICENSE: No copyright. Public domain. Use it for whatever you want.


(function () { // make all names private

if (document.documentElement.getAttribute('lang') == 'es') {
  var Keeper = "P", Defending = "D", Playmaking = "J", Winger = "L", Passing = "P", Scoring = "A", SetPieces = "BP", Form = "F", Stamina = "R", MotherClub = "Cm", Loyalty = "Fi", Experience = "Ex";
}
else {
  var Keeper = "K", Defending = "D", Playmaking = "Pm", Winger = "W", Passing = "Ps", Scoring = "Sc", SetPieces = "SP", Form = "F", Stamina = "St", MotherClub = "Mc", Loyalty = "Ly", Experience = "Xp";
}
  

function drawSpider(canvas, cfg, data) {
  var ctx = canvas.getContext("2d");

  var centerX = cfg.centerX, centerY = cfg.centerY, r = cfg.radius, maxLevel = cfg.maxLevel, levelStep = cfg.levelStep;

  var dataCfg = data.shift();
  var numAxis = data.length, angDelta = 2*Math.PI/numAxis;
  var i, j, rr, points = new Array(numAxis);

  var ang = -Math.PI/2;
  for (i = 0; i<numAxis; i++) {
    points[i] = {x: Math.cos(ang), y: Math.sin(ang)};
    ang += angDelta;
  }

  ctx.lineWidth = 0;

  // fill & external frame
  ctx.beginPath();
  ctx.moveTo(centerX + r * points[numAxis-1].x, centerY + r * points[numAxis-1].y);
  for (i = 0; i<numAxis; i++) {
    ctx.lineTo(centerX + r * points[i].x, centerY + r * points[i].y);
  }
  var radGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, r);  
  radGrad.addColorStop(0, 'rgba(250, 210, 170, 0.1)');
  radGrad.addColorStop(0.4, 'rgba(250, 210, 170, 0.3)');
  radGrad.addColorStop(1, 'rgba(250, 210, 170, 1)');
  ctx.fillStyle = radGrad;
  ctx.fill();
  ctx.strokeStyle = "rgba(175, 150, 125, 1)";
  ctx.stroke();

  // internal concentric frames
  ctx.beginPath();
  for (j = levelStep; j<maxLevel; j += levelStep) {
    rr = r*j/maxLevel;
    ctx.moveTo(centerX + rr * points[numAxis-1].x, centerY + rr * points[numAxis-1].y);
    for (i = 0; i<numAxis; i++) {
      ctx.lineTo(centerX + rr * points[i].x, centerY + rr * points[i].y);
    }
  }
  ctx.strokeStyle = "rgba(175, 150, 125, 0.5)";
  ctx.stroke();

  // text & radius
  ctx.fillStyle = "rgb(75, 75, 75)";
  ctx.font = cfg.font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  rr = r+8;
  ctx.beginPath();
  for (i = 0; i<numAxis; i++) {
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + r * points[i].x, centerY + r * points[i].y);
    ctx.fillText(data[i].name, centerX + rr * points[i].x, centerY + rr * points[i].y);
  }
  ctx.strokeStyle = "rgba(175, 150, 125, 0.75)";
  ctx.stroke();

  // draw data (area)
  ctx.fillStyle = dataCfg.fillStyle;
  ctx.strokeStyle = "rgb(75, 125, 100)";
  if (ctx.setLineDash) // W3C
    ctx.setLineDash([1, 2]);
  else if (ctx.mozDash !== undefined) // firefox
    ctx.mozDash = [1, 2];
  ctx.beginPath();
  for (i = 0; i<numAxis; i++) {
    var xx = centerX + r*data[i].value/data[i].max * points[i].x, yy = centerY + r*data[i].value/data[i].max * points[i].y;
    if (i==0) 
      ctx.moveTo(xx, yy);
    else
      ctx.lineTo(xx, yy);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function getSkillFromLink(link) {
  var skill = link.replace(/.+ll=/i, "").match(/^\d+/);
  skill = +skill; // convert to number
  if (skill < 0 || skill > 20) 
    skill = 0;
  return skill;
};

function getIndexOfMax(list) {
  var val = 0, pos = -1;
  for (var i = 0; i<list.length; i++) {
    if (list[i] > val) {
      val = list[i];
      pos = i;
    };
  };
  return pos;
}


var 
  doc = document,
  href = doc.location.href;


// ** ONE PLAYER PAGE **
if (/\/Club\/Players\/Player.aspx/i.test(href)) {

  var skillLinks = doc.evaluate("//a[contains(@href,'&ll=')]", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  if (skillLinks.snapshotLength == 15 || skillLinks.snapshotLength == 16) {
    var
      frm = getSkillFromLink(skillLinks.snapshotItem(0).href),
      sta = getSkillFromLink(skillLinks.snapshotItem(1).href),

      xp  = (skillLinks.snapshotLength == 15) ? 5 : 6,

      exp = getSkillFromLink(skillLinks.snapshotItem(xp).href),
      loy = getSkillFromLink(skillLinks.snapshotItem(xp+2).href),
      mot = doc.evaluate("//img[@class='motherclubBonus']", doc, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue ? 1 : 0,

      goa = getSkillFromLink(skillLinks.snapshotItem(xp+3).href),
      def = getSkillFromLink(skillLinks.snapshotItem(xp+4).href),
      pla = getSkillFromLink(skillLinks.snapshotItem(xp+5).href),
      win = getSkillFromLink(skillLinks.snapshotItem(xp+6).href),
      pas = getSkillFromLink(skillLinks.snapshotItem(xp+7).href),
      sco = getSkillFromLink(skillLinks.snapshotItem(xp+8).href),
      sp  = getSkillFromLink(skillLinks.snapshotItem(xp+9).href);


    // graph A: frm, sta, exp, loy, mot:
    
    var div = doc.createElement("div");
    doc.getElementById("ctl00_ctl00_CPContent_CPMain_ucPlayerFace_pnlAvatar").parentNode.appendChild(div);
    div.innerHTML = '<canvas id="sg_canvas_a" width="90" height="90"></canvas>';
    drawSpider(
      doc.getElementById("sg_canvas_a"),
      {centerX: 45.5, centerY: 50.5, radius: 30, maxLevel: 20, levelStep: 5, font: "7pt Sans-Serif"},
      [ 
        {fillStyle: "rgba(150, 200, 250, 0.6)"},
        {name: Form      , value: frm, max: 8},
        {name: Stamina   , value: sta, max: 9},
        {name: MotherClub, value: mot, max: 1},
        {name: Loyalty   , value: loy, max: 20},
        {name: Experience, value: exp, max: 20},
      ]
    );


    // graph B: goa, pla, win, sco, pas, def, sp:
    
    var div = doc.createElement("td");
    div.rowSpan = 7;
    div.style.textAlign = "center";
    skillLinks.snapshotItem(xp+3).parentNode.parentNode.appendChild(div);

    if (getIndexOfMax([goa, pla, win, sco, pas, def]) == 0) { // keeper
      div.innerHTML = '<canvas id="sg_canvas_b" width="110" height="110"></canvas>';
      drawSpider(
        doc.getElementById("sg_canvas_b"),
        {centerX: 55.5, centerY: 55.5, radius: 40, maxLevel: 20, levelStep: 5, font: "8pt Sans-Serif"},
        [ 
          {fillStyle: "rgba(150, 250, 200, 0.6)"},
          {name: Keeper   , value: goa, max: 20},
          {name: SetPieces, value: sp , max: 20},
          {name: Defending, value: def, max: 20},
        ]
      );
    }
    else {
      div.innerHTML = '<canvas id="sg_canvas_b" width="130" height="130"></canvas>';
      drawSpider(
        doc.getElementById("sg_canvas_b"),
        {centerX: 65.5, centerY: 65.5, radius: 50, maxLevel: 20, levelStep: 5, font: "8pt Sans-Serif"},
        [ 
          {fillStyle: "rgba(150, 250, 200, 0.6)"},
          {name: Playmaking, value: pla, max: 20},
          {name: Passing   , value: pas, max: 20},
          {name: Scoring   , value: sco, max: 20},
          {name: Defending , value: def, max: 20},
          {name: Winger    , value: win, max: 20},
        ]
      );
    }
  }
}

// ** ALL PLAYERS PAGE **
else if (/\/Club\/Players\/(Default\.aspx)?\?/i.test(href)) {
  var playerDivs = doc.evaluate("//div[@class='playerInfo']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  
  for (var i = 0, l = playerDivs.snapshotLength; i < l; ++i) {
    var skillLinks = doc.evaluate(".//a[contains(@href,'&ll=')]", playerDivs.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    if (skillLinks.snapshotLength == 12) {
      var
        frm = getSkillFromLink(skillLinks.snapshotItem(0).href),
        sta = getSkillFromLink(skillLinks.snapshotItem(1).href),
        exp = getSkillFromLink(skillLinks.snapshotItem(2).href),
        loy = getSkillFromLink(skillLinks.snapshotItem(4).href),
        mot = doc.evaluate(".//img[@class='motherclubBonus']", playerDivs.snapshotItem(i), null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue ? 1 : 0,

        goa = getSkillFromLink(skillLinks.snapshotItem(5).href),
        def = getSkillFromLink(skillLinks.snapshotItem(6).href),
        pla = getSkillFromLink(skillLinks.snapshotItem(7).href),
        win = getSkillFromLink(skillLinks.snapshotItem(8).href),
        pas = getSkillFromLink(skillLinks.snapshotItem(9).href),
        sco = getSkillFromLink(skillLinks.snapshotItem(10).href),
        sp  = getSkillFromLink(skillLinks.snapshotItem(11).href);


      // graph A: goa, pla, win, sco, pas, def, sp:
      
      var div = doc.createElement("div");
      div.style.position = "relative";
      div.style.top = "150px";
      div.style.textAlign = "center";
      playerDivs.snapshotItem(i).previousElementSibling.appendChild(div);
      div.innerHTML = '<canvas id="sg_canvas_'+i+'" width="110" height="100"></canvas>';

      if (getIndexOfMax([goa, pla, win, sco, pas, def]) == 0) { // keeper
        drawSpider(
          doc.getElementById("sg_canvas_"+i),
          {centerX: 55.5, centerY: 55.5, radius: 35, maxLevel: 20, levelStep: 5, font: "7pt Sans-Serif"},
          [ 
            {fillStyle: "rgba(150, 250, 200, 0.6)"},
            {name: Keeper   , value: goa, max: 20},
            {name: SetPieces, value: sp , max: 20},
            {name: Defending, value: def, max: 20},
          ]
        );
      }
      else {
        drawSpider(
          doc.getElementById("sg_canvas_"+i),
          {centerX: 55.5, centerY: 55.5, radius: 35, maxLevel: 20, levelStep: 5, font: "7pt Sans-Serif"},
          [ 
            {fillStyle: "rgba(150, 250, 200, 0.6)"},
            {name: Playmaking, value: pla, max: 20},
            {name: Passing   , value: pas, max: 20},
            {name: Scoring   , value: sco, max: 20},
            {name: Defending , value: def, max: 20},
            {name: Winger    , value: win, max: 20},
          ]
        );
      }
    }
  }
}

// ** TRANSFER SEARCH PAGE **
else if (/\/World\/Transfers\/TransfersSearchResult.aspx/i.test(href)) {
  var playerDivs = doc.evaluate("//div[starts-with(@class, 'transferPlayerSkills')]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  
  for (var i = 0, l = playerDivs.snapshotLength; i < l; ++i) {
    var skillLinks = doc.evaluate(".//a[contains(@href,'&ll=')]", playerDivs.snapshotItem(i).parentNode.parentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (skillLinks.snapshotLength == 11) {
      var
        frm = getSkillFromLink(skillLinks.snapshotItem(2).href),
        sta = getSkillFromLink(skillLinks.snapshotItem(3).href),
        exp = getSkillFromLink(skillLinks.snapshotItem(0).href),
        loy = 0,
        mot = 0,

        goa = getSkillFromLink(skillLinks.snapshotItem(4).href),
        def = getSkillFromLink(skillLinks.snapshotItem(8).href),
        pla = getSkillFromLink(skillLinks.snapshotItem(5).href),
        win = getSkillFromLink(skillLinks.snapshotItem(7).href),
        pas = getSkillFromLink(skillLinks.snapshotItem(6).href),
        sco = getSkillFromLink(skillLinks.snapshotItem(9).href),
        sp  = getSkillFromLink(skillLinks.snapshotItem(10).href);


      // graph A: goa, pla, win, sco, pas, def, sp:
      
      var div = doc.createElement("div");
      div.style.position = "relative"; // a non-static positioned element is needed for canvas to be absolute-positioned
      playerDivs.snapshotItem(i).insertBefore(div, playerDivs.snapshotItem(i).firstChild);
      div.innerHTML = '<canvas id="sg_canvas_'+i+'" style="position: absolute; left: -84px; background-color: white;" width="80" height="76"></canvas>';

      if (getIndexOfMax([goa, pla, win, sco, pas, def]) == 0) { // keeper
        drawSpider(
          doc.getElementById("sg_canvas_"+i),
          {centerX: 40.5, centerY: 42.5, radius: 25, maxLevel: 20, levelStep: 5, font: "7pt Sans-Serif"},
          [ 
            {fillStyle: "rgba(150, 250, 200, 0.6)"},
            {name: Keeper   , value: goa, max: 20},
            {name: SetPieces, value: sp , max: 20},
            {name: Defending, value: def, max: 20},
          ]
        );
      }
      else {
        drawSpider(
          doc.getElementById("sg_canvas_"+i),
          {centerX: 40.5, centerY: 42.5, radius: 25, maxLevel: 20, levelStep: 5, font: "7pt Sans-Serif"},
          [ 
            {fillStyle: "rgba(150, 250, 200, 0.6)"},
            {name: Playmaking, value: pla, max: 20},
            {name: Passing   , value: pas, max: 20},
            {name: Scoring   , value: sco, max: 20},
            {name: Defending , value: def, max: 20},
            {name: Winger    , value: win, max: 20},
          ]
        );
      }
    }
  }
}

})();
