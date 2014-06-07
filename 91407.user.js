// ==UserScript==
// @name            THE WEST RO - Scurtaturi cladiri
// @description     bara scurtaturi cladiri
// @include         http://ro*.the-west.ro/game.php*
// @version         none
// ==/UserScript==

//  #region functions
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

    var $=unsafeWindow.$;

//  #endregion

    footer_menu_left = document.getElementById('footer_menu_left');

    if (footer_menu_left)
    {
        footer_menu_left_more = document.createElement('div');
        footer_menu_left_more.setAttribute('id', 'footer_menu_left_more');
        footer_menu_left_more.setAttribute('style', 'left: 287px; top: -105px; background-position: 0px 0px; padding-top: 0px; padding-left: -30px; width: 250px; height: 40px; position: absolute; z-index:0; border: 0px solid #3B240B; background: transparent repeat-x scroll 0 0;');
        footer_menu_left.parentNode.insertBefore(footer_menu_left_more, footer_menu_left.nextSibling);

        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_cityhall\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_cityhall','Primarie');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_bank\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_bank','Banca');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_mortician\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_mortician','Cioclu');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_church\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_church','Biserica');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_sheriff\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_sheriff','sheriff');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_gunsmith\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_gunsmith','Armurier');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_general\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_general','Magazin');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_tailor\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_tailor','Croitor');
        addFooterIcon('javascript:AjaxWindow.show(\'item_trader\');','footer_item_trader');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_market\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_market','market');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_saloon','Salon');
        addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_hotel\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_hotel','Hotel');
        var values = unsafeWindow.AjaxWindow.possibleValues; 
        
        setToolTip('footer_building_gunsmith',  '<b>' + ' ` Armurier'   + '</b>');
        setToolTip('footer_building_tailor',    '<b>' +  ' ` Croitor'     + '</b>');
        setToolTip('footer_building_general',   '<b>' + ' ` Magazin'    + '</b>');
        setToolTip('footer_building_hotel',     '<b>' + ' ` Hotel'      + '</b>');
        setToolTip('footer_building_bank',      '<b>' + ' ` Banca'       + '</b>');
        setToolTip('footer_building_church',    '<b>' + ' ` Biserica'     + '</b>');
        setToolTip('footer_building_mortician', '<b>' + ' ` Cioclu'  + '</b>');
        setToolTip('footer_building_cityhall',  '<b>' + '  ` Primaria'   + '</b>');
        setToolTip('footer_building_saloon',    '<b>' + ' ` Salon'     + '</b>');
        setToolTip('footer_item_trader',    '<b>' + ' ` Negustoru'     + '</b>');
        setToolTip('footer_building_sheriff',    '<b>' + ' ` Serif'     + '</b>');
        setToolTip('footer_building_market',    '<b>' + ' ` Piata'     + '</b>');
    }
    var imgIcons = 'http://img3.imagebanana.com/img/7vrtkaee/lll.png';
    addGlobalStyle('#abdorment_middle {display:none;}');
    addGlobalStyle('#footer_menu_left_more #footer_building_gunsmith, #footer_menu_left_more #footer_building_tailor,#footer_menu_left_more #footer_building_general,#footer_menu_left_more #footer_building_hotel,#footer_menu_left_more #footer_building_bank,#footer_menu_left_more #footer_building_church,#footer_menu_left_more #footer_building_mortician ,#footer_menu_left_more #footer_building_cityhall,#footer_menu_left_more #footer_building_saloon, #footer_menu_left_more #footer_item_trader, #footer_menu_left_more #footer_building_sheriff, #footer_menu_left_more #footer_building_market {background-image:url(' + imgIcons + '); width:37px; height:37px;}');

    addGlobalStyle('#footer_building_gunsmith {background-position:-0px 0;}');
    addGlobalStyle('#footer_building_tailor {background-position:-37px 0;}');
    addGlobalStyle('#footer_building_general {background-position:-74px 0;}');
    addGlobalStyle('#footer_building_saloon {background-position:-111px 0;}');
    addGlobalStyle('#footer_building_mortician {background-position:-148px 0;}');
    addGlobalStyle('#footer_building_bank {background-position:-185px 0;}');
    addGlobalStyle('#footer_building_church {background-position:-222px 0;}');
    addGlobalStyle('#footer_building_hotel {background-position:-259px 0;}');
    addGlobalStyle('#footer_building_cityhall {background-position:-296px 0;}');  
    addGlobalStyle('#footer_item_trader {background-position:-334px 0;}');  
    addGlobalStyle('#footer_building_sheriff {background-position:-371px 0;}'); 
    addGlobalStyle('#footer_building_market {background-position:-408px 0;}'); 

    addGlobalStyle('#head_title { display:none; }');
    addGlobalStyle('#energy_filler_premium_toggle {background-position:20px 0;}');
    addGlobalStyle('#bank_payin_premium_start {background-position:-20px 0;}');
    if (unsafeWindow.Character.home_town == null)
    {
        setOpacity('footer_menu_left_more', '0.4');
    }