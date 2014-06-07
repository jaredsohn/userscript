// ==UserScript==
// @id             sych_3d6adc485c001a9d7754bfd204900a4b
// @name           Simple Youtube Comment Helper
// @version        1.4.4
// @namespace      http://userstyles.org/
// @author         Skydda
// @description    Tired of finding the comment that someone replied to? Not anymore, hover over the link and see the comment. 
// @include        http://*.youtube.*
// @include        http://*.youtube.com/*
// @include        http://www.youtube.com/*
// @include        https://*.youtube.*
// @include        https://*.youtube.com/*
// @include        https://www.youtube.com/*
// @run-at         document-end
// ==/UserScript==
var settings = {};
var page = {};
var hoverBox;
var settingBox;

(function(){
	settings.user = getUserPreferences();
	settings.markup = createMarkupData();
	insertStyles();
	
	page.linv = {}; // contains intervals so that we can clear them
	page.latestComment = document.querySelector('.comment');
	
	if( page.videoId = document.querySelector('link[rel="canonical"]').getAttribute('href').replace('/watch?v=','') ) {
		page.videoId = page.videoId;
	} else {
		return false;
	}
	page.gdataURL = 'https://gdata.youtube.com/feeds/api/videos/'+ page.videoId +'/comments/';
	
	page.mouseY = 0;
	page.mouseX = 0;
	
	page.updateMousePos = function(e) {
		page.mouseY = e.clientY;
		page.mouseX = e.clientX;
	}
	
	page.registerDrag = function(e) {
		e.preventDefault();
		if( this == hoverBox ) {
			var pnode = this;
		}
		
		else {
			var pnode = this.parentNode.parentNode;
		}
		
		pnode.style.zIndex = 102;

		clearInterval(page.linv[pnode.id]);
		page.linv[pnode.id] = setInterval( function() {
			if( pnode.style.position == 'fixed' ) {
				pnode.style.top = page.mouseY - 20 + 'px';
				pnode.style.left = page.mouseX - (pnode.getBoundingClientRect().width / 2) + 'px';
			}
			
			else {
				if( e.offsetY && e.offsetX ) {
					pnode.style.top = window.scrollY + page.mouseY - e.offsetY + 'px';
					pnode.style.left = window.scrollX + page.mouseX - e.offsetX + 'px';
				}
				
				else {
					pnode.style.top = window.scrollY + page.mouseY - e.layerY + 'px';
					pnode.style.left = window.scrollX + page.mouseX - e.layerX + 'px';
				}
			}
		} , 1000/30 );
	}
	
	page.unRegisterDrag = function(e) {
		if( this == hoverBox ) {
			var pnode = this;
		}
		
		else {
			var pnode = this.parentNode.parentNode;
		}
		
		pnode.style.zIndex = 101;
		clearInterval(page.linv[pnode.id]);
	}
	
	window.addEventListener( 'mousemove' , page.updateMousePos , false );
	
	document.getElementById('page').insertAdjacentHTML( 'beforeend' , getMarkup('settingBox') );
	document.getElementById('page').insertAdjacentHTML( 'beforeend' , getMarkup('hoverBox') );
	settingBox = document.getElementById('sych-settings');
	hoverBox = document.getElementById('comment-hover-box');
	
	init_hoverBox();
	init_settingBox();
	
	processComments();
	listenPagers();
})();

function getUserPreferences() {
	var upref;
	if( upref = localStorage.getItem('sych_settings') ) {
		upref = JSON.parse(upref);
		
		if( upref.fadeTimeout ) {
			return upref;
		}
		
		upref.fadeTimeout = 1500;
		return upref;
	}
	
	upref = { 'displayMode' : 'hover' , 'fadeTimeout' : 1500 , 'noSettings' : true };
	return upref;
}

function processComments() {
	document.querySelector('.comments-section-see-all').insertAdjacentHTML('afterend','<span class="ch-open-settings">comment helper</span>');
	document.querySelector('.ch-open-settings').addEventListener( 'click' , function() {
		settingBox.style.display = 'block';
	} , false );
	
	if( settings.user.displayMode === 'hover' ) {
		document.querySelector('.ch-open-settings').insertAdjacentHTML('afterend','<span class="ch-reset">reset drag</span>');
		document.querySelector('.ch-reset').addEventListener( 'click' , function() {
			clearInterval(page.linv['comment-hover-box']);
		} , false );
	}
	
	var comments = document.querySelectorAll('.watch-comment-atlink');
	
	for( var i = 0; i < comments.length; i++ ) {
		comments[i].addEventListener( 'mouseover' , getCommentParent , false );
		
		if( settings.user.displayMode === 'hover' ) {
			comments[i].addEventListener( 'mouseout' , function() {
				hoverBox.startFade();
			} , false );
		}
	}
}

function setHoverBoxPosition( ) {
	if ( settings.user.displayMode === 'hover' ) {
		hoverBox.style.left = ( window.scrollX + page.mouseX + 60 ) + 'px';
		hoverBox.style.top = ( window.scrollY + page.mouseY + 20 ) + 'px';
	}
}

function getCommentParent() {
	var cParent = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	
	if( settings.user.displayMode === 'hover' ) {
		hoverBox.clearFade();
	}
	
	hoverBox.style.display = 'block';
	setHoverBoxPosition();
	
	hoverBox.clearContent();
	hoverBox.addContent( settings.markup.loader );
	
	GM_xmlhttpRequest({
		method : 'GET',
		url : page.gdataURL + cParent.getAttribute('data-id') + '?alt=json',
		onload : function( response ) {
			if( response.status !== 200 ) {
				hoverBox.modifyContent(settings.markup.unsolved);
				return false;
			}
			var a = JSON.parse(response.responseText);
			
			if( a.isReply = gdt_isreply( a ) ) {
				GM_xmlhttpRequest({
					method : 'GET',
					url : page.gdataURL + a.isReply + '?alt=json',
					onload : function( response ) {
						var b = JSON.parse(response.responseText);
						hoverBox.modifyContent(getStyledHTML( b ));
						
						if( b.isReply = gdt_isreply( b ) ) {
							var bttns = document.querySelectorAll('span[data-tid="'+b.isReply+'"]');
							
							for( var n = 0; n < bttns.length; n++ ) {
								bttns[n].addEventListener( 'mousedown' , loadAnother, false );
							}
						}
					}
				});
			} else {
				hoverBox.modifyContent(settings.markup.unsolved);
			}
		}
	});
}

function listenPagers() {
	var allPagers = document.querySelectorAll( '.yt-uix-pager-button' );
	for( var k = 0; k < allPagers.length; k++ ) {
		allPagers[k].addEventListener( 'click' , commentListener , false );
	}
}

function commentListener() {
	page.latestComment = document.querySelector('.comment');
	clearInterval(settings.pLi);
	settings.pLi = setInterval( function() {
		if( page.latestComment !== document.querySelector('.comment') ) {
			clearInterval(settings.pLi);
			
			listenPagers();
			processComments();
		}
	} , 200 );
}

function loadAnother(e) {
	e.stopPropagation();
	
	this.innerHTML = '';
	
	hoverBox.addContent( settings.markup.loader );
	
	GM_xmlhttpRequest({
		method : 'GET',
		url : page.gdataURL + this.getAttribute('data-tid') + '?alt=json',
		onload : function( response ) {
			if( response.status !== 200 ) {
				hoverBox.modifyContent(settings.markup.unsolved);
				return false;
			}
			
			var c = JSON.parse(response.responseText);
			hoverBox.modifyContent(getStyledHTML(c));
			
			// Add listeners
			if( c.isReply = gdt_isreply( c ) ) {
				var bttns = document.querySelectorAll('span[data-tid="'+c.isReply+'"]');
				
				for( var k = 0; k < bttns.length; k++ ) {
					bttns[k].addEventListener( 'mousedown' , loadAnother, false );
				}
			}

		}
	});
}

function getMarkup( mid ) {
	return settings.markup[mid];
}

function getStyledHTML( gdt ) {
	var hout = '';
	
	hout += '<div class="content-container">';
	hout += '<div class="comment-text">';
	
	if( gdt.hasReply = gdt_hasreply( gdt ) ) {
		hout += '<p><a class="watch-comment-atlink" href="/comment_search?username='+gdt.hasReply.replace('@','')+'">'+gdt.hasReply+'</a> '+ gdt.entry.content.$t.replace( gdt.hasReply , '' ) +'</p></div>';
	}
	
	else {
		hout += '<p>'+gdt.entry.content.$t+'</p>';
	}
	
	hout += '</div>'; // </div.comment-text>
	
	if( gdt.isReply = gdt_isreply( gdt ) ) {
		hout += '<p class="metadata"><span class="author"><a class="yt-user-name" href="/user/'+gdt.entry.author[0].name.$t+'">'+gdt.entry.author[0].name.$t+'</a></span> <span class="time">'+(new Date( gdt.entry.published.$t )).toLocaleDateString()+'</span> <span class="comment-inception" data-tid="'+gdt.isReply+'">Load more</span></p>';
	}
	
	else {
		hout += '<p class="metadata"><span class="author"><a class="yt-user-name" href="/user/'+gdt.entry.author[0].name.$t+'">'+gdt.entry.author[0].name.$t+'</a></span> <span class="time">'+(new Date( gdt.entry.published.$t )).toLocaleDateString()+'</span></p>';
	}
	
	hout += '</div>'; // </div.content-container>
	
	return hout;
}

function createMarkupData() {
	var markups = {};
	markups.loader = '<p class="hasLoader"><span class="ch-loader-indicator"></span></p>';
	markups.unsolved = '<p style="text-align: center; font-size: 14px; color: #9a5a61;">Could not be resolved</p>';
	markups.settingBox = '<div id="sych-settings"><div class="controls"><h4>Simple YT Comment Helper settings</h4><span class="sych-sprite ch-close-button"></span></div><div class="ch-content"><div class="chb-item"><div class="content-container"><p>Display mode: <select id="sych-display-mode"><option value="hover">Only on hover</option><option value="fixed">Stays after hover</option></select></p><p class="sych-display-option-hover">Timeout: <select><option value="500">0.5 s</option><option value="1000">1.0 s</option><option value="1500">1.5 s</option><option value="2000">2.0 s</option><option value="3000">3.0 s</option><option value="4000">4.0 s</option></select></p><p><button class="sych-options-save">Save changes</button><button class="sych-options-cancel">Cancel</button></p></div></div></div></div>';
	
	if( settings.user.displayMode === 'fixed' ) {
		markups.hoverBox = '<div id="comment-hover-box"><div class="controls"><h4>Símple Youtube Comment Helper</h4><span class="sych-sprite ch-close-button"></span><span class="sych-sprite ch-sett-button"></span></div><div class="chb-content"></div></div>';
	}
	
	else {
		markups.hoverBox = '<div id="comment-hover-box"></div>';
	}
	
	return markups;
}

function insertStyles() {
	GM_addStyle( '.sych-sprite { background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDChI7FyH28aEAAAKsSURBVFjD3ZY/aBRREMZ/szkVQtIoHEhEQkC0COopahFsLLVSQ5pgchtJI0o4EBst00oQ62QvWIgSCwtbEUIQgxIDhxgCEiQQESwuqKAhOxb7Fnf33t3t5TYWft2+nXnzzZ83M0It+oEzQE/ifB14C1RoAE9oCFfj31HxTuAicKzxFawAL4CfrRq3kQhV9gMjQFe6K/gOeEC1FcM2Ig7QAQy2YBwjO5iI4I7gAAUgb/upqpOqOllH9yBw3Op9yjNPAgKn2nDgpM1QcVshkmdHzZnYI5Bvg8Ch2rDBjAhFDUg4CiOqzIrESIXI2cLe6ExE7jUJNo4EJMY0sDgrgkr9GtgV5OJBSSVX42HoecJrmt0dhr2cE/xtGDMp0Do18LUNR9dtRVgFyjkB/286NuvQdYClNgi8t8WkSwA/XhPdYq8YMY3o+g5ewwYwA2hbnVBVt4E5017T4gfwrEl9pYKoeSoi0glcAo7+82EUkjBE+oFzptUmQ/5GVSsiktk4zhmj4bNDVStARUT2AgeM3DdV/S0iNDJu0GsG1enIaP8IvDOpXms2NnYMT7gG3AL21RH5BTx0lUeZEvCEPcADYCClygIw4SpbWbXiUgvGMbITmUTAE44AT2NzRZhHOZ/oOC9RLkROfOBqFhG4nDC+5PrcRJkAtsxsGHd9Skis6zrAlSwIDCRacWEahlx4hXLbUcZHYbEMwyiFpG4uAwI9ln3g7rSCG6SGMgyrcMeim9/NfWAtMp8+19tJsyCwYdkHxkdh0eugaNIxL8oNi+6XLFKwAByOFOGHqrLsdVDEp+QITCtswvNuZRnhRET39a48Q4U1CVpyFJ+AvsQzHGo7Ba6yCjxJ9Pdei2hf4vuxq6xmVYT3TSpaSdvU/zOMEiTCcXw2stysAIvAnKvxcfwH7vrf9DyFvtQAAAAASUVORK5CYII=") no-repeat scroll 0 0 transparent; }' );
	GM_addStyle( '.ch-close-button { background-position: -16px -16px; width: 16px; height: 16px; display: inline-block; cursor: pointer; float: right; margin: 7px 2px 0 0; }' );
	GM_addStyle( '.ch-sett-button { width: 16px; height: 16px; display: inline-block; cursor: pointeR; float: right; margin: 7px 2px; }' );
	GM_addStyle( '.ch-loader-indicator { display: inline-block; width: 16px; height: 16px; background: url("data:image/gif;base64,R0lGODlhEAAQAPQAAP///1hYWPT09LKysurq6oWFhaenp1hYWJGRkW9vb8jIyNTU1GVlZb29vVpaWnt7e5ubmwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAkKAAAALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx+lwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6/3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh+QQJCgAAACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI+yioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l/Ag1AXySJgn5LcoE3QXI3IQAh+QQJCgAAACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK/e8LRIHn+i1cK0IyKdg0VAoljYIg+GgnRrwVS/8IAkICyosBIQpBAMoKy9dImxPhS+GKkFrkX+TigtLlIyKXUF+NjagNiEAIfkECQoAAAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkECQoAAAAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK+VgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAkKAAAALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq+KPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkECQoAAAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2/Q4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAkKAAAALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm+kaCxyxa+zRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh+QQJCgAAACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb+A41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh+QQJCgAAACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ/DkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA==") no-repeat scroll 0 0 transparent; }' );
	GM_addStyle( '.ch-open-settings { float : right; color : #1C62B9; margin : 5px 3px; cursor: pointer; } .ch-open-settings:hover { text-decoration: underline; }' );
	GM_addStyle( '.chb-item { font-size: 13px; margin: 0 0 12px; max-width: 280px; padding: 8px; background: #FEFEFE; border-radius: 3px; border: 0; box-shadow: 0 0 3px rgba( 0 , 0 , 0 , .2 ); }' );
	GM_addStyle( '.comment-inception { cursor: pointer; }' );

	// If someone uses ugly mode...
	if( settings.user.displayMode === 'fixed' ) {
		GM_addStyle( '#comment-hover-box { display: none; z-index: 101; width: 340px; background: none repeat scroll 0 0 #EBEBEB; border-radius: 3px 3px 3px 3px; box-shadow: 0 0 6px rgba(0, 0, 0, 0.3); padding: 4px 8px; }' );
		GM_addStyle( '#comment-hover-box .chb-content { overflow-y: scroll; }' );
		GM_addStyle( '#comment-hover-box .controls h4 { float: left; cursor: pointer; }' );
		GM_addStyle( '#comment-hover-box .controls { background: none repeat scroll 0 0 #FEFEFE; border-radius: 3px 3px 3px 3px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.25); height: 32px; margin: 4px 0 10px; padding: 0 4px; width: 308px; }' );
		GM_addStyle( '.chb-item .comment-text { margin-bottom: 6px; line-height: 16px; }' );
		GM_addStyle( '.chb-item p.metadata { font-size: 11px; }' );
		GM_addStyle( '.chb-item { max-width: 300px; }' );
		GM_addStyle( 'p.hasLoader { text-align: center; }' );
	}
	
	// The cool mode
	else {
		//GM_addStyle( '#comment-hover-box { z-index: 101; position: absolute; max-width: 280px; background: none repeat scroll 0 0 #FEFEFE; border-radius: 3px 3px 3px 3px; box-shadow: 0 0 6px rgba(0, 0, 0, 0.3); padding: 5px 9px; }' ); //OLD MODE
		GM_addStyle( '#comment-hover-box { z-index: 101; position: absolute; max-width: 280px; }' );
		// GM_addStyle( '#comment-hover-box { z-index: 101; position: fixed; max-width: 280px; }' );
		GM_addStyle( '#comment-hover-box .comment-text { margin-bottom: 6px; line-height: 16px; }' );
		GM_addStyle( '#comment-hover-box p.metadata { font-size: 11px; }' );
		GM_addStyle( '#comment-hover-box.fadeAway { -webkit-transition: opacity ' + settings.user.fadeTimeout / 1000 + 's linear; -moz-transition: opacity ' + settings.user.fadeTimeout / 1000 + 's linear; opacity: 0; }' );
		GM_addStyle( '.ch-reset { float : right; color : #1C62B9; margin : 5px 3px; cursor: pointer; } .ch-reset:hover { text-decoration: underline; }' );
	}
	
	GM_addStyle( '#sych-settings { top: 30px; left: 30px; z-index: 101; display: none; position: fixed; width: 340px; background: none repeat scroll 0 0 #EBEBEB; border-radius: 3px 3px 3px 3px; box-shadow: 0 0 6px rgba(0, 0, 0, 0.3); padding: 4px 8px; }' );
	GM_addStyle( '#sych-settings .chb-item p { line-height: 26px }');
	GM_addStyle( '#sych-settings .controls { background: none repeat scroll 0 0 #FEFEFE; border-radius: 3px 3px 3px 3px; box-shadow: 0 0 3px rgba(0, 0, 0, 0.25); height: 32px; margin: 4px 0 10px; padding: 0 4px; width: 308px; }' );
	GM_addStyle( '#sych-settings .controls h4 { float: left; cursor: pointer; }' );
	
	if( settings.user.noSettings )
		GM_addStyle( '#sych-settings { display: block }' );
}

function init_settingBox() {
	settingBox.style.position = 'fixed';
	settingBox.querySelector('.controls h4').addEventListener( 'mousedown' , page.registerDrag , false );
	settingBox.querySelector('.controls h4').addEventListener( 'mouseup' , page.unRegisterDrag , false );
	settingBox.querySelector('.ch-close-button').addEventListener( 'click' , function() {
		settingBox.style.display = 'none';
	} , false );
	settingBox.querySelector('#sych-display-mode').addEventListener( 'change' , function() {
		if( this.value === 'fixed' ) {
			settingBox.querySelector('.sych-display-option-hover').style.display = 'none';
		} else {
			settingBox.querySelector('.sych-display-option-hover').style.display = 'block';
		}
	} , false );
	
	settingBox.querySelector('.sych-options-save').addEventListener( 'click' , function() {
		var upref = {};
		if( settingBox.querySelector('#sych-display-mode').value === 'hover' ) {
			upref.fadeTimeout = settingBox.querySelector('.sych-display-option-hover select').value;
		}
		
		upref.displayMode = settingBox.querySelector('#sych-display-mode').value;
		
		localStorage.setItem('sych_settings',JSON.stringify(upref));
		
		alert('Preferences are saved.\nYou should now reload the page.');
		settingBox.style.display = 'none';
	} , false );
	settingBox.querySelector('.sych-options-cancel').addEventListener( 'click' , function() {
		settingBox.style.display = 'none';
	} , false );
}

function init_hoverBox() {
	if ( settings.user.displayMode === 'fixed' )
	{
		hoverBox.content = hoverBox.querySelector('.chb-content');
		hoverBox.querySelector('.controls h4').addEventListener( 'mousedown' , page.registerDrag , false );
		hoverBox.querySelector('.controls h4').addEventListener( 'mouseup' , page.unRegisterDrag , false );
		hoverBox.content.style.maxHeight = window.innerHeight - 100 + 'px';
		hoverBox.style.position = 'fixed';
		hoverBox.style.top = '30px';
		hoverBox.style.left = '30px';
		
		hoverBox.addContent = function(content) {
			hoverBox.content.insertAdjacentHTML('beforeend','<div class="chb-item">'+content+'</div>') ;
		}
		hoverBox.modifyContent = function(content) {
			hoverBox.querySelectorAll('.chb-item')[hoverBox.querySelectorAll('.chb-item').length - 1].innerHTML = content;
		}
		hoverBox.clearContent = function() {
			hoverBox.content.innerHTML = '';
		}
		
		window.addEventListener( 'resize' , function() {
			hoverBox.content.style.maxHeight = window.innerHeight - 100 + 'px';
		} , false );
		
		hoverBox.querySelector('.ch-close-button').addEventListener( 'click' , function() {
			hoverBox.style.display = 'none';
		} , false );
		
		hoverBox.querySelector('.ch-sett-button').addEventListener( 'click' , function() {
			settingBox.style.display = 'block';
		} , false );
	}
	
	else
	{
		hoverBox.addEventListener( 'mouseover' , function() {
			hoverBox.clearFade();
		} , false );
		
		hoverBox.addEventListener( 'mouseout' , function() {
			hoverBox.startFade();
		} , false );
		
		hoverBox.addEventListener( 'mousedown' , page.registerDrag , false );
		hoverBox.addEventListener( 'mouseup' , page.unRegisterDrag , false );
		
		hoverBox.addContent = function(content) {
			hoverBox.insertAdjacentHTML('beforeend','<div class="chb-item">'+content+'</div>') ;
		}
		hoverBox.modifyContent = function(content) {
			hoverBox.querySelectorAll('.chb-item')[hoverBox.querySelectorAll('.chb-item').length - 1].innerHTML = content;
		}
		hoverBox.clearContent = function() {
			hoverBox.innerHTML = '';
		}
		
		hoverBox.startFade = function() {
			hoverBox.className = 'fadeAway';
			hoverBox.fadeTimeout = setTimeout( function() {
				hoverBox.style.display = 'none';
			} , settings.user.fadeTimeout );
		}
		
		hoverBox.clearFade = function() {
			clearTimeout(hoverBox.fadeTimeout);
			hoverBox.className = '';
		}
	}
}


// GDATA FUNCTIONS

function gdt_isreply( gdt ) {
	for( var l = 0; l < gdt.entry.link.length; l++ ) {
		if( gdt.entry.link[l].rel === 'http://gdata.youtube.com/schemas/2007#in-reply-to' ) {
			return gdt.entry.link[l].href.replace( page.gdataURL , '' );
		}
	}
	
	return false;
}

function gdt_hasreply( gdt ) {
	if(	gdt.entry.content.$t.match( /(@\w*)/ ) ) {
		return gdt.entry.content.$t.match( /(@\w*)/ )[0];
	}
	
	return false;
}