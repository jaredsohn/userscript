// ==UserScript==
// @name           Google Reader Compressed - (For use with compact mode)
// @namespace      http://userscripts.org
// @description    Cleaner font. Removes unnecessary whitespace
// @homepage       http://userscripts.org/scripts/show/117026
// @include        htt*://www.google.*/reader/view*
// @updateURL      https://userscripts.org/scripts/source/117026.meta.js
// @downloadURL    https://userscripts.org/scripts/source/117026.user.js
// @version        1.5
// ==/UserScript==
var css = 
          "*                                   {font-family:Cambria,sans-serif;} " +
          "body #bodyContent                   {font-size:100%;} " +
          "body #title-and-status-holder       {font-size:70%;} " +
          "body #chrome-title                  {font-size:200%;} " +
          "body #logo{margin:0;margin-left:10px;width:138px;background:url(/reader/ui/537640976-reader-logo-en.gif?hl=en) no-repeat;cursor:pointer;position:absolute;top:50%;height:27px;margin-top:-10px}" +
          //Left Nav Bar
          "body #lhn-add-subscription{width:80px;margin-left:11px;margin-right:auto;height:27px;display:block;position:absolute;top:50%;margin-top:-13px}" +
          "body #lhn-add-subscription-section  {border-bottom:1px solid #ebebeb;height:40px;position:relative;width:200px; margin-top:-3px;}" +
          "body #nav                  {float: left; width: 200px;} " +
          "body #chrome               {min-width:700px;margin-left:210px;zoom:1} " +
          "body #scrollable-sections-top-shadow               {width:200px;zoom:1} " +
          "body #scrollable-sections-bottom-shadow               {width:200px;zoom:1} " +
          "body #overview-selector {padding-top:3px;padding-bottom:3px;padding-left:10px;border-left:3px solid white}" +
          "div .section-minimize {background-position:-23px -120px;left:0px;top:6px}" +
          //All Items...
          "div #lhn-selectors .selector{overflow:visible;overflow-x:hidden;zoom:1;border-left:3px solid white;padding-left:10px}" +
          //Starred Items...
          "div .lhn-section-secondary{overflow:visible;overflow-x:hidden;zoom:1;border-left:3px solid white;padding-left:8px}" +
          //Browse For stuff
          "div #lhn-selectors .lhn-section-secondary .selector.no-icon{padding-left:10px}" +
          //Explore
          "div .folder .name.name-d-0{padding-left:10px;position:relative; top:-3px}" +
          //Rec Item Icon
          "div #recommendations-tree .sub-icon{opacity:.4;filter:alpha(opacity=40);background-position:0 -77px}" +
          "div .folder .sub-icon{margin-left:12px}" +
          "div .folder .folder .folder-toggle{margin-left:0px}" +
          "div .folder .folder>a>.icon{margin-left:12px}" +
          "div .lhn-section-footer{clear:both;font-size:11px;margin-left:28px;border-bottom:1px solid #ebebeb;padding-bottom:13px;margin-bottom:13px}" +
          //Subscription:
          "div #sub-tree-header{font-weight:bold;cursor:pointer;padding-left:10px;border-left:3px solid white;position:relative; top:-1px}" +
          "div .folder .folder>ul .icon{margin-left:15px}" +
          //Body
          "div .entry .entry-body{max-width:900px;text-align:justify;font-size:120%;}" +
          "div #entries .collapsed .entry-title{font-size:115%;font-weight:bold;display:inline;margin-right:.5em;color:#000}" +

          //Top Reader Icon Bar
          "body #top-bar {position:relative;border-bottom:1px solid #e5e5e5;height:44px;}" +
          //Search box
          "body #search{padding:15px 0;margin-left:213px}" +
          "body #search-input{width:293px;margin:0}" +
          "body #search-input {position:relative;border-bottom:1px solid #e5e5e5;height:20px;margin-top:-5px}" +
          "body #search .search-restrict{width:130px;margin:0 18px;overflow:hidden;margin-top:-6px}" +
          "body .jfk-textinput{-webkit-border-radius:1px;-moz-border-radius:1px;border-radius:1px;border:1px solid #d9d9d9;border-top:1px solid #c0c0c0;font-size:13px;height:27px;padding:3px 8px;margin-top:-6px}" +
          //Search button
          "body .jfk-button-action{background-color:#4d90fe;background-image:-webkit-linear-gradient(top,#4d90fe,#4787ed);background-image:-moz-linear-gradient(top,#4d90fe,#4787ed);background-image:-ms-linear-gradient(top,#4d90fe,#4787ed);background-image:-o-linear-gradient(top,#4d90fe,#4787ed);background-image:linear-gradient(top,#4d90fe,#4787ed);border:1px solid #3079ed;color:#fff;margin-top:-6px}" +          

          //Refresh button, etc...
          "div #viewer-header {zoom:1;background:#fff;color:#333;height:40px;margin-right:33px;overflow:hidden;position:relative;margin-top:-3px} " +
          
          //Reading entries
          "div #entries                        {font-size:100%;} " +
          //star
          "div #entries.list .collapsed .entry-icons    {margin:0;padding:0;width:auto;overflow:visible;position:absolute;top:2px}" +
          
          //Unknown?
          "div #entries.list .collapsed .entry-main .entry-source-title{color:#555;font-size:100%;padding:0 0em 0 0;overflow:hidden;display:block;width:11em;white-space:nowrap;position:absolute;top:2px;left:1.85em;}" +
          
          //Main text entry in list mode
          "div #entries.list .collapsed .entry-secondary{color:#777;white-space:normal;width:auto;overflow:hidden;position:absolute;top:0px;}" +
          
          "div #entries.list .collapsed .entry-main .entry-original {white-space:normal;float:none;margin:0;padding:0;position:absolute;top:2px;width:1.2em;z-index:2}" +
          
          //Padding for text entries in list mode
          "div #entries.list .entry .collapsed {padding:0px 0px;background:#fff;border:solid #fff;border-width:0px 0;cursor:pointer;-moz-user-select:none;zoom:1;margin:0;overflow:hidden;width:auto;position:relative;line-height:3.2ex}" +
          
          "div #entries.list .collapsed .entry-main .entry-original{white-space:normal;float:none;margin:0;padding:0;position:absolute;top:7px;width:1.2em;z-index:2}" +
          "div #scrollable-sections {overflow-y:hidden;overflow-x:hidden}" +
          "div #scrollable-sections:hover{overflow-y:auto;overflow-x:auto}" +
          
          "body #bodyContent                {font-size:110%;} ";

var css = "*                                   {font-family:Cambria,sans-serif;} " +
          "div #scrollable-sections {overflow-y:hidden;overflow-x:hidden}" +
          "div #scrollable-sections:hover{overflow-y:auto;overflow-x:auto}" +
          "body #bodyContent                   {font-size:100%;} " +
          "body #title-and-status-holder       {font-size:70%;} " +
          "div .entry .entry-body{max-width:900px;text-align:justify;font-size:120%;}" +
          "div #entries .collapsed .entry-title{font-size:105%;font-weight:bold;}" +
          "body #chrome-title                  {font-size:200%;} ";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}
}