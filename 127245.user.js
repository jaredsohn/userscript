// ==UserScript==
// @name         Hordes Map Updater _by_ Hazraael _ based on DGM
// @version      1.7.0
// @description  Module pour la mise à jour d'une M@p d'objets à partir de hordes.fr
// @grant        none
// @match        http://www.hordes.fr/*
// @copyright    2012+, Hazr@@ël
// ==/UserScript==

// Released under the GPL license
// Sous licence GPL: la licence n'est a accepter que si vous voulez redistribuer le programme
// http://www.gnu.org/copyleft/gpl.html


var myCSS = ".arrowleft, .arrowright {";
myCSS += "	display : inline-block;";
myCSS += "	zoom : 1;";
myCSS += "	*display : inline;";
myCSS += "	vertical-align : middle;";
myCSS += "	height : 23px;";
myCSS += "}";
myCSS += ".arrowleft, .arrowright {";
myCSS += "	background-position : left 5px;";
myCSS += "	background-repeat : no-repeat;";
myCSS += "	width : 18px;";
myCSS += "	cursor : pointer;";
myCSS += "	display : inline-block;";
myCSS += "	zoom : 1;";
myCSS += "	*display : inline;";
myCSS += "}";
myCSS += ".arrowleft {";
myCSS += "	float : left;";
myCSS += "	margin-right : -3px;";
myCSS += "	background-image : url(\"http://i15.servimg.com/u/f15/13/27/91/17/arrowl11.png\");";
myCSS += "}";
myCSS += ".arrowright {";
myCSS += "	float : right;";
myCSS += "	margin-right : -3px;";
myCSS += "	background-image : url(\"http://i15.servimg.com/u/f15/13/27/91/17/arrowr11.png\");";
myCSS += "}";

if (typeof GM_addStyle != "undefined") {
    GM_addStyle(myCSS);
} else if (typeof addStyle != "undefined") {
	addStyle(myCSS);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = myCSS;
		heads[0].appendChild(node); 
	}
}
var $ = unsafeWindow.jQuery;

var nb_data = 0;
var nb_site = 3;

var divScriptId = 'HMU4ChromeUserScript';
var divInfosMajId = 'HMU4ChromeMAJContent';
var contentId = 'HMU4ChromeUSContent';




function startScript()
{
    // Not in game?
    if($("#gamebody").length == 0) {
        return;
    }
    HMU = new HMU4ChromeUserScript();
    HMU.init();
    now = $("#gamebody").attr('now');
    setInterval(function() 
                {
                    var gameNow = $("#gamebody").attr('now');
                    if(gameNow != now)
                    {
                        now = gameNow;
                    }
                }, 1000);
    
}

function HMU4ChromeUserScript() {};	
HMU4ChromeUserScript.prototype  = {
    // Main div
    mainDivHMU : null,
    content : null,
    editor : null,
    menu : null,
    reducer : null,
    actionButtons : [],
    animateEvent : null,
    
    //#region Init	
    init : function()
    {
        this.mainDivHMU = $('<div/>', {id: divScriptId}).appendTo('body');
        this.mainDivHMU.css('position','fixed');
        this.mainDivHMU.css('top','25px');
        this.mainDivHMU.css('width','300px');
        this.mainDivHMU.css('display','table');
        this.mainDivHMU.css('borderTopRightRadius','10px');
        this.mainDivHMU.css('borderBottomRightRadius','10px');
        this.mainDivHMU.css('backgroundColor','#5c2b20');
        this.mainDivHMU.css('z-index',5);
        this.mainDivHMU.attr('id',divScriptId);
        
        for(var initFunction in this)
        {
            if(initFunction != "init" && initFunction.indexOf("init") == 0 && typeof(this[initFunction]) == "function")
            {
                
                this[initFunction]();
            }
        }
    },
    
    initContent : function()
    {
        this.content = $('<div/>', {id: contentId}).appendTo(this.mainDivHMU);
        this.content.css('display','table-cell');
        this.content.css('width','285px');
        this.content.css('padding','5px');
    },
    
    initReducer : function()
    {
        this.animateEvent = this.animate.bind(this);
        this.reducer = $('<div/>').appendTo(this.mainDivHMU);
        
        this.reducer.css('display','table-cell');
        this.reducer.css('min-width','15px');
        this.reducer.click(this.animateEvent);
        
        if(localStorage['IsReduced'] != 'false')
        {
            this.mainDivHMU.css('left','-285px');
            this.reducer.attr('class','arrowright');
        }
        else
        {	
            if(localStorage['IsPinned'] != 'true')
            {
                $('#content').bind('click',this.animateEvent);
            }
            this.mainDivHMU.css('left','0px');
            this.reducer.attr('class','arrowleft');
        }
    },
    
    initTextArea : function()
    {
        var divTextArea =$('<div/>').appendTo(this.content);
        
        var selectButton = createHMU4ChromeStyleButton('<img src="/img/icons/r_explor.gif" /> Mettre à jour les cartes',function(){ send_code();}.bind(this));
        selectButton.css('width','100px');
        selectButton.css('display','inline-block');
        divTextArea.append(selectButton);
    },
    //#endregion Init
    //#region Event
    animate : function()
    {
        var isPinned = localStorage['IsPinned'];
        if(this.mainDivHMU.css("left") == "0px")
        {
            var left = parseInt(this.mainDivHMU.css('width'))-15;
            this.mainDivHMU.animate({"left": '-'+left+'px'}, "slow");
            if(isPinned != 'true')
            {
                $('#content').unbind('click',this.animateEvent);
            }
            localStorage['IsReduced'] = true;
            this.reducer.attr('class','arrowright');
        }
        else
        {
            this.mainDivHMU.animate({"left": "0px"}, "slow");
            if(isPinned != 'true')
            {
                $('#content').bind('click',this.animateEvent);
            }
            localStorage['IsReduced'] = false;
            this.reducer.attr('class','arrowleft');
        }
    },
    
    pin : function(e)
    {
        var element = $(e.currentTarget);	
        if(localStorage['IsPinned'] == 'true')
        {
            localStorage['IsPinned'] = false;
            element.css('opacity','1');
            
            if(localStorage['IsReduced'] == 'false')
            {
                $('#content').bind('click',this.animateEvent);
            }
        }
        else
        {
            localStorage['IsPinned'] = true;
            element.css('opacity','0.5');
            if(localStorage['IsReduced'] != 'true')
            {
                $('#content').unbind('click',this.animateEvent);
            }
        }
    },
    //#endregion Event
    
    addToMenu :function(HMU4ChromeUserScriptAction)
    {
        this.actionButtons.push(HMU4ChromeUserScriptAction);
        this.menu.append(HMU4ChromeUserScriptAction.html('<li/>'));
    },
}
function HMU4ChromeUserScriptAction(name, action, conditions)
{
    this.action = action;
    this.name = name;
    this.conditions = conditions;
};
HMU4ChromeUserScriptAction.prototype  = 
    {
        button : null,
        conditions : null,
        
        
        checkVisible : function()
        {
            if(this.check())
            {
                this.button.css('display','block');
            }
            else
            {
                this.button.css('display','none');
            }
        },
        
        html : function(type)
        {
            this.button = $(type);
            this.button.append(createHMU4ChromeStyleButton(this.name,this.action));
            return this.button;
        },
        
        css : function(name,value)
        {
            this.button.css(name,value);
        },
        
        check : function()
        {
            var isOk = true;
            // for(var key in this.conditions)
            // {
            // switch(key)
            // {
            // case 'room':
            // isOk = isOk && this.checkRoom(this.conditions[key]);
            // break;
            // case 'ismodule':
            // isOk = isOk && this.checkIsModule(this.conditions[key]);
            // break;
            // default : 
            // isOk = isOk && this.conditions[key]();
            // }
            // }
            return isOk;
        },
        
        // checkRoom : function(roomName)
        // {
        // return $("#input").attr('d_name') == roomName;
        // },
        
        // checkIsModule : function(isModule)
        // {
        // return $("#input").attr('ismodule') == isModule;
        // },
    }

function createHMU4ChromeStyleButton(name, action)
{
    var divButton = $('<div/>');
    var button = $('<a/>',{ class : 'button' }).appendTo(divButton);
    button.html(name);
    button.click(action);
    return divButton;
}

function getsk() {
    if ( this.sk != null )
        return this.sk;
    var logoutNode=document.getElementById("userBox");
    if ( logoutNode != null ) {
        //var chtrouv= "js.XmlHttp.get('user/logout?sk=";
        var chtrouv= "js.UserBox.onHome(';sk=";
        var posstr= logoutNode.innerHTML.indexOf(chtrouv,0);
        if ( posstr >= 0 ) {
            var str= logoutNode.innerHTML.substr( posstr + chtrouv.length );
            this.sk= str.substr( 0, str.indexOf("'",0));
        }else{
            this.sk= null;
            //alert("Script GM: Clé de session non trouvée!");
        }
    }else{
        //alert("Script GM: Pas encore logué mais script actif: faire shift-reload après login");
        
    }
    //GM_log("HorTools: " + this.sk); //DEBUG
    
    return this.sk;
}
function send_code()
{
    function stop_data() {
        $('#'+divInfosMajId).remove();
    }
    
    function site_up(id, name, url) {
        
        var url_disclaime, xhr_object, reg, resultat, tmp, key, key_site, data;
        
        url_disclaime = 'http://www.hordes.fr/disclaimer?id='+id+';sk='+getsk();
        xhr_object = new XMLHttpRequest();
        xhr_object.open("GET", url_disclaime, false);
        xhr_object.send(null);
        stat = xhr_object.responseText; 
        reg = /value="(.*?)"/gi; 
        resultat = stat.match(reg);
        tmp = resultat[0].substr(resultat[0].indexOf('"')+1);
        this.key = tmp.substr(0,tmp.length-1);
        key_site = this.key;
        
        if(GM_getValue("lcn_carte_"+name+"_zone", true)){
            
            data = "key="+key_site+"&mode=xml";
            GM_xmlhttpRequest({ 
                method: 'POST', 
                data: data,
                url: url, 
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                onload: function(responseDetails) {
                    value = 'Mise &agrave; jour - OK.';
                    img = '<img src="http://icones.tilotiti.com/accept.png" />';
                    document.getElementById("lcn_carte_status_"+id).innerHTML = value;
                    document.getElementById("lcn_carte_site_"+id).innerHTML = img;
                    nb_data++;
                    if(nb_data==nb_site) {
                        setTimeout(stop_data, 500);
                    }
                }
            });
        }else{
            value = 'Aucune mise &agrave; jour.';
            img = '<img src="http://icones.tilotiti.com/cancel.png" />';
            document.getElementById("lcn_carte_status_"+id).innerHTML = value;
            document.getElementById("lcn_carte_site_"+id).innerHTML = img;
            nb_data++;
            if(nb_data==nb_site) {
                setTimeout(stop_data, 500);
            }
            return false;
        }
    }
    
    text  = '<h2>Envoi des donn&eacute;es en cours</h2>';
    text += '<table align="center">';
    text += '<tr>';
    text += '<td><img src="http://www.hordes.fr/file/22.dat" width="19"/></td><td><b>Patamap</b></td>';
    text += '<td id="lcn_carte_site_9"><img src="http://icones.tilotiti.com/hourglass.png" /></td>';
    text += '<td id="lcn_carte_status_9">Chargement...</td>';
    text += '</tr><tr>';
    text += '<td><img src="http://www.hordes.fr/file/41.dat" width="19"/></td><td><b>O&ugrave; En &Ecirc;tes-Vous ?</b></td>';
    text += '<td id="lcn_carte_site_22"><img src="http://icones.tilotiti.com/hourglass.png" /></td>';
    text += '<td id="lcn_carte_status_22">Chargement...</td>';
    text += '</tr><tr>';
    text += '<td><img src="http://www.hordes.fr/file/64.dat" width="19"/></td><td><b>BigBroth\'Hordes</b></td>';
    text += '<td id="lcn_carte_site_51"><img src="http://icones.tilotiti.com/hourglass.png" /></td>';
    text += '<td id="lcn_carte_status_51">Chargement...</td>';
    text += '</tr>';
    text += '</table>';
    
    var divMajArea =$('<div/>',{id: divInfosMajId}).appendTo('#HMU4ChromeUSContent');
    
   
    divMajArea.prepend(text);

    
    nb_data = 0;
    
    //site_up(14, 'lcn',  'http://www.lacitadellenoire.com/carte.php');
    site_up(9,  'pata', 'http://www.patamap.com/');
    site_up(22, 'oeev', 'http://www.oeev-hordes.com/');
    site_up(51, 'bbh',  'http://bbh.fred26.fr/');
    
}

window.addEventListener('load', startScript, false);