// ==UserScript==
// @name            DHTML Lemmings Codes+
// @namespace       http://zoolcar9.lhukie.net/
// @include         http://www.elizium.nu/scripts/lemmings/*
// @include         http://elizium.nu/scripts/lemmings/*
// @include         http://games.funnygames.nl/lemmings/*
// @description     Automatically insert code while selecting a level and gives you 1000 numbers for each skills
// ==/UserScript==

({
  get menu() {
    return document.getElementsByTagName("h1")[0];
  },

  get isPlaying() {
    return typeof unsafeWindow.lemming_types == "object";
  },

  levels: [
    "lvl1", "lvl2", "lvl3", "lvl4", "lvl5",
    "lvl6", "lvl7", "lvl8", "lvl9", "lvl10"
  ],

  funCodes: [
    "BAJHLDHBCL", "IJJLDLCCCL", "NJLDLCADCY", "HNLHCIOECW", "LDLCAJNFCK",
    "DLCIJNLGCT", "HCAONNLHCX", "CINNLDLICJ", "CEJHMDLJCN", "IKHMDLCKCT"
  ],

  trickyCodes: [
    "HCENNONPDW", "CIOLMFLQDU", "CAJJDLMBEV", "MKJNLICCEJ", "NHLDMCEDEN",
    "HLDMCIOEET", "LDMCAJNFEN", "DICMJNNGEY", "MCENLLDHEV", "CMNLLDMIEO"
  ],

  taxingCodes: [
    "ONICAJNNFP", "FMCIKLMOFR", "ICENNONPFJ", "CINNMFMQFY", "GEJJNDHBGM",
    "MJJNLHGCGN", "NHNKHGADGU", "HLDLGIOEGY", "LDLGAJNFGS", "DLGIJNLGGL"
  ],

  mayhemCodes: [
    "NJMFLGALHM", "JONHGINMHL", "ONHGEKNNHJ", "FLGIJNMOHX", "HGAOLMNPHX",
    "GINNONHQHT", "GAJJLDMBIN", "IJHLDMGCIU", "NHLDMGADIR", "HLDMGIOEIL"
  ],

  types: [
    "climb", "float", "explode", "block",
    "build", "bash", "mine", "dig"
  ],

  getLevelCode: function(aNode) {
    var rating = aNode.lastChild.nodeValue;
    switch (rating) {
      case "fun":
        return this.funCodes;
      case "tricky":
        return this.trickyCodes;
      case "taxing":
        return this.taxingCodes;
      case "mayhem":
        return this.mayhemCodes;
    }
  },

  insertLevelCode: function(aNode) {
    var level, code;
    for (var i in this.levels) {
      level = document.getElementById(this.levels[i]);
      if (!level) return;
      code = this.getLevelCode(aNode);
      level.setAttribute("onclick",
        level.getAttribute("onclick") + "; " +
        "document.getElementById(\"code\").value=\"" +
        code[i] + "\"");
    }
  },

  letsCheat: function() {
    for (var i in this.types) {
      unsafeWindow.lemming_types[this.types[i]] = 1000;
      var div = document.getElementById("num_" + this.types[i]);
      div.textContent = "1000";
      div.style.fontSize = "5pt";
    }
  },

  execute: function() {
    if (this.menu) {
      this.insertLevelCode(this.menu);
    } else if (this.isPlaying) {
      this.letsCheat();
    } else {
      return GM_log("Bye bye!");
    }
  }

}).execute();