// ==UserScript==
// @name         pw_monkey
// @namespace    http://www.plotwatt.com/
// @version      0.1
// @description  removes restriction placed by egauge disallowing a "."
// @include      http://*.egaug.es/settings.html
// @copyright    2013, Plotwatt
// ==/UserScript==

(function() {
    function inst_validate_tapped() {
        var t = settings[INST].team.get ();
        t = t.split ("name=");
        var s, m;
        for (var i = 1; i < t.length; ++i) {
            s = t[i].substring(1, t[i].indexOf ("\"", 1));
            if (s.match(/\./)) {
                window.alert("Physical register names can not contain the " +
                             "character '.' as this is used to define " +
                             "views in virtual registers. Please choose a " +
                             "different name for \"" + s + "\".");
                //return false;
                return true;
            }
        }
        
        t = settings[INST].totals.get ();
        t = t.split (/map[0-9]+=/);
        for (i = 1; i < t.length; ++i) {
            s = t[i].substring(1, t[i].indexOf ("\"", 1));
            m = s.match(/\./g);
            if (m && m.length > 1) {
                window.alert ("Virtual register names can not contain more than " +
                              "one '.' as this is used to denote the view name. " +
                              "Please choose a different name for \"" + s + "\".");
                return false;
            }
        }
        
        update_default_reg (t);
        return true;
    }
    
    setTimeout(function(){
        validate[INST] = inst_validate_tapped;
        alert("pw_monkey: alerts are blocked, you should see them on console (F12 -> Console) ")
        unsafeWindow.alert = function (msg){
            console.log(msg);
        }
    }, 1000);
   
})();

