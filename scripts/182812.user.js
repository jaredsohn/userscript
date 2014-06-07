// ==UserScript==
// @name         pw_monkey
// @namespace    http://www.plotwatt.com/
// @version      0.1
// @description  
// @include      http://*.egaug.es/settings.html
// @copyright    2013, Plotwatt
// ==/UserScript==

(function() {
    
    unsafeWindow.save_without_validations = function(){
        alert("pw saved");
        
        function response (obj, xml, result) {
            if (result.match ("^UNCHANGED")) {
                if (saved[which])
                    saved[which](result);
                window.alert ("Settings didn't change.  Nothing saved.");
            } else if (result.match ("^SAVED")) {
                if (saved[which])
                    saved[which](result);
                window.alert ("Settings saved.");
            } else if (result.match ("^REBOOT")) {
                if (saved[which])
                    saved[which](result);
                if (window.confirm ("Settings saved.  The device needs to reboot " +
                                    "before the new settings take effect.\n\n" +
                                    "Do you wish to reboot now?\n")) {
                    var url = (location.protocol + "//" + location.host
                               + "/reboot.html?");
                    
                    if (which == NET) {
                        url += "hostname=" + settings[NET].hostname.get ();
                        if (settings[NET].dhcp.get () != "yes")
                            url += "&ip=" + settings[NET].ipaddr.get ();
                    }
                    
                    window.location.replace (url);
                    return;
                }
            } else
                window.alert ("Settings not saved: " + result);
            return;
        }
        
        try {
            var str = "";
            for (var name in settings[which]) {
                var obj = settings[which][name];
                if (obj.get) {
                    var val = obj.get (name);
                    if (val != null)
                        str += name + "=" + val + "\n";
                }
            }
            
            req[which].send ("POST", postURL[which], response, null, str);
            
        } catch (e) {
            if (e.name != "Error" || e.message != "Undefined CT")
                throw e;
        };
    }
    
    
    
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
        alert("pw_monkey: all alerts and validations are blocked, you should see them on console (F12 -> Console) ")
        document.getElementById("save_button").attributes.onclick.value = "save_without_validations();"
        unsafeWindow.alert = function (msg){
            console.log(msg);
        }
    }, 2000);
    
    
})();
