// ==UserScript==
// @name  Télécharger Arsenal vs Sunderland 4 - 1 22 02 2014 Jeu Complet
// @include 
// @description  Télécharger Arsenal vs Sunderland 4 - 1 22 02 2014 Jeu Complet


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>CPAGrip - Daily Breakdown</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	
	<link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />
	<link href="css/main2.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="css/grip/jquery-ui-1.10.3.custom.css" id="theme">
	<link href="js/plugins/prettify/prettify.css" type="text/css" rel="stylesheet" />
	
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script src="sounds/sm/soundmanager2.js"></script>
	<script type="text/javascript">
		var snd_welcome, snd_logout;
		soundManager.setup({
			url: 'sounds/sm/',
			
			debugMode: false,
			onready: function() {
				snd_logout = soundManager.createSound({
					id: 'snd_logout',
					url: 'sounds/logout.mp3'
				});
				snd_welcome = soundManager.createSound({
					id: 'snd_welcome',
					url: 'sounds/welcome.mp3'
				});
				snd_chat = soundManager.createSound({
					id: 'snd_chat',
					url: 'sounds/chat.mp3'
				});
				snd_money = soundManager.createSound({
					id: 'snd_money',
					url: 'sounds/money.mp3'
				});
							},
			ontimeout: function() {
				// Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
			}
		});
		
				
						
		function Open_Referrals(id) {
			$('<iframe id="iframe_referral" src="iframe_referrals2.php" width="100%" height="95%" frameborder="0" scrolling="auto">').appendTo($("#ref_dialog"));
			$("#ref_dialog").dialog({
				height : 600,
				minHeight : 350,
				minWidth : 850,
				width : 850,
				modal : true,
				resizable : false,
				close : function(event, ui) {
					$("#iframe_referral").remove();
					$(this).dialog('destroy');
				}
			});
		}
		
		
		
	</script>
	
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	
	<script type="text/javascript" src="js/plugins/charts/excanvas.min.js"></script>
	<script type="text/javascript" src="js/plugins/charts/jquery.flot.js"></script>
	<script type="text/javascript" src="js/plugins/charts/jquery.flot.orderBars.js"></script>
	<script type="text/javascript" src="js/plugins/charts/jquery.flot.pie.js"></script>
	<script type="text/javascript" src="js/plugins/charts/jquery.flot.resize.js"></script>
	<script type="text/javascript" src="js/plugins/charts/jquery.sparkline.min.js"></script>
	
	<script type="text/javascript" src="js/plugins/forms/jquery.maskedinput.min.js"></script>
	<script type="text/javascript" src="js/plugins/forms/uniform.js"></script>
	<script type="text/javascript" src="js/plugins/forms/jquery.cleditor.js"></script>
	<script type="text/javascript" src="js/plugins/forms/chosen.jquery.min.js"></script>
	<script type="text/javascript" src="js/plugins/forms/jquery.tagsinput.min.js"></script>
	
	<script type="text/javascript" src="js/plugins/ui/jquery.tipsy.js"></script>
	<script type="text/javascript" src="js/plugins/ui/jquery.prettyPhoto.js"></script>
	<script type="text/javascript" src="js/plugins/ui/jquery.progress.js"></script>
	<script type="text/javascript" src="js/plugins/ui/jquery.colorpicker.js"></script>
	<script type="text/javascript" src="js/plugins/ui/jquery.jgrowl.js"></script>
	<script type="text/javascript" src="js/plugins/prettify/prettify.js"></script>
	<script type="text/javascript" src="js/plugins/ui/jquery.collapsible.min.js"></script>
	
	<script type="text/javascript" src="js/custom.js"></script>
	
	<script type="application/javascript" language="JavaScript">
	
		$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
		    _title: function(title) {
		        if (!this.options.title ) {
		            title.html("&#160;");
		        } else {
		            title.html(this.options.title);
		        }
		    }
		}));
	
		function goto_account(){
			top.location.href = 'panels_account.php';
		}
		
		function goto_payment(){
			top.location.href = 'panels_payments.php';
		}
		
		function goto_message_center(){
			top.location.href = 'panels_messages_read.php';
		}	
		
		function hide_last_login_notice(){
			$.ajax({
				type: "GET",
				url: "ajax/hide_last_login_message.php",
				success: function(msg){
					eval(msg);
				}
			});
		}
	</script>
		<script type="text/javascript" src="js/plugins/tables/tablesort.min.js"></script>
	<script type="text/javascript" src="js/plugins/charts/jquery.flot.stack.js"></script>
	<script language="JavaScript">
	
		$(function () {			
		    $('#txtStartDate, #txtEndDate').datepicker({
		        beforeShow: customRange,
		        firstDay: 1, 
		        changeFirstDay: false
		    });
		    
			function customRange(input) { 
			    var min = new Date(2013, 2, 23), //Set this to your absolute minimum date
			        dateMin = min,
			        dateMax = null,
			        dayRange = 31; // Set this to the range of days you want to restrict to
			
			    if (input.id === "txtStartDate") {
			        if ($("#txtEndDate").datepicker("getDate") != null) {
			            dateMax = $("#txtEndDate").datepicker("getDate");
			            dateMin = $("#txtEndDate").datepicker("getDate");
			            dateMin.setDate(dateMin.getDate() - dayRange);
			            if (dateMin < min) {
			                dateMin = min;
			            }
			        }
			        else {
			            dateMax = new Date; //Set this to your absolute maximum date
			        }                      
			    }
			    else if (input.id === "txtEndDate") {
			        dateMax = new Date; //Set this to your absolute maximum date
			        if ($("#txtStartDate").datepicker("getDate") != null) {
			            dateMin = $("#txtStartDate").datepicker("getDate");
			            var rangeMax = new Date(dateMin.getFullYear(), dateMin.getMonth(),dateMin.getDate() + dayRange);
			
			            if(rangeMax < dateMax) {
			                dateMax = rangeMax; 
			            }
			        }
			    }
			    return {
			        minDate: dateMin, 
			        maxDate: dateMax
			    };     
			}
			
		
		});
		
		
		function show_tool(go){
			var unique = $('#unique').prop('checked');
			if(unique){
				unique = '1';
			}else{
				unique = '';
			}
			var view = $('#view').val();
			var date_id = $('#date_view').val();
			
			if(go=='go'){
				date_id += '-' + $("#txtStartDate").val();
				date_id += '-' + $("#txtEndDate").val();
				location.href='panels_stats_breakdown_tool.php?view='+view+'&date_view='+date_id+'&unique='+unique;
			}else{
				if(date_id=='custom'){
					$('#custom_date').css('display','inline');
				}else{
					location.href='panels_stats_breakdown_tool.php?view='+view+'&date_view='+date_id+'&unique='+unique;
				}
			}
		}


	</script>
	<style>
		.chzn-results {
			max-height: 335px !important;
		}
		.ui-datepicker{
			z-index:150 !important;
		}
		.chartWrapper {
		    overflow: visible !important;
		}
		
		.sTable tbody td {
			vertical-align: top;
		}
		
		.sTable tbody tr:nth-child(odd) {
		    background-color: white;
		}
		.webStatsLink{
			font-size:12px;
		}
		.item_active td{
			background-color: #C7C7C7;
			color:white !important;
		}
	</style>
</head>

<body class="body2">
	
<!-- Left side content -->
<script type="text/javascript" language="JavaScript">
	jQuery(window).scroll(function() {
		var scrollingDiv = jQuery("#leftSide");
		if($(scrollingDiv).is(":visible")){
			var temp_top = jQuery(window).scrollTop() - 0;
	
			var pack_height = jQuery("#leftSide").height();
			var window_height = jQuery(window).height();
			if(pack_height > window_height) {
				var height_diff = pack_height - window_height;
				temp_top = temp_top - height_diff - 2;
			}
			
			if (temp_top < 0) {
				temp_top = 0;
			}
			scrollingDiv
				.stop()
				.animate({"marginTop": (temp_top) + "px"}, "fast" );
		}
	});
</script>
<style>
	.live_fly_main{
		position:absolute;		
	}
	.live_fly{
		position:relative;
		top:-6px;
		left:2px;
		color:#00B208;
		font-weight:bold;
		font-size:14px !important;
	}
	#live_img{
		margin: 4px 4px 0 0;
	}
</style>

<div id="leftSide">
	<div class="logo">
		<a href="panels_dashboard.php"><img src="images/small_logo_white.png" alt="" /></a>
	</div>

	<!-- General balance widget -->
			<script type="text/javascript">
			function do_live_update(amount){

				var new_live = $('<span class="live_fly_main"><span class="live_fly">+$'+amount+'</span></span>');
				$("#live_holder").append(new_live);
				
									if (typeof snd_money === 'undefined') {
						
					}else{
						snd_money.play({
							volume:100
						});
					}
				
				new_live.animate({
					opacity: 0,
					marginTop: "-=50"
				}, 3000, function() {
					new_live.remove();
				});
				
			}
			function refresh_stats(){
				$('#live_img').prop('src','images/transmit.png');
				$.ajax({
					type: "POST",
					data: 'p=stats_breakdown_tool',
					url: "ajax/ajax_get_live_stats.php",
					success: function(msg){
						eval(msg);
						$('#live_img').prop('src','images/transmit_blue.png');
					}
				});
			}
			$(function () {
				setTimeout("refresh_stats();",120000);
			});
		</script>
		<div class="genBalance" style="text-align:center;">
			<a id="live_holder" style="width:186px; height: 46px;" href="panels_stats_breakdown_daily.php?tool_view=&date_view=today" title="" class="amount"> <span>Today's Revenue:</span><br/><img title="Updated live every 120 seconds." class="tipW" id="live_img" src="images/transmit_blue.png"><span class="balanceAmount" id="today_live">$0.00</span> </a>
		</div>
	
	<div class="sidebarSep"></div>

	<!-- Left navigation -->
	<ul id="menu" class="nav">
						<li class="dash">
			<a href="panels_dashboard.php" title="" class=""><span>Dashboard</span></a>
		</li>
		
		<li class="charts">
			<a id="current" href="#" title="" class="active exp"><span>Statistics &amp; Charts<img src="images/expand4.png" style="vertical-align: text-bottom;"></span></a>
			<ul class="sub" style="">
				<li class="">
					<a href="panels_stats.php" title=""><img src="images/icons/chart_curve.png" style="vertical-align: text-bottom;"> Stats Overview</a>
				</li>
				<li class="">
					<a href="panels_stats_breakdown_daily.php" title=""><img src="images/icons/row_stats.png" style="vertical-align: text-bottom;"> Daily Breakdown</a>
				</li>
				
				<li class="this">
					<a href="panels_stats_breakdown_tool.php" title=""><img src="images/icons/stacked_chart.png" style="vertical-align: text-bottom;"> Tool Breakdown</a>
				</li>
				
			</ul>
		</li>
		
				<li class="website">
			<a  href="#" title="" class=" exp"><span>Monetization Tools<img src="images/expand4.png" style="vertical-align: text-bottom;"></span><strong>14</strong></a>
			<ul class="sub" style="display:none;">
				<li class="">
					<a href="panels_website_lock_content.php" title=""><img src="images/lock-file-icon.png" style="vertical-align: text-bottom;"> Content Lockers</a>
				</li>
				<li class="">
					<a href="panels_website_lock_embed.php" title=""><img src="images/video_lock.png" style="vertical-align: text-bottom;"> Video Lockers</a>
				</li>
				<li class="">
					<a href="panels_website_lock_url.php" title=""><img src="images/earth_lock.png" style="vertical-align: text-bottom;"> URL / File Lockers <strong style="top:5px;">14</strong></a>
				</li>
				<li class="">
					<a href="panels_website_lock_wall.php" title=""><img src="images/wall.png" style="vertical-align: text-bottom;"> Offer Walls</a>
				</li>
			</ul>
		</li>
		
		<li class="offers">
			<a  href="#" title="" class=" exp"><span>Offer Tools<img src="images/expand4.png" style="vertical-align: text-bottom;"></span><strong>3</strong></a>
			<ul class="sub" style="display:none;">
				<li class="">
					<a href="panels_offer_view.php" title=""><img src="images/icons/color/external.png" style="vertical-align: text-bottom;"> My Offers</a>
				</li>
				<li class="">
					<a href="panels_offer_feeds.php" title=""><img src="images/icons/color/feed.png" style="vertical-align: text-bottom;"> RSS Offer Feed</a>
				</li>
				
				<li class="">
					<a href="panels_offer_csv.php" title=""><img src="images/icons/color/icon_csv.png" style="vertical-align: text-bottom;"> CSV Offer Export</a>
				</li>

			</ul>
		</li>
		
		<li class="notify_tools">
			<a  href="#" title="" class=" exp"><span>Postback Tools<img src="images/expand4.png" style="vertical-align: text-bottom;"></span><strong>2</strong></a>
			<ul class="sub" style="display:none;">
				<li class="">
					<a href="panels_tools_gpostback.php" title=""><img src="images/icons/control/16/server-arrow.png" style="vertical-align: text-bottom;"> Global Postback</a>
				</li>
				<li class="">
					<a href="panels_tools_mpostback.php" title=""><img src="images/icons/control/16/servers.png" style="vertical-align: text-bottom;"> Multi Postback</a>
				</li>
				
			</ul>
		</li>

		<li class="payment">
			<a href="panels_payments.php" title="" class=""><span>Payment Center </span></a>
		</li>
		<li class="account">
			<a href="panels_account.php" title="" class=""><span>Account Settings </span></a>
		</li>

	</ul>
</div>

<!-- Right side -->

<div id="rightSide">
	
	<div id="loading" style="margin-left:216px; color:white; z-index: 100; opacity: .5; position:absolute; bottom:0; left: 0; right: 0; top: 0; text-align:center; font-size:30px; font-weight:bold; background-color: black;">
		<div style="padding-top:300px;">
			Loading Data..
			<div style="height:20px;"></div>
			<img src="images/loaders/loader12.gif">
		</div>
	</div>

    <!-- Top fixed navigation -->
		<script type="text/javascript">
	
		function isNumber(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}	
		$(function() {
			
						
		});
		function do_logout(){

			snd_logout.play();
			var div = $('<div style="display:none;background-color:black;position:absolute; width:100%; height:100%; z-index:9999;"></div>');
			$('body').prepend(div);
			$(div).fadeIn(1100, 'easeInBounce', function() {
				top.location = '/admin/?action=logout';
			});

		}
	</script>
	<style>
		.ui-autocomplete{
			max-height: 450px;
			overflow-y: auto;
			overflow-x: hidden;
			width:500px;
			padding: 2px 5px;
		}
		
		.ui-autocomplete li a{
			font-weight:bold;
			cursor:pointer;
		}
		
		.inline .chzn-single span{
			padding: 0 !important;
		}
		.inline .chzn-single{
			float: none !important;
		}
		.inline .active-result{
			border:none !important;
		}
		.inline .chzn-results{
			max-height: 250px !important;
			border:none !important;
		}
		.inline .chzn-results li{
			float:none !important;
		}
		.bar_holder{
			cursor:pointer;
			background-color: white;
		    border: 2px solid #CFFFD0;
		    border-radius: 5px 5px 5px 5px;
		    display: inline-block;
		    height: 18px;
		    margin-left: 6px;
		    margin-top: 2px;
		    padding: 2px;
		}
		.small_bar{
			width:30px;
			margin-bottom:2px;
		}
	</style>
					    <div class="topNav">
	        <div class="wrapper">
	            <div class="welcome">
	
	        		<span style="margin-right:4px;">
	        			Welcome: <strong>Ian Lou A.</strong>
	        		</span>
											<span style="font-weight:bold; margin:0 4px 0 0; color: #CFFFD0;">(newcpa)</span>
						        		<span>
	        			(Affiliate: #<strong>8041</strong>)
	        		</span>
	        			            </div>

	            <div class="userNav">
	                <ul>
	                	<li>
	                		<span style="font-weight:normal; font-size:10px;" id="live_time">Server Time: <strong>7:09am</strong></span>
							<script type="text/javascript">
								// use php to get the server time
								var serverdate = new Date('February 23, 2014 07:09:47');
								function refresh_time(){
									serverdate.setSeconds(serverdate.getSeconds() + 1);
									var hh=serverdate.getHours();
									var m=serverdate.getMinutes();
									var s=serverdate.getSeconds();
									
									var dd = "am";
								    var h = hh;
								    if (h >= 12) {
								        h = hh-12;
								        dd = "pm";
								    }
								    if (h == 0) {
								        h = 12;
								    }
									m=checkTime(m);
									s=checkTime(s);
									var output = h+":"+m+""+dd;
									document.getElementById("live_time").innerHTML = 'Server Time: <strong>'+output+'</strong>';
								}
								function checkTime(i){
									if (i<10){
										i="0" + i;
									}
									return i;
								}
							
								window.onload = function(){
								  setInterval("refresh_time()", 1000);
								}
							</script>
	                	</li>
							                    <li><a href="panels_account.php" title="Change Account Settings." class="tipN"><img src="images/icons/topnav/settings.png" alt="" /><span>Account</span></a></li>
	                    <li><a href="panels_payments.php" title="View Payment Center." class="tipN"><img src="images/icons/light/money2.png" alt="" /><span>Payments</span></a></li>
	                    
	                    <li><a href="#" class="tipN" title="Logout" onclick="do_logout();"><img src="images/icons/topnav/logout.png" alt="" /><span>Logout</span></a></li>
	                </ul>
	            </div>
	            <div class="clear"></div>
	        </div>
	    </div>
        
    <!-- Title area -->
    <div class="titleArea">
        <div class="wrapper">
            <div class="pageTitle">
                <h5><img src="images/icons/stacked_chart.png"> Monetization Tool Breakdown</h5>
                <span>View how each of your monetization tools are doing relative to each other.</span>
            </div>
            <div class="middleNav">
	<ul>
		<li class="mUser">
						<a onclick="Open_Referrals();" href="javascript:void(0);" class="tipN" title="Publisher Referral Program. Earn Revenue From Your Friends!"><span class="users"></span><span class="numberMiddle">0</span></a>
		</li>
	</ul>
	<div class="clear"></div>
</div>
<div id="img_refer" style="float:right;">
	<img style="cursor: pointer; position: relative; top: 6px; left: -5px;" src="images/refer-a-friend.png" border="0" onclick="Open_Referrals();">
</div>
<div id="ref_dialog" style="display: none;" title="<img src='images/tiny_punch.png' style='vertical-align:text-bottom;'/> Publisher Referral Program"></div>            <div class="clear"></div>
        </div>
    </div>
    
    <div class="line"></div>
							
	
    <div style="padding:5px;">

	    <div style="display: inline; position: relative; top: 6px; margin-left:5px">
			Timeframe:
	    	<select onchange="show_tool();" id="date_view" name="date_view" class="chzn-select" style="width: 130px;">
	    		<option value="today">Today</option>
	    		<option value="yesterday">Yesterday</option>
				<option value="3days">3 Days</option>
				<option value="1week">1 Week</option>
				<option value="2week">2 Weeks</option>
				<option value="3week">3 Weeks</option>
				<option value="1month">1 Month</option>
				<option value="mtd">Month-To-Date</option>
				<option value="custom">Custom Dates</option>
	        </select>
	        <script>
	        	$('#date_view').val('today');
	        	$('#date_view').trigger("liszt:updated");
	        </script>
	    </div>
	    <div id="custom_date" style="display: none; position: relative; top: 6px; margin-left:5px;">
	    	From: <input style="width:100px;" type="text" value="" id="txtStartDate" class="edit_field">
			To: <input style="width:100px;" type="text" value="" id="txtEndDate" class="edit_field">
			<input onclick="show_tool('go');" type="submit" value="Go">
	    </div>
    	<div style="display: inline; position: relative; top: 6px; margin-left:5px">
    		Graph By:
			<select onchange="show_tool();" id="view" name="view" class="chzn-select" style="width: 120px;">
				<option>Revenue</option>
				<option>Leads</option>
				<option>EPC</option>
				<option>Views</option>
				<option>Clicks</option>
	        </select>
	        <script>
	        	$('#view').val('Revenue');
	        	$('#view').trigger("liszt:updated");
	        </script>
    	</div>
    	<div style="display: inline-block; position: relative; top: 10px; margin-left:5px; color:purple;">
	    	<input onchange="show_tool();" type="checkbox" id="unique" name="unique" value="yes" ><span style="margin-left:3px;">Show Unique IP</span>
	    </div>
    </div>
    <div class="wrapper">
        <div class="widgets">        	
        	<div class="widget">
        											<center><h6 style="padding:10px; color:lightgrey;">Please select a date range larger then 1 day to view graph data.</h6></center>
							</div>
			<script language="JavaScript">
				$(function () {
					$('#loading').hide();
					$("#table_data").tablesorter({
						sortInitialOrder: 'desc',
						sortList: [[8,1]]
					});
				});
			</script>
			<div class="widget">
				<div class="title"><img src="images/icons/color/report-paper.png" alt="" class="titleIcon" /><h6>Monetization Tool Breakdown</h6></div>
				<div style="margin-top:2px; ">
					<table id="table_data" cellpadding="0" cellspacing="0" width="100%" class="sTable">
						<thead>
							<tr>
								<td class="sortCol"><div>Monetization Tool Name<span></span></div></td>
								<td class="sortCol" width="65"><div>Views<span></span></div></td>
								<td class="sortCol" width="65"><div>Clicks<span></span></div></td>
								<td class="sortCol" width="70"><div>CTR<span></span></div></td>
								<td class="sortCol" width="65"><div>Leads<span></span></div></td>
								<td class="sortCol" width="65"><div>Conv<span></span></div></td>
								<td class="sortCol" width="65"><div>EPC<span></span></div></td>
								<td class="sortCol" width="65"><div class="tipS" title="Revenue Per 1000 Views">RPM<span></span></div></td>
								<td class="sortCol" width="65"><div>Revenue<span></span></div></td>
							</tr>
						</thead>
						<tbody>
															<tr id="row_45736" class="item_data">
									<td>
										<span style="text-shadow: 0 0 3px #FFFFFF; color: black; background-color: #45616b;">&nbsp;&nbsp;&nbsp;</span>
										<span style="font-weight:bold;">With comment</span>
									</td>
									<td align="center"><span class="webStatsLink" style="color:#737373;">18</span></td>
									<td align="center"><span class="webStatsLink" style="">8</span></td>
									<td align="center"><span class="webStatsLink" style="color:#C247B4;">44.44%</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">0</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">0.00%</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">$0.00</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">$0.00</span></td>
									<td align="center"><span class="webStatsLink" style="font-size:14px; color:lightgrey;">$0.00</span><span class="data"></span></td>
								</tr>
					            								<tr id="row_47786" class="item_data">
									<td>
										<span style="text-shadow: 0 0 3px #FFFFFF; color: black; background-color: #45d848;">&nbsp;&nbsp;&nbsp;</span>
										<span style="font-weight:bold;">GTA 5 with comments</span>
									</td>
									<td align="center"><span class="webStatsLink" style="color:#737373;">2</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">0</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">0.00%</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">0</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">0.00%</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">$0.00</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">$0.00</span></td>
									<td align="center"><span class="webStatsLink" style="font-size:14px; color:lightgrey;">$0.00</span><span class="data"></span></td>
								</tr>
					            								<tr id="row_48324" class="item_data">
									<td>
										<span style="text-shadow: 0 0 3px #FFFFFF; color: black; background-color: #4582a8;">&nbsp;&nbsp;&nbsp;</span>
										<span style="font-weight:bold;">Real Racing 3 H PC</span>
									</td>
									<td align="center"><span class="webStatsLink" style="color:#737373;">1</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">0</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">0.00%</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">0</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">0.00%</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">$0.00</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">$0.00</span></td>
									<td align="center"><span class="webStatsLink" style="font-size:14px; color:lightgrey;">$0.00</span><span class="data"></span></td>
								</tr>
					            								<tr id="row_48760" class="item_data">
									<td>
										<span style="text-shadow: 0 0 3px #FFFFFF; color: black; background-color: #675e45;">&nbsp;&nbsp;&nbsp;</span>
										<span style="font-weight:bold;">Real Racing 3 H Mobile</span>
									</td>
									<td align="center"><span class="webStatsLink" style="color:#737373;">1</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">0</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">0.00%</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">0</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">0.00%</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">$0.00</span></td>
									<td align="center"><span class="webStatsLink" style="color:lightgrey;">$0.00</span></td>
									<td align="center"><span class="webStatsLink" style="font-size:14px; color:lightgrey;">$0.00</span><span class="data"></span></td>
								</tr>
					            						</tbody>
					</table>
				</div>
			</div>
            
        </div>
    </div>
    
    <!-- Footer line -->
	
    <div id="footer">
	    			<div class="nNote nInformation hideit tipS" title="Click to hide this login notice." onclick="hide_last_login_notice();">
				<p><strong>INFORMATION: </strong>Last login <span style="font-weight: bold;">3 hours ago</span> from <span style="font-weight: bold;">222.127.174.93</span></p>
			</div>
		        <div class="wrapper">© Copyright 2013 CPAGrip, All rights reserved.</div>
    </div>
</div>

<div class="clear"></div>

</body>
</html>
// @version 2.1

// ==/UserScript==