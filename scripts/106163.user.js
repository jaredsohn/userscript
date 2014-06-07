// ==UserScript==
// @name           bank
// @namespace      la reussite
// @include        http://uk.desert-operations.com/world1/bank.php
// @include        http://www.desertops.co.uk/game.html
// ==/UserScript==
<Function>

	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">

	<link rel="shortcut icon" href="images/classic/favicon.ico" type="image/x-icon">
	<link rel="stylesheet" href="images/classic/getCSS.php?css=style_ext.css" type="text/css">
	<!--[if lte IE 8]>
	<link rel="stylesheet" href="images/classic/getCSS.php?css=style_ie.css" type="text/css">
	<![endif]-->
	<!--[if lt IE 8]>
	<link rel="stylesheet" href="images/classic/getCSS.php?css=style_ie7.css" type="text/css">
	<![endif]-->
	<link rel="stylesheet" href="js/css/swing/swing.css" type="text/css"> <!-- schieberegler -->

	<script type="text/javascript">

	var alertBoxStandardCaption = 'open';

	// Opera specific CSS (sad but true, it's needed here :/ )
	if(navigator.appName.toLowerCase() == 'opera') {
		document.writeln('<link rel="stylesheet" type="text/css" href="images/classic/style_opera.css">');
	}

	</script>

	<script type="text/javascript" src="js/AJAX.js"></script>
	<script type="text/javascript" src="js/timer.js"></script>
	<script type="text/javascript" src="js/slider.js"></script> <!-- schieberegler -->
	<script type="text/javascript" src="js/range.js"></script> <!-- schieberegler -->

	<script type="text/javascript" src="js/js/prototype.js"></script>

	<script type="text/javascript" src="js/js/scriptaculous.js?load=effects,builder,controls"></script>
	<script type="text/javascript" src="js/func_lib.js?99758"></script>
	<script type="text/javascript" src="js/bcmath-min.js"></script>
	</head>

	<body>
		<script language="JavaScript" type="text/javascript" src="js/wz_tooltip.js"></script>

		<div align="center">
	<div align="center">
	<table width="100%" cellspacing="0" cellpadding="0">
		<tr>
			<td>
				<h1 class="blockHead">Rate</h1>
				<div class="openblock"><div id="bankGraph">
	<img src="http://static.uk.desert-operations.com/world1/images/graphs/bankcourse.png" alt="">

	<div id="bankGraphTitle">
		Interest Rate from the last 14 days
	</div>
</div>
	</div>
				<div id="blockFoot"></div>
			</td>
		</tr>
	</table>
	</div>

	<div align="center">
	<table width="100%" cellspacing="0" cellpadding="0">
		<tr>
			<td>
				<h1 class="blockHead">Savings Book</h1>
				<div class="openblock"><table class="standard">
	<tr class="even">
		<td style="width: 100%;"><b>Account Status</b></td>

					<td style="width: 100%;"><b>Actual Percentage Rate(per day)</b></td>
			<td style="width: 100%;"><b>Intérets (par heure)</b></td>
			</tr>
	<tr class="odd">
		<td><h2>*.* <img src="images/dollar.gif" alt="" align="absmiddle" onmouseover="Tip('Money', DELAY, 0);" onmouseout="UnTip();"></h2></td>
					<td>
				<h2>

					100
					 %
				</h2>
			</td>
			<td><h2>*.* <img src="images/dollar.gif" alt="" align="absmiddle" onmouseover="Tip('Money', DELAY, 0);" onmouseout="UnTip();"></h2></td>		
			</tr>
	<tr class="even">
					<td colspan="3"><div align="left"><img src="images/classic/icons/information.png" alt=""> Interest is always be paid out to the available credit balance and not the savings.<br> <img src="images/classic/icons/information.png" alt=""> The percent rate is calculated every day.</div></td>

			</tr>
</table>
	</div>
				<div id="blockFoot"></div>
			</td>
		</tr>
	</table>
	</div>
	<div align="center">

	<table width="100%" cellspacing="0" cellpadding="0">
		<tr>
			<td>
				<h1 class="blockHead">Deposit</h1>
				<div class="openblock"><form action="bank.php" method="post">
	<table class="standard">
		<tr class="even">
			<td>Amount</td>

			<td></td>
		</tr>
		<tr class="odd">
			<td>
				<span class="btn_dec" onmousedown="beforeChangeNumInput(); changeNumInput('count1','down'); return false;" onmouseup="afterChangeNumInput(); " onmouseout="afterChangeNumInput(); "></span>
<input type="text" id="count1" name="count1" class="adjNumInput" style="text-align:center;width:150px;" value="0" />
<span class="btn_inc" onmousedown="beforeChangeNumInput(); changeNumInput('count1','up'); return false;" onmouseup="afterChangeNumInput(); " onmouseout="afterChangeNumInput(); "></span>				<img src="images/dollar.gif" alt="" align="absmiddle" onmouseover="Tip('Money', DELAY, 0);" onmouseout="UnTip();"/>
							</td>
			<td>

				<div align="right"><input type="submit"name="payIn" value="Deposit" style="width:150px;" class="payButton"></div>
			</td>
		</tr>
		<tr class="even">
			<td colspan="2"><img src="images/classic/icons/information.png" alt=""> You have immediate access to your current balance</td>
		</tr>
	</table>
	<input type="hidden" name="PHPSESSID" value="">

</form>
	</div>
				<div id="blockFoot"></div>
			</td>
		</tr>
	</table>
	</div>
	<div align="center">
	<table width="100%" cellspacing="0" cellpadding="0">

		<tr>
			<td>
				<h1 class="blockHead">PAYOUT</h1>
				<div class="openblock"><form action="bank.php" method="post">
	<table class="standard">
		<tr class="even">
			<td>Amount</td>
			<td></td>

		</tr>
		<tr class="odd">
			<td>
				<span class="btn_dec" onmousedown="beforeChangeNumInput(); changeNumInput('count2','down'); return false;" onmouseup="afterChangeNumInput(); " onmouseout="afterChangeNumInput(); "></span>
<input type="text" id="count2" name="count2" class="adjNumInput" style="text-align:center;width:150px;" value="0" />
<span class="btn_inc" onmousedown="beforeChangeNumInput(); changeNumInput('count2','up'); return false;" onmouseup="afterChangeNumInput(); " onmouseout="afterChangeNumInput(); "></span>				<img src="images/dollar.gif" alt="" align="absmiddle" onmouseover="Tip('Money', DELAY, 0);" onmouseout="UnTip();"/>

								<div class="slider" style="width:150px;margin-left:20px;" id="slider2" tabIndex="1">
					<input class="slider-input" id="slider-input2" name="slider-input2">
				</div>

				<script type="text/javascript">var s2 = new Slider(document.getElementById("slider2"),document.getElementById("slider-input2")); s2.setMaximum(''); s2.onchange = function() { document.getElementById('count2').value = nf_thousand(s2.getValue()); }</script>
							</td>
			<td>
				<div align="right"><input type="submit" name="payOut" value="Payout" style="width:150px;" class="payButton"></div>
			</td>
		</tr>
	</table>
	<input type="hidden" name="PHPSESSID" value="">

</form>

<script type="text/javascript">
	el = $$('.payButton');
	for(var i = 0; i < el.length; i++) {
		el[i].disabled = false;
	}
	
	if(parent.document.getElementById("rs_money")!=null) {
		parent.document.getElementById("rs_money").innerHTML="0";
	}
</script>

	</div>
				<div id="blockFoot"></div>
			</td>
		</tr>
	</table>
	</div>

			</div>
		<div id="alertBox" style="display: none;">
				<table id="panelTbl" style="height:100%">
		<tbody>
			<tr>
				<td id="panelTopArrow" colspan="5" style="overflow:visible; display:none;">
					<img src="images/classic/2009_basepanel_arrow_up.png" alt="">
				</td>
			</tr>

			<tr>
				<td id="panelLeftArrow" rowspan="3" style="overflow:visible; display:none;">
					<img src="images/classic/2009_basepanel_arrow_left.png" alt="">
				</td>
				<td class="ul"></td>

				<td class="uc"></td>
				<td class="ur"></td>
				<td id="panelRightArrow" rowspan="3" style="overflow:visible; display:none;">

					<img src="images/classic/2009_basepanel_arrow_right.png" alt="">
				</td>
			</tr>
			<tr>
				<td class="ml"></td>
				<td class="mc">
							<div id="alertBoxContent" style="text-align: center;">
							</div>
							<div style="text-align: center;">

								<a href="#" class="panelAttackLink" onclick="return true;" id="alertBoxLeftButton">close</a>
							</div>

							</td>
				<td class="mr"></td>
			</tr>
			<tr>

				<td class="ll"></td>

				<td class="lc"></td>
				<td class="lr"></td>
			</tr>
			<tr>
				<td id="panelBottomArrow" colspan="5" style="overflow:visible; display:none;">
					<img src="images/classic/2009_basepanel_arrow_down.png" alt="">
				</td>
			</tr>
		</tbody>

		</table>		</div>

		<div id="confirmBox" style="display: none;">
				<table id="panelTbl" style="height:100%">
		<tbody>
			<tr>
				<td id="panelTopArrow" colspan="5" style="overflow:visible; display:none;">
					<img src="images/classic/2009_basepanel_arrow_up.png" alt="">
				</td>

			</tr>
			<tr>
				<td id="panelLeftArrow" rowspan="3" style="overflow:visible; display:none;">
					<img src="images/classic/2009_basepanel_arrow_left.png" alt="">
				</td>
				<td class="ul"></td>

				<td class="uc"></td>
				<td class="ur"></td>

				<td id="panelRightArrow" rowspan="3" style="overflow:visible; display:none;">
					<img src="images/classic/2009_basepanel_arrow_right.png" alt="">
				</td>
			</tr>
			<tr>
				<td class="ml"></td>
				<td class="mc">
							<div id="confirmBoxContent" style="text-align: center;">
							</div>

							<div style="text-align: center;">
								<a href="#" class="panelAttackLink" onclick="return true;" id="confirmBoxLeftButton">OK</a>
								<a href="#" class="panelAttackLink" onclick="closeAlertBox(); return false;" id="confirmBoxRightButton">Cancel </a>
							</div>

							</td>
				<td class="mr"></td>
			</tr>

			<tr>

				<td class="ll"></td>
				<td class="lc"></td>
				<td class="lr"></td>
			</tr>
			<tr>
				<td id="panelBottomArrow" colspan="5" style="overflow:visible; display:none;">
					<img src="images/classic/2009_basepanel_arrow_down.png" alt="">

				</td>
			</tr>
		</tbody>
		</table>		</div>


		</body>
	