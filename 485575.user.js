// ==UserScript==
// @name			HWM_MapinMenu
// @description			This mod adds a list of all the areas in the "Map".
// @namespace			HWM
// @author			GRiN_STONE
// @homepage			http://userscripts.org/users/669546/scripts
// @version			0.1
// @license			GNU
// @include			http://*heroeswm.ru/*
// @include			http://178.248.235.15/*
// @include			http://*lordswm.com/*
// ==/UserScript==
    
    var _map = []; 
    _map.push('<hr><a href="map.php?cx=48&cy=48"><font size="1"> - Ungovernable Steppe</font></a>');
    _map.push('<a href="map.php?cx=49&cy=48"><font size="1"> - Eagle\u0027s Nest</font></a>');
    _map.push('<a href="map.php?cx=50&cy=48"><font size="1"> - Peaceful Camp</font></a>');
    _map.push('<a href="map.php?cx=51&cy=48"><font size="1"> - Crystal Garden</font></a>');
    _map.push('<a href="map.php?cx=52&cy=48"><font size="1"> - Fairy Trees</font></a>');
    _map.push('<a href="map.php?cx=48&cy=49"><font size="1"> - Sunny City</font></a>');
    _map.push('<a href="map.php?cx=49&cy=49"><font size="1"> - Shining Spring</font></a>');
    _map.push('<a href="map.php?cx=50&cy=49"><font size="1"> - Tiger\u0027s Lake</font></a>');
    _map.push('<a href="map.php?cx=51&cy=49"><font size="1"> - Rogue\u0027s Wood</font></a>');
    _map.push('<a href="map.php?cx=52&cy=49"><font size="1"> - Bear Mountain</font></a>');
    _map.push('<a href="map.php?cx=53&cy=49"><font size="1"> - Mythril Coast</font></a>');
    _map.push('<a href="map.php?cx=49&cy=50"><font size="1"> - Green Wood</font></a>');
    _map.push('<a href="map.php?cx=50&cy=50"><font size="1"> - Empire Capital</font></a>');
    _map.push('<a href="map.php?cx=51&cy=50"><font size="1"> - East River</font></a>');
    _map.push('<a href="map.php?cx=52&cy=50"><font size="1"> - Magma Mines</font></a>');
    _map.push('<a href="map.php?cx=53&cy=50"><font size="1"> - Port City</font></a>');
    _map.push('<a href="map.php?cx=49&cy=51"><font size="1"> - Lizard\u0027s Lowland</font></a>');
    _map.push('<a href="map.php?cx=50&cy=51"><font size="1"> - Wolf\u0027s Dale</font></a>');
    _map.push('<a href="map.php?cx=51&cy=51"><font size="1"> - Dragon\u0027s Caves</font></a>');
    _map.push('<a href="map.php?cx=50&cy=52"><font size="1"> - Portal\u0027s ruins</font></a>');
    _map.push('<a href="map.php?cx=51&cy=52"><font size="1"> - Great Wall</font></a>');
    _map.push('<a href="map.php?cx=51&cy=53"><font size="1"> - Titans\u0027 Valley</font></a>');
    _map.push('<a href="map.php?cx=52&cy=53"><font size="1"> - Fishing village</font></a>');
    _map.push('<a href="map.php?cx=52&cy=54"><font size="1"> - Kingdom Castle</font></a>');
    
    var subnavList = document.evaluate("//li[@class='subnav']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var Addli;
    var Elem;
    var prev_elem;
    var i;

    Addli = subnavList.snapshotItem(1);
    prev_elem = Addli.childNodes[1].childNodes[3];
    _map.reverse();
    
    for (i = 0; i < _map.length; i++) {
        Elem = document.createElement('li');
        Elem.innerHTML = _map[i];
        prev_elem.parentNode.insertBefore(Elem, prev_elem.nextSibling);
    }