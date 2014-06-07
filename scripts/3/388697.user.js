// ==UserScript==
// @name            Google Calendar Bars Toggler
// @namespace       http://userscripts.org/scripts/show/107309
// @description     This script is toggles the top and side bars of Google Calendar to hidden/visible with click or I U O G V key.
// @version         1.7.8
// @author          rat_siem
// @include         https://*.google.*/calendar/*
// @include         http://*.google.*/calendar/*
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_addStyle
// ==/UserScript==
(function() {
  function $(id) {
    return document.getElementById(id);
  }
  
  var ogb_hide = "hide-all";
  var open_by_search = false;
  
  document.addEventListener("keydown", function(e) {
    var element = e.target;
    var elementName = element.nodeName.toLowerCase();
    if (elementName == "input" || elementName == "textarea") return true;
    
    var i;
    // press slash('/') key
    if (e.which == 191 && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
      var myg = $("__myogb");
      if (myg) {
        if (myg.className != "") toggle_gc(true);
      }
      return true;
    }
    
    // settings
    var cc = String.fromCharCode(e.which);
    if (cc.match(/S/i) && !e.ctrlKey && e.shiftKey && !e.altKey && !e.metaKey) {
      open_settings();
      try {
        e.preventDefault();
      } catch (ex) { }
      return false;
    }
    
    // press toggle key
    var tg = [
      [["GCBT_GG_SPKY", "0"], ["GCBT_GG_SCKY", "71"], sw_gglbar],
      [["GCBT_GC_SPKY", "0"], ["GCBT_GC_SCKY", "73"], toggle_gc],
      [["GCBT_NV_SPKY", "0"], ["GCBT_NV_SCKY", "85"], toggle_nv],
      [["GCBT_GD_SPKY", "0"], ["GCBT_GD_SCKY", "79"], toggle_ga],
      [["GCBT_VR_SPKY", "0"], ["GCBT_VR_SCKY", "86"], sw_vrnbar]
    ];
    
    var sp, sc, fg = false;
    for (i = 0 ; i < tg.length ; i++) {
        sp = eval(GM_getValue(tg[i][0][0], tg[i][0][1]));
        sc = eval(GM_getValue(tg[i][1][0], tg[i][1][1]));
        if (e.which == sc && e.ctrlKey == ctrl(sp) && e.shiftKey == shft(sp) && e.altKey == alt(sp) && e.metaKey == meta(sp)) {
          tg[i][2]();
          fg = true;
        }
    }
    
    if (fg) {
      try {
        e.preventDefault();
      } catch (ex) { }
      return false;
    }
    
    return true;
  }, false);
  
  var nEv = 0;
  function addBlurEvent2SearchBox()
  {
    var mi = $("gbqfq") ? $("gbqfq") : $("maininput");
    if (mi) {
      mi.addEventListener("blur", function(e) {
        if (open_by_search == true) {
          var element = e.target;
          if (element.value == "") {
            toggle_gc();
          }
        }
      }, false);
    } else {
      if (nEv < 5) setTimeout(addBlurEvent2SearchBox, 1000);
      nEv++;
    }
  }
  setTimeout(addBlurEvent2SearchBox, 1000);
  
  // toggle top area - start
  function toggle_gc(obs)
  {
    if (!obs) obs = false;
    open_by_search = obs;
    
    
    var myg = $("__myogb");
    if (!myg) return;
    
    myg.className = (myg.className == "" ? ogb_hide : "");
    GM_setValue("GCBT_GC_HIDE", myg.className == "" ? "false" : "true");
    
    
    var myc = $("__mycct");
    if (myc) {
      myc.className = (myg.className == "" ? "" : "hide");
    }
    
    var ttb = $("__myttb");
    if (ttb) {
      ttb.className = (myg.className == "" ? "open" : "hide");
    }
    
    change_nto();
    
    refreshCal();
  }

  function refreshCal() {
    var he = document.createEvent('HTMLEvents');
    he.initEvent("resize", true, false);
    document.body.dispatchEvent(he); 
  }
  // toggle top area - end

  // toggle nav - start
  function toggle_nv()
  {
    var nav = $("__mynav");
    if (nav) {
      nav.style.display = (nav.style.display == "none" ? "" : "none");
      
      sdb = $("sidebar");
      if (sdb) sdb.style.display = nav.style.display;
      
      var onv = $("nav");
      var mab = $("mainbody");
      var ltb = $("__myltb");
      if (nav.style.display == "none") {
        GM_setValue("GCBT_NV_HIDE", "true");
        if (onv) onv.style.width = "0";
        if (mab) mab.style.marginLeft = "0";
        if (ltb) ltb.className = "hide";
      } else {
        GM_setValue("GCBT_NV_HIDE", "false");
        if (onv) onv.style.width = "";
        if (mab) mab.style.marginLeft = "";
        if (ltb) ltb.className = "";
      }
    }
    
    refreshCal();
  }
  // toggle nav - end

  // switch google bar - start
  function sw_gglbar()
  {
    var myg = $("__myogb");
    if (!myg) return;
    
    if (ogb_hide == "hide-all") {
      GM_setValue("GCBT_GG_OPEN", "true");
      ogb_hide = "hide";
      myg.className = (myg.className == "" ? "" : ogb_hide);
    } else {
      GM_setValue("GCBT_GG_OPEN", "false");
      ogb_hide = "hide-all";
      myg.className = (myg.className == "" ? "" : ogb_hide);
    }
    
    change_nto();
    
    refreshCal();
  }
  // switch google bar - end

  // switch vr-nav - start
  function sw_vrnbar()
  {
    var myv = $("__myvrn");
    if (myv) {
      myv.className = (myv.className == "" ? "hide" : "");
      GM_setValue("GCBT_VR_HIDE", myv.className == "" ? "false" : "true");
    }
    
    change_nto();
    
    refreshCal();
  }
  // switch vr-nav - end

  // change nto - start
  function change_nto()
  {
    var cct = false;
    var ogb = false;
    var vrn = false;
    
    var myc = $("__mycct");
    if (myc) {
      if (myc.className != "") cct = true;
    }
    
    var myg = $("__myogb");
    if (myg) {
      if (myg.className == "hide-all") ogb = true;
    }
    
    var myv = $("__myvrn");
    if (myv) {
      if (myv.className != "") vrn = true;
    }
    
    var myo = $("__mynto");
    if (myo) {
           if (cct && !ogb &&  vrn) myo.className = "hide1";
      else if (cct && !ogb && !vrn) myo.className = "hide2";
      else if (cct &&  ogb && !vrn) myo.className = "hide3";
      else if (cct &&  ogb &&  vrn) myo.className = "hide4";
      else                          myo.className = "";
    }
  }
  // change nto - end

  // toggle gadget area - start
  function toggle_ga()
  {
    var rtc = $("rhstogglecell");
    if (!rtc) return;
    
    var tgc = rtc.childNodes[0];
    if (!tgc) return;
    
    var me = document.createEvent("MouseEvents");
    if (!me) return;
    
    me.initEvent("mousedown", false, true );
    tgc.dispatchEvent(me);
  }
  // toggle gadget area - end

  // settings - start
  function getIndexByVal(e, v, d)
  {
    var r = d;
    var o = e.options;
    var n = o.length;
    for(var i = 0 ; i < n ; i++) {
      if (o[i].value == v) {
        r = i;
        break;
      }
    }
    return r;
  }

  function ctrl(sp)
  {
    return (sp & 0x01) != 0;
  }

  function shft(sp)
  {
    return (sp & 0x02) != 0;
  }

  function alt(sp)
  {
    return (sp & 0x04) != 0;
  }

  function meta(sp)
  {
    return (sp & 0x08) != 0;
  }

  function open_settings()
  {
    var i, el, it, sv, sp, sc;
    
    var ss = [
      // [element_id, [init_key, init_def], [save_key, save_def], [init_t_val, init_f_val, save_t_val]]
      ["__myit_gg", ["GCBT_GG_INIT", "false"], ["GCBT_GG_SAVE", "false"], ["1", "0", "2"]],
      ["__myit_vr", ["GCBT_VR_INIT", "false"], ["GCBT_VR_SAVE", "false"], ["0", "1", "2"]],
      ["__myit_gc", ["GCBT_GC_INIT", "true" ], ["GCBT_GC_SAVE", "false"], ["0", "1", "2"]],
      ["__myit_nv", ["GCBT_NV_INIT", "true" ], ["GCBT_NV_SAVE", "false"], ["0", "1", "2"]]
    ];
    
    for (i = 0 ; i < ss.length ; i++) {
      el = $(ss[i][0]);
      if (el) {
        it = eval(GM_getValue(ss[i][1][0], ss[i][1][1]));
        sv = eval(GM_getValue(ss[i][2][0], ss[i][2][1]));
        el.selectedIndex = getIndexByVal(el, (sv ? ss[i][3][2] : (it ? ss[i][3][0] : ss[i][3][1])), 0);
      }
    }
    
    
    var ks = [
      // [element_id, [spky_key, spky_def], [scky_key, scky_def]]
      ["__myst_gg", ["GCBT_GG_SPKY", "0"], ["GCBT_GG_SCKY", "71"]],
      ["__myst_vr", ["GCBT_VR_SPKY", "0"], ["GCBT_VR_SCKY", "86"]],
      ["__myst_gc", ["GCBT_GC_SPKY", "0"], ["GCBT_GC_SCKY", "73"]],
      ["__myst_nv", ["GCBT_NV_SPKY", "0"], ["GCBT_NV_SCKY", "85"]],
      ["__myst_gd", ["GCBT_GD_SPKY", "0"], ["GCBT_GD_SCKY", "79"]]
    ];
    
    for (i = 0 ; i < ks.length ; i++) {
      el = $(ks[i][0]);
      if (el) {
        sp = eval(GM_getValue(ks[i][1][0], ks[i][1][1]));
        sc = eval(GM_getValue(ks[i][2][0], ks[i][2][1]));
        el.value = keyString(ctrl(sp), shft(sp), alt(sp), meta(sp), sc);
      }
    }
    
    
    var stg = $("__mystg");
    if (stg) stg.style.display = "";
    
    var stgbg = $("__mystg_bg");
    if (stgbg) stgbg.style.display = "";
    
    var stgbr = $("__mystg_br");
    if (stgbr) stgbg.style.display = "";
    
    var stgcs = $("__mystg_cs");
    if (stgcs) stgcs.focus();
  }

  function close_settings()
  {
    var stg = $("__mystg");
    if (stg) stg.style.display = "none";
    
    var stgbg = $("__mystg_bg");
    if (stgbg) stgbg.style.display = "none";
    
    var stgbr = $("__mystg_br");
    if (stgbr) stgbg.style.display = "none";
  }

  function focus_settings()
  {
    var stg = $("__mystg");
    if (stg) stg.focus();
  }

  function focus_closebtn()
  {
    var stgcs = $("__mystg_cs");
    if (stgcs) stgcs.focus();
  }

  function keydown_settings(e)
  {
    var element = e.target;
    var elementName = element.nodeName.toLowerCase();
    if (elementName == "input" || elementName == "select") return true;
    
    if (e.which == 27) {
        close_settings();
        try {
          e.preventDefault();
        } catch (ex) { }
        return false;
    }
    return true;
  }

  function keydown_shortcut(e, def)
  {
    var element = e.target;
    if (!element) return true;
    
    if (e.which >= 16 && e.which <= 18 || e.which == 224 || e.which == 9) {
      // ctrl, shift, alt, meta, tab
      return true;
    }
    
    var ks = {
      "G":["GCBT_GG_SPKY", "GCBT_GG_SCKY"],
      "I":["GCBT_GC_SPKY", "GCBT_GC_SCKY"],
      "U":["GCBT_NV_SPKY", "GCBT_NV_SCKY"],
      "O":["GCBT_GD_SPKY", "GCBT_GD_SCKY"],
      "V":["GCBT_VR_SPKY", "GCBT_VR_SCKY"]
    };
    
    element.value = keyString(e.ctrlKey, e.shiftKey, e.altKey, e.metaKey, e.which);
    
    var sp = 0;
    if (e.ctrlKey) sp += 0x01;
    if (e.shiftKey) sp += 0x02;
    if (e.altKey) sp += 0x04;
    if (e.metaKey) sp += 0x08;
    
    GM_setValue(ks[def][0], [sp].join(""));
    GM_setValue(ks[def][1], [e.which].join(""));
    
    try {
      e.preventDefault();
    } catch (ex) { }
    
    return false;
  }

  function keyString(ctrlKey, shiftKey, altKey, metaKey, cd)
  {
    var key = [];
    if (ctrlKey) key.push("Ctrl");
    if (shiftKey) key.push("Shift");
    if (altKey) key.push("Alt");
    if (metaKey) key.push("Meta");
    
    if (cd >= 16 && cd <= 18 || cd == 224) {
    } else if ((cd >= 48 && cd <= 57) || (cd >= 65 && cd <= 90)) {
      key.push(String.fromCharCode(cd));
    } else if (cd >= 96 && cd <= 105) {
      key.push(["[", cd - 96, "]"].join(""));
    } else if (cd >= 112 && cd <= 123) {
      key.push(["F", cd - 111].join(""));
    } else {
      switch (cd) {
        case 8: key.push("[BS]"); break;
        case 9: key.push("[Tab]"); break;
        case 13: key.push("[Enter]"); break;
        case 19: key.push("[Pause]"); break;
        case 20: key.push("[Caps]"); break;
        case 27: key.push("[Esc]"); break;
        case 33: key.push("[PU]"); break;
        case 34: key.push("[PD]"); break;
        case 35: key.push("[End]"); break;
        case 36: key.push("[Home]"); break;
        case 37: key.push("[Left]"); break;
        case 38: key.push("[Up]"); break;
        case 39: key.push("[Right]"); break;
        case 40: key.push("[Down]"); break;
        case 45: key.push("[Ins]"); break;
        case 46: key.push("[Del]"); break;
        case 91: key.push("[LW]"); break;
        case 92: key.push("[RW]"); break;
        case 93: key.push("[Sel]"); break;
        case 106: key.push("[*]"); break;
        case 107: key.push("[+]"); break;
        case 109: key.push("[-]"); break;
        case 110: key.push("[.]"); break;
        case 111: key.push("[/]"); break;
        case 144: key.push("[Num]"); break;
        case 145: key.push("[SL]"); break;
        case 188: key.push(","); break;
        case 190: key.push("."); break;
        case 191: key.push("/"); break;
        case 219: key.push("["); break;
        case 220: key.push("\\"); break;
        case 221: key.push("]"); break;
        default: key.push(["(", cd, ")"].join("")); break;
      }
    }
    return key.join("+");
  }

  function change_initial(e, id)
  {
    var element = e.target;
    if (!element) return true;
    
    var ks = {
      "gg":{"k":["GCBT_GG_INIT", "GCBT_GG_SAVE"], "0":["false", "false"], "1":["true", "false"], "2":["false", "true"]},
      "vr":{"k":["GCBT_VR_INIT", "GCBT_VR_SAVE"], "0":["true", "false"], "1":["false", "false"], "2":["false", "true"]},
      "gc":{"k":["GCBT_GC_INIT", "GCBT_GC_SAVE"], "0":["true", "false"], "1":["false", "false"], "2":["false", "true"]},
      "nv":{"k":["GCBT_NV_INIT", "GCBT_NV_SAVE"], "0":["true", "false"], "1":["false", "false"], "2":["false", "true"]}
    };
    
    var gs = ks[id];
    if (gs && gs[element.value]) {
      GM_setValue(gs["k"][0], gs[element.value][0]);
      GM_setValue(gs["k"][1], gs[element.value][1]);
    }
    
    return true;
  }

  var stgbg = document.createElement("div");
  stgbg.setAttribute("id", "__mystg_bg");
  stgbg.setAttribute("tabindex", "0");
  stgbg.className = "scpopup-bg";
  stgbg.style.cssText = "opacity: 0; width: 100%; height: 100%; display: none;"
  stgbg.addEventListener("focus", function(e){ focus_closebtn(); return true; }, false);
  document.body.appendChild(stgbg);

  var stg = document.createElement("div");
  stg.setAttribute("id", "__mystg");
  stg.setAttribute("tabindex", "0");
  stg.className = "scpopup";
  stg.style.display = "none";
  stg.innerHTML = [
"   <div class=\"scpopup-title scpopup-title-draggable\">",
"   <span class=\"scpopup-title-text\">GC Bars Toggler Settings</span>",
"   <span class=\"scpopup-title-close\"></span>",
"   </div>",
"   <div class=\"scpopup-content\">",
"   <div class=\"scpopupcontent\">",
"   <table class=\"scpopupbody\"><tbody>",
"   <tr><td class=\"scpopup-col\">",
"   <table><tbody>",
"   <tr><th></th><th class=\"scpopup-th\">Initial states</th></tr>",
"   <tr><td class=\"scpopup-key\"><span class=\"keymnemonic\">Google Bar</span> :</td><td class=\"scpopup-desc\"><select id=\"__myit_gg\" style=\"width: 100px; height: 22px;\"><option value=\"0\">Hide</option><option value=\"1\">Visible</option><option value=\"2\">Save</option></select></td></tr>",
"   <tr><td class=\"scpopup-key\"><span class=\"keymnemonic\">Control Bar</span> :</td><td class=\"scpopup-desc\"><select id=\"__myit_vr\" style=\"width: 100px; height: 22px;\"><option value=\"0\">Hide</option><option value=\"1\">Visible</option><option value=\"2\">Save</option></select></td></tr>",
"   <tr><td class=\"scpopup-key\"><span class=\"keymnemonic\">Top Bar</span> :</td><td class=\"scpopup-desc\"><select id=\"__myit_gc\" style=\"width: 100px; height: 22px;\"><option value=\"0\">Hide</option><option value=\"1\">Visible</option><option value=\"2\">Save</option></select></td></tr>",
"   <tr><td class=\"scpopup-key\"><span class=\"keymnemonic\">Left Bar</span> :</td><td class=\"scpopup-desc\"><select id=\"__myit_nv\" style=\"width: 100px; height: 22px;\"><option value=\"0\">Hide</option><option value=\"1\">Visible</option><option value=\"2\">Save</option></select></td></tr>",
"   <tr><td colspan=\"2\" class=\"scpopup-desc\" style=\"vertical-align: bottom; height: 32px;\"><a style=\"color: #dd0;\" href=\"http://userscripts.org/scripts/show/107309\" target=\"_blank\">Google Calendar Bars Toggler</a></td></tr>",
"   </tbody></table>",
"   </td>",
"   <td class=\"scpopup-col\">",
"   <table><tbody>",
"   <tr><th></th><th class=\"scpopup-th\">Shortcuts</th></tr>",
"   <tr><td class=\"scpopup-key\"><span class=\"keymnemonic\">Google Bar (G)</span> :</td><td class=\"scpopup-desc\"><input id=\"__myst_gg\" type=\"text\" style=\"width: 150px; height: 16px;\" /></td></tr>",
"   <tr><td class=\"scpopup-key\"><span class=\"keymnemonic\">Control Bar (V)</span> :</td><td class=\"scpopup-desc\"><input id=\"__myst_vr\" type=\"text\" style=\"width: 150px; height: 16px;\" /></td></tr>",
"   <tr><td class=\"scpopup-key\"><span class=\"keymnemonic\">Top Bar (I)</span> :</td><td class=\"scpopup-desc\"><input id=\"__myst_gc\" type=\"text\" style=\"width: 150px; height: 16px;\" /></td></tr>",
"   <tr><td class=\"scpopup-key\"><span class=\"keymnemonic\">Left Bar (U)</span> :</td><td class=\"scpopup-desc\"><input id=\"__myst_nv\" type=\"text\" style=\"width: 150px; height: 16px;\" /></td></tr>",
"   <tr><td class=\"scpopup-key\"><span class=\"keymnemonic\">Right Bar (O)</span> :</td><td class=\"scpopup-desc\"><input id=\"__myst_gd\" type=\"text\" style=\"width: 150px; height: 16px;\" /></td></tr>",
"   </tbody></table>",
"   </td></tr>",
"   </tbody></table>",
"   </div>",
"   </div>",
"   <div class=\"scpopup-buttons\"><button id=\"__mystg_cs\" class=\"goog-buttonset-default\">Close</button></div>"
].join("");
  stg.addEventListener("keydown", function(e) { return keydown_settings(e); }, false);
  document.body.appendChild(stg);

  var stgbr = document.createElement("span");
  stgbr.setAttribute("id", "__mystg_br");
  stgbr.setAttribute("tabindex", "0");
  stgbr.style.position = "absolute";
  stgbr.addEventListener("focus", function(e){ focus_settings(); return true; }, false);
  document.body.appendChild(stgbr);


  var mitgg = $("__myit_gg");
  if (mitgg) mitgg.addEventListener("change", function(e) { return change_initial(e, "gg"); }, false);

  var mitvr = $("__myit_vr");
  if (mitvr) mitvr.addEventListener("change", function(e) { return change_initial(e, "vr"); }, false);

  var mitgc = $("__myit_gc");
  if (mitgc) mitgc.addEventListener("change", function(e) { return change_initial(e, "gc"); }, false);

  var mitnv = $("__myit_nv");
  if (mitnv) mitnv.addEventListener("change", function(e) { return change_initial(e, "nv"); }, false);


  var mstgg = $("__myst_gg");
  if (mstgg) mstgg.addEventListener("keydown", function(e) { return keydown_shortcut(e, "G"); }, false);

  var mstvr = $("__myst_vr");
  if (mstvr) mstvr.addEventListener("keydown", function(e) { return keydown_shortcut(e, "V"); }, false);

  var mstgc = $("__myst_gc");
  if (mstgc) mstgc.addEventListener("keydown", function(e) { return keydown_shortcut(e, "I"); }, false);

  var mstnv = $("__myst_nv");
  if (mstnv) mstnv.addEventListener("keydown", function(e) { return keydown_shortcut(e, "U"); }, false);

  var mstgd = $("__myst_gd");
  if (mstgd) mstgd.addEventListener("keydown", function(e) { return keydown_shortcut(e, "O"); }, false);


  var stgcs = $("__mystg_cs");
  if (stgcs) stgcs.addEventListener("click", function(e){ close_settings(); return true; }, false);
  // settings - end


  // one-googbar
  var ogb = $("onegoogbar");
  if (ogb) {
    var myg = document.createElement("div");
    myg.setAttribute("id", "__myogb");
    
    ogb.parentNode.insertBefore(myg, ogb);
    myg.appendChild(ogb);
  }

  var ggd = $("gbgs4d");
  if (ggd) {
    var arw = document.createElement("span");
    arw.className = "gbma";
    
    ggd.appendChild(arw);
  }

  // calcontent
  var cct = $("calcontent");
  if (cct) {
    var myc = document.createElement("div");
    myc.setAttribute("id", "__mycct");
    
    cct.parentNode.insertBefore(myc, cct);
    myc.appendChild(cct);
  }

  var nto = $("ntowner");
  if (cct && nto) {
    var myo = document.createElement("div");
    myo.setAttribute("id", "__mynto");
    
    cct.appendChild(myo);
    myo.appendChild(nto);
  }

  // nav
  var nav = $("nav");
  if (nav) {
    var myn = document.createElement("div");
    myn.setAttribute("id", "__mynav");
    nav.parentNode.insertBefore(myn, nav);
    myn.appendChild(nav);
  }

  // Top toggle bar
  var vpn = $("vr-nav");
  if (vpn) {
    var ttb = document.createElement("div");
    ttb.setAttribute("id", "__myttb");
    
    // arrows - start
    var i,buf;
    var arh = document.createElement("div");
    var aro = document.createElement("div");
    arh.setAttribute("id", "__myttb_ar1");
    aro.setAttribute("id", "__myttb_ar2");
    
    for (i = 0 ; i < 6 ; i++) {
      buf = document.createElement("div");
      if (i < 3) {
        buf.className = ["__ar_v __ar_v", i].join("");
        arh.appendChild(buf);
      } else {
        buf.className = ["__ar_v __ar_v", (5 - i)].join("");
        aro.appendChild(buf);
      }
    }
    ttb.appendChild(arh);
    ttb.appendChild(aro);
    // arrows - end
    
    ttb.addEventListener("mousedown", function(e){ toggle_gc(); return true; }, false);
    
    vpn.parentNode.insertBefore(ttb, vpn);
    
    // minimalize space
    vpn.style.marginTop = "0px";
    vpn.style.paddingBottom = "7px";
    
    
    
    var myv = document.createElement("div");
    myv.setAttribute("id", "__myvrn");
    
    vpn.parentNode.insertBefore(myv, vpn);
    myv.appendChild(vpn);
  }

  // Left toggle bar
  var mbd = $("mainbody");
  if (mbd) {
    var ltb = document.createElement("div");
    ltb.setAttribute("id", "__myltb");
    
    // arrows - start
    var i,buf;
    var arh = document.createElement("div");
    var aro = document.createElement("div");
    var arc = document.createElement("div");
    arh.setAttribute("id", "__myltb_ar1");
    aro.setAttribute("id", "__myltb_ar2");
    arc.className = "__clear_float";
    
    for (i = 0 ; i < 8 ; i++) {
      buf = document.createElement("div");
      if (i < 3) {
        buf.className = ["__ar_h __ar_h", i].join("");
        arh.appendChild(buf);
      } else if (i == 3) {
        buf.className = "__clear_float";
        arh.appendChild(buf);
      } else if (i < 7) {
        buf.className = ["__ar_h __ar_h", (6 - i)].join("");
        aro.appendChild(buf);
      } else {
        buf.className = "__clear_float";
        aro.appendChild(buf);
      }
    }
    ltb.appendChild(arh);
    ltb.appendChild(aro);
    ltb.appendChild(arc);
    // arrows - end
    
    ltb.addEventListener("mousedown", function(e){ toggle_nv(); return true; }, false);
    
    mbd.appendChild(ltb);
    
    // minimalize space
    mbd.style.paddingTop = "8px";
    
    // create space of left toggle bar.
    var bdr = document.createElement("div");
    bdr.style.borderLeft = "7px solid #FFF";
    
    var mbl = mbd.childNodes.length;
    for (i = 0 ; i < mbl ; i++) {
      bdr.appendChild(mbd.childNodes[0]);
    }
    mbd.appendChild(bdr);
  }

  /*
  // bubble
  var bbl = $("bubblePromo:f");
  if (bbl) {
    bbl.parentNode.addEventListener("mouseover", function(e) { // DOMAttrModified
      var bbl = $("bubblePromo:f");
      if (!bbl) return true;
      
      var bpr = bbl.parentNode;
      if (bpr.style.display.match(/none/i)) return true;
      
      var bm = bpr.style.left.match(/(-\d+)px/i);
      if (bm) {
        bpr.style.left = "0";
        
        var pro = $("prong:f");
        if (pro) {
          var pm = pro.style.left.match(/(-?\d+)px/i);
          if (pm) pro.style.left = [eval(pm[1]) + eval(bm[1]), "px"].join("");
        }
      }
      return true;
    }, false);
  }
  */
  
  var css = [
// One Googbar
"   #__myogb.hide #gbbw {                           ",
"       top: 54px !important;                       ",
"   }                                               ",
"   #__myogb.hide #gb.gbes #gbbw {                  ",
"       top: 43px !important;                       ",
"   }                                               ",
"   #__myogb.hide #gbzc {                           ",
"       height: inherit;                            ",
"   }                                               ",
// Google+ info
"   #__myogb.hide #gbu {                            ",
"       /*visibility: hidden;*/                     ",
"       position: absolute;                         ",
"       top: 0;                                     ",
"       right: 0;                                   ",
"       height: 28px;                               ",
"       padding-top: 2px;                           ",
"       padding-bottom: 0;                          ",
"       z-index: 991;                               ",
"   }                                               ",
"   #__myogb.hide #gb.gbes #gbu {                   ",
"       height: 22px;                               ",
"   }                                               ",
"   #__myogb.hide #gbu .gbtc {                      ",
"       height: 26px;                               ",
"   }                                               ",
"   #__myogb.hide #gb.gbes #gbu .gbtc {             ",
"       height: 20px;                               ",
"   }                                               ",
"   #__myogb.hide #gbu .gbt {                       ",
"       line-height: 27px;                          ",
"   }                                               ",
"   #__myogb.hide #gb.gbes #gbu .gbt {              ",
"       line-height: 20px;                          ",
"   }                                               ",
"   #__myogb.hide .gb_2a .gb_n {                    ", // ^1.7.0
"       margin-top: 2px;                            ",
"       height: 25px;                               ",
"       line-height: 25px;                          ",
"   }                                               ",
"   #__myogb.hide .gb_3a .gb_n {                    ", // ^1.7.2
"       margin-top: 2px;                            ",
"       height: 25px;                               ",
"       line-height: 25px;                          ",
"   }                                               ", //  1.7.2$
"   #__myogb.hide #gbwa + div + div .gb_n {         ", // ^1.7.3
"       margin-top: 2px;                            ",
"       height: 25px;                               ",
"       line-height: 25px;                          ",
"   }                                               ", //  1.7.3$
"   #__myogb.hide #gbwa + div + div .gb_q {         ", // ^1.7.6
"       margin-top: 2px;                            ",
"       height: 25px;                               ",
"       line-height: 25px;                          ",
"   }                                               ", //  1.7.6$
"   #__myogb.hide .gb_B {                           ",
"       margin-top: 2px;                            ",
"       width: 25px;                                ",
"       height: 25px;                               ",
"       background-size: 25px 25px;                 ",
"   }                                               ", //  1.7.0$
"   #__myogb.hide .gb_n .gb_la {                    ", // ^1.7.2
"       margin-top: 1px;                            ",
"   }                                               ", //  1.7.2$
"   #__myogb.hide .gb_n > div + div {               ", // ^1.7.3
"       margin-top: 1px;                            ",
"   }                                               ", //  1.7.3$
"   #__myogb.hide .gb_q > div + div {               ", // ^1.7.6
"       margin-top: 1px;                            ",
"   }                                               ", //  1.7.6$
"   /* Google+ name */                              ",
"   #__myogb.hide #gbi4t {                          ",
"       color: #CCC;                                ",
"   }                                               ",
"   /* Google+ notifications */                     ",
"   #__myogb.hide #gbi1a {                          ",
"       height: 24px;                               ",
"   }                                               ",
"   #__myogb.hide #gb.gbes #gbi1a {                 ",
"       height: 18px;                               ",
"   }                                               ",
"   #__myogb.hide #gbi1 {                           ",
"       top: 0;                                     ",
"   }                                               ",
"   #__myogb.hide #gb.gbes #gbi1  {                 ",
"       top: 0;                                     ",
"   }                                               ",
"   #__myogb.hide #gbgs3 {                          ",
"       height: 24px;                               ",
"   }                                               ",
"   #__myogb.hide #gbg1 > div {                     ",
"       border: 1px solid #c6c6c6;                  ",
"       -moz-border-radius: 2px;                    ",
"       -o-border-radius: 2px;                      ",
"       -webkit-border-radius: 2px;                 ",
"       border-radius: 2px;                         ",
"       background-color: #ededed;                  ",
"       height: 24px;                               ",
"       width: 30px;                                ",
"   }                                               ",
"   #__myogb.hide #gb.gbes #gbg1 > div {            ",
"       height: 18px;                               ",
"       width: 27px;                                ",
"   }                                               ",
"   #__myogb.hide #gbg1 > div > div:first-child {   ",
"       background-size: 29px;                      ",
"       height: 24px;                               ",
"       width: 30px;                                ",
"       background-position: 4px -3px;              ",
"   }                                               ",
"   #__myogb.hide #gb.gbes #gbg1 > div > div:first-child { ",
"       background-size: 22px;                      ",
"       height: 18px;                               ",
"       width: 27px;                                ",
"       background-position: 5px -3px;              ",
"   }                                               ",
"   #__myogb.hide #gbg1 > div > div:first-child + div { ",
"       font: bold 9px Arial;                       ",
"   }                                               ",
"   /* Google+ notifications popup */               ",
"   #gbwc {                                         ",
"       overflow: hidden;                           ",
"   }                                               ",
"   /* Google+ Share button */                      ",
"   #__myogb.hide #gb.gbes #gbgs3 {                 ",
"       height: 18px;                               ",
"   }                                               ",
"   #__myogb.hide #gbgsi {                          ",
"       top: 7px;                                   ",
"   }                                               ",
"   #__myogb.hide #gb.gbes #gbgsi {                 ",
"       top: 4px;                                   ",
"   }                                               ",
"   #__myogb.hide #gbi3 {                           ",
"       position: relative;                         ",
"       top: -1px;                                  ",
"   }                                               ",
"   #__myogb.hide #gb.gbes #gbi3 {                  ",
"       top: -1px;                                  ",
"   }                                               ",
"   #__myogb.hide #gbgsa {                          ",
"       top: 7px;                                   ",
"   }                                               ",
"   #__myogb.hide #gb.gbes #gbgsa {                 ",
"       top: 4px;                                   ",
"   }                                               ",
"   /* Google+ icon */                              ",
"   #__myogb.hide #gbgs4 {                          ",
"       height: 26px;                               ",
"       width: 26px;                                ",
"       border: 0;                                  ",
"   }                                               ",
"   #__myogb.hide #gb.gbes #gbgs4 {                 ",
"       height: 20px;                               ",
"       width: 20px;                                ",
"   }                                               ",
"   #__myogb.hide #gbgs4 .gbmai {                   ",
"       left: 30px;                                 ",
"   }                                               ",
"   #__myogb.hide #gb.gbes #gbgs4 .gbmai {          ",
"       left: 24px;                                 ",
"   }                                               ",
"   #__myogb.hide #gbi4i {                          ",
"       height: 26px;                               ",
"       width: 26px;                                ",
"   }                                               ",
"   #__myogb.hide #gb.gbes #gbi4i {                 ",
"       height: 20px;                               ",
"       width: 20px;                                ",
"   }                                               ",
"   #__myogb.hide #gbwa + div + div + div .gb_n {   ", // ^1.7.3
"       margin-top: 2px;                            ",
"       height: 25px;                               ",
"       width: 25px;                                ",
"       background-size: 25px 25px;                 ",
"   }                                               ", //  1.7.3$
"   #__myogb.hide #gbwa + div + div + div .gb_q {   ", // ^1.7.6
"       margin-top: 2px;                            ",
"       height: 25px;                               ",
"       width: 25px;                                ",
"       background-size: 25px 25px;                 ",
"   }                                               ", //  1.7.6$
// No longer know...
"   #__myogb #gbgs4d .gbma {                        ",
"       display: none;                              ",
"   }                                               ",
"   #__myogb.hide #gbgs4d .gbma {                   ",
"       display: inline-block;                      ",
"   }                                               ",
"   #__myogb.hide #gbgs4d .gbmai {                  ",
"       display: none;                              ",
"   }                                               ",
"   #__myogb.hide #gbgs4dn {                        ",
"       color: #CCC;                                ",
"       overflow: visible;                          ",
"   }                                               ",
// Top Bar
"   #__myogb.hide #gb.gbem {                        ",
"       height: 30px;                               ",
"   }                                               ",
"   #__myogb.hide #gb.gbes {                        ",
"       height: 24px;                               ",
"   }                                               ",
"   #__myogb.hide #gb > div:first-child > div{      ", // ^1.7.4
"       height: 30px;                               ",
"       line-height: 26px;                          ",
"   }                                               ", //  1.7.4$
"   #__myogb.hide .gb_qb > .gb_f {                  ", // ^1.7.0
"       height: 30px;                               ",
"       line-height: 26px;                          ",
"   }                                               ", //  1.7.0$
"   #__myogb.hide #gbq1 a > span {                  ", // ^1.7.4
"       height: 25px;                               ",
"   }                                               ", //  1.7.4$
"   #__myogb.hide #gbq1 a > span:not([style*=\"background-image\"]) { ", // ^1.7.5  ^1.7.8
"       width: 70px;                                ",
"       background-position: -230px -27px;          ",
"       background-size: 500%;                      ",
"   }                                               ", //  1.7.5$  1.7.8$
"   #__myogb.hide-all {                             ",
"       /*visibility: hidden;*/                     ",
"       display: none;                              ",
"       height: 0px;                                ",
"   }                                               ",
"   #__mycct.hide #__myvrn.hide {                   ",
"       display: none;                              ",
"   }                                               ",
"   /* Search Bar */                                ",
"   #__myogb.hide #gbw #gbq {                       ",
"       visibility: hidden;                         ",
"   }                                               ",
"   #__myogb.hide #gbx1 {                           ",
"       visibility: hidden;                         ",
"   }                                               ",
"   #__myogb.hide #gbq2 {                           ", // ^1.7.0
"       padding-top: 3px;                           ",
"   }                                               ",
"   #__myogb.hide .gb_qb {                          ",
"       height: 30px;                               ",
"   }                                               ",
"   #__myogb.hide #gb > div:first-child {           ", // ^1.7.3
"       height: 30px;                               ",
"   }                                               ", //  1.7.3$
"   #__myogb.hide #gbqfq {                          ",
"       margin-top: 0;                              ",
"   }                                               ",
"   #__myogb.hide #gbqfqw {                         ", // ^1.7.7$
"       height: 23px;                               ",
"   }                                               ",
"   #__myogb.hide .asb-i  {                         ",
"       margin-top: 6px;                            ",
"   }                                               ",
"   #__myogb.hide #gbqfb  {                         ",
"       height: 23px;                               ",
"   }                                               ", //  1.7.0$
"   #__myogb.hide #gbqfb > span {                   ", // ^1.7.4
"       margin-top: -4px;                           ",
"   }                                               ", //  1.7.4$
"   #__myogb.hide #gs_lc50 {                        ", // ^1.7.7
"       margin-top: -4px;                           ",
"   }                                               ", //  1.7.7$
"   /* Top Toggle Bar */                            ",
"   #__myttb {                                      ",
"       height: 5px;                                ",
"       padding: 2px 0 1px 0;                       ",
"       /*border-bottom: 1px solid #EBEBEB;*/       ",
"   }                                               ",
"   #__myttb_ar1, #__myttb_ar2 {                    ",
"       display: none;                              ",
"       width: 6px;                                 ",
"       position: relative;                         ",
"       left: 50%;                                  ",
"   }                                               ",
"   #__myttb.hide #__myttb_ar1 {                    ",
"       display: block;                             ",
"   }                                               ",
"   #__myttb:not([class~=\"hide\"]) #__myttb_ar2 {  ",
"       display: block;                             ",
"   }                                               ",
"   .__ar_v {                                       ",
"       height: 1px;                                ",
"       background-color: #858A8D;                  ",
"   }                                               ",
"   .__ar_v0 {                                      ",
"       margin: 0;                                  ",
"   }                                               ",
"   .__ar_v1 {                                      ",
"       margin: 0 1px;                              ",
"   }                                               ",
"   .__ar_v2 {                                      ",
"       margin: 0 2px;                              ",
"   }                                               ",
// Left Bar
"   #__myltb {                                      ",
"       position: absolute;                         ",
"       top: 0;                                     ",
"       left: 0;                                    ",
"       height: 100%;                               ",
"       width: 5px;                                 ",
"       padding: 0 0 0 2px;                         ",
"       /*border-right: 1px solid #EBEBEB;*/        ",
"   }                                               ",
"   #__myltb_ar1, #__myltb_ar2 {                    ",
"       display: none;                              ",
"       float: left;                                ",
"       height: 6px;                                ",
"       position: relative;                         ",
"       top: 50%;                                   ",
"   }                                               ",
"   #__myltb.hide #__myltb_ar1 {                    ",
"       display: block;                             ",
"   }                                               ",
"   #__myltb:not([class~=\"hide\"]) #__myltb_ar2 {  ",
"       display: block;                             ",
"   }                                               ",
"   .__ar_h {                                       ",
"       float: left;                                ",
"       width: 1px;                                 ",
"       background-color: #858A8D;                  ",
"   }                                               ",
"   .__ar_h0 {                                      ",
"       height: 6px;                                ",
"       margin: 0;                                  ",
"   }                                               ",
"   .__ar_h1 {                                      ",
"       height: 4px;                                ",
"       margin: 1px 0;                              ",
"   }                                               ",
"   .__ar_h2 {                                      ",
"       height: 2px;                                ",
"       margin: 2px 0;                              ",
"   }                                               ",
"   .__clear_float {                                ",
"       display: none;                              ",
"       clear: both;                                ",
"   }                                               ",
"   #__myttb:hover, #__myltb:hover {                ",
"       background-color: #E7EBEF;                  ",
"       cursor: pointer;                            ",
"   }                                               ",
// Notifications
"   #calcontent #__mynto #ntowner {                 ",
"       height: 0;                                  ",
"       position: absolute;                         ",
"       top: ", ($("gbx1") ? "139" : "97"), "px;    ",
"       left: 10px;                                 ",
"       right: 10px;                                ",
"   }                                               ",
"   #calcontent #__mynto.hide1 #ntowner {           ",
"       top: 37px;                                  ",
"   }                                               ",
"   #calcontent #__mynto.hide2 #ntowner {           ",
"       top: 67px;                                  ",
"   }                                               ",
"   #calcontent #__mynto.hide3 #ntowner {           ",
"       top: 37px;                                  ",
"   }                                               ",
"   #calcontent #__mynto.hide4 #ntowner {           ",
"       top: 7px;                                   ",
"   }                                               ",
"   #calcontent #__mynto #ntowner #nt1 {            ",
"       height: 0;                                  ",
"   }                                               ",
// Right Bar
"   #mainbody {                                     ",
"       position: relative;                         ",
"   }                                               ",
"                                                   ",
"   div#maincell.has-sn {                           ",
"       margin-right: 10px !important;              ",
"   }                                               ",
"   div#maincell.has-sn-ex {                        ",
"       margin-right: 173px !important;             ",
"   }                                               ",
"   #maincell.has-sn #gridcontainer {               ",
"       margin-right: 0 !important;                 ",
"   }                                               ",
"   #maincell.has-sn-ex #gridcontainer {            ",
"       margin-right: 0 !important;                 ",
"   }                                               ",
"   #calcontent #gadgetcell {                       ",
"       margin-right: 0 !important;                 ",
"       width: 162px;                               ",
"   }                                               ",
"   #calcontent #rhstogglecell.rhstogglecell-open { ",
"       right: 162px !important;                    ",
"   }                                               ",
// Bubble
"   .bubble[style*=\"left: -\"] {                   ",
"       left: 0 !important;                         ",
"   }                                               ",
"   .bubble[style*=\"left: -\"] #prong\\:f {        ",
"       display: none;                              ",
"   }                                               ",
""
  ].join("").split(/ +/).join(" ");

  if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
  } else if (typeof PRO_addStyle != "undefined") {
    PRO_addStyle(css);
  } else if (typeof addStyle != "undefined") {
    addStyle(css);
  } else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
      var node = document.createElement("style");
      node.type = "text/css";
      node.appendChild(document.createTextNode(css));
      heads[0].appendChild(node); 
    }
  }

  if (typeof GM_getValue != "function" || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported") > -1)) {
    this.GM_getValue = function (key, def) {
        return localStorage.getItem(key) || def;
    };
    this.GM_setValue = function (key, value) {
        return localStorage.setItem(key, value);
    };
    this.GM_deleteValue = function (key) {
        return localStorage.removeItem(key);
    };
  }

  // toggle
  if (eval(GM_getValue("GCBT_GG_INIT", "false")) || (eval(GM_getValue("GCBT_GG_SAVE", "false")) && eval(GM_getValue("GCBT_GG_OPEN", "false")))) {
    setTimeout(sw_gglbar, 0);
  }
  if (eval(GM_getValue("GCBT_VR_INIT", "false")) || (eval(GM_getValue("GCBT_VR_SAVE", "false")) && eval(GM_getValue("GCBT_VR_HIDE", "false")))) {
    setTimeout(sw_vrnbar, 0);
  }
  if (eval(GM_getValue("GCBT_GC_INIT", "true")) || (eval(GM_getValue("GCBT_GC_SAVE", "false")) && eval(GM_getValue("GCBT_GC_HIDE", "true")))) {
    setTimeout(toggle_gc, 0);
  }
  if (eval(GM_getValue("GCBT_NV_INIT", "true")) || (eval(GM_getValue("GCBT_NV_SAVE", "false")) && eval(GM_getValue("GCBT_NV_HIDE", "true")))) {
    setTimeout(toggle_nv, 0);
  }
 })();