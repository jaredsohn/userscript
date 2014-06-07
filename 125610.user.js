// ==UserScript==
// @name          SmartMercadolibre.com.ar
// @description	  Enhace Mercadolibre.com.ar
// @author        JuanCarlosPaco
// @include       http://*mercadolibre.com.ar*/*
// @include       https://*mercadolibre.com.ar*/*
// @include       http://*.*mercadolibre.com.ar*/*
// @include       https://*.*mercadolibre.com.ar*/*
// @include       http://*.mlstatic.com/*
// @include       http://*.mlstatic.com.ar/*
// @icon           http://www.mercadolibre.com/favicon.ico
// ==/UserScript==

// Try to add HTML5 PlaceHolder and WebkitSpeech features

try {
    search = document.getElementById("query");
    search.placeholder = " Buscar . . .";
    search.title = "Buscar";
    search.setAttribute('x-webkit-speech','');
}catch(e){};

// Try to add custom CSS3

try {
    myNode = document.createElement('style');
    myNode.innerHTML = '@import url(http://fonts.googleapis.com/css?family=Ubuntu);*{font-family:ubuntu;} ' +
        'h1, h2, h3, h4 { text-shadow:0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15); /* IE */ filter: progid:DXImageTransform.Microsoft.Glow(Color=#000000,Strength=1); -ms-filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=-1, OffY=-1, Color=#000000)progid:DXImageTransform.Microsoft.dropshadow(OffX=0, OffY=-1, Color=#000000)progid:DXImageTransform.Microsoft.dropshadow(OffX=1, OffY=-1, Color=#000000)progid:DXImageTransform.Microsoft.dropshadow(OffX=1, OffY=0, Color=#000000)progid:DXImageTransform.Microsoft.dropshadow(OffX=1, OffY=1, Color=#000000)progid:DXImageTransform.Microsoft.dropshadow(OffX=0, OffY=1, Color=#000000)progid:DXImageTransform.Microsoft.dropshadow(OffX=-1, OffY=1, Color=#000000)progid:DXImageTransform.Microsoft.dropshadow(OffX=-1, OffY=0, Color=#000000)"; } ' +
        '@-webkit-keyframes particle-size { from { background-size: 6px 6px, 12px 12px; } to { background-size: 12px 12px, 24px 24px; } } @-moz-keyframes particle-size { from { background-size: 6px 6px, 12px 12px; } to { background-size: 12px 12px, 24px 24px; } } @-o-keyframes particle-size { from { background-size: 6px 6px, 12px 12px; } to { background-size: 12px 12px, 24px 24px; } } @keyframes particle-size { from { background-size: 6px 6px, 12px 12px; } to { background-size: 12px 12px, 24px 24px; } } @-webkit-keyframes particle-positon { from { background-position: 60px, 60px; } to { background-position: 140px, 140px; } } @-moz-keyframes particle-positon { from { background-position: 60px, 60px; } to { background-position: 140px, 140px; } } @-o-keyframes particle-positon { from { background-position: 60px, 60px; } to { background-position: 140px, 140px; } } @keyframes particle-positon { from { background-position: 60px, 60px; } to { background-position: 140px, 140px; } } ' +
        'body{ background-repeat: repeat; background-position: center center; background: transparent; background: -moz-radial-gradient(white 2%, transparent 8%), -moz-radial-gradient(white 2%, transparent 8%), white; background: -webkit-radial-gradient(white 2%, transparent 8%), -webkit-radial-gradient(white 2%, transparent 8%), white; background: -o-radial-gradient(white 2%, transparent 8%), -o-radial-gradient(white 2%, transparent 8%), white; background: -khtml-radial-gradient(white 2%, transparent 8%), -khtml-radial-gradient(white 2%, transparent 8%), white; background: -ms-radial-gradient(white 2%, transparent 8%), -ms-radial-gradient(white 2%, transparent 8%), white; background-position: 0 0, 150px 150px; -webkit-background-size: 23px 23px; -moz-background-size: 23px 23px; -o-background-size: 23px 23px; -khtml-background-size: 23px 23px; -ms-background-size: 23px 23px; background-size: 23px 23px;  -webkit-animation: particle-size 120s linear infinite, particle-positon 120s linear infinite alternate; -moz-animation: particle-size 120s linear infinite, particle-positon 120s linear infinite alternate; -o-animation: particle-size 120s linear infinite, particle-positon 120s linear infinite alternate; } ';
    document.getElementsByTagName("head")[0].appendChild(myNode);
}catch(e){};

// Try to remove ADs
    
try {
    var elements = new Array();
    elements = document.getElementsByClassName('footer mainFooter');
    for(i in elements ){
         elements[i].style.display = "none";
    }
}catch(e){};

try {
    var elements = new Array();
    elements = document.getElementsByClassName('main-footer main-footer-hr main-footer-copyright');
    for(i in elements ){
         elements[i].style.display = "none";
    }
}catch(e){};


try {
    var elements = new Array();
    elements = document.getElementsByClassName('article box learn-meli');
    for(i in elements ){
        elements[i].style.display = "none";
    }
}catch(e){};

try {
    ads = document.getElementById('emIS');
    ads.style.display = 'none';
}catch(e){};

try {
    ads = document.getElementById('twIS');
    ads.style.display = 'none';
}catch(e){};

try {
    ads = document.getElementById('fbIS');
    ads.style.display = 'none';
}catch(e){};

try {
    ads = document.getElementById('facebook');
    ads.style.display = 'none';
}catch(e){};
    
try {
    ads = document.getElementById('fbfaces');
    ads.style.display = 'none';
}catch(e){};

try {
    ads = document.getElementById('bancos');
    ads.style.display = 'none';
}catch(e){};

try {
    ads = document.getElementById('horizontalAds');
    ads.style.display = 'none';
}catch(e){};

try {
    ads = document.getElementById('verticalAds');
    ads.style.display = 'none';
}catch(e){};
    
try {
    ads = document.getElementById('mclicsBottom');
    ads.style.display = 'none';
}catch(e){};

try{
ads = document.getElementById('mlkBannerBottom');
ads.style.display = 'none';
}
catch(e){};

try {
    sidebarDiv = document.getElementById('adscolumn');
    sidebarDiv.style.display = 'none';
}catch(e){};

try {
    var ele = document.getElementById('oasTOP');
    ele.style.display = 'none';
}catch(e){};

try {
    var eles = document.getElementById('MClicsQCatAdImg');
    eles.style.display = 'none';
}catch(e){};

try {
    var eles = document.getElementById('bottom_ads');
    eles.style.display = 'none';
}catch(e){};

// Try to add the IMAGE Zoom Pop Up !

function SuperZoom() {
    var showPopupPicTimeout;
    var hidePopupPicTimeout;
    var displayTimeout=100;

    // CSS
    addStyle(
	'@-webkit-keyframes pulse { from {opacity: 0; -webkit-filter: sepia(0.9);} to {opacity: 1; -webkit-filter: none;} }   .fbfPopup { padding:2px; background: transparent; border:2px dotted #128; -moz-border-radius:10px; -webkit-border-radius:10px; -o-border-radius:10px; -khtml-border-radius:10px; border-radius:10px; -webkit-animation-name: pulse; -webkit-animation-duration: 1s; -webkit-animation-iteration-count: 1; -webkit-animation-direction: normal; }'+
	'.ff-popup-default { max-width:500px; margin:100px auto; }'+
	'.fbfPopupContainer { display:none; top:0; right:0; bottom:0; left:0; }'+
	'#qq-popup-div { display:none; background: transparent; border:1px solid #000; position:fixed !important; top:3px !important; padding:3px; min-width:120px; z-index:99999 !important; -moz-border-radius:2px; -o-border-radius:2px; -webkit-border-radius:2px; -khtml-border-radius:2px; border-radius:2px; }'+
	'.qq-popup-div { right:3px !important; left:auto !important; -moz-box-shadow:none; -o-box-shadow:none; -webkit-box-shadow:none; -khtml-box-shadow:none; box-shadow:none; }'+
	'.qq-popup-div-left  { left: 3px !important; right:auto !important; -moz-box-shadow:none; -o-box-shadow:none; -webkit-box-shadow:none; -khtml-box-shadow:none; box-shadow:none; }'+
	'.qq-popup-div-right { right:3px !important; left:auto  !important; -moz-box-shadow:none; -o-box-shadow:none; -webkit-box-shadow:none; -khtml-box-shadow:none; box-shadow:none; }'+
	'#ff-popup-pic-div img { max-height: ' + (window.innerHeight-35) + 'px; }'+
	'#qq-pic-close { display:none; position:absolute; top:3px; right:9px; color:#ff9999; cursor:pointer; font-weight:bold; font-size:12px; }'+
	'#qq-popup-div:hover #ff-popup-pic-close { display:block; }'+
	'#qq-pic-close:hover { color:#aa6666; }'+
	'#ff-popup-pic-image { text-align:center; }'+
	'#ff-popup-pic-image img { color:#999999; display:block; }'+
	'#fbfUpdatePopup { max-width:500px; margin:100px auto; padding:10px; }'+
	'.fbfImportant { font-weight:bold; }'+
	'.fbfNote { color:#777; }'+
	'.fbfRight { text-align:right; }'+
	'.ad_story .social_ad_advert { z-index:0; }'
    );

    // Add a DIV tag into DOM
    var popupPicDiv = document.createElement('div');
    popupPicDiv.id = 'qq-popup-div';
    popupPicDiv.className = 'fbfPopup qq-popup-div';
    popupPicDiv.innerHTML = '<div id="qq-pic-close" title="Close">X</div><div id="ff-popup-pic-image"><span></span></div>';

    try {
	    document.body.insertBefore(popupPicDiv, document.body.lastChild.nextSibling);
	    document.getElementById('qq-pic-close').addEventListener('click', function() { document.getElementById('qq-popup-div').style.display='none'; }, false);
    } catch(x) {
    	var fbppdivAdder = setInterval(function() {
	    	try {
	    		document.body.insertBefore(popupPicDiv, document.body.lastChild.nextSibling);
	    		document.getElementById('qq-pic-close').addEventListener('click', function() { document.getElementById('qq-popup-div').style.display='none'; }, false);
	    		if ($('#qq-popup-div')) { clearInterval(fbppdivAdder); }
	    	} catch(x) {}
    	}, 500);
    }

    //picRegex = /http:\/\/(img\.mlstatic\.com)\/productimages\/sku_([0-9_]+_small\.jpg)/;
    picRegex = /http:\/\/(img[0-9]\.mlstatic\.com)\/s_MLM_v_S_f_[0-9_][0-9]\.jpg/;

    function showPopupPic(e) {
    	try {
    		var t = e.target;
	    	var oldSrc;
	    	var newSrc;
	    	var title;

	    	//if (t.tagName == 'IMG' && picRegex.test(t.src)) { newSrc = t.src.replace(/S_f/, "O_f"); }
	    	if (t.tagName == 'IMG') { newSrc = t.src.replace(/[A-Z]_f/, "O_f"); }
		
	    	if (oldSrc || newSrc) {
	    		clearTimeout(hidePopupPicTimeout);
	    		t.removeEventListener('mouseout', hidePopupPic, false);
	    		t.addEventListener('mouseout', hidePopupPic, false);
	    		showPopupPicTimeout = setTimeout(function(){
	    			$('#ff-popup-pic-image').innerHTML = '<img src="' + newSrc + '" title="PREVIEW" alt="Preview" style="max-height:' + (window.innerHeight-35) + 'px;"/>'; // + title;
	    			$('#qq-popup-div').style.display = 'block';
                    // $('#qq-popup-div').className = 'fbfPopup qq-popup-div';
    				$('#qq-popup-div').className = 'fbfPopup qq-popup-div-' + (e.pageX>document.body.clientWidth/2 ? 'left' : 'right');
    			}, displayTimeout);
    		}
    	} catch(x) { logError('Popup Pic', x); }
    }

    $('#qq-popup-div').addEventListener('mouseover', function(e) { clearTimeout(hidePopupPicTimeout); }, false);
    $('#qq-popup-div').addEventListener('mouseout',  function(e) {
    	var r = e.relatedTarget;
    	if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
    		while (r.parentNode && r.id!='qq-popup-div') { r = r.parentNode; }
    		if (r.id!='qq-popup-div') { document.getElementById('qq-popup-div').style.display = 'none'; }
    	}
    }, false);

    window.addEventListener('mouseover', function(e) {
    	if (!e.shiftKey && !e.ctrlKey && !e.altKey) { showPopupPic(e); }
    }, false);

    function hidePopupPic(e) {
    	clearTimeout(showPopupPicTimeout);
    	if (!e.shiftKey && !e.ctrlKey && !e.altKey) {
    		hidePopupPicTimeout = setTimeout(function() { document.getElementById('qq-popup-div').style.display = 'none'; }, 30);
    	}
    }

    function logError(category, x) {}
    function log(str) {}

    function $(q, root, single) {
    	root = root || document;
    	if (q[0]=='#') { return root.getElementById(q.substr(1)); }
    	else if (q[0]=='/' || (q[0]=='.' && q[1]=='/')) {
    		if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
    		return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    	}
    	else if (q[0]=='.') { return root.getElementsByClassName(q.substr(1)); }
    	return root.getElementsByTagName(q);
    }

    function addStyle(css) {
    	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
    	else if (heads = document.getElementsByTagName('head')) {
    		var style = document.createElement('style');
    		try { style.innerHTML = css; }
    		catch(x) { style.innerText = css; }
    		style.type = 'text/css';
    		heads[0].appendChild(style);
    	}
    }
}

try {
    SuperZoom();
}catch(e){};

//