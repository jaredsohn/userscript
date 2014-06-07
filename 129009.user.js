// ==UserScript==
// @name           forms test
// @namespace      forms test
// @description    test the wm forms and debug libraries
// @include        http://www.facebook.com/pages/*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        1.0.0
// @copyright      Charlie Ewing
// @require        http://userscripts.org/scripts/source/123889.user.js
// @require        http://userscripts.org/scripts/source/128747.user.js
// @require        http://userscripts.org/scripts/source/129006.user.js
// ==/UserScript== 

//includes wm library, wm debug console, wm forms library

// Based on script built by Joe Simmons in Farmville Wall Manager

(function() {
	document.body.innerHTML="";

	debug.init();
	if (debug.initialized) debug.print("Debug Console Initialized");
	forms.init();
	if (debug.initialized) debug.print("Forms Library Initialized");

	document.body.appendChild(
		(new forms.TABCONTROL({
			height:"na",
			width:"na",
			subtype:"coolBar",
			tabs:[
				{caption:"Tabs",selected:true,kids:[
					(new forms.TABCONTROL({
						"height":"100px",
						"width":"75%",
						tabs:[
							{caption:"Tab 1",selected:true,textContent:"one",icon:imgs.plus},
							{caption:"Tab 2",textContent:"two"},
							{caption:"Tab 3",textContent:"three"},
						]
					})).node,
				]},

				{caption:"Accordion TTB",kids:[
					(new forms.ACCORDION({
						kids:[
							{height:"30%", contentHeight:"200px", scrollMode:"scrollX", icon:imgs.stop, title:"Top", textContent:"asdkasd asdfasdf asdfasdf asdfasdfa sdfasdfasd fasdfasdf asdfasd fasdfasd fasdfasdf asdfasdf asd fasdfa sdfasdf asd f asdfasdf asdfasdf asd fa sdf asdf asdfa sdf asdfa sdf asdf asdf asdf asdf asdf asdf asdf as df asd fa sdf asdfasdfasdf asdfasdfasd fa sdf asdfasd fasdf asd f asdfasd f asdfa sd fa sdfasd f asdf"},
							{height:"50%", contentHeight:"200px", scrollMode:"scrollY", icon:imgs.pause, title:"Middle", textContent:"asdkasd asdfasdf asdfasdf asdfasdfa sdfasdfasd fasdfasdf asdfasd fasdfasd fasdfasdf asdfasdf asd fasdfa sdfasdf asd f asdfasdf asdfasdf asd fa sdf asdf asdfa sdf asdfa sdf asdf asdf asdf asdf asdf asdf asdf a fa sdfasd f asdf"},
							{height:"20%", contentHeight:"200px", scrollMode:"", icon:imgs.play, title:"Bottom", textContent:"asdkasd asdfasdf asdfasdf asdfasdfa sdfasd fasdfa sdfasdf asd f asdfasdf asdfasdf asd fa sdf asdf asdfa sdf asdfa sdf asdf asdf asdf asdf asdf asdf asdf as df asd fa sdf asdfasdfasdf asdfasdfasd fa sdf asdfasd fasdf asd f asdfasd f asdfa sd fa sdfasd f asdf"},
						],
						direction:"ttb",
						collapseImage:imgs.arrowup,
					})).node,
				]},

				{caption:"Accordion RTL",kids:[
					(new forms.ACCORDION({
						kids:[
							{width:"30%", contentHeight:"200px", scrollMode:"scrollX", icon:imgs.stop, title:"Top", textContent:"asdkasd asdfasdf asdfasdf asdfasdfa sdfasdfasd fasdfasdf asdfasd fasdfasd fasdfasdf asdfasdf asd fasdfa sdfasdf asd f asdfasdf asdfasdf asd fa sdf asdf asdfa sdf asdfa sdf asdf asdf asdf asdf asdf asdf asdf as df asd fa sdf asdfasdfasdf asdfasdfasd fa sdf asdfasd fasdf asd f asdfasd f asdfa sd fa sdfasd f asdf"},
							{width:"50%", contentHeight:"200px", scrollMode:"scrollY", icon:imgs.pause, title:"Middle", textContent:"asdkasd asdfasdf asdfasdf asdfasdfa sdfasdfasd fasdfasdf asdfasd fasdfasd fasdfasdf asdfasdf asd fasdfa sdfasdf asd f asdfasdf asdfasdf asd fa sdf asdf asdfa sdf asdfa sdf asdf asdf asdf asdf asdf asdf asdf a fa sdfasd f asdf"},
							{width:"20%", contentHeight:"200px", scrollMode:"", icon:imgs.play, title:"Bottom", textContent:"asdkasd asdfasdf asdfasdf asdfasdfa sdfasd fasdfa sdfasdf asd f asdfasdf asdfasdf asd fa sdf asdf asdfa sdf asdfa sdf asdf asdf asdf asdf asdf asdf asdf as df asd fa sdf asdfasdfasdf asdfasdfasd fa sdf asdfasd fasdf asd f asdfasd f asdfa sd fa sdfasd f asdf"},
						],
						direction:"rtl",
						collapseImage:imgs.arrowup,
					})).node,
				]},

				{caption:"Accordion 2D",kids:[
					(new forms.ACCORDION({
						kids:[
							{height:"", contentHeight:"200px", scrollMode:"scrollY", icon:imgs.stop, title:"Top", textContent:"asdkasd asdfasdf asdfasdf asdfasdfa sdfasdfasd fasdfasdf asdfasd fasdfasd fasdfasdf asdfasdf asd fasdfa sdfasdf asd f asdfasdf asdfasdf asd fa sdf asdf asdfa sdf asdfa sdf asdf asdf asdf asdf asdf asdf asdf as df asd fa sdf asdfasdfasdf asdfasdfasd fa sdf asdfasd fasdf asd f asdfasd f asdfa sd fa sdfasd f asdf"},
							{noHeader:true, content:
								(new forms.ACCORDION({
									kids:[
										{width:"", contentHeight:"200px", scrollMode:"scrollY", icon:imgs.stop, title:"Top", textContent:"asdkasd asdfasdf asdfasdf asdfasdfa sdfasdfasd fasdfasdf asdfasd fasdfasd fasdfasdf asdfasdf asd fasdfa sdfasdf asd f asdfasdf asdfasdf asd fa sdf asdf asdfa sdf asdfa sdf asdf asdf asdf asdf asdf asdf asdf as df asd fa sdf asdfasdfasdf asdfasdfasd fa sdf asdfasd fasdf asd f asdfasd f asdfa sd fa sdfasd f asdf"},
										{width:"", contentHeight:"200px", scrollMode:"scrollY", icon:imgs.pause, title:"Middle", textContent:"asdkasd asdfasdf asdfasdf asdfasdfa sdfasdfasd fasdfasdf asdfasd fasdfasd fasdfasdf asdfasdf asd fasdfa sdfasdf asd f asdfasdf asdfasdf asd fa sdf asdf asdfa sdf asdfa sdf asdf asdf asdf asdf asdf asdf asdf a fa sdfasd f asdf"},
										{width:"", contentHeight:"200px", scrollMode:"scrollY", icon:imgs.play, title:"Bottom", textContent:"asdkasd asdfasdf asdfasdf asdfasdfa sdfasd fasdfa sdfasdf asd f asdfasdf asdfasdf asd fa sdf asdf asdfa sdf asdfa sdf asdf asdf asdf asdf asdf asdf asdf as df asd fa sdf asdfasdfasdf asdfasdfasd fa sdf asdfasd fasdf asd f asdfasd f asdfa sd fa sdfasd f asdf"},
									],
									direction:"rtl",
									collapseImage:imgs.arrowup,
								})).node,
							},
							{height:"", contentHeight:"200px", scrollMode:"scrollY", icon:imgs.play, title:"Bottom", textContent:"asdkasd asdfasdf asdfasdf asdfasdfa sdfasd fasdfa sdfasdf asd f asdfasdf asdfasdf asd fa sdf asdf asdfa sdf asdfa sdf asdf asdf asdf asdf asdf asdf asdf as df asd fa sdf asdfasdfasdf asdfasdfasd fa sdf asdfasd fasdf asd f asdfasd f asdfa sd fa sdfasd f asdf"},
						],
						direction:"ttb",
						collapseImage:imgs.arrowup,
					})).node,
				]},

				{caption:"Panels",kids:[
					(new forms.PANEL({
						scrollMode:"scrollY",
						icon:imgs.stop,
						title:"Panel Test 1",
						textContent:"asdkasd asdfasdf asdfasdf asdfasdfa sdfasdfasd fasdfasdf asdfasd fasdfasd fasdfasdf asdfasdf asd fasdfa sdfasdf asd f asdfasdf asdfasdf asd fa sdf asdf asdfa sdf asdfa sdf asdf asdf asdf asdf asdf asdf asdf as df asd fa sdf asdfasdfasdf asdfasdfasd fa sdf asdfasd fasdf asd f asdfasd f asdfa sd fa sdfasd f asdf",
						direction:"ttb",
						collapseImage:imgs.arrowup,
					})).node,
					(new forms.PANEL({
						scrollMode:"scrollY",
						icon:imgs.pause,
						title:"Panel Test 2",
						textContent:"asdkasd asdfasdf asdfasdf asdfasdfa sdfasdfasd fasdfasdf asdfasd fasdfasd fasdfasdf asdfasdf asd fasdfa sdfasdf asd f asdfasdf asdfasdf asd fa sdf asdf asdfa sdf asdfa sdf asdf asdf asdf asdf asdf asdf asdf as df asd fa sdf asdfasdfasdf asdfasdfasd fa sdf asdfasd fasdf asd f asdfasd f asdfa sd fa sdfasd f asdf",
						direction:"rtl",
					})).node,
				]},

				{caption:"Table",kids:[
					(new forms.TABLE({
						title:"Crops",
						panelize:true,
						cols:[
							{name:"order",title:"Order",prefix:"order_",type:"checkbox",align:"center"},
							{name:"seed",title:"Seed",prefix:"seed_",type:"checkbox",align:"center"},
							{name:"bushel",title:"Bushel",prefix:"bushel_",type:"checkbox",align:"center"},
						],
						rows:[
							{name:"lettuce",title:"Lettuce"},
							{name:"tomato",title:"Tomato"},
							{name:"broccoli",title:"Broccoli"},
						],
						data:{
							lettuce:{order:true, seed:false, bushel:false},
							tomato:{order:false, seed:false, bushel:true},
							broccoli:{order:false, seed:true, bushel:false},
						},
						rowGroups:[
							{title:"Spring",rows:["lettuce"],name:"spring"},
							{title:"Summer",rows:["tomato","broccoli"],name:"summer"},
						],
						colGroups:[
							{title:"All Crops",name:"all",cols:["order","seed","bushel"]}
						],
					})).node,
				]},
				{caption:"Form",kids:[
					(new forms.FORM({
						style:"width:300px;height:300px;",
						title:"Form1",
						textContent:"...",
						active:true,
						controlBoxStyle:"win7",
						icon:"http://photos-d.ak.fbcdn.net/photos-ak-snc1/v43/90/121581087940710/app_2_121581087940710_1109.gif",
					})).node,
				]},
				{caption:"MenuStrip",id:"menustriptest",kids:[
					(new forms.MENUSTRIP({
						kids:[
							{title:"File",kids:[
								{title:"New",kids:[
									{title:"Deeper"},
								]},
								{title:"Open"},
								{title:"Save"},
							]},
							{title:"Edit"},
							{title:"Format"},
						]
					})).node,
				]},
			]
		})).node
	);

})(); // anonymous function wrapper end



