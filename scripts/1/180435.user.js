// ==UserScript==
// @name          Planets.nu - Minefield Reporter Plugin
// @description   Adds several summary reports to help analyze minesweep data
// @include       http://*.planets.nu/*
// @include       http://planets.nu/*
// @version 0.1
// ==/UserScript==
 
function wrapper () { // wrapper for injection


    var pluginName = "MineSweepReporter";
    
    if (!vgap) return;
    if (vgap.version < 3) return;
    
    if (!vgap.toolkit || !vgap.toolkit.version || vgap.toolkit.version < 3) {
        var html = "<div class=ToolkitWarning style='width: 600px; height: 200px; position: absolute; top: 50%; left: 50%; margin-left: -310px; margin-top: -110px; padding: 20px; background-color: #888888'>";
        html    += "<div style='width: 100%; text-align: right;'><a onclick='$(\"div.ToolkitWarning\").remove(); return false;'><span style='padding: 5px; background-color: #aaaaaa; cursor: pointer;'>X</span></a></div>";
        html    += "WARNING: Toolkit Not Installed or Needs Update<br><br>";
        html    += "The plugin <span style='font-style: italic;'>" + pluginName + "</span> requires the Planets.nu Plugin Toolkit to be installed.<br><br>";
        html    += "To install the latest toolkit, click <a href='http://userscripts.org/scripts/source/179304.user.js' target='_blank'>HERE</a><br>";
        html    += "(You will need to exit any open game and refresh yout browser after installing)<br><br>";
        html    += "Note: If you have installed the latest toolkit and are still getting this error, you may need to adjust the script execution order so that the toolkit is run first.</div>";
        $("body").append(html);
        return;
    }
        
    var plugin = {
        name: pluginName,
        
        processload: function () {
            this.messagetype = vgap.addMessageType("Mine Reports");
            this.addReports();
        },
        
        buildSweepData: function () {
            var data = [];
            for (var i = vgap.messages.length-1; i >= 0; i--) {
                var m = vgap.messages[i];
                if (m.messagetype == 4) {
                    var r = {};
                    var lines = m.body.split("<br/>");
                    r.shipline = m.headline;
                    r.shipid = parseInt(r.shipline.substr(r.shipline.lastIndexOf("#")+1));
                    r.mineid = m.target;
                    r.swept = parseInt(lines[7]);
                    r.mleft = parseInt(lines[8]);
                    r.start = r.mleft + r.swept;
                    
                    if (!isNaN(r.swept))data.push(r);
                
                }
            }
            return data;
        },
        
        buildSweepByShipReport: function (data) {
            data.sort(function (a, b) {
                if (a.shipid == b.shipid)
                    return (a.mineid - b.mineid);
                return a.shipid - b.shipid;
            });
            var html = "<table><thead><tr><th>+</th><th>Ship</th><th>Field ID</th><th>Swept</th><th>Mines Pre-Sweep</th><th>Mines Post-Sweep</th><th>Radius Pre-Sweep</th><th>Radius Post-Sweep</th></tr></thead><tbody>";
            var curship = 0;
            var totalswept;
            var fieldsswept = 0;
            var grandtotal = 0;
            for (var i = 0; i < data.length; i++) {
                var s = data[i];
                if (s.shipid != curship) {
                    if (curship != 0 && fieldsswept > 1) {
                        html += "<tr><td/><td/><td>Total</td><td>" + totalswept + "</td></tr>";
                    }
                    curship = s.shipid;
                    totalswept = 0;
                    fieldsswept = 0;
                    html += "<tr><td>+</td><td>" + s.shipline + "</td>";
                }
                else {
                    html += "<tr><td/><td/>";
                }
                html += "<td>" + s.mineid + "</td><td>" + s.swept + "</td><td>" + s.start + "</td><td>" + s.mleft + "</td><td>" + vgap.minefieldRadius(s.start) + "</td><td>" + vgap.minefieldRadius(s.mleft) + "</td></tr>";
                totalswept += s.swept;
                grandtotal += s.swept;
                fieldsswept++;
            }
            if (fieldsswept > 1) html += "<tr><td/><td/><td>Total</td><td>" + totalswept + "</td></tr>";
            html += "<tr><td/><td>Total</td><td/><td>" + grandtotal + "</td></tr></tbody><table>"; 
            return html;
        },
        buildSweepByFieldReport: function (data) {
            data.sort(function (a, b) {
                if (a.mineid == b.mineid)
                    return (a.shipid - b.shipid);
                return a.mineid - b.mineid;
            });
            var html = "<table><thead><tr><th>+</th><th>Field ID</th><th>Ship</th><th>Swept</th><th>Mines Pre-Sweep</th><th>Mines Post-Sweep</th><th>Radius Pre-Sweep</th><th>Radius Post-Sweep</th></tr></thead><tbody>";
            var curship = 0;
            var totalswept;
            var fieldsswept = 0;
            var grandtotal = 0;
            for (var i = 0; i < data.length; i++) {
                var s = data[i];
                if (s.mineid != curship) {
                    if (curship != 0 && fieldsswept > 1) {
                        html += "<tr><td/><td/><td>Total</td><td>" + totalswept + "</td></tr>";
                    }
                    curship = s.mineid;
                    totalswept = 0;
                    fieldsswept = 0;
                    html += "<tr><td>+</td><td>" + s.mineid + "</td>";
                }
                else {
                    html += "<tr><td/><td/>";
                }
                html += "<td>" + s.shipline + "</td><td>" + s.swept + "</td><td>" + s.start + "</td><td>" + s.mleft + "</td><td>" + vgap.minefieldRadius(s.start) + "</td><td>" + vgap.minefieldRadius(s.mleft) + "</td></tr>";
                totalswept += s.swept;
                grandtotal += s.swept;
                fieldsswept++;
            }
            if (fieldsswept > 1) html += "<tr><td/><td/><td>Total</td><td>" + totalswept + "</td></tr>";
            html += "<tr><td/><td>Total</td><td/><td>" + grandtotal + "</td></tr></tbody><table>"; 
            return html;
        },
        
        buildFieldChangeReport: function () {
            var data = [];
            for (var i = vgap.messages.length-1; i >= 0; i--) {
                var m = vgap.messages[i];
                if (m.messagetype == 19) {
                    var r = {};
                    var lines = m.body.split("<br/>");
                    if (lines[0].lastIndexOf("We are scanning our mines", 0) != 0) continue;
                    r.shipline = m.headline;
                    r.shipid = parseInt(r.shipline.substr(r.shipline.lastIndexOf("#")+1));
                    r.mineid = m.target;
                    r.count = parseInt(lines[1].split(" ")[3]);
                    data.push(r);
                }
            }            
            
            data.sort(function (a, b) {
                if (a.mineid == b.mineid)
                    return (a.shipid - b.shipid);
                return a.mineid - b.mineid;
            });
            
            var html = "<table><thead><tr><th>+</th><th>Field ID</th><th>Pre-Change Ship</th><th>Post-Change Ship</th><th>Change</th><th>Mines Pre-Change</th><th>Mines Post-Change</th><th>Radius Pre-Change</th><th>Radius Post-Change</th></tr></thead><tbody>";
            var curfield = 0;
            var oldval = null;
            var newfield;
            for (var i = 0; i < data.length; i++) {
                var s = data[i];
                if (s.mineid != curfield) {
                    curfield = s.mineid;
                    newfield = true;
                }
                else {
                    if (oldval != null && oldval.count != s.count) {
                        var change = s.count - oldval.count;
                        
                        var beams = vgap.guessBeamsFromSweep(change);
                        var bstring = "Unknown";
                        if (beams.length > 0) {
                            bstring = "" + beams[0].count + " " + vgap.getBeam(beams[0].beamid).name;
                            for (var j = 1; j < beams.length; j++) {
                                bstring += "&#10;" + beams[j].count + " "  +vgap.getBeam(beams[j].beamid).name;                            
                            }
                        }
                        
                        if (newfield) {
                            html += "<tr><td>+</td><td>" + s.mineid + "</td>";
                            newfield = false;
                        }
                        else {
                            html += "<tr><td/><td/>";
                        }                    
                        html += "<td>" + oldval.shipline + "</td><td>" + s.shipline + "</td><td title='" + bstring + "'>" + change + "</td><td>" + oldval.count + "</td><td>" + s.count + "</td><td>" + vgap.minefieldRadius(oldval.count) + "</td><td>" + vgap.minefieldRadius(s.count) + "</td></tr>";
                    }
                }
                oldval = s;
            } 
            return html;
        },        
        
        addReports: function () {
            var data = this.buildSweepData();
            vgap.messages.push( {id: "MSR_bs", x:0, messagetype: this.messagetype, headline: "Mine Sweeping by Ship", body: this.buildSweepByShipReport(data)} );
            vgap.messages.push( {id: "MSR_bf", x:0, messagetype: this.messagetype, headline: "Mine Sweeping by Field", body: this.buildSweepByFieldReport(data)} ); 
            vgap.messages.push( {id: "MSR_fc", x:0, messagetype: this.messagetype, headline: "Changes Between Scans of Own Fields", body: this.buildFieldChangeReport()} );                            
        }
        
    }
    vgap.toolkit.registerPlugin(plugin);
    
    //END TOOLKIT HEADER



} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script); 
document.body.removeChild(script);