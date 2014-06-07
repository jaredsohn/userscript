// ==UserScript==
// @name             Q1 Labs Qradar 
// @author           Matt DeVries
// @date             2/1/2011
// @namespace        Qradar
// @include          https://10.254.20.143/*
// ==/UserScript==

* {
	-webkit-transition-property: height, background-color;
	-webkit-transition-duration: .15s;
	-webkit-transition-timing-function: ease-out;
}
body {
	background-color: #000000;
	color: #000;
	font-size: .75em;
	margin: 0;
	font-family: Helvetica, 'Trebuchet MS', sans-serif;
}
	#OPTwrap {
		width: 800px;
		height: 100%;
		overflow: hidden;
	}
		#OPTside {
			background: url("../img/bg.png") repeat-x #222;
			text-align: right;
			position: fixed;
			top: 0;
			left: 0;
			float: left;
			width: 250px;
			height: 100%;
			overflow: auto;
		}
			#OPTside::-webkit-scrollbar {
				width: 0px;
			}
				#announce, #refresh, #refreshEI, #easterEgg_on, #easterEgg_off {
					display: none;
					color: #fff;
					margin-top: 10px;
					padding: 7px 20px 7px 0;
					background-color: rgba(200,200,200,.25);
					border-top: 1px solid #ccc;
					border-bottom: 1px solid #ccc;
					-webkit-box-shadow: 0 0 10px rgba(0,0,0,.5);
				}
					#refresh a, #refreshEI a {
						color: #ddd;
					}
					#refresh a:hover, #refreshEI a:hover {
						color: #fff;
					}
			#OPTside ul {
				list-style: none;
				padding: 0;
			}
				#OPTside li a {
					display: block;
					padding: 8px 20px 8px 0;
					color: #fff;
					text-decoration: none;
				}
					#OPTside li a.current {
						font-weight: bold;
						padding: 7px 20px 7px 0;
						border-top: 1px solid #ccc; 
						border-bottom: 1px solid #ccc;
						background-color: rgba(0,153,255,.5) !important;
						color: #fff;
						text-decoration: none;
					}
					#OPTside li a:hover {
						background-color: rgba(200,200,200,.25);
					}
		.OPTmain {
			background-color: #F2F2F2;
			float: left;
			display: none;
			width: 529px;
			z-index: 1;
			position: absolute;
			top: 0;
			left: 250px;
			padding: 0 0 0 20px;
			height: 100%;
			-webkit-box-shadow: -30px -50px 30px -30px rgba(0,0,0,.85);
		}
			section {
				border-top: 1px solid #ccc;
				padding: 15px 0;
				overflow: hidden;
			}
				section > div {
					float: left;
					width: 379px;
				}
			.OPTmain ul {
				-webkit-margin-before: 0 !important;
			}
			p {
				margin: 0 0 10px 0;
			}
			h1, h2 {
				font-weight: normal;
				font-family: 'Raleway', Helvetica, 'Trebuchet MS', sans-serif;
			}
				h1 {
					color: #fff;
					font-size: 3em;
					margin: 10px 20px 10px 0;
					text-shadow: 0 0 1px #bbb;
				}
					h1.dark {
						color: #000;
						text-shadow: 0 0 1px #555;
						display: block;
						margin: 10px 0 11px 0;
					}
					h1 span {
						color: #aaa;
						text-shadow: 0 0 1px #eee;
					}
				h2 {
					color: #eee;
					text-shadow: 0 0 1px #ccc;
					font-size: 2.25em;
					margin: 30px 0 10px -15px;
					padding-bottom: 3px;
					border-bottom: 1px solid #eee;
				}
				h3 {
					font-size: 1em;
					font-family: 'Nobile', Helvetica, 'Trebuchet MS', sans-serif;
					margin: 0;
					width: 150px;
					float: left;
					display: block;
					color: #000;
				}
			table {
				font-size: 1em;
			}
				table td:first-child {
					padding-right: 5px;
				}
			.column{
				float: left;
				width: 50%;
				margin-bottom: 15px;
			}
			input[type = 'button'], .button {
				padding: 3px 20px;
				-webkit-border-radius: 2px;
				border-top: 1px solid #fff;
				border-left: 1px solid #fff;
				border-bottom: 1px solid #444;
				border-right: 1px solid #444;
				background: -webkit-gradient(linear, left bottom, left top, from(rgb(150,150,150)), to(rgb(200,200,200)));
			}
				input[type = 'button']:hover, .button:hover {
					background: -webkit-gradient(linear, left bottom, left top, from(rgb(150,150,150)), to(rgb(150,150,150)));
				}
				input[type = 'button']:active, .button:active {
					border-top: 1px solid #444;
					border-left: 1px solid #444;
					border-bottom: 1px solid #fff;
					border-right: 1px solid #fff;
					background: -webkit-gradient(linear, left top, left bottom, from(rgb(150,150,150)), to(rgb(200,200,200)));
				}
				input[type = 'button'].red {
					color: #fff;
					background: -webkit-gradient(linear, left bottom, left top, from(rgb(150,0,0)), to(rgb(200,0,0)));
				}
				input[type = 'button'].red:hover {
					background: -webkit-gradient(linear, left bottom, left top, from(rgb(200,0,0)), to(rgb(200,0,0)));
				}
				input[type = 'button'].red:active {
					background: -webkit-gradient(linear, left top, left bottom, from(rgb(150,0,0)), to(rgb(200,0,0)));
				}
				.button {
					font-weight: bold;
					text-decoration: none;
					background: -webkit-gradient(linear, left top, left bottom, from(rgba(0,153,255,.5)), to(rgba(0,153,255,1)));
					padding: 7px 30px;
				}
				.button:hover {
					color: #000;
					background: rgba(0,153,255,1);
				}
				.button:active {
					background: -webkit-gradient(linear, left bottom, left top, from(rgba(0,153,255,.5)), to(rgba(0,153,255,1)));
				}
			span.note, span.indent {
				margin-left: 25px;
			}
				span.note, span.note a {
					color: #666;
					font-style: italic;
				}
				span.note a:hover {
					color: #0099ff;
				}
			div.indent {
				-webkit-box-shadow: 1px 1px 5px rgba(0,0,0,.75) inset;
				background-color: #d5d5d5;
			}
			div.indent.expanded {
				padding: 0 0 20px 25px;
				margin: 10px 0 10px;
				height: 275px;

			}
			div#attachCtable.indent.expanded {
				height: 300px;
			}
				.indent input.field {
					margin: 2px 2px 2px 0;
				}
			div.indent.compressed {
				height: 0;
				padding: 0;
				margin: 0;
			}
				div.indent.compressed table {
					display: none;
				}
			li {
				list-style-type: square;
			}
			input.field, textarea {
				padding: 0 2px 2px 2px;
				margin: 2px 0 2px 25px;
				outline: none;
				border: 1px solid #333;
			}
				input.field:hover, input.field:focus, textarea:hover, textarea:focus {
					background: #eee;
					color: #222;
					outline: none;
				}
				input.field:focus, textarea:focus {
					background: #fff;
					color: #000;
					-webkit-box-shadow:0 0 10px rgba(0,153,255,.5);
					border: 1px solid #0099ff;
				}
				textarea {
					margin-left: 2px;
				}
			a {

				color: #000;
			}
				a:hover {
					color: #0099ff;
					text-decoration: none;
				}
			#easterEggLink {
				text-decoration: none;
			}
			label:hover {
				color: #0099ff;
				cursor: pointer;
				text-decoration: underline;
			}
			#preview {
				position: absolute;
				background-color: #fff;
				padding: 15px;
				display: none;
				z-index: 999;
				-webkit-box-shadow: 0 0 20px rgba(0,0,0,.75);
			}
				#preview span {
					display: block;
					margin-top: 15px;
					color: #000;
				}
				#preview img {
					border: 1px solid #000;
				}
			#starCLR, #uCLR,  #highCLR, #highCLRu , #BTNcolor, #BTNborder, #BTNbottom, #BTNtop  {
				position: relative;
				display: inline-block;
				width: 50px;
				margin-bottom: -4px;
				margin-left: 10px;
				height: 15px;
				border: 1px solid #000;
				cursor: pointer;
			}
			#starCLR div, #uCLR div, #highCLR div, #highCLRu div, #BTNcolor div, #BTNborder div, #BTNbottom div, #BTNtop div {
				width: 50px;
				height: 15px;
			}
			.J-Zh-I {
				margin: 5px 0 5px 5px;
				padding: 3px 8px;
				width: 82px;
				text-align: center;
				vertical-align: middle;
				font: 75% arial,sans-serif;
				font-size: 12px;
				color: #000;
				border: 1px solid #BBB;
				-webkit-border-radius: 3px;
				background: -webkit-gradient(linear,0% 40%,0% 70%,from(#F9F9F9),to(#E3E3E3));
			}