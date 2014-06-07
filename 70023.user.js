// ==UserScript==
// @name           HSBC - Account History enhancer
// @namespace      https://www.hsbc.com.au/*
// @include        *
// ==/UserScript==

// this script is only for the "Account History" page
if(document.getElementsByTagName('title')[0].text.match("Account History")){
	// Yes, I'm French :)
		var DOW = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
		var Months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

	// Add jQuery (thx http://joanpiedra.com/jquery/greasemonkey/)
		var GM_JQ = document.createElement('script');
		GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
		//GM_JQ.src = 'http://localhost/js/jquery-latest.js';
		GM_JQ.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	  // Check if jQuery's loaded
		function GM_wait() {
				if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
		else { $ = unsafeWindow.jQuery; letsJQuery(); }
		}
		GM_wait();

	// All your GM code must be inside this function
		function letsJQuery() {
		
			// First have a centering function for final display
			// Thx Tony L. - http://stackoverflow.com/questions/210717/what-is-the-best-way-to-center-a-div-on-the-screen-using-jquery
			$.fn.center = function () {
				this.css("position","absolute");
				this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
				this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
				return this;
			}

			// previous feature, finally annoying: forcing range to the maximum by default (90days)
			/*$.each($("select"), function(index, value){
					if(value.name=="transactionDays")
					// if transactionDays select == 0 (default value), then set it to largest range
					if(value.name=="transactionDays" && $(value).val()==0){
						$(value).val($(value.options).get(-1).value);
						// then fire the select onchange
						$(value).trigger("change"); 
					}
				});*/
			
			// set some style (no need to have wide spaces around lines)
			$('<style type="text/css">table.hsbcTableStyle07 tr td{ padding:0px 5px 0px 5px; line-height: 1em; }</style>').prependTo($('head'));
			
			// beautify each line content + stack values in an array
			var myData = [];
			$.each($("table.hsbcTableStyle07 tr"), function(TRind, TRval) {
				//console.log('TR ' + TRind, TRval);
				// initiate 2 variables before beginning of loop
				var lineDate=null;
				var lineVal=null;
				var mytd = $(this).children("td").each(function(index, value){
					//console.log('TD ' + index, value);

					if(value.headers=="header1"){
						// reformat the date column and stack it for the graph
						date=new Date(value.innerHTML);
						// if not a date, get out
						if(!date.getTime()) return false;
						value.innerHTML='<span style="float:right">'+DOW[date.getDay()]+', '+date.getDate()+' '+Months[date.getMonth()]+' '+date.getFullYear()+'</span>';
						lineDate=date.getTime();
					}
					else if(value.headers=="header2"){
						// remove some non-useful data from details column and make it 1 line only
						tmp=value.innerHTML.split('<br>');
						tmp1=tmp[0] + ' - ' + tmp[2] + ' - ' + tmp[3] + ' ' + tmp[4];
						value.innerHTML=tmp1.replace(/[\n ]+/g,' ');
					}
					else if(value.headers=="header5"){
						// stack value for the graph
						lineVal=value.innerHTML.replace(/[\t\n\r 	]+/g,'').replace(/,/g,'');
					}
				});
				if(lineDate!=null && lineVal!=null) myData.push([lineDate, lineVal]);
			});
			
			//console.log(myData);
			
			// 2e part: load jquery.flot to draw a chart
			//$.getScript('http://localhost/js/jquery.flot.js', function() {
			$.getScript('http://flot.googlecode.com/svn-history/r139/trunk/jquery.flot.js', function() {
				
				// show/hide functions
				function show(){
					$("#chartwrap")
						.css('display', 'block')
						.center();
				}
				function hide(){
					$("#chartwrap").css('display', 'none');
				}
				
				// add a div somewhere in the DOM
				$('<div id="chartwrap" style="border: 1px solid #AAA; background-color:white; position: absolute;"></div>').appendTo("body");
				$('<div id="placeholder" style="width:650px; height:300px;"></div>').appendTo("#chartwrap");
				
				// draw the chart in its div
				// TODO: do way better ! watch here: http://people.iola.dk/olau/flot/examples/stacking.html
				$.plot($("#placeholder"), [myData], { xaxis: { mode: "time" } });
				
				// display a button to toggle chart visibility
				$('<a class="hsbcLinkStyle06">Display chart</a>')
					.prependTo($('td.hsbcTableColumn03')[0])
					.css('cursor', 'pointer')
					.toggle(show, hide);
				$('#placeholder').click(hide);

				hide();
			});
		}
}
