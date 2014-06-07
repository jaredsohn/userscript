// ==UserScript==
// @name           Dragosien Resourcenindikatoren (geändert duch Elrondir)
// @namespace      userscrips.org
// @description    Erweitert das Browserspiel Dragosien um einige nützliche Funktionen (Version 20110329.1)
// @include        http://www.dragosien.de/*
// @include        http://www.dragosien.com/*
// @include        http://test.dragosien.de/*
// @include        http://speed.dragosien.de/*
// @include        http://www.speed.dragosien.de/*
// @include        http://dragosien.de/*
// @include        http://neu.dragosien.de/*n
// @exclude        http://dragosien.de/forum*
// @exclude        http://www.dragosien.de/forum*
// @require        http://serv.endoftheinternet.org/dragosien/json2.js
// @require        http://serv.endoftheinternet.org/dragosien/jquery.js
// @require        http://serv.endoftheinternet.org/dragosien/jquery.flot.js
// ==/UserScript==

startDate=new Date(); 
startTime=startDate.getTime();
version="20110329";
versionString=undefined;
configPane=undefined;
infoPane=undefined;
ressPane=undefined;
graphPane=undefined;
lagerWert2=undefined;
gebaudeName=undefined;
ueberschuss=undefined;
doAlert=[];
activeGebaudePosition=null;
totalAusbauRohstoffe={}
markMarktAusbau=function(){};
body=document.getElementById("container");
var thisIsFF=true;

function testGM() {
 var isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
 if(typeof(unsafeWindow) == 'undefined') { unsafeWindow = window; }
 if(!isGM) { log = function(msg) { try { unsafeWindow.console.log(msg); } catch(e) {} }; } 
  else { log = GM_log; }
 if (window.opera) { log = opera.postError;}
 setValue = isGM ? GM_setValue : function(name, value) { return localStorage.setItem(name, value) };
 getValue = isGM ? GM_getValue : function(name, def){ var s = localStorage.getItem(name); return s == null ? def : s };
 thisIsFF=isGM;
}
testGM();

var currentTime=new Date().getTime();
var DP_EI='0_EI'; // Ei ausbrüten
var DP_BABY='1_BABY'; //
var DP_KIND='2_KIND';
var DP_TEEN='3_TEEN';
var DP_TWEN='4_TWEN';
var DP_ERWACHSEN='5_ERWACHSEN'; //... Kann mehrfach auftreten :-/
var DP_READY='READY'; // Steigerung bereit
var OWN_DRAGON="OWN__NOT__FOREIGN";

Config = {
    booleanChecked : function  () {
        //    Toolbox.addRight("Click! "+this.value+" "+this.checked);
        config[this.value]=this.checked;
        storage.setObject("GS_config",config);
    },
    
    makeBooleanOption : function  (value,text,checked) {
        var container=document.createElement("div");
        container.style.paddingTop="0.2em";
        var input=Toolbox.addElement(container,"input");
        input.type="checkbox";
        input.name=value;
        input.value=value;
        input.checked=checked;
        input.addEventListener("change",Config.booleanChecked,true);
        var text=Toolbox.addElement(container,"span",text);
        text.style.paddingLeft="1em";
        return container;
    },
    
    textChanged : function () {
        //        Toolbox.addRight("Click! "+this.value+" "+this.name);
        config[this.name]=this.value;
        if (this.name.indexOf("COLOR")!=-1) {
            var sample=document.getElementById(this.name);
            if (sample){
                sample.style.color=this.value;
            }
        }
        storage.setObject("GS_config",config);
    },

    checkLater : function () {
        config["lastCheck"]=currentTime;
        storage.setObject("GS_config",config);
    }
}

Core = {
    addSample : function (key,value,interval) {
        if (persistent.data.samples==null) {
            persistent.data.samples={};
        }
        if (persistent.data.samples[key]==null) {
            persistent.data.samples[key]={'lastvalue':0,'data':[]};
        }
        if (((persistent.data.samples[key].lastvalue+interval)<startTime)&&value!=0) {
            persistent.data.samples[key].lastvalue=startTime;
            persistent.data.samples[key].data.push([parseInt(startTime/1000),value]);
            persistent.updateRemote();
        }
    },
    
    //one sample per hour.
    doSample : function () {
        Core.addSample("INDIKATOR",parseInt(indikator),1000*60*60);
        Core.addSample("GOLD",parseInt(lager["gold"]),1000*60*60);
    },
    
    updateVersion : function (response) {
        var found=(response.responseText.match(/VV(.*)VV/));
        if (found) {
            Toolbox.addDebug("::"+version+"|"+found[1]+"::");
            if (version<found[1])            {
                var suche=new RegExp(found[1]+"\\*\\* (.*)","g");
                var pane=Panes.makePane();
                pane.style.maxWidth="700px";
                pane.style.maxHeight="500px";
                var h2=Toolbox.addElement(pane,"h2","Neue Version "+found[1]+" verfügbar");
                h2.style.marginBottom="1em";
                var div=Toolbox.addElement(pane,"div");
                div.style.marginBottom="0.3em";
                Toolbox.addElement(div,"span","Der Link zur aktuellen Version ist:");
                var url="http://serv.endoftheinternet.org/dragosien/resourcen_"+found[1]+".user.js";
                var a=Toolbox.addElement(div,"a",url);
                a.href=url;
                var changes;
                Toolbox.addElement(div,"br");
                Toolbox.addElement(pane,"h5","Neuerungen:");
                var list=Toolbox.addElement(pane,"ul");
                while (changes=suche.exec(response.responseText)) {
                    if (changes) {
                        item=Toolbox.addElement(list,"li",changes[1]);
                        item.style.marginLeft="2em";
                    }
                }
                var button=Toolbox.addElement(pane,"span","Erst später wieder erinnern");
                button.style.margin="1em";
                button.style.border="1px solid black";
                button.style.background="#ccc";
                button.addEventListener("click",function() {
                        this.parentNode.style.display="none";
                        Config.checkLater();
                    },false);
            } else {
                Toolbox.addRight("Aktuelle Version: "+found[1]);
                Config.checkLater();
            }
        }      
    },
    
    updatePrices : function  (response) {
        var currentPrices=JSON.parse(response.responseText);
         var stoff;
        var newer=0;
        currentPrices["update"]=    currentPrices["update"]*1000;
        config["priceCheck"]=new Date().getTime();
        for (stoff in currentPrices) {
            if (stoff!="update") {
                var xstoff=Toolbox.parseStoff(stoff);
                Toolbox.addDebug("stoff :"+stoff+" ("+xstoff+")");
                if (! market[xstoff]) {
                    market[xstoff]={"update":"0"};
                }
                Toolbox.addDebug(" ***"+market[xstoff]["update"]+":"+currentPrices["update"]);
                if (doUpgradePrices || market[xstoff]["update"]<currentPrices["update"]) {
                    newer++;
                    var price=currentPrices[stoff]["price"];
                    Toolbox.addDebug(stoff+": "+market[xstoff]["buy"]+"|"+market[xstoff]["sell"]+" ("+market[xstoff]["Ubuy"]+"|"+market[xstoff]["Usell"]+")");
                    market[xstoff]["buy"]=Math.round(config["PRICE_NPC_H"]*price/100);
                    market[xstoff]["sell"]=Math.round(config["PRICE_NPC_L"]*price/100);
                    market[xstoff]["nbuy"]=Math.round(0.8*price);
                    market[xstoff]["nsell"]=Math.round(1.2*price);
		    if (currentPrices[stoff]["Ubuy"] && currentPrices[stoff]["Ubuy"]<market[xstoff]["buy"]) {
		       market[xstoff]["Ubuy"]=currentPrices[stoff]["Ubuy"];
		    } else {
		       market[xstoff]["Ubuy"]=market[xstoff]["buy"];
		    }
		    if (currentPrices[stoff]["Usell"] && currentPrices[stoff]["Usell"]>market[xstoff]["sell"]) {
		       market[xstoff]["Usell"]=currentPrices[stoff]["Usell"];
		    } else {
		       market[xstoff]["Usell"]=market[xstoff]["sell"];
		    }
                    market[xstoff]["update"]=currentPrices["update"];
                    Toolbox.addDebug(stoff+"* "+market[xstoff]["buy"]+"|"+market[xstoff]["sell"]+" ("+market[xstoff]["Ubuy"]+"|"+market[xstoff]["Usell"]+")");
                }
            }
        }
        Toolbox.addRight(newer+" Preise vom Server aktualisiert");
        storage.setObject("GS_config",config);
        storage.setObject("GS_market",market);
    },

    checkUpdate : function  () {
        Toolbox.addRight("Überprüfe aktuelle Version...");
        GM_xmlhttpRequest({
                          method:"GET",
                                 url:"http://serv.endoftheinternet.org/dragosien/currentVersion?ts"+currentTime,
                                 headers:{
                    "User-Agent":navigator.userAgent,
                        "Accept":"text/plain"
                     },
                    onload:Core.updateVersion
                    });
    },
    
    checkPrices : function  () {
        Toolbox.addRight("Aktualisiere Preise");
	var getfromurl="http://serv.endoftheinternet.org/dragosien/marketsnapshot.json";
	if (speed) {
	   getfromurl="http://serv.endoftheinternet.org/dragosien/speedmarketsnapshot.json";
	}
	
        GM_xmlhttpRequest({
                          method:"GET",
                                 url:getfromurl,
                                 headers:{
                    "User-Agent":navigator.userAgent,
                        "Accept":"text/plain"
                     },
                    onload:Core.updatePrices
                    });
    }

}

Panes = {

    makeRessPane : function  () {
        if (ressPane!=null) {
            return;
        }
        ressPane=document.createElement("div");
        ressPane.style.position="absolute";
        ressPane.style.top="80px";
        ressPane.style.left="25px";
        ressPane.style.background="#ffffff";
        ressPane.style.zIndex="999";
        ressPane.style.border="1px solid black";
        ressPane.style.overflow="auto";
        ressPane.style.display="block";
        ressPane.style.maxWidth="750px";
        ressPane.style.maxHeight="650px";
        ressPane.style.padding="5px";
        ressPane.style.paddingBottom="1em";
        body.insertBefore(ressPane,body.firstChild);
        closeButton=Toolbox.addElement(ressPane,"div","X");
        closeButton.className="layer_close";
        closeButton.style.marginRight="-5px";
        closeButton.style.marginTop="-5px";
        closeButton.addEventListener("click",function() {this.parentNode.style.display='none';},true);
        Toolbox.addElement(ressPane,"h1","Gemessene Produktion: ");
        var ressTable=Toolbox.addElement(ressPane,"table");
        ressTable.className="store";
        compLager=storage.getObject("GS_compLager");
        var tr=Toolbox.addElement(ressTable,"tr");
        var th=Toolbox.addElement(tr,"th","Rohstoff");
        var td;
        th=Toolbox.addElement(tr,"th","Lagerstand");
        th=Toolbox.addElement(tr,"th","Alter Stand");
        th=Toolbox.addElement(tr,"th","Produktion/h");
        var stoffe=new Array();
        for (stoff in lager) {
            if (stoff!="angebote" && stoff!="nachfragen" && stoff!="ausbau" && stoff!="gold" && stoff!="capacity") {
                stoffe.push(stoff);
            }
        }
        stoffe.sort();
        stoffe.unshift("gold");
        for (i=0;i<stoffe.length;i++) {
            var stoff=stoffe[i];
            var ratio=Core.prodPerH(compLager[stoff],lager[stoff],compLager["update"],currentTime);
            if (ratio) {
                tr=Toolbox.addElement(ressTable,"tr");
                td=Toolbox.addElement(tr,"td",Toolbox.prettyStoff(stoff));
                td=Toolbox.addElement(tr,"td",lager[stoff]);
                td=Toolbox.addElement(tr,"td",compLager[stoff]);
                td=Toolbox.addElement(tr,"td",parseInt(100*ratio)/100);
            }
        }
        ressTable.style.marginBottom="1em";
        if (compLager["update"]) {
            var uDate=new Date(compLager["update"]);
            var element=Toolbox.addElement(ressPane,"div","Gemerkter Lagerstand von "+Toolbox.simpleDate(uDate)+" - über "+Toolbox.dauer(new Date(currentTime),uDate)+" gemittelt");
            
            element.style.margin="10px";
        }
        var button=Toolbox.addElement(ressPane,"span","Lagerstand jetzt merken");
        button.style.padding="3px";
        button.style.border="1px solid black";
        button.style.margin="10px";
        button.style.background="#ccc";
        button.addEventListener("click",function() {
                compLager=lager;
                compLager["ausbau"]=null;
                compLager["nachfrage"]=null;
                compLager["angebote"]=null;
                compLager["update"]=new Date().getTime();
                storage.setObject("GS_compLager",compLager);
                ressPane.style.display="none";
            },true);
    },
    
    makeConfigPane : function () {
        configPane=document.createElement("div");
        configPane.style.position="absolute";
        configPane.style.top="120px";
        configPane.style.left="30px";
        //    configPane.style.width="500px";
        //configPane.style.height="250px";
        configPane.style.background="#ffffff";
        configPane.style.zIndex="999";
        configPane.style.border="1px solid black";
        configPane.style.overflow="auto";
        configPane.style.display="block";
        configPane.style.maxWidth="700px";
        configPane.style.padding="5px";
        body.insertBefore(configPane,body.firstChild);
        closeButton=Toolbox.addElement(configPane,"div","X");
        closeButton.className="layer_close";
        closeButton.style.marginRight="-5px";
        closeButton.style.marginTop="-5px";
        closeButton.addEventListener("click",function() {this.parentNode.style.display='none';},true);
        var header=Toolbox.addElement(configPane,"h2","Konfiguration Erweiterung");
        header.style.marginBottom="0.4em";
        header=Toolbox.addElement(configPane,"h5","Es stehen folgende Funktionen zur Auswahl:");
        header.style.marginBottom="0.4em";
        //    Toolbox.doTest(header);
        var configOL=Toolbox.addElement(configPane,"OL");
        configOL.style.marginLeft="2em";
        for (option in configOptions) {
            var optionDiv;
            if (configOptions[option]["type"]==null){
                optionDiv=Config.makeBooleanOption(option,configOptions[option]["text"],Toolbox.isEnabled(option));
            } else {
                if (configOptions[option]["type"]=="sep") {
                    optionDiv=document.createElement("div");
                    optionDiv.style.marginTop="2px";
                    optionDiv.style.marginBottom="2px";
                    optionDiv.style.borderTop="1px solid black";
                } else {
                    optionDiv=Toolbox.makeTextOption(option,configOptions[option]["text"],config[option],configOptions[option]["size"]);
                }
            }
            if (configOptions[option]["type"]=="sep")
            {
                configOL.appendChild(optionDiv);
            } else {
                li=document.createElement("li");
                li.appendChild(optionDiv);
                configOL.appendChild(li);
            }
            
            if (configOptions[option]["indent"]) {
                optionDiv.style.marginLeft="2.4em";
            }
        }
        configPane.style.display="none";
/*        var form=Toolbox.addElement(configPane,"form");
        form.action="http://serv.endoftheinternet.org/dragosien/upload.php";
        form.target="_blank";
        form.method="post";
        var input=Toolbox.addElement(form,"input");
        input.type="hidden";
        input.name="gebaudeInfo";
        input.value=storage.getItem("GS_gebaudeInfo");
        input=Toolbox.addElement(form,"input");
        input.style.margin="0.5em";
        input.type="submit";
        input.name="upload";
        input.value="Gebäudeinformationen Hochladen";
        input.title="Lädt die gesammelten Informationen über Gebäude (Stufe, Produktion, Bedarf, ausbaukosten) nach http://serv.endoftheinternet.org/dragosien hoch";
        var form=Toolbox.addElement(configPane,"form");*/
	var buttonReset=Toolbox.addElement(configPane,"span","Graph zurücksetzen");
        buttonReset.style.margin="0.5em";
        buttonReset.style.border="1px solid black";
        buttonReset.addEventListener("click",function() {
	if (confirm("Wirklich löschen")) {
	   alert("Na gut");
	   persistent.data.samples=null;
	   persistent.updateRemote();
	 }
	},false);
        buttonReset.style.cursor="pointer";

        var button=Toolbox.addElement(configPane,"span","Jetzt nach Update suchen");
        button.style.margin="0.5em";
        button.style.border="1px solid black";
        button.addEventListener("click",function() {this.parentNode.style.display="none";
                Core.checkUpdate();},false);
        button.style.cursor="pointer";
        
        if (versionString) {
            element=Toolbox.addElement(configPane,"div",versionString);
            element.style.fontSize="60%";
            element.style.textAlign="right";
            element.style.paddingTop="2em";
        }
        var button2=Toolbox.addElement(configPane,"span","Test-Export alle daten");
        button2.style.margin="0.5em";
        button2.style.border="1px solid black";
        button2.addEventListener("click",function (){
                exportv={
                    "config":config,
                    "market":market,
                    "gebaude":gebaude,
                    "lager":lager,
                    "gebaudeInfo":gebaudeInfo};
                newWindow=window.open("about:blank","_blank");
                newWindow.document.open();
                newWindow.document.write(JSON.stringify(exportv));
                newWindow.document.close();
            },false);
        
        var button3=Toolbox.addElement(configPane,"input");
        button3.type="submit";
        button3.value="Drachenlogbuch editieren";
        button3.addEventListener("click",function() {
                configPane.style.display='none';
                Drachen.editLogbuch();
        },true);
        
        
        return configPane;
    },

    makePane : function () {
        var newPane;
        var closePane;
        newPane=document.createElement("div");
        newPane.style.position="absolute";
        newPane.style.top="80px";
        newPane.style.left="25px";
        newPane.style.background="#ffffff";
        newPane.style.zIndex="999";
        newPane.style.border="1px solid black";
        newPane.style.overflow="auto";
        newPane.style.display="block";
        //    newPane.style.maxWidth="750px";
        //    newPane.style.maxHeight="650px";
        newPane.style.padding="5px";
        body.insertBefore(newPane,body.firstChild);
        closeButton=Toolbox.addElement(newPane,"div","X");
        closeButton.className="layer_close";
        closeButton.style.marginRight="-5px";
        closeButton.style.marginTop="-5px";
        closeButton.addEventListener("click",function() {this.parentNode.style.display='none';},true);
        return newPane;
    },
    
    makeInfoPane : function () {
        if (infoPane!=null) {
                return;
        }
        
        infoPane=Panes.makePane();
        infoPane.style.top="80px";
        infoPane.style.left="25px";
        //infoPane.style.maxWidth="750px";
        // infoPane.style.maxHeight="650px";
        infoPaneHOS=[];
        var header=Toolbox.addElement(infoPane,"h2","Gebäudeübersicht ");
        var table=Toolbox.addElement(infoPane,"table");
        table.id="infoTable";
        table.className="table";
        var tr=Toolbox.addElement(table,"tr");
        var td;
        var th;
        th=Toolbox.addElement(tr,"th","#");
        th.title="Bauplatz Nummer";
        th=Toolbox.addElement(tr,"th","");
        th=Toolbox.addElement(tr,"th","Typ");
        th=Toolbox.addElement(tr,"th","Stufe");
        th=Toolbox.addElement(tr,"th","produziert");
        th.colSpan=2;
        th=Toolbox.addElement(tr,"th","benötigt");
        th.colSpan=4;
        th=Toolbox.addElement(tr,"th","Produktionswert");
        th.colSpan=4;
        th=Toolbox.addElement(tr,"th","Ausbaukosten");
        th.colSpan=3;
  	th=Toolbox.addElement(tr,"th","Produktionskoeffizient");
        th.colSpan=1;
        infoPaneHOS.push(th);

        var posis=new Array();
        var toDelete=new Array();
        for (position in gebaude) {
            var pos=""+position.match(/\d+/);
            if (pos<10) {pos="0"+pos;};
            if (pos<23) {
                posis.push(pos);
            }   else {
                toDelete.push(position);
            }
        }
        if (toDelete.length>0) {
            for (i=0;i<toDelete.length;i++) {
                delete gebaude[toDelete[i]];
            }
            Toolbox.addRight("Überflüssige Gebäude gefunden und entfernt...");
            storage.setObject("GS_gebaude",gebaude);
        }
        posis.sort();
        for (i=0;i<posis.length;i++) {
            if (posis[i].charAt(0)==='0') {
                posis[i]=posis[i].substr(1);
            }
            position="position="+posis[i];
            tr=Toolbox.addElement(table,"tr");
            if (i%2==1) {
                tr.style.backgroundColor="#ddd";
            }
            tr.position=position;
            td=Toolbox.addElement(tr,"td",posis[i]);
            //        Toolbox.addRight(posis[i]+":::"+position);
            if (gebaude[position]["name"]) {
                var nameSplit=gebaude[position]["name"].match(/^(\S*)\s*Stufe\s*(\d*)/);
                var name = nameSplit[1];
                var stufe = nameSplit[2];
                td=Toolbox.addElement(tr,"td");
                var input=Toolbox.addElement(td,"input");
                input.type="checkbox";
                input.style.display="inline";
                input.name=position;
                input.addEventListener("change",Panes.reCalcInfoPane,true);            
                input.checked=true;
                td=Toolbox.addElement(tr,"td");
                if (name=='Drachenzucht' || name=='Lager' || name=='Kaufmann' || name=='Bauherr' || name=='Arena') {
                    name="("+name+")";
                    input.checked=false;
                }
                if (gebaude[position].upgrade) {
                    name="*"+name;
                }
                var a=Toolbox.addElement(td,"a",name);
                a.className="nav";
                a.href="index.php?t=building&request="+requestId+"&action=show_building&"+position;
                a.style.display="inline";
                if (gebaude[position]["upgrade"] || name=='Drachenzucht' || name=='Lager' || name=='Kaufmann' || name=='Bauherr' || name=='Arena') {                
                    a.style.fontStyle="italic";
                }
                if (Toolbox.isEnabled("DELETE_BUILDING")) {
                    a=Toolbox.addElement(td,"a","[x]");
                    a.className="";
                    a.href="#"+position;
                    a.addEventListener("click",function(event) {
                        var pos=this.href.substr(1+this.href.indexOf("#"));
                        alert(pos+" wird gelöscht.");
                        delete gebaude[pos];
                        storage.setObject("GS_gebaude",gebaude);
                        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
                        event.preventDefault();
                        },true);
                }
                td=Toolbox.addElement(tr,"td",stufe);
                var numStoff=0;
                if (gebaude[position]["prod"]["anzahl"]) {
                    td=Toolbox.addElement(tr,"td",gebaude[position]["prod"]["anzahl"]);
                    td=Toolbox.addElement(tr,"td",Toolbox.prettyStoff(gebaude[position]["prod"]["stoff"]));
                    td.style.fontSize="80%";
                    numStoff=1;
                }
                if (numStoff==0) {
                    Toolbox.addElement(tr,"td","");
                    Toolbox.addElement(tr,"td","");
                }
                var numNeed=0;
                for (stoff in gebaude[position]["need"]){
                    numNeed++;
                    td=Toolbox.addElement(tr,"td",gebaude[position]["need"][stoff]);
                    td=Toolbox.addElement(tr,"td",Toolbox.prettyStoff(stoff));
                    td.style.fontSize="80%";
                }
                while(numNeed<2){
                    Toolbox.addElement(tr,"td"," ");
                    Toolbox.addElement(tr,"td"," ");
                    numNeed++;
                }
                var prodAnalyse=Ausbau.analyseGebaude(gebaude[position]);
                td=Toolbox.addElement(tr,"td",Toolbox.printNum(prodAnalyse["UprodW"]));
                td.title="Erlös beim Verkauf der Produkte am freien Markt";
                td=Toolbox.addElement(tr,"td",Toolbox.printNum(prodAnalyse["UmitEinkauf"]));
                td.title="... mit Einkauf der Rohstoffe";
                td=Toolbox.addElement(tr,"td",Toolbox.printNum(prodAnalyse["UmitEigenProd"]));
                td.title="... anstelle von Verkauf der Rohstoffe (Mehrwert)";
                var effRatio=(prodAnalyse["UmitEigenProd"]?prodAnalyse["UmitEigenProd"]:prodAnalyse["UprodW"])/stufe;
                td=Toolbox.addElement(tr,"td",Toolbox.printNum(effRatio,10));
                td.title="... Mehrwert/Stufe = ~Gebäudeffizienz pro Stufe";
                //            td=Toolbox.addElement(tr,"td",prodAnalyse["prodW"]);
                //td.title="Erlös beim Verkauf der Produkte beim Händler";
                //td=Toolbox.addElement(tr,"td",prodAnalyse["mitEinkauf"]);
                //td.title="... mit Einkauf der Rohstoffe";
                //td=Toolbox.addElement(tr,"td",prodAnalyse["mitEigenProd"]);
                //td.title="... anstelle von Verkauf der Rohstoffe (Mehrwert)";
                //var effRatio=(prodAnalyse["mitEigenProd"]?prodAnalyse["mitEigenProd"]:prodAnalyse["prodW"])/stufe;
                //td=Toolbox.addElement(tr,"td",parseInt(effRatio*10)/10);
                //td.title="... Mehrwert/Stufe = ~Gebäudeffizienz pro Stufe";
                var ausbau="";
                var ausbauTooltip="";
                var ausbau2="";
                var ausbau3="";
		var ausbau4="";
                if (gebaude[position]["ausbau"]) {
                    var goldWert=Toolbox.minMaxGold(gebaude[position]["ausbau"]);
                    if (goldWert) {
                        ausbau=Toolbox.printNum(goldWert["Ubuy"]);
                        ausbauTooltip=" ("+Toolbox.printNum(goldWert["min"])+"..."+Toolbox.printNum(goldWert["max"])+")";
                        if (effRatio) {
                        ausbau2=" ["+(Toolbox.printNum(goldWert["max"]/(24*effRatio),10))+"d] ";
                        }
                        ausbau3=" {"+Toolbox.printNum(goldWert["max"]/indikator,10)+"h}";
			ausbau4="" +Toolbox.printNum(goldWert["max"]/(indikator*(goldWert["max"]/(24*effRatio))),10)+"";
                    	}
                }
                td=Toolbox.addElement(tr,"td",ausbau);
                if (gebaude[position].upgrade) {
                    td.style.fontStyle="italic";
                }
                td.title="Ankauf der fehlenden Rohstoffe. (Gesamtkosten :"+ausbauTooltip+")";
                td=Toolbox.addElement(tr,"td",ausbau2);
                if (gebaude[position].upgrade) {
                    td.style.fontStyle="italic";
                }
                td.title="\u2248 dauer bis sich der Ausbau amortisiert in Tagen";
                td=Toolbox.addElement(tr,"td",ausbau3);
                if (gebaude[position].upgrade) {
                    td.style.fontStyle="italic";
                }
                td.title=" dauer um die Baukosten aus der Gesamtproduktion zusammenzusparen.";
		td=Toolbox.addElement(tr,"td",ausbau4);
                if (gebaude[position].upgrade) {
                    td.style.fontStyle="italic";
                }
                td.title="Bau das aus!";
            } else {
                td=Toolbox.addElement(tr,"td");
                a=Toolbox.addElement(td,"a","Keine Informationen verfügbar");
                a.className="nav";
                a.href="index.php?t=building&request="+requestId+"&action=show_building&"+position;
                td.colSpan=12;
            }
        }
        tr=Toolbox.addElement(table,"tr");
        td=Toolbox.addElement(tr,"td","N");
        td=Toolbox.addElement(tr,"td");
        td=Toolbox.addElement(tr,"td");
        td=Toolbox.addElement(tr,"td");
        td=Toolbox.addElement(tr,"td");
        input=Toolbox.addElement(td,"input");
        input.type="text";
        input.size=3;
        input.id="T_PMenge";
        input.addEventListener("change",function() {
                document.getElementById("T_N1Menge").value=this.value;
                Panes.reCalcInfoPane();},true);            
        td=Toolbox.addElement(tr,"td");
        input=Toolbox.addElement(td,"input");
        input.type="text";
        input.size=6;
        input.id="T_PStoff";
        input.addEventListener("change",Panes.reCalcInfoPane,true);            
        td=Toolbox.addElement(tr,"td");
        input=Toolbox.addElement(td,"input");
        input.type="text";
        input.size=3;
        input.id="T_N1Menge";
        input.addEventListener("change",Panes.reCalcInfoPane,true);            
        td=Toolbox.addElement(tr,"td");
        input=Toolbox.addElement(td,"input");
        input.type="text";
        input.size=6;
        input.id="T_N1Stoff";
        input.addEventListener("change",Panes.reCalcInfoPane,true);            
        td=Toolbox.addElement(tr,"td");
        input=Toolbox.addElement(td,"input");
        input.type="text";
        input.size=3;
        input.id="T_N2Menge";
        input.addEventListener("change",Panes.reCalcInfoPane,true);            
        td=Toolbox.addElement(tr,"td");
        input=Toolbox.addElement(td,"input");
        input.type="text";
        input.size=6;
        input.id="T_N2Stoff";
        input.addEventListener("change",Panes.reCalcInfoPane,true);            
        td=Toolbox.addElement(tr,"td","-");
        td.id="T_P1";
        td=Toolbox.addElement(tr,"td","-");
        td.id="T_P2";
        td=Toolbox.addElement(tr,"td","-");
        td.id="T_P3";
        td=Toolbox.addElement(tr,"td");
        td=Toolbox.addElement(tr,"td");
        td.colSpan=3;
        tr=Toolbox.addElement(table,"tr");
        th=Toolbox.addElement(tr,"th");
        
        th.style.borderTop="2px solid black";
        th.colSpan=10;
        th=Toolbox.addElement(tr,"th","\u2211 Prod");
        th.style.borderTop="2px solid black";
        th.colSpan=8;
        tr=Toolbox.addElement(table,"tr");
        td=Toolbox.addElement(tr,"td");
        td.colSpan=10;
        td=Toolbox.addElement(tr,"td","wird berechnet");
        td.colSpan=8;
        td.id="infoTableProdWert";
        tr=Toolbox.addElement(table,"tr");
        td=Toolbox.addElement(tr,"td");
        td.colSpan=10;
        td=Toolbox.addElement(tr,"td","wird berechnet");
        td.colSpan=8;
        td.id="UinfoTableProdWert";
        header.style.marginBottom="0.4em";
        infoPane.style.display="block";
        Panes.reCalcInfoPane();
        unsafeWindow.rtd=td;
        return infoPane;
    },
    
    reCalcInfoPane : function  () {
        //    Toolbox.addRight("Recalc!");
        var rtd=document.getElementById("infoTableProdWert");
        var Urtd=document.getElementById("UinfoTableProdWert");
        var table=document.getElementById("infoTable");
        rtd.firstChild.data="...";
        Urtd.firstChild.data="...";
        var txt="";
        var vProd={};
        Toolbox.addDebug("Recalc!");
        for (i=0;i<(table.childNodes.length-4);i++) {
            var row=table.childNodes[i];
            //        Toolbox.addDebug(row.firstChild.tagName+"(firstChild)"+
            //                 row.childNodes[1].tagName+"(second)");
            if (row.firstChild.tagName=="TD") {
                position="position="+row.childNodes[0].firstChild.data;
                //  Toolbox.addDebug("tagname:"+row.childNodes[1].childNodes[0].tagName);
                if (row.childNodes[1].childNodes[0].checked) {
                    if (gebaude[position]["prod"] && gebaude[position]["prod"]["stoff"]) {
                        var bisher=parseFloat(vProd[gebaude[position]["prod"]["stoff"]])||0;
                        vProd[gebaude[position]["prod"]["stoff"]]=bisher+parseFloat(gebaude[position]["prod"]["anzahl"]);
                    }
                    if (gebaude[position]["need"]) {
                        for (stoff in gebaude[position]["need"])
                            {
                                var bisher=parseFloat(vProd[stoff])||0;
                                vProd[stoff]=bisher-parseFloat(gebaude[position]["need"][stoff]);
                            }
                    }
                }
            }
        }
        
        var virtuellGebaude={};
        virtuellGebaude["prod"]={};
        virtuellGebaude["need"]={};
        var pStoff=document.getElementById("T_PStoff");
        var pMenge=document.getElementById("T_PMenge");
        var n1Stoff=document.getElementById("T_N1Stoff");
        var n1Menge=document.getElementById("T_N1Menge");
        var n2Stoff=document.getElementById("T_N2Stoff");
        var n2Menge=document.getElementById("T_N2Menge");
        pStoff.style.backgroundColor="#fff";
        n1Stoff.style.backgroundColor="#fff";
        n2Stoff.style.backgroundColor="#fff";
        virtuellGebaude["prod"]["stoff"]=Toolbox.parseStoff(pStoff.value);
        virtuellGebaude["prod"]["anzahl"]=Toolbox.parseNumber(pMenge.value);
        if (market[virtuellGebaude["prod"]["stoff"]]) {
            var bisher=parseFloat(vProd[virtuellGebaude["prod"]["stoff"]])||0;
            vProd[virtuellGebaude["prod"]["stoff"]]=bisher+virtuellGebaude["prod"]["anzahl"];
        } else {
            if (virtuellGebaude["prod"]["stoff"]) {
                pStoff.style.backgroundColor="#f00";
            }
        }
        if (n1Stoff.value && n1Menge.value) {
            if (market[Toolbox.parseStoff(n1Stoff.value)]) {
                virtuellGebaude["need"][Toolbox.parseStoff(n1Stoff.value)]=Toolbox.parseNumber(n1Menge.value);
                var bisher=parseFloat(vProd[Toolbox.parseStoff(n1Stoff.value)])||0;
                vProd[Toolbox.parseStoff(n1Stoff.value)]=bisher-Toolbox.parseNumber(n1Menge.value);
            } else {
                n1Stoff.style.backgroundColor="#f00";
            }
        }
        if (n2Stoff.value && n2Menge.value) {
            if (market[Toolbox.parseStoff(n2Stoff.value)]) {
                virtuellGebaude["need"][Toolbox.parseStoff(n2Stoff.value)]=Toolbox.parseNumber(n2Menge.value);
                var bisher=parseFloat(vProd[Toolbox.parseStoff(n2Stoff.value)])||0;
                vProd[Toolbox.parseStoff(n2Stoff.value)]=bisher-Toolbox.parseNumber(n2Menge.value);
            } else {
                n2Stoff.style.backgroundColor="#f00";
            }
                
        }
        var result=Ausbau.analyseGebaude(virtuellGebaude);
        unsafeWindow.virtuellGebaude=virtuellGebaude;
        var w=result["UprodW"]||"";
        document.getElementById("T_P1").firstChild.data=Toolbox.printNum(w);
        w=result["UmitEinkauf"]||"";
        document.getElementById("T_P2").firstChild.data=Toolbox.printNum(w);
        w=result["UmitEigenProd"]||"";
        document.getElementById("T_P3").firstChild.data=Toolbox.printNum(w);
        
        var mySum=0;
        var mySum2=0;
        var UmySum=0;
        var UmySum2=0;
        for (stoff in vProd) {
            //Toolbox.addRight(stoff+" :: "+vProd[stoff]);
            var price=1;
            var price2=1;
            var Uprice=1;
            var Uprice2=1;
            var would="buy";
            var would2="sell";
            if (vProd[stoff]>0)
                {
                    would="sell";
                    would2="buy";
                };
            if (stoff!="gold" && market[stoff]) {
                price=market[stoff][would];
                price2=market[stoff][would2];
                if (market[stoff]["U"+would]) {
                    Uprice=market[stoff]["U"+would];
                    Uprice2=market[stoff]["U"+would2];
                }
            }
            //        Toolbox.addRight("would -"+price);
            mySum+=vProd[stoff]*price;
            mySum2+=vProd[stoff]*price2;
            UmySum+=vProd[stoff]*Uprice;
            UmySum2+=vProd[stoff]*Uprice2;
        }
        rtd.firstChild.data=Toolbox.printNum(mySum)+" ("+Toolbox.printNum(mySum2)+")";
        rtd.title="Überschuß Gold/h. Wert in Klammern beim optimalen Verkauf/Einkauf (EK zu Händler VK Preise, VK zu Händler EK Preise";
        Urtd.firstChild.data=(Toolbox.printNum(UmySum,100))+" ("+(Toolbox.printNum(UmySum2,100))+")";
        Urtd.title="Überschuß Gold/h am freien Markt. Wert in Klammern bei optimalem Verkauf/Einkauf am Markt";
    }
 
}

Toolbox = { 
    //Toolbox.lzw_encode
    lzw_encode : function  (s) {
        var dict = {};
        var data = (s + "").split("");
        var out = [];
        var currChar;
        var phrase = data[0];
        var code = 256;
        for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
        }
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
        for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
        }
        return out.join("");
    },
    
    lzw_decode : function  (s) {
        var dict = {};
        var data = (s + "").split("");
        var currChar = data[0];
        var oldPhrase = currChar;
        var out = [currChar];
        var code = 256;
        var phrase;
        for (var i=1; i<data.length; i++) {
            var currCode = data[i].charCodeAt(0);
            if (currCode < 256) {
                phrase = data[i];
            }
            else {
               phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
            }
            out.push(phrase);
            currChar = phrase.charAt(0);
            dict[code] = oldPhrase + currChar;
            code++;
            oldPhrase = phrase;
        }
        return out.join("");
    },
    
    // print out simple formated date
    simpleDate : function  (date) {
        //   if (date==undefined) {
        //   return "unbekannt";
        // }
        var minutes=date.getMinutes();
        if (minutes<10) {
            minutes="0"+minutes;
        }
        return date.getDate()+"."+(1+date.getMonth())+". "+date.getHours()+":"+minutes+" Uhr";
    },
       
    parseDate : function  (datetxt) {
        var temp=new Date();
        var Tag=datetxt.match(/(\d+)\.(\d+)\.(\d+)/);
        var Uhrzeit=datetxt.match(/(\d\d):(\d\d)(:(\d\d))?/);
        
        if (Tag) {
            temp.setDate(Tag[1]);
            temp.setMonth(Tag[2]-1);
            temp.setYear(Tag[3]);
        }
        
        temp.setHours(Uhrzeit[1]);
        temp.setMinutes(Uhrzeit[2]);
        
        if (Uhrzeit[4]) {
            temp.setSeconds(Uhrzeit[4]);
        }
        
        return temp.getTime();
    },
    
    // dauerhaften Variablen laden    
    loadAll : function  (realAll) {
        //HACK!! global evil
        produktion=storage.getObject("GS_produktion");
        lager=storage.getObject("GS_lager");
        gebaude=storage.getObject("GS_gebaude");
        market=storage.getObject("GS_market");
        transactions=storage.getObject("GS_transactions");
        //persistent=storage.getObject("GS_persistent");

        persistent=new PersistentStorage();
        persistent.init(basehref);
        // keep backward compatible, try to load from old info blob
        if (persistent==null || persistent.data.drachen==null) {
            persistent.data.drachen=storage.getObject("GS_drachen");
        }
        
        if (persistent.data.update==null) {        
            var newUpdate=0;
            for (key in persistent.data.drachen) {
	       drache=persistent.data.drachen[key];
                for (key2 in drache.phasen) {
		    phase=drache.phasen[key2];
                    if (phase.update>newUpdate) {
                        newUpdate=phase.update;
                    }
                }
            }        
            persistent.data.update=newUpdate;
        }
        
        if (realAll==true) {
            gebaudeInfo=storage.getObject("GS_gebaudeInfo");
        }
        
        config=storage.getObject("GS_config");
    },
    
    hash : function  (str) {
        var result=1;
        var i=0;
        
        for (i=0;i<str.length;i++) {
            result=(result*7+str.charCodeAt(i))%9999;
        }
        
        return result;
    },
    
    addIcon : function  (iconToAdd) {
        var container=document.getElementById("container");
        container.insertBefore(iconToAdd,container.firstChild);
    },
    
    addRight : function  (text,tooltip) {
        var newNode=Toolbox.addElement(box,"p",text);
        if (tooltip) {  
        newNode.title=tooltip;
        }
        
        return newNode;
    },

    addElement : function  (node,tag,text) {
        var newNode=document.createElement(tag);
        if (text) {
            newNode.appendChild(document.createTextNode(text));
        }
        node.appendChild(newNode);
        
        return newNode;
    },  
    
    getByXPath : function  (xpath,node) {
        if (node==undefined) {
            node=document;
        }
        
        unsafeWindow.xpath=xpath+":";
        try {
            var result=document.evaluate(xpath,node,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
            unsafeWindow.xpathResult=result;
            return result;
        } catch (e) {
            unsafeWindow.xpatherror="EEEKS:"+e;
            if (box) {
                Toolbox.addDebug(e);
            }
        }
    },
    
    addDebug : function  (text) {
        try {
            if (config["debug"] ) {
                Toolbox.addRight(text);
            }
        } catch (e) {
            Toolbox.addRight("[!]"+text);
        }
    },
    
    isEnabled : function  (option) {
        return (config[option]==true);
    },
    
    addProduktion : function  (stoff,menge) {
        stoff=stoff.toLowerCase();
        var bisher=0;
        bisher=parseFloat(produktion[stoff]||0);
        produktion[stoff]=bisher+(1*menge);
    },
    
    sortSelect : function  (selElem,sorter) {
        var oldValue= selElem.options[selElem.selectedIndex].value;
        var tmpAry = new Array();
        for (var i=0;i<selElem.options.length;i++) {
            tmpAry[i] = new Array();
            tmpAry[i][0] = selElem.options[i].text;
            tmpAry[i][1] = selElem.options[i].value;
	    tmpAry[i][2] = selElem.options[i];
        }
        
        tmpAry.sort(sorter);
        while (selElem.options.length > 0) {
            selElem.options[0] = null;
        }
        
        for (var i=0;i<tmpAry.length;i++) {
            var op = new Option(tmpAry[i][0],tmpAry[i][1]); //tmpAry[i][2];
	    if (tmpAry[i][2].className) {
	       op.className=tmpAry[i][2].className;
	    }
            selElem.options[i] = op;
            if (tmpAry[i][1]==oldValue) {
              selElem.selectedIndex=i;
            }
        }
        
        return;
    },
    
    injectElement : function  (parentNode,newElement) { 
        var ii;
        while (parentNode.childNodes.length>0) {
            var child=parentNode.firstChild;
            parentNode.removeChild(child);
            newElement.appendChild(child);
        }
        parentNode.appendChild(newElement);
    },

    printNum : function  (num,significants) {
        profileStart('Toolbox.printNum');
        if (significants==null) {
            significants=1;
        }
        var txt=""+parseInt(num*significants)/significants;
        if (txt=="NaN") {
            return num;
        }
        var newtxt=txt;
        if (Toolbox.isEnabled("TAUSENDER_TRENN")) {
            newtxt=txt.replace(/(\d)(\d\d\d)([.\']|$)/g,"$1'$2$3");
            while (newtxt!=txt) {
                txt=newtxt;
                newtxt=txt.replace(/(\d)(\d\d\d)([.\']|$)/g,"$1'$2$3");
            }
        }
        //    newtxt=newtxt.replace(/'/,"\u202f");
        newtxt=newtxt.replace(/\./,",");
        newtxt=newtxt.replace(/''?/g,".");
        profileEnd('Toolbox.printNum');
        return newtxt;
    },

    dauer : function  (date,jetzt) {
         if (jetzt==null) {
             jetzt=new Date();
        }
        var dauer=date.getTime()-jetzt.getTime();
        if (dauer<0)
            return "";
        //    dauer/=60000; // minuten
        dauer = parseInt(dauer/60000);
        var tage=parseInt(dauer/(60*24));
        var stunden=parseInt(dauer/60)%24;
        var minuten=dauer%60;
        if (minuten<10) {
            minuten="0"+minuten;
        }
        if (tage) {
            if (tage==1) {
                tage=tage+" Tag ";
            } else  {
                tage=tage+" Tage ";
            }
        } else {
            tage="";
        }
        return tage+stunden+"Std "+minuten+"Min";
    },

    parseNumber : function  (txt) {
        return parseFloat(txt.replace(/\./g,"").replace(/,/,"."));
    },
    
    parseStoff : function  (txt) {
        if (txt) {
                txt=txt.toLowerCase();
                txt=txt.replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue");
                txt=txt.replace(/sattel/i,"saettel");
                txt=txt.replace(/zaubertrank/i,"zauberwasser");
		txt=txt.replace(/elixiere?/i,"zauberwasser");
		txt=txt.replace(/spruchrollen/i,"folianten");
            }
        return txt;
    },
    
    nameSplit : function  (text) {
        return text.match(/^\s*(\S*)\s*Stufe\D*(\d*)/m);
    },
    
    prettyStoff : function (txt) {
        txt = txt.replace(/ae/g,"ä").replace(/oe/g,"ö").replace(/ue/g,"ü").replace(/zauberwasser/,"zaubertrank");
	if (speed) {
	   txt=txt.replace(/folianten/,"spruchrollen").replace(/zaubertrank/,"elixiere");
	}
        return txt.substr(0,1).toUpperCase()+txt.substr(1);
    },
    
    minMaxGold : function (resourcen) {
        var result={"min":0,"max":0,"buy":0,"Ubuy":0};
        var needHere=0;
        for (stoff in resourcen) {
            if (market[stoff]) {
                needHere=0;
                if (lager[stoff]<resourcen[stoff]) {
                    needHere=resourcen[stoff]-lager[stoff];
                }
                result["min"]+=parseInt(market[stoff]["sell"]*resourcen[stoff]);
                result["max"]+=parseInt(market[stoff]["buy"]*resourcen[stoff]);
                result["buy"]+=parseInt(market[stoff]["buy"]*needHere);
                result["Ubuy"]+=parseInt(market[stoff]["Ubuy"]*needHere);
            }
        }
        return result;
    },
    
    parseResources : function (stufe,text) {
        var needStufe=-1;
        resource=text.split(";");
        var result=new Object();
        for (ri=0;ri<resource.length;ri++) {
            Toolbox.addDebug(resource[ri]);
            var aResource=resource[ri].match(/([0-9.]+) (.+)/);
            Toolbox.addDebug(aResource);
            if (aResource) {
                var stoff=Toolbox.parseStoff(aResource[2]);
                result[stoff]=Toolbox.parseNumber(aResource[1]);
                if (market[stoff]) {
                    result["_g"+stoff]=aResource[1]*(market[stoff]["sell"]+market[stoff]["buy"])/2;
                } else {
                    if (stoff!="stufe" && stoff!="s") {
                        Toolbox.addRight("Preis für "+Toolbox.prettyStoff(stoff)+" fehlt");
                    }
                }
                Toolbox.addDebug((aResource[2]?aResource[2]:0)+"... :"+aResource[3]+" * "+aResource[4]+" ="+result["_g"+stoff]);
                
            }
        }   
        return result;
    },
   
    clearChildren : function  (theElement) {
        while (theElement.firstChild!=null) {
            theElement.removeChild(theElement.firstChild);
        }
    },
    
    mergeRohstoffe : function  (rohstoffe1,rohstoffeAdd) {
        for (stoff in rohstoffeAdd) {
            if (stoff!='active'){
            if (rohstoffe1[stoff]) {
                rohstoffe1[stoff]=parseInt(rohstoffe1[stoff])+parseInt(rohstoffeAdd[stoff]);
            } else {
                rohstoffe1[stoff]=rohstoffeAdd[stoff];
            }
            }
        }
        return rohstoffe1;
    },
    
    provideGuildArenaExport : function  () {
        var mannschaftDiv=document.getElementById("mannschaft");
        var i=0;
        var current=[];
        var name=null;
        var lastDiv=null;
        var allDivs=[];
		var longDrachenText="";
        
        for (i=0;i<mannschaftDiv.childNodes.length;i++) {
            var child=mannschaftDiv.childNodes[i];
            if (child.textContent.indexOf("Erwachsene Drachen")!=-1) {
                var span=Toolbox.addElement(child.childNodes[1],"span","(EXPORT)");
                span.style.textDecoration="underline";
                span.addEventListener("click",function() {
                    alert("Drachenwerte werden in neuem Tab exportiert");
                    newWindow=window.open("about:blank","_blank");
                    newWindow.document.open();
                    newWindow.document.write(longDrachenText);
                    newWindow.document.close();
                },true);
            }
            if (i>3 && child.tagName=='DIV') {
                lastDiv=child;
                allDivs.push(child);
                var text=child.textContent;
                if (name==null) {
                    // * name 
                    text='"'+text+'"';
                    name=text;
                } else {
                    if (current.length<5) {
                        current.push(parseInt(text));
                    }
                }
                longDrachenText=longDrachenText+text+";";
            }
            if (child.tagName=='BR') {
                child.clear='both';
                if (current.length==5) {
                    GildenDrachen.push({'allDivs':allDivs,'name':name,'values':current,'break':child,'lastDiv':lastDiv});
                    current=[];
                    allDivs=[];
                    name=null;
                    if (Toolbox.isEnabled("EXPORT_LB")) {
                        longDrachenText=longDrachenText+"<br/>";
                    }
                }
            }
        }
		if (Toolbox.isEnabled("ARENA_CALCDRAGBALL")) {
		   	document.getElementById('aufstellung').style.marginBottom='50px';
			var sortedContainer=document.createElement("div");
			sortedContainer.id="sorted_drachen";
			if (GildenDrachen.length>0) {
				GildenDrachen[0].allDivs[0].parentNode.insertBefore(sortedContainer,GildenDrachen[0].allDivs[0]);
			}
			for (i=0;i<GildenDrachen.length;i++) {
				var cdrache=GildenDrachen[i];
				var tsort=[];
				var position="";
				var kurz="";
				var sum=(cdrache.values[0]+cdrache.values[1]+cdrache.values[2]+cdrache.values[3]+cdrache.values[4]);
				var anaussen=Dragball.calcValue(cdrache.values,1,2)-sum/3;
				var anmitte=Dragball.calcValue(cdrache.values,0,2)-sum/3;
				var miaussen=Dragball.calcValue(cdrache.values,1,4)-sum/3;
				var vemitte=Dragball.calcValue(cdrache.values,0,3)-sum/3;
				var veaussen=Dragball.calcValue(cdrache.values,3,4)-sum/3;
				var torwart=Dragball.calcValue(cdrache.values,1,3)-sum/3;
				var werte=[anaussen,anmitte,miaussen,vemitte,veaussen,torwart];
				var positionen=["Angriff aussen","Angriff mitte","Mitte aussen","Verteidigung mitte","Verteidigung aussen","Torwart"];
				var pk=["AA","AM","MA","VM","VA","T "];
				min=99999;
				max=-99999;
				var iw;
				var title="";
				var titlefrom=[];
				for (iw=0;iw<werte.length;iw++) {
					titlefrom.push({'kurz':pk[iw],'wert':werte[iw]});
					if (min>werte[iw]) {
						min=werte[iw];
					}
					if (max<werte[iw]) {
						max=werte[iw];
						position=positionen[iw];
						kurz=pk[iw];
					}
				}
				cdrache.werte=werte;
				cdrache.max_kurz=kurz;
				cdrache.max_wert=max;
				
				titlefrom.sort(function (a,b) {return -a.wert+b.wert});
				for (iw=0;iw<titlefrom.length;iw++) {
					title += titlefrom[iw].kurz+": "+Toolbox.printNum(titlefrom[iw].wert)+" ";
				}
				
				var rowdiv=document.createElement("div");			
				var div = document.createElement("div");
				var subspan = Toolbox.addElement(div,"span",kurz+":");
				subspan.style.width="2.1em";
				subspan.style.cssFloat="left";
				subspan.style.display="block";
				div.appendChild(document.createTextNode(Toolbox.printNum(max)));
				div.style.width="5.5em";
				div.style.marginLeft="-5.5em";
				div.style.cssFloat="left";
				div.title=title;
				
				cdrache.allDivs[0].parentNode.insertBefore(rowdiv,cdrache.allDivs[0]);
				for (key in cdrache.allDivs) {
				     xdiv=cdrache.allDivs[key];
						xdiv.title=title;
						rowdiv.appendChild(xdiv);
					}
				rowdiv.appendChild(cdrache["break"]);
				cdrache.row=rowdiv;
					
				if (Toolbox.isEnabled("ARENA_ADDDRAGBALL")) {
					cdrache.allDivs[0].appendChild(div);
				}
			}
			if (Toolbox.isEnabled("ARENA_SORTDRAGBALL")) {
				Toolbox.sortGildenDrachen();
			}	
		}
	Toolbox.addDebug(" "+GildenDrachen.length+" Drachen gefunden");

    },
	sortGildenDrachen: function() {
		GildenDrachen.sort(function (b,a){
			return a.max_wert-b.max_wert;
		});
		var sortedDiv=document.getElementById("sorted_drachen");
		var i;
		Toolbox.clearChildren(sortedDiv);
		for (i=0;i<GildenDrachen.length;i++) {
			sortedDiv.appendChild(GildenDrachen[i].row);
		}
	},
        
    countStoff : function  (list,rohstoff,id) {
        var result=0;
        var i;
        for (i=0;i<list.length;i++) {
            if (list[i].stoff==rohstoff) {
                if ((null==id) || id==list[i].id) {
                    result++
                }
            }
        }
        return result;
    },
    
    getStoffById : function  (list,id) {
        var i;
        for (i=0;i<list.length;i++) {
            if (list[i].id==id) {
                return list[i];
            }
        }
        return null;
    },
    
    //but KEEP specified id
    removeStoff : function  (list,rohstoff,id) {
        var result=[];
        var i;
        for (i=0;i<list.length;i++) {
            // append it also, when it is the given id AND id is set.
            // when id is false/null, only rohstoff applies
            if (list[i].stoff!=rohstoff || (id!=null && id==list[i].id)) {
                result.push(list[i]);
            } else {
                Toolbox.addRight("Deleting ["+list[i].id+"] it is not ["+id+"]");
            }
            
        }
        return result;
    },
    
    parsePhase : function (descriptionText) {
        if (descriptionText.indexOf('ein Drachenei')!=-1) {
            return DP_EI;
        } else if (descriptionText.indexOf('Drachenbaby')!=-1) {
            return DP_BABY;
        } else if (descriptionText.indexOf('Drachenkind')!=-1) {
            return DP_KIND;
        } else if (descriptionText.indexOf('jugendlicher Drache')!=-1) {
            return DP_TEEN;
        } else if (descriptionText.indexOf('junger, erwachsener')!=-1) {
            return DP_TWEN;
        } else if (descriptionText.indexOf('Da regt sich etwas!')!=-1) {
            return DP_READY;
        } else {
            return DP_ERWACHSEN;
        }
    },
    
    appendCSSRule : function (csstext) { // Adds a CSS rule
       document.styleSheets[0].insertRule(csstext,document.styleSheets[0].cssRules.length-1);
    },
    
    parseDuration : function  (txt) {
        var tokens=txt.split(/\s+/);
        var result=0;
        var i;
        if (txt=="-") {
            return Number.MAX_VALUE; //+ Infinity
        }
        for (i=0;i<tokens.length;i++) {
            var parsedToken=tokens[i].match(/(\d+)(\S)/);
            Toolbox.addDebug(tokens[i]+"::"+parsedToken);
            if (parsedToken) {
                var unit=1;
                if (parsedToken[2]=="h") {
                    unit=60;
                } else if (parsedToken[2]=="T") {
                    unit=60*24;
                } else if (parsedToken[2]=="W") {
                    unit=7*60*24;
                }
                result+=parseInt(parsedToken[1])*unit;
            }
        }
        Toolbox.addDebug(result);
        return result;
    },
    
    workZustandTable: function(resort) {
	allZustandRows=[];
        if (allZustandRows.length==0) {
            for (i=0;i<storeTable.rows.length;i++) {
                if (storeTable.rows[i].cells.length==2) {
                    var row=storeTable.rows[i];
                    var geb=row.cells[0].textContent;
                    var zustand=Toolbox.parseNumber(row.cells[1].textContent);
                    //            Toolbox.addElement(row.cells[0],"span",i);
                    if (row.cells[0].firstChild.href!=null && activeGebaudePosition 
			    && row.cells[0].firstChild.href.indexOf(activeGebaudePosition)!=-1 ) {
                        var found_at=row.cells[0].firstChild.href.indexOf(activeGebaudePosition);
                        var found_next=row.cells[0].firstChild.href[found_at+activeGebaudePosition.length];
                        unsafeWindow.xxX=activeGebaudePosition;
                        if (!((found_next>='0')&&(found_next<='9'))) {
                            row.cells[0].style.backgroundColor="#e8e2dc";
                            row.cells[1].style.backgroundColor="#e8e2dc";
                        }
                    }
                    if (config["ZUSTAND_MARK"]) {
                        if (zustand<76) {
                            row.cells[0].firstChild.style.color='#666'
                            row.cells[1].style.color='#666';
                        } 
			if (zustand<15) {
			    row.cells[0].firstChild.style.color='red';
                            row.cells[1].style.color='red';
			}
                    }
                    allZustandRows.push({"row":row,"geb":geb,"zustand":zustand,"pos":i});
                }
            }
        }
        if (config["ZUSTAND_SORT"]) {
            for (i in allZustandRows) {
                storeTable.childNodes[1].removeChild(allZustandRows[i]["row"]);
            }
            var sorter;
	    sorter=function(a,b) {
		   if (a.zustand>b.zustand)
                        {
                            return  1;
                        }
                    if (a.zustand<b.zustand) {
                        return -1;
                }
                    return 0;
                };
	    allZustandRows.sort(sorter);
            for (i in allZustandRows) {
                storeTable.childNodes[1].appendChild(allZustandRows[i].row);
            }
        }
    },
    workNachschubTable : function  (resort) {   
        if (allNachschubRows.length==0) {
            for (i=0;i<storeTable.rows.length;i++) {
                if (storeTable.rows[i].cells.length==2) {
                    var row=storeTable.rows[i];
                    var geb=row.cells[0].textContent;
                    var duration=Toolbox.parseDuration(row.cells[1].textContent);
                    //            Toolbox.addElement(row.cells[0],"span",i);
                    if (row.cells[0].firstChild.href!=null &&
                        activeGebaudePosition && 
                        row.cells[0].firstChild.href.indexOf(activeGebaudePosition)!=-1 ) {
                        var found_at=row.cells[0].firstChild.href.indexOf(activeGebaudePosition);
                        var found_next=row.cells[0].firstChild.href[found_at+activeGebaudePosition.length];
                        unsafeWindow.xxX=activeGebaudePosition;
                        if (!((found_next>='0')&&(found_next<='9'))) {
                            row.cells[0].style.backgroundColor="#e8e2dc";
                            row.cells[1].style.backgroundColor="#e8e2dc";
                        }
                    }
                    if (config["NACHSCHUB_MARK"]) {
                        if (duration<Toolbox.parseDuration(config["NACHSCHUB_MARK"])) {
                            row.cells[0].firstChild.style.color=config.COLOR_NACHSCHUB_MARK;
                            row.cells[1].style.color=config.COLOR_NACHSCHUB_MARK;
                        }
                    }
                    allNachschubRows.push({"row":row,"geb":geb,"duration":duration,"pos":i});
                }
            }
        }
        if (resort||config["NACHSCHUB_SORT"]) {
            for (i in allNachschubRows) {
                storeTable.childNodes[1].removeChild(allNachschubRows[i]["row"]);
            }
            var sorter;
            if (config["NACHSCHUB_SORT_NAME"]==true) {
                sorter=function(a,b) {
                    if (a.geb>b.geb)
                        {
                            return  1;
                        }
                    if (a.geb<b.geb) {
                        return -1;
                    }
                    return 0;
                };
            } else {
                sorter=function(a,b) {
                    if (a.duration>b.duration)
                        {
                            return  1;
                        }
                    if (a.duration<b.duration) {
                        return -1;
                }
                    return 0;
                };
            }
            if (config["NACHSCHUB_SORT"]==false) {
                sorter=function(a,b) {
                    return a.pos-b.pos;
                }
            }
            allNachschubRows.sort(sorter);
            for (i in allNachschubRows) {
                storeTable.childNodes[1].appendChild(allNachschubRows[i].row);
            }
        }
    },
    
    reorder : function  () {
        try {
            var size=document.styleSheets[0].cssRules.length;
            var i;
            // first, grab positions!
            // div.pos1, a.pos1 { top: left: }
            for (i=0;i<size;i++) {
                var selector=document.styleSheets[0].cssRules[i].selectorText.match(/div\.(pos\d*)/);
                if (selector && selector[1]!="pos21" && selector[1]!="pos22" && document.styleSheets[0].cssRules[i].cssText.match(/left/)) {
                    Toolbox.addDebug(selector[1]+"="+document.styleSheets[0].cssRules[i].cssText);
                    buildingpositions[selector[1]]={"position":document.styleSheets[0].cssRules[i].style.cssText};
                    document.styleSheets[0].cssRules[i].style.cssText="";
                }
            }
            //next, grab z-index
            for (i=0;i<size;i++) {        
                if (document.styleSheets[0].cssRules[i].selectorText.match(/div\.pos/) &&
                    document.styleSheets[0].cssRules[i].cssText.match(/z-index/)) {                
                    var allApply=document.styleSheets[0].cssRules[i].selectorText.split(/,/);
                    var i2=0;
                    var text=document.styleSheets[0].cssRules[i].style.cssText;
                    for (i2=0;i2<allApply.length;i2++) {
                        var pos=allApply[i2].match(/pos\d*/);
                        Toolbox.addDebug("'"+pos+"' "+document.styleSheets[0].cssRules[i].cssText);
                        if (pos) {
                            if ((!(pos[0].match(/pos21/)||pos[0].match(/pos22/))) && buildingpositions[pos[0]]) {
                                buildingpositions[pos]["index"]=text;
                                document.styleSheets[0].cssRules[i].style.cssText="";
                            }
                        }
                    }
                }
                if (document.styleSheets[0].cssRules[i].selectorText.match(/div\.status\.pos/) &&
                    document.styleSheets[0].cssRules[i].cssText.match(/z-index/)) {
                
                    var allApply=document.styleSheets[0].cssRules[i].selectorText.split(/,/);
                    var i2=0;
                    var text=document.styleSheets[0].cssRules[i].style.cssText;
                    for (i2=0;i2<allApply.length;i2++) {
                        var pos=allApply[i2].match(/pos\d*/);
                        Toolbox.addDebug("status'"+pos+"' "+document.styleSheets[0].cssRules[i].cssText);
                        if (pos) {
                            if ((!(pos[0].match(/pos21/)||pos[0].match(/pos22/))) && buildingpositions[pos[0]]) {
                                buildingpositions[pos]["statusindex"]=text;
                                document.styleSheets[0].cssRules[i].style.cssText="";
                            }
                        }
                    }
                }
            }
            var newPositions=newOrder.split(/,/);
            if (newPositions.length!=20) {
                Toolbox.addRight("FEHLER - Zum Neuordnen bitte genau 20 Gebäudepositionen angeben !!");
            } else {
                for (i=0;i<20;i++) {
                {
                    Toolbox.addDebug((i+1)+" => "+newPositions[i]);
                    document.styleSheets[0].insertRule("div.pos"+(1+i)+", a.pos"+(1+i)+" {"+buildingpositions["pos"+newPositions[i]]["position"]+" !important}",document.styleSheets[0].cssRules.length-1);
                    document.styleSheets[0].insertRule("div.pos"+(1+i)+" {"+buildingpositions["pos"+newPositions[i]]["index"]+" !important}",document.styleSheets[0].cssRules.length-1);
                    document.styleSheets[0].insertRule("div.status.pos"+(1+i)+" { z-index:50"/*+buildingpositions["pos"+newPositions[i]]["statusindex"]*/+" !important}",document.styleSheets[0].cssRules.length-1);
                }
            }
            // Arena wird sonst von Gebäuden überlappt.
            document.styleSheets[0].insertRule("div.pos22 {z-index: 15 !important}",document.styleSheets[0].cssRules.length-1);
            }
        }catch (e) { 
            Toolbox.addRight("FEHLER :"+e);
        }
        unsafeWindow.pos=buildingpositions;
    },
    
    workGebaudeTable : function  () {
        var above=[];
        var below=[];
        for (i=0;i<storeTable.rows.length;i++) {
            if (storeTable.rows[i].cells.length>1) {
                var stufe=parseInt(storeTable.rows[i].cells[1].textContent.match(/\d\d? /));
                storeTable.rows[i].cells[1].textContent=storeTable.rows[i].cells[1].textContent.replace(/(\d\d?) \([^0][^)]*\)/,"$1");
                if (storeTable.rows[i].cells[1].textContent.match(/\(0\)/)) {
                   storeTable.rows[i].cells[1].textContent=storeTable.rows[i].cells[1].textContent.replace(/(\d\d?) \(0\)/,"$1");
                    below.push({"row":storeTable.rows[i],"stufe":stufe});
                } else {
                    above.push({"row":storeTable.rows[i],"stufe":stufe});
                }
            }
        }
        function sorter(a,b) {
            return a.stufe-b.stufe;
        }
        above.sort(sorter);
        below.sort(sorter);
            
        for (i=0;i<above.length;i++) {
            storeTable.tBodies[0].removeChild(above[i].row);
            storeTable.tBodies[0].appendChild(above[i].row);
        }
        var tr=Toolbox.addElement(storeTable.tBodies[0],"tr");
        var td=Toolbox.addElement(tr,"td");
        Toolbox.addElement(td,"b","Abgerissene Gebäude:");
        td.colSpan=2;
        for (i=0;i<below.length;i++) {
            storeTable.tBodies[0].removeChild(below[i].row);
            storeTable.tBodies[0].appendChild(below[i].row);
        }

    },
    
    workProdTable : function () {
        //Will nix hardcoded. Anzahl Reihen erfahren? Wie?
        var num = storeTable.rows.length-1;
        for(var i=num;i>=1;i--) {
            //Nix vorhanden, kann also ignoriert werden
            if (storeTable.rows[i].cells[1].textContent.indexOf("0/0")==0 && Toolbox.isEnabled("COMPACT_STORETABLE")){
                storeTable.deleteRow(i);
            }
            else {
                var vg = storeTable.rows[i].cells[1].textContent.split("/");
		 if(-Toolbox.parseNumber(vg[1])>Toolbox.parseNumber(vg[0])) {
                    storeTable.rows[i].cells[1].style.color="red";
                } else if (-Toolbox.parseNumber(vg[1])<Toolbox.parseNumber(vg[0])) {
                    storeTable.rows[i].cells[1].style.color="green";
                }
                
            }
        }//For
    },
    
    showExceeds : function () {
        var current=0;
        var below=Toolbox.parseDuration(config["WARN_EXCEED"])/60;
        for (stoff in produktion) {
            if (lager[stoff]!=null && stoff!="gold"  && stoffRows[stoff]) {
                current=lager[stoff];
                var toFill=lager.capacity-current;
                var duration=toFill/produktion[stoff];
                if (duration<below) {
                    var ts=currentTime+1000*60*60*duration;
                    duration=Toolbox.dauer(new Date(ts));
                    var span=document.createElement("span");
                    span.appendChild(document.createTextNode("\u26a0"));
                    span.style.color="red";
                    //                span.style.backgroundColor="#f8f2ec";
                    span.style.fontSize="133%";
                    span.style.marginLeft="-0.75em";
                    span.title="\u26a0ACHTUNG\u26a0 Lager für "+Toolbox.prettyStoff(stoff)+" wird in "+duration+" überlaufen";
                    //                Toolbox.addRight("**"+unsafeWindow.tooltipp);
                    stoffRows[stoff].cells[0].insertBefore(span,stoffRows[stoff].cells[0].firstChild);
                    stoffRows[stoff].cells[0].childNodes[1].style.color="red";
                    //stoffRows[stoff].cells[0].childNodes[1].title=span.title;
                }
                                   
                //Toolbox.addRight(stoff+": "+duration);
            }
        }
    },
    
    
    showShortage : function () {
        var shortagePos="";
        var shortageStoff="";
        var shortageTime;
        for (position in gebaude) {
            if (gebaude[position]["lager"]) {
                for (stoff in gebaude[position]["lager"]) {
                    if (shortageTime==undefined || (gebaude[position]["lager"][stoff]["reichtBis"] <shortageTime)) {
                        shortagePos=position;
                        shortageStoff=stoff;
                        shortageTime=gebaude[position]["lager"][stoff]["reichtBis"];
                    }
                }
            }
        }
        var currentTime=new Date().getTime();
        if (shortageTime && ((shortageTime-currentTime)<(18*3600*1000))) {
            line=Toolbox.addElement(box,"div");
            element=Toolbox.addElement(line,"a",gebaude[shortagePos]["name"]+" nur noch bis "+Toolbox.simpleDate(new Date(shortageTime))+" versorgt");
            element.href="index.php?t=building&request="+requestId+"&action=show_building&"+shortagePos;
            if ((shortageTime-currentTime)<(parseInt(config["SHORTAGE_RED"])*60*1000)) {
                element.style.color='#ff0000';
            } else {
                element.style.color='#000';
            }
            element.className="link";
        }
    },
    
    makeGraph : function  () {
        if (graphPane) {
            graphPane.style.display="block";
            return;
        }
        graphPane=Panes.makePane();
        graphPane.style.width="770px";
        graphPane.style.height="520px";
        graph=Toolbox.addElement(graphPane,"div");
        graph.id="graph";
        graph.style.width="750px";
        graph.style.height="500px";
        var data=persistent.data.samples.INDIKATOR.data;
        var i;
        for (i=0;i<data.length;i++) {
            data[i][0]*=1000;
        }
        var datagold=persistent.data.samples.GOLD.data;
        for (i=0;i<datagold.length;i++) {
            datagold[i][0]*=1000;
        }
        if (indikator) {        
            data.push([startTime,indikator]);
        }
        $.plot($("#graph"),[{color:'green',label:"Überschuß/h",yaxis:1,data:data,shadowSize:0},
                            {color:'yellow',label:"Gold",yaxis:2,data:datagold,shadowSize:0}]
                          ,{xaxis:{mode:"time"},legend:{position:'nw'}
                           }
              );
        unsafeWindow.data=data;
    },
    
    makeTextOption : function  (value,text,current,size) {
        var container=document.createElement("div");
        var txt=text.split(/\?\?/);
        container.style.paddingTop="0.2em";
        var text1=Toolbox.addElement(container,"span",txt[0]);
        var input=Toolbox.addElement(container,"input");
        if (size) {
            input.size=size;
        }
        input.type="input";
        input.name=value;
        input.value=current;
        input.addEventListener("change",Config.textChanged,true);
        if (value.indexOf("COLOR")!=-1)
            {
                var color=Toolbox.addElement(container,"span","\u263b");
                color.id=value;
                color.style.color=current;
            }
        var text2=Toolbox.addElement(container,"span",txt[1]);
        return container;
    },
    
    reworkTicker : function (event) {
        if (!selfModify) {
            var link=Toolbox.getByXPath("a",tickerHtml);
            if (link) {
            
                function spinTicker(event) {
                    doTicker=true;
                    unsafeWindow.ticker.showNextLine();
                    if (event) {
                        event.preventDefault();
                    }
                }
            
                if (doTicker) {
                    spinTicker();
                } else {
                    selfModify=true;
                    var mylink=Toolbox.addElement(tickerHtml,"a","bis zum bitteren Ende");
                    mylink.className="inline";
                    mylink.style.marginLeft="1em";
                    mylink.addEventListener("click",spinTicker,false);
                    selfModify=false;
                }
            } 
        }
    },
    
    doTest : function  (addTo) {
          var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svgElement.setAttribute('width', '200');
          svgElement.setAttribute('height', '200');
          var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          circle.setAttribute('cx', '100');
          circle.setAttribute('cy', '100');
          circle.setAttribute('r', '50');
          circle.setAttribute('fill', 'green');
          svgElement.appendChild(circle);
          addTo.appendChild(svgElement);
    },
    
    readTransaction : function (data1,data2) {
        var user=data1[1];
        var day=data1[2];
        var month=data1[3];
        var hour=data1[4];
        var minute=data1[5];

        var zahl=data2[1];
        var stoff=Toolbox.parseStoff(data2[2]);
        var gold=Toolbox.parseNumber(data2[3]);
        var verkaufen=(data2[4]=="abgekauft.");
        var date=new Date(0);
        date.setDate(day);
        date.setMonth(month-1);
        date.setYear(2008);
        date.setHours(hour);
        date.setMinutes(minute);
        
        Toolbox.addDebug(" *"+date);
        Toolbox.addDebug(" * von "+user+" "+(verkaufen?"ver":"")+"kaufen :"+stoff+"*"+zahl+" gesamt "+gold); 
        transaktion={"user":user,
                     "time":date.getTime(),
                     "stoff":stoff,
                     "anzahl":zahl,
                     "kurs":(gold/zahl),
                     "verkaufen":verkaufen
        }
        unsafeWindow.transaktion=transaktion;
    },
    
    Tooltip : {
        createToolTip : function  (element,text) {
            var newNode=Toolbox.addElement(element,"div");
            newNode.style.position="absolute";
	    newNode.style.zIndex="5000";
            var contentNode=Toolbox.addElement(newNode,"div");
            var test=Toolbox.addElement(contentNode,"div");
            test.style.position="absolute";
            var blob=Toolbox.addElement(test,"div");
            blob.style.position="relative";
            blob.style.top="-1em";
            blob.style.width="1em";
            blob.style.height="0.7em";
            blob.style.borderLeft="1px solid black";
            blob.style.borderTop="1px solid black";
            blob.style.borderRight="1px solid black";
            blob.style.background="#fff";
            blob.style.MozBorderRadiusTopleft="1em";
            blob.style.MozBorderRadiusTopright="1em";

            //    test.style.border="1px solid red";
            contentNode.style.border="1px solid black";
            contentNode.style.background="#fff";
            contentNode.style.padding="0.2em";
            contentNode.style.top="0.6em";
            contentNode.style.display="none";
            contentNode.style.position="relative";
            contentNode.style.MozBorderRadius="0.5em";
            contentNode.id="tip"+element.id;
            element.addEventListener("mouseover",Toolbox.Tooltip.showToolTipBox,true);
            element.addEventListener("mouseout",Toolbox.Tooltip.hideToolTipBox,true);
            if (text) {
                Toolbox.addElement(contentNode,"div",text);
            }
            return contentNode;
        },
        
        showToolTipBox : function (event) {
            document.getElementById("tip"+this.id).style.display="block";
        },
        
        hideToolTipBox : function  (event) {
            document.getElementById("tip"+this.id).style.display="none";
        }
    }
}



/**
*
*  UTF-8 data encode / decode
*  http://www.webtoolkit.info/
*
**/
 
var Utf8 = {
 
    // public method for url encoding
    encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
 
        for (var n = 0; n < string.length; n++) {
 
            var c = string.charCodeAt(n);
 
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
 
        }
 
        return utftext;
    },
 
    // public method for url decoding
    decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
 
        while ( i < utftext.length ) {
 
            c = utftext.charCodeAt(i);
 
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
 
        }
 
        return string;
    }
    

}
var configOptions = {
    "TAUSENDER_TRENN":{
        "text":"Tausender Trennzeichen einfügen (2.256 statt 2256)"
    },
    "HIGHLIGHT_MESSAGES":{"text":"Nachrichten-Link bei neuen Nachrichten noch auffälliger machen"
    },
    "COLOR_HIGHLIGHT_MESSAGES":{"text":"?? Farbe für auffälligen Nachrichten Link",
      "indent":1,"type":"text","size":6
    },
    "LAGER_PROD":{
        "text":"Produktion und Bedarf in der Lagerliste (rechts) anzeigen."
    },
    "FONTSIZE":{"text":"?? Fontgröße für die +/- Werte ",
                "indent":1,
                "type":"text","size":4
    },
    "COLOR_PLUS":{"text":"?? Farbe für positive Werte bei der Produktionssumme","indent":1,
                  "type":"text","size":6
    },
    "COLOR_MINUS":{"text":"?? Farbe für negative Werte bei der Produktionssumme","indent":1,
                   "type":"text","size":6
    },
    "LAGER_ANGEBOTE":{
        "text":"Zahl der Angebotenen/Nachgefragten Einheiten in der Lagerliste anzeigen."
    },
    "FONTSIZE2":{"text":"?? Fontgröße",
                "indent":1,
                "type":"text","size":4
    },
    "COMPACT_STORETABLE":{
        "text":"Unnötige (kein Lagerbestand, kein Bedarf für Bau oder Produktion, keine Produktion) Zeilen aus der Lagerliste entfernen"
    },
    "COMPACT_STORETABLE_MORE":{
        "indent":1,
        "text":"Zeilen ohne Lagerbestand fast immer entfernen"
    },
    "REORDER":{
        "text":"Gebäude neu anordnen"
    }, 
    "NEW_ORDER":{
        "text":"Gebäude reihenfolge: ??",
        "indent":1,
        "type":"text",
        "size":60
    },
    "HIDE_LANDVERWALTUNG":{
        "text":"Landverwaltung nur bei 2 Klicks auf Landverwaltung nacheinander sichtbar machen."
    },
    "LETITBENIGHT":{
        "text":"Abends&Nachts andere Grafiken benutzen"
    },
    "LETITBENIGHT_NIGHT":{
        "text":"Nach ?? Uhr ist es Nacht",
        "indent":1,
        "type":"text",
        "size":4
    },
    "LETITBENIGHT_DAY":{
        "text":"Nach ?? Uhr ist es wieder Tag",
        "indent":1,
        "type":"text",
        "size":4
    },
    "LAGER_MARKT":{
        "text":"Marktpreise als tooltip zum Lagerbestand anzeigen"
    },
    "LAGER_WERT":{
        "text":"Lagerwert rechts anzeigen."
    },
    "WARN_EXCEED":{
        "text":"Stoff in Lagerliste markieren wenn Lager in ?? voll sein wird",
        "type":"text",
        "size":9
    },
    "ANGEBOTE_WERT":{
        "text":"Wert von eigenen Angeboten&Nachfragen am Markt berechnen und anzeigen"
   },
    "GLOBAL_ANALYSE":{
        "text":"Globale Analysewerte (Überschuß, Effizienz) rechts anzeigen."
    },
    "GLOBAL_ANALYSE_DAY":{
        "text":"Auch Überschuß/Tag anzeigen"
    },
    "NACHSCHUB_MARK":{"text":"Reiter 'M' - Nachschub unter ?? markieren. Wirkt auch auf die \"aufstocken\" Funktion in den Gebäuden.",
                      "type":"text",
                      "size":5                      
    },
    "COLOR_NACHSCHUB_MARK":{"text":"Farbe ?? für Nachschub markierung",
                            "type":"text",
                            "indent":1,
                            "size":6
    },
    "ZUSTAND_SORT":{"text":"Reiter 'Z' (Gebäudezustand) nach Zustand sortieren"
    },
    "ZUSTAND_MARK":{"text":"Reiter 'Z' -- Zustand unter 15 und 76% farbig markieren"
    },
    "GEBAUDE_SORT":{"text":"Reiter 'G' (Gebäude)  sortieren und umordnen"
    },
    "NACHSCHUB_SORT":{"text":"Nachschubliste (nach dauer) sortieren"
    },
    "NACHSCHUB_SORT_NAME":{"text":"nicht nach dauer, sondern nach dem Namen sortieren.",
                           "indent":1
    },

    "SHORTAGE":{
        "text":"Rechts anzeigen, bei welchem Gebäude als nächstes der Vorrat zur Neige geht."
    },
   "SHORTAGE_RED":{
        "text":"Link rot anzeigen wenn Vorrat nur noch für weniger als ?? Minuten",
        "type":"text",
        "indent":1,
        "size":4
    },
    "MARKT_OPT":{"type":"sep"
    },/*
    "MARKT_HISTORIE":{"text":"Im Markt rechts Preishistorie anzeigen."
    },
    "MARKT_NORMAL":{"text":"Normale Preise erkennen, wenn unterschiedlich zu den Eigenen (Kaufmann)"
    },*/
    "MARKT_SUM":{"text":"Summen über die Angebote/Nachfragen einblenden"
    },
    "MARKT_USERLINK":{"text":"Im Markt Benutzernamen in Links zum Profil umwandeln"
    },
    "MARKT_HIGHLIGHT":{"text":"Bestimmte Benutzer markieren"
    },
    "MARKT_BLOED":{"text":"Ich bin doch nicht blöd! - Angebote&Verkäufe ausserhalb der NPC Grenzen kennzeichnen"
    },
    "COLOR_MARKT_HIGHLIGHT":{"text":"?? Farbe für Benutzermarkierung.",
                             "type":"text",
                             "indent":1,
                             "size":6
    },
    "COLOR_MARKT_HIGHLIGHT_GUILD":{"text":"?? Farbe für Gildenmarkierung.",
                             "type":"text",
                             "indent":1,
                             "size":6
    },
    "MARKT_HIGHLIGHT_NAMES":{"text":"Namen der Benutzer,mit Leerzeichen getrennt: ?? ('nick*code' Sonderfunktionen: code kann #farbcode oder farbname oder 'ignore' sein)",
                             "type":"text",
                             "indent":1,
                             "size":40
    },
/*    "ALERT_MARKT":{"text":"Popup bei geänderten Marktpreisen"
    },*/
    "GEN_OPT":{"type":"sep"
    },
    "MARK_AUSBAU":{
        "text":"Sternchen bei Gebäuden einblenden, wenn Ausbau möglich."
    },
    "MARK_RESOURCE":{
        "text":"Resourcen für Ausbau merken und in der Lagerliste farbig markieren."
    },
    "MARK_ADD_RENOVIERUNG":{
        "text":"Kosten für Renovierung beim ausbau immer dazurechnen"
    },
    "COLOR_NEED":{"text":"?? Farbe für Rohstoffe die benötigt werden","indent":1,
                  "type":"text","size":6
    },
    "COLOR_AVAIL":{"text":"?? Farbe für Rohstoffe die ausreichend vorhanden sind","indent":1,
                   "type":"text","size":6
    },
    "GEB_ANALYSE":{"text":"Im Gebäudebildschirm rechts Analysen über Gebäudeproduktion anzeigen."
    },
    "GEB_GOLDWERT":{"text":"Goldwert bei den Resourcen von Aus/Um/Neubauten anzeigen"
    },
    "GEB_NEEDTAG":{"text":"Bedarf pro Tag errechnen"
    },
    "LAGER_EXCEEDED":{"text":"Beim Gebäudeausbau drauf hinweisen, wenn der Lagerplatz für die Resourcen nicht ausreicht."
    },
    "TIP_AUSBAU":{"text":"Gebäudetooltip erweitern: Welche Resourcen fehlen für den Ausbau?"
    },
    "TIP_VORRAT":{"text":"Gebäudetooltip erweitern: Wie lange sind die Resourcen noch verfügbar?"
    },
    "TIP_VORRAT_dauer":{"text":"Diese Anzeige nicht als absolute Zeit sondern als dauer.",
                        "indent":1},
    "READ_ALL_BUTTON":{"text":"Button zum Lesen aller Nachrichten einblenden"
    },
    "NACHRICHTEN_X":{"text":"Bei Verkaufs und Kaufsnachrichten ein [x] einblenden um die Nachricht schnell zu löschen"
    },
    "MUTATE_CHAT":{"text":"Chat inhalt modifizieren: Eigenen Nick markieren, Links klickbar machen"
    },
    "COLOR_NICK":{"indent":1,"text":"?? Farbe des eigenen Nicks",
                  "type":"text","size":6
    },
    "CYCLE_BUILDINGS":{"text":"Auf den Gebäudeseite Icons für den Wechsel zum nächsten/vorrigen Gebäude einblenden"},
/*    "CONFIG_ICON":{"text":"Icon zum Einblenden der Konfiguration anzeigen. ACHTUNG.Wenn deaktiviert, ist Konfiguration nur noch über den Link 'http://www.dragosien.de/?t=village&script=config' möglich"
    },*/
    "INFO_ICON":{"text":"Icon zum Anzeige der Übersichtstabelle anzeigen"
    },
    "RATE_PRODUKTION":{"text":"Lagerstand merken und veränderung/Produktion messen"
    },
    "UPDATE_CHECK":{"text":"Einmal in der Stunde automatisch auf Aktualisierung des Skriptes überprüfen"
    },
    "PRICE_CHECK":{"text":"Einmal in der Stunde automatisch alle Preise aktualisieren"},
    "PRICE_NPC_L":{"text":"NPC Verkaufpreis ??%",
                   "type":"text",
                   "indent":1,
                   "size":6},
    "PRICE_NPC_H":{"text":"NPC Kaufpreis ??%",
                   "type":"text",
                   "indent":1,
                   "size":6},
    "TILLEND":{"text":"'Bis zum bitteren Ende' bei den  Wettkampfberichten anzeigen."
    },
    "GILDE_OPT":{"type":"sep"
    },
    "TURNIERPLAN_MARK_WINNER":{"text":"Im Turnierplan den Gewinner grün markieren"
    },
    "ARENA_CALCDRAGBALL":{"text":"In der Gildenarena: Dragball Punkte errechnen, als Tooltip einblenden"
    },
    "ARENA_ADDDRAGBALL":{"indent":1,"text":"Beste Dragball position& Punkte in dieser zur Tabelle hinzufügen"
    },
	"ARENA_SORTDRAGBALL":{"indent":1,"text":"Drachen nach Dragballstärke sortieren"
	},
    "EXPORT_LB":{"text":"Beim Export Zeilenumbrüche ausgeben."
    },
    "ENDE_OPT":{"type":"sep"
    },
    "DELETE_BUILDING":{"text":"Löschen von überflüssigen Gebäuden aus der Skript-Datenbank erlauben. Lösch link wird auf der Gebäudeübersicht angezeigt."
    },
    "debug":{"text":"Debug Ausgaben"}
};

function MyStorage() {
    this.storagePrefix="";
    this.server="";
    this.userName="";
    
    this.setUserName=function(userName) {
        this.userName=userName;
        this.storagePrefix=this.userName+"_"+this.server+"_";
    }
    this.setServer=function(serverName) {
            this.server=serverName;
            this.storagePrefix=this.userName+"_"+this.server+"_";
        }
    this.setItem=function(key,value) {
            setValue(this.storagePrefix+key,value);
        };
    
    this.getItem=function(key) {
        return getValue(this.storagePrefix+key);
    };
    this.setObject=function(key,obj) {
        this.setItem(key,JSON.stringify(obj));
    }
    this.getObject=function(key) {
        var result={};
        var encoded=this.getItem(key);
        try {
            if (encoded) {
                result=JSON.parse(encoded);
            }   
            } catch (c) {}
        return result;
    }    
}

Dragball = {

	//Hilfsfunktion um Dragball Stärke zu berechnen.
    calcValue : function (array,ia,ib) {
        a=array[ia];
        b=array[ib];
        if (a>b)
            return a+b+b;
        else
            return a+a+b;
    },

    workGuildHallAusbauen : function  () {
        var mainDiv=Toolbox.getByXPath("//div[@class='mainContent']/div[2]/div");
        var i;
        var charged=false;
        var enspan=[];
        var groups=[];
        var current={};
        for (i=0;i<mainDiv.childNodes.length;i++) {
            var node=mainDiv.childNodes[i];
            if (node.textContent=='Ausbaukosten:') {
                charged=true;
            }
            if (node.tagName=='H3') {
                charged=false;
                if (enspan.length>0) {
                    groups.push(enspan);
                    enspan=[];
                }
            }
            if (charged) {
                if (node.tagName==undefined) {
                    current={"start":node};
                }
                if (node.tagName=='SPAN') {
                    current.annotation=node;
                    enspan.push(current);
                }
            }
        }
        groups.push(enspan);
        unsafeWindow.groups=groups;
        var group;
        Toolbox.addDebug("Found "+groups.length+" groups to mutate");
        for ( key in groups) {
	        group=groups[key];
                Toolbox.addDebug("* "+group.length+" Lines");
                var resourcen={};
            var needed={};
                for (key2 in group) {
		        var line=group[key2];
                        var newSpan=document.createElement("span");
                        var parent=line.start.parentNode;
                        parent.insertBefore(newSpan,line.start);
                        parent.removeChild(line.start);
                        parent.removeChild(line.annotation);
                        var front=document.createElement("a");
                        front.className='inline';
                        newSpan.appendChild(front);
                        front.appendChild(line.start);
                        newSpan.appendChild(line.annotation);
                        var need=line.start.textContent.match(/([a-zA-ZöäüÖÄÜß]+): *([0-9]+)/);
                        var present=line.annotation.textContent.match(/\(([0-9.]+) /);
                        if (need&&present) {
                            var stoff=Toolbox.parseStoff(need[1]);
                            var count=Toolbox.parseNumber(need[2]);
                            var avail=Toolbox.parseNumber(present[1]);
                            front.href='?t=market&product='+stoff;
                            resourcen[stoff]=count;
                needed[stoff]=Math.max(0,count-avail);
                            if (avail>=count) {//TODOHERE
                                front.style.color=config['COLOR_AVAIL'];
                            } else {
                                front.style.color=config['COLOR_NEED'];
                            }
                            Toolbox.addDebug(stoff+":"+avail+"/"+count);
                        }
                    }
                var newP=document.createElement('div');
                newSpan.parentNode.insertBefore(newP,newSpan.nextSibling);
                var kosten=Toolbox.minMaxGold(resourcen);
            var kosten2=Toolbox.minMaxGold(needed);
                Toolbox.addElement(newP,"p","Gesamtkosten: ("+Toolbox.printNum(kosten.min)+"\u2026"+Toolbox.printNum(kosten.max)+") Gold");
            Toolbox.addElement(newP,"p","Noch zu besorgen: ("+Toolbox.printNum(kosten2.min)+"\u2026"+Toolbox.printNum(kosten2.max)+") Gold");
            }
    },

    workGuildMitglieder : function  () {
        var users=document.evaluate("//div[contains(@class,'member_list')]/a",document,null,XPathResult.ANY_TYPE,null);
        var user=users.iterateNext();
        var guildUsers="";
        while (user) {
            guildUsers+=user.textContent+" ";
            user=users.iterateNext();
        }
        config["MARKT_HIGHLIGHT_NAMES_GUILD"]=guildUsers;
        storage.setObject("GS_config",config);
    },
    
    workWirtshaus : function  () {
        var tiere=["Wellensittich","Elster","Falke","Storch","Tukan","Pelikan","Pinguin","Albatros","Drachen","Kolibri","Krähe"];
       wirtshausInfo=storage.getObject("GS_wirtshaus");
        var match1=document.URL.match(/&id=(\d*)/);
        var match2=document.URL.match(/&type=(\d*)/);
        var index=parseInt(match1[1])*31+parseInt(match2[1]);
        index=index%tiere.length;
        currentHausKey=match1[1]+":"+match2[1];
        if (!wirtshausInfo[currentHausKey]) {
            wirtshausInfo[currentHausKey]=0;
        }
        var dragLine=document.getElementById("drag_line");
        var mainContent=dragLine.parentNode;
        var mainDiv=Toolbox.getByXPath("div[3]",mainContent);
        var insertBefore=Toolbox.getByXPath("p",mainDiv).nextSibling;
        var addedP=document.createElement("p");
        if (wirtshausInfo[currentHausKey]) {
            var text="Du hast schon einige Humpen Met getrunken und meinst am Rande des Tresens einen kleinen ";
            Toolbox.addElement(addedP,"span",text);
            text=tiere[index];
            var delLink=Toolbox.addElement(addedP,"a",text);
            delLink.href='#';
            delLink.className="inline";
            delLink.addEventListener("click",function(event) {
                    this.parentNode.innerHTML="Du schüttelst deinen Kopf unwirsch und der "+tiere[index]+" verschwindet.";
                    wirtshausInfo[currentHausKey]=0;
                    storage.setObject("GS_wirtshaus",wirtshausInfo);
                    event.preventDefault();
                },false);
            text=" zu sehen. Zwischen seinen Flügeln hält er einen Zettel, auf dem die Zahl "+wirtshausInfo[currentHausKey]+" steht.";
            Toolbox.addElement(addedP,"span",text);
            mainDiv.insertBefore(addedP,insertBefore);
        }
        if (document.getElementById('competitionReport')) {
            var report=document.getElementById('competitionReport');

            var winMatch=        unsafeWindow.ticker.htmlText.match(/(Du|Gegner) has?t (\d+) Gold gewonnen/);
            var winSum=parseInt(winMatch[2]);
            if (winMatch[1]=='Gegner') {
                winSum=-winSum;
            }
            wirtshausInfo[currentHausKey]+=winSum;
            storage.setObject("GS_wirtshaus",wirtshausInfo);
        }
    },
    
    workArena : function  () {
        Toolbox.addRight("Arena!");
        var dragBox=document.getElementById('drag_box');
        var table=Toolbox.getByXPath("*/table",dragBox);
        if (table == null) {
            return;
        }
        var div=document.createElement('div');
        table.parentNode.insertBefore(div,table);
        table.id='kampfliste';
        var checkbox=Toolbox.addElement(div,"input");
        unsafeWindow.tablexx=table;
        Toolbox.addElement(div,"span","Nur online Drachen anzeigen");
        checkbox.type='checkbox';
        checkbox.id='onlyOnline';
        checkbox.addEventListener('change',Dragball.filterOnline,true);
        checkbox.checked='checked';
        Dragball.filterOnline();
    },
    
    filterOnline : function () {
        var checkbox=document.getElementById('onlyOnline');
        var show=checkbox.checked;
        var table=document.getElementById('kampfliste');
        var i;
        for (i=0;i<table.rows.length;i++) {
            var row=table.rows[i];
            if (row.cells.length>4) {
                var link=row.cells[3].firstChild;
                if (link && link.className!='inlineb') {
                    if (show) {
                        row.style.display='none';
                    } else {
                        row.style.display='table-row';
                    }
                }
            }
        }
    },

    stripCODE : function  (code) { //used by aufstellungscodes...
        return code.replace(/\uf001[^\uf002]*\uf002/g,"");
    },

    markAufstellung : function  () {
        var aufstellung=document.getElementById("aufstellung");
        var bild=Toolbox.getByXPath("img",aufstellung);
        var newly=false;
	var teamPart=document.URL.match(/team=\d+/);
	if (teamPart) {
	   teamPart="&"+teamPart[0];
	} else {
	   teamPart="";
	}
        var CODE="";
        if (aufstellungMarkers==null) {
            newly=true;
            aufstellungMarkers=[];
            var markers=document.createElement("div");
            markers.style.position="relative";
            markers.style.width="0px";
            markers.style.height="0px";
            aufstellung.insertBefore(markers,bild);
            for (i=0;i<7;i++) {
                var subblock=Toolbox.addElement(markers,"div");
                subblock.style.position="relative";
                subblock.style.width="0px";
                subblock.style.height="0px";
                var img=Toolbox.addElement(subblock,"img");
                img.style.position="relative";
                //            img.type="image/svg";
                img.style.display="none";
                img.src="http://serv.endoftheinternet.org/mark.png"
                //            img.data="http://serv.endoftheinternet.org/marker.svg";
                aufstellungMarkers.push(img);
            }
        }
        for (i=0;i<7;i++) {
            aufstellungMarkers[i].style.display="none";
        }
        var used=0;
        var ball_positions=[
                    {"left":"83px","top":"292px","pos":"Tor"},
                    {"left":"34px","top":"220px","pos":"Abwehr Links"},
                    {"left":"83px","top":"232px","pos":"Abwehr Mitte"},
                    {"left":"140px","top":"212px","pos":"Abwehr Rechts"},
                    {"left":"84px","top":"177px","pos":"Mitte Hinten"},
                    {"left":"28px","top":"136px","pos":"Mitte Links"},
                    {"left":"142px","top":"140px","pos":"Mitte Rechts"},
                    {"left":"83px","top":"104px","pos":"Mitte Vorn"},
                    {"left":"34px","top":"57px","pos":"Angriff Links"},
                    {"left":"84px","top":"56px","pos":"Angriff Mitte"},
                    {"left":"136px","top":"58px","pos":"Angriff Rechts"}];    
       var positionen=["Angriff aussen","Angriff mitte","Mitte aussen","Verteidigung mitte","Verteidigung aussen","Torwart"];
       var pk=["AA","AM","MA","VM","VA","T "];
       var mapping=[0,1,0,1,2,2,3,4,3,4,5];
       for (i=1;i<12;i++) {
            var selector=document.getElementsByName("arr_data["+i+"]")[0];
            var option=selector.options[selector.selectedIndex];
            if (newly) {
                selector.addEventListener("change",Dragball.markAufstellung,true);
	        span=Toolbox.addElement(selector.parentNode,"span","("+pk[mapping[11-i]]+")");
	        span.id="pos_"+i;
	        span.style.marginLeft="3px";
	        span.style.position='absolute';
	        Toolbox.Tooltip.createToolTip(span,positionen[mapping[11-i]]);
            }
            if (option.value!=0) {
                CODE+=option.value;
                CODE+="\uf001"+option.textContent+"\uf002";
                if (used==7) {
                    Toolbox.addRight("Achtung! Mehr als 8 Drachen auf dem Feld!");
                    break;
                }
                aufstellungMarkers[used].title=ball_positions[i-1].pos+": "+option.textContent;
                aufstellungMarkers[used].style.display="block";
                aufstellungMarkers[used].style.left=ball_positions[i-1].left;
                aufstellungMarkers[used].style.top=ball_positions[i-1].top;
                used++;
            }
            CODE+=';';
        }
        
        if (newly) {
            var posis=document.getElementById("positionen");
	    var br=Toolbox.addElement(posis,"br");
	    br.style.clear="both";
            var newDiv=Toolbox.addElement(posis,"div");
            var link=Toolbox.addElement(newDiv,"a","Aufstellungscode:");
            link.id="SCRIPT_CODE_LINK";
            link.title="Link zu dieser Aufstellung.";
            var input=Toolbox.addElement(newDiv,"input");
            input.id="SCRIPT_CODE";
            input.name="SCRIPT_CODE";
            input.type="text";
            input.size=20;
            input.style.margin="5px";
            input.title="Dieser Code enthält mehr Informationen als der Link und ist v.a. zur weiteren Auswertung gedacht";
            var button=Toolbox.addElement(newDiv,"input");
            button.type="submit";
            button.name="x";
            button.value="Code Übernehmen";
            button.title="Übernimmt den Code aus dem Textfeld links in die Aktuelle Aufstellung. ACHTUNG! Speichert nicht automatisch";
            button.addEventListener('click',function() {
                    Dragball.setAufstellung(Dragball.stripCODE(document.getElementById("SCRIPT_CODE").value));
                    Dragball.markAufstellung();
                },true);
        }
        document.getElementById("SCRIPT_CODE").value=CODE;
        document.getElementById("SCRIPT_CODE_LINK").href="http://www.dragosien.de/?t=guild_arena&tab=0"+teamPart+"&script=aufstellung;"+Dragball.stripCODE(CODE);
    },

    setAufstellung : function  (code) {
        var ids=code.split(";");
        for (i in ids) {
            var name="arr_data["+(parseInt(i)+1)+"]"
            var selectors=document.getElementsByName(name);
            if (selectors.length==1){
                var selector=selectors[0];
                if (selector && ids[i]) {
                    selector.value=ids[i];
                } else {
                    selector.value="0";
                }   
            }
        }
    },
    
    workGuildArenaAufstellung : function  () {
        var setLink=document.URL.match("script=aufstellung;([^&]*)");
        if (setLink) {
            code=setLink[1];
            Dragball.setAufstellung(code);
        }
        Dragball.markAufstellung();
        Toolbox.provideGuildArenaExport();
        
    },

    workTurnierPlan : function  () {
        var turnierPlan=Toolbox.getByXPath("//*[@class='mainContent']/table//table");
   	var rows=turnierPlan.rows;
        
	var offset=1;
        for (i=0;i<rows.length;i++) {
            row=rows[i];
            var cells=row.cells;
	    if (cells.length==1 && cells[0].textContent.match(/Gruppe/)) {
	       offset=0;
	    }	       
            if (cells.length>3) {
                var tore=cells[offset+2].textContent.match(/(\d+):(\d+)/);
                if (tore) {
                    var tore1=parseInt(tore[1]);
                    var tore2=parseInt(tore[2]);
                    if (Toolbox.isEnabled("TURNIERPLAN_MARK_WINNER")) {
                        if (tore1>=tore2) {
                            cells[offset].childNodes[0].style.color='green';
                        }
                        if (tore2>=tore1) {
                            cells[offset+1].childNodes[0].style.color='green';
                        }
                    }
                }
                if (cells.length>(offset+3)) {
                    var details=Toolbox.getByXPath("a",cells[offset+3]);
                    if (details ) {
                        var match=details.href.match(/game_details.*id=(\d*)/);
                        if (match) {
                            details.textContent="Info";
                            details.title="Details";
                            details.style.marginRight="0.25em";
                            var newLink=Toolbox.addElement(cells[offset+3],"a","▶");
                            newLink.title="Animation zum Spiel. Öffnet in externem Fenster von externem Server.";
                            newLink.href="http://serv.endoftheinternet.org/dragball/playback.php?id="+match[1];
                            newLink.target="playback";
                            newLink.className="inline";
                        }
                        
                    }
                    
                }
            }
        }
        
    },

    workGameDetails : function  () {
        var home=Toolbox.getByXPath("//div[@class='team'][1]").textContent;
        var guest=Toolbox.getByXPath("//div[@class='team'][2]").textContent;
        Toolbox.addRight("Es spielen : "+home+" gegen "+guest);
        var giantBlob=Toolbox.getByXPath("//div[@class='mainContent']/div[2]");
        var readSoFar="";
        var readSoFarText="";
        var objs=[];
        var zuege=[];
        var begun=false;
        node=giantBlob.childNodes[0];
        function parseObj(node) {
            var team="home";
            if (node.className.indexOf("team1")) {
                team="home";
            }else if (node.className.indexOf("team0")) {
                team="guest";
            } else {
                Toolbox.addRight("Kann Drache nicht interpretieren");
            }
            var drache={'name':node.textContent,
                    'team':team};
            var match=node.title.match("Stärke:(\\d+) +Fitness:(\\d+)");
            if (match) {
                drache.staerke=parseInt(match[1]);
                drache.fitness=parseInt(match[2]);
            }
            return drache;
        }
        function addObj(element,obj) {
            if (obj==null) {
                return;
            }
            var span=Toolbox.addElement(element,"span",obj.name);
            span.className=obj.team=='home'?'team0':'team1';
            if (obj.fitness) {
                span.title="Fitness:"+obj.fitness+" Stärke:"+obj.staerke;
            }
        }
        var s_drachen={}; // team_name = key. stat = value

        nodeStack=[];
        unsafeWindow.nodeStack=nodeStack;
        var abschnitt=0;
        function iterate() {
            node=node.nextSibling;
            if (node && node.childNodes.length>6) {
                nodeStack.push(node);
                node=node.childNodes[0];
            }
            return node!=null;
        }
        var zeit;
        while (!begun && node.nextSibling !=null) {
            node=node.nextSibling;
            if (node.textContent.indexOf("00h:00min")!=-1) {
                zeit="0 min";
                begun=true;
            }
        }
        while ( iterate() ) {
            //        Toolbox.addDebug("P1:"+node.textContent);
            zeitMatch=node.textContent.match("(\\d\\d)h:(\\d\\d)min");
            if (node.textContent.indexOf("Pausenpfiff")!=-1) {
                abschnitt++;
                // to be able to parse earlier, incorrect, (span not closed) texts also
                if (!zeitMatch) {
                    continue;
                }
            }
            if (zeitMatch) {
                zeit=parseInt(zeitMatch[1],10)*60+parseInt(zeitMatch[2],10)+abschnitt*30;
                zeit+=" min";
                continue;
            }
            if (node.className && node.className.indexOf("bold")!=-1) {
                continue;
            }
            if (node.textContent.indexOf("greift an:")!=-1) {
                readSoFarText="";
                readSoFar="";
                objs=[];
                continue;
            }
            if (node.nodeName=="#text" || node.nodeName=="B") {
                readSoFar+=node.textContent;
                readSoFarText+=node.textContent;
                // Toolbox.addDebug("++");
            }
            if (node.nodeName=="SPAN") {
                //            Toolbox.addDebug("=>Drache");
                readSoFar+="#"+objs.length;
                readSoFarText+=node.textContent;
                objs.push(parseObj(node));
            }
            if (readSoFar.indexOf(".")!=-1) {
                //Punkte werden ersetzt, so das Satzenden weiterhin erkannt werden.
                readSoFar=readSoFar.replace(".","|");
                if (readSoFar.indexOf("TOOOR")!=-1) {
                    // Toor - jubel.
                    iterate();//Grab one Element more. 
                    var punktstand=null;
                    if (node.nodeName=='B') {
                        punktstand=node.textContent.match("((\d+):(\d+))");
                    }
                    if (objs.length==1) {
                        zuege.push({'action':'TOR','d1':objs[0],'zeit':zeit,'text':readSoFarText});
                    }  else {
                        Toolbox.addRight("TOR mit mehr als !=1 Drache - ???");
                    }
                    objs=[];
                    readSoFar="";
                    readSoFarText="";
                }//Toor-jubel ende
                { // Torversuche...
                    //Torversuch 
                    if (objs.length==2) {
                        if ( readSoFar.match("#1 hechtet mit großen Augen.*am Tor vorbei")||
                             readSoFar.match("#1 sieht den Ball,.*über die Latte")) {
                            zuege.push({'action':'TOR_ABGEWEHRT','d1':objs[0],'d2':objs[1],'zeit':zeit,'text':readSoFarText});
                            objs=[];
                            readSoFar="";
                            readSoFarText="";
                            continue;
                        }
                        if ((readSoFar.indexOf("verfehlt ihn knapp")!=-1)) {
                            zuege.push({'action':'TOR_AUSGETRICKST','d1':objs[0],'d2':objs[1],'zeit':zeit,'text':readSoFarText});
                            objs=[];
                            readSoFar="";
                            readSoFarText="";
                            continue;
                            }
                    }
                    if (objs.length==3) {
                        if (readSoFar.indexOf("trifft die Latte, fällt vor #1")!=-1||
                            readSoFar.match("#2 springt.* wirft den Ball am Tor vorbei")||
                            readSoFar.match("#2 springt.* wirft den Ball über das Tor")||
                            readSoFar.match("#2 springt.* wirft den Ball.*in die Arme von")) {
                            zuege.push({'action':'TOR_ABGEWEHRT','d1':objs[0],'d2':objs[1],'zeit':zeit,'text':readSoFarText});
                            objs=[];
                            readSoFar="";
                            readSoFarText="";
                            continue;
                            
                        }
                        if (readSoFar.match("#2 springt.* wirft den Ball\\| $")) {
                            zuege.push({'action':'TOR_AUSGETRICKST','d1':objs[0],'d2':objs[1],'zeit':zeit,'text':readSoFarText});
                            objs=[];
                            readSoFar="";
                            readSoFarText="";
                            continue;
                        }
                    }
                    
                    if (objs.length==1) {
                        if (readSoFar.indexOf("am Tor vorbei")!=-1||
                            readSoFar.indexOf("Leider fliegt der Ball knapp über das Tor.")!=-1) {
                            zuege.push({'action':'TOR_DANEBEN','d1':objs[0],'zeit':zeit,'text':readSoFarText});
                            objs=[];
                            readSoFar="";
                            readSoFarText="";
                        }
                        continue;
                    }
                }//Torversuch-Ende                                        
                if (objs.length==2) { // Ball wird abgenommen...
                    //oder problemloser Pass!
                    if (objs[0].team==objs[1].team) {
                        zuege.push({'action':'PASS',
                                    'd1':objs[0],
                                    'd2':objs[1],
                                    'zeit':zeit,
                                    'text':readSoFarText});
                        readSoFar="";
                        readSoFarText="";
                        objs=[];
                        continue;
                    }
                    // TOOKBALL : d1 nimmt d2 den ball weg
                    //Aktiv - #0 nimmt #1 den Ball ab
                    if (readSoFar.indexOf("#0 stellt sich #1 in den Weg")!=-1||
                        readSoFar.indexOf("#0 läuft auf #1 zu und nimmt")!=-1) {
                        zuege.push({'action':'TOOKBALL',
                                    'd1':objs[1],
                                    'd2':objs[0],
                                    'zeit':zeit,
                                    'text':readSoFarText});
                        readSoFar="";
                        readSoFarText="";
                        objs=[];
                        continue;
                    }
                    //Passiv - #1 nimmt #0 den Ball ab
                    if ((readSoFar.match("scheitert aber an eine[rm] aufmerksamen #1"))||
                        (readSoFar.match("#1 kann ih[mr] aber folgen.*nimmt ih[mr].*Ball ab"))                    ) {
                        zuege.push({'action':'TOOKBALL',
                                    'd1':objs[0],
                                    'd2':objs[1],
                                    'zeit':zeit,
                                    'text':readSoFarText});
                        readSoFar="";
                        readSoFarText="";
                        objs=[];
                        continue;
                    }
                    
                }
                if (objs.length==4) {
                    if ((readSoFar.match("dri[pb][pb]elt.*um *#2 *herum.*zu *#3"))){
                        zuege.push({'action':'PASS',
                                    'd1':objs[1],
                                    'd2':objs[3],
                                    'd3':objs[0],
                                    'zeit':zeit,
                                    'text':readSoFarText});
                        readSoFar="";
                        readSoFarText="";
                        objs=[];
                        continue;
                    }
                }
                if (objs.length==3) {
                    if (readSoFar.match("#2 geht jedoch dazwischen")) {
                        zuege.push({'action':'PASS',
                                    'd1':objs[0],
                                    'd2':objs[2],
                                    'd3':objs[1],
                                    'zeit':zeit,
                                    'text':readSoFarText});
                        readSoFar="";
                        readSoFarText="";
                        objs=[];
                        continue;
                    }
                    if (readSoFar.match("über #1.*zu *#2")!=null||
                        readSoFar.match("weicht *#1 *aus.*zu *#2")!=null||
                        readSoFar.match("#2 direkt in die Arme")!=null||
                        readSoFar.match("umdri[pb][pb]elt.*#1.*und schießt.*#2")!=null) {
                        zuege.push({'action':'PASS',
                                    'd1':objs[0],
                                    'd2':objs[2],
                                    'd3':objs[1],
                                    'zeit':zeit,
                                    'text':readSoFarText});
                        readSoFar="";
                        readSoFarText="";
                        objs=[];
                        continue;
                            
                        }
                }
                if (objs.length>=2) {
                    Toolbox.addRight("UNHANDLED "+objs.length+": "+readSoFar);
                    readSoFar="";
                    readSoFarText="";
                    objs=[];
                    continue;
                }
            }
        }
        var i;
        unsafeWindow.zuege=zuege;
        var newTopDiv=document.createElement("div");
        var mainContent=Toolbox.getByXPath("//div[@class='mainContent']");
        mainContent.insertBefore(newTopDiv,mainContent.childNodes[0]);
        var link=Toolbox.addElement(newTopDiv,"a","Torchronik");
        link.href=document.URL+"#torchronik";
        var newDiv=Toolbox.addElement(mainContent,"div");
        var anchor=Toolbox.addElement(newDiv,"a");
        anchor.name="torchronik";
        Toolbox.addElement(anchor,"h1","Torchronik:");
        var torTable=Toolbox.addElement(newDiv,"table");
        var tr=Toolbox.addElement(torTable,"tr");
        var td;
        Toolbox.addElement(tr,"th","Zeit");
        Toolbox.addElement(tr,"th",home);
        Toolbox.addElement(tr,"th",guest);
        Toolbox.addElement(tr,"th","Torstand");
        Thome=0;
        Tguest=0;
        for (i=0;i<zuege.length;i++) {
            zug=zuege[i];
            if (zug.action=='TOR' || zug.action=='TOR_ABGEWEHRT' ||zug.action=='TOR_DANEBEN') {
                tr=Toolbox.addElement(torTable,"tr");
                td=Toolbox.addElement(tr,"td",zug.zeit);
                if (zug.d1.team=='guest') {
                    td=Toolbox.addElement(tr,"td");
                }
                td=Toolbox.addElement(tr,"td");
                addObj(td,zug.d1);
                tr.title=zug.text;
                if (zug.action=='TOR'){
                    if (i>0 && zuege[i-1].action=='TOR_AUSGETRICKST') {
                        tr.title=zuege[i-1].text+" "+zug.text;
                    }
                    if (zug.d1.team=='home'){
                        Thome++;
                    } else {
                        Tguest++;
                    }
                }
                if (zug.action=='TOR_ABGEWEHRT') {
                    Toolbox.addElement(td,"span"," wurde abgewehrt");
                }
                if (zug.action=='TOR_DANEBEN') {
                    Toolbox.addElement(td,"span"," daneben");
                }

                if (zug.d1.team=='home') {
                    td=Toolbox.addElement(tr,"td");
                }
                td=Toolbox.addElement(tr,"td",Thome+":"+Tguest);
            }
            //Toolbox.addRight("Zug: "+zuege[i].zeit+" "+zuege[i].d1+" "+zuege[i].action);
        }
        /*    stat={'ballbesitz':0,
              'pass_ok':0,
              'pass_to':{},//drache,zahl
              'ballverlust':0, 
              'ballverlust_to':{},//drache:zahl
              'tor_versuch':0,
              'tor_erfolg':0};*/
        for (i=0;i<zuege.length;i++) {
            var zug=zuege[i];
            var stat=s_drachen[zug.d1.team+"_"+zug.d1.name];
            if (stat==null) {
                stat={
                      'position':'',
                      'ballbesitz':0,
                      'pass_ok':0,
                      'pass_to':{},//drache,zahl
                      'ballverlust':0, 
                      'ballverlust_to':{},//drache:zahl
                      'tor_versuch':0,
                      'tor_erfolg':0};        
                s_drachen[zug.d1.team+"_"+zug.d1.name]=stat;
                stat.drache=zug.d1;
            }
            function count(array,drache) {
                if (array[drache.name]==null) {
                    array[drache.name]=0;
                }
                array[drache.name]++;
            }
            if (zug.action=='TOR_ABGEWEHRT'||zug.action=='TOR_DANEBEN'||zug.action=='TOR_AUSGETRICKST') {
                stat.tor_versuch++;
            }
            if (zug.action=='TOR') {
                stat.tor_erfolg++;
            }
               
            stat.ballbesitz++;
            if (zug.action=='TOOKBALL') {
                stat.ballverlust++;
                count(stat.ballverlust_to,zug.d2);
            }
            if (zug.action=='PASS') {
                if (zug.d1.team==zug.d2.team) {
                    stat.pass_ok++;
                    count(stat.pass_to,zug.d2);
                } else {
                    stat.ballverlust++;
                    count(stat.pass_to,zug.d3);
                    count(stat.ballverlust_to,zug.d2);
                }
            }
        }
        unsafeWindow.s_drachen=s_drachen;
        var statTable=Toolbox.addElement(newDiv,"table");
        function addStatHeader(statTable) {
            tr=Toolbox.addElement(statTable,"tr");
            Toolbox.addElement(tr,"th","Drache");
            Toolbox.addElement(tr,"th","Ballbesitz");
            Toolbox.addElement(tr,"th","Ballverlust");
            Toolbox.addElement(tr,"th","Tor(versuche)");
            th=Toolbox.addElement(tr,"th","Pässe");
            th.title="Erfolgreiche Pässe";
            Toolbox.addElement(tr,"th","Angespielt");
            Toolbox.addElement(tr,"th","Abgenommen"); 
        }
        keys=[];
        for (drache in s_drachen) {
            keys.push(drache);
        }
        keys=keys.sort();
        Toolbox.addRight(keys);
        count=0;
        for (_key in keys) {
	    key=keys[_key];
            var drache=s_drachen[key];
            //        Toolbox.addRight("*"+key+":"+drache);
            if (count==7 || count==0) {
                addStatHeader(statTable);
            }
            count++;
            tr=Toolbox.addElement(statTable,"tr");
            td=Toolbox.addElement(tr,"td");
            td.style.borderTop="1px solid black";
            
            addObj(td,drache.drache);
            td=Toolbox.addElement(tr,"td",drache.ballbesitz);
            td.style.borderTop="1px solid black";
            td=Toolbox.addElement(tr,"td",drache.ballverlust);
            td.style.borderTop="1px solid black";
            td=Toolbox.addElement(tr,"td",drache.tor_erfolg);
            td.style.borderTop="1px solid black";
            if (drache.tor_versuch>0) {
                Toolbox.addElement(td,"span","("+drache.tor_versuch+")");
            }
            td=Toolbox.addElement(tr,"td",drache.pass_ok);
            td.style.borderTop="1px solid black";
            td=Toolbox.addElement(tr,"td");
            td.style.borderTop="1px solid black";
            var subTable=Toolbox.addElement(td,"table");
            for  (sDrache in drache.pass_to) {
                var sTr=Toolbox.addElement(subTable,"tr");
                Toolbox.addElement(sTr,"td",sDrache);
                Toolbox.addElement(sTr,"td",drache.pass_to[sDrache]);
            }
            td=Toolbox.addElement(tr,"td");
            td.style.borderTop="1px solid black";
            var subTable=Toolbox.addElement(td,"table");
            for  (sDrache in drache.ballverlust_to) {
                var sTr=Toolbox.addElement(subTable,"tr");
                Toolbox.addElement(sTr,"td",sDrache);
                Toolbox.addElement(sTr,"td",drache.ballverlust_to[sDrache]);
                
            }
        }
        
        Toolbox.addElement(newDiv,"h1","Debug - Alle erkannten Spielzüge:");
        var zugTable=Toolbox.addElement(newDiv,"table");
        tr=Toolbox.addElement(zugTable,"tr");
        Toolbox.addElement(tr,"th","Zeit");
        Toolbox.addElement(tr,"th","Aktion");
        Toolbox.addElement(tr,"th","Ballbesitz vorher");
        Toolbox.addElement(tr,"th","Ballbesitz nachher");
        Toolbox.addElement(tr,"th","weiterer Beteiligter");
        for (i=0;i<zuege.length;i++) {
            var zug=zuege[i];
            tr=Toolbox.addElement(zugTable,"tr");
            tr.title=zug.text;
            td=Toolbox.addElement(tr,"td",zug.zeit);
            td=Toolbox.addElement(tr,"td",zug.action);
            td=Toolbox.addElement(tr,"td");
            addObj(td,zug.d1);
            td=Toolbox.addElement(tr,"td");
            addObj(td,zug.d2);
            td=Toolbox.addElement(tr,"td");
            addObj(td,zug.d3);
        }

        


    }

}

/**
API
(21:04:25) tomatenschaf: http://www.dragosien.de/?t=ajax&action=save_json&utf8_text=abc
(21:05:06) tomatenschaf: http://www.dragosien.de/?t=ajax_whisper&action=get_json
**/

Dragosien = { 
    replacer : function  (text,towards) {
        var keys=['"name":','"anzahl":','{"rohstoff":','"seile"','"heiltrank"','"zauberwasser"','"honig"','"saettel"','"kohle"','"alraune"','"honig"','"stoff"',
              '"brot"','"gemuese"','"kerzen"','"papier"','"drachen"','"update":','"OWN__NOT__FOREIGN"','"owner"','"phase"','"gesamtPunkte":',
                  '"greenMin":','"greenMax":','"currentIndex":','"vorrat":','"regler":','"fleisch"','"punkte"','"obst"','"resourcen":','"gesteigert":','"foreign":'
                  ,'"advice":','"phasen":','"'+DP_EI+'"','"'+DP_BABY+'"','"'+DP_KIND+'"','"'+DP_TEEN+'"','"'+DP_TWEN+'"','"'+DP_ERWACHSEN+'"'];
        var i;
        
        var special="\ue111";
        for (i=0;i<keys.length;i++) {
                //var shortform=special+i.toString(36);
                shortform=String.fromCharCode(0xe010+i);
                if (towards) {
                        search=keys[i];
                        replace=shortform;
                } else {
                        search=shortform;
                        replace=keys[i];
                }                
                text=text.replace(new RegExp(search,'g'),replace);
        }
        return text;
    },    

    letItBeNight : function  () {
        var root="http://serv.endoftheinternet.org/dragosien/theme/night/";
        Toolbox.appendCSSRule("#mainVillageDrachenzucht { background-image: url("+root+"bg_village03dzucht.jpg)}");
        Toolbox.appendCSSRule("#mainVillage { background-image: url("+root+"bg_village03.jpg) }");
        //Toolbox.appendCSSRule("div.tower a { background-image: url("+root+"tor.png) !important}");
        Toolbox.appendCSSRule("div.status.pause { background-image: url("+root+"b_pause.png) }");     
        Toolbox.appendCSSRule("div.status.progress { background-image: url("+root+"b_progress.png) }");
        Toolbox.appendCSSRule("div.building,div.tower a { background-image: url("+root+"gebaeude_sprite100x100.png) }");
        Toolbox.appendCSSRule("div.drachenzucht {background-image:none}");
        Toolbox.appendCSSRule("div.bauplatz_drachenzucht {background-image:none}");
        
    },
    
    prodPerH : function (oldX,newX,oldTime,newTime) {
        //    Toolbox.addRight("time:"+ ((newTime-oldTime)/60000));
        var ratio=(60*(newX-oldX))/((newTime-oldTime)/60000);
        return ratio;
    }
}

Ausbau = {
    fixAusbau : function  () {
        if (lager['ausbau']) {//Old one
            if (lager['ausbau']['name']) {
                Toolbox.addRight("Konvertiere alten Ausbau");
                var temp=lager.ausbau;
                temp.active=true;
                lager.ausbau=[];
                lager.ausbau.push(temp);
            }
            if (lager.ausbau.length==0) {
                lager.ausbau=null;
            }
        }
    },
    
    clearAusbauPos : function  (pos) {
        Ausbau.fixAusbau();
        var toRemove=-1;
        if (lager.ausbau!=null) {
            for (i=0;i<lager.ausbau.length;i++) {
                if (lager.ausbau[i]._pos==pos) 
                    {
                        toRemove=i;
                    }
            }
            if (toRemove!=-1) {
                Toolbox.addRight("Found smth. to remove : #"+toRemove);
                Toolbox.addRight("length:"+lager.ausbau.length);
                lager.ausbau.splice(toRemove,1);
                Toolbox.addRight("length:"+lager.ausbau.length);
            }
        }
        Ausbau.fixAusbau();
        storage.setItem("GS_lager",JSON.stringify(lager));
    },
    
    clearAusbau : function (name) {
        Ausbau.fixAusbau();
        var toRemove=-1;
        if (lager.ausbau!=null) {
            for (i=0;i<lager.ausbau.length;i++) {
                if (lager.ausbau[i].name==name) 
                    {
                        toRemove=i;
                    }
            }
            if (toRemove!=-1) {
                //            Toolbox.addRight("Found smth. to remove : #"+toRemove);
                //Toolbox.addRight("length:"+lager.ausbau.length);
                lager.ausbau.splice(toRemove,1);
                //Toolbox.addRight("length:"+lager.ausbau.length);
            }
        }
        Ausbau.fixAusbau();
        storage.setItem("GS_lager",JSON.stringify(lager));
    },
    
    setAusbau : function  (rohstoffe,name,umbau) {
        Toolbox.addRight("Ausbau/Umbau für "+name+ "++");
        // remove an old ausbau on the same name
        Ausbau.clearAusbau(name);
        Ausbau.fixAusbau();
        var temp=rohstoffe;
        if (rohstoffe) {
            temp["name"]=name;
            if (umbau) {
                temp["umbau"]=umbau;
            }
        }
        if (activeGebaudePosition!=null) {
            temp._pos=activeGebaudePosition;
	    //Toolbox.addRight("position => "+temp._pos);
	    //Toolbox.addRight("renovierung => "+gebaude[temp._pos]["renovierung"]);
        }
        temp.active=true;
        if (rohstoffe==undefined) {
            rohstoffe={};
        } else {
            if (lager["ausbau"]==null)
                {
                    lager["ausbau"]=[];
                }
            lager.ausbau.push(temp);
        }
        storage.setItem("GS_lager",JSON.stringify(lager));
        Ausbau.markAllAusbau();
    },
    
    ausbauMarked : function  (event) {
        var num=parseInt(this.name.substring(6));
        lager.ausbau[num].active=this.checked;
        storage.setObject("GS_lager",lager);
        Ausbau.markAllAusbau();
    },
    
    markAllAusbau : function  (redisplay) {
        if (redisplay!==false)  {
            redisplay=true;
        }
        var detail=document.getElementById('ausbauMarkerDetail');
        if (redisplay) {
            Toolbox.clearChildren(detail);
        }
        var rohstoffe={};
        Ausbau.fixAusbau();
        var i=0;
        //    alert("add to "+detail);
        if (redisplay) {
            var table=Toolbox.addElement(detail,"table");
            
        }
        var rohstoffe={};
        unsafeWindow.GS_lager=lager;
        if (lager.ausbau) {
            for (i=0;i<lager.ausbau.length;i++) {
                detailRow=detailTable[i];
                if (redisplay) {
                    var tr=Toolbox.addElement(table,"tr");
                    var td=Toolbox.addElement(tr,"td");
                    var checkbox=Toolbox.addElement(td,"input");
                    checkbox.type="checkbox";
                    checkbox.name="ausbau"+i;
                    var mainText=Toolbox.addElement(tr,"td");
                    var nextTr=Toolbox.addElement(table,"tr");
                    var nextTrTd=Toolbox.addElement(nextTr,"td");
                    var nextTrTd=Toolbox.addElement(nextTr,"td");
                    nextTrTd.colSpan=2;
                    var posLink=null;
                }
                var stoff;
                if (lager.ausbau[i].active) {
                    rohstoffe=Toolbox.mergeRohstoffe(rohstoffe,lager.ausbau[i]);
                    if  (redisplay) {
                        checkbox.checked='checked';
                    }
                } else {
                    //                rohstoffe=addZeroRohstoffe(rohstoffe,lager.ausbau[i]);
                }

                if (redisplay) {
                    var needs="";
                    for (stoff in lager.ausbau[i])
                        {
                            if (lager[stoff]!=null) {
                            needs=needs+" "+lager.ausbau[i][stoff]+" "+Toolbox.prettyStoff(stoff);
                            }
                        }
                    var gold=Toolbox.minMaxGold(lager.ausbau[i]);
                    Toolbox.addElement(nextTrTd,"span","("+Toolbox.printNum(gold.Ubuy)+" Gold)");
                    mainText.title=needs;
                    checkbox.addEventListener('change',Ausbau.ausbauMarked,true);
                    if (lager.ausbau[i]["drache"]) {
                        Toolbox.addElement(mainText,"span","Steigerung von Drache ");
                        posLink=Toolbox.addElement(mainText,"a",lager.ausbau[i]["name"]);
                        Toolbox.addElement(mainText,"span"," vorgemerkt.");
                    } else {
                        if (lager.ausbau[i]["umbau"]) {
                            if (lager.ausbau[i]["name"]=="NEU") {
                                Toolbox.addElement(mainText,"span","Neubau von ");
                                posLink=Toolbox.addElement(mainText,"a",lager.ausbau[i]["umbau"]);
                                Toolbox.addElement(mainText,"span"," vorgemerkt.");
                            } else if (lager.ausbau[i]["umbau"]=="renovieren") 
			    {
			       Toolbox.addElement(mainText,"span","Renovierung von");
			       posLink=Toolbox.addElement(mainText,"a",lager.ausbau[i]["name"]);
			       Toolbox.addElement(mainText,"span"," vorgemerkt.");
			    }
			     else {
                                Toolbox.addElement(mainText,"span","Umbau von ");
                                posLink=Toolbox.addElement(mainText,"a",lager.ausbau[i]["name"]);
                                Toolbox.addElement(mainText,"span"," zu "+lager.ausbau[i]["umbau"]+" vorgemerkt.");
                            }
                        } else {
                            Toolbox.addElement(mainText,"span","Ausbau von ");
                            posLink=Toolbox.addElement(mainText,"a",lager.ausbau[i]["name"]);
                            Toolbox.addElement(mainText,"span"," vorgemerkt.");
                        }
                    }
                    if (lager.ausbau[i]._pos) {
                        posLink.className='inline';
                        posLink.href='/?t=building&'+lager.ausbau[i]._pos;
                    }
                    if (lager.ausbau[i]._drachenid) {
                        posLink.className='inline';
                        posLink.href='/?t=drachenhorst&tab=1&did1='+lager.ausbau[i]._drachenid;
                    }
                    var remove=Toolbox.addElement(tr,"td","[del]");
                    remove.id='del'+i;
                    remove.style.color='red';
                    remove.addEventListener('click',function(event) {
                            var num=parseInt(this.id.substring(3));
                            lager.ausbau.splice(num,1);
                            if (lager.ausbau.length==0) {
                                lager.ausbau=null;
                            }
                            storage.setObject("GS_lager",lager);
                            Ausbau.markAllAusbau();
                        },true);
                }
            }
        }
        tr=Toolbox.addElement(table,"tr");
        var totalCost=Toolbox.addElement(tr,"td","...");
        totalCost.id="marker_totalCost";
        totalCost.colSpan=3;
        Ausbau.markAusbau(rohstoffe,lager.ausbau);
        if (markMarktAusbau!=undefined)
            {
                markMarktAusbau(rohstoffe);
            }
    },

    markAusbau : function  (rohstoffe,ausbauListe) {
        var buySum=0;
        var buyNeeded=0;
        var lagerWert=0;
        var exceeds=false;
        var allAvail=(parseInt(lager["gold"])>=parseInt(rohstoffe["gold"]));
        for (stoff in rohstoffe) {
            if (stoff[0]!="_") {
                if (!stoffRows[stoff] && stoff!="name" && stoff!="umbau" && stoff!="gold") {
                    Toolbox.addDebug(Toolbox.prettyStoff(stoff)+" fehlt in Lagerliste");
                    allAvail=false;
                }
            }
        }
        for (stoff in stoffRows) {
            var tr=stoffRows[stoff];
            var toStyle=tr.cells[1];
            var bestand=lager[stoff];
            //        Toolbox.addDebug("++ "+stoff+"//"+bestand);
            if (rohstoffe[stoff]) {
                Toolbox.addDebug("Ausbau::"+stoff+": "+rohstoffe[stoff]+" // "+lager.capacity);
                tr.style.visibility="visible";
                if ((rohstoffe[stoff]>lager["capacity"])) {
                    Toolbox.addDebug(stoff+" reicht nicht für vorgemerkten ausbau ("+rohstoffe[stoff]+">"+lager.capacity);
                    exceeds=true;
                }
                var tooltip="";
                if (market[stoff]) {
                    tooltip=market[stoff]["buy"]+"|"+market[stoff]["sell"]+" ";
                }
                tooltip+="( "+rohstoffe[stoff]+" benötigt";
                //Toolbox.addRight(rohstoffe[stoff]+" von "+stoff);
                if (rohstoffe[stoff]>bestand) {
                    allAvail=false;
                    toStyle.style.color=config["COLOR_NEED"];
                    var bedarf=rohstoffe[stoff]-bestand
                        tooltip+=", "+(bedarf)+" fehlen";
                    if (market[stoff]) {
                        buySum+=bedarf*market[stoff]["buy"];
                        if (!produktion[stoff]) {
                            buyNeeded+=bedarf*market[stoff]["buy"];
                        }
                    }
                } else {
                    toStyle.style.color=config["COLOR_AVAIL"];
                    tooltip+=", "+(bestand-rohstoffe[stoff])+" verfügbar";
                    lagerWert+=(bestand-rohstoffe[stoff])*market[stoff]["sell"];
                }
                tooltip+=")";
                tr.childNodes[1].title=tooltip;
            } else {
                if (market[stoff]) {
                    lagerWert+=bestand*market[stoff]["sell"];
                } 
                if (tr.className.indexOf('collapseable')!=-1) {
		    if (thisIsFF) {
                      tr.style.visibilty='collapse';
		    } else {
		      tr.style.display='none';
		      }
                }
                toStyle.style.color='#000';
            }
        }
        if (rohstoffe||ausbauListe) {
            if (exceeds) {
                ausbauMarkerImg.src="http://serv.endoftheinternet.org/star_red.png";
            } else if (allAvail) {
                ausbauMarkerImg.src="http://serv.endoftheinternet.org/star.png";
            } else {
                ausbauMarkerImg.src="http://serv.endoftheinternet.org/star_bw.png";
            }
            ausbauMarker.style.display="block";
            var minMaxCalc=Toolbox.minMaxGold(rohstoffe);
            var marker=document.getElementById("marker_totalCost");
            marker.textContent="Kosten um alles zu kaufen "+Toolbox.printNum(minMaxCalc["Ubuy"]);
            lagerWert=" ("+Toolbox.printNum(lagerWert)+")";
        } else {
            ausbauMarker.title="";
            ausbauMarker.style.display="none";
            lagerWert="";
        }
        if (lagerWert2) {
            lagerWert2.firstChild.data=lagerWert;
        }
    },

    analyseGebaude : function  (info) {
        var sum=0;
        var sum2=0;
        var txt="";
        var txt2="";
        var usum=0;
        var usum2=0;
        var result={};
        market['drachenei']={'buy':0,'sell':0};
        if (info.prod.stoff && market[info.prod.stoff]) {
            sum=info["prod"]["anzahl"]*market[info["prod"]["stoff"]]["sell"] ;
            if (market[info["prod"]["stoff"]]["sell"]>market[info["prod"]["stoff"]]["Usell"]) {
                usum=sum;
            } else {
                usum=info["prod"]["anzahl"]*market[info["prod"]["stoff"]]["Usell"];
            }
            txt+=info["prod"]["anzahl"]+"*"+market[info["prod"]["stoff"]]["sell"];
            result["prodW"]=sum;
            result["prodT"]=txt;
            result["UprodW"]=parseInt(100*usum)/100;
            var changed=0;
            var sum2=sum;
            var usum2=usum;
            for (stoff in info["need"]) {
                if (market[stoff]) {
                    sum-=info["need"][stoff]*market[stoff]["buy"];
                    sum2-=info["need"][stoff]*market[stoff]["sell"];
                    usum-=info["need"][stoff]*market[stoff]["Ubuy"];
                    usum2-=info["need"][stoff]*market[stoff]["Usell"];
                    txt+="-"+info["need"][stoff]+"*"+market[stoff]["buy"];
                    changed=1;
                }
            }
            sum=parseInt(100*sum)/100;
            sum2=parseInt(100*sum2)/100;
            usum=parseInt(100*usum)/100;
            usum2=parseInt(100*usum2)/100;
            if (changed) {
                result["mitEinkauf"]=sum;
                result["mitEinkaufT"]=txt;
                result["mitEigenProd"]=sum2;
                result["UmitEinkauf"]=usum;
                result["UmitEigenProd"]=usum2;
            }
        }
        return result;
    }    
}

Market = {
    workMarketLog : function  () {
        return;
    },
    
    workMarketUebersicht : function  () {
        Toolbox.addDebug("Übersicht!!");
        lager["angebote"]=new Array();
        lager["nachfragen"]=new Array();
        div=Toolbox.getByXPath("//*[@id=\"drag_box\"]");
        //matches=table.textContent.match(/([0-9.]+)\s+(\S+)\s+f..?r\s+(\d+)\s+Gold/ig):
        lager.angebote=[];
        lager.nachfragen=[];
	var workSubTable=function(table,array) {
	   for (ri=1;ri<table.rows.length;ri++) {
	      var found=table.rows[ri].textContent.match(/(\d+)\s+(\S+)\s+für\s+(\d+)\s+Gold/);
	      if (found) {
			var stoff=Toolbox.parseStoff(found[2]);
			var zahl=Toolbox.parseNumber(found[1]);
			var preis=Toolbox.parseNumber(found[3]);                     
			var idmatch=table.rows[ri].innerHTML.match(/getback(?:Demand|Market)\('(\d+)'/);
			var angebot={};
			if (idmatch) {
				angebot["id"]=idmatch[1];
			}
			angebot["stoff"]=stoff;
			angebot["zahl"]=zahl;
			angebot["preis"]=preis;
			array.push(angebot);
	      }
	    }
	}
       
	for (i=0;i<div.childNodes.length;i++) {
		 if (div.childNodes[i].tagName=="TABLE") {
			 var table=div.childNodes[i];
			 var heading=table.rows[0].textContent;
			 if (heading.indexOf("Eigene Angebote")!=-1) {
		workSubTable(table,lager.angebote);
	 }
			 if (heading.indexOf("Eigene Nachfragen")!=-1) {
		workSubTable(table,lager.nachfragen);
	 }  
	 }
	}    
    },
    
    addMarktAusbau : function  (theTable) {
        var tr=document.createElement('tr');
        theTable.tBodies[0].insertBefore(tr,theTable.rows[2]);
        var td=Toolbox.addElement(tr,"td");
        td.colSpan=4;
        var doNeedSpan=Toolbox.addElement(td,"span");
        doNeedSpan.style.cssFloat="right";
        
        markMarktAusbau = function(rohstoffe) {
            profileStart("MARK_MARKT_AUSBAU");
            unsafeWindow.totalAusbauRohstoffe=rohstoffe;
            //TODO
            Toolbox.clearChildren(doNeedSpan);
            if ((rohstoffe[marktStoff])&&((lager[marktStoff]-rohstoffe[marktStoff])<0)) {
            var number=Toolbox.addElement(doNeedSpan,"a",Toolbox.printNum(rohstoffe[marktStoff]-lager[marktStoff]));
            number.style.textDecoration="underline";
            number.style.cursor="pointer";
            number.addEventListener("click",function() {
                var count=this.textContent.replace(/\./g,"");
                var thisCount;
                if (urequestInput) {
                    urequestInput.value=count;
                }
                for (_key in buyFromLines) {
		    row=buyFromLines[_key];
                    var xInput=row.cells[2].childNodes[1];
                    thisCount=Toolbox.parseNumber(document.getElementById('c'+xInput.id).textContent);
                    if (thisCount>count) {
                        thisCount=count;
                    }
                    
                    xInput.value=thisCount;

                    var xPrice=Toolbox.parseNumber(row.cells[1].textContent.replace("für",""));
                    document.getElementById('b'+xInput.id).firstChild.data=xPrice*thisCount;
                }
            },true);
            Toolbox.addElement(doNeedSpan,"span"," benötigt");
            }
        profileEnd("MARK_MARKT_AUSBAU");
        }    
    }, 
    
    workBuySellTable : function  (buyTable,angebot,rohstoff) {
        profileStart("buySell"+(angebot?"T":'F'));
        var toAdd={};
        var currentPrice=0;
        var currentSum=0;
        var beforeSum=0;
        var ignored=0;
        var cheapest=true;
        var T_verb=angebot?"angeboten":"nachgefragt";
        var T_buysell=angebot?"Ubuy":"Usell";
        var T_nomen=angebot?"Angebot":"Nachfrage";
        var number=0;
        var ownLines=[];
        var totalSum=0;
        var totalCount=0;
        var sums=[];
        var medium=(market[rohstoff].buy+market[rohstoff].sell)/2;
        var completeUsers=config["MARKT_HIGHLIGHT_NAMES"];
        var lastCell=null;
        if (config["COLOR_MARKT_HIGHLIGHT_GUILD"]!="" && config["MARKT_HIGHLIGHT_NAMES_GUILD"]) {
            var guildusers=config["MARKT_HIGHLIGHT_NAMES_GUILD"].split(/ /);
            for (key in guildusers) {
	        guilduser=guildusers[key];
                completeUsers=guilduser+"*"+config["COLOR_MARKT_HIGHLIGHT_GUILD"]+" "+completeUsers;
                }
        }
        
        for (ri=0;ri<buyTable.rows.length;ri++) {
            var row=buyTable.rows[ri];
            if (row.cells.length==1) {
                lastCell=row.cells[0];
            }
            if (row.cells.length==4) {
                number++;
                var countTD=row.cells[0];
                var priceTD=row.cells[1];
                var userTD=row.cells[3];
                if (angebot) {
                    buyFromLines.push(row);
                }
                var count=Toolbox.parseNumber(countTD.textContent);
                var price=Toolbox.parseNumber(priceTD.textContent.replace("für",""));
                var txt="(";
                if (price>medium) {
                        txt=txt+"+";
                };    
                txt=txt+(price-medium)+")";
                priceTD.title=txt;
                var user=userTD.textContent.match(/\S*/)[0];
                var buySellField=row.cells[2];
                if (user==userName) {
                    var idmatch=row.cells[3].innerHTML.match(/getback(?:Market|Demand)\('(\d+)'/);
                    var id=null;
                    if (idmatch) {
                        id=idmatch[1];
                    }
                    ownLines.push({"stoff":rohstoff,
                               "zahl":count,
                               "preis":price,
                               "id":id});
                }
                var xxlink=Toolbox.getByXPath("a",buySellField);
                if (xxlink) {
                    xxlink.addEventListener("click",angebot?clickBuy:clickSell,true);
                }
                if (Toolbox.isEnabled("MARKT_BLOED")&&((angebot && price>market[rohstoff].buy)||
                    (!angebot && price<market[rohstoff].sell))) {
                    priceTD.style.color='red';
                    if (xxlink) {
                        xxlink.style.fontSize='30%';
                        xxlink.style.textDecoration='line-through';
                    }
                }    
               if (Toolbox.isEnabled("MARKT_HIGHLIGHT")) {
                    var users=completeUsers.split(/ /);
                    for (test in users) {
                        color=config["COLOR_MARKT_HIGHLIGHT"];
                        var userToTest=users[test];
                        if (userToTest.indexOf("*")!=-1) {
                            var splitAgain=userToTest.split(/\*/);
                            userToTest=splitAgain[0];
                            color=splitAgain[1];
                        }
                        if (userToTest.toLowerCase()==user.toLowerCase()) {
                            if (color!="ignore") {
                                userTD.style.borderRight="4px solid "+color; 
                                countTD.style.borderLeft="4px solid "+color;
                                countTD.style.paddingLeft="2px";
                            } else {
                                ignored++;
                                row.style.display="none";
                            }
                        }
                    }
                }    
                //        Toolbox.addDebug(countTD.textContent+"//"+priceTD.textContent+"//"+userTD.textContent);
                //  Toolbox.addDebug(count+"//"+price+"//'"+user+"'");
                //  Toolbox.addDebug(currentPrice+" () "+currentSum);
                if (user==userName) {
                    beforeSum=currentSum;
                }            
                if (currentPrice && price!=currentPrice) {
                    sums.push({'count':currentSum,'price':currentPrice});
                    totalCount+=currentSum;
                    totalSum+=currentSum*currentPrice;
                    if (Toolbox.isEnabled("MARKT_SUM")) {
                        var tr=document.createElement("tr");
                        var text="\u2211 "+currentSum+ " Stück für "+currentPrice+" Gold "+T_verb;
                        if (beforeSum) {
                            text+="; "+beforeSum+" St. vor dem eigenen "+T_nomen;
                        }
                        var td=Toolbox.addElement(tr,"td",text);
                        if (ignored) {
                            var link=Toolbox.addElement(td,"a",""+ignored+" ignoriert");
                            link.href="#";
                            link.classname="navi";
                            ignored=0;
                        }
                        td.colSpan=4;
                        td.style.textAlign="right";
                        //Toolbox.addDebug(td.textContent);
                        toAdd[currentPrice]={};
                        toAdd[currentPrice]["before"]=row;
                        toAdd[currentPrice]["row"]=tr;
                    }
                    currentPrice=price;
                    currentSum=0;
                    beforeSum=0;
                    cheapest=false;
                }
                if (!cheapest) {
                    //   row.style.color="#942";
                }
                currentPrice=price;
                currentSum+=count;
            }
        }
        if (currentSum) {
            sums.push({'count':currentSum,'price':currentPrice});
            totalCount+=currentSum;
            totalSum+=currentSum*currentPrice;
        }
        if (currentSum && Toolbox.isEnabled("MARKT_SUM")) {
            var more=(ri==19);
            tr=Toolbox.addElement(buyTable,"tr");
            var text="\u2211 "+currentSum+(more?"++":"")+" Stück für "+currentPrice+" Gold "+T_verb;
            if (beforeSum) {
                text+="; "+beforeSum+" St. vor dem eigenen "+T_nomen;
            }
            var td=Toolbox.addElement(tr,"td",text);
            td.colSpan=4;
            td.style.textAlign="right";
        }
        text="Durchschnitts Preis: "+(parseInt(100.0*totalSum/totalCount)/100)
        var tr=Toolbox.addElement(buyTable,"tr");
        var td=Toolbox.addElement(tr,"td",text);
        td.colSpan=4;
        td.style.textAlign="right";
        market[rohstoff][T_verb]=sums;
        if (totalCount) 
        {
	   market[rohstoff][T_buysell]=totalSum/totalCount;
	} else 
        {   //überhaupt keine angebote/nachfragen!
	   market[rohstoff][T_buysell]=market[rohstoff][T_buysell.substr(1)];
	}
        var rubrik=angebot?"angebote":"nachfragen";
        //TODOHERE: FAILS when lager[rubrik] is not present. 
        var currentKnownRows=Toolbox.countStoff(lager[rubrik],rohstoff);
        var mark1=Toolbox.getByXPath("a[1]",lastCell);
        var mark2=Toolbox.getByXPath("a[2]",lastCell);
        unsafeWindow.mark1=mark1;
        unsafeWindow.mark2=mark2;
        var id1=null;
        var id2=null;
        if (mark1) {
            id1=mark1.getAttribute('onclick').match(/'(\d+)'/)[1];
        }
        if (mark2) {
            id2=mark2.getAttribute('onclick').match(/'(\d+)'/)[1];
        }
        if  ((ownLines.length==2) | (ownLines.length==1 && mark2==null) | (ownLines.length==0 && mark1==null)) {
            //okay, Got all own lines.
            if (lager && lager[rubrik]) {
                Toolbox.addDebug("Übernehme Daten in "+rubrik);
                lager[rubrik]=Toolbox.removeStoff(lager[rubrik],rohstoff);
                for (ri=0;ri<ownLines.length;ri++) {
                    lager[rubrik].push(ownLines[ri]);
                }
            }
        } else if (ownLines.length==1 && currentKnownRows<2 && mark2!=null) {
            // Okay, it MIGHT be a new one...
            Toolbox.addDebug("Might be new. ...");
            if (Toolbox.countStoff(lager[rubrik],rohstoff,ownLines[0].id)==0) {
                Toolbox.addRight("is new -adding");
                lager[rubrik].push(ownLines[0]);
            }
        } else if ((currentKnownRows==2 && mark2==null)|| (currentKnownRows>0 &&mark1==null)) {
            //i know more rows than there are left... delete when needed
            //id might be set or null.
            Toolbox.addDebug("Something is deleted, keep "+id1);
            lager[rubrik]=Toolbox.removeStoff(lager[rubrik],rohstoff,id1);
        }
        unsafeWindow.toAdd=toAdd;
        unsafeWindow.users=angebotUsers;
        for (price in toAdd) {
            //        Toolbox.addRight(price+"  XX");
            toAdd[price]["before"].parentNode.insertBefore(toAdd[price]["row"],toAdd[price]["before"]);
        }
        profileEnd("buySell"+(angebot?"T":'F'));
    }
}

Chat = {
    clickNick : function  () {
        var chatLine=document.getElementById("chat_message");
        chatLine.value=chatLine.value+"@"+this.textContent+" ";
        chatLine.focus();
        
    },
    
    mutateChat : function  () {
        if (!modifierActive) {
            var startT=new Date().getTime();
            modifierActive=true;
            this.innerHTML=this.innerHTML.replace(/(http:\/\/[^ <]*)\b/g,"<a href='$1' target='new'>$1</a>");
            var regExp=new RegExp("("+userName+")(?!:</b>)","ig");
            this.innerHTML=this.innerHTML.replace(regExp,"<span style='color:"+config["COLOR_NICK"]+"'>$1</span>");
            for (i=0;i<this.childNodes.length;i++) {
                if (this.childNodes[i].tagName=="B") {
                    this.childNodes[i].addEventListener("click",Chat.clickNick,false);
                } 
            }

            var endT=new Date().getTime();
            if (config["debug"]){
                Toolbox.addElement(this,"span",(endT-startT)+" ms");
            }
            modifierActive=false;
        }
    }
}

Drachen = {
    workDrachenHorst : function  () {
       var drachenId=document.URL.match(/did1=([0-9]*)/);
       if (drachenId) {
           drachenId=drachenId[1];
       }
       var drachenObjekt=persistent.data.drachen[drachenId];
       if (drachenObjekt==null) {
           drachenObjekt={'currentIndex':0,'phasen':[]};
           persistent.data.drachen[drachenId]=drachenObjekt;
           persistent.updateLocally();
       }
       Toolbox.addDebug("DrachenID:"+drachenId);   
       if (drachenId==null) {
           Toolbox.addRight("ABBRUCH - kann Drache nicht erkennen!");
           return;
       }

       var drag_box=document.getElementById('drag_box');
       var mainText=Toolbox.getByXPath("div[2]",drag_box);
       var mainTextAdd=Toolbox.getByXPath("div[2]",drag_box);
       //real ugly hack. :-(
       var xxBox=Toolbox.getByXPath("div[3]",drag_box);
       if (xxBox==null) {
           xxBox=Toolbox.getByXPath("div[2]",drag_box);
           mainText=drag_box;
       }
       mainTextAdd=document.createElement("div");
       mainText.appendChild(mainTextAdd);
       //drag_box.insertBefore(mainTextAdd,Toolbox.getByXPath("ul",drag_box));
       unsafeWindow.mainTextAdd=mainTextAdd;
       var gesamtPunkte=drag_box.textContent.match(/Gesamtpunkte: (\d+)/);
       var drachenPhase=Toolbox.parsePhase(mainText.textContent);
       var doItLink=null;
       var doItNr=null;
       var tabs=Toolbox.getByXPath("ul",drag_box);
       var log_li=Toolbox.addElement(tabs,"li");
       var log_a=Toolbox.addElement(log_li,"a","Log");
       log_a.className="inactive";
       log_a.style.cursor="pointer";
       log_a.style.width="4em";
       log_a.addEventListener("click",function(){Drachen.showLogbuch(tabs,drachenObjekt);},true);
       unsafeWindow.mainText=mainText;
       drachenName=mainText.textContent.match(/^\s*(\S*)/);
       besitzer=mainText.textContent.match(/Besitzer: *([^[]*)\[/);
       if (besitzer) {
           besitzer=besitzer[1];
           besitzer=besitzer.replace(/\u000a|\u0009/g,"");
           Toolbox.addRight("Besitzer: "+besitzer);
       }
       if (drachenName) {
           drachenName=drachenName[1];
       }
       if (drachenPhase!=DP_READY && !drachenObjekt.foreign) {
           if (besitzer) {
               drachenObjekt.foreign=besitzer;
           } else {
               drachenObjekt.foreign=OWN_DRAGON;
           }
           persistent.updateLocally();
       }
       Toolbox.addDebug("Phase :"+drachenPhase);
       // Phase hat sich geändert ==> Neue Phase begonnen?!
       // DP_READY selbst ist noch keine änderung...
       if (drachenPhase != DP_READY &&
           drachenObjekt.phasen[drachenObjekt.currentIndex] &&
           drachenObjekt.phasen[drachenObjekt.currentIndex].phase!=drachenPhase) {
           drachenObjekt.currentIndex++;
       }
       if  (drachenObjekt.currentIndex>=drachenObjekt.phasen.length && drachenPhase == DP_READY && drachenObjekt.currentIndex>0) {
           // If somehow someone managed it to trigger an index update, but drachenPhase is still READY... ignore.
           drachenObjekt.currentIndex--;
       }
       if (drachenObjekt.currentIndex>=drachenObjekt.phasen.length) {
           drachenObjekt.phasen.push({'phase':drachenPhase,
                       'update':-1,
                       'resourcen':[],
                       'gesamtPunkte':null,
                       'advice':[],
                       'punkte':[],
                       'regler':[],
                       });
       };
       while (drachenObjekt.currentIndex>=drachenObjekt.phasen.length) {
          drachenObjekt.currentIndex=drachenObjekt.phasen.length-1;
       }
       currentPhase=drachenObjekt.phasen[drachenObjekt.currentIndex];
       if (gesamtPunkte) {
           currentPhase.gesamtPunkte=parseInt(gesamtPunkte[1]);
           //Toolbox.addRight("***"+currentPhase.gesamtPunkte);
       }
       if (drachenPhase!=DP_READY) {
           currentPhase.name=drachenName;
       } else {
           drachenname=currentPhase.name;
           doItNr=document.getElementById('nextAgeNr');
           doItLink=Toolbox.getByXPath("a",drag_box);
           if (doItLink) {
               doItLink.addEventListener("click",function() {
                   //               alert("Steigerung erkannt!"+drachenId+"///"+currentPhase);
                   doItNr=document.getElementById('nextAgeNr');
                   if (doItNr) {
                       currentPhase["gesteigert"]=doItNr.value;
                   }
                   persistent.data.drachen[drachenId].currentIndex++;
                   //storage.setObject('GS_drachen',drachen);
                   persistent.updateRemote();
                   //storage.setObject('GS_persistent',persistent);
               },true);
               //              Toolbox.addDebug("Steigern! modifiziert");
           }
       }
       if (currentPhase.greenMin==undefined) {
           currentPhase.greenMin=[];
           currentPhase.greenMax=[];
       }
       unsafeWindow.drachenObjekt=drachenObjekt;
       currentPhase.update=currentTime;
       var i=0;
       var minCost=0;
       var maxCost=0;
       var rohstoffNum=0;
       var foundIt=0;
       for (i=0;i<xxBox.childNodes.length;i++) {
           var node=xxBox.childNodes[i];
           if (node.tagName=='TABLE') {
               foundIt=1;
               var rulerDiv=Toolbox.getByXPath("div[2]",node.rows[0].cells[0]);
               //           Toolbox.addRight(rulerDiv+" *");
               unsafeWindow.xx=rulerDiv;
               var img1=Toolbox.getByXPath("img[1]",rulerDiv);
               var img2=Toolbox.getByXPath("img[2]",rulerDiv);
               var img3=Toolbox.getByXPath("img[3]",rulerDiv);
               var pos=Toolbox.getByXPath("img[4]",rulerDiv);
               var minPos=img1.width+2;
               var maxPos=minPos+img2.width/2;
	       Toolbox.addRight(node.rows[1].cells[0].textContent);
               var apply=node.rows[1].cells[0].textContent.trim().match(/ *([0-9.]+) *(\S*) */);
	       var doneSoFar=node.rows[2].cells[0].textContent.match(/Bisher bereitgestellt: *(\d+)/)
               var stoff=Toolbox.parseStoff(apply[2]);
               var currentNum=Toolbox.parseNumber(apply[1]);
               if (!currentPhase.resourcen[rohstoffNum]) {
                   currentPhase.resourcen[rohstoffNum]={'rohstoff':stoff,'anzahl':0};           
               } else {
                   if (currentPhase.resourcen[rohstoffNum].rohstoff!=stoff) {
                       Toolbox.addRight("Rohstoffe haben sich geändert...! Neue Phase begonnen!");
                       drachenObjekt.currentIndex++;
                       persistent.updateRemote();
                       break;
                   }
               }
	       currentPhase.resourcen[rohstoffNum].anzahl=Toolbox.parseNumber(doneSoFar[1])
               currentPhase.resourcen[rohstoffNum].vorrat=currentNum;
               var currentPunkte=node.rows[0].cells[0].textContent.match(/(\d+)/);
               if (currentPunkte) {
                   currentPhase.punkte[rohstoffNum]=Toolbox.parseNumber(currentPunkte[1]);
               }
               var currentPos=parseInt(pos.title);
               currentPhase.regler[rohstoffNum]=currentPos;
               currentPhase.greenMin[rohstoffNum]=minPos;
               currentPhase.greenMax[rohstoffNum]=maxPos;
	       Toolbox.addRight(node.rows[2].cells[0].textContent);
               var advice=node.rows[2].cells[0].textContent.match(/ ([0-9.]+) /);
               currentPhase.advice[rohstoffNum]=parseInt(advice[1]);
	       
               minCost+=parseInt(advice[1]*(market[Toolbox.parseStoff(apply[2])]['Ubuy']));           //           maxCost+=advice[1]*(market[Toolbox.parseStoff(apply[2])]['buy']+market[Toolbox.parseStoff(apply[2])]['sell'])/2;
	       var  putinto=document.getElementById("greasemonkey_"+(1+rohstoffNum));
               Toolbox.addElement(putinto,"span","("+minPos+"-"+maxPos+",aktuell: "+(currentPhase.regler[rohstoffNum])+")");
	       var regler=document.getElementById("current_"+(1+rohstoffNum));
	       regler.title=regler.title+" Grüner Bereich:("+minPos+"-"+maxPos+")";
               var bisherText=Toolbox.addElement(putinto,"span"," Bisher eingesetzt: "+(currentPhase.resourcen[rohstoffNum].anzahl - currentNum)+". ("+Toolbox.printNum((currentPhase.resourcen[rohstoffNum].anzahl - currentNum)*100/parseInt(advice))+"%)");
               bisherText.id="bisherText"+i;
               var tooltip=Toolbox.Tooltip.createToolTip(bisherText,"Bisher eingesetzt - die bisher verbrauchte Menge");
               Toolbox.addElement(tooltip,"div","Insgesamt sind "+Toolbox.printNum((currentPhase.resourcen[rohstoffNum].anzahl )*100/parseInt(advice))+"% der vorgeschlagenen Menge vorhanden");
               var thirdSpan=Toolbox.addElement(putinto,"span"," ");
               var xxElement=Toolbox.addElement(thirdSpan,"span","???");
               xxElement.id=rohstoffNum+'NEEDED';
               Toolbox.addElement(thirdSpan,"span"," noch nötig");
               rohstoffNum++;
           }
       }
       if (foundIt) {
           var xxDiv=Toolbox.addElement(mainTextAdd,"div");
           xxDiv.style.marginTop="1ex";
           Toolbox.addElement(xxDiv,"br");
           taralasLink=null;
           {
               Toolbox.addElement(xxDiv,"span","In der Ecke siehst du einen seltsamen Typ, der tatsächlich Fensterscheiben auf einem Gestell auf seiner Nase befestigt hat! Während du noch überlegst was das soll kommt er auf dich zu und fragt dich: »Ich bin mir sicher das die Berechnungen nicht ganz korrekt sind, wieviel Reserve möchtest du berücksichtigen?«");
               var overDrive=Toolbox.addElement(xxDiv,"input");
               overDrive.style.marginLeft="1em";
               if (config["overdrive_drachen"]) {
                   overDrive.value=config["overdrive_drachen"];
               } else {
                   overDrive.value="5";
               }
               overDrive.size="4";
               overDrive.id='OVERDRIVE';
               overDrive.style.textAlign='right';
               //   overDrive.style.backgroundColor='inherit';
               //overDrive.style.border="0px";
               Toolbox.addElement(xxDiv,"span","% ");
           }
           // really to be named: CalcNeed
           function recalcOverDrive() {
               var i;
               if (currentPhase.targetNeed) {
                   for (i=0;i<5;i++) {
                       var element=document.getElementById(i+'NEEDED');
                       element.firstChild.data=Math.max(parseInt(currentPhase.targetNeed[i])-currentPhase.resourcen[i].anzahl,0);
                   }
               }else {
                   var overDrive=parseInt(document.getElementById('OVERDRIVE').value);
                   config["overdrive_drachen"]=overDrive;
                   storage.setObject("GS_config",config);
                   for (i=0;i<5;i++) {
                       var element=document.getElementById(i+'NEEDED');
                       element.firstChild.data=Math.max(parseInt(currentPhase.advice[i]*(100+overDrive)/100)-currentPhase.resourcen[i].anzahl,0);
                       
                   }
               };
           }
           recalcOverDrive();
           if (overDrive) {
                      overDrive.addEventListener('change',recalcOverDrive,true);
           }
           var newDiv=Toolbox.addElement(xxDiv,"div");
           var imgSpan=Toolbox.addElement(newDiv,"span");
           newDiv.style.clear='left';
           newDiv.style.cssFloat='right';
           newDiv.style.marginTop='-2em';
           
           var ausbauImg=Toolbox.addElement(imgSpan,"img");
           //ausbauImg.title="Rohstoffe für Drachen vormerken";
           Toolbox.Tooltip.createToolTip(imgSpan,"Rohstoffe\u00a0für\u00a0Drachen\u00a0vormerken");
           ausbauImg.style.cursor='pointer';
           ausbauImg.src="http://serv.endoftheinternet.org/star.png";
           ausbauImg.addEventListener('click',function() {
               var ausbau={"drache":1};
               var i;
               for (i=0;i<currentPhase.resourcen.length;i++) {
                   var current=0;
                   if (!ausbau[currentPhase.resourcen[i].rohstoff]) {
                       ausbau[currentPhase.resourcen[i].rohstoff]=0;
                   }
                   ausbau['_drachenid']=drachenId;
                   ausbau[currentPhase.resourcen[i].rohstoff]+=Toolbox.parseNumber(document.getElementById(i+'NEEDED').textContent);
                   Toolbox.addDebug(currentPhase.resourcen[i].rohstoff+": "+ausbau[currentPhase.resourcen[i].rohstoff]);
               }
               Ausbau.setAusbau(ausbau,drachenName);
               },true);
           Toolbox.addRight("Kosten für die Aufzucht mit den empfohlenen Werten: "+Toolbox.printNum(minCost));
           persistent.updateLocally();
           //storage.setObject('GS_drachen',drachen);
       }
    },

    showLogbuch : function  (tabs,drachenObjekt) {
               var oldTab=tabs.nextSibling;
               if (oldTab && !(oldTab.tagName && oldTab.tagName=='DIV')) {
                   oldTab=oldTab.nextSibling;
               };
               var count=0;
               for (key in tabs.childNodes) {
	               Xchild=tabs.childNodes[key];
                       if (Xchild.tagName && Xchild.tagName=='LI') {
                           if (count++ == 3) {
                               Toolbox.getByXPath("a",Xchild).className='active';
                           } else {
                               Toolbox.getByXPath("a",Xchild).className='inactive';
                           }
                       }
                   }
               oldTab.style.display='none';
               var newTab=document.createElement("div");
               oldTab.parentNode.insertBefore(newTab,oldTab);
               Toolbox.addElement(newTab,"h1",drachenObjekt.phasen[drachenObjekt.currentIndex].name+" Logbuch");
               var phase=null;
           var totalUsage={};
               for (key in drachenObjekt.phasen) {
	               nextPhase=drachenObjekt.phasen[key];
                       if (phase!=null) {
                           var phaseDate=new Date(phase.update);
                           Toolbox.addElement(newTab,"h3",Toolbox.simpleDate(phaseDate)+" "+phase.phase+"=>"+nextPhase.phase);
                           var aDiv=Toolbox.addElement(newTab,"div");
                           Toolbox.addElement(aDiv,"p","In dieser Stufe wurden benötigt:");
                           var index=0;
                           var names=["Kraft","Geschick","Feuerkraft","Willenskraft","Intelligenz"];
                           var table=Toolbox.addElement(aDiv,"table");
                           var tbody=Toolbox.addElement(table,"tbody");
                           for (_key in phase.resourcen) {
			          resInfo=phase.resourcen[_key];
                                   var tr=Toolbox.addElement(tbody,"tr");
                                   Toolbox.addElement(tr,"th",names[index]);
                                   var anzahl=resInfo.anzahl;
                                   if (resInfo.vorrat) {
                                            anzahl=anzahl-resInfo.vorrat;
                                   }
                                   Toolbox.addElement(tr,"td",Toolbox.prettyStoff(resInfo.rohstoff)+" "+" "+anzahl+" ("+Toolbox.printNum(anzahl*100/phase.advice[index])+"%)");
                                       
                       if (!totalUsage[resInfo.rohstoff]) {
                           totalUsage[resInfo.rohstoff]=0;
                       }
                       totalUsage[resInfo.rohstoff]=totalUsage[resInfo.rohstoff]+anzahl;                   
                                   //if (phase.regler.length) {
                                   //Toolbox.addElement(tr,"td","Endposition Regler: "+phase.regler[index]);
                                   //                               }
                                   var td=Toolbox.addElement(tr,"td");
                                   var nP=null;
                                   if (nextPhase.punkte.length) {
                                                    nP=nextPhase.punkte[index];
                                                    Toolbox.addElement(td,"span","=>"+nextPhase.punkte[index]);
                                                    //" (+"+(nextPhase.punkte[index]-phase.punkte[index])+" Punkte)"
                                   } else if (nextPhase.greenMin) {
                                               nP=(nextPhase.greenMin[index]+nextPhase.greenMax[index])/2;
                                               var span=Toolbox.addElement(td,"span","=> ~"+nP);
                                               span.toolTip="Geschätzte Punktezahl";
                                   }
                                   if (nP && phase.punkte.length )
                                       {
                                           var span=Toolbox.addElement(td,"span"," ( +"+(nP-phase.punkte[index])+")");
                                       } else if (nP && phase.greenMin) {
                                          var span=Toolbox.addElement(td,"span"," ( ~ +"+(nP-(phase.greenMin[index]+phase.greenMax[index])/2)+")");
                                       }
                                       if ( phase.regler[index]  && phase.greenMin && phase.greenMin[index]) {
                                                    text="[";
                                                    var offset=phase.regler[index]-phase.greenMin[index]-10;
                                                    if (offset>=0) {
                                                            text=text+"+"+offset;
                                                    }
                                                    else {
                                                            text=text+offset;
                                                            }
                                                    text=text+"]";
                                       }
                                       td=Toolbox.addElement(tr,"td",text);
                                       td.tooltip="Reglereinstellung";
                                   
                               index++;
                               }
                       }
                       phase=nextPhase;
           }
           var table=Toolbox.addElement(aDiv,"table");
           var tr=Toolbox.addElement(table,"tr");
           var th=Toolbox.addElement(tr,"th","Rohstoff");
           var th=Toolbox.addElement(tr,"th","Gesamtverbrauch");
           var th=Toolbox.addElement(tr,"th","Gold");
           th.title="Zum H E U T I G E N Preis wäre das";       
           var sumgold=0;
           for (rohstoff in totalUsage) {
               var tr=Toolbox.addElement(table,"tr");
               var td=Toolbox.addElement(tr,"td",Toolbox.prettyStoff(rohstoff));
               var td=Toolbox.addElement(tr,"td",Toolbox.printNum(totalUsage[rohstoff]));
               var gold=totalUsage[rohstoff]*market[rohstoff]["Ubuy"];
               var td=Toolbox.addElement(tr,"td",Toolbox.printNum(gold));
               sumgold=sumgold+gold;
           }
           var tr=Toolbox.addElement(table,"tr");
           var td=Toolbox.addElement(tr,"td","Gesamt");
           var td=Toolbox.addElement(tr,"td");
           var td=Toolbox.addElement(tr,"td",Toolbox.printNum(sumgold));
           
    },
    
    addPhase : function  (addTo,num,drache) {
        var div=Toolbox.addElement(addTo,"div");
        div.id="d_Phase_"+num;
        cPhase=currentEditDrache.phasen[num];
        Toolbox.addElement(div,"h3","Phase #"+num+" "+cPhase.phase+" ausgelöst:"+Toolbox.simpleDate(new Date(cPhase.update)));
        var table=Toolbox.addElement(div,"table");
        var i;
                function bindEdit(input,drache,phase,key,num,prop) {
            if (prop) {
                input.value=cPhase[key][num][prop];
            } else if (num) {
                input.value=cPhase[key][num];
            } else {
                input.value=cPhase[key];
            }
                
                        input.name=drache+"_"+phase+"_"+key+"_"+num+"_"+prop;
                        input.addEventListener("change",function(evt){
                                keys=evt.target.name.split("_");
                                value=parseInt(evt.target.value);
                                calc=evt.target.value.match(/(\d+)([-+])(\d+)/);
                                if (calc)
                                {        
                                        if (calc[2]=='+') {
                                                value=parseInt(calc[1])+parseInt(calc[3]);
                                        } else
                                        {
                                                value=parseInt(calc[1])-parseInt(calc[3]);
                                        }                                        
                                        evt.target.value=value;
                                        document.getElementById("edit_do_save").style.display='block';
                                };
                if (keys[4]) {
                    persistent.data.drachen[keys[0]].phasen[keys[1]][keys[2]][keys[3]][keys[4]]=value;
                } else if (keys[3]) {
                    persistent.data.drachen[keys[0]].phasen[keys[1]][keys[2]][keys[3]]=value;
                } else  {
                    persistent.data.drachen[keys[0]].phasen[keys[1]][keys[2]]=value;
                }
                        },true);
                }
        
        for (i=0;i<5;i++) {
            var tr=Toolbox.addElement(table,"tr");            
            var td=Toolbox.addElement(tr,"td");
            var input=Toolbox.addElement(td,"input");
            input.value=cPhase.punkte[i];
                        input.size=4;
            input.disabled=true;
            var td=Toolbox.addElement(tr,"td");
            var input=Toolbox.addElement(td,"input");
                        bindEdit(input,drache,num,"resourcen",i,"rohstoff");
            input.disabled=true;
            var td=Toolbox.addElement(tr,"td");
            var input=Toolbox.addElement(td,"input");
                        bindEdit(input,drache,num,"resourcen",i,"anzahl");
        }
        var myDiv=Toolbox.addElement(div,"div");
        Toolbox.addElement(myDiv,"span","Talaras-code:");
        var input=Toolbox.addElement(myDiv,"input");
        bindEdit(input,drache,num,"taralas");
    },
    
    editLogbuch : function  (){ 
        if (!editPane) {
            editPane=Panes.makePane();
        } 
        Toolbox.clearChildren(editPane);
        pane=editPane;
        pane.style.width="780px";
        Toolbox.addElement(pane,"h1","Edit Drachenlogbuch");
        Toolbox.addElement(pane,"p","ACHTUNG ACHTUNG ACHTUNG");
        Toolbox.addElement(pane,"p","Hiermit könnt ihr die kompletten Eintragungen des "+
                   "Drachenlogbuchs an den nächstbesten Drachen verfüttern."+
                   " Sagt nicht ich hätte euch nicht gewarnt."+
                   " Andererseits: Solange ihr nicht auf Speichern geht, passiert auch nichts.");
        
        var selectDrache=Toolbox.addElement(pane,"select");
        var currentEditDrache=null;
        var option=document.createElement("option");
        option.value="---";
        option.text="---";
        selectDrache.add(option,null);
        for (id in persistent.data.drachen) {
            var option=document.createElement("option");
            var aD=persistent.data.drachen[id];
            name=null;
            for (phase in aD.phasen) {
                if (aD.phasen[phase].name) {
                    name=aD.phasen[phase].name
                }
            }
            
            option.value=""+id;
            option.text="["+id+"] :"+name;
            selectDrache.add(option,null);
        }
        var save=Toolbox.addElement(pane,"input","Speichern");
        save.style.marginLeft="3em";
        save.id="edit_do_save";
        save.type="submit";
        save.name="Speichern";
        save.value="Speichern";
        save.addEventListener("click",function(){
            if (confirm("Willst du wirklich die Änderungen im Drachenlogbuch dauerhaft speichern?")) {
                persistent.updateRemote();
            } else {
                alert("Okay, dann lieber nicht.");
            }
        },true);
        div=Toolbox.addElement(pane,"div");
        div.style.marginTop="0.5em";
        div.style.paddingTop="0.5em";
        div.style.borderTop="1px solid black";
        div.id="GM_drache_edit";
        Toolbox.addElement(div,"p","Kein Drache gewählt");

        function editDrache(){
            var div=document.getElementById("GM_drache_edit");
            currentEditDrache=null;
            Toolbox.clearChildren(div);
            var id=selectDrache.options[selectDrache.selectedIndex].value;
            if (id=="---") {
                Toolbox.addElement(div,"p","Kein Drache gewählt.");
                return;
            }
            currentEditDrache=persistent.data.drachen[id];
            var h2=Toolbox.addElement(div,"h2","Drache ["+id+"]");
            var delDrache=Toolbox.addElement(h2,"input");
            delDrache.type='submit';
            delDrache.value="Löschen";
            delDrache.name="Löschen";
            delDrache.style.border="1px outset black";
            delDrache.style.padding="0.1em";
            delDrache.style.margin="0.1em";
            delDrache.addEventListener("click",function() { 
                    if (confirm("WIRKLICH Drachen ["+id+"] komplett aus dem Drachenlogbuch entfernen?"))
                    {
                        delete persistent.data.drachen[id];
                        selectDrache.value='---';
                        Drachen.editLogbuch();
                    }
            },true);
            
            var ownerdiv=Toolbox.addElement(div,"div","Besitzer: ");
            if (currentEditDrache.foreign) {
                if (currentEditDrache.foreign==OWN_DRAGON) {
                    Toolbox.addElement(ownerdiv,"span","Eigener Drache");
                } else {
                    Toolbox.addElement(ownerdiv,"span",currentEditDrache.foreign);
                }
                var resetOwner=Toolbox.addElement(ownerdiv,"input","zurücksetzen");
                resetOwner.type='submit';
                resetOwner.name="zurücksetzen";
                resetOwner.value="zurücksetzen";
                resetOwner.style.border="1px outset black";
                resetOwner.style.padding="0.1em";
                resetOwner.style.margin="0.1em";
                resetOwner.style.cursor='pointer';
                resetOwner.addEventListener("click",function(){
                        currentEditDrache.foreign=null;
                        editDrache();
                },true);
            } else {
                Toolbox.addElement(ownerdiv,"span","nicht gesetzt");
            }
            for (i=0;i<currentEditDrache.phasen.length;i++)
            {
                Drachen.addPhase(div,i,id);
            }
            
        }
        selectDrache.addEventListener("click",editDrache,true);
}
}

Messages = {
    readFirstUnreadURL : function  () {
        //    var firstLink=Toolbox.getByXPath("//a[@class='navb']");
        var firstLink=Toolbox.getByXPath("//a[@class='navb'][count(//a[@class='navb'])]");
        if (firstLink) {
            Toolbox.addDebug("Going to..."+firstLink.href);
            window.location=firstLink.href;
        } else {
            Toolbox.addRight("... Keine weiteren ungelesenen Nachrichten vorhanden");
            config["deletingLinks"]=false;
            storage.setObject("GS_config",config);
            return false;
        }
    },

    highlight_messages_link : function  () {
        messagesLink=Toolbox.getByXPath("//div[@class='mainNavi']/a[3]");
        count=messagesLink.textContent.match(/\((\d+)\)/)[1];
       
        //Toolbox.addRight("Nachrichten : "+count+"//"+config["MESSAGES_COUNT"]);
        if (count<config["MESSAGES_COUNT"] || document.URL.indexOf('t=messages')!=-1 ) {
            if (count!=config["MESSAGES_COUNT"]) {
                config["MESSAGES_COUNT"]=count;
                storage.setObject("GS_config",config);
            }
        }
        if (count>config["MESSAGES_COUNT"]) {
            messagesLink.style.color=config["COLOR_HIGHLIGHT_MESSAGES"];
        }
    }
}

function PersistentStorage(){
    // periodically checks remote representation
    // Use cases:
    /*
       1) sits there, does nothing
       2) checks server (once every _cache_time on init)
       2.a) loads newer data from server. Will Set local storage then automatically
       ***- update from server is newer than local update
       2.b) loads newer data. Local data is newer! => set remote storage.
       *** - update local ist newer than remote update
       3) newer data is submitted locally, only minor change did occur
          => set local storage. Might set remote storage (1/2 cachetime)
       4) major data is submitted locally, set local and remote storage
     */
    //
    // only minor updates have been done.
    // will update remote, when no update has been done in 
    // cacheTime
    //
    // persistent.data.drachen
    // persistent.data.*
    // persistent.data.lastCheck=time() <- last compare with online version
    // persistent.data.update <- last update time    
    //
    this.icon_okay="http://serv.endoftheinternet.org/disk.png";
    this.icon_open="http://serv.endoftheinternet.org/disk_open.png";
    this.icon_broken="http://serv.endoftheinternet.org/disk_broken.png";
    this.basehref="http://www.dragosien.de/";
    
    
    function persistentIcon() {
                var persistentIcon=document.createElement("img");
                //persistentIcon.style.cursor="pointer";
                persistentIcon.style.position="absolute";
                persistentIcon.style.top="2px";
                persistentIcon.style.left="945px";
                persistentIcon.style.zIndex="250";
                persistentIcon.style.display="block";
                persistentIcon.title="Status dauerhafter Speicher";
                Toolbox.addIcon(persistentIcon);
                return persistentIcon;
        }
    this.persistentIcon=persistentIcon();
    this.persistentIcon.src=this.icon_okay;
    this.updateIcon=function () {
        this.persistentIcon.title=this.basehref+"\nStatus: Lokal: "+Toolbox.simpleDate(new Date(this.data.update))+"\n"+"Überprüfung :"+Toolbox.simpleDate(new Date(this.data.lastCheck));
    }
    this.cacheTime=60*60*1000; //60 minutes*60seconds*1000ms
    this.checkTodo=false;
    this.checkDone=false;
    this.afterinit=[];
    
    this.doAfterInit=function(func) {
        if (this.checkTodo && (!this.checkDone)) {
            this.afterinit.push(func);
        } else {
            func();
        }
    }
    
    this.init=function(base) {
        if (base) {
            this.basehref=base;
        }
                 this.data=storage.getObject("GS_persistent");
                if (this.data.error) {
                        this.persistentIcon.src=this.icon_broken;
                }
                this.updateIcon();                
                if (this.data.lastCheck==null ||(currentTime-this.data.lastCheck)>this.cacheTime) {
                    Toolbox.addRight("Überprüfe ob aktuellere Daten vorhanden sind");
                        this.checkRemote();
                } 
        }
    this.updateLocally=function() {
                this.data.update=new Date().getTime();
                this.storeLocally();
                this.mightUpdate(0.5);
    };
    this.storeLocally=function() {
                storage.setObject("GS_persistent",this.data);
    }
    this.mightUpdate=function(fac) {
                if (fac==null) {
                        fac=1.0;
                }
                if (this.data.lastCheck==null || (currentTime-this.data.lastCheck)>(fac*this.cacheTime)) {
                        this.updateRemote();
                }
    }
    // forces remote update
    // 
    this.updateRemote=function() {
        var oldCheck=        this.data.lastCheck;
        var speichere=Toolbox.addRight("... Speichere im Profil");
        this.data.update=new Date().getTime();
        this.data.lastCheck=new Date().getTime();
        this.updateIcon();
        storage.setObject("GS_persistent",this.data);
        //http://www.dragosien.de/?t=ajax&action=save_json&utf8_text=xxx    };
        this.persistentIcon.src=this.icon_open;
        var obj=this;
        obj.data.update=new Date().getTime();
        obj.data.error=null;
                var text=JSON.stringify(this.data);
                text="$___$"+Dragosien.replacer(text,true);
            //text="$LZW$"+Toolbox.lzw_encode(Utf8.encode(text));
        text=encodeURI(text);
	Toolbox.addElement(speichere,"span","("+text.length+" bytes)");
        GM_xmlhttpRequest({
            method:"POST",
                url:basehref+"?t=ajax&action=save_json",
                data:"utf8_text="+text,
                headers:{
                                        "Content-Type": "application/x-www-form-urlencoded",
                                        "User-Agent":navigator.userAgent,
                                        "Accept":"text/plain"
                },
                onload:function(response) {
                    if (response.status!=200) {
                        obj.data.error=true;
                        obj.persistentIcon.src=obj.icon_broken;
                        obj.storeLocally();
                        return;
                    }
                    obj.persistentIcon.src=obj.icon_okay;
                }   
            });
    };
    // checks whether remote context is newer than locally stored.
    // WILL take a while; waits for return or 10s + error 
    //
    this.checkRemote=function() {
        var obj=this;
        this.checkTodo=true;
        this.persistentIcon.src=this.icon_open;
        // http://www.dragosien.de/?t=ajax_whisper&action=get_json
        GM_xmlhttpRequest({
            method:"GET",
            url:basehref+"?t=ajax_whisper&action=get_json",
            headers:{
                "User-Agent":navigator.userAgent,
                "Accept":"text/plain"
            },
            onload:function(response) {
                if (response.status!=200) {
                    obj.data.error=true;
                    obj.persistentIcon.src=obj.icon_broken;
                    return;
                }
                obj.persistentIcon.src=obj.icon_okay;
                obj.data.error=null;
                obj.checkDone=true;
                delete obj.data.error;
                // if it has never been used, write it
                var text=response.responseText;
                if (text=="") {
                    text='{"update":0}';
                }
                loaded=null;
                                if (text.substr(0,5)=="$___$") {
                                        text=Dragosien.replacer(text.substr(5),false);
                                }
                try {
                    loaded=JSON.parse(text);
                    if (loaded.update<obj.data.update) {
                        // remote is older.
                        obj.mightUpdate();
                    }
                    if (loaded.update>obj.data.update) {
                        obj.data=loaded;
                        Toolbox.addRight("Lade Daten aus Spiel-Profil ("+Toolbox.simpleDate(new Date(loaded.update)));
                    }
                    obj.updateIcon();
                } catch (e) {
                    Toolbox.addRight(e);
                    obj.data.error=true;
                    obj.persistentIcon.src=obj.icon_broken;
                }
                obj.data.lastCheck=new Date().getTime();
                                obj.data.error=null;
                Toolbox.addRight("... Laden komplett");
                obj.storeLocally();
                obj.updateIcon();
                while (obj.afterinit.length) {
                    var func=obj.afterinit.pop();
                    func();
                }
            }
            });
    };
}


storage=new MyStorage();
var userInfo=document.getElementById("userinfo");
var basehref=Toolbox.getByXPath("/html/head/base").href;

errorBox=Toolbox.getByXPath("//*[@id='error']");
footerBox=Toolbox.getByXPath("//*[@id='footer']");
serverZeit=null;
userName="";
if (!userInfo) {
    //    Toolbox.addRight("!!!!! - Kann Benutzername nicht auslesen");
} else {
    userName=userInfo.textContent.match(/Name:\s+(\S*)\b/);
}
if (userName) {
    userName=userName[1];
    //Toolbox.addDebug("User: "+userName);
}
var speed=0;
storage.setUserName(userName);
if (document.URL.match(/speed|dragosien-trade/)) {
   storage.setServer("trade_speed");
   speed=1;
   //Toolbox.addRight("SPEED");
}

mainRight=document.getElementById("mainRight");
                     ///html/body/div[2]/div[4]/div/div[2]
var requestId;
mainNavi=document.getElementById("linkLogout");
unsafeWindow.main=mainNavi;
//
storeTable=document.evaluate("table",mainRight,null,XPathResult.ANY_TYPE,null).iterateNext();
//unsafeWindow.xxx=mainRight;
//storeTable=mainRight.childNodes[3];

//Create a box to contain further information

box=Toolbox.addElement(mainRight,"div");
box.style.marginTop="1em";
box.style.marginRight="28px";
box.style.padding="2px";
box.style.paddingTop="1em";
box.style.borderTop="dashed 1px black";


if (mainNavi) {
    var found=mainNavi.href.match(/request=(\d+)&/);
    if (found) {
        requestId=found[1];
    }
}

Toolbox.loadAll();

Toolbox.addDebug("Loadall!");
if (footerBox) {
    var zeitText=footerBox.textContent.match(/Serverzeit:(.*)Uhr/);
    if (zeitText)
        {
            serverZeit=Toolbox.parseDate(zeitText[1]);
            Toolbox.addDebug("Zeit am Server:"+new Date(serverZeit));
        }
}

if (config["init"]==undefined){
    //first init ?? @Scram
    Toolbox.addRight("Achtung! Migriere Daten aus Profil ohne Username");
    storage.setUserName("");
    storage.storagePrefix="";
    Toolbox.loadAll(true);
    storage.setUserName(userName);
    span=Toolbox.addElement(box,"div");
    storage.setObject("GS_produktion",produktion);
    Toolbox.addElement(span,"span","P");
    storage.setObject("GS_lager",lager);
    Toolbox.addElement(span,"span","L");
    storage.setObject("GS_gebaude",gebaude);
    Toolbox.addElement(span,"span","G");
    storage.setObject("GS_market",market);
    Toolbox.addElement(span,"span","M");
    storage.setObject("GS_gebaudeInfo",gebaudeInfo);
    Toolbox.addElement(span,"span","I");
    storage.setObject("GS_config",config);
    Toolbox.addElement(span,"span","C");
    Toolbox.addRight("---");
}

market["gold"]={};
market["gold"]["buy"]=1;
market["gold"]["sell"]=1;
market["gold"]["Ubuy"]=1;
market["gold"]["Usell"]=1;
//Toolbox.addDebug("::"+config["init"]);
if (config["init"]==null) {
    //first init ?? @Scram
    config["init"]=1;
    config["CONFIG_ICON"]=true;
    config["LAGER_PROD"]=true;
    config["LAGER_WERT"]=true;
    config["LAGER_MARKT"]=true;
    config["GLOBAL_ANALYSE"]=true;
    config["MARKT_HISTORIE"]=true;
    config["MARKT_NORMAL"]=true;
    config["MARK_RESOURCE"]=true;
    config["MARK_AUSBAU"]=true;
    config["GEB_ANALYSE"]=true;
    config["TIP_VORRAT"]=true;
    config["SHORTAGE"]=true;
    config["SHORTAGE_RED"]=60;
} 

if (config["init"]==1) {
        config["init"]="0.31c";
        config["NACHRICHTEN_X"]=true;
}
if (config["init"]=="0.31c") {
        config["init"]="0.32";
        config["ANGEBOTE_WERT"]=true;
        config["COLOR_NEED"]="#d00";
        config["COLOR_AVAIL"]="#070";
        config["COLOR_PLUS"]="#070";
        config["COLOR_MINUS"]="#d00";
}
if (config["init"]=="0.32") {
        config["init"]="0.33";
        config["INFO_ICON"]=true;
}
if (config["init"]=="0.33") {
        config["init"]="0.34";
        config["CYCLE_BUILDINGS"]=true;
}
if (config["init"]=="0.34") {
        config["init"]="0.35";
        config["FONTSIZE"]="65%";
}
if (config["init"]=="0.35") {
        config["init"]="0.37";
        config["NACHRICHTEN_DARSTELLUNG"]=true;
}
if (config["init"]=="0.37") {
        config["init"]="0.38";
        config["COLOR_NICK"]="#c80";
        config["MUTATE_CHAT"]=true;
        storage.setObject("GS_config",config);
}
if (config["init"]=="0.38") {
        config["init"]="0.40";
        config["SUM_MARKT"]=true;
        config["MARKT_HIGHLIGHT"]=false;
        config["MARKT_HIGHLIGHT_NAMES"]="";
        config["COLOR_MARKT_HIGHLIGHT"]="#ca0";
}
if (config["init"]=="0.40") {
        config["init"]="0.41";
        config["ALERT_MARKT"]=true;
        config["MARKT_DUBIOUS"]=true;
        config["UPDATE_CHECK"]=true;
}
if (config["init"]=="0.41") {
        config["init"]="0.41b";
        config["GEB_GOLDWERT"]=true;
}
if (config["init"]=="0.41b") {
        config["init"]="0.41d";
        config["MARKT_USERLINK"]=true;
}
if (config["init"]=="0.41d") {
        config["init"]="0.43";
        config["LAGER_EXCEEDED"]=true;
        config["NACHSCHUB_MARK"]="1T 2h";
        config["COLOR_NACHSCHUB_MARK"]="red";
        config["NACHSCHUB_SORT"]=true;
}
if (config["init"]=="0.43") {
        config["init"]="0.44";
        config["MARKT_RELEVANT"]=true;
}    
if (config["init"]=="0.44") {
        config["init"]="0.45";
        config["READ_ALL_BUTTON"]=true;
        config["WARN_EXCEED"]="3T 6h 30m";
}
if (config["init"]=="0.45") {
        config["init"]="0.48";
        config["COMPACT_STORETABLE"]=true;
        config["FONTSIZE2"]="65%";
        config["LAGER_ANGEBOTE"]=true;
}
if (config["init"]=="0.48") {
        config["init"]="0.52c";
        config["GEBAUDE_SORT"]=true;
}
if (config["init"]=="0.52c") {
        config["init"]="0.53";
        config["REORDER"]=false;
        config["NEW_ORDER"]="1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20";
}
if (config["init"]=="0.53") {
        config["init"]="0.64";
        config["PRICE_CHECK"]=true;
        config["PRICE_NPC_L"]="80";
        config["PRICE_NPC_H"]="120";
}
doUpgradePrices=false;
if (config["init"]=="0.64") {
        //doUpgradePrices=true;
        config["init"]="0.65c";
}
if (config["init"]=="0.65c") {
        config["init"]="0.70";
        config["MARKT_BLOED"]=true;
}
if (config["init"]=="0.70") {
        config["init"]="20081216";
        config["TAUSENDER_TRENN"]=true;
}
if (config["init"]=="20081216") {
        config["init"]="20090107";
        config["TILLEND"]=true;
}
if (config["init"]=="20090107") {
        config["init"]="20090315";
        config["LETITBENIGHT"]=true;
}
if (config["init"]=="20090315") {
        config["init"]="20090414";
        config["COLOR_MARKT_HIGHLIGHT_GUILD"]="#0f0";
}
if (config["init"]=="20090414") {
        config["init"]="20090523";
        config["LETITBENIGHT_DAY"]="6";
        config["LETITBENIGHT_NIGHT"]="19";
}
if (config["init"]=="20090523") {
        config["init"]="20090606";
        config["TURNIERPLAN_MARK_WINNER"]=true;
}
if (config["init"]=="20090606") {
        config["init"]="20090628";
        config["ACCURATE_ROHSTOFFZUFUHR"]=true;
}
if (config["init"]=="20090628") {
        config["init"]="20090823b";
        config["DRACHEN_SORT"]=true;
}
if (config["init"]=="20090823b") {
        config["init"]="20090830";
        config["ARENA_CALCDRAGBALL"]=true;
        config["ARENA_ADDDRAGBALL"]=true;
}
if (config["init"]=="20090830") {
        config["init"]="20090902";
        config["HIGHLIGHT_MESSAGES"]=true;
}
if (config["init"]=="20090902") {
        config["init"]="20090902b";
        config["COLOR_HIGHLIGHT_MESSAGES"]="red";
}
if (config["init"]=="20090902b") {
        config["init"]="20090905";
        config["SUMUP_RE"]=true;
}
if (config["init"]=="20090905") {
        config["init"]="20090918";
        config["HIDE_LANDVERWALTUNG"]=true;
}
if (config["init"]=="20090918") {
        config["init"]="20091129";
        config["DRACHEN_SORT"]=false;
}
if (config["init"]=="20091129") {
	config["init"]="20100223b";
	config["ARENA_SORTDRAGBALL"]=true;
};
if (config["init"]=="20100223b") {
   doUpgradePrices=true;
   config["init"]="200100623";
}
if (config["init"]=="200100623") {
   config["init"]="20100629";
   config["PRICE_NPC_L"]="80";
   config["PRICE_NPC_H"]="120";
   }	
if (config["init"]=="20100629") {
   config["init"]="20100722";
   config["ZUSTAND_SORT"]=true;
   config["ZUSTAND_MARK"]=true;
}
if (config["init"]=="20100722") {
   config["init"]="20101011";
   config["MARK_ADD_RENOVIERUNG"]=true;
}   
/**END BOOTSTRAP CONFIG **/

unsafeWindow.GM_config=config;
debug=config["debug"];
totalAusbau={};
profileStart=function(){};
profileEnd=function(){};
profileTimes={};
profileStarts={};
if (debug) {
    profileStart=function(key){
        var tstamp=new Date().getTime();
        profileStarts[key]=tstamp;
        var tstamp2=new Date().getTime();
        profileTimes['profile']=profileTimes[key]+tstamp2-tstamp;
    };
    profileEnd=function(key){
        var tstamp=new Date().getTime();
        profileTimes[key]=tstamp-profileStarts[key];
        var tstamp2=new Date().getTime();
        profileTimes['profile']=profileTimes[key]+tstamp2-tstamp;
    };
}

var found=userInfo.textContent.match(/Gold:\s+([0-9.,]*)\b/);
if (found) {
    lager["gold"]=Toolbox.parseNumber(found[1]);
}
//marked
detailTable=[];
stoffRows={};

function clickSell(url) {
}

function clickBuy(url) {
    
}
function didBuy() {
}
function didDemandSell() {
}
//marked


GildenDrachen=[];

aufstellungMarkers=null;


if (document.URL.indexOf("t=guild_arena")!=-1) {
    if (document.URL.indexOf("&tab=0")!=-1||
        document.URL.indexOf("&tab=&")!=-1||
        document.URL.match(/t=guild_arena$/)) {
        Dragball.workGuildArenaAufstellung();
    }
}


if (document.URL.indexOf("t=highscore&chapter=games")!=-1||
    document.URL.indexOf("t=highscore&chapter=friendly_games")!=-1
    ) {
    Dragball.workTurnierPlan()
}


if (document.URL.indexOf("t=game_details")!=-1) {
    Dragball.workGameDetails()
}

if (document.URL.indexOf("t=guild_hall")!=-1) {
    if (document.URL.indexOf("&tab=0")!=-1||
        document.URL.indexOf("&tab=")==-1) {
        Dragball.workGuildMitglieder();
    }
    if (document.URL.indexOf("tab=2")!=-1) {
        Dragball.workGuildHallAusbauen();
    }
}

currentHausKey=null;

if (document.URL.indexOf('t=wirtshaus')!=-1) {
    Dragball.workWirtshaus();
}


if (document.URL.indexOf('t=arena')!=-1) {
    Dragball.workArena();
}

if (document.URL.indexOf('action=pre_destroy_building')!=-1) {
        var mybox=Toolbox.getByXPath("//div[@class='layer_box']/div");
	var abrisstext=mybox.textContent;
	abrisstext=abrisstext.substr(abrisstext.indexOf('abreißen:'));
        var resourcen=abrisstext.match(/\d+ *[^0-9]*;/g);
	Toolbox.addRight("**"+resourcen);
        var exceeds="";
        for (key in resourcen) {
	    sub=resourcen[key];
            var split=sub.match(/(\d+)\s*(\S+)\s*;/);
            var num=Toolbox.parseNumber(split[1]);
            var stoff=Toolbox.parseStoff(split[2]);
            unsafeWindow.xxx=stoff;
            if ((lager[stoff]+num)>lager["capacity"]) {
                exceeds+=((lager[stoff]+num)-lager["capacity"])+" "+Toolbox.prettyStoff(stoff)+"  ";
            }
        }
        if (exceeds) {
            var deleteLink=Toolbox.getByXPath("//div[@class='layer_box']/div/a[contains(@href,'action=destroy_building')]");
            var newDiv=document.createElement("div");
            newDiv.appendChild(document.createTextNode("Verschwendet werden:"+exceeds));
            Toolbox.addElement(newDiv,"br");
            Toolbox.addElement(newDiv,"br");
            deleteLink.parentNode.insertBefore(newDiv,deleteLink.previousSibling);
        }
}

if (document.URL.indexOf('t=building')!=-1 && document.URL.indexOf('position=')!=-1) {
    var pos=document.URL.match(/position=[^&]*/);
    activeGebaudePosition=pos[0];
    oldGebaude=gebaude[pos];
    gebaude[pos]=new Object();
    gebaude[pos]["need"]=new Object();
    gebaude[pos]["prod"]=new Object();
    gebaude[pos]["lager"]=new Object();
    gebaude[pos]["ausbau"]=new Object();
    gebaude[pos]["umbau"]=new Object();
    gebaude[pos]["renovierung"]=new Object();
    var title=document.evaluate("//h1",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.firstChild;
    if (title.textContent.match(/Neues Gebäude/)) {
        // I hate copy & paste
        // but its so quick (&dirty)
        umbauTable={};
        var layerBox=title.parentNode.parentNode;
        var table=Toolbox.getByXPath("div/table",layerBox);        
        //        table.style.border="3px solid red";
        //        alert(table);
        for (r=0;r<table.rows.length;r++) {
            var row=table.rows[r];
            if (row.cells.length==6) {
                var imgCell=table.rows[r].cells[5];
                var img=document.createElement("img");
                imgCell.insertBefore(img,imgCell.firstChild);
                img.src="http://serv.endoftheinternet.org/star.png";
                img.style.cssFloat="right";
                img.title="Ausbau vormerken";
                var titelElement=table.rows[r].cells[1];
                //Toolbox.addRight("***"+titelElement.textContent);
                var towards=titelElement.textContent;
                var titel=titelElement.textContent;
                var resource=table.rows[r].cells[4].textContent;
                //                var stufe=parseInt(titel.match(/\b\d+\b/));
                var resourcen=Toolbox.parseResources(0,resource);
                if (bauherr!=0) {
                    resourcen["_bauherr"]=bauherr;
                }
                if (Toolbox.isEnabled("GEB_GOLDWERT")) {
                    var goldWert=Toolbox.minMaxGold(resourcen);
                    Toolbox.addElement(table.rows[r].cells[4],"br");
                    Toolbox.addElement(table.rows[r].cells[4],"span","Goldwert :("+Toolbox.printNum(goldWert["max"])+"..."+Toolbox.printNum(goldWert["min"])+")");
                    Toolbox.addElement(table.rows[r].cells[4],"br");
                    Toolbox.addElement(table.rows[r].cells[4],"span","Kaufkosten : "+Toolbox.printNum(goldWert["Ubuy"]));
                }
                if (Toolbox.isEnabled("LAGER_EXCEEDED")) {
                    var notEnough="";
                    for (stoff in resourcen) {
                if (stoff[0]!='_' && stoff!='gold') {
                    if (parseInt(resourcen[stoff])>parseInt(lager["capacity"]))
                    {
                        Toolbox.addDebug(stoff+" exceeds capacity "+resourcen[stoff]+" > "+lager["capacity"]);
                        if (notEnough) {
                            notEnough+=" ";
                        }
                        notEnough+=Toolbox.prettyStoff(stoff);
                    }
                }
                    }
                    if (notEnough) {
                
                table.rows[r+1].cells[1].style.textDecoration="line-through";
                var toModify;
                if (ausbau)  {
                    toModify=table.rows[r+2].cells[0].childNodes[1];
                } else {
                    toModify=document.createElement("p");
                    Toolbox.injectElement(table.rows[r+2].cells[0],toModify);
                }
                toModify.style.textDecoration="line-through";
                var element=Toolbox.addElement(table.rows[r+2].cells[0],"p","Lager muss erst erweitert werden. ("+notEnough+")");
                element.style.textDecoration="none";
            }
                }
                //                                resourcen["_update"]=currentTime;
                if (Toolbox.isEnabled("MARK_RESOURCE")){
                    img.style.cursor="pointer";
                    {
                        img.id="umbaurow"+r;
                        umbauTable[img.id]={"resourcen":resourcen,
                                            "name":"NEU",
                                            "umbau":towards};
                        img.addEventListener("click",function() {
                                Ausbau.setAusbau(umbauTable[this.id].resourcen,
                                          umbauTable[this.id].name,
                                          umbauTable[this.id].umbau)},true);
                    }
                }
            }
        }
    }
    else
        {
        if (title.textContent.match(/wird.ausgebaut/))  {
            gebaude[pos]["upgrade"]=true;
        }
        gebaude[pos]["name"]=title.textContent;
        if (title.textContent.match(/Lager/)) {
            var capacity=title.parentNode.parentNode.childNodes[5].textContent.match(/Kapazität:\s*([0-9,.]*\s*je Rohstoff)/);
            if (capacity) {
                gebaude[pos]["note"]=capacity[1];
            }
            Toolbox.addDebug(capacity);
        }
        if (title.textContent.match(/Kaufmann/)) {
            var values=title.parentNode.parentNode.childNodes[5].textContent.match( /([0-9.]+%)/g );
            if (values){
                gebaude[pos]["note"]="NPC-Verkauf: "+values[1]+", NPC-Einkauf: "+values[2];
                config["PRICE_NPC_H"]=Toolbox.parseNumber(values[1].replace('.',','));
		config["PRICE_NPC_L"]=Toolbox.parseNumber(values[2].replace('.',','));
                storage.setObject("GS_config",config);
            } 
        }
        umbauTable={};
        var tableDiv=title.parentNode.parentNode.childNodes[7];
	var found=title.parentNode.parentNode.textContent.match(/[pP]roduziert\s*(\([^()]*\))?\s+([0-9,.]+)\s+(\S+)\s+je\s+(\S+)/);
        deleteLink=Toolbox.getByXPath("a[@class='linkb']",title.parentNode.nextSibling.nextSibling);
        if (deleteLink) {
            unsafeWindow.dl=deleteLink;
            safeLink=document.createElement("a");
            safeLink.appendChild(document.createTextNode("einreißen freischalten"));
            deleteLink.style.display="none";
            safeLink.className="link";
            deleteLink.parentNode.insertBefore(safeLink,deleteLink);
            safeLink.id="safeLink";
            deleteLink.id="deleteLink";
            safeLink.style.cursor="crosshair";
            safeLink.addEventListener("click",function() {
                    if (confirm("Achtung! Gebäude Löschen Link wirklich anzeigen?")) {
                        document.getElementById("safeLink").style.display="none";
                        document.getElementById("deleteLink").style.display="inline";
                    }
                    return false;},false);
        }
            
        if (found) {
            var stoff=Toolbox.parseStoff(found[3]);
            var menge=Toolbox.parseNumber(found[2]);
            Toolbox.addDebug("produktion :"+stoff+"*"+menge+" je "+found[4]);
            if (found[4]=="Tag")
                {
                        menge=parseInt(100*menge/24)/100;
                }
            gebaude[pos]["prod"]["anzahl"]=menge;
            gebaude[pos]["prod"]["stoff"]=stoff;
        }
        needselements=[];
        function fillFieldFromLink() {
            document.getElementById(this.id.substring(5)).value=this.textContent.replace(/\./g,"");
        }
	renovierung=document.getElementById("cost_renovate");
	if (renovierung) {
	  //Toolbox.addRight(renovierung.textContent);
	  renresourcen=Toolbox.parseResources(0,renovierung.textContent);
	  gebaude[pos]["renovierung"]=renresourcen; 
	  if (Toolbox.isEnabled("MARK_RESOURCE")) {
	    var img=document.createElement("img");
	    img.src="http://serv.endoftheinternet.org/star.png";
	    img.style.cssFloat="right";
	    img.title="Renovierung vormerken";
	    renovierung.appendChild(img);
	    img.addEventListener("click",function()
				 {Ausbau.setAusbau(renresourcen,gebaude[pos]["name"],"renovieren")},true);
	  }
	}
        for (i=0;i<tableDiv.childNodes.length;i++) {
            if (tableDiv.childNodes[i].tagName=="TABLE") {
                var table=tableDiv.childNodes[i];
                for (r=0;r<table.rows.length;r++) {               
                    if (table.rows[r].childNodes[1].tagName=="TH") {
                        if ((table.rows[r].childNodes[1].textContent.indexOf("ausbauen")!=-1
                             ||table.rows[r].childNodes[1].textContent.indexOf("umbauen")!=-1)
                            && (table.rows[r+1].childNodes.length>=9) )
                            {
                                var bauherr=0;
                                if (table.rows[r].childNodes[7]) {
                                    //Toolbox.addRight(table.rows[r].childNodes[7].textContent);
                                    var found=table.rows[r].childNodes[7].textContent.match(/\((\d)*%.*\)?/);
                                    if (found) {
                                        bauherr=Toolbox.parseNumber(found[1]);
                                        Toolbox.addDebug(found);
                                    }
                                }
                                var ausbau=table.rows[r].childNodes[1].textContent.indexOf("ausbauen")!=-1;
                                var nameCell=table.rows[r+1].cells[5];
                                var img=document.createElement("img");
                                nameCell.insertBefore(img,nameCell.firstChild);
                                img.src="http://serv.endoftheinternet.org/star.png";
                                img.style.cssFloat="right";
                                img.title="Ausbau vormerken";
                                //img.title="Marker setzen";
                                var titelElement=table.rows[r+1].childNodes[3];
                                var towards=Toolbox.nameSplit(titelElement.textContent);
                                var titel=titelElement.textContent;
                                var resource=table.rows[r+1].childNodes[9].textContent;
                                var stufe=parseInt(titel.match(/\b\d+\b/));
                                var resourcen=Toolbox.parseResources(stufe,resource);
                                if (bauherr!=0) {
                                    resourcen["_bauherr"]=bauherr;
                                }
                                if (Toolbox.isEnabled("GEB_GOLDWERT")) {
                                    var goldWert=Toolbox.minMaxGold(resourcen);
                                    Toolbox.addElement(table.rows[r+1].cells[4],"br");
                                    Toolbox.addElement(table.rows[r+1].cells[4],"span","Goldwert :("+Toolbox.printNum(goldWert["max"])+"..."+Toolbox.printNum(goldWert["min"])+")");
                                    Toolbox.addElement(table.rows[r+1].cells[4],"br");
                                    Toolbox.addElement(table.rows[r+1].cells[4],"span","Kaufkosten : "+Toolbox.printNum(goldWert["Ubuy"]));
                                }
                                if (Toolbox.isEnabled("LAGER_EXCEEDED")) {
                                    var notEnough="";
                                    for (stoff in resourcen) {
                                        if (stoff[0]!='_' && stoff!='gold') {
                                            if (parseInt(resourcen[stoff])>parseInt(lager["capacity"]))
                                                {

                                                    Toolbox.addDebug(stoff+" exceeds capacity "+resourcen[stoff]+" > "+lager["capacity"]);
                                                    if (notEnough) {
                                                        notEnough+=" ";
                                                    }
                                                    notEnough+=Toolbox.prettyStoff(stoff);
                                                }
                                        }
                                    }
                                    if (notEnough) {
                                        
                                        table.rows[r+1].cells[1].style.textDecoration="line-through";
                                        var toModify;
                                        if (ausbau)  {
                                            toModify=table.rows[r+2].cells[0].childNodes[1];
                                        } else {
                                            toModify=document.createElement("p");
                                            Toolbox.injectElement(table.rows[r+2].cells[0],toModify);
                                        }
                                        toModify.style.textDecoration="line-through";
                                        var element=Toolbox.addElement(table.rows[r+2].cells[0],"p","Lager muss erst erweitert werden. ("+notEnough+")");
                                        element.style.textDecoration="none";
                                    }
                                }
                                //                                resourcen["_update"]=currentTime;
                                if (ausbau) {
                                    gebaude[pos]["ausbau"]=resourcen;
                                } else if (towards) {
                                    gebaude[pos]["umbau"][towards[1]]={};
                                    gebaude[pos]["umbau"][towards[1]][towards[2]]=resourcen;
                                }
                                
                                if (Toolbox.isEnabled("MARK_RESOURCE")){
                                    img.style.cursor="pointer";
                                    if (ausbau) {
				        newResources={};
				        for (key in gebaude[pos]["ausbau"]) {
				           newResources[key]=gebaude[pos]["ausbau"][key];
				        };
				        if (Toolbox.isEnabled("MARK_ADD_RENOVIERUNG")) {
  				          for (key in gebaude[pos]["renovierung"]) {
				            newResources[key]=newResources[key]+gebaude[pos]["renovierung"][key];				           
				          }
				        }
                                        img.addEventListener("click",function(){Ausbau.setAusbau(newResources,
                                                                                           gebaude[pos]["name"])},true);
                                        if (titelElement.firstChild.tagName=="A" && lager["ausbau"] ) {
                                            titelElement.firstChild.addEventListener("click",function() {Ausbau.clearAusbauPos(pos);return true;},true);
                                        }
                                    } else {
                                        img.id="umbaurow"+r;
                                        umbauTable[img.id]={"resourcen":resourcen,
                                                         "name":gebaude[pos]["name"],
                                                         "umbau":towards[1]+" "+towards[2]};
                                        img.addEventListener("click",function() {
                                                Ausbau.setAusbau(umbauTable[this.id].resourcen,
                                                          umbauTable[this.id].name,
                                                          umbauTable[this.id].umbau)},true);
                                    }
                                }
                            }
                        if (table.rows[r].childNodes[1].colSpan==3) {
                            var aElement={};
                            var text=table.rows[r].textContent;
                            if (text.match(/tigt\s+([0-9,.]+)\s+(\S+)\s+je/i))  {
                                aElement.row1=table.rows[r];
                                aElement.row2=table.rows[r+1];
                                var zahl=RegExp.$1;
                                var stoff=RegExp.$2;
                                zahl=zahl.replace(/\./,",");
                                zahl=Toolbox.parseNumber(zahl);
                                stoff=Toolbox.parseStoff(stoff);
                                gebaude[pos]["need"][stoff]=zahl;
                                if (Toolbox.isEnabled("GEB_NEEDTAG")) {
                                    var bigSpan=Toolbox.addElement(table.rows[r].cells[0],"span"," (");
                                    var zahlSpan=Toolbox.addElement(bigSpan,"span",Toolbox.printNum(zahl*24,1));
                                    zahlSpan.style.textDecoration='underline';
                                    zahlSpan.style.cursor='pointer';
                                    zahlSpan.id='perd_'+Toolbox.getByXPath("input",table.rows[r+1].cells[1]).id;
                                    zahlSpan.addEventListener('click',fillFieldFromLink,true);
                                    bigSpan.appendChild(document.createTextNode(" je Tag)"));
                                }
                                Toolbox.addDebug("Benötigt:"+stoff+" : "+zahl);
                                gebaude[pos]["lager"][stoff]=new Object();
                                aElement.stoff=stoff;
                                aElement.prostunde=zahl;
                                var found=table.rows[r+1].textContent.match(/\b(kein|\d+)\s+(\S+)\s+vor Ort\s*\(\s*reicht bis ([^()]*)\)/);
                                if (found) {
                                    var time=Toolbox.parseDate(found[3]);
                                    aElement.lager=Toolbox.parseNumber(found[1]);
                                    aElement.reicht=time;
                                    needselements.push(aElement);
                                    if (oldGebaude && oldGebaude["lager"] && oldGebaude["lager"][stoff]){
                                        var oldTime=oldGebaude["lager"][stoff]["reichtBis"];
                                    }
                                    if (Toolbox.parseStoff(found[2])!=stoff) {
                                        Toolbox.addRight("FEHLER - "+stoff+" erwartet, aber "+found[2]+" gefunden!");
                                    }
                                    gebaude[pos]["lager"][stoff]["anzahl"]=parseInt(found[1]);
                                    gebaude[pos]["lager"][stoff]["update"]=new Date().getTime();
                                    gebaude[pos]["lager"][stoff]["reichtBis"]=time;
                                    var stockUp=document.URL.match(/&action=transfer_material.*product=([^&]*)&.*count=([0-9]*)$/);
                                    if (stockUp) {
                                        var stockUpStoff=Toolbox.parseStoff(stockUp[1]);
                                        var stockUpCount=Toolbox.parseNumber(stockUp[2]);
                                        if (stockUpStoff===stoff) {
                                            //                                            Toolbox.addRight("Stockup "+stoff+" by "+stockUpCount);
                                            Toolbox.addDebug("=> "+((time-oldTime)/(60000))+" min");
                                            var ratio=(60*stockUpCount)/((time-oldTime)/60000);
                                            Toolbox.addRight(Toolbox.prettyStoff(stoff)+" Verbrauch: "+parseInt(100*ratio)/100+ " je Stunde");
                                        }
                                    }
                                } 
                            }
                        }
                    }
                }
            }
         }
        if (needselements) {
            Toolbox.addDebug(needselements.length+" rohstoffe benötigt");
            var i=0;
            var dauer=Toolbox.parseDuration(config["NACHSCHUB_MARK"])/60;
            for (i=0;i<needselements.length;i++) {
                var element=Toolbox.addElement(needselements[i].row1.cells[0],"span","");
                element.style.marginLeft="1em";
                needselements[i].element=element;
                if (config["NACHSCHUB_MARK"]) {
                    var __dauer=(needselements[i].reicht-serverZeit)/3600000;
                    if (dauer > __dauer) {
                        Toolbox.addElement(element,"span","Aufstocken :");
                        var count=parseInt(((dauer-__dauer)*1.01*needselements[i].prostunde));
                        var countlink=Toolbox.addElement(element,"span",""+count+"");
                        countlink.style.textDecoration="underline";
                        countlink.style.cursor='pointer';
                        var input=Toolbox.getByXPath("input",needselements[i].row2.cells[1]);
                        countlink.id='intoA'+input.id;
                        countlink.addEventListener('click',fillFieldFromLink,true);
                    }
                }
            }
            if (needselements.length==2) {
                var lower=1;
                var higher=0;
                if (needselements[0].reicht<needselements[1].reicht) {
                    lower=0;
                    higher=1;
                }
                if ((needselements[lower].reicht+600000) < needselements[higher].reicht) {
                Toolbox.addDebug(needselements[higher].reicht+"::"+needselements[lower].reicht);
                var __dauer=(needselements[higher].reicht-needselements[lower].reicht)/(3600000);
                Toolbox.addDebug("----"+__dauer);
                var count=parseInt(needselements[lower].prostunde*__dauer);
                element=Toolbox.addElement(needselements[lower].element,"span"," Angleichen:");
                var countlink=Toolbox.addElement(element,"span",""+count+"");
                countlink.style.textDecoration="underline";
                countlink.style.cursor='pointer';
                var input=Toolbox.getByXPath("input",needselements[lower].row2.cells[1]);
                countlink.id='intoB'+input.id;
                countlink.addEventListener('click',fillFieldFromLink,true);
                }
            }
        }
        //// INSERT
        var result=Ausbau.analyseGebaude(gebaude[pos]);
        if (result["prodW"] || pos=='position=21'){
        Toolbox.addRight("Produktionswert:"+result["prodW"],"Verkaufswert der Produkte ("+result["prodT"]+"), Verkauf am freien Markt");
        Toolbox.addRight(" am Markt:"+result["UprodW"],"Verkauf an Mitspieler statt an den NPC");
        if (result["mitEinkauf"]) {
          Toolbox.addRight("Verdienst(Einkauf):"+result["mitEinkauf"],"Verkaufswert-Einkaufskosten ; Eigenproduktion wird nicht berücksichtigt ("+result["mitEinkaufT"]+")");
          Toolbox.addRight(" am Markt:"+result["UmitEinkauf"],"Kauf und Verkauf an Mitspieler");
          Toolbox.addRight("Verdienst(Eigenprod.):"+result["mitEigenProd"],"Verkaufswert - (Betrag, den man mit dem Verkauf der Rohstoffe hätte machen können)");
          Toolbox.addRight(" am Markt:"+result["UmitEigenProd"],"Gewinn am freien Markt");
        }
        }

    }
    
    if (gebaude[pos]["name"]) {
        var nameSplit=Toolbox.nameSplit(gebaude[pos]["name"]);
        var name=nameSplit[1];
        var stufe=nameSplit[2];
        gebaudeName=nameSplit[1];
        gebaudeInfo=storage.getObject("GS_gebaudeInfo");
        if (gebaudeInfo[name]==undefined) {
            gebaudeInfo[name]=new Object();
        }
        gebaudeInfo[name][stufe]=new Object();
        gebaudeInfo[name][stufe]["prod"]=gebaude[pos]["prod"];
        gebaudeInfo[name][stufe]["need"]=gebaude[pos]["need"];
        gebaudeInfo[name][stufe]["ausbau"]=gebaude[pos]["ausbau"];
        gebaudeInfo[name][stufe]["umbau"]=gebaude[pos]["umbau"];
        gebaudeInfo[name][stufe]["update"]=currentTime;
        if (gebaude[pos]["note"]) {
            gebaudeInfo[name][stufe]["note"]=gebaude[pos]["note"];
        }
        storage.setItem("GS_gebaudeInfo",JSON.stringify(gebaudeInfo));
    }
    if (Toolbox.isEnabled("CYCLE_BUILDINGS")) {
        var layerBox=Toolbox.getByXPath("//*[@class='layer_box']");
        arrows=document.createElement("span");
        //    arrow.appendChild(document.createTextNode("=>"));
        layerBox.insertBefore(arrows,layerBox.firstChild);
        arrows.style.cssFloat="right";
        arrows.style.fontSize="140%";
        arrowLeft=Toolbox.addElement(arrows,"a","\u21ba");
        arrowRight=Toolbox.addElement(arrows,"a","\u21bb");
        var curPos=""+pos;
        found=curPos.match(/=([0-9]*)$/);
        curPos=parseInt(found[1]);
        //Toolbox.addRight("Current:"+curPos+"/"+parseInt(produktion["bauplatze"]));
        var nextPos=curPos+1;
        if (nextPos>parseInt(produktion["bauplatze"])) {
            nextPos=1;
        }
        var prevPos=curPos-1;
        if (prevPos==0) {
            prevPos=produktion["bauplatze"];
        }
        arrowLeft.href="index.php?t=building&request="+requestId+"&action=show_building&position="+prevPos;
        arrowRight.href="index.php?t=building&request="+requestId+"&action=show_building&position="+nextPos;
        arrowLeft.style.color="#000";
        arrowRight.style.color="#000";
        arrowLeft.style.textDecoration="none";
        arrowRight.style.textDecoration="none";
    }
}

modifierActive=false;

if (document.URL.indexOf('t=hilfe')!=-1 && document.URL.indexOf('chapter=building&')!=-1) {
    var table=Toolbox.getByXPath("//table[@class='table numbers']");
    var stoffs=[];
    var stoffStartCell=2;
    var virtuellGebaude={};
    virtuellGebaude["prod"]={};
    virtuellGebaude["need"]={};
    var needs=[];
    stoffStart=2;
    var titleCell=2;
    if (table.rows[0].cells[2].textContent=="Material") {
        titleCell=3;
        stoffStart+=table.rows[0].cells[2].colSpan;
        for (i=0;i<table.rows[0].cells[2].colSpan;i++) {
            needs[i]=Toolbox.parseStoff(table.rows[1].cells[2+i].textContent);
        }
    }
    virtuellGebaude["prod"]["stoff"]=Toolbox.parseStoff(table.rows[1].cells[1].textContent);
    numStoff=table.rows[2].cells.length-stoffStart;
    for (i=0;i<numStoff;i++) {
        stoffs[i]=Toolbox.parseStoff(table.rows[1].cells[i+stoffStart].textContent);
        if (!market[stoffs[i]]) {
            table.rows[1].cells[i+stoffStart].style.color='red';
        }
    }
    table.rows[0].cells[titleCell].colSpan+=2;
    Toolbox.addElement(table.rows[1],"th","Goldwert");
    th=Toolbox.addElement(table.rows[1],"th","ROI");
    th.title="Return on Investment - Zeit nach der sich dieses Gebäude selbst bezahlt hat";
    unsafeWindow.stoffs=stoffs;
    var goldSum=0;
    var effWerte=[];
    var effGold=[];
    var stufen=[];
    var effSteps=[250000,500000,750000,1000000,2500000,5000000,7500000,10000000,12500000,15000000,20000000,30000000];
    var lastOne=0;
    var stufe=0;
    for (row=2;row<table.rows.length;row++) {
    	stufe++;
        goldSum1=0;
	if (table.rows[row].cells.length==1) {
	   continue;
	}
        if (table.rows[row].cells[1].textContent) {
            virtuellGebaude.prod.anzahl=parseFloat(table.rows[row].cells[1].textContent);
        }
        for (i=0;i<needs.length;i++) {
            virtuellGebaude.need[needs[i]]=parseFloat(table.rows[row].cells[2+i].textContent);
        }
        var analyse=Ausbau.analyseGebaude(virtuellGebaude);
        table.rows[row].cells[1].id="row_"+row;
        contentNode=Toolbox.Tooltip.createToolTip(table.rows[row].cells[1]);
        if (analyse["UprodW"]){
            Toolbox.addElement(contentNode,"div","Produktionswert: "+Toolbox.printNum(analyse["UprodW"]));
            if (analyse["UmitEinkauf"]||analyse["UmitEigenProd"]) {
                Toolbox.addElement(contentNode,"div","Mit Einkauf: "+Toolbox.printNum(analyse["UmitEinkauf"]));
                Toolbox.addElement(contentNode,"div","Mit EigenProduktion: "+Toolbox.printNum(analyse["UmitEigenProd"]));
            }
        }
        for (i=0;i<numStoff;i++) {
            var countHere=Toolbox.parseNumber(table.rows[row].cells[i+stoffStart].textContent);
            if (countHere){
	       goldSum1+=market[stoffs[i]]["Ubuy"]*countHere;
            }
        }

        Toolbox.addElement(contentNode,"div","Renovierung/h:"+Toolbox.printNum((goldSum1/((speed?30:300)*24))));
        var td=Toolbox.addElement(table.rows[row],"td",Toolbox.printNum(parseInt(goldSum1)));
        goldSum+=goldSum1;
        td.id="goldwert_"+row;
        var prodWert=analyse["UmitEinkauf"]||analyse["UprodW"];
        Toolbox.Tooltip.createToolTip(td,"Totale Kosten: "+Toolbox.printNum(parseInt(goldSum)));
        var normFact=1;
        td=Toolbox.addElement(table.rows[row],"td",Toolbox.printNum((goldSum/prodWert)/24,100));
        if (goldSum>(effSteps[0])) {
            lastOne=goldSum;
            shouldBe=effSteps[0];
            normFact=shouldBe/goldSum;
            effSteps.shift();
            effGold.push(shouldBe);
            effWerte.push(parseInt((goldSum/prodWert)/24*normFact*100)/100);
        //element.style.color="orange";
        }
    }
    var neuElement=document.createElement("div");
    table.parentNode.insertBefore(neuElement,table.previousSibling);
    Toolbox.addElement(neuElement,"span","Effizienzwerte für dieses Gebäude sind: ");
    neuTable=Toolbox.addElement(neuElement,"table");
    tr=Toolbox.addElement(neuTable,"tr");
    Toolbox.addElement(tr,"th","Kosten");
    function prettyKM(gold) {
        if (gold%1000000==0) {
            return (gold/1000000)+"M ";
        }
        if (gold%1000==0) {
            return (gold/1000)+"K ";
        }
        return gold;
    }
    for (i=0;i<effWerte.length;i++) {
        Toolbox.addElement(tr,"td",prettyKM(effGold[i]));
        //Toolbox.addElement(neuElement,"span",effWerte[i]+"d ");
    }
    tr=Toolbox.addElement(neuTable,"tr");
    Toolbox.addElement(tr,"th","Dauer").title="Dauer in Tagen, bis ein Gebäude das xx Kostet (von 0 bis Stufe xy), seine eigene Kosten eingespielt hat";
    for (i=0;i<effWerte.length;i++) {
        Toolbox.addElement(tr,"td",effWerte[i]+"d ");
    }
    Toolbox.addElement(neuElement,"div");
}

if (document.URL.indexOf('t=chat')!=-1 && Toolbox.isEnabled("MUTATE_CHAT")) {
    Toolbox.addDebug("Chat!");
    chatcontent=document.getElementById("chat_content");
    modifierActive=false;
    chatcontent.addEventListener("DOMSubtreeModified",Chat.mutateChat,false);
}


angebotUsers={};
buyFromLines=[];
unsafeWindow.buyFromLines=buyFromLines;



//Drachenstruktur: >=>= nun in persistent!!!
///drache[id]={
//  currentIndex=0;
//  phasen=[{
//       phase=DP_EI,
//       update=timestamp;
//       resourcen=[{stoff:'xy',anzahl:'12'},...x5],
//       punkte=[100,105,...] // Punkte am ANFANG der Phase
//       regler=[105,0,0,0,0] // Aktueller (bzw END stand der regler)
//       
//   },{...}...]

unsafeWindow.allDrachen=persistent.data.drachen;
cPhase=null;
currentEditDrache=null;
var editPane=null;

//Drachen.editLogbuch();
unsafeWindow.edit=Drachen.editLogbuch;

if (document.URL.indexOf('t=drachenhorst')!=-1) {
    Toolbox.addDebug("Drachenhorst ");
    persistent.doAfterInit(Drachen.workDrachenHorst);
}

//----------------------------------------------
//--- Markt seiten
//----------------------------------------------
if (document.URL.indexOf('t=market')!=-1) {
    document.URL.match(/&product=(\w*)/);
    var stoff=RegExp.$1;
    if (stoff) {
        var infoSpan;
        var buyInput=document.getElementById("c_"+stoff);
        var sellInput=document.getElementById("cs_"+stoff);
        if (buyInput) {
            var buyPrice=parseInt(buyInput.nextSibling.nextSibling.textContent.match(/\b\d+\b/));
            infoSpan=Toolbox.addElement(buyInput.parentNode,"span","für "+(parseInt("0"+buyInput.value,10)*buyPrice)+" Gold");
            infoSpan.id='i_c_'+stoff;
             buyInput.addEventListener('change',function(event) {
                     document.getElementById('i_'+this.id).firstChild.textContent='für '+parseInt(this.value)*buyPrice+' Gold';
                 },true);
        }
        if (sellInput) {
            var sellPrice=parseInt(sellInput.nextSibling.nextSibling.textContent.match(/\b\d+\b/));
            infoSpan=Toolbox.addElement(sellInput.parentNode,"span","für "+(parseInt("0"+sellInput.value,10)*sellPrice)+" Gold");
            infoSpan.id='i_cs_'+stoff;
             sellInput.addEventListener('change',function(event) {
                     document.getElementById('i_'+this.id).firstChild.textContent='für '+parseInt(this.value)*sellPrice+' Gold';
                 },true);
        }

        urequestInput=document.getElementById('cd_'+stoff);
        urequestPrice=document.getElementById('gd_'+stoff);
        uofferInput=document.getElementById('co_'+stoff);
        uofferPrice=document.getElementById('go_'+stoff);

        function calcRequest() {
            var key=this.id.match(/(._.*)$/)[1];
            var count=parseInt(document.getElementById('c'+key).value);
            var price=parseInt(document.getElementById('g'+key).value);
            var msg='';
            if (count && price) {
                msg='(∑'+(count*price)+' Gold)';
            } 
            document.getElementById('i_'+key).firstChild.textContent=msg;
        }
	function parsePreis(cell,npcbuy,npcsell) {
	    var prices=cell.textContent.match(/Preisspanne: *(\d+)-(\d+) *Gold/);
	    Toolbox.addDebug("Ausgelesen:"+prices+":"+buyPrice+","+sellPrice);
	    var price=(parseInt(prices[2])+parseInt(prices[1]))/2.0;
	    if (buyPrice) {
	       price=((parseInt(prices[2])+parseInt(prices[1]))/2.0+buyPrice*100.0/config["PRICE_NPC_H"])/2.0;
	    }
	    if (sellPrice) {
 	       price=((parseInt(prices[2])+parseInt(prices[1]))/2.0+sellPrice*100.0/config["PRICE_NPC_L"])/2.0;
	    }
	    Toolbox.addDebug("==> ~ "+price);
	    xstoff=Toolbox.parseStoff(stoff);
	    if (market[xstoff]===undefined) {
	       market[xstoff]={};
	    }
	    market[xstoff]["buy"]=Math.round(config["PRICE_NPC_H"]*price/100);
            market[xstoff]["sell"]=Math.round(config["PRICE_NPC_L"]*price/100);
            market[xstoff]["nbuy"]=parseInt(prices[2]);
            market[xstoff]["nsell"]=parseInt(prices[1]);
	    market[xstoff]['update']=currentTime;
	    Toolbox.addDebug("Errechnete NPC Preise:"+market[xstoff].buy+":"+market[xstoff].sell);
	}
        if (urequestInput) {
	    parsePreis(urequestInput.parentNode,buyPrice,sellPrice);
            infoSpan=Toolbox.addElement(urequestInput.parentNode,"span"," ");
            infoSpan.id='i_d_'+stoff;
            urequestInput.addEventListener('change',calcRequest,true);
            urequestPrice.addEventListener('change',calcRequest,true);
        }
        if (uofferInput) {
	    parsePreis(uofferInput.parentNode,buyPrice,sellPrice);
             infoSpan=Toolbox.addElement(uofferInput.parentNode,"span"," ");
             infoSpan.id='i_o_'+stoff;
            uofferInput.addEventListener('change',calcRequest,true);
            uofferPrice.addEventListener('change',calcRequest,true);
        }

        stoff=stoff.replace(/sattel/,"saettel");
        marktStoff=stoff;
        var buyTable=document.getElementById("market_buy");
        var sellTable=document.getElementById("market_sell");
        if (buyTable) {
            Market.workBuySellTable(buyTable,true,stoff);
            Market.addMarktAusbau(buyTable);
        }
        if (sellTable) {
            Market.workBuySellTable(sellTable,false,stoff);
            if (!buyTable) {
                Market.addMarktAusbau(sellTable);
            }
        }
	if (urequestInput || uofferInput) {
            storage.setObject("GS_market",market);
	}
	
    }
    if ((document.URL.indexOf('tab=')==-1 && (stoff==null||stoff==""))  ||
        document.URL.indexOf('tab=10')!=-1) {
            Market.workMarketUebersicht();
    }
    if ((document.URL.indexOf('tab=11')!=-1)||
        (document.URL.indexOf('tab=12')!=-1)) {
            Market.workMarketLog();
    }
   

}

if (document.URL.indexOf('t=messages')==-1) {
    if (config["deletingLinks"]) {
        config["deletingLinks"]=false;
        storage.setObject("GS_config",config);
    }
}


if (Toolbox.isEnabled("HIGHLIGHT_MESSAGES")) {
    Messages.highlight_messages_link();
}

if (document.URL.indexOf('t=messages')!=-1 ) {
    if (config["deletingLinks"] && Toolbox.isEnabled("READ_ALL_BUTTON")) {
        Messages.readFirstUnreadURL();
    }
    if (Toolbox.isEnabled("SUMUP_RE") && document.URL.indexOf('action=reply_message')) {
            var i_subject=Toolbox.getByXPath("//input[@name='subject']");
            if (i_subject) {
                    var subject=i_subject.value.match(/((?:\[Re(?:\^\d+)?:\] )*)(.*)/);
                    var res=subject[1];
                    subject=subject[2];
                    res=res.match(/\[Re(?:\^(\d+))\]/g);
                    var i;
                    var count=res.length;
                    for (i=0;i<res.length;i++) {
                            countmatch=res[i].match(/Re\^(\d+):/);
                            if (countmatch) {
                                    //substract 1, the Re itself has been counted already
                                    count=count+parseInt(countmatch[1])-1;
                            }
                    }
                    if (count==1) {
                            i_subject.value="[Re:] "+subject;
                    } else if (count>1) {
                            i_subject.value="[Re^"+count+":] "+subject;
                    }
            }
    }
    if (document.URL.indexOf('t=messages&id')!=-1 ) {
        var element=Toolbox.getByXPath("/html/body/div/div[4]/div/div[4]/div/div/div[2]/div/div");
        var date=element.textContent.match(/von\s+(\S+)\s+am (\d+)\.(\d+)\s+(\d+):(\d+)/);
        var found=element.textContent.match(/Dir\s+(\d*)\s+(\S*)\s+f.r\s+insgesamt\s+(\d*)\s+Gold\s+(\S+)/);
        if (found) {
            Toolbox.addElement(element,"div","(Kurs: "+(found[3]/found[1])+" Gold pro "+found[2]+")");
        }
        if (date && found) {
            Toolbox.readTransaction(date,found);
        }
    }
    if (Toolbox.isEnabled("READ_ALL_BUTTON")) {
        var form=Toolbox.getByXPath("//form");
        unsafeWindow.form=form;
        var line=Toolbox.addElement(form,"div");
        line.style.marginTop="4px";
        
        var input=Toolbox.addElement(line,"span","Alle lesen");
        Toolbox.addElement(form.parentNode,"br");
        input.style.margin="1px";
        input.style.cursor="default";
        input.className="button";
        input.type="submit";
        input.value="Alle Lesen";
        input.style.background="#fff";
        input.addEventListener("click",function() {
                config["deletingLinks"]=true;
                storage.setObject("GS_config",config);
                Messages.readFirstUnreadURL();
                return false;},true);
    }
    if (Toolbox.isEnabled("NACHRICHTEN_X")) {
        var  allAs=document.getElementsByTagName("a");
        for (i=0;i<allAs.length;i++) {
            var txt=allAs[i].textContent;
            var id=allAs[i].href.match(/show_message&pos.*&id=(\d*)/);
            var type=allAs[i].href.match(/&type=\d/);
            if (id!=null) {
                var node=document.createElement("a");
                node.href='index.php?t=messages&request='+requestId+'&action=delete_message&id='+id[1];
                if (type) {
                    node.href=node.href+type;
                }
                node.style.fontSize="60%";
                node.style.textDecoration='none';
                node.style.color='black';          
                node.appendChild(document.createTextNode("[x]"));
                allAs[i].parentNode.insertBefore(node,allAs[i].nextSibling);
            }
        }
    }
}
var newOrder=config["NEW_ORDER"];//"1,2,3,4,5,6,7,8,9,10,11,20,13,14,15,16,17,18,19,12";
buildingpositions={"pos0":{"position":"display:none  ","index":""}};
buildingRules={};

var stunde=startDate.getHours();
if (Toolbox.isEnabled("LETITBENIGHT") && (stunde>=parseInt(config["LETITBENIGHT_NIGHT"]) || stunde<parseInt(config["LETITBENIGHT_DAY"]))) {
    Dragosien.letItBeNight();
}

if (document.URL.indexOf('t=village')==-1 && Toolbox.isEnabled("HIDE_LANDVERWALTUNG")) {
   var landverwaltung=Toolbox.getByXPath('//a[contains(@href,"landverwaltung")]');
   landverwaltung.href="?t=village";
}

if (document.URL.indexOf('t=village')!=-1) {
    if (Toolbox.isEnabled("REORDER")) {
        Toolbox.reorder();
    }
    //On the main village page
    // Toolbox.addRight("Landverwaltung!");
    oldProd=produktion;
    produktion=new Object();
    produktion["bauplatze"]=oldProd["bauplatze"];
    if (isNaN(parseInt(produktion["bauplatze"]))) {
        if (gebaude["position=22"]) {
            produktion["bauplatze"]=22;
        }
    }
    produktion["nonprofit"]=0;
    var allDivs=document.getElementsByTagName("div");
    for (i=0;i<allDivs.length;i++) {
       if (allDivs[i].className=="box_description") {
	  if (allDivs[i].textContent.match(/Du hast (\d+) von/)) {
	     //               Toolbox.addRight(RegExp.$1);
	     produktion["bauplatze"]=RegExp.$1;		 
	     var kosten=allDivs[i].textContent.match(/Landstück kostet Dich (\d+) Gold./);
	     if (kosten) {
		kosten=parseInt(kosten[1]);
		gebaudeInfo=storage.getObject("GS_gebaudeInfo");
		if (!gebaudeInfo["Landstück"]) {
		   gebaudeInfo["Landstück"]={};
		}
		if (!gebaudeInfo["Landstück"][produktion["bauplatze"]]) {
		   gebaudeInfo["Landstück"][produktion["bauplatze"]]={"prod":{"Land":1},"need":{},"ausbau":{"gold":kosten,"_ggold":kosten},"update":currentTime};
		   storage.setObject("GS_gebaudeInfo",gebaudeInfo);
		}
	     }
 	     // var a=document.createElement("a");
	     // var img=Toolbox.addElement(a,"img");
	     // img.src="http://serv.endoftheinternet.org/help.png";
	     // a.style.cssFloat="right";
	     // a.href="http://serv.endoftheinternet.org/dragosien/info.php?geb=Landstück&ausbau=1";
	     // a.target="dragoHelp";
	     // //allDivs[i].appendChild(a);
	     // allDivs[i].insertBefore(a,allDivs[i].childNodes[2]);
	  }
       }
        
        //Buggy (fixed) - dieser bereich setzt ausbausterne, auch gebäude die nicht produzieren/pausiert sind können ausgebaut werden
		//Gebäude, die aber schon im Ausbau sind nicht!
        if (allDivs[i].className.indexOf("status")!=-1 &&
		    allDivs[i].className.indexOf("progress")==-1) {
            //  Toolbox.addRight(allDivs[i].className);
            var txt=allDivs[i].textContent;
            if (txt.match(/Lager/)
                ||txt.match(/Kaufmann/)
                ||txt.match(/Bauherr/)
                ||txt.match(/Arena/)
                ||txt.match(/Drachenzucht/)) {
                produktion["nonprofit"]++;
            }
            var position=allDivs[i].className.match(/pos(\d+)/);
            if (position) {
                position="position="+parseInt(position[1]);
                if (gebaude[position]) {
                    if (txt.match(/produziert\s+([0-9.,]+)\s+(\S+)\b/)) {
                        var stoff=RegExp.$2;    
                        var num=RegExp.$1;
                        if ((position!="position=21" && position!="position=22") &&
                            (gebaude[position]["prod"].stoff!=Toolbox.parseStoff(stoff) ||
                            gebaude[position]["prod"].anzahl!=Toolbox.parseNumber(num))) {
                            Toolbox.addElement(allDivs[i].childNodes[1],"div","Gebäude Information veraltet!");
                            var marker=Toolbox.addElement(allDivs[i],"span","\u26a0");
                            //img.src="http://serv.endoftheinternet.org/star.png";
                            marker.style.color="red";
                            marker.style.background="white";
                            marker.style.border="1px solid black";
                            marker.style.fontWeight="bold";
                            marker.style.fontSize="150%";
                            marker.style.position="relative";
                            marker.style.left="9px";
                            marker.style.top="42px";
                        }
                    }

                    var ausbauMoeglich=2;
                    var fehlt="";
                    for (stoff in gebaude[position]["ausbau"]) {
                        if (stoff[0]!="_") {
                            var bestand=parseInt(lager[stoff]);
                            if (lager[stoff]==undefined) {
                                bestand=0;
                            }
                            if (ausbauMoeglich==2) {
                                ausbauMoeglich=1;
                            }
                            if (bestand<gebaude[position]["ausbau"][stoff]) {
                                ausbauMoeglich=0;
                                fehlt+=(gebaude[position]["ausbau"][stoff]-bestand)+" "+Toolbox.prettyStoff(stoff)+" ";
                            }
                        }
                    }
                    if (ausbauMoeglich==1) {
                        if (Toolbox.isEnabled("MARK_AUSBAU")) {
                            var img=Toolbox.addElement(allDivs[i],"img");
                            img.src="http://serv.endoftheinternet.org/star.png";
                            img.style.position="relative";
                            img.style.left="49px";
                            img.style.top="32px";
                        }
                        if (Toolbox.isEnabled("TIP_AUSBAU")){
                            Toolbox.addElement(allDivs[i].childNodes[1],"div","Ausbau ist möglich");
                        }
                    } else {
                        if (Toolbox.isEnabled("TIP_AUSBAU")) {
                            allDivs[i].childNodes[1].style.width="320px";
                            Toolbox.addElement(allDivs[i].childNodes[1],"div","Zum Ausbau fehlen: "+fehlt);
                        }
                    }
                    
                    //Info bis wann die Ressourcen reichen nur wenn Gebäude Ressourcen vorrätig hat -> nicht pausiert ist
                    if (Toolbox.isEnabled("TIP_VORRAT") && allDivs[i].className.indexOf("pause") == -1) {
                        for (stoff in gebaude[position]["lager"]) {                           
                            if(typeof(gebaude[position]["lager"][stoff]["reichtBis"]) !== "undefined") {
                                var reichtBis=new Date(gebaude[position]["lager"][stoff]["reichtBis"]);
                                if (Toolbox.isEnabled("TIP_VORRAT_dauer")) {
                                    reichtBis=" noch "+Toolbox.dauer(reichtBis);
                                } else {
                                    reichtBis=" bis "+Toolbox.simpleDate(reichtBis);
                                }
                                Toolbox.addElement(allDivs[i].childNodes[1],"div",Toolbox.prettyStoff(stoff)+
                                       reichtBis);
                            }
                        }
                    }
                }
            }
        }
        produktion["updated"]=1;
    }
    if (produktion["bauplatze"]>20) {
        produktion["nonprofit"]++;
    }
}

var need=new Object();
for (position in gebaude) {
    if (position!='position=21') {
        var needs=gebaude[position]["need"];
        for (stoff in needs) {
            var bisher=parseFloat(need[stoff]) || 0;
            need[stoff]=bisher+parseFloat(needs[stoff]);
        }
        if (gebaude[position]["prod"].stoff && produktion["updated"]) { 
               Toolbox.addProduktion(gebaude[position].prod.stoff,gebaude[position]["prod"].anzahl);
        }
    }
}
produktion.updated=false;
storage.setObject("GS_produktion",produktion);
storage.setObject("GS_gebaude",gebaude);

allNachschubRows=[];

var indikator=0;
var lagerwert=0;
var indikatorBerechnung="";


if (storeTable && storeTable.className=="overview") {
    if (storeTable.rows[0].cells[0].textContent.indexOf("Produktion je h")!=-1){
        Toolbox.workProdTable();
     }
    if (storeTable.rows[0].cells[0].textContent.indexOf("Materialnachschub")!=-1){
        storeTable.rows[0].cells[0].title="Sortiermodus ändern";
        storeTable.rows[0].cells[0].addEventListener("click",function() {
                if (!config["NACHSCHUB_SORT"]) {
                    config["NACHSCHUB_SORT"]=true;
                    config["NACHSCHUB_SORT_NAME"]=false;
                } else {
                    if (config["NACHSCHUB_SORT_NAME"]) {
                        config["NACHSCHUB_SORT"]=false;
                    } else {
                        config["NACHSCHUB_SORT_NAME"]=true;
                    }
                }
                storage.setObject("GS_config",config);
                Toolbox.workNachschubTable(true);
            },true);
        Toolbox.workNachschubTable();
    } else if (storeTable.rows[0].cells[0].textContent.indexOf("Erforschte Geb")!=-1) {
        Toolbox.addDebug("Reiter 'G'");
        if (Toolbox.isEnabled("GEBAUDE_SORT")) {
            Toolbox.workGebaudeTable();
        }
    } 
}
if (storeTable && storeTable.className=="store") {
	if (storeTable.rows[0].cells[0].textContent.indexOf("Zustand der Geb")!=-1) {
		Toolbox.workZustandTable();
	} else
	{
	    Toolbox.addDebug("Reiter 'L'");
	    for (i=0;i<storeTable.rows.length;i++) {
		if ((storeTable.rows[i].cells[0].colSpan==2)) {
		    var capacity=storeTable.rows[i].textContent.match(/Lager:\s*([0-9.]*)\s*je/);
		    if (capacity) {
		    Toolbox.addDebug("Kapazität:"+capacity);
		    lager["capacity"]=Toolbox.parseNumber(capacity[1]);
		    }
		}
		if ((storeTable.rows[i].cells.length==2) && (storeTable.rows[i].cells[0].tagName=="TD")) {
		    var stoff= storeTable.rows[i].cells[0].firstChild.firstChild.data;
		     stoff=Toolbox.parseStoff(stoff.substring(0,stoff.length-1));
		    stoffRows[stoff]=storeTable.rows[i];
		    
		    var mightHideRow=true;
	
		    storeTable.rows[i].cells[1].style.textAlign="left";
		    var bestand=Toolbox.parseNumber(storeTable.rows[i].cells[1].firstChild.data);
		    lager[stoff]=bestand;
		    if (bestand!=0) {
		    mightHideRow=false;
		    }
	
		    if (market[stoff]) {
		    lagerwert+=bestand*market[stoff]["sell"];
		    }
		    Toolbox.addDebug(stoff+":"+bestand);
		    Toolbox.addDebug("*PROD/NEED* "+produktion[stoff]+"/"+need[stoff]);
		    if (produktion[stoff] || need[stoff]) {
			//wenn MORE ausgewählt, Produktion ignorieren
			if (!Toolbox.isEnabled("COMPACT_STORETABLE_MORE")) {
			    mightHideRow=false;
			}
			//storeTable.rows[i].childNodes[1].firstChild.innerHTML=storeTable.rows[i].childNodes[1].firstChild.data+"&nbsp;(+"+produktion[stoff]+")";
			var span=document.createElement("span");
			span.style.fontSize=config["FONTSIZE"];
			span.style.paddingLeft="3px";
			var element=Toolbox.addElement(span,"span","(");
			element.style.color="#000";
			var sum=0;
			if (produktion[stoff]) {
			    //                text=text+"+"+produktion[stoff];
			    sum=produktion[stoff];
			    Toolbox.addElement(span,"span","+"+Toolbox.printNum(produktion[stoff],1));
			    if (need[stoff])
				{
				    var element=Toolbox.addElement(span,"span","|");
				    element.style.color="#000";
				}
			}
			if (need[stoff]) {
			    //                text=text+"-"+need[stoff];
			    Toolbox.addElement(span,"span","-"+Toolbox.printNum(need[stoff],1));
			    sum-=need[stoff];
			    if (produktion[stoff]) {
			span.title="="+(sum);
			    }
			}
			element=Toolbox.addElement(span,"span",")");
			element.style.color="#000";
			if (sum<0) {
			    span.style.color=config["COLOR_MINUS"];
			} else if (sum>0)
			    {
				span.style.color=config["COLOR_PLUS"];
			    }
			Toolbox.addDebug(stoff+":"+sum);
			if (stoff!="drachenei") {
			    if (market[stoff]) {
				if (Toolbox.isEnabled("LAGER_MARKT")){
				    storeTable.rows[i].childNodes[1].title=market[stoff]["buy"]+"|"+market[stoff]["sell"];
				}
				var needTo="sell";
				if (sum<0) {
				    needTo="buy";
				}
				indikator+=sum*market[stoff]["U"+needTo];          
				if (indikatorBerechnung.length>0 && (sum>=0)) {
				    indikatorBerechnung+="+";
				}
				indikatorBerechnung=indikatorBerechnung+sum+"*"+market[stoff]["U"+needTo];
			    } else {
				Toolbox.addRight("Preise für "+stoff+" noch unbekannt");
			    }
			}
			text=text+")";           
			if (Toolbox.isEnabled("LAGER_PROD")) {
			    storeTable.rows[i].cells[1].insertBefore(span,storeTable.rows[i].cells[1].lastChild);
			}
		   }
		    if (Toolbox.isEnabled("LAGER_ANGEBOTE") && lager.angebote && lager.nachfragen) {
			Toolbox.addDebug("Angebote einblenden:");
			var stoffi=0;
			var stoffAngebote=0;
			var stoffNachfragen=0;
			for (stoffi=0;stoffi<lager["angebote"].length;stoffi++) {
			    if (lager.angebote[stoffi].stoff==stoff) {
				stoffAngebote+=lager.angebote[stoffi].zahl;
				}
			}
			for (stoffi=0;stoffi<lager["nachfragen"].length;stoffi++) {
			    if (lager.nachfragen[stoffi].stoff==stoff) {
				    stoffNachfragen+=lager.nachfragen[stoffi].zahl;
			    }
			}
			if (stoffAngebote || stoffNachfragen) {
			    mightHideRow=false;
			    var span2=document.createElement("span");
			    storeTable.rows[i].cells[1].insertBefore(span2,storeTable.rows[i].cells[1].lastChild);                        
			    if (stoffAngebote) {
				Toolbox.addElement(span2,"span"," A:"+stoffAngebote);
			    }
			    if (stoffAngebote&&stoffNachfragen) {
				Toolbox.addElement(span2,"span"," ");
			    }
			    if (stoffNachfragen) {
				Toolbox.addElement(span2,"span","N:"+stoffNachfragen);
			    }
			    span2.style.fontSize=config.FONTSIZE2;
			}
		    }
		    if (mightHideRow && Toolbox.isEnabled("COMPACT_STORETABLE")) {
		        if (thisIsFF) {
			  stoffRows[stoff].style.visibility="collapse";
			} else {
			  stoffRows[stoff].style.display="none";
			  }
			stoffRows[stoff].className=stoffRows[stoff].className+" collapseable";
		    }
		}
	    }
	    if (produktion["gold"]) {
		indikator=indikator+produktion["gold"];
		indikatorBerechnung=indikatorBerechnung+" "+produktion["gold"];
	    }
	}
}

if (config["WARN_EXCEED"]) {
    Toolbox.showExceeds();
}


if (Toolbox.isEnabled("SHORTAGE")) {
    Toolbox.showShortage();
}

storage.setItem("GS_lager",JSON.stringify(lager));

if (Toolbox.isEnabled("LAGER_WERT")) {
    element=Toolbox.addRight("Lagerwert:"+Toolbox.printNum(lagerwert),"Beim kompletten Verkauf des Lagerbestandes");
    lagerWert2=Toolbox.addElement(element,"span"," ");
};
if (Toolbox.isEnabled("ANGEBOTE_WERT")){
    var bestSum=0;
    var bestTxt="";
    var worstSum=0;
    var worstTxt="";
    if (lager["angebote"]){
        for (i=0;i<lager["angebote"].length;i++)
            {
                if (market[lager["angebote"][i]["stoff"]]) {
                    //                Toolbox.addRight(i+":"+lager["angebote"][i]["stoff"]);
                    bestSum+=lager["angebote"][i]["zahl"]*lager["angebote"][i]["preis"];
                    bestTxt+=lager["angebote"][i]["zahl"]+"*"+lager["angebote"][i]["preis"]+"("+lager["angebote"][i]["stoff"]+") +";
                    worstSum+=lager["angebote"][i]["zahl"]*market[lager["angebote"][i]["stoff"]]["sell"];
                    worstTxt+=lager["angebote"][i]["zahl"]+"*"+market[lager["angebote"][i]["stoff"]]["sell"]+"("+lager["angebote"][i]["stoff"]+") +";
                }
            }
        if (bestSum) {
            var a=Toolbox.addElement(Toolbox.addElement(box,"div"),"a","Angebotswert: "+Toolbox.printNum(bestSum)+" ("+Toolbox.printNum(worstSum)+")");
            a.title="Wert der eigenen Angebote am Markt - Wert im Klammern bei Verkauf an den Händler";
            a.href="index.php?t=market";
            a.className="link";
            a.display="block";
        }
    }
    bestSum=0;
    bestTxt="";
    worstSum=0;
    worstTxt="";
    if (lager["nachfragen"]){
        for (i=0;i<lager["nachfragen"].length;i++)
            {
                if (market[lager["nachfragen"][i]["stoff"]]) {
                    bestSum+=lager["nachfragen"][i]["zahl"]*lager["nachfragen"][i]["preis"];
                    bestTxt+=lager["nachfragen"][i]["zahl"]+"*"+lager["nachfragen"][i]["preis"]+"("+lager["nachfragen"][i]["stoff"]+") + ";
                    worstSum+=lager["nachfragen"][i]["zahl"]*market[lager["nachfragen"][i]["stoff"]]["buy"];
                    worstTxt+=lager["nachfragen"][i]["zahl"]+"*"+market[lager["nachfragen"][i]["stoff"]]["sell"]+"("+lager["nachfragen"][i]["stoff"]+") +";
                } else {
                    Toolbox.addRight("!!! Preise für "+Toolbox.prettyStoff(stoff)+" fehlen");
                }
            }
    }
    if (bestSum) {
        var a=Toolbox.addElement(Toolbox.addElement(box,"div"),"a","Nachfragewert: "+Toolbox.printNum(bestSum)+" ("+Toolbox.printNum(worstSum)+")");
        a.title="Wert der eigenen Angebote am Markt - Wert im Klammern bei Kauf dieser Stoffe vom Händler";
        a.href="index.php?t=market";
        a.className="link";
    }

}


if (Toolbox.isEnabled("GLOBAL_ANALYSE")) {
    line=Toolbox.addRight("Gesamter Überschuß/h:"+Toolbox.printNum(indikator,10),indikatorBerechnung);
    unsafeWindow.line=line;
    graphlink=Toolbox.addElement(line,"span","[...]");
    graphlink.style.textDecoration="underline";
    graphlink.style.cursor="pointer";
    graphlink.style.paddingLeft="0.5em";
    graphlink.addEventListener("click",Toolbox.makeGraph,false);
}
if (Toolbox.isEnabled("GLOBAL_ANALYSE_DAY")) {
    Toolbox.addRight("Gesamter Überschuß/d:"+Toolbox.printNum(indikator*24,10));
}

persistent.doAfterInit(Core.doSample);

if (Toolbox.isEnabled("GLOBAL_ANALYSE")) {
    Toolbox.addRight("Effizienz:"+Toolbox.printNum(indikator/(produktion["bauplatze"]-produktion["nonprofit"]),10),
                 produktion["bauplatze"]+" Grundstücke "+produktion["nonprofit"]+
                 " NonProfit Bauten");
    }

ausbauMarker=document.createElement("div");
ausbauMarkerImg=Toolbox.addElement(ausbauMarker,"img");
ausbauMarkerImg.src="http://serv.endoftheinternet.org/star.png";
ausbauMarker.style.position="absolute";
ausbauMarker.style.top="55px";
ausbauMarker.style.left="955px";
ausbauMarker.style.zIndex="250";
ausbauMarker.style.display="none";
Toolbox.addIcon(ausbauMarker);

ausbauMarkerDetail=Toolbox.addElement(ausbauMarker,"div");
ausbauMarkerDetail.id='ausbauMarkerDetail';
ausbauMarkerDetail.style.MozBorderRadius="1em";
ausbauMarkerDetail.style.position="absolute";
ausbauMarkerDetail.style.right="10px";
ausbauMarkerDetail.style.top="25px";
ausbauMarkerDetail.style.border="1px solid black";
ausbauMarkerDetail.style.background="#fff";
ausbauMarkerDetail.style.minWidth="240px";
//ausbauMarkerDetail.style.height="180px";
ausbauMarkerDetail.style.display='none';

var ausbauAutoHideTimeout=null;
ausbauMarker.addEventListener("mouseover",
        function() {ausbauMarkerDetail.style.display='block';
                                  if (ausbauAutoHideTimeout) {
                                      window.clearTimeout(ausbauAutoHideTimeout);
                                  }
},true);
function hideAusbau() {
    ausbauMarkerDetail.style.display='none';
    ausbauAutoHideTimeout=null;
}
ausbauMarker.addEventListener("mouseout",
        function() {
            ausbauAutoHideTimeout=window.setTimeout(hideAusbau,600);
},true);
ausbauMarkerImg.addEventListener("click",hideAusbau,true);







//


//marked
function addImportExport() {
    var note=Toolbox.getByXPath("//input[@value='save_notice']");
    var buttonP=null;
    var oldButton=null;
    if (note) {
        note=Toolbox.getByXPath("textarea",note.parentNode);
        buttonP=Toolbox.getByXPath("p",note.parentNode);
        oldButton=Toolbox.getByXPath("input",buttonP);
    } else {
      return;
    }
    noteValue=note.value.match(/\u2550\u2550\u2550SCRIPT DATEN\u2550\u2550\u2550\n(.*)/);
    var newButtonImportSpan=document.createElement('span');
    var newButtonExportSpan=document.createElement('span');
    var newButtonImport=Toolbox.addElement(newButtonImportSpan,"input");
    var newButtonExport=Toolbox.addElement(newButtonExportSpan,"input");
    buttonP.insertBefore(newButtonImportSpan,oldButton);
    buttonP.insertBefore(newButtonExportSpan,oldButton);
    newButtonImport.type="submit";
    newButtonImport.value="Import";
    if (!noteValue) {
                newButtonImport.disabled='disabled';
                newButtonImport.style.background='gray';
                newButtonImportSpan.style.display='none';
    }
    newButtonExport.type="submit";
    newButtonExport.value="Export";
    newButtonExport.title="Speichert Drachenlogbuchdaten im Notizbuch zur Übernahme auf einem anderen PC";
    newButtonImport.title="Lädt Drachenlogbuchdaten im Notizbuch zur Übernahme auf einem anderen PC";
    newButtonExport.addEventListener("click",function(){
            if (note.value.indexOf("\u2550\u2550\u2550SCRIPT DATEN\u2550\u2550\u2550")) {
                note.value=note.value.replace(/\n\u2550\u2550\u2550SCRIPT DATEN\u2550\u2550\u2550\n(.*)/,"");
            }
            note.value=note.value+"\n\u2550\u2550\u2550SCRIPT DATEN\u2550\u2550\u2550\n";
            var toExport={"drachen":persistent.data.drachen,"ausbau":lager.ausbau};
            note.value=note.value+JSON.stringify(toExport);
        },true);
    newButtonImport.addEventListener("click",function(evt){
            try {
                if (noteValue) {
                    var toImport=JSON.parse(noteValue[1]);
                    var pane=Panes.makePane();
                    var importOkay=true;
                    var drachenid;
                    var drachen=persistent.data.drachen;
                    if (toImport && toImport.drachen) {
                        Toolbox.addElement(pane,"div","Importiere DrachenLogbuch aus Notizen...");
                        for (drachenid in toImport.drachen){
                            Toolbox.addElement(pane,"h1","Drache #"+drachenid);
                            var remoteTime=toImport.drachen[drachenid].phasen[toImport.drachen[drachenid].currentIndex].update;
                            Toolbox.addElement(pane,"div","Zu importierende Daten von: "+Toolbox.simpleDate(new Date(remoteTime)));
                            if (drachen[drachenid]) {
                                var localTime=drachen[drachenid].phasen[drachen[drachenid].currentIndex].update;
                                var local=Toolbox.addElement(pane,"div","Lokale Daten von: "+Toolbox.simpleDate(new Date(localTime)));
                                if (localTime>remoteTime) {
                                    importOkay=false;
                                    local.style.color='red';
                                }
                            }
                        }
                        if (!importOkay) {
                            importOkay=confirm("Lokale Daten scheinen aktueller zu sein als die im Notizbuch. Sicher?");
                        }
                        if (importOkay) {
                            persistent.data.drachen=toImport.drachen;
                            persistent.data.update=new Date().getTime();
                            persistent.updateRemote();
                            //storage.setObject("GS_drachen",drachen);
                            Toolbox.addElement(pane,"div","... Importieren  abgeschlossen");
                        }
                    }
                } else {
                    alert("Keine Daten!?");
                } } catch (error) {
                alert("ERROR "+error);
            }
            evt.cancelBubble=true;
            evt.preventDefault();
        },true);
    unsafeWindow.note=note;
}

addImportExport();

if (document.URL.indexOf("info")!=-1) {
    Panes.makeInfoPane();
}

if (document.URL.indexOf("config")!=-1) {
    Toolbox.addRight("Konfigurationslink erkannt");
    Panes.makeConfigPane();
    configPane.style.display="block";
}
if (Toolbox.isEnabled("CONFIG_ICON")) {
    profileStart("CONFIG_ICON");
    configIcon=document.createElement("img");
    configIcon.src="http://serv.endoftheinternet.org/config.png";
    configIcon.style.cursor="pointer";
    configIcon.style.position="absolute";
    configIcon.style.top="25px";
    configIcon.style.left="955px";
    configIcon.style.zIndex="250";
    configIcon.style.display="block";
    configIcon.title="Konfiguration Erweiterung";
    Toolbox.addIcon(configIcon);
    configIcon.addEventListener("click",function() {
            Panes.makeConfigPane();
            configPane.style.display="block";
        },true);
    profileEnd("CONFIG_ICON");
}

if (Toolbox.isEnabled("INFO_ICON")) {
    profileStart("INFO_ICON");
    infoIcon=document.createElement("img");
    infoIcon.src="http://serv.endoftheinternet.org/info.png";
    infoIcon.style.cursor="pointer";
    infoIcon.style.position="absolute";
    infoIcon.style.top="25px";
    infoIcon.style.left="935px";
    infoIcon.style.zIndex="250";
    infoIcon.style.display="block";
    infoIcon.title="Gebäudeinformationen";
    Toolbox.addIcon(infoIcon);
    infoIcon.addEventListener("click",function() {
        Panes.makeInfoPane();
        infoPane.style.display="block";
    },true);
    profileEnd("INFO_ICON");
}
if (Toolbox.isEnabled("RATE_PRODUKTION")) {        
    ressIcon=document.createElement("span");
    ressIcon.style.cursor="pointer";
    ressIcon.appendChild(document.createTextNode("(P)"));
//    ressIcon.src="http://serv.endoftheinternet.org/info.png";
    ressIcon.style.position="absolute";
    ressIcon.style.top="5px";
    ressIcon.style.left="935px";
    ressIcon.style.zIndex="250";
    ressIcon.style.display="block";
    ressIcon.title="";
    Toolbox.addIcon(ressIcon);
    ressIcon.addEventListener("click",function() {
            Panes.makeRessPane();
            ressPane.style.display="block";},true);
}
    helpIcon=document.createElement("a");  
    helpIcon.href="http://dragopedia.de/";
    helpIcon.title="Öffentliche Dragopedia";
    if (gebaudeName) {
        helpIcon.href+=gebaudeName;
	helpIcon.title="Öffentliche Dragopedia - "+gebaudeName;
    }
    helpIcon.target="dragoHelp";
    helpImg=Toolbox.addElement(helpIcon,"img");
    helpImg.src="http://serv.endoftheinternet.org/help.png";
    helpIcon.style.background="";
    helpIcon.style.paddingLeft="";
    helpIcon.style.position="absolute";
    helpIcon.style.top="25px";
    helpIcon.style.left="915px";
    helpIcon.style.zIndex="250";
    helpIcon.style.display="block";
    Toolbox.addIcon(helpIcon);


if (lager["ausbau"] && Toolbox.isEnabled("MARK_RESOURCE")) {
    //    Toolbox.addDebug("=>"+stoffRows["holz"]+"<=");
    Ausbau.markAllAusbau();
    //Ausbau.markAusbau(lager["ausbau"]);
}
var tickerHtml;
if (Toolbox.isEnabled("TILLEND")) {
    tickerHtml=Toolbox.getByXPath("//div[@id='competitionReport']");
}
var doTicker=false;
var selfModify=false;


if (tickerHtml) {
    tickerHtml.addEventListener("DOMSubtreeModified",Toolbox.reworkTicker,false);
    Toolbox.reworkTicker();
}

if (Toolbox.isEnabled("UPDATE_CHECK")&&(! config["lastCheck"] || ((config["lastCheck"]+(3600*1000))<currentTime))) {
    Core.checkUpdate();
}
if (Toolbox.isEnabled("PRICE_CHECK") && ( doUpgradePrices || (!config["priceCheck"])  || ((config["priceCheck"]+(3600*1000))<currentTime))) {
        Core.checkPrices();
}
//Toolbox.addRight("--- Debug Resourcenanzeige ---");
endTime=new Date().getTime();
versionString="Version "+version+" ("+(endTime-startTime)+" ms)";
if (configPane) {
    element=Toolbox.addElement(configPane,"div",versionString);
    element.style.fontSize="60%";
    element.style.textAlign="right";
    element.style.paddingTop="2em";
}
Toolbox.addDebug("Debug aktiviert");
//element.addEventListener("click",function(){ 
//        document.getElementById("addPane").style.display='block';
//},true);
if (doAlert.length>0) {
    var div=Toolbox.makeTextOption();
    div.style.left="540px";
    div.style.top="150px";
    unsafeWindow.alerts=doAlert;
    for (i in doAlert) {
        div.appendChild(doAlert[i]);
        doAlert[i].style.border="2px solid red";
        doAlert[i].style.padding="0.5em";
    }
}
if (debug) {
    unsafeWindow.GM=this;
    unsafeWindow.GM_market=market;
    unsafeWindow.GM_produktion=produktion;
    unsafeWindow.GM_gebaude=gebaude;
    unsafeWindow.GM_lager=lager;
    unsafeWindow.GM_profiles=profileTimes;
    unsafeWindow.GM_persistent=persistent;
}
if (document.URL.indexOf('script=DBGPER')!=-1) {
    var div=Panes.makePane();
    div.style.left="50px";
    div.style.top="100px";
    Toolbox.addElement(div,"H1","DEBUG - Persistent Storage");
    Toolbox.addElement(div,"p","Lastupdate:"+persistent.data.update);
    Toolbox.addElement(div,"p","LastCheck:"+persistent.data.lastCheck);
    Toolbox.addElement(div,"p","data:"+JSON.stringify(persistent.data));
    remote=Toolbox.addElement(div,"p","remote: fetching...");
    remote.style.borderTop="1px solid black";
    remote.id="REMOTE_DATA";
    GM_xmlhttpRequest({
            method:"GET",
                url:basehref+"?t=ajax_whisper&action=get_json",
                headers:{
                "User-Agent":navigator.userAgent,
                    "Accept":"text/plain"
                    },
                onload:function(response) {
                remote.textContent="remote: "+response.responseText;
            }
        });    
}