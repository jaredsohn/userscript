// ==UserScript==
// @name           Horizon Contributions Manager
// @namespace      holyschmidt
// @description    Auto-Fill form data for HCC Contributions
// @include        https://give.horizonlife.org/Default.aspx
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @require        http://www.betawarriors.com/bin/gm/62718user.js 

// @version        0.02
//
// @history        0.02 Fixed for select drop-downs
// @history        0.01 Initial Version
//
// ==/UserScript==

ScriptUpdater.check(65567, "0.02");

Config.settings = {
	"Billing Info":{
		html:'<p>Horizon Contributions Billing Info.</p>',
		fields:{
			txtFirstName:{
				type:'text',
				label:'First Name',
				tip:'',
				width:'300px',
			},
			txtLastName:{
				type:'text',
				label:'Last Name',
				tip:'',
				width:'300px',
			},
			txtAddress1:{
				type:'text',
				label:'Address 1',
				tip:'',
				width:'300px',
			},
			txtAddress2:{
				type:'text',
				label:'Address 2',
				tip:'',
				width:'300px',
			},
			txtCity:{
				type:'text',
				label:'City', 
				tip:'',
				width:'300px',
			},
			ddlState:{
				type:'select',
				label:'State',
				options:{
					"Alabama"			: "AL",
					"Alaska"			: "AK",
					"Arizona"			: "AZ",
					"Arkansas"			: "AR",
					"California"		: "CA",
					"Colorado"			: "CO",
					"Connecticut"		: "CT",
					"District of Columbia"	: "DC",
					"Delaware"			: "DE",
					"Florida"			: "FL",
					"Georgia"			: "GA",
					"Hawaii"			: "HI",
					"Idaho"			: "ID",
					"Illinois"			: "IL",
					"Indiana"			: "IN",
					"Iowa"			: "IA",
					"Kansas"			: "KS",
					"Kentucky"			: "KY",
					"Louisiana"			: "LA",
					"Maine"			: "ME",
					"Maryland"			: "MD",
					"Massachusetts"		: "MA",
					"Michigan"			: "MI",
					"Minnesota"			: "MN",
					"Mississippi"		: "MS",
					"Missouri"			: "MO",
					"Montana"			: "MT",
					"Nebraska"			: "NE",
					"Nevada"			: "NV",
					"New Hampshire"		: "NH",
					"New Jersey"		: "NJ",
					"New Mexico"		: "NM",
					"New York"			: "NY",
					"North Carolina"		: "NC",
					"North Dakota"		: "ND",
					"Ohio"			: "OH",
					"Oklahoma"			: "OK",
					"Oregon"			: "OR",
					"Pennsylvania"		: "PA",
					"Rhode Island"		: "RI",
					"South Carolina"		: "SC",
					"South Dakota"		: "SD",
					"Tennessee"			: "TN",
					"Texas"			: "TX",
					"Utah"			: "UT",
					"Vermont"			: "VT",
					"Virginia"			: "VA",
					"Washington"		: "WA",
					"West Virginia"		: "WV",
					"Wisconsin"			: "WI",
					"Wyoming"			: "WY"
				},
				value:"AL",
			},
			txtZip:{
				type:'text',
				label:'Zipcode',
				tip:'',
				width:'300px',
			},
			txtPhone:{
				type:'text',
				label:'Phone Number',
				tip:'',
				width:'300px',
			},
			txtEmail:{
				type:'text',
				label:'Email',
				tip:'',
				width:'300px',
			}
		}
	},
	"Payment Info":{
		html:'<p>Horizon Contributions Payment Info.</p>',
		fields:{
			ddlPaymentMethods:{
				type:'select',
				label:'State',
				options:{
					Visa		: "Visa",
					Mastercard	: "Mastercard",
				},
				value:'Visa',
			},
			txtCardName:{
				type:'text',
				label:'Cardholder\'s Name',
				tip:'',
				width:'300px',
			},
			txtCardNumber:{
				type:'text',
				label:'Card Number',
				tip:'',
				width:'300px',
			},
			ddlExpirationMonth:{
				type:'select',
				label:'Expiration Month',
				options:{
					"January"	: "01",
					"February"	: "02",
					"March"	: "03",
					"April"	: "04",
					"May"		: "05",
					"June"	: "06",
					"July"	: "07",
					"August"	: "08",
					"September"	: "09",
					"October"	: "10",
					"November"	: "11",
					"December"	: "12",
				},
				value:'01',
			},
			ddlExpirationYear:{
				type:'select',
				label:'Expiration Year',
				options:{
					"2009"	: "09",
					"2010"	: "10",
					"2011"	: "11",
					"2012"	: "12",
					"2013"	: "13",
					"2014"	: "14",
					"2015"	: "15",
					"2016"	: "16",
				},
				value:'10',
			},
			txtCardCVNumber:{
				type:'text',
				label:'CV Number',
				tip:'',
				width:'300px',
			}
		}
	}
};

Contributions = {
	init:function() 
	{
		GM_addStyle("#settingImage { position:absolute; top:5px; right:5px; height:20px; width:20px; cursor:pointer; }");
		$('#give').append('<img id="settingImage" src="http://tools.betawarriors.com/ikcrc/tool.ico" title="Open Settings"/>');
		$('#settingImage').click(function() {
			Config.show(Contributions.fillForm);
		});
		Contributions.fillForm();
		if (Config.get('txtFirstName') == false || Config.get('txtLastName') == false)
		{
			Config.show(Contributions.fillForm);
		}
	},
	fillForm:function()
	{
		$('#billing input, #payment input, #billing select, #payment select').each(function() {
			var value = Config.get(this.id);
			if (value != false)
			{
				if (this.id == "ddlState") {
					try { this.value = $("#ddlState option[value*='" + value + "']")[0].value; } catch(e) { }
				}
				else {
					this.value = value; 
				}
			}
		});
	}
};

Contributions.init();