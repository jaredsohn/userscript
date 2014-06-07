// ==UserScript==
// @name           Unnamed Private Plugin
// @description    Unnamed Private Plugin by Argeath
// @author         Argeath
// @match          http://*e-sim.org*
// @require        http://code.jquery.com/jquery.js
// @require        http://code.jquery.com/ui/1.9.0-rc.1/jquery-ui.js
// @version        1.1
// ==/UserScript==

var BOT = {
    menu: null,
    bot: GM_getValue("bot"),
    offline: GM_getValue("offline"),
    Betap: GM_getValue("Betap"),
    nick: GM_getValue("nick"),
    delay: GM_getValue("delay"),
    Ccomp: GM_getValue("Ccomp"),
    node: GM_getValue("node"),
    cjobMarket: GM_getValue("cjobMarket"),
    crjobMarket: GM_getValue("crjobMarket"),
    cworkersNum: GM_getValue("cworkersNum"),
    timeout: null,
    countries: new Array("PL", "UA", "HU", "HR", "LT", "SRB"),
    countriesId: new Array(1, 16, 8, 12, 19, 11),
	
    PLBes: new Array(null, GM_getValue("PLBes1"), GM_getValue("PLBes2"),GM_getValue("PLBes3"),GM_getValue("PLBes4"),GM_getValue("PLBes5"),GM_getValue("PLBes6"),GM_getValue("PLBes7"),GM_getValue("PLBes8"),GM_getValue("PLBes9"),GM_getValue("PLBes10")),
    PLCes: new Array(null, GM_getValue("PLCes1"), GM_getValue("PLCes2"),GM_getValue("PLCes3"),GM_getValue("PLCes4"),GM_getValue("PLCes5"),GM_getValue("PLCes6"),GM_getValue("PLCes7"),GM_getValue("PLCes8"),GM_getValue("PLCes9"),GM_getValue("PLCes10")),
	PLjobMarket: new Array(GM_getValue("PLjobMarket1"), GM_getValue("PLjobMarket2"),GM_getValue("PLjobMarket3"),GM_getValue("PLjobMarket4"),GM_getValue("PLjobMarket5"),GM_getValue("PLjobMarket6"),GM_getValue("PLjobMarket7"),GM_getValue("PLjobMarket8"),GM_getValue("PLjobMarket9"),GM_getValue("PLjobMarket10")),
 
    UABes: new Array(null, GM_getValue("UABes1"), GM_getValue("UABes2"),GM_getValue("UABes3"),GM_getValue("UABes4"),GM_getValue("UABes5"),GM_getValue("UABes6"),GM_getValue("UABes7"),GM_getValue("UABes8"),GM_getValue("UABes9"),GM_getValue("UABes10")),
	UACes: new Array(null, GM_getValue("UACes1"), GM_getValue("UACes2"),GM_getValue("UACes3"),GM_getValue("UACes4"),GM_getValue("UACes5"),GM_getValue("UACes6"),GM_getValue("UACes7"),GM_getValue("UACes8"),GM_getValue("UACes9"),GM_getValue("UACes10")),
	UAjobMarket: new Array(GM_getValue("UAjobMarket1"), GM_getValue("UAjobMarket2"),GM_getValue("UAjobMarket3"),GM_getValue("UAjobMarket4"),GM_getValue("UAjobMarket5"),GM_getValue("UAjobMarket6"),GM_getValue("UAjobMarket7"),GM_getValue("UAjobMarket8"),GM_getValue("UAjobMarket9"),GM_getValue("UAjobMarket10")),
	
    HUBes: new Array(null, GM_getValue("HUBes1"), GM_getValue("HUBes2"),GM_getValue("HUBes3"),GM_getValue("HUBes4"),GM_getValue("HUBes5"),GM_getValue("HUBes6"),GM_getValue("HUBes7"),GM_getValue("HUBes8"),GM_getValue("HUBes9"),GM_getValue("HUBes10")),
	HUCes: new Array(null, GM_getValue("HUCes1"), GM_getValue("HUCes2"),GM_getValue("HUCes3"),GM_getValue("HUCes4"),GM_getValue("HUCes5"),GM_getValue("HUCes6"),GM_getValue("HUCes7"),GM_getValue("HUCes8"),GM_getValue("HUCes9"),GM_getValue("HUCes10")),
	HUjobMarket: new Array(GM_getValue("HUjobMarket1"), GM_getValue("HUjobMarket2"),GM_getValue("HUjobMarket3"),GM_getValue("HUjobMarket4"),GM_getValue("HUjobMarket5"),GM_getValue("HUjobMarket6"),GM_getValue("HUjobMarket7"),GM_getValue("HUjobMarket8"),GM_getValue("HUjobMarket9"),GM_getValue("HUjobMarket10")),
	
    HRBes: new Array(null, GM_getValue("HRBes1"), GM_getValue("HRBes2"),GM_getValue("HRBes3"),GM_getValue("HRBes4"),GM_getValue("HRBes5"),GM_getValue("HRBes6"),GM_getValue("HRBes7"),GM_getValue("HRBes8"),GM_getValue("HRBes9"),GM_getValue("HRBes10")),
	HRCes: new Array(null, GM_getValue("HRCes1"), GM_getValue("HRCes2"),GM_getValue("HRCes3"),GM_getValue("HRCes4"),GM_getValue("HRCes5"),GM_getValue("HRCes6"),GM_getValue("HRCes7"),GM_getValue("HRCes8"),GM_getValue("HRCes9"),GM_getValue("HRCes10")),
	HRjobMarket: new Array(GM_getValue("HRjobMarket1"), GM_getValue("HRjobMarket2"),GM_getValue("HRjobMarket3"),GM_getValue("HRjobMarket4"),GM_getValue("HRjobMarket5"),GM_getValue("HRjobMarket6"),GM_getValue("HRjobMarket7"),GM_getValue("HRjobMarket8"),GM_getValue("HRjobMarket9"),GM_getValue("HRjobMarket10")),
	
    LTBes: new Array(null, GM_getValue("LTBes1"), GM_getValue("LTBes2"),GM_getValue("LTBes3"),GM_getValue("LTBes4"),GM_getValue("LTBes5"),GM_getValue("LTBes6"),GM_getValue("LTBes7"),GM_getValue("LTBes8"),GM_getValue("LTBes9"),GM_getValue("LTBes10")),
	LTCes: new Array(null, GM_getValue("LTCes1"), GM_getValue("LTCes2"),GM_getValue("LTCes3"),GM_getValue("LTCes4"),GM_getValue("LTCes5"),GM_getValue("LTCes6"),GM_getValue("LTCes7"),GM_getValue("LTCes8"),GM_getValue("LTCes9"),GM_getValue("LTCes10")),
	LTjobMarket: new Array(GM_getValue("LTjobMarket1"), GM_getValue("LTjobMarket2"),GM_getValue("LTjobMarket3"),GM_getValue("LTjobMarket4"),GM_getValue("LTjobMarket5"),GM_getValue("LTjobMarket6"),GM_getValue("LTjobMarket7"),GM_getValue("LTjobMarket8"),GM_getValue("LTjobMarket9"),GM_getValue("LTjobMarket10")),
	
    SRBBes: new Array(null, GM_getValue("SRBBes1"), GM_getValue("SRBBes2"),GM_getValue("SRBBes3"),GM_getValue("SRBBes4"),GM_getValue("SRBBes5"),GM_getValue("SRBBes6"),GM_getValue("SRBBes7"),GM_getValue("SRBBes8"),GM_getValue("SRBBes9"),GM_getValue("SRBBes10")),
	SRBCes: new Array(null, GM_getValue("SRBCes1"), GM_getValue("SRBCes2"),GM_getValue("SRBCes3"),GM_getValue("SRBCes4"),GM_getValue("SRBCes5"),GM_getValue("SRBCes6"),GM_getValue("SRBCes7"),GM_getValue("SRBCes8"),GM_getValue("SRBCes9"),GM_getValue("SRBCes10")),
	SRBjobMarket: new Array(GM_getValue("SRBjobMarket1"), GM_getValue("SRBjobMarket2"),GM_getValue("SRBjobMarket3"),GM_getValue("SRBjobMarket4"),GM_getValue("SRBjobMarket5"),GM_getValue("SRBjobMarket6"),GM_getValue("SRBjobMarket7"),GM_getValue("SRBjobMarket8"),GM_getValue("SRBjobMarket9"),GM_getValue("SRBjobMarket10")),

    cworkers: GM_getValue("cworkers"),
    oldcworkers: GM_getValue("oldcworkers"),
    companies: GM_getValue("companies"),
    installed: GM_getValue("installed"),
    
    CSS: ''+
        '#Bmenu{width: 980px; height: 200px; background: rgba(255, 255, 255, 0.5); padding: 20px 20px 20px 20px; border: 1px black solid; z-index: 9999; }\n\n'+
        '.Bfieldset{height: 95%; float: left; padding: 5px 5px 5px 5px; border: 1px black dashed; }\n\n',
    
    reset: function() {
        var keys = GM_listValues();
        for (var i=0, key=null; key=keys[i]; i++) {
            GM_deleteValue(key);
        }
    },
    
    init: function() {
        GM_addStyle(BOT.CSS);
        $('head').append("<link href='http://pokemon-unity.netai.net/esim/tabs.css' type='text/css' rel='stylesheet'>");
        $('head').append('<script type="text/javascript"> $(document).ready(function() { $("#tabs").tabs(); }); </script>');
        if(BOT.nick == null || BOT.nick == undefined)
            GM_setValue("nick", $("#userName").text());
        
        BOT.nick = $("#userName").text();
        BOT.menu = '<div id="Bmenu">';
        BOT.menu += '<fieldset id="Bcompanies" class="Bfieldset"  style="width: 250px;"><legend>Firmy</legend><div style="overflow: auto; width: 100%; height: 90%;">';
        if(BOT.companies != undefined && BOT.companies.split("|")[0] != undefined && BOT.companies.split("|")[0].split("=")[1] != undefined)
        {
            var companies = BOT.companies.split("|");
            for(var i in companies)
            {
                var worked = "";
                if(BOT.cworkers != undefined && BOT.cworkers.split("|")[i] != undefined)
                {
                    worked = BOT.cworkers.split("|")[i].split("-")[0] + ' / ' + BOT.cworkers.split("|")[i].split("-")[1];
                }
                BOT.menu += '<a href="http://primera.e-sim.org/company.html?id=' + companies[i].split("=")[0] + '">' + companies[i].split("=")[1] + ' (' + companies[i].split("=")[2] + ' ' + companies[i].split("=")[3] + ')</a> ' + worked + '<br />';
            }
        }
        BOT.menu += "</div></fieldset>";
		BOT.menu += '<fieldset class="Bfieldset" style="width: 340px;"><legend>JobMarket</legend>';
        BOT.menu += '<div id="tabs"><ul><li><a href="#tabs-pl">PL</a></li>';
        BOT.menu += '<li><a href="#tabs-ua">UA</a></li>';
        BOT.menu += '<li><a href="#tabs-hu">HU</a></li>';
        BOT.menu += '<li><a href="#tabs-hr">HR</a></li>';
        BOT.menu += '<li><a href="#tabs-lt">LT</a></li>';
        BOT.menu += '<li><a href="#tabs-srb">SRB</a></li></ul>';
		
		
		//PL
        BOT.menu += '<div id="tabs-pl"><div style="overflow: auto; width: 100%; height: 90%;">';
        var jobOffers = BOT.PLjobMarket;
        for(var i in jobOffers)
        {
            var j = parseInt(i) + 1;
            var checked = "";
            if(BOT.PLBes[j] == true)
                checked = "checked";
            var checkedd = "";
            if(BOT.PLCes[j] == true)
                checkedd = "checked";
            if(jobOffers[i] != undefined)
            {
                var clr = "red";
                if(jobOffers[i].split("-")[1] == BOT.nick || jobOffers[i].split("-")[1] == "Regit Ltd.")
                   clr = "green";
                
                BOT.menu += '<input style="margin: 0;" type="checkbox" id="PLCes' + j + '"' + checkedd + '/><input style="margin: 0;" type="checkbox" id="PLBes' + j + '"' + checked + '/>ES' + j + ' - <span style="color: ' + clr + ';">' + jobOffers[i].split("-")[1] + '</span> - ' + jobOffers[i].split("-")[0] + 'PLN<br />';
            }
            else
                BOT.menu += '<input style="margin: 0;" type="checkbox" id="PLCes' + j + '"' + checkedd + '/><input style="margin: 0;" type="checkbox" id="PLBes' + j + '" ' + checked + ' />ES' + j + ' niesprawdzone<br />';
        }
        BOT.menu += "</div></div>";
		
		//UA
        BOT.menu += '<div id="tabs-ua"><div style="overflow: auto; width: 100%; height: 90%;">';
        var jobOffers = BOT.UAjobMarket;
        for(var i in jobOffers)
        {
            var j = parseInt(i) + 1;
            var checked = "";
            if(BOT.UABes[j] == true)
                checked = "checked";
            var checkedd = "";
            if(BOT.UACes[j] == true)
                checkedd = "checked";
            if(jobOffers[i] != undefined)
            {
                var clr = "red";
                if(jobOffers[i].split("-")[1] == BOT.nick || jobOffers[i].split("-")[1] == "Regit Ltd.")
                   clr = "green";
                
                BOT.menu += '<input style="margin: 0;" type="checkbox" id="UACes' + j + '"' + checkedd + '/><input style="margin: 0;" type="checkbox" id="UABes' + j + '"' + checked + '/>ES' + j + ' - <span style="color: ' + clr + ';">' + jobOffers[i].split("-")[1] + '</span> - ' + jobOffers[i].split("-")[0] + 'UAH<br />';
            }
            else
                BOT.menu += '<input style="margin: 0;" type="checkbox" id="UACes' + j + '"' + checkedd + '/><input style="margin: 0;" type="checkbox" id="UABes' + j + '" ' + checked + ' />ES' + j + ' niesprawdzone<br />';
        }
        BOT.menu += "</div></div>";
		
		//HU
        BOT.menu += '<div id="tabs-hu"><div style="overflow: auto; width: 100%; height: 90%;">';
        var jobOffers = BOT.HUjobMarket;
        for(var i in jobOffers)
        {
            var j = parseInt(i) + 1;
            var checked = "";
            if(BOT.HUBes[j] == true)
                checked = "checked";
            var checkedd = "";
            if(BOT.HUCes[j] == true)
                checkedd = "checked";
            if(jobOffers[i] != undefined)
            {
                var clr = "red";
                if(jobOffers[i].split("-")[1] == BOT.nick || jobOffers[i].split("-")[1] == "Regit Ltd.")
                   clr = "green";
                
                BOT.menu += '<input style="margin: 0;" type="checkbox" id="HUCes' + j + '"' + checkedd + '/><input style="margin: 0;" type="checkbox" id="HUBes' + j + '"' + checked + '/>ES' + j + ' - <span style="color: ' + clr + ';">' + jobOffers[i].split("-")[1] + '</span> - ' + jobOffers[i].split("-")[0] + 'HUF<br />';
            }
            else
                BOT.menu += '<input style="margin: 0;" type="checkbox" id="HUCes' + j + '"' + checkedd + '/><input style="margin: 0;" type="checkbox" id="HUBes' + j + '" ' + checked + ' />ES' + j + ' niesprawdzone<br />';
        }
        BOT.menu += "</div></div>";
		
		//HR
        BOT.menu += '<div id="tabs-hr"><div style="overflow: auto; width: 100%; height: 90%;">';
        var jobOffers = BOT.HRjobMarket;
        for(var i in jobOffers)
        {
            var j = parseInt(i) + 1;
            var checked = "";
            if(BOT.HRBes[j] == true)
                checked = "checked";
            var checkedd = "";
            if(BOT.HRCes[j] == true)
                checkedd = "checked";
            if(jobOffers[i] != undefined)
            {
                var clr = "red";
                if(jobOffers[i].split("-")[1] == BOT.nick || jobOffers[i].split("-")[1] == "Regit Ltd.")
                   clr = "green";
                
                BOT.menu += '<input style="margin: 0;" type="checkbox" id="HRCes' + j + '"' + checkedd + '/><input style="margin: 0;" type="checkbox" id="HRBes' + j + '"' + checked + '/>ES' + j + ' - <span style="color: ' + clr + ';">' + jobOffers[i].split("-")[1] + '</span> - ' + jobOffers[i].split("-")[0] + 'HRK<br />';
            }
            else
                BOT.menu += '<input style="margin: 0;" type="checkbox" id="HRCes' + j + '"' + checkedd + '/><input style="margin: 0;" type="checkbox" id="HRBes' + j + '" ' + checked + ' />ES' + j + ' niesprawdzone<br />';
        }
        BOT.menu += "</div></div>";
		
		//LT
        BOT.menu += '<div id="tabs-lt"><div style="overflow: auto; width: 100%; height: 90%;">';
        var jobOffers = BOT.LTjobMarket;
        for(var i in jobOffers)
        {
            var j = parseInt(i) + 1;
            var checked = "";
            if(BOT.LTBes[j] == true)
                checked = "checked";
            var checkedd = "";
            if(BOT.LTCes[j] == true)
                checkedd = "checked";
            if(jobOffers[i] != undefined)
            {
                var clr = "red";
                if(jobOffers[i].split("-")[1] == BOT.nick || jobOffers[i].split("-")[1] == "Regit Ltd.")
                   clr = "green";
                
                BOT.menu += '<input style="margin: 0;" type="checkbox" id="LTCes' + j + '"' + checkedd + '/><input style="margin: 0;" type="checkbox" id="LTBes' + j + '"' + checked + '/>ES' + j + ' - <span style="color: ' + clr + ';">' + jobOffers[i].split("-")[1] + '</span> - ' + jobOffers[i].split("-")[0] + 'LTL<br />';
            }
            else
                BOT.menu += '<input style="margin: 0;" type="checkbox" id="LTCes' + j + '"' + checkedd + '/><input style="margin: 0;" type="checkbox" id="LTBes' + j + '" ' + checked + ' />ES' + j + ' niesprawdzone<br />';
        }
        BOT.menu += "</div></div>";
		
		//SRB
        BOT.menu += '<div id="tabs-srb"><div style="overflow: auto; width: 100%; height: 90%;">';
        var jobOffers = BOT.SRBjobMarket;
        var checked = "";
        for(var i in jobOffers)
        {
            var j = parseInt(i) + 1;
            
            if(BOT.SRBBes[j] == true)
                checked = "checked";
            var checkedd = "";
            if(BOT.SRBCes[j] == true)
                checkedd = "checked";
            if(jobOffers[i] != undefined)
            {
                var clr = "red";
                if(jobOffers[i].split("-")[1] == BOT.nick || jobOffers[i].split("-")[1] == "Regit Ltd.")
                   clr = "green";
                
                BOT.menu += '<input style="margin: 0;" type="checkbox" id="SRBCes' + j + '"' + checkedd + '/><input style="margin: 0;" type="checkbox" id="SRBBes' + j + '"' + checked + '/>ES' + j + ' - <span style="color: ' + clr + ';">' + jobOffers[i].split("-")[1] + '</span> - ' + jobOffers[i].split("-")[0] + 'RSD<br />';
            }
            else
                BOT.menu += '<input style="margin: 0;" type="checkbox" id="SRBCes' + j + '"' + checkedd + '/><input style="margin: 0;" type="checkbox" id="SRBBes' + j + '" ' + checked + ' />ES' + j + ' niesprawdzone<br />';
        }
        BOT.menu += "</div></div>";
		
		
		
		BOT.menu += "</div></fieldset>";
		
        BOT.menu += '<fieldset class="Bfieldset" style="width: 160px;"><legend>Menu</legend>';
        BOT.menu += '<button id="Bbutton1">Ustaw firmy</button><br />';
        BOT.menu += '<button id="Bbutton4">Dodaj firmy stocku</button><br />';
        BOT.menu += '<hr />Dodaj firmę ręcznie:<br />';
        BOT.menu += 'ID: <input style="width: 50px;" type="text" id="Cid" /><br />';
        BOT.menu += 'Nazwa: <input style="width: 100px;" type="text" id="Cname" /><br />';
        BOT.menu += '<button id="Cbutton">Dodaj</button><br />';
        BOT.menu += "</fieldset>";
        
        BOT.menu += '<fieldset class="Bfieldset"  style="width: 160px;"><legend>Bot</legend>';
        BOT.menu += '<button id="Bbutton2">START</button>';
        BOT.menu += '<button id="Bbutton3">STOP</button><br />';
        if(BOT.delay == undefined)
        {
            GM_setValue("delay", 60);
            BOT.delay = 60;
        }
        BOT.menu += 'Interwał: <input type="text" id="Bdelay" name="Bdelay" size="2" value="' + BOT.delay + '" style="width: 30px;"/><br />';
        checked = "";
        if(BOT.Ccomp == true)
            checked = "checked";
        BOT.menu += 'Sprawdzaj firmy: <input style="margin: 0;" type="checkbox" id="Ccomp"' + checked + '/><br />';
        checked = "";
        if(BOT.offline == true)
            checked = "checked";
        BOT.menu += 'Tryb offline: <input style="margin: 0;" type="checkbox" id="offline"' + checked + '/><br />';
        BOT.menu += "Ostatni Apdejt: <div id='BlastUpd'> </div></fieldset>";
        
        BOT.menu += '</div>';
        

        $("#headerRow").html(BOT.menu);
        $("#Bbutton3").attr("disabled", "disabled");
        //START
        if(BOT.bot == true)
        {
            $("#Bbutton2").attr("disabled", "disabled");
            $("#Bbutton3").removeAttr("disabled");
        }
        
        //STOP
        if(BOT.bot == false)
        {
            $("#Bbutton3").attr("disabled", "disabled");
            $("#Bbutton2").removeAttr("disabled");
        }
        
        //Ustaw firmy
        $("#Bbutton1").click(function () {
            if(BOT.offline == true)
                return;
            GM_setValue("node", 'checkCompanies');
            window.location.href = "http://primera.e-sim.org/companies.html";
        });
        
        //Dodaj firmy stocku
        $("#Bbutton4").click(function () {
            if(BOT.offline == true)
                return;
            GM_setValue("node", 'checkStockCompanies');
            window.location.href = "http://primera.e-sim.org/stockCompany.html?id=450";
        });
        
        $("#Cbutton").click(function () {
            var tekst = '|' + $('#Cid').val() + '=' + $('#Cname').val() + '==';
            GM_setValue("companies", GM_getValue("companies") + tekst);
            BOT.companies = BOT.companies + tekst;
            BOT.reloadPage();
        });
        
        //START
        $("#Bbutton2").click(function () {
            GM_setValue("bot", true);
            BOT.bot = true;
            GM_setValue("node", null);
            BOT.node = null;
            GM_setValue("delay", parseInt( $("#Bdelay").val() ));
            BOT.delay = parseInt( $("#Bdelay").val());
            
            if($('#Ccomp').attr('checked') != undefined)
            {
                GM_setValue('Ccomp', true);
            }
            else
            {
                GM_setValue('Ccomp', false);
            }
            
            if($('#offline').attr('checked') != undefined)
            {
                GM_setValue('offline', true);
            }
            else
            {
                GM_setValue('offline', false);
            }
            
            for(var country in BOT.countries)
            {
                for(var i = 0; i < 11; i++)
                {
                    if($('#' + BOT.countries[country] + 'Bes' + i).attr('checked') != undefined)
                    {
                        GM_setValue('' + BOT.countries[country] + 'Bes' + i, true);
                    }
                    else
                    {
                        GM_setValue('' + BOT.countries[country] + 'Bes' + i, false);
                    }
                    
                    if($('#' + BOT.countries[country] + 'Ces' + i).attr('checked') != undefined)
                    {
                        GM_setValue('' + BOT.countries[country] + 'Ces' + i, true);
                    }
                    else
                    {
                        GM_setValue('' + BOT.countries[country] + 'Ces' + i, false);
                    }
                }
            }
            
            
            GM_setValue("Betap", 1);
            BOT.Betap = 1;
            $("#Bbutton2").attr("disabled", "disabled");
            $("#Bbutton3").removeAttr("disabled");
            setTimeout(BOT.reloadPage, 3000);
        });
        
        //STOP
        $("#Bbutton3").click(function () {
            GM_setValue("bot", false);
            BOT.bot = false;
            $("#Bbutton3").attr("disabled", "disabled");
            $("#Bbutton2").removeAttr("disabled");
        });
        
        if(BOT.installed == undefined || BOT.installed < 1 || BOT.node == 'checkCompanies')
        {
            BOT.checkCompanies();
        }
        
        if(BOT.node == 'checkCworkers')
        {
            BOT.checkCworkers(BOT.cworkersNum);
        }
        
        if(BOT.node == 'checkStockCompanies')
        {
            BOT.checkStockCompanies();
        }
        
        if(BOT.cjobMarket > 0 && BOT.cjobMarket < 11 && BOT.node == 'checkJobMarket')
        {
            BOT.checkJobMarket(BOT.cjobMarket, BOT.crjobMarket);
            return;
        }
        if(BOT.Betap == 1)
            BOT.Bmain();
    },
    
    
    
    checkCompanies: function() {
        if(BOT.offline == true)
            return;
        if(window.location.href != "http://primera.e-sim.org/companies.html") {
            window.location.href = "http://primera.e-sim.org/companies.html";
        }
        var companies = [];
        $('.dataTable tr').each(function() {
            if (!this.rowIndex) return;
            var tekst1 = $(this).find("td").eq(0).html();
            var compId = tekst1.substring(26, 34);
            compId = compId.substring(0, compId.indexOf("\""));
            var compName = tekst1.substring(tekst1.indexOf('old">')+5, tekst1.indexOf("</a>"));
            
            var tekst2 = $(this).find("td").eq(1).html();
            var compT = tekst2.substring(84, 100);
            compT = compT.substring(0, compT.indexOf("."));
            var compQ = tekst2.substring(150, 170);
            compQ = compQ.substring(compQ.indexOf("\q"), compQ.indexOf(".png"));
            
            companies.push(compId + '=' + compName + '=' + compT + '=' + compQ);
        });
        
        GM_setValue("companies", companies.join("|"));
        GM_setValue("node", null);
        GM_setValue("installed", 1);
        window.location.href = "http://primera.e-sim.org/index.html";
    },
    
    
    
    checkStockCompanies: function() {
        if(BOT.offline == true)
            return;
        if(window.location.href != "http://primera.e-sim.org/stockCompany.html?id=449") {
            window.location.href = "http://primera.e-sim.org/stockCompany.html?id=449";
        }
        var companies = [];
        $(".dataTable").eq(-5).find("tr").each(function() {
            if (!this.rowIndex) return;
            var tekst1 = $(this).find("td").eq(0).html();
            var compId = tekst1.substring(115, 130);
            compId = compId.substring(compId.indexOf("=")+1, compId.indexOf("\">"));
            
            tekst1 = tekst1.substring(120, 160);
            var compName = tekst1.substring(tekst1.indexOf('">')+2, tekst1.indexOf("</a>"));
            
            var tekst2 = $(this).find("td").eq(1).html();
            
            companies.push(compId + '=' + compName + '=' + tekst2 + '=');
        });
        
        
        GM_setValue("companies", GM_getValue("companies") + "|" + companies.join("|"));
        GM_setValue("node", null);
        GM_setValue("installed", 2);
        window.location.href = "http://e-sim.org/index.html";
    },
    
    
    
    
    checkJobMarket: function(skill, country) {
        var Bes = new Array(BOT.PLBes, BOT.UABes, BOT.HUBes, BOT.HRBes, BOT.LTBes, BOT.SRBBes);
        var Ces = new Array(BOT.PLCes, BOT.UACes, BOT.HUCes, BOT.HRCes, BOT.LTCes, BOT.SRBCes);
        var jobMarket = new Array(BOT.PLjobMarket, BOT.UAjobMarket, BOT.HUjobMarket, BOT.HRjobMarket, BOT.LTjobMarket, BOT.SRBjobMarket);
        if(Ces[country] != null && Ces[country][skill] == true)
        {
            if(window.location.href != "http://primera.e-sim.org/jobMarket.html?countryId=" + BOT.countriesId[country] + "&minimalSkill=" + skill) {
                window.location.href = "http://primera.e-sim.org/jobMarket.html?countryId=" + BOT.countriesId[country] + "&minimalSkill=" + skill;
                return;
            }
            var tekst1 = $(".dataTable tr").eq(1).html();
            if(tekst1 == undefined)
            {
                BOT.reloadPage();
                return;                
            }
            var nick = tekst1.substring(tekst1.indexOf("\">")+2, tekst1.indexOf("</a>"));
            var error = 0;
            if(nick.indexOf('<td') >= 0)
                error = 1;
            var salary = tekst1.substring(tekst1.indexOf('.png"><b>')+9, tekst1.indexOf('.png"><b>')+20);
            salary = salary.substring(0, salary.indexOf('</b>'));
            if(error == 0)
                GM_setValue("" + BOT.countries[country] + "jobMarket"+skill, salary + '-' + nick);
            else
                GM_setValue("" + BOT.countries[country] + "jobMarket"+skill, null);
            
            if(skill < 10 && country < 6)
            {
                GM_setValue("cjobMarket", skill + 1);
                BOT.checkJobMarket(skill+1, country);
                return;
            }
            else
            {
                GM_setValue("cjobMarket", 1);
                GM_setValue("crjobMarket", country + 1);
                BOT.checkJobMarket(1, country+1);
                return;
            }
        }
        else
        {
            
            if(skill < 10)
            {
                GM_setValue("cjobMarket", skill + 1);
                BOT.checkJobMarket(skill+1, country);
                return;
            }
            else if(skill >= 10 && country < 5)
            {
                GM_setValue("cjobMarket", 1);
                GM_setValue("crjobMarket", country + 1);
                BOT.checkJobMarket(1, country+1);
                return;
            }
            else
            {
                GM_setValue("cjobMarket", 11);
                GM_setValue("crjobMarket", 7);
                GM_setValue("node", null);
                BOT.node = null;
                GM_setValue("Betap", 2);
                BOT.Betap = 2;
                BOT.Bmain();
                return;
            }
        }
    },
    
    
    checkCompany: function(id) {
        if(id == null || id == undefined)
        {
            GM_setValue("node", null);
            return;
        }
        if(window.location.href != "http://primera.e-sim.org/company.html?id=" + id) {
            window.location.href = "http://primera.e-sim.org/company.html?id=" + id;
            return;
        }
        var okno = $(".testDivwhite").eq(-2).html();
        if(okno == undefined)
        {
            BOT.reloadPage();
            return;
        }
        var worked = okno.substring(okno.indexOf("who worked today:")+18, okno.indexOf("who worked today:")+19);
        var workers = 0;
        $('.dataTable').eq(0).find("tr").each(function() {
            if (!this.rowIndex) return;
            if ($(this).find("td").eq(0).text() == "No workers") return;
            workers++;
        });
        GM_setValue("cworkersNum", GM_getValue("cworkersNum") + 1 );
        if(GM_getValue("cworkers") == null)
            GM_setValue("cworkers", worked + '-' + workers);
        else
            GM_setValue("cworkers", GM_getValue("cworkers") + '|' + worked + '-' + workers);
        BOT.reloadPage();
      
    },
    
    
    
    checkCworkers: function(num) {
        var companies = BOT.companies.split("|");
        if(companies[num] == undefined)
        {
            if(GM_getValue("cworkers") != GM_getValue("oldcworkers"))
                BOT.playSound();
            GM_setValue("node", null);
            GM_setValue("Betap", 3);
            BOT.Betap = 3;
            setTimeout(BOT.Bmain, 1000);
        }
        var id = companies[num].split("=")[0];
        BOT.checkCompany(id);
    },
    
    
    
    Bmain: function() {
        if(BOT.bot != true)
            return;
        if(BOT.Betap == 1)
        {
            GM_setValue("node", 'checkJobMarket');
            GM_setValue("cjobMarket", 1);
            GM_setValue("crjobMarket", 0);
            BOT.checkJobMarket(1, 0);
            return;
        }
        if(BOT.Betap == 2)
        {
            if(BOT.Ccomp == true)
            {
                GM_setValue("cworkersNum", 0);
                BOT.cworkersNum = 0;
                GM_setValue("oldcworkers", GM_getValue("cworkers"));
                GM_setValue("cworkers", null);
                GM_setValue("node", 'checkCworkers');
                BOT.reloadPage();
                return;
            }
            else
            {
                GM_setValue("node", null);
                GM_setValue("Betap", 3);
                BOT.Betap = 3;
                setTimeout(BOT.Bmain, 1000);
                return;
            }
        }
        if(BOT.Betap == 3)
        {
            var d = new Date();
            $("#BlastUpd").html(d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds());
            BOT.checkJobMarkets();
            return;
        }
        if(BOT.Betap == 4)
        {
            BOT.checkAlerts();
            return;
        }
        if(BOT.Betap == 5)
        {
            GM_setValue("Betap", 1);
            BOT.Betap = 1;
            setTimeout(BOT.Bmain, BOT.delay * 1000 + Math.random()*10);
        }
    },
    
    
    
    checkAlerts: function() {
        if(BOT.offline == false)
        {
            var alerts = parseInt($(".plate b").eq(-2).text());
            if(alerts > 0)
            {
                BOT.playSound();
            }
            var messages = parseInt($(".plate b").eq(-3).text());
            if(messages > 0)
            {
                BOT.playSound();
            }
        }
        GM_setValue("Betap", 5);
        BOT.Betap = 5;
        BOT.Bmain();
    },
    
    
    
    checkJobMarkets: function() {
        var Bes = new Array(BOT.PLBes, BOT.UABes, BOT.HUBes, BOT.HRBes, BOT.LTBes, BOT.SRBBes);
        var Ces = new Array(BOT.PLCes, BOT.UACes, BOT.HUCes, BOT.HRCes, BOT.LTCes, BOT.SRBCes);
        var jobMarket = new Array(BOT.PLjobMarket, BOT.UAjobMarket, BOT.HUjobMarket, BOT.HRjobMarket, BOT.LTjobMarket, BOT.SRBjobMarket);
        if(BOT.nick != undefined)
        {
            for(var cr in BOT.countries)
            {
                for(var i = 0; i < 11; i++)
                {
                    if(Bes[cr][i] == true)
                    {
                        if(jobMarket[cr][i].split("-")[1] != BOT.nick)
                        {
                            BOT.playSound();
                            
                        }
                    }
                }
            }
        }
        GM_setValue("Betap", 4);
        BOT.Betap = 4;
        BOT.Bmain();
    },
    
    
    
    playSound: function() {
        $('body').append('<embed src="http://pokemon-unity.netai.net/esim/beep.mp3" autostart="true" hidden="true" loop="false">');
    },
    
    
    
    reloadPage: function() {
        window.location.reload();
    }
};
BOT.init();
