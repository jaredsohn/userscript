// ==UserScript==
// @author         mungushume
// @version        2.0
// @name           The Data: URI kitchen utility (hixie.ch) 
// @namespace      mungushume_@_hotmail_._com
// @description    Makes hixie's data tool work on one page (using iframes). Gives you easily selectable data via a double click. Displays the data on one or multiple lines. Tells you the size of the string data.
// @include        http://software.hixie.ch/utilities/cgi/data/data
// @scriptsource   http://userscripts.org/scripts/show/9240
// @grant		   GM_xmlhttpRequest
// @require 		http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

// Version 1.0.1 some minor cosmetic lifts as recommended by znerp
// Version 1.0.2 some more major cosmetic lifts as recommended and coded by alien_scum
// Version 2.0 re-writen with jQuery

var $ = jQuery.noConflict();

var hixie = {
	init : function(){
		var frm = $("form");
		if((frm = frm[0])){
			var that = this;
			$.each($("input[name='base64']"), function(){
				$(this).attr('checked','checked');
			});

			$.each($('input[type=submit]'), function(){
				$(this).click(function(e){
					e.preventDefault();
					e.stopPropagation();
					that.submit(frm);
				})
			});
		}
	},

	submit : function(frm){
		var that = this;
		var data = new FormData(frm);
		GM_xmlhttpRequest({
			method: "POST",
			contentType : false,
			data: data,
			onload: function(data) { 				
				that.display(data)
			},
		});			
	},

	display : function(data)
	{
		// console.log(data.finalUrl, data.responseHeaders); 
		var head = data.finalUrl.split(';', 1);
		if(!head) return;

		data = data.finalUrl;
		var img;

		if(head[0] && head[0].indexOf('data:image') != -1){
			img = $('<p/>').wrapInner(
				$('<img/>',{
					src: data
				})
			);
		}

		var out=''
		for(var i=0; i<data.length; i+=100)
		{
			out+='"'+ data.substr(i,100) +'"';
			if((i+100)<data.length){
				out+='+';
			}
			out+='\n';
		}

		p = $('<p/>', {
			html: "&nbsp;"+this.scaled_size((data.length+2),2)+" as a single line. ("+ (data.length+2) +" chars)",
			css: {
				fontFamily: "'Courier New', Courier, monospace",
				fontSize: "11px"
			},
		})
		.after(

		$('<p/>').append(
			$('<input/>', {
				type: 'text',
				size: '108',
				title: 'Double click to select all',
				css: {
					fontFamily: "'Courier New', Courier, monospace",
					fontSize: "11px",
					width: '100%',
					color: '#000'
				},
				value: '"'+data+'"',
				dblclick: function(){
					this.focus();
					this.select();
				}
			})
		)
		).after(

		$('<p/>', {
			html: "&nbsp;"+this.scaled_size((out.length),2)+" as multiple lines. ("+ out.length +" chars, "+ (i/100) +" lines)",
			css: {
				fontFamily: "'Courier New', Courier, monospace",
				fontSize: "11px"
			},
		})
		)
		.after(

		$('<p/>').append(
			$('<textarea/>', {
				type: 'text',
				cols: '105',
				rows: (i/100),
				title: 'Double click to select all',
				css: {
					fontFamily: "'Courier New', Courier, monospace",
					fontSize: "11px",
					width: '100%',
					color: '#000'
				},
				wrap: 'physical',
				
				dblclick: function(){
					this.focus();
					this.select();
				},
				html: out
			})
		)
		)

		$.each($('input[type=submit]'), function(){
			var div = $('#resultsDiv');
			if(div.length==0){
				div = $('<div/>',{
					id: 'resultsDiv'
				});
				$(this).after(div);
			}
			div.html('');
			if(img)
				div.append(img)
			div.append(p)
		});


	},

	scaled_size : function(Value, DP){
	    if (Value > 1024) {
	        if (Value > Math.pow(1024, 3)){
	            return (Value / Math.pow(1024, 3)).rounddp(DP) + "GB";
	        }else if (Value > Math.pow(1024, 2)){
	            return (Value / Math.pow(1024, 2)).rounddp(DP) + "MB";
	        }else{
	            return (Value / 1024).rounddp(DP) + "KB";
	        }
	    }else{
	        return Value + "B";
	    }
	}
}


Number.prototype.rounddp=function(dp){return Math.round(this*Math.pow(10,dp))/Math.pow(10,dp);}

hixie.init();