// ==UserScript==
// @name           The West_-_Wanted
// @description    Icones wanted
// @namespace      http://ryuuku.olympe-network.com/
// @include        http://*.the-west.*
// @exclude        http://ryuuku.olympe-network.com/
// @version        1.27
// @author         Hack.Crows
// @copyleft      Hack.Crows/ryuuku
// ==/UserScript==

// Modified by Hack.Crows


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
        footer_menu_left_more.setAttribute('style', 'left: 919px; top: 6px; background-position: 1px 1px; padding-top: 3px; padding-left: 3px; width: 111px; height: 35px; position: absolute; z-index:2; border: 2px solid #3B240B; background: transparent url(http://the.live.free.fr/wanted.png) repeat-x scroll 0 0;');
        footer_menu_left.parentNode.insertBefore(footer_menu_left_more, footer_menu_left.nextSibling);
        
        addFooterIcon('javascript:AjaxWindow.show(\'building_saloon\',{town_id:22},\'town_22\');','footer_building_saloon');
        addFooterIcon('javascript:AjaxWindow.show(\'players\',{x:254,y:634, offset:0,sortby:3},254+\'_\'+634);','footer_players');
		addFooterIcon('javascript:AjaxWindow.show(\'fingerboard\',{town_id: 22},\'town_22\');javascript:WMap.scroll_map_to_town( 22);','footer_fingerboard');

        var values = unsafeWindow.AjaxWindow.possibleValues; 
        
        setToolTip('footer_building_saloon', '<b>' + values["building_saloon"]   + '</b>');
        setToolTip('footer_players',   		 '<b>' + values["players"]     + '</b>');
        setToolTip('footer_fingerboard', 	 '<b>' + values["fingerboard"]    + '</b>');
    }

    var imgIcons = 'data:image/png';

    addGlobalStyle('#abdorment_middle {display:none;}');
    addGlobalStyle('#footer_menu_left_more #footer_building_saloon, #footer_menu_left_more #footer_players,#footer_menu_left_more #footer_fingerboard {background-image:url(' + imgIcons + '); width:37px; height:37px;}');

	
    addGlobalStyle('#footer_players {background-position:-37px 0;}');
    addGlobalStyle('#footer_fingerboard {background-position:-74px 0;}');
    addGlobalStyle('#footer_building_saloon {background-position:-111px 0;}');

    if (unsafeWindow.Character.home_town == null) 
    {
        setOpacity('footer_menu_left_more', '0.4');
    } 