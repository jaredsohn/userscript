// ==UserScript==
// @name           blindfox
// @namespace      destrus
// @description    aria-support for different websites
// @include        http://*
// @version        0.0.4
// ==/UserScript==
var helper =  {
    UrlParser:function(UriStr){
        this.getPtotocoll = function(){
             return(this.Protocoll);
            };
        this.getDomain = function(){
             return(this.Domain);
            };
        this.getPath = function(){
            return(this.Path);
            };
        this.getParam = function(Param){
            return(this.Param[Param]);
            };
        this.check = function(key,op,value){
          //GM_log(key+op+value);
          try{
          switch(op)
                {
                    case "==":
                        GM_log(this[key] + '==' + value);
                        if (this[key] == value) return(true);
                        break;
                    case "!=":
                        GM_log(this[key] + '!=' + value);
                        if (this[key] != value) return(true);
                        break;
                    case "CONTAIN":
                        GM_log(this[key] + 'match' + value);
                        if (this[key].match(value)) return(true);
                        break;
                    case "EXIST":
                    	GM_log(key + '=' + this[key] + ' exist?');
                    	if (this[key]) return(true);
                    	break;
                    default:GM_log('op not handled')
                        break;

                }} catch(err) {return(false);}
                return(false);
            };
        this.checkParam = function(key,op,value){
          //GM_log(key+op+value);
            try{
            switch(op)
                {
                    case "==":
                        GM_log(this['Param'][key] + '==' + value);
                        if (this['Param'][key] == value) return(true);
                        break;
                    case "!=":
                        GM_log(this['Param'][key] + '!=' + value);
                        if (this['Param'][key] != value) return(true);
                        break;
                    case "CONTAIN":
                        GM_log(this['Param'][key] + 'match' + value);
                        if (this['Param'][key].match(value)) return(true);
                        break;
                    case "EXIST":
                    	GM_log(key + '=' + this['Param'][key] + ' exist?');
                    	if (this['Param'][key]) return(true);
                    	break;
                    default:GM_log('op not handled')
                        break;
                }} catch(err) {return(false);}
                return(false);
            };

        //http://www.google.de/search?q=javascript+match&ie=utf-8&oe=utf-8&aq=t&rls=org.mozilla:de:official&client=firefox-a
        //http://www.regular-expressions.info/refflavors.html
        //^(\w+\:\/\/)?([\w\.\-_]*)([\/\w\.\-_]*)(\?.*)?$/
        var tmp = UriStr.match(/^(\w+\:\/\/)?([\w\.\-_~]*)([\/\w\.\-_~]*)([\?#&].*)?$/);
        try {
            GM_log('Parsermatch:'+tmp);
            this.Protocol = tmp[1];
            this.Domain = tmp[2];
            this.Path = tmp[3];
            this.Param = {};
            var tmp2 = tmp[4];
    //        GM_log('Domain: ' + this.Domain);
    //        GM_log('tmp2: ' + tmp2);
        if (tmp2)   //Parameter parsen
//TODO ANCHOR PRÜFEN
             {
                var tmp3 = tmp2.match(/([^?&]*)=([^?&]*)?/g);
    //            GM_log('tmp3: ' + tmp3);
                var co = 0;
                while (tmp3[co])
                {
                    tmp4 = tmp3[co].match(/[^=]*/g);
                    GM_log('Param[' + tmp4[0] + '] = ' + tmp4[2]);
                    this.Param[tmp4[0]]=tmp4[2];
                    co++;
                }
             }
           } catch (e) {}
        },
    DB:function(){
        this.open = function (dbName){
            if (dbName & dbName!=''){
                dbName ='blindfox.db';
            };
            this.file = Components.classes["@mozilla.org/file/directory_service;1"]
                     .getService(Components.interfaces.nsIProperties)
                     .get("ProfD", Components.interfaces.nsIFile);
            this.file.append(dbName);
            this.storageService = Components.classes["@mozilla.org/storage/service;1"]
                                            .getService(Components.interfaces.mozIStorageService);
            this.DBConn = storageService.openDatabase(file);
            };
        this.check = function(){
            };
        this.BuildTables = function(){
               this.dbConn.executeSimpleSQL("CREATE TEMP TABLE table_name (column_name INTEGER)");
            };
     //Constructor
    }
}
//var check = new helper.UrlParser(window.location.href);

var blindfox = {
    SiteSelect:function(){return document.getElementsByName("bf_siteselect")[0];},
    bf_banner:[],
    init:function(){
    this.bf_banner = document.createElement("div");
    this.bf_banner.innerHTML= '<div style="background-image:url(data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz'+
    'AAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAkSURB'+
    'VAiZxcmxDQAgEAAhuVi8+y9s4w52JCzscMJUPeFUzYe9epsBq2K5h8sAAAAASUVORK5CYII='+
    ');'+
    'high:30;width:100%;min-width:600px;'+
    'margin:3px;align:left;color:red" name="bf_banner" role="navigation">'+
    'BlindFox'+
         '<form style="position:absolute;top:0;right:0;high:30;width:300px;vertical-align:top;">'+
            '<select name="bf_siteselect" size="1">'+
            '<option>Seitenauswahl</option>'+
           '</select>'+
        '</form>'+
    '</div>';
    document.body.insertBefore(blindfox.bf_banner, document.body.firstChild);
    blindfox.SiteSelect().addEventListener("change", blindfox.Switch, false);
    //alert(SiteSelect[0].value);
    },
 ShowSiteDirectory:function(xPath)
    {
     var ss = blindfox.SiteSelect();
     var sitelist = document.createElement("table");
     sitelist.width='100%';
     //sitelist.innerHTML= '<table class = "bf_sitelist" width="100%"></table>';
     var snap = document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
     document.body.insertBefore(sitelist, document.body.lastChild);
     var nextrow = document.createElement("tr");
     for (row=0;row*5<ss.length;row++){
        for (col=0;col<5;col++){
            var sitelink = document.createElement("td");
            sitelink.width='20%';
            var sum=(row*5+col)+1;
            GM_log(sum);
            if (sum<ss.length)
                sitelink.innerHTML = '<a role="navigation" href="'+ ss.options[sum].value +'">'+ ss.options[sum].text + '</a>';
            sitelist.appendChild(sitelink);
            }
        var nextrow = document.createElement("tr");
        sitelist.appendChild(nextrow);
        }
    },
 Switch : function()
    {
    var ss = blindfox.SiteSelect();
    window.location.href = ss[ss.selectedIndex].value;
    },


// fÃ¼gt Auswahl zum Formular bf_siteselct hinzu
AddSite : function( name, uri )
    {
        var ss = blindfox.SiteSelect();
        ss[ss.length]= new Option(name, uri, false, true);
        ss.selectedIndex = 0;
    },

SetAttributeOnXpath:function(xPath,Attribute,Value)
    {
    var snap = document.evaluate(xPath,
                document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = snap.snapshotLength - 1; i >= 0; i--)
        {
                snap.snapshotItem(i).setAttribute(Attribute, Value);
        }
    },

SetRoleOnXpath:function(xPath,RoleName)
    {
    this.SetAttributeOnXpath(xPath,'role',RoleName);
    },

RemoveAttributeFromXpath:function(xPath,Attributename)
    {
    var snap = document.evaluate(xPath,
                document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = snap.snapshotLength - 1; i >= 0; i--)
        {
                snap.snapshotItem(i).removeAttribute(Attributename);
        }
    },

RemoveAllRoleAttributes:function()
    {
    this.RemoveAttributeFromXpath('//*[@role][not(@name="bf_banner")]','role');
    },


SetFocus:function(xPath)
    {
    var snap = document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    if (snap) snap.singleNodeValue.focus();
    },

banner_green:function()
    {
         var banner = document.getElementsByName('bf_banner')[0];
         banner.style.color = 'green';
    }
};

blindfox.init();
var Url = new helper.UrlParser(window.location.href);

blindfox.AddSite("Telepolis","http://www.heise.de/tp/");

if (Url.check('Domain','==','www.heise.de'))
if (Url.check('Path','==','/tp/'))
if (Url.check('Protocol','==','http://')){
        blindfox.banner_green();
        blindfox.SetRoleOnXpath("//p[@class='inhalt-head']/a[not(img)]", "main");
    }

if(Url.check('Domain','==','www.heise.de'))
if(Url.check('Path','CONTAIN','/tp/r4/artikel/'))
if(Url.check('Protocol','==','http://')){
        blindfox.banner_green();
        blindfox.SetRoleOnXpath("//heisetext/h1", "main");
        //blindfox.SetFocus("//heisetext/h1");
        //blindfox.SetFocus("//table[@class='inhalt-table']");
        blindfox.SetFocus("//p[@class='autor']");
        }


if(Url.check('Domain','==','www.heise.de'))
if(Url.check('Path','CONTAIN','/tp/blogs/6/'))
if(Url.check('Protocol','==','http://')){
        blindfox.banner_green();
        blindfox.SetRoleOnXpath("//td[@class='bloghead']", "main");
        }

//http://www.faz.net/s/homepage.html
//http://www.faz.net/s/RubA24ECD630CAE40E483841DB7D16F4211/Tpl~Ecommon~Sressort.html
blindfox.AddSite('Frankfurter Zeitung','http://www.faz.net/s/homepage.html');
if(Url.check('Domain','==','www.faz.net'))
if(Url.check('Path','==','/s/homepage.html')|Url.check('Path','CONTAIN','/s/Rub.*/Tpl~')){
        //div[starts-with(@class,'Teaser ')]
        blindfox.banner_green();
        blindfox.SetRoleOnXpath("//div[@id='FAZNavMain']","main");
        blindfox.SetRoleOnXpath("//div[@id='MainColumn']//div[contains(@class,'H2')]", "main");
        blindfox.SetAttributeOnXpath('//a[img]','tabindex','-1');
        blindfox.SetAttributeOnXpath('//a[img]','alt','');
        blindfox.SetAttributeOnXpath('//a[img]','title','');
        }

//1:http://www.faz.net/s/Rub0E9EEF84AC1E4A389A8DC6C23161FE44/Doc~EA7882221DB51423A9B26C265B59D2DAA~ATpl~Ecommon~Scontent.html
//2:http://www.faz.net/s/Rub011161ADA7F34E3692147FAD3231C28E/Doc~E079C6E3EB9024862AC5D03DCD6E20F3D~ATpl~Ecommon~SMed.html
if(Url.check('Domain','==','www.faz.net'))
if(Url.check('Path','==','/s/homepage.html')|Url.check('Path','CONTAIN','/s/Rub.*/Doc~')){
        //div[starts-with(@class,'Teaser ')]
        blindfox.banner_green();
        blindfox.SetRoleOnXpath("//div[@id='FAZNavMain']","main");
        //blindfox.SetRoleOnXpath("//div[@class='Article']/h2", "main"); //>1
        blindfox.SetRoleOnXpath("//div[@class]//h2", "main"); //>2
        blindfox.SetAttributeOnXpath('//a[img]','tabindex','-1');
        blindfox.SetAttributeOnXpath('//a[img]','alt','');
        blindfox.SetAttributeOnXpath('//a[img]','title','');
        blindfox.SetAttributeOnXpath('//a[img]','hidden',true);
        blindfox.SetAttributeOnXpath("//div[@class='LinkBoxModulSmall']",'hidden',true);
        }


blindfox.AddSite("Google","http://www.google.de/firefox?client=blindfox");

//http://www.google.de/firefox?client=blindfox
if(Url.check('Domain','==','www.google.de')){
	http://www.google.de/search?hl=de&client=blindfox&q=TEST&btnG=Suche&aq=f&aqi=&aql=&oq=&gs_rfai=
    blindfox.RemoveAllRoleAttributes();
	blindfox.SetRoleOnXpath("//input[@name='q']", "main");
	if(Url.checkParam('q','EXIST','')){
            blindfox.banner_green();
        	blindfox.SetRoleOnXpath("//li[@class='g']", "main");
        	blindfox.SetRoleOnXpath("//div[@class='nvs']", "main");
            }
    else if (Url.checkParam('client','==','blindfox')){
            blindfox.banner_green();
        	blindfox.ShowSiteDirectory('//span[@id="footer"]/center/div');
        	}
        }


//http://de.wikipedia.org/wiki/Prion
if(Url.check('Domain','CONTAIN','de.wikipedia.org'))
if(Url.check('Path','CONTAIN','/wiki/*')){
    blindfox.banner_green();
	blindfox.SetRoleOnXpath("//div[@id='bodyContent']/p[1]", "main");
	blindfox.SetRoleOnXpath("//div[@id='bodyContent']/h2", "main");
	}
