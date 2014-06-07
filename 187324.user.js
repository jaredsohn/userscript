// ==UserScript==
// @name        XG Webfront Custom Search Provider
// @namespace   Global
// @include     http://localhost:5555*
// @version     1
// @run-at      document-start
// ==/UserScript==

/* Utilities */
String.prototype.format = function() 
{
    var args = arguments;
    var sprintfRegex = /\{(\d+)\}/g;
    var sprintf = function (match, number) 
	{
      return number in args ? args[number] : match;
    }
    return this.replace(sprintfRegex, sprintf);
};
String.prototype.startsWith = function (str)
{
	return this.indexOf(str) == 0;
};
String.prototype.endsWith = function(suffix) 
{
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
function removeLast(str, part)
{
	if(str.endsWith(part))
	{
		return str.slice(0,-part.length);
	}
	return str;
}
function removeFirst(str, part)
{
	if(str.startsWith(part))
	{
		return str.substr(part.length);
	}
	return str;
}
function dynamicSort(property) 
{
	var sortOrder = 1;
	if(property[0] === "-") 
	{
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a,b) 
	{
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
}
function dynamicSortMultiple() 
{
	var props = arguments;
	return function (obj1, obj2) 
	{
		var i = 0, result = 0, numberOfProperties = props.length;
		while(result === 0 && i < numberOfProperties)
		{
			result = dynamicSort(props[i])(obj1, obj2);
			i++;
		}
		return result;
	}
}
function getFunctionBody(fn)
{
	//Get the function body from a function
	return fn.toString().slice(fn.toString().indexOf("(") + 1, fn.toString().lastIndexOf("}"));
}
function getFunctionAsObjString(name, fn, comma)
{
	//Get the function in object item format
	return name + ": function(" + getFunctionBody(fn) + " }" + (comma ? "," : "");
}

function XGDownloadLink(network, name, channel, bot, pack, filename, filesize)
{
	var self = this;
	this.network = network;
	this.name = name;
	this.channel = channel;
	this.bot = bot;
	this.pack = pack;
	this.filename = filename;
	this.filesize = filesize;
	
	this.format = function()
	{
		var p = -1;
		if((p = self.network.indexOf("//")) > -1)
		{
			self.network = removeFirst(removeLast("irc:" + self.network.substr(p), "/"), "/").toString();
		} else
		{
			self.network = removeFirst(removeLast(self.network, "/"), "/").toString();
		}
		self.name = removeFirst(removeLast(self.name, "/"), "/").toString();
		self.channel = removeFirst(removeLast(self.channel, "/"), "#").toString();
		self.bot = removeLast(self.bot, "/").toString();
		self.pack = removeFirst(removeLast(self.pack, "/"), "#").toString();
		self.filename = removeLast(self.filename, "/").toString();
	}
	
	this.getLink = function()
	{
		return "xdcc://" 
			+ self.network + "/"
			+ self.name + "/"
			+ "#" + self.channel + "/" 
			+ self.bot + "/"
			+ "#" + self.pack + "/"
			+ self.filename + "/";
	};
	
	this.format();
}

var SearchProvider =
{
	OnReset: function(){},
	OnError: function(message){},
	OnLoad: function(results){},
	OnLoading: function(){},
	OnEnd: function(){},
	Providers: {},
	Create: function(name, url, parsePageFn, getPageNumberFn)
	{
		SearchProvider.Providers[name] = 
		{
			Name: name,
			Url: url,
			ParsePage: parsePageFn,
			getPageNumberFn: getPageNumberFn,
			GetPageNumber: function()
			{
				if(SearchProvider.Current.getPageNumberFn)
				{
					return SearchProvider.Current.getPageNumberFn(SearchProvider.Current.Page);
				}
				return SearchProvider.Current.Page;
			},
			Search: function(term)
			{
				SearchProvider.ResetCurrent();
				term = term.trim();
				if(self.term === "")
				{
					SearchProvider.OnError("Please enter a valid search term");
					return;
				}
				SearchProvider.Current.Term = term;
				console.log("Searching for " + term + " using " + SearchProvider.Current.Name);
				SearchProvider.Current._LoadPage();
			},
			_LoadPage: function()
			{
				var self = SearchProvider.Current;
				
				if(self.Loading)
				{
					return;
				}
				
				if(self.Page != 1 && self.Page - 1 >= self.MaxPage)
				{
					SearchProvider.OnEnd();
					return;
				}
				
				self.Loading = true;
				SearchProvider.OnLoading();
				
				var url = self.Url.format(self.Term, self.GetPageNumber(self.Page));
				console.log("Loading page: " + url);
				
				setTimeout(function()
				{
					GM_xmlhttpRequest(
					{
						method: "GET",
						url: url,
						onload: function(response) 
						{
							self.Page++;
							
							console.log("Loaded");
							//Load the results into a new DOM
							var parser = new DOMParser();
							var responseDoc = parser.parseFromString(response.responseText, "text/html");
							
							console.log("Parsing data");
							try
							{
								var results = self.ParsePage(self, responseDoc);
								self.MaxPage = results.pageCount;
								self.Loading = false;
								
								console.log("Parsed - p" + (self.Page-1) + "/" + self.MaxPage);
								SearchProvider.OnLoad(results);
							} catch(ex)
							{
								var msg = ex.message;
								if(msg.indexOf("Error") == -1)
								{
									msg = "Parsing Failed: " + msg;
								}
								SearchProvider.ResetCurrent();
								SearchProvider.OnReset();
								SearchProvider.OnError(msg);
								self.Loading = false;
							}
						}
					});
				}, 0);
			}
		};
		console.log("Created search provider " + name);
	},
	Load: function()
	{
		var providerName = localStorage.getItem("xg_searchprovider");
		
		if(!providerName)
		{
			for(var pn in SearchProvider.Providers) 
			{
				providerName = pn;
				break;
			}
		}
		SearchProvider.Select(providerName);
	},
	Select: function(providerName)
	{
		SearchProvider.Current = SearchProvider.Providers[providerName];
		SearchProvider.ResetCurrent();
		localStorage.setItem("xg_searchprovider", providerName);
		console.log("Selected: " + providerName);
	},
	ResetCurrent: function()
	{
		SearchProvider.Current.Loading = false;
		SearchProvider.Current.Page = 1;
		SearchProvider.Current.MaxPages = 1;
		SearchProvider.Current.Term = null;
		
		SearchProvider.OnReset();
	},
	Current: null
}

var XGGui = 
{
	Init: function()
	{
		window.addEventListener("load", XGGui._Load);
	},
	_Load: function()
	{
		var $ = unsafeWindow.$;
		XGGui._CreateSearchPage($);		
	},
	_CreateSearchPage: function($)
	{
		console.log("Creating search page");
		
		//Create the search page
		var $div = $('<div class="item" style="padding-top: 20px;">'
			+ '\t<select id="searchprovider" class="form-control" style="width: 150px; display: inline-block; margin: 0 10px">' + '</select>'
			+ '\t<input style="display: inline-block; width: 400px;" type="text" id="customsearch" class="search-query form-control" placeholder="Search" tabindex="2">'
			+ '\t<hr>'
			+ '\t<div style="padding:10px; overflow: auto" id="searchresults"><span style="padding-top:20px; display: block">No Results</spann></div>'
			+ '</div>');
		$("#mainCarousel .carousel-inner").append($div);
		
		var select = $("#searchprovider");
		for(var k in SearchProvider.Providers)
		{
			var opt = $("<option/>").text(k);
			if(k == SearchProvider.Current.Name)
			{
				opt.attr("selected", true);
			}
			select.append(opt);
		}
		select.change(function()
		{
			SearchProvider.Select(select.children(":selected").text());
		});
		
		$("#customsearch").keyup(function(e)
		{
			if(e.keyCode == 13)
			{	
				SearchProvider.Current.Search.call(SearchProvider.Current, this.value);
			}
		});
		
		var $results = $("#searchresults");
		var infi = false;
		
		function infiniteScroll()
		{
			if(!SearchProvider.Current.Loading && $(document).height() - $(window).height() - $(window).scrollTop() <= 600)
			{
				console.log("Infinite scroll - next page");
				SearchProvider.Current._LoadPage();
			}
		}
		
		SearchProvider.OnEnd = function()
		{
			console.log("Infinite scroll - disabled");
			$(window).off('scroll', infiniteScroll);
			infi = false;
			$results.append('<h4>' + "End of results" + '</h4>');
		}
		
		SearchProvider.OnReset = function()
		{
			$results.empty();
		};
		
		SearchProvider.OnError = function(message)
		{
			$results.append('<span style="padding-top:20px; display: block">' + message + '</span>');
		};
		
		SearchProvider.OnLoad = function(results)
		{
			$("#searchLoadingText").remove();
			$("#searchLoading2").remove();
			
			if(results == null || results.items == null || results.items.length == 0)
			{
				SearchProvider.OnError("No results");
				return;
			}
			
			if(!infi)
			{
				console.log("Infinite scroll - enabled");
				$(window).on('scroll', infiniteScroll);
				infi = true;
			}
			
			var $table;
			if(SearchProvider.Current.Page == 2)
			{
				$results.empty();
				//Create the results table
				$table = $("<table style='width: auto' class='table table-hover' id='resultstable'><thead><tr style='font-size:1.2em; line-height: 30px; font-weight: bold'><td>Network</td><td>Channel</td><td>Bot</td><td>Filename</td><td>Size</td><td>D/L</td><td>URL</td></thead></table>");
			} else 
			{
				$table = $("#resultstable");
				$table.append("<tr><td colspan='7'>" + "<h4>Page " + (SearchProvider.Current.Page - 1) + "</h4></td></tr>")
			}
			
			//Sort the results by network->channel->bot
			results.items.sort(dynamicSortMultiple("network", "channel", "bot"));

			console.log(results.items.length + " results");

			//And populate
			for(var i = 0; i < results.items.length; i++)
			{
				var r = results.items[i];
				
				var tr = $("<tr><td style='color: #999999; padding-right: 25px'>" 
					+ r.network + "</td><td style='color: #999999; padding-right: 25px'>" 
					+ r.channel + "</td><td style='color: #999999; padding-right: 25px'>"
					+ r.bot + "</td><td style='padding-right: 25px'>" 
					+ r.filename + "</td><td style='padding-right: 25px'>" 
					+ r.filesize + "</td></tr>");
 
				var a = $("<a href='#'><span class='glyphicon glyphicon-cloud-download'></span></a>").data("xdcc", r.getLink());
				tr.append($("<td/>").append(a));
				
				var url = $("<a href='#'><span class='glyphicon glyphicon-link'></span></a>").data("xdcc", r.getLink());
				tr.append($("<td/>").append(url));
				
				$table.append(tr);
				
				//Setup download handler
				a.click(function()
				{
					this.style.color = "green";
					
					unsafeWindow.XGGui.addDownloadLink($(this).data("xdcc"));
				});
				
				url.click(function()
				{
					alert($(this).data("xdcc"));
				});
			}
			
			$results.append($table);
			infiniteScroll();
		};
		
		SearchProvider.OnLoading = function()
		{
			$results.append('<span id="searchLoading2" class="glyphicon glyphicon-asterisk animate-spin ScarletRedMiddle navbar-left" style="display: inline-block"></span>');
			$results.append('<span id="searchLoadingText" style="border-left: 10px solid white">' + "Loading" + '</span>');
		};
	},
	Extern: 
	{
		addButton: function(title, icon, slideId)
		{
			console.log("Adding button " + title + " id=" + slideId);
			//Create menu item
			var el = $('<li><a class="carousel-link" href="#"><span class="glyphicon glyphicon-'
						+ icon 
						+ ' glyphiconBig" title="'
						+ title 
						+ '"></span></a></li>')
				.data("slide", slideId);
			
			//Add it to the header
			$("ul.nav").append(el);
			
			//On click, navigate to the specified slide
			el.click(function()
			{
				console.log(title + " clicked");
				
				$(".carousel-link").parent().removeClass("active");
				$(this).addClass("active").parent().addClass("active");
			
				currentSlide = $(this).data("slide");
				$("#mainCarousel").carousel(currentSlide);
	
				searchForm.hide(showEffect);
			}); 
		},
		addDownloadLink: function(uri)
		{
			$("#xdccLink").val(uri);
			addXdccLink();
		}
	}
}

var XGOverride = 
{
	Init: function()
	{
		window.addEventListener('beforescriptexecute', XGOverride._ScriptLoadHandler);
	},
	_ScriptLoadHandler: function(e)
	{
		//Check if we are about to load the gui
		if(e.target.src.lastIndexOf("/js/xg/gui.js") > -1)
		{
			console.log("GUI script loading");
			console.log("Removed beforescriptexecute listener");
			window.removeEventListener('beforescriptexecute', XGOverride._ScriptLoadHandler);
			
			console.log("Getting script data...");
			//Load the script
			GM_xmlhttpRequest({
				method: "GET",
				url: e.target.src,
				onload: function(response) 
				{
					XGOverride._RewriteScript(response.responseText);
				}
			});
			
			//Dont let it load
			e.preventDefault();
			e.stopPropagation();
		}
	},
	_RewriteScript: function(js)
	{
		console.log("Rewriting GUI script");

		//Locate the initializeCarousel function
		var find = "function initializeCarousel";
		var pos = js.indexOf(find) + find.length;
		pos = js.indexOf("{", pos) + 1;
		
		//Add a timeout to it
		js = js.substr(0, pos) 
			+ "\n\t\t"
			+ "setTimeout(function() { self.addButton('Search', 'search',  5); }, 0)"
			+ js.substr(pos);

		//Locate the self object
		find = "var self = {";
		pos = js.indexOf(find) + find.length;
		
		console.log("Object definition at: " + pos);
		
		//Add our two methods to it
		js = js.substr(0, pos) 
			+ "\n\t\t"
			+ getFunctionAsObjString("addButton", XGGui.Extern.addButton, true)
			+ getFunctionAsObjString("addDownloadLink", XGGui.Extern.addDownloadLink, true)
			+ js.substr(pos);
			
		console.log("Adding rewritten script to page");
		document.head.appendChild(document.createElement('script'))
		.innerHTML = js;
	}
}

console.log("XGOverride Init");
XGOverride.Init();

SearchProvider.Create("Sun XDCC", "http://sunxdcc.com/?sterm={0}&p={1}", function(self, responseDoc)
{
	var $ = unsafeWindow.$;
	console.log("Parsing using Sun XDCC");
	var results = [];
	var x = $(responseDoc).find("#search_div").children("#attributes").each(function()
	{
		var bot = $(this);
		do
		{
			bot = bot.prev();
		} while(bot.attr("id") != "bot_div");
				
		var s = $(this).children("#filename_desc").children("a").attr("href");
		var p = s.lastIndexOf("/");

		//Store the results
		results.push(new XGDownloadLink(
			s.substring(6, p+1),
			s.substring(6, p+1),
			s.substr(p+1),
			$.trim(bot.text()).substr($.trim(bot.text()).lastIndexOf(" ")+1),
			$.trim($(this).children("#pack_value").text()),
			$.trim($(this).children("#filename_desc").text()),
			$(this).children("#size_value").text().trim().substr(0, 6)));
	});
	
	var href = $(responseDoc).find("#sterm").parent().parent().children(":last")[0].href;
	var p = href.indexOf("p=");

	return { items: results, pageCount: href.substring(p+2, href.indexOf("&", p)) };
});

SearchProvider.Create("nibl", "http://nibl.co.uk/bots.php?search={0}", function(self, responseDoc)
{
	var tables = responseDoc.getElementsByClassName("botlist");
	if(tables.length == 0)
	{
		throw { message: responseDoc.getElementsByClassName("title")[0].textContent };
	}
	var table = tables[0];
	var results = [];
	for(var i = 1; i < table.rows.length; i++)
	{
		var tr = table.rows[i];
		results.push(new XGDownloadLink(
					"irc.rizon.net",
					"Rizon",
					"#nibl",
					removeLast(tr.cells[0].textContent, " [s]"),
					tr.cells[1].textContent,
					removeLast(tr.cells[3].textContent, " [s] [get]"),
					tr.cells[2].textContent));
	}
	return { items: results, pageCount: 1 };
});

SearchProvider.Create("XDCC Finder", "http://www.xdccfinder.com/results.php?kw={0}&bt=&ch=&nw=&order=2&s={1}", function(self, responseDoc)
{
	var table = responseDoc.getElementById("tables");
	var results = [];
	for(var i = 1; i < table.rows.length; i += 2)
	{
		var tr = table.rows[i];
		results.push(new XGDownloadLink(
			tr.cells[5].children[0].href.substr(6, tr.cells[5].children[0].href.lastIndexOf("/")-5),
			tr.cells[1].children[0].textContent,
			tr.cells[2].children[0].textContent,
			tr.nextSibling.cells[0].children[2].children[1].textContent,
			tr.cells[5].children[0].textContent,
			tr.cells[0].children[0].title,
			tr.cells[3].textContent));	
	}
	return { items: results, pageCount: responseDoc.getElementById("pagination").lastChild.previousSibling.textContent.trim() };
}, function(page)
{
	return (page - 1) * 20;
});

console.log("Loading search provider");
SearchProvider.Load();

console.log("XGGui Init");
XGGui.Init();