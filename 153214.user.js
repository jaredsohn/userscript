// ==UserScript==
// @id             f.10086.cn-d43bc1bd-0433-44b6-8cee-3d694e740831@http://userscripts.org/users/shadowedge
// @name           EnterSendMessage
// @version        1.0
// @namespace      http://userscripts.org/users/shadowedge
// @author         shadowedge
// @description    
// @include        http://f.10086.cn/im5/login/login.action*
// @run-at         document-end
// ==/UserScript==
//alert(1);
document.onkeydown = function(event){
 var e = event || window.event;  // Handle IE event model
 //alert(e);
    // We start off with no modifiers and no key name
    var modifiers = ""
    var keyname = null;

    if (e.type == "keydown") {
        var code = e.keyCode;
        // Ignore keydown events for Shift, Ctrl, and Alt
        if (code == 13){//回车
			//alert(code);
			//alert(document.getElementsByTagName("button")[0]);
			document.getElementsByTagName("button")[0].click();
			return;
		}
		if (code == 8){//退格
			//alert(code);
			//alert(document.getElementsByTagName("button")[0]);
			//document.getElementsByTagName("button")[0].click();
			return;
		}
}};
//documentElement.getElementsByTagName("button")[0].click();