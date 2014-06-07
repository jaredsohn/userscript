// ==UserScript==
// @name           Tiberium Alliances Language Changer
// @description    Allows you to change UI language
// @namespace      https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include        https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version        13.10.30
// @author         TheStriker
// @updateURL      https://userscripts.org/scripts/source/178611.meta.js
// @downloadURL    https://userscripts.org/scripts/source/178611.user.js
// ==/UserScript==

/**
 *  License: CC-BY-NC-SA 3.0
 */

(function () {
  var LangScript_main = function () {

    var useGamedata = true;

    var locales = {
      "ar_AE" : "Arabic",
      "cs_CZ" : "Czech",
      "da_DK" : "Danish",
      "de_DE" : "German",
      "el_GR" : "Greek",
      "en_US" : "English",
      "es_ES" : "Spanish",
      "fi_FI" : "Finnish",
      "fr_FR" : "French",
      "he_IL" : "Hebrew",
      "hu_HU" : "Hungarian",
      "id_ID" : "Indonesian",
      "it_IT" : "Italian",
      "nb_NO" : "Norwegian",
      "nl_NL" : "Dutch",
      "pl_PL" : "Polish",
      "pt_BR" : "Portuguese (Brazil)",
      "pt_PT" : "Portuguese (Portugal)",
      "ro_RO" : "Romanian",
      "ru_RU" : "Russian",
      "sk_SK" : "Slovak",
      "sv_SE" : "Swedish",
      "ta_IN" : "Tamil",
      "tr_TR" : "Turkish",
      "uk_UA" : "Ukrainian"
    };

    function loadScript(uri, callback) {
      var elem = document.createElement("script");
      elem.charset = "utf-8";
      elem.src = uri;
      elem.onreadystatechange = elem.onload = function () {
        if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
          elem.onreadystatechange = elem.onload = null;
          if (typeof callback === "function") {
            callback();
          }
        }
      };
      document.getElementsByTagName("head")[0].appendChild(elem);
    }

    function changeLang(lang) {
      if (qx.locale.Manager.getInstance().getLocale() == lang)
        return;
      if (qx.locale.Manager.getInstance().getAvailableLocales().indexOf(lang) == -1) {
        loadScript(PerforceChangelist + "/script/webfrontend-" + lang.substr(0, 2) + ".js", function () {
          loadScript(PerforceChangelist + "/script/webfrontend-" + lang + ".js", function () {
            qx.locale.Manager.getInstance().setLocale(lang);
          });
          if (useGamedata) {
            GAMEDATA_orig = GAMEDATA;
            loadScript("gamedata_" + lang.substr(0, 2) + ".js", function () {
              GAMEDATA_lang = GAMEDATA;
              GAMEDATA = GAMEDATA_orig;
              var keys = Object.keys(GAMEDATA.units);
              var data,
              data_lang;
              for (var i = 0; i < keys.length; i++) {
                if (!GAMEDATA_lang.units.hasOwnProperty(keys[i]))
                  continue;
                data = GAMEDATA.units[keys[i]];
                data_lang = GAMEDATA_lang.units[keys[i]];
                data.dn = data_lang.dn;
                data.dnuc = data_lang.dnuc;
                data.ds = data_lang.ds;
              }
              keys = Object.keys(GAMEDATA.Tech);
              for (var i = 0; i < keys.length; i++) {
                if (!GAMEDATA_lang.Tech.hasOwnProperty(keys[i]))
                  continue;
                data = GAMEDATA.Tech[keys[i]];
                data_lang = GAMEDATA_lang.Tech[keys[i]];
                data.dn = data_lang.dn;
                data.dnuc = data_lang.dnuc;
                data.ds = data_lang.ds;
                data.sds = data_lang.sds;
                if (data_lang.tr != null && data_lang.tr.uds != null) {
                  data.tr.dn = data_lang.tr.dn;
                  data.tr.dnuc = data_lang.tr.dnuc;
                  data.tr.ds = data_lang.tr.ds;
                  data.tr.uds = data_lang.tr.uds;
                }
              }
              keys = Object.keys(GAMEDATA.items);
              for (var i = 0; i < keys.length; i++) {
                if (!GAMEDATA_lang.items.hasOwnProperty(keys[i]))
                  continue;
                data = GAMEDATA.items[keys[i]];
                data_lang = GAMEDATA_lang.items[keys[i]];
                data.dn = data_lang.dn;
                data.ds = data_lang.ds;
                data.sds = data_lang.sds;
              }
              keys = Object.keys(GAMEDATA.PlayerTitles);
              for (var i = 0; i < keys.length; i++) {
                if (!GAMEDATA_lang.PlayerTitles.hasOwnProperty(keys[i]))
                  continue;
                var innerKeys = Object.keys(GAMEDATA.PlayerTitles[keys[i]]);
                for (var j = 0; j < innerKeys.length; j++) {
                  if (!GAMEDATA_lang.PlayerTitles[keys[i]].hasOwnProperty(innerKeys[j]))
                    continue;
                  data = GAMEDATA.PlayerTitles[keys[i]][innerKeys[j]];
                  data_lang = GAMEDATA_lang.PlayerTitles[keys[i]][innerKeys[j]];
                  data.dn = data_lang.dn;
                }
              }
              keys = Object.keys(GAMEDATA.missions);
              for (var i = 0; i < keys.length; i++) {
                if (!GAMEDATA_lang.missions.hasOwnProperty(keys[i]))
                  continue;
                for (var j = 0; j < GAMEDATA.missions[keys[i]].s.length; j++) {
                  data = GAMEDATA.missions[keys[i]].s[j];
                  data_lang = GAMEDATA_lang.missions[keys[i]].s[j];
                  data.d = data_lang.d;
                  data.n = data_lang.n;
                }
              }
              delete GAMEDATA_lang;
              delete GAMEDATA_orig;
              console.log("TA Language: GAMEDATA loaded.");
            });
          }
        });
      } else
        qx.locale.Manager.getInstance().setLocale(lang);
    }

    function LangMenu_checkIfLoaded() {
      try {
        if (typeof qx !== "undefined" && qx.core.Init.getApplication().getOptionsBar() !== null) {
          var stats = document.createElement('img');
          stats.src = "http://goo.gl/87bL2O"; // http://goo.gl/#analytics/goo.gl/87bL2O/all_time
          function findChild(children) {
            for (var child in children) {
              if (children[child].basename == "Composite" && children[child].hasChildren()) {
                var child = findChild(children[child].getChildren());
                if (child != null)
                  return child;
              } else if (typeof children[child].objid !== "undefined" && children[child].objid == "lbl_credits")
                return children[child];
            }
            return null;
          }
          var parent = findChild(qx.core.Init.getApplication().getOptionsBar().getChildren()).$$parent;
          var langLink = new qx.ui.basic.Label("<u>Language</u>").set({
              textColor : "text-server-options",
              rich : true,
              appearance : "clickable-link",
              cursor : "pointer",
              font : "small"
            });
          langLink.addListener("click", function () {
            var langChange = new webfrontend.gui.OverlayWidget();
            langChange.setMaxWidth(200);
            langChange.setMaxHeight(150);
            langChange.clientArea.setLayout(new qx.ui.layout.VBox(5));
            langChange.setTitle("Language Changer");
            langChangeLabel = new qx.ui.basic.Label("Language:").set({
                textColor : "text-label",
                marginTop : 10,
                marginLeft : 20
              });
            langChangeLabel.setThemedFont("bold");
            langChange.clientArea.add(langChangeLabel);
            var langSelect = new qx.ui.form.SelectBox().set({
                marginRight : 10,
                marginLeft : 20
              });
            var langs = Object.keys(qx.$$translations).filter(function (element, index, array) {
                return element && element.length == 5;
              });
            for (var i = 0; i < langs.length; i++) {
              langSelect.add(new qx.ui.form.ListItem(locales.hasOwnProperty(langs[i]) ? locales[langs[i]] : langs[i], null, langs[i]));
            }
            langSelect.setModelSelection([qx.locale.Manager.getInstance().getLocale()]);
            langChange.clientArea.add(langSelect);
            var buttonUrlSave = new qx.ui.form.Button("Save").set({
                marginRight : 10,
                marginLeft : 20,
                width : 80,
                appearance : "button-text-small",
                toolTipText : "Save language."
              });
            langChange.clientArea.add(buttonUrlSave);
            buttonUrlSave.addListener("execute", function () {
              localStorage.lang = langSelect.getSelection()[0].getModel();
              changeLang(localStorage.lang);
              langChange.close();
            }, langChange);
            langChange.show();
          }, this);
          parent.add(langLink);
        } else {
          setTimeout(LangMenu_checkIfLoaded, 500);
        }
      } catch (e) {
        if (typeof console !== "undefined") {
          console.log(e + ": " + e.stack);
        } else if (window.opera) {
          opera.postError(e);
        } else {
          GM_log(e);
        }
      }
    }
    setTimeout(LangMenu_checkIfLoaded, 500);

    function Lang_checkIfLoaded() {
      try {
        if (typeof qx !== "undefined" && qx.$$loader.scriptLoaded) {
          if (typeof localStorage.lang !== "undefined")
            changeLang(localStorage.lang);
        } else {
          setTimeout(Lang_checkIfLoaded, 100);
        }
      } catch (e) {
        if (typeof console !== "undefined") {
          console.log(e + ": " + e.stack);
        } else if (window.opera) {
          opera.postError(e);
        } else {
          GM_log(e);
        }
      }
    }
    setTimeout(Lang_checkIfLoaded, 100);
  };
  var LangScript = document.createElement("script");
  LangScript.innerHTML = "(" + LangScript_main.toString() + ")();";
  LangScript.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(LangScript);
})();
