// ==UserScript==
// @name        Clean Search
// @namespace   http://se7en-soft.com
// @include     *://www.google.com/*
// @require		http://cdnjs.cloudflare.com/ajax/libs/linq.js/2.2.0.2/linq.min.js
// @require 	http://cdnjs.cloudflare.com/ajax/libs/gsap/1.11.2/TweenMax.min.js
// @require		http://se7en-soft.com/cdn/js/synthev/synthev.min.enc.js
// @version     1.0.6
// ==/UserScript==

const _arrowRight = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAArElEQVRYhe3W0Q1AQBAE0LkQbWlAQyrQ0DWgLQnnF4nDzrAh9ldiXza3cxdSSvCs0rX7D3gtoG5j7uQWfddMtwIAVACGnW8jgHD2R4FZw9wk+q45haAACgQNYBESAIOQAawIKcCCWAEO9ltSW8TjSVi3MS0RLlG8RLgAXCewPQPuWyCdgCUHZABrEkoAzF1AA9jbkAIo3gNmgKK5GaBqDtyQA1frnc/yH/ApwAyYJWxt0i7qygAAAABJRU5ErkJggg==";
const _arrowUp = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAw0lEQVRYhe3XwQ3CMAwFUAdVjEUXYKB2AgaiCzAY+twQh9T530byJZF6TP+r0zhtA2CVYylNNzMDEL5u2xOZ+QCsRZdg3Y/vxNfj3qIFCAF+w7MIGdALzyAkgBceRdAAJjyCoABKuIoYAiLhCsIFZMJZRBew7sfFzN7ZcAZxBnC32lkfiGxR6SwYlXOESAHYt1pFUAC1uSiIISDa41mEC8iccizCA1wz4SyiC8g+uXK/8k+yCZiACZiA8J/Rv0Z5BcoBHzKZ1llBrft+AAAAAElFTkSuQmCC";
const _eyeIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAALVWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4yLjItYzA2MyA1My4zNTI2MjQsIDIwMDgvMDcvMzAtMTg6MTI6MTggICAgICAgICI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICB4bWxuczpJcHRjNHhtcENvcmU9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBDb3JlLzEuMC94bWxucy8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczp4bXBSaWdodHM9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvIgogICBwaG90b3Nob3A6QXV0aG9yc1Bvc2l0aW9uPSJBcnQgRGlyZWN0b3IiCiAgIHBob3Rvc2hvcDpDcmVkaXQ9Ind3dy5nZW50bGVmYWNlLmNvbSIKICAgcGhvdG9zaG9wOkRhdGVDcmVhdGVkPSIyMDEwLTAxLTAxIgogICBJcHRjNHhtcENvcmU6SW50ZWxsZWN0dWFsR2VucmU9InBpY3RvZ3JhbSIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxMC0wMS0wM1QyMTozMzoxMyswMTowMCIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkM1QjRGMjNDODFGN0RFMTE5RUFCOTBENzA3OEFGOTRBIgogICB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkM1QjRGMjNDODFGN0RFMTE5RUFCOTBENzA3OEFGOTRBIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQxNUQzODM3QTdGOERFMTE4MjFDRTRCMkM3RTM2RDcwIj4KICAgPElwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8KICAgIElwdGM0eG1wQ29yZTpDaUFkckNpdHk9IlByYWd1ZSIKICAgIElwdGM0eG1wQ29yZTpDaUFkclBjb2RlPSIxNjAwMCIKICAgIElwdGM0eG1wQ29yZTpDaUFkckN0cnk9IkN6ZWNoIFJlcHVibGljIgogICAgSXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPSJrYUBnZW50bGVmYWNlLmNvbSIKICAgIElwdGM0eG1wQ29yZTpDaVVybFdvcms9Ind3dy5nZW50bGVmYWNlLmNvbSIvPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNUI0RjIzQzgxRjdERTExOUVBQjkwRDcwNzhBRjk0QSIKICAgICAgc3RFdnQ6d2hlbj0iMjAxMC0wMS0wMlQxMDoyODo1MSswMTowMCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iL21ldGFkYXRhIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjE4M0NBMDAyREJGN0RFMTFBOTAwODNFMEExMjUzQkZEIgogICAgICBzdEV2dDp3aGVuPSIyMDEwLTAxLTAyVDIxOjExOjI4KzAxOjAwIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvbWV0YWRhdGEiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6RDE1RDM4MzdBN0Y4REUxMTgyMUNFNEIyQzdFMzZENzAiCiAgICAgIHN0RXZ0OndoZW49IjIwMTAtMDEtMDNUMjE6MzM6MTMrMDE6MDAiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii9tZXRhZGF0YSIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgIDxkYzp0aXRsZT4KICAgIDxyZGY6QWx0PgogICAgIDxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Z2VudGxlZmFjZS5jb20gZnJlZSBpY29uIHNldDwvcmRmOmxpPgogICAgPC9yZGY6QWx0PgogICA8L2RjOnRpdGxlPgogICA8ZGM6c3ViamVjdD4KICAgIDxyZGY6QmFnPgogICAgIDxyZGY6bGk+aWNvbjwvcmRmOmxpPgogICAgIDxyZGY6bGk+cGljdG9ncmFtPC9yZGY6bGk+CiAgICA8L3JkZjpCYWc+CiAgIDwvZGM6c3ViamVjdD4KICAgPGRjOmRlc2NyaXB0aW9uPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5UaGlzIGlzIHRoZSBpY29uIGZyb20gR2VudGxlZmFjZS5jb20gZnJlZSBpY29ucyBzZXQuIDwvcmRmOmxpPgogICAgPC9yZGY6QWx0PgogICA8L2RjOmRlc2NyaXB0aW9uPgogICA8ZGM6Y3JlYXRvcj4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGk+QWxleGFuZGVyIEtpc2VsZXY8L3JkZjpsaT4KICAgIDwvcmRmOlNlcT4KICAgPC9kYzpjcmVhdG9yPgogICA8ZGM6cmlnaHRzPgogICAgPHJkZjpBbHQ+CiAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5DcmVhdGl2ZSBDb21tb25zIEF0dHJpYnV0aW9uIE5vbi1Db21tZXJjaWFsIE5vIERlcml2YXRpdmVzPC9yZGY6bGk+CiAgICA8L3JkZjpBbHQ+CiAgIDwvZGM6cmlnaHRzPgogICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgICA8cmRmOkFsdD4KICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPkNyZWF0aXZlIENvbW1vbnMgQXR0cmlidXRpb24gTm9uLUNvbW1lcmNpYWwgTm8gRGVyaXZhdGl2ZXM8L3JkZjpsaT4KICAgIDwvcmRmOkFsdD4KICAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz5TInZaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWNJREFUeNrcUjtug0AQ5VdAQ0BuUoKQKGjwDUyZLpR05gbxDULpMjeI06WLfQO7TAcNSmOJC1jaUBgiMOQNWiyk5ALJSm/n7czOb2cF4c8vcXrwff8GIhZFkTCf2vq+T4EN6CbLss8fATzPu4fTBjC4ag++584BRMA5A+I8z3d0lmlzXfcZynXXdSrkE3DXNM3H5XIJgdu2bdcItiI7EMAezWYz63Q67UTbth8RIwGYJEnh8Xg8WJa1GLNPWgiKojg4jrNAkC1UVGkiIVMCMGQKyJkuI2MAHcktgfOhBbpDd8mHfBUy8gwWREZ81GFdHxIVsZHXdW3gPHBZVdUCESOUFYEzGN81TUu5zgIMgCawOp/PX6ZpPoC/8veKhzC6ri/5iKiSPRkURWGTClK0YPApUSuMHrUsy5frGJHV50Hm49whttwcTv5FSv+kqqrs15+FzEvgTZblfgrSkU34f+tbgAEA3lru5BEocSAAAAAASUVORK5CYII=";
const _gearIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFGklEQVRYhbWYa2wUVRTHf7fdKgJREV8gPpAPGjRaI74hkQhEI+kpm97VRlEBNREEjPJBg6/ERDRojDWgGNCgIrgX271bBKNIgl98AJpIjBqjRIUSU7AgxCq6vX6YWTqdndnudnf/X3bOOffc+e2dO2fOjHLOEZYxZhiwHFimte4K+FudczcopZZrrX8pSKyBEhFwc4A3fPNW4MJA+F3/d4ExZobW+uMa8xUCAj8GjscbY14HtgMp3+cABXxRYzYAVMwlLnT6cs6hlOrVWg+vKZkv5Zxj48aNp7e0tBzw4a4AvioC6JRSCrhXa73GGDMZmKG1frImgOl0+gTgH9/eAVxVLME516eUqosIXa+1/qzagAlgUcCOg+sGzhhkrtXAJdWACiqBt+nj9C3QqLX+D8AYY4CWiHF/xPgrlnLOYYwZBXwETArF67TWA/5AOp0+pJQ6JeDarrW+sRZw4JcZrXWPMWZVCPC3MJyvD4HbAvaeWsHBwDp4dih2bkxOY8ieYowZrbU+WD2sfuUvcRrQEfG1Wut78oYxZr5zboVXZQrUprVenDey2exY51wKuBjYJCKbhgKYMMa0xcAB3G2MuRlvf14JTAT6gKgyc13QcM7dDrzom9cABYDZbHZMU1PT/qKAwOPAwiJjzgJmRwWccweB0QBKqWdC4dGB40Zr7Ykikq+3WGtPArqstTlgkYisjATUWv9pjHkO+B1424d5qdi/8uFMKpVKdXR0zHPO7U8mk5tDQ8aE7DnAawF7r/9b758vEjDuWbwNmBoD1qeUqlNKDUskEk8opZb6oRYReT8/zlrbCcwMpP4EJEXkG2vtDgZWjOdF5NFyAI8CI3yzG9gCjASSzrk+oK6+vv6FRCKxJJSaBlqBp4CleKtTiiaIyM8lAba3tzfkcrljAdckrfUuH3yrc+4m/y5e29DQ8L1SalmJEHHaKyJxJa2wH0wmk/8aYy7DW4GReThfM4BdzrklqVTqEwBr7YPAORUAjgg7rLVTgV4R+TzyEpcja+0YoGvQgcW1B3gLr9xN9H2HReTUagA2Al8XGXIE+A6v7Ewoc/rmqJY/VtlsdqRzbhxQp5Qa7pz7GzAxww8D00RkZ97h1751wKwSTrdBRGxZK2it7XDONcc86oI6JCKjisyzEnigSP6dIrIOol+aimlKieOmFwuKyHxr7V1E3CDAOBHZlzfKBdwALBhkzNHgZS2iV4CC4hyEg5hCPZistfPwinFU/dohIleXMMdsvDs3rLki8mZFgIGT7AYuDbl/FZHzS8h9mP5uJ0orgKfLvcQD5Jz7Eg+wz3cp4LxMJjO8ubn5r0FyW/3DvohwHd5WWjBkQGvtQqXU3MCEQa0HpEjuFKVUvlmI6i2Pa6h78FMGv6NXi8h9EblTgW0xOTuBHuAYHnhXWYCdnZ3Dcrlcbwl1MK9e4FVgN17j2wpcHjN2n4iMCzvLXsFMJrNHKXVBWUmlabqIbA07h7IHHwLW4PV+W/DeNcbjNaSVqI3+RuG4Km4W8rLWPgY8W+E0i0WkLeioJuBOvDe/UtUOXAuMDfnPFJHuvFFRHcwrm80mKISzeC3W5IiU00SkB8Ba+w5wRyDWhLeFgCqtoLX2fmBVwPWBiMz0Y9OA4KfiIyJycij/FmAzMEtEMsFYVVYQuChw/EMeDkBEtlprg2O7CUlEtuA9hQpUFUARecRaux6vOIe/3QC8R/8HpwPlzF2tFcRvsaLgAF7GA+yhzI/v/wOzouwP2nxzjAAAAABJRU5ErkJggg==";
const _infoBalloon = "data:image/png;base64,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";
const _reloadIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABhElEQVQ4jZXTO4zMURTH8c9f/vGI6KiWRCWLBKsRhfl3qqsQmyiQ0HkUCor514rb0tjGq9hkExoxfw3VVRDNLgVWlKtTKLzFGMXckcnEzMap7sn9fX/nnPsoer2e1aKqm3+KUgxFOSLchSsphmOrumbjcig5g+tYX9XN8xTDgTHcd5xLMdyBMsMncANr8BkPx8DfsAE3q7r5kWJYKFrtzhTeYBNWcDjFsDzaal4exD1sxSdMl7ic4S5mR+GRysuYxdPMXCpa7c57TOF+iuHomNZVdfMFW1IMX6u6eYAjWCkzDI/HwZBi2DiUPsoG24av8eMkg5H4qy3xW//0t/+HwUDbLVrtzhL24SVmUgwTn2ZVNwVeYA8WS9zGNezFWcytUv1ChuFW0Wp31mXHafzCRcyNdpIrn8dV/dFfY3/R6/VUdbMTT7A56xcxj1c5341TmMn5BxxKMbwtBr+xqpsduJtHmRRLOJ5ieAfF8Heu6qbESZzWf7Zr89ZPPNM/r/kUQ3fA/AEVH4BAd0w55AAAAABJRU5ErkJggg==";
var google, utils, storage, $m, $$m, previewOverlay,$,$$,gmEventHandler,gmEvents,frameHandler,SynthEv;
var favIconsEnabled = false, favIconHandler;
var spacebarPagingEnabled = false, gmKeyboardHandler;

const removeCornerGoogleLogo = false; //set this to 'true' if you want to hide the Google logo that's in the top-left corner of the search page.


//////////////////////////////////////////////////////////////////////////////////////////
// Entry point
//////////////////////////////////////////////////////////////////////////////////////////
(function(){
	utils = new Utils();
	$ = utils.$;
	$$ = utils.$$;
	$m = utils.$m;
	$$m = utils.$$m;
	gmKeyboardHandler = new KeyboardHandler();
	SynthEv = new SyntheticEventFactory();
	frameHandler = new IFrameUrlHandler();
	gmEventHandler = new EventHandler();
	gmEvents = new Events();
	favIconHandler = new FavIconHandler();

	setTimeout(Main,500);			
})()

function Main(){
	
	function registerEvents(name, handler){
		gmEvents.Register(name, handler);
	}
		
	var uri = utils.ParseUrl(document.location);
	if(uri === undefined) return;
	
	/////////////////////////////////////////////////////////////////
	// CLEAR ALL SAVED SETTINGS
	/////////////////////////////////////////////////////////////////
	//store.clear();
	/////////////////////////////////////////////////////////////////
	
	if(uri.domain === "google"){
		//create a new Google class instance
		google = new Google();

		var events = [[gmEvents.Names.RequestPreviewToggle, gmEventHandler.TogglePreviewPane],
					  [gmEvents.Names.PreviewPaneModNeeded, gmEventHandler.PreviewPaneModifier],
					  [gmEvents.Names.RequestIFrameDomainRemoval, gmEventHandler.BanDomainFromIFramePreviewing],
					  [gmEvents.Names.FavIconsEnabledChanged, gmEventHandler.FavIconsEnabledChanged]];
		
		for(var i = 0; i < events.length; i++){
			var evt = events[i];
			registerEvents(evt[0], evt[1]);
		}
		
		if(uri.params["tbm"] && uri.params["tbm"] == "isch"){
			//this is google image search
			var newSearchDestination = uri.protocol + "://" + uri.host + "/search?q=" + uri.params["q"] + "&num=" + uri.params["num"] + "&tbm=isch&source=univ"
			if(document.location != newSearchDestination)
				document.location = newSearchDestination;
		} else {
			google.Initialize();
		}

	}
}

//////////////////////////////////////////////////////////////////////////////////////////

function FavIconHandler(){
	//icon.src = "https://getfavicon.appspot.com/" + encodeURI("http://" + pUrl.host);
	const prefix = "https://getfavicon.appspot.com/";
	return {
		GetIconForHost: function(host, imgId, callback){
			var img = new Image();
			img.onload = function(){
				if(callback)
					callback({id: imgId, src: img.src});
			};
			img.src = prefix + encodeURI('http://' + host);
		},
	};
}

function IFrameUrlHandler(){
	
	const invalidFrameUrls = "gCleanSearch.InvalidIFrameURLs";

	return {
		AddInvalidDomain: function(domain){
			var exDomains = lStore.Get(invalidFrameUrls);
			if(exDomains){
				if(exDomains.indexOf(domain) == -1){
					exDomains += "," + domain;
					lStore.Set(invalidFrameUrls, exDomains)
				}
			} else
				lStore.Set(invalidFrameUrls, domain);
		},
		
		RemoveInvalidDomain: function(domain){
			var exDomains = lStore.Get(invalidFrameUrls);
			if(exDomains && exDomains.indexOf(domain) != -1){
				if(utils.StartsWith(exDomains, domain))
					exDomains = utils.TrimStart(exDomains.substring(domain.length + 1),',');
				else if (utils.EndsWith(exDomains, domain))
					exDomains = utils.TrimEnd(utils.TrimEnd(exDomains, domain), ',');
				else
					exDomains = utils.Trim(exDomains.split(',' + domain), ',')
					
				lStore.Delete(invalidFrameUrls);
				lStore.Set(invalidFrameUrls, exDomains);
				return exDomains.indexOf(domain) == -1;
			}
			return false;
		},
		
		GetInvalidDomains: function(){
			return lStore.Get(invalidFrameUrls);
		},
				
		IsInvalidDomain: function(domain){
			var domains = lStore.Get(invalidFrameUrls);
			return domains && domains.indexOf(domain) != -1;
		},
		
		ClearAll: function(){
			lStore.Del(invalidFrameUrls);
		}
	};
}

//////////////////////////////////////////////////////////////////////////////////////////
// Storage
//////////////////////////////////////////////////////////////////////////////////////////

var lStore = (function LocalStorage(){

	return {
		Get: function(key){
			var obj = window.localStorage.getItem(key);
			if(obj)
				return JSON.parse(obj);
			return undefined;
		},
		
		Set: function(key, value){
			if(!key) return;
			window.localStorage.setItem(key, JSON.stringify(value));
		},
		
		Del: function(key){
			window.localStorage.removeItem(key);
		},
		
		Clear: function(){
			window.localStorage.clear();
		},
		
		ItemAt: function(index){
			var obj = window.localStorage.key(index);
			if(obj)
				return JSON.parse(obj);
			return undefined;
		},
		
		Count: function(){
			return window.localStorage.length;
		}
	};
})();
////////////////////////////////////////////////////////////////////////////////////////////

function EventHandler(){
	return {

		FavIconsEnabledChanged: function(e){
			favIconsEnabled = e.Args.state;
			lStore.Set("gmCleanSearch.FavIconsEnabled", favIconsEnabled.toString());
			resultViewPanel.SetFaviconDisplayState(favIconsEnabled);
			previewOverlay.SetFaviconDisplayState(favIconsEnabled);
		},
		

		BanDomainFromIFramePreviewing: function(e){
			var domain = e.Args.domain,
				itemId = e.Args.itemId,
				itemArr = [],
				resultItems = resultViewPanel.GetItemsInDomain(domain),
				previewItems = previewOverlay.GetItemsInDomain(domain),
				i;
			

			itemArr = resultItems.concat(previewItems);
			

			var proceed = confirm("Are you sure you want to remove '" + domain + "' from the preview list?\nThis action will remove all results from the same domain.");
			if(proceed){
				
				frameHandler.AddInvalidDomain(domain);
				
				for(var i = 0; i < itemArr.length; i++){
					var itm = itemArr[i],
						rtype = itm.Type,
						itmId = itm.ItemId;

					if(rtype == "preview"){
						var sPanel = previewOverlay.ScrollPanel,
							itmIdx = previewOverlay.GetItemIndex(itmId),
							nextToSelect,
							selItem,
							min;
						
						previewOverlay.RemoveItemsInDomain(domain, function(e){
							//alert(e);
							selItem = previewOverlay.GetSelectedItem();
							
							if(!selItem){
							
								if(itmIdx <= sPanel.children.length){
									nextToSelect = sPanel.children[itmIdx];
								} else {
									if(sPanel.children)
										nextToSelect = sPanel.children[0];
								}
								
								if(!nextToSelect){
									min = Math.min.apply(Math,e);
									if(min - 1 >= 0 && sPanel.children.length >= min - 1)
										nextToSelect = sPanel.children[min - 1];
									else if(min + 1 <= sPanel.children.length)
										nextToSelect = sPanel.children[min + 1];
								}
																
								if(nextToSelect) {
									var nextId = previewOverlay.GetItemId(nextToSelect);
									previewOverlay.LoadItemUri(nextId);	
									previewOverlay.ScrollToItem(nextId);
								}
								
							}
						
						});
						
					} else if(rtype == "search"){
						resultViewPanel.RemovePreviewForDomain(domain);
					}
				}
			}
		},
	
		TogglePreviewPane: function(e){
			previewOverlay.SetDisplayState(e.Args.show, e.Args.url);
		},
		
		PreviewPaneModifier: function(e){
			previewOverlay.ModifySelf(e);
		},
		
	};
};

function Events(){

	return {
		Register: function(eventName, handler){
			if(!SynthEv.IsEventRegistered(eventName))
				return SynthEv.RegisterEvent(eventName, handler);
			else
				return SynthEv.AddEventListener(eventName, handler);
		},
		
		RemoveHandler: function(eventName, handlerId){
			if(SynthEv.IsEventRegistered(eventName))
				SynthEv.RemoveEventHandlerByID(eventName, handlerId);
		},
		
		UnregisterEvent: function(eventName){
			if(SynthEv.IsEventRegistered(eventName))
				SynthEv.UnregisterEvent(eventName);
		},
		
		Dispatch: function(eventName, args){
			if(SynthEv.IsEventRegistered(eventName))
				SynthEv.DispatchEvent(eventName, args);
		},
		
		Names: {
			RequestPreviewToggle: "EVENT:RequestTogglePreviewPane",
			PreviewPaneModNeeded: "EVENT:RequestModifyPreviewPane",
			RequestIFrameDomainRemoval: "EVENT:RequestIFrameDomainRemoval",
			FavIconsEnabledChanged: "EVENT:FavIconsEnabledChanged"
		},
		
		GetBase: function(){ return SynthEv; }
	};
};

function KeyboardHandler(){
	return{

		ListenToKeys: function(e){
			if(e.keyCode === 32 && utils.ToBool(lStore.Get("gmCleanSearch.SpacebarPagingEnabled"))){
				
				var cs = document.documentElement.scrollTop || document.body.scrollTop;
				var th = document.body.offsetHeight;
				var vh = document.documentElement.clientHeight;
				if(th <= cs + vh && pageModule.CanGoForward())
					pageModule.GoForward();
			}
		},
	};
};

//http://www.youtube.com/watch?v=wT1UR6qEgdg
//<iframe width="640" height="360" src="//www.youtube.com/embed/wT1UR6qEgdg?feature=player_detailpage" frameborder="0" allowfullscreen></iframe>


//////////////////////////////////////////////////////////////////////////////////////////
// Google functions
//////////////////////////////////////////////////////////////////////////////////////////

function Google(){
	return {
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Insert Styles Function
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		InsertStyles: function(){
			var googleStyle = ".gResultWrapper" + 
							  "{" + 
							  "		box-shadow:4px 4px 3px #AEAEAE;border-radius:4px;border:1px solid #E4E4E4;background:#F2F2F2;max-width:560px;margin-left:auto;margin-right:auto;min-width:560px;" +
							  "}" + 
							  ".gResultWrapper:hover" + 
							  "{" + 
							  "		box-shadow:4px 4px 3px #717171;" +
							  "}" +
							  ".gResultBoxSpecial{" +
							  "		max-width:560px !important;width:560px !important;min-width:560px !important;" +
							  "}" +
							  ".gResultTitleBox{" + 
							  "		border-bottom:1px solid silver;border-bottom:none;border-radius:4px 4px 0 0;background:#DADADA;padding:5px;" +
							  "}" +
							  ".gResultBodyBox{" + 
							  "		border-radius:0 0 4px 4px;padding:10px;" +
							  "}" +
							  ".gResultContainer{" +
							  "		border:1px solid silver;border-radius:4px;background:#F0F0F0;padding:5px;padding-bottom:0;margin-bottom:15px;" +
							  "}" +
							  ".gResultWrapperOverride{" +
							  "		box-shadow:none!important;" +
							  "}" +
							  ".gResultFlatBox{" +
							  "		box-shadow:0 0 4px #AEAEAE; margin-top:10px;margin-bottom:-10px;" +
							  "}" +
							  ".gResultFlatBox:hover{" +
							  "		box-shadow:0 0 4px #717171;" +
							  "}" +
							  ".gDockedSearch{" +
							  "		position:fixed !important;top: 0; left:0;background:#F1F1F1 !important;width:100%;border:1px solid #E4E4E4;border-right:none;border-top:none;border-left:none;z-index:10;box-shadow:-1px 0 8px #989898;" +
							  "}" + 
							  ".gFullScreenWidth{" +
							  "		min-width:100% !important;" +
							  "}" +
							  ".gCentered{" +
							  "		margin-left:auto;margin-right:auto;" +
							  "}" +
							  ".gResultTable{" +
							  "		margin-bottom:40px;margin-top:130px;display:table;" +
							  "}" +
							  ".gResultTablePadTopKappBar{" +
							  "		margin-top:140px;" +
							  "}" +
							  ".gResultTablePadTop{" + 
							  "		margin-top:340px;" +
							  "}" +
							  ".gResultTablePadTop2{" +
							  "		margin-top:400px;" +
							  "}" +
							  ".gCutoff{" +
							  "		overflow-x:hidden;" +
							  "}" +
							  ".gNavBorder{" +
							  "		position:fixed;bottom:40%;z-index:5;" +
							  "}" +
							  ".gNBInnerBorder{" +
							  "		background:#F2F2F2;border:1px solid silver;border-left:none;border-right:none;padding:10px;" +
							  "}" +
							  ".gNBInnerBorderCollapsed{" +
							  "		padding:0 !important;" +
							  "}" +
							  ".gNBOuterBorder{" +
							  "		background:#F2F2F2;border:1px solid silver;border-left:none;border-radius:0 4px 4px 0;padding:10px;margin-left:-2px;cursor:pointer;" +
							  "}" +
							  ".gNBInnerTable{" +
							  "		border-collapse:collapse;border-spacing:0;" +
							  "}" +
							  ".mw #nyc{" +
							  "		margin-left:637px !important;z-index:1;top:130px !important;margin-top:20px !important;" +
							  "}" +
							  ".gKappBarExpander{" +
							  "		border:1px solid #646464;border-radius:2px;background:#484848;width:24px !important;height:24px !important;" +
							  "}" + 
							  ".obcontainer{" +
							  "		max-width:515px;margin-left:10px;" +
							  "}" + 
							  ".gPreviewOverlay{" +
							  "		position:fixed;top:0;left:0;background:rgba(24, 24, 24,.9);z-index:5 !important;width:100% !important;visibility:hidden;" +
							  "}" +
							  ".gPreviewOuterPane{" +
							  "		border:1px solid black;margin-left:auto;margin-right:auto;display:table;background:white;" +
							  "		background: #353635;position:relative;" +
							  "}" +
							  ".gPreviewInnerPane{" +
							  "		" +
							  "}" + 
							  ".gPreviewSidebar{" +
							  "		min-width:250px;" +
							  "}" +
							  ".gClear{" +
							  "		clear:both;" +
							  "}" +
							  ".gPreviewContainerTable{" +
							  "		border-collapse:collapse; border-spacing:0;" +
							  "}" +
							  ".gPreviewFrame{" +
							  "		width:1220px;height:100%;border:none;background-color:white;position:absolute;top:0;left:0;" +
							  "}" +
							  ".gPreviewPaneClose{" +
							  "		border:1px solid silver; border-radius:2px;background:white;float:right;margin-top:2px;margin-right:5px;width:18px;height:18px;text-align:center;cursor:default;line-height:18px;" +
							  "}" +
							  ".gPreviewPaneClose:hover{" +
							  "		background:#ECECEC;" +
							  "}" +
							  "#gPreviewPaneOpenInTab{" +
							  "		margin-left:10px;margin-top:10px;display:table;color:silver;" +
							  "}" +
							  "#gPreviewPaneOpenInTab:hover{" +
							  "		color:#E3E3E3;cursor:default;" +
							  "}" +
							  "#gPreviewPanelItemPanel{" +
							  "		border:1px solid #989898;border-radius:4px;overflow-y:hidden;overflow-x:hidden;max-width:280px;margin-left:auto;margin-right:auto;height:715px;margin-top:20px;" +
							  "		background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0));background-color: #404040;box-shadow: inset 0 1px 4px rgba(170, 170, 170, 0.8)" +
							  "}" +
							  "#gPreviewPanelItemScrollPanel{" +
							  "		overflow:hidden;" + 
							  "}" + 
							  ".pvLinkOuterContainer{" +
							  "		border:1px solid black;border-radius:4px;width:268px;margin:5px;margin-bottom:10px;cursor:pointer;" +
							  "}" +
							  ".pvLinkInnerContainer{" +
							  "		border:1px solid #E4E4E4;border-radius:4px;padding:3px;background: linear-gradient(to bottom, #e2e2e2 0%,#dbdbdb 42%,#d1d1d1 64%,#dbdbdb 100%);" +
							  "}" +
							  ".pvLinkInnerContainerSelected{" +
							  "		background: linear-gradient(to bottom, #e2e2e2 0%,#dbdbdb 24%,#a8a8a8 64%,#a0a0a0 100%) !important;border:2px solid orange;" +
							  "}" + 
							  ".pvLinkInnerContainerPreSelected{" +
							  "		border:1px solid yellow;" +
							  "}" +
							  ".pvLinkInnerContainer:hover{" +
							  "		background: linear-gradient(to bottom, #ffffff 0%,#eaeaea 10%,#eeefd2 46%,#cecead 99%);" +
							  "}" +
							  ".gPrevewResultIcon{" +
							  "		cursor:pointer;opacity:.7;" +
							  "}" +
							  ".gPrevewResultIcon:hover{" +
							  "		opacity:1;" +
							  "}" + 
							  ".gPreviewItemCloseButton{" +
							  "		line-height:12px;font-size:8pt;border:1px solid silver;border-radius:2px;display:margin-left:auto;margin-right:auto;table;cursor:pointer;width:18px;height:18px;background-color:#EAEAEA;" +
							  "}" +
							  ".gPreviewItemCloseButton:hover{" +
							  "		background-color:white;" +
							  "}" +
							  ".gPager{" +
							  "		border:1px solid #E4E4E4;border-top:none;border-left:none;border-radius:0 0 4px 0;left:0;top:170px;position:fixed;width:60px;padding-top:10px;background:#F1F1F1;" +
							  "}" +
							  ".gPager ul{" +
							  "		list-style:none;text-align:center;margin-left:auto;margin-right:auto;" +
							  "}" +
							  ".gPagerPageNumber{" +
							  "		font-size:16pt;" +
							  "}" + 
							  ".gPagerLink{" +
							  "		text-decoration:none;" +
							  "}" +
							  ".gmCleanSearchOptsTab{" +
							  "		border:1px solid #E4E4E4;border-bottom:none;border-radius:0 2px 0 0;height:40px;width:48px;position:fixed;bottom:0;left:0;" +
							  "		background:url('" + _gearIcon + "') center center no-repeat #F1F1F1;cursor:pointer;z-index:5;" +
							  "}" +
							  ".gmCleanSearchOptsTabSelected, .gmCleanSearchOptsTab:hover{" +
							  "		background-color:#DADADA;box-shadow:0 0 3px gray;" +
							  "}" +
							  ".gmCleanSearchOptionsPanel{" +
							  "		position:fixed;bottom:50px;left:60px;height:140px;width:300px;background-color:#DADADA;z-index:5;" +
							  "		border:1px solid gray;border-radius:90px 90px 90px 0;box-shadow:inset 0 5px 12px #444444;background-color:#F2F2F2;visibility:hidden;" +
							  "}" +
							  "#gmCleanSearchOptionsTable{" +
							  "		margin-left:auto;margin-right:auto;margin-top:20px;" +
							  "}" +
							  ".gCleanSearchRightSidebar{" +
							  "		position:fixed;right:-35px;border:1px solid #E4E4E4;border-right:none;border-top:none;z-index:4;background-color:#FFFFFF;" +
							  "}" +
							  ".gCleanSearch_RightSidebarTab{" +
							  "		position:relative;left:-21px;width:20px;top:300px;height:60px;border:1px solid #E4E4E4;border-right:none;border-radius:4px 0 0 4px;background-color:#FFFFFF;cursor:pointer;" +
							  "}" +
							  "div.gCleanSearch_RightSidebarTab img{" +
							  "		opacity:.7;" +
							  "}" +
							  "div.gCleanSearch_RightSidebarTab img:hover{" +
							  "		opacity:1;" +
							  "}" + 
							  "#gCleanSearchRighSidebarCenter{" +
							  "		position:absolute;width:476px;height:100%;overflow:hidden;padding:5px !important;padding-top:0 !important;margin-left:5px;" +
							  "}" +
							  "#gCleanSearchSidebarItemPanel{" +
							  "		position:relative;padding:10px !important;" +
							  "}";
			utils.AddGlobalStyle(googleStyle);		
		},
		
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Initialize Function
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		Initialize: function(){
			_googleInitialized = true;
			
			google.InsertStyles();
			
			google.RemoveClickTracking();
			google.HideAdsAndOtherShit();
			
			dockedSearchBar.Initialize();
			resultViewPanel.Initialize();
			rightSideBlock.Initialize();
			pageModule.Initialize();
			previewOverlay.Initialize();
			optionsTab.Initialize();

			favIconsEnabled = lStore.Get('gmCleanSearch.FavIconsEnabled');
			$('#gmCleanSearch_FaviconsEnabledCheckbox').checked = favIconsEnabled;
			if(favIconsEnabled)
				gmEvents.Dispatch(gmEvents.Names.FavIconsEnabledChanged, {state: favIconsEnabled});
			
			spacebarPagingEnabled = lStore.Get('gmCleanSearch.SpacebarPagingEnabled');
			$('#gmCleanSearch_SpacebarPagingCheckbox').checked = spacebarPagingEnabled;
			google.SetSpacebarPagingEnabled(spacebarPagingEnabled);
			
			window.onresize = function(){
				previewOverlay.ResizeSelf();
			}

		},
	
		SetSpacebarPagingEnabled: function(enabled){
			if(enabled === undefined) return;
			spacebarPagingEnabled = enabled;	
			lStore.Set('gmCleanSearch.SpacebarPagingEnabled', enabled.toString());
			if(enabled){
				window.addEventListener('keydown', gmKeyboardHandler.ListenToKeys, false);
			} else {
				window.removeEventListener('keydown', gmKeyboardHandler.ListenToKeys, false);
			}
		},
	
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Hide Ads and Other Shit Function
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		HideAdsAndOtherShit: function(){
			var botstuff = $('#botstuff');
			if(botstuff)
				botstuff.parentNode.removeChild(botstuff);
			
			var tvcap = $('#tvcap');
			if(tvcap)
				tvcap.parentNode.removeChild(tvcap);
		

			var commercial_unit = document.getElementsByClassName('commercial-unit');
			if(commercial_unit.length > 0){
				commercial_unit.forEach(function(elm, idx, arr){ elm.parentNode.removeChild });
			}
			
			var adsContainers = document.getElementsByClassName("ads-container");

			if(adsContainers.length > 0){
				utils.ArrayFromCollection(adsContainers).forEach(function(elm,idx,arr){if(elm.parentNode){elm.parentNode.removeChild(elm)}else{document.body.removeChild(elm)}});
			}
			
			if(removeCornerGoogleLogo){
				var gbq1 = $("#gbq1");
				if(gbq1) {
					gbq1.parentNode.removeChild(gbq1);
					
					document.getElementById("gbq").setAttribute("style", "margin-left:125px;");
				}
			}
			
			var topStuff = $('#topstuff');
			if(topStuff)
				topStuff.parentNode.removeChild(topStuff);
		},

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Remove Click Tracking Function
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		RemoveClickTracking: function(){
			var gLnks = document.getElementsByClassName('g'),
				lclbox = $('l#clbox');

			if(lclbox){
				var lnk = $("div#results a.fl._mb", lclbox);
				if(lnk){
					lnk.removeAttribute('onmousedown');
					lnk.setAttribute('target', '_blank');
				}
			}
			var arr = utils.ArrayFromCollection(gLnks);
			try{
				arr.forEach(function(itm,idx,arr){
					var lnk = $('div h3 a', itm);
					if(lnk){
						lnk.removeAttribute('onmousedown');
						lnk.setAttribute('target', '_blank');
					}
				});
			}catch(e){
				//alert(e);
			}

			var navcnt = $('#navcnt');

			if(navcnt){
				var links = $$("table tbody tr td a", navcnt);
				if(links.length > 0){
					var arr = utils.ArrayFromCollection(links);
					arr.forEach(function(e,i,a){
						var lnk = utils.ParseUrl(e.href);
						e.href = lnk.protocol + "://" + lnk.host + "/search?q=" + lnk.params["q"] + "&start=" + lnk.params["start"];
					});
					//for(var i = 0; i < links.length; i++){
					//	var lnk = utils.ParseUrl(links[i].href);
					//	links[i].href = lnk.protocol + "://" + lnk.host + "/search?q=" + lnk.params["q"] + "&start=" + lnk.params["start"];
					//}
				}
			}
		},
		
	};
}

////////////////////////////////////////////////////////////////////////////////////////
var rightSideBlock = (function(){
	
	var _sideBar;
	var _tab;

	return { 
		
		AdjustTop: function(){
			var vpSize = utils.GetViewPortSize();
			var nHeight = vpSize.Y - dockedSearchBar.OffsetHeight();
			_sideBar.style.top = dockedSearchBar.OffsetHeight() + "px";
			_sideBar.style.height = nHeight+ "px";
			
			//var kappbar = $("#kappbar");
			//if(kappbar && kappbar.offsetHeight > 0)
			//	_tab.style.bottom = "65%";
			//else 
			//	_tab.style.top = "25%";
		},
		
		AdjustWidth: function(expand){
			var nWidth = expand ? "532px" : "40px";
			TweenLite.to(_sideBar, .8, {css:{width:nWidth}});
		},
	
		Initialize: function(){
			var sideBar = $('div');
			sideBar.id = "gCleanSearch_RightSidebar";
			sideBar.className = "gCleanSearchRightSidebar";
			sideBar.style.width = "40px";
			
			var sideBarCenter = $('div');
			sideBarCenter.id = "gCleanSearchRighSidebarCenter";
			sideBar.appendChild(sideBarCenter);
			
			sideBarCenter.addEventListener('wheel', function(e){
				this.scrollTop += e.deltaY * 10;
				e.stopPropagation();
				e.preventDefault();
			});
			
			var sideBarItemPanel = $('div');
			sideBarItemPanel.id = "gCleanSearchSidebarItemPanel";
			sideBarCenter.appendChild(sideBarItemPanel);
			
			var rhsBlock = $('#rhs_block');
			if(rhsBlock){
				var rhs = rhsBlock.parentNode;
				rhs.removeChild(rhsBlock);
				sideBarItemPanel.appendChild(rhsBlock);
				rhs.parentNode.removeChild(rhs);
			}
			
			var tab = $('div');
			tab.id = "gCleanSearch_RightSidebarTab";
			tab.className = "gCleanSearch_RightSidebarTab";
			sideBar.appendChild(tab);
			
			tab.addEventListener('click', function(e){
				var expand = _sideBar.style.width == "40px";
				rightSideBlock.AdjustWidth(expand);
				e.stopPropagation();
			}, false);
			
			var tabImage = $('img');
			tabImage.src = _infoBalloon;
			tabImage.style.width = "24px";
			tabImage.style.height = "24px";
			tabImage.style.marginLeft = "auto";
			tabImage.style.marginRight = "auto";
			tabImage.style.marginTop = "20px";
			tab.appendChild(tabImage);
						
			$('#ires').appendChild(sideBar);
			
			_sideBar = sideBar;
			_tab = tab;
			
			rightSideBlock.AdjustTop();
		}
	};
})();

var optionsTab = (function(){
	return {
		Initialize: function(){
			var optsTab = $('div');
			optsTab.className = "gmCleanSearchOptsTab";
			var optsTabInner = $('div');
			optsTabInner.className = "gmCleanSearchOptsTabInner";
			optsTab.appendChild(optsTabInner);
			
			optsTab.addEventListener('dragover', function(e){
				e.preventDefault();
			}, false);
			optsTab.addEventListener('drop', function(e){
				e.preventDefault();
				var data = e.dataTransfer.getData('Text');
				var obj = JSON.parse(data);
				//alert(obj.Type + ", " + obj.Id + ", " + obj.IdPrefix + ", " + obj.Host);
				if(obj.Type === "PreviewIcon"){
					//remove preview for domain..
					if(obj.Host) {
						resultViewPanel.RemovePreviewForDomain(obj.Host);
						previewOverlay.RemoveItemsInDomain(obj.Host);
					}
				}
			}, false);
			
			var ires = $('#ires');
			ires.insertBefore(optsTab, ires.firstChild);
			optsTab.title = "Clean Search Options";

			var optsPanel = $('div');
			optsPanel.id = "gmCleanSearchOptionsPanel";
			optsPanel.className = "gmCleanSearchOptionsPanel";
			$$('div.mw.gFullScreenWidth')[0].appendChild(optsPanel);
			
			var optsTable = utils.CreateTable(3,2);
			optsTable.id = "gmCleanSearchOptionsTable";

			var cell0 = optsTable.children[0].children[0];
			var cell1 = optsTable.children[0].children[1];
			
			var cell2 = optsTable.children[1].children[0];
			var cell3 = optsTable.children[1].children[1];
			
			var cell4 = optsTable.children[2].children[0];
			var cell5 = optsTable.children[2].children[1];
			
			var favIconCheckbox = $('input');
			favIconCheckbox.type = 'checkbox';
			favIconCheckbox.value = 'Site Favicons Enabled';
			favIconCheckbox.id = "gmCleanSearch_FaviconsEnabledCheckbox";
						
			favIconCheckbox.addEventListener('change', function(e){
				//wrap event dispatch in setTimeout since this is also a ui change on the checkbox
				var ficb = this;
				setTimeout(function(){
					gmEvents.Dispatch(gmEvents.Names.FavIconsEnabledChanged, {state: ficb.checked});
				}, 100);
			});
						
			var favIconLabel = $('label');
			favIconLabel.setAttribute('for', "gmCleanSearch_FaviconsEnabledCheckbox");
			favIconLabel.textContent = "Web Site Icons Enabled";
			
			cell0.appendChild(favIconLabel);			
			cell1.appendChild(favIconCheckbox);
			
			var pagingTitle = "With this enabled, pressing the 'Spacebar', when at the bottom of a results page, will fetch the next page.";
			
			var sbPageLabel = $('label');
			sbPageLabel.setAttribute('for', 'gmCleanSearch_SpacebarPagingCheckbox');
			sbPageLabel.textContent = "Spacebar Paging Enabled";
			sbPageLabel.title = pagingTitle;
			
			var sbPageCheck = $('input');
			sbPageCheck.type = 'checkbox';
			sbPageCheck.id = 'gmCleanSearch_SpacebarPagingCheckbox';
			sbPageCheck.title = pagingTitle;
			
			sbPageCheck.addEventListener('change', function(e){
				var sbpc = this;
				setTimeout(function(){
					google.SetSpacebarPagingEnabled(sbpc.checked);
				}, 100);
			});
			
			cell2.appendChild(sbPageLabel);
			cell3.appendChild(sbPageCheck);
			
			var domTable = utils.CreateTable(2,2);
			var dc0 = domTable.children[0].children[0];
			dc0.setAttribute('colspan', '2');
			//var dc1 = domTable.children[0].children[1];
			
			var refreshImg = $('img');
			refreshImg.style.width = "16px";
			refreshImg.style.height = "16px";
			refreshImg.style.float = "left";
			refreshImg.src = _reloadIcon;
			refreshImg.title = "Load/Refresh List";
			dc0.appendChild(refreshImg);
			
			refreshImg.addEventListener('click', function(){
				var domSelector = $("#gCleanSeach_InvalidDomainSelector");
				while(domSelector.firstChild)
					domSelector.removeChild(domSelector.firstChild);
					
				if(domSelector) {
					var domains = frameHandler.GetInvalidDomains();
					if(domains){
						var domString = JSON.stringify(domains).split(',');
						for(var i = 0; i < domString.length; i++){
							var domain = domString[i];
							var opt = $('option');
							while(domain.indexOf('"') > -1)
								domain = domain.replace('"','');
							opt.value = domain;
							opt.textContent = domain;
							domSelector.appendChild(opt);
						}
					}	
				}
			}, false);
			
			var domLabel = $('label');
			domLabel.style.marginLeft = "5px";
			domLabel.textContent = "Non-previewable Domains";
			domLabel.setAttribute('for', 'gmNonPreviewableDomains');
			dc0.appendChild(domLabel);
			dc0.style.textAlign = "left";
			
			var domSelector = $('select');
			domSelector.style.minWidth = "80px";
			domSelector.id = "gCleanSeach_InvalidDomainSelector";
						
			cell4.appendChild(domTable);
			cell4.colSpan = 2;
			
			var dSelCell = domTable.children[1].children[0];
			dSelCell.appendChild(domSelector);
			
			var dSelButton = $('input');
			dSelButton.type = "button";
			dSelButton.value = "Remove";
			domTable.children[1].children[1].appendChild(dSelButton);
			
			dSelButton.addEventListener('click', function(){
				var selector = $('#gCleanSeach_InvalidDomainSelector');
				var selIndex = selector.selectedIndex;
				if(selIndex > -1){
					var item = selector.childNodes[selIndex];
					if(frameHandler.RemoveInvalidDomain(item.value)){
						selector.removeChild(item);
					}
				}
			}, false);
			
			//cell5.appendChild(domSelector);
			
			optsPanel.appendChild(optsTable);
			
			optsTab.addEventListener('click', function(e){
				if(!optsPanel.style.opacity || parseInt(optsPanel.style.opacity) == 0) {
					optsTab.className += " gmCleanSearchOptsTabSelected";
					TweenLite.to(optsPanel, .5, {autoAlpha:1});
				}
			});
			
			optsPanel.addEventListener('mousedown', function(e){
				e.stopPropagation();
			});
			
			document.body.addEventListener('mousedown', function(e){
				parseInt(optsPanel.style.opacity);
				if(parseInt(optsPanel.style.opacity) == 1){
					TweenLite.to(optsPanel, .5, {autoAlpha:0});
					optsTab.className = optsTab.className.split('gmCleanSearchOptsTabSelected').join();
				}
			});
		}
	};
})();

var dockedSearchBar = (function(){
	var dockContainer;
	return {
		
		OffsetHeight: function(){
			if(!docContainer) return NaN;
			return docContainer.offsetHeight;
		},
	
		Initialize: function(){
			var appbar = $('#appbar');
			var cnt = $('#cnt');
			if(!cnt) return;
			
			var fc = cnt.firstChild; //script element
			
			var dockBox = $('div');
			cnt.insertBefore(dockBox, cnt.firstChild);
			dockBox.className = "gDockedSearch";
			dockBox.id = "gmGoogleDockedSearchBar";
			docContainer = dockBox;
			
			var inputBox;
			var mngb = $('#mngb');
			if(mngb){
				var table = utils.CreateTable(1, 2);
				table.setAttribute('style','width:100%;');
				var cells = $$('tr td', table);
			
				mngb.parentNode.removeChild(mngb);
				cells[0].appendChild(mngb);
				
				//input box
				inputBox = $("div#gb div div", mngb);
				cells[1].appendChild(inputBox);
				dockBox.appendChild(table);
			}
			
			var sib = fc;

			while(sib){
				var t = sib.nextSibling;
				var s = sib.parentNode.removeChild(sib);
				dockBox.appendChild(s);
				sib = t;
				if(sib === appbar)
					break;
			}
			appbar.parentNode.removeChild(appbar);
			dockBox.appendChild(appbar);
				
			$('#gsr').addEventListener('DOMAttrModified', function(e){
				var target = e.target;
				if(target.tagName == "TABLE" && target.className == "gstl_0 gssb_c"){
					//the search suggestions table has been 'created'
					var gbq = $('#gbq');
					if(gbq){
						var table = target.parentNode.removeChild(target);
						var pgbq = gbq.parentNode;
						//set table 'left' property to zero - important!
						table.style.left = '0';
						//re-home the suggestion table so it's directly under the search input. kinda dumb that it isn't there, already!!!!! [Google, I'm looking at YOU]
						pgbq.appendChild(table);
					}
				}
			});
			
			var topNav = $("#top_nav");
			if(topNav){
				var msb = $("#hdtb_msb");
				var more = $("a#hdtb_more", msb);
				var moreMn = more.nextSibling;
				Enumerable.From(moreMn.childNodes).ForEach(function(x){
					moreMn.removeChild(x);
					msb.insertBefore(x, more);
				});
				msb.removeChild(more);
				msb.removeChild(moreMn);
			}
	
			//find the Sign in button and append the ad_button class
			var loginButton = document.getElementById('gb_70');
			if(loginButton)
				loginButton.className += " ab_button";
		},
	};
})();

var resultItemCreator = (function(){
	
	return {
		
		CreateItem: function(gElm, gType){
			if(!gElm || gType < 0) return;

			//return value
			var resultItem = {
				Host: "",
				TargetUrl: "",
				Type: "",
				Title: "",
				ItemId: "",
				AllowPreview: false,
				ContentItem: {}
			};
			
			if(gType < 4){
				//get the H3 element that contains the result destination link
				var pTitle = $("h3", gElm);
				
				//get a pointer to the link inside the pTitle element
				var pLink = $("a", pTitle); //'A' element
				//parse the href value of the link
				var pUrl = utils.ParseUrl(pLink.href);
				
				//Attempt to trim the link text content if it exceeds the length of 61 characters
				var linkText = pLink.textContent.toString();
				if(linkText.length >= 64){
					//linkText = linkText.substring(0, 61) + "...";
					linkText = utils.TrimToLength(linkText, 64, true);
					pLink.textContent = linkText;
				}
				
				resultItem.Host = pLink.host;
				resultItem.TargetUrl = pLink.href;
				resultItem.Type = "search";
				resultItem.Title = linkText;
				
				resultItem.ItemId = utils.GetUUID();
				
				//outer-most container which will surround the post's inner contents
				var outerContainer = $('div');
				outerContainer.setAttribute('class', 'gResultWrapper');
				outerContainer.setAttribute('data-url', pLink.href);
				outerContainer.setAttribute('data-domain', pLink.host);
				outerContainer.setAttribute('data-resultType', 'search');
				outerContainer.setAttribute('data-title', linkText);
				outerContainer.id = "gmResultItem_" + resultItem.ItemId;
				resultItem.ContentItem = outerContainer;
				
				outerContainer.addEventListener('mouseenter', function(){
					var id = this.id;
					id = utils.TrimStart(id, "gmResultItem_");
					var ico = $('#gPreviewIcon_' + id);
					if(ico)
						ico.style.opacity = ".8";
				}, false);
				outerContainer.addEventListener('mouseleave', function(){
					var id = this.id;
					id = utils.TrimStart(id, "gmResultItem_");
					var ico = $('#gPreviewIcon_' + id);
					if(ico)
						ico.style.opacity = ".05";
				}, false);
				
				
				//create a table that will hold the favicon, the title element and the result index
				var titleTable = utils.CreateTable(1, 3);
				titleTable.setAttribute('style', 'width:100%;');
				
				var imgCell = titleTable.children[0].children[0]; //first cell in the table
				imgCell.id = "imgCell_" + resultItem.ItemId;
				imgCell.style.width = "18px"; //enforce 18px width
				
				var titleCell = titleTable.children[0].children[1]; //second cell in the table

				var eyeIconCell = titleTable.children[0].children[2]; //third cell in the table
				eyeIconCell.style.width = "18px"; //enforce 18px width
				
				//add the eye icon to the title table. this allows for previewing the site in the preview box.
				//some domains cannot be previews so, they must be filtered and not receive an eye icon

				if(!frameHandler.IsInvalidDomain(pUrl.domain)) {
					resultItem.AllowPreview = true;
					
					outerContainer.setAttribute('data-previewItemId', resultItem.ItemId);
					var iIcon = $('img');
					iIcon.id = "gPreviewIcon_" + resultItem.ItemId;
					iIcon.src = _eyeIcon;
					iIcon.className = "gPrevewResultIcon";
					iIcon.title = "Open in previewer";
					iIcon.style.opacity = ".1";
					iIcon.setAttribute('draggable', true);
					
					iIcon.addEventListener('dragstart', function(e){
						var data = {
							Type: "PreviewIcon",
							Id: utils.TrimStart(e.target.id, "gPreviewIcon_"),
							IdPrefix: "gPreviewIcon_",
							Host: resultItem.Host
						};
						e.dataTransfer.setData('Text', JSON.stringify(data));
					}, false);
					
					iIcon.addEventListener('click', function(){
						//open the previewer and display the url for this result

						var selectedLink = $$('.pvLinkInnerContainerSelected')[0];
						if(selectedLink)
							selectedLink.className = selectedLink.className.split('pvLinkInnerContainerSelected').join();
						
						var itemPanel = $("#gPreviewPanelItemScrollPanel");
						for(var i = 0; i < itemPanel.children.length; i++){
							var child = itemPanel.children[i];
							if(child.attributes['data-previewItemId']){
								var itmd = child.attributes['data-previewItemId'].value;
								if(itmd === resultItem.ItemId){
									$('.pvLinkInnerContainer',child).className += " pvLinkInnerContainerSelected";
									break;
								}
							}
						}
						
						if(outerContainer.className.indexOf('gPreviewVideoEmbed_YouTube') != -1){
							gmEvents.Dispatch(gmEvents.Names.PreviewPaneModNeeded, {width:640, height:360, frameBorder: 0, allowfullscreen: true});
							var videoId = outerContainer.getAttribute('data-videoId');
							var embedSource = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
							gmEvents.Dispatch(gmEvents.Names.RequestPreviewToggle, { show: true, url: embedSource});
						} else {
							gmEvents.Dispatch(gmEvents.Names.PreviewPaneModNeeded, { reset: true });
							gmEvents.Dispatch(gmEvents.Names.RequestPreviewToggle, { show: true, url: pLink.href});
						}
					}, false);
					eyeIconCell.appendChild(iIcon);
					
										
					//TODO: Make this cleaner!
					if(pUrl.domain == "youtube"){
						outerContainer.className += " gPreviewVideoEmbed_YouTube";
						outerContainer.setAttribute('data-videoId', pLink.href.substring(pLink.href.indexOf('=') + 1));
					}
					
				} else {
					//this site cannot be previewed in an iframe
					outerContainer.className += " gPreviewNone";
				}
				
				//this container will house the titleTable
				var titleBox = $("div");
				titleBox.appendChild(titleTable);
				
				//if this is a local results box, don't add the gResultTitleBox class'
				if(gType != 3)
					titleBox.className = "gResultTitleBox";
				
				//insert the titleBox before the 'pTitle' element
				pTitle.parentNode.insertBefore(titleBox, pTitle);
				
				
				//move 'pTitle' from its parent to our middle table cell
				pTitle.parentNode.removeChild(pTitle);
				titleCell.appendChild(pTitle);
				
				pLink.textContent = utils.TrimToLength(pLink.textContent, 60, true);
				
				if(gType != 2){ //make sure this is NOT an image box as they don't get a favicon
					var favIcon = $('img');
					favIcon.setAttribute('style','width:16px;height:16px;float:left;margin-right:3px;');
					favIcon.id = "favIcon_" + resultItem.ItemId;
					favIcon.setAttribute('data-favIcon', pLink.host);
					$('#imgCell_' + resultItem.ItemId).appendChild(favIcon);
					
					//are fav icons enabled?
					if(favIconsEnabled){
						favIconHandler.GetIconForHost(pUrl.host, resultItem.ItemId, function(e){
							$('#favIcon_' + e.id).src = e.src;
						});
					}
				}
			}
			
			return resultItem;
		},
		
	};
	
})();

var resultViewPanel = (function(){
	
	this.ResultItems = [];
	
	return {
				
		SetFaviconDisplayState: function(state){
			this.ResultItems.forEach(function(e,i,a){
				var itemId = e.ItemId,
					host = e.Host;
					
				var favIcon = $('#favIcon_' + itemId);

				if(favIcon){
					if(!state)
						favIcon.src = null;
					else {
						//load favicons...
						favIconHandler.GetIconForHost(host, itemId, function(e){
							$('#favIcon_' + e.id).src = e.src;
						});
					}
				}
			});
		},
		
		RemovePreviewForDomain: function(domain){
			if(!domain) return;
			var domItems = [],
				ico,
				doms = this.ResultItems.filter(function(v){if(v.Host == domain) return true; return false;});

			doms.forEach(function(e,i,a){
				ico = $('#gPreviewIcon_' + e.ItemId);
				if(ico)
					ico.parentNode.removeChild(ico);
			});
		},
		
		GetItemsInDomain: function(domain){
		
			return this.ResultItems.filter(function(v){return v.Host == domain;});
			
			//var ret = [];
			//domain = domain.toLowerCase();
			//var pItems = this.ResultItems;
			
			//for(var i = 0; i < pItems.length; i++){
			//	var pItem = pItems[i];
			//	if(pItem.Host.toLowerCase() == domain)
			//		ret.push(pItem);
			//}
			//return ret;
		},
		
		GetItemWithId: function(itemId){
			if(!itemId || this.ResultItems.length == 0) return undefined;
			
			return this.ResultItems.find(function(v){return v.ItemId == itemId});
			
			//var aItems = this.ResultItems.filter(function(v){return v.ItemId == itemId});
			//if(mItems)
			//	return mItems[0];
			//return undefined;
			
			//var item;
			//var rItems = this.ResultItems;
			
			//for(var i = 0; i < rItems.length; i++){
			//	var t = rItems[i];
			//	if(t.ItemId == itemId){
			//		item = t;
			//		break;
			//	}
			//}
			//return item;
		},
		
		Initialize: function(){

			var rcnt = $('#rcnt');
			var mwD = rcnt.parentNode;
			mwD.className += " gFullScreenWidth gCutoff";

			$("#ucs").nextSibling.removeAttribute('style');
	

			var centerCol = $('#center_col');
			centerCol.setAttribute('style','margin-left:0 !important;')
			centerCol.parentNode.removeAttribute('style');
			
			centerCol.className += " gFullScreenWidth";
			centerCol.parentNode.className += " gFullScreenWidth";
			
			var list = $('#rso');
			var olist = $$('li.g', list);

			var gs = list.getElementsByTagName('li');

			var arr = utils.ArrayFromCollection(olist);

			var triList = utils.SplitApart(arr, 3);
			if(this.ResultItems === undefined)
				this.ResultItems = [];
			
			
			for(var i = 0; i < olist.length; i++){
				var li = olist[i];

				var gType = 0,
					isNewsBox = li.id === 'newsbox',
					isImageBox = li.id === "imagebox_bigimages",
					islclBox = li.id === "lclbox",
					isWebDefBox = li.className.indexOf("obcontainer") != -1;

				if(isNewsBox)
					gType = 1;
				if(isImageBox)
					gType = 2;
				if(islclBox)
					gType = 3;
				if(isWebDefBox)
					gType = 4;

				var viewItem = resultItemCreator.CreateItem(li, gType);
				this.ResultItems.push(viewItem);

				if(gType === 0){ //basic result type
					var rcDiv = $("div.rc", li);
					var multipleKids = li.childNodes.length > 1;
						
					if(multipleKids){
						li.removeChild(rcDiv);
						viewItem.ContentItem.appendChild(rcDiv);
							
						while(li.firstChild){
							var child = li.removeChild(li.firstChild);
							rcDiv.appendChild(child);
						}
					}
					else {
						while(li.firstChild){
							var child = li.removeChild(li.firstChild);
							viewItem.ContentItem.appendChild(child);
						}
					}
						
					li.appendChild(viewItem.ContentItem);
					
					var divBody = $("div.s", rcDiv);
					var imgDiv = $('div', rcDiv);
					if(imgDiv && imgDiv.attributes["style"] && imgDiv.attributes["style"].value.indexOf('float:') != -1){
						var ns = imgDiv.nextSibling;
						imgDiv.parentNode.removeChild(imgDiv);
						divBody.insertBefore(imgDiv, divBody.firstChild);
						imgDiv.firstChild.setAttribute("style", "margin:3px;float:none !important;");
						ns.setAttribute('style','margin-left:0;padding-bottom:0;');
					} else
						imgDiv = null;
				
					divBody.className += " gResultBodyBox";
						
					try{
						if(multipleKids){
							var sib = divBody.nextSibling;
							while(sib){
								var t = sib.nextSibling;
								sib.parentNode.removeChild(sib);
								divBody.appendChild(sib);
								sib = t;
							}
						}
					} catch(e){
						//alert(e);
					}					
				}
				
				
				if(gType == 1 || gType == 2){
							
					//create the outer wrapper container
					var wrapper = $('div');
					var titleBox = $('.gResultTitleBox', li);
					//insert the wrapper into the gElm tree. at this point, it will be inserted
					//before our newly created gResultTitleBox element that is already in the tree
					li.insertBefore(wrapper, titleBox);
					//assign the proper class name to make sure this appears as a wrapper element
					wrapper.className = "gResultWrapper gResultBoxSpecial";
									
					//remove the titleBox element and re-home it in our wrapper, as the fist child
					var nextNode = titleBox.parentNode.removeChild(titleBox);
					//append the titleBox to the wrapper. it should now be the first child.
					wrapper.appendChild(nextNode);
					
					//create a wrapper to re-home sub-items of this result item
					var contentWrapper = $('div');			
									
					//find the next sibling element of the titleBox
					var sibling = wrapper.nextSibling;
					//create a loop using the sibling
					while(sibling){
						//while 'sibling' is not null, remove it from the parent
						//and re-home it as a child of the contentWrapper.
						var tmp = sibling.nextSibling;
						sibling.parentNode.removeChild(sibling);
						contentWrapper.appendChild(sibling);
						sibling = tmp;
					}
					
					
					//add the proper class name to the 'contentWrapper' object
					contentWrapper.className = "gResultBodyBox";
					
					//append the 'contentWrapper' element to the wrapper
					wrapper.appendChild(contentWrapper);
						
				}
				else if (gType === 3){ //local results
					var results = $("div#results", gElm);
					results.className += "gResultWrapper gResultBoxSpecial";
					results.style.paddingLeft = "10px";
					results.style.paddingBottom = "10px";
				}
				
				
			}

				
			var viewTable = utils.CreateTable(1, 3);
			viewTable.className += " gResultTable gCentered";
			var cells = $$('tr td', viewTable);
			
			utils.ArrayFromCollection(cells).forEach(function(c,i,a){
				c.setAttribute('valign','top');
				c.setAttribute('style','padding:20px;padding-top:40px;');
			});

			ires.insertBefore(viewTable, list);
			//while(list.firstChild)
			//	list.removeChild(list.firstChild);

			//this list will contain items such as local results and large image boxes and will be placed at the top of the first column
			var listSpecial1 = $('ol');
			//this list will contain items such as 'in-depth articles' and will be placed at the top of the center column
			var listSpecial2 = $('ol');
			
			list.parentNode.removeChild(list);
			cells[0].appendChild(list);
			
			var myOlist = $('ol');
			cells[1].appendChild(myOlist);
			
			var myOlist2 = $('ol');
			cells[2].appendChild(myOlist2);
				
			for(var i = 0; i < triList[0].length; i++)
				list.appendChild(triList[0][i]);
			
			for(var i = 0; i < triList[1].length; i++)
				myOlist.appendChild(triList[1][i]);

			for(var i = 0; i < triList[2].length; i++)
				myOlist2.appendChild(triList[2][i]);

			//deal with special list containers..
			//place first list above the first child in the first column
			cells[0].insertBefore(listSpecial1, cells[0].firstChild);
			//place second list above the first child in the second column
			cells[1].insertBefore(listSpecial2, cells[1].firstChild);
				
				
			var fc = $('li', list);

			var imageBox = $('#imagebox_bigimages');
			if(imageBox){
				imageBox.parentNode.removeChild(imageBox);
				listSpecial1.appendChild(imageBox);
				//list.insertBefore(imageBox, list.firstChild);
			}
						
			
			try{
				var taw = $('#taw');
				if(taw){
					taw.parentNode.removeChild(taw);
					listSpecial1.insertBefore(taw, listSpecial1.firstChild);
					//list.insertBefore(taw, list.firstChild);
				}
			} 
			catch(e){
				//alert(e);
			}

			try{
				if(fc.firstChild && fc.firstChild.tagName.toLowerCase() === "div"){
					var pElms = [],
						fcc = fc.firstChild;
					
					var className = fcc.attributes["class"].value;

					if(className.indexOf("rg-") > -1){
						pElms.push(fcc);
						var ns = fcc.parentNode.nextSibling;
						if(ns.attributes["class"].value.indexOf("rd-") > -1){
							pElms.push(ns);
						}
						
						ns = ns.nextSibling;
						if(ns && ns.attributes["class"].value.indexOf("rg") > -1)
							pElms.push(ns);
							
						if(pElms.length > 0){
							var nContainer = $('div');
							nContainer.className += " gResultContainer gResultWrapper";
							for(var i = 0; i < pElms.length; i++){
								var elm = pElms[i];
								elm.parentNode.removeChild(elm);
								nContainer.appendChild(elm);
							}
							
							var hrs = $$('hr', nContainer);
							if(hrs)
								utils.ArrayFromCollection(hrs).forEach(function(hr,i,a){hr.parentNode.removeChild(hr)});
							
							//var cards = document.documentElement.querySelectorAll('li.card-section');
							var cards = $$m(['li.card-section','li.obcontainer']);
							if(cards){
								var cardArray = utils.ArrayFromCollection(cards);
								cardArray.forEach(function(card,i,a){
									card.parentNode.removeChild(card)
									nContainer.appendChild(card);
									if(card.className.indexOf('g ') > -1){
										card.firstChild.className += " gResultFlatBox";
									} else if (card.className.indexOf('w0 ') > -1){
										if(cx == 0)
											card.style.marginTop = "-10px";
									}
								});
								
								cardArray.filter(function(v){
									return v.className && v.className.indexOf('w0') != -1;
								}).forEach(function(n,i,a){
									var pn = n.parentNode;
									var ps = utils.FirstChildWithClassName(pn, 'g card-section');

									pn.removeChild(n);
									pn.insertBefore(n, ps);
								});
								
								//for(var cx = 0; cx < cards.length; cx++){
								//	var card = cards[cx];
								//	card.parentNode.removeChild(card)
								//	nContainer.appendChild(card);
								//	if(card.className.indexOf('g ') > -1){
								//		card.firstChild.className += " gResultFlatBox";
								//	} else if (card.className.indexOf('w0 ') > -1){
								//		if(cx == 0)
								//			card.style.marginTop = "-10px";
								//	}
								//}
								
								//find all the news itms marked with class 'w0' and place them 
								//at the top of the list, under the 'in-depth articles' but, before any 'g card-section' items
								//Enumerable.From(cards).Where(function(m){
								//	return m.className && m.className.indexOf('w0') > -1;
								//}).ForEach(function(n){
								//	var pn = n.parentNode;
								//	var ps = utils.FirstChildWithClassName(pn, 'g card-section');

								//	pn.removeChild(n);
								//	pn.insertBefore(n, ps);
								//});
								
							}
							
							listSpecial2.appendChild(nContainer);
							//myOlist.insertBefore(nContainer, myOlist.firstChild);
							
							list.removeChild(fc);
						}
					}		
				}
			} catch(e){
				//alert(e);
			}
						
			//try to find any loner 'hr' elements in our result view
			var hrs = $$('hr', $('#rso'));
			utils.ArrayFromCollection(hrs).forEach(function(h,i,a){h.parentNode.removeChild(h)});
			//eliminate any loner 'hr' elements
			//Enumerable.From(hrs).ForEach(function(hr){
			//	hr.parentNode.removeChild(hr);
			//});
			
			/////////////////////////////////////////////////////////////////////////////////////////////
			//TODO: Make it so there are no list items left to clean up!!!
			//
			//Clean up any empty list item elements that we might have left behind...
			utils.ArrayFromCollection($$('li', $('#rso'))).forEach(function(li,i,a){ if(utils.Trim(li.textContent).length == 0) li.parentNode.removeChild(li)});
			//Enumerable.From($$('li', $('#rso'))).ForEach(function(li){
			//	if(utils.Trim(li.textContent).length == 0)
			//		li.parentNode.removeChild(li);
			//});
			///////////////////////////////////////////////////////////////////////////////////////////////
			
			
			//look for the local results box. if found, re-home it as the fist item in the 'list' element so that it works with its data panel.
			var lclBox = $('#lclbox');
			if(lclBox){
				//remove the element from its parent and re-home it
				lclBox.parentNode.removeChild(lclBox);
				//place the element as the first child of the first list in the view
				//this allows it to work with the extra data panel without a shitload of messing with the data panel settings
				list.insertBefore(lclBox, list.firstChild);
			}
			
			//find the 'kappbar'. this bar holds shit like movie results and local pizza joint review postings
			var kappbar = $("#kappbar");
			if(kappbar){
				//how tall is this bar? if it's measurable, it's visible
				var kappBarHeight = kappbar.offsetHeight;
				if(kappBarHeight > 0){
					//compensate for this heigh by increasing the top margin of the viewing area so that the tiles aren't cut off at the top
					if(kappBarHeight > 290) //magic # alert!
						viewTable.className += " gResultTablePadTop2";
					else
						viewTable.className += " gResultTablePadTop";
					
					//create and display an element that allows to collapse or expand this hiddious bar
					//find the lxhdr header element..
					var lxhdr = $("div div.abup div#lxhdr", kappbar);
					if(lxhdr){
						//find the inner box containing the header text. we'll place our element in there.
						var lxhdrbox = $("div.lxhdrbox", lxhdr);
						if(lxhdrbox){
							var hdrTable = utils.CreateTable(1, 2);
							var c1 = hdrTable.children[0].children[0];
							c1.setAttribute('valign', 'bottom');
							var c2 = hdrTable.children[0].children[1];
							c2.setAttribute('valign', 'top');
														
							var hdrParent = lxhdrbox.parentNode;
							hdrParent.insertBefore(hdrTable, lxhdrbox);
							hdrParent.removeChild(lxhdrbox);
							c2.appendChild(lxhdrbox);
														
							lxhdrbox.style.display = "table";
							var ceButton = $('div');
							ceButton.className = "gKappBarExpander";
							c1.appendChild(ceButton);
							
							ceButton.setAttribute('style','cursor:pointer;')
							ceButton.title = "Collapse or Expand";
							ceButton.innerHTML = "<img style='height:18px;width:18px;margin-left:3.5px;margin-top:4px;' src='" + _arrowUp + "'/>";
							
							var offset = lxhdrbox.parentNode.offsetHeight;	
							var appcenter = $("div div.appcenter", kappbar);
							var klcc = $("div.klcc", appcenter);
							var klcar = klcc.firstChild;
							var maxElmHeight = klcar.style.height;
							
							var abupHeight = $('div div div.abup', kappbar).offsetHeight;
							
							//animation duration
							const _duration = 0.3;
							
							ceButton.addEventListener('click', function(e){
								if(kappbar.offsetHeight > abupHeight){
									pageModule.SetDisplayState(false);
									if(klcc) {
										TweenLite.to(appcenter, _duration, {css:{height:"0"}});
										TweenLite.to(klcc.firstChild, _duration, {css:{height:"0"}});
										TweenLite.to(klcc, _duration, {css:{overflowX:"hidden"}});
									}
									
									TweenLite.to($('img', ceButton), _duration, {rotation:"180_ccw"})
									TweenLite.to(kappbar, _duration, {css:{height:abupHeight + "px"}, onComplete: function(){
										rightSideBlock.AdjustTop();
										pageModule.AdjustTop(dockedSearchBar.OffsetHeight());
										pageModule.SetDisplayState(true);
									}});
									TweenLite.to(viewTable, _duration, {css:{marginTop:"150px"}});
									
								} else {
									pageModule.SetDisplayState(false);
									if(klcc) {
										TweenLite.to(appcenter, _duration, {css:{height:maxElmHeight}});
										TweenLite.to(klcc.firstChild, _duration, {css:{height:maxElmHeight}});
										TweenLite.to(klcc, _duration, {css:{overflowX:"scroll"}});
									}
									
									TweenLite.to($('img', ceButton), _duration, {rotation:"0_cw"})
									TweenLite.to(kappbar, _duration, {css:{height:kappBarHeight + "px"}});
									
									var mTop = kappBarHeight > 290 ? 400 : 340;
									TweenLite.to(viewTable, _duration, {css:{marginTop:mTop+"px"}, onComplete: function(){
										rightSideBlock.AdjustTop();
										pageModule.AdjustTop(dockedSearchBar.OffsetHeight());
										pageModule.SetDisplayState(true);
									}});
								}
							});
														
						}
					}
				}
			} 
		},//end function
		
	};
	
	
})();

var previewOverlay = (function(){

	this.PreviewFrame = {};
	this.ScrollPanel = {};
	this.BasePanel = {};
	this.FrameContainer = {};
	this.OpenInTabLink = {};
	this.ItemPanel = {};
	
	this.PreviewItems = [];
	
	
	var self = this;
	
	var previewItem = function(){
		return {
			ItemId: "",
			Host: "",
			Url: "",
			Type: "preview",
			ContentItem: {}
		};
	}
	
	return {

		ScrollToItem: function(itemId){
			if(!itemId) return;
			
			var item = this.PreviewItems.find(function(v){return v.ItemId === itemId});
			if(item){
				var elm = item.ContentItem,
					ot = elm.offsetTop,
					st = this.ItemPanel.scrollTop,
					dif = Math.abs(ot - st);

				this.ItemPanel.scrollTop += (dif - (elm.offsetHeight * 1.5));
			}
		},
	
		SetFaviconDisplayState: function(state){
			this.PreviewItems.forEach(function(item,i,a){
				var itemId = item.ItemId,
					host = item.Host;
					
				var favIcon = $('#pvFavIcon_' + itemId);

				if(favIcon){
					if(!state)
						favIcon.src = null;
					else {
						//load favicons...
						favIconHandler.GetIconForHost(host, itemId, function(e){
							$('#pvFavIcon_' + e.id).src = e.src;
						});
					}
				}
			});
		},
	
		GetSelectedItem: function(){
			return this.ScrollPanel.querySelector('div.pvLinkInnerContainerSelected');
		},
	
		RemoveItemsInDomain: function(domain, callback){
			var pvItems = this.PreviewItems;
			var domItems = [];
			var remItemIdx = [];
			
			for(var i = 0; i < pvItems.length; i++){
				var p = pvItems[i];
				if(p.Host === domain){
					domItems.push(p);
					remItemIdx.push(i);
				}
			}
			
			for(i = 0; i < domItems.length; i++){
				var isLast = (i + 1) == domItems.length;
				var itmId = domItems[i].ItemId;
				previewOverlay.RemoveItem(itmId, isLast ? callback : undefined, isLast ? remItemIdx : undefined);
			}
		},
	
		GetItemId: function(item){
			if(!item) return undefined;
			
			var itm = this.PreviewItems.find(function(v){return v.ContentItem === item;});
			if(itm)
				return itm.ItemId;
			return undefined;
			
			//var items = this.PreviewItems;
			//var id;
			//for(var i = 0; i < items.length; i++){
			//	var itm = items[i];
			//	if(itm.ContentItem === item){
			//		id = itm.ItemId;
			//		break;
			//	}
			//}
			//return id;
		},
	
		GetItemById: function(itemId){
			if(!itemId || this.PreviewItems.length == 0) return undefined;
			return this.PreviewItems.find(function(v){return v.ItemId == itemId;});
			//var item;
			//var rItems = this.PreviewItems;
			
			//for(var i = 0; i < rItems.length; i++){
			//	var t = rItems[i];
			//	if(t.ItemId == itemId){
			//		item = t;
			//		break;
			//	}
			//}
			//return item;
		},
	
		GetItemIndex: function(itemId){
			var pItems = this.PreviewItems;
			var sPanel = this.ScrollPanel;
			
			return this.PreviewItems.findIndex(function(v){return v.ItemId === itemId;});
			
			//var idx = -1;
			//for(var i = 0; i < pItems.length; i++){
			//	var pItem = pItems[i];
			//	if(pItem.ItemId == itemId){
			//		idx = i;
			//		break;
			//	}
			//}
			return idx;
		},
		
		GetItemsInDomain: function(domain){
			return this.PreviewItems.filter(function(v){return v.Host === domain;});
		
			//var ret = [];
			//domain = domain.toLowerCase();
			//var pItems = this.PreviewItems;
			
			//for(var i = 0; i < pItems.length; i++){
			//	var pItem = pItems[i];
			//	if(pItem.Host.toLowerCase() == domain){
			//		ret.push(pItem);
			//	}
			//}
			//return ret;
		},
				
		ModifySelf: function(args){
			if(args.width)
				this.PreviewFrame.setAttribute('width', args.width);
			
			if(args.height)
				this.PreviewFrame.setAttribute('height', args.height);
				
			if(args.frameBorder)
				this.PreviewFrame.frameborder = args.frameBorder;
				
			if(args.allowfullscreen)
				this.PreviewFrame.allowfullscreen = true;
				
			if(args.reset){
				this.PreviewFrame.removeAttribute('width');
				this.PreviewFrame.removeAttribute('height');
				this.PreviewFrame.removeAttribute('allowfullscreen');
				this.PreviewFrame.frameborder = 0;
			}
		},
		
		SetDisplayState: function(state, newUri){
			if(state === undefined) return;
			var container = this.FrameContainer;
			var basePanel = this.BasePanel;
			
			if(state){
				TweenLite.to(container, 1, {autoAlpha:1, onComplete:function(){
					if(newUri){
						var preItems = this.PreviewItems;
						setTimeout(function(){						
							try{
								previewOverlay.LoadUri(newUri);
							} catch (e){
								alert(e);
							}
						}, 1500);
					}
				}});
				TweenLite.to(basePanel, 1, {autoAlpha:1});
			} else {
				TweenLite.to(container, .5, {rotationX:80, transformPerspective:1200});
				TweenLite.to(container, 3,{z:-50000, delay:.48});
				TweenLite.to(container, 1, {rotationY:1024, transformPerspective:1200, delay:.5});
				TweenLite.to(basePanel, 1, {autoAlpha:0, delay:.4, onComplete: function(){
					previewOverlay.LoadUri('about:blank');
					TweenLite.to(container, 0, {rotationX:0, transformPerspective:0,z:0, rotationY:0});
				}});
			}
		},
		
		MarkPreActive: function(itemId){
			var pvIdstr = "data-previewItemId";
			var panel = this.ScrollPanel;
			var mNode;
			for(var i = 0; i < panel.childNodes.length; i++){
				var nc = panel.childNodes[i];
				if(nc.attributes[pvIdstr] && nc.getAttribute(pvIdstr) === itemId){
					mNode = nc;
					break;
				}
			}
			
			if(mNode){
				if(mNode.className && mNode.className.indexOf('pvLinkInnerContainerSelected') != -1)
					mNode.className = mNode.className.split('pvLinkInnerContainerSelected').join();
					
				mNode.className += " pvLinkInnerContainerPreSelected";
			}
		},
		
		MarkActive: function(itemId){
			var pvIdstr = "data-previewItemId";
			var panel = this.ScrollPanel;
			var mNode;
			
			for(var i = 0; i < panel.childNodes.length; i++){
				var nc = panel.childNodes[i];
				if(nc.attributes[pvIdstr] && nc.getAttribute(pvIdstr) === itemId){
					mNode = nc;
					break;
				}
			}
			
			if(mNode){
				if(mNode.className && mNode.className.indexOf('pvLinkInnerContainerPreSelected') != -1)
					mNode.className = mNode.className.split('pvLinkInnerContainerPreSelected').join();
									
				mNode.className += " pvLinkInnerContainerSelected";
			}
		},
		
		UnmarkAll: function(){
			var selItems = utils.ArrayFromCollection($$('.pvLinkInnerContainerSelected'));
			var preSelItems = utils.ArrayFromCollection($$('.pvLinkInnerContainerPreSelected'));
			for(var i = 0; i < preSelItems.length; i++)
				selItems.push(preSelItems[i]);
							
			for(var i = 0; i < selItems.length; i++){
				var sLink = selItems[i];
				if(sLink.className && sLink.className.indexOf('pvLinkInnerContainerSelected') != -1)
					sLink.className = sLink.className.split('pvLinkInnerContainerSelected').join();
									
				if(sLink.className && sLink.className.indexOf('pvLinkInnerContainerPreSelected') != -1)
					sLink.className = sLink.className.split('pvLinkInnerContainerPreSelected').join();
					
				for(var i = 0; i < this.PreviewItems.length; i++){
					var pvItem = this.PreviewItems[i];
					pvItem.Selected = false;
				}
			}
		},
		
		RemoveItem: function(itemId, callback, dArg){
			var mNode;
			var panel = this.ScrollPanel;
			var items = this.PreviewItems;
			
			var itemIndex = -1;
			for(var i = 0; i < items.length; i++){
				var item = items[i];
				if(item.ItemId === itemId){
					mNode = item.ContentItem;
					itemIndex = i;
					break;
				}
			}
			
			this.PreviewItems.splice(itemIndex, 1);

			if(mNode){
				var cb = callback;
				var arg = dArg;
				TweenLite.to(mNode, .5, {rotationX:360, transformPerspective:200, onComplete:function(){
					TweenLite.to(mNode, .13,{css:{opacity:"0"},onComplete:function(){
						TweenLite.to(mNode, .15, {css:{height:"0"},onComplete:function(){
							panel.removeChild(mNode);
							if(cb)
								cb(arg);
						}});
					}});
				}});
			}
		},
		
		ResizeSelf: function(){
			var vs = utils.GetViewPortSize();
			var searchBarHeight = dockedSearchBar.OffsetHeight();
			this.BasePanel.style.height = (vs.Y - searchBarHeight) + "px";
			this.BasePanel.style.marginTop = searchBarHeight + "px";
		},
		
		LoadItemUri: function(itemId){
			if(!itemId) return;
			var mNode;
			var panel = this.ScrollPanel;
			
			var mItem = this.PreviewItems.find(function(v){return v.ItemId === itemId;});
			if(mItem)
				mNode = mItem.ContentItem;
			
			if(mNode){
				previewOverlay.UnmarkAll();
				previewOverlay.MarkPreActive(itemId);
								
				var uri = mNode.getAttribute('data-url');
				var frame = this.PreviewFrame;
				var openLink = this.OpenInTabLink;
								
				function frameLoad(){
					frame.removeEventListener('load', frameLoad);
					openLink.setAttribute('data-url', uri);
					previewOverlay.MarkActive(itemId);
				};
				frame.addEventListener('load', frameLoad);

				frame.src = uri;
			}
		},
		
		LoadUri: function(uri){
		
			var itmd;
			if(this.PreviewItems){
				var m = this.PreviewItems.find(function(v){return v.Url === uri;});
				if(m)
					itmd = m.ItemId;
				
				//for(var i = 0; i < this.PreviewItems.length; i++){
				//	var pvItem = this.PreviewItems[i];
				//	if(pvItem.Url === uri){
				//		itmd = pvItem.ItemId;
				//		break;
				//	}
				//}
			}
			
			if(itmd){
				this.PreviewFrame.onload = function(){
					setTimeout(function(){previewOverlay.ScrollToItem(itmd);}, 200);
				};
			}
		
			this.PreviewFrame.src = uri;
			this.OpenInTabLink.setAttribute('data-url', uri);
		},

		Initialize: function(){
			if(this.PreviewItems === undefined)
				this.PreviewItems = [];
				
			var vSize = utils.GetViewPortSize();
			var searchBarHeight = $("#gmGoogleDockedSearchBar").offsetHeight;
			var baseHeight = vSize.Y - searchBarHeight;
			
			//overlay base div
			var base = $("div");
			base.id = "gSitePreviewBase";
			base.className = "gPreviewOverlay";
			base.setAttribute("style","height:" + baseHeight + "px;margin-top:" + searchBarHeight + "px;");
			$$('div.mw.gFullScreenWidth')[0].appendChild(base);
			this.BasePanel = base;
			
			base.addEventListener('click', function(e){
				if(e.originalTarget.id == "gSitePreviewBase"){
					//hide preview pane..
					gmEvents.Dispatch(gmEvents.Names.RequestPreviewToggle, { show: false});
				}
			});
			
			//outer div panel - contains everything
			var pvOuter = $("div");
			pvOuter.style.height = (base.offsetHeight - 10) + "px";
			pvOuter.style.width = "80%";
			pvOuter.className = "gPreviewOuterPane";
			pvOuter.id = "gPreviewOuterPane";
			base.appendChild(pvOuter);
			this.FrameContainer = pvOuter;
			
			//table to contain both the preview and the sidbar div's
			var containerTable = utils.CreateTable(1, 2);
			containerTable.className = "gPreviewContainerTable";
			containerTable.id = "gPreviewContainerTable";
			containerTable.style.width = "100%";
			containerTable.style.height = (base.offsetHeight - 10) + "px";
			pvOuter.appendChild(containerTable);
			
			var previewCell = containerTable.children[0].children[0];
			previewCell.style.width = "80%";
			
			var sidebarCell = containerTable.children[0].children[1];
			sidebarCell.style.width = "120%";
			
			//inner preview div
			var pvInner = $("div");
			pvInner.style.height = (base.offsetHeight - 2) + "px";
			pvInner.className = "gPreviewInnerPane";
			pvInner.id = "gPreviewInnerPane";
			previewCell.appendChild(pvInner);
			
			//sidebar div
			var sideBar = $('div');
			sideBar.className = "gPreviewSidebar";
			sideBar.id = "gPreviewSidebar";
			sideBar.style.height = (base.offsetHeight - 12) + "px";
			sidebarCell.appendChild(sideBar);
			
			//panel close button
			var closeButton = $('div');
			closeButton.className = "gPreviewPaneClose";
			closeButton.innerHTML = "<span>X</span>";
			closeButton.title = "Close Preview Pane";
			closeButton.addEventListener('click', function(e){
				e.stopPropagation();
				gmEvents.Dispatch(gmEvents.Names.RequestPreviewToggle, { show: false});
			});
			sideBar.appendChild(closeButton);
						
			//open in new tab link
			var openInTabLink = $('div');
			openInTabLink.id = "gPreviewPaneOpenInTab";
			openInTabLink.textContent = "Open In Tab";
			openInTabLink.setAttribute('data-url','');
			openInTabLink.title = "Open preview site in a new tab";
			openInTabLink.addEventListener("click", function(e){
				var oitData = e.target.attributes["data-url"];
				if(oitData){
					var dataVal = oitData.value;
					if(dataVal && dataVal.length > 0){
						window.open(dataVal.toString());
					}
				}
			});
			sideBar.appendChild(openInTabLink);
			this.OpenInTabLink = openInTabLink;
			
			//preview item panel
			var itemPanel = $("div");
			itemPanel.id = "gPreviewPanelItemPanel";
			sideBar.appendChild(itemPanel);
			this.ItemPanel = itemPanel;
			itemPanel.addEventListener('wheel', function(e){
				e.preventDefault();
				this.scrollTop += e.deltaY * 14;
			}, false);
			
			//scroll item panel
			var scrollPanel = $("div");
			scrollPanel.id = "gPreviewPanelItemScrollPanel";
			itemPanel.appendChild(scrollPanel);
			this.ScrollPanel = scrollPanel;
			
			itemPanel.addEventListener('mousewheel', function(e){
				e.stopPropagation();
			}, false)
			
			var gLis = $$('li.g');
			for(var i = 0; i < gLis.length; i++){
				var li = gLis[i];
				var wrapper = $('div.gResultWrapper', li);
				if(wrapper){

					if(wrapper.className.indexOf('gPreviewNone') > -1)
						continue;
					
					var itemId = wrapper.getAttribute('data-previewItemId');
					if(!itemId)
						continue; //no id, no preview
						
					var dataurl = wrapper.attributes["data-url"];
					if(dataurl){
						var href = dataurl.value;
						var pHref = utils.ParseUrl(href);
						
						if(pHref.domain == "youtube"){
							//"https://www.youtube.com/embed/" + videoId + "?autoplay=1"
							if(pHref.params['v']){
								href = "https://www.youtube.com/embed/" + pHref.params['v'] + "?autoplay=1";
							}
						}
						
						var pvLinkOuter = $('div');
						pvLinkOuter.setAttribute('data-previewItemId', itemId);
						pvLinkOuter.setAttribute('data-resultType', 'preview');
						pvLinkOuter.setAttribute('data-domain', pHref.host);
						pvLinkOuter.setAttribute('data-url', href);
						pvLinkOuter.className = "pvLinkOuterContainer";
						
						var pvItem = new previewItem();
						pvItem.ItemId = itemId;
						pvItem.Host = pHref.host;
						pvItem.Url = href;
						pvItem.ContentItem = pvLinkOuter;
						this.PreviewItems.push(pvItem);

						
						var pvLinkInner = $('div');
						pvLinkInner.className = "pvLinkInnerContainer";
						pvLinkOuter.appendChild(pvLinkInner);
						
						var pvLinkTable = utils.CreateTable(1, 3);
						pvLinkTable.style.width = "262px";
						var img = document.createElement("img");
						img.id = "pvFavIcon_" + itemId;
						img.style.width = "16px";
						img.style.height = "16px";
						img.style.marginLeft = "auto";
						img.style.marginRight = "auto";
						//img.src = "https://getfavicon.appspot.com/" + encodeURI("http://" + pHref.host)
						
						pvLinkTable.children[0].children[0].appendChild(img);
						
						//remove Button
						var removeButton = $('div');
						removeButton.id = "closeButton_" + itemId;
						removeButton.title = "Prevent '" + pHref.host + "' from iframing";
						removeButton.className = "gPreviewItemCloseButton";
						removeButton.setAttribute('data-domain', pHref.host);
						removeButton.innerHTML = "<div style='margin-left:auto;margin-right:auto;display:table;margin-top:1px;text-align:center;'>X</div>";
						var btnCell = pvLinkTable.children[0].children[2];
						btnCell.style.width = "18px";
						btnCell.appendChild(removeButton);
						removeButton.addEventListener('click', function(e){
							e.stopPropagation();
							var mItemId = this.id.substring(this.id.indexOf('_') + 1);
							var domain = this.getAttribute('data-domain');
							gmEvents.Dispatch(gmEvents.Names.RequestIFrameDomainRemoval, {itemId: mItemId, domain: domain});
						}, false);
						
						var pvLinkSpan = $("span");
						pvLinkSpan.setAttribute('style', 'text-overflow:ellipsis;overflow:hidden;');
						var dataTitle = wrapper.attributes["data-title"];
						
						var trimLength = 32;
						if(dataTitle){
							pvLinkSpan.textContent = utils.TrimToLength(dataTitle.value, trimLength, true);
							pvLinkSpan.title = dataTitle.value;
						}
						else {
							pvLinkSpan.textContent = utils.TrimToLength(href, trimLength, true);
							pvLinkSpan.title = href;
						}

						pvLinkTable.children[0].children[1].appendChild(pvLinkSpan);
						pvLinkOuter.addEventListener('click', function(e){
							
							var selItems = utils.ArrayFromCollection($$('.pvLinkInnerContainerSelected'));
							var preSelItems = utils.ArrayFromCollection($$('.pvLinkInnerContainerPreSelected'));
							for(var i = 0; i < preSelItems.length; i++)
								selItems.push(preSelItems[i]);
							
							for(var i = 0; i < selItems.length; i++){
								var sLink = selItems[i];
								if(sLink.className && sLink.className.indexOf('pvLinkInnerContainerSelected') != -1)
									sLink.className = sLink.className.split('pvLinkInnerContainerSelected').join();
									
								if(sLink.className && sLink.className.indexOf('pvLinkInnerContainerPreSelected') != -1)
									sLink.className = sLink.className.split('pvLinkInnerContainerPreSelected').join();
							}

							var dataUrl = this.attributes["data-url"].value;
							$('#gPreviewPaneOpenInTab').setAttribute('data-url', dataUrl);
							
							var me = this;
							$('.pvLinkInnerContainer', me).className += " pvLinkInnerContainerPreSelected";
							setTimeout(function(){ 
								try {
									var theElm = $('.pvLinkInnerContainer', me);
									var iframe = $('#gPreviewWindowFrame');
									
									setTimeout(function(){
										theElm.scrollIntoView(true);
										itemPanel.scrollTop -= 5;
									},100);
									
									iframe.onload = function(){
										theElm.className = theElm.className.split('pvLinkInnerContainerPreSelected').join();
										theElm.className += " pvLinkInnerContainerSelected";
									};
									iframe.src = dataUrl; 
								} catch(e) {
									alert(e);
								}
							},1200);
							
							
						}, false);
						
						pvLinkInner.appendChild(pvLinkTable);
						
						scrollPanel.appendChild(pvLinkOuter);
					}
				}
			}

			// -- NOTE: Firefox must enable preference:  security.mixed_content.block_active_content
			var iframe = $("iframe");
			//iframe.setAttribute('seamless', 'seamless');
			//iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-top-navigation');
			iframe.id = "gPreviewWindowFrame";
			iframe.className = "gPreviewFrame";
			pvInner.appendChild(iframe);	
			this.PreviewFrame = iframe;
			
		}
		
	};
})();

var pageModule = (function PagerModule(){
	
	var hasPrevious;
	var hasNext;
	var container;
	
	var previousLocation, nextLocation;

	return {
		
		SetDisplayState: function(state){
			if(!container) return;
			if(state)
				TweenLite.to(container, .5, {autoAlpha:1});
			else 
				TweenLite.to(container, .5, {autoAlpha:0});
		},
		
		GetTop: function(){
			return container.offsetTop;
		},
		
		AdjustTop: function(newTop){
			container.style.top = newTop + "px";
		},
		
		CanGoBack: function(){ return hasPrevious; },
		
		CanGoForward: function(){ return hasNext; },
		
		GoBack: function(){
			if(hasPrevious && previousLocation){
				window.location = previousLocation;
			}
		},
		
		GoForward: function(){
			if(hasNext && nextLocation){
				window.location = nextLocation;
			}
		},
		
		Initialize: function(){
			var url = utils.ParseUrl(document.location.href);
			var ires = $('#ires');
			var pager = $('div');
			pager.className = "gPager";
			container = pager;
			
			var pageList = $("ul");
			pager.appendChild(pageList);
			ires.insertBefore(pager, ires.firstChild);
			
			var nav = $("#nav");
			var navCells = $$("tr td", nav);

			hasPrevious = false;
			hasNext = false;

			utils.ArrayFromCollection(navCells).forEach(function(cell,i,a){
				var skip = false;
				if(i == 0 && cell.className.indexOf('navend') > -1){
					hasPrevious = true;
					skip = true;
				}
				if(i == (navCells.length - 1) && cell.className.indexOf('navend') > -1){
					hasNext = true;
					skip = true;
				}
				
				if(!skip){
					var pagerNumber = utils.Trim(cell.textContent);
					var isCurrent = cell.className.indexOf('cur') != -1;
					
					var pageNumber = $('li');
					pageList.appendChild(pageNumber);
					
					if(!isCurrent){
						var pageDest = $('a', cell).href;
						pageNumber.innerHTML = "<a href='" + pageDest + "' class='gPagerLink'><span class='gPagerPageNumber'>" + pagerNumber + "</span></a>";
					} else {
						pageNumber.innerHTML = "<span class='gPagerPageNumber'>" + pagerNumber + "</span>";
						pageNumber.className = "cur";
					}
				}
								
			});
			
			if(hasPrevious){
				if(navCells[0].textContent.length > 0) {
					var pgDest = $('a', navCells[0]).href;
					var liPrev = $("li");
					var prvLink = $('a');
					prvLink.id = "gmCleanSearch_NavigationPrevious";
					prvLink.href = pgDest;
					previousLocation = pgDest;
					prvLink.className = "gPagerLink";
					var imgPrv = $("img");
					imgPrv.src = _arrowRight;
					liPrev.appendChild(imgPrv);
					TweenLite.to(imgPrv, 0, {rotation:"180_ccw"});
					prvLink.appendChild(imgPrv);
					pageList.insertBefore(prvLink, pageList.firstChild);
				}
			}
			
			if(hasNext){
				var lastLink = $('a', navCells[navCells.length - 1]);
				if(lastLink){
					var pgDest = lastLink.href;
					var liNext = $("li");
					var nxtLink = $('a');
					nxtLink.id = "gmCleanSearch_NavigationForward";
					nxtLink.href = pgDest;
					nextLocation = pgDest;
					nxtLink.className = "gPagerLink";
					var imgNext = $("img");
					imgNext.src = _arrowRight;
					nxtLink.appendChild(imgNext);
					liNext.appendChild(nxtLink);
					pageList.appendChild(liNext);
				}
			}
			
			var pspan = utils.FirstParentWithTagName(nav, "span");
			if(pspan)
				pspan.removeChild(pspan.firstChild);
				
			var kappbar = $("#kappbar");
			if(kappbar && kappbar.offsetHeight > 0)
				pager.style.top = dockedSearchBar.OffsetHeight() + "px";
		},
	
	};
})();

////////////////////////////////////////////////////////////////////////////////////////
// Utility functions
////////////////////////////////////////////////////////////////////////////////////////



function Utils(){
	
	return { 	
		
		FindTop: function(elm){
			var curtop = 0;
			if (elm.offsetParent) {
			   do {
					curtop += elm.offsetTop;
			   } while (elm = elm.offsetParent);

			   return [curtop];
		   }
		},
		
		ToBool: function(inp){
			if(inp.toLowerCase() === "true")
				return true;
			if (inp.toLowerCase() === "false")
				return false;
			return undefined;
		},
		
		$: function (selector, el) {
			var isQuery = !(!el);
	        if (!el) { el = document; }
			
			if(isQuery || ['.','#','[',']',':','-','_',' '].some(function(v){ return selector.indexOf(v) != -1 })) {
				try {
					return el.querySelector(selector);
				} catch(e) {
					alert(e + " : " + selector);
				}
			} 
				
			return document.createElement(selector);
	    }, //$
		
		$$: function(selector, el){
			if(!el)
				el = document;
			return el.querySelectorAll(selector);
		}, //$$
		
		$m: function(selectors, el){
			if(!selectors) return null;
			
			if(selectors.length == 1)
				return this.$(selectors[0], el);
			
			if (!el) { el = document; }
			
			var arr = [];
			for(var i = 0; i < selectors.length; i++){
				var sel = selectors[i];
				arr.push(el.querySelector(selectors));
			}
			return arr;
		},
		
		$$m: function(selectors, el){
			if(!selectors) return null;
			
			if(selectors.length == 1)
				return this.$$(selectors[0], el);
			
			if (!el) { el = document; }
			
			var arr = [];
			for(var i = 0; i < selectors.length; i++){
				var sel = selectors[i];
				arr.push(el.querySelectorAll(selectors));
			}
			return arr;
		},

		StartsWith: function(all, part){
			return all.substr(0, part.length) == part;
		},
		
		EndsWith: function(all, part){
			return all.substr(all.length - part.length) == part;
		},
		
		Trim: function(all){		
			if((new RegExp(/^(\s+).*(\s+)$/)).test(all)){
				return all.replace(/^(\s+).*(\s+)$/, '');
			} else if ((new RegExp(/\w+\s+$/)).test(all)){
				return all.replace(/\w+\s+$/, '');
			} else if ((new RegExp(/^\s+\w+$/)).test(all)){
				return all.replace(/^\s+\w+$/, '')
			} else {
				return all;
			}
		},
		
		TrimStart: function(all, some, matchCase){
			if(!matchCase){
				all = all.toLowerCase();
				some = some.toLowerCase();
			}

			if(all.indexOf(some) == -1 || all.substr(0, some.length) != some) return all;
			return all.substr(some.length);
		},
		
		TrimEnd: function(all, some, matchCase){
			if(all.indexOf(some) == -1 || all.substr(all.length - some.length) == some) return all;
			return all.substr(0, all.length - some.length);
		},
		
		TrimToLength: function(input, maxlen, ellipsisEnding){
			if(input.length < maxlen) return input;
			if(ellipsisEnding)
				return input.substring(0, maxlen - 3) + "...";
			return input.substring(0, maxlen);
		},
		
		GetUUID: function generateUUID(){
			var d = Date.now();
			var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = (d + Math.random()*16)%16 | 0;
				d = Math.floor(d/16);
				return (c=='x' ? r : (r&0x7|0x8)).toString(16);
			});
			return uuid;
		},
		
		GetViewPortSize: function(){
			var w = window,
				d = document,
				e = d.documentElement,
				g = d.getElementsByTagName('body')[0],
				x = w.innerWidth || e.clientWidth || g.clientWidth,
				y = w.innerHeight|| e.clientHeight|| g.clientHeight;
			var obj = {
				X: x,
				Y: y
			};
			return obj;
		},
		
		FirstChildWithClassName: function(root, className){
			if(!root || !className) return null;
			
			for(var i = 0; i < root.children.length; i++){
				var child = root.children[i];
				if(child.className && child.className.indexOf(className) > -1)
					return child;
			}
			return null;
		},
		
		ArrayFromCollection: function(collection){
			var arr = [];
			for(var i = collection.length; i--; arr.unshift(collection[i]));
			return arr;
		},
	
		AddGlobalStyle: function(css, id){
			if(document.getElementById(id))
				return;

			var head, style;
			head = document.getElementsByTagName('head')[0];
			if (!head) { return; }
			style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = css;
			style.setAttribute('id', id);
			head.appendChild(style);
		},
		
		SplitApart: function(arr, maxGroups){
			var itemsPerSmallerArr = Math.ceil(arr.length/maxGroups);
			var distributedArr = [];
			var count = 0;
			var tmpArr = [];

			for(i=0; i < arr.length; i++){
				if(count < itemsPerSmallerArr)
				{
					tmpArr.push(arr[i]);
				}
				else
				{
					distributedArr.push(tmpArr);
					count = 0;
					tmpArr = [];
					tmpArr.push(arr[i]);
				}
				count++;
			};

			distributedArr.push(tmpArr);
			return distributedArr;
		},
		
		CreateTable: function(rows, cols){
			var table = document.createElement('table');
			for(var i = 0; i < rows; i++){
				var row = document.createElement('tr');
				for(var j = 0; j < cols; j++){
					var cell = document.createElement('td');
					row.appendChild(cell);
				}
				table.appendChild(row);
			}
			return table;
		},
		
		ParseUrl: function(url){
			var a = document.createElement('a');
			a.href = url;
			return {
				source: url,
				protocol: a.protocol.replace(':', ''),
				host: a.hostname,
				port: a.port,
				query: a.search,
				params: (function () {
					var ret = {},
						seg = a.search.replace(/^\?/, '').split('&'),
						len = seg.length, i = 0, s;
					for (; i < len; i++) {
						if (!seg[i]) { continue; }
						s = seg[i].split('=');
						ret[s[0]] = s[1];
					}
					return ret;
				})(),
				file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
				hash: a.hash.replace('#', ''),
				path: a.pathname.replace(/^([^\/])/, '/$1'),
				relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
				segments: a.pathname.replace(/^\//, '').split('/'),
				domain: (function(){
					var dParts = a.hostname.split('.');
					if(dParts.length == 2){
						return dParts[0];
					}
					if(dParts.length >= 3){
						return dParts[1];
					}
				})(),
				tld: (function(){ 
					var p = a.hostname.split('.');
					return p[p.length - 1]; 
				})(),
			};
		},

		FirstParentWithTagName: function(child, tag){
			if(!child || !tag) return null;
			
			tag = tag.toLowerCase();
			var matchesSelf = child.tagName.toLowerCase() == tag;
			var base = child;
			
			if(base.parentNode){
				var p = base;
				while(p.tagName.toLowerCase() != tag){
					if(p.parentNode == null) break;
					p = p.parentNode;
				}
				return p;
			}
			return matchesSelf ? child : null;
		},

	};	
}

/////////////////////////////////////////////////////////////////////////////////////