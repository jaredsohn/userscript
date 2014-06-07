// JavaScript Document
// ==UserScript==
// @name           Ikariam Cultural Goods Finder
// @namespace      http://userscripts.org/scripts/show/75963
// @autor          Fioleta (http://userscripts.org/users/fioleta)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/75963
// @description    Ikariam Cultural Goods Finder
// @include        http://s*.*.ikariam.*/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
// @version        1.0.3
//
// @history        1.0.1 initial release
// @history        1.0.2 Fixed user free CG, when sending to server
// @history        1.0.3 Fixed some bugs
// ==/UserScript==


// Wrapper for GM_xmlhttpRequest
function GM_XHR() {
    this.type = null;
    this.url = null;
    this.async = null;
    this.username = null;
    this.password = null;
    this.status = null;
    this.headers = {};
    this.readyState = null;

    this.open = function(type, url, async, username, password) {
        this.type = type ? type : null;
        this.url = url ? url : null;
        this.async = async ? async : null;
        this.username = username ? username : null;
        this.password = password ? password : null;
        this.readyState = 1;
    };

    this.setRequestHeader = function(name, value) {
        this.headers[name] = value;
    };

    this.abort = function() {
        this.readyState = 0;
    };

    this.getResponseHeader = function(name) {
        return this.headers[name];
    };

    this.send = function(data) {
        this.data = data;
        var that = this;
        GM_xmlhttpRequest({
            method: this.type,
            url: this.url,
            headers: this.headers,
            data: this.data,
            onload: function(rsp) {
                // Populate wrapper object with returned data
                for (k in rsp) {
                    that[k] = rsp[k];
                }
            },
            onerror: function(rsp) {
                for (k in rsp) {
                    that[k] = rsp[k];
                }
            },
            onreadystatechange: function(rsp) {
                for (k in rsp) {
                    that[k] = rsp[k];
                }
            }
        });
    };
};

$.ajaxSetup({
    xhr: function(){return new GM_XHR;}
});


GoodsHelper = {
	config:{
		SERVER:"",
		GAME_VERSION:"",
		VERSION:"1.0.3",
		userID:"",
		username:"",
		capital:"",
		capitalID:"",
		capitalIslandID:"",
		freeGoods: 0
	},
	targets:{},
	spies:{},
	init:function() {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g,"");
		}
		
		var pr = new Object();
		pr.number=GoodsHelper.config.VERSION;
		pr.script="cg_finder";
		$.post('http://www.fioleta.com/check_update.html', pr, function(data) {
		  if (data.update=="yes") {
			  $('li.notes').html('<a href="http://www.fioleta.com/" title="Cultural Goods finder" target="_blank"><span class="textLabel" id="fioleta_CG">Update CG finder</span></a>');
		  } else {

				GoodsHelper.config.SERVER=GoodsHelper.getServerWorld() + '.' + GoodsHelper.getServerDomain();
				GoodsHelper.config.GAME_VERSION=$("li.version span").text().substr(0, 7);
				$('li.notes').html('<a href="javascript: void(0);" title="Cultural Goods finder"><span class="textLabel" id="fioleta_CG">Cultural Goods finder (<span id="free_CG">0</span>)</span></a>');
				$('#fioleta_CG').click(function() {
					GoodsHelper.getUserInfo();
				});
				$("body").append('<script type="text/javascript">function goodsFinder() { var noteLayer = Dom.get("avatarNotes"); if (noteLayer.innerHTML != "") {  noteLayer.innerHTML = ""; noteLayer.style.display = "none";}} </script>');
				$("body").append('<script type="text/javascript">function updateGoodsLayer(responseText) {    var noteLayer = Dom.get("avatarNotes");    noteLayer.innerHTML = responseText;            var panel = new YAHOO.widget.Panel("resizablepanel", {                draggable: true,                width: "710px",                 height: "380px",                 autofillheight: "body",                 constraintoviewport:true,                context: ["tl", "bl"]            });            panel.render();            var resize = new YAHOO.util.Resize("resizablepanel", {                handles: ["br"],                autoRatio: false,                minWidth: 220,                minHeight: 110,                status: false             });            resize.on("startResize", function(args) {               if (this.cfg.getProperty("constraintoviewport")) {                    var D = YAHOO.util.Dom;                    var clientRegion = D.getClientRegion();                    var elRegion = D.getRegion(this.element);                    resize.set("maxWidth", clientRegion.right - elRegion.left - YAHOO.widget.Overlay.VIEWPORT_OFFSET);                     resize.set("maxHeight", clientRegion.bottom - elRegion.top - YAHOO.widget.Overlay.VIEWPORT_OFFSET);                } else {                    resize.set("maxWidth", null);                    resize.set("maxHeight", null);                }            }, panel, true);            resize.on("resize", function(args) {                                var panelHeight = args.height;                this.cfg.setProperty("height", panelHeight + "px");                Dom.get("message").style.height = (panelHeight-75) + "px";            }, panel, true);                                   Dom.get("resizablepanel_c").style.top = getCookie("ikariam_notes_y", "80px");            Dom.get("resizablepanel_c").style.left = getCookie("ikariam_notes_x", "375px");            Dom.get("message").style.height = (parseInt(getCookie("ikariam_notes_height", "320px")) - 75 ) + "px"; }</script>');
				GoodsHelper.getfreeCG();	
		  }
		}, "json");
	},
	GoodsDisplay: function() {
		$.get("http://www.fioleta.com/getCGlist.html?userID="+ GoodsHelper.config.userID +"&server=" + GoodsHelper.config.SERVER, function(data2){
			var text='<div class="yui-skin-sam" style="z-index: 9999999999; position: absolute;"><div id="examplecontainer" ><div id="resizablepanel" style="height: 500px;"><div class="hd"><div class="div1"><div class="div2"><p>Cultural Goods                <span><a href="javascript:goodsFinder()"><img src="skin/layout/notes_close.gif"/></a></span></p>                </div></div></div>                <div class="bd"><div class="rightborder"><div id="messageBox"><span id="message">' + data2  + '</span></div> </div></div> <div class="ft"><div class="bottom"><span class="chars" id="chars"></span> script by <a href="http://www.fioleta.com" target="_blank">Fioleta</a>\'2010  <span id="send_data">Please WAIT! Do not close windows!</span></div> </div> <center><div class="button2"><a href="javascript:goodsFinder()" class="button notice">Ok</a></div></center> </div> </div> </div>';
			unsafeWindow.updateGoodsLayer(text);
			$("#avatarNotes").show();
		});		
	},
	getServerWorld: function () {
		const hostMatch        = /(s\d+)(\.([a-z]+))?\.ikariam(\.[a-z]+)?\.([a-z]+)/i.exec( top.location.host );
		return (hostMatch?hostMatch[1]:false) || 's?';
	},
	getServerDomain: function () {
		const hostMatch        = /(s\d+)(\.([a-z]+))?\.ikariam(\.[a-z]+)?\.([a-z]+)/i.exec( top.location.host );
		return (hostMatch?(hostMatch[3] || hostMatch[5]):false) || 'org';
	},
	getUserInfo: function () {
		GoodsHelper.GoodsDisplay();
		$.get("http://" + GoodsHelper.config.SERVER + ".ikariam.com/index.php?view=options", function(data){
			const user_debug = /<th>Player-ID:<\/th>\s*<td>(.*)<\/td>/i.exec(data);
			const username_debug = /.*name="name".*/i.exec(data);
			const username_ok=/value=["|'](.*)["|']/i.exec(username_debug);
			var userID=parseInt(user_debug[1].trim());
			var username=username_ok[1].trim();
			if (userID>0)
			{
				GoodsHelper.config.userID=userID;
				GoodsHelper.config.username=username;
				GoodsHelper.config.capitalID=$("#citySelect option:first").attr("value");
				var cityName=$("#citySelect option:first").text();
				const convert_name=/[[0-9:\] ]+(.*)/i.exec(cityName.trim());
				GoodsHelper.config.capital=convert_name[1];
				$.get("http://" + GoodsHelper.config.SERVER + ".ikariam.com/index.php?view=transport&destinationCityId=" + GoodsHelper.config.capitalID, function(data){
					const islandID_temp = /(.*name=["']id["'].*)/i.exec(data);
					const islandID = /value=["'](\d*)['"]/i.exec(islandID_temp[1].trim());
					GoodsHelper.config.capitalIslandID=islandID[1];
					GoodsHelper.getUserFreeGoods();
				}); 
			} else {
				alert("Can't run CG helper!");
				return false;
			}
		}); 
	},
	getUserFreeGoods: function () {
		var countCities=$("#citySelect option").size();
		var temp_count = 0;
		GoodsHelper.config.freeGoods=0;
		$("#citySelect option").each(function(i,d){
			$.get("http://" + GoodsHelper.config.SERVER + ".ikariam.com/index.php?view=city&id="+d.value, function(data){
				const position = /<li id="position(\d{1,2})" class="museum">/i.exec(data);
				if (position!=null)
				{
					$.get("http://" + GoodsHelper.config.SERVER + ".ikariam.com/index.php?view=museum&id="+d.value+"&position="+position[1], function(data2){
						const goods = /<span id="val_culturalGoodsDeposit"><\/span>(\d*)\/(\d*)<\/span>/i.exec(data2);
						temp_count++;
						if (position!=null)
						{
							var temp_freeCG=parseInt(goods[2]) - parseInt(goods[1]);
							if (parseInt(temp_freeCG)>0)
							{
								GoodsHelper.config.freeGoods=GoodsHelper.config.freeGoods+parseInt(temp_freeCG);
							} 
						};
						$("#send_data").text("Sending: "+temp_count);
						if ( countCities==temp_count )
						{
							GoodsHelper.update_CG();
							$("#send_data").text("Writing data");
						}
					}); 
				} else {
					temp_count++;
					$("#send_data").text("Sending: "+temp_count);
				}
			}); 
		});
	},
	update_CG: function () {
		var pr = new Object();
		pr.userID=GoodsHelper.config.userID;
		pr.freeCG=GoodsHelper.config.freeGoods;
		pr.server=GoodsHelper.config.SERVER;
		pr.username=GoodsHelper.config.username;
		pr.capital=GoodsHelper.config.capital;
		pr.capitalID=GoodsHelper.config.capitalID;
		pr.islandID=GoodsHelper.config.capitalIslandID;

		$.post('http://www.fioleta.com/updateCG.html', pr, function(data) {
		  if (data.issave!="yes") {
			  alert("error on save CG status!");
			  return;
		  } 
		  $("#send_data").text("Your data is saved");
		  GoodsHelper.config.freeGoods=0;
		}, "json");
	},
	getfreeCG: function () {
		var pr = new Object();
		pr.server=GoodsHelper.config.SERVER;
		$.post('http://www.fioleta.com/getfreeCG.html', pr, function(data) {
		  $("#free_CG").text(data.CG);
		}, "json");
	},
	check_for_update: function() {
		
	} 
}

GoodsHelper.init();


// END FILE