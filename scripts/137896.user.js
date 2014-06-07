// ==UserScript==
// @name           Ultimaz Chat
// @description    .
// @namespace      DraKula
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.0
// ==/UserScript==

(function(){
var LoUChatMain = function(){
	function createChat() {
		var louChat = {};
		qx.Class.define("louChat.main", {
			type: "singleton",
			extend: qx.core.Object,
			members: {
				initialize: function(){
					var a = qx.core.Init.getApplication();
					var container = a.title.reportButton.getLayoutParent();
					var openChat = new qx.ui.form.Button("Open IRC");
					var opened = false;
					var win = null;
					openChat.addListener("execute",function(event){
						try{
							if(opened==true){
								win.open();
								return;
							}
							var a = qx.core.Init.getApplication();
							win = new qx.ui.window.Window("NOW Chat");
							win.setWidth(500);
							win.setHeight(380);
							win.setShowMinimize(true);
							var layout = new qx.ui.layout.Grow();
							win.setContentPadding(5);
							win.setLayout(layout);

							var tempw = new qx.ui.container.Composite();
							tempw.setLayout(new qx.ui.layout.Grow());
							tempw.getContentElement().useElement(new qx.html.Element().useMarkup("<iframe src=\"http://webchat.freenode.net?channels=Ultimaz&uio=d4 style=\"width:100%;\"\"></iframe>"));
							tempw.setAllowGrowX(true);
							tempw.setAllowGrowY(true);
							win.add(tempw);//, {flex: 1});
							a.getRoot().add(win, {left:20, top:20});
							opened = true;
							win.addListener("close",function(){
								this.removeAll();
								this.destroy();
								opened = false;
							});
							win.open();
						}catch(err){
						console.log(err);
						}
					});
					container._add(openChat,{row:0,column:13});
				}
			}
		});
	}
	
	//Code from LoUTweak
	function LC_checkIfLoaded() {
		try {
			if (typeof qx != 'undefined') {
				a = qx.core.Init.getApplication(); // application
				c = a.cityInfoView;
				ch = a.chat;
				wdst = webfrontend.data.ServerTime.getInstance().refTime;
				if (a && c && ch && wdst) {
					createChat();
					window.louChat.main.getInstance().initialize();
				} else
					window.setTimeout(LC_checkIfLoaded, 1000);
			} else {
				window.setTimeout(LC_checkIfLoaded, 1000);
			}
		} catch (e) {
			if (typeof console != 'undefined') console.log(e);
			else if (window.opera) opera.postError(e);
			else GM_log(e);
		}
	}
	if (/lordofultima\.com/i.test(document.domain))
		window.setTimeout(LC_checkIfLoaded, 1000);
}
	//Code from LoUTweak
	var louChatScript = document.createElement("script");
	louChatScript.id = "testing";
	txt = LoUChatMain.toString();
	if (window.opera != undefined)
		txt = txt.replace(/</g,"&lt;"); // rofl Opera
	louChatScript.innerHTML = "(" + txt + ")();";
	louChatScript.type = "text/javascript";
	if (/lordofultima\.com/i.test(document.domain))
		document.getElementsByTagName("head")[0].appendChild(louChatScript);

})();