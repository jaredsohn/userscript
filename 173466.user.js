// ==UserScript==
// @name		Powder Toy enhancements
// @namespace   http://powdertoythings.co.uk/tptenhance
// @description Fix and improve some things (mainly moderation tools) on powdertoy.co.uk
// @include	 	http*://powdertoy.co.uk/*
// @version		2.27
// @grant 		none
// @updateURL   https://userscripts.org/scripts/source/173466.meta.js
// @downloadURL   https://userscripts.org/scripts/source/173466.user.js
// ==/UserScript==

// contentEval from http://userscripts.org/scripts/source/100842.user.js :
function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}



// Fix silly way of checking whether facebook stuff is loaded
// If facebook is blocked, then the javascript on powdertoy.co.uk errors and does not execute important stuff like callbacks for showing tag info popups
contentEval('if (typeof window.FB == "undefined") window.FB = false;');

contentEval(function(){
	if (typeof $ != "undefined")
	{
	window.tptenhance = {
		sessionKey:"",
		deletingHtml:'<div class="pull-right label label-info"><i class="icon-refresh icon-white"></i> <strong>Deleting...</strong></div>',
		dummyUrl:"/Themes/Next/Javascript/Browse.View.js",// a random page to use for redirects, which will hopefully load faster than the default redirect (e.g. to a user moderation page) in ajax requests
		monthNamesShort:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
		getSessionKey:function()
		{
			if (tptenhance.sessionKey=="")
			{
				$('.main-menu').find('a').each(function(){
					var url = this.href;
					var matches = url.match(/Logout.html\?Key=[A-Za-z0-9]+/)
					if (matches)
					{
						// Logout link found, extract key
						tptenhance.sessionKey = matches[0].split("=")[1];
					}
				});
			}
			return tptenhance.sessionKey;
		},
		isMod:function()
		{
			if (typeof tptenhance.isModCache!="undefined")
				return tptenhance.isModCache;
			tptenhance.isModCache = false;
			$(".main-menu .dropdown a.dropdown-toggle").each(function(){
				if ($(this).text().indexOf("Admin")!=-1)
					tptenhance.isModCache = true;
			});
			return tptenhance.isModCache;
		},
		getCurrentGroupId:function()
		{
			return +($(".Pageheader a:eq(1)").attr("href").match(/[0-9]+/)[0]);
		},
		disableTagUrl:function(tag)
		{
			return "/Browse/Tags.html?Delete="+encodeURIComponent(tag)+"&Key="+encodeURIComponent(tptenhance.getSessionKey());
		},
		removeTagUrl:function(tag, saveId)
		{
			return "/Browse/EditTag.json?Op=delete&ID="+encodeURIComponent(saveId)+"&Tag="+encodeURIComponent(tag)+"&Key="+encodeURIComponent(tptenhance.getSessionKey());
		},
		searchTagUrl:function(search)
		{
			return "/Browse/Tags.html?Search_Query="+encodeURIComponent(search);
		},
		popoverSelectedTag:false,
		popoverElement:false,
		updatePopoverPosition:function()
		{
			var element = tptenhance.popoverElement;
			var popOver = $(".popover");
			if (!popOver.length || !element) return;
			var left = element.offset().left - (popOver.width()/2) + (element.width()/2);
			if (left<0) left = 0;
			popOver.css("left", left);
			popOver.css("top", element.offset().top + element.height());
		},
		removePopover:function()
		{
			tptenhance.popoverElement = false;
			tptenhance.popoverSelectedTag = false;
			$(".popover").remove();
		},
		createTagsPopover:function(element)
		{
			tptenhance.removePopover();
			tptenhance.popoverElement = element;
			var popOver = $('<div class="popover fade bottom in" style="display: block;"></div>');
			popOver.appendTo(document.body);
			var arrow = $('<div class="arrow"></div>').appendTo(popOver);
			var inner = $('<div class="popover-inner"></div>').appendTo(popOver);
			var title = $('<h3 class="popover-title">Tag Info</h3>').appendTo(inner);
			var content = $('<div class="popover-content">Loading...</div>').appendTo(inner);
			tptenhance.updatePopoverPosition();
			return content;
		},
		tagsTooltip:function(element, tag){
			// Tag info for tags in multiple places (e.g. /Browse/Tags.html and moderation page

			// If clicking on the tag that is already open, close the info popup
			if (tag==tptenhance.popoverSelectedTag)
			{
				tptenhance.removePopover();
				return;
			}

			var filterUser = (window.location.toString().indexOf("/User/Moderation.html")!=-1);
			var content = tptenhance.createTagsPopover(element);
			tptenhance.popoverSelectedTag = tag;
			var getLocation = "/Browse/Tag.xhtml?Tag="+encodeURIComponent(tag);
			$.get(getLocation, function(data){
				content.html(data);
				var separator = false;
				var currentUserName = $('.SubmenuTitle').text();
				// Go through the tags in the popup and add Remove links
				content.find('div.TagInfo').each(function(){
					var tagInfo = $(this);
					var saveId = $(tagInfo.find("a")[0]).text();
					var userName = $(tagInfo.find("a")[1]).text();
					var delButton = $('<a class="pull-right" title="Remove tag from this save">Remove</a>');
					delButton.attr('href',tptenhance.removeTagUrl(tag,saveId));
					delButton.appendTo($(this));
					delButton.on('click', tptenhance.tags.removeLinkClick);
					// If on a user moderation page, show tags from other users at the end
					if (filterUser && userName!=currentUserName)
					{
						if (!separator) separator = $('<hr>').appendTo(content);
						$(this).appendTo(content);
					}
				});
			}, "html");
		},
		tagTooltip:function(element, tag, saveId){
			// Tag info for a tag in a single place, e.g. viewing a save

			// If clicking on the tag that is already open, close the info popup
			if (tag==tptenhance.popoverSelectedTag)
			{
				tptenhance.removePopover();
				return;
			}

			var content = tptenhance.createTagsPopover(element);
			tptenhance.popoverSelectedTag = tag;
			var getLocation = "/Browse/Tag.xhtml?Tag="+encodeURIComponent(tag)+"&SaveID="+encodeURIComponent(saveId);
			$.get(getLocation, function(data){
				content.html(data);
				var clickFunc = function(e){
					e.preventDefault();
					var url = this.href;
					var that = $(this);
					if (that.text()=="Disable")
						that.replaceWith('<div class="pull-right label label-info" style="margin-right:10px;"><i class="icon-refresh icon-white"></i> <strong>Disabling...</strong></div>');
					else
						that.replaceWith(tptenhance.deletingHtml);
					$.get(url,function(){
						element.remove();// remove tag text
						if (tptenhance.popoverSelectedTag==tag)
							tptenhance.removePopover();// remove tag info popup
						tptenhance.updatePopoverPosition();
					});
				};
				content.find('div.TagInfo').each(function(){
					var delButton = $('<a class="pull-right" title="Remove tag from this save">Remove</a>');
					delButton.attr('href',tptenhance.removeTagUrl(tag,saveId));
					delButton.appendTo($(this));
					delButton.on('click', clickFunc);
					var disableButton = $('<a class="pull-right" title="Disable tag">Disable</a>');
					disableButton.attr('href',tptenhance.disableTagUrl(tag)+"&Redirect="+encodeURIComponent(location.pathname+location.search));
					disableButton.css('margin','0 10px');
					disableButton.appendTo($(this));
					disableButton.on('click', clickFunc);
					var showMore = $('<div style="text-align:right;clear:right;"><a>Show uses on other saves</a></div>');
					showMore.appendTo($(this));
					showMore = showMore.find("a");
					showMore.attr('href',tptenhance.searchTagUrl(tag));
					showMore.on('click', function(e){
						e.preventDefault();
						tptenhance.removePopover();
						tptenhance.tagsTooltip(element, tag);
					});
					
				});
			}, "html");
		},
		LoadForumBlocks:function(){
			tptenhance.oldLoadForumBlocks();
			$(".Actions > a").each(function(){
				if (this.href.indexOf("/UnhidePost.html")!=-1)
				{
					$(this).click(function(e){
						e.preventDefault();
						$.get(this.href);
						var newElement = $(this).parents('.Comment').children('.Message');
						postID = newElement.attr('id').split("-")[1];
						$.get("/Discussions/Thread/Post.json?Post="+postID, function(data){
							location.reload(true);
							// TODO: reload like http://powdertoy.co.uk/Applications/Application.Discussions/Javascript/Thread.js $(".Pagination a") click does
						});
					});
				}
			});
		},
		updateSaveComments:function(url, from){
			$("#ActionSpinner").fadeIn("fast");
			tptenhance.commentPageRequestType = from;
			// url = url.replace(/\.html\?/, ".json?Mode=MessagesOnly&");
			tptenhance.commentPageRequest = $.get(url, function(data){
				data = $(data);
				$("#ActionSpinner").fadeOut("fast");
				tptenhance.commentPageRequest = false;
				//$(".Pagination").html(data.Pagination);
				$(".Pagination").replaceWith(data.find(".Pagination"));
				//$("ul.MessageList").empty();
				//$("ul.MessageList").html(data.Comments);
				$("ul.MessageList").replaceWith(data.find("ul.MessageList"));
				tptenhance.attachSaveCommentHandlers();
			}, "html");//"json"
		},
		commentPageRequest:false,
		commentPageRequestType:false,
		commentDeleteWaiting:0,
		attachSaveCommentHandlers:function(){
			var clickFn = function(e){
				e.preventDefault();
				var url = this.href+"&Redirect="+encodeURIComponent(tptenhance.dummyUrl);
				var info = $(tptenhance.deletingHtml);
				$(this).parents('.Actions').replaceWith(info);
				tptenhance.commentDeleteWaiting++;
				if (tptenhance.commentPageRequest && tptenhance.commentPageRequestType=="deleteComment")
				{
					tptenhance.commentPageRequest.abort();
					tptenhance.commentPageRequest = false;
				}
				$.get(url, function(){
					info.replaceWith('<div class="pull-right label label-success"><i class="icon-ok icon-white"></i> <strong>Deleted</strong>');
					tptenhance.commentDeleteWaiting--;
					if (tptenhance.commentDeleteWaiting<=0)
					{
						tptenhance.updateSaveComments(window.lastComments, "deleteComment");
					}
				});
				return false;
			}
			$(".Actions a").each(function(){
				if (this.href.indexOf('DeleteComment=')!=-1)
					$(this).click(clickFn);
			});
			$(".Pagination a").die('click');
			$(".Pagination a").on('click', function(e){
				e.preventDefault();
				window.lastComments = this.href;
				if (tptenhance.commentPageRequest)
					tptenhance.commentPageRequest.abort();
				tptenhance.updateSaveComments(window.lastComments, "pagination");
			});
		},
		tags:
		{
			removeLinkClick:function(e){
				e.preventDefault();
				var tagInfo = $(this).parents('div.TagInfo');
				var url = this.href;
				var info = $(tptenhance.deletingHtml);
				$(this).replaceWith(info);
				$.get(url, function(){
					info.replaceWith('<div class="pull-right label label-success"><i class="icon-ok icon-white"></i> <strong>Deleted</strong></div>');
				});
			},
			disableButtonClick:function(e){
				e.preventDefault();
				var tag = $(this).parents('.Tag').find(".TagText").text();
				if (tptenhance.popoverSelectedTag==tag)
					tptenhance.removePopover();
				var tagElem = $(this).parents('.Tag');
				var url = this.href.replace(/Redirect=[^&]*/, 'Redirect='+encodeURIComponent(tptenhance.dummyUrl));
				$(this).parent().append(' <span class="LoadingIcon"><i class="icon-refresh"></i></span>');
				$(this).css('display','none');
				$.get(url, function()
				{
					tptenhance.tags.showDisabled(tagElem);
				});
			},
			enableButtonClick:function(e){
				e.preventDefault();
				var tagElem = $(this).parents('.Tag');
				var url = this.href.replace(/Redirect=[^&]*/, 'Redirect='+encodeURIComponent(tptenhance.dummyUrl));
				$(this).parent().append(' <span class="LoadingIcon"><i class="icon-refresh"></i></span>');
				$(this).css('display','none');
				$.get(url, function()
				{
					tptenhance.tags.showEnabled(tagElem);
				});
			},
			attachHandlers:function(baseElem){
				baseElem.find('.UnDelButton').off('click').on('click', tptenhance.tags.enableButtonClick);
				baseElem.find('.DelButton').off('click').on('click', tptenhance.tags.disableButtonClick).attr('title', 'Disable');
			},
			// Change the tag to appear as disabled or enabled
			showDisabled:function(tagElem){
				tagElem.addClass('Restricted');
				tagElem.find('.icon-refresh').remove();
				var btn = tagElem.find('.DelButton');
				btn.removeClass('DelButton').addClass('UnDelButton').css('display','inline');
				btn.attr('href', btn.attr('href').replace('/Browse/Tags.html?Delete=','/Browse/Tags.html?UnDelete='));
				btn.attr('title', 'Disable');
				tptenhance.tags.attachHandlers(tagElem);
			},
			showEnabled:function(tagElem){
				tagElem.removeClass('Restricted');
				tagElem.find('.icon-refresh').remove();
				var btn = tagElem.find('.UnDelButton');
				btn.removeClass('UnDelButton').addClass('DelButton').css('display','inline');
				btn.attr('href', btn.attr('href').replace('/Browse/Tags.html?UnDelete=','/Browse/Tags.html?Delete='));
				btn.attr('title', 'Approve');
				tptenhance.tags.attachHandlers(tagElem);
			}
		},
		makeSaveLinks:function(messages)
		{
			messages.each(function(){
				var msg = $(this);
				var text = msg.text();
				msg.empty();
				var regex = /\b(?:(?:id|save|saveid)[^\d\w\s]?)?[0-9]+\b/gi;
				var result, prevLastIndex = 0;
				regex.lastIndex = 0;
				while (result=regex.exec(text))
				{
					// Append the text before the match
					msg.append($('<span></span>').text(text.slice(prevLastIndex, result.index)));
					// Turn the match into a link
					var link = $('<a></a>');
					link.attr('href', tptenhance.saves.viewUrl(result[0].match(/[0-9]+/)[0]));
					link.text(result[0]);
					msg.append(link);
					// store the position of the end of the match
					prevLastIndex = regex.lastIndex;
				}
				// Append last plain text part
				msg.append($('<span></span>').text(text.slice(prevLastIndex)));
			});
		},
		forums:{
			threadUrl:function(id)
			{
				return "/Discussions/Thread/View.html?Thread="+encodeURIComponent(id);
			}
		},
		reports:{
			viewReportUrl:function(id)
			{
				return "/Reports/View.html?ID="+encodeURIComponent(id);
			},
			markAsReadUrl:function(id)
			{
				return "/Reports.html?Read="+encodeURIComponent(id);
			},
			unpublishUrl:function(id)
			{
				return "/Reports.html?Unpublish="+encodeURIComponent(id);
			},
			/* current 
			 * <span class="badge badge-info">16</span>


<li style="background-color:rgb(240, 240, 240);border-top-color: rgb(250, 250, 250);">	<a href="/Browse/View.html?ID=355967" target="_blank">		<img src="/GetScreenshot.util?ID=355967&Size=small"/>	</a>	<span style="float: right; margin: 5px;">		<a href="/Reports.html?Unpublish=355967" class="ButtonLink">Unpublish</a>		<a href="/Reports.html?Read=355967" class="ButtonLink">Mark as Read</a>	</span>	<div class="MainInfo" style="width: 355px; display: block; padding: 2px;">		<span class="ReportsCount">1</span>		<span class="SaveName">			<a href="/Reports/View.html?ID=355967" target="_blank">				Light Splitter 2			</a>		</span> by		<span class="SaveAuthor">WinstonsDomain</span>	</div>	<div class="Clear"></div></li></ul>
*/
			parseReportsHtml:function(html)
			{
				var reports = [];
				$(html).find("li").each(function(){reports.push(tptenhance.reports.parseReportsHtmlSingle($(this)));});
				/*reports.push({SaveId:17758,UnreadReportCount:2,SaveName:"8x6 line text display",Username:"jacksonmj"});
				reports.push({SaveId:2198,UnreadReportCount:1,SaveName:"Destroyable city 5 (wth metro)",Username:"dima-gord"});*/
				return reports;
			},
			parseReportsHtmlSingle:function(html)
			{
				html = $(html);
				return {
					SaveId: +html.find("img").attr("src").match(/[0-9]+/)[0],
					UnreadReportCount: +html.find(".ReportsCount").text(),
					SaveName: html.find(".SaveName a").text().trim(),
					Username: html.find(".SaveAuthor").text().trim()
				};
			},
			parseViewReport:function(html)
			{
				var reportMsgs = [];
				$(html).find(".Post .Comment").each(function(){
					var reasonHtml = $(this);
					reportMsgs.push({
						UserAvatar:reasonHtml.find(".Meta .Author img").attr("src"),
						UserID:reasonHtml.find(".Meta .Author a:last-child").attr("href").match(/ID=[0-9]+/)[0].split("=")[1],
						UserName:reasonHtml.find(".Meta .Author a:last-child").text().trim(),
						ReportDate:reasonHtml.find(".Meta .Date").text().trim(), 
						Message:reasonHtml.find(".Message").text().trim()
					});
				});
				return reportMsgs;
			},
			changeButtons:function()
			{
				$(".ButtonLink").addClass("btn btn-mini").each(function(){
					var btn = $(this);
					var url = btn.attr('href');
					btn.attr('title', btn.text());
					if (url.indexOf('Unpublish=')!=-1)
					{
						btn.addClass("btn-warning").html('<i class="icon-lock icon-white"></i> Unpublish');
					}
					if (url.indexOf('Read=')!=-1)
					{
						btn.addClass("btn-success").html('<i class="icon-ok icon-white"></i> Mark as read');
					}
				});
			}
		},
		saves:{
			smallerImgUrl:function(id) // 153px × 96px
			{
				return "/GetScreenshot.util?ID="+encodeURIComponent(id)+"&Size=small";
			},
			smallImgUrl:function(id) // 204px × 128px
			{
				return "http://static.powdertoy.co.uk/"+encodeURIComponent(id)+"_small.png";
			},
			fullImgUrl:function(id) // 612px × 384px
			{
				return "http://static.powdertoy.co.uk/"+encodeURIComponent(id)+".png";
			},
			viewUrl:function(id)
			{
				return "/Browse/View.html?ID="+encodeURIComponent(id);
			},
			infoJsonUrl:function(id)
			{
				return "/Browse/View.json?ID="+encodeURIComponent(id);
			},
			infoJsonUrlPTT:function(id)
			{
				return "http://powdertoythings.co.uk/Powder/Saves/View.json?ID="+encodeURIComponent(id);
			},
			infoDetailedJsonUrlPTT:function(id)
			{
				return "http://powdertoythings.co.uk/Powder/Saves/ViewDetailed.json?ID="+encodeURIComponent(id);
			},
			voteMapUrl:function(id)
			{
				return "/IPTools.html?Save="+encodeURIComponent(id);
			},
			voteDataJsonUrl:function(id)
			{
				return "/IPTools/SaveVoteData.json?ID="+encodeURIComponent(id);
			},
			showVotes:function()
			{
				// some of this function is copied from the JS on the website

				var m = [40, 40, 20, 20],
				    w = 612 - m[1] - m[3],
				    h = 300 - m[0] - m[2],
				    parse = d3.time.format("%Y-%m-%d").parse,
				    format = d3.time.format("%Y");
				
				// Scales. Note the inverted domain for the y-scale: bigger is up!
				var x = d3.time.scale().range([0, w]),
				    y = d3.scale.linear().range([h, 0]),
				    xAxis = d3.svg.axis().scale(x).orient("bottom").tickSize(-h, 0).tickPadding(6),
				    yAxis = d3.svg.axis().scale(y).orient("right").tickSize(-w).tickPadding(6);
				
				// An area generator.
				var area = d3.svg.area()
				    .interpolate("step-after")
				    .x(function(d) { return x(d.date); })
				    .y0(function(d) { return y((d.value<0)?d.value:0); })
				    .y1(function(d) { return y((d.value>0)?d.value:0); });
				
				// A line generator.
				var line = d3.svg.line()
				    .interpolate("step-after")
				    .x(function(d) { return x(d.date); })
				    .y(function(d) { return y(d.value); });
				
				var svg = d3.select("#VoteGraph").append("svg:svg")
				    .attr("width", w + m[1] + m[3])
				    .attr("height", h + m[0] + m[2])
				  .append("svg:g")
				    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
				
				var gradient = svg.append("svg:defs").append("svg:linearGradient")
				    .attr("id", "gradient")
				    .attr("x2", "0%")
				    .attr("y2", "100%");
				
				gradient.append("svg:stop")
				    .attr("offset", "0%")
				    .attr("stop-color", "#9ecae1")
				    .attr("stop-opacity", .5);
				
				gradient.append("svg:stop")
				    .attr("offset", "100%")
				    .attr("stop-color", "#6baed6")
				    .attr("stop-opacity", 1);
				
				svg.append("svg:clipPath")
				    .attr("id", "clip")
				  .append("svg:rect")
				    .attr("x", x(0))
				    .attr("y", y(1))
				    .attr("width", x(1) - x(0))
				    .attr("height", y(0) - y(1));
				
				svg.append("svg:g")
				    .attr("class", "y axis")
				    .attr("transform", "translate(" + w + ",0)");
				
				svg.append("svg:path")
				    .attr("class", "area")
				    .attr("clip-path", "url(#clip)")
				    .style("fill", "url(#gradient)");
				
				svg.append("svg:g")
				    .attr("class", "x axis")
				    .attr("transform", "translate(0," + h + ")");
				
				svg.append("svg:path")
				    .attr("class", "line")
				    .attr("clip-path", "url(#clip)");
				    
				var voteLines = svg.append("svg:g");
				    
				var dupVLine;
				
				var rect = svg.append("svg:rect")
				    .attr("class", "pane")
				    .attr("width", w)
				    .attr("height", h);
				    //.call(d3.behavior.zoom().on("zoom", zoom));
				
				d3.json(tptenhance.saves.voteDataJsonUrl(currentSaveID), function(data) {
				
				// Parse dates and numbers.
				data.votes.forEach(function(d) {
					d.date = new Date(d.date*1000);//parse(d.date);
					d.value = +d.value;
				});
				data.dupVotes.forEach(function(d) {
					d.Date = new Date(d.Date*1000);//parse(d.date);
				});

				if (data.dupVotes.length)
				{
					var dupVotesDiv = $('<div></div>').addClass("DupVotes");
					$('<h4>Suspicious votes (<a>see map</a>)</h4>').appendTo(dupVotesDiv).find('a').attr('href',tptenhance.saves.voteMapUrl(currentSaveID));
					var dupVotesTbl = $('<table cellspacing="0" cellpadding="0"><thead><tr><th>Date</th><th>Username</th><th>IP address</th><th>&nbsp;</th></tr></thead><tbody></tbody></table>').appendTo(dupVotesDiv);
					var dupVotesTblBody = dupVotesTbl.find('tbody');
					var dupVotes = data.dupVotes.sort(function(a,b){return (+b.Date)-(+a.Date);});
					var ipcolours = {};
					var iplist = [];
					dupVotes.forEach(function(d) {
						if (typeof ipcolours[d.SourceAddress] == "undefined")
						{
							ipcolours[d.SourceAddress] = "";
							iplist.push(d.SourceAddress);
						}
					});
					if (iplist.length>1)
					{
						var hueStep = 340/iplist.length;
						for (var i=0; i<iplist.length; i++)
						{
							ipcolours[iplist[i]] = 'hsl('+(hueStep*i)+',50%,80%)';
						}
					}
					dupVotes.forEach(function(d) {
						var tableRow = $('<tr></tr>');
						var cell;
						cell = $('<td><a></a></td>').addClass('Date').appendTo(tableRow);
						var timeString = [('0'+d.Date.getHours()).slice(-2), ('0'+d.Date.getMinutes()).slice(-2), ('0'+d.Date.getSeconds()).slice(-2)].join(':');
						cell.text([('0'+d.Date.getDate()).slice(-2), tptenhance.monthNamesShort[d.Date.getMonth()], d.Date.getFullYear(), timeString].join(' '));
						cell = $('<td><a></a></td>').addClass('Username').appendTo(tableRow);
						cell.children().first().attr('href', tptenhance.users.moderationUrlById(d.UserID)).text(d.Username);

						
						// This is a bootstrap tooltip, not the jquery tooltip plugin
						var hoverTimeout = false;
						var hovered = false;
						cell.on("mouseleave", function(){
							hovered = false;
							if (hoverTimeout!==false)
							{
								clearTimeout(hoverTimeout);
								hoverTimeout = false;
							}
						});
						cell.on("mouseenter", function(evt, ui){
							hovered = true;
							var that = $(this);
							if (hoverTimeout===false)
							{
								hoverTimeout = setTimeout(function(){
									hoverTimeout = false;
									that.off("mouseenter");
									tptenhance.users.getModerationInfoById(d.UserID, function(data){
										var txt = "";
										if (data.Banned && data.Bans[0].Duration==0) txt += "Perm banned";
										else
										{
											if (data.Banned)
											{
												txt += "Temp banned";
												if (data.Bans.length>1)
												{
													txt += ", "+(data.Bans.length-1)+" previous ban";
													if (data.Bans.length>2) txt += "s";
												}	
											}
											else
											{
												txt += "Not currently banned";
												if (data.Bans.length>0)
												{
													txt += ", "+data.Bans.length+" previous ban";
													if (data.Bans.length>1) txt += "s";
												}
											}
										}
										
										txt += "<br>";
										if (!data.Comments.length && !data.Tags.length)
											txt += "No tags or comments";
										else
										{
											txt += data.Tags.length+" tags, ";
											if (data.CommentPageCount>1)
												txt += data.CommentPageCount+" pages of comments";
											else if (data.Comments.length>=10)
												txt += "many comments";
											else
												txt += data.Comments.length+" comments";
										}
										// TODO: saves?
										that.tooltip({title:txt, placement:"left"});
										if (hovered) that.tooltip("show");
									});
								}, 500);
							}
						});
						
						cell = $('<td><a></a></td>').addClass('IPAddress').appendTo(tableRow);
						cell.children().first().attr('href', tptenhance.IPMapUrl(d.SourceAddress)).text(d.SourceAddress);
						if (typeof ipcolours[d.SourceAddress] != "undefined" && ipcolours[d.SourceAddress] != "")
							cell.css('background-color', ipcolours[d.SourceAddress]);
						cell = $('<td></td>').addClass('VoteType');
						if (d.Vote==1) cell.html('<i class="VoteUpIcon icon-chevron-up icon-white"></i>');
						else if (d.Vote==-1) cell.html('<i class="VoteDownIcon icon-chevron-down icon-white"></i>');
						else cell.html('&nbsp;');
						cell.appendTo(tableRow);

						if (iplist.length>1)
						{
							/*tableRow.on("mouseenter",function(){
								var target = $(this).find(".IPAddress a").text();
								$(this).parents("tbody").find("tr").each(function(){
									if ($(this).find(".IPAddress a").text() == target)
										$(this).addClass("highlight");
									else
										$(this).removeClass("highlight");
								});
							});
							tableRow.on("mouseleave",function(){
								$(this).parents("tbody").find("tr").removeClass("highlight");
							});*/
							tableRow.on("dblclick", function(){
								if ($(this).hasClass("highlight"))
								{
									$(this).parents("tbody").find("tr").removeClass("highlight");
									return;
								}
								var target = $(this).find(".IPAddress a").text();
								$(this).parents("tbody").find("tr").each(function(){
									if ($(this).find(".IPAddress a").text() == target)
										$(this).addClass("highlight");
									else
										$(this).removeClass("highlight");
								});
							});
						}
						dupVotesTblBody.append(tableRow);
					});
					$("#VoteGraph").append(dupVotesDiv);
				}

				x.domain([d3.min(data.votes, function(d) { return d.date; }), d3.max(data.votes, function(d) { return d.date; })]);
				var ydomain = d3.extent(data.votes, function(d) { return d.value; });
				if (ydomain[0]>0) ydomain[0] = 0;
				y.domain(ydomain);

				rect.call(d3.behavior.zoom().x(x).on("zoom", zoom));

				// Bind the data to our path elements.
				svg.select("path.area").data([data.votes]);
				svg.select("path.line").data([data.votes]);

				function voteMouseover(d) {
					//d.classed("active", true);
					svg.selectAll(".dupVLine").classed("active", function(p) { return p.SourceAddress === d.SourceAddress; });
				}

				function voteMouseout() {
					svg.selectAll(".active").classed("active", false);
					//info.text(defaultInfo);
				}				  
				  
				dupVLine = voteLines.selectAll("line.link")
				.data(data.dupVotes);

				var lineG = dupVLine.enter().insert("svg:g")
				.attr("class", function(d) { return "dupVLine"+d.Vote+" dupVLine"; })
				.on("mouseover", voteMouseover)
				.on("mouseout", voteMouseout);

				lineG.append("line")
				.attr("x1", 0).attr("x2", 0).attr("y1", h).attr("y2", -5);

				lineG.append("text")
				.attr("text-anchor", "middle")
				.attr('font-size', 11)
				.attr("dy", ".1em")
				.text(function(d) { return d.Username; });

				lineG.append("text")
				.attr("text-anchor", "middle")
				.attr('font-size', 11)
				.attr("dy", ".1em")
				.attr("transform", "translate(0, 14)")
				.text(function(d) { return d.SourceAddress; });

				//.x1(function(d) { return x(d.Date); })
				//.y1(function(d) { return y(100); });
				//.style("stroke-width", function(d) { return Math.sqrt(d.value); });

				dupVLine.exit().remove();
			
		/*link.enter().insert("svg:line", ".node")
			.attr("class", "link")
			.style("stroke-width", function(d) { return Math.sqrt(d.value); });
			
		link.exit().remove();*/
				
				  draw();
				});
				
				function draw() {
					svg.select("g.x.axis").call(xAxis);
					svg.select("g.y.axis").call(yAxis);
					svg.select("path.area").attr("d", area);
					svg.select("path.line").attr("d", line);
					/*dupVLine.attr("x1", function(d) { return x(d.Date); })
						.attr("y1", function(d) { return h; })
						.attr("x2", function(d) { return x(d.Date); })
						.attr("y2", function(d) { return -5; });*/
					dupVLine.attr("transform", function(d) { return "translate("+x(d.Date)+", 0)"; });
					//svg.select("dupVotes.line").attr();
				}

				// Using a timeout here to defer drawing seems to improve zooming in Firefox on slow computers
				// Possibly multiple calls to zoom are issued simultaneously depending on the amount of
				// scroll wheel movement, and unnecessary redraws occur. The setTimeout defers drawing, 
				// hopefully until after all zoom calls occur.
				var zoomDrawTimeout = false;
				function zoomDraw() {
					zoomDrawTimeout = false;
					draw();
				}
				function zoom() {
					//d3.event.transform(x); // TODO d3.behavior.zoom should support extents
					if (zoomDrawTimeout===false) zoomDrawTimeout = setTimeout(zoomDraw, 1);
				}
			}
		},
		users:{
			moderationUrlById:function(id)
			{
				return "/User/Moderation.html?ID="+encodeURIComponent(id);
			},
			profileUrlById:function(id)
			{
				return "/User.html?ID="+encodeURIComponent(id);
			},
			savesUrlById:function(id)
			{
				return "/User/Saves.html?ID="+encodeURIComponent(id);
			},
			moderationUrlByName:function(n)
			{
				return "/User/Moderation.html?Name="+encodeURIComponent(n);
			},
			profileUrlByName:function(n)
			{
				return "/User.html?Name="+encodeURIComponent(n);
			},
			savesUrlByName:function(n)
			{
				return "/User/Saves.html?Name="+encodeURIComponent(n);
			},
			parseModerationPage:function(html)
			{
				html = $(html).find(".Page");
				var data = {};
				data.Banned = (html.find(".UnBanUser").length>0);
				data.KnownAddresses = [];
				html.find(".KnownAddresses a").each(function(){data.KnownAddresses.push($(this).text());});
				data.Comments = [];
				html.find(".MessageList .Post").each(function(){
					var comment = $(this);
					data.Comments.push({
						SaveID: +comment.find(".SaveInfo a").text(),
						date: comment.find(".Date").text(),
						CommentID: +comment.find(".Actions a").attr("href").match(/DeleteComment=[0-9]+/)[0].split("=")[1],
						Message: comment.find(".Message").html()
					});
				});
				data.CommentPageCount = +(html.find(".pagination li:nth-last-child(2) a").first().text());
				data.Bans = [];
				html.find(".BanHistory li").each(function(){
					var ban = $(this);
					var h6 = ban.find("h6").text().split(", ");
					var otherText = ban.clone();
					otherText.children().remove();
					otherText = otherText.text().split("\"");
					var duration = otherText.shift().replace("\s+$","").toLowerCase();
					if (duration.indexOf("permanently")!=-1 || duration.indexOf("permenantly")!=-1)
						duration = 0;
					else if (duration.indexOf("hour")!=-1)
						duration = 60*60*(+duration.split(" ")[0]);
					else if (duration.indexOf("day")!=-1)
						duration = 60*60*24*(+duration.split(" ")[0]);
					else if (duration.indexOf("week")!=-1)
						duration = 60*60*24*7*(+duration.split(" ")[0]);
					else if (duration.indexOf("month")!=-1)
						duration = 60*60*24*7*4*(+duration.split(" ")[0]); // 4 weeks seems right, e.g. a ban reported on IRC as 67200 hours shows as 100 months
					otherText.pop();
					data.Bans.push({
						date: h6[0],
						By: h6[1],
						Reason: otherText.join("\""),
						Duration: duration
					});
				});
				data.Tags = [];
				html.find(".TagText").each(function(){ data.Tags.push($(this).text()); });
				data.SaveDeletions = +$(html.find(".Record .Information")[1]).text().match(/[0-9]+/)[0];
				return data;
			},
			getModerationInfoById:function(id,callback)
			{
				$.get(tptenhance.users.moderationUrlById(id), function(data){
					callback(tptenhance.users.parseModerationPage(data));
				}, "html");
			}
		},
		IPMapUrl:function(ip)
		{
			return "/IPTools.html?IP="+encodeURIComponent(ip);
		}
	}

	$(document).ready(function(){
		if (tptenhance.isMod())
		{
			$(".main-menu .pull-right .dropdown:first-child .dropdown-menu").append('<li class="item"><a href="/Documentation/Changelog.html">Changelog</a>');
		}
	});

	// Override tag info popups, and add them to the user moderation page
	// The overridden version has links to delete (instead of disabling) tags, and disabling+deleting is done in an Ajax request (no full page reload)
	if (window.location.toString().indexOf("/User/Moderation.html")!=-1)
	{
		$(document).ready(function(){setTimeout(function(){
			$(".BanHistory ul").each(function(){
				$(this).html($(this).html().replace(/Permenantly/, "Permanently"));
			});
			$("span.TagText").on('click', function(){
				tptenhance.tagsTooltip($(this), $(this).text());
			});
			$("div.Tag .DelButton").attr('title', 'Disable');// A clearer tooltip
			$("div.Tag .DelButton").on('click', tptenhance.tags.disableButtonClick);
			// ajax for deleting comments
			var modPageRequest = false, modPageRequestNeeded = false;
			var clickFn;
			clickFn = function(e){
				e.preventDefault();
				if (tptenhance.commentDeleteWaiting>0) modPageRequestNeeded = true;
				tptenhance.commentDeleteWaiting++;
				var post = $(this).parents('.Post');
				var info = $(tptenhance.deletingHtml);
				$(this).parents('.Actions').replaceWith(info);
				url = this.href;
				if (modPageRequestNeeded) url = url.replace(/Redirect=[^&]*/, 'Redirect='+encodeURIComponent(tptenhance.dummyUrl));
				else url = url.replace(/Redirect=[^&]*/, 'Redirect='+encodeURIComponent((''+self.location).replace(/^http:\/\/powdertoy.co.uk/, '')));
				if (modPageRequest !== false) modPageRequest.abort();
				modPageRequest = false;
				$.get(url, function(data){
					tptenhance.commentDeleteWaiting--;
					post.css('color','#AAA');
					info.replaceWith('<div class="pull-right label label-success"><i class="icon-ok icon-white"></i> <strong>Deleted</strong></span></div>');
					if (tptenhance.commentDeleteWaiting==0)
					{
						if (modPageRequestNeeded)
						{
							if (modPageRequest !== false) modPageRequest.abort();
							modPageRequest = $.get(window.location, function(data){
								var comments = $(data).find(".MessageList");
								if (comments.length)
								{
									post.parents(".MessageList").replaceWith(comments);
									$(".Actions a").each(function(){
										if (this.href.indexOf('DeleteComment=')!=-1)
											$(this).click(clickFn);
									});
								}
								modPageRequestNeeded = false;
								modPageRequest = false;
							}, "html");
						}
						else
						{
							var comments = $(data).find(".MessageList");
							if (comments.length)
							{
								post.parents(".MessageList").replaceWith(comments);
								$(".Actions a").each(function(){
									if (this.href.indexOf('DeleteComment=')!=-1)
										$(this).click(clickFn);
								});
							}
						}
					}
				});
			}
			$(".Actions a").each(function(){
				if (this.href.indexOf('DeleteComment=')!=-1)
				{
					$(this).click(clickFn);
					$(this).attr('href', $(this).attr('href').replace(/Redirect=[^&]*/, 'Redirect='+encodeURIComponent((''+self.location).replace(/^http:\/\/powdertoy.co.uk/, ''))));
				}
			});
			
			/*
			 * Existing submit hook:
		if(reason.length < 2){
			alert("Please provide a ban reason");
			return false;
		}
		if(timespan.length > 0 && !isNumber(timespan)) {
			alert("Ban time must be a number");
			return false;	
		}
		if(parseFloat(timespan) < 0 || timetype == "p"){
			return confirm("Are you sure you want to permanently ban this user, all the user's saves will be locked.");
		}
			* 
			* This is replaced by the function below because:
			* a) It's buggy. timespan=0 or timespan="" produces a perm ban without confirmation. 
			* b) confirm isn't really necessary if several actions (changing the timespan dropdown value and clicking the ban button) have already been taken to indicate that yes, a perm ban is desired. 
			*    Yeah, maybe an accidental perm ban while mashing keyboard or cat-on-keyboard is still possible, but I think it's sufficiently unlikely. 
			*    The confirm() is a particular nuisance when trying to perm ban lots of accounts simultaneously for multiple account voting. 
			*    Also, since pressing enter means submit for forms and OK for confirm dialogs, the confirm doesn't necessarily help if the enter button is accidentally pressed and gets stuck, or is trodden on by a cat.
			*/
			$(".BanUser form").off('submit').on('submit', function(e){
				// Try to prevent accidental perm bans
				var form = $(".BanUser form");
				var banReason = form.find('input[name="BanReason"]').val();
				var banTimeType = form.find('select[name="BanTimeSpan"]').val();
				var banTime = form.find('input[name="BanTime"]').val();
				if (banTimeType!="p")
				{
					if (banTime.toString() != (+banTime).toString() || (+banTime)<=0 || (+banTime)!=(+banTime))
					{
						alert("Enter a ban time, or select 'Perm' from the dropdown box");
						e.preventDefault();
						return false;
					}
					else if (banReason == "Ban Reason" || banReason.length < 2)
					{
						alert("Enter a ban reason");
						e.preventDefault();
						return false;
					}
				}
			});
		},1);});
	}
	if (window.location.toString().indexOf("/User.html")!=-1)
	{
		$(document).ready(function(){
			var matches = window.location.toString().match(/(Name|ID)=.+/);
			if (matches)
			{
				$(".ProfileInfo > .alert-info:nth-child(2)").remove();
				var elem = $('<div class="UserInfoRow"><label>Registered:</label> <span></span></div>');
				elem.insertAfter($(".ProfileInfo .page-header").first());
				$.get("http://powdertoythings.co.uk/Powder/User.json?"+matches[0], function(data) {
					var txt = "unknown";
					if (typeof data.User!="undefined" && typeof data.User.RegisterTime!="undefined")
					{
						var regTime = new Date(data.User.RegisterTime*1000);
						var timeString = [('0'+regTime.getHours()).slice(-2), ('0'+regTime.getMinutes()).slice(-2), ('0'+regTime.getSeconds()).slice(-2)].join(':');
						txt = [('0'+regTime.getDate()).slice(-2), tptenhance.monthNamesShort[regTime.getMonth()], regTime.getFullYear(), timeString].join(' ');
					}
					elem.find("span").text(txt);
				}, "json");
			}
		});
	}
	if (window.location.toString().indexOf("/Browse/View.html")!=-1)
	{
		window.lastComments = window.location.toString();
		$(document).ready(function(){
			setTimeout(function(){
				$("span.Tag").die('click');
				if (tptenhance.isMod())
				{
					$("span.Tag").on('click', function(){
						tptenhance.tagTooltip($(this), $(this).text(), currentSaveID);
					});
					/*var newVoteGraph = $('<div id="VoteGraph"></div>');
					newVoteGraph.append($("#VoteGraph").children());
					newVoteGraph.find(".btn").remove();
					newVoteGraph.hide();*/

					var tabs = $('<ul class="nav nav-pills"></ul>');
					tabs.css({"display": "inline-block", "margin-bottom":"0"});
					//var votesTab = $('<li class="item"><a href="">Votes</a></li>').appendTo(tabs);
					var reportsTab = $('<li class="item"><a href="">Reports</a></li>').appendTo(tabs);
					//var tagsTab = $('<li class="item"><a href="">Tags</a></li>').appendTo(tabs); // TODO. Table showing all tags and users who placed them, with remove+disable buttons for each tag, and a remove all tags button. 
					var bumpsTab = $('<li class="item"><a href="">Bumps</a></li>').appendTo(tabs);
					var searchesTab = $('<li class="item"><a href="">Search similar</a></li>').appendTo(tabs);
					var signsTab = $('<li class="item"><a href="">Signs</a></li>').appendTo(tabs);
					
					

					var tabSwitch = function(newTabLink){
						tabs.find("li.active").removeClass("active");
						$(newTabLink).parent().addClass("active");
						//$("#VoteGraph").hide();
						tptenhance.saveDetailsTabContent.empty();
					};

					/*var votesShown = false;
					votesTab.find("a").on("click", function(e){
						tabSwitch(this);
						$("#VoteGraph").show();
						if (!votesShown)
							tptenhance.saves.showVotes();
						votesShown = true;
						e.preventDefault();
					});*/
					reportsTab.find("a").on("click", function(e){
						tabSwitch(this);
						$.get(tptenhance.reports.viewReportUrl(currentSaveID), function(html){
							var reports = tptenhance.reports.parseViewReport(html);
							var msgList = $('<ul class="MessageList"></ul>');
							if (reports.length)
							{
								reports.forEach(function(report){
									var msg = $('<li class="Post"><div class="Meta"><span class="Author"><div class="gravatar"><div class="gravatar-inner"><img></div></div><a></a></span><span class="Date"></span></div><div class="Message"></div></li>');
									msg.find(".gravatar-inner img").attr('src', report.UserAvatar).attr('alt', report.UserName);
									msg.find("a").attr('href', tptenhance.users.profileUrlById(report.UserID)).text(report.UserName);
									msg.find(".Date").text(report.ReportDate);
									msg.find(".Message").text(report.Message);
									msgList.append(msg);
								});
								tptenhance.makeSaveLinks(msgList.find(".Post .Message"));
								tptenhance.saveDetailsTabContent.append(msgList);
							}
							else
							{
								$('<div class="alert alert-success" style="margin-top: 10px;">This save has never been reported.</div>').appendTo(tptenhance.saveDetailsTabContent);
							}
							reportsTab.find("a").text("Reports ("+reports.length+")");
						}, "html");
						e.preventDefault();
					});
					bumpsTab.find("a").on("click", function(e){
						tabSwitch(this);
						$.get(tptenhance.saves.infoJsonUrlPTT(currentSaveID), function(data){
							var bumpList = $('<div style="text-align:center;"></div>');
							data.BumpTimes.sort(function(a,b){return b-a});
							if (data.BumpTimes.length)
							{
								if (data.BumpTimes.length>1)
									$('<strong>This save has been bumped at least '+data.BumpTimes.length+' times:</strong>').appendTo(bumpList);
								else
									$('<strong>This save has been bumped at least once:</strong>').appendTo(bumpList);
								data.BumpTimes.forEach(function(bt) {
									var d = new Date(+bt * 1000);
									var timeString = [('0'+d.getHours()).slice(-2), ('0'+d.getMinutes()).slice(-2), ('0'+d.getSeconds()).slice(-2)].join(':');
									var dateText = [('0'+d.getDate()).slice(-2), tptenhance.monthNamesShort[d.getMonth()], d.getFullYear(), timeString].join(' ');
									$('<div></div>').text(dateText).appendTo(bumpList);
								});
							}
							else
							{
								bumpList.text('No record found of this save ever being published');
							}
							tptenhance.saveDetailsTabContent.append(bumpList);
						}, "json");
						e.preventDefault();
					});
					signsTab.find("a").on("click", function(e){
						tabSwitch(this);
						$.get(tptenhance.saves.infoDetailedJsonUrlPTT(currentSaveID), function(data){
							console.log(data);
							if (typeof data.Error!="undefined")
							{
								tptenhance.saveDetailsTabContent.append($("<div></div>").addClass("alert alert-error").text(data.Error));
							}
							else
							{
								var container = $('<div style="text-align:center;">(data may be up to 5 minutes old)<br><br></div>');
								var signsTbl = $('<table cellspacing="0" cellpadding="0" style="margin:0 auto;" class="SignsTbl"><thead><tr><th>Position</th><th>Displayed text</th><th>Sign type</th></tr></thead><tbody></tbody></table>')
								var signsTblBody = signsTbl.find('tbody');
								data.Signs.sort(function(a,b){return a.PlacementY*10000-b.PlacementY*10000+a.PlacementX-b.PlacementX});
								if (data.Signs.length)
								{
									data.Signs.forEach(function(s){
										var row = $('<tr></tr>');
										var count = 0;
										for (var i=0; i<data.Signs.length; ++i)
										{
											if (data.Signs[i].PlacementX==s.PlacementX && data.Signs[i].PlacementY==s.PlacementY && data.Signs[i].RawText==s.RawText)
												++count;
										}
										if (count>1)
											row.addClass("DupSign");
										$('<td></td>').text(s.PlacementX+','+s.PlacementY).appendTo(row);
										if (s.Type=="Save link" || s.Type=="Thread link")
										{
											/*var cell = $('<td></td>').appendTo(row);
											$('<div><strong>Raw:</strong><span></span>').appendTo(cell).find('span').text(s.RawText);
											$('<div><strong>Displayed:</strong><span></span>').appendTo(cell).find('span').text(s.DisplayText);*/
											if (s.Type=="Save link")
											{
												var url = tptenhance.saves.viewUrl(s.LinkID);
												var cell = $('<td></td>').appendTo(row);
												$('<a></a>').text(s.DisplayText).attr('href', url).appendTo(cell);

												var cell = $('<td></td>').text(s.Type+': ').appendTo(row);
												$('<a></a>').text(s.LinkID).attr('href', url).appendTo(cell);
											}
											else if (s.Type=="Thread link")
											{
												var url = tptenhance.forums.threadUrl(s.LinkID);
												var cell = $('<td></td>').appendTo(row);
												$('<a></a>').text(s.DisplayText).attr('href', url).appendTo(cell);

												var cell = $('<td></td>').text(s.Type+': ').appendTo(row);
												$('<a></a>').text(s.LinkID).attr('href', url).appendTo(cell);
											}
										}
										else if (s.Type=="Spark sign")
										{
											$('<td></td>').text(s.DisplayText).appendTo(row);
											$('<td></td>').text(s.Type).appendTo(row);
										}
										else
										{
											//$('<td></td>').text(s.RawText).appendTo(row);
											$('<td></td>').text(s.DisplayText).appendTo(row);
											$('<td></td>').text(s.Type).appendTo(row);
										}
										row.appendTo(signsTblBody);
									});
									container.append(signsTbl);
								}
								else
								{
									container.text('No signs found (data may be up to 5 minutes old)');
								}
								tptenhance.saveDetailsTabContent.append(container);
							}
						}, "json");
						e.preventDefault();
					});
					
					searchesTab.find("a").on("click", function(e){
						tabSwitch(this);
						var container = $('<div><strong>Search for similar saves by:</strong><br></div>').css({"text-align":"center"});
						$('<a></a>')
							.attr('href', 'http://powdertoythings.co.uk/Powder/Saves/Search.html?Search_Query='+encodeURIComponent("sort:id search:title "+$(".Title").attr('title').trim()))
							.text("Title")
							.append('<br>')
							.appendTo(container);
						$('<a></a>')
							.attr('href', 'http://powdertoythings.co.uk/Powder/Saves/Search.html?Search_Query='+encodeURIComponent("search:similartitle "+$(".Title").attr('title').trim()))
							.text("Similar title")
							.append('<br>')
							.appendTo(container);
						if ($(".SaveDescription").text().trim()!="No Description provided.")
						{
							$('<a></a>')
								.attr('href', 'http://powdertoythings.co.uk/Powder/Saves/Search.html?Search_Query='+encodeURIComponent("sort:id search:desc "+$(".SaveDescription").text().trim()))
								.text("Description")
								.append('<br>')
								.appendTo(container);
						}
						tptenhance.saveDetailsTabContent.append(container);
						e.preventDefault();
					});

					
					var newDetailsPane = $('<div class="SaveDetails"></div>').insertAfter("#VoteGraph");
					//$("#VoteGraph").remove();
					//newDetailsPane.append(newVoteGraph.find(".Warning"));
					$('<div></div>').append(tabs).css({"text-align": "center"}).appendTo(newDetailsPane);
					//newDetailsPane.append(newVoteGraph);
					tptenhance.saveDetailsTabs = tabs;
					tptenhance.saveDetailsTabContent = $('<div></div>').appendTo(newDetailsPane);
				}
				tptenhance.attachSaveCommentHandlers();
			},1);
			$(".SaveDetails .Warning").addClass("alert alert-error").css("margin-bottom", "5px");
			window.showSaveVotes = tptenhance.saves.showVotes;
		});
	}
	if (window.location.toString().indexOf("/Browse/Tags.html")!=-1)
	{
		$(document).ready(function(){
			setTimeout(function(){
				$("span.TagText").die('click');
				$("span.TagText").on('click', function(){
					tptenhance.tagsTooltip($(this), $(this).text());
				});
				tptenhance.tags.attachHandlers($("div.Tag"));
			},1);
		});
	}
	if (window.location.toString().indexOf("/Discussions/Thread/View.html")!=-1)
	{
		// Extend LoadForumBlocks to add a click callback to the Unhide post buttons, to fix the site redirecting to the first page of the thread instead of the page with the post when a post is unhidden
		tptenhance.oldLoadForumBlocks = window.LoadForumBlocks;
		window.LoadForumBlocks = tptenhance.LoadForumBlocks;
		$(document).ready(function(){
			setTimeout(function(){
				$(".Pagination a").die('click');
				$(".Pagination a").live('click', function(){
					if(!window.history.pushState){
						return true;
					}
					var goBack = 0;

					var matchesCurrent = window.location.toString().match(/PageNum=([0-9]+)/);
					var matchesNew = this.href.match(/PageNum=([0-9]+)/);
					if (matchesCurrent && matchesNew && (+matchesNew[1])<(+matchesCurrent[1]))
						goBack = 1;

					var doScroll = function(){};
					if (goBack)
					{
						if ($(window).scrollTop() >= $('.Pagefooter').offset().top-$(window).height())
						{
							var scrolloffset = $(window).scrollTop()-($('.Pagefooter').offset().top-$(window).height());
							doScroll = function(){
								$(window).scrollTop(scrolloffset+$('.Pagefooter').offset().top-$(window).height());
							};
						}
						else
						{
							doScroll = function(){
								$(window).scrollTop($(document.body).height()-$(window).height());
							};
						}
					}
					else if ($(window).scrollTop() > $('.TopicTitle').offset().top)
					{
						doScroll = function(){
							$(window).scrollTop(0);
						};
					}
					doScroll();

					Link2 = this.href;
					Link = this.href.replace(/\.html\?/, ".json?Mode=HTML&");
					$("#ActionSpinner").fadeIn("fast");
					$("ul.MessageList").fadeTo(200, 0.5);
					$.get(Link, function(data){
						$("#ActionSpinner").fadeOut("fast");
						$(".Pagination").html(data.Pagination);
						OLHeight = $('ul.MessageList').height();
						$("ul.MessageList").children().addClass("QueueRemove");
						var newTop;
						if(goBack){
							$("ul.MessageList").prepend(data.Posts);
							$("ul.MessageList").css("top", -OLHeight+"px");
							newTop = 0;
						} else {
							$("ul.MessageList").append(data.Posts);
							newTop = (-OLHeight);
						}
						$(".MessageListOuter").css({"height":(+$("ul.MessageList").height()-OLHeight)+"px"});
						ProcessMessages();
						doScroll();
						$("ul.MessageList").animate({
							top: newTop
						}, 500, function() {
							$("ul.MessageList").fadeTo(500, 1);
							$("ul.MessageList").css({"top": 0});
							$(".MessageListOuter").css({"height": "auto"});
							$("ul.MessageList").children(".QueueRemove").remove();
						});
						LoadForumBlocks();
						if(window.history.pushState){
							window.history.pushState("", "", Link2);
						}
					}, "json").fail(function(){location.reload(true);});
					return false;
				});
			},1);
		});
	}
	if (window.location.toString().indexOf("/Discussions/Thread/HidePost.html")!=-1)
	{
		$(document).ready(function(){
			// To fix the site redirecting to the first page of the thread instead of the page with the post when a post is hidden
			// submit form via Ajax request then redirect to the correct page ourselves
			$('.FullForm').on('submit', function(e){
				e.preventDefault();
				var formData = $(this).serialize();
				formData += "&Hide_Hide=Hide+Post";
				$.post($(this).attr('action'), formData, function(){
					window.location = '/Discussions/Thread/View.html?'+(window.location.search.match(/Post=[0-9]+/)[0]);
				});
			});
		});
	}
	if (window.location.toString().indexOf("/Groups/")!=-1)
	{
		$(document).ready(function(){
			$('.ButtonLink').addClass('btn');
			$('.GroupOptions .btn').each(function(){
				var txt = $(this).text();
				if (txt=="New Topic") $(this).addClass('btn-primary');
				if (txt=="Resign") $(this).addClass('btn-danger');
			});
			$('.GroupInfo').append($('.GroupOptions'));
		});
	}
	if (window.location.toString().indexOf("/Groups/Thread/")!=-1)
	{
		$(document).ready(function(){
			// WYSIWYG editor
			$("#AddReplyMessage").addClass("EditWYSIWYG");
			tptenhance.wysiwygLoaded = 0;
			var wysiwygPrepare = function()
			{
				tptenhance.wysiwygLoaded++;
				if (tptenhance.wysiwygLoaded>=2)
				{
					WYSIWYG('#AddReplyMessage, textarea[name="Post_Message"], textarea[name="Thread_Message"]');
					window.GetRef = function(Username, PostID){
						$('html, body').animate({scrollTop: $(document).height()}, 200);
						$("#AddReplyMessage.EditPlain").insertAtCaret("@"+Username+"!"+PostID+"\n");
						$("#AddReplyMessage.EditWYSIWYG").tinymce().execCommand('mceInsertContent',false, "<p>@"+Username+"!"+PostID+"</p><p></p>");
					}
					window.GetQuote = function(PostID, Element, Username){
						$('html, body').animate({scrollTop: $(document).height()}, 200);
						$.get("/Groups/Thread/Post.json?Type=Raw&Post="+PostID, function(data){
							if(data.Status==1){
								$("#AddReplyMessage.EditPlain").insertAtCaret("<p><cite>"+Username+"</cite>:</p><blockquote>"+data.Post+"</blockquote>");
								$("#AddReplyMessage.EditWYSIWYG").tinymce().execCommand('mceInsertContent',false, "<p><cite>"+Username+"</cite>:</p><blockquote>"+data.Post+"</blockquote><p>&nbsp;</p>");
							} else {
								$("#AddReplyMessage.EditPlain").insertAtCaret("<p><cite>"+Username+"</cite>:</p><blockquote>"+$("#"+Element).text()+"</blockquote>");
								$("#AddReplyMessage.EditWYSIWYG").tinymce().execCommand('mceInsertContent',false, "<p><cite>"+Username+"</cite>:</p><blockquote>"+$("#"+Element).text()+"</blockquote><p>&nbsp;</p>");
							}
						});	
					}
				}
			}
			$.getScript("/Applications/Application.Discussions/Javascript/jQuery.TinyMCE.js", wysiwygPrepare);
			$.getScript("/Applications/Application.Discussions/Javascript/WYSIWYG.js", wysiwygPrepare);
			
			$('.Banned .Comment .Information').addClass("alert alert-warning").html("This post is hidden because the user is banned");
			$('.Pagefooter .Warning').addClass("alert alert-warning");
			$('.Member .Comment .Information, .Administrator .Comment .Information, .Moderator .Comment .Information').addClass("alert alert-warning").html("This post has been hidden");
			$('.Comment .Actions .ButtonLink').addClass('btn-mini');
			$('.Comment .Actions').removeClass('Actions').addClass('Actions2');// to stop groups CSS on site from overriding bootstrap button styles
			$('.Post.Moderator').each(function(){
				if ($(this).find(".Meta .UserTitle").text()=="Member")
					$(this).find(".Meta .UserTitle").text("Moderator");
			});
			$('form input[type="submit"]').addClass('btn');
			$('form input[type="submit"]').each(function(){
				var txt = $(this).attr('value');
				if (txt=="Stick" || txt=="Unstick") $(this).addClass('btn-info');
				if (txt=="Delete Thread") $(this).addClass('btn-danger');
				if (txt=="Save") $(this).addClass('btn-primary');
				if (txt=="Post") $(this).addClass('btn-primary').css('margin-top', '5px');
			});
			$('.Pageheader').prepend('<a href="/Groups/Page/Groups.html">Groups</a> &raquo;');
			$(".HidePostButton").off('click');
			$(".HidePostButton").on('click', function(){ 
				InformationForm = $('<div class="Information"></div>');
				Form = $('<form class="FullForm" method="POST" action="'+$(this).attr('href').replace(/\.html/, ".json")+'"><div class="alert">Are you sure you want to hide this post?<input type="submit" name="Hide_Hide" class="btn btn-primary btn-mini" value="Hide Post" style="float:right;"><div class="Clear"></div></div></form>');
				InformationForm.html(Form);
				$(this).parent().parent().parent().children('.Message').html(InformationForm);
				Form.submit(function(){
					Link = $(this).attr("action").replace(/\.html/, ".json");
					NewData = $(this).serialize();
					NewData = NewData+"&Hide_Hide=Hide";
					$.post(Link, NewData, null, "json").always(function(data){
						location.reload(true);
					});
					$(this).replaceWith('Hiding...<div class="AJAXSpinner"></div>');
					return false;
				});
				return false;
			});
			var groupId = tptenhance.getCurrentGroupId();
			$(".Post a").each(function(){
				if ($(this).text()!="(View Post)") return;
				var matches = $(this).attr('href').match(/\/Discussions\/Thread\/View.html\?Post=([0-9]+)$/);
				if (matches)
				{
					$(this).attr('href', "/Groups/Thread/View.html?Post="+encodeURIComponent(matches[1])+"&Group="+encodeURIComponent(groupId));
				}
			});
		});
	}
	if (window.location.toString().indexOf("/Reports/View.html")!=-1)
	{
		$(document).ready(function(){
			tptenhance.makeSaveLinks($(".Post .Message"));
		});
	}
	if (window.location.toString().indexOf("/Reports.html")!=-1)
	{
		$(document).ready(function(){
			var reports = tptenhance.reports.parseReportsHtml($(".SaveReports"));
			$("<h1>Save reports</h1>").insertAfter($(".Subpage .Pagination").first());
			setTimeout(function(){
				$("#PaginationContainer a").die('click');
			},1);
			if (reports.length)
			{
				tptenhance.reports.changeButtons();
				$(".SaveReports li a img").each(function(){
					var saveId = $(this).attr("src").match(/[0-9]+/)[0];
					$(this).attr("src", tptenhance.saves.smallImgUrl(saveId));
				});
				/* WIP, not finished yet
				$("#SaveReportsList").empty();
				reports.forEach(function(report){
					var reportElem = $('<li class="Save panel panel-default"></li>');
					
					var thumbElem = $('<a><img class="SaveThumb"></a>');
					thumbElem.attr("href", tptenhance.saves.viewUrl(report.SaveId));
					thumbElem.find("img").attr("src", tptenhance.saves.smallImgUrl(report.SaveId));
					//var unreadElem = $('<span class="label label-important label-danger"></span>').text(report.UnreadReportCount+" unread report"+(report.UnreadReportCount>1?"s":""));
					var unreadElem = $('<span class="badge badge-important"></span>').text(report.UnreadReportCount);
					var actionsElem = $('<div class="Actions"></div>');
					$('<a class="btn btn-warning"><i class="icon-lock icon-white"></i> Unpublish</a>').attr("href", tptenhance.reports.unpublishUrl(report.SaveId)).appendTo(actionsElem);
					$('<a class="btn btn-success"><i class="icon-ok icon-white"></i> Mark as read</a>').attr("href", tptenhance.reports.markAsReadUrl(report.SaveId)).appendTo(actionsElem);
					$('<a class="btn btn-primary">View reports</a>').attr("href", tptenhance.reports.viewReportUrl(report.SaveId)).appendTo(actionsElem);
					
					var titleElem = $('<div class="SaveTitleContainer outside-header"></div>');
					unreadElem.appendTo(titleElem);
					$('<a class="SaveTitle"></a>').attr("href", tptenhance.saves.viewUrl(report.SaveId)).text(report.SaveName).appendTo(titleElem);
					
					var detailsElem = $('<div class="DetailsContainer"></div>');

					var authorElem = $('<div class="SaveDetails">Save <span class="SaveId"></span> by <span class="SaveAuthor"></span></div>')
					authorElem.find(".SaveId").text(report.SaveId);
					authorElem.find(".SaveAuthor").text(report.Username);
					authorElem.prepend($('<a class="btn btn-mini">Profile</a>').attr("href", tptenhance.users.profileUrlByName(report.Username)));
					authorElem.prepend($('<a class="btn btn-mini">Moderation</a>').attr("href", tptenhance.users.moderationUrlByName(report.Username)));
					authorElem.prepend($('<a class="btn btn-mini">All saves</a>').attr("href", tptenhance.users.savesUrlByName(report.Username)));
					authorElem.prepend($('<a class="btn btn-mini">Published saves</a>').attr("href", "/Browse.html?Search_Query=sort:date+user:"+encodeURIComponent(report.Username)));
					
					thumbElem.appendTo(reportElem);
					titleElem.appendTo(reportElem);

					authorElem.appendTo(detailsElem);
					actionsElem.appendTo(detailsElem);
					detailsElem.appendTo(reportElem);
					
					$('<div class="Clear"></div>').appendTo(reportElem);
					
					reportElem.appendTo($("#SaveReportsList"));
					//viewReportUrl
				});*/
			}
			else
			{
				$('<div class="alert alert-success" style="margin-top: 10px;">There are no unread reports.</div>').insertAfter($("#SaveReportsList"));
				$("#SaveReportsList").remove();
			}
		});
	}
	}
});

function addCss(cssString)
{
	var head = document.getElementsByTagName('head')[0];
	if (!head) return;
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}
addCss('\
.Tag .DelButton, .Tag .UnDelButton { top:auto; background-color:transparent; }\
.Tag .LoadingIcon { position:absolute; right:3px; line-height:20px; }\
.popover-inner { width:380px; }\
.VoteUpIcon { background-color:#0C0; border:1px solid #080; }\
.VoteDownIcon { background-color:#C00; border:1px solid #800; }\
.VoteUpIcon, .VoteDownIcon { margin-top:2px; }\
.DupVotes { margin-top: 10px; }\
.DupVotes h4 { text-align:center; margin:3px 0; }\
.DupVotes table { margin:0 auto; border:1px solid #CCC; }\
.DupVotes td, .DupVotes th { padding:3px 6px; }\
.DupVotes th { text-align:left; background-color:#DDD; }\
.DupVotes tr:nth-child(even) { background-color:#FFF; }\
.DupVotes tr:nth-child(odd) { background-color:#EFEFEF; }\
.DupVotes tr:hover, .DupVotes tr.highlight:hover { background-color:#E0E0FF; }\
.DupVotes tr.highlight .IPAddress { background-color:#FFF !important; }\
.DupVotes tr.highlight { background-color:#C8C8FF; }\
.DupVotes .Date { font-family:monospace; }\
.SignsTbl { margin:0 auto; border:1px solid #CCC; }\
.SignsTbl td, .SignsTbl th { padding:3px 6px; border:1px solid #CCC}\
.SignsTbl th { text-align:left; background-color:#DDD; }\
.SignsTbl th:nth-child(2) { min-width:200px; }\
.SignsTbl td:nth-child(2), .SignsTbl td:nth-child(3) { text-align:left; }\
.SignsTbl tr:nth-child(even) { background-color:#FFF; }\
.SignsTbl tr:nth-child(odd) { background-color:#F9F9F9; }\
.SignsTbl tr:hover, .DupVotes tr.highlight:hover { background-color:#E0E0FF; }\
.SignsTbl tr.DupSign td:nth-child(1) { color:#C00; font-weight:bold; }\
.Post { word-wrap: break-word; }\
.savegame { width:153px; }\
.savegame .caption a { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\
.TagInfo { clear:right; }\
.TagInfo .label { margin-bottom:1px; }\
.SaveDetails ul.MessageList li.Post { border-top:1px solid #DCDCDC; border-bottom:0 none; }\
');
if (window.location.toString().indexOf("/Groups/")!=-1)
{
	addCss('\
.TopicList li .TopicPages { width:auto; }\
.TopicList .Pagination li { padding:0; border-bottom: 1px solid #DCDCDC; line-height: normal; }\
.TopicList .Pagination a { font-size: 9px !important; line-height: 16px; min-width: 10px !important; padding: 0 3px; text-align: center; border-width: 1px 1px 1px 0 !important; }\
.TopicList .Pagination li:first-child a { border-left-width: 1px !important; }\
.TopicList .pagination { height: 16px; margin: 0; padding: 3px; }\
.contents h1 { font-size: 20px; }\
.GroupOptions { position:relative; top:0; right:0; float:right; clear:right;}\
.GroupDescription { margin:0; }\
.MessageListOuter { margin-bottom:7px; }\
.PostFForm #AddReplyMessage { width:100%; margin:0; padding:0; }\
.PostFForm, .ModerationFooter { margin:0; }\
.container { background: none repeat scroll 0 0 rgba(0, 0, 0, 0); border: medium none; padding: 0; }\
.Page { border: 1px solid #CDD2D7; }\
.Moderator .Author, .Administrator .Author { background-image: url("/Themes/Next/Design/Images/Shield.png"); }\
.main-menu li a[href="/Groups.html"] { display: none; }\
ul.MessageList li.Post div.Meta span.Actions2 { float:right; }\
ul.MessageList li.Post div.Meta span.Actions2 a { visibility:hidden; }\
ul.MessageList li.Post:hover div.Meta span.Actions2 a { visibility:visible; }\
\
');
}
if (window.location.toString().indexOf("/Reports.html")!=-1)
{
	addCss('\
.container { background: none repeat scroll 0 0 rgba(0, 0, 0, 0); border: medium none; padding: 0; }\
.Page { border: 1px solid #CDD2D7; }\
.Subpage { background-color: #FFFFFF; padding:15px; }\
.contents h1 { font-size:20px; }\
/*ul.SaveReports, ul.SaveReports li { list-style:none outside none; margin:0; padding:0; border: 0 none; background-color:#FDFDFD; }\
.SaveReports .Save { border:1px solid #999; border-radius: 3px; margin:10px 0; }\
.SaveReports .Save .badge { float:right; margin:0 5px;}\
.SaveReports .Save .Actions .btn { margin:5px 10px 0 10px; min-width:100px;}\
.SaveReports .Save .Actions { padding:0 10px;  text-align:center; }\
.SaveReports .SaveThumb { float:left; height:128px; width:204px; border-radius:0 3px 0 0; margin:5px 10px 5px 5px;}\
.SaveReports .SaveTitleContainer { font-size:16px; font-weight:bold; border-radius:3px 0 0 0; border:0 none; margin:0; padding:10px; border-bottom:1px solid #DDDDDD; }\
.SaveReports .SaveDetails { font-size:15px; overflow:hidden;margin-bottom:15px; }\
.SaveReports .SaveDetails .btn { margin:0 3px; float:right; }\
.SaveReports .SaveDetails .SaveId, .SaveReports .SaveDetails .SaveAuthor { font-weight:bold; }\
.SaveReports .Save .DetailsContainer { padding:10px; }*/\
\
/*.SaveReports img { height: 96px; width:153px; margin:5px;  }*/\
.SaveReports .MainInfo { width:auto !important; }\
.SaveReports li > span { margin:0 5px 0 5px !important; }\
\
');
}
if (window.location.toString().indexOf("/Reports")!=-1)
{
	addCss('\
.main-menu .pull-left li a[href="/Reports.html"] { display: none; }\
\
');
}
