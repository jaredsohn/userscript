// ==UserScript==
// @name    Reddit moderation log matrix
// @namespace    reddit.com/user/LowSociety
// @description    Get a nice matrix of mod actions on reddit.
// @match    *://*.reddit.com/r/*/about/log*
// @version    1.0
// ==/UserScript==

var modLogMatrix = {

	limit : 100,
	
	after : null,
	
	subredditUrl : null,
	
	subredditModerators : null,
	subredditActions : null,
	total : 0,
	
    init : function() {
    	this.addButton();
		
		var subredditUrl = this.getSubredditUrl();
		if(subredditUrl.charAt(subredditUrl.length-1) != "/")
			subredditUrl += "/";
		this.subredditUrl = subredditUrl;
		
		if(location.hash != null && location.hash == "#matrix")
			modLogMatrix.renderMatrix();
    },
	
    addButton : function() {
     	
        var modLogLink = $("#moderation_tools ul.content .reddit-moderationlog");
        
        var link = $("<a></a>").addClass("reddit-moderationlog").wrap("<li></li>").text("moderation log matrix").attr("href","#matrix");
		
		link.click(function() { modLogMatrix.renderMatrix(); });
        
        modLogLink.parent().after(link);
    },
    
    renderMatrix : function() {
     	var siteTable = $("#siteTable");
		
		$(".drop-choices.lightdrop a").each(function() {
			$(this).attr("href", $(this).attr("href") + "#matrix");
		});
		
		this.subredditModerators = this.getSubredditModerators();
		this.subredditActions = this.getSubredditActions();
		
        siteTable.find("table").hide();
        
		// Create table
        var matrix = $("<table></table>").addClass("generic-table mod-matrix").attr("id", "mod-matrix");
        
		var header = $("<tr></tr>").wrap("<thead></thead>");
        header.append("<th></th>");
		var footer = $("<tr class=\"totals\"></tr>").wrap("<tfoot></tfoot>");
        footer.append("<td></td>");
		
		for(var subredditAction in this.subredditActions) {
			header.append("<th style=\"text-align: center\"><a class=\"modactions " + subredditAction + "\" title=\"" + this.subredditActions[subredditAction].title + "\"></a></th>");
			footer.append("<td class=\"action-" + subredditAction + "\" style=\"text-align: center; font-weight: bold;\" title=\"Total " + this.subredditActions[subredditAction].title + " actions\">0</td>");
		}
		header.append("<th style=\"text-align: center; font-weight: bold;\">Total</th>");
		footer.append("<td class=\"action-total\" style=\"text-align: center; font-weight: bold;\">0</td>");
		
		
		var body = $("<tbody></tbody");
		
		header.parent().appendTo(matrix);
		footer.parent().appendTo(matrix);
		body.appendTo(matrix);
		
		siteTable.append(matrix);
		
		for(var moderator in this.subredditModerators) {
			this.createModeratorRow(moderator);
		}
		
				
		// Replace next/prev with "Load more"
		var nextprev = $(".content .nextprev");
		if(nextprev.length == 0)
			nextprev = $("<p></p>").addClass("nextprev").appendTo($("#siteTable").parent());
		else
			nextprev.find("a").hide();
			
		var loadMore = $("<a></a>").attr("id","matrix-load-more").attr("href","#matrix").click(function() {
			modLogMatrix.getActions();
		}).appendTo(nextprev);
		
		// Load data
		this.getActions();
    },
	
	createModeratorRow : function(moderator) {
		var body = $("#mod-matrix tbody");
		var row = $("<tr></tr>").addClass("moderator-" + moderator);
			
		row.append("<td><a href=\"http://www.reddit.com/user/" + moderator + "\" title=\"" + moderator + "\">" + moderator + "</a></td>");
		for(var subredditAction in this.subredditActions) {
			row.append("<td class=\"action-" + subredditAction + "\" style=\"text-align: center\" title=\"" + this.subredditActions[subredditAction].title + " actions by " + moderator + "\">0</td>");
		}
		row.append("<td class=\"action-total\" style=\"text-align: center; font-weight: bold;\" title=\"Total actions by " + moderator + "\">0</td>");
		
		body.append(row);
	},
	
	getActions : function() {
		var requestData = {
			limit : this.limit
		};
		if(this.after != null) requestData.after = this.after;
			
		var filterType = this.getQuerystringByName("type");
			if(filterType != null) requestData.type = filterType;
		var filterMod = this.getQuerystringByName("mod");
			if(filterMod != null) requestData.mod = filterMod;
		
		$("#matrix-load-more").text("Loading...");
		$.getJSON(this.subredditUrl + "about/log.json", requestData, function(response) {
			var data = response.data;
			modLogMatrix.after = data.after
			for(var i = 0; i < data.children.length; i++) {
				var item = data.children[i].data;
				var action = item.action;
				var mod = item.mod;
				var moderator = modLogMatrix.subredditModerators[mod];
					
				if(moderator == null) {
					moderator = { total : 0 };
					modLogMatrix.subredditModerators[mod] = moderator;
					modLogMatrix.createModeratorRow(mod);
				}
				
				var actionCount = moderator[action]? moderator[action] + 1 : 1;
				
				moderator[action] = actionCount;
				moderator.total += 1;
				
				modLogMatrix.subredditActions[action].total += 1;
				modLogMatrix.total += 1;
			}
			var matrix = $("#mod-matrix");
			for(var mod in modLogMatrix.subredditModerators) {
				var moderator = modLogMatrix.subredditModerators[mod];
				
				for(var action in moderator) {
					matrix.find(".moderator-" + mod + " .action-" + action + "").text(moderator[action]);
				}
			}
			
			for(var subredditAction in modLogMatrix.subredditActions) {
				var action = modLogMatrix.subredditActions[subredditAction];
				matrix.find(".totals .action-" + subredditAction + "").text(action.total);
			}
			matrix.find(".totals .action-total").text(modLogMatrix.total);
			
			$("#matrix-load-more").text("Load " + modLogMatrix.limit + " more actions");
		});
	},
	
	getSubredditUrl : function() {
		return $("#header .hover.pagename.redditname a").attr("href");
	},
	
	getSubredditModerators : function() {
		var modItems = $(".drop-choices.lightdrop:not(.modaction-drop) a");
		
		var moderators = {};
		
		modItems.each(function() {
			var mod = $(this).text();
			if(mod == "all" || mod == "admins*")
				return;
				
			moderators[$(this).text()] = { "total" : 0 };
		});
		
		return moderators;
	},
	
	getSubredditActions : function() {
		var actionItems = $(".drop-choices.lightdrop.modaction-drop a");
		
		var actions = {};
		
		actionItems.each(function() {
			if($(this).text() == "all")
				return;
			
			var actionLink = $(this).attr("href");
			var actionCode = modLogMatrix.getQuerystringByName("type",actionLink);
			actions[actionCode] = { "title" : $(this).text(), "total" : 0, "className" : actionCode };
		});
		
		return actions;
	},
	
	getQuerystringByName : function(name, url) {
		if(url == null)
			url = location.search;
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(url);
		return results == null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
    
}
modLogMatrix.init();