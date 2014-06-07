// ==UserScript==
// @name           jRepublik
// @namespace      darkhogg
// @include        http://ww*.erepublik.com/*
// @require        http://darkhogg.netii.net/jrepublik/json-jrep.js
// @version        2.2.1
// @unwrap
// ==/UserScript==

Version = {
	major: 2,
	minor: 2,
	build: 1
}

VerNum = Version.major*1000000 + Version.minor*1000 + Version.build;
TimeOut = 10;

PGlobal = null;

// Get the current time
timeDiff  =  {
	setStartTime: function () {
		d = new Date();
		time = d.getTime();
	},

	getDiff: function () {
		d = new Date();
		return (d.getTime()-time);
	}
};
timeDiff.setStartTime();

// Fix the not-loaded prototype problem
// <script type="text/javascript" src="/js/prototype.js"></script>
protoLoaded = false;
scriptsLoaded = document.getElementsByTagName( 'script' );
for ( i = 0; i < scriptsLoaded.length; i++ ) {
	if ( scriptsLoaded[i].getAttribute( 'src' ) == '/js/prototype.js' ) {
		protoLoaded = true;
	}
}
if ( !protoLoaded ) {
	protoScript = document.createElement( 'script' );
	protoScript.setAttribute( 'type', 'text/javascript' );
	protoScript.setAttribute( 'src', '/js/prototype.js' );
	document.getElementsByTagName( 'head' )[0].appendChild( protoScript );
}

var Cookie = {};

window.addEventListener( 'load', function(event){
	// Add the Prototype functions and objects to the script

	$			      = unsafeWindow.$;
	$$			      = unsafeWindow.$$;
	$H			      = unsafeWindow.$H;
	Prototype	      = unsafeWindow.Prototype;
	Element		      = unsafeWindow.Element;
	Event		      = unsafeWindow.Event;
	Ajax		      = unsafeWindow.Ajax;
	Form		      = unsafeWindow.Form;
	document.viewport = unsafeWindow.document.viewport;

	// Get eRepublik Time
	stpos = document.body.innerHTML.indexOf('live_clock("live_time",')+23;
	ndpos = document.body.innerHTML.indexOf(')', stpos-23);
	liveClock = document.body.innerHTML.substring(stpos, ndpos).split(',');
	eRepHour = liveClock[0]*1;
	eRepMin = liveClock[1]*1;
	eRepDay = $$('.eday strong')[0].innerHTML*1;

	// Load UserName & Language
	User = $$('.citizen_name')[0].innerHTML;
	UserID = $$('.citizen_name')[0].readAttribute('href');
	UserID = UserID.substring( UserID.indexOf('profile/') + 8);
	CurrentLang = location.href.substr(25, 2);
	Section = location.href.substr(27);

	ExpTable = [
		null, 0, 7, 10, 15, 25, 35, 40, 50, 65, 80, 90, 100, 125, 200, 300, 500, 750, 1000, 1500,
		2000, 3000, 5000, 7000, 10000, 15000, 20000, 25000, 30000, 40000, 50000
	];

	// Get the Cookie or set a new one
	Cookie = getCookie(User);

	defaultInventory = {
		food:0, gift:0, weapon:0, movingtickets:0, grain:0, diamonds:0,
		iron:0, oil:0, wood:0, house:0, hospital:0, defensesystem:0
	};

	if (Cookie == null) {
		Cookie = {
			misc:	{
				day: 0,
				hour: 0,
				minute: 0,
				update: {
					remembered: 0,
					checked: {
						day: 0,
						hour: 0
					}
				},
				version: 0,
				foughtToday: 0,
				healedToday: false
			},
			config:	{
				DamageCalc: {},
				SkillShow:	{skill:'auto'}
			},
			data:	{
				level: 0,
				wellness: 0,
				accounts: {GOLD: {amount:0, image:null}},
				skill: {
					manufacturing: 0,
					land: 0,
					constructions: 0
				},
				strength: 0,
				workIn: null,
				exp: {
					current: 0,
					total: 0
				},
				damage: {
					current: 0,
					total: null
				},
				militarRank: {
					name: 'Private',
					num: 1,
				},
				country: null,
				region: null,
				inventory: defaultInventory,
			},
			modules:	[
				{name: 'SmallWellness',		params: []},
				{name: 'ExactMoney',		params: []},
				{name: 'MiniInventory',		params: []},
				{name: 'DamageCalc',		params: []}
			],
			redirect:	[
				//{time: 100, link: 'citizen/profile/'+UserID}
			]
		}
	}

	if (VerNum > Cookie.misc.version) {
		
	}

	// Images
	ProductMiniImages = {
		food:	'data:image/gif;base64,' +
			'R0lGODlhEAAQAPcAAAAAAP///6Gjpvb4+/T2+cPGysHEyNHU1/L09tTW2Pz9/vb3+PT19vj8/9bZ2/z+' +
			'//v9/tbY2f3///7///z9/efo6OXm5uTl5f7//vv8+/7+/Pj49/746f/vzv/57fz26vDLivLQk/XWnfTV' +
			'ne7PmfvlvPrlvfrmwf7x2fvv2fzw2/fu3dmjTN6nT9qkT92oUt2oU92oVN6qVd2oVd6qVuKuWeCtWeOw' +
			'W+KwXuGvXuGwYOa1ZOa3ZuW1Z+S3bee+fu3HievJkvLcuPjmyc+QNM6SPdKYQNWaQ9mgSNWbRtSaRtad' +
			'SNigStifS9WcStqiTNukT9iiTtafTdmiUNqlVN+tX9+xa+C5gOvLm+vMnOnLnvPWqfDauf7158F/KsuH' +
			'L82MMsWEMM2KM8yMN8yNOMmKN8uMOdGSO8yOOsuMOsuOOsyQPcmOPtGVQdKYRtaqcN23guHDnObJovDi' +
			'z757Jr16KcWCLMKDNrB3M7mAPcWPS82wjd7EpP359JtkJZllK6xzMpFjMZ1yQ5l3UruqmbWroc/Eufv6' +
			'+fX084RrU7Sll454ZZKPjcnGxbe0s6Wjo5mXl+Xj4+De3v7+/vj4+PX19fT09P///wAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'ACH5BAEAAJcALAAAAAAQABAAAAjLAAMIHEiwoMGDCAtOmHAoYQANXOBkSbFCyxyDXTh4EOLmSA0TWLzw' +
			'USDwwxUnPUCgGOKChY4tYfJICjBBRRAqUGDsKPHjyRQraQA16kNCRIcTOWjE4AHESJs1dgYdkAOmyY0Q' +
			'I2TQiCLFjJovfx5ZeIMExwsmPqooKUJmDJ1AjCJsiEOkhY0ZS5KcEVPHTyIBCSwFQLRHDxs0Ze7gEbQI' +
			'koELlCYEeNAgkiFCigo5KuCgQqVJBCdRgDCAAAIGCzJIPohhAgYJDmMTDAgAOw==',
		
		gift:	'data:image/gif;base64,' +
			'R0lGODlhEAAQAPcAAAAAAP///8MpLOk4OdU2Ods4OulAQdo8PdA7PcA5O7s4Ot5KTNFGR5w6O9x3eM11' +
			'd8aWl80wNdU4PfXa2/bn6Prq7MC5uv35+9jY2vb29/f4+fDx8ufo6eDm6Pj7/NXc3sbLzM7V1snS07O+' +
			'v9jl5rbBwur3+M/a2+j09d3o6dfh4rnJycLPz7C8vODt7b/Kys/a2sLMzN7o6Nvj4/f//+319eTs7Pj/' +
			'/9/m5t7l5d3k5Nrh4dLY2NDW1uPp6dfd3d/k5Nzh4czQ0Pz///v+/vH09PDz8+ns7P3///j5+fLz8+7v' +
			'77u8vLjMy7vIx8vX1sbS0bnCweHr6vH6+czX1cTJyMHDwra3tqqqqP///vj497y7uunn5v328/7w6/3B' +
			'rf+/rf7JvP7w7fDj4P98Y+N6Z/6Oe/bBuP/LwfbEu/l5ZvuJefyUg+7Szvx5a/x/cfqXiuDFwuDGw+3S' +
			'z7qxsPpRRPtiVvhnW/ttYupnXNBfVf2EePuIf+iBefeakfCZkvCln+u9ueXLyfXp6M7Ew/lTR/hRR/VW' +
			'TP9jWfdjWP9pXv9rYP9rYuhjWv9tZOZya/aCeu+GgPaLhfWQifyXkNuMiNCXk9Oal9ObmNOdmsCfnenI' +
			'xv7d2+7S0LGjovhRSfZTTfVTTvBSTfBSTr5JRK9CP8pfWuN2c+qVkuWTj+qYleiYldmcmdWmpMysq905' +
			'OfJBQOc/Pt08POdAQNQ+PvFNSuFLScFCQPFUUeJWVOhfXdFcWtdmZb96eb14eOmamduXltWXlsaNjMuT' +
			'ksaSktCgn9msrPHOzsC6uvr29tXR0evo6Ovp6f/+/vr5+fj39+Lh4dva2v7+/vv7+/n5+fX19fLy8vDw' +
			'8O/v7+rq6ufn5729vf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'ACH5BAEAANwALAAAAAAQABAAAAj/AAMIDNAsAJIhYsJ8STPhwsAAWbxwqsDMxhkzZUg9oPCwCxg2kyL9' +
			'4ZPnlgAHgwRK8zBmDRk1h0DhYhBhgTEXRaZV67BM0h09pRLQslUrV7EQQrRh+8DFzygFDUz1cYMolC4I' +
			'LX5sUCHoTaJTj/aggSPKwKteI3YYIbFJkR1AlCDFacVLAgJhL3QokTGH0adfxwJZKGHpAIFhUHBYk9LJ' +
			'kSFVNKbEaJJJVoFgVHJcS9FmUaFVzzSIcIIp1gBgT2YsOSEHTx1U1KqBWMEK1ixiLHxoCUKoUqNUyTJU' +
			'iXJply9kQJIEcHYEgytNyjhYweKJDowaDwPcQNFjG5MrW3iYDUCSfSCRbNGgWcuSPSAAOw==',

		weapon:	'data:image/gif;base64,' +
			'R0lGODlhEAAQAOYAAAAAAP////z8/e/v8MXFxjc4OFFSUktMTFxdXdDR0bq7u6eoqIyNjf7+/v39/fj4' +
			'+Pf39/X19fDw8O3t7ezs7Ofn5+Xl5ePj493d3dvb29bW1tTU1NLS0s3NzcDAwLy8vLu7u7i4uLe3t7W1' +
			'tbOzs7Gxsa+vr6urq6mpqaWlpZ6enpycnJubm5aWlpCQkIyMjIeHh4aGhoODg4KCgoGBgX19fXx8fHt7' +
			'e3p6enh4eHd3d3Z2dm9vb21tbWtra2pqamRkZGNjY2FhYV5eXlxcXFtbW1lZWVhYWFZWVlRUVE5OTkxM' +
			'TEVFRURERENDQ0JCQkFBQT8/Pz4+Pj09PTo6OjY2NjU1NTMzMzIyMjExMTAwMCwsLCsrKygoKCMjIx8f' +
			'Hx4eHhwcHBcXFxYWFhAQEP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGUALAAAAAAQABAAAAeegAGC' +
			'g4SFhoeIhw4aF4mCEgQpLkIkiRQqNjpDU0cdhRMeCyckPAZPUQcogxUiLTE9SUtUVVJMHIIbLDIzmgdR' +
			'W1dQTVogARg4PzA2RE1YWTVGXVViCAIlNiY7SlheV0EBN1pXX14fIDRFBVxWMQkMHDpOVV5jOhoxQkA5' +
			'GoIDCiE+noAh8yJABAsPDD1YgSRMDAiOGmRYMcKRxYsBAgEAOw==',
			
		movingtickets:	'data:image/gif;base64,' +
			'R0lGODlhEAAQAOYAAAAAAP////X1+f7+//X19u/w9Ovs7v3+//v8/fLz86ytrcHCwfT07vPz7v39+tHR' +
			'zv7+/N7e3f388f/1ourin//0rP/2tf/+99/UmP/zsvbsrfTprfj26/Ty59jLjrCmd/zwsv/ytfjss+ff' +
			'uurjwrSvlufjz9bGgf/tnNfHiNDDjNPGj+TWnNLGkqWcc8q+jtPHlu/iqujbpf/yt9jPptrSrrSule3n' +
			'zOfhx/r36tXU0P79+fv69vr59fDv69nY1PvjkcW0de7ZkdXEh56SZOnXlamdb8i7ici7iruvgdnMmtzP' +
			'nbOogr2yjJKKbs3Cm7ixmN/Xu+7r4NK8ddfBetzGfrSiZ8u3dezWi/vildfCf8u4efrilv/om+7Zks67' +
			'f+XRj8i4hKqccJeLZpaLZrKlesO1itfMp8G4muHZvr63oe3mz9rXzfHu5OzVkKaWZp2OYbakcsi2gLir' +
			'hMm9mb22oenj0u7p2q6spoJ4Xs7Ht7GtpP78+Obk4P79+////yH5BAEAAH8ALAAAAAAQABAAAAedgAGC' +
			'g4SFhoQQO4eGDjcjEouDPDgtKmkIkR01KyAxaD8MHBeEPSZIJxUWIktPNEokgn5SZ0FXKRQsMjMhGy9Q' +
			'fG1RYVNAQmN5LhgZGjAlC2tlVlVZXV5GZB8eRUdqEQF2THNmcm5gQxNfREl6CYMNOg91cVwoWFtNbAeF' +
			'AwF3b1RaxNjoEykHHThO8BiIJMjHHgUFGA4SQECixQCBAAA7',
		
		grain:	'data:image/gif;base64,' +
			'R0lGODlhEAAQAPcAAAAAAP////T09fPz9Ons8ff5/PL09/T3+vDx8ubn5+Tl5fLz8uzt7P///f7+/P//' +
			'/vf39uXl5P79+f/++/38+fz7+P78+P379//+/P79+/z7+fr59/X08v/68ffy6f358vXkyfbmzfnr1ffp' +
			'0/305ffw5Pv06fny5+/p3/v27vz59M6ZSduiTtujTtmjU+GqWN+pWNuoW9ypXeOvYdWkW+WwZOGuYuGv' +
			'Y9+sYt+sY96sYuWzZt6tY9mpYeSyaN2tZtGlZeKzbuGybtuua9mubOK2c9uwcNasbeq9e+K3d+O5eduz' +
			'ddevc+K6fu3Eh+jBheO9gunBh+jCh+rEieW/hurEi+zIkebDjuzIk+3JlezJlOvIlvPRne7Mm+rMnu/S' +
			'punNpPTYru3Sq/DYs/LatezVs+nTsvfjxObTt/jlyfflyu/exPLhx/fmzfXn0vLk0Pbq2Pz27fXx6//9' +
			'+v78+f37+Pz69/Xz8OjIm+fVvfru3v/8+P779/359Pr28fz28P37+fn39f/+/f38+/X08//+/v7+/vb2' +
			'9vHx8e3t7enp6f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'ACH5BAEAAIsALAAAAAAQABAAAAjMAAMIHEgwQKEADgoqDJBC0Ac6Cwm20UKGTcSBamrouPLnYoAzN34g' +
			'GRMgTgaFD8LAGLJjiogsUUCcICiISwsmNqB4kZFDiBgVAzFgYXEEhxE0RHj4+HLhwUASK4DMKGKGhgsq' +
			'cBT2WfIiCJgYTd4YCtCA4AM9T3rgSVJlDQo/cyxIOBigRIgtSrqkMdFhDx9AFC5gCDDCipMycgocQCBg' +
			'wIBDEOpgcCMlDwMCCRREUJRoAaENg5x6uGMAEYdAGjRUsENngtOFTh/IVhgQADs=',
		
		diamonds:		'data:image/gif;base64,' +
			'R0lGODlhEAAQAPcAAAAAAP////Ht7vz5+uvl6Onj5vz6+/r4+fj29/f19vb09fXz9O7s7ene5NrU2Pr3' +
			'+eLZ4NPO0tjS2O3q7enm6ebj5vz6/Pj2+PXz9e/t7+nn6f79/v38/fn4+ff299bO2NDM0cbByfv6/O3q' +
			'88XD0c3N2vDw9Pj4+/7+//v7/Kiswebo8sLG1r7E2XSJzMHK47vD2dve5/Hz+fHy9ePo9K6/5LHB5b/L' +
			'58fS68fS6uTp9Ovv+Ojs9YWi29Ha7dff7+Lo9PP1+dbY3M7Z7Nnh8LzN6N/n9N7l8eXr9ejt9afA5sfW' +
			'7Nrj8dfg7ubs9eXr9O3x97HI59/l7eTq8sfW6fP3/PH1+vD0+cHU6s7c7LfO5c/T1/X4+/v8/Yi2377V' +
			'6dzp8+fv9fD1+ajM5rvX6snf7src6cnb593r9dXj7e71+tXo9LnY6r7c7eXw9onD4Lnb7J6vuN/t9OTx' +
			'+PP5/Pr8/bLX5rfY5rTb6bjf7dPq8orF2I3D1ZvO3rDX5Mvm79rt82y91K7d6pi3wMHv+sro8OD0+Z7G' +
			'z9ji5Lfj65zAx8To78jd4ZbCycjq7+Dz9nursJPK0aHX3czd377n6ub2967Oz9jv8NLo6ZvIx7XQ0Pj/' +
			'/7/l5Mvl4Ozn5vv5+fr4+P79/fz7+/r5+f7+/v39/fz8/P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'ACH5BAEAAKcALAAAAAAQABAAAAjcAAMIHEiwoMGBXbgcJIjiSRYzZ9KEqXNQzBEqWr5I8TRHjcErTJC4' +
			'KYMmgJw7awpWcQLECBgybfT88cOG4AkeVposwTLmDZ5CgOwQlJEEio8iUbzAebSoDx+CO3TQwFGjhxI6' +
			'jigF2jOAg8AVP4bksOGCCCZOiQjlEXCgVKkGLV4EOXGDUSdJhjZN0eCh1KcYMD6YGGEpUyRBlyopClFh' +
			'QQoGLFTMQHSo0SRNkAbFkVBhwgZQFEiU2CLEAYgIEAoQyHDBQoBQBg4geIBAAYYEIkyN6iAq1EBSCwkG' +
			'BAA7',
		
		iron:	'data:image/gif;base64,' +
			'R0lGODlhEAAQAPcAAAAAAP////Pz9Ozs7fX29/P09ePk5eLj5Pr8/fv9/f7///3+/vz9/fv8/Pj5+ff4' +
			'+PP09O7v7+3u7tzd3djZ2dLT07O0tKusrKmqqpGSko6Pj+vq6tTT08/OzsLBwYuKiv39/fz8/Pr6+vj4' +
			'+Pf39/b29vT09PLy8u7u7u3t7erq6unp6ejo6Obm5uTk5OPj4+Li4uHh4dvb29ra2tfX19bW1tXV1dLS' +
			'0s/Pz87OzsvLy8jIyMPDw8LCwsHBwcDAwL+/v76+vru7u7q6uri4uLe3t7a2trW1tbS0tLGxsbCwsK+v' +
			'r62traysrKqqqqmpqaampqWlpaSkpKCgoJ+fn56enp2dnZubm5WVlZSUlJKSko+Pj4yMjIuLi4eHh4OD' +
			'g4CAgH9/f319fXx8fHl5eXV1dXR0dHJycnBwcG5ubmtra2pqamdnZ2VlZWJiYmFhYWBgYF5eXlxcXFdX' +
			'V1VVVVRUVFNTU1BQUEVFRUBAQD8/Pz4+Pjs7Ozk5OTg4ODIyMjExMTAwMC8vLy0tLSsrKyoqKikpKSgo' +
			'KCYmJiUlJSQkJCIiIh8fHx4eHhUVFRISEg8PDw0NDQkJCQcHB////wAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'ACH5BAEAAJQALAAAAAAQABAAAAjuAAMIHEiwoMGCBrpoIHFwIA0yg/x0MdEQhxpDeKCcGEGBAcEQOtoY' +
			'omMkAYEhaNKMGFiiiZ03PUBEeMImj6ExBG84yRFgxRQ4fQopetSIicADTI4k4eGmD6FFjyYhKlMjgAkl' +
			'UpZcWYOIESRJgLa0KCCkAo0jQZKYCRTJkR4rKVI0acPnwoQiUap8+ZBhB4oYVeT0ObTnyIslW8QcAeKA' +
			'RRY6fxIVqkNFhgoiYeIkwWBBzR9Eh+54QcIhhQkYPrBoiXImkaA5XIp0cCEAwYIHG3RYAUOHTRUeNFpA' +
			'SKBgoIgBMzz8sPFCAokGxQUGBAA7',
		
		oil:	'data:image/gif;base64,' +
			'R0lGODlhEAAQAOYAAAAAAP///7Cysmxtbbu8vIiJiTo5OfHw8P7+/vv7+/b29vT09PLy8vDw8O/v7+7u' +
			'7u3t7ezs7Onp6eXl5eTk5OHh4d/f39vb29fX19LS0s/Pz87OzsjIyMfHx8TExMLCwsDAwLm5ubW1taio' +
			'qJ+fn56enpqampaWlpSUlJOTk46Ojo2NjYqKin5+fn19fXt7e3p6enl5eXh4eHd3d3V1dXNzc21tbWtr' +
			'a2lpaWhoaGdnZ2NjY2JiYmBgYF9fX15eXl1dXVxcXFhYWFVVVVBQUE5OTk1NTUxMTEpKSklJSUhISEdH' +
			'R0VFRUJCQkBAQDg4ODQ0NDMzMzExMS8vLy0tLScnJyYmJiUlJSQkJCMjIyEhISAgIB8fHx0dHRUVFRER' +
			'EQwMDAUFBQQEBAICAv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGQALAAAAAAQABAAAAeagAGC' +
			'gwECJoSIiDk/C4mJHEw7IY6ECThHLDIVlIIEUUMjOCUJlA8DSEQgLT0ZlCQ2QT4XIkUrDIkXOidGLxAR' +
			'MEIeiAgqOClSNAoJKFAuEoQNQDcxW1AfHT5dTsKDE0lAPFpiT01XXlaTgwpLBkpcAABjYWBUGIgFYVlf' +
			'8PwzCIgHlPDj94SCIwc1qnDBMiWHBU4BKGzQ8BBRIAA7',
		
		wood:	'data:image/gif;base64,' +
			'R0lGODlhEAAQAPcAAAAAAP///+vt8f3+//r7/PHy86yur/v+//3+/vf4+PT19f///unp6PDv6/79+5GM' +
			'gzwrDp2YkOfg1c/Jv93TxMW8r6Gdl/j28189D31RGGlFFkkzFHtWJmpLI4RlPaN+TpSBaNC2lJmIccu4' +
			'n5iLedfPxOHe2nRNG4BXJLB6NoFaKKV0OHZUKsuRS5NrOJNrO510Q5BsQMKSWNqlZtSjaei7hea6htq0' +
			'h9Sxhdu6kd3Bn9W9n9rLuNbIt/bn1dinb8maZ8KWZOy2e96rdK2GW+q2ftSmcsOYaeu4f+GwetOlc+26' +
			'g+e2gOW0f+a2ge69h+e4hO29iey8iPPFlLyZcum/kevBk/DLo+jGoc21muLIq/Tavvfm0/fp2vvz6um3' +
			'gu+8h+67hu26huy6hey6h+y7h+++iuu8iu+/je29jOy9jO6/kPPElfPFlfLElPHDlO7Akua6jvXImuq/' +
			'k+W7kPbKnPPHmu7EmPDFmunAlty1juzEm/PLo/HLo+7Lp/HVuPjizPXhzPfk0Pfm1f369/z6+P79/PbO' +
			'qPbWt/79/f7+/v39/f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'ACH5BAEAAIwALAAAAAAQABAAAAi5AAMIHEiwoMGDCAsu6LJFEKGEiQb1CSOkSJU/Xgoa8rFHDJgxTGpA' +
			'GUJjYCEuV5wsmUImSRobM1rgCEAoEJ8oUti0cVPnzo8UH0ocAGSlDJozcN7IyXNkRQYIBggoujFnzRcz' +
			'dugE4XBCxQYLiwTy2KHDjx4iKDS8kNEhwgCCFyiE8IAhhhEkLB4gKOgAURMgSp6ocUEigUEJObAcwhMH' +
			'hggFBxv0GJFFCxUQAhIGKGBiQgUGmkMPDAgAOw==',
		
		house:	'data:image/gif;base64,' +
			'R0lGODlhEAAQAPcAAAAAAP///ysqKz08Pf78/np5enZ1dm1sbf38/eno6drZ3WlncXp5f5KSl7KytZGR' +
			'k0VFRn5+f21tbmZmZ/T09e7u7+zs7dLS08jIyby8vaioqaSkpZiYmZaWl4KCg9rc42prbYSFh+nq7HV4' +
			'fYGDhru9wMfJy2NkZXx9fnp7fGlqa4WGh8TFxsDBwre4uaytrvX3+PP19tbY2Xt8fHd4eHR1dWVmZvb3' +
			'9/T19ezt7err68/Q0MLDw7O0tJOUlIWGhikqKTIzMjs8O/T19NfY14yNi76/vZ2hmIaQcWyOH4WsI3KK' +
			'MLPfOJe7M6fMP3yIWLO0rk5QOGNnI4SFZC8vLlFRUOLi4Pf39uHh4LW1tK+vroyMi4CAf1RHFmhnZOHe' +
			'2NnY1ktIQ4aEgWlfUqaNb7+0p6Wdk6GakWllYH97dnlSJ4leL3VWNJNzUGlUPIZrTamQdaeTfW5iVEEs' +
			'FlM5H0UwG2hPNSIbFLigh4t5ZpeGdXVrYaOXi1lWU3d2dXZ1dGhnZpKRkMLBwGBCJ1VIPLmrnpuPhHhc' +
			'RKeck3VwbIFvYiglIzQtKW5sa+fl5A8FAWFcWoV7eggAACUkJP/9/ePh4W1sbP79/fn4+Ojn5+Tj4+Pi' +
			'4tbV1auqqpaVlf39/fj4+Pb29vLy8vDw8O7u7u3t7efn5+Dg4Nra2tbW1tTU1MnJycfHx8PDw7y8vLOz' +
			's66urqysrISEhICAgHJycl1dXVxcXENDQz8/Pzw8PDs7OzU1NSUlJSEhIQwMDP///wAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'ACH5BAEAAL8ALAAAAAAQABAAAAjwAAMIHEiwoMEAnAIJonBQ4CdWNHABESLhxalQBEfFssFrUi8BunIN' +
			'mMDjAqkAolJZonJAS6daQSB40OBjFpYAm4hUWPWA1itTrjZ0+CNri6gACbLs6GHLABcWFgqoAFEE1pAA' +
			'OGr42nVrxYxFfsLc6eOJA6pLmVoBYpSIQQM0dNjsSREiAgYdlVRdMbLgCZIPX8SMaAQJhQsZpX6cIFHF' +
			'yZJILbwQmlNnjBxEjtJIeiSFiZIug9zk0WNHzZo3mMCcUTSlSZIoh/CUKQSnjaEMAS7dyKEAyhEHJczE' +
			'IcPHhAhQBQkgoHQJhiYrMRpKFxgQADs=',
		
		hospital:	'data:image/gif;base64,' +
			'R0lGODlhEAAQAPcAAAAAAP///9kND6M6PNBaXdFmaeOYm+Ocn+K/wMuVmIxFSs7DxdHIy5qXmebk5tLR' +
			'0r++v5aVlo+MkbGus5qYnM3MzuDe5OTk59fX2I6Oj6muvMnKzdHS1Ojq7M3Oz5OjrrnM2M7V2enr7MjK' +
			'y3mQmoWao9Pd4cDHytne4GmLl8bW3N/t8tnh5J63v8Pg6a60tquur6HQ3a/T3bjT25+0uqe5vtTq8Jag' +
			'o93r79fi5eXw8+Xv8u/2+He7y3CquYa8yqze6rHa5Ji6wqzIz+f3++Ly9vP7/efv8XjH2H3I13/H1nW4' +
			'xnu/zovJ1oy+yYy8x6HV4aTU36HP2aTS3MPm7cns88bd4rbJzd/x9bbAwufx85zV4JnP2HGRl7Lj7K/b' +
			'46vW3s7m6qnS2KXCxrvJy93k5aC4u67GyYubncnf4YuRkcXMzOrw8Nfd3fr9/YmLi/b3997f3+Tt7OTo' +
			'53yWhPDy8KGloH2Yb+Lj4XKWQHiBa6jBfa+7mI+jYoqXbImvJavFZ52+NLS1r8fHwf7+/Pz8+u3t6///' +
			'/v7+/f39/Pz8+/j49/b29fT08+rq6eXl5KurqqmpqPj39fLx79nW0/Xz8aGgn//+/fPy8eXk4+Tj4tzY' +
			'1s/NzOnm5enf3KmlpP3z8aeiocq+vP/5+PtXVqpGRejn583MzP7+/vT09PHx8e/v7+vr69/f393d3dDQ' +
			'0Lm5ubi4uP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'ACH5BAEAALIALAAAAAAQABAAAAjkAAMIHEiwoMGBqA4ahNMqkypFCgO44XGEBYo4c9gsKliEio0VO3Tg' +
			'CMMAgRxHqQJgMpSmSRIoX6KA8ZLgwIIRpwKUWeMJFBYgSJRsEVOAlIEanAIQCTKkzagARqpwGSCAwBgY' +
			'FQKIUCGDyZQcnUR1SaGg1JkXgxBpmWHCyo8lGD6pQSOhBQg+gC50cBFDyhUyHEKR8GHmhoY9fwRJMhXi' +
			'SQ8nHijcoVOCxgk7eiAFSDSJUhYhGzIEyvMhlqUIE14RrLQJwps+fhpEgvXAFSuDdfBYcKDp0apGjApF' +
			'PESI0KVDAgMCADs=',
		
		defensesystem:	'data:image/gif;base64,' +
			'R0lGODlhEAAQAPcAAAAAAP///6tvcOTFxqOhoikoKT08PTU0NTQzNIKAgmloae3s7ejn6NHQ0b28va6t' +
			'rqyrrKqpqqCfoHNxdKqpqz09Pjw8PX19fnp6e3NzdGJiY2BgYV9fYPPz9O/v8OLi497e39zc3dnZ2s7O' +
			'z8bGx7m5uqenqKCgoYiIieTl5oWKi+zx8qSpqUFDQ6eqqn1+fnp7e3R1dW1ubmtsbGJjY15fX11eXvv8' +
			'/L/AwLu8vLS1tY+QkIeIiH+AgExNTOHi4dna2cvMy8fIx76/vr2+vYmKiYiJiFRUU3JycVhYV1dXVtTU' +
			'083NzLCwr9DOzeDLysx+ftm1tYB3d/Hl5bm0tDk4ODg3N1NSUkFAQMLAwGhnZ11cXFhXV//+/v79/fn4' +
			'+Pb19e/u7ry7u4qJiYmIiIB/f/7+/v39/fv7+/r6+vj4+Pf39/Hx8ezs7Ovr6+rq6unp6ejo6OXl5ePj' +
			'4+Dg4N/f393d3dLS0tHR0dDQ0M7OzsDAwLy8vLm5ubW1tbS0tLOzs6ysrKmpqaKioqCgoJ+fn56enpub' +
			'm5mZmZKSkpGRkZCQkI2NjYyMjIuLi4eHh3l5eXh4eHFxcWZmZmJiYmBgYF9fX1JSUlFRUUpKSklJSUdH' +
			'R0VFRUREREJCQv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
			'ACH5BAEAAJ8ALAAAAAAQABAAAAjbAAMIHBiATZ43BBMOpPMnUidFYRQO1IPihYYYFxDdUDhAgAoWkggE' +
			'UkDhjMIpT5xAkdLCwAE6ElO4yBKFyg5LVpgoRAMkh4gVJsTw8IRkT5qBZkD8iDOHxJAxM2RUQUCCICBC' +
			'I+rIibPEj6MtSoIQHDShyIM7IeAw0IKJkxCBanBIcGAoQoITJQptyuSDiJkAbXhkSNREEJkyNioduZTE' +
			'SAMwAdTwYbSoUaMeGCZxuaKpAAc7A7+40XMIEowaWCxU2AABjkIPfXhQovFIx4c1XiQGWIAnRIcuAwMC' +
			'ADs='
	};

	SkillMiniImages = {
		strength: 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
			'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACfElE' +
			'QVR42oSTu2tTcRzFPzf3kaQ3zyZN0tr0ZVutFEt1EATXgquDCP4FTv4PboKbk5uOOjgpCloXsRWLCC3Y' +
			'on1oDNY8mtsk95Xcx89NkVJ79vPh8D3fIwkhBCdK0NvfASQkNYakaih6BklRkU4CmEaDvbdPyHgW+elL' +
			'SDGdSHSAUFVR0nmU44yueUhz6z27K89o7W+TyQ3TMhogSaTyY+QmFyAiHU0QhiFfVp5zsL7MoBpBiw3g' +
			'KRrZC1ep1/Z5/OAupWjAjZu30Ocu/wswjSZrT+/Tr35manKW3MgMcqrIwOQ86lAZAKNZp7Kxytn5i2jZ' +
			'wl+AUauy+ugOiaDLxPQ8ydwYcqpArDyHVhw79kYKQM+x+PjkHmkcxs8somdKSFocLVtEK5T/209ECMH6' +
			'i4eI5jdGytPEkzmIqMj6ILaawDKaBI71xxA4Ft5hncDuIkIfZevDa7bePGZqYhwtqiNJMpFogtb+V+RG' +
			'hVj5HLbvIYSHEksR2G3kWAolW0CEAmVnbZlcJk08niAiKyAEVqtK2GmQGhrD/blJGArwBYGeQFI1Qr+P' +
			'8ByUdBGlMDlP9fsnZASOZSBFJBRZZWB4hsBzcTsNROgTTQ4R9k2Cjkm/Z+HaNrHCOMri0nV8+5DK5juU' +
			'A4PBZIKR0dMEnotttTlst7BNk2y6QSZfIjk0Tmh18I06Vrf5t8b2QY1mdYet1Zd09zYopOOcKo0S15NY' +
			'VhfHNtGiUVL5UUoLS3hmC6ddO/qJAtjZ3GB77RVya5d44IAI8Psujm1Sq/+iMDLBlWu3UfX0/8fUcx3a' +
			'tQqdXxXazZ/0XIduT4DwKco2s+evnLzG49S3u7g/Nvk9ANryOY5E+94iAAAAAElFTkSuQmCC',

		all: 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
			'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABnElE' +
			'QVR42tyTwU4TURSGv3vvdIDRtiEl0ElQSNyAe0x4ABf1IfTRDHufARPdo2KoRVTSGZ3O1GqhnbmdYab3' +
			'uigsTFyYsDDx35/vz/lyjrDWWm4RyS3zXwKunZq/dCsB8jzHWoupKqIgwFjLi4MDBlH0x6G5sTc9OABZ' +
			'lpHnOWVVMdYafz6nnqYEJye4QtDy/d8Aw0/PUUqx/uDZAqC1JooisizF8zyMlFxubKCTIY3Vb7R8n16v' +
			'RxD0uZxe4d85537jFeXW0wXAGMP6Wou338fkxYSroqDMcy4yjZYLTTWnRhwn7O09YmfnMeGHLZS8XiEM' +
			'Q16//0xUuOxvNxj//MF0mjKZTHlzdEQcDeg86dAP+iwtuQixjL3bQUqxAEzSjC+6RiVdlHIoipzRaIQQ' +
			'krOPZ5z2Ttl9uEtZVtxcvmC+kGitpSpLRoOvZKXhYm2bOI45Pn6HUoqiKPA8j8PDl6ysLNNut9FaM5vN' +
			'MMYgwjC03W6XOBkipaBer6OEJBkmSCmRUiKEoNlsUnMcpFK4rosxhs3Ne4h//o2/BgB0Lc7+72naWQAA' +
			'AABJRU5ErkJggg==',


		manufacturing: 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
			'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACIElE' +
			'QVR42nySzU4TURiGn/krbbFS0NIGXFgtcAMQjBsSkbgQSGQnW6/By1A3mOhtcAPEBSsjbUKb2AjFYkqj' +
			'Le0MnaHMT+dzQSQ2DDzLk/c8eb/vHCSCMAzl6GddtrY+SqP5W25DJwLf9zg5rrFXLLKy8BDbncDrW4S+' +
			'S3Bu4tst1ESa6adviBSI2+WktE2308apbnNUHTAIQTXiiKLTc/okMgWmIVrw59TmS7lNKCr5lbeMJEbR' +
			'Y0k0I46oOoKKpl5mIwX3sg94sf6akZhBOvcYLwg5dxx8x2ZsLIVhqFdZRURkqL4Ivu/jeR6e7+PYDrbd' +
			'w7YdRISJ8TSFmZmrvPrfVVqtFmdnZ3ieh2VZHB4coGkquq4zOprk8PAHqbupobZXAtd1qVQqlMsV2u02' +
			'RixGfCROr9ejXq/z6dNnJiezZLO5IYEiIjIYDAjDAaBQLBbZ39+n1WqRz+fRNI3d3V2Wl5+zuvry2r4U' +
			'EZEgCKjVarTbp1iWSf+8jx8EXFxcUK1+Z35+gY2NV1H7vhxB13XuZzIoyuUonu8h4QAQxtLjrK+tcRPX' +
			'XuEfzWaTnZ0dADY3N28UqFGHpmnS7ZpkMhlKpRLv3n+gXC5HCoY+kgCB79NoNKgf/wIJyeVyfP22h2lZ' +
			'zM7NETOM2xoInU4HESF1J4nrumiaxmzhEc+WltA09fYGiJBMJjAMA03T0XWdqakpFhefMDNbQFWUa4K/' +
			'AwDsgTGqRnljDQAAAABJRU5ErkJggg==',

		land: 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
			'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACYklE' +
			'QVR42pTSS08TURjG8f85086lFzptKRQhiGBQLpVEtJEYoxJWbFgZ134Dv4TuXRiNG4xx4coYY+LKjYlu' +
			'IC4gQUFBIhIJtJbS0um0M3NckFgwJuK7OslJfnnPeR6hlFIAgVem8P05cTuHZY8DguOMbB0VmiiytnAb' +
			'pTyOOyEApRrIkGB1ZR5dmggR/j+g6azSrL5lfeU15f0ss6/uMjNzjeGhQTo72hHiH0Cj9omdjTd0pl2K' +
			'9TFWV9eZffwMO2GTOzdMbmQIIRXJRBvdPVli0chvQCil1Obne2yv3SEUssldf4ev0uzsFCiVyjx89ITF' +
			'hSUmJi7h1OtMT08yNXn56AZ6bIJi5STn87dAZtCAbLaDTKadfP4impSMj48wPT2F+COdEECmK09q4Cki' +
			'3nXksrxXob//FH19vQS+h27oB7GpAIQE1AEAEIuHsSLmEcBxXJpNHyU00skYpfU5THcdvfMCmpVC6vEW' +
			'ABKlgiNAzQ3wA5/uaIlUdZHqx/c4RgzLcUiN3gAhW8Dfooo11uguv8AqbFITAjOaQO8Yo230JkILt/4A' +
			'IKRpyENKce4B+8svEeE2GjKEGbPRkqcRoQi78/exMmeweq8efsKhUvt1fn6bQ9NtDMtExAfwwmkqWx+Q' +
			'bgEZjlCr1Ugnzh4ChERoBqpZw939iqlLgiCKtAdx9zYob8/hhZP41ijSzJI8cQWiPQdFAviyvETKX8Hb' +
			'/0HDqVKrFPEw8Jt1Ko5HkMgRzY6iR9NYlkEyEScej7WAytYyuAUCox20CE1h0PQCGm4D5bsYYUmbncSM' +
			'JpGyVadfAwBCqNwu/tyhCgAAAABJRU5ErkJggg==',
			
		constructions: 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
			'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACHUlE' +
			'QVR42rSTz08TURSFv3kzMO1Q25k6LYgBQaWIBHf+ESZuXJkYN8rOxLX/FnHlxqUs3AgkBqOCllL6I6Z0' +
			'2imdvr55z0UTo0GjCfEs7z05ubn5jmWMMVxAggvq/wfEg5gkSf64d343NMYQxzGdTocojtBGk/fylMtl' +
			'crncL17r5ydqrRkOh3S7Xfr9PkopnCkHpRXJICFqd8nN51nfWOfsuE8QFicXaK2J4xilFKPRCCklQghc' +
			'10VrTafV4eDjZ94mO+znq1yRC0wPLV7o55OAsZQ0m02ymSyWsBBCYIyhWq1Sq9aI4ohX1de8u7xPMZin' +
			'fyapHh4w+74wCTCWIU1Ton7EWI5JkoTtN9tEvYism8HNZ8jc95nqZRl/G9FodPH3PR4/eIgzlpJBfMZY' +
			'SuJ+jFIpR/UjDr8cEpZC8n6BS1M5Kr0l6ldbtD41WRVLPLv7hFvlCk6tVkPYNgXfRzg2w+GQVKVcW7rG' +
			'3OwcSZKw82GXYq3Io6/3GNmS9cXbLHoLKDvFSbVmJCXaaGxh02w0UUpRKpWwLAt32qVULjHtTlO5UeHO' +
			'xgap0QRFHy+bxVGpIh4MwBi6p6fs7e4x481QCAqEYYhSiq2XW6zcXGHz6SZ+oQDGgDVh0JJyZE5OGjQa' +
			'Der1Y5rtFmurayxfXybwfZRK6fV6BEFAEATnoPsBUhz3abXbCCEohSGe5yGE/dcuWOfrbADrn8v0fQBU' +
			'ZA+oftzH7wAAAABJRU5ErkJggg=='
	};
			
	ImageSqrBg = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAAGQAAAAZCAYAAADHXotLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
			'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAc0lE' +
			'QVR42uza0Q2AIAxAwdbFxcnrjyNgtOm9hAHgCP0hq6pCv+lwBED0AcgVETlgtQC5ImINudDbUfKFoZ7D' +
			'Xpnq8GQJCBABASIgQAREQIAICBABAaLuIGvQ+a0OIOcQlPXsdWvp14kZIiB9ugEAAP//AwDnkxHeq4aG' +
			'FwAAAABJRU5ErkJggg==';

	ImageSqrBorder = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAAGQAAAAZCAYAAADHXotLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
			'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAqklE' +
			'QVR42uzawQ3CMAxG4b8VO7CIhzIsUbEEeCgvwhThkjOnWKLmvQEixZ8iH9ptjDFEP9POCAChL12qDs5M' +
			'ZWb7Abr70vO2ih0yMV6SHu7+7ooREU9Jt5Uoe9Xr6I4xX8f9NDukOwZLHRAChAABhAABhAABhAABhAAB' +
			'pKiIuHYfXsUdS0DMTJKOzijzbse867K2qp8c/uGLoZnpNCDEUgeE1vcBAAD//wMAGmw6nF9QrrwAAAAA' +
			'SUVORK5CYII=';
			
	ImageExpTooltip = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAAMgAAAAPCAYAAAChtYCSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
			'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAo0lE' +
			'QVR42uzasQ2DMBBAURtRsEZmyRipwhSpUETFFFAxRmbJGnROGUeKgd7vlUB1ui9hQUwphVw/dL8XoFLz' +
			'uMWYB9IPXbrdHyYDIYR1mUJbunm9PE2IKr3e391vxAHl/W+MA8oa5w84CEQcUAhEHLATyDxucV0mk4DS' +
			'K5ZI4OCQLhLYCQQ4GUj+JRFqk+9/e+YhqFX0Ny/8N49b/AAAAP//AwAeqTYadG7bYwAAAABJRU5ErkJg' +
			'gg==';
	ImageDamageTooltip = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAAMgAAAAPCAYAAAChtYCSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
			'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAkklE' +
			'QVR42uzasQqAIBRG4d8QfGHHGzg4+szZFEl0xd3zTUFOFw8oFc6U9NEFQJJClKRSqySpmPXnGdhdMevR' +
			'e3nkzISwpau1twPiAPz9fzAOYBLLeN7i/gH8BEIcgB8IcQCTQEIxYxKAe8SqlUiA6SWdSAA/EACLgYxf' +
			'EoHdjPs/riwCdhX4mxfw+7gBAAD//wMAhPUoTQgf8XcAAAAASUVORK5CYII=';

	ImageWarModTooltip = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAAZAAAAAdCAYAAACE5jp+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
			'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAA6UlE' +
			'QVR42uzcsQmDQACGUU+cIEMEUttYZY9M4AIZwwWcwD2sbKwFh3CFSxEIKkTUJgTeq+TO6m++7kKMMZnL' +
			'6255AAArfVmEMA9IXnfxeb9aBoBNVTsm2bfLx+1iIQAWmmH6fKfiAcBe8z6k5gDgDAEBQEAAEBAABAQA' +
			'AQEAAQFAQAD4XUA8YwLA4YCIBwCHAyIeAJwKSF8WoWpHSwBwLCBJ8n7XXUQAOBwQEQHgdEAAQEAAEBAA' +
			'BAQAAQFAQABAQAAQEAD+LyDNMFkGgM0+ZHt+AoC1EGNcHOR1F80CwJa+LMILAAD//wMAV2A3MuNUVvgA' +
			'AAAASUVORK5CYII=';
			
	ImageHeal = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdB' +
			'TUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAADX0lE' +
			'QVR42rSWT2gcZRjGfzszm5nZf5NNtmbjtklD05qWFhHpLeBBAjk4kUqkoJSipdqLeOllED1osCCVehB6' +
			'0AhaqoiBQEogJ0HoQfBQxNRJoCXpmiabJpkkm92d/ZPJetjZMbG727XBBwZmvvl43nmf5/3ed3x9n07Q' +
			'AD3AWWAA6AJ63fVZIAlMAWOmoSfrEfjqBOgFPhNblDOBaAw53IrYIiPJCgDbBRunWCCfXsfeWMMpFr4H' +
			'jFqBagUYBr7TEj1q6JlnaQZbywukFx9kgNdNQ59qFOADtbV9JBjrRA5r3uJAQub5qMTpA34AflspcXu5' +
			'yK8rJW9PftMiu5oin15/zzT0L2sFeCMQPXAzkjiM6G8B4FJfgOHDSsOv//aezY17dkW6fI5l844DvGoa' +
			'+iSAsEvzr4OxuEc+/nL0ieQA53tVRvsr2UpKgPYjJ0Tg5vErtxIAkrvvcy3Ro7aEIgBMDkSRRd8eorfv' +
			'fLLn+ZsXPvTuu0Mil08GuTqdRYlEiXR2a+mlByPAWwLQK8nKUNXQS32Bx8ibweBBmbM9lYzDHQmAc8ev' +
			'3IoLwLDaGvunhJqQpR4uPhdwnfURjMVF4IwADMqRVq9a9ouT0YrqSiQKMCgBp/xqEIBXDsl1Nf836nky' +
			'1KUwvZ7BrwYATgn4fG2CWIkaV4V9Z3AoWOHwiX6ANoFymf8TAmDtONsApOydfRPeTzsA7GyXAFYk4I+S' +
			'nX1JDmn8cN9m5MXwY3X+pHOwG2Pzee9UA38KwER+0wLY01ueFvOZSgb2xhrAuACMZR4tOlUvvprNPTX5' +
			'tbtZAMrlMjnrURGYENzBcWNr+SEAP87lWcr9dy+mFgpM/lWotO9UEuC6aehWtZsmgJn2IydC7gFhtF+j' +
			'OyQ2TX51OutJY83NWMBR09CtauE/BN7MrqbYLlRa74Xbm03Jde1u1iMv5TJYczOOO3isWgPnfSUS/SIY' +
			'i6Nobd7iMU2iv8PP6Zif4g78bpX4ebHoGQpgr69izc86wLumoY82GpmDwE+Rzq5QuOMg+Bp31nK5zFYq' +
			'yVZqwQJeMw39l93vpVqSAkfTS8mP0kvJd4KxuKhobYiSH1FWgTJOIY9TKmJvrFWr5TrwcVWWZv4qqogD' +
			'Q+4VdyefA8y5vo0Dk6ahr9Qj+HsA4zc/E6Veb4YAAAAASUVORK5CYII=';

	ImageOptUp = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABymlD' +
			'Q1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjalZHPS1RRFMc/94kKYYPIcxZBcIkQFyYPx4UrG8fFZLgY' +
			'HsL8oM3Mm9covBlv970x29mmZUEL3SgUtQn8A0SCpqXiToiirUWrEARRangtbjkQqfSFA9/z5RzOvd8v' +
			'dMmyUoEF1BuRdrMZWSiWZO9HrnCNQW7SX/ZCNZXLzXIujj8gAPZvlZUKvvY82zk4bbWfvB99kZzd+sLF' +
			'uKoLxRIICdg1w8cBu2L4HcB+GKkIxD3A9ubLVRAKGNFz7jSIdSBRM3wTSFQMfwsklrxaBGIPcBrVhQaI' +
			'n8BE1Q89sMaBx57SEVhbQLpeX6yCdQIMF4olaZ65/B1uvwRrraPlV2FzEgbfdLQhF+xJ2D7oaEdJBCCS' +
			'u+H91BgAok9D90kcH12H3m1o6zj+sRHH7dfQ9QlaD7ymXvrtkbBScFlv/ml6kweYu//mxgsAHHjVgjxw' +
			'Nw0bKzCUh4HPkAPm0lip1J8yvpnsQjebkZWg6SvtnAVKiEuWDJIKAU18FBrn3I3/R+QvRwDTi+qRXqjN' +
			'R3JKqcCXMw1vdESOOc7ExfsmY4Cefnh+w1rpe/qu+e3w77lfMCGEep+nbswAAAAEZ0FNQQAAsZ5hTEH3' +
			'AAAAIGNIUk0AAG11AABzoAAA9rEAAIWZAABsxQAA6Y4AADF9AAAXvFuht3UAAAJFSURBVHjalJLLS1RR' +
			'HMe/v3PPPXPvjI95liIRumpri2hbIZRRaeYiohIdF+6FdoLgDAT9DS3axYibIhCCKIVZuvFFkFa4KcUx' +
			'5uF9nEeLYWZQp6Lv8ne+53O+53sOGWMw+OQFTisIwuS5dPdzizH82D96xm1+eNqz9moWDG0kpYxHo05u' +
			'dGJkYnD4xgQXdk4pFW/nPQOQYZhwnUh+eHIsq8/38i86yvuvX8u6EZFXUib+CtBSJR3XyV19dG/Kz/Tw' +
			'as1Dterhq9XJL94cmnJcJ6eVSrYF6FDGhSMWLo3fmS6lekTl2AcDYDGgXPPx3U2JgZHb0xFHLKhQxk8A' +
			'tFR9zInkk3eHsztdGV6uerCodQonoFz1sNuR4f0PRrK26+RVKPuagM7u2Nzl8VszJpOxk8o3UYtgTAtg' +
			'AMQ4IaE9I3p77KGnozPd8c45AOAA4Pnh8ua7D8cykBUyZqDv8dg4YgneBDALae3J0us3hUNgZzdid/h+' +
			'+KkJkFItBUflJQIArSdtmIen2xYWuFervdegl17tGIzV6+MAQEBzAIAM1WcnZAjEGBEIhNZ624/0P6on' +
			'sGwQEbQK/72DCMyy0WiZAcDG4jz2igUwLgD6UygDEAPjAnvFAjYW51sJgkoJ+9urMES4cOU+tKn7tQGU' +
			'AZQx0IbAmIVvxQIOtldPXqGhg60VRGJJnk5Mg7pcpGxCustFWVtIpVysbX7kB1srZztovBQAEdaOKutv' +
			'l9eJgX0m0r+qPhxl2E/BdVApVQDEAIQAAgD4PQC/pN8zYUBrigAAAABJRU5ErkJggg==';

	ImageOptDn = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABymlD' +
			'Q1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjalZHPS1RRFMc/94kKYYPIcxZBcIkQFyYPx4UrG8fFZLgY' +
			'HsL8oM3Mm9covBlv970x29mmZUEL3SgUtQn8A0SCpqXiToiirUWrEARRangtbjkQqfSFA9/z5RzOvd8v' +
			'dMmyUoEF1BuRdrMZWSiWZO9HrnCNQW7SX/ZCNZXLzXIujj8gAPZvlZUKvvY82zk4bbWfvB99kZzd+sLF' +
			'uKoLxRIICdg1w8cBu2L4HcB+GKkIxD3A9ubLVRAKGNFz7jSIdSBRM3wTSFQMfwsklrxaBGIPcBrVhQaI' +
			'n8BE1Q89sMaBx57SEVhbQLpeX6yCdQIMF4olaZ65/B1uvwRrraPlV2FzEgbfdLQhF+xJ2D7oaEdJBCCS' +
			'u+H91BgAok9D90kcH12H3m1o6zj+sRHH7dfQ9QlaD7ymXvrtkbBScFlv/ml6kweYu//mxgsAHHjVgjxw' +
			'Nw0bKzCUh4HPkAPm0lip1J8yvpnsQjebkZWg6SvtnAVKiEuWDJIKAU18FBrn3I3/R+QvRwDTi+qRXqjN' +
			'R3JKqcCXMw1vdESOOc7ExfsmY4Cefnh+w1rpe/qu+e3w77lfMCGEep+nbswAAAAEZ0FNQQAAsZ5hTEH3' +
			'AAAAIGNIUk0AAG11AABzoAAA9rEAAIWZAABsxQAA6Y4AADF9AAAXvFuht3UAAAI/SURBVHjarFNNSFRR' +
			'GD3ffe++medM5jCjKBY5KRglxAjirk1iRAgtW7WVamtREoIgGKGLdrWsbX+LFooVWgipmxLSwDGlCTJ1' +
			'zPlxfDPz7rtfC3XUdFUduLvznXu/c84lZkbs6gD2oD16Ktpv+n3CIuh0roC8YmFB6x8LiTsARnaIH590' +
			'wQQA3jvOHG1sP9dsRSKolsD4zBKSKRcNQY2lhURUYz9MHIRK5woQPgeWJCQzDlYzBURIAID6kywOEQAR' +
			'ILaPQQSTCIJwKAT+EQIA6C8G6X+9YCsFZnieB2IAzJqYD7mRoZXSmgHNDFOauwI+v6+zLBy6mC+6Gyah' +
			'skjC9TNkKVkAjhZueU3VFQ06H7CtYHp5bQjAIxMADELDsdazHT+P1wtRdJExGH7PK6VM2kNSlMmKjsvt' +
			'tdUhhL/F9dTz4XjJg1zO6Z1+OtQjZr9kFAnkFYNov2GO0nDJQO7TdObt4xc92Q2nt7SCtIMbrPX91ZFR' +
			'r1GiO9B05ojn7XZGMVBbbqMyMZf9OjLWL32BQTKEWxJYmRkDs3ZDdbGBueFxbrHk7XCsqcIrFqE0o+po' +
			'AJHlRGrx/Yd7yi0OrscnFJEAcGNL4PvEMwDA6uw7FapvHRjfTLsXpHn3ZPPpUGWFjbL5xfW50Td9yfmp' +
			'B7/mJ71Cdm3v3+EDxRLSlnVt12/2vY6nul5+TkXbrt0Slm1tc4ydHjEziJlBW475AIQABAGApF1zouVS' +
			'pyEEL06+eqhdZ2VbYBPAOoA8M+vfAwBEFPPpR2AAVAAAAABJRU5ErkJggg==';

	ImageOptDel = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADDklEQVQ4jVWRTWhcZRSGn3O/O3cmmbmT' +
			'6cyQhklB0BRtbtWWIgkNRiYWSmNDNoWCTTe6CtKVQqEIbiJxrZSCUCGIihupkraKJZJiFoEGF8lCFxNb' +
			'YQyjYSYz1fm79/s+F/khHniXz8M57xGANxIJ3jt16ppKJqd7lLp+eWlpbTOKODw+cL9YfF5c95Oo2fzp' +
			'i/X1+U8bDRiPx1k5e/bDLwcH7YLv28WhIbs5PT3ygucdwFngt8nJ4PsTJ+znvm+/KhTsz2Njty6n08iN' +
			'QiE46bob7UaDuFIooC+bZTgIRl+/e3e1EoasXbwY/LG5uVHd2kK7Lp0wJJZMUovHX5Vrvp8/rdTfohRK' +
			'BE8ER2v8XI7B48dfaYXh06fl8q+1SgWjFJHWRECkNX9a+5ykRbiZzY6H1i4rwHUclAiiNal83riu261t' +
			'bSVEKbTIrkAEX2Tq3Wp1UQAye5IuLDvWohwHRwRrDGItohTGWrQx6D34eq22WNIa2S8q4zh8nMmMd7Ve' +
			'dl0X9kQAdg/UxuA7ztSNnZ3FktYAOPuCHWOYbzQe9h87NtuJIrS1hPsRIdSa/NGj73/Wbh/A/xP4wK1i' +
			'Mah3uzejw/Ch1DuduQ/Gx0eeVepAIAAp4Ntz54LHpdLGTqVCzPMQQKzdPQEwIugwJJnLcXJ4ePTKgwer' +
			'j6MISQLfTEwEm6XSRq1SwfU8lLWI4+wXZA2IGIMRIQxDUrkcLw4Pj765tLQq7wwOpgPPq1fKZTzPwzkE' +
			'ezAZQl1gxQAawFrCbpcj/f00EomC26pWh7atRWIxQmN2Vw9DUjD1Ubt9vwbMJRKvhbBsHAcNSCxGdXub' +
			'f5QKVCeKtl6Oome0tadFBNNqkUilLtwbGLi3nU6TzGT4va/vyUvwY6def9tRChtFuN3unYdhOC+XZma4' +
			'dP78QHlh4c6/a2sj+ZmZr/uKxe/ijnPEhR52V291YKexsjLx1+3bb/UGwXrh6tULPzx6VHZNs4nq7e0f' +
			'mJ2dE6V82+lkbbNZaO8+x+59KwX0+GfO/JIeG7titW64kDetVvk/ir1yHAuHTIIAAAAASUVORK5CYII=';


	// Language
	LangStrings = {
		en: {
			gYes:			'Yes',
			gNo:			'No',
		
			gWellness:		'Wellness',
			gStrength:		'Strength',
			gMilitarRank:	'Military Rank',
		
			mCore:	{options: 'Options', manual: 'Manual'},
			mMiniInventory:	'Inventory',
			mDamageCalc:	{
				button:'Damage', noWeap:'No Weapon', weapQ:'Weapon Q', tbNoWeap:'None',
				showButton:'Show button on side panel (Needs refresh)'
			},
			mSkillShow:		{
				prompt: 'Select an option from the following:\n0: Show your active skill\n1: Manufacturing\n2: Land Resources\n3: Constructions\n ',
			},
			mWarMod:	{
				fought: ['You haven\'t fought today', 'You have fought ', ' time today', ' times today'],
				healed: ['You haven\'t healed yourself today', 'You have already healed yourself today ']
			},
			
			oAddModule:    'Add Module',
			oSelectModule: 'Select Module',
			
			cReset:		'Reset Cookie',
			cSave:		'Save Cookie',
			cShow:		'Show Cookie (JSON)',
			cMod:		'Edit Cookie'
		},
		es: {
			gYes:			'Si',
			gNo:			'No',
			
			gWellness:		'Vitalidad',
			gStrength:		'Fuerza',
			gMilitarRank:	'Rango Militar',
		
			mCore:	{options: 'Opciones', manual: 'Manual'},
			mMiniInventory:	'Inventario',
			mDamageCalc:	{
				button: 'Da&ntilde;o', noWeap: 'Sin Arma', weapQ: 'Arma Q', tbNoWeap: 'Sin Arma',
				showButton:'Mostrar bot&oacute;n en el panel lateral (Necesitas actualizar la p&aacute;gina)'
			},
			mSkillShow:		{
				prompt: 'Elige una opciÃ³n de las siguientes:\n0: Mostras habilidad activa\n1: Manufactura\n2: Recursos Naturales\n3: Construcciones\n '
			},
			mWarMod:	{
				fought: ['Hoy no has luchado', 'Hoy has luchado ', ' vez', ' veces'], healed: ['Hoy a&uacute;n no te has curado', 'Hoy ya te has curado']
			},
			
			oAddModule:    'AÃ±adir mÃ³dulo',
			oSelectModule: 'Selecciona un M&oacute;dulo',
			
			cReset:		'Reiniciar Cookie',
			cSave:		'Save Cookie',
			cShow:		'Mostrar Cookie (JSON)',
			cMod:		'Editar Cookie'
		}
	};

	marketNums = [ null,
		'food', 'gift', 'weapon', 'movingticket', 'grain', 'diamonds',
		'iron', 'oil', 'wood', 'house', 'hospital', 'defensesystem'
	];
	marketNames = {
		food: 1,   gift: 2,   weapon: 3,   movingticket: 4,   grain: 5,       diamonds:6,
		iron: 7,   oil: 8,    wood: 9,     house: 10,         hospital: 11,   defensesystem:12
	};

	if (LangStrings[CurrentLang] !== undefined) {
		Lang = LangStrings[CurrentLang];
	} else {
		Lang = LangStrings.en;
	}


	// Register the commands
	GM_registerMenuCommand('jR: ' + Lang.cShow, function(){alert(JSON.stringify(getCookie(User)))});
	GM_registerMenuCommand('jR: ' + Lang.cSave, function(){setCookie(User, Cookie);});
	GM_registerMenuCommand('jR: ' + Lang.cReset, function(){Cookie=null; setCookie(User, Cookie);});
	GM_registerMenuCommand('jR: ' + Lang.cMod, function(){Cookie=null; setCookie(User, Cookie);});

	// Create the Modules object and the ModuleList array
	Modules = {
		DamageCalc:     {name: 'Damage Calculator',	Or: false, params: []},
		ExactMoney:     {name: 'Exact Money',       Or: true,  params: []},
		//ExpShow:        {name: 'Experience Show',   Or: false, params: []},
		ExtraAccount:   {name: 'Extra Account',     Or: true,  params: ['Currency name']},
		//GoldenMarket:   {name: 'Golden Market',     Or: true,  params: []},
		MiniInventory:  {name: 'Mini Inventory',    Or: true,  params: []},
		SkillShow:      {name: 'Skill Show',        Or: false, params: []},
		SmallWellness:  {name: 'Smaller Wellness',  Or: false, params: []},
		//TitleUnflasher: {name: 'Title Unflasher',   Or: true,  params: []},
		WarMod:         {name: 'War Module',        Or: false, params: []}
	};
		
	// Check for the page in which you are
	inOptions = Section.indexOf('jrepublik/options') > -1;
	inProfile = Section.indexOf('citizen/profile/'+UserID) > -1;
	inFight = Section.indexOf('battles/fight') > -1;
	inArmy = Section.indexOf('my-places/army') > -1;
	inMarket = Section.indexOf('/market/') > -1;
	inWork = Section.indexOf('do_work') > -1;
	inTrain = Section.indexOf('my-places/train') > -1;
	inRegion = Section.indexOf('region/') > -1;

	// Grab info from the page and pass it to the cookie
	Cookie.data.level = $$('.xprank')[0].innerHTML *1;
	isOr = $$('.xprank')[0].innerHTML == 'Or';
	if (!isOr) {
		Cookie.data.wellness = $('wellnessvalue').innerHTML *1;
	}

	// Substract 1 food at day starting
	if (Cookie.misc.day < eRepDay && Cookie.data.inventory.food > 0) {
		Cookie.data.inventory.food--;
		Cookie.misc.foughtToday = 0;
		Cookie.misc.healedToday = false;
	}
		
	if (Cookie.misc.hour < eRepHour)
		grabWorkData(UserID);

	if (inOptions) {
		alert('inOptions');
	} else if (inProfile) {
		quarters = $$('.quarter');
		Cookie.data.skill.manufacturing	= quarters[4].select('.special')[0].innerHTML *1;
		Cookie.data.skill.land			= quarters[5].select('.special')[0].innerHTML *1;
		Cookie.data.skill.constructions	= quarters[6].select('.special')[0].innerHTML *1;
		Cookie.data.strength				= quarters[7].select('.special')[0].innerHTML *1;

		currentExp = $$('.xppoints strong')[0].innerHTML;
		totalExp = $$('.xppoints strong')[1].innerHTML;
		Cookie.data.exp = {
			current: parseInt(currentExp),
			total: parseInt(totalExp)
		};
		
		damagehold = $$('.padded .goright')[1];
		damagetext = damagehold.innerHTML.replace(/[ \n\t]*/g, '');
		if (damagetext.indexOf('/') > -1) {
			damagesplit = damagetext.split('/');
			Cookie.data.damage = {
				current: parseInt(damagesplit[0]),
				total: parseInt(damagesplit[1])
			}
		} else {
			Cookie.data.damage = {
				current: parseInt(damagetext),
				total: null
			}
		}
		
		console.log(Cookie);

		accounts = $('allaccounts').getElementsByClassName('accountdisplay');
		for (i=0; i<accounts.length; i++) {
			account = accounts[i].select('.push_left')[0].innerHTML;
			value = accounts[i].select('.push_right')[0].innerHTML;
			flag = null;
			
			if (account.indexOf('flags/M') > -1) {
				flag = account.substring(account.indexOf('flags/M')+8, account.indexOf('.gif'));
			}
			
			if (account.indexOf('alt="Gold"') > -1) {
				account = 'GOLD';
			} else {
				account = account.substring(account.indexOf('title="')+7, account.indexOf('" alt="'));
			}
			
			point = value.indexOf('.');
			before = value.substring(0, point);
			after = value.substring(point);
			value = (before.substring(before.lastIndexOf(' ')+1) + after.substring(0, after.indexOf(' '))) *1;
			
			Cookie.data.accounts[account] = {
				amount: value,
				flag: flag
			};
		}
		
		var smdot = $$('.smalldotted');
		Cookie.data.country = smdot[2].innerHTML
		Cookie.data.region = smdot[3].innerHTML
		
		Cookie.data.inventory = defaultInventory;
		listItems = $$('li');
		for (i=0; i<listItems.length; i++) {
			if (listItems[i].select('.tooltip').length == 1 && listItems[i].select('.qlsmalllevel').length == 1) {
				invItImage = listItems[i].select('img')[0];
				type = invItImage.src;
				type = type.substring(type.indexOf('icon_industry_')+14, type.indexOf('.gif'));
				
				Cookie.data.inventory[type]++;
			}
		}
		
		militarConversion = {'private':1,corporal:2,sergeant:3,lieutenant:4,captain:5,colonel:6,general:7,fieldmarshal:8};
		careericon = $$('.quarterhead .avatarholder img')[3];
		Cookie.data.militarRank.name = careericon.getAttribute('src').substring(
			careericon.getAttribute('src').lastIndexOf('_')+1,
			careericon.getAttribute('src').indexOf('.gif')
		);
		Cookie.data.militarRank.num = militarConversion[Cookie.data.militarRank.name];
	} else if (inFight) {
		if (Cookie.data.inventory.weapon > 0) {
			Cookie.data.inventory.weapon--;
		}
		Cookie.data.exp.current += 2;
		Cookie.misc.foughtToday ++;
	} else if (inMarket) {
		buttons = $$('input.marketbtn[name="commit"]');
		for (var i=0; i<buttons.length; i++) {
			buttons[i].observe('click', function(e){
				var amount = this.parentNode.parentNode.getElementsByTagName('input')[0].value *1;
				var tdprice = this.parentNode.parentNode.getElementsByTagName('td')[3];
				var priceint = tdprice.getElementsByTagName('span')[0].innerHTML;
				var pricedec = tdprice.getElementsByTagName('sup')[0].innerHTML;
				var pricecur = tdprice.getElementsByTagName('span')[1].innerHTML;
				
				var posindustry = location.href.indexOf('industry-')+9;
				var posindustryend = location.href.indexOf('-', posindustry);
				var market = location.href.substring(posindustry, posindustryend);
				
				Cookie.data.inventory[marketNums[market]] += amount;
				Cookie.data.accounts[pricecur].amount -= ((priceint + pricedec) *1)*amount;
				
				setCookie(User, Cookie);
			});
		}
	} else if (inWork) {
		var spanmanu = $$('.icon-manufacturing');
		var spanland = $$('.icon-land');
		var spanconst = $$('.icon-constructions');
		
		if (spanmanu.length>0)
			Cookie.data.workIn = 'manufacturing';
		else if (spanland.length>0)
			Cookie.data.workIn = 'land';
		else if (spanconst.length>0)
			Cookie.data.workIn = 'constructions';
			
		var ems = $$('em');
		for (var i=0; i<ems.length; i++) {
			var inem = ems[i].innerHTML;
			if (inem.indexOf('(+') > -1) {
				var up = inem.substring(inem.indexOf('(+')+2, inem.indexOf(')'));
				if (Math.round(up) != up*1) {
					Cookie.data.skill[Cookie.data.workIn] += up*1;
					Cookie.data.exp.current ++;
				}
			}
		}
	} else if (inTrain) {
		var ems = $$('.green_bg');
		for (var i=0; i<ems.length; i++) {
			var inem = ems[i].innerHTML;
			if (inem.indexOf('>+') > -1) {
				var up = inem.substring(inem.indexOf('>+')+2, inem.indexOf('</strong>'));
				if (Math.round(up) != up*1) {
					Cookie.data.strength += up*1;
					Cookie.data.exp.current += 2;
				}
			}
		}
	} else if (inRegion) {
		if (healBut = $('submit_ajax_heal_id')) {
			healBut.observe('click', function(Ev){
				Cookie.misc.healedToday = true;
				setCookie(User, Cookie);
			});
		}
	}

	// Create the Module Function Handler
	ModuleHandler = {
		
		DamageCalc: function (params) {
			var baseDamage = Cookie.data.strength * (1+((Cookie.data.wellness-25)/100)) * (1 + (Cookie.data.militarRank.num/5)) * 2;
			var baseDamage100 = Cookie.data.strength * 1.75 * (1 + (Cookie.data.militarRank.num/5)) * 2;
			if (Cookie.config.DamageCalc.showButton) {
				PDamageCalc = getGlobalPanel();
				var but = (new Element('a')).observe('click', function(){alert(
					Lang.gStrength + ': ' + Cookie.data.strength + '\n' + 
					Lang.gMilitarRank + ': ' + Cookie.data.militarRank.num + '\n' + 
					Lang.gWellness + ': ' + Cookie.data.wellness + '\n' + 
					'\n' + 
					Lang.mDamageCalc.noWeap + ': ' + Math.round(baseDamage * 0.5) + '\n' + 
					Lang.mDamageCalc.weapQ + '1: ' + Math.round(baseDamage * 1.2) + '\n' + 
					Lang.mDamageCalc.weapQ + '2: ' + Math.round(baseDamage * 1.4) + '\n' + 
					Lang.mDamageCalc.weapQ + '3: ' + Math.round(baseDamage * 1.6) + '\n' + 
					Lang.mDamageCalc.weapQ + '4: ' + Math.round(baseDamage * 1.8) + '\n' + 
					Lang.mDamageCalc.weapQ + '5: ' + Math.round(baseDamage * 2) + '\n' + 
					'_____________\n\n' + 
					Lang.gWellness + ': 100\n' + 
					'\n' + 
					Lang.mDamageCalc.noWeap + ': ' + Math.round(baseDamage100 * 0.5) + '\n' + 
					Lang.mDamageCalc.weapQ + '1: ' + Math.round(baseDamage100 * 1.2) + '\n' + 
					Lang.mDamageCalc.weapQ + '2: ' + Math.round(baseDamage100 * 1.4) + '\n' + 
					Lang.mDamageCalc.weapQ + '3: ' + Math.round(baseDamage100 * 1.6) + '\n' + 
					Lang.mDamageCalc.weapQ + '4: ' + Math.round(baseDamage100 * 1.8) + '\n' + 
					Lang.mDamageCalc.weapQ + '5: ' + Math.round(baseDamage100 * 2) + '\n'
				);}).update(Lang.mDamageCalc.button).setStyle({
					fontFamily: 'Tahoma',
					fontSize: '9px',
					fontWeight: 'bold',
				});
				but.setAttribute('href', 'javascript:void(0)');
				addPanelItem(PDamageCalc, but, {textAlign:'center', padding:'2px'});
			}
			if (inArmy) {
				var table = $$('.offers')[0];
				var row = new Element('tr');
				var cell = new Element('td');
				cell.wrap(row).wrap(table);
				cell.update(
					'<table id="damagecalc">' +
					'<tr id="titlesrow"><th>'+Lang.gWellness+'</th><th>'+Lang.mDamageCalc.tbNoWeap+'</th>' +
					'<th>Q1</th><th>Q2</th><th>Q3</th><th>Q4</th><th>Q5</th></tr>' +
					'<tr id="wncurrentrow"><td><div id="wncurrentspan">'+Cookie.data.wellness+'</span>' +
					'</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
					'<tr id="wn100row"><td><div id="wn100span">100</span></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
					'<tr id="wninputrow"><td>' +
					'<span id="wninputspan"><input type="text" name="wninputinput" id="wninputinput" value="' + 
					(Cookie.config.DamageCalc.wnLastInput ? Cookie.config.DamageCalc.wnLastInput : 0) + 
					'"/></span></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
					'</table>'
				);
				var weapMult = [0.5, 1.2, 1.4, 1.6, 1.8, 2];
				var wnCurrent = $$('#wncurrentrow td');
				for (var i=1; i<wnCurrent.length; i++) {
					wnCurrent[i].update(Math.round(baseDamage * weapMult[i-1]));
				}
				var wn100 = $$('#wn100row td');
				for (var i=1; i<wn100.length; i++) {
					wn100[i].update(Math.round(baseDamage100 * weapMult[i-1]));
				}
				wnInput = $$('#wninputrow td');
				for (var i=1; i<wn100.length; i++) {
					wnInput[i].update(Math.round((baseDamage100/100)*$('wninputinput').getValue() * weapMult[i-1]));
				}
				
				if ( !('damagecalc') ) {
					$('damagecalc').setStyle({width: '601px'});
					var ths = $('damagecalc').select('th');
					for (var i=0; i<ths.length; i++) {
						ths[i].setStyle({
							borderBottom: '1px solid silver', borderRight: (i==0?'1px solid silver':0), fontSize: '12px', fontWeight: 'bold',
							width: '14.28%', textAlign: 'center', padding: '4px'
						});
					}
					var tds = $('damagecalc').select('td');
					for (var i=0; i<tds.length; i++) {
						tds[i].setStyle({
							border: 0, borderRight: (i%7==0?'1px solid silver':0), fontSize: '12px', fontWeight: 'bold', width: '85px',
							textAlign: 'center', padding: '4px', color: '#99C74A'}
						);
					}
					
					$('wncurrentspan').setStyle({
						color:'white',background:'#43B7ED url('+ImageSqrBg+') center center',padding:'2px',width:'60px', marginLeft:'6px'
					});
					$('wn100span').setStyle({
						color:'white',background:'#99C74A url('+ImageSqrBg+') center center',padding:'2px',width:'60px', marginLeft:'6px'
					});
					$('wninputinput').setStyle({
						border: 0, background: 'white url('+ImageSqrBorder+') -21px center', height: '19px', width: '60px', paddingTop: '3px',
						textAlign: 'center', color: 'grey', fontWeight: 'bold', fontFamily: 'arial', fontSize: '12px'
					}).observe('keyup', function(){
						for (var i=1; i<wn100.length; i++) {
							Cookie.config.DamageCalc.wnLastInput = $('wninputinput').getValue()*1;
							wnInput[i].update(Math.round((baseDamage100/100)*Cookie.config.DamageCalc.wnLastInput * weapMult[i-1]));
							setCookie(User, Cookie);
						}
					});
					
					var optdiv = new Element('div');
					optdiv.update('<input type="checkbox" name="dcshowbutton" id="dcshowbutton"> ' + Lang.mDamageCalc.showButton);
					optdiv.wrap(cell);
					$('dcshowbutton').setValue(Cookie.config.DamageCalc.showButton);
					$('dcshowbutton').observe('change', function(){
						Cookie.config.DamageCalc.showButton = !!$('dcshowbutton').getValue();
						setCookie(User, Cookie);
					});
				}
				
			}
		},
		
		ExactMoney: function () {
			
			// For GOLD:
			actualGold = $('side_bar_gold_account_value').innerHTML *1;
			exactGold = Cookie.data.accounts.GOLD.amount;
			if (Math.floor(exactGold) == actualGold) {
				$('side_bar_gold_account_value').update(moneyFormat(exactGold));
			}
			
			// For the Other CUR:
			completeCur = $$('.core .item')[1].innerHTML;
			nameCur = completeCur.substring(completeCur.indexOf('alt="')+5, completeCur.indexOf('" title="'));
			imgEnd = completeCur.indexOf('>')+1;
			actualCur = completeCur.substring(imgEnd) *1;
			if (typeof Cookie.data.accounts[nameCur] != 'undefined') {
				exactCur = Cookie.data.accounts[nameCur].amount;
				if (Math.floor(exactCur) == actualCur) {
					$$('.core .item')[1].update(completeCur.substring(0, imgEnd) + moneyFormat(exactCur));
				}
			}
		},
		
		ExpShow: function () {
			/*var expPerc = Math.round(
				((Cookie.data.exp.current-ExpTable[Cookie.data.level]) / (Cookie.data.exp.total-ExpTable[Cookie.data.level])) * 10000
			)/100;
			
			var coremenu = $$('#miniprofile .core')[0];
			
			var holder = (new Element('div')).setStyle({
				paddingTop:    '10px',
				marginBottom: '15px',
				clear:        'both'
			});
			holder.wrap(coremenu);
			coremenu.insertBefore(
				holder,
				coremenu.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling
			);
			
			var cell = (new Element('div')).addClassName('item').setStyle({
				background:  'white',
				height:      '15px',
				width:       '69px',
				margin:      '1px 0 0 0',
				padding:     '0',
				position:    'absolute',
			});
			
			var text = (new Element('div')).update( expPerc + '%' ).setStyle({
				position:    'absolute',
				width:       '100%',
				top:         '0',
				left:        '0',
				height:      '14px',
				textAlign:   'center',
				fontSize:    '10px',
				fontWeight:  'bold',
				color:       '#617D07',
				fontFamily:  'Tahoma',
				paddingTop:  '1px',
				paddingLeft: '3px',
				zIndex:      '40'
			});
			
			var prog = (new Element('div')).setStyle({
				width:       Math.round( expPerc ) + '%',
				height:      '15px',
				background:  '#BCDE7F',
				position:    'absolute',
				top:         '0',
				left:        '0',
				zIndex:      '20',
			});
			
			text.wrap(cell);
			prog.wrap(cell);
			cell.wrap(holder);
			
			var tooltipHolder = (new Element('div')).absolutize().setStyle({
				padding: 0, width: 'auto'
			});
			document.body.appendChild(tooltipHolder);
			
			var tooltipTxt = (new Element('div')).update(Cookie.data.exp.current + ' / ' + Cookie.data.exp.total);
			tooltipTxt.setStyle({
				color: '#617D07', fontWeight: 'bold', width: 'auto', height: '15px', cssFloat: 'left',
				textAlign: 'center', fontSize: '10px', fontFamily: 'Tahoma', padding: '1px 3px', paddingLeft: '8px',
				background: 'url('+ImageExpTooltip+') 0 0 no-repeat'
			}).wrap(tooltipHolder);
			
			(new Element('div')).setStyle({
				padding: 0, width: '3px', height: '15px', background: 'url('+ImageExpTooltip+') center right no-repeat', cssFloat: 'left'
			}).wrap(tooltipHolder);
			
			tooltipHolder.hide();
			
			cell.observe('mouseover', function(Ev){
				var offset = cell.cumulativeOffset();
				tooltipHolder.setStyle({
					left: ( offset[0] + 72) + 'px',
					top:  ( offset[1] ) +'px',
				});
				tooltipHolder.show()
			});
			cell.observe('mouseout',  function(Ev){ tooltipHolder.hide() });
			//*/
		},
		
		ExtraAccount: function (params) {
			account = params[0];
			if (typeof Cookie.data.accounts[account] != 'undefined') {
				money = Cookie.data.accounts[account].amount;
				flag = Cookie.data.accounts[account].flag;
			} else {
				money = 0;
				flag = null;
			}
			
			if ($$('img[src="/images/flags/S/'+flag+'.gif"]').length>=1) {
				return;
			}
			
			holder = new Element('div');
			holder.addClassName('item');
			holder.wrap($('accountdisplay'));
			holder.update('<img class="flag" alt="'+account+'" title="'+account+'" src="/images/flags/S/'+flag+'.gif" />'+moneyFormat(money)+'</div>');
		},
		
		MiniInventory: function () {
			itemList = {};
			
			PInventory = createPanel();
			addPanelItem(PInventory, Lang.mMiniInventory, {
				padding: '3px',
				
				fontFamily: 'Verdana',
				fontSize: '10px',
				fontWeight: 'bold',
				
				textAlign: 'center'
			});
			for (var i in Cookie.data.inventory) {
				if (Cookie.data.inventory[i] != 0) {
					var url = '/'+CurrentLang+'/market/country-0-industry-'+marketNames[i]+'-quality-0';
					addPanelItem(PInventory, '<!-- [URL]' + url + '[/URL] -->' + Cookie.data.inventory[i], {
							backgroundImage: 'url(' + ProductMiniImages[i.toLowerCase()] + ')',
							backgroundPosition: '6px 2px',
							backgroundRepeat: 'no-repeat',
							paddingLeft: '30px',
							textAlign: 'left',
							cursor: 'pointer'
					}).observe('click', innerCommentUrl);
				}
			}
		},
		
		SkillShow: function () {
			var holder = (new Element('div')).setStyle({paddingTop: '10px', clear:'both'});
			var coremenu = $$('#miniprofile .core')[0];
			holder.wrap(coremenu);
			coremenu.insertBefore(
				holder,
				coremenu.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling
			);
			
			var urlcom = '<!-- [URL]/'+CurrentLang+'/my-places/army[/URL] -->';
			var strdisp = (new Element('div')).addClassName('item').update(urlcom + Math.round(Cookie.data.strength*100)/100).setStyle({
				color: 'grey',
				backgroundColor: 'white',
				padding: '3px',
				margin: '1px 0 0 0',
				
				fontFamily: 'Arial',
				fontSize: '12px',
			
				verticalAlign: 'middle',
				
				backgroundImage: 'url(' + SkillMiniImages.strength + ')',
				backgroundPosition: '6px 2px',
				backgroundRepeat: 'no-repeat',
				paddingLeft: '30px',
				textAlign: 'left',
				
				cursor: 'pointer'
			});
			strdisp.wrap(holder);
			strdisp.observe('click', innerCommentUrl);

			var tooltipDamHolder = (new Element('div')).absolutize().setStyle({
				padding: 0, width: 'auto'
			});
			tooltipDamHolder.wrap(strdisp);
			
			var damageShow = Cookie.data.damage.current + (Cookie.data.damage.total !== null ? (' / ' + Cookie.data.damage.total) : '');
			var tooltipDamTxt = (new Element('div')).update(damageShow);
			tooltipDamTxt.setStyle({
				color: '#990000', fontWeight: 'bold', width: 'auto', height: '15px', cssFloat: 'left',
				textAlign: 'center', fontSize: '10px', fontFamily: 'Tahoma', padding: '1px 3px', paddingLeft: '8px',
				background: 'url('+ImageDamageTooltip+') 0 0 no-repeat'
			}).wrap(tooltipDamHolder);
			
			(new Element('div')).setStyle({
				padding: 0, width: '3px', height: '15px', background: 'url('+ImageDamageTooltip+') center right no-repeat', cssFloat: 'left'
			}).wrap(tooltipDamHolder);
			
			tooltipDamHolder.hide();
			
			strdisp.observe('mouseover', function(Ev){ 
				offset = strdisp.cumulativeOffset();
				tooltipDamHolder.setStyle({
					left: ( offset[0] + 72 ) + 'px',
					top:  ( offset[1] + 4 )  + 'px',
				});
				tooltipDamHolder.show()
			});
			strdisp.observe('mouseout', function(Ev){tooltipDamHolder.hide()});
			
			if (Cookie.config.SkillShow.skill==undefined)
				Cookie.config.SkillShow.skill = 'auto';
			
			var showSkill = (Cookie.config.SkillShow.skill=='auto') ? Cookie.data.workIn : Cookie.config.SkillShow.skill;
			var imgSkill = showSkill==undefined ? SkillMiniImages.all : SkillMiniImages[showSkill];
			var dataSkill = showSkill==undefined ? 'N / A' : Cookie.data.skill[showSkill];
				
			if (showSkill==undefined) {
				grabWorkData(UserID);
			}
			
			urlcom = '<!-- [URL]/' + CurrentLang + '/my-places/company/' + UserID + '[/URL] -->';
			var skldisp = (new Element('div')).addClassName('item').update(urlcom + Math.round(dataSkill*100)/100).setStyle({
				color: 'grey',
				backgroundColor: 'white',
				padding: '3px',
				margin: '1px 0 0 0',
				
				fontFamily: 'Arial',
				fontSize: '12px',
			
				verticalAlign: 'middle',
				
				backgroundImage: 'url(' + imgSkill + ')',
				backgroundPosition: '6px 2px',
				backgroundRepeat: 'no-repeat',
				paddingLeft: '30px',
				textAlign: 'left',
				
				cursor: 'pointer'
			});
			skldisp.wrap(holder);
			skldisp.observe('click', innerCommentUrl);
		},
		
		SmallWellness: function () {
			$('wellnessmeter').setStyle({height: 0, padding: 0});
		},
		
		TitleUnflasher: function () {
			/*setTimeout( function () {
				var headers = $$('h1');
				for ( var i = 0; i < headers.length; i ++ ) {
					var alternate = headers[i].select('span')[0];
					headers[i].update();
					headers[i].setStyle(
						fontFamily: 'Georgia',
						position:   'absolute',
						width:      '120px'
					});
				}
			}, 5000);
			/**/
		},
		
		WarMod: function () {
			var wn = $('wellnessvalue');
			
			
			var tooltip = (new Element('div')).absolutize().setStyle({
				width:      'auto',
				height:     '29px',
				textAlign:  'left',
				fontFamily: 'Tahoma',
				fontSize:   '11px',
				color:      '#3298C7',
			}).hide();
			tooltip.wrap(wn);
			tooltip.id = 'WarModTooltip';
			
			var textHold = (new Element('div')).setStyle({
				cssFloat:    'left',
				background:  'url(' + ImageWarModTooltip + ') no-repeat',
				paddingLeft: '8px',
				paddingTop:  '1px',
				height:      '28px'
			});
			textHold.wrap(tooltip);
			
			var msgFought = null;
			switch (Cookie.misc.foughtToday) {
				case 0:		msgFought = Lang.mWarMod.fought[0];	break;
				case 1:		msgFought = Lang.mWarMod.fought[1] + Cookie.misc.foughtToday + Lang.mWarMod.fought[2];	break;
				default:	msgFought = Lang.mWarMod.fought[1] + Cookie.misc.foughtToday + Lang.mWarMod.fought[3];	break;
			}
			
			(new Element('div')).update(msgFought).wrap(textHold);
			(new Element('div')).update(Lang.mWarMod.healed[Cookie.misc.healedToday ? 1 : 0]).wrap(textHold);
			
			(new Element('div')).setStyle({
				cssFloat:   'left',
				background: 'url(' + ImageWarModTooltip + ') right no-repeat',
				width:      '4px',
				height:     '29px'
			}).wrap(tooltip);
			
			if (!Cookie.misc.healedToday && Cookie.misc.foughtToday > 0) {
				var wnPos = $('wellnessvalue').cumulativeOffset();
				var imgLink = ((new Element('img')).writeAttribute('src', ImageHeal)).wrap(new Element('a')).setStyle({
					position: 'absolute', left: (wnPos[0]-12)+'px', top: (wnPos[1]-10)+'px'
				}).writeAttribute('href', 'javascript:void(0)').observe('click', function(Ev){
					Cookie.redirect.push({time:300, link:'javascript:doHeal_onClick();'});
					Cookie.misc.healedToday = true;
					setCookie(User, Cookie);
					location.pathname = '/'+CurrentLang+'/region/'+Cookie.data.region.replace( / /g, '-' );
				});
				
				imgLink.wrap($('wellnessvalue'));
			}
			
			wn.observe('mouseover', function(Ev){
				var offset = $('wellnessvalue').cumulativeOffset();
				$('WarModTooltip').setStyle({
					left: ( offset[0] + 71 ) + 'px',
					top:  ( offset[1] - 3 )  + 'px',
				});
				$('WarModTooltip').show()
			});
			wn.observe('mouseout', function(Ev){ $('WarModTooltip').hide() });
		},
	};

	// Load all the modules stored in the cookie
	for (var i=0; i<Cookie.modules.length; i++) {
		if (!isOr ||Cookie.modules[i].Or && typeof ModuleHandler[Cookie.modules[i].name]=='function') {
			if (typeof Cookie.config[Cookie.modules[i].name] == 'undefined') {
				Cookie.config[Cookie.modules[i].name] = {};
			}
			ModuleHandler[Cookie.modules[i].name](Cookie.modules[i].params);
		}
	}

	// DefaultModule
	PMain = createPanel();

	addPanelItem(PMain, 'jRepublik', {
		padding: '3px 3px 0 3px',
		margin: '0',
		
		fontFamily: 'Verdana',
		fontSize: '10px',
		fontWeight: 'bold',
		
		textAlign: 'center'
	});

	addPanelItem(PMain, 'v' + Version.major + '.' + Version.minor + '.' + Version.build, {color: 'silver',
		backgroundColor: 'white',
		padding: '0 0 3px 0',
		margin: '0 0 1px 0',
		
		fontFamily: 'Verdana',
		fontSize: '9px',
		fontWeight: 'bold',
		
		textAlign: 'center'
	});

	OptionsLink = (new Element('a')).update(Lang.mCore.options).setStyle({
		fontFamily: 'Verdana',
		fontSize: '9px',
		fontWeight: 'bold',
	})
	OptionsLink.href = 'javascript:void(0)';
	OptionsLink.observe('click', optgrLaunch);//optSelect);
	addPanelItem(PMain, OptionsLink, {textAlign: 'center', padding: '1px'});

	ManualLink = (new Element('a')).update(Lang.mCore.manual).setStyle({
		fontFamily: 'Verdana',
		fontSize: '9px',
		fontWeight: 'bold',
	})
	ManualLink.href = 'http://jrepublik.freehostia.com/manual.htm';
	ManualLink.target = '_blank';
	addPanelItem(PMain, ManualLink, {textAlign: 'center', padding: '1px'});

	// Add some generic things
	var citAvHold = $$('#miniprofile .avatarholder img')[0];
	var bigAvatar = new Element('div');
	bigAvatar.id = '__bigCitizenAvatar';
	bigAvatar.hide();
	bigAvatar.absolutize();
	bigAvatar.setStyle({ zIndex: '150000' });
	document.body.appendChild( bigAvatar );

	var newImSrc = citAvHold.readAttribute('src').substring( 0, citAvHold.readAttribute('src').length - 10 ) + '.jpg';
	(new Element('img')).writeAttribute({ src: newImSrc, width: 150, height: 150 }).wrap( bigAvatar );

	citAvHold.observe('mouseover', function(ev){
		var elem   = ev.findElement('img');
		var offset = elem.cumulativeOffset();
		
		$('__bigCitizenAvatar').setStyle({
			left: ( offset.left - 160 ) + 'px',
			top:  ( offset.top  - 50 ) + 'px',
		}).show();
	}).observe('mouseout', function(ev){
		$('__bigCitizenAvatar').hide();
	});

	// If it is an Or, delete every module not meant for Or's
	if (isOr) {
		var forOr = [];
		for (var i=0; i<Cookie.modules.length; i++) {
			if (Modules[Cookie.modules[i].name].Or) {
				forOr.push(Cookie.modules[i]);
			}
		}
		Cookie.modules = forOr;
	}

	// Do the redirects
	if (Cookie.redirect === undefined)
		Cookie.redirect = [];

	for (r=0; r<Cookie.redirect.length; r++) {
		var time = Cookie.redirect[r].time;
		var link = Cookie.redirect[r].link;
		var willBreak = false;
		if (link.indexOf('javascript:') != 0) {
			link = 'http://www.erepublik.com/' + CurrentLang + (link.length ? ('/' + link) : '');
			willbreak = true;
		}
		
		setTimeout(function(link){
			Cookie.redirect.shift();
			setCookie(User, Cookie);
			location.href = link;
		}, time, link);
		
		if (willBreak) {
			break;
		}
	}

	// Set the cookie
	Cookie.misc.hour = eRepHour;
	Cookie.misc.minute = eRepMin;
	Cookie.misc.day = eRepDay;
	Cookie.misc.version = VerNum;

	setCookie(User, Cookie);
}, false);


// Functions
function moneyFormat (money) {
	money = (
		money < 1000
		? Math.round( money*100 ) / 100
		: (
			money < 10000
			? Math.round( money*10 ) / 10
			: Math.round( money )
		)
	);
	dot = money.toString().indexOf('.');
	if (dot > -1) {
		return money.toString().substring(0, dot) + '<sup>' + money.toString().substring(dot) + '</sup>';
	}
	return money;
}

function setCookie (name, value) {
	setTimeout(function(a,b){
		GM_setValue(a, b);
	}, 0, 'eRT_'+name, JSON.stringify(value));
}

function getCookie (name) {
	return JSON.parse(GM_getValue('eRT_'+name, null));
}

function innerCommentUrl (Ev) {
	var delimStart = Ev.findElement('div').innerHTML.indexOf('<!-- [URL]') + 10;
	var delimEnd = Ev.findElement('div').innerHTML.indexOf('[/URL] -->');
	var url = Ev.findElement('div').innerHTML.substring(delimStart, delimEnd);
	window.location.pathname = url;
}

function addPanelItem (panel) {				addPanelItem(panel, '')				} // 1 param overloading
function addPanelItem (panel, content) {	addPanelItem(panel, content, {})	} // 2 param overloading
function addPanelItem (panel, content, style) {
	var item = new Element('div');
	item.update(content);
	item.setStyle({
		color: 'grey',
		backgroundColor: 'white',
		padding: '3px',
		margin: '1px 0 0 0',
		
		fontFamily: 'Arial',
		fontSize: '12px',
	
		verticalAlign: 'middle'
	}).setStyle(style);
	item.wrap(panel);
	return item;
}

function createPanel () {
	var Panel = new Element('div');
	Panel.wrap($('miniprofile'));
	
	var pGap = new Element('div');
	pGap.setStyle({height: '10px', clear: 'both'});
	pGap.wrap(Panel);
	
	var pStart = new Element('div');
	pStart.addClassName('start');
	pStart.wrap(Panel);
	
	var pCore = new Element('div');
	pCore.addClassName('core');
	pCore.wrap(Panel);
	
	var pEnd = new Element('div');
	pEnd.addClassName('end');
	pEnd.wrap(Panel);
	
	return pCore;
}

function getGlobalPanel () {
	if (PGlobal === null) {
		PGlobal = createPanel();
	}
	return PGlobal;
}


function grabWorkData (id) {
	GM_xmlhttpRequest({url: 'http://api.erepublik.com/v1/feeds/citizens/'+id+'.json', method: 'GET', onload:function(h){
		var data = JSON.parse(h.responseText);
		GM_xmlhttpRequest({url: 'http://api.erepublik.com/v1/feeds/companies/'+data.employer_id+'.json', method: 'GET', onload:function(hh){
			var data = JSON.parse(hh.responseText);
			Cookie.data.workIn = data.domain;
			setCookie(User, Cookie);
		}});
	}});
}

/**
 * MenÃº de opciones grÃ¡fico (por fin,seÃ±ores, POR FIN)
 */
function optgrLaunch () {
	var vpOffset = document.viewport.getScrollOffsets();
	
	// Capa negra
	if ( !$( '__greyLayer' ) ) {
		greyLayer = new Element('div');
		greyLayer.id = '__greyLayer';
		document.body.appendChild(greyLayer);
		greyLayer.absolutize();
		greyLayer.setStyle({
			position:   'fixed',
			left:       '0',
			top:        '0',
			width:      '100%',
			height:     '100%',
			background: 'black',
			opacity:    '0.7',
			zIndex:     20000
		});
	}
	
	// Contenedor
	if ( !$('__optContainer') ) {
		optCont = new Element('div');
		optCont.id = '__optContainer';
		document.body.appendChild(optCont);
		optCont.absolutize();
		optCont.setStyle({
			position:   'fixed',
			left:       ( ( document.viewport.getWidth() / 2 ) - 200 ) + 'px',
			top:        ( ( document.viewport.getHeight() / 2 ) - 250 ) + 'px',
			width:      '400px',
			height:     'auto',
			border:     '1px solid white',
			background: '#679',
			padding:    '3px',
			//opacity:    '0.8',
			zIndex:     25000
		});
		
		optTitle = new Element('div');
		optTitle.id = '__optTitle';
		optTitle.wrap(optCont);
		optTitle.update(
		    '<div id="__optClose" style="cursor:pointer;float:right;color:white;background:red;font-size:10px;'
		  + 'font-family:Tahoma;font-weight:bold;padding:0 3px 1px 3px;">X</div>'
		  + '<div style="font-weight:bold;font-size:11px;font-family:Tahoma;color:#CDF">jRepublik Options</div>'
		);
		optTitle.setStyle({
			background: '#346',
			margin:     '3px',
			padding:    '3px 3px 3px 5px',
		});
		
		$('__optClose').observe('click', optgrClose);
		
		optCore = new Element('div');
		optCore.id = '__optCore';
		optCore.wrap(optCont);
		optCore.setStyle({
			background: 'white',
			margin:     '3px',
			padding:    '3px',
		});
		
		optFoot = new Element('div');
		optFoot.id = '__optFoot';
		optFoot.wrap(optCont);
		optFoot.setStyle({
			background: 'white',
			margin:     '3px',
			padding:    '3px',
		});
		
		divMenu = new Element('div');
		divMenu.wrap( optFoot );
		divMenu.setStyle({
			textAlign:  'center',
			fontWeight: 'bold',
			fontFamily: 'Tahoma',
			fontSize:   '10px',
			margin:     '3px',
			padding:    '3px',
			color:      '#346',
			background: '#CDF',
		});
		divMenu.update( Lang.oSelectModule + ': ' );
		
		modMenu = new Element('select');
		modMenu.id = '__modMenu';
		modMenu.wrap( divMenu );
		modMenu.observe('change', function ( ev ) {
			elem = ev.findElement('select');
			if ( elem.getValue() == '-' ) {
				$('__modAddBut').disable();
			} else {
				$('__modAddBut').enable();
			}
			
			pDivs = $$('.__paramDiv');
			for ( var i = 0; i < pDivs.length; i ++ ) {
				pDivs[i].remove();
			}
			
			for ( var i = 0; i < Modules[ elem.getValue() ].params.length; i ++ ) {
				var pDiv = new Element('div');
				pDiv.addClassName('__paramDiv');
				optFoot.insertBefore( pDiv, $('__divButton') );
				pDiv.update( Modules[ elem.getValue() ].params[ i ] + ': ');
				pDiv.setStyle({
					textAlign:  'center',
					fontWeight: 'bold',
					fontFamily: 'Tahoma',
					fontSize:   '10px',
					margin:     '3px',
					padding:    '3px',
					color:      '#346',
					background: '#CDF',
				});

				pText = (new Element('input')).writeAttribute('type', 'text');
				pText.id = '__paramInput_' + i;
				pText.setStyle({
					textalign: 'center',
					margin:    '0 2px',
					border:    '1px solid #346',
					width:     '100px',
				});
				pText.wrap( pDiv );
			}
		});
		modMenu.setStyle({
			textalign: 'center',
			margin:    '0 2px',
			border:    '1px solid #346',
			width:     '100px',
		});
		
		(new Element('option')).writeAttribute( 'value', '-' ).update( '- - - - -' ).setStyle({ paddingLeft: '3px' }).wrap( $('__modMenu') );
		for ( i in Modules ) {
			(new Element('option')).writeAttribute( 'value', i ).update( i ).setStyle({ paddingLeft: '3px' }).wrap( $('__modMenu') );
		}
		
		divBut = new Element('div');
		divBut.wrap( optFoot );
		divBut.id = '__divButton';
		divBut.setStyle({
			textAlign:  'center',
			margin:     '3px',
			padding:    '3px',
			background: '#CDF',
		});
		
		modAddBut = (new Element('input')).writeAttribute('type', 'button');
		modAddBut.setValue( Lang.oAddModule );
		modAddBut.id = '__modAddBut';
		modAddBut.wrap( divBut );
		modAddBut.disable();
		modAddBut.setStyle({
			border:     '1px solid #346',
			background: '#ABD',
			fontWeight: 'bold',
			fontFamily: 'Tahoma',
			fontSize:   '10px',
			textAlign:  'center',
			width:      '100px'
		});
		modAddBut.observe('click', function ( ev ) {
			var modName   = $('__modMenu').getValue();
			var modParams = [];
			
			for ( var i = 0; i < Modules[ modName ].params.length; i ++ ) {
				modParams.push( $('__paramInput_' + i).getValue() );
			}
			
			Cookie.modules.push({
				name:   modName,
				params: modParams
			});
			
			$('__modMenu').setValue('-');
			
			pDivs = $$('.__paramDiv');
			for ( var i = 0; i < pDivs.length; i ++ ) {
				pDivs[i].remove();
			}
			
			optgrLoadModules();
			setCookie(User, Cookie);
		});
	}
	
	$('__greyLayer').show();
	$('__optContainer').show();
	optgrLoadModules();
}

function optgrClose () {
	if ( $('__greyLayer') ) {
		$('__greyLayer').hide()
	}
	
	if ( $('__optContainer') ) {
		$('__optContainer').hide();
	}
	
	document.location.reload();
}

function optgrLoadModules () {
	if ( $('__optCore') ) {
		optCore = $('__optCore');
		optCore.update();
	
		len = Cookie.modules.length;
		for ( var i = 0; i < len; i ++ ) {
			newRow = new Element('div');
			newRow.wrap( optCore );
			newRow.setStyle({
				margin:     '3px',
				padding:    '3px',
				background: '#CDF',
			});
			newRow.addClassName('__row');
			(new Element('input')).writeAttribute('type', 'hidden').setValue( i ).wrap(newRow);
			
			newNCont = new Element('div');
			newNCont.wrap( newRow );
			newNCont.update( Cookie.modules[i].name );
			newNCont.setStyle({
				textAlign:  'center',
				fontFamily: 'Tahoma',
				fontSize:   '10px',
				fontWeight: 'bold',
				margin:     '3px',
				padding:    '3px',
				color:      'white',
				background: '#235',
				width:      '100px',
				cssFloat:   'left',
			});
			
			pLen = Cookie.modules[i].params.length
			for ( var j = 0; j < pLen; j ++ ) {
				var paramDiv = new Element('div');
				paramDiv.update( Cookie.modules[i].params[j] );
				paramDiv.wrap( newRow );
				paramDiv.setStyle({
					fontFamily: 'Tahoma',
					fontSize:   '10px',
					fontWeight: 'bold',
					margin:     '3px',
					padding:    '3px 5px',
					color:      '#235',
					background: '#ABD',
					cssFloat:   'left',
				});
			}
			
			var rgtButsStl = {
				width:      '16px',
				height:     '16px',
				cssFloat:   'right',
				padding:    '3px',
				margin:     '1px 2px',
				background: '#ABD',
			};
			
			iDel = (new Element('img')).writeAttribute('src', ImageOptDel);
			iDn  = (new Element('img')).writeAttribute('src', ImageOptDn);
			iUp  = (new Element('img')).writeAttribute('src', ImageOptUp);
			
			dDel = new Element('div');
			dDel.wrap( newRow );
			dDel.setStyle( rgtButsStl ).setStyle({ cursor: 'pointer' });
			dDel.update( iDel );
			dDel.observe('click', function ( ev ) {
				var row = ev.findElement('.__row');
				var rowNum = parseInt( row.select('input')[0].getValue() );
				
				Cookie.modules.splice( rowNum, 1 );
				
				optgrLoadModules();
					
				setCookie(User, Cookie);
			});
			
			dDn = new Element('div');
			dDn.wrap( newRow );
			dDn.setStyle( rgtButsStl );
			dDn.update( iDn );
			if ( i == len-1 ) {
				iDn.setStyle({ opacity: '0.3' });
			} else {
				dDn.setStyle({ cursor: 'pointer' }).observe('click', function ( ev ) {
					var row = ev.findElement('.__row');
					var rowNum = parseInt( row.select('input')[0].getValue() );
					
					tmp = Cookie.modules[ rowNum ];
					Cookie.modules[ rowNum ] = Cookie.modules[ rowNum + 1 ];
					Cookie.modules[ rowNum + 1 ] = tmp;
					
					optgrLoadModules();
					
					setCookie(User, Cookie);
				});
			}
			
			dUp = new Element('div');
			dUp.wrap( newRow );
			dUp.setStyle( rgtButsStl );
			dUp.update( iUp );
			if ( i == 0 ) {
				iUp.setStyle({ opacity: '0.3' });
			} else {
				dUp.setStyle({ cursor: 'pointer' }).observe('click', function ( ev ) {
					var row = ev.findElement('.__row');
					var rowNum = parseInt( row.select('input')[0].getValue() );
					
					tmp = Cookie.modules[ rowNum ];
					Cookie.modules[ rowNum ] = Cookie.modules[ rowNum - 1 ];
					Cookie.modules[ rowNum - 1 ] = tmp;
					
					optgrLoadModules();
					
					setCookie(User, Cookie);
				});
			}
			
			(new Element('div')).setStyle({ clear: 'both' }).wrap( newRow );
		}
	}
}