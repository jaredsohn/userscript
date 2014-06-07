// ==UserScript==
// @name           Pokec.sk - uprava dizajnu RP
// @namespace      Pokec.sk, skin, template, stara, nova, RP, azet, dizajn, redizajn
// @require        http://sizzlemctwizzle.com/updater.php?id=63964
// @include        http://rpx.azet.sk/index.phtml?i9=*
// @include        http://rpx.azet.sk/?i9=*
// @include        http://pokec.azet.sk/sluzby/rp/*
// @include        http://pokec.azet.sk/weroro*
// @date           2011-11-10
// @author         MerlinSVK
// @version        1.4.4
// ==/UserScript==
function applyRPStyle(){
var css = 	/* stara RP start */
			".c_input{-moz-border-radius: 2px !important; border-radius: 2px !important; border-width: 1px !important; border-style: solid !important; border-color:#346DAE !important; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABICAIAAAC4IAh6AAAAB3RJTUUH2QwaEyISSdqX/AAAAAlwSFlzAABOIAAATiABFn2Z3gAAAARnQU1BAACxjwv8YQUAAABVSURBVHjaYyjabMwkIyPDxMDAgBP/Z/jP9P8fEP//x/TvP4gNpeH8/0D6H5gPYWNXCzYDaBY+uzg5uJhkpAi45z/UPmQ3wezEIwbR9x/JnRAxPHYBAA64eAo/IhgzAAAAAElFTkSuQmCC) repeat-x !important;}"+
			".c_input:hover{background-position: 0 -36px !important;}"+
			"#TxtSubj,.c_input input,#rpInpt {font-family:Tahoma !important; color:#21446B !important; font-weight:900 !important;}"+
			/* nova RP start */
			"fieldset.css_txt {-moz-border-radius: 2px !important; border-radius: 2px !important; border: 1px solid #346DAE !important; background: #7DC13D url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAC5CAIAAABm7sLGAAAAK3RFWHRDcmVhdGlvbiBUaW1lAHNvIDI2IFhJSSAyMDA5IDAwOjI0OjIwICswMTAw0ThxvwAAAAd0SU1FB9kMGRcYIl8WfhsAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L/GEFAAAAcElEQVR42oXR0QnAIAwE0MM1HKObdbUOeG1B0kTv7IcgeRAvEed1tN57AxCHYANRav/Gx8adG1t8suLCwo2NfNbeGbgxkz9M5C+W8tW9Zaeup/yrc9mPtOHWyvzCTP7vPf3/zP24sclp8luL+URd2w0gB07O6CnpdgAAAABJRU5ErkJggg%3D%3D) 0 0 repeat-x !important;}"+
			"fieldset.css_txt:hover {background: #90CC56 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAC5CAIAAABm7sLGAAAAK3RFWHRDcmVhdGlvbiBUaW1lAHNvIDI2IFhJSSAyMDA5IDAwOjI4OjAzICswMTAwuMmM0QAAAAd0SU1FB9kMGRccE2qkuyUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAEZ0FNQQAAsY8L/GEFAAAAcUlEQVR42pWS0Q2AIAxEG4ZhATdzNQd8xgSF0ivqR0O4l4Mr1PZjK7XWYmZPAW7fi8K1Ehk2eBCeL8zxjNHuE/lA67eHP4yht5hbs0kXuWN23NmoDCT6G3N9xT9dsvaeUhe5O2PoOWETXzMxiwhPPr8nxJdR7B9eJAAAAAAASUVORK5CYII%3D) 0 0 repeat-x !important;}"+
			"#rpInpt {background-color:transparent !important; font-size:12px !important; line-height:20px !important;}";
			/* nova RP koniec */
			
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
};
if(window.location.href.indexOf("weroro") != -1){
  var w = document.getElementsByClassName("css_niecoomne");
  w[0].innerHTML = "<a href='http://www.weroro.sk/' target='_self'><img src='http://www.weroro.sk/pokec_header.png' title='OficiĂˇlna strĂˇnka'/></a>";
}
else{
applyRPStyle();
}