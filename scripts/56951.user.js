// ==UserScript==
// @name		Basecamp Formatting Guide Popup
// @author		Erik Vold
// @datecreated	2009-09-02
// @lastupdated	2009-09-08
// @namespace	basecampFormattingGuidePopup
// @include		http://*.updatelog.com/*
// @include		http://*.projectpath.com/*
// @include		https://*.updatelog.com/*
// @include		https://*.projectpath.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version		0.1
// @description	This userscript adds a popup (which is available via Greasemonkey menu command) to Basecamp to display the formatting guide.
// ==/UserScript==

var basecampFormattingGuidePopup = {};
basecampFormattingGuidePopup.state = false;
basecampFormattingGuidePopup.toggle_popup_formatingguide = function () {
	if ( basecampFormattingGuidePopup.state ) {
		$('#popup_formatingguide').fadeOut(100);
		$('#window_formatingguide').fadeOut(100);
		basecampFormattingGuidePopup.state = false;
	}
	else {
		var popup = $('#popup_formatingguide');
		popup.fadeIn(10);
		//popup.setAttribute( "height:"+document.body.clientHeight+"px;" );
		$('#window_formatingguide').fadeIn(10);
		basecampFormattingGuidePopup.state = true;
	}
};
basecampFormattingGuidePopup.setup = function() {
	var newPopupDiv = document.createElement( 'div' );
	newPopupDiv.setAttribute( 'id', 'popup_formatingguide' );
	newPopupDiv.setAttribute( 'style', "display:none; height:"+document.body.clientHeight+"px;" );

	var newWindowDiv = document.createElement( 'div' );
	newWindowDiv.setAttribute( 'id', 'window_formatingguide' );
	newWindowDiv.setAttribute( 'style', "display:none;" );
	newWindowDiv.innerHTML = (<><![CDATA[
		<div id="formatting_guide">
			<h2>Formatting guide</h2>
			<table>
				<tbody>
					<tr>
						<th>To get this effect...</th>
						<th>Type this...</th>
					</tr>
					<tr>
						<td><strong>Bold phrase</strong></td>
						<td>*Bold phrase*</td>
					</tr>
					<tr>
						<td><span style="font-style: italic;">Italic phrase</span></td>
						<td>_Italic phrase_</td>
					</tr>
					<tr>
						<td>
							<ul>
								<li>Bulleted list</li>
								<li>Bulleted list</li>
							</ul>
						</td>
						<td>
							* Bulleted list<br/>
							* Bulleted list
						</td>
					</tr>
					<tr>
						<td>
							<ol>
								<li>Numbered list</li>
								<li>Numbered list</li>
							</ol>
						</td>
						<td>
							# Numbered list<br/>
							# Numbered list
						</td>
					</tr>
					<tr>
						<td><blockquote>Indented block</blockquote></td>
						<td>&gt; Indented block</td>
					</tr>
					<tr>
						<td><h1>Big header</h1></td>
						<td>h1. Big header</td>
					</tr>
					<tr>
						<td><h2>Normal header</h2></td>
						<td>h2. Normal header</td>
					</tr>
					<tr>
						<td><a href="http://www.37signals.com">37signals</a></td>
						<td>"37signals":http://www.37signals.com</td>
					</tr>
					<tr>
						<td><img src="http://123.writeboard.com/images/logo-small-writeboard.gif?1251390207" alt="Logo-small-writeboard"/></td>
						<td>!http://37signals.com/logo.gif!</td>
					</tr>
				</tbody>
			</table>
			<p><a onclick="Close_Popup_formatingguide(); return false;" href="#" class="admin">Close this</a></p>
		</div>
	]]></>).toString();

	unsafeWindow.Close_Popup_formatingguide = function () {
		basecampFormattingGuidePopup.state = false;
		$('#popup_formatingguide').fadeOut(100);
		$('#window_formatingguide').fadeOut(100);
	};
	

	GM_addStyle((<><![CDATA[
		#popup_formatingguide {
			height: 100%;
			min-height: inherit;
			width: 100%;
			background: #000000;
			position: absolute;
			top: 0;
			-moz-opacity:0.75;
			-khtml-opacity: 0.75;
			opacity: 0.75;
			filter:alpha(opacity=75);
		}
		#window_formatingguide {
			width: 480px;
			height: 480px;
			margin: -240px 0 0 -240px;
			padding: 0;
			border: 8px solid #353230;
			position: fixed;
			top: 50%;
			left: 50%;
			background: white;
		}
		#window_formatingguide #formatting_guide {
			margin-right:0px;
		}
		#window_formatingguide div#formatting_guide table {
			-moz-background-clip:border;
			-moz-background-inline-policy:continuous;
			-moz-background-origin:padding;
			background:#FFFFFF none repeat scroll 0 0;
			border-collapse:collapse;
			width: 450px;
			margin:5px 15px 0 15px;
		}
		#window_formatingguide div#formatting_guide h2 {
			border:medium none;
			font-size:18px;
			margin:5px 0;
		}
	]]></>).toString());

	document.body.appendChild( newPopupDiv );
	document.body.appendChild( newWindowDiv );

	GM_registerMenuCommand( "Show Formatting Guide", basecampFormattingGuidePopup.toggle_popup_formatingguide, "f", "control alt", "f" );
};
basecampFormattingGuidePopup.setup();