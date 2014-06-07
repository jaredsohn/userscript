// ==UserScript==
// @name       ekşi booster 
// @version    1.0.1
// @description ekşi sözlük sol frame filtreleyici
// @match      https://eksisozluk.com/*
// @copyright  2013+, pouze
// ==/UserScript==
var EksiBooster = function(){

	this.defaultInputText = "filtrelenecek sözcük öbeği...";
	this.storageSeparate = "--";
	this.titleStorage = {};
	this.spamTitleStorage = [];
	this.change = true;

	this.run = function(){

		this.statu = this.getStatu();
		this.storage = this.getStorage();

		this.loadTitles();

		this.runTitleFilter();
		this.spamTitleStorage = this.getSpamTitles();

		this.loadCSS();
		this.loadGUI();
		this.setGUIListener();

		this.setListener();

	}

	this.loadTitles = function(){

		if(!this.statu) return false;

		var titlesJqueryObject = $(".topic-list.partial li");

		for(var i = 0; i < 50; i++){

			var titleDOM = titlesJqueryObject.eq(i).children("a"),
				title = titleDOM.text(),
				titleURL = titleDOM.attr("href"),
				titleURLParts,
				titleID;

			try{

				if(titleURL.search(/\?/) == -1){

					titleURLParts = titleURL.split("--");
					titleID = titleURLParts[1];

				}else{

					titleURLParts = titleURL.match(/(.*)--(.*)\?(.*)/);
					titleID = titleURLParts[2];

				}

				titleDOM.attr("data-title-id", titleID);
				this.titleStorage[titleID] = title;

			}catch(e){}

		}

	}

	this.getSpamTitles = function(){

		var storage = localStorage["ebSpamTitles"];

		return (storage) ? localStorage["ebSpamTitles"].split(",") : [];

	}	

	this.getStatu = function(){

		if(!localStorage["eb-statu"]) localStorage["eb-statu"] = "on";

		return (localStorage["eb-statu"] == "on") ? true : false;

	}

	this.getStorage = function(){

		return (localStorage["eb-storage"]) ? localStorage["eb-storage"].split(this.storageSeparate).sort() : [];

	}

	this.addToStorage = function(value){

		this.storage.push(value);

	}

	this.removeFromStorage = function(value){

		var indis = this.storage.indexOf(value);

		if(indis > -1) this.storage.splice(indis, 1);

	}

	this.updateStorage = function(){

		var storageString = this.storage.join(this.storageSeparate);

		localStorage["eb-storage"] = storageString;

	}

	this.runTitleFilter = function(){

		if(!this.statu) return false;

		var titlesJqueryObject = $(".topic-list.partial li");

		titlesJqueryObject.removeAttr("style");

		for(var i = 0; i < 50; i++){

			var titleDOM = titlesJqueryObject.eq(i).children("a"),
				title = titleDOM.text(),
				titleID = titleDOM.attr("data-title-id");

			for(var x in this.storage){

				var filter = this.storage[x],
					filterPrefix = filter.substring(0, 1);

				if(filterPrefix == "*"){

					filter = filter.substring(1);

					if(title.split(" ").indexOf(filter) > -1){

						this.hideTitle(titleID);
						break;

					}

				}else{

					if(title.match(new RegExp(filter))){

						this.hideTitle(titleID);
						break;

					}

				}

			}

		}
		
	}

	this.hideTitle = function(titleID){

		var titleDOM = $(".topic-list.partial li a[data-title-id="+ titleID +"]");

		titleDOM.parent("li").attr("style", "border-top: 1px dotted; border-bottom: 1px dotted; background-color: rgb(236, 255, 139); display: none;");

	}

	this.appendWordsToGUI = function(){

		$("#eb-words").empty();

		for(var i in this.storage){

			this.appendWordToGUI(this.storage[i]);

		}

		this.change = false;

	}
	
	this.appendWordToGUI = function(value){

		$("#eb-words").append('<div id="eb-word" style="background-color: #ADADAD;padding: 2px 5px;border-radius: 3px;float: left;font-size: 11px;cursor: pointer;margin-right: 8px;margin-bottom: 8px;"><a href="#" style="margin-right: 3px;color: #000;font-weight: bold;">x</a><span>'+ value +'</span></div>');

	}

	this.appendCheckboxToGUI = function(){

		if($("#eb-checkbox")) $("#eb-checkbox").remove();

		var inputAttribute = (this.statu) ? "checked" : "";

		$("#partial-index h2").append('<input type="checkbox" title="ekşi booster" id="eb-checkbox" style="position: relative; margin-top: 10px" '+ inputAttribute +' />');

	}

	this.loadCSS = function(custom){

		var CSS = "#eb-word-input {outline: none; box-shadow: none; border: none;}";

		if(custom) CSS += custom;

		$("body").prepend('<style type="text/css">'+ CSS +'</style>');

	}

	this.loadGUI = function(){

		this.appendCheckboxToGUI();

		$("#container").prepend('<div id="eb-main" style="position: absolute; width: 320px; z-index: 888; right: 0; margin-top: -10px;"> <div id="eb-content" style="display: none;"> <div id="eb-words" style="background-color: #616161; overflow: hidden; padding: 20px;"> </div> <div id="eb-input-frame" style="float: left;background-color: #ffc600;width: 320px;border-top: 3px solid #D8A907;outline: none;padding: 2px 10px;"><input type="text" id="eb-word-input" value="'+ this.defaultInputText +'" style="background: none;font-size: 12px;"></div> </div> <div id="eb-toggle" data-statu="off" style="background-color: #ffc600;float: right;padding: 3px 6px;cursor: pointer;font-weight: bold;font-size: 11px;">+</div></div>');

	}

	this.toggleGUI = function(type){

		if($("#eb-content").css("display") == "block"){

			$("#eb-content").hide();

		}else{

			if(!type) return false;

			if(this.change) this.appendWordsToGUI();

			$("#eb-content").show();

			$("#eb-word-input").val(this.defaultInputText).focus();

		}

	}

	this.setGUIListener = function(){

		var that = this;

		$("body").on("click", "#eb-toggle", function(){

			that.toggleGUI(true);

		});

		$("body").on("keydown", "#eb-word-input", function(e){

			if(e.keyCode == 13){

				var value = $.trim($("#eb-word-input").val());

				if(that.storage.indexOf(value) == -1 && value.length > 0){

					that.change = true;

					that.addToStorage(value);
					that.updateStorage();

					that.appendWordToGUI(value);

					that.runTitleFilter();

				}

				$("#eb-word-input").val("").focus();

			}

		});

		$("body").on("click", "#eb-word", function(){

			that.change = true;

			var value = $(this).children("span").text();

			that.removeFromStorage(value);
			that.updateStorage();

			$(this).remove();

			that.runTitleFilter();

		});

		$("body").on("click", "#eb-checkbox", function(){

			if(that.statu){

				$(".topic-list.partial li").css("display", "block");

				that.statu = false;
				localStorage["eb-statu"] = "off";

			}else{

				that.statu = true;
				localStorage["eb-statu"] = "on";

				that.loadTitles();
				that.runTitleFilter();

			}

		});

		$("#eb-input-frame").on("click", function(){

			$("#eb-word-input").focus();

		});

	}

	this.setListener = function(){

		var that = this;

		$(document).ajaxStop(function(){

			that.appendCheckboxToGUI();
			that.loadTitles();
			that.runTitleFilter();

		});

		$("body").on("keydown", function(e){

			if(e.keyCode == 27){

				that.toggleGUI(false);

			}

		});

	}

}

var eb = new EksiBooster();
eb.run();
