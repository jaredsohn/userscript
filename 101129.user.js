	// ==UserScript==
	// @name                OLAT Hack
	// @namespace	        http://sebastian.bejga.de/olat/
	// @description	        Small Hacks to make OLAT more like BITV.
	// @exclude     *
    // @include		http://*/olat/*
	// @include		http://*/olat3/*
	// ==/UserScript==
    
    function makemebigger() {
        makefont("+");
    }
    function makemesmaller() {
        makefont("-");
    }
    function makefont(how) {
        if (how == "+") {
            mypt = mypt + 2;
            globalFontStyle((mypt));
        } 
        else if (how == "-") {
            mypt = mypt - 2;
            globalFontStyle((mypt));
        }
    }
    
    var ugly = false;
    
    function makemeugly() {
        if (ugly)
            ugly = false;
        else
            ugly = true;
        globalFontStyle(mypt);
    }
    
    function globalFontStyle(ptsize) {
        var mycss = "* { font-size: "+ ptsize +"pt; }\n";
        if (ugly) {
            mycss += " * > a, * > a.b_tree, * > a.b_tree_l0, div.b_tree li a, div.b_tree li a.b_tree_selected, div.b_tree li a.b_tree_selected_parents, div.b_tree li a.b_tree_l0, div.b_tree {color: red;}\n";
            mycss += " #b_main, #b_main.o_loginscreen, #b_main.o_home { background-image: none; background-color: black; color: white;}\n"
        }
        
		try {
			var elmHead, elmStyle;
			elmHead = document.getElementsByTagName('head')[0];
			elmStyle = document.createElement('style');
			elmStyle.type = 'text/css';
			elmHead.appendChild(elmStyle);
			elmStyle.innerHTML = mycss;
		} catch (e) {
			if (!document.styleSheets.length) {
				document.createStyleSheet();
			}
			document.styleSheets[0].cssText = mycss;
		}
    }
    
    var mypt = 18;
    globalFontStyle(mypt);
    
	var liwrap1 = document.createElement('li');
	var liwrap2 = document.createElement('li');
	var liwrap3 = document.createElement('li');
    
	var biggerFont = document.createElement('a');
	var smallerFont = document.createElement('a');
	var contrast = document.createElement('a');
		biggerFont.href = '#';
        biggerFont.onclick = makemebigger;
		smallerFont.href = '#';
        smallerFont.onclick = makemesmaller;
		contrast.href = '#';
        contrast.onclick = makemeugly;
        
    biggerFont.appendChild(document.createTextNode('A+'));
    smallerFont.appendChild(document.createTextNode('A-'));
    contrast.appendChild(document.createTextNode('Invert'));
    
    liwrap1.appendChild(smallerFont);
    liwrap2.appendChild(biggerFont);
    liwrap3.appendChild(contrast);
    
	var elmHeaderNav = document.getElementById('o_topnav_help');
    elmHeaderNav.parentNode.insertBefore(liwrap1, elmHeaderNav);
    elmHeaderNav.parentNode.insertBefore(liwrap2, elmHeaderNav);
    elmHeaderNav.parentNode.insertBefore(liwrap3, elmHeaderNav);
