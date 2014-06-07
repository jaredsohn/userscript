// ==UserScript==
// @name           LoU Mail App
// @description    UI Extension for LordOfUltima
// @version        1.8
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// ==/UserScript==

(function() {

    // outer shell for injection
    var mail_start = function() {
        
        // inner shell for delayed execution
        function mailapp_main() {

qx.Class.define("MailApp",{
	extend:qx.ui.window.Window,construct:function(){
		qx.ui.window.Window.call(this);
		this.ErrorReporting();
		this.set({width:1000,height:500,allowMaximize:false,allowMinimize:false,resizable:true,caption:"Mail App v1.8",showMaximize:false,showMinimize:false,showStatusbar:false,showClose:false,contentPadding:0,useMoveFrame:true});
		this.setLayout(new qx.ui.layout.Canvas());
		var B = new qx.ui.basic.Image("webfrontend/ui/win_mainoverlay_paper.jpg");
		B.setAllowGrowX(true);
		B.setAllowShrinkX(true);
		B.setAllowGrowY(true);
		B.setAllowShrinkY(true);
		B.setScale(true);

	// Load config options
		this.doptions = {
			"height": 500,
			"width" : qx.bom.Viewport.getWidth(window)-420,
			"x" : 410,
			"y" : 100,
		};
		this.options = this.doptions;
		this.loadOptions();
		var w = this.options["width"];
		var h = this.options["height"];
		this.set({width:w,height:h});

		var x = this.options["x"];
		var y = this.options["y"];
		this.moveTo(x,y);

	// Start the interface
		this.add(B,{top:0,bottom:0,right:0,left:0});
		this.composeid = 0;
		{this.__FolderIcons=[];
		this.__FolderIcons["@In"]="webfrontend/ui/icons/icon_mail_folder_open_small.png";
		this.__FolderIcons["@Out"]="webfrontend/ui/icons/icon_mail_folder_open_small.png";
		this.__FolderIcons["@System"]="webfrontend/ui/icons/icon_mail_folder_open_small.png";
		};
		{this.____jF=[];
		this.____jF["@In"]="Inbox";
		this.____jF["@Out"]="Outbox";
		this.____jF["@System"]="System";
		};
		this.___jG=new qx.ui.tree.Tree().set({height:54,width:130,font:"font_headline_serif_groupbox",textColor:"textcol-groupbox",openMode:"none"});
		this.___jG.addListener("changeSelection",this.___jV,this);
		this.add(this.___jG,{left:5,top:5});
		this.___jH=new webfrontend.data.MailHeaderDataModel().set({blockConcurrentLoadRowCount:false});

		this.___jH.setColumns(["","Subject","From","Received"],["c","s","f","d"]);
		this.___jH.sortByColumn(3,false);
		this.___jI=new webfrontend.ui.CustomTable(this.___jH).set({columnVisibilityButtonVisible:false,statusBarVisible:false,width:420});
		this.___jI.addListener("cellClick",this.___jS,this);
		this.___jI.setAllowGrowX(false);
		this.___jI.setAllowShrinkX(false);
		var bm=this.___jI.getTableColumnModel();
		bm.setColumnWidth(0,32);
		bm.setColumnWidth(1,150);
		bm.setColumnWidth(2,90);
		bm.setColumnWidth(3,125);
		bm.setDataCellRenderer(0,new qx.ui.table.cellrenderer.Boolean());
		bm.setDataCellRenderer(1,new qx.ui.table.cellrenderer.Html());
		bm.setDataCellRenderer(2,new qx.ui.table.cellrenderer.Html());
		bm.setDataCellRenderer(3,new qx.ui.table.cellrenderer.Html());
		this.add(this.___jI,{left:5,top:60,right:5,bottom:39});
		this.___jH.addListener("loadRowComplete", this.__ka, this);
		this.___jDD=true;
		this.___jM = 0;
		this.___jN = 0;
		this.___jJ=new qx.ui.form.CheckBox("Select All").set({font:"bold"});
		this.add(this.___jJ,{left:5,bottom:14});
		this.___jJ.addListener("click",this.___jP,this);
		this.___jK=new qx.ui.form.Button("Delete").set({width: 75, appearance: "button-text-small",enabled:false});
		this.___jK.addListener("click",this.___jT,this);
		this.add(this.___jK,{bottom:12,left:90});
		this.___jL=new qx.ui.form.Button("Mark Unread").set({width: 75, appearance: "button-text-small",enabled:false});
		this.___jL.addListener("click",this.___jU,this);
		this.add(this.___jL,{bottom:12,left:165});
		this.___jL2=new qx.ui.form.Button("Mark Read").set({width: 75, appearance: "button-text-small",enabled:false});
		this.___jL2.addListener("click",this.___jU2,this);
		this.add(this.___jL2,{bottom:12,left:240});
		this.tabView = new qx.ui.tabview.TabView().set({contentPaddingLeft: 15, contentPaddingRight: 10, contentPaddingTop: 10, contentPaddingBottom: 10});
		this.tabPages = [];
		
		this.add(this.tabView, {top: 34, right: 3, bottom: 30, left: 440});
		this.createCompose(false, 0);

		webfrontend.net.CommandManager.getInstance().sendCommand("IGMGetFolders",null,this,this.___jW,this.___jO);
	// Hijack some hooks so LOU uses our mail client
		webfrontend.data.Mail.getInstance().addListener("changeUnread", this.___jY,this);

		webfrontend.gui.PlayerInfo.PageBase.prototype._onWindowParentChanged = function(bh,bi){
			if(bh==null){
				return;
			}
			if(bi!=null){
				this.removeListener("SendFriendInvite_Clicked",bh.onSendFriendInvite,bh);
				this.removeListener("SendAllianceInvite_Clicked",bh.onSendAllianceInvite,bh);
				this.removeListener("SendMail_Clicked",mailappinit._onSendEmail,mailappinit);
				this.removeListener("SendWhisper_Clicked",bh.onSendWhisper,bh);
				this.removeListener("ReportPlayer_Clicked",bh.onReportPlayer,bh);
				this.removeListener("MarkOnWorldMap_Clicked",bh.onMarkOnWorldMap,bh);
				bh.removeListener("OnGetPublicPlayerInfoDone",this.onGetPublicPlayerInfoDone,this);
					bh.removeListener("OnGetPublicPlayerInfoFailed",this.onGetPublicPlayerInfoFailed,this);
				bh.removeListener("appear",this.onWindowAppear,this);
				bh.removeListener("disappear",this.onWindowDisappear,this);
			}
			this.addListener("SendFriendInvite_Clicked",bh.onSendFriendInvite,bh);
			this.addListener("SendAllianceInvite_Clicked",bh.onSendAllianceInvite,bh);
			this.addListener("SendMail_Clicked",mailappinit._onSendEmail,mailappinit);
			this.addListener("SendWhisper_Clicked",bh.onSendWhisper,bh);
			this.addListener("ReportPlayer_Clicked",bh.onReportPlayer,bh);
			this.addListener("MarkOnWorldMap_Clicked",bh.onMarkOnWorldMap,bh);
			bh.addListener("OnGetPublicPlayerInfoDone",this.onGetPublicPlayerInfoDone,this);
			bh.addListener("OnGetPublicPlayerInfoFailed",this.onGetPublicPlayerInfoFailed,this);
			bh.addListener("appear",this.onWindowAppear,this);
			bh.addListener("disappear",this.onWindowDisappear,this);
		}

		var ct = qx.core.Init.getApplication().chat.contextMenu;
		for (var i in ct) {
			try {
				if (ct[i] && ct[i].length && ct[i].length == 5) {
					ct[i][2].removeListener("execute", qx.core.Init.getApplication().chat._onMail, qx.core.Init.getApplication().chat);
					ct[i][2].addListener("execute", this._onSendChatEmail, this);
					break;
				}
			} catch (e) { }
		}

		webfrontend.gui.Util.formatWinClose(this);
		qx.core.Init.getApplication().getTitleWidget().mailButton.removeListener("execute",qx.core.Init.getApplication().getTitleWidget().onMail,qx.core.Init.getApplication().getTitleWidget());
		qx.core.Init.getApplication().getTitleWidget().mailButton.addListener("execute",this.DisplayMail,this);

	},
	members:{ error:null,___jO:0,___jM:0,___jN:0,
		loadOptions: function() {
			var _str = localStorage.getItem("MailApp");
			if (_str) {
				try {
					this.options = qx.lang.Json.parse(_str);
				} catch (e) {
				}
				for (var i in this.doptions) {
					if (!this.options[i]) {
						this.options[i] = this.doptions[i];
					}
				}
			} else {
				var str = qx.lang.Json.stringify(this.options);
				localStorage.setItem("MailApp", str);
			}
		},
		saveOptions: function() {
			this.options["width"] = this.getWidth();
			this.options["height"] = this.getHeight();
			this.options["x"] = this.getLayoutProperties().left;
			this.options["y"] = this.getLayoutProperties().top;

			var str = qx.lang.Json.stringify(this.options);
			localStorage.setItem("MailApp", str);
		},
		__ka:function() {
			var bK=this.___jI.getFocusedRow();
			if(bK != null){
				this.___jS({getColumn:function(){return 1;},getRow:function(){return bK;}});
			}
		},
		__kb:function(bL, bM){
			bM.c = this.s;
			return bM;
		},
		__kc:function(){
			var bN=this.___jH.hasSelected();
			this.___jK.setEnabled(bN);
			this.___jL.setEnabled(bN);
			this.___jL2.setEnabled(bN);
		},
		___jP:function(){
			var bp=!this.___jH.getSelectAll();
			this.___jH.resetSelected(false);
			this.___jH.setSelectAll(bp);
			this.___jH.iterateCachedRows(this.__kb,{s:bp});
			this.___jH.fireDataEvent("dataChanged",{firstColumn:0,lastColumn:0,firstRow:0,lastRow:this.___jH.getRowCount()});
			this.__kc();
		},
		___jQ:function(r,bq,br){
			if(!r||br.cnt!=this.___jM){
				return;
			}
			var bs=qx.core.Init.getApplication();
			bs.getInfoNavigatorWidget().bulkRemovePages(bs.getMailPage(),br);
			this.___jH.setSelectAll(false);
			this.___jH.resetSelected(true,true);
			this.___jI.getSelectionModel().resetSelection();
			this.___jJ.setValue(false);
			this.__kc();

			if(bq!=0){
				webfrontend.gui.MessageBox.messageBox({title:"Deleting Error",text:"Error occurred while deleting Messages",buttons:1});
			}
		},
		___jR:function(r,bt,bu){
			if(!r||bu.cnt!=this.___jN){
				return;
			}
			this.___jH.setSelectAll(false);
			this.___jH.resetSelected(true,false);
			this.___jJ.setValue(false);
			this.__kc();
			if(!r){
				webfrontend.gui.MessageBox.messageBox({title:"Mark Unread Error",text:"Error occurred while marking messages unread",buttons:1});
			}
		},
		___jS:function(e) {
			var bw=this.___jH.getRowData(e.getRow());

			if(bw!=null){
				if(e.getColumn()==0){
					bw.c=!bw.c;
					this.___jH.setValue(0,e.getRow(),bw.c);
					this.___jH.setSelected(bw.i,bw.c);
					this.__kc();
					return;
				}
				var bv=qx.core.Init.getApplication();
				if(!bw.r){
					bw.r=1;
					bw.s=bw.s.substring(3,bw.s.length-4);
					bw.f=bw.f.substring(3,bw.f.length-4);
					bw.d=bw.d.substring(3,bw.d.length-4);
					this.___jH.setValue(1,e.getRow(),bw.s);
					webfrontend.net.CommandManager.getInstance().sendCommand("IGMSetReadFlag", {msgId:bw.i,flag:1}, this, function(e){});
					bv.title.resetUnreadMailMarker();
				}
				bw.viewIn=this.___jDD;
				bw.id=bw.i;
				if (this.checkforTab(bw.i)) {
					this.switchtoTab(bw.i);
				} else {
					this.createTab(bw);
					this.getMessage(bw.id);

				}
				this.__kc();
			}
		},
		___jT:function(e){
			this.___jM++;
			var bx=new Array();

			if(this.___jH.hasSelected()) {
				bx = this.___jH.getSelectedIds();
			} else {
				bx=[this.___jH.getRowData(this.___jI.getFocusedRow()).id];
				this.___jI.setFocusedCell(0,-1,false);
			}
			webfrontend.net.CommandManager.getInstance().sendCommand("IGMBulkDeleteMsg",{ids:bx,f:this.___jH.getFolder(),a:this.___jH.getSelectAll()},this,this.___jQ,{cnt:this.___jM,ids:bx,a:this.___jH.getSelectAll()});
		},
		___jU:function(e){
			this.___jN++;
			var by=new Array();

			if(this.___jH.hasSelected()) {
				by=this.___jH.getSelectedIds();
			} else {
				by=[this.___jH.getRowData(this.___jI.getFocusedRow()).id];
				this.___jI.setFocusedCell(0,-1,false);
			}
			webfrontend.net.CommandManager.getInstance().sendCommand("IGMBulkSetReadFlag",{msgIds:by,flag:0,f:this.___jH.getFolder(),all:this.___jH.getSelectAll()},this,this.___jR,{cnt:this.___jN,ids:by,a:this.___jH.getSelectAll()});
		},
		___jU2:function(e){
			this.___jN++;
			var by=new Array();

			if(this.___jH.hasSelected()) {
				by=this.___jH.getSelectedIds();
			} else {
				by=[this.___jH.getRowData(this.___jI.getFocusedRow()).id];
				this.___jI.setFocusedCell(0,-1,false);
			}
			webfrontend.net.CommandManager.getInstance().sendCommand("IGMBulkSetReadFlag",{msgIds:by,flag:1,f:this.___jH.getFolder(),all:this.___jH.getSelectAll()},this,this.___jR,{cnt:this.___jN,ids:by,a:this.___jH.getSelectAll()});
		},
		___jV:function(e){
			this.___jI.getSelectionModel().resetSelection();
			var bA=e.getData();
			this.___jH.resetSelected(false);
			this.___jH.setSelectAll(false);

			if(bA[0].getUserData("name")=="@Out"){
				this.___jDD=false;
				this.___jH.setColumns(["","Subject","To","Message Sent"],["c","s","to","d"]);
				this.___jH.setDirection(false);
			}else if(!this.___jDD){
				this.___jDD=true;
				this.___jH.setColumns(["","Subject","From","Received"],["c","s","f","d"]);
				this.___jH.setDirection(true);
			}
			var bz=bA[0].getUserData("ID");

			if(bA.length>0&&bz){
				this.currentFolder=bz;
				this.___jH.setFolder(bz);
			}
			this.___jI.setFocusedCell(0,-1,false);
			//this.___jJ.setValue(false);
			this.__kc();
		},
		___jW:function(r,bB,bC){
			if(r==false){
				webfrontend.gui.MessageBox.messageBox({title:"Communication Error",text:"Please Try Again",buttons:1});
				return;
			}
			if(bB==null||bC!=this.___jO){
				return;
			}
			var bG=new qx.ui.tree.TreeFolder("Mailbox").set({icon:"webfrontend/ui/icons/icon_mail_folder_open.png"});
			bG.setOpen(true);
			this.___jG.setRoot(bG);
			this.___jG.toggleHideRoot();
			var bF=bB.length;

			for(var i=0;i<bF;i++){
				var bD="";

				if(this.____jF.hasOwnProperty(bB[i].n)){
					bD=this.____jF[bB[i].n];
				}else{
					bD=bB[i].n;
				}
				var bE=new qx.ui.tree.TreeFile(bD);
				bE.setUserData("name", bB[i].n);
				bE.setUserData("ID", bB[i].i);
				if(this.__FolderIcons.hasOwnProperty(bB[i].n)){
					bE.setIcon(this.__FolderIcons[bB[i].n]);
				}else{
					bE.setIcon("webfrontend/ui/icons_ressource_iron_16.png");
				}
				bG.add(bE);

				if(bB[i].n=="@In"){
					this.___jG.setSelection([bE]);
				}
			}
		},
		___jY:function(bI){
			var bJ=this.___jH.getSelectAll();
			if(this.___jDD && bI.getData() > bI.getOldData()){
				this.___jH.reloadData();
			}
		},
		__ES: function(cB, cC) {
			var id = this.tabView.getSelection()[0].id;
			for (var ii = 0; ii < this.tabPages.length; ii++) {
				if (this.tabPages[ii].id == id) {
					break;
				}
			}
			var cE = "";
			switch (cC) {
			case webfrontend.gui.Mail.SendMailWidget.recipientFieldType.to:
				var cE = qx.bom.String.escape(qx.lang.String.trim(this.tabPages[ii].page.to.getValue()));
				break;
			case webfrontend.gui.Mail.SendMailWidget.recipientFieldType.cc:
				var cE = qx.bom.String.escape(qx.lang.String.trim(this.tabPages[ii].page.cc.getValue()));
				break;
			};
			var cF = "";
			if (cE.indexOf(';') != -1) {
				var cD = cE.split(';');
				var cG = cD.length;
				for (var i = 0; i < cG; i++) {
					if (qx.lang.String.trim(cD[i]) == cB) {
						return;
					};
				};
				if (cE.charAt(cE.length - 1) != ';') {
					cF += "; ";
				};
			} else {
				if (cE == cB) {
					return;
				};
				if (cE.length > 0) {
					cF += "; ";
				};
			};
			cF += cB;

			switch (cC) {
			case webfrontend.gui.Mail.SendMailWidget.recipientFieldType.to:
				this.tabPages[ii].page.to.setValue(this.tabPages[ii].page.to.getValue() + cF);
				break;
			case webfrontend.gui.Mail.SendMailWidget.recipientFieldType.cc:
				this.tabPages[ii].page.cc.setValue(this.tabPages[ii].page.cc.getValue() + cF);
				break;
			};
		},
		__Tv:function(cH){
			switch (cH.type) {
				case webfrontend.gui.Mail.SendMailWidget.recipientType.playerName:
					this.__ES(cH.name, cH.fieldType);
					break;
				case webfrontend.gui.Mail.SendMailWidget.recipientType.allianceOfficersAndLeaders:
					var cI = webfrontend.data.Alliance.getInstance().getOfficers();
					var cK = cI.length;
					for (var i = 0; i < cK; i++) {
						this.__ES(cI[i].n, cH.fieldType);
					};
				case webfrontend.gui.Mail.SendMailWidget.recipientType.allianceLeaders:
					var cM = webfrontend.data.Alliance.getInstance().getLeaders();
					var cK = cM.length;
					for (var i = 0; i < cK; i++) {
						this.__ES(cM[i].n, cH.fieldType);
					};
					break;
				case webfrontend.gui.Mail.SendMailWidget.recipientType.allianceAllMembers:
					var cJ = webfrontend.data.Alliance.getInstance().getMemberData();
					var cK = cJ.length;
					for (var i = 0; i < cK; i++) {
						this.__ES(cJ[i].n, cH.fieldType);
					};
					break;
				case webfrontend.gui.Mail.SendMailWidget.recipientType.distributionList:
					var cL = [];
					if (cH.hasOwnProperty("players")) {
						cL = cH.players;
					};
					for (var i = 0, cK = cL.length; i < cK; i++) {
						this.__ES(cL[i], cH.fieldType);
					};
					break;
			};
			return;
		},
		__Tw:function(){
			this.__Tr.__fj.__zz.setSelection([this.__Tr.__fj.__zz.getChildren()[0]]);
			this.__Tr.__fk.__zz.setSelection([this.__Tr.__fk.__zz.getChildren()[0]]);
			if(this.__Tr.isVisible()){
				this.__Tr.close();
			}else{
				this.__Tr.open();
			}
		},
		__Tw2:function(){
			this.__Tr.__fj.__zz.setSelection([this.__Tr.__fj.__zz.getChildren()[1]]);
			this.__Tr.__fk.__zz.setSelection([this.__Tr.__fk.__zz.getChildren()[1]]);
			if(this.__Tr.isVisible()){
				this.__Tr.close();
			}else{
				this.__Tr.open();
			}
		},
		_onSendChatEmail:function(e) {
			this.createCompose(qx.core.Init.getApplication().chat.contextPlayer, 0);
			if (!this.isVisible()) {
				this.open();
			}

		},
		_onSendEmail:function(e) {
			this.createCompose(e._target._lblNameValue.getValue(), 0);
			if (!this.isVisible()) {
				this.open();
			}

		},
		checkforTab:function(id) {
			for (var i = 0; i < this.tabPages.length; i++) {
				if (this.tabPages[i].id == id) {
					return true;
				}
			}
			return false;
		},
		switchtoTab:function(id) {
			for (var i = 0; i < this.tabPages.length; i++) {
				if (this.tabPages[i].id == id) {
					this.tabView.setSelection([this.tabView.getChildren()[i]]);
				}
			}		
		},
		createTab:function(bw) {
			var i = this.tabPages.length;
			var subject = qx.bom.String.toText(bw.s);
			var ss = subject;
			if (subject.length > 10) {
				ss = ss.substring(0,10) + "...";
			}
			var cc = "";
			for (var ii = 0; ii < bw.cc.length; ii++) {
				if (ii > 0) {
					cc = cc + "; ";
				}
				cc = cc + bw.cc[ii];
			}
			this.tabPages[i] = {name:ss, page:null, vbox:null};
			var page = new qx.ui.tabview.Page(this.tabPages[i].name);
			page.setLayout(new qx.ui.layout.Canvas());
			vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(0));

			// Subject
			cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			lab = new qx.ui.basic.Label("Subject").set({paddingTop: 4, maxWidth:50});
			cont.add(lab);
			cont.add(new qx.ui.core.Spacer(10));
			lab = new qx.ui.basic.Label(subject).set({paddingTop: 4, maxWidth:300});
			cont.add(lab);
			vbox.add(cont);
		
			// Date
			cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			lab = new qx.ui.basic.Label("Date:").set({paddingTop: 0});
			cont.add(lab);
			cont.add(new qx.ui.core.Spacer(18));
			lab = new qx.ui.basic.Label(this.removeHTML(bw.d)).set({paddingTop: 0});
			cont.add(lab);
			vbox.add(cont);

			// From
			cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			lab = new qx.ui.basic.Label("From:").set({paddingTop: 0});
			cont.add(lab);
			cont.add(new qx.ui.core.Spacer(18));
			lab = new qx.ui.basic.Label(this.BBCodePlayers(bw.f)).set({paddingTop: 0, rich:true});
			cont.add(lab);
			vbox.add(cont);

			// To
			cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			lab = new qx.ui.basic.Label("To:").set({paddingTop: 0});

			cont.add(lab);
			cont.add(new qx.ui.core.Spacer(30));
			var ttip = this.PlayerToolTip(bw.to);
			lab = new qx.ui.basic.Label(this.BBCodePlayers(bw.to)).set({paddingTop: 0, maxWidth:500, rich:true, toolTipText:ttip});
			cont.add(lab);
			vbox.add(cont);

			// CC
			cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			lab = new qx.ui.basic.Label("CC:").set({paddingTop: 0, paddingBottom: 20});
			cont.add(lab);
			cont.add(new qx.ui.core.Spacer(30));
			var ttip = this.PlayerToolTip(cc);
			lab = new qx.ui.basic.Label(this.BBCodePlayers(cc)).set({paddingTop: 0, maxWidth:500, rich:true, toolTipText:ttip});
			cont.add(lab);
			vbox.add(cont);

			// Message
			this.tabPages[i].Message =new qx.ui.basic.Label("");
			//mg.addListener(J,this._onMsgClick, this);
			vbox.add(webfrontend.gui.Util.getScrollableRichTextBoxDynamic(this.tabPages[i].Message),{flex:1});
			
			scroll = new qx.ui.container.Scroll(vbox);
			page.add(scroll, {top: 0, left: 0, right: 0, bottom: 25});

			// Buttons
			var ReplyBtn = new qx.ui.form.Button("Reply");
			ReplyBtn.set({width: 55, appearance: "button-text-small"});
			ReplyBtn.addListener("click", this.Reply, this);
			page.add(ReplyBtn, {top: 0, right: 5});

			var ReplyAllBtn = new qx.ui.form.Button("Reply All");
			ReplyAllBtn.set({width: 55, appearance: "button-text-small"});
			ReplyAllBtn.addListener("click", this.ReplyAll, this);
			page.add(ReplyAllBtn, {top: 18, right: 5});

			var FwdBtn = new qx.ui.form.Button("Forward");
			FwdBtn.set({width: 55, appearance: "button-text-small"});
			FwdBtn.addListener("click", this.ForwardFromMessage, this);
			page.add(FwdBtn, {top: 36, right: 5});


			var DelBtn = new qx.ui.form.Button("Delete");
			DelBtn.set({width: 55, appearance: "button-text-small"});
			DelBtn.addListener("click", this.DeleteFromMessage, this);
			page.add(DelBtn, {bottom:0, left: 0});

			var CloseBtn = new qx.ui.form.Button("Close");
			CloseBtn.set({width: 55, appearance: "button-text-small"});
			CloseBtn.addListener("click", this.CloseTab, this);
			page.add(CloseBtn, {top: 54, right: 5});
			page.id = bw.id;

			
			this.tabPages[i].bw = bw;
			this.tabPages[i].vbox = vbox;
			this.tabPages[i].page = page;
			this.tabPages[i].id = bw.id;
			this.tabView.add(this.tabPages[i].page);

			this.switchtoTab(bw.id);
		},
		PlayerToolTip:function(players) {
			players = this.removeHTML(players);
			players = players.split(";");
			var pp = new Array();
			var x = 0;
			for (var p in players) {
				if (p == "indexOf") break;
				if (x > 9) {
					pp.push("</br>" + qx.lang.String.trim(players[p]));
					x = 0;
				} else {
					pp.push(qx.lang.String.trim(players[p]));
				}
				x++;
			}
			players = pp.join("; ");
			return players;
		},
		BBCodePlayers:function(players) {
			players = this.removeHTML(players);
			players = players.split(";");
			var pp = new Array();
			var x = 0;
			for (var p in players) {
				if (p == "indexOf") break;
				if (x < 8) {
					pp.push("[player]" + qx.lang.String.trim(players[p]) + "[/player]");
				}
				x++;
			}
			if (x > 7) {
				pp.push((x-8) + " more...");
			}
			players = pp.join("; ");
			players=webfrontend.gui.Util.convertBBCode(webfrontend.gui.Util.generateBBCode(players));
			return players;
		},		
		createCompose:function(page, type) {
			this.composeid++;
			var id = this.composeid;
			var i = this.tabPages.length;
			var name = webfrontend.data.Player.getInstance().getName();
			var subject = "";
			var ss = "Compose";
			var m = "";
			var to = "";
			var cc = "";
			if (type != 0) {
				if (type == 3) {
					subject = "Fwd: " + qx.bom.String.toText(page.bw.s);
				} else if (type == 2) {
					if (qx.bom.String.toText(page.bw.s).slice(0,3) == "Re:") {
						subject = qx.bom.String.toText(page.bw.s);
					} else {
						subject = "Re: " + qx.bom.String.toText(page.bw.s);
					}
					to = qx.bom.String.toText(page.bw.f) + "; " + qx.bom.String.toText(page.bw.to);
					to = to.replace(name + "; ", "");
					to = to.replace(name + ";", "");
					to = to.replace(name, "");
					var cc = "";
					for (var ii = 0; ii < page.bw.cc.length; ii++) {
						if (ii > 0) {
							cc = cc + "; ";
						}
						cc = cc + page.bw.cc[ii];
					}
					cc = cc.replace(name + ";", "");
					cc = cc.replace(name, "");
				} else {
					if (qx.bom.String.toText(page.bw.s).slice(0,3)=="Re:") {
					subject = qx.bom.String.toText(page.bw.s);
					} else {
					subject = "Re: " + qx.bom.String.toText(page.bw.s);
					}
					to = qx.bom.String.toText(page.bw.f);
				}
				ss = subject;
				if (subject.length > 10) {
					ss = ss.substring(0,10) + "...";
				}
				m = page.Message.getValue();
				m = "\n\n[hr]\nFrom: " + qx.bom.String.toText(page.bw.f) + "\nSent: " + qx.bom.String.toText(page.bw.d) + "\nSubject: " + qx.bom.String.toText(page.bw.s) + "\n\n" + qx.bom.String.toText(m);
			} else {
				if (page) {
					to = qx.bom.String.toText(page);
				}
			}
			this.__Tr=new webfrontend.gui.Mail.Contacts.MainWindow({callbackFunction: this.__Tv, opener: this});
			this.receiver = "";
			this.cc = "";

			this.tabPages[i] = {name:ss, page:null, vbox:null};
			var page = new qx.ui.tabview.Page(this.tabPages[i].name);
			page.setLayout(new qx.ui.layout.Canvas());
			vbox = new qx.ui.container.Composite(new qx.ui.layout.VBox(0));
			// To
			cont = new qx.ui.container.Composite(new qx.ui.layout.HBox());
			var lab = new qx.ui.form.Button("To");
			lab.set({width: 32, appearance: "button-text-small"});
			lab.addListener("click", this.__Tw, this);
			cont.add(lab);
			cont.add(new qx.ui.core.Spacer(13));
			page.to = new qx.ui.form.TextField(to);
			page.to.setWidth(250);
			page.to.setMaxLength(3000);
			page.to.set({tabIndex: 301});
			page.to.addListener("focusout", this.hotkeys, this);
			page.to.addListener("focusin", this.nohotkeys, this);
			cont.add(page.to);
			vbox.add(cont);
			// CC
			cont = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({paddingTop: 5});
			var lab = new qx.ui.form.Button("CC");
			lab.set({width: 32, appearance: "button-text-small"});
			lab.addListener("click", this.__Tw2, this);

			cont.add(lab);
			cont.add(new qx.ui.core.Spacer(13));
			page.cc = new qx.ui.form.TextField(cc);
			page.cc.setWidth(250);
			page.cc.setMaxLength(3000);
			page.cc.set({tabIndex: 302});
			page.cc.addListener("focusout", this.hotkeys, this);
			page.cc.addListener("focusin", this.nohotkeys, this);
			cont.add(page.cc);
			vbox.add(cont);
			// Subject
			cont = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({paddingTop: 5,paddingBottom: 5});
			lab = new qx.ui.basic.Label("Subject").set({paddingTop: 4, maxWidth:50});
			cont.add(lab);
			cont.add(new qx.ui.core.Spacer(9));
			page.subject = new qx.ui.form.TextField(subject);
			page.subject.setWidth(250);
			page.subject.setMaxLength(100);
			page.subject.set({tabIndex: 303});
			page.subject.addListener("focusout", this.hotkeys, this);
			page.subject.addListener("focusin", this.nohotkeys, this);
			cont.add(page.subject);
			cont.add(new qx.ui.core.Spacer(14));
			vbox.add(cont);
			vbox.add(new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({paddingTop: 5,paddingBottom: 0}))
			// Message
			page.message = new qx.ui.form.TextArea(m).set({allowGrowX:true,allowGrowY:true,minHeight:200,maxLength:3000, tabIndex: 304});
			page.message.addListener("focusout", this.hotkeys, this);
			page.message.addListener("focusin", this.nohotkeys, this);
			page.message.addListener("input",this._ComposeInput,this);
			page.message.toggleLiveUpdate();
			vbox.add(page.message, {flex:1});
			
			scroll = new qx.ui.container.Scroll(vbox);
			page.add(scroll, {top: 0, left: 0, right: 0, bottom: 25});
			// Available Characters
			var bG = new qx.ui.container.Composite(new qx.ui.layout.HBox(10).set({alignY:"middle",alignX:"right"}));
			var availcharsLbl=new qx.ui.basic.Label("Available characters:");
			bG.add(availcharsLbl);
			page.charCount=new qx.ui.basic.Label("");
			bG.add(page.charCount);
			page.add(bG,{bottom: 0, left: 0});
			// BBCode Widget
			var bbcodeWidget = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({marginTop:0});
			var bH = webfrontend.gui.Util.getBBCodeHBox(page.message,this,275);
			// Hide the big button that says BB-Codes
			for(var a in bH) {
				if (bH[a] instanceof Array && bH[a].length == 3) {
					for (var aa in bH[a][2]) {
						if (bH[a][2][aa] instanceof Array && bH[a][2][aa].length == 1) {
							//console.log(bH[a][2][aa][0]);
							bH[a][2][aa][0].setVisibility(false);
							break;
						}
					}
				}
			}
			bbcodeWidget.add(bH);
			page.add(bbcodeWidget,{top: 0, left: 300});

			// Buttons
			var SendBtn = new qx.ui.form.Button("Send");
			SendBtn.set({width: 55, appearance: "button-text-small"});
			SendBtn.addListener("click", this.Send, this);
			page.add(SendBtn, {top: 0, right: 5});

			var CloseBtn = new qx.ui.form.Button("Close");
			CloseBtn.set({width: 55, appearance: "button-text-small"});
			if (id == 1) {
				CloseBtn.set({enabled:false});
			}
			CloseBtn.addListener("click", this.CloseTab, this);
			page.add(CloseBtn, {top: 54, right: 5});

	
			page.id = id;
			this.tabPages[i].vbox = vbox;
			this.tabPages[i].page = page;
			this.tabPages[i].id = id;
			this.tabView.add(this.tabPages[i].page);
			this.switchtoTab(id);
			this._ComposeInput();
		},
		_ComposeInput:function() {
			var id = this.tabView.getSelection()[0].id;
			for (var i = 0; i < this.tabPages.length; i++) {
				if (this.tabPages[i].id == id) {
					this.tabPages[i].page.charCount.setValue((3000 - this.tabPages[i].page.message.getValue().length).toString());
					break;
				}
			}
		},
		nohotkeys:function() {
			qx.core.Init.getApplication().allowHotKey = false;
		},
		hotkeys:function() {
			qx.core.Init.getApplication().allowHotKey = true;
		},
		CloseTab:function() {
			var id = this.tabView.getSelection()[0].id;
			if (id == 1) return;
			this.tabView.remove(this.tabView.getSelection()[0]);
			for (var i = 0; i < this.tabPages.length; i++) {
				if (this.tabPages[i].id == id) {
					qx.lang.Array.remove(this.tabPages, this.tabPages[i]);
					break;
				}
			}
		},
		Send:function(){
			var msg = this.tabView.getSelection()[0];
			if (msg.to.getValue() != "") {
				webfrontend.net.CommandManager.getInstance().sendCommand("IGMBulkSendMsg",{targets:msg.to.getValue(),ccTargets:msg.cc.getValue(),subject:msg.subject.getValue(),body:msg.message.getValue()},this,this._SendComplete,msg.id);
			}

		},
		_SendComplete:function(r, t, id) {
			if (id > 1) {
				this.CloseTab();
			} else {
				this.tabPages[0].page.subject.setValue("");
				this.tabPages[0].page.to.setValue("");
				this.tabPages[0].page.cc.setValue("");
				this.tabPages[0].page.message.setValue("");
			}
		},
		DeleteFromMessage:function() {
			var msg = this.tabView.getSelection()[0];
			var id = [msg.id];
			webfrontend.net.CommandManager.getInstance().sendCommand("IGMBulkDeleteMsg",{ids:id,f:this.___jH.getFolder(),a:this.___jH.getSelectAll()},this);
			this.CloseTab();
			this.___jH.reloadData();
		},
		ForwardFromMessage:function() {
			var id = this.tabView.getSelection()[0].id;
			for (var i = 0; i < this.tabPages.length; i++) {
				if (this.tabPages[i].id == id) {
					this.createCompose(this.tabPages[i], 3);
					break;
				}
			}
		},
		Reply:function() {
			var id = this.tabView.getSelection()[0].id;
			for (var i = 0; i < this.tabPages.length; i++) {
				if (this.tabPages[i].id == id) {
					this.createCompose(this.tabPages[i], 1);
					break;
				}
			}
		},
		ReplyAll:function() {
			var id = this.tabView.getSelection()[0].id;
			for (var i = 0; i < this.tabPages.length; i++) {
				if (this.tabPages[i].id == id) {
					this.createCompose(this.tabPages[i], 2);
					break;
				}
			}
		},
		removeHTML:function(stext){
			stext = stext.replace(/&(lt|gt);/g, function (strMatch, p1){
				return (p1 == "lt")? "<" : ">";
			});
			return stext.replace(/<\/?[^>]+(>|$)/g, "");
		},
		getMessage:function(i) {
			webfrontend.net.CommandManager.getInstance().sendCommand("IGMGetMsg",{id:i},this,this._onMessage, i);
		},
		_onMessage:function (r,bi,bj) {
			if(r==false){return;}

			for (var i = 0; i < this.tabPages.length; i++) {
				if (this.tabPages[i].id == bj) {
					bi=webfrontend.Util.convertSpecialChars(bi);
					bi=webfrontend.gui.Util.convertBBCode(webfrontend.gui.Util.generateBBCode(bi));
					bi='<div style="word-wrap: break-word;">'+bi+'</div>';
					this.tabPages[i].Message.setValue(bi)
				}
			}
		},
		addButton:function() {
			var MailButton = new qx.ui.form.Button("Mail");
			MailButton.set({width: 50, appearance: "button-text-small", toolTipText: "Mail App"});
			MailButton.addListener("click", this.DisplayMail, this);
			qx.core.Init.getApplication().serverBar.add(MailButton, {top: 2, left: 720});
		},
		DisplayMail:function () {
			this.saveOptions();
			if (this.isVisible()) {
				this.close();
			} else {
				this.___jH.reloadData();
				this.open();
			}
		},
		clog:function(text) {
			if (this.debug) console.log(text);
		},
		ErrorReporting:function() {
			qx.event.GlobalError.setErrorHandler(this.handleError, this);
		},
		handleError:function(dp) {
			try {
				var dq = dp.toString();
				var cx = " ";
				if (dp.hasOwnProperty("fileName")) dq += cx + dp.fileName;
				if (dp.getUri != null) dq += cx + dp.getUri();
				if (dp.hasOwnProperty("lineNumber")) dq += cx + dp.lineNumber;
				if (dp.getLineNumber != null) dq += cx + dp.getLineNumber();
				if (dp.hasOwnProperty("stack")) dq += cx + dp.stack;
				dq = qx.lang.Json.stringify(dq);
				var msg = "{error:" + dq + "}";
				this.clog(msg);
			  } catch (e) {
				this.clog("Error in error handler " + e);
			  }
		}

	}	
});

	function mailapp_init() {
		mailappinit = new MailApp();
	}

	setTimeout(function(){ 
		mailapp_init(); 
	}, 5000);
}


        function checkMailQX() {
            if (typeof qx == "undefined") {
                window.setTimeout(checkMailQX, 1000);
            }
            else {
                try {
                    mailapp_main();
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
        window.setTimeout(checkMailQX, 500);
    } // end of function mail_start
    
    // inject and start script
    var script = document.createElement("script");
    script.innerHTML = "(" + mail_start.toString() + ")();";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);

})();