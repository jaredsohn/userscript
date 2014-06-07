// ==UserScript==
// @name           DD-WRT Cron Job Editor
// @namespace      http://userscripts.org/users/423875
// @include        *
// ==/UserScript==

if (document.getElementById("cron_jobs")) {
    window["updatecrondata"] = function(evt) {
        var cronjobs = document["getElementById"]("cron_jobs")
        var cronlines = document["getElementById"]("crontbody")["children"]
        
        var crondata = ""
        for (var line = 0; line < cronlines.length - 1; line++) {
            var boxes = cronlines[line]["getElementsByTagName"]("input");
            crondata += boxes[0]["value"] + " " + boxes[1]["value"] + " " + boxes[2]["value"] + " " + boxes[3]["value"] + " " + boxes[4]["value"] + " " + boxes[5]["value"] + " " + boxes[6]["value"] + "\n"
        }
        
        cronjobs["value"] = crondata.slice(0, -1)
    }
    
    window.removecronline = function(evt) {
        var tr = evt.target.parentNode.parentNode
        tr.parentNode.removeChild(tr)
        window.updatecrondata()
    }
    
    window.createcronline = function(evt) {
        var crontbody = document.getElementById("crontbody")
        var footer = crontbody.lastChild
        
        var tr = document.createElement("tr")
                
        tr.appendChild(createcrontexttd(1, "*"))
        tr.appendChild(createcrontexttd(1, "*"))
        tr.appendChild(createcrontexttd(1, "*"))
        tr.appendChild(createcrontexttd(1, "*"))
        tr.appendChild(createcrontexttd(1, "*"))
        tr.appendChild(createcrontexttd(4, "root"))
        tr.appendChild(createcrontexttd(42, "true"))
        tr.appendChild(createcronminustd())
        
        crontbody.insertBefore(tr, footer)
        window.updatecrondata()
    }
    
    window.createcrontexttd = function(size, value) {
        var td = document.createElement("td")
        var input = document.createElement("input")
        td.appendChild(input)
        
        input.setAttribute("type", "text")
        input.setAttribute("size", size)
        input.setAttribute("value", value)
        input.addEventListener("keyup", window.updatecrondata, false)
        //input.addEventListener("keypress", window.updatecrondata, false)
        
        return td
    }
    
    window.createcronaddtr = function() {
        var tr = document.createElement("tr")
        
        var td = document.createElement("td")
        tr.appendChild(td)
        td.setAttribute("colspan", 8)
        
        var input = document.createElement("input")
        td.appendChild(input)
        
        input.setAttribute("type", "button")
        input.setAttribute("size", 1)
        input.setAttribute("value", "[+]")
        input["addEventListener"]("click",window["createcronline"],false)
        
        return tr
    }
    
    window.createcronminustd = function() {
        var td = document.createElement("td")
        var input = document.createElement("input")
        td.appendChild(input)
        
        input.setAttribute("type", "button")
        input.setAttribute("size", 1)
        input.setAttribute("value", "[-]")
        input["addEventListener"]("click",window["removecronline"],false)
        
        return td
    }
    
    window.createcrontbody = function() {
        var cronjobs = document.getElementById("cron_jobs")
        var crontbody = document.createElement("tbody")
        var crondata = cronjobs.value
        var cronlines = crondata.split("\n")
        
        for (var line = 0; line < cronlines.length; line++) {
            var cronjob = cronlines[line]
            if (cronjob != "") {
                var crontr = document.createElement("tr")
                crontbody.appendChild(crontr)
                
                var temp1 = cronjob.split(" ")
                var temp2 = temp1.splice(0, 6)
                temp2.push(temp1.join(" "))
                
                crontr.appendChild(createcrontexttd(1, temp2[0]))
                crontr.appendChild(createcrontexttd(1, temp2[1]))
                crontr.appendChild(createcrontexttd(1, temp2[2]))
                crontr.appendChild(createcrontexttd(1, temp2[3]))
                crontr.appendChild(createcrontexttd(1, temp2[4]))
                crontr.appendChild(createcrontexttd(4, temp2[5]))
                crontr.appendChild(createcrontexttd(42, temp2[6]))
                crontr.appendChild(createcronminustd())
            }
        }
        
        crontbody.setAttribute("id", "crontbody")
        crontbody.appendChild(createcronaddtr())
        
        return crontbody
    }
    
    window.initcronedit = function() {
        var cronjobs = document.getElementById("cron_jobs")
        var idcron = cronjobs.parentNode
        
        var crontable = document.createElement("table")
        crontable.setAttribute("id", "crontable")
        crontable.style.setProperty("border-spacing", "0.1em 0.3em", "")
        crontable.style.setProperty("width", "0pt", "")
        crontable.style.setProperty("margin", "0pt", "")
        
        var emptydiv = document.createElement("div")
        emptydiv.appendChild(document.createElement("br"))
        
        var crontbody = window.createcrontbody()
        
        crontable.appendChild(crontbody)
        cronjobs.style["display"]="none"
        idcron.appendChild(emptydiv)
        idcron.appendChild(crontable)
        window.updatecrondata()
    }
    
    window.disablecronedit = function() {
        var cronjobs = document.getElementById("cron_jobs")
        var crontable = document.getElementById("crontable")
        var idcron = cronjobs.parentNode
        
        //cronjobs.style["display"]="block"
    }
    
}



window.initcronedit()