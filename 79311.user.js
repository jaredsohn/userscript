// ==UserScript==
// @name           The West_-_Icones de raccourci
// @description    Icones de raccourci pour les batiments
// @namespace      http://ryuuku.olympe-network.com/
// @include        http://*.the-west.*/game.php*
// @exclude        http://ryuuku.olympe-network.com/
// @version        1.29
// @author         Hack.Crows
// @copyright      Hack.Crows/ryuuku
// ==/UserScript==

// Modified by Hack.Crows
// Ajoute de la carte par Roland Gamelle


// Fonctions des region 
    function addFooterIcon(mylink, idname) 
    {
        footer_menu_left_more = document.getElementById('footer_menu_left_more');
        if (!footer_menu_left_more) { return; }
        var iconlink = document.createElement('a');
        iconlink.setAttribute('href', mylink);
        iconlink.innerHTML = "<img id=\""+idname+"\" alt=\"\" src=\"images/transparent.png\"/>";
        footer_menu_left_more.appendChild(iconlink);
    }

    function setToolTip(strObjectName, strToolTipText)
    {
        var insertBeforeElement = document.getElementById('left_top');
        var newScriptElement = document.createElement('script');
        newScriptElement.setAttribute('type', 'text/javascript');
        var myScript = "window.addEvent('domready', function(){ $('" + strObjectName + "').addMousePopup(new MousePopup('" + strToolTipText + "')); });";
        newScriptElement.innerHTML = myScript;
        insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
    }

    function addGlobalStyle(css) 
    {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {return;}
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    
    function setOpacity(object, opacity)
    {
        var insertBeforeElement = document.getElementById('left_top');
        var newScriptElement = document.createElement('script');
        newScriptElement.setAttribute('type', 'text/javascript');
        var myScript = "window.addEvent('domready', function(){$('" + object + "').setOpacity(" + opacity + "); });";
        newScriptElement.innerHTML = myScript;
        insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
    }
    
    var $=unsafeWindow.$;
    
//  #endregion

    footer_menu_left = document.getElementById('footer_menu_left');

    if (footer_menu_left)
    {
        footer_menu_left_more = document.createElement('div');
        footer_menu_left_more.setAttribute('id', 'footer_menu_left_more');
        footer_menu_left_more.setAttribute('style', 'left: 33px; top: 6px; background-position: 1px 1px; padding-top: 3px; padding-left: 3px; width: 481px; height: 35px; position: absolute; z-index:2; border: 2px solid #3B240B; background: transparent url(http://the.live.free.fr/thewest/racourci.png) repeat-x scroll 0 0;');
        footer_menu_left.parentNode.insertBefore(footer_menu_left_more, footer_menu_left.nextSibling);

        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_gunsmith\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_gunsmith');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_tailor\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_tailor');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_general\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_general');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_hotel\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_hotel');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_bank\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_bank');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_church\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_church');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_mortician\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_mortician');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_cityhall\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_cityhall');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_saloon');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_sheriff\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_sheriff');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_market\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_market');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'fingerboard\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_fingerboard');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'players\',{x:Character.home_town.x,y:Character.home_town.y,offset:0,sortby:4},Character.home_town.x+\'_\'+Character.home_town.y);','footer_players');

        var values = unsafeWindow.AjaxWindow.possibleValues; 
        
        setToolTip('footer_building_gunsmith',  '<b>' + values["building_gunsmith"]   + '</b>');
        setToolTip('footer_building_tailor',    '<b>' + values["building_tailor"]     + '</b>');
        setToolTip('footer_building_general',   '<b>' + values["building_general"]    + '</b>');
        setToolTip('footer_building_hotel',     '<b>' + values["building_hotel"]      + '</b>');
		setToolTip('footer_building_bank',      '<b>' + values["building_bank"]       + '</b>');
        setToolTip('footer_building_church',    '<b>' + values["building_church"]     + '</b>');
        setToolTip('footer_building_mortician', '<b>' + values["building_mortician"]  + '</b>');
        setToolTip('footer_building_cityhall',  '<b>' + values["building_cityhall"]   + '</b>');
        setToolTip('footer_building_saloon',    '<b>' + values["building_saloon"]     + '</b>');
        setToolTip('footer_building_market',    '<b>' + values["building_market"]     + '</b>');
        setToolTip('footer_building_sheriff',    '<b>' + values["building_sheriff"]     + '</b>');
        setToolTip('footer_fingerboard',    	'<b>' + values["fingerboard"]         + '</b>');
        setToolTip('footer_players', 			'<b>' + values["players"]             + '</b>');
    }

    var imgIcons = 'data:image/png';

    addGlobalStyle('#abdorment_middle {display:none;}');
    addGlobalStyle('#footer_menu_left_more #footer_building_gunsmith, #footer_menu_left_more #footer_building_tailor,#footer_menu_left_more #footer_building_general,#footer_menu_left_more #footer_building_hotel,#footer_menu_left_more #footer_building_bank,#footer_menu_left_more #footer_building_church,#footer_menu_left_more #footer_building_mortician ,#footer_menu_left_more #footer_building_cityhall,#footer_menu_left_more #footer_building_saloon, #footer_menu_left_more #footer_building_sheriff, #footer_menu_left_more #footer_building_market, #footer_menu_left_more #footer_fingerboard,#footer_menu_left_more #footer_players {background-image:url(' + imgIcons + '); width:37px; height:37px;}');

	
    addGlobalStyle('#footer_building_gunsmith {background-position:-1px 0;}');
    addGlobalStyle('#footer_building_tailor {background-position:-37px 0;}');
    addGlobalStyle('#footer_building_general {background-position:-74px 0;}');
	addGlobalStyle('#footer_building_saloon {background-position:-111px 0;}');
	addGlobalStyle('#footer_building_mortician {background-position:-138px 0;}');
    addGlobalStyle('#footer_building_bank {background-position:-195px 0;}');
    addGlobalStyle('#footer_building_church {background-position:-222px 0;}');
    addGlobalStyle('#footer_building_hotel {background-position:-259px 0;}');
    addGlobalStyle('#footer_building_cityhall {background-position:-295px 0;}'); 
    addGlobalStyle('#footer_fingerboard {background-position:-330px 0;}'); 
    addGlobalStyle('#footer_players {background-position:-360px 0px;}');
	addGlobalStyle('#footer_building_market {background-position:-161px 0;}');
    addGlobalStyle('#footer_building_sheriff {background-position:-181px 0;}');
    
	addGlobalStyle('#minimap_micro {background:url(http://s2.noelshack.com/uploads/images/6161881390236_micro2.png);}');
    
    if (unsafeWindow.Character.home_town == null) 
    {
        setOpacity('footer_menu_left_more', '0.4');
    }

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_158', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_158', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=158&version=1.29';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();